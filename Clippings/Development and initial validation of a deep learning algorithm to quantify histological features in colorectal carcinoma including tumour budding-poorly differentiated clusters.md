---
type: Clipping
status: Developing
language: en
title: "Development and initial validation of a deep learning algorithm to quantify histological features in colorectal carcinoma including tumour budding/poorly differentiated clusters"
source: "https://doi.org/10.1111/his.14353"
source_type: article
author:
  - "[[Reetesh K. Pai]]"
  - "[[Douglas Hartman]]"
  - "[[David F. Schaeffer]]"
  - "[[Christophe Rosty]]"
  - "[[Sameer Shivji]]"
  - "[[Richard Kirsch]]"
  - "[[Rish K. Pai]]"
published: 2021-04-25
created: 2026-09-14
description: "To develop and validate a deep learning algorithm to quantify a broad spectrum of histological features in colorectal carcinoma. A deep learning algorithm was trained on haematoxylin and eosin-stained slides from tissue microarrays of colorectal carcinomas (N = 230) to segment colorectal carcinoma digitised images into 13 regions and one object. The segmentation algorithm demonstrated moderate to almost perfect agreement with interpretations by gastrointestinal pathologists, and was applied to an independent test cohort of digitised whole slides of colorectal carcinoma (N = 136). The algorithm correctly classified mucinous and high-grade tumours, and identified significant differences between mismatch repair-proficient and mismatch repair-deficient (MMRD) tumours with regard to mucin, inflammatory stroma, and tumour-infiltrating lymphocytes (TILs). A cutoff of >44.4 TILs per mm² carcinoma gave a sensitivity of 88% and a specificity of 73% in classifying MMRD carcinomas. Algorithm measures of tumour budding (TB) and poorly differentiated clusters (PDCs) outperformed TB grade derived from routine sign-out, and compared favourably with manual counts of TB/PDCs with regard to lymphatic, venous and perineural invasion. Comparable associations were seen between algorithm measures of TB/PDCs and manual counts of TB/PDCs for lymph node metastasis (all P < 0.001); however, stronger correlations were seen between the proportion of positive lymph nodes and algorithm measures of TB/PDCs. Stronger associations were also seen between distant metastasis and algorithm measures of TB/PDCs (P = 0.004) than between distant metastasis and TB (P = 0.04) and TB/PDC counts (P = 0.06). Our results highlight the potential of deep learning to identify and quantify a broad spectrum of histological features in colorectal carcinoma."
tags:
  - "clippings"
order: 140
belongs_to: "[[Clippings]]"
related_to:
  - "[[Colon Colorectal Carcinoma]]"
  - "[[Colon and Rectum]]"
  - "[[Tumor budding T-cell graphs for pT1 colorectal cancer]]"
  - "[[Image Analysis]]"
---
## Summary

Colorectal carcinoma reports depend on features graded by eye: tumour budding, poorly differentiated clusters, tumour-infiltrating lymphocytes (TILs), mucin and grade. Tumour budding in particular is laborious to count and poorly reproducible.

This study trained a deep-learning segmentation algorithm on H&E tissue microarrays to divide colorectal carcinoma images into 13 tissue regions and one object, then tested it on an independent set of whole slides. The algorithm's measures:
- separated mucinous and high-grade tumours;
- distinguished mismatch repair-deficient from mismatch repair-proficient tumours;
- produced tumour budding / poorly differentiated cluster (TB/PDC) counts that matched or beat the budding grade from routine sign-out in their association with invasion and metastasis.

This is the algorithm the same group later reported, at scale, as **QuantCRC**.

> The abstract in the `description:` frontmatter is the paper's own, verbatim, except for restoring the superscript in "mm²" that the PubMed record drops. The full text is paywalled at the publisher and has no PubMed Central copy, so the sections below are my own-words digest of the abstract only.

## Citation

Pai RK, Hartman D, Schaeffer DF, Rosty C, Shivji S, Kirsch R, Pai RK. Development and initial validation of a deep learning algorithm to quantify histological features in colorectal carcinoma including tumour budding/poorly differentiated clusters. *Histopathology*. 2021;79(3):391–405. Epub 2021 Apr 25. doi: [10.1111/his.14353](https://doi.org/10.1111/his.14353). PMID: [33590485](https://pubmed.ncbi.nlm.nih.gov/33590485/).

- **Model:** the segmentation algorithm later named QuantCRC (the name does not appear in this abstract)
- **Access:** paywalled; no PubMed Central copy

## Study at a glance

| Item | Detail |
|---|---|
| Training | H&E tissue microarrays of 230 colorectal carcinomas |
| Output | Segmentation into 13 regions and one object |
| Reference | Interpretations by gastrointestinal pathologists; agreement ranged from moderate to almost perfect |
| Test | Independent cohort of 136 whole-slide images of colorectal carcinoma |

## Key findings

- **Tumour type.** Correctly classified mucinous and high-grade tumours.
- **Mismatch repair.** Deficient and proficient tumours differed in mucin, inflammatory stroma and TILs. A cut-off of more than 44.4 TILs per mm² identified mismatch repair-deficient carcinomas with 88% sensitivity and 73% specificity.
- **Invasion.** Algorithm TB/PDC measures outperformed the budding grade from routine sign-out, and compared favourably with manual TB/PDC counts, for lymphatic, venous and perineural invasion.
- **Nodal metastasis.** Algorithm and manual counts had comparable associations (all P < 0.001), but the algorithm correlated more strongly with the *proportion* of positive nodes.
- **Distant metastasis.** The association was stronger for the algorithm's TB/PDC measure (P = 0.004) than for routine budding grade (P = 0.04) or manual TB/PDC counts (P = 0.06).

## What came next

Most of the same authors applied the algorithm, now called QuantCRC, at scale in 2022. It was run on 6,468 digitized H&E slides, recording 15 parameters per image. A recurrence-free survival model was built on an internal cohort of **1,928** CRCs and tested on 483 internal and 938 external cases. Harrell's c-index was 0.714 on the internal test and 0.744 in the external cohort, falling to 0.679 externally without QuantCRC.

Pai RK, Banerjee I, Shivji S, et al. Quantitative Pathologic Analysis of Digitized Images of Colorectal Carcinoma Improves Prediction of Recurrence-Free Survival. *Gastroenterology*. 2022;163(6):1531–1546.e8. doi: [10.1053/j.gastro.2022.08.025](https://doi.org/10.1053/j.gastro.2022.08.025). PMID: [35985511](https://pubmed.ncbi.nlm.nih.gov/35985511/). PMCID: [PMC9716432](https://pmc.ncbi.nlm.nih.gov/articles/PMC9716432/).

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Colorectal cancer | QuantCRC (Aiforia) | Tumor budding, TIL density, stroma | 559 images; 1,928 CRCs | Pai et al. Histopathology. 2021 |

The training-set figures **do not match this paper**, which trained on 230 TMA carcinomas and tested on 136 WSIs.
- **"1,928 CRCs"** matches the internal cohort of the 2022 *Gastroenterology* follow-up above.
- **"559"** appears in a secondary description of QuantCRC's training as 24,157 annotations on 1,054 images from 559 CRCs. I could not trace that to a primary source `[unverified]`; if it is right, the slide's "559 images" should read "559 CRCs".
- **"Aiforia"** comes from the slide. The 2022 follow-up lists an Aiforia co-author, but this abstract names no platform.
