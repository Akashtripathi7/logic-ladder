/* Shared helpers for topic lessons: scene factory + node/edge diagrams (graphs, trees). */
(function () {
const NS = 'http://www.w3.org/2000/svg';
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* nodes: [{id, x, y, label}], edges: [[a, b, weight?]] */
function Graph(p, o) {
  const w = o.w || 600, h = o.h || 400, r = o.r || 26;
  const box = document.createElement('div');
  box.className = 'cmp gbox';
  box.innerHTML = `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;display:block;margin:0 auto"></svg>`;
  p.appendChild(box);
  const svg = box.firstChild;
  const pos = {};
  o.nodes.forEach(n => { pos[n.id] = n; });
  let s = '<defs><marker id="arr' + (o.mk || '') + '" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="garrow"/></marker></defs>';
  const edgeKey = (a, b) => o.directed ? a + '>' + b : [a, b].sort().join('~');
  (o.edges || []).forEach(e => {
    const a = pos[e[0]], b = pos[e[1]];
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
    const x1 = a.x + dx / d * r, y1 = a.y + dy / d * r, x2 = b.x - dx / d * (r + (o.directed ? 4 : 0)), y2 = b.y - dy / d * (r + (o.directed ? 4 : 0));
    s += `<g class="gedge" data-k="${esc(edgeKey(e[0], e[1]))}"><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${o.directed ? ` marker-end="url(#arr${o.mk || ''})"` : ''}/>` +
      (e[2] != null ? `<text x="${(a.x + b.x) / 2 + (dy / d) * 14}" y="${(a.y + b.y) / 2 - (dx / d) * 14}" class="gw">${esc(e[2])}</text>` : '') + '</g>';
  });
  o.nodes.forEach(n => {
    s += `<g class="gnode" data-id="${esc(n.id)}"><circle cx="${n.x}" cy="${n.y}" r="${r}"/><text x="${n.x}" y="${n.y + 1}" class="gl">${esc(n.label != null ? n.label : n.id)}</text><text x="${n.x}" y="${n.y + r + 20}" class="gnote"></text></g>`;
  });
  svg.innerHTML = s;
  const node = id => svg.querySelector(`.gnode[data-id="${CSS.escape(String(id))}"]`);
  const api = {
    el: box,
    hl(id, c = 'y') { [].concat(id).forEach(i => { const n = node(i); if (n) n.setAttribute('class', 'gnode c-' + c); }); },
    un(id) { [].concat(id).forEach(i => { const n = node(i); if (n) n.setAttribute('class', 'gnode'); }); },
    label(id, t) { const n = node(id); if (n) n.querySelector('.gl').textContent = t; },
    note(id, t, c) { const n = node(id); if (n) { const x = n.querySelector('.gnote'); x.textContent = t; x.setAttribute('class', 'gnote' + (c ? ' t-' + c : '')); } },
    edge(a, b, c = 'y') { const e = svg.querySelector(`.gedge[data-k="${CSS.escape(edgeKey(a, b))}"]`); if (e) e.setAttribute('class', 'gedge c-' + c); },
    unedge(a, b) { const e = svg.querySelector(`.gedge[data-k="${CSS.escape(edgeKey(a, b))}"]`); if (e) e.setAttribute('class', 'gedge'); },
    dimEdge(a, b) { api.edge(a, b, 'dim'); },
    clear() { svg.querySelectorAll('.gnode').forEach(n => n.setAttribute('class', 'gnode')); svg.querySelectorAll('.gedge').forEach(n => n.setAttribute('class', 'gedge')); svg.querySelectorAll('.gnote').forEach(n => { n.textContent = ''; }); }
  };
  return api;
}

/* Binary tree from a level-order array (null = missing). Node ids are the array indexes. */
function Tree(p, arr, o = {}) {
  const w = o.w || 620, h = o.h || 360;
  const depth = Math.floor(Math.log2(arr.length)) + 1;
  const nodes = [], edges = [];
  // compute positions by heap-style indexing over a complete tree
  const idx = []; // map array position -> heap index
  let q = [0], hi = [1], pos = 1;
  const heapOf = {}; heapOf[0] = 1;
  for (let k = 0, i = 1; k < q.length && i < arr.length; k++) {
    const par = q[k];
    for (const side of [0, 1]) {
      if (i >= arr.length) break;
      if (arr[i] != null) { heapOf[i] = heapOf[par] * 2 + side; q.push(i); edges.push([String(par), String(i)]); }
      i++;
    }
  }
  const maxLevel = Math.max(...Object.values(heapOf).map(v => Math.floor(Math.log2(v))));
  Object.entries(heapOf).forEach(([i, hv]) => {
    const lvl = Math.floor(Math.log2(hv)), pos = hv - 2 ** lvl, count = 2 ** lvl;
    nodes.push({ id: String(i), label: arr[i], x: (pos + 0.5) * (w / count), y: 40 + lvl * ((h - 80) / Math.max(1, maxLevel)) });
  });
  return Graph(p, { nodes, edges, w, h, r: o.r || 24 });
}

window.LH = {
  S: (t, setup, beats) => ({ t, setup, beats }),
  fresh: (cell, make) => { cell.innerHTML = ''; return make(cell); },
  range: (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; },
  Graph, Tree,
  intro: (lv, title, sub, beats) => ({ t: title, setup: B => ({ t: E.Title(B, lv, title, sub) }), beats })
};
})();
