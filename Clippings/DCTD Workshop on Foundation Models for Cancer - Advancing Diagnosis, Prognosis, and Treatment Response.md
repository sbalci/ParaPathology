---
type: Clipping
status: Evergreen
language: en
title: "DCTD Workshop on Foundation Models for Cancer: Advancing Diagnosis, Prognosis, and Treatment Response"
source: "https://dctd.cancer.gov/about/news-events/events/foundation-models"
source_type: workshop
author:
  - "[[National Cancer Institute]]"
  - "[[Division of Cancer Treatment and Diagnosis]]"
  - "[[Asif Rizwan]]"
  - "[[Michael Espey]]"
  - "[[Sean Hanlon]]"
  - "[[Subhashini Jagu]]"
  - "[[Hala Makhlouf]]"
  - "[[Miguel Ossandon]]"
  - "[[Mugdha Samant]]"
  - "[[Shannon Silkensen]]"
  - "[[Brian Sorg]]"
  - "[[Umit Topaloglu]]"
  - "[[Dana Wolff-Hughes]]"
published: 2026-03-24
created: 2026-10-06
description: "A comprehensive synthesis of the NCI Division of Cancer Treatment and Diagnosis (DCTD) workshop on Foundation Models for Cancer (March 24–26, 2026). Details the transformative applications of self-supervised foundation models across multimodal cancer data integration (pathology, radiology, genomics, EHR), outcome and trajectory simulation, therapeutic response and resistance prediction, clinical trial matching, federated learning for multi-institutional collaboration, and the essential validation, reproducibility, and regulatory frameworks required for clinical translation."
tags:
  - "clippings"
  - "foundation-models"
  - "multimodal"
  - "oncology"
  - "digital-pathology"
  - "nci"
  - "nih"
  - "federated-learning"
  - "precision-medicine"
  - "clinical-trials"
order: 100
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[HERO: Histology Encoder for Robust Representation in Oncology]]"
  - "[[From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer]]"
  - "[[Appraising AI studies in pathology]]"
  - "[[Digital pathology evidence]]"
---

# DCTD Workshop on Foundation Models for Cancer: Advancing Diagnosis, Prognosis, and Treatment Response

**National Cancer Institute (NCI) — Division of Cancer Treatment and Diagnosis (DCTD)**  
**Dates:** March 24–26, 2026 (Virtual Workshop)  
**Portal:** [dctd.cancer.gov/about/news-events/events/foundation-models](https://dctd.cancer.gov/about/news-events/events/foundation-models)  
**Program Contact:** Asif Rizwan, Ph.D., Program Director, Diagnostic Biomarkers and Technology Branch, Cancer Diagnosis Program (`asif.rizwan@nih.gov`)  
**Video Archive:** NCI Vbrick Rev Streaming Suite ([Complete Playlist Directory](#workshop-recordings-directory))

---

## Executive Summary & Strategic Mandate

The **National Cancer Institute (NCI) Division of Cancer Treatment and Diagnosis (DCTD)** convened the 3-day landmark workshop, *"Foundation Models for Cancer: Advancing Diagnosis, Prognosis, and Treatment Response"*, on March 24–26, 2026. The symposium brought together oncology clinicians, computational pathologists, medical physicists, biostatisticians, computer scientists, and regulatory scientists to evaluate the paradigm shift triggered by large-scale, self-supervised artificial intelligence models in oncology.

Historically, artificial intelligence in cancer diagnostics has relied on narrow, task-specific supervised models (e.g., dedicated CNNs trained solely for a single binary classification, such as detecting lymph node metastasis or segmenting nuclei in a single cancer type). While effective within narrow training distributions, these legacy pipelines suffer from extreme data hunger, brittle out-of-distribution generalization, susceptibility to scanner and stain confounders, and an inability to synthesize information across disparate diagnostic modalities.

**Foundation models**—deep neural architectures (predominantly Vision Transformers and Multimodal Transformers) pretrained on millions of unlabelled biomedical specimens via self-supervised objectives (such as DINO, iBOT, contrastive learning, and masked token modeling)—provide generalizable, high-dimensional representations of human disease biology. This workshop established an authoritative federal and clinical consensus on how these models are transitioning from basic exploratory prototypes into clinical oncology, trial design, and regulatory science.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                        NCI DCTD FOUNDATION MODELS FOR CANCER: CONCEPTUAL TAXONOMY                      │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  1. UNIFIED MULTIMODAL INGESTION
     [ Gigapixel WSIs ]     [ Volumetric Scans ]     [ Omics & Spatial ]     [ Longitudinal EHR ]
     (H&E, IHC, mIF)        (CT, MRI, PET)          (Bulk/scRNA, Genomics)  (Notes, Labs, Vitals)
            │                       │                         │                       │
            └───────────────────────┼─────────────────────────┴───────────────────────┘
                                    │ Cross-Modal Alignment / Shared Latent Space
                                    ▼
  2. SELF-SUPERVISED PRETRAINED FOUNDATION CORE
     ┌─────────────────────────────────────────────────────────────────────────────────┐
     │ • Pathology Encoders: UNI2, Virchow2, HERO, H-Optimus, CONCH, Prov-GigaPath     │
     │ • Multimodal Fusion: Cross-attention, token pooling, missing-modality imputation│
     │ • Slide-to-Patient Virtual Scaling: Aggregated case-level trajectory modeling   │
     └──────────────────────────────────────┬──────────────────────────────────────────┘
                                            │
                                            ▼
  3. DOWNSTREAM ONCOLOGIC APPLICATIONS
     ├─► Accurate Diagnostics: Automated subtyping, rare phenotype detection, grading
     ├─► Prognostic Stratification: Progression-free survival, disease recurrence hazards
     ├─► Treatment Response & Resistance: In silico therapy screening, immunotherapy response
     ├─► Clinical Decision Support: Automated synoptic report generation, clinical trial matching
     └─► Drug Discovery: Target identification, synthetic control arms, biomarker discovery
                                            │
                                            ▼
  4. RIGOR, GOVERNANCE & FEDERATED TRANSLATION
     ┌─────────────────────────────────────────────────────────────────────────────────┐
     │ • Federated Learning: Multi-institutional model development with zero PHI export│
     │ • Robustness Audits: PathoROB-style site/scanner bias suppression               │
     │ • Interpretability: Structural class visualizations, attention heatmaps, audits │
     │ • Regulatory Science: FDA CDRH Qualified Tools (RST), clear evidential margins  │
     └─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Workshop Recordings Directory

The complete proceedings of the workshop were published in high-definition video across six sessions on the NCI Vbrick Rev enterprise streaming network:

| Session | Direct Stream Link | Focus & Primary Themes |
|---|---|---|
| **Day 1, Part 1** | [Vbrick: d6bad420-a5e6-4a41-be77-dd1d80cc6cde](https://nci.rev.vbrick.com/sharevideo/d6bad420-a5e6-4a41-be77-dd1d80cc6cde) | **Workshop Opening & Foundation Model Primer:** Welcome remarks by DCTD leadership; architectural foundations of self-supervised learning, tokenization, and scaling laws in oncology. |
| **Day 1, Part 2** | [Vbrick: 95899c06-8b68-4656-b8c4-403fac49dd97](https://nci.rev.vbrick.com/sharevideo/95899c06-8b68-4656-b8c4-403fac49dd97) | **Multimodal Integration (Pathology, Radiology & Omics):** Unifying gigapixel tissue microenvironments with macro-radiological phenotypes and genomic mutations; cross-modal attention mechanisms. |
| **Day 2, Part 1** | [Vbrick: 35972ef6-852c-4883-8660-16445900e5db](https://nci.rev.vbrick.com/sharevideo/35972ef6-852c-4883-8660-16445900e5db) | **Prediction, Simulation & Treatment Response:** Modeling patient survival trajectories, predicting resistance to immune checkpoint blockade and targeted agents, and digital patient simulation. |
| **Day 2, Part 2** | [Vbrick: 9c601af4-dba2-49f0-947c-5f9ea7eead0d](https://nci.rev.vbrick.com/sharevideo/9c601af4-dba2-49f0-947c-5f9ea7eead0d) | **Diagnostic Advances & Clinical Case Studies:** Real-world deployments in computational pathology and imaging; rare cancer recognition; reducing diagnostic discordance across community vs. academic centers. |
| **Day 3, Part 1** | [Vbrick: f728e74d-7685-471f-a62d-3630fa0a0d49](https://nci.rev.vbrick.com/sharevideo/f728e74d-7685-471f-a62d-3630fa0a0d49) | **Federated Learning & Collaborative Ecosystems:** Multi-institutional pretraining and fine-tuning across hospital firewalls; handling non-IID data distribution shifts without compromising patient privacy. |
| **Day 3, Part 2** | [Vbrick: f5ecefec-392c-4191-ba07-bfac16f22c91](https://nci.rev.vbrick.com/sharevideo/f5ecefec-392c-4191-ba07-bfac16f22c91) | **Challenges, Interpretability, Regulation & Clinical Translation:** Algorithmic bias, model explainability vs. auditability, FDA regulatory science pathways, workflow integration, and closing synthesis. |

---

## Core Thematic Pillars & Technical Insights

### 1. Multimodal Data Integration: Breaking Clinical Silos

Modern oncology management requires synthesizing information from multiple medical specialties:
- **Histopathology:** Sub-cellular nuclear atypia, mitotic figures, and spatial microenvironmental architecture (fibroblast stroma, tumor-infiltrating lymphocytes, vascular invasion) captured at $20\times/40\times$ magnifications.
- **Radiology:** Volumetric organ macro-architecture, whole-body metastatic burden, and temporal tumor volume dynamics on CT, MRI, and PET.
- **Molecular Omics:** Somatic driver mutations (e.g., *EGFR*, *KRAS*, *BRAF*, *TP53*), copy number alterations, bulk RNA transcriptomics, and in situ spatial transcriptomics (e.g., 10x Xenium, Visium).
- **Electronic Health Records (EHR):** Longitudinal performance status, prior systemic regimens, lab panels, and unstructured narrative clinical notes.

**Technical Challenges & Breakthroughs:**
- *Dimensionality Mismatch:* A single gigapixel WSI contains $\sim 10^{10}$ pixels, whereas a molecular panel may represent $500$ discrete gene mutations, and clinical staging consists of a dozen categorical variables. Naive early fusion causes high-dimensional image vectors to obliterate clinical signals.
- *Intermediate Cross-Attention:* The workshop highlighted intermediate fusion architectures (e.g., multimodal transformers with cross-attention) where specialized modality encoders project into a unified embedding dimension. Modalities are aligned through contrastive objectives (similar to CLIP/CONCH), allowing missing modalities (e.g., when a patient lacks spatial transcriptomics or PET) to be dynamically imputed or masked during inference.

### 2. Digital Patient Trajectory Simulation & Response Prediction

Moving beyond static categorical classification, foundation models enable dynamic **biological and clinical simulation**:
- **Therapy Resistance Modeling:** By projecting tumor genomic and histopathological states into latent trajectories (e.g., MutationProjector and M-Optimus-1 frameworks), models infer how tumor clonal populations and microenvironmental niches (such as protective cancer-associated fibroblasts) evolve under drug pressure.
- **Synthetic Control Arms in Clinical Trials:** Simulating placebo or standard-of-care disease progression using multimodal foundation embeddings helps refine Phase II/III trial eligibility criteria, potentially reducing required patient cohort sizes and accelerating oncology drug development.

### 3. Diagnostic Consistency & Mitigating Inter-Observer Discordance

Pathologist diagnostic discordance remains a well-documented challenge in high-grade malignancies, borderline lesions, and quantitative biomarker scoring (e.g., Gleason grading, Ki-67 proliferation indices, and stromal TIL percentages).
- **Feature Robustness:** Foundation models trained across multi-scanner, multi-laboratory archives extract morphological invariants that remain stable against staining variations, knife chatter, and tissue folds.
- **Screening & Triage:** Models serve as secondary readers, flagging subtle micro-metastases (e.g., in sentinel lymph node biopsies) or atypical cellular clusters in cytology, reducing reader cognitive fatigue and diagnostic error rates.

### 4. Privacy-Preserving Collaborative AI: Federated Learning

Training generalizable oncology foundation models requires access to hundreds of thousands of diverse patient cases. However, strict data privacy regulations (HIPAA, GDPR) and proprietary hospital institutional policies make centralized data pooling across international cancer centers nearly impossible.

- **Federated Architecture:** Rather than transmitting raw patient WSIs or CT volumes across networks, local computing nodes train models on institutional data behind hospital firewalls. Only encrypted parameter updates (gradients or adapter weights) are transmitted to a central aggregator.
- **The Non-IID Distribution Challenge:** The workshop stressed that clinical cancer data is inherently non-identically and independently distributed (non-IID): different hospitals feature unique patient demographics, disease prevalence, histological staining protocols, and scanner optics. Advanced aggregation algorithms (FedProx, federated personalization, and foundation model parameter-efficient fine-tuning via LoRA) are critical to prevent catastrophic model divergence.

### 5. Validation Rigor, Interpretability, and Regulatory Translation

The workshop emphasized that technical benchmarks alone do not ensure clinical efficacy or patient safety.
- **The "Shortcut Learning" Threat:** Baseline foundation models often latch onto non-biological batch effects (such as hospital-specific slide preparation or scanner artifacts) rather than true cellular morphology ([[Towards robust foundation models for digital pathology]], [[HERO: Histology Encoder for Robust Representation in Oncology]]). Rigorous external validation across completely independent hospitals and scanners is mandatory.
- **Auditability over "Black-Box" Heuristics:** Moving beyond local saliency heatmaps, modern interpretability leverages global concept visualization (such as [[Class visualizations and activation atlases for computational pathology]]) to audit the semantic structures learned by frozen backbones.
- **Regulatory Alignment:** Translating models into clinical software (FDA Product Codes `QPN` for digital pathology AI, `POK` for CAD, and `QKQ` for diagnostic viewers) requires establishing clear performance goals, superiority/non-inferiority margins (using tools like FDA CDRH DxGoals), and multi-reader multi-case (MRMC) study designs.

---

## Paradigm Shift: Task-Specific AI vs. Multimodal Foundation Models

| Dimension | Task-Specific Supervised AI (2015–2022) | Multimodal Foundation Models (2024–Present) |
|---|---|---|
| **Training Paradigm** | Supervised learning with manual pixel/tile labels. | Self-supervised learning (DINO, iBOT, contrastive) on unlabelled big data. |
| **Data Scope** | Single modality (e.g., H&E-only, CT-only, or tabular-only). | Native multimodal integration (WSI, CT/MRI, scRNA-seq, clinical text). |
| **Downstream Adaptation** | Model must be retrained from scratch for every new task. | Frozen backbone with lightweight linear probes, attention MIL heads, or LoRA adapters. |
| **Annotation Cost** | High; requires tens of thousands of expert pathologist annotations. | Low; requires minimal task-specific labels (few-shot / zero-shot transfer). |
| **Out-of-Distribution Robustness** | Fragile; prone to failure on unseen scanners, stain kits, or hospitals. | Highly resilient; learns invariant biological features across diverse archives. |
| **Clinical Output** | Narrow categorical labels (e.g., "Tumor: Yes/No"). | Holistic synthesis: diagnosis, subtyping, biomarker status, survival, and therapy response. |
| **Collaboration Model** | Centralized dataset consolidation. | Privacy-preserving federated learning across multi-institutional consortia. |

---

## Organizing Committee & Leadership Roster

The workshop was organized by a multidisciplinary leadership committee from across the National Cancer Institute's Division of Cancer Treatment and Diagnosis (DCTD):

- **Michael Espey, Ph.D., M.T.** — Program Director, DCTD
- **Sean Hanlon, Ph.D.** — Deputy Director, NCI Center for Strategic Scientific Initiatives (CSSI)
- **Subhashini Jagu, Ph.D.** — Program Director, Cancer Diagnosis Program
- **Hala Makhlouf, M.D., Ph.D.** — Senior Pathologist & Program Director, Cancer Diagnosis Program
- **Miguel Ossandon, Ph.D.** — Program Director, Diagnostic Biomarkers and Technology Branch
- **Asif Rizwan, Ph.D.** — Program Director, Diagnostic Biomarkers and Technology Branch, Cancer Diagnosis Program *(Primary Workshop Lead)*
- **Mugdha Samant, Ph.D.** — Scientific Program Specialist, DCTD
- **Shannon Silkensen, Ph.D.** — Program Director, Cancer Diagnosis Program
- **Brian Sorg, Ph.D., M.B.A.** — Program Director, Diagnostic Biomarkers and Technology Branch
- **Umit Topaloglu, Ph.D.** — Program Director, Clinical Trials Informatics, Information Technology and Informatics
- **Dana Wolff-Hughes, Ph.D.** — Health Scientist, Behavioral Research Program

---

## Related Notes & Vault Connections

- [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]] — Empirical benchmarking of foundation model architectures, highlighting parameter scaling, WSI vs. ROI performance decoupling, and hardware throughput tradeoffs.
- [[Towards robust foundation models for digital pathology]] — PathoROB benchmark evaluating how foundation models encode contributing hospital shortcuts.
- [[HERO: Histology Encoder for Robust Representation in Oncology]] — Caris Life Sciences' 1.1B parameter histology foundation model overcoming site confounders via cluster-quota curation.
- [[From whole-slide image to biomarker prediction: end-to-end weakly supervised deep learning in computational pathology]] — STAMP standardized protocol for weakly supervised clinical biomarker prediction.
- [[From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer]] — Reconstructing spatial gene expression and predicting therapeutic resistance directly from H&E slides.
- [[Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)]] — FDA tools (DxGoals, HTT, HistoGen) for validating medical device AI.
- [[What AI Can and Cannot Do in Pathology]] — Practical frameworks for integrating AI into daily clinical diagnostic sign-out.
- [[Digital pathology evidence]] — Broad clinical validation landscape for digital and computational pathology.
