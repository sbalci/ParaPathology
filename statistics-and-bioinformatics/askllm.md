---
type: Tool
status: Developing
language: en
aliases:
  - "askLLM"
  - "askLLM jamovi module"
order: 10
belongs_to: "[[Jamovi]]"
related_to:
  - "[[Jamovi]]"
  - "[[Statistics and Bioinformatics]]"
  - "[[Data Visualization and R]]"
repo: https://github.com/SCgeeker/askLLM
documentation: https://scgeeker.github.io/stat-skills-tutorials/
url: https://github.com/SCgeeker/askLLM
---

# askLLM

**askLLM** is an open-source [jamovi](jamovi.md) module developed by SCgeeker that integrates large language models directly into the jamovi statistical workflow. It operates strictly as an **analytical copilot (not an autopilot)**: it assists researchers by suggesting appropriate jamovi menu paths and generating executable R code, while leaving execution, parameter validation, and statistical interpretation in the user's hands.

- **GitHub Repository:** [SCgeeker/askLLM](https://github.com/SCgeeker/askLLM)
- **Tutorials & Prompt Library:** [stat-skills-tutorials](https://scgeeker.github.io/stat-skills-tutorials/)
- **Learn R with Rj Guide:** [Learn R with Rj](https://scgeeker.github.io/askLLM/learn-r.html)
- **Model Selection Guide:** [Choose a Model You Can Actually Use](https://scgeeker.github.io/askLLM/choose-model.html)

---

## Core Architecture: Two Complementary Analyses

askLLM exposes two distinct analyses under **Analyses ▸ askLLM**, separating graphical point-and-click assistance from R programming guidance:

| Feature | jamovi Module Guider | R Code Tutor |
| :--- | :--- | :--- |
| **Primary Question** | *"Which jamovi analysis should I run for this question?"* | *"How do I write the R code to analyse this?"* |
| **Primary Output** | Recommended test and exact menu navigation path | Clean, documented R script for jamovi's **Rj Editor** |
| **Grounding Context** | Scans locally installed jamovi modules and active menus | Scans installed R packages in the local Rj environment |
| **Cross-Direction** | Directs user to R Code Tutor if programming is needed | Directs user to Module Guider if GUI steps are preferred |

Neither analysis executes actions or mutates data columns automatically. The Module Guider points to the exact menu hierarchy to click, while the R Code Tutor generates code designed for the desktop **Rj Editor** (`Rj - Editor to run R code inside jamovi`).

---

## Privacy and Data Security Model

For clinical, pathology, and sensitive biomedical datasets, privacy is a paramount concern:

- **No Raw Data Exfiltration:** askLLM does not upload raw data records or patient rows. Instead, it extracts and transmits only variable metadata and aggregate summary statistics (variable names, types, summary metrics, factor levels, missing counts).
- **Local LLM Support (Air-Gapped / On-Premise):** Fully supports local open-weight models via **Ollama** or **LM Studio** (`http://localhost:11434` or local API endpoints). When configured with a local model, no data leaves the physical machine.
- **Cloud LLM Support:** Compatible with commercial APIs (OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Groq) using the user's own API keys stored locally in the environment.

---

## The `stat-skills-tutorials` Ecosystem

askLLM is paired with an extensive companion documentation site ([stat-skills-tutorials](https://scgeeker.github.io/stat-skills-tutorials/)), organized across three operational tiers:

1. **Statistical & AI Literacy (協作素養):** Guides researchers on how consulting LLMs interpret variable schemas, how to formulate well-bounded analytical queries, and how to maintain methodological rigor.
2. **Curated Prompt Library (提示詞庫):** Scenario-based, structured prompt templates designed to be copied directly into the `question` field of askLLM, complete with diagnostic criteria and decision boundaries.
3. **Verification Workflows (結果查核):** Checklists to verify LLM outputs against underlying study design, statistical assumptions (e.g., normality, homoscedasticity, sample size requirements), and clinical validity before drawing conclusions.

---

## Installation & Setup

### 1. Via the jamovi Library (Recommended)
1. Open jamovi.
2. Click the `⊕` (**Modules**) button in the top right corner.
3. Select **jamovi library**, search for `askLLM`, and click **Install**.

### 2. Side-Loading `.jmo`
For offline systems or early releases, pre-built `.jmo` module archives tailored for specific OS, CPU architecture, and jamovi version combinations can be downloaded from the [askLLM releases](https://github.com/SCgeeker/askLLM/tree/main/dist) and installed via the **Side-load** tab in the jamovi Modules dialog.

### 3. API Key & Model Configuration
- Refer to [choose-model.html](https://scgeeker.github.io/askLLM/choose-model.html) to configure either a local endpoint (Ollama) or set environment variables for commercial model providers.

<!-- tolaria:related:start -->

## See also

* [Data Visualization and R](data-visualization-and-r.md)
* [Statistics and Bioinformatics](statistics-and-bioinformatics.md)

<!-- tolaria:related:end -->
