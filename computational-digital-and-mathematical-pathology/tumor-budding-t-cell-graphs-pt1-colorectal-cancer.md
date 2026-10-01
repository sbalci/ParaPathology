---
type: Note
status: Evergreen
review_status: Partial
last_reviewed: 2026-09-28
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Image Analysis]]"
  - "[[Recommendations for reporting tumor budding in colorectal cancer based on the International Tumor Budding Consensus Conference (ITBCC) 2016]]"
  - "[[Distance-based evaluation of tumor budding in colorectal cancer]]"
url: https://openreview.net/forum?id=ruaXPgZCk6i
repository: https://github.com/digitalpathologybern/pT1-HBTG-MIDL2023
dataset: https://doi.org/10.5281/zenodo.7867085
aliases:
  - "Tumor budding T-cell graphs for pT1 colorectal cancer"
publish: false
---

# Tumor budding T-cell graphs for pT1 colorectal cancer

**Studer L, Bokhorst J-M, Nagtegaal I, Zlobec I, Dawson H, Fischer A.** *Tumor Budding T-cell Graphs: Assessing the Need for Resection in pT1 Colorectal Cancer Patients.* MIDL 2023; proceedings published in PMLR 227:235–259 (2024).

- Paper: [PMLR proceedings](https://proceedings.mlr.press/v227/studer24a.html) · [OpenReview forum](https://openreview.net/forum?id=ruaXPgZCk6i) · [PDF](https://openreview.net/pdf?id=ruaXPgZCk6i)
- Code: [digitalpathologybern/pT1-HBTG-MIDL2023](https://github.com/digitalpathologybern/pT1-HBTG-MIDL2023)
- Dataset: [pT1-HBTG on Zenodo](https://zenodo.org/records/7867085) (DOI 10.5281/zenodo.7867085, restricted access, CC BY-NC-SA 4.0)

## Problem

pT1 colorectal cancers invade the submucosa. The paper investigates whether risk assessment after polypectomy could reduce unnecessary additional surgery while retaining sensitivity for adverse outcomes. This is a **retrospective model-development study with internal 5-fold cross-validation**, not an evaluation of surgery decisions made using the model.

The dataset contains **626 hotspots from 575 patients**, with specimens from eight pathology institutes. Labels combine two follow-up pathways: resected patients are classified by lymph-node status, while patients managed without resection are classified by local/distant recurrence after at least 36 months of follow-up. The outcome is therefore a combined retrospective risk category, not nodal status alone. [Study methods, section 3.1](https://arodes.hes-so.ch/nanna/record/13141/files/Studer_2023_tumor_budding_T-cell_graphs.pdf?registerDownload=1&version=1&withMetadata=0&withWatermark=0).

## Method

The paper represents each tumor budding hotspot as a **graph of tumor buds and T-cells** and classifies it with graph neural networks:

- One [ITBCC](../Clippings/Recommendations%20for%20reporting%20tumor%20budding%20in%20colorectal%20cancer%20based%20on%20the%20International%20Tumor%20Budding%20Consensus%20Conference%20%28ITBCC%29%202016.md)-style budding hotspot (0.785 mm², level 0) per WSI; tumor buds and T-cells are detected automatically on immunostained slides (WSI digitized on a 3DHISTECH Pannoramic 250 at 0.243 µm/px).
- **Nodes** = buds and lymphocytes, with x/y coordinates (µm), element type, and ImageNet DINO ViT features; **edges** carry inter-node distance, with several graph-construction variants compared (Delaunay triangulation, kNN, distance/hierarchical cutoffs).
- **Classifiers**: GNN architectures (GraphSAGE, GIN with jumping knowledge, and variants) built on PyTorch Geometric + PyTorch Lightning, trained with 5-fold cross-validation and model ensembling, predicting the combined risk category described above.
- Model selection is clinically anchored: configurations whose specificity falls below the guideline baseline at comparable sensitivity are discarded.

## Results

- The selected configuration reports **TNR 42.5 ± 8.9% and TPR 84.0 ± 8.2%**, compared with the guideline baseline's **TNR 22.2 ± 4.3% and TPR 85.0 ± 7.6%**. These are means ± standard deviations across five cross-validation folds, not confidence intervals. [Paper, Table 2](https://aibex.ch/research/papers/Studer2023.pdf).
- The specificity difference is about 20 percentage points. Similar sensitivity point estimates do **not** establish equivalence or non-inferiority, and fold variability does not establish that the miss rate is unchanged.
- Fewer unnecessary operations are a proposed benefit requiring external validation and prospective clinical evaluation; the effect of model-guided decisions on surgery rates or subsequent patient outcomes was not tested.
- Bud–T-cell relationships provide a candidate representation of the immune context. Performance comparisons between graph configurations do not establish a causal biological mechanism.

## The pT1-HBTG dataset

The released *pT1 Hotspot Tumor Budding T-cell Graph* dataset (Zenodo, published 2023-05-17) contains, per hotspot: the graphs in GXL format for all construction variants, a JSON with class labels and the 5-fold cross-validation splits, full-resolution hotspot PNGs, and the 200×200 px patches used for feature extraction. File IDs are consistent across all components (patient number, plus a suffix when a patient has multiple WSI). Access is **restricted but obtainable**: a Zenodo login plus a short justification form (research purpose, affiliation, intended use); the contact person is Heather Dawson.

## The repository

The GitHub repo is a general graph-classification framework rather than a single script: GXL dataset parsing, configurable GNN experiments (PyTorch Geometric + Lightning, Weights & Biases logging), and the configs used for the paper. Two code-vs-paper discrepancies worth knowing before reusing it: the released config and evaluation script implement a **5-model ensemble** while a figure caption in the paper says 10, and the config sets 192 hidden neurons where the paper text says 196 — which of the two produced the published numbers is not documented.

## Why this matters for pathology

- Tumor budding is already a guideline-relevant biomarker in pT1 CRC, but conventional bud counting ignores the immune context; this paper operationalizes the **bud–T-cell spatial interplay** as a measurable, machine-readable structure.
- The specificity framing matches the actual clinical decision (avoiding overtreatment after complete endoscopic resection), rather than optimizing an abstract accuracy metric.
- A rare case where the graphs, splits, images, and code are all released — the restricted Zenodo gate is a form, not a wall — making it a realistic starting point for graph-based biomarker work on other cohorts.
- **Relation to bud dispersion metrics:** [Distance-based evaluation of tumor budding in colorectal cancer](../Clippings/Distance-based%20evaluation%20of%20tumor%20budding%20in%20colorectal%20cancer.md) (Äijälä et al., 2026) evaluated distance from the tumor bulk to the farthest buds in two CRC cohorts. Although higher distance was associated with worse outcomes, the reported analyses found no additional prognostic information after conventional budding was accounted for. This is a bounded result for that feature, population, and survival outcome; it neither rules out other spatial biomarkers nor demonstrates that bud–T-cell graphs are superior. The two papers do not provide a head-to-head comparison. [Primary study](https://doi.org/10.1007/s00428-026-04471-9).
- Caveats: absolute specificity (42.5%) is still modest; results come from one scanner/staining pipeline and hotspot-level analysis; and the code/paper mismatches above mean exact reproduction requires contacting the authors.

**Review scope (28 September 2026):** This partial review checked the publication record, cohort size and outcome definition, the selected cross-validation result, and the distance-study comparison. It did not reproduce the results or audit the patient-level splits, model-selection procedure, remaining technical numbers, dataset access conditions, or code/paper discrepancies. Calibration, transportability, sensitivity uncertainty, and the effect on clinical decisions remain appraisal priorities. See [[project-literature-analysis-2026-09-28]].
