---
type: Topic
status: Developing
language: en
belongs_to: "[[Digital Pathology]]"
order: 15
related_to:
  - "[[ai-study-appraisal]]"
  - "[[quality-and-standardisation]]"
  - "[[diagnosis-accuracy-interobserver-and-intraobserver-reliability]]"
review_status: Partial
last_reviewed: 2026-09-28
---

# Digital pathology evidence

This hub connects digital-pathology tools to the questions their evidence can answer: how well they measure a feature, whether they transfer to another laboratory, how they affect a reader, and whether they improve a clinical decision. Use [[ai-study-appraisal]] to record the intended use, validation design, uncertainty, and unresolved questions for each study.

The entries below are a targeted reading set checked on 28 September 2026 using Life Sciences Literature's PubMed and PMC skills and primary publisher sources. They are not an exhaustive review or completed risk-of-bias assessments. Read each linked note's review scope before using its numerical results.

| Question | Study and connected notes | Supported finding | Boundary of the evidence |
|---|---|---|---|
| Does performance survive technical and institutional variation? | [Kömen et al., 2026](https://doi.org/10.1038/s41467-026-73923-2); [[Towards robust foundation models for digital pathology]]; [[croma]] | PathoROB found robustness deficits across 20 evaluated foundation models; tested mitigations reduced but did not remove the problems. | Benchmark results depend on the tasks, cohorts, and confounding conditions. They do not identify a universally best clinical model. |
| Does assistance improve the reader's judgment? | [Frei et al., 2025](https://doi.org/10.1007/s00428-025-04163-w); [[diagnosis-accuracy-interobserver-and-intraobserver-reliability]] | In a 10-region colorectal-cancer experiment, assistance reduced variability, but some participants followed an incorrect output on one image despite initially being closer to the reference. | A small, sequential ROI experiment does not establish routine-workflow benefit. Agreement and accuracy require separate assessment. |
| Can a histological score become more reproducible? | [Pulaski et al., online 2024; issue 2025](https://doi.org/10.1038/s41591-024-03301-2); [[Clinical validation of an AI-based pathology tool for scoring of metabolic dysfunction-associated steatohepatitis]] | AIM-MASH-assisted reads improved agreement with the consensus reference for ballooning and inflammation and met non-inferiority for steatosis and fibrosis. | The intended use was trial scoring. Archived trial specimens and prospectively collected reader assessments should be described separately. |
| Does a new spatial measurement add information? | [Äijälä et al., 2026](https://doi.org/10.1007/s00428-026-04471-9); [[Distance-based evaluation of tumor budding in colorectal cancer]]; related [budding–T-cell graph study](https://proceedings.mlr.press/v227/studer24a.html) | In two cohorts, bud distance was associated with adverse outcome but did not add prognostic information beyond conventional budding in the reported analyses. | This is a result about the evaluated distance measure. It does not establish the value or futility of all spatial or graph features. |
| What has been validated in the imaging chain? | [Evans et al., 2022](https://pubmed.ncbi.nlm.nih.gov/34003251/); [[quality-and-standardisation]]; [[Considerations for digital pathology displays]] | The CAP guideline addresses WSI diagnostic validation against glass-slide interpretation. | WSI-system validation, display procurement recommendations, and AI-model validation answer different questions. |

## How to use this evidence

Start with a defined task and intended population. Then distinguish development results, external validation, reader experiments, and live clinical evaluation. Preserve patient, specimen, slide, and image counts separately; an image count is not a patient sample size.

For a prediction model, ask whether it adds information beyond the current clinical baseline and whether its predicted risks are calibrated. For a measurement tool, record repeatability, reproducibility, the reference standard, and the handling of disagreement. For an assistant, inspect both corrected mistakes and new mistakes caused by incorrect suggestions. These are prompts for appraisal, not a substitute for an applicable formal assessment tool.

The reporting and appraisal resources in [[ai-study-appraisal]] distinguish prediction-model reporting (TRIPOD+AI), diagnostic accuracy reporting (STARD-AI), prediction-model bias/applicability assessment (PROBAST+AI), and early live evaluation (DECIDE-AI).

## Review priorities

- Complete domain-level appraisal and numerical extraction for the selected studies before comparing them quantitatively.
- Resolve the source for [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]. The DOI lookup returned no PubMed record in the targeted check; absence from this search is not evidence that the paper does not exist.
- Use the **Evidence to Review** saved view for unappraised Clippings and notes explicitly marked for further review. Use **Clippings to Process** to find notes still missing topic relationships.

New research questions suggested by this reading set include an evidence map of GI/liver histology AI by intended use, a reader study of accuracy and incorrect-suggestion uptake, and external evaluation of the incremental value of spatial budding features. These are study ideas whose novelty and feasibility still require dedicated assessment.
