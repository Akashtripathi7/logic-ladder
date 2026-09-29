"""Build the single-page DSA path app (Python edition) and verify every code sample by running it."""
import contextlib, html, io, json, pathlib, re, sys, traceback

D = pathlib.Path(__file__).parent
KEYS = ['title', 'lc', 'nc', 'diff', 'pattern', 'problem', 'example', 'analogy', 'ask', 'hints', 'brute', 'brutecx',
        'signal', 'optimal', 'cx', 'code', 'test', 'trace', 'mistakes', 'hinglish']
KEY_RE = re.compile(r'^(' + '|'.join(KEYS) + r'):\s?(.*)$')
LISTS = {'ask', 'hints', 'optimal', 'mistakes'}
RAW = {'code', 'test', 'trace', 'example', 'hinglish'}
ERRORS = []


def inline(s):
    s = html.escape(s.strip(), quote=False)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<b>\1</b>', s)
    s = re.sub(r'(?<![*\w])\*([^*\n]+)\*(?![*\w])', r'<i>\1</i>', s)
    return s


def md(text):
    """Tiny markdown: ### headings, paragraphs, - bullets, 1. lists, ```code```, > callouts, | tables |."""
    out, lines, i = [], text.strip('\n').split('\n'), 0
    para = []

    def flush():
        if para:
            out.append('<p>' + inline(' '.join(para)) + '</p>')
            para.clear()
    while i < len(lines):
        ln = lines[i]
        s = ln.strip()
        if s.startswith('```'):
            flush()
            j = i + 1
            code = []
            while j < len(lines) and not lines[j].strip().startswith('```'):
                code.append(lines[j])
                j += 1
            out.append('<div class="mdcode" data-code="' + html.escape('\n'.join(code), quote=True) + '"></div>')
            i = j + 1
            continue
        if not s:
            flush(); i += 1; continue
        m = re.match(r'^(#{2,4})\s+(.*)$', s)
        if m:
            flush()
            lvl = {2: 'h3', 3: 'h3', 4: 'h4'}[len(m.group(1))]
            out.append(f'<{lvl}>{inline(m.group(2))}</{lvl}>')
            i += 1; continue
        if s.startswith('> '):
            flush()
            box = []
            while i < len(lines) and lines[i].strip().startswith('>'):
                box.append(lines[i].strip()[1:].strip())
                i += 1
            first = box[0]
            kind = 'note'
            km = re.match(r'^\*\*(Analogy|Tip|Remember|Mistake|Why|Hinglish|Yaad rakho|Galti|Socho|Example|Think)[^*]*\*\*', first)
            if km:
                kind = {'Analogy': 'analogy', 'Tip': 'tip', 'Remember': 'tip', 'Yaad rakho': 'tip', 'Mistake': 'mistake', 'Galti': 'mistake'}.get(km.group(1), 'note')
            out.append(f'<div class="callout {kind}">' + ''.join('<p>' + inline(b) + '</p>' for b in box if b) + '</div>')
            continue
        if s.startswith('|'):
            flush()
            rows = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                cells = [c.strip() for c in lines[i].strip().strip('|').split('|')]
                if not all(re.match(r'^:?-{2,}:?$', c) for c in cells):
                    rows.append(cells)
                i += 1
            h = '<div class="tscroll"><table class="mdt"><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in rows[0]) + '</tr></thead><tbody>'
            h += ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in rows[1:]) + '</tbody></table></div>'
            out.append(h)
            continue
        if re.match(r'^(- |\d+\. )', s):
            flush()
            ordered = bool(re.match(r'^\d+\. ', s))
            items = []
            while i < len(lines) and re.match(r'^\s*(- |\d+\. )', lines[i]):
                items.append(re.sub(r'^\s*(- |\d+\. )', '', lines[i]))
                i += 1
                while i < len(lines) and lines[i].startswith('  ') and lines[i].strip() and not re.match(r'^\s*(- |\d+\. )', lines[i]):
                    items[-1] += ' ' + lines[i].strip()
                    i += 1
            tag = 'ol' if ordered else 'ul'
            out.append(f'<{tag}>' + ''.join(f'<li>{inline(x)}</li>' for x in items) + f'</{tag}>')
            continue
        para.append(s)
        i += 1
    flush()
    return ''.join(out)


# ---------------------------------------------------------------- problems
def parse_problems(path):
    topics, cur_topic, prob, field = [], None, None, None
    probs = {}

    def close():
        if prob is None:
            return
        p = prob
        for k in list(p):
            v = p[k]
            if isinstance(v, list) and k not in RAW:
                txt = '\n'.join(v).strip()
                if k in LISTS:
                    items, buf = [], []
                    for line in v:
                        if line.startswith('- '):
                            if buf:
                                items.append(' '.join(buf))
                            buf = [line[2:]]
                        elif line.strip():
                            buf.append(line.strip())
                    if buf:
                        items.append(' '.join(buf))
                    p[k] = [inline(x) for x in items]
                elif k in ('title', 'diff', 'lc', 'nc', 'brutecx', 'cx', 'pattern'):
                    p[k] = txt
                else:
                    p[k] = '<p>' + '</p><p>'.join(inline(x) for x in re.split(r'\n\s*\n', txt)) + '</p>'
            elif isinstance(v, list):
                p[k] = '\n'.join(v).strip('\n')
        if 'trace' in p and p['trace'].strip():
            rows = [[c.strip() for c in r.split(' | ')] for r in p['trace'].strip().split('\n') if r.strip()]
            p['trace'] = {'cols': rows[0], 'rows': rows[1:]}
        else:
            p.pop('trace', None)
        if 'hinglish' in p:
            p['hinglish'] = md(p['hinglish'])
        if 'lc' in p:
            num, _, slug = p['lc'].partition(' ')
            p['lcnum'], p['slug'] = num, slug.strip()
        missing = [k for k in ('title', 'diff', 'problem', 'hints', 'optimal', 'code', 'cx', 'analogy', 'hinglish') if k not in p]
        if missing:
            ERRORS.append(f'MISSING {p["id"]}: {missing}')
        probs[p['id']] = p
        cur_topic['problems'].append(p['id'])

    for raw in path.read_text().split('\n'):
        if raw.startswith('## topic:'):
            close(); prob = None
            tid, _, name = raw[9:].strip().partition('|')
            cur_topic = {'id': tid.strip(), 'name': name.strip(), 'problems': []}
            topics.append(cur_topic)
            continue
        if raw.startswith('### '):
            close()
            prob = {'id': raw[4:].strip()}
            field = None
            continue
        if prob is None:
            continue
        m = KEY_RE.match(raw)
        if m and not (field in ('code', 'test', 'hinglish') and m.group(1) not in KEYS):
            field = m.group(1)
            prob[field] = [m.group(2)] if m.group(2) else []
            continue
        if field:
            prob[field].append(raw)
    close()
    return topics, probs


# ---------------------------------------------------------------- modules (python course + logic gym)
DKEYS = ['q', 'kind', 'code', 'answer', 'test', 'en', 'hi']
DKEY_RE = re.compile(r'^(' + '|'.join(DKEYS) + r'):\s?(.*)$')


def parse_modules(path, kind):
    mods = []
    cur, sec, drill, dfield = None, None, None, None
    for raw in path.read_text().split('\n'):
        if raw.startswith('## module:'):
            mid, _, name = raw[10:].strip().partition('|')
            cur = {'id': mid.strip(), 'name': name.strip(), 'kind': kind, 'summary': '', 'en': [], 'hi': [], 'drills': []}
            mods.append(cur); sec = None; drill = None
            continue
        if cur is None:
            continue
        if raw.startswith('summary:') and sec is None:
            cur['summary'] = raw[8:].strip(); continue
        if raw.startswith('=== '):
            sec = raw[4:].strip(); drill = None; continue
        if sec in ('en', 'hi'):
            cur[sec].append(raw); continue
        if sec == 'drills':
            if raw.startswith('--- '):
                drill = {'kind': 'predict'}
                cur['drills'].append(drill); dfield = None
                continue
            if drill is None:
                continue
            m = DKEY_RE.match(raw)
            if m and not (dfield in ('code', 'answer', 'test') and raw.startswith(' ')):
                dfield = m.group(1)
                drill[dfield] = [m.group(2)] if m.group(2) else []
                continue
            if dfield:
                drill[dfield].append(raw)
    for m in mods:
        m['en'] = md('\n'.join(m['en']))
        m['hi'] = md('\n'.join(m['hi']))
        for d in m['drills']:
            for k, v in list(d.items()):
                if isinstance(v, list):
                    d[k] = '\n'.join(v).strip('\n')
            d['kind'] = d['kind'].strip()
            d['qh'] = inline(d.get('q', ''))
            d['enh'] = inline(d.get('en', ''))
            d['hih'] = inline(d.get('hi', ''))
    return mods


# ---------------------------------------------------------------- verification
PRELUDE = (D / 'prelude.py').read_text()


def run_code(code, test=''):
    ns = {}
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        exec(PRELUDE, ns)
        exec(code, ns)
        if test:
            exec(test, ns)
    return buf.getvalue(), ns


def verify(probs, mods):
    checks = 0
    for pid, p in probs.items():
        try:
            _, ns = run_code(p['code'], p.get('test', ''))
            checks += ns['_state']['checks']
            for f in ns['_state']['fails']:
                ERRORS.append(f'FAIL {pid}: {f}')
        except Exception:
            ERRORS.append(f'ERROR {pid}: ' + traceback.format_exc().strip().split('\n')[-1])
    for m in mods:
        for k, d in enumerate(m['drills']):
            tag = f"{m['id']}#{k + 1}"
            try:
                if d['kind'] == 'predict':
                    out, _ = run_code(d.get('code', ''))
                    checks += 1
                    if out.rstrip() != d.get('answer', '').rstrip():
                        ERRORS.append(f'DRILL {tag}: printed {out.rstrip()!r} but answer says {d.get("answer", "").rstrip()!r}')
                elif d['kind'] in ('write', 'fix'):
                    _, ns = run_code(d.get('answer', ''), d.get('test', ''))
                    checks += ns['_state']['checks']
                    for f in ns['_state']['fails']:
                        ERRORS.append(f'DRILL {tag}: {f}')
            except Exception:
                ERRORS.append(f'DRILL ERROR {tag}: ' + traceback.format_exc().strip().split('\n')[-1])
    return checks


def main():
    topics, probs = [], {}
    extra = {}
    tf = D / 'traces.txt'
    if tf.exists():
        cur = None
        for line in tf.read_text().split('\n'):
            if line.startswith('### '):
                cur = line[4:].strip(); extra[cur] = []
            elif cur and line.strip():
                extra[cur].append(line)
    for f in sorted(D.glob('problems/*.txt')):
        t, p = parse_problems(f)
        topics += t
        dup = set(p) & set(probs)
        if dup:
            ERRORS.append(f'DUPLICATE {dup}')
        probs.update(p)
    for pid, lines in extra.items():
        if pid in probs and 'trace' not in probs[pid]:
            rows = [[c.strip() for c in r.split(' | ')] for r in lines]
            probs[pid]['trace'] = {'cols': rows[0], 'rows': rows[1:]}
    for p in probs.values():
        tr = p.get('trace')
        if tr:
            n = len(tr['cols'])
            tr['rows'] = [(r + [''] * n)[:n] if len(r) < n else r for r in tr['rows']]
    mods = []
    for f in sorted(D.glob('pycourse/*.txt')):
        mods += parse_modules(f, 'python')
    for f in sorted(D.glob('gym/*.txt')):
        mods += parse_modules(f, 'gym')
    checks = verify(probs, mods)
    for p in probs.values():
        p.pop('test', None)
        p.pop('nc', None)
    for m in mods:
        for d in m['drills']:
            d.pop('test', None)
    data = {'topics': topics, 'problems': probs, 'modules': mods}
    n_w = sum(len(t['problems']) for t in topics if t['id'].startswith('w-'))
    n_n = sum(len(t['problems']) for t in topics if not t['id'].startswith('w-'))
    print(f'topics {len(topics)}  warmup {n_w}  dsa150 {n_n}  modules {len(mods)}  drills {sum(len(m["drills"]) for m in mods)}  checks {checks}')
    for e in ERRORS:
        print(e)
    shell = (D / 'shell.html').read_text()
    js = [(D / f).read_text() for f in ('engine.js',)]
    js += [f.read_text() for f in sorted(D.glob('lessons/*.js'))]
    js.append((D / 'app.js').read_text())
    out = (shell.replace('{{CSS}}', (D / 'style.css').read_text() + (D / 'app.css').read_text())
           .replace('{{DATA}}', json.dumps(data, ensure_ascii=False).replace('</', '<\\/'))
           .replace('{{JS}}', '\n;\n'.join(js)))
    (D / 'index.html').write_text(out)
    print('page', len(out), 'errors', len(ERRORS))


main()
