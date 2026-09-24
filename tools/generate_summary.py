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

The link contract: notes link to each other only with [[wikilinks]] whose
target is the note's vault-relative path without `.md` ([[folder/file]]), the
form Tolaria's own autocomplete inserts and Obsidian resolves natively. The
GitBook copy is built separately by `publish`; master is never rewritten by CI.

Modes:
  python tools/generate_summary.py check [--verbose]  lint the vault/nav graph
                                                      and report link health
  python tools/generate_summary.py seed               one-time: derive order,
                                                      belongs_to, publish and
                                                      summary-parts.json from
                                                      the current SUMMARY.md
  python tools/generate_summary.py generate [--dry-run]   rewrite SUMMARY.md
  python tools/generate_summary.py hubs [--wikilinks] refresh "In this section"
                                                      blocks in parent notes
  python tools/generate_summary.py normalize-links [--dry-run] [--verbose] [FILE ...]
                                                      rewrite resolvable
                                                      wikilinks to [[path]]
                                                      form (local only, never
                                                      from CI; close Tolaria)
  python tools/generate_summary.py publish --out DIR  build the GitBook copy
                                                      into an empty DIR outside
                                                      the vault
  python tools/generate_summary.py graph --out FILE.json [--llms URL|FILE]
                                                      export nodes and typed
                                                      edges for visualisation
"""
import difflib
import json
import os
import re
import shutil
import sys
import urllib.parse
import urllib.request

VAULT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG = os.path.join(VAULT, "tools", "summary-parts.json")
SUMMARY = os.path.join(VAULT, "SUMMARY.md")
VIEWS = os.path.join(VAULT, "views")
EXCLUDE_DIRS = {".git", ".github", ".gitbook", ".claude", ".remember", ".obsidian",
                ".idea", "docs", "patoloji-hakkinda", "attachments", "node_modules",
                "views", "tools", "_bookdown_files", "libs", "build"}
EXCLUDE_PREFIXES = ("types/",)
EXCLUDE_FILES = {"SUMMARY.md", "AGENTS.md", "CLAUDE.md", "GEMINI.md", "README.md"}
# Frontmatter keys that credit people/publishers; their targets are not notes.
ATTRIBUTION_KEYS = {"author", "source", "editor", "publisher"}
WIKI = re.compile(r"\[\[([^\]|]+)(?:\|[^\]]+)?\]\]")
WIKI_FULL = re.compile(r"\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]")
KEY_RE = re.compile(r"^([A-Za-z_][\w -]*):\s*(.*?)\s*$")
# Fences may be indented (inside list items); an unmatched indented fence errs toward code.
FENCE = re.compile(r"^[ \t]*(`{3,}|~{3,})")
INLINE_CODE = re.compile(r"(`+)[^`\r\n](?:.*?[^`\r\n])?\1")
MDLINK_OPEN = re.compile(r"(!?)\[((?:[^\[\]\\\r\n]|\\.|\[[^\[\]\r\n]*\])*)\]\(")
SCHEME = re.compile(r"^[A-Za-z][A-Za-z0-9+.-]*:")
CHILD_START = "<!-- tolaria:children:start -->"
CHILD_END = "<!-- tolaria:children:end -->"
RELATED_START = "<!-- tolaria:related:start -->"
RELATED_END = "<!-- tolaria:related:end -->"


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

    def link_keys(self):
        """Frontmatter keys whose values hold at least one wikilink."""
        return [k for k in self.fm if self.links(k)]

    @property
    def body_start(self):
        """Index of the first body line (after the closing ---)."""
        return self.fm_close + 1 if self.fm_close is not None else 0

    @property
    def body(self):
        return "".join(self.lines[self.body_start:])

    @property
    def head(self):
        return "".join(self.lines[:self.body_start])

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
            if rel in EXCLUDE_FILES or f.startswith("_") or rel.startswith(EXCLUDE_PREFIXES):
                continue
            with open(os.path.join(root, f), "rb") as fh:
                notes[rel] = Note(rel, fh.read().decode("utf-8"))
    return notes


def stem_of(rel):
    """Canonical wikilink target for a note: its vault-relative path sans .md."""
    return rel[:-3] if rel.lower().endswith(".md") else rel


class TitleIndex(dict):
    """Lower-cased H1 / filename stem / alias -> set(rel), plus per-kind indexes.

    The per-kind indexes let resolve() follow Tolaria's matching order:
    path, then filename stem, then alias, then H1 title, then humanized stem.
    """

    def __init__(self):
        dict.__init__(self)
        self.paths = {}               # lower-cased path stem -> rel
        self.stems, self.aliases, self.titles, self.human = {}, {}, {}, {}


def title_index(notes):
    idx = TitleIndex()
    for rel, n in notes.items():
        stem = os.path.splitext(os.path.basename(rel))[0]
        al = n.fm.get("aliases")
        aliases = [a for a in (al if isinstance(al, list) else [al] if al else []) if a]
        for t in {n.h1, stem} | set(aliases):
            if t:
                idx.setdefault(t.lower(), set()).add(rel)
        idx.stems.setdefault(stem.lower(), set()).add(rel)
        for a in aliases:
            idx.aliases.setdefault(a.lower(), set()).add(rel)
        if n.h1:
            idx.titles.setdefault(n.h1.lower(), set()).add(rel)
        idx.human.setdefault(re.sub(r"[-_]+", " ", stem).strip().lower(), set()).add(rel)
        idx.paths.setdefault(stem_of(rel).lower(), set()).add(rel)
    return idx


def _lookup(idx, t):
    """Resolve an anchor-free target: path, stem, alias, H1 title, humanized stem."""
    if not t:
        return []
    if "/" in t:
        p = t.lstrip("/")
        if p.lower().endswith(".md"):
            p = p[:-3]
        p = p.lower()
        if p in idx.paths:
            return sorted(idx.paths[p])
        hits = sorted(r for k, rs in idx.paths.items() if k.endswith("/" + p) for r in rs)
        if hits:
            return hits
    key = t.lower()
    for level in (idx.stems, idx.aliases, idx.titles, idx.human):
        if key in level:
            return sorted(level[key])
    return []


def target_parts(idx, target):
    """Split a wikilink target into (note part, '#anchor' or '').

    A '#' only starts an anchor when the full text is not itself a note name,
    so a title such as "Grade #3" still resolves to its own note. A same-page
    link ([[#Heading]]) has an empty note part.
    """
    t = target.strip().rstrip("\\").strip()
    if "#" in t and not _lookup(idx, t):
        base, anchor = t.split("#", 1)
        return base.strip(), "#" + anchor.strip()
    return t, ""


def clean_target(target, idx=None):
    """The note part of a wikilink target (anchor and escaped pipe removed)."""
    if idx is not None:
        return target_parts(idx, target)[0]
    t = target.strip().rstrip("\\").strip()
    return t.split("#", 1)[0].strip() if "#" in t else t


def resolve(idx, title):
    """Resolve a wikilink target the way Tolaria does: path first, then names."""
    return _lookup(idx, target_parts(idx, title)[0])


def anchor_slug(anchor):
    """GitBook-style heading anchor: lower-case words joined by hyphens."""
    a = anchor.lstrip("#").strip().lower()
    a = re.sub(r"[^\w\s-]", "", a, flags=re.U)
    return re.sub(r"[\s_]+", "-", a).strip("-")


# ---------------------------------------------------------------- markdown helpers
def _inline_segments(add, text):
    """Split prose at inline code spans, scanning left to right.

    Whichever construct starts first wins, as in CommonMark: a link whose label
    holds backticks stays one prose piece, and a link written inside backticks
    stays code.
    """
    pos, n = 0, len(text)
    while pos < n:
        cands = []
        mc = INLINE_CODE.search(text, pos)
        if mc:
            cands.append((mc.start(), mc.end(), True))
        mw = WIKI_FULL.search(text, pos)
        if mw:
            cands.append((mw.start(), mw.end(), False))
        ml = next(iter_md_links(text, pos), None)
        if ml:
            cands.append((ml[0], ml[1], False))
        if not cands:
            break
        start, end, code = min(cands)
        add(False, text[pos:start])
        add(code, text[start:end])
        pos = end
    add(False, text[pos:])


def segments(body):
    """Split Markdown into [is_code, text] chunks (fenced blocks, inline code)."""
    segs = []

    def add(code, t):
        if not t:
            return
        if segs and segs[-1][0] == code:
            segs[-1][1] += t
        else:
            segs.append([code, t])

    fence, prose = None, []
    for ln in body.splitlines(True):
        if fence is None:
            m = FENCE.match(ln)
            if m:
                _inline_segments(add, "".join(prose))
                prose = []
                fence = m.group(1)
                add(True, ln)
            else:
                prose.append(ln)
        else:
            add(True, ln)
            s = ln.strip()
            if s and set(s) == {fence[0]} and len(s) >= len(fence):
                fence = None
    _inline_segments(add, "".join(prose))
    return segs


def map_prose(body, fn):
    """Apply fn(line_text) to every prose line of body, leaving code untouched."""
    out = []
    for code, text in segments(body):
        if code:
            out.append(text)
        else:
            out.append("".join(fn(ln) for ln in text.splitlines(True)))
    return "".join(out)


def is_table_row(line):
    """True for a Markdown table row: it opens or closes with a pipe."""
    s = WIKI_FULL.sub("", line).strip()
    return s.startswith("|") or s.endswith("|")


def _parse_dest(text, i):
    n = len(text)
    while i < n and text[i] in " \t":
        i += 1
    if i < n and text[i] == "<":
        k = text.find(">", i)
        if k < 0 or "\n" in text[i:k]:
            return None, i
        dest, i = text[i + 1:k], k + 1
    else:
        depth, start = 0, i
        while i < n:
            c = text[i]
            if c == "\\" and i + 1 < n:
                i += 2
                continue
            if c == "(":
                depth += 1
            elif c == ")":
                if depth == 0:
                    break
                depth -= 1
            elif c in " \t\r\n":
                break
            i += 1
        dest = text[start:i]
    while i < n and text[i] in " \t":
        i += 1
    if i < n and text[i] in "\"'(":
        close = {'"': '"', "'": "'", "(": ")"}[text[i]]
        k = text.find(close, i + 1)
        if k < 0:
            return None, i
        i = k + 1
        while i < n and text[i] in " \t":
            i += 1
    if i < n and text[i] == ")":
        return dest, i + 1
    return None, i


def iter_md_links(text, start=0):
    """Yield (start, end, is_image, label, dest) for inline Markdown links."""
    pos = start
    while True:
        m = MDLINK_OPEN.search(text, pos)
        if not m:
            return
        dest, end = _parse_dest(text, m.end())
        if dest is None:
            pos = m.end()
            continue
        yield m.start(), end, m.group(1) == "!", m.group(2), dest
        pos = end


REFDEF = re.compile(r"^\s{0,3}\[([^\]^][^\]]*)\]:\s*<?(\S+?)>?(?:\s+.*)?$")


def iter_ref_defs(text):
    """Yield (label, dest) for reference-style link definitions ([ref]: dest)."""
    for ln in text.splitlines():
        m = REFDEF.match(ln)
        if m:
            yield m.group(1), m.group(2)


def local_target(src_rel, dest):
    """Vault-relative path a relative Markdown link points at, or None."""
    if not dest or dest.startswith(("#", "//")) or SCHEME.match(dest):
        return None
    d = urllib.parse.unquote(dest.split("#", 1)[0].split("?", 1)[0])
    if not d:
        return None
    if d.startswith("/"):
        full = d.lstrip("/")
    else:
        full = os.path.join(os.path.dirname(src_rel), d)
    return os.path.normpath(full).replace("\\", "/")


def link_href(src_rel, dst_rel):
    base = os.path.dirname(src_rel)
    rel = os.path.relpath(dst_rel, base).replace("\\", "/") if base else dst_rel
    return urllib.parse.quote(rel, safe="/")


def md_text(s, table=False):
    s = s.replace("\\", "\\\\").replace("[", "\\[").replace("]", "\\]")
    return s.replace("|", "\\|") if table else s


def _marker_lines(lines, marker):
    """Indexes of lines that consist of exactly this marker (prose mentions don't count)."""
    return [i for i, ln in enumerate(lines) if ln.strip() == marker]


def has_block(text, start):
    return bool(_marker_lines(text.splitlines(True), start))


def apply_block(text, start, end, block, eol):
    """Replace the marked block, or append it; fail closed on broken markers.

    A marker only counts when it sits on a line of its own, so a note that
    merely mentions the marker text in prose is never spliced.
    """
    lines = text.splitlines(True)
    ss, es = _marker_lines(lines, start), _marker_lines(lines, end)
    body = eol.join(block)
    if len(ss) == 1 and len(es) == 1 and ss[0] < es[0]:
        last = lines[es[0]]
        tail = last[len(last.rstrip("\r\n")):]
        return "".join(lines[:ss[0]]) + body + tail + "".join(lines[es[0] + 1:]), "replaced"
    if not ss and not es:
        return text.rstrip("\r\n") + eol * 2 + body + eol, "appended"
    return text, "broken"


def remove_block(text, start, end):
    lines = text.splitlines(True)
    ss, es = _marker_lines(lines, start), _marker_lines(lines, end)
    if len(ss) == 1 and len(es) == 1 and ss[0] < es[0]:
        eol = "\r\n" if "\r\n" in text else "\n"
        pre = "".join(lines[:ss[0]]).rstrip("\r\n")
        post = "".join(lines[es[0] + 1:])
        return pre + eol + post if post.strip() else pre + eol
    return text


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
        o = n.scalar("order") or n.scalar("_order")
        return (int(o) if o and o.lstrip("-").isdigit() else 9999, n.h1.lower())
    for v in kids.values():
        v.sort(key=key)
    return kids


def published(n):
    return n.scalar("publish") != "false"


# ---------------------------------------------------------------- link scan
def scan_links(notes, idx):
    """Classify every structural wikilink and every relative .md link."""
    rows = []                         # (kind, src, where, target, detail)
    for rel, n in sorted(notes.items()):
        for k in n.link_keys():
            if k in ATTRIBUTION_KEYS:
                continue
            for t in n.links(k):
                rows.append(_classify(notes, idx, rel, "fm:" + k, t))
        for code, text in segments(n.body):
            if code:
                continue
            for m in WIKI_FULL.finditer(text):
                rows.append(_classify(notes, idx, rel, "body", m.group(1)))
            if not published(n):
                continue
            for _s, _e, img, _label, dest in iter_md_links(text):
                tgt = local_target(rel, dest)
                if img or not tgt or not tgt.lower().endswith(".md"):
                    continue
                if tgt not in notes and tgt != "README.md":
                    rows.append(("mdlink-missing", rel, "body", dest, tgt))
                elif tgt in notes and not published(notes[tgt]):
                    rows.append(("mdlink-unpublished", rel, "body", dest, tgt))
            # reference-style definitions ([ref]: path.md) are not rewritten by
            # publish, so a link to a page outside the book is only reported
            for _label, dest in iter_ref_defs(text):
                tgt = local_target(rel, dest)
                if not tgt or not tgt.lower().endswith(".md"):
                    continue
                if tgt not in notes and tgt != "README.md":
                    rows.append(("reflink-missing", rel, "body", dest, tgt))
                elif tgt in notes and not published(notes[tgt]):
                    rows.append(("reflink-unpublished", rel, "body", dest, tgt))
    return rows


def _classify(notes, idx, rel, where, target):
    base, _anchor = target_parts(idx, target)
    if not base:
        return ("self-anchor", rel, where, target, "")
    hits = _lookup(idx, base)
    if not hits:
        return ("unresolved", rel, where, target, "")
    if len(hits) > 1:
        return ("ambiguous", rel, where, target, ", ".join(hits))
    dst = hits[0]
    if base != stem_of(dst):
        return ("non-canonical", rel, where, target, stem_of(dst))
    if published(notes[rel]) and not published(notes[dst]):
        return ("to-unpublished", rel, where, target, dst)
    return ("canonical", rel, where, target, dst)


def scan_views(idx):
    rows = []
    if not os.path.isdir(VIEWS):
        return rows
    for f in sorted(os.listdir(VIEWS)):
        if not f.endswith(".yml"):
            continue
        with open(os.path.join(VIEWS, f), "rb") as fh:
            text = fh.read().decode("utf-8")
        for m in WIKI_FULL.finditer(text):
            base, _anchor = target_parts(idx, m.group(1))
            hits = _lookup(idx, base)
            if len(hits) == 1 and base != stem_of(hits[0]):
                rows.append(("views/" + f, m.group(1), stem_of(hits[0])))
    return rows


# ---------------------------------------------------------------- check
def cmd_check(notes, idx, verbose=False):
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

    # Link health is informational: it never changes the exit status.
    rows = scan_links(notes, idx)
    views = scan_views(idx)
    count = {}
    for r in rows:
        count[r[0]] = count.get(r[0], 0) + 1
    order = ["canonical", "non-canonical", "ambiguous", "unresolved", "to-unpublished",
             "mdlink-unpublished", "mdlink-missing"]
    rare = [k for k in ("self-anchor", "reflink-unpublished", "reflink-missing") if count.get(k)]
    print("links (info): " + ", ".join("%s %d" % (k, count.get(k, 0)) for k in order + rare)
          + ", views non-canonical %d" % len(views))
    if verbose:
        for r in rows:
            if r[0] not in ("canonical", "self-anchor"):
                print("  %-18s %s [%s] -> %s %s" % (r[0].upper(), r[1], r[2], r[3],
                                                   ("=> " + r[4]) if r[4] else ""))
        for v in views:
            print("  %-18s %s -> %s => %s" % ("VIEW NON-CANONICAL", v[0], v[1], v[2]))
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
def build_summary(notes, idx, warn=True):
    """Return (SUMMARY.md lines, set of note paths placed in the book)."""
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
    if warn:
        stray = [r for r, n in notes.items() if published(n) and r not in placed]
        for r in sorted(stray):
            print("WARN unplaced published note:", r)
    return out, placed


def build_lines(notes, idx):
    return build_summary(notes, idx)[0]


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
def children_block(notes, rel, clist, style):
    items = []
    for c in clist:
        if style == "wikilinks":
            items.append("* [[%s|%s]]" % (stem_of(c), notes[c].h1))
        else:
            items.append("* [%s](%s)" % (md_text(notes[c].h1), link_href(rel, c)))
    return [CHILD_START, "", "## In this section", ""] + items + ["", CHILD_END]


def cmd_hubs(notes, idx, style="markdown"):
    kids = children_map(notes, idx)
    changed = 0
    for rel, clist in sorted(kids.items()):
        clist = [c for c in clist if published(notes[c])]
        if not clist or rel not in notes:
            continue
        n = notes[rel]
        block = children_block(notes, rel, clist, style)
        new, status = apply_block(n.text, CHILD_START, CHILD_END, block, n.eol)
        if status == "broken":
            print("WARN hubs: unbalanced children markers, left untouched:", rel)
            continue
        if new != n.text:
            with open(os.path.join(VAULT, rel), "wb") as fh:
                fh.write(new.encode("utf-8"))
            changed += 1
    print("hubs: %d notes updated" % changed)
    return 0


# ---------------------------------------------------------------- normalize-links
def _canon(m, idx, report, rel, body_line=None):
    """Canonical replacement for one wikilink match, or the match unchanged.

    body_line: None for frontmatter/views (bare target, display kept only if
    already present); otherwise the line, so table rows stay bare and prose
    keeps the text the reader saw as display text.
    """
    target, disp = m.group(1), m.group(2)
    base, anchor = target_parts(idx, target)
    if not base:                                # [[#Heading]] — same page
        return m.group(0)
    hits = _lookup(idx, base)
    if len(hits) != 1:
        report.append(("unresolved" if not hits else "ambiguous", rel, target))
        return m.group(0)
    canon = stem_of(hits[0])
    if base == canon:
        return m.group(0)
    if body_line is not None and is_table_row(body_line):
        return "[[%s%s]]" % (canon, anchor)     # a pipe would split the table cell
    if disp:
        return "[[%s%s|%s]]" % (canon, anchor, disp)
    if body_line is None or "/" in base:
        return "[[%s%s]]" % (canon, anchor)
    return "[[%s%s|%s]]" % (canon, anchor, base)


def _canon_fm_line(line, idx, report, rel):
    return WIKI_FULL.sub(lambda m: _canon(m, idx, report, rel), line)


def _canon_body_line(line, idx, report, rel):
    return WIKI_FULL.sub(lambda m: _canon(m, idx, report, rel, line), line)


def normalize_text(n, idx, report):
    lines = n.lines
    out = [lines[0]] if n.fm_close is not None else []
    key = None
    if n.fm_close is not None:
        for ln in lines[1:n.fm_close]:
            m = KEY_RE.match(ln.rstrip("\r\n"))
            if m and not ln[:1].isspace():
                key = m.group(1)
            if key in ATTRIBUTION_KEYS or "[[" not in ln:
                out.append(ln)
            else:
                out.append(_canon_fm_line(ln, idx, report, n.rel))
        out.append(lines[n.fm_close])
    body = "".join(lines[n.body_start:])
    out.append(map_prose(body, lambda ln: _canon_body_line(ln, idx, report, n.rel)))
    return "".join(out)


def _select(notes, args):
    if not args:
        return sorted(notes)
    picked = []
    for a in args:
        p = os.path.abspath(a) if os.path.isabs(a) else os.path.abspath(os.path.join(os.getcwd(), a))
        rel = os.path.relpath(p, VAULT).replace("\\", "/")
        if rel in notes:
            picked.append(rel)
        elif not rel.startswith("views/"):
            print("normalize-links: skipped (not a vault note):", a)
    return picked


def cmd_normalize(notes, idx, args, dry, verbose):
    report, changed, rewrites = [], [], 0
    files = [a for a in args if not a.startswith("--")]
    for rel in _select(notes, files):
        n = notes[rel]
        new = normalize_text(n, idx, report)
        if new != n.text:
            diff = sum(1 for a, b in zip(n.text.splitlines(), new.splitlines()) if a != b)
            rewrites += _count_changed(n.text, new)
            changed.append((rel, diff))
            if not dry:
                with open(os.path.join(VAULT, rel), "wb") as fh:
                    fh.write(new.encode("utf-8"))
    if not files:                             # whole vault: every saved view
        view_files = sorted(f for f in os.listdir(VIEWS) if f.endswith(".yml")) if os.path.isdir(VIEWS) else []
    else:                                     # only the views named on the command line
        view_files = []
        for a in files:
            rel = os.path.relpath(os.path.abspath(a), VAULT).replace("\\", "/")
            if rel.startswith("views/") and rel.endswith(".yml") and os.path.isfile(os.path.join(VAULT, rel)):
                view_files.append(rel[len("views/"):])
    for f in view_files:
        path = os.path.join(VIEWS, f)
        with open(path, "rb") as fh:
            text = fh.read().decode("utf-8")
        new = _canon_fm_line(text, idx, report, "views/" + f)
        if new != text:
            changed.append(("views/" + f, _count_changed(text, new)))
            rewrites += _count_changed(text, new)
            if not dry:
                with open(path, "wb") as fh:
                    fh.write(new.encode("utf-8"))
    for rel, d in changed:
        print("%s %s (%d line%s)" % ("would rewrite" if dry else "rewrote", rel, d, "" if d == 1 else "s"))
    skipped = {}
    for kind, rel, t in report:
        skipped[kind] = skipped.get(kind, 0) + 1
        if verbose:
            print("  left %-10s %s -> [[%s]]" % (kind, rel, t))
    print("normalize-links: %d files %s, %d links rewritten; left untouched: %s%s"
          % (len(changed), "to change" if dry else "changed", rewrites,
             ", ".join("%s %d" % kv for kv in sorted(skipped.items())) or "none",
             " (dry run)" if dry else ""))
    return 0


def _count_changed(old, new):
    a = WIKI_FULL.findall(old)
    b = WIKI_FULL.findall(new)
    return sum(1 for x, y in zip(a, b) if x != y)


# ---------------------------------------------------------------- publish
class Stats(dict):
    def bump(self, k, n=1):
        self[k] = self.get(k, 0) + n


WIKI_EMBED = re.compile(r"(!?)\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]")
_FILES = {}


def _vault_file(name):
    """Find a non-note vault file (an Obsidian ![[image.png]] embed) by path or name."""
    if not _FILES:
        skip = {".git", ".claude", ".remember", ".obsidian", "node_modules", "renv", ".Rproj.user", "build"}
        for root, dirs, files in os.walk(VAULT):
            dirs[:] = [d for d in dirs if d not in skip]
            for f in files:
                if not f.lower().endswith(".md"):
                    rel = os.path.relpath(os.path.join(root, f), VAULT).replace("\\", "/")
                    _FILES.setdefault(f.lower(), []).append(rel)
                    _FILES.setdefault(rel.lower(), []).append(rel)
        _FILES.setdefault("", [])
    hits = _FILES.get(name.strip().lstrip("/").lower(), [])
    return hits[0] if len(hits) == 1 else None


def _render_wikilinks(src_rel, line, notes, idx, live, stats):
    table = is_table_row(line)

    def text(s):
        return md_text(s, table) if table else s

    def sub(m):
        bang, target, disp = m.group(1), m.group(2), m.group(3)
        base, anchor = target_parts(idx, target)
        frag = ("#" + anchor_slug(anchor)) if anchor and anchor_slug(anchor) else ""
        if not base:                                     # [[#Heading]]: same page
            stats.bump("wikilinks to a heading on the same page")
            return "[%s](%s)" % (md_text(disp or anchor.lstrip("#") or target, table), frag or "#")
        hits = _lookup(idx, base)
        if bang and not hits:                            # ![[image.png]] attachment
            f = _vault_file(base)
            if f:
                stats.bump("embedded files -> images")
                return "![%s](%s)" % (md_text(disp or os.path.basename(f), table), link_href(src_rel, f))
        if len(hits) == 1 and hits[0] in live:
            dst = hits[0]
            shown = disp or (notes[dst].h1 if "/" in base else base)
            stats.bump("wikilinks converted")
            return "[%s](%s%s)" % (md_text(shown, table), link_href(src_rel, dst), frag)
        if len(hits) == 1:
            stats.bump("wikilinks to unpublished -> text")
            shown = disp or (notes[hits[0]].h1 if "/" in base else base)
        else:
            stats.bump("wikilinks unresolved -> text" if not hits else "wikilinks ambiguous -> text")
            shown = disp or base.rsplit("/", 1)[-1] or target
        return text(shown)
    return WIKI_EMBED.sub(sub, line)


def _render_mdlinks(src_rel, text, notes, live, stats):
    out, pos = [], 0
    for start, end, img, label, dest in iter_md_links(text):
        tgt = local_target(src_rel, dest)
        if img or not tgt or not tgt.lower().endswith(".md") or tgt in live or tgt == "README.md":
            continue
        out.append(text[pos:start])
        out.append(label)
        pos = end
        stats.bump("md links to unpublished/missing -> text")
    out.append(text[pos:])
    return "".join(out)


def render_for_gitbook(src_rel, n, notes, idx, live, kids, stats):
    """GitBook-safe text for one note: links resolved, generated blocks fresh."""
    eol = n.eol

    def prose(line):
        line = _render_wikilinks(src_rel, line, notes, idx, live, stats)
        return _render_mdlinks(src_rel, line, notes, live, stats)
    body = map_prose(n.body, prose)
    text = n.head + body

    clist = [c for c in kids.get(src_rel, []) if c in live]
    if clist:
        new, status = apply_block(text, CHILD_START, CHILD_END,
                                  children_block(notes, src_rel, clist, "markdown"), eol)
        if status == "broken":
            print("WARN publish: unbalanced children markers, block left as is:", src_rel)
        else:
            text = new
            stats.bump("children blocks")
    elif has_block(text, CHILD_START):
        text = remove_block(text, CHILD_START, CHILD_END)

    parent = set(resolve(idx, n.links("belongs_to")[0])) if n.links("belongs_to") else set()
    related = {}
    for t in n.links("related_to"):
        hits = resolve(idx, t)
        if len(hits) == 1 and hits[0] in live and hits[0] != src_rel and hits[0] not in parent:
            related[hits[0]] = notes[hits[0]].h1
    if related:
        items = ["* [%s](%s)" % (md_text(h), link_href(src_rel, r))
                 for r, h in sorted(related.items(), key=lambda kv: kv[1].lower())]
        block = [RELATED_START, "", "## See also", ""] + items + ["", RELATED_END]
        new, status = apply_block(text, RELATED_START, RELATED_END, block, eol)
        if status != "broken":
            text = new
            stats.bump("see-also blocks")
    return text


def _inside(path, root):
    a = os.path.normcase(os.path.realpath(path))
    b = os.path.normcase(os.path.realpath(root))
    return a == b or a.startswith(b.rstrip("\\/") + os.sep)


def _write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as fh:
        fh.write(text.encode("utf-8"))


def cmd_publish(notes, idx, out):
    if not out:
        print("publish: --out DIR is required"); return 2
    if _inside(out, VAULT):
        print("publish: refusing to write inside the vault:", out); return 2
    if os.path.exists(out) and (not os.path.isdir(out) or os.listdir(out)):
        print("publish: output directory must be empty or absent:", out); return 2
    os.makedirs(out, exist_ok=True)
    lines, live = build_summary(notes, idx)
    kids = children_map(notes, idx)
    stats = Stats()
    _write(os.path.join(out, "SUMMARY.md"), "\n".join(lines) + "\n")

    assets = set()
    for rel in sorted(live):
        n = notes[rel]
        page = render_for_gitbook(rel, n, notes, idx, live, kids, stats)
        _write(os.path.join(out, rel), page)
        assets |= _local_files(rel, page)
    with open(os.path.join(VAULT, "README.md"), "rb") as fh:
        readme = Note("README.md", fh.read().decode("utf-8"))
    page = render_for_gitbook("README.md", readme, notes, idx, live, kids, stats)
    _write(os.path.join(out, "README.md"), page)
    assets |= _local_files("README.md", page)

    src_assets = os.path.join(VAULT, ".gitbook", "assets")
    if os.path.isdir(src_assets):
        shutil.copytree(src_assets, os.path.join(out, ".gitbook", "assets"))
    copied = 0
    for a in sorted(assets):
        src = os.path.join(VAULT, a)
        dst = os.path.join(out, a)
        if a.startswith(".gitbook/assets/") or os.path.exists(dst) or not os.path.isfile(src):
            continue
        if not _inside(src, VAULT):
            continue
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        copied += 1
    stats.bump("other local files copied", copied)
    print("publish: %d pages -> %s" % (len(live) + 1, out))
    for k in sorted(stats):
        print("  %-40s %d" % (k, stats[k]))
    return 0


def _local_files(src_rel, body):
    found = set()
    for code, text in segments(body):
        if code:
            continue
        for _s, _e, _img, _label, dest in iter_md_links(text):
            t = local_target(src_rel, dest)
            if t and not t.lower().endswith(".md") and not t.startswith("../"):
                found.add(t)
        for m in re.finditer(r"""<img[^>]+src=["']([^"']+)["']""", text, re.I):
            t = local_target(src_rel, m.group(1))
            if t and not t.startswith("../"):
                found.add(t)
    return found


# ---------------------------------------------------------------- graph
def _llms_urls(src, lines):
    """Pair SUMMARY.md page entries with llms.txt entries by position."""
    if src.startswith(("http://", "https://")):
        req = urllib.request.Request(src, headers={"User-Agent": "Mozilla/5.0"})
        text = urllib.request.urlopen(req, timeout=60).read().decode("utf-8")
    else:
        with open(src, encoding="utf-8") as fh:
            text = fh.read()
    live = re.findall(r"^- \[(.*?)\]\((https?://[^)\s]+)\)", text, re.M)
    pages = []
    for s in lines:
        m = re.match(r"^\s*\*\s+\[([^\]]+)\]\(([^)]+)\)\s*$", s)
        if m and not m.group(2).startswith("http"):
            pages.append((m.group(1), urllib.parse.unquote(m.group(2))))

    def norm(t):
        return re.sub(r"\s+", " ", t.replace("\\", "")).strip().lower()
    # align the two title sequences: pages added or removed on one side only
    # shift positions, and a URL is kept only where the titles are identical
    a = [norm(t) for t, _p in pages]
    b = [norm(t) for t, _u in live]
    urls = {}
    for blk in difflib.SequenceMatcher(None, a, b, autojunk=False).get_matching_blocks():
        for k in range(blk.size):
            url = live[blk.b + k][1]
            urls[pages[blk.a + k][1]] = url[:-3] if url.endswith(".md") else url
    if len(urls) < len(pages):
        print("graph: %d of %d pages have no matching llms.txt entry; their urls are left empty"
              % (len(pages) - len(urls), len(pages)))
    return urls


def cmd_graph(notes, idx, out, llms):
    if not out:
        print("graph: --out FILE.json is required"); return 2
    lines, placed = build_summary(notes, idx, warn=False)
    urls = _llms_urls(llms, lines) if llms else {}
    nodes, edges, extra, seen = {}, [], {}, set()
    for rel, n in sorted(notes.items()):
        nodes[stem_of(rel)] = {
            "id": stem_of(rel), "title": n.h1, "kind": "note",
            "type": (n.scalar("type") or "").strip('"') or None,
            "status": (n.scalar("status") or "").strip('"') or None,
            "publish": published(n), "in_book": rel in placed,
            "url": urls.get(rel)}

    def add(src, target, etype):
        base, _anchor = target_parts(idx, target)
        if not base:                     # [[#Heading]] points into the same note
            return
        hits = _lookup(idx, base)
        if len(hits) == 1:
            dst = stem_of(hits[0])
        else:
            label = base
            dst = "?" + label
            if dst not in extra:
                extra[dst] = {"id": dst, "title": label, "kind":
                              "attribution" if etype in ATTRIBUTION_KEYS else
                              ("ambiguous" if hits else "unresolved")}
        k = (src, dst, etype)
        if k not in seen and dst != src:
            seen.add(k)
            edges.append({"source": src, "target": dst, "type": etype})

    for rel, n in sorted(notes.items()):
        src = stem_of(rel)
        for key in n.link_keys():
            for t in n.links(key):
                add(src, t, key)
        for code, text in segments(n.body):
            if not code:
                for m in WIKI_FULL.finditer(text):
                    add(src, m.group(1), "body")
    data = {"nodes": list(nodes.values()) + sorted(extra.values(), key=lambda x: x["id"]),
            "edges": edges}
    with open(out, "w", encoding="utf-8", newline="\n") as fh:
        json.dump(data, fh, ensure_ascii=False, indent=1)
    types = {}
    for e in edges:
        types[e["type"]] = types.get(e["type"], 0) + 1
    print("graph: %d notes, %d other nodes, %d edges (%s) -> %s"
          % (len(nodes), len(extra), len(edges),
             ", ".join("%s %d" % kv for kv in sorted(types.items())), out))
    return 0


def _opt(name):
    if name in sys.argv:
        i = sys.argv.index(name)
        if i + 1 < len(sys.argv) and not sys.argv[i + 1].startswith("--"):
            return sys.argv[i + 1]
    return None


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1] if len(sys.argv) > 1 else "check"
    notes = load_notes()
    idx = title_index(notes)
    verbose = "--verbose" in sys.argv or "-v" in sys.argv
    if mode == "check":
        return cmd_check(notes, idx, verbose)
    if mode == "seed":
        return cmd_seed(notes, idx)
    if mode == "generate":
        return cmd_generate(notes, idx, "--dry-run" in sys.argv)
    if mode == "hubs":
        return cmd_hubs(notes, idx, "wikilinks" if "--wikilinks" in sys.argv else "markdown")
    if mode == "normalize-links":
        return cmd_normalize(notes, idx, [a for a in sys.argv[2:] if a not in ("-v",)],
                             "--dry-run" in sys.argv, verbose)
    if mode == "publish":
        return cmd_publish(notes, idx, _opt("--out"))
    if mode == "graph":
        return cmd_graph(notes, idx, _opt("--out"), _opt("--llms"))
    print(__doc__)
    return 1


if __name__ == "__main__":
    sys.exit(main())
