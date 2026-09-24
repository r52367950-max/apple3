#!/usr/bin/env python3
"""Stats for known/constructed extremal 3-SF families (n=1,2,3, products)."""
import json, sys, itertools as it
sys.path.insert(0, __file__.rsplit('/', 1)[0])
from famstats import summary, cell_profile, fam

ICO = [[0, 1, 5], [1, 2, 5], [2, 3, 5], [3, 4, 5], [0, 4, 5], [0, 1, 3], [1, 2, 4], [0, 2, 3], [1, 3, 4], [0, 2, 4]]
TRI = [[0, 1], [1, 2], [0, 2]]


def disjoint_copies(F, k=2):
    pts = sorted(set().union(*map(set, F)))
    m = max(pts) + 1
    return [[x + c * m for x in A] for c in range(k) for A in F]


def product(F, G):
    m = max(max(A) for A in F) + 1
    return [list(A) + [m + x for x in B] for A in F for B in G]


def anchor_profiles(F):
    F = fam(F)
    n = len(F[0])
    res = []
    for A in F:
        p = cell_profile(F, A)
        res.append({k: sum(v) for k, v in p.items()})
    # best anchor = the one maximising cells at |S|=0 (most "disjoint" mass), report all distinct profiles
    distinct = {}
    for r in res:
        key = tuple(r[k] for k in range(n))
        distinct[key] = distinct.get(key, 0) + 1
    avg = {k: sum(r[k] for r in res) / len(res) for k in range(n)}
    return distinct, avg


if __name__ == "__main__":
    fams = {
        "n1_two_points": [[0], [1]],
        "n2_triangle(g(2))": TRI,
        "n2_two_triangles(f3(2)=6)": disjoint_copies(TRI),
        "n3_ico_design_2-(6,3,2)(g(3)>=10)": ICO,
        "n3_two_ico(f3(3)=20)": disjoint_copies(ICO),
        "n4_two_ico_x_two_points(40)": product(disjoint_copies(ICO), [[0], [1]]),
        "n4_two_triangles_squared(36)": product(disjoint_copies(TRI), disjoint_copies(TRI)),
    }
    out = {}
    for name, F in fams.items():
        s = summary(F, name)
        d, avg = anchor_profiles(F)
        s["anchor_profiles(|S|=0..n-1 : #anchors)"] = {str(k): v for k, v in d.items()}
        s["anchor_profile_avg"] = avg
        out[name] = s
        print(json.dumps(s, default=str))
    json.dump(out, open(__file__.rsplit('/', 2)[0] + "/data/extremal_stats_small.json", "w"), indent=1, default=str)
