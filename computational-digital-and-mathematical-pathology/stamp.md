---
type: Tool
status: Evergreen
language: en
title: "STAMP"
aliases:
  - "STAMP"
  - "stamp"
  - "STAMP protocol"
  - "Solid Tumor Associative Modeling in Pathology"
order: 175
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology]]"
  - "[[TRIDENT]]"
  - "[[PathoActivationAtlas]]"
  - "[[HERO: Histology Encoder for Robust Representation in Oncology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Digital Pathology Software]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
repo: https://github.com/KatherLab/STAMP
paper: https://doi.org/10.1038/s41596-024-01047-2
source_type: repository
external: true
adopted: false
engagement: active
license: MIT License
last_reviewed: 2026-10-05
---

# STAMP

An open-source, end-to-end software pipeline and standardized methodological protocol for **Solid Tumor Associative Modeling in Pathology**, developed by the Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden; RWTH Aachen; University Medical Center Mainz). Published in *Nature Protocols* (El Nahhas et al., 2024/2025; [DOI: 10.1038/s41596-024-01047-2](https://doi.org/10.1038/s41596-024-01047-2); [PMID: 39285224](https://pubmed.ncbi.nlm.nih.gov/39285224/)).

- **GitHub Repository:** [KatherLab/STAMP](https://github.com/KatherLab/STAMP)
- **Web Interface:** [KatherLab/STAMP-Workbench](https://github.com/KatherLab/STAMP-Workbench)
- **Published Protocol:** El Nahhas OSM, van Treeck M, Wölflein G, Unger M, Ligero M, Lenz T, Wagner SJ, Hewitt KJ, Khader F, Foersch S, Truhn D, Kather JN. *From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology.* **Nature Protocols** 20, 293–316 (2025). [DOI: 10.1038/s41596-024-01047-2](https://doi.org/10.1038/s41596-024-01047-2)
- **Companion Literature Review:** [[From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology]]

---

## Why STAMP Matters

Computational pathology has rapidly advanced with the introduction of self-supervised foundation models (such as UNI, Virchow, and CONCH). However, translating whole-slide images (WSIs) into clinically actionable diagnostic predictions requires a cohesive, standardized protocol that links gigapixel histology images, patient metadata, and downstream modeling while preventing fatal methodological traps (such as patient-level data leakage).

STAMP provides a complete, unified workflow covering the entire trajectory from raw slide scanning to validated clinical biomarker predictions:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       STAMP SYSTEM ARCHITECTURE                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  1. RAW TISSUE SLIDES (.svs, .ndpi, .mrxs, .tiff)
                 │
                 ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ PREPROCESSING & FEATURE EXTRACTION (`stamp preprocess`)              │
  │ • Fast luminance-based tissue thresholding (brightness_cutoff: 240)  │
  │ • Micron-per-pixel standardization (default_slide_mpp: 1.0)          │
  │ • Reusable tile caching (lossless PNG or 100x compressed JPG)        │
  │ • Unified Factory: 18+ foundation encoders (UNI2, Virchow2, CONCH1.5)│
  └──────────────────┬───────────────────────────────────────────────────┘
                     │ Standardized Patch Features (.h5)
                     ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ CONTEXT ENCODING & MULTI-SLIDE FUSION                                │
  │ • Slide Context: TITAN, PRISM, GigaPath, COBRA2, EAGLE, MADELEINE    │
  │ • Patient Virtual Slide Fusion: Concatenates multi-slide resections  │
  └──────────────────┬───────────────────────────────────────────────────┘
                     │ Patient-Level or Bag-Level Embeddings
                     ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ WEAKLY SUPERVISED MODELING & MULTI-TARGET LEARNING                   │
  │ • Vision Transformer (ViT) with ALiBi positional encoding            │
  │ • TransMIL linear self-attention across large tile bags              │
  │ • Barspoon Encoder-Decoder multi-target classification               │
  │ • Survival analysis (Cox loss) and continuous regression             │
  │ • Tabular clinicopathologic covariate fusion                         │
  └──────────────────┬───────────────────────────────────────────────────┘
                     │ Trained Weights & Checkpoints (.ckpt)
                     ▼
  ┌──────────────────────────────────────────────────────────────────────┐
  │ EVALUATION, EXPLAINABILITY & AGENT INTEGRATION                       │
  │ • Patient-stratified k-fold cross-validation (`stamp crossval`)      │
  │ • Automated AUROC, AUPRC, and 95% CI generation (`stamp statistics`) │
  │ • Attention heatmaps, class maps, top/bottom predictive tiles        │
  │ • FastMCP Model Context Protocol server (`mcp/server.py`)            │
  └──────────────────────────────────────────────────────────────────────┘
```

---

## Key Features & Capabilities

### 1. Unified Feature Extractor Ecosystem (18+ Models)
STAMP includes pre-configured loaders with strict normalization and resolution enforcement across all major computational pathology foundation models:

| Feature Extractor | Resolution / Mag | Architecture | Native Domain |
|---|---|---|---|
| `ctranspath` | 256 px @ 10× | Swin Transformer | Pan-cancer H&E |
| `chief-ctranspath` | 256 px @ 10× | Swin Transformer | Multi-tissue cancer & biomarkers |
| `uni` / `uni2` | 256 px @ 20× | ViT-L/16, ViT-H/14 | Multi-organ clinical pathology |
| `conch` / `conch1_5` | 512 px @ 20× | CoCa ViT-B/16 | Vision-language histopathology |
| `virchow` / `virchow2` / `virchow-full` | 224 px @ 20× | ViT-H/14 (1.5M/3.1M WSIs) | Clinical-grade oncology |
| `gigapath` | 224 px @ 20× | LongNet / ViT | 1.3B slide-level foundation model |
| `h-optimus-0` / `h-optimus-1` | 224 px @ 20× | ViT-g/14 (Bioptimus) | Multimodal biology & oncology |
| `musk` | 224 px @ 20× | Multi-scale Vision Transformer | Single-cell & tissue patches |
| `mstar` | 224 px @ 20× | Vision Transformer | Multi-stain histopathology |
| `plip` | 224 px @ 20× | CLIP ViT-B/32 | Medical visual-language alignment |
| `dinobloom` | 224 px @ 40× | DINOv2 ViT | Generalizable cell hematology |
| `red-dino` | 224 px @ 40× | DINOv2 ViT | Red blood cell morphology |
| `keep` | 224 px @ 20× | Vision-Language ViT | Knowledge-enhanced diagnosis |
| `ticon` | 224 px @ 20× | ViT | Tile contextualizer |

### 2. Slide- and Patient-Level Context Encoders
Beyond instance-level feature extraction, STAMP supports direct whole-slide contextual embedding extraction using leading slide encoders:
- **TITAN** (requires `conch1_5`)
- **PRISM** (requires `virchow-full`)
- **GigaPath** (requires `gigapath`)
- **COBRA2** (accepts `conch`, `uni`, `virchow2`, or `h-optimus-0`)
- **EAGLE** (accepts `ctranspath` or `chief-ctranspath`)
- **MADELEINE** (accepts `conch`)
- **CHIEF** (accepts `chief-ctranspath`)

### 3. Patient-Level "Virtual Slide" Concatenation
When a patient case involves multiple surgical blocks, naive pooling either loses spatial identity or biases sample counts. STAMP's `encode_patients` command concatenates multiple slides belonging to the same patient along the spatial coordinate axis, synthesizing a single **"virtual slide"** representing the complete surgical encounter. The resulting patient embeddings allow fast, lightweight MultiLayer Perceptron (MLP) classification that drastically reduces training times and prevents overfitting in low-sample cohorts.

### 4. Multi-Target Joint Classification (Barspoon)
Predicting related biomarkers independently (e.g., separate models for *KRAS*, *BRAF*, and *NRAS* in colorectal cancer) ignores biological correlations and co-occurrence patterns. STAMP integrates **Barspoon**, an Encoder-Decoder Transformer architecture that takes an arbitrary list of target columns in `clini_table` and predicts the entire molecular panel simultaneously, improving label efficiency on co-occurring driver mutations.

### 5. Survival Analysis and Continuous Regression
STAMP natively switches its loss functions, network heads, and metrics based on `task`:
- `task: "classification"`: Cross-entropy loss, AUROC, AUPRC, sensitivity, specificity, F1.
- `task: "regression"`: Mean Squared Error (MSE), Pearson and Spearman rank correlation coefficients.
- `task: "survival"`: Cox proportional hazards partial likelihood loss evaluating right-censored time-to-event outcomes (`time_label` and `status_label`) assessed via Concordance Index (C-index).

### 6. Explainability: Heatmaps, Class Maps & Top/Bottom Tiles
- **Spatial Attention Heatmaps:** Overlays normalized attention scores over slide overviews to visualize focal hotspots.
- **Class Maps:** Categorical segmentation showing which disease phenotype or grade each tile votes for.
- **Top / Bottom Tile Extraction:** Automatically crops and outputs the top-$k$ most predictive patches and bottom-$k$ least predictive patches (`topk: 5`, `bottomk: 5`), enabling pathologists to audit model reasoning and identify potential confounders.

---

## Installation & Architecture

STAMP utilizes [`uv`](https://github.com/astral-sh/uv) to manage strict, reproducible environments with pinned dependencies. Notably, complex compiled GPU extensions (`flash-attn`, `mamba-ssm`, and `causal-conv1d`) are distributed via the **Astral pre-built wheel index** compiled against CUDA 13.0 and PyTorch 2.11, eliminating brittle local C++/CUDA compilation failures.

```bash
# 1. Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# 2. Clone STAMP repository
git clone https://github.com/KatherLab/STAMP.git
cd STAMP

# 3. Synchronize environment
# Full GPU stack (including CONCHv1.5, GigaPath, and MUSK):
uv sync --extra gpu_all
source .venv/bin/activate

# CPU-only installation (macOS / Windows without CUDA):
uv sync --extra cpu
source .venv/bin/activate
```

---

## CLI Commands & Configuration

STAMP exposes a unified command-line interface driven by a single YAML configuration file (`config.yaml`):

```bash
stamp [-h] [--config CONFIG_FILE_PATH] {init,preprocess,encode_slides,encode_patients,train,crossval,deploy,statistics,config,heatmaps}
```

### Complete End-to-End Workflow

#### Step 1: Initialize Configuration File
```bash
mkdir my-experiment
stamp --config my-experiment/config.yaml init
```

#### Step 2: Preprocess WSIs into Feature Embeddings
```yaml
# config.yaml
preprocessing:
  output_dir: "/data/experiments/feats"
  wsi_dir: "/data/wsi_cohort"
  extractor: "uni2"
  device: "cuda"
  cache_dir: "/data/experiments/cache"
  cache_tiles_ext: "jpg"
  tile_size_um: 256.0
  tile_size_px: 224
  default_slide_mpp: 1.0
  brightness_cutoff: 240
```
```bash
stamp --config my-experiment/config.yaml preprocess
```

#### Step 3: Run Patient-Stratified Cross-Validation
```yaml
# config.yaml
crossval:
  output_dir: "/data/experiments/cv_results"
  clini_table: "/data/clinical_metadata.xlsx"
  slide_table: "/data/slide_manifest.csv"
  feature_dir: "/data/experiments/feats"
  task: "classification"
  ground_truth_label: "isMSIH"
  categories: ["MSI-H", "MSS"]
  patient_label: "PATIENT"
  filename_label: "FILENAME"
  n_splits: 5

advanced_config:
  seed: 42
  max_epochs: 32
  patience: 16
  batch_size: 64
  bag_size: 512
  max_lr: 1e-4
  div_factor: 25.0
  model_name: "vit"
```
```bash
stamp --config my-experiment/config.yaml crossval
```

#### Step 4: Compute Aggregated Statistics & ROC/PR Curves
```yaml
# config.yaml
statistics:
  output_dir: "/data/experiments/stats"
  task: "classification"
  ground_truth_label: "isMSIH"
  true_class: "MSI-H"
  pred_csvs:
    - "/data/experiments/cv_results/split-0/patient-preds.csv"
    - "/data/experiments/cv_results/split-1/patient-preds.csv"
    - "/data/experiments/cv_results/split-2/patient-preds.csv"
    - "/data/experiments/cv_results/split-3/patient-preds.csv"
    - "/data/experiments/cv_results/split-4/patient-preds.csv"
```
```bash
stamp --config my-experiment/config.yaml statistics
```

#### Step 5: Generate Attention Heatmaps and Top Tiles
```yaml
# config.yaml
heatmaps:
  output_dir: "/data/experiments/heatmaps"
  feature_dir: "/data/experiments/feats"
  wsi_dir: "/data/wsi_cohort"
  checkpoint_path: "/data/experiments/cv_results/split-0/checkpoints/best.ckpt"
  opacity: 0.6
  topk: 5
  bottomk: 5
  device: "cuda"
```
```bash
stamp --config my-experiment/config.yaml heatmaps
```

---

## Native FastMCP Server & Agentic Orchestration

STAMP v2.5 introduces a native **FastMCP** server (`mcp/server.py`), allowing autonomous LLM coding agents (such as Antigravity, Claude, or OpenAI Agents) to run computational pathology experiments directly via Model Context Protocol:

### Available MCP Tools:
- `preprocess_stamp()`: Tile and extract features from whole-slide images.
- `train_stamp()`: Train weakly supervised MIL models on extracted embeddings.
- `crossval_stamp()`: Run $k$-fold cross-validation with patient-level splitting.
- `deploy_stamp()`: Deploy trained models to held-out test sets.
- `encode_slides_stamp()`: Compute whole-slide representations via slide encoders (TITAN, PRISM, etc.).
- `encode_patients_stamp()`: Synthesize patient-level virtual slides across multi-block cases.
- `heatmaps_stamp()`: Generate spatial attention overlays, class maps, and audit tiles.
- `statistics_stamp()`: Aggregate AUROCs, AUPRCs, and 95% confidence intervals.
- `check_available_devices()`: Query available CUDA, MPS, or CPU acceleration.
- `analyze_csv()` & `list_column_values`: Validate clinical metadata and slide mapping tables.

### Launching the FastMCP Server:
```bash
uv sync --extra build --extra gpu --extra mcp
python mcp/server.py
```

---

## Vault Context & Literature Connections

- [[From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology]] — Comprehensive clipping note reviewing the Nature Protocols publication.
- [[TRIDENT]] — High-throughput WSI processing toolkit from the Mahmood Lab supporting 33+ patch encoders and 8+ slide encoders with SSD caching.
- [[PathoActivationAtlas]] — Visual interpretability framework from the Kather Lab generating class visualizations and activation atlases for foundation models.
- [[HERO: Histology Encoder for Robust Representation in Oncology]] — Caris Life Sciences foundation model evaluated on slide-level tasks using weakly supervised attention pooling.
- [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]] — Systematic trade-off analysis of pathology foundation models.
- [[Digital Pathology Software]] — Catalog of software, libraries, and frameworks across digital and computational pathology.
