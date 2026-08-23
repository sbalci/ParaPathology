import os
import sys

sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load(rel):
    p = os.path.join(ROOT, rel)
    raw = open(p, "rb").read()
    bom = raw.startswith(b"\xef\xbb\xbf")
    if bom:
        raw = raw[3:]
    text = raw.decode("utf-8")
    crlf = text.count("\r\n") * 2 >= text.count("\n")
    return text.replace("\r\n", "\n"), crlf, bom


def save(rel, text, crlf, bom):
    p = os.path.join(ROOT, rel)
    if crlf:
        text = text.replace("\n", "\r\n")
    data = text.encode("utf-8")
    if bom:
        data = b"\xef\xbb\xbf" + data
    open(p, "wb").write(data)


# 1) selecting-a-journal: keep frontmatter + first full list copy + unique tail
rel = "writing-journal-articles/selecting-a-journal.md"
text, crlf, bom = load(rel)
lines = text.split("\n")
assert lines[142] == '{% embed url="https://trdizin.gov.tr/statistics/listAcceptedJournals.xhtml" %}', lines[142]
assert lines[629] == "* Critical appraisal of predatory journals in pathology", lines[629]
new = lines[:143] + [""] + lines[629:634] + [""]
save(rel, "\n".join(new), crlf, bom)
print("selecting-a-journal: %d -> %d lines" % (len(lines), len(new)))

# 2) data-and-tools: keep header + one stats/viz copy + the two unique groups
rel = "bibliometrics/data-and-tools-for-bibliographic-analysis/data-and-tools.md"
text, crlf, bom = load(rel)
lines = text.split("\n")
assert lines[28] == "Bluesky Statistics", lines[28]
assert lines[141] == "[https://uxdesign.cc/design-better-data-tables-4ecc99d23356](https://uxdesign.cc/design-better-data-tables-4ecc99d23356)", lines[141]
assert lines[258] == "* Sankey diagram", lines[258]
assert lines[274] == "[https://www.rollapp.com/apps/statistics](https://www.rollapp.com/apps/statistics)", lines[274]
assert lines[391] == "* gapminder", lines[391]
assert lines[405] == "[https://vizabi.org/tutorials/2017/04/04/join-your-data-with-g/](https://vizabi.org/tutorials/2017/04/04/join-your-data-with-g/)", lines[405]
lines[28] = "* Bluesky Statistics"
new = lines[:142] + [""] + lines[258:275] + [""] + lines[391:406] + [""]
save(rel, "\n".join(new), crlf, bom)
print("data-and-tools: %d -> %d lines" % (len(lines), len(new)))

# 3) show duplicated-line detail for the mid-tier flagged files
FILES = [
    "macroscopy/macroscopic-photography.md",
    "pathology-residents-and-pathologists/so-called-junk-materials-and-pitfalls.md",
    "taxonomy-and-classification-of-diseases/chaos-theory-and-uncertainity.md",
    "guidelines/ajcc-uicc-tnm.md",
    "appendix/web-pages.md",
    "systemic-pathology/uropathology/README.md",
    "computers/git-github.md",
    "theories/Theories and Frameworks for Understanding Pathology Practice.md",
    "medical-school-lectures/laboratory-lectures/lab-pathology-of-gastrointestinal-tract-1.md",
    "appendix/courses-and-moocs.md",
]
for rel in FILES:
    text, _, _ = load(rel)
    counts = {}
    for i, line in enumerate(text.split("\n"), 1):
        ls = line.strip()
        if len(ls) >= 50:
            counts.setdefault(ls, []).append(i)
    print("\n=== %s" % rel)
    for ls, idxs in counts.items():
        if len(idxs) >= 3:
            print("  x%d @ %s : %s" % (len(idxs), idxs, ls[:100]))
