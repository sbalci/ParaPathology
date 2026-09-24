---
type: Clipping
status: Evergreen
language: en
title: "CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification"
aliases:
  - "CytoFormer: a molecularly supervised cell foundation model for histopathology cell classification"
  - "CytoFormer"
source: "https://www.sciencedirect.com/science/article/pii/S3117678X26000065"
doi: "10.1016/j.prpath.2026.100006"
pii: "S3117-678X(26)00006-5"
local_pdf: "file:///K:/DownloadsK/1-s2.0-S3117678X26000065-main.pdf"
journal: "Precision Pathology"
volume: "1"
pages: "100006"
year: 2026
source_type: article
author:
  - "[[Jialu Yao]]"
  - "[[Songhao Li]]"
  - "[[Alina Yu]]"
  - "[[Zhi Huang]]"
published: 2026-09-13
created: 2026-09-19
description: "CytoFormer replaces manual pathologist cell annotation with molecular supervision from paired in situ spatial transcriptomics (81 Xenium sections, 15.4M cells, 16 organs, 23 cell types). Built on a ViT-giant backbone (UNI2-h initialization) with 16 per-organ linear routing heads, achieving 84.6% accuracy and 0.78 macro-F1 across 16 organs. Outperforms 6 pathology foundation models (UNI2-h, Virchow2, MUSK, CONCH, PathGen, PLIP) in 24 of 25 benchmark settings, transfers zero-shot to unseen organs, and achieves superior label efficiency (F1 0.82) for active-learning cell typing on TissueLab."
tags:
  - "clippings"
order: 145
belongs_to: "[[Clippings]]"
related_to:
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]"
  - "[[CellQuant-Net]]"
  - "[[NuClick]]"
  - "[[The pathology report as a boundary object: From clinical communication to computational representation]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping]]"
  - "[[HoVer-NeXt]]"
  - "[[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]"
  - "[[Digital Pathology]]"
  - "[[Machine Learning]]"
  - "[[Image Analysis]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
---
# CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification

**Jialu Yao, Songhao Li, Alina Yu, Zhi Huang**
Department of Pathology and Laboratory Medicine, Perelman School of Medicine, University of Pennsylvania, Philadelphia, PA, USA
*Precision Pathology* 1 (2026) 100006 | Published online: 13 September 2026
DOI: [10.1016/j.prpath.2026.100006](https://doi.org/10.1016/j.prpath.2026.100006) | PII: [S3117-678X(26)00006-5
](https://www.sciencedirect.com/science/article/pii/S3117678X26000065)Local PDF: `file:///K:/DownloadsK/1-s2.0-S3117678X26000065-main.pdf
`GitHub: [zhihuanglab/CytoFormer](https://github.com/zhihuanglab/CytoFormer) | Hugging Face: [zhihuanglab/CytoFormer](https://huggingface.co/zhihuanglab/CytoFormer) | Community: [TissueLab](https://app.tissuelab.org/community)

## Summary

In routine histopathology, diagnosing whole-slide images (WSIs) relies fundamentally on cellular assessment: quantifying tumour cellularity, titrating stromal tumor-infiltrating lymphocytes (sTILs), evaluating macrophage infiltration, and profiling microvascular invasion. However, translating cell-level evaluation into reproducible computational models has been severely constrained by the **annotation bottleneck**:

- **Manual pathologist labeling is subjective, slow, and expensive:** Pathologist concordance degrades significantly when attempting to distinguish morphologically overlapping mononuclear cells (e.g., distinguishing a macrophage, an activated fibroblast, an endothelial cell, or a poorly differentiated tumor cell from a single H&E nucleus).
- **Existing cell datasets are small and coarse:** Landmark public datasets (PanNuke, CoNSeP, MoNuSAC) contain on the order of only $\sim 10^5$ nuclei restricted to a handful of broad, often inconsistent categories.
- **Pathology foundation models overlook single-cell features:** Models such as UNI2, Virchow2, CONCH, and MUSK are pretrained on whole-slide tiles ($256 times 256$ to $512 times 512$ px at $20\times/40\times$) for slide- or patch-level tasks, failing to capture subtle nuclear chromatin textures and intracellular phenotypes.

Published in *Precision Pathology* (Elsevier, September 2026; [DOI: 10.1016/j.prpath.2026.100006](https://doi.org/10.1016/j.prpath.2026.100006)) by Jialu Yao, Songhao Li, Alina Yu, and Zhi Huang (University of Pennsylvania), **CytoFormer** overcomes this paradigm by replacing manual human annotations with **direct molecular supervision**:

- **Supervising Morphology with Molecules:** Utilizes imaging-based spatial transcriptomics (10x Xenium) where hundreds to thousands of mRNA targets are profiled in situ at subcellular resolution with single-cell boundaries, followed immediately by post-run H&E staining of the exact same physical section.
- **Unprecedented Dataset Scale:** Curated **81 paired Xenium/H&E sections spanning 16 organs**, generating **15,422,352 cells** mapped across 23 cell types without requiring a single pathologist annotation on the images.
- **Multi-Task Per-Organ Architecture:** Employs a Vision Transformer (ViT-giant, 1536-dimensional embedding, initialized from UNI2-h) with 16 organ-specific linear classification heads. The organ ID acts purely as a routing mechanism at inference, preserving a unified, generalizable cell representation.
- **Empirical Dominance:** On spatially held-out tissue, CytoFormer achieves **84.6% accuracy** and **0.78 macro-F1** across all 16 organs. In frozen-backbone linear fine-tuning, it surpasses six leading pathology foundation models (UNI2-h, Virchow2, MUSK, CONCH, PathGen, PLIP) in **24 of 25 benchmark settings** across four public datasets (PanNuke, CoNSeP, MoNuSAC, PUMA), transferring zero-shot to 9 organs never encountered during pretraining.
- **High Label Efficiency in Active Learning:** Integrated into the TissueLab interactive annotation environment, CytoFormer discriminates normal crypt epithelium from adenocarcinoma on a 10x VisiumHD colorectal cancer slide with an **F1 of 0.82** within only ~200 annotations, outperforming the strongest foundation model baseline by **+0.13 F1**.

---

## Architectural Blueprint & Inference Pipeline

```typescript
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               CYTOFORMER PIPELINE & ARCHITECTURE                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

 [ Whole Slide Image (H&E) ] ────────► [ StarDist / HoVer-NeXt ] ──► [ Nuclear Centroids (x, y) ]
                                                                                │
 ┌──────────────────────────────────────────────────────────────────────────────┘
 │
 ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 1. SPATIAL PATCH CROPPING (Diagnostic Resolution + Microenvironment)                        │
 │    • 56 µm × 56 µm window centered on nucleus centroid                                      │
 │    • Resized to 224 × 224 pixels (at 0.25 µm/px level 0)                                    │
 │    • Quality filtered (tissue mask + Laplacian variance focus check > 10)                   │
 └──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                │ Image patch x ∈ R^(3 × 224 × 224)
                                                ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 2. SHARED VISION TRANSFORMER BACKBONE (ViT-Giant)                                           │
 │    • Initialized from UNI2-h weights, fine-tuned end-to-end                                 │
 │    • Patch size: 14 × 14                                                                    │
 │    • LayerNorm applied to pooled class token ([CLS])                                        │
 │    • Output: 1536-dimensional universal cell embedding h ∈ R^1536                          │
 └──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                │ Embedding h ∈ R^1536 (Organ-Agnostic)
                                                ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 3. PER-ORGAN ROUTING HEAD (Multi-Task Linear Classifier)                                    │
 │    • Input: Cell embedding h + Organ ID (Routing signal only)                                │
 │    • 16 specialized linear classifiers (head sizes: 3 to 9 classes; 103 total outputs)      │
 │    • Softmax over organ-specific classes:                                                   │
 │        p = Softmax(W_(organ) · Dropout(h, p=0.25) + b_(organ))                              │
 └──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                │
                                                ▼
                         ┌──────────────────────────────────────────────┐
                         │   Predicted Single-Cell Phenotype (1 of 23)  │
                         │   (e.g., Hepatocyte, Tumour, Macrophage)     │
                         │   + WSI-Wide Spatial Single-Cell Map         │
                         └──────────────────────────────────────────────┘
```

### Architectural Design Principles

1. **Organ as a Routing Mechanism, Not an Input Feature:**

The organ identity is supplied strictly to the classification head to select the relevant linear classifier ($W\_{\text{organ}}$); it is **never** provided to the ViT encoder. This forces the 1536-dimensional backbone to learn invariant, universal morphological features that recur across tissues (e.g., round lymphocytic chromatin, elongated endothelial spindles, dense collagen fibers), allowing the frozen encoder to transfer zero-shot to completely unseen organs.

1. **The 56 µm Field-of-View Window:**

At 224 pixels input size, a $56 times 56 mutext{m}$ crop equates to $0.25 mutext{m/pixel}$ (equivalent to standard $40\times$ diagnostic magnification). As demonstrated in empirical ablations, this represents the mathematical Pareto optimum: keeping the nucleus at high diagnostic resolution while capturing sufficient immediate neighborhood context (ductal walls, basement membranes, stroma).

---

## Dataset Curation: Molecular Supervision via Xenium

```typescript
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │                      PAIRED XENIUM & H&E CURATION PIPELINE (15.4M CELLS)                    │
 └─────────────────────────────────────────────────────────────────────────────────────────────┘
  81 Paired Human Sections (16 Organs) ──► 10x Genomics Portal (54) + HEST-1k (27)
                                                │
                                                ▼
  [ Single-Cell Spatial Transcriptomics ] ──► Scanpy Normalization & PCA
                                                │
                                                ▼
  [ Unsupervised Leiden Clustering ] ───────► Resolution 0.8 on kNN Graph
                                                │
                                                ▼
  [ Differential Expression & Markers ] ───► Wilcoxon Rank-Sum (Top 30 markers + canonical genes)
                                                │
                                                ▼
  [ Expert Manual Cluster Review ] ────────► Biological consistency verification
                                                Prune artifacts, doublets & uncertain clusters
                                                │
                                                ▼
  [ Per-Cell Confidence Gating ] ──────────► Score = 0.5 · (Neighbour Purity) + 0.5 · (Marker Margin)
                                                Threshold > 0.6 (drops ambiguous border cells)
                                                │
                                                ▼
  [ Precision H&E Registration ] ──────────► DAPI nuclear overlay verification
                                                56 µm crop centered on nucleus centroid
                                                Laplacian focus filtering (> 10)
                                                │
                                                ▼
  [ Spatial KD-Tree Split & Guard Band ] ──► Dispersed blocks + 112 µm boundary exclusion
                                                • 12,111,769 Training Cells (79%)
                                                •  2,944,356 Test Cells (19%)
                                                •    366,227 Guard-Band Cells (2.4%)
```

### Cell-Type Taxonomy (23 Classes Across 16 Organs)

- **7 Common / Pan-Tissue Classes (97.5% of dataset):**
  - **Tumour:** 4,408,081 cells (28.6%)
  - **Stroma:** 3,139,069 cells (20.4%)
  - **Epithelium:** 2,141,342 cells
  - **Lymphocyte:** Shared across 13 organs
  - **Endothelium:** Present across **all 16 organs**
  - **Macrophage:** Present across 13 organs
  - **Plasma cell:** 329,965 cells
- **16 Organ-Specific Classes (2.5% of dataset):**
  - *Liver:* Hepatocyte (114,733 cells), Cholangiocyte
  - *Pancreas:* Acinar, Ductal, Islet
  - *Kidney:* Renal tubule
  - *Brain:* Microglia
  - *Lymph Node:* Squamous epithelium
  - *Lung:* Chondrocyte
  - *Heart:* Cardiomyocyte
  - *Bone Marrow:* Erythroid, Neutrophil, Myeloid progenitor
  - *Bone:* Bone cell
  - *Prostate:* Nerve (1,042 cells)
  - *Skin:* Melanocytic (945 cells)

### The 112 µm Spatial Guard Band

Because neighbouring cells share visual background, randomly splitting cells across a slide introduces massive data leakage. To ensure strict statistical independence:

- Whole sections were held out for Breast (7 of 23) and Lung (7 of 28).
- For the remaining 14 organs, sections were recursively bisected into 16 KD-tree blocks, holding out $\sim 20\\%$ dispersed blocks.
- A **112 µm guard band** (exactly twice the crop width) was purged along all split borders. Consequently, no training cell shares even a single pixel of visual field with any test cell.

---

## Benchmark Results

### 1. In-Distribution Performance on Spatially Held-Out Tissue (2.94M Cells)

Across 16 organs, CytoFormer achieved an overall **Accuracy of 84.6%** and **Macro-F1 of 77.9%**:

| Cell Type Category | Cell Type | Test F1 (%) | Biological & Morphological Correlates |
| --- | --- | --- | --- |
| **Highly Distinctive Morphologies** | **Hepatocyte** | **98.1** | Polygonal shape, central round nuclei, abundant eosinophilic cytoplasm |
|  | **Renal tubule** | **97.8** | Organized cuboidal/columnar tubular architecture |
|  | **Squamous epithelium** | **95.7** | Cohesive polygonal cells, intercellular bridges, keratinization |
|  | **Islet cell** | **94.8** | Clustered neuroendocrine nests, fine granular chromatin |
|  | **Cholangiocyte** | **93.7** | Duct-forming cuboidal epithelium |
|  | **Tumour** | **92.8** | Marked atypia, nuclear enlargement, pleomorphism |
|  | **Acinar cell** | **90.3** | Basophilic basal cytoplasm, apical zymogen granules |
| **Abundant Common Classes** | **Lymphocyte** | **85.3** | Dense, round, hyperchromatic nuclei, scant cytoplasm |
|  | **Epithelium** | **83.9** | Glandular/lining structural cohesion |
|  | **Stroma** | **83.0** | Elongated spindle fibroblasts, extracellular collagen bands |
|  | **Endothelium** | **82.6** | Attenuated vessel lining, elongated flat nuclei |
| **Rare Phenotypes (< 1,000 cells)** | **Melanocytic** | **85.0** | Evaluated on only 61 test cells; highly distinctive morphology |
|  | **Erythroid** | **86.1** | Evaluated on 705 test cells |
| **Mononuclear & Confusable Classes** | **Macrophage** | 62.4 | Foamy cytoplasm, indented nuclei; overlaps with stromal/lymphoid cells |
|  | **Microglia** | 60.1 | Ramified branching; overlaps with glia/stroma |
|  | **Bone cell** | 56.8 | Dense matrix entrapment |
|  | **Myeloid progenitor** | 46.7 | Heterogeneous precursor stages |
|  | **Nerve** | 46.4 | Wavy fibrillar architecture; overlaps with fibroblasts |
|  | **Chondrocyte** | 37.6 | Lacunar spaces; easily confounded with matrix |

> **Key Morphological Insight:** Performance is dictated by **morphological and architectural distinctiveness**, not sample size. Rare classes with distinct geometry (melanocytic, islet cells) achieved $>85\text{--}95\\%$ F1, whereas abundant classes with non-specific mononuclear appearances (macrophages, $n = 228,718$) suffered from confusion with lymphocytes and stroma.

---

### 2. Linear Fine-Tuning Comparison vs 6 Pathology Foundation Models

Backbones were frozen as feature extractors, and identical class-balanced linear classification heads were trained on four independent, pathologist-annotated benchmarks. CytoFormer achieved the highest performance in **24 of 25 organ/dataset settings**:

| Benchmark Dataset | Tissue / Setting | Classes | Metric | UNI2-h | Virchow2 | MUSK | CONCH | PathGen | PLIP | **CytoFormer (Ours)** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **CoNSeP** | Colon | 6 classes | **Macro-F1** | 71.8 | 69.4 | 59.9 | 56.4 | 67.2 | 53.8 | **81.4 ± 1.2** ($p < 0.001$) |
| *— Dysplastic Epithelium* |  |  | F1 (%) | 94.8 | 94.2 | 93.1 | 93.5 | 92.9 | 88.7 | **97.0** |
| *— Healthy Epithelium* |  |  | F1 (%) | 74.0 | 76.1 | 63.8 | 62.4 | 70.3 | 61.2 | **87.4** |
| *— Fibroblasts* |  |  | F1 (%) | 62.1 | 60.5 | 53.9 | 50.8 | 63.3 | 48.7 | **81.5** |
| *— Inflammatory Cells* |  |  | F1 (%) | 56.2 | 52.8 | 57.6 | 51.2 | 54.0 | 45.9 | **79.2** |
| *— Muscle* |  |  | F1 (%) | 64.9 | 63.1 | 58.7 | 56.1 | 68.2 | 45.4 | **77.4** |
| *— Endothelium* |  |  | F1 (%) | 28.7 | 25.4 | 22.8 | 19.3 | 24.1 | 32.7 | **65.9** ($+33.2\\%$) |
| **PUMA** | Melanoma Skin | 9 classes | **Macro-F1** | 38.2 | 39.7 | 37.1 | 34.6 | 36.8 | 29.5 | **58.7 ± 1.5** ($p < 0.001$) |
| *— Neutrophils* |  |  | F1 (%) | 29.1 | 31.2 | 37.5 | 28.4 | 33.0 | 21.6 | **68.8** ($+31.3\\%$) |
| *— Histiocytes* |  |  | F1 (%) | 24.5 | 26.1 | 28.2 | 22.9 | 25.0 | 18.4 | **47.6** |
| *— Endothelium* |  |  | F1 (%) | 24.8 | 26.3 | 21.0 | 18.5 | 22.4 | 16.9 | **48.6** |
| *— Melanophages* |  |  | F1 (%) | 21.3 | 23.0 | 24.8 | 19.7 | 20.1 | 15.2 | **41.3** |
| **MoNuSAC** | 4 Organs | 4 classes | **Macro-F1** | 78.6 | 77.2 | 75.9 | 73.1 | 74.8 | 68.4 | **83.5 ± 0.9** ($p < 0.001$) |
| *— Breast* |  |  | Macro-F1 | 65.9 | 63.8 | 61.2 | 58.7 | 62.4 | 55.1 | **75.4** |
| *— Kidney* |  |  | Macro-F1 | 80.4 | 79.1 | 82.1 | 78.5 | 81.0 | 74.2 | **87.4** |
| *— Lung* |  |  | Macro-F1 | 79.4 | 78.2 | 76.4 | 74.0 | 75.1 | 69.8 | **90.9** |
| **PanNuke** | 19 Organs | 4 classes | **Macro-F1** | 70.1 | 71.2 | 70.3 | 66.8 | 68.9 | 62.4 | **79.3 ± 0.6** ($p < 0.001$) |
| *— Neoplastic* |  |  | F1 (%) | 84.6 | 85.1 | 83.2 | 81.4 | 82.7 | 78.0 | **89.7** |
| *— Epithelial* |  |  | F1 (%) | 80.8 | 81.5 | 79.4 | 77.1 | 78.9 | 73.5 | **87.1** |
| *— Connective* |  |  | F1 (%) | 67.2 | 68.1 | 68.6 | 63.5 | 65.4 | 58.9 | **76.7** |
| *— Inflammatory* |  |  | F1 (%) | 51.4 | 53.2 | 52.8 | 48.6 | 50.1 | 42.6 | **64.8** |

### 3. Out-of-Distribution & Zero-Shot Generalization

Nine of PanNuke's 19 organs were **never seen during CytoFormer pretraining** (bladder, esophagus, stomach, thyroid, testis, adrenal gland, uterus, head/neck, and bile duct).

- CytoFormer outperformed all six foundation models on **every single unseen organ**, maintaining the exact same margin of superiority as on seen organs.
- CytoFormer also led on novel classes never present in its pretraining label taxonomy, such as **melanophages** in PUMA (F1 41.3% vs MUSK 24.8%).
- This proves that CytoFormer did not memorize specific organ classes, but learned an intrinsic, universal vocabulary of nuclear chromatin architecture, cell borders, and microenvironmental context.

---

## Critical Ablation Studies

### 1. Field-of-View (FOV) Resolution Trade-Off

Evaluating 500k training cells and 100k test cells across 10 organs:

| Crop Field of View | Effective Resolution (at 224 px) | Macro-F1 (%) | Accuracy (%) | Morphological Trade-Off |
| --- | --- | --- | --- | --- |
| **28 µm × 28 µm** | $0.125\ \mu\text{m/px}$ | 79.1 | 86.1 | High nuclear detail, but loses essential tissue architecture and stromal context |
| **56 µm × 56 µm (Optimal)** | **0.250 µm/px** | **83.3** | **87.2** | **Optimal balance:** diagnostic chromatin detail + immediate microenvironment |
| **112 µm × 112 µm** | $0.500\ \mu\text{m/px}$ | 82.5 | 86.6 | Mild context dilution; slight degradation in subtle nuclear features |
| **224 µm × 224 µm** | $1.000\ \mu\text{m/px}$ | 77.1 | 83.6 | Severe pixelation; individual nuclear chromatin features become unresolved |

### 2. Tissue Context vs Isolated Nuclear Morphology

To determine how much information resides in the nucleus vs surrounding tissue:

- StarDist segmented the central nucleus + 1.5 µm perinuclear rim; all peripheral tissue was masked with pure white.
- **Results:** Masking the surrounding tissue caused Macro-F1 to collapse from **83.2% to 58.3%** ($-24.9\\%$, $p < 0.001$), accuracy dropped from **87.3% to 75.4%**, and precision fell from **86.9% to 65.5%**.
- **Conclusion:** Single-cell histopathology classification is fundamentally a **microenvironmental task**. Cells cannot be reliably identified in isolation; the spatial organization of adjacent stroma, basement membranes, and neighboring inflammatory cells provides crucial inductive signals.

### 3. Impact of Per-Organ Routing Heads

Comparing 16 per-organ heads against a single global 23-class classifier:

| Architecture | Macro-F1 (%) | Accuracy (%) | Macro-Precision (%) | Statistical Significance |
| --- | --- | --- | --- | --- |
| **Single Global Classifier (23 classes)** | 73.2 | 84.3 | 75.7 | Baseline |
| **Per-Organ Routing Heads (16 heads)** | **77.9** | **84.6** | **83.4** | **+4.7% F1, +7.7% Precision (**$p < 0.001$**)** |

Routing restricts the hypothesis space to biologically plausible entities for each tissue, eliminating false positive hallucinations of impossible cell types (e.g., predicting hepatocytes in brain sections).

---

## Interactive Active Learning on TissueLab

A major clinical hurdle in digital pathology is deploying models on patient biopsies where look-alike benign and malignant cells coexist. The authors evaluated CytoFormer within the TissueLab agentic active-learning interface on a 10x VisiumHD colorectal cancer section (161,702 cells):

- **Clinical Task:** Distinguish benign crypt epithelium from invasive colorectal adenocarcinoma. Benign and malignant epithelial cells exhibit similar morphology on H&E and share the vast majority of transcriptomic marker genes.
- **Ground Truth:** Derived from 2 µm-bin VisiumHD expression combined with histological crypt architecture (10,627 benign epithelial cells vs 151,075 negative/tumor cells).
- **Active Learning Results:**
  - **CytoFormer:** Reached an **F1 of 0.82**, sharply confining epithelial predictions to normal crypt architectures.
  - **Foundation Model Baselines:** UNI2-h (0.69), Virchow2 (0.67), MUSK (0.49), PathGen (0.47), CONCH (0.44), PLIP (0.44).
  - **Label Efficiency:** CytoFormer reached near-peak discriminative performance within the first **~200 user clicks**, whereas existing foundation models plateaued well below 0.70 F1 and scattered false positive epithelial predictions across the tumor bed.

```typescript
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │                         ACTIVE LEARNING LABEL EFFICIENCY (VisiumHD CRC)                     │
 └─────────────────────────────────────────────────────────────────────────────────────────────┘
  F1 Score
   1.0 ┌───────────────────────────────────────────────────────────────────────────────────────┐
       │                                                                                       │
   0.8 │                                 ───────── CytoFormer (F1 = 0.82)                      │
       │                     . - ' ' '                                                         │
   0.6 │         . - ' ' '                       ───────── UNI2-h (F1 = 0.69)                  │
       │   . - '                                 ───────── Virchow2 (F1 = 0.67)                │
   0.4 │                                         ───────── MUSK / PathGen / CONCH (~0.45)      │
       │                                                                                       │
   0.2 │                                                                                       │
       └─┬──────────────┬──────────────┬──────────────┬──────────────┬──────────────┬──────────┘
         0             200            400            800            1200           1800
                                  Number of User Annotations
```

---

## Practical Deployment & Code Workflow

The model weights are open-weight on Hugging Face ([zhihuanglab/CytoFormer](https://huggingface.co/zhihuanglab/CytoFormer)), and inference scripts are hosted on GitHub ([zhihuanglab/CytoFormer](https://github.com/zhihuanglab/CytoFormer)).

### 1. Cropping Single Cells from Whole-Slide Images

```bash
# Crop 56 µm fields of view from WSI and centroid table (cells.csv: x, y, cell_id)
python scripts/crop_cells.py \
    --wsi slide.ome.tif \
    --cells cells.csv \
    --mpp 0.25 \
    --fov_um 56 \
    --out patches/
```

### 2. High-Throughput Batch Inference

```bash
python scripts/infer.py \
    --model_dir checkpoints \
    --patches patches/ \
    --organ skin \
    --batch 256 \
    --out preds.parquet
```

### 3. Native PyTorch Integration

```python
import torch
from cytoformer import CellClassifier, ORGAN_IDX

# Load full network (UNI2-h ViT-giant backbone + 16 routing heads)
model = CellClassifier()
model.load_state_dict(torch.load("checkpoints/checkpoint.pth", map_location="cpu"))
model.eval()

# Input tensor: batch of 56 µm crops resized to 224x224
patches = torch.randn(32, 3, 224, 224)

# 1. Feature Extraction Mode (1536-dimensional universal cell embeddings)
with torch.no_grad():
    embeddings = model.encoder(patches) # shape: [32, 1536]

# 2. Per-Organ Classification Mode (e.g., skin biopsy)
with torch.no_grad():
    organ_idx = ORGAN_IDX["skin"]
    logits = model(patches, organ_idx=organ_idx)
    probabilities = torch.softmax(logits, dim=-1)
    predicted_classes = torch.argmax(probabilities, dim=-1)
```

---

## Vault Context & Comparative Positioning

Within the evolving hierarchy of computational pathology architectures, CytoFormer occupies a foundational position at the single-cell layer:

1. **Resolving the Sub-Tile Resolution Blindspot:**

As established in [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md), patch-level foundation models operate at tile scales ($256\text{--}512$ px), meaning their embeddings obscure intra-patch cell composition. CytoFormer operates at the single-nucleus level, providing the cellular quantification prerequisite for high-precision diagnostic and prognostic modeling.

1. **Complementarity with Hybrid WSI Aggregators:**

Weakly supervised slide-level aggregators, such as [A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping](A%20Hybrid%20MIL%20Approach%20Leveraging%20Convolution%20and%20State-Space%20Model%20for%20Whole-Slide%20Image%20Cancer%20Subtyping.md) (ConvMixerSSM), rely on bag-level sequence modeling. CytoFormer enables the construction of single-cell graphs and cellular density maps that can be passed to graph neural networks (e.g., Tumor budding T-cell graphs for pT1 colorectal cancer) or MIL sequence engines.

1. **Synergy with Generative Regulatory Tools:**

While tools like [HistoGen: Histopathology Cell Nuclei Image Generation Tool](HistoGen%20-%20Histopathology%20Cell%20Nuclei%20Image%20Generation%20Tool.md) synthesize realistic nuclear morphology from distance maps, CytoFormer provides the inverse capability: reading routine H&E morphology and decoding ground-truth molecular identity.

1. **Molecular Supervision vs. Active-Learning Consensus (**[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md)**,** [NuClick](../computational-digital-and-mathematical-pathology/nuclick.md)**):**

Where Owkin's HistoPLUS scales up cellular characterization using an active learning loop on 108k nuclei supervised by consensus multi-pathologist review and NuClick interactive boundary delineation, CytoFormer bypasses human inter-observer discordance entirely by training on 15.4M cells supervised by in situ single-cell transcriptomics. Both frameworks demonstrate that routine morphological features reflect deep molecular phenotypes.

1. **Architectural Trade-offs: ViT-Giant vs. Large-Kernel CNNs (**[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md)**,** [CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md)**,** [RepLKNet](../computational-digital-and-mathematical-pathology/replknet.md)**):**

CytoFormer relies on a heavy ViT-giant backbone (UNI2-h initialization, 1536-d embeddings) to maximize representation learning and zero-shot transfer, whereas CellPrior-Net and CellQuant-Net leverage UniRepLKNet-N large-kernel CNNs ($31 times 31$ convolutions) and hematoxylin Difference-of-Gaussians priors to achieve near-transformer accuracy with 2x to 3x higher throughput on gigapixel WSIs.

1. **Precision Semantics and Boundary Objects (**[The pathology report as a boundary object: From clinical communication to computational representation](The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md)**):**

Dr. Shuoshuo Wang's framework establishes that secondary computational reuse of pathology requires explicit semantic grounding. CytoFormer provides a direct bridge between sub-visual microscopic observations and biological state categories, establishing objective single-cell phenotypes before narrative summarization.

---

## Related Notes

- **Cell Classification & Quantification:** [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md), [CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md), [CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md), [NuClick](../computational-digital-and-mathematical-pathology/nuclick.md), [HoVer-NeXt](../computational-digital-and-mathematical-pathology/hover-next.md)
- **Theory & Precision Semantics:** [The pathology report as a boundary object: From clinical communication to computational representation](The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md)
- **Foundation Models & Trade-Offs:** [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md), [Towards robust foundation models for digital pathology](Towards%20robust%20foundation%20models%20for%20digital%20pathology.md), [A distributional robustness margin for pathology foundation models](A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md)
- **WSI Sequence & MIL Aggregators:** [A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping](A%20Hybrid%20MIL%20Approach%20Leveraging%20Convolution%20and%20State-Space%20Model%20for%20Whole-Slide%20Image%20Cancer%20Subtyping.md), Weakly supervised MIL histopathological tumor segmentation
- **Synthetic Data & Single-Cell Tools:** [HistoGen: Histopathology Cell Nuclei Image Generation Tool](HistoGen%20-%20Histopathology%20Cell%20Nuclei%20Image%20Generation%20Tool.md), Micro-Manager
- **Large-Kernel Architectures:** [Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs](Scaling%20Up%20Your%20Kernels%20to%2031x31%20-%20Revisiting%20Large%20Kernel%20Design%20in%20CNNs.md), [RepLKNet](../computational-digital-and-mathematical-pathology/replknet.md)
- **Multiplex & Spatial Analysis:** [Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images](Multiplex%20Immunofluorescence%20Image%20Analysis%20with%20QuPath%20-%20Part%201.md), Tumor budding T-cell graphs for pT1 colorectal cancer
- **Hardware, Displays & Governance:** [Considerations for digital pathology displays](Considerations%20for%20digital%20pathology%20displays.md), [Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)](Regulatory%20Science%20Tools%20Catalog%20-%20Digital%20Pathology.md), What AI Can and Cannot Do in Pathology

<!-- tolaria:related:start -->

## See also

* [A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping](A%20Hybrid%20MIL%20Approach%20Leveraging%20Convolution%20and%20State-Space%20Model%20for%20Whole-Slide%20Image%20Cancer%20Subtyping.md)
* [Articles on computational, digital, and mathematical pathology](../computational-digital-and-mathematical-pathology/articles-on-computational-digital-and-mathematical-pathology.md)
* [CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md)
* [CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md)
* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [HistoGen: Histopathology Cell Nuclei Image Generation Tool](HistoGen%20-%20Histopathology%20Cell%20Nuclei%20Image%20Generation%20Tool.md)
* [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md)
* [HoVer-NeXt](../computational-digital-and-mathematical-pathology/hover-next.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Machine Learning](../statistics-and-bioinformatics/machine-learning/README.md)
* [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md)
* [NuClick](../computational-digital-and-mathematical-pathology/nuclick.md)
* [The pathology report as a boundary object: From clinical communication to computational representation](The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md)

<!-- tolaria:related:end -->
