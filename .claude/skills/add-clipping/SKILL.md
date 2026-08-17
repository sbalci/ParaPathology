---
name: add-clipping
description: Use when an article, paper, review, or web page should be captured in full into this GitBook pathology vault — "clip this", "save this article", "add this paper to Clippings", or a URL the user wants preserved with its abstract, author, and text rather than just bookmarked. Files a note under Clippings/ matching the vault's existing Obsidian-Web-Clipper frontmatter schema. For a bare pointer with no need to preserve content, use add-link instead; for a code repository, use add-repository.
---

# Adding a clipping

The vault's `Clippings/` folder holds full-text captures of articles and papers, created with the
Obsidian Web Clipper. This skill files a new one **in the exact schema the existing clippings
use**, so the collection stays uniform.

Vault-Safe: Read / Write / Edit / Grep / Glob only. No shell, git, or Node.

---

## §0 Content-safety gate (do this first)

This vault is **public** (a live GitBook). Before writing anything, confirm the source contains
no PHI — no patient names, MRNs, accession numbers, dates of birth, or identifiable case details.
A published article is fine. A screenshot of a case, a report, or a slide label is not. If in
doubt, stop and ask.

---

## §1 Match the existing schema exactly

Read one or two existing `Clippings/*.md` notes first and copy their frontmatter shape. The
schema in use (Obsidian Web Clipper) is:

```yaml
---
title: "Full Article Title"
source: "https://the-canonical-url"
author:
  - "[[Author or Journal Name]]"
published:
created: YYYY-MM-DD
description: "The article's own abstract or blurb, verbatim."
tags:
  - "clippings"
---
```

Notes:
- **`author:` is a YAML list of quoted wikilinks.** This is the one place wikilinks appear — and
  it's in *frontmatter*, so GitBook ignores it and Tolaria reads it as a relationship. That's
  safe. Do **not** put `[[wikilinks]]` in the body.
- **`created:`** is the capture date (today: fill from the current date).
- **`published:`** may be left empty if unknown — the existing notes do.
- **`tags:`** always includes `clippings`; add topical tags only if the existing notes do.
- **`source:`** is the canonical article URL, quoted.

Use `references/clipping-template.md` in this skill directory as the starting shape.

---

## §2 Body: the H1, then the captured content

- Start the body with `## Summary` (or the article's own abstract heading) — the existing
  clippings lead with `## Summary` / `## Keywords`, not a repeated H1. Tolaria takes the title
  from frontmatter; GitBook shows the file. Follow the pattern the existing notes use.
- Preserve the article's real structure (Summary, Keywords, sections) and its own links as plain
  Markdown. Keep any figures as standard `![](url)` references.
- **No body `[[wikilinks]]`.** Cross-connection is expressed via the `author:` frontmatter and,
  if useful, a `related_to:` frontmatter line — never in prose.

---

## §3 Filename and placement

- Save as `Clippings/<Article Title>.md` — the existing notes use the human title as the filename
  (spaces allowed), so match that rather than forcing kebab-case here.
- If a clipping with that title already exists, **don't overwrite** — report it and stop.

---

## §4 Reconstruct faithfully; never fabricate

- Take the `description:` from the article's own abstract, verbatim. If there is none, write a
  one-line factual summary and mark it plainly — don't invent an abstract.
- If a field can't be determined (no clear author, no date), leave it empty as the schema allows
  rather than guessing. Mark anything uncertain `[unverified]`.
- Never silently drop sections you captured. If the source was paywalled and only the abstract is
  available, capture the abstract and say so.

---

## §5 Close

Clippings are **not** in `SUMMARY.md` (the folder isn't part of the GitBook TOC), so no TOC edit
is needed — filing the note is the whole job. When run inside a batch, **add-batch** owns the
single closeout; report the new note's path and stop.
