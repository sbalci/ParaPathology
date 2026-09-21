---
type: Clipping
status: Evergreen
language: en
title: "Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs"
aliases:
  - "Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs"
  - "RepLKNet"
  - "Large Kernel Design in CNNs"
  - "RepLKNet CVPR 2022"
source: "https://arxiv.org/abs/2203.06717"
doi: "10.1109/CVPR52688.2022.01167"
arxiv: "https://arxiv.org/abs/2203.06717"
conference: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)"
pages: "11975-11985"
year: 2022
source_type: article
author:
  - "[[Xiaohan Ding]]"
  - "[[Xiangyu Zhang]]"
  - "[[Yizhuang Zhou]]"
  - "[[Jungong Han]]"
  - "[[Guiguang Ding]]"
  - "[[Jian Sun]]"
published: 2022-03-14
created: 2026-09-20
description: "Landmark CVPR 2022 paper introducing RepLKNet, which challenges the decade-long convention of small 3x3 kernels by demonstrating that large depthwise convolutions (up to 31x31) coupled with structural re-parameterization enable pure CNNs to match or exceed Vision Transformers. Establishes the 5 guidelines for large-kernel design, demonstrates massive Effective Receptive Fields (ERF) and high shape bias, and introduces custom CUDA implicit GEMM kernels that directly inspired modern computational pathology encoders including UniRepLKNet and CellPrior-Net."
tags:
  - "clippings"
order: 148
belongs_to: "[[Clippings]]"
related_to:
  - "[[RepLKNet]]"
  - "[[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]"
  - "[[CellQuant-Net]]"
  - "[[HoVer-NeXt]]"
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[Digital Pathology Software]]"
---

# Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs

A milestone research paper by Xiaohan Ding, Xiangyu Zhang, Yizhuang Zhou, Jungong Han, Guiguang Ding, and Jian Sun across Tsinghua University, Megvii Research, and Aberystwyth University, published at the *IEEE/CVF Conference on Computer Vision and Pattern Recognition* (CVPR 2022: 11975–11985; Oral/Highlight presentation).

- **Paper URL:** [IEEE Xplore](https://doi.org/10.1109/CVPR52688.2022.01167); [arXiv:2203.06717](https://arxiv.org/abs/2203.06717)
- **Official PyTorch Repository:** [DingXiaoH/RepLKNet-pytorch](https://github.com/DingXiaoH/RepLKNet-pytorch) — Apache-2.0
- **Official MegEngine Repository:** [megvii-research/RepLKNet](https://github.com/megvii-research/RepLKNet)
- **Dedicated Tool Note:** [[RepLKNet]]
- **Direct Lineage in Digital Pathology:** [[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]], [[CellQuant-Net]]

---

## Executive Summary & Core Thesis

Since VGGNet (Simonyan & Zisserman, 2014), the computer vision community universally accepted the architectural heuristic that convolutional networks should stack small $3 \times 3$ kernels to maximize non-linear expressiveness while keeping parameter counts low. When Vision Transformers (ViTs, Swin) subsequently emerged and dominated vision benchmarks, the prevailing hypothesis held that the self-attention mechanism itself—enabling dynamic, global pairwise token interaction—was intrinsically superior to convolution.

**Ding et al. fundamentally challenged this premise by asking:**
> *Is self-attention itself indispensable, or is the performance leap of Vision Transformers simply a consequence of their vast Effective Receptive Field (ERF)?*

Through rigorous empirical and theoretical analysis, the authors proved that:
1. **CNNs with large kernels ($31 \times 31$) match or exceed Vision Transformers:** Scaling convolutional kernels up to $31 \times 31$ closes the performance gap between CNNs and ViTs on ImageNet-1K/22K, ADE20K semantic segmentation, and COCO object detection.
2. **Receptive Field Topology vs. Mechanism:** The critical distinction between CNNs and ViTs was not self-attention versus convolution, but **localized receptive field versus broad receptive field**.
3. **Five Design Guidelines:** The authors codified 5 foundational design guidelines for large-kernel CNNs, combining depthwise convolutions, structural re-parameterization, small-kernel compensation, ERF analysis, and shape-bias modulation.
4. **Computational Efficiency via Implicit GEMM:** Standard deep learning libraries fail on large kernels; by engineering a custom CUDA extension based on CUTLASS Implicit GEMM, large depthwise convolutions achieve up to 82% of hardware peak FLOPS with lower memory consumption than Transformers.

---

## The Five Design Guidelines for Large-Kernel CNNs

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                              THE FIVE GUIDELINES OF LARGE-KERNEL DESIGN                                │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  GUIDELINE 1: Large Depthwise Convolutions are Cheap
  • Dense Conv: O(C_in * C_out * K^2) explodes for K=31.
  • Depthwise Conv: O(C * K^2) decouples spatial aggregation from channel mixing.
  • Pointwise 1x1 Conv consumes >90% of model FLOPs -> Scaling DW kernel adds minimal overhead!

  GUIDELINE 2: Structural Re-parameterization Fixes Optimization
  • Large kernels suffer from vanishing gradients and training instability.
  • Solution: Add parallel small-kernel branch (5x5 DW) during training.
  • Inference: Algebraically fuse 5x5 branch into 31x31 kernel (zero extra latency or params).

  GUIDELINE 3: Small Kernels Compensate for High-Frequency Local Details
  • Large kernels behave as low-pass filters; small kernels capture high-frequency edges.
  • Fused re-parameterization merges multi-scale spatial frequency representation.

  GUIDELINE 4: Large Kernels Expand the Effective Receptive Field (ERF)
  • ResNet-152 theoretical RF is huge, but ERF is tiny and Gaussian-concentrated in the center.
  • RepLKNet-31 generates an ultra-wide, uniform ERF spanning the entire image, matching ViTs.

  GUIDELINE 5: High Shape Bias Overcomes Fragile Texture Bias
  • Standard CNNs are texture-biased (fragile to domain shift and image corruptions).
  • Large-kernel CNNs exhibit human-like shape bias, driving superior transfer and robustness.
```

### Guideline 1: Large Depthwise Convolutions are Computationally Efficient

In a standard dense 2D convolution with $C$ channels and kernel size $K \times K$, the computational cost scales as $\mathcal{O}(C^2 K^2)$. For $K = 31$, a dense convolution requires $(31/3)^2 \approx 106.8\times$ more FLOPs and parameters than a $3 \times 3$ convolution, which is computationally prohibitive.

However, in modern inverted bottleneck or ConvNeXt-style blocks, spatial convolution is **depthwise** (channel-isolated), scaling as $\mathcal{O}(C \cdot K^2)$, while channel mixing is delegated to $1 \times 1$ pointwise convolutions scaling as $\mathcal{O}(C^2)$. In a typical deep network block, $1 \times 1$ convolutions account for **over 90% of total FLOPs**. As a result, scaling the depthwise kernel from $3 \times 3$ to $31 \times 31$ increases total network FLOPs by only a modest fraction (e.g., $+10\text{--}15\%$), making large spatial filters computationally practical.

### Guideline 2: Structural Re-parameterization Overcomes Optimization Bottlenecks

Directly training a network with $31 \times 31$ kernels using standard AdamW or SGD frequently fails: gradients degrade, optimization stagnates, and performance falls behind smaller $13 \times 13$ kernels.

The authors resolve this using **structural re-parameterization**:
- During **training**, a parallel small-kernel depthwise branch (e.g., $5 \times 5$) is added alongside the $31 \times 31$ depthwise branch:
  $$y = \text{BN}_{31}(W_{31} * x) + \text{BN}_5(W_5 * x)$$
- At **inference**, because convolution and batch normalization are linear transformations, the batch normalization statistics are folded into the kernel weights:
  $$W'_{31} = \frac{\gamma_{31}}{\sigma_{31}} W_{31}, \quad b'_{31} = \beta_{31} - \frac{\gamma_{31} \mu_{31}}{\sigma_{31}}$$
  $$W'_5 = \frac{\gamma_5}{\sigma_5} W_5, \quad b'_5 = \beta_5 - \frac{\gamma_5 \mu_5}{\sigma_5}$$
- The $5 \times 5$ kernel $W'_5$ is zero-padded to $31 \times 31$ and algebraically added directly into $W'_{31}$:
  $$W_{\text{fused}} = W'_{31} + \text{Pad}_{31}(W'_5), \quad b_{\text{fused}} = b'_{31} + b'_5$$
- **Operational consequence:** The deployed model runs as a single-branch $31 \times 31$ convolution with **zero runtime memory penalty, zero extra FLOPs, and zero added latency**.

### Guideline 3: Small Kernels Compensate for High-Frequency Locality

Fourier analysis reveals that large convolutional kernels act primarily as low-pass spatial filters, excelling at capturing global object structure and context but attenuating high-frequency edge transitions. The parallel $5 \times 5$ branch explicitly forces the network to retain high-frequency spatial gradients during training, combining macro-context and micro-texture within the fused weights.

### Guideline 4: Effective Receptive Field (ERF) Dynamics

A central scientific contribution of the paper is demonstrating the massive disparity between **Theoretical Receptive Field (TRF)** and **Effective Receptive Field (ERF)**:
- While TRF grows linearly with network depth $L$, Luo et al. (NeurIPS 2016) showed that the effective impact of an input pixel on the central feature representation decays exponentially toward the periphery, with an effective radius proportional to $\mathcal{O}(K \sqrt{L})$.
- In very deep standard CNNs (e.g., ResNet-152), the ERF is highly peaked in a small central Gaussian disk, failing to expand to the edges of the image regardless of depth.
- In **RepLKNet-31**, the $31 \times 31$ kernels expand the ERF to cover the entire feature map uniformly, mirroring the dense cross-token attention matrices of Vision Transformers without computing pairwise dot-products.

### Guideline 5: High Shape Bias vs. Fragile Texture Bias

Deep learning models trained on ImageNet often suffer from an unnatural *texture bias*—classifying an elephant with cheetah skin as a cheetah (Geirhos et al., ICLR 2019). Humans, conversely, rely primarily on global object silhouette and shape.

Using psychophysical cue-conflict datasets, Ding et al. demonstrated that increasing kernel size from $3 \times 3$ to $31 \times 31$ dramatically **increases shape bias from 23.4% to 32.1%**, approaching human perceptual profiles and explaining why large-kernel CNNs transfer with exceptional robustness to out-of-distribution benchmarks.

---

## Technical Engineering: Custom CUDA Implicit GEMM

Standard PyTorch `cuDNN` implementations of depthwise convolutions are optimized for small kernels ($3 \times 3, 5 \times 5$). For $K \ge 13$, cuDNN relies on direct convolution or `im2col` buffering, incurring catastrophic memory bus saturation.

To resolve this, the authors engineered a custom CUDA kernel using **NVIDIA CUTLASS Implicit GEMM** (`DepthWiseConv2dImplicitGEMM`):
- **Implicit Index Mapping:** Maps depthwise convolution into matrix multiplication on-the-fly inside GPU registers without physically allocating memory for intermediate im2col tensors.
- **Hardware Saturation:** Achieves **82% of theoretical hardware FLOPS** on NVIDIA Tesla V100/A100 GPUs.
- On a $31 \times 31$ depthwise convolution, the custom kernel runs **over $4\times$ faster** than standard PyTorch/cuDNN implementations.

---

## Benchmark Results

### 1. ImageNet Classification

| Model | Pretraining | Input Resolution | Top-1 Accuracy | Parameters | FLOPs |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **RepLKNet-31B** | ImageNet-1K | $224 \times 224$ | 83.5% | 79M | 15.3G |
| **RepLKNet-31B** | ImageNet-1K | $384 \times 384$ | 84.8% | 79M | 45.1G |
| **RepLKNet-31B** | ImageNet-22K | $224 \times 224$ | 85.2% | 79M | 15.3G |
| **RepLKNet-31B** | ImageNet-22K | $384 \times 384$ | 86.0% | 79M | 45.1G |
| **RepLKNet-31L** | ImageNet-22K | $384 \times 384$ | **86.6%** | 172M | 96.0G |
| **RepLKNet-XL** | MegData-73M | $320 \times 320$ | **87.8%** | 335M | 128.7G |
| *Swin-B (Transformer)* | ImageNet-1K | $384 \times 384$ | 84.5% | 88M | 47.0G |
| *ConvNeXt-B* | ImageNet-1K | $384 \times 384$ | 85.1% | 89M | 45.0G |

### 2. Downstream Transfer: ADE20K Semantic Segmentation & COCO

- **ADE20K Semantic Segmentation (UperNet):**
  - RepLKNet-31B achieves **52.4 mIoU**, substantially outperforming Swin-B (**50.0 mIoU**, $+2.4$) and matching or exceeding ConvNeXt-B (**52.6 mIoU**) while running with lower latency.
- **COCO Object Detection (Cascade Mask R-CNN):**
  - RepLKNet-31B reaches **52.3 box AP** and **45.2 mask AP**, confirming that large kernels provide critical multi-scale contextual awareness for dense object localization.

---

## Direct Significance for Computational Pathology

The architectural principles established by RepLKNet are uniquely consequential for computational pathology and gigapixel Whole-Slide Image (WSI) processing:

1. **Overcoming the WSI Transformer Bottleneck:**
   - Vision Transformers (e.g., CellViT, UNI, Virchow) suffer from quadratic complexity $\mathcal{O}(N^2)$ and massive GPU memory overhead, causing single-slide inference to take 15–45 minutes.
   - Large-kernel CNNs provide an equivalent global Effective Receptive Field with **linear computational complexity $\mathcal{O}(N)$**, enabling gigapixel slides to be processed in 2–5 minutes.
2. **Direct Descendants in Vault:**
   - **[[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]] / [[CellQuant-Net]] (JPI 2026):** CP-Net deploys **UniRepLKNet-N** (the lightweight derivative of RepLKNet) with up to $31 \times 31$ kernels and physical hematoxylin Difference of Gaussians (DoG) priors. It achieves panoptic quality matching CellViT while running **$2\times$ to $3\times$ faster** (2.16 min on $20\times$, 2.77 min on $40\times$).
   - **LKCell:** Adopts large depthwise kernels specifically to resolve cell boundaries in hypercellular neoplastic tissue.
   - **[[HoVer-NeXt]]:** Modernized nuclear segmentation pipeline adopting large-kernel ConvNeXt blocks to surpass legacy HoVer-Net ResNet backbones.

---

## Citation

```bibtex
@inproceedings{ding2022scaling,
  title={Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs},
  author={Ding, Xiaohan and Zhang, Xiangyu and Zhou, Yizhuang and Han, Jungong and Ding, Guiguang and Sun, Jian},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
  pages={11975--11985},
  year={2022}
}
```
