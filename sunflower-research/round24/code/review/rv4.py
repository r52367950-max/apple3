import numpy as np, math
from scipy.optimize import linprog
def minm1(L):
    # min sum l P_l, P on {0..L}, sum=1, P_j <= sum_{l>j} C(l,j)P_l for j<L
    A=[];b=[]
    for j in range(L):
        row=np.zeros(L+1); row[j]=1
        for l in range(j+1,L+1): row[l]-=math.comb(l,j)
        # scale row
        s=max(abs(row)); A.append(row/s); b.append(0)
    r=linprog(np.arange(L+1,dtype=float),A_ub=np.array(A),b_ub=b,A_eq=[np.ones(L+1)],b_eq=[1],bounds=[(0,None)]*(L+1),method='highs')
    return r.fun, r.x
for L in [2,3,4,5,6,8,10,15,20,30]:
    v,x=minm1(L); print(L,round(v,5),"-> K*C/n ~",round(1/v,4), " support:",[ (i,round(p,4)) for i,p in enumerate(x) if p>1e-6][:8])
print("ln2",math.log(2))
