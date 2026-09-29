/* Math for Logic course videos, part B: mt05 – mt08. */
(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Out, Vars, Arr, Tbl, NumLine, Dots, Grid, Chart } = E;
const { S, intro, range } = LH;
const SLOW = 1500;
const NEXT = T('Now read the theory below, then try the drills.', 'Ab neeche ki theory padho, phir drills try karo.');

/* ---------- mt05 · Digits and place value ---------- */
E.register('mt05', { id: 'mt05-v1', pause: SLOW, startLabel: T('Start: Digits and place value', 'Shuru karo: Digits aur place value'), outro: NEXT, chapters: [
  { t: '1 · Place value', scenes: [
    intro('Math · 5', 'Digits and place value', 'Every digit has a job, decided by its place.', [
      [T('Look at the number four hundred seventy-two. Three digits, and each one has a different job.', 'Number chaar sau bahattar dekho. Teen digits, aur har ek ka alag kaam.')]
    ]),
    S('Hundreds, tens, ones', B => { const [top, bot] = col(B, [1, 1]); return { t: Tbl(top, ['hundreds', 'tens', 'ones'], [['4', '7', '2']], { mono: [0, 1, 2] }), bot }; }, [
      [T('The four is in the hundreds place. It means four hundreds.', 'Chaar sau ki jagah pe hai. Matlab chaar sau.'), o => o.t.hl(0)],
      [T('The seven means seven tens, and the two means two ones.', 'Saat matlab saat das, aur do matlab do ek.')],
      [T('Think of money: four hundred-rupee notes, seven ten-rupee notes and two one-rupee coins. The digit says how many; the place says which note.', 'Paise socho: sau ke chaar note, das ke saat note aur ek-ek rupaye ke do sikke. Digit batati hai kitne; jagah batati hai kaunsa note.'), o => Big(o.bot, '472 = 4 × 100 + 7 × 10 + 2 × 1', { size: 40 })],
      [T('Each place is worth ten times the place to its right. That is why we call it base ten.', 'Har jagah apne right wali se das guna keemti hai. Isliye ise base ten kehte hain.')]
    ])
  ]},
  { t: '2 · Two tiny tricks', scenes: [
    S('% 10 and // 10', B => { const [top, bot] = col(B, [1, 1]); return { a: Arr(top, [4, 7, 2], { w: 110, noIdx: true, label: 'n = 472' }), bot }; }, [
      [T('Trick one. Percent ten gives the last digit. Four seventy-two percent ten is two.', 'Trick ek. Percent das aakhri digit deta hai. Chaar sau bahattar percent das, do.'), o => { o.a.hl(2, 'y'); Big(o.bot, '472 % 10 = 2', { size: 48 }); }],
      [T('Why? Dividing by ten puts four seventy-two into forty-seven full tens, with two left over.', 'Kyun? Das se bhaag dene pe chaar sau bahattar mein saintalees poore das bante hain, do bachte hain.')],
      [T('Trick two. Double slash ten chops the last digit off. Four seventy-two becomes forty-seven.', 'Trick do. Double slash das aakhri digit kaat deta hai. Chaar sau bahattar, saintalees ban jaata hai.'), o => { o.a.clear(); o.a.dim(2); o.bot.innerHTML = ''; Big(o.bot, '472 // 10 = 47', { size: 48 }); }]
    ]),
    S('The digit loop', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `n = 472\nwhile n > 0:\n    digit = n % 10\n    print(digit)\n    n = n // 10`, { size: 22 }), v: Vars(r), out: Out(r, { h: 130 }) }; }, [
      [T('Put the two tricks in a loop, and you can visit every digit, from right to left.', 'Dono tricks ek loop mein daalo, aur har digit right se left dekh sakte ho.'), o => { o.c.hl(1); o.v.set('n', '472', '', 'y'); }],
      [T('Look at the last digit, two. Then chop it off: n becomes forty-seven.', 'Aakhri digit dekho, do. Phir use kaato: n saintalees.'), o => { o.c.hl(3, 4, 5); o.v.set('digit', '2', '', 's'); o.out.p('2'); o.v.set('n', '47', '', 'y'); }],
      [T('Again: digit seven, n becomes four. Again: digit four, n becomes zero.', 'Phir: digit saat, n chaar. Phir: digit chaar, n zero.'), null, { seq: [['7', '4'], ['4', '0']].map(([d, n]) => o => { o.v.set('digit', d, '', 's'); o.out.p(d); o.v.set('n', n, '', 'y'); }), gap: 1300 }],
      [T('Now n is zero, so the loop stops. We printed two, seven, four: right to left.', 'Ab n zero hai, toh loop ruk gaya. Humne do, saat, chaar print kiya: right se left.'), o => o.c.hl(2)]
    ]),
    S('Reversing a number', B => { const [l, r] = row(B, [1.15, 1]); return { c: Code(l, `rev = 0\nwhile n > 0:\n    rev = rev * 10 + n % 10\n    n //= 10`, { size: 22 }), v: Vars(r), r }; }, [
      [T('The same loop can reverse a number. Start rev at zero.', 'Yahi loop number ulta kar sakta hai. rev ko zero se shuru karo.'), o => { o.v.set('n', '472', '', 'y'); o.v.set('rev', '0', '', 's'); }],
      [T('Each step, shift rev left by multiplying by ten, then add the new digit.', 'Har step, rev ko das se guna karke left khiskao, phir nayi digit jodo.'), o => o.c.hl(3)],
      [T('Zero becomes two. Two becomes twenty-seven. Twenty-seven becomes two seventy-four.', 'Zero do bana. Do sattaees. Sattaees do sau chauhattar.'), null, { seq: [['47', '2'], ['4', '27'], ['0', '274']].map(([n, r]) => o => { o.v.set('n', n, '', 'y'); o.v.set('rev', r, '', 's'); }), gap: 1300 }],
      [T('Pause and think. What would reverse of one thousand two hundred give?', 'Ruko aur socho. Ek hazaar do sau ka reverse kya dega?'), null, { think: 6 }],
      [T('Twenty-one. The zeros at the end become zeros at the front, which disappear. Great work.', 'Ikkis. End ke zeros aage aa jaate hain, jo gayab ho jaate hain. Bahut badhiya.'), o => Big(o.r, '1200 → 21', { size: 44 })]
    ])
  ]}
]});

/* ---------- mt06 · Factors, multiples, primes and GCD ---------- */
E.register('mt06', { id: 'mt06-v1', pause: SLOW, startLabel: T('Start: Factors and primes', 'Shuru karo: Factors aur primes'), outro: NEXT, chapters: [
  { t: '1 · Factors', scenes: [
    intro('Math · 6', 'Factors, multiples, primes and GCD', 'Neat groups, and the numbers that refuse to be grouped.', [
      [T('Some numbers split into equal groups neatly. Some refuse. Today we find out which, and why it matters.', 'Kuch numbers barabar groups mein saaf bant jaate hain. Kuch mana kar dete hain. Aaj dekhenge kaun, aur kyun zaroori hai.')]
    ]),
    S('12 chocolates', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Twelve chocolates. Can we arrange them in a perfect rectangle? Three rows of four: yes.', 'Barah chocolates. Kya perfect rectangle mein saja sakte hain? Chaar-chaar ki teen rows: haan.'), o => { o.g = Grid(o.l, 3, 4, { size: 64, fill: () => '🍫' }); o.t = Tbl(o.r, ['rows', 'per row'], [['3', '4']], { mono: [0, 1] }); }],
      [T('Two rows of six works too. And one row of twelve.', 'Chhe-chhe ki do rows bhi chalti hai. Aur barah ki ek row.'), o => { o.l.innerHTML = ''; o.g = Grid(o.l, 2, 6, { size: 56, fill: () => '🍫' }); o.r.innerHTML = ''; o.t = Tbl(o.r, ['rows', 'per row'], [['1', '12'], ['2', '6'], ['3', '4']], { mono: [0, 1] }); }],
      [T('The row sizes that work are called factors. The factors of twelve are one, two, three, four, six and twelve.', 'Jo row sizes chalte hain unhe factors kehte hain. Barah ke factors: ek, do, teen, chaar, chhe aur barah.'), o => Big(o.l, '1, 2, 3, 4, 6, 12', { size: 40 })],
      [T('In code, d is a factor of n when n percent d is zero: nothing left over.', 'Code mein d, n ka factor hai jab n percent d zero ho: kuch nahi bacha.'), o => { o.l.innerHTML = ''; Big(o.l, 'n % d == 0', { size: 52 }); }],
      [T('Notice they come in pairs that multiply to twelve: one and twelve, two and six, three and four. Remember this.', 'Dhyaan do, ye jodiyon mein aate hain jinka guna barah hai: ek aur barah, do aur chhe, teen aur chaar. Ye yaad rakhna.'), o => o.t.hl(2)]
    ])
  ]},
  { t: '2 · Primes', scenes: [
    S('Numbers that refuse', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Now try seven chocolates. Two rows? One is left. Three rows? Left over again. Only one long row works.', 'Ab saat chocolates try karo. Do rows? Ek bachti hai. Teen rows? Phir bachti hai. Sirf ek lambi row chalti hai.'), o => Grid(o.l, 1, 7, { size: 56, fill: () => '🍫' })],
      [T('A number whose only factors are one and itself is called prime. Seven is prime.', 'Jis number ke factors sirf ek aur khud ho, use prime kehte hain. Saat prime hai.'), o => Card(o.r, { icon: '🧱', title: 'Prime', body: 'exactly two factors: 1 and itself', c: 'y' })],
      [T('One is not prime: it has only one factor. And two is the only even prime.', 'Ek prime nahi hai: uska sirf ek factor hai. Aur do akela even prime hai.')]
    ]),
    S('Primes up to 30', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 5, 6, { size: 66, fill: (r, c) => String(r * 6 + c + 1) }), r }; }, [
      [T('Here are the numbers up to thirty. Let us light up the primes.', 'Ye tees tak ke numbers hain. Primes ko roshan karte hain.')],
      [T('Two, three, five, seven, eleven, thirteen, seventeen, nineteen, twenty-three and twenty-nine.', 'Do, teen, paanch, saat, gyaarah, terah, satrah, unees, teis aur untees.'), null, { seq: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29].map(n => o => o.g.hl(Math.floor((n - 1) / 6), (n - 1) % 6, 'y')), gap: 450 }],
      [T('Primes are like basic LEGO bricks. Every whole number above one is built by multiplying primes. Twelve is two times two times three.', 'Primes basic LEGO bricks jaise hain. Ek se bada har number primes ke guna se banta hai. Barah = do guna do guna teen.'), o => Big(o.r, '12 = 2 × 2 × 3', { size: 40 })]
    ]),
    S('The square-root shortcut', B => { const [top, bot] = col(B, [1, 1]); return { top, bot }; }, [
      [T('Is ninety-seven prime? Must we test every number up to ninety-six? No.', 'Kya sattaanve prime hai? Kya chhiyaanve tak har number test karein? Nahi.')],
      [T('Factors come in pairs, and in every pair, one of them is at most the square root. So we only test up to the square root of ninety-seven, about nine point eight.', 'Factors jodiyon mein aate hain, aur har jodi mein ek zyada se zyada square root jitna hota hai. Toh sirf sattaanve ke square root tak test karo, lagbhag nau point aath.'), o => { const n = NumLine(o.top, 0, 12); n.span(2, 9, 'test only 2 … 9', 'y'); n.mark(9.85, '√97', 'c'); }],
      [T('None of two to nine divide ninety-seven, so it is prime. In code we write d times d less than or equal to n.', 'Do se nau tak koi bhi sattaanve ko divide nahi karta, toh prime hai. Code mein likhte hain d guna d less than or equal n.'), o => Code(o.bot, `d = 2\nwhile d * d <= n:\n    if n % d == 0:\n        return False\n    d += 1\nreturn True`, { size: 19 })]
    ])
  ]},
  { t: '3 · GCD', scenes: [
    S("Euclid's trick", B => { const [l, r] = row(B, [1, 1.1]); return { t: Tbl(l, ['a', 'b', 'a % b'], [['48', '18', '12'], ['18', '12', '6'], ['12', '6', '0'], ['6', '0', '—']], { hidden: true, mono: [0, 1, 2] }), r }; }, [
      [T('The greatest common divisor, or GCD, is the biggest number that divides both. What is the GCD of forty-eight and eighteen?', 'Greatest common divisor, ya GCD, wo sabse bada number hai jo dono ko divide kare. Adtalees aur atharah ka GCD kya hai?')],
      [T('Euclid found a trick more than two thousand years ago: replace the pair a, b with b and a percent b.', 'Euclid ne do hazaar saal pehle trick dhoondhi: jodi a, b ko b aur a percent b se badlo.'), null, { seq: range(0, 2).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1400 }],
      [T('Keep going until b is zero. Then a is the answer: six.', 'Tab tak chalo jab tak b zero na ho. Tab a jawab hai: chhe.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1400 }],
      [T('Python has it built in: math dot gcd. Well done. Now read the theory and try the drills.', 'Python mein ye built-in hai: math dot gcd. Bahut badhiya. Ab theory padho aur drills karo.'), o => Code(o.r, `import math\nprint(math.gcd(48, 18))   # 6`, { size: 22 })]
    ])
  ]}
]});

/* ---------- mt07 · Powers and square roots ---------- */
E.register('mt07', { id: 'mt07-v1', pause: SLOW, startLabel: T('Start: Powers and square roots', 'Shuru karo: Powers aur square roots'), outro: NEXT, chapters: [
  { t: '1 · Repeated multiplication', scenes: [
    intro('Math · 7', 'Powers and square roots', 'Repeated multiplication grows shockingly fast.', [
      [T('Adding again and again is multiplying. Multiplying again and again is a power. And powers grow shockingly fast.', 'Baar-baar jodna guna hai. Baar-baar guna karna power hai. Aur powers hairaan karne wali tezi se badhte hain.')]
    ]),
    S('Reading a power', B => { const [top, bot] = col(B, [1, 1]); return { top, bot }; }, [
      [T('Two to the power five means five twos multiplied together.', 'Do ki power paanch matlab paanch do ka guna.'), o => { o.b = Big(o.top, '2⁵ = 2 × 2 × 2 × 2 × 2 = 32', { size: 44 }); }],
      [T('The two is the base: the number being multiplied. The five is the exponent: how many copies.', 'Do base hai: jis number ka guna ho raha hai. Paanch exponent hai: kitni copies.'), o => Card(o.bot, { icon: '🔢', title: 'base ** exponent', body: 'in Python: 2 ** 5', c: 'y' })],
      [T('And anything to the power zero is one. Each step down divides by the base: eight, four, two, one.', 'Aur kisi bhi cheez ki power zero, ek hai. Har kadam neeche base se bhaag: aath, chaar, do, ek.'), o => o.b.set('2³ = 8 → 2² = 4 → 2¹ = 2 → 2⁰ = 1')]
    ]),
    S('Folding paper', B => { const [l, r] = row(B, [1, 1]); return { t: Tbl(l, ['folds', 'layers'], [['1', '2'], ['2', '4'], ['3', '8'], ['10', '1,024'], ['20', '≈ 1 million'], ['42', 'reaches the Moon']], { hidden: true, mono: [0, 1] }), r }; }, [
      [T('Fold a sheet of paper in half: two layers. Fold again: four. Again: eight. Each fold doubles.', 'Kaagaz aadha modo: do parten. Phir: chaar. Phir: aath. Har fold dugna.'), null, { seq: [0, 1, 2].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1100 }],
      [T('After ten folds: one thousand and twenty-four layers.', 'Das fold ke baad: ek hazaar chaubees parten.'), o => { o.t.show(3); o.t.hl(3); }],
      [T('After forty-two folds, the stack would reach the Moon. That is exponential growth.', 'Bayalees fold ke baad dher chaand tak pahunch jaata. Yahi exponential growth hai.'), null, { seq: [4, 5].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1300 }],
      [T('Remember these landmarks: two to the ten is about a thousand, two to the twenty about a million, two to the thirty about a billion.', 'Ye nishaan yaad rakho: do ki power das lagbhag hazaar, bees lagbhag das lakh, tees lagbhag sau crore.'), o => Big(o.r, '2¹⁰ ≈ 10³<br>2²⁰ ≈ 10⁶<br>2³⁰ ≈ 10⁹', { size: 40 })]
    ]),
    S('Why coders care', B => { const [l, r] = row(B, [1.2, 1]); return { ch: Chart(l, { xmax: 12, ymax: 150, xl: 'n', yl: 'work' }), r }; }, [
      [T('Compare n with two to the n. At first they are close.', 'n ko do ki power n se compare karo. Shuru mein paas-paas.'), o => { o.ch.plot(x => x, 'n', 's'); o.ch.plot(x => 2 ** x, '2ⁿ', 'c'); }],
      [T('Then two to the n shoots up and leaves n far behind. A program that tries every subset of n items does two to the n work.', 'Phir do ki power n upar bhaagta hai aur n ko bahut peeche chhod deta hai. Jo program n items ka har subset try karta hai wo do ki power n kaam karta hai.'), o => Card(o.r, { icon: '🚀', title: 'n = 20 → 1 million', body: 'n = 60 → impossible', c: 'm' })]
    ])
  ]},
  { t: '2 · Squares and roots', scenes: [
    S('Squares', B => { const [l, r] = row(B, [1, 1]); return { g: Grid(l, 5, 5, { size: 64, fill: () => '' }), r }; }, [
      [T('Squaring means a power of two. Five squared is five times five: the area of a five by five square.', 'Square matlab do ki power. Paanch square matlab paanch guna paanch: paanch-paanch square ka area.'), null, { seq: range(0, 24).map(k => o => o.g.hl(Math.floor(k / 5), k % 5, 'y')), gap: 90 }],
      [T('Twenty-five little squares.', 'Pachees chhote squares.'), o => Big(o.r, '5² = 25', { size: 56 })],
      [T('The square root goes backwards: which side gives this area? The square root of twenty-five is five.', 'Square root ulta chalta hai: kaunsi side ye area deti hai? Pachees ka square root paanch.'), o => { o.r.innerHTML = ''; Big(o.r, '√25 = 5', { size: 56 }); }],
      [T('Pause and think. What is the square root of eighty-one?', 'Ruko aur socho. Ikyaasi ka square root kya hai?'), null, { think: 5 }],
      [T('Nine, because nine times nine is eighty-one.', 'Nau, kyunki nau guna nau ikyaasi.'), o => { o.r.innerHTML = ''; Big(o.r, '√81 = 9', { size: 56 }); }]
    ]),
    S('In Python', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `print(2 ** 10)\nprint(10 ** 5)\nprint(3 ** 0)\nimport math\nprint(math.isqrt(50))\nprint(2 ^ 5)   # NOT a power!`, { size: 21 }), out: Out(r, { h: 220 }), r }; }, [
      [T('In Python, double star is power. Two to the ten is ten twenty-four. Ten to the five is a hundred thousand.', 'Python mein double star power hai. Do ki das, das sau chaubees. Das ki paanch, ek lakh.'), null, { seq: [['1024', 1], ['100000', 2], ['1', 3]].map(([t, l]) => o => { o.c.hl(l); o.out.p(t); }), gap: 1000 }],
      [T('isqrt gives the whole-number square root. Fifty is between forty-nine and sixty-four, so it gives seven.', 'isqrt poora square root deta hai. Pachaas unchaas aur chausath ke beech hai, toh saat.'), o => { o.c.hl(5); o.out.p('7'); }],
      [T('Careful: the caret is not a power in Python. Two caret five is seven, a bit operation you will meet in topic nine. Great job.', 'Dhyaan do: caret Python mein power nahi hai. Do caret paanch saat hai, ek bit operation jo topic nau mein milega. Shabaash.'), o => { o.c.hl(6); o.out.p('7'); }]
    ])
  ]}
]});

/* ---------- mt08 · Logarithms ---------- */
E.register('mt08', { id: 'mt08-v1', pause: SLOW, startLabel: T('Start: Logarithms', 'Shuru karo: Logarithms'), outro: NEXT, chapters: [
  { t: '1 · How many halvings?', scenes: [
    intro('Math · 8', 'Logarithms: how many halvings?', 'A scary word for a simple question.', [
      [T('Logarithm sounds scary. It is just a simple question: how many times can I cut n in half before I reach one?', 'Logarithm darawna lagta hai. Ye bas ek simple sawaal hai: n ko kitni baar aadha kar sakta hoon jab tak ek na aa jaaye?')]
    ]),
    S('Halving 16', B => { const [top, bot] = col(B, [1, 1]); return { a: Arr(top, range(1, 16), { w: 58, noIdx: true }), bot }; }, [
      [T('Sixteen boxes. Cut in half: eight left.', 'Solah dabbe. Aadha karo: aath bache.'), o => o.a.dim(range(8, 15))],
      [T('Half again: four. Again: two. Again: one.', 'Phir aadha: chaar. Phir: do. Phir: ek.'), null, { seq: [[4, 7], [2, 3], [1, 1]].map(([a, b]) => o => o.a.dim(range(a, b))), gap: 1200 }],
      [T('That took four halvings. So log base two of sixteen is four.', 'Chaar baar aadha karna pada. Toh log base do of solah, chaar.'), o => { o.a.hl(0, 'y'); Big(o.bot, 'log₂ 16 = 4', { size: 52 }); }],
      [T('It is the reverse of a power: two to the four is sixteen.', 'Ye power ka ulta hai: do ki power chaar, solah.'), o => { o.bot.innerHTML = ''; Big(o.bot, '2⁴ = 16  ⇔  log₂ 16 = 4', { size: 44 }); }]
    ]),
    S('Tiny, even for giants', B => ({ t: Tbl(B, ['n', 'halvings to reach 1'], [['8', '3'], ['1,024', '10'], ['1,000,000', 'about 20'], ['1,000,000,000', 'about 30']], { hidden: true, mono: [0, 1] }) }), [
      [T('Here is the magic. Eight takes three halvings. A thousand and twenty-four takes ten.', 'Yahi jaadu hai. Aath ko teen baar. Ek hazaar chaubees ko das.'), null, { seq: [0, 1].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1200 }],
      [T('A million takes about twenty. A billion takes only about thirty.', 'Das lakh ko lagbhag bees. Sau crore ko sirf lagbhag tees.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1300 }],
      [T('The input grows enormously, but the number of halvings barely moves. That is why halving is the most powerful speed-up in DSA.', 'Input bahut bada hota hai, par aadha karne ki ginti mushkil se badhti hai. Isliye aadha karna DSA ka sabse taakatwar speed-up hai.')]
    ])
  ]},
  { t: '2 · The guessing game', scenes: [
    S('1 to 100', B => { const [top, bot] = col(B, [1.3, 1]); return { n: NumLine(top, 0, 100, { step: 10 }), bot }; }, [
      [T('I am thinking of a number from one to one hundred. You guess, and I say higher or lower. The secret is seventy-one.', 'Maine ek se sau tak ka number socha. Tum guess karo, main bolunga upar ya neeche. Secret hai ikhattar.'), o => o.n.span(1, 100, 'could be anything', 'm')],
      [T('Always guess the middle. Fifty? Higher. Half the numbers are gone.', 'Hamesha beech ka guess karo. Pachaas? Upar. Aadhe numbers gaye.'), o => { o.n.clear(); o.n.mark(50, '50', 'c'); o.n.span(51, 100, '', 's'); }],
      [T('Seventy-five? Lower. Sixty-two? Higher. Sixty-eight? Higher. Seventy-one? Found it!', 'Pachhattar? Neeche. Baasath? Upar. Adsath? Upar. Ikhattar? Mil gaya!'), null, { seq: [[75, 51, 74], [62, 63, 74], [68, 69, 74], [71, 71, 71]].map(([g, a, b]) => o => { o.n.clear(); o.n.mark(g, String(g), g === 71 ? 'y' : 'c'); o.n.span(a, b, '', 's'); }), gap: 1400 }],
      [T('Five guesses. Every guess throws away half, so a hundred numbers never need more than seven. This is binary search.', 'Paanch guess. Har guess aadha hata deta hai, toh sau numbers mein kabhi saat se zyada nahi lagte. Yahi binary search hai.'), o => Big(o.bot, 'log₂ 100 ≈ 6.6 → at most 7 guesses', { size: 36 })]
    ]),
    S('Counting halvings in code', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `n = 1000\nsteps = 0\nwhile n > 1:\n    n //= 2\n    steps += 1\nprint(steps)`, { size: 22 }), v: Vars(r), r }; }, [
      [T('In code, keep halving until one is left, and count.', 'Code mein ek bachne tak aadha karte raho, aur gino.'), o => { o.v.set('n', '1000', '', 'y'); o.v.set('steps', '0', '', 's'); }],
      [T('Five hundred, two fifty, one twenty-five, sixty-two, thirty-one, fifteen, seven, three, one.', 'Paanch sau, dhai sau, ek sau pachees, baasath, iktees, pandrah, saat, teen, ek.'), null, { seq: [500, 250, 125, 62, 31, 15, 7, 3, 1].map((n, i) => o => { o.v.set('n', String(n), '', 'y'); o.v.set('steps', String(i + 1), '', 's'); }), gap: 600 }],
      [T('Nine steps for a thousand. We call this kind of speed O of log n. Great work. Now the theory and drills.', 'Hazaar ke liye nau steps. Is speed ko O of log n kehte hain. Bahut badhiya. Ab theory aur drills.'), o => { o.c.hl(6); Big(o.r, 'steps = 9', { size: 44 }); }]
    ])
  ]}
]});
})();
