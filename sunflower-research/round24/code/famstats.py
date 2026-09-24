#!/usr/bin/env python3
"""Exact statistics of a finite set family F (list of frozensets):
   3-sunflower-freeness, intersecting, spread, matching number, VC dimension,
   automorphism group order (pynauty), anchored-cell profiles, degree data.
All computations are exhaustive (no heuristics)."""
import itertools as it
from fractions import Fraction
from math import comb
from collections import Counter


def fam(sets):
    return [frozenset(s) for s in sets]


def is_3sf(F):
    F = list(F)
    assert len(set(F)) == len(F)
    for a, b, c in it.combinations(F, 3):
        x = a & b
        if x == (a & c) and x == (b & c):
            return False, (sorted(a), sorted(b), sorted(c))
    return True, None


def is_intersecting(F):
    return all(a & b for a, b in it.combinations(F, 2))


def spread(F):
    """max R with |F_T| <= R^{-|T|} |F| for all nonempty T (F_T = members containing T).
    = min over nonempty T with F_T nonempty of (|F|/|F_T|)^{1/|T|}.  Returns (R, argmin T, |F_T|).
    Also returns per-|T| minima."""
    N = len(F)
    cnt = Counter()
    for A in F:
        A = sorted(A)
        for k in range(1, len(A) + 1):
            for T in it.combinations(A, k):
                cnt[T] += 1
    best = None
    per = {}
    for T, c in cnt.items():
        val = (N / c) ** (1.0 / len(T))
        k = len(T)
        if k not in per or val < per[k][0]:
            per[k] = (val, T, c)
        if best is None or val < best[0]:
            best = (val, T, c)
    return best, per


def matching_number(F):
    F = list(F)
    best = 0
    # simple exact recursion
    def rec(i, used, k):
        nonlocal best
        if k + (len(F) - i) <= best:
            return
        if i == len(F):
            best = max(best, k); return
        if not (F[i] & used):
            rec(i + 1, used | F[i], k + 1)
        rec(i + 1, used, k)
    rec(0, frozenset(), 0)
    return best


def vc_dim(F):
    ground = sorted(set().union(*F))
    d = 0
    for k in range(1, len(ground) + 1):
        if 2 ** k > len(F):
            break
        found = False
        for S in it.combinations(ground, k):
            S = frozenset(S)
            traces = {A & S for A in F}
            if len(traces) == 2 ** k:
                found = True; break
        if found:
            d = k
        else:
            break
    return d


def aut_order(F):
    """|Aut(F)| = permutations of the ground set mapping F to F (via incidence graph, nauty)."""
    import pynauty
    ground = sorted(set().union(*F))
    pidx = {p: i for i, p in enumerate(ground)}
    P = len(ground); M = len(F)
    adj = {i: [] for i in range(P + M)}
    for j, A in enumerate(F):
        for p in A:
            adj[P + j].append(pidx[p])
    g = pynauty.Graph(P + M, directed=False, adjacency_dict=adj,
                      vertex_coloring=[set(range(P)), set(range(P, P + M))])
    gens, grpsize1, grpsize2, orbits, numorbits = pynauty.autgrp(g)
    order = grpsize1 * 10 ** grpsize2
    # orbits on points and on sets
    porb = len(set(orbits[:P])); sorb = len(set(orbits[P:]))
    return round(order), porb, sorb


def canon_cert(F):
    import pynauty
    ground = sorted(set().union(*F))
    pidx = {p: i for i, p in enumerate(ground)}
    P = len(ground); M = len(F)
    adj = {i: [] for i in range(P + M)}
    for j, A in enumerate(F):
        for p in A:
            adj[P + j].append(pidx[p])
    g = pynauty.Graph(P + M, directed=False, adjacency_dict=adj,
                      vertex_coloring=[set(range(P)), set(range(P, P + M))])
    return (P, M, pynauty.certificate(g))


def cell_profile(F, A):
    """Anchored cells: for S strictly inside A, G_S = {B\\A : B in F, B cap A = S}.
    Returns dict |S| -> list of |G_S| over the C(n,|S|) subsets S, checks identity."""
    A = frozenset(A)
    n = len(A)
    cells = Counter()
    for B in F:
        if B == A:
            continue
        S = B & A
        assert S != A
        cells[S] += 1
    prof = {}
    for k in range(n):
        prof[k] = [cells.get(frozenset(S), 0) for S in it.combinations(sorted(A), k)]
    total = 1 + sum(sum(v) for v in prof.values())
    assert total == len(F)
    return prof


def degree_stats(F):
    deg = Counter(p for A in F for p in A)
    codeg = Counter(T for A in F for T in it.combinations(sorted(A), 2))
    return dict(npoints=len(deg), deg_hist=dict(sorted(Counter(deg.values()).items())),
                codeg_hist=dict(sorted(Counter(codeg.values()).items())))


def summary(F, name=""):
    F = fam(F)
    ok, wit = is_3sf(F)
    (R, T, c), per = spread(F)
    out = dict(name=name, size=len(F), uniform=sorted({len(A) for A in F}), sf3=ok,
               intersecting=is_intersecting(F), spread=R, spread_argmin=(list(T), c),
               spread_by_level={k: round(v[0], 6) for k, v in sorted(per.items())},
               size_root=len(F) ** (1.0 / max(len(A) for A in F)),
               matching=matching_number(F), vc=vc_dim(F))
    out.update(degree_stats(F))
    try:
        o, porb, sorb = aut_order(F)
        out.update(aut=o, point_orbits=porb, set_orbits=sorb)
    except Exception as e:
        out.update(aut=str(e))
    return out
