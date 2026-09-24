---
type: Clipping
status: Evergreen
language: en
title: "Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)"
aliases:
  - "Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)"
source: "https://cdrh-rst.fda.gov/?f%5B0%5D=program_areas%3A26"
source_type: page
author:
  - "[[FDA CDRH]]"
  - "[[FDA DIDSR]]"
  - "[[Office of Science and Engineering Laboratories]]"
published: 2026-05-04
created: 2026-09-17
description: "A comprehensive synthesis of the FDA Center for Devices and Radiological Health (CDRH) Catalog of Regulatory Science Tools (RST) for Digital Pathology (Program Area 26). Details all five peer-reviewed open-source computational models, validation datasets, and statistical software tools developed by the Division of Imaging, Diagnostics, and Software Reliability (DIDSR/OSEL)—including HistoGen, HTT Pilot Dataset, DxGoals, SegVal-WSI, and ValidPath—to evaluate AI/ML algorithms, multi-reader reference standards, segmentation, and diagnostic classification accuracy for medical device development and regulatory submissions."
tags:
  - clippings
  - fda
  - regulatory-science
  - digital-pathology
  - computational-pathology
  - artificial-intelligence
  - machine-learning
  - validation
  - mrmc
  - segmentation
  - tils
order: 165
belongs_to: "[[Clippings]]"
related_to:
  - "[[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]"
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Considerations for digital pathology displays]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Towards robust foundation models for digital pathology]]"
---

# Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)

The **Regulatory Science Tools (RST) Catalog** is a peer-reviewed repository of scientific methods, computational models, phantom designs, validation datasets, and statistical software frameworks developed by the **Office of Science and Engineering Laboratories (OSEL)** within the **Center for Devices and Radiological Health (CDRH)** at the **U.S. Food and Drug Administration (FDA)**.

Within the catalog, **Program Area 26: Digital Pathology**—spearheaded primarily by the **Division of Imaging, Diagnostics, and Software Reliability (DIDSR)**—addresses the critical bottleneck in translating AI/ML algorithms, digital slide scanners, and software viewers from research into clinically validated, regulatory-compliant medical devices.

- **Official Catalog Portal:** [FDA CDRH Regulatory Science Tools — Digital Pathology](https://cdrh-rst.fda.gov/?f%5B0%5D=program_areas%3A26)
- **Oversight Organization:** U.S. FDA CDRH / OSEL / DIDSR (Silver Spring, MD, USA)
- **Primary Contact:** `RST_CDRH@fda.hhs.gov`
- **Catalog Scope:** 5 active peer-reviewed digital pathology regulatory tools spanning generative data synthesis, multi-reader multi-case (MRMC) truthing datasets, diagnostic performance goal setting, WSI segmentation benchmarking, and end-to-end WSI processing with clinical viewer back-mapping.

---

## Executive Summary & Regulatory Context

### The Regulatory Challenge in Digital Pathology AI
Digital pathology devices operate at the complex intersection of gigapixel whole-slide imaging (WSI), high-dimensional color science, heterogeneous tissue morphology, and stochastic deep learning pipelines. When device sponsors submit pre-market submissions—such as a **510(k)** notification, **De Novo** classification request, or **Premarket Approval (PMA)**—regulators must evaluate analytical validity, clinical validity, and generalizability.

However, computational pathology faces unique regulatory hurdles:
1. **The Ground Truth & Inter-Reader Dilemma:** Pathology reference standards typically rely on human pathologist visual assessment, which exhibits substantial inter- and intra-observer discordance (e.g., in stromal tumor-infiltrating lymphocytes, Gleason grading, or mitotic counting).
2. **Annotation Scarcity & Patient Privacy:** Annotating gigapixel WSIs requires hundreds of hours of expert pathologist labor. Furthermore, rare tumor phenotypes, edge-case artifacts, and diverse ethnic cohorts are difficult to procure legally and ethically.
3. **Arbitrary Performance Thresholds:** Sponsors frequently struggle to define objective, clinically justified performance targets (sensitivity, specificity, negative/positive likelihood ratios) for novel AI diagnostic aids, particularly for low-prevalence conditions.
4. **Viewer Decoupling & Display Integration:** As the FDA shifted from rigid closed systems (**PSY**) to decoupled modular software (**QKQ**) and standalone medical displays (**PZZ**), algorithms must interface transparently with clinical viewers (e.g., Aperio ImageScope) for secondary pathologist review.

### Role and Legal Standing of Regulatory Science Tools (RST)
> [!NOTE] Regulatory Status of Catalog Tools
> - **Non-Binding Guidance / Reference Methods:** Tools in the RST Catalog are **not** legally binding standards and have not undergone formal qualification as Medical Device Development Tools (MDDTs).
> - **Context of Use (COU):** FDA has not established a blanket evaluation of tool suitability across every medical claim. Suitability must be justified within the specific context of use (COU) of the sponsor's device.
> - **Regulatory Familiarity:** Because these tools are designed, peer-reviewed, and tested directly by FDA OSEL/DIDSR regulatory scientists, FDA pre-market reviewers are intimately familiar with their underlying mathematics, limitations, and codebases.
> - **Q-Submission Alignment:** Medical device sponsors are actively encouraged to propose and discuss the use of RST Catalog tools in formal pre-submission meetings under the **Q-Submission Program**.

### Related FDA Product Codes
Tools within Program Area 26 directly inform regulatory validation across multiple FDA product classification codes:
- **`QPN`:** Software algorithm device to assist users in digital pathology (Class II).
- **`POK`:** Computer-Assisted Diagnostic Software for lesions suspicious for cancer (Class II).
- **`QKQ`:** Digital pathology display and management software.
- **`PZZ`:** Digital pathology displays.
- **`QIH`:** Automated radiological image processing software.
- **`LLZ`:** Image processing radiological systems.

---

## The 5 Digital Pathology Regulatory Science Tools

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│              FDA CDRH REGULATORY SCIENCE TOOLS — DIGITAL PATHOLOGY (AREA 26)            │
├───────────────────┬───────────────────┬─────────────────────────────────────────────────┤
│ Tool Identifier   │ Category          │ Primary Focus & Clinical Application            │
├───────────────────┼───────────────────┼─────────────────────────────────────────────────┤
│ RST26DP02.01      │ Generative AI /   │ [[HistoGen: Histopathology Cell Nuclei Image    │
│ (May 2026)        │ Computer Model    │ Generation Tool]] — DDPM synthetic H&E patches   │
├───────────────────┼───────────────────┼─────────────────────────────────────────────────┤
│ RST26DP01.01      │ Validation        │ HTT Pilot Dataset — 7,898 sTIL density scores   │
│ (May 2026)        │ Dataset & R Pkg   │ from 640 ROIs (64 WSIs) for MRMC agreement      │
├───────────────────┼───────────────────┼─────────────────────────────────────────────────┤
│ RST24MD19.01      │ Decision Support  │ DxGoals — R-Shiny tool calculating Se/Sp/LR     │
│ (Sep 2025)        │ & Biostatistics   │ goals from clinical risk stratification         │
├───────────────────┼───────────────────┼─────────────────────────────────────────────────┤
│ RST24MD06.02      │ Computer Model /  │ SegVal-WSI — Multi-ROI WSI segmentation Dice    │
│ (Sep 2025)        │ Python Evaluator  │ benchmarking with bootstrapped confidence intervals│
├───────────────────┼───────────────────┼─────────────────────────────────────────────────┤
│ RST24CV11.01      │ End-to-End Pipeline│ ValidPath — WSI patch extraction, ImageScope   │
│ (Jun 2024)        │ & ROI Visualizer  │ XML back-mapping, and ROC/AUC assessment       │
└───────────────────┴───────────────────┴─────────────────────────────────────────────────┘
```

---

### 1. HistoGen: Histopathology Cell Nuclei Image Generation Tool
* **RST Reference Number:** `RST26DP02.01`
* **Publication Date:** 04 May 2026
* **Category:** Computer Model (Generative Deep Learning)
* **Open-Source Resources:**
  - Code: [GitHub DIDSR/HistoGen](https://github.com/DIDSR/HistoGen)
  - Models: [Hugging Face didsr/HistoGen](https://huggingface.co/didsr/HistoGen)
  - Methodological Paper: Kahaki et al., *Assessment of Conditional Diffusion Model for Synthetic Histopathology Image Generation.* [arXiv:2608.03990](https://arxiv.org/abs/2608.03990) (SPIE Medical Imaging 2026 / FDA Science Forum 2025).
  - Dedicated Vault Note: [[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]

#### Purpose & Architecture
HistoGen addresses the critical lack of large, diverse, annotated datasets for training and benchmarking nuclear instance segmentation models in computational pathology. It deploys a **conditional Denoising Diffusion Probabilistic Model (DDPM)** with a conditional U-Net backbone. Segmentation masks are transformed into 3-channel spatial tensors—combining binary foreground/background masks with horizontal and vertical (HV) distance gradient fields (inspired by HoVer-Net / [[HoVer-NeXt]])—and injected into the network via Spatially-Adaptive Normalization (SPADE).

#### Key Capabilities & Regulatory Utility
- **Artifact-Free Synthesis:** Overcomes the classic mode collapse, boundary tearing, and structural hallucinations common to generative adversarial networks (cGANs/CycleGANs).
- **Two-Stage Checkpoint Evolution:** Provides a coarse model (`model150000.pt`) for basic tissue architecture and a finetuned checkpoint (`model290000.pt`) that faithfully renders euchromatin/heterochromatin condensation, nucleoli, and nuclear pleomorphism.
- **Stress-Testing Diagnostic AI:** Enables device developers to programmatically generate rare cellular morphologies and borderline cytological features to establish the boundary failure modes of AI segmentation models before clinical submission.
- **Testing & Benchmarks:** Validated across MoNuSeg, TNBC, PanNuke, and 2018 Data Science Bowl datasets. Demonstrated that pathology foundation model-derived Inception Scores ($r = 0.6096$) correlate strongly with downstream segmentation accuracy, unlike standard natural image Inception Scores ($r = 0.0708$).

---

### 2. Dataset from the HTT Pilot Study: Statistical Methods to Assess AI Model Performance
* **RST Reference Number:** `RST26DP01.01`
* **Publication Date:** 01 May 2026
* **Category:** Dataset & Statistical Tool (R Package)
* **Open-Source Resources:**
  - Code & Annotations: [GitHub DIDSR/HTT](https://github.com/DIDSR/HTT)
  - Project Home & Documentation: [DIDSR HTT Home](https://didsr.github.io/HTT.home/)
  - WSI Image Server: [Emory University caMic HTT Server](https://wolf.cci.emory.edu/camic/htt/) (requires account request)
  - User Manual: [HTT 2.0.1 Manual PDF](https://github.com/DIDSR/HTT/blob/main/inst/manual/HTT_2.0.1.pdf)
  - Primary Papers:
    - Elfer K et al., *Reproducible Reporting of the Collection and Evaluation of Annotations for Artificial Intelligence Models.* [Mod Pathol 2024; 37:100439](https://doi.org/10.1016/j.modpat.2024.100439).
    - Dudgeon SN et al., *A pathologist-annotated dataset for validating artificial intelligence: A project description and pilot study.* [J Pathol Inform 2021; 12:45](https://doi.org/10.4103/jpi.jpi_83_20).
    - Garcia V et al., *Development of Training Materials for Pathologists to Provide Machine Learning Validation Data of Tumor-Infiltrating Lymphocytes in Breast Cancer.* [Cancers 2022; 14(10):2467](https://doi.org/10.3390/cancers14102467).
    - Elfer K et al., *Pilot study to evaluate tools to collect pathologist annotations for validating machine learning algorithms.* [J Med Imaging 2022; 9(4):047501](https://doi.org/10.1117/1.JMI.9.4.047501).

#### Purpose & Architecture
The **High-Throughput Truthing (HTT)** project—conducted by FDA/CDRH in close collaboration with the **International Immuno-Oncology Biomarker Working Group (International TILs Working Group)**—aims to establish rigorous statistical methodologies and benchmark reference standards for AI algorithms that quantify continuous biomarkers.

#### Dataset Characteristics
- **Cohort Scale:** **7,898 sTILs density estimates** across **640 unique regions of interest (ROIs)** derived from **64 whole-slide images (WSIs)** of H&E-stained breast cancer specimens.
- **Scanning Parameters:** Digitized on a Hamamatsu Nanozoomer 2.0-RS (C10730) scanner at 40× equivalent optical resolution (0.23 $\mu$m/pixel).
- **Standardized Multi-Parameter Annotation:** Pathologists scored:
  1. *ROI Label:* Categorized as evaluable stroma ("Intra-Tumoral Stroma", "Invasive Margin") or non-evaluable ("Tumor with No Intervening Stroma", "Other").
  2. *Evaluable Status:* Binary flag according to Salgado et al. (2015) guidelines.
  3. *sTILs Density:* Percentage area occupied by tumor-infiltrating lymphocytes relative to total tumor-associated stroma.
- **Statistical R Toolbox:** The `pilotHTT_RST` R package provides 4 statistical utility functions engineered for Multi-Reader Multi-Case (MRMC) variance component analysis, mixed-effects modeling, and inter-reader discordance quantification.

#### Regulatory Significance
When an algorithm outputs a continuous clinical score (e.g., % TILs, Ki-67 proliferation index, PD-L1 combined positive score [CPS]), there is rarely a single "gold standard." This tool provides developers and FDA reviewers with the empirical baseline necessary to validate AI algorithms against a distribution of human expert opinions without artificially collapsing reader variability.

---

### 3. DxGoals: Determining, Visualizing, and Analyzing Diagnostic Classification Performance Goals
* **RST Reference Number:** `RST24MD19.01`
* **Publication Date:** 22 September 2025
* **Category:** Decision Support / Biostatistical Software Tool
* **Open-Source Resources:**
  - Interactive Web Application: [FDA OSEL DxGoals ShinyApp](https://fda-cdrh-osel-didsr-rst.shinyapps.io/DxGoals/)
  - Code: [GitHub DIDSR/DxGoals](https://github.com/DIDSR/DxGoals)
  - Supporting Examples: [Appendix: Numerical Examples PDF](https://cdrh-rst.fda.gov/sites/default/files/2025-09/Appendix.pdf)
  - Foundational Publications:
    - Nguyen N, Pennello GA. *DxGoals: A Software Tool for Determining and Analyzing Clinically Meaningful Classification.* [J Appl Lab Med 2024; 9(5):952–962](https://doi.org/10.1093/jalm/jfae078).
    - Pennello GA. *Classification accuracy goals for diagnostic tests based on risk stratification.* Biostat Epidemiol 2021; 5(2):149–168.

#### Purpose & Mathematical Framework
A persistent challenge in regulatory submissions is answering: *"What sensitivity and specificity must our digital pathology AI achieve to be deemed clinically acceptable?"* Arbitrary targets (e.g., 90% sensitivity / 90% specificity) lack clinical justification.

**DxGoals** is an R-Shiny platform that derives rigorous classification performance goals directly from **clinical risk stratification preferences**:
1. **Pre-test Probability ($p$):** Baseline prevalence of the disease in the target patient population.
2. **Positive Predictive Value Threshold ($PPV^*$):** Minimum acceptable post-test probability required to "rule in" an intervention (e.g., initiating invasive biopsy or aggressive adjuvant therapy).
3. **Negative Predictive Value Complement ($cNPV^* = 1 - NPV^*$):** Maximum acceptable post-test residual risk permitted to "rule out" disease (e.g., discharging a patient or withholding therapy).

#### Key Analytical Capabilities
- **Prevalence-Independent Likelihood Ratio Goals:**
  Translates clinical risk thresholds into Positive Likelihood Ratio ($PLR^*$) and Negative Likelihood Ratio ($NLR^*$) bounds:
  $$\text{PLR}^* = \frac{PPV^* / (1 - PPV^*)}{p / (1 - p)}, \quad \text{NLR}^* = \frac{cNPV^* / (1 - cNPV^*)}{p / (1 - p)}$$
  Because likelihood ratios are mathematically independent of prevalence, these performance targets can be validated directly on **prevalence-enriched cohorts** (such as enriched case-control sets and MRMC imaging studies common in digital pathology).
- **Comparative Hypotheses (Non-Inferiority vs. Superiority):**
  Provides statistical testing protocols when comparing an investigational AI device ($B$) against a predicate device or human pathologist control ($A$). Implements multiplicative non-inferiority margins ($\gamma_0, \gamma_1$):
  $$\text{Rule-out test:} \quad 1 - \text{NLR}^B > \gamma_0 \times (1 - \text{NLR}^A)$$
  $$\text{Rule-in test:} \quad \text{PLR}^B - 1 > \gamma_1 \times (\text{PLR}^A - 1)$$
- **Graph Visualization:** Generates interactive likelihood ratio graphs showing the permissible diagnostic operating zone where clinical net benefit is positive.

---

### 4. SegVal-WSI: Whole Slide Image Segmentation Algorithm Performance Assessment Tool
* **RST Reference Number:** `RST24MD06.02`
* **Publication Date:** 18 September 2025
* **Category:** Computer Model / Python Evaluation Software
* **Open-Source Resources:**
  - Code: [GitHub DIDSR/SegVal-WSI](https://github.com/DIDSR/SegVal-WSI)
  - User Manual: [SegVal-WSI User Manual PDF](https://github.com/DIDSR/SegVal-WSI/blob/main/User%20Manual.pdf)
  - Primary Developer Citation: Arab A, Kahaki S, Chen W. *SegVal-WSI: Whole Slide Image Segmentation Algorithm Performance Assessment Tool.* (FDA CDRH, 2024/2025).

#### Purpose & Algorithmic Design
Whole-slide segmentation models (e.g., segmenting tumor nests, necrosis, stroma, or glomeruli) rarely have exhaustive pixel annotations across an entire $100,000 \times 100,000$ pixel WSI. Instead, reference standards consist of multiple sparsely distributed annotated ROIs across dozens of slides. Standard evaluation metrics frequently fail because they either weight all ROIs equally (disregarding ROI surface area) or concatenate pixels without accounting for slide-to-slide clustering effects.

#### Technical Features
- **Confusion Matrix Ingestion:** Accepts per-ROI and per-WSI confusion matrices ($TP, FP, FN, TN$) across heterogeneous patient cohorts.
- **Hierarchical Dice Metric Aggregation:** Computes pooled and macro-averaged Dice Similarity Coefficients (DSC) across entire cohorts where WSIs have unequal numbers of annotated ROIs:
  $$\text{Dice} = \frac{2 \times TP}{2 \times TP + FP + FN}$$
- **Bootstrapped Confidence Intervals:** Performs non-parametric patient-level and WSI-level bootstrapping to produce rigorous 95% confidence intervals around the Dice score, fulfilling FDA requirements for uncertainty quantification.
- **Current Limitations:** Implements Dice score exclusively (Hausdorff distance and surface boundary metrics currently require custom extensions); assumes independent single-slide-per-patient study design.

---

### 5. ValidPath: Whole Slide Image Processing and Machine Learning Performance Assessment Tool
* **RST Reference Number:** `RST24CV11.01`
* **Publication Date:** 20 June 2024
* **Category:** End-to-End Computational Pipeline & ROI Visualization Software
* **Open-Source Resources:**
  - Code: [GitHub didsr/ValidPath](https://github.com/didsr/ValidPath)
  - Online Documentation: [ValidPath Documentation](https://didsr.github.io/ValidPath/index.html)
  - Methodological Publications:
    - Kahaki S, Hagemann IS, Cha KH, et al. *End-to-end deep learning method for predicting hormonal treatment response in women with atypical endometrial hyperplasia or endometrial cancer.* [J Med Imaging 2024; 11(1):017502](https://doi.org/10.1117/1.JMI.11.1.017502).
    - Kahaki S, et al. *Supervised deep learning model for ROI detection of atypical endometrial hyperplasia and endometrial cancer on histopathology whole slide images for predicting hormonal treatment response.* Proc SPIE Med Imaging 2024.
    - Kahaki S, et al. *Weakly Supervised Deep Learning for Predicting the Response to Hormonal Treatment of Women with Atypical Endometrial Hyperplasia: A Feasibility Study.* [Proc SPIE 2023; 12471:124710T](https://doi.org/10.1117/12.2652912).

#### Purpose & Architecture
**ValidPath** is a comprehensive Python framework engineered to bridge the operational gap between raw digital pathology slide processing, deep learning model evaluation, and pathologist-in-the-loop visual verification.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                VALIDPATH THREE-TIER PIPELINE                            │
└─────────────────────────────────────────────────────────────────────────────────────────┘
   [ Gigapixel Whole Slide Images (SVS/NDPI/TIFF) + Annotations ]
                                 │
                                 ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ MODULE 1: WSI Handler & Patch Generation Engine             │
   │  - Parses vendor-specific slide pyramids and XML annotations│
   │  - Filters background, fat, pen marks, and air bubbles      │
   │  - Extracts standardized, tiled image patches for AI/ML     │
   └─────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ MODULE 2: Clinical Viewer XML Re-Mapper                     │
   │  - Translates ML predictions / bounding boxes / heatmaps   │
   │  - Exports native Aperio ImageScope-compatible XML files    │
   │  - Enables pathologists to audit predictions on clinical UI │
   └─────────────────────────────┬───────────────────────────────┘
                                 │
                                 ▼
   ┌─────────────────────────────────────────────────────────────┐
   │ MODULE 3: Statistical Performance Assessment                │
   │  - Computes empirical ROC curves & Area Under Curve (AUC)   │
   │  - Sensitivity, Specificity, Precision, Recall, F1-Score    │
   │  - Parametric and non-parametric 95% Confidence Intervals   │
   └─────────────────────────────────────────────────────────────┘
```

#### Key Capabilities & Clinical Benchmark
- **Clinical Viewer Compatibility:** Solves a major practical limitation in AI audits: exporting model-generated ROIs and probability overlays directly into **Aperio ImageScope** XML format, allowing board-certified pathologists to perform qualitative audits using their standard diagnostic viewer.
- **Endometrial Neoplasia Validation:** Tested and proven in complex gynecologic pathology cohorts, specifically predicting response to progestin hormonal therapy in atypical endometrial hyperplasia and early endometrioid carcinoma.

---

## Comparative Analysis of Digital Pathology RSTs

| Feature / Dimension | **HistoGen** (`RST26DP02.01`) | **HTT Pilot Study** (`RST26DP01.01`) | **DxGoals** (`RST24MD19.01`) | **SegVal-WSI** (`RST24MD06.02`) | **ValidPath** (`RST24CV11.01`) |
|---|---|---|---|---|---|
| **Primary Domain** | Synthetic Data & Augmentation | Quantitative Biomarker Truthing | Study Design & Target Formulation | Segmentation Validation | WSI Preprocessing & Verification |
| **Primary Format** | PyTorch / Python Scripts | R Package (`pilotHTT_RST`) & WSIs | R-Shiny Web App / R Package | Python Module / CLI | Python Package & Docs |
| **Clinical Target** | Nuclear Morphology / Pleomorphism | Breast Cancer sTILs (Immuno-Oncology) | General Binary Diagnostic Tests | Multi-ROI Tissue Segmentation | Endometrial Hyperplasia & Cancer |
| **Key Metric / Output**| 2D Synthetic H&E Patches + HV Maps | 7,898 Multi-Reader sTIL Scores | Goal $Se, Sp, PLR, NLR$ + Bounds | WSI Dice Score + Bootstrapped CI | ROC, AUC, Sensitivity, F1, ImageScope XML |
| **MRMC Support** | N/A | Direct Multi-Reader Multi-Case | Direct MRMC Study Sizing | Multi-ROI Aggregation | Slide-level Classification |
| **Regulatory Role** | Robustness / Stress-Testing AI | Developing Consensus Ground Truth | Sizing Pre-Market Pivotal Trials | Segmentation Clearing Benchmarks | End-to-End Pipeline Verification |

---

## Best-Practice Roadmap: Leveraging the RST Catalog in FDA Submissions

For academic institutions, digital pathology startups, and IVD manufacturers preparing an AI/ML regulatory dossier, the RST tools map directly across the **Total Product Life Cycle (TPLC)**:

```
[ PHASE 1: STUDY SIZING & GOAL DEFINITION ]
       │  Tool: DxGoals (RST24MD19.01)
       │  Action: Define clinically meaningful rule-in (PPV*) and rule-out (cNPV*) goals;
       │          derive required PLR/NLR targets for pre-submission (Q-Sub) consensus.
       ▼
[ PHASE 2: ALGORITHM TRAINING & STRESS TESTING ]
       │  Tool: HistoGen (RST26DP02.01)
       │  Action: Synthesize edge-case phenotypes, simulate rare nuclear atypia, and
       │          stress-test model generalization across simulated staining variations.
       ▼
[ PHASE 3: GROUND TRUTH FORMULATION & READER VARIABILITY ]
       │  Tool: HTT Pilot Methodology (RST26DP01.01)
       │  Action: Implement standardized multi-pathologist truthing protocols;
       │          model inter-reader variance components rather than forced consensus.
       ▼
[ PHASE 4: PREPROCESSING & WORKFLOW INTEGRATION ]
       │  Tool: ValidPath (RST24CV11.01)
       │  Action: Standardize tiling, eliminate non-tissue artifacts, and export
       │          Aperio ImageScope XML annotations for clinical auditing.
       ▼
[ PHASE 5: PIVOTAL BENCHMARKING & UNCERTAINTY QUANTIFICATION ]
          Tool: SegVal-WSI (RST24MD06.02) & ValidPath (RST24CV11.01)
          Action: Calculate cohort-level Dice scores and ROC/AUC curves with patient-level
                  bootstrapped confidence intervals for the final 510(k)/PMA dossier.
```

---

## Related Vault Notes

- **Regulatory & Generative AI:** [[HistoGen: Histopathology Cell Nuclei Image Generation Tool]], [[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]
- **Displays & Hardware Validation:** [[Considerations for digital pathology displays]]
- **Foundation Models & Evaluation:** [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]], [[Towards robust foundation models for digital pathology]], [[A distributional robustness margin for pathology foundation models]]
- **Cognitive & Human Factors:** [[Screening efficiency over experience: Rapid target detection in low-power field as a modifiable cognitive biomarker for diagnostic accuracy in digital cytology]], [[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]], [[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]]
- **Core Computational Disciplines:** [[Digital Pathology]], [[Digital Pathology Software]], [[Image Analysis]], [[What AI Can and Cannot Do in Pathology]], [[HoVer-NeXt]]
