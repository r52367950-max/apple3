#!/usr/bin/env python3
"""Alphabet model M(D,n): max |W|, W subset of [D]^n, no 3 distinct words that on every
coordinate are all-equal or all-distinct (= 3-sunflower of the transversal sets {(i,w_i)}).

Methods:
  cpsat  : OR-tools CP-SAT maximisation with symmetry breaking
           (per-coordinate class sizes non-increasing in the symbol; max class size non-increasing
           in the coordinate).  Valid: relabel symbols per coordinate, then permute coordinates.
  sat    : pysat decision "exists W with |W|>=k" (CaDiCaL 1.9.5, totalizer), symmetry breaking only
           "0^n in W" (valid: translate any word to 0^n by per-coordinate symbol permutations).
  bnb    : independent plain branch & bound (no solver) for tiny cases.
All returned families are re-verified by brute force over all triples (verify()).
"""
import itertools as it, sys, time, json, argparse


def words(D, n):
    return list(it.product(range(D), repeat=n))


def is_sf(u, v, w):
    for a, b, c in zip(u, v, w):
        if a == b == c:
            continue
        if a != b and b != c and a != c:
            continue
        return False
    return u != v and v != w and u != w


def triples(D, n):
    """All unordered sunflower triples as index triples (i<j<k), generated from pairs."""
    W = words(D, n)
    idx = {w: i for i, w in enumerate(W)}
    out = []
    for i, u in enumerate(W):
        for j in range(i + 1, len(W)):
            v = W[j]
            opts = []
            for a, b in zip(u, v):
                if a == b:
                    opts.append((a,))
                else:
                    opts.append(tuple(x for x in range(D) if x != a and x != b))
            for w in it.product(*opts):
                k = idx[w]
                if k > j:
                    out.append((i, j, k))
    return W, out


def verify(Wset):
    Wl = list(Wset)
    assert len(set(Wl)) == len(Wl)
    for u, v, w in it.combinations(Wl, 3):
        if is_sf(u, v, w):
            return False
    return True


def cpsat_max(D, n, workers=4, timeout=None, lb=None, ub=None, sym=True, hint=None, log=False):
    from ortools.sat.python import cp_model
    W, T = triples(D, n)
    m = cp_model.CpModel()
    x = [m.NewBoolVar(f"x{i}") for i in range(len(W))]
    for (i, j, k) in T:
        m.AddBoolOr([x[i].Not(), x[j].Not(), x[k].Not()])
    tot = sum(x)
    if sym:
        cls = [[sum(x[t] for t, w in enumerate(W) if w[i] == a) for a in range(D)] for i in range(n)]
        for i in range(n):
            for a in range(D - 1):
                m.Add(cls[i][a] >= cls[i][a + 1])
        for i in range(n - 1):
            m.Add(cls[i][0] >= cls[i + 1][0])
    if lb is not None:
        m.Add(tot >= lb)
    if ub is not None:
        m.Add(tot <= ub)
    m.Maximize(tot)
    s = cp_model.CpSolver()
    s.parameters.num_search_workers = workers
    if timeout:
        s.parameters.max_time_in_seconds = timeout
    s.parameters.log_search_progress = log
    t0 = time.time()
    st = s.Solve(m)
    dt = time.time() - t0
    status = s.StatusName(st)
    sol = None
    if st in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        sol = [W[i] for i in range(len(W)) if s.Value(x[i])]
        assert verify(sol), "solver returned non-SF family!"
    return dict(D=D, n=n, status=status, value=(len(sol) if sol else None),
                bound=s.BestObjectiveBound(), time=dt, family=sol, ntriples=len(T))


def sat_decide(D, n, k, solver="cadical195", timeout=None):
    from pysat.formula import CNF
    from pysat.card import CardEnc, EncType
    from pysat.solvers import Solver
    W, T = triples(D, n)
    N = len(W)
    cnf = CNF()
    for (i, j, kk) in T:
        cnf.append([-(i + 1), -(j + 1), -(kk + 1)])
    card = CardEnc.atleast(lits=list(range(1, N + 1)), bound=k, top_id=N, encoding=EncType.totalizer)
    cnf.extend(card.clauses)
    cnf.append([1])  # word 0^n (index 0) in W
    t0 = time.time()
    with Solver(name=solver, bootstrap_with=cnf.clauses) as S:
        r = S.solve()
        model = S.get_model() if r else None
    dt = time.time() - t0
    fam = None
    if r:
        fam = [W[i] for i in range(N) if model[i] > 0]
        assert verify(fam) and len(fam) >= k
    return dict(D=D, n=n, k=k, sat=r, time=dt, family=fam)


def bnb_max(D, n):
    """Plain branch and bound: vertices in lexicographic order, include/exclude, forced
    word 0^n (WLOG).  Bound = current + remaining candidates.  Tiny cases only."""
    W, T = triples(D, n)
    N = len(W)
    # conflict structure: for each pair (i,j) the set of k completing a sunflower
    comp = {}
    for (i, j, k) in T:
        for a, b, c in ((i, j, k), (i, k, j), (j, k, i)):
            comp.setdefault((min(a, b), max(a, b)), []).append(c)
    best = [0, None]

    def rec(chosen, cand):
        if len(chosen) + len(cand) <= best[0]:
            return
        if not cand:
            best[0] = len(chosen); best[1] = list(chosen); return
        v = cand[0]
        # include v: remove from cand all c completing a sunflower with v and some chosen u
        bad = set()
        for u in chosen:
            for c in comp.get((min(u, v), max(u, v)), ()):
                bad.add(c)
        newc = [c for c in cand[1:] if c not in bad]
        chosen.append(v)
        rec(chosen, newc)
        chosen.pop()
        rec(chosen, cand[1:])

    rec([0], list(range(1, N)))
    fam = [W[i] for i in best[1]]
    assert verify(fam)
    return best[0], fam


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("D", type=int); ap.add_argument("n", type=int)
    ap.add_argument("--method", default="cpsat")
    ap.add_argument("--k", type=int)
    ap.add_argument("--timeout", type=float)
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--log", action="store_true")
    a = ap.parse_args()
    if a.method == "cpsat":
        r = cpsat_max(a.D, a.n, workers=a.workers, timeout=a.timeout, log=a.log)
    elif a.method == "sat":
        r = sat_decide(a.D, a.n, a.k, timeout=a.timeout)
    else:
        t0 = time.time(); v, fam = bnb_max(a.D, a.n); r = dict(D=a.D, n=a.n, value=v, family=fam, time=time.time() - t0)
    print(json.dumps({k: v for k, v in r.items() if k != "family"}))
    print("family:", r.get("family"))
