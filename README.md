# Logic Ladder

A complete, beginner-friendly path from "never coded" to solving 150 core DSA problems in Python, with animated lesson videos and every explanation in **English and Hinglish**.

**Live:** https://logic-ladder.vercel.app

## The path

1. **Math video**: the maths behind logic (division and modulo, digits, primes, powers, binary, counting, logic, Big O).
2. **Python course**: 21 modules from `print` to classes, recursion, the standard library and DSA gotchas. Each module has a short video, detailed theory and drills.
3. **Logic Gym**: 6 modules of loop, pattern, list and string logic, plus debugging by dry run and a readiness checkpoint.
4. **Warm-up 50**: basic programs (reverse a string, largest number, anagram, palindrome…) explained step by step.
5. **DSA 150**: 18 pattern topics, each with a video, and 150 problems. Every problem covers how to understand it, how to think, brute force, the best approach, how to spot the pattern, a dry run and common mistakes.

**Bitu**, the robot mascot, keeps you company: it types on Python pages, lifts weights in the Logic Gym, jogs through the warm-ups, climbs the ladder in DSA 150, and cheers when you solve something. Click Bitu for a tip, or tuck it away with ×. There is a **night mode** toggle in the top bar.

The narration uses the browser's built-in speech voice. For Hinglish, an Indian English voice (en-IN) sounds best. Progress is saved in the browser.

## How it's built

The site is a single self-contained `index.html` with no dependencies and no server. `build.py` assembles it from the sources:

| Path | What it holds |
|---|---|
| `engine.js` | Lesson player: scenes, animations, narration, captions |
| `lessons/*.js` | The animated videos (math, Python modules, gym, DSA topics) |
| `pycourse/*.txt` | Python course theory and drills |
| `gym/*.txt` | Logic Gym theory and drills |
| `problems/*.txt` | Warm-up and DSA 150 problems with solutions and tests |
| `traces.txt` | Shared dry-run tables |
| `app.js`, `app.css`, `style.css`, `shell.html` | The site around the lessons |
| `mascot.js`, `mascot.css` | Bitu the mascot, and the night mode toggle |
| `prelude.py` | Test helpers used when verifying solutions |

## Build

```bash
python3 build.py
```

This runs every solution and drill answer against its tests (722 checks), then writes the site to `public/index.html`. If any check fails, the build stops with an error, so a broken change never goes live.

## Deploy

The repo is connected to Vercel: every push to `main` builds and deploys to https://logic-ladder.vercel.app automatically (settings in `vercel.json`). Pull requests get their own preview URL.

`public/index.html` is the whole site, so any static host works too.
