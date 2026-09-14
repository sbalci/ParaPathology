---
type: Clipping
status: Evergreen
language: en
title: "Screening efficiency over experience: Rapid target detection in low-power field as a modifiable cognitive biomarker for diagnostic accuracy in digital cytology"
source: "https://acsjournals.onlinelibrary.wiley.com/doi/10.1002/cncy.70132"
source_type: article
author:
  - "[[Naoya Abe]]"
  - "[[Yukari Nishimura]]"
  - "[[Kazuya Yamashita]]"
  - "[[Takushi Kawamorita]]"
  - "[[Yusuke Takatori]]"
  - "[[Yoshiki Murakumo]]"
  - "[[Reiko Furuta]]"
published: 2026-07-07
created: 2026-09-12
description: "Eye-tracking study of 100 cytotechnologists (1–40 years experience) and 28 students evaluating 30 digital cytology images. Demonstrates the 'experience paradox': professional experience showed no significant correlation with diagnostic accuracy (r = 0.189). Instead, shorter total fixation duration on low-power field (LPF) diagnostic targets ('pop-out' detection) was the sole independent predictor of high accuracy (p = .045). Proves that visual search efficiency and selective neglect of irrelevant background are rapidly modifiable cognitive biomarkers acquired through structured training, redefining competence for AI-assisted digital cytology."
tags:
  - "clippings"
  - "digital-cytology"
  - "digital-pathology"
  - "eye-tracking"
  - "cognitive-biomarkers"
  - "diagnostic-accuracy"
  - "visual-search"
  - "medical-education"
  - "artificial-intelligence"
order: 130
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
  - "[[Cognitive biases in AI-assisted medical decision making - A structured review as a primer for veterinary and human pathology]]"
  - "[[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]]"
  - "[[Pathology AI Integration_ A Systems View]]"
---

# Screening efficiency over experience: Rapid target detection in low-power field as a modifiable cognitive biomarker for diagnostic accuracy in digital cytology

**Abe N, Nishimura Y, Yamashita K, Kawamorita T, Takatori Y, Murakumo Y, Furuta R.** *Screening efficiency over experience: Rapid target detection in low‐power field as a modifiable cognitive biomarker for diagnostic accuracy in digital cytology.* Cancer Cytopathology (2026). Published online: 7 July 2026. DOI: [10.1002/cncy.70132](https://doi.org/10.1002/cncy.70132).

- **Wiley Online Library:** [doi.org/10.1002/cncy.70132](https://doi.org/10.1002/cncy.70132)
- **Local PDF:** `K:\DownloadsK\Cancer Cytopathology - 2026 - Abe - Screening efficiency over experience  Rapid target detection in low‐power field as a.pdf`
- **Institution:** Kitasato University (School of Allied Health Sciences, Graduate School of Medical Sciences, and Hospital), Kanagawa, Japan.

---

## Executive Summary

In classical light microscopy, screening expertise has traditionally been equated with accumulated years of clinical on-the-job experience. However, the adoption of digital whole-slide imaging (WSI) and artificial intelligence (AI) is fundamentally altering the human observer's role: instead of performing exhaustive manual tile-by-tile sweeps, pathologists and cytotechnologists (CTs) increasingly act as **rapid verifiers of candidate regions of interest (ROIs) proposed by algorithms**.

This landmark eye-tracking study evaluates gaze dynamics across two distinct cohorts:
1. **Phase 1 (Cross-Sectional Expertise Study, $n = 100$ CTs):** Evaluated 100 practicing cytotechnologists with professional experience spanning 1 to 40 years.
2. **Phase 2 (Longitudinal Educational Intervention, $n = 28$ Trainees):** Tracked 28 cytotechnology students before and after a standard 3-month practical training program.

The results establish two fundamental principles:
- **The Experience Paradox:** Years of professional experience showed **no significant correlation with diagnostic accuracy** ($r = 0.189, p = .0596$). Seniority primarily correlated with time spent reading clinical requisition notes ($r = 0.228, p = .022$), reflecting cautious habits rather than superior discriminatory vision.
- **LPF Pop-Out Efficiency as Independent Predictor:** In multivariate nominal logistic regression, **shorter total fixation duration on the low-power field (LPF) main diagnostic target** was the **sole independent predictor of high diagnostic accuracy** ($p = .0454$). High performers rely on global parafoveal processing ("pop-out" target detection) rather than slow, exhaustive focal scrutiny.
- **Trainable Selective Neglect:** Trainees in Phase 2 acquired this expert visual pattern within 3 months, dramatically accelerating time to first target fixation ($r = 0.86, p < .0001$) while increasing the time to first fixation on normal background cells ($r = 0.71, p < .0001$). They learned *what not to look at* ("selective neglect" / information reduction).

---

## Study Design & Experimental Methods

```
Phase 1: Expertise Analysis (n = 100 CTs, 1–40 yrs experience)
        │
        ▼
   30 Digital Cytology Images (15 Cervical, 15 Respiratory)
   Tobii Pro Lab Eye-Tracker (6 Areas of Interest)
        │
        ├─► Experience vs. Accuracy: r = 0.189 (p = .0596) [NO CORRELATION]
        ├─► Experience vs. Clinical History: r = 0.228 (p = .022) [CAUTIOUS HABIT]
        └─► Multivariate Logistic Regression:
            Short LPF Target Fixation = SOLE PREDICTOR OF ACCURACY (p = .0454)

Phase 2: Educational Modifiability (n = 28 Students)
        │
   3-Month Practical Cytotechnology Curriculum (No gaze-feedback intervention)
        │
        ▼
   Pre- vs. Post-Training Comparison (Set A vs. Set B, matched 30 images)
        │
        ├─► Time to HPF cytoplasm fixation: 70% decrease (r = 0.86, p < .0001)
        ├─► Time to LPF normal cells fixation: Delayed/ignored (r = 0.71, p < .0001)
        └─► Conclusion: LPF efficiency is a learnable, objective cognitive biomarker
```

### Areas of Interest (AOIs)
Using Tobii Pro Lab software, gaze positions were recorded across 6 calibrated AOIs:
1. **Sample Information:** Specimen source, patient age, and gender on the digital screen.
2. **Background:** Slide areas devoid of diagnostic cells or cellular clusters.
3. **LPF Normal Cells:** Benign/normal cell groupings visible at low magnification.
4. **LPF Main Object:** The primary diagnostic lesion/atypical cluster in the low-power view.
5. **HPF Cytoplasm:** High-magnification cytoplasmic texture and boundaries.
6. **HPF Main Object:** High-magnification nuclear chromatin, nucleoli, and nuclear membranes.

---

## Detailed Findings

### 1. The "Experience Paradox"
- Overall diagnostic accuracy across 100 CTs averaged **82.1%** (range: 63.3%–96.7%; 95% CI: 80.6%–83.7%).
- **Years of experience did not correlate with diagnostic accuracy** ($r = 0.189, p = .0596$).
- While all participants with $<70\%$ accuracy had $<10$ years experience, many novices achieved diagnostic accuracies comparable to or exceeding veterans with $20+$ to $40$ years of service.
- **What experience did predict:** Senior CTs spent significantly more time reviewing the clinical history (first visit duration: 0.18 s vs. 0.14 s, $p = .026$; visit count: $r = 0.228, p = .022$). However, this compensatory caution did not translate into higher diagnostic yields.

### 2. Gaze Metrics Predicting High Diagnostic Accuracy
- ROC analysis established an optimal diagnostic accuracy threshold of **$>83\%$** ($p = .0088$).
- High-accuracy participants exhibited:
  - Significantly shorter total examination time ($p = .0076$).
  - Less background dwelling ($p = .016$).
  - Faster time to first fixation on diagnostic cytoplasm ($p = .039$).
- In multivariate nominal logistic regression incorporating experience, sample information fixation, and target fixation:
  - **Total fixation duration on the LPF main object was the only statistically significant independent predictor** ($p = .0454$).
  - Practitioners who rapidly recognized abnormal patterns on low power and confirmed them swiftly with high power achieved superior accuracy.

| Gaze Metric Parameter | High Accuracy Group (>83%) | Low Accuracy Group (≤83%) | Significance |
| :--- | :--- | :--- | :--- |
| **Total Examination Time** | Rapid (Mean ~14–25 s) | Prolonged (Up to 104 s) | $p = .0076$ |
| **Total Fixation on Background** | Minimal | Recursive / Extended | $p = .016$ |
| **Time to HPF Target Fixation** | Immediate | Delayed | $p = .039$ |
| **Search Pattern Structure** | Linear, rhythmic (LPF $\to$ HPF) | Fragmented, cyclical loops | NVivo spatiotemporal |
| **Multivariate Predictor** | **Short LPF Target Fixation** | **Long LPF Target Fixation** | **$p = .0454$** |

### 3. Spatiotemporal Gaze Dynamics (NVivo Visualizations)
Spatiotemporal timeline reconstructions showed two fundamentally divergent visual strategies:
- **High Performers (Linear Rhythmic Strategy):** Completed slide evaluation in ~14 seconds. Immediate low-power target detection followed by a direct, unhesitating hop to high-power nuclear/cytoplasmic verification, concluding with final classification.
- **Low Performers (Fragmented Recursive Strategy):** Required up to 104 seconds. Exhibited disjointed scanpaths, wandering over benign cellular clusters, repeatedly returning to requisition data, and re-checking irrelevant background areas.

### 4. Educational Modifiability & "Selective Neglect" (Phase 2)
In the longitudinal cohort of 28 cytotechnology students before and after a 3-month curriculum:
- **Rapid Target Acquisition:** Time to first fixation on diagnostic cytoplasm decreased with a massive effect size ($r = 0.86, p < .0001$).
- **Acquisition of Selective Neglect:** Time to first fixation on normal background cells significantly *increased* ($r = 0.71, p < .0001$). Trainees learned to actively disregard non-informative normal cells.
- This demonstrates that **visual expertise is not an inevitable byproduct of decades of unguided exposure**, but a discrete, learnable cognitive mechanism—the strategic filtering of visual noise—that develops rapidly under structured training.

---

## Implications for AI-Assisted Digital Pathology Workflows

1. **The Shift from "Searcher" to "Verifier":**
   Traditional cytopathology workflows required exhaustive visual rastering across thousands of fields of view to find isolated abnormal cells. In AI-augmented systems (e.g., automated cervical cytology screening algorithms flagging 20–50 candidate fields), the human operator's cognitive task is pure **verification**.
2. **Inefficiency as an AI Liability:**
   Practitioners who rely on slow, exhaustive scanning and frequent meta-data checking rather than rapid gestalt recognition will experience severe bottlenecks when tasked with verifying high-throughput AI candidate galleries.
3. **Objective Gaze Metrics Over Time-Based Credentialing:**
   Credentialing in pathology and cytotechnology has historically been defined by training duration and cumulative case counts. Eye-tracking gaze metrics (e.g., LPF time to target fixation, selective neglect ratio) provide objective, quantifiable cognitive biomarkers for diagnostic competency and AI readiness.
4. **Countering Confirmation & Automation Biases:**
   As shown in [When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology](When%20Two%20Wrongs%20Don%27t%20Make%20a%20Right%20-%20Examining%20Confirmation%20Bias%20and%20the%20Role%20of%20Time%20Pressure%20During%20Human-AI%20Collaboration%20in%20Computational%20Pathology.md), time pressure drives practitioners into uncritical automation bias. Developing rapid, robust LPF verification skills protects against cognitive fatigue and unreflective acceptance of false-positive AI bounding boxes.

---

## Limitations

- **Static Images vs. Dynamic WSI:** Eye-tracking was conducted on 30 static digital image fields rather than continuous gigapixel panning/zooming. However, final diagnostic decisions fundamentally depend on static field interpretation.
- **Specimen Preparations:** Focused on conventional Pap smears and respiratory cytology; liquid-based cytology (LBC) thin-layer preparations were not evaluated, though the authors note that global-focal cognitive mechanisms operate similarly across preparations.
- **Sample Size of Diagnostic Set:** 30 cases per testing round.

---

## Vault Relationships

- [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
- [Articles on computational, digital, and mathematical pathology](../computational-digital-and-mathematical-pathology/articles-on-computational-digital-and-mathematical-pathology.md)
- [When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology](When%20Two%20Wrongs%20Don%27t%20Make%20a%20Right%20-%20Examining%20Confirmation%20Bias%20and%20the%20Role%20of%20Time%20Pressure%20During%20Human-AI%20Collaboration%20in%20Computational%20Pathology.md)
- [Cognitive biases in AI-assisted medical decision making - A structured review as a primer for veterinary and human pathology](Cognitive%20biases%20in%20AI-assisted%20medical%20decision%20making%20-%20A%20structured%20review%20as%20a%20primer%20for%20veterinary%20and%20human%20pathology.md)
- [Pathology AI Integration: A Systems View](../theories/Pathology%20AI%20Integration_%20A%20Systems%20View.md)
