---
type: Note
status: Evergreen
language: en
review_status: Partial
last_reviewed: 2026-09-28
order: 10
belongs_to: "[[Theories and Frameworks]]"
---

# Theories and Frameworks for Understanding Pathology Practice

## Review scope and provenance

This is a **narrative, interpretive synthesis**, not a systematic review. The proposed searches below have **not been documented as executed for this note**; no reproducible screening record, inclusion protocol, or formal certainty assessment is available. The theory rankings and suggested AI design implications are the note's provisional synthesis.

A targeted review on 28 September 2026 recovered identifiable references from the bibliography and checked selected claims against original articles, publisher pages, and PubMed records. The bibliography and theory map are retained. Direct links replace the recoverable conversation citation markers; a source-check footnote marks a sentence or table cell whose remaining source mapping or claim support still needs verification. A recovered article identity does not establish every extrapolation made from it.

The checked core covers visual search (Brunyé; Lopes), melanoma observer variability (Elmore), pathology implementation (Drogt; King; Betmouni; Kusta; Geisler), the diagnostic-accuracy review (McGenity), WSI validation (Evans; Fraggetta), NPT readiness (Mikkelsen), Lean studies (Raab; Smith), and the conceptual articles by Cheng, Chetty, and Müller. Remaining checks include other named studies in the tables, the RCPath procedural sequence, and the comparative evidence ratings. See [[digital-pathology-evidence]] for the shared appraisal workflow and the dated project assessment for the motivating findings.

## Executive summary

This synthesis treats pathology practice as a **layered activity** rather than a single cognitive act. At the **micro level**, pathologists rely on perceptual and inferential frameworks such as Gestalt pattern recognition, signal detection, Bayesian updating, dual-process reasoning, and metacognitive calibration to move from tissue appearance to a reportable diagnosis. At the **meso and macro levels**, diagnosis is embedded in workflows, laboratory infrastructure, second-opinion practices, information systems, quality regimes, and legal accountability, which are better captured by distributed cognition, sociotechnical systems, SEIPS-style human factors engineering, Lean/queueing models, implementation theory, and high-reliability/safety frameworks. Digital pathology and AI do not replace these layers; they redistribute them. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383); [Raab et al., 2008](https://doi.org/10.1136/jcp.2007.051326); [King et al., 2023](https://doi.org/10.2196/38039) [^source-check]

The selected sources provide **pathology-specific empirical examples** in four domains: visual search and expert pattern recognition; observer variability, confidence, and calibration; digital pathology implementation and workflow redesign; and laboratory operations/process improvement. The evidence base is notably thinner for chaos theory, actor-network theory, hermeneutics, and embodied cognition as *formal* explanatory models of routine pathology practice, although they remain useful conceptual lenses. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383); [Elmore et al., 2017](https://doi.org/10.1136/bmj.j2813); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [Raab et al., 2008](https://doi.org/10.1136/jcp.2007.051326); [Smith et al., 2012](https://doi.org/10.1309/AJCP3YXID2UHZPHT); [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650); [Chetty, 2017](https://doi.org/10.1136/jclinpath-2017-204391) [^source-check]

The implementation literature suggests that **AI adoption in pathology depends on workflow fit, trust, validation, role redesign, training, and governance as well as benchmark accuracy**. McGenity et al.’s 2024 systematic review found that 99 of its 100 studies had at least one area of high or unclear risk of bias or applicability concern; 48 studies contributed to the diagnostic-accuracy meta-analysis. Its high pooled performance estimates therefore need cautious interpretation. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8). Qualitative and realist-implementation studies in pathology repeatedly reach the same conclusion: pathologists must be able to make sense of the tool, trust it, adapt work around it, and understand how responsibility is allocated if the tool is to become routine. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [King et al., 2023](https://doi.org/10.2196/38039); [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) [^source-check]

The practical implication is that pathology AI should be evaluated as a **human-AI work-system intervention**, not just as a classifier. That means measuring not only AUROC, sensitivity, or concordance, but also timing of cue presentation, effect on attention, second-opinion behavior, turnaround time, workload, safety monitoring, and the local organizational conditions under which the model is deployed. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [King et al., 2023](https://doi.org/10.2196/38039); [Smith et al., 2012](https://doi.org/10.1309/AJCP3YXID2UHZPHT) [^source-check]

## Suggested search strategy and evidence base

The bibliography combines **pathology research, official guidance, and primary and review sources**, with emphasis on anatomic pathology, digital pathology, cytology, and adjacent diagnostic-reasoning literature. A future structured review could search these domains and distinguish systematic reviews, guidelines, empirical implementation and observer studies, and conceptual essays. The current selection is not a documented exhaustive retrieval. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8); [Evans et al., 2022](https://pubmed.ncbi.nlm.nih.gov/34003251/); [Fraggetta et al., 2021](https://doi.org/10.3390/diagnostics11112167); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383); [Raab et al., 2008](https://doi.org/10.1136/jcp.2007.051326) [^source-check]

Betmouni’s 2021 implementation essay describes **limited prospective use of theoretical planning frameworks** in digital pathology and discusses lessons from broader digital health. This is a historical account of the literature available to that essay; it is not a current quantitative census of theory use. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240)

Suggested databases for a replicable search are **PubMed**, **Scopus**, **Web of Science**, and **Google Scholar**. For PubMed specifically, the official guide supports Boolean operators, phrase searching, truncation, field tags, date filters, and proximity searching; that is useful when moving from broad “digital pathology” retrieval to theory-specific terms such as “dual process,” “signal detection,” or “normalization process theory.” [^source-check]

Suggested search strings (not executed or screened as part of this note’s documented review):

```text
("pathology" OR histopathology OR cytopathology OR dermatopathology)
AND
("diagnostic reasoning" OR "pattern recognition" OR gestalt OR "signal detection" OR Bayesian OR "dual process" OR metacognition)

("digital pathology" OR "whole slide imaging" OR telepathology)
AND
(AI OR "artificial intelligence" OR "machine learning")
AND
(workflow OR trust OR implementation OR sociotechnical OR SEIPS OR "normalization process theory" OR "diffusion of innovation" OR "high reliability")

(pathology OR histopathology)
AND
("eye tracking" OR "visual search" OR "observer performance" OR ROC OR concordance OR confidence)

(pathology laboratory OR histopathology laboratory)
AND
(Lean OR queueing OR simulation OR "turnaround time" OR bottleneck OR workflow)

(pathology)
AND
(ethnography OR qualitative OR hermeneutics OR "actor-network theory" OR sociomaterial OR "distributed cognition")
```

A useful way to organize the literature is to sort theories by the part of pathology practice they explain best:

```mermaid
flowchart LR
    A[Pathology practice] --> B[Perception and diagnosis]
    A --> C[Workflow and organization]
    A --> D[Interpretation and materiality]

    B --> B1[Gestalt]
    B --> B2[Signal detection]
    B --> B3[Bayesian]
    B --> B4[Dual process]
    B --> B5[Metacognition]
    B --> B6[Ecological psychology]
    B --> B7[Cognitive load]

    C --> C1[Complex adaptive systems]
    C --> C2[Distributed cognition]
    C --> C3[Sociotechnical systems]
    C --> C4[SEIPS]
    C --> C5[Lean and queueing]
    C --> C6[Normalization process theory]
    C --> C7[Diffusion of innovations]
    C --> C8[High reliability and Safety II]

    D --> D1[Actor-network theory]
    D --> D2[Information theory]
    D --> D3[Hermeneutics]
    D --> D4[Embodied cognition]
    D --> D5[Chaos theory]
```

That clustering is consistent with the way recent pathology research has evolved: from observer-performance and image-analysis studies, to digital workflow implementation, and more recently to ethnography, implementation science, and governance. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [King et al., 2023](https://doi.org/10.2196/38039) [^source-check]

## Comparative map of theories

The support ratings below are **provisional editorial judgments**, retained as a working map rather than validated evidence grades. “Strong,” “moderate,” and “weak” describe the author’s impression of the selected literature; a systematic search and structured appraisal would be required to justify comparisons. Empirical evidence about workflow or perception does not by itself validate an entire explanatory theory. In particular, the CAS rating refers to indirect implementation evidence, not a tested attractor model.

| Theory | Scale | Primary agents | Empirical support | Relevance to AI integration | Typical methods | Representative citations |
|---|---|---|---|---|---|---|
| Gestalt pattern recognition | Micro | Individual pathologist | Strong | High | Eye tracking, observer studies, rapid-exposure tasks, concordance | Brunyé et al. 2017; Lopes et al. 2024; Brunyé et al. 2021. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383) [^source-check] |
| Signal detection theory | Micro | Individual observer and threshold-setting system | Moderate | High | ROC/AUC, confidence ratings, multi-reader performance | Swets 1988; Burgess 2011; Krupinski et al. 2012. [^source-check] |
| Bayesian reasoning | Micro | Individual pathologist, report category, ancillary test pathway | Moderate | High | Probabilistic reporting, likelihood-based interpretation, decision support | Eltoum et al. 2006; MacIntosh et al. 2008; Westfall et al. 2010. [^source-check] |
| Dual-process reasoning | Micro | Individual pathologist | Moderate | High | Error analysis, confidence studies, cognitive reviews | Norman 2010, 2017, 2024; Parsons et al. 2025. [^source-check] |
| Metacognition and calibration | Micro | Individual pathologist plus peer-review system | Moderate | High | Confidence-accuracy studies, second-opinion behavior, calibration analysis | Clayton et al. 2023; Beebe et al. 2024; Kerr et al. 2026. [^source-check] |
| Ecological psychology | Micro to meso | Pathologist interacting with display and task environment | Moderate | High | Visual search, interface studies, navigation studies | Torre et al. 2020; Brunyé et al. 2021; Gu et al. 2023. [^source-check] |
| Cognitive load theory | Micro to meso | Individual pathologist in task environment | Moderate | High | Workload surveys, usability, time-motion, pupil/eye measures | Khatab et al. 2024; Mateos et al. 2016; Brunyé et al. 2025. [^source-check] |
| Complex adaptive systems | Meso to macro | Laboratory, department, institution | Moderate | High | Qualitative case studies, implementation analyses | Betmouni 2021; Drogt et al. 2022; Cheng et al. 2021. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) |
| Distributed cognition | Meso | Team plus artifacts | Moderate | High | Ethnography, workflow observation, collaboration studies | AHRQ DCog overview; Kiran et al. 2023; Geisler et al. 2025. [^source-check] |
| Sociotechnical systems | Meso to macro | People, tools, tasks, organization | Moderate to strong | High | Mixed methods, qualitative interviews, implementation studies | Hanna et al. 2022; Drogt et al. 2022; ESP 2025. [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6) [^source-check] |
| SEIPS and human factors engineering | Meso to macro | Work system | Moderate | High | Process mapping, observation, systems analysis, incident review | Carayon et al. 2022; Dowers & Jurewicz 2023; Yen et al. 2026. [^source-check] |
| Queueing, simulation, and Lean | Meso | Laboratory process, staffing, specimen flow | Strong | High | TAT metrics, simulation, A3, kaizen, error-frequency studies | Raab et al. 2008; Smith et al. 2012; Leeftink et al. 2016; McClintock et al. 2012. [Raab et al., 2008](https://doi.org/10.1136/jcp.2007.051326); [Smith et al., 2012](https://doi.org/10.1309/AJCP3YXID2UHZPHT) [^source-check] |
| Normalization process theory | Meso | Staff adoption process | Moderate | High | NoMAD surveys, interviews, process evaluation | Mikkelsen et al. 2022; King et al. 2023; digital dermatopathology transition study 2025. [Mikkelsen et al., 2022](https://doi.org/10.3390/ijerph19127253); [King et al., 2023](https://doi.org/10.2196/38039) [^source-check] |
| Diffusion of innovations | Meso to macro | Professional community and adopter network | Moderate | Medium to high | Adoption surveys, case studies, implementation narratives | Mairinger 2000; Williams et al. 2017; Betmouni 2021. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240) [^source-check] |
| High reliability and Safety II | Macro | Organization and safety culture | Moderate | High | QA metrics, incident review, resilience-oriented safety studies | Zarbo et al. 2018; Banks et al. 2017; Choi et al. 2024. [^source-check] |
| Actor-network theory | Meso to macro | Human and non-human actors | Weak | Medium | Ethnography, document analysis, sociology of technology | Kusta et al. 2024; Geisler et al. 2025. [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650) [^source-check] |
| Information theory | Micro to meso | Image, signal, storage, model | Moderate | High | Compression studies, entropy, feature extraction, QC metrics | Madabhushi & Lee 2016; Krupinski et al. 2012; Song et al. 2023. [^source-check] |
| Hermeneutics | Micro to meso | Interpreter, report, clinical context | Weak to moderate | Medium | Conceptual analysis, textual interpretation, narrative guides | Chetty 2017; Rashid et al. 2022; Crawford 2007. [Chetty, 2017](https://doi.org/10.1136/jclinpath-2017-204391) [^source-check] |
| Embodied cognition | Micro to meso | Pathologist-body-interface system | Weak to moderate | Medium | Ergonomic device studies, interface testing, HCI | Torre et al. 2020; Mateos et al. 2016; Alcaraz-Mateos et al. 2020. [^source-check] |
| Chaos theory | Macro and conceptual | System dynamics, instability, emergence | Weak | Low to medium | Conceptual essays, disease-complexity analogies | McLendon 2011; Heng et al. 2022, 2024. [^source-check] |

## Theory-by-theory synthesis

**Perceptual and cognitive theories**

| Theory | Concise definition and why it maps to pathology | Key empirical or seminal papers and recent reviews | Typical pathology applications and methods | Limitations and implications for AI adoption |
|---|---|---|---|---|
| Gestalt pattern recognition | Diagnosis often begins with a **whole-pattern impression** of tissue architecture, not a serial checklist of features. This maps closely onto the low-power “gist” scan, targeted zooming, and architectural recognition that experts report in routine practice. | **Seminal/empirical:** Kundel & Nodine, *Radiology* 1975; Brunyé et al., “Accuracy is in the eyes of the pathologist,” *J Biomed Inform* 2017. **Recent review:** Lopes et al., *J Pathol Inform* 2024. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383) [^source-check] | Used in diagnosis, education, and digital slide-reading research. Methods include eye tracking, ROI fixation analysis, time-to-first-fixation, and rapid-exposure melanoma studies. Brunyé’s melanoma work showed that pathologists can extract diagnostically useful information from very brief WSI exposure. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383) [^source-check] | Powerful but vulnerable to premature pattern completion and context bias. For AI, this argues for tools that **preserve overview and multiscale navigation** rather than forcing patchwise tunnel vision. Cues should support expert overview, not replace it. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004) [^source-check] |
| Signal detection theory | Separates **discriminability** from **decision threshold**. In pathology this maps to the distinction between “can I see malignancy?” and “at what confidence threshold do I call it atypia, suspicious, or malignant?” | **Seminal:** Swets, *Science* 1988; Burgess, *Acad Radiol* 2011. **Pathology studies:** Krupinski et al., WSI compression observer performance, 2012; Bejnordi et al., CAMELYON diagnostic confidence, 2017. [^source-check] | Most useful for digital pathology validation, threshold setting, biomarker cutoffs, and compression/image-quality studies. Methods include ROC/AUC, confidence-scaled reads, MRMC designs, and false-positive/false-negative decomposition. [^source-check] | Binary signal/noise simplifications can understate the graded uncertainty of real pathology categories. For AI, SDT suggests local threshold tuning, explicit uncertainty, and harm-aware optimization rather than a single “maximum accuracy” threshold. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8) [^source-check] |
| Bayesian reasoning | Combines prior probability with new morphologic or ancillary evidence. In pathology, this maps to integrating morphology with site, age, clinical history, immunostains, molecular tests, and category-specific risk of malignancy. | **Pathology practice papers:** Wang et al., probabilistic breast FNA, 1998; Eltoum et al., probabilistic EUS-FNA reporting, 2006; MacIntosh et al., male breast FNA, 2008; Westfall et al., Bayesian IHC use, 2010. **Recent proximate review:** Marchevsky, evidence-based pathology, 2017. [^source-check] | Especially relevant in cytology, gray-zone categories, and ancillary-test planning. Methods include probabilistic reporting schemas, risk-of-malignancy categories, likelihood-based interpretation, and decision support. [^source-check] | Much of pathology uses Bayesian reasoning **implicitly**, not formally. Priors can be wrong, undocumented, or socially inherited. For AI, Bayesian framing supports probabilistic outputs, prevalence-aware calibration, and more transparent management of uncertain cases. [King et al., 2023](https://doi.org/10.2196/38039) [^source-check] |
| Dual-process reasoning | Pathologists often move between rapid, experience-based intuition and slower, analytic checking. This has obvious face validity in pathology, but recent critiques argue that the contrast is often overstated and may reflect different *knowledge structures* rather than distinct processors. | **Seminal and review:** Norman, *Med Educ* 2010; Norman et al., *Adv Health Sci Educ* 2017; Norman 2024 critique; Parsons et al. 2025 situativity review. **Pathology-adjacent studies:** Brunyé 2017; Elmore 2017. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004); [Elmore et al., 2017](https://doi.org/10.1136/bmj.j2813) [^source-check] | Used to understand diagnostic error, anchoring, “first impression then confirm,” and the role of ancillary studies in difficult cases. Methods include bias studies, case-vignette experiments, confidence recording, and observer-accuracy analysis. [Elmore et al., 2017](https://doi.org/10.1136/bmj.j2813); [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004) [^source-check] | The biggest criticism is oversimplification: pathology may be better seen as a flexible, context-sensitive mixture of exemplars, scripts, and analytic checks. For AI, the key question is **when** AI enters the process; immediate prompts can bias early perception, while delayed or toggleable support may preserve independent judgment. [^source-check] |
| Metacognition and calibration | Focuses on whether pathologists know when they are likely to be right or wrong, when to seek help, and how confidence relates to actual accuracy. In practice this underlies second opinions, uncertainty statements, and escalation to ancillary testing. | **Key papers:** Clayton et al., “Are Pathologists Self-Aware of Their Diagnostic Accuracy?” 2023; Beebe et al., metacognitive diagnostic reasoning model, 2024; Kerr et al., prior diagnosis effects on second opinions, 2026. [^source-check] | Methods include confidence-accuracy associations, calibration curves, independent second-opinion designs, and studies of how prior diagnoses bias later reads. Applications include melanoma review, difficult dermatopathology, and QA. [^source-check] | Confidence is not the same as accuracy, and social/contextual pressures can distort both. For AI, this supports interfaces that expose **model uncertainty**, encourage checking in low-confidence/high-risk cases, and make it easier to seek second opinions rather than quietly over-rely on the algorithm. [King et al., 2023](https://doi.org/10.2196/38039) [^source-check] |
| Ecological psychology | Treats cognition as a **perception-action loop** in a real environment. In pathology, the “environment” is not abstract: it includes the monitor, viewer, zoom/pan affordances, scan quality, LIS integration, and the physical/temporal setting of reporting. | **Conceptual review:** Torre et al. 2020 on ecological and distributed views of clinical reasoning. **Pathology examples:** Brunyé et al. 2021 rapid melanoma; Gu et al. 2023 NaviPath navigation system. [^source-check] | Best applied to digital pathology navigation, attention guidance, and interface design. Methods include HCI studies, navigation analysis, eye tracking, and interactive tool evaluation. NaviPath reported faster coverage and improved precision/recall relative to manual navigation in its evaluation. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004) [^source-check] | Direct pathology-specific theory papers remain few. For AI, the practical lesson is to build **good affordances**: the viewer, not just the model, changes diagnostic behavior. Poorly timed prompts can become environmental distractions rather than perceptual aids. [^source-check] |
| Cognitive load theory | Diagnostic work competes for limited attentional and working-memory resources. Gigapixel navigation, multiple stains, interruptions, EHR review, and administrative pressure all add load. | **Recent review:** Khatab et al., pathologist workload, burnout, and wellness, 2024. **Pathology ergonomics/HCI:** Mateos et al. 2016; Brunyé et al. 2025 on diagnostic HCI and AI; navigation-system studies. [^source-check] | Methods include survey-based burnout/workload studies, usability testing, ergonomic comparisons of devices, timing metrics, and some eye-tracking indicators. Applications include digital transition, workstation design, and sign-out burden. [^source-check] | Load is often inferred rather than directly measured, and not all added information is harmful. For AI, the goal should be **load shaping**, not just information addition: triage, summarize, and suppress unhelpful alerts. [^source-check] |

**Work-system and implementation theories**

| Theory | Concise definition and why it maps to pathology | Key empirical or seminal papers and recent reviews | Typical pathology applications and methods | Limitations and implications for AI adoption |
|---|---|---|---|---|
| Complex adaptive systems | Views organizations as interacting agents whose routines stabilize over time. This maps well to pathology departments where slides, staff, LIS, turnaround targets, peer review, and clinician expectations co-evolve. | Pathology-specific work is mostly indirect: Betmouni 2021 on implementation learning; Drogt et al. 2022 on AI integration; Cheng et al. 2021 on deployment requirements; Zhang et al. 2024 routine implementation review. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) [^source-check] | Useful for understanding why “good AI” fails when it perturbs established reporting routines, staffing, or accountability. Methods are mostly qualitative interviews, review essays, and implementation analyses. [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6) [^source-check] | CAS language can become metaphorical if not operationalized. Still, it is a strong lens for AI adoption because it foregrounds co-evolution: infrastructure, roles, validation, and habits must all change together. [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) [^source-check] |
| Distributed cognition | Cognition is spread across people, tools, documents, images, and time. Pathology clearly fits this: diagnosis is rarely just “one brain plus one slide.” | **General healthcare definition:** AHRQ distributed cognition overview. **Pathology examples:** Kiran et al. 2023 digital pathology review; Barisoni et al. 2020 computational nephropathology; Geisler et al. 2025 ethnography. [^source-check] | Excellent for tumor boards, consultation, digital archives, slide scanning, LIS-mediated worklists, and asynchronous peer input. Methods include ethnography, artifact analysis, workflow observation, and qualitative interviews. [^source-check] | It explains coordination well but predicts less about individual bias. For AI, the implication is that evaluation must include **handoffs and shared activity**, not just solo pathologist-AI accuracy. [King et al., 2023](https://doi.org/10.2196/38039) [^source-check] |
| Sociotechnical systems | Performance emerges from interactions among users, tasks, technologies, organizations, and policy contexts. This is one of the best direct fits for digital pathology and AI implementation. | Hanna et al. 2022; Drogt et al. 2022; Betmouni 2021; ESP 2025 expert opinion. These repeatedly stress coordinated enterprise integration, stakeholder alignment, and workflow redesign. [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [Betmouni, 2021](https://doi.org/10.1177/20552076211020240) [^source-check] | Used for digital pathology rollouts, AI readiness, scanner/LIS integration, remote sign-out, training, and governance. Methods include mixed methods, interviews, implementation case studies, and organizational reviews. [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6) [^source-check] | Sometimes too descriptive unless paired with measurable implementation outcomes. For AI, it is indispensable: a classifier with high accuracy can still fail if it disrupts interfaces, staffing, handoffs, reimbursement, or quality assurance. [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018); [King et al., 2023](https://doi.org/10.2196/38039) |
| SEIPS and human factors engineering | SEIPS models healthcare as a work system of persons, tasks, tools/technology, organization, environment, and external context. It is a formalized sociotechnical framework that is highly suitable for pathology but still underused there. | Carayon et al. 2022 PSNet overview; Dowers & Jurewicz 2023 used a systems engineering approach to study cytology process errors involving a cancer clinic, diagnostic lab, and pathology lab; Yen et al. 2026 reviewed diagnostic error through SEIPS. [^source-check] | Applications include process mapping of specimen ordering, accessioning, testing, reporting, and failure points. Methods include observation, interviews, process analysis, and work-system decomposition. [^source-check] | Pathology-specific AI studies using SEIPS remain sparse. For AI adoption, this is a major research opportunity because SEIPS can tie model behavior to **where in the work system** gains and hazards actually appear. [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) [^source-check] |
| Queueing, simulation, and Lean | These approaches analyze flow, bottlenecks, delay, waste, and capacity. They map strongly to specimen accessioning, grossing, embedding, sectioning, scanning, sign-out, and turnaround time. | Raab et al. 2008 reported improved efficiency and quality after Lean implementation in a non-concurrent cohort study. Smith et al. 2012 reported lower process-dependent near-miss proportions, with unchanged operator-dependent near misses, after Lean-based redesign. Leeftink et al. 2016 and McClintock et al. 2012 modeled workflow and TAT. [Raab et al., 2008](https://doi.org/10.1136/jcp.2007.051326); [Smith et al., 2012](https://doi.org/10.1309/AJCP3YXID2UHZPHT) [^source-check] | Very strong fit for routine lab operations and digital transition logistics. Methods include TAT metrics, event logs, simulation, A3 root-cause analysis, kaizen, and before-after quality studies. [Smith et al., 2012](https://doi.org/10.1309/AJCP3YXID2UHZPHT) [^source-check] | Weakest where interpretation itself, rather than flow, is the bottleneck. For AI, these frameworks are most useful when AI is used to relieve **specific bottlenecks** such as triage, quality checks, or quantification, rather than as an abstract “diagnostic revolution.” [^source-check] |
| Normalization process theory | NPT explains how new practices become routine through sense-making, participation, collective action, and ongoing evaluation. Few theories map the *actual* adoption problem in pathology as directly. | Mikkelsen et al. 2022 explicitly used NoMAD/NPT before digital pathology implementation. King et al. 2023 used realist theory review and highlighted making sense, engagement, support, and perceived benefit. Staff-transition studies in 2024–2025 point in the same direction. [Mikkelsen et al., 2022](https://doi.org/10.3390/ijerph19127253); [King et al., 2023](https://doi.org/10.2196/38039) [^source-check] | Methods include NoMAD surveys, interviews, and process evaluation before and during implementation. Applications include pre-implementation readiness, staff expectations, and sustaining digital reporting. [Mikkelsen et al., 2022](https://doi.org/10.3390/ijerph19127253) [^source-check] | NPT does not evaluate model accuracy; it evaluates routinization. For AI, that is a strength: a model will not normalize unless pathologists can explain what it does, why it helps, and how its use fits daily work. [King et al., 2023](https://doi.org/10.2196/38039); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6) |
| Diffusion of innovations | Explains how technologies spread through professional networks via perceived relative advantage, compatibility, complexity, trialability, and observability. Historically very relevant to telepathology and digital pathology. | Telepathology adoption papers explicitly discussed diffusion and acceptance; Williams et al. 2017 made the case for clinical adoption; Betmouni 2021 highlighted how scaling beyond early adopters remains difficult. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240) [^source-check] | Useful for understanding early-adopter behavior, regional/national rollout, and why successful pilot centers do not automatically produce broad uptake. Methods are surveys, literature reviews, business-case and adoption narratives. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240) [^source-check] | Classical diffusion models can be too linear and optimistic. For AI, the chief lesson is that **compatibility with pathology culture** matters as much as technical advantage. Observability through validation and trusted case examples is especially important. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240); [Evans et al., 2022](https://pubmed.ncbi.nlm.nih.gov/34003251/) |
| High reliability and Safety II | Focuses on resilience, near-miss learning, sensitivity to operations, and maintaining safe performance under complexity. This is a natural fit for pathology QA and patient safety. | Zarbo’s “Fifteen-Year Journey to High Reliability” 2018; Banks et al. 2017 specimen-handling metrics; Choi et al. 2024 diagnostic safety paradigms; Smith et al. 2012 Lean and patient safety in pathology. [Smith et al., 2012](https://doi.org/10.1309/AJCP3YXID2UHZPHT) [^source-check] | Applied to quality metrics, defect tracking, amended reports, specimen handling, and safety culture. Methods include audit metrics, incident reporting, longitudinal QA, and organizational safety review. [^source-check] | Not a full theory of diagnosis, but highly important for **clinical AI governance**. AI should be monitored as a safety-critical component, with override logs, near-miss analysis, and post-deployment surveillance. [^source-check] |

**Interpretive and material theories**

| Theory | Concise definition and why it maps to pathology | Key empirical or seminal papers and recent reviews | Typical pathology applications and methods | Limitations and implications for AI adoption |
|---|---|---|---|---|
| Actor-network theory | ANT treats technologies, standards, devices, documents, and humans as jointly constituting practice. This is appealing in pathology because scanners, glass slides, barcodes, LIS fields, regulations, monitors, and pathologists all materially shape diagnosis. | Direct explicit ANT use in pathology is rare, but the strongest adjacent pathology studies are Kusta et al. 2024 and Geisler et al. 2025, both of which examine how actors, promises, and infrastructures reorganize work. [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650) [^source-check] | Best for ethnographic and STS-style analysis of digitization, policy expectations, procurement, and everyday workarounds. Methods include observation, document analysis, and actor tracing. [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650) [^source-check] | Weak quantitative traction and little pathology-specific formalization. Still useful for AI because it resists the false idea that “the model” alone drives adoption; the network around it does. [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650) [^source-check] |
| Boundary objects and semantic compression | Artifacts maintain a shared, stable identity across professional communities while supporting divergent local interpretations (Star & Griesemer 1989). In pathology, the report functions as a semantically compressed boundary object: contextually complete for human clinicians through shared professional context, but semantically underdetermined for secondary computational reuse (Wang 2026). | Star & Griesemer 1989; Keshet et al. 2013; Wang 2026 (*Precision Pathology*, DOI: 10.1016/j.prpath.2026.100002; [[The pathology report as a boundary object: From clinical communication to computational representation]]). | Analysis of multidisciplinary tumor board coordination, synoptic reporting (CAP), narrative-to-data extraction, and secondary AI/registry reuse. Methods include sociotechnical artifact analysis, ontology modeling (OSPR), and clinical narrative decomposition. | Indispensable for digital pathology and multimodal AI: explains why naive NLP token co-occurrence fails, why reports selectively omit reconstructable reasoning, and why downstream models hit a label-noise ceiling unless relational provenance and measurement modalities are explicitly represented. |
| Information theory | Information is treated as measurable signal under constraints such as noise, compression, entropy, and bandwidth. In pathology this maps to WSI quality, compression, artifact detection, entropy-based masking, and computational feature extraction. | Madabhushi & Lee 2016 reviewed machine learning challenges in digital pathology; Krupinski et al. 2012 studied compression vs observer performance; Song et al. 2023 developed entropy-based masking; Komura & Ishikawa 2024 reviewed ML methods in histopathology. [^source-check] | Used in image acquisition, QC, compression studies, segmentation, feature engineering, and AI pipeline design. Methods include entropy measures, compression fidelity testing, AUC comparison, and image-processing benchmarks. [^source-check] | It captures image/data problems well but does not itself describe clinical reasoning or accountability. For AI, it is crucial for **input quality, artifact tolerance, and uncertainty propagation**, but it must be paired with work-system theory. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8); [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) |
| Hermeneutics | A theory of interpretation emphasizing context, prior understanding, iterative reading, and meaning-making. Pathology is inherently interpretive: slides are read in light of history, site, report conventions, and clinical consequences. | Chetty 2017 explicitly linked pathology and radiology to medical hermeneutics; Rashid et al. 2022 proposed narrative online guides for interpreting digital pathology and tissue-atlas data; Crawford 2007 and Marchevsky 2015 addressed judgment and evidence-based pathology. [Chetty, 2017](https://doi.org/10.1136/jclinpath-2017-204391) [^source-check] | Useful for understanding second opinions, report language, uncertainty phrases, clinicopathologic correlation, and why expert explanation matters even when criteria exist. Methods are conceptual analysis, textual analysis, and narrative or interpretive design. [Chetty, 2017](https://doi.org/10.1136/jclinpath-2017-204391) [^source-check] | Compared with other frameworks, formal pathology empirics are sparse. For AI, hermeneutics argues against “black box replaces interpretation” thinking and supports explainable systems that help users situate findings within broader meaning. [Chetty, 2017](https://doi.org/10.1136/jclinpath-2017-204391); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6) |
| Embodied cognition | Cognition is partly constituted by bodily action and sensorimotor engagement. In pathology, a microscope-trained body learns habits of focusing, scanning, hand movements, and posture that change when work moves to digital devices. | Torre et al. 2020 included embodied cognition among theories widening clinical reasoning. Pathology workstation/device studies tested ergonomic devices and head tracking; voice and hands-free control were considered potentially useful in digital pathology. [^source-check] | Especially relevant to digital transition, ergonomics, navigation tools, and mixed-interface design. Methods include device-comparison studies, ergonomic assessment, usability testing, and interface experiments. [^source-check] | Evidence is thinner than for sociotechnical or visual-search models. For AI, the implication is simple but important: if a tool adds interaction friction, it changes cognition and may erode trust even when its accuracy is good. [^source-check] |
| Chaos theory | Emphasizes nonlinearity, emergent order, and sensitivity to initial conditions. In pathology, it has most often appeared in descriptions of tumor biology or as a metaphor for complexity rather than as a formal theory of laboratory practice. | McLendon 2011 explicitly borrowed a vocabulary of “self-organizing systems” and “complex adaptive systems” from chaos theory in neuropathology. Heng et al. 2022 and 2024 discussed genome chaos in cancer evolution. [^source-check] | Most useful as a cautionary language for heterogeneous tumors, phase change, and nonlinear diagnostic consequences; rarely used in workflow studies. Methods are largely conceptual or biological rather than organizational. [^source-check] | As a framework for pathology practice, support is weak and mostly metaphorical. For AI, it can remind researchers that pathological systems are not fully reducible to stable linear inputs and outputs, but it is not sufficient for implementation planning. [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) [^source-check] |

## Implications for AI adoption

A useful synthesis is that pathology AI enters practice through **four coupled pathways**: perception, cognition, workflow, and governance. If developers optimize only the first, the system is unlikely to survive contact with the other three. That is exactly what recent pathology implementation and ethnographic studies show: digitization promises speed, accuracy, and efficiency, but in daily practice the realized benefit depends on how the new tools land in routines, staffing, infrastructure, and case mix. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8); [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650) [^source-check]

```mermaid
flowchart TD
    A[AI model performance] --> B[Perceptual effects]
    A --> C[Cognitive effects]
    A --> D[Workflow effects]
    A --> E[Governance effects]

    B --> B1[Attention capture]
    B --> B2[Threshold shifting]
    B --> B3[Error reduction or new misses]

    C --> C1[Trust]
    C --> C2[Overreliance]
    C --> C3[Confidence calibration]

    D --> D1[Case triage]
    D --> D2[Turnaround time]
    D --> D3[Role redesign]

    E --> E1[Validation]
    E --> E2[Liability]
    E --> E3[Monitoring and QA]

    B1 --> F[Clinical adoption]
    C1 --> F
    D1 --> F
    E1 --> F
```

The following design implications are hypotheses and practical suggestions informed by the selected literature; their benefits need evaluation in the intended setting.

First, **task specificity matters**. Realist-review work found that the benefits pathologists seek vary by context: in specialist centers, AI is more often valued for reducing workload than for improving baseline accuracy, whereas in other settings standardization or access to expertise may matter more. The 2023 Delphi study likewise anticipated differentiated effects across pathology tasks rather than a single “AI replaces pathology” trajectory. [King et al., 2023](https://doi.org/10.2196/38039) [^source-check]

Second, **validation is not just technical equivalence**. CAP’s 2022 guideline update and RCPath best-practice guidance both emphasize real-world validation, training, and staged implementation. The RCPath document explicitly frames validation as a learning process, with basic skills training, practice with feedback, an initial retrospective training set, prospective live-case validation, a formal validation statement, and ongoing monitoring. [Evans et al., 2022](https://pubmed.ncbi.nlm.nih.gov/34003251/) [^source-check]

These WSI guidance documents concern the imaging system and its diagnostic use; they do not independently validate an AI output or provide a universal AI validation sample size.

Third, **trust must be engineered, not assumed**. In King’s realist review, pathologists were more likely to accept AI when they could make sense of it, engage in its adoption, receive support for adapting workflows, and identify a real local benefit. In Drogt’s interview study, pathologists were generally positive about AI, but raised precisely the kinds of issues that trust theory predicts: responsibility, prerequisites for safe use, and fit into decision-making. [King et al., 2023](https://doi.org/10.2196/38039); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6)

Fourth, **image-level accuracy does not guarantee clinic-level readiness**. The large 2024 meta-analysis found high pooled sensitivity and specificity but also widespread bias and reporting limitations. Complementary pathology reviews on development and regulation therefore stress digital infrastructure, pathologist participation, workflow modification, and reimbursement or cost-offset models as preconditions for widespread use. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8); [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018) [^source-check]

Fifth, **AI should be treated as a safety-critical work-system component**. High-reliability and Safety-II thinking suggest monitoring overrides, near misses, amended reports, failure modes, and performance drift after deployment. This is especially important because digital pathology systems are end-to-end imaging pipelines, not isolated algorithms, and because WSI toolchains remain device- and infrastructure-dependent. [^source-check]

In practical terms, the literature supports a pathology-AI adoption strategy that looks like this:

- choose **narrow, high-value use cases** first;
- validate in the **actual local workflow** with representative case mix;
- expose the model’s **uncertainty and failure modes**;
- measure **time, attention, confidence, and safety**, not just accuracy;
- redesign **roles, training, and escalation rules** at the same time as the software. [King et al., 2023](https://doi.org/10.2196/38039); [Evans et al., 2022](https://pubmed.ncbi.nlm.nih.gov/34003251/) [^source-check]

## Annotated bibliography and open questions

Below is the retained annotated bibliography. Linked core sources were checked as described above; entries marked with the source-check footnote remain verification leads. Descriptions of usefulness are editorial judgments.

**Brunyé TT, Mercan E, Weaver DL, Elmore JG. _Accuracy is in the eyes of the pathologist: The visual interpretive process and diagnostic accuracy with digital whole slide images._ J Biomed Inform. 2017;66:171-179. doi:10.1016/j.jbi.2017.01.004.**  
A foundational pathology observer-performance study linking diagnostic accuracy to experience, case difficulty, fixation patterns, and zooming behavior. Essential for any Gestalt, visual-search, or ecological account of pathology reasoning. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004)

**Lopes A, Ward AD, Cecchini M. _Eye tracking in digital pathology: A comprehensive literature review._ J Pathol Inform. 2024;15:100383. doi:10.1016/j.jpi.2024.100383.**  
A 2024 review of eye tracking in pathology. Useful for mapping evidence on expertise, fixations, panning, zooming, strategy, education, and machine-learning applications. [Lopes et al., 2024](https://doi.org/10.1016/j.jpi.2024.100383)

**Elmore JG et al. _Pathologists’ diagnosis of invasive melanoma and melanocytic proliferations: observer accuracy and reproducibility study._ BMJ. 2017;357:j2813.**  
A landmark pathology-specific reproducibility study showing how observer disagreement varies by diagnostic class. Indispensable for discussions of signal detection, thresholds, uncertainty, and metacognition. [Elmore et al., 2017](https://doi.org/10.1136/bmj.j2813)

**Drogt J, Milota M, Vos S, Bredenoord A, Jongsma K. _Integrating artificial intelligence in pathology: a qualitative interview study of users’ experiences and expectations._ Mod Pathol. 2022;35(11):1540-1550. doi:10.1038/s41379-022-01123-6.**  
A qualitative interview study of how pathologists and related professionals think about AI integration, prerequisites, responsibility, and workflow fit. A core sociotechnical source. [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6)

**King H, Wright J, Treanor D, Williams B, Randell R. _What Works Where and How for Uptake and Impact of Artificial Intelligence in Pathology: Review of Theories for a Realist Evaluation._ J Med Internet Res. 2023;25:e38039. doi:10.2196/38039.**  
A review of stakeholder theories to inform realist evaluation. It directly addresses pathologist trust, sense-making, and contextual benefit. [King et al., 2023](https://doi.org/10.2196/38039)

**Betmouni S. _Diagnostic digital pathology implementation: Learning from the digital health experience._ Digit Health. 2021;7:20552076211020240.**  
Important because it shows how little explicit implementation theory has been used in pathology compared with other digital-health fields, and argues for broader systems thinking. [Betmouni, 2021](https://doi.org/10.1177/20552076211020240)

**Kusta O, Bearman M, Gorur R, Risør T, Brodersen JB, Hoeyer K. _Speed, accuracy, and efficiency: The promises and practices of digitization in pathology._ Soc Sci Med. 2024;345:116650. doi:10.1016/j.socscimed.2024.116650.**  
A central STS/sociological paper showing the gap between policy promises and everyday pathology practice. Particularly valuable for ANT-like and sociotechnical readings. [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650)

**Geisler BL et al. _Streamlining a Patchwork: Exploring the Challenges of Digital Transformation in Pathology: Ethnographic Study._ J Med Internet Res. 2025;27:e63366. doi:10.2196/63366.**  
An ethnographic study of digital transformation in one pathology department. It documents fragmented workflows, adaptations, and staff efforts to make technologies fit local work; it does not quantify the relative importance of these factors against scanner procurement. [Geisler et al., 2025](https://doi.org/10.2196/63366).

**McGenity C et al. _Artificial intelligence in digital pathology: a systematic review and meta-analysis of diagnostic test accuracy._ npj Digit Med. 2024;7:114.**  
A broad systematic review of pathology AI diagnostic accuracy. It is especially useful because it pairs high pooled performance estimates with a clear account of pervasive bias and reporting weaknesses. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8)

**Cheng JY, Abel JT, Balis UGJ, McClintock DS, Pantanowitz L. _Challenges in the Development, Deployment, and Regulation of Artificial Intelligence in Anatomic Pathology._ Am J Pathol. 2021;191(10):1684-1692. doi:10.1016/j.ajpath.2020.10.018.**  
A strong pathology review on what actually has to change for AI to enter routine practice: digital platforms, IT, workflows, reimbursement, pathologist participation, and regulation. [Cheng et al., 2021](https://doi.org/10.1016/j.ajpath.2020.10.018)

**Evans AJ et al. _Validating Whole Slide Imaging Systems for Diagnostic Purposes in Pathology: Guideline Update From the College of American Pathologists in Collaboration With the American Society for Clinical Pathology._ 2022.**  
An authoritative guideline update. Essential for converting implementation theory into validation practice. [Evans et al., 2022](https://pubmed.ncbi.nlm.nih.gov/34003251/)

**Fraggetta F et al. _Best Practice Recommendations for the Implementation of a Digital Pathology Workflow in the Anatomic Pathology Laboratory._ Diagnostics. 2021.**  
European recommendations on digital pathology workflow implementation. Strong on operational prerequisites and multidisciplinary planning. [Fraggetta et al., 2021](https://doi.org/10.3390/diagnostics11112167)

**Mikkelsen MLN et al. _Prior to Implementation of Digital Pathology—Assessment of Expectations among Staff by Means of Normalization Process Theory._ Int J Environ Res Public Health. 2022;19(12):7253.**  
One of the few pathology studies to explicitly use NPT. Useful for assessing reported readiness and identifying potential barriers before rollout; the survey did not establish that readiness predicts successful adoption. [Mikkelsen et al., 2022](https://doi.org/10.3390/ijerph19127253)

**Raab SS et al. _Effect of Lean method implementation in the histopathology section._ 2008.**  
A classic pathology operations paper showing that Lean methods can materially improve efficiency and quality at the laboratory workflow level. [Raab et al., 2008](https://doi.org/10.1136/jcp.2007.051326)

**Smith ML et al. _The effect of a Lean quality improvement implementation program on surgical pathology specimen accessioning and gross preparation error frequency._ Am J Clin Pathol. 2012;138(3):367-373.**  
Important because it ties process redesign to patient-safety-relevant laboratory outcomes, not just efficiency language. [Smith et al., 2012](https://doi.org/10.1309/AJCP3YXID2UHZPHT)

**Chetty R. _Pathology and radiology taking medical hermeneutics to the next level._ J Clin Pathol. 2017.**  
A short but influential conceptual pointer for understanding pathology as interpretive work rather than only pattern classification. [Chetty, 2017](https://doi.org/10.1136/jclinpath-2017-204391)

**Müller CSL. _Cognitive Robustness in Dermatopathology—Diagnostic Thinking Beyond Rules and Routines._ J Cutan Pathol. 2025;52(11):728-731. doi:10.1111/cup.14861.**  
A recent conceptual contribution that links dermatopathology to recognition-primed and real-world decision-making traditions. Useful as a sign of where pathology theory is moving, even though the direct empirical base remains small. [Müller, 2025](https://doi.org/10.1111/cup.14861)

Open questions remain.

Direct **pathology-specific tests of cognitive theory** are still surprisingly limited. There are good studies of visual search, confidence, and disagreement, but fewer experiments that directly compare debiasing strategies, cue timing, explainability styles, or metacognitive interventions in pathologists rather than general clinicians. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004) [^source-check]

The literature is also much stronger on **pre-deployment accuracy** than on **post-deployment consequences**. What is still missing are long-term studies of how AI changes second-opinion behavior, case mix, staffing, training trajectories, burnout, amended reports, and laboratory safety over time. [McGenity et al., 2024](https://doi.org/10.1038/s41746-024-01106-8); [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6) [^source-check]

Finally, some of the most intellectually interesting frameworks—chaos, hermeneutics, ANT, and embodied cognition—remain **under-empiricized in pathology practice**. They are valuable not because they already have the strongest data, but because they expose dimensions that accuracy studies often neglect: interpretation, materiality, bodily routine, institutional promise, and the politics of technological change. [Chetty, 2017](https://doi.org/10.1136/jclinpath-2017-204391); [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650) [^source-check]

[^source-check]: **Source verification pending for this sentence or table cell.** At least one original citation could not be recovered confidently, or its claim-level support has not been checked. Retained author names and bibliography entries are search leads. A nearby linked source supports only its checked contribution, not every claim or design extrapolation in the cell.
