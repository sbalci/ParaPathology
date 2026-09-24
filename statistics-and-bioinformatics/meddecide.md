---
type: Tool
status: Developing
language: en
aliases:
  - "meddecide"
  - "meddecide jamovi module"
order: 40
belongs_to: "[[Jamovi]]"
related_to:
  - "[[Jamovi]]"
  - "[[ClinicoPathDescriptives]]"
  - "[[jjstatsplot]]"
  - "[[jsurvival]]"
  - "[[askLLM]]"
  - "[[ROC analysis]]"
  - "[[Kappa]]"
  - "[[Sensitivity, Specificity, Predictive Values & Decision Making]]"
  - "[[Power Analysis]]"
  - "[[Statistics and Bioinformatics]]"
  - "[[Tools for Data Analysis and Visualisation]]"
repo: https://github.com/sbalci/meddecide
documentation: https://www.serdarbalci.com/meddecide/
url: https://github.com/sbalci/meddecide
---

# meddecide

**meddecide** is an open-source R package and [jamovi](jamovi.md) module developed by Serdar Balci that provides a comprehensive analytical toolkit for medical decision analysis, diagnostic test accuracy (DTA) evaluation, and inter-rater reliability assessment in clinical research and pathology.

Serving as a specialized computational engine within the broader **ClinicoPath** ecosystem, `meddecide` bridges complex biostatistical methodologies—such as multi-test combination modeling, latent class analysis without a gold standard, decision curve analysis (DCA), and power calculations for agreement studies—into both an accessible point-and-click graphical interface for jamovi and a high-level programmatic toolkit for R.

- **GitHub Repository:** [sbalci/meddecide](https://github.com/sbalci/meddecide)
- **Documentation & Vignettes:** [serdarbalci.com/meddecide](https://www.serdarbalci.com/meddecide/)
- **ClinicoPath Suite Hub:** [serdarbalci.com/ClinicoPathJamoviModule](https://www.serdarbalci.com/ClinicoPathJamoviModule/)
- **Bug Reports & Feedback:** [ClinicoPathJamoviModule/issues](https://github.com/sbalci/ClinicoPathJamoviModule/issues)
- **Suite Citation:** [10.5281/zenodo.3997188](https://doi.org/10.5281/zenodo.3997188)
- **License:** GPL (>= 2)

---

## Core Capabilities & jamovi Ribbon Architecture

In [jamovi](jamovi.md) ($\ge 2.7.27$), `meddecide` integrates into the top **Analyses** ribbon under dedicated menus (**meddecide** and **Power**), structured into six functional domains:

```
Analyses Ribbon
 ├── meddecide
 │    ├── Agreement
 │    │    └── Interrater Reliability (agreement)
 │    ├── Decision
 │    │    ├── Medical Decision (decision)
 │    │    ├── Compare Medical Decision Tests (decisioncompare)
 │    │    ├── Combine Medical Decision Tests (decisioncombine)
 │    │    └── Analysis Without Gold Standard (nogoldstandard)
 │    ├── Decision Calculators
 │    │    ├── Medical Decision Calculator (decisioncalculator)
 │    │    ├── Co-Testing Analysis (cotest)
 │    │    └── Sequential Testing Analysis (sequentialtests)
 │    ├── ROC
 │    │    ├── Clinical ROC Analysis (enhancedROC)
 │    │    └── Advanced ROC Analysis (psychopdaROC)
 │    ├── Prediction Models
 │    │    └── LASSO Logistic (lassologistic)
 │    └── Decision Curve Analysis
 │         └── Decision Curve Analysis (decisioncurve)
 └── Power
      └── Power Analysis by meddecide
           ├── Power Approach for Agreement (kappaSizePower)
           ├── Confidence Interval Approach for Agreement (kappaSizeCI)
           └── Lowest Expected Value for Fixed N (kappaSizeFixedN)
```

---

## Detailed Analytical Domains

### 1. Inter-Rater & Intra-Rater Reliability (`agreement`)
Diagnostic pathology and grading schemes rely heavily on observer concordance. The `agreement` module provides a unified interface for evaluating observer agreement across nominal, ordinal, and continuous evaluations:
- **Cohen's $\kappa$:** Chance-corrected pairwise agreement for two raters with confidence intervals and $Z$-tests.
- **Fleiss' $\kappa$:** Agreement across three or more raters with fixed rater pools.
- **Weighted $\kappa$:** Linear and quadratic weighting schemes to penalize minor vs. severe diagnostic discrepancies on ordinal scales (e.g., WHO grades, Gleason patterns, or atypical hyperplasia vs. carcinoma).
- **Krippendorff's $\alpha$ & Gwet's AC1/AC2:** Agreement metrics that remain stable even in the presence of extreme class imbalance (the "kappa paradox").
- **Visual Agreement Outputs:** Generates rater concordance cross-tabulation matrices, agreement heatmaps, and pairwise correlation lattices.

### 2. Medical Decision & Diagnostic Test Accuracy (`decision`, `decisioncompare`, `decisioncombine`, `nogoldstandard`)
Comprehensive statistical evaluation of binary diagnostic tests against a reference standard:
- **Single Test Performance (`decision`):** Computes sensitivity (true positive rate), specificity (true negative rate), positive predictive value (PPV), negative predictive value (NPV), positive/negative likelihood ratios ($LR^+$, $LR^-$), diagnostic odds ratio (DOR), accuracy, and Youden's $J$ index with exact Clopper-Pearson, Wilson, or logit confidence intervals. Automatically generates **Fagan nomograms** to visualize post-test probability shifts based on pre-test disease prevalence.
- **Multi-Test Comparison (`decisioncompare`):** Evaluates two or more diagnostic tests applied to the same cohort against a gold standard. Performs paired statistical significance testing (McNemar's test), estimates differences in sensitivities and specificities with confidence intervals, and renders multi-axis radar charts, ROC space comparison plots, and forest plots.
- **Systematic Test Combinations (`decisioncombine`):** Exhaustively evaluates all possible diagnostic combination patterns from 2-test (4 patterns) or 3-test (8 patterns) panels. Compares named clinical strategies:
  - *Parallel Testing (OR / Belief Rule):* Maximizes sensitivity and NPV (ideal for cancer screening and ruling out disease).
  - *Serial Testing (AND / Consensus Rule):* Maximizes specificity and PPV (ideal for confirmatory staging before high-morbidity therapy).
  - *Majority Rule:* 2-out-of-3 voting strategies across tri-marker panels.
  - Visualizes strategy efficiency via hierarchical decision trees and combination heatmaps.
- **Latent Class Analysis Without a Gold Standard (`nogoldstandard`):** When evaluating novel diagnostic modalities (e.g., next-generation digital pathology AI or liquid biopsy) where no error-free gold standard exists, this module fits a two-class conditional-independence latent class model via `poLCA` and penalized expectation-maximization (EM) estimation to determine test performance characteristics and true latent disease prevalence.

### 3. Interactive Decision Calculators & Staged Testing (`decisioncalculator`, `cotest`, `sequentialtests`)
- **Medical Decision Calculator (`decisioncalculator`):** Allows rapid on-the-fly exploration without loading a full raw patient dataset; users simply input the four fundamental cell frequencies (True Positives, False Positives, True Negatives, False Negatives). Instantly delivers full diagnostic metrics and Bayes theorem probability updates.
- **Co-Testing Analysis (`cotest`):** Analyzes dual tests run concurrently (e.g., HPV DNA testing + Pap cytology in cervical screening), accounting for empirical joint result distributions and modeling conditional dependence between tests.
- **Sequential Testing Analysis (`sequentialtests`):** Models staged diagnostic algorithms where a second, more expensive or invasive test is ordered only conditionally upon the result of an initial screening test. Quantifies population flow, test reduction rates, cost implications, and comparative diagnostic yields between serial positive (rule-in) and serial negative (rule-out) pathways.

### 4. Clinical & Advanced ROC Analysis (`enhancedROC`, `psychopdaROC`)
Biomarker cutpoint discovery and threshold optimization for continuous assays (e.g., IHC H-scores, Ki-67 proliferation indices, plasma ctDNA levels, or AI segmentation probabilities):
- **ROC Curve Construction & AUC:** Computes nonparametric empirical and smoothed ROC curves, trapezoidal Area Under the Curve (AUC), and DeLong/bootstrap 95% confidence intervals via `pROC`.
- **Optimal Cutoff Detection:** Automated selection of clinical classification thresholds using multiple criterion functions:
  - *Youden's $J$ statistic* ($\max(\text{Sensitivity} + \text{Specificity} - 1)$).
  - *Closest-to-(0,1)* on the ROC curve (Euclidean distance minimization).
  - *Prevalence- and Cost-Weighted Optimization* via `cutpointr`.
- **Comparative ROC Testing:** Statistical testing between correlated ROC curves from paired samples.

### 5. Prediction Models & Decision Curve Analysis (`lassologistic`, `decisioncurve`)
- **LASSO Logistic Regression (`lassologistic`):** Feature selection and binary classification via `glmnet` with $k$-fold cross-validation, designed for high-dimensional clinicopathological and molecular datasets to prevent overfitting and select parsimonious biomarker subsets.
- **Decision Curve Analysis (`decisioncurve`):** Implements the Vickers & Elkin clinical utility framework. Evaluates the **net benefit** of applying diagnostic tests or predictive models across a continuous spectrum of clinical decision threshold probabilities, comparing the model against default clinical strategies of "treat all" vs. "treat none."

### 6. Sample Size & Power for Agreement Studies (`kappaSize`)
Proper sample size planning is often omitted in inter-observer pathology studies. `meddecide` integrates the three formal study-design paradigms:
- **Power Approach (`kappaSizePower`):** Calculates the required number of subjects ($N$) and ratings per subject to achieve a target statistical power ($1 - \beta$) for rejecting a null agreement hypothesis ($H_0: \kappa \le \kappa_0$) in favor of an acceptable alternative ($H_1: \kappa = \kappa_1$).
- **Confidence Interval Approach (`kappaSizeCI`):** Sizes a study to ensure the resulting two-sided 95% confidence interval around the anticipated $\kappa$ does not exceed a pre-specified margin of error / half-width.
- **Fixed Sample Size Lower Bound (`kappaSizeFixedN`):** Given an existing retrospective cohort with fixed $N$, calculates the lowest true kappa value that the study would be capable of ruling out.

---

## Digital Pathology & Translational Research Applications

1. **WSI vs. Glass Slide Validation Studies:**
   When validating whole-slide imaging (WSI) systems under CAP/CLSI guidelines, `agreement` provides multi-rater Cohen's and Fleiss' kappa, overall percent agreement, and concordance heatmaps across diagnostic tiers.
2. **Histological Grading Reproducibility:**
   Using weighted kappa with quadratic weighting to evaluate grading consensus (e.g., Nottingham breast cancer grade, WHO neuroendocrine tumor grades, or prostate ISUP grade groups).
3. **Companion Diagnostic & Biomarker Cutpoint Optimization:**
   Leveraging `enhancedROC` to define clinically meaningful H-score or percentage cutoffs for predictive immunohistochemistry (e.g., HER2, PD-L1 TPS/CPS, MET, or ER/PR).
4. **Diagnostic Triage & Reflex Testing Pathways:**
   Using `sequentialtests` and `cotest` to design cost-effective reflex pathways combining primary rapid molecular screening with secondary histological or immunohistochemical confirmation.

---

## Quick Start in R

### Installation

```r
# Install development version from GitHub
if (!requireNamespace("devtools", quietly = TRUE)) install.packages("devtools")
devtools::install_github("sbalci/meddecide")

library(meddecide)
```

### 1. Single Diagnostic Test Accuracy & Fagan Nomogram

```r
# Evaluate new diagnostic test against gold standard
decision_results <- decision(
  data = histopathology,
  gold = "GoldStandard",
  goldPositive = "1",
  newtest = "NewBiomarker",
  testPositive = "1"
)
```

### 2. Multi-Test Comparison & Strategy Combination

```r
# Compare two diagnostic tests against a gold standard
comp_results <- decisioncompare(
  data = histopathology,
  gold = "GoldStandard",
  goldPositive = "1",
  test1 = "RapidScreening",
  test1Positive = "1",
  test2 = "CoreBiopsy",
  test2Positive = "1",
  ci = TRUE,
  plot = TRUE,
  statComp = TRUE
)

# Evaluate all combination strategies (Parallel vs Serial)
combine_results <- decisioncombine(
  data = histopathology,
  gold = "GoldStandard",
  goldPositive = "1",
  test1 = "Biomarker_A",
  test1Positive = "1",
  test2 = "Biomarker_B",
  test2Positive = "1",
  showHeatmap = TRUE,
  showRecommendation = TRUE
)
```

### 3. Clinical ROC Analysis with Optimal Cutpoint Discovery

```r
# Determine optimal biomarker cutoff via Youden index
roc_analysis <- enhancedROC(
  data = biomarker_data,
  dep = "DiseaseStatus",
  indep = "Biomarker_Level",
  optCutoff = TRUE,
  cutoffMethod = "youden"
)
```

### 4. Inter-Rater Reliability Across Pathologists

```r
# Multi-rater Fleiss' Kappa and Krippendorff's Alpha
rater_agreement <- agreement(
  data = histology_ratings,
  vars = c("Pathologist_1", "Pathologist_2", "Pathologist_3"),
  wght = "squared",             # Quadratic weighting for ordinal grading
  kripp = TRUE,
  agreementHeatmap = TRUE,
  pairwiseKappa = TRUE
)
```

### 5. Sample Size Planning for an Agreement Study

```r
# Calculate required number of patients to test H0: kappa <= 0.4 vs H1: kappa = 0.7
sample_size <- kappaSizePower(
  kappa0 = 0.40,
  kappa1 = 0.70,
  props = c(0.60, 0.40),         # Prevalence of outcome classes
  raters = 2,
  alpha = 0.05,
  power = 0.80
)
```

---

## Citations & Ecosystem

When utilizing `meddecide` for academic publications and clinical trials, cite the package and the overarching ClinicoPath suite:

- **meddecide / ClinicoPath Suite:**
  > Balci S. (2025). *ClinicoPath jamovi Module*. DOI: [10.5281/zenodo.3997188](https://doi.org/10.5281/zenodo.3997188). GitHub: [sbalci/meddecide](https://github.com/sbalci/meddecide).
- **Underlying Statistical Engines:**
  - `pROC`: Robin X, et al. (2011). pROC: an open-source package for R and S+ to analyze and compare ROC curves. *BMC Bioinformatics*, 12, 77.
  - `cutpointr`: Thiele C, Hirschfeld G. (2021). cutpointr: Improved Estimation and Validation of Optimal Cutpoints in R. *Journal of Statistical Software*, 98(11), 1–27.
  - `irrCAC`: Gwet KL. (2014). *Handbook of Inter-Rater Reliability* (4th ed.). Advanced Analytics, LLC.
  - `poLCA`: Linzer DA, Lewis JB. (2011). poLCA: An R Package for Polytomous Variable Latent Class Analysis. *Journal of Statistical Software*, 42(10), 1–29.

<!-- tolaria:related:start -->

## See also

* [askLLM](askllm.md)
* [ClinicoPathDescriptives](clinicopath-descriptives.md)
* [jjstatsplot](jjstatsplot.md)
* [jsurvival](jsurvival.md)
* [Kappa](kappa.md)
* [Power Analysis](power-analysis.md)
* [ROC analysis](roc-analysis.md)
* [Sensitivity, Specificity, Predictive Values & Decision Making](sensitivity-specificity-predictive-values-and-decision-making.md)
* [Statistics and Bioinformatics](statistics-and-bioinformatics.md)
* [Tools for Data Analysis and Visualisation](tools-for-data-analysis-and-visualisation.md)

<!-- tolaria:related:end -->
