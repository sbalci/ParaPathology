# Repository note templates

Copy-paste shapes for a repository note in this GitBook vault. Filename is `kebab-case`, no dates.
Most repos do **not** earn a note — the default is one `{% embed %}` line in
`appendix/github-repositories.md`. Use these only when §5–6 of the skill say a full note is
justified.

Relationships live in **frontmatter** so GitBook ignores them and Tolaria reads them. Never put
`[[wikilinks]]` in the body — GitBook renders them as literal text.

---

## Own repository

```markdown
---
title: "Project Name"            # Title Case; keep acronyms as acronyms (WSI, HER2, IHC, LIS)
type: Note
repo: https://github.com/sbalci/<name>
status: active | paused | archived
last_reviewed: YYYY-MM-DD
related_to: "[[Digital Pathology]]"   # optional; frontmatter only, one line on why in the body
---

# Project Name

One-line summary of what this project does.

## Purpose
## Data used
## Methods
## Current state / open questions

Derived from: repository read YYYY-MM-DD — <which files / pages>.
```

`repo:` is the durable identifier. There is no `local_path` here — Vault-Safe means no clone.

---

## Third-party tool being evaluated

```markdown
---
title: "Tool Name"
type: Note
repo: https://github.com/<owner>/<name>
external: true
adopted: false
status: active | archived           # MY engagement, not the tool's health
upstream: <maintenance state, with a date>
license: <as the repo declares it, verbatim, one line — record only, never investigate>
last_reviewed: YYYY-MM-DD
related_to: "[[Digital Pathology]]"
---

# Tool Name

One-line summary — what it does and, if the verdict is already clear, the verdict.

## Purpose
## Data used
## Methods
## Current state / open questions

Derived from: repository source read YYYY-MM-DD — <which files>, `README.md`, `LICENSE`.
```

`status:` vs `upstream:` — `status: active` means still a live candidate here; `status: archived`
means evaluated and closed on this end. `upstream:` describes the tool itself, e.g.
`dormant since 2024-12-10`. Setting `status: archived` because the *tool* looks dead is the common
error; they are independent axes.

---

## Body conventions

- **The one-line summary** sits under the H1 and is the most important line on the note — it's
  what the user reads to decide whether to open it. Write it last.
- **State the verdict early** for a third-party tool. If the recommendation is "do not adopt",
  the first paragraph should say so. A "what to use instead" table often beats a feature list:

  ```markdown
  | Need | Use instead |
  |---|---|
  | <capability> | <tool already in the stack, and why it wins> |
  ```

- **Cross-links carry their reason** — in the body, a plain Markdown link plus one line on *why*
  they connect. Structural relationships go in frontmatter (`related_to:`), not the body.
- **Mark what you could not verify.** `[unverified]` keeps the note trustworthy — three honest
  `[unverified]` tags beat one note that reads smoothly and cannot be checked.
