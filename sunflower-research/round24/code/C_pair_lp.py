# Pair-level LP for a minimal counterexample (r=3).  Variables u_l = P(|A∩B|=l)/P(A=B), u_n = 1, M = sum u_l.
# Constraints: aggregated per-core Mantel  u_j <= sum_{l>j} C(l,j) u_l  (0<=j<n)
#              hereditary spread  sum_{l>=j} C(l,j) u_l <= C(n,j) C^{n-j}   (1<=j<=n)
# Output K*(n,C) = max M / C^n.  Also exact check of the analytic Poisson(1) fake point.
import numpy as np, math
from scipy.optimize import linprog
from fractions import Fraction as Fr
def lp(n,C):
    # variables P_0..P_{n-1}, s=1/K ; P_n = s*C^{-n}; minimize s
    nv=n+1; A=[];b=[];Aeq=[];beq=[]
    def Pn_coef(): 
        r=np.zeros(nv); r[n]=float(C)**(-n); return r
    for j in range(n):
        row=np.zeros(nv); row[j]+=1
        for l in range(j+1,n): row[l]-=math.comb(l,j)
        row-=math.comb(n,j)*Pn_coef(); A.append(row); b.append(0)
    for j in range(1,n+1):
        row=np.zeros(nv)
        for l in range(j,n): row[l]=math.comb(l,j)
        row+=math.comb(n,j)*Pn_coef(); row[n]-=math.comb(n,j)*float(C)**(-j)
        A.append(row/math.comb(n,j)*float(C)**j); b.append(0)
    row=np.ones(nv); row[n]=float(C)**(-n); Aeq.append(row); beq.append(1)
    c=np.zeros(nv); c[n]=1
    r=linprog(c,A_ub=np.array(A),b_ub=b,A_eq=np.array(Aeq),b_eq=beq,bounds=[(0,None)]*nv,method='highs')
    return 1/r.x[n]
def fake_check(n,C,K):
    # P_l = theta*e^{-1}/l! (l<n), P_n = 1/M, M=K C^n ; exact rational check with e^{-1} replaced by exact weights w_l=1/l!
    M=Fr(K)*C**n; w=[Fr(1,math.factorial(l)) for l in range(n)]
    theta=(1-1/M)/sum(w); P=[theta*x for x in w]+[1/M]
    ok=all(P[j]<=sum(math.comb(l,j)*P[l] for l in range(j+1,n+1)) for j in range(n))
    ok&=all(sum(math.comb(l,j)*P[l] for l in range(j,n+1))<=math.comb(n,j)*Fr(C)**(n-j)/M for j in range(1,n+1))
    return ok
if __name__=="__main__":
    for C in [2,3,5,10]:
        print("C=",C,[ (n,round(lp(n,C),3)) for n in [2,3,5,8,10,15,20,30,40] if C**n<1e13])
    for C in [2,5,10]:
        for n in [10,30,60]:
            K=Fr(n,C)*Fr(9,10)*(1-Fr(1,C**(n-1)))
            print("fake Poisson(1) point feasible with K=0.9 n/C:",C,n,fake_check(n,C,K))
