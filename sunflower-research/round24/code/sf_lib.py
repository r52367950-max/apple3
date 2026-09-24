#!/usr/bin/env python3
"""
sf_lib.py -- small, verified library for (3-)sunflower research.   (round 24, constructions agent F)

REPRESENTATION
  A *family* is a list of distinct frozensets over arbitrary hashable labels.
  Internally many routines convert to bitmasks (Python ints) via `to_masks`.

DEFINITIONS USED (all standard)
  * r-sunflower: r distinct sets whose pairwise intersections are all equal (empty core allowed).
  * For 3 distinct sets A,B,C: they form a sunflower  <=>  no point lies in exactly two of them
    ("multiplicity-2 witness").  This is the test used everywhere.
  * F_T = {A in F : T subset A} (containment count), link(F,Y) = {A \\ Y : Y subset A in F}.
  * spread(F) = max R such that |F_T| <= R^{-|T|} |F| for every nonempty T
              = min_{T != 0, F_T != 0} (|F|/|F_T|)^{1/|T|}.   (uniform measure)
    It suffices to minimise over *closed* T (T = intersection of all members containing T).
  * shifted spread = max beta with |F_T| <= beta^{-(|T|-1)} |F| for all T with |T|>=2
    (singletons impose nothing; this is the quantity preserved by substitution, see F_constructions.md).

MAIN FUNCTIONS (each documented below)
  checking      : is_sunflower, find_sunflower3, find_sunflower3_brute, find_sunflower_r, is_3sf,
                  is_intersecting, matching_number, cover_number
  links/cells   : link, anchored_cells
  spread        : spread, spread_profile, shifted_spread, core_extraction, measure_spread
  constructions : triangle, ahs_seed, two_triangles, disjoint_union, product, substitute,
                  iterate_substitution, lsz, lsz_general, alphabet_family
  tree formulas : substitution_spread_dp  (exact spread of iterated substitution, no enumeration)
  statistics    : sunflower_triple_count (P(D=0)), entropy_ratio

All randomised searches live in separate experiment scripts; this file is deterministic.
Self-test: `python3 sf_lib.py` runs the regression checks at the bottom.
"""
from __future__ import annotations
import itertools as it
import math
from collections import Counter, defaultdict
from fractions import Fraction

# ----------------------------------------------------------------------------------------------
# basic conversions
# ----------------------------------------------------------------------------------------------

def fam(sets):
    """Canonicalise: list of frozensets; raises if duplicates."""
    F = [frozenset(s) for s in sets]
    if len(set(F)) != len(F):
        raise ValueError("family has repeated members")
    return F


def ground(F):
    """Sorted list of ground elements (sorted by repr for mixed labels)."""
    return sorted(set().union(*F), key=repr) if F else []


def to_masks(F, order=None):
    """Return (masks, labels): masks[i] is the bitmask of F[i] w.r.t. labels (list)."""
    labels = order if order is not None else ground(F)
    pos = {x: i for i, x in enumerate(labels)}
    masks = []
    for A in F:
        m = 0
        for x in A:
            m |= 1 << pos[x]
        masks.append(m)
    return masks, labels


def popcount(m):
    return bin(m).count("1")


def uniformity(F):
    ks = {len(A) for A in F}
    return ks.pop() if len(ks) == 1 else None


# ----------------------------------------------------------------------------------------------
# sunflower checking
# ----------------------------------------------------------------------------------------------

def is_sunflower(sets):
    """True iff the given sets are pairwise distinct and all pairwise intersections coincide."""
    sets = [frozenset(s) for s in sets]
    if len(set(sets)) != len(sets):
        return False
    core = None
    for a, b in it.combinations(sets, 2):
        c = a & b
        if core is None:
            core = c
        elif c != core:
            return False
    return True


def find_sunflower3_brute(F):
    """O(N^3) reference implementation. Returns a 3-sunflower (tuple of frozensets) or None."""
    F = fam(F)
    for a, b, c in it.combinations(F, 3):
        x = a & b
        if x == (a & c) and x == (b & c):
            return (a, b, c)
    return None


def find_sunflower3(F):
    """Anchored-cell algorithm.  For each anchor A, group the other members B by the trace B & A;
    (A,B,C) is a sunflower iff B,C have the same trace S (proper subset of A) and disjoint
    outer parts B\\A, C\\A.  Cost ~ sum_A sum_S |cell|^2 (fast for structured families).
    Works for non-uniform families too (a trace equal to A is skipped: then B contains A and
    A,B,C cannot be a sunflower with A∩B = A unless C ⊇ A with (B\\A)∩(C\\A)=∅ -- handled: we include
    S == A as well, it is a legitimate cell for non-uniform families).
    Returns a sunflower triple (frozensets) or None."""
    F = fam(F)
    masks, labels = to_masks(F)
    N = len(masks)
    for ia in range(N):
        a = masks[ia]
        cells = defaultdict(list)
        for ib in range(N):
            if ib == ia:
                continue
            b = masks[ib]
            cells[b & a].append((b & ~a, ib))
        for S, lst in cells.items():
            if len(lst) < 2:
                continue
            # need two members of the cell with disjoint outer parts
            # quick path: sort by popcount, check pairs
            L = len(lst)
            for i in range(L):
                oi, ii = lst[i]
                for j in range(i + 1, L):
                    oj, jj = lst[j]
                    if oi & oj == 0:
                        # distinctness: B != C since same trace and (if both outer empty) B = C = S
                        if oi == 0 and oj == 0:
                            continue
                        trip = (F[ia], F[ii], F[jj])
                        assert is_sunflower(trip)
                        return trip
    return None


def is_3sf(F):
    """True iff F (distinct sets) contains no 3-sunflower."""
    return find_sunflower3(F) is None


def find_sunflower_r(F, r):
    """Brute-force search for an r-sunflower (small families only). Returns tuple or None.
    Uses the link formulation: an r-sunflower with core Y = r members of F_Y with pairwise
    disjoint petals; Y ranges over pairwise intersections."""
    F = fam(F)
    if r == 3:
        return find_sunflower3(F)
    cores = {a & b for a, b in it.combinations(F, 2)}
    for Y in cores:
        petals = [(A - Y, A) for A in F if Y <= A]
        # backtracking for r pairwise disjoint petals (nonempty except possibly one)
        petals.sort(key=lambda t: len(t[0]))

        def bt(start, chosen, used):
            if len(chosen) == r:
                return chosen
            for i in range(start, len(petals)):
                p, A = petals[i]
                if p & used:
                    continue
                if not p and any(not q for q, _ in chosen):
                    continue
                res = bt(i + 1, chosen + [(p, A)], used | p)
                if res:
                    return res
            return None
        res = bt(0, [], frozenset())
        if res:
            trip = tuple(A for _, A in res)
            assert is_sunflower(trip)
            return trip
    return None


def is_intersecting(F):
    F = fam(F)
    return all(a & b for a, b in it.combinations(F, 2))


def matching_number(F, cap=None):
    """Maximum number of pairwise disjoint members (exact, branch and bound; small families).
    If cap is given, stop as soon as cap disjoint members are found."""
    masks, _ = to_masks(fam(F))
    masks.sort(key=popcount)
    best = [0]

    def bt(i, used, cnt):
        if cnt > best[0]:
            best[0] = cnt
        if cap is not None and best[0] >= cap:
            return True
        if cnt + (len(masks) - i) <= best[0]:
            return False
        for j in range(i, len(masks)):
            if masks[j] & used == 0:
                if bt(j + 1, used | masks[j], cnt + 1):
                    return True
        return False
    bt(0, 0, 0)
    return best[0]


def cover_number(F, limit=8):
    """Minimum size of a set meeting every member (exact for small answers; returns None if > limit)."""
    F = fam(F)
    G = ground(F)
    for s in range(1, limit + 1):
        for T in it.combinations(G, s):
            T = set(T)
            if all(A & T for A in F):
                return s
    return None


# ----------------------------------------------------------------------------------------------
# links and anchored cells
# ----------------------------------------------------------------------------------------------

def link(F, Y):
    """{A \\ Y : Y ⊆ A ∈ F} (as a list of frozensets; may contain the empty set once)."""
    Y = frozenset(Y)
    return [A - Y for A in F if Y <= A]


def anchored_cells(F, A):
    """Dict S -> list of B\\A over B in F, B != A, with B ∩ A = S (the trace cells G_S of the anchor A).
    For a 3-SF uniform F every cell with S ⊊ A is intersecting (proved; see F_constructions.md)."""
    A = frozenset(A)
    cells = defaultdict(list)
    for B in F:
        if B != A:
            cells[B & A].append(B - A)
    return dict(cells)


# ----------------------------------------------------------------------------------------------
# spread
# ----------------------------------------------------------------------------------------------

def containment_counts(F, max_size=None):
    """Counter over bitmasks T (nonempty, T ⊆ some member) of |F_T|.  Enumerates all submasks of
    every member: cost |F| * 2^n.  Use only for n <= ~16 and |F| 2^n <= ~3e7."""
    masks, labels = to_masks(fam(F))
    cnt = Counter()
    for m in masks:
        sub = m
        while sub:
            if max_size is None or popcount(sub) <= max_size:
                cnt[sub] += 1
            sub = (sub - 1) & m
    return cnt, labels


def spread(F, return_argmin=True):
    """Exact spread of the uniform measure on F: min over nonempty T of (|F|/|F_T|)^{1/|T|}.
    Returns (R, T_argmin (frozenset), |F_T|, |T|).  Exponential in the rank; see containment_counts."""
    N = len(F)
    cnt, labels = containment_counts(F)
    best = None
    for T, c in cnt.items():
        t = popcount(T)
        val = (math.log(N) - math.log(c)) / t
        if best is None or val < best[0] - 1e-15:
            best = (val, T, c, t)
    val, T, c, t = best
    Tset = frozenset(labels[i] for i in range(len(labels)) if T >> i & 1)
    return (math.exp(val), Tset, c, t)


def spread_profile(F):
    """Dict s -> (min over |T|=s of (|F|/|F_T|)^{1/s}, max |F_T| over |T|=s)."""
    N = len(F)
    cnt, labels = containment_counts(F)
    per = {}
    for T, c in cnt.items():
        t = popcount(T)
        if t not in per or c > per[t]:
            per[t] = c
    return {s: ((N / c) ** (1.0 / s), c) for s, c in sorted(per.items())}


def shifted_spread(F):
    """max beta with |F_T| <= beta^{-(|T|-1)} |F| for all T with |T| >= 2  (float, with argmin)."""
    N = len(F)
    cnt, labels = containment_counts(F)
    best = None
    for T, c in cnt.items():
        t = popcount(T)
        if t < 2:
            continue
        val = (math.log(N) - math.log(c)) / (t - 1)
        if best is None or val < best[0]:
            best = (val, T, c, t)
    if best is None:
        return (math.inf, None, None, None)
    val, T, c, t = best
    return (math.exp(val), frozenset(labels[i] for i in range(len(labels)) if T >> i & 1), c, t)


def measure_spread(mu):
    """Spread of an arbitrary probability measure given as dict frozenset -> weight (normalised here).
    Exact enumeration over subsets of the support's members."""
    tot = sum(mu.values())
    acc = Counter()
    F = list(mu)
    masks, labels = to_masks(F)
    for m, A in zip(masks, F):
        w = mu[A] / tot
        sub = m
        while sub:
            acc[sub] += w
            sub = (sub - 1) & m
    best = min(((-math.log(p)) / popcount(T), T) for T, p in acc.items())
    return math.exp(best[0])


def core_extraction(F, R):
    """Return (K, |F_K|, value) maximising R^{|K|} |F_K| over all K (K = frozenset()).  The link F_K
    is then R-spread (standard).  Exponential enumeration (as spread)."""
    cnt, labels = containment_counts(F)
    best = (0, frozenset(), len(F), float(len(F)))
    bval = math.log(len(F))
    for T, c in cnt.items():
        v = popcount(T) * math.log(R) + math.log(c)
        if v > bval + 1e-12:
            bval = v
            best = (popcount(T), frozenset(labels[i] for i in range(len(labels)) if T >> i & 1), c, math.exp(v))
    return best[1], best[2], best[3]


# ----------------------------------------------------------------------------------------------
# constructions
# ----------------------------------------------------------------------------------------------

def triangle():
    """{12,23,13}: intersecting, 3-SF, 2-uniform, 3 members (critical base 3)."""
    return fam([{1, 2}, {2, 3}, {1, 3}])


def ahs_seed():
    """Abbott-Hanson-Sauer 10-triple seed on Z5 ∪ {inf}: {i,i+1,inf}, {i,i+1,i+3}.
    Intersecting, 3-SF, 3-uniform, a 2-(6,3,2) design.  Critical base 10^{1/2}."""
    S = [{i, (i + 1) % 5, 'inf'} for i in range(5)] + [{i, (i + 1) % 5, (i + 3) % 5} for i in range(5)]
    return fam(S)


def two_triangles():
    """Two vertex-disjoint triangles: the unique extremal 2-uniform 3-SF family (6 edges)."""
    return fam([{1, 2}, {2, 3}, {1, 3}, {4, 5}, {5, 6}, {4, 6}])


def relabel(F, tag):
    """Copy of F on a disjoint ground set: label x -> (tag, x)."""
    return [frozenset((tag, x) for x in A) for A in F]


def disjoint_union(*Fs):
    """Union of copies of the given families on pairwise disjoint grounds.
    (Two intersecting 3-SF families -> 3-SF; three nonempty copies always contain an empty-core
    sunflower.)"""
    out = []
    for i, F in enumerate(Fs):
        out += relabel(F, ('u', i))
    return fam(out)


def product(F, G):
    """Tensor product {A ∪ B} on disjoint grounds.  Uniform r-SF inputs -> r-SF output (proved);
    spread(product) = min(spread F, spread G)."""
    F1, G1 = relabel(F, 'L'), relabel(G, 'R')
    return fam([A | B for A in F1 for B in G1])


def substitute(F, G):
    """Complete standard substitution F[G]: every outer ground element x becomes a copy
    {(x,y): y in ground(G)}; a member is  ⋃_{x in A} {(x,y): y in g_x}  with A ∈ F and an
    independent choice g_x ∈ G for each x ∈ A.  Size |F|*|G|^k for k-uniform F.
    Theorem (F_constructions.md, Thm 1.1): for uniform F,G with |F|>=2, |G|>=2,
    F[G] is 3-SF  <=>  F is 3-SF, G is 3-SF and G is intersecting."""
    F = fam(F)
    G = fam(G)
    out = []
    for A in F:
        A = sorted(A, key=repr)
        for choice in it.product(G, repeat=len(A)):
            S = frozenset((x, y) for x, g in zip(A, choice) for y in g)
            out.append(S)
    return fam(out)


def iterate_substitution(H, d, start=None):
    """H_1 = H, H_d = H[H_{d-1}] (associativity makes the bracketing irrelevant up to isomorphism)."""
    cur = fam(H) if start is None else fam(start)
    for _ in range(d - 1):
        cur = substitute(H, cur)
    return cur


def lsz(t, m):
    """Lovett-Solomon-Zhang intersecting family: blocks B_1..B_m of size t (points (i,a));
    a member = one whole distinguished block B_i + one point of every other block.
    Rank n = m+t-1, size m t^{m-1}.  (Classically m = t^t.)"""
    out = []
    for i in range(m):
        others = [j for j in range(m) if j != i]
        for word in it.product(range(t), repeat=m - 1):
            S = {(i, a) for a in range(t)} | {(j, w) for j, w in zip(others, word)}
            out.append(frozenset(S))
    return fam(out)


def lsz_general(blocks, members):
    """General 'full block + choices' family.
    blocks: list of families H_0..H_{m-1} (each a list of frozensets over its own labels; block ground
            = union of its members); members: iterable of (i, word) where word[j] is an index into
            H_j for j != i (word[i] ignored).  Member = full ground of block i ∪ chosen H_j-members.
    Returns list of frozensets over labels (j, y)."""
    grounds = [frozenset().union(*H) for H in blocks]
    out = []
    for i, word in members:
        S = {(i, y) for y in grounds[i]}
        for j, H in enumerate(blocks):
            if j != i:
                S |= {(j, y) for y in H[word[j]]}
        out.append(frozenset(S))
    return fam(out)


def alphabet_family(words):
    """Alphabet model: word x in [D]^n -> set {(i, x_i)}.  3 words form a sunflower iff each
    coordinate is all-equal or all-distinct."""
    return fam([frozenset(enumerate(w)) for w in words])


# ----------------------------------------------------------------------------------------------
# exact spread of iterated substitution (tree dynamic programme)
# ----------------------------------------------------------------------------------------------

def seed_containment_classes(H):
    """For a seed H return list of (|S|, p_H(S)) over all nonempty S contained in some member,
    grouped (as a Counter of (|S|, |H_S|)).  p_H(S) = |H_S|/|H|."""
    cnt, _ = containment_counts(H)
    classes = Counter()
    for T, c in cnt.items():
        classes[(popcount(T), c)] += 1
    return classes


def substitution_spread_dp(H, d, tol=1e-13):
    """Exact spread of the d-fold iterated substitution H_d of a uniform seed H, without enumeration.
    For T ⊆ A ∈ H_d, P(T ⊆ A) = prod over internal nodes v of T's support tree of p_H(c_v),
    c_v = children of v used by T.  With cost c(S) = -log p_H(S):
         phi_0(lam) = -lam,  phi_d(lam) = min_S [c(S) + |S| phi_{d-1}(lam)],
    and log spread(H_d) = max{lam : phi_d(lam) >= 0}.  Returns (spread, optimal (cost, leaves) of the
    minimising T, described as (exact probability as Fraction, |T|))."""
    M = len(H)
    classes = seed_containment_classes(H)
    # distinct (size, count) options; for fixed size keep only the max count (min cost)
    best_by_size = {}
    for (s, c) in classes:
        best_by_size[s] = max(best_by_size.get(s, 0), c)
    opts = [(s, Fraction(c, M)) for s, c in best_by_size.items()]

    def phi(lam):
        # returns (value, prob Fraction, leaves)
        val, prob, leaves = -lam, Fraction(1), 1
        for _ in range(d):
            best = None
            for s, p in opts:
                v = -(math.log(p.numerator) - math.log(p.denominator)) + s * val
                if best is None or v < best[0]:
                    best = (v, p * prob ** s, leaves * s)
            val, prob, leaves = best
        return val, prob, leaves
    lo, hi = 0.0, math.log(M) * 2 + 5
    for _ in range(200):
        mid = (lo + hi) / 2
        if phi(mid)[0] >= 0:
            lo = mid
        else:
            hi = mid
    v, prob, leaves = phi(lo)
    logp = math.log(prob.numerator) - math.log(prob.denominator)   # exact big-int logs (no underflow)
    exact = math.exp(-logp / leaves)
    return exact, (prob, leaves)


def substitution_spread_limit(H):
    """Limit of spread(H_d) as d -> infinity: exp(-u*) where u* < 0 is the fixed point of
    psi(u) = min_S [c(S) + |S| u]  (F_constructions.md, Thm 2.3)."""
    M = len(H)
    classes = seed_containment_classes(H)
    best_by_size = {}
    for (s, c) in classes:
        best_by_size[s] = max(best_by_size.get(s, 0), c)
    opts = [(s, -math.log(c / M)) for s, c in best_by_size.items()]
    psi = lambda u: min(c + s * u for s, c in opts)
    lo, hi = -10 * math.log(M) - 10, 0.0   # psi(lo)-lo < 0 <= psi(0)
    for _ in range(300):
        mid = (lo + hi) / 2
        if psi(mid) - mid < 0:
            lo = mid
        else:
            hi = mid
    return math.exp(-hi)


# ----------------------------------------------------------------------------------------------
# statistics
# ----------------------------------------------------------------------------------------------

def sunflower_triple_count(F):
    """Number of ORDERED triples (A,B,C) ∈ F^3 (repetition allowed) with no point of multiplicity
    exactly 2 (D = 0).  For uniform F: = |F| + 6 * #(3-sunflowers).  P(D=0) = count/|F|^3.
    O(N^2 * N) via the anchored formulation; small families only."""
    F = fam(F)
    masks, _ = to_masks(F)
    N = len(masks)
    tot = 0
    for a in masks:
        for b in masks:
            Y, U = a & b, a | b
            for c in masks:
                if c & U == Y and (a != b or c == a):
                    # when a == b, D=0 needs c ∩ a = a ∩ a = a ... c ⊇ a and c∩U = a means c ⊇ a;
                    # uniform: c == a.  (general: c∩a = a and no other point of mult 2 -> fine)
                    tot += 1
    return tot


def entropy_ratio(F):
    """H(A)/sum_x phi(p_x) for the uniform law on F, phi(p) = -(1-p)log(1-p)."""
    N = len(F)
    deg = Counter(x for A in F for x in A)
    s = 0.0
    for x, c in deg.items():
        p = c / N
        if p < 1:
            s += -(1 - p) * math.log(1 - p)
    return math.log(N) / s if s > 0 else math.inf


# ----------------------------------------------------------------------------------------------
# self tests
# ----------------------------------------------------------------------------------------------

def _selftest():
    import random
    rnd = random.Random(1)
    # 1. sunflower finder agrees with brute force on random small families
    for trial in range(300):
        v = rnd.randint(4, 7)
        k = rnd.randint(1, 3)
        allk = [frozenset(c) for c in it.combinations(range(v), k)]
        F = rnd.sample(allk, rnd.randint(1, min(len(allk), 9)))
        assert (find_sunflower3(F) is None) == (find_sunflower3_brute(F) is None), F
    # 2. known seeds
    T, H = triangle(), ahs_seed()
    assert is_3sf(T) and is_intersecting(T)
    assert is_3sf(H) and is_intersecting(H) and len(H) == 10
    assert is_3sf(two_triangles()) and matching_number(two_triangles()) == 2
    # 3. substitution sizes and freeness
    TT = substitute(T, T)
    assert len(TT) == 27 and is_3sf(TT) and is_intersecting(TT)
    HT = substitute(H, T)
    assert len(HT) == 10 * 27 and is_3sf(HT)
    # 4. spread of small families vs formulas
    assert abs(spread(two_triangles())[0] - 6 ** 0.5) < 1e-12
    assert abs(spread(H)[0] - 2.0) < 1e-12
    for d in (1, 2):
        Hd = iterate_substitution(T, d)
        assert abs(spread(Hd)[0] - substitution_spread_dp(T, d)[0]) < 1e-9
    assert abs(spread(TT)[0] - substitution_spread_dp(T, 2)[0]) < 1e-9
    # 5. LSZ: intersecting, exact spread m t/(m+t-1)
    L = lsz(2, 4)
    assert is_intersecting(L) and len(L) == 32
    assert abs(spread(L)[0] - 1.6) < 1e-12
    # 6. triple count for a 3-SF family is |F|
    assert sunflower_triple_count(H) == 10
    print("sf_lib self-test passed")


if __name__ == "__main__":
    _selftest()


# ----------------------------------------------------------------------------------------------
# numpy accelerated sunflower search for larger families (tens of thousands of members)
# ----------------------------------------------------------------------------------------------

def to_words(F):
    """Pack family into an (N, W) uint64 numpy array (W = ceil(|ground|/64)). Returns (arr, labels)."""
    import numpy as np
    labels = ground(F)
    pos = {x: i for i, x in enumerate(labels)}
    W = max(1, (len(labels) + 63) // 64)
    arr = np.zeros((len(F), W), dtype=np.uint64)
    for r, A in enumerate(F):
        for x in A:
            p = pos[x]
            arr[r, p // 64] |= np.uint64(1) << np.uint64(p % 64)
    return arr, labels


def find_sunflower3_np(F, anchors=None, verbose=False):
    """Same anchored-cell algorithm as find_sunflower3, vectorised with numpy.
    anchors: optional iterable of anchor indices (default: all).  By symmetry it suffices to use
    one anchor per orbit of Aut(F) when F is vertex/set-transitive -- the caller must justify that.
    Returns a sunflower triple (frozensets) or None."""
    import numpy as np
    F = fam(F)
    M, labels = to_words(F)
    N = len(F)
    idx = range(N) if anchors is None else anchors
    for cnt, a in enumerate(idx):
        A = M[a]
        tr = M & A
        out = M & ~A
        # group rows by trace
        keys = np.ascontiguousarray(tr).view(np.dtype((np.void, tr.dtype.itemsize * tr.shape[1]))).ravel()
        order = np.argsort(keys, kind='stable')
        sk = keys[order]
        brk = np.nonzero(sk[1:] != sk[:-1])[0] + 1
        starts = np.concatenate(([0], brk)); ends = np.concatenate((brk, [N]))
        for s, e in zip(starts, ends):
            if e - s < 2:
                continue
            rows = order[s:e]
            rows = rows[rows != a]
            if len(rows) < 2:
                continue
            O = out[rows]
            inter = np.zeros((len(rows), len(rows)), dtype=bool)
            for w in range(O.shape[1]):
                inter |= (O[:, None, w] & O[None, :, w]) != 0
            nz = (O != 0).any(axis=1)
            # disjoint pair with not both outer parts empty
            bad = ~inter & (nz[:, None] | nz[None, :])
            np.fill_diagonal(bad, False)
            if bad.any():
                i, j = map(int, np.argwhere(bad)[0])
                trip = (F[a], F[int(rows[i])], F[int(rows[j])])
                assert is_sunflower(trip)
                return trip
        if verbose and cnt % 1000 == 0:
            print('anchor', cnt)
    return None
