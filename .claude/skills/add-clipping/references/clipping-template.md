# Clipping template

Copy-paste shape for `Clippings/<Article Title>.md`, matching the vault's existing
Obsidian-Web-Clipper notes. Filename is the human title (spaces allowed), not kebab-case.

The **only** wikilinks are in the `author:` frontmatter list — that is a Tolaria relationship
GitBook ignores. Keep the body free of `[[wikilinks]]`.

```markdown
---
title: "Full Article Title"
source: "https://the-canonical-url"
author:
  - "[[Author or Journal Name]]"
published:
created: YYYY-MM-DD
description: "The article's own abstract or blurb, verbatim. Leave a factual one-liner and mark it if the source has no abstract."
tags:
  - "clippings"
---
## Summary

<the article's abstract or a faithful summary>

## Keywords

1. [keyword](url)
2. [keyword](url)

## <first real section heading from the article>

<captured text, preserving the source's own links as plain Markdown>
```

Field notes:
- `created:` — capture date (today).
- `published:` — original publication date; leave empty if unknown, as existing notes do.
- `tags:` — always includes `clippings`.
- `author:` — a YAML list of quoted wikilinks; one entry per author or the journal.
- If paywalled, capture the abstract only and note that the full text was unavailable.
