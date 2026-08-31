---
type: Clipping
status: Evergreen
language: en
title: "A distributional robustness margin for pathology foundation models"
source: "https://arxiv.org/abs/2607.25497"
source_type: article
author:
  - "[[Clément Grisi]]"
  - "[[Jeroen van der Laak]]"
  - "[[Geert Litjens]]"
published: 2026-07-28
created: 2026-08-31
description: "Pathology foundation models encode non-biological variation introduced by tissue preparation, staining and scanning, enabling shortcut learning that undermines generalisation across institutions. The Robustness Index (RI) was proposed to assess whether local representation geometry is dominated by biological or non-biological variation. However, its construction suffers from structural limitations that make cross-model comparison unreliable, calling for a more principled metric. We introduce the Cross-confounder Robustness Margin (CRoMa), a signed, per-sample margin that measures whether samples sharing the same biology but different confounder lie closer than samples sharing the same confounder but different biology. It is defined for every sample, allowing models to be compared on the same cohort and robustness to be analysed as a distribution rather than reduced to a single pooled score. We evaluated CRoMa across 20 tile-level encoders on three benchmarks. Rankings by median CRoMa were highly consistent across benchmarks (Spearman rho ~ 0.90), yet every encoder retained confounder-dominated samples, whose prevalence and severity varied markedly. Similar patterns emerged for four slide-level encoders evaluated on a separate benchmark, extending the analysis beyond tile-level representations. Higher median CRoMa was associated with smaller shortcut-induced performance losses in downstream linear probes, supporting its use as a representation-level indicator of shortcut susceptibility."
tags:
  - "clippings"
order: 110
belongs_to: "[[Clippings]]"
related_to:
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[CRoMa]]"
  - "[[Digital Pathology]]"
  - "[[Hugging Face Digital Pathology]]"
  - "[[Machine Learning]]"
  - "[[Image Analysis]]"
---
## Summary

Pathology foundation models encode the *way a slide was made* — fixation, sectioning, staining, scanning — alongside the biology on it. When those technical signatures line up with clinical labels, a downstream model can read the laboratory instead of the tissue. The question this paper asks is how to *measure* that vulnerability from frozen embeddings, before any task-specific model is trained.

The existing answer is the **Robustness Index (RI)**, the central metric of the PathoROB benchmark. This paper argues RI is structurally unsound for comparing models and replaces it with the **Cross-confounder Robustness Margin (CRoMa)**: a signed, per-sample margin that asks whether samples sharing biology but differing in confounder lie *closer* than samples sharing the confounder but differing in biology.

> The abstract quoted in the frontmatter is the paper's own, verbatim. The sections below digest the paper's headings, formulas and reported figures in my own words; the full text, figures and supplementary material are in the source.

## The typed-neighbour contrast both metrics share

Every metric here is built from the same four-way typing of an anchor sample's neighbours in embedding space. For anchor *i* with biological label *y*, confounder label *c* (here always the contributing medical centre), and a grouping identifier *g* (the slide for tiles, the case for slides):

| Pair type | Biology | Confounder | What proximity means |
|---|---|---|---|
| **SO** | same | other | Cross-confounder biological match — geometry organised by biology |
| **OS** | other | same | Same-confounder distractor — geometry organised by the confounder |
| SS | same | same | Uninformative — excluded |
| OO | other | other | Uninformative — excluded |

Features are L2-normalised and ranked by cosine distance. Crucially, neighbours from the anchor's own physical unit are excluded before scoring, so no metric can profit from near-duplicate tiles cut from the same slide.

## Three structural limitations of the Robustness Index

RI counts typed neighbours inside a fixed neighbourhood of size *k* and pools the counts across the cohort:

```
RI = Σᵢ SOᵢ / Σᵢ (SOᵢ + OSᵢ)
```

It runs 0 (neighbourhoods dominated by same-confounder distractors) to 1 (dominated by cross-confounder biological matches). The paper's case against it has three parts:

1. **It is count-based, so it discards geometry.** Two models can have identical neighbour counts while placing biological matches and confounder-driven distractors at very different distances from the anchor.
2. **It exists only as a pooled aggregate.** No per-sample score is defined, so neither the distribution of robustness across a cohort nor any vulnerable subset within it can be examined.
3. **It is undefined for anchors whose fixed-*k* neighbourhood contains no typed neighbour** — and those anchors are *silently dropped* from the pooled score. Different models are therefore scored on different effective subsets of the same data, which is what makes cross-model comparison unreliable.

The third point is the one with teeth, and the paper quantifies it. On Camelyon at the operating point *k* = 11, fewer than half of all samples contribute for **every** encoder, and fewer than a quarter for more than half of them — a support range of **10–46%**. The cause is a mismatch between the neighbourhood and where typed neighbours actually live: the first SO or OS neighbour appears at a median rank of about **149 among 20,400 candidates**, because *k* is chosen to maximise biological k-NN accuracy, a criterion dominated by the very SS neighbours that RI then discards.

### MaRI: the control that shows distance is not the real problem

To test whether count-blindness alone is the defect, the authors build **MaRI (Margin-aware Robustness Index)** as a deliberately minimal correction: keep RI's fixed-*k* pooled construction, but weight each typed neighbour by `wᵢⱼ = exp(−dᵢⱼ/τ)`, with τ set per model to the median distance among typed neighbours.

The correction turns out to be **modest**. On Camelyon, Δ = MaRI − RI stays within ±0.07 for every encoder and rankings are nearly unchanged (Spearman ρ = 0.99); on TCGA-4×4 and Tolkach-ESCA, Δ stays within ±0.04 and ρ = 0.99 and 0.98. Only a median **4.6%** of contributing samples (at most 10.6% for any encoder) have neighbourhoods containing *both* SO and OS neighbours, and within those the corrections point in either direction and cancel when pooled.

This is the paper's sharpest structural argument: because MaRI barely departs from RI even where support is near-complete, **the limiting factor is the fixed-*k* pooled design itself, not the absence of distance information**. MaRI exists to be a negative result.

## What CRoMa measures

CRoMa drops the fixed neighbourhood entirely. For each sample it searches outward to the *m* nearest neighbours of each type and compares their mean cosine distances:

```
CRoMaₘ(i) = ( d̄ᵐ_OS(i) − d̄ᵐ_SO(i) ) / ( d̄ᵐ_OS(i) + d̄ᵐ_SO(i) )
```

Properties that matter:

- **Signed and bounded in (−1, 1).** Positive = same-confounder distractors sit farther away than cross-confounder biological matches, i.e. biology-dominant local geometry. Negative = confounder-dominant.
- **Defined for every sample**, provided at least *m* neighbours of each type exist in the evaluation set — a condition of the *benchmark's label composition*, never of the model. Every encoder is therefore scored on exactly the same population, which is the direct fix for RI's third limitation. On all benchmarks used here that population is the full cohort.
- **Scale-free.** It depends on the ratio d̄_OS/d̄_SO, not on absolute distances, so a model is not rewarded for embedding everything farther apart. A median CRoMa of 0.7 means the nearest same-confounder distractors are roughly 5.7× farther than the nearest cross-confounder biological matches.
- ***m* is fixed a priori** at 5 and used unchanged across all models and datasets — unlike *k*, which is re-tuned per model and per benchmark.

The distribution of per-sample margins is the intended readout. It is summarised along three axes: the **median** (central tendency), **F(≤0)** (the fraction of non-positive margins — prevalence of failure), and **LTM10** (the mean of the worst decile — severity of failure).

## Benchmarks

| Benchmark | Level | Biological label (#classes) | Confounder (#) | Samples |
|---|---|---|---|---|
| Camelyon | tile | breast lymph node: tumour / normal (2) | medical centre (2) | 20,400 tiles |
| TCGA-4×4 | tile | cancer type (4) | medical centre (4) | 5,760 tiles |
| Tolkach-ESCA | tile | oesophageal tissue (6) | medical centre (3) | 9,000 tiles |
| PCaBiop | slide | prostate: benign / cancer (2) | medical centre (2) | 1,000 slides |

The three tile benchmarks are taken unchanged from PathoROB. **PCaBiop is this paper's own contribution** — prostate biopsies sourced from the PANDA challenge with the PAR cohort as an external out-of-domain set, built because slide-level encoder robustness had not previously been measured. Camelyon is used as the primary benchmark because it is the largest tile cohort, spans the widest robustness range, is largely absent from disclosed pretraining corpora, and is the benchmark on which fixed-*k* support is weakest.

## What the evaluation found

**Twenty tile-level encoders**, plus DINOv2-B as a natural-image control. The headline is that biology and centre are *both* almost perfectly recoverable from every model: on Camelyon a k-NN probe reads the biological label at 0.93–0.99 balanced accuracy and the acquisition centre at 0.91–1.00. What separates a robust representation from a shortcut-prone one is therefore not whether each signal is present but **which one wins when they compete**.

- **Median CRoMa on Camelyon ranged from −0.44 to 0.20.** Thirteen of the 20 encoders had positive medians; seven were confounder-dominant for the typical sample. Highest: Virchow2 and CONCH (both 0.20), then GenBio-PathFM (0.19), CONCHv1.5 (0.19), H0-mini (0.17), Virchow (0.16). Lowest: Hibou-L (−0.44), Prost40M (−0.32), Phikon-v2 (−0.21), Phikon (−0.20).
- **No encoder is uniformly robust.** Every one of the 20 retains a confounder-dominated lower tail (LTM10 < 0), and this holds on all three tile benchmarks even where the typical sample is comfortably robust. The non-positive fraction ranges from 12.9% (Virchow2) to 99.3% (Hibou-L).
- **Median and tail are partly independent.** CONCH matches Virchow2 at the median (0.20) but has more non-positive margins (22.5% vs 12.9%) and a more severe tail (LTM10 −0.20 vs −0.11). Model selection is therefore a Pareto problem, not a single-score ranking: only **Virchow2 and GenBio-PathFM** lie on the Camelyon median–tail frontier, and after aggregating ranks across all three tile benchmarks only four encoders remain undominated — **CONCH, GenBio-PathFM, CONCHv1.5 and H-optimus-1** — with none leading on both axes.
- **Rankings are consistent across benchmarks** (pairwise Spearman ρ ∈ [0.88, 0.92]). The CONCH family and GenBio-PathFM were consistently top-five; Prost40M, Hibou-B and the Phikon models consistently near the bottom.
- **What actually predicts the margin is centre decodability.** Biological k-NN accuracy explains the CRoMa spread only weakly (ρ = 0.56), but the balanced accuracy with which a probe recovers the *centre* rank-predicts median CRoMa almost perfectly (ρ = −0.94). RI and MaRI track it just as well (−0.95, −0.94) — so as *model-level ranking statistics* all three largely recapitulate the same thing. CRoMa's advantage is the per-sample distribution, not a different model ordering.
- **Midnight-12k is the instructive exception**: seventh on Camelyon (0.11) but first on both TCGA-4×4 (0.40) and Tolkach-ESCA (0.58). Because it was pretrained exclusively on TCGA, the authors flag possible pretraining–benchmark overlap and note a provenance analysis supports it — while conceding overlap alone does not explain it, since other TCGA-pretrained models show no comparable advantage.

## Slide-level encoders

Four whole-slide encoders on PCaBiop (1,000 prostate biopsies, two centres). The contributing centre stayed near-perfectly decodable for all four; median margins spanned −0.41 to 0.26, and **only PRISM was biology-dominant** (0.26). MOOZY reached the highest biological accuracy yet a slightly negative median margin. On **PCaBiop-ISUP** — 3,000 biopsies balanced across six ISUP grade groups — *every* encoder became confounder-dominant, with medians from −0.47 to −0.09, though the authors caution that cohort and design differences prevent attributing that shift to label granularity alone.

## Does the margin predict downstream failure?

This is the claim that makes the metric useful rather than merely tidy. The authors ran PathoROB's confounder-biased linear-probe sweep, increasing the confounder–biology correlation from Cramér's V = 0 to V = 1 while holding total training size and marginal frequencies fixed.

They also replace PathoROB's **APD (average performance drop)** with **nIPD (normalised integrated performance degradation)**, on a fair objection: APD normalises by total baseline accuracy including the chance-level component that cannot be lost, so a fall from 0.60 to chance (0.50) and a fall from 0.95 to 0.792 both register as ≈ −16.7% — although the first destroys *all* above-chance performance and the second only 35.2% of it. nIPD normalises by above-chance headroom instead.

Higher median CRoMa was associated with smaller shortcut-induced degradation on every benchmark, strongest in-domain (**ρ = 0.88, 0.93, 0.93** for Camelyon, TCGA-4×4 and Tolkach-ESCA) and weaker out-of-domain (0.64, 0.85, 0.77) — expected, since OOD degradation mixes shortcut reliance with transfer to unseen centres. Where they are defined, RI and MaRI showed comparable in-domain associations (0.86–0.92 and 0.85–0.91). The same qualitative conclusion held at slide level on PCaBiop, where Prov-GigaPath also illustrates APD's headroom flaw: its OOD balanced accuracy at V = 0 was only 0.548, so APD recorded −1.2% where nIPD recorded −10.7%.

## Limitations the authors state

- **CRoMa needs confounder labels.** It measures geometry induced by a factor you have already named; it cannot discover confounders that were not specified in advance.
- **Centre is treated as the sole confounder.** The construction accepts any labelled factor — scanner, staining batch, fixation protocol — but multi-factor and continuous confounders are untested, and a centre label in practice bundles several such sources into one.
- **The study compares models, not samples within one model.** The proposed diagnostic use — interrogating low-margin samples of a single model for enrichment of particular subclasses, institutions or patient characteristics — is described as the most direct extension of the work, not something demonstrated here.

## Reading it critically

Two things are worth holding in mind. First, this is a **v4 preprint that proposes its own replacement metric and evaluates it favourably**; the metric it displaces is the centrepiece of a peer-reviewed Nature Communications paper. Second — and the authors are candid about this — CRoMa, RI and MaRI produce *broadly the same model ranking* (ρ = 0.93–0.95), and all three largely recapitulate how decodable the medical centre is. The argument for CRoMa is not that it reorders the leaderboard; it is that a per-sample margin is defined everywhere, so the lower tail and its structure become visible at all. Whether that visibility changes a practical decision is the open question.

Worth noting too that the two papers evaluate **20 tile encoders each but not the same 20** — only 12 models are common to both (CONCH, CONCHv1.5, H0-mini, H-optimus-0, MUSK, Phikon, Phikon-v2, Prov-GigaPath, UNI, UNI2-h, Virchow, Virchow2). This preprint adds GenBio-PathFM, GPFM, H-optimus-1, Hibou-B, Hibou-L, Midnight-12k, Prost40M and mSTAR; the Nature Communications panel instead carries Atlas, Ciga, CTransPath, HIPT, Kaiko ViT-B/8, Kang-DINO, RetCCL and RudolfV. Any statement of the form "both papers rank model X the same way" needs checking against that overlap first.

What survives regardless of which metric you prefer is the finding both papers reach independently: **every pathology foundation model tested retains samples whose local geometry is dominated by the laboratory rather than the tissue.**

## The published numbers are already a snapshot

The reference implementation is a maintained library, not a code drop, and its committed results have outgrown the manuscript: the leaderboard on the project's documentation site covers **25 pathology encoders plus the DINOv2-B control**, against the paper's 20 plus control. Five encoders absent from the paper — Mascaret, Phaet and three RudolfV-2 variants — now appear, and **Mascaret currently leads the cross-benchmark Pareto ranking**, a model this paper never evaluated. Read the paper for the method and the argument; read the site for the current standings. They are not the same table. Details are in the accompanying [CRoMa](../computational-digital-and-mathematical-pathology/croma.md) note.

## Publication details

- **Preprint:** arXiv:2607.25497v4 [cs.CV], cross-listed cs.AI. Four versions; v1 submitted 28 July 2026, v4 (current) 21 August 2026. No journal reference — the Comments field reads simply "Preprint".
- **DOI:** [10.48550/arXiv.2607.25497](https://doi.org/10.48550/arXiv.2607.25497). **Licence:** CC BY-SA 4.0.
- **Authors:** Clément Grisi, Jeroen van der Laak, Geert Litjens — Department of Pathology, Radboud University Medical Center, Nijmegen, The Netherlands. Corresponding author: clement.grisi@radboudumc.nl. Funded by ERC Starting Grant AIS-CaP (no. 101041730) to G. Litjens.
- **Code:** metric implementations and evaluation manifests are released as an open-source Python package, `croma`, at [github.com/clemsgrs/croma](https://github.com/clemsgrs/croma) (Apache-2.0), with an interactive results site at [clemsgrs.github.io/croma](https://clemsgrs.github.io/croma/).
- **Data:** all benchmarks derive from public data. Camelyon, TCGA-4×4 and Tolkach-ESCA follow the PathoROB protocol; PCaBiop uses PANDA prostate biopsies with the PAR cohort (324 biopsies from an under-represented Middle Eastern population) as external test set, released at [huggingface.co/datasets/waticlems/pcabiop](https://huggingface.co/datasets/waticlems/pcabiop).
