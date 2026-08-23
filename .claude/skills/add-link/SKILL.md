---
name: add-link
description: Use when a URL (or a handful of URLs) needs to be filed into this GitBook/Tolaria pathology vault — "add this link", "bookmark this", "put this under digital pathology", or a bare URL dropped in with no stated destination. Classifies the URL, picks the right existing link-list note, and appends it in that note's own house style. If the URL turns out to be a code repository that deserves its own treatment, defer to add-repository; if it is an article worth capturing in full, defer to add-clipping.
---

# Adding a link

This vault is a live GitBook. Much of its knowledge is organized as **topic notes holding curated
link-lists** (`appendix/web-pages.md`, `appendix/github-repositories.md`,
`appendix/courses-and-moocs.md`, and dozens of per-topic notes). Filing a link means putting it in
the *right existing note*, in *that note's existing syntax*. The output is small; the judgment is
which note and which format.

---

## §1 Classify before you file

Decide what the URL *is*, because it routes differently — and sometimes to a different skill:

- **A code repository** (GitHub/GitLab, or a tool's source) → usually `add-repository` territory.
  If the user only wants a pointer, one `{% embed %}` line in `appendix/github-repositories.md` is
  enough; if it is a tool worth evaluating, hand off to **add-repository**.
- **An article/paper/thread worth keeping in full** (you would want the abstract, author, and text
  preserved even if the page rots) → hand off to **add-clipping**.
- **A resource to bookmark** (a course, a tool homepage, a blog, a dataset, a video) → stays here.

If a bare URL arrives with no stated home, classify it first, then say which note you propose
before writing.

---

## §2 Read the destination note, then match its house style

Different link-lists use different syntax. **Never impose a format — copy the one already in the
file.** Common shapes here:

- **Embed style** (`appendix/github-repositories.md`, many topic notes): one embed per
  blank-line-separated line —
  ```markdown
  {% embed url="https://example.com" %}
  ```
- **Bulleted style** (`appendix/web-pages.md`, `appendix/courses-and-moocs.md`): a `*` bullet,
  sometimes with a bold label and a trailing bare link, sometimes a Markdown `[text](url)`.
- **Sectioned style**: files with `##`/`####` sub-headings (e.g. `## Data Science`, `#### Videos`)
  — put the link under the heading it belongs to, not at the top.

Pick the destination by topic, not by convenience:

- pathologist tools / software homepages → the matching topic note (e.g.
  `computational-digital-and-mathematical-pathology/digital-pathology.md`).
- courses / MOOCs / tutorials → `appendix/courses-and-moocs.md` (note its `## Courses` and
  `## Tutorials` sections).
- general bookmarks with no better home → `appendix/web-pages.md`.
- if truly nothing fits, say so and propose a new note rather than forcing a bad fit.

---

## §3 GitBook-safe rules (do not break the live book)

- **No `[[wikilinks]]` in body text.** GitBook won't render them. To connect this note to another,
  add a frontmatter relationship instead — `related_to: "[[Note Title]]"` for a lateral link.
  Tolaria reads it, GitBook ignores it, the visible body stays plain Markdown.
- **`belongs_to` is not for this.** That key is the note's single navigational parent and is what
  places it in `SUMMARY.md`. Adding a link never changes it.
- **Preserve existing GitBook syntax** (`{% embed %}`, `{% hint %}`, relative links) verbatim.
- **De-dup as you go.** This vault carried a vault-wide paste-duplication bug; before appending,
  grep the note for the URL's domain so you don't add a link it already has.

---

## §4 Appending to an existing note needs no rebuild

Every published note is already in `SUMMARY.md`, and `SUMMARY.md` is **generated** — so appending
a line to an existing link-list publishes it immediately, with nothing else to do.

You only touch navigation when you created a **new** note. Then set its `belongs_to` and `order`
and run the generator (see **update-index**):

```bash
python tools/generate_summary.py check && python tools/generate_summary.py generate
python tools/generate_summary.py hubs
```

Never type an entry into `SUMMARY.md` by hand — the next `generate` run overwrites it.

---

## §5 Never silently drop, never silently guess

- If you couldn't determine a good destination, **report that** — don't dump it in `web-pages.md`
  as a default and move on.
- If the page's title or topic is ambiguous, capture the URL with a one-line note of what it is
  and mark the uncertainty rather than inventing a category.
- When filing several links in one go, this skill is invoked once per link by **add-batch**, which
  owns the single closeout. Don't run a closeout per link.
