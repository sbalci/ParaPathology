---
type: Clipping
status: Evergreen
language: en
title: "A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping"
source: "https://www.mdpi.com/2227-7390/13/13/2178"
source_type: article
author:
  - "[[Dehui Bi]]"
  - "[[Yuqi Zhang]]"
published: 2025-07-03
created: 2026-09-17
description: "ConvMixerSSM integrates depthwise separable convolutions (ConvMixer) for localized tissue texture modeling with linear state-space models (SSM/Mamba) for global contextual reasoning and a ReLU-gated attention module for sparse instance recalibration. Benchmarked on TCGA-NSCLC (LUAD vs. LUSC; AUC 97.83%, ACC 91.82%, F1 91.18%) and CAMELYON16 (AUC 98.95%), achieving 1.65 ms inference per gigapixel WSI."
tags:
  - "clippings"
order: 140
belongs_to: "[[Clippings]]"
related_to:
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Weakly supervised MIL histopathological tumor segmentation]]"
  - "[[Digital Pathology]]"
  - "[[Machine Learning]]"
  - "[[Image Analysis]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
---
# A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping

## Summary

In computational pathology, whole-slide images (WSIs) present an extreme scale dilemma: gigapixel dimensions containing billions of pixels, coupled with clinical labels available only at the slide level. Under the **weakly supervised multiple instance learning (MIL)** paradigm, a whole slide is represented as a bag of thousands of patch instances ($L \approx 10^3\text{--}10^4$). Standard MIL approaches face fundamental architectural trade-offs:

- **Traditional pooling (Max/Mean, ABMIL, CLAM):** Compute-efficient, but ignore inter-patch dependencies and complex contextual transitions.
- **Transformer/Self-Attention MIL (e.g., TransMIL):** Model pairwise patch interactions, but scale quadratically $\mathcal{O}(L^2)$ with sequence length, straining GPU memory and latency on large bags.
- **State-Space Model MIL (e.g., S4MIL, MambaMIL):** Sub-quadratic linear sequence complexity $\mathcal{O}(L)$, but primarily focus on sequential dynamics, lacking explicit convolutional inductive priors tailored to fine-grained histological textures, cellular pleomorphism, and glandular architecture.

Published in MDPI *Mathematics* (July 2025; [DOI: 10.3390/math13132178](https://doi.org/10.3390/math13132178)) by Dehui Bi (Beijing University of Technology) and Yuqi Zhang (Beihang University), this paper introduces **ConvMixerSSM**, a unified hybrid MIL architecture that synergizes:

1. A **ConvMixer block** utilizing depthwise separable convolutions for localized spatial representation;
2. An **SSM block** (Mamba-style linear state-space sequence modeling) for long-range global contextual reasoning;
3. A **ReLU-gated feature calibration module** that induces sparse instance selection within attention-based aggregation.

On the benchmark **TCGA-NSCLC** cohort (1,053 WSIs), ConvMixerSSM establishes new state-of-the-art performance for lung cancer subtyping (LUAD vs. LUSC) with **AUC 97.83%**, **Accuracy 91.82%**, and **F1-score 91.18%**. On **CAMELYON16** (395 WSIs), it achieves the highest discriminative capability (**AUC 98.95%**), while maintaining an ultra-fast inference latency of **1.65 ms** for a $51,200 times 51,200$ gigapixel WSI.

---

## Architectural Blueprint: ConvMixerSSM

```typescript
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CONVMIXERSSM PIPELINE ARCHITECTURE                               │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
                                      ┌──────────────────────┐
                                      │ Whole Slide Image    │ (Gigapixel H&E WSI)
                                      └──────────┬───────────┘
                                                 │
                                      ┌──────────▼───────────┐
                                      │ Tissue Segmentation  │ (Otsu/Threshold-based mask)
                                      └──────────┬───────────┘
                                                 │
                                      ┌──────────▼───────────┐
                                      │ Non-overlapping      │ (512 × 512 pixels @ 20×)
                                      │ Patch Tiling         │
                                      └──────────┬───────────┘
                                                 │
                                      ┌──────────▼───────────┐
                                      │ Feature Extraction   │ (Pretrained CONCH Foundation Model)
                                      │ Backbone             │
                                      └──────────┬───────────┘
                                                 │ Instance sequence Z ∈ R^(B × L × D)
                                                 │
 ┌───────────────────────────────────────────────┼─────────────────────────────────────────────────┐
 │ HYBRID AGGREGATOR MODULE                      │                                                 │
 │                                               ▼                                                 │
 │ ┌─────────────────────────────────────────────────────────────────────────────────────────────┐ │
 │ │ 1. CONVMIXER BLOCK (Local Spatial & Texture Representation)                                 │ │
 │ │    • Permute to channel-first tensor: x' = DWConv(permute(x))                               │ │
 │ │    • 1D Depthwise Convolution (kernel size k): w(d) independently per channel                │ │
 │ │    • Residual connection + Pointwise 1×1 Convolution: x'' = σ(PWConv(x' + x))                │ │
 │ │    • Non-linear activation (LeakyReLU) + Residual shortcut: f = permute(σ(x'' + x))         │ │
 │ └─────────────────────────────────────────────┬───────────────────────────────────────────────┘ │
 │                                               │ Locally mixed features F ∈ R^(B × L × D)        │
 │                                               ▼                                                 │
 │ ┌─────────────────────────────────────────────────────────────────────────────────────────────┐ │
 │ │ 2. SSM BLOCK (Global Context & Long-Range Sequence Modeling)                                │ │
 │ │    • Linear projection: f' = Linear(F)                                                      │ │
 │ │    • Continuous-to-discrete State-Space transformation (Mamba formulation):                 │ │
 │ │        s_t = A · s_(t-1) + B · f'_t                                                         │ │
 │ │        o_t = C · s_t + D · f'_t                                                             │ │
 │ │    • Causal 1D Convolution: y = ConvCausal1D(o) (temporal locality & sequence causality)   │ │
 │ │    • Linear projection back to model dimension: z = Linear(y)                               │ │
 │ │    • Residual skip connection: z' = z + F                                                   │ │
 │ └─────────────────────────────────────────────┬───────────────────────────────────────────────┘ │
 │                                               │ Globally contextualized features Z ∈ R^(B×L×D) │
 │                                               ▼                                                 │
 │ ┌─────────────────────────────────────────────────────────────────────────────────────────────┐ │
 │ │ 3. FEATURE-GATED BLOCK (Sparse Instance Selection & Attention Pooling)                      │ │
 │ │    • Normalized projection: m = LayerNorm(Linear(Z))                                        │ │
 │ │    • ReLU-induced sparse gating: A = Softmax(Linear(ReLU(m)))                               │ │
 │ │    • Bag-level attention-weighted pooling: Z_bag = Z · A                                    │ │
 │ └─────────────────────────────────────────────┬───────────────────────────────────────────────┘ │
 └───────────────────────────────────────────────┼─────────────────────────────────────────────────┘
                                                 │ Bag representation Z_bag ∈ R^(B × D)
                                                 ▼
                                      ┌──────────────────────┐
                                      │ Multi-Layer          │
                                      │ Perceptron (MLP)     │
                                      └──────────┬───────────┘
                                                 │
                                                 ▼
                                     Slide-level Diagnosis Logits
                                     (e.g., LUAD vs. LUSC / Metastasis)
```

### 1. ConvMixer Block: Local Inductive Priors

Unlike natural images, histopathological diagnosis relies heavily on micro-architectural texture patterns: cellular pleomorphism, nuclear-to-cytoplasmic ratio, chromatin condensation, and intercellular junctions. Pure sequence models (e.g., standard Mamba) process tokens as an abstract 1D sequence, shedding local spatial priors.

ConvMixer reintroduces spatial inductive bias with minimal computational cost:

- **Depthwise Convolution (**`DWConv`**):** Operates independently on each channel across sequence tokens with kernel size $k$, capturing localized spatial interactions between neighboring patch tokens:

$$
y_{b,d,l} = \sum_{i=-\lfloor k/2 \rfloor}^{\lfloor k/2 \rfloor} w_i(d) \cdot x'_{b,d,l+i}
$$

- **Pointwise Convolution (**`PWConv`**):** A $1\times 1$ convolution mixing information across all $D$ channels at position $l$:

$$
z_{b,d',l} = \sum_{d=1}^D w^{(d')}_d \cdot y_{b,d,l}
$$

- **Residual Connections:** Implemented after depthwise and pointwise operations to preserve low-level embedding representations and stabilize gradient backpropagation.

### 2. SSM Block: Sub-Quadratic Global Sequence Context

Whole slides easily yield $3,000\text{--}12,000$ tiles. Standard Multi-Head Self-Attention scales at $\mathcal{O}(L^2)$, becoming computationally prohibitive. ConvMixerSSM deploys a structured **State-Space Model (SSM)** derived from the Mamba framework:

- Formulates instance aggregation as a continuous-time linear dynamical system discretized through zero-order hold (ZOH):

@@TOLARIA_MATH_BLOCK:73-5f-74-20-3d-20-5c-6d-61-74-68-62-66-7b-41-7d-20-73-5f-7b-74-2d-31-7d-20-2b-20-5c-6d-61-74-68-62-66-7b-42-7d-20-66-27-5f-74@@
@@TOLARIA_MATH_BLOCK:6f-5f-74-20-3d-20-5c-6d-61-74-68-62-66-7b-43-7d-20-73-5f-74-20-2b-20-5c-6d-61-74-68-62-66-7b-44-7d-20-66-27-5f-74@@
where $\mathbf{A}, \mathbf{B}, \mathbf{C}, \mathbf{D}$ are learnable transition matrices.

- Operates in $\mathcal{O}(L)$ linear time, enabling full-context sequence scanning across thousands of patches.
- Incorporates a **Causal 1D Convolution** (`ConvCausal1D`) following the SSM layer to enforce directional sequence causality and inject intermediate token-level locality before final projection.

### 3. Feature-Gated Block: The Power of ReLU Sparsity

In whole-slide imaging, the vast majority of patches in a cancerous resection slide are normal parenchyma, dense stroma, inflammatory infiltrates, necrotic debris, or background void. Only a sparse minority contains diagnostic neoplastic signatures.

Standard attention mechanisms (ABMIL, CLAM) use Sigmoid, Tanh, or un-gated projections that retain smooth non-zero tails, leaking background noise into the pooled slide embedding. ConvMixerSSM incorporates a **ReLU-gated** calibration structure:
@@TOLARIA_MATH_BLOCK:6d-20-3d-20-5c-74-65-78-74-7b-4c-61-79-65-72-4e-6f-72-6d-7d-28-5c-74-65-78-74-7b-4c-69-6e-65-61-72-7d-28-5a-29-29@@
@@TOLARIA_MATH_BLOCK:41-20-3d-20-5c-74-65-78-74-7b-53-6f-66-74-6d-61-78-7d-28-5c-74-65-78-74-7b-4c-69-6e-65-61-72-7d-28-5c-74-65-78-74-7b-52-65-4c-55-7d-28-6d-29-29-29@@
@@TOLARIA_MATH_BLOCK:5a-5f-7b-5c-74-65-78-74-7b-62-61-67-7d-7d-20-3d-20-5a-20-5c-63-64-6f-74-20-41@@

**Why ReLU decisively outperforms smooth activations:**

- **Zero-Threshold Sparsity:** Any non-informative or confounding feature projection falling below zero is clamped strictly to $0.0$, effectively pruning irrelevant tissue patches before softmax normalization.
- **Vanishing Gradient Prevention:** Unlike Sigmoid or Tanh, which saturate at extreme values and attenuate error gradients, ReLU maintains a constant gradient slope for active features.

---

## Experimental Cohorts & Preprocessing

The model was trained and evaluated on two clinical pathology benchmarks:

| Characteristic | TCGA-NSCLC | CAMELYON16 |
| --- | --- | --- |
| **Primary Clinical Task** | Non-Small Cell Lung Cancer Subtyping (LUAD vs. LUSC) | Breast Cancer Sentinel Lymph Node Metastasis Detection |
| **Diagnostic Classes** | 541 LUAD / 512 LUSC | 236 Normal / 159 Metastatic |
| **Total WSI Count** | 1,053 WSIs | 395 WSIs |
| **Slide Dimensions (Min)** | $10,000 times 4,617$ pixels | $45,056 times 35,840$ pixels |
| **Slide Dimensions (Max)** | $191,352 times 97,078$ pixels | $217,088 times 111,104$ pixels |
| **Bag Size Range (Patches/Slide)** | 35 to 11,747 patches | 40 to 11,221 patches |
| **Feature Extractor Backbone** | CONCH (domain-specific foundation model) | CONCH (domain-specific foundation model) |
| **Patch Resolution** | $512 times 512$ pixels at $20\times$ magnification | $512 times 512$ pixels at $20\times$ magnification |
| **Cross-Validation Scheme** | 5-Fold Cross-Validation (80% train / 10% val / 10% test) | Standard Challenge Split |
| **Hardware & Optimizer** | NVIDIA RTX 3090 GPU, Adam ($\text{lr} = 2 \times 10^{-4}$, $\text{wd} = 1 \times 10^{-5}$), batch size 1 | NVIDIA RTX 3090 GPU, Adam ($\text{lr} = 2 \times 10^{-4}$, $\text{wd} = 1 \times 10^{-5}$), batch size 1 |

---

## Benchmark Results

### 1. TCGA-NSCLC Lung Cancer Subtyping Benchmark

Performance across 5-fold cross-validation on 1,053 diagnostic slides:

| Method | Architectural Paradigm | AUC (%) | Accuracy (ACC, %) | F1-Score (%) |
| --- | --- | --- | --- | --- |
| **Max Pooling** | Non-parametric Extreme Value | $97.21 pm 1.51$ | $90.45 pm 2.67$ | $89.94 pm 2.79$ |
| **Mean Pooling** | Non-parametric Uniform Average | $97.07 pm 1.10$ | $91.20 pm 3.31$ | $90.65 pm 3.66$ |
| **TransMIL** | Transformer / Self-Attention | $97.06 pm 2.12$ | $90.83 pm 2.82$ | $90.14 pm 3.40$ |
| **S4MIL** | Structured State Space Model (S4) | $97.43 pm 0.92$ | $91.03 pm 2.05$ | $90.59 pm 2.23$ |
| **MambaMIL** | State Space Duality / Selective SSM | $97.34 pm 1.75$ | $91.21 pm 3.78$ | $90.76 pm 3.94$ |
| **R2TMIL** | Recurrent State Transition MIL | $97.29 pm 2.15$ | $91.34 pm 3.57$ | $90.98 pm 3.62$ |
| **ConvMixerSSM (Ours)** | **Hybrid ConvMixer + SSM + ReLU-Gating** | **97.83 ± 1.52** | **91.82 ± 3.06** | **91.18 ± 3.71** |

> **Key Empirical Takeaways:**

> - ConvMixerSSM achieves top rank across all three classification metrics, outperforming both pure transformer aggregators (TransMIL: $+0.77\\%$ AUC, $+0.99\\%$ ACC) and existing state-space models (MambaMIL: $+0.49\\%$ AUC, $+0.61\\%$ ACC; S4MIL: $+0.40\\%$ AUC, $+0.79\\%$ ACC).

> - ConvMixerSSM exhibits faster training convergence and more stable validation loss reduction compared to TransMIL and MambaMIL.

### 2. CAMELYON16 Metastasis Detection Benchmark

Evaluation of cross-task generalizability on lymph node metastasis screening:

| Method | AUC (%) | Accuracy (ACC, %) | F1-Score (%) |
| --- | --- | --- | --- |
| **Mean Pooling** | $88.87 pm 4.09$ | $84.97 pm 3.33$ | $78.74 pm 6.62$ |
| **TransMIL** | $97.44 pm 2.40$ | $95.38 pm 3.90$ | $93.91 pm 5.31$ |
| **R2TMIL** | $97.80 pm 1.99$ | $94.80 pm 2.59$ | $93.82 pm 2.93$ |
| **MaxPooling** | $98.14 pm 1.78$ | **96.95 ± 2.12** | **96.21 ± 2.60** |
| **MambaMIL** | $98.33 pm 1.45$ | $96.37 pm 1.43$ | $95.52 pm 1.81$ |
| **S4MIL** | $98.85 pm 1.48$ | $96.43 pm 2.10$ | $95.64 pm 2.65$ |
| **ConvMixerSSM (Ours)** | **98.95 ± 0.99** | $94.60 pm 7.93$ | $94.47 pm 7.08$ |

ConvMixerSSM establishes the highest AUC (**98.95%** with the lowest standard deviation $\pm 0.99\\%$), confirming that the hybrid formulation generalizes effectively from multi-tissue subtyping (NSCLC) to focal metastasis detection (CAMELYON16).

---

## Computational Complexity & Efficiency Tradeoffs

A critical bottleneck in deploying deep learning to clinical digital pathology laboratories is inference latency and memory requirements for gigapixel images.

| Model | Parameters (M) | Computational FLOPs (G) | Inference Time per WSI |
| --- | --- | --- | --- |
| **MambaMIL** | **0.59** | **5.36** | Fast |
| **S4MIL** | 1.05 | 9.46 | Fast |
| **ConvMixerSSM (Ours)** | **1.98** | **17.80** | **1.65 ms** (for $51.2\text{k} \times 51.2\text{k}$ WSI) |
| **TransMIL** | 2.67 | 24.80 | High latency ($\mathcal{O}(L^2)$ scaling) |
| **R2TMIL** | 2.70 | 15.42 | Moderate |

- **Substantial Footprint Reduction vs. Transformers:** ConvMixerSSM achieves higher predictive accuracy than TransMIL while reducing model parameters by **25.8%** ($1.98\text{M}$ vs. $2.67\text{M}$) and FLOPs by **28.2%** ($17.8\text{G}$ vs. $24.8\text{G}$).
- **Production-Ready Throughput:** Completing full-slide aggregation in **1.65 milliseconds** on an NVIDIA RTX 3090 GPU allows real-time WSI triage and subtyping directly within clinical viewers.

---

## Ablation Studies & Architectural Deconstruction

### 1. Contribution of Individual Components (TCGA-NSCLC)

| SSM Block | ConvMixer Block | Feature-Gated Block | AUC (%) | ACC (%) | F1-Score (%) | Params (M) | FLOPs (G) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ✓ |  |  | $97.21 pm 1.44$ | $90.66 pm 2.79$ | $89.96 pm 3.27$ | 1.71 | 15.42 |
| ✓ | ✓ |  | $97.29 pm 1.66$ | $91.34 pm 2.82$ | $90.87 pm 3.26$ | 1.84 | 16.85 |
| ✓ |  | ✓ | $97.76 pm 1.86$ | $91.42 pm 3.53$ | $91.09 pm 3.81$ | 1.85 | 16.37 |
|  | ✓ | ✓ | $97.39 pm 1.88$ | $91.79 pm 2.82$ | $91.09 pm 3.01$ | **0.59** | **5.34** |
| **✓** | **✓** | **✓** | **97.83 ± 1.52** | **91.82 ± 3.06** | **91.18 ± 3.71** | 1.98 | 17.80 |

**Insights from component ablation:**

- **SSM Alone ($97.21%$ AUC):** Validates that linear state-space sequence modeling provides a strong global foundation.
- **SSM + Feature-Gating (**$+0.55\\%$ **AUC):** Adding gated selection yields a major jump, demonstrating that raw sequence modeling requires instance recalibration to suppress stromal/background noise.
- **ConvMixer + Feature-Gating (Ultra-Lightweight, 0.59M Params):** Excluding the SSM block yields a remarkably efficient model ($5.34\text{G}$ FLOPs, $91.79%$ ACC), illustrating the potency of depthwise feature mixing for low-resource environments.
- **Full Hybrid Model:** Combines local convolution, global sequence modeling, and gated recalibration to achieve the most balanced and superior metrics ($+0.54\\%$ AUC, $+0.48\\%$ ACC, $+0.31\\%$ F1 over SSM+ConvMixer).

### 2. Feature-Gating Activation Function Comparison

The authors systematically tested alternative non-linear activations inside the feature-gated module:

| Gating Activation | AUC (%) | ACC (%) | F1-Score (%) |
| --- | --- | --- | --- |
| **SiLU (Swish)** | $96.67 pm 2.60$ | $91.42 pm 3.92$ | $90.85 pm 4.51$ |
| **Sigmoid** | $97.03 pm 1.20$ | $91.07 pm 3.71$ | $90.64 pm 3.86$ |
| **Without Activation** | $97.29 pm 1.66$ | $91.34 pm 2.82$ | $90.87 pm 3.26$ |
| **Tanh** | $97.61 pm 1.30$ | $91.02 pm 3.24$ | $90.55 pm 3.45$ |
| **ReLU (ConvMixerSSM)** | **97.83 ± 1.52** | **91.82 ± 3.06** | **91.18 ± 3.71** |

ReLU outperforms smooth activations because it introduces **strict mathematical sparsity**, effectively silencing non-tumor patches before softmax weighting. Sigmoid and SiLU retain non-zero positive weights across the entire tissue area, allowing irrelevant stroma to corrupt the bag representation.

### 3. Impact of Architectural Stacking Depth

| Depth Configuration | AUC (%) | ACC (%) | F1-Score (%) |
| --- | --- | --- | --- |
| **Depth × 1 (Single Block)** | **97.83 ± 1.52** | $91.82 pm 3.06$ | **91.18 ± 3.71** |
| **Depth × 2 (Two Blocks)** | $97.36 pm 1.69$ | $91.75 pm 3.00$ | $91.18 pm 3.16$ |
| **Depth × 3 (Three Blocks)** | $97.41 pm 1.40$ | **92.30 ± 2.96** | $91.10 pm 3.00$ |

A shallow **Depth × 1** structure achieves the optimal operational balance: highest AUC, tied top F1-score, and minimal memory overhead. While Depth $\times 3$ yields a marginal gain in accuracy ($+0.48\\%$), the added latency and parameter count do not justify the tripling of intermediate feature storage in clinical production.

---

## Pathologist Visual Interpretability & Clinical Validation

Weakly supervised models must provide transparent visual explanations to be accepted in clinical workflows. The authors conducted a structured reader study with two independent expert pathologists from tertiary academic medical centers:

1. **Cohort Selection:** 7 randomly selected diagnostic slides (3 LUAD, 4 LUSC).
2. **Evaluation Protocol:** WSI Heatmap Evaluation questionnaire using a 5-point Likert scale (1: Very Poor, 2: Poor, 3: Fair, 4: Good, 5: Excellent) assessing histological relevance and boundary fidelity.
3. **Expert Ratings:**
   - **Pathologist 1:** 5 cases rated **Good (4)**; 2 cases rated **Fair (3)**.
   - **Pathologist 2:** 1 case rated **Excellent (5)**; 4 cases rated **Good (4)**; 2 cases rated **Fair (3)**.
4. **Morphological Concordance:** Attention peaks and top-scoring patches precisely mapped to diagnostic tumor foci:
   - **LUAD Cases:** High attention concentrated on malignant acinar, papillary, and cribriform glandular structures.
   - **LUSC Cases:** Attention focused on cohesive sheets of polygonal squamous cells displaying intercellular bridges, dense eosinophilic cytoplasm, and keratinization pearls.
   - **Negative Tissue:** Non-neoplastic alveolar parenchyma, bronchial cartilage, and anthracotic pigment received near-zero attention weights due to ReLU feature gating.

---

## Vault Context & Comparative Positioning

Within the broader landscape of digital pathology architectures, ConvMixerSSM represents a key synthesis of modern sequence modeling and classical computer vision priors:

- **Complementarity with Foundation Models:** ConvMixerSSM uses CONCH as its frozen tile feature encoder. As demonstrated in [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md), high-quality foundation model patch representations alone do not solve the slide-level pooling bottleneck. Specialized hybrid aggregators like ConvMixerSSM are essential to translate foundation model embeddings into robust WSI-level diagnoses.
- **Evolution of WSI Sequence Engines:**
  - *First Generation (2018–2020):* Instance-level pooling without interaction (ABMIL, Weakly supervised MIL histopathological tumor segmentation, CLAM).
  - *Second Generation (2021–2023):* Self-Attention Transformers (TransMIL), plagued by $\mathcal{O}(L^2)$ memory bottlenecks.
  - *Third Generation (2024–2026):* State Space Models (S4MIL, MambaMIL), achieving linear scaling $\mathcal{O}(L)$ but lacking local spatial priors.
  - *Current Hybrid Paradigm (ConvMixerSSM):* Combining depthwise separable convolutions for local morphological texture with sub-quadratic SSMs for macro-architectural context.

---

## Related Notes

- **Foundational Concepts:** [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md), [Machine Learning](../statistics-and-bioinformatics/machine-learning/README.md), [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
- **Foundation Models & Aggregation:** [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md), [Towards robust foundation models for digital pathology](Towards%20robust%20foundation%20models%20for%20digital%20pathology.md), [A distributional robustness margin for pathology foundation models](A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md)
- **Weakly Supervised Segmentation & MIL:** Weakly supervised MIL histopathological tumor segmentation, [Articles on computational, digital, and mathematical pathology](../computational-digital-and-mathematical-pathology/articles-on-computational-digital-and-mathematical-pathology.md)
- **Workflow & Hardware Considerations:** [Considerations for digital pathology displays](Considerations%20for%20digital%20pathology%20displays.md), [Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)](Regulatory%20Science%20Tools%20Catalog%20-%20Digital%20Pathology.md)
- **Diagnostic Cognitive Factors:** [When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology](When%20Two%20Wrongs%20Don%27t%20Make%20a%20Right%20-%20Examining%20Confirmation%20Bias%20and%20the%20Role%20of%20Time%20Pressure%20During%20Human-AI%20Collaboration%20in%20Computational%20Pathology.md), [Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology](Cognitive%20biases%20in%20AI-assisted%20medical%20decision%20making%20-%20A%20structured%20review%20as%20a%20primer%20for%20veterinary%20and%20human%20pathology.md)

<!-- tolaria:related:start -->

## See also

* [Articles on computational, digital, and mathematical pathology](../computational-digital-and-mathematical-pathology/articles-on-computational-digital-and-mathematical-pathology.md)
* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Machine Learning](../statistics-and-bioinformatics/machine-learning/README.md)
* [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md)

<!-- tolaria:related:end -->
