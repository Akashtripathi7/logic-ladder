(function () {
  const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Arr, Tbl, Think, Vars, KV, StackV, Grid, Out, Trace } = E;
const { S, fresh, range, intro } = LH;

/* ======================= ARRAYS & HASHING ======================= */
E.register('arrays-hashing', {
  id: 't-arrays-hashing', startLabel: 'Watch: Arrays & Hashing explained',
  outro: 'Now open Contains Duplicate and use the seen-before pattern.',
  notes: {
    intro: { en: 'Hash sets and hash maps turn "search the whole list" into an instant lookup. Most array problems get faster the moment you remember what you have already seen.', hi: "Hash set aur hash map \"poori list mein dhoondho\" ko turant lookup bana dete hain. Zyada tar array problems tab tez ho jaate hain jab tum yaad rakhte ho ki kya pehle dekh chuke ho." },
    signals: { en: ['"Have I seen this before?" / duplicates → <b>Set</b>', '"How many times?" / frequency / anagrams → <b>Map of counts</b>', '"Find a partner that adds up to…" → <b>Map of value → index</b>', '"Group things that are equivalent" → <b>Map of key → list</b>', '"Everything except me" → <b>prefix and suffix</b> passes', 'Unsorted data + O(n) required → almost always hashing'], hi: ["\"Kya ye pehle dekha?\" / duplicates → <b>Set</b>", "\"Kitni baar?\" / frequency / anagrams → <b>counts ki dictionary</b>", "\"Aisa partner dhoondho jo jud ke…\" → <b>value → index dictionary</b>", "\"Ek jaisi cheezon ke group banao\" → <b>key → list dictionary</b>", "\"Mere alawa sab\" → <b>prefix aur suffix</b> passes", "Unsorted data + O(n) chahiye → lagbhag hamesha hashing"] },
    templateTitle: 'The three hashing moves',
    template: `# 1. Seen before?
seen = set()
for x in nums:
    if x in seen:
        ...  # found a repeat
    seen.add(x)

# 2. Count things
count = {}
for x in nums:
    count[x] = count.get(x, 0) + 1
# (or: from collections import Counter; count = Counter(nums))

# 3. Group by a key
from collections import defaultdict
groups = defaultdict(list)
for w in words:
    groups["".join(sorted(w))].append(w)`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 1 of 18', 'Arrays & Hashing', 'Remember what you have seen, and look it up instantly.', [
        [T('Welcome to the first DSA 150 topic: arrays and hashing. It is the foundation for everything that follows, so we will go slowly.', 'DSA 150 ke pehle topic mein swagat hai: arrays aur hashing. Aage ki har cheez isi par khadi hai, isliye hum aaram se chalenge.')],
        [T('Here is the one-sentence idea. Many slow solutions search a list again and again. Hashing lets you find things instantly instead.', 'Ek line ka idea sun lo. Bahut saare slow solutions list mein baar-baar dhoondhte rehte hain. Hashing se cheez turant mil jaati hai.')]
      ]),
      S('Searching a list is slow', B => {
        const [top, bot] = col(B, [1, 1]);
        return { a: Arr(top, [7, 3, 9, 4, 12, 8, 5, 1], { w: 76, label: 'list.contains(5)?' }), bot };
      }, [
        [T('Is five in this list? A list has no idea where five lives, so it checks one box at a time.', 'Kya is list mein paanch hai? List ko pata hi nahi ki paanch kahan rakha hai, isliye wo ek-ek dabba check karti hai.'), null, { seq: range(0, 6).map(i => o => { o.a.ptr('check', i, 'y'); o.a.hl(i, i === 6 ? 'm' : 'c'); }), gap: 450 }],
        [T('Seven checks. For a list of a million items, a million checks. And if you do that inside a loop, it becomes n squared.', 'Saat checks. Das lakh items ho toh das lakh checks. Aur agar ye kaam loop ke andar karo, toh n square ho jaata hai.'), o => Big(o.bot, 'list.contains → <span class="c">O(n)</span>', { size: 44 })],
        [T('Now imagine a coat check at a theatre. You hand over your coat and get ticket number 42. Later, the attendant walks straight to hook 42. No searching.', 'Ab socho theatre ka coat counter. Tum coat dete ho, tumhe token number 42 milta hai. Baad mein attendant seedha hook 42 par jaata hai. Koi dhoondhna nahi.'), o => Card(o.bot, { icon: '🧥', title: 'Coat check', body: 'Your ticket tells them exactly which hook to go to.', c: 's' })]
      ]),
      S('How a hash set works', B => {
        const [l, r] = row(B, [1.2, 1]);
        return { g: Arr(l, ['', '', '', '', '', '', '', ''], { w: 72, label: 'buckets 0–7' }), l, r };
      }, [
        [T('A hash set is that coat check. It keeps a row of buckets, and a hash function turns each value into a bucket number. Here the function is simply value modulo eight.', 'Hash set wahi coat counter hai. Isme buckets ki ek line hoti hai, aur hash function har value ko bucket number mein badal deta hai. Yahan function simple hai: value modulo aath.'), o => Big(o.r, 'bucket = value % 8', { size: 36 })],
        [T('Add seventeen: seventeen modulo eight is one. It goes into bucket one.', 'Satrah daalo: satrah modulo aath hai ek. Toh ye bucket ek mein jaata hai.'), o => { o.g.set(1, '17'); o.g.hl(1, 'y'); }],
        [T('Add four: bucket four. Add twelve: twelve modulo eight is four as well. Two values in one bucket is called a collision. The bucket just holds a tiny list.', 'Chaar daalo: bucket chaar. Barah daalo: barah modulo aath bhi chaar hai. Ek bucket mein do values, isko collision kehte hain. Bucket bas ek chhoti si list rakh leta hai.'), null, { seq: [o => { o.g.set(4, '4'); o.g.hl(4, 's'); }, o => { o.g.set(4, '4,12'); o.g.hl(4, 'c'); }], gap: 1400 }],
        [T('Now ask: is twelve in the set? Compute twelve modulo eight, which is four, and look only in bucket four. One or two checks, not the whole list.', 'Ab poocho: kya barah set mein hai? Barah modulo aath nikalo, chaar aaya, aur sirf bucket chaar dekho. Ek ya do checks, poori list nahi.'), o => { o.g.clear(); o.g.hl(4, 'm'); o.g.ptr('look', 4, 'm'); }],
        [T('That is why set and map lookups are O of one on average. Real hash functions are cleverer, but the idea is exactly this: compute where it lives, go straight there.', 'Isiliye set aur dictionary lookup average mein O of one hote hain. Asli hash functions zyada smart hote hain, par idea yahi hai: calculate karo cheez kahan rehti hai, seedha wahan jao.'), o => Txt(o.r, 'set.contains · map[key] → <span class="m">O(1)</span> average', 'sm')]
      ])
    ]},
    { t: '2 · The patterns', scenes: [
      S('Pattern 1: seen before', B => {
        const [l, r] = row(B, [1, 1]);
        return { a: Arr(l, [3, 1, 4, 1, 5], { w: 76, label: 'nums' }), s: Arr(r, [], { w: 64, label: 'seen (Set)', noIdx: true }), r };
      }, [
        [T('Pattern one: seen before. Contains Duplicate asks whether any value appears twice. Walk once, and keep every value you have seen in a set.', 'Pattern ek: pehle dekha hai kya. Contains Duplicate poochta hai ki koi value do baar aayi kya. Ek baar chalo, aur jo bhi dekha use set mein rakhte jao.')],
        [T('Three: new, add it. One: new. Four: new. One: the set says yes, seen before! Found the duplicate after a single pass.', 'Teen: naya hai, daal do. Ek: naya. Chaar: naya. Ek: set bolta hai haan, pehle dekha hai! Ek hi pass mein duplicate mil gaya.'), null, { seq: [0, 1, 2, 3].map(i => o => { o.a.ptr('x', i, 'y'); if (i < 3) { o.a.hl(i, 's'); o.s.push([3, 1, 4][i]); } else { o.a.hl(i, 'm'); o.s.hl(1, 'm'); } }), gap: 950 }],
        [T('Always check before you add. If you add first, every value "was seen", and you would report duplicates that do not exist.', 'Hamesha pehle check karo, phir daalo. Agar pehle daal diya, toh har value pehle se dikhegi aur tum aise duplicates bataoge jo hain hi nahi.'), o => Code(o.r, 'if x in seen:\n    return True\nseen.add(x)', { size: 20 })]
      ]),
      S('Pattern 2: counting', B => {
        const [l, r] = row(B, [1, 1]);
        return { a: Arr(l, 'banana'.split(''), { w: 64 }), kv: KV(r, { title: 'count' }), l };
      }, [
        [T('Pattern two: counting. A map stores each value together with how many times it has appeared.', 'Pattern do: ginti. Dictionary har value ke saath ye rakhti hai ki wo kitni baar aayi.')],
        [T('b, one. a, one. n, one. a, two. n, two. a, three.', 'b, ek. a, ek. n, ek. a, do. n, do. a, teen.'), null, { seq: 'banana'.split('').map((ch, i) => o => { o.c = o.c || {}; o.c[ch] = (o.c[ch] || 0) + 1; o.a.ptr('ch', i, 'y'); o.kv.set(ch, o.c[ch]); o.kv.hl(ch); }), gap: 700 }],
        [T('Valid Anagram is just this. Two words are anagrams exactly when their counts match. For lowercase letters only, a list of twenty-six counters is even faster than a map.', 'Valid Anagram bas yahi hai. Do words anagram tabhi hote hain jab unki ginti same ho. Sirf chhote letters ho toh chhabbees counters ki list dictionary se bhi fast hai.'), o => Code(o.l, 'count[x] = count.get(x, 0) + 1', { size: 20 })]
      ]),
      S('Pattern 3: complement lookup', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        const [l, r] = row(bot, [1, 1]);
        return { a: Arr(top, [3, 8, 5, 11], { w: 80, label: 'nums · target = 16' }), v: Vars(l, { title: 'now' }), kv: KV(r, { title: 'seen: value → index' }) };
      }, [
        [T('Pattern three: complement lookup, the heart of Two Sum. For each number, you need exactly one partner: target minus the number.', 'Pattern teen: jodi dhoondhna, Two Sum ka dil. Har number ko bas ek partner chahiye: target minus wo number.')],
        [T('Three needs thirteen. Not seen. Store three. Eight needs eight. Not seen yet. Store eight. Five needs eleven. Store five.', 'Teen ko terah chahiye. Nahi dekha. Teen rakh lo. Aath ko aath chahiye. Abhi nahi dekha. Aath rakh lo. Paanch ko gyaarah chahiye. Paanch rakh lo.'), null, { seq: [[0, 13], [1, 8], [2, 11]].map(([i, need]) => o => { o.a.ptr('i', i, 'y'); o.v.set('need', need); o.kv.set([3, 8, 5][i], i); }), gap: 1200 }],
        [T('Eleven needs five. Five is in the map, at index two! The answer is two and three. One pass instead of checking every pair.', 'Gyaarah ko paanch chahiye. Paanch dictionary mein hai, index do par! Jawab hai do aur teen. Har jodi check karne ki jagah bas ek pass.'), o => { o.a.ptr('i', 3, 'y'); o.v.set('need', 5, '', 'y'); o.kv.hl('5'); o.a.hl([2, 3], 'm'); }]
      ]),
      S('Pattern 4: grouping by a key', B => {
        const [l, r] = row(B, [1, 1.2]);
        return { t: Tbl(l, ['word', 'key (sorted)'], [['eat', 'aet'], ['tea', 'aet'], ['tan', 'ant'], ['ate', 'aet'], ['nat', 'ant'], ['bat', 'abt']], { hidden: true, mono: [0, 1] }), kv: KV(r, { title: 'groups: key → words' }) };
      }, [
        [T('Pattern four: grouping. Group Anagrams wants words with the same letters together. The trick is to give every word a key that is identical for all its anagrams.', 'Pattern chaar: group banana. Group Anagrams chahta hai ki same letters wale words saath aayein. Trick ye hai ki har word ko aisi key do jo uske saare anagrams ke liye same ho.')],
        [T('Sorting the letters is a perfect key. eat, tea and ate all become a e t.', 'Letters ko sort karna perfect key hai. eat, tea aur ate, teeno a e t ban jaate hain.'), null, { seq: range(0, 5).map(i => o => { o.t.show(i); o.t.hl(i); const g = o.g = o.g || {}; const [w, k] = [['eat', 'aet'], ['tea', 'aet'], ['tan', 'ant'], ['ate', 'aet'], ['nat', 'ant'], ['bat', 'abt']][i]; (g[k] = g[k] || []).push(w); o.kv.set(k, '[' + g[k].join(', ') + ']'); o.kv.hl(k); }), gap: 900 }],
        [T('Map from key to list. That shape, setdefault then append, solves many "group these" problems.', 'Key se list tak ki dictionary. Ye shape, setdefault phir append, bahut saare group wale problems solve karti hai.')]
      ]),
      S('Beyond hashing: prefix tricks', B => {
        const [top, bot] = col(B, [1, 1]);
        return { a: Arr(top, [1, 2, 3, 4], { w: 80, label: 'nums' }), bot };
      }, [
        [T('Two more ideas in this section. Product of Array Except Self: for each position, multiply everything to its LEFT, times everything to its RIGHT.', 'Is section mein do aur ideas. Product of Array Except Self: har position ke liye, uske BAYEIN sab ka product, guna uske DAYEIN sab ka product.'), o => { o.a.hl(2, 'y'); o.a.hl([0, 1], 's'); o.a.hl([3], 'v'); }],
        [T('Left products can be built in one pass from the left. Right products in one pass from the right. Two sweeps, no division, O of n.', 'Left products ek pass mein baayein se ban jaate hain. Right products ek pass mein daayein se. Do sweep, koi division nahi, O of n.'), o => Tbl(o.bot, ['i', '0', '1', '2', '3'], [['left', '1', '1', '2', '6'], ['right', '24', '12', '4', '1'], ['answer', '24', '12', '8', '6']], { mono: [0, 1, 2, 3, 4] })],
        [T('And Longest Consecutive Sequence: put everything in a set, and only start counting from numbers whose smaller neighbour is missing. Each run gets counted exactly once.', 'Aur Longest Consecutive Sequence: sab kuch set mein daalo, aur ginti sirf un numbers se shuru karo jinka ek chhota padosi missing hai. Har sequence sirf ek baar gini jaati hai.')]
      ])
    ]},
    { t: '3 · Recap', scenes: [
      S('How to recognise it', B => ({ b: Bul(B, ['Duplicates, "seen before?" → <span class="y">Set</span>', 'Frequencies, anagrams → <span class="y">Map of counts</span>', 'A partner that completes a target → <span class="y">Map value → index</span>', 'Group equivalent things → <span class="y">Map key → list</span>', 'Unsorted data, O(n) required → <span class="y">think hashing first</span>'], { num: true }) }), [
        [T('Here is your checklist for this topic.', 'Is topic ki checklist ye rahi.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Solve the nine problems in order. Before each one, ask the key question: what do I need to remember, and what will I look up?', 'Nau problems order mein solve karo. Har ek se pehle ye sawaal poocho: mujhe kya yaad rakhna hai, aur main kya dhoondhunga?')]
      ])
    ]}
  ]
});

/* ======================= TWO POINTERS ======================= */
E.register('two-pointers', {
  id: 't-two-pointers', startLabel: 'Watch: Two Pointers explained',
  outro: 'Start with Valid Palindrome.',
  notes: {
    intro: { en: 'Two indexes walk through the data together, usually from both ends toward the middle. On sorted data, each step safely throws away an option, turning O(n²) pair checks into O(n).', hi: "Do indexes data mein saath chalte hain, aam taur par dono kinaron se beech ki taraf. Sorted data pe har step ek option safely hata deta hai, aur O(n²) pair checks O(n) ban jaate hain." },
    signals: { en: ['The input is <b>sorted</b> and you need a pair/triplet', 'Palindromes or anything symmetric', '"In place" with O(1) extra space', 'Comparing or merging two sequences', 'Maximise an area or width between two positions'], hi: ["Input <b>sorted</b> hai aur pair/triplet chahiye", "Palindromes ya koi bhi symmetric cheez", "\"In place\", O(1) extra space ke saath", "Do sequences compare ya merge karna", "Do positions ke beech area ya chaudai maximise karna"] },
    templateTitle: 'Opposite-ends template',
    template: `l, r = 0, len(a) - 1
while l < r:
    s = a[l] + a[r]
    if s == target:
        break          # found
    elif s < target:
        l += 1         # need a bigger sum
    else:
        r -= 1         # need a smaller sum`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 2 of 18', 'Two Pointers', 'Two fingers walking toward each other.', [
        [T('Topic two: two pointers. You have already used it: reversing a list in video two. Now let us see why it is so powerful.', 'Topic do: two pointers. Tum ise already use kar chuke ho, list ulti karte waqt. Ab dekhte hain ye itna powerful kyun hai.')],
        [T('Picture two friends searching a sorted bookshelf, one from each end, walking toward the middle. Each step, one of them moves, and never back.', 'Socho do dost ek sorted bookshelf mein dhoondh rahe hain, ek-ek kinare se, beech ki taraf chalte hue. Har step par ek aage badhta hai, aur kabhi peeche nahi.')]
      ]),
      S('Palindrome: compare the ends', B => {
        const [top, bot] = col(B, [1, 1]);
        return { a: Arr(top, 'RACECAR'.split(''), { w: 80 }), bot };
      }, [
        [T('Is racecar a palindrome? Compare the first and last letters. Then move both pointers inward.', 'Kya racecar palindrome hai? Pehla aur aakhri letter compare karo. Phir dono pointers andar ki taraf le aao.'), o => { o.a.ptr('l', 0, 's'); o.a.ptr('r', 6, 'v'); }],
        [T('R and R match. A and A. C and C. The pointers meet in the middle: it is a palindrome.', 'R aur R match. A aur A. C aur C. Pointers beech mein mil gaye: ye palindrome hai.'), null, { seq: [[0, 6], [1, 5], [2, 4], [3, 3]].map(([l, r]) => o => { o.a.ptr('l', l, 's'); o.a.ptr('r', r, 'v'); o.a.hl([l, r], 'm'); }), gap: 900 }],
        [T('Only n over two comparisons, and no extra memory. Valid Palindrome adds one twist: skip anything that is not a letter or a digit.', 'Sirf n by two comparisons, aur koi extra memory nahi. Valid Palindrome ek twist deta hai: jo letter ya digit nahi hai use skip karo.'), o => Code(o.bot, 'while l < r:\n    if s[l] != s[r]:\n        return False\n    l += 1; r -= 1', { size: 20 })]
      ]),
      S('Sorted pair sums: why moving is safe', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, [1, 3, 4, 6, 8, 11], { w: 80, label: 'sorted · target = 10' }), v: Vars(bot) };
      }, [
        [T('Now the key idea. The list is sorted, and we want two numbers adding to ten. Start at both ends: one plus eleven is twelve. Too big.', 'Ab main idea. List sorted hai, aur humein do numbers chahiye jinka sum das ho. Dono kinaron se shuru karo: ek plus gyaarah, barah. Bahut bada.'), o => { o.a.ptr('l', 0, 's'); o.a.ptr('r', 5, 'v'); o.v.set('sum', 12, 'too big', 'c'); }],
        [T('Think about eleven. Its smallest possible partner is one, and even that is too big. So eleven can NEVER be part of the answer. Throw it away: move r left.', 'Gyaarah ke baare mein socho. Uska sabse chhota partner ek hai, aur wo bhi bahut bada de raha hai. Toh gyaarah KABHI jawab ka hissa nahi ban sakta. Use hata do: r ko left le jao.'), o => { o.a.dim(5); o.a.ptr('r', 4, 'v'); o.v.set('sum', 9, 'too small', 's'); }],
        [T('One plus eight is nine. Too small. The biggest possible partner for one is eight, and that is not enough, so one can never work either. Move l right.', 'Ek plus aath, nau. Bahut chhota. Ek ka sabse bada partner aath hai, aur wo bhi kaafi nahi, toh ek bhi kabhi kaam nahi karega. l ko right le jao.'), o => { o.a.dim(0); o.a.ptr('l', 1, 's'); o.v.set('sum', 11, 'too big', 'c'); }],
        [T('Three plus eight is eleven, too big: r moves. Three plus six is nine, too small: l moves. Four plus six is ten. Found it!', 'Teen plus aath gyaarah, bada: r hilega. Teen plus chhe nau, chhota: l hilega. Chaar plus chhe das. Mil gaya!'), null, { seq: [o => { o.a.dim(4); o.a.ptr('r', 3, 'v'); o.v.set('sum', 9, 'too small', 's'); }, o => { o.a.dim(1); o.a.ptr('l', 2, 's'); o.v.set('sum', 10, 'found!', 'y'); o.a.hl([2, 3], 'm'); }], gap: 1500 }],
        [T('Each step removes one number that provably cannot be in the answer. At most n steps: O of n, instead of checking all pairs.', 'Har step ek aisa number hata deta hai jo pakka jawab mein nahi ho sakta. Zyada se zyada n steps: O of n, saari jodiyan check karne ki jagah.')]
      ])
    ]},
    { t: '2 · Using it', scenes: [
      S('3Sum: fix one, then two pointers', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, [-4, -1, -1, 0, 1, 2], { w: 76, label: 'sorted · want a + b + c = 0' }), bot };
      }, [
        [T('3Sum finds all triplets summing to zero. Sort first. Then fix the first number, and the rest is Two Sum on a sorted list, which we just solved!', '3Sum aise saare triplets dhoondhta hai jinka sum zero ho. Pehle sort karo. Phir pehla number fix karo, aur baaki bacha sorted list par Two Sum, jo humne abhi solve kiya!'), o => { o.a.hl(1, 'y'); o.a.ptr('i', 1, 'y'); o.a.ptr('l', 2, 's'); o.a.ptr('r', 5, 'v'); }],
        [T('With minus one fixed, we need two numbers summing to one. Two pointers find minus one and two, then zero and one.', 'Minus ek fix hai, toh humein do numbers chahiye jinka sum ek ho. Two pointers minus ek aur do dhoondhte hain, phir zero aur ek.'), null, { seq: [o => o.a.hl([2, 5], 'm'), o => { o.a.clear(); o.a.hl(1, 'y'); o.a.ptr('l', 3, 's'); o.a.ptr('r', 4, 'v'); o.a.hl([3, 4], 'm'); }], gap: 1500 }],
        [T('To avoid duplicate triplets, skip a fixed number equal to the previous one. Sorting makes duplicates neighbours, so this is easy.', 'Duplicate triplets se bachne ke liye, agar fixed number pichhle wale ke barabar hai toh skip karo. Sort karne se duplicates padosi ban jaate hain, toh ye aasaan hai.'), o => Code(o.bot, 'if i > 0 and a[i] == a[i - 1]:\n    continue', { size: 20 })]
      ]),
      S('Container: move the shorter wall', B => {
        const [top, bot] = col(B, [1, 1]);
        return { a: Arr(top, [1, 8, 6, 2, 5, 4, 8, 3, 7], { w: 64, label: 'heights' }), v: Vars(bot) };
      }, [
        [T('Container With Most Water. Water held equals the width times the SHORTER wall. Start as wide as possible.', 'Container With Most Water. Paani equals chaudai guna CHHOTI deewar. Jitna chauda ho sake utne se shuru karo.'), o => { o.a.ptr('l', 0, 's'); o.a.ptr('r', 8, 'v'); o.v.set('area', '8 × 1 = 8'); }],
        [T('Which pointer should move? The shorter wall limits us. Moving the taller wall can only shrink the width without raising the limit. So always move the shorter one.', 'Kaunsa pointer hilega? Chhoti deewar hi limit hai. Lambi deewar hilane se chaudai kam hogi par limit nahi badhegi. Toh hamesha chhoti wali hilao.'), o => { o.a.hl(0, 'c'); }],
        [T('Move l to eight. Now the area is seven times seven: forty-nine, the best.', 'l ko aath par le jao. Ab area saat guna saat: unchaas, sabse best.'), o => { o.a.clear(); o.a.ptr('l', 1, 's'); o.v.set('area', '7 × 7 = 49', '', 'y'); o.a.hl([1, 8], 'm'); }],
        [T('Trapping Rain Water uses the same idea with running maximums from both sides. It is the hardest problem in this section, so save it for last.', 'Trapping Rain Water yahi idea use karta hai, dono taraf se running maximum ke saath. Ye is section ka sabse mushkil problem hai, isliye ise aakhir mein rakho.')]
      ])
    ]},
    { t: '3 · Recap', scenes: [
      S('How to recognise it', B => ({ b: Bul(B, ['Sorted input + pair or triplet → <span class="y">opposite ends</span>', 'Palindrome / symmetry → <span class="y">compare the ends</span>', 'In place, keep some items → <span class="y">slow writer + fast reader</span>', 'Width × height problems → <span class="y">move the limiting side</span>'], { num: true }) }), [
        [T('Your checklist for two pointers.', 'Two pointers ki checklist.'), null, { seq: range(0, 3).map(i => o => o.b.show(i)), gap: 900 }],
        [T('The question to ask every time: after comparing, which option can I safely throw away? If you can answer that, two pointers will work.', 'Har baar ye sawaal poocho: compare karne ke baad, kaunsa option main safely hata sakta hoon? Agar iska jawab de sakte ho, toh two pointers chalega.')]
      ])
    ]}
  ]
});

/* ======================= STACK ======================= */
E.register('stack', {
  id: 't-stack', startLabel: 'Watch: Stack explained',
  outro: 'Start with Valid Parentheses.',
  notes: {
    intro: { en: 'A stack remembers things in last-in, first-out order. Use it whenever the most recent unfinished item is the one that matters next.', hi: "Stack cheezein last-in, first-out order mein yaad rakhta hai. Jab bhi sabse nayi adhoori cheez hi aage matter kare, stack use karo." },
    signals: { en: ['Matching pairs: brackets, tags', '"Next greater / next smaller element" → <b>monotonic stack</b>', 'Evaluating expressions (postfix)', 'Undo, backtracking by hand, nested structures', 'Each element waits for a future element to resolve it'], hi: ["Matching pairs: brackets, tags", "\"Next greater / next smaller element\" → <b>monotonic stack</b>", "Expressions evaluate karna (postfix)", "Undo, haath se backtracking, nested structures", "Har element kisi aane wale element ka intezaar karta hai"] },
    templateTitle: 'Monotonic stack (next greater)',
    template: `ans = [-1] * len(a)
stack = []                 # indexes still waiting for an answer
for i, x in enumerate(a):
    while stack and x > a[stack[-1]]:
        j = stack.pop()
        ans[j] = x         # x is j's next greater element
    stack.append(i)`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 3 of 18', 'Stack', 'Last in, first out. The most recent thing matters most.', [
        [T('Topic three: the stack. A pile of plates: you add on top and take from the top.', 'Topic teen: stack. Plates ka dher: upar se daalo aur upar se hi nikalo.')],
        [T('The question that tells you to use a stack: does the MOST RECENT unfinished thing decide what happens next?', 'Stack use karna hai ye batane wala sawaal: kya SABSE NAYI adhoori cheez decide karti hai ki aage kya hoga?')]
      ]),
      S('Matching brackets', B => {
        const [top, bot] = col(B, [0.8, 1.2]);
        return { a: Arr(top, '{[()]}'.split(''), { w: 76 }), st: StackV(bot, { title: 'stack  (top on the right)', row: true, h: 70 }) };
      }, [
        [T('Valid Parentheses. Every closing bracket must match the most recently opened one. Most recent: that is a stack.', 'Valid Parentheses. Har closing bracket sabse haal hi mein khule bracket se match hona chahiye. Sabse haal wala: yahi toh stack hai.')],
        [T('Openers get pushed: curly, square, round.', 'Kholne wale push hote hain: curly, square, round.'), null, { seq: [0, 1, 2].map(i => o => { o.a.ptr('ch', i, 'y'); o.a.hl(i, 's'); o.st.push('{[('[i]); }), gap: 800 }],
        [T('Each closer checks the top. Round matches round: pop. Square: pop. Curly: pop. The stack is empty, so the string is valid.', 'Har band karne wala top check karta hai. Round se round match: pop. Square: pop. Curly: pop. Stack khaali hai, toh string valid hai.'), null, { seq: [3, 4, 5].map(i => o => { o.a.ptr('ch', i, 'y'); o.a.hl([i, 5 - i], 'm'); o.st.pop(); }), gap: 900 }]
      ])
    ]},
    { t: '2 · Monotonic stack', scenes: [
      S('Next warmer day', B => {
        const [top, bot] = col(B, [0.85, 1.15]);
        const [l, r] = row(bot, [1, 1]);
        return { a: Arr(top, [73, 74, 75, 71, 69, 72, 76], { w: 76, label: 'temperatures' }), st: StackV(l, { title: 'waiting days', row: true, h: 60 }), ans: Arr(r, [0, 0, 0, 0, 0, 0, 0], { w: 56, label: 'days to wait' }) };
      }, [
        [T('Daily Temperatures: for each day, how long until a warmer day? Checking forward from every day is O of n squared.', 'Daily Temperatures: har din ke liye, garam din aane mein kitne din lagenge? Har din se aage check karna O of n square hai.')],
        [T('Better: days that have not found their answer yet WAIT on a stack. When a warmer day arrives, it answers every colder day waiting on top.', 'Better: jin dino ko abhi jawab nahi mila wo stack par INTEZAAR karte hain. Jab garam din aata hai, wo upar intezaar kar rahe har thande din ko jawab de deta hai.')],
        [T('Seventy-three waits. Seventy-four is warmer: it answers seventy-three with one day. Seventy-five answers seventy-four.', 'Tihattar intezaar karta hai. Chauhattar garam hai: wo tihattar ko jawab deta hai, ek din. Pachhattar chauhattar ko jawab deta hai.'), null, { seq: [o => { o.a.ptr('i', 0, 'y'); o.st.push('73'); }, o => { o.a.ptr('i', 1, 'y'); o.st.pop(); o.ans.set(0, 1); o.st.push('74'); }, o => { o.a.ptr('i', 2, 'y'); o.st.pop(); o.ans.set(1, 1); o.st.push('75'); }], gap: 1100 }],
        [T('Seventy-one and sixty-nine are colder. They wait too. Notice the stack is always decreasing: that is why it is called monotonic.', 'Ikhattar aur unhattar thande hain. Wo bhi intezaar karte hain. Dekho stack hamesha ghat raha hai: isiliye ise monotonic kehte hain.'), null, { seq: [o => { o.a.ptr('i', 3, 'y'); o.st.push('71'); }, o => { o.a.ptr('i', 4, 'y'); o.st.push('69'); }], gap: 1100 }],
        [T('Seventy-two arrives. It answers sixty-nine, one day, and seventy-one, two days. Then seventy-six answers seventy-two and seventy-five.', 'Bahattar aata hai. Wo unhattar ko jawab deta hai, ek din, aur ikhattar ko, do din. Phir chhihattar bahattar aur pachhattar ko jawab deta hai.'), null, { seq: [o => { o.a.ptr('i', 5, 'y'); o.st.pop(); o.ans.set(4, 1); }, o => { o.st.pop(); o.ans.set(3, 2); o.st.push('72'); }, o => { o.a.ptr('i', 6, 'y'); o.st.pop(); o.ans.set(5, 1); }, o => { o.st.pop(); o.ans.set(2, 4); o.st.push('76'); }], gap: 900 }],
        [T('Every day is pushed once and popped once. O of n. Store indexes, not temperatures, so you can compute the distance.', 'Har din ek baar push hota hai aur ek baar pop. O of n. Temperature nahi, index store karo, taaki doori nikal sako.')]
      ])
    ]},
    { t: '3 · More stack tricks', scenes: [
      S('Min Stack and RPN', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Min Stack: getMin must be instant. The trick: next to every value, also store the minimum so far at that level. Popping restores the old minimum automatically.', 'Min Stack: getMin turant hona chahiye. Trick: har value ke saath, us level tak ka minimum bhi rakho. Pop karte hi purana minimum apne aap wapas aa jaata hai.'), o => Tbl(o.l, ['push', 'value', 'min so far'], [['1', '5', '5'], ['2', '3', '3'], ['3', '7', '3'], ['4', '1', '1']], { mono: [0, 1, 2] })],
        [T('Reverse Polish Notation: numbers wait on a stack. An operator pops the last two, combines them, and pushes the result. Two one plus three times is nine.', 'Reverse Polish Notation: numbers stack par intezaar karte hain. Operator aakhri do nikalta hai, jodta hai, aur result wapas push karta hai. Do ek plus teen guna, nau.'), o => Code(o.r, "if t in \"+-*/\":\n    b = st.pop()\n    a = st.pop()\n    st.append(apply(a, b, t))\nelse:\n    st.append(int(t))", { size: 18 })],
        [T('Car Fleet and Largest Rectangle in Histogram are harder uses of the same idea. Each item waits on the stack until a later item decides its fate.', 'Car Fleet aur Largest Rectangle in Histogram isi idea ke mushkil use hain. Har item stack par tab tak rukta hai jab tak koi baad wala item uski kismat decide na kare.')]
      ]),
      S('How to recognise it', B => ({ b: Bul(B, ['Matching / nesting → <span class="y">push openers, pop on closers</span>', 'Next greater / smaller → <span class="y">monotonic stack of indexes</span>', 'Expression evaluation → <span class="y">operand stack</span>', 'Need the min or max of a stack → <span class="y">store it alongside</span>'], { num: true }) }), [
        [T('Your checklist for stacks.', 'Stack ki checklist.'), null, { seq: range(0, 3).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Ask: what is waiting to be resolved, and does the newest waiting item get resolved first? If yes, use a stack.', 'Poocho: kya cheez resolve hone ka intezaar kar rahi hai, aur kya sabse nayi wali pehle resolve hoti hai? Agar haan, stack use karo.')]
      ])
    ]}
  ]
});

/* ======================= BINARY SEARCH ======================= */
E.register('binary-search', {
  id: 't-binary-search', startLabel: 'Watch: Binary Search explained',
  outro: 'Start with Binary Search, then Search a 2D Matrix.',
  notes: {
    intro: { en: 'Cut the search space in half with every question. It works on sorted data, and on any yes/no question whose answers flip exactly once (fail, fail, fail, OK, OK).', hi: "Har sawaal ke saath search space aadha karo. Ye sorted data pe chalta hai, aur har us haan/naa sawaal pe jiske jawab theek ek baar palatte hain (fail, fail, fail, OK, OK)." },
    signals: { en: ['The input is <b>sorted</b> (or rotated sorted)', 'O(log n) is required', '"Minimum X such that…" or "maximum X such that…" → <b>binary search on the answer</b>', 'First or last position of something', 'A monotonic yes/no condition'], hi: ["Input <b>sorted</b> hai (ya rotated sorted)", "O(log n) chahiye", "\"Sabse chhota X jiske liye…\" ya \"sabse bada X jiske liye…\" → <b>answer pe binary search</b>", "Kisi cheez ki pehli ya aakhri position", "Monotonic haan/naa condition"] },
    templateTitle: 'Two templates',
    template: `# Find an exact value
lo, hi = 0, len(a) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if a[mid] == target:
        return mid
    if a[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1
return -1

# Find the FIRST value where ok(x) is True
lo, hi = min_answer, max_answer
while lo < hi:
    mid = (lo + hi) // 2
    if ok(mid):
        hi = mid
    else:
        lo = mid + 1
# lo is the answer`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 4 of 18', 'Binary Search', 'Halve the problem with every question.', [
        [T('Topic four: binary search. Let us start with a game. I am thinking of a number from one to a hundred. You guess, and I say higher or lower.', 'Topic chaar: binary search. Ek game se shuru karte hain. Maine ek se sau tak ka number socha hai. Tum guess karo, main bolunga upar ya neeche.')],
        [T('The best strategy always guesses the middle. Every answer throws away half of the numbers. A hundred numbers take at most seven guesses.', 'Best strategy hamesha beech ka guess karti hai. Har jawab aadhe numbers hata deta hai. Sau numbers mein zyada se zyada saat guess.')]
      ]),
      S('Guess the number', B => {
        const [top, bot] = col(B, [1, 1]);
        return { a: Arr(top, [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], { w: 76, label: 'sorted · find 23' }), tr: Trace(bot, ['lo', 'hi', 'mid', 'a[mid]', 'decision']) };
      }, [
        [T('Find twenty-three. lo and hi mark where the answer could still be. At first, that is everything.', 'Teis dhoondho. lo aur hi batate hain ki jawab abhi kahan ho sakta hai. Shuru mein, poori list.'), o => { o.a.ptr('lo', 0, 's'); o.a.ptr('hi', 9, 'v'); }],
        [T('The middle is index four: sixteen. Too small, so the answer is to the right. lo becomes mid plus one.', 'Beech mein index chaar: solah. Chhota hai, toh jawab right mein hai. lo ban jaata hai mid plus ek.'), o => { o.a.ptr('mid', 4, 'y'); o.a.hl(4, 'y'); o.tr.row([0, 9, 4, 16, 'too small → lo = 5']); }, { seq: [o => { o.a.dim([0, 1, 2, 3, 4]); o.a.ptr('lo', 5, 's'); }], gap: 1800 }],
        [T('The middle of five to nine is seven: fifty-six. Too big. hi becomes mid minus one.', 'Paanch se nau ka beech saat hai: chhappan. Bada hai. hi ban jaata hai mid minus ek.'), o => { o.a.ptr('mid', 7, 'y'); o.a.hl(7, 'y'); o.tr.row([5, 9, 7, 56, 'too big → hi = 6']); }, { seq: [o => { o.a.dim([7, 8, 9]); o.a.ptr('hi', 6, 'v'); }], gap: 1600 }],
        [T('The middle of five and six is five: twenty-three. Found in three steps.', 'Paanch aur chhe ka beech paanch: teis. Teen steps mein mil gaya.'), o => { o.a.ptr('mid', 5, 'y'); o.a.hl(5, 'm'); o.tr.row([5, 6, 5, 23, 'found!'], 'good'); }],
        [T('Always use mid plus one and mid minus one, because mid has already been checked. And loop while lo is at most hi.', 'Hamesha mid plus ek aur mid minus ek use karo, kyunki mid already check ho chuka hai. Aur loop tab tak chalao jab tak lo, hi se chhota ya barabar hai.')]
      ])
    ]},
    { t: '2 · Beyond sorted arrays', scenes: [
      S('Binary search on the answer', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, ['✗', '✗', '✗', '✓', '✓', '✓', '✓', '✓'], { w: 70, label: 'does speed k work?  (k = 1 … 8)', noIdx: true }), bot };
      }, [
        [T('Here is the idea that unlocks the hard problems. Koko eats bananas at speed k. Ask: can she finish in time at speed k?', 'Ab wo idea jo mushkil problems kholta hai. Koko speed k se kele khaati hai. Poocho: kya wo speed k par time mein khatam kar legi?')],
        [T('Too slow fails. Fast enough works. And once a speed works, every faster speed works too. The answers look like: fail, fail, fail, OK, OK, OK.', 'Bahut slow fail. Kaafi fast chal jaata hai. Aur ek baar koi speed chal gayi, toh usse tez har speed chalegi. Jawab aise dikhte hain: fail, fail, fail, OK, OK, OK.'), o => { o.a.hl([0, 1, 2], 'c'); o.a.hl([3, 4, 5, 6, 7], 'm'); }],
        [T('We want the FIRST OK. Binary search on k itself! If mid works, the answer is mid or smaller: hi equals mid. If it fails, lo equals mid plus one.', 'Humein PEHLA OK chahiye. Toh k par hi binary search karo! Agar mid chal gaya, jawab mid ya usse chhota: hi equals mid. Fail hua toh lo equals mid plus ek.'), o => { o.a.ptr('first OK', 3, 'y'); Code(o.bot, 'while lo < hi:\n    k = (lo + hi) // 2\n    if can_finish(k):\n        hi = k\n    else:\n        lo = k + 1', { size: 20 }); }],
        [T('Whenever a problem says "find the minimum value such that…", check whether the yes and no answers split cleanly like this. If they do, binary search on the answer.', 'Jab bhi problem bole ki sabse chhoti value dhoondho jiske liye kuch sach ho, check karo ki haan aur naa aise saaf do hisson mein bante hain kya. Agar haan, jawab par binary search karo.')]
      ]),
      S('Rotated arrays', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, [4, 5, 6, 7, 0, 1, 2], { w: 80, label: 'sorted, then rotated' }), bot };
      }, [
        [T('A sorted array that was rotated: four, five, six, seven, then zero, one, two. It is no longer sorted overall. Can we still binary search?', 'Ek sorted array jo ghumaya gaya: chaar, paanch, chhe, saat, phir zero, ek, do. Ab poora sorted nahi hai. Kya phir bhi binary search ho sakta hai?')],
        [T('Yes. Cut at the middle, and at least one half is still perfectly sorted. Here the left half, four to seven, is sorted.', 'Haan. Beech se kaato, kam se kam ek aadha abhi bhi poora sorted hota hai. Yahan left half, chaar se saat, sorted hai.'), o => { o.a.ptr('mid', 3, 'y'); o.a.hl([0, 1, 2, 3], 'm'); o.a.hl([4, 5, 6], 'c'); }],
        [T('Check whether the target lies inside the sorted half\'s range. If it does, search there. If not, search the other half. Still O of log n.', 'Check karo ki target sorted half ki range mein hai kya. Hai toh wahan dhoondho. Nahi toh doosre half mein. Phir bhi O of log n.'), o => Code(o.bot, 'if a[lo] <= a[mid]:        # left half sorted\n    if a[lo] <= t < a[mid]:\n        hi = mid - 1\n    else:\n        lo = mid + 1\nelse:                        # right half sorted\n    ...  # mirror it', { size: 18 })]
      ]),
      S('How to recognise it', B => ({ b: Bul(B, ['Sorted data + find something → <span class="y">classic binary search</span>', '"Minimum / maximum X such that…" → <span class="y">search on the answer</span>', 'First or last occurrence → <span class="y">keep searching after a match</span>', 'Rotated sorted → <span class="y">find the sorted half</span>', 'Sorted 2-D matrix → <span class="y">flatten the index</span>'], { num: true }) }), [
        [T('Your checklist for binary search.', 'Binary search ki checklist.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Two classic bugs: an infinite loop from lo equals mid, and an off-by-one from lo less than hi. Trace a two-element example every time.', 'Do classic bugs: lo equals mid se infinite loop, aur lo less than hi se off-by-one. Har baar do elements wala example trace karo.')]
      ])
    ]}
  ]
});

/* ======================= SLIDING WINDOW ======================= */
E.register('sliding-window', {
  id: 't-sliding-window', startLabel: 'Watch: Sliding Window explained',
  outro: 'Start with Best Time to Buy and Sell Stock.',
  notes: {
    intro: { en: 'Keep a window [l, r] over a contiguous part of the array or string. Grow it on the right, shrink it on the left, and update the answer as it slides. Every element enters and leaves once, so it is O(n).', hi: "Array ya string ke lagatar hisse pe ek window [l, r] rakho. Right se badhao, left se chhota karo, aur sliding ke saath answer update karo. Har element ek baar aata aur ek baar jaata hai, toh O(n)." },
    signals: { en: ['"Contiguous subarray" or "substring"', '"Longest / shortest / maximum … with some condition"', 'A fixed window size k', 'Counts of characters inside a range (anagrams, permutations)'], hi: ["\"Contiguous subarray\" ya \"substring\"", "\"Sabse lamba / chhota / maximum … kisi condition ke saath\"", "Fixed window size k", "Range ke andar characters ki ginti (anagrams, permutations)"] },
    templateTitle: 'Variable window template',
    template: `l = best = 0
for r in range(len(a)):
    # 1. add a[r] to the window
    while window_is_invalid():
        # 2. remove a[l] from the window
        l += 1
    # 3. the window [l, r] is valid
    best = max(best, r - l + 1)`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 5 of 18', 'Sliding Window', 'A frame that slides over the data, never going backwards.', [
        [T('Topic five: sliding window. Picture looking at a long train through a window that shows a few carriages at a time.', 'Topic paanch: sliding window. Socho ek lambi train ko ek khidki se dekh rahe ho jo ek baar mein kuch dibbe dikhati hai.')],
        [T('Instead of recounting everything each time the window moves, you add the carriage coming in and remove the one going out.', 'Har baar window hilne par sab dobara ginne ki jagah, andar aane wala dibba jodo aur bahar jaane wala hatao.')]
      ]),
      S('Fixed window: best sum of 3', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, [2, 1, 5, 1, 3, 2], { w: 80, label: 'max sum of 3 in a row' }), v: Vars(bot) };
      }, [
        [T('Largest sum of three neighbours. Brute force re-adds three numbers for every position.', 'Teen padosiyon ka sabse bada sum. Brute force har position ke liye teen numbers dobara jodta hai.')],
        [T('Sliding: the first window, two plus one plus five, is eight.', 'Sliding: pehli window, do plus ek plus paanch, aath.'), o => { o.a.hl([0, 1, 2], 'y'); o.v.set('sum', 8); o.v.set('best', 8); }],
        [T('Slide right: add the new one, subtract the old two. Seven. Then add three, subtract one: nine. Then add two, subtract five: six.', 'Right sarko: naya jodo, purana do ghatao. Saat. Phir teen jodo, ek ghatao: nau. Phir do jodo, paanch ghatao: chhe.'), null, { seq: [[1, 7], [2, 9], [3, 6]].map(([s, sum]) => o => { o.a.clear(); o.a.hl([s, s + 1, s + 2], 'y'); o.a.dim(s - 1); o.v.set('sum', sum); if (sum > 8) o.v.set('best', sum, '', 'y'); }), gap: 1300 }],
        [T('The best is nine. Each step is O of one, so the whole thing is O of n.', 'Best hai nau. Har step O of one, toh poora kaam O of n.')]
      ]),
      S('Variable window: grow and shrink', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        return { a: Arr(top, 'abcabcbb'.split(''), { w: 72, label: 'longest substring with no repeats' }), v: Vars(bot) };
      }, [
        [T('Harder: the longest substring with no repeated letters. The window grows while it is valid, and shrinks when it breaks the rule.', 'Thoda mushkil: bina repeat letters wala sabse lamba substring. Window tab tak badhti hai jab tak valid hai, aur rule tootne par chhoti hoti hai.')],
        [T('r adds a, b, c. The window abc is valid, length three.', 'r a, b, c jodta hai. Window abc valid hai, length teen.'), null, { seq: [0, 1, 2].map(r => o => { o.a.ptr('l', 0, 's'); o.a.ptr('r', r, 'v'); o.a.hl(r, 'y'); o.v.set('best', r + 1); }), gap: 700 }],
        [T('r adds another a: a repeat! Shrink from the left until the old a leaves. Now the window is b c a. Still length three.', 'r ek aur a jodta hai: repeat! Left se chhota karo jab tak purana a bahar na jaaye. Ab window b c a hai. Phir bhi length teen.'), o => { o.a.ptr('r', 3, 'v'); o.a.hl(3, 'c'); }, { seq: [o => { o.a.un(0); o.a.dim(0); o.a.ptr('l', 1, 's'); o.a.hl(3, 'y'); }], gap: 1600 }],
        [T('Every character enters the window once and leaves once. So even with a loop inside a loop, the total work is O of n.', 'Har character window mein ek baar aata hai aur ek baar jaata hai. Toh loop ke andar loop hone par bhi kul kaam O of n hai.')],
        [T('The template: add on the right, shrink on the left while the rule is broken, then update the answer.', 'Template: right par jodo, jab tak rule toota hai left se chhota karo, phir answer update karo.'), o => Code(LH.fresh(o.v.el.parentNode, c => c), 'for r in range(n):\n    add(s[r])\n    while invalid():\n        remove(s[l]); l += 1\n    best = max(best, r - l + 1)', { size: 19 })]
      ])
    ]},
    { t: '2 · Recap', scenes: [
      S('How to recognise it', B => ({ b: Bul(B, ['"Contiguous" + longest/shortest/max → <span class="y">sliding window</span>', 'Fixed size k → <span class="y">add one, remove one</span>', 'Anagram or permutation inside a string → <span class="y">window of counts</span>', 'Max of every window → <span class="y">monotonic deque</span>', 'Buy low, sell high → <span class="y">track the minimum so far</span>'], { num: true }) }), [
        [T('Your checklist for sliding windows.', 'Sliding window ki checklist.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('For each window problem, write down in words: what makes the window invalid? That sentence becomes your while condition.', 'Har window problem ke liye shabdon mein likho: window invalid kab hoti hai? Wahi line tumhari while condition ban jaati hai.')]
      ])
    ]}
  ]
});

/* ======================= LINKED LIST ======================= */
E.register('linked-list', {
  id: 't-linked-list', startLabel: 'Watch: Linked List explained',
  outro: 'Start with Reverse Linked List. Draw the arrows on paper.',
  notes: {
    intro: { en: 'A linked list is a chain of nodes where each node knows only the next one. Most problems are pointer rewiring: save the next node, change an arrow, move on. A dummy head and fast/slow pointers solve most of them.', hi: "Linked list nodes ki chain hai jahan har node sirf agle ko jaanta hai. Zyada tar problems pointer rewiring hain: next save karo, teer badlo, aage badho. Dummy head aur fast/slow pointers zyada tar solve kar dete hain." },
    signals: { en: ['Reverse all or part of a list → <b>prev / cur / next</b>', 'Build a new list → <b>dummy head + tail</b>', 'Middle, cycle, kth from the end → <b>fast & slow pointers</b>', 'Merge sorted lists → <b>compare heads</b>'], hi: ["Poori ya aadhi list ulti karo → <b>prev / cur / next</b>", "Nayi list banao → <b>dummy head + tail</b>", "Beech, cycle, end se kth → <b>fast aur slow pointers</b>", "Sorted lists merge → <b>heads compare karo</b>"] },
    templateTitle: 'ListNode and the two core moves',
    template: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Reverse
prev, cur = None, head
while cur:
    nxt = cur.next      # 1. save
    cur.next = prev     # 2. flip the arrow
    prev = cur          # 3. move on
    cur = nxt

# Fast & slow: find the middle
slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 6 of 18', 'Linked List', 'A train where each car only knows the next one.', [
        [T('Topic six: linked lists. Picture a treasure hunt. Each clue tells you where the NEXT clue is. You cannot jump to clue five. You must follow the chain.', 'Topic chhe: linked lists. Ek treasure hunt socho. Har clue batata hai ki AGLA clue kahan hai. Tum seedha clue paanch par nahi kood sakte. Chain follow karni padti hai.')],
        [T('Each node holds a value and a pointer called next. The last node points to None.', 'Har node mein ek value aur next naam ka pointer hota hai. Aakhri node None ki taraf point karta hai.')]
      ]),
      S('Nodes and arrows', B => {
        const [top, bot] = col(B, [1, 1]);
        return { big: Big(top, '[1] → [2] → [3] → [4] → None', { size: 42 }), bot };
      }, [
        [T('This is a list: one, two, three, four. We hold only the head, the first node.', 'Ye list hai: ek, do, teen, chaar. Hum sirf head pakadte hain, pehla node.')],
        [T('To visit everything, start at the head and follow next until you reach None.', 'Sab dekhne ke liye, head se shuru karo aur next follow karte jao jab tak None na aa jaaye.'), o => Code(o.bot, 'cur = head\nwhile cur:\n    print(cur.val)\n    cur = cur.next', { size: 20 })],
        [T('Unlike an array, there are no indexes. Reaching position k takes k steps. But inserting or removing in the middle is just rewiring arrows: O of one, once you are there.', 'Array ki tarah yahan index nahi hai. Position k tak pahunchne mein k steps lagte hain. Par beech mein daalna ya hatana bas teer badalna hai: wahan pahunch gaye toh O of one.')]
      ]),
      S('Reversing: flip every arrow', B => {
        const [top, bot] = col(B, [0.8, 1.2]);
        const [l, r] = row(bot, [1, 1]);
        return { big: Big(top, 'None ← ? &nbsp;&nbsp; [1] → [2] → [3] → None', { size: 34 }), c: Code(l, 'nxt = cur.next\ncur.next = prev\nprev = cur\ncur = nxt', { size: 21 }), v: Vars(r) };
      }, [
        [T('Reverse Linked List is the most important linked list skill. Three pointers: prev starts at None, cur at the head, and next is a temporary.', 'Reverse Linked List sabse zaroori linked list skill hai. Teen pointers: prev None se shuru, cur head par, aur next ek temporary.'), o => { o.v.set('prev', 'None'); o.v.set('cur', '1'); }],
        [T('Step one: SAVE next, or you lose the rest of the list. Step two: point cur backwards, to prev. Step three: move prev and cur forward.', 'Step ek: next SAVE karo, warna baaki list kho jaayegi. Step do: cur ko peeche, prev ki taraf point karao. Step teen: prev aur cur ko aage badhao.'), o => o.c.hl(1, 2, 3, 4)],
        [T('After node one: None, arrow, one. The rest, two and three, is still safe in next.', 'Node ek ke baad: None, teer, ek. Baaki, do aur teen, next mein safe hai.'), o => { o.big.set('None ← [1] &nbsp;&nbsp; [2] → [3] → None'); o.v.set('prev', '1'); o.v.set('cur', '2', '', 'y'); }],
        [T('After node two, and node three. prev is the new head.', 'Node do ke baad, aur node teen ke baad. prev naya head hai.'), null, { seq: [o => { o.big.set('None ← [1] ← [2] &nbsp;&nbsp; [3] → None'); o.v.set('prev', '2'); o.v.set('cur', '3', '', 'y'); }, o => { o.big.set('None ← [1] ← [2] ← [3]'); o.v.set('prev', '3', 'new head', 'm'); o.v.set('cur', 'None'); }], gap: 1400 }],
        [T('Draw this on paper at least once. Linked list bugs are almost always a lost pointer.', 'Ise kam se kam ek baar kagaz par banao. Linked list ke bugs lagbhag hamesha kho gaye pointer ki wajah se hote hain.')]
      ])
    ]},
    { t: '2 · Two big tricks', scenes: [
      S('The dummy node', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Trick one: the dummy node. When building or editing a list, the head itself might change. A fake node placed before the head means the head is never a special case.', 'Trick ek: dummy node. List banate ya badalte waqt, head khud badal sakta hai. Head se pehle ek nakli node rakh do, toh head kabhi special case nahi banta.'), o => Big(o.l, '[dummy] → [1] → [2] → …', { size: 32 })],
        [T('Merge Two Sorted Lists: tail starts at the dummy, attaches the smaller head each step, and at the end you return dummy dot next.', 'Merge Two Sorted Lists: tail dummy se shuru hota hai, har step chhota head jodta hai, aur aakhir mein dummy dot next return karo.'), o => Code(o.r, 'dummy = tail = ListNode()\n# … attach nodes to tail.next …\nreturn dummy.next', { size: 19 })]
      ]),
      S('Fast and slow pointers', B => {
        const [top, bot] = col(B, [1, 1]);
        return { a: Arr(top, [1, 2, 3, 4, 5, 6, 7], { w: 76, label: 'slow moves 1, fast moves 2', noIdx: true }), bot };
      }, [
        [T('Trick two: fast and slow pointers. Slow moves one step, fast moves two.', 'Trick do: fast aur slow pointers. Slow ek step chalta hai, fast do.'), o => { o.a.ptr('slow', 0, 's'); o.a.ptr('fast', 0, 'y'); }],
        [T('When fast reaches the end, slow is exactly in the middle.', 'Jab fast end par pahunchta hai, slow theek beech mein hota hai.'), null, { seq: [[1, 2], [2, 4], [3, 6]].map(([s, f]) => o => { o.a.ptr('slow', s, 's'); o.a.ptr('fast', f, 'y'); if (f === 6) o.a.hl(3, 'm'); }), gap: 1000 }],
        [T('And if the list has a cycle, fast laps slow and they meet, like two runners on a circular track. That is Linked List Cycle, in O of one space.', 'Aur agar list mein cycle hai, toh fast slow ko lap karke mil jaata hai, jaise gol track par do runners. Yahi hai Linked List Cycle, O of one space mein.'), o => Card(o.bot, { icon: '🏃', title: 'Runners on a track', body: 'On a loop, the faster runner always catches the slower one.', c: 'y' })],
        [T('A related trick: to find the kth node from the end, start one pointer k steps ahead, then move both together.', 'Ek related trick: end se kth node dhoondhne ke liye, ek pointer k steps aage se shuru karo, phir dono saath chalao.')]
      ]),
      S('How to recognise it', B => ({ b: Bul(B, ['Reverse → <span class="y">prev / cur / next</span>', 'Build or edit, where the head may change → <span class="y">dummy node</span>', 'Middle, cycle → <span class="y">fast & slow</span>', 'kth from the end → <span class="y">pointers with a gap</span>', 'Complex rewiring → <span class="y">split into middle + reverse + merge</span>'], { num: true }) }), [
        [T('Your checklist for linked lists.', 'Linked lists ki checklist.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Always check the edge cases: an empty list, one node, two nodes. And draw the arrows before you code.', 'Hamesha edge cases check karo: khaali list, ek node, do nodes. Aur code se pehle teer bana lo.')]
      ])
    ]}
  ]
});
})();
