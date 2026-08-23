---
type: Clipping
status: Evergreen
language: en
title: "Pathology-CoT: learning visual chain-of-thought agents from expert whole-slide image diagnosis behaviour"
source: "https://doi.org/10.1038/s41551-026-01739-y"
author:
  - "[[Sheng Wang]]"
  - "[[Ruiming Wu]]"
  - "[[Charles Herndon]]"
  - "[[Songhao Li]]"
  - "[[Yihang Liu]]"
  - "[[Shunsuke Koga]]"
  - "[[Xiaowei Xu]]"
  - "[[David E. Elder]]"
  - "[[Jonathan Alex Miles]]"
  - "[[Annie Jin]]"
  - "[[Ikuko Hirai]]"
  - "[[Meaghan Dougher]]"
  - "[[Jeanne Shen]]"
  - "[[Zhi Huang]]"
published:
created: 2026-08-18
description: "Diagnosing a whole-slide image is an interactive, multistage process, yet practical agentic systems that navigate fields, adjust magnification and deliver explainable diagnoses remain lacking, largely because the tacit, experience-based viewing behaviour of expert pathologists is absent from model training data. Here we introduce Pathology-CoT, a framework that converts expert viewing chain-of-thought behaviour into scalable agent supervision through three contributions. First, an artificial intelligence session recorder unobtrusively captures routine navigation in standard whole-slide image viewers and converts raw logs into standardized behavioural commands and bounding boxes. Second, a human-in-the-loop review pipeline turns artificial intelligence-drafted rationales into paired 'where to look' and 'why it matters' supervision, enabling sixfold faster labelling. Third, using these data, we built Pathology-o3, a two-stage agent that proposes regions of interest and performs behaviour-guided reasoning. On gastrointestinal lymph node metastasis detection, Pathology-o3 outperformed state-of-the-art vision-language models, showed consistent gains across multiple vision-language model backbones and maintained strong performance on an independent external validation cohort."
tags:
  - "clippings"
belongs_to:
  - "[[Digital Pathology]]"
  - "[[Artificial Neural Networks]]"
---
## Summary

Diagnosing a whole-slide image (WSI) is an interactive, multistage process, yet practical agentic systems that navigate fields, adjust magnification and deliver explainable diagnoses remain lacking — largely because the tacit, experience-based viewing behaviour of expert pathologists is absent from model training data. **Pathology-CoT** is a framework that converts expert viewing chain-of-thought (CoT) behaviour into scalable agent supervision. Modern viewers already record navigation events ("digital exhaust"), but the raw stream is high-frequency, noisy and enormously long (an average of ~257 viewport events per slide; treating each as a 1,024x1,024 patch would exceed 500,000 visual tokens), so it cannot be used directly to train models. Pathology-CoT distils that stream into structured, model-ready supervision.

> This is a structured capture of the source PDF (Nature Biomedical Engineering). The abstract above is verbatim; the sections below faithfully digest the paper's own headings and reported figures. Full text, figures and methods are in the source article.

## Three contributions

1. **AI Session Recorder** — unobtrusively captures routine navigation in standard WSI viewers (the study used the open-source nuclei.io viewer at Stanford) and, inspired by a microscope's discrete objective lenses, discretizes the continuous event stream into a compact sequence of behavioural commands, each paired with a standardized region-of-interest (ROI) bounding box:
   - inspect: a broad, low/medium-magnification exploratory examination.
   - peek: a rapid, high-magnification look at cytological features.
2. **Human-in-the-loop review pipeline** — a VLM drafts a rationale ("why this region was examined, what key findings are present") for each expert-identified ROI; two pathologists verify or edit it. This yields paired *where to look* and *why it matters* supervision and a **sixfold improvement in labelling efficiency**.
3. **Pathology-o3** — a two-stage agent trained on the recorded behaviour: it first proposes ROIs, then performs behaviour-guided reasoning over them.

The resulting **Pathology-CoT dataset** is a growing multi-organ behavioural corpus (anchored in gastrointestinal and dermatopathology), capturing not only *where* experts look but *why* regions matter.

## Data engine and cohort

- Primary task: **N-staging of colorectal cancer (CRC) lymph node metastasis** — common and labour-intensive.
- Behavioural data from **eight pathologists** at Stanford Medicine (four attendings, two fellows, two residents): **25 cases, 137 slides, ~10.6 h of inspection**, with active navigation captured at ~10 Hz.
- Two-user timing study: verification took ~9.7-12.1 s per round; edits when needed took ~40.2-55.5 s — far cheaper than annotation from scratch (~85-106 s by typing).

## Main results

- **Pathology-o3 on GI lymph node metastasis:** 84.5% precision, 100.0% recall, 75.4% accuracy.
- **Next-best model (OpenAI o3):** 46.7% precision, 87.5% recall, 57.8% accuracy. VLMs without CoT ability performed near chance; e.g. GPT-4.1 reached high recall (91.7%) but low precision (42.3%), while Llama-4 showed higher precision (75.0%) but extremely low recall (6.2%).
- **Behavioural guidance across backbones:** adding the learned viewing policy increased precision by an average of **17.0%** and recall by **11.4%** (overall accuracy +8.2% for learned behaviour, +13.8% for real behaviour).
- **Independent external validation cohort:** maintained strong performance (**97.6% recall**).
- **Cross-domain transfer to dermatopathology** (retrained via the same data engine, despite the lymphoid to epithelial/connective-tissue domain shift): binary neoplasm detection 59.3% accuracy, 100.0% recall; fine-grained subtyping, e.g. basal cell carcinoma (BCC) recall 76.9%. OpenAI o3 was again the next-best performer.
- Ablation studies and a supervised MIL comparison (Pathology-o3 surpassing CONCH-ABMIL on challenging subtypes) support the value of behaviour-grounded supervision.

## Discussion and limitations

The rapid advance of VLMs shifts medical AI from task-specific classifiers toward reasoning-based agents; the primary hurdle has moved from model architecture to **data quality** — supervision aligned with the tacit, procedural knowledge of clinical experts. The paper frames the core problem as an **"analysis-navigation gap"**: VLMs are trained on static, preselected images and are adept at *analysing* regions, but are not trained on the dynamic, interactive data needed to learn the procedural skill of *navigating* a gigapixel slide to find evidence.

Stated limitations:

- **Single-WSI processing** — real diagnosis is often case-level, synthesizing multiple slides (levels, stains), H&E-vs-IHC comparison, and prior history; holistic, longitudinal synthesis remains future work.
- **AI anchoring bias** — AI-drafted rationales might subtly influence expert revisions in the semi-automated curation pipeline.
- **Not yet plug-and-play** — pathologist viewing logs vary across software platforms and scanner vendors (proprietary coordinates, zoom levels), so deploying the AI Session Recorder to new sites needs engineering to standardize data streams.

The authors release Pathology-CoT as a large-scale public dataset and position the open-source methodology as a blueprint for building similar "procedural behaviour" data engines in other clinical domains.

## Publication details

- **Journal:** Nature Biomedical Engineering (Article).
- **DOI:** [10.1038/s41551-026-01739-y](https://doi.org/10.1038/s41551-026-01739-y)
- **Received:** 13 October 2025. **Accepted:** 8 June 2026.
- **Equal contribution:** Sheng Wang and Ruiming Wu. **Corresponding author:** Zhi Huang (zhi.huang@pennmedicine.upenn.edu).
- **Affiliations:** University of Pennsylvania (Pathology & Laboratory Medicine; Biostatistics, Epidemiology & Informatics; Electrical & Systems Engineering); University of California, San Francisco (Pathology); Stanford University (Pathology).
