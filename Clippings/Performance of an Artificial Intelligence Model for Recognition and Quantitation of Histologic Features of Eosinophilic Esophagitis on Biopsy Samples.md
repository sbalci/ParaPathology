---
type: Clipping
status: Developing
language: en
title: "Performance of an Artificial Intelligence Model for Recognition and Quantitation of Histologic Features of Eosinophilic Esophagitis on Biopsy Samples"
source: "https://doi.org/10.1016/j.modpat.2023.100285"
source_type: article
author:
  - "[[Luisa Ricaurte Archila]]"
  - "[[Lindsey Smith]]"
  - "[[Hanna-Kaisa Sihvo]]"
  - "[[Ville Koponen]]"
  - "[[Sarah M. Jenkins]]"
  - "[[Donnchadh M. O'Sullivan]]"
  - "[[Maria Camila Cardenas Fernandez]]"
  - "[[Yaohong Wang]]"
  - "[[Priyadharshini Sivasubramaniam]]"
  - "[[Ameya Patil]]"
  - "[[Puanani E. Hopson]]"
  - "[[Imad Absah]]"
  - "[[Karthik Ravi]]"
  - "[[Taofic Mounajjed]]"
  - "[[Evan S. Dellon]]"
  - "[[Albert J. Bredenoord]]"
  - "[[Rish Pai]]"
  - "[[Christopher P. Hartley]]"
  - "[[Rondell P. Graham]]"
  - "[[Roger K. Moreira]]"
published: 2023-07-18
created: 2026-09-14
description: "We have developed an artificial intelligence (AI)-based digital pathology model for the evaluation of histologic features related to eosinophilic esophagitis (EoE). In this study, we evaluated the performance of our AI model in a cohort of pediatric and adult patients for histologic features included in the Eosinophilic Esophagitis Histologic Scoring System (EoEHSS). We collected a total of 203 esophageal biopsy samples from patients with mucosal eosinophilia of any degree (91 adult and 112 pediatric patients) and 10 normal controls from a prospectively maintained database. All cases were assessed by a specialized gastrointestinal (GI) pathologist for features in the EoEHSS at the time of original diagnosis and rescored by a central GI pathologist (R.K.M.). We subsequently analyzed whole-slide image digital slides using a supervised AI model operating in a cloud-based, deep learning AI platform (Aiforia Technologies) for peak eosinophil count (PEC) and several histopathologic features in the EoEHSS. The correlation and interobserver agreement between the AI model and pathologists (Pearson correlation coefficient [r] = 0.89 and intraclass correlation coefficient [ICC] = 0.87 vs original pathologist; r = 0.91 and ICC = 0.83 vs central pathologist) were similar to the correlation and interobserver agreement between pathologists for PEC (r = 0.88 and ICC = 0.91) and broadly similar to those for most other histologic features in the EoEHSS. The AI model also accurately identified PEC of >15 eosinophils/high-power field by the original pathologist (area under the curve [AUC] = 0.98) and central pathologist (AUC = 0.98) and had similar AUCs for the presence of EoE-related endoscopic features to pathologists' assessment. Average eosinophils per epithelial unit area had similar performance compared to AI high-power field-based analysis. Our newly developed AI model can accurately identify, quantify, and score several of the main histopathologic features in the EoE spectrum, with agreement regarding EoEHSS scoring which was similar to that seen among GI pathologists."
tags:
  - "clippings"
order: 170
belongs_to: "[[Clippings]]"
related_to:
  - "[[Esophagus Pathology]]"
  - "[[Gastrointestinal Pathology]]"
  - "[[A Deep Learning Model of Histologic Tumor Differentiation as a Prognostic Tool in Hepatocellular Carcinoma]]"
  - "[[Image Analysis]]"
---
## Summary

An AI model, built on the Aiforia cloud deep-learning platform, that recognises and quantifies the histologic features of eosinophilic esophagitis (EoE) scored in the EoE Histologic Scoring System (EoEHSS). It was tested on biopsies from both children and adults.

For the peak eosinophil count (PEC), the number that drives the diagnosis, the model agreed with pathologists about as well as pathologists agreed with each other. It picked out PEC above 15 eosinophils per high-power field with an AUC of 0.98. For most of the other EoEHSS features, agreement was broadly in line with agreement between GI pathologists.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The full text is paywalled at the publisher and has no PubMed Central copy, so the sections below are my own-words digest of the abstract only.

## Citation

Ricaurte Archila L, Smith L, Sihvo HK, Koponen V, Jenkins SM, O'Sullivan DM, et al. Performance of an Artificial Intelligence Model for Recognition and Quantitation of Histologic Features of Eosinophilic Esophagitis on Biopsy Samples. *Mod Pathol*. 2023;36(10):100285. Epub 2023 Jul 18. doi: [10.1016/j.modpat.2023.100285](https://doi.org/10.1016/j.modpat.2023.100285). PMID: [37474003](https://pubmed.ncbi.nlm.nih.gov/37474003/).

- **Platform:** Aiforia Technologies (cloud-based, supervised deep learning)
- **Access:** paywalled; no PubMed Central copy
- **Overlap:** shares several authors (Moreira, Graham, Hartley, Patil, Smith) with the hepatocellular carcinoma differentiation model captured alongside this note.

## Study at a glance

| Item | Detail |
|---|---|
| Samples | 203 esophageal biopsies with mucosal eosinophilia of any degree (91 adult, 112 pediatric patients) and 10 normal controls, from a prospectively maintained database |
| References | The specialised GI pathologist at original diagnosis, and rescoring by a central GI pathologist |
| Readouts | PEC and several EoEHSS features on whole-slide images |

## Key findings

| Comparison (PEC) | Pearson r | ICC |
|---|---|---|
| AI vs original pathologist | 0.89 | 0.87 |
| AI vs central pathologist | 0.91 | 0.83 |
| Pathologist vs pathologist | 0.88 | 0.91 |

- **Diagnostic threshold.** AUC 0.98 for PEC > 15 eosinophils/HPF, whether the original or the central pathologist was the reference.
- **Other EoEHSS features.** Agreement was broadly similar to agreement between pathologists for most features.
- **Endoscopic correlation.** AUCs for EoE-related endoscopic features were similar to the pathologists'.
- **A different unit.** Average eosinophils per unit of epithelial area performed about as well as HPF-based counting.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Eosinophilic esophagitis* | Ricaurte Archila (Aiforia) | Peak eosinophil count | 200 WSIs | Ricaurte Archila et al. Mod Pathol. 2023 |

"200 WSIs" **approximates** the 203 biopsy samples (plus 10 normal controls) in the abstract. The slide does not explain its asterisk, which also marks the HCC model from the same group `[unverified]`.

<!-- tolaria:related:start -->

## See also

* [A Deep Learning Model of Histologic Tumor Differentiation as a Prognostic Tool in Hepatocellular Carcinoma](A%20Deep%20Learning%20Model%20of%20Histologic%20Tumor%20Differentiation%20as%20a%20Prognostic%20Tool%20in%20Hepatocellular%20Carcinoma.md)
* [Esophagus Pathology](../systemic-pathology/gastrointestinal-pathology/esophagus-pathology.md)
* [Gastrointestinal Pathology](../systemic-pathology/gastrointestinal-pathology/README.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)

<!-- tolaria:related:end -->
