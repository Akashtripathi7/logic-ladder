# Logic Ladder

A complete, beginner-friendly path from "never coded" to solving 150 core DSA problems in Python, with animated lesson videos and every explanation in **English and Hinglish**.

**Live:** https://logic-ladder.vercel.app

## The path

1. **Math for Logic**: 16 short topics in four parts (numbers; building blocks; patterns and counting; thinking like a programmer). Each has a slow, animated video, theory written for complete beginners in English and Hinglish, and drills. A one-video recap is available for revision.
2. **Python course**: 21 modules from `print` to classes, recursion, the standard library and DSA gotchas. Each module has a short video, detailed theory and drills.
3. **Logic Gym**: 6 modules of loop, pattern, list and string logic, plus debugging by dry run and a readiness checkpoint.
4. **Warm-up 50**: basic programs (reverse a string, largest number, anagram, palindrome…) explained step by step.
5. **DSA 150**: 18 pattern topics, each with a video, and 150 problems. Every problem covers how to understand it, how to think, brute force, the best approach, how to spot the pattern, a dry run and common mistakes.

Every page has a **coach panel** beside the content: **Bitu**, the robot mascot, with a tip for that page, your progress, the page's main action (mark solved, mark complete), what's up next, and an "On this page" list that follows you as you scroll. Bitu types on Python pages, lifts weights in the Logic Gym, jogs through the warm-ups, climbs the ladder in DSA 150, and cheers when you solve something. Click Bitu for a tip. There is a **night mode** toggle in the top bar.

The narration uses the browser's built-in speech voice. For Hinglish, an Indian English voice (en-IN) sounds best.

**Sign-in is required.** Every page, including direct links, shows a sign-in page until the visitor signs in with Google. Its first screen is a night scene: the headline and Google sign-in on the left, and on the right the five course steps as glass cards spiralling up a beam of light, a 3D staircase you can drag, flick or click to explore, with Bitu acting out each step. Below that is a mini ladder game: five rungs, one real question from each step, and Bitu climbs a rung for every right answer. After sign-in, the visitor lands on the page they originally asked for. Progress (modules complete, problems solved) is stored in their account via Supabase, so it follows them across devices and keeps a real history. Signing out clears this browser's copy. See [Accounts and progress](#accounts-and-progress) below.

## Accounts and progress

Without `SUPABASE_URL`/`SUPABASE_ANON_KEY` set (a local build, or a preview with no secrets), `auth.js` is a no-op, there is no sign-in page, and progress stays in the browser. With them set, sign-in is required everywhere. That also means a Supabase outage would block access to the site.

- `auth.js`: Google sign-in, session handling, and syncing progress to and from Supabase. The sign-in page itself is `pageGate()` in `app.js`.
- `supabase/migrations/0001_progress.sql` — run once in the Supabase SQL editor. `activity_log` is an append-only history (no update/delete policy exists for it, so it can't be rewritten, only added to); `module_progress`/`problem_progress` are fast-read summaries that only a server-side trigger can write, so they can never drift from the log.

**Setup:** create a Supabase project, enable the Google provider under Authentication → Providers (needs a Google Cloud OAuth client; the redirect URI Supabase shows you goes into that client's Authorized redirect URIs), run the migration above, then set `SUPABASE_URL` and `SUPABASE_ANON_KEY` — as Vercel project environment variables for the live site, and in a local `.env.local` (gitignored, `KEY=VALUE` per line) for `python3 build.py` on a laptop.

## How it's built

The site is a single self-contained `index.html` with no dependencies and no server. `build.py` assembles it from the sources:

| Path | What it holds |
|---|---|
| `engine.js` | Lesson player: scenes, animations, narration, captions |
| `lessons/*.js` | The animated videos (math, Python modules, gym, DSA topics) |
| `mathcourse/*.txt` | Math for Logic theory and drills |
| `pycourse/*.txt` | Python course theory and drills |
| `gym/*.txt` | Logic Gym theory and drills |
| `problems/*.txt` | Warm-up and DSA 150 problems with solutions and tests |
| `traces.txt` | Shared dry-run tables |
| `app.js`, `app.css`, `style.css`, `shell.html` | The site around the lessons |
| `mascot.js`, `mascot.css` | Bitu the mascot, and the night mode toggle |
| `auth.js`, `supabase/migrations/*.sql` | Google sign-in and synced progress (see [Accounts and progress](#accounts-and-progress)) |
| `prelude.py` | Test helpers used when verifying solutions |

## Build

```bash
python3 build.py
```

This runs every solution and drill answer against its tests (850+ checks), then writes the site to `public/index.html`. If any check fails, the build stops with an error, so a broken change never goes live.

## Deploy

The repo is connected to Vercel: every push to `main` builds and deploys to https://logic-ladder.vercel.app automatically (settings in `vercel.json`). Pull requests get their own preview URL.

`public/index.html` is the whole site, so any static host works too.
