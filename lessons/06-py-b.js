/* Python course videos, part B: py08 – py14 */
(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Out, Vars, Arr, Tbl, KV, StackV, Grid } = E;
const { S, intro, range, fresh, Tree } = LH;
const NEXT = T('Next: the theory and drills below.', 'Aage: neeche ki theory aur drills.');

/* ---------- py08 · Nested loops and patterns ---------- */
E.register('py08', { id: 'py08-v1', startLabel: T('Start: Nested loops', 'Shuru karo: Nested loops'), outro: NEXT, chapters: [
  { t: '1 · Loops inside loops', scenes: [
    intro('Python · 8', 'Nested loops and patterns', 'A loop inside a loop, and how to draw any pattern.', [
      [T('A clock has an hour hand and a minute hand. For every single hour, the minute hand goes all the way round. That is a nested loop.', 'Ghadi mein ghante ki sui aur minute ki sui hoti hai. Har ek ghante mein minute ki sui poora chakkar lagati hai. Yahi nested loop hai.')]
    ]),
    S('Rows and columns', B => { const [l, r] = row(B, [1, 1]); return { c: Code(l, `for i in range(3):\n    for j in range(4):\n        print(i, j)`, { size: 23 }), g: Grid(r, 3, 4, { size: 70, fill: () => '' }), v: Vars(l) }; }, [
      [T('The outer loop picks a row. For that row, the inner loop runs through every column. Only then does the outer loop move on.', 'Outer loop ek row chunta hai. Us row ke liye inner loop har column se guzarta hai. Tabhi outer loop aage badhta hai.'), null, { seq: range(0, 11).map(k => o => { const i = Math.floor(k / 4), j = k % 4; o.g.set(i, j, `${i},${j}`); o.g.hl(i, j, 'y'); o.v.set('i', String(i), 'outer', 'y'); o.v.set('j', String(j), 'inner', 's'); o.c.hl(3); }), gap: 350 }],
      [T('Three rows times four columns: twelve prints. Nested loops multiply. That is why two nested loops over n items cost n squared.', 'Teen rows guna chaar columns: barah prints. Nested loops guna karte hain. Isiliye n items pe do nested loops n square lete hain.'), o => { for (let k = 0; k < 12; k++) o.g.set(Math.floor(k / 4), k % 4, `${Math.floor(k / 4)},${k % 4}`); o.c.hl(1, 2); }]
    ])
  ]},
  { t: '2 · Patterns', scenes: [
    S('A star triangle', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `n = 4\nfor i in range(1, n + 1):\n    print("*" * i)`, { size: 24 }), out: Out(r, { h: 200 }), r, l }; }, [
      [T('Every pattern problem is solved the same way. Do not look at the picture. Make a table: row number, and what that row prints.', 'Har pattern problem ek hi tareeke se solve hota hai. Picture mat dekho. Table banao: row number, aur wo row kya print karti hai.'), o => { o.t = Tbl(o.l, ['row i', 'stars'], [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']], { mono: [0, 1] }); }],
      [T('Row i has i stars. That relationship IS the code. Python can even repeat a string with times.', 'Row i mein i stars. Wahi rishta hi code hai. Python string ko guna se repeat bhi kar sakta hai.'), null, { seq: [1, 2, 3, 4].map(i => o => { o.t.hl(i - 1); o.out.p('*'.repeat(i)); }), gap: 700 }],
      [T('Pause and think. How would you print the upside-down triangle, four stars down to one?', 'Ruko aur socho. Ulta triangle kaise print karoge, chaar stars se ek tak?'), null, { think: 6 }],
      [T('Same table, new rule: row i prints n minus i plus one stars. Or simply loop i from n down to one with range of n, zero, minus one.', 'Wahi table, naya rule: row i n minus i plus ek stars print karti hai. Ya simply i ko n se ek tak chalao, range of n, zero, minus ek.'), o => Code(o.r, `for i in range(n, 0, -1):\n    print("*" * i)`, { size: 21, title: 'reverse.py' })]
    ]),
    S('A pyramid: spaces + stars', B => { const [l, r] = row(B, [1.1, 1]); return { l, r }; }, [
      [T('Harder: a pyramid. Each row has some spaces, then some stars. Put BOTH in the table.', 'Mushkil: pyramid. Har row mein kuch spaces, phir kuch stars. DONO table mein daalo.'), o => { o.t = Tbl(o.l, ['row i', 'spaces', 'stars'], [['1', '3', '1'], ['2', '2', '3'], ['3', '1', '5'], ['4', '0', '7']], { mono: [0, 1, 2] }); o.out = Out(o.r, { h: 160 }); ['   *', '  ***', ' *****', '*******'].forEach(t => o.out.p(t)); }],
      [T('Spaces go down by one: n minus i. Stars go up by two: two i minus one. Find the rule for each column, and the code writes itself.', 'Spaces ek-ek kam: n minus i. Stars do-do badhte: do i minus ek. Har column ka rule dhoondho, code khud likh jaata hai.'), o => Code(o.l, `for i in range(1, n + 1):\n    print(" " * (n - i) + "*" * (2 * i - 1))`, { size: 19 })]
    ])
  ]}
]});

/* ---------- py09 · Strings ---------- */
E.register('py09', { id: 'py09-v1', startLabel: T('Start: Strings', 'Shuru karo: Strings'), outro: NEXT, chapters: [
  { t: '1 · A row of characters', scenes: [
    intro('Python · 9', 'Strings', 'Text as a row of characters, with indexes, slices and methods.', [
      [T('A string is a row of characters, like beads on a thread. Each bead has a position number called an index.', 'String characters ki ek row hai, jaise dhaage mein moti. Har moti ka ek position number hota hai jise index kehte hain.')]
    ]),
    S('Indexes', B => { const [t, b] = col(B, [1, 1]); return { a: Arr(t, ['P', 'y', 't', 'h', 'o', 'n'], { w: 80, label: 's = "Python"' }), b }; }, [
      [T('Indexes start at ZERO, not one. The first character is s of zero. P.', 'Index ZERO se shuru hote hain, ek se nahi. Pehla character s of zero hai. P.'), o => { o.a.hl(0, 'y'); o.a.ptr('s[0]', 0, 'y'); }],
      [T('The last index is length minus one. Six characters, so the last is s of five.', 'Aakhri index length minus ek hai. Chhe characters, toh aakhri s of five.'), o => { o.a.hl(5, 's'); o.a.ptr('s[5]', 5, 's'); }],
      [T('Python has a gift: negative indexes count from the end. s of minus one is always the last character.', 'Python ka tohfa: negative index end se ginte hain. s of minus ek hamesha aakhri character hai.'), o => Big(o.b, 's[-1] == "n"   ·   len(s) == 6', { size: 36 })],
      [T('Asking for s of six crashes with IndexError: string index out of range. It is the most common bug with strings and lists.', 's of six maangoge toh IndexError: string index out of range se crash. Strings aur lists ka sabse common bug.'), o => Card(o.b, { icon: '💥', title: 's[6]', body: 'IndexError: string index out of range', c: 'm' })]
    ]),
    S('Slicing', B => { const [t, b] = col(B, [1, 1.2]); return { a: Arr(t, ['P', 'y', 't', 'h', 'o', 'n'], { w: 80 }), b }; }, [
      [T('A slice cuts out a piece: s from one to four. Start included, stop excluded, just like range. y, t, h.', 'Slice ek tukda kaat ta hai: s one se four tak. Start shaamil, stop nahi, bilkul range jaisa. y, t, h.'), o => { o.a.hl([1, 2, 3], 'y'); Big(o.b, 's[1:4] → "yth"', { size: 38 }); }],
      [T('Leave out a side and it goes to the edge. s up to two is Py. s from two onwards is thon.', 'Ek side chhod do toh wo kinare tak jaata hai. s do tak, Py. s do se aage, thon.'), o => { o.a.clear(); o.a.hl([0, 1], 's'); o.b.innerHTML = ''; Big(o.b, 's[:2] → "Py"   ·   s[2:] → "thon"', { size: 34 }); }],
      [T('And the famous one: s with step minus one walks backwards. That reverses the string in one line.', 'Aur famous wala: step minus ek ulta chalta hai. Ek line mein string ulti.'), o => { o.a.clear(); o.b.innerHTML = ''; Big(o.b, 's[::-1] → "nohtyP"', { size: 40 }); }]
    ])
  ]},
  { t: '2 · Working with strings', scenes: [
    S('Strings cannot change', B => { const [l, r] = row(B, [1.1, 1]); return { l, r }; }, [
      [T('Strings are immutable. You cannot change a character in place. It is like a printed page: to fix a typo, you print a new page.', 'Strings immutable hain. Character wahi par badal nahi sakte. Chhapa hua page jaisa: typo theek karna ho toh naya page chhaapo.'), o => Code(o.l, `s = "cat"\ns[0] = "b"      # TypeError!\ns = "b" + s[1:]  # new string "bat"`, { size: 21 })],
      [T('Building a string with plus inside a loop makes a new copy every time, which is slow. Collect pieces in a list and join them once.', 'Loop mein plus se string banana har baar nayi copy banata hai, jo slow hai. Tukde list mein jamaa karo aur ek baar join karo.'), o => Code(o.r, `parts = []\nfor ch in "abc":\n    parts.append(ch.upper())\nprint("".join(parts))  # ABC`, { size: 20, title: 'fast.py' })]
    ]),
    S('Useful methods', B => ({ t: Tbl(B, ['method', 'example', 'result'], [['lower / upper', '"Hi".lower()', '"hi"'], ['strip', '"  hi \\n".strip()', '"hi"'], ['split', '"a b c".split()', '["a", "b", "c"]'], ['join', '"-".join(["a", "b"])', '"a-b"'], ['count / find', '"banana".count("a")', '3'], ['isalpha / isdigit / isalnum', '"a1".isalnum()', 'True'], ['in', '"ana" in "banana"', 'True']], { hidden: true, mono: [1, 2] }) }), [
      [T('A handful of methods cover almost everything. lower and upper change case. strip removes spaces at the ends.', 'Kuch methods lagbhag sab cover karte hain. lower aur upper case badalte hain. strip kinaron ke spaces hatata hai.'), null, { seq: [0, 1].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }],
      [T('split breaks text into a list of words, and join glues a list back into text. They are opposites.', 'split text ko words ki list mein todta hai, aur join list ko wapas text mein jodta hai. Dono ulte hain.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }],
      [T('count, find, the is-checks, and the in operator. The palindrome problem uses isalnum and lower.', 'count, find, is-checks, aur in operator. Palindrome problem isalnum aur lower use karta hai.'), null, { seq: [4, 5, 6].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }]
    ])
  ]}
]});

/* ---------- py10 · Lists ---------- */
E.register('py10', { id: 'py10-v1', startLabel: T('Start: Lists', 'Shuru karo: Lists'), outro: NEXT, chapters: [
  { t: '1 · The workhorse', scenes: [
    intro('Python · 10', 'Lists', 'Python\'s array: an ordered row of boxes you can change.', [
      [T('A list is a train of numbered compartments. You can look into any compartment instantly, add compartments at the end, or remove them.', 'List numbered dibbon wali train hai. Kisi bhi dibbe mein turant jhaank sakte ho, end mein dibbe jod sakte ho, ya hata sakte ho.')]
    ]),
    S('Changing a list', B => { const [t, b] = col(B, [1, 1]); const [l, r] = row(b, [1.1, 1]); return { t, a: Arr(t, [5, 8, 2], { w: 76, label: 'nums' }), l, r }; }, [
      [T('nums equals five, eight, two. Index zero is five. Unlike strings, lists CAN change.', 'nums equals paanch, aath, do. Index zero paanch hai. Strings ke ulat, lists badal SAKTI hain.'), o => { o.c = Code(o.l, `nums = [5, 8, 2]\nnums[1] = 9\nnums.append(7)\nnums.pop()\nnums.insert(0, 1)`, { size: 21 }); o.c.hl(1); }],
      [T('Assign to an index to replace that item. Eight becomes nine.', 'Index pe assign karo toh item badal jaata hai. Aath nau ban gaya.'), o => { o.c.hl(2); o.a.set(1, 9); o.a.hl(1, 'y'); }],
      [T('append adds to the end. Fast, O of one.', 'append end mein jodta hai. Tez, O of one.'), o => { o.c.hl(3); o.a.clear(); o.a.push(7); o.a.hl(3, 's'); }],
      [T('pop removes from the end and gives it back. Also O of one.', 'pop end se hataata hai aur wapas deta hai. Ye bhi O of one.'), o => { o.c.hl(4); o.a.pop(); }],
      [T('insert at the front is slow: every item shifts one place right, like everyone in a queue stepping back. O of n.', 'Aage insert karna slow hai: har item ek jagah right khiskta hai, jaise line mein sab ek kadam peeche. O of n.'), o => { o.c.hl(5); o.a = fresh(o.t, t => Arr(t, [1, 5, 9, 2], { w: 76, label: 'nums' })); o.a.hl(0, 'm'); Card(o.r, { icon: '🐢', title: 'insert(0, x) / pop(0)', body: 'O(n): everything shifts', c: 'm' }); }]
    ])
  ]},
  { t: '2 · The alias trap', scenes: [
    S('Two names, one list', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)\n\nc = a.copy()   # or a[:]\nc.append(5)\nprint(a)`, { size: 21 }), out: Out(r, { h: 110 }), r }; }, [
      [T('This one surprises everyone. b equals a does NOT copy the list. It sticks a second name tag on the SAME list.', 'Ye sabko chaunkata hai. b equals a list copy NAHI karta. Wo USI list pe doosra name tag chipka deta hai.'), o => o.c.hl(2)],
      [T('So appending through b changes what a sees. Printing a shows one, two, three, four.', 'Toh b se append karne se a bhi badal jaata hai. a print karo toh ek, do, teen, chaar.'), o => { o.c.hl(3, 4); o.out.p('[1, 2, 3, 4]'); }],
      [T('Like two people sharing one Google Doc. Either one edits, both see it. To get your own copy, use copy or a full slice.', 'Jaise do log ek Google Doc share karein. Koi bhi edit kare, dono ko dikhe. Apni alag copy chahiye toh copy ya poora slice use karo.'), o => { o.c.hl(6, 7, 8); o.out.p('[1, 2, 3, 4]'); Card(o.r, { icon: '📄', title: 'Shared doc', body: 'b = a → same list<br>c = a.copy() → new list', c: 'y' }); }],
      [T('This matters in backtracking: results.append(path) stores the SAME list that keeps changing. Always append path.copy().', 'Backtracking mein ye zaroori hai: results.append(path) WAHI list rakhta hai jo badalti rehti hai. Hamesha path.copy() append karo.')]
    ]),
    S('Grids: lists of lists', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('A grid is a list of rows. grid of r, of c reads row r, column c.', 'Grid rows ki list hai. grid of r, of c matlab row r, column c.'), o => { Code(o.l, `grid = [[0] * 3 for _ in range(2)]\ngrid[1][2] = 7\n\nbad = [[0] * 3] * 2   # same row twice!\nbad[1][2] = 7         # both rows change`, { size: 19 }); const g = Grid(o.r, 2, 3, { size: 64, fill: () => '0' }); g.set(1, 2, '7'); g.hl(1, 2, 'y'); }],
      [T('Build grids with a comprehension. Multiplying the outer list copies the same row object, the alias trap again.', 'Grid comprehension se banao. Bahar wali list ko multiply karne se same row object copy hota hai, phir wahi alias trap.')]
    ])
  ]}
]});

/* ---------- py11 · Tuples and sets ---------- */
E.register('py11', { id: 'py11-v1', startLabel: T('Start: Tuples and sets', 'Shuru karo: Tuples aur sets'), outro: NEXT, chapters: [
  { t: '1 · Tuples', scenes: [
    intro('Python · 11', 'Tuples and sets', 'Sealed packets, and guest lists with no duplicates.', [
      [T('Two more containers. A tuple is a sealed packet: once packed, it cannot change. A set is a guest list: every name appears once, and checking a name is instant.', 'Do aur containers. Tuple seal kiya packet hai: pack hone ke baad badal nahi sakta. Set guest list hai: har naam ek baar, aur naam check karna turant.')]
    ]),
    S('Tuples and unpacking', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `point = (3, 4)\nx, y = point\na, b = 1, 2\na, b = b, a       # swap!\npairs = [(1, "one"), (2, "two")]\nfor num, word in pairs:\n    print(num, word)`, { size: 20 }), v: Vars(r), r }; }, [
      [T('A tuple uses round brackets. Use it for things that belong together, like a point with x and y.', 'Tuple gol brackets use karta hai. Jo cheezein saath hon unke liye, jaise x aur y wala point.'), o => { o.c.hl(1); o.v.set('point', '(3, 4)', 'tuple', 'y'); }],
      [T('Unpacking opens the packet into separate names in one line.', 'Unpacking packet ko ek line mein alag naamon mein khol deta hai.'), o => { o.c.hl(2); o.v.set('x', '3', '', 's'); o.v.set('y', '4', '', 's'); }],
      [T('That gives Python its famous one-line swap. The right side is packed first, then unpacked into a and b.', 'Isi se Python ka famous one-line swap milta hai. Right side pehle pack hota hai, phir a aur b mein khulta hai.'), o => { o.c.hl(3, 4); o.v.set('a', '2', '', 'y'); o.v.set('b', '1', '', 'y'); }],
      [T('And you can unpack right in a for loop. Tuples can be dictionary keys and set items, because they never change.', 'Aur for loop mein seedha unpack kar sakte ho. Tuples dictionary keys aur set items ban sakte hain, kyunki kabhi badalte nahi.'), o => o.c.hl(5, 6, 7)]
    ])
  ]},
  { t: '2 · Sets', scenes: [
    S('A guest list', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `seen = set()\nfor x in [3, 1, 3, 2, 1]:\n    seen.add(x)\nprint(seen)          # {1, 2, 3}\nprint(2 in seen)     # True, O(1)\nprint(len(set("banana")))  # 3`, { size: 20 }), r }; }, [
      [T('add puts a value in. Adding a value that is already there does nothing. So a set removes duplicates automatically.', 'add value daalta hai. Jo value pehle se hai use daalo toh kuch nahi hota. Toh set duplicates apne aap hata deta hai.'), o => { o.c.hl(1, 2, 3, 4); Arr(o.r, [1, 2, 3], { w: 70, label: 'seen', noIdx: true }); }],
      [T('The superpower: checking "x in seen" is O of one, instant, even with a million items. With a list, it would scan every item.', 'Superpower: "x in seen" check karna O of one, turant, das lakh items ke saath bhi. List mein har item scan hota.'), o => { o.c.hl(5); Card(o.r, { icon: '⚡', title: 'x in set → O(1)', body: 'x in list → O(n)', c: 'y' }); }],
      [T('Sets have no order and no indexes. You cannot ask for seen of zero.', 'Sets ka koi order ya index nahi. seen of zero nahi maang sakte.'), o => o.c.hl(6)]
    ]),
    S('Set maths', B => ({ t: Tbl(B, ['code', 'meaning', 'result for a={1,2,3}, b={2,3,4}'], [['a & b', 'in both (intersection)', '{2, 3}'], ['a | b', 'in either (union)', '{1, 2, 3, 4}'], ['a - b', 'in a but not b', '{1}']], { hidden: true, mono: [0, 2] }) }), [
      [T('Sets also do Venn diagram maths. And gives what is common, or gives everything, minus gives what only a has.', 'Sets Venn diagram wala maths bhi karte hain. And common deta hai, or sab kuch, minus sirf a wala.'), null, { seq: [0, 1, 2].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1000 }]
    ])
  ]}
]});

/* ---------- py12 · Dictionaries ---------- */
E.register('py12', { id: 'py12-v1', startLabel: T('Start: Dictionaries', 'Shuru karo: Dictionaries'), outro: NEXT, chapters: [
  { t: '1 · Key → value', scenes: [
    intro('Python · 12', 'Dictionaries', 'The most important structure in DSA: instant lookup by key.', [
      [T('Your phone contacts: you search by name, and get the number. You never scroll through numbers to find a name. That is a dictionary: key to value.', 'Phone contacts: naam se dhoondhte ho, number milta hai. Naam ke liye numbers scroll nahi karte. Yahi dictionary hai: key se value.')]
    ]),
    S('Basics', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `ages = {"Ravi": 20, "Asha": 22}\nprint(ages["Asha"])\nages["Meena"] = 19\nages["Ravi"] = 21\nprint(ages.get("Zoya", 0))\nprint("Ravi" in ages)`, { size: 21 }), kv: KV(r, { title: 'ages' }), r }; }, [
      [T('Curly braces, with key colon value pairs.', 'Curly braces, key colon value ki jodiyan.'), o => { o.c.hl(1); o.kv.set('"Ravi"', 20); o.kv.set('"Asha"', 22); }],
      [T('Square brackets with a key give its value. Asha is twenty-two. Instant, O of one.', 'Square brackets mein key do toh value milti hai. Asha twenty-two. Turant, O of one.'), o => { o.c.hl(2); o.kv.hl('"Asha"'); }],
      [T('Assigning to a new key adds it. Assigning to an existing key replaces the value. Keys are unique.', 'Nayi key pe assign karo toh jud jaati hai. Purani key pe karo toh value badal jaati hai. Keys unique hoti hain.'), o => { o.c.hl(3, 4); o.kv.set('"Meena"', 19); o.kv.set('"Ravi"', 21); o.kv.hl('"Ravi"'); }],
      [T('Reading a missing key with brackets crashes with KeyError. get returns a default instead. And "in" checks the keys.', 'Missing key brackets se padho toh KeyError crash. get uski jagah default deta hai. Aur "in" keys check karta hai.'), o => { o.c.hl(5, 6); o.kv.hl(null); }]
    ])
  ]},
  { t: '2 · Counting', scenes: [
    S('The counting pattern', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `count = {}\nfor ch in "banana":\n    count[ch] = count.get(ch, 0) + 1\nprint(count)`, { size: 21 }), a: Arr(l, [...'banana'], { w: 58 }), kv: KV(r, { title: 'count' }) }; }, [
      [T('The pattern you will use in dozens of problems: count how many times each thing appears.', 'Wo pattern jo tum darjanon problems mein use karoge: har cheez kitni baar aayi, gino.'), o => o.c.hl(1)],
      [T('For each letter: get the current count, zero if new, add one, store it back.', 'Har letter ke liye: abhi ki ginti lo, naya ho toh zero, ek jodo, wapas rakho.'), null, { seq: [...'banana'].map((ch, i) => o => { const n = [...'banana'].slice(0, i + 1).filter(x => x === ch).length; o.a.clear(); o.a.hl(i, 'y'); o.kv.set(ch, n); o.kv.hl(ch); o.c.hl(3); }), gap: 800 }],
      [T('b once, a three times, n twice. Anagrams, majority element, top k frequent: all start with exactly this.', 'b ek baar, a teen baar, n do baar. Anagrams, majority element, top k frequent: sab bilkul yahin se shuru hote hain.'), o => { o.a.clear(); o.kv.hl(null); o.c.hl(4); }]
    ]),
    S('Looping over a dict', B => { const [l, r] = row(B, [1.15, 1]); return { l, r }; }, [
      [T('Loop over items to get each key and value together. keys and values give just one side.', 'items pe loop chalao toh har key aur value saath milti hai. keys aur values sirf ek taraf dete hain.'), o => { Code(o.l, `for name, age in ages.items():\n    print(name, age)\n\nprint(list(ages.keys()))\nprint(max(ages, key=ages.get))`, { size: 20 }); }],
      [T('Keys must be unchangeable: numbers, strings or tuples. A list cannot be a key, but its tuple version can.', 'Keys badalne wali nahi honi chahiye: numbers, strings ya tuples. List key nahi ban sakti, par uska tuple ban sakta hai.'), o => Card(o.r, { icon: '🔑', title: 'Valid keys', body: '5 · "abc" · (1, 2) ✓<br>[1, 2] ✗ → use tuple(lst)', c: 'y' })]
    ])
  ]}
]});

/* ---------- py13 · Functions ---------- */
E.register('py13', { id: 'py13-v1', startLabel: T('Start: Functions', 'Shuru karo: Functions'), outro: NEXT, chapters: [
  { t: '1 · A machine', scenes: [
    intro('Python · 13', 'Functions', 'Name a piece of logic once, use it everywhere.', [
      [T('A function is a juice machine. Put fruit in, get juice out. You do not care what happens inside every time; you just use it.', 'Function ek juice machine hai. Fruit daalo, juice nikalo. Har baar andar kya hota hai iski fikar nahi; bas use karo.')]
    ]),
    S('def and return', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `def area(w, h):\n    result = w * h\n    return result\n\nx = area(3, 4)\ny = area(5, 2)\nprint(x + y)`, { size: 22 }), v: Vars(r, { title: 'Memory' }), r }; }, [
      [T('def starts a function. area is its name. w and h are parameters: the slots where inputs arrive.', 'def function shuru karta hai. area uska naam. w aur h parameters hain: wo jagah jahan inputs aate hain.'), o => o.c.hl(1)],
      [T('Defining it does nothing yet. The machine is built but switched off. It runs only when called.', 'Define karne se abhi kuch nahi hota. Machine bani par band hai. Call karne par hi chalti hai.'), o => o.c.note(1, 'built, not run', 'm')],
      [T('area of three, four. Three goes into w, four into h. The body runs, and return sends twelve back to where it was called.', 'area of teen, chaar. Teen w mein, chaar h mein. Body chalti hai, aur return barah wapas wahan bhejta hai jahan call hua.'), o => { o.c.unnote(1); o.c.hl(5, 2, 3); o.v.set('w', '3', 'local', 's'); o.v.set('h', '4', 'local', 's'); o.v.set('x', '12', '', 'y'); }],
      [T('Call it again with new inputs, and the same machine gives ten. Twenty-two in total.', 'Naye inputs ke saath dobara call karo, wahi machine das deti hai. Kul baais.'), o => { o.c.hl(6, 7); o.v.set('w', '5', 'local', 's'); o.v.set('h', '2', 'local', 's'); o.v.set('y', '10', '', 'y'); const x = Out(o.r, { h: 60 }); x.p('22'); }],
      [T('w, h and result live only inside the function, while it runs. They are local. Outside code cannot see them.', 'w, h aur result sirf function ke andar, chalte waqt rehte hain. Ye local hain. Bahar ka code inhe nahi dekh sakta.'), o => { o.v.del('w'); o.v.del('h'); }]
    ])
  ]},
  { t: '2 · Traps', scenes: [
    S('print is not return', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('The biggest beginner confusion. print SHOWS a value on screen. return GIVES a value back to the code. A function without return gives back None.', 'Beginners ka sabse bada confusion. print value screen pe DIKHATA hai. return value code ko WAPAS DETA hai. Bina return ka function None deta hai.'), o => { Code(o.l, `def double(n):\n    print(n * 2)\n\nx = double(5)   # shows 10\nprint(x + 1)    # TypeError!`, { size: 21, title: 'bug.py' }); Code(o.r, `def double(n):\n    return n * 2\n\nx = double(5)\nprint(x + 1)    # 11`, { size: 21, title: 'fixed.py' }); }],
      [T('LeetCode always wants return. Printing the answer does not count.', 'LeetCode hamesha return chahta hai. Answer print karna count nahi hota.')]
    ]),
    S('Defaults and the class wrapper', B => { const [l, r] = row(B, [1, 1.1]); return { l, r }; }, [
      [T('Parameters can have defaults. Leave the argument out, and the default is used.', 'Parameters ke defaults ho sakte hain. Argument na do toh default use hota hai.'), o => Code(o.l, `def greet(name, greeting="Hi"):\n    return f"{greeting}, {name}"\n\ngreet("Asha")          # Hi, Asha\ngreet("Asha", "Hello")  # Hello, Asha`, { size: 19 })],
      [T('On LeetCode, your function lives inside a class called Solution, and its first parameter is self. Ignore self for now; just write the body. You will understand classes in module seventeen.', 'LeetCode pe tumhara function Solution naam ki class ke andar hota hai, aur pehla parameter self. Abhi self ignore karo; bas body likho. Classes module satrah mein samjhoge.'), o => Code(o.r, `class Solution:\n    def twoSum(self, nums, target):\n        ...\n        return [i, j]`, { size: 20, title: 'leetcode.py' })]
    ])
  ]}
]});

/* ---------- py14 · Recursion ---------- */
E.register('py14', { id: 'py14-v1', startLabel: T('Start: Recursion', 'Shuru karo: Recursion'), outro: NEXT, chapters: [
  { t: '1 · A function that calls itself', scenes: [
    intro('Python · 14', 'Recursion', 'Solve a big problem by trusting a smaller copy of it.', [
      [T('Russian dolls. To reach the smallest doll, open a doll, and inside is a smaller doll of the same kind. Keep opening until the tiny one that does not open. That is recursion.', 'Russian dolls. Sabse chhoti doll tak pahunchne ke liye, doll kholo, andar wahi jaisi chhoti doll. Kholte raho jab tak wo chhoti si na aa jaaye jo nahi khulti. Yahi recursion hai.')],
      [T('Every recursive function has two parts. A base case: the tiny doll, answered directly. And a recursive case: the same problem, a little smaller.', 'Har recursive function ke do hisse. Base case: chhoti doll, seedha jawab. Aur recursive case: wahi problem, thoda chhota.')]
    ]),
    S('Factorial on the call stack', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `def fact(n):\n    if n == 1:\n        return 1\n    return n * fact(n - 1)\n\nprint(fact(4))`, { size: 23 }), st: StackV(r, { title: 'Call stack', h: 280 }), r }; }, [
      [T('fact of four is four times fact of three. We do not know that yet, so this call waits, and a new call goes on top of the stack.', 'fact of four matlab chaar guna fact of three. Wo abhi pata nahi, toh ye call rukti hai, aur nayi call stack ke upar jaati hai.'), o => { o.c.hl(4); o.st.push('fact(4) waits: 4 × ?'); }],
      [T('Three waits for two, two waits for one.', 'Teen do ka wait karta hai, do ek ka.'), null, { seq: [3, 2].map(n => o => o.st.push(`fact(${n}) waits: ${n} × ?`)), gap: 800 }],
      [T('fact of one hits the base case and returns one directly. No more calls. Now the stack unwinds.', 'fact of one base case pe pahunchta hai aur seedha ek return karta hai. Aur calls nahi. Ab stack khulta hai.'), o => { o.c.hl(2, 3); o.st.push('fact(1) = 1 ✓'); }],
      [T('Two times one is two. Three times two is six. Four times six is twenty-four.', 'Do guna ek, do. Teen guna do, chhe. Chaar guna chhe, chaubees.'), null, { seq: [0, 1, 2, 3].map(() => o => o.st.pop()), gap: 800 }],
      [T('Forget the base case, and the calls never stop. Python gives up after about a thousand levels with RecursionError.', 'Base case bhool gaye toh calls kabhi nahi rukti. Python lagbhag hazaar levels ke baad RecursionError deta hai.'), o => Card(o.r, { icon: '🪆', title: 'No base case?', body: 'RecursionError: maximum recursion depth exceeded', c: 'm' })]
    ])
  ]},
  { t: '2 · Thinking recursively', scenes: [
    S('The leap of faith', B => ({ th: E.Think(B, ['What is the smallest input? Answer it directly (base case).', 'Assume the call on a smaller input already works.', 'How do I build MY answer from that smaller answer?', 'Does every call move toward the base case?'], { title: 'Recursion recipe' }) }), [
      [T('Do not trace every call in your head. Use the recipe. First the base case.', 'Har call dimaag mein trace mat karo. Recipe use karo. Pehle base case.'), o => o.th.on(0)],
      [T('Then the leap of faith: assume the smaller call already returns the right answer. Like a manager trusting the team.', 'Phir bharose ki chhalaang: maan lo chhoti call sahi jawab deti hai. Jaise manager team pe bharosa karta hai.'), o => o.th.on(1)],
      [T('Then build your answer from it. Sum of a list is the first item plus the sum of the rest.', 'Phir usse apna jawab banao. List ka sum matlab pehla item plus baaki ka sum.'), o => o.th.on(2)],
      [T('And make sure every call gets smaller. That is all. Trees, backtracking and DP are all built on this recipe.', 'Aur pakka karo ki har call chhoti ho. Bas. Trees, backtracking aur DP sab isi recipe pe bane hain.'), o => { o.th.on(3); o.th.done(); }]
    ]),
    S('Where the time goes', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Fibonacci the simple way calls itself twice, and repeats the same work again and again. Five calls fib of two three times.', 'Fibonacci simple tareeke se khud ko do baar call karta hai, aur same kaam baar-baar karta hai. Fib five, fib two ko teen baar bulata hai.'), o => Code(o.l, `def fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)`, { size: 21 })],
      [T('Store answers you have already computed, and it becomes fast. This one idea is dynamic programming, which you will meet in DSA 150.', 'Jo jawab nikal chuke unhe store karo, aur ye tez ho jaata hai. Yahi ek idea dynamic programming hai, jo DSA 150 mein milega.'), o => Code(o.r, `from functools import cache\n\n@cache\ndef fib(n):\n    if n < 2:\n        return n\n    return fib(n - 1) + fib(n - 2)`, { size: 20, title: 'fast.py' })]
    ])
  ]}
]});
})();
