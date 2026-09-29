/* Logic Gym videos: g2 – g6 (g1 lives in 01-think.js) */
(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Out, Vars, Arr, Tbl, KV, Grid, Trace } = E;
const { S, intro, range, fresh } = LH;
const NEXT = T('Next: do every drill below. Predict first, then check.', 'Aage: neeche ki har drill karo. Pehle predict, phir check.');

/* ---------- g2 · Loop mastery ---------- */
E.register('g2', { id: 'g2-v1', startLabel: T('Start: Loop mastery', 'Shuru karo: Loop mastery'), outro: NEXT, chapters: [
  { t: '1 · Read any loop', scenes: [
    intro('Logic Gym · 2', 'Loop mastery', 'Three questions that make every loop predictable.', [
      [T('Most beginner bugs live in loops. The fix is not more practice at random. It is three questions you ask EVERY time.', 'Beginners ke zyada tar bugs loops mein rehte hain. Ilaaj random practice nahi. Teen sawaal hain jo HAR baar poochne hain.')]
    ]),
    S('The three questions', B => { const [l, r] = row(B, [1, 1]); return { c: Code(l, `total = 0\nfor i in range(2, 11, 3):\n    total += i\nprint(total)`, { size: 23 }), th: E.Think(r, ['First value of i?', 'Last value of i?', 'What changes each lap, and what is it at the end?']), l }; }, [
      [T('Question one: what is the first value? range starts at two, so i starts at two.', 'Sawaal ek: pehli value kya? range do se shuru, toh i do se.'), o => { o.th.on(0); o.c.hl(2); }],
      [T('Question two: what is the last value? Two, five, eight. Eleven would be next, but the stop is excluded. So the last is eight.', 'Sawaal do: aakhri value kya? Do, paanch, aath. Agla gyaarah hota, par stop shaamil nahi. Toh aakhri aath.'), o => { o.th.on(1); o.a = Arr(o.l, [2, 5, 8], { w: 70, label: 'values of i', noIdx: true }); }],
      [T('Question three: what changes? total grows: two, seven, fifteen. Fifteen is printed.', 'Sawaal teen: kya badalta hai? total badhta hai: do, saat, pandrah. Pandrah print hota hai.'), o => { o.th.on(2); o.t = Trace(o.l, ['lap', 'i', 'total'], {}); }, { seq: [[1, 2, 2], [2, 5, 7], [3, 8, 15]].map(r => o => o.t.row(r.map(String))), gap: 800 }],
      [T('Answer these three before you write or read any loop, and off-by-one errors disappear.', 'Koi bhi loop likhne ya padhne se pehle ye teen jawab do, off-by-one errors gayab ho jaate hain.'), o => o.th.done()]
    ])
  ]},
  { t: '2 · The four loop patterns', scenes: [
    S('Four shapes', B => { const [a, b] = row(B, [1, 1]); const [a1, a2] = col(a, [1, 1]); const [b1, b2] = col(b, [1, 1]); return { a1, a2, b1, b2 }; }, [
      [T('Almost every beginner loop is one of four shapes. One, the accumulator: start at zero, add each item.', 'Beginners ke lagbhag saare loops chaar shapes mein se ek hain. Ek, accumulator: zero se shuru, har item jodo.'), o => Code(o.a1, `total = 0\nfor x in nums:\n    total += x`, { size: 18, title: 'accumulator' })],
      [T('Two, the counter: start at zero, add one only when a condition holds.', 'Do, counter: zero se shuru, sirf condition sach ho tab ek jodo.'), o => Code(o.a2, `count = 0\nfor x in nums:\n    if x % 2 == 0:\n        count += 1`, { size: 18, title: 'counter' })],
      [T('Three, best so far: start with the first item, and replace it when something better arrives.', 'Teen, ab tak ka best: pehle item se shuru, aur behtar aaye toh badal do.'), o => Code(o.b1, `best = nums[0]\nfor x in nums:\n    if x > best:\n        best = x`, { size: 18, title: 'best so far' })],
      [T('Four, search and stop: return as soon as you find it, and only say "not found" AFTER the loop ends.', 'Chaar, dhoondho aur ruko: milte hi return karo, aur "nahi mila" sirf loop KHATAM hone ke BAAD bolo.'), o => Code(o.b2, `for i, x in enumerate(nums):\n    if x == target:\n        return i\nreturn -1`, { size: 18, title: 'search & stop' })]
    ]),
    S('Starting values matter', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Where you START decides whether the answer is right. A product must start at one. Start at zero, and everything stays zero.', 'Kahan se SHURU karte ho wahi decide karta hai jawab sahi hoga ya nahi. Product ek se shuru hona chahiye. Zero se shuru kiya toh sab zero hi rahega.'), o => Tbl(o.l, ['result', 'start with'], [['sum', '0'], ['product', '1'], ['max', 'nums[0] or float("-inf")'], ['list', '[]'], ['string', '""']], { mono: [1] })],
      [T('And the maximum should NOT start at zero. If every number is negative, zero would win, but zero is not even in the list.', 'Aur maximum zero se shuru NAHI hona chahiye. Agar saare numbers negative hain, toh zero jeet jaayega, jabki zero list mein hai hi nahi.'), o => { Arr(o.r, [-5, -2, -9], { w: 70 }); Card(o.r, { icon: '🐞', title: 'best = 0 → returns 0', body: 'best = nums[0] → returns -2 ✓', c: 'm' }); }]
    ]),
    S('Digit loops', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `n = 507\nwhile n > 0:\n    d = n % 10\n    print(d)\n    n //= 10`, { size: 23 }), v: Vars(r), out: Out(r, { h: 120 }) }; }, [
      [T('Digit loops visit digits from RIGHT to left: percent ten peels the last digit, double slash ten throws it away.', 'Digit loops digits ko RIGHT se left dekhte hain: percent das aakhri digit nikalta hai, double slash das use phenk deta hai.'), null, { seq: [[507, 7, 50], [50, 0, 5], [5, 5, 0]].map(([n, d, m]) => o => { o.v.set('n', String(m), '', 'y'); o.v.set('d', String(d), '', 's'); o.out.p(String(d)); o.c.hl(3, 4, 5); }), gap: 1000 }],
      [T('Notice the zero in the middle is handled correctly. Need left to right? Loop over str of n instead.', 'Dekho beech ka zero sahi handle hua. Left se right chahiye? str of n pe loop chalao.')]
    ])
  ]}
]});

/* ---------- g3 · Pattern printing ---------- */
E.register('g3', { id: 'g3-v1', startLabel: T('Start: Pattern printing', 'Shuru karo: Pattern printing'), outro: NEXT, chapters: [
  { t: '1 · The table method', scenes: [
    intro('Logic Gym · 3', 'Pattern printing', 'Stop staring at stars. Make a table, find the formula.', [
      [T('Pattern problems feel like art, but they are really maths. They train exactly the skill DSA needs: turning a picture into a rule.', 'Pattern problems art jaise lagte hain, par asal mein maths hain. Ye wahi skill train karte hain jo DSA ko chahiye: picture ko rule mein badalna.')]
    ]),
    S('Picture → table → formula', B => { const [l, m, r] = row(B, [0.8, 1, 1]); return { l, m, r }; }, [
      [T('Here is an inverted pyramid for n equals four. Do not try to code it by looking at it.', 'Ye n equals chaar ka ulta pyramid hai. Ise dekh ke code karne ki koshish mat karo.'), o => { const x = Out(o.l, { title: 'n = 4', h: 170 }); ['*******', ' *****', '  ***', '   *'].forEach(t => x.p(t)); }],
      [T('Make a table. For each row number, count the spaces and count the stars.', 'Table banao. Har row number ke liye spaces gino aur stars gino.'), o => { o.t = Tbl(o.m, ['i', 'spaces', 'stars'], [['1', '0', '7'], ['2', '1', '5'], ['3', '2', '3'], ['4', '3', '1']], { hidden: true, mono: [0, 1, 2] }); }, { seq: range(0, 3).map(i => o => o.t.show(i)), gap: 600 }],
      [T('Spaces go up by one each row, starting at zero: i minus one.', 'Spaces har row ek badhte hain, zero se shuru: i minus ek.'), o => Card(o.r, { icon: '➖', title: 'spaces = i − 1', body: 'goes up by 1, row 1 → 0', c: 's' })],
      [T('Stars go DOWN by two each row. Down by two means minus two i. Then fix the constant using row one: seven equals minus two plus nine. So stars equals nine minus two i, which is two times n minus i, plus one.', 'Stars har row do GHATTE hain. Do ghatna matlab minus do i. Phir row ek se constant theek karo: saat equals minus do plus nau. Toh stars equals nau minus do i, yaani do guna n minus i, plus ek.'), o => Card(o.r, { icon: '⭐', title: 'stars = 2(n − i) + 1', body: 'down by 2 → −2i, fix with row 1', c: 'y' })],
      [T('Now the code is just the formulas.', 'Ab code bas formulas hai.'), o => Code(o.r, `for i in range(1, n + 1):\n    print(" " * (i - 1) + "*" * (2 * (n - i) + 1))`, { size: 16 })]
    ])
  ]},
  { t: '2 · Numbers and counters', scenes: [
    S('Number patterns', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Numbers instead of stars? Same table. Row i shows one to i: join the numbers from range one to i plus one.', 'Stars ki jagah numbers? Wahi table. Row i ek se i dikhati hai: range ek se i plus ek ke numbers join karo.'), o => { const x = Out(o.l, { h: 140 }); ['1', '1 2', '1 2 3'].forEach(t => x.p(t)); Code(o.r, `for i in range(1, n + 1):\n    print(" ".join(str(j) for j in range(1, i + 1)))`, { size: 16 }); }],
      [T('Floyd\'s triangle keeps counting across rows: one, then two three, then four five six. The counter lives OUTSIDE both loops, so it never resets.', 'Floyd ka triangle rows ke paar ginti jaari rakhta hai: ek, phir do teen, phir chaar paanch chhe. Counter DONO loops ke BAHAR rehta hai, toh kabhi reset nahi hota.'), o => { o.l.innerHTML = ''; o.r.innerHTML = ''; const x = Out(o.l, { h: 140 }); ['1', '2 3', '4 5 6'].forEach(t => x.p(t)); Code(o.r, `k = 1\nfor i in range(1, n + 1):\n    row = []\n    for _ in range(i):\n        row.append(str(k))\n        k += 1\n    print(" ".join(row))`, { size: 18 }); }]
    ])
  ]}
]});

/* ---------- g4 · List logic ---------- */
E.register('g4', { id: 'g4-v1', startLabel: T('Start: List logic', 'Shuru karo: List logic'), outro: NEXT, chapters: [
  { t: '1 · Positions', scenes: [
    intro('Logic Gym · 4', 'List logic', 'Neighbours, best-so-far, counting and building new lists.', [
      [T('A list problem is a question about positions. Who is next to whom? Who is the biggest so far? Where does something start and stop?', 'List problem positions ka sawaal hai. Kaun kiske bagal mein? Ab tak sabse bada kaun? Kuch kahan shuru aur khatam hota hai?')]
    ]),
    S('Comparing neighbours', B => { const [t, b] = col(B, [1, 1]); const [l, r] = row(b, [1.1, 1]); return { a: Arr(t, [3, 5, 5, 2, 8], { w: 76 }), l, r }; }, [
      [T('Is the list sorted? Compare each item with its right neighbour: i and i plus one.', 'Kya list sorted hai? Har item ko uske right padosi se compare karo: i aur i plus ek.'), o => Code(o.l, `for i in range(len(nums) - 1):\n    if nums[i] > nums[i + 1]:\n        return False\nreturn True`, { size: 20 })],
      [T('Why minus one? The last item has no right neighbour. Going to len would crash with IndexError.', 'Minus ek kyun? Aakhri item ka right padosi nahi hai. len tak gaye toh IndexError crash.'), null, { seq: [0, 1, 2].map(i => o => { o.a.clear(); o.a.hl([i, i + 1], 'y'); o.a.ptr('i', i, 'y'); }), gap: 800 }],
      [T('Five is bigger than two. Not sorted. Return False the moment you know.', 'Paanch do se bada hai. Sorted nahi. Pata chalte hi False return karo.'), o => { o.a.hl([2, 3], 'm'); Card(o.r, { icon: '↔️', title: 'range(len(nums) - 1)', body: 'the last i must still have an i + 1', c: 'y' }); }]
    ]),
    S('Second largest', B => { const [t, b] = col(B, [1, 1.2]); const [bl, br] = row(b, [1, 1.1]); return { a: Arr(t, [4, 9, 7, 9, 2], { w: 76 }), v: Vars(bl), b: br }; }, [
      [T('A classic: the second largest distinct value. Keep two notes, first and second.', 'Classic: doosra sabse bada alag number. Do parchiyan rakho, first aur second.'), o => { o.v.set('first', '-inf', '', 'y'); o.v.set('second', '-inf', '', 's'); }],
      [T('Four beats first: the old first moves down to second. Nine beats first: four moves down. Seven only beats second. Nine again equals first, skip it. Two, nothing.', 'Chaar first ko harata hai: purana first second ban jaata hai. Nau first ko harata hai: chaar neeche. Saat sirf second ko harata hai. Nau phir se first ke barabar, skip. Do, kuch nahi.'), null, { seq: [[0, '4', '-inf'], [1, '9', '4'], [2, '9', '7'], [3, '9', '7'], [4, '9', '7']].map(([i, f, s]) => o => { o.a.clear(); o.a.hl(i, 'y'); o.v.set('first', f, '', 'y'); o.v.set('second', s, '', 's'); }), gap: 1000 }],
      [T('The order of updates matters. Move first down to second BEFORE overwriting first, or the old value is lost.', 'Updates ka order zaroori hai. first ko overwrite karne se PEHLE use second mein daalo, warna purani value kho jaayegi.'), o => { o.a.clear(); Code(o.b, `if x > first:\n    second, first = first, x\nelif first > x > second:\n    second = x`, { size: 19 }); }]
    ])
  ]},
  { t: '2 · New list or in place?', scenes: [
    S('Two ways to change a list', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Build a new list when the result has a different length, like keeping only even numbers. Simple and safe.', 'Nayi list banao jab result ki length alag ho, jaise sirf even numbers rakhna. Simple aur safe.'), o => Code(o.l, `evens = []\nfor x in nums:\n    if x % 2 == 0:\n        evens.append(x)`, { size: 20, title: 'new list' })],
      [T('Change in place with a write pointer when the problem says "without extra space", like moving zeros to the end. Never delete from a list while looping over it.', 'Wahi par badlo write pointer se jab problem bole "bina extra space", jaise zeros ko end mein bhejna. Loop chalate hue list se kabhi delete mat karo.'), o => Code(o.r, `w = 0\nfor x in nums:\n    if x != 0:\n        nums[w] = x\n        w += 1\nfor i in range(w, len(nums)):\n    nums[i] = 0`, { size: 19, title: 'in place' })]
    ])
  ]}
]});

/* ---------- g5 · String logic ---------- */
E.register('g5', { id: 'g5-v1', startLabel: T('Start: String logic', 'Shuru karo: String logic'), outro: NEXT, chapters: [
  { t: '1 · Four string patterns', scenes: [
    intro('Logic Gym · 5', 'String logic', 'Both ends, counting, building and words.', [
      [T('A string is a list of characters that you cannot change. So every list trick works for reading, and for building you use a list plus join.', 'String characters ki list hai jise badal nahi sakte. Toh padhne ke liye list ki har trick chalti hai, aur banane ke liye list plus join.')]
    ]),
    S('Pattern 1: both ends', B => { const [t, b] = col(B, [1, 1]); return { a: Arr(t, [...'level'], { w: 76 }), b }; }, [
      [T('Palindrome check: l at the start, r at the end. Compare, then move both inward.', 'Palindrome check: l shuru mein, r end mein. Compare karo, phir dono andar le aao.'), null, { seq: [[0, 4], [1, 3], [2, 2]].map(([l, r]) => o => { o.a.clear(); o.a.hl([l, r], 's'); o.a.ptr('l', l, 'y'); o.a.ptr('r', r, 'm'); }), gap: 900 }],
      [T('Stop when l meets r. Level is a palindrome. Only half the comparisons, and no copy of the string.', 'l aur r milein toh ruko. Level palindrome hai. Sirf aadhe comparisons, aur string ki koi copy nahi.'), o => Code(o.b, `l, r = 0, len(s) - 1\nwhile l < r:\n    if s[l] != s[r]:\n        return False\n    l += 1\n    r -= 1\nreturn True`, { size: 18 })]
    ]),
    S('Patterns 2, 3, 4', B => { const [a, b, c] = row(B, [1, 1, 1]); return { a, b, c }; }, [
      [T('Pattern two, counting: a dictionary of character counts. Anagrams, first unique character, most frequent letter.', 'Pattern do, ginti: character counts ki dictionary. Anagrams, pehla unique character, sabse zyada aane wala letter.'), o => Code(o.a, `cnt = {}\nfor ch in s:\n    cnt[ch] = cnt.get(ch, 0) + 1`, { size: 16, title: 'count' })],
      [T('Pattern three, building: append pieces to a list, then join once at the end. Compress a a a b b into a3b2.', 'Pattern teen, banana: tukde list mein append karo, phir end mein ek baar join. a a a b b ko a3b2 banao.'), o => Code(o.b, `out = []\nfor ch in s:\n    if ch.isalpha():\n        out.append(ch)\n"".join(out)`, { size: 16, title: 'build' })],
      [T('Pattern four, words: split into words, work on the list, join back. Reverse the words of a sentence in one line.', 'Pattern chaar, words: words mein split karo, list pe kaam karo, wapas join. Sentence ke words ek line mein ulte karo.'), o => Code(o.c, `words = s.split()\n" ".join(words[::-1])`, { size: 16, title: 'words' })]
    ]),
    S('Case and noise', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Real inputs are messy: capitals, spaces, punctuation. Clean them first, then solve the clean problem. "A man, a plan" becomes amanaplan.', 'Asli inputs gande hote hain: capitals, spaces, punctuation. Pehle saaf karo, phir saaf problem solve karo. "A man, a plan" ban jaata hai amanaplan.'), o => { Code(o.l, `clean = [ch.lower() for ch in s if ch.isalnum()]`, { size: 17 }); Big(o.r, '"A man, a plan" → "amanaplan"', { size: 28 }); }]
    ])
  ]}
]});

/* ---------- g6 · Dry runs and debugging ---------- */
E.register('g6', { id: 'g6-v1', startLabel: T('Start: Dry runs and debugging', 'Shuru karo: Dry runs aur debugging'), outro: T('Checkpoint passed? Start the Warm-up 50!', 'Checkpoint paas? Warm-up 50 shuru karo!'), chapters: [
  { t: '1 · Dry run', scenes: [
    intro('Logic Gym · 6', 'Dry runs and debugging', 'Be the computer: trace code in a table and catch the bug.', [
      [T('A dry run means running code in your head, or on paper, line by line, writing every variable in a table. It is the single most useful skill for fixing wrong answers.', 'Dry run matlab code ko dimaag mein, ya kaagaz pe, line by line chalana, har variable table mein likhte hue. Galat jawab theek karne ki ye sabse kaam ki skill hai.')]
    ]),
    S('Find the bug', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `def has_negative(nums):\n    for x in nums:\n        if x < 0:\n            return True\n        else:\n            return False`, { size: 21, title: 'bug.py' }), r }; }, [
      [T('This should return True if any number is negative. Try it with three, minus one.', 'Ye True dena chahiye agar koi number negative ho. Teen, minus ek ke saath try karo.'), o => { o.a = Arr(o.r, [3, -1], { w: 76, label: 'nums' }); }],
      [T('Pause and dry run it. What does it return?', 'Ruko aur dry run karo. Ye kya return karta hai?'), null, { think: 7 }],
      [T('x is three. Not negative, so the else runs, and returns False immediately. Minus one is never checked!', 'x teen hai. Negative nahi, toh else chalta hai, aur turant False return. Minus ek kabhi check hi nahi hua!'), o => { o.a.hl(0, 'y'); o.a.dim(1); o.c.hl(5, 6); o.c.note(6, 'returns too early', 'm'); }],
      [T('The fix: only say False AFTER checking everyone. Move return False out of the loop. This is bug number four on the list: returning too early.', 'Fix: False sirf SAB check karne ke BAAD bolo. return False ko loop ke bahar le jao. Ye list ka bug number chaar hai: jaldi return.'), o => { o.r.innerHTML = ''; Code(o.r, `for x in nums:\n    if x < 0:\n        return True\nreturn False`, { size: 21, title: 'fixed.py' }); }]
    ]),
    S('The ten usual bugs', B => ({ b: Bul(B, ['Off-by-one in range', 'while variable never updated → infinite loop', 'Wrong starting value (product = 0, max = 0)', 'return inside the loop too early', 'Updating in the wrong order (old value lost)', '= vs ==, / vs //', 'Changing a list while looping over it', 'Aliasing: two names, one list', 'Empty input or a single item not handled', 'Index vs value mixed up'], { num: true, sm: true }) }), [
      [T('Most beginner bugs are one of these ten. When your answer is wrong, walk down this list before anything else.', 'Beginners ke zyada tar bugs in das mein se ek hote hain. Jawab galat ho toh sabse pehle ye list dekho.'), null, { seq: range(0, 9).map(i => o => o.b.show(i)), gap: 450 }],
      [T('Now do the drills below. Each shows broken code: predict what it returns, find the line, fix it. Then the checkpoint tells you if you are ready for the Warm-up 50.', 'Ab neeche ki drills karo. Har ek mein toota code hai: predict karo kya return karega, line dhoondho, theek karo. Phir checkpoint batayega ki tum Warm-up 50 ke liye ready ho ya nahi.')]
    ])
  ]}
]});
})();
