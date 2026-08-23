---
name: add-repository
description: Use when a code repository or tool needs a home in this GitBook pathology vault — "add this repo", "add a page for this tool", "is this tool worth adopting", or a GitHub/GitLab URL supplied with a stated destination. Covers both the user's own repositories and third-party tools being evaluated, and the audit that decides whether a tool earns its own note or just a line in the repository list. If a bare URL arrives with no stated destination, classify it with add-link first; that skill defers here once it identifies a repo.
---

# Adding or refreshing a repository

Two cases live here: a first-time "add" and a "refresh project X". The default output is small —
**one `{% embed %}` line** in `appendix/github-repositories.md`. A full note is the exception,
earned only when the reading produced something later work will need to cite.

No clone step: "read the source" means fetching and reading what you can through the web. The
shell is used only at the close, to rebuild navigation with `tools/generate_summary.py`.

---

## §1 Whose repository is this?

Decide first — it sets the frontmatter shape and whether a verdict is expected.

**Own repository** — the user's own code (the `sbalci` account/org, or an existing note that
already points at their repo). On refresh, rewrite the note.

**Third-party** — someone else's tool being evaluated. Frontmatter carries `external: true`,
`adopted: false`, `engagement:`, and an `upstream:` key. May legitimately end in a "do not adopt"
verdict — that verdict is useful output, not a failure.

If refreshing an existing note, read it before touching anything — you need to know what it
previously claimed to say what changed.

---

## §2 Read the source, not the README

A README is a claim *about* code, written once and rarely re-checked. Read what defines
behaviour: entry points, argument parsers, function signatures, `setup.py`/`pyproject.toml`,
the licence file, the actual example outputs. Where README and code disagree, the code is what
runs — say so, because that discrepancy is itself a finding.

There is no clone step here. Read the rendered repo, the raw source files, releases,
and issues through their web URLs. If you genuinely cannot see the source (only the README),
say so and mark conclusions `[unverified]` rather than repeating documentation as fact.

---

## §3 Third-party only: provenance, currency, and what it actually does

**Provenance.** Verify any claim about who is behind a repo against a primary source (the org,
the API, paper affiliations) before writing it.

**Licence — one line, then stop.** Copy what the repo declares into `license:` and move on.
Don't diff it against file headers or upstream. If something looks genuinely wrong, one sentence
under Open questions is the whole budget — never the verdict, never a reason to write a note.

**Ambiguity gets stated and routed, not resolved.** A number two files disagree about, a default
the README and code state differently, a metric whose denominator is unclear: record both
readings, mark `[unverified]`, name who could settle it. Never quietly pick the tidier reading.

**What it actually does.** The substance. What is the method, in enough detail that someone could
reimplement the idea? For a pathology model, dig out the four fields that are always buried:
dataset, scanner/magnification, validation strategy, external validation.

**Currency.** Record last push, latest release/tag, commit activity over the trailing year, open
issue count — *with the date you read them*, because a later "dormant" or "actively maintained"
claim must trace back to a dated observation. Stars/forks are weak signals.

---

## §4 Own repository only: what changed

Re-read the tree and rewrite the note — don't patch it. Then ask the easy-to-skip question: does
any other note cite this project in a way that is now stale? Bump `last_reviewed` and note what
actually changed, not just that a review happened.

---

## §5 The decisive question, and whether this earns a note

**Not "what does this tool do"** but *what does it do that the tools already indexed for this
domain do not*. Check the relevant hub note first (e.g.
`computational-digital-and-mathematical-pathology/digital-pathology.md` for the WSI/digital-path
cluster). Then decide the output shape — the default is a **line, not a note**:

| What the reading produced | Output |
|---|---|
| Nothing the existing list doesn't already cover | Nothing new, or one `{% embed %}` line in `appendix/github-repositories.md`. |
| A real but narrow finding | One line in the relevant topic note, with the reason. |
| Something later work will need to cite — a reusable method, a result that doesn't reconcile, a verified capability gap, a bug, currency evidence | A full note (see §6). |

---

## §6 Write the note (only if it earned one)

Use `references/page-template.md` in this skill directory for both frontmatter shapes and the
body skeleton. Four things are easy to get subtly backwards:

- **The vault frontmatter contract applies.** A repository note is a note: `type` (`Tool` for a
  single program, `Note` for a project write-up), `status`, `language`, `aliases` carrying the H1
  when it differs from the kebab-case filename, one `belongs_to` parent, and an `order`. The
  repo-specific keys (`repo:`, `upstream:`, `license:`, `last_reviewed:`) sit alongside them.
- **`status:` is the vault's vocabulary, not the project's.** `Stub` / `Developing` / `Evergreen`
  describe the *note's* maturity. Anything else fails `validate-vault`.
- **`engagement:` and `upstream:` point in different directions.** `engagement:` describes *the
  user's* stance (`active` = live candidate or in use, `archived` = evaluated and closed here).
  `upstream:` describes the *tool's* own maintenance state, with the date you read it. A dormant
  tool can still be worth adopting; a maintained one can still be wrong here.
- **GitBook-safe body.** Relationships go in **frontmatter** — `belongs_to` for the single parent,
  `related_to` for lateral links — never as `[[wikilinks]]` in body prose, which GitBook won't
  render. In the body, a plain Markdown link with a reason is fine.

End with a `Derived from:` line naming which URLs/files you read and the date.

---

## §7 Close (one closeout per run)

1. If a full note was created, give it `belongs_to` + `order` and rebuild — `SUMMARY.md` is
   generated, never hand-edited:

   ```bash
   python tools/generate_summary.py check && python tools/generate_summary.py generate
   python tools/generate_summary.py hubs
   ```

   A line appended to an already-published note needs no rebuild. See **update-index**.
2. Write the verdict back to the topic note whose decision this informs.
3. Report what the reading produced — including "nothing new", which is itself worth recording.

When invoked inside a batch, **add-batch** owns the single closeout — don't run your own.
