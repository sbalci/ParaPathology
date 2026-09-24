#!/usr/bin/env python3
"""Read-only health check of the live GitBook site against the vault.

It pairs the site's llms.txt with SUMMARY.md by position, fetches every page's
Markdown export (<page>.md), and reports:
  - pages missing, out of order, or retitled;
  - pages not returning HTTP 200;
  - escaped wikilinks (GitBook renders body [[...]] as literal "\\[\\[...]]");
  - links GitBook rewrote to GitHub source (a link to a page outside the book);
  - internal page links that do not resolve to a live page;
  - with --images, GitBook-hosted images that fail to load.

Usage:
  python tools/check_site.py [--base-url URL] [--summary FILE] [--images]
                             [--save BASELINE.json] [--compare BASELINE.json]

Save a baseline before a Git Sync change and compare right after it. Nothing is
written except the --save file. Exit status is 1 when any problem is found.
"""
import concurrent.futures as cf
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

VAULT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UA = "Mozilla/5.0 (compatible; parapathology-check-site/1.0)"
# GitBook rewrites a link to a page outside the book into a link to the synced
# branch on GitHub; deliberate links pinned to a commit are not matched.
GITHUB_TREE = re.compile(
    r"https://github\.com/sbalci/ParaPathology/(?:tree|blob)/(?:master|main|gitbook-publish)/[^\s)]+")
IMAGE = re.compile(r"https://[^\s\"<>]*files\.gitbook\.io[^\s\"<>]*?\?alt=media(?:&[^\s\")<>]*)?")


def arg(name, default=None):
    if name in sys.argv:
        i = sys.argv.index(name)
        if i + 1 < len(sys.argv):
            return sys.argv[i + 1]
    return default


def fetch(url, tries=3):
    for attempt in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=40) as r:
                return r.status, r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503, 504) and attempt < tries - 1:
                time.sleep(3 + 5 * attempt)
                continue
            return e.code, ""
        except Exception as e:  # network errors are reported, not raised
            if attempt < tries - 1:
                time.sleep(3)
                continue
            return "ERR " + type(e).__name__, ""


def norm_title(t):
    t = html.unescape(t.replace("\\", ""))
    return re.sub(r"\s+", " ", t).strip().lower()


def summary_pages(path):
    pages = []
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            m = re.match(r"^\s*\*\s+\[(.+)\]\(([^)]+)\)\s*$", line)
            if m and not m.group(2).startswith("http"):
                pages.append((m.group(1), urllib.parse.unquote(m.group(2))))
    return pages


def llms_pages(text, base):
    pat = re.compile(r"^- \[(.*?)\]\((%s/[^)\s]+)\)" % re.escape(base), re.M)
    return [(m.group(1), m.group(2)) for m in pat.finditer(text)]


def page_path(url, base):
    p = urllib.parse.urlsplit(url).path
    if p.endswith(".md"):
        p = p[:-3]
    return p.rstrip("/") or "/"


def main():
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    base = arg("--base-url", "https://www.parapathology.com").rstrip("/")
    summary = arg("--summary", os.path.join(VAULT, "SUMMARY.md"))
    problems = []

    st, llms = fetch(base + "/llms.txt")
    if st != 200:
        print("llms.txt: HTTP", st)
        return 1
    live = llms_pages(llms, base)
    local = summary_pages(summary)
    print("pages: SUMMARY.md %d, llms.txt %d" % (len(local), len(live)))
    if len(live) != len(local):
        problems.append("page count differs: SUMMARY.md %d vs live %d" % (len(local), len(live)))
    for i, ((lt, lp), (wt, wu)) in enumerate(zip(local, live)):
        if norm_title(lt) != norm_title(wt):
            problems.append("title mismatch at #%d: %r (%s) vs live %r (%s)" % (i, lt, lp, wt, wu))

    urls = [u for _, u in live]
    paths = {page_path(u, base) for u in urls} | {"/", "/readme"}

    def check(url):
        status, text = fetch(url)
        body = text.split("\n", 2)[-1] if text.startswith(">") else text
        internal = []
        for dest in re.findall(r"\]\(([^)\s]+)\)", body):
            if dest.startswith("/") and not dest.startswith("/~gitbook"):
                internal.append(dest)
            elif dest.startswith(base + "/"):
                internal.append(dest[len(base):])
        # image URLs carry escaped parentheses, e.g. "...%20\(4\).png?alt=media"
        images = [m.replace("\\(", "(").replace("\\)", ")")
                  for m in IMAGE.findall(body)]
        return {
            "url": url, "status": status,
            "escaped_wikilinks": body.count("\\[\\["),
            "github_links": sorted(set(GITHUB_TREE.findall(body))),
            "broken_internal": sorted({d for d in internal
                                       if page_path(urllib.parse.unquote(d.split("#")[0]), "") not in paths}),
            "images": sorted(set(images)),
        }

    with cf.ThreadPoolExecutor(6) as ex:
        results = list(ex.map(check, urls))

    for r in results:
        if r["status"] != 200:
            problems.append("HTTP %s: %s" % (r["status"], r["url"]))
        if r["escaped_wikilinks"]:
            problems.append("%d literal [[wikilinks]]: %s" % (r["escaped_wikilinks"], r["url"]))
        for g in r["github_links"]:
            problems.append("link sent to GitHub source: %s -> %s" % (r["url"], g))
        for d in r["broken_internal"]:
            problems.append("broken internal link: %s -> %s" % (r["url"], d))

    if "--images" in sys.argv:
        imgs = sorted({i for r in results for i in r["images"]})
        with cf.ThreadPoolExecutor(6) as ex:
            for img, (status, _) in zip(imgs, ex.map(fetch, imgs)):
                if status != 200:
                    problems.append("image HTTP %s: %s" % (status, img))
        print("images checked: %d" % len(imgs))

    ok = sum(1 for r in results if r["status"] == 200)
    print("HTTP 200: %d/%d | literal wikilinks: %d | links to GitHub source: %d | broken internal: %d"
          % (ok, len(results), sum(r["escaped_wikilinks"] for r in results),
             sum(len(r["github_links"]) for r in results),
             sum(len(r["broken_internal"]) for r in results)))

    snapshot = {"base": base, "pages": {page_path(r["url"], base): r["status"] for r in results}}
    if arg("--compare"):
        with open(arg("--compare"), encoding="utf-8") as fh:
            old = json.load(fh)["pages"]
        new = snapshot["pages"]
        for p in sorted(set(old) - set(new)):
            problems.append("page gone since baseline: %s" % p)
        for p in sorted(set(new) - set(old)):
            print("new page since baseline:", p)
        for p in sorted(set(old) & set(new)):
            if old[p] != new[p]:
                problems.append("status changed since baseline: %s %s -> %s" % (p, old[p], new[p]))
    if arg("--save"):
        with open(arg("--save"), "w", encoding="utf-8") as fh:
            json.dump(snapshot, fh, indent=1)
        print("baseline saved:", arg("--save"))

    for p in problems:
        print("PROBLEM", p)
    print("check_site: %d problems" % len(problems))
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
