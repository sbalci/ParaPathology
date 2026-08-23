---
name: validate-vault
description: Use to health-check this GitBook/Tolaria vault's frontmatter and integrity — "validate the vault", "check the frontmatter schema", "run a health check", "find schema violations", "did that bulk frontmatter pass stay clean", or after any batch edit that touches many notes. Verifies every note's type/status/language/aliases against the vault schema, checks that relationship wikilinks resolve, confirms hierarchy is singular, catches double-frontmatter and body-wikilink leaks (GitBook safety), and confirms each type has a Type doc. Pair check.sh (frontmatter) with tools/generate_summary.py check (navigation).
---

# Validating the vault

This skill answers one question: **does every note still conform to the vault schema, and did the
last bulk edit stay GitBook-safe?** It diagnoses; it never repairs. Fixes belong to the skill that
owns them — `add-note` for intake, `update-index` for navigation.

Two commands cover the vault between them:

```bash
bash .claude/skills/validate-vault/check.sh     # frontmatter schema + GitBook safety
python tools/generate_summary.py check          # navigation graph (belongs_to / titles / TOC)
```

Run both. Each exits non-zero when it finds a problem. Everything `check.sh` mechanizes can also
be done by reading files with Read/Grep/Glob when the shell is unavailable.

---

## The schema this validates

```yaml
---
type: Note                       # Topic | Reference | Tool | Clipping | Lecture | Note
status: Developing               # Stub | Developing | Evergreen
language: en                     # en | tr | bilingual  (absent is valid for near-empty landings)
aliases:
  - "Exact H1 Title"             # required when the H1 differs from the filename stem
order: 120                       # position among siblings
belongs_to: "[[Parent Hub]]"     # exactly one primary parent
related_to:                      # lateral links only — never the parent
  - "[[Some Other Note]]"
publish: false                   # optional; keeps the note out of the public book
---
```

- **`type`** — exactly one per note, from the vocabulary above, plus `Type` for the docs in
  `types/`. Every value in use must have a matching Type doc.
- **`status`** — prose notes derive it from word count; `Reference`/`Tool` catalogs derive it from
  resource count (links + embeds + table rows), so a dense 30-link index is `Evergreen`, not
  `Stub`.
- **`language`** — or absent. A near-empty landing page intentionally carries no language;
  absence is valid, a wrong value is not.
- **`aliases`** — the Obsidian-compatibility contract. Tolaria resolves `[[Note Title]]` against
  the H1; Obsidian resolves it against the *filename*. Where the two differ — every `README.md`
  hub, every kebab-cased note with a prose title — the H1 must appear in `aliases:` or the edge
  silently dangles in Obsidian.
- **`belongs_to` / `order` / `publish`** — the navigation contract, owned by `update-index`.
- **Relationships** — any frontmatter key whose value holds `[[wikilinks]]`.

Notes here are **living documents**. There is no immutable-source layer: any note, clippings
included, may be annotated, pruned, and rewritten in place. `type` records where a note came
from; `status` records how far it has been taken.

---

## §1 Frontmatter schema conformance

For every content note (excluding the root `README.md`, `.claude/`, `attachments/`, `views/`,
`types/`, `SUMMARY.md`, and the generated `docs/` and `patoloji-hakkinda/` trees):

1. **Exactly one frontmatter block.** The file opens with `---` and has exactly one closing `---`
   before the body. Two blocks — from a blind prepend onto an existing block — is a hard fail.
   *Beware false positives:* `---` also marks horizontal rules and reveal.js slide separators in
   bodies (`what-is-cancer.md`). Only count `---` that bounds a YAML block at the very top.
2. **Valid YAML.** The block parses.
3. **`type` present and in-vocabulary.**
4. **`status` in-vocabulary** where present.
5. **`language` in-vocabulary or absent.**
6. **`aliases` present wherever the H1 differs from the filename stem**, compared
   case- and punctuation-insensitively (so `lavaan.md` titled `Lavaan` needs nothing, but
   `appendix/README.md` titled `Appendix` does).

---

## §2 Relationship integrity — bucket by intent

The graph is only as good as its edges resolving, but **not every frontmatter wikilink is meant to
resolve to a note.** Reporting all of them cries wolf, so each edge is bucketed by the key it came
from:

- **Structural edges** — `belongs_to`, `related_to`, `has`, and any unkeyed link. These **must**
  resolve to a real note's H1, alias, or filename stem (slug-tolerant). An unresolved one is the
  real signal: a typo, or an intentional not-yet-created hub. Reported under
  **`unresolved (should resolve)`**.
- **Hierarchy is singular.** `belongs_to` holds exactly one link. A second parent is a fail —
  demote it to `related_to`. (`tools/generate_summary.py check` reports this as
  `MULTIPLE belongs_to`.)
- **Attribution edges** — `author`, `source`, `editor`, `publisher`. These point at people and
  publishers that are *intentionally* not their own notes (Clipping bylines like `[[Sheng Wang]]`,
  `[[Modern Pathology]]`, `[[LWW]]`). Reported separately under **`attribution stubs (info)`** and
  never counted as a problem. Never invent the target.

The extractor walks the parsed YAML rather than regexing the block, so it knows which key each
wikilink belongs to. Unresolved structural edges are surfaced but do not fail the run — a hub
minted before its note is legitimate, as long as someone sees it.

---

## §3 GitBook safety and placement

The rules that protect the live book:

1. **No body `[[wikilinks]]`.** Grep each note for `[[` outside its frontmatter. GitBook renders
   them as raw brackets, so any leak is a fail. The single intentional exception is `AGENTS.md`,
   which documents the syntax. Body cross-links are relative Markdown links.
2. **Embeds and hints intact.** `{% embed %}` / `{% hint %}` and relative links preserved wherever
   a note was touched — frontmatter work must never rewrite body syntax.
3. **No content notes in the vault root.** The root holds `README.md`, `SUMMARY.md`, and the agent
   files; anything else there is an unfiled leftover (see `update-index` §5).

---

## §4 Type-doc coverage

Every `type` value in use must have a Type doc so Tolaria can render its icon and colour and
suggest its properties. For each distinct `type`, confirm `types/<type>.md` exists with
`type: Type` frontmatter. Report any type used without a doc — and any doc no note uses (dead
schema).

---

## §5 Bulk-pass sanity (when validating right after a batch edit)

- **Purely additive where it should be.** `git diff --numstat` deletions on the touched notes
  should be ~0 for a frontmatter pass — a nonzero deletion count means a body was harmed. Isolate
  the touched files; a raw diff against HEAD conflates earlier uncommitted work.
- **EOL clean.** With `core.autocrlf=false` and no `.gitattributes`, editing a file whose
  working-tree EOL drifted from its committed blob shows up as a whole-file rewrite. Most notes
  here are CRLF; match each file's existing endings so the diff reads as true changes.
- **Tolaria auto-commits this vault.** Don't judge a pass by `git status` — read `git log`. And
  don't leave scratch scripts inside the vault; they get committed. Write them outside it.

---

## §6 Report — a health snapshot

```
STATUS: PASS | FAIL
  type:        <n typed> / <total>   out-of-vocab: [...]   untyped: [...]
  status:      out-of-vocab: [...]
  language:    out-of-vocab: [...]   (absent is OK)
  aliases:     missing where H1 != filename: [...]
  frontmatter: double-block: [...]   invalid-YAML: [...]
  hierarchy:   multiple belongs_to: [...]
  relationships: unresolved (should resolve): [ note -> [[target]] ]
                 attribution stubs (info):    [ note -> [[Author]] (author) ]
  gitbook:     body-wikilink leaks: [...]   root-level content notes: [...]
  types:       missing Type doc: [...]   unused Type doc: [...]
census: Topic <n> - Reference <n> - Tool <n> - Clipping <n> - Lecture <n> - Note <n>
```

Then hand off: schema fixes are additive and low-risk; deletions, merges, and dedup are
approval-gated. This skill diagnoses, it does not delete — and it never touches `.gitbook/assets`.
