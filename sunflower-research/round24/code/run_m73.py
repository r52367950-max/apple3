import sys, json, time
sys.path.insert(0, '.')
from alphabet import cpsat_max
r = cpsat_max(7, 3, workers=4, lb=13, timeout=2400)
print(json.dumps({k: v for k, v in r.items() if k != 'family'}), flush=True)
print('family:', r['family'])
