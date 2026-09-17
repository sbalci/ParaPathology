---
type: Clipping
status: Developing
language: en
title: "A deep-learning-based model for assessment of autoimmune hepatitis from histology: AI(H)"
source: "https://doi.org/10.1007/s00428-024-03841-5"
source_type: article
author:
  - "[[Caner Ercan]]"
  - "[[Kattayoun Kordy]]"
  - "[[Anna Knuuttila]]"
  - "[[Xiaofei Zhou]]"
  - "[[Darshan Kumar]]"
  - "[[Ville Koponen]]"
  - "[[Peter Mesenbrink]]"
  - "[[Serenella Eppenberger-Castori]]"
  - "[[Parisa Amini]]"
  - "[[Marcos C. Pedrosa]]"
  - "[[Luigi M. Terracciano]]"
published: 2024-06-15
created: 2026-09-14
description: "Histological assessment of autoimmune hepatitis (AIH) is challenging. As one of the possible results of these challenges, nonclassical features such as bile-duct injury stays understudied in AIH. We aim to develop a deep learning tool (artificial intelligence for autoimmune hepatitis [AI(H)]) that analyzes the liver biopsies and provides reproducible, quantifiable, and interpretable results directly from routine pathology slides. A total of 123 pre-treatment liver biopsies, whole-slide images with confirmed AIH diagnosis from the archives of the Institute of Pathology at University Hospital Basel, were used to train several convolutional neural network models in the Aiforia artificial intelligence (AI) platform. The performance of AI models was evaluated on independent test set slides against pathologist's manual annotations. The AI models were 99.4%, 88.0%, 83.9%, 81.7%, and 79.2% accurate (ratios of correct predictions) for tissue detection, liver microanatomy, necroinflammation features, bile duct damage detection, and portal inflammation detection, respectively, on hematoxylin and eosin-stained slides. Additionally, the immune cells model could detect and classify different immune cells (lymphocyte, plasma cell, macrophage, eosinophil, and neutrophil) with 72.4% accuracy. On Sirius red-stained slides, the test accuracies were 99.4%, 94.0%, and 87.6% for tissue detection, liver microanatomy, and fibrosis detection, respectively. Additionally, AI(H) showed bile duct injury in 81 AIH cases (68.6%). The AI models were found to be accurate and efficient in predicting various morphological components of AIH biopsies. The computational analysis of biopsy slides provides detailed spatial and density data of immune cells in AIH landscape, which is difficult by manual counting. AI(H) can aid in improving the reproducibility of AIH biopsy assessment and bring new descriptive and quantitative aspects to AIH histology."
tags:
  - "clippings"
order: 210
belongs_to: "[[Clippings]]"
related_to:
  - "[[Liver Pathology]]"
  - "[[Approach to Liver Biopsies]]"
  - "[[Image Analysis]]"
---
## Summary

Autoimmune hepatitis (AIH) has no pathognomonic lesion. Its biopsies show the elementary lesions of any chronic hepatitis, graded semi-quantitatively with poor inter-observer agreement, and non-classical features such as bile duct injury are understudied.

**AI(H)** is a stack of convolutional networks trained on the Aiforia platform. Each model targets one part of AIH histology:
- on H&E: tissue, liver microanatomy, necroinflammation, portal inflammation, immune-cell types and bile duct damage;
- on Sirius red: fibrosis.

The models were trained on pre-treatment biopsies from University Hospital Basel. Against pathologist annotations, test accuracy ranged from 72% (immune-cell classification) to 99% (tissue detection). The tool found bile duct injury in about two-thirds of AIH biopsies.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The sections below are my own-words digest of the abstract and the open-access full text in PubMed Central.

## Citation

Ercan C, Kordy K, Knuuttila A, Zhou X, Kumar D, Koponen V, et al. A deep-learning-based model for assessment of autoimmune hepatitis from histology: AI(H). *Virchows Arch*. 2024;485(6):1095–1105. Epub 2024 Jun 15. doi: [10.1007/s00428-024-03841-5](https://doi.org/10.1007/s00428-024-03841-5). PMID: [38879691](https://pubmed.ncbi.nlm.nih.gov/38879691/). PMCID: [PMC11666607](https://pmc.ncbi.nlm.nih.gov/articles/PMC11666607/).

- **Platform:** Aiforia (cloud-based, supervised deep learning)
- **Access:** open access, full text in PubMed Central

## Study at a glance

| Item | Detail |
|---|---|
| Cohort | 116 adult AIH patients (94 women, 22 men; mean age 59), Basel archive 1996–2020; 123 paired H&E and Sirius red pre-treatment slides |
| Split | Random 80/20: 99 training slides, 24 test slides |
| Annotations | Immune cells by two pathologists (7,868 immune-cell annotations in total); all other classes by one pathologist |
| Clinical grading | Ishak grading and staging by two pathologists in consensus, plus International AIH Pathology Group criteria |
| Scanner | 3DHISTECH Pannoramic SCAN II, 40× (0.24 µm/px) |

## Key findings

| Model | Stain | Test accuracy |
|---|---|---|
| Tissue detection | H&E / Sirius red | 99.4% / 99.4% |
| Liver microanatomy (portal, parenchyma, central vein) | H&E / Sirius red | 88.0% / 94.0% |
| Necroinflammation (interface hepatitis, focal and confluent necrosis) | H&E | 83.9% |
| Bile duct damage | H&E | 81.7% |
| Portal inflammation (mild / moderate / severe) | H&E | 79.2% |
| Immune cells (lymphocyte, plasma cell, macrophage, eosinophil, neutrophil) | H&E | 72.4% |
| Fibrosis | Sirius red | 87.6% (88.0% in the full-text Results) |

- **Bile duct injury** appeared in 68.6% of biopsies (81 cases). That is closer to one earlier report (72%) than to others (24%, 83%).
- **Tracking the pathologists.** AI(H) counts of focal necrosis, the extent of interface hepatitis and the moderate portal-inflammation ratio all rose in step with the pathologists' Ishak scores, and so did the densities of all five immune-cell types.
- **Toward the consensus criteria.** Fed into the International AIH Pathology Group criteria, AI(H) outputs sorted biopsies into "likely" and "possible" AIH with 88.2% agreement with the pathologist. Most errors came from overcalling interface hepatitis and from faded archival slides.
- **Other hepatitides.** Exploratory runs on a handful of drug-induced, HBV and HCV biopsies recognised the same elementary lesions, with some errors.

## Limitations noted by the authors

- Single institution, with most annotations by one pathologist. Consensus grading meant inter-observer variability could not be measured.
- Accuracy fell in heavily necroinflamed or architecturally disrupted biopsies, and immune-cell detection struggled in dense infiltrates.
- The tool is image-only: no clinical or laboratory data, and other liver diseases were excluded, so it is not a diagnostic tool.
- Fibrosis used Sirius red only. There was no elastic stain to separate recent collapse from established fibrosis.

## On the lecture slide

From a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| Autoimmune hepatitis | AI(H) (Ercan) | Immune-cell density, necrosis | 99 WSIs | Ercan et al. Virchows Arch. 2024 |

"99 WSIs" **matches** the training split (99 training, 24 test, of 123 slides).
