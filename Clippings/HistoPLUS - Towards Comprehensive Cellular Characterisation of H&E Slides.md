---
type: Clipping
status: Evergreen
language: en
title: "HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides"
source: "https://github.com/owkin/histoplus"
source_type: article
author:
  - "[[Benjamin Adjadj]]"
  - "[[Pierre-Antoine Bannier]]"
  - "[[Guillaume Horent]]"
  - "[[Sebastien Mandela]]"
  - "[[Aurore Lyon]]"
  - "[[Kathryn Schutte]]"
  - "[[Ulysse Marteau]]"
  - "[[Valentin Gaury]]"
  - "[[Laura Dumont]]"
  - "[[Thomas Mathieu]]"
  - "[[Reda Belbahri]]"
  - "[[Benoît Schmauch]]"
  - "[[Eric Durand]]"
  - "[[Katharina Von Loga]]"
  - "[[Lucie Gillet]]"
published: 2026-02-18
created: 2026-09-19
description: "HistoPLUS combines an active-learning pan-cancer dataset (HistoTRAIN: 108k nuclei, 13 cell types, 6 indications) with a compact CellViT architecture powered by a distilled pathology foundation model (Bioptimus H0-mini, 86M params). Achieves 5.2% higher detection quality and 23.7% higher classification F1 over state-of-the-art models with 5x fewer parameters, unlocks 7 understudied cell populations, matches ViT-Huge backbones, and robustly generalizes zero-shot to unseen indications."
tags:
  - "clippings"
order: 146
belongs_to: "[[Clippings]]"
related_to:
  - "[[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]"
  - "[[HoVer-NeXt]]"
  - "[[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping]]"
  - "[[Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images]]"
  - "[[From Samples to Knowledge 2025: QuPath Training Course]]"
  - "[[Digital Pathology]]"
  - "[[Machine Learning]]"
  - "[[Image Analysis]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
---

# HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides

## Summary

Accurate single-cell detection, boundary segmentation, and phenotypic classification on standard hematoxylin and eosin (H&E) whole-slide images (WSIs) are prerequisites for quantifying the tumor microenvironment (TME). Profiling spatial cellular interactions—such as tumor-associated neutrophil (TAN) infiltration, cancer-associated fibroblast (CAF) stromal remodeling, plasma cell clustering, and microvascular invasion—directly predicts disease progression and immunotherapy responsiveness. However, existing computational pathology methods face two crippling bottlenecks:
1. **The Understudied Cell-Type Deficit in Public Corpora:** Landmark datasets (PanNuke, CoNSeP, Lizard, MoNuSAC) either provide segmentation masks without lineage labels, provide only coarse bounding boxes, or restrict classifications to 4–6 broad categories (neoplastic, healthy epithelial, inflammatory, connective/stroma, dead). Clinically critical non-lymphoid immune populations (neutrophils, eosinophils, macrophages), plasmocytes, vascular/pericytic elements (endothelium, smooth muscle), and key cytologic events (mitotic figures, apoptotic bodies) remain absent or heavily underrepresented.
2. **The Foundation Model Scale Paradox:** Pretrained pathology foundation models (PFMs) such as UNI2 (681M) and Virchow2 (632M) or vision models like SAM-Huge (636M) incur massive compute, memory, and latency penalties. Yet for cellular instance segmentation, parameter scaling exhibits steep diminishing returns: segmentation quality improvements hit a plateau ($\Delta SQ \le 1.5$), leaving smaller clinics and high-throughput research pipelines bottlenecked by GPU compute.

Published in the *Journal of Pathology Informatics* (2026, [DOI: 10.1016/j.jpi.2026.100696](https://doi.org/10.1016/j.jpi.2026.100696); [arXiv:2508.09926](https://arxiv.org/abs/2508.09926)) by Benjamin Adjadj, Pierre-Antoine Bannier, Guillaume Horent, Lucie Gillet, and collaborators across **Owkin**, **Bioptimus**, and the **MOSAIC consortium**, **HistoPLUS** resolves both dilemmas through an active-learning curation engine and a distilled foundation-model architecture:
- **HistoTRAIN & Active-Learning Curation (108,722 Nuclei):** Curated across 739 WSIs spanning 6 cancer indications (bladder, colon, lung adenocarcinoma, lung squamous cell carcinoma, mesothelioma, and pancreatic adenocarcinoma). Rather than passive labeling, an active-learning pipeline deployed 3 parallel arms (Phikon feature diversity clustering, lightweight rare-cell MLP detectors, and BALD epistemic uncertainty sampling) combined with **NuClick** automated boundary propagation from expert point annotations.
- **HistoVAL Multi-Reader Consensus Benchmark (69,108 Nuclei):** Established across 530 ROIs ($112 \times 112\ \mu\text{m}$ at $40\times$) from 248 slides across 6 independent cohorts from the MOSAIC consortium. Ground truth was forged via Hungarian instance matching (IoU $>0.4$) across 3 independent pathologist annotations per tile, retaining only consensus nuclei ($\ge 2$ agreeing pathologists) with majority-voted phenotypes. Includes 2 completely unseen cancer indications: ovarian serous cystadenocarcinoma (OV) and breast invasive carcinoma (BRCA).
- **Distilled PFM Integration within CellViT (H0-mini):** Integrates the compact **H0-mini** foundation model (86M parameters, distilled from Bioptimus' H-Optimus-0 via joint DINO class-token and iBOT masked patch distillation) as the ViT encoder inside a 3-branch CellViT decoder (nuclear prediction, horizontal-vertical distance regression, and 14/15-class nuclei typing with Focal Tversky loss).
- **Empirical Superiority:** Outperforms competing state-of-the-art models by **+5.2% in Detection Quality (DQ)** and **+23.7% in overall classification F1 score**, achieving statistically significant gains on 8 of 13 cell types and unlocking 7 understudied lineages. Matches the panoptic and detection quality of ViT-Huge models (UNI2, Virchow2) while utilizing **$5\times$ fewer parameters** and running **$2.1\times$ faster**.
- **Zero-Shot Indication Generalization:** Robustly transfers to unseen breast cancer (DQ 0.836, SQ 0.801, Lymphocyte F1 0.799) and ovarian cancer (DQ 0.805, SQ 0.803, Cancer Cell F1 0.682).
- **Production Open Source:** Complete inference CLI, Python API, and GeoJSON QuPath export pipelines are released on GitHub ([owkin/histoplus](https://github.com/owkin/histoplus)), with checkpoints available on Hugging Face ([Owkin-Bioptimus/histoplus](https://huggingface.co/Owkin-Bioptimus/histoplus)).

---

## Architectural Blueprint & Inference Mechanics

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   HISTOPLUS INFERENCE PIPELINE                                          │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

 [ Whole Slide Image (H&E: .svs, .ndpi, .tiff) ]
                        │
                        ▼
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 1. DEEPZOOM TILING & PRE-PROCESSING                                                                  │
 │    • MPP Selection: 0.25 µm/px (40×, tile size 448 px) or 0.50 µm/px (20×, tile size 224 px)          │
 │    • Inference Grid: 784 × 784 px tiles (multiples of ViT patch sizes 14 & 16)                      │
 │    • Border Overlap: 64 px overlap between consecutive tiles to eliminate edge boundary artifacts    │
 │    • Normalization: Bioptimus Mean (0.707, 0.579, 0.704), Std (0.212, 0.230, 0.178)                   │
 └──────────────────────────────────────────────────┬───────────────────────────────────────────────────┘
                                                    │
                                                    ▼
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 2. DISTILLED PFM ENCODER (Bioptimus H0-mini ViT-Base Backbone — 86M Params)                          │
 │    • Distilled from H-Optimus-0 via DINO global class token + iBOT local masked patch supervision     │
 │    • Dynamic 2D positional embedding interpolation accommodating multi-scale inputs                  │
 │    • Multi-Scale Feature Extraction: Skips tapped from Transformer layers 3, 5, 7, and 11           │
 └──────────────────────────────────────────────────┬───────────────────────────────────────────────────┘
                                                    │ Multi-scale feature tokens
                                                    ▼
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 3. MULTI-TASK CELLVIT DECODER (Isolated Upsampling Branches)                                         │
 │    ├── [Branch 1: Nuclei Prediction (NP)] ──► Binary boundary mask (Weighted BCE + Dice Loss)        │
 │    ├── [Branch 2: Horizontal-Vertical (HV)] ─► Distance gradients (x, y) to centroid (MSE Loss)       │
 │    └── [Branch 3: Nuclei Type (NT)] ─────────► 15-class instance logits (Focal Tversky Loss)         │
 └──────────────────────────────────────────────────┬───────────────────────────────────────────────────┘
                                                    │
                                                    ▼
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 4. TWO-STAGE HOVERNET WATERSHED POST-PROCESSING                                                      │
 │    • Sobel filtering on horizontal & vertical normalized gradient vectors                            │
 │    • Nuclear mountain inversion (distance basin mapping with Gaussian blur 3×3)                      │
 │    • Marker-controlled watershed instance boundary separation                                        │
 │    • Majority voting on Nuclei Type (NT) channel within each segmented instance mask                │
 └──────────────────────────────────────────────────┬───────────────────────────────────────────────────┘
                                                    │
                                                    ▼
                       ┌────────────────────────────────────────────────────────┐
                       │  Outputs: Polygon Contours, Centroids, Bounding Boxes  │
                       │  + 13-Class Phenotypic Labels & Prediction Confidence  │
                       │  (Exportable to Native JSON and QuPath-Ready GeoJSON)  │
                       └────────────────────────────────────────────────────────┘
```

### Why H0-mini Defeats ViT-Huge Foundation Models for Single-Cell Tasks

A central finding of the HistoPLUS evaluation is that scaling vision transformer parameters from 86M (ViT-Base) to $>600\text{M}$ (ViT-Huge/Giant) yields negligible benefit for nuclear segmentation and classification:
1. **Segmentation Quality (SQ) Invariance:** Across all tested backbones (SAM-B, SAM-H, Phikon, Hibou-B, H0-mini, UNI2, Virchow2), the average segmentation quality (mean IoU of matched nuclei) varied by less than **$\Delta SQ \le 1.5\%$**. Nuclear boundary delineation on H&E is governed primarily by local gradient contrast (hematoxylin-rich chromatin vs. cytoplasmic eosin) captured effectively by high-resolution multi-scale skip decoders, rendering giant receptive fields redundant.
2. **Detection Quality Parity:** In external multi-cohort validation on HistoVAL ($n=530$), H0-mini matched both UNI2 and Virchow2 with an identical Detection Quality score of **0.753 [0.742–0.763]**.
3. **The Compute & Latency Dividend:** By deploying H0-mini instead of UNI2 or Virchow2, HistoPLUS slashes parameter count by **$5.1\times$** and inference runtime by **$2.1\times$**. An entire surgical resection whole-slide image can be parsed in 20 to 40 minutes on a standard single NVIDIA Tesla T4 GPU, making whole-cohort TME analysis computationally accessible.

---

## Dataset Curation & Multi-Reader Ground Truth

```typescript
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                              HISTOPLUS DATA ENGINE & BENCHMARKS                                      │
 └──────────────────────────────────────────────────────────────────────────────────────────────────────┘

  [ 739 TCGA Slides (6 Cancers) ]                          [ 248 MOSAIC Slides (6 Cohorts) ]
                │                                                          │
                ▼                                                          ▼
  ┌───────────────────────────┐                              ┌───────────────────────────┐
  │ 3-Arm Active Learning:    │                              │ Multi-Pathologist Review: │
  │ 1. Phikon K-means (K=20)  │                              │ • 3 pathologists / tile   │
  │ 2. Rare-Cell MLPs         │                              │ • Point annotations       │
  │ 3. BALD Uncertainty (>90%)│                              │ • NuClick boundary exp.   │
  └─────────────┬─────────────┘                              └─────────────┬─────────────┘
                │                                                          │
                ▼                                                          ▼
  ┌───────────────────────────┐                              ┌───────────────────────────┐
  │ Expert Point Annotations  │                              │ Hungarian Instance Match: │
  │ on Cytomine Platform      │                              │ • IoU > 0.4 consensus     │
  │             │             │                              │ • Retain >= 2 raters      │
  │             ▼             │                              │ • Centroid average        │
  │ NuClick Contour Expansion │                              │ • Majority class voting   │
  └─────────────┬─────────────┘                              └─────────────┬─────────────┘
                │                                                          │
                ▼                                                          ▼
  ┌───────────────────────────┐                              ┌───────────────────────────┐
  │ HistoTRAIN Training Set   │                              │ HistoVAL Validation Set   │
  │ • 108,722 nuclei          │                              │ • 69,108 consensus nuclei │
  │ • 1,415 tiles (448 × 448) │                              │ • 530 ROIs (112 × 112 µm) │
  │ • 6 Training Indications  │                              │ • 4 Seen + 2 Unseen Cancers│
  │   (BLCA, COAD, LUAD,      │                              │   (Adds Breast & Ovarian) │
  │    LUSC, MESO, PAAD)      │                              └───────────────────────────┘
  └───────────────────────────┘
```

### The 13 Cell-Type Taxonomy

HistoPLUS expands cell characterization from broad 5-class categories to **13 clinically relevant cell lineages and morphological events**:

| Broad Compartment | Granular Cell Type | Morphological & Biological Significance |
| :--- | :--- | :--- |
| **Neoplastic** | **Cancer cell** | Pleomorphic, enlarged nuclei, hyperchromasia, prominent nucleoli, high N:C ratio |
| **Immune (Lymphoid)** | **Lymphocytes** | Small, round, hyperchromatic spherical nuclei, scant cytoplasm; sTILs titration |
| | **Plasmocytes (Plasma cells)** | Eccentric clock-face chromatin, cartwheel pattern, perinuclear hof; chronic B-cell immunity |
| **Immune (Myeloid / Innate)** | **Macrophages** | Large indented/bean-shaped nuclei, delicate foamy/vacuolated cytoplasm; phagocytic stroma |
| | **Neutrophils** | Multi-lobed (3–5 lobes) polymorphonuclear morphology; acute inflammation, immunosuppressive TANs |
| | **Eosinophils** | Bilobed nuclei, intense bright eosinophilic cytoplasmic granules; allergic/anti-parasitic reactions |
| **Stroma & Vasculature** | **Fibroblasts** | Elongated, slender, spindle-shaped nuclei embedded within collagenous ECM; CAFs |
| | **Endothelial cells** | Flattened, attenuated nuclei lining vascular lumen channels; angiogenesis profiling |
| | **Muscle cells (Smooth muscle)** | Elongated cigar-shaped/blunt-ended nuclei organized in parallel bundles |
| **Normal Tissue Context** | **Epithelial (Non-cancerous)**| Uniform, polarized cuboidal or columnar nuclei lining benign glandular or ductal structures |
| | **Red blood cells (Erythrocytes)** | Anucleate biconcave discs, intense eosinophilic cytoplasm; vascular landmarks |
| **Cytologic Dynamics** | **Mitotic figures** | Condensed, dark, hairy chromatin aggregates lacking nuclear envelope; proliferative index |
| | **Apoptotic bodies** | Pyknotic, fragmented, condensed round chromatin spheres with halo; cellular turnover |

*(Note: In implementation, an additional background class and minor stromal class are indexed, yielding 15 internal classes).*

---

## Benchmark Results & Empirical Findings

### 1. External Multi-Cohort Validation on HistoVAL ($n=530$)

In external testing against the general-purpose vision foundation model (SAM) and leading pathology models across 4 independent cohorts, HistoPLUS established superior detection and classification:

| Model Architecture | Encoder Backbone | Encoder Params | Detection Quality (DQ) | Average Classification F1 | Plasmocytes F1 | Smooth Muscle F1 | Tumor Cells F1 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **CellViT SAM-B** | SAM-Base | 91M | 0.716 | Baseline | 0.269 [0.219–0.322] | 0.186 [0.110–0.257] | 0.456 [0.414–0.493] |
| **CellViT Phikon** | Phikon (iBOT) | 86M | 0.732 | +16.5% vs SAM-B | 0.384 | 0.291 | 0.521 |
| **CellViT Hibou-B** | Hibou-Base | 86M | 0.738 | +17.2% vs SAM-B | 0.395 | 0.312 | 0.534 |
| **CellViT SAM-H** | SAM-Huge | 636M | 0.741 | +8.4% vs SAM-B | 0.352 | 0.264 | 0.512 |
| **CellViT Virchow2** | Virchow2 (DINOv2) | 632M | 0.753 [0.742–0.763] | +17.4% vs SAM-H | 0.461 | 0.389 | 0.579 [0.544–0.613] |
| **CellViT UNI2** | UNI2 (DINOv2) | 681M | 0.753 [0.742–0.763] | +26.7% vs SAM-H | 0.472 | 0.398 | **0.603** [0.570–0.634] |
| **HistoPLUS (Ours)**| **H0-mini (Distilled)** | **86M** | **0.753** [0.742–0.763] | **+36.5% vs SAM-B** | **0.483** [0.433–0.529]* | **0.403** [0.282–0.515]* | 0.583 [0.544–0.619] |

*\* Indicates statistically significant gain over baselines ($p < 0.001$).*

> **Key Performance Takeaways:**
> - **Overall Metrics:** HistoPLUS delivers a **+5.2% gain in Detection Quality** and a **+23.7% gain in macro-F1 classification** over existing published baselines.
> - **Understudied Cell Unlocking:** Gains are most pronounced on rare populations: plasmocytes jump from 0.269 to **0.483** (+79.5% relative), smooth muscle jumps from 0.186 to **0.403** (+116.7% relative).
> - **Efficiency:** H0-mini achieves parity with 681M-parameter foundation models while consuming **$5\times$ fewer parameters** and running in less than half the wall-clock time.

---

### 2. Zero-Shot Indication Transfer (Unseen Cancers)

To test cross-organ generalizability, HistoPLUS was evaluated on two cancer indications completely omitted from the training corpus:

| Unseen Indication | Sample Size ($n$) | Detection Quality (DQ) | Segmentation Quality (SQ) | Lymphocytes F1 | Cancer Cells F1 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Breast Invasive Carcinoma (BRCA)** | 90 ROIs | **0.836** [0.819–0.852] | **0.801** [0.796–0.807] | **0.799** [0.757–0.829] | 0.475 [0.302–0.620] |
| **Ovarian Serous Cystadenocarcinoma (OV)**| 50 ROIs | **0.805** [0.782–0.825] | **0.803** [0.795–0.810] | **0.639** [0.585–0.676] | **0.682** [0.594–0.751] |

Despite never encountering breast or ovarian morphology during training, HistoPLUS maintained robust boundary delineation ($SQ > 0.80$) and accurate identification of tumor-infiltrating lymphocytes ($F1 = 0.80$ in breast), proving high generalizability across novel tissue architectures.

---

## Code & Practical Workflows

### 1. Installation

```bash
# System dependencies (Ubuntu/Debian)
sudo apt-get install openslide-tools

# Install directly from GitHub
git clone https://github.com/owkin/histoplus.git
cd histoplus
pip install -e .
```

### 2. High-Throughput WSI Inference (CLI)

```bash
# Run cell detection, segmentation, and typing across whole slides
histoplus \
    --slides /path/to/slide.svs \
    --export_dir ./predictions/ \
    --batch_size 16
```

### 3. Native Python Inference API

```python
import openslide
from histoplus.extract import extract
from histoplus.helpers.hub import histoplus_cellvit_segmentor_40x
from histoplus.helpers.tiling import get_wsi_coordinates

# 1. Open Whole Slide Image
slide_path = "sample_colon_wsi.svs"
slide = openslide.OpenSlide(slide_path)

# 2. Load Pretrained 40x Segmentor (H0-mini ViT-Base Backbone, MPP 0.25)
segmentor = histoplus_cellvit_segmentor_40x(inference_image_size=784)

# 3. Extract Grid Coordinates across Tissue Regions
coords, deepzoom_level = get_wsi_coordinates(slide, mpp=0.25, tile_size=784)

# 4. Extract Instance Masks & 13-Class Annotations
segmentation_results = extract(
    slide=slide,
    coords=coords,
    deepzoom_level=deepzoom_level,
    segmentor=segmentor,
    tile_size=784,
    batch_size=16,
    inference_tile_overlap=64, # Prevents border truncation
    n_workers=4,
)

# 5. Export to GeoJSON for QuPath
segmentation_results.to_geojson("./qupath_annotations.geojson")
```

---

## Vault Context & Comparative Positioning

Within the evolving computational pathology ecosystem, HistoPLUS occupies a complementary role alongside existing single-cell and foundation model architectures:

1. **HistoPLUS vs. [[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]:**
   - *Supervision Paradigm:* CytoFormer uses automated spatial transcriptomics (10x Xenium) to eliminate human annotations entirely across 15.4M cells, while HistoPLUS uses active-learning-guided multi-pathologist consensus (HistoVAL) combined with NuClick boundary propagation across 108k nuclei.
   - *Architecture & Routing:* CytoFormer routes single-cell crops through 16 organ-specific linear heads attached to a ViT-giant encoder; HistoPLUS uses an all-in-one CellViT with a compact 86M distilled foundation model (H0-mini) that performs simultaneous boundary segmentation and instance classification without requiring organ routing signals.
2. **Complementarity with Synthetic Benchmarks ([[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]):**
   - HistoGen, developed by FDA CDRH/DIDSR, generates synthetic nuclei conditioned on HoVer-Net horizontal/vertical distance maps to stress-test digital pathology algorithms. HistoPLUS provides the inverse clinical engine: parsing real-world WSIs, generating precise HV maps and instance boundaries, and classifying 13 native cell lineages.
3. **Foundation Model Trade-Offs ([[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]):**
   - Validates the core thesis established by Trager et al.: larger parameter counts (UNI2, Virchow2) do not equate to superior cellular performance. HistoPLUS proves that an 86M distilled model trained on diverse, active-learning-enriched morphology matches or surpasses 600M+ models on cell-level tasks while slashing runtime by more than half.
4. **Integration with QuPath & Spatial Toolchains:**
   - With native GeoJSON export, HistoPLUS outputs can be directly imported into [[From Samples to Knowledge 2025: QuPath Training Course]] and [[Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images]] to construct cell graphs, analyze spatial proximity distributions, and quantify localized tumor-immune niches.

---

## Related Notes

- **Cell Segmentation & Typing:** [[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]], [[HoVer-NeXt]], [[HistoGen: Histopathology Cell Nuclei Image Generation Tool]], [[Micro-Manager]]
- **Foundation Models & Trade-Offs:** [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]], [[Towards robust foundation models for digital pathology]], [[A distributional robustness margin for pathology foundation models]]
- **Slide-Level Aggregators & MIL:** [[A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping]], [[Weakly supervised MIL histopathological tumor segmentation]], [[TRICARE: Deep-learning triage of 3D pathology datasets]]
- **Spatial Histology & Workflows:** [[Tumor budding T-cell graphs for pT1 colorectal cancer]], [[Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images]], [[From Samples to Knowledge 2025: QuPath Training Course]]
- **Standards & Catalogs:** [[Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)]], [[Considerations for digital pathology displays]], [[What AI Can and Cannot Do in Pathology]]
