---
type: Clipping
status: Evergreen
language: en
title: "Statistical Rethinking (2026 Edition)"
source: "https://github.com/rmcelreath/stat_rethinking_2026"
source_type: repository
author:
  - "[[Richard McElreath]]"
published: 2026-01-06
created: 2026-09-08
description: "Statistical Rethinking (2026 Edition) by Richard McElreath (MPI-EVA). A practical course on Bayesian data analysis, causal inference with DAGs, generative modeling, multilevel models, and computational workflows with R, Stan, and rethinking."
tags:
  - clippings
  - statistics
  - bayesian
  - causal-inference
  - r-project
order: 110
belongs_to: "[[Clippings]]"
related_to:
  - "[[Courses and MOOCs]]"
  - "[[Books]]"
  - "[[Online R Books]]"
  - "[[R Education Videos]]"
  - "[[GitHub Repositories]]"
  - "[[Statistics and Bioinformatics Education]]"
  - "[[Statistics General]]"
  - "[[R-project]]"
---
# Statistical Rethinking (2026 Edition)

- **Instructor:** Richard McElreath (Director, Department of Human Behavior, Ecology and Culture, Max Planck Institute for Evolutionary Anthropology, Leipzig)
- **Repository:** [rmcelreath/stat_rethinking_2026](https://github.com/rmcelreath/stat_rethinking_2026)
- **Course Dates:** 6 January – 13 March 2026
- **Book:** *Statistical Rethinking: A Bayesian Course with Examples in R and Stan* (2nd Edition, CRC Press / Chapman & Hall; with draft chapters for the 3rd Edition) — [Book Site](https://xcelab.net/rm/statistical-rethinking/)
- **Software:** R package `rethinking` via [GitHub](https://github.com/rmcelreath/rethinking/), interfacing `cmdstanr` / Stan; conversions available in Python (`PyMC`), Julia (`Turing.jl`), etc.

---

## Overview & Philosophy

> "The unfortunate truth about data is that nothing much can be done with it, until we theorize about what caused it. Therefore the meaning of any statistical estimate depends upon assumptions outside the data and statistical model. So we will prioritize these outside assumptions: causal models, how to analyze them, and how to use them to construct scientifically meaningful statistical procedures. We will use Bayesian data analysis to connect scientific models to data. And we will learn powerful computational tools for coping with high-dimension, imperfect data of the kind that biologists and social scientists face."
> — Richard McElreath

*Statistical Rethinking* shifts statistical practice away from the standard "Ptolemaic" menu of arbitrary null-hypothesis significance tests (t-tests, ANOVA, p-values) towards **principled scientific modeling**:

1. **Causal Inference First:** Using Directed Acyclic Graphs (DAGs) to identify confounders, colliders, pipes, and forks before formulating regression equations.
2. **Generative Modeling:** Designing a synthetic data generation process to verify that an estimator can recover known ground truth before applying it to empirical observations.
3. **Bayesian Logic:** Representing uncertainty through joint posterior probability distributions rather than point estimates, null distributions, and p-values.
4. **Computational Workflow:** Employing Markov Chain Monte Carlo (MCMC) and Hamiltonian Monte Carlo (HMC) via Stan (`cmdstanr`) to fit realistic, high-dimensional models.

---

## 2026 Edition Structure: Two Tracks

The 2026 edition splits instruction into two concurrent 10-week tracks running at MPI-EVA, pacing material at half-speed compared to previous intensive runs:

- **Section A (Beginner):** Geared towards researchers new to causal inference and Bayesian regression modeling. Covers Chapters 1–12 of *Statistical Rethinking* (2nd edition).
  - *Playlist:* [Section A (Beginner) Playlist](https://www.youtube.com/watch?v=ztbYkBPDOgU&list=PLDcUM9US4XdPMtSV81e1R_4B6NugQBvTP)
- **Section B (Experienced):** Geared towards researchers who already understand the foundations and want advanced topics. Starts immediately with multilevel/hierarchical models, social networks, Gaussian processes, and generalized linear models.
  - *Playlist:* [Section B (Experienced) Playlist](https://www.youtube.com/watch?v=jh3RltVrQ-Q&list=PLDcUM9US4XdMD5hEU5uinyBYFFPXMYBfn)
- **Full Combined 2026 Playlist:** [2026 Chronological Playlist](https://www.youtube.com/watch?v=MBhjDMXtANE&list=PLDcUM9US4XdNOlqSyhe38US8mFgmqzI14)
- **Reference Archive:** [Statistical Rethinking 2023 Playlist](https://www.youtube.com/watch?v=FdnMWdICdRs&list=PLDcUM9US4XdPz-KxHM4XHt7uUVGWWVSus)

---

## Calendar & Topical Outline

| Week | Section | Topic | Lecture Link | Reading |
| --- | --- | --- | --- | --- |
| **01** | Beginner | Introduction | [Lecture](https://www.youtube.com/watch?v=ztbYkBPDOgU) | Chapters 1 & 2 |
|  | Experienced | Multilevel Models | [Lecture](https://www.youtube.com/watch?v=jh3RltVrQ-Q) | Chapter 12 |
| **02** | Beginner | Garden of Forking Data | [Lecture](https://www.youtube.com/watch?v=pGVkCWlXnlg) | Chapters 2 & 3 |
|  | Experienced | Multilevel Model Expansion | [Lecture](https://www.youtube.com/watch?v=Nv2rm1s9q6I) | Chapter 13 |
| **03** | Beginner | Geocentric Models | [Lecture](https://www.youtube.com/watch?v=JX_UyidsQNg) | Chapter 4 |
|  | Experienced | Correlated Features | [Lecture](https://www.youtube.com/watch?v=MBhjDMXtANE) | Chapter 13 |
| **04** | Beginner | Categories & Causes | [Lecture](https://www.youtube.com/watch?v=GIdwLrW2nNo) | Chapter 4 |
|  | Experienced | Group-level Confounds / Social Networks I | [Lecture](https://www.youtube.com/watch?v=XNNcN8sU8us) | Chapter 14 |
| **05** | Beginner | Estimands and Estiplans | [Lecture](https://www.youtube.com/watch?v=sYE8a95x-0E) | Chapters 4 & 5 |
|  | Experienced | Social Networks II | [Lecture](https://www.youtube.com/watch?v=5oZA8FBn2fc) | Chapter 14 |
| **06** | Beginner | Elemental Confounds I | [Lecture](https://www.youtube.com/watch?v=lGR7D45Ww38) | Chapter 6 |
|  | Experienced | Gaussian Processes | [Lecture](https://www.youtube.com/watch?v=MtXg7fxQgeA) | Chapter 15 |
| **07** | Beginner | Good and Bad Controls | [Lecture](https://www.youtube.com/watch?v=sTieMzOcreQ) | Chapter 6 |
|  | Experienced | Measurement Models | [Lecture](https://www.youtube.com/watch?v=IkWcbiwymi4) | Chapter 15 |
| **08** | Beginner | MCMC and Item Response Models | [Lecture](https://www.youtube.com/watch?v=N_LRQUrdHag) | Chapters 9 & 10 |
|  | Experienced | Missing and Censored Data | [Lecture](https://www.youtube.com/watch?v=VQm_toQpfEM) | Chapter 15 |
| **09** | Beginner | Modeling Events | [Lecture](https://www.youtube.com/watch?v=RuBUVQELw-c) | Chapters 10 & 11 |
|  | Experienced | Generalized Linear Madness | [Lecture](https://www.youtube.com/watch?v=Cv3rkUZc_cg) | Chapter 16 |
| **10** | Beginner | Confounds & Sensitivity Analysis | [Lecture](https://www.youtube.com/watch?v=pwN0kdN3reY) | Chapter 12 |
|  | Experienced | Hidden Markov Models | [Lecture](https://www.youtube.com/watch?v=fuonUuKTOl4) | Chapter 16 |

---

## Methodological Themes for Biomedical & Pathology Research

1. **DAGs and Non-Causal Associations:** In clinical pathology studies, multivariable regression models frequently suffer from the "Table 2 Fallacy" — reporting coefficients for all covariates as though they have identical causal validity. McElreath illustrates why adjusting for mediators or colliders introduces bias, whereas conditioning on genuine backdoor paths correctly isolates the causal estimand.
2. **Multilevel Shrinkage & Partial Pooling:** Particularly critical for pathology and clinical data where observations are nested within patients, biopsy cores, staining batches, laboratory sites, or scanner devices. Varying intercepts and varying slopes share information across groups, adaptively shrinking noisy estimates towards the grand mean without underestimating uncertainty.
3. **Measurement Error & Observer Variability:** Histopathological grading (e.g. tumour cell percentage, Gleason score, Nottingham histological grade) involves subjective error and inter-observer disagreement. Rather than treating subjective scores as immutable fixed covariates, Bayesian measurement error models incorporate uncertainty directly into the parameter likelihoods.
4. **Continuous Spatial Modeling with Gaussian Processes:** Provides principled covariance functions over physical distances, applicable to spatial transcriptomics, spatial proteomics, and tissue microarchitecture analysis.

<!-- tolaria:related:start -->

## See also

* [Books](../appendix/books.md)
* [Courses and MOOCs](../appendix/courses-and-moocs.md)
* [GitHub Repositories](../appendix/github-repositories.md)
* [Online R Books](../statistics-and-bioinformatics/r-project/online-r-books.md)
* [R Education Videos](../statistics-and-bioinformatics/r-project/r-education-videos.md)
* [R-project](../statistics-and-bioinformatics/r-project/README.md)
* [Statistics and Bioinformatics Education](../statistics-and-bioinformatics/statistics-and-bioinformatics-education.md)
* [Statistics General](../statistics-and-bioinformatics/statistics-general.md)

<!-- tolaria:related:end -->
