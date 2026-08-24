# Vault skills — agent-agnostic procedures

These `SKILL.md` files are reusable, tool-agnostic procedures for maintaining the ParaPathology
vault. They were authored for Claude Code, but they are **plain Markdown meant to be usable by any
LLM or agent**. There is nothing Claude-specific about running them: read the skill's `SKILL.md`,
follow its numbered steps, and use whatever file and shell tools you have (Read/Grep/Glob/Edit, or
a shell). No proprietary skill loader is required.

## Start with the vault contract

Before running any skill, read the vault contract in [`../../AGENTS.md`](../../AGENTS.md) (root
`AGENTS.md`). It defines the frontmatter schema these skills **enforce** — `type`, `status`,
`language`, `aliases`, `belongs_to`, `order`, `publish` — plus the vault's lineage (GitBook →
Karpathy-style wiki → living, updatable documents) and the Obsidian + Tolaria dual-link rule.

## How to pick a skill

Each skill's frontmatter `description` states exactly when to invoke it, so you can match a request
to a skill from the descriptions alone.

| Skill              | Use it when                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **add-link**       | A URL needs filing — bookmark it into the right existing link-list note, in that note's house style.                                                         |
| **add-clipping**   | An article/paper/page should be captured in full under `Clippings/` (Obsidian Web Clipper schema + vault frontmatter), with a publish-vs-copyright decision. |
| **add-repository** | A code repository or tool needs a home — a line in `appendix/github-repositories.md`, or a full evaluated note for one worth adopting.                       |
| **add-note**       | A loose or orphan note needs triage — classify its type, derive status/language, write full frontmatter, place it in a folder, and publish.                  |
| **add-batch**      | Several sources arrive at once — dispatches each item to the right leaf skill and runs a single closeout instead of one per item.                            |
| **update-index**   | Publish a note into navigation or health-check it — sets `belongs_to`/`order`/`publish`, rebuilds `SUMMARY.md`, refreshes hub "In this section" blocks.      |
| **validate-vault** | Health-check frontmatter and integrity — diagnoses schema and link violations; never repairs.                                                                |

## Supporting tooling the skills call

- `../../tools/generate_summary.py` — rebuilds `SUMMARY.md` (the GitBook TOC) from frontmatter.
  `python tools/generate_summary.py check` validates the navigation graph without writing.
- `validate-vault/check.sh` — frontmatter schema + GitBook-safety check.

## Two rules that keep the skills honest

- **Never hand-edit `SUMMARY.md`.** It is generated from note frontmatter — change the note, then rebuild.
- **No note is immutable.** Every file, clippings included, is updatable; `type` records origin, `status` records how far it has been taken (`Stub → Developing → Evergreen`).

