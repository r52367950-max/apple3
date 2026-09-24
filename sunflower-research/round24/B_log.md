# B_log — beating the logarithm for r = 3 (round 24, agent B)

Date 2026-09-24. Statuses used: PROVED (a full proof is written here), CHECKED-NUMERICALLY, CONJECTURE, REFUTED.
Notation: F_Y = {A\Y : Y ⊆ A ∈ F}. "3-SF" means no three distinct members form a sunflower. A measure μ on sets is
R-spread if μ(T ⊆ A) ≤ R^{-|T|} for all T. W_δ is a δ-random subset (each element kept independently with probability δ).

## 0. Summary

**No bound of the form o(log n)^n was obtained.** The target "(C log n / loglog n)^n or better for r = 3" remains open here.
Below: what was proved, where each route breaks, and the barriers now pinned down.

1. **(PROVED) Where log n enters.** One-round fragment lemma (§1, Lemma 1.1): P(|T(A,W_δ)| = t) ≤ C(k,t)(δR)^{-t}.
   Each round costs density ≍ 1/R and shrinks fragments only by a constant factor, so about log n rounds are needed.
   No density schedule can avoid this for transversal families (Prop 1.3): the union of all rounds is one p-random set, and the success
   probability is (1-(1-p)^q)^n whatever the schedule is. So the log n is the **number of rounds**, and a "geometric schedule" gains nothing.
2. **(PROVED) Partial endpoint with o(log n) spread (Thm 1.4).** An R-spread n-uniform family, for any R ≥ 50, has three members with
   pairwise intersections of size ≤ 2·max(3, n·2^{-⌊R/50⌋}+1). So spread R = ε log n already gives three members that are
   "disjoint up to n^{1-cε} defects". The missing step converts almost-disjoint into equal traces. That step is exactly the anchored-cell problem.
3. **(PROVED) Barrier: small-core freeness is useless (Thm 2.1, LSZ^N).** For every ε ∈ (0,1) and infinitely many n there is an
   n-uniform family with exact spread R ≥ (ε/(1+ε) − o(1)) ln n / ln ln n. It is intersecting, every link F_Y with |Y| < n^{1-ε} is
   intersecting, and **every 3-sunflower has core size ≥ 3n^{1-ε}**. Also, at every spread parameter below its exact spread, the
   densest-core extraction returns K = ∅. So a proof must use sunflower-freeness at cores of size ≥ n^{1-ε}, and it must look at
   **non-densest cores**. In LSZ^N the sunflower cores are *nearly* densest: R^{|Y|}|F_Y| = |F|·((1+3a)/(1+a)^3)^N (Prop 2.3).
4. **(PROVED) Cost of anchoring (Prop 3.2).** For an R-spread family and any anchor A, the anchored cells have loss factor
   Λ_S := R^{-|S|}|F|/|G_S|. Some cell has Λ_S ≤ (1+1/R)^n ≤ e^{n/R}, and for transversal families every small-trace cell has
   Λ_S ≥ (1+1/(q−1))^{n−|S|}. So Idea 2 (anchor, then a 2-colour spread lemma on an intersecting cell) loses e^{n/R} in spread.
   That loss is harmless for fragments of size ≳ n/R and fatal below that size. The break point is identified precisely.
5. **(PROVED/REFUTED) Positivity (Idea 3).** For product colourings, Harris gives only *upper* bounds (the events are negatively correlated).
   A second-moment count of monochromatic triples is circular. The new Fang–Wang domination theorem and Li's covering coupling hold for
   **every** q-spread measure, so they hold for the transversal family T_q^n. Neither can imply "W_p contains a member" beyond coupon
   collector (§4). As *upper-bound* tools they can control trace entropy in the anchoring step. That is the only place where they point in the useful direction (§4.3).
6. **(CONJECTURE) The missing lemma** (§5): a *near-densest-core lemma* for 3-SF families. There is Y with R^{|Y|}|F_Y| ≥ λ^{|Y|}|F| (λ<1 fixed) such that
   F_Y is (C log(n−|Y|))-spread and n − |Y| ≤ exp(O(R)). Together with the fragment lemma this would give f_3(n) ≤ (C log n/loglog n)^n
   or better. LSZ^N satisfies it (§5), so no known example refutes it.

**Weakest step of the proved items:** the multi-round bookkeeping in Thm 1.4, where rounds are run on sub-probability measures restricted to small
fragments (Lemma 1.2). It has been checked once by hand. It is standard (Rao/BCW style), but the constants 16, 50 are mine and were not cross-checked by
another agent.

## 1. The fragment method in detail, and where log n enters

**Lemma 1.1 (one round; PROVED).** Let ν be a sub-probability measure on a finite family 𝓑 of subsets of X, all of size ≤ k,
with ν(T ⊆ B) ≤ R^{-|T|} for every T. Fix a total order on supp ν. For B ∈ supp ν and W ⊆ X let B' be the first member of supp ν
with B' ⊆ B ∪ W that minimises |B'\W|, and put T(B,W) := B'\W. Note T(B,W) ⊆ B\W. For W = W_δ and every t ≥ 1,

  Σ_B ν(B)·P_W(|T(B,W)| = t) ≤ C(k,t)·((1−δ)/(δR))^t.

*Proof.* Take a pair (W,B) with |T| = t and set Z = W ∪ T. Since B' ⊆ W ∪ T = Z, the set Z contains a member of supp ν. Let B*(Z) be the first
such member. Then B* ⊆ Z ⊆ W ∪ B, so B* was a candidate, and hence |B*\W| ≥ t. Also B*\W ⊆ Z\W = T. Therefore B*\W = T, and in particular
T ⊆ B*(Z). Since W = Z\T, the map (W,B) ↦ (Z,T,B) is injective. Its image satisfies: T is a t-subset of B*(Z), and T ⊆ B. Hence

  LHS ≤ Σ_Z Σ_{T ⊆ B*(Z), |T|=t} P(W = Z\T)·ν(T ⊆ B) ≤ Σ_Z P(W = Z)·((1−δ)/δ)^t·C(k,t)·R^{-t},

using P(W = Z\T) = P(W = Z)((1−δ)/δ)^t. Finally Σ_Z P(W=Z) ≤ 1. ∎

**The only non-spread cost is C(k,t)**: the entropy of *which* t-subset of the canonical member B*(Z) is the fragment. To shrink
k → t in one round, one needs δR ≳ e·k/t.

**Lemma 1.2 (iterated rounds; PROVED).** Let μ be an R-spread probability measure on an n-uniform family F. Let W^{(1)},…,W^{(J)} be
independent copies of W_δ and let n = k_0 ≥ k_1 ≥ … ≥ k_J. Set ν_0 = μ. Given W^{(1..j)}, let ν_j be the push-forward, under
B ↦ T(B,W^{(j)}) (computed w.r.t. supp ν_{j−1}), of ν_{j−1} restricted to {B : |T(B,W^{(j)})| ≤ k_j}. Then:
(a) ν_j(S ⊆ ·) ≤ R^{-|S|}, since T ⊆ B;
(b) every member of supp ν_j has the form B\(W^{(1)}∪…∪W^{(j)}) for some B ∈ F (induction: T(B,W) = B'\W with B' ∈ supp ν_{j−1});
(c) E[1 − ν_J(total)] ≤ Σ_{j=1}^J φ_j with φ_j := Σ_{t>k_j} C(k_{j−1},t)(δR)^{-t} (Lemma 1.1 applied to ν_{j−1}, conditionally on the past).
Consequently P(∃B ∈ F : |B \ U| ≤ k_J) ≥ 1 − Σ_j φ_j, where U = ∪_j W^{(j)} is a (1−(1−δ)^J)-random set. ∎

**Halving schedule.** Take δR ≥ 16 and k_j = ⌈k_{j−1}/2⌉. Then φ_j ≤ 2^{k_{j−1}}·16^{-k_{j−1}/2} = 2^{-k_{j−1}}. If k_J ≥ 2, then
k_{j−1} ≥ 2k_j − 1 ≥ k_j + 1 for all j, so Σ_j φ_j ≤ Σ_{m ≥ k_{J−1}} 2^{-m} ≤ 2^{2−2k_J} ≤ 1/4.

**Proposition 1.3 (no density schedule helps against transversals; PROVED, elementary).** Let T_q^n be the transversals of n disjoint
q-blocks. This family is exactly q-spread. For any multi-round scheme whose rounds are independent random sets with union U ~ W_p,
P(some member ⊆ U) = (1−(1−p)^q)^n. This depends only on p, not on how p is split into rounds. So "W_p contains a member with probability ≥ 2/3"
forces q ≥ (1+o(1)) ln n / ln(1/(1−p)). Moreover one round of density δ has fragments = the points of the blocks missed by W, and
|T| ~ Bin(n,(1−δ)^q). The true shrink factor per round is e^{-δq}, so Σ δ_j·q ≥ ln n rounds' worth is necessary.
**Conclusion:** log n = (number of constant-factor shrink rounds) × (Θ(1/R) density per round). This holds for the *high-probability endpoint*,
irrespective of schedule. Beating it requires a different endpoint, not a different schedule. This REFUTES the "geometrically decreasing densities"
version of Idea 1 whenever the endpoint is "each colour class contains a member w.h.p.".

**Theorem 1.4 (almost-disjoint triples at spread o(log n); PROVED).** Let F be n-uniform with an R-spread probability measure, R ≥ 50.
Put J = ⌊R/50⌋, reduced if necessary so that the halving schedule gives k_J ≥ 2 (so s := k_J ≤ max(3, n2^{-J}+1)). Then F has members
B_1,B_2,B_3 with U-colour classes U_1,U_2,U_3 pairwise disjoint and |B_i \ U_i| ≤ s. In particular |B_i ∩ B_j| ≤ 2s for i ≠ j.
If n > 2s, the three members are distinct.

*Proof.* Take a uniform 3-colouring. Class U_i is a 1/3-random set. Write it as the union of J independent δ-random sets with (1−δ)^J = 2/3.
Put x = ln(3/2)/J ≤ 0.406. Then δ = 1−e^{-x} ≥ x(1−x/2) ≥ 0.323/J, so δR ≥ 0.323·R/J ≥ 16. By Lemma 1.2 and the halving estimate, for each i,
P(no B ∈ F with |B\U_i| ≤ s) ≤ 1/4. A union bound over the three colours leaves probability ≥ 1/4. Since the U_i are pairwise disjoint,
B_i ∩ B_j ⊆ (B_i\U_i) ∪ (B_j\U_j). ∎

*Meaning.* With R = ε log_2 n·50, i.e. spread a constant fraction of log n, we get pairwise intersections ≤ 2n^{1−ε}+O(1).
With R = L = o(log n) we still get pairwise intersections ≤ n·2^{-L/50}. The remaining gap is qualitative: the defects must become a
**common core** (equal pairwise intersections), not merely small.
Running the same argument to k_J = 0 (log_2 n rounds plus a final round) reproduces f_3(n) ≤ (O(log n))^n. No attempt was made to beat published
constants. The crude constant here is ~ 16·3·log_2 e/… ≈ 10^2, which is surely not better than the literature.

## 2. Barrier: sunflower-freeness at small cores (and at the densest core) is not enough

Let G = LSZ(t), t ≥ 3. Take m = t^t disjoint t-blocks B_1..B_m. A member contains one whole block and one point of every other block.
Rank b = m+t−1, |G| = t^b. G is intersecting, and its exact spread is R_t = mt/(m+t−1) = t/(1+a) with a = (t−1)/m
(archive spread_entropy.md §3.2, re-derived there). Two further facts about G, with proofs:
* *Every 3-sunflower of G has core size ≥ 3.* Let the distinguished blocks be d_1,d_2,d_3. If all three are equal, the core contains that block (size t ≥ 3).
  If exactly two are equal, say d_1 = d_2 ≠ d_3, then a point of B_{d_1} not chosen by member 3 has multiplicity 2, which is impossible.
  If all three are distinct, members 2 and 3 must choose the same point of B_{d_1} (otherwise a multiplicity-2 point appears), and likewise for d_2 and d_3.
  So the core contains 3 points.
* *Containment probability of s points in s distinct blocks:* t^{-s}(1+s·a) (archive).

**Theorem 2.1 (LSZ^N barrier; PROVED).** Let F = G^N: N disjoint copies of the ground set, one member of G in each copy, union taken.
Then n = Nb and |F| = t^n, and:
(i) the uniform measure on F is exactly R_t-spread (product of the coordinate measures; singletons attain equality);
(ii) F is intersecting, and F_Y is intersecting for every Y with |Y| < N;
(iii) every 3-sunflower in F has core size ≥ 3N;
(iv) for every R < R_t, the maximiser of R^{|K|}|F_K| is uniquely K = ∅, and F_∅ = F has no two disjoint members.
Choosing n = b^{1+⌈(1−ε)/ε⌉} gives N ≥ n^{1−ε} and ln b ≥ (ε/(1+ε)) ln n, so R_t ~ t ~ ln b/ln ln b ≥ (ε/(1+ε) − o(1)) ln n/ln ln n.

*Proof.* (i) If T = ∪_i T_i with T_i in copy i, then P(T ⊆ A) = Π_i P_G(T_i ⊆ A_i) ≤ Π_i R_t^{-|T_i|}.
(ii) Two members meet in every coordinate (G is intersecting), so |A∩B| ≥ N. Two disjoint members of F_Y would give A ∩ B = Y, hence |Y| ≥ N.
(iii) Suppose three distinct members form a sunflower with core Y. Restricted to copy i, the pairwise intersections all equal Y ∩ X_i, so each
coordinate triple is a weak sunflower in G. In a uniform family a weak sunflower with a repeated member is constant. A constant coordinate
contributes b ≥ 3 core points, and a non-constant coordinate is a genuine 3-sunflower of G, contributing ≥ 3 core points. So |Y| ≥ 3N.
(iv) R^{|K|}|F_K|/|F| = Π_i R^{|K_i|}P_G(K_i ⊆ A_i) ≤ Π_i (R/R_t)^{|K_i|}, which is < 1 unless K = ∅. ∎

**Consequences (PROVED, from 2.1).**
* Spread + "no 3-sunflower with core < n^{1−ε}" (even + "all links with |Y| < n^{1−ε} intersecting") is consistent with spread
  ≍ ε log n/loglog n. Hence any argument beating log n/loglog n must invoke sunflower-freeness at cores of size ≥ n^{1−ε}, for every ε>0.
  (Against log n itself this barrier only says: a small-core argument cannot go below log n/loglog n.)
* The standard minimal-counterexample normalisation ("F is R-spread, so take K = ∅") lands on a link with no 2 disjoint members.
  **Densest-core arguments are dead for R = o(log n).**

**Proposition 2.3 (sunflower cores in LSZ-type families are near-densest; PROVED).** In G, take the core Y = B_i ∪ P, where P holds one point
in each of m−1−s other blocks. Y is the core of a 3-sunflower whenever s ≥ 1 and t ≥ 3: take three members with distinguished block i that agree on P and
choose distinct points in the remaining s blocks. Its link G_Y is the transversal family of s t-blocks: rank s, exactly t-spread. Also
R_t^{|Y|}·|G_Y|/|G| = (1+a)^{-|Y|}, i.e. a loss of λ = 1/(1+a) = 1 − O(t^{1−t}) **per core element**. In G^N, take Y equal to a full member in N−1
coordinates and to such a core in one coordinate. That gives the same per-element loss λ, and a link that is a t-spread transversal family of rank s.
With s ≤ e^{t/C} the spread lemma certifies 3 disjoint members of this link (t ≥ C ln s).
*Proof.* P(Y ⊆ A) = m^{-1} t^{-(m−1−s)}, |Y| = t+m−1−s, R_t = t/(1+a), so R_t^{|Y|}P = (1+a)^{-|Y|}·t^{t}/m = (1+a)^{-|Y|}. ∎
The genuine small-core sunflowers of G (three distinct distinguished blocks, core of 3 points) also have per-element ratio
((1+3a)/(1+a)^3)^{1/3} = 1 − O(a²).

So in every test family, **the sunflower lives in a link that is near-densest per element (λ → 1) but far from the densest core**. In the good
case this link has rank as small as exp(O(R)), which is exactly what the spread lemma needs.

(CHECKED-NUMERICALLY, `code/B_checks.py`: the LSZ-type family with t = 3 and m = 4 blocks has 108 members, is intersecting, and has min sunflower core 3.
This exercises the core-size argument, which does not use m = t^t. Lemma 1.1 was verified exactly, over all W, on 8 random small families.)

## 3. Idea 2 (anchor, then use intersecting cells): exact cost and break point

Fix A ∈ F. For S ⊊ A let G_S = {B\A : B ∈ F, B∩A = S}. G_S is intersecting and 3-SF (archive). The reduction
f_3(n) ≤ 1 + Σ_{s<n} C(n,s) ψ_3(n−s), with ψ_3 the maximum size of an intersecting 3-SF family, is PROVED in LIT_digest §B5 and is not repeated here.

**Proposition 3.2 (anchoring loss; PROVED).** Let F be R-spread (uniform measure) and define Λ_S := R^{-|S|}|F|/|G_S| (so Λ_S ≥ 1). Then
(a) min_S Λ_S ≤ (1+1/R)^n ≤ e^{n/R};
(b) G_S satisfies |(G_S)_T| ≤ Λ_S R^{-|T|}|G_S|, i.e. it is R-spread up to the factor Λ_S;
(c) for the transversal family T_q^n (R = q), Λ_S = (q/(q−1))^{n−|S|} exactly. So every cell with |S| ≤ n/2 has Λ_S ≥ e^{n/(2q)}.
Only cells with n−|S| = O(q) are nearly lossless.
*Proof.* (a) Σ_S |G_S| = |F| gives Σ_S R^{-|S|}Λ_S^{-1} = 1, while Σ_S R^{-|S|} = (1+1/R)^n. So the R^{-|S|}-weighted average of Λ_S^{-1} is
(1+1/R)^{-n}, and some Λ_S ≤ (1+1/R)^n. (b) For T disjoint from A: (G_S)_T ⊆ F_{S∪T}, so |(G_S)_T| ≤ R^{-|S|-|T|}|F| = Λ_S R^{-|T|}|G_S|.
(c) G_S is the transversal family on the blocks i with a_i ∉ S, each block reduced by one point, so |G_S| = (q−1)^{n−|S|}. ∎

**Where it breaks (exact).** With loss Λ, Lemma 1.1 becomes P(|T| = t) ≤ Λ·C(k,t)(δR)^{-t}. Rounds with t ≫ log Λ ≈ n/R are unaffected.
Below fragment size ≈ n/R, the factor Λ = e^{Θ(n/R)} dominates, and the 2-colour argument on the intersecting cell stalls.
Re-extracting a core K' of G_S (at parameter R' < R) restores spread with |K'| ≤ log Λ_S / log(R/R'). But a nonempty K' destroys intersectingness.
Two disjoint members of (G_S)_{K'} give B_1 ∩ B_2 = S ∪ K' ≠ S = A∩B_i, which is not a sunflower with A. So Idea 2 in its plain form costs exactly the
**trace entropy** n/R·log(eR) − n/R·log R = n/R nats. The anchored cells that *are* lossless have |S| ≥ n − O(R), i.e. large near-dense cores
again (compare Prop 2.3). **Lesson: Idea 2 and the §2 barrier point to the same object: near-dense large cores.**

**Attempted refinement: a random core region (4 colours).** Colour X with colours 0,1,2,3 (density ρ for 0). Look for Y ⊆ U_0 and members
B_i with B_i ∩ U_0 = Y and B_i\Y ⊆ U_i. This splits F into the families F^Y = {B\Y : B∩U_0 = Y}. There are now exponentially many
chances (one per Y), and only one needs to succeed. Break point: showing that *some* F^Y succeeds needs either (i) a single F^Y that is
C log n-spread (back to square one; the typical F^Y carries the loss factor of Prop 3.2 with n replaced by ρn), or (ii) a second-moment
count over (Y, B_1, B_2, B_3). The expectation in (ii) is exactly Σ over sunflowers, which is 0 in a counterexample. That makes it circular, **REFUTED as
a standalone mechanism.**

## 4. Idea 3 (positivity), and the new Fang–Wang / Li tools

**4.1 (PROVED, Harris).** Under a product 2-colouring, E_1 = {U_1 ⊇ member} is increasing and E_2 = {U_2 ⊇ member} is decreasing in the
indicator vector of colour 1. So P(E_1∩E_2) ≤ P(E_1)P(E_2). Correlation inequalities of FKG type give only the wrong direction.
For T_3^n (q = 3), P(E_1∩E_2∩E_3) = (2/9)^n < P(E_1)^3 = (19/27)^{3n}. The loss is genuinely exponential, though harmless there.

**4.2 Meta-obstruction (PROVED).** Any inequality whose only hypothesis is "ν is q-spread" (or q-spread plus product randomness) also holds for
T_{1/q}^n. For that family P(W_p ⊇ member) = (1−(1−p)^{1/q})^n → 0 when q ≥ c/log n. Hence neither Fang–Wang Thm 1.2 (thinned spread
measures are dominated by μ_p when η = tq(1−p)/(p(1−t)) ≤ 1) nor Li's Thm 3.3 (a coupling X ~ ν, R_1,R_2 ~ μ_p with X ⊆ R_1∪R_2) can,
by themselves, push the *containment* endpoint below coupon collector. Both are also *upper-bound/covering* statements:
* Fang–Wang bounds P(J∩X_t ∈ 𝒰) ≤ μ_p(𝒰) for up-sets 𝒰, i.e. it says thinned members look *sparse*.
* Li's coupling says a spread member is *covered* by two p-random sets. We need the reverse: a p-random set *contains* a member.
  For r = 3, Li's coupling gives B ⊆ R_1 ∪ R_2 (with R_i ~ μ_p, dependent). It says nothing about B inside a colour class.

**4.3 Where they might help (CONJECTURE-level).** The loss in §3 is the entropy of the trace B∩U_0 (or B∩A). Fang–Wang gives
Law(B∩U_0) ≤_st μ_p with p ≈ ρ/R(1+o(1)). That controls trace *size* tails (|B∩U_0| ≤_st Bin(N,p)), but the factorial moments from spread
already give Poisson-type tails. It does **not** lower-bound the mass of a single trace cell, which is what §3 needs. The honest verdict:
**no gain found** for fragment/threshold arguments with sunflower-freeness. A possible use: an r = 3 "reverse-Li" statement,
"if ν is q-spread and 3-SF-supported, then there is a coupling with B_1,B_2,B_3 ~ ν and pairwise-equal intersections". That would be the conjecture itself,
and it does not follow from Li's spectral method, whose kernel is monotone while the sunflower relation is not.

## 5. The missing lemma, and tests

**Refuted general-family version (REFUTED, sketch; the standard first-moment deletion is not written in full).** "Every R-spread F with |F| ≥ R^n
has a link of rank m ≤ e^{R/C} which is (R/2)-spread." A random subfamily of [q]^n of size ≈ q^{n/2}e^{-o(n)}, after deleting pairs that agree
in ≥ n−m coordinates, has spread ≈ √q while all links of rank ≤ m have ≤ 1 member. So the link lemma must use 3-SF.

**Conjecture 5.1 (near-dense large core dichotomy, r = 3).** There are absolute C, c > 0 and λ ∈ (0,1) such that for every 3-SF n-uniform F which
is R-spread with |F| ≥ R^n, one of the following holds:
(a) some Y with 1 ≤ n−|Y| ≤ e^{cR} has R^{|Y|}|F_Y| ≥ λ^{|Y|}|F| and F_Y (C log(n−|Y|))-spread;
(b) F is *code-like*: P_{A,B}(|A∩B| ≥ n − e^{cR}) ≤ e^{-cn} for independent uniform A, B.
(a) contradicts 3-SF by the spread lemma. So the conjecture reduces the r = 3 problem at spread R = o(log n) to *code-like* 3-SF families, where
random codes show sunflowers are abundant, but no deterministic argument is known.
*Tests:* LSZ^N and LSZ satisfy (a) by Prop 2.3 (λ = 1 − O(t^{1−t}), link a t-spread transversal of rank s ≤ e^{t/C}). Products G^N of fixed 3-SF G
satisfy (a) with a full-factor link, but they have bounded spread, so they are irrelevant. The transversal family satisfies (a) through large anchored cells (Prop 3.2(c)).
No test family violates the conjecture. It is **not** shown to be weaker than the r = 3 conjecture. Its value is that it isolates the only
known mechanism (near-densest, *non*-densest cores of small rank) compatible with all barriers.

## 6. Next steps

1. Prove or refute Conj 5.1(b)⇒small for code-like 3-SF families. The first test is a code-like subfamily of AHS products.
2. Near-dense-core extraction: maximise Φ(Y) = R^{|Y|}|F_Y|·w(n−|Y|) with a weight w rewarding small rank (e.g. w(m) = e^{−m/ log m}).
   Compute exactly which Y it selects in LSZ^N and in transversal families. Compare with Prop 2.3, and find the weakest w that still selects rank ≤ e^{O(R)}.
3. Convert Thm 1.4's almost-disjoint triples into equal-trace triples. Fix the defect region D (|D| ≤ 6s) and apply anchoring *on D only*.
   That loses the entropy of traces on D, at most |D|·log 2 = O(n2^{-R/50}) nats, which is o(n) when R → ∞. The open part: after conditioning on the
   trace on D, the 3-colour argument must be rerun, and the conditioned family's spread loss is 2^{|D|}. That is subexponential, so this is the most promising
   concrete loop (a bootstrapping n → n2^{-R/50}). It is **not yet closed**, because re-running needs spread for *small* sets inside the conditioned family.
