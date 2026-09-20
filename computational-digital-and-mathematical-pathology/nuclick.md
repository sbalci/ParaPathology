---
type: Tool
status: Evergreen
language: en
title: "NuClick"
aliases:
  - "NuClick"
  - "nuclick"
  - "nuclick_torch"
  - "NuClick-Torch"
order: 155
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[HoVer-NeXt]]"
  - "[[Cytomine]]"
  - "[[Image Analysis]]"
  - "[[Digital Pathology]]"
  - "[[From Samples to Knowledge 2025: QuPath Training Course]]"
  - "[[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]"
  - "[[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]"
repo: https://github.com/mostafajahanifar/nuclick_torch/
paper: https://doi.org/10.1016/j.media.2020.101771
source_type: repository
external: true
adopted: false
engagement: active
license: CC BY-NC-SA 4.0
last_reviewed: 2026-09-20
---

# NuClick

An interactive deep-learning framework for prompted segmentation of microscopic objects (nuclei, cells, and glands) from user point clicks. Developed by Mostafa Jahanifar, Navid Alemi Koohbanani, Neda Zamani Tajeddin, and Nasir Rajpoot at the Tissue Image Analytics (TIA) Centre (University of Warwick), NuClick transforms tedious manual polygon tracing into instant point clicks, serving as a foundational curation and annotation engine across digital pathology.

- **PyTorch Repository:** [mostafajahanifar/nuclick_torch](https://github.com/mostafajahanifar/nuclick_torch/) — CC BY-NC-SA 4.0
- **Foundational Paper:** Koohbanani NA, Jahanifar M, Tajadin NZ, Rajpoot N. *NuClick: A deep learning framework for interactive segmentation of microscopic images.* Medical Image Analysis 65 (2020): 101771. [DOI: 10.1016/j.media.2020.101771](https://doi.org/10.1016/j.media.2020.101771); [arXiv:2005.14511](https://arxiv.org/abs/2005.14511)
- **Pretrained Weights:** [NuClick Architecture Checkpoint](https://drive.google.com/file/d/1JBK3vWsVC4DxbcStukwnKNZm-vCSLdOb/view?usp=sharing) | [UNet Architecture Checkpoint](https://drive.google.com/file/d/1d_ypVYTsXoMrTVJaEfVRGS5CfLkxyViK/view?usp=sharing)
- **Cytomine Integration:** [TissueImageAnalytics/cytomine-app (`cytomine-interactive-segmentation-nuclick`)](https://github.com/TissueImageAnalytics/cytomine-app)

---

## The Problem: The Annotation Bottleneck in Computational Pathology

Supervised training of nuclear instance segmentation and classification algorithms (such as [[HoVer-NeXt]], CellViT, and Mask R-CNN) requires extensive ground-truth masks. However, generating pixel-accurate closed polygonal boundaries on hematoxylin and eosin (H&E) slides is notoriously expensive:
1. **Manual Annotation Friction:** Manually tracing a single nuclear boundary takes an expert pathologist **30 to 60 seconds**. A single 40× whole-slide image contains hundreds of thousands to millions of nuclei, making exhaustive manual segmentation cost-prohibitive.
2. **Inter-Annotator Boundary Discordance:** Manual boundary tracing suffers from severe subjective variation in where the nuclear envelope ends, especially in overlapping, hyperchromatic, or vesicular nuclei.
3. **Bounding-Box Insufficiency:** Coarse bounding-box annotations fail to provide the exact morphological contours required for downstream shape features (eccentricity, circularity, perimeter-to-area ratio) or distance-map training.

NuClick resolves this dilemma by replacing manual contour tracing with a **single internal click (centroid)** per target object, reducing annotation time to **<1 second per nucleus** while delivering standardized, objective boundary delineation.

---

## Technical Architecture & Guiding Mechanism

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                NUCLICK PROMPTED INFERENCE PIPELINE                                     │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  [ Microscopic Image Patch (RGB) ]       [ User Click on Target ]       [ Neighbouring Cell Clicks ]
                 │                                   │                                 │
                 │ (3 channels)                      │ (1 channel)                     │ (1 channel)
                 ▼                                   ▼                                 ▼
      ┌───────────────────────┐           ┌──────────────────────┐          ┌──────────────────────┐
      │  RGB Histology Tile   │           │    Inclusion Map     │          │    Exclusion Map     │
      │   (128 × 128 px)      │           │ (Gaussian disk / dot │          │ (Disks at nearby     │
      │                       │           │  at target centroid) │          │  neighbour centroids)│
      └───────────┬───────────┘           └──────────┬───────────┘          └──────────┬───────────┘
                  │                                  │                                 │
                  └──────────────────────────────────┼─────────────────────────────────┘
                                                     │ Concat to 5-Channel Tensor
                                                     ▼
                             ┌────────────────────────────────────────────────┐
                             │       5-CHANNEL PROMPTED INPUT TENSOR          │
                             │       Shape: [Batch, 5, Height, Width]         │
                             └───────────────────────┬────────────────────────┘
                                                     │
                                                     ▼
                             ┌────────────────────────────────────────────────┐
                             │       DEEP CONVOLUTIONAL BACKBONE              │
                             │   • Option A: Original NuClick CNN             │
                             │   • Option B: Modified Skip-Connected U-Net    │
                             └───────────────────────┬────────────────────────┘
                                                     │
                                                     ▼
                             ┌────────────────────────────────────────────────┐
                             │  Single-Channel Binary Segmentation Logits     │
                             │  Loss: Weighted Binary Cross-Entropy + Dice    │
                             └───────────────────────┬────────────────────────┘
                                                     │ Threshold (p > 0.5)
                                                     ▼
                             ┌────────────────────────────────────────────────┐
                             │    Output: Precise Target Nuclear Boundary     │
                             │    (Exclusion map strictly prevents bleeding   │
                             │     into adjacent neighboring nuclei)          │
                             └────────────────────────────────────────────────┘
```

### The Dual Inclusion/Exclusion Guidance Map Mechanism

The defining mathematical innovation of NuClick is the use of **two complementary spatial guidance channels**:

1. **Inclusion Map ($I_{\text{inc}}$):** A single point or small Gaussian disk placed inside the target nucleus to be segmented. This acts as an attractor, directing the receptive field to segment the enclosing object.
2. **Exclusion Map ($I_{\text{exc}}$):** Points placed at the centroids of all *other* neighbouring nuclei within the local patch.
   - In dense cellular clusters (e.g., solid tumor nests, lymphoid aggregates, or hyperplastic glands), standard segmentation networks frequently leak across ambiguous cell-cell borders.
   - The exclusion map acts as an explicit **spatial barrier / repulsive field**, penalizing any output mask that expands into adjacent nuclei. This guarantees clean instance separation even when nuclear membranes directly abut one another.

### Network Variants in `nuclick_torch`

- **NuClick Architecture:** A lightweight multi-scale convolutional neural network with residual units, designed specifically for rapid real-time interactive inference with low parameter overhead.
- **Improved NuClick U-Net:** A modernized symmetrical U-Net architecture featuring encoder-decoder skip connections, feature concatenation, and dropout regularization. When trained across multi-cancer corpora (ConSEP and PCNS across 14 indications), the U-Net variant achieves validation **Dice scores of 0.874+**, providing superior boundary sharpness for complex nuclear phenotypes.

---

## Role in Consortium Benchmarks & Foundation Models

NuClick is not only an interactive annotation GUI tool; it serves as the **core boundary expansion engine** in flagship computational pathology breakthroughs:

### 1. The HistoPLUS Active-Learning & Consensus Engine

In [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]] (Adjadj et al., *Journal of Pathology Informatics* 2026, [DOI: 10.1016/j.jpi.2026.100696](https://doi.org/10.1016/j.jpi.2026.100696)), Owkin, Bioptimus, and the MOSAIC consortium deployed `nuclick_torch` as their standardized boundary generator:
- **HistoTRAIN Curation (108,722 Nuclei):** Pathologists placed point centroids and phenotypic class labels on the Cytomine platform. `nuclick_torch` automatically expanded these 108k points into instance segmentation masks, slashing human curation time by $>90\%$ while standardizing boundary definitions across 6 cancer indications.
- **HistoVAL Multi-Reader Consensus (69,108 Nuclei):** 3 independent board-certified pathologists independently annotated tiles (212,992 total raw point annotations). NuClick expanded all points to masks; Hungarian instance matching ($\text{IoU} > 0.4$) filtered discordances to isolate nuclei with $\ge 2$ agreeing raters; centroids were averaged and phenotypes voted; and a final NuClick inference pass generated the gold-standard consensus boundaries.

### 2. Integration with [[Cytomine]] & [[Digital Pathology Software]]

Through the University of Warwick TIA Centre's Dockerized ecosystem ([`cytomine-interactive-segmentation-nuclick`](https://github.com/TissueImageAnalytics/cytomine-app)), NuClick runs as an interactive backend inside Cytomine web viewers. Pathologists can click on cells in a browser, and the server returns SVG/GeoJSON polygonal boundaries in sub-second response times.

---

## Installation & Practical Usage

### 1. Installation

```bash
git clone https://github.com/mostafajahanifar/nuclick_torch.git
cd nuclick_torch
pip install -r requirements.txt
```

### 2. Command-Line Interface (CLI)

Run boundary prediction for a single image with a CSV point list (`x, y` coordinates):

```bash
python predict.py \
    --model unet \
    --weights checkpoints/NuClick_Unet_40xAll.pth \
    --input_image sample_he_patch.png \
    --input_points nuclei_centroids.csv \
    --output_dir ./predicted_masks/
```

Run batch inference across an entire directory of patches:

```bash
python predict.py \
    --model unet \
    --weights checkpoints/NuClick_Unet_40xAll.pth \
    --imgdir ./data/patches/ \
    --pntdir ./data/points/ \
    --output_dir ./data/segmented_masks/
```

### 3. Python API Integration

```python
import torch
import numpy as np
from PIL import Image

# 1. Load image and points
image = np.array(Image.open("patch_40x.png")) # H, W, 3
points = [(124, 86), (210, 145), (312, 280)] # (x, y) coordinates

# 2. Construct 5-channel tensor for target nucleus (e.g. index 0)
target_pt = points[0]
other_pts = points[1:]

h, w, _ = image.shape
inclusion_map = np.zeros((h, w), dtype=np.float32)
inclusion_map[target_pt[1], target_pt[0]] = 1.0

exclusion_map = np.zeros((h, w), dtype=np.float32)
for opt in other_pts:
    exclusion_map[opt[1], opt[0]] = 1.0

# 3. Stack to [1, 5, H, W]
input_tensor = np.concatenate(
    [image / 255.0, inclusion_map[..., None], exclusion_map[..., None]], 
    axis=-1
).transpose(2, 0, 1)
input_tensor = torch.tensor(input_tensor, dtype=torch.float32).unsqueeze(0).cuda()

# 4. Infer with pretrained NuClick U-Net
model = torch.load("checkpoints/NuClick_Unet_40xAll.pth").cuda().eval()
with torch.no_grad():
    pred_mask = (torch.sigmoid(model(input_tensor)) > 0.5).cpu().numpy().squeeze()
```

---

## Vault Context & Comparative Positioning

- **NuClick vs. [[HoVer-NeXt]] / HoVer-Net:** HoVer-NeXt is an unprompted, fully automated whole-slide inference engine that predicts horizontal-vertical distance fields to segment all nuclei simultaneously. NuClick is a prompted, click-guided engine optimized for human-in-the-loop interactive annotation and building ground-truth training datasets.
- **NuClick vs. Segment Anything (SAM / MedSAM):** While SAM provides general-purpose point prompting, its boundary delineation on tightly clustered H&E nuclei frequently exhibits border blur or merges adjacent chromatin due to lack of exclusion priors. NuClick's dedicated exclusion map explicitly penalizes adjacent cells, achieving superior multi-instance nuclear separation.
- **Upstream Curation for [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]:** Without NuClick, curating the 108k HistoTRAIN dataset across 6 indications and deriving Hungarian consensus across 212k annotations would have required years of manual tracing.

---

## Related Notes

- **Cell Instance Segmentation:** [[HoVer-NeXt]], [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]], [[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]], [[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]
- **Annotation & Infrastructure:** [[Cytomine]], [[Digital Pathology Software]], [[From Samples to Knowledge 2025: QuPath Training Course]], [[Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images]]
- **Standards & Catalogs:** [[Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)]], [[Articles on computational, digital, and mathematical pathology]]
