/* Math for Logic course videos, part A: mt01 – mt04. Slow pacing for beginners (pause after every step). */
(function () {
const T = E.T;
const { row, col, Txt, Big, Pic, Title, Card, Bul, Code, Out, Vars, Arr, Tbl, NumLine, Clock, Dots, Grid } = E;
const { S, intro, range, fresh } = LH;
const SLOW = 1500;
const NEXT = T('Now read the theory below, then try the drills.', 'Ab neeche ki theory padho, phir drills try karo.');

/* ---------- mt01 · Numbers and the number line ---------- */
E.register('mt01', { id: 'mt01-v1', pause: SLOW, startLabel: T('Start: Numbers and the number line', 'Shuru karo: Numbers aur number line'), outro: NEXT, chapters: [
  { t: '1 · The line', scenes: [
    intro('Math · 1', 'Numbers and the number line', 'Every number has a place on a line.', [
      [T('Welcome to Math for Logic. We will go slowly, one small idea at a time. You do not need to be good at maths. You only need to be curious.', 'Math for Logic mein swagat hai. Hum dheere chalenge, ek-ek chhota idea. Maths mein achha hona zaroori nahi. Bas jaanne ki ichha chahiye.')],
      [T('Our first idea is simple but powerful: every number has a place on a line.', 'Pehla idea simple par taakatwar hai: har number ki ek line pe jagah hoti hai.')]
    ]),
    S('Draw the line', B => { const [top, bot] = col(B, [1.2, 1]); return { n: NumLine(top, -6, 6), bot }; }, [
      [T('Here is a long straight line. In the middle we put zero.', 'Ye rahi ek lambi seedhi line. Beech mein zero rakhte hain.'), o => o.n.mark(0, '0', 'y')],
      [T('Walk to the right and the numbers grow: one, two, three.', 'Right chalo toh numbers badhte hain: ek, do, teen.'), null, { seq: [1, 2, 3].map(v => o => o.n.mark(v, String(v), 's')), gap: 700 }],
      [T('Walk to the left and the numbers go below zero: minus one, minus two, minus three. These are negative numbers.', 'Left chalo toh numbers zero se neeche jaate hain: minus ek, minus do, minus teen. Ye negative numbers hain.'), null, { seq: [-1, -2, -3].map(v => o => o.n.mark(v, String(v), 'c')), gap: 700 }],
      [T('Think of a building with a basement. Floor zero is the ground. Floors one, two, three are above. Floors minus one and minus two are underground.', 'Ek building socho jismein basement hai. Floor zero ground hai. Floor ek, do, teen upar. Floor minus ek aur minus do zameen ke neeche.'), o => Card(o.bot, { icon: '🏢', title: 'Floors of a building', body: 'up = bigger, even in the basement: −1 is higher than −3', c: 'y' })]
    ])
  ]},
  { t: '2 · Comparing', scenes: [
    S('Right means bigger', B => { const [top, bot] = col(B, [1.2, 1]); return { n: NumLine(top, -6, 6), bot }; }, [
      [T('Here is the golden rule. A number further to the right is bigger.', 'Sunehra rule ye hai. Jo number zyada right hai, wo bada hai.')],
      [T('Seven or three? Seven is further right, so seven is bigger.', 'Saat ya teen? Saat zyada right hai, toh saat bada.'), o => { o.n.mark(3, '3', 's'); o.n.mark(6, '6', 'y'); Big(o.bot, '6 > 3', { size: 52 }); }],
      [T('Now the tricky one. Minus one or minus five? Minus one is further right. So minus one is bigger. Owing one rupee is better than owing five.', 'Ab tricky wala. Minus ek ya minus paanch? Minus ek zyada right hai. Toh minus ek bada. Ek rupaye ka udhaar paanch ke udhaar se behtar.'), o => { o.n.clear(); o.n.mark(-1, '−1', 'y'); o.n.mark(-5, '−5', 'c'); o.bot.innerHTML = ''; Big(o.bot, '−1 > −5', { size: 52 }); }],
      [T('Pause and think. Which is bigger: zero or minus two?', 'Ruko aur socho. Kaun bada hai: zero ya minus do?'), null, { think: 6 }],
      [T('Zero. It is to the right of every negative number.', 'Zero. Wo har negative number ke right mein hai.'), o => { o.n.clear(); o.n.mark(0, '0', 'y'); o.n.mark(-2, '−2', 'c'); }]
    ]),
    S('Comparison signs', B => ({ t: Tbl(B, ['sign', 'read it as', 'example', 'answer'], [['<', 'is less than', '2 < 9', 'True'], ['>', 'is greater than', '−1 > −5', 'True'], ['<=', 'less than or equal', '4 <= 4', 'True'], ['==', 'is equal to', '3 == 4', 'False'], ['!=', 'is not equal to', '3 != 4', 'True']], { hidden: true, mono: [0, 2, 3] }) }), [
      [T('Code asks these questions with comparison signs. The answer is always True or False.', 'Code ye sawaal comparison signs se poochta hai. Jawab hamesha True ya False.'), null, { seq: range(0, 2).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1100 }],
      [T('Less than or equal includes the number itself. Four is less than or equal to four.', 'Less than or equal mein number khud shaamil hai. Chaar, chaar se less than or equal hai.'), o => { o.t.show(2); o.t.hl(2); }],
      [T('Very important: two equals signs ask a question. One equals sign stores a value. Mixing them up is a very common bug.', 'Bahut zaroori: do equals sawaal poochte hain. Ek equals value store karta hai. Inhe mix karna bahut common bug hai.'), null, { seq: [3, 4].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1200 }]
    ])
  ]},
  { t: '3 · Distance', scenes: [
    S('Counting steps', B => { const [top, bot] = col(B, [1.2, 1]); return { n: NumLine(top, -4, 9), bot }; }, [
      [T('How far is it from three to eight? Walk it, one step at a time.', 'Teen se aath kitna door hai? Ek-ek kadam chal ke dekho.'), o => { o.n.mark(3, '3', 's'); o.n.mark(8, '8', 'y'); }],
      [T('Four, five, six, seven, eight. Five steps. And eight minus three is five.', 'Chaar, paanch, chhe, saat, aath. Paanch kadam. Aur aath minus teen, paanch.'), o => { o.n.hop(3, 8, '5 steps', 'y'); Big(o.bot, '8 − 3 = 5', { size: 48 }); }],
      [T('From minus two to three? Minus one, zero, one, two, three: also five steps. Three minus minus two is five.', 'Minus do se teen? Minus ek, zero, ek, do, teen: phir se paanch kadam. Teen minus minus do, paanch.'), o => { o.n.clear(); o.n.mark(-2, '−2', 'c'); o.n.mark(3, '3', 's'); o.n.hop(-2, 3, '5 steps', 's'); o.bot.innerHTML = ''; Big(o.bot, '3 − (−2) = 5', { size: 48 }); }],
      [T('Distance is never negative. Walking back from eight to three is still five steps. To throw away a minus sign, use absolute value: abs.', 'Doori kabhi negative nahi hoti. Aath se wapas teen bhi paanch kadam. Minus sign hatane ke liye absolute value use karo: abs.'), o => { o.bot.innerHTML = ''; Big(o.bot, 'abs(3 − 8) = abs(−5) = 5', { size: 42 }); }]
    ]),
    S('In Python', B => { const [l, r] = row(B, [1.2, 1]); return { c: Code(l, `a = -4\nb = 7\nprint(a < b)\nprint(b - a)\nprint(abs(a - b))\nprint(max(a, b), min(a, b))`, { size: 22 }), out: Out(r, { h: 230 }), r }; }, [
      [T('Let us see it in Python. Minus four is to the left of seven, so a is less than b: True.', 'Python mein dekhte hain. Minus chaar, saat ke left mein hai, toh a, b se chhota: True.'), o => { o.c.hl(3); o.out.p('True'); }],
      [T('The distance is eleven, whichever way we subtract, once we use abs.', 'Doori gyaarah hai, kisi bhi taraf se ghatao, jab abs lagate ho.'), null, { seq: [o => { o.c.hl(4); o.out.p('11'); }, o => { o.c.hl(5); o.out.p('11'); }], gap: 1200 }],
      [T('max gives the one further right, and min the one further left.', 'max zyada right wala deta hai, aur min zyada left wala.'), o => { o.c.hl(6); o.out.p('7 -4'); }]
    ]),
    S('Recap', B => ({ b: Bul(B, ['Every number has a place on a line; 0 in the middle', 'Right means bigger: −1 > −5', '<  >  <=  >=  ==  != answer True or False', '= stores a value, == asks a question', 'Distance between a and b is abs(a − b)'], { num: true }) }), [
      [T('Let us recap. Every number has a place on the line.', 'Recap karte hain. Har number ki line pe jagah hai.'), o => o.b.show(0)],
      [T('Right means bigger, even for negatives.', 'Right matlab bada, negatives mein bhi.'), o => o.b.show(1)],
      [T('Comparisons answer True or False. One equals stores, two equals asks.', 'Comparisons True ya False bolte hain. Ek equals rakhta hai, do equals poochta hai.'), null, { seq: [2, 3].map(i => o => o.b.show(i)), gap: 1200 }],
      [T('And distance is abs of a minus b. Well done. Now read the theory and try the drills below.', 'Aur doori abs of a minus b. Bahut badhiya. Ab neeche theory padho aur drills try karo.'), o => o.b.show(4)]
    ])
  ]}
]});

/* ---------- mt02 · The four operations and their order ---------- */
E.register('mt02', { id: 'mt02-v1', pause: SLOW, startLabel: T('Start: The four operations', 'Shuru karo: Chaar operations'), outro: NEXT, chapters: [
  { t: '1 · Four actions', scenes: [
    intro('Math · 2', 'The four operations and their order', 'Join, take away, repeat, share.', [
      [T('Plus, minus, times and divide. You know them already. Today we see them as four actions, and learn which one goes first.', 'Plus, minus, guna aur bhaag. Ye tum jaante ho. Aaj inhe chaar kaam ki tarah dekhenge, aur seekhenge pehle kaun aata hai.')]
    ]),
    S('Join and take away', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Addition joins groups. Three apples and four apples make seven apples.', 'Jod groups ko milata hai. Teen seb aur chaar seb, saat seb.'), o => { Dots(o.l, 7, { icon: '🍎', cols: 7, size: 60 }).hl([0, 1, 2], 'y'); Big(o.r, '3 + 4 = 7', { size: 52 }); }],
      [T('Subtraction takes away. Ten sweets, you eat three, seven are left.', 'Ghatana nikaalta hai. Das toffee, teen khaayi, saat bachi.'), o => { o.l.innerHTML = ''; o.r.innerHTML = ''; const d = Dots(o.l, 10, { icon: '🍬', cols: 5, size: 60 }); d.dim([7, 8, 9]); Big(o.r, '10 − 3 = 7', { size: 52 }); }]
    ]),
    S('Repeat and share', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Multiplication repeats a group. Four bags of five marbles. You could count five, five, five, five, or multiply once: twenty.', 'Guna group ko dohraata hai. Paanch-paanch kanchon ke chaar bag. Paanch, paanch, paanch, paanch gino, ya ek baar guna karo: bees.'), o => { const d = Dots(o.l, 20, { cols: 5, size: 50 }); d.group(5); Big(o.r, '4 × 5 = 20', { size: 52 }); }],
      [T('Division shares equally. Twenty marbles for four children: five each.', 'Bhaag barabar baant-ta hai. Bees kanche chaar bachchon mein: paanch-paanch.'), o => { o.r.innerHTML = ''; Big(o.r, '20 ÷ 4 = 5', { size: 52 }); }],
      [T('In Python, times is a star and divide is a slash, because the keyboard has no times sign.', 'Python mein guna star hai aur bhaag slash, kyunki keyboard pe guna ka sign nahi hai.'), o => { o.r.innerHTML = ''; Code(o.r, `print(3 + 4)\nprint(10 - 3)\nprint(4 * 5)\nprint(20 / 4)`, { size: 22 }); }]
    ])
  ]},
  { t: '2 · Which goes first', scenes: [
    S('Two plus three times four', B => { const [top, bot] = col(B, [1, 1]); return { top, bot }; }, [
      [T('What is two plus three times four? Pause and think.', 'Do plus teen guna chaar kitna? Ruko aur socho.'), o => { o.b = Big(o.top, '2 + 3 × 4 = ?', { size: 60 }); }, { think: 6 }],
      [T('If you went left to right, you would say five times four, twenty. But that is not the rule.', 'Left se right chalo toh paanch guna chaar, bees. Par rule ye nahi hai.'), o => Card(o.bot, { icon: '✗', title: 'Left to right: 20', body: 'not how maths works', c: 'm' })],
      [T('The rule: multiply and divide before add and subtract. Three times four is twelve, plus two is fourteen.', 'Rule: guna aur bhaag, jod aur ghatane se pehle. Teen guna chaar barah, plus do chaudah.'), o => { o.b.set('2 + <u>3 × 4</u> = 2 + 12 = 14'); o.bot.innerHTML = ''; Card(o.bot, { icon: '✓', title: 'Multiply first: 14', body: '× and ÷ before + and −', c: 's' }); }]
    ]),
    S('The order', B => ({ t: Tbl(B, ['first to last', 'what', 'Python'], [['1', 'Brackets', '( )'], ['2', 'Powers', '**'], ['3', 'Multiply and divide, left to right', '*  /  //  %'], ['4', 'Add and subtract, left to right', '+  -']], { hidden: true, mono: [2] }) }), [
      [T('Here is the full order. Brackets always go first. They are the way to say: do this part first.', 'Ye raha poora order. Brackets hamesha pehle. Ye kehne ka tareeka hai: ye hissa pehle karo.'), o => { o.t.show(0); o.t.hl(0); }],
      [T('Then powers, which you will meet in topic seven.', 'Phir powers, jo topic saat mein milenge.'), o => { o.t.show(1); o.t.hl(1); }],
      [T('Then multiply and divide. Then add and subtract. When two have the same rank, go left to right.', 'Phir guna aur bhaag. Phir jod aur ghatao. Same rank wale ho toh left se right.'), null, { seq: [2, 3].map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1300 }],
      [T('And a tip: when in doubt, add brackets. Brackets are free, and they make your meaning clear.', 'Aur ek tip: shak ho toh brackets lagao. Brackets free hain, aur matlab saaf kar dete hain.')]
    ]),
    S('Updating a value', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `score = 10\nscore += 5\nscore -= 3\nscore *= 2\nprint(score)`, { size: 23 }), v: Vars(r), r }; }, [
      [T('In code we often change a number using its old value. Score starts at ten.', 'Code mein aksar number ko uski purani value se badalte hain. Score das se shuru.'), o => { o.c.hl(1); o.v.set('score', '10', '', 'y'); }],
      [T('Plus equals five means: score grows by five. Fifteen. Then minus three: twelve. Then times two: twenty-four.', 'Plus equals paanch matlab: score paanch badha. Pandrah. Phir minus teen: barah. Phir guna do: chaubees.'), null, { seq: [[2, '15'], [3, '12'], [4, '24']].map(([l, v]) => o => { o.c.hl(l); o.v.set('score', v, '', 'y'); }), gap: 1200 }],
      [T('Pause and think. What does the last line print?', 'Ruko aur socho. Aakhri line kya print karegi?'), null, { think: 5 }],
      [T('Twenty-four. Each line uses the value left by the line before.', 'Chaubees. Har line pichhli line ki chhodi hui value use karti hai.'), o => { o.c.hl(5); const x = Out(o.r, { h: 60 }); x.p('24'); }]
    ])
  ]}
]});

/* ---------- mt03 · Division with remainders ---------- */
E.register('mt03', { id: 'mt03-v1', pause: SLOW, startLabel: T('Start: Division with remainders', 'Shuru karo: Remainder wala bhaag'), outro: NEXT, chapters: [
  { t: '1 · Sharing sweets', scenes: [
    intro('Math · 3', 'Division with remainders', 'How many each, and how many are left?', [
      [T('Some things cannot be cut in half. When you share them, some may be left over. Division then gives two answers.', 'Kuch cheezein aadhi nahi kaati ja sakti. Baantne pe kuch bach sakti hain. Tab bhaag do jawab deta hai.')]
    ]),
    S('14 sweets, 4 friends', B => { const [l, r] = row(B, [1.2, 1]); return { d: Dots(l, 14, { icon: '🍬', cols: 4, size: 64 }), v: Vars(r, { title: '14 sweets ÷ 4 friends' }), r }; }, [
      [T('Fourteen sweets and four friends. We hand them out one round at a time.', 'Chaudah toffee aur chaar dost. Ek-ek round mein baant-te hain.')],
      [T('Round one: each friend gets one sweet. That is one row of four. Round two, round three: three rows, twelve sweets.', 'Round ek: har dost ko ek toffee. Ye chaar ki ek row hai. Round do, round teen: teen rows, barah toffee.'), null, { seq: [1, 2, 3].map(k => o => { o.d.group(4); o.d.dim(range(k * 4, 13)); o.v.set('each friend has', String(k), '', 'y'); }), gap: 1200 }],
      [T('Two sweets remain. Not enough for another full round.', 'Do toffee bachi. Ek aur poore round ke liye kaafi nahi.'), o => { o.d.group(4); o.d.hl([12, 13], 'c'); o.v.set('left over', '2', '', 'c'); }],
      [T('So each friend gets three. That is the quotient. And two are left over. That is the remainder.', 'Toh har dost ko teen. Ye quotient hai. Aur do bachi. Ye remainder hai.'), o => { o.v.del('each friend has'); o.v.del('left over'); o.v.set('quotient', '3', 'each friend', 'y'); o.v.set('remainder', '2', 'left over', 'c'); }]
    ]),
    S('Two operators', B => ({ t: Tbl(B, ['question', 'Python', 'answer'], [['How many each?', '14 // 4', '3'], ['How many left?', '14 % 4', '2'], ['Exact share', '14 / 4', '3.5']], { hidden: true, mono: [1, 2] }) }), [
      [T('Python has one operator for each answer. Double slash: how many whole groups. Three.', 'Python mein har jawab ka ek operator hai. Double slash: kitne poore groups. Teen.'), o => { o.t.show(0); o.t.hl(0); }],
      [T('Percent: how many are left over. Two.', 'Percent: kitne bache. Do.'), o => { o.t.show(1); o.t.hl(1); }],
      [T('And a single slash gives the exact share, with a decimal: three point five.', 'Aur single slash exact hissa deta hai, decimal ke saath: teen point paanch.'), o => { o.t.show(2); o.t.hl(2); }]
    ])
  ]},
  { t: '2 · Eggs and boxes', scenes: [
    S('23 eggs, boxes of 6', B => { const [l, r] = row(B, [1.2, 1]); return { d: Dots(l, 23, { icon: '🥚', cols: 6, size: 58 }), r }; }, [
      [T('Twenty-three eggs go into boxes of six. How many full boxes? How many loose eggs?', 'Teis ande chhe-chhe wale dabbon mein. Kitne poore dabbe? Kitne khule ande?'), null, { think: 6 }],
      [T('Group them in sixes: three full boxes, and five loose eggs.', 'Chhe-chhe ke group: teen poore dabbe, aur paanch khule ande.'), o => { o.d.group(6); o.d.hl([18, 19, 20, 21, 22], 'c'); Big(o.r, '23 // 6 = 3<br>23 % 6 = 5', { size: 42 }); }],
      [T('Now the check that always works. Box size times full boxes, plus the loose ones, gives back the original number.', 'Ab wo check jo hamesha chalta hai. Dabbe ka size guna poore dabbe, plus khule, wapas original number deta hai.'), o => { o.r.innerHTML = ''; Big(o.r, '6 × 3 + 5 = 23 ✓', { size: 44 }); }],
      [T('And remember: the remainder is always smaller than the divisor. With boxes of six, you can have zero to five loose eggs, never six.', 'Aur yaad rakho: remainder hamesha divisor se chhota. Chhe wale dabbon mein zero se paanch khule ande ho sakte hain, kabhi chhe nahi.')]
    ]),
    S('Special cases', B => { const [a, b, c] = row(B, [1, 1, 1], { mid: true }); return { a, b, c }; }, [
      [T('When nothing is left, like twelve percent four, the answer is zero. That means it divides exactly.', 'Jab kuch nahi bachta, jaise barah percent chaar, jawab zero. Matlab poora bant gaya.'), o => Card(o.a, { icon: '✅', title: '12 % 4 = 0', body: 'divides exactly', c: 's' })],
      [T('Sharing three sweets among five friends: nobody gets a whole one, and all three are left.', 'Teen toffee paanch doston mein: kisi ko poori nahi milti, aur teeno bachti hain.'), o => Card(o.b, { icon: '🍬', title: '3 // 5 = 0,  3 % 5 = 3', body: 'smaller ÷ bigger', c: 'y' })],
      [T('And dividing by zero is impossible. Python stops with ZeroDivisionError.', 'Aur zero se bhaag impossible hai. Python ZeroDivisionError se ruk jaata hai.'), o => Card(o.c, { icon: '🚫', title: '5 / 0', body: 'ZeroDivisionError', c: 'm' })]
    ]),
    S('Rounding up', B => { const [top, bot] = col(B, [1.2, 1]); return { top, bot }; }, [
      [T('Fourteen people, and each car seats four. Fourteen double slash four is three cars. But then two people are left on the road.', 'Chaudah log, har car mein chaar seat. Chaudah double slash chaar, teen cars. Par tab do log sadak pe reh jaate hain.'), o => { const d = Dots(o.top, 14, { icon: '🧍', cols: 4, size: 44 }); d.group(4); d.hl([12, 13], 'c'); }],
      [T('We need to round up, to four cars. The trick: add divisor minus one before dividing.', 'Upar round karna hai, chaar cars. Trick: bhaag se pehle divisor minus ek jodo.'), o => Big(o.bot, '(14 + 4 − 1) // 4 = 17 // 4 = 4', { size: 38 })],
      [T('You will use this trick in problems like Koko Eating Bananas. Well done. Now the theory and drills.', 'Ye trick Koko Eating Bananas jaisi problems mein kaam aayegi. Bahut badhiya. Ab theory aur drills.')]
    ])
  ]}
]});

/* ---------- mt04 · Modulo ---------- */
E.register('mt04', { id: 'mt04-v1', pause: SLOW, startLabel: T('Start: Modulo', 'Shuru karo: Modulo'), outro: NEXT, chapters: [
  { t: '1 · Even and odd', scenes: [
    intro('Math · 4', 'Modulo: even, odd, clocks and cycles', 'Remainders go round in circles.', [
      [T('Last time, percent gave us the remainder. Today we discover its superpower: remainders go round in circles.', 'Pichhli baar percent ne remainder diya. Aaj uski superpower dekhenge: remainders gol-gol ghoomte hain.')]
    ]),
    S('n % 2', B => ({ t: Tbl(B, ['n', '0', '1', '2', '3', '4', '5', '6', '7'], [['n % 2', '0', '1', '0', '1', '0', '1', '0', '1']], { mono: range(0, 8) }), bot: B }), [
      [T('Divide numbers by two and look only at the remainder.', 'Numbers ko do se bhaag do aur sirf remainder dekho.')],
      [T('Zero, one, zero, one, zero, one. The pattern repeats forever.', 'Zero, ek, zero, ek, zero, ek. Pattern hamesha dohraata hai.'), o => o.t.hl(0)],
      [T('Even numbers leave zero. Odd numbers leave one. So n percent two equals zero means n is even.', 'Even numbers zero chhodte hain. Odd numbers ek. Toh n percent do equals zero matlab n even hai.'), o => Big(o.bot, 'n % 2 == 0  →  even', { size: 44 })]
    ])
  ]},
  { t: '2 · The clock', scenes: [
    S('10 o’clock + 5 hours', B => { const [l, r] = row(B, [1.1, 1]); return { k: Clock(l, 12, { labels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'], size: 400 }), r }; }, [
      [T('It is ten o’clock. What time is it five hours later?', 'Das baje hain. Paanch ghante baad kitne bajenge?'), o => o.k.to(10, 'now')],
      [T('Count on: eleven, twelve, one, two, three. Three o’clock, not fifteen o’clock. The clock goes round.', 'Aage gino: gyaarah, barah, ek, do, teen. Teen baje, pandrah baje nahi. Ghadi ghoomti hai.'), null, { seq: [11, 0, 1, 2, 3].map(k => o => o.k.to(k)), gap: 800 }],
      [T('Modulo is exactly this. Any number, however big, lands somewhere on the clock.', 'Modulo bilkul yahi hai. Koi bhi number, kitna bhi bada, ghadi pe kahin na kahin girta hai.'), o => Big(o.r, '(10 + 5) % 12 = 3', { size: 42 })]
    ]),
    S('A 5-hour clock', B => { const [l, r] = row(B, [1, 1]); return { k: Clock(l, 5, { size: 380 }), t: Tbl(r, ['n', 'n % 5'], range(0, 11).map(n => [n, n % 5]), { hidden: true, mono: [0, 1] }) }; }, [
      [T('Percent five is a clock with five positions: zero to four.', 'Percent paanch, paanch positions wali ghadi hai: zero se chaar.')],
      [T('Zero, one, two, three, four. Then five lands back on zero. Six on one. Seven on two.', 'Zero, ek, do, teen, chaar. Phir paanch wapas zero pe. Chhe ek pe. Saat do pe.'), null, { seq: range(0, 10).map(n => o => { o.k.to(n % 5, String(n)); o.t.show(n); o.t.hl(n); }), gap: 700 }],
      [T('Pause and think. Where does twenty-three land on a five-hour clock?', 'Ruko aur socho. Paanch ghante wali ghadi pe teis kahan girega?'), null, { think: 6 }],
      [T('On three. Twenty-three percent five is three.', 'Teen pe. Teis percent paanch, teen.'), o => o.k.to(3, '23')]
    ]),
    S('Days of the week', B => { const [l, r] = row(B, [1, 1]); return { k: Clock(l, 7, { labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], size: 380 }), r }; }, [
      [T('Days of the week work the same way, with seven positions. Today is Tuesday, day two.', 'Hafte ke din bhi aise hi, saat positions. Aaj Tuesday hai, din do.'), o => o.k.to(2, 'today')],
      [T('What day is it one hundred days from now? No calendar needed: two plus a hundred, percent seven, is four. Thursday.', 'Aaj se sau din baad kaunsa din? Calendar ki zaroorat nahi: do plus sau, percent saat, chaar. Thursday.'), o => { o.k.to(4, '+100'); Big(o.r, '(2 + 100) % 7 = 4', { size: 38 }); }]
    ])
  ]},
  { t: '3 · Divisibility and cycles', scenes: [
    S('FizzBuzz', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 3, 5, { size: 88, fill: (r, c) => String(r * 5 + c + 1) }), r }; }, [
      [T('Is n divisible by k? That is exactly n percent k equals zero.', 'Kya n, k se divisible hai? Bilkul n percent k equals zero.')],
      [T('FizzBuzz: multiples of three say Fizz.', 'FizzBuzz: teen ke multiples Fizz bolte hain.'), null, { seq: [3, 6, 9, 12].map(n => o => o.g.set(Math.floor((n - 1) / 5), (n - 1) % 5, 'Fizz', 'y')), gap: 600 }],
      [T('Multiples of five say Buzz.', 'Paanch ke multiples Buzz.'), null, { seq: [5, 10].map(n => o => o.g.set(Math.floor((n - 1) / 5), (n - 1) % 5, 'Buzz', 's')), gap: 700 }],
      [T('Fifteen is a multiple of both, so it says FizzBuzz. In code, check that "both" case first.', 'Pandrah dono ka multiple hai, toh FizzBuzz. Code mein "dono" wala case pehle check karo.'), o => { o.g.set(2, 4, 'Fizz Buzz', 'm'); Code(o.r, `if n % 15 == 0:\n    print("FizzBuzz")\nelif n % 3 == 0:\n    print("Fizz")\nelif n % 5 == 0:\n    print("Buzz")`, { size: 19 }); }]
    ]),
    S('Taking turns in a circle', B => { const [l, r] = row(B, [1, 1]); return { k: Clock(l, 5, { labels: ['P0', 'P1', 'P2', 'P3', 'P4'], size: 380 }), r }; }, [
      [T('Five players sit in a circle and take turns. After player four comes player zero again.', 'Paanch players gol baith ke baari-baari khelte hain. Player chaar ke baad phir player zero.'), null, { seq: [0, 1, 2, 3, 4, 0].map(k => o => o.k.to(k)), gap: 700 }],
      [T('The next player is i plus one, percent n. The last player wraps back to zero automatically.', 'Agla player i plus ek, percent n. Aakhri player apne aap zero pe aa jaata hai.'), o => Big(o.r, '(i + 1) % n', { size: 50 })],
      [T('Circular arrays, hashing and cycles in DSA all use this idea. Great job. Now the theory and drills.', 'DSA mein circular arrays, hashing aur cycles sab isi idea pe chalte hain. Shabaash. Ab theory aur drills.')]
    ])
  ]}
]});
})();
