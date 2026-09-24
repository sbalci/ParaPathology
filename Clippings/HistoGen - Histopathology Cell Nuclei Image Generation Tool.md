---
type: Clipping
status: Evergreen
language: en
title: "HistoGen: Histopathology Cell Nuclei Image Generation Tool"
source: "https://github.com/DIDSR/HistoGen"
source_type: repository
author:
  - "[[Seyed Kahaki]]"
  - "[[Shijie Li]]"
  - "[[Tahsin Rahman]]"
  - "[[Weijie Chen]]"
  - "[[Nicholas Petrick]]"
  - "[[FDA DIDSR]]"
published: 2026-08-04
created: 2026-09-17
description: "An open-source computational pathology toolbox and conditional diffusion model (DDPM) developed by the FDA Center for Devices and Radiological Health (CDRH/DIDSR, Regulatory Science Tool RST26DP02.01). Translates nuclear instance segmentation masks via HoVer-Net style semantic and horizontal/vertical (HV) distance maps into highly realistic synthetic H&E histopathology patches, providing controllable data augmentation, rare disease synthesis, and validation benchmarks for clinical digital pathology AI models."
tags:
  - clippings
  - computational-pathology
  - generative-ai
  - diffusion-models
  - segmentation
  - nuclei
  - synthetic-data
  - fda
  - regulatory-science
order: 160
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
  - "[[Digital Pathology Software]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Considerations for digital pathology displays]]"
  - "[[HoVer-NeXt]]"
---

# HistoGen: Histopathology Cell Nuclei Image Generation Tool

**HistoGen** is an open-source computational pathology software toolbox developed by regulatory scientists and research engineers at the **U.S. Food and Drug Administration (FDA)** within the **Division of Imaging, Diagnostics, and Software Reliability (DIDSR)**, Office of Science and Engineering Laboratories (OSEL), Center for Devices and Radiological Health (CDRH).

- **FDA Regulatory Science Tool:** RST26DP02.01 (CDRH Catalog of Regulatory Science Tools)
- **Source Code Repository:** [GitHub: DIDSR/HistoGen](https://github.com/DIDSR/HistoGen)
- **Model Checkpoints:** [Hugging Face: didsr/HistoGen](https://huggingface.co/didsr/HistoGen)
- **Core Methodology Paper:** Kahaki S, Li S, Rahman T, Chen W, Petrick N. *Assessment of Conditional Diffusion Model for Synthetic Histopathology Image Generation.* [arXiv:2608.03990](https://arxiv.org/abs/2608.03990) (August 2026).
- **Primary Contacts:** Seyed Kahaki (`seyed.kahaki@fda.hhs.gov`), Tahsin Rahman, `RST_CDRH@fda.hhs.gov`
- **Supported Environment:** Linux (Ubuntu 22.04 LTS recommended), Python 3.12+, PyTorch 2.9+, CUDA GPU

---

## Executive Summary

Supervised deep learning systems in computational pathology—particularly those performing nuclear instance segmentation, cellular classification, and tissue subtyping—suffer from severe data bottlenecks. Whole-slide image (WSI) annotation requires exhaustive, labor-intensive manual outlining by expert pathologists, which is prone to inter-observer discordance, institutional staining bias, and stringent patient privacy restrictions. Furthermore, rare disease entities and unusual cytomorphological phenotypes are inherently underrepresented in public archives.

**HistoGen** solves this challenge by implementing a **conditional Denoising Diffusion Probabilistic Model (DDPM)** that translates user-specified nuclear instance segmentation masks into photo-realistic, multi-cellular Hematoxylin and Eosin (H&E) stained histopathology image patches. By decoupling spatial tissue topology (where cells are positioned and their geometric shapes) from photographic appearance (chromatin texture, nuclear pleomorphism, cytoplasmic density, and stroma), HistoGen enables:

1. **Controllable Synthetic Data Augmentation:** Infinite generation of diverse, realistic H&E patches from existing segmentation masks (e.g., MoNuSeg, PanNuke, TNBC, TCGA, DSB2018).
2. **Rare Variant Simulation:** Programmatic synthesis of atypical cellular architectural patterns and high-grade nuclear pleomorphism to stress-test diagnostic AI models.
3. **Medical Device & AI Assessment:** A standardized platform for FDA regulatory scientists and AI developers to assess the robustness, domain adaptation, and generalization limits of digital pathology segmentation models.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           HISTOGEN PIPELINE                                 │
└─────────────────────────────────────────────────────────────────────────────┘
  Input Mask (e.g., .mat)
         │
         ▼
  [Instance Segmentation Mask] (N unique integer IDs)
         │
         ▼
  [Feature Transformation]
         ├── Channel 1: Binary Semantic Foreground/Background Mask [0, 1]
         ├── Channel 2: Horizontal Distance Gradient Map (HoVer-Net) [-1, 1]
         └── Channel 3: Vertical Distance Gradient Map (HoVer-Net) [-1, 1]
         │
         ▼
  [3-Channel Spatial Conditioning Tensor] (H × W × 3, values in [-1, 1])
         │
         ▼
  ┌─────────────────────────────────────────────────────────────────────────┐
  │         Conditional U-Net Diffusion Model (DDPM)                        │
  │  - Spatially Adaptive Normalization (SPADE)                             │
  │  - Reverse Denoising Steps (t = T → 0, DDIM respacing enabled)          │
  │  - Coarse (150k steps) → Finetuned Checkpoint (290k steps)              │
  └────────────────────────────────────┬────────────────────────────────────┘
                                       │
                                       ▼
             [Realistic Synthetic H&E Histopathology Patch]
                   (Exact 1:1 Nuclear Mask Alignment)
```

---

## Technical Architecture & Methodological Highlights

### 1. Conditional Denoising Diffusion Probabilistic Model (DDPM)
Prior synthetic pathology approaches predominantly utilized Conditional Generative Adversarial Networks (cGANs, Pix2Pix, CycleGAN). While computationally fast, GANs frequently suffer from:
- **Mode Collapse:** Generating repetitive cellular textures with minimal variation.
- **Structural Hallucination:** Fabricating spurious cell nuclei where none existed in the mask, or dropping dense clusters.
- **Artifact Generation:** Introducing unnatural tile seams, grid artifacts, and unnatural color bleed.

HistoGen adopts a **conditional DDPM** parameterized by a U-Net backbone. The forward diffusion process systematically corrupts a real histology image with Gaussian noise across $T$ discrete timesteps. The reverse diffusion network is conditioned on the nuclear guidance map at every step, gradually restoring realistic cellular and stromal structures with mathematically guaranteed sample diversity and stable training dynamics.

### 2. Spatial Conditioning via HoVer-Net Distance Maps
Directly feeding raw integer instance IDs or simple binary masks into a convolutional neural network causes boundary ambiguity when cells are tightly packed or overlapping. 

HistoGen adopts the spatial formulation established by Graham et al. in [[HoVer-NeXt]] / HoVer-Net:
1. **Semantic Mask:** Distinguishes nuclear mass from background stroma.
2. **Horizontal (H) and Vertical (V) Distance Gradients:** Each pixel within an instance is normalized to represent its relative horizontal and vertical distance from the center of mass of that individual nucleus, scaled to the range $[-1.0, 1.0]$.

**Engineering Rationale:**
- **Boundary Disambiguation:** Continuous gradient slopes create sharp transitions at cell interfaces, forcing the diffusion model to delineate distinct nuclear membranes between neighboring cells.
- **High-Frequency Information:** Normalized distance fields provide rich, localized spatial gradients that convolutional layers process far more effectively than flat binary indicators.
- **Dimensional Compatibility:** The resulting tensor has dimension `(H, W, 3)`, perfectly matching standard multi-channel image processing pipelines.

### 3. Checkpoint Staging: Coarse vs. Finetuned
HistoGen provides two distinct weights on [Hugging Face](https://huggingface.co/didsr/HistoGen):
- **Coarse Checkpoint (`model150000.pt`):** Captured after 150,000 training iterations. Establishes global chromatic balance, background collagen distribution, and general cellular morphology.
- **Finetuned Checkpoint (`model290000.pt`):** Trained through 290,000 iterations. Sharpens fine intra-nuclear chromatin texture (euchromatin vs. heterochromatin), distinct nucleoli, membrane irregularity, and focal cytoplasmic eosinophilia. Pathologist audits confirmed that fine-tuning significantly reduces blurring and eliminates nuclear boundary artifacts.

### 4. Accelerated Sampling & Memory Management
- **Timestep Respacing:** Leverages DDIM-style sub-sampling during the reverse trajectory to generate images in a fraction of the time required by standard 1000-step DDPMs.
- **Half-Precision (FP16):** Built-in support for 16-bit floating point arithmetic minimizes VRAM overhead, allowing the synthesis of large $1024 \times 1024$ patches on single commercial workstation GPUs.
- **Batching & Cropping:** Allows batch execution or sub-patch cropping when processing massive whole-slide annotation grids.

---

## Validation: Beyond Standard Vision Metrics (arXiv:2608.03990)

A pivotal scientific contribution of the DIDSR team's research (*Kahaki et al., August 2026*) is exposing the failure of standard computer vision metrics when assessing medical generative models:

### The ImageNet Feature Mismatch
Generative image quality is conventionally measured by:
- **Fréchet Inception Distance (FID):** Comparing feature distributions of real and synthetic images.
- **Inception Score (IS):** Assessing sharpness and class entropy.

Both metrics traditionally rely on an **Inception-v3** backbone pretrained on **ImageNet** (dogs, cars, landscapes). ImageNet features emphasize macroscopic object silhouettes and high-contrast edges, completely missing:
- Subtle chromatin granularity and nucleolar margination.
- Eosinophilic fibrillar matrix nuances.
- Histological staining artifacts (crush, fold, out-of-focus blur).

### Digital Pathology Foundation Model Metrics
The authors proposed calculating modified FID and IS metrics using deep **digital pathology foundation models** pretrained on hundreds of thousands of WSIs. When benchmarked against downstream nuclear instance segmentation models (measuring Aggregated Jaccard Index [AJI+] and Dice coefficient):

| Metric Variant | Pretraining Domain | Correlation with Downstream Segmentation ($r$) |
|---|---|---|
| **Conventional Inception Score (IS)** | ImageNet (Natural Images) | $r = 0.0708$ (Negligible / Uninformative) |
| **Pathology Foundation Model IS** | Digital Pathology Corpora | **$r = 0.6096$ (Strong Positive Correlation)** |

### Diversity vs. Perceptual Fidelity
Crucially, the study demonstrated that **dataset variety and phenotypic diversity in generated training samples correlate more strongly with improved segmentation generalization than individual image visual fidelity**. An AI model trained on diverse synthetic cells with varying densities, stains, and nuclear shapes exhibits substantially higher out-of-distribution resilience than one trained on near-identical, hyper-polished synthetic images.

---

## Quickstart & Implementation Guide

### 1. Environment Setup

```bash
# Clone the DIDSR repository
git clone https://github.com/DIDSR/HistoGen.git
cd HistoGen

# Create and activate environment
python3 -m venv HistoGen_env
source HistoGen_env/bin/activate

# Install dependencies (requires GPU)
pip install -r requirements.txt
```

### 2. Python Inference Snippet

```python
import os
import sys
import torch
import numpy as np
import scipy.io as sio

sys.path.insert(0, os.path.abspath('src'))
from nudiff.image_syn.utils.datasets import get_hv
from nudiff.image_syn.utils.script_util import (
    model_and_diffusion_defaults,
    create_model_and_diffusion,
    args_to_dict,
)
from image_gen_utils import *

# 1. Load Instance Segmentation Mask (.mat format)
mask_data = sio.loadmat('data/TCGA-21-5784-01Z-00-DX1.mat')['inst_map']
# Ensure dimensions are multiples of 32 (e.g., 1024x1024)
padded_mask = pad_to_multiple(mask_data, multiple=32)

# 2. Convert to 3-Channel Semantic + Horizontal/Vertical Distance Map
sem_hv_mask = get_hv(padded_mask)  # Shape: (1024, 1024, 3), range: [-1, 1]

# 3. Initialize Model and Load Checkpoints
device = "cuda" if torch.cuda.is_available() else "cpu"
model, diffusion = create_model_and_diffusion(
    **model_and_diffusion_defaults()
)
checkpoint = torch.load("checkpoints/model290000.pt", map_location=device)
model.load_state_dict(checkpoint)
model.to(device).eval()

# 4. Generate Synthetic H&E Patches (with DDIM fast sampling & FP16)
with torch.no_grad():
    synthetic_image = generate_from_mask(
        model=model,
        diffusion=diffusion,
        mask=sem_hv_mask,
        fast_generation=True,   # Uses timestep respacing
        device=device
    )

# 5. Save Output
save_image(synthetic_image, "outputs/synthetic_he_patch.png")
```

---

## Regulatory Science & Clinical Context

### FDA Catalog of Regulatory Science Tools (RST26DP02.01)
The FDA’s **Catalog of Regulatory Science Tools** compiles peer-reviewed, scientifically validated methods designed to help medical device sponsors and researchers evaluate novel technologies.

- **Status:** Regulatory science tools are published to foster innovation and improve assessment consistency. They are **not** pre-qualified *Medical Device Development Tools (MDDT)* and do not constitute formal regulatory clearance for a specific marketing submission context.
- **Application in Submissions:** Device developers building AI/ML digital pathology software (e.g., automated mitotic figure counters, tumor budding analyzers, or multiplex cell classifiers) can utilize HistoGen to generate synthetic stress-testing cohorts, benchmark data robustness, and substantiate algorithm performance across edge cases.

---

## Related Vault Notes

- **Primary Disciplines:** [[Digital Pathology]], [[Image Analysis]], [[Digital Pathology Software]], [[What AI Can and Cannot Do in Pathology]]
- **Nuclear Segmentation Models:** [[HoVer-NeXt]]
- **Foundation Models & Benchmarking:** [[Towards robust foundation models for digital pathology]], [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]
- **Governance & Regulatory Standards:** [[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]], [[Considerations for digital pathology displays]]
