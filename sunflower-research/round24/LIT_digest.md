# LIT_digest — literature agent, round 24 (2026-09-24)

## Summary (read this first)

* **Access.** arxiv.org, semanticscholar, pith.science, university hosts, michel.talagrand.net, erdosproblems.com and GitHub
  web/API were all blocked, for both curl and WebFetch. **Only WebSearch snippets** (titles plus a model-written summary)
  and **raw.githubusercontent.com** were reachable. So every statement taken from a paper below is **SNIPPET-ONLY** unless it is
  marked CONFIRMED (a primary file was actually read) or PROVED/CHECKED-NUMERICALLY (by me in this round).
* **No verified progress on the full conjecture or on r = 3 turned up for 2024 – Sept 2026.** Erdős #20 is still "open" in the
  community database (CONFIRMED from raw GitHub; its last status update is 2025-08-31). Tao's AI-contributions wiki has no entry for #20 or #857
  (CONFIRMED). Mishra 2606.02667 ("shifted families") is trivial: shifted r-SF families are polynomially bounded (PROVED, §B6).
  Its v1 title was "Erdős Rado Sunflower (Conjecture) Theorem" (snippet).
* **The most interesting new technique is Chen Li's (2609.08967).** It is a Hoffman ratio bound for a *tensor-product covering kernel averaged
  over a spread measure*. p-spreadness gives exactly the decay ν(T⊆S) ≤ p^{|T|} that cancels the (1/p)^{|T|} growth of the covering
  kernel's eigenvalues. **I reconstructed a complete proof of Li's Theorem 1.9** (μ_p(A) ≤ (1-p)/(2-p) when Bad_2(A) carries a p-spread
  measure). Status: PROVED, plus CHECKED-NUMERICALLY for N ≤ 5. The proof needs only a *weaker* hypothesis: the bound on ν(T⊆S) for odd |T| only (§B1).
  Its relevance to sunflowers is **indirect**. Hoffman bounds control *density*, while sunflower-free families have negligible density and the sunflower
  relation is not monotone. The only natural dense arena is the alphabet model [D]^n. There a *high-dimensional (3-ary) Hoffman bound*
  would be needed; see the concrete action item in §B1.4.
* **Fang–Wang (2609.18458)** proved Talagrand's Conj. 7.8 ("every spread measure, after independent thinning, is stochastically dominated
  by a product measure"). The precise form is Thm 1.2: if ν is q-spread and η = tq(1-p)/(p(1-t)) ≤ 1, then T_tν ≤_st μ_p. My check (CHECKED-NUMERICALLY,
  N = 4, all 168 up-sets, worst-case ν by LP) shows it holds at η = 1 and fails at η = 2, so the constant is meaningful.
* **Correction to CONTEXT.md.** Axante et al. (2609.06175) write f(w,k) with w = uniformity and k = petals. "39 ≤ f(3,4) ≤ 49" is about
  **3-uniform, 4-petal** families. The three-petal quantity is **54 ≤ f_3(4) ≤ 83**. They also report **ψ_3(4) = 27** (the maximum *intersecting*
  3-SF 4-uniform family; the upper bound is machine-assisted). The witness is the Abbott–Hanson family, which I CONFIRMED from their Lean file.
* **Smaller items proved this round (§B5).** First, a composition inequality ψ_3(ab) ≥ ψ_3(a)·ψ_3(b)^a and f_3(ab) ≥ f_3(a)·ψ_3(b)^a, which gives
  ψ_3(2^k) ≥ 3^{2^k-1} and f_3(4) ≥ 54. Second, the anchored-cell bound f_3(n) ≤ 1 + Σ_{s<n} C(n,s) ψ_3(n-s). Together: the **r = 3 conjecture is
  equivalent to exponential bounds for intersecting 3-SF families**, and their growth rate is ≥ 3.
* **Max spread of intersecting families** (LSZ's quantity α(w,2)). The best known range is Ω(log w / loglog w) ≤ α(w,2) ≤ O(log w). **No matching bound was found.**

---

## (a) Table of papers

Confidence codes: **S** = snippet-only (unverified); **S+** = several consistent snippets; **C** = primary file read (this or the previous round);
**P** = the stated fact is PROVED here; **N** = CHECKED-NUMERICALLY here.

| id | authors | date | claimed statement (author claims unless marked) | conf. |
|---|---|---|---|---|
| 2609.08967 | Chen Li, *On p-Spread Measures* | 2026-09-08 | **Thm 1.9:** if Bad_2(A) := {X : X ⊄ A_1∪A_2 ∀A_i∈A} carries a p-spread probability measure ν (ν(T⊆X) ≤ p^{\|T\|}), then μ_p(A) ≤ (1-p)/(2-p). **Cor 3.1:** μ_p(A) > 1/2 ⇒ Bad_2(A) carries no p-spread measure (the fractional discrete convexity conjecture, with m = 2). **Thm 3.2:** E_ν Q_2 f ≤ 2 E_{μ_p} f for every f. **Thm 3.3:** there exist jointly distributed (X,R_1,R_2) with X~ν, R_j~μ_p, X ⊆ R_1∪R_2 a.s. Method: "Hoffman-type spectral argument". | S+; Thm 1.9 **P,N**; Thm 3.3 **N** (N ≤ 4) |
| 2609.18458 | Xuan Fang, Tianyu Wang, *A Note on a Result of Chen Li* | 2026-09 (one snippet says Sept 12) | **Thm 1.2 (domination after thinning):** ν q-spread and η := tq(1-p)/(p(1-t)) ≤ 1 ⇒ T_tν := Law(J∩X_t) (J~ν, X_t~μ_t independent) is stochastically dominated by μ_p. This settles Talagrand's Conj. 7.8 ("every spread measure is, up to averaging over subsets, stochastically dominated by a product measure"), and hence Conj. 7.3 and 7.11. The proof uses Li's method. | S+; **N** (N = 4) |
| 2609.14681 | Jinyoung Park | 2026-09-13 | q_f(F) ≤ K q(F) max{1, loglog(1/q(F))} for every nontrivial increasing F, with no dependence on dimension. The proof is a quantitative strengthening of Pham's sharp selector-process theorem (2412.03540). Combined with Li, it gives a dimension-independent bound toward the (integral) discrete convexity conjecture. | S |
| 2609.20546 | Tuan Tran | 2026-09 | The uniform measure on copies of H is C·q_H·log(2e(H))-spread (q_H is the graphic expectation threshold). Hence q_f ≤ C p_E(H) log(2e(H)). The log is removed for trees and for graphs with Δ ≤ exp(average degree), so the "second" Kahn–Kalai conjecture holds for those. Technique: decompose H into a sequence of *conditionally spread* edge sets, choosing subgraphs greedily in O(log e(H)) rounds. | S |
| 2608.11183 | Ascoli, He, J. Park, Talagrand | 2026-08-11 | The discrete convexity conjecture is equivalent to: for some universal k ≥ 2, the k-threshold of every increasing family is ≤ C · its expectation threshold. They also determine the k-threshold of fixed graphs. | S |
| 2605.10908 | (Hua), Song, Tudose (first-author name inconsistent across snippets) | 2026-05-11 (v2 07-10) | Talagrand's *Gaussian* convexity conjecture: a vector dominated in convex order by a standard Gaussian is a sum of 3 Gaussians. This implies a weak version of the discrete analogue. | S |
| 2511.17336 | Fang, Wang | 2025-11-21, **withdrawn** 2025-12-05 | Claimed proof of Talagrand's "creating large sets" conjecture. Withdrawn for "critical flaws". | S |
| 2412.00917 / 2505.21782 / 2510.18441 | Dubroff–Kahn–Park; others | 2024–25 | Restricted versions of "q_f ≤ K q" via the selector-process theorem. | S |
| 2606.02667 | Tapas Kumar Mishra | 2026-06-01 (rev 06-08) | v1 title "Erdős Rado Sunflower (Conjecture) Theorem". The current version proves the conjecture for **shifted** families: f'(k,s) ≤ s^{2k} (k ≤ s-1), f'(k,s) ≤ 2f'(k-1,s) otherwise. | S; **trivial (P, §B6)** |
| 2606.30593 | Omran Ahmadi, Hassan Norouzi | 2026-06-29 | "i-triangular tensor" slice-rank lemma. Non-uniform (Erdős–Szemerédi) 3-SF families in 2^{[n]} have size O(n^{1/6}(3/2^{2/3})^n), improving the polynomial factor n^{1/2}. Exponent unchanged. | S+ |
| 2607.19168 | Ahmadi, Norouzi | 2026-07 | Slice rank of tensors in "P-echelon form" (companion). | S (title) |
| 2605.08676 | Lovett, Meka, Yimeng Wang | 2026-05-09 | **Moonflowers:** S_1..S_k where each S_i has an element absent from all the others. They give near-optimal bounds for w-set families with no k-moonflower. Application: code sparsification with logarithmic (and necessary) dependence on block length. | S |
| 2604.19183 | Junpeng Zhou, Xiying Yuan | 2026-04-21 | Maximum number of copies of the sunflower S^r_{r-1,k} (k edges on a common (r-1)-core) in r-graphs with bounded matching number, with extremal families. The companion 2604.21855 gives stability. | S |
| 2505.03671 | Ihringer, Kupavskii | 2025-05 (rev 09) | Sunflowers of k-spaces over F_q, with petals in general position over the kernel. Lower bounds from lifted MRD codes. | S |
| 2605.12232 | Kamil Otal | 2026-05-12 | Set-like sunflowers of subspaces (the kernel is the pairwise intersection). | S |
| 2609.06175 | Axante, Budala, Chitic, Dumitru, Nacu | 2026-09-05 | 39 ≤ f(3,4) ≤ 49; 54 ≤ f(4,3) ≤ 83; ψ(4,3,2) = 27; f(3,5) ≤ 146; 153 ≤ f(3,6) ≤ 255; 259 ≤ f(3,7) ≤ 474 (upper bounds conditional on Chvátal–Hanson instances). Block-size recurrence that controls matching number; Lean witnesses. f(w,k): **w = uniformity, k = petals**. | **C** (repository README, Lean F43 file, artifact READMEs read via raw GitHub); the paper was read last round |
| 2609.18995 | Ge, J. Wang, Z. Xu, X. Zhao | "2026-07-17" (date inconsistent with the 2609 id) | VC-dim ≤ d, n-uniform, r-SF ⇒ \|F\| ≤ (50dr)^n. | C (last round) |
| 2408.04165 | Balogh, Bernshteyn, Delcourt, Ferber, Pham | Combinatorica 2025 | Small VC-dimension: base C r(log d + log* n); base r-1 when d = 1. | C (last round) |
| 2509.14790 | Anup Rao, *The Story of Sunflowers* | JLMS 2026 | Survey with a short elementary proof of the best robust-sunflower bounds. Open problems listed in snippets: the sunflower conjecture; adaptive data-structure lower bounds. | S (opened last round) |
| 2003.11202 (v4 2025) | Ryan Alweiss, *Set System Blowups* | Combinatorica 2025 | For fixed k, a *typical* k-tuple (S_1..S_k) of a large w-bounded family can be blown up to large subfamilies F_i ∋ S_i with T_i∩T_j = S_i∩S_j for T_i∈F_i, T_j∈F_j. The multicolour sunflower problem is equivalent to the ordinary one up to an exponential factor. | S |
| 1903.00580 | Lovett, Solomon, Zhang (CCC 2019) | 2019 | Defines **α(w,r) := sup κ such that there is a κ-regular (= spread distribution) w-set system without r pairwise disjoint sets.** Also a κ-regular, not (1/2,1/2)-satisfying system with κ = log w - O(1). That example is the coupon-collector transversal family, *not* intersecting; my reading, since snippets conflate it (§B10). | S |
| 2512.20055; 2609.07268 | Quanyu Tang, Shengtong Zhang; (follow-up) | 2025-12; 2026-09 | Harmonic sums of LCM-k-free sets are bounded between (log N)^{log μ_k^S - o(1)} and (log N)^{μ_k^S - 1 + o(1)}, where μ_k^S is the Erdős–Szemerédi capacity. The follow-up acknowledges AI assistance. | S |
| 2509.16355 | Bennett, Priestley | 2025-09-19 | Analysis of the random greedy w-uniform r-sunflower-free process. | S |
| 2504.15264 | Janzer, Jin, Sudakov, Wu | 2025-04 | Ramsey version of restricted-intersection problems; a variant of Füredi's semilattice lemma. | S |
| 2410.06156; 2511.17142 | Kupavskii, Noskov | 2024; 2025-11 | Duke–Erdős forbidden sunflower (fixed core size): spread approximations + Δ-systems + hypercontractivity; exact results for t = 2, odd s, k ≥ 5. | S |
| 2508.20132 | Kupavskii | 2025-08 | Survey of the Δ-system method. | S |
| 2603.13737 | De Silva, Gao | 2026-03 | Non-uniform Park–Pham / spread; applications to inhomogeneous random graphs. | S |
| 2606.24776 | Zixiang Xu | 2026-06-23 | Disproof of the "uniform witness conjecture" (VC-dimension + EKR). Lean formalization by "Lean Constellation". | S |
| 2410.23611 | Huang, Shangguan, Zhang, Zhao | 2024-10 | Focal-free hypergraphs (Alon–Holzman): connection to the Erdős Matching Conjecture; optimal bounds. | S |
| 2505.07706 | Bishnoi, Kielak, Kovács, Nagy, Somlai, Vizer, Zheng | 2025-05 | Generalized trifference T(n,m). | S |
| 2212.13609v3 | Fukuyama | updated 2026-06-22 | Claims (ck^4)^m. Known wrong (Lemma 2.1); **not re-audited**. | — |
| Erdős #20, #857 | erdosproblems DB (teorth/erdosproblems) | status 2025-08-31 | #20 "open", $1000, formalized = yes. #857 (weak sunflower / Erdős–Szemerédi) "open". | **C** |
| formal-conjectures ErdosProblems/20.lean | Google DeepMind | 2025–26 | Statement `erdos_20 : answer(sorry) ↔ ∃ c, ∀ n k, n>0 → f n k < (c k)^n`. Only the Erdős–Rado factorial bound is listed as a solved variant (a Lean proof exists elsewhere). Issue #2284 (opened 2026-02-13, "formalizability 2/5") is snippet-only. | **C** (file), S (issue) |
| AI attempts | LLM-hunter PR #55 (GPT-5.5 Pro / Claude Opus 4.7 / Codex); JSP-000710 (Lean Naslund–Sawin); AlphaProof Nexus (9 Erdős problems) | 2026 | PR #55 is self-described "Partial / Unresolved". The `gpt_pro_5.2/20.tex` file (read) contains only the classical Erdős–Rado bound and f(2,3) = 7 (threshold convention). JSP formalized the known m(n,3) ≤ (3/2^{2/3})^{(1+o(1))n}. No AI result on sunflowers found. | C (tex file) / S |

---

## (b) Techniques and how they might be used for r = 3

### B1. Li's Hoffman bound with a spread-averaged covering kernel (2609.08967)

**B1.1 Reconstruction (PROVED here; it matches the snippet statement of Li's Thm 1.9. I have not seen Li's own text).**
Notation: μ = μ_p on Ω = 2^{[N]}, and L²(μ) with ⟨f,g⟩ = E_μ fg. On one coordinate (state 1 = "in", 0 = "out") define

* J = the averaging kernel J(b,b') = μ(b'), with eigenvalues 1 and 0;
* P = the μ-reversible Markov kernel with **P(0,0) = 0**: P(0,1) = 1, P(1,0) = (1-p)/p, P(1,1) = (2p-1)/p.
  Entries can be negative when p < 1/2; Hoffman's bound does not need nonnegativity. Its eigenvalues are 1 and **-(1-p)/p**, with eigenvector χ(b) = (b-p)/√(p(1-p)).

For S ⊆ [N] put K_S = ⊗_{x∈S} P_x ⊗ ⊗_{x∉S} J_x. Because P(0,0) = 0, **K_S(A_1,A_2) ≠ 0 only if S ⊆ A_1 ∪ A_2.**
For a probability measure ν put K = Σ_S ν(S) K_S. On p-biased characters χ_T:

  K χ_T = λ_T χ_T,  λ_T = ν(T ⊆ S) · (-(1-p)/p)^{|T|},  λ_∅ = 1.

If ν is p-spread then |λ_T| ≤ (1-p)^{|T|}, so λ_min ≥ -(1-p). If supp ν ⊆ Bad_2(A), then every K_S vanishes on A×A, so
⟨1_A, K 1_A⟩ = 0. Write 1_A = α + g with α = μ(A). Then 0 = α² + ⟨g,Kg⟩ ≥ α² - (1-p)(α - α²), so **α ≤ (1-p)/(2-p)**. ∎

**Strengthening noticed here (PROVED).** Only negative eigenvalues matter, and those occur only at odd |T|. So the conclusion holds whenever
ν(T⊆S) ≤ p^{|T|}(1-p)^{1-|T|} for all **odd** |T|, a weaker hypothesis than p-spread.
**CHECKED-NUMERICALLY** (`lit_li_check.py`): the eigenvalue formula and support property hold for N = 4, 5 and random extreme-point p-spread ν.
Brute force over all A ⊆ 2^{[N]} for N = 3, 4 with LP feasibility: the bound always holds but is **not attained at these small N**.
For example, at N = 4, p = 0.3 the maximum is 0.2401 against the bound 0.4118. Sharpness in Li's paper is not verified.

**B1.2 Theorems 3.2 and 3.3 are equivalent by finite LP duality (PROVED, modulo matching Li's definition of Q_2).**
Define Q_2 f(X) := min{f(R_1)+f(R_2) : R_1 ∪ R_2 ⊇ X}. A coupling (X,R_1,R_2) with the prescribed marginals and X ⊆ R_1∪R_2 exists iff
E_ν h ≤ E_μ f + E_μ g whenever h(X) ≤ f(R_1)+g(R_2) on all covering triples. Symmetrizing (f,g) → ((f+g)/2,(f+g)/2) reduces this to
E_ν Q_2 f ≤ 2E_μ f. **N:** coupling feasibility was confirmed by LP for random extreme p-spread ν at N = 3 and 4.
**Warning (PROVED).** One snippet says R_1, R_2 are *independent*. That is false: then R_1∪R_2 ~ μ_{2p-p²}, and ν = uniform on transversals of n blocks of size 1/p
(which is p-spread) would force μ_{2p-p²}(up supp ν) = 1. In fact that probability is (1-(1-p)^{2/p})^n → 0. So the coupling of R_1 and R_2 must be arbitrary.

**B1.3 Why this does not transfer directly to sunflowers (my assessment).**
(i) Hoffman bounds give **density** bounds. An n-uniform r-SF family has negligible μ_p-density on a huge ground set.
(ii) The 3-sunflower relation is **not monotone**, so one cannot pass to up-sets as Li can with covering.
Given a centre S, the triple (S,A_1,A_2) is a sunflower iff A_1 ∩ S = A_2 ∩ S and A_1 ∩ A_2 ∩ S^c = ∅. This *is* a per-coordinate product relation:
the identity kernel on S and a Kneser kernel P'(1,1) = 0 off S. So an averaged kernel K = E_{S~ν} K'_S has eigenvalues
λ_T = E_ν[(-p/(1-p))^{|T∖S|}]. But the resulting Hoffman bound constrains μ_p(F), which is tiny anyway. So the argument is empty in the set model.
(iii) Constant spread cannot force two disjoint members (LSZ), so no spread-only spectral statement about empty-core sunflowers can succeed.

**B1.4 Possible adaptation (CONJECTURE / action item).** Use the *dense* alphabet model [D]^n. By Alon–Shpilka–Umans, r = 3 is equivalent to
|F| ≤ C^n uniformly in D. There the target is a *density* bound (C/D)^n, and the sunflower relation is a 3-ary product relation per coordinate:
each coordinate is all-equal or all-distinct. A Hoffman-type bound for 3-ary relations that **tensorizes** is the Filmus–Golubev–Lifshitz
"high-dimensional Hoffman bound" (arXiv 1911.02297, snippet). It is sharp for tensor powers whenever sharp for the base.
Concrete question: compute the HD-Hoffman ratio h(D) of the base 3-ary relation on [D] (all distinct, plus degenerate all-equal) and ask whether h(D) = O(1/D).
For D = 3 this is the cap-set relation. Spectral methods are known to be weak there, so h(3) is probably close to 1. That would make the approach hopeless
unless "Li-style" averaging over a spread centre measure is added. This is a small, finite computation (an SDP/eigenvalue problem on [D]³) and a good task for a computational agent.

### B2. Fang–Wang domination after thinning (Talagrand Conj. 7.8)

**Statement (snippet):** ν q-spread and η = tq(1-p)/(p(1-t)) ≤ 1 ⇒ Law(J∩X_t) ≤_st μ_p.
**CHECKED-NUMERICALLY** at N = 4 (q,t) ∈ {(.3,.5),(.5,.5),(.25,.7),(.4,.2)}. For each of the 168 up-sets U, an LP found the worst q-spread ν and
max_U [P(J∩X_t ∈ U) − μ_p(U)]. That maximum is ≤ 1e-15 at η = 1 and strictly positive (up to 0.16) at η = 2.
**How it might be used for r = 3.** It transfers *every* product-measure upper bound on up-set events to thinned spread measures, not just union bounds.
Example (PROVED, trivially, given the theorem): if G is intersecting then up(G) is intersecting, so μ_p(up G) ≤ p for p ≤ 1/2 (p-biased EKR).
Hence for a C-spread family F (q = 1/C) and any intersecting G, P_{J~F}(J∩X_t contains a member of G) ≤ p ≈ tq/(1-t).
In a 3-SF family every anchored cell G_S = {B∖A : B∩A = S} is intersecting. So this bounds how often a thinned random member can "see" an anchored cell.
I do not see how this beats the log n barrier. It is a clean new inequality, though, and the archive's entropy/coding arguments may want it where they currently use union bounds.
Snippets do **not** say what Talagrand's Conj. 7.3 and 7.11 state.

### B3. Park (q_f vs q, dimension-free) and Tran (conditional spreadness)

Both concern *threshold theory*. In the sunflower setting the log n in the spread lemma is a genuine coupon-collector phenomenon for the
"random W contains a member" endpoint (CONTEXT). Park's comparison removes log ℓ between q and q_f but not between p_c and q. So it cannot
remove the log n. Tran's method is more suggestive. He removes log(e(H)) for *structured* H by decomposing into layers that are conditionally spread,
chosen greedily to maximize containment probability over the spread bound. The r = 3 analogue would be to use sunflower-freeness at nonempty cores,
via the anchored cells of §B5, to build a layered spreadness certificate whose loss does not grow with n. This is speculative.

### B4. Alweiss "Set System Blowups" (snippet)

A typical k-tuple of a large family can be blown up into large subfamilies with frozen cross-intersections. This yields the equivalence
"multicolour r-sunflower problem ≍ ordinary problem up to exponential factors". **For r = 3** the team may therefore work with three families
F_1, F_2, F_3 (each > C^n) and seek a rainbow sunflower, which is often easier to set up with entropy/coupling arguments.
The blow-up lemma itself could serve as a "regularization" step replacing core extraction. Unverified; get the precise statement before use.

### B5. Small-case data and a composition inequality (Axante et al. + PROVED here)

* **CONFIRMED** (Lean file `lean/Sunflower/F43.lean`, raw GitHub). The AHS-27 family has 9 points in three triples X_0, X_1, X_2.
  Its members are A_i ∪ A_j (i<j) with A_i a pair inside X_i and A_j a pair inside X_j: 27 sets, 4-uniform, intersecting, 3-SF. Two disjoint copies give f_3(4) ≥ 54.
  The upper bound ψ_3(4) ≤ 27 comes from an archived exhaustive search (11,720 roots) and is not a certificate. f_3(4) ≤ 83 also uses SAT/DRAT certificates. I did not rerun either.
* **Composition inequality (PROVED here; it is presumably the classical Abbott–Hanson multiplication).** Let H be an a-uniform 3-SF family and G a b-uniform
  *intersecting* 3-SF family. Take disjoint copies G_v on blocks X_v, and for h ∈ H form M = ∪_{v∈h} g_v with g_v ∈ G_v. The composed family
  is ab-uniform, has |H|·|G|^a members, and is 3-SF. It is intersecting if H is.
  *Proof.* Suppose M_1, M_2, M_3 form a sunflower with outer sets h_1, h_2, h_3. Restrict to a block X_v.
  If v lies in exactly two of the h_i, then the corresponding g's would have to be disjoint, contradicting G intersecting.
  If v lies in all three, the three g_v form a "weak sunflower" of equal-size sets, so they are all equal (else a 3-sunflower in G or a containment).
  Hence every vertex lies in 0, 1 or 3 of the h_i, so {h_i} is a sunflower in H, and the h_i must coincide.
  But then the g's agree on every block, so the M_i coincide. ∎
  Consequences: ψ_3(ab) ≥ ψ_3(a)ψ_3(b)^a and f_3(ab) ≥ f_3(a)ψ_3(b)^a. So ψ_3(2^k) ≥ 3^{2^k-1}, which gives 27 at n = 4 (exact there), and 54 = 6·3².
  Known values: ψ_3(1) = 1, ψ_3(2) = 3, ψ_3(3) = f(2,3) = 6 (Frankl–Wang identity ψ(3,k,2) = f(2,k), as quoted in Axante's Lean README), ψ_3(4) = 27.
* **Anchored-cell bound (PROVED; this is the CONTEXT anchored-trace lemma made quantitative).** f_3(n) ≤ 1 + Σ_{s<n} C(n,s) ψ_3(n-s).
  So ψ_3(m) ≤ c^m ⇒ f_3(n) ≤ (1+c)^n, and conversely f_3 ≥ 2ψ_3. **The r = 3 conjecture is equivalent to "intersecting 3-SF m-uniform families have ≤ c^m members"**, with c ≥ 3 necessary.
  This is the cleanest target for any new technique. For intersecting families the relevant spread is at most O(log n) (§B10), so the spread lemma is already "almost" enough there.

### B6. Mishra's "shifted families" result is trivial (PROVED)

Let F be left-shifted (A ∈ F, j ∈ A, i < j, i ∉ A ⇒ A−j+i ∈ F), n-uniform and r-SF. If some A ∈ F has max element m ≥ n+r−1, repeated shifting
puts {1,…,n−1,x} in F for every n ≤ x ≤ m. These are ≥ r sets forming a sunflower with core [n−1]. So F ⊆ C([n+r−2], n) and
|F| ≤ C(n+r−2, r−2), which is polynomial. Mishra's bound f'(k,s) ≤ 2^{k} s^{2s}-type (from the snippet recurrence) is therefore weaker than trivial.
Shifting does not preserve sunflower-freeness (archive), so there is nothing to transfer.

### B7. Polynomial-method line (Naslund–Sawin, Ahmadi–Norouzi, ASU)

* Ahmadi–Norouzi improve only the **polynomial factor** (n^{1/2} → n^{1/6}) in the *non-uniform* Erdős–Szemerédi problem. Irrelevant to the exponent.
* Alon–Shpilka–Umans (Comput. Complexity 2013): Erdős–Rado r = 3 ⇔ sunflower-free A ⊆ (Z/D)^n have |A| ≤ C^n uniformly in D (S+).
  Naslund–Sawin give c_D = (3/2^{2/3})(D−1)^{2/3} (snippet). The archive's B_D = min_t (1+(D−2)t+t²)/t^{2/3} is the sharper, cap-set-type form (≈ 2.755 at D = 3).
  Both grow like D^{2/3}. Slice-rank-type methods cannot give D-uniform bounds (my assessment, not a quoted theorem). Nothing found on slice-rank *lower* bounds for the sunflower tensor.
* Erdős–Szemerédi capacity: the best lower bound is still μ_3^S > 1.551 (Deuber–Erdős–Gunderson–Kostochka–Meyer) and the upper bound is 3/2^{2/3} ≈ 1.8899 (S+). Weak Δ-systems: (1.8367+o(1))^n (2203.13370, 2023).

### B8. Moonflowers (Lovett–Meka–Wang)

A k-moonflower requires each set to have a private element; every k-sunflower with nonempty petals is a moonflower. They report near-optimal bounds,
which I did not recover. Possible use: a moonflower-free family is sunflower-free-like with **no core condition**. The moonflower bound is an easier
"spread-type" endpoint; the gap between moonflower-freeness and sunflower-freeness is exactly the "equal pairwise intersections" condition that constant spread cannot enforce.

### B9. Bounded VC dimension (GWXZ 2609.18995; BBDFP 2408.04165)

Already in the archive. Chain: trace entropy/Sauer → sum of squared probabilities → Caro–Wei matching → maximal-codegree kernel; bound (50dr)^n.
Sunflower-free families generally have VC dimension Θ(n) (CONTEXT), so this does not apply directly.

### B10. Maximum spread of intersecting families; spread plus matching number

* LSZ define α(w,r) = sup{κ : ∃ κ-regular w-set system with no r pairwise disjoint sets}. Here "κ-regular" means it carries a (1/κ)-spread distribution (S).
* **Upper bound:** α(w,r) ≤ C r log w by ALWZ/Rao random r-colouring (standard). For r = 2 this is O(log w).
* **Lower bounds:** α(w,2) ≥ ~log w / loglog w from the LSZ block construction (CONTEXT computation; PROVED in the archive). α(w,r) ≥ r − 1/w from the complete
  w-uniform family on rw−1 points (PROVED: ν(T⊆X) ≤ (w/(rw−1))^{|T|}). Disjoint unions of r−1 LSZ copies keep spread ≳ log w/loglog w.
  Composing the complete family with LSZ (§B5-type composition) does **not** multiply spreads; I checked this by hand.
* **No paper was found closing the loglog gap for α(w,2)**, nor determining α(w,r) jointly in r and w. The LSZ snippet "κ = log w − O(1), not
  (1/2,1/2)-satisfying" refers, on my reading, to the non-intersecting coupon-collector transversal family. Unverified.

### B11. Talagrand's "Are many small sets explicitly small?" (STOC 2010), as far as snippets show

* The main "explicitly small" conjecture is the Kahn–Kalai type (proved by Park–Pham 2022). "q_f ≤ K q" is partially done (Dubroff–Kahn–Park; Park 2609.14681 up to loglog(1/q)).
  The selector-process conjecture is proved (Park–Pham; sharp version Pham 2412.03540).
* **Conj. 7.1** is the central discrete problem: a constant number of unions of a large family leaves an exceptional class with a small witness class.
  This is the *integral* discrete convexity conjecture and is **still open**. The *fractional* version is solved by Li with m = 2.
* **Conj. 7.8** (spread measures dominated by products after thinning) is solved by Fang–Wang via Li. Talagrand notes 7.8 ⇒ 7.3 and 7.8 ⇒ 7.11; their contents were not recovered.
* The "creating large sets" conjecture claimed by Fang–Wang 2511.17336 was **withdrawn**.
* **Sunflower relation:** none of the Talagrand problems found is literally a sunflower problem. The link is historical/technical: ALWZ spread → FKNP fractional
  expectation thresholds → Park–Pham. Li's intro reportedly mentions "linking sunflower bounds to fractional expectation thresholds". Unverified that no Talagrand problem mentions sunflowers.

---

## (c) What could not be verified

1. **Every statement from 2609.08967, 2609.18458, 2609.14681, 2609.20546, 2608.11183, 2605.10908, 2606.30593, 2605.08676, 2604.19183/21855,
   2505.03671, 2605.12232, 2003.11202, 1903.00580, 2512.20055, 2509.16355** is snippet-only. Snippet summaries are model-written and sometimes wrong.
   One claimed "independent" samples in Li's coupling, which is provably false (§B1.2). Another conflated the LSZ constructions.
2. The exact definitions in Li's paper (Q_2, Bad_m, "weakly p-small", Problem 1.3/1.5/1.7 numbering), whether (1−p)/(2−p) is sharp, and whether Li's proof is the
   one reconstructed in §B1.1. My reconstruction is a valid proof of the snippet statement, but Li's argument may differ.
3. The content of Talagrand's Conj. 7.3 and 7.11. Whether any Talagrand problem mentions sunflowers explicitly.
4. The proof method of Fang–Wang Thm 1.2 (whether spectral). Only small-N numerical consistency was checked.
5. Mishra's exact final theorem and proof. The triviality argument is mine and does not depend on their proof.
6. Axante et al.: I did not rerun the f(3,4) ≤ 49, f(4,3) ≤ 83 or ψ(4,3,2) ≤ 27 searches or build the Lean project. The upper bound 27 rests on an exhaustive-search ledger, not a certificate.
7. The Ge–Wang–Xu–Zhao date inconsistency (id 2609 vs "submitted July 17, 2026") remains unresolved.
8. DeepMind formal-conjectures issue #2284: the body was not readable (GitHub web/API returned 403; the MCP repo is not authorized). Only the snippet (opened 2026-02-13 by franzhusch, formalizability 2/5) and the Lean file (CONFIRMED) were seen.
9. Rao's survey open-problem list beyond the two items in snippets. The full list was not reachable (the PDF host is blocked).
10. Whether the maximum spread of intersecting families (α(w,2)) is known to be Θ(log w) or Θ(log w/loglog w). Nothing found either way.
11. No 2025–2026 paper was found claiming the uniform-in-D alphabet-model bound or slice-rank lower bounds for the sunflower tensor. Absence in search is not evidence of absence.

## Files

* `r24/LIT_digest.md`: this file.
* `r24/lit_li_check.py`, `r24/lit_li_check.out`: numerical checks (Li Thm 1.9 kernel, eigenvalues and brute force; Fang–Wang domination; Li coupling LP).
* `r24/lit_raw/`: raw GitHub downloads. They include the erdosproblems database (`erdos_data.yaml`, `erdos_readme.md`), the DeepMind Lean statement (`fc20.lean`), Tao's AI wiki (`ai_wiki.md`),
  the Axante repository README, Lean README, `F43.lean` witness (AHS-27) and artifact READMEs, and the LLM-hunter #20 attempt (`llmhunter_20.tex`).
