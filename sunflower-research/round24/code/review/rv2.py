import itertools, random, math
from collections import defaultdict
def is_rsf(F,r):
    for T in itertools.combinations(F,r):
        I=[a&b for a,b in itertools.combinations(T,2)]
        if all(x==I[0] for x in I): return False
    return True
def quantities(F,mu):
    p=defaultdict(float)
    for A,w in zip(F,mu):
        for k in range(len(A)+1):
            for Y in itertools.combinations(sorted(A),k): p[frozenset(Y)]+=w
    lhs=0;pneq=0;HZA=0
    for A,wa in zip(F,mu):
        d=defaultdict(float)
        for B,wb in zip(F,mu):
            Z=A&B; d[Z]+=wb; lhs+=wa*wb*math.log(1/p[Z])
            if A!=B: pneq+=wa*wb
        HZA+=wa*sum(-q*math.log(q) for q in d.values() if q>0)
    return lhs,pneq,HZA
def greedy(n,N,r,seed,cap=40):
    rnd=random.Random(seed); c=[frozenset(x) for x in itertools.combinations(range(N),n)]; rnd.shuffle(c); F=[]
    for s in c:
        if is_rsf(F+[s],r): F.append(s)
        if len(F)>=cap: break
    return F
worst={3:1e9,4:1e9}
for r in (3,4):
    for seed in range(60):
        n=2+seed%3; N={2:7,3:7,4:8}[n]
        F=greedy(n,N,r,seed,cap=30 if r==3 else 25)
        rnd=random.Random(seed)
        for tr in range(4):
            mu=[rnd.random()**(1+3*tr) for _ in F]; s=sum(mu); mu=[x/s for x in mu]
            l,pn,h=quantities(F,mu)
            worst[r]=min(worst[r],h-(l+math.log((r-1)/(r-2))*pn))
print("entropic Mantel min slack (r=3, r=4 versions):",worst)
# recursive triangle F_2 (4-uniform, 27 sets) uniform & random
tri=[(0,1),(0,2),(1,2)]
F2=[]
for (i,j) in tri:
    for e in tri:
        for f in tri:
            F2.append(frozenset([(i,e[0]),(i,e[1]),(j,f[0]),(j,f[1])]))
l,pn,h=quantities(F2,[1/27]*27); print("F_2 uniform: LHS",l+math.log(2)*pn,"RHS",h)
# pairwise tightness: two disjoint triangles
