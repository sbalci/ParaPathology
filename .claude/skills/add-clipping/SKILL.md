---
name: add-clipping
description: Use when an article, paper, review, or web page should be captured into this GitBook/Tolaria vault — "clip this", "save this article", "add this paper to Clippings", or a URL the user wants preserved with its abstract, author, and text rather than just bookmarked. Files a note under Clippings/ in the Obsidian-Web-Clipper schema plus the vault's own frontmatter layer (type/status/language/belongs_to/order), decides publish vs publish:false on copyright grounds, and rebuilds SUMMARY.md. For a bare pointer, use add-link; for a code repository, use add-repository.
---

# Adding a clipping

`Clippings/` holds captures of articles and papers, created with the Obsidian Web Clipper. This
skill files a new one in the schema the existing clippings use, so the collection stays uniform —
and wires it into the vault graph like any other note.

Clippings are **living documents** here, not frozen sources. A capture may be annotated, pruned,
and rewritten in place until it becomes your own synthesis; at that point retype it to `Note` or
`Reference`. `type` records where it came from, `status` records how far it has been taken.

---

## §0 Two gates, before writing anything

**PHI.** This vault is a public GitBook. No patient names, MRNs, accession numbers, dates of
birth, or identifiable case detail. A published article is fine; a case screenshot, report, or
slide label is not. In doubt, stop and ask.

**Copyright.** A verbatim full-text capture of someone else's article must not be published.
Decide now which of the two shapes this clipping is:

| The capture is… | Then |
|---|---|
| The article's **full text**, copied | `publish: false`. It stays in the vault for private use, out of the book. |
| Your **own-words digest** with a citation and a link to the source | Publish it. |

Either is welcome in the vault; only one is publishable. When a private capture is later rewritten
in your own words, drop `publish: false` and rerun the generator.

---

## §1 Frontmatter — the clipper schema plus the vault layer

Read one or two existing `Clippings/*.md` notes and copy their shape. The full frontmatter:

```yaml
---
type: Clipping
status: Developing
language: en
title: "Full Article Title"
source: "https://the-canonical-url"
source_type: article    # article for a paper/web page, video for a talk or YouTube capture
author:
  - "[[Author or Journal Name]]"
published: YYYY-MM-DD
created: YYYY-MM-DD
description: "The article's own abstract or blurb, verbatim."
tags:
  - "clippings"
order: 80
belongs_to: "[[Clippings]]"
related_to:
  - "[[Topic This Informs]]"
publish: false          # only for verbatim full-text captures
---
```

- **`title:`** carries the human title; the filename does too, so no `aliases:` entry is needed
  unless you shorten one of them.
- **`author:`** is a YAML list of quoted wikilinks. These are *attribution* edges — they point at
  people and journals that intentionally have no note, and `validate-vault` reports them as info,
  never as unresolved links.
- **`belongs_to: "[[Clippings]]"`** — the `Clippings/README.md` hub. `order` positions it there.
- **`related_to:`** is where a clipping earns its keep: link the topic notes it informs.
- **`created:`** is the capture date; **`published:`** may be left empty if unknown.
- **`source_type:`** records the medium — `article` for a paper or web page, `video` for a talk
  or YouTube capture. Set it on every capture; it feeds `views/videos.yml`. It is a *property*,
  not a separate type — the note is still `type: Clipping`.

Use `references/clipping-template.md` as the starting shape.

---

## §2 Body: summary first, then the capture

- Lead with `## Summary` (or the article's own abstract heading) — the existing clippings do, and
  Tolaria takes the title from the H1 or frontmatter, so a repeated H1 is noise.
- Preserve the article's real structure (Summary, Keywords, sections) and its own links as plain
  Markdown. Keep figures as standard `![](url)` references.
- **No body `[[wikilinks]]`** — GitBook renders them as raw brackets. Cross-connection lives in
  `author:` and `related_to:` frontmatter.

---

## §3 Filename and placement

- Save as `Clippings/<Article Title>.md`. The existing notes use the human title as the filename
  (spaces allowed), so match that rather than forcing kebab-case here.
- If a clipping with that title already exists, **don't overwrite** — report it and stop.

---

## §4 Reconstruct faithfully; never fabricate

- Take `description:` from the article's own abstract, verbatim. If there is none, write a
  one-line factual summary and say plainly that it is yours — don't invent an abstract.
- If a field can't be determined (no clear author, no date), leave it empty as the schema allows
  rather than guessing. Mark anything uncertain `[unverified]`.
- Never silently drop sections you captured. If the source was paywalled and only the abstract is
  available, capture the abstract and say so.
- Watch for scraped page furniture — cookie banners, "Tell us what you think… 12345" feedback
  widgets, navigation crumbs. Strip them; they have been mistaken for content here before.

---

## §5 Close — publish or keep private, then rebuild

Published clippings appear in `SUMMARY.md` as children of the `[[Clippings]]` hub, so filing the
note is *not* the whole job any more:

```bash
python tools/generate_summary.py check
python tools/generate_summary.py generate
python tools/generate_summary.py hubs
```

A clipping carrying `publish: false` is skipped by both — it stays in the vault, and in Tolaria
and Obsidian, but never reaches the book.

Report the new note's path, the publish decision and its reason, and any `[unverified]` field.
When run inside a batch, **add-batch** owns the single closeout — file the note and stop.
