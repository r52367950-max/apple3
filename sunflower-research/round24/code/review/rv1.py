import itertools, random, math
from collections import defaultdict
def is_sf(F):
    for a,b,c in itertools.combinations(F,3):
        if a&b==a&c==b&c: return False
    return True
def inter(F): return all(a&b for a,b in itertools.combinations(F,2))
# 1. design 2-(6,3,2): one triple from each complementary pair, pairs covered twice
X=range(6)
trip=[frozenset(t) for t in itertools.combinations(X,3)]
pairs=[(t,frozenset(X)-t) for t in trip if 0 in t]
found=None
for choice in itertools.product([0,1],repeat=10):
    D=[p[c] for p,c in zip(pairs,choice)]
    cnt=defaultdict(int)
    for t in D:
        for e in itertools.combinations(sorted(t),2): cnt[e]+=1
    if all(cnt[e]==2 for e in itertools.combinations(X,2)): found=D;break
print("design found",found is not None,"size",len(found),"3SF",is_sf(found),"intersecting",inter(found))
# 2. g(m)>=2g(m-1)+1 construction with H=design (m=4): random a_R,b_R
rnd=random.Random(1)
H=[frozenset(('h',x) for x in t) for t in found]
A=[('a',i) for i in range(4)]
ok=True
for trial in range(30):
    F=[frozenset(A)]
    for R in H:
        a,b=rnd.sample(A,2); F+= [R|{a}, R|{b}]
    ok&= is_sf(F) and inter(F) and len(set(F))==21
print("g(4)>=21 construction ok over 30 random labelings:",ok)
# 3. composition lemma O[H], O non-uniform weighted: test random
def compose(O,weights,Hs):
    out=[]
    for Aset in O:
        for choice in itertools.product(*[Hs[i] for i in sorted(Aset)]):
            s=frozenset()
            for i,X in zip(sorted(Aset),choice): s|=frozenset((i,)+ (x,) for x in X)
            out.append(s)
    return out
tri=[frozenset(e) for e in [(1,2),(1,3),(2,3)]]
single=[frozenset([0])]
# O = {{1},{2,3}} with weights k1=2,k2=1,k3=1 -> M=2 ; H1=triangle, H2=H3=single point
O=[frozenset([1]),frozenset([2,3]),frozenset([2,4]),frozenset([3,4])]
w={1:2,2:1,3:1,4:1}
Hs={1:tri,2:single,3:single,4:single}
C=compose(O,w,Hs); print("weighted composition example size",len(C),"uniform",set(map(len,C)),"3SF",is_sf(C))
# random tests: O random 3-SF non-uniform with weight 1/2 mixture
bad=0;tests=0
C5=[frozenset(e) for e in [(0,1),(1,2),(2,3),(3,4),(4,0)]]  # C5 edges: not intersecting! use as negative control
for seed in range(200):
    r=random.Random(seed)
    pts=list(range(6)); wt={i:r.choice([1,2]) for i in pts}
    cands=[frozenset(s) for k in range(1,5) for s in itertools.combinations(pts,k) if sum(wt[i] for i in s)==4]
    r.shuffle(cands); O=[]
    for c in cands:
        if is_sf(O+[c]): O.append(c)
        if len(O)>=6: break
    Hs={i:(tri if wt[i]==2 else single) for i in pts}
    Cm=compose(O,wt,Hs)
    if len(Cm)>400: continue
    tests+=1
    if not is_sf(Cm): bad+=1
print("random weighted compositions tested",tests,"failures",bad)
# negative control: inner family not intersecting (2 disjoint edges, 3-SF) should fail sometimes
two=[frozenset([0,1]),frozenset([2,3])]
O=[frozenset([1,2]),frozenset([1,3]),frozenset([2,3])]
Cm=compose(O,{1:2,2:2,3:2},{1:two,2:two,3:two}); print("control (non-intersecting inner) 3SF?",is_sf(Cm))
