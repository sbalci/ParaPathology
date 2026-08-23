import os, re, codecs

ROOT = r'G:\GitHub\ParaPathology'
EXCLUDE_DIRS = {'.git', '.gitbook', 'node_modules', '.remember', '.claude', 'views', '_book',
                'docs', 'patoloji-hakkinda'}
SKIP_FILES = {'SUMMARY.md', 'AGENTS.md', 'CLAUDE.md', 'GEMINI.md'}

FM_RE = re.compile(r'^(---\r?\n)(.*?)(\r?\n---(?:\r?\n|$))', re.DOTALL)
LINKTEXT = re.compile(r'\[([^\]]+)\]\([^)]*\)')

converted = 0
aliased = 0
changed_files = 0
oddities = []

for dirpath, dirnames, filenames in os.walk(ROOT):
    dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.endswith('_files')]
    for fn in filenames:
        if not fn.lower().endswith('.md'):
            continue
        full = os.path.join(dirpath, fn)
        rel = os.path.relpath(full, ROOT).replace('\\', '/')
        if rel in SKIP_FILES or fn.startswith('_tmp_'):
            continue
        with open(full, 'rb') as f:
            raw = f.read()
        bom = raw.startswith(codecs.BOM_UTF8)
        try:
            text = raw.decode('utf-8-sig')
        except UnicodeDecodeError:
            oddities.append(('not-utf8', rel))
            continue
        m = FM_RE.match(text)
        if not m:
            continue
        fm = m.group(2)
        body = text[m.end():]
        crlf = text.count('\r\n')
        eol = '\r\n' if crlf * 2 >= text.count('\n') else '\n'

        new_fm = fm
        n1 = len(re.findall(r'^related_to(\s*:)', new_fm, re.M))
        new_fm = re.sub(r'^related_to(\s*:)', r'belongs_to\1', new_fm, flags=re.M)
        n2 = len(re.findall(r'^relatedTo(\s*:)', new_fm, re.M))
        new_fm = re.sub(r'^relatedTo(\s*:)', r'belongs_to:', new_fm, flags=re.M)
        file_converted = n1 + n2

        # H1 for alias
        h1 = None
        for line in body.splitlines():
            s = line.strip()
            if s.startswith('# '):
                h1 = s[2:].strip()
                break
        alias_added = False
        if h1:
            title = LINKTEXT.sub(r'\1', h1).strip().strip('#').strip()
            stem = os.path.splitext(fn)[0]
            has_aliases = re.search(r'^aliases\s*:', new_fm, re.M)
            if title and title.lower() != stem.lower() and not has_aliases:
                esc = title.replace('\\', '\\\\').replace('"', '\\"')
                new_fm = new_fm + eol + 'aliases:' + eol + '  - "' + esc + '"'
                alias_added = True

        if file_converted or alias_added:
            out = m.group(1) + new_fm + m.group(3) + body
            data = out.encode('utf-8')
            if bom:
                data = codecs.BOM_UTF8 + data
            with open(full, 'wb') as f:
                f.write(data)
            changed_files += 1
            converted += file_converted
            aliased += 1 if alias_added else 0

print('files changed:', changed_files)
print('related_to -> belongs_to edges:', converted)
print('aliases added:', aliased)
for o in oddities:
    print('ODD:', o)
