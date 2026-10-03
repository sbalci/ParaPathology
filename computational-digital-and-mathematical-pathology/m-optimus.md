---
type: Tool
status: Evergreen
language: en
title: "M-Optimus"
aliases:
  - "M-Optimus-1"
  - "Bioptimus M-Optimus"
  - "Bioptimus M-Optimus-1"
  - "m-optimus"
order: 176
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer]]"
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]"
  - "[[Celldega]]"
  - "[[Digital Pathology Software]]"
  - "[[Digital Pathology]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
url: "https://www.bioptimus.com/m-optimus"
source_type: platform
external: true
adopted: false
engagement: active
license: Commercial / Private Cloud (AWS SageMaker)
last_reviewed: 2026-10-03
---

# M-Optimus

**M-Optimus** (and its initial iteration **M-Optimus-1**) is a multimodal, multi-scale biological foundation model developed by **Bioptimus** (Paris, France). Conceived as a "world model for biology," M-Optimus integrates phenotypic morphology with molecular genetics by cross-training on paired Hematoxylin and Eosin (H&E) whole-slide histology, bulk transcriptomics (RNA-seq), and high-plex spatial transcriptomics (10x Genomics Visium and Xenium).

A breakthrough capability of M-Optimus-1 is its ability to perform **in silico spatial transcriptomics**, reconstructing high-dimensional spatial gene expression profiles for **6,000+ genes directly from routine H&E whole-slide images**—either in H&E-only mode or guided by paired bulk RNA-seq.

- **Platform Overview:** [bioptimus.com/m-optimus](https://www.bioptimus.com/m-optimus)
- **Technical Launch:** [bioptimus.com/introducing-m-optimus](https://www.bioptimus.com/introducing-m-optimus)
- **Clinical Biomarker Demonstration:** [From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer](../Clippings/From%20Model%20to%20Patient%20-%20M-Optimus-1%20for%20Spatial%20Biomarker%20Discovery%20in%20Ovarian%20Cancer.md) ([bioptimus.com Blog](https://www.bioptimus.com/m-optimus-1-for-spatial-biomarker-discovery-in-ovarian-cancer))
- **Consortium Data Engine (STELA):** [bioptimus.com/stela](https://www.bioptimus.com/stela) (scaling multi-modal spatial discoveries to 100,000 patients)
- **Deployment:** Private enterprise inference via Amazon Web Services (AWS SageMaker JumpStart / Bedrock)

---

## Architectural Principles & Modality Fusion

Most conventional digital pathology foundation models (e.g., UNI, Virchow, Phikon, Prov-GigaPath) are strictly unimodal: they operate as vision encoders mapping $256 \times 256$ px RGB image patches into latent representation vectors. While powerful for morphological feature extraction, they cannot directly infer unmeasured molecular transcripts or spatial multi-omics.

M-Optimus bridges the scale and modality divide across three layers of biological abstraction:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   M-OPTIMUS MULTIMODAL PYRAMID                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

  Level 3: Tissue Architecture & Spatial Niches ──►  In Silico Spatial Transcriptomics (6,000+ Genes)
                                                                 ▲
                                                                 │ (Cross-Modal Attention & Decoding)
  Level 2: Cellular Phenotypes & Morphology      ──►  Gigapixel Whole-Slide H&E (Tile Embeddings)
                                                                 ▲
                                                                 │ (Biological Co-Embedding Space)
  Level 1: Molecular Profiling & Transcriptomics ──►  Bulk RNA-seq Expression Vectors
```

### Pre-Training Foundation & Scaling
- **Histological Breadth:** Trained on tens of millions of H&E tiles spanning more than 50 human tissue and tumor types.
- **Multimodal Alignment:** Incorporates thousands of multi-modal clinical donor datasets where physical histology slides are aligned with both bulk transcriptomics and spatial transcriptomics arrays.
- **Inference Modes:**
  1. *Multimodal Inference (H&E + Bulk RNA-seq):* Ingests the whole-slide H&E image alongside patient-level bulk transcriptomics (or pseudo-bulked scRNA-seq), projecting bulk molecular abundance into high-resolution spatial coordinates across the slide.
  2. *Unimodal Image-Only Inference (H&E-only):* Infers 6,000+ spatial gene expression maps directly from morphological features alone, unlocking archival glass slides where tissue blocks or fresh RNA are unavailable.

---

## Key Capabilities & Clinical Applications

### 1. In Silico Spatial Transcriptomics (SpT)
Wet-lab spatial sequencing requires specialized hardware, expensive consumables ($1,500–$5,000/slide), and destroys clinical tissue. M-Optimus-1 generates virtual spatial expression maps at compute cost alone (~$1–$10/slide).
- Validated on unseen stage III-B ovarian papillary serous carcinoma against physical **10x Genomics Xenium Prime** ground truth, achieving **$r = 0.81$** mean Pearson correlation across tumor sub-populations and **$r = 0.78$** for cancer-associated fibroblasts (CAFs) and VEGFA+ tumor cells.

### 2. Unsupervised Spatial Niche Discovery
M-Optimus embeds multi-gene spatial co-expression into an unsupervised clustering framework:
- Decomposes whole slides into biologically coherent microenvironmental functional units (tumor core, hypoxic invasive margin, fibrotic stroma, tertiary lymphoid structures).
- Predicted niche cell compositions matched Xenium ground-truth cellular densities at **Pearson $r = 0.899$**.

### 3. Spatial Biomarker Discovery in Archival Cohorts
Transforms historical clinical trial archives into high-dimensional discovery search spaces:
- In a retrospective cohort of 288 ovarian cancer WSIs (TCIA), M-Optimus-1 identified that spatial colocalization between VEGFA+ tumor cells and CAFs was significantly enriched in patients refractory to bevacizumab anti-angiogenic therapy (**$p = 0.003$**).
- Hierarchical clustering of spatial interactions revealed distinct TME sub-phenotypes among non-responders, providing a rational basis for combination regimens (e.g., anti-VEGF + PARP inhibitors + CAF depletion).

---

## Bioptimus Foundation Model Ecosystem

Bioptimus maintains an integrated suite of open and proprietary AI platforms for life sciences:

1. **H-Optimus-0:** Open-weights histology foundation model (ViT-Giant, 1B parameters) trained on 500,000 whole-slide images; widely recognized as an open benchmark for tissue representation.
2. **H0-mini:** An 86M-parameter compact distillation of H-Optimus-0, engineered for low-latency cell segmentation and classification; powers the CellViT backbone of Owkin's [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](../Clippings/HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md).
3. **M-Optimus-1:** Multimodal world model translating H&E slides into 6,000-gene spatial transcriptomic landscapes.
4. **STELA Initiative:** Global multi-institutional data coalition launched to amass multimodal clinical cohorts across 100,000 patients to train next-generation biology world models.

---

## Related Notes & Vault References

- **Literature Clipping:** [From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer](../Clippings/From%20Model%20to%20Patient%20-%20M-Optimus-1%20for%20Spatial%20Biomarker%20Discovery%20in%20Ovarian%20Cancer.md)
- **Cellular & Spatial Models:**
  - [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](../Clippings/HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md)
  - [CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](../Clippings/CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md)
  - [CellQuant-Net](cellquant-net.md) / [CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](../Clippings/CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md)
  - [NuClick](nuclick.md)
- **Spatial Visualization Infrastructure:**
  - [Celldega](celldega.md) (Broad Institute high-performance WebGL spatial-omics visualization toolkit)
- **Catalogs & Syntheses:**
  - [Digital Pathology Software](digital-pathology-software.md)
  - [Articles on computational, digital, and mathematical pathology](articles-on-computational-digital-and-mathematical-pathology.md)
  - [Digital Pathology](digital-pathology.md)

<!-- tolaria:related:start -->

## See also

* [Articles on computational, digital, and mathematical pathology](articles-on-computational-digital-and-mathematical-pathology.md)
* [Celldega](celldega.md)
* [CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](../Clippings/CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md)
* [Digital Pathology](digital-pathology.md)
* [From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer](../Clippings/From%20Model%20to%20Patient%20-%20M-Optimus-1%20for%20Spatial%20Biomarker%20Discovery%20in%20Ovarian%20Cancer.md)
* [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](../Clippings/HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md)

<!-- tolaria:related:end -->
