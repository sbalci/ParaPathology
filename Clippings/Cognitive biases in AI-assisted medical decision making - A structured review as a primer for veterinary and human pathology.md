---
type: Clipping
status: Evergreen
language: en
title: "Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology"
source: "https://journals.sagepub.com/doi/10.1177/03009858261472493"
source_type: article
author:
  - "[[Emely Rosbach]]"
  - "[[Jonathan Ammeling]]"
  - "[[Christof A. Bertram]]"
  - "[[Andreas Riener]]"
  - "[[Marc Aubreville]]"
published: 2026-08-05
created: 2026-09-08
description: "A structured literature review across ACM, IEEE, and PubMed evaluating cognitive biases in AI-assisted medical decision making. Across all medical fields, only 8 primary studies empirically measured cognitive bias during expert-AI collaboration, with exactly ONE originating from pathology. Formulates definitions and hypothetical pathology-specific vignettes across 12 cognitive biases as a primer for practitioners."
tags:
  - "clippings"
  - "digital-pathology"
  - "computational-pathology"
  - "cognitive-bias"
  - "human-ai-interaction"
  - "decision-support"
  - "veterinary-pathology"
order: 120
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
  - "[[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Pathology AI Integration: A Systems View]]"
---

# Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology

**Rosbach E, Ammeling J, Bertram CA, Riener A, Aubreville M.** *Cognitive biases in AI–assisted medical decision making: A structured review as a primer for veterinary and human pathology.* Veterinary Pathology (2026). Published online: 5 August 2026. DOI: [10.1177/03009858261472493](https://journals.sagepub.com/doi/10.1177/03009858261472493). PMID: [42557856](https://pubmed.ncbi.nlm.nih.gov/42557856/).

- **SAGE Article:** [doi.org/10.1177/03009858261472493](https://journals.sagepub.com/doi/10.1177/03009858261472493)
- **PubMed Record:** [PMID 42557856](https://pubmed.ncbi.nlm.nih.gov/42557856/)

---

## Executive Summary

Artificial intelligence tools are rapidly proliferating in diagnostic medicine, yet their clinical adoption is accompanied by substantial risks of cognitive distortions. This structured review comprehensively surveyed the medical and computer science literature (ACM, IEEE, and PubMed) to identify and classify cognitive biases arising during expert–AI diagnostic collaboration.

The review reveals a critical empirical deficit in pathology: **out of all primary empirical studies measuring cognitive bias in AI-assisted medicine, only a single primary study originates from pathology** (the Rosbach et al. CHI '25 tumour cell percentage estimation study). Because empirical pathology literature on cognitive bias is virtually nonexistent, the authors establish formal definitions and construct worked, pathology-specific hypothetical scenarios across **12 cognitive biases** to serve as an actionable primer for human and veterinary pathologists.

---

## Review Scope & Corpus Breakdown

The structured review applied systematic eligibility criteria to identify studies that explicitly operationalised cognitive biases during expert–AI interaction in diagnostic workflows:

| Study Category | Count | Notes |
| :--- | :--- | :--- |
| **Final Literature Corpus** | **24 studies** | Identified via ACM Digital Library, IEEE Xplore, and PubMed |
| — Primary Empirical Studies | **8 studies** | Measuring cognitive biases directly in expert clinicians |
| — Review Articles | **16 reviews** | Synthesizing broader aspects of AI interaction |
| **Additional Primary Studies** | **18 studies** | Extracted from citations across the 16 review articles |
| **Identified Cognitive Biases** | **12 biases** | Characterized across medical decision-making |
| **Primary Studies in Pathology** | **1 study** | The CHI '25 tumour cell percentage study by the same author group |

---

## Key Cognitive Biases in Diagnostic Pathology

The review synthesizes 12 cognitive biases relevant to AI integration, highlighting how diagnostic interfaces and decision-support algorithms interact with human clinical cognition:

1. **Automation Bias:** Pathologists unreflectively deferring to algorithmic suggestions, overlooking evident false positives or false negatives (particularly acute under high specimen turnaround pressure).
2. **Confirmation Bias (False Confirmation):** Pathologists actively seeking out morphological features that confirm a flawed algorithmic suggestion, or being reinforced when flawed AI agrees with their own misclassification.
3. **Anchoring Bias:** Initial exposure to an algorithmic heatmap or probability score disproportionately anchors the subsequent morphological examination and differential diagnosis.
4. **Search Satisficing & Premature Closure:** Concluding the slide search immediately once an AI-flagged lesion is identified, thereby missing co-occurring or subtle synchronous lesions in unflagged regions.
5. **Availability Bias & Over-Reliance:** Overestimating the likelihood of diagnostic entities frequently emphasized or highlighted by a specialized AI tool.
6. **Algorithmic Aversion:** Distrusting or rejecting valid AI recommendations following a single perceived algorithmic error.

---

## Relevance to Pathology Practice & Systems Integration

- **The Pathology Evidence Gap:** While hundreds of papers benchmark AI algorithm AUCs on benchmark datasets, virtually none examine what algorithmic advice does to the human decision-maker's cognitive ecology.
- **Interdisciplinary Value:** The paper bridges veterinary pathology (with its extreme diversity of species, pre-analytics, and scarce specialized decision support) and human clinical pathology.
- **Workflow & Cognitive Ergonomics:** The findings underscore that safe AI integration requires thoughtful cognitive ergonomics (e.g., cognitive forcing functions, deferred AI reveals, and active uncertainty communication) rather than passive display overlays.
