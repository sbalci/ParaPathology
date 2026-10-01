---
type: Note
status: Developing
language: en
belongs_to: "[[Writing Journal Articles]]"
order: 195
related_to:
  - "[[digital-pathology-evidence]]"
  - "[[research-quality]]"
  - "[[reproducibility]]"
review_status: Partial
last_reviewed: 2026-09-28
---

# Appraising AI studies in pathology

Choose a reporting guideline or appraisal tool according to the study question. Reporting completeness, risk of bias, applicability, and demonstrated clinical benefit are separate judgments. A complete checklist does not by itself establish that a model works in another laboratory.

## Select the appropriate resource

| Resource | Purpose | Primary reference |
|---|---|---|
| TRIPOD+AI | Reporting the development or evaluation of clinical prediction models using regression or machine learning | [Collins et al., BMJ 2024](https://doi.org/10.1136/bmj-2023-078378), PMID 38626948 |
| PROBAST+AI | Assessing development quality, bias in performance evaluation, and applicability of prediction models | [Moons et al., BMJ 2025](https://doi.org/10.1136/bmj-2024-082505), PMID 40127903 |
| STARD-AI | Reporting diagnostic-accuracy studies of AI-based tests | [Sounderajah et al., Nature Medicine 2025](https://doi.org/10.1038/s41591-025-03953-8), PMID 40954311 |
| DECIDE-AI | Reporting early live clinical evaluation of AI decision-support systems | [Vasey et al., BMJ 2022](https://doi.org/10.1136/bmj-2022-070904), PMID 35584845 |

Use the current publisher versions and their checklists. The STARD-AI publisher page links an [author correction dated 13 July 2026](https://doi.org/10.1038/s41591-026-04570-9); this note does not reproduce the checklist or assess the correction's contents.

## Record the evidence before interpreting it

The following is a practical extraction worksheet for this vault, not an additional validated checklist. Mark unavailable details **not reported** or **not checked**, rather than treating them as absent by design.

| Item | What to record |
|---|---|
| Source and version | Title, authors, journal, publication date, DOI/PMID; preprint or peer-reviewed version; corrections checked |
| Clinical question | Intended use, target population, specimen type, setting, and current comparator |
| Study design | Development, internal or external validation, reader experiment, or live clinical evaluation; prospective data collection versus archived material |
| Sample and unit | Patients, specimens, slides, regions, and tiles separately; institutions, scanners, stains, and relevant selection criteria |
| Reference standard | Who supplied the labels, information available to readers, blinding, adjudication, and disagreement |
| Data separation | Patient and site overlap; training, tuning, and testing; preprocessing learned from test data; possible pretraining overlap |
| Results | Metric definition, denominator, operating threshold, confidence interval, and comparator; calibration and incremental value when relevant |
| Human and workflow effects | Assisted and unassisted errors, incorrect-suggestion uptake, time, overrides, and cases the tool cannot process |
| Appraisal | Applicable formal tool and domain judgments; distinguish not reported from demonstrably biased |
| Transfer and limitations | External population differences, technical variation, conflicts of interest, unavailable data/code, and local validation needs |
| Interpretation | What the result supports, what it does not establish, and the next evidence needed |

## Record review progress

The existing `status` field describes editorial maturity (Stub, Developing, Evergreen). Use the separate `review_status` field when tracking evidence appraisal:

| Value | Meaning |
|---|---|
| Pending | Identified for appraisal; source and claims have not yet been checked |
| Partial | Some sources or claims checked; the body states the remaining work |
| Reviewed | The explicitly stated appraisal scope has been completed; limitations and domain judgments remain visible |
| Needs update | A previously reviewed scope needs reconsideration after new evidence, a correction, or a version change |

Record `last_reviewed` as the date of the latest actual check, including a partial check. It is not a freshness guarantee. Add `doi`, `pmid`, and `study_design` when verified and appropriate to the note. Do not set a synthesis note's DOI to one of several papers as though it were the note's own publication.

A review record should state: **review date; sources/passages examined; claims checked; appraisal scope; unresolved questions**. Do not label an entire article critically appraised after verifying its identifier or abstract alone. The **Evidence to Review** saved view includes Clippings without a review status, notes marked Pending/Partial/Needs update, and Reviewed notes missing a review date. It does not automatically determine when an otherwise dated review has become stale.

## Review scope

On 28 September 2026, the identities and broad purposes of the four resources were checked through Life Sciences Literature and primary publisher records. This note provides a starting workflow; it does not reproduce all guideline items or claim that any linked study has completed formal appraisal. For worked applications and their current limitations, see [[digital-pathology-evidence]].
