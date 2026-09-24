import sys, json; sys.path.insert(0,'.')
from famstats import summary, cell_profile, fam
from extremal_stats import anchor_profiles
out={}
for f in sys.argv[1:]:
    line=open(f).read().strip().split('\n')[-1]
    sets=[[ord(c)-97 for c in w] for w in line.split(':')[1].split()]
    s=summary(sets,f); d,avg=anchor_profiles(sets)
    s['anchor_profiles']={str(k):v for k,v in d.items()}; s['anchor_avg']=avg; s['family']=sets
    out[f]=s; print(json.dumps({k:v for k,v in s.items() if k!='family'},default=str))
json.dump(out,open('../data/ls_stats.json','w'),default=str,indent=1)
