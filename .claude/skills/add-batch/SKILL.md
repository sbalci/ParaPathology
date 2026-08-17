---
name: add-batch
description: Use when several sources need filing at once into this GitBook pathology vault — "add all these links", "process this list of URLs", "file everything in this folder", or any mix of links, repositories, and articles handed over together. Enumerates the batch, dispatches each item to the right leaf skill (add-link, add-repository, add-clipping) doing steps 1–N only, and runs ONE closeout for the whole run instead of one per item.
---

# Adding a batch

This is the dispatcher. It exists so that filing ten items produces **one** closeout, not ten.
The leaf skills (`add-link`, `add-repository`, `add-clipping`) do the per-item work; this skill
owns enumeration and the single closeout at the end.

Vault-Safe: Read / Write / Edit / Grep / Glob only. No shell, git, or Node.

---

## §1 Enumerate and classify the whole batch first

Before writing anything, list every item and decide its route:

| Item is… | Route to |
|---|---|
| A bookmark / course / homepage / video | **add-link** |
| A code repository or tool | **add-repository** |
| An article/paper to capture in full | **add-clipping** |

Produce the plan as a short table (item → route → destination note) and, for anything ambiguous
or outward-facing, show it to the user before executing. If the batch is "everything in this
folder", Glob the folder and classify each file the same way.

---

## §2 Dispatch each item — leaf steps only, no per-item closeout

For each item, follow its leaf skill's numbered steps **except the closeout**. The leaf skills
are written to defer their close to this dispatcher — honour that. As you go:

- **Never silently skip an item.** If one can't be classified or filed, record it in a
  "produced nothing / needs a human" list and keep going — don't let one bad URL halt the batch.
- **De-dup across the batch and against the vault.** Grep the destination note before appending
  so a URL already present (or repeated within the batch) isn't added twice. This vault carried a
  vault-wide paste-duplication bug — don't reintroduce it.
- **Keep GitBook features intact** — `{% embed %}`/`{% hint %}` preserved, wikilinks only in
  frontmatter, never in body prose.

---

## §3 One closeout for the whole run

After every item is processed:

1. **Collect new notes** created this run (repository notes, clippings). Link-list appends to
   already-listed notes need nothing here.
2. **Update `SUMMARY.md` once** for any brand-new notes that belong in the GitBook TOC — insert
   each under the correct section in one pass (or hand the whole set to **update-index**).
3. **Report a single tally**: what was filed where, what was skipped and why, and any
   `[unverified]` items a human should check. Include the "produced nothing" list — a source that
   yielded nothing is itself worth recording.

Do not run git, do not commit, do not build the GitBook — filing and reporting is the whole job.
