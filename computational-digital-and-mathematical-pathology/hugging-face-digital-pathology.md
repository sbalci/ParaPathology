---
status: Evergreen
language: en
type: Reference
aliases:
  - "Hugging Face Digital Pathology"
order: 120
belongs_to: "[[Digital Pathology]]"
---
# Hugging Face Digital Pathology

A curated catalog of digital-pathology models on Hugging Face. Image models only — pathology-report NER models (OpenMed et al.) are out of scope here.

For all models below, expect **non-diagnostic** licensing and use; benchmark before any clinical or downstream task. Most foundation models are **gated** (request access on the model card).

---

## Foundation patch encoders

The current workhorses for tile-level feature extraction. Plug into MIL/aggregator heads for slide-level tasks.

| Model | Owner | Arch | Pretraining | Downloads | Likes | Notes |
|---|---|---|---|---|---|---|
| [`MahmoodLab/UNI`](https://huggingface.co/MahmoodLab/UNI) | MahmoodLab (Harvard) | ViT-L/16 | Mass-100K H&E | ~43k/mo | 300 | Gated. CC-BY-NC-SA. |
| [`MahmoodLab/UNI2-h`](https://huggingface.co/MahmoodLab/UNI2-h) | MahmoodLab | ViT-H | Larger Mass dataset | ~92k/mo | 121 | UNI successor. |
| [`paige-ai/Virchow`](https://huggingface.co/paige-ai/Virchow) | Paige | ViT-H | 1.5M MSK slides | ~22k/mo | 73 | Gated. |
| [`paige-ai/Virchow2`](https://huggingface.co/paige-ai/Virchow2) | Paige | ViT-H | Updated pretraining | ~84k/mo | 122 | Current Paige FM. |
| [`prov-gigapath/prov-gigapath`](https://huggingface.co/prov-gigapath/prov-gigapath) | Microsoft / Providence | Slide-level FM | Providence health network | ~48k/mo | 167 | Tile + slide encoder; Nature 2024. |
| [`owkin/phikon`](https://huggingface.co/owkin/phikon) | Owkin | ViT-B (iBOT) | TCGA | ~15k/mo | 39 | Open-weights. |
| [`owkin/phikon-v2`](https://huggingface.co/owkin/phikon-v2) | Owkin | ViT-L (DINOv2) | Larger pan-cancer | ~142k/mo | 36 | Successor to Phikon. |
| [`bioptimus/H-optimus-0`](https://huggingface.co/bioptimus/H-optimus-0) | Bioptimus | ViT-G | ~500k slides | ~36k/mo | 78 | |
| [`bioptimus/H-optimus-1`](https://huggingface.co/bioptimus/H-optimus-1) | Bioptimus | ViT-G | ~1M slides | ~10k/mo | 43 | Newer. |
| [`bioptimus/H0-mini`](https://huggingface.co/bioptimus/H0-mini) | Bioptimus | Distilled small | — | ~82k/mo | 12 | Lighter inference variant. |
| [`histai/hibou-b`](https://huggingface.co/histai/hibou-b) | HistAI | ViT-B (DINOv2) | — | ~21k/mo | 18 | |
| [`histai/hibou-L`](https://huggingface.co/histai/hibou-L) | HistAI | ViT-L (DINOv2) | — | ~15k/mo | 19 | |
| [`1aurent/...kaiko_ai_towards_large_pathology_fms`](https://huggingface.co/1aurent) | kaiko.ai (re-host) | ViT-S/B/L variants | kaiko.ai paper | ~6k/mo | 2 | Community mirror. |
| [`1aurent/swin_tiny_patch4_window7_224.CTransPath`](https://huggingface.co/1aurent/swin_tiny_patch4_window7_224.CTransPath) | (re-host) | Swin-T | CTransPath weights | ~6k/mo | 3 | Older but widely cited baseline. |

**Pick guide**
- Best general embeddings today: **UNI2-h**, **Virchow2**, **Phikon-v2**, **H-Optimus-1**.
- Open / non-gated: **Phikon / Phikon-v2**, **Hibou**, **H0-mini**, the `1aurent` re-hosts.
- Need slide-level out of the box: **Prov-GigaPath**.
- **Most robust to the contributing centre: CONCH / CONCHv1.5, Virchow2, H0-mini.** Least robust: **Phikon**, **Phikon-v2**, **Hibou-L**, **Hibou-B**.

> **Accuracy and robustness are different axes, and this list ranks only the first.** Two independent 20-model studies find that every pathology foundation model encodes the contributing hospital — staining, scanner, sectioning — strongly enough to be exploited as a shortcut, and that the ordering by robustness barely resembles the ordering by benchmark accuracy. Phikon-v2 is the sharpest example: recommended above on general embedding quality, it sits near the bottom on robustness in both studies, and in one experiment a downstream model built on it called 94% of normal patches from one centre tumour. Before choosing an encoder for multi-centre material, read [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md) and [A distributional robustness margin for pathology foundation models](../Clippings/A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md), and measure it yourself with [CRoMa](croma.md).

---

## Vision–language / multimodal

| Model | Owner | DL | Likes | Notes |
|---|---|---|---|---|
| [`MahmoodLab/CONCH`](https://huggingface.co/MahmoodLab/CONCH) | MahmoodLab | ~109k/mo | 161 | Image–text pathology CLIP-style. Gated. |
| [`MahmoodLab/conchv1_5`](https://huggingface.co/MahmoodLab/conchv1_5) | MahmoodLab | — | 21 | CONCH v1.5 (vision tower). |
| [`paige-ai/Prism`](https://huggingface.co/paige-ai/Prism) | Paige | ~18k/mo | 35 | Slide-level VL on top of Virchow. |
| [`MahmoodLab/TITAN`](https://huggingface.co/MahmoodLab/TITAN) | MahmoodLab | ~53k/mo | 84 | Slide-level multimodal, built on CONCH v1.5. |

**Use for**: zero-shot tile/slide classification, retrieval (image↔report), captioning prototypes.

---

## Slide-level aggregators (MIL heads)

Pretrained ABMIL / aggregator heads that pair with the foundation encoders above. Saves training a MIL head from scratch when an off-the-shelf task is enough.

- **MahmoodLab pan-cancer ABMIL** (~108k slides, 24-task panel):
  - [`MahmoodLab/abmil.base.conch_v15.pc108-24k`](https://huggingface.co/MahmoodLab/abmil.base.conch_v15.pc108-24k)
  - [`MahmoodLab/abmil.base.uni_v2.pc108-24k`](https://huggingface.co/MahmoodLab/abmil.base.uni_v2.pc108-24k)
  - [`MahmoodLab/abmil.base.uni.pc108-24k`](https://huggingface.co/MahmoodLab/abmil.base.uni.pc108-24k)
- **Slide-level retrieval / alignment**: [`MahmoodLab/madeleine`](https://huggingface.co/MahmoodLab/madeleine), [`MahmoodLab/SEAL`](https://huggingface.co/MahmoodLab/SEAL).
- **Camelyon16 metastasis ABMIL** (kaczmarj — one head per encoder backbone):
  - `kaczmarj/metastasis-detection.camelyon16.abmil.uni`
  - `kaczmarj/metastasis-detection.camelyon16.abmil.virchow`
  - `kaczmarj/metastasis-detection.camelyon16.abmil.phikon`
  - `kaczmarj/metastasis-detection.camelyon16.abmil.hoptimus0`
  - (additional encoder pairings exist in the same collection)

---

## Specialty: segmentation, cells, multiplex, organ-specific

- **Cell / nuclei segmentation**
  - [`Owkin-Bioptimus/CytoSyn`](https://huggingface.co/Owkin-Bioptimus/CytoSyn) — synthetic-trained cell segmenter.
  - [`owkin/histoplus`](https://huggingface.co/owkin/histoplus) — cell-level model.
  - [`histai/cellvit-hibou-l`](https://huggingface.co/histai/cellvit-hibou-l) — CellViT on Hibou-L backbone.
  - Note: **HoVer-Net** and most classic nuclei-instance models live outside HF (GitHub / TIA Toolbox).
- **Tissue segmentation**: [`MahmoodLab/hest-tissue-seg`](https://huggingface.co/MahmoodLab/hest-tissue-seg).
- **Multiplex / spatial proteomics**: [`MahmoodLab/KRONOS`](https://huggingface.co/MahmoodLab/KRONOS), [`MahmoodLab/KRONOSv2`](https://huggingface.co/MahmoodLab/KRONOSv2). Thin coverage on HF overall for IHC/multiplex.
- **Organ-specific patch classifiers (Hibou-based)**:
  - [`histai/SPIDER-breast-model`](https://huggingface.co/histai/SPIDER-breast-model)
  - [`histai/SPIDER-colorectal-model`](https://huggingface.co/histai/SPIDER-colorectal-model)
  - [`histai/SPIDER-skin-model`](https://huggingface.co/histai/SPIDER-skin-model)
  - [`histai/SPIDER-thorax-model`](https://huggingface.co/histai/SPIDER-thorax-model)
- **Multi-task FM**: [`AI4Pathology/PathOrchestra`](https://huggingface.co/AI4Pathology/PathOrchestra).

---

## Task-specific patch classifiers — WSInfer / kaczmarj family

Small, single-task CNNs designed to drop into the [WSInfer](https://github.com/SBU-BMI/wsinfer) WSI inference pipeline. Most are re-hosts of TIA Toolbox or organ-specific Penn/Stony Brook checkpoints.

- `kaczmarj/breast-tumor-resnet34.tcga-brca` — most-used after the colorectal model (~1.4k DL).
- `kaczmarj/colorectal-tiatoolbox-resnet50.kather100k` — see detailed entry below.
- `kaczmarj/colorectal-resnet34.penn`
- `kaczmarj/prostate-tumor-resnet34.tcga-prad`
- `kaczmarj/lung-tumor-resnet34.tcga-luad`
- `kaczmarj/pancreas-tumor-preactresnet34.tcga-paad`
- `kaczmarj/pancancer-lymphocytes-inceptionv4.tcga`
- `kaczmarj/lymphnodes-tiatoolbox-resnet50.patchcamelyon`

### kaczmarj/colorectal-tiatoolbox-resnet50.kather100k

- URL: https://huggingface.co/kaczmarj/colorectal-tiatoolbox-resnet50.kather100k
- Author: Jakub Kaczmarzyk (Stony Brook)
- Created: 2023-06-21 · Last updated: 2023-08-03
- License: CC-BY-4.0
- Frameworks: PyTorch / safetensors / Transformers (`AutoModel`)
- Pipeline tag: `image-classification`
- Downloads: ~673/month, ~11.8k all-time · Likes: 2

**What it is**
ResNet50 patch classifier for colorectal H&E histology, re-hosted from the TIA Toolbox model zoo.

**Training data**
Kather100K (Zenodo DOI `10.5281/zenodo.1214456`): 100,000 non-overlapping H&E patches from CRC and normal tissue, 9 classes (ADI, BACK, DEB, LYM, MUC, MUS, NORM, STR, TUM) at ~0.5 µm/px, 224×224.

**Practical notes**
- Re-host, not a re-train — accuracy follows the original TIA Toolbox checkpoint.
- Card's "Reusing the model" section is still "Coming soon…"; no documented preprocessing on HF. Mirror TIA Toolbox's input pipeline (RGB, 224×224, ImageNet-style normalization) for valid predictions.
- Belongs to the **H&E Patch Classification** collection, intended for use with **WSInfer** — cleanest deployment path for whole-slide inference.
- No `model-index` / eval results, no inference provider, no examples — building block, not a turnkey clinical tool.

**Use cases / caveats**
- Good baseline for CRC tile classification, stroma/tumor/lymphocyte mapping, TSR-like quantification.
- Domain shift risk on non-Kather scanners/stains; benchmark before downstream use.
- Not intended for diagnostic use.

**Original / upstream sources**
- **TIA Toolbox model zoo** (University of Warwick — TIA Centre): actual training and weights. See `tiatoolbox.models` and Pocock et al. 2022 (*Communications Medicine*).
- **Kather100K dataset**: Kather, Halama, Marx (2018), Zenodo `10.5281/zenodo.1214456`.
- **ResNet50 architecture**: He et al. 2016.

**Why the re-host exists**
Kaczmarzyk maintains [WSInfer](https://github.com/SBU-BMI/wsinfer); the HF mirror packages TIA Toolbox checkpoints in a Transformers-friendly format (safetensors, `AutoModel`) so they can be pulled directly from the Hub without depending on TIA Toolbox's download paths. Same weights, different distribution channel.

For citation/benchmarking: credit **TIA Toolbox / Pocock et al.** for the model and **Kather et al.** for the data.

---

## Quick takeaways

- **Embeddings / features** → UNI2-h, Virchow2, Phikon-v2, H-Optimus-1 (most are gated; CC-BY-NC-SA common).
- **Vision–language search / captioning** → CONCH (gated, open weights) or Prism (slide-level).
- **Slide-level out-of-the-box** → Prov-GigaPath, or MahmoodLab pan-cancer ABMIL heads on top of UNI/CONCH.
- **Turnkey patch inference** → WSInfer / kaczmarj family — same flavor as the colorectal entry above.
- **Gaps on HF**: nuclei-instance segmentation (HoVer-Net etc. live mostly outside HF); IHC/multiplex thin (KRONOS is the main entry); few stain normalization or artifact-detection models.

## Caveats across the catalog

- **Gating**: foundation models from MahmoodLab, Paige, Bioptimus typically require a request form. Plan lead time.
- **Licenses**: CC-BY-NC-SA dominates the FM space — commercial use is restricted. WSInfer family is permissive (CC-BY-4.0).
- **Preprocessing**: each FM has its own normalization / resolution / tile size. Mismatched preprocessing silently degrades embeddings — read the model card before extracting features at scale.
- **Benchmarks**: very few cards include `model-index` results. Cross-compare via independent benchmarks (HEST, Patch-level Pathology Benchmark, BRACS, etc.) rather than card-reported numbers.

---

## Pathology datasets on Hugging Face

Useful when you want to fine-tune, benchmark, or just probe an encoder without standing up your own data pipeline.

| Dataset | Owner | What it is |
|---|---|---|
| [`MahmoodLab/hest`](https://huggingface.co/datasets/MahmoodLab/hest) | MahmoodLab | HEST-1k: paired ST + H&E slides, the de-facto FM benchmark for spatial transcriptomics tasks. |
| [`MahmoodLab/Patho-Bench`](https://huggingface.co/datasets/MahmoodLab/Patho-Bench) | MahmoodLab | Multi-task pathology benchmark suite paired with the MahmoodLab FMs. |
| [`1aurent/PatchCamelyon`](https://huggingface.co/datasets/1aurent/PatchCamelyon) | community | PCam — lymph-node metastasis tile classification. |
| [`1aurent/NCT-CRC-HE-100K`](https://huggingface.co/datasets/1aurent/NCT-CRC-HE-100K) | community | Kather100K mirror — pairs with the colorectal model above. |
| [`1aurent/BACH`](https://huggingface.co/datasets/1aurent/BACH) | community | Breast cancer histology challenge. |
| [`jxie/pannuke`](https://huggingface.co/datasets/jxie/pannuke) | community | PanNuke — multi-organ nuclei instance/classification. |
| [`paige-ai/Prism-data-prep`](https://huggingface.co/paige-ai) collections | Paige | Tooling/datasets paired with Prism. |

Many classical sets (TCGA WSIs, CAMELYON16/17, BRACS, MIDOG) still live on their original portals (GDC, grand-challenge.org) — HF only mirrors a subset.

---

## Tooling and integration libraries

The HF model is rarely the whole story — these wrap weights into usable WSI pipelines:

- **[WSInfer](https://github.com/SBU-BMI/wsinfer)** (Stony Brook) — runs the kaczmarj patch classifiers on whole slides; the natural deployment path for that family, but take it through the [QuPath extension](https://github.com/qupath/qupath-extension-wsinfer) rather than the Python package, which has been dormant since July 2024 with its last two fixes unreleased — see [WSInfer](wsinfer.md).
- **[TIA Toolbox](https://github.com/TissueImageAnalytics/tiatoolbox)** (Warwick) — original home of the colorectal/lymphnode ResNets; full WSI IO + inference + nuclei (HoVer-Net) stack.
- **[Trident](https://github.com/mahmoodlab/TRIDENT)** / **[CLAM](https://github.com/mahmoodlab/CLAM)** (MahmoodLab) — feature extraction + MIL training pipelines wired for UNI/CONCH/Virchow embeddings.
- **[Slideflow](https://github.com/jamesdolezal/slideflow)** — end-to-end WSI training/inference; supports HF foundation encoders as backbones.
- **[MONAI Pathology](https://github.com/Project-MONAI/MONAI)** — Project MONAI's pathology module; HF integration is partial but improving.
- **[HoneyBee](https://github.com/lhoestq/honeybee)** / **`huggingface_hub`** — for pulling weights/datasets programmatically; pair with `safetensors` + `transformers.AutoModel` for the WSInfer family.

---

## Collections worth following

Hugging Face Collections aggregate related models — easier than tracking individual repos:

- **[MahmoodLab](https://huggingface.co/MahmoodLab)** — UNI / CONCH / TITAN / KRONOS / ABMIL heads / HEST.
- **[paige-ai](https://huggingface.co/paige-ai)** — Virchow / Virchow2 / Prism.
- **[bioptimus](https://huggingface.co/bioptimus)** — H-Optimus family.
- **[owkin](https://huggingface.co/owkin)** — Phikon, histoplus, cell models.
- **[histai](https://huggingface.co/histai)** — Hibou + SPIDER organ-specific models.
- **[kaczmarj](https://huggingface.co/kaczmarj)** — WSInfer-compatible patch classifiers + Camelyon16 ABMIL heads.
