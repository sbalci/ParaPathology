---
type: Clipping
status: Evergreen
language: en
title: "Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center"
source: "https://doi.org/10.1016/j.jpi.2026.100706"
source_type: article
author:
  - "[[Kareem Hosny]]"
  - "[[Olivia Vargas]]"
published: 2026-08-11
created: 2026-09-12
description: "Several artificial intelligence (AI) algorithms have been developed with inherent age, sex, gender, racial, and ethnic biases. In pathology, this leads to marked performance disparities across different demographic groups. In this article, we highlight the root of differences in representation in AI, list the probable causes and clinical implications of these gaps, and propose an ethical framework for addressing representation and bias in AI in pathology. Various studies have highlighted efforts to mitigate the gaps. However, to our knowledge, there are no standard guidelines in the field of pathology that ensure the fair use of AI to counter biases in representation. We propose a heuristic framework that is tailored specifically to lab medicine and pathology workflow. Based on data life cycle and pathology workflow, these guidelines are stratified into governance and leadership strategies, preprocessing phase standards, processing phase standards, operational deployment, and ongoing monitoring guidelines."
tags:
  - "clippings"
  - "artificial-intelligence"
  - "computational-pathology"
  - "digital-pathology"
  - "ethics"
  - "health-equity"
  - "algorithmic-bias"
  - "laboratory-medicine"
order: 130
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Cognitive Bias In AI Assisted Diagnosis]]"
  - "[[Pathology AI Integration: A Systems View]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]]"
  - "[[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]]"
  - "[[Artificial intelligence in digital pathology — time for a reality check - Nature Reviews Clinical Oncology]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[A distributional robustness margin for pathology foundation models]]"
---

# Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center

**Hosny K, Vargas O.** *Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center.* Journal of Pathology Informatics 23 (2026) 100706. Published online: 11 August 2026. DOI: [10.1016/j.jpi.2026.100706](https://doi.org/10.1016/j.jpi.2026.100706). Open Access (CC BY-NC-ND).

- **ScienceDirect / JPI Record:** [doi.org/10.1016/j.jpi.2026.100706](https://doi.org/10.1016/j.jpi.2026.100706)
- **Publisher PII:** S2153-3539(26)00166-5
- **Institution:** Department of Laboratory Medicine and Pathology, University of Washington Medical Center, Seattle, WA, USA

---

## Executive Summary

While the rapid development and FDA clearance of artificial intelligence (AI) and machine learning (ML) models across healthcare have generated immense enthusiasm, computational pathology algorithms frequently exhibit significant performance disparities across age, sex, gender, racial, and ethnic groups. In diagnostic pathology, these algorithmic disparities translate directly into missed diagnoses, skewed prognostic stratifications, miscalibrated clinical cutoffs, and disparate patient outcomes.

Drawing upon prospective implementation experience at the **University of Washington Medical Center (UWMC)** Department of Laboratory Medicine and Pathology, Hosny and Vargas formulate a practical **heuristic ethical framework** tailored specifically to the laboratory medicine and anatomic pathology lifecycle. The framework bridges high-level ethical tenets (beneficence, nonmaleficence, autonomy, and justice) into an operational **15-step roadmap across 5 phases**: governance and leadership, preprocessing standards, processing standards (model design), operational deployment, and continuous shift-based quality monitoring.

---

## The Roots of Bias & Clinical Disparities in Pathology AI

Algorithmic bias in pathology arises from structural vulnerabilities across data, clinical workflows, and workforce composition:

### 1. Massive Demographic Skew in Foundational Repositories
- **The Cancer Genome Atlas (TCGA):** Composed of **82.0% Caucasian**, 10.1% African-American, 7.5% Hispanic, and only 0.4% other ancestral groups.
- **GWAS Catalog:** Over **96%** of participants identify as White of European ancestry.
- **Missing Data Elements:** Sexual orientation and gender identity (SOGI) data are routinely unrecorded in electronic medical records (EMR) and laboratory information systems (LIS). Transgender patients receiving gender-affirming hormones (e.g., testosterone-induced breast tissue remodeling and lobular atrophy) face diagnostic thresholds calibrated against incomplete cisgender cohorts.

### 2. Demonstrated Diagnostic Performance Gaps
Computational pathology models evaluated across multi-institutional cohorts exhibit substantial diagnostic error gaps between Black and White patients:
- **Breast cancer subtyping:** 3.0% performance gap
- **Lung cancer subtyping:** 10.9% performance gap
- **IDH1 mutation prediction in gliomas:** 16.0% performance gap (citing Vaidya et al., *Nat Med* 2024)
- Importantly, state-of-the-art computational bias mitigation algorithms alone fail to resolve these disparities without deliberate demographic stratification in evaluation.

### 3. Biological Microenvironmental Divergence
- In prostate adenocarcinoma, tumor immune microenvironments differ fundamentally by ancestry: prostate cancers in African-American men demonstrate predominantly **peritumoral tertiary lymphoid structures (PT-TLS)**, whereas in Caucasian men, TLS are primarily **intratumoral (IT-TLS)**. AI triage models quantifying TLS density for immunotherapy eligibility must account for spatial topology differences to avoid systematically underselecting minority patients for targeted therapies.

### 4. Laboratory Medicine & Preanalytical Non-Harmonization
Bias in laboratory AI extends beyond image classification into clinical pathology data:
- **Assay Platform Non-Harmonization:** Colorimetric vs. immunological assays for serum albumin yield systematic measurement discrepancies. In membranous nephropathy, where an albumin cutoff of $<25\text{ g/L}$ dictates prophylactic anticoagulation, assay differences can cause **21% to 59%** of patients to be inappropriately withheld therapy.
- **Aggregation Bias:** Machine learning models that pool laboratory data across multi-institutional EHRs treat non-harmonized instrument outputs as equivalent numerical values, baking platform-specific shifts into predictive models.
- **Degraded External Transportability:** A parathyroid hormone-related peptide (PTHrP) prediction model dropped from an internal AUROC of 0.936 to 0.838 and 0.737 upon external multi-center evaluation due to unencoded instrument platform variation.
- **Preanalytical Vulnerability:** Up to 70% of clinical laboratory errors are preanalytical (phlebotomy technique, transport timing, tube additives). Unstandardized preanalytical handling creates dataset shift that eludes conventional in-silico quality checks.

### 5. Workforce & Academic Leadership Gaps
- **Gender Disparity:** Data from the American Board of Pathology (ABP) indicates that while 31.3% of all board-certified pathologists are female, only **20.4%** of board-certified clinical informaticists are female (despite $>50\%$ of incoming pathology residents being women). In academic clinical informatics, women account for only 25.3% of faculty, 16.7% of fellows, and 18.4% of fellowship program directors.
- **Racial Disparity:** ABP diplomates are overwhelmingly White; $<4\%$ identify as Black or African-American. Among 226 board-certified pathology informaticists in the United States, 41 identify as Asian and **only 3** identify as Black or African-American.
- **Global Geographic Skew & Parachute Science:** Over 38% of digital pathology publications originate from North America and Europe. In a MeSH analysis of 1,733 pathology algorithm publications, only 48 ($<3\%$) incorporated demographic or population parameters. Furthermore, "parachute science"—extracting biospecimens or digital data from low-income regions for publication in high-income centers without local capacity investment or data sovereignty—exacerbates global health inequities.

---

## Key Definitions in Pathology AI Ethics (Table 1)

| Term | Formal Definition | Specific Relevance to Pathology AI |
| :--- | :--- | :--- |
| **Health Inequity** | Systematic, avoidable differences in healthcare delivery across populations defined by race, sex, gender, ethnicity, or socioeconomic status. | AI trained on inequitable data entrenches and magnifies diagnostic accuracy gaps across patient tiers. |
| **Health Disparity** | Differences in health outcomes directly linked to social, geographic, and economic disadvantage. | Underrepresented patient populations in training sets face the highest risk of algorithmic misclassification. |
| **Social Determinants of Health (SDOH)** | Non-medical structural factors (healthcare access, insurance status, health literacy, economic stability) shaping health outcomes. | Determine which patient populations and biopsy specimens populate training cohorts. |
| **Privilege / Marginalization** | Unearned systemic advantages arising from dominant group membership; unjust systemic treatment based on group identity rather than merit. | Shapes whose biopsy slides and clinical data are collected, curated, digitized, and prioritized in model pipelines. |
| **Social Bias** | Systematic prejudice or discrimination in favor of or against an individual, group, or demographic category. | Embedded in historical diagnostic practices, inter-observer diagnostic labels, and institutional archives. |
| **Algorithmic Bias** | Systematic inaccuracy or distortion in a mathematical model's predictions, encompassing underfitting (oversimplified models) and overfitting (non-generalizable representations). | The computational mechanism through which unrepresentative training data translate into clinical diagnostic error. |

---

## The 5-Phase, 15-Step Heuristic Ethical Framework (Table 2)

```
                       ┌────────────────────────────────────────────────────────┐
                       │           Phase 1: Governance & Leadership             │
                       │ 1. Diversify Team  2. Workforce Training  3. Friend/Foe│
                       │ 4. Outreach & Anti-Parachute Science                   │
                       └──────────────────────────┬─────────────────────────────┘
                                                  │
                                                  ▼
                       ┌────────────────────────────────────────────────────────┐
                       │              Phase 2: Preprocessing Standards          │
                       │ 5. Gather Real-Life Data   6. Clean, De-ID & Curate   │
                       └──────────────────────────┬─────────────────────────────┘
                                                  │
                                                  ▼
                       ┌────────────────────────────────────────────────────────┐
                       │          Phase 3: Processing Standards (Design)        │
                       │ 7. Data Diversification  8. Model Optimization         │
                       │ 9. Stratified k-Fold & Governance Validation           │
                       └──────────────────────────┬─────────────────────────────┘
                                                  │
                                                  ▼
                       ┌────────────────────────────────────────────────────────┐
                       │         Phase 4: Operational Deployment                │
                       │ 10. Human-in-the-Loop  11. Transparency/Explainability │
                       │ 12. Context-Specific Phased Rollout                    │
                       └──────────────────────────┬─────────────────────────────┘
                                                  │
                                                  ▼
                       ┌────────────────────────────────────────────────────────┐
                       │          Phase 5: Monitoring, Support & Tracking       │
                       │ 13. Auditability  14. Continuous Shift-Based QC (UW)   │
                       │ 15. User & Patient Feedback Loops                      │
                       └────────────────────────────────────────────────────────┘
```

### Phase 1: Governance and Leadership Strategies
1. **Diversify the Development & Decision Team:** Assemble multidisciplinary teams spanning pathologists, informaticists, data scientists, and community representatives. Appoint an embedded **"Representation Champion"** within project teams to audit diversity across the data lifecycle.
   - *Workforce Pipeline Intervention:* At UWMC, the pathology residency selection process removes candidate photographs, gender markers, medical school location, and country of origin prior to file review, using standardized merit rubrics to counter structural entry bias.
2. **Incorporate AI into Workforce Inclusivity Training:** Integrate algorithmic bias identification, reporting mechanisms, and mitigation tools into required institutional ethics curricula.
3. **Use AI as Friend, Not Foe:** Actively deploy AI algorithms as accountability instruments—e.g., auditing academic promotion velocity, salary equity, and identifying systemic marginalization patterns.
4. **Outreach & Ending Parachute Science:** Enforce reciprocal research partnerships, data sovereignty, and funding infrastructure for underresourced global health systems rather than extractive data mining.

### Phase 2: Preprocessing Phase Standards
5. **Gather Real-Life Data:** Purposefully assemble training cohorts reflecting true population demographics (race, sex, gender, age, socioeconomic strata) rather than relying on passive retrospective convenience queries of single-institution archives. Harmonize preanalytical instrument and collection variables.
6. **Clean, De-Identify, Transform, and Prepare Data:**
   - *Expert Human Labeling:* Double-blind ground truth annotation by subspecialty pathologists and the representation champion with structured metadata tagging.
   - *Feature Selection:* Use stepwise forward/backward feature selection to prune spurious demographic artifacts. Enforce a strict ratio of **no more than 1 feature per 10 instances** to prevent overparameterized overfitting.

### Phase 3: Processing Phase Standards (Model Design)
7. **Data Diversification:** Balance subgroup sample distributions. Limit synthetic data augmentation (e.g., GANs or diffusion-based generation) to a strict last resort due to potential fidelity distortions in subtle histomorphology.
8. **Model Optimization:**
   - Control training epochs to prevent memorization of dominant group features.
   - Apply dimensionality reduction (PCA) in unsupervised pipelines.
   - Calculate **demographically stratified confusion matrices** (evaluating sensitivity, specificity, and false-positive rates independently for Caucasian, Black, Asian, and Hispanic subgroups).
   - Apply LASSO ($L_1$) regularization to penalize uninformative weights.
   - Counter the **accuracy paradox** and **null error rate** (preventing classification models from maximizing aggregate accuracy by defaulting exclusively to majority-class predictions).
9. **Model Validation:**
   - Institutional vetting through an interdisciplinary oversight body (e.g., the UW **"AI Use Case Workgroup"** under IT services).
   - Validation via **stratified $k$-fold cross-validation** and bootstrapping explicitly powered for underrepresented cohorts.
   - Employ bias detection sub-algorithms: constraint loops enforcing group fairness, sensitive attribute detachment, and geometric word/concept embedding auditors.

### Phase 4: Operational Management and Deployment
10. **Keep Humans in the Loop:** Champion **augmented intelligence** over autonomous execution. Pathologists must maintain clinical discretion and possess an accessible, instantaneous kill-switch mechanism to abort algorithmic operations upon aberrant behavior.
11. **Transparency and Explainability:** Require transparent model dossiers detailing training set demographics, preanalytical boundaries, decision mechanisms, and confidence thresholds.
12. **Establish Context for Deployment:** Validate algorithms against local clinical demographics and laboratory instruments prior to go-live. Execute gradual, phased deployment rather than institution-wide flash cutovers.

### Phase 5: Ongoing Monitoring, Support, and Tracking
13. **Enforce Auditability and Accountability:** Establish clear administrative liability chains and maintain immutable audit trails of all algorithmic outputs and subsequent pathologist overrides.
14. **Continuous Behavior Monitoring (The UWMC Breast AI Model):**
    - Deploy real-time shift-based quality control matrices to detect slide scanner drift, staining batch shifts, and algorithmic degradation.
    - *UWMC Operational Implementation:* In their clinical digital breast AI deployment, **8 whole-slide control cases** with varying tumor percentages and surface areas are re-run through the algorithm on **every shift**. Results are compared against established reference benchmarks. Any deviation below the College of American Pathologists (CAP) diagnostic accuracy standard ($95\%$) or lower limit of detection ($10\%$) triggers immediate escalation to clinical leadership and algorithm suspension for recalibration.
15. **User and Patient Feedback Loops:** Implement dedicated standard operating procedures (SOPs) and clinical ticketing channels enabling pathologists, laboratory staff, and patients to report discordant outputs for supervised model retraining.

---

## Strategic Significance for Computational Pathology

The framework by Hosny and Vargas represents a pivotal transition in computational pathology ethics: moving from abstract bioethical statements to concrete, auditable engineering controls and clinical laboratory workflows. By demonstrating how preanalytical instrument variation, dataset skew, and workforce demographics intersect with algorithmic architecture, the authors establish that fairness is not merely a post-hoc statistical adjustment, but an active quality assurance imperative across the diagnostic continuum.

---

## Related Notes & Vault Graph

- [[Digital Pathology]]: The central hub for digital scanning, whole-slide imaging (WSI), and computational algorithm deployment.
- [[Cognitive Bias In AI Assisted Diagnosis]]: Cognitive distortions and automation bias in computational diagnostics.
- [[Pathology AI Integration: A Systems View]]: The sociotechnical Complex Adaptive Systems (CAS) and Model-Context-Relation (M-C-R) framework governing laboratory adoption.
- [[What AI Can and Cannot Do in Pathology]]: Clinical, economic, and diagnostic boundaries of computational pathology.
- [[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]]: Structured review of expert-AI cognitive biases across 12 diagnostic failure modes.
- [[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]]: Empirical evaluation of confirmation bias and automation bias under clinical time pressure.
- [[Towards robust foundation models for digital pathology]]: Addressing domain shifts, stain variations, and generalizability in large pathology foundation models.
- [[A distributional robustness margin for pathology foundation models]]: Technical strategies for bounding performance drops across out-of-distribution clinical datasets.
