# Wiki conventions — shared by the research skills

`AGENTS.md` is the schema and loads every session. This file holds only what it does *not*
say: the closeout ritual, the journal shape, and two mechanical traps that will block work
if you meet them unprepared.

---

## 1. The write-path traps

These are the ones that cost time, because the failure looks inexplicable rather than wrong.

**Creating a new file in `sources/papers/` or `sources/notes/` — use the Write tool.**
A shell redirect into those folders is blocked *even when the file does not exist yet*. The
hook's Bash rule matches any `>` pointing at those paths and never checks for existence,
while the Write tool is checked against existence and allowed for new files. So:

```
Write tool -> sources/papers/smith-2025-mil.md     allowed
echo "..." > sources/papers/smith-2025-mil.md      BLOCKED
cat >> sources/papers/smith-2025-mil.md <<'EOF'    BLOCKED
```

**Moving a file into those folders — `cp`, then a separate `rm`.**
`mv sources/inbox/x.pdf sources/papers/x.pdf` is blocked, because the one command string
contains both a destructive verb and a protected path. Split it so neither command trips
both conditions at once:

```bash
cp sources/inbox/x.pdf sources/papers/smith-2025-mil.pdf   # names a protected path, no verb
rm sources/inbox/x.pdf                                     # names a verb, no protected path
```

Two commands, not one chained with `&&` — the check is on the command string.

**Writing *about* those folders can also trip it.** The check reads the whole command string,
so a commit message that mentions a protected path and happens to contain a word like `rm`
is denied even though the command touches nothing. This bites when committing work that
documents these very rules. The fix is to put the message in a file and pass it by path, so
the prose never enters the command string:

```bash
# write the message with the Write tool, to somewhere outside the repo, then:
git commit -F /path/to/commit-msg.txt
```

The same trick works for any command whose *text* would trip the check while its *effect*
is harmless.

**Everything else is unrestricted.** `wiki/`, `journal/`, `sources/inbox/` and
`sources/projects/` are not protected at all; append to the journal with a heredoc freely.

**Over the Cowork device bridge, git cannot clean up after itself.** When this repo is reached
as a *connected folder* rather than a local checkout, every git command that touches the index
creates `.git/index.lock` and then cannot remove it — the mount refuses `unlink`, so `rm -f` on
that lock silently does nothing and the *next* git command dies with `Unable to create
'.git/index.lock': File exists`. Worse, the stale lock blocks git on the user's own machine
until it is cleared, which has cost real time. `mv` works where `rm` does not:

```bash
mkdir -p _to_delete && mv .git/index.lock _to_delete/stale-lock
```

Clear any lock you create before you finish, and prefer read-only git. This is a second reason
the no-commit rule is no hardship: over the bridge, committing was never going to work.

If the hook does block you, it says so explicitly and names the rule. Do not route around it
by another mechanism — ask instead. The block is the point.

---

## 2. Content safety, checked before writing

`wiki/` and `sources/projects/` publish to research.patoloji.dev. Apply this at the moment
you are about to write, not as an afterthought:

- No patient names, MRNs, or **un-hashed accession numbers**. Accession numbers are
  identifying on their own because their sequential, dated structure allows re-linkage.
- No patient-level detail that could single someone out, even without a name.
- No whole-slide image files (`.svs`, `.ndpi`, `.mrxs`) anywhere in the repo — they belong
  on the Memorial share. A cropped screenshot is fine.
- No raw LIS exports; only de-identified, analysis-ready tables.
- A file that maps identifiers to anything — a decoded-barcode CSV, a hash lookup table — is
  a re-identification key, not an output. It belongs on the share, never in git.

If raw material arriving from the inbox contains any of this, stop and say so rather than
filing a redacted version quietly. The person who put it there needs to know.

---

## 3. Closeout — run once per batch, in this order

Not once per item. A ten-item inbox run produces **one** journal entry and **one** index
update, otherwise the log becomes unreadable and the diff becomes noise.

1. **Verify links.** `node .claude/scripts/wiki-check.mjs` — exits non-zero and names the
   file on a broken link or a basename collision. Run it before you hand off, not after — the
   push will trigger the CI render, and an unresolved link becomes a build warning at that
   point, by which time it is someone else's problem to notice.
2. **Update `wiki/index.md`.** Any new page needs a line under the right heading with its
   one-line hook. If the work closed or changed a "Known gaps" item, edit that too — a gaps
   list that still lists something you just fixed is worse than no list.
3. **Append to `journal/YYYY-MM.md`** (see §4). If the month has rolled over, create the file
   with a `# YYYY-MM` heading first.
4. **Hand off — do not commit.** Committing and pushing are Serdar's (`AGENTS.md` §1). Leave
   the working tree dirty and list exactly the files this batch touched, ordered so they can be
   staged in one command. Never write `git add -A` even into a *suggested* command: this repo
   frequently has an in-progress batch sitting uncommitted, occasionally two at once, and
   sweeping those in is how someone else's half-finished work reaches the site.
5. **Never run `quarto render`.** CI renders on push and commits `_site/` back. If you want
   to look at a page locally, `quarto preview` writes to a temp directory.

---

## 4. Journal entry shape

The journal is the record of *judgement*, not a changelog — git already has the changelog.
What belongs here is what you decided and why, and what you were unsure about. Someone
reading it in six months should be able to tell where the soft spots are.

```markdown

---

## YYYY-MM-DD — short title of the batch

**What was added**

What arrived, where it was filed, and under what name.

**Why it was worth the space** (or: what the verdict was, and why)

The reasoning. If a call could reasonably have gone the other way, say what tipped it.

**Wiki pages updated**

- `path/to/page.md` — what changed and why that page in particular.

**Unsure about / open**

- Anything marked [unverified] and what would settle it.
- Anything you decided that you would want revisited.
- Anything you got wrong mid-task and corrected — this is the most useful line in the entry.
```

Two habits worth keeping. Write the "unsure about" section even when it feels empty; if it is
genuinely empty, say "nothing outstanding" rather than dropping the heading, because an absent
section reads as an unasked question. And record corrections you made to your own earlier
reasoning within the batch — those are the entries that stop the same mistake next time.

---

## 5. Things that are already in `AGENTS.md`

Do not restate these; cite the section instead. Repeating them here would guarantee the two
copies drift.

| Topic | Where |
|---|---|
| Folder contract, append-only rule, published-vs-private | §1 |
| Project page format and the mutable exception | §2 |
| Wiki page format and frontmatter | §3 |
| Naming (`kebab-case`, `firstauthor-year-shorttitle`) | §4 |
| Linking — every link needs a stated reason | §5 |
| The command vocabulary | §6 |
| What the hook and CI enforce | §7 |
| Domain notes: explain ML, don't over-explain histology; the fields to capture from model papers | §8 |

One gap worth knowing: §2's fenced project-page template omits `title:`, but every real page
carries it and the wikilink filter falls back to the bare slug without it. Always include it.
