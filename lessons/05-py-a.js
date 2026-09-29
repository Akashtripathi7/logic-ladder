/* Python course videos, part A: py01 – py07 */
(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Out, Vars, Arr, Tbl } = E;
const { S, intro, range } = LH;

/* ---------- py01 · Getting started ---------- */
E.register('py01', { id: 'py01-v1', startLabel: T('Start: Hello, Python', 'Shuru karo: Hello, Python'), outro: T('Next: read the theory below and try the drills.', 'Aage: neeche ki theory padho aur drills try karo.'), chapters: [
  { t: '1 · What is code?', scenes: [
    intro('Python · 1', 'Getting started', 'What a program is, and your very first lines of Python.', [
      [T("Welcome to the Python course. If you have never written a single line of code, you are in exactly the right place. We start from zero.", 'Python course mein swagat hai. Agar tumne kabhi code ki ek line bhi nahi likhi, toh tum bilkul sahi jagah ho. Hum zero se shuru karenge.')],
      [T('A program is a recipe. A recipe is a list of steps, in order, that a cook follows exactly. A program is a list of steps that the computer follows exactly.', 'Program ek recipe hai. Recipe steps ki list hoti hai, order mein, jo cook bilkul waise hi follow karta hai. Program steps ki list hai jo computer bilkul waise hi follow karta hai.')]
    ]),
    S('Why Python?', B => { const [a, b, c] = row(B, [1, 1, 1], { mid: true }); return { a, b, c }; }, [
      [T('Why Python? First, it reads almost like English. That means your brain spends its energy on logic, not on symbols.', 'Python kyun? Pehla, ye lagbhag English jaisa padhta hai. Matlab tumhara dimaag energy logic pe lagata hai, symbols pe nahi.'), o => Card(o.a, { icon: '📖', title: 'Reads like English', body: 'for name in names:<br>&nbsp;&nbsp;print(name)', c: 'y' })],
      [T('Second, it is the most popular language for coding interviews, because solutions are short and clear.', 'Doosra, coding interviews ke liye ye sabse popular language hai, kyunki solutions chhote aur saaf hote hain.'), o => Card(o.b, { icon: '🎯', title: 'Interview favourite', body: 'Short, clear DSA solutions', c: 's' })],
      [T('Third, it comes with batteries included: ready-made tools for queues, heaps and counting that we will use all the time in DSA.', 'Teesra, batteries included: queue, heap aur counting ke ready-made tools, jo DSA mein hum hamesha use karenge.'), o => Card(o.c, { icon: '🔋', title: 'Batteries included', body: 'deque, heapq, Counter…', c: 'm' })]
    ])
  ]},
  { t: '2 · First program', scenes: [
    S('Hello, world', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `print("Hello, world!")\nprint("I am learning Python")\nprint(2 + 3)\n# This line is a comment\nprint("Done")`, { size: 22, hidden: true }), out: Out(r, { h: 260 }) }; }, [
      [T('Here is your first program. print is a command that shows something on the screen.', 'Ye raha tumhara pehla program. print ek command hai jo screen pe kuch dikhata hai.'), o => { o.c.reveal(1); o.c.hl(1); }],
      [T('Python runs it, and the text appears in the output. The quotes mark where the text starts and ends. Text inside quotes is called a string.', 'Python ise chalata hai, aur text output mein aa jaata hai. Quotes batate hain text kahan shuru aur kahan khatam. Quotes ke andar ka text string kehlata hai.'), o => o.out.p('Hello, world!')],
      [T('The computer runs lines from top to bottom, one at a time, like reading a book.', 'Computer lines upar se neeche, ek-ek karke chalata hai, jaise kitaab padhte ho.'), o => { o.c.reveal(2); o.c.hl(2); o.out.p('I am learning Python'); }],
      [T('No quotes this time. Without quotes, Python treats it as maths, calculates two plus three, and prints five.', 'Is baar quotes nahi. Bina quotes ke Python ise maths maanta hai, do plus teen calculate karta hai, aur paanch print karta hai.'), o => { o.c.reveal(3); o.c.hl(3); o.out.p('5'); }],
      [T('A line starting with a hash is a comment. Python ignores it completely. Comments are notes for humans.', 'Hash se shuru hone wali line comment hai. Python use poori tarah ignore karta hai. Comments insaanon ke liye notes hain.'), o => { o.c.reveal(4); o.c.hl(4); o.c.note(4, 'ignored', 'm'); }],
      [T('And the last line prints Done. Five lines, four outputs. You just read a program exactly the way the computer does.', 'Aur aakhri line Done print karti hai. Paanch lines, chaar outputs. Tumne abhi program bilkul computer ki tarah padha.'), o => { o.c.reveal(5); o.c.hl(5); o.out.p('Done'); }]
    ]),
    S('Indentation is grammar', B => { const [l, r] = row(B, [1.1, 1]); return { l, r }; }, [
      [T('One rule makes Python special: indentation, the spaces at the start of a line, is part of the grammar.', 'Ek rule Python ko special banata hai: indentation, yaani line ki shuruaat ke spaces, grammar ka hissa hai.'), o => { o.c = Code(o.l, `age = 20\nif age >= 18:\n    print("adult")\n    print("can vote")\nprint("always runs")`, { size: 22 }); }],
      [T('Think of bullet points in your notes. Sub-points are pushed to the right, so everyone knows they belong to the point above.', 'Apne notes ke bullet points socho. Sub-points right khiske hote hain, taaki sabko pata chale wo upar wale point ke hain.'), o => { o.c.hl(3, 4); Card(o.r, { icon: '📝', title: 'Like sub-points', body: 'The 4 spaces say: these lines belong to the if.', c: 'y' }); }],
      [T('The colon at the end of the if line says: a block is coming. The indented lines are that block. The last line is not indented, so it always runs.', 'if line ke end ka colon bolta hai: ab ek block aane wala hai. Indented lines wahi block hain. Aakhri line indented nahi, toh wo hamesha chalti hai.'), o => { o.c.hl(2); o.c.note(2, 'colon!', 'y'); o.c.note(5, 'outside the block', 's'); }],
      [T('Use four spaces for each level. Mixing tabs and spaces, or forgetting the colon, are the two most common beginner errors.', 'Har level ke liye chaar spaces. Tabs aur spaces milana, ya colon bhoolna, beginners ki do sabse common galtiyan hain.'), o => Card(o.r, { icon: '⚠️', title: 'Common errors', body: 'IndentationError · SyntaxError: expected \':\'', c: 'm' })]
    ]),
    S('Reading an error', B => { const [l, r] = row(B, [1.2, 1]); return { l, r }; }, [
      [T('Errors are not failures. They are Python telling you exactly what went wrong and where. Let us read one.', 'Errors fail hona nahi hai. Ye Python hai jo batata hai kya galat hua aur kahan. Chalo ek padhte hain.'), o => { const x = Out(o.l, { title: 'Error message', h: 200 }); ['Traceback (most recent call last):', '  File "main.py", line 3, in <module>', '    print(total)', "NameError: name 'total' is not defined"].forEach(t => x.p(t)); }],
      [T('Always read from the BOTTOM. The last line tells you the type of error and the reason: the name total was never created.', 'Hamesha NEECHE se padho. Aakhri line error ka type aur wajah batati hai: total naam kabhi banaya hi nahi gaya.'), o => Card(o.r, { icon: '👇', title: 'Read the last line first', body: 'Type of error + the reason', c: 'y' })],
      [T('The line above it says which line of your file to look at. Line three. Go there, fix it, run again. That loop is what programming really feels like.', 'Uske upar wali line batati hai file ki kaunsi line dekhni hai. Line teen. Wahan jao, theek karo, dobara chalao. Programming asal mein aisi hi lagti hai.'), o => Card(o.r, { icon: '📍', title: 'Then find the line', body: 'line 3 → fix → run again', c: 's' })]
    ])
  ]}
]});

/* ---------- py02 · Variables and types ---------- */
E.register('py02', { id: 'py02-v1', startLabel: T('Start: Variables and types', 'Shuru karo: Variables aur types'), outro: T('Next: the theory and drills below.', 'Aage: neeche ki theory aur drills.'), chapters: [
  { t: '1 · Variables', scenes: [
    intro('Python · 2', 'Variables and data types', 'Name tags for values, and the kinds of values Python knows.', [
      [T('A program needs to remember things: a score, a name, a list of marks. It remembers them in variables.', 'Program ko cheezein yaad rakhni padti hain: score, naam, marks ki list. Wo unhe variables mein yaad rakhta hai.')]
    ]),
    S('A labelled box', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `score = 10\nname = "Asha"\nscore = score + 5\nprint(name, score)`, { size: 24, hidden: true }), v: Vars(r), r }; }, [
      [T('Think of a variable as a box with a name tag. score equals ten means: make a box called score, and put ten inside.', 'Variable ko ek box socho jis par naam ka tag laga hai. score equals das matlab: score naam ka box banao, aur andar das rakh do.'), o => { o.c.reveal(1); o.c.hl(1); o.v.set('score', '10', 'int', 'y'); }],
      [T('The equals sign does NOT mean equal like in maths. It means: store the right side into the name on the left. Read it as "gets".', 'Equals sign ka matlab maths wala barabar NAHI hai. Matlab hai: right side ki value left wale naam mein rakho. Ise "gets" padho.'), o => o.c.note(1, 'score gets 10', 'y')],
      [T('name gets the string Asha.', 'name ko string Asha milti hai.'), o => { o.c.reveal(2); o.c.hl(2); o.v.set('name', '"Asha"', 'str', 's'); }],
      [T('Now the tricky one. Python first works out the RIGHT side, ten plus five is fifteen, and only then stores it back into score. The old ten is replaced.', 'Ab tricky wala. Python pehle RIGHT side nikalta hai, das plus paanch pandrah, aur phir use wapas score mein rakhta hai. Purana das hat jaata hai.'), o => { o.c.reveal(3); o.c.hl(3); o.v.set('score', '15', 'int', 'y'); }],
      [T('And print shows both, separated by a space.', 'Aur print dono dikhata hai, beech mein space ke saath.'), o => { o.c.reveal(4); o.c.hl(4); const x = Out(o.r, { h: 60 }); x.p('Asha 15'); }]
    ]),
    S('Naming rules', B => ({ b: Bul(B, ['Letters, digits and _ only; cannot start with a digit: <code>total2</code> ✓, <code>2total</code> ✗', 'Case matters: <code>Score</code> and <code>score</code> are different boxes', 'Use snake_case and clear names: <code>max_height</code>, not <code>mh</code>', 'Never use built-in names like <code>list</code>, <code>str</code>, <code>sum</code> as variables']) }), [
      [T('A few naming rules. Letters, digits and underscores, but never start with a digit.', 'Naam ke kuch rules. Letters, digits aur underscore, par digit se kabhi shuru nahi.'), o => o.b.show(0)],
      [T('Capital letters matter. Score with a capital S is a completely different box.', 'Capital letters matter karte hain. Capital S wala Score bilkul alag box hai.'), o => o.b.show(1)],
      [T('Write names that explain themselves. Future you will thank present you.', 'Aise naam likho jo khud samjha dein. Aage wala tum, aaj wale tum ko thank you bolega.'), o => o.b.show(2)],
      [T('And never name a variable list or sum. You would hide Python\'s own tools behind your box.', 'Aur kabhi variable ka naam list ya sum mat rakhna. Tum Python ke apne tools ko apne box ke peeche chhupa doge.'), o => o.b.show(3)]
    ])
  ]},
  { t: '2 · Data types', scenes: [
    S('The basic types', B => ({ t: Tbl(B, ['type', 'what it holds', 'examples'], [['int', 'whole numbers, any size', '7, -3, 10**20'], ['float', 'decimal numbers', '3.14, -0.5, 2.0'], ['str', 'text, in quotes', '"hi", \'Asha\', ""'], ['bool', 'yes / no', 'True, False'], ['NoneType', 'nothing yet', 'None']], { hidden: true, mono: [0, 2] }) }), [
      [T('Every value has a type. The type decides what you can do with it.', 'Har value ka ek type hota hai. Type decide karta hai ki uske saath kya kar sakte ho.')],
      [T('int is a whole number. In Python an int can be as big as you like. It never overflows.', 'int poora number hai. Python mein int kitna bhi bada ho sakta hai. Kabhi overflow nahi hota.'), o => { o.t.show(0); o.t.hl(0); }],
      [T('float is a number with a decimal point. Floats are close approximations, so never compare them with double equals for money.', 'float decimal point wala number hai. Floats approx hote hain, isliye paison ke liye unhe double equals se compare mat karo.'), o => { o.t.show(1); o.t.hl(1); }],
      [T('str is text. Single or double quotes both work. An empty string is just two quotes.', 'str text hai. Single ya double dono quotes chalte hain. Khaali string bas do quotes hai.'), o => { o.t.show(2); o.t.hl(2); }],
      [T('bool is True or False, with capital letters. Every if statement runs on booleans.', 'bool matlab True ya False, capital letters ke saath. Har if statement booleans pe chalta hai.'), o => { o.t.show(3); o.t.hl(3); }],
      [T('And None means "no value yet". It is like an empty box that exists but holds nothing.', 'Aur None matlab "abhi koi value nahi". Jaise ek khaali box jo hai, par andar kuch nahi.'), o => { o.t.show(4); o.t.hl(4); }]
    ]),
    S('Asking for the type', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `print(type(7))\nprint(type(7.0))\nprint(type("7"))\nprint(type(7 > 3))`, { size: 24 }), out: Out(r, { h: 220 }), r }; }, [
      [T('type tells you the type of any value. Seven, seven point zero and the string seven look alike to us, but they are three different things to Python.', 'type kisi bhi value ka type batata hai. Saat, saat point zero aur string saat humein ek jaise lagte hain, par Python ke liye teen alag cheezein hain.'), null, { seq: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'bool'>"].map((t, i) => o => { o.c.hl(i + 1); o.out.p(t); }), gap: 900 }],
      [T('Python is dynamically typed: the box does not have a fixed type. The same name can hold an int now and a string later. Freedom, but be careful.', 'Python dynamically typed hai: box ka type fixed nahi. Same naam abhi int aur baad mein string rakh sakta hai. Azaadi hai, par dhyaan se.'), o => Card(o.r, { icon: '🔄', title: 'Dynamic typing', body: 'x = 5 → x = "five" is allowed', c: 's' })]
    ])
  ]}
]});

/* ---------- py03 · Input, output, conversion ---------- */
E.register('py03', { id: 'py03-v1', startLabel: T('Start: Input and output', 'Shuru karo: Input aur output'), outro: T('Next: the theory and drills below.', 'Aage: neeche ki theory aur drills.'), chapters: [
  { t: '1 · Input is text', scenes: [
    intro('Python · 3', 'Input, output and conversion', 'Talking to the user, and turning text into numbers.', [
      [T('Programs talk. They take input, and they give output. Let us see both, and the one trap that catches every beginner.', 'Programs baat karte hain. Input lete hain, output dete hain. Dono dekhte hain, aur wo ek trap jismein har beginner fasta hai.')]
    ]),
    S('The "5" + "5" trap', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `a = input("First: ")\nb = input("Second: ")\nprint(a + b)`, { size: 23 }), v: Vars(r), r }; }, [
      [T('input waits for the user to type something and press Enter. Say the user types five, and then five again.', 'input user ke type karke Enter dabane ka wait karta hai. Maan lo user paanch type karta hai, phir dobara paanch.'), o => { o.c.hl(1, 2); o.v.set('a', '"5"', 'str', 's'); o.v.set('b', '"5"', 'str', 's'); }],
      [T('What prints? Not ten. It prints fifty-five! input ALWAYS gives you a string, and plus on strings glues them together.', 'Kya print hoga? Das nahi. Pachpan print hoga! input HAMESHA string deta hai, aur strings pe plus unhe chipka deta hai.'), o => { o.c.hl(3); const x = Out(o.r, { h: 60 }); x.p('55'); }, { think: 5 }],
      [T('Imagine a waiter writing your order on paper. Even if you say five, the paper says the word five. To do maths, you must convert it to a number.', 'Socho waiter tumhara order kaagaz pe likhta hai. Tum paanch bolo toh bhi kaagaz pe shabd paanch likha hai. Maths ke liye use number mein badalna padega.')]
    ]),
    S('Converting', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `a = int(input("First: "))\nb = int(input("Second: "))\nprint(a + b)\n\nprice = float("99.5")\ntext = str(42) + "!"`, { size: 22 }), v: Vars(r), r }; }, [
      [T('Wrap input in int. Now a and b are real numbers, and plus adds them. Ten.', 'input ko int mein lapeto. Ab a aur b asli numbers hain, aur plus unhe jodta hai. Das.'), o => { o.c.hl(1, 2, 3); o.v.set('a', '5', 'int', 'y'); o.v.set('b', '5', 'int', 'y'); o.v.set('a + b', '10', 'int', 'm'); }],
      [T('float converts to a decimal. str goes the other way, number to text, so you can glue it to other text.', 'float decimal mein badalta hai. str ulta kaam karta hai, number se text, taaki use doosre text se jod sako.'), o => { o.c.hl(5, 6); o.v.set('price', '99.5', 'float', 's'); o.v.set('text', '"42!"', 'str', 's'); }],
      [T('Careful: int of "hello" crashes with a ValueError, because hello is not a number.', 'Dhyaan do: int of "hello" ValueError se crash karta hai, kyunki hello number nahi hai.'), o => Card(o.r, { icon: '💥', title: 'int("hello")', body: 'ValueError: invalid literal for int()', c: 'm' })]
    ])
  ]},
  { t: '2 · Nice output', scenes: [
    S('f-strings', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `name = "Asha"\nmarks = 92\nprint(f"{name} scored {marks}")\nprint(f"Half is {marks / 2}")\nprint("a", "b", "c", sep="-")\nprint("no newline", end=" ")\nprint("same line")`, { size: 21 }), out: Out(r, { h: 230 }) }; }, [
      [T('The best way to mix text and values is an f-string. Put the letter f before the quotes, and put any variable inside curly braces.', 'Text aur values milane ka best tareeka f-string hai. Quotes se pehle f lagao, aur koi bhi variable curly braces ke andar daalo.'), o => { o.c.hl(3); o.out.p('Asha scored 92'); }],
      [T('You can even put a calculation inside the braces.', 'Braces ke andar calculation bhi daal sakte ho.'), o => { o.c.hl(4); o.out.p('Half is 46.0'); }],
      [T('print has two handy options. sep changes what goes between values, and end changes what goes at the end instead of a new line.', 'print ke do kaam ke options hain. sep badalta hai values ke beech kya aaye, aur end badalta hai ki aakhir mein new line ki jagah kya aaye.'), o => { o.c.hl(5, 6, 7); o.out.p('a-b-c'); o.out.p('no newline same line'); }]
    ]),
    S('Reading many numbers', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `line = input()        # "3 8 5"\nparts = line.split()  # ["3", "8", "5"]\nnums = list(map(int, parts))\nprint(sum(nums))`, { size: 21 }), r }; }, [
      [T('In practice problems, many numbers often arrive on one line, separated by spaces. Here is the standard recipe.', 'Practice problems mein aksar ek line mein kai numbers aate hain, spaces se alag. Ye raha standard recipe.'), o => o.c.hl(1)],
      [T('split cuts the string at the spaces and gives a list of small strings.', 'split string ko spaces pe kaat ke chhoti strings ki list deta hai.'), o => { o.c.hl(2); Arr(o.r, ['"3"', '"8"', '"5"'], { w: 80, label: 'parts' }); }],
      [T('map applies int to every piece, and list collects the results. Now they are real numbers, and the sum is sixteen.', 'map har tukde pe int lagata hai, aur list results ikattha karti hai. Ab ye asli numbers hain, aur sum solah hai.'), o => { o.c.hl(3, 4); Arr(o.r, [3, 8, 5], { w: 80, label: 'nums' }); Big(o.r, '16', { size: 48 }); }]
    ])
  ]}
]});

/* ---------- py04 · Operators ---------- */
E.register('py04', { id: 'py04-v1', startLabel: T('Start: Operators', 'Shuru karo: Operators'), outro: T('Next: the theory and drills below.', 'Aage: neeche ki theory aur drills.'), chapters: [
  { t: '1 · Arithmetic', scenes: [
    intro('Python · 4', 'Operators', 'The verbs of Python: calculate, compare, combine.', [
      [T('If values are the nouns of Python, operators are the verbs. They calculate, compare and combine.', 'Agar values Python ke nouns hain, toh operators verbs hain. Ye calculate, compare aur combine karte hain.')]
    ]),
    S('Seven maths operators', B => ({ t: Tbl(B, ['operator', 'meaning', 'example', 'result'], [['+', 'add', '17 + 5', '22'], ['-', 'subtract', '17 - 5', '12'], ['*', 'multiply', '17 * 5', '85'], ['/', 'divide (always float)', '17 / 5', '3.4'], ['//', 'floor divide (round down)', '17 // 5', '3'], ['%', 'remainder (modulo)', '17 % 5', '2'], ['**', 'power', '2 ** 5', '32']], { hidden: true, mono: [0, 2, 3] }) }), [
      [T('Plus, minus and times work exactly as in school.', 'Plus, minus aur guna bilkul school jaise.'), null, { seq: [0, 1, 2].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 700 }],
      [T('A single slash always gives a float, even for ten divided by two, which gives five point zero.', 'Single slash hamesha float deta hai, das bata do ke liye bhi, jo paanch point zero deta hai.'), o => { o.t.show(3); o.t.hl(3); }],
      [T('Double slash divides and throws away the decimal part. Seventeen sweets shared among five kids: each gets three.', 'Double slash divide karke decimal hissa phenk deta hai. Satrah mithaiyan paanch bachchon mein: har ek ko teen.'), o => { o.t.show(4); o.t.hl(4); }],
      [T('And percent gives what is left over: two sweets remain. You will use double slash and percent in almost every digit problem.', 'Aur percent bacha hua deta hai: do mithaiyan bachti hain. Double slash aur percent tum lagbhag har digit problem mein use karoge.'), o => { o.t.show(5); o.t.hl(5); }],
      [T('Double star is power. Two to the power five is thirty-two.', 'Double star power hai. Do ki power paanch, battees.'), o => { o.t.show(6); o.t.hl(6); }]
    ])
  ]},
  { t: '2 · Compare and combine', scenes: [
    S('Comparison gives a bool', B => { const [l, r] = row(B, [1, 1]); return { c: Code(l, `age = 17\nprint(age >= 18)\nprint(age == 17)\nprint(age != 17)\nprint(1 < age < 20)`, { size: 23 }), out: Out(r, { h: 200 }), r }; }, [
      [T('Comparisons ask a question, and the answer is always True or False.', 'Comparisons ek sawaal poochte hain, aur jawab hamesha True ya False hota hai.'), null, { seq: ['False', 'True', 'False', 'True'].map((t, i) => o => { o.c.hl(i + 2); o.out.p(t); }), gap: 900 }],
      [T('Remember: one equals sign stores a value. Two equals signs ASK whether two values are equal. Mixing them up is a classic bug.', 'Yaad rakho: ek equals value store karta hai. Do equals POOCHTA hai ki dono barabar hain kya. Inhe mix karna classic bug hai.'), o => Card(o.r, { icon: '⚖️', title: '= vs ==', body: 'x = 5 stores · x == 5 asks', c: 'y' })],
      [T('Python even lets you chain: one less than age less than twenty, just like maths.', 'Python chaining bhi deta hai: ek less than age less than bees, bilkul maths jaisa.'), o => o.c.hl(5)]
    ]),
    S('and, or, not', B => { const [a, b, c] = row(B, [1, 1, 1], { mid: true }); return { a, b, c }; }, [
      [T('and is True only if both sides are True. You need a ticket and an ID to board.', 'and tabhi True jab dono taraf True. Board karne ke liye ticket aur ID dono chahiye.'), o => Card(o.a, { icon: '🎫', title: 'and', body: 'has_ticket and has_id', c: 'y' })],
      [T('or is True if at least one side is True. Pay by cash or card.', 'or True jab kam se kam ek taraf True. Cash ya card se pay karo.'), o => Card(o.b, { icon: '💳', title: 'or', body: 'cash or card', c: 's' })],
      [T('not flips True and False. Python also stops early: in "x != 0 and 10 / x > 1", if x is zero, the division never runs. That is called short-circuiting.', 'not True aur False palat deta hai. Python jaldi ruk bhi jaata hai: "x != 0 and 10 / x > 1" mein, x zero ho toh division chalta hi nahi. Ise short-circuit kehte hain.'), o => Card(o.c, { icon: '🔁', title: 'not', body: 'not True → False', c: 'm' })]
    ]),
    S('Shortcuts and order', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Shortcut assignment: count plus equals one means count equals count plus one. You will write this thousands of times.', 'Shortcut assignment: count plus equals ek matlab count equals count plus ek. Ye tum hazaaron baar likhoge.'), o => Code(o.l, `count = 0\ncount += 1   # count = count + 1\ntotal -= 5\nx *= 2`, { size: 23 })],
      [T('Order of operations follows maths: power first, then times and divide, then plus and minus. When unsure, add brackets. Brackets are free.', 'Operations ka order maths jaisa: pehle power, phir guna aur bhaag, phir plus aur minus. Confuse ho toh brackets lagao. Brackets free hain.'), o => { Big(o.r, '2 + 3 * 4 = 14', { size: 40 }); Big(o.r, '(2 + 3) * 4 = 20', { size: 40 }); }]
    ])
  ]}
]});

/* ---------- py05 · Conditions ---------- */
E.register('py05', { id: 'py05-v1', startLabel: T('Start: Conditions', 'Shuru karo: Conditions'), outro: T('Next: the theory and drills below.', 'Aage: neeche ki theory aur drills.'), chapters: [
  { t: '1 · Decisions', scenes: [
    intro('Python · 5', 'Conditions: if, elif, else', 'Teaching your program to make decisions.', [
      [T('Every app makes decisions. If the password is right, log in. Otherwise, show an error. That is an if statement.', 'Har app faisle leta hai. Password sahi ho toh login. Warna error dikhao. Yahi if statement hai.')]
    ]),
    S('A fork in the road', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `marks = 72\nif marks >= 90:\n    grade = "A"\nelif marks >= 75:\n    grade = "B"\nelif marks >= 50:\n    grade = "C"\nelse:\n    grade = "Fail"\nprint(grade)`, { size: 21 }), v: Vars(r), r }; }, [
      [T('Think of a road with several turns. You check the signs from top to bottom, and you take the FIRST turn whose sign matches. Then you stop checking.', 'Ek sadak socho jismein kai mod hain. Tum signs upar se neeche check karte ho, aur PEHLA mod lete ho jiska sign match kare. Phir check karna band.'), o => o.v.set('marks', '72', 'int', 'y')],
      [T('Is seventy-two at least ninety? No. Skip that block.', 'Kya bahattar kam se kam nabbe hai? Nahi. Wo block skip.'), o => { o.c.hl(2); o.c.note(2, 'False', 'm'); }],
      [T('At least seventy-five? No. Skip.', 'Kam se kam pachhattar? Nahi. Skip.'), o => { o.c.hl(4); o.c.note(4, 'False', 'm'); }],
      [T('At least fifty? Yes! Run this block: grade becomes C.', 'Kam se kam pachaas? Haan! Ye block chalao: grade C ban jaata hai.'), o => { o.c.hl(6, 7); o.c.note(6, 'True', 's'); o.v.set('grade', '"C"', 'str', 's'); }],
      [T('Because one branch already ran, else is skipped entirely. Only one branch of an if-elif-else chain ever runs.', 'Kyunki ek branch chal chuki, else poora skip. if-elif-else chain mein sirf ek hi branch chalti hai.'), o => { o.c.hl(10); const x = Out(o.r, { h: 60 }); x.p('C'); }],
      [T('Pause and think. What grade would ninety-five get? And what about exactly seventy-five?', 'Ruko aur socho. Pachaanve ko kaunsa grade milega? Aur theek pachhattar ko?'), null, { think: 6 }],
      [T('Ninety-five gets A: the first sign matches. Seventy-five gets B, because greater-than-or-equal includes seventy-five itself.', 'Pachaanve ko A: pehla sign match. Pachhattar ko B, kyunki greater-than-or-equal mein pachhattar khud shaamil hai.')]
    ])
  ]},
  { t: '2 · Traps', scenes: [
    S('Order matters', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Watch this bug. The checks are in the wrong order. Ninety-five is also at least fifty, so it gets C. The A branch is never reached.', 'Ye bug dekho. Checks galat order mein hain. Pachaanve bhi kam se kam pachaas hai, toh use C mil jaata hai. A wali branch tak kabhi pahunchte hi nahi.'), o => { const c = Code(o.l, `if marks >= 50:\n    grade = "C"\nelif marks >= 90:\n    grade = "A"   # never runs!`, { size: 22, title: 'bug.py' }); c.hl(4); }],
      [T('Rule: with ranges, go from the most specific to the least specific. Highest first, or lowest first, but in a clean order.', 'Rule: ranges ke saath, sabse specific se kam specific ki taraf jao. Sabse bada pehle, ya sabse chhota pehle, par saaf order mein.'), o => Card(o.r, { icon: '🪜', title: 'Check strictest first', body: '>= 90, then >= 75, then >= 50', c: 'y' })]
    ]),
    S('Truthy and falsy', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('An if does not need a comparison. Python treats some values as false by themselves: zero, an empty string, an empty list, and None.', 'if ko comparison ki zaroorat nahi. Python kuch values ko khud hi false maanta hai: zero, khaali string, khaali list, aur None.'), o => Bul(o.l, ['<code>0</code>, <code>0.0</code>', '<code>""</code> empty string', '<code>[]</code>, <code>{}</code>, <code>set()</code>', '<code>None</code>'], { shown: true })],
      [T('Everything else is truthy. So "if nums:" means: if the list is not empty. You will see it everywhere in real Python.', 'Baaki sab truthy hai. Toh "if nums:" matlab: agar list khaali nahi hai. Asli Python mein ye har jagah dikhega.'), o => Code(o.r, `nums = []\nif not nums:\n    print("empty!")`, { size: 23 })]
    ])
  ]}
]});

/* ---------- py06 · for loops and range ---------- */
E.register('py06', { id: 'py06-v1', startLabel: T('Start: for loops', 'Shuru karo: for loops'), outro: T('Next: the theory and drills below. Loops are the most important skill, so do them all.', 'Aage: neeche ki theory aur drills. Loops sabse zaroori skill hai, toh saare karo.'), chapters: [
  { t: '1 · Repeating', scenes: [
    intro('Python · 6', 'for loops and range()', 'Do something for every item, without copy-pasting.', [
      [T('Printing one to five with five print lines is fine. One to a million is not. Loops let you write the step once and repeat it.', 'Ek se paanch tak paanch print lines se theek hai. Ek se das lakh tak nahi. Loops se step ek baar likho aur dohrao.')],
      [T('Think of a teacher taking attendance. The action is the same, call the name and mark it. Only the student changes each time.', 'Teacher ki attendance socho. Kaam wahi hai, naam bulao aur mark karo. Har baar sirf student badalta hai.')]
    ]),
    S('Walking a list', B => { const [l, r] = row(B, [1.1, 1]); const c = Code(l, `marks = [40, 75, 90, 60]\ntotal = 0\nfor m in marks:\n    total += m\nprint(total)`, { size: 22 }); return { c, a: Arr(r, [40, 75, 90, 60], { w: 76, label: 'marks' }), v: Vars(r) }; }, [
      [T('for m in marks means: take each item of the list, one at a time, call it m, and run the indented block.', 'for m in marks matlab: list ka har item, ek-ek karke lo, use m bolo, aur indented block chalao.'), o => { o.c.hl(3); o.v.set('total', '0', '', 'y'); }],
      [T('First m is forty. total becomes forty. Then seventy-five: one fifteen. Then ninety: two oh five. Then sixty: two sixty-five.', 'Pehle m chaalis. total chaalis. Phir pachhattar: ek sau pandrah. Phir nabbe: do sau paanch. Phir saath: do sau painsath.'), null, { seq: [[0, 40], [1, 115], [2, 205], [3, 265]].map(([i, t]) => o => { o.a.clear(); o.a.ptr('m', i, 'y'); o.a.hl(i, 'y'); o.c.hl(4); o.v.set('m', o.a.get(i), '', 's'); o.v.set('total', String(t), '', 'y'); }), gap: 1100 }],
      [T('This is the accumulator pattern: start with an empty result, and update it for every item. Sum, count, maximum, all use it.', 'Ye accumulator pattern hai: khaali result se shuru karo, aur har item pe update karo. Sum, count, maximum, sab isi se.'), o => { o.a.clear(); o.a.noPtr('m'); o.c.hl(2, 4); }]
    ]),
    S('range()', B => ({ t: Tbl(B, ['code', 'gives', 'remember'], [['range(5)', '0 1 2 3 4', 'starts at 0, stops BEFORE 5'], ['range(1, 6)', '1 2 3 4 5', 'start, stop (stop excluded)'], ['range(0, 10, 2)', '0 2 4 6 8', 'third number is the step'], ['range(5, 0, -1)', '5 4 3 2 1', 'negative step counts down']], { hidden: true, mono: [0, 1] }) }), [
      [T('range makes a sequence of numbers to loop over. range five gives zero to four. Five numbers, but it stops BEFORE five.', 'range loop ke liye numbers ka sequence banata hai. range paanch zero se chaar deta hai. Paanch numbers, par paanch se PEHLE ruk jaata hai.'), o => { o.t.show(0); o.t.hl(0); }],
      [T('Give two numbers for a start and a stop. The stop is still excluded.', 'Do numbers do toh start aur stop. Stop phir bhi shaamil nahi.'), o => { o.t.show(1); o.t.hl(1); }],
      [T('A third number is the step size.', 'Teesra number step size hai.'), o => { o.t.show(2); o.t.hl(2); }],
      [T('And a negative step counts backwards. Five down to one, stopping before zero.', 'Aur negative step ulta ginta hai. Paanch se ek tak, zero se pehle ruk ke.'), o => { o.t.show(3); o.t.hl(3); }],
      [T('Pause and think. What does range of two, eleven, three give?', 'Ruko aur socho. range of do, gyaarah, teen kya dega?'), null, { think: 6 }],
      [T('Two, five, eight. Eleven would be next, but the stop is excluded.', 'Do, paanch, aath. Agla gyaarah hota, par stop shaamil nahi.')]
    ])
  ]},
  { t: '2 · Index and value', scenes: [
    S('When you need the position', B => { const [l, r] = row(B, [1.15, 1]); return { l, r }; }, [
      [T('Sometimes you need the position too. Loop over range of len, and use the index to reach the item.', 'Kabhi position bhi chahiye. range of len pe loop chalao, aur index se item tak pahuncho.'), o => Code(o.l, `names = ["Ravi", "Asha", "Meena"]\nfor i in range(len(names)):\n    print(i, names[i])`, { size: 21 })],
      [T('The cleaner way is enumerate. It hands you the index and the value together, as a pair.', 'Saaf tareeka enumerate hai. Ye index aur value ek saath, jodi mein deta hai.'), o => { Code(o.l, `for i, name in enumerate(names):\n    print(i, name)`, { size: 21, title: 'better.py' }); const x = Out(o.r, { h: 120 }); ['0 Ravi', '1 Asha', '2 Meena'].forEach(t => x.p(t)); }]
    ]),
    S('Thinking in loops', B => ({ th: E.Think(B, ['What changes each round? (the loop variable)', 'What stays the same? (the body)', 'What do I remember between rounds? (accumulator)', 'Where does it start and stop? (range)'], { title: 'Before you write a loop' }) }), [
      [T('Before writing any loop, ask four questions. What changes each round?', 'Koi bhi loop likhne se pehle chaar sawaal poocho. Har round mein kya badalta hai?'), o => o.th.on(0)],
      [T('What stays the same? That is the body.', 'Kya same rehta hai? Wahi body hai.'), o => o.th.on(1)],
      [T('What must I remember from one round to the next? That is your accumulator.', 'Ek round se agle tak kya yaad rakhna hai? Wahi accumulator hai.'), o => o.th.on(2)],
      [T('And exactly where does it start and stop? Most loop bugs are off by one at the edges. Say the first and last value out loud.', 'Aur theek kahan shuru aur kahan khatam? Zyada tar loop bugs kinaron pe ek se galat hote hain. Pehli aur aakhri value zor se bolo.'), o => { o.th.on(3); o.th.done(); }]
    ])
  ]}
]});

/* ---------- py07 · while, break, continue ---------- */
E.register('py07', { id: 'py07-v1', startLabel: T('Start: while loops', 'Shuru karo: while loops'), outro: T('Next: the theory and drills below.', 'Aage: neeche ki theory aur drills.'), chapters: [
  { t: '1 · while', scenes: [
    intro('Python · 7', 'while, break and continue', 'Loops that run until something happens.', [
      [T('A for loop is for when you know the items. A while loop is for when you only know the condition: keep going WHILE something is true.', 'for loop tab jab items pata hon. while loop tab jab sirf condition pata ho: jab TAK kuch sach hai, chalte raho.')],
      [T('Like eating: while you are hungry, take another bite. You do not know in advance how many bites.', 'Khaane jaisa: jab tak bhookh hai, ek aur bite lo. Pehle se pata nahi kitni bites.')]
    ]),
    S('Counting digits', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `n = 4729\ncount = 0\nwhile n > 0:\n    n = n // 10\n    count += 1\nprint(count)`, { size: 23 }), v: Vars(r), r }; }, [
      [T('How many digits in four seven two nine? Chop off the last digit until nothing is left, and count the chops.', 'Chaar saat do nau mein kitne digits? Aakhri digit tab tak kaato jab tak kuch na bache, aur kaatna gino.'), o => { o.v.set('n', '4729', '', 'y'); o.v.set('count', '0', '', 's'); }],
      [T('Check the condition, run the body, check again.', 'Condition check, body chalao, phir check.'), null, { seq: [[472, 1], [47, 2], [4, 3], [0, 4]].map(([n, c]) => o => { o.c.hl(3, 4, 5); o.v.set('n', String(n), '', 'y'); o.v.set('count', String(c), '', 's'); }), gap: 1000 }],
      [T('Now n is zero, the condition is False, and the loop ends. Four digits.', 'Ab n zero hai, condition False, loop khatam. Chaar digits.'), o => { o.c.hl(6); const x = Out(o.r, { h: 60 }); x.p('4'); }],
      [T('The golden rule: something inside the body MUST move the condition toward False. Forget n = n // 10, and the loop runs forever.', 'Sunehra rule: body ke andar kuch aisa ZAROOR ho jo condition ko False ki taraf le jaaye. n = n // 10 bhool gaye, toh loop hamesha chalega.'), o => Card(o.r, { icon: '♾️', title: 'Infinite loop', body: 'Stop it with Ctrl + C', c: 'm' })]
    ])
  ]},
  { t: '2 · break and continue', scenes: [
    S('break: stop now', B => { const [l, r] = row(B, [1.1, 1]); const c = Code(l, `nums = [4, 9, -2, 7]\nfor x in nums:\n    if x < 0:\n        print("found", x)\n        break\n    print("ok", x)`, { size: 21 }); return { c, a: Arr(r, [4, 9, -2, 7], { w: 76 }), out: Out(r, { h: 140 }) }; }, [
      [T('break jumps out of the loop immediately. Like searching for your keys: once found, you stop searching.', 'break turant loop se bahar kood jaata hai. Chaabi dhoondhne jaisa: mil gayi toh dhoondhna band.'), null, { seq: [o => { o.a.hl(0, 's'); o.out.p('ok 4'); }, o => { o.a.hl(1, 's'); o.out.p('ok 9'); }, o => { o.a.hl(2, 'm'); o.c.hl(4, 5); o.out.p('found -2'); }], gap: 1000 }],
      [T('Seven is never even looked at. break saved the work.', 'Saat ko dekha bhi nahi gaya. break ne kaam bachaya.'), o => o.a.dim(3)]
    ]),
    S('continue: skip this one', B => { const [l, r] = row(B, [1.1, 1]); const c = Code(l, `for x in range(1, 7):\n    if x % 3 == 0:\n        continue\n    print(x)`, { size: 22 }); return { c, out: Out(r, { h: 220 }), r }; }, [
      [T('continue skips the rest of THIS round, and moves on to the next one. Like skipping a song you do not like, the playlist keeps going.', 'continue ISS round ka baaki hissa skip karke agle round pe chala jaata hai. Jaise na pasand gaana skip karna, playlist chalti rehti hai.'), null, { seq: [1, 2, 4, 5].map(x => o => { o.c.hl(4); o.out.p(String(x)); }), gap: 800 }],
      [T('Three and six are multiples of three, so they are skipped. break ends the whole loop, continue ends only one round.', 'Teen aur chhe teen ke multiples hain, toh skip. break poora loop khatam karta hai, continue sirf ek round.'), o => Card(o.r, { icon: '⏭️', title: 'break vs continue', body: 'break → leave loop · continue → next round', c: 'y' })]
    ]),
    S('for or while?', B => ({ t: Tbl(B, ['situation', 'use'], [['go through every item of a list / string', 'for x in items'], ['repeat exactly n times', 'for i in range(n)'], ['repeat until a condition changes', 'while condition:'], ['two pointers moving toward each other', 'while l < r:']], { hidden: true }) }), [
      [T('How to choose. If you know the items or the count, use for. If you only know when to stop, use while.', 'Kaise chunein. Items ya ginti pata ho toh for. Sirf rukna kab hai pata ho toh while.'), null, { seq: range(0, 2).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 900 }],
      [T('And the two pointer pattern in DSA 150 is almost always a while loop. You are ready for it.', 'Aur DSA 150 ka two pointer pattern lagbhag hamesha while loop hota hai. Tum iske liye taiyaar ho.'), o => { o.t.show(3); o.t.hl(3); }]
    ])
  ]}
]});
})();
