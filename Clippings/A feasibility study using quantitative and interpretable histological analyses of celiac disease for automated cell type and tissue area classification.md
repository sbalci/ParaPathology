---
type: Clipping
status: Developing
language: en
title: "A feasibility study using quantitative and interpretable histological analyses of celiac disease for automated cell type and tissue area classification"
source: "https://doi.org/10.1038/s41598-024-79570-1"
source_type: article
author:
  - "[[Michael Griffin]]"
  - "[[Aaron M. Gruver]]"
  - "[[Chintan Shah]]"
  - "[[Qasim Wani]]"
  - "[[Darren Fahy]]"
  - "[[Archit Khosla]]"
  - "[[Christian Kirkup]]"
  - "[[Daniel Borders]]"
  - "[[Jacqueline A. Brosnan-Cashman]]"
  - "[[Angie D. Fulford]]"
  - "[[Kelly M. Credille]]"
  - "[[Christina Jayson]]"
  - "[[Fedaa Najdawi]]"
  - "[[Klaus Gottlieb]]"
published: 2024-12-02
created: 2026-09-14
description: "Histological assessment is essential for the diagnosis and management of celiac disease. Current scoring systems, including modified Marsh (Marsh-Oberhuber) score, lack inter-pathologist agreement. To address this unmet need, we aimed to develop a fully automated, quantitative approach for histology characterisation of celiac disease. Convolutional neural network models were trained using pathologist annotations of hematoxylin and eosin-stained biopsies of celiac disease mucosa and normal duodenum to identify cells, tissue and artifact regions. Biopsies of duodenal mucosa of varying celiac disease severity, and normal duodenum were collected from a large central laboratory. Celiac disease slides (N = 318) were split into training (n = 230; 72.3%), validation (n = 60; 18.9%) and test (n = 28; 8.8%) datasets. Normal duodenum slides (N = 58) were similarly divided into training (n = 40; 69.0%), validation (n = 12; 20.7%) and test (n = 6; 10.3%) datasets. Human interpretable features were extracted and the strength of their correlation with Marsh scores were calculated using Spearman rank correlations. Our model identified cells, tissue regions and artifacts, including distinguishing intraepithelial lymphocytes and differentiating villous epithelium from crypt epithelium. Proportional area measurements representing villous atrophy negatively correlated with Marsh scores (r =  - 0.79), while measurements indicative of crypt hyperplasia positively correlated (r = 0.71). Furthermore, features distinguishing celiac disease from normal duodenum were identified. Our novel model provides an explainable and fully automated approach for histology characterisation of celiac disease that correlates with modified Marsh scores, potentially facilitating diagnosis, prognosis, clinical trials and treatment response monitoring."
tags:
  - "clippings"
order: 160
belongs_to: "[[Clippings]]"
related_to:
  - "[[Duodenal Biopsy]]"
  - "[[Gastrointestinal Pathology]]"
  - "[[Diagnosis, accuracy, interobserver and intraobserver reliability]]"
  - "[[Artificial Intelligence Enables Quantitative Assessment of Ulcerative Colitis Histology]]"
  - "[[Image Analysis]]"
---
## Summary

A feasibility study of a fully automated, interpretable model of celiac disease histology from H&E-stained duodenal biopsies. The motivation is that the modified Marsh (Marsh–Oberhuber) classification, the standard way of grading celiac mucosa, has poor agreement between pathologists.

Convolutional networks trained on pathologist annotations identify cells (separating out intraepithelial lymphocytes), tissue regions (villous versus crypt epithelium) and artifacts. Human-interpretable features built from those predictions track the Marsh score. Area measures of villous atrophy fall as Marsh rises (r = −0.79), measures of crypt hyperplasia rise with it (r = 0.71), and further features separate celiac disease from normal duodenum.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The sections below are my own-words digest of the abstract; the full text is open access in PubMed Central but was not captured here.

## Citation

Griffin M, Gruver AM, Shah C, Wani Q, Fahy D, Khosla A, et al. A feasibility study using quantitative and interpretable histological analyses of celiac disease for automated cell type and tissue area classification. *Sci Rep*. 2024;14(1):29883. Published 2024 Dec 2. doi: [10.1038/s41598-024-79570-1](https://doi.org/10.1038/s41598-024-79570-1). PMID: [39622903](https://pubmed.ncbi.nlm.nih.gov/39622903/). PMCID: [PMC11612272](https://pmc.ncbi.nlm.nih.gov/articles/PMC11612272/).

- **Access:** open access, full text in PubMed Central
- **Overlap:** four authors (Najdawi, Fahy, Khosla, Jayson) also wrote the ulcerative colitis model captured alongside this note, and both build human-interpretable features from cell and tissue models.

## Study at a glance

| Item | Detail |
|---|---|
| Source material | Duodenal biopsies of varying celiac disease severity plus normal duodenum, from a large central laboratory |
| Celiac disease slides | N = 318: training 230, validation 60, test 28 |
| Normal duodenum slides | N = 58: training 40, validation 12, test 6 |
| Models | Convolutional networks for cells, tissue regions and artifacts, trained on pathologist annotations |
| Readout | Human-interpretable features, correlated with modified Marsh scores (Spearman) |

## Key findings

- The models detected intraepithelial lymphocytes, separated villous from crypt epithelium, and flagged artifacts.
- Villous-atrophy area measures correlated negatively with Marsh score (r = −0.79); crypt-hyperplasia measures correlated positively (r = 0.71).
- Features distinguishing celiac disease from normal duodenum were identified.
- The authors frame the model as explainable and fully automated, with possible uses in diagnosis, prognosis, clinical trials and treatment-response monitoring.

## Reading notes

*My own notes, not content taken from the paper.*

- The held-out test set is small (28 celiac and 6 normal slides), which fits the "feasibility" framing.
- The model is benchmarked against the Marsh score, the very system the paper says pathologists do not agree on. The correlations are only as meaningful as that reference, the same trap the gold standard paradox describes.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Celiac disease | Griffin CNN | IEL density, villous:crypt ratio | 270 slides | Griffin et al. Sci Rep. 2024 |

"270 slides" **matches** the training split: 230 celiac + 40 normal. The full dataset was 376 slides.

<!-- tolaria:related:start -->

## See also

* [Artificial Intelligence Enables Quantitative Assessment of Ulcerative Colitis Histology](Artificial%20Intelligence%20Enables%20Quantitative%20Assessment%20of%20Ulcerative%20Colitis%20Histology.md)
* [Diagnosis, accuracy, interobserver and intraobserver reliability](../pathology-residents-and-pathologists/diagnosis-accuracy-interobserver-and-intraobserver-reliability.md)
* [Duodenal Biopsy](../systemic-pathology/gastrointestinal-pathology/duodenal-biopsy.md)
* [Gastrointestinal Pathology](../systemic-pathology/gastrointestinal-pathology/README.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)

<!-- tolaria:related:end -->
