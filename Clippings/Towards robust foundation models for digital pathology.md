---
type: Clipping
status: Evergreen
language: en
title: "Towards robust foundation models for digital pathology"
source: "https://www.nature.com/articles/s41467-026-73923-2"
source_type: article
author:
  - "[[Jonah Kömen]]"
  - "[[Edwin D. de Jong]]"
  - "[[Julius Hense]]"
  - "[[Hannah Marienwald]]"
  - "[[Jonas Dippel]]"
  - "[[Philip Naumann]]"
  - "[[Eric Marcus]]"
  - "[[Lukas Ruff]]"
  - "[[Maximilian Alber]]"
  - "[[Jonas Teuwen]]"
  - "[[Frederick Klauschen]]"
  - "[[Klaus-Robert Müller]]"
published: 2026-06-11
created: 2026-08-31
description: "Biomedical Foundation Models (FMs) are transforming AI-enabled healthcare research and entering clinical validation. However, their susceptibility to learning non-biological features — including variations in laboratory procedures and scanner hardware — poses risks for clinical deployment. We introduce PathoROB, a public benchmark quantifying FM robustness to non-biological features. Representation-level robustness is assessed using the robustness index, while output-level robustness is evaluated across clinically relevant settings, including patch- and slide-level prediction, case retrieval, and clustering tasks. Our experiments reveal robustness deficits across all 20 evaluated FMs, with substantial differences between them. We find that non-robust FM representations can cause major diagnostic downstream errors preventing safe clinical adoption. Using more robust FMs, vision-language alignment, and post-hoc robustification reduces (but does not yet eliminate) the risk of such errors. This work establishes that robustness evaluation is essential for validating pathology FMs before clinical adoption and provides a blueprint for assessing and improving robustness across biomedical domains."
tags:
  - "clippings"
order: 100
belongs_to: "[[Clippings]]"
related_to:
  - "[[A distributional robustness margin for pathology foundation models]]"
  - "[[Digital Pathology]]"
  - "[[Hugging Face Digital Pathology]]"
  - "[[Machine Learning]]"
  - "[[Image Analysis]]"
---
## Summary

A pathology foundation model is supposed to encode what is *in* the tissue. This paper measures how much of what it actually encodes is the hospital that produced the slide — staining protocol, section thickness, fixation, scanner — and then demonstrates, with clinical tasks and real slides, what goes wrong when a downstream model reads that signature instead of the morphology.

The contribution is **PathoROB**, a public benchmark for foundation-model robustness to non-biological variation, applied to **20 pathology foundation models**. The finding is uncomfortable and uniform: robustness deficits in every model tested, large differences between them, and downstream failures severe enough that the authors argue robustness evaluation must precede clinical adoption.

> The abstract quoted in the frontmatter is the paper's own, verbatim. The sections below digest the paper's headings, metrics and reported figures in my own words; the full text, figures, methods and supplementary notes are in the source, which is open access.

## What PathoROB is

Four multi-class, multi-centre histopathology datasets drawn from three public sources, each deliberately constructed so that biological signal and medical-centre signal can be told apart:

- **99,392 patches**
- **28 biological classes**
- **34 medical centres**

The constituent cohorts are Camelyon (breast lymph node, tumour vs normal), TCGA (cancer-type subtyping, including a LUAD/LUSC configuration), and Tolkach-ESCA (oesophageal tissue compartments). Benchmark code is BSD-3-Clause; the processed data are on Hugging Face.

## Three metrics

The paper separates **representation-level** robustness (what the frozen embedding space looks like) from **output-level** robustness (what happens to models built on top of it).

**1. The robustness index.** For each sample, take its *k* nearest neighbours and count two types: **SO** (Same biological class, Other confounding class) and **OS** (Other biological class, Same confounding class).

```
R = |SO| / (|SO| + |OS|)
```

R = 1 means local neighbourhoods are defined entirely by biology; R = 0 means entirely by the medical centre. This four-way SO/SS/OS/OO typing is the construct that the later CRoMa work builds on and argues against.

**2. Confounder insensitivity**, which measures only how strongly representations encode the confounder — the narrower, more common notion of "robustness". The authors report it and then largely set it aside, because it correlates only marginally with output-level robustness (ρ = −0.06 in-domain / 0.39 out-of-domain against average performance drop). That negative result is part of the argument for the robustness index.

**3. Average performance drop (APD)** and **a clustering score** running from −1 (clusters driven purely by medical centre) to +1 (purely biological).

## Representation-level findings

- **The medical centre is legible in every model.** It can be predicted from the feature vectors with **88–98% mean accuracy** across three datasets — a capability the authors describe bluntly as "medically useless and potentially harmful". A t-SNE of Phikon-v2 is organised by centre at the top level; Virchow2's splits first by biology, with centre as secondary structure.
- **Robustness index averaged over all datasets ranged 0.446–0.861** — meaning roughly **55.4% down to 13.9%** of local neighbourhoods were defined by the medical centre rather than by biology. No model came close to a perfect score at any neighbourhood size *k*.
- **Who does well.** Image/text models (CONCH, CONCHv1.5) and recent large-scale SSL models (Virchow2, Atlas, H-optimus-0) rank higher. Smaller models trained primarily on TCGA rank lower: Ciga, Phikon, Phikon-v2, RudolfV, Kang-DINO, CTransPath.
- **Accuracy and robustness are different axes.** They correlate only weakly (ρ = 0.549). Only **two of the twenty models are Pareto-optimal on accuracy versus robustness: Virchow2 and Atlas.** More pointedly, models with *better* biological prediction performance tended to encode the medical centre *more* strongly.
- **Language supervision appears to help.** The three image/text models (CONCH, CONCHv1.5, MUSK) trailed the best vision-only models on raw accuracy but were considerably more robust than vision-only models of comparable accuracy — consistent with captions carrying biological rather than technical content.
- **Scale helps too, but not enough.** Among SSL-only models there is a strong correlation between the log number of pretraining slides and the robustness index (ρ = 0.692, p = 0.0047) — yet no model approached a perfect score.

## What goes wrong downstream

The experimental design is the strong part of the paper. Shallow downstream models are trained on the frozen representations with the correlation between medical centre and biological label increased step by step (Cramér's V from 0 to 1), holding everything else fixed, then evaluated in-domain and on unseen centres.

**Patch-level ROI classification.** On Camelyon, where centre differences are visually strong, tumour-detection accuracy fell from **> 92%** with balanced training data to **53–87%** with fully correlated data — for every foundation model. Drops were milder where centre differences are subtler but the authors call them still unacceptable for clinical use (TCGA −1% to −25%, mean −12%; Tolkach-ESCA −0% to −14%, mean −5%). The average performance drop correlated strongly with the robustness index (ρ = 0.904 in-domain, 0.798 out-of-domain). The mechanism, from a feature-space analysis: centre information sits along the directions of greatest variance, which is exactly where a downstream model finds it easiest to use.

**The concrete diagnostic failure.** This is the result worth remembering. With fully correlated training data, on the in-domain test set:

- between **28%** (Atlas, Virchow2) and **94%** (Phikon-v2) of *normal* patches from RUMC were called tumour;
- between **19%** (Virchow) and **99%** (HIPT) of *tumour* patches from UMCU were missed or misclassified.

A morphologically unequivocal tumour patch was called normal on the basis of which hospital it came from. On held-out whole slides, downstream models built on lower-robustness representations (UNI2-h, Phikon-v2) failed to highlight the tumour regions at all, while Virchow2 and CONCH still recovered them.

**Slide-level MIL.** Attention-based MIL models across four clinically meaningful tasks — Camelyon tumour detection, NSCLC subtyping, breast HRD biomarker prediction, breast overall survival. Cross-hospital generalisation degraded almost always, and **on fully correlated Camelyon data every foundation model fell to near-random (AUC 0.47–0.60), including the most robust ones (Virchow2, CONCHv1.5)** — a steeper collapse than at patch level. Variance across unseen centres rose with correlation in three of four tasks.

The survival result is the most counter-intuitive: adding training data from new hospitals whose label distributions diverged **decreased** generalisation for four of six models (C-index 0.576 → 0.556) *despite supplying 67% more data*. More data from more centres is not automatically better.

**Clustering and retrieval.** Samples cluster by centre rather than morphology, which undercuts the use of embeddings for discovering new patterns or subtypes. Earlier models (Ciga, HIPT, CTransPath, Phikon) were most susceptible; Atlas, CONCHv1.5 and CONCH scored highest. Virchow2 is a notable exception — strong on the robustness index but with clustering heavily influenced by centre, showing that good *local* neighbourhood structure does not guarantee good *global* organisation. Retrieval degraded more gently than supervised prediction, but multi-site retrieval is unreliable unless the database is balanced across centres.

## Can it be fixed without retraining?

The authors test three routes that leave the foundation model itself untouched:

| Route | Method tested | Effect on robustness index | Effect on downstream generalisation |
|---|---|---|---|
| **Data robustification (DR)** — clean the images | Reinhard stain normalisation | **+19.1%** on average | **+1.11 %pt** on average (max +3.28) |
| **Representation robustification (RR)** — clean the features | ComBat batch correction | **+28.2%** on average | inconsistent, sometimes **worse** |
| **Training robustification (TR)** — stop the head using it | Domain-adversarial training (DANN) | — | +0.23 %pt on average; helped only **12 of 20** models |

Combining DR and RR produced the most robust representations (robustness index ≥ 0.915 for Virchow2, Atlas, UNI2-h), with the biggest gains for the initially worst models (Phikon +70.3% relative). ComBat rescued Phikon-v2's Camelyon clustering score from **−0.99** — clustering purely by centre — to **+0.61**. Reinhard plus DANN gave the best downstream improvement (+1.30 %pt on average).

**The important negative result:** ComBat substantially improved the robustness index yet did **not** consistently improve downstream models, and sometimes made the performance drop worse. The authors' reading is that it removes genuine biological signal when that signal is strongly correlated with centre — so it can only be expected to work when every centre contributes across the full range of biology. This is also a caution about the metric: a representation can be optimised toward a better robustness index without becoming a better representation.

Overall: robustification **reduces but does not eliminate** the risk. None of these routes closes the gap.

## What the paper actually licenses you to conclude

The authors' own framing is that robustness evaluation is a prerequisite for clinical validation of pathology foundation models, and that PathoROB is a blueprint transferable to other biomedical domains where batch effects bite (radiology, molecular biology, single-cell genomics).

Two cautions worth carrying:

- The failure demonstrations are **engineered**. Confounder–biology correlation is deliberately dialled up to Cramér's V = 1, which is a worst case rather than a typical one. What the experiments establish is the *mechanism* and the ordering of models under stress — not an error rate you should expect in routine practice.
- **The robustness index is itself contested.** A subsequent preprint from Radboud UMC argues that its fixed-*k*, pooled, count-based construction discards geometry, defines no per-sample score, and silently excludes anchors whose fixed-*k* neighbourhood contains no typed neighbour — so different models can be scored on different effective subsets of the same cohort. On PathoROB's own Camelyon cohort that exclusion is severe: fewer than half the samples contribute for every encoder, and fewer than a quarter for more than half of them. That work proposes a per-sample margin (CRoMa) instead and evaluates it on PathoROB's own tile benchmarks and protocol. The criticism is structural rather than empirical — the two metrics produce broadly the same model ranking (Spearman ρ ≈ 0.95) — and the two papers reach the same headline conclusion by different routes: no pathology foundation model is uniformly robust to the centre that produced the slide.

One caution when comparing the two: **both evaluate 20 tile encoders, but not the same 20.** Only 12 are common to both. This panel uniquely includes Atlas, Ciga, CTransPath, HIPT, Kaiko ViT-B/8, Kang-DINO, RetCCL and RudolfV — several of them older models that anchor the low end of the robustness range and are absent from the CRoMa study.

## Publication details

- **Journal:** Nature Communications 17, 5218 (2026). Open access. Subjects: cancer imaging; medical imaging; pathology.
- **DOI:** [10.1038/s41467-026-73923-2](https://doi.org/10.1038/s41467-026-73923-2)
- **Received:** 24 July 2025. **Accepted:** 18 May 2026. **Published:** 11 June 2026.
- **Licence:** CC BY-NC-ND 4.0 — note the **ND**: the article may be shared verbatim for non-commercial purposes with attribution, but the licence does not grant permission to share adapted material derived from it.
- **Equal contribution:** Jonah Kömen, Edwin D. de Jong and Julius Hense. **Corresponding authors:** Edwin D. de Jong, Frederick Klauschen, Klaus-Robert Müller.
- **Affiliations:** BIFOLD and the Machine Learning Group, TU Berlin; Aignostics GmbH; Netherlands Cancer Institute / Antoni van Leeuwenhoek; Institute of Pathology, Charité Universitätsmedizin Berlin; Institute of Pathology, LMU Munich; DKFZ Heidelberg and DKTK; Bavarian Center for Cancer Research; Korea University; Max Planck Institute for Informatics.
- **Code:** PathoROB at [github.com/bifold-pathomics/PathoROB](https://github.com/bifold-pathomics/PathoROB) (BSD-3-Clause); slide-level experiments via [xMIL](https://github.com/bifold-pathomics/xMIL) (MIT).
- **Data:** [huggingface.co/collections/bifold-pathomics/pathorob](https://huggingface.co/collections/bifold-pathomics/pathorob). Note the constituent licences differ — Camelyon is CC0, TCGA-UT is CC-BY-NC-SA 4.0, and Tolkach-ESCA is a custom non-commercial licence. RudolfV and Atlas are proprietary models and their weights are not public.
