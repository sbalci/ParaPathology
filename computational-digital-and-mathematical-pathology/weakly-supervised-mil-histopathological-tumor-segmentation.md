---
type: Note
status: Evergreen
language: en
related_to:
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
url: https://arxiv.org/abs/2004.05024
repository: https://github.com/MarvinLer/tcga_segmentation
---

# Weakly supervised MIL histopathological tumor segmentation

**Lerousseau M, Vakalopoulou M, Classe M, Adam J, Battistella E, Carré A, Estienne T, Henry T, Deutsch E, Paragios N.** *Weakly supervised multiple instance learning histopathological tumor segmentation.* MICCAI 2020, pp. 470–479, Springer.

- Paper: [arXiv:2004.05024](https://arxiv.org/abs/2004.05024)
- Code and data: [MarvinLer/tcga_segmentation](https://github.com/MarvinLer/tcga_segmentation) (AGPL-3.0)

## Problem

Pixel-level tumor annotation of whole slide images (WSI) is the main bottleneck for training segmentation models: it is slow, expensive, and hard to scale across cancer phenotypes. This paper asks whether tumor segmentation can be learned from **slide-level binary labels only** (tumor present / normal), which already exist in routine clinical and TCGA metadata — no pathologist contouring required.

## Method

A multiple instance learning (MIL) scheme with on-the-fly proxy labels, governed by two parameters:

- For each **tumor-labeled** slide, a batch of 150 tiles (224×224 px, 20x magnification) is inferred; the top **α%** highest-probability tiles get proxy label 1 (tumor), the bottom **β%** get proxy label 0 (normal), and the rest are masked out of the loss.
- α is interpreted as the minimum assumed relative tumor area per slide, β as the minimum normal-tissue area (constraint: α + β ≤ 1).
- For **normal** slides, all tiles are labeled 0.
- Backbone: ResNet50 pretrained on ImageNet, binary cross-entropy, Adam (lr 10⁻⁴), 20 epochs. The approach is generic — it can wrap most patch-based classifiers and loss functions, and trained models produce heatmaps directly without needing α/β at inference.

## Data and results

- Trained on TCGA **snap-frozen** WSI from breast, kidney, and bronchus/lung (no slide curation, to mirror clinical practice); 130 test slides were manually contoured by a junior pathologist and validated by a senior pathologist.
- Best configuration (α = 0.2, β = 0.2) reached **pixelwise AUC 0.804** in-distribution; average across 15 (α, β) configurations was 0.675 ± 0.132. Bronchus/lung was consistently the hardest location (~2× the AUC error of breast and kidney).
- Out-of-location generalization (organs unseen in training) was close to in-distribution: average AUC 0.679 ± 0.154.
- On **PatchCamelyon** (FFPE sentinel lymph nodes — a strong domain shift from frozen sections), the best configuration reached AUC 0.802 versus 0.963 for fully supervised models trained on that dataset, suggesting the framework learns fairly generic tumor features.

## The repository

[MarvinLer/tcga_segmentation](https://github.com/MarvinLer/tcga_segmentation) is more than the paper code — it is an end-to-end pipeline:

1. **TCGA download + preprocessing tool**: takes a GDC manifest, downloads WSI via the GDC Data Transfer Tool, tiles slides at a chosen magnification, removes background, and extracts per-slide binary tumor labels from TCGA sample-type codes.
2. **PyTorch training pipeline** for the weakly supervised segmentation scheme (`python -m code.training`, with tunable `--alpha`, `--beta`, `--max-bag-size`).
3. **Released resource: 6,481 semi-automatically generated tumor maps** for all snap-frozen TCGA WSI of breast, kidney, and bronchus/lung (expected AUC > 0.93), downloadable from the repo's releases page.

## Why this matters for pathology

- Shows that routinely available diagnostic labels can substitute for exhausting manual contouring — a practical route to scaling pathomics across tumor types.
- The α/β formulation makes the pathologist's prior explicit ("at least this fraction of the slide is tumor"), which is clinically interpretable.
- The released tumor maps lower the barrier of entry for downstream TCGA research (e.g., restricting molecular-correlation analyses to neoplastic regions) without any annotation effort.
- Caveats: trained on frozen sections (FFPE generalization is limited without adaptation), pixelwise AUC ≈ 0.8 is well below fully supervised performance, and performance varies notably by organ.
