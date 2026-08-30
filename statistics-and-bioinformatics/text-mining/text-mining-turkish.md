---
type: Note
status: Developing
language: en
aliases:
  - "Text Mining Turkish"
order: 50
belongs_to: "[[Text Mining]]"
source_type: repository
---

# Text Mining Turkish

Turkish-language text-mining resources, and what they offer — or fail to offer — for pathology report text.

## Turkish NLP Suite

[Turkish NLP Suite](https://huggingface.co/turkish-nlp-suite) is a Hugging Face **organization, not a single repository**: 38 models and 24 datasets there, plus [20 repositories on GitHub](https://github.com/turkish-nlp-suite) (org created 2019-03-10). Effectively one maintainer, Duygu Altinok. spaCy models and most datasets are CC-BY-SA-4.0; the code repos are MIT. Figures read 2026-08-30.

**Verdict for report text: take the morphology, not the entities.** This is the most complete open Turkish NLP stack available, but every corpus in it is web, forum, e-commerce, movie-review, Wikipedia or Dergipark-academic text. There is no clinical or biomedical Turkish anywhere in the collection, and the entity scheme reflects that.

### The spaCy pipelines

`tr_core_news_trf`, `tr_core_news_md` and `tr_core_news_lg`, with word vectors shipped separately as `tr_vectors_web_md` / `tr_vectors_web_lg`. All three run tagger, morphologizer, trainable lemmatizer, parser and NER; `trf` sits on a transformer, `md`/`lg` on `tok2vec`. Figures below are from each model's `meta.json`, not the README.

| | `trf` | `md` | `lg` |
|---|---|---|---|
| NER F | 0.913 | 0.889 | 0.889 |
| XPOS accuracy | 0.917 | 0.914 | 0.912 |
| UPOS accuracy | 0.909 | 0.905 | 0.907 |
| Morphology (UFeats) | 0.915 | 0.889 | 0.891 |
| Lemma accuracy | 0.878 | 0.817 | 0.823 |
| UAS / LAS | 0.799 / 0.719 | 0.728 / 0.636 | 0.735 / 0.637 |

Training sources are UD Turkish BOUN, the org's own Turkish Wiki NER set, PANX/WikiANN, and dbmdz's cased Turkish BERT. `trf` carries no vectors at all (0 keys), which is why the vector packages exist as separate downloads.

**Morphology is the part worth having.** Agglutination is the real obstacle in Turkish report text, and the per-feature scores are strong: Case F 0.954, Number 0.976, Person 0.977, Tense 0.960, Polarity 0.969. Dependency parsing is the weak end — LAS 0.719 at best, and 0.636 on the CPU pipelines.

**One per-feature score matters more here than the headline.** `Abbr` scores precision, recall and F of **0.000 — in all three pipelines**. Abbreviations saturate pathology reports, so the feature most likely to be needed is the one feature that is not learned at all.

### The models are older than their timestamps

`meta.json` pins `spacy_version` to `>=3.4.2,<3.5.0` in all three pipelines. spaCy 3.4.2 was released 2022-10-20 and 3.5.0 on 2023-01-20, so the pin excludes every spaCy from January 2023 onward; the current release is 3.8.16 (2026-08-24, per PyPI). Whether a newer spaCy hard-refuses these pipelines or merely warns and loads them is `[unverified]` — not tested here, and the `trf` pipeline's `spacy-transformers` path need not behave like the CPU ones.

The Hugging Face `lastModified` of 2025-12-19 invites the opposite conclusion, so it is worth reading the commit log instead. Across 11 commits on `tr_core_news_trf`, the pipeline binaries last changed on **2022-11-01** ("Update spaCy pipeline") and `meta.json` on 2023-01-15. Everything after that is documentation and packaging: a setuptools-driven wheel rename (2024-08-12), a wheel re-upload (2025-11-06), and a tagset documentation edit (2025-12-19). The model is a 2022 artefact wearing a 2025 date.

A smaller trap from the same rename: the published wheel is `tr_core_news_trf-1.0-py3-none-any.whl` while `meta.json` reports version `3.4.2`. The commit titles explain the mismatch as a setuptools compatibility fix, but a versioned install URL guessed from the pipeline version will 404.

### The entity scheme is the blocking gap

The NER head predicts 20 labels: `CARDINAL`, `DATE`, `EVENT`, `FAC`, `GPE`, `LANGUAGE`, `LAW`, `LOC`, `MONEY`, `NORP`, `ORDINAL`, `ORG`, `PER`, `PERCENT`, `PERSON`, `PRODUCT`, `QUANTITY`, `TIME`, `TITLE`, `WORK_OF_ART`.

That is the OntoNotes newswire scheme. Not one label names a diagnosis, an anatomical site, a specimen type, a procedure, a grade or a stage — so a pathology-report pipeline gets nothing from it beyond generic numerics, and the entity layer would have to be trained from scratch on annotated Turkish clinical text that this collection does not contain.

Note also that both `PER` and `PERSON` appear in the model's scheme, while [turkish-wikiNER](https://huggingface.co/datasets/turkish-nlp-suite/turkish-wikiNER) ships only `PERSON`. The duplication is consistent with merging the org's own Wikipedia set with PANX/WikiANN, but no card states this — the reading is mine, not the authors'.

### Corpora and benchmarks

- **[BellaTurca](https://huggingface.co/datasets/turkish-nlp-suite/BellaTurca)** — 105.2M instances, 246.5 GB, 30.89B words, assembled from five subcorpora that each have their own repo: AkademikDerlem (Dergipark theses and papers, 3.8 GB), OzenliDerlem (curated web, 4.6 GB), ForumSohbetleri (forums, 13.41 GB), temiz-OSCAR (48 GB) and temiz-mC4 (122 GB), the last two deduplicated within and across each other. The card claims it as the first large-scale Turkish corpus collection. A book corpus was in the original build and was **removed for containing copyrighted material** — stated plainly on the card, which is more disclosure than most corpora of this size offer. Published as Altinok, "Bella Turca: A Large-Scale Dataset of Diverse Text Sources for Turkish Language Modeling", *TSD 2024*, LNCS, pp. 196–213 ([10.1007/978-3-031-70563-2_16](https://doi.org/10.1007/978-3-031-70563-2_16)).
- **[TrGLUE](https://huggingface.co/datasets/turkish-nlp-suite/TrGLUE)** — a GLUE-shaped NLU benchmark: TrCOLA (grammatical acceptability from Turkish linguistics textbooks), TrSST-2, TrMRPC, TrSTS-B, TrQQP. Billed as the first *non-translate* Turkish NLU benchmark, though by the card's own description TrSTS-B is a revised translation, so the label does not hold uniformly across the tasks.
- **[SentiTurca](https://huggingface.co/datasets/turkish-nlp-suite/SentiTurca)** — sentiment across three domains: e-commerce 103K (5 labels), movie reviews 78K (2 labels), and Turkish Hate Map 52K (4 labels), the last scraped from Ekşi Sözlük.

Reproducible benchmarking code for the treebank and NER evaluations is in the org's `Treebank-Benchmarking` and `NER-Benchmarking` repos (MIT).

### The subword study is the transferable idea

"Optimal Turkish Subword Strategies at Scale: Systematic Evaluation of Data, Vocabulary, Morphology Interplay" (Altinok, [arXiv:2602.06942](https://arxiv.org/abs/2602.06942), 2026) trains WordPiece tokenizers at 2K/5K/10K/20K/32K/52K/128K vocabulary across three corpus sizes and a BERT model per cell, at matched budget. Those artefacts account for 33 of the 38 models in the org; the grid is complete for 20K–128K and partial below that. The README names the middle corpus "Medium" while the published repos call it `books`.

What makes it worth citing here rather than just noting: the study's diagnostics are **fertility and single-token rate per tokenizer** — precisely the measurements that tell you whether a tokenizer shatters agglutinated Turkish terms into fragments. That question transfers directly to Turkish report text and to any decision about which base model to fine-tune on it, even though none of the paper's corpora are clinical.

### What is missing

An annotated Turkish clinical or pathology corpus. Nothing in this collection supplies one, and that — not model quality — is what stands between these tools and Turkish report mining.

### Unresolved

- The org overview reports one Space, but the Spaces API returned none; not reconciled.
- The org API reports 2 papers. Two publications are identified above from the cards and repos, but whether those are the two the API counts is `[unverified]`.
- Hugging Face download counts are a rolling window rather than lifetime totals, so they are deliberately not used above as evidence of uptake.

Derived from: the Hugging Face org, models and datasets APIs; `meta.json` and README for `tr_core_news_trf`/`md`/`lg`; the `tr_core_news_trf` commit log; the BellaTurca, TrGLUE, SentiTurca and turkish-wikiNER dataset cards; the GitHub org repo list and `Turkish-subwords-research` README; PyPI spaCy release data; Crossref. Read 2026-08-30.
