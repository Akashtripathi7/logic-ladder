from typing import List, Optional, Dict, Set, Tuple
from collections import deque, Counter, defaultdict
import heapq, bisect, math

_state = {'checks': 0, 'fails': []}


def _norm(v):
    if isinstance(v, float):
        return round(v, 5)
    if isinstance(v, (list, tuple)):
        return [_norm(x) for x in v]
    if isinstance(v, dict):
        return {k: _norm(x) for k, x in v.items()}
    if isinstance(v, set):
        return sorted(_norm(x) for x in v)
    return v


def check(actual, expected, label=''):
    _state['checks'] += 1
    if _norm(actual) != _norm(expected):
        _state['fails'].append(f'{label} got {actual!r}, expected {expected!r}')


def check_u(actual, expected, sort_inner=True):
    """Order-insensitive comparison of result lists."""
    def norm(xs):
        return sorted(repr(sorted(x) if (sort_inner and isinstance(x, list)) else x) for x in xs)
    _state['checks'] += 1
    if norm(actual) != norm(expected):
        _state['fails'].append(f'(unordered) got {actual!r}, expected {expected!r}')


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def build_list(values):
    head = None
    for v in reversed(values):
        head = ListNode(v, head)
    return head


def list_to_array(head):
    out = []
    while head:
        out.append(head.val)
        head = head.next
    return out


def build_tree(values):
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    q, i = deque([root]), 1
    while q and i < len(values):
        node = q.popleft()
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i]); q.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i]); q.append(node.right)
        i += 1
    return root


def tree_to_array(root):
    out, q = [], deque([root])
    while q:
        n = q.popleft()
        if n is None:
            out.append(None); continue
        out.append(n.val)
        q.append(n.left); q.append(n.right)
    while out and out[-1] is None:
        out.pop()
    return out
