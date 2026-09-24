---
type: Clipping
status: Developing
language: en
title: "A Deep Learning Model of Histologic Tumor Differentiation as a Prognostic Tool in Hepatocellular Carcinoma"
source: "https://doi.org/10.1016/j.modpat.2025.100747"
source_type: article
author:
  - "[[Ameya Patil]]"
  - "[[Bashar Hasan]]"
  - "[[Byoung Uk Park]]"
  - "[[Lindsey Smith]]"
  - "[[Priya Sivasubramaniam]]"
  - "[[Rofyda Elhalaby]]"
  - "[[Nada Elessawy]]"
  - "[[Saadiya Nazli]]"
  - "[[Adilson DaCosta]]"
  - "[[Abdelrahman Shabaan]]"
  - "[[Andrew Cannon]]"
  - "[[Chun Lau]]"
  - "[[Christopher P. Hartley]]"
  - "[[Rondell P. Graham]]"
  - "[[Roger K. Moreira]]"
published: 2025-03-12
created: 2026-09-14
description: "Tumor differentiation represents an important driver of the biological behavior of various forms of cancer. Histologic features of tumor differentiation in hepatocellular carcinoma (HCC) include cytoarchitecture, immunohistochemistry profile, and reticulin framework. In this study, we evaluate the performance of an artificial intelligence (AI)-based model in quantifying features of HCC tumor differentiation and predicting cancer-related outcomes. We developed a supervised AI model using a cloud-based, deep learning platform to quantify histologic features of HCC differentiation, including various morphologic parameters (nuclear density, area, circularity, chromatin pattern, and pleomorphism), mitotic figures, immunohistochemistry markers (HepPar 1 and glypican-3), and reticulin expression. We applied this AI model to patients undergoing HCC curative resection and assessed whether AI-based features added value to standard clinical and pathologic data in predicting HCC-related outcomes. Ninety-nine HCC resection specimens were included. Three AI-based histologic variables were most relevant to HCC prognostic assessment: (1) percentage of tumor occupied by neoplastic nuclei (nuclear area percent), (2) quantitative reticulin expression in the tumor, and (3) HepPar 1 low (ie, expressed in <50% of the tumor)/glypican-3-positive immunophenotype. Statistical models that included these AI-based variables outperformed models with combined clinical pathologic features for overall survival (C-indexes of 0.81 vs 0.68), disease-free survival (C-indexes of 0.73 vs 0.68), metastasis (C-indexes of 0.78 vs 0.65), and local recurrence (C-indexes of 0.72 vs 0.68) for all cases, with similar results in the subgroup analysis of World Health Organization grade 2 HCCs. Our AI model serves as a proof of concept that HCC differentiation can be objectively quantified digitally by assessing a combination of biologically relevant histopathologic features. In addition, several AI-derived features were independently predictive of HCC-related outcomes in our study population, most notably nuclear area percent, hepar-low/glypican-3-negative phenotype, and decreasing levels of reticulin expression, highlighting the relevance of quantitative analysis of tumor differentiation features in this context."
tags:
  - "clippings"
order: 200
belongs_to: "[[Clippings]]"
related_to:
  - "[[Liver Pathology]]"
  - "[[Performance of an Artificial Intelligence Model for Recognition and Quantitation of Histologic Features of Eosinophilic Esophagitis on Biopsy Samples]]"
  - "[[Immunohistochemistry Quantification]]"
  - "[[Image Analysis]]"
---
## Summary

Differentiation in hepatocellular carcinoma (HCC) is graded by eye from cytoarchitecture, immunophenotype and the reticulin framework. This study builds a supervised deep-learning model on a cloud-based platform to measure those features digitally. It then asks whether the measurements add prognostic value to standard clinical and pathologic data in 99 resected HCCs.

The features measured are nuclear morphology, mitotic figures, HepPar 1 and glypican-3 expression, and reticulin. Statistical models that included the AI-derived features beat clinicopathologic models for overall survival, disease-free survival, metastasis and local recurrence. The authors present it as proof of concept that differentiation can be quantified objectively.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The full text is paywalled at the publisher and has no PubMed Central copy, so the sections below are my own-words digest of the abstract only.

## Citation

Patil A, Hasan B, Park BU, Smith L, Sivasubramaniam P, Elhalaby R, et al. A Deep Learning Model of Histologic Tumor Differentiation as a Prognostic Tool in Hepatocellular Carcinoma. *Mod Pathol*. 2025;38(7):100747. Epub 2025 Mar 12. doi: [10.1016/j.modpat.2025.100747](https://doi.org/10.1016/j.modpat.2025.100747). PMID: [40086592](https://pubmed.ncbi.nlm.nih.gov/40086592/).

- **Platform:** described in the abstract only as "a cloud-based, deep learning platform"; the lecture slide names Aiforia `[unverified]`
- **Access:** paywalled; no PubMed Central copy
- **Overlap:** shares several authors (Moreira, Graham, Hartley, Smith) with the eosinophilic esophagitis model captured alongside this note.

## Study at a glance

| Item | Detail |
|---|---|
| Specimens | 99 HCC curative resections |
| Morphology | Nuclear density, area, circularity, chromatin pattern, pleomorphism |
| Other features | Mitotic figures; HepPar 1 and glypican-3 immunohistochemistry; reticulin expression |
| Outcomes | Overall survival, disease-free survival, metastasis, local recurrence |
| Subgroup | WHO grade 2 HCCs |

## Key findings

- **The three variables that mattered most:**
  - nuclear area percent (the share of tumour occupied by neoplastic nuclei)
  - quantitative reticulin expression
  - a HepPar 1-low (expressed in under 50% of the tumour) / glypican-3 immunophenotype
- **Prognostic performance (C-index)**, with similar results in the WHO grade 2 subgroup:

| Outcome | Models with AI variables | Clinicopathologic models |
|---|---|---|
| Overall survival | 0.81 | 0.68 |
| Disease-free survival | 0.73 | 0.68 |
| Metastasis | 0.78 | 0.65 |
| Local recurrence | 0.72 | 0.68 |

- **Independent predictors:** nuclear area percent, the HepPar 1-low / glypican-3 phenotype, and decreasing reticulin expression.
- **Check against the full text:** the abstract calls this phenotype glypican-3-*positive* in its results but glypican-3-*negative* in its conclusion.

## Reading notes

*My own notes, not content taken from the paper.*

- A single cohort of 99 resections carries four outcome models, so the gains in C-index would need confirming in an external cohort before the features could be treated as prognostic tools.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Hepatocellular carcinoma* | Patil model (Aiforia) | Nuclear area, mitoses, reticulin | 99 specimens | Patil et al. Mod Pathol. 2025 |

"99 specimens" **matches** the abstract. The slide does not explain its asterisk, which also marks the eosinophilic esophagitis model from the same group `[unverified]`.

<!-- tolaria:related:start -->

## See also

* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Immunohistochemistry Quantification](../stains/immunohistochemistry-quantification.md)
* [Liver Pathology](../systemic-pathology/liver-pathology/README.md)
* [Performance of an Artificial Intelligence Model for Recognition and Quantitation of Histologic Features of Eosinophilic Esophagitis on Biopsy Samples](Performance%20of%20an%20Artificial%20Intelligence%20Model%20for%20Recognition%20and%20Quantitation%20of%20Histologic%20Features%20of%20Eosinophilic%20Esophagitis%20on%20Biopsy%20Samples.md)

<!-- tolaria:related:end -->
