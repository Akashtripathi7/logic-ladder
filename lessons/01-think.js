(function () {
const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Arr, Tbl, Think, Vars } = E;
const { S, fresh, range } = LH;

E.register('g1', { id: 'think-v3', startLabel: 'Start: How to Think', outro: 'Next: the Loop mastery drills in the Logic Gym.', chapters: [
  { t: '0 · Welcome', scenes: [
    S('Stuck is normal', B => ({ t: Title(B, 'Logic Gym · 1', 'How to Think', 'A repeatable recipe for any problem, and the map from clues to patterns.') }), [
      [T('Welcome to the Logic Gym. You now have the maths and the Python basics. This video gives you the most important thing of all: a way to think when you see a problem you have never seen before.', 'Logic Gym mein swagat hai. Tumhare paas ab math aur Python ki basics hain. Ye video sabse zaroori cheez deta hai: jab koi bilkul nayi problem dikhe, tab kaise sochna hai.')],
      [T('First, the truth. Everyone gets stuck. Good problem solvers are not people who never get stuck. They are people with a process for getting unstuck.', 'Pehle sach sun lo. Har koi atakta hai. Acche problem solvers wo nahi jo kabhi nahi atakte. Wo hain jinke paas atakne se nikalne ka process hai.')],
      [T('Think of a doctor. They do not guess the treatment. They look at the symptoms, recognise the illness, and then apply the treatment they already know. Problems work the same way: clues, pattern, solution.', 'Ek doctor socho. Wo ilaaj guess nahi karta. Lakshan dekhta hai, bimaari pehchaanta hai, phir wo ilaaj lagata hai jo use pehle se aata hai. Problems bhi aise hi: clues, pattern, solution.')]
    ]),
    S('Clues, pattern, solution', B => {
      const [a, b, c] = row(B, [1, 1, 1], { mid: true });
      return { a, b, c };
    }, [
      [T('Every problem statement is full of clues. Words like sorted, contiguous, top k, all combinations, or shortest path.', 'Har problem statement clues se bhara hota hai. Words jaise sorted, contiguous, top k, all combinations, ya shortest path.'), o => Card(o.a, { icon: '🔍', title: 'Clues', body: '"sorted", "subarray", "top k", "all combinations", "grid"…', c: 'y' })],
      [T('Each clue points to a pattern: a known technique like two pointers, sliding window, a heap or backtracking.', 'Har clue ek pattern ki taraf ishaara karta hai: two pointers, sliding window, heap ya backtracking jaisi jaani-pehchaani technique.'), o => Card(o.b, { icon: '🧩', title: 'Pattern', body: 'two pointers, sliding window, heap, BFS, DP…', c: 's' })],
      [T('And each pattern comes with a template you can adapt. DSA 150 is really about eighteen patterns, practised until you recognise them instantly.', 'Aur har pattern ke saath ek template aata hai jise adapt kar sakte ho. DSA 150 asal mein athaarah patterns hain, jinhe itna practise karo ki turant pehchaan lo.'), o => Card(o.c, { icon: '🛠️', title: 'Solution', body: 'A template you adapt to the details.', c: 'm' })]
    ])
  ]},
  { t: '1 · The recipe', scenes: [
    S('The 7-step recipe', B => ({ th: Think(B, ['Understand: input, output, rules, edge cases', 'Examples: solve 2–3 tiny cases by hand', 'Brute force: the simplest correct idea', 'Improve: find the repeated work, remove it', 'Code: translate your plain-English steps', 'Trace & test: run your examples through it', 'Analyse: time and space in Big O'], { title: 'The recipe' }) }), [
      [T('Here is the recipe. Seven steps. We will walk through all of them on a real DSA 150 problem.', 'Ye rahi recipe. Saat steps. Ek asli DSA 150 problem pe saare steps chalenge.')],
      [T('Understand. Say the problem in your own words. What goes in? What comes out? What are the tricky cases: empty input, one item, duplicates, negatives?', 'Samjho. Problem apne shabdon mein bolo. Andar kya jaata hai? Bahar kya aata hai? Tricky cases kya hain: khaali input, ek item, duplicates, negatives?'), o => o.th.on(0)],
      [T('Examples. Solve two or three tiny cases by hand, slowly. Watch what YOUR brain does. That is often the algorithm.', 'Examples. Do-teen chhote cases haath se, dheere solve karo. Dekho TUMHARA dimaag kya karta hai. Aksar wahi algorithm hota hai.'), o => o.th.on(1)],
      [T('Brute force. Write the simplest idea that is correct, even if it is slow. Never skip this. It proves you understand the problem, and it is the starting point for improving.', 'Brute force. Sabse simple sahi idea likho, chahe slow ho. Ise kabhi skip mat karo. Ye saabit karta hai ki problem samajh aayi, aur improve karne ki shuruaat yahi se hoti hai.'), o => o.th.on(2)],
      [T('Improve. Look at the brute force and ask: what work am I repeating? Which tool would remove it? A set, a map, sorting, two pointers, a formula?', 'Improve. Brute force dekh ke poocho: kaunsa kaam baar-baar ho raha hai? Kaunsa tool use hata dega? Set, map, sorting, two pointers, koi formula?'), o => o.th.on(3)],
      [T('Code. Now, and only now, write code, translating the steps you already wrote in plain English.', 'Code. Ab, aur sirf ab, code likho, jo steps plain English mein likhe the unhe translate karo.'), o => o.th.on(4)],
      [T('Trace and test. Run your hand examples through the code, line by line. And finally, analyse the time and space.', 'Trace aur test. Apne haath wale examples code pe line-by-line chalao. Aur end mein time aur space analyse karo.'), o => o.th.on(5), { seq: [o => o.th.on(6)], gap: 2500 }]
    ]),
    S('Recipe in action: Contains Duplicate', B => {
      const [l, r] = row(B, [1.15, 1]);
      return { l, r, th: Think(r, ['Understand', 'Examples', 'Brute force', 'Improve', 'Code', 'Trace', 'Analyse']) };
    }, [
      [T('Problem: given a list, return true if any value appears at least twice.', 'Problem: list di hai, agar koi value kam se kam do baar aaye toh true.'), o => { o.th.on(0); o.a = Arr(o.l, [1, 2, 3, 1], { w: 80, label: 'nums' }); }],
      [T('Understand. Input: a list of numbers. Output: true or false. Edge cases: an empty list gives false, and a single item gives false.', 'Samjho. Input: numbers ki list. Output: true ya false. Edge cases: khaali list false, ek item false.'), o => Txt(o.l, 'in: list[int] → out: bool<br><span class="d">[] → False · [7] → False</span>', 'sm')],
      [T('Examples by hand. One, two, three, one. How did you notice the answer? You remembered that you had already seen a one. Remembering is the key idea.', 'Haath se examples. Ek, do, teen, ek. Answer kaise pata chala? Tumhe yaad tha ki ek pehle dekha tha. Yaad rakhna hi main idea hai.'), o => { o.th.on(1); o.a.hl([0, 3], 'y'); }],
      [T('Brute force: compare every pair. Two nested loops. Correct, but O of n squared.', 'Brute force: har pair compare karo. Do nested loops. Sahi hai, lekin O of n square.'), o => { o.th.on(2); o.l.innerHTML = ''; o.a = Arr(o.l, [1, 2, 3, 1], { w: 80 }); Code(o.l, 'for i in range(n):\n    for j in range(i + 1, n):\n        if a[i] == a[j]:\n            return True', { size: 19 }); }],
      [T('Improve. The repeated work is searching for earlier values again and again. Which tool answers "have I seen this" instantly? A set.', 'Improve. Repeated kaam hai purani values ko baar-baar dhoondhna. "Ye pehle dekha?" turant kaun batata hai? Set.'), o => o.th.on(3)],
      [T('Code it with a set. Check first, then add.', 'Set ke saath code karo. Pehle check, phir add.'), o => { o.th.on(4); o.l.innerHTML = ''; o.a = Arr(o.l, [1, 2, 3, 1], { w: 80 }); o.c = Code(o.l, 'seen = set()\nfor x in nums:\n    if x in seen:\n        return True\n    seen.add(x)\nreturn False', { size: 19 }); }],
      [T('Trace. One, not seen, add it. Two, add. Three, add. One: seen! Return true.', 'Trace. Ek, nahi dekha, add. Do, add. Teen, add. Ek: dekha hua! True return.'), o => o.th.on(5), { seq: [0, 1, 2, 3].map(i => o => { o.a.ptr('x', i, 'y'); o.a.hl(i, i === 3 ? 'm' : 's'); o.c.hl(i === 3 ? 3 : 5); }), gap: 900 }],
      [T('Analyse. O of n time, O of n space. You traded memory for speed. That trade is the idea behind half of DSA 150.', 'Analyse. O of n time, O of n space. Tumne speed ke liye memory di. Yahi trade DSA 150 ke aadhe hisse ka idea hai.'), o => o.th.done()]
    ])
  ]},
  { t: '2 · Constraints', scenes: [
    S('Constraints are hints', B => {
      const [l, r] = row(B, [1, 1.1]);
      return { l, r };
    }, [
      [T('Most people skip the constraints at the bottom of a problem. That is a mistake. They secretly tell you which solution is expected.', 'Zyaadatar log problem ke neeche ke constraints skip kar dete hain. Ye galti hai. Wo chupke se batate hain kaunsa solution expected hai.'), o => Code(o.l, '# Constraints:\n#   1 <= len(nums) <= 100000\n#   -10^9 <= nums[i] <= 10^9', { title: 'problem statement', size: 20 })],
      [T('A computer does roughly a hundred million simple steps per second. So compare the size of n with how fast each complexity grows.', 'Computer lagbhag das crore simple steps per second karta hai. Toh n ke size ko compare karo ki har complexity kitni tezi se badhti hai.'), o => { o.t = Tbl(o.r, ['n up to', 'aim for', 'think of'], [['10', 'O(n!) / O(2ⁿ)', 'backtracking'], ['20', 'O(2ⁿ)', 'subsets, bitmasks'], ['500', 'O(n³)', 'triple loops, interval DP'], ['5,000', 'O(n²)', 'nested loops, 2-D DP'], ['10⁵ – 10⁶', 'O(n log n) or O(n)', 'sort, heap, hash map, window, two pointers'], ['huge (10⁹)', 'O(log n) / O(1)', 'binary search, maths']], { hidden: true, mono: [0, 1] }); }, { seq: range(0, 5).map(i => o => o.t.show(i)), gap: 900 }],
      [T('Here n can be a hundred thousand. n squared would be ten billion steps. Too slow. So before writing anything, you know: aim for O of n or O of n log n.', 'Yahan n ek lakh tak ho sakta hai. n square das arab steps hoga. Bahut slow. Toh kuch likhne se pehle hi pata hai: O of n ya O of n log n ka target rakho.'), o => o.t.hl(4)],
      [T('Values up to a billion also tell you something. You cannot make an array indexed by value. Use a map or a set instead.', 'Values sau crore tak hain, ye bhi kuch batata hai. Value ko index bana ke array nahi bana sakte. Map ya set use karo.'), o => o.t.hl(-1)]
    ])
  ]},
  { t: '3 · The pattern map', scenes: [
    S('Clue → pattern, part 1', B => ({ t: Tbl(B, ['if the problem says…', 'reach for…'], [
      ['"seen before?", "duplicate", "count / frequency", "anagram"', 'Hash set / hash map'],
      ['"sorted array", "pair that sums to"', 'Two pointers or binary search'],
      ['"contiguous subarray / substring", "longest / shortest window"', 'Sliding window'],
      ['"next greater", "matching brackets", "undo"', 'Stack (often monotonic)'],
      ['"find in sorted", "minimum X such that…"', 'Binary search (even on the answer)'],
      ['"linked list", "cycle", "middle", "kth from end"', 'Fast & slow pointers, dummy node']
    ], { hidden: true }) }), [
      [T('Here is the map you will use for all one hundred and fifty problems. Part one.', 'Ye raha wo map jo saari ek sau pachaas problems mein kaam aayega. Part ek.')],
      [T('Seen before, duplicates, counting, anagrams: a hash set or a hash map.', 'Pehle dekha, duplicates, ginti, anagrams: hash set ya hash map.'), o => { o.t.show(0); o.t.hl(0); }],
      [T('A sorted array, or a pair that sums to something: two pointers, or binary search.', 'Sorted array, ya kisi sum wala pair: two pointers, ya binary search.'), o => { o.t.show(1); o.t.hl(1); }],
      [T('Anything about a contiguous subarray or substring, especially the longest or shortest one: a sliding window.', 'Lagatar subarray ya substring ki koi bhi baat, khaaskar sabse lambi ya chhoti: sliding window.'), o => { o.t.show(2); o.t.hl(2); }],
      [T('Next greater element, matching brackets, undo: a stack.', 'Next greater element, matching brackets, undo: stack.'), o => { o.t.show(3); o.t.hl(3); }],
      [T('Finding something in sorted data, or the smallest value that makes a condition true: binary search.', 'Sorted data mein kuch dhoondhna, ya sabse chhoti value jisse condition sach ho: binary search.'), o => { o.t.show(4); o.t.hl(4); }],
      [T('Linked lists, cycles, the middle, or kth from the end: fast and slow pointers, and a dummy node.', 'Linked lists, cycles, beech wala, ya end se k-th: fast aur slow pointers, aur dummy node.'), o => { o.t.show(5); o.t.hl(5); }]
    ]),
    S('Clue → pattern, part 2', B => ({ t: Tbl(B, ['if the problem says…', 'reach for…'], [
      ['"tree", "depth", "path from root"', 'DFS recursion (or BFS by level)'],
      ['"prefix", "autocomplete", "many words"', 'Trie'],
      ['"top k", "kth largest", "median of a stream", "merge k"', 'Heap'],
      ['"all subsets / combinations / permutations"', 'Backtracking'],
      ['"grid", "islands", "connections", "dependencies"', 'Graph BFS / DFS / topological sort'],
      ['"count the ways", "min cost", "max profit" with choices', 'Dynamic programming'],
      ['"intervals", "meetings", "overlap"', 'Sort by start (or end), then sweep']
    ], { hidden: true }) }), [
      [T('Part two.', 'Part do.')],
      [T('Trees, depth, paths from the root: depth-first recursion, or breadth-first search level by level.', 'Trees, depth, root se raaste: depth-first recursion, ya level-by-level breadth-first search.'), o => { o.t.show(0); o.t.hl(0); }],
      [T('Prefixes, autocomplete, many words at once: a trie.', 'Prefixes, autocomplete, ek saath bahut saare words: trie.'), o => { o.t.show(1); o.t.hl(1); }],
      [T('Top k, kth largest, a median of a stream, merging k lists: a heap.', 'Top k, k-th largest, stream ka median, k lists merge karna: heap.'), o => { o.t.show(2); o.t.hl(2); }],
      [T('All subsets, combinations or permutations: backtracking.', 'Saare subsets, combinations ya permutations: backtracking.'), o => { o.t.show(3); o.t.hl(3); }],
      [T('Grids, islands, connections and dependencies: graphs, with BFS, DFS or topological sort.', 'Grids, islands, connections aur dependencies: graphs, BFS, DFS ya topological sort ke saath.'), o => { o.t.show(4); o.t.hl(4); }],
      [T('Count the ways, minimum cost, maximum profit with choices at each step: dynamic programming.', 'Kitne tareeke, minimum cost, har step pe choices ke saath maximum profit: dynamic programming.'), o => { o.t.show(5); o.t.hl(5); }],
      [T('Intervals and meetings: sort, then sweep. You do not need to memorise this today. Every topic video repeats its own row of this map.', 'Intervals aur meetings: sort karo, phir sweep. Aaj ye yaad karne ki zaroorat nahi. Har topic video apni row dobara batayega.'), o => { o.t.show(6); o.t.hl(6); }]
    ])
  ]},
  { t: '4 · Getting unstuck', scenes: [
    S('Five unsticking moves', B => ({ b: Bul(B, ['<span class="y">Shrink it.</span> Solve n = 1, 2, 3 by hand. Watch what you do.', '<span class="y">Draw it.</span> Boxes for arrays, circles for nodes, arrows for pointers.', '<span class="y">Brute force first,</span> then circle the repeated work.', '<span class="y">Ask "what if…"</span> it were sorted? I had a map? I knew the answer for n − 1?', '<span class="y">Timebox:</span> 25 minutes, then one hint, then the solution. Re-solve it in 3 days.'], { num: true }) }), [
      [T('When you are stuck, use these moves in order.', 'Jab atak jao, ye moves order mein use karo.')],
      [T('Shrink it. Solve the problem for one item, then two, then three, by hand. The steps your hand takes are the algorithm.', 'Chhota karo. Pehle ek item, phir do, phir teen ke liye haath se solve karo. Jo steps tumhara haath karta hai wahi algorithm hai.'), o => o.b.show(0)],
      [T('Draw it. Boxes for arrays, circles for nodes, arrows for pointers. Most bugs and most ideas become visible on paper.', 'Draw karo. Arrays ke liye dabbe, nodes ke liye gole, pointers ke liye arrows. Zyaadatar bugs aur ideas paper pe dikh jaate hain.'), o => o.b.show(1)],
      [T('Brute force first, then circle the repeated work. Improvement always starts from something that works.', 'Pehle brute force, phir repeated kaam pe gola lagao. Improvement hamesha kisi chalte hue solution se shuru hota hai.'), o => o.b.show(2)],
      [T('Ask what if. What if the array were sorted? What if I had a map? What if I already knew the answer for n minus one? That last question is the doorway to recursion and dynamic programming.', '"Agar" poocho. Agar array sorted hota? Agar mere paas map hota? Agar n minus ek ka answer pata hota? Wo aakhri sawaal recursion aur dynamic programming ka darwaza hai.'), o => o.b.show(3)],
      [T('Timebox. Give it twenty-five minutes. Then read ONE hint. Still stuck? Read the solution, understand it, close it, and write it yourself. Then solve it again in three days. That second solve is where the learning happens.', 'Time fix karo. Pachchees minute do. Phir SIRF EK hint padho. Phir bhi atke? Solution padho, samjho, band karo, aur khud likho. Phir teen din baad dobara solve karo. Wahi doosra solve asli seekhna hai.'), o => o.b.show(4)]
    ]),
    S('How to use this app', B => {
      const [l, r] = row(B, [1, 1]);
      return { l, r };
    }, [
      [T('Every problem page follows the recipe. First the problem in plain words, and questions to ask.', 'Har problem page isi recipe pe chalta hai. Pehle seedhe shabdon mein problem, aur poochne wale sawaal.'), o => Bul(o.l, ['Problem in plain words', 'Questions to ask', 'Hints, one at a time', 'Brute force', 'Spot the pattern', 'Best approach', 'Python code', 'Dry run', 'Hinglish explanation', 'Mistakes to avoid'], { num: true, sm: true, shown: true })],
      [T('Then hints, revealed one at a time. After each hint, stop and try again. Only then open the brute force, the pattern, and the best approach.', 'Phir hints, ek-ek karke. Har hint ke baad ruko aur dobara try karo. Uske baad hi brute force, pattern aur best approach kholo.'), o => Card(o.r, { icon: '💡', title: 'One hint at a time', body: 'After each hint, try again before reading on.', c: 'y' })],
      [T('Finally, step through the dry run table, and type the Python code yourself in your editor. Mark the problem as solved only when you can write it without looking.', 'Aakhir mein dry run table step-by-step chalao, aur Python code apne editor mein khud type karo. Problem ko solved tabhi mark karo jab bina dekhe likh sako.'), o => Card(o.r, { icon: '✅', title: 'Solved means', body: 'you can write it from memory, and explain why it works.', c: 'm' })]
    ]),
    S('Next: the drills', B => ({ t: Title(B, 'Up next', 'Logic Gym drills', 'Loops, patterns, lists, strings and debugging. Then the Warm-up 50.') }), [
      [T('Your next step is the rest of the Logic Gym: drills on loops, patterns, lists, strings and debugging. After that come the Warm-up 50: reversing strings, largest numbers, anagrams and palindromes.', 'Tumhara agla step hai Logic Gym ka baaki hissa: loops, patterns, lists, strings aur debugging ke drills. Uske baad aata hai Warm-up 50: strings ulti karna, sabse bada number, anagrams aur palindromes.')],
      [T('Use the recipe on every single one, even the easy ones. You are not just solving problems. You are building the habit. See you there.', 'Har ek pe recipe use karo, aasaan waalon pe bhi. Tum sirf problems solve nahi kar rahe. Tum aadat bana rahe ho. Wahan milte hain.')]
    ])
  ]}
]});
})();
