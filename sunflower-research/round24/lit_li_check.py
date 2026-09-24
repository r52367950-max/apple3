"""Numerical sanity checks for (reconstructed) statements of
  C. Li, "On p-Spread Measures" (arXiv 2609.08967)  -- Theorem 1.9, Theorem 3.3
  X. Fang, T. Wang (arXiv 2609.18458)                -- Theorem 1.2 (domination after thinning)
The statements are taken from search snippets (UNVERIFIED); the proof of Thm 1.9 is our own
reconstruction (Hoffman bound for the spread-averaged covering kernel).  Small N only.
"""
import itertools, math, random, sys
import numpy as np
from scipy.optimize import linprog

random.seed(1); np.random.seed(1)

def subsets_mask(N):
    return list(range(1 << N))

def popcount(x):
    return bin(x).count("1")

def mu(p, N, S):
    k = popcount(S)
    return p**k * (1-p)**(N-k)

def spread_polytope_constraints(N, p, support):
    """rows for sum_{S in support, S>=T} nu(S) <= p^|T| for nonempty T"""
    A_ub, b_ub = [], []
    for T in range(1, 1 << N):
        A_ub.append([1.0 if (S & T) == T else 0.0 for S in support])
        b_ub.append(p ** popcount(T))
    return np.array(A_ub), np.array(b_ub)

def spread_feasible(N, p, support):
    if not support:
        return False
    A_ub, b_ub = spread_polytope_constraints(N, p, support)
    res = linprog(np.zeros(len(support)), A_ub=A_ub, b_ub=b_ub,
                  A_eq=np.ones((1, len(support))), b_eq=[1.0], bounds=(0, None), method="highs")
    return res.status == 0

def random_spread_measure(N, p, support=None):
    support = support if support is not None else list(range(1 << N))
    A_ub, b_ub = spread_polytope_constraints(N, p, support)
    c = np.random.randn(len(support))
    res = linprog(c, A_ub=A_ub, b_ub=b_ub, A_eq=np.ones((1, len(support))), b_eq=[1.0],
                  bounds=(0, None), method="highs")
    if res.status != 0:
        return None
    nu = np.zeros(1 << N)
    for S, v in zip(support, res.x):
        nu[S] = max(v, 0)
    return nu / nu.sum()

# ---------------------------------------------------------------- Part 1: kernel / eigenvalues
def part1(N=4, p=0.3):
    P = np.array([[0.0, 1.0], [(1-p)/p, (2*p-1)/p]])  # state 0 = out, 1 = in ; rows sum to 1
    J = np.array([[1-p, p], [1-p, p]])
    nu = random_spread_measure(N, p)
    size = 1 << N
    K = np.zeros((size, size))
    for S in range(size):
        if nu[S] <= 0: continue
        M = np.array([[1.0]])
        for x in reversed(range(N)):  # bit x ; kron order: highest bit first
            M = np.kron(M, P if (S >> x) & 1 else J)
        # support check: K_S(A1,A2) != 0 only if S subset of A1|A2
        for A1 in range(size):
            for A2 in range(size):
                if abs(M[A1, A2]) > 1e-12 and (S & ~(A1 | A2)) != 0:
                    raise RuntimeError("support violated")
        K += nu[S] * M
    D = np.diag([mu(p, N, A) for A in range(size)])
    sym = np.sqrt(D) @ K @ np.linalg.inv(np.sqrt(D))
    assert np.allclose(sym, sym.T, atol=1e-9), "not self-adjoint in L2(mu_p)"
    ev = np.sort(np.linalg.eigvalsh((sym + sym.T) / 2))
    pred = []
    for T in range(size):
        cover = sum(nu[S] for S in range(size) if (S & T) == T)
        pred.append(cover * (-(1-p)/p) ** popcount(T))
    pred = np.sort(np.array(pred))
    print(f"[Part1] N={N} p={p}: eigenvalues match prediction: {np.allclose(ev, pred, atol=1e-8)};"
          f" lambda_min={ev[0]:.4f} >= -(1-p)={-(1-p):.4f}: {ev[0] >= -(1-p) - 1e-9}")

# ---------------------------------------------------------------- Part 2: brute force Thm 1.9
def bad2(N, Afam):
    covered = 0
    for A1 in Afam:
        for A2 in Afam:
            U = A1 | A2
            # all subsets of U are covered
            sub = U
            while True:
                covered |= (1 << sub)
                if sub == 0: break
                sub = (sub - 1) & U
    return [S for S in range(1 << N) if not (covered >> S) & 1]

def part2(N, p):
    size = 1 << N
    cache = {}
    best, bestA = -1, None
    for mask in range(1, 1 << size):
        Afam = [S for S in range(size) if (mask >> S) & 1]
        m = sum(mu(p, N, S) for S in Afam)
        if m <= best: continue
        B = tuple(bad2(N, Afam))
        if B not in cache:
            cache[B] = spread_feasible(N, p, list(B))
        if cache[B]:
            best, bestA = m, Afam
    bound = (1-p)/(2-p)
    print(f"[Part2] N={N} p={p:.3f}: max mu_p(A) with Bad_2(A) carrying a p-spread measure = {best:.5f};"
          f" (1-p)/(2-p) = {bound:.5f}; bound holds: {best <= bound + 1e-9}; extremal A = {bestA}")

# ---------------------------------------------------------------- Part 3: Fang-Wang domination
def upsets(N):
    size = 1 << N
    out = []
    for mask in range(1 << size):
        ok = True
        for S in range(size):
            if (mask >> S) & 1:
                for x in range(N):
                    if not (mask >> (S | (1 << x))) & 1:
                        ok = False; break
            if not ok: break
        if ok: out.append(mask)
    return out

def part3(N, q, t, eta):
    # choose p with eta = t q (1-p) / (p (1-t))  =>  p/(1-p) = t q /((1-t) eta)
    odds = t*q/((1-t)*eta); p = odds/(1+odds)
    size = 1 << N
    A_ub, b_ub = spread_polytope_constraints(N, q, list(range(size)))
    worst = -1e9
    for U in UPS[N]:
        g = np.zeros(size)
        for Jset in range(size):
            s = 0.0; sub = Jset
            while True:
                if (U >> sub) & 1:
                    s += t**popcount(sub) * (1-t)**(popcount(Jset)-popcount(sub))
                if sub == 0: break
                sub = (sub - 1) & Jset
            g[Jset] = s
        res = linprog(-g, A_ub=A_ub, b_ub=b_ub, A_eq=np.ones((1, size)), b_eq=[1.0],
                      bounds=(0, None), method="highs")
        val = -res.fun
        muU = sum(mu(p, N, S) for S in range(size) if (U >> S) & 1)
        worst = max(worst, val - muU)
    print(f"[Part3] N={N} q={q} t={t} eta={eta}: p={p:.4f}; max_U [P(T_t nu in U) - mu_p(U)] over q-spread nu = {worst:+.2e}"
          f"  -> domination {'holds' if worst <= 1e-9 else 'FAILS'}")

# ---------------------------------------------------------------- Part 4: Li coupling Thm 3.3
def part4(N, p, trials=5):
    size = 1 << N
    triples = [(X, R1, R2) for X in range(size) for R1 in range(size) for R2 in range(size)
               if (X & ~(R1 | R2)) == 0]
    idx = {tr: i for i, tr in enumerate(triples)}
    ok_all = True
    for _ in range(trials):
        nu = random_spread_measure(N, p)
        rows, rhs = [], []
        for X in range(size):
            rows.append([1.0 if tr[0] == X else 0.0 for tr in triples]); rhs.append(nu[X])
        for R in range(size):
            rows.append([1.0 if tr[1] == R else 0.0 for tr in triples]); rhs.append(mu(p, N, R))
            rows.append([1.0 if tr[2] == R else 0.0 for tr in triples]); rhs.append(mu(p, N, R))
        res = linprog(np.zeros(len(triples)), A_eq=np.array(rows), b_eq=np.array(rhs),
                      bounds=(0, None), method="highs")
        ok_all &= (res.status == 0)
    print(f"[Part4] N={N} p={p}: coupling X~nu, R1,R2~mu_p, X subset R1|R2 exists for {trials} extreme p-spread nu: {ok_all}")
    # independent R1,R2 would NOT work in general: check union of independent mu_p = mu_{2p-p^2}
    nu = random_spread_measure(N, p)

if __name__ == "__main__":
    part1(4, 0.3); part1(4, 0.6); part1(5, 0.25)
    for p in [0.34, 0.4, 0.5, 0.6, 0.75]:
        part2(3, p)
    for p in [0.26, 0.3, 0.4, 0.5]:
        part2(4, p)
    UPS = {3: upsets(3), 4: upsets(4)}
    print("number of up-sets:", {k: len(v) for k, v in UPS.items()})
    for (q, t) in [(0.3, 0.5), (0.5, 0.5), (0.25, 0.7), (0.4, 0.2)]:
        for eta in [1.0, 1.3, 2.0]:
            part3(4, q, t, eta)
    part4(3, 0.4); part4(4, 0.3, trials=3)
