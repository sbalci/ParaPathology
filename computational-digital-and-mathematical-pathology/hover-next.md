---
type: Tool
status: Developing
language: en
title: "HoVer-NeXt"
aliases:
  - "HoVer-NeXt"
  - "hover_next_train"
  - "hover_next_inference"
order: 150
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
  - "[[WSInfer]]"
  - "[[CRoMa]]"
  - "[[Tumor budding T-cell graphs for pT1 colorectal cancer]]"
repo: https://github.com/digitalpathologybern/hover_next_train
inference_repo: https://github.com/digitalpathologybern/hover_next_inference
paper: https://openreview.net/pdf?id=3vmB43oqIO
weights: https://zenodo.org/records/10635618
container: https://zenodo.org/records/10649470/files/hover_next.sif
source_type: repository
external: true
adopted: false
engagement: active
license: GPL-3.0
last_reviewed: 2026-09-11
---

# HoVer-NeXt

A fast, modernized deep-learning framework for simultaneous nuclear instance segmentation and classification in whole-slide histopathology images. Developed by the Digital Pathology group at the University of Bern (Institute of Tissue Medicine and Pathology), HoVer-NeXt upgrades the foundational HoVer-Net paradigm with ConvNeXt-V2 encoders, decoupled multi-head decoders, native whole-slide parallel inference, and direct export to QuPath.

- **Training Repository:** [digitalpathologybern/hover_next_train](https://github.com/digitalpathologybern/hover_next_train) — GPL-3.0
- **Inference Pipeline:** [digitalpathologybern/hover_next_inference](https://github.com/digitalpathologybern/hover_next_inference) — GPL-3.0
- **Paper:** Baumann E, Dislich B, Rumberger JL, Nagtegaal ID, Rodriguez Martinez M, Zlobec I. *HoVer-NeXt: A Fast Nuclei Segmentation and Classification Pipeline for Next Generation Histopathology.* Medical Imaging with Deep Learning (MIDL 2024) — [OpenReview PDF](https://openreview.net/pdf?id=3vmB43oqIO)
- **Model Checkpoints:** [Zenodo Record 10635618](https://zenodo.org/records/10635618)
- **Apptainer/Singularity Image:** [Zenodo Record 10649470 (`hover_next.sif`)](https://zenodo.org/records/10649470)

---

## The Problem: The WSI Segmentation Bottleneck

Nuclear instance segmentation and cell-type classification represent core primitives in computational pathology. Precise cell boundaries and phenotypes are prerequisite to spatial profiling: quantifying tumor-infiltrating lymphocytes (TILs), profiling immune evasion, computing cellular spatial graphs, or scoring tumor budding.

While the original **HoVer-Net** (Graham et al., *Medical Image Analysis* 2019) set the standard by predicting horizontal and vertical pixel distance vectors to nuclear centroids to disentangle overlapping nuclei via watershed, scaling it to clinical WSI cohorts has historically faced steep computational friction:
1. **Throughput limits:** Heavy ResNet-50 / custom decoder designs create protracted runtimes on multi-gigapixel whole-slide scans containing hundreds of thousands to millions of nuclei.
2. **Architectural stagnation:** Original implementations lacked modern visual backbones with self-supervised / masked autoencoding pretraining.
3. **Engineering fragmentation:** Disconnect between patch-level academic training scripts and production-ready whole-slide inference, multi-GPU scaling, and downstream digital pathology tooling (e.g. QuPath).

HoVer-NeXt solves these barriers by re-architecting both the neural pipeline and the runtime execution engine.

---

## Architecture & Technical Innovations

HoVer-NeXt introduces a dual-decoder multi-head convolutional architecture built upon `segmentation_models_pytorch` (smp) and `timm`:

```
                           ┌─► [U-Net Decoder: Inst] ──► Head Inst (5 ch: H, V, Binary Mask)
[Input Image Patch (H&E)] ──► [ConvNeXt-V2 Encoder] ─┤
                           └─► [U-Net Decoder: Cls]  ──► Head Cls (C channels: Cell Types)
```

### 1. ConvNeXt-V2 Encoders
Replaces legacy convolutional backbones with **ConvNeXt-V2** architectures pretrained via Fully Convolutional Masked Autoencoders (FCMAE; Woo et al., 2023). Supported configurations include:
- `convnextv2_tiny.fcmae_ft_in22k_in1k` (lightweight, rapid inference)
- `convnextv2_base.fcmae_ft_in22k_in1k` (balanced capacity)
- `convnextv2_large.fcmae_ft_in22k_in1k` (maximum representation power for complex multiclass tasks)

### 2. Decoupled Multi-Head Decoders
The network separates the structural task from the phenotypic task through independent decoder branches:
- **Instance Branch (`decoder_inst` + `head_inst`):** Predicts 5 continuous channels capturing nuclear geometry: horizontal ($H$) and vertical ($V$) distance gradients normalized across individual nuclei, alongside nuclear presence masks.
- **Classification Branch (`decoder_ct` + `head_ct`):** Dedicated decoder outputting logits across discrete histological cell types, preventing phenotypic gradient noise from destabilizing spatial instance boundaries.

### 3. Training & Optimization
- **Runtime:** Built natively for PyTorch 2.1+ with Automatic Mixed Precision (`use_amp = true`) and distributed data-parallel training via `torchrun`.
- **Loss Formulations:** Focal loss with label smoothing (`label_smoothing = 0.1`, $\gamma = 2$) and exponential moving average (EMA) loss tracking to combat extreme class imbalances common in rare cell types (e.g., mitoses, eosinophils).
- **GPU Spatial Augmentations:** Integrated color and geometric pipelines including randomized elastic deformation, affine scaling/zooming, rotation ($0^\circ–179^\circ$), shearing, and optical HED (Hematoxylin-Eosin-DAB) stain vector jittering.
- **Watershed Hyperparameter Optimization (`hp_search.py`):** Automated post-training search to optimize foreground and seed marker thresholds per tissue domain.

---

## Supported Datasets & Pretrained Models

Pretrained weights hosted on Zenodo are automatically resolved and downloaded by model ID:

| Dataset | Model ID | Encoder | Target Classes |
| :--- | :--- | :--- | :--- |
| **Lizard-Mitosis** | `lizard_convnextv2_large`<br>`lizard_convnextv2_base`<br>`lizard_convnextv2_tiny` | ConvNeXt-V2 (Large / Base / Tiny) | 7 classes: Neutrophil, Epithelial cell, Lymphocyte, Plasma cell, Eosinophil, Connective tissue cell, Mitosis |
| **PanNuke** | `pannuke_convnextv2_tiny_1`<br>`pannuke_convnextv2_tiny_2`<br>`pannuke_convnextv2_tiny_3` | ConvNeXt-V2 (Tiny, Folds 1–3) | 5 classes: Neoplastic, Inflammatory, Connective, Dead, Epithelial (across 19 tissue origins) |
| **Eosinophil Val** | `eos_val` | ConvNeXt-V2 | Targeted inflammatory validation cohort |

---

## Workflow & Practical Usage

### 1. Whole-Slide Image (WSI) Inference (`hover_next_inference`)

The inference engine supports native OpenSlide digital slide formats (`.svs`, `.mrxs`, `.ndpi`, `.tif`), Zeiss `.czi` (via `pylibCZIrw`), Zarr arrays, and raw NumPy dumps (`.npy`):

```bash
# Single whole-slide run with 4x Test-Time Augmentation (TTA)
python3 main.py \
    --input "/path-to-wsi/slide.svs" \
    --output_root "results/" \
    --cp "lizard_convnextv2_large" \
    --tta 4 \
    --inf_workers 16 \
    --pp_tiling 10 \
    --pp_workers 16
```

#### Performance Tuning Guidelines
- **TTA Strategy:** `--tta 4` achieves high boundary stability with minimal runtime penalty; `--tta 16` is reserved for offline benchmark validation.
- **Worker Allocation:** Set `--inf_workers` to match physical CPU cores. Allocate `--pp_workers` to cores $- 1$.
- **Memory Management (`--pp_tiling`):** Post-processing watershed operates across tiled subregions. If running low on RAM / out of memory, increase `--pp_tiling` (e.g., from 8 to 16).
- **HPC / Slurm Optimization:** Separate GPU inference from CPU watershed post-processing using the `--only_inference` flag across distinct job steps.

### 2. Containerized Execution (Apptainer / Singularity)

A pre-packaged Singularity container (`hover_next.sif`) packages PyTorch, CUDA, OpenSlide, and all dependencies:

```bash
export APPTAINER_BINDPATH="/storage"
apptainer exec --nv hover_next.sif \
    python3 main.py \
    --input "/storage/slides/*.svs" \
    --output_root "/storage/results/" \
    --cp "lizard_convnextv2_large" \
    --tta 4
```

### 3. Downstream QuPath Integration

By default, `hover_next_inference` generates:
- Full instance segmentation label maps.
- Cell centroid coordinates and categorical class lookup tables.
- **QuPath `.tsv` measurement tables**: Direct drag-and-drop import into [[QuPath]] projects for spatial analysis, threshold verification, and interactive pathology review.

---

## Context within the Bern Digital Pathology Ecosystem

HoVer-NeXt connects directly with translational computational oncology pipelines produced at the University of Bern:
- **Spatial Cell Graphs:** Cell coordinates and phenotyping generated by HoVer-NeXt serve as input graphs for spatial models such as [[Tumor budding T-cell graphs for pT1 colorectal cancer]] (Studer et al., MIDL 2023), mapping interactions between tumor buds and cytotoxic lymphocytes.
- **Complement to Patch-Level Models:** While [[WSInfer]] provides patch-level classification overlays, HoVer-NeXt operates at single-cell resolution, making it suitable for single-cell morphometry, density gradients, and tumor-stroma architectural boundaries.
- **Robustness Profiling:** Encoders and feature representations can be evaluated against center and scanner domain shifts using metrics from [[CRoMa]] (Grisi et al., 2026).
