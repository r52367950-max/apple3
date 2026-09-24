# C_spectral — spectral / LP / entropy methods for the 3-petal case (round 24)

## Summary (read this first)

The r = 3 conjecture is **not** proved or refuted here. The results below are rigorous, and each is labelled.

1. **The pair-level LP is dead (PROVED, plus numerics).** Take the aggregated per-core Mantel constraints and the hereditary spread constraints at every level
   (the minimal-counterexample information). Add the Delsarte LP of J(N,n) for any N. Then max |F|/C^n = K*(n,C) = Θ(n/C).
   The upper bound is K* ≤ 2n/C (the Erdős–Rado step). A lower bound ≈ n/C comes from an explicit fake point with Poisson overlap law.
   The LP optimum is K* ≈ 1.48·n/C ≈ n/(C log 2). So pair-level relaxations reproduce exactly the factorial Erdős–Rado recursion.
   This agrees with the coordinator's check.
   The Delsarte constraints are **asymptotically vacuous**: they hold for every pair distribution with all m_j > 0 once N is large (≈ n³ for the Poisson fake).
2. **Kneser/Hoffman (PROVED, plus numerics).** On the eigenspace V_i of J(N,n), the Kneser eigenvalue decays like (n/N)^i. The spread bound on the projection norm grows by exactly the inverse factor.
   After normalisation, |λ_i|/θ_ii → 1 as N → ∞. So a Hoffman bound driven by spread only gives P(A∩B=∅) ≥ 1 - Σ_{j odd} C(n,j)p^j(1+o(1)). That is nontrivial only for p ≲ 1/n.
   Worse, **no bound using only pair statistics and spread can beat the union bound 1 - np**. The witness is a Delsarte-feasible "linear-space" fake with P(|A∩B|=1) = 1 - p^n.
3. **Why Li's Hoffman argument works and ours does not (PROVED).** This uses the literature agent's reconstruction of Li's Thm 1.9 (LIT_digest §B1).
   In Li's argument the p-spread decay cancels the (1/p)^{|T|} eigenvalue growth. The *test function* 1_A is dense (norm ≤ 1), so the negative part is at most (1-p)·α.
   In the sunflower problem the test vector is the spread measure itself. Its level-j mass is Σ_{|S|=j} ν_S² ≤ C(n,j)p^j, which is exponentially large in total.
   Density-type Hoffman bounds therefore need a dense arena. That supports §B1.4 (the alphabet model [D]^n) as the only natural place for a Li-type argument.
4. **Entropic Mantel inequality (PROVED; tight; new as far as I know, though its ingredients are folklore).** Take any law μ on a 3-SF family, A,B iid, Z = A∩B, and p_Y = μ(A ⊇ Y). Then
   **E log(1/p_Z) + log2 · P(A≠B) ≤ H(Z | A).**
   For the uniform law this reads log|F| ≤ E log|F_{A∩B}| + H(A∩B|A) - log2·(1-1/|F|).
   Equality holds for two disjoint triangles, and numerics hit equality or slack on 200 random laws.
   It is strictly stronger than the aggregated moment constraints: it kills the round-4 factorial tree family, which passed every aggregated PSD test.
   **But** iterating it along the chain of links gives only a factorial bound again. The loss is exactly the entropy of the *order* in which the intersection chain fills a member.
   It cannot be tensorised either: the recursive triangle family has I(A;B|A∩B) = Θ(n^{0.415}), not Ω(n).
5. **Weakest point.** The triple-level (Terwilliger/Schrijver) SDP was only *formulated* (§A.4), not solved. The claim that triple-level relaxations also admit K ≫ 1 is a CONJECTURE.
   It is supported by explicit analysis of the candidate fakes, but not by a computed optimum.

Code is in `r24/code/`: `C_pair_lp.py` (+`.out`), `C_delsarte.py` (+`.out`), `C_entropic_mantel.py` (+`.out`).

---

## A. Task 1 — LP/SDP relaxations

Notation: F is n-uniform and 3-SF, with |F| = M. μ is uniform on F. A,B,C are iid. P_l = P(|A∩B| = l). p_Y = |F_Y|/M.
m_j = E C(|A∩B|, j) = Σ_{|Y|=j} p_Y². For a minimal counterexample, |F_Y| ≤ C^{n-|Y|} for Y ≠ ∅, i.e. **p_Y ≤ C^{n-|Y|}/M** (hereditary spread).
(The j = 0 instance of this would be the conclusion |F| ≤ C^n itself, so it is excluded.)

### A.1 Pair LP (PROVED)
The valid constraints are:
* (T_j) P_j ≤ Σ_{l>j} C(l,j) P_l for 0 ≤ j < n. This is weighted Mantel on each exact-core graph G_Y (triangle-free, because a triangle is a sunflower), q_Y ≤ p_Y²/2, summed over |Y| = j.
* (S_j) m_j ≤ C(n,j) C^{n-j}/M for 1 ≤ j ≤ n.
* P_n = 1/M, P ≥ 0, ΣP = 1, and (optionally) Delsarte for J(N,n).

**Upper bound.** S_1 gives E|A∩B| ≤ nC^{n-1}/M. T_0 gives P_0 ≤ E|A∩B|. Also 1 - P_0 ≤ E|A∩B|. Hence 1 ≤ 2nC^{n-1}/M, so **M ≤ 2n C^{n-1}**. ∎

**Fake point (PROVED; exact rational check in `C_pair_lp.py`).** Take P_l = θ e^{-1}/l! for l < n and P_n = 1/M, with θ chosen for normalisation.
* For j ≤ n-2, T_j follows from the single term (j+1)P_{j+1} = P_j.
* T_{n-1} needs P_{n-1} ≤ n/M.
* S_j holds when λ^j/j! ≤ C(n,j)(C^{-j} - C^{-n})/K with λ = 1.
Thus every K ≤ min_{1≤j<n} (n)_j(1 - C^{j-n})/C^j is feasible, subject also to K ≤ e·n!/C^n. For n ≫ C this minimum is n/C·(1 - C^{1-n}).
The script confirms feasibility with K = 0.9n/C for (C,n) ∈ {2,5,10} × {30,60}.

**LP optimum (CHECKED-NUMERICALLY).** K*(n,2) = 1.5, 2.1, 3.6, 7.3, 14.7, 29.7 for n = 2, 3, 5, 10, 20, 40. For C = 3 and n = 20, K* = 9.8.
This is ≈ n/(C log2), matching a Poisson(log 2) optimiser (the unconstrained optimum of round 4 has Poisson(log 2) overlaps).
Consequence: f(n) ≤ max(C^n, 2nC^{n-1}) is all that can come out. Iterating gives ∏ 2m, the factorial bound.

### A.2 Delsarte is asymptotically vacuous (PROVED; formula CHECKED-NUMERICALLY)
m_j = Σ_{i≤j} θ_ij y_i with y_i = ‖proj_{V_i} μ‖² and **θ_ij = C(n-i,j-i)·C(N-j-i,n-j)**. This was checked against explicit eigenvalues for (N,n) = (7,3), (8,4), (9,3).
Delsarte's LP is exactly y_i ≥ 0. We have θ_ij/θ_ii = O_n(N^{-(j-i)}) and θ_ii y_i ≤ m_i. Induction then gives θ_jj y_j = m_j(1 - O_n(1/N)).
So every pair distribution with all m_j > 0 is Delsarte-feasible for N ≥ N_0(P). The ground set is free, so Delsarte adds nothing asymptotically.
Numerics: the Poisson fake has min_i θ_ii y_i/m_i = 0.81 at (n,N) = (8,512) and 0.85 at (15,3375). The linear-space fake needs N ≳ M, which is Fisher's inequality.

### A.3 Kneser / Hoffman eigenvalue decay (PROVED)
P(A∩B=∅) = Σ_i λ_i y_i with λ_i = (-1)^i C(N-n-i, n-i). Spread gives y_i ≤ m_i/θ_ii ≤ C(n,i)p^i/θ_ii.
The ratio (|λ_i|/θ_ii)/(λ_0/θ_00) → 1 as N → ∞: it is 1.02, 1.04, 1.05 at n = 10, N = 1000 (`C_delsarte.py`).
So the (n/N)^i decay is exactly cancelled. The Hoffman lower bound becomes 1 - Σ_{i odd} C(n,i)p^i(1+o(1)).
Once N is large, the decay does **not** help. In the N = ∞ limit the spectral decomposition *is* inclusion–exclusion, P(A∩B=∅) = Σ_S (-1)^{|S|} ν_S².

### A.4 Triple level (formulated; CONJECTURE about its value)
The variables are π(a,x,y,z): a = |A∩B∩C|, x = |A∩B∖C|, y = |A∩C∖B|, z = |B∩C∖A|. π is symmetric under S_3 acting on (x,y,z). The valid constraints are:
* π(a,0,0,0) = 0 for a < n (3-SF).
* π(a,n-a,0,0) = P_a/M (diagonal; this is how M enters).
* The pair marginals.
* Q_ij = P(|A∩B|=i, |A∩C|=j) ⪰ 0.
* Schrijver's A-side Terwilliger blocks. Symmetrise G^A(S,T) = P(A∩B=S)P(A∩C=T) over S_n and block-diagonalise with β^t_{i,j,k}. This is N-free.
* Triple spread E C(|A∩B∩C|,j) ≤ C(n,j)(C^{n-j}/M)².
* The pair constraints of A.1.

The A-side PSD **does kill** one natural fake: "all pairs meet in one point, no concurrent triples". It forces P(a ≥ 1 | |A∩B| = |A∩C| = 1) ≥ 1/n.
The repaired fake (P_2 ≈ c/n) still has K ≈ n/C. I expect (CONJECTURE) K*_triple = Θ(n/C) as well. I did not solve this SDP; that is the first next step.

### A.5 A triple-level inequality that does see more (PROVED)
For an **intersecting** family, 1[x∈B∖C] ≤ Σ_{y∈C} 1[x,y∈B]. Averaging with weight ν_x and applying Cauchy–Schwarz in the ground-pair space gives m_1(1-p) ≤ E|A∩B∖C| ≤ √(2m_2)·m_1.
Hence **m_2 ≥ (1-p)²/2**, where p = max ν_x. This kills the linear-space fake (m_2 = C(n,2)/M forces M ≤ n²/(1-p)²).
It is a degree-2 moment condition over labelled ground pairs, i.e. *not* an S_N-invariant pattern-only constraint. This is the kind of information a working method must use.

## B. Task 2 — Hoffman bounds for p-spread measures

* **Identities (PROVED).** ν⊗ν(A∩B=∅) = Σ_S (-1)^{|S|} ν_S².
  ν^{⊗3}(pairwise disjoint) = Σ_{S_1,S_2,S_3} (-1)^{|S_1|+|S_2|+|S_3|} ν_{S_1∪S_2} ν_{S_1∪S_3} ν_{S_2∪S_3}.
* **Pair data give only the union bound (PROVED).** Let p > 1/n + p^n. Put P_1 = 1 - p^n, P_n = p^n. This meets every spread-moment bound m_j ≤ C(n,j)p^j, P_n ≤ p^n. By A.2 it is Delsarte-feasible for large N. Its P_0 = 0.
  So no method using only the pair overlap law and spread can certify disjointness beyond P ≥ 1 - np. The true threshold is p ≍ loglog n/log n (LSZ) to 1/log n (ALWZ).
* **Test families.**
  * The transversal family (block size q = 1/p) has m_j = C(n,j)p^j, saturating spread at *every* level. Its alternating sum is (1-p)^n > 0.
  * LSZ has alternating sum 0 while its m_j stay below the spread profile.
  * Magnitude-only bounds on m_j cannot separate the two. The certificate must use **signs/cancellation**: the ratio of the true value to Σ|terms| is ((1-p)/(1+p))^n.
  * A method must also use **local (per-core/link) data**, as in A.5. LSZ is constant-spread on aggregated statistics, and its intersecting property comes from full-block cores.
* **Li's Thm 1.9 (reconstruction in LIT_digest §B1).** λ_T = ν(T⊆S)(-(1-p)/p)^{|T|}, so |λ_T| ≤ (1-p)^{|T|}.
  The bound α ≤ (1-p)/(2-p) needs only λ_min and a dense indicator 1_A.
  **Transfer obstruction (PROVED).** Replace 1_A by the sparse spread measure ν on n-sets. The Hoffman negative part is Σ_{|T| odd} |λ_T| ‖ĝ_T‖². For g = ν that is Σ_{odd j} C(n,j)p^j·(…), which is exponential.
  Positivity certificates for exponentially small probabilities cannot come from λ_min alone. This is why §B1.4 (dense alphabet model, 3-ary tensorising Hoffman bound) is the right arena. I did not compute h(D); it is the recommended next computation.
* **Elementary positive certificate (PROVED; standard).** Take Y ~ μ_q, 𝒜 with μ_q(𝒜) = α, and ν p-spread n-uniform. The expander-mixing argument gives
  P(Y∈𝒜, X∩Y=∅) ≥ (1-q)^n[α - √(α(1-α)((1+pq/(1-q))^n - 1))].
  By Paley–Zygmund, μ_δ(Y contains a member) ≥ (1 + p(1-δ)/δ)^{-n}.
  These certify exponentially small positive probabilities, but only in the regime q ≲ 1/(np).

## C. Task 3 — entropy

**Theorem (entropic Mantel, PROVED).** Let μ be any law on a 3-SF family, A,B iid, and Z = A∩B.
* (i) Given Z = Y with |Y| < n, (A,B) is a symmetric law on ordered edges of the triangle-free graph G_Y, with marginal w_Y.
  By data processing on the edge indicator, I(A;B|Z=Y) = D(π_Y‖w_Y⊗w_Y) ≥ log 1/(w_Y⊗w_Y)(E) ≥ log 2 (Motzkin–Straus).
  So I(A;B|Z) ≥ log2·P(A≠B).
* (ii) Since A ⊥ B and Z = g(A,B), I(A;B|Z) = 2H(Z|A) - H(Z).
* (iii) q_Y ≤ p_Y²/2 for |Y| < n, and q_Y = p_Y² for |Y| = n. Hence H(Z) ≥ 2E log(1/p_Z) + log2·P(A≠B).
* Combining (i)–(iii): **E log(1/p_Z) + log2·P(A≠B) ≤ H(Z|A).**

For r petals, replace log 2 by log((r-1)/(r-2)).
Tight for two disjoint triangles: 1.242453 = 1.242453. There is no violation on 200 random laws on random 3-SF families with n = 2,3 (`C_entropic_mantel.py`).
It violates the round-4 tree (branching q_j = j+1): there I(A;B|Z) ≈ 0.53 < 0.69.

**Limits (PROVED).**
1. *Chain iteration is factorial.* Applying the inequality in the links along Y_0 = ∅ ⊂ Y_1 = A_1∩B_1 ⊂ … telescopes log M = E Σ_k log(1/p^{(k)}_{Z_k}) ≤ E Σ_k (H(Z_k|A_k) - log2)/(1 - P_0^{(k)}).
   With singleton increments, Σ_k H(Z_k|A_k) ≈ log n!, while the savings are only n log 2.
   Beating factorial ⇔ showing the fill-order of a member is predictable. This is the same missing ingredient as everywhere else.
2. *No tensorisation.* For the recursive triangle family, I_t = (4/3)I_{t-1} + (2/3)log2. So I(A;B|A∩B) ~ 1.38·n^{0.415} = o(n), while H(A) = (n-1)log3.
3. In a minimal counterexample it gives only H(A∩B|A) > E|A∩B|·log C + log2·(1-1/M). This is consistent with spread (H(Z|A) ≈ E|Z|·log(eC)), so there is no contradiction.

**Classes.**
* Laws with product structure across a partition reduce blockwise, because a product family is 3-SF iff each factor is. This is trivial.
* The Σφ inequality holds whenever every trace residual of the class satisfies a C^rank counting bound (proof of the equivalence, ../sf/work/fresh_entropy.md §5.1). This gives K = 2 for 3-SF complete matroid-basis families, since minors stay 3-SF. That is a corollary of the archive, not new.
* No new nontrivial class was proved.

## Next steps
1. Solve the A.4 SDP for n ≤ 6 with the actual values f(1)=2, f(2)=6, f(3)=20 (and 54 ≤ f(4) ≤ 83). Test whether it certifies f(3) ≤ 20 or f(4) ≤ 83. The pair LP gives 2n·f(n-1).
2. Compute the §B1.4 3-ary HD-Hoffman ratio h(D) on [D]³, with and without Li-style averaging over a spread centre measure.
3. Look for "ground-labelled" moment constraints like A.5, applied per core, that could force predictable fill order (the C.1 obstruction).
