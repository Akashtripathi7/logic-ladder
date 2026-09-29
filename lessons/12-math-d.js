/* Math for Logic course videos, part D: mt13 – mt16. */
(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Out, Vars, Arr, Tbl, NumLine, Dots, Grid, Chart } = E;
const { S, intro, range } = LH;
const SLOW = 1500;
const NEXT = T('Now read the theory below, then try the drills.', 'Ab neeche ki theory padho, phir drills try karo.');

/* ---------- mt13 · Grids and coordinates ---------- */
E.register('mt13', { id: 'mt13-v1', pause: SLOW, startLabel: T('Start: Grids and coordinates', 'Shuru karo: Grids aur coordinates'), outro: NEXT, chapters: [
  { t: '1 · Addresses', scenes: [
    intro('Math · 13', 'Grids and coordinates', 'Every cell has an address: row and column.', [
      [T('Games, maps and spreadsheets are all grids. Today we learn how code finds its way around one.', 'Games, maps aur spreadsheets sab grids hain. Aaj seekhenge code grid mein raasta kaise dhoondhta hai.')]
    ]),
    S('Row and column', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 3, 4, { size: 92, labels: true }), r }; }, [
      [T('Like seats in a cinema, every cell has an address: row first, then column. We count both from zero.', 'Cinema ki seats jaise, har cell ka address hai: pehle row, phir column. Dono zero se ginte hain.'), o => o.g.set(0, 0, '0,0', 'y')],
      [T('The row number grows as you go down. The column number grows as you go right.', 'Neeche jaane pe row number badhta hai. Right jaane pe column number.'), null, { seq: [[1, 0], [2, 0], [0, 1], [0, 2], [0, 3]].map(([r, c]) => o => o.g.set(r, c, `${r},${c}`, r ? 's' : 'y')), gap: 700 }],
      [T('Where is row one, column two?', 'Row ek, column do kahan hai?'), null, { think: 5 }],
      [T('Here: one row down, two columns right. In Python you write grid of one, of two. Row first.', 'Yahan: ek row neeche, do column right. Python mein likhte ho grid of ek, of do. Pehle row.'), o => { o.g.set(1, 2, '1,2', 'm'); Code(o.r, `grid[1][2]   # row 1, column 2`, { size: 22 }); }]
    ])
  ]},
  { t: '2 · Neighbours', scenes: [
    S('Four neighbours', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 4, 5, { size: 80, labels: true }), r }; }, [
      [T('From a cell at row r, column c, you can step to four neighbours.', 'Row r, column c wale cell se chaar padosiyon pe ja sakte ho.'), o => o.g.set(1, 2, 'me', 'y')],
      [T('Up is row minus one. Down is row plus one. Left is column minus one. Right is column plus one.', 'Upar row minus ek. Neeche row plus ek. Left column minus ek. Right column plus ek.'), null, { seq: [[0, 2, '↑'], [2, 2, '↓'], [1, 1, '←'], [1, 3, '→']].map(([r, c, t]) => o => o.g.set(r, c, t, 's')), gap: 800 }],
      [T('Store the four moves in a list and loop over them. You will write this in every grid problem.', 'Chaaron moves ek list mein rakho aur unpe loop chalao. Ye har grid problem mein likhoge.'), o => Code(o.r, `dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]\nfor dr, dc in dirs:\n    nr, nc = r + dr, c + dc`, { size: 18 })]
    ]),
    S('Stay inside', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 4, 5, { size: 80, labels: true }), r }; }, [
      [T('But careful at the edges. The corner cell has only two neighbours inside the grid.', 'Par kinaron pe dhyaan. Corner cell ke grid ke andar sirf do padosi hain.'), o => { o.g.set(0, 0, 'me', 'y'); o.g.set(1, 0, '↓', 's'); o.g.set(0, 1, '→', 's'); }],
      [T('Up and left would fall off the grid. So always check before you look.', 'Upar aur left grid se gir jaayenge. Toh dekhne se pehle hamesha check karo.'), o => Code(o.r, `if 0 <= nr < rows and 0 <= nc < cols:\n    # a real neighbour\n    ...`, { size: 19 })]
    ])
  ]},
  { t: '3 · From 2-D to 1-D', scenes: [
    S('Numbering the cells', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 3, 4, { size: 88, fill: () => '' }), r }; }, [
      [T('Number the cells left to right, top to bottom: zero, one, two and so on.', 'Cells ko left se right, upar se neeche number do: zero, ek, do aur aage.'), null, { seq: range(0, 11).map(i => o => o.g.set(Math.floor(i / 4), i % 4, String(i))), gap: 250 }],
      [T('Cell seven: which row and column? Seven double slash four is one. Seven percent four is three. Row one, column three.', 'Cell saat: kaunsi row aur column? Saat double slash chaar, ek. Saat percent chaar, teen. Row ek, column teen.'), o => { o.g.hl(1, 3, 'y'); Big(o.r, '7 // 4 = 1  (row)<br>7 % 4 = 3  (col)', { size: 34 }); }],
      [T('Topic three, back again. Great work. Now the theory and drills.', 'Topic teen, phir se. Bahut badhiya. Ab theory aur drills.')]
    ])
  ]}
]});

/* ---------- mt14 · True, false and logic ---------- */
E.register('mt14', { id: 'mt14-v1', pause: SLOW, startLabel: T('Start: True, false and logic', 'Shuru karo: True, false aur logic'), outro: NEXT, chapters: [
  { t: '1 · Yes or no', scenes: [
    intro('Math · 14', 'True, false and logic', 'Every decision is a yes-or-no question.', [
      [T('Every decision in a program is a yes-or-no question. In code, yes is True and no is False.', 'Program ka har faisla haan-ya-naa sawaal hai. Code mein haan True aur naa False.')]
    ]),
    S('and, or, not', B => { const [a, b, c] = row(B, [1, 1, 1], { mid: true }); return { a, b, c }; }, [
      [T('To see a movie you need a ticket and to be old enough. And needs both.', 'Movie dekhne ke liye ticket aur poori umar chahiye. And ko dono chahiye.'), o => Card(o.a, { icon: '🎟️', title: 'and', body: 'both must be True', c: 'y' })],
      [T('You can pay by cash or card. Or needs at least one.', 'Cash ya card se pay kar sakte ho. Or ko kam se kam ek chahiye.'), o => Card(o.b, { icon: '💳', title: 'or', body: 'at least one True', c: 's' })],
      [T('Not flips a value. Not true is false.', 'Not value palat deta hai. Not true, false.'), o => Card(o.c, { icon: '🔄', title: 'not', body: 'flips True ↔ False', c: 'm' })]
    ]),
    S('Truth table', B => ({ t: Tbl(B, ['A', 'B', 'A and B', 'A or B'], [['True', 'True', 'True', 'True'], ['True', 'False', 'False', 'True'], ['False', 'True', 'False', 'True'], ['False', 'False', 'False', 'False']], { hidden: true, mono: [0, 1, 2, 3] }) }), [
      [T('Here are all four combinations. And is True only in the first row.', 'Ye chaaron combinations hain. And sirf pehli row mein True.'), null, { seq: range(0, 3).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1200 }],
      [T('Or is False only in the last row, when neither is true.', 'Or sirf aakhri row mein False, jab koi bhi true nahi.'), o => o.t.hl(3)]
    ])
  ]},
  { t: '2 · Traps and tricks', scenes: [
    S("The 'or' trap", B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `ch = "z"\nprint(ch == "a" or "e")\nprint(ch == "a" or ch == "e")\nprint(ch in "aeiou")`, { size: 21 }), out: Out(r, { h: 180 }), r }; }, [
      [T('Watch this trap. Is z equal to a or e? The first line looks right but is wrong.', 'Ye trap dekho. Kya z, a ya e ke barabar hai? Pehli line sahi dikhti hai par galat hai.'), o => o.c.hl(2)],
      [T('Python reads it as: z equals a, or the letter e. A letter on its own counts as true. So it prints e.', 'Python ise padhta hai: z equals a, ya letter e. Akela letter true maana jaata hai. Toh e print hota hai.'), o => o.out.p('e')],
      [T('Always repeat the comparison on both sides, or use in.', 'Hamesha dono taraf comparison dohraao, ya in use karo.'), null, { seq: [o => { o.c.hl(3); o.out.p('False'); }, o => { o.c.hl(4); o.out.p('False'); }], gap: 1200 }]
    ]),
    S('Short-circuiting', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `a = [4, 0, 9]\ni = 5\nprint(i < len(a) and a[i] > 0)`, { size: 22 }), r }; }, [
      [T('Python stops as soon as it knows the answer. In A and B, if A is False, B is never checked.', 'Python jawab pata chalte hi ruk jaata hai. A and B mein, A False hai toh B check hi nahi hota.')],
      [T('Here i is five, outside the list. The first test is False, so a of five is never read, and nothing crashes.', 'Yahan i paanch hai, list ke bahar. Pehla test False hai, toh a of paanch kabhi padha nahi jaata, aur crash nahi hota.'), o => { o.c.hl(3); o.c.note(3, 'stops here', 's'); }],
      [T('So put the safety check first. Well done. Now the theory and drills.', 'Toh safety check pehle rakho. Bahut badhiya. Ab theory aur drills.'), o => Card(o.r, { icon: '🛡️', title: 'Safety check first', body: 'i < len(a) and a[i] …', c: 'y' })]
    ])
  ]}
]});

/* ---------- mt15 · Big O ---------- */
E.register('mt15', { id: 'mt15-v1', pause: SLOW, startLabel: T('Start: Big O', 'Shuru karo: Big O'), outro: NEXT, chapters: [
  { t: '1 · How work grows', scenes: [
    intro('Math · 15', 'Big O: how fast does the work grow?', 'Not seconds, but growth.', [
      [T('We do not measure code in seconds, because computers differ. We ask: when the input doubles, what happens to the work?', 'Code ko seconds mein nahi naapte, kyunki computers alag hote hain. Poochte hain: input dugna hone pe kaam ka kya hota hai?')]
    ]),
    S('Three ways to find a friend', B => { const [a, b, c] = row(B, [1, 1, 1], { mid: true }); return { a, b, c }; }, [
      [T('You know your friend\'s seat number: walk straight there. The size of the cinema does not matter. That is O of one.', 'Dost ka seat number pata hai: seedha wahan jao. Cinema kitna bada hai, farak nahi. Ye O of one hai.'), o => Card(o.a, { icon: '🎯', title: 'O(1)', body: 'same work, any size', c: 's' })],
      [T('You check every seat: a cinema twice as big takes twice as long. O of n.', 'Har seat check karte ho: dugna bada cinema, dugna time. O of n.'), o => Card(o.b, { icon: '🚶', title: 'O(n)', body: 'double n → double work', c: 'y' })],
      [T('You compare every person with every other person: twice the people means four times the work. O of n squared.', 'Har insaan ko har doosre se compare karte ho: dugne log, chaar guna kaam. O of n square.'), o => Card(o.c, { icon: '🔁', title: 'O(n²)', body: 'double n → 4× work', c: 'm' })]
    ]),
    S('The growth chart', B => { const [l, r] = row(B, [1.2, 1]); return { ch: Chart(l, { xmax: 20, ymax: 100, skip0: true }), r }; }, [
      [T('Here are the growth curves side by side. O of one is flat.', 'Ye growth curves saath-saath hain. O of one seedha flat.'), o => o.ch.plot(() => 1, 'O(1)', 'm')],
      [T('O of log n barely rises. O of n is a straight line.', 'O of log n mushkil se uthta hai. O of n seedhi line.'), null, { seq: [o => o.ch.plot(x => Math.log2(x), 'O(log n)', 's'), o => o.ch.plot(x => x, 'O(n)', 'y')], gap: 1300 }],
      [T('O of n squared shoots up. Two to the n is off the chart almost immediately.', 'O of n square upar bhaagta hai. Do ki power n lagbhag turant chart se bahar.'), null, { seq: [o => o.ch.plot(x => x * x, 'O(n²)', 'c'), o => o.ch.plot(x => 2 ** x, 'O(2ⁿ)', 'v')], gap: 1300 }]
    ])
  ]},
  { t: '2 · Reading code', scenes: [
    S('Loops and halvings', B => { const [l, r] = row(B, [1.1, 1]); return { l, r }; }, [
      [T('One loop over n items: O of n.', 'n items pe ek loop: O of n.'), o => { o.c = Code(o.l, `for x in nums:          # n times\n    total += x`, { size: 20 }); Big(o.r, 'O(n)', { size: 56 }); }],
      [T('A loop inside a loop, both over n: n times n, O of n squared.', 'Loop ke andar loop, dono n pe: n guna n, O of n square.'), o => { o.l.innerHTML = ''; o.r.innerHTML = ''; Code(o.l, `for i in range(n):\n    for j in range(n):   # n × n\n        ...`, { size: 20 }); Big(o.r, 'O(n²)', { size: 56 }); }],
      [T('Halving each step: O of log n, from topic eight.', 'Har step aadha: O of log n, topic aath se.'), o => { o.l.innerHTML = ''; o.r.innerHTML = ''; Code(o.l, `while n > 1:\n    n //= 2`, { size: 20 }); Big(o.r, 'O(log n)', { size: 56 }); }],
      [T('Two rules: keep only the biggest term, and drop constants. Two separate loops is still O of n.', 'Do rules: sirf sabse bada term rakho, aur constants hatao. Do alag loops phir bhi O of n.'), o => { o.r.innerHTML = ''; Big(o.r, 'O(n) + O(n²) → O(n²)<br>O(2n) → O(n)', { size: 34 }); }]
    ]),
    S('Constraints are hints', B => ({ t: Tbl(B, ['n up to', 'aim for', 'think of'], [['about 20', 'O(2ⁿ)', 'subsets, backtracking'], ['about 5,000', 'O(n²)', 'nested loops'], ['10⁵ to 10⁶', 'O(n log n) or O(n)', 'sorting, sets, two pointers'], ['10⁹', 'O(log n) or O(1)', 'binary search, a formula']], { hidden: true, mono: [0, 1] }) }), [
      [T('A computer does roughly a hundred million simple steps per second. So the limit on n in a problem tells you what speed is expected.', 'Computer lagbhag das crore simple steps per second karta hai. Toh problem mein n ki limit batati hai kitni speed chahiye.'), null, { seq: [0, 1].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1300 }],
      [T('If n can be a hundred thousand, n squared is ten billion steps: too slow. Aim for n log n or n.', 'Agar n ek lakh ho sakta hai, n square das arab steps: bahut slow. n log n ya n ka target rakho.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1300 }],
      [T('Read the constraints before you code. Great work. Now the theory and drills.', 'Code se pehle constraints padho. Bahut badhiya. Ab theory aur drills.'), o => o.t.hl(2)]
    ])
  ]}
]});

/* ---------- mt16 · Limits and special values ---------- */
E.register('mt16', { id: 'mt16-v1', pause: SLOW, startLabel: T('Start: Limits and special values', 'Shuru karo: Limits aur special values'), outro: T('Math for Logic complete! Next: Python from zero.', 'Math for Logic poora! Aage: Python bilkul shuru se.'), chapters: [
  { t: '1 · Surprises at the edges', scenes: [
    intro('Math · 16', 'Limits and special values', 'Small surprises that cause big bugs.', [
      [T('Our last topic. Numbers inside a computer have a few surprises at the edges. Knowing them saves hours of debugging.', 'Humara aakhri topic. Computer ke andar numbers ke kinaron pe kuch surprises hain. Inhe jaanna ghanton ki debugging bachata hai.')]
    ]),
    S('Big whole numbers', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('In many languages, a whole number has a maximum size, and going past it wraps around to a negative. That is called overflow.', 'Kai languages mein whole number ki ek maximum size hoti hai, aur usse aage jaane pe wo ghoom ke negative ban jaata hai. Ise overflow kehte hain.'), o => Card(o.r, { icon: '⚠️', title: 'Overflow', body: 'other languages: max ≈ 2 × 10⁹', c: 'm' })],
      [T('Python\'s integers simply grow as big as needed. Two to the power one hundred just works.', 'Python ke integers jitna chahiye utne bade ho jaate hain. Do ki power sau bas chal jaata hai.'), o => { const c = Code(o.l, `print(2 ** 100)`, { size: 22 }); const x = Out(o.l, { h: 70 }); x.p('1267650600228229401496703205376'); }]
    ]),
    S('Decimals are not exact', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `print(0.1 + 0.2)\nprint(0.1 + 0.2 == 0.3)\nprint(abs(0.1 + 0.2 - 0.3) < 1e-9)`, { size: 21 }), out: Out(r, { h: 160 }), r }; }, [
      [T('Pause and think. Is zero point one plus zero point two equal to zero point three?', 'Ruko aur socho. Kya zero point ek plus zero point do, zero point teen ke barabar hai?'), null, { think: 6 }],
      [T('Surprise! It prints zero point three with a tiny extra piece. Computers store decimals in binary, and zero point one cannot be stored exactly.', 'Surprise! Ye zero point teen ke saath ek chhota extra tukda print karta hai. Computer decimals binary mein rakhta hai, aur zero point ek exact store nahi ho sakta.'), o => { o.c.hl(1); o.out.p('0.30000000000000004'); }],
      [T('So double equals says False. Never compare decimals with double equals. Check that the difference is tiny instead.', 'Toh double equals False bolta hai. Decimals ko kabhi double equals se compare mat karo. Uski jagah check karo ki farak bahut chhota hai.'), null, { seq: [o => { o.c.hl(2); o.out.p('False'); }, o => { o.c.hl(3); o.out.p('True'); }], gap: 1300 }]
    ])
  ]},
  { t: '2 · Safe starting values', scenes: [
    S('The zero trap', B => { const [top, bot] = col(B, [1, 1.2]); const [l, r] = row(bot, [1, 1]); return { a: Arr(top, [-5, -2, -9], { w: 90 }), l, r }; }, [
      [T('Find the largest of minus five, minus two and minus nine. If best starts at zero, no number beats it.', 'Minus paanch, minus do aur minus nau mein sabse bada dhoondho. Agar best zero se shuru ho, koi number use nahi harata.'), o => { o.v = Vars(o.l, { title: 'best starts at 0' }); o.v.set('best', '0', '', 'm'); }],
      [T('The answer comes out as zero, which is not even in the list.', 'Jawab zero aata hai, jo list mein hai hi nahi.'), o => o.v.set('best', '0 ✗', 'wrong', 'm')],
      [T('Start at minus infinity instead: a value smaller than every number. Now minus five beats it, then minus two.', 'Minus infinity se shuru karo: har number se chhoti value. Ab minus paanch use harata hai, phir minus do.'), o => { o.w = Vars(o.r, { title: "best starts at float('-inf')" }); o.w.set('best', '-inf', '', 's'); }, { seq: [[0, '-5'], [1, '-2'], [2, '-2']].map(([i, v]) => o => { o.a.clear(); o.a.hl(i, 'y'); o.w.set('best', v, '', 's'); }), gap: 1100 }]
    ]),
    S('Starting values', B => ({ t: Tbl(B, ['finding a', 'start with'], [['sum', '0'], ['product', '1'], ['maximum', "float('-inf') or the first item"], ['minimum', "float('inf') or the first item"]], { hidden: true, mono: [1] }) }), [
      [T('Here is a table to remember. A sum starts at zero, and a product at one.', 'Ye table yaad rakho. Sum zero se, product ek se.'), null, { seq: [0, 1].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1200 }],
      [T('A maximum starts at minus infinity, and a minimum at infinity, or at the first item.', 'Maximum minus infinity se, minimum infinity se, ya pehle item se.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1200 }],
      [T('That completes Math for Logic. You now have every maths tool DSA needs. Do the drills, then on to Python!', 'Math for Logic poora hua. Ab tumhare paas DSA ke liye har maths tool hai. Drills karo, phir Python ki taraf!')]
    ])
  ]}
]});
})();
