# E — Alphabet model [D]^n, three petals (round 24)

## Summary

The model: W ⊆ [D]^n is **3-SF** if no three distinct words are, on every coordinate, all-equal or pairwise distinct. M(D,n) is the maximum size of such a W. The r=3 conjecture holds iff M(D,n) ≤ C^n uniformly in D.

1. **The alphabet reduction is exactly the conjecture** (E1, PROVED, trivial but it fixes the target). "Every 3-SF W reduces to a 3-SF W' ⊆ [D_0]^n with |W'| ≥ c^n|W|" is equivalent to the conjecture. The allowed loss must be c^n: any loss of the form (D'/D)^{εn} is already too much (E1.2).
2. **Merging is characterised exactly** (E2, PROVED). Merging a class S of symbols at coordinate i keeps W injective and 3-SF iff S is independent in an explicit *link graph* L_i. Uniformly random merging fails (E3, PROVED). This confirms and sharpens the coordinator's |E|=2 remark: pair collisions and triples with two 2+1 coordinates already force K ≳ n. For product families the expected number of new sunflowers is exponentially larger than |W|.
3. **Data at n=3** (E4, CHECKED-NUMERICALLY, CP-SAT). M(3,3)=9, M(4,3)=12, M(5,3)=12, M(6,3) ∈ [12,13], and M(4,4) ≥ 26 > 20 = M(3,4). So alphabet 3 loses a constant factor already at n=3. In the extremal families every link graph L_i is **complete**, so no merge is possible at all. Also 120 of the 220 triples are "near-sunflowers" (exactly one 2+1 coordinate).
4. **Weighted / light-tail tensor bound** (E5, PROVED). For every 3-SF W, all weights q_i:[D]→[0,1] and all t_i ∈ (0,1):
   Σ_{x∈W} Π_i q_i(x_i) ≤ Π_i t_i^{-2/3}(1 + t_i Σ_a q_i(a) + t_i²).
   Corollary: log|W| ≤ n·log β(D_0) + Σ_i E[log⁺(1/(D_0 p_i(X_i)))] for every D_0, where X is uniform on W and p_i is the law of X_i. So only the "light-symbol surprisal" costs full price. A counterexample to the conjecture would have to carry almost all of its entropy in symbols of probability ≪ 1/D_0, for every fixed D_0.
5. **Obstruction for tensor methods** (E7, PROVED). Every valid local tensor is concise. For **every** concise T ∈ K^D⊗K^D⊗K^D and **every** product basis, the support entropy max_P min_j H(P_j) is at least ½·log D. So every support/weight-counting slice-rank bound is ≥ D^{1/2−o(1)} per coordinate: Tao–Sawin, Naslund–Sawin, the round-23 filtration, any basis, any field. Such methods can never be uniform in D.
6. **Identification** (E6, PROVED + CHECKED). The round-23 base B_D is exactly the support value of the Coppersmith–Winograd tensor CW_{D−2}. The char-p collision tensor degenerates to CW_{D−2}, and the two numbers agree to 6 digits for D = 3,…,64.
7. **Not achieved.** No uniform-in-D bound. It remains open whether the *true* asymptotic slice rank of some valid tensor is bounded in D. E7 covers only support-based estimates. What a partial reduction would buy is quantified in E9. One example: reducing to alphabet (log n)^a with a < 3/2 at c^n loss would beat Rao's (C log n)^n.

Weakest points: E5 relies on the round-23 F_3 construction plus a per-coordinate reweighting of the slice-rank count. The reweighting is written out in E5.1 and checked on examples, but it has not been independently reviewed. E7 is a statement about support-counting bounds only, not about slice rank itself.

Code and data: `E_alphabet_work/maxsf.py` (CP-SAT for M(D,n)), `checks.py` (B_D vs CW), `checks2.py` (link graphs, defect distribution, random test of the E5 inequality).

---

## Notation

For distinct x,y,z ∈ [D]^n, coordinate i is **E** (all equal), **A** (all distinct) or **T** (two equal, one different). Def(x,y,z) = {i : T at i}. W is 3-SF iff Def ≠ ∅ for every triple of distinct words of W. A triple with two equal words and one different word automatically has a T coordinate.

A local tensor T:[D]³→K is **valid** if T(a,a,a) ≠ 0 and T vanishes on every T-pattern. It may take any value on A-patterns. For a valid T and a 3-SF W, T^{⊗n}|_{W³} is diagonal with nonzero diagonal, so |W| ≤ SR(T^{⊗n}).

---

## E1. The reduction statement is the conjecture (PROVED)

**E1.1.** The following are equivalent:
- (i) there are C, D_0, c > 0 such that every 3-SF W ⊆ [D]^n (any D, n) contains a subfamily W'' that maps injectively under a coordinatewise map into a 3-SF W' ⊆ [D_0]^n with |W'| ≥ c^n|W|;
- (ii) M(D,n) ≤ C'^n uniformly.

*Proof.* (i)⇒(ii): |W| ≤ c^{-n}|W'| ≤ c^{-n}M(D_0,n) ≤ (B_{D_0}/c)^n by round-23 Theorem A. (ii)⇒(i): take W' to be a single word; then |W'| = 1 ≥ C'^{-n}|W|. ∎

So a reduction is worth something only if its loss is controlled independently of D.

**E1.2 (exchange rate).** Suppose a reduction D → D' costs λ(D,D')^n. Then M(D,n) ≤ (B_{D'}/λ)^n, with B_{D'} ~ (3/2^{2/3})D'^{2/3}.
- If λ ≥ (D'/D)^α with α > 0, then min over D' of D'^{2/3}(D/D')^α grows with D.
- Hence only λ ≥ c works, with D' bounded.
- A "half-way" reduction to D' = D'(n) at c^n loss gives M ≤ (C D'(n)^{2/3})^n. This beats the Rao/BCW bound (C log n)^n iff D'(n) = o((log n)^{3/2}). It then transfers to general n-uniform families, losing only e^n.

---

## E2. When merging symbols keeps 3-SF (PROVED)

Let f = (f_i) with f_i:[D]→[D_0], and let W be 3-SF.

**E2.1.** f(W) is 3-SF and f|_W is injective iff both of the following hold:
- (a) no x ≠ y in W has f_i(x_i) = f_i(y_i) at every coordinate where they differ;
- (b) no triple of distinct x,y,z ∈ W satisfies all of:
  - at every i ∈ Def(x,y,z), f_i maps the odd symbol to the class of the repeated symbol;
  - at every A-coordinate, the three images are all distinct or all equal.

*Proof.* Injectivity is (a). If the images f(x),f(y),f(z) form a sunflower, look at each coordinate:
- an image A-coordinate forces a preimage A-coordinate (f_i is a function);
- an image E-coordinate can come from an E, T or A preimage.

The preimage triple is not a sunflower, so it has a T-coordinate, and there the image is E. This is exactly (b). The converse is immediate. ∎

**Consequences.**
- A preimage A-coordinate either stays A, collapses to E (sunflower status unchanged), or becomes T. Becoming T is harmless: it destroys a pattern.
- The only dangerous event is **T → E**.

**E2.2 (link graph).** Fix i, and let π_i delete coordinate i. Fibres of π_i on W have size ≤ 2: three words in one fibre are A at i and E elsewhere, which is a sunflower.

Define the graph L_i on the symbols [D] with two kinds of edges:
- {a,b} whenever some fibre is {…a…, …b…};
- {odd, pair} whenever x,y,z ∈ W have Def = {i}. Equivalently, π_i(x),π_i(y),π_i(z) form a (possibly degenerate) sunflower pattern off coordinate i.

**Claim.** Merging a class S ⊆ [D] into one symbol at coordinate i alone keeps W injective and 3-SF iff S is independent in L_i. Hence W maps losslessly to alphabet χ(L_i) at coordinate i. Greedy one-coordinate-at-a-time merging is safe if L is recomputed after each step.

*Proof.* Apply E2.1 with f_j = id for j ≠ i. Then (a) says no fibre pair lies inside S. In (b), Def must be ⊆ {i}, and it is nonempty. So Def = {i}, and the bad event is exactly "odd and pair symbol both lie in S". ∎

**Simultaneous merges.** Merging at several coordinates can create sunflowers from triples with |Def| ≥ 2 that no single L_i sees. This is exactly the coordinator's |E| = 2 phenomenon.

---

## E3. Uniformly random merging cannot work (PROVED)

Let each f_i be a uniformly random map [D]→[K], independent over i.

**E3.1 (lower-order bad events).**
- **Pair collisions.** For x,y at Hamming distance 1 (fibre pairs), a collision has probability 1/K.
- **Triples with |Def| = 2**, of the coordinator's shape: y differs from x only at i, and z differs from x only at j ≠ i. Then Def = {i,j}, every other coordinate is E, and the triple becomes a sunflower with probability 1/K².

Each word has at most one fibre-neighbour per coordinate (fibres have size ≤ 2). So the number of such triples is ≤ |W|·n(n−1). If it is of order |W|n², the alteration method needs |W|n/K + |W|n²/K² ≲ |W|, i.e. K ≳ n. (Upper count PROVED; the order |W|n² is attained, for example, when the fibre structure is dense.)

**E3.2 (products).** Let G ⊆ [D]^m be 3-SF and W = G^k. Let w(g,g',g'') be the probability that the random merge maps a block triple to an E-or-A pattern on every coordinate of the block (w = 1 for identical triples). Let Z_G > 0 be the sum of w over the non-identical ordered block triples. By independence across blocks, the expected number of ordered triples of W whose images are coordinatewise sunflower-patterned, other than the |W| identical ones, is exactly

  (|G| + Z_G)^k − |G|^k = |W|·[(1 + Z_G/|G|)^k − 1].

Each such triple is either a pair collision (two words equal, the third merged onto them) or a new sunflower. So the expected number of bad events is exponentially larger than |W|. "Random merge + delete one word per bad event" therefore fails even for the most structured families. Products do reduce blockwise (merge G, then take the power), but only through structured, non-uniform merges.

**E3.3 (data).** In the n=3 extremal families of E4, near-sunflowers (|Def| = 1) make up 120 of 220 triples (D=4) and 136 of 220 (D=5). Every link graph L_i is complete: K_4, and K_4 or 4-chromatic on 5 symbols. So even single-coordinate merging is impossible without deleting words.

---

## E4. Small exact values (CHECKED-NUMERICALLY, CP-SAT, OPTIMAL unless stated)

| n | D=3 | D=4 | D=5 | D=6 |
|---|---|---|---|---|
| 3 | 9 (cap set) | 12 | 12 | 12 ≤ M ≤ 13 (1200 s, not closed) |
| 4 | 20 (cap set, known) | ≥ 26, ≤ 55 (900 s, not closed; witness in `E_alphabet_work/d4n4.out`, 3-SF re-verified) | – | – |

- M(D,2) = 4 for D ≥ 2. The proof is König: in the bipartite graph of words, max degree ≤ 2 and matching number ≤ 2.
- So the alphabet stabilises at D = 2 for n = 2, but D*(3) ≥ 4. Four symbols per coordinate are needed to reach 12 > 9. Losslessly, "every family merges to alphabet 3" is false at n = 3. With c^n loss it is not contradicted. At n=4, 26/20 = 1.3, so the per-coordinate loss ratio (26/20)^{1/4} ≈ 1.07 for going from D=4 to D=3 is still small.
- Witness for D = 4: {000,012,111,113,122,132,200,212,301,303,320,330}.

---

## E5. Weighted (light-tail) tensor bound (PROVED)

**E5.1 (mixed alphabets, per-coordinate t_i).** Let D_1,…,D_n be multiples of 3 with D_i ≥ 3, and let W ⊆ Π[D_i] be 3-SF. Then for all t_i ∈ (0,1),

  |W| ≤ Π_i t_i^{-2/3}(1 + (D_i−2)t_i + t_i²).

*Proof.*
1. **Local tensors.** Work over F_3. On coordinate i use the round-23 §3 tensor T_i = Δ_ab u_c + Δ_ac u_b + Δ_bc u_a − uuu (3 | D_i). It is valid and has a basis of weights 0 (×1), 1 (×D_i−2), 2 (×1) with every term of total weight ≤ 2.
2. **Reweighting.** Fix s = e^{-1} and α_i = −ln t_i > 0. Give coordinate i's basis vectors weight α_i·(local weight). Every monomial of ⊗T_i then has three factor-weights summing to ≤ 2Σα_i, so some factor has weight ≤ (2/3)Σα_i.
3. **Counting slices.** Slice along that factor. The number of basis monomials in one factor with weighted weight ≤ K is at most s^{-K}·Π_i g_i(s^{α_i}), where g_i(t) = 1+(D_i−2)t+t². Since s^{α_i} = t_i and s^{-(2/3)Σα_i} = Π t_i^{-2/3}, this gives |W| ≤ 3·Π t_i^{-2/3} g_i(t_i). Tao's diagonal lemma applies verbatim (round-23 §2).
4. **Removing the 3.** W^m ⊆ Π[D_i]^m is 3-SF (round-23 §2), so |W|^m ≤ 3·(RHS)^m. Let m → ∞. ∎

**E5.2 (weighted inequality).** Let W ⊆ [D]^n be 3-SF (any D). For all q_i:[D]→[0,1] and t_i ∈ (0,1),

  Σ_{x∈W} Π_i q_i(x_i) ≤ Π_i t_i^{-2/3}(1 + t_i Q_i + t_i²),  Q_i = Σ_a q_i(a).

*Proof.*
1. **Random restriction.** Choose independent random sets S_i ⊆ [D], putting a ∈ S_i independently with probability q_i(a). W_S = W ∩ ΠS_i is 3-SF.
2. **Embedding.** Relabel S_i inside an alphabet of size D'_i = 3⌈|S_i|/3⌉. For |S_i| ≥ 1 this gives D'_i ≥ 3 and D'_i − 2 ≤ |S_i|: check |S| = 3k+r with r ∈ {1,2}, where D'−2 = 3k+1 ≤ |S|. If some S_i = ∅ then W_S = ∅.
3. **Deterministic bound.** By E5.1, |W_S| ≤ Π t_i^{-2/3}(1 + |S_i|t_i + t_i²).
4. **Expectation.** The left side has expectation Σ_x Π q_i(x_i). The right side is a product of independent affine functions of the |S_i|, so its expectation is Π t_i^{-2/3}(1 + t_iQ_i + t_i²). ∎

**E5.3 (entropy form).** Let X be uniform on W and p_i the law of X_i. By Jensen, Σ_x Π q_i(x_i) ≥ |W|·exp Σ_i E log q_i(X_i). Hence

  log|W| ≤ Σ_i Ψ(p_i),  Ψ(p) = inf_{t∈(0,1), q∈(0,1]^D} [ log(1 + tΣq_a + t²) − (2/3)log t − Σ_a p_a log q_a ].

At the optimum, q_a = min(1, λp_a) with λ = (1+tQ+t²)/t. That is a heavy/light threshold.

- Taking q_a = min(1, D_0 p_a) gives Q ≤ D_0 and

  **log|W| ≤ n·log β(D_0) + Σ_i L_i(D_0)**, where β(D_0) = min_t (1+D_0t+t²)/t^{2/3} ~ 1.89·D_0^{2/3} and L_i(D_0) = E log⁺(1/(D_0 p_i(X_i))).

- For p uniform on m symbols the optimum is q ≡ 1, and Ψ = log β(m) ≈ (2/3)log m + 0.64, well below H = log m.
- **Limitation (PROVED by example).** Ψ(p) ≤ (2/3)H(p) + c is false. Take mass 1−ε on one symbol and ε spread over M symbols. Then Ψ ≈ log 3 + ε log(M/3ε), which exceeds (2/3)H by ≈ (1/3)ε log M → ∞. Rare symbols are charged at full rate. So E5 gives no "total correlation ≥ ½ entropy" corollary.
- **Meaning.** If |W| ≥ C^n, then for every D_0 the average light-tail surprisal is ≥ log(C/β(D_0)). A large counterexample would need spread-like coordinates, whose entropy comes from symbols of probability < 1/D_0. That is exactly the regime where the spread lemma works and the tensor method fails. This is the precise point where a mixed argument has to enter.
- **CHECKED-NUMERICALLY.** 20,000 random (q,t) on each of the three extremal families gave a maximum LHS/RHS of 0.093.

---

## E6. B_D is the support value of CW_{D−2} (PROVED + CHECKED)

In char p | D (p odd), the round-23 graded basis gives the collision tensor as a weight-2 part plus −uuu (weight 0). The ε-torus degeneration keeps the weight-2 part:

  2(uvu + vuu + uuv) + Σ_{ij} G^{-1}_{ij}(w_iw_ju + w_iuw_j + uw_iw_j).

Diagonalise the form G (possible in char ≠ 2) and rescale. The result is exactly CW_{q}, q = D−2: support (0,i,i),(i,0,i),(i,i,0),(0,0,q+1),(0,q+1,0),(q+1,0,0). This support is free.

- Its support value max_P min_j 2^{H(P_j)}, computed with symmetric P, equals min_t (1+qt+t²)/t^{2/3} = B_D. CHECKED to 6 digits for D = 3,4,5,8,16,64.
- The upper inequality is Tao's count; the lower is the explicit symmetric P.
- **Consequence.** The round-23 improvement over Naslund–Sawin is precisely CW_{D−2} versus the char-0 W-type tensor (value ~ (3/2^{2/3})(D−1)^{2/3}).
- Over C, for free tensors, asymptotic slice rank = support value (Christandl–Vrana–Zuiddam, cited, not re-proved here). So CW_{D−2}'s own asymptotic slice rank is B_D. The collision tensor has asymptotic slice rank ≥ that of its degeneration, but only the upper bound B_D is proved in char p.

---

## E7. Obstruction: support-based slice-rank bounds are ≥ D^{1/2} (PROVED)

**Lemma.** Every valid T is concise.

*Proof.* The first flattening has rows M_a = T(a,·,·). Row M_a has a nonzero entry at (a,a), while M_{a'}(a,a) = T(a',a,a) = 0 for a' ≠ a (a T-pattern). So the rows are independent. The same holds in the other two directions. ∎

**Theorem.** Let T ∈ K^D⊗K^D⊗K^D be concise, fix any bases, and let Φ be the support. Then for every θ in the simplex,

  max_{P∈P(Φ)} Σ_j θ_j H(P_j) ≥ (1 − θ_mid)·log D ≥ ½ log D.

Hence max_P min_j H(P_j) ≥ ½ log D, by minimax: the objective is concave in P and linear in θ.

*Proof.*
1. The first flattening has rank D, so some D×D minor has a nonzero term in its expansion. This gives an injection φ_1: X → Y×Z with (x,φ_1(x)) ∈ Φ for all x.
2. Let U_1 be uniform on {(x,φ_1(x))}. Then H_1(U_1) = log D, and H_2 + H_3 ≥ H(Y,Z) = log D.
3. So Σθ_jH_j(U_1) ≥ (θ_1 + min(θ_2,θ_3))·log D. Similarly for U_2 and U_3.
4. Take the best k: θ_max + θ_min = 1 − θ_mid ≥ ½. ∎

**Corollary.** Tao–Sawin's bound SR(T^{⊗n}) ≤ exp(n·max_P min_j H(P_j) + o(n)) is ≥ D^{n/2−o(n)} for every valid T in every product basis. So is every weight/filtration count, since each of these upper-bounds the support value. Hence no support-counting slice-rank argument (Naslund–Sawin, round 23, any field, any basis) gives a D-uniform alphabet bound.

**What this does not cover.**
- The true asymptotic slice rank. Over C this is min_θ F^θ (CVZ), and it can be smaller than the support value for non-free tensors.
- Bounds using a non-product basis of T^{⊗n}.
- Non-slice-rank methods, such as the Hoffman bound of LIT_digest §B1.4.

The exponent gap ½ (proved) versus 2/3 (best known valid T) is open.

**CONJECTURE E7'.** For every valid T, max_P min_j H(P_j) ≥ (2/3)log D − O(1) in every basis.

---

## E8. Tricolored version (PROVED definitions, OPEN growth)

Let TM(D,n) be the largest N of triples (x_j,y_j,z_j) such that each is sunflower-patterned coordinatewise and (x_j,y_k,z_l) is not, unless j = k = l.

- For every valid T that is nonzero on all A-patterns (for example the collision tensor), SR(T^{⊗n}) ≥ TM(D,n) ≥ M(D,n). This holds in any characteristic, by Tao's lemma.
- TM is supermultiplicative, and τ(D) = lim TM^{1/n} ≤ B_D.
- **Open.** If τ(D) → ∞, full-support tensors are obstructed for the true slice rank, not just support counts. For D = 3, τ(3) = B_3 (Kleinberg–Sawin–Speyer).

---

## E9. Mixed approach: what reduction would suffice (Task 3)

- **Exact target.** A structured map (merges plus deletions) with loss c^n to bounded D_0 is equivalent to the conjecture (E1).
- **Merging tool.** Merge along independent sets of the link graphs L_i (E2.2). Random uniform merging fails (E3).
- **Split by E5.** The tensor bound costs n·log β(D_0) plus the light-tail surprisal Σ_i L_i(D_0). A proof of the conjecture along this route would need a **light-tail lemma**: every 3-SF W has a subfamily W' with |W'| ≥ c^n|W| and Σ_i L_i(D_0; W') ≤ Kn.
  - This is a "spread ⇒ contradiction without log n" statement restricted to rare symbols.
  - The coupon-collector obstruction to the random-colouring endpoint shows it cannot come from random colouring alone.
- **Cheaper, but new, target.** Reduce D to D'(n) = (log n)^{a}, a < 3/2, at c^n loss. This would improve (C log n)^n to (C(log n)^{2a/3})^n (E1.2).
- **Hoffman route (LIT_digest §B1.4).** Such a bound tensorizes and is not a support count, so E7 does not apply. It needs a density h(D) = O(1/D); since M(D,1) = 2, the base density 2/D does not rule this out. Not computed this round (next step).

---

## Next steps

1. Compute the tensorizing 3-ary Hoffman / SDP ratio h(D) for the base relation on [D] for D ≤ 8 (small SDP).
2. Prove or refute E7' (2/3 exponent for valid tensors). Try θ = (½,½,0) and use the private-diagonal structure.
3. Compute TM(D,2) and TM(D,3) for small D, to probe τ(D).
4. Look for a light-tail lemma on examples: in extremal n=3,4 families, measure L_i(D_0).

---
