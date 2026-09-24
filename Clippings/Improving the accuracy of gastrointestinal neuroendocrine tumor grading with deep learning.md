---
type: Clipping
status: Developing
language: en
title: "Improving the accuracy of gastrointestinal neuroendocrine tumor grading with deep learning"
source: "https://doi.org/10.1038/s41598-020-67880-z"
source_type: article
author:
  - "[[Darshana Govind]]"
  - "[[Kuang-Yu Jen]]"
  - "[[Karen Matsukuma]]"
  - "[[Guofeng Gao]]"
  - "[[Kristin A. Olson]]"
  - "[[Dorina Gui]]"
  - "[[Gregory E. Wilding]]"
  - "[[Samuel P. Border]]"
  - "[[Pinaki Sarder]]"
published: 2020-07-06
created: 2026-09-14
description: "The Ki-67 index is an established prognostic factor in gastrointestinal neuroendocrine tumors (GI-NETs) and defines tumor grade. It is currently estimated by microscopically examining tumor tissue single-immunostained (SS) for Ki-67 and counting the number of Ki-67-positive and Ki-67-negative tumor cells within a subjectively picked hot-spot. Intraobserver variability in this procedure as well as difficulty in distinguishing tumor from non-tumor cells can lead to inaccurate Ki-67 indices and possibly incorrect tumor grades. We introduce two computational tools that utilize Ki-67 and synaptophysin double-immunostained (DS) slides to improve the accuracy of Ki-67 index quantitation in GI-NETs: (1) Synaptophysin-KI-Estimator (SKIE), a pipeline automating Ki-67 index quantitation via whole-slide image (WSI) analysis and (2) deep-SKIE, a deep learner-based approach where a Ki-67 index heatmap is generated throughout the tumor. Ki-67 indices for 50 GI-NETs were quantitated using SKIE and compared with DS slide assessments by three pathologists using a microscope and a fourth pathologist via manually ticking off each cell, the latter of which was deemed the gold standard (GS). Compared to the GS, SKIE achieved a grading accuracy of 90% and substantial agreement (linear-weighted Cohen's kappa 0.62). Using DS WSIs, deep-SKIE displayed a training, validation, and testing accuracy of 98.4%, 90.9%, and 91.0%, respectively, significantly higher than using SS WSIs. Since DS slides are not standard clinical practice, we also integrated a cycle generative adversarial network into our pipeline to transform SS into DS WSIs. The proposed methods can improve accuracy and potentially save a significant amount of time if implemented into clinical practice."
tags:
  - "clippings"
order: 190
belongs_to: "[[Clippings]]"
related_to:
  - "[[Endocrine Pathology]]"
  - "[[Gastrointestinal Pathology]]"
  - "[[Immunohistochemistry Quantification]]"
  - "[[The Gold Standard Paradox in Digital Image Analysis Manual Versus Automated Scoring as Ground Truth]]"
  - "[[Image Analysis]]"
---
## Summary

The Ki-67 index sets the grade of a gastrointestinal neuroendocrine tumour (GI-NET), but the manual method is unreliable. A pathologist picks a hot-spot by eye and counts 500–2,000 cells, or estimates by eye. On a Ki-67-only stain, proliferating non-tumour cells (endothelium, crypts, lymphocytes) are easily counted by mistake.

This UC Davis study uses a synaptophysin/Ki-67 double stain so the software can count only inside synaptophysin-positive tumour, and builds two tools on it:

- **SKIE** finds hot-spots automatically on the whole-slide image and computes the Ki-67 index there.
- **deep-SKIE** is a deep learner that paints a tile-by-tile grade heatmap across the whole tumour.

Because double staining is not routine, a cycle GAN converts ordinary Ki-67-only slides into virtual double stains.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The sections below are my own-words digest of the abstract and the open-access full text (CC BY 4.0) in PubMed Central.

## Citation

Govind D, Jen KY, Matsukuma K, Gao G, Olson KA, Gui D, et al. Improving the accuracy of gastrointestinal neuroendocrine tumor grading with deep learning. *Sci Rep*. 2020;10(1):11064. Published 2020 Jul 6. doi: [10.1038/s41598-020-67880-z](https://doi.org/10.1038/s41598-020-67880-z). PMID: [32632119](https://pubmed.ncbi.nlm.nih.gov/32632119/). PMCID: [PMC7338406](https://pmc.ncbi.nlm.nih.gov/articles/PMC7338406/).

- **Models:** SKIE (Synaptophysin-Ki-67 Index Estimator) and deep-SKIE
- **Access:** open access, CC BY 4.0

## Study at a glance

| Item | Detail |
|---|---|
| Cases | 50 GI-NETs, grade 1 and 2 only (Ki-67 ≥ 20% excluded) |
| Stains | Synaptophysin (Permanent Red) / Ki-67 (DAB) double stain, with adjacent Ki-67-only and H&E sections; Aperio AT2 at 20× |
| Gold standard | A fourth pathologist exhaustively ticking off at least 500 tumour cells in one captured hot-spot on the double-stained WSI |
| Comparators | Three GI pathologists reading the double-stained glass slides at the microscope; ImmunoRatio |
| SKIE | Registers H&E to the double stain; takes the tumour mask from the red channel; picks five candidate 500 × 500 µm hot-spots; counts Ki-67-negative nuclei on the H&E |
| deep-SKIE | Inception V3 trained and validated on 42 cases (15,232 tiles), tested on 6 cases (9,436 tiles); four classes: background, non-tumour, G1, G2 |
| Cycle GAN | Trained on about 47,000 unpaired tiles from 42 WSIs; tested on 6 hold-out WSIs |

## Key findings

- **Grade agreement.** SKIE matched the gold-standard grade in 45 of 50 cases (90%; linear-weighted κ = 0.62), with a Ki-67 index error of 0.84 ± 1.02%. With two technically flawed cases excluded, it matched 45 of 48 (93.8%).
- **The discordant cases were the algorithm's wins.** In the three remaining disagreements, SKIE had chosen a hotter hot-spot. When the gold-standard pathologist counted SKIE's hot-spots, all three were regraded from G1 to G2. Overall, SKIE chose a higher-index hot-spot than the gold-standard pathologist in 36 of 50 cases.
- **Same field, same answer.** On the gold-standard pathologist's own hot-spots, SKIE matched the grade in 48 of 50 cases (96%).
- **Pathologists vs the gold standard.** κ was 0.32, 0.67 and 0.78 for the three microscope readers.
- **Against ImmunoRatio.** SKIE had about 2.5-fold lower error, with the biggest gains where Ki-67-positive non-tumour cells were present.
- **Speed.** About 1.4 s per hot-spot, against 10–15 minutes for exhaustive manual counting.
- **deep-SKIE.** Tile accuracy on double stains was 98.4 / 90.9 / 91.0% (train / validation / test), against 95.9 / 86.9 / 84.8% on Ki-67-only stains.
- **Virtual double stains.** SKIE graded all 6 hold-out WSIs correctly (index error 1.56 ± 1.15%), and deep-SKIE reached 87.1% accuracy on them.

## Limitations noted by the authors

- SKIE treats every nucleus inside synaptophysin-positive regions as tumour, so dense intratumoral inflammation contaminates the count.
- H&E-to-double-stain registration uses manually chosen landmarks, although grade was robust to landmark variation in the cases tested.
- G3 tumours were not studied, and double staining is not standard practice.

## Reading notes

*My own notes, not content taken from the paper.*

- This is a textbook case of the gold standard paradox. The "gold standard" pathologist chose worse hot-spots than the algorithm, so a naive agreement statistic counts the algorithm's best calls as errors. Only re-examining the discordant cases showed which side was right.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| GI neuroendocrine tumor | SKIE / deep-SKIE | Ki-67 index | 42 cases | Govind et al. Sci Rep. 2020 |

"42 cases" **matches** deep-SKIE's training and validation set (and the cycle GAN's training WSIs). SKIE itself was evaluated on all 50 cases.

<!-- tolaria:related:start -->

## See also

* [Endocrine Pathology](../systemic-pathology/endocrine-pathology.md)
* [Gastrointestinal Pathology](../systemic-pathology/gastrointestinal-pathology/README.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Immunohistochemistry Quantification](../stains/immunohistochemistry-quantification.md)
* [The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth](The%20Gold%20Standard%20Paradox%20in%20Digital%20Image%20Analysis%20Manual%20Versus%20Automated%20Scoring%20as%20Ground%20Truth.md)

<!-- tolaria:related:end -->
