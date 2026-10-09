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
- [Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology](../Clippings/Beyond%20root%20cause%20analysis%20-%20a%20practical%20systems%20engineering%20approach%20to%20incident%20investigation%20in%20histopathology.md): Outlines a 5-stage framework (proportional classification via HICF, structured systems investigation via HSIF, prospective impact assessment via CAIA, routine workflow implementation, and continuous monitoring) to prevent incident recurrence without inflating bureaucratic workload.

## Digital Pathology Quality Assurance & Metrology

As clinical workflows transition to whole-slide imaging (WSI) and artificial intelligence, quality control must expand from tissue blocks to the digital imaging chain (pre-analytics, optics, displays, and algorithms):

- [Standardization in digital pathology: Supplement 145 of the DICOM standards](../Clippings/Standardization%20in%20digital%20pathology%20-%20Supplement%20145%20of%20the%20DICOM%20standards.md): Foundational standard established by DICOM WG-26 and CAP, introducing the vendor-neutral Whole Slide Microscopic Image IOD and SOP classes. Defines multi-resolution pyramidal tiled storage, standardized (X, Y, Z) slide origin, Z-plane focal stacks, decoupled annotation series, and MWL/MPPS integration with enterprise PACS and VNAs.
- [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](../Clippings/NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md): Full-lifecycle QA framework and measurement science developed by the UK National Pathology Imaging Co-operative (NPIC) and Leeds Teaching Hospitals NHS Trust. Covers objective chemical stain uptake using biopolymer Tango slides (National Staining Survey), WSI scanner variation benchmarking, display luminance science, and the web-based Point-of-Use Quality Assurance (POUQA) tool.
- [Considerations for digital pathology displays](../Clippings/Considerations%20for%20digital%20pathology%20displays.md): Reviews display guidance and proposes procurement specifications informed by available commercial products, evidence and experience. Table 2 lists 4 MP with a trend toward 8 MP, and recommends 120 Hz for subjectively smoother viewing while explicitly considering 60 Hz adequate. These are the authors' proposals, not universal diagnostic requirements. The paper also covers display selection, local evaluation and quality assurance. [Table 2](https://pmc.ncbi.nlm.nih.gov/articles/PMC13578409/).
- [digital-pathology-evidence](../computational-digital-and-mathematical-pathology/digital-pathology-evidence.md): Connects display and WSI-system validation with separate appraisal of AI performance, human–AI interaction and quantitative histology evidence.
- [Regulatory Science Tools Catalog: Digital Pathology (FDA CDRH)](../Clippings/Regulatory%20Science%20Tools%20Catalog%20-%20Digital%20Pathology.md): FDA CDRH/DIDSR regulatory tools for digital pathology assessment, including generative stress-testing (HistoGen), multi-reader agreement (HTT), threshold goals (DxGoals), and segmentation evaluation (SegVal-WSI).

## AI Clinical Implementation, Governance & Continuous Assurance

- [Guidance for laboratory implementation, governance and continuous assurance of artificial intelligence in histopathology](../Clippings/Guidance%20for%20laboratory%20implementation%2C%20governance%20and%20continuous%20assurance%20of%20artificial%20intelligence%20in%20histopathology.md): Landmark guidance from the European Working Group for Breast Screening Pathology (EWGBSP; *Virchows Archiv* 2026). Grounded in ISO 15189:2022, it addresses the core operational reality that pathology departments procure commercial, regulatory-cleared AI rather than developing algorithms. Distinguishes developer-level algorithm validation (Stage 1) from mandatory local laboratory verification (Stage 2) and post-deployment continuous assurance (Stage 3). Provides function-based risk-proportionate verification matrices, 6 clinical implementation pathways (clinical, off-label, silent, research, locally developed LDT, expanded autonomy), quality indicators (including longitudinal biomarker distribution tracking), incident taxonomies, and a 14-domain pre-implementation governance checklist.
- [Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center](../Clippings/Ethical%20guidelines%20for%20deploying%20artificial%20intelligence%20applications%20in%20the%20pathology%20field%20-%20Lessons%20learned%20from%20a%20prospective%20framework%20in%20a%20large%20tertiary%20care%20academic%20medical%20center.md): 5-phase prospective clinical governance framework from the University of Washington Medical Center (UWMC), emphasizing real-world demographic benchmarking, daily 8-slide shift controls, human-in-the-loop kill-switches, and institutional oversight.

<!-- tolaria:related:start -->

## See also

* [Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology](../Clippings/Beyond%20root%20cause%20analysis%20-%20a%20practical%20systems%20engineering%20approach%20to%20incident%20investigation%20in%20histopathology.md)
* [Considerations for digital pathology displays](../Clippings/Considerations%20for%20digital%20pathology%20displays.md)
* [Digital pathology evidence](../computational-digital-and-mathematical-pathology/digital-pathology-evidence.md)
* [Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center](../Clippings/Ethical%20guidelines%20for%20deploying%20artificial%20intelligence%20applications%20in%20the%20pathology%20field%20-%20Lessons%20learned%20from%20a%20prospective%20framework%20in%20a%20large%20tertiary%20care%20academic%20medical%20center.md)
* [Guidance for laboratory implementation, governance and continuous assurance of artificial intelligence in histopathology](../Clippings/Guidance%20for%20laboratory%20implementation%2C%20governance%20and%20continuous%20assurance%20of%20artificial%20intelligence%20in%20histopathology.md)
* [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](../Clippings/NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md)
* [Pathology AI Integration: A Systems View](../theories/Pathology%20AI%20Integration_%20A%20Systems%20View.md)
* [Theories and Frameworks for Understanding Pathology Practice](../theories/Theories%20and%20Frameworks%20for%20Understanding%20Pathology%20Practice.md)

<!-- tolaria:related:end -->
