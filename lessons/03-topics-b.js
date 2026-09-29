(function () {
  const T = E.T;
const { row, col, Txt, Big, Title, Card, Bul, Code, Arr, Tbl, Vars, KV, StackV, QueueV, Grid, Out, Trace } = E;
const { S, fresh, range, intro, Graph, Tree } = LH;

/* ======================= TREES ======================= */
E.register('trees', {
  id: 't-trees', startLabel: 'Watch: Trees explained',
  outro: 'Start with Invert Binary Tree. Think: what does ONE node need to do?',
  notes: {
    intro: { en: 'A binary tree is a node with up to two children, each of which is itself a tree. So almost every tree problem is recursion: decide what one node does, and trust the calls on its children.', hi: "Binary tree ek node hai jiske zyada se zyada do bachche hain, aur har bachcha khud ek tree hai. Toh lagbhag har tree problem recursion hai: tay karo ek node kya karta hai, aur bachchon pe calls pe bharosa rakho." },
    signals: { en: ['Something computed from the children (height, size, balanced) → <b>DFS returning a value</b>', 'Something depending on the path from the root (max so far, valid range) → <b>DFS passing a value down</b>', 'Best path anywhere (diameter, max path sum) → <b>DFS + a global best</b>', 'Level by level, nearest first, right side view → <b>BFS with a queue</b>', 'BST (left &lt; node &lt; right) → use the order: go left or right, in-order = sorted'], hi: ["Bachchon se nikla kuch (height, size, balanced) → <b>value return karne wala DFS</b>", "Root se raaste pe depend kuch (ab tak max, valid range) → <b>value neeche bhejne wala DFS</b>", "Kahin bhi best path (diameter, max path sum) → <b>DFS + global best</b>", "Level by level, sabse paas pehle, right side view → <b>queue ke saath BFS</b>", "BST (left &lt; node &lt; right) → order use karo: left ya right jao, in-order = sorted"] },
    templateTitle: 'TreeNode, DFS and BFS',
    template: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# DFS: answer from the children
def height(node):
    if node is None:            # base case
        return 0
    return 1 + max(height(node.left), height(node.right))

# BFS: level by level
from collections import deque
def levels(root):
    res, q = [], deque([root] if root else [])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 7 of 18', 'Trees', 'Every node is the root of a smaller tree.', [
        [T('Topic seven: trees, the biggest section of DSA 150. Think of a family tree, or the folders on your computer: one folder contains smaller folders, which contain even smaller ones.', 'Topic saat: trees, DSA 150 ka sabse bada section. Family tree socho, ya computer ke folders: ek folder ke andar chhote folders, unke andar aur chhote.')],
        [T('That "contains a smaller copy of itself" shape is exactly why recursion from video two fits trees perfectly.', 'Ye apne andar apni hi chhoti copy wala shape hi wajah hai ki recursion trees par perfect baithta hai.')]
      ]),
      S('Tree vocabulary', B => {
        const [l, r] = row(B, [1.3, 1]);
        return { t: Tree(l, [3, 9, 20, null, null, 15, 7]), r };
      }, [
        [T('The top node is the root. Here it is three.', 'Sabse upar wala node root hai. Yahan wo teen hai.'), o => { o.t.hl('0', 'y'); o.t.note('0', 'root', 'y'); }],
        [T('Each node has at most two children: left and right. Nine and twenty are the children of three.', 'Har node ke zyada se zyada do bachche hote hain: left aur right. Nau aur bees, teen ke bachche hain.'), o => { o.t.hl(['1', '2'], 's'); }],
        [T('Nodes with no children are leaves: nine, fifteen and seven.', 'Jin nodes ke bachche nahi, wo leaves hain: nau, pandrah aur saat.'), o => { o.t.hl(['1', '5', '6'], 'm'); ['1', '5', '6'].forEach(i => o.t.note(i, 'leaf', 'm')); }],
        [T('The depth is the number of levels: three here. And the key insight: the part under twenty is itself a complete little tree.', 'Depth matlab kitne levels: yahan teen. Aur asli baat: bees ke neeche wala hissa khud ek poora chhota tree hai.'), o => { o.t.clear(); o.t.hl(['2', '5', '6'], 'v'); Card(o.r, { icon: '🌳', title: 'Subtree', body: 'Every node is the root of its own smaller tree. That is why recursion fits.', c: 'v' }); }]
      ])
    ]},
    { t: '2 · Depth-first', scenes: [
      S('Ask your children', B => {
        const [l, r] = row(B, [1.3, 1]);
        return { t: Tree(l, [3, 9, 20, null, null, 15, 7]), r };
      }, [
        [T('Maximum depth. Don\'t try to see the whole tree at once. Think about ONE node: my depth is one plus the deeper of my two children.', 'Maximum depth. Poora tree ek saath dekhne ki koshish mat karo. Sirf EK node ke baare mein socho: meri depth hai ek plus mere do bachchon mein se gehre wale ki depth.'), o => Code(o.r, 'def depth(n):\n    if n is None:\n        return 0\n    return 1 + max(depth(n.left),\n                   depth(n.right))', { size: 20 })],
        [T('Leaves ask their children, which are None. None answers zero, so each leaf has depth one.', 'Leaves apne bachchon se poochti hain, jo None hain. None zero bolta hai, toh har leaf ki depth ek.'), null, { seq: ['1', '5', '6'].map(i => o => { o.t.hl(i, 'm'); o.t.note(i, '1', 'm'); }), gap: 700 }],
        [T('Twenty gets one and one from its children, so it answers two. The root gets one and two, so the answer is three.', 'Bees ko bachchon se ek aur ek milta hai, toh wo do bolta hai. Root ko ek aur do milta hai, toh jawab teen.'), null, { seq: [o => { o.t.hl('2', 'y'); o.t.note('2', '2', 'y'); }, o => { o.t.hl('0', 'y'); o.t.note('0', '3', 'y'); }], gap: 1300 }],
        [T('This is the magic of recursion: trust that the call on each child returns the right answer, and just combine the answers.', 'Yahi recursion ka jaadu hai: bharosa karo ki har bachche par call sahi jawab laayegi, aur bas jawab jod do.')]
      ]),
      S('Three visiting orders', B => {
        const [l, r] = row(B, [1.2, 1]);
        return { t: Tree(l, [4, 2, 6, 1, 3, 5, 7]), r };
      }, [
        [T('Depth-first search can visit a node before, between or after its children.', 'Depth-first search node ko bachchon se pehle, beech mein, ya baad mein visit kar sakta hai.')],
        [T('Pre-order visits the node, then left, then right: four, two, one, three, six, five, seven. It is used for copying and serialising trees.', 'Pre-order pehle node, phir left, phir right: chaar, do, ek, teen, chhe, paanch, saat. Tree copy aur serialise karne mein kaam aata hai.'), o => { o.t.clear(); ['0', '1', '3', '4', '2', '5', '6'].forEach((id, k) => o.t.note(id, String(k + 1), 's')); o.o = Out(o.r, { title: 'Visit order' }); o.o.p('pre:  4 2 1 3 6 5 7'); }],
        [T('In-order visits left, node, right: one, two, three, four, five, six, seven. Sorted! For a binary search tree, in-order always gives sorted order.', 'In-order left, node, right: ek, do, teen, chaar, paanch, chhe, saat. Sorted! Binary search tree mein in-order hamesha sorted order deta hai.'), o => { o.t.clear(); ['3', '1', '4', '0', '5', '2', '6'].forEach((id, k) => o.t.note(id, String(k + 1), 'y')); o.o.p('in:   1 2 3 4 5 6 7  ← sorted'); }],
        [T('Post-order visits the children first, then the node. It is used when a node needs its children\'s answers, like depth.', 'Post-order pehle bachche, phir node. Jab node ko bachchon ke jawab chahiye, jaise depth, tab ye use hota hai.'), o => { o.t.clear(); ['3', '4', '1', '5', '6', '2', '0'].forEach((id, k) => o.t.note(id, String(k + 1), 'm')); o.o.p('post: 1 3 2 5 7 6 4'); }]
      ]),
      S('Three DFS shapes', B => {
        const [a, b, c] = row(B, [1, 1, 1]);
        return { a, b, c };
      }, [
        [T('Almost every tree problem uses one of three shapes. Shape one: return an answer UP from the children. Depth, balanced, same tree.', 'Lagbhag har tree problem teen shapes mein se ek hai. Shape ek: bachchon se jawab UPAR bhejo. Depth, balanced, same tree.'), o => { Card(o.a, { icon: '⬆️', title: 'Return up', body: 'Combine the children\'s answers.', c: 'y' }); Code(o.a, 'return 1 + max(l, r);', { size: 16 }); }],
        [T('Shape two: pass information DOWN from the root. Count Good Nodes passes the maximum so far. Validate BST passes the allowed range.', 'Shape do: root se jaankari NEECHE bhejo. Count Good Nodes ab tak ka maximum bhejta hai. Validate BST allowed range bhejta hai.'), o => { Card(o.b, { icon: '⬇️', title: 'Pass down', body: 'Each call gets what it needs from above.', c: 's' }); Code(o.b, 'dfs(n.left, max(m, n.val))', { size: 16 }); }],
        [T('Shape three: a global best. Diameter and Max Path Sum return one thing to the parent, but update a best answer that lives outside.', 'Shape teen: ek global best. Diameter aur Max Path Sum parent ko ek cheez return karte hain, par bahar rakhe best answer ko update karte hain.'), o => { Card(o.c, { icon: '🏆', title: 'Global best', body: 'Return one thing, record another.', c: 'm' }); Code(o.c, 'best = max(best, l + r)\nreturn 1 + max(l, r)', { size: 16 }); }]
      ])
    ]},
    { t: '3 · Breadth-first & BSTs', scenes: [
      S('Level by level with a queue', B => {
        const [l, r] = row(B, [1.2, 1]);
        return { t: Tree(l, [3, 9, 20, null, null, 15, 7]), q: QueueV(r, { title: 'queue (front on the left)' }), o: Out(r, { title: 'levels', h: 130 }) };
      }, [
        [T('Breadth-first search visits the tree level by level, like ripples in water. It uses a queue: first in, first out.', 'Breadth-first search tree ko level by level dekhta hai, jaise paani mein lehrein. Ye queue use karta hai: pehle aaya, pehle gaya.')],
        [T('Start with the root in the queue. Take it out, record it, and add its children.', 'Queue mein root se shuru karo. Use nikalo, note karo, aur uske bachche daal do.'), null, { seq: [o => o.q.enq('3'), o => { o.q.deq(); o.t.hl('0', 'y'); o.o.p('[3]'); o.q.enq('9'); o.q.enq('20'); }], gap: 1200 }],
        [T('The trick for separating the levels: at the start of each round, the queue holds exactly one level. Process that many nodes.', 'Levels alag karne ki trick: har round ki shuruaat mein queue mein theek ek level hota hai. Utne hi nodes process karo.'), null, { seq: [o => { o.q.deq(); o.q.deq(); o.t.hl(['1', '2'], 's'); o.o.p('[9, 20]'); o.q.enq('15'); o.q.enq('7'); }, o => { o.q.deq(); o.q.deq(); o.t.hl(['5', '6'], 'm'); o.o.p('[15, 7]'); }], gap: 1400 }],
        [T('Use BFS for level order, right side view, and anything about "nearest" or "minimum depth".', 'Level order, right side view, aur sabse paas ya minimum depth wale sawaalon ke liye BFS use karo.')]
      ]),
      S('Binary search trees', B => {
        const [l, r] = row(B, [1.2, 1]);
        return { t: Tree(l, [8, 3, 10, 1, 6, null, 14]), r };
      }, [
        [T('A binary search tree adds one rule: everything on the left is smaller, and everything on the right is bigger. At every single node.', 'Binary search tree ek rule jodta hai: left mein sab chhota, right mein sab bada. Har ek node par.'), o => Big(o.r, 'left &lt; node &lt; right', { size: 36 })],
        [T('Search for six. Six is less than eight: go left. Six is more than three: go right. Found! Just like binary search.', 'Chhe dhoondho. Chhe aath se chhota: left jao. Chhe teen se bada: right jao. Mil gaya! Bilkul binary search jaisa.'), null, { seq: [o => o.t.hl('0', 'y'), o => o.t.hl('1', 'y'), o => o.t.hl('4', 'm')], gap: 900 }],
        [T('Careful: validating a BST means checking every node against a RANGE from its ancestors, not only against its parent.', 'Dhyaan do: BST validate karne ka matlab har node ko uske purvajon se mili RANGE se check karna hai, sirf parent se nahi.'), o => Card(o.r, { icon: '⚠️', title: 'Common trap', body: 'A grandchild can break the rule even when every parent-child pair looks fine.', c: 'c' })]
      ]),
      S('How to recognise it', B => ({ b: Bul(B, ['From the children up → <span class="y">DFS returning a value</span>', 'From the root down → <span class="y">DFS with parameters</span>', 'Best path anywhere → <span class="y">DFS + global best</span>', 'Levels, nearest, right view → <span class="y">BFS with a queue</span>', 'BST → <span class="y">go left/right by value; in-order is sorted</span>'], { num: true }) }), [
        [T('Your checklist for trees.', 'Trees ki checklist.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Always start with the base case: what should an empty tree return? Then ask what ONE node does with its children\'s answers.', 'Hamesha base case se shuru karo: khaali tree kya return kare? Phir poocho ki EK node apne bachchon ke jawab ke saath kya karta hai.')]
      ])
    ]}
  ]
});

/* ======================= TRIES ======================= */
const TRIE = {
  nodes: [
    { id: 'root', x: 330, y: 40, label: '•' }, { id: 'c', x: 200, y: 120, label: 'c' }, { id: 'd', x: 470, y: 120, label: 'd' },
    { id: 'ca', x: 200, y: 200, label: 'a' }, { id: 'do', x: 470, y: 200, label: 'o' },
    { id: 'cat', x: 120, y: 280, label: 't' }, { id: 'car', x: 280, y: 280, label: 'r' }, { id: 'dog', x: 470, y: 280, label: 'g' },
    { id: 'cart', x: 280, y: 360, label: 't' }
  ],
  edges: [['root', 'c'], ['root', 'd'], ['c', 'ca'], ['d', 'do'], ['ca', 'cat'], ['ca', 'car'], ['do', 'dog'], ['car', 'cart']]
};
E.register('tries', {
  id: 't-tries', startLabel: 'Watch: Tries explained',
  outro: 'Start with Implement Trie.',
  notes: {
    intro: { en: 'A trie stores words letter by letter along paths from a root, so words that share a prefix share the same path. Prefix questions take time proportional to the word, not the number of words.', hi: "Trie words ko root se raaston pe letter-by-letter rakhta hai, toh same prefix wale words same raasta share karte hain. Prefix sawaal word ki length jitna time lete hain, words ki ginti jitna nahi." },
    signals: { en: ['"startsWith", prefixes, autocomplete', 'Many words searched at once (Word Search II)', 'Wildcards like "." inside words', 'Dictionary lookups character by character'], hi: ["\"startsWith\", prefixes, autocomplete", "Ek saath bahut words dhoondhna (Word Search II)", "Words ke andar \".\" jaise wildcards", "Character-by-character dictionary lookups"] },
    templateTitle: 'Trie in Python',
    template: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False        # a word finishes here

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        cur = self.root
        for ch in word:
            cur = cur.children.setdefault(ch, TrieNode())
        cur.end = True

    def starts_with(self, prefix):
        cur = self.root
        for ch in prefix:
            if ch not in cur.children:
                return False
            cur = cur.children[ch]
        return True`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 8 of 18', 'Tries', 'Words that share a beginning share a path.', [
        [T('Topic eight: tries, also called prefix trees. When you type c, a on your phone, it suggests cat, car, cart. That is a trie at work.', 'Topic aath: tries, jinhe prefix trees bhi kehte hain. Phone par c, a type karo, wo cat, car, cart suggest karta hai. Wahi trie ka kaam hai.')],
        [T('Instead of storing whole words, a trie stores letters along paths. Words with the same beginning share the same path.', 'Poore words rakhne ki jagah, trie raaste par letters rakhta hai. Same shuruaat wale words same raasta share karte hain.')]
      ]),
      S('Building a trie', B => {
        const [l, r] = row(B, [1.3, 1]);
        return { g: Graph(l, Object.assign({ w: 600, h: 400, r: 24 }, TRIE)), r };
      }, [
        [T('Here is the trie for cat, car, cart and dog. The root is empty. Each edge adds one letter.', 'Ye cat, car, cart aur dog ka trie hai. Root khaali hai. Har edge ek letter jodti hai.'), o => Bul(o.r, ['cat', 'car', 'cart', 'dog'], { shown: true })],
        [T('Insert cat: c, a, t. Mark the final t as the end of a word.', 'cat daalo: c, a, t. Aakhri t ko word ka end mark karo.'), o => { o.g.hl(['c', 'ca', 'cat'], 'y'); o.g.note('cat', 'end', 'y'); }],
        [T('Insert car: c and a already exist, so we reuse them. Only r is new. That sharing is the whole point.', 'car daalo: c aur a pehle se hain, toh wahi use karo. Sirf r naya hai. Yahi sharing poora point hai.'), o => { o.g.clear(); o.g.note('cat', 'end'); o.g.hl(['c', 'ca'], 's'); o.g.hl('car', 'y'); o.g.note('car', 'end', 'y'); }],
        [T('Cart continues past car. So r is the end of a word, AND it has a child. That is why we need an end flag, not just "is it a leaf?"', 'cart car ke aage chalta hai. Toh r ek word ka end bhi hai, AUR uska bachcha bhi hai. Isiliye end flag chahiye, sirf leaf hai kya se kaam nahi chalega.'), o => { o.g.clear(); o.g.note('cat', 'end'); o.g.note('car', 'end', 'y'); o.g.hl('cart', 'y'); o.g.note('cart', 'end', 'y'); o.g.note('dog', 'end'); }]
      ]),
      S('Search vs startsWith', B => {
        const [l, r] = row(B, [1.3, 1]);
        return { g: Graph(l, Object.assign({ w: 600, h: 400, r: 24 }, TRIE)), v: Vars(r, { title: 'query' }) };
      }, [
        [T('search car: walk c, a, r. The path exists and r is marked as an end. True.', 'car search karo: c, a, r chalo. Raasta hai aur r end mark hai. True.'), o => { ['cat', 'car', 'cart', 'dog'].forEach(i => o.g.note(i, 'end')); o.g.hl(['c', 'ca', 'car'], 'm'); o.v.set('search("car")', 'true', '', 'm'); }],
        [T('search ca: the path exists, but a is not an end. False. But startsWith ca is true, because the path exists.', 'ca search karo: raasta hai, par a end nahi hai. False. Par startsWith ca true hai, kyunki raasta maujood hai.'), o => { o.g.clear(); ['cat', 'car', 'cart', 'dog'].forEach(i => o.g.note(i, 'end')); o.g.hl(['c', 'ca'], 'y'); o.v.set('search("ca")', 'false', '', 'c'); o.v.set('startsWith("ca")', 'true', '', 'm'); }],
        [T('search cab: there is no b under a, so we stop immediately. Every operation costs only the length of the word, no matter how many words are stored.', 'cab search karo: a ke neeche b hai hi nahi, toh turant ruk jao. Har operation sirf word ki length jitna kharcha karta hai, chahe kitne bhi words stored hon.'), o => { o.g.clear(); ['cat', 'car', 'cart', 'dog'].forEach(i => o.g.note(i, 'end')); o.g.hl(['c', 'ca'], 'c'); o.v.set('search("cab")', 'false', '', 'c'); }]
      ])
    ]},
    { t: '2 · Harder uses', scenes: [
      S('Wildcards and Word Search II', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Add and Search Words allows a dot that matches any letter. At a dot, you do not know which child to follow, so you try ALL of them with recursion.', 'Add and Search Words mein dot kisi bhi letter se match hota hai. Dot par pata nahi kaunsa bachcha lena hai, toh recursion se SAB try karo.'), o => Code(o.l, "def dfs(node, i):\n    if i == len(word):\n        return node.end\n    if word[i] == '.':\n        return any(dfs(kid, i + 1)\n                   for kid in node.children.values())\n    # normal letter: follow one child", { size: 17, title: 'idea' })],
        [T('Word Search II finds many words in a letter grid. Put all the words in a trie, then walk the grid and the trie TOGETHER. The moment a path is not a prefix of any word, stop.', 'Word Search II letter grid mein bahut saare words dhoondhta hai. Saare words trie mein daalo, phir grid aur trie SAATH mein chalo. Jaise hi raasta kisi word ka prefix na rahe, ruk jao.'), o => Card(o.r, { icon: '🔠', title: 'Grid + trie', body: 'One search for all words, with instant pruning of dead prefixes.', c: 'y' })],
        [T('Checklist: prefixes, autocomplete and many-word searches mean a trie. Remember the end flag, and remember that a map of children works for any alphabet.', 'Checklist: prefix, autocomplete aur bahut words ki search matlab trie. End flag yaad rakho, aur bachchon ki dictionary kisi bhi alphabet ke liye chalti hai.'), o => Bul(o.r, ['prefixes / autocomplete', 'many words at once', 'wildcards → DFS over children'], { shown: true, sm: true })]
      ])
    ]}
  ]
});

/* ======================= HEAP ======================= */
E.register('heap', {
  id: 't-heap', startLabel: 'Watch: Heap / Priority Queue explained',
  outro: 'Start with Kth Largest Element in a Stream.',
  notes: {
    intro: { en: 'A heap always gives you the smallest (or largest) item in O(1), and adds or removes items in O(log n). Python has one built in: the heapq module, a min-heap stored in a normal list. For a max-heap, push negative values.', hi: "Heap hamesha sabse chhota (ya sabse bada) item O(1) mein deta hai, aur items O(log n) mein jodta ya hatata hai. Python mein built-in hai: heapq module, normal list mein rakha min-heap. Max-heap ke liye negative values push karo." },
    signals: { en: ['"k-th largest / smallest", "top k" → <b>heap of size k</b>', 'Repeatedly take the smallest or largest → <b>heap</b>', 'Median of a stream → <b>two heaps</b>', 'Merge k sorted lists, schedulers → <b>heap of the current fronts</b>', 'Shortest paths with weights (Dijkstra) → <b>min-heap</b>'], hi: ["\"k-th largest / smallest\", \"top k\" → <b>size k ka heap</b>", "Baar-baar sabse chhota ya bada lo → <b>heap</b>", "Stream ka median → <b>do heaps</b>", "k sorted lists merge, schedulers → <b>abhi ke fronts ka heap</b>", "Weights ke saath shortest path (Dijkstra) → <b>min-heap</b>"] },
    templateTitle: 'heapq cheat sheet',
    templateFile: 'heap.py',
    template: `import heapq

h = []
heapq.heappush(h, 5)     # push
heapq.heappush(h, 1)
smallest = h[0]          # peek: O(1)
x = heapq.heappop(h)     # pop smallest: O(log n)
heapq.heapify(nums)      # list -> heap in O(n)

# Max-heap: push negatives
heapq.heappush(h, -value)
largest = -heapq.heappop(h)

# Size-k min-heap keeps the k LARGEST values
for x in nums:
    heapq.heappush(h, x)
    if len(h) > k:
        heapq.heappop(h)
kth_largest = h[0]`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 9 of 18', 'Heap / Priority Queue', 'The most important item is always on top.', [
        [T('Topic nine: heaps. Think of a hospital emergency room. Patients are not treated in arrival order. The most urgent one always goes next.', 'Topic nau: heaps. Hospital ka emergency room socho. Mareez aane ke order mein nahi dekhe jaate. Sabse urgent wala hamesha pehle.')],
        [T('A heap is that waiting room. The smallest item, or the largest for a max-heap, is always on top, ready in O of one.', 'Heap wahi waiting room hai. Sabse chhota item, ya max-heap mein sabse bada, hamesha upar hota hai, O of one mein taiyaar.')]
      ]),
      S('A tree stored in a list', B => {
        const [top, bot] = col(B, [1.3, 0.8]);
        return { t: Tree(top, [1, 3, 2, 7, 4, 5], { h: 300 }), a: Arr(bot, [1, 3, 2, 7, 4, 5], { w: 70, label: 'the same heap as a list' }) };
      }, [
        [T('This is a min-heap. The only rule: every parent is smaller than or equal to its children. So the root is the minimum.', 'Ye min-heap hai. Bas ek rule: har parent apne bachchon se chhota ya barabar. Toh root minimum hai.'), o => o.t.hl('0', 'm')],
        [T('It is not fully sorted. Three and two are not in order, and that is fine. The rule only compares parents with their children.', 'Ye poora sorted nahi hai. Teen aur do order mein nahi, aur ye theek hai. Rule sirf parent ko bachchon se compare karta hai.')],
        [T('It is stored in a plain list, level by level. For index i, the children are at two i plus one and two i plus two. The parent is i minus one, divided by two.', 'Ye ek simple list mein level by level rakha jaata hai. Index i ke bachche do i plus ek aur do i plus do par. Parent i minus ek, bata do.'), o => { o.a.hl(1, 'y'); o.a.hl([3, 4], 's'); o.t.hl('1', 'y'); o.t.hl(['3', '4'], 's'); }]
      ]),
      S('Push: bubble up', B => {
        const [top, bot] = col(B, [1.3, 0.8]);
        return { top, bot };
      }, [
        [T('Push zero. Put it at the end of the list, the next free spot in the tree.', 'Zero push karo. Use list ke end mein rakho, tree ki agli khaali jagah.'), o => { o.t = Tree(o.top, [1, 3, 2, 7, 4, 5, 0], { h: 300 }); o.t.hl('6', 'y'); o.a = Arr(o.bot, [1, 3, 2, 7, 4, 5, 0], { w: 64 }); o.a.hl(6, 'y'); }],
        [T('Zero is smaller than its parent two, so they swap. Zero is smaller than its new parent one, so they swap again. Zero reaches the top.', 'Zero apne parent do se chhota hai, toh swap. Zero naye parent ek se bhi chhota, phir swap. Zero top par pahunch gaya.'), null, { seq: [o => { o.t.label('6', '2'); o.t.label('2', '0'); o.t.hl('2', 'y'); o.t.un('6'); o.a.swap(2, 6); }, o => { o.t.label('2', '1'); o.t.label('0', '0'); o.t.hl('0', 'y'); o.t.un('2'); o.a.swap(0, 2); }], gap: 1500 }],
        [T('It climbs at most the height of the tree, which is log n. So push is O of log n.', 'Ye zyada se zyada tree ki height tak chadhta hai, jo log n hai. Toh push O of log n.')]
      ]),
      S('Pop: sink down', B => {
        const [top, bot] = col(B, [1.3, 0.8]);
        return { t: Tree(top, [1, 3, 2, 7, 4, 5], { h: 300 }), bot };
      }, [
        [T('Pop removes the top, the minimum one. To fill the hole, move the LAST item, five, up to the root.', 'Pop top wala, minimum, hatata hai. Khaali jagah bharne ke liye AAKHRI item, paanch, ko root par le aao.'), null, { seq: [o => o.t.hl('0', 'c'), o => { o.t.label('0', '5'); o.t.hl('0', 'y'); o.t.hl('5', 'dim'); }], gap: 1300 }],
        [T('Five is bigger than its smaller child, two. Swap them. Now five is at the bottom. Done. The new minimum, two, is on top.', 'Paanch apne chhote bachche do se bada hai. Swap. Ab paanch neeche hai. Ho gaya. Naya minimum, do, upar hai.'), null, { seq: [o => { o.t.label('0', '2'); o.t.label('2', '5'); o.t.hl('0', 'm'); o.t.hl('2', 'y'); }], gap: 1500 }],
        [T('Also O of log n. Push and pop in log n, peek in O of one. In Python, the heapq module gives you exactly this: heappush, heappop, and index zero to peek.', 'Ye bhi O of log n. Push aur pop log n mein, peek O of one mein. Python mein heapq module bilkul yahi deta hai: heappush, heappop, aur peek ke liye index zero.')]
      ])
    ]},
    { t: '2 · Patterns', scenes: [
      S('Top k with a size-k heap', B => {
        const [top, bot] = col(B, [0.9, 1.1]);
        const [l, r] = row(bot, [1, 1]);
        return { a: Arr(top, [3, 2, 1, 5, 6, 4], { w: 76, label: 'find the 2nd largest' }), h: StackV(l, { title: 'min-heap, size ≤ 2', row: true, h: 60 }), v: Vars(r) };
      }, [
        [T('Kth largest. Surprisingly, you use a MIN-heap and keep only k items. The smallest of the top k sits on top, and it IS the kth largest.', 'Kth largest. Hairani ki baat, MIN-heap use karte hain aur sirf k items rakhte hain. Top k mein sabse chhota upar baithta hai, aur wahi kth largest HAI.')],
        [T('Push three, push two. Push one: now there are three items, so pop the smallest. The heap keeps only the two largest seen so far.', 'Teen push, do push. Ek push: ab teen items hain, toh sabse chhota pop karo. Heap ab tak ke sirf do sabse bade rakhta hai.'), null, { seq: [o => { o.a.ptr('x', 0, 'y'); o.h.clear(); o.h.push('3'); }, o => { o.a.ptr('x', 1, 'y'); o.h.clear(); o.h.push('2'); o.h.push('3'); }, o => { o.a.ptr('x', 2, 'y'); o.h.clear(); o.h.push('2'); o.h.push('3'); }], gap: 1100 }],
        [T('Five pushes out two. Six pushes out three. Four pushes out four itself. The top is five: the second largest.', 'Paanch do ko bahar karta hai. Chhe teen ko. Chaar khud chaar ko bahar karta hai. Top paanch hai: doosra sabse bada.'), null, { seq: [o => { o.a.ptr('x', 3, 'y'); o.h.clear(); o.h.push('3'); o.h.push('5'); }, o => { o.a.ptr('x', 4, 'y'); o.h.clear(); o.h.push('5'); o.h.push('6'); }, o => { o.a.ptr('x', 5, 'y'); o.v.set('answer', 5, 'heap top', 'y'); }], gap: 1100 }],
        [T('O of n log k, and only k memory. For the k smallest, flip it: use a max-heap of size k.', 'O of n log k, aur sirf k memory. k sabse chhote ke liye ulta karo: k size ka max-heap.')]
      ]),
      S('Two heaps: running median', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Find Median from Data Stream splits the numbers into two halves. A max-heap holds the smaller half, and a min-heap holds the bigger half.', 'Find Median from Data Stream numbers ko do hisson mein baantta hai. Max-heap chhota aadha rakhta hai, min-heap bada aadha.'), o => Big(o.l, '[1 2 3] | [4 5 6]<br><span class="s">max-heap</span> &nbsp; <span class="m">min-heap</span>', { size: 34 })],
        [T('Their tops sit right in the middle. Keep the sizes balanced, and the median is either one top or the average of the two.', 'Unke top theek beech mein baithte hain. Size balanced rakho, aur median ya toh ek top hai ya dono ka average.'), o => Card(o.r, { icon: '⚖️', title: 'Balance the halves', body: 'Sizes differ by at most one. The median is at the tops.', c: 'y' })],
        [T('Checklist: top k, kth anything, repeatedly taking the smallest or largest, merging k sorted streams, and running medians all mean a heap.', 'Checklist: top k, kth kuch bhi, baar-baar sabse chhota ya bada nikalna, k sorted streams merge karna, aur running median, sab ka matlab heap.'), o => Bul(o.r, ['top k / kth → size-k heap', 'repeat "take smallest" → heap', 'median stream → two heaps', 'merge k sorted → heap of fronts'], { shown: true, sm: true })]
      ])
    ]}
  ]
});

/* ======================= BACKTRACKING ======================= */
const SUBSET_TREE = ['∅', '1', '∅', '12', '1', '2', '∅', '123', '12', '13', '1', '23', '2', '3', '∅'];
E.register('backtracking', {
  id: 't-backtracking', startLabel: 'Watch: Backtracking explained',
  outro: 'Start with Subsets. Draw the decision tree first.',
  notes: {
    intro: { en: 'Backtracking builds a solution one choice at a time. Choose, explore everything that follows, then undo the choice and try the next one. It systematically visits every branch of a decision tree, and prunes the branches that cannot work.', hi: "Backtracking solution ek-ek choice karke banata hai. Chuno, aage ka sab explore karo, phir choice undo karo aur agli try karo. Ye decision tree ki har branch systematically dekhta hai, aur jo branches kaam nahi kar sakti unhe kaat deta hai." },
    signals: { en: ['"Return ALL subsets / combinations / permutations / arrangements"', 'Small n (≤ 20) with exponential output', 'Puzzles with constraints (N-Queens, Sudoku, word search in a grid)', 'Partitioning a string in every possible way'], hi: ["\"SAARE subsets / combinations / permutations / arrangements return karo\"", "Chhota n (≤ 20) aur exponential output", "Constraints wali puzzles (N-Queens, Sudoku, grid mein word search)", "String ko har possible tareeke se todna"] },
    templateTitle: 'Choose → explore → unchoose',
    template: `res, cur = [], []

def backtrack(start):
    res.append(cur[:])               # record (copy!)
    for i in range(start, len(nums)):
        # if i > start and nums[i] == nums[i - 1]: continue  # skip duplicates (sorted)
        cur.append(nums[i])          # choose
        backtrack(i + 1)             # explore (i for reuse, i + 1 for no reuse)
        cur.pop()                    # unchoose

backtrack(0)`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 10 of 18', 'Backtracking', 'Try a choice, explore, undo, try the next.', [
        [T('Topic ten: backtracking. Imagine exploring a maze. At every fork you pick a path. At a dead end, you walk BACK to the last fork and try the other path.', 'Topic das: backtracking. Maze explore karna socho. Har mod par ek raasta chunte ho. Dead end par, pichhle mod par WAPAS jao aur doosra raasta try karo.')],
        [T('In code: make a choice, explore everything that follows from it, then undo the choice. That undo step is what "backtracking" means.', 'Code mein: ek choice karo, usse aage ka sab explore karo, phir choice undo karo. Wahi undo step backtracking kehlata hai.')]
      ]),
      S('The decision tree', B => {
        const [l, r] = row(B, [1.7, 1]);
        return { t: Tree(l, SUBSET_TREE, { w: 760, h: 420, r: 26 }), r };
      }, [
        [T('Subsets of one, two, three. At the first level we decide: take one, or skip it.', 'Ek, do, teen ke subsets. Pehle level par decide karo: ek lo, ya chhodo.'), o => o.t.hl(['1', '2'], 's')],
        [T('Next level: take two or skip it. Then three. Every path from the top to the bottom is one complete set of choices.', 'Agla level: do lo ya chhodo. Phir teen. Upar se neeche tak har raasta choices ka ek poora set hai.'), o => o.t.hl(['3', '4', '5', '6'], 'v')],
        [T('The eight leaves are the eight subsets: two to the power three, exactly as the counting rule from video one says.', 'Aath leaves hi aath subsets hain: do ki power teen, bilkul counting rule jaisa.'), o => { o.t.hl(['7', '8', '9', '10', '11', '12', '13', '14'], 'm'); Card(o.r, { icon: '🌲', title: 'Draw it first', body: 'Before coding, draw two levels of the decision tree. The code mirrors the drawing.', c: 'y' }); }]
      ]),
      S('Choose, explore, unchoose', B => {
        const [l, r] = row(B, [1.1, 1]);
        return { c: Code(l, 'def dfs(i):\n    if i == n: res.append(cur[:]); return\n    cur.append(nums[i])   # choose\n    dfs(i + 1)            # explore\n    cur.pop()             # unchoose\n    dfs(i + 1)            # explore without it', { size: 20 }), a: Arr(r, [], { w: 70, label: 'cur (the current path)', noIdx: true }), o: Out(r, { title: 'recorded', h: 170 }) };
      }, [
        [T('This is the whole template. Watch cur grow and shrink like a stack.', 'Ye poora template hai. Dekho cur stack ki tarah badhta aur ghatta hai.')],
        [T('Choose one, choose two, choose three: record one, two, three. Undo three: record one, two. Undo two, choose three: record one, three.', 'Ek chuno, do chuno, teen chuno: ek, do, teen note karo. Teen undo: ek, do note karo. Do undo, teen chuno: ek, teen note karo.'), null, { seq: [o => { o.c.hl(3); o.a.push(1); }, o => o.a.push(2), o => o.a.push(3), o => { o.c.hl(2); o.o.p('[1, 2, 3]'); }, o => { o.c.hl(5); o.a.pop(); o.o.p('[1, 2]'); }, o => { o.a.pop(); o.a.push(3); o.o.p('[1, 3]'); }], gap: 900 }],
        [T('The most common bug: adding cur itself to the results. It keeps changing! Always add a COPY.', 'Sabse common bug: cur ko hi results mein daal dena. Wo badalta rehta hai! Hamesha COPY daalo.'), o => o.c.note(2, 'copy!', 'c')]
      ])
    ]},
    { t: '2 · Variations', scenes: [
      S('Permutations, pruning, duplicates', B => {
        const [a, b, c] = row(B, [1, 1, 1]);
        return { a, b, c };
      }, [
        [T('Permutations: the order matters, so at each level try EVERY unused number, and track the used ones with a boolean list.', 'Permutations: order matter karta hai, toh har level par HAR unused number try karo, aur used wale boolean list se track karo.'), o => { Card(o.a, { icon: '🔀', title: 'Permutations', body: 'Loop over all items. Skip the used ones.', c: 's' }); Code(o.a, 'if used[i]: continue', { size: 16 }); }],
        [T('Pruning: stop a branch as soon as it cannot succeed. In Combination Sum, once the total exceeds the target, there is no point going deeper.', 'Pruning: branch ko tab rok do jab wo safal ho hi na sake. Combination Sum mein, total target se aage gaya toh aur gehre jaane ka fayda nahi.'), o => { Card(o.b, { icon: '✂️', title: 'Prune early', body: 'A dead branch is cut before it grows.', c: 'y' }); Code(o.b, 'if total > target: return', { size: 16 }); }],
        [T('Duplicates in the input: sort first, and at the same level skip a value equal to the previous one. That prevents identical branches.', 'Input mein duplicates: pehle sort karo, aur same level par pichhle jaisi value skip karo. Isse ek jaisi branches nahi banti.'), o => { Card(o.c, { icon: '♊', title: 'Duplicates', body: 'Sort, then skip repeats at the same level.', c: 'm' }); Code(o.c, 'if i > start and \\\n   a[i] == a[i-1]: continue', { size: 16 }); }]
      ]),
      S('How to recognise it', B => ({ b: Bul(B, ['"All" subsets / combinations → <span class="y">take or skip each item</span>', '"All" orderings → <span class="y">loop over the unused items</span>', 'Reuse allowed → <span class="y">recurse with i, not i + 1</span>', 'Duplicates → <span class="y">sort + skip at the same level</span>', 'Grid puzzles → <span class="y">mark visited, explore, unmark</span>'], { num: true }) }), [
        [T('Your checklist for backtracking.', 'Backtracking ki checklist.'), null, { seq: range(0, 4).map(i => o => o.b.show(i)), gap: 900 }],
        [T('Backtracking is exponential by nature. That is fine: these problems have small inputs. Look for n of twenty or less.', 'Backtracking nature se exponential hai. Koi baat nahi: in problems ke input chhote hote hain. n bees ya kam dekho.')]
      ])
    ]}
  ]
});

/* ======================= GRAPHS ======================= */
const G1 = { nodes: [{ id: 'A', x: 90, y: 90 }, { id: 'B', x: 260, y: 60 }, { id: 'C', x: 420, y: 110 }, { id: 'D', x: 150, y: 260 }, { id: 'E', x: 330, y: 280 }, { id: 'F', x: 500, y: 280 }],
  edges: [['A', 'B'], ['A', 'D'], ['B', 'C'], ['B', 'E'], ['D', 'E'], ['C', 'F']] };
E.register('graphs', {
  id: 't-graphs', startLabel: 'Watch: Graphs explained',
  outro: 'Start with Number of Islands.',
  notes: {
    intro: { en: 'A graph is a set of nodes connected by edges: cities and roads, people and friendships, courses and prerequisites. Grids are graphs too, where each cell connects to its 4 neighbours. Almost every problem is DFS, BFS, topological sort or union-find, plus a visited set.', hi: "Graph edges se jude nodes ka set hai: shehar aur sadakein, log aur dosti, courses aur prerequisites. Grids bhi graphs hain, jahan har cell apne 4 padosiyon se juda hai. Lagbhag har problem DFS, BFS, topological sort ya union-find hai, saath mein visited set." },
    signals: { en: ['Grid of cells, islands, regions → <b>DFS/BFS flood fill</b>', 'Fewest steps, spreading over time → <b>BFS</b> (multi-source if many starts)', 'Prerequisites, ordering, cycle in directed graph → <b>topological sort</b>', 'Connected groups, redundant edge, is it a tree → <b>union-find</b>', 'Copying a graph → <b>map from original to clone</b>'], hi: ["Cells ka grid, islands, regions → <b>DFS/BFS flood fill</b>", "Sabse kam steps, time ke saath failna → <b>BFS</b> (kai starts ho toh multi-source)", "Prerequisites, ordering, directed graph mein cycle → <b>topological sort</b>", "Jude groups, faaltu edge, kya ye tree hai → <b>union-find</b>", "Graph copy karna → <b>original se clone ki dictionary</b>"] },
    templateTitle: 'Grid DFS and BFS',
    template: `DIRS = [(1, 0), (-1, 0), (0, 1), (0, -1)]

# DFS flood fill
def dfs(g, r, c):
    if not (0 <= r < len(g) and 0 <= c < len(g[0])) or g[r][c] != 1:
        return
    g[r][c] = 2                      # mark visited
    for dr, dc in DIRS:
        dfs(g, r + dr, c + dc)

# BFS: distances from a start cell
from collections import deque
q = deque([(sr, sc)])
dist = {(sr, sc): 0}
while q:
    r, c = q.popleft()
    for dr, dc in DIRS:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in dist:
            dist[(nr, nc)] = dist[(r, c)] + 1
            q.append((nr, nc))`
  },
  chapters: [
    { t: '1 · The idea', scenes: [
      intro('Topic 11 of 18', 'Graphs', 'Things, and the connections between them.', [
        [T('Topic eleven: graphs. A map of cities joined by roads. People joined by friendships. Courses joined by prerequisites. They are all graphs: nodes and edges.', 'Topic gyaarah: graphs. Sadakon se jude shehron ka naksha. Dosti se jude log. Prerequisites se jude courses. Sab graphs hain: nodes aur edges.')],
        [T('Trees are just graphs with no cycles. The big new danger in graphs is cycles: you can walk in circles forever. So we always track what we have visited.', 'Trees bas bina cycle wale graphs hain. Graphs mein naya bada khatra cycle hai: tum hamesha gol-gol ghoom sakte ho. Isliye hum hamesha track karte hain ki kya visit ho chuka.')]
      ]),
      S('Storing a graph', B => {
        const [l, r] = row(B, [1.2, 1]);
        return { g: Graph(l, Object.assign({ w: 600, h: 340 }, G1)), kv: KV(r, { title: 'adjacency list' }) };
      }, [
        [T('The most common way to store a graph is an adjacency list: a map from each node to its neighbours.', 'Graph store karne ka sabse common tareeka adjacency list hai: har node se uske padosiyon tak ki dictionary.')],
        [T('A connects to B and D. B connects to A, C and E. And so on.', 'A, B aur D se juda hai. B, A, C aur E se. Aise hi aage.'), null, { seq: [['A', 'B, D'], ['B', 'A, C, E'], ['C', 'B, F'], ['D', 'A, E'], ['E', 'B, D'], ['F', 'C']].map(([k, v]) => o => { o.g.clear(); o.g.hl(k, 'y'); o.kv.set(k, v); o.kv.hl(k); }), gap: 700 }],
        [T('Problems often give you a list of edge pairs. Your first step is usually to build this map.', 'Problems aksar edge pairs ki list dete hain. Pehla step aam taur par yahi dictionary banana hai.'), o => { o.g.clear(); o.kv.hl(''); }]
      ]),
      S('DFS: go deep first', B => {
        const [l, r] = row(B, [1.2, 1]);
        return { g: Graph(l, Object.assign({ w: 600, h: 340 }, G1)), v: Vars(r, { title: 'visited' }), o: Out(r, { title: 'visit order', h: 70 }) };
      }, [
        [T('Depth-first search goes as deep as possible before backing up, like walking a maze with one hand on the wall.', 'Depth-first search peeche aane se pehle jitna gehra ho sake jaata hai, jaise ek haath deewar par rakh ke maze chalna.')],
        [T('Start at A. Go to B, then C, then F. F is a dead end, so back up to B and go to E. From E, D. Everything is visited.', 'A se shuru. B jao, phir C, phir F. F dead end hai, toh B par wapas aao aur E jao. E se D. Sab visit ho gaya.'), null, { seq: [['A'], ['B', 'A'], ['C', 'B'], ['F', 'C'], ['E', 'B'], ['D', 'E']].map(([n, from], k) => o => { o.g.hl(n, 'y'); if (from) o.g.edge(from, n, 'y'); o.g.note(n, String(k + 1), 'y'); o.o.w((k ? ' ' : '') + n); o.v.set('size', k + 1); }), gap: 900 }],
        [T('When D looks back at A, A is already visited, so we skip it. Without the visited set, we would go around the loop A, B, E, D forever.', 'Jab D, A ki taraf dekhta hai, A already visited hai, toh skip. Visited set ke bina hum A, B, E, D ke loop mein hamesha ghoomte rehte.'), o => o.g.edge('D', 'A', 'c')]
      ])
    ]},
    { t: '2 · Grids', scenes: [
      S('Islands: flood fill', B => {
        const [l, r] = row(B, [1, 1]);
        const map = [[1, 1, 0, 0, 1], [1, 0, 0, 1, 1], [0, 0, 1, 0, 0], [0, 1, 1, 0, 1]];
        return { map, g: Grid(l, 4, 5, { size: 70, fill: (a, b) => map[a][b] ? '🟫' : '' }), v: Vars(r) };
      }, [
        [T('A grid is a graph: each cell connects to its four neighbours. Number of Islands counts the groups of connected land.', 'Grid bhi graph hai: har cell apne chaar padosiyon se juda. Number of Islands judi hui zameen ke groups ginta hai.')],
        [T('Scan the cells. At unvisited land, count a new island, then flood fill the whole island so it is never counted again.', 'Cells scan karo. Unvisited zameen mile toh naya island gino, phir poora island flood fill kar do taaki dobara na gina jaaye.'), o => o.v.set('islands', 0)],
        [T('Island one. Island two. Island three. Island four.', 'Island ek. Island do. Island teen. Island chaar.'), null, { seq: [[[0, 0], [0, 1], [1, 0]], [[0, 4], [1, 3], [1, 4]], [[2, 2], [3, 1], [3, 2]], [[3, 4]]].map((cells, k) => o => { cells.forEach(([a, b]) => o.g.hl(a, b, ['y', 's', 'm', 'v'][k])); o.v.set('islands', k + 1, '', 'y'); }), gap: 1100 }],
        [T('Every cell is visited once: O of rows times columns. The same flood fill solves Max Area of Island, Surrounded Regions and Pacific Atlantic.', 'Har cell ek baar visit hota hai: O of rows guna columns. Yahi flood fill Max Area of Island, Surrounded Regions aur Pacific Atlantic solve karta hai.')]
      ]),
      S('BFS: ripples and shortest steps', B => {
        const [l, r] = row(B, [1, 1]);
        return { g: Grid(l, 4, 5, { size: 70 }), r };
      }, [
        [T('Breadth-first search spreads like ripples in a pond. Everything one step away, then two steps, then three.', 'Breadth-first search talaab mein lehron ki tarah failta hai. Pehle ek step door sab, phir do, phir teen.'), o => o.g.set(1, 1, '0', 'y')],
        [T('Because it explores in order of distance, the first time BFS reaches a cell is the shortest path to it.', 'Kyunki ye doori ke order mein explore karta hai, BFS jab pehli baar kisi cell tak pahunchta hai wahi shortest path hai.'), null, { seq: [1, 2, 3, 4].map(d => o => { for (let a = 0; a < 4; a++) for (let b = 0; b < 5; b++) if (Math.abs(a - 1) + Math.abs(b - 1) === d) o.g.set(a, b, String(d), ['s', 'm', 'v', 'c'][d - 1]); }), gap: 900 }],
        [T('Start with several cells in the queue at once, and you get multi-source BFS: Rotting Oranges and Walls and Gates, where everything spreads at the same time.', 'Queue mein ek saath kai cells se shuru karo, toh multi-source BFS milta hai: Rotting Oranges aur Walls and Gates, jahan sab ek saath failta hai.'), o => Card(o.r, { icon: '🌊', title: 'BFS = shortest steps', body: 'Use it whenever every step costs the same.', c: 's' })]
      ])
    ]},
    { t: '3 · Ordering & groups', scenes: [
      S('Topological sort', B => {
        const [l, r] = row(B, [1.2, 1]);
        const nodes = [{ id: '0', x: 90, y: 170, label: 'Math' }, { id: '1', x: 290, y: 80, label: 'Code' }, { id: '2', x: 290, y: 270, label: 'Logic' }, { id: '3', x: 500, y: 170, label: 'DSA' }];
        return { g: Graph(l, { nodes, edges: [['0', '1'], ['0', '2'], ['1', '3'], ['2', '3']], directed: true, w: 600, h: 340, r: 34, mk: 'topo' }), kv: KV(r, { title: 'in-degree (arrows in)' }), o: Out(r, { title: 'order', h: 70 }) };
      }, [
        [T('Course Schedule: some courses must come before others. The arrows form a directed graph. Can we find an order?', 'Course Schedule: kuch courses doosron se pehle hone chahiye. Teer ek directed graph banate hain. Kya koi order mil sakta hai?'), o => { o.kv.set('Math', 0); o.kv.set('Code', 1); o.kv.set('Logic', 1); o.kv.set('DSA', 2); }],
        [T('Count the arrows coming into each course. Courses with zero incoming arrows can be taken now. Math is ready.', 'Har course mein aane wale teer gino. Zero aane wale teer wale courses abhi le sakte ho. Math taiyaar hai.'), o => { o.g.hl('0', 'y'); o.kv.hl('Math'); }],
        [T('Take Math, and remove its arrows. Code and Logic drop to zero, so they are ready. Take them. DSA drops to zero. Take it.', 'Math lo, aur uske teer hata do. Code aur Logic zero par aa gaye, toh taiyaar. Unhe lo. DSA zero par aaya. Use lo.'), null, { seq: [o => { o.o.w('Math'); o.g.hl('0', 'm'); o.kv.set('Code', 0); o.kv.set('Logic', 0); o.g.hl(['1', '2'], 'y'); }, o => { o.o.w(' → Code → Logic'); o.g.hl(['1', '2'], 'm'); o.kv.set('DSA', 0); o.g.hl('3', 'y'); }, o => { o.o.w(' → DSA'); o.g.hl('3', 'm'); }], gap: 1400 }],
        [T('If some courses never reach zero, there is a cycle, and finishing is impossible. This is Kahn\'s algorithm.', 'Agar kuch courses kabhi zero tak nahi pahunchte, toh cycle hai, aur khatam karna impossible hai. Ye Kahn ka algorithm hai.')]
      ]),
      S('Union-Find', B => {
        const [l, r] = row(B, [1, 1]);
        return { l, r };
      }, [
        [T('Union-Find keeps track of groups. Each node points to a parent, and the root of a chain names the group.', 'Union-Find groups ka hisaab rakhta hai. Har node ek parent ki taraf point karta hai, aur chain ka root group ka naam hai.'), o => Code(o.l, 'def find(x):\n    while parent[x] != x:\n        parent[x] = parent[parent[x]]\n        x = parent[x]\n    return x', { size: 19 })],
        [T('To join two groups, point one root at the other. If an edge connects two nodes that already share a root, that edge closes a cycle. That is Redundant Connection and Graph Valid Tree.', 'Do groups jodne ke liye ek root ko doosre ki taraf point karao. Agar koi edge aise do nodes jodti hai jinka root pehle se same hai, toh wo edge cycle band karti hai. Yahi Redundant Connection aur Graph Valid Tree hai.'), o => Card(o.r, { icon: '🤝', title: 'Same root = same group', body: 'An edge inside a group creates a cycle.', c: 'y' })],
        [T('Checklist: grids and regions mean flood fill. Fewest steps means BFS. Prerequisites mean topological sort. Groups and cycles in undirected graphs mean union-find.', 'Checklist: grids aur regions matlab flood fill. Sabse kam steps matlab BFS. Prerequisites matlab topological sort. Undirected graph mein groups aur cycles matlab union-find.'), o => Bul(o.r, ['grid regions → DFS', 'fewest steps → BFS', 'dependencies → topo sort', 'groups / cycles → union-find'], { shown: true, sm: true })]
      ])
    ]}
  ]
});

/* ======================= ADVANCED GRAPHS ======================= */
const WG = { nodes: [{ id: 'S', x: 80, y: 180 }, { id: 'A', x: 250, y: 70 }, { id: 'B', x: 250, y: 290 }, { id: 'C', x: 440, y: 70 }, { id: 'T', x: 540, y: 250 }],
  edges: [['S', 'A', 4], ['S', 'B', 1], ['B', 'A', 2], ['A', 'C', 1], ['B', 'T', 7], ['C', 'T', 2]] };
E.register('advanced-graphs', {
  id: 't-advanced-graphs', startLabel: 'Watch: Advanced Graphs explained',
  outro: 'Start with Network Delay Time (Dijkstra).',
  notes: {
    intro: { en: 'When edges have weights (costs, times, prices), plain BFS is no longer enough. Dijkstra finds the cheapest paths with a min-heap, Prim builds the cheapest network, Bellman-Ford handles a limit on steps, and topological sort orders dependencies.', hi: "Jab edges ke weights hon (cost, time, price), simple BFS kaafi nahi. Dijkstra min-heap se sabse saste raaste dhoondhta hai, Prim sabse sasta network banata hai, Bellman-Ford steps ki limit sambhalta hai, aur topological sort dependencies ka order nikalta hai." },
    signals: { en: ['Shortest path, non-negative weights → <b>Dijkstra + min-heap</b>', 'Shortest path with at most k edges → <b>Bellman-Ford, k + 1 rounds</b>', 'Connect everything at minimum total cost → <b>MST (Prim / Kruskal)</b>', 'Order letters or tasks from rules → <b>topological sort</b>', 'Use every edge exactly once → <b>Eulerian path (Hierholzer)</b>'], hi: ["Shortest path, non-negative weights → <b>Dijkstra + min-heap</b>", "Zyada se zyada k edges wala shortest path → <b>Bellman-Ford, k + 1 rounds</b>", "Sab kuch kam se kam kul cost mein jodo → <b>MST (Prim / Kruskal)</b>", "Rules se letters ya tasks ka order → <b>topological sort</b>", "Har edge theek ek baar use karo → <b>Eulerian path (Hierholzer)</b>"] },
    templateTitle: 'Dijkstra',
    template: `import heapq
# adj[u] = list of (v, weight)
dist = {}
heap = [(0, start)]                  # (distance, node)
while heap:
    d, u = heapq.heappop(heap)
    if u in dist:
        continue                     # already final
    dist[u] = d
    for v, w in adj[u]:
        if v not in dist:
            heapq.heappush(heap, (d + w, v))`
  },
  chapters: [
    { t: '1 · Dijkstra', scenes: [
      intro('Topic 12 of 18', 'Advanced Graphs', 'Roads with costs: cheapest paths and cheapest networks.', [
        [T('Topic twelve: advanced graphs. Now every road has a cost: minutes, rupees or kilometres. Your maps app solves exactly these problems.', 'Topic barah: advanced graphs. Ab har sadak ki keemat hai: minute, rupaye ya kilometre. Tumhara maps app bilkul yahi problems solve karta hai.')],
        [T('BFS counts steps. But with weights, the path with the fewest steps is not always the cheapest one.', 'BFS steps ginta hai. Par weights ke saath, sabse kam steps wala raasta hamesha sabse sasta nahi hota.')]
      ]),
      S('Cheapest path first', B => {
        const [l, r] = row(B, [1.3, 1]);
        return { g: Graph(l, Object.assign({ w: 620, h: 360 }, WG)), o: Out(r, { title: 'min-heap pops (dist, node)', h: 220 }), r };
      }, [
        [T('Find the cheapest cost from S to every node. Going directly from S to A costs four, but S to B to A costs only three!', 'S se har node tak sabse sasti keemat dhoondho. S se seedha A chaar ka hai, par S se B se A sirf teen ka!'), o => { o.g.edge('S', 'A', 'c'); o.g.edge('S', 'B', 'm'); o.g.edge('B', 'A', 'm'); }],
        [T('Dijkstra\'s rule: always finalise the closest unfinished node next. A min-heap hands it to you.', 'Dijkstra ka rule: hamesha sabse paas wala adhoora node agla final karo. Min-heap wo tumhe de deta hai.'), o => { o.g.clear(); o.g.note('S', '0', 'y'); o.g.hl('S', 'y'); o.o.p('pop (0, S)  → final'); }],
        [T('Pop B at one. From B, A costs three and T costs eight. Pop A at three. From A, C costs four. Pop C at four. From C, T costs six, cheaper than eight. Pop T at six.', 'B ko ek par pop karo. B se A teen ka aur T aath ka. A ko teen par pop. A se C chaar. C ko chaar par pop. C se T chhe, aath se sasta. T ko chhe par pop.'), null, { seq: [
          o => { o.g.hl('B', 'y'); o.g.note('B', '1', 'y'); o.g.edge('S', 'B'); o.o.p('pop (1, B)  → final'); },
          o => { o.g.hl('A', 'y'); o.g.note('A', '3', 'y'); o.g.edge('B', 'A'); o.o.p('pop (3, A)  → final'); },
          o => { o.g.hl('C', 'y'); o.g.note('C', '4', 'y'); o.g.edge('A', 'C'); o.o.p('pop (4, C)  → final'); },
          o => { o.g.hl('T', 'm'); o.g.note('T', '6', 'm'); o.g.edge('C', 'T', 'm'); o.o.p('pop (6, T)  → final'); o.o.p('old (8, T) popped later → skip'); }], gap: 1500 }],
        [T('A node is final when it is POPPED, not when it is pushed. Older, more expensive copies may still be in the heap. Just skip them. O of E log V.', 'Node tab final hota hai jab wo POP hota hai, push hone par nahi. Purani, mehngi copies heap mein reh sakti hain. Unhe bas skip karo. O of E log V.')]
      ])
    ]},
    { t: '2 · The other tools', scenes: [
      S('Limits, networks, orders', B => {
        const [a, b] = row(B, [1, 1]);
        const [c, d] = row(B, [1, 1]);
        return { a, b, c, d };
      }, [
        [T('Cheapest Flights Within K Stops adds a limit. Bellman-Ford relaxes every edge once per round. Round i finds the best prices using at most i flights. Run exactly k plus one rounds.', 'Cheapest Flights Within K Stops ek limit jodta hai. Bellman-Ford har round mein har edge ek baar relax karta hai. Round i zyada se zyada i flights se best price deta hai. Theek k plus ek rounds chalao.'), o => Card(o.a, { icon: '✈️', title: 'Bellman-Ford', body: 'k + 1 rounds of "can this flight make a price cheaper?" Copy the prices each round.', c: 's' })],
        [T('Min Cost to Connect All Points wants a network, not a path: a Minimum Spanning Tree. Prim grows the network by always adding the cheapest connection to a new point.', 'Min Cost to Connect All Points raasta nahi, network chahta hai: Minimum Spanning Tree. Prim hamesha naye point tak ka sabse sasta connection jodkar network badhata hai.'), o => Card(o.b, { icon: '🕸️', title: 'Prim (MST)', body: 'Grow a tree. Add the cheapest edge to an unconnected node.', c: 'y' })],
        [T('Alien Dictionary derives letter order from sorted words: compare neighbouring words, add an edge for the first difference, then topological sort.', 'Alien Dictionary sorted words se letters ka order nikalta hai: padosi words compare karo, pehle farak par edge jodo, phir topological sort.'), o => Card(o.c, { icon: '🔤', title: 'Topological sort', body: 'Rules like "a before b" become edges. A cycle means impossible.', c: 'm' })],
        [T('Reconstruct Itinerary uses every ticket exactly once. That is an Eulerian path, found with a post-order DFS called Hierholzer\'s algorithm.', 'Reconstruct Itinerary har ticket theek ek baar use karta hai. Ye Eulerian path hai, jo post-order DFS se milta hai, jise Hierholzer ka algorithm kehte hain.'), o => Card(o.d, { icon: '🧳', title: 'Hierholzer', body: 'DFS, and add each airport to the route once it runs out of tickets. Reverse at the end.', c: 'v' })]
      ]),
      S('Which algorithm when?', B => ({ t: Tbl(B, ['the problem wants…', 'use', 'cost'], [
        ['fewest steps, all steps cost 1', 'BFS', 'O(V + E)'],
        ['cheapest path, weights ≥ 0', 'Dijkstra + min-heap', 'O(E log V)'],
        ['cheapest path with ≤ k edges', 'Bellman-Ford (k + 1 rounds)', 'O(k · E)'],
        ['connect all nodes cheaply', 'Prim / Kruskal (MST)', 'O(E log V)'],
        ['an order that respects rules', 'Topological sort', 'O(V + E)'],
        ['use every edge once', 'Hierholzer (Eulerian path)', 'O(E log E)']
      ], { hidden: true, mono: [2] }) }), [
        [T('Here is the decision table. Screenshot it.', 'Ye decision table hai. Iska screenshot le lo.'), null, { seq: range(0, 5).map(i => o => { o.t.show(i); o.t.hl(i); }), gap: 900 }],
        [T('Read the problem, find which row it matches, and start from that template. The hard part is recognising the row. The code is always similar.', 'Problem padho, dekho kaunsi row match karti hai, aur us template se shuru karo. Mushkil kaam row pehchaanna hai. Code hamesha milta-julta hota hai.')]
      ])
    ]}
  ]
});
})();
