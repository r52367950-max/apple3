# F_constructions — constructions, spread, and saturation (round 24, agent F)

Code: `r24/code/sf_lib.py` (documented library, self-test `python3 sf_lib.py`), experiments in `r24/code/F_exp/exp{1,2,3}_*.py` with JSON outputs next to them.

## Summary

1. **Spread and base are the same problem (PROVED, Thm 2.1).** sup{spread(F) : F 3-SF} = L_3 := sup_n f_3(n)^{1/n}. So any construction with unbounded spread would disprove the conjecture, and conversely. Any spread-based proof must bound the spread of 3-SF families by a constant that is at least √10.
2. **Spread above 3 exists (PROVED and CHECKED).** Two disjoint copies of the AHS iterate H_2 have n = 9, |F| = 20000 and exact spread 20000^{1/9} = **3.00533** (brute force). The AHS iterates H_d have exact spread √10·(2/√10)^{1/3^{d-1}}, which tends to √10 = 3.1623 (tree DP, which is exact; brute force for d ≤ 2). The best spread you can build equals the best base you can build, so nothing beyond √10 is possible without a new record lower bound.
3. **Substitution (PROVED, Thm 1.1).** F[G] is 3-SF if and only if F and G are 3-SF and G is intersecting (for |F| ≥ 2). The growth base is capped by the critical base ψ_3(k)^{1/(k-1)} of intersecting seeds, and L_3 = sup_k ψ_3(k)^{1/(k-1)}. Known values: ψ_3(2) = 3, ψ_3(3) = 10, ψ_3(4) = 27 (the last is an Axante et al. claim). A new record needs ψ_3(5) ≥ 100, ψ_3(6) ≥ 317 or ψ_3(7) ≥ 1000.
4. **Shifted spread is the substitution invariant (PROVED, Thms 2.2–2.3).** Say p(S) ≤ β^{-(|S|-1)} holds for all S. This property is preserved exactly by substitution. The iterates of a seed H have spread tending to H's critical base iff H satisfies it. All extremal examples satisfy it with equality at members.
5. **LSZ cannot be repaired (PROVED, Thm 3.1–3.3).** Sunflowers in LSZ(t,m) are of exactly two types: type I (same distinguished block, core ⊇ B_i) and type III (three distinct distinguished blocks, "three lines through a common word"). Type II never occurs. Any 3-SF LSZ-type family has |F| ≤ m·g_t(m−1) and |F| ≤ 2t^{m−1}, so its spread is at most the alphabet capacity κ_t ≤ L_3. In other words, LSZ's spread lives in a transversal link that is not 3-SF, and making that link 3-SF brings back the original problem. With intersecting seeds in the blocks, the family is 3-SF iff each full word lies on at most 2 present lines, which gives |F| ≤ 2M^{m−1} and spread ≤ M^{1/k}. Exact optima: the largest 3-SF subfamily of LSZ(3,3) or LSZ(4,3) has 12 members.
6. **Lemma candidates (§4).** PROVED: link-matching ≤ 2, the pair-core covering lemma, and the half-links of pair cores being intersecting. PROVED, negative: no "dense-core" lemma, no linear-witness lemma, entropy constant K ≥ log√10. CONJECTURE: a shifted-spread bound for intersecting 3-SF families, and a small-ball bound P(D=0) ≥ e^{-cn} for R-spread measures.
7. **Correction (agrees with LIT_digest).** "39 ≤ f(3,4) ≤ 49" in CONTEXT.md is about 3-uniform, 4-petal families. For three petals, **54 ≤ f_3(4) ≤ 83** (lower bound = 2×T[T], checked here).

---

## 1. Recursive / substitution constructions

**Definition.** Let F be k-uniform on X and G be m-uniform. The substitution F[G] replaces each x ∈ X by a copy of ground(G). A member of F[G] is ⋃_{x∈A}{x}×g_x, where A ∈ F and each g_x ∈ G is chosen independently. It has |F|·|G|^k members of size km. Substitution is associative.

**Thm 1.1 (PROVED; checked on 400 random pairs, exp1).** Let F, G be uniform with |F| ≥ 2. Then F[G] is 3-SF ⇔ F is 3-SF, G is 3-SF and G is intersecting.

*Proof.* (⇐) Take distinct S_1, S_2, S_3 with supports A_i. The supports are determined because the inner members are nonempty.
- If the supports are not all equal, some outer x lies in exactly two of them. If two supports are equal, use x in their difference with the third; uniformity makes it nonempty. If all three differ, use that F is 3-SF.
- The two inner members at x intersect, since G is intersecting. So some point (x, y) lies in exactly two of the S_i, and the triple is not a sunflower.
- If all supports equal A, then at every x the triple (g_1, g_2, g_3) has no point of multiplicity 2. So it is either all equal or a sunflower in G, and the latter is excluded. Hence S_1 = S_2 = S_3, a contradiction.

(⇒)
- A sunflower in F lifts by using a constant inner choice.
- A sunflower in G lifts by varying one block.
- Suppose instead that P, Q ∈ G are disjoint. Pick A ≠ B in F and a fixed P_0 ∈ G. Build three members:
  - S_1: support A, with P at x ∈ A∖B;
  - S_2: support A, with Q at x ∈ A∖B;
  - S_3: support B.

  All three use P_0 on A∩B and fixed choices elsewhere. Every pairwise intersection equals ⋃_{A∩B}P_0, so this is a sunflower. ∎

**Cap 1.2 (PROVED; archive).** Iterating a seed H gives base β_H = |H|^{1/(k−1)}. Finite palettes of seeds, products and substitutions never exceed the largest base in the palette, since composition takes weighted averages of log β. So L_3 = sup_k ψ_3(k)^{1/(k−1)}.
- Constraint that caps the construction: the seed must be intersecting and 3-SF.
- Known critical bases: 3 (triangle), √10 (AHS, 10 triples, a 2-(6,3,2) design) and 27^{1/3} = 3 (T[T], which is optimal at k = 4 if ψ_3(4) = 27).
- Products: spread(F⊗G) = min(spread F, spread G), and |F⊗G|^{1/n} is a weighted mean. So products never raise the base or the spread.
- Disjoint union of two intersecting 3-SF families: this is 3-SF, because ν = 2 and cross triples have intersections (≠∅, ∅, ∅). It gives the free factor 2: f_3(n) ≥ 2ψ_3(n).

**Matching-restricted linear recursions (PROVED examples; attribution: Axante et al. use "adjoin a point or block while tracking ν", and the exact recurrence was seen only in a snippet).**
- Two families on disjoint grounds, each with its own apex: {p∪A} ∪ {q∪B} gives f(w) ≥ 2ψ(w) ≥ 2f(w−1).
- One family with a shared apex: {p}∪(G_1 ⊔ G_2) with G_i intersecting gives ψ(w) ≥ 2ψ(w−1). Three copies fail, because they give three petals at the core p.
- {pA} ∪ {qB} ∪ {pqC} gives f(w) ≥ 2ψ(w−1) + f(w−2). It needs G_1, G_2 intersecting, because (pA, pA′, pqC) is a sunflower when A∩A′ = ∅.
- The capping constraint is the same every time: **the link at the auxiliary point or block must have ν ≤ 2, so at most r−1 = 2 components can hang from one apex.**
- Additive recursions with a bounded number of terms therefore have base ≈ 2. This is far below the multiplicative substitution.

## 2. Spread

**Thm 2.1 (PROVED).** For every n-uniform F, spread(F) ≤ |F|^{1/n}: take T = A ∈ F, so |F_A| = 1 ≤ R^{−n}|F|. Conversely, if |F| > R^n then core extraction gives an R-spread 3-SF link of positive rank. Hence sup_{F 3-SF} spread(F) = L_3.

Exact small values follow, using f_3(1) = 2, f_3(2) = 6 and f_3(3) = 20:

| n | max spread s(n) | attained by | status |
|---|---|---|---|
| 1 | 2 | two points | PROVED |
| 2 | √6 = 2.449 | two triangles | PROVED |
| 3 | 20^{1/3} = 2.714 | 2×AHS seed | PROVED |
| 4 | ∈ [54^{1/4} = 2.711, 83^{1/4}] | 2×T[T] (lower end) | lower bound CHECKED; upper bound is an author claim |

**Def.** F is *shifted-β-spread* if |F_S| ≤ β^{−(|S|−1)}|F| for all S with |S| ≥ 2. For |S| = 1 this is automatic. It is weaker than β-spread and is the natural notion for intersecting families, since intersecting forces max p_x ≥ 1/n.

**Thm 2.2 (PROVED).** If F and G are shifted-β-spread, so is F[G].

*Proof.* Let T have outer support X and pieces T_x. Then p(T) = p_F(X)·∏p_G(T_x) ≤ β^{−(|X|−1)}·β^{−Σ(|T_x|−1)} = β^{−(|T|−1)}. ∎

**Thm 2.3 (PROVED).** Let H be a k-uniform seed with no point common to all members, and put c(S) = −log p_H(S).
- Define ψ(u) = min_S[c(S) + |S|u]. Then log spread(H_d) = sup{λ : ψ^{∘d}(−λ) ≥ 0}.
- The reason: T ⊆ A ∈ H_d has probability equal to the product, over the nodes of T's support tree, of p_H(children used), and the optimisation separates over subtrees.
- ψ(u) − u is nondecreasing and has a unique zero u* < 0. Hence spread(H_d) ↑ e^{−u*} ≤ β_H.
- Equality holds iff H is shifted-β_H-spread.

Numbers:
- AHS: p = 1/2, 1/5, 1/10 for |S| = 1, 2, 3, so equality holds and spread(H_d) → √10.
- The minimiser is "one unary step at the root, then a full subtree". This gives spread(H_d) = √10·(2/√10)^{1/3^{d−1}}: 2, 2.714, **3.0053**, 3.109, 3.144, …
- DP for d ≤ 8 and brute force for d ≤ 2 agree (exp1, exp2). H_2 (10^4 sets) was also verified 3-SF directly (exp2).
- Triangle iterates: spread → 3 (1.5, 2.12, 2.52, 2.75, …).

**Answer to "spread > 3?"** Yes.
- The smallest known example is 2×H_2: n = 9, spread 3.00533.
- Anything above √10 in spread would be a new record for f_3 itself, by Thm 2.1.
- Among intersecting 3-SF families, √10 − ε is also attained (H_d is intersecting). Compare LSZ, which shows that intersecting families alone allow spread ~ log n/loglog n.

## 3. LSZ-type constructions

Setup: blocks B_1..B_m of size t. A member (i, x) is B_i together with the transversal x ∈ [t]^{[m]∖i}.

**Thm 3.1 (PROVED; CHECKED on (t,m) = (3,3), (3,4), (4,3): types I/III counts are 36/27, 468/972 and 384/64, and there is no type II).**
- Type I, (i,x),(i,y),(i,z): a sunflower iff x, y, z is an alphabet-model sunflower.
- Type II, two with block i and one with block j ≠ i: never a sunflower. Every point of B_i missed by the third member has multiplicity 2, and there is one since t ≥ 2.
- Type III, blocks i, j, k all distinct: a sunflower iff y_i = z_i, x_j = z_j, x_k = y_k, and every other coordinate is all-equal or all-distinct. With all-equal other coordinates, this is exactly **three lines through a common full word**.

**Thm 3.2 (PROVED).** Let F be a 3-SF LSZ-type family and F_i = {x : (i,x) ∈ F}.
- Each F_i is a 3-SF alphabet code, so |F| ≤ m·g_t(m−1).
- Each full word lies on at most 2 present lines, so t·|F| ≤ 2t^m, i.e. |F| ≤ 2t^{m−1}.
- Hence spread ≤ (m·g_t(m−1))^{1/(m+t−1)}, whose limsup is ≤ κ_t ≤ L_3.

Exact maxima (CP-SAT, exp3): 12 for LSZ(3,3), versus 27 members in the full LSZ(3,3); 12 for LSZ(4,3); ≥ 34 for LSZ(3,4) (upper bound ≤ 55). The spreads are 1.44, 1.32 and 1.56 respectively.

**Thm 3.3 (PROVED): the variant with an intersecting 3-SF seed H (M members, rank k) in every block.**
- Types I and II are automatically excluded.
- Type III is a sunflower iff the three partial words extend a common full word.
- So F is 3-SF ⇔ every full word has at most 2 present lines through it. This gives |F| ≤ 2M^{m−1}, and spread ≤ M^{1/k} < β_H (a single inner member in one block has p ≈ 1/M).

**What goes wrong.** LSZ gets intersection for free from the full distinguished block. Its spread, however, is carried entirely by the transversal link [t]^{m−1}, which is not 3-SF. Every repair replaces that link by a 3-SF family whose spread is again bounded by the unknown constant. On top of that, full blocks create type-III "three directions" sunflowers, which cost a factor ≥ M (or t) in size.

## 4. Lemma candidates

**L1 (PROVED; standard or elementary).** For 3-SF F and any Y: ν(F_Y) ≤ 2. For A ≠ B with Y = A∩B:
- (a) every C ∈ F_Y meets A△B;
- (b) {C ∈ F_Y : C∩(B∖A) = ∅} is intersecting outside A∪B, because (B, C, C′) would otherwise be a sunflower. The same holds with A and B swapped.

So every pair-core link is the union of two intersecting "half-links" and the part meeting both petals. This is the only mechanism the saturating constructions use: witnesses come from intersecting inner families (Thm 1.1).

**L2 (PROVED, negative).** There is no "dense-core" lemma.
- In LSZ every sunflower core Y has |F_Y| ≤ R^{−|Y|}|F|, and the cores B_i are spread-tight up to a factor 1 + o(1).
- So "R-spread ⇒ a sunflower whose core satisfies |F_Y| ≥ C^{−|Y|}|F| with C ≪ R" is false.
- Sunflowers in spread families must be found at cores that density alone cannot distinguish.

**L3 (PROVED, negative).** There is no linear-witness lemma. In H_d the number D of points of multiplicity exactly 2 in an i.i.d. triple satisfies E[D] ≤ 3Σp_x^2 = 3·1.5^d = O(n^{0.37}), yet D ≥ 1 for every non-diagonal triple. 3-SF families can therefore be witnessed by o(n) points typically.

**L4 (CHECKED).** Entropy constant: the ratio H(A)/Σφ(p_x) on the constructions is 1.107 (AHS seed), 1.157 (2×AHS), 1.172 (T[H]) and 1.1513 (H_d as d → ∞). So the K_3 in the entropy equivalence must be ≥ log√10.

**L5 (CONJECTURE; implied by the conjecture, since shifted-β-spread gives |H| ≥ β^{k−1}).** Every intersecting 3-SF family is shifted-β-spread only for β ≤ β_0. The data: β = critical base, with equality in all extremal families (triangle 3, AHS √10, T[T] 3, T[H] 3.13, H[T] 3.06).
- This is the substitution-invariant form of the seed problem.
- A proof would need cross-cell incompatibility: the anchored-cell bound 1 + Σ_S ψ(n−|S|) loses the factor (1+β)^n/β^n because it treats the 2^n cells independently.

**L6 (CONJECTURE, a small-ball/supersaturation form; implies the conjecture).** There exist c and R_0 > e^{c/2} such that every R-spread measure with R ≥ R_0 has P(D = 0) ≥ e^{−cn}.
- Data: transversal [q]^n gives P(D=0) = (1−3(q−1)/q²)^n.
- AHS iterates give P(D=0) = 10^{−(n−1)} at spread → √10. So R_0 > √10 is forced, and c ≥ log 10 on that range.
- Not tested beyond these families.

**L7 (PROVED).** Shifted-spread closure (Thm 2.2). This is the only multiplicative invariant found that is tight on every known extremal family, so it is a natural potential function for an induction on seeds.
