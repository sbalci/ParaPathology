---
type: Tool
status: Evergreen
language: en
title: "CellQuant-Net"
aliases:
  - "CellQuant-Net"
  - "CellPrior-Net"
  - "CP-Net"
  - "cellquant-net"
order: 165
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]"
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[NuClick]]"
  - "[[HoVer-NeXt]]"
  - "[[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]"
  - "[[Digital Pathology Software]]"
  - "[[From Samples to Knowledge 2025: QuPath Training Course]]"
  - "[[Image Analysis]]"
  - "[[Digital Pathology]]"
repo: https://github.com/Falah-Jabar-Rahim/CellQuant-Net
paper: https://doi.org/10.1016/j.jpi.2026.100716
source_type: repository
external: true
adopted: false
engagement: active
license: Research / Academic
last_reviewed: 2026-09-20
---

# CellQuant-Net

An end-to-end computational pathology quantification pipeline integrating automated WSI quality assessment (WSI-QA), prior-guided nuclei detection and 3-class classification (**CellPrior-Net / CP-Net**), and spatial cell-cell neighborhood network analysis. Developed by Falah Jabar, Pasquale Lombardi, Aria Torkpour, David J. Pinato, Mehrdad Rakaee, and colleagues across Imperial College London, University Hospital of North Norway, and UiT The Arctic University of Norway (*Journal of Pathology Informatics* 2026).

- **GitHub Repository:** [Falah-Jabar-Rahim/CellQuant-Net](https://github.com/Falah-Jabar-Rahim/CellQuant-Net)
- **Foundational Paper:** Jabar F, Lombardi P, Torkpour A, et al. *CellPrior-Net: Prior-guided nuclei detection and classification for H&E whole-slide images.* Journal of Pathology Informatics 22 (2026): 100716. [DOI: 10.1016/j.jpi.2026.100716](https://doi.org/10.1016/j.jpi.2026.100716); [arXiv:2607.00802](https://arxiv.org/abs/2607.00802)
- **Local PDF:** [1-s2.0-S2153353926001781-main.pdf](file:///K:/DownloadsK/1-s2.0-S2153353926001781-main.pdf)
- **Video Walkthrough:** [YouTube Tutorial](https://youtu.be/RhCJnUfuYkA?is=Jc4keTUtecEcjeZd)
- **Companion Literature Review:** [[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]

---

## Why CellQuant-Net Matters

While many instance segmentation models exist in computational pathology (e.g., CellViT, HoVer-Net, [[HoVer-NeXt]], [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]), clinical whole-slide deployment is typically hindered by:
1. **Unfiltered Slide Artifacts:** Tissue folds, air bubbles, out-of-focus blur, knife chatter lines, and pathologist grease-pen markings cause unguided algorithms to generate thousands of false-positive nuclear detections.
2. **Computational Sluggishness:** Transformer-based ViT models require 15 to 45 minutes per gigapixel WSI and consume excessive GPU memory.
3. **Complex Stain Variability:** Heavy models often fail on out-of-distribution scanners and stain batches because they process uncalibrated RGB pixels.

CellQuant-Net addresses these issues as a **cohesive 4-stage pipeline**:

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               CELLQUANT-NET END-TO-END PIPELINE                                       │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  [ Whole-Slide Image (SVS / NDPI / TIFF) ]
                     │
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  MODULE 1: WSI Quality Assessment (WSI-QA)                          │
  │  • Deep artifact segmentation network (DHUnet / Swin / ConvNeXt)    │
  │  • Discards: background void, blur, tissue folds, pen markings      │
  │  • Yields: Qualified/ tile directory, WSI_Summary.xlsx, heatmaps    │
  └──────────────────┬──────────────────────────────────────────────────┘
                     │ High-Quality Tissue Tiles
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  MODULE 2: Prior-Guided CellPrior-Net (CP-Net)                      │
  │  • Macenko stain deconvolution extracts pure Hematoxylin (H)        │
  │  • Multi-scale Difference of Gaussians (DoG) nuclear prior map      │
  │  • 4-Channel input: [RGB + DoG] fed to UniRepLKNet-N CNN            │
  │  • Multi-task heads: binary segmentation + 3-class classification   │
  │  • GPU-accelerated morphological watershed separation               │
  └──────────────────┬──────────────────────────────────────────────────┘
                     │ Classified Instance Coordinates (Tumor, Immune, Other)
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  MODULE 3: Spatial Neighborhood Network Analysis                    │
  │  • Radius-based cell graph construction                             │
  │  • Cell-to-cell interaction matrices & connectivity edges           │
  │  • Saves: cell_neighborhood/ & connectivity_edges.csv               │
  └──────────────────┬──────────────────────────────────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────────────────────────────────┐
  │  MODULE 4: Downstream Metrics & QuPath GeoJSON Integration          │
  │  • Tumor-Infiltrating Lymphocyte (TIL) density & class percentages  │
  │  • qupath_cells.geojson (polygons with classification labels)       │
  │  • qupath_cells_connectivity.geojson (network edges)                │
  │  • Ready for zero-friction drag-and-drop pathologist audit          │
  └─────────────────────────────────────────────────────────────────────┘
```

---

## Core Innovations of CellPrior-Net (CP-Net)

### 1. Stain Deconvolution & DoG Prior Map

Rather than relying purely on data-driven RGB features, CP-Net leverages the biochemical basis of histology:
- Converts RGB pixels to optical density ($\text{OD} = -\log_{10}((I+1)/240)$).
- Computes eigenvalue decomposition of the OD covariance matrix to isolate the hematoxylin concentration channel $C_H$.
- Convolves $C_H$ with multi-scale Difference of Gaussians (DoG) kernels ($k=\sqrt{2}$):
  - **$40\times$:** $\sigma \in \{2.5, 3.5, 4.5\}$
  - **$20\times$:** $\sigma \in \{1.6, 2.4, 3.2\}$
- The resulting maximum DoG response is concatenated with RGB into a **4-channel tensor** $[B, 4, 256, 256]$, supplying an explicit spatial prior of chromatin condensation that drastically improves cell separation in hypercellular areas.

### 2. UniRepLKNet-N Large-Kernel Backbone

- Replaces vision transformers with **UniRepLKNet-N**, utilizing large-kernel depthwise convolutions (up to $31\times 31$) reparameterized into small kernels.
- Delivers an ultra-wide effective receptive field (ERF) matching transformers while retaining linear convolutional computational scaling and extreme hardware throughput.

### 3. GPU-Accelerated Watershed Post-Processing

- Avoids sluggish CPU watershed algorithms.
- Combines morphological erosion ($r_e$), Euclidean distance mapping ($s_d$), and peak local maxima detection ($d_m, t_{\text{min}}$) executed directly via PyTorch/CuPy with multithreaded watershed segmentation.
- Calibrated hyperparameters:
  - $20\times$: $r_e = 1, s_d = 5 \times 5, d_m = 4, t_{\text{min}} = 2, A_{\text{min}} = 10\ \text{px}$.
  - $40\times$: $r_e = 2, s_d = 5 \times 5, d_m = 8, t_{\text{min}} = 2, A_{\text{min}} = 20\ \text{px}$.

---

## Benchmark Performance & Runtime

Evaluated against 10 state-of-the-art pipelines (**CellViT**, **CellViT++**, **Cerberus**, **HoVer-Net**, **NuLite**, **PointNu-Net**, **CellDetr**, **CellSAM**, **LKCell**, **TSFD-Net**) on 8 public and internal datasets comprising **~10.4 million nuclei** (PanNuke, CoNSeP, Lizard, NuCLS, PanopTILs, SegPath, TNMI, and ILCD):
- **Pareto Optimal Frontier:** Forms the optimal Pareto frontier with CellViT and CellDETR, delivering near-identical panoptic quality (PQ) while running **$2\times$ to $3\times$ faster**.
- **WSI Runtime Benchmark (Table 1):**
  - **$20\times$ Slide ($31.8\text{k} \times 25.2\text{k}$ px):** CellViT = 5.15 min vs. **CP-Net = 2.16 min**; Total CellQuant-Net (QA + CP-Net + Post) = **5.77 min**.
  - **$40\times$ Slide ($44.1\text{k} \times 70.5\text{k}$ px):** CellViT = 8.30 min vs. **CP-Net = 2.77 min**; Total CellQuant-Net = **16.83 min**.
- **Prognostic Proof-of-Concept:** On 13 hepatocellular carcinoma (HCC) WSIs from the AB-real cohort, TIL density derived by CellQuant-Net significantly predicted patient overall survival ($p = 0.006$, log-rank).

---

## Pre-Trained Weights Catalog

| Model Checkpoint | Organ Scope | Magnification | Training Target |
| :--- | :--- | :---: | :--- |
| `PanNuke.pth` | Multi-organ (19 tissues) | $40\times$ | Pan-cancer baseline |
| `SegPath.pth` | Multi-organ | $40\times$ | Multi-center validation |
| `CoNSeP.pth` | Colorectal | $40\times$ | High-resolution colon |
| `Lizard.pth` | Colorectal | $20\times$ | Standard clinical $20\times$ colon |
| `ILCD.pth` | Liver (HCC) | $40\times$ | Hepatocellular carcinoma |
| `NuCLS.pth` | Breast | $20\times$ | Breast cancer TILs & tumor |
| `PanopTILs.pth` | Breast | $40\times$ | High-density stromal TILs |
| `TNMI20x.pth` | Non-Small Cell Lung | $20\times$ | NSCLC tumor microenvironment |
| `TNMI40x.pth` | Non-Small Cell Lung | $40\times$ | NSCLC high-power fields |

---

## Installation & CLI Usage

### 1. Installation

```bash
git clone https://github.com/Falah-Jabar-Rahim/CellQuant-Net.git
cd CellQuant-Net
chmod +x install.sh
./install.sh
conda activate cellquantnet
python verify_installation.py
```

### 2. Whole-Slide Execution

Place WSIs in the `input/` folder, place model checkpoints in `CP-Net/weights/` and `WSI_QA/pretrained_ckpt/`, then run:

```bash
python run_cellquant_net.py \
    --cpu_workers 32 \
    --batch_size 128 \
    --cell_connectivity \
    --model_type PanNuke.pth
```

### 3. QuPath Drag-and-Drop Visualization

All outputs are structured under `output/`:
- `output/QA/<WSI_NAME>/`: High-quality and artifact masks, thumbnails, tile statistics.
- `output/CP_Net/<WSI_NAME>/qupath_cells.geojson`: Nuclear instance geometries and classes.
- `output/CP_Net/<WSI_NAME>/qupath_cells_connectivity.geojson`: Spatial cell connectivity graph.

Simply open the slide in **QuPath** and drag both `.geojson` files onto the slide viewer.

---

## Comparison with Vault Tools

- **CellQuant-Net vs. [[NuClick]]:** NuClick is an interactive, point-prompted annotation engine optimized for human-in-the-loop curation of training datasets. CellQuant-Net is an unprompted, fully automated whole-slide inference and TME quantification engine.
- **CellQuant-Net vs. [[HoVer-NeXt]] / CellViT:** HoVer-NeXt and CellViT rely on dense horizontal-vertical distance map decoders or transformer encoders that are computationally intensive. CellQuant-Net uses a large-kernel CNN with a physical hematoxylin DoG prior, cutting whole-slide inference time by half or more while adding built-in artifact QA filtering.
- **CellQuant-Net vs. [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]:** HistoPLUS focuses on granular 13-class phenotyping (rare immune populations, plasma cells, endothelium) using distilled ViTs. CellQuant-Net focuses on high-speed clinical WSI quantification into the primary 3 classes (Tumor, Immune, Other) with spatial connectivity networks.

---

## Related Notes

- **Foundational Paper:** [[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]
- **Cell Instance Segmentation:** [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]], [[NuClick]], [[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]], [[HoVer-NeXt]]
- **Software Ecosystem:** [[Digital Pathology Software]], [[From Samples to Knowledge 2025: QuPath Training Course]], [[Cytomine]], [[Micro-Manager]], [[Articles on computational, digital, and mathematical pathology]]
