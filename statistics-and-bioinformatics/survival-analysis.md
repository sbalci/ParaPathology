---
type: Note
status: Developing
language: en
aliases:
  - "Survival Analysis"
order: 160
belongs_to: "[[Statistics and Bioinformatics]]"
related_to:
  - "[[Kaplan Meier]]"
  - "[[jsurvival]]"
  - "[[Statistics and Bioinformatics]]"
  - "[[Jamovi]]"
---

# Survival Analysis

**Survival analysis** (time-to-event analysis) encompasses biostatistical methods for analyzing the expected duration of time until one or more defined clinical events occur—such as disease progression, cancer recurrence, metastasis, or death.

In pathology and oncology, survival analysis forms the evidentiary backbone for validating prognostic biomarkers, histological grading schemes, and TNM staging revisions.

---

## Fundamental Concepts

### 1. Time Origin and Event Definition
- **Time Origin ($t_0$):** Clear initial baseline point (e.g., date of biopsy diagnosis, definitive surgical resection, or initiation of adjuvant therapy).
- **Endpoint / Event:** Explicit binary failure event:
  - **Overall Survival (OS):** Death from any cause.
  - **Disease-Specific Survival (DSS / CSS):** Death directly attributable to the index malignancy.
  - **Progression-Free Survival (PFS) / Disease-Free Survival (DFS):** First documented local recurrence, distant metastasis, or death.
- **Censoring:** Incomplete observation where the event has not occurred by the close of the study window, or the patient is lost to follow-up (right-censoring). Censoring assumes non-informative / random drop-out.

### 2. Core Estimation Frameworks
- **[Kaplan Meier](kaplan-meier.md) Estimator:** Non-parametric stepwise product-limit estimate of survival probability over time $S(t) = \prod_{t_i \le t} \left(1 - \frac{d_i}{n_i}\right)$, providing median survival times and 1-, 3-, and 5-year survival rates.
- **Log-Rank (Mantel-Cox) Test:** Non-parametric hypothesis test comparing survival distributions between two or more groups under equal event weighting across time.
- **Cox Proportional Hazards Regression:** Semi-parametric regression model assessing the impact of multiple covariates on the hazard rate:
  $$h(t | X) = h_0(t) \exp\left(\sum_{j=1}^p \beta_j X_j\right)$$
  Yields Hazard Ratios (HR) with 95% confidence intervals, assuming hazard proportionality over time (tested via Schoenfeld residuals).
- **Competing Risks Analysis:** Cumulative incidence functions (CIF) that model non-cancer death as an active competing terminal event rather than uninformative censoring, preventing false elevation of disease-specific mortality.
- **Restricted Mean Survival Time (RMST):** Area under the survival curve up to a fixed clinical time horizon ($\tau$), expressing treatment effect as the difference in average survival time even when proportional hazards fail.

---

## Tools in the Vault

- **[jsurvival](jsurvival.md)**: Dedicated [jamovi](jamovi.md) module and R package developed by Serdar Balci for clinical survival workflows—providing Kaplan-Meier curves with KMunicate risk tables, univariate and multivariable Cox modeling, continuous biomarker cutpoint discovery, competing risks, person-time calculations, and cancer stage migration analysis.
- **[Kaplan Meier](kaplan-meier.md)**: Detailed Turkish and English notes on Kaplan-Meier curve construction, log-rank testing, and jamovi workflows.

---

## Educational Resources & Links

- **Coursera Public Health Survival Lecture:** The KM plot and Log-rank test
- **R Survival Analysis Guide:** [RStudio R Views](https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/)

<!-- tolaria:related:start -->

## See also

* [Jamovi](jamovi.md)
* [jsurvival](jsurvival.md)
* [Kaplan Meier](kaplan-meier.md)

<!-- tolaria:related:end -->
