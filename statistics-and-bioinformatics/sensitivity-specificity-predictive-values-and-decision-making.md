---
type: Note
status: Stub
language: en
aliases:
  - "Sensitivity, Specificity, Predictive Values & Decision Making"
order: 230
belongs_to: "[[Statistics and Bioinformatics]]"
---

# Sensitivity, Specificity, Predictive Values & Decision Making

Diagnostic test accuracy (DTA) and medical decision analysis quantify how effectively a diagnostic test, biomarker, or screening tool discriminates between patients with and without a target condition.

## Core Diagnostic Performance Metrics

For a binary diagnostic test evaluated against an established reference standard, cases are categorized in a $2 \times 2$ contingency table:

| Test Outcome | Disease Present ($D^+$) | Disease Absent ($D^-$) | Total |
| :--- | :--- | :--- | :--- |
| **Test Positive ($T^+$)** | True Positive ($TP$) | False Positive ($FP$) | Total Test Positive ($TP + FP$) |
| **Test Negative ($T^-$)** | False Negative ($FN$) | True Negative ($TN$) | Total Test Negative ($FN + TN$) |
| **Total** | Total Diseased ($TP + FN$) | Total Non-Diseased ($FP + TN$) | Total Cohort ($N$) |

### Fundamental Definitions

1. **Sensitivity (True Positive Rate):**
   $$\text{Sensitivity} = \frac{TP}{TP + FN} = P(T^+ \mid D^+)$$
   The probability that a diseased individual tests positive. High sensitivity is crucial for **screening tests** to "rule out" disease (SnNOut: high **S**e**n**sitivity, **N**egative test rules **Out**).

2. **Specificity (True Negative Rate):**
   $$\text{Specificity} = \frac{TN}{TN + FP} = P(T^- \mid D^-)$$
   The probability that a disease-free individual tests negative. High specificity is critical for **confirmatory tests** to "rule in" disease before invasive or toxic interventions (SpPIn: high **Sp**ecificity, **P**ositive test rules **In**).

3. **Positive Predictive Value (PPV):**
   $$\text{PPV} = \frac{TP}{TP + FP} = P(D^+ \mid T^+)$$
   The proportion of test-positive individuals who truly have the condition. **PPV depends heavily on disease prevalence** in the tested cohort.

4. **Negative Predictive Value (NPV):**
   $$\text{NPV} = \frac{TN}{TN + FN} = P(D^- \mid T^-)$$
   The proportion of test-negative individuals who are truly disease-free. Like PPV, **NPV varies with pre-test disease prevalence**.

5. **Likelihood Ratios ($LR^+$ and $LR^-$):**
   Likelihood ratios combine sensitivity and specificity into prevalence-independent metrics:
   - **Positive Likelihood Ratio ($LR^+$):**
     $$LR^+ = \frac{\text{Sensitivity}}{1 - \text{Specificity}} = \frac{P(T^+ \mid D^+)}{P(T^+ \mid D^-)}$$
     ($LR^+ > 10$ indicates strong evidence to rule in disease).
   - **Negative Likelihood Ratio ($LR^-$):**
     $$LR^- = \frac{1 - \text{Sensitivity}}{\text{Specificity}} = \frac{P(T^- \mid D^+)}{P(T^- \mid D^-)}$$
     ($LR^- < 0.1$ indicates strong evidence to rule out disease).

6. **Youden's $J$ Index:**
   $$J = \text{Sensitivity} + \text{Specificity} - 1$$
   Captures overall discriminative ability ($0 \le J \le 1$) and serves as a standard optimization metric for cutoff selection in [[ROC analysis]].

---

## Bayesian Updating & Fagan Nomograms

Diagnostic testing updates the clinical probability of disease via Bayes' rule:

$$\text{Pre-test Odds} = \frac{\text{Pre-test Probability}}{1 - \text{Pre-test Probability}}$$
$$\text{Post-test Odds} = \text{Pre-test Odds} \times \text{Likelihood Ratio}$$
$$\text{Post-test Probability} = \frac{\text{Post-test Odds}}{1 + \text{Post-test Odds}}$$

A **Fagan nomogram** graphically aligns pre-test probability, the calculated likelihood ratio, and post-test probability on three logarithmic axes, enabling clinicians to intuitively appreciate how test results alter diagnostic certainty.

---

## Tooling & Practical Implementation

In the [jamovi]([[Jamovi]]) and R ecosystem, **[[meddecide]]** provides dedicated interactive and programmatic tools for medical decision analyses:
- **`decision`**: Computes all accuracy metrics with confidence intervals from patient raw data.
- **`decisioncalculator`**: Instant $2 \times 2$ calculator using summary cell counts ($TP$, $FP$, $TN$, $FN$) without needing raw patient records.
- **`decisioncompare`**: Compares multiple tests against a gold standard using McNemar's test and multi-axis radar plots.
- **`decisioncombine`**: Evaluates parallel, serial, and majority test combination rules.
- **`cotest` & `sequentialtests`**: Models co-testing and staged diagnostic algorithms.
- **`nogoldstandard`**: Fits latent class models (LCA) when the reference standard is imperfect.

---

## See Also
- **[[meddecide]]**
- **[[ROC analysis]]**
- **[[Kappa]]**
- **[[Power Analysis]]**
- **[[Jamovi]]**
- **[[Statistics and Bioinformatics]]**
