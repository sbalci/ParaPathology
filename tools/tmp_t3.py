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


def frontmatter_span(text):
    assert text.startswith("---\n"), "no frontmatter"
    end = text.index("\n---\n", 4)
    return 4, end  # body starts at end + 5


# 1) unpublish the three verbatim full-text clippings
UNPUB = [
    "Clippings/The hallmarks of cancer immune evasion.md",
    "Clippings/Artificial intelligence in digital pathology — time for a reality check - Nature Reviews Clinical Oncology.md",
    "Clippings/Regression modeling of competing risk using R an in depth guide for clinicians - Bone Marrow Transplantation.md",
]
for rel in UNPUB:
    text, crlf, bom = load(rel)
    s, e = frontmatter_span(text)
    fm = text[s:e]
    assert "\npublish:" not in "\n" + fm, "publish key already present: " + rel
    text = text[:e] + "\npublish: false" + text[e:]
    save(rel, text, crlf, bom)
    print("unpublished:", rel)

# 2) bladder cancer clipping: replace scraped feedback-widget body
rel = "Clippings/Digital and Computational Pathology Applications in Bladder Cancer Novel Tools Addressing Clinically Pressing Needs.md"
text, crlf, bom = load(rel)
s, e = frontmatter_span(text)
body = (
    "## Summary\n\n"
    "A *Modern Pathology* review of computational and digital pathology tools proposed for "
    "bladder cancer management. It surveys the most relevant algorithms aimed at improving "
    "diagnostic, staging and grading accuracy and streamlining workflow efficiency, set against "
    "the successful therapeutic strategies that followed molecular subtyping of bladder cancer. "
    "Source: [Modern Pathology abstract](https://www.modernpathology.org/article/S0893-3952%2824%2900211-4/abstract).\n"
)
assert "Tell us what you think" in text, "expected junk body missing"
text = text[: e + 5] + body
save(rel, text, crlf, bom)
print("cleaned:", rel)

# 3) seeds-or-parasites clipping: give the empty stub a one-line body
rel = "Clippings/Seeds or Parasites Clinical and Histopathological.md"
text, crlf, bom = load(rel)
s, e = frontmatter_span(text)
assert text[e + 5:].strip() == "", "expected empty body"
body = (
    "Article from the *Turkish Journal of Pathology* on distinguishing seeds from parasites in "
    "clinical and histopathological evaluation "
    "([source PDF](https://turkjpath.org/uploads/pdf/pdf_TPD_2022.pdf)).\n"
)
text = text[: e + 5] + body
save(rel, text, crlf, bom)
print("filled:", rel)

# 4) machine-learning hub: drop the four repeated intro blocks, fix broken keras link
rel = "statistics-and-bioinformatics/machine-learning/README.md"
text, crlf, bom = load(rel)
text = text.replace("[https://keras.io/](/broken/pages/-Ll0S9trKeVQa4y0mtF1)", "[https://keras.io/](https://keras.io/)")
anchor = "* **Google DeepMind Science Skills** — agent skills for grounded, efficient scientific workflows: [GitHub repository](https://github.com/google-deepmind/science-skills)\n"
marker = "<!-- tolaria:children:start -->"
a = text.index(anchor) + len(anchor)
b = text.index(marker)
removed = text[a:b]
assert removed.count("Fun and Easy") == 4 and removed.count("Machine Learning Glossary") == 4, "unexpected region"
text = text[:a] + "\n" + text[b:]
save(rel, text, crlf, bom)
print("deduplicated machine-learning README, removed %d chars" % len(removed))

# 5) vault-wide scan: notes where a long line repeats 3+ times
print("\n--- repetition scan ---")
hits = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in {".git", "node_modules", ".gitbook", "attachments", "patoloji-hakkinda", "docs", ".claude", ".remember"}]
    for fn in filenames:
        if not fn.endswith(".md"):
            continue
        rel2 = os.path.relpath(os.path.join(dirpath, fn), ROOT)
        try:
            t, _, _ = load(rel2)
        except Exception:
            continue
        counts = {}
        for line in t.split("\n"):
            ls = line.strip()
            if len(ls) >= 50:
                counts[ls] = counts.get(ls, 0) + 1
        worst = max(counts.values()) if counts else 0
        if worst >= 3:
            reps = sum(c - 1 for c in counts.values() if c >= 3)
            hits.append((reps, worst, rel2))
for reps, worst, rel2 in sorted(hits, reverse=True):
    print("%4d dup-lines (max %d) %s" % (reps, worst, rel2))
print("total flagged:", len(hits))
