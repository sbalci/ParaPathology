---
type: Clipping
status: Developing
language: en
title: "Towards deep-learning based detection and quantification of intestinal metaplasia on digitized gastric biopsies: a multi-expert comparative study"
source: "https://doi.org/10.1038/s41598-025-32737-w"
source_type: article
author:
  - "[[Fabian Cano]]"
  - "[[Mauricio Caviedes]]"
  - "[[Andres Siabatto]]"
  - "[[Jesus Villarreal]]"
  - "[[Jose Quijano]]"
  - "[[Álvaro Bedoya-Urresta]]"
  - "[[Marino Coral Bedoya]]"
  - "[[Yomaira Yepez Caicedo]]"
  - "[[Angel Cruz-Roa]]"
  - "[[Fabio A. González]]"
  - "[[Satish E. Viswanath]]"
  - "[[Eduardo Romero]]"
published: 2026-02-26
created: 2026-09-14
description: "Current gastric cancer (GCa) risk systems are prone to errors since they evaluate a visual estimation of intestinal metaplasia percentages in histopathology images of gastric mucosa to assign a risk. This study presents an automated method to detect and quantify intestinal metaplasia using deep convolutional neural networks as well as a comparative analysis with visual estimations of three pathologists. Gastric samples were collected from two different cohorts: 149 asymptomatic volunteers from a region with a high prevalence of GCa in Colombia and 56 patients from a tertiary hospital. Deep learning models were trained to classify intestinal metaplasia, and predictions were used to estimate a percentage of intestinal metaplasia and to assign an adapted OLGIM stage. Atrophy was not assessed because of the limited reproducibility among pathologists. Results were compared with independent blinded metaplastic assessments performed by three graduated pathologists. The best-performing deep learning architecture classified intestinal metaplasia with F1-Score of [Formula: see text] and AUC of [Formula: see text]. Among pathologists, inter-observer agreement by a Fleiss's Kappa score ranged from 0.20 to 0.48. In comparison, agreement between the pathologists and the best-performing model ranged from 0.12 to 0.35. Deep learning models show potential to reliably detect and quantify the percentage of intestinal metaplasia, achieving high classification performance. In practice, visual estimation is still the only available method, yet it is marked by considerable inter-observer variability. Deep learning models provide consistent estimates that could help reduce this subjectivity in risk stratification."
tags:
  - "clippings"
order: 180
belongs_to: "[[Clippings]]"
related_to:
  - "[[Stomach]]"
  - "[[Gastrointestinal Pathology]]"
  - "[[Diagnosis, accuracy, interobserver and intraobserver reliability]]"
  - "[[The Gold Standard Paradox in Digital Image Analysis Manual Versus Automated Scoring as Ground Truth]]"
  - "[[Image Analysis]]"
---
## Summary

OLGIM staging of gastric cancer risk rests on a pathologist's visual estimate of how much intestinal metaplasia (IM) each of the five Sydney-protocol biopsies contains. That estimate is known to be poorly reproducible.

This Colombian study trains deep-learning models to detect IM in H&E fields of view. It turns the predictions into an IM percentage per biopsy and an adapted OLGIM stage, and compares them with blinded estimates from three pathologists. The best classifier (ConvNeXtTiny) reached F1 0.80 and AUC 0.91. The pathologists agreed with each other only fairly to moderately, and agreed even less with the model. The model's estimates were more consistent across stages and systematically lower than the pathologists'.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. PubMed renders the headline F1 and AUC as "[Formula: see text]"; the values quoted here come from the Discussion of the open-access full text in PubMed Central. The sections below are my own-words digest of the abstract and full text.

## Citation

Cano F, Caviedes M, Siabatto A, Villarreal J, Quijano J, Bedoya-Urresta Á, et al. Towards deep-learning based detection and quantification of intestinal metaplasia on digitized gastric biopsies: a multi-expert comparative study. *Sci Rep*. 2026;16(1). Published 2026 Feb 26. doi: [10.1038/s41598-025-32737-w](https://doi.org/10.1038/s41598-025-32737-w). PMID: [41741481](https://pubmed.ncbi.nlm.nih.gov/41741481/). PMCID: [PMC13009521](https://pmc.ncbi.nlm.nih.gov/articles/PMC13009521/).

- **Access:** open access, full text in PubMed Central

## Study at a glance

| Item | Detail |
|---|---|
| Cohort 1 | 149 asymptomatic volunteers aged 30–70 from a high-prevalence region of Colombia, split into 73 training, 32 validation and 44 internal-test cases |
| Cohort 2 | 56 symptomatic patients from a tertiary hospital, used only as an external test set |
| Slides | 205 WSIs (149 + 56 cases), each case comprising the five Updated Sydney System biopsies |
| Gland finding | U-Net (ResNet18) pre-trained on colon glands (GlaS) and fine-tuned on 2,434 annotated gastric glands; glandular regions gridded into fields of view |
| Fields of view | 476,351 in total |
| Classifiers compared | ResNet50, DenseNet121 and ConvNeXtTiny (ImageNet-pretrained), and the UNI2-h foundation model as a feature extractor |
| Scoring | IM % per biopsy → four-tier score (0; 1–30; 31–60; > 60%) → antrum and corpus means → adapted OLGIM stage (0–II low, III–IV high risk). Atrophy was not assessed |
| References | IM regions annotated by the most experienced pathologist; independent blinded estimates from three pathologists |

## Key findings

- **Classification.** ConvNeXtTiny performed best (F1 0.80, AUC 0.91). The UNI2-h foundation model performed worst.
- **Pathologist agreement.** Fleiss' κ was 0.31 in the antrum and 0.41 in the corpus, with pairwise Cohen's κ from 0.20 to 0.48. The abstract attributes the 0.20–0.48 range to Fleiss' kappa, but the full text makes clear it is the pairwise range.
- **Model vs pathologists.** κ 0.12–0.35, compared in 10% bins.
- **Direction of disagreement.** Pathologists tended to give higher IM percentages than the model, and their estimates varied most at intermediate OLGIM stages. The model's estimates varied less.
- **Coarser scales agree better.** Agreement improved when the comparison moved from percentages to OLGIM stage.
- **Beyond the annotations.** The model flagged metaplastic areas the expert had not annotated.

## Limitations noted by the authors

- Cross-sectional biopsies only, with no follow-up.
- Annotated regions included stroma and normal glands as well as IM, which biases the labels.
- Complete and incomplete IM were not distinguished.
- The three pathologists were recently graduated, which may partly explain the low agreement.
- Patchy, multifocal IM can be missed even by five-biopsy sampling, for both manual and automated assessment.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Gastric intestinal metaplasia | Cano CNN | % metaplasia, OLGIM | 73 cases | Cano et al. Sci Rep. 2026 |

"73 cases" **matches** the training split of cohort 1 (73 training, 32 validation, 44 test), not the full 205-case dataset.

<!-- tolaria:related:start -->

## See also

* [Diagnosis, accuracy, interobserver and intraobserver reliability](../pathology-residents-and-pathologists/diagnosis-accuracy-interobserver-and-intraobserver-reliability.md)
* [Gastrointestinal Pathology](../systemic-pathology/gastrointestinal-pathology/README.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Stomach](../systemic-pathology/gastrointestinal-pathology/stomach-biopsy.md)
* [The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth](The%20Gold%20Standard%20Paradox%20in%20Digital%20Image%20Analysis%20Manual%20Versus%20Automated%20Scoring%20as%20Ground%20Truth.md)

<!-- tolaria:related:end -->
