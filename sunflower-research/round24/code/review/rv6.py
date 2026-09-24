import itertools, math
from collections import defaultdict
def comp(outer, inner_by_point):
    out=[]
    for A in outer:
        pts=sorted(A)
        for ch in itertools.product(*[inner_by_point for _ in pts]):
            out.append(frozenset((p,)+(x if isinstance(x,tuple) else (x,)) for p,X in zip(pts,ch) for x in X))
    return out
tri=[frozenset([0,1]),frozenset([0,2]),frozenset([1,2])]
def I_cond(F):
    M=len(F); dZ=defaultdict(float); HZA=0
    for A in F:
        d=defaultdict(float)
        for B in F: d[A&B]+=1/M; dZ[A&B]+=1/M/M
        HZA+=sum(-q*math.log(q) for q in d.values())/M
    HZ=sum(-q*math.log(q) for q in dZ.values())
    return 2*HZA-HZ
F=tri
for t in range(1,4):
    print(t,len(F),len(next(iter(F))),round(I_cond(F),4))
    F=comp(tri,F) if t<3 else F
I=0
for t in range(1,4): I=4/3*I+2/3*math.log(2); print("recursion",t,round(I,4))
