---
type: Clipping
status: Evergreen
language: en
title: "Class visualizations and activation atlases for computational pathology"
source: "https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(26)00471-4"
doi: "10.1016/j.xcrm.2026.103054"
pii: "S2666-3791(26)00471-4"
pmid: "42759505"
arxiv: "2603.07170"
local_pdf: "file:///K:/DownloadsK/mmc2.pdf"
journal: "Cell Reports Medicine"
volume: 7
article_number: "103054"
license: "CC BY 4.0"
repository: "https://github.com/KatherLab/PathoActivationAtlas"
source_type: article
author:
  - "[[Marco Gustav]]"
  - "[[Fabian Wolf]]"
  - "[[Christina Glasner]]"
  - "[[Nic G. Reitsam]]"
  - "[[Stefan Schulz]]"
  - "[[Kira Aschenbroich]]"
  - "[[Bruno Märkl]]"
  - "[[Sebastian Foersch]]"
  - "[[Jakob Nikolas Kather]]"
published: 2026-09-18
created: 2026-09-21
description: "The clinical promise of computational pathology increasingly depends on foundation model-based pipelines, yet the morphological concepts encoded by these systems remain poorly understood. We address this gap with a concept-level visualization framework using class visualizations (CVs) and activation atlases (AAs) in a pathology foundation-model setting across colorectal tissue and multi-organ cancer tasks. Four pathologists annotate hematoxylin and eosin-stained image patches as well as generated visualizations, complemented by attribution- and similarity-based metrics. CVs retain class-associated morphology for distinct tissue classes, with reduced separability and higher annotator variability in morphologically overlapping cancer classes. AAs expose layer-dependent organization of encoded concepts, with coherent regions for coarse tissue and cancer groupings and increasing dispersion and overlap at finer label granularities."
tags:
  - "clippings"
order: 149
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Machine Learning]]"
  - "[[Image Analysis]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[A distributional robustness margin for pathology foundation models]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
---

# Class visualizations and activation atlases for computational pathology

## Summary

Modern pathology foundation models can classify tissue and cancer with high accuracy while leaving a more difficult question unanswered: **what morphological concepts are actually organized inside their representations?** Gustav et al. address this at the concept level rather than explaining one prediction at a time. They adapt two feature-visualization methods to a frozen UNI vision-transformer backbone with task-specific linear heads:

- **Class visualizations (CVs)** synthesize an image that maximizes a chosen class logit. They expose patterns the classifier treats as prototypical for a tissue or cancer class.
- **Activation atlases (AAs)** project internal activations into a two-dimensional map and reconstruct a representative image for each region. They expose the continuity, separation, and overlap of concepts across the representation space and across transformer depth.

Four pathologists independently annotated real H&E patches, CVs, and atlas cells while blinded to the target labels. The central result is deliberately nuanced: feature visualization can make a pathology foundation model inspectable, but **visual separability follows morphological separability**. Coarse, distinctive categories such as adipose tissue, lymphocytes, and colorectal tumor epithelium produced recognizable concepts. Closely overlapping cancer subclasses became dispersed and ambiguous, mirroring disagreement among pathologists on the real images. The visualizations therefore reveal where the model's taxonomy aligns with morphology and where the requested labels exceed what morphology reliably supports.

The published article appeared online in *Cell Reports Medicine* on 18 September 2026 and is assigned to volume 7, article 103054 (issue date 20 October 2026): [DOI](https://doi.org/10.1016/j.xcrm.2026.103054), [Cell full text](https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(26)00471-4), [PubMed 42759505](https://pubmed.ncbi.nlm.nih.gov/42759505/), and [arXiv:2603.07170](https://arxiv.org/abs/2603.07170). The supplied [local PDF](file:///K:/DownloadsK/mmc2.pdf) contains both the corrected proof (pages 1–22) and supplemental figures and tables (pages 23–60). The article is open access under CC BY 4.0.

## What the framework adds to pathology XAI

| Approach | Unit explained | Output | Main use | Main limitation |
|---|---|---|---|---|
| Saliency / attribution map | One input and one prediction | Pixel- or region-level relevance | Locate evidence for an individual decision | Does not describe a class-wide concept or its relation to other concepts |
| Class visualization | One learned output class | Synthetic logit-maximizing image | Reveal class-associated prototype features | May contain optimization artifacts; is not a diagnostic image |
| Activation atlas | Many internal activations | A navigable map of reconstructed feature-space regions | Inspect continuity, clustering, overlap, and layer-wise organization | Two-dimensional topology depends on embedding choices and does not preserve global distance |

The distinction matters clinically. A heatmap may show *where* a model looked in a particular slide. CVs and AAs instead ask *what kinds of morphology the model has learned*, whether those concepts remain stable across expert review, and whether the chosen class taxonomy has a plausible morphological basis.

## Study design

### Datasets and classification tasks

The framework was evaluated at increasing levels of label granularity:

1. **NCT colorectal tissue classification:** 100,000 non-overlapping, Macenko-normalized patches from 86 colorectal cancer slides, each 224 × 224 pixels at 0.5 µm/pixel. The nine classes were adipose, background, debris, lymphocytes, mucus, smooth muscle, normal colon mucosa, cancer-associated stroma, and colorectal adenocarcinoma epithelium. CRC-VAL-HE-7K was reserved as the external test set.
2. **TCGA multi-organ cancer classification:** 1,608,060 patches sampled from annotated tumor regions across 32 TCGA cancer types; eleven morphologically diverse entities were selected. The experiments used nested TCGA-5, TCGA-8, and TCGA-11 tasks and repeated analyses after collapsing organ-specific adenocarcinomas into a broader adenocarcinoma class.
3. **Exploratory tumor-versus-normal comparison:** Matched malignant and normal-adjacent regions from colon, breast, lung, prostate, and liver carcinomas were used to explore whether the representation captured organ context and malignancy-associated morphology.

The backbone was the 24-layer **UNI** pathology foundation model with frozen weights and a trainable linear classification head. This isolates the pretrained representation while reflecting the common frozen-encoder workflow. Linear-probe performance was strong enough to support the visualization experiments: AUROC was 1.00 for NCT and 0.99 for every TCGA task; F1/accuracy were 0.92/0.92 for NCT, 0.83/0.82 for TCGA-5, 0.85/0.85 for TCGA-8, and 0.84/0.86 for TCGA-11.

### Class visualization pipeline

For each target class, a randomly initialized image was parameterized in Fourier space and optimized by backpropagation to maximize the raw pre-softmax class logit. Model weights remained fixed. Optimization ran for 8,192 iterations, the point at which convergence was consistently observed. Fourier parameterization suppresses high-frequency noise, but the authors caution that the resulting RGB colors are not literal H&E staining: interpretation should focus on texture, cell density, and spatial organization.

### Activation atlas pipeline

The atlas construction converts many internal activations into a browsable morphological map:

1. Extract internal UNI activations from all training patches.
2. Embed the high-dimensional vectors into two dimensions with t-SNE.
3. Divide the map into a 10 × 10 grid for NCT or a 20 × 20 grid for TCGA.
4. Average the original high-dimensional activations within each occupied cell.
5. Reconstruct a synthetic image for that aggregate vector by minimizing L2 feature distance for 8,192 optimization steps.
6. Overlay pathologist labels, source-patch class composition, class attributions, and similarity metrics in the interactive viewer.

Early transformer layers mostly encoded low-level patterns; intermediate layers formed coherent class-associated regions; deeper layers added detail but became increasingly specialized and fragmented. Layer 14 of 24 was therefore selected as the main compromise between separability and over-specialization.

### Expert-centered evaluation

Four pathologists, including one board-certified pathologist, independently reviewed randomized real H&E patches, CVs, and atlas cells. They were blinded to reference and metric-derived labels and could select an explicit uncertain category. Agreement was assessed with pairwise Cohen's κ, multi-rater Fleiss' κ, and Krippendorff's α. Accuracy, F1, sensitivity, and specificity against the target label were treated as descriptive measures of recognizable class information—not as proof that a synthetic image is diagnostically correct.

The authors also tested automated surrogates for expert interpretation:

- class-attribution scores from gradients with respect to internal activations;
- DreamSim perceptual distance;
- LPIPS using AlexNet, UNI, H-Optimus-0, and Prov-GigaPath feature spaces;
- Mahalanobis distance with Ledoit-Wolf covariance shrinkage.

## Main findings

### 1. CVs preserve distinctive tissue morphology, but incompletely

NCT CVs reproduced recognizable properties of several classes: empty vacuolated spaces for adipose tissue, dense small hyperchromatic nuclei for lymphocytes, and crowded pleomorphic glands for colorectal tumor epithelium. Smooth muscle and cancer-associated stroma were harder to distinguish because both can present eosinophilic spindle-cell morphology.

This loss of interpretability was measurable. With uncertain responses retained, NCT annotation accuracy fell from **0.803 for real scans to 0.540 for CVs**, macro-F1 from **0.783 to 0.467**, and Fleiss' κ from **0.755 to 0.313**. These synthetic images retained class information, but substantially less than the source morphology.

### 2. Fine-grained cancer origin is much harder to visualize

TCGA CVs retained some broad patterns—gland formation across adenocarcinomas, clear-cell nesting in kidney clear-cell carcinoma, spindle fascicles in sarcoma, and diffuse lymphoid morphology in DLBCL. Organ-of-origin subclasses with shared adenocarcinoma morphology were frequently confused. At the eleven-class level, scan accuracy was **0.437** versus **0.073** for CVs, and Fleiss' κ was **0.353** versus **0.052**. Collapsing adenocarcinoma subclasses improved agreement on real scans but did little to rescue CV agreement (Fleiss' κ **0.509** versus **0.067**).

Across the three tasks, two uncertainty conventions, and seven performance/agreement measures, **all 42 scan-versus-CV comparisons favored real images**. Every bootstrap interval excluded zero and every Holm-adjusted permutation test met **p < 0.005**. The paper consequently treats CVs as model-auditing artifacts, not surrogate histology or diagnostic evidence.

### 3. AAs reveal a hierarchy from coherent concepts to overlap

The NCT atlas formed coherent regions for broad tissue categories and achieved moderate expert agreement (Fleiss' κ **0.58**, Krippendorff's α **0.56**). In TCGA atlases, broad cancer groupings were more coherent than organ-specific subclasses. Across reported tasks, agreement reached **κ = 0.82** for a coarse cancer grouping but fell as low as **κ = 0.11** at subclass level.

Crucially, atlas overlap tracked expert ambiguity in the real patches. That supports the interpretation that some representation overlap is not merely model failure: it reflects genuinely shared morphology, heterogeneous tumors, and taxonomies that demand distinctions not consistently visible in a small H&E field. The exploratory normal-versus-tumor atlases reinforced this point—colon cancer showed clearer separation than hepatocellular carcinoma, whose tumor and background morphology can be subtler.

### 4. Attribution is the strongest surrogate only in easier settings

Attribution-derived labels generally fell within the inter-pathologist agreement range when classes had limited morphological overlap and avoided collapsing everything into one dominant class. DreamSim and nearest-neighbor LPIPS sometimes performed well, but their ranking changed with dataset and feature extractor. Mahalanobis distance performed poorly, frequently producing near-zero agreement and class collapse, consistent with violated Gaussian assumptions in heterogeneous high-dimensional pathology features.

No automated metric replaced expert review. Natural-image perceptual metrics are not calibrated to subtle H&E morphology, and their apparent agreement weakened as pathological ambiguity increased.

## Interpretation for model validation

The framework is most useful as a **pre-deployment audit layer**:

- **Shortcut detection:** generated concepts can reveal staining, background, scanner, or dataset artifacts that dominate a class.
- **Taxonomy review:** overlapping atlas regions can expose labels that are too fine-grained, heterogeneous, or inconsistently annotated for morphology-only prediction.
- **Dataset curation:** sparse, fragmented, or mixed regions can motivate targeted sampling and expert relabeling.
- **Architecture comparison:** the modular pipeline can compare how different foundation models, layers, and fine-tuning strategies organize the same task.
- **Human-AI calibration:** disagreement maps show where a confident classifier may still rest on morphology that experts cannot consistently name.

The method does **not** establish causal mechanisms, certify clinical correctness, or explain an individual patient-level prediction. It is a model-centric map of learned concepts whose biological plausibility still requires expert and external validation.

## Limitations and safeguards

1. **One backbone and training regime:** all core experiments use frozen UNI plus a linear head. End-to-end fine-tuning, CNNs, or other pathology foundation models may organize concepts differently.
2. **One checkpoint for visualization:** performance used cross-validation, but computational cost limited CV/AA generation to the first fold's lowest-validation-loss checkpoint.
3. **Projection dependence:** t-SNE emphasizes local neighborhoods, is sensitive to initialization and hyperparameters, and does not preserve global distances. Apparent atlas separation must not be treated as a quantitative distance in the original feature space.
4. **Optimization dependence:** CVs and feature inversions reflect the model, selected layer, initialization, and optimization procedure. Synthetic colors and textures can include artifacts.
5. **Patch-level scope:** the study does not capture WSI-scale architecture, patient-level variables, stage, sex, or gender effects.
6. **Limited expert sample:** four pathologists provide a meaningful expert-centered evaluation, but not a population-wide estimate of diagnostic agreement.
7. **No pathology-specific perceptual metric:** LPIPS and DreamSim were developed for natural images; pathology-specific similarity models grounded in expert judgments remain a major need.

## Open-source implementation

The authors released the reproducible framework at [KatherLab/PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas) under the MIT license, with Captum-derived components under BSD-3-Clause. It includes model training, activation extraction, CV and AA creation, a pathologist annotation interface, and an interactive viewer.

```bash
conda env create -f conda_env.yml
conda activate activation-atlas

# Extract activations and create an activation atlas
python create.py --config config/uni_nct.yaml --vis_type atlas

# Generate class visualizations
python create.py --config config/uni_nct.yaml --vis_type class_vis

# Explore layers, labels, attributions, source data, and metrics
python view.py
```

The viewer permits layer/class selection, zooming and panning, overlays for ground truth and attribution data, and cell-level metric inspection. The repository currently describes model training as work in progress, so reproducibility should be assessed against the specific commit and configuration used.

## Citation

```bibtex
@article{gustav2026class,
  title   = {Class visualizations and activation atlases for computational pathology},
  author  = {Gustav, Marco and Wolf, Fabian and Glasner, Christina and Reitsam, Nic G. and Schulz, Stefan and Aschenbroich, Kira and M\"arkl, Bruno and Foersch, Sebastian and Kather, Jakob Nikolas},
  journal = {Cell Reports Medicine},
  volume  = {7},
  pages   = {103054},
  year    = {2026},
  doi     = {10.1016/j.xcrm.2026.103054}
}
```
