/* DSA Path app (Python edition): router, path, Python course, Logic Gym, Warm-up 50, DSA 150, progress, EN/Hinglish. */
(function () {
'use strict';
const DATA = JSON.parse(document.getElementById('data').textContent);
const P = DATA.problems;
const TOPICS = DATA.topics;
const MODS = DATA.modules;
const MOD = {};
MODS.forEach((m, i) => { MOD[m.id] = m; m.index = i; });
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
    : route === 'video-math' ? 'math'
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
document.querySelectorAll('.lang button').forEach(b => b.onclick = () => { const changed = b.dataset.l !== L(); E.setLang(b.dataset.l); paintLang(); paintTheme(); quietRoute = changed; route(); if (changed && window.Mascot) L() === 'hi' ? Mascot.react('namaste', 'Namaste! Ab sab Hinglish mein.') : Mascot.react('wave', 'Hello! Switched to English.'); });

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

/* ---------- pages ---------- */
function stepsDef() {
  return [
    { n: 1, t: tr('Math for Logic (video)', 'Logic ke liye Math (video)'), d: tr('Modulo, digits, primes, powers, logs, binary, counting, ranges, grids, Big O: the ideas every problem quietly uses.', 'Modulo, digits, primes, powers, logs, binary, counting, ranges, grids, Big O: wo ideas jo har problem chupke se use karti hai.'), href: '#video-math', prog: () => lessonProgress('math') },
    { n: 2, t: tr('Python from zero', 'Python bilkul shuru se'), d: tr('21 modules, each with a short video, a deep theory page and practice drills. From print() to heapq.', '21 modules, har ek mein chhota video, gehri theory aur practice drills. print() se heapq tak.'), href: '#python', prog: () => countMods(PY) / PY.length, label: () => `${countMods(PY)} / ${PY.length}` },
    { n: 3, t: tr('Logic Gym', 'Logic Gym'), d: tr('How to think, then mastery drills on loops, patterns, lists, strings and debugging. Finish this before the Warm-up 50.', 'Kaise sochein, phir loops, patterns, lists, strings aur debugging ke mastery drills. Warm-up 50 se pehle ye poora karo.'), href: '#gym', prog: () => countMods(GYM) / GYM.length, label: () => `${countMods(GYM)} / ${GYM.length}` },
    { n: 4, t: 'Warm-up 50', d: tr('Reverse a string, largest number, anagram, palindrome, primes, sorting… each with an analogy and Hinglish explanation.', 'String reverse, sabse bada number, anagram, palindrome, primes, sorting… har ek analogy aur Hinglish explanation ke saath.'), href: '#warmup', prog: () => countSolved(ORDER.warm) / 50, label: () => `${countSolved(ORDER.warm)} / 50` },
    { n: 5, t: 'DSA 150', d: tr('18 topics, each with an explainer video, and 150 problems from brute force to the best approach, in Python.', '18 topics, har ek ka explainer video, aur 150 problems brute force se best approach tak, Python mein.'), href: '#dsa150', prog: () => countSolved(ORDER.nc) / 150, label: () => `${countSolved(ORDER.nc)} / 150` }
  ];
}
function pageHome() {
  const last = store.get('last', null);
  const lastLabel = last && routeLabel(last);
  const done = countSolved(ORDER.warm) + countSolved(ORDER.nc);
  view.innerHTML = `
  <section class="hero">
    <div class="hero-t">
      <div class="kicker">${tr('Your path', 'Tumhara raasta')}</div>
      <h1>${tr('From zero logic to DSA 150', 'Zero logic se DSA 150 tak')}</h1>
      <p>${tr('Five steps, in order. Watch, read, then practise. Everything is in Python, and every explanation is available in Hinglish too (switch at the top).', 'Paanch steps, order mein. Dekho, padho, phir practice karo. Sab Python mein hai, aur har explanation Hinglish mein bhi hai (upar se switch karo).')}</p>
      <div class="hero-cta">
        ${lastLabel ? `<a class="btn pri" href="#${last}">${tr('Continue', 'Wahin se shuru')}: ${esc(lastLabel)}</a>` : `<a class="btn pri" href="#video-math">${tr('Start with the Math video', 'Math video se shuru karo')}</a>`}
        <a class="btn" href="#python">${tr('Python course', 'Python course')}</a>
      </div>
    </div>
    <div class="hero-stat"><div class="big-n">${done}<span>/ 200</span></div><div class="muted">${tr('problems solved', 'problems solve kiye')}</div>${bar(done, 200)}</div>
  </section>
  <ol class="steps">
    ${stepsDef().map(s => { const f = s.prog(); const label = s.label ? s.label() : (f >= 1 ? tr('Watched', 'Dekh liya') : f > 0 ? Math.round(f * 100) + '%' : tr('Not started', 'Shuru nahi kiya')); return `<li class="step${f >= 1 ? ' complete' : ''}"><span class="snum">${s.n}</span><div class="sbody"><a href="${s.href}" class="stitle">${esc(s.t)}</a><p>${esc(s.d)}</p><div class="sprog">${bar(Math.round(f * 100), 100)}<span>${label}</span></div></div></li>`; }).join('')}
  </ol>
  <section class="plan">
    <h2>${tr('A realistic pace', 'Ek realistic speed')}</h2>
    <div class="plan-grid">
      <div><b>${tr('Week 1', 'Week 1')}</b><span>${tr('Math video + Python modules 1–8. Type every example.', 'Math video + Python modules 1–8. Har example khud type karo.')}</span></div>
      <div><b>${tr('Week 2', 'Week 2')}</b><span>${tr('Python modules 9–21.', 'Python modules 9–21.')}</span></div>
      <div><b>${tr('Week 3', 'Week 3')}</b><span>${tr('Logic Gym. Do every drill on paper first.', 'Logic Gym. Har drill pehle paper pe.')}</span></div>
      <div><b>${tr('Weeks 4–5', 'Week 4–5')}</b><span>${tr('Warm-up 50, about 4 a day.', 'Warm-up 50, roz lagbhag 4.')}</span></div>
      <div><b>${tr('Weeks 6–14', 'Week 6–14')}</b><span>${tr('DSA 150, about 2 a day. Watch each topic video first.', 'DSA 150, roz lagbhag 2. Har topic ka video pehle.')}</span></div>
      <div><b>${tr('Every Sunday', 'Har Sunday')}</b><span>${tr('Re-solve 5 old problems without looking.', '5 purani problems bina dekhe dobara solve karo.')}</span></div>
    </div>
  </section>`;
}
function pageMathVideo() {
  view.innerHTML = `<div class="phead"><div class="kicker">${tr('Step 1', 'Step 1')}</div><h1>${tr('Math for Logic', 'Logic ke liye Math')}</h1>
  <p>${tr('Every math idea you need before coding problems, from zero. Use the language switch at the top for Hinglish narration.', 'Coding problems se pehle chahiye har math idea, bilkul shuru se. Hinglish narration ke liye upar language switch karo.')}</p></div>
  <div id="player-mount"></div>
  <div class="next-row"><span></span><a class="btn pri" href="#python">${tr('Next: Python from zero →', 'Aage: Python shuru se →')}</a></div>`;
  mountPlayer(document.getElementById('player-mount'), 'math');
}
function pageModuleList(kind) {
  const list = kind === 'python' ? PY : GYM;
  const isPy = kind === 'python';
  view.innerHTML = `
  <div class="phead"><div class="kicker">${isPy ? tr('Step 2', 'Step 2') : tr('Step 3', 'Step 3')}</div>
  <h1>${isPy ? tr('Python from zero', 'Python bilkul shuru se') : 'Logic Gym'}</h1>
  <p>${isPy ? tr('Every module has a short video, a detailed theory page (English or Hinglish) and drills that check your understanding. Every code sample on these pages was run to confirm its output.', 'Har module mein chhota video, detailed theory page (English ya Hinglish) aur drills hain. Yahan ka har code sample chala ke output confirm kiya gaya hai.') : tr('Mastery drills before the Warm-up 50. Predict the output, write the function, fix the bug. Do each on paper first, then check the answer.', 'Warm-up 50 se pehle mastery drills. Output predict karo, function likho, bug theek karo. Pehle paper pe, phir answer check karo.')}</p>
  <div class="phead-stat">${bar(countMods(list), list.length)} <span>${countMods(list)} / ${list.length} ${tr('complete', 'complete')}</span></div></div>
  <section class="plist">${list.map((m, i) => moduleRow(m, i)).join('')}</section>
  <div class="next-row"><span></span><a class="btn pri" href="#${isPy ? 'gym' : 'warmup'}">${isPy ? tr('Next: Logic Gym →', 'Aage: Logic Gym →') : tr('Next: Warm-up 50 →', 'Aage: Warm-up 50 →')}</a></div>`;
}
function pageModule(id) {
  const m = MOD[id]; if (!m) return pageNotFound();
  const list = m.kind === 'python' ? PY : GYM;
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
  view.innerHTML = `
  <nav class="crumbs"><a href="#${m.kind === 'python' ? 'python' : 'gym'}">${m.kind === 'python' ? 'Python' : 'Logic Gym'}</a> › <span>${tr('Module', 'Module')} ${i + 1}</span></nav>
  <div class="phead"><div class="kicker">${m.kind === 'python' ? 'Python' : 'Logic Gym'} · ${i + 1} / ${list.length}</div><h1>${esc(m.name)}</h1><p>${esc(m.summary)}</p>
    <div class="phead-stat"><button type="button" class="btn sm${modsDone.has(m.id) ? ' solved' : ''}" id="mod-done">${modsDone.has(m.id) ? tr('✓ Complete', '✓ Complete') : tr('Mark module complete', 'Module complete mark karo')}</button></div></div>
  ${hasVideo ? `<section class="tvideo"><h2>${tr('Watch: short video', 'Dekho: chhota video')}</h2><div id="player-mount"></div></section>` : ''}
  <section class="theory">
    <div class="theory-head"><h2>${tr('Theory', 'Theory')}</h2><span class="muted">${tr('Switch to Hinglish at the top of the page.', 'English ke liye upar switch karo.')}</span></div>
    <article class="prose">${L() === 'hi' ? m.hi : m.en}</article>
  </section>
  <section class="drills"><h2>${tr('Practice drills', 'Practice drills')} <span class="muted">${tr('Try each on paper before opening the answer.', 'Answer kholne se pehle paper pe try karo.')}</span></h2>${drills}</section>
  <div class="next-row">${prev ? `<a class="btn" href="#m-${prev.id}">← ${esc(prev.name)}</a>` : '<span></span>'}${next ? `<a class="btn pri" href="#m-${next.id}">${esc(next.name)} →</a>` : `<a class="btn pri" href="#${m.kind === 'python' ? 'gym' : 'warmup'}">${m.kind === 'python' ? tr('On to the Logic Gym →', 'Ab Logic Gym →') : tr('On to the Warm-up 50 →', 'Ab Warm-up 50 →')}</a>`}</div>`;
  hydrate(view);
  document.getElementById('mod-done').onclick = () => { toggleMod(m.id); pageModule(id); if (modsDone.has(m.id) && window.Mascot) Mascot.react('cheer', tr('Module complete! On to the next one.', 'Module complete! Chalo agle pe.')); };
  if (hasVideo) mountPlayer(document.getElementById('player-mount'), m.id);
}
function pageWarmup() {
  view.innerHTML = `
  <div class="phead"><div class="kicker">${tr('Step 4', 'Step 4')}</div><h1>Warm-up 50</h1>
  <p>${tr('Classic beginner programs. Each page: the problem in plain words, a real-life analogy, hints one at a time, brute force, the better idea, Python code, a dry run, and a full Hinglish explanation.', 'Classic beginner programs. Har page: seedhe shabdon mein problem, real-life analogy, ek-ek hint, brute force, behtar idea, Python code, dry run, aur poora Hinglish explanation.')}</p>
  <div class="phead-stat">${bar(countSolved(ORDER.warm), 50)} <span>${countSolved(ORDER.warm)} / 50</span></div></div>
  <div class="note-card">${tr('<b>Before these:</b> finish the <a href="#gym">Logic Gym</a>. If a problem feels hard, revisit the matching Python module.', '<b>Isse pehle:</b> <a href="#gym">Logic Gym</a> poora karo. Koi problem mushkil lage toh matching Python module dobara dekho.')}</div>
  ${WARM.map(t => `<section class="plist"><h2><a href="#t-${t.id}">${esc(t.name)}</a> <span class="muted">${countSolved(t.problems)}/${t.problems.length}</span></h2>${t.problems.map(pid => problemRow(pid, ORDER.warm.indexOf(pid))).join('')}</section>`).join('')}`;
}
function pageDsa150() {
  const done = countSolved(ORDER.nc);
  view.innerHTML = `
  <div class="phead"><div class="kicker">${tr('Step 5', 'Step 5')}</div><h1>${tr('DSA 150 roadmap', 'DSA 150 roadmap')}</h1>
  <p>${tr('Follow the arrows. Each topic starts with an explainer video, then its problems in order.', 'Arrows follow karo. Har topic ek explainer video se shuru hota hai, phir uski problems order mein.')}</p>
  <div class="phead-stat">${bar(done, 150)} <span>${done} / 150</span></div></div>
  <div class="tree" id="tree"><svg class="tree-lines" id="tree-lines" aria-hidden="true"></svg>
    ${LEVELS.map(lv => `<div class="tlevel">${lv.map(id => { const t = TOPIC[id]; const c = countSolved(t.problems); return `<a class="tnode${c === t.problems.length ? ' complete' : ''}" href="#t-${id}" data-id="${id}"><span class="tn-name">${esc(t.name)}</span><span class="tn-prog">${bar(c, t.problems.length)}<span>${c}/${t.problems.length}</span></span></a>`; }).join('')}</div>`).join('')}
  </div>
  <section class="plist all">
    <div class="plist-head"><h2>${tr('All 150 problems', 'Saari 150 problems')}</h2>
      <div class="filters" role="group" aria-label="Filter">${['All', 'Easy', 'Medium', 'Hard', 'Unsolved'].map((f, i) => `<button type="button" class="fbtn${i ? '' : ' on'}" data-f="${f}">${f}</button>`).join('')}</div></div>
    <div id="all-list">${NC.map(t => `<h3 class="grp"><a href="#t-${t.id}">${esc(t.name)}</a></h3>${t.problems.map(pid => problemRow(pid, ORDER.nc.indexOf(pid))).join('')}`).join('')}</div>
  </section>`;
  const f = view.querySelectorAll('.fbtn');
  f.forEach(b => b.onclick = () => {
    f.forEach(x => x.classList.toggle('on', x === b));
    const k = b.dataset.f;
    view.querySelectorAll('#all-list .prow').forEach(r => { const pid = r.getAttribute('href').slice(3); r.hidden = !(k === 'All' || P[pid].diff === k || (k === 'Unsolved' && !isSolved(pid))); });
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
  view.innerHTML = `
  <nav class="crumbs"><a href="${t.warm ? '#warmup' : '#dsa150'}">${t.warm ? 'Warm-up 50' : 'DSA 150'}</a> › <span>${esc(t.name)}</span></nav>
  <div class="phead"><div class="kicker">${t.warm ? tr('Warm-up group', 'Warm-up group') : tr('Topic', 'Topic') + ' ' + (si + 1) + ' / 18'}</div><h1>${esc(t.name)}</h1>
  ${intro ? `<p>${intro}</p>` : ''}
  <div class="phead-stat">${bar(c, t.problems.length)} <span>${c} / ${t.problems.length}</span></div></div>
  ${Ls ? `<section class="tvideo"><h2>${tr('Watch first', 'Pehle dekho')}: ${esc(t.name)}</h2><div id="player-mount"></div></section>` : (t.warm ? `<div class="note-card">${tr('These use ideas from the <a href="#python">Python course</a> and the <a href="#gym">Logic Gym</a>.', 'Inme <a href="#python">Python course</a> aur <a href="#gym">Logic Gym</a> ke ideas lagte hain.')}</div>` : '')}
  ${signals ? `<section class="keyideas"><div><h2>${tr('When to reach for it', 'Kab use karna hai')}</h2><ul>${signals.map(s => `<li>${s}</li>`).join('')}</ul></div>${notes.template ? `<div><h2>${esc(notes.templateTitle || tr('Template to remember', 'Yaad rakhne wala template'))}</h2>${codeBlock(notes.template, notes.templateFile || 'template.py')}</div>` : ''}</section>` : ''}
  <section class="plist"><h2>${tr('Problems, in order', 'Problems, order mein')}</h2>${t.problems.map(pid => problemRow(pid, list.indexOf(pid))).join('')}</section>
  <div class="next-row">${si > 0 ? `<a class="btn" href="#t-${siblings[si - 1].id}">← ${esc(siblings[si - 1].name)}</a>` : '<span></span>'}${si < siblings.length - 1 ? `<a class="btn" href="#t-${siblings[si + 1].id}">${esc(siblings[si + 1].name)} →</a>` : ''}</div>`;
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
  const links = [];
  if (p.slug) links.push(`<a href="https://leetcode.com/problems/${p.slug}/" target="_blank" rel="noopener">LeetCode ${p.lcnum} ↗</a>`);
  const sec = (n, title, body, spoiler) => spoiler
    ? `<details class="sec"${reveal ? ' open' : ''}><summary><span class="sn">${n}</span>${title}<span class="sum-hint">${tr('Try first, then open', 'Pehle try karo, phir kholo')}</span></summary><div class="sbody">${body}</div></details>`
    : `<section class="sec open"><h2><span class="sn">${n}</span>${title}</h2><div class="sbody">${body}</div></section>`;
  let n = 0;
  const parts = [];
  if (hi && p.hinglish) {
    parts.push(`<section class="sec open hing"><h2><span class="sn">HI</span>Hinglish mein samjho</h2><div class="sbody prose">${p.hinglish}</div></section>`);
  }
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
  if (!hi && p.hinglish) parts.push(`<details class="sec"><summary><span class="sn">HI</span>Hinglish mein samjho<span class="sum-hint">Hindi + English</span></summary><div class="sbody prose">${p.hinglish}</div></details>`);

  view.innerHTML = `
  <nav class="crumbs"><a href="${t.warm ? '#warmup' : '#dsa150'}">${t.warm ? 'Warm-up 50' : 'DSA 150'}</a> › <a href="#t-${t.id}">${esc(t.name)}</a> › <span>#${i + 1}</span></nav>
  <header class="prob-head">
    <div><h1>${esc(p.title)}</h1><div class="meta-row">${diffPill(p.diff)}<span class="chip">${esc(p.pattern || '')}</span>${links.join('')}</div></div>
    <div class="prob-actions">
      <button type="button" class="btn${isSolved(pid) ? ' solved' : ''}" id="solve-btn" aria-pressed="${isSolved(pid)}">${isSolved(pid) ? tr('✓ Solved', '✓ Solve ho gaya') : tr('Mark as solved', 'Solved mark karo')}</button>
      <label class="rev"><input type="checkbox" id="reveal"${reveal ? ' checked' : ''}> ${tr('Show all answers', 'Saare answers dikhao')}</label>
    </div>
  </header>
  <div class="prob-body">${parts.join('')}</div>
  <div class="next-row">${prev ? `<a class="btn" href="#p-${prev}">← ${esc(P[prev].title)}</a>` : '<span></span>'}${next ? `<a class="btn pri" href="#p-${next}">${esc(P[next].title)} →</a>` : `<a class="btn pri" href="#${t.warm ? 'dsa150' : 'path'}">${t.warm ? tr('On to DSA 150 →', 'Ab DSA 150 →') : tr('Back to your path', 'Raaste pe wapas')}</a>`}</div>`;
  hydrate(view);
  const nh = document.getElementById('next-hint');
  if (nh) nh.onclick = () => { const h = view.querySelector('.hints li[hidden]'); if (h) h.hidden = false; const shown = view.querySelectorAll('.hints li:not([hidden])').length; nh.textContent = shown >= p.hints.length ? tr('All hints shown', 'Saare hints dikh gaye') : `${tr('Show next hint', 'Agla hint')} (${shown} / ${p.hints.length})`; nh.disabled = shown >= p.hints.length; };
  document.getElementById('solve-btn').onclick = e => { toggleSolved(pid); const b = e.currentTarget; const s = isSolved(pid); cheerSolved(s); b.classList.toggle('solved', s); b.textContent = s ? tr('✓ Solved', '✓ Solve ho gaya') : tr('Mark as solved', 'Solved mark karo'); b.setAttribute('aria-pressed', String(s)); };
  document.getElementById('reveal').onchange = e => { store.set('reveal', e.target.checked); pageProblem(pid); };
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
function pageNotFound() { view.innerHTML = `<div class="phead"><h1>${tr("That page doesn't exist", 'Ye page nahi mila')}</h1><p><a href="#path">${tr('Back to your path', 'Raaste pe wapas')}</a>.</p></div>`; }

function routeLabel(r) {
  if (r.startsWith('p-')) return P[r.slice(2)] ? P[r.slice(2)].title : null;
  if (r.startsWith('t-')) return TOPIC[r.slice(2)] ? TOPIC[r.slice(2)].name : null;
  if (r.startsWith('m-')) return MOD[r.slice(2)] ? MOD[r.slice(2)].name : null;
  return { 'video-math': tr('Math video', 'Math video'), python: 'Python', gym: 'Logic Gym', warmup: 'Warm-up 50', dsa150: 'DSA 150' }[r] || null;
}
function route() {
  let r = decodeURIComponent(location.hash.slice(1));
  if (r === 'video-dart') r = 'python';
  if (r === 'neet' + 'code') r = 'dsa150';
  if (r === 'video-think') r = 'm-g1';
  if (player) { player.destroy(); player = null; }
  navActive(r);
  if (r === '' || r === 'path') pageHome();
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
  if (r === '' || r === 'path') return ['wave', 'home'];
  if (r === 'video-math') return ['math', 'math'];
  if (r === 'python' || r.startsWith('m-py')) return ['type', 'python'];
  if (r === 'gym' || r.startsWith('m-g')) return ['lift', 'gym'];
  if (r.startsWith('p-')) return ['think', 'problem'];
  if (r === 'warmup' || r.startsWith('t-w-')) return ['jog', 'warmup'];
  if (r === 'dsa150' || r.startsWith('t-')) return ['climb', 'dsa'];
  return ['confused', 'lost'];
}
let lastLineKey = null, quietRoute = false, routePose = 'idle', spoilerNudged = false;
function mascotRoute(r) {
  if (!window.Mascot || !Mascot.el) return;
  const [pose, key] = mascotFor(r === 'neet' + 'code' ? 'dsa150' : r);
  spoilerNudged = false;
  if (pose === 'wave') { routePose = 'idle'; Mascot.pose('idle'); Mascot.react('wave'); }
  else { routePose = pose; Mascot.pose(pose); }
  if (quietRoute) { quietRoute = false; lastLineKey = key; return; }
  if (key !== lastLineKey) Mascot.say(say2(pick(LINES[key])), key === 'home' ? 6500 : 4200);
  lastLineKey = key;
}
function setupMascot() {
  if (!window.Mascot) return;
  Mascot.mount();
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
