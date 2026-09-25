---
type: Clipping
status: Evergreen
language: en
title: "NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology"
source: "https://npic.ac.uk/quality/"
source_type: page
author:
  - "[[National Pathology Imaging Co-operative]]"
  - "[[David S. Brettle]]"
  - "[[Darren Treanor]]"
  - "[[Hayley Pye]]"
  - "[[Catriona Dunn]]"
published: 2026-01-15
created: 2026-09-22
description: "A comprehensive synthesis of the National Pathology Imaging Co-operative (NPIC) Quality Coordination Centre (QCC) based at Leeds Teaching Hospitals NHS Trust. Documents the full-lifecycle digital pathology quality assurance (QA) framework, physical metrology tools, and clinical validation resources—including the web-based Point-of-Use Quality Assurance (POUQA) tool, the National Staining Survey with biopolymer Tango slides, scanner variability benchmarking, display luminance science, and the foundational Leeds Guides to Digital Pathology."
tags:
  - "clippings"
  - "digital-pathology"
  - "quality-assurance"
  - "quality-control"
  - "metrology"
  - "pouqa"
  - "npic"
  - "staining"
  - "scanners"
  - "displays"
  - "artificial-intelligence"
order: 152
belongs_to: "[[Clippings]]"
related_to:
  - "[[Considerations for digital pathology displays]]"
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
  - "[[Quality And Standardisation]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology]]"
---

# NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology

**National Pathology Imaging Co-operative (NPIC) — Quality Coordination Centre (QCC)**  
Level 2, The Sir Robert Ogden Centre, St James's University Hospital, Leeds Teaching Hospitals NHS Trust & University of Leeds, Beckett Street, Leeds LS9 7TF, United Kingdom.  
Web: [npic.ac.uk/quality](https://npic.ac.uk/quality/) | Tools & Resources: [npic.ac.uk/quality/qcc-tools-and-resources](https://npic.ac.uk/quality/qcc-tools-and-resources/) | Point-of-Use QA: [virtualpathology.leeds.ac.uk/research/systems/pouqa](https://www.virtualpathology.leeds.ac.uk/research/systems/pouqa/)

---

## Executive Summary

The transition of clinical pathology from optical glass-slide microscopy to 100% digital workflows introduces complex physical, optical, and computational transitions across the imaging pipeline. Every step—from tissue sectioning and chemical staining to robotic whole-slide scanning, image compression, network transfer, monitor display, and automated machine learning analysis—introduces systematic and random variations. While deep learning models and foundation backbones are often promoted as invariant to real-world domain shifts, compromised, out-of-focus, or chromatically skewed pixel data cannot be fully recovered once captured.

To establish reproducible, evidence-based quality standards for the United Kingdom National Health Service (NHS) and the international digital pathology community, the **National Pathology Imaging Co-operative (NPIC)** established the **Quality Coordination Centre (QCC)**. Based at St James's University Hospital in Leeds and led by medical physicists, histopathologists, and imaging scientists, the QCC focuses on:

1. **Defining Physical Metrology & Calibration Standards:** Partnering with the **National Physical Laboratory (NPL)** and the **British Standards Institution (BSI)** to introduce traceable measurement science into histopathology.
2. **Standardizing Pre-Analytic Staining (The Tango Slide & National Stain Survey):** Deploying tissue-mimicking biopolymer test films to objectively quantify H&E stain kinetics and eliminate reliance on subjective visual inspection.
3. **Quantifying Scanner-Introduced Variance:** Benchmarking resolution, modulation transfer function (MTF), and colorimetric fidelity across commercial whole-slide imaging (WSI) hardware platforms.
4. **Ensuring Diagnostic Display & Viewing Quality (POUQA):** Providing a validated, free web-based psychophysical tool to audit ambient lighting, luminance, and chromatic discrimination ($\approx 1\,\Delta E$) at pathologist reporting workstations, particularly in remote and telepathology environments.
5. **Publishing Scalable Deployment Guidance (The Leeds Guides):** Authoring clinical, technical, and governance blueprints for single-hospital and multi-institution regional digital pathology rollouts.

---

## Organizational Leadership & Core Team

The QCC operates at the nexus of clinical histopathology, medical physics, clinical engineering, and metrology:

- **Prof. David S. Brettle** (*QCC Team Leader / Senior Author*): Consultant Medical Physicist; Head of Medical Physics and Engineering at Leeds Teaching Hospitals NHS Trust; Honorary Professor at the University of Leeds. Pioneer in medical imaging quality assurance and display metrology.
- **Prof. Darren Treanor** (*NPIC Director / Consultant Pathologist*): Lead for Digital Pathology at Leeds Teaching Hospitals NHS Trust; Professor of Digital Pathology at the University of Leeds and Guest Professor at Linköping University, Sweden. Leading authority on clinical WSI validation and regulatory translation.
- **Dr. Hayley Pye** (*Research Delivery Manager*): Oversees research operations, scanner-introduced optical variation trials, and cross-center quality metrics.
- **Dr. Catriona M. Dunn** (*Postdoctoral Research Fellow*): Lead investigator for chemical stain quantification and developer of the biopolymer film Tango slide technology.
- **Sharmin Ahmed** (*Project Co-ordinator*): Facilitator for multi-site deployments, NHS partner onboarding, and National Stain Survey logistics.

---

## The 5 Pillars of the NPIC Quality Framework

```
                      THE NPIC FULL-LIFECYCLE WSI QUALITY PIPELINE
                      
  [ Pre-Analytics ] ──► [ Scanning Metrology ] ──► [ IT & Network ] ──► [ Workstation Display ] ──► [ AI & Image Analysis ]
         │                        │                        │                     │                         │
         ▼                        ▼                        ▼                     ▼                         ▼
   Tango Slides             WSI Scanner Benchmarks    Leeds Guides Vol 1-2   POUQA Psychophysics        Robustness Audits
   National Stain Survey    NPL / BSI Measurement     Multi-Trust Archiving  Luminance Guidelines       Cell Count Drift
   Linear r=0.98-0.99       Contrast, MTF, Color      Zero-Footprint PACS    Ambient Lux Audits         Model Shift Gates
```

---

### Pillar 1: Pre-Analytics and Chemical Staining Quantification

Hematoxylin and Eosin (H&E) staining is the cornerstone of anatomical pathology, yet it remains susceptible to substantial batch-to-batch, day-to-day, and laboratory-to-laboratory variability driven by reagent aging, solvent evaporation, washing temperatures, pH fluctuations, and automated stainer mechanics. Historically, quality control has depended entirely on subjective pathologist visual checks or irregular external quality assessment (EQA) schemes.

#### The "Tango Slide" Biopolymer Innovation
To replace qualitative estimation with rigorous metrology, Catriona Dunn, David Brettle, Darren Treanor, and colleagues developed and clinically evaluated a novel **stain assessment slide** (*Diagnostic Pathology* 2024; DOI: 10.1186/s13000-024-01460-6):
- **Substrate Architecture:** Conventional glass microscope slides coated with a standardized, homogeneous, stain-responsive **biopolymer film** (the "Tango slide").
- **Kinetics and Linearity:** Exposure to clinical hematoxylin and eosin staining cycles demonstrated an exceptional linear correlation ($r = 0.98\text{--}0.99$) between staining duration/reagent concentration and spectrophotometric optical density.
- **Biological Equivalence:** Staining dynamics directly mirror human liver tissue controls ($r = 0.98\text{--}0.99$), eliminating the biological heterogeneity, section thickness variance, and cellular architectural noise intrinsic to mammalian tissue blocks.
- **Multi-Lab Clinical Trial:** Tested across eight clinical NHS laboratories over two weeks, successfully capturing subtle day-to-day reagent degradation and uncovering previously unquantifiable intra- and inter-instrument drift across automated slide stainers.

#### The National Staining Survey
Building on the Tango slide technology, the QCC launched the **National Staining Survey**:
- Calibrated test slides are distributed via dedicated courier to participating NHS pathology laboratories nationwide.
- Partner laboratories run the test slides through their routine clinical staining protocols without altering operational parameters.
- Re-scanned slides return to the QCC for centralized photometric, colorimetric, and densitometric profiling.
- Each department receives a personalized, confidential report benchmarking their stain intensity, chromatic balance, and stain variance against national peer averages, establishing the empirical basis for future national staining tolerances.

---

### Pillar 2: Scanner Variability and Measurement Science (Metrology)

Whole slide imaging scanners are precision optical instruments combining high-NA objective lenses, motorized stages, linear/area CCD or CMOS sensors, and proprietary autofocus and image stitching algorithms. Differences in illumination spectra (LED vs halogen), white-balance calibration, optical transfer functions, and proprietary compression formats induce substantial variance in the resulting digital slides.

#### Five-Scanner Benchmark
In foundational work led by Dr. Hayley Pye (awarded Best Poster Prize at the 9th Digital Pathology & AI Congress, London):
- The QCC evaluated five major commercial clinical WSI scanner models using standardized optical phantoms and target slides.
- **Observed Discrepancies:** Significant variations were measured in effective spatial resolution (Modulation Transfer Function / MTF), contrast transfer, and color rendering. Even when scanning the identical glass slide, different commercial scanners generated digital representations with marked chromatic distance and subtle high-frequency edge roll-off.
- **Implication for AI:** A classifier trained on data from one scanner model frequently experiences domain shift and out-of-distribution failure when inferencing slides from a different vendor, confirming that hardware optical discrepancies are a primary root cause of computational brittleness.

#### Collaboration with NPL and BSI
To move digital pathology toward the metrological maturity of radiology and clinical chemistry, the QCC partnered with the **National Physical Laboratory (NPL)** (the UK's National Metrology Institute) and the **British Standards Institution (BSI)** (*Journal of Pathology Informatics* 2022):
- Advocating for national and international documentary standards establishing **traceable measurement science** in digital pathology.
- Developing calibrated physical reference materials (physical slides with known optical transfer, line pair resolution targets, and color patches traceable to national photometric standards).
- Formulating standardized test methods for scanner procurement acceptance testing, annual recalibration, and preventive maintenance.

---

### Pillar 3: Viewing Environment, Display Ergonomics, and POUQA

The computer display is the final, inescapable physical component of the digital pathology chain. Even an optically pristine, perfectly stained whole slide image will be misread if rendered on an inadequate or poorly calibrated monitor placed in an inappropriately illuminated room.

#### The Point-of-Use Quality Assurance (POUQA) Tool
Originally developed by the Leeds team (*JPI* 2019; *Histopathology* 2020) and deployed freely at [virtualpathology.leeds.ac.uk/research/systems/pouqa](https://www.virtualpathology.leeds.ac.uk/research/systems/pouqa/), offering separate **POUQA Radiology**, **POUQA Pathology**, and **POUQA Profiler** modules:
- **Core Mechanism:** A rapid, web-based psychophysical test executable on any diagnostic workstation without specialized calibration photometers. Pathologists perform visual discrimination tasks on paired color patches derived directly from digitized hematoxylin and eosin stains, with a perceptual step of $\approx 1\,\Delta E$ (CIELAB).
- **Ambient Lighting Auditing:** POUQA assesses whether ambient room lux and screen reflections wash out subtle low-contrast nuclear and cytoplasm differences.
- **Empirical Real-World Failure Rate:** In an analysis of **11,719 real-world POUQA tests**, **5.5% (654 sessions) failed**, primarily due to uncalibrated consumer screens, aggressive power-saving brightness drops, or excess daylight/overhead glare.
- **Regulatory and Telepathology Relevance:** POUQA provides an auditable, logged quality assurance check mandatory for remote working, home reporting, and distributed multi-site telepathology services.

#### Pathologists' Light Level Preferences: Microscope vs. Display
In an empirical investigation into visual habits (arXiv:2312.00475; *JPI* 2024):
- **The Behavior Disconnect:** **81% of pathologists** frequently adjust the light rheostat on their optical light microscopes during routine reporting (adjusting per specimen density, stain depth, or magnification). Conversely, only **11%** regularly adjust the brightness controls on their digital displays.
- **Decoupled Preference:** There is no direct correlation between a pathologist's preferred illumination level on a microscope and their monitor luminance preference.
- **Luminance Benchmarks:** The study proved that a monitor capable of **$500\,\text{cd/m}^2$** peak output is sufficient for virtually all pathologists, with **$350\,\text{cd/m}^2$** operating brightness being comfortable and diagnostically optimal for the vast majority, preventing visual fatigue (asthenopia).
- **Display Selection Synthesis:** These findings formed the empirical backbone of the comprehensive guidance in [[Considerations for digital pathology displays]] (Brettle et al., *JPI* 2026), establishing minimum recommended specs (27-inch, 4MP/8MP, $350\text{--}500\,\text{cd/m}^2$, 1000:1 contrast, 120 Hz, $\ge 100\%$ sRGB) and a 3-step procurement model.

---

### Pillar 4: Operational Guidance and the Leeds Digital Pathology Guides

To translate academic and physical discoveries into routine NHS operation, the Leeds and NPIC teams authored the definitive implementation roadmaps for healthcare systems:

#### Volume 1: The Leeds Guide to Digital Pathology (2018)
- Focuses on intra-departmental transformation: building the business case, workflow redesign, laboratory information management system (LIMS) barcode integration, scanner throughput calculations, and ergonomic pathologist cockpit design.
- Establishes practical validation protocols aligning with Royal College of Pathologists (RCPath) and College of American Pathologists (CAP) guidelines for clinical sign-out.

#### Volume 2: Building a Digital Pathology Network (2022)
- Extends the operational scope to multi-trust regional networks (the core NPIC architecture across northern England and national specialty networks).
- Details wide-area network (WAN) bandwidth requirements, enterprise Picture Archiving and Communication Systems (PACS) / Vendor Neutral Archives (VNA), multi-tiered cloud vs on-premise storage lifecycles (hot SSD vs warm disk vs cold tape archive), and legal data-sharing frameworks.
- Outlines multi-institutional governance, distributed reporting rosters, and cross-site EQA integration.

---

### Pillar 5: AI Impact, Downstream Algorithms, and Reality Checks

A major strategic objective of the QCC is safeguarding artificial intelligence and computer vision algorithms from real-world data corruption:
- **The "Reality Check" Philosophy:** Countering assumptions that deep convolutional neural networks or vision transformers are immune to pre-analytical noise. The QCC demonstrates that uncalibrated stain drift and scanner optical shifts directly corrupt automated nuclear instance segmentation, cell counts (e.g., Ki-67 scoring, mitotic indexing), and biomarker quantification.
- **Upstream Quality Gating:** The QCC advocates that clinical AI deployments must incorporate automated upstream quality control gates—rejecting or flagging tiles with poor focus, sub-threshold contrast, or excessive stain variance before features are passed into frozen foundation backbones or diagnostic triage heads.

---

## Curated Catalog of NPIC QCC Tools & Resources

| Tool / Resource | Category | Modality / Format | Primary Access / URL | Clinical & Metrological Purpose |
|---|---|---|---|---|
| **POUQA** | Software QA Tool | Free Web Application | [virtualpathology.leeds.ac.uk/research/systems/pouqa](https://www.virtualpathology.leeds.ac.uk/research/systems/pouqa/) | Audits monitor calibration, ambient lighting contrast, and $\approx 1\,\Delta E$ H&E color discrimination for clinical and remote reporting workstations. |
| **Tango Slides** | Physical Metrology | Calibrated Biopolymer Slides | [National Stain Survey](https://npic.ac.uk/quality/national-stain-survey/) | Provides linear ($r=0.99$) tissue-mimicking substrate to measure objective H&E stain uptake and detect automated stainer degradation. |
| **National Stain Survey** | EQA / Metrology Program | Multi-site Courier Survey | [Register Interest](https://npic.ac.uk/quality/national-stain-survey/) | Maps nationwide H&E staining variability across UK pathology departments to inform national staining tolerances. |
| **WSI Scanner Benchmark** | Metrology Framework | Comparative Experimental Data | [HPye Poster (PDF)](https://npic.ac.uk/wp-content/uploads/sites/71/2023/01/HPye-Poster.pdf) | Evaluates MTF resolution, contrast, and color consistency across 5 commercial WSI scanner platforms. |
| **Display Specifications** | Clinical Guidance | Peer-Reviewed Guidelines | [[Considerations for digital pathology displays]] | Establishes minimum monitor hardware specs, 3-step procurement model, and display maintenance protocols. |
| **Light Preference Study** | Psychophysical Research | Research Paper / arXiv | [arXiv:2312.00475](https://arxiv.org/abs/2312.00475) | Demonstrates microscope vs display light adjustment divergence; grounds $350\text{--}500\,\text{cd/m}^2$ operational luminance recommendations. |
| **Leeds Guide Vol. 1** | Clinical Handbook | Comprehensive PDF Guide | [Guide Vol. 1 (PDF)](https://npic.ac.uk/wp-content/uploads/sites/71/2023/01/Guide-to-Digital-Pathology-Vol.1.pdf) | Operational guide for digitizing a single pathology department (hardware, validation, ergonomics, LIMS). |
| **Leeds Guide Vol. 2** | Enterprise Handbook | Comprehensive PDF Guide | [Guide Vol. 2 (PDF)](https://npic.ac.uk/wp-content/uploads/sites/71/2023/01/Guide-to-Digital-Pathology-Vol.2.pdf) | Technical and governance blueprint for regional and national multisite digital pathology network deployment. |
| **NPL / BSI Metrology Paper** | Standards Paper | White Paper / Journal Article | [JPI 2022](https://doi.org/10.1016/j.jpi.2022.100155) | Formulates national metrology roadmap establishing traceable measurement science and physical phantoms in histopathology. |

---

## The Digital Pathology Continuous Quality Improvement Cycle

The QCC models quality assurance not as a one-time validation checklist, but as a continuous, closed-loop metrology cycle:

```
                          CONTINUOUS METROLOGY CYCLE
                          
                  ┌──────────────────────────────────────┐
                  │ 1. PRE-ANALYTIC CALIBRATION          │
                  │ - Biopolymer Tango slide monitoring  │
                  │ - Stainer bath chemical maintenance  │
                  └──────────────────┬───────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │ 2. SCANNER ACCEPTANCE & DRIFT        │
                  │ - Modulation transfer function (MTF) │
                  │ - Color phantom verification         │
                  │ - Autofocus & stitching audits       │
                  └──────────────────┬───────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │ 3. WORKSTATION & ENVIRONMENT AUDIT   │
                  │ - POUQA ambient light test           │
                  │ - Screen cleaning (triple-tissue)    │
                  │ - 350-500 cd/m² luminance locking    │
                  └──────────────────┬───────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │ 4. COMPUTATIONAL / AI SAFEGUARDS     │
                  │ - Out-of-focus tile gating           │
                  │ - Distributional shift monitoring    │
                  │ - Model re-validation upon drift     │
                  └──────────────────┬───────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │ 5. EXTERNAL PROFICIENCY BENCHMARKING │
                  │ - National Staining Survey data      │
                  │ - Multi-reader consensus correlation │
                  └──────────────────────────────────────┘
```

---

## Significance for Clinical Practice & Regulatory Science

1. **Closing the "Wild West" Quality Gap:** Unlike clinical chemistry and radiology, anatomical pathology has operated for over a century with substantial qualitative latitude in tissue processing and staining. The QCC's physical tools transform qualitative "good enough" histology into quantifiable physical numbers.
2. **Defending Against AI Silent Failure:** Deep learning models can fail silently when presented with images that deviate subtly in chromatic balance or high-frequency edge sharpness. The QCC's metrology pipeline ensures that training and deployment cohorts maintain verifiable domain consistency.
3. **Protecting Telepathologists:** With remote reporting becoming an everyday clinical reality post-pandemic, tools like POUQA protect clinicians from liability by ensuring that diagnostic decisions are rendered on compliant, glare-free workstations that meet visual acuity thresholds.
4. **Interoperability with FDA & International Initiatives:** The work of the NPIC QCC directly complements the US FDA CDRH [[Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)]] (e.g., the HTT statistical framework, HistoGen stress testing, and SegVal-WSI) by providing the physical, pre-analytical, and environmental hardware calibration standards necessary for end-to-end clinical translation.

---

## Primary References & Key Literature

- **Dunn CM, Brettle DS, Cockroft M, Keating E, Revie C, Treanor D.** *Quantitative assessment of H&E staining for pathology: development and clinical evaluation of a novel system.* Diagnostic Pathology 19, 42 (2024). DOI: 10.1186/s13000-024-01460-6.
- **Brettle DS, Matthews GA, Pye H, Treanor D.** *Considerations for digital pathology displays.* Journal of Pathology Informatics 23, 100707 (2026). DOI: [10.1016/j.jpi.2026.100707](https://doi.org/10.1016/j.jpi.2026.100707).
- **Brettle DS, et al.** *Pathologists light level preferences using the microscope — a study to guide digital pathology display use.* Journal of Pathology Informatics / arXiv:2312.00475 (2024).
- **Pye H, et al.** *A First Look at Scanner Introduced Variation in Contrast, Resolution, and Colour Across 5 Different Models of Whole Slide Imaging (WSI) Scanners.* 9th Digital Pathology & AI Congress, London (2022).
- **Treanor D, et al.** *The Leeds Guide to Digital Pathology, Volume 1 (2018) & Volume 2: Building a Digital Pathology Network (2022).* National Pathology Imaging Co-operative / Leeds Teaching Hospitals NHS Trust.
- **Dunn CM, et al.** *The Use of a Biopolymer Film for Quantitative H&E Stain Assessment and Quality Control in Pathology.* Pathology Visions, Las Vegas (2022).
- **National Physical Laboratory (NPL), British Standards Institution (BSI), & NPIC.** *The Need for Measurement Science in Digital Pathology.* Journal of Pathology Informatics (2022).
- **Wright AI, et al.** *Development and Evaluation of a Novel Point-of-Use Quality Assurance Tool for Digital Pathology.* Journal of Pathology Informatics 10, 16 (2019). DOI: [10.4103/jpi.jpi_85_18](https://doi.org/10.4103/jpi.jpi_85_18).
