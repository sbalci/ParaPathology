---
type: Tool
status: Developing
language: en
title: "CRoMa"
aliases:
  - "CRoMa"
order: 140
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[A distributional robustness margin for pathology foundation models]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[Hugging Face Digital Pathology]]"
  - "[[Image Analysis]]"
  - "[[WSInfer]]"
repo: https://github.com/clemsgrs/croma
documentation: https://clemsgrs.github.io/croma/
paper: https://arxiv.org/abs/2607.25497
source_type: repository
external: true
adopted: false
engagement: active
upstream: "actively developed, read 2026-08-31 — v1.0.0 released 2026-08-20, last commit 2026-08-26, 132 commits and four releases since the repository was created 2026-02-21; 1 open issue, 4 stars"
license: Apache-2.0
last_reviewed: 2026-08-31
---

# CRoMa

Scores how much of a pathology foundation model's embedding geometry is organised by the *hospital* rather than by the tissue — a small, well-tested, pip-installable metrics library that takes embeddings you already have and never touches a slide. **Worth adopting for exactly one job: deciding which encoder to trust on multi-centre material before committing to it.**

- **Repository:** [clemsgrs/croma](https://github.com/clemsgrs/croma) — Apache-2.0
- **Documentation and live results:** [clemsgrs.github.io/croma](https://clemsgrs.github.io/croma/)
- **Paper:** Grisi C, van der Laak J, Litjens G. *A distributional robustness margin for pathology foundation models.* arXiv:2607.25497 — digested in [A distributional robustness margin for pathology foundation models](../Clippings/A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md), which is where the method, the formula and the findings live. This note is about the code.
- **PyPI:** `pip install croma` (v1.0.0)

Written at the Department of Pathology, Radboud UMC, by the authors of the paper.

## What it is

A metrics library, and deliberately nothing more. Its README states the boundary plainly — it *"never loads a model or reads an image — you bring the embeddings"* — and the dependency list backs that up: numpy, pandas, scikit-learn, tqdm. No torch, no image I/O, no model weights in the core install.

It implements five things:

| Symbol | What it scores | Origin |
|---|---|---|
| `RI` | Robustness Index — counts typed neighbours in a fixed-*k* neighbourhood, pooled | Re-implementation of the PathoROB metric |
| `MaRI` | Margin-aware RI — same design, distance-weighted | This project (as a control) |
| `CRoMa` | Per-sample signed margin between typed neighbour distances | This project (the headline metric) |
| `apd` | Average performance drop under a confounder-biased probe sweep | Vendored from PathoROB |
| `nipd` | Normalised integrated performance degradation | This project |

That it ships **its own competitor's metric** is the useful part. RI is the metric of [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md), the Nature Communications paper this work argues against; having all three in one library on one manifest is what makes the comparison cheap instead of a reimplementation project.

## Using it

The input contract is generic and is the reason this is reusable beyond its own paper: a feature array plus a **manifest** — one row per sample carrying a biological label, a `group_id` (the slide for tiles, the case for slides, used to exclude near-duplicates), and *any column you nominate as the confounder*. Centre, scanner, staining batch, fixation protocol — the code does not care which.

```
RI.compute(features, manifest, confounder_column=..., k_candidates=...)
MaRI.compute(...)
CRoMa.compute(...)
```

Supporting helpers: `croma.expand_features_to_manifest(...)`, `croma.alignment.build_embedding_source_manifest(...)`, and `croma.downstream` for `apd` / `nipd` / `probe_sweep`.

The reproduction pipeline lives under `scripts/` and is **not installed** with the package: `scripts/bench/extract_embeddings.py` to embed a tileset, `scripts/bench/benchmark.py` to score it, `scripts/bench/render.py` for figures, `scripts/repro/reproduce_faithful.py` to recompute the paper end to end. The `repro` extra pulls in torch, timm, transformers and huggingface_hub for that path.

## Four things that will trip you up

These are the reason this note exists; none of them is in the paper, and two of them break code silently.

1. **There is no CLI any more.** Versions 0.1.0 and 0.2.0 shipped a `croma` console script; it was removed outright in 0.3.0 on the grounds that nothing internal depended on it. As of v1.0.0 the library is Python-API only. Any tutorial or shell snippet invoking `croma ...` predates August 2026.
2. **`napd` became `nipd`, and it is not a rename.** The project's own decision record is explicit that the new name denotes *a different estimand rather than a drop-in rename* — the normalisation base changed from total baseline accuracy to above-chance headroom. An old import fails loudly; an old *number* compared against a new one fails quietly.
3. **The committed results are not the paper's results.** `results/PROVENANCE.json` records a roster of **26** — 25 pathology encoders plus the DINOv2-B natural-image control — against the paper's 20 plus control. Mascaret, Phaet and three RudolfV-2 variants have been added since, and **Mascaret now leads the cross-benchmark Pareto ranking**, a model the manuscript never evaluated. Those CSVs were exported at croma 0.3.0 on 2026-08-13. Reproducing the published tables means checking out an earlier tag, not `main`.
4. **Reuse carries a redistribution obligation.** `NOTICE` records that `src/croma/downstream/_pathorob.py` vendors three functions verbatim from PathoROB under BSD-3-Clause (copyright BIFOLD Pathomics). Apache-2.0 covers the rest, but anyone redistributing that module inherits the BSD notice requirement. This is a licence term, not a citation courtesy.

## The results site is the better front door

[clemsgrs.github.io/croma](https://clemsgrs.github.io/croma/) is a Sphinx site rebuilt from `main` on every push, and its Results section is genuinely interactive rather than a rendered table: a per-sample **distribution explorer** (200-bin histograms per encoder per cohort, with a drag-brush readout and two-encoder overlay), a **Pareto scatter** of median CRoMa against tail severity with the frontier ringed, and an **nIPD evidence browser** for the shortcut-susceptibility results. There are four per-cohort deep-dive pages (Camelyon, TCGA-4×4, Tolkach-ESCA, PCaBiop) and a "request a model evaluation" intake with separate tracks for public tile encoders, public slide encoders and private models.

The README carries only a static top-8 excerpt of the ranking. For the full 26-row panel, the site is the only place it exists.

## What you can and cannot reproduce

| Want to | Feasible? |
|---|---|
| Inspect the published per-model scores | **Yes, trivially** — `results/*.csv` are committed, with protocol provenance |
| Run RI / MaRI / CRoMa on *your own* embeddings | **Yes** — this is the library's actual job, and it is well tested |
| Re-download the three PathoROB tile cohorts | **Yes** — `scripts/prep/prepare_pathorob.py` pulls them from Hugging Face |
| Obtain PCaBiop | Manual — sourced from the Kaggle PANDA competition; the derived dataset is at [waticlems/pcabiop](https://huggingface.co/datasets/waticlems/pcabiop) |
| Re-run the full panel end to end | **No, by design** — no embeddings are distributed, so you must run every encoder yourself, several of them gated, at real GPU cost |

The project states this posture openly in its own decision records rather than implying a one-command reproduction it cannot deliver, which is worth more than a `Makefile` that breaks on first contact.

## Quality signals, read at source

`src/croma/metrics/croma.py` computes `croma = (mean_os - mean_so) / (mean_os + mean_so)` from scikit-learn cosine k-NN distances — the paper's Equation 10 exactly, with explicit per-sample tracking of *why* a value is missing (unresolved neighbour search versus zero-distance degeneracy) rather than a bare NaN. `tests/test_croma.py` builds literal toy embedding arrays and asserts exact metric values against hand-worked expectations: behavioural tests of the mathematics, not smoke tests. CI on `main` was green at the last run.

## Why this is worth having here

This vault's [Hugging Face Digital Pathology](hugging-face-digital-pathology.md) catalogue names the encoders worth reaching for; between them, this library and the two papers behind it supply the axis that catalogue was missing — **not how well an encoder recovers biology, but whether it recovers biology or the laboratory when the two compete.** Both are near-ceiling on the first; they differ enormously on the second.

The practical case for the code rather than the papers: the manifest contract is generic, the dependency footprint is four packages, and nothing leaves the machine. Running it against our own multi-centre cohorts — with `confounder_column` set to scanner or stain batch rather than centre — is a genuinely small piece of work, and it is the only way to learn whether a published robustness ranking survives contact with local material. Everything published so far is measured on public cohorts.

## Current state / open questions

- **Nothing here has been run on our own material.** `[unverified]` — the whole value proposition above is a hypothesis until it is.
- **Six months old, four stars, no forks, single-institution.** The code quality is well above what those numbers suggest, but there is no external-adoption signal yet, and no second implementation to check it against.
- **The metric is contested in the direction that flatters this repo.** CRoMa, RI and MaRI produce broadly the same model ranking (ρ ≈ 0.93–0.95); the argument for CRoMa is the per-sample distribution, not a different leaderboard. Adopting the library does not require accepting that CRoMa displaces RI — you get all three.
- **The moving leaderboard is a maintenance hazard for us, not just for them.** Any figure this vault quotes from the site needs the date attached, because the panel has already grown by five encoders since the manuscript and its current leader is a model the paper never saw.
- **Does the PCaBiop slide-level manifest ship separately from the aggregate scores?** `[unverified]` — not established from the files read.

Derived from: repository read at source level 2026-08-30 to 2026-08-31 — `LICENSE`, `NOTICE`, `pyproject.toml`, `README.md`, `CHANGELOG.md`, `CITATION.cff`, `src/croma/metrics/croma.py`, `src/croma/metrics/ri.py`, `tests/test_croma.py`, `docs/adr/0003-reproducibility-posture.md`, `docs/datasets.rst`, `docs/benchmarking.rst`, `scripts/repro/reproduce_faithful.py`, `scripts/prep/prepare_pathorob.py`, `results/PROVENANCE.json` and `results/*.csv`; the GitHub API for currency, releases and commit count; the PyPI JSON API for the published package; the rendered documentation site and its three widget data endpoints; and arXiv:2607.25497v4 in full.
