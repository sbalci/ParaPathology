---
type: Reference
status: Developing
language: en
aliases:
  - "Digital Pathology Software"
order: 40
belongs_to: "[[Digital Pathology]]"
---

# Digital Pathology Software

### [Cytomine](https://cytomine.be/)

{% embed url="https://cytomine.be/" %}

### [ePMA.start – universal whole slide image viewer for digital pathology  **An end-user viewer and tile server in one convenient package**](https://free.pathomation.com/)\*\*\*\*

{% embed url="https://free.pathomation.com/" %}

[ORBIT IMAGE ANALYSIS](https://www.orbit.bio/)

{% embed url="https://www.orbit.bio/" %}

### [Micro-Manager](https://micro-manager.org/)

Open-source microscope control and acquisition automation, integrated with ImageJ — see [Micro-Manager](micro-manager.md).

{% embed url="https://micro-manager.org/" %}

### [Celldega](https://github.com/broadinstitute/celldega)

Open-source Python + JavaScript library from the Broad Institute (Platform Innovation Lab / Spatial Technology Platform) for scalable, interactive visualization and analysis of spatial-omics and single-cell data.

**Paper:** Fernandez N, Ishar J, Wang H, Ben Saad A, Lipinski M, Farhi SL. *Celldega: Integrated Toolkit for Visualization and Analysis of Spatial Data.* bioRxiv preprint, posted 2026-08-21 (DOI: 10.64898/2026.08.13.744672).

#### The Challenge in Spatial Pathology
Spatial-transcriptomics and high-plex spatial proteomics pair high-dimensional molecular measurements with high-resolution microscopy to characterize cellular phenotypes, cell–cell communication, and microenvironmental tissue architecture. However, as spatial technologies have matured, two major computational bottlenecks have emerged:
1. **Visualization & Scale Limits:** Open-source visualization tools fail to scale past ~1 billion transcripts and millions of segmented cells, suffering severe memory bloat or interface lag.
2. **Ecosystem & Usability Barriers:** Commercial viewers are costly, closed-source, vendor-locked, and lack integration with custom data pipelines (such as Scanpy, Squidpy, and AnnData/SpatialData).

#### Technical Architecture & Engineering Innovations
Celldega introduces an end-to-end framework combining Python preprocessing, optimized columnar file formats, and high-performance WebGL/WebAssembly frontends:

- **DegaFiles & Row Group Storage Mode:**
  - Traditional tile-based architectures generate 50,000+ individual files (transcripts, cell polygons, gene matrices, and WebP Deep Zoom image tiles), exceeding cloud host limits.
  - Celldega implements a consolidated **Apache Parquet / GeoParquet** format with an analytical formula-based index (`row_group_index = tile_x * num_tiles_y + tile_y`).
  - Uses **ParquetWASM** (Rust compiled to WebAssembly) and **Apache Arrow** in-memory structures to execute **HTTP Range Requests** in the browser, streaming only the exact byte ranges required for the visible viewport without downloading entire datasets. Reduces file counts from >50,000 to ~10 consolidated Parquet files.
- **Hardware-Accelerated Rendering:** Leverages [deck.gl](https://deck.gl/) for GPU-accelerated rendering of multi-channel microscopy image pyramids, polygon segmentation masks, and single-molecule transcript locations.

#### Specialized Visualization Modes
Celldega provides an integrated suite of views designed for different spatial analysis workflows:
- **`Landscape`:** 2D interactive multi-layer tissue canvas displaying pyramidal microscopy (H&E, DAPI, multichannel fluorescence), cell segmentation boundaries, individual transcripts, and spatial neighborhood overlays, complete with real-time gene search and categorical summary histograms.
- **`Yearbook`:** Synchronized grid of cell "portraits" (configurable rows/cols) centered on individual cells for morphological comparison and rapid phenotyping. Supports stateless browser-side querying (`front_end_query`) or programmatic selection from AnnData.
- **`CellCloud` & `NeighborhoodCloud`:** 3D orbit-camera views rendering millions of cell centroids and alpha-shape neighborhood polygons across serial sections and thick tissues (with on-demand centroid streaming to maintain 60 FPS).
- **`Clustergram` & `Composition`:** Hierarchically clustered heatmaps with interactive dendrogram cutting (built on Clustergrammer), bi-directionally linked to spatial views (`spatial_clustergram`) so selecting clusters or genes instantly highlights corresponding cells on the tissue section.
- **`Enrich`:** Integrated real-time gene-set enrichment widget connecting directly to the [Enrichr](https://maayanlab.cloud/Enrichr/) API (e.g. `CellMarker_2024`, GO) to functionally annotate marker gene lists from selected tissue regions.

#### Validated Platforms & Scale
- **Supported Technologies:** 10x Genomics Xenium & Xenium Prime, NanoString CosMx SMI, 10x Visium HD, Vizgen MERSCOPE, and single-cell Chromium.
- **Scale Benchmarks:** Demonstrated on datasets exceeding 1 billion transcripts, multi-slice serial alignment datasets, and a full 3D reconstruction of a developing whole mouse head comprising over **four million cells**.
- **Cloud & Pipeline Integration:** Integrates with WDL workflows on Terra.bio (`stp_segmentation_wdl`) for reproducible automated preprocessing with Cellpose, InstanSeg, and Starfish.

#### Relevance to Digital & Computational Pathology
Celldega bridges the gap between raw spatial-omics data processing and diagnostic/translational slide evaluation:
- Enables lightweight, zero-install, browser-based exploration and public web galleries without demanding dedicated GPU server infrastructure.
- Empowers pathologists to inspect single-cell morphology, verify segmentation boundaries against histological ground truth, and interrogate local microenvironmental gradients (e.g. tumor-immune interfaces, islet neighborhoods, tertiary lymphoid structures) in a single unified workspace.

{% embed url="https://github.com/broadinstitute/celldega" %}

{% embed url="https://broadinstitute.github.io/celldega/" %}

{% embed url="https://www.biorxiv.org/content/10.64898/2026.08.13.744672v2" %}

{% embed url="https://molab.marimo.io/notebooks/nb_A6JG5XUg5EPJyMwNDcsM18" %}





### [HistoMetPath](https://github.com/drehsangharib/HistoMetPath)

**Not software to adopt** — a single-author MIL research framework whose models are 30-slide development artefacts (best AUROC 0.68, no external validation). Read instead for its evaluation-governance code: a held-out test set that can be opened exactly once, enforced by checksums, a config-load refusal of the test split, and an execution counter spent before the first pixel is read — see [HistoMetPath](histometpath.md).

{% embed url="https://github.com/drehsangharib/HistoMetPath" %}

### [WSInfer](https://github.com/SBU-BMI/wsinfer)

Applies an already-trained patch-classification model across a whole slide and returns a per-tile probability map — as a QuPath overlay, or as CSV and GeoJSON from the command line. Eight models (TCGA tumour classifiers, pan-cancer lymphocytes, PatchCamelyon lymph-node metastasis, NCT-CRC-HE-100K colorectal tissue) come from a Hugging Face zoo; your own TorchScript model plus a config works too. **Use the QuPath extension, not the Python package**: the runtime has had no commit since July 2024 and its last two bug fixes are unreleased, while the extension is maintained by the QuPath group and requires QuPath 0.6 — see [WSInfer](wsinfer.md).

{% embed url="https://github.com/SBU-BMI/wsinfer" %}

{% embed url="https://github.com/qupath/qupath-extension-wsinfer" %}

### [nanopath](https://github.com/MedARC-AI/nanopath)

A lean harness from MedARC for **pretraining tile-level pathology foundation models from scratch**, modelled on Karpathy's nanochat: one GPU, 1,000,000 TCGA tile presentations, a 1e18-FLOP cap, then a fixed 12-dataset probe suite (drawn from THUNDER, PathoBench and LEOPARD) covering tile classification, nuclear segmentation, slide-level progression, mutation, survival and robustness. The point is to test a training idea cheaply before spending real compute on it. Apache-2.0; 139 commits since April 2026, essentially one author (Paul Scotti). The 120 GB pre-tiled TCGA parquet set is on Hugging Face as `medarc/nanopath`, so no WSI handling is needed to start — but reproducing the tiling from raw SVS needs the full ~13 TB open-access TCGA slide set.

Its real value here is the **frozen-baseline table**: UNI-2-h, H-optimus-0, Virchow, Prov-GigaPath, Midnight-12K, OpenMidnight, EXAONE-Path-2.5, GenBio-PathFM and three DINOv2 sizes all run through one identical probe suite. On that scale the best community model (0.6676, single GPU) lands above Virchow (0.6591) and GigaPath (0.6456) but below GenBio-PathFM (0.6917), UNI-2-h (0.6782) and H-optimus-0 (0.6763) — with the caveat the maintainers state themselves, that each backbone's native feature width (384-d to 4608-d) feeds the probe heads uncontrolled. The methodological detail worth copying is in `benchmarking/`: every probe carries a **randomised-weight null audit** — 20 seeds of an untrained DINOv2-small pushed through the same path — and the per-dataset notes say plainly which probes fail it. UCLA-Lung progression has a null of 0.692 ± 0.004, above every natural-image DINOv2 checkpoint and level with the current leaderboard leader, and the note calls it "a caution flag" and "not a clean representation-quality readout in isolation". LEOPARD BCR is similar (null 0.633 ± 0.012). Neither top-level README carries those caveats into the headline `mean_probe_score`, which averages all eight probe families equally — so the ranking absorbs columns the per-dataset notes flag as noise. There is a noise guard, though not that one: a new leader must beat the old by 0.006 and survive a maintainer rerun at a different rng seed.

{% embed url="https://labless.dev/nano-projects/nanopath" %}

{% embed url="https://github.com/MedARC-AI/nanopath" %}

{% embed url="https://huggingface.co/datasets/medarc/nanopath" %}
