# Round 24 shared context (2026-09-24)

## Goal
Erdős–Rado sunflower conjecture: for fixed r>=3 there is C_r with f_r(n) <= C_r^n, where f_r(n) is the max size of a family of
distinct n-element sets (any ground set) with no r-sunflower (r distinct sets with all pairwise intersections equal; empty core allowed).
Priority target if the general case is out of reach: r = 3 ("three petals").

Best known general upper bound: (C r log n)^n (Rao 2020; Bell–Chueluecha–Warnke 2021), after ALWZ 2019 ((C r^3 log n loglog n)^n).
Best known lower bound for r=3: roughly 10^{n/2} (Abbott–Hanson–Sauer), small cases f_3(2)=6, f_3(3)=20, 54<=f_3(4)<=83 (Axante et al. 2609.06175; their '39<=f(3,4)<=49' is 3-uniform 4-petal). Max intersecting 3-SF: g(1..4)=1,3,10,27; L=sup g(a)^{1/(a-1)} >= sqrt10 (REVIEW_round1.md).

## Standard facts (proved, safe to use)
* Core extraction: for R>1 choose K maximizing R^{|K|}|F_K| where F_K={A\K : K ⊆ A ∈ F}. Then F_K is R-spread:
  |(F_K)_T| <= R^{-|T|}|F_K| for all T. If |F|>R^n then |K|<n. F_K is again r-sunflower-free.
* Minimal-counterexample form: if f_r(m) <= C^m for all m<n and |F|>C^n then F itself is C-spread.
* Spread lemma (ALWZ/Rao/Tao): an R-spread n-uniform family with R >= C r log n has r pairwise disjoint members (random r-colouring).
  The log n is necessary for the random-colouring endpoint (coupon collector: transversals of n blocks of size q; P(W contains a member) = [1-(1-p)^q]^n).
* **Constant spread does NOT force two disjoint members.** Lovett–Solomon–Zhang (CCC 2019) intersecting family: t>=2, m=t^t,
  blocks B_1..B_m of size t, a member takes one whole distinguished block plus one point of every other block. n=m+t-1, |F|=t^n,
  intersecting, exact spread R = mt/(m+t-1) ~ t ~ log n / loglog n. It HAS sunflowers with nonempty cores (core B_i).
  => Any proof must use sunflower-freeness at nonempty cores, not just "spread + no r disjoint members".
* Anchored trace cells (r=3): fix A in F (3-sunflower-free). For S ⊊ A put G_S = {B\A : B in F, B∩A = S}. Each G_S is an
  intersecting, 3-sunflower-free, (n-|S|)-uniform family. More generally for an s-sunflower (s<r) with union U and core K,
  G = {B\K : B∩U = K} has matching number <= r-s-1.
* Product (tensor) construction: if G is m-uniform r-SF then G^k (one member of G per block) is km-uniform r-SF, so f_r is
  supermultiplicative and f_r(n)^{1/n} converges to sup. Spread(G^k) = spread(G).
* Bounded VC dimension d: |F| <= (50 d r)^n (Ge–Wang–Xu–Zhao, arXiv 2609.18995); previous round improved to [5d(r-1)]^n.
  But sunflower-free families generally have VC-dimension Theta(n) (e.g. products of two-disjoint-triangles), so this does not apply directly.
* Shifted (left-compressed) families: if A in F has max element >= n+r-1, shifting gives r sets {1..n-1,x}, an r-sunflower.
  So shifted r-SF families live on [n+r-2] and are polynomially small. (Mishra 2606.02667 "proves the conjecture for shifted families";
  this seems trivial by the above.) Shifting does NOT preserve sunflower-freeness (C_5 example in archive).

## Known dead ends in the archive (do not reuse as lemmas)
* H(A) <= c_r n h(E|A∩B|/n) — false (recursive triangle family).
* Fixed-order intersection energy bounds; repeated-union entropy budgets; single-union entropy alone => conjecture; unconditional
  covariance/logdet query payments; linear completion of free subcodes; OR-label union-closure completions; "robust subcode extraction is
  easy"; one-step shifting preserves freeness; Fukuyama arXiv 2212.13609v3 Lemma 2.1 (false; do not re-audit).
* Random-colouring / random-region success with constant density: provably false endpoint (coupon collector).

## Positive special-class results in the archive
* Alphabet model [D]^n (each word = {(i,x_i)}; 3 words form a sunflower iff each coordinate is all-equal or all-distinct):
  |F| <= B_D^n, B_D = min_t (1+(D-2)t+t^2)/t^{2/3} ~ D^{2/3} (not uniform in D). Every n-uniform family reduces to an n-partite one
  (random colouring loses factor n!/n^n ~ e^{-n}), so r=3 conjecture <=> uniform-in-D bound in the alphabet model.
* Complete matroid bases families: <= (r-1)^n; complete TU representations < r^n; complete group coset codes; full binary linear codes.
* Equivalence (round 2026-09-24): conjecture <=> exists K_r with H(A) <= K_r Σ_x φ(p_x) for EVERY law of A on an r-SF family,
  φ(p) = -(1-p)log(1-p).

## New literature seen in search snippets (arXiv itself is NOT reachable from this container; only WebSearch works)
* Chen Li, "On p-Spread Measures", arXiv 2609.08967: if μ_p(A) > (1-p)/(2-p) then Bad_2(A) (sets not covered by the union of two members
  of A) supports no p-spread measure; resolves fractional Talagrand discrete-convexity problem; Hoffman-type spectral argument;
  comparison theorems between p-spread and product Bernoulli-p measures.
* Fang–Wang, arXiv 2609.18458: Li's method answers Talagrand's Conjecture 7.8 (hence 7.3, 7.11).
* J. Park, arXiv 2609.14681: q_f(F) <= K q(F) max{1, loglog(1/q(F))} (dimension-free comparison of expectation thresholds).
* T. Tran, arXiv 2609.20546: second Kahn–Kalai conjecture for many graphs (layered spreadness).
* arXiv 2606.30593: polynomial improvement of Naslund–Sawin for (non-uniform) sunflower-free families via triangular tensors.
* arXiv 2605.08676 "Moonflowers and efficient code sparsification"; 2604.19183 counting sunflowers with bounded matching number;
  2505.03671 / 2605.12232 sunflowers in vector spaces; Rao survey "The Story of Sunflowers" 2509.14790 (JLMS 2026).

## Files
* Previous round (2026-09-24 restart): ../sf/Sunflower_Restart_2026-09-24.md, ../sf/work/*.md
* Older archive: ../old/round23/** (round 22/23 addenda, proofs) and ../old/sep16/sunflower_research/*.md (rounds 2–21).
  Useful: ../old/sep16/sunflower_research/spread_entropy.md (LSZ computation, anchored trace lemma),
  ../sf/work/archive_map.md (index of what is proved / refuted).

## Rules for every agent
* Rigor first. Label every statement as PROVED (full proof written), CHECKED-NUMERICALLY (finite computation only), CONJECTURE, or REFUTED.
* Never state the conjecture (or r=3) is proved unless every step is written out and self-checked adversarially; if you believe you have a
  proof, say so explicitly and list the step most likely to be wrong.
* Quantifiers: constants must depend only on r (not n, not ground-set size, not alphabet size).
* Write your output to the file named in your task (in this r24/ directory), in English or Chinese, with a short summary at the top.
* Python is available (pip install from PyPI works). arXiv/most websites are blocked; WebSearch works for snippets.
