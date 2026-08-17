---
name: update-index
description: Use to keep this GitBook vault's navigation and hygiene healthy — "update the table of contents", "add this new note to SUMMARY", "check for broken links", "find duplicate notes", or after a batch of new notes is filed. Verifies and repairs SUMMARY.md (the GitBook TOC), checks that its entries resolve to real files, and flags the vault's known problems (paste-duplication fingerprint, the -1 duplicate folders) — all with file tools, no Node or build step.
---

# Updating the index

`SUMMARY.md` is the GitBook table of contents — a nested bullet tree of `* [Title](path.md)`
entries grouped under `##` section headings. A note that isn't in `SUMMARY.md` (and isn't in a
folder GitBook auto-includes) won't be published, so keeping it correct is what makes new notes
visible. This skill is the Vault-Safe replacement for the source repo's `node wiki-check.mjs`:
the same link-integrity and structure checks, done with Grep/Glob/Read.

Vault-Safe: Read / Write / Edit / Grep / Glob only. No shell, git, Node, or Quarto.

---

## §1 Add new notes to the TOC

For each new note that should be published:

- Find the right `##` section in `SUMMARY.md` (e.g. `## Introduction`, `## Medical School
  Lectures`) by topic — mirror where sibling notes sit.
- Insert `* [Note Title](relative/path/to/note.md)` at the correct nesting level (two-space
  indent per level, as the existing tree does). The link text should match the note's H1.
- `Clippings/` is intentionally **not** in the TOC — don't add clippings.

---

## §2 Verify entries resolve (the link check)

The core integrity pass, replacing `wiki-check.mjs`:

1. **Every TOC link points to a real file.** For each `[text](path.md)` in `SUMMARY.md`, confirm
   the path exists (Glob/Read). Report any that don't — these are broken TOC entries.
2. **No orphan notes.** Glob all `*.md` and list any content note *not* referenced by
   `SUMMARY.md` (excluding `Clippings/`, `README.md`, `.claude/`, `attachments/`, `views/`). An
   orphan is either a note to add to the TOC or a leftover to remove — flag, don't guess.
3. **Report, don't auto-delete.** Removing or renaming notes is outward-facing and hard to
   reverse; surface the list and let the user decide.

---

## §3 Flag the vault's known hygiene problems

This vault was migrated from a GitBook export and carries two recurring defects — surface any
you find:

- **Paste-duplication fingerprint.** Grep each suspect note for repeated identical `## ` heading
  text (e.g. the same `## Title` appearing 3–6×). That signature means a block was pasted
  multiple times. Report the file and repeat count; the fix is the dedup pass (keep copy 1, then
  re-attach any unique tail — see the duplication-sweep memory), not something to do blind here.
- **`-1` duplicate folders / notes.** Note pairs like `pathology-and-social-media-1/` vs
  `pathology-and-social-media/`, or `writing-journal-articles-1.md`, are whole-note duplicates
  from the export/merge. These need a *deletion* decision (Category B) — flag them, never delete
  without explicit approval.

---

## §4 GitBook-safe throughout

- Edit `SUMMARY.md` structure only; don't rewrite note bodies here.
- Keep `{% embed %}`/`{% hint %}` and relative links intact wherever you touch a note.
- Never introduce body `[[wikilinks]]` — TOC entries are Markdown links, relationships are
  frontmatter.

---

## §5 Report

Produce one summary: TOC entries added, broken links found, orphan notes, paste-duplication
suspects, and `-1` duplicate pairs. This is a diagnosis-and-repair-TOC skill — the deeper
content fixes (dedup, merges, deletions) are separate, approval-gated tasks.
