---
type: Clipping
status: Evergreen
language: en
title: "Distance-based evaluation of tumor budding in colorectal cancer"
source: "https://link.springer.com/article/10.1007/s00428-026-04471-9"
source_type: article
author:
  - "[[Ville K. Äijälä]]"
  - "[[Päivi Sirniö]]"
  - "[[Henna Karjalainen]]"
  - "[[Meeri Kastinen]]"
  - "[[Vilja V. Tapiainen]]"
  - "[[Hanna Elomaa]]"
  - "[[Maarit Ahtiainen]]"
  - "[[Vesa-Matti Pohjanen]]"
  - "[[Taneli T. Mattila]]"
  - "[[Outi Lindgren]]"
  - "[[Olli Helminen]]"
  - "[[Erkki-Ville Wirta]]"
  - "[[Jukka Rintala]]"
  - "[[Sanna Meriläinen]]"
  - "[[Juha Saarnio]]"
  - "[[Tero Rautio]]"
  - "[[Toni T. Seppälä]]"
  - "[[Jan Böhm]]"
  - "[[Jukka-Pekka Mecklin]]"
  - "[[Anne Tuomisto]]"
  - "[[Markus J. Mäkinen]]"
  - "[[Juha P. Väyrynen]]"
published: 2026-03-06
created: 2026-09-11
description: "Evaluation of tumor budding distance (average distance from tumor bulk to the three farthest buds, cutoff ≥123 µm) across 1,876 CRC patients in two independent cohorts — correlates with aggressive features and survival in isolation, but adds no prognostic value beyond conventional ITBCC budding grade."
tags:
  - "clippings"
  - "tumor-budding"
  - "colorectal-cancer"
  - "digital-pathology"
order: 100
belongs_to: "[[Clippings]]"
related_to:
  - "[[Recommendations for reporting tumor budding in colorectal cancer based on the International Tumor Budding Consensus Conference (ITBCC) 2016]]"
  - "[[Tumor budding T-cell graphs for pT1 colorectal cancer]]"
  - "[[Digital Pathology]]"
---

# Distance-based evaluation of tumor budding in colorectal cancer

**Ville K. Äijälä, Päivi Sirniö, Henna Karjalainen, Meeri Kastinen, Vilja V. Tapiainen, Hanna Elomaa, Maarit Ahtiainen, Vesa-Matti Pohjanen, Taneli T. Mattila, Outi Lindgren, Olli Helminen, Erkki-Ville Wirta, Jukka Rintala, Sanna Meriläinen, Juha Saarnio, Tero Rautio, Toni T. Seppälä, Jan Böhm, Jukka-Pekka Mecklin, Anne Tuomisto, Markus J. Mäkinen, Juha P. Väyrynen.**

*Virchows Archiv* (Published online: 06 March 2026).  
- **DOI:** [10.1007/s00428-026-04471-9](https://doi.org/10.1007/s00428-026-04471-9)
- **Open Access:** [Springer Nature Link](https://link.springer.com/article/10.1007/s00428-026-04471-9)

---

## Abstract

Tumor budding is an established adverse prognostic factor in colorectal cancer (CRC), based on the number of isolated single tumor cells or small tumor cell clusters at the invasive front. While bud counts are well studied, the prognostic significance of the spatial distribution and distance of tumor buds away from the tumor bulk is unclear. We defined TB-distance as the average distance from the tumor bulk to the three farthest tumor buds and evaluated its clinicopathologic and prognostic associations in two independent CRC cohorts ($N = 776$ and $N = 1,100$). Using a cohort-derived cutoff, high TB-distance ($\ge 123\,\mu\text{m}$) was significantly associated with adverse tumor characteristics, including high grade, advanced disease stage, lymphovascular invasion, high conventional tumor budding grade, and MMR proficient status ($p < 0.003$ for all). High TB-distance was also associated with shorter cancer-specific survival (Cohort 1: multivariable HR (high vs. low) 1.47, 95% CI 1.04–2.09, $p = 0.030$; Cohort 2: multivariable HR 1.34, 95% CI 1.04–1.74, $p = 0.026$). However, TB-distance did not provide additional prognostic information within conventional tumor budding grade strata or when modeled alongside tumor budding. These findings indicate that high TB-distance is associated with aggressive tumor morphology and worse outcome but does not improve prognostication beyond standard tumor budding assessment. TB-distance may still be useful as a visual aid in routine pathology and a quantifiable spatial feature for computational pathology.

---

## Study Design and Cohorts

The investigation evaluated **1,876 stage I–IV surgically treated CRC patients** without neoadjuvant therapy across two independent Finnish biobank/hospital cohorts:

1. **Cohort 1 (Oulu University Hospital, 2006–2020):**
   - $N = 776$ eligible for histopathology ($N = 771$ for survival analysis after excluding 5 perioperative deaths $\le 30$ days).
   - Used for discovery and ROC cutoff derivation.
   - Median follow-up: 7.0 years.
2. **Cohort 2 (Central Hospital of Central Finland, 2000–2015):**
   - $N = 1,100$ eligible for histopathology ($N = 1,063$ for survival analysis after excluding 37 perioperative deaths $\le 30$ days).
   - Used for external validation of the derived threshold.
   - Median follow-up: 10.0 years.

---

## Operational Definition of TB-Distance

- **Whole-Slide Imaging (WSI):** H&E slides were reviewed along the entire invasive margin.
- **Measurement:** Distances were measured digitally from the nearest edge of the contiguous tumor bulk to the edge of the **three farthest tumor buds** ($\le 4$ cells).
- **Metric:** Sum of the three distances divided by 3 ($\text{TB-distance}$). If fewer than 3 buds existed, available distances were divided by 3 to dampen the impact of a single outlier.
- **Bulk definition:** Main contiguous carcinoma mass and large tumor islets displaying established gland/cribriform architecture and mucin pools. Poorly differentiated clusters ($\ge 5$ cells) and intravascular tumor emboli were excluded.
- **Threshold:** A threshold of **$\ge 123\,\mu\text{m}$** for high TB-distance was derived in Cohort 1 by ROC analysis for 10-year cancer-specific survival (AUC 0.63, 95% CI 0.58–0.68) and applied unchanged to Cohort 2.
- **Observer agreement:** Assessed across 30 cases: Spearman's $\rho = 0.58$ (continuous distance) and Cohen's $\kappa = 0.43$ (binary cutoff), demonstrating moderate inter-observer agreement comparable to conventional manual ITBCC scoring.

---

## Results and Findings

### 1. Frequency and Clinicopathological Correlations
- High TB-distance ($\ge 123\,\mu\text{m}$) was found in **27%** ($209/776$) of Cohort 1 and **18%** ($199/1,100$) of Cohort 2.
- In both cohorts, high TB-distance significantly correlated with:
  - Advanced UICC disease stage ($p < 0.001$)
  - High WHO histological grade ($p < 0.001$)
  - Lymphovascular invasion (LVI, $p < 0.001$)
  - Mismatch repair proficiency (pMMR, $p < 0.003$)
  - High [ITBCC tumor budding grade](Recommendations%20for%20reporting%20tumor%20budding%20in%20colorectal%20cancer%20based%20on%20the%20International%20Tumor%20Budding%20Consensus%20Conference%20%28ITBCC%29%202016.md) ($p < 0.001$).

### 2. Standalone Survival Impact
In multivariable Cox proportional hazards models adjusting for age, sex, surgery year, tumor site, stage, grade, LVI, MMR status, and BRAF mutation:
- **Cohort 1:** Multivariable HR = 1.47 (95% CI: 1.04–2.09, $p = 0.030$) for cancer-specific survival.
- **Cohort 2:** Multivariable HR = 1.34 (95% CI: 1.04–1.74, $p = 0.026$) for cancer-specific survival.

### 3. The Negative Finding: No Added Value Beyond ITBCC
- **Within ITBCC Strata:** Stratifying by conventional ITBCC budding tiers (Bd1: 0–4 buds, Bd2: 5–9 buds, Bd3: $\ge 10$ buds), TB-distance failed to provide statistically significant prognostic discrimination in multivariable analysis.
- **Joint Cox Model:** When ITBCC budding grade and TB-distance were entered together in the same model, conventional tumor budding retained independent prognostic power, while TB-distance was rendered non-significant.
- **Interpretation:** Spatial dispersion is tightly collinear with the dissociation phenotype already captured by counting buds in the 0.785 mm² hotspot.

---

## Practical and Computational Implications

1. **Diagnostic Pathology:** Pathologists do not need to measure bud migration distance with digital calipers or micrometer reticles in daily diagnostic practice. Standard [ITBCC hotspot counts](Recommendations%20for%20reporting%20tumor%20budding%20in%20colorectal%20cancer%20based%20on%20the%20International%20Tumor%20Budding%20Consensus%20Conference%20%28ITBCC%29%202016.md) remain the clinical gold standard.
2. **Visual Clue:** Far-flung buds deep in the stroma should prompt the pathologist to re-examine the invasive front for a higher-density budding hotspot that might have been overlooked.
3. **Computational Pathology & Graph Models:** While manual measurement is redundant for humans, automated digital pathology algorithms (e.g. Tumor budding T-cell graphs for pT1 colorectal cancer) can compute tumor bulk boundaries and bud dispersion distances automatically, providing an objective continuous spatial descriptor of invasive margin topology.

<!-- tolaria:related:start -->

## See also

* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [Recommendations for reporting tumor budding in colorectal cancer based on the International Tumor Budding Consensus Conference (ITBCC) 2016](Recommendations%20for%20reporting%20tumor%20budding%20in%20colorectal%20cancer%20based%20on%20the%20International%20Tumor%20Budding%20Consensus%20Conference%20%28ITBCC%29%202016.md)

<!-- tolaria:related:end -->
