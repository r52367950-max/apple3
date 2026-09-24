import itertools, random, math
from fractions import Fraction
# 1) LSZ-like G with t=3, m=4: intersecting, min sunflower core >= 3
t,m=3,4
blocks=[[(i,j) for j in range(t)] for i in range(m)]
G=[]
for d in range(m):
    others=[i for i in range(m) if i!=d]
    for pts in itertools.product(range(t),repeat=m-1):
        s=set(blocks[d])|{(i,p) for i,p in zip(others,pts)}
        G.append(frozenset(s))
assert len(set(G))==len(G)
inter=all(a&b for a in G for b in G)
mincore=10**9; nsf=0
for a,b,c in itertools.combinations(G,3):
    ab=a&b
    if ab==a&c==b&c:
        nsf+=1; mincore=min(mincore,len(ab))
print("LSZ(3,m=4): |G|=",len(G),"intersecting",inter,"#sunflowers",nsf,"min core",mincore)
# 2) Lemma 1.1 exact check on random small families
def check(N,k,nf,delta,seed):
    rnd=random.Random(seed)
    X=list(range(N))
    fam=list({frozenset(rnd.sample(X,k)) for _ in range(nf)})
    fam.sort(key=lambda s:sorted(s))
    M=len(fam)
    # exact spread R: min over T of (P(T⊆A))^{-1/|T|}
    R=float('inf')
    for r in range(1,k+1):
        for T in itertools.combinations(X,r):
            c=sum(1 for A in fam if set(T)<=A)
            if c: R=min(R,(M/c)**(1/r))
    lhs=[0.0]*(k+1)
    for mask in range(1<<N):
        W={x for x in X if mask>>x&1}
        pW=delta**len(W)*(1-delta)**(N-len(W))
        for A in fam:
            U=A|W
            best=None
            for B in fam:
                if B<=U:
                    v=len(B-W)
                    if best is None or v<best: best=v
            lhs[best]+=pW/M
    ok=True
    for tt in range(1,k+1):
        rhs=math.comb(k,tt)*((1-delta)/(delta*R))**tt
        if lhs[tt]>rhs+1e-12: ok=False
        print(f"  N={N} k={k} |F|={M} R={R:.3f} d={delta} t={tt}: lhs={lhs[tt]:.4g} rhs={rhs:.4g}")
    return ok
allok=True
for seed in range(4):
    allok&=check(10,3,25,0.3,seed)
    allok&=check(9,4,20,0.5,seed+10)
print("Lemma 1.1 all instances ok:",allok)
