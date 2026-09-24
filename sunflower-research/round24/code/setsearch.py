#!/usr/bin/env python3
"""Exact / heuristic search for 3-sunflower-free k-uniform families on [v].

Modes
  cpsat_max(v,k, intersecting, anchor, degsym)   CP-SAT maximisation
  sat_decide(v,k,m, ...)                         pysat CaDiCaL decision |F|>=m (independent encoding)
Anchor mode: the set A=[0..k-1] is forced into F and (if intersecting) only sets meeting A are variables.
Symmetry breaking (degsym): point degrees non-increasing inside A and inside the complement of A
(valid: the stabiliser of A contains Sym(A) x Sym(rest)); without anchor: degrees non-increasing on [v].
Every returned family is re-verified by brute force (famstats.is_3sf / is_intersecting).
"""
import itertools as it, time, json, sys, argparse
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from famstats import is_3sf, is_intersecting, fam


def build(v, k, intersecting=False, anchor=False, extra_filter=None):
    A0 = frozenset(range(k))
    sets = [frozenset(c) for c in it.combinations(range(v), k)]
    if anchor and intersecting:
        sets = [s for s in sets if s & A0]
    if extra_filter:
        sets = [s for s in sets if extra_filter(s)]
    idx = {s: i for i, s in enumerate(sets)}
    pairs = []  # disjoint pairs (forbidden if intersecting)
    tri = []
    S = len(sets)
    for i in range(S):
        a = sets[i]
        for j in range(i + 1, S):
            b = sets[j]
            K = a & b
            if not K:
                if intersecting:
                    pairs.append((i, j)); continue
            # third sets C with C∩a = C∩b = K : C = K ∪ (k-|K| points outside a∪b)
            out = [p for p in range(v) if p not in a and p not in b]
            for extra in it.combinations(out, k - len(K)):
                c = K | frozenset(extra)
                l = idx.get(c)
                if l is not None and l > j:
                    tri.append((i, j, l))
    return sets, idx, pairs, tri


def cpsat_max(v, k, intersecting=False, anchor=False, degsym=True, timeout=None, workers=4,
              lb=None, extra_filter=None, log=False, hint=None):
    from ortools.sat.python import cp_model
    sets, idx, pairs, tri = build(v, k, intersecting, anchor, extra_filter)
    m = cp_model.CpModel()
    x = [m.NewBoolVar("") for _ in sets]
    for i, j in pairs:
        m.AddBoolOr([x[i].Not(), x[j].Not()])
    for i, j, l in tri:
        m.AddBoolOr([x[i].Not(), x[j].Not(), x[l].Not()])
    if anchor:
        m.Add(x[idx[frozenset(range(k))]] == 1)
    if degsym:
        deg = [sum(x[i] for i, s in enumerate(sets) if p in s) for p in range(v)]
        blocks = [list(range(k)), list(range(k, v))] if anchor else [list(range(v))]
        for bl in blocks:
            for a, b in zip(bl, bl[1:]):
                m.Add(deg[a] >= deg[b])
    if lb:
        m.Add(sum(x) >= lb)
    if hint:
        for i, s in enumerate(sets):
            m.AddHint(x[i], 1 if s in hint else 0)
    m.Maximize(sum(x))
    s = cp_model.CpSolver()
    s.parameters.num_search_workers = workers
    s.parameters.log_search_progress = log
    if timeout:
        s.parameters.max_time_in_seconds = timeout
    t0 = time.time(); st = s.Solve(m); dt = time.time() - t0
    F = None
    if st in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        F = [sets[i] for i in range(len(sets)) if s.Value(x[i])]
        assert is_3sf(F)[0]
        if intersecting:
            assert is_intersecting(F)
    return dict(v=v, k=k, intersecting=intersecting, anchor=anchor, status=s.StatusName(st),
                value=len(F) if F else None, bound=s.BestObjectiveBound(), time=dt,
                nvars=len(sets), ntri=len(tri), family=[sorted(a) for a in F] if F else None)


def sat_decide(v, k, target, intersecting=False, anchor=False, solver="cadical195", extra_filter=None):
    from pysat.card import CardEnc, EncType
    from pysat.solvers import Solver
    sets, idx, pairs, tri = build(v, k, intersecting, anchor, extra_filter)
    N = len(sets)
    cls = [[-(i + 1), -(j + 1)] for i, j in pairs] + [[-(i + 1), -(j + 1), -(l + 1)] for i, j, l in tri]
    card = CardEnc.atleast(lits=list(range(1, N + 1)), bound=target, top_id=N, encoding=EncType.seqcounter)
    cls += card.clauses
    if anchor:
        cls.append([idx[frozenset(range(k))] + 1])
    t0 = time.time()
    with Solver(name=solver, bootstrap_with=cls) as S:
        r = S.solve(); mod = S.get_model() if r else None
    dt = time.time() - t0
    F = None
    if r:
        F = [sets[i] for i in range(N) if mod[i] > 0]
        assert is_3sf(F)[0] and len(F) >= target
        if intersecting:
            assert is_intersecting(F)
    return dict(v=v, k=k, target=target, sat=r, time=dt, family=[sorted(a) for a in F] if F else None)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("v", type=int); ap.add_argument("k", type=int)
    ap.add_argument("--inter", action="store_true"); ap.add_argument("--anchor", action="store_true")
    ap.add_argument("--nodegsym", action="store_true")
    ap.add_argument("--timeout", type=float); ap.add_argument("--sat", type=int)
    ap.add_argument("--log", action="store_true")
    a = ap.parse_args()
    if a.sat:
        r = sat_decide(a.v, a.k, a.sat, a.inter, a.anchor)
    else:
        r = cpsat_max(a.v, a.k, a.inter, a.anchor, not a.nodegsym, a.timeout, log=a.log)
    print(json.dumps(r))
