/* DSA Path app (Python edition): router, path, Python course, Logic Gym, Warm-up 50, DSA 150, progress, EN/Hinglish. */
(function () {
'use strict';
const DATA = JSON.parse(document.getElementById('data').textContent);
const P = DATA.problems;
const TOPICS = DATA.topics;
const MODS = DATA.modules;
const MOD = {};
MODS.forEach((m, i) => { MOD[m.id] = m; m.index = i; });
const MATH = MODS.filter(m => m.kind === 'math');
const PY = MODS.filter(m => m.kind === 'python');
const GYM = MODS.filter(m => m.kind === 'gym');
const TOPIC = {};
TOPICS.forEach((t, i) => { TOPIC[t.id] = t; t.index = i; t.warm = t.id.startsWith('w-'); t.problems.forEach(pid => { P[pid].topic = t.id; }); });
const NC = TOPICS.filter(t => !t.warm);
const WARM = TOPICS.filter(t => t.warm);
const ORDER = { warm: WARM.flatMap(t => t.problems), nc: NC.flatMap(t => t.problems) };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const view = document.getElementById('view');
const L = () => E.lang;
const tr = (en, hi) => (L() === 'hi' ? hi : en);

/* ---------- storage ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem('dsa:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('dsa:' + k, JSON.stringify(v)); } catch (e) {} }
};
let solved = new Set(store.get('solved', []));
let modsDone = new Set(store.get('mods', []));
const isSolved = id => solved.has(id);
function toggleSolved(id) { solved.has(id) ? solved.delete(id) : solved.add(id); store.set('solved', [...solved]); updateChip(); }
function toggleMod(id) { modsDone.has(id) ? modsDone.delete(id) : modsDone.add(id); store.set('mods', [...modsDone]); updateChip(); }
const countSolved = ids => ids.filter(isSolved).length;
const countMods = list => list.filter(m => modsDone.has(m.id)).length;
function lessonProgress(lessonId) {
  const Ls = E.LESSONS[lessonId]; if (!Ls) return 0;
  let s = null; try { s = JSON.parse(localStorage.getItem('lesson:' + Ls.id) || 'null'); } catch (e) {}
  const n = Ls.chapters.reduce((a, c) => a + c.scenes.length, 0);
  return s ? Math.min(1, (s.seen || 0) / n) : 0;
}

/* ---------- roadmap ---------- */
const LEVELS = [['arrays-hashing'], ['two-pointers', 'stack'], ['binary-search', 'sliding-window', 'linked-list'], ['trees'],
  ['tries', 'heap', 'backtracking'], ['intervals', 'greedy', 'graphs', 'dp-1d'], ['advanced-graphs', 'dp-2d', 'bit-manipulation'], ['math-geometry']];
const EDGES = [['arrays-hashing', 'two-pointers'], ['arrays-hashing', 'stack'], ['two-pointers', 'binary-search'], ['two-pointers', 'sliding-window'], ['two-pointers', 'linked-list'],
  ['binary-search', 'trees'], ['linked-list', 'trees'], ['trees', 'tries'], ['trees', 'heap'], ['trees', 'backtracking'], ['heap', 'intervals'], ['heap', 'greedy'], ['heap', 'advanced-graphs'],
  ['backtracking', 'graphs'], ['backtracking', 'dp-1d'], ['graphs', 'advanced-graphs'], ['graphs', 'dp-2d'], ['dp-1d', 'dp-2d'], ['dp-1d', 'bit-manipulation'], ['bit-manipulation', 'math-geometry']];

/* ---------- header ---------- */
function updateChip() {
  const el = document.getElementById('prog-chip');
  if (el) el.textContent = `${countSolved(ORDER.warm) + countSolved(ORDER.nc)} / 200 ${tr('solved', 'solve kiye')}`;
}
function navActive(route) {
  const group = route === '' || route === 'path' ? 'path'
    : route === 'math' || route === 'video-math' || /^m-mt/.test(route) ? 'math'
    : route === 'python' || /^m-py/.test(route) ? 'python'
    : route === 'gym' || /^m-g/.test(route) ? 'gym'
    : route === 'warmup' || route.startsWith('t-w-') || route.startsWith('p-w-') ? 'warmup'
    : 'dsa150';
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.dataset.k === group));
}
function paintLang() {
  document.querySelectorAll('.lang button').forEach(b => { const on = b.dataset.l === L(); b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
  const labels = { path: ['Path', 'Raasta'], math: ['Math', 'Math'], python: ['Python', 'Python'], gym: ['Logic Gym', 'Logic Gym'], warmup: ['Warm-up 50', 'Warm-up 50'], dsa150: ['DSA 150', 'DSA 150'] };
  document.querySelectorAll('.nav a').forEach(a => { a.textContent = labels[a.dataset.k][L() === 'hi' ? 1 : 0]; });
  document.documentElement.lang = L() === 'hi' ? 'hi-Latn' : 'en';
}
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => { const changed = b.dataset.l !== L(); E.setLang(b.dataset.l); paintLang(); paintTheme(); route(); if (changed && window.Mascot) L() === 'hi' ? Mascot.react('namaste', 'Namaste! Ab sab Hinglish mein.') : Mascot.react('wave', 'Hello! Switched to English.'); });

/* ---------- helpers ---------- */
const diffPill = d => `<span class="pill d-${d.toLowerCase()}">${d}</span>`;
const bar = (n, total) => `<span class="pbar" role="img" aria-label="${n} of ${total}"><i style="width:${total ? (n / total) * 100 : 0}%"></i></span>`;
function codeBlock(src, title) {
  const lines = src.split('\n').map(l => `<span class="cl">${E.hl(l) || ' '}</span>`).join('');
  return `<div class="cblock"><div class="cb-head"><span>${esc(title || 'main.py')}</span><button type="button" class="copy" data-copy>Copy</button></div><pre><code>${lines}</code></pre><textarea hidden>${esc(src)}</textarea></div>`;
}
function outBlock(text) { return `<div class="oblock"><div class="cb-head"><span>${tr('Output', 'Output')}</span></div><pre>${esc(text)}</pre></div>`; }
function hydrate(root) {
  root.querySelectorAll('.mdcode').forEach(d => { d.outerHTML = codeBlock(d.dataset.code, 'example.py'); });
  root.querySelectorAll('[data-copy]').forEach(b => b.onclick = () => {
    const src = b.closest('.cblock').querySelector('textarea').value;
    const done = () => { b.textContent = tr('Copied', 'Copy ho gaya'); setTimeout(() => (b.textContent = 'Copy'), 1400); };
    try { navigator.clipboard.writeText(src).then(done, () => selectCode(b)); } catch (e) { selectCode(b); }
  });
}
function selectCode(b) { const pre = b.closest('.cblock').querySelector('pre'); const r = document.createRange(); r.selectNodeContents(pre); const s = getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent = 'Ctrl/⌘ C'; }
function problemRow(pid, i) {
  const p = P[pid];
  return `<a class="prow${isSolved(pid) ? ' done' : ''}" href="#p-${pid}"><span class="pnum">${i + 1}</span><span class="ptitle">${esc(p.title)}</span><span class="ppat">${esc(p.pattern || '')}</span>${diffPill(p.diff)}<span class="pck" aria-label="${isSolved(pid) ? 'solved' : 'not solved'}">${isSolved(pid) ? '✓' : ''}</span></a>`;
}
function moduleRow(m, i) {
  const has = !!E.LESSONS[m.id];
  return `<a class="prow mrow${modsDone.has(m.id) ? ' done' : ''}" href="#m-${m.id}"><span class="pnum">${i + 1}</span><span class="ptitle">${esc(m.name)}</span><span class="ppat">${esc(m.summary)}</span><span class="mtag">${has ? '▶ ' : ''}${m.drills.length} ${tr('drills', 'drills')}</span><span class="pck">${modsDone.has(m.id) ? '✓' : ''}</span></a>`;
}

/* ---------- player ---------- */
let player = null;
function mountPlayer(el, lessonId) {
  if (player) { player.destroy(); player = null; }
  const Ls = E.LESSONS[lessonId];
  if (!Ls || !el) return false;
  player = E.start(Ls, el);
  return true;
}

/* ---------- layout: page header + main column + coach panel (Bitu, progress, actions, on-this-page) ---------- */
const firstUnsolved = ids => ids.find(id => !isSolved(id));
function head(o) {
  return `${o.crumbs ? `<nav class="crumbs" aria-label="Breadcrumb">${o.crumbs}</nav>` : ''}<header class="phead">${o.kicker ? `<div class="kicker">${o.kicker}</div>` : ''}<h1>${o.title}</h1>${o.sub ? `<p>${o.sub}</p>` : ''}${o.extra || ''}</header>`;
}
function coach(o = {}) {
  const st = o.stat;
  return `<aside class="coach" aria-label="${tr('Your coach', 'Tumhara coach')}">
    <div class="coach-card">
      <div class="bitu-host" id="bitu-host"></div>
      ${st ? `<div class="coach-stat"><div class="cs-row"><span>${st.label}</span><b>${st.n}<small> / ${st.total}</small></b></div>${bar(st.n, st.total)}${st.note ? `<div class="cs-note">${st.note}</div>` : ''}</div>` : ''}
      ${o.actions ? `<div class="coach-actions">${o.actions}</div>` : ''}
    </div>
    ${o.toc ? `<nav class="coach-toc" aria-label="${tr('On this page', 'Is page pe')}"><div class="ct-h">${tr('On this page', 'Is page pe')}</div><ol id="toc-list"></ol></nav>` : ''}
  </aside>`;
}
function shell(headHTML, mainHTML, coachOpts) {
  view.innerHTML = `${headHTML}<div class="page"><div class="page-main">${mainHTML}</div>${coach(coachOpts)}</div>`;
  buildToc();
}
const upNext = (href, label) => `<a class="upnext" href="${href}"><span>${tr('Up next', 'Aage')}</span><b>${esc(label)}</b></a>`;
/* "On this page": built from [data-toc] targets, with the current section highlighted while scrolling */
let tocObserver = null;
function buildToc() {
  if (tocObserver) { tocObserver.disconnect(); tocObserver = null; }
  const list = document.getElementById('toc-list');
  if (!list) return;
  const targets = [...view.querySelectorAll('.page-main [data-toc]')];
  targets.forEach((t, i) => { if (!t.id) t.id = 'sec-' + i; });
  list.innerHTML = targets.map(t => `<li><a href="#${location.hash.slice(1)}" data-to="${t.id}"${t.dataset.tocSub ? ' class="sub"' : ''}>${esc(t.dataset.toc)}</a></li>`).join('');
  list.querySelectorAll('a').forEach(a => a.onclick = e => {
    e.preventDefault();
    const el = document.getElementById(a.dataset.to);
    if (el.tagName === 'DETAILS') el.open = true;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 84, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
  const links = new Map([...list.querySelectorAll('a')].map(a => [a.dataset.to, a]));
  const visible = new Set();
  tocObserver = new IntersectionObserver(es => {
    es.forEach(e => e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id));
    const cur = targets.find(t => visible.has(t.id));
    links.forEach((a, id) => a.classList.toggle('on', !!cur && id === cur.id));
  }, { rootMargin: '-80px 0px -55% 0px' });
  targets.forEach(t => tocObserver.observe(t));
}

/* ---------- pages ---------- */
function stepsDef() {
  const drills = list => list.reduce((a, m) => a + m.drills.length, 0);
  return [
    { n: 1, key: 'math', short: 'Math', t: tr('Math for Logic', 'Logic ke liye Math'), when: tr('Weeks 1–2', 'Week 1–2'), meta: [`${MATH.length} ${tr('topics', 'topics')}`, `${drills(MATH)} ${tr('drills', 'drills')}`], d: tr('Numbers, remainders, digits, primes, powers, binary, counting and Big O, taught from zero with slow videos and written theory.', 'Numbers, remainders, digits, primes, powers, binary, counting aur Big O, bilkul shuru se, dheeme videos aur likhi hui theory ke saath.'), href: '#math', prog: () => countMods(MATH) / MATH.length, label: () => `${countMods(MATH)} / ${MATH.length} ${tr('complete', 'complete')}` },
    { n: 2, key: 'python', short: 'Python', t: tr('Python from zero', 'Python bilkul shuru se'), when: tr('Weeks 3–4', 'Week 3–4'), meta: [`${PY.length} ${tr('modules', 'modules')}`, `${drills(PY)} ${tr('drills', 'drills')}`], d: tr('From print() to classes, recursion and heapq. Each module has a video, deep theory and drills.', 'print() se classes, recursion aur heapq tak. Har module mein video, gehri theory aur drills.'), href: '#python', prog: () => countMods(PY) / PY.length, label: () => `${countMods(PY)} / ${PY.length} ${tr('complete', 'complete')}` },
    { n: 3, key: 'gym', short: 'Logic Gym', t: 'Logic Gym', when: tr('Week 5', 'Week 5'), meta: [`${GYM.length} ${tr('modules', 'modules')}`, `${drills(GYM)} ${tr('drills', 'drills')}`], d: tr('How to think, then loops, patterns, lists, strings and dry runs until the logic feels natural.', 'Kaise sochein, phir loops, patterns, lists, strings aur dry runs jab tak logic natural na lage.'), href: '#gym', prog: () => countMods(GYM) / GYM.length, label: () => `${countMods(GYM)} / ${GYM.length} ${tr('complete', 'complete')}` },
    { n: 4, key: 'warm', short: 'Warm-up 50', t: 'Warm-up 50', when: tr('Weeks 6–7', 'Week 6–7'), meta: [tr('50 problems', '50 problems'), `${WARM.length} ${tr('groups', 'groups')}`], d: tr('Reverse a string, largest number, anagram, palindrome. Classic programs, explained with analogies.', 'String reverse, sabse bada number, anagram, palindrome. Classic programs, analogies ke saath.'), href: '#warmup', prog: () => countSolved(ORDER.warm) / 50, label: () => `${countSolved(ORDER.warm)} / 50 ${tr('solved', 'solve kiye')}` },
    { n: 5, key: 'dsa', short: 'DSA 150', t: 'DSA 150', when: tr('Weeks 8–15', 'Week 8–15'), meta: [tr('18 topics', '18 topics'), tr('150 problems', '150 problems')], d: tr('Arrays to dynamic programming. A video per topic, then problems from brute force to the best approach.', 'Arrays se dynamic programming tak. Har topic ka video, phir problems brute force se best approach tak.'), href: '#dsa150', prog: () => countSolved(ORDER.nc) / 150, label: () => `${countSolved(ORDER.nc)} / 150 ${tr('solved', 'solve kiye')}` }
  ];
}
/* small line icons for the five steps (stroke = currentColor) */
const STEP_ICON = {
  math: '<path d="M8 12h8M12 8v8"/><path d="M26 12h8"/><path d="M9 29l6 6M15 29l-6 6"/><path d="M26 32h8"/><circle cx="30" cy="28" r="1.4" class="dot"/><circle cx="30" cy="36" r="1.4" class="dot"/>',
  python: '<path d="M15 10l-8 11 8 11"/><path d="M27 10l8 11-8 11"/><path d="M23 7l-4 28"/>',
  gym: '<path d="M6 21h30"/><rect x="9" y="13" width="5" height="16" rx="2"/><rect x="28" y="13" width="5" height="16" rx="2"/><rect x="4" y="16" width="4" height="10" rx="1.5"/><rect x="34" y="16" width="4" height="10" rx="1.5"/>',
  warm: '<path d="M21 37c-7 0-11-5-11-11 0-7 6-10 7-17 4 3 5 7 4 11 2-1 4-3 4-6 4 4 7 8 7 13 0 6-5 10-11 10z"/><path d="M21 37c-3 0-5-2-5-5 0-3 3-5 4-8 3 2 6 5 6 8s-2 5-5 5z"/>',
  dsa: '<circle cx="21" cy="8" r="4"/><circle cx="10" cy="22" r="4"/><circle cx="32" cy="22" r="4"/><circle cx="16" cy="35" r="4"/><circle cx="28" cy="35" r="4"/><path d="M18 11l-5 8M24 11l5 8M12 26l3 5M30 26l-3 5"/>'
};
const stepIcon = k => `<svg class="step-ico ico-${k}" viewBox="0 0 42 42" aria-hidden="true">${STEP_ICON[k]}</svg>`;
/* what's inside each step, as links, with a tick once finished */
function stepItems(key) {
  if (key === 'math' || key === 'python' || key === 'gym') return ({ math: MATH, python: PY, gym: GYM })[key].map(m => ({ t: m.name, href: '#m-' + m.id, done: modsDone.has(m.id) }));
  return (key === 'warm' ? WARM : NC).map(t => { const c = countSolved(t.problems); return { t: t.name, href: '#t-' + t.id, done: c === t.problems.length, count: `${c}/${t.problems.length}` }; });
}
function stepPanel(s, st) {
  const f = s.prog();
  const items = stepItems(s.key);
  const go = st === 'done' ? tr('Review', 'Revise karo') : f > 0 ? tr('Continue', 'Continue karo') : st === 'current' ? tr('Start', 'Shuru karo') : tr('Open', 'Kholo');
  return `<div class="sp-main">
      <div class="sp-top">${stepIcon(s.key)}<span class="sp-kick">${tr('Step', 'Step')} ${s.n} · ${s.when}</span>${st === 'done' ? `<span class="tag-done">✓ ${tr('Done', 'Ho gaya')}</span>` : st === 'current' ? `<span class="here">${tr('You are here', 'Tum yahan ho')}</span>` : ''}</div>
      <h3 class="sp-title">${esc(s.t)}</h3>
      <p class="sp-desc">${esc(s.d)}</p>
      <dl class="sp-stats">${s.meta.map(m => { const [n, ...rest] = m.split(' '); return `<div><dd>${n}</dd><dt>${rest.join(' ')}</dt></div>`; }).join('')}<div><dd>${Math.round(f * 100)}%</dd><dt>${tr('done', 'done')}</dt></div></dl>
      <div class="sp-prog">${bar(Math.round(f * 100), 100)}<span>${s.label()}</span></div>
      <a class="btn pri lg sp-go" href="${s.href}">${go}: ${esc(s.t)} <span aria-hidden="true">→</span></a>
    </div>
    <div class="sp-list">
      <div class="sp-lh">${tr("What's inside", 'Andar kya hai')} <span>${items.filter(x => x.done).length} / ${items.length}</span></div>
      <ol class="${items.length > 8 ? 'clip' : ''}">${items.map((x, i) => `<li><a href="${x.href}" class="${x.done ? 'done' : ''}" style="--k:${i}"><span class="si-n">${x.done ? '✓' : i + 1}</span><span class="si-t">${esc(x.t)}</span>${x.count ? `<span class="si-c">${x.count}</span>` : ''}</a></li>`).join('')}</ol>
      ${items.length > 8 ? `<button type="button" class="sp-more${items.length <= 15 ? ' few' : ''}">${tr('Show all', 'Sab dikhao')} ${items.length}</button>` : ''}
    </div>`;
}
/* Where the learner is, from what they have actually done (not from pages they merely opened).
   new: nothing done yet · continue: partway through a step · next: a step finished, the next not started · done: all five finished */
const hasProgress = () => lessonProgress('math') > 0 || modsDone.size > 0 || solved.size > 0;
const stepOfRoute = r => !r ? -1 : r === 'math' || r === 'video-math' || r.startsWith('m-mt') ? 0 : r === 'python' || r.startsWith('m-py') ? 1 : r === 'gym' || /^m-g\d/.test(r) ? 2 : r === 'warmup' || r.startsWith('t-w-') || r.startsWith('p-w-') ? 3 : r === 'dsa150' || r.startsWith('t-') || r.startsWith('p-') ? 4 : -1;
function homeStage(steps) {
  let cur = steps.findIndex(s => s.prog() < 1);
  if (cur === -1) return { kind: 'done', cur: steps.length - 1, href: steps[steps.length - 1].href };
  if (!hasProgress()) return { kind: 'new', cur, href: MATH.length ? '#m-' + MATH[0].id : steps[0].href };
  const s = steps[cur];
  /* partway through a step, or started something while still on step 1 (there is no finished step before it) */
  if (s.prog() > 0 || cur === 0) {
    const last = store.get('last', null);
    return { kind: 'continue', cur, href: last && stepOfRoute(last) === cur && routeLabel(last) ? '#' + last : s.href, lastLabel: last && stepOfRoute(last) === cur ? routeLabel(last) : null };
  }
  return { kind: 'next', cur, href: s.href };
}
function homeCta(steps, st) {
  const s = steps[st.cur];
  return {
    new: tr('Start learning', 'Seekhna shuru karo'),
    continue: `${tr('Continue step', 'Step')} ${s.n}${tr('', ' continue karo')}: ${esc(s.t)}`,
    next: `${tr('Start step', 'Step')} ${s.n}${tr('', ' shuru karo')}: ${esc(s.t)}`,
    done: tr('Review DSA 150', 'DSA 150 revise karo')
  }[st.kind];
}
function homeNote(steps, st) {
  const s = steps[st.cur];
  if (st.kind === 'new') return tr('Starts with topic 1 of Math for Logic: numbers and the number line. Free, no sign-up, and your progress is saved in this browser.', 'Math for Logic ke topic 1 se shuru: numbers aur number line. Free, sign-up nahi, aur progress is browser mein save hota hai.');
  if (st.kind === 'done') return tr('All five steps done. Re-solve old problems every week to keep them fresh.', 'Paanchon steps ho gaye. Har hafte purani problems dobara solve karo taaki yaad rahein.');
  const prev = steps[st.cur - 1];
  if (st.kind === 'next') return `${tr('Step', 'Step')} ${prev.n} (${esc(prev.t)}) ${tr('is done. Next up', 'ho gaya. Ab')}: ${esc(s.t)}.`;
  return `${tr('Step', 'Step')} ${s.n} ${tr('of 5', 'of 5')} · ${s.label()}${st.lastLabel ? ` · ${tr('last opened', 'aakhri baar khola')}: ${esc(st.lastLabel)}` : ''}`;
}
const WEEKS = 15;
function pageHome() {
  const solvedN = countSolved(ORDER.warm) + countSolved(ORDER.nc);
  const steps = stepsDef();
  const stage = homeStage(steps);
  let cur = steps.findIndex(s => s.prog() < 1);
  const allDone = cur === -1;
  if (allDone) cur = steps.length - 1;
  const stateOf = i => steps[i].prog() >= 1 ? 'done' : i === cur ? 'current' : 'todo';
  /* how far up the hero ladder: markers sit at 14%, 31%, 48%, 65%, 82% of its height */
  const markAt = i => 14 + i * 17;
  const climb = allDone ? 94 : markAt(cur) + Math.round(steps[cur].prog() * 17);
  const glyphs = ['for', '[ ]', 'O(n)', 'def', '%', '{ }', 'if', 'λ'];
  const nVideos = Object.keys(E.LESSONS).length;
  const nDrills = MODS.reduce((a, m) => a + m.drills.length, 0);
  view.innerHTML = `
  <section class="hx">
    <div class="hx-text">
      <div class="kicker">${tr('Logic Ladder · learn DSA in Python', 'Logic Ladder · Python mein DSA seekho')}</div>
      <h1>${tr('Build your logic <span class="hl">one rung</span> at a time', 'Apna logic banao, <span class="hl">ek-ek seedhi</span> chadh ke')}</h1>
      <p class="hx-sub">${tr('A step-by-step path for people who find logic hard: the maths you need, Python from zero, logic drills, 50 warm-ups and 150 interview problems. Every explanation is in English and Hinglish.', 'Unke liye step-by-step raasta jinhe logic mushkil lagta hai: zaroori maths, bilkul shuru se Python, logic drills, 50 warm-ups aur 150 interview problems. Har explanation English aur Hinglish mein.')}</p>
      <div class="hx-cta">
        <a class="btn pri lg" id="home-cta" href="${stage.href}">${homeCta(steps, stage)} <span aria-hidden="true">→</span></a>
        <a class="btn ghost lg" href="#path" id="how-link">${tr('See the 5 steps', '5 steps dekho')} <span aria-hidden="true">↓</span></a>
      </div>
      <p class="hx-note">${homeNote(steps, stage)}</p>
    </div>
    <div class="hx-art" aria-hidden="true" style="--climb:${climb}%">
      <div class="hx-grid"></div>
      ${glyphs.map((g, i) => `<span class="gl" style="--x:${4 + (i * 13) % 30}%;--d:${i * 1.1}s;--s:${8 + (i % 3) * 1.5}s">${g}</span>`).join('')}
      <div class="hx-ladder">
        <div class="hx-rails"><i class="fill"></i></div>
        <svg class="hx-flag" viewBox="0 0 46 50"><rect x="6" y="2" width="4" height="46" rx="2"/><path class="cloth" d="M10 5h28l-7 9 7 9H10z"/></svg>
        ${steps.map((s, i) => `<div class="hx-mark ${stateOf(i)}" style="bottom:${markAt(i)}%"><span class="hx-dot">${stateOf(i) === 'done' ? '✓' : s.n}</span><span class="hx-lab">${esc(s.t)}</span></div>`).join('')}
        <div class="bitu-host on-hx" id="bitu-host" style="bottom:calc(${allDone ? 94 : markAt(cur)}% - 6px)"></div>
      </div>
      <div class="hx-say" id="bitu-say" style="bottom:calc(58px + (100% - 78px) * ${(allDone ? 94 : markAt(cur)) / 100})"></div>
    </div>
  </section>

  <section class="nums" aria-label="${tr('What is inside', 'Andar kya hai')}">
    <div><b>${nVideos}</b><span>${tr('animated videos', 'animated videos')}</span></div>
    <div><b>${MODS.length}</b><span>${tr('modules with theory', 'modules, theory ke saath')}</span></div>
    <div><b>${nDrills}</b><span>${tr('practice drills', 'practice drills')}</span></div>
    <div><b>200</b><span>${tr('problems, explained', 'problems, samjhaaye hue')}</span></div>
    <div><b>722</b><span>${tr('tested code checks', 'tested code checks')}</span></div>
  </section>

  <section class="path" id="the-path" aria-labelledby="path-h">
    <div class="sec-head"><div class="kicker">${tr('Your path', 'Tumhara raasta')}</div><h2 id="path-h">${tr('Five steps, in this order', 'Paanch steps, isi order mein')}</h2><p>${tr('Each step unlocks the next one in your head. Skipping ahead is the most common reason people get stuck.', 'Har step agle ko aasaan banata hai. Aage kood jaana hi atakne ki sabse badi wajah hai.')}</p></div>
    <div class="stepper" role="tablist" aria-label="${tr('The five steps', 'Paanch steps')}">
      <div class="st-line" aria-hidden="true"><i style="--w:${allDone ? 100 : Math.round((cur + steps[cur].prog()) / 4 * 100)}%"></i></div>
      ${steps.map((s, i) => `<button type="button" role="tab" class="st-node ${stateOf(i)}" id="st-tab-${i}" aria-controls="st-panel" aria-selected="${i === cur}" tabindex="${i === cur ? 0 : -1}" data-i="${i}"><span class="st-dot">${stateOf(i) === 'done' ? '✓' : s.n}</span><span class="st-name">${esc(s.short)}</span><span class="st-sub">${stateOf(i) === 'current' ? tr('You are here', 'Tum yahan ho') : stateOf(i) === 'done' ? tr('Done', 'Ho gaya') : s.when}</span></button>`).join('')}
    </div>
    <div class="st-panel" id="st-panel" role="tabpanel" tabindex="0"></div>
  </section>

  <section class="how" id="how" aria-labelledby="how-h">
    <div class="sec-head"><div class="kicker">${tr('How it works', 'Kaise kaam karta hai')}</div><h2 id="how-h">${tr('Every lesson, the same four moves', 'Har lesson, wahi chaar kadam')}</h2></div>
    <div class="how-grid">
      <div class="how-card"><div class="demo demo-watch"><div class="dw-stage"><i></i><i></i><i></i><b class="dw-ptr"></b></div><div class="dw-bar"><i></i></div></div><h3>${tr('Watch', 'Dekho')}</h3><p>${tr('Short animated videos with narration and captions. Pause whenever the timer asks you to think.', 'Narration aur captions ke saath chhote animated videos. Jab timer bole, ruko aur socho.')}</p></div>
      <div class="how-card"><div class="demo demo-lang"><span class="dl-en">for x in nums: <em>repeat for each item</em></span><span class="dl-hi">for x in nums: <em>har item ke liye dohraao</em></span><span class="dl-sw"><i>EN</i><i>HI</i></span></div><h3>${tr('Understand', 'Samjho')}</h3><p>${tr('Theory in simple words with real-life analogies. Switch to Hinglish any time.', 'Aasaan shabdon mein theory, real-life analogies ke saath. Kabhi bhi Hinglish chuno.')}</p></div>
      <div class="how-card"><div class="demo demo-code"><code><span class="k">for</span> i <span class="k">in</span> range(3):</code><code>&nbsp;&nbsp;&nbsp;&nbsp;print(i)<b class="caret"></b></code><span class="dc-out">0 1 2 <em>✓</em></span></div><h3>${tr('Practise', 'Practice karo')}</h3><p>${tr('Predict the output, write the function, fix the bug. Hints open one at a time.', 'Output predict karo, function likho, bug theek karo. Hints ek-ek karke khulte hain.')}</p></div>
      <div class="how-card"><div class="demo demo-track"><span class="ring big" style="--p:${Math.max(8, Math.round(solvedN / 2))}"><span>${solvedN}</span></span><span class="dt-lab">${tr('solved of 200', '200 mein se solved')}</span></div><h3>${tr('Track', 'Track karo')}</h3><p>${tr('Mark problems solved and modules complete. Your ladder fills as you climb.', 'Problems solved aur modules complete mark karo. Chadhte hi tumhari seedhi bharti hai.')}</p></div>
    </div>
  </section>

  <section class="pace" aria-labelledby="pace-h">
    <div class="sec-head"><div class="kicker">${tr('A realistic pace', 'Ek realistic speed')}</div><h2 id="pace-h">${tr('About 15 weeks at 1–2 hours a day', 'Roz 1–2 ghante, lagbhag 15 hafte')}</h2></div>
    <div class="gantt" role="img" aria-label="${tr('Weeks 1 and 2: Math for Logic, about 8 topics a week. Weeks 3 and 4: Python. Week 5: Logic Gym. Weeks 6 and 7: Warm-up 50. Weeks 8 to 15: DSA 150, about 3 a day. Every Sunday: re-solve 5 old problems.', 'Week 1 aur 2: Math for Logic, hafte mein lagbhag 8 topics. Week 3 aur 4: Python. Week 5: Logic Gym. Week 6 aur 7: Warm-up 50. Week 8 se 15: DSA 150, roz lagbhag 3. Har Sunday: 5 purani problems dobara.')}" style="--weeks:${WEEKS}">
      <div class="g-weeks">${Array.from({ length: WEEKS }, (_, w) => `<span>W${w + 1}</span>`).join('')}</div>
      ${[[tr('Math', 'Math'), 1, 2, 'math'], [tr('Python', 'Python'), 3, 2, 'python'], ['Logic Gym', 5, 1, 'gym'], ['Warm-up 50', 6, 2, 'warm'], ['DSA 150', 8, 8, 'dsa']].map(([name, start, len, k], i) => `
      <div class="g-row"><span class="g-name">${name}</span><div class="g-track"><i class="g-bar b-${k}" style="--s:${start - 1};--l:${len};--i:${i}"></i></div></div>`).join('')}
      <div class="g-row"><span class="g-name">${tr('Review', 'Revise')}</span><div class="g-track">${Array.from({ length: WEEKS }, (_, w) => `<b class="g-sun" style="--s:${w}"></b>`).join('')}</div></div>
    </div>
    <p class="pace-note">${tr('Each dot is a Sunday: re-solve 5 old problems without looking. Watch each topic video before its theory and drills.', 'Har dot ek Sunday hai: 5 purani problems bina dekhe dobara solve karo. Har topic ka video uski theory aur drills se pehle dekho.')}</p>
  </section>

  <footer class="home-foot">
    <span>Logic Ladder · ${tr('every code sample is run and tested before it is shown', 'har code sample dikhane se pehle chala ke test kiya gaya hai')}</span>
    <a href="https://github.com/Akashtripathi7/logic-ladder" target="_blank" rel="noopener">${tr('Source on GitHub', 'GitHub pe source')} ↗</a>
  </footer>`;
  const panel = document.getElementById('st-panel');
  const tabs = [...view.querySelectorAll('.st-node')];
  const show = (i, focus) => {
    tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    panel.setAttribute('aria-labelledby', 'st-tab-' + i);
    panel.innerHTML = stepPanel(steps[i], stateOf(i));
    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    const more = panel.querySelector('.sp-more');
    if (more) more.onclick = () => { panel.querySelector('.sp-list ol').classList.remove('clip'); more.remove(); };
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => {
    t.onclick = () => show(i);
    t.onkeydown = e => { const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0; if (d) { e.preventDefault(); show((i + d + tabs.length) % tabs.length, true); } };
  });
  show(cur);
  const how = document.getElementById('how-link');
  how.onclick = e => { e.preventDefault(); const t = document.getElementById('the-path'); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 76, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
}
/* the three module-based courses share one page layout */
function course(kind) {
  return {
    math: { list: MATH, route: 'math', step: 1, name: tr('Math for Logic', 'Logic ke liye Math'), short: 'Math', unit: tr('topic', 'topic'),
      sub: tr('The maths behind every coding problem, from zero, in 16 short topics. Each one has a slow video, theory written for complete beginners (English or Hinglish) and practice. Do them in order.', 'Har coding problem ke peeche ka maths, bilkul shuru se, 16 chhote topics mein. Har ek mein dheema video, bilkul beginners ke liye theory (English ya Hinglish) aur practice. Order mein karo.'),
      next: ['#python', tr('Python from zero', 'Python bilkul shuru se')],
      parts: [[0, tr('Part 1 · Numbers', 'Part 1 · Numbers')], [4, tr('Part 2 · Building blocks', 'Part 2 · Building blocks')], [8, tr('Part 3 · Patterns and counting', 'Part 3 · Patterns aur counting')], [12, tr('Part 4 · Thinking like a programmer', 'Part 4 · Programmer ki tarah sochna')]] },
    python: { list: PY, route: 'python', step: 2, name: tr('Python from zero', 'Python bilkul shuru se'), short: 'Python', unit: tr('module', 'module'),
      sub: tr('Every module has a short video, a detailed theory page and drills that check your understanding. Every code sample here was run to confirm its output.', 'Har module mein chhota video, detailed theory page aur drills hain. Yahan ka har code sample chala ke output confirm kiya gaya hai.'),
      next: ['#gym', 'Logic Gym'] },
    gym: { list: GYM, route: 'gym', step: 3, name: 'Logic Gym', short: 'Logic Gym', unit: tr('module', 'module'),
      sub: tr('Mastery drills before the Warm-up 50: predict the output, write the function, fix the bug. Do each on paper first, then check the answer.', 'Warm-up 50 se pehle mastery drills: output predict karo, function likho, bug theek karo. Pehle paper pe, phir answer check karo.'),
      next: ['#warmup', 'Warm-up 50'] }
  }[kind];
}
function pageMathVideo() {
  const f = lessonProgress('math');
  shell(head({ crumbs: `<a href="#math">${tr('Math for Logic', 'Logic ke liye Math')}</a> › <span>${tr('Recap video', 'Recap video')}</span>`, kicker: tr('Optional recap', 'Optional recap'), title: tr('All of Math for Logic in one video', 'Poora Math for Logic ek video mein'), sub: tr('A fast, continuous run through all 16 topics. Best for revision after you finish the course, not as your first lesson.', 'Saare 16 topics ek lagatar, tez video mein. Course khatam karne ke baad revision ke liye best hai, pehle lesson ke liye nahi.') }),
    `<div id="player-mount"></div>`,
    { stat: { label: tr('Video watched', 'Video dekha'), n: Math.round(f * 100), total: 100, note: tr('Your place in the video is saved on this device.', 'Video mein tumhari jagah is device pe save hai.') }, actions: upNext('#math', tr('Back to the 16 topics', '16 topics pe wapas')) });
  mountPlayer(document.getElementById('player-mount'), 'math');
}
function pageModuleList(kind) {
  const c = course(kind), list = c.list;
  const nextMod = list.find(m => !modsDone.has(m.id));
  const rows = list.map((m, i) => { const part = c.parts && c.parts.find(p => p[0] === i); return (part ? `<h3 class="grp mod-part">${part[1]}</h3>` : '') + moduleRow(m, i); }).join('');
  shell(head({ kicker: `${tr('Step', 'Step')} ${c.step}`, title: c.name, sub: c.sub }),
    `<section class="plist">${rows}</section>
    ${kind === 'math' ? `<div class="note-card">${tr('Finished all 16? <a href="#video-math">Watch the one-video recap</a> to revise everything in one go.', 'Saare 16 ho gaye? Sab ek saath revise karne ke liye <a href="#video-math">ek-video recap dekho</a>.')}</div>` : ''}`,
    { stat: { label: tr('Complete', 'Complete'), n: countMods(list), total: list.length },
      actions: nextMod ? upNext('#m-' + nextMod.id, nextMod.name) : upNext(c.next[0], c.next[1]) });
}
function pageModule(id) {
  const m = MOD[id]; if (!m) return pageNotFound();
  const c = course(m.kind), list = c.list;
  const i = list.indexOf(m);
  const prev = list[i - 1], next = list[i + 1];
  const kindLabel = { predict: tr('Predict the output', 'Output predict karo'), write: tr('Write it', 'Khud likho'), fix: tr('Find and fix the bug', 'Bug dhoondo aur theek karo') };
  const drills = m.drills.map((d, k) => `
    <div class="drill">
      <div class="dhead"><span class="sn">${k + 1}</span><span class="dkind k-${d.kind}">${kindLabel[d.kind] || d.kind}</span></div>
      <p class="dq">${d.qh}</p>
      ${d.code ? codeBlock(d.code, d.kind === 'fix' ? 'buggy.py' : 'drill.py') : ''}
      <details class="dans"><summary>${tr('Show answer', 'Answer dikhao')}</summary>
        ${d.kind === 'predict' ? outBlock(d.answer) : codeBlock(d.answer, 'answer.py')}
        <p class="dexp">${L() === 'hi' && d.hih ? d.hih : d.enh}</p>
      </details>
    </div>`).join('');
  const hasVideo = !!E.LESSONS[m.id];
  const home = c.route, homeName = c.short;
  const nextHref = next ? '#m-' + next.id : c.next[0];
  const nextName = next ? next.name : c.next[1];
  const doneBtn = cls => `<button type="button" class="btn ${cls} mod-done" aria-pressed="false"></button>`;
  shell(head({ crumbs: `<a href="#${home}">${homeName}</a> › <span>${c.unit[0].toUpperCase() + c.unit.slice(1)} ${i + 1}</span>`, kicker: `${homeName} · ${c.unit} ${i + 1} ${tr('of', 'of')} ${list.length}`, title: esc(m.name), sub: esc(m.summary) }),
    `${hasVideo ? `<section class="tvideo" data-toc="${tr('Video', 'Video')}"><h2>${tr('Watch: short video', 'Dekho: chhota video')}</h2><div id="player-mount"></div></section>` : ''}
    <section class="theory">
      <div class="theory-head"><h2>${tr('Theory', 'Theory')}</h2><span class="muted">${tr('Prefer Hinglish? Switch at the top of the page.', 'English chahiye? Upar se switch karo.')}</span></div>
      <article class="prose">${L() === 'hi' ? m.hi : m.en}</article>
    </section>
    <section class="drills" data-toc="${tr('Practice drills', 'Practice drills')}"><h2>${tr('Practice drills', 'Practice drills')} <span class="muted">${tr('Try each on paper before opening the answer.', 'Answer kholne se pehle paper pe try karo.')}</span></h2>${drills}
      <div class="finish-card"><div><b>${tr('Done with the drills?', 'Drills ho gayi?')}</b><span class="muted">${tr(`Mark the ${c.unit} complete to track your progress.`, `Progress track karne ke liye ${c.unit} complete mark karo.`)}</span></div>${doneBtn('pri')}</div>
    </section>
    <div class="next-row">${prev ? `<a class="btn" href="#m-${prev.id}">← ${esc(prev.name)}</a>` : '<span></span>'}<a class="btn pri" href="${nextHref}">${esc(nextName)} →</a></div>`,
    { stat: { label: `${homeName} · ${tr('complete', 'complete')}`, n: countMods(list), total: list.length }, actions: doneBtn('') + upNext(nextHref, nextName), toc: true, id: m.id });
  /* theory headings join the on-this-page list */
  view.querySelectorAll('.prose h3').forEach(h => { h.dataset.toc = h.textContent; h.dataset.tocSub = '1'; });
  buildToc();
  hydrate(view);
  const paint = () => view.querySelectorAll('.mod-done').forEach(b => { const on = modsDone.has(m.id); b.classList.toggle('solved', on); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? `✓ ${c.unit[0].toUpperCase() + c.unit.slice(1)} ${tr('complete', 'complete')}` : tr(`Mark ${c.unit} complete`, `${c.unit[0].toUpperCase() + c.unit.slice(1)} complete mark karo`); });
  paint();
  view.querySelectorAll('.mod-done').forEach(b => b.onclick = () => {
    toggleMod(m.id); paint();
    const st = view.querySelector('.coach-stat'); if (st) { st.querySelector('b').innerHTML = `${countMods(list)}<small> / ${list.length}</small>`; st.querySelector('.pbar i').style.width = (countMods(list) / list.length * 100) + '%'; }
    if (modsDone.has(m.id) && window.Mascot) Mascot.react('cheer', tr(`${c.unit[0].toUpperCase() + c.unit.slice(1)} complete! On to the next one.`, `${c.unit[0].toUpperCase() + c.unit.slice(1)} complete! Chalo agle pe.`));
  });
  if (hasVideo) mountPlayer(document.getElementById('player-mount'), m.id);
}
function pageWarmup() {
  const nx = firstUnsolved(ORDER.warm);
  shell(head({ kicker: tr('Step 4', 'Step 4'), title: 'Warm-up 50', sub: tr('Classic beginner programs. Each page has the problem in plain words, a real-life analogy, hints one at a time, brute force, the better idea, Python code, a dry run and a full Hinglish explanation.', 'Classic beginner programs. Har page pe: seedhe shabdon mein problem, real-life analogy, ek-ek hint, brute force, behtar idea, Python code, dry run aur poora Hinglish explanation.') }),
    `<div class="note-card">${tr('<b>Before these:</b> finish the <a href="#gym">Logic Gym</a>. If a problem feels hard, revisit the matching Python module.', '<b>Isse pehle:</b> <a href="#gym">Logic Gym</a> poora karo. Koi problem mushkil lage toh matching Python module dobara dekho.')}</div>
    ${WARM.map(t => `<section class="plist" data-toc="${esc(t.name)}"><h2><a href="#t-${t.id}">${esc(t.name)}</a> <span class="muted">${countSolved(t.problems)}/${t.problems.length}</span></h2>${t.problems.map(pid => problemRow(pid, ORDER.warm.indexOf(pid))).join('')}</section>`).join('')}`,
    { stat: { label: tr('Solved', 'Solved'), n: countSolved(ORDER.warm), total: 50 }, actions: nx ? upNext('#p-' + nx, P[nx].title) : upNext('#dsa150', 'DSA 150'), toc: true });
}
function pageDsa150() {
  const done = countSolved(ORDER.nc);
  const by = d => ORDER.nc.filter(id => P[id].diff === d);
  const nx = firstUnsolved(ORDER.nc);
  shell(head({ kicker: tr('Step 5', 'Step 5'), title: tr('DSA 150 roadmap', 'DSA 150 roadmap'), sub: tr('Follow the arrows. Each topic starts with an explainer video, then its problems in order.', 'Arrows follow karo. Har topic ek explainer video se shuru hota hai, phir uski problems order mein.') }),
    `<div class="tree" id="tree" data-toc="${tr('Roadmap', 'Roadmap')}"><svg class="tree-lines" id="tree-lines" aria-hidden="true"></svg>
      ${LEVELS.map(lv => `<div class="tlevel">${lv.map(id => { const t = TOPIC[id]; const c = countSolved(t.problems); return `<a class="tnode${c === t.problems.length ? ' complete' : c ? ' started' : ''}" href="#t-${id}" data-id="${id}"><span class="tn-name">${esc(t.name)}</span><span class="tn-prog">${bar(c, t.problems.length)}<span>${c}/${t.problems.length}</span></span></a>`; }).join('')}</div>`).join('')}
    </div>
    <section class="plist all" data-toc="${tr('All 150 problems', 'Saari 150 problems')}">
      <div class="plist-head"><h2>${tr('All 150 problems', 'Saari 150 problems')}</h2>
        <div class="filters" role="group" aria-label="${tr('Filter problems', 'Problems filter karo')}">${['All', 'Easy', 'Medium', 'Hard', 'Unsolved'].map((f, i) => `<button type="button" class="fbtn${i ? '' : ' on'}" data-f="${f}" aria-pressed="${!i}">${f}</button>`).join('')}</div></div>
      <div id="all-list">${NC.map(t => `<h3 class="grp"><a href="#t-${t.id}">${esc(t.name)}</a></h3>${t.problems.map(pid => problemRow(pid, ORDER.nc.indexOf(pid))).join('')}`).join('')}</div>
    </section>`,
    { stat: { label: tr('Solved', 'Solved'), n: done, total: 150, note: `<span class="d-easy">${tr('Easy', 'Easy')} ${countSolved(by('Easy'))}/${by('Easy').length}</span> · <span class="d-medium">${tr('Medium', 'Medium')} ${countSolved(by('Medium'))}/${by('Medium').length}</span> · <span class="d-hard">${tr('Hard', 'Hard')} ${countSolved(by('Hard'))}/${by('Hard').length}</span>` },
      actions: nx ? upNext('#p-' + nx, P[nx].title) : '', toc: true });
  const f = view.querySelectorAll('.fbtn');
  f.forEach(b => b.onclick = () => {
    f.forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    const k = b.dataset.f;
    view.querySelectorAll('#all-list .prow').forEach(r => { const pid = r.getAttribute('href').slice(3); r.hidden = !(k === 'All' || P[pid].diff === k || (k === 'Unsolved' && !isSolved(pid))); });
    view.querySelectorAll('#all-list .grp').forEach(g => { let n = g.nextElementSibling, any = false; while (n && n.classList.contains('prow')) { if (!n.hidden) any = true; n = n.nextElementSibling; } g.hidden = !any; });
  });
  drawTree();
}
function drawTree() {
  const tree = document.getElementById('tree'), svg = document.getElementById('tree-lines');
  if (!tree || !svg) return;
  const trc = tree.getBoundingClientRect();
  svg.setAttribute('width', trc.width); svg.setAttribute('height', trc.height); svg.setAttribute('viewBox', `0 0 ${trc.width} ${trc.height}`);
  const pos = {};
  tree.querySelectorAll('.tnode').forEach(n => { const r = n.getBoundingClientRect(); pos[n.dataset.id] = { x: r.left - trc.left + r.width / 2, top: r.top - trc.top, bot: r.bottom - trc.top }; });
  svg.innerHTML = EDGES.map(([a, b]) => { const p = pos[a], q = pos[b]; if (!p || !q) return ''; const my = (p.bot + q.top) / 2; return `<path d="M${p.x} ${p.bot} C${p.x} ${my} ${q.x} ${my} ${q.x} ${q.top}"/>`; }).join('');
}
window.addEventListener('resize', () => { if (document.getElementById('tree')) drawTree(); });

function pageTopic(id) {
  const t = TOPIC[id]; if (!t) return pageNotFound();
  const Ls = E.LESSONS[id];
  const notes = (Ls && Ls.notes) || {};
  const list = t.warm ? ORDER.warm : ORDER.nc;
  const c = countSolved(t.problems);
  const siblings = t.warm ? WARM : NC;
  const si = siblings.indexOf(t);
  const intro = notes.intro ? (typeof notes.intro === 'string' ? notes.intro : notes.intro[L()] || notes.intro.en) : '';
  const signals = notes.signals ? (Array.isArray(notes.signals) ? notes.signals : notes.signals[L()] || notes.signals.en) : null;
  const nx = firstUnsolved(t.problems);
  const nextTopic = siblings[si + 1];
  shell(head({ crumbs: `<a href="${t.warm ? '#warmup' : '#dsa150'}">${t.warm ? 'Warm-up 50' : 'DSA 150'}</a> › <span>${esc(t.name)}</span>`, kicker: t.warm ? tr('Warm-up group', 'Warm-up group') : `${tr('Topic', 'Topic')} ${si + 1} ${tr('of', 'of')} 18`, title: esc(t.name), sub: intro }),
    `${Ls ? `<section class="tvideo" data-toc="${tr('Video', 'Video')}"><h2>${tr('Watch first', 'Pehle dekho')}</h2><div id="player-mount"></div></section>` : (t.warm ? `<div class="note-card">${tr('These use ideas from the <a href="#python">Python course</a> and the <a href="#gym">Logic Gym</a>.', 'Inme <a href="#python">Python course</a> aur <a href="#gym">Logic Gym</a> ke ideas lagte hain.')}</div>` : '')}
    ${signals ? `<section class="keyideas" data-toc="${tr('When to use it', 'Kab use karna hai')}"><div><h2>${tr('When to reach for it', 'Kab use karna hai')}</h2><ul>${signals.map(s => `<li>${s}</li>`).join('')}</ul></div>${notes.template ? `<div><h2>${esc(notes.templateTitle || tr('Template to remember', 'Yaad rakhne wala template'))}</h2>${codeBlock(notes.template, notes.templateFile || 'template.py')}</div>` : ''}</section>` : ''}
    <section class="plist" data-toc="${tr('Problems', 'Problems')}"><h2>${tr('Problems, in order', 'Problems, order mein')}</h2>${t.problems.map(pid => problemRow(pid, list.indexOf(pid))).join('')}</section>
    <div class="next-row">${si > 0 ? `<a class="btn" href="#t-${siblings[si - 1].id}">← ${esc(siblings[si - 1].name)}</a>` : '<span></span>'}${nextTopic ? `<a class="btn" href="#t-${nextTopic.id}">${esc(nextTopic.name)} →</a>` : ''}</div>`,
    { stat: { label: tr('Solved in this topic', 'Is topic mein solved'), n: c, total: t.problems.length }, actions: nx ? upNext('#p-' + nx, P[nx].title) : nextTopic ? upNext('#t-' + nextTopic.id, nextTopic.name) : '', toc: true });
  hydrate(view);
  if (Ls) mountPlayer(document.getElementById('player-mount'), id);
}

function pageProblem(pid) {
  const p = P[pid]; if (!p) return pageNotFound();
  const t = TOPIC[p.topic];
  const list = t.warm ? ORDER.warm : ORDER.nc;
  const i = list.indexOf(pid);
  const prev = list[i - 1], next = list[i + 1];
  const reveal = store.get('reveal', false);
  const hi = L() === 'hi';
  const sec = (n, title, body, spoiler) => spoiler
    ? `<details class="sec" data-toc="${esc(title)}"${reveal ? ' open' : ''}><summary><span class="sn">${n}</span>${title}<span class="sum-hint">${tr('Try first, then open', 'Pehle try karo, phir kholo')}</span></summary><div class="sbody">${body}</div></details>`
    : `<section class="sec open" data-toc="${esc(title)}"><h2><span class="sn">${n}</span>${title}</h2><div class="sbody">${body}</div></section>`;
  let n = 0;
  const parts = [];
  if (hi && p.hinglish) parts.push(`<section class="sec open hing" data-toc="Hinglish mein samjho"><h2><span class="sn">HI</span>Hinglish mein samjho</h2><div class="sbody prose">${p.hinglish}</div></section>`);
  parts.push(sec(++n, tr('The problem in plain words', 'Problem seedhe shabdon mein (English)'), `${p.problem}${p.example ? `<div class="example"><span>${tr('Example', 'Example')}</span><code>${esc(p.example)}</code></div>` : ''}`));
  if (p.analogy) parts.push(sec(++n, tr('Real-life analogy', 'Real-life analogy (English)'), `<div class="callout analogy">${p.analogy}</div>`));
  if (p.ask && p.ask.length) parts.push(sec(++n, tr('Questions to ask before solving', 'Solve karne se pehle ke sawaal'), `<ul>${p.ask.map(a => `<li>${a}</li>`).join('')}</ul>`));
  parts.push(sec(++n, tr('Think it through', 'Socho (hints)'), `<p class="muted">${tr('Reveal one hint at a time. After each one, stop and try to finish the idea yourself.', 'Ek-ek hint kholo. Har hint ke baad ruko aur khud idea poora karne ki koshish karo.')}</p><ol class="hints">${p.hints.map((h, k) => `<li${k === 0 || reveal ? '' : ' hidden'}>${h}</li>`).join('')}</ol>${p.hints.length > 1 && !reveal ? `<button type="button" class="btn sm" id="next-hint">${tr('Show next hint', 'Agla hint')} (1 / ${p.hints.length})</button>` : ''}`));
  if (p.brute) parts.push(sec(++n, tr('Brute force: the first idea that works', 'Brute force: pehla idea jo chalta hai'), `${p.brute}${p.brutecx ? `<p class="cx"><b>${tr('Cost', 'Cost')}:</b> ${esc(p.brutecx)}</p>` : ''}`, true));
  if (p.signal) parts.push(sec(++n, tr('Spot the pattern', 'Pattern pehchano'), `<div class="signal">${p.signal}</div>`, true));
  parts.push(sec(++n, tr('Best approach, step by step', 'Best approach, step by step'), `<ol class="steps-list">${p.optimal.map(o => `<li>${o}</li>`).join('')}</ol><p class="cx"><b>${tr('Complexity', 'Complexity')}:</b> ${esc(p.cx)}</p>`, true));
  const needs = /ListNode|TreeNode/.test(p.code) && !/class (ListNode|TreeNode)/.test(p.code);
  parts.push(sec(++n, tr('Python solution', 'Python solution'), codeBlock(p.code, p.title.replace(/[^A-Za-z0-9]+/g, '_').toLowerCase() + '.py') + (needs ? `<p class="muted">${tr('Uses', 'Isme')} <code>${/TreeNode/.test(p.code) ? 'TreeNode' : 'ListNode'}</code> ${tr('from the', 'use hota hai, definition')} <a href="#t-${/TreeNode/.test(p.code) ? 'trees' : 'linked-list'}">${tr('topic page', 'topic page pe')}</a>.</p>` : '') + `<p class="muted">${tr('On LeetCode, paste the body inside the method of <code>class Solution</code> and add <code>self</code>.', 'LeetCode pe body ko <code>class Solution</code> ke method ke andar paste karo aur <code>self</code> jodo.')}</p>`, true));
  if (p.trace) parts.push(sec(++n, tr('Dry run on the example', 'Example pe dry run'), traceHTML(p.trace), true));
  if (p.mistakes && p.mistakes.length) parts.push(sec(++n, tr('Mistakes to avoid', 'In galtiyon se bacho'), `<ul class="mist">${p.mistakes.map(m => `<li>${m}</li>`).join('')}</ul>`, true));
  if (!hi && p.hinglish) parts.push(`<details class="sec" data-toc="Hinglish mein samjho"><summary><span class="sn">HI</span>Hinglish mein samjho<span class="sum-hint">Hindi + English</span></summary><div class="sbody prose">${p.hinglish}</div></details>`);
  const nextHref = next ? '#p-' + next : t.warm ? '#dsa150' : '#path', nextName = next ? P[next].title : t.warm ? 'DSA 150' : tr('Your path', 'Tumhara raasta');
  shell(head({ crumbs: `<a href="${t.warm ? '#warmup' : '#dsa150'}">${t.warm ? 'Warm-up 50' : 'DSA 150'}</a> › <a href="#t-${t.id}">${esc(t.name)}</a> › <span>#${i + 1}</span>`, title: esc(p.title),
      extra: `<div class="meta-row">${diffPill(p.diff)}<span class="chip">${esc(p.pattern || '')}</span>${p.slug ? `<a href="https://leetcode.com/problems/${p.slug}/" target="_blank" rel="noopener">LeetCode ${p.lcnum} ↗</a>` : ''}</div>` }),
    `<div class="prob-body">${parts.join('')}</div>
    <div class="next-row">${prev ? `<a class="btn" href="#p-${prev}">← ${esc(P[prev].title)}</a>` : '<span></span>'}<a class="btn pri" href="${nextHref}">${esc(nextName)} →</a></div>`,
    { stat: { label: esc(t.name), n: countSolved(t.problems), total: t.problems.length },
      actions: `<button type="button" class="btn pri solve-btn" id="solve-btn" aria-pressed="${isSolved(pid)}"></button><label class="rev"><input type="checkbox" id="reveal"${reveal ? ' checked' : ''}> ${tr('Show all answers', 'Saare answers dikhao')}</label>${upNext(nextHref, nextName)}`, toc: true });
  hydrate(view);
  const nh = document.getElementById('next-hint');
  if (nh) nh.onclick = () => { const h = view.querySelector('.hints li[hidden]'); if (h) h.hidden = false; const shown = view.querySelectorAll('.hints li:not([hidden])').length; nh.textContent = shown >= p.hints.length ? tr('All hints shown', 'Saare hints dikh gaye') : `${tr('Show next hint', 'Agla hint')} (${shown} / ${p.hints.length})`; nh.disabled = shown >= p.hints.length; };
  const sb = document.getElementById('solve-btn');
  const paint = () => { const s = isSolved(pid); sb.classList.toggle('solved', s); sb.textContent = s ? tr('✓ Solved', '✓ Solve ho gaya') : tr('Mark as solved', 'Solved mark karo'); sb.setAttribute('aria-pressed', String(s)); const st = view.querySelector('.coach-stat'); if (st) { const c = countSolved(t.problems); st.querySelector('b').innerHTML = `${c}<small> / ${t.problems.length}</small>`; st.querySelector('.pbar i').style.width = (c / t.problems.length * 100) + '%'; } };
  paint();
  sb.onclick = () => { toggleSolved(pid); paint(); cheerSolved(isSolved(pid)); };
  document.getElementById('reveal').onchange = e => { store.set('reveal', e.target.checked); pageProblem(pid); mascotRoute('p-' + pid); };
  /* mark sections in the on-this-page list once they have been opened */
  view.querySelectorAll('details.sec').forEach(d => d.addEventListener('toggle', () => { const a = view.querySelector(`#toc-list a[data-to="${d.id}"]`); if (a && d.open) a.classList.add('seen'); }));
  wireTrace(view);
}
function traceHTML(t) {
  return `<div class="trace-box"><div class="tscroll"><table class="dry"><thead><tr>${t.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.rows.map((r, k) => `<tr${k ? ' hidden' : ''}>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
  <div class="trace-ctl"><button type="button" class="btn sm" data-tr="prev">← ${tr('Step back', 'Peeche')}</button><button type="button" class="btn sm pri" data-tr="next">${tr('Next step', 'Agla step')} →</button><button type="button" class="btn sm" data-tr="all">${tr('Show all', 'Sab dikhao')}</button><span class="muted" data-tr-count>1 / ${t.rows.length}</span></div></div>`;
}
function wireTrace(root) {
  root.querySelectorAll('.trace-box').forEach(box => {
    const rows = [...box.querySelectorAll('tbody tr')];
    let k = 1;
    const upd = () => { rows.forEach((r, i) => { r.hidden = i >= k; r.classList.toggle('cur', i === k - 1); }); box.querySelector('[data-tr-count]').textContent = `${k} / ${rows.length}`; };
    box.querySelector('[data-tr=next]').onclick = () => { k = Math.min(rows.length, k + 1); upd(); };
    box.querySelector('[data-tr=prev]').onclick = () => { k = Math.max(1, k - 1); upd(); };
    box.querySelector('[data-tr=all]').onclick = () => { k = rows.length; upd(); };
    upd();
  });
}
function pageNotFound() {
  shell(head({ title: tr("That page doesn't exist", 'Ye page nahi mila'), sub: tr('The link may be old, or it has a typo.', 'Link purana ho sakta hai, ya usmein typo hai.') }),
    `<p><a class="btn pri" href="#path">${tr('Back to your path', 'Raaste pe wapas')}</a></p>`, {});
}

function routeLabel(r) {
  if (r.startsWith('p-')) return P[r.slice(2)] ? P[r.slice(2)].title : null;
  if (r.startsWith('t-')) return TOPIC[r.slice(2)] ? TOPIC[r.slice(2)].name : null;
  if (r.startsWith('m-')) return MOD[r.slice(2)] ? MOD[r.slice(2)].name : null;
  return { math: tr('Math for Logic', 'Logic ke liye Math'), 'video-math': tr('Math recap video', 'Math recap video'), python: 'Python', gym: 'Logic Gym', warmup: 'Warm-up 50', dsa150: 'DSA 150' }[r] || null;
}
function route() {
  let r = decodeURIComponent(location.hash.slice(1));
  if (r === 'video-dart') r = 'python';
  if (r === 'neet' + 'code') r = 'dsa150';
  if (r === 'video-think') r = 'm-g1';
  if (player) { player.destroy(); player = null; }
  navActive(r);
  if (r === '' || r === 'path') pageHome();
  else if (r === 'math') pageModuleList('math');
  else if (r === 'video-math') pageMathVideo();
  else if (r === 'python') pageModuleList('python');
  else if (r === 'gym') pageModuleList('gym');
  else if (r.startsWith('m-')) pageModule(r.slice(2));
  else if (r === 'warmup') pageWarmup();
  else if (r === 'dsa150') pageDsa150();
  else if (r.startsWith('t-')) pageTopic(r.slice(2));
  else if (r.startsWith('p-')) pageProblem(r.slice(2));
  else pageNotFound();
  if (r && r !== 'path' && routeLabel(r)) store.set('last', r);
  window.scrollTo(0, 0);
  updateChip();
  mascotRoute(r);
}
/* ---------- Bitu (mascot) + night mode ---------- */
const pick = a => a[Math.floor(Math.random() * a.length)];
const LINES = {
  home: [['Hi, I am Bitu! One rung at a time, and we reach DSA together.', 'Namaste, main Bitu hoon! Ek-ek seedhi chadh ke DSA tak saath pahunchenge.'], ['Welcome back! Continue where you left off.', 'Wapas aaye! Jahan chhoda tha wahin se shuru karo.']],
  math: [['Maths first. It makes every loop easier.', 'Pehle maths. Isse har loop aasaan lagega.'], ['Pause at every timer and try it yourself!', 'Har timer pe ruko aur khud try karo!']],
  python: [['Type along with the videos. Your fingers learn too!', 'Video ke saath type karo. Ungliyan bhi seekhti hain!'], ['Predict the output before you run it.', 'Chalane se pehle output predict karo.']],
  gym: [['Logic is a muscle. Let us train it!', 'Logic ek muscle hai. Chalo train karein!'], ['Do the drills on paper first. No peeking!', 'Drills pehle kaagaz pe karo. Chupke se mat dekhna!']],
  warmup: [['Warm-ups first. No skipping the stretches!', 'Pehle warm-up. Stretching skip nahi!'], ['Small problems build big logic.', 'Chhote problems se bada logic banta hai.']],
  dsa: [['150 rungs. We climb one at a time.', '150 seedhiyan. Ek-ek karke chadhenge.'], ['Watch the topic video before its problems.', 'Problems se pehle topic ka video dekho.']],
  problem: [['Try it yourself first. Stuck for 15 minutes? Open one hint.', 'Pehle khud try karo. 15 minute atke? Ek hint kholo.'], ['Solve a tiny example by hand. Your brain is the algorithm.', 'Chhota example haath se solve karo. Tumhara dimaag hi algorithm hai.']],
  lost: [['Hmm, I cannot find this page.', 'Hmm, ye page mujhe nahi mila.']],
  tips: [['Stuck? Write the brute force first. Then ask: what work am I repeating?', 'Atke? Pehle brute force likho. Phir poocho: kaunsa kaam dohra raha hoon?'], ['Say the first and last value of every loop out loud.', 'Har loop ki pehli aur aakhri value zor se bolo.'], ['Constraints are hints. n up to 10^5 means aim for O(n log n).', 'Constraints hint hain. n 10^5 tak ho toh O(n log n) ka target rakho.'], ['Seen before? Use a set. Counting? Use a dict.', 'Pehle dekha? Set use karo. Ginti? Dict use karo.'], ['Revisit a solved problem after 3 days. Can you still do it?', '3 din baad solved problem dobara karo. Ab bhi ho raha hai?'], ['Draw it! Arrays as boxes, pointers as arrows.', 'Bana ke dekho! Arrays dabbe, pointers teer.']]
};
const say2 = l => tr(l[0], l[1]);
function mascotFor(r) {
  if (r === '' || r === 'path') return ['climb', 'home'];
  if (r === 'math' || r === 'video-math' || r.startsWith('m-mt')) return ['math', 'math'];
  if (r === 'python' || r.startsWith('m-py')) return ['type', 'python'];
  if (r === 'gym' || r.startsWith('m-g')) return ['lift', 'gym'];
  if (r.startsWith('p-')) return ['think', 'problem'];
  if (r === 'warmup' || r.startsWith('t-w-')) return ['jog', 'warmup'];
  if (r === 'dsa150' || r.startsWith('t-')) return ['climb', 'dsa'];
  return ['confused', 'lost'];
}
let routePose = 'idle', spoilerNudged = false;
function mascotRoute(r) {
  if (!window.Mascot) return;
  const host = document.getElementById('bitu-host');
  if (!host) return;
  Mascot.mount(host, document.getElementById('bitu-say'));
  const [pose, key] = mascotFor(r === 'neet' + 'code' ? 'dsa150' : r);
  spoilerNudged = false;
  const returning = key === 'home' && hasProgress();
  Mascot.say(say2(key === 'home' ? LINES.home[returning ? 1 : 0] : pick(LINES[key])));
  if (pose === 'wave') { routePose = 'idle'; Mascot.pose('idle'); Mascot.react('wave'); }
  else { routePose = pose; Mascot.pose(pose); }
}
function setupMascot() {
  if (!window.Mascot) return;
  document.addEventListener('poke', () => Mascot.react(pick(['cheer', 'wave', 'nod', 'idea']), say2(pick(LINES.tips))));
  document.addEventListener('toggle', e => {
    const d = e.target;
    if (!d.open || !d.matches) return;
    if (d.matches('.dans')) Mascot.react('nod', tr('Did you predict it right?', 'Sahi predict kiya?'));
    else if (d.matches('.sec') && !spoilerNudged) { spoilerNudged = true; Mascot.react('idea', tr('Got the idea? Close it and write the code yourself.', 'Idea mil gaya? Band karo aur code khud likho.')); }
  }, true);
  window.addEventListener('lessonstate', e => {
    if (e.detail === 'play') Mascot.pose('watch');
    else if (e.detail === 'pause') Mascot.pose(routePose);
    else if (e.detail === 'done') { Mascot.pose(routePose); Mascot.react('cheer', tr('You finished the video! Now the drills.', 'Video poora ho gaya! Ab drills.')); }
  });
}
function cheerSolved(on) {
  if (!window.Mascot || !on) return;
  const n = countSolved(ORDER.warm) + countSolved(ORDER.nc);
  Mascot.react('cheer', n % 10 === 0 ? tr(`${n} solved! That is a big rung. Keep climbing!`, `${n} solve ho gaye! Badi seedhi chadh li. Chadhte raho!`) : pick([tr('Solved! Great work.', 'Solve ho gaya! Shabaash!'), tr('Another rung climbed!', 'Ek aur seedhi chadh li!')]));
}
/* night mode: follows the system until you choose */
const sysDark = matchMedia('(prefers-color-scheme: dark)');
const isDark = () => (document.documentElement.dataset.theme || (sysDark.matches ? 'dark' : 'light')) === 'dark';
function paintTheme() {
  const b = document.getElementById('theme-btn'); if (!b) return;
  const lab = isDark() ? tr('Switch to day mode', 'Day mode on karo') : tr('Switch to night mode', 'Night mode on karo');
  b.setAttribute('aria-label', lab); b.title = lab; b.setAttribute('aria-pressed', String(isDark()));
}
function toggleTheme() {
  const next = isDark() ? 'light' : 'dark';
  const h = document.documentElement;
  h.classList.add('theme-anim');
  h.dataset.theme = next;
  store.set('theme', next);
  setTimeout(() => h.classList.remove('theme-anim'), 450);
  paintTheme();
  if (window.Mascot) next === 'dark' ? Mascot.react('sleep', tr('Night mode on. Easy on the eyes.', 'Night mode on. Aankhon ko aaram.')) : Mascot.react('stretch', tr('Good morning! Day mode on.', 'Good morning! Day mode on.'));
}
document.getElementById('theme-btn').onclick = toggleTheme;
sysDark.addEventListener('change', paintTheme);
setupMascot();
window.addEventListener('hashchange', route);
paintLang();
paintTheme();
route();
})();
