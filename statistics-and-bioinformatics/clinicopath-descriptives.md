---
type: Tool
status: Active
language: en
aliases:
  - "ClinicoPathDescriptives"
  - "ClinicoPath Descriptives"
  - "ClinicoPath jamovi module Descriptives"
order: 20
belongs_to: "[[Jamovi]]"
related_to:
  - "[[Jamovi]]"
  - "[[jjstatsplot]]"
  - "[[meddecide]]"
  - "[[jsurvival]]"
  - "[[Statistics and Bioinformatics]]"
  - "[[Data Visualization and R]]"
  - "[[Alluvial Diagrams]]"
  - "[[Tools for Data Analysis and Visualisation]]"
repo: https://github.com/sbalci/ClinicoPathDescriptives
documentation: https://www.serdarbalci.com/ClinicoPathDescriptives/
url: https://github.com/sbalci/ClinicoPathDescriptives
---

# ClinicoPathDescriptives

**ClinicoPathDescriptives** is an open-source R package and [jamovi]([[Jamovi]]) module developed by Serdar Balci designed specifically for descriptive analysis, statistical reporting, data quality validation, and visualization in clinicopathological and biomedical research.

It bridges the divide between command-line statistical computing in R and point-and-click clinical analysis by providing a dual-interface architecture: full programmatic functions for R pipelines alongside interactive GUI modules within the jamovi desktop environment.

- **GitHub Repository:** [sbalci/ClinicoPathDescriptives](https://github.com/sbalci/ClinicoPathDescriptives)
- **Documentation & Vignettes:** [serdarbalci.com/ClinicoPathDescriptives](https://www.serdarbalci.com/ClinicoPathDescriptives/)
- **jamovi Module Hub:** [serdarbalci.com/ClinicoPathJamoviModule](https://www.serdarbalci.com/ClinicoPathJamoviModule/)
- **Main Project & Issues:** [sbalci/ClinicoPathJamoviModule](https://github.com/sbalci/ClinicoPathJamoviModule/issues)
- **Zenodo DOI:** [10.5281/zenodo.3997188](https://doi.org/10.5281/zenodo.3997188)
- **License:** GPL-2.0+

---

## Dual Interface Design

1. **jamovi Graphical Interface:** Point-and-click menus integrated under the **Exploration** ribbon, designed for clinicians, residents, and researchers seeking reproducible outputs without writing code.
2. **R Programmatic Interface:** Native tidy-friendly R functions accepting data frames, pipe operators (`|>`, `%>%`), and standard formula syntax, generating publication-ready tables and `ggplot2`-based graphics.

---

## Analytical Modules & jamovi Menu Structure

In jamovi, the package expands the **Exploration** menu with five specialized clinicopathological sections:

```
Exploration
├── ClinicoPath Descriptives
│   ├── Table One (tableone)
│   ├── Summary of Continuous Variables (summarydata)
│   └── Summary of Categorical Variables (reportcat)
├── ClinicoPath Comparisons
│   ├── Cross Tables (crosstable)
│   └── Chi-Square Post-Hoc Tests (chisqposttest)
├── ClinicoPath Data Quality
│   ├── Benford's Law Analysis (benford)
│   ├── Single Variable Quality Check (checkdata)
│   ├── Multi-Variable Visual Quality (dataquality)
│   └── Outlier Detection (outlierdetection)
├── ClinicoPath Descriptive Plots
│   ├── Age Pyramid (agepyramid)
│   ├── Venn Diagram (venn)
│   ├── Variable Tree (vartree)
│   └── Alluvial Diagrams (alluvial)
└── ClinicoPath Data Preparation
    └── Categorize Continuous Variables (categorize)
```

### 1. Descriptive Reporting Suite (`ClinicoPath Descriptives`)
- **Table One (`tableone`):** Produces publication-grade baseline patient demographic and clinicopathologic characteristics tables. Supports four distinct journal-ready styling presets (NEJM, Lancet, JAMA formats), automatic variable type detection, non-parametric alternatives, and missingness accounting.
- **Continuous Summaries (`summarydata`):** Computes parametric (mean, SD) and non-parametric (median, IQR) summary statistics paired with automated **natural language clinical interpretations** and distributional diagnostics (skewness, kurtosis, Shapiro-Wilk normality testing).
- **Categorical Reporting (`reportcat`):** Generates detailed frequency tables, percentages, cumulative proportions, and missing value breakdowns formatted for clinical trial reports.

### 2. Contingency & Comparative Analysis (`ClinicoPath Comparisons`)
- **Cross Tables (`crosstable`):** Advanced $2 \times 2$ and $R \times C$ contingency tables offering Pearson's $\chi^2$, Fisher's exact test, continuity corrections, relative risk, odds ratios, and false discovery rate corrections ($q$-values) for multiple comparisons.
- **Chi-Square Post-Hoc Tests (`chisqposttest`):** Methodologically guardrailed post-hoc pairwise comparisons that trigger **only** when the global $\chi^2$ test achieves statistical significance ($p < \alpha$), preventing exploratory data dredging. Includes standardized adjusted residuals and Bonferroni / Benjamini-Hochberg adjustment options.

### 3. Data Quality & Pre-Analytical Auditing (`ClinicoPath Data Quality`)
- **Benford's Law (`benford`):** First-digit distribution analysis evaluating data integrity, fabrication, or digital rounding artifacts across continuous clinical measurements spanning multiple orders of magnitude.
- **Single Variable Quality Check (`checkdata`):** Comprehensive pre-flight screening for single variables. Computes completeness, missingness typology, consensus outlier flagging (requiring agreement across $\ge 2$ independent detection algorithms), repeated value inspection, and clinical plausibility checks, returning an aggregate heuristic quality grade.
- **Multi-Variable Visual Quality (`dataquality`):** Dataframe profiling including duplicate record detection, missing value heatmaps, and completeness summaries.
- **Outlier Detection (`outlierdetection`):** Integrates multivariate and univariate anomaly detection algorithms from `performance`:
  - *Univariate:* $Z$-scores, Interquartile Range (IQR) fences, confidence intervals.
  - *Multivariate:* Minimum Covariance Determinant (MCD), Mahalanobis distance, Local Outlier Factor (LOF), and OPTICS clustering.

### 4. Specialized Clinical Visualizations (`ClinicoPath Descriptive Plots`)
- **Alluvial Diagrams (`alluvial`):** Patient pathway tracking across stages, treatment lines, and outcome transitions using `ggalluvial` and `easyalluvial`.
- **Venn & UpSet Plots (`venn`):** Multi-set relationship visualization supporting 2 to 7 sets via `ggVennDiagram`, with optional transition to `UpSetR` / `ComplexUpset` layouts for high-dimensional set intersections.
- **Age Pyramids (`agepyramid`):** Demographic age-distribution pyramids stratified by biological sex or treatment arm.
- **Variable Trees (`vartree`):** Hierarchical decision and subset trees powered by `vtree` to illustrate patient flow, inclusion/exclusion criteria, and subgroup distributions.

### 5. Data Transformation (`ClinicoPath Data Preparation`)
- **Categorize Continuous Variables (`categorize`):** Discretizes continuous biomarkers into clinically meaningful categories via equal intervals, sample quantiles, manual thresholds, mean $\pm$ SD tiers, median split, or Fisher-Jenks natural breaks. Writes the resulting factor back to the active jamovi spreadsheet.

---

## Quick Start (R Code Example)

```r
# Install development version
devtools::install_github("sbalci/ClinicoPathDescriptives")

library(ClinicoPathDescriptives)

# Load included histopathology dataset
data("histopathology")

# 1. Generate Baseline Table One
tbl1 <- tableone(
  data = histopathology,
  grouping_variable = "Treatment_Group",
  explanatory_variables = c("Age", "Gender", "Tumor_Size", "Grade")
)

# 2. Cross-tabulation with Statistical Tests
cross_res <- crosstable(
  data = histopathology,
  dependent_variable = "Response",
  explanatory_variables = c("Treatment_Group", "Biomarker_Status"),
  statistical_test = TRUE
)

# 3. Patient Journey Alluvial Plot
alluv_plot <- alluvial(
  data = histopathology,
  variables = c("Stage", "First_Line_Therapy", "Response", "Recurrence")
)
```

---

## Place in the ClinicoPath Ecosystem

ClinicoPath began as a monolithic jamovi module ([`ClinicoPathJamoviModule`](https://github.com/sbalci/ClinicoPathJamoviModule)) and was later modularized into targeted packages:
- **`ClinicoPathDescriptives`**: Descriptive statistics, Table 1, contingency tables, data auditing, and exploratory visualizations.
- **`OncoPath`**: Specialized oncology timeline plots, including swimmer plots (individual patient treatment timelines) and waterfall plots (RECIST tumor burden changes).
- **Core ClinicoPath**: Survival analysis (Kaplan-Meier, Cox regression), diagnostic agreement (Kappa), ROC analysis, decision curves, and decision trees.

---

## Installation

### In jamovi
1. Open **jamovi** (version $\ge 2.7.27$).
2. Click the `⊕` (**Modules**) button in the top-right corner.
3. Select **jamovi library**, search for `ClinicoPathDescriptives`, and click **Install**.

### In R
```r
if (!requireNamespace("devtools", quietly = TRUE)) install.packages("devtools")
devtools::install_github("sbalci/ClinicoPathDescriptives")
```
