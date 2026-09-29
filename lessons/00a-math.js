(function () {
const T = E.T;
const { row, col, Txt, Hd, Big, Pic, Title, Card, Bul, Code, Out, Vars, Arr, Trace, Tbl, NumLine, Clock, Dots, Grid, Chart, Bits, KV, Think } = E;
const S = (t, setup, beats) => ({ t, setup, beats });
const fresh = (cell, make) => { cell.innerHTML = ''; return make(cell); };
const range = (a, b) => { const r = []; for (let i = a; i <= b; i++) r.push(i); return r; };

const chapters = [];
const CH = (t, scenes) => chapters.push({ t, scenes });

/* ================= 0. WELCOME ================= */
CH('0 · Welcome', [
  S('Why math first?', B => ({ t: Title(B, 'Step 1', 'The Math Behind Logic', 'Every math idea you need before DSA 150, starting from zero.') }), [
    [T('Hey, welcome! If you have ever looked at a coding problem and thought, I have no idea where to even start, this video is for you.', 'Hello, swagat hai! Agar kabhi koi coding problem dekh ke laga ho ki shuru kahan se karun, toh ye video tumhare liye hai.')],
    [T('Here is a secret. Logic building is not a talent you are born with. It is a set of small tools. Once you own the tools, problems stop looking scary.', 'Ek secret sun lo. Logic building koi janm se milne wala talent nahi hai. Ye chhote-chhote tools ka set hai. Tools aa gaye, toh problems darawni nahi lagti.')],
    [T('In this first video we collect the math tools. Not scary exam math. Just the handful of ideas that show up again and again in coding problems.', 'Is video mein hum math ke tools ikatthe karenge. Exam wala dara dene wala math nahi. Bas wo gine-chune ideas jo coding problems mein baar-baar aate hain.')],
    [T('Next, you learn Python from zero and turn these ideas into real programs. After that, the Logic Gym, and then you are ready for DSA 150.', 'Iske baad tum Python bilkul shuru se seekhoge aur in ideas ko asli programs mein badloge. Phir Logic Gym, aur phir tum DSA 150 ke liye ready.')]
  ]),
  S('Your map', B => {
    const [a, b] = row(B, [1, 1]);
    return {
      a: Bul(a, ['Numbers and the number line', 'Division and remainders', 'Modulo: the clock trick', 'Playing with digits', 'Factors, primes and GCD', 'Powers, roots and logarithms', 'Binary and bits'], { num: true, sm: true }),
      b: Bul(b, ['Sums and patterns', 'Counting: pairs, orders, subsets', 'Floor, ceiling, ranges, min and max', 'Grids and coordinates', 'Logic: true and false', 'Big O: measuring speed', 'Limits and overflow'], { num: true, sm: true })
    };
  }, [
    [T('Here is our map. Fourteen short levels, and each one builds on the one before it.', 'Ye raha humara map. Chaudah chhote levels, aur har level pichhle wale pe bana hai.'), null, { seq: range(0, 6).map(i => o => o.a.show(i)), gap: 380 }],
    [T('We start with plain numbers and division, then modulo, digits, primes, powers and binary.', 'Shuru karenge simple numbers aur division se, phir modulo, digits, primes, powers aur binary.'), null, { seq: range(0, 6).map(i => o => o.b.show(i)), gap: 380 }],
    [T('Then sums, counting, ranges and grids, the stuff that tells you how many times your code runs. And we finish with Big O, the language for how fast code is.', 'Phir sums, counting, ranges aur grids, jo batate hain ki tumhara code kitni baar chalega. Aur end mein Big O, yaani code kitna fast hai uski bhasha.')],
    [T('Along the way you will see challenges with a timer. When the timer appears, pause and try it yourself. Struggling for one minute is exactly how your brain builds logic. Try it now.', 'Beech mein timer wale challenges aayenge. Timer dikhe toh video roko aur khud try karo. Ek minute ka struggle hi dimaag mein logic banata hai. Abhi try karo.'), null, { think: 5 }],
    [T('Nice. You can also step forward and backward with the arrow keys, and jump to any scene from the chapter list. Let us begin.', 'Badhiya. Arrow keys se aage-peeche ja sakte ho, aur chapter list se kisi bhi scene pe jump kar sakte ho. Chalo shuru karte hain.')]
  ])
]);

/* ================= 1. NUMBERS ================= */
CH('1 · Numbers', [
  S('Kinds of numbers', B => {
    const [top, bot] = col(B, [1.1, 1]);
    return { nl: NumLine(top, -6, 6), bot };
  }, [
    [T('Let us start at the very beginning: numbers. Picture a long straight road with zero in the middle. This is the number line.', 'Bilkul shuru se shuru karte hain: numbers. Ek lambi seedhi sadak socho jiske beech mein zero hai. Ye hai number line.')],
    [T('Counting numbers, one, two, three, go to the right. They are called natural numbers. They are what you use to count mangoes.', 'Ginti wale numbers, ek, do, teen, right ki taraf jaate hain. Inhe natural numbers kehte hain. Aam ginne ke liye yahi use karte ho.'), o => { o.nl.mark(1, '1', 'm'); o.nl.mark(2, '2', 'm'); o.nl.mark(3, '3', 'm'); }],
    [T('Add zero, and we get whole numbers. Zero matters a lot in coding, because counting positions in code starts at zero, not one.', 'Zero jodo toh whole numbers mil jaate hain. Coding mein zero bahut important hai, kyunki code mein positions zero se ginte hain, ek se nahi.'), o => o.nl.mark(0, '0', 'y')],
    [T('Now go left of zero. Minus one, minus two. Negative numbers. Think of a building: floor three is above the ground, and basement floor minus two is below it.', 'Ab zero ke left chalo. Minus ek, minus do. Negative numbers. Ek building socho: teesri manzil zameen ke upar hai, aur basement minus do zameen ke neeche.'), o => {
      o.nl.mark(-1, '−1', 'c'); o.nl.mark(-2, '−2', 'c');
      o.card = Card(o.bot, { icon: '🏢', title: 'A building', body: 'Floor 3 is above ground. Basement floor −2 is below it. Zero is the ground floor.', c: 'c' });
    }],
    [T('All of these together, positives, negatives and zero, are called integers. In Python, the type for integers is int.', 'Ye sab milke, positive, negative aur zero, integers kehlate hain. Python mein integers ka type int hai.'), o => { o.bot.innerHTML = ''; Big(o.bot, '…, −2, −1, 0, 1, 2, … → <span class="s">int</span>', { size: 44 }); }],
    [T('Numbers with a decimal point, like two point five, live between the integers. In Python, those are called floats. Money is a good example: two rupees fifty paise is two point five.', 'Decimal point wale numbers, jaise do point paanch, integers ke beech mein rehte hain. Python mein inhe float kehte hain. Paisa accha example hai: do rupaye pachaas paise matlab do point paanch.'), o => { o.nl.mark(2.5, '2.5', 's'); Big(o.bot, '2.5, 0.75, −3.14 → <span class="s">float</span>', { size: 44 }); }],
    [T('Rule of thumb. If you count things, use an int. If you measure things, like height or price, use a float.', 'Simple rule. Cheezein gin rahe ho toh int. Kuch naap rahe ho, jaise height ya price, toh float.'), o => { o.bot.innerHTML = ''; Card(o.bot, { icon: '📏', title: 'Count → int.  Measure → float.', body: 'Number of students: int. Height of a student: float.', c: 'y' }); }]
  ]),
  S('Distance and absolute value', B => {
    const [top, bot] = col(B, [1.1, 1]);
    return { nl: NumLine(top, -6, 6), bot };
  }, [
    [T('Now a tiny idea that shows up in many problems: distance. How far is minus four from zero?', 'Ab ek chhota idea jo kai problems mein aata hai: doori. Minus chaar, zero se kitna door hai?'), o => o.nl.mark(-4, '−4', 'c')],
    [T('Four steps. Distance is never negative. You walk four steps whether you walk left or right.', 'Chaar kadam. Doori kabhi negative nahi hoti. Left jao ya right, chaar kadam hi chaloge.'), o => o.nl.hop(0, -4, '4 steps', 'y')],
    [T('This is called the absolute value. We write it with two straight bars. The absolute value of minus four is four. The absolute value of four is also four.', 'Ise absolute value kehte hain. Do seedhi lines ke beech likhte hain. Minus chaar ki absolute value chaar hai. Chaar ki absolute value bhi chaar.'), o => { o.b = Big(o.bot, '|−4| = 4 &nbsp;&nbsp; |4| = 4'); }],
    [T('The distance between any two numbers a and b is the absolute value of a minus b. From minus two to three: three minus minus two is five steps.', 'Kisi bhi do numbers a aur b ke beech ki doori, a minus b ki absolute value hai. Minus do se teen tak: teen minus minus do, yaani paanch kadam.'), o => {
      o.nl.clear(); o.nl.mark(-2, '−2', 'c'); o.nl.mark(3, '3', 'm'); o.nl.hop(-2, 3, '5 steps', 'y');
      o.b.set('|a − b| → |3 − (−2)| = <span class="y">5</span>');
    }],
    [T('In Python, you write abs of a minus b. You will use this in problems like: find the number closest to a target.', 'Python mein likhte ho abs of a minus b. Ye tab kaam aata hai jab poocha jaaye: target ke sabse paas wala number dhoondo.'), o => { o.bot.innerHTML = ''; Code(o.bot, 'distance = abs(a - b)', { size: 30 }); }]
  ])
]);

/* ================= 2. DIVISION ================= */
CH('2 · Division', [
  S('Sharing candies', B => {
    const [l, r] = row(B, [1.25, 1]);
    return { d: Dots(l, 14, { icon: '🍬', cols: 7, size: 70 }), l, r, v: Vars(r, { title: '14 candies ÷ 4 friends' }) };
  }, [
    [T('Division is just fair sharing. We have fourteen candies and four friends. Every friend must get the same amount.', 'Division bas barabar baantna hai. Humare paas chaudah toffee hain aur chaar dost. Har dost ko barabar milna chahiye.')],
    [T('Let us hand them out in rounds of four. Each colour is one friend’s share.', 'Chaar-chaar ke rounds mein baantte hain. Har rang ek dost ka hissa hai.'), o => o.d.group(4)],
    [T('Each friend gets three candies. That three is called the quotient.', 'Har dost ko teen toffee mili. Is teen ko quotient kehte hain.'), o => o.v.set('quotient', 3, 'full groups', 'y')],
    [T('Two candies are left over. Nobody can get one more without it being unfair. That two is the remainder.', 'Do toffee bach gayi. Kisi ko ek aur doge toh na-insaafi hogi. Is do ko remainder kehte hain.'), o => o.v.set('remainder', 2, 'left over', 'c')],
    [T('Here is the golden relationship. Fourteen equals four times three, plus two. Dividend equals divisor times quotient, plus remainder.', 'Ye raha golden rishta. Chaudah barabar chaar guna teen, plus do. Dividend barabar divisor guna quotient, plus remainder.'), o => { Big(o.l, '14 = 4 × <span class="y">3</span> + <span class="c">2</span>', { size: 46 }); }],
    [T('Python has three kinds of division. A single slash gives the exact answer with decimals. Fourteen slash four is three point five.', 'Python mein teen tarah ka division hai. Single slash decimal ke saath exact answer deta hai. Chaudah slash chaar, teen point paanch.'), o => {
      o.code = Code(o.r, "print(14 / 4)    # 3.5  exact\nprint(14 // 4)   # 3    quotient\nprint(14 % 4)    # 2    remainder", { size: 21 });
      o.code.hl(1);
    }],
    [T('Double slash gives only the whole part, the quotient: three. Read it as: how many full groups?', 'Double slash sirf poora hissa deta hai, yaani quotient: teen. Aise padho: kitne poore group bane?'), o => o.code.hl(2)],
    [T('And the percent sign gives the remainder: two. This is called modulo, and it is so useful it gets its own level.', 'Aur percent sign remainder deta hai: do. Ise modulo kehte hain, aur ye itna kaam ka hai ki iska apna level hai.'), o => o.code.hl(3)],
    [T('Pause and think. What is twenty-three double slash five? And twenty-three modulo five?', 'Ruko aur socho. Teis double slash paanch kitna hai? Aur teis modulo paanch?'), null, { think: 7 }],
    [T('Twenty-three is five times four, plus three. So the quotient is four and the remainder is three.', 'Teis matlab paanch guna chaar, plus teen. Toh quotient chaar hai aur remainder teen.'), o => { o.l.innerHTML = ''; o.d = Dots(o.l, 23, { icon: '🍬', cols: 8, size: 56 }); o.d.group(5); Big(o.l, '23 = 5 × <span class="y">4</span> + <span class="c">3</span>', { size: 46 }); }]
  ]),
  S('Order of operations', B => {
    const [a, b] = col(B, [1, 1.3]);
    return { big: Big(a, '2 + 3 × 4 = ?', { size: 64 }), b };
  }, [
    [T('Quick puzzle. What is two plus three times four? Twenty? Or fourteen?', 'Chhota sa puzzle. Do plus teen guna chaar kitna hai? Bees? Ya chaudah?'), null, { think: 5 }],
    [T('It is fourteen. Multiplication happens before addition. So three times four first, which is twelve, then add two.', 'Chaudah. Guna, jod se pehle hota hai. Pehle teen guna chaar, baarah, phir do jodo.'), o => o.big.set('2 + <span class="y">3 × 4</span> → 2 + 12 → <span class="m">14</span>')],
    [T('The order is: brackets first. Then multiply, divide and modulo, from left to right. Then add and subtract, from left to right. Some people remember it as BODMAS.', 'Order ye hai: pehle brackets. Phir guna, bhaag aur modulo, left se right. Phir jod aur ghata, left se right. Kuch log ise BODMAS se yaad rakhte hain.'), o => { Bul(o.b, ['<span class="y">( )</span> brackets first', '<span class="s">×  ÷  //  %</span> next, left to right', '<span class="m">+  −</span> last, left to right'], { num: true, shown: true }); }],
    [T('Brackets are your steering wheel. If you want the addition first, wrap it in brackets. Two plus three, in brackets, times four, is twenty.', 'Brackets tumhara steering wheel hain. Jod pehle chahiye toh bracket lagao. Do plus teen bracket mein, guna chaar, bees.'), o => o.big.set('<span class="y">(2 + 3)</span> × 4 → 5 × 4 → <span class="m">20</span>')],
    [T('This matters in real code. To find the middle between two positions, low and high, you must put low plus high in brackets, then divide by two. Without the brackets, you would only divide high by two.', 'Asli code mein ye zaroori hai. Low aur high ke beech ka middle nikaalna ho, toh low plus high bracket mein daal ke do se bhaag karo. Bina bracket ke sirf high do se bhaag hoga.'), o => o.big.set('mid = <span class="y">(low + high)</span> // 2')],
    [T('Tip: when in doubt, add brackets. They cost nothing, and they make your intention clear to anyone reading your code.', 'Tip: shak ho toh bracket laga do. Koi kharcha nahi, aur code padhne wale ko tumhara matlab saaf samajh aata hai.')]
  ])
]);

/* ================= 3. MODULO ================= */
CH('3 · Modulo', [
  S('The clock trick', B => {
    const [l, r] = row(B, [1, 1], { center: true });
    return { c: Clock(l, 12, { labels: ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'], size: 420 }), r };
  }, [
    [T('Modulo is the remainder after division. But the best way to feel it is with a clock.', 'Modulo division ke baad ka remainder hai. Lekin ise mehsoos karne ka sabse accha tareeka hai ek ghadi.')],
    [T('It is nine o’clock. What time will it be in five hours?', 'Nau baje hain. Paanch ghante baad kitne bajenge?'), o => o.c.to(9, '9:00')],
    [T('Count forward. Ten, eleven, twelve, one, two. Two o’clock! Not fourteen o’clock. The clock wraps around.', 'Aage gino. Das, gyarah, baarah, ek, do. Do baje! Chaudah baje nahi. Ghadi ghoom ke wapas aa jaati hai.'), null, { seq: [10, 11, 12, 13, 14].map(k => o => o.c.to(k, k === 14 ? '2:00' : '+' + (k - 9))), gap: 650 }],
    [T('That is exactly modulo. Nine plus five is fourteen. And fourteen modulo twelve is two.', 'Yahi modulo hai. Nau plus paanch chaudah. Aur chaudah modulo baarah, do.'), o => { o.b = Big(o.r, '(9 + 5) % 12<br>= 14 % 12<br>= <span class="y">2</span>', { size: 50 }); }],
    [T('Modulo n always gives an answer from zero up to n minus one. With twelve, the answer can only be zero to eleven. Modulo keeps any number trapped inside a circle.', 'Modulo n ka answer hamesha zero se n minus ek ke beech hota hai. Baarah ke saath answer sirf zero se gyarah tak. Modulo kisi bhi number ko ek gol ghere mein band rakhta hai.'), o => { Txt(o.r, 'x % n is always between <span class="y">0</span> and <span class="y">n − 1</span>', 'sm'); }]
  ]),
  S('Counting in circles', B => {
    const [l, r] = row(B, [1, 1], { center: true });
    return { c: Clock(l, 5, { size: 380 }), t: Tbl(r, ['n', 'n % 5'], range(0, 11).map(n => [n, n % 5]), { hidden: true, mono: [0, 1] }) };
  }, [
    [T('Let us watch a clock with only five positions: zero to four. As we count up, watch where the hand lands.', 'Ab sirf paanch positions wali ghadi dekho: zero se chaar. Ginte hue dekho sui kahan rukti hai.')],
    [T('Zero, one, two, three, four. Then five lands back on zero. Six on one. Seven on two. The pattern repeats forever.', 'Zero, ek, do, teen, chaar. Phir paanch wapas zero pe. Chhe, ek pe. Saat, do pe. Ye pattern hamesha dohraata hai.'), null, { seq: range(0, 11).map(n => o => { o.c.to(n, n + ' % 5 = ' + (n % 5)); o.t.show(n); o.t.hl(n); }), gap: 620 }],
    [T('So any number modulo five tells you how far past the last full lap you are. Eleven is two full laps, which is ten, plus one.', 'Toh kisi bhi number ka modulo paanch batata hai ki aakhri poore chakkar se tum kitna aage ho. Gyarah matlab do poore chakkar, yaani das, plus ek.')],
    [T('Pause and think. What is one hundred modulo five? And one hundred and three modulo five?', 'Ruko aur socho. Sau modulo paanch kitna? Aur ek sau teen modulo paanch?'), null, { think: 6 }],
    [T('One hundred is exactly twenty laps, so the answer is zero. One hundred and three is three past that, so the answer is three.', 'Sau bilkul bees chakkar hai, toh answer zero. Ek sau teen usse teen aage, toh answer teen.')]
  ]),
  S('Even or odd?', B => {
    const [l, r] = row(B, [1.2, 1]);
    return { l, r };
  }, [
    [T('The most common use of modulo: is a number even or odd? Even means you can pair everyone up, with nobody left alone.', 'Modulo ka sabse common use: number even hai ya odd? Even matlab sabko jodi mein bitha sakte ho, koi akela nahi bachta.'), o => { o.d = Dots(o.l, 8, { icon: '🙂', cols: 4, size: 76 }); }],
    [T('Eight people make four pairs, and nobody is left. Eight modulo two is zero. Even.', 'Aath log, chaar jodiyan, koi nahi bacha. Aath modulo do, zero. Even.'), o => { o.d.group(2); o.t = Txt(o.l, '8 % 2 = <span class="m">0</span> → even'); }],
    [T('Seven people make three pairs, and one person is left alone. Seven modulo two is one. Odd.', 'Saat log, teen jodiyan, aur ek insaan akela. Saat modulo do, ek. Odd.'), o => { o.l.innerHTML = ''; o.d = Dots(o.l, 7, { icon: '🙂', cols: 4, size: 76 }); o.d.group(2); Txt(o.l, '7 % 2 = <span class="c">1</span> → odd'); }],
    [T('So in code: if n modulo two equals zero, n is even. Otherwise, it is odd.', 'Toh code mein: agar n modulo do barabar zero, n even hai. Warna odd.'), o => { Code(o.r, "if n % 2 == 0:\n    print('even')\nelse:\n    print('odd')", { size: 24 }); }],
    [T('The same idea checks any divisibility. If n modulo three equals zero, n is a multiple of three. A remainder of zero means it divides perfectly.', 'Yahi idea kisi bhi divisibility ko check karta hai. n modulo teen zero hai toh n teen ka multiple hai. Remainder zero matlab poora-poora divide.'), o => { Big(o.r, 'n % k == 0<br><span class="d" style="font-size:.55em">k divides n perfectly</span>', { size: 40 }); }]
  ]),
  S('Challenge: FizzBuzz', B => {
    const [l, r] = row(B, [1.1, 1]);
    return { g: Grid(l, 3, 5, { size: 88, fill: (r, c) => String(r * 5 + c + 1) }), th: Think(r, ['Understand the rules', 'Work examples by hand', 'Pick the tool: % finds multiples', 'Watch the order of checks']) };
  }, [
    [T('Here is a classic interview warm-up called FizzBuzz. For the numbers one to fifteen: multiples of three say Fizz, multiples of five say Buzz, and multiples of both say FizzBuzz.', 'Ek classic interview warm-up hai FizzBuzz. Ek se pandrah tak: teen ke multiple pe Fizz, paanch ke multiple pe Buzz, aur dono ke multiple pe FizzBuzz.'), o => o.th.on(0)],
    [T('We do not code yet. We think. First, which numbers are multiples of three? The ones where n modulo three is zero.', 'Abhi code nahi. Pehle sochte hain. Teen ke multiple kaun se hain? Jahan n modulo teen zero hai.'), o => { o.th.on(1); [3, 6, 9, 12, 15].forEach(n => o.g.hl(Math.floor((n - 1) / 5), (n - 1) % 5, 'y')); }],
    [T('Now the multiples of five: five, ten and fifteen.', 'Ab paanch ke multiple: paanch, das aur pandrah.'), o => { [5, 10].forEach(n => o.g.hl(Math.floor((n - 1) / 5), (n - 1) % 5, 's')); o.g.hl(2, 4, 'm'); o.th.on(2); }],
    [T('Fifteen is in both groups, so it gets FizzBuzz.', 'Pandrah dono groups mein hai, toh use FizzBuzz milega.'), o => o.g.set(2, 4, 'FB', 'm')],
    [T('Here is the trap. If you check multiple of three first, fifteen says Fizz and stops there. So you must check the both case first. The order of your checks matters.', 'Yahan trap hai. Agar teen ka multiple pehle check kiya, toh pandrah Fizz bol ke ruk jayega. Isliye dono wala case pehle check karo. Checks ka order matter karta hai.'), o => o.th.on(3)],
    [T('Pause and think. Is thirty a Fizz, a Buzz, or a FizzBuzz? What about twenty-seven?', 'Ruko aur socho. Tees Fizz hai, Buzz hai, ya FizzBuzz? Aur sattais?'), null, { think: 7 }],
    [T('Thirty modulo three is zero, and thirty modulo five is zero, so FizzBuzz. Twenty-seven divides by three but not by five, so just Fizz.', 'Tees modulo teen zero, aur tees modulo paanch zero, toh FizzBuzz. Sattais teen se divide hota hai par paanch se nahi, toh sirf Fizz.'), o => o.th.done()]
  ]),
  S('Wrap-around', B => {
    const [a, b] = col(B, [1, 1], { center: true });
    return { a: Arr(a, ['🧒', '👧', '👦', '🧑', '👩'], { w: 100 }), b };
  }, [
    [T('One more superpower. Five kids sit in a circle, passing a ball to the right. Their positions are zero to four.', 'Ek aur superpower. Paanch bachche gol ghere mein baithe hain, ball right ki taraf pass kar rahe hain. Unki positions zero se chaar.'), o => o.a.ptr('ball', 0, 'y')],
    [T('The ball moves to position one, two, three, four.', 'Ball position ek, do, teen, chaar pe jaati hai.'), null, { seq: [1, 2, 3, 4].map(i => o => o.a.ptr('ball', i, 'y')), gap: 600 }],
    [T('After position four, the next kid is back at position zero, because it is a circle. How can we write that without an if statement?', 'Position chaar ke baad agla bachcha wapas position zero pe hai, kyunki ye gol ghera hai. Bina if ke ye kaise likhein?')],
    [T('Next position equals current plus one, modulo five. Four plus one is five, and five modulo five is zero. Wrapped around!', 'Agli position barabar current plus ek, modulo paanch. Chaar plus ek paanch, aur paanch modulo paanch zero. Ghoom ke wapas!'), o => { o.a.ptr('ball', 0, 'y'); Big(o.b, 'next = (i + 1) % n', { size: 54 }); }],
    [T('This shows up in circular array problems and in hashing. Whenever something goes around in a circle, think modulo.', 'Ye circular array problems aur hashing mein aata hai. Jab bhi kuch gol ghoomta hai, modulo socho.')]
  ])
]);

/* ================= 4. DIGITS ================= */
CH('4 · Digits', [
  S('Peeling digits', B => {
    const [l, r] = row(B, [1.1, 1]);
    return { l, r, a: Arr(l, ['4', '7', '2', '9'], { w: 110, noIdx: true, label: 'n = 4729' }) };
  }, [
    [T('Many problems ask you to work with the digits of a number: reverse it, add its digits, check if it is a palindrome. Two tools do all of it.', 'Kai problems number ke digits ke saath kaam karwati hain: ulta karo, digits jodo, palindrome check karo. Do tools ye sab kar dete hain.')],
    [T('Take four thousand seven hundred and twenty-nine. What is the last digit? Nine. But how do we get it using math?', 'Chaar hazaar saat sau untees lo. Aakhri digit kya hai? Nau. Lekin math se kaise nikaalein?'), o => o.a.hl(3, 'y')],
    [T('Modulo ten! When you divide by ten, the remainder is always the last digit. Four seven two nine modulo ten is nine.', 'Modulo das! Das se bhaag do toh remainder hamesha aakhri digit hota hai. Chaar saat do nau modulo das, nau.'), o => { o.b = Big(o.l, '4729 % 10 = <span class="y">9</span>', { size: 48 }); }],
    [T('And how do we throw away the last digit? Integer division by ten. Four seven two nine, double slash ten, is four seven two. The nine is chopped off.', 'Aur aakhri digit hataayein kaise? Das se integer division. Chaar saat do nau, double slash das, chaar saat do. Nau kat gaya.'), o => { o.a.dim(3); Big(o.l, '4729 // 10 = <span class="s">472</span>', { size: 48 }); }],
    [T('Think of peeling an onion. Modulo ten looks at the outer layer. Integer division by ten peels it off. Repeat until nothing is left.', 'Pyaaz chheelne jaisa socho. Modulo das bahar ki parat dekhta hai. Das se integer division use utaar deta hai. Jab tak kuch na bache, dohraao.'), o => { Card(o.r, { icon: '🧅', title: 'Peel the onion', body: '<b class="y">n % 10</b> → look at the last digit<br><b class="s">n // 10</b> → remove the last digit', c: 'y' }); o.v = Vars(o.r); o.v.set('n', 4729, 'int'); }],
    [T('Watch. Digit nine, and n becomes 472. Digit two, n becomes 47. Digit seven, n becomes 4. Digit four, n becomes zero. When n reaches zero, we stop.', 'Dekho. Digit nau, aur n bana chaar sau bahattar. Digit do, n bana saintalees. Digit saat, n bana chaar. Digit chaar, n bana zero. n zero hote hi ruk jao.'), o => { o.a.clear(); }, {
      seq: [[9, 472, 3], [2, 47, 2], [7, 4, 1], [4, 0, 0]].map(([d, n, i]) => o => { o.v.set('digit', d, 'n % 10', 'y'); o.v.set('n', n, 'n // 10'); o.a.hl(i, 'y'); o.a.dim(i); }), gap: 1500
    }]
  ]),
  S('Reverse a number', B => {
    const [l, r] = row(B, [1.15, 1]);
    return { l, r };
  }, [
    [T('Now let us reverse a number. 472 should become 274. Before any code, how would you do it by hand?', 'Ab number ulta karte hain. Chaar sau bahattar ko do sau chauhattar banana hai. Code se pehle, haath se kaise karoge?')],
    [T('You would read the digits from the end: two, then seven, then four. And you would build a new number, one digit at a time.', 'Digits peeche se padhoge: do, phir saat, phir chaar. Aur ek naya number banaoge, ek-ek digit jodke.')],
    [T('Building a number means pushing the old digits one place to the left, and putting the new digit at the end. Pushing left is multiplying by ten. Twenty-seven times ten is two seventy, plus four is two seventy-four.', 'Number banane ka matlab: purane digits ko ek jagah left khiskao, aur naya digit end mein rakho. Left khiskaana matlab das se guna. Sattais guna das do sau sattar, plus chaar, do sau chauhattar.'), o => { o.b = Big(o.r, 'rev = rev × 10 + digit', { size: 40 }); }],
    [T('Here is the code. Do not worry about the word while yet. It just means: repeat while n is bigger than zero. We will master loops in the Python course.', 'Ye raha code. While word ki abhi chinta mat karo. Iska matlab bas itna: jab tak n zero se bada hai, dohraate raho. Loops Python course mein pakke karenge.'), o => {
      o.code = Code(o.l, "n = 472\nrev = 0\nwhile n > 0:\n    digit = n % 10\n    rev = rev * 10 + digit\n    n = n // 10\nprint(rev)  # 274", { size: 22 });
      o.code.hl(3); o.tr = Trace(o.r, ['n', 'digit', 'rev']);
    }],
    [T('Round one. The digit is two. rev becomes zero times ten plus two, which is two. n becomes 47.', 'Round ek. Digit do hai. rev bana zero guna das plus do, yaani do. n bana saintalees.'), o => { o.code.hl(4, 5, 6); o.tr.row(['472', '2', '0×10+2 = 2']); }],
    [T('Round two. The digit is seven. rev becomes two times ten plus seven, twenty-seven. n becomes four.', 'Round do. Digit saat. rev bana do guna das plus saat, sattais. n bana chaar.'), o => o.tr.row(['47', '7', '2×10+7 = 27'])],
    [T('Round three. The digit is four. rev becomes two seventy-four. n becomes zero, so the loop stops, and we print 274.', 'Round teen. Digit chaar. rev bana do sau chauhattar. n zero ho gaya, loop ruka, aur hum do sau chauhattar print karte hain.'), o => { o.tr.row(['4', '4', '27×10+4 = 274']); o.tr.row(['0', '—', 'stop → 274'], 'good'); o.code.hl(8); }],
    [T('The same peeling loop solves many problems. Add each digit to get the digit sum. Add one each round to count digits. And a number is a palindrome if it equals its own reverse, like 121.', 'Yahi peeling loop kai problems solve karta hai. Har digit jodo toh digit sum. Har round ek jodo toh digits ki ginti. Aur number palindrome hai agar apne reverse ke barabar ho, jaise ek sau ikkees.'), o => { o.r.innerHTML = ''; Bul(o.r, ['sum += digit → <span class="y">sum of digits</span>', 'count += 1 → <span class="y">number of digits</span>', 'rev == original → <span class="y">palindrome</span>'], { shown: true, sm: true }); }]
  ])
]);

/* ================= 5. FACTORS & PRIMES ================= */
CH('5 · Factors and primes', [
  S('Factors as rectangles', B => {
    const [l, r] = row(B, [1.6, 1]);
    return { l, r, b: Bul(r, ['1 × 12', '2 × 6', '3 × 4'], { num: true }) };
  }, [
    [T('A factor of a number divides it perfectly, with a remainder of zero. Here is a visual way to see factors: chocolate.', 'Kisi number ka factor use poora divide karta hai, remainder zero. Factors dekhne ka ek visual tareeka: chocolate.')],
    [T('You have twelve chocolate squares. How many ways can you arrange them into a perfect rectangle?', 'Tumhare paas baarah chocolate squares hain. Kitne tareekon se inhe ek perfect rectangle mein laga sakte ho?'), o => { o.g = Grid(o.l, 1, 12, { size: 50 }); o.g.all(x => x.className = 'gc c-y'); }],
    [T('One row of twelve. That is one times twelve.', 'Baarah ki ek row. Yaani ek guna baarah.'), o => o.b.show(0)],
    [T('Two rows of six.', 'Chhe ki do rows.'), o => { o.g = fresh(o.l, c => Grid(c, 2, 6, { size: 64 })); o.g.all(x => x.className = 'gc c-s'); o.b.show(1); }],
    [T('Three rows of four.', 'Chaar ki teen rows.'), o => { o.g = fresh(o.l, c => Grid(c, 3, 4, { size: 72 })); o.g.all(x => x.className = 'gc c-m'); o.b.show(2); }],
    [T('Four rows of three is the same rectangle, just turned sideways. We have already counted it. Factors come in pairs!', 'Teen ki chaar rows wahi rectangle hai, bas tircha ghooma hua. Wo already gin chuke. Factors jodi mein aate hain!'), o => { o.g = fresh(o.l, c => Grid(c, 4, 3, { size: 72 })); o.g.all(x => x.className = 'gc c-m'); }],
    [T('The pairs are one and twelve, two and six, three and four. In every pair, one number is small and one is big. The switch happens around the square root of twelve, about three point four six.', 'Jodiyan hain ek aur baarah, do aur chhe, teen aur chaar. Har jodi mein ek chhota aur ek bada. Badlaav baarah ke square root ke aas-paas hota hai, lagbhag teen point chaar chhe.'), o => { Txt(o.r, 'small partner ≤ <span class="y">√12 ≈ 3.46</span> ≤ big partner', 'sm'); }],
    [T('So to find all factors, you only need to check up to the square root. Every small factor you find hands you its big partner for free.', 'Toh saare factors ke liye square root tak check karna kaafi hai. Har chhota factor apna bada partner muft mein de deta hai.')]
  ]),
  S('Prime numbers', B => {
    const [l, r] = row(B, [1, 1]);
    return { g: Grid(l, 5, 6, { size: 66, fill: (r, c) => String(r * 6 + c + 1) }), r };
  }, [
    [T('A prime number has exactly two factors: one and itself. Seven chocolates can only make one row of seven. No other rectangle works.', 'Prime number ke exactly do factors hote hain: ek aur khud. Saat chocolates se sirf saat ki ek row banti hai. Koi aur rectangle nahi.')],
    [T('The primes up to thirty are: 2, 3, 5, 7, 11, 13, 17, 19, 23 and 29.', 'Tees tak ke primes: do, teen, paanch, saat, gyarah, terah, satrah, unees, teis aur untees.'), null, { seq: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29].map(n => o => o.g.hl(Math.floor((n - 1) / 6), (n - 1) % 6, 'y')), gap: 450 }],
    [T('One is not prime, because it has only one factor. And two is the only even prime, because every other even number divides by two.', 'Ek prime nahi hai, kyunki uska sirf ek factor hai. Aur do akela even prime hai, kyunki baaki har even number do se divide hota hai.'), o => { o.g.hl(0, 0, 'c'); o.g.hl(0, 1, 'm'); }],
    [T('How do we check if a number n is prime? The slow way: try dividing by every number from two up to n minus one. That is a lot of work for big numbers.', 'Kaise check karein ki n prime hai? Slow tareeka: do se n minus ek tak har number se divide karke dekho. Bade numbers ke liye bahut kaam.')],
    [T('The smart way: only try up to the square root of n. If n had a factor bigger than the square root, its partner would be smaller than the square root, and we would already have found it.', 'Smart tareeka: sirf square root tak try karo. Agar square root se bada koi factor hota, toh uska partner square root se chhota hota, aur wo hume pehle hi mil jaata.'), o => { Big(o.r, 'check d = 2 … √n', { size: 42 }); }],
    [T('Let us check thirty-seven. Its square root is about six point zero eight. So we only try two, three, four, five and six.', 'Saintees check karte hain. Uska square root lagbhag chhe point zero aath. Toh sirf do, teen, chaar, paanch aur chhe try karenge.'), o => { o.r.innerHTML = ''; o.tr = Trace(o.r, ['d', '37 % d', 'divides?']); }, {
      seq: [2, 3, 4, 5, 6].map(d => o => o.tr.row([d, 37 % d, 'no'])), gap: 700
    }],
    [T('No remainder was zero. So thirty-seven is prime. We did just five checks instead of thirty-five.', 'Koi remainder zero nahi aaya. Toh saintees prime hai. Paintees ki jagah sirf paanch checks.'), o => o.tr.row(['—', '—', 'prime ✓'], 'good')],
    [T('Pause and think. Is ninety-one prime? Check divisors up to its square root, which is about nine point five.', 'Ruko aur socho. Kya ikyaanve prime hai? Uske square root tak check karo, jo lagbhag nau point paanch hai.'), null, { think: 9 }],
    [T('Ninety-one modulo seven is zero! Ninety-one is seven times thirteen. Not prime. Sneaky one.', 'Ikyaanve modulo saat zero hai! Ikyaanve matlab saat guna terah. Prime nahi. Chalaak number tha.'), o => { Big(o.r, '91 = 7 × 13', { size: 44 }); }]
  ]),
  S('GCD and LCM', B => {
    const [l, r] = row(B, [1, 1]);
    return { l, r, b: Big(l, 'gcd(12, 18) = <span class="y">6</span>', { size: 44 }) };
  }, [
    [T('GCD means greatest common divisor: the biggest number that divides both numbers. For twelve and eighteen, it is six.', 'GCD matlab greatest common divisor: sabse bada number jo dono ko divide kare. Baarah aur athaarah ka GCD chhe hai.')],
    [T('Imagine twelve red balloons and eighteen blue ones. You want identical gift bags with nothing left over. The most bags you can make is the GCD: six bags, each with two red and three blue.', 'Socho baarah laal gubbare aur athaarah neele. Tumhe ek jaise gift bags banane hain, kuch bachna nahi chahiye. Zyada se zyada kitne bags? GCD: chhe bags, har ek mein do laal aur teen neele.'), o => Card(o.l, { icon: '🎈', title: '6 identical bags', body: '12 red ÷ 6 = 2 per bag<br>18 blue ÷ 6 = 3 per bag', c: 'y' })],
    [T('There is a beautiful two thousand year old trick called Euclid’s algorithm. The GCD of a and b equals the GCD of b and a modulo b. Keep going until the second number becomes zero.', 'Ek do hazaar saal purani sundar trick hai, Euclid ka algorithm. a aur b ka GCD barabar b aur a modulo b ka GCD. Jab tak doosra number zero na ho, chalte raho.'), o => { o.l.innerHTML = ''; Big(o.l, 'gcd(a, b) = gcd(b, a % b)', { size: 36 }); o.tr = Trace(o.r, ['a', 'b', 'a % b']); }],
    [T('Let us find the GCD of forty-eight and eighteen. Forty-eight modulo eighteen is twelve. So now we find the GCD of eighteen and twelve.', 'Artaalees aur athaarah ka GCD nikaalte hain. Artaalees modulo athaarah, baarah. Ab athaarah aur baarah ka GCD.'), o => o.tr.row([48, 18, 12])],
    [T('Eighteen modulo twelve is six. Now the GCD of twelve and six.', 'Athaarah modulo baarah, chhe. Ab baarah aur chhe ka GCD.'), o => o.tr.row([18, 12, 6])],
    [T('Twelve modulo six is zero. Now we have six and zero. When the second number is zero, the first number is the answer: six.', 'Baarah modulo chhe, zero. Ab hai chhe aur zero. Doosra zero ho gaya, toh pehla number answer hai: chhe.'), o => { o.tr.row([12, 6, 0]); o.tr.row([6, 0, 'answer: 6'], 'good'); }],
    [T('LCM, the least common multiple, is the first moment two cycles meet. One bus comes every four minutes, another every six. When do they arrive together?', 'LCM, yaani least common multiple, wo pehla pal hai jab do chakkar milte hain. Ek bus har chaar minute, doosri har chhe minute. Saath kab aayengi?'), o => Card(o.l, { icon: '🚌', title: 'Two buses', body: 'every 4 min: 4, 8, <b class="y">12</b>, 16…<br>every 6 min: 6, <b class="y">12</b>, 18…', c: 's' })],
    [T('At twelve minutes. The shortcut: LCM equals a times b divided by their GCD. Four times six is twenty-four, divided by two, is twelve.', 'Baarah minute pe. Shortcut: LCM barabar a guna b bhaag GCD. Chaar guna chhe chaubees, bhaag do, baarah.'), o => Big(o.l, 'lcm = a × b ÷ gcd', { size: 36 })]
  ])
]);

/* ================= 6. POWERS, ROOTS, LOGS ================= */
CH('6 · Powers and logs', [
  S('Powers: the doubling machine', B => {
    const [l, r] = row(B, [0.8, 1.2]);
    return { t: Tbl(l, ['power', 'value'], range(0, 10).map(k => ['2<sup>' + k + '</sup>', 2 ** k]), { hidden: true, mono: [1] }), r };
  }, [
    [T('A power is repeated multiplication. Two to the power three means two times two times two, which is eight.', 'Power matlab baar-baar guna. Do ki power teen matlab do guna do guna do, yaani aath.'), o => { Big(o.r, '2³ = 2 × 2 × 2 = <span class="y">8</span>', { size: 46 }); }],
    [T('Fold a sheet of paper in half and you get two layers. Fold again: four. Again: eight. Every fold doubles. That is powers of two.', 'Kaagaz ko aadha modo toh do parten. Phir modo: chaar. Phir: aath. Har mod double karta hai. Yahi do ki powers hain.'), o => Card(o.r, { icon: '📄', title: 'Folding paper', body: '1 fold → 2 layers, 2 folds → 4, 3 folds → 8', c: 's' })],
    [T('Watch how fast doubling grows. Two to the zero is one, because anything to the power zero is one. Then 2, 4, 8, 16, 32, 64, 128, 256, 512 and 1024.', 'Dekho doubling kitni tezi se badhti hai. Do ki power zero ek hai, kyunki kisi bhi cheez ki power zero ek hoti hai. Phir 2, 4, 8, 16, 32, 64, 128, 256, 512 aur 1024.'), null, { seq: range(0, 10).map(k => o => { o.t.show(k); o.t.hl(k); }), gap: 480 }],
    [T('Memorise this. Two to the ten is about a thousand. Two to the twenty is about a million. Two to the thirty is about a billion. You will use these to estimate how fast code runs.', 'Ye yaad kar lo. Do ki power das lagbhag ek hazaar. Do ki power bees lagbhag das lakh. Do ki power tees lagbhag sau crore. Inse andaza lagaoge ki code kitna fast chalega.'), o => { o.r.innerHTML = ''; Bul(o.r, ['2¹⁰ ≈ <span class="y">1 thousand</span>', '2²⁰ ≈ <span class="y">1 million</span>', '2³⁰ ≈ <span class="y">1 billion</span>'], { shown: true }); }],
    [T('Power two has a special name: squared. Five squared is five times five, twenty-five. Power three is called cubed. Five cubed is one hundred and twenty-five.', 'Power do ka special naam hai: square. Paanch ka square paanch guna paanch, pachchees. Power teen ko cube kehte hain. Paanch ka cube ek sau pachchees.'), o => Big(o.r, '5² = 25 &nbsp; 5³ = 125', { size: 40 })]
  ]),
  S('Square roots', B => {
    const [l, r] = row(B, [1, 1.1], { center: true });
    return { g: Grid(l, 5, 5, { size: 70 }), r };
  }, [
    [T('A square number can be arranged into a perfect square. Twenty-five squares make a five by five square.', 'Square number ko ek perfect square mein laga sakte hain. Pachchees squares se paanch guna paanch ka square banta hai.'), o => o.g.all(x => x.className = 'gc c-s')],
    [T('The square root asks the reverse question. I have a square made of twenty-five, how long is its side? Five. So the square root of twenty-five is five.', 'Square root ulta sawaal poochta hai. Pachchees ka square hai, uski side kitni lambi? Paanch. Toh pachchees ka square root paanch.'), o => { for (let c = 0; c < 5; c++) o.g.hl(4, c, 'y'); Big(o.r, '√25 = <span class="y">5</span><br><span class="d" style="font-size:.5em">because 5 × 5 = 25</span>', { size: 54 }); }],
    [T('Most numbers are not perfect squares. The square root of thirty is about five point four eight.', 'Zyaadatar numbers perfect square nahi hote. Tees ka square root lagbhag paanch point chaar aath.')],
    [T('In code, we often avoid square roots completely. Instead of saying i is at most root n, we say i times i is at most n. Same meaning, and no decimals.', 'Code mein aksar square root se bachte hain. i root n se chhota ya barabar kehne ki jagah, i guna i, n se chhota ya barabar likhte hain. Matlab wahi, decimal nahi.'), o => { Big(o.r, 'i ≤ √n &nbsp;⟺&nbsp; <span class="y">i * i ≤ n</span>', { size: 36 }); }]
  ]),
  S('Logarithms: how many halvings?', B => {
    const [top, bot] = col(B, [1, 1.2]);
    return { a: Arr(top, range(1, 16), { w: 60 }), bot, top };
  }, [
    [T('Logarithm sounds scary. It is actually a simple question: how many times can you cut something in half, until only one piece is left?', 'Logarithm sunne mein darawna lagta hai. Asal mein simple sawaal hai: kisi cheez ko kitni baar aadha kar sakte ho jab tak sirf ek tukda na bache?')],
    [T('Start with sixteen cards. Cut in half: eight. Again: four. Again: two. Again: one. Four cuts.', 'Solah patton se shuru. Aadha: aath. Phir: chaar. Phir: do. Phir: ek. Chaar cuts.'), o => { o.v = Vars(o.bot); o.v.set('cards', 16); o.v.set('cuts', 0); }, {
      seq: [[8, 1, range(8, 15)], [4, 2, range(4, 7)], [2, 3, [2, 3]], [1, 4, [1]]].map(([n, c, d]) => o => { o.a.dim(d); o.v.set('cards', n); o.v.set('cuts', c, '', 'y'); }), gap: 1100
    }],
    [T('So log base two of sixteen is four. It is the opposite of a power: two to the four is sixteen.', 'Toh log base do of solah, chaar hai. Ye power ka ulta hai: do ki power chaar, solah.'), o => { Big(o.bot, 'log₂(16) = 4 &nbsp;⟺&nbsp; 2⁴ = 16', { size: 40 }); }],
    [T('Why do coders love this? Imagine a dictionary with a million words, sorted. To find a word, open it in the middle. Your word is either before or after, so throw away half.', 'Coders ko ye kyun pasand hai? Das lakh words ki sorted dictionary socho. Word dhoondhna hai toh beech se kholo. Word ya toh pehle hoga ya baad mein, toh aadha phenk do.'), o => { o.bot.innerHTML = ''; Card(o.bot, { icon: '📖', title: 'Searching a sorted dictionary', body: 'Open the middle. Wrong half? Throw it away. Repeat.', c: 's' }); }],
    [T('A million, halved again and again, becomes one in only about twenty steps, because two to the twenty is about a million. Twenty steps instead of a million!', 'Das lakh ko baar-baar aadha karo toh sirf lagbhag bees steps mein ek bachta hai, kyunki do ki power bees lagbhag das lakh hai. Das lakh ki jagah bees steps!'), o => Big(o.bot, 'log₂(1,000,000) ≈ <span class="y">20</span>', { size: 44 })],
    [T('This halving idea is called binary search, and it is a whole section of DSA 150. Whenever something is cut in half at every step, think log n.', 'Is aadha karne wale idea ko binary search kehte hain, aur ye DSA 150 ka poora section hai. Jab bhi har step pe kuch aadha ho, log n socho.')]
  ])
]);

/* ================= 7. BINARY ================= */
CH('7 · Binary', [
  S('Why computers count in binary', B => {
    const [a, b] = col(B, [1, 1.1], { center: true });
    return { a, b };
  }, [
    [T('Computers are made of billions of tiny switches. Each switch is either off or on: zero or one. So computers count with only two digits. That is binary.', 'Computers arabon chhote switches se bane hain. Har switch ya off hai ya on: zero ya ek. Isliye computers sirf do digits se ginte hain. Yahi binary hai.'), o => Pic(o.a, '💡 0 / 1', 80)],
    [T('First, recall how normal numbers work. In three hundred forty-five, the five means five ones, the four means four tens, and the three means three hundreds. Each place is worth ten times the previous one.', 'Pehle yaad karo normal numbers kaise kaam karte hain. Teen sau paintaalees mein paanch matlab paanch ikaiyan, chaar matlab chaar dahaaiyan, aur teen matlab teen saikde. Har jagah pichhli se das guna.'), o => {
      o.a.innerHTML = ''; Tbl(o.a, ['hundreds', 'tens', 'ones'], [['3', '4', '5']], { mono: [0, 1, 2] });
      Txt(o.a, '3×100 + 4×10 + 5×1 = <span class="y">345</span>');
    }],
    [T('Binary works the same way, but each place is worth two times the previous one: ones, twos, fours, eights, sixteens.', 'Binary bhi waise hi kaam karta hai, bas har jagah pichhli se do guna: ek, do, chaar, aath, solah.'), o => { o.bits = Bits(o.b, 5, { sum: true }); }],
    [T('To write thirteen, switch on the lights that add up to thirteen: eight plus four plus one. So thirteen in binary is one one zero one.', 'Terah likhne ke liye wo lights on karo jo milke terah banayein: aath plus chaar plus ek. Toh terah binary mein ek ek zero ek hai.'), o => o.bits.set(13)],
    [T('Watch binary counting from one to eight. Notice that the rightmost switch flips at every single step.', 'Ek se aath tak binary ginti dekho. Dhyaan do, sabse right wala switch har step pe palatta hai.'), null, { seq: range(1, 8).map(k => o => o.bits.set(k)), gap: 750 }],
    [T('Each switch is called a bit. With n bits you can make two to the n different patterns. Five bits give thirty-two patterns: zero to thirty-one.', 'Har switch ko bit kehte hain. n bits se do ki power n alag patterns bante hain. Paanch bits se battees patterns: zero se iktees.'), o => o.bits.set(31)]
  ]),
  S('Decimal to binary', B => {
    const [l, r] = row(B, [1, 1]);
    return { tr: Trace(l, ['n', 'n % 2  (bit)', 'n // 2']), r };
  }, [
    [T('How do we turn thirteen into binary using math? Use our peeling trick again, but with two instead of ten.', 'Terah ko math se binary mein kaise badlein? Wahi peeling trick, bas das ki jagah do.')],
    [T('n modulo two gives the last bit. n double slash two chops it off. Repeat until n is zero.', 'n modulo do aakhri bit deta hai. n double slash do use hata deta hai. n zero hone tak dohraao.'), o => Big(o.r, 'bit = n % 2<br>n = n // 2', { size: 40 })],
    [T('Thirteen modulo two is one, and thirteen halved is six. Six gives zero, and three. Three gives one, and one. One gives one, and zero. Done.', 'Terah modulo do ek, aur terah ka aadha chhe. Chhe se zero, aur teen. Teen se ek, aur ek. Ek se ek, aur zero. Ho gaya.'), null, { seq: [[13, 1, 6], [6, 0, 3], [3, 1, 1], [1, 1, 0]].map(r => o => o.tr.row(r)), gap: 1300 }],
    [T('Now read the bits from bottom to top: one, one, zero, one. Thirteen is one one zero one. The same answer the light switches gave us!', 'Ab bits neeche se upar padho: ek, ek, zero, ek. Terah hai ek ek zero ek. Wahi answer jo light switches ne diya!'), o => { o.r.innerHTML = ''; o.b = Bits(o.r, 4, { sum: true, value: 13 }); }],
    [T('Going back is easy. Add up the place values of the ones: eight plus four plus one is thirteen.', 'Wapas jaana aasaan hai. Jahan ek hai unki place values jodo: aath plus chaar plus ek, terah.'), o => o.b.hl([3, 2, 0])]
  ]),
  S('Bitwise operators', B => {
    const [top, bot] = col(B, [1.6, 1]);
    const [a, b, c] = row(top, [1, 1, 1], { center: true });
    return { A: Bits(a, 4, { value: 12, label: 'a = 12' }), Bb: Bits(b, 4, { value: 10, label: 'b = 10' }), c, bot };
  }, [
    [T('Now some operators that work bit by bit. They power the DSA 150 bit manipulation section, and they feel like magic tricks.', 'Ab kuch operators jo bit-by-bit kaam karte hain. DSA 150 ka bit manipulation section inhi pe chalta hai, aur ye jaadu ki tricks jaise lagte hain.')],
    [T('AND. The result bit is one only if both bits are one, like a door that needs two keys. Twelve AND ten is eight.', 'AND. Result bit tabhi ek jab dono bits ek hon, jaise do chaabi wala darwaza. Baarah AND das, aath.'), o => { o.R = Bits(o.c, 4, { value: 8, label: 'a & b  (AND)' }); o.R.note('= <span class="y">8</span>'); }],
    [T('OR. The result bit is one if at least one of the bits is one. Twelve OR ten is fourteen.', 'OR. Result bit ek agar kam se kam ek bit ek ho. Baarah OR das, chaudah.'), o => { o.c.innerHTML = ''; o.R = Bits(o.c, 4, { value: 14, label: 'a | b  (OR)' }); o.R.note('= <span class="y">14</span>'); }],
    [T('XOR, exclusive or. The result bit is one if the bits are different. Twelve XOR ten is six.', 'XOR, exclusive or. Result bit ek agar dono bits alag hon. Baarah XOR das, chhe.'), o => { o.c.innerHTML = ''; o.R = Bits(o.c, 4, { value: 6, label: 'a ^ b  (XOR)' }); o.R.note('= <span class="y">6</span>'); }],
    [T('XOR has two magic rules. Any number XOR itself is zero. Any number XOR zero is the number itself.', 'XOR ke do jaadui rules. Koi bhi number XOR khud, zero. Koi bhi number XOR zero, wahi number.'), o => { o.bb = Big(o.bot, 'a ^ a = 0 &nbsp;&nbsp; a ^ 0 = a', { size: 40 }); }],
    [T('So if every number in a list appears twice except one, XOR them all together. The pairs cancel out, and the lonely number remains. That is the Single Number problem.', 'Toh agar list mein har number do baar hai sirf ek ke alawa, sab ko XOR kar do. Jodiyan cancel, akela number bach jaata hai. Yahi Single Number problem hai.'), o => o.bb.set('4 ^ <span class="d">1 ^ 2 ^ 1 ^ 2</span> = <span class="y">4</span>')],
    [T('Shifts. Shifting left by one moves every bit one place left, which doubles the number. Shifting right halves it, dropping any remainder.', 'Shifts. Left shift ek se har bit ek jagah left jaata hai, number double. Right shift aadha karta hai, remainder chhod ke.'), o => o.bb.set('5 &lt;&lt; 1 = 10 &nbsp;&nbsp; 5 &gt;&gt; 1 = 2')],
    [T('And n AND one looks only at the last bit. That tells you odd or even: one means odd.', 'Aur n AND ek sirf aakhri bit dekhta hai. Isse odd ya even pata chalta hai: ek matlab odd.'), o => o.bb.set('n &amp; 1 == 1 → odd')]
  ])
]);

/* ================= 8. SUMS ================= */
CH('8 · Sums and patterns', [
  S('Gauss and the sum 1 to n', B => {
    const [l, r] = row(B, [1, 1.1]);
    return { l, r };
  }, [
    [T('A story. Long ago, a teacher told a class of young kids to add every number from one to one hundred, just to keep them busy for an hour.', 'Ek kahani. Bahut pehle ek teacher ne chhote bachchon ko ek se sau tak saare numbers jodne ko kaha, taaki wo ek ghante busy rahein.')],
    [T('A boy named Gauss answered in seconds: five thousand and fifty. How?', 'Gauss naam ke ek bachche ne seconds mein jawab diya: paanch hazaar pachaas. Kaise?'), o => { o.b = Big(o.r, '1 + 2 + 3 + … + 100 = ?', { size: 38 }); }],
    [T('He paired the numbers. One plus a hundred is a hundred and one. Two plus ninety-nine is a hundred and one. Three plus ninety-eight, again a hundred and one.', 'Usne numbers ki jodiyan banayi. Ek plus sau, ek sau ek. Do plus ninyaanve, ek sau ek. Teen plus athaanve, phir ek sau ek.'), o => o.b.set('1+100 = 2+99 = 3+98<br>= … = <span class="y">101</span>')],
    [T('There are fifty such pairs. Fifty times a hundred and one is five thousand and fifty.', 'Aisi pachaas jodiyan hain. Pachaas guna ek sau ek, paanch hazaar pachaas.'), o => Big(o.r, '50 pairs × 101 = <span class="m">5050</span>', { size: 38 })],
    [T('Let us see why with blocks. Here is one plus two plus three, all the way to six, drawn as a staircase.', 'Blocks se samajhte hain kyun. Ye raha ek plus do plus teen, chhe tak, seedhi ki shakal mein.'), o => { o.g = Grid(o.l, 6, 7, { size: 58 }); for (let r = 0; r < 6; r++) for (let c = 0; c <= r; c++) o.g.hl(r, c, 'y'); }],
    [T('Make a copy, flip it upside down, and fit it on top. Together they form a perfect rectangle, six by seven.', 'Iski copy banao, ulta karo, aur upar fit karo. Dono milke ek perfect rectangle bante hain, chhe guna saat.'), o => { for (let r = 0; r < 6; r++) for (let c = r + 1; c < 7; c++) o.g.hl(r, c, 's'); }],
    [T('The rectangle has six times seven, forty-two blocks. Our staircase is exactly half: twenty-one. In general, the sum from one to n is n times n plus one, divided by two.', 'Rectangle mein chhe guna saat, bayaalees blocks. Humari seedhi bilkul aadhi: ikkees. General rule: ek se n tak ka sum, n guna n plus ek, bhaag do.'), o => { o.r.innerHTML = ''; Big(o.r, '1 + 2 + … + n<br>= <span class="y">n × (n + 1) / 2</span>', { size: 42 }); }],
    [T('Remember this. It explains why two nested loops, where the inner loop grows each time, still take about n squared over two steps.', 'Ye yaad rakhna. Isse samajh aata hai ki do nested loops, jisme andar wala loop har baar badhta hai, lagbhag n square bhaag do steps kyun lete hain.')]
  ]),
  S('Doubling sums', B => {
    const [a, b] = col(B, [1, 1], { center: true });
    return { b1: Big(a, '1 + 2 + 4 + 8 = ?', { size: 50 }), b };
  }, [
    [T('Another famous sum. One plus two plus four plus eight is fifteen. Notice fifteen is one less than sixteen, the next power of two.', 'Ek aur famous sum. Ek plus do plus chaar plus aath, pandrah. Dhyaan do, pandrah solah se ek kam hai, jo agli do ki power hai.'), o => o.b1.set('1 + 2 + 4 + 8 = <span class="y">15</span> = 16 − 1')],
    [T('In binary it is obvious. Fifteen is one one one one. Add one more, and it rolls over to one zero zero zero zero, which is sixteen.', 'Binary mein ye saaf dikhta hai. Pandrah hai ek ek ek ek. Ek aur jodo toh ek zero zero zero zero ban jaata hai, yaani solah.'), o => { o.bits = Bits(o.b, 5, { value: 15, sum: true }); }, { seq: [o => o.bits.set(16)], gap: 2600 }],
    [T('So one plus two plus four, all the way up to two to the k, equals two to the k plus one, minus one. Each new term is bigger than all the previous ones combined!', 'Toh ek plus do plus chaar, do ki power k tak, barabar do ki power k plus ek, minus ek. Har naya term pichhle sab ke jod se bada hai!')],
    [T('Flip it around. n, plus n over two, plus n over four, and so on, never reaches two n. Halving sums stay small. That is why some loops that look scary are actually fast.', 'Ulta socho. n, plus n bhaag do, plus n bhaag chaar, aise hi aage, kabhi do n tak nahi pahunchta. Aadha hote sums chhote rehte hain. Isliye kuch darawne dikhne wale loops asal mein fast hote hain.'), o => o.b1.set('n + n/2 + n/4 + … &lt; <span class="y">2n</span>')]
  ]),
  S('Challenge: the missing number', B => {
    const [l, r] = row(B, [1, 1]);
    return { a: Arr(l, [3, 0, 1, 4], { w: 90, label: 'nums  (0 to 4, one missing)' }), l, th: Think(r, ['Understand: 0..n, exactly one missing', 'Brute force: search for each number', 'Pattern: we already know the full sum!', 'Answer = expected − actual']) };
  }, [
    [T('A real DSA 150 problem. You get the numbers from zero to n, with exactly one missing. Here it is zero to four. Find the missing one.', 'Ek asli DSA 150 problem. Zero se n tak ke numbers diye hain, exactly ek gayab hai. Yahan zero se chaar. Gayab wala dhoondo.'), o => o.th.on(0)],
    [T('Pause and think. What could you do?', 'Ruko aur socho. Kya kar sakte ho?'), null, { think: 8 }],
    [T('The simple way: for each number from zero to four, search the whole list. It works, but it is slow: n searches, each taking n steps.', 'Simple tareeka: zero se chaar tak har number ke liye poori list mein dhoondo. Chalega, lekin slow: n baar dhoondhna, har baar n steps.'), o => o.th.on(1)],
    [T('Smarter: we already know what the total should be! The sum from zero to four is four times five over two, which is ten.', 'Smart tareeka: humein pata hai total kitna hona chahiye! Zero se chaar ka sum, chaar guna paanch bhaag do, das.'), o => { o.th.on(2); o.b = Big(o.l, 'expected = 4×5/2 = <span class="y">10</span>', { size: 34 }); }],
    [T('The actual sum of the list is three plus zero plus one plus four, which is eight.', 'List ka asli sum teen plus zero plus ek plus chaar, aath.'), o => Big(o.l, 'actual = 3+0+1+4 = <span class="s">8</span>', { size: 34 })],
    [T('The difference is the missing number. Ten minus eight is two. One pass, no searching. Math just turned a slow solution into a fast one.', 'Farak hi gayab number hai. Das minus aath, do. Ek pass, koi dhoondhna nahi. Math ne slow solution ko fast bana diya.'), o => { o.th.on(3); Big(o.l, 'missing = 10 − 8 = <span class="m">2</span>', { size: 34 }); }]
  ])
]);

/* ================= 9. COUNTING ================= */
CH('9 · Counting', [
  S('The multiplication rule', B => {
    const [l, r] = row(B, [1, 1], { center: true });
    return { g: Grid(l, 3, 2, { size: 100, labels: true, rowLab: ['red', 'blue', 'green'], colLab: ['jeans', 'shorts'] }), r };
  }, [
    [T('Counting sounds easy. But smart counting is how you know, before running anything, whether your code will be fast or slow.', 'Ginti aasaan lagti hai. Lekin smart ginti se hi pata chalta hai, kuch chalaaye bina, ki tumhara code fast hoga ya slow.')],
    [T('You have three shirts and two pants. How many outfits? For each shirt, you have two choices of pants.', 'Tumhare paas teen shirts aur do pants hain. Kitne outfits? Har shirt ke liye pants ki do choices.')],
    [T('Red with jeans, red with shorts. Blue with jeans, blue with shorts. Green with jeans, green with shorts. Six outfits.', 'Laal jeans ke saath, laal shorts ke saath. Neeli jeans ke saath, neeli shorts ke saath. Hari jeans ke saath, hari shorts ke saath. Chhe outfits.'), null, { seq: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]].map(([r, c]) => o => o.g.set(r, c, '✓', 'y')), gap: 700 }],
    [T('Three times two is six. When choices are independent, you multiply. That is the multiplication rule.', 'Teen guna do, chhe. Jab choices ek doosre se independent hon, guna karo. Yahi multiplication rule hai.'), o => Big(o.r, '3 × 2 = <span class="y">6</span>', { size: 60 })],
    [T('This is exactly how nested loops behave. An outer loop over three shirts, with an inner loop over two pants, runs three times two, six times.', 'Nested loops bilkul aise hi chalte hain. Teen shirts ka outer loop, andar do pants ka loop, teen guna do, chhe baar chalta hai.'), o => Code(o.r, "for shirt in shirts:\n    for pant in pants:\n        print(f'{shirt} + {pant}')", { size: 21 })]
  ]),
  S('Handshakes and pairs', B => {
    const [l, r] = row(B, [1, 1], { center: true });
    const L = ['A', 'B', 'C', 'D', 'E'];
    return { g: Grid(l, 5, 5, { size: 76, labels: true, rowLab: L, colLab: L }), r };
  }, [
    [T('Five friends meet, and everyone shakes hands with everyone else, once. How many handshakes?', 'Paanch dost milte hain, aur har koi har doosre se ek baar haath milata hai. Kitne handshakes?'), null, { think: 6 }],
    [T('Draw a table with everyone on both sides. The diagonal would be someone shaking their own hand. Skip that.', 'Dono taraf sabke naam wali table banao. Diagonal matlab koi khud se haath mila raha hai. Use chhodo.'), o => { for (let i = 0; i < 5; i++) o.g.set(i, i, '✗', 'c'); }],
    [T('A with B is the same handshake as B with A. So we only count the top half, where the row comes before the column.', 'A ka B se haath milana aur B ka A se, ek hi handshake hai. Toh sirf upar wala aadha gino, jahan row column se pehle aati hai.'), null, { seq: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]].map(([r, c]) => o => o.g.set(r, c, '✓', 'y')), gap: 330 }],
    [T('That is four plus three plus two plus one, which is ten. In general, n times n minus one, divided by two.', 'Chaar plus teen plus do plus ek, das. General rule: n guna n minus ek, bhaag do.'), o => Big(o.r, 'pairs = n(n − 1) / 2<br>= 5×4/2 = <span class="y">10</span>', { size: 38 })],
    [T('In code this is a famous pattern: for each i, loop j starting from i plus one. It visits every pair exactly once. For a thousand items, that is about half a million pairs. That is why checking all pairs is slow.', 'Code mein ye famous pattern hai: har i ke liye j ko i plus ek se chalao. Har pair exactly ek baar aata hai. Hazaar items ke liye lagbhag paanch lakh pairs. Isliye saare pairs check karna slow hai.'), o => { o.r.innerHTML = ''; Code(o.r, "for i in range(n):\n    for j in range(i + 1, n):\n        # pair (i, j)\n        pass", { size: 21 }); }]
  ]),
  S('Arrangements: factorial', B => {
    const [l, r] = row(B, [1, 1.1]);
    return { b: Bul(l, ['📕 📗 📘', '📕 📘 📗', '📗 📕 📘', '📗 📘 📕', '📘 📕 📗', '📘 📗 📕']), r };
  }, [
    [T('In how many different orders can you arrange three books on a shelf?', 'Teen kitabon ko shelf pe kitne alag orders mein laga sakte ho?')],
    [T('For the first spot you have three choices. For the second spot, two books remain. For the last spot, just one. Three times two times one is six.', 'Pehli jagah ke liye teen choices. Doosri ke liye do kitabein bachi. Aakhri ke liye bas ek. Teen guna do guna ek, chhe.'), o => { Big(o.r, '3 × 2 × 1 = <span class="y">6</span>', { size: 48 }); }, { seq: range(0, 5).map(i => o => o.b.show(i)), gap: 500 }],
    [T('This is called factorial, written with an exclamation mark. Three factorial is six.', 'Ise factorial kehte hain, exclamation mark se likhte hain. Teen factorial chhe hai.'), o => Big(o.r, '3! = 6', { size: 48 })],
    [T('Factorial explodes. Five factorial is one hundred and twenty. Ten factorial is over three point six million. Twenty factorial is more than two quintillion.', 'Factorial phat jaata hai. Paanch factorial ek sau bees. Das factorial chhattis lakh se zyada. Bees factorial do quintillion se zyada.'), o => { o.r.innerHTML = ''; o.t = Tbl(o.r, ['n', 'n!'], [[3, '6'], [5, '120'], [10, '3,628,800'], [20, '2,432,902,008,176,640,000']], { hidden: true, mono: [0, 1] }); }, { seq: range(0, 3).map(i => o => o.t.show(i)), gap: 900 }],
    [T('So a solution that tries every possible ordering only works for tiny inputs. You will meet this in the Permutations problem.', 'Toh jo solution har possible order try kare, wo sirf bahut chhote inputs pe chalega. Ye Permutations problem mein milega.')]
  ]),
  S('Subsets: in or out', B => {
    const [l, r] = row(B, [1, 1.1], { center: true });
    return { g: Grid(l, 8, 3, { size: 50, labels: true, colLab: ['🧀', '🫒', '🌽'], rowLab: range(0, 7).map(String) }), r };
  }, [
    [T('Last counting idea. How many different plates can you make from three toppings: cheese, olives and corn? An empty plate counts too.', 'Counting ka aakhri idea. Teen toppings se kitni alag plates bana sakte ho: cheese, olives aur corn? Khaali plate bhi ginti mein.'), null, { think: 6 }],
    [T('For each topping you make one decision: in, or out. Two choices, three times. Two times two times two is eight.', 'Har topping ke liye ek faisla: daalo ya nahi. Do choices, teen baar. Do guna do guna do, aath.'), o => Big(o.r, '2 × 2 × 2 = 2³ = <span class="y">8</span>', { size: 44 })],
    [T('Here they are. Nothing. Corn. Olives. Olives and corn. Cheese. Cheese and corn. Cheese and olives. And everything.', 'Ye rahi saari. Kuch nahi. Corn. Olives. Olives aur corn. Cheese. Cheese aur corn. Cheese aur olives. Aur sab kuch.'), null, { seq: range(0, 7).map(k => o => { for (let b = 0; b < 3; b++) { const on = (k >> (2 - b)) & 1; o.g.set(k, b, on ? '1' : '0', on ? 'y' : null); } }), gap: 600 }],
    [T('Look closely. Each row is just a binary number from zero to seven! One means in, zero means out.', 'Dhyaan se dekho. Har row bas zero se saat tak ka binary number hai! Ek matlab daala, zero matlab nahi.')],
    [T('So n items have two to the n subsets. Twenty items already give over a million. This is the Subsets and Backtracking section of DSA 150.', 'Toh n items ke do ki power n subsets hote hain. Bees items se hi das lakh se zyada. Yahi DSA 150 ka Subsets aur Backtracking section hai.'), o => Big(o.r, 'n items → <span class="y">2ⁿ</span> subsets', { size: 40 })]
  ])
]);

/* ================= 10. FLOOR, CEIL, RANGES ================= */
CH('10 · Rounding and ranges', [
  S('Floor and ceiling', B => {
    const [top, bot] = col(B, [1, 1]);
    return { nl: NumLine(top, 0, 5, { step: 1 }), bot };
  }, [
    [T('Sometimes a division gives a decimal, but you need a whole number. You can round down, or round up.', 'Kabhi division decimal deta hai, lekin chahiye poora number. Neeche round kar sakte ho, ya upar.')],
    [T('Floor means round down, like the floor below your feet. The floor of three point seven is three.', 'Floor matlab neeche round, jaise pairon ke neeche farsh. Teen point saat ka floor teen.'), o => { o.nl.mark(3.7, '3.7', 's'); o.nl.hop(3.7, 3, 'floor → 3', 's', 40); }],
    [T('Ceiling means round up, like the ceiling above your head. The ceiling of three point two is four.', 'Ceiling matlab upar round, jaise sar ke upar chhat. Teen point do ki ceiling chaar.'), o => { o.nl.clear(); o.nl.mark(3.2, '3.2', 'y'); o.nl.hop(3.2, 4, 'ceil → 4', 'y', 40); }],
    [T('In Python, double slash rounds down. Seven double slash two is three.', 'Python mein double slash neeche round karta hai. Saat double slash do, teen.'), o => Big(o.bot, '7 // 2 = 3', { size: 44 })],
    [T('Real problem. Fifty students, and each bus holds twelve. How many buses? Fifty divided by twelve is four point one seven. Four buses would leave two students behind! You need the ceiling: five buses.', 'Asli problem. Pachaas students, har bus mein baarah. Kitni buses? Pachaas bhaag baarah, chaar point ek saat. Chaar buses se do students chhoot jayenge! Ceiling chahiye: paanch buses.'), o => { o.bot.innerHTML = ''; Card(o.bot, { icon: '🚌', title: '50 students, 12 per bus', body: '50 / 12 = 4.17 → round <b class="y">up</b> → 5 buses', c: 'y' }); }],
    [T('A neat trick for ceiling with whole numbers: a plus b minus one, then double slash b. Fifty plus eleven is sixty-one, divided by twelve, is five. The Koko Eating Bananas problem uses exactly this.', 'Poore numbers ke saath ceiling ki trick: a plus b minus ek, phir double slash b. Pachaas plus gyarah, iksath, bhaag baarah, paanch. Koko Eating Bananas problem bilkul yahi use karti hai.'), o => Big(o.bot, 'ceil(a / b) = (a + b − 1) // b', { size: 36 })]
  ]),
  S('Ranges and off-by-one', B => {
    const [top, bot] = col(B, [1, 1]);
    return { nl: NumLine(top, 0, 10), bot };
  }, [
    [T('Ranges are everywhere in code. From three to seven, including both ends, how many numbers? Many people say four. It is five: three, four, five, six, seven.', 'Ranges code mein har jagah hain. Teen se saat tak, dono shaamil, kitne numbers? Kai log chaar bolte hain. Paanch hain: teen, chaar, paanch, chhe, saat.'), o => { o.nl.span(3, 7, '', 'm'); [3, 4, 5, 6, 7].forEach(v => o.nl.mark(v, '', 'm')); }],
    [T('The count of numbers from a to b, inclusive, is b minus a plus one. Forgetting that plus one is the most common bug in coding. It even has a name: the off-by-one error.', 'a se b tak, dono shaamil, numbers ki ginti hai b minus a plus ek. Wo plus ek bhoolna coding ka sabse common bug hai. Iska naam bhi hai: off-by-one error.'), o => Big(o.bot, 'count = b − a <span class="y">+ 1</span>', { size: 44 })],
    [T('Think of a fence. A ten metre fence with a post every metre needs eleven posts, not ten. Posts are the numbers. Gaps are the differences.', 'Ek baad socho. Das metre ki baad jisme har metre pe khamba, gyarah khambe chahiye, das nahi. Khambe numbers hain. Beech ki jagah farak hai.'), o => { o.bot.innerHTML = ''; Card(o.bot, { icon: '🪵', title: 'Fence posts', body: '10 gaps need 11 posts. |—|—|—| has 3 gaps and 4 posts.', c: 's' }); }],
    [T('Coders often use half-open ranges: the start is included, the end is not. Zero up to five, not including five: zero, one, two, three, four. Exactly five numbers, and the count is simply end minus start.', 'Coders aksar half-open ranges use karte hain: start shaamil, end nahi. Zero se paanch tak, paanch ko chhod ke: zero, ek, do, teen, chaar. Exactly paanch numbers, aur ginti bas end minus start.'), o => { o.nl.clear(); [0, 1, 2, 3, 4].forEach(v => o.nl.mark(v, '', 'y')); o.nl.mark(5, 'excluded', 'c'); o.bot.innerHTML = ''; Big(o.bot, '[0, 5) → 0,1,2,3,4 → count = 5 − 0', { size: 36 }); }],
    [T('That is exactly why a list of length n has positions zero to n minus one.', 'Isiliye n length ki list ki positions zero se n minus ek tak hoti hain.')]
  ]),
  S('Overlapping intervals', B => {
    const [top, bot] = col(B, [1.3, 1]);
    return { nl: NumLine(top, 0, 12, { h: 260 }), bot };
  }, [
    [T('Two meetings. Meeting A runs from one to five. Meeting B runs from four to eight. Do they clash?', 'Do meetings. Meeting A ek se paanch tak. Meeting B chaar se aath tak. Kya takraati hain?'), o => { o.nl.span(1, 5, 'A: 1–5', 's', 0); o.nl.span(4, 8, 'B: 4–8', 'y', 56); }, { think: 4 }],
    [T('Yes, they overlap between four and five. The rule: two intervals overlap if each one starts before the other one ends.', 'Haan, chaar aur paanch ke beech overlap hai. Rule: do intervals overlap karte hain agar dono ek doosre ke khatam hone se pehle shuru hon.'), o => Big(o.bot, 'overlap if <span class="s">a.start &lt; b.end</span> and <span class="y">b.start &lt; a.end</span>', { size: 30 })],
    [T('Meeting C runs from nine to eleven. It starts after B ends at eight, so there is no clash.', 'Meeting C nau se gyarah tak. Ye B ke aath pe khatam hone ke baad shuru hoti hai, toh koi takraav nahi.'), o => o.nl.span(9, 11, 'C: 9–11', 'm', 0)],
    [T('When two intervals overlap, you can merge them. Start at the smaller start, end at the larger end. One to five and four to eight become one to eight. That is the Merge Intervals problem.', 'Do intervals overlap karein toh unhe merge kar sakte ho. Chhote start se shuru, bade end pe khatam. Ek se paanch aur chaar se aath, ek se aath ban jaate hain. Yahi Merge Intervals problem hai.'), o => o.nl.span(1, 8, 'merged: 1–8', 'v', 112)]
  ]),
  S('Min, max and infinity', B => {
    const [top, bot] = col(B, [1, 1]);
    return { a: Arr(top, [150, 172, 165, 181, 158], { w: 110, label: 'heights (cm)' }), v: Vars(bot) };
  }, [
    [T('Finding the biggest or the smallest is a pattern you will use in almost every problem. Imagine finding the tallest student in a line.', 'Sabse bada ya sabse chhota dhoondhna, ye pattern tum lagbhag har problem mein use karoge. Socho line mein sabse lamba student dhoondhna hai.')],
    [T('You walk down the line holding a note that says: tallest so far. You start with the first student, one hundred and fifty.', 'Line mein chalte ho, haath mein parchi: ab tak sabse lamba. Pehle student se shuru, ek sau pachaas.'), o => { o.a.ptr('i', 0, 's'); o.a.hl(0, 'y'); o.v.set('tallest', 150, 'so far', 'y'); }],
    [T('One seventy-two is taller, so update the note. One sixty-five is not taller, skip. One eighty-one is taller, update. One fifty-eight, skip.', 'Ek sau bahattar lamba hai, parchi update. Ek sau painsath nahi, chhodo. Ek sau ikyaasi lamba, update. Ek sau athaavan, chhodo.'), null, {
      seq: [[1, 172], [2, null], [3, 181], [4, null]].map(([i, v]) => o => { o.a.ptr('i', i, 's'); if (v) { o.a.clear(); o.a.hl(i, 'y'); o.v.set('tallest', v, 'so far', 'y'); } else o.a.hl(i, 'c'); }), gap: 1400
    }],
    [T('At the end, the note says one eighty-one. One walk down the line, one comparison per person.', 'End mein parchi pe ek sau ikyaasi. Line mein ek chakkar, har insaan ke liye ek comparison.'), o => { o.a.clear(); o.a.hl(3, 'm'); o.a.noPtr('i'); }],
    [T('What should the note say before you have seen anyone? A common trick is to start max at negative infinity, so anyone beats it, and min at positive infinity. Or simply start with the first element.', 'Kisi ko dekhne se pehle parchi pe kya likhein? Common trick: max ko minus infinity se shuru karo taaki koi bhi usse jeet jaaye, aur min ko plus infinity se. Ya seedha pehla element le lo.'), o => Big(o.bot, 'max starts at −∞ &nbsp; min starts at +∞', { size: 32 })]
  ])
]);

/* ================= 11. GRIDS ================= */
CH('11 · Grids', [
  S('Rows, columns and neighbours', B => {
    const [l, r] = row(B, [1, 1.05]);
    return { g: Grid(l, 4, 5, { size: 80, labels: true }), r };
  }, [
    [T('Many problems give you a grid: a map of land and water, a chessboard, a maze. Every cell has an address: its row and its column.', 'Kai problems grid deti hain: zameen aur paani ka map, chessboard, bhool-bhulaiya. Har cell ka ek address hai: uski row aur column.')],
    [T('Think of cinema seats. Row first, then seat number. Rows are counted from the top, starting at zero, and columns from the left, starting at zero.', 'Cinema seats socho. Pehle row, phir seat number. Rows upar se zero se ginte hain, columns left se zero se.'), o => o.g.set(0, 0, '0,0', 'y')],
    [T('This cell is row one, column three. We write it as one comma three.', 'Ye cell row ek, column teen hai. Likhte hain ek comma teen.'), o => { o.g.clear(); o.g.set(1, 3, '1,3', 'y'); }],
    [T('Its four neighbours. Up is row minus one. Down is row plus one. Left is column minus one. Right is column plus one.', 'Iske chaar padosi. Upar matlab row minus ek. Neeche row plus ek. Left column minus ek. Right column plus ek.'), null, { seq: [[0, 3, '↑'], [2, 3, '↓'], [1, 2, '←'], [1, 4, '→']].map(([r, c, t]) => o => o.g.set(r, c, t, 's')), gap: 600 }],
    [T('Careful at the edges! A cell in row zero has no up neighbour. Before visiting a neighbour, always check that the row and column are inside the grid.', 'Kinaron pe dhyaan! Row zero wale cell ka upar koi padosi nahi. Padosi pe jaane se pehle hamesha check karo ki row aur column grid ke andar hain.'), o => { o.g.clear(); o.g.set(0, 1, '0,1', 'y'); o.g.set(1, 1, '↓', 's'); o.g.set(0, 0, '←', 's'); o.g.set(0, 2, '→', 's'); Big(o.r, '0 ≤ r &lt; rows<br>0 ≤ c &lt; cols', { size: 38 }); }],
    [T('A handy trick: store the four moves in a list, and loop over it. You will use this in every island and maze problem.', 'Kaam ki trick: chaaron moves ek list mein rakho, aur uspe loop chalao. Har island aur maze problem mein ye use karoge.'), o => { o.r.innerHTML = ''; Code(o.r, "dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]\nfor dr, dc in dirs:\n    nr, nc = r + dr, c + dc\n    if 0 <= nr < rows and 0 <= nc < cols:\n        # visit (nr, nc)\n        pass", { size: 19 }); }]
  ])
]);

/* ================= 12. LOGIC ================= */
CH('12 · Logic', [
  S('True, false, AND, OR, NOT', B => {
    const [l, r] = row(B, [1.1, 1]);
    return { t: Tbl(l, ['A', 'B', 'A and B', 'A or B'], [['True', 'True', 'True', 'True'], ['True', 'False', 'False', 'True'], ['False', 'True', 'False', 'True'], ['False', 'False', 'False', 'False']], { hidden: true, mono: [0, 1, 2, 3] }), r };
  }, [
    [T('Every decision in code comes down to true or false. These values are called booleans, named after the mathematician George Boole.', 'Code ka har faisla aakhir mein true ya false pe aata hai. In values ko booleans kehte hain, mathematician George Boole ke naam pe.')],
    [T('AND is true only when both sides are true. To see a movie, you need a ticket AND you must be old enough. Missing either one, no entry.', 'AND tabhi true jab dono taraf true. Movie dekhne ke liye ticket chahiye AND umar bhi poori honi chahiye. Ek bhi kam, entry nahi.'), o => Card(o.r, { icon: '🎟️', title: 'AND  (and)', body: 'ticket and old_enough', c: 'y' })],
    [T('OR is true when at least one side is true. You can pay by cash OR card. Either one works.', 'OR true jab kam se kam ek taraf true. Cash OR card se pay kar sakte ho. Koi bhi ek chalega.'), o => Card(o.r, { icon: '💳', title: 'OR  (or)', body: 'has_cash or has_card', c: 's' })],
    [T('Here is the full truth table. AND needs both. OR needs at least one.', 'Ye rahi poori truth table. AND ko dono chahiye. OR ko kam se kam ek.'), null, { seq: range(0, 3).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 800 }],
    [T('NOT flips a value. NOT true is false. Not raining means dry.', 'NOT value palat deta hai. NOT true matlab false. Baarish nahi matlab sookha.'), o => { o.r.innerHTML = ''; Big(o.r, '(not True) == False', { size: 44 }); }],
    [T('One more law, De Morgan’s law. NOT of, A and B, equals NOT A, or NOT B. Not having both keys means at least one key is missing. You will use it to flip conditions in loops.', 'Ek aur niyam, De Morgan ka law. NOT of, A aur B, barabar NOT A, ya NOT B. Dono chaabiyan na hona matlab kam se kam ek chaabi gayab. Loops mein conditions palatne ke kaam aayega.'), o => Big(o.r, 'not (A and B)<br>== (not A) or (not B)', { size: 40 })]
  ])
]);

/* ================= 13. BIG O ================= */
CH('13 · Big O', [
  S('Why measure speed?', B => {
    const [a, b] = col(B, [0.5, 2]);
    const cells = row(b, [1, 1]);
    return { a, c1: cells[0], c2: cells[1] };
  }, [
    [T('Two solutions can both give the right answer, but one finishes in a blink and the other takes hours. Big O is how we compare them.', 'Do solutions dono sahi answer de sakte hain, lekin ek palak jhapakte khatam ho aur doosra ghanton le. Big O se hum unhe compare karte hain.')],
    [T('We do not measure seconds, because computers differ. We count steps, and ask: as the input grows, how fast do the steps grow?', 'Hum seconds nahi naapte, kyunki computers alag-alag hote hain. Hum steps ginte hain, aur poochte hain: input badhne pe steps kitni tezi se badhte hain?'), o => Txt(o.a, 'Big O = <span class="y">how steps grow</span> as input size <span class="s">n</span> grows', 'lg')],
    [T('Imagine finding your friend in a stadium of n people.', 'Socho n logon ke stadium mein apna dost dhoondhna hai.')],
    [T('O of one, constant time. Your friend shares their live location. One look, no matter how big the stadium.', 'O of one, constant time. Dost ne live location share ki hai. Ek nazar, stadium kitna bhi bada ho.'), o => Card(o.c1, { icon: '📍', title: 'O(1)  constant', body: 'One step, whatever n is.', c: 'm' })],
    [T('O of log n. People sit sorted by name, and you halve the search at every step. A million people, twenty steps.', 'O of log n. Log naam se sorted baithe hain, aur har step pe tum search aadhi kar dete ho. Das lakh log, bees steps.'), o => Card(o.c1, { icon: '🔎', title: 'O(log n)  logarithmic', body: 'Halve the search each step.', c: 's' })],
    [T('O of n, linear. You check every seat, one by one. Double the people, double the time.', 'O of n, linear. Har seat ek-ek karke check karo. Log double, time double.'), o => Card(o.c2, { icon: '🚶', title: 'O(n)  linear', body: 'Look at everyone once.', c: 'y' })],
    [T('O of n squared, quadratic. Everyone compares themselves with everyone else. Double the people, four times the time.', 'O of n square, quadratic. Har koi har kisi se apne aap ko compare karta hai. Log double, time chaar guna.'), o => Card(o.c2, { icon: '🤝', title: 'O(n²)  quadratic', body: 'Every pair gets checked.', c: 'c' })]
  ]),
  S('The growth race', B => {
    const [l, r] = row(B, [1.6, 1]);
    return { ch: Chart(l, { xmax: 20, ymax: 100, skip0: true }), r };
  }, [
    [T('Let us race them. Left to right is the input size. Bottom to top is the number of steps.', 'Chalo inki race karate hain. Left se right input size hai. Neeche se upar steps ki ginti.')],
    [T('O of one is flat. It never grows.', 'O of one seedha flat hai. Kabhi nahi badhta.'), o => o.ch.plot(() => 1, 'O(1)', 'm')],
    [T('O of log n barely rises.', 'O of log n mushkil se upar uthta hai.'), o => o.ch.plot(x => Math.log2(x), 'O(log n)', 's')],
    [T('O of n is a straight line.', 'O of n ek seedhi line hai.'), o => o.ch.plot(x => x, 'O(n)', 'y')],
    [T('O of n log n is a little steeper. This is what good sorting costs.', 'O of n log n thoda aur tircha. Acchi sorting ki yahi cost hai.'), o => o.ch.plot(x => x * Math.log2(x), 'O(n log n)', 'v')],
    [T('O of n squared shoots up.', 'O of n square tezi se upar jaata hai.'), o => o.ch.plot(x => x * x, 'O(n²)', 'c')],
    [T('And O of two to the n is a rocket. It leaves the chart almost immediately.', 'Aur O of do ki power n ek rocket hai. Chart se lagbhag turant bahar.'), o => o.ch.plot(x => 2 ** x, 'O(2ⁿ)', 'c')],
    [T('The lesson: the shape matters more than anything. For big inputs, an O of n solution beats an O of n squared one, no matter how fast your computer is.', 'Seekh ye hai: shape sabse zyada matter karta hai. Bade inputs pe O of n solution, O of n square wale ko hara deta hai, computer kitna bhi fast ho.'), o => Txt(o.r, 'Shape beats hardware. For large n, the better curve always wins.', 'sm')]
  ]),
  S('Reading Big O from code', B => {
    const [l, r] = row(B, [1.2, 1]);
    return { l, r };
  }, [
    [T('Now, how do you read Big O from code? Count how many times the busiest line runs.', 'Ab code se Big O kaise padhein? Gino ki sabse busy line kitni baar chalti hai.')],
    [T('No loop, just one step: O of one.', 'Koi loop nahi, bas ek step: O of one.'), o => { o.l.innerHTML = ''; Code(o.l, 'first = nums[0]'); o.b = Big(o.r, 'O(1)', { size: 64 }); }],
    [T('One loop from zero to n: the body runs n times. O of n.', 'Zero se n tak ek loop: body n baar chalti hai. O of n.'), o => { o.l.innerHTML = ''; Code(o.l, 'for i in range(n):\n    print(i)'); o.b.set('O(n)'); }],
    [T('A loop inside a loop, each going to n: n times n. O of n squared.', 'Loop ke andar loop, dono n tak: n guna n. O of n square.'), o => { o.l.innerHTML = ''; Code(o.l, 'for i in range(n):\n    for j in range(n):\n        print(i + j)'); o.b.set('O(n²)'); }],
    [T('A loop that halves n each time runs only log n times. O of log n.', 'Jo loop har baar n ko aadha kare, sirf log n baar chalta hai. O of log n.'), o => { o.l.innerHTML = ''; Code(o.l, 'while n > 1:\n    n = n // 2'); o.b.set('O(log n)'); }],
    [T('Two rules. Drop constants, and keep only the biggest term. Three n plus five is just O of n. n squared plus n is O of n squared.', 'Do rules. Constants hatao, aur sirf sabse bada term rakho. Teen n plus paanch bas O of n hai. n square plus n, O of n square.'), o => { o.r.innerHTML = ''; Bul(o.r, ['3n + 5 → <span class="y">O(n)</span>', 'n² + n → <span class="y">O(n²)</span>', '2 loops one after another → O(n)'], { shown: true, sm: true }); }],
    [T('Big O also measures memory. That is called space complexity. Making a new list of size n costs O of n space. Using just a few variables costs O of one space.', 'Big O memory bhi naapta hai. Ise space complexity kehte hain. n size ki nayi list banana O of n space. Sirf kuch variables, O of one space.')]
  ]),
  S('Pick your speed from n', B => {
    const [l, r] = row(B, [1.3, 1]);
    return { t: Tbl(l, ['if n is up to…', 'you can afford'], [['10', 'O(n!)'], ['20', 'O(2ⁿ)'], ['1,000', 'O(n²)'], ['100,000', 'O(n log n) or O(n)'], ['1,000,000,000', 'O(log n) or O(1)']], { hidden: true, mono: [0, 1] }), r };
  }, [
    [T('A pro secret. A computer does roughly a hundred million simple steps per second. Every problem tells you how big n can be. So you can guess the speed you need before writing any code.', 'Pro secret. Computer lagbhag das crore simple steps per second karta hai. Har problem batati hai n kitna bada ho sakta hai. Toh code likhne se pehle hi andaza laga sakte ho ki kitni speed chahiye.')],
    [T('Here is the cheat sheet.', 'Ye rahi cheat sheet.'), null, { seq: range(0, 4).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 1100 }],
    [T('If n can be a hundred thousand, then n squared is ten billion steps. Far too slow. So you know you need O of n, or O of n log n, and you go looking for a smarter idea.', 'Agar n ek lakh ho sakta hai, toh n square das arab steps hai. Bahut slow. Toh pata chal gaya ki O of n ya O of n log n chahiye, aur tum smart idea dhoondhne jaate ho.'), o => { o.t.hl(3); Card(o.r, { icon: '💡', title: 'Read the constraints first', body: 'They tell you which kind of solution the problem expects.', c: 'y' }); }]
  ])
]);

/* ================= 14. LIMITS ================= */
CH('14 · Limits', [
  S('Overflow: the odometer', B => {
    const [a, b] = col(B, [1, 1]);
    return { a, b };
  }, [
    [T('Last idea. Numbers in a computer have a limit, because each one is stored in a fixed number of bits. Like a car odometer with six digits: after nine nine nine nine nine nine, it rolls over to all zeros.', 'Aakhri idea. Computer mein numbers ki ek limit hoti hai, kyunki har number fixed bits mein store hota hai. Jaise chhe digit wala gaadi ka odometer: nau lakh ninyaanve hazaar nau sau ninyaanve ke baad sab zero ho jaata hai.'), o => { Card(o.a, { icon: '🚗', title: 'Odometer', body: '999999 → <b class="c">000000</b>', c: 'c' }); }],
    [T('Most languages store an int in sixty-four bits. The biggest such int is about nine point two quintillion: a nine followed by eighteen digits.', 'Zyaadatar languages int ko chausath bits mein rakhti hain. Sabse bada aisa int lagbhag nau point do quintillion: nau ke baad athaarah digits.'), o => Big(o.b, '2⁶³ − 1 =<br>9,223,372,036,854,775,807', { size: 36 })],
    [T('Go past it, and it wraps around to a huge negative number. That is called overflow. Python is special: its ints grow as big as needed and never overflow. But interviewers use other languages too, so know the idea.', 'Usse aage gaye toh ek bahut bada negative number ban jaata hai. Ise overflow kehte hain. Python khaas hai: iske int zaroorat ke hisaab se bade hote jaate hain aur kabhi overflow nahi karte. Lekin interviewers doosri languages bhi use karte hain, toh idea jaan lo.')],
    [T('In Java or C plus plus, an int is only thirty-two bits, about two point one billion. That is why many solutions write mid as low plus, high minus low, divided by two. It avoids adding two huge numbers.', 'Java ya C plus plus mein int sirf battees bits ka hai, lagbhag do point ek arab. Isliye kai solutions mid ko likhte hain low plus, high minus low, bhaag do. Isse do bahut bade numbers jodne se bachte hain.'), o => { o.b.innerHTML = ''; Big(o.b, 'mid = low + (high − low) // 2', { size: 38 }); }],
    [T('In Python you are safe, but it is a good habit, and interviewers love to see it.', 'Python mein tum safe ho, lekin ye acchi aadat hai, aur interviewers ko dekh ke accha lagta hai.')]
  ])
]);

/* ================= 15. RECAP ================= */
CH('15 · Recap', [
  S('Your math cheat sheet', B => {
    const [l, r] = row(B, [1, 1]);
    return {
      a: Bul(l, ['<span class="y">%</span> remainder: even/odd, last digit, wrap-around', '<span class="y">//</span> quotient: chop the last digit, midpoints', 'Factors pair up → check up to <span class="y">√n</span>', 'gcd(a, b) = gcd(b, a % b)', '2¹⁰ ≈ 10³, log₂(10⁶) ≈ 20'], { sm: true }),
      b: Bul(r, ['1 + … + n = <span class="y">n(n+1)/2</span>', 'pairs = <span class="y">n(n−1)/2</span>, orders = n!, subsets = 2ⁿ', 'count of [a, b] = <span class="y">b − a + 1</span>', 'neighbours: (r±1, c), (r, c±1), stay in bounds', 'Big O: count how the busiest line grows'], { sm: true })
    };
  }, [
    [T('That was a lot, and you did it! Here is everything on one screen. Screenshot it.', 'Kaafi kuch tha, aur tumne kar liya! Ye raha sab kuch ek screen pe. Screenshot le lo.'), null, { seq: range(0, 4).map(i => o => o.a.show(i)), gap: 700 }],
    [T('Sums, counting, ranges, grids and Big O.', 'Sums, counting, ranges, grids aur Big O.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 700 }],
    [T('You do not need to memorise all of it today. You will see every one of these ideas again, inside real programs, in the Python course and the Logic Gym.', 'Aaj sab yaad karne ki zaroorat nahi. Ye har idea tum dobara asli programs ke andar dekhoge, Python course aur Logic Gym mein.')]
  ]),
  S('Practice before Python', B => {
    const [l, r] = row(B, [1.2, 1]);
    return {
      b: Bul(l, ['Last digit and digit count of 90817', 'Sum of the digits of 4729', 'Is 97 prime?', 'gcd(84, 36) using Euclid', '25 in binary', 'Sum of 1 to 1000', 'Handshakes among 8 people', 'Buses for 100 students, 30 per bus'], { num: true, sm: true, shown: true }),
      r
    };
  }, [
    [T('Your homework. Eight quick problems. Do them on paper, not in code. Pause the video now, and come back when you are done.', 'Tumhara homework. Aath chhote problems. Paper pe karo, code mein nahi. Abhi video roko, aur ho jaaye toh wapas aao.'), null, { think: 30 }],
    [T('Answers. Last digit seven, five digits. Digit sum twenty-two. Ninety-seven is prime. GCD twelve. Twenty-five is one one zero zero one. Five hundred thousand five hundred. Twenty-eight handshakes. Four buses.', 'Answers. Aakhri digit saat, paanch digits. Digit sum baais. Sattaanve prime hai. GCD baarah. Pachchees hai ek ek zero zero ek. Paanch lakh paanch sau. Atthais handshakes. Chaar buses.'), o => {
      Tbl(o.r, ['#', 'answer'], [[1, '7 and 5 digits'], [2, '22'], [3, 'prime (no divisor ≤ 9)'], [4, '12'], [5, '11001'], [6, '500500'], [7, '28'], [8, '4 (ceil of 3.33)']], { mono: [0, 1] });
    }],
    [T('If you got most of these, you are ready. If not, rewatch the level you missed. There is no rush. Understanding beats speed.', 'Agar zyaadatar sahi aaye, toh tum ready ho. Nahi toh jo level chhoota use dobara dekho. Koi jaldi nahi. Samajhna speed se zyada zaroori hai.')]
  ]),
  S('Next: Python', B => ({ t: Title(B, 'Next up', 'Python from zero', 'Variables, loops, strings, lists, dictionaries, functions, recursion and the DSA toolkit.') }), [
    [T('Next we open the editor and learn Python from zero: variables, loops, strings, lists, dictionaries, functions and more, each with its own short video.', 'Ab hum editor kholenge aur Python bilkul shuru se seekhenge: variables, loops, strings, lists, dictionaries, functions aur bahut kuch, har ek ka apna chhota video.')],
    [T('And for every problem, we will slow down and practise the thinking, step by step. See you there!', 'Aur har problem pe hum dheere chalenge aur sochne ki practice step by step karenge. Wahan milte hain!')]
  ])
]);

E.register('math', { id: 'math-v1', chapters, startLabel: 'Start: The Math Behind Logic', outro: 'Next: the Python course. Do the practice problems first.' });
})();
