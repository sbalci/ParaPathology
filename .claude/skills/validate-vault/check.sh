#!/usr/bin/env bash
###############################################################################
# validate-vault/check.sh
#
# GitBook/Tolaria vault frontmatter health-check for ParaPathology.
# The Vault-Safe, GitBook-safe adaptation of a knowledge orchestrator's
# vault.validate + health-check. Read-only: it reports, it never repairs.
#
# Run from the vault root:   bash .claude/skills/validate-vault/check.sh
# Optional arg: a subtree to scan (default: whole vault).
#
# Exit code: 0 = PASS, 1 = FAIL (schema violations found).
###############################################################################
set -euo pipefail
SCAN_ROOT="${1:-.}"

python - "$SCAN_ROOT" <<'PY'
import os, re, sys

try:
    import yaml
    HAVE_YAML = True
except Exception:
    HAVE_YAML = False

ROOT = sys.argv[1] if len(sys.argv) > 1 else "."

TYPE_VOCAB   = {"Topic", "Reference", "Tool", "Clipping", "Lecture", "Note"}
STATUS_VOCAB = {"Stub", "Developing", "Evergreen"}
LANG_VOCAB   = {"en", "tr", "bilingual"}

# Directories and files that are not content notes
SKIP_DIRS  = {".git", ".claude", "attachments", "views", "node_modules", "_book", ".obsidian"}
SKIP_NAMES = {"SUMMARY.md", "AGENTS.md", "CLAUDE.md", "GEMINI.md", "MEMORY.md"}
# Body-wikilink leaks that pre-date this work and are intentional
LEAK_EXEMPT = {"AGENTS.md", "lavaan.md"}

WIKILINK = re.compile(r"\[\[([^\]]+)\]\]")

def is_root_readme(rel):
    return rel.lower() == "readme.md"

def split_frontmatter(text):
    """Return (fm_text, body_text, n_blocks, closed). Only a block that
    opens on line 1 counts as frontmatter."""
    lines = text.splitlines()
    if not lines or lines[0].strip() != "---":
        return None, text, 0, False
    # find closing --- 
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            fm = "\n".join(lines[1:i])
            body = "\n".join(lines[i+1:])
            # double-block heuristic: next non-empty body line is another ---
            j = i + 1
            while j < len(lines) and lines[j].strip() == "":
                j += 1
            second = (j < len(lines) and lines[j].strip() == "---")
            return fm, body, (2 if second else 1), True
    return "\n".join(lines[1:]), "", 1, False  # opened, never closed

def h1_of(text):
    for ln in text.splitlines():
        if ln.startswith("# "):
            return ln[2:].strip()
    return None

# ---- gather notes ---------------------------------------------------------
notes = []          # (rel, abspath, text)
titles = set()      # resolvable targets: H1 titles + filename stems
typedoc_stems = set()
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
    for fn in filenames:
        if not fn.endswith(".md"):
            continue
        ap = os.path.join(dirpath, fn)
        rel = os.path.relpath(ap, ROOT).replace("\\", "/")
        if fn in SKIP_NAMES or is_root_readme(rel):
            continue
        if rel.startswith(".claude/") or "/.claude/" in rel:
            continue
        try:
            text = open(ap, encoding="utf-8", errors="replace").read()
        except Exception:
            continue
        if rel.startswith("types/"):
            typedoc_stems.add(os.path.splitext(fn)[0].lower())
            continue  # Type docs validated separately
        notes.append((rel, ap, text))
        h1 = h1_of(text)
        if h1:
            titles.add(h1)
        titles.add(os.path.splitext(fn)[0])

# ---- relationship bucketing -----------------------------------------------
# Not every frontmatter wikilink is meant to resolve to a note. Attribution
# edges (author/source) point at people and publishers that are intentionally
# NOT their own notes -- reporting them as unresolved cries wolf. A Type
# relationship points at a Type doc in types/. Only structural edges
# (related_to / belongs_to / has) must resolve to a real content note.
ATTRIBUTION_KEYS = {"author", "authors", "source", "editor", "publisher"}
TYPE_REL_KEYS    = {"type"}   # the relationship named Type, not the type scalar

def iter_wikilinks(data, fm):
    # Yield (relationship_key, target) for every wikilink in frontmatter,
    # tagging each with the key it came from so it can be bucketed. Nested
    # dicts (a relationships: block) report the inner key (Type / related_to).
    # Falls back to an unkeyed scan if YAML did not parse.
    if isinstance(data, dict) and data:
        def walk(key, val):
            if isinstance(val, str):
                for t in WIKILINK.findall(val):
                    yield key, t.split("|")[0].strip()
            elif isinstance(val, list):
                for item in val:
                    yield from walk(key, item)
            elif isinstance(val, dict):
                for sub, subval in val.items():
                    yield from walk(str(sub), subval)   # nested: use inner key
        for k, v in data.items():
            yield from walk(str(k), v)
    else:
        for t in WIKILINK.findall(fm):
            yield "", t.split("|")[0].strip()

# ---- per-note checks ------------------------------------------------------
untyped, bad_type, bad_status, bad_lang = [], [], [], []
double_block, invalid_yaml, leaks = [], [], []
wikilink_targets = []          # (rel, key, target)
census = {t: 0 for t in TYPE_VOCAB}
census_other = 0

for rel, ap, text in notes:
    fm, body, nblocks, closed = split_frontmatter(text)
    if fm is None:
        untyped.append(rel)          # no frontmatter at all => no type
        continue
    if nblocks >= 2:
        double_block.append(rel)
    data = None
    if HAVE_YAML:
        try:
            data = yaml.safe_load(fm)
        except Exception:
            invalid_yaml.append(rel)
            data = None
    if not isinstance(data, dict):
        # fall back to a light key: value scan so we still census
        data = {}
        for ln in fm.splitlines():
            m = re.match(r"^([A-Za-z_][\w -]*):\s*(.*)$", ln)
            if m:
                data[m.group(1)] = m.group(2).strip().strip('"').strip("'")

    t = data.get("type")
    if t is None:
        untyped.append(rel)
    elif t not in TYPE_VOCAB:
        bad_type.append(f"{rel} -> {t!r}")
    else:
        census[t] += 1

    s = data.get("status")
    if s is not None and s not in STATUS_VOCAB:
        bad_status.append(f"{rel} -> {s!r}")

    lang = data.get("language")
    if lang is not None and lang not in LANG_VOCAB:
        bad_lang.append(f"{rel} -> {lang!r}")

    # relationship wikilinks live in frontmatter -- keyed so we can bucket them
    for key, tgt in iter_wikilinks(data, fm):
        wikilink_targets.append((rel, key, tgt))

    # body wikilink leak
    if "[[" in body and os.path.basename(rel) not in LEAK_EXEMPT:
        leaks.append(rel)

# ---- relationship resolution (bucketed) -----------------------------------
title_slugs = {re.sub(r"[^a-z0-9]+", "-", x.lower()).strip("-") for x in titles}

def _slug(v):
    return re.sub(r"[^a-z0-9]+", "-", v.lower()).strip("-")

def resolves_to_note(tgt):
    return tgt in titles or _slug(tgt) in title_slugs

def resolves_to_typedoc(tgt):
    return _slug(tgt) in typedoc_stems

unresolved   = []   # structural edges that SHOULD resolve but do not
attrib_stubs = []   # author/source person/publisher nodes not yet created (info)
for rel, key, tgt in wikilink_targets:
    kl = key.lower()
    if kl in ATTRIBUTION_KEYS:
        if not resolves_to_note(tgt):
            attrib_stubs.append(f"{rel} -> [[{tgt}]] ({key})")
        continue
    if kl in TYPE_REL_KEYS:
        if not (resolves_to_typedoc(tgt) or resolves_to_note(tgt)):
            unresolved.append(f"{rel} -> [[{tgt}]] (Type)")
        continue
    # structural edge (related_to / belongs_to / has / unkeyed)
    if not resolves_to_note(tgt):
        unresolved.append(f"{rel} -> [[{tgt}]]" + (f" ({key})" if key else ""))

# ---- type-doc coverage ----------------------------------------------------
used_types = {t for t, n in census.items() if n > 0}
missing_typedoc = sorted(t for t in used_types if t.lower() not in typedoc_stems)
unused_typedoc  = sorted(d for d in typedoc_stems if d.capitalize() not in used_types)

# ---- report ---------------------------------------------------------------
total = len(notes)
typed = sum(census.values())
fails = (bad_type or bad_status or bad_lang or double_block or invalid_yaml
         or leaks or missing_typedoc)

def show(label, items, limit=15):
    n = len(items)
    head = ", ".join(items[:limit]) + (" ..." if n > limit else "")
    print(f"  {label:<28} {n:>4}  {head if n else ''}")

print("=" * 72)
print(f"validate-vault  —  {total} content notes under {ROOT!r}")
print("=" * 72)
print(f"STATUS: {'FAIL' if fails else 'PASS'}")
print(f"  typed: {typed}/{total}" + ("" if HAVE_YAML else "   (PyYAML absent — key-scan fallback)"))
show("type out-of-vocab", bad_type)
show("untyped notes", untyped)
show("status out-of-vocab", bad_status)
show("language out-of-vocab", bad_lang)
show("double frontmatter", double_block)
show("invalid YAML", invalid_yaml)
show("unresolved (should resolve)", unresolved)
show("attribution stubs (info)", attrib_stubs)
show("NEW body-wikilink leaks", leaks)
show("missing Type doc", [f"{t} (types/{t.lower()}.md)" for t in missing_typedoc])
show("unused Type doc", unused_typedoc)
print("-" * 72)
print("census:  " + " · ".join(f"{t} {census[t]}" for t in
      ["Topic","Reference","Tool","Clipping","Lecture","Note"]))
print("=" * 72)
sys.exit(1 if fails else 0)
PY
