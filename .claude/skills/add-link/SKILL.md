---
name: add-link
description: Use when a URL (or a handful of URLs) needs to be filed into this GitBook pathology vault — "add this link", "bookmark this", "put this under digital pathology", or a bare URL dropped in with no stated destination. Classifies the URL, picks the right existing link-list note, and appends it in that note's own house style. If the URL turns out to be a code repository that deserves its own treatment, defer to add-repository; if it is an article worth capturing in full, defer to add-clipping.
---

# Adding a link

This vault is a live GitBook. Its knowledge is organized as **topic notes that hold curated
link-lists** (`appendix/web-pages.md`, `appendix/github-repositories.md`,
`appendix/courses-and-moocs.md`, and dozens of per-topic notes). Filing a link means putting it
in the *right existing note*, in *that note's existing syntax*, and — if the note is in the
GitBook TOC — nothing else. The output is small; the judgment is which note and which format.

Vault-Safe: use Read / Write / Edit / Grep / Glob only. No shell, git, Node, or Quarto here.

---

## §1 Classify before you file

Decide what the URL *is*, because it routes to a different destination and sometimes a
different skill:

- **A code repository** (GitHub/GitLab, or a tool's source) → this is usually `add-repository`
  territory. If the user only wants a pointer, one `{% embed %}` line in
  `appendix/github-repositories.md` is enough; if it's a tool worth evaluating, hand off to
  **add-repository**.
- **An article/paper/thread worth keeping in full** (you'd want the abstract, author, and text
  preserved even if the page rots) → hand off to **add-clipping**.
- **A resource to bookmark** (a course, a tool's homepage, a blog, a dataset, a video) → stays
  here. Continue below.

If a bare URL arrives with no stated home, classify it first, then tell the user which note you
propose before writing.

---

## §2 Read the destination note, then match its house style

Different link-lists use different syntax. **Never impose a format — copy the one already in
the file.** Common shapes in this vault:

- **Embed style** (`appendix/github-repositories.md`, many topic notes): one embed per
  blank-line-separated line —
  ```markdown
  {% embed url="https://example.com" %}
  ```
- **Bulleted style** (`appendix/web-pages.md`, `appendix/courses-and-moocs.md`): a `*` bullet,
  sometimes with a bold label and a trailing bare link, sometimes a Markdown `[text](url)`.
- **Sectioned style**: files with `##`/`####` sub-headings (e.g. `## Data Science`,
  `#### Videos`) — put the link under the heading it belongs to, not at the top.

Pick the destination by topic, not by convenience:
- pathologist tools / software homepages → the matching topic note (e.g.
  `computational-digital-and-mathematical-pathology/digital-pathology.md`).
- courses / MOOCs / tutorials → `appendix/courses-and-moocs.md` (note its two sections:
  `## Courses` and `## Tutorials`).
- general bookmarks with no better home → `appendix/web-pages.md`.
- if truly nothing fits, say so and propose a new note rather than forcing a bad fit.

---

## §3 GitBook-safe rules (do not break the live book)

- **No `[[wikilinks]]` in body text.** GitBook won't render them. If you want to connect this
  note to another, add a frontmatter relationship instead (`related_to: "[[Note Title]]"`) —
  Tolaria reads it, GitBook ignores it. The visible body stays plain Markdown.
- **Preserve existing GitBook syntax** (`{% embed %}`, `{% hint %}`, relative links) verbatim.
- **De-dup as you go.** This vault carried a vault-wide paste-duplication bug; before appending,
  Grep the note for the URL's domain so you don't add a link it already has.

---

## §4 If the note is in the GitBook TOC, that's the whole job

Most link-list notes are already listed in `SUMMARY.md`, so appending a line publishes it — no
TOC edit needed. Only touch `SUMMARY.md` if you created a **new** note (see **update-index** for
how to add it to the tree in the right section). Adding a line to an already-listed note needs
no `SUMMARY.md` change.

---

## §5 Never silently drop, never silently guess

- If you couldn't determine a good destination, **report that** — don't dump it in `web-pages.md`
  as a default and move on.
- If the page's title/topic is ambiguous, capture the URL with a one-line note of what it is and
  mark the uncertainty rather than inventing a category.
- When filing several links in one go, this skill is invoked once per link by **add-batch**,
  which owns the single closeout. Don't run a closeout per link.
