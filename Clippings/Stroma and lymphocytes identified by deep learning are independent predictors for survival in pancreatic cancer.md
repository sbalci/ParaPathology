---
type: Clipping
status: Developing
language: en
title: "Stroma and lymphocytes identified by deep learning are independent predictors for survival in pancreatic cancer"
source: "https://doi.org/10.1038/s41598-025-94362-x"
source_type: article
author:
  - "[[Xiuxiang Tan]]"
  - "[[Mika Rosin]]"
  - "[[Simone Appinger]]"
  - "[[Julia Campello Deierl]]"
  - "[[Konrad Reichel]]"
  - "[[Mariëlle Coolsen]]"
  - "[[Liselot Valkenburg-van Iersel]]"
  - "[[Judith de Vos-Geelen]]"
  - "[[Evelien J. M. de Jong]]"
  - "[[Jan Bednarsch]]"
  - "[[Bas Grootkoerkamp]]"
  - "[[Michail Doukas]]"
  - "[[Casper van Eijck]]"
  - "[[Tom Luedde]]"
  - "[[Edgar Dahl]]"
  - "[[Jakob Nikolas Kather]]"
  - "[[Shivan Sivakumar]]"
  - "[[Wolfram Trudo Knoefel]]"
  - "[[Georg Wiltberger]]"
  - "[[Ulf Peter Neumann]]"
  - "[[Lara R. Heij]]"
published: 2025-03-19
created: 2026-09-14
description: "Pancreatic ductal adenocarcinoma (PDAC) is one of the most lethal cancers known to humans. However, not all patients fare equally poor survival, and a minority of patients even survives advanced disease for months or years. Thus, there is a clinical need to search corresponding prognostic biomarkers which forecast survival on an individual basis. To dig more information and identify potential biomarkers from PDAC pathological slides, we trained a deep learning (DL) model based U-net-shaped backbone. This DL model can automatically detect tumor, stroma and lymphocytes on whole slide images (WSIs) of PDAC patients. We performed an analysis of 800 PDAC scans, categorizing stroma in percentage (SIP) and lymphocytes in percentage (LIP) into two and three categories, respectively. The presented model achieved remarkable accuracy results with a total accuracy of 94.72%, a mean intersection of union rate of 78.66%, and a mean dice coefficient of 87.74%. Survival analysis revealed that SIP-mediate and LIP-high groups correlated with enhanced median overall survival (OS) across all cohorts. These findings underscore the potential of SIP and LIP as prognostic biomarkers for PDAC and highlight the utility of DL as a tool for PDAC biomarkers detecting on WSIs."
tags:
  - "clippings"
order: 220
belongs_to: "[[Clippings]]"
related_to:
  - "[[Pancreas]]"
  - "[[Pancreatic ductal adenocarcinoma and its subtypes - 2026 WHO classification - Virchows Archiv]]"
  - "[[Image Analysis]]"
---
## Summary

Studies disagree on whether the desmoplastic stroma of pancreatic ductal adenocarcinoma (PDAC) is good or bad for the patient. Most were small and relied on manual estimates of the tumour–stroma ratio.

This multicentre study trains U-Net models to label tumour, stroma and lymphocytes on H&E whole-slide images, then applies them to 800 resected PDACs from four cohorts: Aachen, Düsseldorf, Rotterdam and TCGA. Two readouts, stroma in percentage (SIP) and lymphocytes in percentage (LIP), separated overall survival in every cohort:
- **Stroma:** the relationship was U-shaped. An intermediate stroma proportion did best; both low and high did worse.
- **Lymphocytes:** a high proportion was favourable.

In multivariable Cox models, SIP was an independent predictor in all four cohorts and LIP in three.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The sections below are my own-words digest of the abstract and the open-access full text in PubMed Central.

## Citation

Tan X, Rosin M, Appinger S, Campello Deierl J, Reichel K, Coolsen M, et al. Stroma and lymphocytes identified by deep learning are independent predictors for survival in pancreatic cancer. *Sci Rep*. 2025;15(1):9415. Published 2025 Mar 19. doi: [10.1038/s41598-025-94362-x](https://doi.org/10.1038/s41598-025-94362-x). PMID: [40108402](https://pubmed.ncbi.nlm.nih.gov/40108402/). PMCID: [PMC11923104](https://pmc.ncbi.nlm.nih.gov/articles/PMC11923104/).

- **Access:** open access, full text in PubMed Central

## Study at a glance

| Item | Detail |
|---|---|
| Slides | 800 H&E slides of resected PDAC: Aachen (244), Düsseldorf (200), Erasmus MC Rotterdam (192), TCGA (164) |
| Region of interest | Senior pathologists outlined an area containing tumour glands, lymphocytes and desmoplastic stroma in QuPath |
| Training data | 10 randomly selected WSIs per cohort, annotated for stroma, lymphocytes and tumour; more than 50,000 tiles per cohort (99 × 99 µm, 396 px at 0.25 µm/px); Macenko colour normalisation |
| Model | Modified U-Net (Keras), one model trained per cohort |
| Cut-offs | SIP: X-tile into low / intermediate / high, then low and high merged. LIP: maximally selected rank statistics into low / high |

## Key findings

- **Segmentation** (TCGA test set): accuracy 94.72%, mean IoU 78.66%, mean Dice 87.74%.
- **Intermediate stroma range.** Roughly 53–76% stroma, depending on the cohort.

| Cohort | SIP-intermediate vs low/high (median OS, months) | LIP-high vs LIP-low (median OS, months) | Intermediate stroma + high lymphocytes (median OS, months) |
|---|---|---|---|
| Aachen | 24 vs 12 | 22 vs 13 | 28 |
| Düsseldorf | 24 vs 9 | 24 vs 15 | 31 |
| Rotterdam | 27 vs 16 | 27 vs 16 | 33 |
| TCGA | 24 vs 13 | 23 vs 13 | 35 |

- **Multivariable Cox.** SIP was independent in all four cohorts; LIP in Aachen, Rotterdam and TCGA.
- **A possible explanation for the U-shape.** An exploratory deconvolution of TCGA bulk RNA-seq linked more inflammatory CAFs to better survival and more myofibroblastic CAFs to worse. The authors offer this stromal heterogeneity as a reason both extremes of stroma do badly.
- **Abstract vs Methods.** The abstract says SIP and LIP were split into "two and three categories, respectively"; the Methods describe the reverse (SIP into three groups, later merged to two; LIP into two).

## Limitations noted by the authors

- Performance may vary with image quality and slide preparation between institutions.
- Only three tissue classes were modelled; other cell populations were not identified.
- The study shows survival associations only, with no functional or multimodal data.

## Reading notes

*My own notes, not content taken from the paper.*

- The cut-offs were chosen within each cohort to maximise survival separation, and each cohort had its own model. The thresholds are data-derived and would need testing on a fixed, pre-specified cut-off.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Pancreatic ductal adenocarcinoma | Tan U-Net | Stroma %, lymphocyte % | 10 WSIs/cohort | Tan et al. Sci Rep. 2025 |

"10 WSIs/cohort" **matches** the annotated training slides; the models were then applied to all 800 slides.

<!-- tolaria:related:start -->

## See also

* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Pancreas](../systemic-pathology/pancreas.md)
* [Pancreatic ductal adenocarcinoma and its subtypes: clinical relevance of histopathology and molecular characterization, integrating the key updates of the 2026 WHO classification](Pancreatic%20ductal%20adenocarcinoma%20and%20its%20subtypes%20-%202026%20WHO%20classification%20-%20Virchows%20Archiv.md)

<!-- tolaria:related:end -->
