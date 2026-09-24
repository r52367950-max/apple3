# Checks of the entropic Mantel inequality for 3-SF families (any law mu):
#   E[log 1/p_Z] + log2 * P(A!=B) <= H(Z|A),   Z=A∩B, A,B iid mu, p_Y = mu(A ⊇ Y).
import itertools, math, random
from collections import defaultdict
def is_sf(F):
    for a,b,c in itertools.combinations(F,3):
        if a&b==a&c==b&c: return False
    return True
def quantities(F,mu):
    p=defaultdict(float)
    for A,w in zip(F,mu):
        for k in range(len(A)+1):
            for Y in itertools.combinations(sorted(A),k): p[frozenset(Y)]+=w
    lhs=0; pneq=0; HZ_A=0
    for A,wa in zip(F,mu):
        dist=defaultdict(float)
        for B,wb in zip(F,mu):
            Z=A&B; dist[Z]+=wb
            lhs+=wa*wb*math.log(1/p[Z])
            if A!=B: pneq+=wa*wb
        HZ_A+=wa*sum(-q*math.log(q) for q in dist.values() if q>0)
    return lhs+math.log(2)*pneq, HZ_A
def greedy_sf(n,N,seed):
    rnd=random.Random(seed); cand=[frozenset(c) for c in itertools.combinations(range(N),n)]; rnd.shuffle(cand); F=[]
    for c in cand:
        if is_sf(F+[c]) : F.append(c)
    return F
if __name__=="__main__":
    T=[frozenset(s) for s in [(1,2),(1,3),(2,3),(4,5),(4,6),(5,6)]]
    l,r=quantities(T,[1/6]*6); print("two triangles uniform: LHS=%.6f RHS=%.6f"%(l,r))
    worst=1e9; cnt=0
    for seed in range(40):
        n=2+seed%2; N=6 if n==2 else 7
        F=greedy_sf(n,N,seed); rnd=random.Random(seed)
        for trial in range(5):
            mu=[rnd.random()**3 for _ in F]; s=sum(mu); mu=[x/s for x in mu]
            if trial==0: mu=[1/len(F)]*len(F)
            l,r=quantities(F,mu); worst=min(worst,r-l); cnt+=1
    print("random 3-SF families (n=2,3), %d laws: min slack RHS-LHS = %.3e"%(cnt,worst))
    # recursive triangle family: I(A;B|A∩B) recursion I_t=(4/3)I_{t-1}+(2/3)log2, n=2^t
    I=0.0
    for t in range(1,21):
        I=4/3*I+2/3*math.log(2)
        if t in (1,2,5,10,15,20): print("t=%d n=%d I(A;B|Z)=%.3f  I/n=%.2e  I/n^0.415=%.3f"%(t,2**t,I,I/2**t,I/2**(t*math.log2(4/3))))
