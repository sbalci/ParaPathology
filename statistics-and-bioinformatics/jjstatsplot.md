---
type: Tool
status: Evergreen
language: en
aliases:
  - "jjstatsplot"
  - "jjstatsplot jamovi module"
order: 30
belongs_to: "[[Jamovi]]"
related_to:
  - "[[Jamovi]]"
  - "[[ClinicoPathDescriptives]]"
  - "[[meddecide]]"
  - "[[jsurvival]]"
  - "[[askLLM]]"
  - "[[Statistics and Bioinformatics]]"
  - "[[Data Visualization and R]]"
  - "[[Tools for Data Analysis and Visualisation]]"
repo: https://github.com/sbalci/jjstatsplot
documentation: https://www.serdarbalci.com/jjstatsplot/
url: https://github.com/sbalci/jjstatsplot
---

# jjstatsplot

**jjstatsplot** is an open-source R package and [jamovi](jamovi.md) module developed by Serdar Balci that wraps the [ggstatsplot](https://www.indrapatil.com/ggstatsplot/) framework (created by Indrajeet Patil) into an intuitive, point-and-click graphical interface for jamovi and a high-level programmatic interface for R.

Traditional scientific workflows typically decouple statistical hypothesis testing from data visualization, forcing researchers to manually run statistical tests in one step and subsequently annotate plots or write captions in another. **jjstatsplot** combines statistical analysis and data visualization into single, cohesive, publication-ready graphics that automatically embed test statistics, $p$-values, effect sizes with confidence intervals, sample sizes, and Bayesian factors directly in plot annotations.

- **GitHub Repository:** [sbalci/jjstatsplot](https://github.com/sbalci/jjstatsplot)
- **Documentation & Vignettes:** [serdarbalci.com/jjstatsplot](https://www.serdarbalci.com/jjstatsplot/)
- **ggstatsplot Upstream Guide:** [indrapatil.com/ggstatsplot](https://www.indrapatil.com/ggstatsplot/)
- **Bug Reports & Issues:** [ClinicoPathJamoviModule/issues](https://github.com/sbalci/ClinicoPathJamoviModule/issues)
- **ClinicoPath Suite Citation:** [10.5281/zenodo.3997188](https://doi.org/10.5281/zenodo.3997188)
- **License:** GPL (>= 2)

---

## Key Capabilities & Architecture

1. **Integrated Statistical Hypotheses:**
   Every supported visualization offers automatic calculation and subtitle reporting across four major statistical frameworks:
   - **Parametric:** Student's $t$-test, Welch's $t$-test, Fisher's one-way ANOVA, Pearson's product-moment correlation ($r$).
   - **Non-parametric:** Mann-Whitney $U$ test, Kruskal-Wallis one-way ANOVA, Wilcoxon signed-rank test, Friedman test, Spearman's rank correlation ($\rho$).
   - **Robust:** Trimmed-means comparisons (Yuen's test), Huber and percentage-bend robust correlation coefficients, and robust heteroscedastic ANOVAs via `WRS2`.
   - **Bayesian:** Bayesian $t$-tests, one-way ANOVA, contingency table tests, and correlation analyses via `BayesFactor` and `statsExpressions`, reporting Bayes Factors ($\log_e(BF_{10})$ or $BF_{10}$) and posterior estimates.

2. **Dual Execution Interfaces:**
   - **jamovi Graphical Interface:** Integrated natively into the jamovi **Analyses** ribbon, allowing clinicians and researchers to drag and drop variables, toggle between statistical paradigms, customize aesthetics, and export vector graphics without writing code.
   - **R Programmatic Interface:** Exportable, clean functions (`jjhistostats()`, `jjbetweenstats()`, etc.) usable in scripts, R Markdown, and Quarto reports.

3. **Multi-Variable & Grouped Analysis:**
   - **Dual-Mode Operation:** Functions process either single dependent variables or multiple variables simultaneously.
   - **Automatic Grouping/Faceting:** Facets plots seamlessly across categorical covariates (e.g., patient subgroups, histological subtypes, or treatment arms).

4. **Rich Aesthetic & Theme Customization:**
   - Pre-packaged color palettes from `RColorBrewer`, `viridis`, and `ggprism`.
   - Configurable point jittering, violin/box layer ordering, and outlier labeling.
   - Dynamic canvas resizing to accommodate complex labels, long axis titles, and detailed statistical subtitles.

---

## The 18 Analysis Types

| Category | Function / Analysis | Description | Statistical Details Embedded |
| :--- | :--- | :--- | :--- |
| **Continuous Distributions** | Histogram (`jjhistostats`) | Distribution visualization with density curves | Shapiro-Wilk test, robust central tendencies, parametric/Bayesian tests |
| **Continuous vs Continuous** | Scatter Plot (`jjscatterstats`) | Bivariate relationship with marginal distributions | Correlation coefficients ($r$, $\rho$), linear/robust regression, $p$-values, $BF_{10}$ |
| **Continuous vs Continuous** | Correlation Matrix (`jjcorrmat`) | Matrix of pairwise correlations across multiple variables | Significance levels, correlation coefficients, $p$-value matrices |
| **Continuous vs Continuous** | Hull Plot (`hullplot`) | 2D scatter visualization with convex/concave hulls | Convex hull polygonal boundaries, cluster and group membership |
| **Categorical vs Continuous** | Box-Violin Plot (`jjbetweenstats`) | Between-groups comparison across independent cohorts | Student's/Welch's ANOVA, Kruskal-Wallis, Yuen's trimmed test, post-hoc tests |
| **Categorical vs Continuous** | Box-Violin Plot (`jjwithinstats`) | Within-subjects / repeated measures comparison | Repeated measures ANOVA, Friedman test, paired post-hoc tests |
| **Categorical vs Continuous** | Dot Chart (`jjdotplotstats`) | Mean and median comparisons across categories | Confidence intervals, effect sizes, point estimates |
| **Categorical vs Categorical** | Bar Chart (`jjbarstats`) | Two-way cross-tabulation and composition | Pearson's $\chi^2$, Fisher's exact test, Cramér's $V$, contingency coefficients |
| **Categorical vs Categorical** | Pie Chart (`jjpiestats`) | Categorical composition and proportions | Goodness-of-fit $\chi^2$, proportions test, effect sizes |
| **Distribution Parts-to-Whole** | Waffle Chart (`jjwaffle`) | Square grid / waffle visualization of counts/percentages | Proportional breakdown across discrete classes |
| **Advanced Distributions** | Raincloud Plot (`raincloud`) | Hybrid raw jittered points + boxplot + split violin density | Kernel density, quartiles, individual datapoint distributions |
| **Advanced Distributions** | Advanced Raincloud (`advancedraincloud`) | Enhanced raincloud plots with longitudinal tracking | Repeated measures paths, multi-group stratifications |
| **Distribution Comparison** | Ridge Plots (`jjridges`) | Staggered ridgeline density curves via `ggridges` | Overlapping group densities, quantile shading, multimodal checks |
| **Network & Flow** | Arc Diagrams (`jjarcdiagram`) | Node-link relationships with curved arcs | Connection weights, node rankings, directional connections |
| **Segmented Proportions** | Segmented Bar (`jjsegmentedtotalbar`) | Stacked bar with segment-level and overall counts | Subgroup proportions paired with total sample counts |
| **Time Series / Trends** | Line Chart (`linechart`) | Trajectories and continuous progressions | Rate of change, mean trends, confidence ribbons |
| **Ranked Data** | Lollipop Chart (`lollipop`) | Clean stem-and-dot comparison of discrete categories | Ranked differences, divergence from baseline or grand mean |
| **Extended Multi-Method** | Stats Plot 2 (`statsplot2`) | Composite multi-panel statistical displays | Harmonized multi-variable statistical comparisons |

---

## Quick Start in R

```r
# Install from GitHub
if (!requireNamespace("devtools", quietly = TRUE)) install.packages("devtools")
devtools::install_github("sbalci/jjstatsplot")

library(jjstatsplot)

# 1. Independent group comparison with embedded statistics
jjbetweenstats(
  data = iris,
  dep = "Sepal.Length",
  group = "Species",
  type = "parametric",     # "parametric", "nonparametric", "robust", or "bayes"
  pairwise.comparisons = TRUE,
  p.adjust.method = "bonferroni"
)

# 2. Correlation scatter plot with marginal distributions
jjscatterstats(
  data = mtcars,
  dep = "wt",
  group = "mpg",
  type = "robust",
  marginal = TRUE
)

# 3. Categorical distribution and association test
jjbarstats(
  data = as.data.frame(Titanic),
  dep = "Survived",
  group = "Class",
  counts = "Freq"
)
```

---

## Upstream Citations & Acknowledgments

When utilizing `jjstatsplot` in academic research, cite the module and its foundational packages:

- **jjstatsplot / ClinicoPath Suite:**
  > Balci S. *ClinicoPath jamovi Module*. DOI: [10.5281/zenodo.3997188](https://doi.org/10.5281/zenodo.3997188).
- **ggstatsplot Framework:**
  > Patil I. (2021). Visualizations with statistical details: The 'ggstatsplot' approach. *Journal of Open Source Software*, 6(61), 3167. DOI: [10.21105/joss.03167](https://doi.org/10.21105/joss.03167).
- **jamovi Platform:**
  > The jamovi project. *jamovi* (Computer Software). [https://www.jamovi.org](https://www.jamovi.org).

<!-- tolaria:related:start -->

## See also

* [askLLM](askllm.md)
* [ClinicoPathDescriptives](clinicopath-descriptives.md)
* [Data Visualization and R](data-visualization-and-r.md)
* [jsurvival](jsurvival.md)
* [meddecide](meddecide.md)
* [Statistics and Bioinformatics](statistics-and-bioinformatics.md)
* [Tools for Data Analysis and Visualisation](tools-for-data-analysis-and-visualisation.md)

<!-- tolaria:related:end -->
