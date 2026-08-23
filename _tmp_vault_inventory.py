import os, json, re
from collections import Counter

EXCLUDE_DIRS = {'.git', '.gitbook', 'node_modules', '.remember', '.claude', 'views', '_book'}
ROOT = r'G:\GitHub\ParaPathology'

notes = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.endswith('_files')]
    for fn in filenames:
        if fn.lower().endswith('.md'):
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT).replace('\\', '/')
            notes.append(rel)

print("total md files:", len(notes))
top = Counter(p.split('/')[0] if '/' in p else '(root)' for p in notes)
for k, v in sorted(top.items(), key=lambda x: -x[1]):
    print(f"{v:5d}  {k}")
