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
type: Note                       # Tool for a single program; Note for a project write-up
status: Developing               # Stub | Developing | Evergreen — the note's maturity
language: en
title: "Project Name"            # Title Case; keep acronyms as acronyms (WSI, HER2, IHC, LIS)
aliases:
  - "Project Name"               # the H1, when it differs from the kebab-case filename
order: 120
belongs_to: "[[Digital Pathology]]"   # exactly one parent — this is what publishes the note
related_to:
  - "[[A Genuinely Lateral Note]]"
repo: https://github.com/sbalci/<name>
engagement: active | paused | archived
last_reviewed: YYYY-MM-DD
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
type: Tool
status: Developing                  # the NOTE's maturity, in the vault's status vocabulary
language: en
title: "Tool Name"
aliases:
  - "Tool Name"
order: 130
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Image Analysis]]"
repo: https://github.com/<owner>/<name>
external: true
adopted: false
engagement: active | archived       # MY engagement, not the tool's health
upstream: <maintenance state, with a date>
license: <as the repo declares it, verbatim, one line — record only, never investigate>
last_reviewed: YYYY-MM-DD
---

# Tool Name

One-line summary — what it does and, if the verdict is already clear, the verdict.

## Purpose
## Data used
## Methods
## Current state / open questions

Derived from: repository source read YYYY-MM-DD — <which files>, `README.md`, `LICENSE`.
```

`engagement:` vs `upstream:` — `engagement: active` means still a live candidate here;
`engagement: archived` means evaluated and closed on this end. `upstream:` describes the tool
itself, e.g. `dormant since 2024-12-10`. Marking it archived because the *tool* looks dead is the
common error; they are independent axes.

`status:` is reserved for the vault's own `Stub` / `Developing` / `Evergreen` vocabulary — the
maturity of the note, not of the project. That is why engagement gets its own key here.

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
  they connect. Relationships go in frontmatter: `belongs_to` for the one parent, `related_to` for
  lateral links. Never `[[wikilinks]]` in the body — GitBook renders them as literal text.
- **Mark what you could not verify.** `[unverified]` keeps the note trustworthy — three honest
  `[unverified]` tags beat one note that reads smoothly and cannot be checked.
