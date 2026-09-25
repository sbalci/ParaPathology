---
type: Clipping
status: Evergreen
language: en
title: "Pangram: AI Content Detection Platform and Pangram 4 Classifier"
source: "https://www.pangram.com/"
source_type: page
author:
  - "[[Pangram Labs]]"
  - "[[Max Spero]]"
  - "[[Bradley Emi]]"
  - "[[Ben Glickenhaus]]"
  - "[[Katherine Thai]]"
  - "[[Jenna Russell]]"
  - "[[Elyas Masrour]]"
  - "[[Yue Han]]"
published: 2026-07-29
created: 2026-09-23
description: "A comprehensive synthesis of Pangram (Pangram Labs), the enterprise AI content and text detection platform, its foundational classifier architecture, and the Pangram 4 Technical Report (arXiv:2607.27183). Covers multi-class discrimination (human-written, AI-assisted, and AI-generated), ultra-low false positive rate (0.0041%), tokenwise and per-segment attribution, robustness to paraphrase engines and humanizers, developer API and Python SDK (pangram-sdk), and critical implications for academic publishing, scientific integrity, medical writing, and clinical documentation."
tags:
  - "clippings"
  - "ai-detection"
  - "natural-language-processing"
  - "large-language-models"
  - "scientific-integrity"
  - "plagiarism"
  - "academic-publishing"
  - "pangram"
  - "machine-learning"
order: 154
belongs_to: "[[Clippings]]"
related_to:
  - "[[Plagiarism]]"
  - "[[Text Editing]]"
  - "[[Reproducibility]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[The pathology report as a boundary object: From clinical communication to computational representation]]"
  - "[[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]]"
  - "[[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth]]"
---
# Pangram: AI Content Detection Platform and Pangram 4 Classifier

**Pangram Labs** (Brooklyn, NY, USA; Founded 2023 by Max Spero and Bradley Emi)
Platform: [pangram.com](https://www.pangram.com) | Python SDK: [pypi.org/project/pangram-sdk](https://pypi.org/project/pangram-sdk/) | GitHub: [pangramlabs/pangram-sdk
](https://github.com/pangramlabs/pangram-sdk)Technical Reports:

- *Pangram 4 Technical Report* (arXiv: [2607.27183](https://arxiv.org/abs/2607.27183), 29 July 2026) by Ben Glickenhaus, Katherine Thai, Jenna Russell, Elyas Masrour, Yue Han, Max Spero, Bradley Emi
- *Technical Report on the Pangram AI-Generated Text Classifier* (arXiv: [2402.14873](https://arxiv.org/abs/2402.14873), February 2024)

---

## Executive Summary

The rapid diffusion of frontier Large Language Models (LLMs)—including OpenAI's GPT-4o and o-series reasoning models, Anthropic's Claude 3.5/3.7, Google's Gemini 1.5/2.0, Meta's Llama 3 series, and DeepSeek V3/R1—has precipitated a profound crisis of authenticity across academic research, peer review, education, and clinical communication. Modern LLMs generate syntactically flawless, contextually plausible text that completely circumvents traditional n-gram matching and verbatim plagiarism engines (such as Turnitin, iThenticate, or standard string search).

Early heuristics-based AI detectors (e.g., measuring scalar perplexity, burstiness, or raw entropy) suffered from severe fatal flaws:

1. **Unacceptable False Positive Rates (FPR):** Incorrectly penalizing human writers, particularly non-native English speakers (ESL) whose stylistic patterns mimic lower-perplexity synthetic corpora.
2. **Vulnerability to Paraphrasing and "Humanization":** Easily bypassed by commercial adversarial tools (QuillBot, Undetectable AI, WriteHuman, StealthGPT) that swap synonyms and perturb sentence lengths.
3. **Binary Coarseness:** Forcing documents into an all-or-nothing binary classification, failing to capture modern collaborative workflows where a human author drafts an idea and uses an LLM for formatting, copy-editing, or grammar polishing.

**Pangram** (developed by **Pangram Labs**) is a deep-learning-based content authenticity and AI text classification ecosystem designed to resolve these challenges. Its flagship architecture, **Pangram 4** (introduced in July 2026; [arXiv:2607.27183](https://arxiv.org/abs/2607.27183)), establishes an empirical benchmark for production detection:

- **Ultra-Low False Positive Rate:** Achieves an FPR of **0.0041%** (approximately 1 false positive per 24,390 human documents), establishing an empirical standard for high-stakes decision-making.
- **High Sensitivity:** Maintains a False Negative Rate (FNR) of **0.3396%** (compared to 1.99% in Pangram 3) with an overall **AUROC of 0.9916** on English long-form prose.
- **Granular 3-Tier Classification:** Classifies text into **Human-Written**, **AI-Assisted**, and **AI-Generated**, with character- and token-level span attribution.
- **Adversarial & Humanizer Robustness:** Retains **98.83% detection accuracy** across 13 major commercial text humanizers.
- **Multilingual Scope:** Calibrated across 20+ languages including English, Arabic, Chinese, French, German, Italian, Japanese, Portuguese, Russian, Spanish, and Turkish.
- **Multi-Modal Extension:** Integrates a research preview for **AI Image Detection**, identifying synthetic visuals from diffusion and autoregressive generators (Flux.1, Midjourney, Stable Diffusion 3, DALL-E 3).

---

## Architectural Blueprint & Detection Mechanics

```typescript
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                PANGRAM 4 DETECTION PIPELINE                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

 [ Input Document (Text / PDF / Word / HTML) ]
                      │
                      ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 1. TEXT NORMALIZATION & PREPROCESSING                                                       │
 │    • Zero-width character stripping, homoglyph normalization, encoding cleanup             │
 │    • Language detection & length validation (optimal: ≥50 words)                            │
 │    • Boundary-preserving semantic chunking & sentence tokenization                          │
 └──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                │ Clean token stream
                                                ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 2. DEEP TRANSFORMER FEATURE EXTRACTOR (6× Parameter Scale-Up vs. Pangram 3)                 │
 │    • Bidirectional multi-layer transformer backbone (Mixture-of-Experts routing)           │
 │    • Captures long-range statistical syntax, stylistic cadence, and token-transition priors│
 │    • Active-learning hard negative mining (adversarial prompts, reasoning traces, ESL text) │
 └──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                │ High-dimensional contextual embeddings
                                                ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 3. DUAL-BRANCH INFERENCE & ATTRIBUTION ENGINE                                               │
 │    ├── A. DOCUMENT-LEVEL CLASSIFIER:                                                        │
 │    │      • Calibrated probability score: P(AI), P(Assisted), P(Human)                      │
 │    │      • Conservative threshold gating (tuned for FPR ≤ 0.0041%)                         │
 │    │                                                                                        │
 │    └── B. "REPEAT2" TOKENWISE & SPAN BOUNDARY DETECTOR:                                     │
 │           • Sliding-window per-token scoring with dense boundary refinement                │
 │           • Identifies interleaved AI edits within predominantly human writing             │
 └──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                                │
                                                ▼
 ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 │ 4. STRUCTURED PREDICTION & VERIFIABLE AUDIT REPORT                                          │
 │    • Overall Label: "Human-Written" | "AI-Assisted" | "AI-Generated"                       │
 │    • Document AI Percentage (0.0% – 100.0%)                                                 │
 │    • Color-Coded Heatmap: green (human), yellow (AI-edited/assisted), orange/red (AI)       │
 └─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Architectural Principles

1. **Classifying Statistical Signatures, Not Surface Keywords:**  

LLMs generate text by sampling from conditional probability distributions over token vocabularies. Regardless of prompt temperature or system persona, autoregressive generators leave characteristic artifacts: specific distributional uniformity, predictable syntactic transitions, and an absence of genuine idiosyncrasy. Rather than searching for "telltale AI phrases" (e.g., *"delve"*, *"testament"*, *"tapestry"*), Pangram's deep encoder models the latent probability manifolds of human vs. synthetic language across diverse registers.

1. **The "Repeat2" Boundary Detection Algorithm:**  

In collaborative writing, authors frequently compose an original draft and instruct an LLM to rewrite a single paragraph, add a transition, or rephrase a conclusion. Early classifiers either missed localized edits or flagged the entire manuscript. The *Repeat2* mechanism operates tokenwise across overlapping contextual windows, calculating differential likelihood ratios to localize precise edit boundaries without bleeding false positives into surrounding human prose.

1. **Multi-Model Benchmark Validation:**  

Pangram is continuously benchmarked against 26+ active frontier model families (OpenAI GPT-4o/o1/o3/GPT-5; Anthropic Claude 3.5 Sonnet / 3.7 / Opus; Google Gemini 1.5 Pro / Flash / 2.0; Meta Llama 3/3.1/3.3; Mistral Large; DeepSeek V3/R1; xAI Grok). In internal evaluations on millions of synthetic and natural documents, Pangram 4 detects synthetic samples across these families with **99.7% accuracy**.

---

## Technical Performance & Empirical Benchmarks

### 1. Accuracy vs. False Positive Trade-Off (English Prose)

The table below contrasts Pangram's performance progression from Pangram 3 to Pangram 4 based on the July 2026 technical report ([arXiv:2607.27183](https://arxiv.org/abs/2607.27183)):

| Metric | Pangram 3.3 | Pangram 4 (Ours) | Absolute Delta / Improvement |
| --- | --- | --- | --- |
| **AUROC** | 0.9842 | **0.9916** | $+0.0074$ |
| **False Positive Rate (FPR)** | 0.012% (~1 in 8,300) | **0.0041% (~1 in 24,390)** | $2.9\times$ **reduction in false accusations** |
| **False Negative Rate (FNR)** | 1.99% | **0.3396%** | $5.8\times$ **reduction in missed detections** |
| **Humanizer Defense Accuracy** | 87.4% | **98.83%** | $+11.43\\%$ across 13 tools |
| **Model Size / Parameter Capacity** | Baseline ($1\times$) | $6\times$ **Parameter Scale** | Enhanced expressive representation |
| **Output Granularity** | Binary + Windows | **Human / Assisted / AI** | Discrete 3-tier semantic labeling |

### 2. Resistance to Commercial "Humanizers" and Paraphrase Engines

Commercial humanization engines attempt to evade detection through intentional perturbations: inserting orthographic noise, swapping rare synonyms, forcing irregular sentence structures, and round-trip translation. On benchmark testing against 13 leading evasion services:

```
[ Pure AI Text (e.g. GPT-4o) ] ──────────► Passed through Commercial Humanizers
                                                        │
                 ┌──────────────────────────────────────┴──────────────────────────────────────┐
                 ▼                                                                             ▼
       Legacy AI Detectors                                                            Pangram 4 Classifier
    (Accuracy drops to 20% - 45%)                                                  (Maintains 98.83% Accuracy)
  (Vulnerable to perturbed syntax)                                              (Invariant to superficial noise)
```

Pangram's training corpus includes active adversarial data mining, training the MoE encoder to remain invariant to superficial noise while tracking core syntactic entropy and semantic coherence.

---

## Multi-Modal Detection: AI-Generated Images

In addition to text, Pangram Labs has deployed a research preview for **AI Image Detection** on [pangram.com](https://www.pangram.com):

- **Target Modalities:** Identifies images generated by latent diffusion models (Stable Diffusion XL, SD3, Flux.1), cascaded diffusion architectures (Midjourney v5/v6, Imagen 3), and generative adversarial networks (GANs).
- **Artifact Analysis:** Evaluates spatial frequency distributions, Fourier transform power spectra, unnatural lighting consistency, anatomical micro-structures, and latent noise residual patterns.
- **Biomedical Relevance:** High utility for scientific publishing integrity, screening Western blot manipulations, synthetic micrograph fabrications, and simulated histopathology patches (e.g., stress-testing synthetic pipelines like [[HistoGen: Histopathology Cell Nuclei Image Generation Tool]]).

---

## Developer Integration: Python SDK & REST API

Pangram provides a native Python SDK (`pangram-sdk` on PyPI) and REST API for high-throughput batch auditing.

### Installation

```bash
pip install --upgrade pangram-sdk
```

### Self-Contained Python Inference Example

```python
import os
import time
from pangram import Pangram

# Initialize client using environment variable PANGRAM_API_KEY
client = Pangram(api_key=os.environ.get("PANGRAM_API_KEY"))

text_to_audit = """
Histopathological evaluation was performed on formalin-fixed paraffin-embedded 
sections stained with haematoxylin and eosin. The neoplastic proliferation 
demonstrated marked nuclear pleomorphism, hyperchromasia, and an infiltrative 
cribriform glandular architecture invading into the deep muscularis propria.
"""

# Submit asynchronous text classification task
task = client.text.create_task(
    text=text_to_audit,
    model="pangram-4"  # Defaulting to Pangram 4
)

print(f"Task submitted with ID: {task.id}")

# Poll for completion
while True:
    status = client.text.get_task(task.id)
    if status.status in ("COMPLETED", "FAILED"):
        break
    time.sleep(0.5)

if status.status == "COMPLETED":
    result = status.result
    print(f"Prediction: {result.label}")              # e.g., 'human', 'ai_assisted', 'ai_generated'
    print(f"AI Probability: {result.ai_score:.4f}")   # 0.0 to 1.0
    print(f"Assistance Score: {result.assisted_score:.4f}")
    
    # Inspect fine-grained segment predictions
    print("\nSegment Breakdown:")
    for segment in result.segments:
        print(f"[{segment.label.upper()}] ({segment.start}:{segment.end}): {segment.text.strip()}")
else:
    print(f"Audit failed: {status.error}")
```

### Ecosystem Integrations

- **Learning Management Systems (LMS):** Direct LTI integrations for Canvas LMS, Blackboard, and Google Classroom.
- **Browser Extensions:** Dedicated Chrome and Firefox add-ons allowing instantaneous one-click audits across web forms, Google Docs, and social feeds.
- **Enterprise Workplace:** Native Gmail integration and webhooks for publishing workflow automation.

---

## Implications for Medicine, Pathology & Scientific Integrity

### 1. Combatting Synthetic Paper Mills & Fabricated Research

The rise of generative AI has fueled automated "paper mills" producing entirely fabricated scientific literature, complete with convincing case reports, synthetic patient cohorts, and plausible histopathological narratives.

- Pangram serves as an automated first-line triage filter for medical journal editorial offices and peer-review portals.
- Screens submitted manuscripts for uncredited AI drafting, hallucinated citations, and synthetic discussion sections before peer review.

### 2. Clinical Documentation & Boundary Objects

In [[The pathology report as a boundary object: From clinical communication to computational representation]], Dr. Shuoshuo Wang emphasizes that pathology reports are delicate boundary objects requiring precise semantic grounding.

- When pathologists or residents utilize LLMs to format synoptic surgical reports, distinguish between:
  - **Legitimate Formatting Assistance:** Correcting grammar, standardizing synoptic formatting, or expanding acronyms.
  - **Illegitimate Narrative Fabrication:** Permitting an LLM to generate diagnostic impressions or interpolate unobserved microscopic findings.
- Pangram’s per-segment attribution enables institutional auditing: verifying that diagnostic syntheses remain human-authored while administrative scaffolding may be computationally assisted.

### 3. Protecting Non-Native English Researchers (ESL Equity)

A major ethical risk of legacy AI detection is the disproportionate flagging of non-native English writers whose formal, repetitive phrasing mimics low-entropy LLM text.

- Pangram 4’s low false positive rate (0.0041%) and training on diverse international scientific corpora significantly minimize wrongful accusations.
- Distinguishes benign language editing (e.g., using an LLM to refine spelling, syntax, or phrasing) from substantive intellectual generation of scientific hypotheses.

### 4. Algorithmic Due Process & The "Gold Standard Paradox"

As detailed in [[The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth]] and [[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]]:

- **No Detector is an Infallible Judge:** Despite an AUROC of 0.9916 and FPR of 0.0041%, statistical classifiers cannot establish legal or moral culpability in isolation.
- **Mandatory Human-in-the-Loop Review:** AI detector output must be treated as probabilistic evidentiary indicators, never as autonomous punitive triggers. Institutions must preserve editorial recourse, student defense, and expert human adjudication.

---

## Comparative Matrix: Pangram vs. Alternative Detection Approaches

| Feature / Dimension | Pangram 4 | Turnitin AI Writing Detector | GPTZero | Open-Source Perplexity (e.g. Binoculars) |
| --- | --- | --- | --- | --- |
| **Model Architecture** | Deep Transformer MoE Classifier | Proprietary Transformer | Ensemble Transformer | Perplexity / Cross-Perplexity Ratio |
| **Document FPR** | **0.0041% (1 in ~24,000)** | ~1.0% (1 in 100) | ~1.0% – 2.0% | Highly variable ($>3.0\\%$) |
| **Classification Tiers** | **Human / AI-Assisted / AI** | Binary (AI % score) | Binary + Sentence highlight | Continuous metric threshold |
| **Paraphrase / Humanizer Robustness** | **98.83%** | Moderate (vulnerable to QuillBot) | Moderate | Very Low (collapses upon synonym swap) |
| **Reasoning Model Detection (o1/o3/R1)** | **Yes (calibrated on traces)** | Variable | Partial | Low |
| **Multilingual Support** | **20+ languages** | English only | Primarily English | Multilingual if base model is |
| **Image Detection** | **Yes (Research Preview)** | No | No | No |
| **Developer API & Python SDK** | **Yes (**`pangram-sdk`**)** | Enterprise LTI only | Yes | Self-hosted code |

---

## Related Notes & References

- **Scientific Integrity & Writing:** [[Plagiarism]], [[Text Editing]], [[Authorship]], [[Reproducibility]], [[Selecting a Journal]]
- **AI Ethics & Cognitive Oversight:** [[What AI Can and Cannot Do in Pathology]], [[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]], [[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]], [[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]
- **Representational Theory & Quality:** [[The pathology report as a boundary object: From clinical communication to computational representation]], [[The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth]], [[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]
- **Computational Tools & Generative AI:** [[askLLM]], [[HistoGen: Histopathology Cell Nuclei Image Generation Tool]], [[Micro-Manager]]
