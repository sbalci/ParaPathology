---
type: Tool
status: Evergreen
language: bilingual
title: "RepLKNet"
aliases:
  - "RepLKNet"
  - "replknet"
  - "RepLKNet-pytorch"
  - "Large-Kernel CNNs"
order: 170
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[CellQuant-Net]]"
  - "[[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]"
  - "[[HoVer-NeXt]]"
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[Image Analysis]]"
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
repo: https://github.com/DingXiaoH/RepLKNet-pytorch
paper: https://arxiv.org/abs/2203.06717
source_type: repository
external: true
adopted: false
engagement: active
license: Apache-2.0
last_reviewed: 2026-09-20
---

# RepLKNet

A foundational deep learning convolutional architecture and PyTorch framework introducing very large convolutional kernels (up to $31 \times 31$) coupled with structural re-parameterization. Developed by Xiaohan Ding, Xiangyu Zhang, Yizhuang Zhou, Jungong Han, Guiguang Ding, and Jian Sun across Tsinghua University and Megvii Research (*CVPR 2022*), RepLKNet revolutionized modern computer vision by proving that pure CNNs can achieve the massive Effective Receptive Field (ERF), high shape bias, and benchmark performance of Vision Transformers while retaining convolutional speed, hardware efficiency, and linear scaling.

- **PyTorch Repository:** [DingXiaoH/RepLKNet-pytorch](https://github.com/DingXiaoH/RepLKNet-pytorch) — Apache-2.0
- **Official MegEngine Repository:** [megvii-research/RepLKNet](https://github.com/megvii-research/RepLKNet)
- **Foundational Paper:** Ding X, Zhang X, Zhou Y, Han J, Ding G, Sun J. *Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs.* IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2022): 11975–11985. [DOI: 10.1109/CVPR52688.2022.01167](https://doi.org/10.1109/CVPR52688.2022.01167); [arXiv:2203.06717](https://arxiv.org/abs/2203.06717)
- **Companion Literature Review:** [[Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs]]
- **Evolutionary Successor:** [AILab-CVC/UniRepLKNet](https://github.com/AILab-CVC/UniRepLKNet) (CVPR 2024 / TPAMI 2025)
- **Direct Computational Pathology Descendants:** [[CellQuant-Net]] / [[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]], LKCell

---

## Why Large Kernels Matter in Computational Pathology

For nearly a decade following VGGNet (2014), deep learning doctrine mandated stacking small $3 \times 3$ convolutional filters to reduce parameters and deepen networks. When Vision Transformers (ViTs) emerged and outperformed standard CNNs, the performance gap was widely attributed to multi-head self-attention.

However, in **computational pathology and gigapixel Whole-Slide Image (WSI) analysis**, deploying Vision Transformers introduces severe operational friction:
1. **The Quadratic Compute Bottleneck:** Self-attention computes pairwise token interactions with $\mathcal{O}(N^2)$ memory and compute complexity, demanding enormous GPU VRAM and causing whole-slide inference to take 15 to 45 minutes per slide (e.g., CellViT).
2. **Loss of Inductive Biases:** ViTs lack shift-invariance and translation equivariance out of the box, requiring massive pretraining datasets (hundreds of millions of patches) to learn basic spatial relationships that CNNs possess inherently.
3. **Small-Kernel Receptive Field Saturation:** Traditional CNNs with $3 \times 3$ kernels (e.g., ResNet, UNet) have a strictly localized **Effective Receptive Field (ERF)** that does not expand sufficiently with depth, failing to capture millimeter-scale glandular morphology, invasive tumor margins, and tumor-stroma spatial context.

**RepLKNet resolved this dilemma** by demonstrating that the primary competitive advantage of Transformers is their **large Effective Receptive Field**, and that CNNs can acquire an equally vast receptive field simply by scaling depthwise kernels to $31 \times 31$. In computational pathology, this insight powers modern, ultra-fast architectures like **UniRepLKNet-N** in [[CellQuant-Net]] and LKCell, which match ViT accuracy while cutting inference latency by $2\times$ to $3\times$.

---

## Core Architectural Innovations

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   REPLKNET LARGE-KERNEL CONVOLUTION PIPELINE                          │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

    [ Input Feature Map (C x H x W) ]
                   │
                   ▼
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ TRAINING PHASE: Structural Re-parameterization                                          │
  │                                                                                        │
  │    ┌───────────────────────────┐         ┌───────────────────────────┐                 │
  │    │  31x31 Depthwise Conv     │         │   5x5 Depthwise Conv      │                 │
  │    │  (Broad Context & ERF)    │         │   (High-Frequency Detail) │                 │
  │    └─────────────┬─────────────┘         └─────────────┬─────────────┘                 │
  │                  │                                     │                               │
  │                  ▼                                     ▼                               │
  │             BatchNorm                             BatchNorm                            │
  │                  │                                     │                               │
  │                  └───────────────────┬─────────────────┘                               │
  │                                      │ Element-wise Addition                           │
  │                                      ▼                                                 │
  └──────────────────────────────────────┼─────────────────────────────────────────────────┘
                                         │
                                         ▼ [Offline Algebraic Weight Fusion]
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ INFERENCE PHASE: Zero-Cost Deployment                                                  │
  │                                                                                        │
  │    Zero-pad 5x5 kernel weights to 31x31, fold BatchNorm into weights and bias:         │
  │    W_fused = W_31' + Pad_31(W_5')                                                      │
  │                                                                                        │
  │    ┌───────────────────────────────────────────────────────────┐                       │
  │    │  Fused 31x31 Depthwise Conv (Single Layer, No Extra FLOPs)│                       │
  │    │  Accelerated by Custom CUDA Implicit GEMM Engine          │                       │
  │    └─────────────────────────────┬─────────────────────────────┘                       │
  └──────────────────────────────────┼─────────────────────────────────────────────────────┘
                                     │
                                     ▼
                     [ 1x1 Pointwise Convolutions & FFN ]
```

### 1. The Five Design Guidelines for Large-Kernel CNNs

1. **Large Depthwise Convolutions are Computationally Cheap:** Standard dense convolutions scale with $\mathcal{O}(C_{\text{in}} C_{\text{out}} K^2)$, making a $31 \times 31$ kernel impossible ($106.8\times$ heavier than $3 \times 3$). But depthwise (DW) convolution isolates spatial operations channel-by-channel ($\mathcal{O}(C \cdot K^2)$), while $1 \times 1$ pointwise convs handle channel mixing. Because $1 \times 1$ convs consume $>90\%$ of network FLOPs, increasing kernel size to $31 \times 31$ in DW layers incurs minimal overall overhead.
2. **Structural Re-parameterization Overcomes Optimization Bottlenecks:** Directly training large kernels with SGD or Adam suffers from vanishing gradients and optimization stagnation. RepLKNet introduces a parallel small-kernel branch ($5 \times 5$ DW conv) during training. At test time, the $5 \times 5$ kernel is zero-padded and algebraically merged into the $31 \times 31$ kernel, giving the optimization stability of small kernels with zero inference latency.
3. **Small Kernels Preserve High-Frequency Texture:** While large kernels capture macro-architectural context and broad shapes, the parallel $5 \times 5$ branch ensures that fine cytologic details (nuclear chromatin clumping, nucleoli, membrane contours) are explicitly learned and preserved.
4. **Effective Receptive Field (ERF) Mimics Transformers:** While theoretical receptive field scales with depth, the *effective* receptive field decays like a Gaussian from the center. RepLKNet produces an ultra-wide, uniformly distributed ERF that spans the entire visual token field, directly mirroring the global attention maps of ViTs.
5. **High Shape Bias:** Standard CNNs suffer from severe *texture bias*, making them fragile to domain and stain shifts. RepLKNet shifts CNN representation fundamentally toward *shape bias*, approaching human visual perception and explaining its high robustness in downstream transfer tasks.

### 2. Custom CUDA Implicit GEMM Engine

Standard deep learning frameworks (PyTorch cuDNN) rely on direct convolution or im2col algorithms optimized exclusively for $3 \times 3$ to $7 \times 7$ kernels. On large kernels ($K \ge 13$), cuDNN experiences catastrophic memory bandwidth bottlenecks.

RepLKNet provides a custom CUDA extension based on **CUTLASS and Implicit GEMM** (`DepthWiseConv2dImplicitGEMM`):
- Eliminates the materialization of large intermediate im2col matrices.
- Computes depthwise operations directly as tiled matrix multiplications in GPU SRAM/registers.
- Achieves **82% of theoretical hardware FLOPS** on NVIDIA Tesla V100/A100 GPUs, unlocking true real-time execution.

---

## Model Zoo & Specifications

| Model | Resolution | ImageNet-1K Top-1 | # Params | FLOPs | Downstream Target |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **RepLKNet-31B** | $224 \times 224$ | 83.5% | 79M | 15.3G | Base edge / fast classification |
| **RepLKNet-31B** | $384 \times 384$ | 84.8% | 79M | 45.1G | High-resolution semantic segmentation |
| **RepLKNet-31B (22K)** | $384 \times 384$ | 86.0% | 79M | 45.1G | Pretrained pan-domain feature extractor |
| **RepLKNet-31L (22K)** | $384 \times 384$ | **86.6%** | 172M | 96.0G | Heavy foundation backbone |
| **RepLKNet-XL (MegData-73M)**| $320 \times 320$ | **87.8%** | 335M | 128.7G | Extreme capacity dense segmentation |

- **Kernel Sizes per Stage:** Typically $[31, 29, 27, 13]$ across stages 1 through 4, providing progressive receptive fields.
- **Structural Re-parameterization:** $5 \times 5$ DW conv parallel to large DW conv in every RepLK Block.

---

## Installation & Code Integration

### 1. Installation

```bash
git clone https://github.com/DingXiaoH/RepLKNet-pytorch.git
cd RepLKNet-pytorch

# Compile the efficient large-kernel CUDA extension (optional, recommended for speed)
# Uses CUTLASS implicit GEMM
cd examples/19_large_depthwise_conv2d_torch_extension
python setup.py install --user
```

### 2. PyTorch Definition & Weight Reparameterization

```python
import torch
import torch.nn as nn
from replknet import create_RepLKNet31B

# 1. Initialize training model with parallel 5x5 re-parameterization branches
model = create_RepLKNet31B(num_classes=1000, use_checkpoint=False)
model.train()

# 2. After training, algebraically fuse small kernels into large kernels for inference
model.eval()
if hasattr(model, 'structural_reparam'):
    model.structural_reparam()

# The model now executes as a single-branch large-kernel CNN with zero extra latency!
sample_input = torch.randn(1, 3, 224, 224)
output = model(sample_input)
print("Output logits shape:", output.shape)
```

---

## Lineage and Impact on Digital Pathology

```
   RepLKNet (CVPR 2022)
   [Ding et al. — Large DW Conv 31x31 + Structural Reparam + Implicit GEMM]
             │
             ├──► SLaK (ICLR 2023) [51x51 Decomposed Kernels]
             │
             └──► UniRepLKNet (CVPR 2024 / TPAMI 2025)
                  [Ding et al. — Universal Perception 4-Guideline ConvNet]
                         │
                         ├──► LKCell (MICCAI / TMI) [Large-kernel cell segmentation]
                         │
                         └──► CellPrior-Net & CellQuant-Net (JPI 2026)
                              [Jabar et al. — UniRepLKNet-N + DoG prior:
                               2.16 min 20x WSI, 2.77 min 40x WSI,
                               Pareto-optimal matching CellViT at 3x speed]
```

1. **[[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]] / [[CellQuant-Net]]:** Adopts the compact **UniRepLKNet-N** (the lightweight variant in the RepLKNet family) as its visual feature encoder. By leveraging large depthwise kernels with physical hematoxylin DoG prior guidance, CP-Net matches CellViT panoptic quality while achieving **$2\times$ to $3\times$ speedups** on gigapixel slides (2.16 min on $20\times$, 2.77 min on $40\times$).
2. **Comparison with [[HoVer-NeXt]]:** HoVer-NeXt uses modern ConvNeXt-V2 backbones ($7 \times 7$ kernels) with masked autoencoding pretraining. RepLKNet pushes the spatial kernel envelope up to $31 \times 31$, maximizing the effective receptive field without requiring self-attention heads.
3. **Comparison with [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]:** HistoPLUS utilizes a distilled ViT (H0-mini, 86M) within CellViT. RepLKNet demonstrates that pure convolutional architectures can match or exceed ViT representation quality on dense cellular classification with substantially lower VRAM consumption and zero quadratic scaling.

---

## Related Notes

- **Foundational Paper Clipping:** [[Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs]]
- **Direct Descendant Pipelines:** [[CellQuant-Net]], [[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]
- **Modern Cellular Segmentation Backbones:** [[HoVer-NeXt]], [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]], [[NuClick]]
- **Ecosystem:** [[Digital Pathology Software]], [[Digital Pathology]], [[Image Analysis]]

# RepLKNet

Çok büyük konvolüsyon çekirdeklerini (en fazla $31 \times 31$) yapısal yeniden parametrelendirme (structural re-parameterization) ile birleştiren, temel nitelikte bir derin öğrenme konvolüsyonel mimarisi ve PyTorch çerçevesi. Tsinghua Üniversitesi ve Megvii Research'ten Xiaohan Ding, Xiangyu Zhang, Yizhuang Zhou, Jungong Han, Guiguang Ding ve Jian Sun tarafından geliştirilen (*CVPR 2022*) RepLKNet, saf CNN'lerin konvolüsyonel hızı, donanım verimliliğini ve doğrusal ölçeklenmeyi korurken Vision Transformer'ların (görüntü dönüştürücüleri) devasa Etkin Alıcı Alanına (Effective Receptive Field, ERF), yüksek şekil yanlılığına ve kıyaslama performansına ulaşabileceğini kanıtlayarak modern bilgisayarlı görüde devrim yaratmıştır.

- **PyTorch Deposu:** [DingXiaoH/RepLKNet-pytorch](https://github.com/DingXiaoH/RepLKNet-pytorch) — Apache-2.0
- **Resmî MegEngine Deposu:** [megvii-research/RepLKNet](https://github.com/megvii-research/RepLKNet)
- **Temel Makale:** Ding X, Zhang X, Zhou Y, Han J, Ding G, Sun J. *Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs.* IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2022): 11975–11985. [DOI: 10.1109/CVPR52688.2022.01167](https://doi.org/10.1109/CVPR52688.2022.01167); [arXiv:2203.06717](https://arxiv.org/abs/2203.06717)
- **Eşlik Eden Literatür İncelemesi:** Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs
- **Evrimsel Ardılı:** [AILab-CVC/UniRepLKNet](https://github.com/AILab-CVC/UniRepLKNet) (CVPR 2024 / TPAMI 2025)
- **Doğrudan Hesaplamalı Patoloji Türevleri:** CellQuant-Net / CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images, LKCell

---

## Hesaplamalı Patolojide Büyük Çekirdekler Neden Önemlidir

VGGNet'in (2014) ardından yaklaşık on yıl boyunca derin öğrenme doktrini, parametre sayısını azaltmak ve ağları derinleştirmek için küçük $3 \times 3$ konvolüsyon filtrelerinin üst üste dizilmesini şart koşuyordu. Vision Transformer'lar (ViT) ortaya çıkıp standart CNN'leri geride bıraktığında, aradaki performans farkı yaygın olarak çok başlı öz-dikkat (multi-head self-attention) mekanizmasına bağlandı.

Ancak **hesaplamalı patoloji ve gigapiksel Tüm Slayt Görüntüsü (Whole-Slide Image, WSI) analizinde**, Vision Transformer'ların kullanıma alınması ciddi işletimsel sorunlar doğurur:
1. **Karesel Hesaplama Darboğazı:** Öz-dikkat, token'lar arası ikili etkileşimleri $\mathcal{O}(N^2)$ bellek ve hesaplama karmaşıklığıyla hesaplar; bu da muazzam GPU VRAM'i gerektirir ve tüm slayt çıkarımının slayt başına 15 ila 45 dakika sürmesine yol açar (ör. CellViT).
2. **Tümevarımsal Yanlılıkların (Inductive Biases) Kaybı:** ViT'ler kendiliğinden kaymaya karşı değişmezlik (shift-invariance) ve öteleme eşdeğişkenliğine (translation equivariance) sahip değildir; CNN'lerin doğası gereği sahip olduğu temel uzamsal ilişkileri öğrenebilmek için devasa ön eğitim veri kümelerine (yüz milyonlarca yama) ihtiyaç duyarlar.
3. **Küçük Çekirdekte Alıcı Alan Doygunluğu:** $3 \times 3$ çekirdekli geleneksel CNN'ler (ör. ResNet, UNet), derinlikle yeterince genişlemeyen, kesin olarak lokalize bir **Etkin Alıcı Alana (ERF)** sahiptir; bu nedenle milimetre ölçeğindeki glandüler morfolojiyi, invaziv tümör sınırlarını ve tümör-stroma uzamsal bağlamını yakalayamazlar.

**RepLKNet bu ikilemi**, Transformer'ların asıl rekabet üstünlüğünün **geniş Etkin Alıcı Alanları** olduğunu ve CNN'lerin de derinlemesine (depthwise) çekirdekleri yalnızca $31 \times 31$'e büyüterek eşit genişlikte bir alıcı alan kazanabileceğini göstererek **çözmüştür**. Hesaplamalı patolojide bu kavrayış, CellQuant-Net içindeki **UniRepLKNet-N** ve LKCell gibi, ViT doğruluğuna ulaşırken çıkarım gecikmesini $2\times$ ila $3\times$ azaltan modern, son derece hızlı mimarilere güç vermektedir.

---

## Temel Mimari Yenilikler

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   REPLKNET LARGE-KERNEL CONVOLUTION PIPELINE                          │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

    [ Input Feature Map (C x H x W) ]
                   │
                   ▼
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ TRAINING PHASE: Structural Re-parameterization                                          │
  │                                                                                        │
  │    ┌───────────────────────────┐         ┌───────────────────────────┐                 │
  │    │  31x31 Depthwise Conv     │         │   5x5 Depthwise Conv      │                 │
  │    │  (Broad Context & ERF)    │         │   (High-Frequency Detail) │                 │
  │    └─────────────┬─────────────┘         └─────────────┬─────────────┘                 │
  │                  │                                     │                               │
  │                  ▼                                     ▼                               │
  │             BatchNorm                             BatchNorm                            │
  │                  │                                     │                               │
  │                  └───────────────────┬─────────────────┘                               │
  │                                      │ Element-wise Addition                           │
  │                                      ▼                                                 │
  └──────────────────────────────────────┼─────────────────────────────────────────────────┘
                                         │
                                         ▼ [Offline Algebraic Weight Fusion]
  ┌────────────────────────────────────────────────────────────────────────────────────────┐
  │ INFERENCE PHASE: Zero-Cost Deployment                                                  │
  │                                                                                        │
  │    Zero-pad 5x5 kernel weights to 31x31, fold BatchNorm into weights and bias:         │
  │    W_fused = W_31' + Pad_31(W_5')                                                      │
  │                                                                                        │
  │    ┌───────────────────────────────────────────────────────────┐                       │
  │    │  Fused 31x31 Depthwise Conv (Single Layer, No Extra FLOPs)│                       │
  │    │  Accelerated by Custom CUDA Implicit GEMM Engine          │                       │
  │    └─────────────────────────────┬─────────────────────────────┘                       │
  └──────────────────────────────────┼─────────────────────────────────────────────────────┘
                                     │
                                     ▼
                     [ 1x1 Pointwise Convolutions & FFN ]
```

### 1. Büyük Çekirdekli CNN'ler için Beş Tasarım İlkesi

1. **Büyük Derinlemesine Konvolüsyonlar Hesaplama Açısından Ucuzdur:** Standart yoğun (dense) konvolüsyonlar $\mathcal{O}(C_{\text{in}} C_{\text{out}} K^2)$ ile ölçeklenir; bu da $31 \times 31$'lik bir çekirdeği olanaksız kılar ($3 \times 3$'ten $106.8\times$ daha ağır). Oysa derinlemesine (depthwise, DW) konvolüsyon uzamsal işlemleri kanal kanal ayırır ($\mathcal{O}(C \cdot K^2)$), kanal karışımını ise $1 \times 1$ noktasal (pointwise) konvolüsyonlar üstlenir. $1 \times 1$ konvolüsyonlar ağın FLOP'larının $>90\%$'ını tükettiğinden, DW katmanlarında çekirdek boyutunu $31 \times 31$'e çıkarmak toplamda yalnızca çok küçük bir ek yük getirir.
2. **Yapısal Yeniden Parametrelendirme Optimizasyon Darboğazlarını Aşar:** Büyük çekirdeklerin doğrudan SGD veya Adam ile eğitilmesi, kaybolan gradyanlar ve optimizasyonda durağanlaşma sorunlarıyla karşılaşır. RepLKNet, eğitim sırasında paralel bir küçük çekirdek dalı ($5 \times 5$ DW konvolüsyon) ekler. Test aşamasında $5 \times 5$ çekirdek sıfırla doldurulur (zero-padding) ve cebirsel olarak $31 \times 31$ çekirdeğe birleştirilir; böylece küçük çekirdeklerin optimizasyon kararlılığı, çıkarımda hiçbir ek gecikme olmaksızın elde edilir.
3. **Küçük Çekirdekler Yüksek Frekanslı Dokuyu Korur:** Büyük çekirdekler makro-mimari bağlamı ve genel şekilleri yakalarken, paralel $5 \times 5$ dal ince sitolojik ayrıntıların (nükleer kromatin kümelenmesi, nükleoller, membran konturları) açıkça öğrenilmesini ve korunmasını sağlar.
4. **Etkin Alıcı Alan (ERF) Transformer'ları Taklit Eder:** Kuramsal alıcı alan derinlikle büyüse de *etkin* alıcı alan merkezden itibaren Gauss dağılımı gibi azalır. RepLKNet, tüm görsel token alanını kapsayan, son derece geniş ve düzgün dağılımlı bir ERF üretir; bu, ViT'lerin global dikkat haritalarını doğrudan yansıtır.
5. **Yüksek Şekil Yanlılığı:** Standart CNN'ler ciddi bir *doku yanlılığı* (texture bias) taşır; bu da onları alan (domain) ve boya kaymalarına karşı kırılgan kılar. RepLKNet, CNN temsilini temelden *şekil yanlılığına* (shape bias) doğru kaydırır; insan görsel algısına yaklaşır ve aşağı akış (downstream) aktarım görevlerindeki yüksek sağlamlığını açıklar.

### 2. Özel CUDA Implicit GEMM Motoru

Standart derin öğrenme çerçeveleri (PyTorch cuDNN), yalnızca $3 \times 3$ ile $7 \times 7$ arası çekirdekler için optimize edilmiş doğrudan konvolüsyon veya im2col algoritmalarına dayanır. Büyük çekirdeklerde ($K \ge 13$) cuDNN, felaket düzeyinde bellek bant genişliği darboğazları yaşar.

RepLKNet, **CUTLASS ve Implicit GEMM** tabanlı özel bir CUDA eklentisi sunar (`DepthWiseConv2dImplicitGEMM`):
- Büyük ara im2col matrislerinin bellekte oluşturulmasını ortadan kaldırır.
- Derinlemesine işlemleri doğrudan GPU SRAM/yazmaçlarında karolara bölünmüş (tiled) matris çarpımları olarak hesaplar.
- NVIDIA Tesla V100/A100 GPU'larda **kuramsal donanım FLOPS değerinin %82'sine** ulaşarak gerçek zamanlı çalışmayı mümkün kılar.

---

## Model Koleksiyonu (Model Zoo) ve Özellikler

| Model | Çözünürlük | ImageNet-1K Top-1 | Parametre sayısı | FLOP | Aşağı Akış Hedefi |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **RepLKNet-31B** | $224 \times 224$ | 83.5% | 79M | 15.3G | Temel uç (edge) / hızlı sınıflandırma |
| **RepLKNet-31B** | $384 \times 384$ | 84.8% | 79M | 45.1G | Yüksek çözünürlüklü semantik segmentasyon |
| **RepLKNet-31B (22K)** | $384 \times 384$ | 86.0% | 79M | 45.1G | Önceden eğitilmiş, alanlar arası öznitelik çıkarıcı |
| **RepLKNet-31L (22K)** | $384 \times 384$ | **86.6%** | 172M | 96.0G | Ağır temel (foundation) omurga |
| **RepLKNet-XL (MegData-73M)**| $320 \times 320$ | **87.8%** | 335M | 128.7G | Aşırı kapasiteli yoğun segmentasyon |

- **Aşamalara Göre Çekirdek Boyutları:** 1'den 4'e kadar olan aşamalarda tipik olarak $[31, 29, 27, 13]$; kademeli olarak genişleyen alıcı alanlar sağlar.
- **Yapısal Yeniden Parametrelendirme:** Her RepLK Bloğunda büyük DW konvolüsyona paralel $5 \times 5$ DW konvolüsyon.

---

## Kurulum ve Kod Entegrasyonu

### 1. Kurulum

```bash
git clone https://github.com/DingXiaoH/RepLKNet-pytorch.git
cd RepLKNet-pytorch

# Compile the efficient large-kernel CUDA extension (optional, recommended for speed)
# Uses CUTLASS implicit GEMM
cd examples/19_large_depthwise_conv2d_torch_extension
python setup.py install --user
```

### 2. PyTorch Tanımı ve Ağırlıkların Yeniden Parametrelendirilmesi

```python
import torch
import torch.nn as nn
from replknet import create_RepLKNet31B

# 1. Initialize training model with parallel 5x5 re-parameterization branches
model = create_RepLKNet31B(num_classes=1000, use_checkpoint=False)
model.train()

# 2. After training, algebraically fuse small kernels into large kernels for inference
model.eval()
if hasattr(model, 'structural_reparam'):
    model.structural_reparam()

# The model now executes as a single-branch large-kernel CNN with zero extra latency!
sample_input = torch.randn(1, 3, 224, 224)
output = model(sample_input)
print("Output logits shape:", output.shape)
```

---

## Soy Hattı ve Dijital Patolojiye Etkisi

```
   RepLKNet (CVPR 2022)
   [Ding et al. — Large DW Conv 31x31 + Structural Reparam + Implicit GEMM]
             │
             ├──► SLaK (ICLR 2023) [51x51 Decomposed Kernels]
             │
             └──► UniRepLKNet (CVPR 2024 / TPAMI 2025)
                  [Ding et al. — Universal Perception 4-Guideline ConvNet]
                         │
                         ├──► LKCell (MICCAI / TMI) [Large-kernel cell segmentation]
                         │
                         └──► CellPrior-Net & CellQuant-Net (JPI 2026)
                              [Jabar et al. — UniRepLKNet-N + DoG prior:
                               2.16 min 20x WSI, 2.77 min 40x WSI,
                               Pareto-optimal matching CellViT at 3x speed]
```

1. **CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images / CellQuant-Net:** Görsel öznitelik kodlayıcısı olarak kompakt **UniRepLKNet-N**'yi (RepLKNet ailesinin hafif varyantı) benimser. Büyük derinlemesine çekirdeklerden fiziksel hematoksilen DoG ön bilgisi (prior) rehberliğiyle yararlanarak CP-Net, gigapiksel slaytlarda **$2\times$ ila $3\times$ hızlanma** sağlarken CellViT'in panoptik kalitesine ulaşır ($20\times$'te 2.16 dk, $40\times$'ta 2.77 dk).
2. **HoVer-NeXt ile Karşılaştırma:** HoVer-NeXt, maskeli otomatik kodlama (masked autoencoding) ön eğitimli modern ConvNeXt-V2 omurgalarını ($7 \times 7$ çekirdekler) kullanır. RepLKNet ise uzamsal çekirdek sınırını $31 \times 31$'e kadar zorlayarak öz-dikkat başlıklarına gerek duymadan etkin alıcı alanı en üst düzeye çıkarır.
3. **HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides ile Karşılaştırma:** HistoPLUS, CellViT içinde damıtılmış (distilled) bir ViT (H0-mini, 86M) kullanır. RepLKNet, saf konvolüsyonel mimarilerin yoğun hücresel sınıflandırmada, belirgin biçimde daha düşük VRAM tüketimi ve sıfır karesel ölçeklenme ile ViT temsil kalitesine ulaşabileceğini, hatta onu aşabileceğini göstermektedir.

---

## İlgili Notlar

- **Temel Makale Kırpıntısı (Clipping):** Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs
- **Doğrudan Türev İş Akışları:** CellQuant-Net, CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images
- **Modern Hücresel Segmentasyon Omurgaları:** HoVer-NeXt, HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides, NuClick
- **Ekosistem:** Digital Pathology Software, Digital Pathology, Image Analysis
