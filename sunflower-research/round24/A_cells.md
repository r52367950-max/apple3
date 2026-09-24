# A_cells — anchored trace cells and intersecting 3-sunflower-free families (round 24)

Agent direction: "anchored trace cells + intersecting structure", r = 3. Code: `r24/A_cells_code/` (CP-SAT via ortools).

## Summary

* Notation: f(n) = f_3(n); g(m) = ψ_3(m) = max size of an **intersecting** 3-SF m-uniform family. L := lim f(n)^{1/n} (it may be +∞).
* **Reduction (R1, PROVED):** f(n) ≤ 1 + Σ_{m=1}^n C(n,m) g(m), and g(m) ≤ 1 + Σ_{s=1}^{m-1} C(m,s) g(m−s).
* **Growth-rate identity (R2, PROVED; the composition idea goes back to Abbott–Hanson–Sauer and the lit agent re-derived it):**
  L = lim g(m)^{1/m} = **sup_{a≥2} g(a)^{1/(a−1)}** = lim g(a)^{1/(a−1)}. Hence g(a) ≤ L^{a−1} for every a. The natural "dimension" of an
  intersecting family is m−1, and it is additive under composition. Also f(n) ≥ 2g(n), g(n+1) ≥ f(n), and g(m) ≥ 2g(m−1)+1.
* **Exact data (R3, CHECKED-NUMERICALLY):** g(1..4) = 1, 3, 10, 27. g(3)=10 is attained by the 2-(6,3,2) design, whose point links are C_5. It is
  exact by a complete CP-SAT solve with a proved ground-set bound. g(4) ≥ 27 comes from the recursive triangle F_2, and =27 is from Axante et al.
  **f(n) = 2g(n) for n = 1,2,3.** The AHS constant √10 is exactly g(3)^{1/2}. To beat it, some a needs g(a) > 10^{(a−1)/2}, i.e. g(5) ≥ 101 or g(6) ≥ 317.
  **Correction to CONTEXT.md:** "39 ≤ f_3(4) ≤ 49" is Axante's f(3,4) (3-uniform, **4** petals). For 3 petals, 54 ≤ f_3(4) ≤ 83. I verified f_3(4) ≥ 54
  directly by brute force (two disjoint copies of F_2).
* **Structural lemmas (R4, PROVED):** disjoint traces give cross-intersecting cells; an exact criterion for cross-cell sunflowers (trace triple weakly
  sunflower AND residual triple weakly sunflower); a residual lies in at most two cells with pairwise disjoint traces; exchange neighbours force stars;
  Mantel per core gives P(A∩B=S) ≤ ½P(A∩B⊇S).
* **Negative results (R5–R8, PROVED/REFUTED):**
  * The per-cell worst-case recursion provably cannot close. On T^k it overshoots by (1+2√3)^k versus 3^k.
  * Trace-LYM, Σ|G_S|c^{|S|} ≤ c^m, trace-entropy ≤ K·E|trace|, "bounded τ", and "intersecting ⇒ not C-spread ⇒ conjecture" all fail.
  * Most importantly, **any layer-by-layer bound** of the form layer_s ≤ K f(s) g(m−s), even in LYM form Σ_s layer_s/(f(s)g(m−s)) ≤ K, **cannot close an
    induction unless K < 1**. The 2-(6,3,2) design has this LYM sum = 1.5, so the anchored-cell sum can only be made lossless by constraints *between
    layers*.
* **Composition cells are deficient (R6, PROVED given g ≤ L^{k−1}):** in O[H], a cell whose members differ from the anchor in q inner copies has size
  ≤ L^{rank−q}. That is a factor L^{q−1} below the intersecting bound. This is the quantitative mechanism that "pays" for trace entropy in the extremal
  families.
* **New cross-cell conjecture — "colour lemma" (R7):** for pairwise disjoint traces S_1..S_q of equal size s, Σ_i |G_{S_i}| ≤ 2 g(m−s). This is tight
  (product construction). It is PROVED for m−s = 2, for every q, by a König/matching argument, and CHECKED-NUMERICALLY for m−s = 3 (q=3 with |Y| ≤ 7,
  q=4 with |Y| = 6, all maxima exactly 20 = 2g(3)). A consequence would be that the singleton layer is ≤ 2g(m−1), not m·g(m−1).

---

## 1. Definitions

F is 3-SF if no three distinct members have equal pairwise intersections. A *weak sunflower* is a triple (possibly with repeats) with equal pairwise
intersections. A triple of sets is weakly sunflower iff no point lies in exactly two of them. G is intersecting if every two members meet.
For A ∈ F and S ⊊ A: G_S(A) = {B∖A : B ∈ F, B∩A = S} (the *cell*). layer_s(A) = Σ_{|S|=s} |G_S(A)|.

## 2. Results

### R1. Anchored reduction — PROVED
**Statement.** Let F be 3-SF and n-uniform, and fix A ∈ F.
(i) Each cell G_S(A), S ⊊ A, is an intersecting 3-SF (n−|S|)-uniform family.
(ii) |F| = 1 + Σ_{S⊊A}|G_S(A)|, hence f(n) ≤ 1 + Σ_{m=1}^{n} C(n,m) g(m).
(iii) If F is intersecting then G_∅(A) = ∅, hence g(m) ≤ 1 + Σ_{s=1}^{m−1} C(m,s) g(m−s).

**Proof.**
* B ↦ (B∩A, B∖A) is injective. For B ≠ A we have S = B∩A ≠ A, so B∖A has n−|S| ≥ 1 points.
* Intersecting: suppose B,C ∈ F with B∩A = C∩A = S and (B∖A)∩(C∖A) = ∅. Then A∩B = A∩C = B∩C = S. A, B, C are distinct, because B, C ≠ A (each has
  points outside A) and B ≠ C (their nonempty parts outside A are disjoint). So they form a sunflower, which is impossible.
* 3-SF: suppose three distinct residuals B_i' form a sunflower with core K. The sets B_i = S ∪ B_i' are distinct and have pairwise intersections S ∪ K.
* (iii): if F is intersecting, S = ∅ is impossible.
* The cell sizes are bounded by g(n−|S|). Sum over the C(n,s) sets S of each size s. ∎

Converse remarks: g ≤ f trivially, and g(m+1) ≥ f(m) (add one new point to every member; this preserves 3-SF and makes the family intersecting).
So "g(m) ≤ c^m for all m" ⇔ "f(n) ≤ C^n for all n", with the two constants related via C = 1+c and c = C.

### R2. Composition and the growth-rate identity — PROVED (idea: Abbott–Hanson–Sauer; independently in the lit digest)
**Lemma (weighted composition).** Let O be a 3-SF family (not necessarily uniform) on points V, and give each i ∈ V a weight k_i ≥ 1 such that
Σ_{i∈A} k_i = M for every A ∈ O. For each i let H_i be an intersecting 3-SF k_i-uniform family on its own disjoint ground set. Define
O[H] = {∪_{i∈A} X_i : A ∈ O, X_i ∈ H_i}. Then O[H] is M-uniform and 3-SF, and |O[H]| = Σ_{A∈O} Π_{i∈A} |H_i|. If O is intersecting, so is O[H].

**Proof.** Take three members X, Y, Z of O[H] with outer sets A, B, C.

*Case 1: A, B, C not all equal.* We claim some point i ∈ V lies in exactly two of A, B, C.
* If they are distinct, they are not a sunflower, so some point lies in exactly two of them.
* If A = B ≠ C: two distinct sets of equal weight cannot be nested, so A ⊄ C. Any i ∈ A∖C lies in exactly two.

So say i ∈ A∩B, i ∉ C. The inner members X_i, Y_i ∈ H_i intersect, since H_i is intersecting (or they are equal and nonempty). A common point p lies in
X and Y but not in Z. So X∩Y ≠ X∩Z, and the triple is not a weak sunflower.

*Case 2: A = B = C.* Since the copies are disjoint, X, Y, Z form a weak sunflower iff each inner triple (X_i, Y_i, Z_i) does. In a uniform 3-SF family a weak
sunflower must be constant: if two are equal, the third contains them and so equals them by uniformity; three distinct ones are forbidden. So X = Y = Z.

Intersecting: A∩B ∋ i for some i, and the inner members there meet. ∎

**Corollaries.**
* (a) g(ak) ≥ g(a)·g(k)^a and f(ak) ≥ f(a)·g(k)^a.
* (b) f(n) ≥ 2g(n): take O = two disjoint points, i.e. a disjoint union of two intersecting families.
* (c) g(m) ≥ 2g(m−1)+1. Start from A plus {a∪R, b∪R : R ∈ H}, with H intersecting 3-SF (m−1)-uniform outside A and a_R ≠ b_R ∈ A arbitrary.
  * Triples (a∪R, b∪R, c∪Q) have residuals R, R, Q, which are weakly sunflower only if R ⊆ Q, i.e. Q = R.
  * Distinct residuals from H are never weakly sunflower.
  * A∩(a∪R) = {a} ≠ {b}.
  * (Weaker than the truth for m ≥ 3.)
* (d) **L = sup_a g(a)^{1/(a−1)} = lim_a g(a)^{1/(a−1)}.**
  * Iterating (a) with k = a gives g(a^t) ≥ g(a)^{(a^t−1)/(a−1)}. So L ≥ lim g(a^t)^{1/a^t} ≥ g(a)^{1/(a−1)}.
  * Here we used g ≤ f and that f(n)^{1/n} → sup = L by supermultiplicativity.
  * Conversely g(a) ≥ f(a−1) and f(a−1)^{1/(a−1)} → L.
  * **Consequence: g(a) ≤ L^{a−1} for every a** (an unconditional inequality in [0,∞]).

The dimension dim(G) := m−1 of an intersecting family is additive: dim O[H] = dim O + a·dim H. Moreover log|O[H]|/dim is a convex combination of
the two ratios. For products of intersecting families, dim(G_1⊗G_2) = dim G_1 + dim G_2 + 1, but log|G_1⊗G_2| ≤ (dim G_1 + dim G_2) log L.
**Products are deficient by one factor L.** This is used in R6.

### R3. Small exact values — CHECKED-NUMERICALLY (plus proved ground-set reductions)
* g(1) = 1 and g(2) = 3 (an intersecting graph is a star or a triangle, and a 3-SF star has ≤ 2 edges).
* **g(3) = 10.**
  * Ground-set bound: with anchor A = {0,1,2}, every member meets A.
  * Each trace-2 cell has ≤ g(1) = 1 member, which adds 1 new point.
  * Each trace-1 cell is an intersecting 3-SF graph (≤ 3 edges, ≤ 3 new points).
  * So at most 12 outside points, giving N ≤ 15.
  * CP-SAT over all 235 triples meeting A (158,235 sunflower clauses plus disjointness clauses) returns OPTIMAL = 10 (`g3exact.py`).
  * The optimum is the 2-(6,3,2) design (the 10 triples of a 6-set, one from each complementary pair, with every pair covered twice). Its point links are
    5-cycles.
  * Anchor profile: 3 pair-cells of size 1 and 3 point-cells of size 2 (2-stars, not triangles).
* **g(4) = 27.**
  * Our exhaustive solves on N ≤ 9 points (members meeting the anchor) give 15, 24, 27 for N = 7, 8, 9. The N = 10 run did not finish.
  * The optimum at N = 9 is exactly the recursive triangle F_2, which is the triangle composed with itself. It is 12-regular with intersection sizes
    {1:162, 2:135, 3:54}.
  * The upper bound 27 is Axante et al. (machine-assisted), per LIT_digest.
* f(1..3) = 2, 6, 20 = 2g(n). f_3(4) ≥ 54 = 2g(4) (`check54.py`: 54 sets, 18 points, 0 sunflowers).
* **CONJECTURE (weak evidence):** f(n) = 2g(n) for all n. It is true for n ≤ 3 and open at n = 4 (54 ≤ f_3(4) ≤ 83). It says nothing about L, but it would
  mean that optimal 3-SF families have a bipartite-like disjointness graph.
* **Lower-bound target:** because L ≥ g(a)^{1/(a−1)}, the 50-year-old √10 = g(3)^{1/2} would improve if g(5) ≥ 101 or g(6) ≥ 317. We know
  g(5) ≥ f(4) ≥ 54 and g(5) ≤ 1 + 5 + 30 + 100 + 5·27 = 271. The ratios g(m)/g(m−1) are 3, 3.33, 2.7. A dedicated search for g(5) is cheap, and it is the
  one place where a new *record* is conceivable.

### R4. Cross-cell structure for an intersecting 3-SF G with anchor A — PROVED
Write B' = B∖A.

* **(a) Exact cross-cell criterion.** For B ∈ G_{S1}, C ∈ G_{S2}, D ∈ G_{S3} (distinct members, all ≠ A), the triple is a sunflower iff (S1,S2,S3) is a weak
  sunflower in A AND (B',C',D') is a weak sunflower outside A. Also A, B, C form a sunflower iff S1 = S2 and B'∩C' = ∅.
  *Proof:* B∩C = (S1∩S2) ⊔ (B'∩C'), since the two parts live in disjoint regions. Equality of the three pairwise intersections splits into the two regions. ∎
* **(b) Disjoint traces are cross-intersecting.** If S∩T = ∅ then every member of G_S meets every member of G_T, because B∩C = B'∩C' must be nonempty.
  This uses that G is intersecting; for a general 3-SF F it is false. Consequently, for a family 𝒮 of pairwise disjoint traces, the union ∪_{S∈𝒮} G_S is an
  intersecting set family.
* **(c) Multiplicity.** A residual R lies in at most two cells whose traces are pairwise disjoint (and nonempty). Otherwise the three members S_i ∪ R
  have pairwise intersection R. Similarly, the traces sharing a given residual form a 3-SF family on A.
* **(d) Exchange neighbours.**
  * Members B with |A∩B| = m−1 number at most m, at most one for each a ∈ A. If B_1 = A−a+p and B_2 = A−a+q with p ≠ q, then A, B_1, B_2 is a sunflower.
  * Forcing: if A−a+p ∈ G, then every member C with C∩A = {a} contains p. Apply (b) with traces A−a and {a}.
  * More generally, B ∈ G_S forces every member of every G_T with T∩S = ∅ to meet B'.
* **(e) Pair decomposition.** For every S ≠ ∅, let Γ_S be the graph on {A ⊇ S} with edges {A,B : A∩B = S}. The edge sets of the Γ_S partition the pairs of G.
  Each Γ_S is triangle-free (a triangle is a sunflower with core S). The neighbourhood of A in Γ_S is exactly the cell G_S(A), so cells are independent sets.
  * Mantel gives #{ordered A≠B : A∩B = S} ≤ d(S)²/2, i.e. P(A∩B = S) ≤ ½ P(A∩B ⊇ S) off the diagonal (i.i.d. uniform A, B).
  * The triangle-free inequality Σ_v deg² ≤ |V|·e gives Σ_{A⊇S}|G_S(A)|² ≤ (d(S)/2) Σ_{A⊇S}|G_S(A)|.
  * These encode 3-SF only core by core. Iterating them alone reproduces only the ordered-Bell (factorial) bound, as with the archive's collision moments.

### R5. The naive recursion cannot be repaired by per-cell bounds — PROVED (method refuted)
* In T^k (the product of k triangles; 2k-uniform, intersecting, 3-SF, size 3^k), for anchor A the populated traces of size k+j number C(k,j)2^{k−j}.
* Every cell is a single set, because the trace determines the member.
* The cell bound any per-cell argument can use is g(k−j) ≥ 3^{(k−j)/2}. So Σ_S g(m−|S|) over populated traces is ≥ Σ_j C(k,j)2^{k−j}3^{(k−j)/2} = (1+2√3)^k.
  That is exponentially larger than |T^k| = 3^k and also larger than L^{2k} for L < 1+2√3 ≈ 4.46. Even a perfect oracle for g on smaller ranks therefore
  cannot certify |G| ≤ c^m through Σ_S (cell bound) unless c ≥ √(1+2√3) ≈ 2.11, and in general it gives only the ordered-Bell growth m!/(ln 2)^m.
* Averaging the per-cell bound over the anchor A does not help: Σ_S |G_S(A)| = |G|−1 identically, and T^k is vertex-transitive.

### R6. Candidate inequalities tested — REFUTED (all proofs by explicit families)
1. *Trace LYM* Σ_{S populated} c^{−|S|} ≤ 1. False: K_{n+1}-stars (intersecting, 3-SF) have n populated singleton traces at every anchor.
2. *Weighted cells* Σ_S |G_S(A)| c^{|S|} ≤ c^m. False for every c on T^k: the sum is c^k(2+c)^k > c^{2k}. Exchange neighbours alone give 2k·c^{m−1}.
3. *Trace entropy* H(B∩A) ≤ K·E|B∩A| (B uniform; this would close an entropy induction with cells ≤ c^{rank}).
   * False on K_{n+1}-stars, where H = log n and E = 1.
   * On the extremal design, H(S) = log 5.67 and E|S| = 4/3, so the inequality needs K ≥ log 3.67 > log √10 = log L_known.
   * Even the optimum violates it, because its point-cells are deficient (size 2 < 3). The two-sided version H(A∩B) ≤ 2 log L·E|A∩B| + log 2 holds on the
     design (3.02 ≤ 3.45) but fails on stars.
4. *Bounded cover number* is useless:
   * τ(T^k) = 2.
   * The recursive triangle F_t has τ = m: a cover must cover F_{t−1} in two of the three copies, so τ_t = 2τ_{t−1}.
   * The iterated design also has τ = m, since τ(O[H]) = τ(O)·τ(H) by the same argument.
   * So "g ≤ τ·f(m−1)" is just the factorial branching bound.
5. *"Intersecting 3-SF families are not C-spread" does not imply the conjecture through R1.*
   * Non-spreadness gives |G| ≤ C^k f(m−k) with k ≥ 1. With f ≤ 1 + Σ C(n,m)g(m) the induction produces (C/c)(1+c)^n, not c^n.
   * The same happens at the minimal counterexample (spread F): cells give Σ_S (C/c)c^{−|S|}|F| = (C/c)(1+1/c)^n|F|.
   * The non-spread statement is true if the conjecture is true, but it is not a sufficient intermediate step via cells.
6. *Layer-LYM.* Suppose there were an anchor with Σ_{s≥1} layer_s/(f(s)g(m−s)) ≤ K (and for general F also s = 0, with f(0) = 1).
   * The joint induction f ≤ φc^s, g ≤ γc^{j−1} needs Kφ < 1. Since f(0) = 1 forces φ ≥ 1, it requires K < 1.
   * The design has layer_1 = 6 = f(1)g(2) and layer_2 = 3 = f(2)g(1)/2, so the LYM sum is 1.5 > 1.
   * F_2 (m = 4): layers (12, 10, 4). Normalised sums are 0.6 + 0.56 + 0.2 = 1.35, or ≈ 1.76 with the ground-limited f_4(s).
   * So the extremal families beat every single product f(s)g(m−s) (g(3) = 10 > 6), and **no per-layer (or layer-LYM) bound can make the anchored sum
     lossless.** Lossless bounds must couple different layers. PROVED (implication) + CHECKED-NUMERICALLY (values).
   * Note: layer_s ≥ f_A(s)·g(m−s) is attainable for each single s, via G = {A} ∪ (𝒯 ⊗ H) with 𝒯 a 3-SF s-uniform family on A and H intersecting. PROVED
     via R4(a).

### R6'. Cells of compositions are deficient — PROVED (conditional on g(k) ≤ L^{k−1}, which is R2(d))
* Let O be a-uniform, H be k-uniform intersecting 3-SF, and take the anchor X = ∪_{i∈A} X_i.
* A member Y with outer set B lies in cell S = ∪_{i∈A∩B}(X_i∩Y_i). The cell is a product over i ∈ B:
  * over free copies i ∈ B∖A: all of H, of size ≤ L^{k−1} and rank k;
  * over shared copies with Y_i ≠ X_i: inner cells, intersecting, of size ≤ L^{rank_i−1};
  * over shared copies with Y_i = X_i: factor 1, rank 0.
* Hence |cell| ≤ L^{rank(cell) − q}, where q = #{i ∈ B : Y_i ≠ X_i} ≥ 1.
* Relative to the intersecting-cell bound L^{rank−1}, the cell is deficient by L^{q−1}, and q ranges up to a.
* This is the mechanism by which extremal families pay for their high trace entropy (R6.3). A proof would need a *general* notion of "number of
  independent components of a cell". None is defined for arbitrary families.

### R7. Colour lemma — CONJECTURE (tight), PROVED for residual rank 2, CHECKED-NUMERICALLY for rank 3
**Conjecture.** Let G be intersecting 3-SF with anchor A, and let S_1, …, S_q be pairwise disjoint traces of equal size s. Then Σ_i |G_{S_i}(A)| ≤ 2g(m−s).
In particular the singleton layer satisfies layer_1(A) ≤ 2g(m−1). The naive bound is m·g(m−1).

**Tightness.** Take 𝒯 = two singletons {a}, {b} and G = {A} ∪ {{a},{b}} ⊗ H.

**Reformulation.** The data are colour classes G_i ("colours" = traces) on the outside set Y. Each class is intersecting and 3-SF; the union is intersecting
(R4b); each residual has ≤ 2 colours (R4c); and there is no *rainbow* weak sunflower over 3 distinct colours (R4a). These are exactly the constraints the
anchor imposes among the cells S_i. Other layers only add constraints.

**Proof for rank k = m−s = 2.** The union of residual edges is an intersecting graph, so it is a triangle or a star.
* Triangle: 3 edges × ≤ 2 colours = 6 = 2g(2).
* Star with centre v:
  * Form the bipartite incidence graph between edges and colours.
  * A matching of size 3 gives 3 distinct star edges with 3 distinct colours. These form a rainbow sunflower with core {v}, which is forbidden.
  * By König's theorem the incidences are covered by 2 vertices (2 colours, 2 edges, or one of each).
  * A colour covers ≤ 2 star edges (a colour class is 3-SF) and an edge covers ≤ 2 colours. So there are ≤ 4 incidences.
* Hence Σ ≤ 6 = 2g(2). ∎

**Checks** (`colors.py`, exact CP-SAT optima):
* k = 2: q = 3, 4 and |Y| = 4, 5, 6 give max 6.
* k = 3: q = 3 with |Y| = 6, 7 and q = 4 with |Y| = 6 give max **20 = 2g(3)**.

**Why it matters.**
* It is the first genuinely cross-cell inequality that removes the factor C(m,s) for a *family of disjoint traces*.
* A weighted extension would be a real lever: for any pairwise disjoint traces of arbitrary sizes, Σ_i |G_{S_i}|/g(m−|S_i|) ≤ 2 (CONJECTURE).
* The König argument suggests the general proof shape. Rainbow sunflowers are matchings of size 3 in a "residual–colour" incidence structure restricted
  to sunflower triples. The colour classes are 3-SF (each colour covers little of any sunflower-rich region) and residuals carry ≤ 2 colours.
* Caution: by R6.6, even this lemma for every layer would not close an induction on its own. It must be combined with coupling between overlapping traces
  (the core-K constraints of R4a).

### R8. Easy positive statements — PROVED (recorded for completeness; not deep)
* **(a) Cell-exponent criterion.** If some anchor A has |G_S(A)| ≤ β^{m−|S|} for all S, then |G| ≤ (1+β)^m. If every cell is a single set
  (trace-determined anchor, as in T^k), then |G| ≤ 2^m.
* **(b) Bounded intersection size.** If |A∩B| ≤ t for all pairs, then |F| ≤ 2(2m)^t. This follows from classical branching: a link at a point lowers the
  maximum intersection by 1, and a pairwise-disjoint 3-SF family has ≤ 2 members.
* **(c) Linear intersecting families** have ≤ m+1 members (archive).

None of these touches the extremal regime: intersections of size Θ(m) in T^k, and m^{0.37}–m^{0.42} on average in the iterated design and recursive triangle.

## 3. What uses sunflower-freeness at nonempty cores

* The LSZ family is intersecting, so it passes R4(b).
* It fails R4(c), R4(d) and the colour lemma. Its members with a common distinguished block B_i have many residuals pairwise meeting exactly in B_i, which is
  a sunflower with core B_i. In the cell picture, cell sizes are unconstrained and the colour classes need not be 3-SF.
* Every nontrivial statement above (Mantel per core, colour lemma, exchange forcing, multiplicity ≤ 2) uses 3-SF at a **nonempty** core.

## 4. Most promising next steps

1. **Prove the colour lemma for all k.** Start with the weighted, mixed-size version for pairwise disjoint traces. The König/matching proof for k = 2 is the
   template.
2. **Find a coupling inequality between overlapping traces.** Needed: cells G_S, G_T with S∩T = K ≠ ∅, using the core-K rainbow constraint of R4(a). The
   design shows the size-1/size-2 layers must trade off (6 + 3 = 9, not 6 + 6). Goal: an inequality whose LYM constant is < 1 after the dimension shift
   (R6.6 makes this precise).
3. **Build a "component-count" potential.** Assign to each cell a certified number of independent components q (R6'). Prove |cell| ≤ L^{rank−q}, and
   show that traces with high entropy force large q. This is the mechanism visible in all extremal examples.
4. **Computation.** Search g(5) (≥ 101 would beat Abbott–Hanson–Sauer's √10) and g(6) (≥ 317). Also test f_3(4) = 54, i.e. the conjecture f = 2g.

## 5. Files
* `A_cells_code/gsearch.py`, `g3exact.py` — g(3) exact (N = 15 reduction), g(4) small-N solves (`g4.py`).
* `A_cells_code/check54.py` — f_3(4) ≥ 54 and f_3(3) ≥ 20 verification.
* `A_cells_code/colors.py` — colour-lemma solver.
* `A_cells_code/analyze.py` — cell profiles.
