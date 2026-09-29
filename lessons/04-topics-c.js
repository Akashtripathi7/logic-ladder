(function () {
  const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Arr, Tbl, Vars, KV, Grid, Out, Trace, NumLine, Bits, Think } = E;
const { S, fresh, range, intro, Graph, Tree } = LH;

/* ======================= 1-D DP ======================= */
E.register('dp-1d', {
  id: 't-dp-1d', startLabel: 'Watch: 1-D Dynamic Programming explained',
  outro: 'Start with Climbing Stairs. Write the recurrence in words first.',
  notes: {
    intro: { en: 'Dynamic programming = recursion + remembering answers. Define what dp[i] means, find how dp[i] is built from smaller answers, set the base cases, and fill the table in order. Most 1-D problems only need the last one or two values.', hi: "Dynamic programming = recursion + jawab yaad rakhna. Tay karo dp[i] ka matlab kya, dp[i] chhote jawabon se kaise banta hai, base cases set karo, aur table order mein bharo. Zyada tar 1-D problems ko sirf pichhli ek ya do values chahiye." },
    signals: { en: ['"How many ways…"', '"Minimum cost / maximum profit…" with a choice at each step', 'A recursive solution that repeats the same calls', 'Take-or-skip decisions along a sequence (House Robber)', 'Can a string / amount be built from pieces (Word Break, Coin Change)'], hi: ["\"Kitne tareeke…\"", "\"Minimum cost / maximum profit…\" har step pe choice ke saath", "Recursive solution jo same calls dohraata hai", "Sequence mein lo-ya-chhodo faisle (House Robber)", "Kya string / amount tukdon se ban sakta hai (Word Break, Coin Change)"] },
    templateTitle: 'The DP recipe',
    template: `# 1. STATE: what does dp[i] mean?  (e.g. ways to reach step i)
# 2. TRANSITION: how is dp[i] built from smaller i?
# 3. BASE CASES: the smallest answers you know directly
# 4. ORDER: fill from small i to big i
# 5. ANSWER: which cell is the final answer?

def climb_stairs(n):
    dp = [0] * (n + 1)
    dp[0] = 1                          # base
    if n >= 1:
        dp[1] = 1                      # base
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]  # transition
    return dp[n]                       # answer`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 13 of 18', '1-D Dynamic Programming', 'Solve each small problem once. Remember it. Build up.', [
        [T('Topic thirteen: dynamic programming. The name sounds scary. The idea is simple: never solve the same small problem twice. Write the answer down, and reuse it.', 'Topic terah: dynamic programming. Naam darawna lagta hai. Idea simple hai: ek hi chhota problem do baar kabhi solve mat karo. Jawab likh lo, aur dobara use karo.')],
        [T('If someone asks you what one plus one plus one plus one is, you count: four. If they add another plus one, you don\'t recount. You say five. You remembered.', 'Koi poochhe ek plus ek plus ek plus ek kitna, tum ginoge: chaar. Wo ek aur plus ek jode, tum dobara nahi ginte. Seedha bolte ho paanch. Tumhe yaad tha.')]
      ]),
      S('Recursion repeats itself', B => {
        const [l, r] = row(B, [1.5, 1]);
        return { t: Tree(l, ['f5', 'f4', 'f3', 'f3', 'f2', 'f2', 'f1', 'f2', 'f1', 'f1', 'f0', 'f1', 'f0'], { w: 700, h: 380, r: 24 }), r };
      }, [
        [T('Here is the recursion tree for fib of five. Look closely.', 'Ye fib of five ka recursion tree hai. Dhyaan se dekho.')],
        [T('fib of three is computed twice. fib of two, three times. For fib of fifty, the tree has over a trillion calls.', 'fib of three do baar calculate hota hai. fib of two teen baar. fib of fifty ke liye tree mein ek trillion se zyada calls hoti hain.'), o => { o.t.hl(['2', '3'], 'c'); o.t.hl(['4', '5', '7'], 'y'); }],
        [T('The fix: store each answer the first time you compute it. Then the tree collapses to one call per number. O of two to the n becomes O of n.', 'Ilaaj: har jawab pehli baar nikalte hi store kar lo. Phir tree har number ke liye ek call mein simat jaata hai. O of two to the n ban jaata hai O of n.'), o => Card(o.r, { icon: '📝', title: 'Memoization', body: 'Before computing, check the notebook. After computing, write it down.', c: 'm' })]
      ]),
      S('Climbing stairs: think about the last step', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, ['1', '1', '', '', '', ''], { w: 84, label: 'ways[i] = ways to stand on step i' }), bot };
      }, [
        [T('Climbing Stairs: one or two steps at a time. How many ways are there to reach step n? The DP question is always: what was the LAST move?', 'Climbing Stairs: ek baar mein ek ya do seedhi. Seedhi n tak kitne tareeke? DP ka sawaal hamesha yahi: AAKHRI move kya tha?'), o => Big(o.bot, 'ways[i] = ways[i − 1] + ways[i − 2]', { size: 38 })],
        [T('To stand on step i, you came from step i minus one with a single step, or from step i minus two with a double step. Add the two counts.', 'Seedhi i par khade hone ke liye, ya toh i minus ek se ek kadam aaye, ya i minus do se do kadam. Dono ginti jod do.')],
        [T('Base cases: one way to be at step zero (do nothing), and one way to reach step one. Then fill: two, three, five, eight.', 'Base cases: seedhi zero par hone ka ek tareeka (kuch mat karo), aur seedhi ek tak ek tareeka. Phir bharo: do, teen, paanch, aath.'), null, { seq: [2, 3, 4, 5].map(i => o => { const v = [1, 1, 2, 3, 5, 8][i]; o.a.set(i, String(v)); o.a.clear(); o.a.hl([i - 1, i - 2], 's'); o.a.hl(i, 'y'); }), gap: 1000 }],
        [T('Each value only needs the previous two, so you can keep just two variables. O of n time, O of one space.', 'Har value ko sirf pichhli do chahiye, toh bas do variables rakho. O of n time, O of one space.')]
      ])
    ]},
    { t: '2 · The recipe', scenes: [
      S('The 5-step DP recipe', B => ({ th: Think(B, ['STATE: what does dp[i] mean, in words?', 'TRANSITION: how do I build dp[i] from smaller answers?', 'BASE CASES: which answers do I know directly?', 'ORDER: which direction do I fill?', 'ANSWER: which cell holds the final answer?'], { title: 'Dynamic programming recipe' }) }), [
        [T('Every DP problem is solved with these five questions. Write the answers in plain English before you code.', 'Har DP problem in paanch sawaalon se solve hota hai. Code se pehle simple shabdon mein jawab likho.')],
        [T('State. Say what dp of i means in one sentence, like "the most money I can rob from the first i houses".', 'State. Ek line mein bolo dp of i ka matlab kya hai, jaise pehle i gharon se main zyada se zyada kitna paisa loot sakta hoon.'), o => o.th.on(0)],
        [T('Transition. Look at the last decision. For House Robber: rob house i, or skip it.', 'Transition. Aakhri decision dekho. House Robber mein: ghar i lootna, ya chhodna.'), o => o.th.on(1)],
        [T('Base cases, the order of filling, and where the answer is. Get the state right, and the rest usually follows.', 'Base cases, bharne ka order, aur jawab kahan hai. State sahi baitha, toh baaki aam taur par apne aap aata hai.'), o => o.th.on(2), { seq: [o => o.th.on(3), o => o.th.on(4)], gap: 1400 }]
      ]),
      S('House Robber: take or skip', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, [2, 7, 9, 3, 1], { w: 84, label: 'money in each house' }), best: Arr(bot, ['', '', '', '', ''], { w: 84, label: 'best[i] = max(best[i−1], money[i] + best[i−2])' }) };
      }, [
        [T('House Robber: you cannot rob two neighbours. At house i you choose: skip it and keep best of i minus one, or rob it and add best of i minus two.', 'House Robber: do padosi ghar nahi loot sakte. Ghar i par choose karo: chhodo aur i minus ek ka best rakho, ya looto aur i minus do ke best mein jodo.')],
        [T('Two. Then seven beats two. Then nine plus two, eleven, beats seven. Three plus seven is ten, which loses to eleven. One plus eleven is twelve.', 'Do. Phir saat do ko harata hai. Phir nau plus do, gyaarah, saat ko harata hai. Teen plus saat das, gyaarah se haar jaata hai. Ek plus gyaarah, barah.'), null, { seq: [2, 7, 11, 11, 12].map((v, i) => o => { o.best.set(i, String(v)); o.best.clear(); o.best.hl(i, 'y'); o.a.clear(); o.a.hl(i, 's'); }), gap: 1100 }],
        [T('Twelve: houses one, three and five. Notice that greedy tricks like "take every other house" fail on inputs like two, one, one, two. DP considers both choices every time.', 'Barah: ghar ek, teen aur paanch. Dhyaan do, greedy trick jaise har doosra ghar lo, do, ek, ek, do jaise input par fail hoti hai. DP har baar dono choices dekhta hai.')]
      ]),
      S('Coin Change: build up the amounts', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, ['0', '∞', '∞', '∞', '∞', '∞', '∞'], { w: 76, label: 'fewest coins for each amount 0…6  (coins 1, 3, 4)' }), bot };
      }, [
        [T('Coin Change: the fewest coins to make an amount. The greedy "biggest coin first" fails. For six with coins one, three and four, greedy picks four, one, one: three coins. But three plus three is two coins.', 'Coin Change: amount banane ke liye sabse kam coins. Greedy ka sabse bada coin pehle fail hota hai. Coins ek, teen, chaar se chhe banao, greedy chaar, ek, ek leta hai: teen coins. Par teen plus teen sirf do coins.')],
        [T('DP: dp of x is one plus the best of dp of x minus each coin.', 'DP: dp of x equals ek plus har coin ke liye dp of x minus coin ka best.'), o => Big(o.bot, 'dp[x] = 1 + min(dp[x − c])', { size: 38 })],
        [T('One: one. Two: two. Three: one. Four: one. Five: two. Six: two, from three plus three.', 'Ek: ek. Do: do. Teen: ek. Chaar: ek. Paanch: do. Chhe: do, teen plus teen se.'), null, { seq: [[1, 1], [2, 2], [3, 1], [4, 1], [5, 2], [6, 2]].map(([x, v]) => o => { o.a.set(x, String(v)); o.a.clear(); o.a.hl(x, 'y'); }), gap: 900 }],
        [T('Checklist: counting ways, min or max with choices, and "can it be built?" questions mean DP. Start from the recursive idea, then store the answers.', 'Checklist: tareeke ginna, choices ke saath min ya max, aur kya ye ban sakta hai wale sawaal matlab DP. Recursive idea se shuru karo, phir jawab store karo.')]
      ])
    ]}
  ]
});

/* ======================= 2-D DP ======================= */
E.register('dp-2d', {
  id: 't-dp-2d', startLabel: 'Watch: 2-D Dynamic Programming explained',
  outro: 'Start with Unique Paths, then Longest Common Subsequence.',
  notes: {
    intro: { en: 'When the state needs two numbers, like a row and a column, or a position in each of two strings, the table becomes a grid. Each cell is built from its neighbours: above, left, or diagonal.', hi: "Jab state ko do numbers chahiye, jaise row aur column, ya do strings mein ek-ek position, toh table grid ban jaati hai. Har cell padosiyon se banta hai: upar, left, ya diagonal." },
    signals: { en: ['Paths in a grid (right/down moves)', 'Two strings compared together (LCS, edit distance, interleaving)', 'Knapsack: items × capacity', 'State machines over days (buy / sell / cooldown)', 'Intervals l..r (Burst Balloons)'], hi: ["Grid mein raaste (right/down moves)", "Do strings saath compare (LCS, edit distance, interleaving)", "Knapsack: items × capacity", "Dinon pe state machine (buy / sell / cooldown)", "Intervals l..r (Burst Balloons)"] },
    templateTitle: 'Two-strings table',
    template: `# dp[i][j] = answer for the first i chars of a and the first j chars of b
n, m = len(a), len(b)
dp = [[0] * (m + 1) for _ in range(n + 1)]
for i in range(1, n + 1):
    for j in range(1, m + 1):
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1           # use both chars
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])  # drop one char
answer = dp[n][m]`
  },
  chapters: [
    { t: '1 · Grids', scenes: [
      intro('Topic 14 of 18', '2-D Dynamic Programming', 'When one number is not enough to describe the state.', [
        [T('Topic fourteen: two-dimensional DP. Same recipe, but the state needs two numbers, so the table becomes a grid.', 'Topic chaudah: two-dimensional DP. Wahi recipe, par state ko do numbers chahiye, toh table ek grid ban jaati hai.')],
        [T('Every cell is built from cells you have already filled: usually the one above, the one to the left, or the diagonal.', 'Har cell pehle se bhare cells se banta hai: aam taur par upar wala, left wala, ya diagonal.')]
      ]),
      S('Unique paths', B => {
        const [l, r] = row(B, [1.2, 1]);
        return { g: Grid(l, 3, 5, { size: 76 }), r };
      }, [
        [T('A robot moves only right or down. How many paths lead to each cell? You can only enter a cell from above or from the left.', 'Robot sirf right ya down chalta hai. Har cell tak kitne raaste? Cell mein sirf upar se ya left se aa sakte ho.'), o => Big(o.r, 'paths[r][c] =<br>above + left', { size: 38 })],
        [T('The first row and first column have exactly one path each.', 'Pehli row aur pehle column mein har cell ka theek ek raasta hai.'), null, { seq: [o => { for (let c = 0; c < 5; c++) o.g.set(0, c, '1', 's'); }, o => { for (let r = 1; r < 3; r++) o.g.set(r, 0, '1', 's'); }], gap: 900 }],
        [T('Every other cell adds the cell above and the cell to its left. Two, three, four, five. Then three, six, ten, fifteen.', 'Baaki har cell upar wale aur left wale ko jodta hai. Do, teen, chaar, paanch. Phir teen, chhe, das, pandrah.'), null, { seq: [[1, 1, 2], [1, 2, 3], [1, 3, 4], [1, 4, 5], [2, 1, 3], [2, 2, 6], [2, 3, 10], [2, 4, 15]].map(([r, c, v]) => o => o.g.set(r, c, String(v), 'y')), gap: 550 }],
        [T('Fifteen paths. Fill row by row, and each cell is O of one. You only ever need the previous row, so the space can shrink to one row.', 'Pandrah raaste. Row by row bharo, har cell O of one. Tumhe hamesha sirf pichhli row chahiye, toh space ek row tak ghat sakta hai.')]
      ])
    ]},
    { t: '2 · Two strings', scenes: [
      S('Longest common subsequence', B => {
        const [l, r] = row(B, [1.3, 1]);
        return { g: Grid(l, 4, 6, { size: 62, labels: true, rowLab: ['""', 'a', 'c', 'e'], colLab: ['""', 'a', 'b', 'c', 'd', 'e'] }), r };
      }, [
        [T('Two strings, abcde and ace. What is the longest sequence of characters that appears in both, in order? The table has one row per prefix of one string, and one column per prefix of the other.', 'Do strings, abcde aur ace. Dono mein order se aane wala sabse lamba characters ka sequence kya hai? Table mein ek string ke har prefix ki ek row, aur doosri ke har prefix ka ek column.')],
        [T('The empty-prefix row and column are zero.', 'Khaali prefix wali row aur column zero hain.'), o => { for (let c = 0; c < 6; c++) o.g.set(0, c, '0', 's'); for (let r = 1; r < 4; r++) o.g.set(r, 0, '0', 's'); }],
        [T('If the characters match, take the diagonal plus one. If not, take the bigger of the cell above and the cell to the left.', 'Characters match karein toh diagonal plus ek lo. Nahi toh upar wale aur left wale mein jo bada ho.'), o => Code(o.r, 'if a[i-1] == b[j-1]:\n    dp[i][j] = dp[i-1][j-1] + 1\nelse:\n    dp[i][j] = max(dp[i-1][j],\n                   dp[i][j-1])', { size: 18 })],
        [T('Row a: a matches a, so one, then it carries across. Row c: c matches c, diagonal one plus one is two. Row e: e matches e, three.', 'Row a: a, a se match, toh ek, phir wo aage chalta hai. Row c: c, c se match, diagonal ek plus ek, do. Row e: e, e se match, teen.'), null, { seq: [[1, [1, 1, 1, 1, 1]], [2, [1, 1, 2, 2, 2]], [3, [1, 1, 2, 2, 3]]].map(([r, vals]) => o => vals.forEach((v, k) => o.g.set(r, k + 1, String(v), (r === 1 && k === 0) || (r === 2 && k === 2) || (r === 3 && k === 4) ? 'y' : null))), gap: 1300 }],
        [T('The answer, three, is in the bottom-right corner. Edit Distance, Distinct Subsequences and Interleaving String all fill this same kind of table with a different rule.', 'Jawab, teen, neeche right kone mein hai. Edit Distance, Distinct Subsequences aur Interleaving String sab yahi table alag rule se bharte hain.')]
      ]),
      S('Choosing the state', B => ({ b: Bul(B, ['Grid paths → <span class="y">dp[row][col]</span>', 'Two strings → <span class="y">dp[i][j] over the prefixes</span>', 'Items and a capacity → <span class="y">dp[item][amount]</span> (often 1-D)', 'Days with modes → <span class="y">a few variables per day</span> (hold, sold, rest)', 'Ranges → <span class="y">dp[l][r]</span>, filled from short to long'], { num: true }) }), [
        [T('The hardest part of 2-D DP is choosing the state. Here are the common shapes.', '2-D DP ka sabse mushkil hissa state chunna hai. Ye rahe common shapes.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Always write down in words what one cell means. If you can\'t say it clearly, the code won\'t be clear either.', 'Hamesha shabdon mein likho ki ek cell ka matlab kya hai. Agar saaf bol nahi sakte, toh code bhi saaf nahi hoga.')]
      ])
    ]}
  ]
});

/* ======================= GREEDY ======================= */
E.register('greedy', {
  id: 't-greedy', startLabel: 'Watch: Greedy explained',
  outro: 'Start with Maximum Subarray (Kadane).',
  notes: {
    intro: { en: 'A greedy algorithm makes the best-looking local choice at every step and never reconsiders. It is fast and simple, but only correct when you can argue that the local choice never hurts. When in doubt, test it on small tricky examples.', hi: "Greedy algorithm har step pe sabse achhi dikhne wali local choice leta hai aur kabhi dobara nahi sochta. Tez aur simple hai, par tabhi sahi jab tum saabit kar sako ki local choice kabhi nuksaan nahi karti. Shak ho toh chhote tricky examples pe test karo." },
    signals: { en: ['"Maximum subarray" → <b>Kadane</b> (drop a negative running sum)', '"Can I reach the end?" → <b>track the farthest reach</b>', 'Scheduling / intervals → <b>sort by end time</b>', 'Circular route with a balance → <b>reset the start on failure</b>', 'Form groups from the smallest item upward'], hi: ["\"Maximum subarray\" → <b>Kadane</b> (negative running sum chhodo)", "\"Kya end tak pahunch sakta hoon?\" → <b>sabse door ki pahunch track karo</b>", "Scheduling / intervals → <b>end time se sort</b>", "Balance wala circular route → <b>fail hone pe start reset</b>", "Sabse chhote item se upar group banao"] },
    templateTitle: 'Kadane and farthest reach',
    template: `# Kadane: best sum of a contiguous subarray
cur = best = a[0]
for x in a[1:]:
    cur = max(x, cur + x)     # extend, or start fresh
    best = max(best, cur)

# Jump Game: can I reach the last index?
reach = 0
for i, x in enumerate(a):
    if i > reach:
        return False
    reach = max(reach, i + x)
return True`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 15 of 18', 'Greedy', 'Take the best choice now, and never look back.', [
        [T('Topic fifteen: greedy. At every step, take the choice that looks best right now, and never undo it.', 'Topic pandrah: greedy. Har step par wo choice lo jo abhi sabse achhi lage, aur kabhi undo mat karo.')],
        [T('Sometimes that is perfect. Sometimes it is a trap. The skill is knowing which one you are facing.', 'Kabhi ye perfect hai. Kabhi ye jaal hai. Skill ye pehchaanna hai ki saamne kaunsa hai.')]
      ]),
      S('When greedy fails', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Make six with coins one, three and four, using the fewest coins. Greedy grabs the biggest coin first: four, then one, then one. Three coins.', 'Coins ek, teen, chaar se chhe banao, sabse kam coins mein. Greedy sabse bada coin pehle uthata hai: chaar, phir ek, phir ek. Teen coins.'), o => Big(o.l, '6 = <span class="c">4 + 1 + 1</span>', { size: 44 })],
        [T('But three plus three is only two coins. Greedy failed here. That is why Coin Change is a DP problem.', 'Par teen plus teen sirf do coins. Greedy yahan fail hua. Isiliye Coin Change DP problem hai.'), o => Big(o.l, '6 = <span class="m">3 + 3</span>', { size: 44 })],
        [T('Before trusting greedy, try to break it with small examples. If you cannot, and you can explain why the local choice is always safe, greedy is probably right.', 'Greedy par bharosa karne se pehle, chhote examples se use todne ki koshish karo. Na toot sake, aur tum samjha sako ki local choice hamesha safe kyun hai, toh greedy shayad sahi hai.'), o => Card(o.r, { icon: '🧪', title: 'Test before trusting', body: 'Try 3–4 tiny tricky inputs by hand. One counterexample is enough to reject greedy.', c: 'y' })]
      ]),
      S("Kadane's algorithm", B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, [-2, 1, -3, 4, -1, 2, 1, -5, 4], { w: 70, label: 'max sum of a contiguous subarray' }), v: Vars(bot) };
      }, [
        [T('Maximum Subarray. Walk left to right, carrying a running sum. The greedy rule: if the running sum is negative, drop it. It can only drag down whatever comes next.', 'Maximum Subarray. Left se right chalo, running sum saath lekar. Greedy rule: running sum negative ho jaaye toh chhod do. Wo aage aane wale ko sirf neeche kheenchega.')],
        [T('Minus two. Then one is better than minus two plus one, so restart at one. Minus three: running minus two. Four: restart at four. Then three, five, six. Minus five: one. Four: five.', 'Minus do. Phir ek, minus do plus ek se behtar hai, toh ek se restart. Minus teen: running minus do. Chaar: chaar se restart. Phir teen, paanch, chhe. Minus paanch: ek. Chaar: paanch.'), null, { seq: [-2, 1, -2, 4, 3, 5, 6, 1, 5].map((cur, i) => o => { o.a.ptr('i', i, 'y'); o.v.set('cur', cur); o.best = Math.max(o.best == null ? -99 : o.best, cur); o.v.set('best', o.best, '', o.best === cur ? 'y' : undefined); }), gap: 700 }],
        [T('The best is six, from four, minus one, two, one. One pass, O of n. That rule, cur equals max of x and cur plus x, is Kadane\'s algorithm.', 'Best hai chhe, chaar, minus ek, do, ek se. Ek pass, O of n. Ye rule, cur equals max of x aur cur plus x, Kadane ka algorithm hai.'), o => { o.a.hl([3, 4, 5, 6], 'm'); o.a.noPtr('i'); }]
      ]),
      S('Farthest reach', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, [2, 3, 1, 1, 4], { w: 84, label: 'max jump from each index' }), v: Vars(bot) };
      }, [
        [T('Jump Game: can you reach the last index? Don\'t explore every path. Just track the farthest index you can reach so far.', 'Jump Game: kya aakhri index tak pahunch sakte ho? Har raasta explore mat karo. Bas ab tak ka sabse door pahunchne wala index track karo.')],
        [T('From zero, reach two. From one, reach four, the end! Every index up to reach is reachable, so keep extending it.', 'Zero se, do tak pahuncho. Ek se, chaar tak, end! reach tak ka har index pahunch mein hai, toh use badhate raho.'), null, { seq: [[0, 2], [1, 4]].map(([i, r]) => o => { o.a.ptr('i', i, 'y'); o.v.set('reach', r, '', 'y'); o.a.hl(r > 4 ? 4 : r, 'm'); }), gap: 1300 }],
        [T('If i ever passes reach, you are stuck. The same "farthest so far" idea counts the jumps in Jump Game II.', 'Agar kabhi i, reach se aage nikal gaya, tum atak gaye. Yahi ab tak sabse door wala idea Jump Game II mein jumps ginta hai.')]
      ]),
      S('How to recognise it', B => ({ b: Bul(B, ['Max contiguous sum → <span class="y">Kadane</span>', 'Reachability with ranges → <span class="y">farthest reach</span>', 'Keep the most intervals → <span class="y">sort by end, take the earliest</span>', 'Circular balance → <span class="y">reset the start when negative</span>', 'Doubt? → <span class="y">find a counterexample, or switch to DP</span>'], { num: true }) }), [
        [T('Your checklist for greedy.', 'Greedy ki checklist.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Greedy solutions are short, but the thinking is subtle. For each problem, say out loud why the greedy choice is safe.', 'Greedy solutions chhote hote hain, par sochna baareek hai. Har problem ke liye zor se bolo ki greedy choice safe kyun hai.')]
      ])
    ]}
  ]
});

/* ======================= INTERVALS ======================= */
E.register('intervals', {
  id: 't-intervals', startLabel: 'Watch: Intervals explained',
  outro: 'Start with Merge Intervals, then Insert Interval.',
  notes: {
    intro: { en: 'Intervals are ranges like meetings [start, end]. Nearly every problem starts by sorting: by start to merge, or by end to keep as many as possible. Then one sweep compares each interval with the last one kept.', hi: "Intervals meetings jaisi ranges hain [start, end]. Lagbhag har problem sort se shuru hota hai: merge ke liye start se, zyada se zyada rakhne ke liye end se. Phir ek sweep har interval ko aakhri rakhe gaye se compare karta hai." },
    signals: { en: ['Merge overlapping ranges → <b>sort by start, extend the last</b>', 'Remove the fewest to avoid overlaps → <b>sort by end, keep the earliest ending</b>', 'How many at the same time (rooms) → <b>sweep sorted starts and ends</b>', 'Two intervals [a, b] and [c, d] overlap when <b>a &lt; d and c &lt; b</b>'], hi: ["Overlapping ranges merge → <b>start se sort, aakhri ko badhao</b>", "Overlap se bachne ke liye kam se kam hatao → <b>end se sort, jaldi khatam hone wala rakho</b>", "Ek saath kitne (rooms) → <b>sorted starts aur ends pe sweep</b>", "Do intervals [a, b] aur [c, d] overlap karte hain jab <b>a &lt; d aur c &lt; b</b>"] },
    templateTitle: 'Merge template',
    template: `res = []
for s, e in sorted(intervals):            # by start
    if res and s <= res[-1][1]:
        res[-1][1] = max(res[-1][1], e)   # overlap -> extend
    else:
        res.append([s, e])                # gap -> new interval`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 16 of 18', 'Intervals', 'Meetings on a timeline: sort them, then sweep.', [
        [T('Topic sixteen: intervals. Think of meetings in a calendar, each one with a start and an end.', 'Topic solah: intervals. Calendar mein meetings socho, har ek ka start aur end.')],
        [T('The universal first step: sort. Once intervals are in order, any overlapping ones sit next to each other.', 'Hamesha pehla step: sort. Intervals order mein aa gaye toh overlap karne wale ek doosre ke paas baithte hain.')]
      ]),
      S('When do two intervals overlap?', B => {
        const [top, bot] = col(B, [1.2, 1]);
        return { nl: NumLine(top, 0, 12, { h: 250 }), bot };
      }, [
        [T('Meeting A runs from one to five, and B from four to eight. They overlap.', 'Meeting A ek se paanch, aur B chaar se aath. Ye overlap karti hain.'), o => { o.nl.span(1, 5, 'A', 's', 0); o.nl.span(4, 8, 'B', 'y', 56); }],
        [T('The rule: each one starts before the other ends. A starts before B ends, and B starts before A ends.', 'Rule: har ek doosri ke khatam hone se pehle shuru hoti hai. A, B ke end se pehle shuru, aur B, A ke end se pehle shuru.'), o => Big(o.bot, 'a.start &lt; b.end  and  b.start &lt; a.end', { size: 32 })],
        [T('C from nine to eleven starts after B ends, so there is no overlap.', 'C nau se gyaarah, B ke end ke baad shuru hoti hai, toh overlap nahi.'), o => o.nl.span(9, 11, 'C', 'm', 0)]
      ]),
      S('Merging: sort by start, extend the last', B => {
        const [top, bot] = col(B, [1.2, 1]);
        return { nl: NumLine(top, 0, 19, { h: 250 }), o: Out(bot, { title: 'merged', h: 110 }) };
      }, [
        [T('Merge one to three, two to six, eight to ten, and fifteen to eighteen. They are already sorted by start.', 'Merge karo ek se teen, do se chhe, aath se das, aur pandrah se atharah. Ye start se pehle hi sorted hain.'), o => { o.nl.span(1, 3, '', 's', 0); o.nl.span(2, 6, '', 's', 40); o.nl.span(8, 10, '', 's', 0); o.nl.span(15, 18, '', 's', 0); }],
        [T('Two to six starts before three, so it overlaps: extend the last merged interval to six. Eight starts after six: begin a new one. Same for fifteen.', 'Do se chhe teen se pehle shuru hota hai, toh overlap: aakhri merged interval chhe tak badhao. Aath chhe ke baad shuru: naya shuru karo. Pandrah ke liye bhi same.'), null, { seq: [o => { o.nl.span(1, 6, '1–6', 'y', 80); o.o.p('[1, 6]'); }, o => { o.nl.span(8, 10, '8–10', 'y', 80); o.o.p('[8, 10]'); }, o => { o.nl.span(15, 18, '15–18', 'y', 80); o.o.p('[15, 18]'); }], gap: 1300 }],
        [T('Always extend with max. If one to ten swallows two to three, the end must stay ten.', 'Hamesha max se badhao. Agar ek se das, do se teen ko nigal leta hai, toh end das hi rehna chahiye.')]
      ])
    ]},
    { t: '2 · Variations', scenes: [
      S('Sort by end, and sweep lines', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Non-overlapping Intervals asks for the fewest removals. Flip it around: keep as many as possible. The greedy choice: always keep the meeting that ENDS earliest. It leaves the most room for the others. So sort by end.', 'Non-overlapping Intervals sabse kam removals poochta hai. Ulta socho: jitne zyada rakh sako. Greedy choice: hamesha wo meeting rakho jo SABSE PEHLE khatam hoti hai. Wo baaki ke liye sabse zyada jagah chhodti hai. Toh end se sort karo.'), o => Card(o.l, { icon: '⏰', title: 'Sort by END', body: 'An early finish never blocks more than a late finish would.', c: 'y' })],
        [T('Meeting Rooms II asks how many rooms are needed. Sort all the starts and all the ends separately, then sweep. A start before the earliest remaining end needs a new room. Otherwise a room was freed.', 'Meeting Rooms II poochta hai kitne rooms chahiye. Saare starts aur saare ends alag sort karo, phir sweep. Bache hue sabse pehle end se pehle start aaye toh naya room. Nahi toh ek room khaali hua.'), o => Card(o.r, { icon: '🚪', title: 'Sweep line', body: 'Rooms needed = the most meetings running at the same moment.', c: 's' })],
        [T('Checklist: merging means sort by start. Keeping the most means sort by end. Counting simultaneous intervals means a sweep over the starts and ends.', 'Checklist: merge matlab start se sort. Sabse zyada rakhna matlab end se sort. Ek saath chal rahe intervals ginna matlab starts aur ends par sweep.'), o => Bul(o.r, ['merge → sort by start', 'keep the most → sort by end', 'max simultaneous → sweep line'], { shown: true, sm: true })]
      ])
    ]}
  ]
});

/* ======================= MATH & GEOMETRY ======================= */
E.register('math-geometry', {
  id: 't-math-geometry', startLabel: 'Watch: Math & Geometry explained',
  outro: 'Start with Rotate Image.',
  notes: {
    intro: { en: 'These problems reuse ideas from Video 1: index arithmetic on grids, digit-by-digit arithmetic with carries, fast exponentiation, and cycle detection. The trick is usually to break one scary transformation into two simple ones.', hi: "Ye problems Math video ke ideas dobara use karte hain: grids pe index arithmetic, carry ke saath digit-by-digit hisaab, fast power, aur cycle detection. Trick aam taur par ek darawne badlaav ko do simple badlaavon mein todna hai." },
    signals: { en: ['Rotate a matrix → <b>transpose + reverse each row</b>', 'Spiral or layer order → <b>four shrinking boundaries</b>', 'Numbers as digit lists → <b>simulate the carry</b>', 'Huge powers → <b>square and halve the exponent</b>', 'A sequence that may loop → <b>cycle detection</b>'], hi: ["Matrix ghumao → <b>transpose + har row ulti</b>", "Spiral ya layer order → <b>chaar simatti deewarein</b>", "Numbers digit lists ki tarah → <b>carry simulate karo</b>", "Bahut badi powers → <b>square karo aur exponent aadha</b>", "Sequence jo loop ho sakta hai → <b>cycle detection</b>"] },
    templateTitle: 'Rotate and spiral',
    template: `# Rotate 90 degrees clockwise in place
n = len(m)
for r in range(n):
    for c in range(r + 1, n):
        m[r][c], m[c][r] = m[c][r], m[r][c]   # transpose
for row in m:
    row.reverse()                             # reverse rows

# Spiral: shrink four walls
top, bottom, left, right = 0, rows - 1, 0, cols - 1
while top <= bottom and left <= right:
    ...  # right along top, down the right side,
         # left along the bottom, up the left side`
  },
  chapters: [
    { t: '1 · Matrices', scenes: [
      intro('Topic 17 of 18', 'Math & Geometry', 'Break a scary transformation into two simple ones.', [
        [T('Topic seventeen: maths and geometry. These problems look tricky, but they use tools you already know from video one.', 'Topic satrah: maths aur geometry. Ye problems tricky dikhte hain, par wahi tools use karte hain jo tum math video se jaante ho.')],
        [T('The main trick of this section: when a transformation looks hard, split it into two easy ones.', 'Is section ki main trick: jab koi badlaav mushkil lage, use do aasaan badlaavon mein tod do.')]
      ]),
      S('Rotate = transpose + reverse', B => {
        const [a, b, c] = row(B, [1, 1, 1], { center: true });
        const vals = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
        return { a, b, c, vals };
      }, [
        [T('Rotate a matrix ninety degrees clockwise, in place. Moving each number directly means four-way swaps. There is an easier way.', 'Matrix ko nabbe degree clockwise ghumao, wahi par. Har number seedha hilane mein chaar-taraf swaps. Aasaan tareeka hai.'), o => { o.g1 = Grid(o.a, 3, 3, { size: 70, fill: (r, c) => String(o.vals[r][c]) }); Txt(o.a, 'start', 'sm dim'); }],
        [T('Step one: transpose. Swap across the diagonal, so rows become columns.', 'Step ek: transpose. Diagonal ke aar-paar swap karo, toh rows columns ban jaati hain.'), o => { o.g2 = Grid(o.b, 3, 3, { size: 70, fill: (r, c) => String(o.vals[c][r]) }); o.g2.all((x, r, c) => { if (r === c) x.className = 'gc c-s'; }); Txt(o.b, 'transpose', 'sm dim'); }],
        [T('Step two: reverse each row. Done: seven, four, one on top. Two simple steps you already knew.', 'Step do: har row ulti karo. Ho gaya: upar saat, chaar, ek. Do simple steps jo tum pehle se jaante the.'), o => { o.g3 = Grid(o.c, 3, 3, { size: 70, fill: (r, c) => String(o.vals[2 - c][r]) }); o.g3.all(x => x.className = 'gc c-m'); Txt(o.c, 'reverse rows', 'sm dim'); }]
      ]),
      S('Spiral order: four walls', B => {
        const [l, r] = row(B, [1, 1]);
        return { g: Grid(l, 3, 4, { size: 76, fill: (a, b) => String(a * 4 + b + 1) }), o: Out(r, { title: 'spiral', h: 80 }), r };
      }, [
        [T('Spiral Matrix. Keep four walls: top, bottom, left and right. Walk along one wall, then move that wall inward.', 'Spiral Matrix. Chaar deewarein rakho: top, bottom, left aur right. Ek deewar ke saath chalo, phir wo deewar andar khiskao.')],
        [T('Right along the top, then top moves down. Down the right side, then right moves in. Left along the bottom. Up the left side. Then the inner layer.', 'Top ke saath right chalo, phir top neeche aata hai. Right side neeche, phir right andar. Bottom ke saath left. Left side upar. Phir andar ki layer.'), null, { seq: [[[0, 0], [0, 1], [0, 2], [0, 3]], [[1, 3], [2, 3]], [[2, 2], [2, 1], [2, 0]], [[1, 0]], [[1, 1], [1, 2]]].map((cells, k) => o => { cells.forEach(([a, b]) => { o.g.hl(a, b, ['y', 's', 'm', 'v', 'c'][k]); o.o.w(String(a * 4 + b + 1) + ' '); }); }), gap: 1100 }],
        [T('Re-check the walls before walking the bottom and the left side. Otherwise single rows or columns get printed twice.', 'Bottom aur left side chalne se pehle deewarein dobara check karo. Warna akeli row ya column do baar print ho jaata hai.')]
      ])
    ]},
    { t: '2 · Numbers', scenes: [
      S('Carries, powers, cycles', B => {
        const [a, b, c] = row(B, [1, 1, 1]);
        return { a, b, c };
      }, [
        [T('Plus One and Multiply Strings treat numbers as lists of digits. Simulate school arithmetic: work from the right, and carry.', 'Plus One aur Multiply Strings numbers ko digits ki list maante hain. School wala hisaab simulate karo: right se kaam karo, aur carry rakho.'), o => { Card(o.a, { icon: '➕', title: 'Carry', body: 'digit = sum % 10, carry = sum ~/ 10', c: 'y' }); Big(o.a, '129 + 1<br>= 130', { size: 30 }); }],
        [T('Pow x n: squaring halves the exponent. x to the ten is x squared, to the fifth. Only log n multiplications.', 'Pow x n: square karne se exponent aadha hota hai. x to the ten matlab x square, to the five. Sirf log n multiplications.'), o => { Card(o.b, { icon: '⚡', title: 'Fast power', body: 'odd n → multiply once; then square x and halve n', c: 's' }); Big(o.b, 'x¹⁰ = (x²)⁵', { size: 30 }); }],
        [T('Happy Number repeats a digit-square process that either reaches one or loops. Detect the loop with a set, just like a linked list cycle.', 'Happy Number ek digit-square process dohrata hai jo ya toh ek tak pahunchta hai ya loop mein fasta hai. Loop ko set se pakdo, bilkul linked list cycle jaisa.'), o => { Card(o.c, { icon: '🔁', title: 'Cycle check', body: 'seen before → it loops forever', c: 'm' }); Big(o.c, '19 → 82 → 68<br>→ 100 → 1', { size: 26 }); }]
      ])
    ]}
  ]
});

/* ======================= BIT MANIPULATION ======================= */
E.register('bit-manipulation', {
  id: 't-bit-manipulation', startLabel: 'Watch: Bit Manipulation explained',
  outro: 'Start with Single Number.',
  notes: {
    intro: { en: 'Numbers are rows of bits, and bitwise operators work on every bit at once. A handful of identities (XOR cancelling, n & (n − 1), shifts) solve this whole section. Revisit the binary chapter of Video 1 first.', hi: "Numbers bits ki rows hain, aur bitwise operators har bit pe ek saath kaam karte hain. Kuch identities (XOR ka katna, n & (n − 1), shifts) poora section solve kar deti hain. Pehle Math video ka binary chapter dobara dekho." },
    signals: { en: ['Everything appears twice except one → <b>XOR everything</b>', 'Count the 1 bits → <b>n &amp; (n − 1)</b> or check and shift', 'Reverse or build bits → <b>shift left, OR in the bit</b>', 'Add without + → <b>XOR = sum, AND &lt;&lt; 1 = carry</b>', 'Missing number → <b>XOR indexes with values</b>'], hi: ["Sab do baar aata hai ek ke alawa → <b>sab XOR karo</b>", "1 bits gino → <b>n &amp; (n − 1)</b> ya check karo aur shift", "Bits ulti karo ya banao → <b>left shift, bit OR karo</b>", "Bina + ke jodo → <b>XOR = sum, AND &lt;&lt; 1 = carry</b>", "Missing number → <b>indexes ko values se XOR</b>"] },
    templateTitle: 'Bit identities',
    template: `a ^ a == 0            # pairs cancel
a ^ 0 == a
n & 1                 # last bit: 1 -> odd
n >> 1                # divide by 2
n << 1                # multiply by 2
n & (n - 1)           # clears the lowest 1 bit
(n >> k) & 1          # the k-th bit
x | (1 << k)          # set the k-th bit
bin(n).count("1")     # count 1 bits (Python shortcut)`
  },
  chapters: [
    { t: '1 · The tricks', scenes: [
      intro('Topic 18 of 18', 'Bit Manipulation', 'Work on all the bits at once.', [
        [T('The final topic: bit manipulation. Remember the light switches from video one? Every number is a row of switches, and the bitwise operators flip them all at once.', 'Aakhri topic: bit manipulation. Math video ke light switches yaad hain? Har number switches ki ek row hai, aur bitwise operators sab ek saath palat dete hain.')],
        [T('Just five tricks solve all seven problems in this section.', 'Is section ke saaton problems sirf paanch tricks se solve hote hain.')]
      ]),
      S('XOR cancels pairs', B => {
        const [top, bot] = col(B, [1, 1]);
        return { a: Arr(top, [4, 1, 2, 1, 2], { w: 84, label: 'every number twice, except one' }), v: Vars(bot) };
      }, [
        [T('Single Number. XOR of a number with itself is zero, and XOR with zero changes nothing. And the order does not matter.', 'Single Number. Kisi number ka khud se XOR zero hai, aur zero se XOR kuch nahi badalta. Aur order matter nahi karta.')],
        [T('XOR everything: four, then one, two, one, two. The ones cancel. The twos cancel. Four is left.', 'Sab XOR karo: chaar, phir ek, do, ek, do. Ek kat gaye. Do kat gaye. Chaar bacha.'), null, { seq: [[0, 4], [1, 5], [2, 7], [3, 6], [4, 4]].map(([i, v]) => o => { o.a.ptr('x', i, 'y'); o.v.set('res', v, 'res ^= x', i === 4 ? 'y' : undefined); }), gap: 900 }],
        [T('Missing Number uses the same trick: XOR every index with every value. Every present number cancels with its index.', 'Missing Number yahi trick use karta hai: har index ko har value se XOR karo. Har maujood number apne index se kat jaata hai.'), o => o.a.noPtr('x')]
      ]),
      S('n & (n − 1)', B => {
        const [top, bot] = col(B, [1, 1]);
        return { b: Bits(top, 4, { value: 11, sum: true }), v: Vars(bot) };
      }, [
        [T('Count the 1 bits of eleven: one zero one one. The trick: n AND n minus one clears the LOWEST 1 bit.', 'Gyaarah ke 1 bits gino: ek zero ek ek. Trick: n AND n minus ek SABSE NEECHE wala 1 bit mita deta hai.')],
        [T('Eleven becomes ten. Ten becomes eight. Eight becomes zero. Three steps, so three 1 bits.', 'Gyaarah das ban jaata hai. Das aath. Aath zero. Teen steps, toh teen 1 bits.'), null, { seq: [[10, 1], [8, 2], [0, 3]].map(([n, k]) => o => { o.b.set(n, true); o.v.set('count', k, '', 'y'); }), gap: 1300 }],
        [T('Why does it work? Subtracting one flips the lowest 1 bit to 0 and all the zeros below it to 1s. ANDing with the original wipes out exactly that part.', 'Ye kaam kyun karta hai? Ek ghatane se sabse neeche wala 1 bit 0 ho jaata hai aur uske neeche ke saare zero 1 ban jaate hain. Original ke saath AND karne se theek wahi hissa mit jaata hai.')]
      ]),
      S('Shifts and adding without +', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Reverse Bits builds a new number bit by bit: shift the result left, OR in the last bit of n, then shift n right. Thirty-two times.', 'Reverse Bits naya number bit by bit banata hai: result ko left shift karo, n ka aakhri bit OR karo, phir n ko right shift. Battees baar.'), o => Code(o.l, 'for _ in range(32):\n    res = (res << 1) | (n & 1)\n    n >>= 1', { size: 20 })],
        [T('Counting Bits reuses answers: the bits of i equal the bits of i shifted right, plus its last bit. A tiny DP.', 'Counting Bits jawab dobara use karta hai: i ke bits equals i right shift ke bits, plus uska aakhri bit. Ek chhota sa DP.'), o => Code(o.l, 'ans[i] = ans[i >> 1] + (i & 1)', { size: 20 })],
        [T('Sum of Two Integers adds without plus. XOR adds each column ignoring carries. AND shifted left gives the carries. Repeat until there are no carries.', 'Sum of Two Integers bina plus ke jodta hai. XOR har column ko carry ke bina jodta hai. AND ko left shift karne se carries milte hain. Carry khatam hone tak dohrao.'), o => Big(o.r, 'sum = a ^ b<br>carry = (a & b) &lt;&lt; 1', { size: 32 })],
        [T('That is the final topic. You have seen every pattern in DSA 150. Now it is practice, practice, and re-practice. You have got this.', 'Ye aakhri topic tha. Tumne DSA 150 ka har pattern dekh liya. Ab bas practice, practice, aur dobara practice. Tum kar loge.'), o => Card(o.r, { icon: '🏁', title: 'All 18 topics covered', body: 'Go back to the roadmap and keep solving, one topic at a time.', c: 'm' })]
      ])
    ]}
  ]
});
})();
