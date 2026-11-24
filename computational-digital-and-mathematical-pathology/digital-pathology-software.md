---
type: Reference
status: Developing
language: bilingual
aliases:
  - "Digital Pathology Software"
order: 40
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Cytario]]"
  - "[[Cytomine]]"
  - "[[HoVer-NeXt]]"
  - "[[NuClick]]"
  - "[[From Samples to Knowledge 2025 - QuPath Training Course]]"
  - "[[OpenFlexure Microscope]]"
  - "[[Celldega]]"
  - "[[HistoCAM]]"
  - "[[TRIDENT]]"
  - "[[QuPath Python and MCP Ecosystem]]"
  - "[[QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO]]"
  - "[[SlidePrep]]"
---

# Digital Pathology Software

## Choose by the job

This is a research and learning shortlist, based on the tools' documented roles. Start by testing representative local files and a small pilot; the right choice depends on image formats, annotations, output, deployment, and support needs.

| Task | Starting point | Check before adopting |
| --- | --- | --- |
| View, annotate, and quantify whole slides on a desktop | [QuPath](https://qupath.readthedocs.io/en/stable/docs/intro/about.html) | Actual scanner-file support, pixel calibration, extension compatibility, and export needs; QuPath's documentation says it is not intended for clinical, diagnostic, or therapeutic purposes |
| Process scientific images or extracted slide regions with plugins and macros | [Fiji / ImageJ](https://imagej.net/software/fiji/) | Memory and image-size limits depend on the reader and plugins; test regions or downsampled images before attempting a full WSI |
| Read image regions and pyramid levels from code | [OpenSlide](https://openslide.org/) | A reading library, not a complete annotation or analysis platform; check the supported format and representative files |
| Manage a shared web-based slide collection with viewing and annotation | [Digital Slide Archive](https://digitalslidearchive.github.io/digital_slide_archive/) | Server deployment, access controls, storage, maintenance, and the HistomicsUI/HistomicsTK workflow |
| Organise collaborative annotations and image-analysis projects in a browser | [Cytomine](https://doc.uliege.cytomine.org/) | An administered instance, project permissions, labels, and algorithm integration; see the [local tool note](cytomine.md) |

For QuPath, begin with its [first steps](https://qupath.readthedocs.io/en/stable/docs/starting/first_steps.html) and [file-format guidance](https://qupath.readthedocs.io/en/stable/docs/intro/formats.html). Fiji's [image-size FAQ](https://imagej.net/learn/faq) and QuPath's [ImageJ exchange guide](https://qupath.readthedocs.io/en/stable/docs/advanced/imagej.html) explain why opening an extracted region can be more practical than loading a whole slide. For infrastructure work, use the [DSA deployment documentation](https://github.com/DigitalSlideArchive/digital_slide_archive/blob/master/devops/dsa/README.rst) or [Cytomine installation guide](https://doc.uliege.cytomine.org/admin-guide/docker/installation).

### A small adoption checklist

- **Input:** Test your scanner, file variant, stain/channels, resolution levels, and calibration metadata. A supported extension does not guarantee every file variant works.
- **Output:** Decide whether you need an image, annotation geometry, per-cell measurements, a slide-level table, or a model prediction. Check coordinate systems and units when moving results between tools.
- **Reproducibility:** Record the application, extensions, model/checkpoint, settings, and export format; reopen the saved project and repeat a small analysis.
- **Operations:** Identify who maintains a shared service, manages access and backups, and handles failures. Use approved storage and sharing routes for patient-derived images.
- **License and intended use:** Check the exact release's code license, plus separate model-weight, dataset, and dependency terms. A code license does not establish diagnostic authorization or permission to redistribute images.

These selection questions are editorial guidance, not a product certification or comparative benchmark. Continue with the [image-analysis pilot](image-analysis.md) for measurements, or the [usage and validation guide](about-the-usage-of-digital-pathology.md) for a diagnostic service.

**Source check:** 1 October 2026, for this chooser and its official documentation. The specialist catalog below retains earlier research summaries; versions, performance claims, and availability need checking in their original context before adoption.

## Specialist tools and collected notes

### [Cytario](https://www.cytario.com)

Open-core, cloud-native Image Management System (IMS) and web-based viewer for digital pathology and spatial biology. Built on React 19, [Viv](https://github.com/hms-dbmi/viv) (Harvard Medical School HIDIVE Lab), deck.gl, and DuckDB-WASM/Apache Arrow to stream petabyte-scale OME-TIFF, OME-Zarr, and Parquet data directly from S3-compatible storage with Keycloak multi-tenancy — see dedicated tool note: [Cytario](cytario.md).

- **GitHub:** [cytario/cytario-web](https://github.com/cytario/cytario-web) — AGPL-3.0
- **Platform Portal:** [cytario.com](https://www.cytario.com)

{% embed url="https://github.com/cytario/cytario-web" %}

{% embed url="https://www.cytario.com" %}

### [Cytomine](https://uliege.cytomine.org/)

Open-source, web-based platform for multi-gigapixel whole-slide image management, collaborative multi-observer annotation (PostGIS-backed spatial geometries), and distributed algorithmic analysis. See dedicated tool note: [Cytomine](cytomine.md).

- **GitHub:** [cytomine/cytomine](https://github.com/cytomine/cytomine)
- **Academic Portal:** [uliege.cytomine.org](https://uliege.cytomine.org/)
- **Documentation:** [doc.uliege.cytomine.org](https://doc.uliege.cytomine.org/)
- **TIA Centre Cytomine Apps:** [TissueImageAnalytics/cytomine-app](https://github.com/TissueImageAnalytics/cytomine-app) — Wraps TIAToolbox models (`cytomine-hovernet`, `cytomine-kongnet`, `cytomine-interactive-segmentation-nuclick`) into Cytomine Docker apps.

{% embed url="https://github.com/cytomine/cytomine" %}

{% embed url="https://uliege.cytomine.org/" %}

{% embed url="https://github.com/TissueImageAnalytics/cytomine-app" %}

### [NuClick](https://github.com/mostafajahanifar/nuclick_torch/)

Interactive deep-learning framework for prompted segmentation of microscopic objects (nuclei, cells, and glands) from user point clicks (Jahanifar, Koohbanani, Tajeddin & Rajpoot, *Medical Image Analysis* 2020). Utilizes a 5-channel tensor (RGB + target inclusion map + neighbour exclusion map) with dedicated NuClick CNN and U-Net models (Dice 0.874+) to eliminate manual boundary drawing. Serves as the annotation and consensus foundation for Owkin's [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](../Clippings/HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md) — see dedicated tool note: [NuClick](nuclick.md).

- **PyTorch GitHub:** [mostafajahanifar/nuclick_torch](https://github.com/mostafajahanifar/nuclick_torch/) — CC BY-NC-SA 4.0
- **Paper:** [DOI: 10.1016/j.media.2020.101771](https://doi.org/10.1016/j.media.2020.101771)
- **Cytomine App:** Included in [TissueImageAnalytics/cytomine-app](https://github.com/TissueImageAnalytics/cytomine-app) (`cytomine-interactive-segmentation-nuclick`)

{% embed url="https://github.com/mostafajahanifar/nuclick_torch" %}

### [CellQuant-Net](https://github.com/Falah-Jabar-Rahim/CellQuant-Net)

End-to-end WSI nuclei quantification pipeline integrating deep-learning artifact quality assessment (WSI-QA), prior-guided nuclei detection and 3-class classification (**CellPrior-Net / CP-Net**), and spatial cell neighborhood network analysis (Jabar et al., *Journal of Pathology Informatics* 2026). Combines a UniRepLKNet-N large-kernel CNN with a 4-channel input (RGB + hematoxylin Difference of Gaussians prior) and GPU watershed post-processing, matching transformer accuracy while running 2x to 3x faster than CellViT. Exports directly to QuPath GeoJSON and computes tumor-infiltrating lymphocyte (TIL) prognostic density metrics — see dedicated tool note: [CellQuant-Net](cellquant-net.md) and literature review [CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](../Clippings/CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md).

- **GitHub:** [Falah-Jabar-Rahim/CellQuant-Net](https://github.com/Falah-Jabar-Rahim/CellQuant-Net)
- **Paper:** [DOI: 10.1016/j.jpi.2026.100716](https://doi.org/10.1016/j.jpi.2026.100716); [arXiv:2607.00802](https://arxiv.org/abs/2607.00802)
- **Video Tutorial:** [YouTube](https://youtu.be/RhCJnUfuYkA?is=Jc4keTUtecEcjeZd)

{% embed url="https://github.com/Falah-Jabar-Rahim/CellQuant-Net" %}

### [RepLKNet](https://github.com/DingXiaoH/RepLKNet-pytorch)

Foundational large-kernel convolutional architecture and PyTorch framework scaling depthwise convolutions up to 31×31 via structural re-parameterization and custom CUDA Implicit GEMM acceleration (Ding et al., *CVPR 2022*). By establishing that large kernels deliver an ultra-wide Effective Receptive Field (ERF) and high shape bias matching Vision Transformers, RepLKNet laid the theoretical and architectural foundation for next-generation, high-speed computational pathology encoders—including UniRepLKNet and the UniRepLKNet-N backbone powering [CellQuant-Net](cellquant-net.md) / [CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](../Clippings/CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md)—enabling whole-slide image analysis at 2x to 3x the speed of CellViT. See dedicated tool note: [RepLKNet](replknet.md) and literature review [Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs](../Clippings/Scaling%20Up%20Your%20Kernels%20to%2031x31%20-%20Revisiting%20Large%20Kernel%20Design%20in%20CNNs.md).

- **PyTorch GitHub:** [DingXiaoH/RepLKNet-pytorch](https://github.com/DingXiaoH/RepLKNet-pytorch) — Apache-2.0
- **Paper:** [DOI: 10.1109/CVPR52688.2022.01167](https://doi.org/10.1109/CVPR52688.2022.01167); [arXiv:2203.06717](https://arxiv.org/abs/2203.06717)

{% embed url="https://github.com/DingXiaoH/RepLKNet-pytorch" %}

### ePMA.start – universal whole slide image viewer for digital pathology **An end-user viewer and tile server in one convenient package**\*\*\*\*

[ORBIT IMAGE ANALYSIS](https://www.orbit.bio/)

{% embed url="https://www.orbit.bio/" %}

### [Micro-Manager](https://micro-manager.org/)

Open-source microscope control and acquisition automation, integrated with ImageJ — see Micro-Manager.

{% embed url="https://micro-manager.org/" %}

### [OpenFlexure Microscope](https://openflexure.org/projects/microscope/)

Open-source, 3D-printable robotic digital microscope featuring sub-100 nm positioning precision via monolithic compliant flexure mechanics, RMS DIN finite/infinity optics, Sangaboard motor control, Python REST API, automated whole-slide scanning, and validated applications in parasitology and telepathology — see dedicated tool note: [OpenFlexure Microscope](openflexure-microscope.md) and literature review [Robotic microscopy for everyone: the OpenFlexure Microscope](../Clippings/Robotic%20microscopy%20for%20everyone%20-%20the%20OpenFlexure%20Microscope.md).

- **Website:** [openflexure.org/projects/microscope](https://openflexure.org/projects/microscope/)
- **GitHub:** [rwb27/openflexure_microscope](https://github.com/rwb27/openflexure_microscope) | **GitLab:** [openflexure/openflexure-microscope](https://gitlab.com/openflexure/openflexure-microscope)
- **Paper:** Collins et al., *Biomedical Optics Express* 2020 ([DOI: 10.1364/BOE.385729](https://doi.org/10.1364/BOE.385729))

{% embed url="https://openflexure.org/projects/microscope/" %}

{% embed url="https://github.com/rwb27/openflexure_microscope" %}

### [M-Optimus](https://www.bioptimus.com/m-optimus)

Multimodal biological world model and digital pathology foundation platform developed by Bioptimus (Paris, France). Connects routine Hematoxylin and Eosin (H&E) whole-slide histology with molecular genetics (bulk RNA-seq and spatial transcriptomics) to perform in silico spatial transcriptomics—reconstructing spatial expression maps for 6,000+ genes directly from H&E whole-slide images alone or paired with bulk RNA-seq. Validated against 10x Genomics Xenium Prime ($r = 0.81$) and deployed on archival clinical cohorts (TCIA) to identify spatial microenvironmental biomarkers of targeted therapy resistance — see dedicated tool note: [M-Optimus](m-optimus.md) and literature review [From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer](../Clippings/From%20Model%20to%20Patient%20-%20M-Optimus-1%20for%20Spatial%20Biomarker%20Discovery%20in%20Ovarian%20Cancer.md).

- **Website:** [bioptimus.com/m-optimus](https://www.bioptimus.com/m-optimus)
- **Technical Launch:** [bioptimus.com/introducing-m-optimus](https://www.bioptimus.com/introducing-m-optimus)
- **STELA Data Consortium:** [bioptimus.com/stela](https://www.bioptimus.com/stela)

{% embed url="https://www.bioptimus.com/m-optimus" %}

### [PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas)

Open-source PyTorch and Captum-based interpretability framework developed by the Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden) to audit what morphological concepts are organized inside pathology foundation models (Gustav et al., *Cell Reports Medicine* 2026). Generates Fourier-parameterized class visualizations (CVs) and layer-wise activation atlases (AAs) with t-SNE grid aggregation, and includes an interactive desktop GUI viewer and blinded pathologist annotation software — see dedicated tool note: [PathoActivationAtlas](pathoactivationatlas.md) and literature review [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md).

- **GitHub:** [KatherLab/PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas) — MIT License (Captum components under BSD-3-Clause)
- **Paper:** Gustav et al., *Cell Reports Medicine* 2026 ([DOI: 10.1016/j.xcrm.2026.103054](https://doi.org/10.1016/j.xcrm.2026.103054))

{% embed url="https://github.com/KatherLab/PathoActivationAtlas" %}

### [TRIDENT](https://github.com/mahmoodlab/trident)

Industrial-grade, open-source Python toolkit developed by the Mahmood Lab (Harvard Medical School / Brigham and Women's Hospital) for large-scale whole-slide image processing, tissue segmentation, and feature extraction across 33+ patch encoders (UNI, CONCH, Virchow, GigaPath, H-Optimus) and 8+ slide encoders (TITAN, PRISM, GigaPath, CHIEF). Features deep neural segmentation (HEST, GrandQC), multi-GPU sharding, QuPath GeoJSON contour exports, asynchronous SSD caching, crash-resilient deadlock recovery, and integration with the 42-task Patho-Bench suite — see dedicated tool note: [TRIDENT](trident.md) and literature review [Accelerating Data Processing and Benchmarking of AI Models for Pathology](../Clippings/Accelerating%20Data%20Processing%20and%20Benchmarking%20of%20AI%20Models%20for%20Pathology.md).

- **GitHub:** [mahmoodlab/TRIDENT](https://github.com/mahmoodlab/trident)
- **Documentation:** [trident-docs.readthedocs.io](https://trident-docs.readthedocs.io/en/latest/)
- **Paper:** Zhang et al., arXiv 2025 ([DOI: 10.48550/arXiv.2502.06750](https://doi.org/10.48550/arXiv.2502.06750))

{% embed url="https://github.com/mahmoodlab/trident" %}

### [STAMP](https://github.com/KatherLab/STAMP)

Solid Tumor Associative Modeling in Pathology, an end-to-end weakly supervised deep learning pipeline developed by the Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden; RWTH Aachen; University Medical Center Mainz) for clinical biomarker prediction, multi-target classification, continuous regression, and survival analysis directly from whole-slide images. Features standardized preprocessing across 18+ foundation model extractors (UNI2, Virchow2, CONCH1.5, H-Optimus, CTransPath), patient-level virtual slide concatenation, slide contextualizers (TITAN, PRISM, GigaPath, COBRA2, EAGLE, MADELEINE, CHIEF), multiple MIL architectures (ViT, TransMIL, Barspoon), attention heatmaps, class maps, top/bottom predictive tile extraction, and native Model Context Protocol (FastMCP) server orchestration (`mcp/server.py`) paired with the [STAMP-Workbench](https://github.com/KatherLab/STAMP-Workbench) web UI — see dedicated tool note: [STAMP](stamp.md) and published protocol review [From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology](../Clippings/From%20whole-slide%20image%20to%20biomarker%20prediction%20-%20end-to-end%20weakly%20supervised%20deep%20learning%20in%20computational%20pathology.md).

- **GitHub:** [KatherLab/STAMP](https://github.com/KatherLab/STAMP) — MIT License
- **Workbench UI:** [KatherLab/STAMP-Workbench](https://github.com/KatherLab/STAMP-Workbench)
- **Paper:** El Nahhas et al., *Nature Protocols* 20, 293–316 (2025) ([DOI: 10.1038/s41596-024-01047-2](https://doi.org/10.1038/s41596-024-01047-2), [PMID: 39285224](https://pubmed.ncbi.nlm.nih.gov/39285224/))

{% embed url="https://github.com/KatherLab/STAMP" %}

### [Celldega](https://github.com/broadinstitute/celldega)

Source-available Python + JavaScript toolkit from the Broad Institute for interactive exploration of spatial-omics and single-cell data in notebooks and web browsers. See the dedicated [Celldega note](celldega.md).

**License checked 1 October 2026:** [Broad Institute Academic Software License](https://github.com/broadinstitute/celldega/blob/726b57cfeff1a0e70b06b91b079bd592b91daeca/LICENSE.txt), at upstream commit `726b57c`. The grant is for specified educational and academic-research uses by academic/nonprofit researchers; commercial entities are directed to Broad for licensing. Do not infer permissive reuse from the availability of the source code.

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

**Not software to adopt** — a single-author MIL research framework whose models are 30-slide development artefacts (best AUROC 0.68, no external validation). Read instead for its evaluation-governance code: a held-out test set that can be opened exactly once, enforced by checksums, a config-load refusal of the test split, and an execution counter spent before the first pixel is read — see HistoMetPath.

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

### [HoVer-NeXt](https://github.com/digitalpathologybern/hover_next_train)

Modernized, high-throughput nuclear instance segmentation and classification pipeline from the University of Bern (Digital Pathology group / Prof. Inti Zlobec; Baumann et al., MIDL 2024). Re-engineers the classic HoVer-Net architecture using ConvNeXt-V2 backbones (Tiny/Base/Large), decoupled multi-head U-Net decoders (5-channel distance maps and multi-class cell typing), native multi-threaded whole-slide inference (OpenSlide, CZI, Zarr), and direct export to QuPath `.tsv` measurement tables. Pretrained checkpoints available on Zenodo for Lizard-Mitosis (7 classes) and PanNuke (5 classes across 19 tissues) — see [HoVer-NeXt](hover-next.md).

- **Training Code:** [digitalpathologybern/hover_next_train](https://github.com/digitalpathologybern/hover_next_train)
- **Inference Pipeline:** [digitalpathologybern/hover_next_inference](https://github.com/digitalpathologybern/hover_next_inference)
- **Paper:** [MIDL 2024 (OpenReview)](https://openreview.net/pdf?id=3vmB43oqIO)

{% embed url="https://github.com/digitalpathologybern/hover_next_train" %}

{% embed url="https://github.com/digitalpathologybern/hover_next_inference" %}

### [From Samples to Knowledge 2025: QuPath Training Course](https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp)

Comprehensive hands-on curriculum from the La Jolla Institute for Immunology (Dr. Zbigniew Mikulski & Dr. Sara McArdle) targeting modern QuPath v0.6.0+ bioimage workflows. Covers 18-plex multiplex immunofluorescence (RareCyte Orion), native deep-learning cell segmentation via Deep Java Library (DJL / InstanSeg), Groovy scripting pipelines for batch cohort processing, complex multi-marker composite phenotyping, multimodal image registration (Warpy / `qupath-extension-warpy`), spatial proximity/density metrics, and interactive Python/Jupyter bridging ([QuBaLab / PAQUO](qupath-python-and-mcp.md)) — see dedicated course note: [From Samples to Knowledge 2025: QuPath Training Course](../Clippings/From%20Samples%20to%20Knowledge%202025%20-%20QuPath%20Training%20Course.md).

- **Course Book:** [saramcardle.github.io/FS2K](https://saramcardle.github.io/FS2K/README.html)
- **Repository:** [saramcardle/FS2K](https://github.com/saramcardle/FS2K)
- **Video Playlist:** [YouTube Playlist (14 videos)](https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp)
- **Registration Tool:** [BIOP/qupath-extension-warpy](https://github.com/BIOP/qupath-extension-warpy)

{% embed url="https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp" %}

{% embed url="https://github.com/saramcardle/FS2K" %}

### [QuPath Python and MCP Ecosystem](qupath-python-and-mcp.md)

External interoperability stack connecting **QuPath** to Python scientific computing (`NumPy`, `Dask`, `Shapely`, `Scanpy`/`Squidpy`, `napari`) and large language model (LLM) agents via the **Model Context Protocol (MCP)**:

1. **Python–QuPath Bridges:**
   - **[QuBaLab](https://github.com/qupath/qubalab) & [qupath-extension-py4j](https://github.com/qupath/qupath-extension-py4j):** Official QuPath team libraries (Apache-2.0). `qupath-extension-py4j` (bundled since QuPath v0.6.0-rc3) opens a localhost Py4J socket gateway (`port 25333`, optional token) exposing `QuPathEntryPoint` (`QPEx`/`QP`), while `QuBaLab` (`pip install qubalab`) provides unified `ImageServer` readers (`OpenSlideServer`, `BioIOServer`, `IccProfileServer`, `LabeledImageServer`, `QuPathServer`) with lazy `level_to_dask()` arrays, eager `read_region()` NumPy tiles, and GeoJSON/Shapely object manipulation—functioning both standalone (without Java) and live-connected to QuPath.
   - **[PAQUO](https://paquo.readthedocs.io/en/latest/) ([Bayer-Group/paquo](https://github.com/Bayer-Group/paquo)):** Developed by Bayer ML Research (GPL-3.0, v0.8.2). Uses `jpype1` to embed QuPath's Java libraries directly inside Python without an open QuPath GUI, providing Pythonic context managers (`QuPathProject`) and bidirectional `Shapely` <-> `PathObject` annotation/detection geometry and measurement manipulation.
2. **Model Context Protocol (MCP) Servers for AI Agents (QuPath 0.7+):**
   - **[00JackLu/qupath-mcp](https://github.com/00JackLu/qupath-mcp) ([Docs](https://00jacklu.github.io/qupath-mcp/), [Image.sc #122987](https://forum.image.sc/t/try-qupath-mcp-a-qupath-extension-that-lets-ai-agents-work-in-qupath/122987), [Zenodo DOI: 10.5281/zenodo.23788878](https://doi.org/10.5281/zenodo.23788878)):** State-aware in-process HTTP/STDIO MCP server (`127.0.0.1:9527/mcp`) exposing **34 typed domain tools** across 6 categories (viewer perception with opt-in `qupath_capture_view`, annotations/GeoJSON, watershed cell detection & measurement export, compile-checked Groovy scripting with swallowed-warning capture, project management, and provenance) with `read-only`/`write`/`destructive` side-effect hints, 4 capability kill-switches, and **deterministic LLM-free workflow replay (`qupath_replay_workflow`)**.
   - **[earthmover-support/qupath-mcp](https://github.com/earthmover-support/qupath-mcp) ([Docs](https://earthmover-support.github.io/qupath-mcp/)):** Non-blocking JavaFX GUI-driving MCP extension (`127.0.0.1:51515/mcp`) exposing **13 tools** (`qupath_describe`, `qupath_menu`, `qupath_click`, `qupath_select`, `qupath_set`, `qupath_key`, `qupath_wait`, `qupath_view`, `qupath_screenshot`, `qupath_run_groovy`, `qupath_show_actions`) that never deadlock on modal dialogs, paired with on-screen visual telemetry overlays (**Mark / Paced / Off**), Origin/Host DNS-rebinding protection, and `mcp-<date>-<time>.jsonl` session action logs.
   - **Upstream Roadmap Context:** [qupath/qupath#2159](https://github.com/qupath/qupath/issues/2159#issuecomment-6280318076) (Peter Bankhead, Alan O'Callaghan, Curtis Rueden).
   - See dedicated tool note: [QuPath Python and MCP Ecosystem](qupath-python-and-mcp.md) and comparative review [QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO](../Clippings/QuPath-MCP%20and%20Python%20Interoperability%20-%20AI%20Agent%20Servers%2C%20QuBaLab%2C%20Py4J%2C%20and%20PAQUO.md).

{% embed url="https://github.com/00JackLu/qupath-mcp" %}

{% embed url="https://github.com/earthmover-support/qupath-mcp" %}

{% embed url="https://github.com/qupath/qubalab" %}

{% embed url="https://github.com/qupath/qupath-extension-py4j" %}

{% embed url="https://github.com/Bayer-Group/paquo" %}


### [HistoCAM](https://github.com/cooopermaira/HistoCAM_Nature_Communications)

Ambient, real-time digitization and datafication platform for glass-slide microscopy developed by researchers across Tulane University and Kitware, Inc. (Maira et al., *Nature Communications* 2026). Couples a 31-megapixel high space-bandwidth camera with a C++ streaming engine (`pathcam`) to passively composite multi-resolution WSI pyramids (2X to 40X) during standard optical examination, record pathologist search trajectories and dwell times, and execute real-time TensorRT AI segmentation directly at the microscope — see dedicated tool note: [HistoCAM](histocam.md) and literature review [Ambient, real-time digitization and datafication of glass slide microscopy towards AI-at-the-microscope](../Clippings/Ambient,%20real-time%20digitization%20and%20datafication%20of%20glass%20slide%20microscopy%20towards%20AI-at-the-microscope.md).

- **GitHub:** [cooopermaira/HistoCAM_Nature_Communications](https://github.com/cooopermaira/HistoCAM_Nature_Communications)
- **Paper:** [Nature Communications (DOI: 10.1038/s41467-026-77887-1)](https://doi.org/10.1038/s41467-026-77887-1)
- **Zenodo Benchmark Data:** [Zenodo Record 21970445](https://zenodo.org/records/21970445)

{% embed url="https://github.com/cooopermaira/HistoCAM_Nature_Communications" %}

{% embed url="https://www.nature.com/articles/s41467-026-77887-1" %}

### [SlidePrep](https://github.com/INOU-2025/SlidePrep)

Open-source microscopy tile preprocessing, counting-chamber grid artifact removal, and whole-slide image stitching pipeline developed at the Universidade de Vigo and IIS Galicia Sur (Rodriguez-Conde, Campos & Fdez-Riverola, *SoftwareX* 2026). Isolates etched reference grids (reticles) in brightfield tiles using 3-class multi-level Otsu thresholding (`Combined Differential`), directional template matching, and Random Forest contour refinement ($F_1 = 0.9934$ tile-level, $0.9642$ pixel-level), reconstructs occluded specimen regions via LaMa Fourier-convolution inpainting (5.6× GPU speedup), and stitches calibrated multi-channel **OME-TIFF** mosaics via ASHLAR alongside a full-mosaic binary provenance mask (`_inpaint_mask.tif`) and a containerized FastAPI + Celery + Angular 21 + OpenSeadragon web viewer — see dedicated tool note: [SlidePrep](slideprep.md) and literature review [SlidePrep: artifact removal, reconstruction, and visualization of whole-slide images from tiled microscopy acquisitions](../Clippings/SlidePrep%20-%20artifact%20removal%2C%20reconstruction%2C%20and%20visualization%20of%20whole-slide%20images%20from%20tiled%20microscopy%20acquisitions.md).

- **GitHub:** [INOU-2025/SlidePrep](https://github.com/INOU-2025/SlidePrep) — MIT License (v1.0.4)
- **Paper:** Rodriguez-Conde et al., *SoftwareX* 36 (2026) 103161 ([DOI: 10.1016/j.softx.2026.103161](https://doi.org/10.1016/j.softx.2026.103161))

{% embed url="https://github.com/INOU-2025/SlidePrep" %}

<!-- tolaria:children:start -->

## In this section

* [PathoActivationAtlas](pathoactivationatlas.md)
* [NuClick](nuclick.md)
* [CellQuant-Net](cellquant-net.md)
* [RepLKNet](replknet.md)
* [TRIDENT](trident.md)
* [OpenFlexure Microscope](openflexure-microscope.md)
* [STAMP](stamp.md)
* [M-Optimus](m-optimus.md)
* [Celldega](celldega.md)
* [HistoCAM](histocam.md)
* [QuPath Python and MCP Ecosystem](qupath-python-and-mcp.md)
* [SlidePrep](slideprep.md)

<!-- tolaria:children:end -->

# Dijital Patoloji Yazılımları

## İşe göre seçin

Bu liste, araçların belgelenmiş rollerine dayanan, araştırma ve öğrenme amaçlı kısa bir listedir. İşe, temsil edici yerel dosyaları test ederek ve küçük bir pilot çalışmayla başlayın; doğru seçim görüntü formatlarına, anotasyonlara, çıktıya, kurulum ortamına ve destek gereksinimlerine bağlıdır.

| Görev | Başlangıç noktası | Benimsemeden önce kontrol edin |
| --- | --- | --- |
| Tüm slaytları masaüstünde görüntüleme, anotasyon ve nicelleştirme | [QuPath](https://qupath.readthedocs.io/en/stable/docs/intro/about.html) | Gerçek tarayıcı dosyası desteği, piksel kalibrasyonu, eklenti uyumluluğu ve dışa aktarma gereksinimleri; QuPath belgeleri, yazılımın klinik, tanısal veya tedavi amaçlı kullanım için tasarlanmadığını belirtir |
| Bilimsel görüntüleri veya slayttan çıkarılmış bölgeleri eklentiler ve makrolarla işleme | [Fiji / ImageJ](https://imagej.net/software/fiji/) | Bellek ve görüntü boyutu sınırları okuyucuya ve eklentilere bağlıdır; tam bir WSI (tüm slayt görüntüsü) açmayı denemeden önce bölgeleri veya küçültülmüş görüntüleri test edin |
| Görüntü bölgelerini ve piramit düzeylerini koddan okuma | [OpenSlide](https://openslide.org/) | Eksiksiz bir anotasyon veya analiz platformu değil, bir okuma kütüphanesidir; desteklenen formatı ve temsil edici dosyaları kontrol edin |
| Görüntüleme ve anotasyon olanaklı, web tabanlı ortak bir slayt koleksiyonunu yönetme | [Digital Slide Archive](https://digitalslidearchive.github.io/digital_slide_archive/) | Sunucu kurulumu, erişim denetimleri, depolama, bakım ve HistomicsUI/HistomicsTK iş akışı |
| İşbirliğine dayalı anotasyonları ve görüntü analizi projelerini tarayıcıda düzenleme | [Cytomine](https://doc.uliege.cytomine.org/) | Yönetilen bir kurulum (instance), proje izinleri, etiketler ve algoritma entegrasyonu; bkz. [yerel araç notu](cytomine.md) |

QuPath için [ilk adımlar](https://qupath.readthedocs.io/en/stable/docs/starting/first_steps.html) ve [dosya formatı rehberi](https://qupath.readthedocs.io/en/stable/docs/intro/formats.html) ile başlayın. Fiji'nin [görüntü boyutu SSS](https://imagej.net/learn/faq) sayfası ve QuPath'in [ImageJ veri alışverişi rehberi](https://qupath.readthedocs.io/en/stable/docs/advanced/imagej.html), çıkarılmış bir bölgeyi açmanın neden tüm slaytı yüklemekten daha pratik olabileceğini açıklar. Altyapı çalışmaları için [DSA kurulum belgelerini](https://github.com/DigitalSlideArchive/digital_slide_archive/blob/master/devops/dsa/README.rst) veya [Cytomine kurulum rehberini](https://doc.uliege.cytomine.org/admin-guide/docker/installation) kullanın.

### Kısa bir benimseme kontrol listesi

- **Girdi:** Tarayıcınızı, dosya varyantını, boya/kanalları, çözünürlük düzeylerini ve kalibrasyon üst verisini test edin. Bir dosya uzantısının desteklenmesi, her dosya varyantının çalışacağını garanti etmez.
- **Çıktı:** Bir görüntüye mi, anotasyon geometrisine mi, hücre başına ölçümlere mi, slayt düzeyinde bir tabloya mı yoksa bir model tahminine mi ihtiyacınız olduğuna karar verin. Sonuçları araçlar arasında taşırken koordinat sistemlerini ve birimleri kontrol edin.
- **Tekrarlanabilirlik:** Uygulamayı, eklentileri, modeli/checkpoint'i, ayarları ve dışa aktarma formatını kaydedin; kaydedilmiş projeyi yeniden açıp küçük bir analizi tekrarlayın.
- **İşletim:** Ortak bir hizmetin bakımını kimin yaptığını, erişimi ve yedeklemeleri kimin yönettiğini ve arızalarla kimin ilgilendiğini belirleyin. Hastadan elde edilen görüntüler için onaylı depolama ve paylaşım yollarını kullanın.
- **Lisans ve kullanım amacı:** İlgili sürümün kod lisansını ve buna ek olarak ayrı model ağırlığı, veri seti ve bağımlılık koşullarını kontrol edin. Bir kod lisansı, tanısal kullanım yetkisi veya görüntüleri yeniden dağıtma izni anlamına gelmez.

Bu seçim soruları editoryal rehberlik niteliğindedir; bir ürün sertifikasyonu veya karşılaştırmalı kıyaslama (benchmark) değildir. Ölçümler için [görüntü analizi pilot çalışması](image-analysis.md) ile, tanısal bir hizmet için ise [kullanım ve validasyon rehberi](about-the-usage-of-digital-pathology.md) ile devam edin.

**Kaynak kontrolü:** 1 Ekim 2026; bu seçim rehberi ve ilgili resmî belgeler için. Aşağıdaki uzman katalog daha önceki araştırma özetlerini korumaktadır; sürümler, performans iddiaları ve erişilebilirlik, benimsenmeden önce kendi özgün bağlamlarında kontrol edilmelidir.

## Uzmanlaşmış araçlar ve derlenmiş notlar

### [Cytario](https://www.cytario.com)

Dijital patoloji ve uzamsal biyoloji için açık çekirdekli (open-core), bulut tabanlı (cloud-native) bir Görüntü Yönetim Sistemi (Image Management System, IMS) ve web tabanlı görüntüleyici. React 19, [Viv](https://github.com/hms-dbmi/viv) (Harvard Medical School HIDIVE Lab), deck.gl ve DuckDB-WASM/Apache Arrow üzerine kurulmuştur; petabayt ölçeğindeki OME-TIFF, OME-Zarr ve Parquet verilerini Keycloak çok kiracılı (multi-tenancy) yapısıyla doğrudan S3 uyumlu depolamadan akış hâlinde aktarır — ayrıntılı araç notuna bakın: [Cytario](cytario.md).

- **GitHub:** [cytario/cytario-web](https://github.com/cytario/cytario-web) — AGPL-3.0
- **Platform Portalı:** [cytario.com](https://www.cytario.com)

{% embed url="https://github.com/cytario/cytario-web" %}

{% embed url="https://www.cytario.com" %}

### [Cytomine](https://uliege.cytomine.org/)

Çok gigapiksellik tüm slayt görüntülerinin yönetimi, işbirliğine dayalı çok gözlemcili anotasyon (PostGIS destekli uzamsal geometriler) ve dağıtık algoritmik analiz için açık kaynaklı, web tabanlı bir platform. Ayrıntılı araç notuna bakın: [Cytomine](cytomine.md).

- **GitHub:** [cytomine/cytomine](https://github.com/cytomine/cytomine)
- **Akademik Portal:** [uliege.cytomine.org](https://uliege.cytomine.org/)
- **Belgeler:** [doc.uliege.cytomine.org](https://doc.uliege.cytomine.org/)
- **TIA Centre Cytomine Uygulamaları:** [TissueImageAnalytics/cytomine-app](https://github.com/TissueImageAnalytics/cytomine-app) — TIAToolbox modellerini (`cytomine-hovernet`, `cytomine-kongnet`, `cytomine-interactive-segmentation-nuclick`) Cytomine Docker uygulamaları olarak paketler.

{% embed url="https://github.com/cytomine/cytomine" %}

{% embed url="https://uliege.cytomine.org/" %}

{% embed url="https://github.com/TissueImageAnalytics/cytomine-app" %}

### [NuClick](https://github.com/mostafajahanifar/nuclick_torch/)

Mikroskopik nesnelerin (çekirdekler, hücreler ve bezler) kullanıcının nokta tıklamalarıyla yönlendirilen segmentasyonu için etkileşimli bir derin öğrenme çerçevesi (Jahanifar, Koohbanani, Tajeddin & Rajpoot, *Medical Image Analysis* 2020). Elle sınır çizme ihtiyacını ortadan kaldırmak için 5 kanallı bir tensör (RGB + hedef dahil etme haritası + komşu dışlama haritası) ile özel NuClick CNN ve U-Net modellerini (Dice 0,874+) kullanır. Owkin'in HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides çalışması için anotasyon ve konsensüs temelini oluşturur — ayrıntılı araç notuna bakın: [NuClick](nuclick.md).

- **PyTorch GitHub:** [mostafajahanifar/nuclick_torch](https://github.com/mostafajahanifar/nuclick_torch/) — CC BY-NC-SA 4.0
- **Makale:** [DOI: 10.1016/j.media.2020.101771](https://doi.org/10.1016/j.media.2020.101771)
- **Cytomine Uygulaması:** [TissueImageAnalytics/cytomine-app](https://github.com/TissueImageAnalytics/cytomine-app) içinde yer alır (`cytomine-interactive-segmentation-nuclick`)

{% embed url="https://github.com/mostafajahanifar/nuclick_torch" %}

### [CellQuant-Net](https://github.com/Falah-Jabar-Rahim/CellQuant-Net)

Derin öğrenmeye dayalı artefakt kalite değerlendirmesini (WSI-QA), ön bilgi yönlendirmeli çekirdek saptama ve 3 sınıflı sınıflandırmayı (**CellPrior-Net / CP-Net**) ve uzamsal hücre komşuluğu ağ analizini bir araya getiren uçtan uca bir WSI çekirdek nicelleştirme iş akışı (Jabar ve ark., *Journal of Pathology Informatics* 2026). UniRepLKNet-N büyük çekirdekli (large-kernel) bir CNN'i 4 kanallı bir girdiyle (RGB + hematoksilin Gauss Farkı [Difference of Gaussians] ön bilgisi) ve GPU tabanlı watershed son işlemesiyle birleştirir; transformer doğruluğuna ulaşırken CellViT'ten 2 ila 3 kat daha hızlı çalışır. Sonuçları doğrudan QuPath GeoJSON formatında dışa aktarır ve tümöre infiltre lenfosit (TIL) prognostik yoğunluk ölçütlerini hesaplar — ayrıntılı araç notuna bakın: [CellQuant-Net](cellquant-net.md) ve literatür incelemesi CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images.

- **GitHub:** [Falah-Jabar-Rahim/CellQuant-Net](https://github.com/Falah-Jabar-Rahim/CellQuant-Net)
- **Makale:** [DOI: 10.1016/j.jpi.2026.100716](https://doi.org/10.1016/j.jpi.2026.100716); [arXiv:2607.00802](https://arxiv.org/abs/2607.00802)
- **Video Eğitim:** [YouTube](https://youtu.be/RhCJnUfuYkA?is=Jc4keTUtecEcjeZd)

{% embed url="https://github.com/Falah-Jabar-Rahim/CellQuant-Net" %}

### [RepLKNet](https://github.com/DingXiaoH/RepLKNet-pytorch)

Derinlemesine (depthwise) konvolüsyonları yapısal yeniden parametrelendirme (structural re-parameterization) ve özel CUDA Implicit GEMM hızlandırması aracılığıyla 31×31'e kadar ölçekleyen, temel nitelikte büyük çekirdekli bir konvolüsyonel mimari ve PyTorch çerçevesi (Ding ve ark., *CVPR 2022*). Büyük çekirdeklerin Vision Transformer'larla eşleşen son derece geniş bir Etkin Algılama Alanı (Effective Receptive Field, ERF) ve yüksek şekil eğilimi (shape bias) sağladığını ortaya koyan RepLKNet, UniRepLKNet ve CellQuant-Net / CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images çalışmalarına güç veren UniRepLKNet-N omurgası dahil olmak üzere yeni nesil, yüksek hızlı hesaplamalı patoloji kodlayıcılarının kuramsal ve mimari temelini atmıştır; bu da tüm slayt görüntüsü analizinin CellViT'e göre 2 ila 3 kat hızla yapılmasını mümkün kılmaktadır. Ayrıntılı araç notuna bakın: [RepLKNet](replknet.md) ve literatür incelemesi Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs.

- **PyTorch GitHub:** [DingXiaoH/RepLKNet-pytorch](https://github.com/DingXiaoH/RepLKNet-pytorch) — Apache-2.0
- **Makale:** [DOI: 10.1109/CVPR52688.2022.01167](https://doi.org/10.1109/CVPR52688.2022.01167); [arXiv:2203.06717](https://arxiv.org/abs/2203.06717)

{% embed url="https://github.com/DingXiaoH/RepLKNet-pytorch" %}

### ePMA.start – dijital patoloji için evrensel tüm slayt görüntüsü görüntüleyicisi **Son kullanıcıya yönelik görüntüleyici ve döşeme (tile) sunucusu tek ve kullanışlı bir pakette**\*\*\*\*

[ORBIT IMAGE ANALYSIS](https://www.orbit.bio/)

{% embed url="https://www.orbit.bio/" %}

### [Micro-Manager](https://micro-manager.org/)

ImageJ ile entegre, açık kaynaklı mikroskop kontrolü ve görüntü alımı otomasyonu — bkz. Micro-Manager.

{% embed url="https://micro-manager.org/" %}

### [OpenFlexure Microscope](https://openflexure.org/projects/microscope/)

Monolitik esnek (compliant flexure) mekanik sayesinde 100 nm altı konumlandırma hassasiyeti, RMS DIN sonlu/sonsuz optik, Sangaboard motor kontrolü, Python REST API, otomatik tüm slayt tarama ve parazitoloji ile telepatolojide doğrulanmış uygulamalar sunan, açık kaynaklı, 3B yazıcıyla üretilebilen robotik dijital mikroskop — ayrıntılı araç notuna bakın: [OpenFlexure Microscope](openflexure-microscope.md) ve literatür incelemesi Robotic microscopy for everyone: the OpenFlexure Microscope.

- **Web sitesi:** [openflexure.org/projects/microscope](https://openflexure.org/projects/microscope/)
- **GitHub:** [rwb27/openflexure_microscope](https://github.com/rwb27/openflexure_microscope) | **GitLab:** [openflexure/openflexure-microscope](https://gitlab.com/openflexure/openflexure-microscope)
- **Makale:** Collins ve ark., *Biomedical Optics Express* 2020 ([DOI: 10.1364/BOE.385729](https://doi.org/10.1364/BOE.385729))

{% embed url="https://openflexure.org/projects/microscope/" %}

{% embed url="https://github.com/rwb27/openflexure_microscope" %}

### [M-Optimus](https://www.bioptimus.com/m-optimus)

Bioptimus (Paris, Fransa) tarafından geliştirilen çok modlu (multimodal) biyolojik dünya modeli ve dijital patoloji temel (foundation) platformu. Rutin Hematoksilen ve Eozin (H&E) tüm slayt histolojisini moleküler genetikle (bulk RNA-seq ve uzamsal transkriptomik) ilişkilendirerek in silico uzamsal transkriptomik gerçekleştirir; 6.000'den fazla genin uzamsal ekspresyon haritalarını yalnızca H&E tüm slayt görüntülerinden ya da bunları bulk RNA-seq ile eşleştirerek yeniden oluşturur. 10x Genomics Xenium Prime'a karşı doğrulanmış ($r = 0.81$) ve hedefe yönelik tedaviye direncin uzamsal mikroçevre biyobelirteçlerini saptamak amacıyla arşiv klinik kohortlarında (TCIA) uygulanmıştır — ayrıntılı araç notuna bakın: [M-Optimus](m-optimus.md) ve literatür incelemesi From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer.

- **Web sitesi:** [bioptimus.com/m-optimus](https://www.bioptimus.com/m-optimus)
- **Teknik Tanıtım:** [bioptimus.com/introducing-m-optimus](https://www.bioptimus.com/introducing-m-optimus)
- **STELA Veri Konsorsiyumu:** [bioptimus.com/stela](https://www.bioptimus.com/stela)

{% embed url="https://www.bioptimus.com/m-optimus" %}

### [PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas)

Patoloji temel modellerinin (foundation models) içinde hangi morfolojik kavramların düzenlendiğini denetlemek amacıyla Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden) tarafından geliştirilen, PyTorch ve Captum tabanlı açık kaynaklı bir yorumlanabilirlik çerçevesi (Gustav ve ark., *Cell Reports Medicine* 2026). Fourier ile parametrelendirilmiş sınıf görselleştirmeleri (class visualizations, CV) ve t-SNE ızgara birleştirmesiyle katman bazında aktivasyon atlasları (activation atlases, AA) üretir; etkileşimli bir masaüstü grafik arayüz (GUI) görüntüleyicisi ve patologların kör (blinded) anotasyonu için bir yazılım içerir — ayrıntılı araç notuna bakın: [PathoActivationAtlas](pathoactivationatlas.md) ve literatür incelemesi Class visualizations and activation atlases for computational pathology.

- **GitHub:** [KatherLab/PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas) — MIT Lisansı (Captum bileşenleri BSD-3-Clause altında)
- **Makale:** Gustav ve ark., *Cell Reports Medicine* 2026 ([DOI: 10.1016/j.xcrm.2026.103054](https://doi.org/10.1016/j.xcrm.2026.103054))

{% embed url="https://github.com/KatherLab/PathoActivationAtlas" %}

### [TRIDENT](https://github.com/mahmoodlab/trident)

Mahmood Lab (Harvard Medical School / Brigham and Women's Hospital) tarafından, büyük ölçekli tüm slayt görüntüsü işleme, doku segmentasyonu ve 33'ten fazla yama (patch) kodlayıcısı (UNI, CONCH, Virchow, GigaPath, H-Optimus) ile 8'den fazla slayt kodlayıcısı (TITAN, PRISM, GigaPath, CHIEF) üzerinden öznitelik çıkarımı için geliştirilmiş, endüstriyel düzeyde, açık kaynaklı bir Python araç seti. Derin sinir ağı tabanlı segmentasyon (HEST, GrandQC), çoklu GPU parçalama (sharding), QuPath GeoJSON kontur dışa aktarımı, eşzamansız SSD önbellekleme, çökmeye dayanıklı kilitlenme (deadlock) kurtarma ve 42 görevli Patho-Bench paketiyle entegrasyon özellikleri sunar — ayrıntılı araç notuna bakın: [TRIDENT](trident.md) ve literatür incelemesi Accelerating Data Processing and Benchmarking of AI Models for Pathology.

- **GitHub:** [mahmoodlab/TRIDENT](https://github.com/mahmoodlab/trident)
- **Belgeler:** [trident-docs.readthedocs.io](https://trident-docs.readthedocs.io/en/latest/)
- **Makale:** Zhang ve ark., arXiv 2025 ([DOI: 10.48550/arXiv.2502.06750](https://doi.org/10.48550/arXiv.2502.06750))

{% embed url="https://github.com/mahmoodlab/trident" %}

### [STAMP](https://github.com/KatherLab/STAMP)

Solid Tumor Associative Modeling in Pathology; Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden; RWTH Aachen; University Medical Center Mainz) tarafından, doğrudan tüm slayt görüntülerinden klinik biyobelirteç tahmini, çok hedefli sınıflandırma, sürekli regresyon ve sağkalım analizi için geliştirilmiş, uçtan uca, zayıf denetimli (weakly supervised) bir derin öğrenme iş akışı. 18'den fazla temel model öznitelik çıkarıcısı (UNI2, Virchow2, CONCH1.5, H-Optimus, CTransPath) için standartlaştırılmış ön işleme, hasta düzeyinde sanal slayt birleştirme, slayt bağlamlandırıcıları (TITAN, PRISM, GigaPath, COBRA2, EAGLE, MADELEINE, CHIEF), birden çok MIL (çoklu örnek öğrenmesi) mimarisi (ViT, TransMIL, Barspoon), dikkat (attention) ısı haritaları, sınıf haritaları, en yüksek/en düşük tahmin gücüne sahip döşemelerin çıkarılması ve [STAMP-Workbench](https://github.com/KatherLab/STAMP-Workbench) web arayüzüyle eşleştirilmiş yerleşik Model Context Protocol (FastMCP) sunucu orkestrasyonu (`mcp/server.py`) özellikleri sunar — ayrıntılı araç notuna bakın: [STAMP](stamp.md) ve yayımlanmış protokol incelemesi From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology.

- **GitHub:** [KatherLab/STAMP](https://github.com/KatherLab/STAMP) — MIT Lisansı
- **Workbench Arayüzü:** [KatherLab/STAMP-Workbench](https://github.com/KatherLab/STAMP-Workbench)
- **Makale:** El Nahhas ve ark., *Nature Protocols* 20, 293–316 (2025) ([DOI: 10.1038/s41596-024-01047-2](https://doi.org/10.1038/s41596-024-01047-2), [PMID: 39285224](https://pubmed.ncbi.nlm.nih.gov/39285224/))

{% embed url="https://github.com/KatherLab/STAMP" %}

### [Celldega](https://github.com/broadinstitute/celldega)

Broad Institute'tan, uzamsal omik ve tek hücre verilerinin not defterlerinde (notebooks) ve web tarayıcılarında etkileşimli olarak incelenmesi için kaynak kodu erişilebilir (source-available) bir Python + JavaScript araç seti. Ayrıntılı [Celldega notuna](celldega.md) bakın.

**Lisans 1 Ekim 2026'da kontrol edildi:** [Broad Institute Academic Software License](https://github.com/broadinstitute/celldega/blob/726b57cfeff1a0e70b06b91b079bd592b91daeca/LICENSE.txt), kaynak deposundaki `726b57c` commit'i itibarıyla. İzin, akademik/kâr amacı gütmeyen kurumlardaki araştırmacıların belirli eğitim ve akademik araştırma kullanımları için verilmektedir; ticari kuruluşlar lisans için Broad'a yönlendirilmektedir. Kaynak kodun erişilebilir olmasından serbest yeniden kullanım izni olduğu sonucunu çıkarmayın.

**Makale:** Fernandez N, Ishar J, Wang H, Ben Saad A, Lipinski M, Farhi SL. *Celldega: Integrated Toolkit for Visualization and Analysis of Spatial Data.* bioRxiv ön baskısı (preprint), yayımlanma tarihi 2026-08-21 (DOI: 10.64898/2026.08.13.744672).

#### Uzamsal Patolojideki Güçlük
Uzamsal transkriptomik ve yüksek pleksli (high-plex) uzamsal proteomik, hücresel fenotipleri, hücre–hücre iletişimini ve mikroçevresel doku mimarisini tanımlamak için yüksek boyutlu moleküler ölçümleri yüksek çözünürlüklü mikroskopiyle birleştirir. Ancak uzamsal teknolojiler olgunlaştıkça iki önemli hesaplama darboğazı ortaya çıkmıştır:
1. **Görselleştirme ve Ölçek Sınırları:** Açık kaynaklı görselleştirme araçları ~1 milyar transkriptin ve milyonlarca segmente edilmiş hücrenin ötesine ölçeklenemez; ciddi bellek şişmesi veya arayüz gecikmesi yaşar.
2. **Ekosistem ve Kullanılabilirlik Engelleri:** Ticari görüntüleyiciler pahalı, kapalı kaynaklı ve satıcıya bağımlıdır (vendor-locked); özel veri iş akışlarıyla (Scanpy, Squidpy ve AnnData/SpatialData gibi) entegrasyonları yoktur.

#### Teknik Mimari ve Mühendislik Yenilikleri
Celldega; Python ön işlemesini, optimize edilmiş sütunsal (columnar) dosya formatlarını ve yüksek performanslı WebGL/WebAssembly ön yüzlerini bir araya getiren uçtan uca bir çerçeve sunar:

- **DegaFiles ve Satır Grubu (Row Group) Depolama Modu:**
  - Geleneksel döşeme (tile) tabanlı mimariler 50.000'den fazla tekil dosya (transkriptler, hücre poligonları, gen matrisleri ve WebP Deep Zoom görüntü döşemeleri) üretir ve bu sayı bulut barındırma sınırlarını aşar.
  - Celldega, analitik formüle dayalı bir indeksle (`row_group_index = tile_x * num_tiles_y + tile_y`) birleştirilmiş bir **Apache Parquet / GeoParquet** formatı uygular.
  - Tarayıcıda **HTTP Range Requests** (HTTP aralık istekleri) yürütmek için **ParquetWASM** (WebAssembly'ye derlenmiş Rust) ve **Apache Arrow** bellek içi yapılarını kullanır; tüm veri setlerini indirmeden yalnızca görünür görüntü alanı (viewport) için gereken bayt aralıklarını aktarır. Dosya sayısını >50.000'den ~10 birleştirilmiş Parquet dosyasına indirir.
- **Donanım Hızlandırmalı İşleme (Rendering):** Çok kanallı mikroskopi görüntü piramitlerinin, poligon segmentasyon maskelerinin ve tek molekül transkript konumlarının GPU hızlandırmalı işlenmesi için [deck.gl](https://deck.gl/) kullanır.

#### Özelleşmiş Görselleştirme Modları
Celldega, farklı uzamsal analiz iş akışları için tasarlanmış bütünleşik bir görünüm seti sunar:
- **`Landscape`:** Piramidal mikroskopiyi (H&E, DAPI, çok kanallı floresan), hücre segmentasyon sınırlarını, tek tek transkriptleri ve uzamsal komşuluk katmanlarını gösteren; gerçek zamanlı gen arama ve kategorik özet histogramlarıyla donatılmış, 2B etkileşimli, çok katmanlı doku tuvali.
- **`Yearbook`:** Morfolojik karşılaştırma ve hızlı fenotipleme için tek tek hücreleri merkeze alan hücre "portrelerinden" oluşan, eşzamanlı bir ızgara (satır/sütun sayısı ayarlanabilir). Durumsuz (stateless) tarayıcı tarafı sorgulamayı (`front_end_query`) veya AnnData'dan programatik seçimi destekler.
- **`CellCloud` ve `NeighborhoodCloud`:** Seri kesitler ve kalın dokular boyunca milyonlarca hücre merkezini (centroid) ve alfa-şekilli (alpha-shape) komşuluk poligonlarını gösteren 3B yörüngesel kamera görünümleri (60 FPS'yi korumak için hücre merkezleri istek üzerine akış hâlinde aktarılır).
- **`Clustergram` ve `Composition`:** Etkileşimli dendrogram kesme olanağı sunan (Clustergrammer üzerine kurulu), hiyerarşik kümelenmiş ısı haritaları; uzamsal görünümlere çift yönlü bağlıdır (`spatial_clustergram`), böylece kümeler veya genler seçildiğinde doku kesitindeki ilgili hücreler anında vurgulanır.
- **`Enrich`:** Seçilen doku bölgelerinden elde edilen belirteç (marker) gen listelerine işlevsel anotasyon yapmak için doğrudan [Enrichr](https://maayanlab.cloud/Enrichr/) API'sine (ör. `CellMarker_2024`, GO) bağlanan, bütünleşik, gerçek zamanlı bir gen seti zenginleştirme aracı.

#### Doğrulanmış Platformlar ve Ölçek
- **Desteklenen Teknolojiler:** 10x Genomics Xenium ve Xenium Prime, NanoString CosMx SMI, 10x Visium HD, Vizgen MERSCOPE ve tek hücre Chromium.
- **Ölçek Kıyaslamaları:** 1 milyarı aşan transkript içeren veri setlerinde, çok kesitli seri hizalama veri setlerinde ve **dört milyondan fazla hücreden** oluşan, gelişmekte olan tüm bir fare başının tam 3B rekonstrüksiyonunda gösterilmiştir.
- **Bulut ve İş Akışı Entegrasyonu:** Cellpose, InstanSeg ve Starfish ile tekrarlanabilir otomatik ön işleme için Terra.bio üzerindeki WDL iş akışlarıyla (`stp_segmentation_wdl`) entegre çalışır.

#### Dijital ve Hesaplamalı Patolojiyle İlişkisi
Celldega, ham uzamsal omik veri işleme ile tanısal/translasyonel slayt değerlendirmesi arasındaki boşluğu kapatır:
- Özel GPU sunucu altyapısı gerektirmeden, hafif, kurulum gerektirmeyen, tarayıcı tabanlı incelemeye ve herkese açık web galerilerine olanak tanır.
- Patologların tek hücre morfolojisini incelemesini, segmentasyon sınırlarını histolojik referans doğruya (ground truth) karşı doğrulamasını ve yerel mikroçevresel gradyanları (ör. tümör–immün arayüzleri, adacık komşulukları, tersiyer lenfoid yapılar) tek ve bütünleşik bir çalışma alanında sorgulamasını sağlar.

{% embed url="https://github.com/broadinstitute/celldega" %}

{% embed url="https://broadinstitute.github.io/celldega/" %}

{% embed url="https://www.biorxiv.org/content/10.64898/2026.08.13.744672v2" %}

{% embed url="https://molab.marimo.io/notebooks/nb_A6JG5XUg5EPJyMwNDcsM18" %}

### [HistoMetPath](https://github.com/drehsangharib/HistoMetPath)

**Benimsenecek bir yazılım değil** — modelleri 30 slaytlık geliştirme ürünleri olan (en iyi AUROC 0,68, dış validasyon yok), tek yazarlı bir MIL araştırma çerçevesi. Bunun yerine değerlendirme yönetişimi (evaluation governance) koduna bakmak için okuyun: sağlama toplamlarıyla (checksum) zorunlu kılınan, yalnızca bir kez açılabilen ayrılmış (held-out) bir test seti, test bölümünün yapılandırma yüklenirken reddedilmesi ve ilk piksel okunmadan önce harcanan bir çalıştırma sayacı — bkz. HistoMetPath.

{% embed url="https://github.com/drehsangharib/HistoMetPath" %}

### [WSInfer](https://github.com/SBU-BMI/wsinfer)

Önceden eğitilmiş bir yama (patch) sınıflandırma modelini tüm slayt boyunca uygular ve döşeme başına bir olasılık haritası döndürür — QuPath katmanı (overlay) olarak ya da komut satırından CSV ve GeoJSON olarak. Sekiz model (TCGA tümör sınıflandırıcıları, pan-kanser lenfositleri, PatchCamelyon lenf nodu metastazı, NCT-CRC-HE-100K kolorektal doku) bir Hugging Face model deposundan (zoo) gelir; kendi TorchScript modeliniz ve bir yapılandırma dosyası da kullanılabilir. **Python paketini değil, QuPath eklentisini kullanın**: çalışma zamanı (runtime) Temmuz 2024'ten bu yana hiç commit almamıştır ve son iki hata düzeltmesi yayımlanmamıştır; buna karşın eklentinin bakımı QuPath grubu tarafından yapılmaktadır ve QuPath 0.6 gerektirir — bkz. [WSInfer](wsinfer.md).

{% embed url="https://github.com/SBU-BMI/wsinfer" %}

{% embed url="https://github.com/qupath/qupath-extension-wsinfer" %}

### [nanopath](https://github.com/MedARC-AI/nanopath)

MedARC'tan, **döşeme düzeyindeki patoloji temel modellerini sıfırdan ön eğitmek (pretraining)** için Karpathy'nin nanochat projesi örnek alınarak hazırlanmış yalın bir test düzeneği (harness): tek GPU, 1.000.000 TCGA döşeme sunumu, 1e18 FLOP üst sınırı ve ardından döşeme sınıflandırması, nükleer segmentasyon, slayt düzeyinde progresyon, mutasyon, sağkalım ve dayanıklılığı (robustness) kapsayan, sabit, 12 veri setlik bir yoklama (probe) paketi (THUNDER, PathoBench ve LEOPARD'dan alınmıştır). Amaç, gerçek hesaplama kaynağı harcamadan önce bir eğitim fikrini ucuza test etmektir. Apache-2.0; Nisan 2026'dan bu yana 139 commit, esasen tek yazarlı (Paul Scotti). 120 GB'lık, önceden döşemelere ayrılmış TCGA parquet seti Hugging Face'te `medarc/nanopath` adıyla bulunmaktadır; dolayısıyla başlamak için WSI işlemeye gerek yoktur — ancak döşemeye ayırma işlemini ham SVS dosyalarından yeniden üretmek, ~13 TB'lık açık erişimli TCGA slayt setinin tamamını gerektirir.

Buradaki asıl değeri **dondurulmuş temel model (frozen-baseline) tablosudur**: UNI-2-h, H-optimus-0, Virchow, Prov-GigaPath, Midnight-12K, OpenMidnight, EXAONE-Path-2.5, GenBio-PathFM ve üç DINOv2 boyutunun tümü aynı yoklama paketinden geçirilmiştir. Bu ölçekte en iyi topluluk modeli (0,6676, tek GPU) Virchow'un (0,6591) ve GigaPath'in (0,6456) üzerinde, ancak GenBio-PathFM (0,6917), UNI-2-h (0,6782) ve H-optimus-0'ın (0,6763) altında yer almaktadır — bakımcıların kendilerinin de belirttiği bir çekinceyle: her omurganın kendi öznitelik genişliği (384-d ile 4608-d arası) yoklama başlıklarına kontrolsüz biçimde girdi olarak verilmektedir. Örnek alınmaya değer metodolojik ayrıntı `benchmarking/` klasöründedir: her yoklama bir **rastgele ağırlıklı null denetimi (randomised-weight null audit)** içerir — eğitilmemiş bir DINOv2-small modelinin 20 tohum (seed) değeriyle aynı yoldan geçirilmesi — ve veri seti başına notlar hangi yoklamaların bu denetimde başarısız olduğunu açıkça belirtir. UCLA-Lung progresyonunun null değeri 0,692 ± 0,004'tür; bu değer doğal görüntülerle eğitilmiş tüm DINOv2 checkpoint'lerinin üzerinde ve mevcut sıralama liderinin düzeyindedir; ilgili not bunu "a caution flag" (bir uyarı işareti) ve "not a clean representation-quality readout in isolation" (tek başına temiz bir temsil kalitesi göstergesi değil) olarak nitelendirir. LEOPARD BCR de benzerdir (null 0,633 ± 0,012). Üst düzeydeki README dosyalarının hiçbiri bu çekinceleri, sekiz yoklama ailesinin tümünün eşit ağırlıkla ortalamasını alan manşet `mean_probe_score` değerine taşımamaktadır — dolayısıyla sıralama, veri seti başına notların gürültü olarak işaretlediği sütunları da içine almaktadır. Yine de bir gürültü koruması vardır, ancak bu o değildir: yeni bir lider eskisini 0,006 farkla geçmeli ve bakımcı tarafından farklı bir rng tohum değeriyle yapılan yeniden çalıştırmada da üstünlüğünü korumalıdır.

{% embed url="https://labless.dev/nano-projects/nanopath" %}

{% embed url="https://github.com/MedARC-AI/nanopath" %}

{% embed url="https://huggingface.co/datasets/medarc/nanopath" %}

### [HoVer-NeXt](https://github.com/digitalpathologybern/hover_next_train)

Bern Üniversitesi'nden (Dijital Patoloji grubu / Prof. Inti Zlobec; Baumann ve ark., MIDL 2024) modernleştirilmiş, yüksek verimli bir nükleer örnek (instance) segmentasyonu ve sınıflandırma iş akışı. Klasik HoVer-Net mimarisini; ConvNeXt-V2 omurgaları (Tiny/Base/Large), ayrıştırılmış çok başlıklı U-Net kod çözücüleri (5 kanallı uzaklık haritaları ve çok sınıflı hücre tiplendirmesi), yerleşik çok iş parçacıklı tüm slayt çıkarımı (OpenSlide, CZI, Zarr) ve QuPath `.tsv` ölçüm tablolarına doğrudan dışa aktarım ile yeniden tasarlar. Lizard-Mitosis (7 sınıf) ve PanNuke (19 dokuda 5 sınıf) için önceden eğitilmiş checkpoint'ler Zenodo'da mevcuttur — bkz. [HoVer-NeXt](hover-next.md).

- **Eğitim Kodu:** [digitalpathologybern/hover_next_train](https://github.com/digitalpathologybern/hover_next_train)
- **Çıkarım İş Akışı:** [digitalpathologybern/hover_next_inference](https://github.com/digitalpathologybern/hover_next_inference)
- **Makale:** [MIDL 2024 (OpenReview)](https://openreview.net/pdf?id=3vmB43oqIO)

{% embed url="https://github.com/digitalpathologybern/hover_next_train" %}

{% embed url="https://github.com/digitalpathologybern/hover_next_inference" %}

### [From Samples to Knowledge 2025: QuPath Training Course](https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp)

La Jolla Institute for Immunology'den (Dr. Zbigniew Mikulski ve Dr. Sara McArdle), güncel QuPath v0.6.0+ biyogörüntü iş akışlarını hedefleyen kapsamlı, uygulamalı bir müfredat. 18 pleksli multipleks immünofloresanı (RareCyte Orion), Deep Java Library (DJL / InstanSeg) aracılığıyla yerleşik derin öğrenme tabanlı hücre segmentasyonunu, kohortların toplu işlenmesi için Groovy betik iş akışlarını, karmaşık çok belirteçli bileşik fenotiplemeyi, çok modlu görüntü çakıştırmayı (registration) (Warpy / `qupath-extension-warpy`), uzamsal yakınlık/yoğunluk ölçütlerini ve etkileşimli Python/Jupyter köprülemesini (QuBylab / Paquo) kapsar — ayrıntılı kurs notuna bakın: [From Samples to Knowledge 2025: QuPath Training Course](../Clippings/From%20Samples%20to%20Knowledge%202025%20-%20QuPath%20Training%20Course.md).

- **Kurs Kitabı:** [saramcardle.github.io/FS2K](https://saramcardle.github.io/FS2K/README.html)
- **Depo:** [saramcardle/FS2K](https://github.com/saramcardle/FS2K)
- **Video Oynatma Listesi:** [YouTube Oynatma Listesi (14 video)](https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp)
- **Çakıştırma (Registration) Aracı:** [BIOP/qupath-extension-warpy](https://github.com/BIOP/qupath-extension-warpy)

{% embed url="https://www.youtube.com/playlist?list=PLlGXRBscPbCCA1yGCThNqdYKgTPOvjigp" %}

{% embed url="https://github.com/saramcardle/FS2K" %}

### [HistoCAM](https://github.com/cooopermaira/HistoCAM_Nature_Communications)

Tulane University ve Kitware, Inc. araştırmacıları tarafından geliştirilen, cam slayt mikroskopisi için ortam tabanlı (ambient), gerçek zamanlı dijitalleştirme ve verileştirme (datafication) platformu (Maira ve ark., *Nature Communications* 2026). 31 megapiksellik, yüksek uzay-bant genişliğine sahip bir kamerayı C++ akış motoruyla (`pathcam`) birleştirerek standart optik inceleme sırasında çok çözünürlüklü WSI piramitlerini (2X ile 40X arası) pasif olarak oluşturur, patoloğun tarama yörüngelerini ve bekleme (dwell) sürelerini kaydeder ve gerçek zamanlı TensorRT yapay zekâ segmentasyonunu doğrudan mikroskop başında yürütür — ayrıntılı araç notuna bakın: [HistoCAM](histocam.md) ve literatür incelemesi [Ambient, real-time digitization and datafication of glass slide microscopy towards AI-at-the-microscope](../Clippings/Ambient,%20real-time%20digitization%20and%20datafication%20of%20glass%20slide%20microscopy%20towards%20AI-at-the-microscope.md).

- **GitHub:** [cooopermaira/HistoCAM_Nature_Communications](https://github.com/cooopermaira/HistoCAM_Nature_Communications)
- **Makale:** [Nature Communications (DOI: 10.1038/s41467-026-77887-1)](https://doi.org/10.1038/s41467-026-77887-1)
- **Zenodo Kıyaslama Verisi:** [Zenodo Kaydı 21970445](https://zenodo.org/records/21970445)

{% embed url="https://github.com/cooopermaira/HistoCAM_Nature_Communications" %}

{% embed url="https://www.nature.com/articles/s41467-026-77887-1" %}

### [SlidePrep](https://github.com/INOU-2025/SlidePrep)

Universidade de Vigo ve IIS Galicia Sur'da geliştirilen (Rodriguez-Conde, Campos & Fdez-Riverola, *SoftwareX* 2026), mikroskopi döşemesi ön işleme, sayım kamarası ızgara artefaktı giderme ve tüm slayt görüntüsü birleştirme (stitching) için açık kaynaklı bir iş akışı. Parlak alan (brightfield) döşemelerindeki kazınmış referans ızgaralarını (retiküller) 3 sınıflı çok düzeyli Otsu eşiklemesi (`Combined Differential`), yönlü şablon eşleştirme ve Random Forest kontur iyileştirmesi ile ayırır ($F_1 = 0.9934$ döşeme düzeyinde, $0.9642$ piksel düzeyinde); örtülen preparat bölgelerini LaMa Fourier-konvolüsyon iç boyama (inpainting) yöntemiyle yeniden oluşturur (5,6× GPU hızlanması) ve kalibre edilmiş çok kanallı **OME-TIFF** mozaiklerini ASHLAR ile birleştirir; buna tam mozaik ikili köken (provenance) maskesi (`_inpaint_mask.tif`) ve konteynerleştirilmiş FastAPI + Celery + Angular 21 + OpenSeadragon web görüntüleyicisi eşlik eder — ayrıntılı araç notuna bakın: [SlidePrep](slideprep.md) ve literatür incelemesi SlidePrep: artifact removal, reconstruction, and visualization of whole-slide images from tiled microscopy acquisitions.

- **GitHub:** [INOU-2025/SlidePrep](https://github.com/INOU-2025/SlidePrep) — MIT Lisansı (v1.0.4)
- **Makale:** Rodriguez-Conde ve ark., *SoftwareX* 36 (2026) 103161 ([DOI: 10.1016/j.softx.2026.103161](https://doi.org/10.1016/j.softx.2026.103161))

{% embed url="https://github.com/INOU-2025/SlidePrep" %}

<!-- tolaria:related:start -->

## See also

* [Celldega](celldega.md)
* [Cytario](cytario.md)
* [Cytomine](cytomine.md)
* [From Samples to Knowledge 2025: QuPath Training Course](../Clippings/From%20Samples%20to%20Knowledge%202025%20-%20QuPath%20Training%20Course.md)
* [HistoCAM](histocam.md)
* [HoVer-NeXt](hover-next.md)
* [NuClick](nuclick.md)
* [OpenFlexure Microscope](openflexure-microscope.md)
* [QuPath Python and MCP Ecosystem](qupath-python-and-mcp.md)
* [QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO](../Clippings/QuPath-MCP%20and%20Python%20Interoperability%20-%20AI%20Agent%20Servers%2C%20QuBaLab%2C%20Py4J%2C%20and%20PAQUO.md)
* [SlidePrep](slideprep.md)
* [TRIDENT](trident.md)

<!-- tolaria:related:end -->
