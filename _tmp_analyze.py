import os, json, re
from collections import defaultdict

EXCLUDE_DIRS = {'.git', '.gitbook', 'node_modules', '.remember', '.claude', 'views', '_book'}
ROOT = r'G:\GitHub\ParaPathology'
SKIP_FILES = {'SUMMARY.md', 'AGENTS.md', 'CLAUDE.md'}

WIKILINK = re.compile(r'\[\[([^\]|]+)(?:\|[^\]]*)?\]\]')

records = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.endswith('_files')]
    for fn in filenames:
        if not fn.lower().endswith('.md'):
            continue
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, ROOT).replace('\\', '/')
        if rel in SKIP_FILES:
            continue
        with open(full, 'rb') as f:
            raw = f.read()
        bom = raw.startswith(b'\xef\xbb\xbf')
        text = raw.decode('utf-8-sig', errors='replace')
        crlf = text.count('\r\n')
        lf_only = text.count('\n') - crlf
        # frontmatter
        fm_lines = []
        body = text
        fm_end = None
        if text.startswith('---'):
            m = re.match(r'^---\r?\n(.*?)\r?\n---\r?\n?', text, re.DOTALL)
            if m:
                fm_lines = m.group(1).splitlines()
                body = text[m.end():]
        # H1
        h1 = None
        for line in body.splitlines():
            s = line.strip()
            if s.startswith('# '):
                h1 = s[2:].strip()
                break
        # frontmatter keys of interest
        fm_text = '\n'.join(fm_lines)
        has_aliases = bool(re.search(r'^aliases\s*:', fm_text, re.M))
        # related_to / relatedTo values (inline list or block list)
        def get_links(key):
            vals = []
            m = re.search(r'^' + key + r'\s*:\s*(.*)$', fm_text, re.M)
            if m:
                inline = m.group(1).strip()
                if inline and inline not in ('', '[]'):
                    vals += WIKILINK.findall(inline)
                else:
                    # block list following
                    lines = fm_text.splitlines()
                    for i, l in enumerate(lines):
                        if re.match(r'^' + key + r'\s*:', l):
                            j = i + 1
                            while j < len(lines) and re.match(r'^\s+-\s', lines[j]):
                                vals += WIKILINK.findall(lines[j])
                                j += 1
                            break
            return vals
        related = get_links('related_to') + get_links('relatedTo')
        belongs = get_links('belongs_to') + get_links('belongsTo')
        # body wikilinks
        body_links = WIKILINK.findall(body)
        records.append({
            'path': rel, 'stem': os.path.splitext(fn)[0], 'h1': h1,
            'bom': bom, 'crlf': crlf, 'lf': lf_only,
            'has_aliases': has_aliases, 'has_fm': bool(fm_lines),
            'related_to': related, 'belongs_to': belongs,
            'body_wikilinks': body_links,
        })

with open(os.path.join(ROOT, '_tmp_inventory.json'), 'w', encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False, indent=1)

# --- reports ---
print("records:", len(records))

by_h1 = defaultdict(list)
for r in records:
    if r['h1']:
        by_h1[r['h1'].lower()].append(r['path'])
print("\n== duplicate H1 groups ==")
for h1, paths in sorted(by_h1.items()):
    if len(paths) > 1:
        print(f"  '{h1}':")
        for p in paths:
            print(f"     {p}")

def norm(s):
    return re.sub(r'[^a-z0-9]+', '', s.lower()) if s else ''

need_alias = [r for r in records if r['h1'] and not r['has_aliases']
              and r['h1'].lower() != r['stem'].lower()]
print(f"\n== notes needing alias (H1 != stem, no aliases yet): {len(need_alias)} ==")

no_h1 = [r['path'] for r in records if not r['h1']]
print(f"\n== notes with no H1: {len(no_h1)} ==")
for p in no_h1:
    print("  ", p)

no_fm = [r['path'] for r in records if not r['has_fm']]
print(f"\n== notes with no frontmatter: {len(no_fm)} ==")
for p in no_fm:
    print("  ", p)

body_link_notes = [r for r in records if r['body_wikilinks']]
print(f"\n== notes with body wikilinks: {len(body_link_notes)} ==")
for r in body_link_notes:
    print(f"   {r['path']}: {r['body_wikilinks']}")

has_belongs = [r for r in records if r['belongs_to']]
print(f"\n== notes already using belongs_to: {len(has_belongs)} ==")
rel_count = sum(len(r['related_to']) for r in records)
print(f"== total related_to edges: {rel_count} across {sum(1 for r in records if r['related_to'])} notes ==")
