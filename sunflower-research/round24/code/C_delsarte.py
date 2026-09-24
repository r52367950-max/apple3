# (1) verify eigenvalues of W_j^T W_j on Johnson eigenspace V_i: theta_ij = C(n-i,j-i) C(N-j-i,n-j)
# (2) Delsarte feasibility (y_i>=0) of a pair distribution P via m_j = sum_i theta_ij y_i, exact rationals
# (3) Kneser/Hoffman: lambda_i/theta_ii -> (-1)^i as N grows (eigenvalue decay cancelled by spread normalisation)
import itertools, math, numpy as np
from fractions import Fraction as Fr
def check_theta(N,n):
    S=[frozenset(c) for c in itertools.combinations(range(N),n)]
    for j in range(n+1):
        G=np.array([[math.comb(len(a&b),j) for b in S] for a in S],float)
        ev=sorted(set(np.round(np.linalg.eigvalsh(G),6)))
        pred=sorted(set([float(math.comb(n-i,j-i)*math.comb(N-j-i,n-j)) for i in range(j+1)]+([0.0] if j<n else [])))
        assert all(any(abs(e-p)<1e-5 for p in pred) for e in ev),(N,n,j,ev,pred)
    return True
def delsarte_y(P,N,n):
    m=[sum(math.comb(l,j)*P[l] for l in range(j,n+1)) for j in range(n+1)]
    y=[]
    for j in range(n+1):
        th=lambda i: math.comb(n-i,j-i)*math.comb(N-j-i,n-j)
        y.append((m[j]-sum(th(i)*y[i] for i in range(j)))/th(j))
    return y
print("theta formula:",check_theta(7,3),check_theta(8,4),check_theta(9,3))
for n in [8,15]:
    M=Fr(10)**6; w=[Fr(1,math.factorial(l)) for l in range(n)]; th=(1-1/M)/sum(w)
    P=[th*x for x in w]+[1/M]
    for N in [4*n, n*n, n**3, 10*n**3]:
        y=delsarte_y(P,N,n); print("n=%d N=%d  min_i y_i*theta_ii/m_i = %.4f"%(n,N,min(float(y[i]*math.comb(N-2*i,n-i)/sum(math.comb(l,i)*P[l] for l in range(i,n+1))) for i in range(n+1))))
    # linear-space fake P_1=1-eps, P_n=eps
    eps=Fr(1,10**6); P=[0,1-eps]+[0]*(n-2)+[eps]
    for N in [n*n, n**3, 10**7]:
        y=delsarte_y(P,N,n); print("  linear-space fake n=%d N=%d min y_i sign ok: %s"%(n,N,all(v>=0 for v in y)))
for n in [5,10]:
    for N in [3*n,n*n,n**3]:
        r=[(-1)**i*math.comb(N-n-i,n-i)/math.comb(N-2*i,n-i)*math.comb(N,n)/math.comb(N-n,n) for i in range(n+1)]
        print("Kneser n=%d N=%d  (|lambda_i|/theta_ii)/(lambda_0/theta_00) i=1..4:"%(n,N),[round(abs(x),3) for x in r[1:5]])
