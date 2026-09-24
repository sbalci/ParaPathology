---
type: Tool
status: Developing
language: en
title: "Cytomine"
aliases:
  - "Cytomine"
order: 70
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Cytario]]"
  - "[[Digital Pathology Software]]"
  - "[[Micro-Manager]]"
  - "[[Openmicroscopy]]"
  - "[[WSInfer]]"
  - "[[Image Analysis]]"
repo: https://github.com/cytomine/cytomine
documentation: https://doc.uliege.cytomine.org/
url: https://uliege.cytomine.org/
source_type: repository
license: Apache-2.0
---

# Cytomine

Open-source, web-based platform for **collaborative analysis of multi-gigapixel whole-slide biomedical images** (WSI). Originally created at the University of Liège (ULiège), Belgium, Cytomine turns whole-slide images into a shared, web-accessible database: users view multi-resolution pyramids in a browser, draw and share vector annotations backed by a spatial database, structure labels through hierarchical ontologies, and run containerized machine-learning algorithms on slide tiles asynchronously.

- **Source Repository:** [cytomine/cytomine](https://github.com/cytomine/cytomine) — Apache-2.0
- **ULiège Academic Portal:** [uliege.cytomine.org](https://uliege.cytomine.org/)
- **Documentation & Deployment Guides:** [doc.uliege.cytomine.org](https://doc.uliege.cytomine.org/)
- **TIA Centre Cytomine Apps:** [TissueImageAnalytics/cytomine-app](https://github.com/TissueImageAnalytics/cytomine-app)
- **Primary Citation:** Marée R, Rollus L, Stevens B, et al. *Collaborative analysis of multi-gigapixel imaging data using Cytomine.* Bioinformatics 2016;32(9):1395–1401 (DOI: [10.1093/bioinformatics/btw013](https://doi.org/10.1093/bioinformatics/btw013)).

---

## Architecture & Technical Infrastructure

Cytomine is deployed as a suite of cooperating microservices using **Docker Compose** or **Kubernetes** (K3s / Helm):

1. **Core Application Server & REST API:**
   - Implemented in Java / Grails with Spring and Hibernate.
   - Handles authentication, access control (users, roles, projects), collections, and metadata.
   - Exposes a RESTful API covering all user, image, annotation, and algorithmic functions.
2. **Spatial Database (PostgreSQL + PostGIS):**
   - Stores geometric annotations (points, polygons, multipolygons, ellipses, rectangles) as true PostGIS spatial geometries (WKT / GeoJSON).
   - Allows high-performance spatial indexing (`R-Tree` / `GiST`), bounding-box intersections, and region-of-interest (ROI) filtering across gigapixel coordinate spaces without loading slide files into memory.
3. **Event Store & Logging (MongoDB):**
   - Tracks user interactions, viewing sessions, zoom/pan navigation histories, and audit logs.
4. **Tile Server / Image Management Server (IMS):**
   - Interfaces whole-slide image formats (Aperio `.svs`, Hamamatsu `.ndpi`, Zeiss `.czi`, Ventana `.bif`, Philips `.tiff`, DICOM WSI, Mirax, etc.) using [OpenSlide](https://openslide.org/), [Bio-Formats](https://www.openmicroscopy.org/bio-formats/), and `libvips`.
   - Generates and caches multi-resolution image tiles on demand over HTTP (compatible with DeepZoom / IIP protocols).
5. **Message Broker & Asynchronous Task Queue (RabbitMQ):**
   - Coordinates background jobs, image conversion pipelines, and containerized computational algorithms.
6. **Web Client (Frontend):**
   - Single-page application (modern Vue.js / OpenLayers / OpenSeadragon architecture).
   - Delivers interactive multi-resolution viewing, synchronized multi-slide side-by-side comparison, collaborative live broadcast/screen-sharing (for multi-observer consultation), and ontology management.
7. **Client Libraries / SDKs:**
   - Official Python client library (`cytomine-python-client`), Java client (`cytomine-java-client`), and JavaScript SDK allowing automated scripting, slide ingestion, batch annotation export, and algorithm orchestration.

---

## Core Capabilities for Digital & Computational Pathology

### 1. Multi-Observer Collaborative Annotation
In desktop tools such as QuPath, annotations typically reside in local project files or XML exports, creating file-synchronization barriers. In Cytomine:
- Annotations are **database-backed first-class entities** associated with an author, timestamp, spatial geometry, and ontology terms.
- Multiple pathologists and researchers can annotate the same slide concurrently.
- Supports independent layers: individual users can toggle colleagues' or automated models' annotation layers on and off.
- Real-time collaborative viewing ("broadcast mode") enables remote telepathology consultations and multi-head virtual microscopy sessions.

### 2. Standardized Ontologies
Cytomine structures slide interpretations using formal **ontologies**:
- Users construct hierarchical terminology trees (e.g., Gleason patterns, histological tumor subtypes, inflammatory cell types, necrosis, stroma).
- Each term is assigned a color, code, and parent category.
- Pathologists apply terms to vector annotations with single keystrokes, ensuring machine-learning pipelines receive clean, standardized training labels.

### 3. Asynchronous Algorithm Execution ("Cytomine Apps")
Cytomine decouples heavy deep-learning inference from the browser:
- Algorithms are packaged into **Docker containers** ("software apps") registered in the Cytomine instance.
- An analysis container accepts slide identifiers, region boundaries, and parameters via command-line arguments or API calls.
- The container queries the Cytomine REST API to pull image tiles, runs GPU/CPU inference, and posts predicted polygons, classifications, and continuous heatmaps directly back to the PostGIS annotation database.
- Results appear immediately in the pathologist's browser viewer as reviewable annotation layers.

---

## TIA Centre Cytomine Apps (Warwick / TIAToolbox)

The **Tissue Image Analytics (TIA) Centre** at the University of Warwick (led by Prof. Nasir Rajpoot) maintains an open-source repository integrating state-of-the-art computational pathology models into Cytomine:

* **Repository:** [TissueImageAnalytics/cytomine-app](https://github.com/TissueImageAnalytics/cytomine-app) (Apache-2.0)
* **Model Weights:** Hosted publicly on Hugging Face ([TIACentre](https://huggingface.co/TIACentre))

This repository wraps models from [TIAToolbox](https://github.com/TissueImageAnalytics/tiatoolbox) into standard Cytomine Docker apps:

1. **`cytomine-hovernet`:**
   - Implements **HoVer-Net** (Horizontal and Vertical distance maps) trained on the multi-organ **PanNuke** benchmark.
   - Performs simultaneous **nuclear instance segmentation and 5-class classification** (neoplastic, inflammatory, connective/stromal, dead/apoptotic, non-neoplastic epithelial).
   - Generates segmented cell boundary polygons in Cytomine with assigned ontology terms matching the cellular phenotypes.
2. **`cytomine-kongnet`:**
   - Implements **KongNet** for fast, high-density nucleus detection and centroid localization, trained on the MONKEY Challenge dataset.
3. **`cytomine-interactive-segmentation-nuclick`:**
   - Implements **NuClick** interactive segmentation trained on PanNuke.
   - Pathologists place guide-point clicks near nuclei of interest within the Cytomine web canvas; the app returns precise, morphology-conforming nuclear boundaries without requiring manual polygon tracing.

---

## Cytomine vs. Desktop & Alternative Server Architectures

| Dimension | Cytomine | QuPath (Desktop) | Digital Slide Archive (DSA / HistomicsUI) |
|---|---|---|---|
| **Deployment** | Server (Docker Compose / K3s) | Single workstation desktop | Server (Docker Compose / Girder) |
| **Annotation Storage** | PostgreSQL / PostGIS database | Local SQLite / GeoJSON files | MongoDB database |
| **Multi-User Collaboration** | Native real-time multi-user, layers, broadcast | File exchange / shared network drives | Native multi-user, permissions matrix |
| **Algorithm Packaging** | Dockerized Cytomine apps (Python/Java SDK) | Groovy scripts / Java extensions | Slicer CLI Docker images with XML manifests |
| **Ontology Support** | Built-in hierarchical taxonomy trees | Flat class hierarchy | Flat or key-value metadata dictionaries |
| **Hardware Overhead** | Moderate server stack (web, DB, broker, tile server) | None (runs locally on pathologist PC) | Moderate server stack (Girder, Mongo, RabbitMQ) |
| **Client Requirement** | Web browser only (zero-install) | Desktop Java runtime install | Web browser only (zero-install) |

---

## Summary & Role in Pathology Practice

Cytomine bridges the gap between individual workstation-bound digital pathology and enterprise-grade collaborative research:
- **E-Learning & Virtual Microscopy:** Powers university-level histology and pathology courses (e.g., ULiège, Paris Descartes) where hundreds of students navigate identical slides and take digital exams.
- **Multicenter Consensus Studies:** Acts as a neutral, web-accessible repository for multi-observer reader trials, inter-observer agreement studies, and biobank cataloguing.
- **AI-in-the-Loop Annotation:** Combined with modern inference wrappers like `TissueImageAnalytics/cytomine-app`, it enables human-in-the-loop annotation workflows where deep-learning models propose cell or tissue boundaries that pathologists refine directly in their browser.

<!-- tolaria:related:start -->

## See also

* [Cytario](cytario.md)
* [Digital Pathology Software](digital-pathology-software.md)
* [Image Analysis](image-analysis.md)
* [Openmicroscopy](openmicroscopy.md)
* [WSInfer](wsinfer.md)

<!-- tolaria:related:end -->
