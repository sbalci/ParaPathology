---
type: Tool
status: Evergreen
language: en
title: "TRIDENT"
aliases:
  - "TRIDENT"
  - "Trident"
  - "trident"
order: 170
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[Accelerating Data Processing and Benchmarking of AI Models for Pathology]]"
  - "[[HERO: Histology Encoder for Robust Representation in Oncology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[PathoActivationAtlas]]"
  - "[[Digital Pathology Software]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
repo: https://github.com/mahmoodlab/trident
paper: https://arxiv.org/abs/2502.06750
source_type: repository
external: true
adopted: false
engagement: active
license: Open Source (Mahmood Lab / Harvard Medical School)
last_reviewed: 2026-10-04
---

# TRIDENT

An industrial-grade, open-source Python toolkit developed by the Mahmood Lab (Harvard Medical School, Brigham and Women's Hospital, Broad Institute of MIT and Harvard) for scalable, resilient whole-slide image (WSI) processing and embedding extraction across 33+ patch encoders and 8+ slide foundation models. Released alongside Andrew Zhang et al., *Accelerating Data Processing and Benchmarking of AI Models for Pathology* (arXiv:2502.06750) and paired with the **Patho-Bench** foundation model evaluation framework.

- **GitHub Repository:** [mahmoodlab/TRIDENT](https://github.com/mahmoodlab/trident)
- **Documentation:** [trident-docs.readthedocs.io](https://trident-docs.readthedocs.io/en/latest/)
- **Foundational Paper:** Zhang A, Jaume G, Vaidya A, Ding T, Mahmood F. *Accelerating Data Processing and Benchmarking of AI Models for Pathology.* arXiv:2502.06750 [cs.CV] (2025). [DOI: 10.48550/arXiv.2502.06750](https://doi.org/10.48550/arXiv.2502.06750)
- **Companion Literature Review:** [[Accelerating Data Processing and Benchmarking of AI Models for Pathology]]
- **Benchmarking Suite:** [mahmoodlab/patho-bench](https://github.com/mahmoodlab/patho-bench)

---

## Why TRIDENT Matters

The field of computational pathology has transitioned from training bespoke Convolutional Neural Networks (CNNs) from scratch to deploying massive self-supervised vision transformer foundation models (such as UNI, Virchow, Prov-GigaPath, H-Optimus, and CONCH). However, transforming hundreds of thousands of multi-gigabyte, multi-resolution whole-slide images into model-ready embeddings has remained the primary engineering bottleneck.

Historically, laboratories relied on ad-hoc scripts or legacy pipelines such as CLAM (`create_patches_fp.py` and `extract_features_fp.py`). While pioneering, legacy tools suffered from significant operational vulnerabilities:
1. **Model Fragmentation:** Each research group releases foundation models with incompatible input patch dimensions, optical magnifications (10×, 20×, 40×), normalization constants, and custom model wrappers.
2. **Crash Fragility & Lack of Resumability:** Processing thousands of gigapixel WSIs takes days to weeks. Unhandled corrupt slides, out-of-memory (OOM) exceptions, or killed cluster jobs frequently required starting entire cohorts over from scratch.
3. **I/O Starvation on Network Storage:** High-end GPUs (e.g., NVIDIA A100/H100) sit idle while slow Network-Attached Storage (NAS) struggles to stream gigapixel image tiles in real time.
4. **Coarse Heuristic Tissue Segmentation:** Classical thresholding (Otsu/HSV) regularly captures glass debris, tissue folds, scanner illumination gradients, and pathologist ink marks while dropping pale fatty or mucinous tissue.

TRIDENT resolves these bottlenecks as an end-to-end, resilient pipeline providing a unified factory interface across the entire pathology foundation model ecosystem.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       TRIDENT 3-STAGE PIPELINE                                         │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  1. TISSUE SEGMENTATION (--task seg)
     [ Whole-Slide Image (.svs, .ndpi, .tiff, .mrxs, .zarr, .czi, .dcm) ]
                     │
                     ▼
     [ Segmenter: HEST / GrandQC / Otsu ] ──> Optional: --remove_artifacts / --remove_penmarks
                     │
                     ├──> Thumbnails (./trident_processed/thumbnails/)
                     ├──> Contours (./trident_processed/contours/)
                     └──> GeoJSON Polygons (./trident_processed/contours_geojson/ -> QuPath QC)

  2. PATCH COORDINATE EXTRACTION (--task coords)
     [ Segmented Tissue Polygons ] ──> --mag (e.g. 20×) + --patch_size (e.g. 256 / 512 px)
                     │
                     ├──> Absolute Pixel Coordinates (h5 / csv)
                     ├──> Filter: --min_tissue_proportion (drop non-tissue tiles)
                     └──> Optional: --dump_patches (save PNG/JPG crops for visual audits)

  3. FEATURE / EMBEDDING EXTRACTION (--task feat)
     [ High-Throughput Batch Dataloader ] <── Async SSD Staging Cache (--wsi_cache /local/ssd)
                     │
                     ├──> PATCH ENCODER (33+ backbones)
                     │    └── Shape: (N_patches, Embedding_Dim) -> ./features_<encoder>/<slide>.h5
                     │
                     └──> SLIDE ENCODER (TITAN, PRISM, GigaPath, CHIEF, Madeleine, Feather)
                          └── Auto-chains required patch encoder -> Shape: (Dim,) -> ./slide_features_<model>/
```

---

## Key Architectural & Engineering Innovations

### 1. Unified 3-Stage Modular Execution
TRIDENT decouples processing into three independent, idempotent stages:
- `--task seg`: Generates tissue masks, overview thumbnails, and GeoJSON contours.
- `--task coords`: Tiles valid tissue into regular patch coordinates.
- `--task feat`: Reads patch coordinates from disk and runs high-throughput GPU forward passes.
- `--task all`: Chains all three stages seamlessly in a single invocation.

Tasks run strictly the requested stage and do not auto-trigger prerequisites without explicit instruction—allowing users to inspect and curate intermediate segmentation polygons before committing expensive compute to patch extraction.

### 2. Multi-Segmenter Engine with Artifact Suppression
Unlike classical tools restricted to Otsu thresholding:
- **HEST Segmenter (`--segmenter hest`):** Default deep learning segmentation model trained on spatial transcriptomics cohorts ([MahmoodLab/hest-tissue-seg](https://huggingface.co/MahmoodLab/hest-tissue-seg)), robust to diverse stains and pale stroma.
- **GrandQC Segmenter (`--segmenter grandqc`):** Fast neural network segmentation with fine boundary precision ([cpath-ukk/grandqc](https://github.com/cpath-ukk/grandqc)).
- **Otsu Baseline (`--segmenter otsu`):** Pure CPU image-processing fallback requiring zero GPU resources or pre-downloaded weights.
- **Pathology Artifact Removal:** `--remove_artifacts` deploys a secondary GrandQC pass to aggressively eliminate tissue folds, out-of-focus blur, air bubbles, and edge tear-offs; `--remove_penmarks` isolates and filters out pathologist marker pen ink.
- **QuPath Visual QC:** Exports native GeoJSON polygon files (`./contours_geojson/`) for drag-and-drop validation and manual boundary editing directly inside [[QuPath]].

### 3. Comprehensive Foundation Model Factory
TRIDENT standardizes model loading via `trident.patch_encoder_models.encoder_factory(name)`. Crucially, **the selected encoder strictly dictates the required `--patch_size` and `--mag`** (resolving common researcher errors of feeding mismatched spatial inputs):

| Encoder Category | Model Flag (`--patch_encoder`) | Embedding Dim | Required Resolution & Magnification | Upstream Institution / Reference |
|---|---|---:|---|---|
| **Mahmood Lab** | `uni_v1` | 1,024 | `--patch_size 256 --mag 20` | Harvard / *Nature Medicine* 2024 |
| | `uni_v2` | 1,536 | `--patch_size 256 --mag 20` | Harvard / Pre-print 2024 |
| | `conch_v1` | 512 | `--patch_size 512 --mag 20` | Harvard / *Nature Medicine* 2024 |
| | `conch_v15` *(Default)* | 768 | `--patch_size 512 --mag 20` | Harvard / Hugging Face 2024 |
| **Paige AI** | `virchow` / `virchow2` | 2,560 | `--patch_size 224 --mag 20` | Paige / *Nature Medicine* 2024 |
| | `virchow2-cls` | 1,280 | `--patch_size 224 --mag 20` | Paige (CLS-token representation) |
| **Providence / MSFT** | `gigapath` | 1,536 | `--patch_size 256 --mag 20` | Providence / *Nature* 2024 |
| | `gigapath-flash` | 384 | `--patch_size 256 --mag 20` | Providence (distilled small ViT) |
| **Bioptimus** | `hoptimus0` / `hoptimus1` | 1,536 | `--patch_size 224 --mag 20` | Bioptimus / arXiv 2024 |
| | `h0-mini` | 768 / 1,536 | `--patch_size 224 --mag 20` | Bioptimus / [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]] |
| **Owkin** | `phikon` | 768 | `--patch_size 224 --mag 20` | Owkin / iBOT pretraining |
| | `phikon_v2` | 1,024 | `--patch_size 224 --mag 20` | Owkin / *Nature Communications* 2024 |
| **Broad / Harvard** | `musk` | 1,024 | `--patch_size 384 --mag 20` | Vision-language multimodal model |
| **Caris Life Sciences** | `midnight12k` / `openmidnight` | 3,072 / 1,536 | `--patch_size 224 --mag 20` | Caris / [[HERO: Histology Encoder for Robust Representation in Oncology]] |
| **Academic & Legacy** | `ctranspath` | 768 | `--patch_size 256 --mag 10` | Wang et al. / Swin-Transformer (10×) |
| | `resnet50` | 1,024 | `--patch_size 256 --mag 20` | ImageNet baseline / classical CLAM |

### 4. Automated Slide Encoder Chaining
Slide-level foundation models aggregate thousands of patch tokens into a unified slide vector or diagnostic prediction. In TRIDENT, specifying `--slide_encoder <name>` **automatically infers, loads, and executes the required upstream patch encoder**:
- **`titan`:** Multimodal slide encoder (Mahmood Lab); automatically extracts `conch_v15` (512 px at 20×), saves intermediate patch features to `features_conch_v15/`, and outputs whole-slide embeddings to `slide_features_titan/`.
- **`prism` / `prism2`:** Slide generation/classification model (Paige); automatically extracts `virchow` or `virchow2-cls` (224 px at 20×).
- **`gigapath`:** Whole-slide LongNet transformer; consumes 256 px `gigapath` patch tokens.
- **`chief`:** Clinical Histopathology Imaging Evaluation Foundation (HMS-DBMI); consumes `ctranspath` at 10×.
- **`madeleine` & `feather`:** Advanced Mahmood Lab slide encoders for multi-stain and attention-pooling aggregation.

### 5. Production Reliability & Resumability
- **Smart Resumability:** Outputs are tracked per slide. Re-running the batch script over the same `--job_dir` instantly skips completed slides without reprocessing.
- **Lock Architecture (`.lock`):** Multi-process jobs place temporary lockfiles during execution to prevent race conditions across parallel GPU workers. Deadlock expiration (`--clear_dead_locks --dead_lock_max_age_hours 24`) safely recovers jobs killed by cluster schedulers (SLURM/PBS).
- **Asynchronous Producer-Consumer Caching (`--wsi_cache`):** For datasets residing on slow network file systems, `--wsi_cache /local/ssd --cache_batch_size 32` spawns background worker threads that prefetch and stage WSIs to local NVMe SSDs before inference, eliminating GPU I/O starvation.
- **Multi-Format WSI Engine:** Native unified decoding across OpenSlide, CuCIM, plain rasters (`.png`, `.jpeg`), SDPC, OME-Zarr (`.zarr`), and Zeiss CZI (`.czi`). Built-in `trident convert` reformats unpyramidal or corrupted files into standard pyramidal TIFFs.
- **Standardized Execution Reports:** Writes structured `summary.md` logs, JSON run manifests (`runs/<id>.json`), and granular per-slide state records (`wsi_states/<slide>.json`).

---

## CLI Quickstart & Workflows

### 1. Environment Setup

```bash
# Recommended Python 3.10 environment
conda create -n "trident" python=3.10 -y
conda activate trident

git clone https://github.com/mahmoodlab/trident.git
cd trident
pip install -e ".[full]"

# Preflight verification and gated model access check
trident-doctor --profile full --check-gated
```

### 2. End-to-End Processing (The Primary Production Command)

Run tissue segmentation, patch coordinate generation, and UNI feature extraction across a directory of slides using multiple GPUs:

```bash
python run_batch_of_slides.py \
  --task all \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --patch_encoder uni_v1 \
  --mag 20 \
  --patch_size 256 \
  --gpus 0 1 2 3 \
  --skip_errors \
  --wsi_cache /local/nvme/cache \
  --cache_batch_size 32
```

### 3. Step-by-Step Staged Execution

#### Step A: Neural Tissue Segmentation with Artifact Cleanup
```bash
python run_batch_of_slides.py \
  --task seg \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --segmenter hest \
  --remove_artifacts \
  --remove_penmarks \
  --gpus 0
```
*Outputs: Thumbnails (`/thumbnails/`), contour overlays (`/contours/`), and QuPath GeoJSON files (`/contours_geojson/`).*

#### Step B: Patch Coordinate Extraction
```bash
python run_batch_of_slides.py \
  --task coords \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --mag 20 \
  --patch_size 256 \
  --overlap 0 \
  --min_tissue_proportion 0.1
```
*Outputs: HDF5 patch coordinates (`/patches/`).*

#### Step C: Patch Feature Extraction
```bash
python run_batch_of_slides.py \
  --task feat \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --patch_encoder conch_v15 \
  --mag 20 \
  --patch_size 512 \
  --feat_batch_size 64 \
  --gpus 0 1
```
*Outputs: Embedding matrices (`/features_conch_v15/<slide>.h5`).*

### 4. Slide-Level Foundation Model Extraction (e.g. TITAN)

```bash
python run_batch_of_slides.py \
  --task all \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --slide_encoder titan \
  --mag 20 \
  --patch_size 512 \
  --gpus 0
```
*Automatically runs `conch_v15` patch feature extraction before executing TITAN slide-level aggregation, storing slide vectors in `/slide_features_titan/<slide>.pt`.*

---

## AI Agent Integration

TRIDENT is among the first digital pathology toolkits to ship native **AI Coding Agent Skills** ([`.claude/skills/trident/`](https://github.com/mahmoodlab/TRIDENT/tree/main/.claude/skills/trident)):
- Provides autonomous coding agents (Claude Code, Antigravity, etc.) with explicit operational constraints, encoder-to-resolution lookups, and failure recovery protocols.
- Prevents common LLM pitfalls (e.g., attempting to run `--task coords` on an empty directory without prior segmentation, or specifying mismatched resolutions like 224px for UNI).

---

## Connection to Vault Research & Literature

- [[Accelerating Data Processing and Benchmarking of AI Models for Pathology]] — The foundational publication detailing TRIDENT and Patho-Bench (Zhang et al. 2025).
- [[HERO: Histology Encoder for Robust Representation in Oncology]] — Evaluated on 39 slide-level tasks using the Mahmood Lab's **Patho-Bench** suite.
- [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]] — Comparative trade-offs across encoders (Lunit, Kaiko, Phikon-v2, UNI2, Virchow2) supported in TRIDENT.
- [[Towards robust foundation models for digital pathology]] — PathoROB benchmark evaluating encoder vulnerability to multi-center acquisition confounders.
- [[PathoActivationAtlas]] — Visual representation auditing framework for encoders extracted via TRIDENT.
- [[CellQuant-Net]], [[NuClick]], & [[HoVer-NeXt]] — Cellular instance segmentation frameworks downstream or complementary to whole-slide patch extraction.
