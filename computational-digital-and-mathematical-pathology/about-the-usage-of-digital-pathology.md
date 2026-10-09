---
type: Note
status: Developing
language: en
aliases:
  - "About the Usage of Digital Pathology"
order: 30
belongs_to: "[[Digital Pathology]]"
---

# About the Usage of Digital Pathology

## Start with the intended use

Before choosing equipment or a viewer, describe what the service will do: teaching, research, consultation, or primary diagnosis; which specimens and stains it will cover; who will use it; and where interpretation will take place. Record what is outside scope and when to return to the glass slide.

This is an educational planning guide. The checklist is a practical synthesis, not a laboratory SOP or a statement that a particular installation is validated. Local clinical, information-governance, regulatory, and accreditation requirements need separate assessment.

## Plan the complete workflow

| Stage | Practical questions | Useful record |
| --- | --- | --- |
| Slide preparation and identification | Does the slide meet the laboratory's preparation criteria? Can case, specimen, slide, and image be matched without ambiguity? | Identity checks and rejection/rescan reasons |
| Scanning and image QC | Is all relevant tissue captured and in focus? Are there stitching errors, missing regions, or other artifacts? Are the expected images present? | Scan settings, QC outcome, and corrective action |
| Viewing and interpretation | Are the viewer, display, environment, network, and user training suitable for the intended work? | Configuration, training record, and known limitations |
| Storage and retrieval | Can authorised users retrieve the correct image and associated information promptly? Who owns capacity planning, backup/restore testing, retention, and support? | Storage and access plan, restore-test and maintenance records |
| Exceptions and downtime | What happens when an image is incomplete, a case is unsuitable, or a system is unavailable? | Escalation, glass-slide fallback, and incident procedures |

The [NPIC Guide to Digital Pathology](https://npic.ac.uk/wp-content/uploads/sites/71/2023/01/Guide-to-Digital-Pathology-Vol.2.pdf) provides implementation guidance on image quality, case matching, infrastructure, and ongoing costs. Backup tests, retention, and downtime arrangements above are planning prompts; this page does not prescribe a universal interval or retention period.

## Validate diagnostic use locally

The active [CAP/ASCP/API whole-slide imaging guideline](https://www.cap.org/cap-guidelines/validating-whole-slide-imaging-for-diagnostic-purposes-in-pathology/) is the 2021 update, published in print in 2022. Its [recommendations](https://www.cap.org/wp-content/uploads/documents/wsi-summary-recommendations.pdf) and [good-practice statements](https://www.cap.org/wp-content/uploads/documents/wsi-teaching-presentation.pdf) include:

- At least **60 cases**, representative of one intended application and routine diagnostic complexity; an additional **20 cases** for relevant additional applications not represented in the initial set.
- Comparison of the same observer's digital and glass-slide diagnoses, with at least a **two-week washout** between modalities.
- Investigation and remediation when intraobserver concordance is **below 95%**. This is an investigation trigger, not a universal regulatory pass/fail mark or a claim of 95% diagnostic accuracy.
- Assessment of the complete system in its intended setting, trained users, representation of tissue in the digital image, and documentation of the study and approval.

The guideline's recommendations are not themselves mandatory, as CAP's FAQ explains. Check applicable regulatory and accreditation requirements separately. The [CAP teaching presentation](https://www.cap.org/wp-content/uploads/documents/wsi-teaching-presentation.pdf) provides context; this short note does not replace the full guideline.

### Keep validation, routine QC, and change control distinct

Initial validation addresses the intended use of the workflow. Routine QC checks whether today's images and service remain fit for that use. Change control determines what evidence is needed after a change. Maintain procedures for changes that could affect clinical results; do not treat every software update or replacement as identical. CAP's [change-control examples](https://www.cap.org/wp-content/uploads/documents/wsi-if-then-statements.pdf) distinguish, for example, a new scanner make/model from replacement by the same make/model. Record the impact assessment and any verification or revalidation needed.

## Check the specific product and configuration

Regulatory status is tied to a device, its labeling, intended use, and compatible configuration. FDA records illustrate why authorization of one WSI device cannot be extended to every scanner, viewer, or research algorithm: the [Philips PIPS decision](https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN160056.pdf) specifies a system and use, while the [Novo decision](https://www.accessdata.fda.gov/cdrh_docs/reviews/K212361.pdf) covers viewer software with specified compatible equipment. These are examples, not an exhaustive current product list. Check the current record and labeling for the actual product and jurisdiction before clinical use.

A research tool's availability, open code, or publication is a separate question from its suitability and authorization for a diagnostic workflow. See the [software chooser](digital-pathology-software.md) for research-oriented starting points.

## Test interoperability and sharing explicitly

[DICOM whole-slide imaging](https://dicom.nema.org/Dicom/DICOMWSI/) supports tiled, multiresolution images and associated metadata. Compare conformance statements and test the required scanner–archive–viewer exchange: the [DICOM conformance guidance](https://dicom.nema.org/medical/dicom/current/output/chtml/part02/sect_n.3.3.html) makes clear that conformance alone does not guarantee interoperability.

Before sharing research or teaching images, inspect metadata, filenames, associated label/macro images, and identifiers embedded in pixels. Removing selected metadata is not sufficient evidence of de-identification. The [DICOM confidentiality profile](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.2.html) distinguishes metadata handling from pixel-data cleaning. Use the institution's approved sharing process; a technical cleaning step alone does not establish legal compliance.

## Foundational reading

- **Whole Slide Imaging Versus Microscopy for Primary Diagnosis in Surgical Pathology: A Multicenter Blinded Randomized Noninferiority Study of 1992 Cases (Pivotal Study).** *American Journal of Surgical Pathology* (2018). [DOI: 10.1097/PAS.0000000000000948](https://doi.org/10.1097/PAS.0000000000000948). Read its study population, exclusions, system, comparator, and endpoints before applying its findings to another setting.
- **The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth.** *Archives of Pathology & Laboratory Medicine* (2017). [DOI: 10.5858/arpa.2016-0386-RA](https://doi.org/10.5858/arpa.2016-0386-RA). Background for evaluating the reference used to judge an automated measurement.

**Source check:** 1 October 2026, for the guidance and official documents linked on this page. This is a source-based content update, not clinical review or validation of any laboratory, product, or analysis pipeline.
