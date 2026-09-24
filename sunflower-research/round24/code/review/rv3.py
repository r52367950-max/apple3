import sys; sys.path.insert(0,'..'); sys.path.insert(0,'.')
from C_pair_lp import lp
import math
for C in [2,3]:
    for n in [20,40,60,80,100]:
        if C**n<1e300:
            try: K=lp(n,C); print(C,n,round(K,3),"K*C/n=",round(K*C/n,4))
            except Exception as e: print(C,n,"err",e)
print("1/ln2=",1/math.log(2))
