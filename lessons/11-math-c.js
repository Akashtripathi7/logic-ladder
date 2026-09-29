/* Math for Logic course videos, part C: mt09 – mt12. */
(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Out, Vars, Arr, Tbl, NumLine, Dots, Grid, Bits } = E;
const { S, intro, range, fresh } = LH;
const SLOW = 1500;
const NEXT = T('Now read the theory below, then try the drills.', 'Ab neeche ki theory padho, phir drills try karo.');

/* ---------- mt09 · Binary ---------- */
E.register('mt09', { id: 'mt09-v1', pause: SLOW, startLabel: T('Start: Binary numbers and bits', 'Shuru karo: Binary aur bits'), outro: NEXT, chapters: [
  { t: '1 · Switches', scenes: [
    intro('Math · 9', 'Binary numbers and bits', 'Counting with only 0 and 1.', [
      [T('Deep inside, a computer only has switches: off or on, zero or one. Binary is simply counting with those two digits.', 'Andar se computer ke paas sirf switches hain: off ya on, zero ya ek. Binary bas in do digits se ginna hai.')]
    ]),
    S('Price tags 8, 4, 2, 1', B => { const [top, bot] = col(B, [1.2, 1]); return { b: Bits(top, 4, { sum: true, value: 0 }), bot }; }, [
      [T('Here are four switches. Each has a price tag: eight, four, two, one. Every place is worth double the one to its right.', 'Ye chaar switches hain. Har ek pe price tag: aath, chaar, do, ek. Har jagah apne right wali se dugni keemti.')],
      [T('To show five, switch on four and one. Zero one zero one.', 'Paanch dikhane ke liye chaar aur ek on karo. Zero ek zero ek.'), o => o.b.set(5)],
      [T('To show thirteen: eight plus four plus one. One one zero one.', 'Terah dikhane ke liye: aath plus chaar plus ek. Ek ek zero ek.'), o => o.b.set(13)],
      [T('Pause and think. Which switches make ten?', 'Ruko aur socho. Das kaunse switches se banega?'), null, { think: 6 }],
      [T('Eight and two: one zero one zero.', 'Aath aur do: ek zero ek zero.'), o => o.b.set(10)]
    ]),
    S('Counting in binary', B => { const [top, bot] = col(B, [1.2, 1]); return { b: Bits(top, 4, { sum: true, value: 0 }), bot }; }, [
      [T('Watch binary counting from zero to eight. The rightmost switch flips at every single step.', 'Zero se aath tak binary ginti dekho. Sabse right wala switch har step pe palatta hai.'), null, { seq: range(0, 8).map(v => o => o.b.set(v)), gap: 900 }],
      [T('Seven is one one one: all switches on. Add one and everything rolls over to one zero zero zero, eight. Just like nine nine nine plus one is one thousand.', 'Saat matlab ek ek ek: saare on. Ek jodo toh sab ghoom ke ek zero zero zero, aath. Bilkul nau sau ninyaanve plus ek, ek hazaar jaisa.'), o => Big(o.bot, '0111 + 1 = 1000', { size: 44 })]
    ])
  ]},
  { t: '2 · Converting', scenes: [
    S('13 to binary', B => { const [l, r] = row(B, [1.1, 1]); return { t: Tbl(l, ['n', 'n % 2', 'n // 2'], [['13', '1', '6'], ['6', '0', '3'], ['3', '1', '1'], ['1', '1', '0']], { hidden: true, mono: [0, 1, 2] }), r }; }, [
      [T('To turn a number into binary, keep dividing by two and write down the remainders. It is the digit loop from topic five, with two instead of ten.', 'Number ko binary banane ke liye do se bhaag dete raho aur remainders likho. Ye topic paanch ka digit loop hai, das ki jagah do.')],
      [T('Thirteen: remainder one, then six. Six: remainder zero, then three. Three: one, then one. One: one, then zero. Stop.', 'Terah: remainder ek, phir chhe. Chhe: zero, phir teen. Teen: ek, phir ek. Ek: ek, phir zero. Ruko.'), null, { seq: range(0, 3).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1400 }],
      [T('Read the remainders from bottom to top: one one zero one.', 'Remainders neeche se upar padho: ek ek zero ek.'), o => Big(o.r, '13 → 1101', { size: 52 })],
      [T('Python can do it too: bin of thirteen, and int of the string with base two to go back.', 'Python bhi kar sakta hai: bin of terah, aur wapas jaane ke liye base do wala int.'), o => Code(o.r, `print(bin(13))        # 0b1101\nprint(int('1101', 2))  # 13`, { size: 20 })]
    ])
  ]},
  { t: '3 · Bit operations', scenes: [
    S('AND, OR, XOR', B => { const [a, b, c] = col(B, [1, 1, 1]); return { A: Bits(a, 4, { value: 12, label: 'a = 12' }), Bb: Bits(b, 4, { value: 10, label: 'b = 10' }), c }; }, [
      [T('Python can work on all the switches at once. Here are twelve and ten.', 'Python saare switches pe ek saath kaam kar sakta hai. Ye rahe barah aur das.')],
      [T('AND keeps a switch on only if it is on in both. That leaves eight.', 'AND switch tabhi on rakhta hai jab dono mein on ho. Aath bachta hai.'), o => Bits(o.c, 4, { value: 8, label: 'a & b  (AND)' })],
      [T('OR keeps a switch on if either has it on: fourteen.', 'OR switch on rakhta hai agar kisi mein bhi on ho: chaudah.'), o => { o.c.innerHTML = ''; Bits(o.c, 4, { value: 14, label: 'a | b  (OR)' }); }],
      [T('XOR keeps the switches that differ: six. XOR of a number with itself is zero, which makes pairs cancel out.', 'XOR wo switches rakhta hai jo alag hain: chhe. Kisi number ka khud se XOR zero hai, isse jodiyan kat jaati hain.'), o => { o.c.innerHTML = ''; Bits(o.c, 4, { value: 6, label: 'a ^ b  (XOR)' }); }]
    ]),
    S('Shifts and the last bit', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('Shifting left moves every switch one place left, which doubles the number. Shifting right halves it.', 'Left shift har switch ko ek jagah left le jaata hai, jo number dugna karta hai. Right shift aadha karta hai.'), o => { Bits(o.l, 5, { value: 6, label: '6' }); Bits(o.l, 5, { value: 12, label: '6 << 1 = 12' }); }],
      [T('And n AND one reads only the last switch: one for odd numbers, zero for even ones. Well done. Now the theory and drills.', 'Aur n AND ek sirf aakhri switch padhta hai: odd numbers ke liye ek, even ke liye zero. Bahut badhiya. Ab theory aur drills.'), o => Code(o.r, `print(7 & 1)   # 1, odd\nprint(8 & 1)   # 0, even`, { size: 22 })]
    ])
  ]}
]});

/* ---------- mt10 · Patterns and sums ---------- */
E.register('mt10', { id: 'mt10-v1', pause: SLOW, startLabel: T('Start: Patterns and sums', 'Shuru karo: Patterns aur sums'), outro: NEXT, chapters: [
  { t: '1 · Spotting patterns', scenes: [
    intro('Math · 10', 'Patterns and sums', 'Spot the rule, save the work.', [
      [T('Many problems are really patterns in disguise. Spot the rule, and a long loop can become one small formula.', 'Bahut problems asal mein chhupe hue patterns hain. Rule pakdo, aur lamba loop ek chhota formula ban sakta hai.')]
    ]),
    S('Look at the gaps', B => { const [top, bot] = col(B, [1, 1]); return { top, bot }; }, [
      [T('Three, six, nine, twelve. What comes next? Look at the gaps between neighbours: always three.', 'Teen, chhe, nau, barah. Aage kya? Padosiyon ke beech farak dekho: hamesha teen.'), o => { Arr(o.top, [3, 6, 9, 12, '?'], { w: 90, noIdx: true }); }],
      [T('So the next is fifteen, and the k-th term is three times k.', 'Toh agla pandrah, aur k-th term teen guna k.'), o => Big(o.bot, '3, 6, 9, 12, 15 → 3 × k', { size: 42 })],
      [T('One, two, four, eight, sixteen doubles each time. One, four, nine, sixteen are the squares.', 'Ek, do, chaar, aath, solah har baar dugna. Ek, chaar, nau, solah squares hain.'), o => { o.bot.innerHTML = ''; Big(o.bot, '1, 2, 4, 8, 16 → 2^(k−1)<br>1, 4, 9, 16 → k × k', { size: 36 }); }]
    ])
  ]},
  { t: "2 · Gauss's trick", scenes: [
    S('1 + 2 + … + 100', B => { const [top, bot] = col(B, [1, 1]); return { top, bot }; }, [
      [T('A young student named Gauss was told to add all the numbers from one to one hundred. He finished in seconds. How?', 'Gauss naam ke ek chhote student ko ek se sau tak saare numbers jodne ko kaha gaya. Unhone seconds mein kar diya. Kaise?')],
      [T('He paired the numbers from both ends. One plus a hundred is one hundred and one. Two plus ninety-nine is one hundred and one. Every pair makes one hundred and one.', 'Unhone dono kinaron se jodiyan banayi. Ek plus sau, ek sau ek. Do plus ninyaanve, ek sau ek. Har jodi ek sau ek.'), o => Big(o.top, '1 + 100 = 101<br>2 + 99 = 101<br>3 + 98 = 101 …', { size: 36 })],
      [T('There are fifty pairs. Fifty times one hundred and one is five thousand and fifty.', 'Pachaas jodiyan hain. Pachaas guna ek sau ek, paanch hazaar pachaas.'), o => Big(o.bot, '50 × 101 = 5050', { size: 50 })]
    ]),
    S('The staircase picture', B => { const [l, r] = row(B, [1, 1]); return { g: Grid(l, 4, 5, { size: 66, fill: () => '' }), r }; }, [
      [T('Here is why it always works. Build a staircase of blocks: one, then two, then three, then four.', 'Ye hamesha kyun chalta hai. Blocks ki seedhi banao: ek, phir do, phir teen, phir chaar.'), null, { seq: [[0, 1], [1, 2], [2, 3], [3, 4]].map(([r, n]) => o => { for (let c = 0; c < n; c++) o.g.hl(r, c, 'y'); }), gap: 800 }],
      [T('Make a copy, turn it upside down, and push them together.', 'Ek copy banao, ulti karo, aur dono ko saath chipkao.'), null, { seq: [[0, 4], [1, 3], [2, 2], [3, 1]].map(([r, n]) => o => { for (let c = 5 - n; c < 5; c++) o.g.hl(r, c, 's'); }), gap: 800 }],
      [T('You get a rectangle four tall and five wide: twenty blocks. The staircase is exactly half: ten.', 'Chaar oonchi aur paanch chaudi rectangle ban gayi: bees blocks. Seedhi theek aadhi hai: das.'), o => Big(o.r, '1 + 2 + … + n<br>= n × (n + 1) / 2', { size: 38 })],
      [T('Pause and think. What is one plus two up to ten?', 'Ruko aur socho. Ek plus do, das tak kitna?'), null, { think: 6 }],
      [T('Ten times eleven over two: fifty-five.', 'Das guna gyaarah, bata do: pachpan.'), o => { o.r.innerHTML = ''; Big(o.r, '10 × 11 / 2 = 55', { size: 44 }); }]
    ])
  ]},
  { t: '3 · Prefix sums', scenes: [
    S('Running totals', B => { const [top, bot] = col(B, [1, 1]); return { a: Arr(top, [3, 1, 4, 1, 5], { w: 84, label: 'nums' }), bot }; }, [
      [T('A running total adds as it goes: three, then four, then eight, nine, fourteen.', 'Running total chalte-chalte jodta hai: teen, phir chaar, phir aath, nau, chaudah.'), o => { o.p = Arr(o.bot, [0], { w: 84, label: 'prefix' }); }],
      [T('Store the totals in a list with a zero in front. This is called a prefix sum.', 'Totals ek list mein rakho, aage ek zero. Ise prefix sum kehte hain.'), null, { seq: [3, 4, 8, 9, 14].map((v, i) => o => { o.a.clear(); o.a.hl(i, 'y'); o.p.push(v); }), gap: 900 }],
      [T('Now any stretch is one subtraction. The sum of positions one to three is prefix four minus prefix one: nine minus three, six.', 'Ab koi bhi hissa ek ghatana hai. Position ek se teen ka sum, prefix chaar minus prefix ek: nau minus teen, chhe.'), o => { o.a.clear(); o.a.hl([1, 2, 3], 's'); o.p.hl([1, 4], 'y'); }],
      [T('Like a car odometer: to know the distance between two times, subtract the readings. Great work. Now the theory and drills.', 'Car ke odometer jaisa: do samay ke beech ki doori ke liye readings ghata do. Bahut badhiya. Ab theory aur drills.')]
    ])
  ]}
]});

/* ---------- mt11 · Counting ---------- */
E.register('mt11', { id: 'mt11-v1', pause: SLOW, startLabel: T('Start: Counting', 'Shuru karo: Counting'), outro: NEXT, chapters: [
  { t: '1 · Multiply the choices', scenes: [
    intro('Math · 11', 'Counting: pairs, subsets and arrangements', 'Count the possibilities before you try them.', [
      [T('Before trying every possibility, count how many there are. That number tells you if your idea is fast enough.', 'Har possibility try karne se pehle gino kitni hain. Wo number batata hai ki idea kaafi tez hai ya nahi.')]
    ]),
    S('Shirts and trousers', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 3, 2, { size: 110, labels: true, rowLab: ['🔴', '🔵', '🟢'], colLab: ['👖', '🩳'] }), r }; }, [
      [T('Three shirts and two trousers. For each shirt, there are two trousers.', 'Teen shirts aur do pants. Har shirt ke liye do pants.'), null, { seq: range(0, 5).map(k => o => o.g.set(Math.floor(k / 2), k % 2, '✓', 'y')), gap: 700 }],
      [T('Three times two: six outfits. When choices are independent, multiply them.', 'Teen guna do: chhe outfits. Choices alag hon toh guna karo.'), o => { o.g.set(2, 1, '✓', 'y'); Big(o.r, '3 × 2 = 6', { size: 52 }); }],
      [T('In code, this is a loop inside a loop: it runs three times two times.', 'Code mein ye loop ke andar loop hai: teen guna do baar chalta hai.'), o => { o.r.innerHTML = ''; Code(o.r, `for shirt in shirts:\n    for pants in trousers:\n        print(shirt, pants)`, { size: 20 }); }]
    ])
  ]},
  { t: '2 · Pairs', scenes: [
    S('Handshakes', B => { const [l, r] = row(B, [1.2, 1]); return { g: Grid(l, 5, 5, { size: 70, labels: true, rowLab: ['A', 'B', 'C', 'D', 'E'], colLab: ['A', 'B', 'C', 'D', 'E'] }), r }; }, [
      [T('Five friends, and everyone shakes hands with everyone else once. How many handshakes?', 'Paanch dost, har koi har doosre se ek baar haath milata hai. Kitne handshakes?'), null, { think: 6 }],
      [T('A with B is the same handshake as B with A. So count only the top half, where the row comes before the column.', 'A ka B se aur B ka A se, ek hi handshake hai. Toh sirf upar wala aadha gino, jahan row column se pehle aati hai.'), null, { seq: range(0, 9).map(k => o => { const pairs = []; for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) pairs.push([i, j]); const [i, j] = pairs[k]; o.g.set(i, j, '🤝', 'y'); }), gap: 450 }],
      [T('Ten handshakes. The formula is n times n minus one, over two.', 'Das handshakes. Formula: n guna n minus ek, bata do.'), o => { o.g.set(3, 4, '🤝', 'y'); Big(o.r, '5 × 4 / 2 = 10', { size: 44 }); }],
      [T('For a thousand items that is almost half a million pairs. That is why checking every pair gets slow.', 'Hazaar items ke liye ye lagbhag paanch lakh jodiyan. Isliye har jodi check karna slow hota hai.')]
    ])
  ]},
  { t: '3 · Subsets and orders', scenes: [
    S('Pizza toppings', B => { const [l, r] = row(B, [1.1, 1]); return { g: Grid(l, 8, 3, { size: 46, labels: true, colLab: ['🧀', '🫒', '🌽'], rowLab: range(0, 7).map(String) }), r }; }, [
      [T('Three toppings: cheese, olives and corn. For each one, you choose yes or no.', 'Teen toppings: cheese, olives aur corn. Har ek ke liye haan ya naa.')],
      [T('Nothing. Corn. Olives. Olives and corn. Cheese. Cheese and corn. Cheese and olives. Everything.', 'Kuch nahi. Corn. Olives. Olives aur corn. Cheese. Cheese aur corn. Cheese aur olives. Sab kuch.'), null, { seq: range(0, 7).map(k => o => { for (let b = 0; b < 3; b++) if (k >> (2 - b) & 1) o.g.set(k, b, '✓', 'y'); }), gap: 700 }],
      [T('Two times two times two: eight. With n items there are two to the n subsets.', 'Do guna do guna do: aath. n items ke do ki power n subsets.'), o => Big(o.r, '2 × 2 × 2 = 2³ = 8', { size: 40 })]
    ]),
    S('Orders', B => { const [l, r] = row(B, [1, 1]); return { l, r }; }, [
      [T('In how many orders can four runners finish? The winner can be any of four.', 'Chaar runners kitne orders mein khatam kar sakte hain? Winner chaar mein se koi bhi.'), o => { o.b = Big(o.l, '4', { size: 60 }); }],
      [T('Second place, any of the three left. Then two, then one.', 'Second, bache hue teen mein se koi. Phir do, phir ek.'), o => o.b.set('4 × 3 × 2 × 1 = 24')],
      [T('This is four factorial. Factorials explode even faster than powers.', 'Ye chaar factorial hai. Factorials powers se bhi tez phat-te hain.'), o => Tbl(o.r, ['count', 'n = 10'], [['pairs  n(n−1)/2', '45'], ['subsets  2ⁿ', '1,024'], ['orders  n!', '3,628,800']], { mono: [1] })],
      [T('Great work. These counts tell you how slow an approach will be. Now the theory and drills.', 'Bahut badhiya. Ye counts batate hain ki approach kitni slow hogi. Ab theory aur drills.')]
    ])
  ]}
]});

/* ---------- mt12 · Ranges and off-by-one ---------- */
E.register('mt12', { id: 'mt12-v1', pause: SLOW, startLabel: T('Start: Ranges and off-by-one', 'Shuru karo: Ranges aur off-by-one'), outro: NEXT, chapters: [
  { t: '1 · Counting a range', scenes: [
    intro('Math · 12', 'Ranges, rounding and off-by-one', 'The most common bug in all of programming.', [
      [T('How many numbers are there from three to seven? Most people say four. Let us check carefully.', 'Teen se saat tak kitne numbers? Zyada log chaar kehte hain. Dhyaan se check karte hain.')]
    ]),
    S('3 to 7', B => { const [top, bot] = col(B, [1.2, 1]); return { n: NumLine(top, 0, 10), bot }; }, [
      [T('Three, four, five, six, seven. That is five numbers, not four.', 'Teen, chaar, paanch, chhe, saat. Paanch numbers, chaar nahi.'), null, { seq: [3, 4, 5, 6, 7].map(v => o => o.n.mark(v, String(v), 'y')), gap: 700 }],
      [T('Seven minus three counts the gaps between them. We need one more for the starting number.', 'Saat minus teen unke beech ke gaps ginta hai. Shuru wale number ke liye ek aur chahiye.'), o => Big(o.bot, 'a to b, both included: b − a + 1', { size: 40 })],
      [T('Being off by exactly one is so common it has a name: the off-by-one error.', 'Theek ek se galat hona itna common hai ki iska naam hai: off-by-one error.')]
    ]),
    S('The fence posts', B => { const [top, bot] = col(B, [1.2, 1]); return { n: NumLine(top, 0, 10), bot }; }, [
      [T('A fence ten metres long, with a post every metre. How many posts?', 'Das metre lambi baad, har metre pe khamba. Kitne khambe?'), null, { think: 6 }],
      [T('Eleven. One at the start, plus one at the end of every metre.', 'Gyaarah. Ek shuru mein, plus har metre ke end pe ek.'), null, { seq: range(0, 10).map(v => o => o.n.mark(v, '', 'y')), gap: 250 }],
      [T('Ten gaps, eleven posts. Gaps and posts always differ by one.', 'Das gaps, gyaarah khambe. Gaps aur khambe hamesha ek se alag.'), o => Big(o.bot, '10 gaps → 11 posts', { size: 44 })]
    ])
  ]},
  { t: "2 · Python's range", scenes: [
    S('range stops early', B => { const [l, r] = row(B, [1.1, 1]); return { c: Code(l, `print(list(range(5)))\nprint(list(range(3, 8)))\nprint(list(range(1, n + 1)))`, { size: 21 }), out: Out(r, { h: 180 }), r }; }, [
      [T('Python\'s range never includes the stop value. Range five gives zero to four: five numbers.', 'Python ka range stop value kabhi shaamil nahi karta. Range paanch, zero se chaar: paanch numbers.'), o => { o.c.hl(1); o.out.p('[0, 1, 2, 3, 4]'); }],
      [T('Range three to eight gives three to seven.', 'Range teen se aath, teen se saat deta hai.'), o => { o.c.hl(2); o.out.p('[3, 4, 5, 6, 7]'); }],
      [T('To include n itself, stop at n plus one. Before every loop, say its first and last value out loud.', 'n khud shaamil karna ho toh n plus ek pe roko. Har loop se pehle uski pehli aur aakhri value zor se bolo.'), o => o.c.hl(3)]
    ]),
    S('List indexes', B => { const [top, bot] = col(B, [1, 1]); return { a: Arr(top, ['L', 'A', 'D', 'D', 'E', 'R'], { w: 84 }), bot }; }, [
      [T('A list of length six has indexes zero to five. The last one is length minus one.', 'Chhe length ki list ke indexes zero se paanch. Aakhri length minus ek.'), o => { o.a.hl(5, 'y'); o.a.ptr('n − 1', 5, 'y'); }],
      [T('Asking for index six crashes with IndexError. When you compare each item with the next, stop one early so that i plus one still exists.', 'Index chhe maangoge toh IndexError crash. Har item ko agle se compare karte waqt ek pehle ruko taaki i plus ek maujood ho.'), o => Code(o.bot, `for i in range(len(a) - 1):\n    if a[i] > a[i + 1]:\n        ...`, { size: 20 })]
    ])
  ]},
  { t: '3 · Floor and ceiling', scenes: [
    S('Round down, round up', B => { const [top, bot] = col(B, [1.2, 1]); return { n: NumLine(top, 0, 5), bot }; }, [
      [T('Floor rounds down. Three point seven becomes three.', 'Floor neeche round karta hai. Teen point saat, teen.'), o => { o.n.mark(3.7, '3.7', 'c'); o.n.hop(3.7, 3, 'floor → 3', 's', 40); }],
      [T('Ceiling rounds up. Three point two becomes four.', 'Ceiling upar round karta hai. Teen point do, chaar.'), o => { o.n.mark(3.2, '3.2', 'c'); o.n.hop(3.2, 4, 'ceil → 4', 'y', 40); }],
      [T('For whole numbers, double slash is floor, and a plus b minus one, double slash b, is ceiling. Great work. Now the theory and drills.', 'Whole numbers ke liye double slash floor hai, aur a plus b minus ek, double slash b, ceiling. Bahut badhiya. Ab theory aur drills.'), o => Big(o.bot, '7 // 2 = 3   ·   (7 + 2 − 1) // 2 = 4', { size: 36 })]
    ])
  ]}
]});
})();
