---
name: add-note
description: Use to bring a loose, orphan, or freshly-dropped note into this GitBook/Tolaria vault's conventions — "triage this note", "file this note", "type and place this orphan", "process the inbox", "bring this into the schema", or a note that update-index flagged as UNPLACED. Classifies the note's type, derives its status and language, writes the vault's full frontmatter contract (type/status/language/aliases/belongs_to/order), moves the file into the folder it belongs in, and publishes it by rebuilding SUMMARY.md with tools/generate_summary.py. For an external article use add-clipping, for a URL use add-link, for a repository use add-repository.
---

# Adding / triaging a note

This is the vault's **intake** skill. It takes a note that already exists as prose — an orphan
`update-index` surfaced, a rough note dropped in the vault root, a stray under `theories/` or
`social-topics/` — and brings it fully into the schema: a `type`, a derived `status` and
`language`, an `aliases` entry so its title resolves in Obsidian, exactly one `belongs_to` parent,
an `order` among its siblings, and a home folder. Then the generator publishes it.

It does **not** author content. If the note is empty or a stub, say so and stop; intake types and
places existing content, it does not invent it.

`add-clipping` / `add-link` / `add-repository` are for *new* external sources. `update-index` owns
navigation and `validate-vault` owns the schema check — this skill calls into both at its close
rather than duplicating them.

---

## §0 Gate: is there real content to file?

Read the note first.

- **Empty / H1-only note that is NOT a folder landing** → do not fabricate a body or force a
  status. Report it as a stub needing a human, and stop.
- **Empty / H1-only folder-landing README** → still publish it. A folder's `README.md` is its
  natural GitBook landing, so an empty one is expected, not a blocker: give it an H1 matching the
  folder if missing, then wire it as the section lead. Only a `"See gitbook here →"` redirect or
  an export stub stays out.
- **PHI check** (this vault is a public GitBook): no patient names, MRNs, accession numbers, dates
  of birth, or identifiable case detail. If present, stop and ask.
- **Already typed?** If the note already carries frontmatter, this is a re-triage — fill only the
  missing keys, never clobber an existing value.

---

## §1 Classify the type

Assign exactly one `type`, from location and role rather than guesswork:

| The note is… | type |
|---|---|
| A subject hub / section landing page (other notes `belongs_to` it) | **Topic** |
| A single software application or tool | **Tool** |
| A catalog / link-list / resource collection (many links or table rows) | **Reference** |
| A captured external article (lives under `Clippings/`) | **Clipping** |
| A med-school lecture (outline, bilingual `Ders adı` / `Başlıklar`) | **Lecture** |
| Anything else — a prose topic note | **Note** (default) |

When two fit — a tool note that is also a catalog of tools — prefer the more specific: a single
program is `Tool`; a list of programs is `Reference`.

### §1a Opt-in specializations of `Note`

`Note` is a broad bucket. Four **opt-in** types carve it at its natural joints. They are never
required — `Note` stays the valid default and migration is opportunistic — but when a *new* note is
clearly one of these, prefer the specific type so the graph and future views can see the joint:

| The prose note is… | type |
|---|---|
| A nameable diagnostic entity — a disease, tumor, lesion, or reaction pattern | **Disease** |
| An explanatory idea or mechanism — the "how" / "why", not a named entity | **Concept** |
| A method, assay, stain, or computational procedure | **Technique** |
| A theory, classification system, or analytical lens | **Framework** |

Each of the four has a Type doc in `types/` and is listed in `TYPE_VOCAB`
(`validate-vault/check.sh`). Choosing one is a per-note call at intake — this is what "add types as
new notes come" means in practice: you do not migrate the back-catalog, you type each *new* note at
its natural joint as it arrives. If none fits cleanly, `Note` is correct; never force a
specialization. To mint a genuinely new type beyond these four, see `validate-vault` §4.

---

## §2 Derive status and language

**`status`** is *type-aware*, so a dense catalog is not mislabeled a stub:

- `Note` / `Lecture` / `Topic` / `Clipping` → from **word count**: `Stub` (< ~40 words),
  `Developing` (~40–400), `Evergreen` (large and structured).
- `Reference` / `Tool` → from **resource count** (Markdown links + `{% embed %}` + table rows):
  `Stub` (≤ 2), `Developing` (3–15), `Evergreen` (≥ 16).

Status is a progress marker, not a verdict. Every note here is a living document: a `Stub` is
expected to be rewritten in place until it earns `Evergreen`.

**`language`** from orthography: Turkish letters (`ış ğ ç ö ü`, Turkish stopwords) and/or English.
Predominantly English → `en`; predominantly Turkish → `tr`; substantial both → `bilingual`. A
near-empty page gets **no `language` key** — absence is valid; never guess.

---

## §3 Write the frontmatter — merge, never double-block

The full contract for a filed note:

```yaml
---
type: Note
status: Developing
language: en
aliases:
  - "The Note's Exact H1"
order: 120
belongs_to: "[[Parent Hub]]"
related_to:
  - "[[A Genuinely Lateral Note]]"
---
```

- **`aliases` is not optional** whenever the H1 differs from the filename stem. Tolaria resolves
  `[[Title]]` against the H1, Obsidian against the *filename*; the alias is what makes one
  wikilink work in both. A kebab-cased file with a prose title needs one; `lavaan.md` titled
  `Lavaan` does not.
- **Note already has a `---` block** → insert the new keys *inside* it. Never prepend a second
  block; double frontmatter is a hard fail in `validate-vault`.
- **Wikilinks live only in frontmatter.** GitBook renders body `[[...]]` as raw brackets. Body
  cross-links are relative Markdown links.
- **EOL**: `core.autocrlf=false` here and most notes are CRLF — match the file's existing endings
  so the change reads as a clean addition rather than a whole-file rewrite.

---

## §4 Connect it — one parent, then lateral links

An unconnected note is invisible in Neighborhood mode and unplaceable in the book.

1. **`belongs_to` — exactly one.** Find the hub whose section the note belongs in and point at its
   exact H1 (or an alias). This single edge is what puts the note in `SUMMARY.md`; a second parent
   is a schema failure, not a richer graph.
2. **`related_to` — the lateral edges.** Genuine cross-topic connections, as many as are real.
   Never the parent. This is where a note earns its place in a Karpathy-style wiki: an
   interdisciplinary link that nothing in the hierarchy would have produced.
3. If the right hub does not exist yet, pointing at a not-yet-created `[[Hub]]` is acceptable —
   but surface it, because `check` will report it as `UNRESOLVED belongs_to`.

---

## §5 Put the file where it belongs

Frontmatter decides navigation, but the file still has to live somewhere sensible.

- Move it into the **folder of the part it belongs to** — the vault root is for `README.md`,
  `SUMMARY.md`, and the agent files only. A note in the root is an unfiled leftover.
- Filename is `kebab-case.md`. (`Clippings/` is the exception: those keep the article title.)
- Use `git mv`, then **fix the note's own relative links** — a note that moves one level deeper
  needs `../` on every relative link it contains, and loses a path segment on links to its new
  siblings. The generator does not check body links; this is on you.
- Incoming links from hub child-indexes repair themselves on the next `hubs` run.

---

## §6 Publish — rebuild, never hand-edit

`SUMMARY.md` is generated. With `belongs_to`, `order`, and (optionally) `publish: false` set:

```bash
python tools/generate_summary.py check
python tools/generate_summary.py generate --dry-run
python tools/generate_summary.py generate
python tools/generate_summary.py hubs
```

Read the dry-run diff before applying it. A new **part** (a new `## Section` in
`tools/summary-parts.json`) is an outward-facing decision — propose it, don't invent it silently.
See `update-index` for the full navigation contract.

---

## §7 Close — validate and report

1. Run `bash .claude/skills/validate-vault/check.sh` and
   `python tools/generate_summary.py check`. Both should be clean: typed, single frontmatter
   block, alias present, one parent, no body-wikilink leak, not sitting in the root.
2. Confirm the change was **additive** where it should be (no body deletions) and EOL-clean.
3. Report: the note, its `type` / `status` / `language`, the parent it was attached to, where the
   file now lives, and anything left for a human — an empty note, a missing hub, a PHI stop. Never
   skip silently; a note that could not be filed is itself worth reporting.

When run inside **add-batch**, defer the closeout (rebuild + one report) to the dispatcher; do
§0–§5 per note only.
