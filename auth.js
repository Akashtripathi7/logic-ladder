/* Google sign-in + Supabase: per-user progress and a real history.
   Every write goes through activity_log (insert-only, see supabase/migrations/0001_progress.sql);
   module_progress / problem_progress are read-only summaries kept in sync by a server-side
   trigger, so "mark complete" can never silently fail to persist or drift out of sync.
   Entirely optional: with no SUPABASE_URL/SUPABASE_ANON_KEY baked in, every call below is a
   harmless no-op and the site behaves exactly as it did with localStorage only. */
window.Auth = (function () {
'use strict';
const URL_ = window.__SUPABASE_URL__ || '';
const KEY_ = window.__SUPABASE_ANON_KEY__ || '';
const sb = (URL_ && KEY_ && window.supabase) ? window.supabase.createClient(URL_, KEY_) : null;
const ready = !!sb;
let user = null;
let onChange = () => {};
const lstore = {
  get(k, d) { try { const v = localStorage.getItem('dsa:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('dsa:' + k, JSON.stringify(v)); } catch (e) {} }
};

async function logActivity(kind, itemId) {
  if (!sb || !user) return;
  const { error } = await sb.from('activity_log').insert({ user_id: user.id, kind, item_id: itemId });
  if (error) console.error('Auth: activity log insert failed', error);
}

/* ---------- one-time migration: local-only progress → the signed-in account ----------
   Best-effort, one-time carry-over of what was already achieved on this browser before
   sign-in. We cannot recover *when* those past actions happened (localStorage never kept
   that), so migrated rows are timestamped "now" — the history starts being exact from here on. */
async function migrateLocalOnFirstSignIn() {
  if (lstore.get('migrated', false)) return;
  const rows = [];
  lstore.get('mods', []).forEach(id => rows.push({ user_id: user.id, kind: 'module_complete', item_id: id }));
  lstore.get('solved', []).forEach(id => rows.push({ user_id: user.id, kind: 'problem_solved', item_id: id }));
  if (rows.length) { const { error } = await sb.from('activity_log').insert(rows); if (error) console.error('Auth: migration failed', error); }
  lstore.set('migrated', true);
}

/* Pull the signed-in learner's summary tables: { mods: [moduleId, ...], solved: [problemId, ...] } —
   same shape as the old localStorage 'dsa:mods' / 'dsa:solved', so the caller can merge it straight in. */
async function loadProgress() {
  if (!sb || !user) return null;
  const [{ data: mp, error: e1 }, { data: pp, error: e2 }] = await Promise.all([
    sb.from('module_progress').select('module_id').eq('user_id', user.id).eq('completed', true),
    sb.from('problem_progress').select('problem_id').eq('user_id', user.id).eq('solved', true)
  ]);
  if (e1 || e2) { console.error('Auth: load progress failed', e1 || e2); return null; }
  return { mods: (mp || []).map(r => r.module_id), solved: (pp || []).map(r => r.problem_id) };
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
function restoreReturnHash() {
  try { const h = sessionStorage.getItem('ll:return'); if (h) { sessionStorage.removeItem('ll:return'); if (h && h !== location.hash) location.hash = h; } } catch (e) {}
}
function renderBox() {
  const box = document.getElementById('auth-box');
  if (!box) return;
  if (!ready) { box.hidden = true; return; }
  box.hidden = false;
  if (user) {
    const name = (user.user_metadata && (user.user_metadata.full_name || user.user_metadata.name)) || user.email || 'Account';
    const avatar = user.user_metadata && user.user_metadata.avatar_url;
    box.innerHTML = `<button type="button" class="auth-chip" id="auth-menu-btn" aria-haspopup="true" aria-expanded="false">${avatar ? `<img src="${avatar}" alt="" referrerpolicy="no-referrer">` : `<span class="auth-initial">${esc(name[0] || '?')}</span>`}<span class="auth-name">${esc(name.split(' ')[0])}</span></button>
      <div class="auth-menu" id="auth-menu" hidden><div class="auth-who">${esc(name)}</div><button type="button" id="auth-signout">Sign out</button></div>`;
    document.getElementById('auth-menu-btn').onclick = () => { const m = document.getElementById('auth-menu'); const open = m.hidden; m.hidden = !open; document.getElementById('auth-menu-btn').setAttribute('aria-expanded', String(open)); };
    document.getElementById('auth-signout').onclick = () => sb.auth.signOut();
  } else {
    box.innerHTML = `<button type="button" class="btn auth-signin" id="auth-signin" title="Sign in with Google"><svg viewBox="0 0 18 18" width="16" height="16" aria-hidden="true"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.97 10.72A5.4 5.4 0 0 1 3.69 9c0-.6.1-1.18.28-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg><span>Sign in</span></button>`;
    document.getElementById('auth-signin').onclick = () => {
      try { sessionStorage.setItem('ll:return', location.hash); } catch (e) {}
      sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } });
    };
  }
}
document.addEventListener('click', e => { const m = document.getElementById('auth-menu'); if (m && !m.hidden && !e.target.closest('.auth-chip, .auth-menu')) m.hidden = true; });

async function handleSignedIn() {
  await migrateLocalOnFirstSignIn();
  const p = await loadProgress();
  if (p) onChange(p);
  restoreReturnHash();
}
async function init(opts) {
  onChange = (opts && opts.onProgress) || onChange;
  if (!ready) { renderBox(); return; }
  const { data } = await sb.auth.getSession();
  user = (data && data.session && data.session.user) || null;
  renderBox();
  if (user) await handleSignedIn();
  sb.auth.onAuthStateChange(async (_evt, session) => {
    user = (session && session.user) || null;
    renderBox();
    if (user) await handleSignedIn();
  });
}

return {
  get ready() { return ready; },
  get signedIn() { return !!user; },
  init,
  markModule(id, completed) { logActivity(completed ? 'module_complete' : 'module_incomplete', id); },
  markProblem(id, solved) { logActivity(solved ? 'problem_solved' : 'problem_unsolved', id); }
};
})();
