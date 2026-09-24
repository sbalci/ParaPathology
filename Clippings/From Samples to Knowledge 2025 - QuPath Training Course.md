---
type: Clipping
status: Evergreen
language: en
title: "From Samples to Knowledge 2025: QuPath Training Course"
source: "https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp"
source_type: video
author:
  - "[[Zbigniew Mikulski]]"
  - "[[Sara McArdle]]"
published: 2025-02-24
created: 2026-09-13
description: "From Samples to Knowledge 2025 (FS2K) QuPath Training Course by Zbigniew Mikulski and Sara McArdle (La Jolla Institute for Immunology). A comprehensive hands-on workshop covering multiplex immunofluorescence (RareCyte Orion 18-plex), QuPath v0.6.0 workflows, deep learning segmentation (InstanSeg, StarDist, Cellpose, SAM), Groovy scripting automation, composite object phenotyping, multimodal image registration (Warpy), spatial interaction metrics, and Python clustering (QuBylab/Paquo)."
tags:
  - clippings
  - qupath
  - digital-pathology
  - multiplex-immunofluorescence
  - deep-learning
  - spatial-biology
  - image-analysis
order: 120
belongs_to: "[[Clippings]]"
related_to:
  - "[[Courses and MOOCs]]"
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
  - "[[GitHub Repositories]]"
---

# From Samples to Knowledge 2025: QuPath Training Course

- **Instructors:** 
  - **Zbigniew Mikulski, PhD** (Director, Advanced Light Microscopy and Histology Core, La Jolla Institute for Immunology)
  - **Sara McArdle, PhD** (Image Analysis Specialist, Advanced Light Microscopy and Histology Core, La Jolla Institute for Immunology)
- **Institution:** La Jolla Institute for Immunology (LJI), San Diego, CA
- **Format:** 2-Day Hands-On Workshop Recordings (February 24–25, 2025)
- **YouTube Playlist:** [From Samples to Knowledge 2025: QuPath Training Course](https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp)
- **Step-by-Step Training Book:** [saramcardle.github.io/FS2K](https://saramcardle.github.io/FS2K/README.html)
- **GitHub Repository:** [saramcardle/FS2K](https://github.com/saramcardle/FS2K)
- **Software Target:** QuPath v0.6.0 or later (leveraging Deep Java Library / DJL, Extension Manager, and modern scripting engines)
- **Data & Backup Projects:** [Google Drive Training Assets](https://drive.google.com/drive/u/0/folders/1t5DtJriZdPpNpuVJBMACkN3Ra16QUjKu) (Featuring 18-plex single-scan RareCyte Orion immunofluorescence data and matched H&E tonsil sections)

---

## Course Architecture & Core Philosophy

The *From Samples to Knowledge 2025* (FS2K) workshop is a comprehensive practical curriculum designed to guide biomedical researchers and pathologists from raw whole-slide multiplexed microscopy through rigorous, publication-grade spatial analysis.

### Foundational Principles
1. **Imaging is Not Flow Cytometry:** High-plex imaging is fundamentally continuous, spatial, and optical. Unlike single-cell suspension cytometry, multiplex tissue imaging must account for partial-volume effects, out-of-plane fluorescence, lateral membrane bleed-through across tight tissue architectures, and physical pixel dimensions (325 nm pixel size vs. 10 nm cell membranes).
2. **Honesty as a Research Strategy:** Active confrontation of autofluorescence, background binding, and non-specific antibody uptake rather than superficial post-hoc cosmetic clipping.
3. **Data Integrity & Project Hygiene:** Separating temporary RAM objects from on-disk `.qp-proj` and `classifiers/` state. Ensuring strict versioning and directory decoupling to allow team collaboration across workstations.
4. **The Automation Imperative:** De-cluttering manual GUI workflows from the `Workflow` tab into modular, commented Groovy scripts executed via *Run for Project* for reproducible science.
5. **Avoiding Statistical Traps:** Treating individual cells as technical measurements rather than biological replicates ($N=10,000$ cells from one mouse slide is still $N=1$). Utilizing SuperPlots and nested hierarchical modeling.

---

## Complete Curriculum & Technical Modules

### Module 1: Introduction to Multiplexed Bioimage Analysis
- **Video:** [Introduction](https://youtu.be/wvi54EbP-7U) (28 min)
- **Topics:**
  - The RareCyte Orion platform: 18-channel single-scan whole-slide imaging.
  - Bioimage fundamentals: Images as multidimensional arrays of numbers.
  - Spatial constraints: 325 nm optical resolution vs. sub-cellular macromolecular structures.
  - Lookup Tables (LUTs): Mapping high-dynamic-range 16-bit sensor data onto standard 8-bit monitor color spaces using histogram windowing.
  - Addressing spectral bleed-through, tissue autofluorescence, and non-specific antibody binding.

### Module 2: Visualizing and Managing Multiplex Immunofluorescence Data
- **Video:** [Visualizing and Managing Multiplex Immunofluorescence Data in QuPath](https://youtu.be/GwZbvKRugb4) (28 min)
- **Documentation:** [Session 01 - Visualization](https://saramcardle.github.io/FS2K/Session%2001-%20Visualization.html)
- **Topics:**
  - Setting up QuPath projects for high-plex pyramidal OME-TIFF images.
  - Brightness & Contrast (`Shift + C`) optimization: Finding the biological signal threshold in grayscale mode before assigning false-color channels.
  - Visual integrity: Why *Rendered RGB* is for slides/presentations, while *Original Pixels* / OME-TIFF preserves scientific validity for analysis.
  - Channel management: Reordering, renaming, and hiding unstained or noisy channels (e.g. PD-L1, LAG-3).
  - Automation: Groovy script execution to automatically stamp channel names and color legends onto exported figures.

### Module 3: Tissue Detection and Manual Annotations
- **Video:** [Tissue Detection and Manual Annotations](https://youtu.be/13mypuXmJ6M) (17 min)
- **Documentation:** Session 02 - Tissue Detection
- **Topics:**
  - Automated Region of Interest (ROI) generation: Threshold-based Pixel Classifier on nuclear channels (Hoechst) to outline total tissue area.
  - Geometric refinement: Mastering Brush (`B`), Magic Wand (`W`), and Polygon tools.
  - Boolean annotation math: Holding `Alt` while drawing to erode edges, carve out background voids, or exclude necrotic/folded zones.
  - Object hierarchy: Naming objects, managing parent-child relationships, and calculating tumor burden area fractions ($\frac{\text{Tumor Area}}{\text{Total Tissue Area}}$).

### Module 4: Advanced Pixel Classification and Segmentation
- **Video:** [Advanced Pixel Classification and Segmentation in QuPath](https://youtu.be/9DL2YAjZdsA) (36 min)
- **Documentation:** [Session 03 - Pixel Classifier](https://saramcardle.github.io/FS2K/Session%2003-%20Pixel%20Classifier.html)
- **Topics:**
  - Moving from manual heuristics to machine learning pixel segmentation.
  - Feature extraction kernels: Combining Gaussian blur, Laplacian of Gaussian (blob detection), and Gradient magnitude (edge detection) across spatial scales.
  - Live prediction & interactive training: Using sparse polylines and brushes to label positive/negative tissue domains.
  - Class balancing: Monitoring training pie charts to prevent classifier bias.
  - Multi-image training: Extrapolating classifiers across diverse slides to prevent batch overfitting.
  - Converting segmented pixel masks into discrete annotation objects with morphological noise filters (min object size, hole filling).

### Module 5: Mastering Cell Detection: Standard Methods to Deep Learning
- **Video:** [Mastering Cell Detection in QuPath: From Standard Methods to Deep Learning](https://youtu.be/hK8jAdDlu24) (70 min)
- **Documentation:** [Session 04 - Cell Detection](https://saramcardle.github.io/FS2K/Session%2004-%20Cell%20Detection.html)
- **Topics:**
  - Deconstruction of QuPath internal project storage: `.qpproj` JSON structure, image URIs, and directory path re-linking.
  - Conventional cell detection: Classical optical watershed parameters (Sigma, threshold, min/max nuclear area, cell expansion radius).
  - Deep Learning in QuPath 0.6+: Integration with Deep Java Library (DJL) and PyTorch engines.
  - **InstanSeg:** State-of-the-art multi-channel boundary instance segmentation running natively without Python overhead.
  - Model benchmarking: Practical trade-offs between StarDist (star-convex nuclear models), Cellpose (gradient-flow generalised cell bodies), and Segment Anything Model (SAM) for atypical morphologies.

### Module 6: Automating Workflows with Scripting
- **Video:** [Automating Workflows with Scripting](https://youtu.be/F0NdZdSc51w) (33 min)
- **Documentation:** [Session 05 - Workflows to Scripts](https://saramcardle.github.io/FS2K/Session%2005%20-%20Workflows%20to%20Scripts.html)
- **Topics:**
  - The QuPath Workflow Tab: Translating user actions into an immutable command history.
  - Cleaning and structuring Groovy scripts: Removing interactive GUI redundancies, setting image types programmatically, and parameterizing paths.
  - Scripting AI detection (InstanSeg / StarDist) within target parent annotations.
  - Batch automation: Running Groovy pipelines over whole cohorts using *Run for Project*.
  - Memory management: Understanding JVM heap allocation, tile caching, and garbage collection during batch execution.

### Module 7: Object Classification and Validation Strategies
- **Video:** [Object Classification and Validation Strategies](https://youtu.be/3sDaFQhizgA) (80 min)
- **Documentation:** [Session 06 - Classifying Cells pt1](https://saramcardle.github.io/FS2K/Session%2006%20-%20Classifying%20Cells%20pt1.html)
- **Topics:**
  - Adding multi-channel intensity measurements (mean, min, max, standard deviation) across nucleus, cytoplasm, and full cell compartments.
  - Single Measurement Classifier: Thresholding single channels to discard anuclear segmentation debris.
  - Machine learning object classifiers (Random Forests / RTrees): Training on cell detections using the Points and Brush tools.
  - Statistical validation: Building confusion matrices, evaluating sensitivity and specificity, and the crucial rule: **Never report raw training accuracy as model performance**.

### Module 8: Optimizing Complex Phenotyping and Large Datasets
- **Video:** [Optimizing Complex Phenotyping and Large Datasets](https://youtu.be/Qlg6Ru1epo8) (60 min)
- **Documentation:** [Session 07 - More Difficult Classifiers](https://saramcardle.github.io/FS2K/Session%2007%20-%20More%20Difficult%20Classifiers.html)
- **Topics:**
  - Large dataset optimization: Removing irrelevant non-target detections (e.g., non-immune cells) to reduce multi-gigabyte project overhead.
  - Texture feature engineering: Calculating Haralick texture features (angular second moment, contrast, correlation, entropy) to capture chromatin distribution and membrane textures.
  - Variable Importance Logging: Inspecting the QuPath log to prune uninformative channels and prevent over-parameterization.
  - Hierarchical gating strategies: Isolating leukocytes ($CD45^+$) first, followed by sub-lineage classification ($CD4^+$ helper T-cells vs. $CD8^+$ cytotoxic T-cells vs. $FOXP3^+$ Tregs).

### Module 9: Combining Classifiers into Multiplex Phenotypes
- **Video:** [Combining Classifiers](https://youtu.be/tlkUmWYhIDQ) (36 min)
- **Documentation:** [Session 08 - Creating Multiplex Classifiers](https://saramcardle.github.io/FS2K/Session%2008%20-%20Creating%20Multiplex%20Classifiers.html)
- **Topics:**
  - Building Composite Classifiers: Stacking independent binary classifiers into combinatorial phenotypes (e.g., $CD45^+ : CD8^+ : PD\text{-}1^+$).
  - Managing exclusive vs. overlapping population counts.
  - Validating rare subsets: Identifying rare double-positive cells (such as $CD8^+ / FOXP3^+$) using the Channel Viewer and custom Class Visibility scripts.
  - Assembling complete automated phenotyping pipelines into 3-line Groovy scripts for project-wide execution.

### Module 10: From Pixels to Publications—Exporting and Refining Data
- **Video:** [From Pixels to Publications—Exporting and Refining Data](https://youtu.be/m6hiDRN_axg) (28 min)
- **Documentation:** [Session 09 - Data Export and Simplification](https://saramcardle.github.io/FS2K/Session%2009%20-%20Data%20Export%20and%20Simplification.html)
- **Topics:**
  - Selective measurement export: Exporting annotation summaries vs. single-cell detection TSV/CSV tables.
  - Calculating spatial density metrics: Normalizing cell counts to tissue surface area ($\text{cells}/\text{mm}^2$).
  - Avoiding the pseudo-replication trap: Explaining why $t$-tests on thousands of pooled single cells produce false-positive $p$-values.
  - Data presentation: Designing SuperPlots and nested hierarchical plots to communicate biological variance alongside technical variance.
  - Character encoding fixes: Preserving UTF-8 formatting (micrometer symbols $\mu\text{m}$, degree signs) in Microsoft Excel and statistical packages.

### Module 11: Combining Images and Multimodal Image Registration
- **Video:** [Combining Images and Image Registration](https://youtu.be/-yubai39HxY) (55 min)
- **Documentation:** [Session 10 - Combining Images](https://saramcardle.github.io/FS2K/Session%2010-%20Combining%20Images.html)
- **Topics:**
  - Multimodal slide alignment: Registering 18-plex fluorescence images with brightfield H&E on the same or adjacent tissue sections.
  - **Warpy Extension:** Installing and configuring `qupath-extension-warpy` via the QuPath Extension Manager.
  - The "Pseudo-H&E" transformation: Inverting fluorescence channels into synthetic brightfield H&E color vectors to drive cross-modal feature matching.
  - Affine transformation matrices: Coarse translation and rotation followed by fine iterative feature alignment down to 1-pixel tolerance.
  - Transforming and warping vector objects: Transferring cell boundaries and annotations seamlessly across modalities.

### Module 12: Spatial Analysis and Quantifying Cell-to-Cell Interactions
- **Video:** [Spatial Analysis and Quantifying Cell-to-Cell Interactions](https://youtu.be/f85VM0IsfVo) (74 min)
- **Documentation:** [Session 12 - Spatial Analysis](https://saramcardle.github.io/FS2K/Session%2012-%20Spatial%20Analysis.html)
- **Topics:**
  - Moving beyond abundance to spatial architecture.
  - Smoothed Features: Incorporating neighborhood context into cell objects (distance-weighted averaging of neighboring phenotypes).
  - Proximity metrics: Running Signed Distance Transforms to measure the exact Euclidean distance ($\mu\text{m}$) from individual immune cells to tumor margins or blood vessels.
  - Hotspot mapping: Building spatial Density Maps with adjustable Gaussian smoothing radii.
  - Spatial statistics: Calculating cellular Enrichment Ratios to evaluate whether cell-cell proximity deviates from random spatial distribution.

### Module 13: Exporting Data for Clustering, Python, and Spatial Modeling
- **Video:** [Exporting Data for Clustering, Python, and Spatial Modeling](https://youtu.be/nFvCtwlHj84) (42 min)
- **Documentation:** [Clustering using Python](https://saramcardle.github.io/FS2K/Clustering%20using%20Python.html)
- **Topics:**
  - Bridging QuPath with the broader Python scientific stack (Scanpy, Squidpy, AnnData).
  - Exporting unique Object IDs and centroid coordinates to maintain bi-directional mapping.
  - **QuBylab & Paquo:** Connecting Jupyter notebooks directly to live QuPath sessions via local gateway socket ports.
  - Data preprocessing: Handling missing values, log-transforming intensities, and z-score normalization.
  - Unsupervised discovery: Dimensionality reduction via UMAP and Leiden/Louvain clustering to discover unannotated cell subsets.
  - Re-importing Python cluster assignments back into QuPath as new classification layers.

### Module 14: Workshop Logistics & Advanced User Forum
- **Video:** [Invitation to 2025 QuPath Training Course](https://youtu.be/JBT8PlvRqzA) (1 min)
- Overview of the annual training initiative and advanced user symposia hosted by the LJI Microscopy Core.

---

## Methodological Summary for Digital Pathology Workflows

| Stage | QuPath Tool / Technique | Purpose / Impact |
| :--- | :--- | :--- |
| **I/O & Setup** | OME-TIFF / Project Directory | Native multi-channel pyramidal rendering; preserves 16-bit physical pixel depth |
| **Tissue ROI** | Pixel Classifier (Threshold) | Rapid whole-slide tissue segmentation, background exclusion, tumor burden quantification |
| **Segmentation** | InstanSeg / DJL / Watershed | State-of-the-art multi-channel boundary instance segmentation inside the JVM |
| **Automation** | Groovy Scripting / `Run for Project` | Headless, batch execution across multi-terabyte slide cohorts with audit histories |
| **Phenotyping** | Random Forest / Composite Classifiers | Hierarchical multi-marker gating ($CD45 \to CD8/CD4 \to \text{PD-1}$) with Haralick texture features |
| **Registration** | Warpy (`qupath-extension-warpy`) | Multi-modal alignment bridging multiplex IF and diagnostic H&E via pseudo-H&E transforms |
| **Spatial Ecology** | Smoothed Features & Distance Transforms | Microenvironmental cell-to-cell proximity, tumor infiltration margins, and density maps |
| **External Interop** | Paquo / QuBylab / GeoJSON / TSV | Seamless integration into Python single-cell and spatial transcriptomics pipelines |

<!-- tolaria:related:start -->

## See also

* [Courses and MOOCs](../appendix/courses-and-moocs.md)
* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [Digital Pathology Software](../computational-digital-and-mathematical-pathology/digital-pathology-software.md)
* [GitHub Repositories](../appendix/github-repositories.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)

<!-- tolaria:related:end -->
