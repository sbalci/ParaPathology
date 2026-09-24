---
type: Clipping
status: Evergreen
language: en
title: "When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology"
source: "https://doi.org/10.1145/3706598.3713319"
source_type: article
author:
  - "[[Emely Rosbach]]"
  - "[[Jonathan Ammeling]]"
  - "[[Stefan Krügel]]"
  - "[[Alexander Kießig]]"
  - "[[Andreas Fritz]]"
  - "[[Jannik Ganz]]"
  - "[[Céline Puget]]"
  - "[[Taryn Donovan]]"
  - "[[Andrea Klang]]"
  - "[[Melanie C. Köller]]"
  - "[[Pamela Bolfa]]"
  - "[[Mara Tecilla]]"
  - "[[Daniela Denk]]"
  - "[[Matti Kiupel]]"
  - "[[Georgia Paraschou]]"
  - "[[Marja K. Kok]]"
  - "[[Alexander F. H. Haake]]"
  - "[[Ronald R. de Krijger]]"
  - "[[Theerawit Kasantikul]]"
  - "[[Angelika F.-P. Sonnen]]"
  - "[[Gerry M. Dorrestein]]"
  - "[[Rachel C. Smedley]]"
  - "[[Nikolas Stathonikos]]"
  - "[[Markus Uhl]]"
  - "[[Christof A. Bertram]]"
  - "[[Andreas Riener]]"
  - "[[Marc Aubreville]]"
published: 2025-04-26
created: 2026-09-08
description: "Twenty-eight pathologists estimated tumour cell percentage (TCP) twice across 20 H&E patches, two weeks apart, the second time with an AI model under time pressure manipulations. When the AI prediction aligned with pathologists' own wrong initial estimate (false confirmation), they shifted disproportionately towards it, reducing their reliance on their own baseline judgement. Counter-intuitively, time pressure attenuated confirmation bias while exacerbating automation bias."
tags:
  - "clippings"
  - "digital-pathology"
  - "computational-pathology"
  - "cognitive-bias"
  - "human-ai-interaction"
order: 110
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
  - "[[Cognitive biases in AI–assisted medical decision making - A structured review as a primer for veterinary and human pathology]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Pathology AI Integration: A Systems View]]"
---

# When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology

**Rosbach E, Ammeling J, Krügel S, Kießig A, Fritz A, Ganz J, Puget C, Donovan T, Klang A, Köller MC, Bolfa P, Tecilla M, Denk D, Kiupel M, Paraschou G, Kok MK, Haake AFH, de Krijger RR, Kasantikul T, Sonnen AF-P, Dorrestein GM, Smedley RC, Stathonikos N, Uhl M, Bertram CA, Riener A, Aubreville M.** *\"When Two Wrongs Don't Make a Right\" — Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology.* Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems (CHI '25), April 2025, Yokohama, Japan. ACM, pp. 1–18. DOI: [10.1145/3706598.3713319](https://doi.org/10.1145/3706598.3713319). Preprint: [arXiv:2411.01007](https://arxiv.org/abs/2411.01007).

- **ACM Version of Record:** [doi.org/10.1145/3706598.3713319](https://doi.org/10.1145/3706598.3713319)
- **arXiv Preprint:** [arXiv:2411.01007](https://arxiv.org/abs/2411.01007)

---

## Executive Summary

While computational pathology studies overwhelmingly evaluate algorithmic accuracy, this landmark reader study investigates the **cognitive impact of AI assistance on pathologists themselves**. 

Evaluating **tumour cell percentage (TCP)**—a routine, quantitative clinical endpoint critical for gating downstream molecular oncology assays (e.g., NGS eligibility thresholds)—the authors empirically measured **confirmation bias (false confirmation)** in 28 experienced pathologists across 20 H&E patches. 

The study demonstrated that when erroneous AI advice was congruent with a pathologist's own wrong initial impression, pathologists weighted the AI advice disproportionately over their own clinical assessment. Under acute time pressure, confirmation bias paradoxically decreased because **automation bias eclipsed confirmation bias**—pathologists ceased evaluating congruence and defaulted directly to accepting the AI prediction.

---

## Study Design & Methodology

```
Round 1: Unaided Baseline
  └── 28 Pathologists estimate TCP on 20 H&E patches (no AI assistance)
        │
        ▼ [Two-week washout period]
Round 2: AI-Assisted Evaluation (2×2 Within-Subject Factorial)
  ├── Condition A: AI assistance without time pressure
  └── Condition B: AI assistance WITH time pressure (10-second countdown; blur lock at 7.5 s)
```

- **Participants:** 28 completed both rounds (25 board-certified pathologists, 2 residents, 1 senior staff member; 53.5% with >15 years experience) spanning human and veterinary pathology across 9 countries.
- **Task:** TCP estimation on 20 unstandardized H&E breast cancer patches (drawn from BreCaHad, BreastPathQ, and Frei 2023) exhibiting diverse challenges (necrosis, lymphocytic infiltrate, variable cellularity).
- **AI Model:** A real, unsimulated FCOS object detection network trained on BreCaHad. Because test patches came across heterogeneous datasets, the AI exhibited natural covariate shift and realistic error patterns (~50% accurate, ~50% erroneous).
- **Explainability (xAI):** Prototype-based visual explanations displaying exemplary detected neoplastic and non-neoplastic nuclei, alongside toggleable color-coded cell detection masks.
- **Operationalization of Confirmation Bias:** Linear mixed-effects models (LMMs) evaluating how the final estimate ($Est_{AI}$) shifted relative to the participant's baseline ($Est_B$) and the AI's prediction ($Pred_{AI}$). Specifically focused on *false confirmation*, where baseline, final, and AI estimates all erred in the same direction beyond 5 percentage points from ground truth.

---

## Key Findings

### 1. Robust Confirmation Bias (False Confirmation)
When AI advice errs in the same direction as the reader's initial incorrect judgement, the human's final judgement is pulled strongly toward the AI advice (regression slope = **0.61**, $p < 0.001$).
- In the **congruent AI** condition (Model 2, $n=78$): The pathologist's **own prior baseline estimate was no longer a statistically significant predictor** of their final answer ($\beta = 0.25, p = 0.09$), whereas the AI prediction was decisive ($\beta = 0.60, p < 0.001$).
- In the **incongruent AI** condition (Model 3, $n=139$): Pathologists retained significant reliance on their own judgement ($\beta = 0.47, p < 0.001$) alongside the AI ($\beta = 0.43, p < 0.001$).

### 2. Time Pressure Shifts Confirmation Bias into Automation Bias
- Under acute time pressure (10-second limit), confirmation bias slope actually *decreased* from **0.65 to 0.56**.
- However, overall reliance on the AI advice increased: Judge-Advisor Statistic (JAS) rose significantly from **0.49 to 0.55** ($t(27) = -2.80, p = 0.005$).
- **Cognitive Interpretation:** Under severe temporal stress, cognitive reflection diminishes; instead of checking whether the algorithmic output aligns with their own visual Gestalt, practitioners default to blind adherence (**automation bias**).

---

## Implications for Clinical AI Integration

1. **Interface Design (Cognitive Forcing Functions):** 
   Displaying AI quantitative outputs concurrently during initial slide viewing invites confirmation and anchoring bias. Presenting AI suggestions *after* the pathologist registers an initial estimate (sequential or gated presentation) mitigates premature closure.
2. **Workload & Diagnostic Turnaround Pressure:** 
   Pressured environments amplify automation bias. High laboratory specimen throughput reduces critical scrutiny of algorithmic recommendations.
3. **Reader Study Methodology:** 
   Evaluating AI tools solely on combined human+AI accuracy hides cognitive traps. Reader studies must establish unaided baselines with washout periods to disentangle true error correction from reinforced misconceptions.

<!-- tolaria:related:start -->

## See also

* [Articles on computational, digital, and mathematical pathology](../computational-digital-and-mathematical-pathology/articles-on-computational-digital-and-mathematical-pathology.md)
* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center](Ethical%20guidelines%20for%20deploying%20artificial%20intelligence%20applications%20in%20the%20pathology%20field%20-%20Lessons%20learned%20from%20a%20prospective%20framework%20in%20a%20large%20tertiary%20care%20academic%20medical%20center.md)
* [Pathology AI Integration: A Systems View](../theories/Pathology%20AI%20Integration_%20A%20Systems%20View.md)

<!-- tolaria:related:end -->
