/* Python course videos, part C: py15 – py21 */
(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Out, Vars, Arr, Tbl, KV, StackV, QueueV } = E;
const { S, intro, range, fresh } = LH;
const NEXT = T('Next: the theory and drills below.', 'Aage: neeche ki theory aur drills.');

/* ---------- py15 · Built-ins ---------- */
E.register('py15', { id: 'py15-v1', startLabel: T('Start: Built-in tools', 'Shuru karo: Built-in tools'), outro: NEXT, chapters: [
  { t: '1 · The toolbox', scenes: [
    intro('Python · 15', 'Built-in tools', 'The functions you will reach for every single day.', [
      [T('A carpenter does not build a hammer before every job. Python gives you a toolbox of ready functions. Knowing them turns ten lines into one.', 'Carpenter har kaam se pehle hathoda nahi banata. Python ready functions ka toolbox deta hai. Inhe jaanoge toh das lines ek ban jaati hain.')]
    ]),
    S('Measure and summarise', B => ({ t: Tbl(B, ['tool', 'example', 'result'], [['len', 'len([4, 1, 7])', '3'], ['sum', 'sum([4, 1, 7])', '12'], ['min / max', 'max([4, 1, 7])', '7'], ['abs', 'abs(-5)', '5'], ['sorted', 'sorted([4, 1, 7])', '[1, 4, 7]  (new list)'], ['reversed', 'list(reversed([4, 1, 7]))', '[7, 1, 4]'], ['any / all', 'any(x > 5 for x in nums)', 'True']], { hidden: true, mono: [1, 2] }) }), [
      [T('len counts items. sum adds them. min and max find the extremes. abs removes the minus sign.', 'len items ginta hai. sum jodta hai. min aur max extremes dhoondhte hain. abs minus hata deta hai.'), null, { seq: [0, 1, 2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 700 }],
      [T('sorted returns a NEW sorted list and leaves the original alone. list dot sort sorts in place and returns None. Do not write x equals x dot sort.', 'sorted NAYI sorted list deta hai aur original ko nahi chhoota. list dot sort wahi par sort karta hai aur None deta hai. x equals x dot sort mat likhna.'), o => { o.t.show(4); o.t.hl(4); }],
      [T('reversed walks backwards. any is True if at least one item passes, all if every item passes.', 'reversed ulta chalta hai. any True agar kam se kam ek pass ho, all agar sab pass hon.'), null, { seq: [5, 6].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }]
    ]),
    S('enumerate and zip', B => { const [l, r] = row(B, [1.15, 1]); return { l, r }; }, [
      [T('enumerate gives index and value together. zip walks two lists side by side, like a zipper joining two rows of teeth.', 'enumerate index aur value saath deta hai. zip do lists saath-saath chalata hai, jaise zipper daanton ki do rows jodta hai.'), o => { Code(o.l, `names = ["Ravi", "Asha"]\nmarks = [80, 95]\nfor name, m in zip(names, marks):\n    print(name, m)`, { size: 21 }); const x = Out(o.r, { h: 90 }); x.p('Ravi 80'); x.p('Asha 95'); }]
    ]),
    S('Sorting with a key', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('sorted and max take a key: a small function that says WHAT to compare. Sort words by length, or intervals by their start.', 'sorted aur max ek key lete hain: chhota function jo batata hai KYA compare karna hai. Words ko length se, ya intervals ko start se sort karo.'), o => Code(o.l, `words = ["kiwi", "fig", "banana"]\nsorted(words, key=len)\n# ['fig', 'kiwi', 'banana']\n\nintervals.sort(key=lambda x: x[0])\nsorted(nums, reverse=True)`, { size: 20 })],
      [T('lambda is a one-line nameless function. lambda x colon x of zero means: given x, give back its first item.', 'lambda ek line ka bina naam ka function hai. lambda x colon x of zero matlab: x do, uska pehla item wapas lo.'), o => Card(o.r, { icon: 'λ', title: 'lambda', body: 'lambda x: x[0]<br>= def f(x): return x[0]', c: 'y' })]
    ])
  ]}
]});

/* ---------- py16 · Comprehensions ---------- */
E.register('py16', { id: 'py16-v1', startLabel: T('Start: Comprehensions', 'Shuru karo: Comprehensions'), outro: NEXT, chapters: [
  { t: '1 · One-line loops', scenes: [
    intro('Python · 16', 'Comprehensions', 'Build a list, set or dict in one readable line.', [
      [T('Many loops follow the same shape: start empty, loop, append. A comprehension writes that shape in one line.', 'Kai loops ek hi shape ke hote hain: khaali se shuru, loop, append. Comprehension wahi shape ek line mein likhta hai.')]
    ]),
    S('Loop → comprehension', B => { const [t, b] = col(B, [1, 1]); const [l, r] = row(t, [1, 1]); return { l, r, b }; }, [
      [T('Here is the long way: squares of every number.', 'Ye lamba tareeka: har number ka square.'), o => { o.c1 = Code(o.l, `squares = []\nfor x in nums:\n    squares.append(x * x)`, { size: 20, title: 'loop.py' }); }],
      [T('And the comprehension. Read it left to right: x times x, for each x in nums. The result expression comes first.', 'Aur comprehension. Left se right padho: x guna x, har x ke liye nums mein. Result wala hissa pehle aata hai.'), o => { Code(o.r, `squares = [x * x for x in nums]`, { size: 20, title: 'comprehension.py' }); Arr(o.b, [1, 4, 9, 16], { w: 70, label: 'nums = [1, 2, 3, 4] → squares' }); }],
      [T('Add an if at the end to filter. Only even numbers get in.', 'End mein if lagao toh filter. Sirf even numbers andar.'), o => { o.b.innerHTML = ''; Code(o.b, `evens = [x for x in nums if x % 2 == 0]   # [2, 4]`, { size: 20 }); }]
    ]),
    S('Sets, dicts and grids', B => { const [l, r] = row(B, [1.3, 1]); return { l, r }; }, [
      [T('Curly braces give a set comprehension, and key colon value gives a dict comprehension.', 'Curly braces se set comprehension, aur key colon value se dict comprehension.'), o => Code(o.l, `unique = {x % 3 for x in nums}\nlength = {w: len(w) for w in words}\ngrid = [[0] * cols for _ in range(rows)]`, { size: 19 })],
      [T('The underscore means "I do not need this variable". Rule of thumb: if a comprehension no longer fits comfortably on one line, go back to a normal loop. Clear beats clever.', 'Underscore matlab "mujhe ye variable nahi chahiye". Thumb rule: comprehension ek line mein aaraam se na aaye, toh normal loop pe wapas jao. Saaf code, chalaak code se behtar.'), o => Card(o.r, { icon: '🧭', title: 'Clear beats clever', body: 'One idea per comprehension.', c: 'y' })]
    ])
  ]}
]});

/* ---------- py17 · Classes ---------- */
E.register('py17', { id: 'py17-v1', startLabel: T('Start: Classes', 'Shuru karo: Classes'), outro: NEXT, chapters: [
  { t: '1 · Blueprints', scenes: [
    intro('Python · 17', 'Classes and objects', 'Blueprints for your own types, like the nodes in linked lists and trees.', [
      [T('A class is a blueprint. An object is a house built from it. One blueprint, many houses, each with its own paint colour.', 'Class ek blueprint hai. Object usse bana ghar. Ek blueprint, kai ghar, har ek ka apna rang.')]
    ]),
    S('A simple class', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `class Dog:\n    def __init__(self, name):\n        self.name = name\n        self.tricks = 0\n\n    def learn(self):\n        self.tricks += 1\n\nd = Dog("Tommy")\nd.learn()\nprint(d.name, d.tricks)`, { size: 19 }), r }; }, [
      [T('class Dog starts the blueprint. The special method underscore underscore init runs automatically when a new object is built.', 'class Dog blueprint shuru karta hai. Special method underscore underscore init naya object bante hi apne aap chalta hai.'), o => o.c.hl(1, 2)],
      [T('self means "this particular object". self dot name stores the name inside THIS dog, not all dogs.', 'self matlab "yahi wala object". self dot name naam ko IS dog ke andar rakhta hai, saare dogs mein nahi.'), o => o.c.hl(3, 4)],
      [T('A method is a function that belongs to the class. It changes this dog\'s own data.', 'Method class ka function hai. Ye isi dog ka apna data badalta hai.'), o => o.c.hl(6, 7)],
      [T('Dog of Tommy builds an object. Python passes self for you, so you only pass the name.', 'Dog of Tommy object banata hai. Python self khud bhejta hai, tum sirf naam bhejo.'), o => { o.c.hl(9, 10, 11); o.v = Vars(o.r, { title: 'd (a Dog object)' }); o.v.set('name', '"Tommy"', '', 'y'); o.v.set('tricks', '1', '', 's'); }]
    ])
  ]},
  { t: '2 · Classes in DSA', scenes: [
    S('ListNode and TreeNode', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('In DSA you will mostly READ two tiny classes that LeetCode gives you. A ListNode holds a value and a pointer to the next node.', 'DSA mein tum zyada tar do chhoti classes PADHOGE jo LeetCode deta hai. ListNode ek value aur agle node ka pointer rakhta hai.'), o => Code(o.l, `class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\na = ListNode(1, ListNode(2))\nprint(a.next.val)   # 2`, { size: 19, title: 'list_node.py' })],
      [T('A TreeNode holds a value and two pointers, left and right. None means "no child here".', 'TreeNode ek value aur do pointers rakhta hai, left aur right. None matlab "yahan koi bachcha nahi".'), o => Code(o.r, `class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right`, { size: 18, title: 'tree_node.py' })],
      [T('And the Solution class you write on LeetCode is just a class whose methods are your answers. That is why the first parameter is self.', 'Aur LeetCode pe likhi Solution class bas ek class hai jiske methods tumhare jawab hain. Isiliye pehla parameter self hai.')]
    ])
  ]}
]});

/* ---------- py18 · Errors and debugging ---------- */
E.register('py18', { id: 'py18-v1', startLabel: T('Start: Errors and debugging', 'Shuru karo: Errors aur debugging'), outro: NEXT, chapters: [
  { t: '1 · Know your errors', scenes: [
    intro('Python · 18', 'Errors and debugging', 'Every error has a name. Learn the names, and fixing gets easy.', [
      [T('Doctors know diseases by name. Once you know the name of an error, you already know where to look.', 'Doctor bimaariyon ko naam se jaante hain. Error ka naam pata ho toh pata hota hai kahan dekhna hai.')]
    ]),
    S('The usual suspects', B => ({ t: Tbl(B, ['error', 'usually means', 'example'], [['SyntaxError', 'broken grammar: missing colon, bracket, quote', 'if x > 3'], ['IndentationError', 'spaces at the start are wrong', 'mixing tabs and spaces'], ['NameError', 'name used before it exists, or a typo', 'print(totl)'], ['TypeError', 'wrong type for the operation', '"5" + 5'], ['IndexError', 'index past the end', 'nums[len(nums)]'], ['KeyError', 'dict key does not exist', 'd["missing"]'], ['ZeroDivisionError', 'divided by zero', '10 / 0']], { hidden: true, mono: [0, 2] }) }), [
      [T('SyntaxError and IndentationError mean Python could not even read your code. Look for a missing colon or bracket.', 'SyntaxError aur IndentationError matlab Python code padh hi nahi paaya. Missing colon ya bracket dhoondho.'), null, { seq: [0, 1].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }],
      [T('NameError is usually a typo. TypeError means you mixed types, like text plus a number.', 'NameError aksar typo hota hai. TypeError matlab types mix kiye, jaise text plus number.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }],
      [T('IndexError and KeyError mean you asked for something that is not there. Check your loop bounds and your keys.', 'IndexError aur KeyError matlab jo hai hi nahi wo maanga. Loop ki seemayein aur keys check karo.'), null, { seq: [4, 5, 6].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }]
    ])
  ]},
  { t: '2 · Handling and hunting', scenes: [
    S('try / except', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('try runs risky code. If a specific error happens, except catches it, and the program continues instead of crashing. Like a safety net under a trapeze.', 'try risky code chalata hai. Koi specific error aaye toh except use pakad leta hai, aur program crash hone ki jagah chalta rehta hai. Jaise trapeze ke neeche safety net.'), o => Code(o.l, `text = input("Age: ")\ntry:\n    age = int(text)\nexcept ValueError:\n    print("Please type a number")\n    age = 0`, { size: 21 })],
      [T('In DSA, you rarely need try. It is more important to prevent errors by checking bounds and empty inputs first.', 'DSA mein try ki zaroorat kam hi padti hai. Zyada zaroori hai pehle se bounds aur khaali input check karke errors rokna.'), o => Card(o.r, { icon: '🥅', title: 'Catch specific errors', body: 'except ValueError: ✓<br>bare except: ✗ hides bugs', c: 'y' })]
    ]),
    S('Debugging recipe', B => ({ th: E.Think(B, ['Read the LAST line of the error, then the line number', 'Reproduce with the smallest failing input', 'Print the variables inside the loop', 'Trace by hand in a table: compare expected vs actual', 'Explain the code line by line out loud (rubber duck)'], { title: 'When code is wrong' }) }), [
      [T('When the answer is wrong but nothing crashes, use this recipe. Read the error first, if there is one.', 'Jab answer galat ho par crash na ho, ye recipe use karo. Error ho toh pehle wo padho.'), o => o.th.on(0)],
      [T('Shrink the input until it is tiny but still wrong. Bugs hide in big inputs and show themselves in small ones.', 'Input ko chhota karo jab tak wo tiny ho par phir bhi galat. Bugs bade input mein chhupte hain aur chhote mein dikh jaate hain.'), o => o.th.on(1)],
      [T('Print variables inside the loop, and compare with a hand trace in a table. The first row where they differ is your bug.', 'Loop ke andar variables print karo, aur table mein hand trace se milao. Jis pehli row mein farak ho, wahi bug hai.'), null, { seq: [2, 3].map(i => o => o.th.on(i)), gap: 1200 }],
      [T('And the rubber duck: explain each line out loud to a toy. Halfway through, you will hear yourself say the mistake.', 'Aur rubber duck: har line ek khilone ko zor se samjhao. Aadhe raaste mein tum khud apni galti bolte suno ge.'), o => { o.th.on(4); o.th.done(); }]
    ])
  ]}
]});

/* ---------- py19 · Modules and the standard library ---------- */
E.register('py19', { id: 'py19-v1', startLabel: T('Start: The DSA standard library', 'Shuru karo: DSA standard library'), outro: NEXT, chapters: [
  { t: '1 · import', scenes: [
    intro('Python · 19', 'Modules and the DSA standard library', 'deque, Counter, defaultdict, heapq, bisect: your DSA 150 power tools.', [
      [T('A module is a file of ready-made tools. import brings the toolbox into your program. For DSA, five tools matter most.', 'Module ready-made tools ki file hai. import toolbox ko tumhare program mein laata hai. DSA ke liye paanch tools sabse zaroori.')]
    ]),
    S('deque: a double-ended queue', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `from collections import deque\nq = deque([1, 2])\nq.append(3)      # right end\nq.popleft()      # 1, O(1)\nq.appendleft(0)  # left end`, { size: 21 }), q: QueueV(r, { title: 'deque' }), r }; }, [
      [T('A queue is a ticket line: first in, first out. Popping from the front of a list is slow, because everything shifts. deque does it in O of one.', 'Queue ticket ki line hai: pehle aaya, pehle gaya. List ke aage se pop slow hai, kyunki sab khiskta hai. deque ye O of one mein karta hai.'), o => { o.c.hl(1, 2); o.q.enq(1); o.q.enq(2); }],
      [T('append adds at the back. popleft removes from the front. Every BFS in DSA 150 uses exactly these two.', 'append peeche jodta hai. popleft aage se hataata hai. DSA 150 ka har BFS bilkul yahi do use karta hai.'), null, { seq: [o => { o.c.hl(3); o.q.enq(3); }, o => { o.c.hl(4); o.q.deq(); }], gap: 1000 }]
    ]),
    S('Counter and defaultdict', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('Counter counts everything in one line. most_common gives the top items.', 'Counter ek line mein sab gin deta hai. most_common top items deta hai.'), o => { Code(o.l, `from collections import Counter, defaultdict\nc = Counter("banana")\nc.most_common(1)   # [('a', 3)]\n\ngroups = defaultdict(list)\ngroups["aet"].append("eat")`, { size: 19 }); const kv = KV(o.r, { title: 'Counter("banana")' }); kv.set('a', 3); kv.set('n', 2); kv.set('b', 1); }],
      [T('defaultdict creates a default value the first time you touch a missing key. No more "if key not in d" checks. Group Anagrams uses it.', 'defaultdict missing key ko pehli baar chhoote hi default value bana deta hai. "if key not in d" checks khatam. Group Anagrams ise use karta hai.')]
    ]),
    S('heapq and bisect', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('heapq keeps the smallest item at index zero. Push and pop are O of log n. For a max-heap, push negative numbers.', 'heapq sabse chhota item index zero pe rakhta hai. Push aur pop O of log n. Max-heap ke liye negative numbers push karo.'), o => Code(o.l, `import heapq\nh = []\nheapq.heappush(h, 5)\nheapq.heappush(h, 1)\nheapq.heappop(h)     # 1\n\nimport bisect\nbisect.bisect_left([1, 3, 5], 4)  # 2`, { size: 19 })],
      [T('bisect does binary search on a sorted list for you: it tells you where a value would be inserted.', 'bisect sorted list pe binary search khud kar deta hai: batata hai value kahan insert hogi.'), o => Tbl(o.r, ['tool', 'use it for'], [['deque', 'BFS, sliding window'], ['Counter', 'frequencies'], ['defaultdict', 'grouping, graphs'], ['heapq', 'top k, Dijkstra'], ['bisect', 'sorted insert / search']], {})]
    ])
  ]}
]});

/* ---------- py20 · Iterators, generators, files ---------- */
E.register('py20', { id: 'py20-v1', startLabel: T('Start: Iterators and files', 'Shuru karo: Iterators aur files'), outro: NEXT, chapters: [
  { t: '1 · One at a time', scenes: [
    intro('Python · 20', 'Iterators, generators, files and packages', 'How for loops really work, and a few everyday extras.', [
      [T('A for loop does not need the whole list at once. It just keeps asking: next item, please. Anything that can answer that question is an iterator.', 'for loop ko poori list ek saath nahi chahiye. Wo bas poochta rehta hai: agla item, please. Jo is sawaal ka jawab de sake, wo iterator hai.')]
    ]),
    S('Generators', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor x in countdown(3):\n    print(x)`, { size: 21 }), out: Out(r, { h: 150 }), r }; }, [
      [T('A generator is a function with yield instead of return. Like a tap: water comes out only when you open it, one glass at a time.', 'Generator ek function hai jismein return ki jagah yield. Nal jaisa: paani tabhi nikalta hai jab kholo, ek glass ek baar.'), o => o.c.hl(3)],
      [T('Each yield hands out one value and PAUSES. The next request resumes right after the yield.', 'Har yield ek value deta hai aur RUK jaata hai. Agli request yield ke theek baad se chalti hai.'), null, { seq: ['3', '2', '1'].map(t => o => { o.c.hl(3, 7); o.out.p(t); }), gap: 900 }],
      [T('It never builds the whole list, so it uses almost no memory. range works the same way.', 'Ye poori list kabhi nahi banata, toh memory lagbhag nahi leta. range bhi aise hi kaam karta hai.'), o => Card(o.r, { icon: '🚰', title: 'Lazy', body: 'range(10**9) uses tiny memory', c: 'y' })]
    ]),
    S('Files and packages', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('with open reads a file and closes it automatically, even if an error happens.', 'with open file padhta hai aur apne aap band karta hai, error aaye tab bhi.'), o => Code(o.l, `with open("notes.txt") as f:\n    for line in f:\n        print(line.strip())\n\n# terminal:\n# pip install requests`, { size: 20 })],
      [T('pip installs packages that other people wrote. For DSA practice you will not need any. The standard library is enough.', 'pip doosron ke likhe packages install karta hai. DSA practice ke liye kisi ki zaroorat nahi. Standard library kaafi hai.'), o => Card(o.r, { icon: '📦', title: 'pip', body: 'Not needed for LeetCode', c: 's' })]
    ])
  ]}
]});

/* ---------- py21 · Python for DSA ---------- */
E.register('py21', { id: 'py21-v1', startLabel: T('Start: Python for DSA', 'Shuru karo: DSA ke liye Python'), outro: T('Python done! Next: the Logic Gym, then the Warm-up 50.', 'Python ho gaya! Aage: Logic Gym, phir Warm-up 50.'), chapters: [
  { t: '1 · What things cost', scenes: [
    intro('Python · 21', 'Python for DSA: costs and gotchas', 'The hidden price tag of every operation.', [
      [T('Every operation has a price tag in time. Beginners write correct code that is secretly slow, because one line hides an O of n loop.', 'Har operation ki time mein keemat hoti hai. Beginners sahi code likhte hain jo chupke se slow hota hai, kyunki ek line mein O of n loop chhupa hota hai.')]
    ]),
    S('The price list', B => ({ t: Tbl(B, ['operation', 'cost', 'why'], [['lst[i], lst.append(x), lst.pop()', 'O(1)', 'end of the row'], ['lst.insert(0, x), lst.pop(0)', 'O(n)', 'everything shifts'], ['x in lst, lst.index(x), lst.count(x)', 'O(n)', 'scans every item'], ['x in set, d[key], d.get(key)', 'O(1)', 'hashing'], ['lst[a:b], lst.copy(), s[::-1]', 'O(k)', 'makes a copy'], ['sorted(lst), lst.sort()', 'O(n log n)', 'sorting'], ['s += ch in a loop', 'O(n²) total', 'new string each time → use join']], { hidden: true, mono: [0, 1] }) }), [
      [T('Indexing, append and pop at the end are O of one.', 'Indexing, end pe append aur pop O of one.'), o => { o.t.show(0); o.t.hl(0); }],
      [T('Anything at the FRONT of a list is O of n. Use a deque instead.', 'List ke AAGE kuch bhi O of n. deque use karo.'), o => { o.t.show(1); o.t.hl(1); }],
      [T('"in" on a list scans everything. "in" on a set or dict is instant. This single swap fixes half of all time limit errors.', 'List pe "in" sab scan karta hai. Set ya dict pe "in" turant. Ye ek badlaav aadhe time limit errors theek kar deta hai.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 900 }],
      [T('Slices copy, sorting is n log n, and adding to a string in a loop is quadratic. Collect in a list and join.', 'Slices copy karte hain, sorting n log n hai, aur loop mein string mein jodna quadratic hai. List mein jamaa karo aur join karo.'), null, { seq: [4, 5, 6].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 900 }]
    ])
  ]},
  { t: '2 · Gotchas', scenes: [
    S('Five traps', B => ({ b: Bul(B, ['<code>[[0] * n] * m</code> shares one row → use <code>[[0] * n for _ in range(m)]</code>', '<code>res.append(path)</code> stores a changing list → <code>res.append(path.copy())</code>', '<code>def f(x, seen=[])</code> keeps the same list between calls → use <code>None</code>', 'Deep recursion (> ~1000 levels) → RecursionError; use a loop or a stack', '<code>-7 // 2 == -4</code> (rounds down), use <code>int(-7 / 2)</code> to truncate toward zero'], { num: true, sm: true }) }), [
      [T('Five traps that cost people hours. One: multiplying a list of lists shares the same row.', 'Paanch traps jo logon ke ghante kha jaate hain. Ek: list of lists ko multiply karna same row share karta hai.'), o => o.b.show(0)],
      [T('Two: appending a list that you keep changing. Append a copy.', 'Do: aisi list append karna jo badalti rehti hai. Copy append karo.'), o => o.b.show(1)],
      [T('Three: a list as a default parameter is created only once and shared by every call.', 'Teen: default parameter mein list sirf ek baar banti hai aur har call use share karti hai.'), o => o.b.show(2)],
      [T('Four: very deep recursion crashes. Five: double slash rounds DOWN, so minus seven double slash two is minus four. Evaluate Reverse Polish Notation needs truncation instead.', 'Chaar: bahut gehra recursion crash karta hai. Paanch: double slash NEECHE round karta hai, toh minus saat double slash do minus chaar hai. Evaluate Reverse Polish Notation ko truncation chahiye.'), null, { seq: [3, 4].map(i => o => o.b.show(i)), gap: 1000 }],
      [T('That completes the Python course. You now know the whole language you need for DSA. Next, the Logic Gym turns this knowledge into problem solving muscle.', 'Python course poora hua. DSA ke liye jo poori language chahiye wo tum jaante ho. Ab Logic Gym is knowledge ko problem solving ki muscle banayega.')]
    ])
  ]}
]});
})();
