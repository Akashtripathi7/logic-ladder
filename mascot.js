/* Bitu, the Logic Ladder mascot: an SVG robot that lives inside each page's coach panel.
   It holds a pose per page, a speech line, and short reactions to what the learner does.
   API: Mascot.mount(host) · Mascot.pose(name) · Mascot.say(text) · Mascot.react(name, text?) */
(function () {
const SVG = `
<svg class="bitu-svg" viewBox="0 0 120 150" aria-hidden="true">
  <defs>
    <linearGradient id="bitu-body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--bitu-hi)"/><stop offset="1" stop-color="var(--bitu-lo)"/></linearGradient>
    <radialGradient id="bitu-glow"><stop offset="0" stop-color="#fff6c2"/><stop offset=".6" stop-color="#ffd166"/><stop offset="1" stop-color="#ffd166" stop-opacity="0"/></radialGradient>
  </defs>
  <g class="p p-ladder"><g class="rungs">${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect x="16" y="${i * 20 - 20}" width="88" height="5" rx="2.5"/>`).join('')}</g><rect x="12" y="-10" width="7" height="170" rx="3.5"/><rect x="101" y="-10" width="7" height="170" rx="3.5"/></g>
  <ellipse class="shadow" cx="60" cy="143" rx="28" ry="5"/>
  <g class="bot">
    <g class="leg leg-l"><rect x="45" y="116" width="11" height="20" rx="5.5"/></g>
    <g class="leg leg-r"><rect x="64" y="116" width="11" height="20" rx="5.5"/></g>
    <g class="antenna"><rect x="58.5" y="30" width="3" height="18" rx="1.5"/><circle class="ant" cx="60" cy="28" r="5.5"/></g>
    <rect class="body" x="29" y="44" width="62" height="78" rx="28"/>
    <rect class="face" x="36" y="56" width="48" height="36" rx="15"/>
    <g class="eyes">
      <g class="eye"><ellipse cx="50" cy="73" rx="6.5" ry="7.5"/><circle class="pupil" cx="50" cy="74" r="3.4"/></g>
      <g class="eye"><ellipse cx="70" cy="73" rx="6.5" ry="7.5"/><circle class="pupil" cx="70" cy="74" r="3.4"/></g>
    </g>
    <g class="lids"><path d="M43 74 Q50 78 57 74"/><path d="M63 74 Q70 78 77 74"/></g>
    <circle class="cheek" cx="42" cy="84" r="3"/><circle class="cheek" cx="78" cy="84" r="3"/>
    <path class="mouth m-smile" d="M54 84 Q60 89 66 84"/>
    <ellipse class="mouth m-o" cx="60" cy="86" rx="3.4" ry="4"/>
    <path class="mouth m-big" d="M52 83 Q60 93 68 83 Z"/>
    <circle class="belly" cx="60" cy="106" r="4.5"/>
    <g class="arm arm-l"><rect x="23" y="68" width="11" height="31" rx="5.5"/><circle cx="28.5" cy="99" r="6.5"/></g>
    <g class="arm arm-r"><rect x="86" y="68" width="11" height="31" rx="5.5"/><circle cx="91.5" cy="99" r="6.5"/></g>
    <g class="p p-dumbbell"><rect x="18" y="33" width="84" height="5" rx="2.5"/><rect x="12" y="25" width="9" height="21" rx="3"/><rect x="99" y="25" width="9" height="21" rx="3"/></g>
    <g class="p p-laptop"><path d="M34 98 h52 l-4 20 h-44 z" class="lap-lid"/><rect x="26" y="117" width="68" height="6" rx="3" class="lap-base"/><text x="60" y="112" class="lap-logo">{ }</text></g>
    <g class="p p-phones"><path d="M30 70 Q30 38 60 38 Q90 38 90 70" class="band"/><rect x="24" y="62" width="11" height="20" rx="5"/><rect x="85" y="62" width="11" height="20" rx="5"/></g>
    <g class="p p-cap"><path d="M34 52 Q58 16 88 40 Q96 47 90 52 Z" class="cap"/><circle cx="92" cy="46" r="5" class="pom"/></g>
    <g class="p p-band"><rect x="31" y="50" width="58" height="6" rx="3"/></g>
  </g>
  <g class="p p-bulb"><circle cx="60" cy="10" r="16" fill="url(#bitu-glow)" class="halo"/><circle cx="60" cy="10" r="7" class="bulb"/><rect x="56.5" y="16" width="7" height="5" rx="1.5" class="bulb-base"/></g>
  <g class="p p-float">${['f1', 'f2', 'f3'].map(c => `<text class="fl ${c}" x="0" y="0"></text>`).join('')}</g>
  <g class="p p-confetti">${Array.from({ length: 14 }, (_, i) => `<rect class="cf" x="58" y="60" width="4" height="7" rx="1" style="--a:${i * 360 / 14}deg;--d:${38 + (i % 3) * 12}px;--c:${['#ffd166', '#ff8b7b', '#6ec6ff', '#62e0a9', '#bba4ff'][i % 5]};animation-delay:${(i % 4) * 30}ms"/>`).join('')}</g>
</svg>`;

/* floating glyphs per pose */
const FLOAT = { think: ['?', '?', '…'], math: ['+', '×', '÷'], type: ['def', '</>', 'if'], sleep: ['z', 'Z', 'z'], confused: ['?', '!', '?'], watch: ['♪', '♫', '♪'] };
const REACT_MS = { cheer: 2600, idea: 2400, nod: 1800, sleep: 2600, stretch: 2200, namaste: 2200, wave: 2200, confused: 2200 };
const LINE_MS = 6000;
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

let root, bubble, base = 'idle', line = '', reactTimer = 0, lineTimer = 0;

function setPose(name) {
  if (!root) return;
  root.dataset.pose = name;
  const g = FLOAT[name] || [];
  root.querySelectorAll('.fl').forEach((t, i) => { t.textContent = g[i] || ''; });
}
function create() {
  root = document.createElement('div');
  root.className = 'bitu';
  root.innerHTML = `<button type="button" class="bitu-btn" aria-label="Bitu, your coach. Click for a tip.">${SVG}</button><p class="bitu-bubble" role="status" aria-live="polite"></p>`;
  bubble = root.querySelector('.bitu-bubble');
  root.querySelector('.bitu-btn').onclick = () => root.dispatchEvent(new CustomEvent('poke', { bubbles: true }));
  setPose(base);
  /* eyes follow the pointer, gently */
  let raf = 0, px = 0, py = 0;
  window.addEventListener('pointermove', e => {
    px = e.clientX; py = e.clientY;
    if (raf || reduce.matches || !root.isConnected) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const r = root.querySelector('.face').getBoundingClientRect();
      const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 300);
      root.style.setProperty('--ex', (dx / d * 2.4 * k).toFixed(2) + 'px');
      root.style.setProperty('--ey', (dy / d * 2.4 * k).toFixed(2) + 'px');
    });
  }, { passive: true });
}
/* move Bitu into this page's host element (it keeps its state between pages).
   sayHost, when given, holds the speech bubble somewhere else on the page (the home ladder puts it in the current step's card). */
function mount(host, sayHost) {
  if (!root) create();
  if (host && root.parentNode !== host) host.appendChild(root);
  const where = sayHost || root;
  if (bubble.parentNode !== where) where.appendChild(bubble);
  root.classList.toggle('say-away', !!sayHost);
}
function show(text) {
  if (!bubble || bubble.textContent === text) return;
  bubble.textContent = text;
  bubble.classList.remove('pop'); void bubble.offsetWidth; bubble.classList.add('pop');
}
/* the page's standing line */
function say(text) { line = text || ''; clearTimeout(lineTimer); show(line); }
function pose(name) { base = name; clearTimeout(reactTimer); setPose(name); }
/* a short reaction; a temporary line goes back to the page's line afterwards */
function react(name, text) {
  if (!root) return;
  clearTimeout(reactTimer);
  setPose('idle');
  void root.offsetWidth; /* restart one-shot animations */
  setPose(name);
  reactTimer = setTimeout(() => setPose(base), REACT_MS[name] || 2200);
  if (text) { clearTimeout(lineTimer); show(text); lineTimer = setTimeout(() => show(line), LINE_MS); }
}

window.Mascot = { mount, pose, react, say, get el() { return root; } };
})();
