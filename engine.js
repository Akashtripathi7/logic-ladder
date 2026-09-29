/* Lesson engine: animated stage components + a narrated, seekable "video" player. */
(function () {
'use strict';
const W = 1280, H = 720;
let INSTANT = false;

function el(tag, cls, html, parent) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (parent) parent.appendChild(e);
  return e;
}
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function flash(e) { if (!e || INSTANT) return; e.classList.remove('flash'); void e.offsetWidth; e.classList.add('flash'); }

const timers = new Set();
function later(fn, ms) { const t = setTimeout(() => { timers.delete(t); fn(); }, Math.max(0, ms)); timers.add(t); return t; }
function clearTimers() { timers.forEach(t => { clearTimeout(t); clearInterval(t); }); timers.clear(); }

/* ---------- layout ---------- */
function lay(kind, p, fr, o = {}) {
  const r = el('div', 'lay ' + kind, null, p);
  if (o.gap != null) r.style.gap = o.gap + 'px';
  if (o.align) r.style.alignItems = o.align;
  return (fr || [1]).map((f, i) => {
    const c = el('div', 'lc' + (o.center ? ' center' : '') + (o.mid ? ' mid' : ''), null, r);
    c.style.flex = typeof f === 'number' ? `${f} 1 0` : f;
    return c;
  });
}
const row = (p, fr, o) => lay('row', p, fr, o);
const col = (p, fr, o) => lay('col', p, fr, o);

/* ---------- syntax highlight (Python) ---------- */
const KW = /^(def|return|if|elif|else|for|while|in|not|and|or|is|True|False|None|class|import|from|as|break|continue|pass|lambda|try|except|finally|raise|with|yield|global|nonlocal|del|assert|async|await|match|case)$/;
const TY = /^(print|len|range|int|str|float|list|dict|set|tuple|bool|input|sum|min|max|sorted|enumerate|zip|abs|map|filter|type|ord|chr|reversed|any|all|isinstance|open|round|pow|divmod|iter|next|self|super|object|frozenset|deque|Counter|defaultdict|heapq|bisect|math|ListNode|TreeNode|Node)$/;
function hlStr(s) {
  const isF = /^[fF]/.test(s);
  const t = esc(s);
  return isF ? t.replace(/\{[^}]*\}/g, m => `<span class="ip">${m}</span>`) : t;
}
function hl(line) {
  const re = /(#.*$)|([rRbBfF]?(?:'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"))|(\b\d+(?:\.\d+)?\b)|(@[A-Za-z_]\w*)|([A-Za-z_]\w*)/g;
  let out = '', last = 0, m;
  while ((m = re.exec(line))) {
    out += esc(line.slice(last, m.index));
    if (m[1]) out += `<span class="cm">${esc(m[1])}</span>`;
    else if (m[2]) out += `<span class="str">${hlStr(m[2])}</span>`;
    else if (m[3]) out += `<span class="n">${m[3]}</span>`;
    else if (m[4]) out += `<span class="k">${esc(m[4])}</span>`;
    else {
      const w = m[5];
      if (KW.test(w)) out += `<span class="k">${w}</span>`;
      else if (TY.test(w)) out += `<span class="t">${w}</span>`;
      else if (/^\s*\(/.test(line.slice(m.index + w.length))) out += `<span class="fn">${w}</span>`;
      else out += w;
    }
    last = re.lastIndex;
  }
  return out + esc(line.slice(last));
}

/* ---------- language (en | hi = Hinglish) ---------- */
let LANG = 'en';
try { LANG = localStorage.getItem('dsa:lang') === 'hi' ? 'hi' : 'en'; } catch (e) {}
const T = (en, hi) => ({ en, hi });
const say = s => typeof s === 'string' ? s : (s[LANG] || s.en);
const UI = {
  en: { think: 'Pause &amp; think', thinkSub: 'Try it yourself first. Press → to skip.', start: 'Press play to start. The narrator speaks each step, and the captions here follow along.', sound: "Turn your sound on. Narration uses your browser's built-in voice, and captions are always shown below the video.", resume: 'Resume at', done: 'Lesson complete. Great work!', again: 'Watch from the start', play: 'Play', pause: 'Pause' },
  hi: { think: 'Ruko aur socho', thinkSub: 'Pehle khud try karo. Skip karne ke liye → dabao.', start: 'Play dabao. Narrator har step bolega, aur neeche captions saath chalenge.', sound: 'Sound on karo. Awaaz browser ki built-in voice hai (Indian English voice sabse achhi rahegi), aur captions hamesha neeche dikhenge.', resume: 'Yahan se continue karo:', done: 'Lesson complete. Bahut badhiya!', again: 'Shuru se dekho', play: 'Play', pause: 'Pause' }
};

/* ---------- components ---------- */
function Txt(p, html, cls) { const e = el('div', 'cmp txt ' + (cls || ''), html, p); return { el: e, set(h) { e.innerHTML = h; flash(e); } }; }
function Hd(p, html) { const e = el('div', 'cmp hd', html, p); return { el: e, set(h) { e.innerHTML = h; } }; }
function Big(p, html, o = {}) {
  const e = el('div', 'cmp big', html, p);
  if (o.size) e.style.fontSize = o.size + 'px';
  return { el: e, set(h) { e.innerHTML = h; if (!INSTANT) { e.style.animation = 'none'; void e.offsetWidth; e.style.animation = ''; } } };
}
function Pic(p, html, size) { const e = el('div', 'cmp pic', html, p); if (size) e.style.fontSize = size + 'px'; return { el: e, set(h) { e.innerHTML = h; } }; }
function Tag(p, html, c = 'y') { const e = el('span', 'cmp tag ' + c, html, p); return { el: e }; }
function Title(p, lv, title, sub) {
  const e = el('div', 'tcard', null, p);
  if (lv) el('div', 'lv cmp', lv, e);
  el('h2', 'cmp', title, e);
  el('div', 'rule', null, e);
  if (sub) el('div', 'sub cmp', sub, e);
  return { el: e };
}
function Card(p, o) {
  const e = el('div', 'cmp card c-' + (o.c || 's'), null, p);
  if (o.icon) el('div', 'ic', o.icon, e);
  const b = el('div', null, null, e);
  if (o.title) el('div', 'ct', o.title, b);
  if (o.body) el('div', 'cb', o.body, b);
  return { el: e };
}
function Bul(p, items, o = {}) {
  const ul = el('ul', 'cmp bul' + (o.num ? ' num' : '') + (o.sm ? ' sm' : ''), null, p);
  const lis = items.map((t, i) => {
    const li = el('li', o.shown ? '' : 'hid', null, ul);
    li.innerHTML = (o.num ? `<b class="bn">${i + 1}</b>` : '<b class="bd"></b>') + `<span>${t}</span>`;
    return li;
  });
  let k = o.shown ? items.length : 0;
  const api = {
    el: ul, lis,
    show(i) { lis[i].classList.remove('hid'); k = Math.max(k, i + 1); },
    next() { if (k < lis.length) api.show(k); },
    all() { lis.forEach((_, i) => api.show(i)); },
    hl(i) { lis.forEach((l, j) => l.classList.toggle('on', j === i)); },
    ok(i) { lis[i].classList.add('ok'); }
  };
  return api;
}
function Code(p, src, o = {}) {
  const box = el('div', 'cmp code', null, p);
  el('div', 'code-t', esc(o.title || 'main.py'), box);
  const body = el('div', 'code-b', null, box);
  if (o.size) box.style.fontSize = o.size + 'px';
  const lines = src.replace(/^\n/, '').replace(/\s+$/, '').split('\n').map((l, i) => {
    const L = el('div', 'ln' + (o.hidden ? ' hid' : ''), null, body);
    el('span', 'no', String(i + 1), L);
    el('span', 'tx', hl(l) || ' ', L);
    return L;
  });
  const api = {
    el: box, lines,
    hl(...ns) { ns = ns.flat(); lines.forEach((L, i) => L.classList.toggle('on', ns.includes(i + 1))); },
    reveal(k) { lines.forEach((L, i) => L.classList.toggle('hid', i >= k)); },
    note(n, txt, c = 'y') { const L = lines[n - 1]; L.querySelectorAll('.cnote').forEach(x => x.remove()); el('span', 'cnote c-' + c, null, L).textContent = txt; },
    unnote(n) { (n ? [lines[n - 1]] : lines).forEach(L => L.querySelectorAll('.cnote').forEach(x => x.remove())); }
  };
  return api;
}
function Out(p, o = {}) {
  const box = el('div', 'cmp out', null, p);
  el('div', 'out-t', o.title || 'Output', box);
  const b = el('div', 'out-b', null, box);
  if (o.h) b.style.height = o.h + 'px';
  let cur = null;
  const api = {
    el: box,
    p(t) { cur = null; const l = el('div', 'ol', null, b); l.textContent = t === '' ? ' ' : t; b.scrollTop = 1e9; },
    w(t) { if (!cur) cur = el('div', 'ol', '', b); cur.textContent += t; b.scrollTop = 1e9; },
    nl() { if (!cur) el('div', 'ol', ' ', b); cur = null; },
    clear() { b.innerHTML = ''; cur = null; }
  };
  return api;
}
function Vars(p, o = {}) {
  const box = el('div', 'cmp vars', null, p);
  el('div', 'panel-t', o.title || 'Memory (variables)', box);
  const b = el('div', 'vars-b', null, box);
  const m = {};
  return {
    el: box,
    set(n, v, t, c) {
      let x = m[n];
      if (!x) { x = m[n] = el('div', 'vbox', `<div class="vn">${esc(n)}</div><div class="vv"></div><div class="vt"></div>`, b); }
      x.querySelector('.vv').textContent = v;
      x.querySelector('.vt').textContent = t || '';
      x.className = 'vbox' + (c ? ' c-' + c : '');
      flash(x);
    },
    del(n) { if (m[n]) { m[n].remove(); delete m[n]; } }
  };
}
function Arr(p, vals, o = {}) {
  const box = el('div', 'cmp arr', null, p);
  const cw = o.w || 70, gap = 8;
  box.style.setProperty('--cw', cw + 'px');
  if (o.label) el('div', 'arr-l', o.label, box);
  const wrap = el('div', 'arr-w', null, box);
  const rw = el('div', 'arr-r', null, wrap);
  const pl = el('div', 'arr-p', null, wrap);
  const cells = [], ptrs = {};
  let np = 0;
  function mk(v) {
    const c = el('div', 'ac', `<div class="av"></div>` + (o.noIdx ? '' : `<div class="ai">${cells.length}</div>`), rw);
    c.querySelector('.av').textContent = v;
    cells.push(c);
    return c;
  }
  vals.forEach(mk);
  const X = i => i * (cw + gap) + cw / 2;
  const each = (i, f) => [].concat(i).forEach(j => cells[j] && f(cells[j], j));
  const api = {
    el: box, cells,
    hl(i, c = 'y') { each(i, x => { x.className = 'ac c-' + c; }); },
    un(i) { each(i, x => { x.className = 'ac'; }); },
    clear() { cells.forEach(x => { x.className = 'ac'; }); },
    dim(i) { each(i, x => x.classList.add('dim')); },
    set(i, v) { cells[i].querySelector('.av').textContent = v; flash(cells[i]); },
    get(i) { return cells[i].querySelector('.av').textContent; },
    swap(i, j) { const a = api.get(i), b = api.get(j); api.set(i, b); api.set(j, a); },
    push(v) { flash(mk(v)); },
    pop() { const c = cells.pop(); if (c) c.remove(); },
    ptr(name, i, c = 's') {
      let q = ptrs[name];
      if (!q) {
        q = ptrs[name] = el('div', 'ptr c-' + c, `<span class="pa">▲</span><span class="pn">${esc(name)}</span>`, pl);
        q.style.top = (6 + np * 44) + 'px';
        np++;
        pl.style.height = (np * 44 + 8) + 'px';
      }
      q.hidden = false;
      q.style.left = X(i) + 'px';
    },
    noPtr(name) { if (ptrs[name]) ptrs[name].hidden = true; }
  };
  return api;
}
function Trace(p, cols, o = {}) {
  const box = el('div', 'cmp trace', null, p);
  if (o.title) el('div', 'panel-t', o.title, box);
  const sc = el('div', 'tr-s', null, box);
  if (o.h) sc.style.maxHeight = o.h + 'px';
  const t = el('table', null, null, sc);
  const hr = el('tr', null, null, el('thead', null, null, t));
  cols.forEach(c => el('th', null, esc(c), hr));
  const tb = el('tbody', null, null, t);
  return {
    el: box,
    row(vals, cls) {
      tb.querySelectorAll('tr.cur').forEach(r => r.classList.remove('cur'));
      const r = el('tr', 'cur ' + (cls || ''), null, tb);
      vals.forEach(v => el('td', null, esc(v), r));
      sc.scrollTop = 1e9;
      return r;
    },
    clear() { tb.innerHTML = ''; }
  };
}
function Tbl(p, head, rows, o = {}) {
  const t = el('table', 'cmp tbl', null, p);
  const hr = el('tr', null, null, el('thead', null, null, t));
  head.forEach(h => el('th', null, h, hr));
  const tb = el('tbody', null, null, t);
  const trs = rows.map(r => { const tr = el('tr', o.hidden ? 'hid' : '', null, tb); r.forEach((c, i) => el('td', (o.mono || []).includes(i) ? 'mono' : '', String(c), tr)); return tr; });
  let k = o.hidden ? 0 : trs.length;
  const api = {
    el: t, trs,
    show(i) { trs[i].classList.remove('hid'); k = Math.max(k, i + 1); },
    next() { if (k < trs.length) api.show(k); },
    all() { trs.forEach((_, i) => api.show(i)); },
    hl(i) { trs.forEach((r, j) => r.classList.toggle('on', j === i)); }
  };
  return api;
}
const NS = 'http://www.w3.org/2000/svg';
function svgBox(p, cls, w, h) {
  const box = el('div', 'cmp ' + cls, null, p);
  box.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;display:block;margin:0 auto"></svg>`;
  return [box, box.firstChild];
}
function gAdd(parent, markup, cls) {
  const g = document.createElementNS(NS, 'g');
  if (cls) g.setAttribute('class', cls);
  g.innerHTML = markup;
  parent.appendChild(g);
  return g;
}
function NumLine(p, min, max, o = {}) {
  const w = o.w || 1160, h = o.h || 190, pad = 44, y = h - 58, step = o.step || 1;
  const [box, svg] = svgBox(p, 'nl', w, h);
  const X = v => pad + (v - min) / (max - min) * (w - 2 * pad);
  let s = `<line class="nl-ax" x1="${pad - 22}" y1="${y}" x2="${w - pad + 22}" y2="${y}"/>`;
  for (let v = min; v <= max + 1e-9; v += step) {
    const vv = Math.round(v * 100) / 100;
    s += `<line class="nl-tk" x1="${X(vv)}" y1="${y - 9}" x2="${X(vv)}" y2="${y + 9}"/><text class="nl-lb" x="${X(vv)}" y="${y + 38}">${vv}</text>`;
  }
  svg.innerHTML = s;
  const g = gAdd(svg, '', '');
  return {
    el: box,
    mark(v, label, c = 'y') { return gAdd(g, `<circle class="f-${c}" cx="${X(v)}" cy="${y}" r="11"/>` + (label ? `<text class="nl-t f-${c}" x="${X(v)}" y="${y - 24}">${esc(label)}</text>` : ''), 'nl-in'); },
    hop(a, b, label, c = 's', lift = 50) {
      const x1 = X(a), x2 = X(b), mx = (x1 + x2) / 2;
      return gAdd(g, `<path class="nl-hop s-${c}" pathLength="1" d="M${x1} ${y - 8} Q${mx} ${y - 8 - lift * 2} ${x2} ${y - 8}"/>` + (label ? `<text class="nl-t f-${c}" x="${mx}" y="${y - lift - 20}">${esc(label)}</text>` : ''), 'nl-in');
    },
    span(a, b, label, c = 'm', dy = 0) {
      return gAdd(g, `<line class="nl-bar s-${c}" x1="${X(a)}" y1="${y - 26 - dy}" x2="${X(b)}" y2="${y - 26 - dy}"/>` + (label ? `<text class="nl-t f-${c}" x="${(X(a) + X(b)) / 2}" y="${y - 44 - dy}">${esc(label)}</text>` : ''), 'nl-in');
    },
    clear() { g.innerHTML = ''; }
  };
}
function Clock(p, n, o = {}) {
  const S = o.size || 360, c = S / 2, r = S / 2 - 40;
  const [box, svg] = svgBox(p, 'clock', S, S);
  let s = `<circle class="clock-face" cx="${c}" cy="${c}" r="${S / 2 - 6}"/>`;
  for (let k = 0; k < n; k++) {
    const a = (k / n) * 2 * Math.PI - Math.PI / 2;
    s += `<text class="clock-n" data-k="${k}" x="${c + r * Math.cos(a)}" y="${c + r * Math.sin(a)}">${o.labels ? o.labels[k] : k}</text>`;
  }
  s += `<g class="clock-hand" style="transform-origin:${c}px ${c}px"><line x1="${c}" y1="${c}" x2="${c}" y2="${c - r + 30}"/></g><circle cx="${c}" cy="${c}" r="9" class="f-c"/><text class="clock-c" x="${c}" y="${c + 58}"></text>`;
  svg.innerHTML = s;
  const hand = svg.querySelector('.clock-hand'), ct = svg.querySelector('.clock-c'), nums = [...svg.querySelectorAll('.clock-n')];
  const api = {
    el: box,
    to(k, label) {
      hand.style.transform = `rotate(${(k * 360) / n}deg)`;
      nums.forEach((t, i) => t.classList.toggle('on', i === ((k % n) + n) % n));
      ct.textContent = label == null ? '' : label;
    }
  };
  api.to(0, o.label);
  return api;
}
function Dots(p, n, o = {}) {
  const box = el('div', 'cmp dots', null, p);
  box.style.setProperty('--ds', (o.size || 56) + 'px');
  if (o.cols) box.style.gridTemplateColumns = `repeat(${o.cols}, var(--ds))`;
  const items = [];
  for (let i = 0; i < n; i++) items.push(el('div', 'dot', o.icon || (o.nums ? String(i + (o.start || 0)) : ''), box));
  return {
    el: box, items,
    group(size) { const full = Math.floor(n / size) * size; items.forEach((d, i) => { d.className = 'dot' + (i < full ? ' g' + (Math.floor(i / size) % 5) : ' left'); }); },
    hl(idx, c = 'y') { [].concat(idx).forEach(i => items[i] && (items[i].className = 'dot c-' + c)); },
    dim(idx) { [].concat(idx).forEach(i => items[i] && items[i].classList.add('dim')); },
    clear() { items.forEach(d => { d.className = 'dot'; }); }
  };
}
function Grid(p, R, C, o = {}) {
  const box = el('div', 'cmp grid', null, p);
  const gs = o.size || 52;
  box.style.setProperty('--gs', gs + 'px');
  box.style.gridTemplateColumns = `repeat(${C + (o.labels ? 1 : 0)}, var(--gs))`;
  const cells = [];
  if (o.labels) { el('div', 'gc lab', '', box); for (let c = 0; c < C; c++) el('div', 'gc lab', o.colLab ? o.colLab[c] : String(c), box); }
  for (let r = 0; r < R; r++) {
    if (o.labels) el('div', 'gc lab', o.rowLab ? o.rowLab[r] : String(r), box);
    cells.push([]);
    for (let c = 0; c < C; c++) cells[r].push(el('div', 'gc' + (o.ghost ? ' ghost' : ''), o.fill ? o.fill(r, c) : '', box));
  }
  const api = {
    el: box, cells,
    set(r, c, t, cl) { const x = cells[r][c]; x.textContent = t; x.className = 'gc' + (cl ? ' c-' + cl : ''); flash(x); },
    hl(r, c, cl = 'y') { cells[r][c].className = 'gc c-' + cl; },
    un(r, c) { cells[r][c].className = 'gc'; },
    txt(r, c, t) { cells[r][c].textContent = t; },
    clear(keepText) { cells.flat().forEach(x => { x.className = 'gc' + (o.ghost ? ' ghost' : ''); if (!keepText) x.textContent = ''; }); },
    all(f) { cells.forEach((rr, r) => rr.forEach((x, c) => f(x, r, c))); }
  };
  return api;
}
function Chart(p, o = {}) {
  const w = o.w || 700, h = o.h || 470, L = 64, B = 46, T = 16, Rr = o.legend === false ? 20 : 200;
  const xmax = o.xmax || 20, ymax = o.ymax || 100;
  const [box, svg] = svgBox(p, 'chart', w, h);
  const X = x => L + (x / xmax) * (w - L - Rr), Y = y => h - B - (y / ymax) * (h - B - T);
  let s = '';
  for (let i = 1; i <= 4; i++) s += `<line class="gl" x1="${L}" x2="${w - Rr}" y1="${Y(ymax * i / 4)}" y2="${Y(ymax * i / 4)}"/>`;
  s += `<line class="ax" x1="${L}" y1="${h - B}" x2="${w - Rr}" y2="${h - B}"/><line class="ax" x1="${L}" y1="${T}" x2="${L}" y2="${h - B}"/>`;
  s += `<text class="al" x="${(L + w - Rr) / 2}" y="${h - 10}" text-anchor="middle">${esc(o.xl || 'n  (input size)')}</text>`;
  s += `<text class="al" x="18" y="${(T + h - B) / 2}" text-anchor="middle" transform="rotate(-90 18 ${(T + h - B) / 2})">${esc(o.yl || 'steps')}</text>`;
  svg.innerHTML = s;
  const clip = `c${Math.random().toString(36).slice(2)}`;
  gAdd(svg, `<clipPath id="${clip}"><rect x="${L}" y="${T}" width="${w - L - Rr + 4}" height="${h - B - T}"/></clipPath>`);
  let nl = 0;
  return {
    el: box,
    plot(fn, label, c) {
      let d = '', started = false;
      for (let i = 0; i <= 240; i++) {
        const x = (i / 240) * xmax;
        if (x <= 0 && o.skip0) continue;
        let y = fn(x);
        if (!isFinite(y)) continue;
        const yy = Math.min(y, ymax * 1.4);
        d += (started ? 'L' : 'M') + X(x).toFixed(1) + ' ' + Y(yy).toFixed(1) + ' ';
        started = true;
        if (y > ymax * 1.3) break;
      }
      gAdd(svg, `<path class="ln2 s-${c}" clip-path="url(#${clip})" pathLength="1" d="${d}"/>`);
      if (o.legend !== false) {
        const ly = T + 14 + nl * 34;
        gAdd(svg, `<line class="s-${c}" stroke-width="4" x1="${w - Rr + 18}" x2="${w - Rr + 44}" y1="${ly}" y2="${ly}"/><text class="lg f-${c}" x="${w - Rr + 52}" y="${ly + 6}">${esc(label)}</text>`, 'nl-in');
      }
      nl++;
    }
  };
}
function Bits(p, n, o = {}) {
  const box = el('div', 'cmp bits', null, p);
  if (o.label) el('div', 'bits-l', o.label, box);
  const r = el('div', 'bits-r', null, box);
  const bits = [];
  for (let k = n - 1; k >= 0; k--) {
    const b = el('div', 'bit', `<div class="pv">${o.pv === false ? '' : (o.base ? o.base ** k : 2 ** k)}</div><div class="bb">0</div>`, r);
    bits[k] = b;
  }
  const sum = el('div', 'bits-s', '', box);
  const api = {
    el: box,
    set(v, showSum = o.sum) {
      for (let k = 0; k < n; k++) { const on = (v >> k) & 1; bits[k].classList.toggle('on', !!on); bits[k].querySelector('.bb').textContent = on; }
      if (showSum) { const parts = []; for (let k = n - 1; k >= 0; k--) if ((v >> k) & 1) parts.push(2 ** k); sum.innerHTML = (parts.join(' + ') || '0') + ` = <span class="y">${v}</span>`; }
    },
    hl(k) { bits.forEach((b, i) => b.classList.toggle('hl', [].concat(k).includes(i))); },
    note(h) { sum.innerHTML = h; }
  };
  api.set(o.value || 0);
  return api;
}
function KV(p, o = {}) {
  const box = el('div', 'cmp kv', null, p);
  el('div', 'panel-t', o.title || 'Map', box);
  const b = el('div', 'kv-b', null, box);
  const empty = el('div', 'kv-e', o.empty || '{ }  empty', b);
  const rows = {};
  const api = {
    el: box,
    set(k, v) {
      empty.hidden = true;
      let r = rows[k];
      if (!r) r = rows[k] = el('div', 'kvr', `<span class="kk"></span><span class="ka">→</span><span class="vv2"></span>`, b);
      r.querySelector('.kk').textContent = k;
      r.querySelector('.vv2').textContent = v;
      flash(r);
    },
    hl(k) { Object.entries(rows).forEach(([kk, r]) => r.classList.toggle('on', kk === String(k))); },
    del(k) { if (rows[k]) { rows[k].remove(); delete rows[k]; } if (!Object.keys(rows).length) empty.hidden = false; },
    clear() { Object.keys(rows).forEach(api.del); }
  };
  return api;
}
function StackV(p, o = {}) {
  const box = el('div', 'cmp stk', null, p);
  el('div', 'panel-t', o.title || 'Stack', box);
  const b = el('div', 'stk-b' + (o.queue || o.row ? ' q-b' : ''), null, box);
  if (o.h) b.style.minHeight = o.h + 'px';
  const items = [];
  const mark = () => { items.forEach((x, i) => x.classList.toggle('top', o.queue ? i === 0 : i === items.length - 1)); };
  const api = {
    el: box,
    push(v) { const x = el('div', 'stk-i', null, b); x.textContent = v; items.push(x); mark(); },
    pop() {
      const x = o.queue ? items.shift() : items.pop();
      if (!x) return;
      if (INSTANT) x.remove(); else { x.classList.add('out'); later(() => x.remove(), 320); }
      mark();
    },
    clear() { items.splice(0).forEach(x => x.remove()); }
  };
  return api;
}
const QueueV = (p, o = {}) => { const q = StackV(p, Object.assign({ title: 'Queue', queue: true }, o)); return { el: q.el, enq: q.push, deq: q.pop, clear: q.clear }; };
function Think(p, steps, o = {}) {
  const box = el('div', 'cmp think', null, p);
  el('div', 'panel-t', o.title || 'How to think', box);
  const ol = el('ol', null, null, box);
  const lis = steps.map((s, i) => el('li', null, `<b>${i + 1}</b><span>${s}</span>`, ol));
  return { el: box, on(i) { lis.forEach((l, j) => { l.classList.toggle('on', j === i); l.classList.toggle('done', j < i); }); }, done() { lis.forEach(l => { l.classList.remove('on'); l.classList.add('done'); }); } };
}

/* ---------- player ---------- */
const PLAYER_HTML = () => `<div class="layout">
    <section class="player" aria-label="Lesson player">
      <div id="sw">
        <div id="stage">
          <div class="st-head"><span id="chip"></span><span id="chap"></span></div>
          <div id="body"></div>
          <div id="think" hidden>
            <svg viewBox="0 0 74 74"><circle class="tr-bg" cx="37" cy="37" r="30"/><circle class="tr-fg" cx="37" cy="37" r="30"/><text class="tn" x="37" y="38">0</text></svg>
            <div><div class="tl">${UI[LANG].think}</div><div class="ts">${UI[LANG].thinkSub}</div></div>
          </div>
        </div>
        <div id="ov"></div>
      </div>
      <div id="bar" aria-hidden="true"></div>
      <div class="ctrl">
        <button id="ps" type="button" title="Previous scene (J)" aria-label="Previous scene"><svg viewBox="0 0 24 24"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg></button>
        <button id="pb" type="button" title="Previous step (←)" aria-label="Previous step"><svg viewBox="0 0 24 24"><path d="M15.5 5v14L6 12z"/></svg></button>
        <button id="play" type="button" class="pri"></button>
        <button id="nb" type="button" title="Next step (→)" aria-label="Next step"><svg viewBox="0 0 24 24"><path d="M8.5 5v14L18 12z"/></svg></button>
        <button id="ns" type="button" title="Next scene (L)" aria-label="Next scene"><svg viewBox="0 0 24 24"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg></button>
        <span class="time" id="time"></span>
        <span class="sp"></span>
        <select id="rate" aria-label="Speed"><option value="0.7">0.7×</option><option value="0.8">0.8×</option><option value="1">1×</option><option value="1.15">1.15×</option><option value="1.3">1.3×</option><option value="1.5">1.5×</option></select>
        <select id="voice" aria-label="Narrator voice"></select>
        <button id="mute" type="button"></button>
        <button id="fs" type="button" title="Fullscreen (F)" aria-label="Fullscreen"><svg viewBox="0 0 24 24"><path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z"/></svg></button>
      </div>
      <div id="cap" aria-live="polite"></div>
      <div class="keys"><span id="len"></span> · <kbd>Space</kbd> play/pause · <kbd>←</kbd> <kbd>→</kbd> step · <kbd>J</kbd> <kbd>L</kbd> scene · <kbd>F</kbd> fullscreen. Your place is remembered on this device.</div>
    </section>
    <aside class="toc" id="toc" aria-label="Chapters"></aside>
  </div>`;
function start(L, root) {
  /* breathing room after every step; beginner lessons ask for more (L.pause, in ms) */
  const PAUSE = L.pause || 380;
  root.innerHTML = PLAYER_HTML();
  const $ = id => document.getElementById(id);
  const stage = $('stage'), body = $('body'), chip = $('chip'), chap = $('chap'), cap = $('cap'), sw = $('sw');
  const ov = $('ov'), bar = $('bar'), toc = $('toc'), timeEl = $('time'), playBtn = $('play'), thinkEl = $('think');
  const KEY = 'lesson:' + L.id;
  const SC = [];
  L.chapters.forEach((ch, ci) => ch.scenes.forEach(s => { s.ci = ci; s.ch = ch; SC.push(s); }));
  const words = t => t.split(/\s+/).filter(Boolean).length;
  const beatSec = b => {
    const o = b[2] || {};
    const seq = o.seq ? (o.seq.length * (o.gap || 700) + (o.hold || 0)) / 1000 : (o.hold || 0) / 1000;
    return Math.max(words(say(b[0])) / 2.55 + 0.5, seq) + (o.think || 0) + PAUSE / 1000;
  };
  SC.forEach(s => { s.est = s.beats.map(beatSec); s.sec = s.est.reduce((a, b) => a + b, 0); });
  const total = SC.reduce((a, s) => a + s.sec, 0);
  const fmt = t => { t = Math.round(t); const h = Math.floor(t / 3600), m = Math.floor(t / 60) % 60, s = t % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0'); };
  const lenEl = $('len'); if (lenEl) lenEl.textContent = '≈ ' + Math.round(total / 60) + ' min · ' + SC.length + ' scenes'; L.minutes = Math.round(total / 60);

  let si = 0, bi = 0, playing = false, RUN = 0, rate = 1, muted = false, voice = null, seen = 0;
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) { seen = s.seen || 0; } } catch (e) {}
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) {}
  try { const pr = JSON.parse(localStorage.getItem('lesson:prefs') || '{}'); if (pr.rate) rate = pr.rate; if (pr.muted) muted = true; } catch (e) {}

  /* scale stage */
  function fit() {
    const r = sw.getBoundingClientRect();
    const s = Math.min(r.width / W, r.height / H);
    stage.style.transform = `translate(${(r.width - W * s) / 2}px, ${(r.height - H * s) / 2}px) scale(${s})`;
  }
  const ro = new ResizeObserver(fit); ro.observe(sw);
  fit();

  /* TOC + bar */
  const tocBtns = [], segs = [];
  L.chapters.forEach((ch, ci) => {
    el('h3', null, esc(ch.t), toc);
    ch.scenes.forEach(s => {
      const i = SC.indexOf(s);
      const b = el('button', null, `<span class="ck"></span><span>${esc(s.t)}</span><span class="dur">${fmt(s.sec)}</span>`, toc);
      b.type = 'button';
      b.onclick = () => { hideOv(); goto(i, 0, true); };
      tocBtns.push(b);
      const sg = el('div', 'seg' + (s === ch.scenes[0] && ci > 0 ? ' ch' : ''), '<i></i>', bar);
      sg.style.flexGrow = Math.max(1, s.sec);
      sg.title = s.t;
      sg.onclick = () => { hideOv(); goto(i, 0, true); };
      segs.push(sg);
    });
  });

  function ui() {
    if (playing !== ui.was) { ui.was = playing; window.dispatchEvent(new CustomEvent('lessonstate', { detail: playing ? 'play' : 'pause' })); }
    tocBtns.forEach((b, i) => { b.classList.toggle('cur', i === si); b.classList.toggle('seen', i < seen); });
    segs.forEach((sg, i) => { sg.firstChild.style.width = i < si ? '100%' : i > si ? '0%' : ((SC[si].est.slice(0, bi).reduce((a, b) => a + b, 0) / SC[si].sec) * 100) + '%'; });
    const el0 = SC.slice(0, si).reduce((a, s) => a + s.sec, 0) + SC[si].est.slice(0, bi).reduce((a, b) => a + b, 0);
    timeEl.textContent = `${fmt(el0 / rate)} / ${fmt(total / rate)}  ·  scene ${si + 1}/${SC.length}`;
    playBtn.innerHTML = playing ? ICON.pause + '<span>' + UI[LANG].pause + '</span>' : ICON.play + '<span>' + UI[LANG].play + '</span>';
    const cb = tocBtns[si]; if (cb && playing) { const tr = toc.getBoundingClientRect(), br = cb.getBoundingClientRect(); if (br.top < tr.top || br.bottom > tr.bottom) toc.scrollTop += br.top - tr.top - 80; }
  }
  function save() { seen = Math.max(seen, si); try { localStorage.setItem(KEY, JSON.stringify({ si, bi, seen })); } catch (e) {} }
  function savePrefs() { try { const p = JSON.parse(localStorage.getItem('lesson:prefs') || '{}'); p.rate = rate; p.muted = muted; if (voice) p['voice_' + LANG] = voice.name; localStorage.setItem('lesson:prefs', JSON.stringify(p)); } catch (e) {} }

  function build(i) {
    const s = SC[i];
    body.innerHTML = '';
    body.classList.remove('enter');
    if (!INSTANT) { void body.offsetWidth; body.classList.add('enter'); }
    chip.textContent = s.t;
    chap.textContent = s.ch.t;
    s.o = (s.setup && s.setup(body)) || {};
  }
  function runBeat(s, b, instant) {
    const o = b[2] || {};
    try { b[1] && b[1](s.o, body); } catch (e) { console.error(e); }
    if (instant) (o.seq || []).forEach(f => { try { f(s.o, body); } catch (e) { console.error(e); } });
  }
  function replay(i, upto) {
    INSTANT = true; stage.classList.add('instant');
    build(i);
    for (let k = 0; k < upto; k++) runBeat(SC[i], SC[i].beats[k], true);
    INSTANT = false;
    requestAnimationFrame(() => requestAnimationFrame(() => stage.classList.remove('instant')));
  }

  /* speech */
  const synth = window.speechSynthesis;
  let utt = null;
  function pickVoice() {
    if (!synth) return;
    const vs = synth.getVoices().filter(v => /^(en|hi)(-|_|$)/i.test(v.lang));
    const sel = $('voice');
    if (sel && vs.length && sel.options.length !== vs.length) {
      sel.innerHTML = '';
      vs.forEach((v, i) => { const op = el('option', null, esc(v.name.replace(/\s*\(.*\)/, '') + ' · ' + v.lang), sel); op.value = i; });
    }
    let want = null; try { want = JSON.parse(localStorage.getItem('lesson:prefs') || '{}')['voice_' + LANG]; } catch (e) {}
    const pref = LANG === 'hi'
      ? [/Rishi/, /Veena/, /Google.*India/i, /English.*India/i, /Heera/, /Ravi/, /Neerja/, /Prabhat/, /Lekha/, /Google हिन्दी/, /Hindi/i]
      : [/Google US English/, /Samantha/, /Ava/, /Allison/, /Aria/, /Jenny/, /Natural/, /Daniel/, /Google UK English Female/, /Karen/, /Moira/, /Rishi/];
    voice = (want && vs.find(v => v.name === want)) || null;
    if (!voice) for (const re of pref) { voice = vs.find(v => re.test(v.name)); if (voice) break; }
    if (!voice && LANG === 'hi') voice = vs.find(v => /-IN$/i.test(v.lang)) || null;
    if (!voice) voice = vs.find(v => v.default && /^en/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || vs[0] || null;
    if (sel && voice) sel.value = vs.indexOf(voice);
    if (sel) sel.onchange = () => { voice = vs[+sel.value]; savePrefs(); };
  }
  if (synth) { pickVoice(); synth.onvoiceschanged = pickVoice; }
  function speak(text, my) {
    return new Promise(res => {
      const est = (words(text) / 2.55 + 0.5) * 1000 / rate;
      if (muted || !synth || !voice) { later(res, est); return; }
      let done = false;
      const fin = () => { if (!done) { done = true; res(); } };
      try {
        utt = new SpeechSynthesisUtterance(text.replace(/·/g, ','));
        utt.voice = voice; utt.lang = voice.lang; utt.rate = rate;
        utt.onend = fin; utt.onerror = fin;
        synth.speak(utt);
        later(fin, est * 2.2 + 4000);
      } catch (e) { later(fin, est); }
    });
  }
  function think(sec, my) {
    return new Promise(res => {
      thinkEl.hidden = false;
      const fg = thinkEl.querySelector('.tr-fg'), tn = thinkEl.querySelector('.tn');
      const C = 2 * Math.PI * 30; fg.style.strokeDasharray = C;
      let left = sec;
      const tick = () => { tn.textContent = left; fg.style.strokeDashoffset = C * (1 - left / sec); };
      tick();
      const step = () => { if (my !== RUN) return; left--; if (left <= 0) { thinkEl.hidden = true; res(); return; } tick(); later(step, 1000); };
      later(step, 1000);
    });
  }

  async function play(my) {
    while (my === RUN) {
      const s = SC[si], b = s.beats[bi], o = b[2] || {};
      cap.textContent = say(b[0]);
      save(); ui();
      runBeat(s, b, false);
      const gap = (o.gap || 700) / rate;
      const seqP = new Promise(r => {
        (o.seq || []).forEach((f, k) => later(() => { if (my === RUN) { try { f(s.o, body); } catch (e) { console.error(e); } } }, 250 + k * gap));
        later(r, (o.seq || []).length * gap + (o.hold || 0) / rate);
      });
      await Promise.all([speak(say(b[0]), my), seqP]);
      if (my !== RUN) return;
      if (o.think) { await think(o.think, my); if (my !== RUN) return; }
      await new Promise(r => later(r, PAUSE / rate));
      if (my !== RUN) return;
      bi++;
      if (bi >= s.beats.length) {
        si++; bi = 0;
        if (si >= SC.length) { si = SC.length - 1; bi = SC[si].beats.length - 1; seen = SC.length; save(); stop(); ending(); return; }
        build(si);
      }
    }
  }
  function stop() { RUN++; clearTimers(); thinkEl.hidden = true; if (synth) synth.cancel(); playing = false; ui(); }
  function goto(i, b, autoplay) {
    stop();
    si = Math.max(0, Math.min(SC.length - 1, i));
    bi = Math.max(0, Math.min(SC[si].beats.length - 1, b));
    replay(si, autoplay ? bi : bi + 1);
    cap.textContent = say(SC[si].beats[bi][0]);
    save();
    if (autoplay) { playing = true; ui(); const my = ++RUN; setTimeout(() => { if (my === RUN) play(my); }, synth && !muted ? 120 : 0); }
    else ui();
  }
  function toggle() { hideOv(); if (playing) { stop(); } else goto(si, bi, true); }
  function stepBeat(d) {
    let i = si, b = bi + d;
    if (b < 0) { i--; if (i < 0) { i = 0; b = 0; } else b = SC[i].beats.length - 1; }
    else if (b >= SC[si].beats.length) { i++; b = 0; if (i >= SC.length) { i = SC.length - 1; b = SC[i].beats.length - 1; } }
    hideOv(); goto(i, b, playing);
  }
  function stepScene(d) { hideOv(); goto(si + d, 0, playing); }

  function hideOv() { ov.hidden = true; }
  function ending() {
    ov.hidden = false;
    window.dispatchEvent(new CustomEvent('lessonstate', { detail: 'done' }));
    ov.innerHTML = `<div class="ov-t">${UI[LANG].done}</div><div class="ov-s">${esc(say(L.outro || ''))}</div><button class="ov-alt" type="button" id="again">${UI[LANG].again}</button>`;
    $('again').onclick = () => { hideOv(); goto(0, 0, true); };
  }

  const ICON = {
    play: '<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'
  };
  playBtn.onclick = toggle;
  $('pb').onclick = () => stepBeat(-1);
  $('nb').onclick = () => stepBeat(1);
  $('ps').onclick = () => stepScene(-1);
  $('ns').onclick = () => stepScene(1);
  const rs = $('rate');
  rs.value = String(rate);
  rs.onchange = () => { rate = +rs.value; savePrefs(); if (playing) goto(si, bi, true); else ui(); };
  const mb = $('mute');
  const mui = () => { mb.textContent = muted ? 'Voice: off' : 'Voice: on'; mb.setAttribute('aria-pressed', String(!muted)); };
  mui();
  mb.onclick = () => { muted = !muted; mui(); savePrefs(); if (playing) goto(si, bi, true); };
  $('fs').onclick = () => { try { if (document.fullscreenElement) document.exitFullscreen(); else sw.requestFullscreen().catch(() => {}); } catch (e) {} };
  const onKey = e => {
    if (/INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === ' ' || e.key === 'k') { e.preventDefault(); toggle(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); stepBeat(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); stepBeat(-1); }
    else if (e.key === 'l' || e.key === 'ArrowDown') { e.preventDefault(); stepScene(1); }
    else if (e.key === 'j' || e.key === 'ArrowUp') { e.preventDefault(); stepScene(-1); }
    else if (e.key === 'f') { $('fs').click(); }
  };
  document.addEventListener('keydown', onKey);

  /* start screen */
  const resumeAt = saved && (saved.si > 0 || saved.bi > 0) && saved.si < SC.length ? saved : null;
  replay(0, 1);
  cap.textContent = UI[LANG].start;
  ov.innerHTML = `<button class="big-play" type="button" id="go" aria-label="Start lesson">${ICON.play.replace('<svg', '<svg width="40" height="40"')}</button>
    <div class="ov-t">${esc(say(L.startLabel || 'Start the lesson'))}</div>
    <div class="ov-s">${UI[LANG].sound}</div>
    ${resumeAt ? `<button class="ov-alt" type="button" id="resume">${UI[LANG].resume} "${esc(SC[resumeAt.si].t)}"</button>` : ''}`;
  window.__lesson = { SC, show: (i, b) => { hideOv(); goto(i, b, false); } };
  $('go').onclick = () => { hideOv(); goto(0, 0, true); };
  if (resumeAt) $('resume').onclick = () => { hideOv(); goto(resumeAt.si, resumeAt.bi, true); };
  ui();
  return { destroy() { stop(); ro.disconnect(); document.removeEventListener('keydown', onKey); if (synth) synth.onvoiceschanged = null; root.innerHTML = ''; } };
}
const LESSONS = {};
function register(id, L) { L.id = L.id || id; LESSONS[id] = L; }

window.E = { el, esc, later, row, col, Txt, Hd, Big, Pic, Tag, Title, Card, Bul, Code, Out, Vars, Arr, Trace, Tbl, NumLine, Clock, Dots, Grid, Chart, Bits, KV, StackV, QueueV, Think, start, hl, register, LESSONS, T, say, get lang() { return LANG; }, setLang(l) { LANG = l === 'hi' ? 'hi' : 'en'; try { localStorage.setItem('dsa:lang', LANG); } catch (e) {} } };
})();
