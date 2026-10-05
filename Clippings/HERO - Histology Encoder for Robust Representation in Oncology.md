---
type: Clipping
status: Evergreen
language: en
title: "HERO: Histology Encoder for Robust Representation in Oncology"
source: "https://arxiv.org/abs/2609.35943"
source_type: preprint
doi: "10.48550/arXiv.2609.35943"
arxiv: "2609.35943"
review_status: Complete
last_reviewed: 2026-10-03
study_design: "Multi-cohort foundation model pretraining, morphology-balanced data curation, and multi-framework robustness benchmarking"
author:
  - "[[Zhi Li]]"
  - "[[Eghbal Amidi]]"
  - "[[Yating Cheng]]"
  - "[[Tyson Dawson]]"
  - "[[Gorkem Can Ates]]"
  - "[[Shuzhen Kuang]]"
  - "[[Norsang Lama]]"
  - "[[Md Ashequr Rahman]]"
  - "[[Zhiying Lu]]"
  - "[[Elisabeth K. Kong]]"
  - "[[Milan Radovich]]"
  - "[[David Spetzler]]"
  - "[[Matthew Oberley]]"
  - "[[George W. Sledge]]"
  - "[[Ming Chen]]"
institution: "Caris Life Sciences"
published: 2026-09-30
created: 2026-10-03
description: "HERO (Histology Encoder for Robust Representation in Oncology) is a 1.1-billion-parameter ViT-G/14 foundation model developed by Caris Life Sciences, pre-trained on a morphology-balanced corpus of 500 million tiles from approximately 575,000 whole-slide images across 21 organ groups and 3 scanner platforms. By combining cluster-quota sampling to prevent frequent tissues from dominating optimization, DINO/iBOT pretraining with a Kernel Density Estimator regularizer and HED stain perturbation, and a novel 20,000-step high-resolution Gram-anchoring refinement stage, HERO demonstrates state-of-the-art acquisition robustness across PathoROB and PLISM while ranking first on average across 39 slide-level clinical tasks on Patho-Bench and establishing the lowest equal-weighted framework rank (2.61) across six public benchmarks."
tags:
  - "clippings"
  - "foundation-models"
  - "digital-pathology"
  - "robustness"
  - "self-supervised-learning"
  - "vision-transformer"
  - "gram-anchoring"
  - "data-curation"
  - "pathorob"
  - "plism"
  - "patho-bench"
order: 95
belongs_to: "[[Clippings]]"
related_to:
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[A distributional robustness margin for pathology foundation models]]"
  - "[[CRoMa]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[PathoActivationAtlas]]"
  - "[[Class visualizations and activation atlases for computational pathology]]"
  - "[[Digital Pathology]]"
  - "[[Machine Learning]]"
---

# HERO: Histology Encoder for Robust Representation in Oncology

Preprint technical report from **Caris Life Sciences** (Irving, TX; September 2026; [arXiv:2609.35943](https://arxiv.org/abs/2609.35943); [DOI: 10.48550/arXiv.2609.35943](https://doi.org/10.48550/arXiv.2609.35943)).

---

## Executive Summary & The Robustness Paradigm Shift

Over recent years, computational pathology has been dominated by a scaling race: training vision transformers on increasingly massive proprietary archives—from UNI (100k slides), Prov-GigaPath (171k slides), and UNI2 (350k slides) to H-Optimus-1 (1M slides) and Virchow2 (3.1M slides). However, as documented across modern benchmarks ([[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]), raw scaling is now exhibiting **diminishing returns** on standard tile classification tasks. 

More critically, clinical deployment exposes a fundamental vulnerability:
1. **Acquisition Confounders as Latent Features:** Pathology vision encoders trained with standard self-supervised learning inadvertently embed non-biological acquisition factors (slide scanner optics, laboratory staining protocols, tissue thickness, and institutional batch signatures) alongside cellular morphology.
2. **The "Clever Hans" Diagnostic Trap:** In real-world multicenter cohorts, acquisition variables often correlate with diagnostic labels. Downstream linear classifiers or multiple-instance learning (MIL) aggregators exploit these institutional shortcuts instead of true histology, leading to catastrophic misclassifications when deployed on external hospitals or new scanner fleets ([[Towards robust foundation models for digital pathology]]).
3. **The Pretraining Composition Gap:** Prior efforts to mitigate batch effects relied almost exclusively on post-hoc interventions (stain normalization, ComBat batch adjustment, domain adversarial training, or feature re-embedding). The composition and sampling geometry of the pretraining dataset itself has rarely been engineered as a primary lever for robustness.

**HERO (Histology Encoder for Robust Representation in Oncology)** resolves this tension. Developed by Caris Life Sciences, HERO is a **ViT-G/14 foundation model (~1.1B parameters)** trained on approximately **575,000 clinical whole-slide images (WSIs)**. Rather than relying on raw dataset scale, HERO introduces:
- **Morphology-Balanced Cluster-Quota Curation:** Partitioning 1.126 billion candidate tiles into 100,000 fine clusters and capping frequent histological patterns to yield a 500-million-tile corpus where visual patterns enter optimization by morphological quota rather than epidemiological frequency.
- **Two-Stage Self-Supervised Pretraining:** Coupling DINO image-level and iBOT masked patch-level self-supervision with a histology-stabilized Kernel Density Estimator (KDE) regularizer and HED color-deconvolution stain jitter (Stage 1; 450k steps).
- **High-Resolution Gram-Anchored Dense Refinement:** A 20k-step refinement stage (Stage 2) using an early teacher checkpoint fed unaugmented $448 \times 448$ inputs to anchor pairwise token Gram matrices, preventing dense feature degradation during late training.

Evaluated across **six major public benchmark suites encompassing 71 metrics** (PathoROB, PLISM, EVA, THUNDER, HEST, and Patho-Bench), HERO breaks the archive-size scaling line, establishing state-of-the-art center, scanner, and stain robustness while ranking first overall across 39 clinical slide-level tasks.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                HERO SYSTEM ARCHITECTURE & TRAINING WORKFLOW                            │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  1. DIVERSE CLINICAL ARCHIVE (Caris Life Sciences)
     [ 575,000 Clinical WSIs ] ──> 21 Organ Groups, 58 Disease Lineages, 3 Scanner Platforms
                   │
                   ▼ (Tissue segmentation, 0.5 µm/px / 20×, 784×784 crops -> 392×392 Lanczos)
     [ 1.126 Billion Candidate Tiles ]

  2. MORPHOLOGY-BALANCED CLUSTER-QUOTA CURATION
     [ DINOv2 ViT-B/14 + Register Tokens ] ──> Normalized 768-d CLS Embeddings
                   │
                   ▼
     [ Step 1: k-Means Clustering ] ──> 100,000 Fine Clusters (over 48M tiles allocated by √tile count)
                   │
                   ▼
     [ Step 2: Centroid Aggregation ] ──> 10,000 Coarse Clusters
                   │
                   ▼
     [ Step 3: Quota Sampling ] ──> Cap high-frequency clusters (q_c = min(n_c, L)); keep rare without replacement
                   │
                   ▼
     [ 500 Million Morphology-Balanced Unique Tiles ] (Zero duplicates, morphology-driven update frequency)

  3. STAGE 1: SELF-SUPERVISED BACKBONE PRETRAINING (450k steps, 32× A100 GPUs)
     - Backbone: ViT-G/14 (1.1B params, 1,536-d, 4 register tokens, SwiGLU, drop-path 0.4)
     - Objectives: DINO (global) + iBOT (masked patches, p=0.5, ratio 0.1–0.5) with 131,072 prototypes
     - Regularizer: Virchow2 Kernel Density Estimator (KDE, weight 0.05) replacing KoLeo
     - Augmentation: Multi-crop (2× 224², 8× 98²) + HED stain deconvolution jitter + color jitter/blur

  4. STAGE 2: HIGH-RESOLUTION GRAM-ANCHORED REFINEMENT (20k steps)
     - Objective: DINO + iBOT + Gram-Anchoring Loss (weight 0.1)
     - Anchor: Frozen Stage 1 teacher @ 200k steps fed 448×448 crops without color distortion
     - Mechanism: Minimizes L2 distance between student and anchor token-to-token similarity (Gram) matrices
     - Result: Halts dense patch-token drift; boosts center robustness (PathoROB) & segmentation (EVA)
```

---

## Technical Specifications & Architecture

### 1. The Pretraining Corpus & The "Slide vs. Tile Share" Discrepancy

A clinical archive is fundamentally non-uniform. Tissues with expansive surface areas or routine resections generate disproportionate tile volumes compared to small needle core biopsies. In Caris's 575,000 WSI archive:
- **Female genital tract specimens** accounted for only **7% of total slides, but 27% of all extracted tiles**.
- **Lung specimens** represented **18% of slides, but only 10% of tiles**.
- Similar imbalances occurred across individual histological patterns: stroma, adipose, acellular necrosis, and common adenocarcinomas generated billions of near-identical tiles, whereas rare histological phenotypes (e.g., sarcomatoid variants, neuroendocrine differentiation, micropapillary clusters) contributed minimal numbers.

If sampled uniformly by tile or by slide, optimization updates would be completely monopolized by high-volume common morphologies. 

### 2. Morphology-Balanced Cluster-Quota Sampling

To decouple pretraining exposure from epidemiological and surgical specimen frequency without requiring manual diagnostic labels:
1. **Feature Space Indexing:** Every tile was passed through a frozen **DINOv2 ViT-B/14** encoder equipped with 4 register tokens (which absorb high-norm feature artifacts) to extract a normalized 768-dimensional CLS representation from $224 \times 224$ inputs.
2. **Two-Tier Clustering:**
   - *Tier 1 (Fine Partition):* $k$-means ($k = 100,000$) was fitted over a 48-million tile subset stratified across organs in proportion to the square root of retained tile count ($\sqrt{N_{\text{organ}}}$).
   - *Tier 2 (Coarse Aggregation):* The entire 1.126 billion tile pool was assigned to the nearest fine cluster, and the fine centroids were clustered into $10,000$ coarse clusters.
3. **Cluster Quota Allocation:**
   Each coarse cluster $c$ containing $n_c$ tiles received a maximum tile quota:
   $$q_c = \min(n_c, L)$$
   where ceiling $L$ was solved numerically to retain exactly **500 million unique tiles**. Infrequent morphologies were retained completely ($q_c = n_c$) without synthetic oversampling or replacement, while massive repetitive clusters (stroma, necrosis) were truncated.

### 3. Stage 1: Backbone & Self-Supervised Objectives

| Parameter | Configuration Specification | Rationale & Pathology Adaptation |
|---|---|---|
| **Backbone Architecture** | ViT-G/14 (~1.1 Billion Parameters) | Giant vision transformer; 1,536 token embedding dimension; SwiGLU feed-forward networks |
| **Register Tokens** | 4 learnable register tokens | Sinks high-norm background/void token spikes, preserving clean semantic patch embeddings |
| **Drop-Path Rate** | 0.4 stochastic depth | Regularization against over-fitting across deep transformer blocks |
| **Precision & Scaling** | bfloat16 mixed precision, FSDP | Fully Sharded Data Parallelism across 32 $\times$ NVIDIA A100 (80GB) GPUs |
| **Self-Supervised Heads** | DINO (image-level) + iBOT (patch-level) | Dual projection heads with **131,072 prototypes** each; Sinkhorn-Knopp teacher centering |
| **Feature Regularizer** | **Virchow2 Kernel Density Estimator (KDE)** (weight 0.05) | Replaces DINOv2's KoLeo regularizer. KoLeo collapses when batches contain identical histological textures; KDE stably repels embeddings on the unit hypersphere |
| **Stain Perturbation** | **HED Color Deconvolution Jitter** | Deconvolves RGB into Hematoxylin, Eosin, and Diaminobenzidine/Residual optical density channels, independently perturbing dye concentrations to simulate cross-lab staining variability |
| **Multi-Crop Augmentation** | 2 global crops ($224 \times 224$) + 8 local crops ($98 \times 98$) | Captures both contextual tissue architecture and fine cellular detail |
| **Optimization Schedule** | AdamW ($\beta_2 = 0.99$, weight decay 0.04), warmup + flat LR | Constant LR ($2 \times 10^{-4}$) post-warmup following DINOv3 recipe; gradient clip 3.0; 450k steps |

### 4. Stage 2: High-Resolution Gram-Anchored Dense Refinement

A critical vulnerability identified in DINOv3 is that prolonged self-supervised pretraining (beyond 200k–300k steps) continuously optimizes global image-level representations (CLS token) at the expense of **dense patch tokens**, which gradually lose spatial locality and pairwise correlation structure. This degradation impairs dense downstream tasks such as nuclear instance segmentation and fine tissue grading.

To counter this drift, HERO introduces **Stage 2 Gram Anchoring**:
- **Initialization:** Resumes directly from the Stage 1 model at step 450k.
- **Anchor Network:** The frozen Stage 1 teacher checkpoint captured at **step 200k** (prior to dense token degradation).
- **High-Resolution Target:** The anchor receives unaugmented global crops at **$448 \times 448$ pixels** (without color jitter), generating a pristine, high-resolution spatial feature map.
- **Gram-Anchoring Objective:** Measures the normalized Mean Squared Error between the student's patch-token Gram matrix $G_S$ and the anchor's Gram matrix $G_A$:
  $$\mathcal{L}_{\text{Gram}} = \frac{1}{N^2} \left\| \frac{Z_S Z_S^T}{\|Z_S\|_F} - \frac{Z_A Z_A^T}{\|Z_A\|_F} \right\|_F^2$$
  weighted at $\lambda = 0.1$ alongside DINO and iBOT losses.
- **Compute:** Trained for an additional 20,000 steps (LR $3 \times 10^{-5}$, teacher momentum 0.999). Total training across both stages required ~10 days on 32 A100 GPUs.

---

## Benchmark Results Across 6 Evaluation Suites

HERO was evaluated across **6 public benchmark frameworks encompassing 71 metrics**, maintaining frozen feature representations in all settings:

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              SIX-FRAMEWORK EVALUATION BENCHMARK SUITE                                  │
├───────────────────────────────┬───────────────────────────────┬────────────────────────────────────────┤
│ Benchmark Framework           │ Scope & Modality              │ Primary Metric                         │
├───────────────────────────────┼───────────────────────────────┼────────────────────────────────────────┤
│ 1. PathoROB (Kömen et al.)    │ Multi-center tile robustness  │ Robustness Index (RI)                  │
│ 2. PLISM (Hegde et al.)       │ Scanner & stain matched pairs │ Median Cosine Sim & Top-10 Retrieval   │
│ 3. EVA (Kang et al.)          │ Classification & segmentation │ Balanced Accuracy & Dice               │
│ 4. THUNDER (Weitz et al.)     │ Frozen features & stress tests│ Macro F1, Dice, ECE, Adversarial Drop  │
│ 5. HEST-Benchmark (Jaume)     │ Spatial gene expression       │ Mean Pearson correlation (r)           │
│ 6. Patho-Bench (Alber et al.) │ 39 Slide-level clinical tasks │ AUROC, Bal. Acc, C-index (via ABMIL)   │
└───────────────────────────────┴───────────────────────────────┴────────────────────────────────────────┘
```

### 1. Acquisition Robustness: PathoROB & PLISM

#### PathoROB Benchmark (Kömen et al., *Nat Commun* 2026)
Evaluates whether a tile's nearest neighbors in embedding space share biological identity rather than medical center origin. The **Robustness Index (RI)** measures $\mathcal{R} = \frac{|SO|}{|SO| + |OS|}$, where $SO$ denotes neighbors sharing the same biological class from other centers, and $OS$ denotes neighbors from the same center with different biology (1.0 = perfect biological clustering).

| Foundation Model | Pretraining Archive | Data Access | Camelyon (Breast) | TCGA $2 \times 2$ (Multi-organ) | Tolkach ESCA (Esophagus) | Average Robustness Index (RI) |
|---|---|---|---|---|---|---|
| **Phikon-v2** | 60k WSIs | Public | 0.019 | 0.619 | 0.768 | 0.469 |
| **UNI** | 100k WSIs | Private | 0.145 | 0.747 | 0.902 | 0.598 |
| **Prov-GigaPath** | 171k WSIs | Private | 0.399 | 0.738 | 0.754 | 0.630 |
| **UNI2** | 350k WSIs | Private | 0.544 | 0.803 | 0.923 | 0.757 |
| **H-Optimus-1** | 1,000k WSIs | Private | 0.645 | 0.853 | 0.944 | 0.814 |
| **Virchow2** | 3,100k WSIs | Private | 0.806 | 0.822 | 0.955 | 0.861 |
| **HERO (Ours)** | **575k WSIs** | **Private** | **0.836** | **0.884** | **0.956** | **0.892** |

> **Key Observation:** Across public foundation models, the Robustness Index rises log-linearly with archive size. **HERO breaks this scaling line.** Despite being trained on $5.4\times$ fewer slides than Virchow2 and roughly half that of H-Optimus-1, HERO achieved the top score across all three datasets (Average RI **0.892**). The separation was most pronounced on Camelyon (0.836 vs. Phikon-v2's 0.019), proving that HERO resists grouping tiles by hospital origin.

#### PLISM Benchmark (Hegde / Weitz et al.)
Evaluates pixel-registered tissue sections re-scanned across 7 hardware scanners and re-stained across 13 H&E protocols across 46 tissue types.

| Model | Embedding Consistency (Cosine Sim) $\uparrow$ | Cross-Scanner Top-10 Retrieval $\uparrow$ | Cross-Stain Top-10 Retrieval $\uparrow$ | Combined Shift Top-10 Retrieval $\uparrow$ | Average Metric $\uparrow$ |
|---|---|---|---|---|---|
| **Phikon-v2** | 0.557 | 0.064 | 0.030 | 0.003 | 0.164 |
| **UNI** | 0.547 | 0.532 | 0.169 | 0.053 | 0.325 |
| **UNI2-h** | 0.591 | 0.501 | 0.190 | 0.046 | 0.332 |
| **Prov-GigaPath** | 0.570 | 0.592 | 0.118 | 0.054 | 0.333 |
| **Virchow2** | 0.777 | 0.609 | 0.306 | 0.163 | 0.464 |
| **H-Optimus-0** | 0.685 | 0.744 | 0.327 | 0.166 | 0.480 |
| **HERO (Ours)** | **0.933** | **0.793** | **0.424** | **0.280** | **0.607** |

> **Key Observation:** Stain alterations induced greater embedding collapse than scanner variations across all models. HERO was the **only foundation model achieving $>0.40$ on cross-stain retrieval (0.424)**, while establishing a median matched-pair cosine similarity of **0.933** (vs. 0.777 for Virchow2 and 0.685 for H-Optimus-0).

---

### 2. General Tile & Slide Representation: EVA & THUNDER

#### EVA Benchmark (Kang et al.)
Evaluates frozen features across 8 tile-level and 2 slide-level tasks (linear probes for classification, small decoders for segmentation, ABMIL for slide tasks).

| Model | PCam10 | BACH | BRACS | CRC | PCam | Gleason | CoNSeP (Dice) | MoNuSAC (Dice) | Cam16 | PANDA | Average Score |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Phikon-v2** | 0.820 | 0.729 | 0.568 | 0.940 | 0.920 | 0.729 | 0.627 | 0.635 | 0.798 | 0.644 | 0.741 |
| **UNI** | 0.815 | 0.785 | 0.593 | 0.944 | 0.937 | 0.750 | 0.628 | 0.659 | 0.833 | 0.659 | 0.760 |
| **Prov-GigaPath** | 0.852 | 0.759 | 0.616 | 0.951 | 0.945 | 0.724 | 0.626 | 0.680 | 0.815 | 0.653 | 0.762 |
| **H-Optimus-0** | 0.824 | 0.759 | 0.615 | 0.955 | 0.943 | 0.770 | **0.644** | **0.685** | 0.827 | **0.671** | 0.769 |
| **Virchow2** | 0.851 | 0.883 | 0.624 | **0.967** | 0.938 | 0.783 | 0.640 | 0.669 | **0.861** | 0.646 | 0.786 |
| **UNI2** | **0.887** | **0.915** | **0.661** | 0.965 | **0.950** | 0.775 | 0.630 | 0.642 | 0.849 | 0.657 | **0.793** |
| **HERO (Ours)** | 0.875 | 0.848 | 0.622 | 0.963 | 0.943 | **0.793** | 0.633 | 0.657 | 0.834 | 0.636 | 0.780 |

HERO remains highly competitive with the top models (0.780 average vs. UNI2's 0.793 and Virchow2's 0.786), leading on Gleason grading (0.793) and ranking second on PCam10 (0.875).

#### THUNDER Benchmark (Weitz et al.)
Evaluates 20 datasets across frozen feature probing, segmentation, calibration, and white-box adversarial stress tests.

| Model | kNN Macro-F1 $\uparrow$ | Linear Probe Macro-F1 $\uparrow$ | Few-Shot Macro-F1 $\uparrow$ | Patch Token Dice $\uparrow$ | Calibration ECE (%) $\downarrow$ | Adversarial PGD F1 Drop (%) $\downarrow$ |
|---|---|---|---|---|---|---|
| **UNI2** | **0.833** | **0.857** | **0.798** | 0.690 | 3.9% | 31.7% |
| **Virchow2** | 0.829 | 0.848 | 0.739 | **0.693** | 3.9% | **31.1%** |
| **UNI** | 0.808 | 0.835 | 0.781 | 0.678 | 3.8% | 40.3% |
| **H-Optimus-0** | 0.814 | 0.838 | 0.762 | 0.652 | 4.0% | 43.9% |
| **H-Optimus-1** | 0.825 | 0.851 | 0.773 | 0.645 | 3.5% | 57.4% |
| **Prov-GigaPath** | 0.795 | 0.829 | 0.755 | 0.635 | **3.4%** | 42.1% |
| **Phikon-v2** | 0.757 | 0.809 | 0.736 | 0.680 | 5.8% | 33.5% |
| **HERO (Ours)** | 0.825 (Rank 3) | 0.853 (Rank 2) | 0.756 (Rank 5) | 0.690 (Rank 2) | 4.1% (Rank 7) | 44.5% (Rank 7) |

> **Nuance on THUNDER Stress Tests:** The authors clarify that Expected Calibration Error (ECE) fell within a narrow 2.4-percentage-point band across all models (3.4% to 5.8%), reflecting the linear classification head rather than feature quality. Meanwhile, the white-box PGD attack represents the local mathematical loss curvature around pixels rather than physical scanner/stain domain shifts (every model lost $>31\%$ F1).

---

### 3. Spatial Gene Expression Prediction: HEST-Benchmark

Ridge regression predicting the top 50 highly variable genes from $112 \times 112\ \mu\text{m}$ spatial transcriptomics spot embeddings across 9 cancer indications:

| Indication | HERO | H-Optimus-1 | H-Optimus-0 | UNI2 | Virchow2 | Prov-GigaPath | UNI | Phikon-v2 |
|---|---|---|---|---|---|---|---|---|
| **Breast (IDC)** | 0.585 | **0.602** | 0.598 | 0.590 | 0.597 | 0.551 | 0.589 | 0.533 |
| **Prostate (PRAD)** | 0.378 | 0.378 | **0.385** | 0.357 | 0.353 | 0.370 | 0.294 | 0.342 |
| **Pancreas (PAAD)** | 0.489 | 0.496 | 0.491 | **0.500** | 0.478 | 0.475 | 0.481 | 0.443 |
| **Melanoma (SKCM)** | 0.614 | 0.659 | 0.645 | **0.661** | 0.640 | 0.562 | 0.635 | 0.535 |
| **Colon (COAD)** | 0.261 | **0.320** | 0.309 | 0.301 | 0.258 | 0.299 | 0.261 | 0.262 |
| **Rectum (READ)** | 0.209 | **0.242** | 0.222 | 0.222 | 0.207 | 0.196 | 0.184 | 0.153 |
| **Kidney (ccRCC)** | 0.271 | 0.253 | 0.268 | 0.264 | **0.272** | 0.243 | 0.240 | 0.242 |
| **Lung (LUAD)** | 0.561 | **0.578** | 0.559 | 0.559 | 0.569 | 0.541 | 0.546 | 0.547 |
| **Lymph Node (LYMPH)** | 0.269 | **0.277** | 0.259 | 0.273 | 0.257 | 0.250 | 0.256 | 0.237 |
| **Average Pearson $r$** | **0.404** | **0.423** | **0.415** | **0.414** | **0.403** | **0.387** | **0.387** | **0.366** |

HERO scores an average Pearson $r = 0.404$, closely trailing the H-Optimus models and UNI2, with strong performance in prostate, kidney, and lung.

---

### 4. Slide-Level Clinical Tasks: Patho-Bench (39 Tasks)

Patho-Bench standardizes clinical slide evaluation by training an attention-based multiple-instance learning (ABMIL) aggregator over frozen tile embeddings with patient-stratified folds:

```
Patho-Bench 39-Task Overall Average Score:
HERO (Caris)       ████████████████████████████████ 0.673 (Rank 1)
UNI2               ██████████████████████████████   0.665 (Rank 2)
UNI                ████████████████████████████     0.655 (Rank 3)
H-Optimus-0        ████████████████████████████     0.653 (Rank 4)
Prov-GigaPath      ███████████████████████████      0.649 (Rank 5)
Virchow2           ██████████████████████████       0.643 (Rank 6)
Phikon-v2          ████████████████████████         0.633 (Rank 7)
```

#### Category Breakdown:
1. **Mutation Prediction (21 Tasks, CPTAC / SURGEN / MUT-HET-RCC):**
   - **HERO leads all models with 0.702** (ahead of UNI2 at 0.688, H-Optimus-0 at 0.679, Prov-GigaPath at 0.675, and Virchow2 at 0.658).
   - Tasks include *TP53*, *PIK3CA*, *KRAS*, *EGFR*, *BAP1*, and *PBRM1*.
2. **Treatment Response (5 Tasks):**
   - **HERO leads all models with 0.523** (ahead of UNI2 at 0.509, UNI at 0.495, and Prov-GigaPath at 0.491).
   - Tasks include platinum response (MBC), bevacizumab response (OV-Bevacizumab), neoadjuvant androgen deprivation (NADT-Prostate), and post-NAT lymphovascular invasion.
3. **Survival Prediction (7 Tasks):**
   - **HERO leads all models with 0.601** (ahead of H-Optimus-0 at 0.596, UNI at 0.589, and UNI2 at 0.584).
4. **Morphological Subtyping & Tumor Grading (6 Tasks):**
   - UNI2 marginally led morphological subtyping (0.696 vs. HERO's 0.693) and tumor grading (0.948 vs. HERO's 0.947) by $<0.005$.
- **Individual Task Wins:** HERO achieved the highest score on **15 of the 39 tasks** (Prov-GigaPath won 7, H-Optimus-0 won 6, UNI2 won 5, Virchow2 won 4).

> **Why Morphology Balancing Drives Clinical Outcome Prediction:** Mutation status, therapeutic response, and patient survival are subtle molecular signals that are not concentrated in single obvious tumor glands, but rather dispersed across diverse microenvironmental niches (tumor budding, immune infiltration, reactive stroma). By capping frequent stroma and elevating rare phenotypes during pretraining, HERO's feature space preserves uncommon morphological cues that generic frequency-based encoders wash out.

---

### 5. Equal-Weighted Framework Rank Summary (Table 13)

To synthesize overall standing without allowing the 39 tasks of Patho-Bench to overwhelm smaller benchmarks like PathoROB (3 metrics) or PLISM (4 metrics), models were ranked across all 71 individual metrics and averaged across the six frameworks with equal weight:

| Model | PathoROB Rank | PLISM Rank | EVA Rank | THUNDER Rank | HEST Rank | Patho-Bench Rank | Overall Average Rank Across Frameworks |
|---|---|---|---|---|---|---|---|
| **HERO (Caris)** | **1.00** | **1.00** | 3.35 | 4.00 | 3.44 | **2.86** | **2.61 (Best)** |
| **H-Optimus-0/1** | 2.67 | 2.25 | 3.50 | 4.08 | **1.61** | 4.10 | **3.04** |
| **Virchow2** | 2.33 | 2.75 | 2.70 | 3.08 | 3.67 | 4.56 | **3.18** |
| **UNI2** | 4.00 | 5.25 | **2.40** | **2.00** | 2.44 | 3.18 | **3.21** |
| **UNI** | 5.33 | 5.50 | 4.90 | 4.00 | 5.39 | 3.72 | **4.81** |
| **Prov-GigaPath** | 6.00 | 5.00 | 4.55 | 5.00 | 5.22 | 4.45 | **5.04** |
| **Phikon-v2** | 6.67 | 6.25 | 6.60 | 5.83 | 6.22 | 5.13 | **6.12** |

---

## Ablation Study: Isolating Gram Anchoring (Appendix A.3)

Comparing the Stage-1-only checkpoint (DINO + iBOT, 450k steps) against the released Stage-2 model (+ Gram anchoring, 20k steps):

| Metric Suite | Stage 1 Only (DINO/iBOT) | Released HERO (+ Gram Anchoring) | Relative Shift ($\Delta$) | Impact Analysis |
|---|---|---|---|---|
| **PathoROB RI** | 0.881 | **0.892** | **+1.2%** | Camelyon gained **+2.8%** (0.813 $\rightarrow$ 0.836); TCGA gained **+1.3%** (0.873 $\rightarrow$ 0.884); Tolkach ESCA flat (0.956) |
| **EVA Benchmark** | 0.776 | **0.780** | **+0.5%** | Nuclear segmentation and dense tasks gained: MoNuSAC Dice gained **+2.0%** (0.644 $\rightarrow$ 0.657); Gleason grading gained **+2.2%** (0.776 $\rightarrow$ 0.793); BACH gained **+1.9%** |
| **HEST Benchmark** | **0.414** | 0.404 | **-2.4%** | Trade-off observed: LYMPH-IDC (+3.1%), PAAD (+2.5%), and IDC (+2.3%) gained, while colon/skin dropped (COAD -13.9%, SKCM -7.8%) |

> **Conclusion on Gram Anchoring:** A brief 20k-step refinement with high-resolution Gram anchoring successfully halts dense patch-token degradation, improving multi-center biological robustness and nuclear segmentation without requiring prolonged full-backbone re-training.

---

## Connections to Vault Frameworks

- [[Towards robust foundation models for digital pathology]]: Kömen et al. originally introduced **PathoROB** and proved that hospital center could be decoded from Virchow2 and other foundation models at 88–98% accuracy. HERO directly operationalizes this benchmark, demonstrating that intentional morphology-balanced curation eliminates reliance on hospital shortcuts.
- [[A distributional robustness margin for pathology foundation models]] & [[CRoMa]]: Grisi, van der Laak, and Litjens critiqued PathoROB's $k$-NN Robustness Index for its sensitivity to class imbalance and neighborhood size. HERO addresses the underlying phenomenon by enforcing balanced cluster sampling during pretraining.
- [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]: Bareja et al. documented the "survival prediction inversion" where giant foundation models degraded on survival MIL aggregations. HERO reverses this trend, showing that morphology-balanced ViT-G representations provide superior attention targets for survival, mutation, and treatment response.
- [[PathoActivationAtlas]] & [[Class visualizations and activation atlases for computational pathology]]: Gustav et al. showed that foundation models risk learning non-biological dataset artifacts (scanner illumination, ink marks). HERO's HED stain jitter and cluster quota directly suppress these artifact clusters.
