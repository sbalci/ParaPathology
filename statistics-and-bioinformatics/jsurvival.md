---
type: Tool
status: Developing
language: en
aliases:
  - "jsurvival"
  - "jsurvival jamovi module"
  - "ClinicoPath Survival"
order: 50
belongs_to: "[[Jamovi]]"
related_to:
  - "[[Jamovi]]"
  - "[[ClinicoPathDescriptives]]"
  - "[[jjstatsplot]]"
  - "[[meddecide]]"
  - "[[askLLM]]"
  - "[[Survival Analysis]]"
  - "[[Kaplan Meier]]"
  - "[[Alluvial Diagrams]]"
  - "[[Statistics and Bioinformatics]]"
  - "[[Tools for Data Analysis and Visualisation]]"
repo: https://github.com/sbalci/jsurvival
documentation: https://www.serdarbalci.com/jsurvival/
url: https://github.com/sbalci/jsurvival
---

# jsurvival

**jsurvival** is an open-source R package and [jamovi](jamovi.md) module developed by Serdar Balci that provides a comprehensive, clinical-grade environment for time-to-event and survival analysis in medical, pathological, and oncology research.

As the dedicated survival engine of the **ClinicoPath** biostatistical ecosystem, `jsurvival` bridges complex mathematical survival methodologies—such as Kaplan-Meier estimation with transparent risk tables, univariate and multivariable Cox proportional hazards regression, continuous biomarker cutpoint discovery, person-time incidence calculations, competing risks, and stage migration modeling—into an accessible point-and-click GUI within jamovi paired with a robust, reproducible R programming interface.

- **GitHub Repository:** [sbalci/jsurvival](https://github.com/sbalci/jsurvival)
- **Documentation & Vignettes:** [serdarbalci.com/jsurvival](https://www.serdarbalci.com/jsurvival/)
- **ClinicoPath Suite Hub:** [serdarbalci.com/ClinicoPathJamoviModule](https://www.serdarbalci.com/ClinicoPathJamoviModule/)
- **Bug Reports & Issues:** [ClinicoPathJamoviModule/issues](https://github.com/sbalci/ClinicoPathJamoviModule/issues)
- **Suite Citation:** [10.5281/zenodo.3997188](https://doi.org/10.5281/zenodo.3997188)
- **License:** GPL (>= 2)

---

## Core Capabilities & jamovi Ribbon Architecture

In [jamovi](jamovi.md) ($\ge 2.7.27$), `jsurvival` integrates directly into the top **Analyses** ribbon under the **Survival** menu group, organized into four specialized functional subgroups:

```
Analyses Ribbon
 └── Survival
      ├── ClinicoPath Survival
      │    ├── Single Arm Survival (singlearm)
      │    ├── Survival Analysis (survival)
      │    ├── Survival Analysis for Continuous Explanatory Variable (survivalcont)
      │    └── Multivariable Survival Analysis (multisurvival)
      ├── General Statistics
      │    └── Odds Ratio Table and Plot (oddsratio)
      ├── Penalized Cox Regression
      │    └── LASSO Cox (lassocox)
      └── Data Preparation
           ├── DateTime Converter (datetimeconverter)
           ├── Comprehensive Time Interval Calculator (timeinterval)
           └── Outcome Organizer for Survival Analysis (outcomeorganizer)
```

---

## Detailed Analytical Domains

### 1. Univariate Survival Analysis (`survival`)
The flagship module for time-to-event comparison across diagnostic, histopathological, or therapeutic patient tiers:
- **Kaplan-Meier Estimation:** Calculates survival probabilities over time with Greenwood and log-log 95% confidence intervals, median follow-up (reverse Kaplan-Meier method), and median survival times.
- **Clinical Milestone Rates:** Automatically reports 1-, 3-, and 5-year survival rates with standard errors and confidence intervals, essential for clinical oncology reporting (Overall Survival [OS], Disease-Free Survival [DFS], and Progression-Free Survival [PFS]).
- **Hypothesis Testing:** Evaluates between-group survival differences using the log-rank (Mantel-Cox) test, Breslow/Wilcoxon test (weighting early events), and Peto-Peto modified Wilcoxon test. Pairwise post-hoc subgroup comparisons feature multiple testing adjustments (Bonferroni, Holm, Benjamini-Hochberg FDR).
- **Univariate Cox Proportional Hazards:** Computes hazard ratios (HR), 95% confidence intervals, Wald statistics, score tests, and likelihood ratio tests.
- **Publication-Ready Visualizations:**
  - Kaplan-Meier curves with confidence ribbons, censorship ticks, and color palettes.
  - Numbers at risk tables directly aligned beneath the time axis.
  - **KMunicate-Style Plots:** Implements the modern KMunicate standard to eliminate misleading truncations and ensure transparent reporting of patients at risk.
  - Cumulative hazard curves ($H(t) = -\ln(S(t))$) and cumulative event plots.
- **Person-Time Incidence Rates:** Calculates cumulative person-years of observation, total events, and crude incidence rates per 1,000 person-years with Poisson or exact confidence limits.
- **Immortal Time Bias Mitigation:** Implements **landmark analysis** allowing investigators to condition survival on surviving to a specified clinical milestone (e.g., 6 or 12 months after resection or adjuvant initiation).
- **Diagnostics:** Schoenfeld residual tests and visual diagnostic plots to verify the proportional hazards assumption.
- **Plain-Language Interpretations:** Automatically produces structured, human-readable natural language summaries explaining the statistical findings and clinical significance.

### 2. Continuous Biomarker Cutpoint Optimization (`survivalcont`)
In translational pathology and molecular diagnostics, continuous scores (such as IHC H-scores, Ki-67 proliferation percentages, digital pathology cell density metrics, or ctDNA levels) must frequently be converted into actionable binary or ordinal stratification tiers:
- **Automated Cutpoint Discovery:** Identifies optimal classification thresholds using:
  - *Maximally Selected Rank Statistics* via `survminer` and `maxstat` (minimizing log-rank $p$-value while controlling for false discovery).
  - *Youden-Index Analogues* and ROC-based criteria.
  - Standard distributional partitions: median split, tertiles (3 groups), or quartiles (4 groups).
- **Proportional Hazards per Unit Change:** Evaluates the continuous variable as a linear covariate in a Cox model before categorization.
- **Stratified Comparative Plots:** Automatically renders stratified Kaplan-Meier curves based on the newly discovered optimal cut-offs, complete with hazard ratios comparing the high vs. low expression cohorts.

### 3. Multivariable Survival Modeling (`multisurvival`)
Adjusts for confounding clinicopathological variables (e.g., patient age, performance status, tumor diameter, histological grade, margin status, and adjuvant chemotherapy):
- **Multivariable Cox Regression:** Fits full or parsimonious multivariable models via `survival` and `finalfit`.
- **Adjusted Survival Curves:** Computes and plots covariate-adjusted survival curves holding background variables at their mean or reference levels.
- **Subgroup & Forest Plots:** Generates high-resolution forest plots illustrating multivariable hazard ratios with 95% confidence intervals across all candidate predictors.
- **Interaction Testing:** Evaluates multiplicative interaction terms (e.g., biomarker status $\times$ targeted therapy) to identify predictive versus merely prognostic biomarkers.
- **Model Selection:** Stepwise backward elimination and forward selection based on Akaike Information Criterion (AIC).
- **Restricted Mean Survival Time (RMST):** Calculates the restricted mean survival time up to a specified horizon $\tau$. RMST provides an interpretable measure of survival benefit (difference in average disease-free months) that remains completely valid even when proportional hazards assumptions are violated or survival curves cross.

### 4. Single-Arm Survival & Competing Risks (`singlearm`)
Tailored for single cohort investigations, retrospective observational case series, and phase II non-comparative trials:
- **Baseline Cohort Trajectory:** Estimates overall cohort survival curves, median survival times, and cumulative person-time metrics without requiring an explanatory stratification factor.
- **Competing Risk Analysis:** When analyzing disease-specific survival in geriatric or comorbid cohorts, non-cancer mortality acts as a competing event. Standard $1 - \text{KM}$ estimators treat competing events as independent censoring, producing a mathematical overestimation of true disease risk. The `singlearm` module fits non-parametric Cumulative Incidence Functions (CIF) via `cmprsk` to provide unbiased cumulative incidence estimates for each distinct failure mode.

### 5. High-Dimensional Penalized Survival (`lassocox`)
When analyzing high-throughput translational datasets (e.g., multiplex immunofluorescence signatures, digital pathology spatial features, or RNA-seq gene expression panels) where the number of candidate variables approaches or exceeds the number of events:
- **L1-Penalized LASSO-Cox:** Fits regularized Cox proportional hazards models via `glmnet` to enforce sparsity and prevent severe overfitting.
- **Cross-Validation Tuning:** Performs $k$-fold cross-validation to locate the optimal penalty parameter:
  - $\lambda_{\min}$: Penalty minimizing partial likelihood cross-validation deviance.
  - $\lambda_{1\text{se}}$: Most parsimonious model within 1 standard error of the minimum error.
- **Coefficient Trajectories & Risk Scores:** Renders coefficient shrinkage path diagrams and computes composite patient risk scores to stratify validation cohorts into high-risk versus low-risk tiers.

### 6. Cancer Stage Migration Analysis (`stagemigration`)
Designed specifically for validating modifications in cancer staging frameworks (e.g., updates from AJCC/UICC 7th to 8th or 9th editions, or novel digital pathology grading criteria):
- **Will Rogers Phenomenon:** Quantifies the artifact where migrating patients into higher stages paradoxically improves the apparent survival of *both* the source and destination stages without improving overall patient longevity.
- **Migration Matrices & Cross-Tabulations:** Maps migration shifts between legacy and proposed staging classifications.
- **Discrimination Metrics:** Assesses whether the new staging system provides superior risk separation using:
  - *Time-Dependent ROC Curves* and Area Under the Curve (AUC($t$)) via `riskRegression`.
  - *Net Reclassification Improvement (NRI)* and *Integrated Discrimination Improvement (IDI)*.
  - *Decision Curve Analysis (DCA)* to assess net clinical benefit across varied threshold probabilities.
  - Bootstrap optimism correction and internal validation.

### 7. Clinical Data Preparation & Curation (`datetimeconverter`, `timeinterval`, `outcomeorganizer`)
Survival analysis frequently fails due to malformed date formatting and inconsistent outcome status definitions:
- **DateTime Converter (`datetimeconverter`):** Automatically detects date formatting strings (ISO 8601, DMY, MDY), parses irregular timestamps, and extracts temporal components (year, month, quarter, calendar week).
- **Time Interval Calculator (`timeinterval`):** Automatically computes follow-up duration between initial diagnosis/surgery and event/last follow-up date in user-specified units (days, months, or years). Performs automated data sanity audits, identifying negative survival intervals, inverted timelines, and future follow-up entries.
- **Outcome Organizer (`outcomeorganizer`):** Restructures complex, messy clinical status entries (e.g., "Alive with disease", "No evidence of disease", "Died of other cause", "Died of tumor") into standardized binary or multi-state endpoints for Overall Survival (OS), Disease-Specific Survival (DSS), and Progression-Free Survival (PFS), writing the standardized variables directly back into the working dataset.

### 8. Binary Outcome Analysis (`oddsratio`)
Generates publication-ready odds ratio summary tables, multivariable logistic regression forest plots, prediction nomograms, and contingency metrics for discrete endpoints.

---

## Translational Digital Pathology & Clinical Oncology Applications

1. **Immune Infiltration & Spatial Phenotyping:**
   - Establishing clinically validated cut-offs for CD8$^+$, FoxP3$^+$, or tertiary lymphoid structure (TLS) density in tumor beds using `survivalcont`.
2. **Histological Subtyping & Grading Validation:**
   - Comparing cancer-specific survival across newly proposed histological subtypes or WHO grading criteria (e.g., pancreatic ductal adenocarcinoma subtypes or neuroendocrine tumor grading) using `survival` and `multisurvival`.
3. **Evaluating New Staging Criteria:**
   - Employing `stagemigration` to validate whether incorporating depth of invasion, tumor budding, or lymph node ratios improves prognostic power over traditional anatomic TNM staging without inducing misleading Will Rogers artifacts.
4. **Predictive Companion Diagnostics:**
   - Testing statistical interaction terms in `multisurvival` to demonstrate that a specific biomarker (e.g., MET overexpression, HER2-low, or mismatch repair deficiency) predicts therapeutic benefit from targeted therapy rather than serving merely as an indolent prognostic marker.

---

## Quick Start in R

### Installation

```r
# Install development version from GitHub
if (!requireNamespace("devtools", quietly = TRUE)) install.packages("devtools")
devtools::install_github("sbalci/jsurvival")

library(jsurvival)
```

### 1. Univariate Kaplan-Meier & Cox Analysis

```r
# Univariate survival comparison with KM curves and 1,3,5-year rates
km_res <- jsurvival::survival(
  data = clinical_data,
  elapsedtime = "FollowUpMonths",
  outcome = "VitalStatus",
  outcomeLevel = "Deceased",
  explanatory = "BiomarkerTiers",
  sc = TRUE,                # Render survival curve
  risktable = TRUE,         # Display numbers at risk table
  kmunicate = TRUE,         # Format using KMunicate standard
  ci95 = TRUE,              # Display 95% confidence bands
  ph_cox = TRUE             # Test proportional hazards assumption
)
km_res$run()
```

### 2. Continuous Marker Cutpoint Optimization

```r
# Discover optimal biomarker cutoff via maximally selected rank statistics
cut_res <- jsurvival::survivalcont(
  data = clinical_data,
  elapsedtime = "FollowUpMonths",
  outcome = "VitalStatus",
  outcomeLevel = "Deceased",
  contexplan = "Ki67_Index",
  cutmethod = "maxstat",
  plot = TRUE
)
cut_res$run()
```

### 3. Multivariable Cox Regression with Adjusted Curves

```r
# Multivariable adjustment for age, stage, and grade
multi_res <- jsurvival::multisurvival(
  data = clinical_data,
  elapsedtime = "FollowUpMonths",
  outcome = "VitalStatus",
  outcomeLevel = "Deceased",
  explanatory = vars(Age, Stage, Grade, BiomarkerStatus),
  forest = TRUE,            # Multivariable hazard ratio forest plot
  adjustedCurves = TRUE     # Covariate-adjusted survival curves
)
multi_res$run()
```

### 4. Penalized LASSO-Cox for High-Dimensional Features

```r
# Fit L1-penalized Cox model across high-dimensional feature set
lasso_res <- jsurvival::lassocox(
  data = omics_data,
  elapsedtime = "Time",
  outcome = "Status",
  outcomeLevel = "1",
  explanatory = vars(Feature_1, Feature_2, Feature_3, Feature_4, Feature_5)
)
lasso_res$run()
```

---

## Citations & Statistical Dependencies

When utilizing `jsurvival` for clinical trials, journal publications, and pathology research, cite the package and the broader ClinicoPath suite:

- **jsurvival / ClinicoPath Suite:**
  > Balci S. (2025). *ClinicoPath jamovi Module*. DOI: [10.5281/zenodo.3997188](https://doi.org/10.5281/zenodo.3997188). GitHub: [sbalci/jsurvival](https://github.com/sbalci/jsurvival).
- **Core Statistical Engines & Packages:**
  - `survival`: Therneau TM, Grambsch PM. (2000). *Modeling Survival Data: Extending the Cox Model*. Springer, New York.
  - `survminer`: Kassambara A, Kosinski M, Biecek P. (2021). *survminer: Drawing Survival Curves using 'ggplot2'*.
  - `finalfit`: Harrison E, Drake T, Ots R. (2020). *finalfit: Quickly Create Elegant Regression Results Tables and Plots when Modelling*.
  - `KMunicate`: Morris TP, Jarvis CI, Cragg W, et al. (2019). Proposals on Kaplan-Meier plots in medical research and a survey of stakeholder views: KMunicate. *BMJ Open*, 9(9):e030215.
  - `cmprsk`: Gray RJ. (2020). *cmprsk: Subdistribution Analysis of Competing Risks*.
  - `glmnet`: Friedman J, Hastie T, Tibshirani R. (2010). Regularization Paths for Generalized Linear Models via Coordinate Descent. *Journal of Statistical Software*, 33(1):1–22.
  - `riskRegression`: Gerds TA, Kattan MW. (2021). *Medical Risk Prediction Models: With Ties to Machine Learning*. Chapman and Hall/CRC.

<!-- tolaria:related:start -->

## See also

* [Alluvial Diagrams](alluvial-diagrams.md)
* [askLLM](askllm.md)
* [ClinicoPathDescriptives](clinicopath-descriptives.md)
* [jjstatsplot](jjstatsplot.md)
* [Kaplan Meier](kaplan-meier.md)
* [meddecide](meddecide.md)
* [Statistics and Bioinformatics](statistics-and-bioinformatics.md)
* [Survival Analysis](survival-analysis.md)
* [Tools for Data Analysis and Visualisation](tools-for-data-analysis-and-visualisation.md)

<!-- tolaria:related:end -->
