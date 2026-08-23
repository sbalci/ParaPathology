---
name: update-index
description: Use to publish a note into this GitBook/Tolaria vault's navigation, or to check that navigation's health — "update the table of contents", "add this note to SUMMARY", "rebuild the index", "check for broken links", "find orphan notes", or after a batch of new notes is filed. SUMMARY.md is a GENERATED file, built from note frontmatter (belongs_to / order / publish) by tools/generate_summary.py. This skill sets that frontmatter, runs the generator, refreshes the hub "In this section" blocks, and reports what changed. Never hand-edit SUMMARY.md.
---

# Updating the index

`SUMMARY.md` is the GitBook table of contents, and in this vault it is a **generated file** — the
public projection of three frontmatter keys, rebuilt by `tools/generate_summary.py`. Hand-editing
it is always wrong: the next `generate` run silently overwrites the edit, and the note quietly
falls back out of the book. To publish a note you change the *note*, then rebuild.

This skill needs the shell (the generator is a Python script). Everything else — reading notes,
editing frontmatter — uses the ordinary file tools.

`validate-vault` is the sibling skill: it owns the frontmatter schema. This one owns navigation.

---

## §1 The navigation contract

Three keys decide where a note lands in the book:

| Key | Meaning |
|---|---|
| `belongs_to` | Exactly **one** parent, as a quoted wikilink. This is the note's place in the tree. |
| `order` | Position among siblings under that parent. Ties break alphabetically by title. |
| `publish: false` | Keeps the note out of `SUMMARY.md` and out of its parent's child index. Absent means published. |

`related_to` is **not** navigation. It is the lateral, associative edge — "these two notes inform
each other" — and the generator ignores it entirely. Keeping the two apart is what makes the
hierarchy trustworthy; don't reach for `related_to` when you mean "lives under".

The book's top-level parts (the `## Section` headings) and their lead notes live in
`tools/summary-parts.json`, together with the preface and any external links. Children of a part's
**lead** note render flat at level 1 (the classic look); children of any other note nest beneath
it. A new part is a structural, outward-facing decision — propose it, never add it silently.

---

## §2 Publish a note

1. Set `belongs_to` to the hub whose section the note belongs in, using the parent's exact H1
   title or one of its aliases, so the edge resolves.
2. Set `order` in the neighbourhood of its siblings. Read two or three of them first — existing
   values are spaced so a new note usually fits between two of them without renumbering.
3. Leave `publish` off to publish it. Set `publish: false` for anything that should stay private:
   verbatim full-text clippings (see `add-clipping`), drafts, personal notes.
4. Rebuild (§3), then read the diff the dry run printed and confirm it is only what you intended.

---

## §3 Rebuild — four commands, in this order

```bash
python tools/generate_summary.py check              # lint the nav graph; must be 0 problems
python tools/generate_summary.py generate --dry-run # preview the SUMMARY.md diff
python tools/generate_summary.py generate           # rewrite SUMMARY.md
python tools/generate_summary.py hubs               # refresh "In this section" blocks
```

- **`check`** is the gate. Fix what it reports before generating — see §4.
- **`generate --dry-run`** prints a unified diff and writes nothing. Always look at it. An
  unexpected line here is the cheapest bug you will ever catch.
- **`hubs`** rewrites the child index between the `<!-- tolaria:children:start -->` and
  `<!-- tolaria:children:end -->` markers in every parent note. Those blocks are generated too —
  to change one, edit the child's frontmatter, not the list. Prose written *outside* the markers
  is preserved.

Run `generate` and `hubs` together; a hub's index and the TOC should never disagree.

---

## §4 What `check` reports, and what each one means

| Line | Meaning | Fix |
|---|---|---|
| `MISSING FILE in SUMMARY` | The TOC points at a path that no longer exists — usually a moved or renamed note. | Rerun `generate`. |
| `MULTIPLE belongs_to` | Two parents. Hierarchy must be singular. | Keep one; demote the other to `related_to`. |
| `UNRESOLVED belongs_to` | The parent wikilink matches no note's H1, alias, or filename stem. | Fix the typo, or create the hub. |
| `AMBIGUOUS belongs_to` | Two notes answer to that title. | Retitle one, or point at the unambiguous name. |
| `UNPLACED` | Published, but no `belongs_to` and no TOC entry — it would be invisible. | Give it a parent, or `publish: false`. |
| `DUPLICATE TITLE` | Two notes share an H1, so every wikilink to that title is ambiguous. | Retitle one and give it a distinct alias. |

An orphan that turns out to be a **build artifact** (`docs/`, `patoloji-hakkinda/`) is not a note —
those trees are produced by the GitHub Action and are excluded from the generator. Leave them.

---

## §5 Where the file goes

- **Every content note lives in a folder.** The vault root holds only `README.md`, `SUMMARY.md`,
  and the agent files. A note sitting in the root is a leftover, not a location: move it into the
  folder of the part it belongs to, and fix its relative body links in the same edit (a note that
  moves one level down needs `../` on every relative link it contains).
- **Filenames are `kebab-case.md`**, one note per file. The exception is `Clippings/`, whose files
  keep the human article title, because the Obsidian Web Clipper writes them that way.
- **A folder's landing page is its `README.md`**, carrying an H1 and an `aliases:` entry with that
  H1 so `[[Wikilinks]]` resolve in Obsidian as well as Tolaria.
- **Never create a folder named after its own parent** (`x/x/`). Those doubled folders were
  GitBook-export leftovers and have been flattened; don't reintroduce them.
- Use `git mv` when moving a note so the rename survives as a rename in history.

---

## §6 Regression guards

Two defects came out of the original GitBook export. Both have been swept, so what follows is a
**guard**, not a backlog — report anything that reappears, and never delete blind:

- **Paste duplication.** The same `## Heading` appearing three to six times in one note meant a
  block had been pasted repeatedly. Grep a suspect note for repeated heading text; the fix is
  keep-copy-one-then-reattach-the-unique-tail, an approval-gated content edit rather than
  something to do inside this skill.
- **Duplicate titles and `-1` files.** Whole-note duplicates from the export/merge
  (`writing-journal-articles-1.md`, two notes sharing an H1). `check` catches the title half
  automatically; a duplicate *file* still needs a human deletion decision.

Assets are out of scope: **never delete anything under `.gitbook/assets`**, including files no
Markdown references. That is a standing instruction from the vault owner.

---

## §7 GitBook-safe throughout

- Wikilinks live in **frontmatter only**. GitBook renders body `[[...]]` as raw brackets, so body
  cross-links are relative Markdown links.
- Preserve `{% embed %}` / `{% hint %}` and existing relative links verbatim wherever you touch a
  note.
- Don't rewrite note bodies here beyond the child-index blocks the generator owns.

---

## §8 Report

One summary: which notes were published (and with what `belongs_to` / `order`), the `SUMMARY.md`
diff in a line ("N entries added, M moved"), anything `check` still reports, and any orphan or
duplicate left for a human. A note that could not be placed is itself worth reporting — never let
it disappear silently.
