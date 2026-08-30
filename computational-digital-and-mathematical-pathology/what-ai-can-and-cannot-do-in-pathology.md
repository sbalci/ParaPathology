---
type: Note
status: Evergreen
language: en
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Image Analysis]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
url: https://www.youtube.com/watch?v=IvHNQDGiElE
speaker: Dr. Rajendra Singh
aliases:
  - "What AI Can and Cannot Do in Pathology"
publish: false
---

# What AI Can and Cannot Do in Pathology

**Speaker:** Dr. Rajendra Singh, MD (Professor of Pathology & Dermatology, Associate Vice Chair for Digital Pathology at UPenn; Founder of PathPresenter)  
**Platform:** pathCast  
**Video:** [YouTube: IvHNQDGiElE](https://www.youtube.com/watch?v=IvHNQDGiElE)

{% embed url="https://www.youtube.com/watch?v=IvHNQDGiElE" %}

---

## Executive Summary

A pragmatic evaluation of artificial intelligence in pathology, contrasting realistic clinical and laboratory utility against prevailing hype. The presentation delineates high-value, reproducible tasks where computer vision and natural language processing deliver immediate efficiency and diagnostic precision, while establishing the hard boundaries of clinical judgment, liability, and the necessity for pathologist-led governance.

---

## What AI CAN Do (Capabilities & Practical Applications)

### 1. Pre-analytic & Laboratory Quality Control
- **Specimen Verification:** Confirms tissue presence on glass/digital slides, detecting blank slides or inadequate biopsies.
- **Artifact & Focus Detection:** Identifies out-of-focus areas, air bubbles, fold artifacts, or section chatter before pathologist review.
- **Orientation & Layout Optimization:** Standardizes tissue orientation and aligns serial sections or IHC panels automatically.

### 2. Objective Quantification & Tedious Counting
- **Mitotic Figure Counting:** Standardizes mitosis quantification across defined high-power fields (HPFs) or hot spots.
- **Linear Measurements:** Measures Breslow thickness in melanoma, depth of invasion (DOI) in carcinomas, and margin clearance.
- **Immunohistochemical Biomarker Scoring:** Quantifies nuclear (e.g., Ki-67, ER, PR), membranous (e.g., HER2), and immune-checkpoint (e.g., PD-L1 CPS/TPS) staining patterns with high reproducibility.

### 3. Screening & Object Detection
- **Micro-metastasis Screening:** Flags occult metastasis in sentinel lymph nodes (e.g., breast, melanoma, colorectal cancer).
- **Infectious Organism Detection:** Screens for scarce pathogens, including *Helicobacter pylori*, acid-fast bacilli (AFB), and fungi.
- **Prostate & Cervical Triaging:** Assists in grading prostate biopsies (Gleason scoring) and screening cytology specimens (Pap smears).

### 4. Administrative & Reporting Assistance
- **Drafting & Synoptic Structuring:** Synthesizes voice dictations or unstructured notes into standardized CAP synoptic reports.
- **Coding & Billing Suggestions:** Recommends relevant ICD-O-3, ICD-10, and CPT codes based on rendered diagnoses.
- **Error & Discrepancy Flagging:** Cross-checks diagnosis against specimen metadata to prevent laterality errors, gender/age discordance, or omitted required reporting elements.

### 5. Molecular & Genomic Surrogates from H&E
- Infers presence of genetic alterations (e.g., MSI-H / dMMR, *BRAF*, *EGFR*, *KRAS*) directly from whole-slide morphology as rapid triaging tools while formal sequencing is pending.

---

## What AI CANNOT Do (Limitations & Critical Boundaries)

### 1. Holistic Clinical Synthesis & Complex Judgment
- **Contextual Integration:** AI operates on pixel patterns and isolated metrics; it cannot synthesize clinical history, radiological findings, intraoperative notes, prior biopsy records, and overall disease trajectory.
- **Patient-Centric Nuance:** Clinical decision-making accounts for age, comorbidities, patient preferences, and treatment goals—factors outside image-only algorithms.

### 2. Autonomous Sign-Out & Diagnostic Liability
- **Medicolegal Responsibility:** AI cannot hold medical licensure or assume legal liability. The signing pathologist remains legally, ethically, and clinically accountable for every diagnosis.
- **Supervision Requirement:** AI functions as an assistive "copilot" or screening filter, never as an unsupervised diagnostician.

### 3. Borderline, Gray-Zone & Rare Entities
- **Morphologic Overlap:** Struggles with borderline atypias, atypical melanocytic lesions, follicular thyroid neoplasms, and reactive atypia mimicking dysplasia.
- **Out-of-Distribution (OOD) Vulnerability:** Degrades unpredictably when faced with rare tumors, unusual histological variants, or atypical preparation/staining techniques not represented in training datasets.

---

## Governance, Transparency & Accountability

- **Pathologist-Led Governance:** Pathology departments must retain authority over validation, deployment thresholds, and operational rules.
- **Auditability:** Models must avoid "black-box" invisibility; departments need clear visibility into training datasets, model versions, confidence calibrations, and known failure modes.
- **Continuous Monitoring:** Ongoing post-deployment surveillance is essential to catch performance drift caused by scanner upgrades, reagent batch changes, or case-mix shifts.

---

## Why This Matters for Pathology

- Frames AI adoption around concrete workflow enhancements (error prevention, automated counting, report generation) rather than existential replacement fears.
- Highlights that the highest immediate return on investment (ROI) in digital pathology often stems from pre-diagnostic QC and administrative streamlining rather than pure diagnostic classification alone.
- Re-centers the pathologist's role as the indispensable diagnostic integrator, critical thinker, and ethical guardian of patient care.
