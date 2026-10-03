---
type: Tool
status: Developing
language: en
title: "PathoActivationAtlas"
aliases:
  - "PathoActivationAtlas"
  - "Pathology Activation Atlas"
order: 145
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[Class visualizations and activation atlases for computational pathology]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[A distributional robustness margin for pathology foundation models]]"
  - "[[CRoMa]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
repo: https://github.com/KatherLab/PathoActivationAtlas
documentation: https://github.com/KatherLab/PathoActivationAtlas#readme
paper: https://doi.org/10.1016/j.xcrm.2026.103054
source_type: repository
external: true
adopted: false
engagement: active
license: MIT (Captum components BSD-3-Clause)
last_reviewed: 2026-10-03
---

# PathoActivationAtlas

An open-source PyTorch and Captum-based interpretability framework developed by the Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden) to inspect and audit what morphological concepts are organized inside pathology foundation models. Released alongside Gustav et al., *Cell Reports Medicine* 2026.

- **GitHub Repository:** [KatherLab/PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas) — MIT License (Captum components under BSD-3-Clause)
- **Foundational Paper:** Gustav M, Wolf F, Glasner C, Reitsam NG, Schulz S, Aschenbroich K, Märkl B, Foersch S, Kather JN. *Class visualizations and activation atlases for computational pathology.* Cell Reports Medicine 7(10):103054 (2026). [DOI: 10.1016/j.xcrm.2026.103054](https://doi.org/10.1016/j.xcrm.2026.103054); [arXiv:2603.07170](https://arxiv.org/abs/2603.07170)
- **Direct Article Link:** [ScienceDirect (PII: S2666379126004714)](https://www.sciencedirect.com/science/article/pii/S2666379126004714) | [Cell Press](https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(26)00471-4)
- **Local PDF:** [`mmc2.pdf`](file:///K:/DownloadsK/mmc2.pdf) (60 pages: 22-page corrected proof + 38-page supplement)
- **Companion Literature Clipping:** [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md)

---

## Why PathoActivationAtlas Matters

Conventional explainable AI (XAI) in digital pathology relies on **local feature attribution** (e.g., attention heatmaps, Grad-CAM, integrated gradients). These heatmaps show *where* a classifier attended on a specific patient slide, but they cannot answer:
1. **What archetype morphology** has the foundation model learned to associate with a disease class?
2. **How do representations evolve** across transformer depth from early edge detectors to high-level diagnostic features?
3. **Does representation separation track real biology**, or is the classifier exploiting non-biological dataset shortcuts and unsupportable taxonomies?

PathoActivationAtlas adapts two global feature-visualization methods originally introduced by Olah et al. to frozen pathology vision transformers (such as **UNI**, ViT-L/16, 24 transformer layers, 1024 embedding dimension) paired with linear classification heads:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               PATHOACTIVATIONATLAS ARCHITECTURE                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

   1. Class Visualizations (CVs)
      [ Random Noise in Fourier Space ] ──> [ Frozen UNI Backbone + Linear Head ]
                     ▲                                      │
                     └────── Optimize Logit Maximization ───┘ (8,192 steps)
                                      ▼
               Synthetic Prototypical Class Image (Texture / Pattern Archetype)

   2. Activation Atlases (AAs)
      [ High-D Activations from All Patches ] ──> [ 2D t-SNE Embedding ]
                                                              │
                                                              ▼
      [ Aggregate Cell Mean Vectors ] <── [ Grid Binning (10×10 or 20×20) ]
                     │
                     ▼
      [ L2 Feature Inversion Optimization ] (8,192 steps)
                     │
                     ▼
      Synthetic Multi-Concept Topological Landscape Across Transformer Layers
```

---

## Codebase Architecture

The repository is modularly structured into generation, evaluation, annotation, and interactive viewing subsystems:

```
PathoActivationAtlas/
├── create.py                  # Main entry point for generating CVs and AAs
├── view.py                    # Interactive PyQt / desktop GUI viewer
├── annotate.py                # Multi-rater pathologist annotation interface
├── conda_env.yml              # Conda environment specification
├── pyproject.toml             # Project build and package configuration
├── config/                    # Configuration files
│   ├── uni_nct.yaml           # NCT-CRC-HE-100K experiment config
│   ├── NCT-CRC-HE-100K.csv    # Colorectal training cohort manifest
│   └── CRC-VAL-HE-7K.csv      # External validation cohort manifest
├── _creator/                  # Generation engine
│   ├── models.py              # Frozen transformer backbones and linear probe wrappers
│   ├── captum_fragments.py    # Spatial transformations, Fourier parameterization (PyTorch Captum)
│   ├── objective_funcs.py     # Logit maximization and L2 feature distance loss functions
│   ├── optimizers.py          # Adam optimizer setups with learning rate schedules
│   ├── transformations.py     # Spatial jitter and padding transforms to suppress artifacts
│   ├── metrics.py             # Attribution, DreamSim, LPIPS, and Mahalanobis metrics
│   ├── custom_lpips.py        # Pathology-adapted LPIPS feature extraction
│   ├── datasets.py            # Patch dataset loaders and normalization pipelines
│   ├── thumbnails.py          # Grid generation and thumbnail tiling routines
│   └── record.py              # Experiment tracking and serialization
├── _viewer/                   # Interactive visualization GUI
│   ├── viewer.py              # Main viewer window with pan/zoom and layer switching
│   └── _resources/            # GUI icons and styles
├── _annotator/                # Pathologist study software
│   ├── annotator.py           # Blinded multi-reader scoring interface
│   └── _resources/            # UI components
└── modeling/                  # Linear probe training and checkpoint utilities
```

---

## Key Modules and Methods

### 1. Fourier Parameterization (`_creator/captum_fragments.py`)
Direct pixel-space backpropagation produces high-frequency checkerboard noise and adversarial artifacts. PathoActivationAtlas optimizes an unconstrained parameter tensor in the frequency (Fourier) domain, scaling frequencies by an inverse power spectrum ($1/f^\alpha$) before applying an inverse discrete 2D Fourier transform (IDFT) to yield spatial RGB patches. This enforces spatial continuity and smooth morphological boundaries.

### 2. Feature-Inversion Objective Functions (`_creator/objective_funcs.py`)
- **Class Visualizations (CV):** Maximizes the unnormalized pre-softmax logit $z_c$ for target class $c$:
  $$\mathcal{L}_{\text{CV}} = -z_c$$
- **Activation Atlases (AA):** For each 2D t-SNE grid cell $k$ with average activation vector $\bar{\mathbf{a}}_k \in \mathbb{R}^D$, optimizes a synthetic image $\hat{\mathbf{x}}$ at intermediate layer $l$ to minimize Euclidean feature distance:
  $$\mathcal{L}_{\text{AA}} = \|\phi_l(\hat{\mathbf{x}}) - \bar{\mathbf{a}}_k\|_2^2$$
Optimization runs for 8,192 iterations using Adam, ensuring convergence across deep transformer layers.

### 3. Quantitative Surrogate Metrics (`_creator/metrics.py`)
To benchmark how closely synthetic visualizations mirror real histology, the framework integrates:
- **Class Attribution:** Gradient of the target class logit with respect to internal activation vectors ($\nabla_{\mathbf{a}} z_c$).
- **Perceptual Similarity:** Nearest-neighbor **DreamSim** and **LPIPS** distances benchmarked across multiple feature backbones (AlexNet, UNI, H-Optimus-0, Prov-GigaPath).
- **Mahalanobis Distance:** Class-conditional distance modeling with Ledoit-Wolf covariance shrinkage ($\mathbf{\Sigma}^{-1}$).

---

## Installation and Quickstart

### 1. Environment Setup

```bash
git clone https://github.com/KatherLab/PathoActivationAtlas.git
cd PathoActivationAtlas

conda env create -f conda_env.yml
conda activate activation-atlas
```

### 2. Extract Activations and Build Activation Atlas

Extract activations from a trained model and generate a 2D activation atlas:

```bash
python create.py --config config/uni_nct.yaml --vis_type atlas
```

### 3. Generate Class Visualizations

Synthesize prototypical class archetype images:

```bash
python create.py --config config/uni_nct.yaml --vis_type class_vis
```

### 4. Interactive Desktop Exploration

Launch the interactive GUI viewer:

```bash
python view.py
```

- Navigate to `<save_root>/<experiment_name>/<atlas_or_class_vis>/<timestamp>/` to load the computed run.
- **Layer Exploration:** Select transformer layers from depth 1 to 24 to observe hierarchical feature abstraction.
- **Pan & Zoom:** Fluid canvas navigation to inspect micro-textures and cell transitions.
- **Overlays:** Toggle ground-truth patch overlays, gradient class attributions, and perceptual distance heatmaps.
- **Cell Tooltips:** Hover over any atlas cell to inspect source patch class distributions, attribution scores, and nearest real patches.

### 5. Running Pathologist Annotation Studies

Launch the blinded annotation interface used in the paper:

```bash
python annotate.py
```

Allows expert pathologists to score randomized, blinded real H&E patches versus synthetic visualizations to measure concordance (Cohen's $\kappa$, Fleiss' $\kappa$, Krippendorff's $\alpha$).

---

## Key Model Auditing Safeguards

PathoActivationAtlas provides concrete safeguards against common digital pathology foundation model failure modes:

| Diagnostic Question | Audit Capability | Paper Observation |
|---|---|---|
| **Shortcut Detection** | Inspects whether the classifier relies on non-tissue artifacts | CVs expose whether a class is dominated by pen ink, stasis bubbles, or scanner illumination gradients |
| **Layer-Wise Concept Formation** | Tracks representation depth across layers 1 to 24 | Layers 1–6 capture low-level edges; **Layer 14 provides the optimal balance of coherent morphology**; layers 20–24 become fragmented |
| **Taxonomy Calibration** | Tests whether fine cancer subclasses possess distinct morphology | Distinct tissues (adipose, stroma, tumor) separate cleanly; overlapping cancer subtypes disperse, mirroring human diagnostic disagreement |
| **The 42-of-42 Audit Rule** | Validates feature visualizations as model audits | In all 42 head-to-head comparisons, pathologists achieved higher diagnostic certainty on real H&E than synthetic images; CVs must never be used as surrogate histology |

---

## Vault Context and Related Frameworks

- [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md) — The foundational publication review in *Cell Reports Medicine* (2026).
- [CRoMa](croma.md) — Department of Pathology, Radboud UMC framework evaluating foundation model multi-center scanner and cohort robustness.
- [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md) — PathoROB benchmark evaluating encoder robustness against site-specific confounders.
- [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](../Clippings/Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md) — Systematic trade-off analysis across modern foundation models (UNI2, Virchow2, Kaiko, Phikon-v2, Lunit).
- [NuClick](nuclick.md) & [CellQuant-Net](cellquant-net.md) — High-throughput nuclear instance segmentation and cellular quantification tools.

<!-- tolaria:related:start -->

## See also

* [A distributional robustness margin for pathology foundation models](../Clippings/A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md)
* [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md)
* [CRoMa](croma.md)
* [Digital Pathology](digital-pathology.md)
* [Image Analysis](image-analysis.md)
* [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](../Clippings/Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md)
* [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md)

<!-- tolaria:related:end -->
