---
type: Clipping
status: Evergreen
language: en
title: "The pathology report as a boundary object: From clinical communication to computational representation"
source: "https://www.sciencedirect.com/science/article/pii/S3117678X26000028"
source_type: paper
author:
  - "[[Shuoshuo Wang]]"
published: 2026-07-25
created: 2026-09-22
description: "A theoretical framework by Shuoshuo Wang (Harvard Medical School / Broad Institute) in Precision Pathology examining the pathology report as a semantically compressed boundary object (Star & Griesemer 1989). Resolves the fundamental representational paradox: why pathology reports are contextually complete for expert clinical readers yet semantically underdetermined for secondary computational reuse (AI, registries, foundation models). Details selective semantic compression, latent vs. absent information, semantic friction, and introduces Ontology-Separated Pathology Representation (OSPR) to preserve biological state, procedural context, and observational findings."
tags:
  - "clippings"
  - "pathology-informatics"
  - "boundary-objects"
  - "semantic-compression"
  - "computational-pathology"
  - "natural-language-processing"
  - "large-language-models"
  - "knowledge-representation"
  - "synoptic-reporting"
  - "data-provenance"
  - "uncertainty"
order: 153
belongs_to: "[[Clippings]]"
related_to:
  - "[[Theories and Frameworks for Understanding Pathology Practice]]"
  - "[[Pathology AI Integration_ A Systems View]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
  - "[[Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Digital Pathology]]"
  - "[[Quality And Standardisation]]"
---

# The pathology report as a boundary object: From clinical communication to computational representation

**Shuoshuo Wang, MD, PhD**  
Department of Pathology, Beth Israel Deaconess Medical Center, Harvard Medical School, Boston, MA, USA  
Cancer Program, Broad Institute of MIT and Harvard, Cambridge, MA, USA  
*Precision Pathology* 1 (2026) 100002 | Published online: 25 July 2026  
DOI: [10.1016/j.prpath.2026.100002](https://doi.org/10.1016/j.prpath.2026.100002) | PII: [S3117-678X(26)00002-8](https://www.sciencedirect.com/science/article/pii/S3117678X26000028)  
Local PDF: `file:///K:/DownloadsK/1-s2.0-S3117678X26000028-main.pdf`

---

## Executive Summary & The Central Claim

Pathology reports are clinical communication artifacts that have evolved over more than a century to coordinate patient care among pathologists, surgeons, oncologists, radiologists, and primary care clinicians. In contemporary practice, these same documents are increasingly repurposed for secondary computational uses: populating cancer registries, annotating biobanks, driving cohort discovery, training weakly supervised whole-slide imaging (WSI) models, and fine-tuning multimodal vision-language foundation models and large language models (LLMs).

This secondary reuse exposes a fundamental **representational challenge**:
> **The Representational Paradox:** The pathology report is **contextually complete** for its intended human clinical audience while remaining **semantically underdetermined** for downstream computational systems.

This disparity does not reflect poor documentation, inadequate standardization, or clinical sloppiness. Rather, it reflects fundamentally divergent **representational objectives**:
- **Primary Clinical Communication** is an act of **selective semantic compression**. It intentionally omits details that expert human readers can reliably reconstruct using shared professional knowledge, clinical history, institutional workflows, and established diagnostic frameworks.
- **Secondary Computational Reuse** requires explicit representation of relationships, measurement modalities, data provenance, epistemic uncertainty, and negative findings that were never designed to be articulated in narrative text.

As modern medicine accelerates toward multimodal artificial intelligence, the bottleneck is no longer surface natural language processing (NLP) or ever-larger model scale, but the representational properties of the report itself: **precision pathology requires precision semantics**.

```
                           THE REPRESENTATIONAL BOTTLENECK
                           
       [ Biological Reality ] 
                 │
                 ▼  (Selective Semantic Compression by Pathologist)
       [ Pathology Report ]  ◄── "Contextually Complete" for Human Experts
                 │                 (Unpacked via shared training & clinical context)
                 │
                 ├──► Clinical Care (Surgeon, Oncologist, Tumor Board) ──► Seamless Coordination
                 │
                 ▼  (Secondary Computational Reuse: Registries, Biobanks, Foundation Models)
       [ Semantic Friction ] ◄── "Semantically Underdetermined" for Algorithms
                 │                 (Lost relational links, collapsed modalities, inverted hedges)
                 ▼
       [ Computational Failure / Label Noise ]
```

---

## Glossary of Core Theoretical Concepts (Box 2)

| Concept | Definition & Operational Scope | Clinical / Informatics Implication |
|---|---|---|
| **Boundary Object** | An artifact that maintains a common, stable identity across disparate professional communities while allowing each community to satisfy its own distinct informational goals (Star & Griesemer 1989). | Explains why one physically unchanged report simultaneously satisfies surgeons, oncologists, coders, and biobank curators without being rewritten. |
| **Selective Semantic Compression** | The deliberate, lossy omission of reconstructable diagnostic reasoning, procedural context, and biological continua from the written report to optimize cognitive efficiency. | Essential for clinical practice; prevents information overload while ensuring rapid, actionable communication. |
| **Semantic Friction** | The loss, distortion, ambiguity, or error that occurs when diagnostic meaning is transferred between representational systems designed for different purposes. | Occurs when naive NLP or regex extracts surface text tokens without underlying relational structure. |
| **Layered Semantic Interpretation** | The architectural property whereby a single clinical report carries multiple distinct strata of meaning that different user groups recover selectively. | Surgeons read surgical margins; oncologists read grade/stage; molecular pathologists read variant pathogenicity. |
| **Progressive Disclosure** | The cognitive mechanism by which a human expert unpacks only the semantic layer required for the immediate task, leaving adjacent context compressed. | Allows rapid triage without requiring every rater to traverse the entire evidentiary chain. |
| **Latent vs. Absent Information** | **Latent:** Information omitted from text but reliably reconstructable by an expert sharing the clinical context (e.g., negative margins imply organ confinement).<br>**Absent:** Information never recorded anywhere in the document (e.g., cold-ischemia time, cassette block-to-lymph node allocation); recoverable only from primary physical materials. | Algorithms can potentially recover latent information via structured models (OSPR), but no algorithm can recover absent information from the report text alone. |
| **Label-Noise Ceiling** | The mathematical and empirical limit dictating that a supervised machine learning model's performance cannot exceed the fidelity of its training labels. | Weakly supervised WSI pipelines trained on uncurated report extractions inherit systemic semantic noise. |
| **Ontology-Separated Pathology Representation (OSPR)** | An architectural design pattern that decouples and explicitly links three distinct semantic domains: **Biological State**, **Procedural Context**, and **Observational Findings**. | Prevents false assertion of disease (e.g., misinterpreting a negative staging biopsy as metastatic disease). |

---

## The Pathology Report as a Boundary Object (Figure 1)

Introduced by sociologists Susan Leigh Star and James R. Griesemer (1989), **boundary objects** are scientific and technical artifacts that inhabit intersecting social worlds and satisfy the informational requirements of each. A classic analogy is an architectural blueprint:
- An **architect** views it as an aesthetic and functional concept.
- A **structural engineer** evaluates load-bearing members.
- An **electrical contractor** traces conduit paths.
- A **building inspector** audits regulatory and fire-safety compliance.

All stakeholders coordinate around the exact same drawing without needing identical training or reading every line identically.

### Multi-Stakeholder Interpretive Demultiplexer
In anatomical pathology, the report serves as medicine's most information-dense boundary object. When presented with the identical diagnostic statement—such as *"Invasive ductal carcinoma, Nottingham grade 2"*:

```
                           THE REPORT AS A BOUNDARY OBJECT
                           
                                ┌───────────────────┐
                                │  Pathology Report │
                                └─────────┬─────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
     [ Treating Surgeon ]        [ Medical Oncologist ]        [ Cancer Registrar ]
     - Focus: Margins & Depth    - Focus: Nottingham Grade     - Focus: Topography / Histology
     - Goal: Re-excision plan    - Goal: Chemo / Endocrine tx  - Goal: ICD-O-3 & AJCC staging
            │                             │                             │
            ▼                             ▼                             ▼
    [ Molecular Pathologist ]   [ Biobank Curator ]        [ Computational Scientist ]
     - Focus: Biomarker adequacy - Focus: Tissue preservation   - Focus: Supervisory WSI label
     - Goal: NGS / IHC reflex    - Goal: Aliquot annotation    - Goal: Model loss function
```

### The Human-AI Disconnect
A pervasive fallacy in medical AI is assuming that because computers struggle to interpret pathology reports consistently, human clinicians must be interpreting them uniformly. In reality:
- **Human experts do not read reports identically.** Each specialist applies role-specific schema-based filtering, background knowledge, and clinical context to reconstruct what matters to their domain.
- **The report is an interface, not an exhaustive transcript.** It succeeds clinically because all participants share implicit assumptions. When an AI pipeline ingests the report outside this shared professional community, those implicit bridges vanish.

---

## The Mechanics of Semantic Compression

Diagnostic communication balances completeness with cognitive load (Sweller 1988; Schmidt et al. 1990). If a surgical pathologist documented every single examined microscopic field, discarded differential consideration, staining artifact, and optical plane, the resulting dossier would be unreadable in routine acute care.

Compression operates across three distinct mechanisms:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       3 MODES OF SEMANTIC COMPRESSION                       │
├─────────────────────────┬─────────────────────────┬─────────────────────────┤
│ 1. SUMMARIZATION        │ 2. CONTEXTUAL           │ 3. CONTEXTUAL           │
│                         │    RECONSTRUCTION       │    DISAMBIGUATION       │
├─────────────────────────┼─────────────────────────┼─────────────────────────┤
│ - Condenses continuous  │ - Omits procedural and  │ - Uses shared lexical   │
│   biological phenomena  │   workflow facts that   │   containers whose      │
│   into discrete labels. │   are understood.       │   precise meaning is    │
│ - e.g., Mitoses, gland  │ - e.g., "Spleen         │   fixed by coordinate.  │
│   formation, & atypia   │   negative" implies     │ - e.g., "Grade 3" or    │
│   summarized as         │   proper grossing,      │   "Positive" denote     │
│   "Nottingham Grade 2". │   sectioning, & IHC.    │   different concepts.   │
└─────────────────────────┴─────────────────────────┴─────────────────────────┘
```

---

## Why Naive Computational Reuse Fails: Two Systematic Vulnerabilities

### 1. Semantic Containers & Shifted Denotations (Table 1)
Many foundational pathology terms function as linguistic "containers." Normalizing or tokenizing the word alone without its relational object discards the actual biological meaning:

```
| Everyday Term | What It Actually Denotes Depending on Context |
|---|---|
| **"Positive"** | - Surgical margin: Tumor touches inked surface.<br>- ER / PD-L1: Nuclear or membranous expression above a specific clinical threshold.<br>- HER2: Overexpression (IHC 3+) or gene amplification (FISH ratio $\ge 2.0$).<br>- Lymph node: Metastatic tumor present.<br>- p16: Diffuse block-like immunoreactivity (surrogate marker, not viral DNA).<br>- EBER: In situ hybridization signal for Epstein-Barr viral RNA. |
| **"Negative"** | - No carcinoma, no dysplasia, no lymphovascular invasion, no residual tumor, no fungal organisms, or no loss of mismatch repair expression (each an entirely distinct semantic target). |
| **"Margin"** | - True surgical cut surface vs. circumferential/radial margin vs. peritonealized/retroperitoneal anatomical surface (not an operative cut). |
| **"Involved"** | - Spleen, lymph node, vessel, surgical margin, serosa, or bone marrow (identical verb, completely distinct anatomical/prognostic relationships). |
| **"Invasion"** | - Lymphovascular space, perineural space, organ capsule, muscularis propria, myometrium, or extrathyroidal soft tissue (biologically and clinically divergent processes). |
| **"Extends to"** | - Surgical ink, renal sinus fat, organ capsule, adventitia, or serosa. |
| **"Present"** | - Intact neoplasm, coagulative necrosis, perineural invasion, lymphovascular invasion, or tumor budding. |
```

### 2. Incommensurable Scales and Collapsed Certainty (Table 2)

#### A. Identical Labels on Non-Comparable Scales
Treating clinical grades as a unified ordinal variable (`1`, `2`, `3`) collapses distinct biological systems:
- **Diffuse Glioma (WHO CNS):** Combined histological and molecular grading (IDH mutation, 1p/19q codeletion, CDKN2A/B homozygous deletion); not a mitotic proliferation index.
- **Neuroendocrine Neoplasm (WHO NEN):** Pure proliferation threshold based on Ki-67 labeling index ($>20\%$) and mitotic rate ($>20 / 2\,\text{mm}^2$).
- **Invasive Breast Carcinoma (Nottingham):** Semi-quantitative morphologic sum of tubule formation, nuclear pleomorphism, and mitoses.
- **Prostate Carcinoma (Grade Group vs. Gleason):** Grade Group 3 represents Gleason $4+3=7$ (predominantly high-grade pattern 4); confusing this with historical Gleason pattern 3 severely misclassifies clinical risk.
- **Soft Tissue Sarcoma (FNCLCC):** 3-parameter composite of tumor differentiation, mitotic count, and necrosis extent.

#### B. Graded Epistemic Commitment vs. Binary Reduction
Pathologists utilize carefully calibrated epistemic hedges to communicate degrees of certainty. Collapsing these into binary `True/False` flags corrupts clinical reality:

```
   DEFINITIVE CERTAINTY ──────────────────────────────────────────► SPECULATIVE / LOWER-BOUND
   
   "Diagnostic of"  ──►  "Consistent with"  ──►  "Favor"  ──►  "Suspicious for"  ──►  "Cannot exclude"
   [Definitive fact]     [High confidence;       [Ranked pref. [Flag for workup;     [Lower-bound hedge;
                          characteristic]         in diff dx]   not diagnostic]       unresolved risk]
```

---

## Ontology-Separated Pathology Representation (OSPR) (Figure 2)

When natural language processing tools analyze clinical reports, simple token co-occurrence frequently generates catastrophic semantic inversions. 

### The Staging Splenectomy Paradox
Consider the clinical narrative:
> *"Metastatic serous carcinoma. Splenectomy performed. Spleen negative for tumor."*

- **Naive Co-Occurrence Reading:** Identifies tokens `{metastatic, serous carcinoma, splenectomy, spleen}` in close proximity $\longrightarrow$ Infers that the patient has **splenic metastasis** (completely inverting the clinical truth!).
- **Human Expert Reading:** Understands that the primary cancer is serous carcinoma (gynecologic/peritoneal), the splenectomy was a procedural staging intervention, and the negative finding confirms absence of disease in the spleen.

### The OSPR Triad
To resolve this without rewriting clinical reports, Wang introduces **Ontology-Separated Pathology Representation (OSPR)**. OSPR separates narrative text into three explicitly linked, independent semantic domains:

```
                   ONTOLOGY-SEPARATED PATHOLOGY REPRESENTATION (OSPR)
                   
   ┌────────────────────────────────────────────────────────────────────────┐
   │ 1. BIOLOGICAL STATE (Origin)                                           │
   │    - Disease: Serous Carcinoma                                         │
   │    - Origin: Non-spleen primary site (e.g., ovary/peritoneum)           │
   └───────────────────────────────────┬────────────────────────────────────┘
                                       │ Linked Context
                                       ▼
   ┌────────────────────────────────────────────────────────────────────────┐
   │ 2. PROCEDURAL CONTEXT (Action)                                         │
   │    - Procedure: Splenectomy                                            │
   │    - Specimen: Spleen tissue                                           │
   │    - Intent: Surgical staging / exclusion of suspected metastasis      │
   └───────────────────────────────────┬────────────────────────────────────┘
                                       │ Directional Link
                                       ▼
   ┌────────────────────────────────────────────────────────────────────────┐
   │ 3. OBSERVATIONAL FINDINGS (Result)                                     │
   │    - Examination: Histopathological evaluation of spleen               │
   │    - Finding: NEGATIVE for tumor                                       │
   └───────────────────────────────────┬────────────────────────────────────┘
                                       │
                                       ▼
               SYNTHESIZED CONCLUSION: Splenic Involvement = ABSENT
               (Negative result from staging context; avoids co-occurrence error)
```

---

## Synoptic Reporting & The Three Tiers of Information (Table 3)

The College of American Pathologists (CAP) synoptic reporting protocols represent a major historical advance in structured documentation. However, Wang demonstrates that synoptic reporting is also an embodiment of **selective semantic preservation**, structured across three distinct informational tiers:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  THE THREE TIERS OF PATHOLOGY INFORMATION                   │
├───────────┬───────────────────────────────┬─────────────────────────────────┤
│ Tier      │ CAP Reporting Mechanism       │ Concrete Clinical Example       │
├───────────┼───────────────────────────────┼─────────────────────────────────┤
│ **1. EXPLICIT**│ Core mandatory elements;      │ `Histologic type: Invasive`     │
│           │ standardized key-value pairs. │ `adenocarcinoma`                │
├───────────┼───────────────────────────────┼─────────────────────────────────┤
│ **2. IMPLICIT**│ Conditional elements triggered│ - Nodal count reported only when│
│ (Latent)  │ only by positive findings;    │   nodes are present.            │
│           │ line-packed summary phrases.  │ - "All margins negative" stands │
│           │                               │   for each measured margin.     │
├───────────┼───────────────────────────────┼─────────────────────────────────┤
│ **3. ABSENT**  │ Optional "+" data elements;   │ - Cold-ischemia time.           │
│           │ standardized non-answers      │ - Cassette block-to-node map.   │
│           │ ("cannot be determined").     │ - Pre-analytic fixation pH.     │
└───────────┴───────────────────────────────┴─────────────────────────────────┘
```

> [!IMPORTANT]
> **Latent vs. Absent Boundary:** Computational systems can infer and recover **explicit** and **implicit (latent)** information if relational context is supplied. However, **absent content cannot be recovered from the report at all**—it resides exclusively in primary physical artifacts (glass slides, paraffin blocks, gross wet tissue, laboratory instrument logs). Confusing latent data with absent data leads to ungrounded AI hallucination.

---

## Representational Decoupling: Resisting Modality Collapse (Figure 4)

A major failure mode in secondary data registries and AI training sets is **semantic collapse** caused by representational conflation.

### The Biomarker Collapse Trap
In routine clinical practice, a single line—`Biomarker X: Positive`—is sufficient for an oncologist to initiate targeted therapy:

```
   CLINICAL SUFFICIENCY                   UNDERLYING MEASUREMENT PATHWAYS
   
                                          ┌── Path 1: Protein Expression (IHC)
                                          │           [Clone, Platform, Scoring %]
   ┌───────────────────────┐              │
   │ Report:               │              ├── Path 2: Gene Amplification (FISH/CISH)
   │ Biomarker X: Positive ├──────────────┤           [Probe, Signals/Nucleus, Ratio]
   └──────────┬────────────┘              │
              │                           └── Path 3: Transcript Abundance (RT-PCR/RNA-seq)
              ▼                                       [Transcripts/million, Read depth]
   Initiate Targeted Therapy
```

- **The Secondary Failure:** If a secondary research database queries: *"Is the patient eligible for drug Y?"*, the answer is a valid **YES**. But if a computational oncology model queries: *"Was Biomarker X quantified via gene amplification or protein over-expression?"*, the collapsed text returns **NO DATA**.
- **The Solution (Decoupled Representation):** Explicitly representing the assay modality, measurement units, and scoring methodology as metadata layers preserves multi-tier utility without burdening the clinical headline.

---

## Multifocal Disease and Nested Relational Hierarchies

Pathology reports describe deeply nested biological structures, not flat relational tables:

$$\text{Patient} \longrightarrow \text{Encounter} \longrightarrow \text{Specimens} \longrightarrow \text{Blocks/Cassettes} \longrightarrow \text{Lesions} \longrightarrow \text{Microscopic Findings / Biomarkers}$$

In multifocal disease (e.g., synchronous bilateral breast carcinomas or multifocal prostate cancer), an encounter generates multiple lesions with distinct histological subtypes, Nottingham grades, hormonal receptor profiles, and margins. 

When computational data extraction pipelines flatten these hierarchies into single patient-level variables, observations are decoupled from their corresponding anatomical lesions, injecting widespread systemic error into downstream survival models and genomics correlations.

---

## The Report as Infrastructure: Beyond Flat Surface Benchmarks

Wang delivers a critical appraisal of contemporary medical NLP and large language model evaluations:

1. **The Fallacy of Surface NLP Benchmarks:** Measuring exact-string extraction accuracy, token F1-score, or entity-level BLEU/ROUGE creates an illusion of competence while contributing to **evaluation fatigue**. These metrics merely assess whether an algorithm can reproduce surface strings; they fail to evaluate whether the system correctly navigates the report's layered implicit architecture.
2. **Relocating Human Expertise:** Artificial intelligence does not eliminate the need for human pathologists; it relocates expert judgment to:
   - Defining clinical semantic boundaries.
   - Adjudicating ambiguous and edge-case interpretations.
   - Structuring formal ontologies and validating provenance models.
3. **The Risk of AI-Induced Deskilling:** Citing recent findings on cognitive atrophy in medicine (Ke et al., *Nature Medicine* 2026), Wang cautions that if trainees rely passively on generative AI systems to author and summarize reports, they risk losing the foundational diagnostic reasoning required to perform semantic compression and decompression safely.

---

## Comparison Matrix: Clinical Communication vs. Computational Representation

```
| Representational Dimension | Primary Clinical Communication | Secondary Computational Reuse |
|---|---|---|
| **Primary Audience** | Interdisciplinary human clinicians (surgeons, oncologists) | Heterogeneous computational pipelines (registries, LLMs, WSI models) |
| **Optimization Target** | Cognitive speed, readability, and actionable clinical decisions | Syntactic uniformity, ontological alignment, and relational completeness |
| **Evidentiary Handling** | Summarized into categorical diagnostic endpoints | Requires granular preservation of intermediate observations and assays |
| **Implicit Context** | Reconstructed automatically via shared medical education | Lost; leads to misinterpretation without explicit relationship maps |
| **Uncertainty & Ambiguity** | Expressed via graded epistemic qualifiers ("suspicious for") | Collapsed into binary labels or misclassified as missing data |
| **Temporal Stability** | Stable for the active episode of patient care | Fragile; diagnostic definitions and biomarker cutoffs evolve over time |
| **Failure Mode** | Information overload if overly detailed | Semantic friction, inverted logic, and label noise if oversimplified |
```

---

## Synthesis: Implications for the ParaPathology Knowledge Base

Wang's conceptual framework directly integrates with and informs several foundational domains within this vault:

1. **[[Theories and Frameworks for Understanding Pathology Practice]]:** Directly enriches the *Socio-Technical & Organizational Systems* section, establishing Star & Griesemer's boundary object theory alongside distributed cognition and SEIPS human factors engineering.
2. **[[What AI Can and Cannot Do in Pathology]] (Rajendra Singh):** Validates Singh's warning that computational models cannot bypass clinical context; automated systems that digest raw text reports without understanding pre-analytical and workflow provenance will suffer from silent out-of-distribution failure.
3. **Weakly Supervised WSI Foundation Models ([[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]], [[Towards robust foundation models for digital pathology]]):** Highlights that the ultimate bottleneck for slide-level MIL and multimodal embeddings is the **label-noise ceiling** imposed by naively extracted textual ground truth.
4. **Diagnostic Error & Systems Engineering ([[Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology]]):** Demonstrates that communication breakdowns often arise not from individual negligence, but from semantic friction across professional boundaries.

---

## Primary References & Key Literature

- **Wang S.** *The pathology report as a boundary object: From clinical communication to computational representation.* Precision Pathology 1, 100002 (2026). DOI: [10.1016/j.prpath.2026.100002](https://doi.org/10.1016/j.prpath.2026.100002).
- **Star SL, Griesemer JR.** *Institutional ecology, 'translations' and boundary objects: amateurs and professionals in Berkeley's Museum of Vertebrate Zoology, 1907–39.* Social Studies of Science 19(3), 387–420 (1989).
- **Campbell WS, et al.** *Advancements in interoperability: achieving anatomic pathology reports that adhere to international standards and are both human-readable and readily computable.* JCO Clinical Cancer Informatics 9, e2400180 (2025). DOI: [10.1200/CCI-24-00180](https://doi.org/10.1200/CCI-24-00180).
- **Hwang J, et al.** *Building a standardized cancer synoptic report with semantic and syntactic interoperability: development study using SNOMED CT and fast healthcare interoperability resources (FHIR).* JMIR Medical Informatics 13, e76870 (2025). DOI: [10.2196/76870](https://doi.org/10.2196/76870).
- **Ke Y, et al.** *AI-induced never-skilling in medical education.* Nature Medicine 32, 1997–2006 (2026). DOI: [10.1038/s41591-026-04438-y](https://doi.org/10.1038/s41591-026-04438-y).
- **Sweller J.** *Cognitive load during problem solving: effects on learning.* Cognitive Science 12(2), 257–285 (1988).
- **Schmidt HG, Norman GR, Boshuizen HPA.** *A cognitive perspective on medical expertise: theory and implications.* Academic Medicine 65(10), 611–621 (1990).
