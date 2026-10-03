---
type: Clipping
status: Evergreen
language: en
title: "Standardization in digital pathology: Supplement 145 of the DICOM standards"
source: "https://doi.org/10.4103/2153-3539.80719"
source_type: article
doi: "10.4103/2153-3539.80719"
pmid: "21633489"
pmc: "PMC3097525"
pii: "S2153-3539(22)00199-7"
review_status: Complete
last_reviewed: 2026-10-03
author:
  - "[[Rajendra Singh]]"
  - "[[L. Chubb]]"
  - "[[Liron Pantanowitz]]"
  - "[[Anil Parwani]]"
published: 2011-05-11
created: 2026-10-03
description: "Foundational review detailing DICOM Standards Committee Working Group 26 (WG-26) Supplement 145, which established the vendor-neutral Whole Slide Microscopic Image Information Object Definition (IOD) and SOP Classes. Documents multi-resolution pyramidal tiled image storage, standardized (X, Y, Z) slide frame of reference, z-plane focal stacks, decoupled annotation series, and Modality Worklist (MWL) / MPPS workflow integration with enterprise PACS and VNAs."
tags:
  - "clippings"
  - "digital-pathology"
  - "dicom"
  - "standards"
  - "wg26"
  - "interoperability"
  - "pacs"
  - "vna"
  - "wsi"
order: 175
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Considerations for digital pathology displays]]"
  - "[[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]"
  - "[[The pathology report as a boundary object: From clinical communication to computational representation]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Quality And Standardisation]]"
---
# Standardization in digital pathology: Supplement 145 of the DICOM standards

**Singh R, Chubb L, Pantanowitz L, Parwani A.** *Standardization in digital pathology: Supplement 145 of the DICOM standards.* Journal of Pathology Informatics 2011; 2:23. Published online: 11 May 2011. DOI: [10.4103/2153-3539.80719](https://doi.org/10.4103/2153-3539.80719). PMID: [21633489](https://pubmed.ncbi.nlm.nih.gov/21633489/). PMCID: [PMC3097525](https://pmc.ncbi.nlm.nih.gov/articles/PMC3097525/). Publisher PII: [S2153-3539(22)00199-7](https://www.sciencedirect.com/science/article/pii/S2153353922001997). Open Access (CC BY 2.0).

- **Journal:** *Journal of Pathology Informatics* (Medknow / Elsevier / Association for Pathology Informatics)
- **Primary Affiliation:** Department of Pathology, Division of Pathology Informatics, University of Pittsburgh Medical Center (UPMC), Pittsburgh, PA, USA
- **Working Group:** DICOM Standards Committee Working Group 26 (Pathology) in conjunction with the College of American Pathologists (CAP)

---

## Executive Summary: The Proprietary Silo Crisis

In the first decade of digital pathology (2000–2010), the transition from traditional light microscopy to whole-slide imaging (WSI) encountered a severe structural impediment: **the complete lack of an open, vendor-neutral file format and transmission standard**.

Digitizing a standard glass slide at diagnostic resolution ($20\times$ or $40\times$, corresponding to $0.50$ to $0.25 mutext{m/pixel}$) generates uncompressed image arrays between **4 GB and 20+ GB per slide**—orders of magnitude larger than conventional radiology cross-sectional slices (CT/MRI slices are typically $512 times 512$ pixels, $\sim 0.5\text{ MB}$). Because the existing DICOM (Digital Imaging and Communications in Medicine) standards in 2005 were optimized for single-frame or modest multi-frame radiology volumetric datasets, scanner manufacturers engineered bespoke, proprietary storage architectures:

- **Aperio:** `.svs` (tiled TIFF derivative with proprietary metadata headers)
- **Hamamatsu:** `.ndpi` (multi-file JPEG/TIFF hierarchy)
- **Philips:** `.isyntax` / `.tiff` (wavelet-compressed proprietary pyramid)
- **Ventana / Roche:** `.bif` (proprietary pyramidal TIFF)
- **3DHistech:** `.mrxs` (folder structure containing index files and JPEG chunks)
- **Zeiss:** `.czi` (proprietary hierarchical bio-format container)

This proliferation of closed formats created severe operational friction:

1. **Vendor Lock-In:** A laboratory purchasing scanner hardware from Vendor A was compelled to purchase viewing software, image management software, and storage infrastructure from Vendor A.
2. **Economic Redundancy:** Hospitals that had already invested millions of dollars in enterprise Picture Archiving and Communication Systems (PACS) and Vendor Neutral Archives (VNAs) for Radiology could not store, route, index, or display whole-slide pathology images within that existing infrastructure.
3. **Barriers to Consultation & Second Opinions:** Telepathology sharing between academic medical centers was severely hampered because the receiving institution frequently could not open foreign slide formats without proprietary standalone viewer software.

To break this deadlock, the **DICOM Standards Committee Working Group 26 (WG-26)**—formed in 2005 in partnership with the **College of American Pathologists (CAP)**—spent five years developing **Supplement 145**. Formally ratified in 2010 and synthesized in this landmark paper by Singh, Chubb, Pantanowitz, and Parwani, Supplement 145 established the **Whole Slide Microscopic Image Information Object Definition (IOD) and Storage SOP Classes**, providing the technical blueprint for vendor-neutral WSI acquisition, storage, compression, coordinate registration, and enterprise workflow integration.

```typescript
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                    DICOM SUPPLEMENT 145: THE INTEGRATED ENTERPRISE ECOSYSTEM                    │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘

  [ LIS / EHR Order ] ──► [ Modality Worklist (MWL) ] ──► [ Automated WSI Scanner ]
                                                                   │
                                 ┌─────────────────────────────────┴─────────────────────────────────┐
                                 ▼                                                                   ▼
                     [ Whole Slide Microscopic Image ]                                   [ Macro Slide Label Image ]
                     • Pyramidal Tiled Storage (Series 1)                                • Specimen Barcode & Accession
                     • Calibrated (X, Y, Z) Origin                                       • Tissue Overview Context
                     • Multi-planar Z-Stacks (Heights in µm)                             • Preserved Clinical Provenance
                     • JPEG / JPEG 2000 Wavelet Encoding                                             │
                                 │                                                                   │
                                 └─────────────────────────────────┬─────────────────────────────────┘
                                                                   │
                                                                   ▼ C-STORE / DICOMweb
                                                     [ Enterprise PACS / VNA Storage ]
                                                     (Unified Radiology + Pathology Archive)
                                                                   │
                                 ┌─────────────────────────────────┴─────────────────────────────────┐
                                 ▼                                                                   ▼
                    [ Diagnostic Viewing Workstation ]                                  [ Computational AI / CAD Engine ]
                    • Rapid Field-of-View Tile Streaming                               • Discrete Annotation Series (Series 2)
                    • Zoom / Pan Without Full Memory Load                               • Segmentations & ROIs Decoupled
                    • Synchronized Z-Focus Navigation                                   • Immutable Raw Diagnostic Pixel Base
```

---

## Architectural Foundations of Supplement 145

### 1. Pyramidal Tiled Organization (Multi-Resolution Pyramid)

A central insight of Supplement 145 is that digital slides cannot be handled as monolithic two-dimensional raster files. Attempting to load an entire uncompressed 15 GB slide into workstation RAM results in immediate memory exhaustion and unacceptable display latency.

Supplement 145 specifies a **tiled pyramidal organization**:

- **Tiling:** The total scanning field at each magnification is segmented into a two-dimensional grid of fixed-dimension rectangular or square tiles (e.g., $256 times 256$ or $512 times 512$ pixels).
- **Hierarchical Resolution Pyramid:**
  - **Base Layer (Level 0):** Represents the highest optical scanning resolution captured by the microscope sensor (e.g., $40\times$ at $0.25\ \mu\text{m/px}$). Contains the largest number of tiles and the greatest data volume.
  - **Intermediate Layers:** Precomputed downsampled levels (typically downsampled by factors of $2\times$, $4\times$, $8\times$, $16\times$).
  - **Apex Layer:** The lowest-resolution thumbnail or macro overview image, allowing rapid global orientation.
- **Selective Random-Access Streaming:** Because each tile is indexed within a DICOM multi-frame object, a client viewing application only requests, transmits, and decodes the specific subset of tiles currently visible in the active display viewport. When the pathologist pans across the slide, adjacent tiles are fetched dynamically; when the pathologist zooms out, the client requests tiles from a higher pyramid layer, enabling seamless real-time interaction without loading unneeded gigabytes of tissue data.

```typescript
                                  ▲
                                 / \     Apex: Low-Power Macro / Overview
                                /   \    (Precomputed Zoom Levels)
                               /=====\
                              /       \  Intermediate Resolution Layers
                             /         \ (Downsampled 2x, 4x, 8x, 16x)
                            /===========\
                           /             \
                          /               \ Base: Maximum Diagnostic Resolution
                         /=================\ (40x / 20x Scan Tiles: 4–20+ GB)
```

---

### 2. Standardized Slide Coordinate System & Frame of Reference

In physical microscopy, slides are placed on mechanical stages that may differ widely across vendors in motor step sizes, optical alignment, and physical axes. Without a rigorous spatial anchor, comparing serial sections or re-visiting suspicious foci is error-prone.

Supplement 145 establishes an unequivocal, physical **WSI Frame of Reference**:

- **Origin Reference $(0, 0, 0)$:** Strictly defined at the **top-left corner of the total imaging stage / slide boundary**.
- **Right-Handed Cartesian Coordinate System:**
  - **X-axis:** Extends horizontally from left to right along the nominal slide length.
  - **Y-axis:** Extends vertically downward along the slide width.
  - **Z-axis:** Extends perpendicularly upward into the focal depth away from the slide surface.
- **Physical Metrics:** Positions are recorded in millimeters and micrometers with explicit **Pixel Spacing** attributes, guaranteeing vendor-independent spatial measurement (calibrated micrometer scales, distances, and area calculations) regardless of optical sensor specifications.

---

### 3. Multi-Planar Z-Stacks (Focal Planes)

Certain histopathological specimens (e.g., thick cytology smears, bone marrow aspirates, mycobacterial acid-fast stains, urine cytology, and parasitology wet preps) cannot be diagnosed from a single focal plane because diagnostic cellular criteria span multiple depths of field.

Supplement 145 directly integrates multi-planar scanning:

- **Nominal Physical Height:** Each Z-plane is indexed by its physical height (in microns) above the glass slide reference boundary.
- **Shared Spatial Alignment:** Tiles belonging to distinct Z-planes share the exact same $(X, Y)$ coordinate footprint at a given pyramid level.
- **Dynamic Digital Focusing:** Viewing software can switch seamlessly between focal levels, replicating the mechanical fine-focus knob of a physical brightfield microscope without misalignment.

---

### 4. Image Compression Standards

To make transmission and multi-terabyte archiving technically feasible, Supplement 145 standardizes image compression modalities:

- **Baseline JPEG:** Widely supported legacy compression; fast hardware decode, but prone to block boundary artifacts at higher compression ratios.
- **JPEG 2000 (JP2K):** The preferred standard for whole-slide imaging. Utilizes discrete wavelet transforms (DWT) offering:
  - Higher compression ratios (typically 15:1 to 30:1 with negligible perceptual loss).
  - Continuous resolution scalability (sub-band wavelets allow extracting lower-resolution views directly from higher-resolution streams).
  - Absence of block artifacts characteristic of Discrete Cosine Transform (DCT) algorithms.
- **Photometric Interpretations:** Supports monochrome (fluorescence microscopy), full color RGB, YCbCr (optimal for chroma subsampling during compression), and palette color mappings.

---

### 5. Decoupling Diagnostic Pixels from Annotations

A critical governance and regulatory principle formalized in Supplement 145 is the **strict architectural separation between raw image acquisition and interpretive annotations**:

- **Modality Immutability:** In DICOM architecture, a single DICOM series is restricted to objects of a single modality generated by a single device in a single procedural step.
- **Separate Series for Annotations:** Pathologist drawings, calibrated measurement calipers, regions of interest (ROIs), and automated AI/CAD algorithm segmentations must **never alter or overwrite the underlying pixel data**. Instead, they are stored in separate DICOM Presentation State or Structured Reporting (SR) series linked relationally via Unique Identifiers (UIDs) to the base WSI series.
- **Clinical & Legal Provenance:** This separation ensures that the original diagnostic whole-slide image remains an unadulterated, legally defensible medical record, while annotations from multiple clinicians or AI algorithms can be layered on, toggled, or audited independently over time.

---

### 6. Workflow Integration: Modality Worklist (MWL) & Procedure Steps (MPPS)

Prior to Supplement 145, digital scanners functioned as isolated islands: technicians had to manually re-enter patient demographics and accession numbers into scanner software, introducing severe clerical transcription risk.

Supplement 145 bridged slide scanners directly into hospital enterprise networks:

- **Modality Worklist (MWL):** Scanners query the Laboratory Information System (LIS) or Radiology Information System (RIS). When a slide is loaded, an optical camera reads the 2D DataMatrix barcode on the slide label, retrieves the scheduled case details, and matches the specimen automatically.
- **Slide Label Capture:** Supplement 145 specifies dedicated storage for the physical slide label image (barcode, printed accession, stain details), ensuring the visual label travels alongside the pixel data as permanent chain-of-custody documentation.
- **Modality Performed Procedure Step (MPPS):** The scanner reports acquisition completion, scan parameters, status codes, and storage location back to the LIS/PACS, closing the automated feedback loop.

---

## Detailed Additions to the DICOM Standard

Supplement 145 significantly expanded the global medical informatics vocabulary:

- **56 New Data Elements:** Added across 14 new or revised DICOM modules.
- **7 Structured Data Templates:** Standardized templates for specimen preparation, staining protocols, and optical path descriptions.
- **18 Defined Value Sets:** Standardizing terminology for microscope illumination types (brightfield, fluorescence, darkfield, polarization), specimen fixatives (formalin, alcohol), and staining reagents (H&E, PAS, Giemsa, IHC).
- **Terminology Harmonization:** Added **80 new coded concepts to SNOMED** and **36 new concepts to DICOM**, establishing the first shared nomenclature between anatomic pathology and medical imaging informatics.

---

## Comparative Matrix: DICOM Supplement 145 vs. Proprietary WSI Formats

| Feature / Dimension | DICOM Supplement 145 (WG-26) | Aperio `.svs` | Hamamatsu `.ndpi` | Philips `.isyntax` |
| --- | --- | --- | --- | --- |
| **Standardization** | **Open International Standard** (ISO 12052) | Proprietary / De facto commercial | Proprietary vendor format | Proprietary vendor format |
| **Enterprise PACS / VNA** | **Native compatibility** (stores alongside CT/MRI) | Requires conversion / custom plugin | Requires custom archive adapter | Requires proprietary Philips PACS |
| **Storage Architecture** | **Pyramidal Tiled Series** (2D array mapping) | Pyramidal Tiled TIFF | Multi-resolution JPEG stream | Hierarchical Wavelet coefficients |
| **Coordinate Registration** | **Standardized physical (X, Y, Z)** in $\mu\text{m}$ | TIFF image header tags (pixels) | Proprietary stage coordinate tags | Proprietary stage coordinate tags |
| **Z-Stack Support** | **Explicit nominal height** (Z in microns) | Limited / multi-file workarounds | Supported via proprietary planes | Supported via proprietary layers |
| **LIS / Workflow Integration** | **Standard MWL and MPPS** (2D barcode query) | Proprietary LIS interfaces | Proprietary LIS interfaces | Proprietary LIS interfaces |
| **Annotation Separation** | **Mandatory decoupled series** (Presentation State) | Often embedded in TIFF XML tags | Proprietary `.ndpa` sidecar file | Proprietary database annotations |
| **Long-Term Preservation** | **Vendor-neutral archive stability** | Risk of obsolescence if viewer halts | Risk of obsolescence if viewer halts | Protected by vendor patents |

---

## The 15-Year Historical Evolution (2011–2026): From Ratification to Clinical Reality

While the publication of Supplement 145 in 2011 was celebrated as the definitive solution to the proprietary format dilemma, the subsequent decade revealed the profound difference between **standard definition** and **commercial market adoption**:

```typescript
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             THE 15-YEAR EVOLUTION OF DIGITAL PATHOLOGY DICOM                     │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

   2005 ──► DICOM WG-26 formed with College of American Pathologists (CAP)
     │
   2010 ──► Supplement 145 ratified: Whole Slide Microscopic Image IOD & SOP Classes
     │
   2011 ──► Singh, Chubb, Pantanowitz & Parwani publish the landmark synthesis (JPI)
     │
 2012–2018  "The Adoption Valley of Death": Commercial scanner vendors retain proprietary
     │      formats to protect software lock-in; DICOM viewers remain sparse and slow.
     │
   2018 ──► DICOMweb protocols (WADO-RS, QIDO-RS, STOW-RS) mature for cloud WSI streaming.
     │
   2021 ──► DICOM Supplement 222 ratified: Whole Slide Microscopy Bulk Annotations
     │      (Enabling high-density AI segmentation masks, millions of cell polygons).
     │
   2025 ──► Chauveau 2025 tool paper (*Virchows Archiv*): Documents that 14 years post-Supp 145,
     │      major viewers (ImageScope, NDP.view2, OlyVia) STILL lack native DICOM support,
     │      necessitating open-source DICOM-to-SVS conversion utilities.
     │
   2026 ──► Enterprise Mandate: Regional networks (NPIC UK, European consortia) enforce mandatory
            DICOM VNA ingestion; foundation models and FDA clearances require standardized inputs.
```

### 1. "The Adoption Valley of Death" & Vendor Resistance

For nearly a decade after 2011, major hardware manufacturers resisted native DICOM output. Closed formats served as a commercial defensive moat: once an academic institution purchased a proprietary scanner fleet, the cost of migrating away was prohibitive. As documented as late as 2025 by Bertrand Chauveau (*Virchows Archiv* 2025; [DOI: 10.1007/s00428-025-04135-0](https://doi.org/10.1007/s00428-025-04135-0)), freely available vendor viewing tools (such as Aperio ImageScope, Hamamatsu NDP.view2, and Olympus OlyVia) still refused to open native DICOM WSI files, forcing the community to develop conversion pipelines (e.g., `DICOMtoSVS`) to bridge the gap.

### 2. The Rise of Supplement 222 (AI Bulk Annotations)

As computational pathology shifted from manual morphometry to deep learning and foundation models ([[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]], [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]), whole-slide segmentations routinely produced **millions of individual nuclear coordinates and multi-class contours per slide**. Conventional DICOM Structured Reporting (SR) collapsed under this payload. In 2021, DICOM WG-26 introduced **Supplement 222 (Whole Slide Microscopy Bulk Annotations)**, defining high-efficiency binary arrays and multi-dimensional matrices capable of streaming gigabyte-scale deep learning segmentations across enterprise networks.

### 3. Cloud VNAs and DICOMweb Streaming

Traditional DICOM C-STORE and C-MOVE protocols were engineered for local hospital area networks (LANs). In modern digital health networks, cloud-native storage requires lightweight HTTP RESTful interfaces. The deployment of **DICOMweb** standards—specifically **WADO-RS** (Web Access to DICOM Objects by RESTful Services) for retrieving individual pyramidal tiles, **QIDO-RS** for querying worklists, and **STOW-RS** for storing AI inferences—finally unlocked the high-speed browser-based viewing envisioned by Supplement 145.

---

## Vault Integration & Cross-References

- **Display & Infrastructure Metrology:**
  - [[Considerations for digital pathology displays]]: Details the downstream hardware requirements (luminance $\ge 350\ \text{cd/m}^2$, 4–8 MP resolution, 120 Hz refresh) necessary to visualize the pyramidal tiled streams defined by Supplement 145 without diagnostic fatigue.
  - [[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]: Operational deployment of vendor-neutral slide archives, Tango calibration slides, and enterprise VNA integration across the UK NHS.
- **Computational Pathology & Software Systems:**
  - [[Digital Pathology Software]]: Comprehensive catalog of whole-slide image converters, viewers, and clinical platforms (e.g., OpenSlide, QuPath, Cytomine).
  - [[The pathology report as a boundary object: From clinical communication to computational representation]]: Relational modeling of how standardized DICOM image metadata interacts with synoptic LIS reporting to prevent epistemic collapse.
  - [[What AI Can and Cannot Do in Pathology]]: Dr. Rajendra Singh's 2026 pathCast address on algorithmic governance, vendor bypass risks, and the imperative for hospital-controlled validation layers.
- **Laboratory Quality & Governance:**
  - [[Quality And Standardisation]]: General laboratory accreditation standards (ISO 15189, CAP, CLIA) and technical metrology protocols governing digital pathology transitions.
