# Clipping template

Copy-paste shape for `Clippings/<Article Title>.md`. Filename is the human title (spaces allowed),
not kebab-case — that is what the Obsidian Web Clipper writes.

The **only** wikilinks are in frontmatter (`author:`, `belongs_to:`, `related_to:`) — Tolaria reads
them, GitBook ignores them. Keep the body free of `[[wikilinks]]`.

```markdown
---
type: Clipping
status: Developing
language: en
title: "Full Article Title"
source: "https://the-canonical-url"
author:
  - "[[Author or Journal Name]]"
published:
created: YYYY-MM-DD
description: "The article's own abstract or blurb, verbatim. If the source has no abstract, write a factual one-liner and say it is yours."
tags:
  - "clippings"
order: 80
belongs_to: "[[Clippings]]"
related_to:
  - "[[Topic This Informs]]"
publish: false
---
## Summary

<the article's abstract, or a faithful summary>

## Keywords

1. [keyword](url)
2. [keyword](url)

## <first real section heading from the article>

<captured text, preserving the source's own links as plain Markdown>
```

Field notes:

- `publish: false` — **keep it** for a verbatim full-text capture; that text is someone else's
  copyright and must stay out of the public book. **Delete the line** once the clipping has been
  rewritten in your own words with a citation, or if it was an own-words digest from the start.
- `belongs_to: "[[Clippings]]"` — the `Clippings/README.md` hub. `order` places it among siblings;
  read two neighbours and pick a value between them.
- `related_to:` — the topic notes this article informs. This is the edge that makes a clipping
  useful later; a clipping with none is a dead end.
- `status:` — from length and structure, same as any note. It is a progress marker: raise it as
  you annotate and rewrite the capture in place.
- `created:` — capture date. `published:` — original publication date; leave empty if unknown.
- `author:` — one YAML list entry per author, or the journal. Attribution edges, not links to
  notes; `validate-vault` reports them as info.
- If paywalled, capture the abstract only and note that the full text was unavailable.
