---
type: Clipping
status: Developing
language: en
title: "Artificial Intelligence Enables Quantitative Assessment of Ulcerative Colitis Histology"
source: "https://doi.org/10.1016/j.modpat.2023.100124"
source_type: article
author:
  - "[[Fedaa Najdawi]]"
  - "[[Kathleen Sucipto]]"
  - "[[Pratik Mistry]]"
  - "[[Stephanie Hennek]]"
  - "[[Christina K. B. Jayson]]"
  - "[[Mary Lin]]"
  - "[[Darren Fahy]]"
  - "[[Shawn Kinsey]]"
  - "[[Ilan Wapinski]]"
  - "[[Andrew H. Beck]]"
  - "[[Murray B. Resnick]]"
  - "[[Archit Khosla]]"
  - "[[Michael G. Drage]]"
published: 2023-02-15
created: 2026-09-14
description: "Ulcerative colitis is a chronic inflammatory bowel disease that is characterized by a relapsing and remitting course. Assessment of disease activity critically informs treatment decisions. In addition to endoscopic remission, histologic remission is emerging as a treatment target and a key factor in the evaluation of disease activity and therapeutic efficacy. However, manual pathologist evaluation is semiquantitative and limited in granularity. Machine learning approaches are increasingly being developed to aid pathologists in accurate and reproducible scoring of histology, enabling precise quantitation of clinically relevant features. Here, we report the development and validation of convolutional neural network models that quantify histologic features pertinent to ulcerative colitis disease activity, directly from hematoxylin and eosin-stained whole slide images. Tissue and cell model predictions were used to generate quantitative human-interpretable features to fully characterize the histology samples. Tissue and cell predictions showed comparable agreement to pathologist annotations, and the extracted slide-level human-interpretable features demonstrated strong correlations with disease severity and pathologist-assigned Nancy histological index scores. Moreover, using a random forest classifier based on 13 human-interpretable features derived from the tissue and cell models, we were able to accurately predict Nancy histological index scores, with a weighted kappa (κ = 0.91) and Spearman correlation (⍴ = 0.89, P < .001) when compared with pathologist consensus Nancy histological index scores. We were also able to predict histologic remission, based on the absence of neutrophil extravasation, with a high accuracy of 0.97. This work demonstrates the potential of computer vision to enable a standardized and robust assessment of ulcerative colitis histopathology for translational research and improved evaluation of disease activity and prognosis."
tags:
  - "clippings"
order: 150
belongs_to: "[[Clippings]]"
related_to:
  - "[[Colon and Rectum]]"
  - "[[Gastrointestinal Pathology]]"
  - "[[A feasibility study using quantitative and interpretable histological analyses of celiac disease for automated cell type and tissue area classification]]"
  - "[[Image Analysis]]"
---
## Summary

Histologic remission is becoming a treatment target in ulcerative colitis alongside endoscopic remission. Pathologist scoring, however, is semi-quantitative and coarse.

This PathAI study develops convolutional networks that segment tissue regions and detect cells on H&E whole-slide images of colonic biopsies. Their outputs become slide-level human-interpretable features, which are then used to reproduce the Nancy Histological Index (NHI). A random forest on 13 of these features matched pathologist-consensus NHI with weighted κ 0.91 and Spearman ρ 0.89. It predicted histologic remission, defined as absence of neutrophil extravasation, with 0.97 accuracy.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The full text is paywalled at the publisher and has no PubMed Central copy, and the medRxiv preprint could not be retrieved, so the sections below are my own-words digest of the published abstract only.

## Citation

Najdawi F, Sucipto K, Mistry P, Hennek S, Jayson CKB, Lin M, et al. Artificial Intelligence Enables Quantitative Assessment of Ulcerative Colitis Histology. *Mod Pathol*. 2023;36(6):100124. Epub 2023 Feb 15. doi: [10.1016/j.modpat.2023.100124](https://doi.org/10.1016/j.modpat.2023.100124). PMID: [36841434](https://pubmed.ncbi.nlm.nih.gov/36841434/).

- **Platform:** PathAI
- **Access:** paywalled; no PubMed Central copy
- **Preprint:** medRxiv, doi: [10.1101/2022.04.28.22274339](https://doi.org/10.1101/2022.04.28.22274339). Its abstract reports different figures (κ 0.93, ρ 0.93, remission accuracy 0.94, with remission defined as resolution of active inflammation), so cite the published version.
- **Overlap:** four authors (Najdawi, Fahy, Khosla, Jayson) also wrote the celiac disease feasibility study captured alongside this note, which uses the same approach of building interpretable features from cell and tissue models.

## Approach

1. **Tissue and cell models.** Convolutional networks segment tissue regions and detect cells directly on H&E whole-slide images.
2. **Human-interpretable features.** Model outputs are summarised as slide-level quantitative features that describe each sample.
3. **Correlation.** Features are compared with disease severity and with pathologist-assigned NHI.
4. **Prediction.** A random forest on 13 features predicts NHI; histologic remission is predicted from the absence of neutrophil extravasation.

## Key findings

- **Model predictions.** Tissue and cell predictions agreed with pathologist annotations; the abstract gives no figures.
- **Feature correlations.** Slide-level features correlated strongly with disease severity and with pathologist NHI.
- **NHI prediction.** Weighted κ 0.91 and Spearman ρ 0.89 (P < .001) against pathologist consensus.
- **Histologic remission.** Accuracy 0.97.

## Dataset size

The abstract does not give one. A web search summary attributes to this paper 490 training and 147 validation slides plus 293 held-out slides from the PathAI Diagnostics laboratory, with about 38,000 tissue and 124,000 cell annotations. I could not check this against the full text `[unverified]`.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Ulcerative colitis | Najdawi (PathAI) | Neutrophils, Nancy index | 512 WSIs (334 pts) | Najdawi et al. Mod Pathol. 2023 |

"512 WSIs (334 pts)" **could not be verified**: the abstract gives no dataset size, the full text is paywalled, and the preprint could not be retrieved. It also does not match the unverified split above `[unverified]`.
