---
type: Note
relationships:
  Type:
    - "[[note]]"
related_to:
  - "[[r-project]]"
  - "[[kaplan-meier]]"
---

# Lavaan

`lavaan` is an R package for **latent variable analysis** — confirmatory factor analysis (CFA), structural equation modeling (SEM), path analysis, mediation, and growth-curve models. It is the open-source counterpart to commercial tools like Mplus, AMOS, and LISREL.

## When SEM earns its keep

Reach for lavaan only when at least one of these is true:

- **Latent constructs.** The thing you care about is unobserved and measured by several noisy indicators (e.g., "tumor immunogenicity" indicated by TIL density, PD-L1, MHC-I, mutational load).
- **Mediation.** You hypothesize a causal chain A → M → Y and want to decompose direct vs indirect effects.
- **Multiple correlated outcomes.** Several endogenous variables that should be modeled jointly rather than one regression at a time.
- **Measurement invariance.** You want to test whether a scale/score means the same thing across groups (e.g., across labs, across ethnicities, across tumor subtypes).
- **Growth / longitudinal trajectories.** Repeated measures with random intercepts/slopes treated as latent factors.

If your question is "do features X₁…Xₚ predict outcome Y?" — that is regression, not SEM.

## Sample-size reality check

SEM is hungry for data. Common rules of thumb:

- ≥ 10 cases per estimated parameter (≥ 20 is safer).
- ≥ 200 cases for any non-trivial model.
- Categorical indicators (WLSMV estimator) need **more**, not less, than continuous ones.
- Bootstrapped indirect effects for mediation typically want n ≥ 200.

A CFA with 8 indicators and 3 factors easily has 25+ parameters — that is a 250-case minimum, not a 60-case pilot.

## Pathology study designs where lavaan is a *good* fit

### 1. Tumor microenvironment as a latent construct

> *"Immune-inflamed phenotype"* is not directly measured. It is indicated by CD8⁺ density, CD4⁺ density, PD-L1 TPS, tertiary lymphoid structure count, and IFN-γ signature score.

**Model.** CFA with one latent factor `Immune` loaded by those five indicators, then a structural path on a continuous outcome (e.g., `RFS_months ~ Immune + Stage + Age` for uncensored data). Use WLSMV if any indicator is ordinal.

**Why SEM helps.** Each indicator alone is noisy and partially redundant. A regression with all five as covariates is collinear and hard to interpret. The latent variable averages signal and discards measurement error.

**Caveat on survival outcomes.** lavaan does not natively handle right-censored time-to-event data. For survival endpoints, either (a) extract the latent factor scores and feed them into a Cox model in `survival`, or (b) use a two-stage approach with `lavaan.survreg` / `regsem` extensions. Don't treat censored survival time as a continuous outcome inside `sem()`.

### 2. Mediation: biomarker → microenvironment → outcome

> Does MMR-deficient status improve survival **because** it produces a hotter immune microenvironment?

**Model.** Use a continuous mediation outcome (e.g., a continuous prognostic score, biomarker level, or recurrence indicator). For survival as the final outcome, the cleanest path is the two-stage approach: estimate `Immune` factor scores in lavaan, then fit a Cox model with `MMRd` and the predicted scores in `survival`, and bootstrap the indirect effect at the wrapper level (`boot::boot` or the `mediation` package with a Cox model).

```
Immune =~ CD8 + TIL + PDL1 + TLS
Immune ~ a*MMRd
Y      ~ b*Immune + c*MMRd     # Y continuous (e.g., log-transformed biomarker)
indirect := a*b
total    := c + a*b
```

**Why SEM helps.** Standard Cox regression tells you MMRd is prognostic but not *why*. Mediation decomposes how much of the effect runs through immunity vs other pathways (e.g., neoantigen-independent mechanisms). Use bootstrap CIs for `indirect`.

### 3. Inter-observer agreement as measurement invariance

> Do three pathologists scoring stromal TILs measure the **same** underlying construct, or do they each have a different idiosyncratic version of it?

**Model.** Multi-group CFA with each pathologist as a group, testing configural → metric → scalar invariance.

**Why SEM helps.** κ tells you agreement on a scale; invariance testing tells you *where* the disagreement lives — different loadings (they weight features differently), different intercepts (one is systematically high), or different residuals (one is noisier).

### 4. Growth curves of biomarker change

> Ki-67 measured at biopsy, mid-treatment, and resection. Does the *trajectory* (intercept and slope) predict pathologic complete response, after adjusting for baseline?

**Model.** Latent growth curve with intercept and slope factors, regressing pCR on slope.

**Why SEM helps.** Models the trajectory as a person-level latent variable. Cleaner than per-patient OLS slopes, handles missing time points under MAR, and lets you test whether intercept-slope correlation is non-zero.

### 5. Composite scoring — reflective vs formative

> A "histologic aggressiveness" score built from grade, mitoses/mm², LVI, perineural invasion, and necrosis. Are these genuinely indicators of one construct, or several?

**Model.** If you believe the underlying construct *causes* the indicators (e.g., aggressiveness manifests as higher grade, more mitoses, more LVI), use exploratory followed by confirmatory factor analysis to test one-factor vs two-factor (proliferation vs invasion) structures — this is a **reflective** measurement model.

**Caveat — formative composites.** If indicators instead *constitute* the score (each adds independent information rather than reflecting a shared latent cause), CFA is the wrong tool. Reach for PLS-SEM (`cSEM`, `seminr`) or MIMIC models. This distinction matters: dropping a redundant reflective indicator barely moves the latent factor; dropping a formative indicator changes the construct's meaning.

**Why SEM helps.** Validates whether a clinical composite is internally coherent — and forces you to make the reflective/formative assumption explicit before it gets used as a single risk score.

## Minimal lavaan example

```r
library(lavaan)

model <- '
  # measurement
  Immune =~ CD8 + TIL + PDL1 + TLS
  # structural
  Immune ~ a*MMRd
  Y      ~ b*Immune + c*MMRd       # Y is a continuous outcome
  # mediation
  indirect := a*b
  total    := c + a*b
'

# Continuous indicators + continuous Y → ML/MLR with bootstrap mediation CIs.
# If indicators are ordinal/binary, switch estimator = "WLSMV" and drop bootstrap
# (WLSMV is computationally heavy with bootstrap; use Monte Carlo or delta-method CIs).
fit <- sem(model, data = df, estimator = "MLR",
           se = "bootstrap", bootstrap = 1000)
summary(fit, fit.measures = TRUE, standardized = TRUE, ci = TRUE)
```

## Reporting checklist

- Model specification (path diagram or equations)
- Estimator (`ML`, `MLR`, `WLSMV`) and rationale
- Sample size and missing-data handling (FIML vs listwise)
- Fit indices: χ², CFI ≥ 0.95, TLI ≥ 0.95, RMSEA ≤ 0.06, SRMR ≤ 0.08
- Standardized loadings and path coefficients with CIs
- For mediation: bootstrap CI for indirect effect
- Modification indices: report only if used, and justify any post-hoc changes

## When **not** to use lavaan

- Single binary outcome with predictors → logistic regression / penalized regression / ML classifier. Worked example: Lasocki et al. (*AJNR* 2018, n=69, 21 codeleted) and Yan et al. (*Lab Invest* 2022, n=555, ResNet-34) — both predict 1p/19q co-deletion from MRI. lavaan/WLSMV *can* handle the binary/ordinal indicators in these data; the binding constraint for Lasocki is sample size, and for both papers there is a deeper definitional-circularity problem (covered two sections below) that no estimator fixes.
- Time-to-event with one outcome → Cox model. (See [[Kaplan Meier]] and [[Regression modeling of competing risk using R: an in depth guide for clinicians - Bone Marrow Transplantation|competing-risk regression]].)
- n < 100 with many indicators → underpowered; consider a simpler composite score or partial least squares (`plspm`, `cSEM`).
- Pure prediction without theoretical structure → SEM is a confirmatory tool, not a feature-selection method.

## Adjacent tools that often fit better — or complement lavaan

When the question doesn't involve latent constructs or causal pathways, these are usually the better fit. Some (`poLCA`, `glmnet`) also pair naturally with lavaan in mixed workflows:

| Question | Right tool | R package |
|---|---|---|
| Discover imaging/molecular **subtypes** from categorical indicators — and the cleanest *non-circular* test of imaging→molecular claims (form classes from imaging alone, then ask post-hoc whether they align with molecular labels) | Latent class analysis (closest in spirit to CFA, but for categorical class membership) | `poLCA` |
| Multivariable prediction with **small n** and many candidate features | Penalized logistic regression (LASSO / elastic net) | `glmnet` |
| **Calibration** of a prediction model (not just discrimination/AUC) | Calibration curves, Brier score, calibration-in-the-large | `rms`, `CalibrationCurves` |
| **Clinical utility** of a prediction model at varying thresholds | Decision curve analysis (net benefit) | `dcurves`, `rmda` |
| Inter-observer agreement on **ordinal** ratings | Weighted κ, intraclass correlation (ICC) | `irr`, `psych` |
| **Time-to-event** with multiple competing causes | Fine–Gray subdistribution hazards | `cmprsk`, `tidycmprsk` |
| Survival modeling with covariates | Cox PH, with calibration and DCA on top | `survival`, `rms` |

Rule of thumb: if the outcome is a single observed variable and the question is purely "how well do features predict it?" — start with this table. Reach for lavaan only if you also care about a latent construct, a mediating mechanism, or measurement structure.

## A deeper problem the *statistics* can't fix: definitional circularity

The lavaan-vs-logistic-regression debate above is a tool choice. Underneath it sits a more dangerous failure mode that no estimator rescues — when the **target itself** has been redefined to include the very thing you are using to predict it.

The two glioma/MRI papers cited above are textbook examples.

**The circular chain.**

```
Pre-2016 histology defined oligodendroglioma
        ↓
Oligodendroglial histology correlated with MRI features
(calcification, cortical location, indistinct borders)
        ↓
1p/19q co-deletion was found to co-occur with oligodendroglial histology
        ↓
WHO 2016 redefined oligodendroglioma to REQUIRE 1p/19q co-deletion
        ↓
Papers now claim "MRI predicts 1p/19q co-deletion"
```

What the studies actually demonstrate is *MRI predicts oligodendroglial histology → which by 2016 definition **is** 1p/19q co-deletion*. The molecular feature is no longer independent of the histological entity; it constitutes it.

**Why each paper is vulnerable.**

- **Lasocki et al.** explicitly note that *"1p/19q testing was generally performed on the basis of an oligodendroglial component on standard histologic assessment."* The cohort was pre-selected to look oligodendroglial; radiologists were then asked whether the imaging looked oligodendroglial. Agreement was inevitable.
- **Yan et al.** trained a ResNet-34 on cases where 1p/19q FISH was performed *because* the tumors looked oligodendroglial. The CNN learned a category boundary that decades of neuroradiology had already encoded into the imaging phenotype. The near-perfect AUCs (0.999 train, 0.983 test) are consistent with a tautology, not a discovery.

**Why no statistical fix saves you.** Logistic regression, LASSO, deep learning, lavaan, latent class analysis — all of them inherit the circularity from the labels. Calibration plots, DCA, and bootstrap CIs are necessary but powerless here: a perfectly calibrated tautology is still a tautology.

**The escape hatch: biological-substrate test.** A finding earns "imaging → biology" status only when there is a *mechanistic* basis independent of the morphological category that drove enrollment. T2-FLAIR mismatch passes — microcystic tumor architecture plausibly drives differential free-water signal. Calcification → "looks oligodendroglial" doesn't.

**What a non-circular study would require.**

- Unselected glioma cohort across grades and histologies, not enriched for oligodendroglial appearance.
- Imaging assessment blinded *before* any histology.
- Molecular testing on **all** cases, not only those suspected oligodendroglial.
- Prospective design to remove retrospective enrichment.

**The defensible claim.** *"MRI features can serve as a surrogate for histological subtype, and since subtype is now molecularly defined, imaging may reduce the need for formal molecular testing in resource-limited settings."* That is clinically useful but much more modest than "imaging predicts molecular biology."

**Generalizable pitfall.** Watch for this trap any time a *classifier's training labels were retrospectively redefined to include features correlated with the predictors*. Candidates beyond gliomas: MMR/MSI imaging surrogates after MMR became part of Lynch-spectrum classification, IDH-mutant prediction in cohorts pre-selected by morphology, NTRK-fusion morphology claims in tumors selected by suspicion. The methodological reflex: ask *"what defined the cohort, and is the target downstream of that definition?"*

## Methods that can formally test the circularity claim

lavaan and adjacent latent-variable methods (`poLCA` for LCA, `psych` for polychoric correlations) handle categorical and ordinal data through polychoric/tetrachoric correlations and the WLSMV estimator. Depending on which question you ask, one of these methods is the *direct statistical test* of the circularity argument above; another *sidesteps* it.

A worked typology against the variables in the two glioma papers:

| Variable | Type | Notes |
|---|---|---|
| 1p/19q status | Binary | Outcome |
| T2-FLAIR mismatch | Ordinal | <33%, 33–50%, >50% |
| Calcification | Binary | Present / absent |
| Cortical involvement | Ordinal | <33%, 33–50%, >50% |
| IDH mutation | Binary | Present / absent |
| WHO grade | Ordinal | II vs III |
| Enhancement pattern | Nominal | None / blurry / nodular / ring |
| Age, KPS | Continuous | Paper 2 only |

### 1. Measurement question — *"Do these MRI features reflect a single underlying tumor phenotype?"*

Polychoric/tetrachoric correlation matrix feeding a CFA with WLSMV. This separates the **imaging construct** from the **molecular label** — conceptually important given the circularity concern.

```r
library(lavaan)
library(psych)

# Polychoric correlation matrix for ordinal/binary indicators
poly <- polychoric(mri_features)

# CFA with WLSMV (correct estimator for categorical indicators)
model <- '
  oligo_phenotype =~ t2flair_mismatch +
                     calcification +
                     cortical_involvement +
                     enhancement
'
fit <- cfa(model,
           data    = mri_data,
           ordered = c("t2flair_mismatch", "cortical_involvement", "enhancement"),
           estimator = "WLSMV")
summary(fit, fit.measures = TRUE)
```

### 2. Structural question — *"Do imaging features predict molecular status through histological phenotype?"* (the direct circularity test)

This is the model that **formally tests the tautology**: if the path from imaging features to 1p/19q co-deletion drops to non-significance after conditioning on histological phenotype, that is statistical evidence the imaging→molecular signal is fully mediated by histology — i.e., the circularity is real.

```r
path_model <- '
  # Direct paths
  codeletion ~ t2flair_mismatch + calcification + idh_mutation + grade

  # Indirect through histological phenotype
  histo_phenotype ~ t2flair_mismatch + calcification + cortical_involvement
  codeletion ~ histo_phenotype
'
fit <- sem(path_model,
           data    = glioma_data,
           ordered = c("codeletion", "t2flair_mismatch", "histo_phenotype"),
           estimator = "WLSMV")
```

### 3. Reliability question — *"Is T2-FLAIR mismatch measured consistently?"* (CFA as a complement to weighted κ)

Paper 1 reports weighted κ for two radiologists. A latent-true-score model can do something κ cannot: it **separates measurement error from true disagreement** by treating raters as noisy indicators of a latent true score. Identification matters here — a single-factor model with only 2 indicators is just-identified at best (zero degrees of freedom, no testable fit), so you must either constrain loadings/residuals to be equal across raters (the τ-equivalent assumption) or — better — use ≥ 3 raters so the model is over-identified and fit can actually be assessed.

```r
library(irr)
library(psych)

# Conventional ICC for ordinal T2-FLAIR mismatch
icc(cbind(rater1_flair, rater2_flair),
    model = "twoway",
    type  = "agreement")

# CFA framing: identifiable for 2 raters only with equality constraints,
# i.e. equal loadings (l1) and equal residual variances (e1).
reliability_model <- '
  true_flair =~ l1*rater1_flair + l1*rater2_flair
  rater1_flair ~~ e1*rater1_flair
  rater2_flair ~~ e1*rater2_flair
'
fit <- cfa(reliability_model,
           ordered   = c("rater1_flair", "rater2_flair"),
           estimator = "WLSMV")
```

With ≥ 3 raters this becomes the more general congeneric reliability model and is closer to ICC under classical test theory. κ remains the right answer when raters are exchangeable and the goal is a single agreement scalar; CFA earns its keep when you want to partition rater bias from rater noise.

### 4. Latent-class question — *"Do these tumors form discrete imaging subtypes?"* (the non-circular test, *with caveats*)

This is arguably the most scientifically appropriate question post-WHO 2016: form classes from imaging alone, then ask post-hoc whether they align with molecular status.

**Important caveat.** LCA only escapes the *labeling* circularity (molecular labels aren't used to form classes). It does **not** escape the *cohort-selection* circularity: if the cohort itself was enriched for oligodendroglial-appearing cases (Lasocki explicitly states this), the latent classes will recover that enrichment, not a generalizable imaging-biology relationship. To be a true non-circular test, LCA needs an unselected cohort sampled across grades and histologies — the same prospective design listed earlier as a non-circularity requirement.

```r
library(poLCA)

# LCA on MRI features only — molecular labels not used in class formation
lca_model <- cbind(t2flair_cat,
                   calcification,
                   cortical_cat,
                   enhancement_cat) ~ 1

fit2 <- poLCA(lca_model, data = mri_data, nclass = 2)
fit3 <- poLCA(lca_model, data = mri_data, nclass = 3)
fit4 <- poLCA(lca_model, data = mri_data, nclass = 4)

# Then ask: do the latent imaging classes align with 1p/19q status?
# Alignment without using molecular labels = genuine imaging→molecular signal.
# No alignment = confirms imaging is detecting pre-selected histology.
```

If imaging classes recover molecular structure **without molecular labels being used in class formation**, that is the strongest possible evidence of a real imaging-biology relationship. If they don't, the circularity is confirmed.

### Which method fits which paper

| Method | Lasocki *AJNR* 2018 (n=69) | Yan *Lab Invest* 2022 (n=555) | Scientific value |
|---|---|---|---|
| Polychoric CFA | Marginal — n too small | Yes | Tests measurement structure |
| Path analysis / SEM with mediation | No — n too small | Yes | **Direct test of circularity** |
| Two-rater reliability CFA | **Best fit — improves on κ** | N/A (single reader for many features) | Separates measurement error from disagreement |
| Latent class analysis | Borderline | **Best fit — non-circular** | Recovers imaging structure without using molecular labels |

### The reframe

The shift this enables is from *"does imaging predict molecular status?"* (circular by construction post-2016) to *"does imaging independently recover molecular structure?"* (non-circular and falsifiable on an appropriately sampled cohort). Latent-variable methods — lavaan path analysis (the formal mediation-by-histology test) and `poLCA` (the imaging-only class-discovery test) — are well-suited to answer this *once the cohort design supports it*. On retrospectively pre-selected cohorts they cannot rescue the result; on unselected prospective cohorts they can give it real teeth.

## Related resources

- Rosseel Y. *lavaan: An R Package for Structural Equation Modeling.* J Stat Softw 2012; 48(2).
- Kline RB. *Principles and Practice of Structural Equation Modeling*, 4th ed.
- `lavaan` website: lavaan.ugent.be
