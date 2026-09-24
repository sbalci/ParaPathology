---
type: Clipping
status: Evergreen
language: en
title: "CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images"
aliases:
  - "CellPrior-net: Prior-guided nuclei detection and classification for H&E whole-slide images"
  - "CellPrior-Net"
  - "CP-Net"
  - "CellQuant-Net"
source: "https://www.sciencedirect.com/science/article/pii/S2153353926001781"
doi: "10.1016/j.jpi.2026.100716"
pii: "S2153-3539(26)00178-1"
arxiv: "https://arxiv.org/abs/2607.00802"
local_pdf: "file:///K:/DownloadsK/1-s2.0-S2153353926001781-main.pdf"
journal: "Journal of Pathology Informatics"
volume: "22"
pages: "100716"
year: 2026
source_type: article
author:
  - "[[Falah Jabar]]"
  - "[[Pasquale Lombardi]]"
  - "[[Aria Torkpour]]"
  - "[[Masoud Tafavvoghi]]"
  - "[[Per Niklas Benzler Waaler]]"
  - "[[Sigve Andersen]]"
  - "[[Erna-Elise Paulsen]]"
  - "[[Mette Pøhl]]"
  - "[[Lill-Tove Rasmussen Busund]]"
  - "[[Tom Donnem]]"
  - "[[Elin Richardsen]]"
  - "[[David J. Pinato]]"
  - "[[Mehrdad Rakaee]]"
published: 2026-08-28
created: 2026-09-20
description: "CellPrior-Net (CP-Net) introduces an efficient, prior-guided CNN architecture for dense nuclei detection and 3-class classification (tumor, immune, other) on H&E gigapixel whole-slide images. By coupling a UniRepLKNet-N large-kernel encoder with a 4-channel input (RGB + hematoxylin Difference of Gaussians prior) and GPU watershed post-processing, CP-Net matches transformer accuracy while running 2x to 3x faster than CellViT. Incorporated into CellQuant-Net with automated slide quality assessment (WSI-QA) and spatial TIL connectivity graphs."
tags:
  - "clippings"
order: 147
belongs_to: "[[Clippings]]"
related_to:
  - "[[CellQuant-Net]]"
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[NuClick]]"
  - "[[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]"
  - "[[HoVer-NeXt]]"
  - "[[Digital Pathology Software]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
  - "[[Machine Learning]]"
---

# CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images

## Summary

Accurate single-cell quantification in hematoxylin and eosin (H&E) whole-slide images (WSIs) is foundational for deciphering the tumor microenvironment (TME) and calculating quantitative biomarkers such as tumor-infiltrating lymphocyte (TIL) density. However, existing computational pathology pipelines face three major clinical translation bottlenecks:
1. **The Representation Bottleneck:** Standard deep learning networks ingest standard 3-channel RGB patches, ignoring the biochemical reality that hematoxylin stains nucleic acids (DNA/RNA) specifically, while eosin stains non-specific cytoplasmic and extracellular proteins.
2. **The Compute & Latency Bottleneck:** Modern vision transformer pipelines (e.g., CellViT, CellDETR) and heavy multi-branch networks require massive compute and slow CPU-bound post-processing, taking 10 to 40+ minutes per gigapixel WSI.
3. **The Artifact Dilemma:** Clinical WSIs are rife with tissue folds, knife chatter, air bubbles, out-of-focus blur, and pathologist pen ink. Processing uncurated tiles generates massive false-positive cell counts.

Published in the *Journal of Pathology Informatics* (August 2026, [DOI: 10.1016/j.jpi.2026.100716](https://doi.org/10.1016/j.jpi.2026.100716); [arXiv:2607.00802](https://arxiv.org/abs/2607.00802)), **CellPrior-Net (CP-Net)** and its parent clinical workflow **[CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md)** resolve these challenges:
- **Prior-Guided 4-Channel Input:** Separates the hematoxylin ($H$) stain via Macenko optical density deconvolution, applies a multi-scale Difference of Gaussians (DoG) filter to capture nuclear chromatin density, and feeds a 4-channel tensor ($[R, G, B, \text{DoG}]$) into the network.
- **UniRepLKNet-N Large-Kernel Encoder:** Replaces heavy transformer self-attention with large-kernel depthwise convolutions, delivering a vast receptive field at fractional computational overhead.
- **GPU-Accelerated Watershed Post-Processing:** Combines GPU erosion, Euclidean distance transforms, and multithreaded watershed with magnification-optimized hyperparameters (calibrated for $20\times$ and $40\times$).
- **End-to-End WSI Pipeline ([CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md)):** Integrates automated deep-learning Quality Assessment (WSI-QA) to eliminate artifacts prior to inference, extracts nuclei types, builds spatial cell-cell connectivity graphs, and exports native QuPath GeoJSON files.
- **Rigorous Cross-Dataset Benchmark (~10.4M Nuclei across 8 Datasets):** Evaluated against 10 state-of-the-art pipelines (CellViT, CellViT++, Cerberus, HoVer-Net, NuLite, PointNu-Net, CellDetr, CellSAM, LKCell, TSFD-Net) across multiple organs, scanners, and magnifications. CP-Net establishes the optimal Pareto efficiency frontier, matching CellViT panoptic quality while cutting inference time by **$2\times$ to $3\times$**.

---

## Technical Architecture & Mathematical Formulation

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CELLPRIOR-NET (CP-NET) PIPELINE                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

        [ Input H&E Tile (256 × 256 px) ]
                       │
         ┌─────────────┴────────────────────────┐
         │                                      │
         │ (3-channel RGB)                      ▼
         │                      ┌─────────────────────────────────┐
         │                      │  Macenko Stain Deconvolution    │
         │                      │  OD Conversion & Eigenplane     │
         │                      └───────────────┬─────────────────┘
         │                                      │
         │                                      ▼
         │                      ┌─────────────────────────────────┐
         │                      │   Isolated Hematoxylin (H)      │
         │                      │   99th Percentile Normalization │
         │                      └───────────────┬─────────────────┘
         │                                      │
         │                                      ▼
         │                      ┌─────────────────────────────────┐
         │                      │   Multi-Scale DoG Filter        │
         │                      │   σ ∈ {2.5, 3.5, 4.5} (40×)     │
         │                      │   σ ∈ {1.6, 2.4, 3.2} (20×)     │
         │                      └───────────────┬─────────────────┘
         │                                      │
         │                                      ▼
         │                      ┌─────────────────────────────────┐
         │                      │      DoG Nuclear Prior Map      │
         │                      └───────────────┬─────────────────┘
         │                                      │
         └──────────────────────┬───────────────┘
                                │ Concatenate [R, G, B, DoG]
                                ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │                 4-CHANNEL INPUT TENSOR [B, 4, H, W]             │
        └───────────────────────────────┬─────────────────────────────────┘
                                        │
                                        ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │            UniRepLKNet-N LARGE-KERNEL CNN BACKBONE              │
        │      • Stage 1: Downsampling & Large-Kernel Depthwise Conv      │
        │      • Stage 2: Hierarchical Spatial Feature Extraction         │
        │      • Stage 3: High-Dimensional Morphological Encoding         │
        │      • Stage 4: Global Context Integration                      │
        └───────────────────────────────┬─────────────────────────────────┘
                                        │ Multi-Scale Skip Connections
                                        ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │             U-NET-LIKE PROGRESSIVE FEATURE DECODER              │
        │      Feature concatenation & progressive spatial upsampling     │
        └───────────────┬─────────────────────────────────┬───────────────┘
                        │                                 │
                        ▼                                 ▼
        ┌───────────────────────────────┐ ┌───────────────────────────────┐
        │    Binary Detection Head      │ │  3-Class Classification Head  │
        │    Nuclei vs Background       │ │  Tumor vs Immune vs Other     │
        │    Loss: Dice + FocalTversky  │ │  Loss: CE + Dice + FocalTvers │
        └───────────────┬───────────────┘ └───────────────┬───────────────┘
                        │                                 │
                        └───────────────┬─────────────────┘
                                        │
                                        ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │          MAGNIFICATION-CALIBRATED GPU POST-PROCESSING           │
        │   1. Morphological Erosion (re) on binary logits                │
        │   2. Euclidean Distance Transform (sd)                          │
        │   3. Peak Local Maxima Detection (dm, t_min)                    │
        │   4. GPU/Multithreaded Watershed Boundary Separation            │
        │   5. Small Object Noise Filter (A_min)                          │
        │   6. Instance Segmentation & Phenotypic Class Fusion            │
        └───────────────────────────────┬─────────────────────────────────┘
                                        │
                                        ▼
        ┌─────────────────────────────────────────────────────────────────┐
        │               FINAL INSTANCE CELL SEGMENTATION                  │
        │     • GeoJSON boundaries for QuPath                             │
        │     • Phenotype: Tumor / Immune / Other                         │
        │     • Spatial Connectivity Graph                                │
        └─────────────────────────────────────────────────────────────────┘
```

### 1. Stain Deconvolution & The Hematoxylin Difference of Gaussians (DoG) Prior

Rather than forcing the neural network to infer stain chemistry from standard RGB values, CP-Net extracts an explicit **nuclear prior channel** through analytical stain separation:

1. **Optical Density (OD) Transformation:**
   $$\text{OD} = -\log_{10}\left(\frac{I + 1}{I_0}\right)$$
   where $I_0 = 240$ represents the background transmitted light intensity, and the constant $1$ avoids logarithmic singularity on saturated pixels. Pixels with low optical density ($\text{OD} < \beta = 0.15$) are excluded as transparent background.
2. **Eigenvector Plane & Percentile Angular Projection:**
   The covariance matrix $\Sigma = \text{Cov}(\text{OD}_{\text{hat}}^T)$ is decomposed into eigenvalues and eigenvectors. Pixels are projected onto the primary stain plane, and angular coordinates $\phi = \arctan2(T_y, T_x)$ are calculated. The 1st and 99th percentiles of $\phi$ establish the robust boundary vectors for Hematoxylin ($v_{\text{min}}$) and Eosin ($v_{\text{max}}$).
3. **Stain Matrix Decomposition & Normalization:**
   Stain concentrations $C$ are derived via least-squares minimization:
   $$C = \arg\min_C \| \text{OD} - M_{\text{stain}} \cdot C \|_2^2$$
   The first concentration row $C_H$ represents hematoxylin. It is normalized against the 99th percentile:
   $$C_{H,\text{norm}} = \frac{C_H}{C_{H,99} / C_{H,\text{ref}}}$$
   where $C_{H,\text{ref}} = 1.9705$ is the standardized reference maximum hematoxylin concentration.
4. **Multi-Scale Difference of Gaussians (DoG):**
   The grayscale hematoxylin image $I_H$ is convolved with 2D Gaussian kernels across smoothing scales $\sigma$:
   $$G_\sigma(x, y) = \frac{1}{2\pi \sigma^2} \exp\left(-\frac{x^2 + y^2}{2\sigma^2}\right)$$
   $$D_\sigma = (I_H * G_\sigma) - (I_H * G_{k\sigma})$$
   with scale multiplier $k = \sqrt{2}$. The final nuclear prior map takes the maximum DoG response across a calibrated scale set $\Sigma$:
   $$D(x) = \max_{\sigma \in \Sigma} D_\sigma(x)$$
   - **$40\times$ Magnification ($0.25\ \mu\text{m/px}$):** $\Sigma = \{2.5, 3.5, 4.5\}$
   - **$20\times$ Magnification ($0.50\ \mu\text{m/px}$):** $\Sigma = \{1.6, 2.4, 3.2\}$

The resulting single-channel DoG response is concatenated with the RGB image, forming a **4-channel input tensor** $[B, 4, 256, 256]$ that strongly highlights chromatin texture while suppressing eosinophilic stroma and background void.

---

### 2. Neural Architecture: UniRepLKNet-N Backbone & Dual Decoder

Existing pipelines either deploy standard CNNs (HoVer-Net) that lack sufficient contextual receptive fields, or vision transformers (CellViT, CellDETR) that incur quadratic memory overheads ($\mathcal{O}(N^2)$) and high FLOP counts:
- **Encoder:** CP-Net uses **UniRepLKNet-N**, a modern convolutional backbone that features large-kernel depthwise convolutions (e.g., $13\times 13$ to $31\times 31$ kernels reparameterized into small kernels during inference). This provides an ultra-wide effective receptive field (ERF) matching ViTs while retaining convolutional translation equivariance, low memory consumption, and extreme throughput on standard GPUs.
- **Decoder:** A symmetrical U-Net decoder with multi-scale skip connections merges high-level semantic abstractions with low-level spatial contours.
- **Dual Output Heads:**
  1. *Binary Nuclei Detection Head:* Predicts a single-channel segmentation logit separating nuclei from background stroma.
  2. *Nuclei Type Classification Head:* Predicts a 4-channel tensor corresponding to background, tumor cells, immune cells, and other stromal/epithelial cells.

---

### 3. Multi-Task Objective Function

The network is trained end-to-end using a joint detection and classification loss:
$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{cls}} + \mathcal{L}_{\text{det}}$$

Where the classification and detection objectives are formulated to overcome class imbalance across dense cellular populations:
$$\mathcal{L}_{\text{cls}} = \lambda_1 \mathcal{L}_{\text{CE}} + \lambda_2 \mathcal{L}_{\text{Dice}} + \lambda_3 \mathcal{L}_{\text{FocalTversky}}$$
$$\mathcal{L}_{\text{det}} = \lambda_4 \mathcal{L}_{\text{Dice}} + \lambda_5 \mathcal{L}_{\text{FocalTversky}}$$

Focal Tversky loss specifically penalizes false negatives (missed small immune cells) in dense clusters, preventing the network from biasing exclusively toward large, hyperchromatic tumor nuclei.

---

### 4. Magnification-Calibrated GPU Watershed Post-Processing

A notorious failure mode in instance segmentation is the merging of abutting nuclei in crowded tumor nests. Rather than relying on computationally sluggish CPU watershed or complex horizontal-vertical distance fields (HoVer-Net), CP-Net optimizes a **6-step GPU-accelerated morphological pipeline**:
1. **Morphological Erosion ($r_e$):** Separates weakly connected borders and strips single-pixel boundary noise.
2. **Euclidean Distance Transform ($s_d$):** Maps distance from nuclear boundaries to centroids.
3. **Peak Local Maxima ($d_m, t_{\text{min}}$):** Extracts internal centroid seeds while filtering noise peaks.
4. **Watershed Segmentation:** Propagates boundaries from peak seeds along the inverted distance topography.
5. **Small Object Filter ($A_{\text{min}}$):** Discards fragments below minimum biological area.
6. **Phenotypic Mask Fusion:** Assigns the majority classified cell type within each watershed polygon.

#### Hyperparameter Optimization via Grid Search (200 Expert-Curated Masks)
The hyperparameters were formally optimized against 200 diverse ground-truth masks (100 at $20\times$, 100 at $40\times$) using an absolute count discrepancy objective:
$$\mathcal{L}_{\text{opt}} = \frac{1}{N} \sum_{i=1}^N |Y_i - \hat{Y}_i|$$

| Parameter | Description | $20\times$ Setting ($0.50\ \mu\text{m/px}$) | $40\times$ Setting ($0.25\ \mu\text{m/px}$) |
| :--- | :--- | :---: | :---: |
| **$r_e$** | Erosion radius | **1** | **2** |
| **$s_d$** | Distance mask kernel | **$5 \times 5$** | **$5 \times 5$** |
| **$d_m$** | Minimum peak distance | **4** | **8** |
| **$t_{\text{min}}$** | Peak threshold cutoff | **2** | **2** |
| **$A_{\text{min}}$** | Minimum object area (px) | **10** | **20** |

---

## The [CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md) Clinical WSI Quantification Framework

To bridge the gap between tile-level algorithmic benchmarks and gigapixel clinical whole-slide workflows, the authors wrapped CP-Net into **CellQuant-Net**, an end-to-end four-stage pipeline:

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CELLQUANT-NET WSI WORKFLOW                                             │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  [ Whole-Slide Image (SVS / NDPI / TIFF) ]
                     │
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  STAGE 1: WSI Quality Assessment (QA) & Artifact Exclusion          │
  │  • Deep segmentation backbone (DHUnet / Swin / ConvNeXt)            │
  │  • Excludes: Blur, Folds, Knife Lines, Pen Ink, Void                │
  │  • Outputs: WSI thumbnail, *_seg.png heatmap, WSI_Summary.xlsx      │
  └──────────────────┬──────────────────────────────────────────────────┘
                     │ High-Quality Tissue Tiles Only
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  STAGE 2: Prior-Guided CP-Net Cell Detection & Classification       │
  │  • Macenko H-channel deconvolution + DoG prior calculation          │
  │  • UniRepLKNet-N inference (batch size 128)                         │
  │  • GPU watershed instance segmentation                              │
  │  • Classified: Tumor / Immune / Other                               │
  └──────────────────┬──────────────────────────────────────────────────┘
                     │ Instance Coordinates & Classes
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  STAGE 3: Spatial Neighborhood Connectivity Graphs                  │
  │  • Radius-based nearest neighbor graph construction                 │
  │  • Cell-cell spatial interaction matrix                             │
  │  • Outputs: connectivity_edges.csv                                  │
  └──────────────────┬──────────────────────────────────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  STAGE 4: Clinical Biomarker Quantification & QuPath Integration    │
  │  • Tumor-Infiltrating Lymphocyte (TIL) density & percentages        │
  │  • Native export: qupath_cells.geojson                              │
  │  • Native export: qupath_cells_connectivity.geojson                 │
  │  • Drag-and-drop interactive review inside QuPath                   │
  └─────────────────────────────────────────────────────────────────────┘
```

---

## Multi-Center Evaluation & Benchmark Datasets

The study assembled **8 diverse datasets encompassing ~10.4 million annotated nuclei** across different organs, scanners, and resolutions:

| Dataset | Primary Organ | Magnification | Scanner | Reference / Source |
| :--- | :--- | :---: | :--- | :--- |
| **PanNuke** | Multi-organ (19 tissues) | $40\times$ | Multi-scanner | Gamper et al., 2019 (Used for CP-Net training) |
| **CoNSeP** | Colorectal | $40\times$ | Omnyx VL120 | Graham et al., 2019 |
| **Lizard** | Colorectal | $20\times$ | Mixed | Graham et al., 2021 (7,429 tiles) |
| **NuCLS** | Breast | $20\times$ | Mixed | Amgad et al., 2021 |
| **PanopTILs** | Breast | $40\times$ | Mixed | Saltz et al. / TCGA |
| **SegPath** | Multi-organ | $40\times$ | Hamamatsu NanoZoomer S60 | Ding et al., 2023 |
| **TNMI-20×** | Non-Small Cell Lung | $20\times$ | 3DHistech Pannoramic Flash III | Rakaee et al., 2023 |
| **TNMI-40×** | Non-Small Cell Lung | $40\times$ | 3DHistech Pannoramic Flash III | Rakaee et al., 2023 |
| **ILCD** *(New)* | Hepatocellular Carcinoma | $40\times$ | Imperial College London | Jabar et al., 2026 (40 HCC WSIs, pathologist annotated) |

*Unified 3-Class Taxonomy:* Because raw datasets use incompatible annotation labels (ranging from 4 to 14 classes), all labels were standardized into **Tumor**, **Immune**, and **Other** cells, enabling the first equitable, cross-dataset head-to-head evaluation in the literature.

---

## Empirical Results & Head-to-Head Comparisons

### 1. Cross-Dataset Generalization vs. 10 State-of-the-Art Pipelines

CP-Net was compared against 10 published pipelines: **CellViT**, **CellViT++**, **Cerberus**, **HoVer-Net**, **NuLite**, **PointNu-Net**, **CellDetr**, **CellSAM** (detection only), **LKCell**, and **TSFD-Net**:
- **Cross-Dataset Performance Spread:** Across external test cohorts, average Panoptic Quality (PQ) ranged widely from **0.05 to 0.34**, Detection Quality (DQ) from **0.07 to 0.46**, and Segmentation Quality (SQ) from **0.22 to 0.62**. This underscores severe domain shifts caused by scanner optical profiles, stain variations, and tissue types.
- **Top Performers:** Across all external datasets, **CP-Net, CellViT, and NuLite consistently achieved the highest average PQ and DQ scores**.
- **Impact of Scanner Profiling:** Performance was highest on the Omnyx VL120 scanner (CoNSeP) and lowest on heterogeneous, multi-center scanner sets, proving that optical transfer functions remain a major source of out-of-distribution dropoff.
- **Phenotypic Disparity:** All models achieved significantly higher PQ on **tumor cells** (which are larger, hyperchromatic, and architecturally distinct) than on **immune cells** (small, hyper-dense, and easily blurred into stromal fibroblasts) or **other stromal cells**.
- **Resolution Sensitivity:** Models evaluated at $40\times$ achieved systematically superior panoptic quality compared to $20\times$, reflecting finer nuclear membrane and chromatin texture visibility.

---

### 2. Runtime & Pareto Frontier Analysis

```
Panoptic Quality (PQ)
  ▲
  │                     [CellViT] (High PQ, Heavy / Slow)
  │                     ▲
  │                    ╱
  │         [CP-Net] ──   (Pareto Optimal: High PQ, Fast / Lightweight)
  │         ▲
  │        ╱
  │  [CellDETR]
  │
  │                 [HoVer-Net]     [PointNu-Net]
  │                 [NuLite]        [TSFD-Net]
  │                 (Sub-optimal efficiency trade-offs)
  └────────────────────────────────────────────────────────► Inference Latency / Cost
```

The study evaluated runtime across gigapixel WSIs on an NVIDIA GPU workstation:

#### Table 1: Real-World Whole-Slide Execution Time (Minutes)

| Whole-Slide Image | Resolution / Dimensions | CellViT | CP-Net | CellQuant-Net (Complete Pipeline) |
| :--- | :--- | :---: | :---: | :--- |
| **WSI 1 ($20\times$)** | $31,871 \times 25,199\ \text{px}$ | 5.15 min | **2.16 min** *(2.4× faster)* | **5.77 min** (QA: 2.67m; CP-Net: 2.16m; Post: 0.94m) |
| **WSI 2 ($40\times$)** | $44,125 \times 70,507\ \text{px}$ | 8.30 min | **2.77 min** *(3.0× faster)* | **16.83 min** (QA: 12.58m; CP-Net: 2.77m; Post: 1.48m) |

*Takeaway:* While CellViT achieves marginal PQ improvements in certain isolated settings, CP-Net cuts whole-slide cell inference time by **$58\%$ to $67\%$**, making dense whole-slide single-cell analysis clinically practical on standard hardware.

---

### 3. Clinical Proof-of-Concept: Overall Survival in Hepatocellular Carcinoma

To demonstrate clinical validity, the authors applied CellQuant-Net to **13 H&E WSIs from the AB-real hepatocellular carcinoma (HCC) cohort** with matched clinical outcomes:
- Automated WSI-QA excluded pen markings, capsule tears, and blur.
- CP-Net quantified tumor-infiltrating lymphocyte (TIL) density across viable tumor beds.
- Patients stratified by median TIL density into High vs. Low TIL groups revealed a **statistically significant survival benefit for high TIL infiltration ($p = 0.006$, log-rank test)**.
- While preliminary, this confirms that CP-Net generates clinically and biologically meaningful prognostic readouts directly from routine H&E glass slides without expensive multiplex IHC or transcriptomics.

---

## Comparison with Vault Cell Segmentation Engines

| Feature / Model | **CellPrior-Net (CP-Net)** | **[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md)** | **[NuClick](../computational-digital-and-mathematical-pathology/nuclick.md)** | **[HoVer-NeXt](../computational-digital-and-mathematical-pathology/hover-next.md)** | **[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md)** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Focus** | Fast WSI detection + 3-class classification | Pan-cancer 13-class instance segmentation | Interactive / prompted point-to-mask | Unprompted WSI nuclear instance segmentation | Molecularly supervised single-cell classification |
| **Backbone** | UniRepLKNet-N (Large-kernel CNN) | H0-mini (Distilled ViT, 86M) | Lightweight CNN / U-Net | NeXt-Backbone (ConvNeXt / ViT) | ViT-Giant (UNI2-h backbone, 1536-d) |
| **Input Channels** | **4-channel:** RGB + Hematoxylin DoG prior | 3-channel RGB | **5-channel:** RGB + Target Inc + Neighbor Exc | 3-channel RGB | $56 \times 56\ \mu\text{m}$ RGB crop ($224 \times 224$ px) |
| **Stain Prior** | Explicit Macenko $H$-channel DoG filter | Implicit foundation feature maps | None (Prompt clicks act as spatial priors) | Implicit HV distance fields | Spatial transcriptomics marker supervision |
| **Cell Taxonomy** | 3 classes (Tumor, Immune, Other) | 13 classes (Granular immune & stromal) | Generic nuclear boundary | 5–6 generic classes | 23 classes (7 pan-tissue + 16 organ-specific) |
| **Post-Processing** | Calibrated GPU watershed ($r_e, d_m, A_{\text{min}}$) | CellViT HV regression & post-processing | Gaussian exclusion thresholding | Energy-landscape horizontal-vertical watershed | Per-organ linear head routing |
| **WSI Artifact QA** | **Yes (Built-in WSI-QA module)** | External tiling / QuPath integration | Relies on user click placement | Relies on external tiling filter | Relies on upstream cell segmenter |
| **Primary Role** | High-throughput clinical WSI quantification | High-granularity TME phenotyping | Ground-truth dataset curation & active learning | Automated pan-cancer segmentation | High-precision single-cell molecular typing |

---

## Practical Implementation & QuPath Workflow

CellQuant-Net is implemented in PyTorch and available at [Falah-Jabar-Rahim/CellQuant-Net](https://github.com/Falah-Jabar-Rahim/CellQuant-Net):

### 1. Installation & Environment

```bash
git clone https://github.com/Falah-Jabar-Rahim/CellQuant-Net.git
cd CellQuant-Net
chmod +x install.sh
./install.sh
conda activate cellquantnet
python verify_installation.py
```

### 2. End-to-End Whole-Slide Inference CLI

Place `.svs` or `.ndpi` slides in `input/`, download weights into `CP-Net/weights/` and `WSI_QA/pretrained_ckpt/`, and execute:

```bash
python run_cellquant_net.py \
    --cpu_workers 32 \
    --batch_size 128 \
    --cell_connectivity \
    --model_type PanNuke.pth
```

Available pretrained checkpoints include:
- `PanNuke.pth`: Multi-organ ($40\times$)
- `SegPath.pth`: Multi-organ ($40\times$)
- `CoNSeP.pth`: Single-organ Colon ($40\times$)
- `Lizard.pth`: Single-organ Colon ($20\times$)
- `ILCD.pth`: Single-organ Liver ($40\times$)
- `NuCLS.pth`: Single-organ Breast ($20\times$)
- `PanopTILs.pth`: Single-organ Breast ($40\times$)
- `TNMI20x.pth` / `TNMI40x.pth`: Single-organ Lung ($20\times$ / $40\times$)

### 3. QuPath Interactive Review

CellQuant-Net generates zero-friction visualization artifacts directly inside `output/CP_Net/<WSI_NAME>/`:
1. Open the analyzed whole-slide image in **QuPath**.
2. Drag and drop `qupath_cells.geojson` into the QuPath window to render all classified cellular polygons (Tumor, Immune, Other).
3. Drag and drop `qupath_cells_connectivity.geojson` to visualize the spatial cell-cell interaction graph.
4. Inspect `WSI_Summary.xlsx` and `cell_type_stats.csv` for summary infiltration metrics.

---

## Vault Navigation & Related Notes

- **Dedicated Tool Profile:** [CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md)
- **Cell Instance Segmentation & Foundation Models:** [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md), [NuClick](../computational-digital-and-mathematical-pathology/nuclick.md), [CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md), [HoVer-NeXt](../computational-digital-and-mathematical-pathology/hover-next.md), [HistoGen: Histopathology Cell Nuclei Image Generation Tool](HistoGen%20-%20Histopathology%20Cell%20Nuclei%20Image%20Generation%20Tool.md)
- **Software Ecosystem & Tools:** [Digital Pathology Software](../computational-digital-and-mathematical-pathology/digital-pathology-software.md), [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md), [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md), [From Samples to Knowledge 2025: QuPath Training Course](From%20Samples%20to%20Knowledge%202025%20-%20QuPath%20Training%20Course.md), [Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images](Multiplex%20Immunofluorescence%20Image%20Analysis%20with%20QuPath%20-%20Part%201.md)
- **Literature Reviews:** [Articles on computational, digital, and mathematical pathology](../computational-digital-and-mathematical-pathology/articles-on-computational-digital-and-mathematical-pathology.md), [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md), [A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping](A%20Hybrid%20MIL%20Approach%20Leveraging%20Convolution%20and%20State-Space%20Model%20for%20Whole-Slide%20Image%20Cancer%20Subtyping.md)

<!-- tolaria:related:start -->

## See also

* [Articles on computational, digital, and mathematical pathology](../computational-digital-and-mathematical-pathology/articles-on-computational-digital-and-mathematical-pathology.md)
* [CellQuant-Net](../computational-digital-and-mathematical-pathology/cellquant-net.md)
* [CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md)
* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [Digital Pathology Software](../computational-digital-and-mathematical-pathology/digital-pathology-software.md)
* [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md)
* [HoVer-NeXt](../computational-digital-and-mathematical-pathology/hover-next.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Machine Learning](../statistics-and-bioinformatics/machine-learning/README.md)
* [NuClick](../computational-digital-and-mathematical-pathology/nuclick.md)

<!-- tolaria:related:end -->
