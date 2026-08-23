---
type: Note
status: Evergreen
belongs_to:
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
url: https://openreview.net/forum?id=ruaXPgZCk6i
repository: https://github.com/digitalpathologybern/pT1-HBTG-MIDL2023
dataset: https://doi.org/10.5281/zenodo.7867085
aliases:
  - "Tumor budding T-cell graphs for pT1 colorectal cancer"
---

# Tumor budding T-cell graphs for pT1 colorectal cancer

**Studer L, Bokhorst J-M, Nagtegaal I, Zlobec I, Dawson H, Fischer A.** *Tumor Budding T-cell Graphs: Assessing the Need for Resection in pT1 Colorectal Cancer Patients.* Medical Imaging with Deep Learning (MIDL) 2023, PMLR 227:235–259.

- Paper: [OpenReview forum](https://openreview.net/forum?id=ruaXPgZCk6i) · [PDF](https://openreview.net/pdf?id=ruaXPgZCk6i)
- Code: [digitalpathologybern/pT1-HBTG-MIDL2023](https://github.com/digitalpathologybern/pT1-HBTG-MIDL2023)
- Dataset: [pT1-HBTG on Zenodo](https://zenodo.org/records/7867085) (DOI 10.5281/zenodo.7867085, restricted access, CC BY-NC-SA 4.0)

## Problem

pT1 colorectal cancers (submucosal invasion only) are increasingly found at screening and can often be cured by endoscopic/local resection alone. Guidelines escalate patients with histological risk factors to oncologic surgical resection — but only a minority of those patients actually harbor lymph node metastasis. The stratification problem is therefore one of **specificity**: sensitivity must stay high (a missed nodal metastasis is costly), while every gain in specificity spares node-negative patients major surgery. In this cohort the guideline-based risk stratification baseline reaches TNR 22.2 ± 4.3 at TPR 85.0 ± 7.6 (F1 28.2 ± 4.4) — i.e., nearly four of five node-negative patients would still be sent to surgery.

## Method

The paper represents each tumor budding hotspot as a **graph of tumor buds and T-cells** and classifies it with graph neural networks:

- One ITBCC-style budding hotspot (0.785 mm², level 0) per WSI; tumor buds and T-cells are detected automatically on immunostained slides (WSI digitized on a 3DHISTECH Pannoramic 250 at 0.243 µm/px).
- **Nodes** = buds and lymphocytes, with x/y coordinates (µm), element type, and ImageNet DINO ViT features; **edges** carry inter-node distance, with several graph-construction variants compared (Delaunay triangulation, kNN, distance/hierarchical cutoffs).
- **Classifiers**: GNN architectures (GraphSAGE, GIN with jumping knowledge, and variants) built on PyTorch Geometric + PyTorch Lightning, trained with 5-fold cross-validation and model ensembling, predicting the patient's lymph node status.
- Model selection is clinically anchored: configurations whose specificity falls below the guideline baseline at comparable sensitivity are discarded.

## Results

- Best graph configurations improve specificity by **~20 percentage points over the guideline baseline — TNR 42.5 vs 22.2 — with essentially no sensitivity loss (TPR 84.0 vs 85.0)**.
- Interpretation: at an unchanged miss rate, roughly one additional node-negative patient in five could be spared unnecessary oncologic surgery.
- The comparison of graph variants doubles as a biology probe: including T-cells and spatial bud–lymphocyte relationships (an "attacker–defender" view of the invasive front) is what the graphs add over counting buds alone.

## The pT1-HBTG dataset

The released *pT1 Hotspot Tumor Budding T-cell Graph* dataset (Zenodo, published 2023-05-17) contains, per hotspot: the graphs in GXL format for all construction variants, a JSON with class labels and the 5-fold cross-validation splits, full-resolution hotspot PNGs, and the 200×200 px patches used for feature extraction. File IDs are consistent across all components (patient number, plus a suffix when a patient has multiple WSI). Access is **restricted but obtainable**: a Zenodo login plus a short justification form (research purpose, affiliation, intended use); the contact person is Heather Dawson.

## The repository

The GitHub repo is a general graph-classification framework rather than a single script: GXL dataset parsing, configurable GNN experiments (PyTorch Geometric + Lightning, Weights & Biases logging), and the configs used for the paper. Two code-vs-paper discrepancies worth knowing before reusing it: the released config and evaluation script implement a **5-model ensemble** while a figure caption in the paper says 10, and the config sets 192 hidden neurons where the paper text says 196 — which of the two produced the published numbers is not documented.

## Why this matters for pathology

- Tumor budding is already a guideline-relevant biomarker in pT1 CRC, but conventional bud counting ignores the immune context; this paper operationalizes the **bud–T-cell spatial interplay** as a measurable, machine-readable structure.
- The specificity framing matches the actual clinical decision (avoiding overtreatment after complete endoscopic resection), rather than optimizing an abstract accuracy metric.
- A rare case where the graphs, splits, images, and code are all released — the restricted Zenodo gate is a form, not a wall — making it a realistic starting point for graph-based biomarker work on other cohorts.
- Caveats: absolute specificity (42.5%) is still modest; results come from one scanner/staining pipeline and hotspot-level analysis; and the code/paper mismatches above mean exact reproduction requires contacting the authors.
