---
name: validate-vault
description: Use to health-check this GitBook/Tolaria vault's frontmatter and integrity — "validate the vault", "check the frontmatter schema", "run a health check", "find schema violations", "did that bulk frontmatter pass stay clean", or after any batch edit that touches many notes' frontmatter. Verifies every note's type/status/language against the allowed vocabulary, checks that relationship wikilinks resolve, catches double-frontmatter and body-wikilink leaks (GitBook safety), and confirms each type has a Type doc — all with file tools (an optional check.sh accelerates it under Power User shell). Complements update-index, which covers the TOC/link/paste-dup side.
---

# Validating the vault

This is the ParaPathology-native, GitBook-safe, Vault-Safe translation of a knowledge
orchestrator's `vault.validate` + `health-check`. Where that tool validated a JSON schema
(`id`/`type`/hash IDs) for a code-knowledge vault, this validates *your* schema: the additive
frontmatter layer built on top of a live GitBook — `type`, `status`, `language`, and
relationship wikilinks — without ever touching the published body.

It answers one question: **does every note still conform to the schema, and did the last bulk
frontmatter pass stay purely additive and GitBook-safe?** These are the exact checks run by
hand across the enrichment, metadata-backfill, and Tool-split passes; this skill makes them
repeatable.

`update-index` is the sibling skill: it owns the TOC (SUMMARY.md links, orphans,
paste-duplication fingerprint, `-1` duplicate folders). This skill owns the *frontmatter*.
Run both for a full health check.

Vault-Safe: Read / Grep / Glob are enough to perform every check by reading files. Under Power
User mode, `check.sh` mechanizes §1–§4 deterministically (null-delimited find + Python YAML
parse, so filenames-with-spaces and multi-line frontmatter are handled). Never auto-repair from
this skill — report, then fix under the relevant approval-gated task.

---

## The schema this validates

Established in the type-system and metadata work (see the [[graph-readiness-enrichment]] memory):

- **`type`** in { `Topic`, `Reference`, `Tool`, `Clipping`, `Lecture`, `Note` } for content
  notes, plus `Type` for the docs in `types/`. Exactly one per note. Every value must have a
  matching Type doc in `types/`.
- **`status`** in { `Stub`, `Developing`, `Evergreen` }. Prose notes derive it from word count;
  `Reference`/`Tool` catalogs derive it from resource count (links + embeds + rows), so a dense
  catalog is not mislabeled `Stub`.
- **`language`** in { `en`, `tr`, `bilingual` }, **or absent** (near-empty `und` landing pages
  intentionally carry no language — absence is valid, a wrong value is not).
- **Relationships** — any frontmatter key whose value holds `[[wikilinks]]` (`related_to`,
  `belongs_to`, `has`, `author`, the `Type` relationship). Each wikilink should resolve to a
  real note's H1 title (an intentional not-yet-created hub is allowed but should be reported).

---

## §1 Frontmatter schema conformance

For every content note (exclude `README.md` roots, `.claude/`, `attachments/`, `views/`,
`types/`, `SUMMARY.md`):

1. **Exactly one frontmatter block.** The file opens with `---` and has exactly one closing
   `---` before the body. Two blocks (a double-frontmatter bug from a blind prepend onto an
   existing block) is a hard fail. *Beware false positives:* `---` also marks horizontal rules
   and reveal.js slide separators in bodies (`what-is-cancer.md`) — only count `---` that bound
   a YAML block at the very top of the file.
2. **Valid YAML.** The block parses (PyYAML in `check.sh`; by eye otherwise).
3. **`type` present and in-vocabulary.** Every content note has exactly one `type` from the set
   above. Report untyped notes and any out-of-vocabulary value.
4. **`status` in-vocabulary** where present.
5. **`language` in-vocabulary or absent.** A present-but-wrong value is a fail; absence is fine.

---

## §2 Relationship integrity — bucket by intent

The graph is only as good as its edges resolving, but **not every frontmatter wikilink is meant
to resolve to a note.** Blindly reporting all of them cried wolf (26 author stubs drowned the one
real dangler), so `check.sh` buckets each edge by the *key* it came from:

- **Structural edges** — `related_to`, `belongs_to`, `has` (and any unkeyed link). These
  **must** resolve to a real note's H1 title or filename stem (slug-tolerant). An unresolved one
  is the real signal: a typo to fix, or an intentional not-yet-created hub to surface. Reported
  under **`unresolved (should resolve)`**.
- **Type edges** — the relationship literally named `Type` (e.g. a `relationships: {Type: [[note]]}`
  block). These point at a **Type doc** in `types/`, so they resolve against Type-doc stems, not
  content notes. (Only `lavaan.md` ever carried one; it was a one-off import artifact and was
  removed — but the check stays so the pattern can't silently rot if it reappears.)
- **Attribution edges** — `author`, `source`, `editor`, `publisher`. These point at people and
  publishers that are *intentionally* not their own notes (Clipping bylines like `[[Sheng Wang]]`,
  `[[Modern Pathology]]`, `[[LWW]]`). Reported separately under **`attribution stubs (info)`** and
  **never** counted as a problem. Never invent the target.

To bucket correctly the extractor walks the parsed YAML (not a flat regex over the block) so it
knows which key each `[[wikilink]]` belongs to, including one level of nesting for a
`relationships:` map. Unresolved structural edges are surfaced but **do not fail the run** — a
not-yet-created hub (e.g. `[[Appendix]]` minted before its hub note) is legitimate.

---

## §3 GitBook safety (the leak check)

The rule that protects the live book:

1. **No body `[[wikilinks]]`.** Grep each note for `[[` outside its frontmatter block. GitBook
   renders body wikilinks as raw brackets, so any leak is a fail. Known pre-existing exceptions
   to acknowledge, not "fix": `AGENTS.md` (documents the syntax) and `lavaan.md` (authored body
   links that predate this work). A *new* leak from a recent edit is the real signal.
2. **Embeds/hints intact.** Where a note was touched, `{% embed %}` / `{% hint %}` and relative
   links are preserved — frontmatter work must never rewrite body syntax.

---

## §4 Type-doc coverage

Every `type` value in use must have a Type doc so Tolaria can render its icon/color and suggest
its properties:

- For each distinct `type` across the vault, confirm `types/<type>.md` exists (`type: Type`
  frontmatter). Report any type used on notes but missing a Type doc — and any Type doc that no
  note uses (dead schema).

---

## §5 Bulk-pass sanity (when validating right after a batch edit)

When this run follows a large frontmatter pass, add the two invariants that proved a pass clean
all session:

- **Purely additive.** `git diff --numstat` deletions on the touched notes should be ~0 —
  frontmatter insertion/value-edit cannot remove body lines, so a nonzero deletion count means a
  body was harmed. (Isolate the touched files; a raw vs-HEAD diff conflates earlier uncommitted
  work.)
- **EOL clean.** With `core.autocrlf=false` and no `.gitattributes`, a prepend onto a file whose
  working-tree EOL drifted from its committed blob shows as a whole-file rewrite. Normalize each
  touched file to its own HEAD-blob EOL so the diff reads as true additions. (See the
  [[graph-readiness-enrichment]] memory for this gotcha.)

---

## §6 Report — a health snapshot

Emit one summary, in the orchestrator's PASS/FAIL spirit but for this schema:

```
STATUS: PASS | FAIL
  type:        <n typed> / <total>   out-of-vocab: [...]   untyped: [...]
  status:      out-of-vocab: [...]
  language:    out-of-vocab: [...]   (absent is OK)
  frontmatter: double-block: [...]   invalid-YAML: [...]
  relationships: unresolved (should resolve): [ note -> [[target]] ]
                 attribution stubs (info):    [ note -> [[Author]] (author) ]
  gitbook:     new body-wikilink leaks: [...]  (AGENTS.md, lavaan.md excluded)
  types:       missing Type doc: [...]   unused Type doc: [...]
census: Topic <n> · Reference <n> · Tool <n> · Clipping <n> · Lecture <n> · Note <n>
```

Then hand off: schema fixes are additive and low-risk (do them under the metadata task);
deletions and dedup are the approval-gated Category-B / duplication-sweep tasks — this skill
diagnoses, it does not delete.
