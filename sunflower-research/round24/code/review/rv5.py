import itertools, random, math
def check(N,kmax,nf,delta,seed):
    rnd=random.Random(seed); X=list(range(N))
    fam=list({frozenset(rnd.sample(X,rnd.randint(1,kmax))) for _ in range(nf)})
    w=[rnd.random()**2 for _ in fam]; s=sum(w)*rnd.uniform(1,1.5); nu=[x/s for x in w]  # sub-probability
    k=max(map(len,fam))
    R=float('inf')
    for r in range(1,k+1):
        for T in itertools.combinations(X,r):
            c=sum(v for A,v in zip(fam,nu) if set(T)<=A)
            if c>0: R=min(R,c**(-1/r))
    lhs=[0.0]*(k+1)
    for mask in range(1<<N):
        W=frozenset(x for x in X if mask>>x&1)
        pW=delta**len(W)*(1-delta)**(N-len(W))
        for A,v in zip(fam,nu):
            U=A|W; best=min(len(B-W) for B in fam if B<=U)
            lhs[best]+=pW*v
    worst=max(lhs[t]/(math.comb(k,t)*((1-delta)/(delta*R))**t) for t in range(1,k+1))
    return worst
print("max ratio LHS/RHS over instances (should be <=1):",max(check(9,4,15,d,s) for s in range(12) for d in (0.2,0.5,0.8)))
