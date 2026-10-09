---
type: Clipping
status: Evergreen
language: en
title: "From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology"
aliases:
  - "From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology"
  - "STAMP Protocol"
  - "STAMP"
  - "El Nahhas 2024"
  - "El Nahhas 2025"
order: 100
belongs_to: "[[Clippings]]"
tags:
  - computational-pathology
  - biomarker-prediction
  - weakly-supervised-learning
  - multiple-instance-learning
  - foundation-models
  - whole-slide-imaging
  - stamp
  - kather-lab
  - nature-protocols
author:
  - "[[Omar S. M. El Nahhas]]"
  - "[[Marko van Treeck]]"
  - "[[Georg Wölflein]]"
  - "[[Michaela Unger]]"
  - "[[Marta Ligero]]"
  - "[[Tim Lenz]]"
  - "[[Sophia J. Wagner]]"
  - "[[Katherine J. Hewitt]]"
  - "[[Firas Khader]]"
  - "[[Sebastian Foersch]]"
  - "[[Daniel Truhn]]"
  - "[[Jakob Nikolas Kather]]"
url: "https://pubmed.ncbi.nlm.nih.gov/39285224/"
doi: "10.1038/s41596-024-01047-2"
pmid: "39285224"
related_to:
  - "[[STAMP]]"
  - "[[TRIDENT]]"
  - "[[PathoActivationAtlas]]"
  - "[[HERO: Histology Encoder for Robust Representation in Oncology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[Class visualizations and activation atlases for computational pathology]]"
---

# From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology

**Omar S. M. El Nahhas, Marko van Treeck, Georg Wölflein, Michaela Unger, Marta Ligero, Tim Lenz, Sophia J. Wagner, Katherine J. Hewitt, Firas Khader, Sebastian Foersch, Daniel Truhn, and Jakob Nikolas Kather**  
*Else Kröner Fresenius Center for Digital Health, TU Dresden; University Hospital RWTH Aachen; University Medical Center Mainz*  
*Nature Protocols* 20, 293–316 (published online September 16, 2024; January 2025 print issue).  
[DOI: 10.1038/s41596-024-01047-2](https://doi.org/10.1038/s41596-024-01047-2) | [PMID: 39285224](https://pubmed.ncbi.nlm.nih.gov/39285224/)  
Open-source software: [KatherLab/STAMP](https://github.com/KatherLab/STAMP) (v2.5) | [KatherLab/STAMP-Workbench](https://github.com/KatherLab/STAMP-Workbench)

---

## Executive Summary

Routine hematoxylin and eosin (H&E) histology slides contain rich phenotypic information that reflects underlying tumor genetics, molecular subtypes, and patient prognosis. However, connecting sub-visual morphological patterns in gigapixel whole-slide images (WSIs) to clinical and genomic biomarkers has historically been hindered by the **supervision dilemma**: manual pixel-level annotation of millions of cells across thousands of slides is impossible, while slide-level labels provide no spatial ground truth.

Weakly supervised multiple instance learning (MIL) resolves this by treating each whole-slide image as a "bag" of unannotated image patches ("instances") associated with a single patient-level ground-truth label. In this landmark protocol, El Nahhas et al. introduce **STAMP (Solid Tumor Associative Modeling in Pathology)**, an end-to-end, modular, and standardized computational pathology pipeline designed to bridge medical domain expertise with modern deep learning.

The protocol structures computational pathology research and deployment into five rigorous, reproducible stages:
1. **Formal Problem Definition:** Framing clinically viable prediction targets, decoupling patient-level outcomes from multi-slide resection specimens, and establishing evaluation criteria.
2. **Data Preprocessing & Embedding Extraction:** Automated tissue thresholding, artifact exclusion, multi-resolution patching, tile caching, and feature representation using 18+ state-of-the-art pathology foundation models.
3. **Slide & Patient-Level Modeling:** Aggregating instance representations via Vision Transformers, TransMIL, or multi-target Barspoon decoders, alongside whole-slide context encoders (TITAN, PRISM, GigaPath, COBRA2, EAGLE, MADELEINE, CHIEF).
4. **Statistical Evaluation & Cross-Validation:** Stratified patient-level $k$-fold cross-validation with bootstrapped 95% confidence intervals, ROC/PR vector analytics, and external validation deployment.
5. **Clinical Translation, Explainability & Agentic Orchestration:** Visualizing spatial attention heatmaps, generating discrete class maps, harvesting top-predictive morphological tiles, and providing native Model Context Protocol (FastMCP) tooling for AI-driven automation.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 THE 5-STAGE STAMP METHODOLOGICAL PIPELINE                              │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  STAGE 1: FORMAL PROBLEM DEFINITION
  [ Clinical Question ] ──> Define target (Binary / Multi-class / Multi-target / Regression / Survival)
                            Decouple Patient vs. Slide IDs; align metadata tables (clini_table, slide_table)
                                        │
                                        ▼
  STAGE 2: PREPROCESSING & FEATURE EXTRACTION
  [ Gigapixel WSIs ] (.svs, .ndpi, .mrxs, .tiff)
        │
        ├─► Background / Void filtering (brightness_cutoff: 240)
        ├─► Pyramidal tiling (tile_size_um: 256.0, tile_size_px: 224, default_slide_mpp: 1.0)
        ├─► Tile Cache (lossless PNG or 100× compressed JPG)
        └─► Unified Extractor Factory (18+ models: UNI2, Virchow2, CONCH1.5, H-Optimus, CTransPath)
                                        │ Standardized Slide Features (.h5)
                                        ▼
  STAGE 3: SLIDE & PATIENT ENCODING & MODELING
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tile-Level MIL Aggregation:                                                                      │
  │ • Vision Transformer (ViT) with ALiBi positional encoding                                        │
  │ • TransMIL (correlated self-attention across large tile sequences)                              │
  │ • Barspoon (Encoder-Decoder multi-target classification: KRAS + BRAF + NRAS simultaneously)     │
  │ Slide / Patient Context Encoders:                                                                │
  │ • TITAN, PRISM, GigaPath, COBRA2, EAGLE, MADELEINE, CHIEF (virtual slide axis concatenation)     │
  │ • Multi-Modal Fusion: Integrate tabular clinical covariates alongside histology embeddings      │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │ Trained Checkpoints (.ckpt)
                                    ▼
  STAGE 4: EVALUATION & STATISTICAL RIGOR
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ • Stratified Patient-Level k-Fold Cross-Validation (prevents intra-patient test set leakage)     │
  │ • Metrics with 95% CIs: AUROC, AUPRC, Sensitivity, Specificity, F1, Log-Rank C-index             │
  │ • Multi-Model Ensembling & External Deployment (`stamp deploy`)                                  │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │ Validated Diagnostic Predictors
                                    ▼
  STAGE 5: CLINICAL TRANSLATION & EXPLAINABILITY
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ • Spatial Attention Heatmaps: Overlay continuous attention densities onto slide thumbnails       │
  │ • Class Maps: Pixel-level assignment of morphological tiles to predicted phenotypic categories    │
  │ • Top/Bottom Predictive Tile Extraction: Harvest highest- and lowest-scoring patches for audits   │
  │ • Native Agent Tooling: STAMP FastMCP Server (`mcp/server.py`) + STAMP-Workbench browser UI      │
  └──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Problem Formulation and Weakly Supervised Paradigms

### A. The Challenge of Resolution and Supervision in Pathology
A standard surgical resection whole-slide image contains up to $100,000 \times 100,000$ pixels (10 gigapixels), comprising thousands of heterogeneous tissue compartments: invasive malignant glands, reactive desmoplastic stroma, tertiary lymphoid structures, benign pre-existing ducts, necrotic debris, and vascular spaces.

Supervised learning requires dense manual segmentations, which are cost-prohibitive and subject to high inter-observer discordance. Weakly supervised deep learning overcomes this by assigning the whole-slide image a single ground-truth label $Y \in \{0, 1\}$ (e.g., Microsatellite Instability status: MSI-H vs. MSS). The slide is divided into $N$ non-overlapping patches $X = \{x_1, x_2, \dots, x_N\}$. The network must learn to identify which subset of patches carries the diagnostic signal without patch-level supervision.

### B. Decoupling Patient-Level Ground Truth from Multi-Slide Resections
In real-world surgical pathology, a single resection case routinely generates multiple tissue blocks and whole-slide images (ranging from 2 to $>15$ slides per surgical encounter). Naively treating each slide as an independent data point introduces two fatal errors:
1. **Data Leakage:** Splitting slides from the same patient across training and validation sets produces artificially inflated, non-generalizable validation metrics.
2. **Sampling Bias:** Non-informative slides (e.g., a margin section containing only normal tissue) are assigned the tumor's mutation label, corrupting gradient updates.

STAMP strictly enforces a **two-table relational architecture**:
- `clini_table`: Maps unique `PATIENT` IDs to clinical outcomes, molecular targets, or follow-up survival times.
- `slide_table`: Relates `PATIENT` IDs to one or more `FILENAME` feature files (`.h5`).
During cross-validation and deployment, stratification and splitting occur strictly at the **patient level**, guaranteeing zero cross-split patient contamination.

---

## 2. Standardized 5-Stage Protocol Architecture

### Stage 1: Formal Problem Definition
Before writing configuration files, investigators must define:
- **Target Task:**
  - *Binary Classification:* (e.g., *BRAF* V600E mutated vs. wild-type, MSI-H vs. MSS, HER2 0/1+ vs. 2+/3+).
  - *Multi-Class Subtyping:* (e.g., Renal cell carcinoma histological subtypes: clear cell, papillary, chromophobe).
  - *Multi-Target Classification:* Predicting an entire molecular panel simultaneously (e.g., *KRAS*, *BRAF*, *NRAS*, and *PIK3CA*).
  - *Continuous Regression:* Estimating quantitative cellular fractions or biomarker scores.
  - *Survival Analysis:* Right-censored time-to-event outcomes (`time_label` and `status_label`) optimized via Cox proportional hazards or survival loss.
- **Multimodal Integration:** Combining WSI representations with tabular clinicopathologic factors (age, tumor stage, histological grade, ECOG performance score) to assess additive diagnostic value.

### Stage 2: Data Preprocessing & Embedding Extraction
- **Tissue Masking without Hand-Drawn Polygons:** Instead of manual annotation, STAMP evaluates luminance across downsampled overview layers. Tiles with an average pixel brightness exceeding `brightness_cutoff: 240` (configurable) are automatically discarded as glass void, eliminating slide labels, coverslip edges, and empty space.
- **Micron-Per-Pixel (MPP) Normalization:** Preserves physical spatial dimensions across disparate scanner optics by extracting tiles at a specified physical footprint (`tile_size_um: 256.0`, `default_slide_mpp: 1.0`).
- **Tile Caching Pipeline:** Decouples expensive WSI optical decoding from feature extraction. By writing intermediate tiles to a persistent cache (`cache_dir`) using either lossless PNG or lightweight JPEG (100× storage reduction), researchers can re-extract features with alternative foundation models in minutes rather than days.
- **18+ Supported Feature Extractors:**
  - Modern vision foundation models: **UNI**, **UNI2**, **Virchow**, **Virchow2**, **Virchow-Full**, **CONCH**, **CONCHv1.5**, **Prov-GigaPath**, **H-Optimus-0**, **H-Optimus-1**, **CHIEF-CTransPath**, **CTransPath**, **mSTAR**, **MUSK**, **PLIP**, **DinoBloom**, **RedDino**, **KEEP**, and **TICON**.

### Stage 3: Slide & Patient-Level Modeling
Once patches are compressed into feature matrices $\mathbf{H} \in \mathbb{R}^{N \times D}$, STAMP provides multiple aggregation paradigms:

```
                              PATCH FEATURE MATRIX H (N x D)
                                             │
               ┌─────────────────────────────┴─────────────────────────────┐
               ▼                                                           ▼
     TILE-LEVEL MIL AGGREGATORS                                SLIDE & PATIENT ENCODERS
   ┌─────────────────────────────┐                           ┌─────────────────────────────┐
   │ • Vision Transformer (ViT)  │                           │ • TITAN (CONCH1.5 features) │
   │ • TransMIL (Linear self-att)│                           │ • PRISM (Virchow features)  │
   │ • Barspoon (Multi-target)   │                           │ • GigaPath / COBRA2 / EAGLE │
   └──────────────┬──────────────┘                           └──────────────┬──────────────┘
                  │                                                         │
                  ▼                                                         ▼
     Aggregated Patient Logits                                Slide-Level Vector (1 x D_slide)
                  │                                                         │
                  ▼                                                         ▼
         Diagnostic Outcome                                      MLP / Linear Head -> Outcome
```

1. **Vision Transformer (ViT):** Employs multi-head self-attention with optional ALiBi (Attention with Linear Biases) positional encodings, allowing the model to attend to spatial relationships across patches.
2. **TransMIL:** Leverages Nyström-approximated self-attention to model long-range correlations across thousands of tiles with linear memory scaling $\mathcal{O}(N)$.
3. **Barspoon Multi-Target Architecture:** An encoder-decoder transformer specifically engineered to resolve genetic co-occurrence and mutual exclusivity by predicting multiple molecular targets simultaneously from a single forward pass.
4. **Slide & Patient-Level Foundation Encoders:** STAMP integrates whole-slide contextualizers (**TITAN**, **PRISM**, **GIGAPATH**, **COBRA2**, **EAGLE**, **MADELEINE**, **CHIEF**). Furthermore, for patients with multiple resection slides, STAMP's `encode_patients` concatenates slide coordinate grids along the spatial axis into a unified **"virtual slide"**, producing a single patient-level embedding suitable for fast downstream MultiLayer Perceptron (MLP) classification.

### Stage 4: Evaluation & Statistical Rigor
- **Leakage-Proof Stratified Cross-Validation (`stamp crossval`):** Patient cases are randomly partitioned into $k$ balanced folds (default $k=5$). All slides belonging to an individual patient remain confined to either the training split or the validation split.
- **Automated Metric Generation (`stamp statistics`):** Aggregates predictions across all folds to compute:
  - Area Under the Receiver Operating Characteristic curve (AUROC) with 95% confidence intervals.
  - Area Under the Precision-Recall curve (AUPRC).
  - Optimal threshold determination (Youden's J statistic) yielding Sensitivity, Specificity, Positive Predictive Value (PPV), and Negative Predictive Value (NPV).
  - Survival Concordance Index (C-index) for right-censored endpoints.
- **Ensemble Deployment (`stamp deploy`):** Supports majority-voting or probability averaging across cross-validation checkpoints when evaluating external hospital validation cohorts.

### Stage 5: Clinical Translation, Explainability & Agentic Orchestration
- **Spatial Attention Heatmaps (`stamp heatmaps`):** Computes normalized attention weights for every tile, generating high-resolution spatial overlays on top of slide thumbnails.
- **Phenotypic Class Maps:** Renders categorical maps indicating which diagnostic class each individual patch most strongly supports.
- **Top / Bottom Tile Extraction:** Automatically crops and outputs the top-$k$ most predictive patches and bottom-$k$ least predictive patches. Pathologists can review these extracted exemplars directly to verify whether the model is identifying genuine histological hallmarks (e.g., Crohn's-like lymphoid reaction and mucinous histology in MSI-H colorectal carcinoma) or exploiting laboratory artifacts (e.g., surgical cautery or ink).
- **FastMCP Agent Integration:** STAMP v2.5 exposes a native Model Context Protocol server (`mcp/server.py`), allowing autonomous LLM coding agents to configure, run, and monitor computational pathology pipelines via structured tool calls.

---

## 3. Comparative Matrix: Computational Pathology Toolchains

| Dimension / Feature | Legacy Ad-Hoc Scripts | CLAM (Lu et al. 2021) | TRIDENT (Zhang et al. 2025) | **STAMP (El Nahhas et al. 2024/2025)** |
|---|---|---|---|---|
| **Primary Scope** | Single experiment | Patching + Feature extraction + ABMIL | High-throughput WSI processing & 42-task bench | **End-to-end clinical workflow: WSI to biomarker prediction** |
| **Target Tasks** | Binary classification | Binary / Multi-class classification | Feature extraction & benchmark probes | **Binary, multi-class, multi-target (Barspoon), regression, survival** |
| **Supported Encoders** | ResNet50 | ResNet50, CTransPath | 33+ patch / 8+ slide encoders | **18+ patch encoders + 7 slide/patient encoders** |
| **Patient-Level Fusion** | Manual averaging | Slide-level inference | Generalized attention pooling | **Virtual slide concatenation (`encode_patients`) + MLP** |
| **Multi-Target Prediction** | Separate models | Separate models | Separate models | **Native Barspoon multi-target joint decoder** |
| **Survival Analysis** | Custom code | Basic Cox loss | 42-task benchmark suite | **Integrated right-censored survival with C-index stats** |
| **Visual Interpretability** | Ad-hoc heatmaps | Attention heatmaps | QuPath GeoJSON contours | **Attention heatmaps + Class maps + Top/Bottom tile extraction** |
| **Package Engineering** | Unpinned `requirements.txt` | Conda / setup.py | Poetry / Conda | **Strict `uv` lockfile + pre-built CUDA 13.0 wheels (Astral)** |
| **Agent / LLM Interface** | None | None | `.claude/skills/trident` | **Native FastMCP server (`mcp/server.py`) + STAMP-Workbench** |
| **Reference Protocol** | None | Nat Biomed Eng 2021 | arXiv 2025 | **Nature Protocols 20(1):293–316 (2025)** |

---

## 4. Vault Context & Literature Connections

- [[STAMP]] — Dedicated tool note detailing installation with `uv`, CLI commands, configuration options, slide/patient encoding, and FastMCP server integration.
- [[TRIDENT]] — High-throughput WSI preprocessing engine and foundation model factory from the Mahmood Lab; highly complementary for upstream tile extraction.
- [[Accelerating Data Processing and Benchmarking of AI Models for Pathology]] — Synthesis of the Mahmood Lab's TRIDENT and Patho-Bench ecosystem.
- [[PathoActivationAtlas]] — Explainability framework from the Kather Lab generating class visualizations and activation atlases for foundation models.
- [[Class visualizations and activation atlases for computational pathology]] — Clinical audit of deep foundation model representations by four pathologists (*Cell Reports Medicine* 2026).
- [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]] — Empirical evaluation of foundation model trade-offs in digital pathology (*Scientific Reports* 2026).
- [[HERO: Histology Encoder for Robust Representation in Oncology]] — Caris Life Sciences foundation model evaluated across slide-level mutation and survival tasks.
- [[Towards robust foundation models for digital pathology]] — PathoROB benchmark evaluating foundation model vulnerabilities to scanner and hospital bias.
