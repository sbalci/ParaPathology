---
type: Clipping
status: Evergreen
language: en
title: "Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis"
source: "https://www.nature.com/articles/s41598-026-69731-9"
source_type: article
author:
  - "[[Danial Maleki]]"
  - "[[Nazim Shaikh]]"
  - "[[Xiao Li]]"
  - "[[Yao Nie]]"
  - "[[Raghavan Venugopal]]"
  - "[[Uday Kurkure]]"
published: 2026-09-02
created: 2026-09-15
description: "Benchmarking six digital pathology foundation models (Lunit, Kaiko-Base, Phikon-v2, UNI2, Virchow2, and Kaiko-Midnight; 22M to 1.1B parameters) across WSI-level classification, WSI-level survival prediction, and ROI-level classification tasks. Demonstrates that model performance is strongly task-dependent and model tier is not a universal predictor of downstream performance. Smaller models (Lunit, Kaiko-Base) achieved superior or highly competitive survival prediction and up to 48x faster embedding throughput (2,120 vs 44 tiles/s), while larger models showed clear advantages only on challenging, imbalanced ROI classification (UNITOPATHO). Includes extensive 50-seed data fraction ablations and an actionable decision framework for clinical and production deployment."
tags:
  - "clippings"
order: 120
belongs_to: "[[Clippings]]"
related_to:
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[A distributional robustness margin for pathology foundation models]]"
  - "[[Digital Pathology]]"
  - "[[Machine Learning]]"
  - "[[Image Analysis]]"
---

# Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis

## Summary

The explosive proliferation of digital pathology foundation models (FMs) — spanning parameter scales from 22 million to over 1.1 billion parameters, trained on corpora ranging from 10,000 to over 3 million whole-slide images (WSIs) — has created an urgent dilemma for computational pathologists and clinical laboratories: **Is bigger always better, and what are the actual clinical and operational tradeoffs?**

Published in *Scientific Reports* (September 2026) by researchers from **Roche Diagnostic Solutions** (in collaboration with the Genentech digital pathology team), this benchmark systematically evaluates 6 prominent foundation models representing five parameter tiers across **whole-slide image (WSI)-level classification**, **WSI-level patient survival prediction**, and **region-of-interest (ROI)-level classification**, coupled with a **hardware-level throughput benchmark** (on an NVIDIA L40S GPU) and **extensive 50-seed training-data fraction ablations**.

The central findings challenge conventional assumptions:
1. **Model tier is not a universal predictor of performance:** Larger models do not automatically outperform smaller models. Model rankings shift dramatically across tasks.
2. **Small and base models excel at slide-level and survival tasks:** In non-small cell lung cancer (NSCLC) overall survival prediction, the smallest model evaluated (**Lunit**, 22M parameters) achieved the highest cross-validated mean C-index (70.6), while the largest model (**Kaiko-Midnight**, 1.1B parameters) obtained the lowest (62.7).
3. **High-capacity models shine in difficult, imbalanced morphological classification:** On the challenging UNITOPATHO colorectal polyp dataset (severe class imbalance, 6 categories), Kaiko-Midnight significantly outperformed all other models ($\Delta\text{AUROC} = +2.17\%$, $p < 0.001$).
4. **Massive operational throughput divide:** Lunit processes **2,120 tiles/second**, compared to **44 tiles/second** for Kaiko-Midnight — a **48-fold difference** in feature-extraction speed with lower GPU memory pressure and 4x smaller embedding storage overhead.
5. **Foundation model scale cannot rescue low-data slide-level supervision:** Training-data ablations across 50 random seeds show extreme variance when training Attention-based Multiple Instance Learning (AMIL) aggregators on small slide cohorts, regardless of which foundation model generated the embeddings.

---

## The Evaluated Foundation Models

The authors selected 6 foundation models spanning five parameter tiers (Small, Base, Large, Huge, Giant):

| Model | Parameter Tier | Parameters | Architecture | Pretraining Corpus | Pretraining Staining | Feature Dimension |
|---|---|---|---|---|---|---|
| **Lunit** | Small | ~22M | ResNet50 / ViT-S | ~19M patches (~21K TCGA WSIs) | H&E | 384 |
| **Kaiko-Base** | Base | ~86M | ViT-B/8 | ~29K TCGA WSIs | H&E | 768 |
| **Phikon-v2** | Large | ~307M | ViT-L/16 | ~460M patches (~58K WSIs) | H&E | 1024 |
| **UNI2** (UNI2-h) | Huge | ~681M | ViT-H/14 | >200M patches (~350K WSIs) | H&E + IHC | 1536 |
| **Virchow2** | Huge | ~632M | ViT-H/14 | ~2B patches (~3.1M WSIs) | H&E + IHC | 2560 |
| **Kaiko-Midnight** | Giant | ~1,137M | ViT-G / DINOv2-G | ~12K TCGA WSIs (Midnight-12k) | H&E | 1536 |

> **Within-Family Scale Comparison:** The inclusion of both **Kaiko-Base** (86M) and **Kaiko-Midnight** (1,137M) is a key methodological strength. Because both models originate from the same research lineage and utilize related TCGA pretraining corpora, comparing them partially isolates the effect of architectural scaling from disparate training data distributions.

---

## Downstream Evaluation Suite

The benchmark evaluated models across two operational levels:

### 1. WSI-Level Tasks (Downstream AMIL Aggregator)
- **Camelyon16 (Lymph Node Metastasis Detection):** Binary classification (metastatic vs normal lymph nodes) on 129 independent test slides.
- **Lung Cancer Subtyping:** Fine-grained binary classification distinguishing Lung Adenocarcinoma (LUAD) from Lung Squamous Cell Carcinoma (LUSC) on 93 test WSIs.
- **NSCLC Overall Survival Prediction:** Predicting overall survival directly from baseline H&E slides of 286 NSCLC patients treated with immunotherapy and chemotherapy (5-fold cross-validation; DeepSurv Cox proportional hazards objective integrated into AMIL).

### 2. ROI-Level Tasks (Downstream Linear Probing)
- **BACH (Breast Cancer Histology):** 4-class balanced histology classification (normal, benign, in situ carcinoma, invasive carcinoma; 400 ROIs).
- **UNITOPATHO (Colorectal Polyp Classification):** 6-class polyp classification (tubular adenoma, tubulovillous adenoma, serrated adenoma, hyperplastic polyp, etc.; 9,536 ROIs) with marked real-world class imbalance.
- **TCGA-UT (Pan-Cancer Tissue Classification):** 31-class multi-domain benchmark covering primary human cancers (271,710 ROIs).

---

## Comparative Performance Results

### WSI-Level Performance

| Model | Tier | Params | Camelyon16 Metastasis (AUROC % [95% CI]) | NSCLC Subtyping (AUROC % [95% CI]) | NSCLC Survival (Mean C-Index ± SD) | Survival Mean Rank |
|---|---|---|---|---|---|---|
| **Lunit** | Small | 22M | 97.6 [97.0, 98.0] | 97.5 [96.7, 98.1] | **70.6 ± 8.3** | **2.6** |
| **Kaiko-Base** | Base | 86M | 98.1 [97.7, 98.5] | 97.0 [96.2, 97.7] | 68.4 ± 2.6 | 3.2 |
| **Phikon-v2** | Large | 307M | 99.4 [99.1, 99.6] | **98.7 [98.1, 99.1]** | 66.4 ± 4.6 | 3.6 |
| **UNI2** | Huge | 681M | 99.4 [99.1, 99.6] | 98.1 [97.4, 98.6] | 66.0 ± 9.5 | 3.7 |
| **Virchow2** | Huge | 632M | **100.0 [99.9, 100.0]** | 97.7 [97.0, 98.3] | 63.6 ± 6.6 | 3.6 |
| **Kaiko-Midnight** | Giant | 1,137M | 98.1 [97.7, 98.5] | 96.2 [95.3, 97.0] | 62.7 ± 7.0 | 4.3 |

#### Critical Insights at the WSI Level:
- **Camelyon16 Ceiling Effect:** While Virchow2 achieved perfect rank separation (100.0% AUROC), the difference between it and runner-ups Phikon-v2 and UNI2 (99.4%) was only 0.61 percentage points ($p = 0.025$). On saturated benchmarks, statistical significance does not equate to clinical distinction.
- **Lung Cancer Subtyping:** Phikon-v2 led numerically (98.7%), but its advantage over runner-up UNI2 (98.1%) was not statistically significant ($p = 0.699$).
- **Survival Inversion:** The smallest model (Lunit) achieved the highest mean C-index (70.6) and lowest mean rank (2.6), while Kaiko-Base delivered the most reproducible, fold-to-fold stable predictions ($\pm 2.6$). In contrast, the 1.1B giant model (Kaiko-Midnight) finished last (62.7). 
- **The AMIL Information Bottleneck:** Standard attention-based pooling layers aggregate thousands of tile embeddings into a single slide vector. High-dimensional embeddings (1536–2560 dimensions) from giant models create an overparameterized search space for the pooling head on modest cohort sizes, making them prone to overfitting or diluting prognostic signals.

---

### ROI-Level Performance (Linear Probing)

| Model | Tier | Params | BACH Breast Histology (AUROC %) | UNITOPATHO CRC Polyps (AUROC %) | TCGA-UT Pan-Cancer (AUROC %) |
|---|---|---|---|---|---|
| **Lunit** | Small | 22M | 99.7 [99.2, 99.9] | 83.4 [83.3, 83.5] | 98.3 [98.3, 98.3] |
| **Kaiko-Base** | Base | 86M | 99.9 [99.5, 100.0] | 82.6 [82.5, 82.7] | 98.9 [98.9, 98.9] |
| **Phikon-v2** | Large | 307M | 98.8 [98.0, 99.3] | 83.0 [82.9, 83.1] | 99.0 [98.9, 99.0] |
| **UNI2** | Huge | 681M | **100.0 [99.7, 100.0]** | 83.0 [82.9, 83.1] | 99.1 [99.1, 99.1] |
| **Virchow2** | Huge | 632M | **100.0 [99.7, 100.0]** | 83.2 [83.2, 83.3] | 99.0 [99.0, 99.0] |
| **Kaiko-Midnight** | Giant | 1,137M | 99.8 [99.4, 99.9] | **85.6 [85.5, 85.7]** | **99.2 [99.2, 99.2]** |

#### Critical Insights at the ROI Level:
- **UNITOPATHO Separates the Field:** Unlike BACH and TCGA-UT (where all models clustered above 98.5%), UNITOPATHO contains subtle dysplasia grades and severe class imbalance. Here, Kaiko-Midnight demonstrated clear, statistically robust superiority ($\Delta\text{AUROC} = +2.17\%$, $p < 0.001$ over runner-up Lunit).
- **Representational Separability vs Slide Utility:** High local separability at the patch level does not guarantee superior WSI classification or prognostic accuracy. Feature extraction and slide aggregation operate under fundamentally different dynamics.

---

## The Intra-Family Scaling Dilemma: Kaiko-Base vs Kaiko-Midnight

Comparing Kaiko-Base (86M params) and Kaiko-Midnight (1,137M params) provides a direct test of pure scaling within the same laboratory and pretraining data distribution:

```
                  Kaiko-Base (86M)  vs  Kaiko-Midnight (1.1B)
                  ────────────────────────────────────────────
UNITOPATHO Polyps:       82.6%      ──►      85.6%   (+3.0% ▲ Statistically superior)
TCGA-UT Pan-Cancer:      98.9%      ──►      99.2%   (+0.3% ▲ Not significant)
Camelyon16 WSI:          98.1%      ──►      98.1%   (  0.0% ─ Identical)
Lung Subtyping WSI:      97.0%      ──►      96.2%   (-0.8% ▼ Slightly lower)
NSCLC Survival C-Index:  68.4       ──►      62.7    (-5.7  ▼ Substantially lower)
Throughput (tiles/s):     690       ──►        44    (15.7x ▼ Slower)
Embedding Size (bytes):  1.5 KB     ──►       3.0 KB ( 2.0x ▼ Larger disk/RAM footprint)
```

**Conclusion:** Scaling parameter count by 13x produced noticeable gains on complex patch-level morphology, but delivered **no benefit for whole-slide classification** and **actively harmed survival modeling**, while imposing a severe 16x penalty on computational throughput.

---

## Computational Efficiency & Hardware Throughput Benchmark

Timed on an **NVIDIA L40S (48 GB VRAM)** using maximum feasible batch size with a 90% memory safety margin ($224 \times 224$ tiles, host-to-device copy, normalization, forward pass, and device-to-host transfer; image decoding cached):

| Model | Parameters | Embedding Dim | Max Feasible Batch | Peak GPU RAM (GB) | Throughput (Tiles/s) | Latency (ms/tile) | Time per 1,000 Tiles (s) | Relative Speed vs Lunit |
|---|---|---|---|---|---|---|---|---|
| **Lunit** | 21.7M | 384 | 9,216 | 37.71 | **2,120.3** | **0.47 ms** | **0.47 s** | **1.0x (Baseline)** |
| **Kaiko-Base** | 85.8M | 768 | 5,064 | 38.13 | 689.8 | 1.45 ms | 1.45 s | 3.1x slower |
| **Virchow2** | 631.2M | 2,560 | 2,992 | 39.26 | 280.6 | 3.56 ms | 3.56 s | 7.6x slower |
| **Phikon-v2** | 307.0M | 1,024 | 3,224 | 39.74 | 205.7 | 4.86 ms | 4.86 s | 10.3x slower |
| **UNI2** | 681.4M | 1,536 | 1,608 | 41.87 | 69.0 | 14.49 ms | 14.49 s | 30.7x slower |
| **Kaiko-Midnight** | 1,136.5M | 1,536 | 1,376 | 40.95 | 43.9 | 22.78 ms | 22.78 s | **48.3x slower** |

### Real-World Laboratory Impact
Consider a medium-to-large pathology department digitizing **100 slides per day** (averaging 25,000 tiles per slide = 2.5 million tiles/day):
- **With Lunit:** 2.5M tiles / 2,120 tiles/s = **~19.6 minutes** of GPU compute time.
- **With UNI2:** 2.5M tiles / 69 tiles/s = **~10.1 hours** of GPU compute time.
- **With Kaiko-Midnight:** 2.5M tiles / 43.9 tiles/s = **~15.8 hours** of GPU compute time.
- **Storage Footprint:** Embedding a 50,000-slide archival biobank requires **~76.8 GB** with Lunit (384 float16 dimensions) vs **~512 GB** with Virchow2 (2560 dimensions).

---

## Downstream Data-Regime Ablations (50 Random Seeds)

The authors performed subsampling ablations across training fractions ($5\%, 10\%, 25\%, 50\%, 100\%$) using **50 independent random seeds per fraction**:

```
AMIL Seed Variance in Low-Data WSI Regimes
AUROC
 ▲
 │         ┌─────────┐
1.0│         │ Converged│ ◄─── At 100% data: all models cluster near ceiling
 │         └─────────┘
 │       ┌───────────┐
0.9│       │ Moderate  │
 │       │ Variance  │
 │     ┌─┴───────────┴─┐
0.8│     │ High Seed     │ ◄─── At 5-10% data: extreme spread across seeds
 │     │ Instability   │       (model tier does not protect against failure)
0.7│     └───────────────┘
 └────────────────────────────────► Training Slide Fraction
       5%     25%     100%
```

1. **Weakly supervised aggregation is unstable with few slides:** In low-data WSI regimes (<10–25% training slides), AMIL performance exhibits massive variance across random seeds. Selecting a model based on a single train/validation split in low-data scenarios is statistically hazardous.
2. **Convergence at scale:** Once slide-level training fractions reach adequate sample sizes, performance curves plateau and converge across almost all model tiers.
3. **Data difficulty governs ROI learning:** On balanced benchmarks (BACH), models reach ceiling rapidly even with few labels; on hard, imbalanced benchmarks (UNITOPATHO), performance gains scale steadily with data volume, but variance persists.

---

## Actionable Model Selection Matrix

Synthesizing the paper's findings (Table 4) into concrete recommendations:

| Deployment Setting | Priority Criteria | Recommended Strategy |
|---|---|---|
| **Low-Data WSI Classification** | Stability across seeds; minimal overfitting | Use repeated-seed cross-validation. Avoid single train/val splits. Smaller models (Kaiko-Base, Lunit) provide equal or superior stability. |
| **High-Data WSI Classification** | Throughput & inference cost | Models converge near ceiling. Select smaller/faster models (Lunit, Kaiko-Base) to maximize operational throughput and reduce GPU costs. |
| **Survival & Prognostic Modeling** | Generalizability; avoiding dimensional dilution | Favor compact or mid-sized embeddings (Lunit, Kaiko-Base). High-dimensional giant models increase risk of overfitting the downstream MIL aggregation head. |
| **Complex / Imbalanced ROI Tasks** | Maximum feature separability | Deploy high-capacity foundation models (Kaiko-Midnight, Virchow2). Parameter scaling genuinely pays off in fine-grained tissue distinction. |
| **High-Volume Clinical Production** | Throughput, latency, memory footprint | If diagnostic performance differences are statistically indistinguishable, prioritize Lunit or Kaiko-Base to achieve up to 48x higher throughput. |

---

## Vault Context & Related Work

- **Comparison with [Towards robust foundation models for digital pathology](Towards%20robust%20foundation%20models%20for%20digital%20pathology.md) (PathoROB):** While PathoROB evaluated robustness against non-biological technical batch effects (staining protocols, scanners, hospital sites), this paper addresses the orthogonal but complementary question of task-specific predictive utility versus hardware cost.
- **Comparison with [A distributional robustness margin for pathology foundation models](A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md) (CRoMa):** Both works highlight that aggregate benchmark scores can be misleading. While CRoMa showed that all 20 tested encoders retain shortcut-dominated samples, this paper demonstrates that larger model tiers do not protect against downstream slide-level aggregation failures.
- **Topic Integration:**
  - [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
  - [Machine Learning](../statistics-and-bioinformatics/machine-learning/README.md)
  - [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)

<!-- tolaria:related:start -->

## See also

* [A distributional robustness margin for pathology foundation models](A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md)
* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Machine Learning](../statistics-and-bioinformatics/machine-learning/README.md)
* [Towards robust foundation models for digital pathology](Towards%20robust%20foundation%20models%20for%20digital%20pathology.md)

<!-- tolaria:related:end -->
