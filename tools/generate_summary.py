#!/usr/bin/env python3
"""Maintain GitBook SUMMARY.md from note frontmatter instead of by hand.

The navigation contract:
  - Each published note carries `belongs_to` (its single primary parent) and
    `order` (position among siblings; ties break alphabetically by title).
  - `publish: false` keeps a note out of SUMMARY.md.
  - Top-level book parts and their lead notes live in tools/summary-parts.json,
    together with the preface and any external links.
  - Children of a part's lead note render flat at level 1 (the classic look);
    children of any other note nest beneath it.

Modes:
  python tools/generate_summary.py check              lint the vault/nav graph
  python tools/generate_summary.py seed               one-time: derive order,
                                                      belongs_to, publish and
                                                      summary-parts.json from
                                                      the current SUMMARY.md
  python tools/generate_summary.py generate [--dry-run]   rewrite SUMMARY.md
  python tools/generate_summary.py hubs               refresh "In this section"
                                                      blocks in parent notes
"""
import difflib
import json
import os
import re
import sys
import urllib.parse

VAULT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.path.join(VAULT, "tools", "summary-parts.json")
SUMMARY = os.path.join(VAULT, "SUMMARY.md")
EXCLUDE_DIRS = {".git", ".github", ".gitbook", ".claude", ".remember", ".obsidian",
                ".idea", "docs", "patoloji-hakkinda", "attachments", "node_modules",
                "views", "tools", "_bookdown_files", "libs"}
EXCLUDE_FILES = {"SUMMARY.md", "AGENTS.md", "CLAUDE.md", "GEMINI.md", "README.md"}
WIKI = re.compile(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]")
KEY_RE = re.compile(r"^([A-Za-z_][\w -]*):\s*(.*?)\s*$")
CHILD_START = "<!-- tolaria:children:start -->"
CHILD_END = "<!-- tolaria:children:end -->"


class Note(object):
    def __init__(self, rel, text):
        self.rel = rel
        self.text = text
        self.eol = "\r\n" if "\r\n" in text else "\n"
        self.lines = text.splitlines(True)
        self.fm_close = None          # index of closing --- line
        self.keys = {}                # key -> (start, end) line range in fm
        self.fm = {}                  # key -> scalar str or list of strs
        self._parse()

    def _parse(self):
        if not self.lines or self.lines[0].strip() != "---":
            return
        key = None
        for i in range(1, len(self.lines)):
            s = self.lines[i].rstrip("\r\n")
            if s.strip() == "---":
                self.fm_close = i
                break
            m = KEY_RE.match(s)
            if m and not s[:1].isspace():
                key = m.group(1)
                val = m.group(2)
                self.keys[key] = [i, i + 1]
                self.fm[key] = val if val else []
            elif key is not None:
                self.keys[key][1] = i + 1
                ms = re.match(r"^\s*-\s+(.*?)\s*$", s)
                if ms and isinstance(self.fm[key], list):
                    self.fm[key].append(ms.group(1).strip('"').strip("'"))

    def scalar(self, key):
        v = self.fm.get(key)
        return v if isinstance(v, str) else None

    def links(self, key):
        v = self.fm.get(key)
        vals = v if isinstance(v, list) else ([v] if v else [])
        out = []
        for item in vals:
            out.extend(WIKI.findall(item))
        return out

    @property
    def h1(self):
        """Display title: H1, else frontmatter title, else alias, else filename."""
        for ln in self.lines:
            if ln.startswith("# "):
                return ln[2:].strip().strip("*_").strip()
        t = self.scalar("title")
        if t:
            return t.strip('"').strip("'")
        al = self.fm.get("aliases")
        if isinstance(al, list) and al:
            return al[0].strip("*_").strip()
        return os.path.splitext(os.path.basename(self.rel))[0]

    def replace_keys(self, drop, add_lines):
        """Remove frontmatter keys in `drop`, then insert add_lines before ---."""
        if self.fm_close is None:
            return False
        keep = []
        ranges = sorted(self.keys[k] for k in drop if k in self.keys)
        for i, ln in enumerate(self.lines[:self.fm_close]):
            if any(a <= i < b for a, b in ranges):
                continue
            keep.append(ln)
        new = keep + [l + self.eol for l in add_lines] + self.lines[self.fm_close:]
        text = "".join(new)
        changed = text != self.text
        self.text = text
        self.lines = text.splitlines(True)
        return changed


def load_notes():
    notes = {}
    for root, dirs, files in os.walk(VAULT):
        rel_root = os.path.relpath(root, VAULT).replace("\\", "/")
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith(".")]
        for f in files:
            if not f.endswith(".md"):
                continue
            rel = f if rel_root == "." else rel_root + "/" + f
            if rel in EXCLUDE_FILES or f.startswith("_"):
                continue
            with open(os.path.join(root, f), "rb") as fh:
                notes[rel] = Note(rel, fh.read().decode("utf-8"))
    return notes


def title_index(notes):
    idx = {}
    for rel, n in notes.items():
        names = {n.h1, os.path.splitext(os.path.basename(rel))[0]}
        al = n.fm.get("aliases")
        for a in (al if isinstance(al, list) else [al] if al else []):
            names.add(a)
        for t in names:
            if t:
                idx.setdefault(t.lower(), set()).add(rel)
    return idx


def resolve(idx, title):
    return sorted(idx.get(title.lower(), set()))


def parse_summary():
    with open(SUMMARY, "rb") as fh:
        text = fh.read().decode("utf-8")
    entries, part, stack = [], None, []
    for s in text.splitlines():
        mh = re.match(r"^##\s+(.*)$", s)
        if mh:
            part, stack = mh.group(1).strip(), []
            continue
        me = re.match(r"^(\s*)\*\s+\[([^\]]+)\]\(([^)]+)\)\s*$", s)
        if not me:
            continue
        indent, txt, target = me.groups()
        level = len(indent) // 2 + 1
        tgt = urllib.parse.unquote(target)
        ext = tgt.startswith("http")
        while stack and stack[-1][0] >= level:
            stack.pop()
        entries.append({"part": part, "level": level, "text": txt, "target": tgt,
                        "external": ext, "navparent": stack[-1][1] if stack else None})
        if not ext:
            stack.append((level, tgt))
    return entries


def children_map(notes, idx):
    kids = {}
    for rel, n in notes.items():
        bts = n.links("belongs_to")
        if not bts:
            continue
        hits = resolve(idx, bts[0])
        if len(hits) == 1:
            kids.setdefault(hits[0], []).append(rel)
    def key(rel):
        n = notes[rel]
        o = n.scalar("order")
        return (int(o) if o and o.lstrip("-").isdigit() else 9999, n.h1.lower())
    for v in kids.values():
        v.sort(key=key)
    return kids


def published(n):
    return n.scalar("publish") != "false"


# ---------------------------------------------------------------- check
def cmd_check(notes, idx):
    problems = 0
    entries = parse_summary()
    targets = {e["target"] for e in entries if not e["external"]}
    if os.path.exists(CONFIG):
        cfg = json.load(open(CONFIG, encoding="utf-8"))
        targets |= {p["lead"] for p in cfg["parts"]}
    for e in entries:
        if not e["external"] and e["target"] != "README.md" and e["target"] not in notes:
            print("MISSING FILE in SUMMARY:", e["target"]); problems += 1
    for rel, n in notes.items():
        bts = n.links("belongs_to")
        if len(bts) > 1:
            print("MULTIPLE belongs_to:", rel, bts); problems += 1
        for t in bts:
            hits = resolve(idx, t)
            if len(hits) == 0:
                print("UNRESOLVED belongs_to:", rel, "->", t); problems += 1
            elif len(hits) > 1:
                print("AMBIGUOUS belongs_to:", rel, "->", t, hits); problems += 1
        if published(n) and rel not in targets and not bts:
            print("UNPLACED (no belongs_to, not in SUMMARY):", rel); problems += 1
    seen = {}
    for rel, n in notes.items():
        seen.setdefault(n.h1.lower(), []).append(rel)
    for t, rels in seen.items():
        if len(rels) > 1:
            print("DUPLICATE TITLE:", t, rels); problems += 1
    print("check: %d notes, %d problems" % (len(notes), problems))
    return 1 if problems else 0


# ---------------------------------------------------------------- seed
# Parts without an eponymous hub note get one created beforehand; map them here.
LEAD_OVERRIDES = {
    "Pathology Residents & Pathologists": "pathology-residents-and-pathologists/README.md",
    "Theories and Frameworks": "theories/README.md",
    "Social Topics": "social-topics/README.md",
    "Appendix": "appendix/README.md",
}


def cmd_seed(notes, idx):
    entries = parse_summary()
    parts, leads = [], {}
    for e in entries:
        if e["part"] and e["part"] not in [p["title"] for p in parts]:
            parts.append({"title": e["part"], "lead": None, "externals": []})
        cur = parts[-1] if parts else None
        if cur is None or e["part"] != cur["title"]:
            continue
        if e["external"]:
            cur["externals"].append({"text": e["text"], "url": e["target"]})
        elif cur["lead"] is None and e["level"] == 1:
            cur["lead"] = e["target"]
    for p in parts:
        if p["title"] in LEAD_OVERRIDES:
            p["lead"] = LEAD_OVERRIDES[p["title"]]
        leads[p["title"]] = p["lead"]
        if p["lead"] not in notes:
            print("seed: lead missing on disk:", p["title"], p["lead"])
            return 1

    counters = {}   # scope -> next order
    dirty = set()
    for e in entries:
        if e["external"] or e["target"] not in notes:
            continue
        n = notes[e["target"]]
        lead = leads[e["part"]]
        scope = e["navparent"] or ("part:" + e["part"])
        counters[scope] = counters.get(scope, 0) + 10
        order = counters[scope]
        if e["target"] == lead:
            parent_rel = None
        elif e["level"] == 1:
            parent_rel = lead
        else:
            parent_rel = e["navparent"]
        old = n.links("belongs_to")
        add = ["order: %d" % order]
        if parent_rel:
            parent_title = notes[parent_rel].h1
            add.append('belongs_to: "[[%s]]"' % parent_title)
            demote = [t for t in old
                      if resolve(idx, t) != [parent_rel] and t != parent_title]
        else:
            demote = old[:]
        related = n.links("related_to")
        for t in demote:
            if t not in related and (parent_rel is None or t != notes[parent_rel].h1):
                related.append(t)
        if related:
            if len(related) == 1:
                add.append('related_to: "[[%s]]"' % related[0])
            else:
                add.append("related_to:")
                add.extend('  - "[[%s]]"' % t for t in related)
        if n.replace_keys({"order", "belongs_to", "related_to"}, add):
            dirty.add(e["target"])

    in_summary = {e["target"] for e in entries if not e["external"]}
    for lead in LEAD_OVERRIDES.values():
        in_summary.add(lead)
    for rel, n in notes.items():
        if rel not in in_summary and n.scalar("publish") != "false":
            if n.replace_keys({"publish"}, ["publish: false"]):
                dirty.add(rel)
                print("seed: publish: false ->", rel)

    for rel in dirty:
        with open(os.path.join(VAULT, rel), "wb") as fh:
            fh.write(notes[rel].text.encode("utf-8"))
    with open(CONFIG, "w", encoding="utf-8") as fh:
        json.dump({"preface": "README.md", "parts": parts}, fh,
                  ensure_ascii=False, indent=2)
    print("seed: %d notes updated, %d parts -> %s" % (len(dirty), len(parts), CONFIG))
    return 0


# ---------------------------------------------------------------- generate
def build_lines(notes, idx):
    cfg = json.load(open(CONFIG, encoding="utf-8"))
    kids = children_map(notes, idx)
    out = ["# Table of contents", "", "* [Preface](%s)" % cfg["preface"]]
    placed = set()

    def enc(rel):
        return urllib.parse.quote(rel, safe="/")

    def emit(rel, level):
        if rel in placed:
            return
        placed.add(rel)
        out.append("%s* [%s](%s)" % ("  " * (level - 1), notes[rel].h1, enc(rel)))
        for c in kids.get(rel, []):
            if published(notes[c]):
                emit(c, level + 1)

    for p in cfg["parts"]:
        out.extend(["", "## " + p["title"], ""])
        lead = p["lead"]
        placed.add(lead)
        out.append("* [%s](%s)" % (notes[lead].h1, enc(lead)))
        for ex in p.get("externals", []):
            out.append("* [%s](%s)" % (ex["text"], ex["url"]))
        for c in kids.get(lead, []):
            if published(notes[c]):
                emit(c, 1)
    stray = [r for r, n in notes.items() if published(n) and r not in placed]
    for r in sorted(stray):
        print("WARN unplaced published note:", r)
    return out


def cmd_generate(notes, idx, dry):
    with open(SUMMARY, "rb") as fh:
        old = fh.read().decode("utf-8")
    eol = "\r\n" if "\r\n" in old else "\n"
    new = eol.join(build_lines(notes, idx)) + eol
    if dry:
        for d in difflib.unified_diff(old.splitlines(), new.splitlines(),
                                      "SUMMARY.md(old)", "SUMMARY.md(new)", lineterm=""):
            print(d)
        return 0
    with open(SUMMARY, "wb") as fh:
        fh.write(new.encode("utf-8"))
    print("generate: wrote SUMMARY.md")
    return 0


# ---------------------------------------------------------------- hubs
def cmd_hubs(notes, idx):
    kids = children_map(notes, idx)
    changed = 0
    for rel, clist in sorted(kids.items()):
        clist = [c for c in clist if published(notes[c])]
        if not clist or rel not in notes:
            continue
        n = notes[rel]
        base = os.path.dirname(rel)
        items = []
        for c in clist:
            relpath = os.path.relpath(c, base).replace("\\", "/") if base else c
            items.append("* [%s](%s)" % (notes[c].h1, urllib.parse.quote(relpath, safe="/")))
        block = [CHILD_START, "", "## In this section", ""] + items + ["", CHILD_END]
        text = n.text
        if CHILD_START in text and CHILD_END in text:
            pre = text[:text.index(CHILD_START)]
            post = text[text.index(CHILD_END) + len(CHILD_END):]
            new = pre + n.eol.join(block) + post
        else:
            new = text.rstrip("\r\n") + n.eol * 2 + n.eol.join(block) + n.eol
        if new != text:
            with open(os.path.join(VAULT, rel), "wb") as fh:
                fh.write(new.encode("utf-8"))
            changed += 1
    print("hubs: %d notes updated" % changed)
    return 0


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1] if len(sys.argv) > 1 else "check"
    notes = load_notes()
    idx = title_index(notes)
    if mode == "check":
        return cmd_check(notes, idx)
    if mode == "seed":
        return cmd_seed(notes, idx)
    if mode == "generate":
        return cmd_generate(notes, idx, "--dry-run" in sys.argv)
    if mode == "hubs":
        return cmd_hubs(notes, idx)
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main())
