# REVIEW round 1 — adversarial referee report on r24 PROVED items (2026-09-24)

Scope: B_log.md (Lemma 1.1, Lemma 1.2, halving, Thm 1.4, Prop 1.3, Thm 2.1, Prop 2.3, Prop 3.2), C_spectral.md (pair LP, fake point,
entropic Mantel, A.5, B), A_cells.md (R1, R2 composition + L identity + corollaries, R4, R5/R6/R6', R7), LIT_digest §B5–B6.
Test scripts: `r24/code/review/rv1.py … rv6.py` (all run; outputs quoted below).

## Summary of verdicts

| # | Item | Verdict |
|---|---|---|
| 1a | B Lemma 1.1 (one-round fragment lemma) | **correct** (checked line by line; independent exact test with sub-probability, non-uniform ν: max LHS/RHS = 0.07) |
| 1b | B Lemma 1.2 (sub-probability rounds) | **correct** |
| 1c | B halving schedule (δR ≥ 16, Σφ_j ≤ 1/4) | **correct** |
| 1d | B Thm 1.4 | **correct**; minor slip in the "Meaning" paragraph (factor 2). **Not original**: routine truncation of the ALWZ/Rao/BCW iteration |
| 1e | B Prop 1.3 | correct (elementary) |
| 2a | B Thm 2.1 (LSZ^N barrier) + core-≥3 lemma for LSZ | **correct** (all four parts and the parameter choice) |
| 2b | B Prop 2.3 | correct |
| 2c | B Prop 3.2 | **correct with fix**: (a) must exclude S = A (the anchor itself) |
| 3a | C entropic Mantel (r = 3) and r-petal version | **correct** (proof checked; numerics r = 3 and r = 4 pass) |
| 3b | C pair LP upper bound K* ≤ 2n/C, Poisson fake ⇒ K* ≳ n/C | **correct**, but the "K* ≈ n/(C log 2), Poisson(log 2) optimiser" description is **false**: K* ≤ (3/2)n/C (proved below) and K* → (3/2)n/C |
| 3c | C "Limits (PROVED)" 1 (chain iteration factorial) | **gap / mislabelled**: a heuristic, not a proof |
| 3d | C A.5, Paley–Zygmund / expander-mixing certificates | correct |
| 4a | A R1 anchored reduction | correct |
| 4b | A R2 composition lemma O[H] (weighted, non-uniform O) | **correct** (200 random weighted instances pass; control with non-intersecting inner family fails, as it should) |
| 4c | A R2(d) L = sup g(a)^{1/(a−1)} = lim; g ≤ L^{a−1}; f ≥ 2g; g(m+1) ≥ f(m); g(m) ≥ 2g(m−1)+1 | **correct** ((c) has a one-case omission in its write-up, fix below) |
| 4d | A R4 cross-cell lemmas (a)–(e) | correct |
| 4e | A R5 | correct with trivial fixes (g(1) = 1 < √3; one typo "L < 1+2√3" should read "L < √(1+2√3)") |
| 4f | A R6' composition cells deficient | **gap**: the cell is *not* a product when the outer cell has > 1 member; the claimed bound L^{rank−q} is unproved. Corrected statement below |
| 4g | A R7 colour lemma | correctly labelled CONJECTURE; the rank-2 proof (König) is **correct** |
| 5a | LIT §B5 composition inequality ψ_3(ab) ≥ ψ_3(a)ψ_3(b)^a, f_3(ab) ≥ f_3(a)ψ_3(b)^a | **correct** |
| 5b | LIT §B5 "ψ_3(3) = f(2,3) = 6" | **FALSE**: ψ_3(3) ≥ 10 (2-(6,3,2) design; verified), and ψ_3(3) = 10 per A_cells |
| 5c | LIT §B6 shifted families trivial | **correct** |

---

## 1. B_log.md, priority 1

### 1.1 Lemma 1.1 — correct
I checked every step:
* T(B,W) = B'\W ⊆ B\W since B' ⊆ B ∪ W. B itself is a candidate, so B' exists.
* With Z = W ∪ T, B'(=first minimiser) ⊆ Z, so B*(Z) exists. B* ⊆ Z ⊆ W ∪ B, so B* is a candidate for (B,W), hence |B*\W| ≥ t. Also B*\W ⊆ Z\W = T (T ∩ W = ∅). So B*\W = T and T ⊆ B*(Z).
* The map (W,B) ↦ (Z,T,B) is injective (W = Z\T). Summing ν(B) over B ⊇ T gives ν(T ⊆ B) ≤ R^{−t}. The number of admissible T for given Z is ≤ C(|B*(Z)|,t) ≤ C(k,t).
* P(W = Z\T) = P(W = Z)((1−δ)/δ)^t for T ⊆ Z, |T| = t. Σ_Z P(W = Z) ≤ 1.

This is exactly the Park–Pham / FKNP "minimal fragment" injection, and the one-step form of the Rao/Tao/BCW spread lemma.
Independent exact test (`rv5.py`: 36 instances, N = 9, sizes 1–4, random **sub-probability, non-uniform** ν, δ ∈ {0.2, 0.5, 0.8}): max LHS/RHS = 0.070.

### 1.2 Lemma 1.2 — correct
* (a) ν_j(S ⊆ ·) = Σ_B ν_{j−1}(B)·1[S ⊆ T(B,W), |T| ≤ k_j] ≤ ν_{j−1}(S ⊆ ·) ≤ R^{−|S|}, by induction. Merging of several B onto one T is harmless.
* (b) is correct by induction.
* (c) Mass lost in round j = Σ_B ν_{j−1}(B) P(|T| > k_j). Supports have sizes ≤ k_{j−1}, so Lemma 1.1 applies with k = k_{j−1}, conditionally on the past. Dropping (1−δ)^t is fine.
* Conclusion: P(ν_J ≠ 0) ≥ E ν_J(total) since ν_J ≤ 1.

### 1.3 Halving — correct
* Given t > k_j = ⌈k_{j−1}/2⌉ ≥ k_{j−1}/2, we have 16^{−t} < 4^{−k_{j−1}}, so φ_j ≤ 2^{k_{j−1}}4^{−k_{j−1}} = 2^{−k_{j−1}}.
* Given k_j ≥ 2: k_{j−1} ≥ 2k_j − 1 ≥ k_j + 1. So the k's are distinct integers ≥ k_{J−1} ≥ 2k_J − 1 ≥ 3, and Σ ≤ 2^{1−k_{J−1}} ≤ 2^{2−2k_J} ≤ 1/4.
* Iterated ceilings give k_J = ⌈n/2^J⌉ ≤ n2^{−J} + 1. When J is reduced to keep k_J ≥ 2, one actually gets k_J = 2, so "max(3, …)" is a safe over-estimate.

### 1.4 Theorem 1.4 — correct (minor slip), not original
Arithmetic check:
* x = ln(3/2)/J ≤ 0.4055.
* δ = 1 − e^{−x} ≥ x(1 − x/2) ≥ 0.4055·0.797/J = 0.3232/J. In fact Jδ is increasing in J and equals 1/3 at J = 1.
* δR ≥ 0.323·R/J ≥ 0.323·50 > 16, using J ≤ R/50.

Proof check:
* Each U_i is marginally W_{1/3}, and the lemma's event depends only on the law of U_i. So a separate coupling per colour plus a union bound is legitimate: P(all three succeed) ≥ 1 − 3/4.
* B_i ∩ B_j ⊆ (B_i\U_i) ∪ (B_j\U_j) because U_i ∩ U_j = ∅.
* Distinctness holds for n > 2s.
* Degenerate case: n = 2 forces J = 0 and the statement is vacuous. That is harmless.

**Slip (Meaning paragraph).** With R = 50ε log₂n, J = ⌊ε log₂ n⌋ ≥ ε log₂ n − 1, so s ≤ 2n^{1−ε} + 1 and the pairwise bound is ≤ 4n^{1−ε} + 2, not 2n^{1−ε} + O(1).
Likewise "≤ n·2^{−L/50}" should be "≤ 2(n·2^{−⌊L/50⌋} + 1)". The Theorem statement itself is right.

**Originality.** Essentially known. Lemma 1.1 is the standard fragment lemma (Park–Pham/FKNP injection; Rao 2020; Tao's blog; BCW 2021). Lemma 1.2 plus halving is the ALWZ/Rao iteration. Thm 1.4 is what you get by stopping that iteration after Θ(R) rounds instead of Θ(log n).
The same truncated "spread approximation" statements are used routinely (e.g. Kupavskii–Zakharov spread approximations). An expert would call this a folklore corollary. It is probably not stated verbatim anywhere, but it would not be accepted as a new result.

It is not trivial, though. The first moment gives only E|A∩B| ≤ n/R (pairwise ≤ ~3n/R for a random triple), whereas Thm 1.4 gives n·2^{−Ω(R)}.
The constants (50, 16) are fine but not optimised.

**Prop 1.3** is correct. §4.2 has a notation clash: "T_{1/q}^n … → 0 when q ≥ c/log n" should read "q ≤ c/log n", i.e. block size 1/q ≥ log n/c. This is cosmetic.

## 2. B_log.md, priority 2

### 2.1 LSZ core-size lemma and Theorem 2.1 — correct
Facts about G:
* |G| = m·t^{m−1} = t^{m+t−1} (m = t^t). G is intersecting.
* Singleton containment probability is (m+t−1)/(mt), so R_t = mt/(m+t−1).
* s points in distinct blocks: P = t^{−s}(1+sa) ≤ t^{−s}(1+a)^s.
* Sets with u ≥ 2 points in one block: P = t^{−s'}/m ≤ R_t^{−(u+s')}, since t^u ≤ t^t = m.
* So G is exactly R_t-spread.

Core ≥ 3 lemma, all three cases checked:
* d_1 = d_2 ≠ d_3: some point of B_{d_1} has multiplicity exactly 2.
* All distinct: p_2 = p_3 is forced in each distinguished block.

Theorem 2.1:
* (i) The product measure is exactly spread. Correct.
* (ii) |A∩B| ≥ N. Disjoint members of F_Y give A∩B = Y, hence |Y| ≥ N. Correct.
* (iii) A coordinate triple with exactly one repeat is impossible by uniformity. Constant coordinates contribute b ≥ 3 core points; non-constant coordinates are genuine sunflowers in G (≥ 3 points). Correct.
* (iv) Correct.
* Parameters: with c = ⌈(1−ε)/ε⌉ and n = b^{1+c}, N = n^{c/(1+c)} ≥ n^{1−ε}, and 1/(1+c) ≥ ε/(1+ε). Correct. Also ln b ≍ t ln t gives the stated R_t.

Remark: all ingredients are elementary. The value of the result is as a barrier statement, and I agree with its logical reading: a method that uses only "spread + no small-core sunflower + intersecting small links" cannot work below ≈ (ε/(1+ε)) ln n/ln ln n.

### 2.2 Prop 2.3 — correct
* The link is forced to have distinguished block i (Y ⊇ B_i with t ≥ 2).
* R_t^{|Y|}P = (1+a)^{−|Y|}·t^t/m = (1+a)^{−|Y|}.
* (1+3a)/(1+a)³ = 1 − O(a²).

### 2.3 Prop 3.2 — correct with fix
**Error in (a):** it uses Σ_S |G_S| = |F| and Σ_S R^{−|S|} = (1+1/R)^n, which requires including S = A (G_A = {∅}, the anchor itself). The minimiser may then be the useless "cell" S = A, whose Λ_A = |F|R^{−n}.

**Fix:** restrict to S ⊊ A. Then Σ_{S⊊A} R^{−|S|}Λ_S^{−1} = 1 − 1/|F| and Σ_{S⊊A} R^{−|S|} = (1+1/R)^n − R^{−n}, so
min_{S⊊A} Λ_S ≤ ((1+1/R)^n − R^{−n})/(1 − 1/|F|). This is ≤ (1+1/R)^n whenever |F| ≥ (R+1)^n (the case of interest), and ≤ (1+1/R)^n(1 + 2/|F|) always.

(b) and (c) are correct. In (c), ln(q/(q−1)) ≥ 1/q gives e^{n/(2q)}.

The sentence "costs exactly the trace entropy … = n/R nats" in "Where it breaks" is a heuristic, not a proved statement. Drop "exactly".

§5 "Refuted general-family version" is labelled REFUTED but only sketched. Relabel it REFUTED (sketch) until the deletion argument is written.

## 3. C_spectral.md

### 3.1 Entropic Mantel — correct
* (i) Given Z = Y with |Y| < n, (A,B) is supported on ordered edges E of the triangle-free graph G_Y. Data processing on 1_E gives D(π_Y‖w⊗w) ≥ −log (w⊗w)(E) ≥ log 2 by Motzkin–Straus (max_w w⊗w(E) = 1 − 1/ω = 1/2).
* (ii) I(A;B|Z) = 2H(Z|A) − H(Z): verified. Use H(A|B,Z) = H(A) − H(Z|B) and H(A|Z) = H(A) + H(Z|A) − H(Z).
* (iii) q_Y = (ν_Y⊗ν_Y)(E_Y) ≤ p_Y²/2 by Motzkin–Straus applied to the restriction of μ to {A ⊇ Y}.
* Adding (i) and (iii) gives 2H(Z|A) ≥ 2E log(1/p_Z) + 2 log2·P(A≠B). Correct.
* r-petal version: G_Y is K_r-free, and Motzkin–Straus gives (r−2)/(r−1), hence log((r−1)/(r−2)). Correct.

The family must be uniform (used in "A ≠ B ⇒ |A∩B| < n"). That is implicit and fine.

Tests (`rv2.py`):
* 240 random laws on greedy 3-SF families (n = 2, 3, 4): min slack 9.8e−5 ≥ 0.
* 240 laws on greedy 4-SF families with the r = 4 constant log(3/2): min slack 0.033.
* F_2 uniform: 2.153 ≤ 2.563.
* The recursion I_t = (4/3)I_{t−1} + (2/3)log 2 for the recursive triangle family is confirmed exactly for t = 1, 2, 3 (`rv6.py`: 0.4621, 1.0782, 1.8997). No written proof is given for general t, so label it CHECKED (t ≤ 3) + claimed.

Originality: the ingredients (Motzkin–Straus per exact-core graph + the Shannon identity for I(A;B|g(A,B))) are standard. I do not know this combination in print. Plausibly new, but minor.

**"Limits (PROVED)" item 1 is mislabelled.** The chain-telescoping formula (with the unexplained division by 1 − P_0^{(k)}) and "Σ H(Z_k|A_k) ≈ log n!" are heuristics about one natural iteration, not theorems. Relabel as HEURISTIC.

### 3.2 Pair LP — Θ(n/C) correct, but the constant and optimiser description are wrong
The constraints are valid:
* T_j: from q_Y ≤ p_Y²/2 summed over |Y| = j, P_j ≤ ½(P_j + Σ_{l>j}C(l,j)P_l).
* S_j: from m_j ≤ max_Y p_Y · Σ_{|Y|=j} p_Y = max p_Y · C(n,j).

The upper bound M ≤ 2nC^{n−1} is correct.

The fake point is correct:
* (j+1)P_{j+1} = P_j.
* Σ_{l≥j} C(l,j)/l! = e/j!, so m_j ≤ θ/j! + C(n,j)/M.
* This gives exactly the stated condition. The script's failures at n = 10, C ∈ {5,10} are consistent with "n ≫ C".

**Error:** "K* ≈ 1.48 n/C ≈ n/(C log 2), matching a Poisson(log 2) optimiser" is false.
*Improved upper bound (PROVED here):* T_0 gives P_0 ≤ 1/2, and T_1 gives P_1 ≤ Σ_{l≥2} l P_l. Hence
m_1 = P_1 + Σ_{l≥2} lP_l ≥ P_1 + max(P_1, 2(1 − P_0 − P_1)) ≥ P_1 + max(P_1, 1 − 2P_1) ≥ 2/3.
With S_1 this gives **M ≤ (3/2)·n·C^{n−1}, i.e. K* ≤ 3n/(2C)**.

*It is asymptotically attained.* In the Mantel-only LP "min m_1 over laws on {0..L}", the optimum is P_0 = 1/2, P_1 ≈ 1/3, P_2 ≈ 1/6 plus a vanishing far tail supporting T_2. min m_1 = 0.6931, 0.6849, 0.6768, 0.6737 at L = 4, 10, 20, 30, decreasing to 2/3 (`rv4.py`).

The authors' own LP values match this, not Poisson: K*C/n = 1.4723 (n = 20) and 1.484 (n = 40), which is *increasing past* 1/ln 2 = 1.4427. For large n, scipy/HiGHS fails on the unscaled LP (`rv3.py`).

Poisson(ln 2) is exactly Mantel-tight (e^{−λ} ≤ 1 − e^{−λ} ⇔ λ ≥ ln 2) and gives only the lower bound 1/ln 2.

**Fix:** state K*(n,C) = (3/2 + o(1))·n/C as n/C → ∞, with the upper bound proved and the lower bound CHECKED-NUMERICALLY / sketched. The qualitative conclusion (pair level ⇒ only the Erdős–Rado factorial recursion, now with factor 3n/2) is unchanged.

### 3.3 Other C items
* A.5: correct. For x ∈ B\C, B∩C ∋ y ≠ x. Then apply Cauchy–Schwarz over ordered pairs, with Σ_{x≠y} ν_{xy}² = 2m_2.
* Paley–Zygmund and expander-mixing bounds: correct (E δ^{−|A∩B|} = Σ_j m_j((1−δ)/δ)^j).
* §B "pair data give only the union bound": correct as a statement about relaxations (A.2 needs all m_j > 0; here m_j = C(n,j)p^n > 0).
* A.2 "Delsarte asymptotically vacuous": the argument is correct as sketched, with N_0 depending on P.

## 4. A_cells.md

### 4.1 R1 — correct.

### 4.2 Composition lemma (R2) — correct
Case analysis:
* Distinct outer sets that do not form a sunflower have a point of multiplicity exactly 2.
* A = B ≠ C: equal positive weights forbid nesting. This is exactly where k_i ≥ 1 is needed.
* The inner intersecting property gives a point in X∩Y\Z.
* A = B = C: weak sunflowers in uniform 3-SF families are constant.

The size formula needs X_i ≠ ∅ (k_i ≥ 1), which is given.

Tests (`rv1.py`):
* 200 random weighted compositions (non-uniform O, weights 1/2, triangle and point inner families): 0 failures.
* The negative control (inner family = 2 disjoint edges, not intersecting) produces a sunflower, as it should.

### 4.3 L identity and corollaries — correct
* (a) Correct.
* (d) Iterating (a) gives log g(a^t) ≥ log g(a)·(a^t−1)/(a−1) (needs a ≥ 2). The converse uses g(a) ≥ f(a−1) and f^{1/n} → sup (Fekete with f(a+b) ≥ f(a)f(b)). So sup = lim = L, and g(a) ≤ L^{a−1}. Correct.
* (b) Correct.
* g(m+1) ≥ f(m): correct.

**(c) g(m) ≥ 2g(m−1)+1: correct, write-up incomplete.** The listed checks omit the triple (A, a∪R, a∪Q) with R ≠ Q and a_R = a_Q = a (or a_R = b_Q, etc.). It is not a sunflower because (a∪R)∩(a∪Q) ⊋ {a}, as H is intersecting. Add this line.
Test: with H = the 2-(6,3,2) design and random a_R ≠ b_R, 30 random labellings all give intersecting 3-SF families of size 21 (`rv1.py`).

### 4.4 R4 cross-cell lemmas — correct
* (a) The region split is valid.
* (b) Uses intersecting. Correct.
* (c) Three cells with pairwise disjoint traces sharing a residual R give the sunflower {S_i ∪ R}. Correct.
* (d) Correct.
* (e) Uses Σ deg² ≤ |V|·e for triangle-free graphs (N(u) ∩ N(v) = ∅ on edges). Correct.

### 4.5 R5 — correct up to trivialities
* The rank-1 cells have g(1) = 1 < √3. Use g(r) ≥ 3^{r/2}/√3 for r ≥ 1 (true: 1, 3, 10 ≥ 1, √3, 3, …). Then Σ ≥ ((1+2√3)^k − 1)/√3, and the growth rate is unchanged.
* Typo: "larger than L^{2k} for L < 1+2√3 ≈ 4.46" should read "for L < √(1+2√3) ≈ 2.11". The next sentence already has the right value.
* R6.1–R6.3 and R6.6 numbers were verified by hand: design H(S) = log 5.67 and E|S| = 4/3 (anchor excluded); LYM sums 1.5 and 1.356.
* R6.6 "cannot close unless K < 1" is a statement about the specific joint induction f ≤ φc^s, g ≤ γc^{m−1}. That is fine as labelled, but do not quote it as "no method".

### 4.6 R6' (composition cells deficient) — GAP
**Location:** "A member Y with outer set B lies in cell S = … The cell is a product over i ∈ B."

The cell G_S(X) contains members from **every** outer set B' with B'∩A = B∩A (S determines A∩B because H is intersecting, but not B\A). So |cell| = |O_{A∩B}(A)| × (product). If the outer cell has several members (e.g. O = the 2-(6,3,2) design, whose point cells have size 2), the product bound is off by that factor.

Example: O = design, H = triangle, S = one point in one shared copy. Then |cell| = 2·3² = 18 with rank 5 and q = 3. The claimed bound L² ≥ 18 is not known (only L ≥ √10 is known). The statement cannot be refuted since L is unknown, but it is unproved.

**Fix (PROVED):** let u = |B\A| and q_sh = #{i ∈ A∩B : Y_i ≠ X_i}. The outer cell is itself a cell of O, of size ≤ g(u) ≤ L^{u−1} when O is intersecting.
So |cell| ≤ L^{u−1}·L^{u(k−1)}·L^{Σ(rank_i−1)} = L^{rank − q_sh − 1} for u ≥ 1, and L^{rank − q_sh} for u = 0.
The deficiency relative to L^{rank−1} is L^{q_sh} (u ≥ 1) or L^{q_sh−1} (u = 0). It counts only the **shared, changed** inner copies; free copies give no deficiency. The claim "q ranges up to a" is overstated except when outer cells are singletons (T^k, the recursive triangle).

### 4.7 R7 colour lemma — labelling correct; rank-2 proof correct
The general statement is labelled CONJECTURE. The k = 2 proof is correct:
* The union graph is intersecting (R4b), so it is a triangle or a star.
* In the triangle case, each edge has ≤ 2 colours (R4c).
* In the star case, a 3-matching in the edge–colour incidence graph is a rainbow sunflower with core {v}. By König there is a cover of size 2, and each cover vertex covers ≤ 2 incidences (a 3-SF star has ≤ 2 edges; ≤ 2 colours per edge).

The numerical claims for k = 3 were not re-run.

## 5. LIT_digest §B5–B6

### 5.1 Composition inequality — correct
* The block restriction argument is correct: a vertex in exactly two outer sets forces disjoint inner members, which contradicts intersecting.
* One step is glossed: "every vertex in 0, 1 or 3 of the h_i ⇒ the h_i coincide". It is fine because H is uniform: a weak sunflower with a repeat is constant.
* ψ_3(2^k) ≥ 3^{2^k−1}, f_3(4) ≥ 54 and the anchored bound are all correct.

### 5.2 "ψ_3(3) = f(2,3) = 6" — FALSE
The 10 triples of a 2-(6,3,2) design (one from each complementary pair) are intersecting and 3-SF (`rv1.py`: verified). So ψ_3(3) ≥ 10, and A_cells' CP-SAT gives exactly 10.
The quoted "Frankl–Wang identity ψ(3,k,2) = f(2,k)" is misapplied, or its indices are misread.
Consequences:
* "c ≥ 3 necessary" should be upgraded to c ≥ L ≥ √10 = ψ_3(3)^{1/2}.
* In F_constructions.md, "ψ_3(5) ≥ 100" should read ≥ 101 (strict improvement over √10 needs ψ_3(5) > 100).

### 5.3 §B6 shifted families — correct
Shifting A down gives {1..n−1, max A}, and then {1..n−1, x} for every n ≤ x ≤ max A. With max A ≥ n+r−1 this gives ≥ r sets with pairwise intersection [n−1]: an r-sunflower.
So F ⊆ C([n+r−2], n) and |F| ≤ C(n+r−2, r−2).
The comparison with Mishra's bound relies on snippets only.

## 6. Additional observation (for CONTEXT.md)
A_cells is right: Axante's "39 ≤ f(3,4) ≤ 49" is 3-uniform with **4 petals**. For 3 petals and 4-uniform, 54 ≤ f_3(4) ≤ 83. CONTEXT.md should be corrected.
