---
name: add-note
description: Use to bring a loose, orphan, or freshly-dropped note into this GitBook/Tolaria vault's conventions — "triage this note", "file this note", "type and place this orphan", "process the inbox", "bring this into the schema", or an orphan that update-index flagged as not-in-SUMMARY. Classifies the note's type, derives its status and language, adds additive frontmatter (type/status/language + a related_to hub edge), and wires it into SUMMARY.md — all GitBook-safe (frontmatter only) and Vault-Safe (file tools). This is the intake counterpart to update-index (TOC) and validate-vault (health check); for an external article use add-clipping, for a URL use add-link, for a repo use add-repository.
---

# Adding / triaging a note

This is the vault's **intake** skill — the GitBook-safe translation of a knowledge
orchestrator's `inbox.process`. It takes a note that already exists as prose (an orphan
`update-index` surfaced, a rough note you dropped in the vault root, a `theories/` or
`social-topics/` stray) and brings it fully into the schema built this session: a `type`, a
derived `status` and `language`, at least one `related_to` hub edge so it is not an island in
the graph, and — unless it is a Clipping — a line in `SUMMARY.md` so GitBook publishes it.

It does **not** author content. If the note is empty or a stub, say so and stop; intake types
and places existing content, it does not invent it.

Vault-Safe: Read / Write / Edit / Grep / Glob (plus the optional shell derivations under Power
User mode). No content is rewritten — every change is additive frontmatter plus one TOC line.

`add-clipping` / `add-link` / `add-repository` are for *new* external sources; this skill is for
a note whose body already exists and just needs typing, connecting, and publishing. `update-index`
owns the TOC mechanics and `validate-vault` owns the health check — this skill calls into both at
its close rather than duplicating them.

---

## §0 Gate: is there real content to file?

Read the note first.

- **Empty / H1-only note that is NOT a folder landing** → do not fabricate a body or force a
  status. Report it as a stub needing a human, and stop. (These are the `und` pages
  `validate-vault` leaves language-less.)
- **Empty / H1-only folder-landing README** → still publish it. A folder's `README.md` (or a
  non-redirect `index.md`) is its natural GitBook landing, so an empty one is expected, not a
  blocker: give it an H1 matching the folder if missing, then wire it as the section lead via
  `update-index` §1. Only a `"See gitbook here →"` redirect / export stub stays out.
- **PHI check** (this vault is a public GitBook): no patient names, MRNs, accession numbers,
  dates of birth, or identifiable case detail. If present, stop and ask.
- **Already typed?** If the note already has `type` frontmatter, this is a re-triage — only fill
  the missing fields, never clobber an existing value.

---

## §1 Classify the type

Assign exactly one `type` from the vocabulary, using the same rules the metadata backfill used
(location + role, not guesswork):

| The note is… | type |
|---|---|
| A subject hub / section landing page (many notes point at it) | **Topic** |
| A single software application or tool | **Tool** |
| A catalog / link-list / resource collection (many links or table rows) | **Reference** |
| A captured external article (lives under `Clippings/`) | **Clipping** |
| A med-school lecture (outline, bilingual `Ders adı` / `Başlıklar`) | **Lecture** |
| Anything else — a prose topic note | **Note** |

When two fit (a tool note that is also a catalog of tools), prefer the more specific: a single
program is `Tool`; a list of programs is `Reference`.

---

## §2 Derive status and language

**`status`** is *type-aware* (this is why a dense catalog is not mislabeled a stub):

- `Note` / `Lecture` / `Topic` / `Clipping` → from **word count**: `Stub` (< ~40 words),
  `Developing` (~40–400), `Evergreen` (large + structured).
- `Reference` / `Tool` → from **resource count** (markdown links + `{% embed %}` + table rows):
  `Stub` (≤ 2), `Developing` (3–15), `Evergreen` (≥ 16). A complete 30-link index is `Evergreen`,
  not `Stub`.

**`language`** from orthography: Turkish letters (`ış ğ ç ö ü` + Turkish stopwords) and/or English.

- Predominantly English → `en`; predominantly Turkish → `tr`; substantial both → `bilingual`.
- A near-empty page gets **no `language` key** — absence is valid; never guess a language for a
  page with no prose.

---

## §3 Add frontmatter — merge, never double-block

Frontmatter is the additive Tolaria layer GitBook reads as inert page metadata. The one hazard is
creating a *second* frontmatter block.

- **Note already has a `---` block** → insert the new scalar keys *inside* it, right after the
  opening `---` (above any existing `related_to`). Do not prepend a second block.
- **No frontmatter yet** → prepend a fresh block:

```yaml
---
type: Note
status: Developing
language: en
related_to:
  - "[[Parent Hub]]"
---
```

- **Wikilinks live only in frontmatter**, never in body prose — GitBook renders body `[[...]]` as
  raw brackets. This is the rule that keeps the live book intact.
- **EOL**: with `core.autocrlf=false` here, match the file's existing line endings so the change
  reads as a clean addition, not a whole-file rewrite. (See the [[graph-readiness-enrichment]]
  memory.)

---

## §4 Connect it — at least one hub edge

An untyped island is invisible in Neighborhood mode. Give the note a home:

1. Find where it belongs — the `##` section in `SUMMARY.md` whose siblings it matches, or the
   nearest subject hub.
2. Add `related_to: "[[Hub Title]]"` (a YAML list for several). Use the hub note's **real H1
   title** so the edge resolves — mirror the nesting the enrichment used (`Colon and Rectum →
   Gastrointestinal Pathology → Systemic Pathology`).
3. If the right hub does not exist yet, it is fine to point at a not-yet-created `[[Hub]]` — but
   surface it (that is exactly the "unresolved (should resolve)" line `validate-vault` reports).

---

## §5 Publish — wire it into the TOC

Unless the note is a `Clipping` (the `Clippings/` folder is intentionally out of the TOC):

- Add one `* [Note Title](relative/path.md)` line under the correct `##` section in `SUMMARY.md`,
  at the right nesting indent, link text = the note's H1. Hand this to **update-index** (its §1),
  or do the single insertion here and let update-index verify it resolves.
- A new section is a bigger, outward-facing decision (the `theories/` / `social-topics/` strays
  have no home section yet) — propose it, do not invent it silently.

---

## §6 Close — validate and report

1. Run **validate-vault** (`check.sh`) — confirm the note is now typed, in-vocabulary, single
   frontmatter block, no body-wikilink leak, and its hub edge resolves (or is a surfaced stub).
2. Confirm the change was **purely additive** (no body deletions) and EOL-clean.
3. Report: the note, its assigned `type` / `status` / `language`, the hub it was linked to, the
   TOC line added, and anything left for a human (an empty note, a missing hub section, a PHI
   stop). Never silently skip — a note that could not be filed is itself worth reporting.

When run inside **add-batch**, defer the single closeout (SUMMARY refresh + one report) to the
dispatcher; do steps §0–§4 per note only.
