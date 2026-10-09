---
type: Note
status: Developing
language: en
aliases:
  - "Quality And Standardisation"
order: 120
belongs_to: "[[Laboratory Management]]"
related_to:
  - "[[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]"
  - "[[Considerations for digital pathology displays]]"
  - "[[digital-pathology-evidence]]"
  - "[[Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology]]"
  - "[[Guidance for laboratory implementation, governance and continuous assurance of artificial intelligence in histopathology]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Theories and Frameworks for Understanding Pathology Practice]]"
  - "[[Pathology AI Integration: A Systems View]]"
---

# Quality And Standardisation

Are quality and standardisation regulations necessary?

Most of us think them as unnecessary paperwork.

However it is very clear that many regulations related to our own health \(like formaldehyde levels\) are expensive and are unlikely to be undertaken if not forced from a regulatory agency.

## External Quality Assurance & Proficiency Testing

- **Nordic Immunohistochemical Quality Control (NordiQC):** [www.nordiqc.org](https://www.nordiqc.org)
- **The Canadian Pathology Quality Assurance (CPQA):** [www.cpqa.ca](https://www.cpqa.ca/)

## Incident Investigation & Systems Engineering

Modern quality assurance is transitioning away from retrospective, punitive "Root Cause Analysis" (RCA) toward proactive systems engineering:
- [[Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology]]: Outlines a 5-stage framework (proportional classification via HICF, structured systems investigation via HSIF, prospective impact assessment via CAIA, routine workflow implementation, and continuous monitoring) to prevent incident recurrence without inflating bureaucratic workload.

## Digital Pathology Quality Assurance & Metrology

As clinical workflows transition to whole-slide imaging (WSI) and artificial intelligence, quality control must expand from tissue blocks to the digital imaging chain (pre-analytics, optics, displays, and algorithms):

- [[Standardization in digital pathology: Supplement 145 of the DICOM standards]]: Foundational standard established by DICOM WG-26 and CAP, introducing the vendor-neutral Whole Slide Microscopic Image IOD and SOP classes. Defines multi-resolution pyramidal tiled storage, standardized (X, Y, Z) slide origin, Z-plane focal stacks, decoupled annotation series, and MWL/MPPS integration with enterprise PACS and VNAs.
- [[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]: Full-lifecycle QA framework and measurement science developed by the UK National Pathology Imaging Co-operative (NPIC) and Leeds Teaching Hospitals NHS Trust. Covers objective chemical stain uptake using biopolymer Tango slides (National Staining Survey), WSI scanner variation benchmarking, display luminance science, and the web-based Point-of-Use Quality Assurance (POUQA) tool.
- [[Considerations for digital pathology displays]]: Reviews display guidance and proposes procurement specifications informed by available commercial products, evidence and experience. Table 2 lists 4 MP with a trend toward 8 MP, and recommends 120 Hz for subjectively smoother viewing while explicitly considering 60 Hz adequate. These are the authors' proposals, not universal diagnostic requirements. The paper also covers display selection, local evaluation and quality assurance. [Table 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC13578409/).
- [[digital-pathology-evidence]]: Connects display and WSI-system validation with separate appraisal of AI performance, human–AI interaction and quantitative histology evidence.
- [[Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)]]: FDA CDRH/DIDSR regulatory tools for digital pathology assessment, including generative stress-testing (HistoGen), multi-reader agreement (HTT), threshold goals (DxGoals), and segmentation evaluation (SegVal-WSI).

## AI Clinical Implementation, Governance & Continuous Assurance

- [[Guidance for laboratory implementation, governance and continuous assurance of artificial intelligence in histopathology]]: Landmark guidance from the European Working Group for Breast Screening Pathology (EWGBSP; *Virchows Archiv* 2026). Grounded in ISO 15189:2022, it addresses the core operational reality that pathology departments procure commercial, regulatory-cleared AI rather than developing algorithms. Distinguishes developer-level algorithm validation (Stage 1) from mandatory local laboratory verification (Stage 2) and post-deployment continuous assurance (Stage 3). Provides function-based risk-proportionate verification matrices, 6 clinical implementation pathways (clinical, off-label, silent, research, locally developed LDT, expanded autonomy), quality indicators (including longitudinal biomarker distribution tracking), incident taxonomies, and a 14-domain pre-implementation governance checklist.
- [[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]: 5-phase prospective clinical governance framework from the University of Washington Medical Center (UWMC), emphasizing real-world demographic benchmarking, daily 8-slide shift controls, human-in-the-loop kill-switches, and institutional oversight.

