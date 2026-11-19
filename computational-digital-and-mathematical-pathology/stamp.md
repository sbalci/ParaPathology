---
type: Tool
status: Evergreen
language: bilingual
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

# STAMP

Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden; RWTH Aachen; University Medical Center Mainz) tarafından geliştirilen, **Solid Tumor Associative Modeling in Pathology** (patolojide solid tümörlerin ilişkisel modellenmesi) için açık kaynaklı, uçtan uca bir yazılım iş hattı (pipeline) ve standartlaştırılmış bir metodolojik protokoldür. *Nature Protocols* dergisinde yayımlanmıştır (El Nahhas ve ark., 2024/2025; [DOI: 10.1038/s41596-024-01047-2](https://doi.org/10.1038/s41596-024-01047-2); [PMID: 39285224](https://pubmed.ncbi.nlm.nih.gov/39285224/)).

- **GitHub deposu:** [KatherLab/STAMP](https://github.com/KatherLab/STAMP)
- **Web arayüzü:** [KatherLab/STAMP-Workbench](https://github.com/KatherLab/STAMP-Workbench)
- **Yayımlanmış protokol:** El Nahhas OSM, van Treeck M, Wölflein G, Unger M, Ligero M, Lenz T, Wagner SJ, Hewitt KJ, Khader F, Foersch S, Truhn D, Kather JN. *From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology.* **Nature Protocols** 20, 293–316 (2025). [DOI: 10.1038/s41596-024-01047-2](https://doi.org/10.1038/s41596-024-01047-2)
- **Eşlik eden literatür incelemesi:** From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology

---

## STAMP Neden Önemlidir

Hesaplamalı patoloji, kendi kendine denetimli (self-supervised) temel modellerin (UNI, Virchow ve CONCH gibi) kullanıma girmesiyle hızla ilerlemiştir. Ancak tüm slayt görüntülerini (whole slide images, WSI) klinik olarak uygulanabilir tanısal öngörülere dönüştürmek; gigapiksel histoloji görüntülerini, hasta üst verilerini (metadata) ve sonraki modelleme aşamalarını birbirine bağlayan, aynı zamanda ölümcül metodolojik tuzakları (hasta düzeyinde veri sızıntısı gibi) önleyen bütünlüklü ve standart bir protokol gerektirir.

STAMP, ham slayt taramasından doğrulanmış klinik biyobelirteç öngörülerine uzanan sürecin tamamını kapsayan eksiksiz ve birleşik bir iş akışı sunar:

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

## Temel Özellikler ve Yetenekler

### 1. Birleşik Öznitelik Çıkarıcı Ekosistemi (18+ Model)
STAMP, başlıca hesaplamalı patoloji temel modellerinin tümü için katı normalizasyon ve çözünürlük zorunluluğu uygulayan, önceden yapılandırılmış yükleyiciler içerir:

| Öznitelik çıkarıcı | Çözünürlük / Büyütme | Mimari | Özgün alan |
|---|---|---|---|
| `ctranspath` | 256 px @ 10× | Swin Transformer | Pan-kanser H&E |
| `chief-ctranspath` | 256 px @ 10× | Swin Transformer | Çok dokulu kanser ve biyobelirteçler |
| `uni` / `uni2` | 256 px @ 20× | ViT-L/16, ViT-H/14 | Çok organlı klinik patoloji |
| `conch` / `conch1_5` | 512 px @ 20× | CoCa ViT-B/16 | Görme-dil (vision-language) histopatolojisi |
| `virchow` / `virchow2` / `virchow-full` | 224 px @ 20× | ViT-H/14 (1.5M/3.1M WSIs) | Klinik düzeyde onkoloji |
| `gigapath` | 224 px @ 20× | LongNet / ViT | 1.3B parametreli slayt düzeyi temel model |
| `h-optimus-0` / `h-optimus-1` | 224 px @ 20× | ViT-g/14 (Bioptimus) | Multimodal biyoloji ve onkoloji |
| `musk` | 224 px @ 20× | Çok ölçekli Vision Transformer | Tek hücre ve doku yamaları (patch) |
| `mstar` | 224 px @ 20× | Vision Transformer | Çok boyalı histopatoloji |
| `plip` | 224 px @ 20× | CLIP ViT-B/32 | Tıbbi görsel-dil hizalaması |
| `dinobloom` | 224 px @ 40× | DINOv2 ViT | Genellenebilir hücre hematolojisi |
| `red-dino` | 224 px @ 40× | DINOv2 ViT | Eritrosit morfolojisi |
| `keep` | 224 px @ 20× | Görme-dil ViT | Bilgiyle zenginleştirilmiş tanı |
| `ticon` | 224 px @ 20× | ViT | Karo (tile) bağlamlandırıcı |

### 2. Slayt ve Hasta Düzeyinde Bağlam Kodlayıcıları
STAMP, örnek (instance) düzeyindeki öznitelik çıkarımının ötesinde, önde gelen slayt kodlayıcılarını kullanarak doğrudan tüm slayt düzeyinde bağlamsal gömü (embedding) çıkarımını destekler:
- **TITAN** (`conch1_5` gerektirir)
- **PRISM** (`virchow-full` gerektirir)
- **GigaPath** (`gigapath` gerektirir)
- **COBRA2** (`conch`, `uni`, `virchow2` veya `h-optimus-0` kabul eder)
- **EAGLE** (`ctranspath` veya `chief-ctranspath` kabul eder)
- **MADELEINE** (`conch` kabul eder)
- **CHIEF** (`chief-ctranspath` kabul eder)

### 3. Hasta Düzeyinde "Sanal Slayt" Birleştirme
Bir hastaya ait olguda birden fazla cerrahi blok bulunduğunda, basit havuzlama ya mekânsal kimliği kaybettirir ya da örnek sayılarında yanlılığa yol açar. STAMP'ın `encode_patients` komutu, aynı hastaya ait birden çok slaytı mekânsal koordinat ekseni boyunca birleştirerek cerrahi başvurunun tamamını temsil eden tek bir **"sanal slayt"** oluşturur. Elde edilen hasta gömüleri, hızlı ve hafif Çok Katmanlı Algılayıcı (MultiLayer Perceptron, MLP) sınıflandırmasına olanak tanır; bu da eğitim sürelerini belirgin biçimde kısaltır ve küçük örneklemli kohortlarda aşırı öğrenmeyi (overfitting) önler.

### 4. Çok Hedefli Ortak Sınıflandırma (Barspoon)
İlişkili biyobelirteçleri birbirinden bağımsız olarak öngörmek (örneğin kolorektal kanserde *KRAS*, *BRAF* ve *NRAS* için ayrı modeller) biyolojik korelasyonları ve birlikte görülme örüntülerini göz ardı eder. STAMP, `clini_table` içindeki istenen sayıda hedef sütunu alıp moleküler panelin tamamını eşzamanlı olarak öngören bir Kodlayıcı-Kod Çözücü (Encoder-Decoder) Transformer mimarisi olan **Barspoon**'u entegre ederek birlikte görülen sürücü mutasyonlarda etiket verimliliğini artırır.

### 5. Sağkalım Analizi ve Sürekli Regresyon
STAMP, `task` değerine göre kayıp fonksiyonlarını, ağ başlıklarını ve metrikleri doğrudan değiştirir:
- `task: "classification"`: Çapraz entropi kaybı, AUROC, AUPRC, duyarlılık, özgüllük, F1.
- `task: "regression"`: Ortalama Kare Hata (Mean Squared Error, MSE), Pearson ve Spearman sıra korelasyon katsayıları.
- `task: "survival"`: Sağdan sansürlü olaya kadar geçen süre sonlanımlarını (`time_label` ve `status_label`) değerlendiren, Uyum İndeksi (Concordance Index, C-index) ile ölçülen Cox orantılı tehlikeler kısmi olabilirlik kaybı.

### 6. Açıklanabilirlik: Isı Haritaları, Sınıf Haritaları ve En Yüksek/En Düşük Karolar
- **Mekânsal Dikkat Isı Haritaları:** Odak sıcak noktalarını görselleştirmek için normalize edilmiş dikkat skorlarını slayt genel görünümlerinin üzerine bindirir.
- **Sınıf Haritaları:** Her karonun hangi hastalık fenotipi veya derece lehine oy verdiğini gösteren kategorik segmentasyon.
- **En Yüksek / En Düşük Karo Çıkarımı:** En öngörücü ilk $k$ yamayı ve en az öngörücü son $k$ yamayı (`topk: 5`, `bottomk: 5`) otomatik olarak kırpıp çıktı olarak verir; böylece patologların modelin akıl yürütmesini denetlemesine ve olası karıştırıcı etkenleri saptamasına olanak tanır.

---

## Kurulum ve Mimari

STAMP, sabitlenmiş bağımlılıklarla katı ve yeniden üretilebilir ortamları yönetmek için [`uv`](https://github.com/astral-sh/uv) kullanır. Dikkat çekici olarak, derlenmiş karmaşık GPU uzantıları (`flash-attn`, `mamba-ssm` ve `causal-conv1d`), CUDA 13.0 ve PyTorch 2.11'e karşı derlenmiş **Astral pre-built wheel index** üzerinden dağıtılır; bu da kırılgan yerel C++/CUDA derleme hatalarını ortadan kaldırır.

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

## CLI Komutları ve Yapılandırma

STAMP, tek bir YAML yapılandırma dosyası (`config.yaml`) tarafından yönetilen birleşik bir komut satırı arayüzü sunar:

```bash
stamp [-h] [--config CONFIG_FILE_PATH] {init,preprocess,encode_slides,encode_patients,train,crossval,deploy,statistics,config,heatmaps}
```

### Uçtan Uca Tam İş Akışı

#### Adım 1: Yapılandırma Dosyasını Başlatın
```bash
mkdir my-experiment
stamp --config my-experiment/config.yaml init
```

#### Adım 2: WSI'leri Öznitelik Gömülerine Dönüştürmek İçin Ön İşleme Yapın
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

#### Adım 3: Hasta Düzeyinde Tabakalandırılmış Çapraz Doğrulamayı Çalıştırın
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

#### Adım 4: Birleştirilmiş İstatistikleri ve ROC/PR Eğrilerini Hesaplayın
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

#### Adım 5: Dikkat Isı Haritalarını ve En Yüksek Karoları Oluşturun
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

## Yerleşik FastMCP Sunucusu ve Ajan Tabanlı Orkestrasyon

STAMP v2.5, otonom LLM kodlama ajanlarının (Antigravity, Claude veya OpenAI Agents gibi) hesaplamalı patoloji deneylerini doğrudan Model Context Protocol aracılığıyla çalıştırmasına olanak tanıyan yerleşik bir **FastMCP** sunucusu (`mcp/server.py`) sunar:

### Kullanılabilir MCP Araçları:
- `preprocess_stamp()`: Tüm slayt görüntülerini karolara ayırır ve öznitelikleri çıkarır.
- `train_stamp()`: Çıkarılan gömüler üzerinde zayıf denetimli MIL modellerini eğitir.
- `crossval_stamp()`: Hasta düzeyinde bölmeyle $k$-katlı çapraz doğrulama çalıştırır.
- `deploy_stamp()`: Eğitilmiş modelleri ayrılmış (held-out) test kümelerine uygular.
- `encode_slides_stamp()`: Slayt kodlayıcıları (TITAN, PRISM vb.) aracılığıyla tüm slayt temsillerini hesaplar.
- `encode_patients_stamp()`: Çok bloklu olgularda hasta düzeyinde sanal slaytlar oluşturur.
- `heatmaps_stamp()`: Mekânsal dikkat bindirmeleri, sınıf haritaları ve denetim karoları oluşturur.
- `statistics_stamp()`: AUROC, AUPRC ve %95 güven aralıklarını birleştirir.
- `check_available_devices()`: Kullanılabilir CUDA, MPS veya CPU hızlandırmasını sorgular.
- `analyze_csv()` & `list_column_values`: Klinik üst veriyi ve slayt eşleme tablolarını doğrular.

### FastMCP Sunucusunun Başlatılması:
```bash
uv sync --extra build --extra gpu --extra mcp
python mcp/server.py
```

---

## Kasa (Vault) Bağlamı ve Literatür Bağlantıları

- From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology — *Nature Protocols* yayınını inceleyen kapsamlı kırpıntı (clipping) notu.
- TRIDENT — Mahmood Lab'ın, SSD önbellekleme ile 33+ yama kodlayıcısını ve 8+ slayt kodlayıcısını destekleyen yüksek verimli WSI işleme araç seti.
- PathoActivationAtlas — Kather Lab'ın, temel modeller için sınıf görselleştirmeleri ve aktivasyon atlasları üreten görsel yorumlanabilirlik çerçevesi.
- HERO: Histology Encoder for Robust Representation in Oncology — Zayıf denetimli dikkat havuzlaması kullanılarak slayt düzeyindeki görevlerde değerlendirilmiş, Caris Life Sciences'a ait temel model.
- Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis — Patoloji temel modellerinin sistematik ödünleşim (trade-off) analizi.
- Digital Pathology Software — Dijital ve hesaplamalı patolojideki yazılımlar, kütüphaneler ve çerçevelerin kataloğu.
