---
type: Clipping
status: Evergreen
language: en
title: "SlidePrep: artifact removal, reconstruction, and visualization of whole-slide images from tiled microscopy acquisitions"
aliases:
  - "SlidePrep: artifact removal, reconstruction, and visualization of whole-slide images from tiled microscopy acquisitions"
  - "Rodriguez-Conde 2026"
source: "https://doi.org/10.1016/j.softx.2026.103161"
url: "https://www.sciencedirect.com/science/article/pii/S2352711026006515"
doi: "10.1016/j.softx.2026.103161"
source_type: article
author:
  - "[[Ivan Rodriguez-Conde]]"
  - "[[Celso Campos]]"
  - "[[Florentino Fdez-Riverola]]"
published: 2026-10-21
created: 2026-10-24
description: "Digitizing a biological sample held in a counting chamber requires stitching overlapping microscope tiles into a whole-slide image. The chamber's etched reference grid (reticle) is a high-contrast periodic structure at the focal plane that remains superimposed on the specimen in the assembled mosaic. Existing stitching tools leave the artifact in place. This paper presents SlidePrep, an open-source pipeline that removes the reticle prior to stitching. It detects grid lines, synthesizes the occluded content via inpainting, and assembles the corrected tiles into a physically calibrated whole-slide image. SlidePrep runs as a command-line tool for batch processing and as a containerized web application that serves the calibrated OME-TIFF alongside interactive OpenSeadragon visualization. A central configuration file governs chamber geometry and detection parameters, so a new acquisition requires editing values, not code. Layout derives from acquisition order and declared overlap, removing dependence on vendor metadata files. This article details the software architecture, functionalities, and its application to a mussel larvae dataset."
tags:
  - "clippings"
  - "whole-slide-imaging"
  - "image-stitching"
  - "artifact-removal"
  - "inpainting"
  - "microscopy"
  - "counting-chamber"
  - "ome-tiff"
  - "ashlar"
order: 270
belongs_to: "[[Clippings]]"
related_to:
  - "[[SlidePrep]]"
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
  - "[[Microscopy]]"
  - "[[OpenFlexure Microscope]]"
  - "[[HistoCAM]]"
  - "[[Standardization in digital pathology: Supplement 145 of the DICOM standards]]"
  - "[[From Samples to Knowledge 2025: QuPath Training Course]]"
---

# SlidePrep: artifact removal, reconstruction, and visualization of whole-slide images from tiled microscopy acquisitions

**Ivan Rodriguez-Conde, Celso Campos, and Florentino Fdez-Riverola**  
*Department of Computer Science, ESEI (Escuela Superior de Ingeniería Informática), Universidade de Vigo, Ourense, Spain; SING Research Group, Galicia Sur Health Research Institute (IIS Galicia Sur), SERGAS-UVIGO, Spain.*  
Published in *SoftwareX* 36 (2026) 103161 (Available online 21 October 2026).  
- **DOI:** [10.1016/j.softx.2026.103161](https://doi.org/10.1016/j.softx.2026.103161) | **ScienceDirect:** [S2352-7110(26)00651-5](https://www.sciencedirect.com/science/article/pii/S2352711026006515)
- **GitHub Repository:** [INOU-2025/SlidePrep](https://github.com/INOU-2025/SlidePrep) (Release [v1.0.4](https://github.com/INOU-2025/SlidePrep/releases/tag/v1.0.4))
- **Dedicated Vault Tool Note:** [[SlidePrep]]
- **Open Access License:** CC BY 4.0 (Software licensed under MIT License)

---

## Executive Summary & Motivation

Chamber-based microscopic enumeration and morphometry of suspended biological specimens—such as cells in hemocytometers (**Neubauer**, **Malassez**, **Bürker**, **KOVA Glasstic**) or microorganisms and bivalve larvae in **Sedgwick-Rafter** counting chambers—is a staple technique across cytology, hematology, microbiology, and environmental laboratories. Digitizing an entire counting chamber requires acquiring and stitching hundreds of overlapping microscope tiles into a whole-slide image (WSI).

However, because the chamber's physical reference grid (reticle) is etched directly at the focal plane, high-contrast periodic grid lines are recorded across nearly every tile, obstructing both visual inspection and automated downstream cell segmentation or morphometry. Existing image processing techniques fail to solve this problem:
- **Photometric Shading Correction (`BaSiC`, `VISTAmap`):** Corrects uneven illumination and optical vignetting, which is fundamentally distinct from physical structural occlusion by an etched grid.
- **Fourier-Domain Notch Filtering:** Assumes additive periodic noise, whereas an etched reticle blocks or attenuates transmitted light; suppressing its frequency peaks flattens the dark band without reconstructing the occluded biological morphology underneath.
- **Consumer Image De-fencing:** Lacks integration with multi-channel microscopy registration, physical micrometer calibration, and OME-TIFF pyramidal pipelines.

**SlidePrep** resolves this operational bottleneck by isolating and reconstructing the reticle in each brightfield tile *prior* to phase-correlation stitching, exporting a physically calibrated **OME-TIFF** alongside a full-mosaic **binary inpainting provenance mask** (`_inpaint_mask.tif`) and an interactive **OpenSeadragon** web viewer.

### Table 1: Capability Comparison with Prior Counting-Chamber Grid Tools

| Feature / Capability | Štěpka (2013) [8] | Denimal et al. (2015) [9] | Piccinini et al. (2014) [10] | **SlidePrep (2026)** |
| :--- | :--- | :--- | :--- | :--- |
| **Chamber Evaluated** | Bürker | Malassez | KOVA Glasstic | **Sedgwick-Rafter** (retargetable) |
| **Grid Detection** | Yes | Yes | No | **Yes** (Cascade template + RF classifier) |
| **Grid Removal** | No | Yes (frequency-domain subtraction) | No | **Yes (LaMa Fourier inpainting)** |
| **Inpainting Mask Export** | n/a | No | n/a | **Yes (`<mosaic>_inpaint_mask.tif`)** |
| **Whole-Slide Image Stitching** | No | No | Yes (MicroMos) | **Yes (ASHLAR phase correlation)** |
| **Cell Counting** | Yes | No | Yes (manual) | No (exports calibrated OME-TIFF for QuPath/Fiji) |
| **Software Availability** | Yes (demo app) | No | Yes (source + exe) | **Yes (MIT source + Docker web stack)** |

---

## Software Architecture & Pipeline Design

SlidePrep is authored in **Python 3.12** with a **TypeScript / Angular 21** web frontend, integrating four core scientific libraries:
1. **OpenCV (`4.11.0.86`):** Multi-level thresholding, directional bar template matching, and rotated minimum-area rectangle contour analysis.
2. **scikit-learn (`1.6.1`):** Random Forest classification to filter border line fragments from clipped biological structures.
3. **LaMa (`simple-lama-inpainting 0.1.2` / PyTorch `2.7.1`):** Resolution-robust large mask inpainting using fast Fourier convolutions to synthesize occluded image structure.
4. **ASHLAR (`1.19.0` + Bio-Formats):** Phase-correlation tile registration and calibrated OME-TIFF mosaic assembly, paired with **libvips** for out-of-core Deep Zoom Image (DZI) pyramid generation.

### 1. Input Formats, Naming Convention, and Asymmetric Multi-Channel Processing
- **Vendor-Agnostic Layout Initialization:** Accepts folders of tiles in five standard formats (`PNG`, `JPEG`, `TIFF`, `BMP`, `WebP`). Rather than requiring proprietary microscope stage position logs, SlidePrep derives nominal tile positions directly from the filename convention (e.g., `TileScan_001_s{series:3}_ch{channel:2}.tif`), declared grid dimensions (`width` $\times$ `height`), scan order, and nominal overlap (e.g., `10%`).
- **Asymmetric Multi-Channel Integrity:** In multi-channel acquisitions combining brightfield and epifluorescence, the reticle spans the entire field in transmitted light but only darkens emitting structures in fluorescence. SlidePrep applies reticle detection and LaMa inpainting **strictly to the configured brightfield channel (`_ch00`)**, passing epifluorescence channels through completely unprocessed so **zero synthetic fluorescence intensity is ever fabricated**.
- **Cross-Channel Registration & Provenance Masking:** Because epifluorescence backgrounds contain no signal for phase correlation, ASHLAR registers tiles on the reconstructed brightfield channel and applies the resulting coordinates to all channels. Simultaneously, SlidePrep composes a mosaic-wide binary mask (`<mosaic_base>_inpaint_mask.tif`, `uint8` `255` = reconstructed, `0` = observed) so downstream tools can exclude inpainted pixels from quantitative intensity or morphometric measurements.

### 2. The Six Per-Tile Processing Steps
Because per-tile preprocessing operates on one tile in isolation before stitching, **VRAM consumption scales strictly with single-tile dimensions**, allowing arbitrarily large gigapixel mosaics to run on modest 8 GB consumer GPUs:

1. **Binarization (`Combined Differential`):** A brightfield chamber tile exhibits three intensity populations: bright background medium, intermediate-intensity specimens/debris, and the dark etched reticle. A **3-class multi-level Otsu threshold** isolates the darkest class, after which compact connected components (cells, debris, pigment spots) are subtracted by shape filtering, leaving elongated grid-line candidates.
2. **Grid Detection:** A two-stage template-matching cascade using a short, blurred bar rendered at the expected line width and angle searches first across the full tile for strong crossing lines, and second along tile margins for clipped border fragments.
3. **Grid Refinement:** While full-tile lines are consolidated geometrically, weak border fragments risk false positives from clipped specimen edges. A **Random Forest classifier** scores each border contour across six geometric features (`aspect_ratio`, `long_side_angle`, `corner_proximity`, `area`, `length`, `orientation_mismatch`), retaining at most one line per orientation.
4. **Mask Generation:** Rasterizes refined contours using **rotated minimum-area rectangles** aligned to the true inclination of the grid. Each rectangle is widened by a configurable margin (`target_thickness`, default `22` px) to supply contextual border pixels to the inpainting network; full-tile detections are grown symmetrically to tile edges, while border fragments are extended outward toward the tile margin.
5. **Fourier-Convolution Inpainting (`LaMa`):** Reconstructs masked regions by combining the binary mask with the raw unmasked pixels retrieved from the shared pipeline context.
6. **Format Conversion:** Collapses the 3-channel pseudo-RGB output of LaMa back to single-channel grayscale required by ASHLAR and writes standardized tiles for stitching.

### 3. Calibrated Stitching & Multi-Resolution Visualization
- **ASHLAR Phase Correlation:** Refines nominal tile positions via phase correlation across overlapping borders, bounded by a configurable shift limit (`max_shift = 30` µm, increased from ASHLAR's 15 µm default to accommodate real-world stage offsets up to ~31 pixels at 0.630 µm/px).
- **Physical Scale Verification:** SlidePrep enforces explicit configuration of `stitching.pixel_size` (µm/pixel) via Pydantic validation and verifies/injects `PhysicalSizeX` and `PhysicalSizeY` in the assembled OME-XML header so the mosaic opens at true physical scale in **QuPath** and **Fiji**.
- **Web Stack & OpenSeadragon Viewer:** Deployed via Docker Compose as four services (**FastAPI** backend, **Celery** async worker using the `solo` pool under CUDA, **Redis** broker, and **nginx** serving the **Angular 21** frontend). After stitching, `libvips` converts the gigapixel OME-TIFF out-of-core into a Deep Zoom Image (DZI) pyramid for smooth browser panning and zooming alongside one-click downloads of the scientific OME-TIFF and provenance mask.

---

## Experimental Evaluation & Benchmarks

The authors validated SlidePrep on a 1,372-tile acquisition of Mediterranean mussel (*Mytilus galloprovincialis*) veliger larvae held in a **Sedgwick-Rafter counting chamber**:
- **Acquisition Setup:** Leica AF 6000 microscope, $10\times / 0.40$ dry objective, Hamamatsu ORCA-R2 camera at **$0.630\text{ }\mu\text{m/pixel}$**.
- **Grid Geometry:** $14 \times 49$ motorized TileScan (686 positions $\times$ 2 channels: brightfield + epifluorescence = 1,372 tiles of $1344 \times 1024$ px at 10% nominal overlap). Reticle lines cross brightfield tiles at $\approx 1.7^\circ$ and $-88.3^\circ$.
- **Artifact Detection Accuracy:** In the companion PACBB 2026 evaluation across 686 annotated tiles, SlidePrep achieved a **tile-level $F_1$ score of $0.9934$** and a **pixel-level $F_1$ score of $0.9642$** (compared to $0.2974$ for an Otsu binarization + contour baseline).
- **Computational Performance (Intel Core i7-11700F, 64 GB RAM, NVIDIA RTX 3050 8 GB VRAM):**
  - **Per-tile reticle removal (686 brightfield tiles):** Median **4,698 s** on CPU vs. **839 s (~14 min)** on GPU (**5.6$\times$ speedup**).
  - **Bottleneck Breakdown:** LaMa inpainting accounts for **98.4%** of per-tile time on CPU and **86.2%** on GPU.
  - **Mosaic Assembly:** ASHLAR stitching required **227 s** and global provenance mask composition required **110 s**, yielding a calibrated two-channel OME-TIFF spanning **$17,640 \times 44,447$ pixels ($11.1 \times 28.0\text{ mm}$, 766 MB on disk / 1.5 GB uncompressed)**.

---

## Scope, Limitations, and Future Directions

1. **Structural Occlusion vs. Photometric Non-Uniformity:** SlidePrep removes physical grid occlusions but performs no flat-field or vignetting correction; faint tile-to-tile illumination steps remain visible at $>3\times$ display reductions unless paired with shading correction.
2. **Object Boundary Recovery Limits:** Where a reticle line crosses the continuous contour of a larva or cell, LaMa smoothly reconstructs the outline (with minor smoothing of internal fine texture). However, where a thick grid line completely covers the terminal margin of a small object at a grid intersection with no continuation on the opposite side, the occluded boundary fades into the background.
3. **Retargeting Effort:** Adapting SlidePrep to chambers with different visual reticle profiles (e.g., double/triple-ruled Neubauer or Bürker lines) requires labeling a few hundred contour rows exported via debug mode (`rf-data.csv`) and running the included 5-fold cross-validated Random Forest training script (`training/train_rf_detection_classifier.py`).
4. **Planned Extensions:** Future releases aim to (i) validate pre-trained classifiers across Neubauer, Malassez, and Bürker chambers, (ii) add photometric level-matching along reconstructed bands, (iii) benchmark synthetic occlusion reconstruction fidelity against frequency-domain erasure, and (iv) embed automated cell enumeration and morphometry directly into the web viewer.

---

## Vault Context & Connections

- [[SlidePrep]] — Dedicated tool note with CLI commands, Python API snippets, Docker Compose GPU setup, and Random Forest retraining workflows.
- [[Digital Pathology Software]] — Overview of open-source stitching, viewing, and quantitative pathology platforms.
- [[OpenFlexure Microscope]] & [[HistoCAM]] — Hardware/software ecosystems for low-cost and ambient tiled microscopy acquisition that feed into stitching pipelines.
- [[Standardization in digital pathology: Supplement 145 of the DICOM standards]] & [[From Samples to Knowledge 2025: QuPath Training Course]] — Standards for calibrated whole-slide image metadata (`OME-TIFF` / `OME-XML` physical pixel sizes) required for reproducible downstream morphometry in QuPath and Fiji.
