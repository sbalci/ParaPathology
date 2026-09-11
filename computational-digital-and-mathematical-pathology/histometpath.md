---
type: Tool
status: Developing
language: en
aliases:
  - "HistoMetPath"
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Image Analysis]]"
  - "[[Weakly supervised MIL histopathological tumor segmentation]]"
repo: https://github.com/drehsangharib/HistoMetPath
source_type: repository
external: true
adopted: false
engagement: archived
upstream: "active — 56 commits since 2026-05-04, last push 2026-08-29, model-v2 development frozen the same day"
license: MIT
last_reviewed: 2026-08-30
publish: false
---

# HistoMetPath

A single-author MIL framework for breast-cancer metastasis detection whose modelling results are far too small to use, but whose **evaluation-governance code — a held-out test set that can be opened exactly once, enforced by checksums and a consumable execution counter — is a pattern worth borrowing.**

- Source: [drehsangharib/HistoMetPath](https://github.com/drehsangharib/HistoMetPath) (MIT)
- Release: [development-release-2251265](https://github.com/drehsangharib/HistoMetPath/releases/tag/development-release-2251265), source-only prerelease, 2026-08-25

## Purpose

**Verdict: do not adopt as a modelling tool. Read it for the governance code.**

The models are development artefacts trained on 30 slides. The frozen champion reaches AUROC 0.6818 and balanced accuracy 0.6483; all six variants the author compared land between 0.591 and 0.682. No external cohort has ever been run. The repository says all of this itself, repeatedly and without hedging — the model card leads with "small sample sizes, unstable slide-level predictions, poor calibration", and a scope document states that pseudo-slide results "DO NOT represent native whole-slide image performance". That honesty is the reason it is worth an hour rather than a glance.

| Need | Use instead |
|---|---|
| A MIL pipeline to train with | An established codebase (CLAM and its descendants). These models exist to be compared against each other on 30 slides, not to be reused. |
| WSI tiling and tissue masking | QuPath, or the tiling inside a pipeline you already run — see [Image Analysis](image-analysis.md). The samplers here are CAMELYON16-specific and refuse any split but train/validation by design. |
| A metastasis-detection model | Nothing here is validated for anything. |
| **A code pattern that stops a held-out test set being reopened** | **This.** Nothing else in this vault does it, and it is the part that transfers to any project. |

## Data used

Two datasets, plus a third that has been prepared and never used.

- **PatchCamelyon (PCAM)** patches grouped into synthetic "pseudo-slides" — the early development substrate. The repository is explicit that these are patch groupings, not slides.
- **CAMELYON16**, a 42-slide subset: **30 training, 6 validation, 6 fresh test**, class-balanced 15/15 and 3/3, with the balance asserted in code rather than assumed. Twenty-one of the 42 are tumour slides.
- **CAMELYON17**, a 20-slide pilot — 10 normal and 10 tumour, two per class from each of five centres, one slide per patient — sealed before inference and **never executed**. The execution count in the committed configuration is 0 of 1.

**Magnification is handled properly, which is rarer than it should be.** The pipeline reads each slide's own `openslide.mpp-x/y`, then picks the pyramid level whose effective µm/px is closest *in log space* to a configured `target_mpp: 0.5` (≈20×). It records the selected level, its downsample and the resulting effective mpp in the manifest. That is a reproducible magnification choice, not a hardcoded level index — the failure mode where "level 2" means different things on two scanners cannot happen here. Tiles are 256 px at stride 256 (non-overlapping), tissue-masked at intensity threshold 220 with a minimum tissue fraction of 0.25, and capped at 300 tiles per slide.

**Validation strategy:** 20 repeated five-fold outer cross-validations over the 30 training slides for development estimates; a 6-slide validation set for model selection and threshold calibration; a 6-slide fresh test run once. **External validation: none.** The CAMELYON17 pilot exists as sealed configuration and reviewed code only.

## Methods

A frozen ResNet-18 trained on PCAM supplies 512-dimensional tile embeddings. Two annotation-independent samplers choose which 300 tiles to embed:

- **Spatial v2** — density-aware. It scans the whole selected level, guarantees at least one tile per occupied cell of a 10×10 spatial grid, allocates the remaining budget across cells by candidate density using the largest-remainder method, and then picks deterministically by farthest-point selection within each cell.
- **Spatial v3** — morphology-aware. Same budget allocation, but each candidate tile also carries a 12-element descriptor (RGB mean and standard deviation, HSV saturation mean and standard deviation, edge-filter mean and standard deviation, optical-density mean and standard deviation). Farthest-point selection then runs jointly over normalised spatial coordinates *and* normalised morphology, with separate weights for each.

Slide-level aggregation is deliberately plain: mean pooling of the 300 embeddings into logistic regression is the frozen primary, with a dual-view variant concatenating the v2 and v3 means (1024 features) as secondary. Mean pooling, max pooling and a five-seed attention-MIL ensemble are all implemented and compared; attention won selection on the CAMELYON16 branch, mean-pooling logistic regression on the later dual-view branch. Thresholds are fitted on validation only.

The freeze document rejects, on measured evidence, larger bags, component-aware summaries, weakly supervised tile ranking and annotation-supervised lesion-evidence pooling — and then instructs the author to stop searching pooling variants on the same 30 slides. That is an unusually disciplined way to end a project.

## What the code shows

Reading the source rather than trusting the 42 governance documents is what produced the findings below.

**The one-time test gate is real, but the enforcement is in the loader, not in the receipt it checks.** The development-lock script skips every manifest row whose split is `test` *before* it constructs a path, so test embeddings are never opened; it then asserts the 30/6 slide counts and the 15/15 and 3/3 class balance, raising otherwise. Those assertions are the actual guarantee. The two fields that the later final-test gate verifies — `development_counts` and `test_boundary_status: "UNTOUCHED"` — are written as literal constants by that same script. Comparing them catches a hand-edited or swapped lock file; it cannot catch a run that loaded test data, because nothing measured that. The JSON is a receipt, not evidence.

**The overwrite refusal, by contrast, is checked at entry.** In the final-test evaluator the existence check on the result, prediction and lock files raises before gate verification and before any embedding is loaded. It is a genuine gate rather than a lock written after the fact. `refuse_overwrite` is `true` in the final-test configuration and `false` in the non-consequential embedding configuration — the protection is applied where it costs something.

**The strongest single line is in the samplers.** Both refuse to load their own configuration unless `"test"` appears in its `prohibited_splits` list — a structural guard that fails loudly, rather than an attestation written into a report.

**The docs contradict each other about whether the external run can ever fire, and only the code settles it.** One document states that `--execute` "always refuses… even when the explicit token is supplied". That is true of the older scaffold, whose execute branch ends in an unconditional raise. The newer execution engine, committed six days later, implements the path in full; its refusal is two booleans in a YAML file plus a token string. Both scripts and both documents are still in the tree, unamended. The refusal moved from *not implemented* to *configured off*, and the documentation does not say so.

**A failed external run still burns the one permitted execution — on purpose.** The lock is incremented and written to disk with an fsync *before* the encoder is built and before the first WSI is opened, and the exception handler seals the lock as `execution_failed_sealed` rather than rolling it back. A crash therefore consumes the pilot. That is the correct choice for a one-shot evaluation, because a retryable failure is a second look at the test set wearing a different name. It is the design decision most worth stealing.

Two smaller findings. **"Leakage-safe" is inherited, not enforced:** all three pseudo-slide builders chunk an index array within one split, and none groups patches by source WSI, so the claim reduces to "no bag mixes splits" — which is exactly what the code delivers. PCAM's published splits are themselves WSI-disjoint, so the guarantee holds, but it comes from the dataset and not from this module, while the docstring reads as though the module supplies it. `[unverified]` — the PCAM split's WSI-disjointness was not re-checked against a primary source here. The controlled builder does add a real assertion, tracking the used index set and raising on patch reuse. And **none of the evidence is in the repository**: `outputs/`, `embeddings/`, `logs/`, `checkpoints/` and the model binaries are gitignored, and the freeze document names an evidence archive on a local Windows drive whose hashes "must remain outside Git". The governance code is public and auditable; the six-slide test result it protects is not.

## Why this matters here

The interesting question this repository answers is not "how do I detect metastases" — it answers **"how many times may I touch the held-out set, and can that be made mechanical?"** Every project eventually reopens its test set: to fix a bug, to add a variant, to answer a reviewer. The usual defence is a promise in a protocol document. Here the defence is a filesystem lock, a checksum chain and a counter that is spent before the first pixel is read.

Three pieces transfer to any project in this vault, independent of the MIL machinery:

1. **Refuse the test split at config load.** One line, fails loudly, cannot be forgotten by a tired person at midnight.
2. **Consume the execution before the work, not after.** If the run crashes, the attempt is spent. This is uncomfortable and it is the point.
3. **Refuse to overwrite a result at entry.** Checked before anything expensive runs, so the refusal costs nothing and the protection is absolute.

The caution that travels with it is equally useful: a governance artefact written by the same script it certifies is an attestation, not a measurement. When the receipt and the enforcement live in one codebase, only the enforcement counts.

Related: the MIL formulation itself, and a worked example of slide-level labels obtained for free, is in [Weakly supervised MIL histopathological tumor segmentation](weakly-supervised-mil-histopathological-tumor-segmentation.md) — that paper's released code splits case-wise, which is the leakage question this repository answers by delegation instead.

## Current state / open questions

Development frozen 2026-08-29 at the author's own decision, with a documented instruction not to resume without preregistering a new hypothesis. Fifty-six commits since 2026-05-04, all by one person, `Ehsan Gharib` — no affiliation is declared anywhere in the repository, the citation file, or the release, so who is behind it is `[unverified]`. One star, no forks, no open issues, CI green on Python 3.11 with 69 test functions across 46 test files, matching the README's stated count. One source-only prerelease with a SHA-256 sidecar and an audit JSON.

- **Will the CAMELYON17 pilot ever run?** It is the only thing that would turn this from a governance demonstration into a result. Everything is staged; two booleans and a token stand between the current state and a single irreversible execution.
- **The stale document should be reconciled.** The "always refuses" text and the fully-implemented engine coexist in `docs/`, and a reader who trusts the folder rather than the code gets the safety property wrong. Worth an issue if anyone engages with the author.
- **Nothing here has been tested on H&E outside CAMELYON.** The samplers assume a CAMELYON16 manifest shape, so borrowing the *pattern* is realistic and borrowing the *code* is not.

Derived from: repository cloned at full depth and read at source level 2026-08-30 — `analysis/build_pseudo_slides.py` and its `_safe` and `_controlled` variants, `analysis/lock_camelyon16_development_model.py`, `analysis/evaluate_camelyon16_fresh_test_once.py`, `analysis/run_frozen_external_evaluation_once.py`, `analysis/run_frozen_external_execution_engine.py`, `core/wsi/run_camelyon16_spatial_sampler_v2.py`, `core/wsi/run_camelyon16_spatial_sampler_v3.py`, `core/wsi/run_camelyon16_batch_pipeline.py`, `datasets/pcam_dataset.py`, the `configs/wsi/` and `configs/evaluation/` YAML contracts, `README.md`, `CHANGELOG.md`, `CITATION.cff`, `LICENSE`, `.gitignore`, `.github/workflows/ci.yml`, 16 of the 42 files in `docs/` (the model-v2 freeze, the scope and model-card and development-decision documents, the seven CAMELYON16 governance documents, and four of the eight FROZEN_EXTERNAL ones), and the GitHub API for currency and contributors.
