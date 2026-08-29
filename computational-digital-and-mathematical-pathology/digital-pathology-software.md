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

Open-source Python + JavaScript library from the Broad Institute (Platform Innovation Lab) for scalable, interactive visualization and analysis of spatial-omics data. Repository, docs, preprint, and a runnable marimo notebook demo.

**Paper:** Fernandez N, Ishar J, Wang H, Ben Saad A, Lipinski M, Farhi SL. *Celldega: Integrated Toolkit for Visualization and Analysis of Spatial Data.* bioRxiv preprint, posted 2026-08-18 (DOI: 10.64898/2026.08.13.744672).

**The problem it addresses.** Spatial transcriptomics pairs high-dimensional single-cell measurements with microscopy to read out cellular states, cell–cell communication, and tissue organization. As datasets have grown, two bottlenecks emerged: computational analysis struggles to keep up, and visualization breaks down — open-source viewers fail to scale past ~1 billion transcripts, while commercial tools are costly, closed-source, and inflexible.

**What Celldega does.** It combines multi-modal data processing, high-dimensional and spatial analysis, and integrated visualization in one toolkit. Key pieces:
- A **visualization-specific file format** (DegaFiles, with row-group storage) engineered for fast, scalable rendering.
- **Neighborhood analysis** and support for custom analyses.
- **Interactive exploration** in both notebooks and shareable public web galleries, spanning the full lifecycle from quality control to a published gallery.
- Purpose-built view types — Landscape, Yearbook, CellCloud, NeighborhoodCloud, Clustergram, Composition, Enrich — with worked examples across platforms (10x Xenium / Xenium Prime, NanoString CosMx, Visium HD, Chromium).

**Scale demonstrated.** Validated across multiple technologies, tissues, and datasets, including a 3D reconstruction of the developing whole mouse head comprising over four million cells.

**Relevance to pathology.** Spatial-omics is moving from research into tissue-based diagnostics; a free, scriptable, browser-based viewer that handles billion-transcript slides and produces shareable galleries lowers the barrier for pathology labs to explore and present spatial data without vendor lock-in.

{% embed url="https://github.com/broadinstitute/celldega" %}

{% embed url="https://broadinstitute.github.io/celldega/" %}

{% embed url="https://www.biorxiv.org/content/10.64898/2026.08.13.744672v2" %}

{% embed url="https://molab.marimo.io/notebooks/nb_A6JG5XUg5EPJyMwNDcsM18" %}



