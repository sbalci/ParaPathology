#!/usr/bin/env node
/**
 * wiki-check.mjs — integrity check for the research wiki.
 *
 * Default mode: every [[wikilink]] in the published layers resolves to a real page,
 * and no two pages share a basename (the Lua filter resolves links by basename, so a
 * collision means links silently land on whichever page it happened to index first).
 *
 * --gaps: additionally reports pages whose `sources:` entries point at files that do
 * not exist, and pages nothing links to. These are lists, not verdicts — deciding
 * which gaps are worth fixing is a judgement call the model makes, not the script.
 *
 * Scope is deliberately narrow. AGENTS.md and journal/ both mention [[...]] inside
 * prose and code fences as illustration; scanning them would report failures that are
 * not failures. Only the layers that actually publish are checked.
 *
 * Node with no dependencies, matching .claude/hooks/protect-sources.mjs.
 * Exit 0 = clean, 1 = broken links or collisions found, 2 = could not run.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, resolve, basename, relative } from "node:path";

const repoRoot = resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd());
const wantGaps = process.argv.includes("--gaps");

// Layers that publish, and therefore whose links must resolve.
const PAGE_DIRS = [
  "wiki/concepts",
  "wiki/methods",
  "wiki/datasets",
  "sources/projects",
  "sources/papers",
];
const EXTRA_PAGES = ["wiki/index.md"];

const rel = (p) => relative(repoRoot, p).split(/[\\/]/).join("/");

function collectPages() {
  const pages = [];
  for (const dir of PAGE_DIRS) {
    const abs = join(repoRoot, dir);
    if (!existsSync(abs)) continue;
    for (const name of readdirSync(abs)) {
      if (!name.endsWith(".md")) continue;
      if (name.startsWith("_")) continue; // _metadata.yml siblings, if any appear
      pages.push(join(abs, name));
    }
  }
  for (const extra of EXTRA_PAGES) {
    const abs = join(repoRoot, extra);
    if (existsSync(abs) && statSync(abs).isFile()) pages.push(abs);
  }
  return pages;
}

/** Strip fenced and inline code so `[[example]]` in a snippet is not treated as a link. */
function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^ {4,}\S[^\n]*$/gm, "")
    .replace(/`[^`\n]*`/g, "");
}

function frontmatter(text) {
  if (!text.startsWith("---")) return "";
  const end = text.indexOf("\n---", 3);
  return end === -1 ? "" : text.slice(3, end);
}

/**
 * Pull `sources:` entries out of frontmatter, tolerating both the inline form
 * (`sources: [a, b]`, wrapped across lines or not) and YAML block form
 * (`sources:` then `  - a`). Returns null — not an empty list — when the key is
 * present but unparsed, so the caller can warn instead of silently reporting
 * "no problems", which is the wrong failure direction for a drift checker.
 */
function parseSources(fm) {
  const at = fm.search(/^sources:/m);
  if (at === -1) return [];
  const rest = fm.slice(at).replace(/^sources:[ \t]*/, "");
  if (rest.trimStart().startsWith("[")) {
    const close = rest.indexOf("]");
    if (close === -1) return null;
    return rest
      .slice(rest.indexOf("[") + 1, close)
      .split(",")
      .map((s) => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  const items = [];
  for (const line of rest.split("\n").slice(1)) {
    if (/^\s*-\s+/.test(line)) {
      items.push(line.replace(/^\s*-\s+/, "").trim().replace(/^["']|["']$/g, ""));
    } else if (line.trim() !== "") break; // next key ends the block
  }
  return items.length ? items : null;
}

const pages = collectPages();
if (pages.length === 0) {
  console.error(
    `wiki-check: found no pages under ${PAGE_DIRS.join(", ")} — run from the repo root, ` +
      `or set CLAUDE_PROJECT_DIR. Looked in: ${repoRoot}`
  );
  process.exit(2);
}

// basename -> [paths]. Links are flat slugs ([[patch-extraction]]), never directory-qualified.
const bySlug = new Map();
for (const p of pages) {
  const slug = basename(p, ".md");
  if (!bySlug.has(slug)) bySlug.set(slug, []);
  bySlug.get(slug).push(p);
}

const broken = [];
const collisions = [];
// Counted separately: being listed in index.md is not the same as another page
// finding you worth linking to. Cross-page links are the thing this wiki exists for.
const inbound = new Map([...bySlug.keys()].map((s) => [s, { content: 0, index: 0 }]));

for (const [slug, paths] of bySlug) {
  if (paths.length > 1) collisions.push({ slug, paths: paths.map(rel) });
}

for (const page of pages) {
  const raw = readFileSync(page, "utf8");
  const body = stripCode(raw);
  const seen = new Set();
  for (const m of body.matchAll(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g)) {
    const target = m[1].trim();
    if (!target || seen.has(target)) continue;
    seen.add(target);
    if (bySlug.has(target)) {
      // Don't let a page's self-reference count as inbound interest.
      if (target !== basename(page, ".md")) {
        const fromIndex = basename(page, ".md") === "index";
        const rec = inbound.get(target);
        if (fromIndex) rec.index += 1;
        else rec.content += 1;
      }
    } else {
      broken.push({ from: rel(page), target });
    }
  }
}

let failed = false;

if (broken.length) {
  failed = true;
  console.log(`\nBROKEN WIKILINKS (${broken.length})`);
  for (const b of broken) console.log(`  ${b.from} -> [[${b.target}]]`);
  console.log(
    `\n  Either the target page does not exist yet, or the slug is misspelled.\n` +
      `  A broken link renders as marked plain text and warns at build time.`
  );
}

if (collisions.length) {
  failed = true;
  console.log(`\nBASENAME COLLISIONS (${collisions.length})`);
  for (const c of collisions) console.log(`  [[${c.slug}]] matches: ${c.paths.join(", ")}`);
  console.log(`\n  Links resolve by basename, so one of these is unreachable. Rename one.`);
}

if (wantGaps) {
  const missingSources = [];
  const unparsedSources = [];
  for (const page of pages) {
    const fm = frontmatter(readFileSync(page, "utf8"));
    const entries = parseSources(fm);
    if (entries === null) {
      unparsedSources.push(rel(page));
      continue;
    }
    for (const cleaned of entries) {
      if (!existsSync(join(repoRoot, cleaned))) {
        missingSources.push({ page: rel(page), source: cleaned });
      }
    }
  }

  const isIndex = (slug) => slug === "index";
  const unreferenced = [];
  const indexOnly = [];
  for (const [slug, n] of inbound) {
    if (isIndex(slug)) continue;
    if (n.content === 0 && n.index === 0) unreferenced.push(rel(bySlug.get(slug)[0]));
    else if (n.content === 0) indexOnly.push(rel(bySlug.get(slug)[0]));
  }

  const list = (label, items, note) => {
    console.log(`\n  ${label} (${items.length})`);
    for (const i of items) console.log(`    ${i}`);
    if (!items.length) console.log(`    none`);
    if (note && items.length) console.log(`    ${note}`);
  };

  console.log(`\nGAPS`);
  list("Unresolved sources: entries", missingSources.map((m) => `${m.page} -> ${m.source}`));
  list(
    "Pages with a sources: key this script could not parse",
    unparsedSources,
    "^ check by hand — these were skipped, not cleared."
  );
  list("Pages nothing links to at all", unreferenced);
  list("Pages reachable only from index.md", indexOnly);
  console.log(
    `\n  The last list is the interesting one. A page only the index links to is not wrong,\n` +
      `  but cross-page links are what this wiki is for — an entry here often means a\n` +
      `  connection nobody has drawn yet. Judgement, not a defect list.`
  );
}

const summary = `${pages.length} pages checked, ${broken.length} broken link(s), ${collisions.length} collision(s)`;
if (failed) {
  console.log(`\n${summary}\n`);
  process.exit(1);
}
console.log(`\nOK — ${summary}\n`);
process.exit(0);
