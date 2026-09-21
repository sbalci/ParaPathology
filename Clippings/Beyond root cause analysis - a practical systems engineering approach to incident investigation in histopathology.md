---
type: Clipping
status: Developing
language: en
title: "Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology"
source: "https://doi.org/10.1136/jcp-2026-210875"
source_type: article
author:
  - "[[Omar E. Rakha]]"
  - "[[Emad A. Rakha]]"
published: 2026-07-28
created: 2026-09-20
description: "Patient safety and diagnostic quality are central to modern histopathology, yet incident investigation remains heavily reliant on root cause analysis (RCA). While RCA offers an established mechanism for investigating incidents, its routine and universal application is insufficient for the highly variable, cognitive, sociotechnical and multifactorial nature of histopathology errors. A major limitation of current practice is the lack of proportionality, applying the same investigative methods to incidents regardless of complexity—from simple technical failures to complex system-level events. Furthermore, corrective actions often target immediate errors rather than the broader system context, inadvertently increasing workload, introducing new risks or compromising long-term service performance. This paper proposes a practical five-stage systems framework for incident management in histopathology: proportional incident classification, structured systems investigation, prospective evaluation of corrective actions, implementation of system-level improvements and continuous performance monitoring. By selectively applying human factors and quality improvement methodologies based on incident complexity, this framework shifts incident management from retrospective error investigation to proactive system optimization and continuous organizational learning. This approach improves diagnostic reliability, reduces incident recurrence and ensures safety interventions are sustainable and operationally feasible in routine practice."
tags:
  - "clippings"
  - "quality-assurance"
  - "patient-safety"
  - "histopathology"
  - "systems-engineering"
  - "laboratory-management"
  - "human-factors"
order: 230
belongs_to: "[[Clippings]]"
related_to:
  - "[[Laboratory Management]]"
  - "[[Quality And Standardisation]]"
  - "[[Theories and Frameworks for Understanding Pathology Practice]]"
  - "[[Pathology AI Integration: A Systems View]]"
  - "[[Cognitive Bias In AI Assisted Diagnosis]]"
  - "[[The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
---

# Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology

**Rakha OE, Rakha EA.** *Beyond root cause analysis: a practical systems engineering approach to incident investigation in histopathology.* Journal of Clinical Pathology (2026). Published online ahead of print: 28 July 2026. DOI: [10.1136/jcp-2026-210875](https://doi.org/10.1136/jcp-2026-210875). PMID: [42521512](https://pubmed.ncbi.nlm.nih.gov/42521512/).

- **Journal:** *Journal of Clinical Pathology* (BMJ Publishing Group)
- **PubMed:** [pubmed.ncbi.nlm.nih.gov/42521512](https://pubmed.ncbi.nlm.nih.gov/42521512/)
- **DOI:** [10.1136/jcp-2026-210875](https://doi.org/10.1136/jcp-2026-210875)
- **Affiliation:** Division of Cancer and Stem Cells, School of Medicine, University of Nottingham, Nottingham City Hospital, Nottingham, UK.

---

## Executive Summary & Verbatim Abstract

Modern histopathology services function under intense operational pressures, high sample throughput, complex multistep technical processing, and subjective cognitive interpretation. When adverse incidents or near-misses occur, clinical laboratories almost universally rely on **Root Cause Analysis (RCA)** (such as the "5 Whys" or Ishikawa fishbone diagrams) to investigate failures.

In this narrative review and methodology paper, Omar E. Rakha and Emad A. Rakha demonstrate that **traditional RCA is fundamentally ill-suited as a universal, one-size-fits-all tool for histopathology**. RCA was conceived in heavy manufacturing and industrial engineering for linear, deterministic mechanical systems. When uncritically applied to a complex, sociotechnical healthcare environment like histopathology, it produces superficial "human error" blame, ignores non-linear multifactorial drivers, and spawns administrative corrective actions that increase cognitive fatigue and create new hazards.

To resolve this crisis, the authors introduce a scalable, **five-stage systems engineering framework** tailored to the cognitive ecology and operational reality of modern cellular pathology laboratories.

> ### Verbatim Abstract
>
> "Patient safety and diagnostic quality are central to modern histopathology, yet incident investigation remains heavily reliant on root cause analysis (RCA). While RCA offers an established mechanism for investigating incidents, its routine and universal application is insufficient for the highly variable, cognitive, sociotechnical and multifactorial nature of histopathology errors. A major limitation of current practice is the lack of proportionality, applying the same investigative methods to incidents regardless of complexity—from simple technical failures to complex system-level events. Furthermore, corrective actions often target immediate errors rather than the broader system context, inadvertently increasing workload, introducing new risks or compromising long-term service performance.
>
> This paper proposes a practical five-stage systems framework for incident management in histopathology: proportional incident classification, structured systems investigation, prospective evaluation of corrective actions, implementation of system-level improvements and continuous performance monitoring. By selectively applying human factors and quality improvement methodologies based on incident complexity, this framework shifts incident management from retrospective error investigation to proactive system optimization and continuous organizational learning. This approach improves diagnostic reliability, reduces incident recurrence and ensures safety interventions are sustainable and operationally feasible in routine practice."

---

## Why Traditional Root Cause Analysis (RCA) Fails in Histopathology

```typescript
┌────────────────────────────────────────────────────────────────────────────────────────┐
│               TRADITIONAL RCA vs. SYSTEMS ENGINEERING IN HISTOPATHOLOGY                 │
└────────────────────────────────────────────────────────────────────────────────────────┘

  TRADITIONAL LINEAR ROOT CAUSE ANALYSIS (RCA)
  ─────────────────────────────────────────────
  Incident Occurs ──► Linear Search ("5 Whys") ──► Single "Root Cause" ──► Punitive / Administrative Fix
                                                    (Usually Individual    (Mandatory double-checking,
                                                     or Technical Lapse)    retraining, extra paperwork)
                                                                                       │
                                                                                       ▼
                                                                             Increases Workload &
                                                                             Spawns Novel Failure Modes

  PROPOSED 5-STAGE SYSTEMS ENGINEERING APPROACH
  ──────────────────────────────────────────────
  Incident Occurs ──► [Stage 1: HICF] ─────────► [Stage 2: HSIF] ────────► [Stage 3: CAIA]
                      Proportional Triage         Sociotechnical &        Prospective Risk/Impact
                      (Match depth to complexity) Human Factors Analysis  Assessment of Solutions
                                                                                       │
                                                                                       ▼
                      [Stage 5: Continuous] ◄─── [Stage 4: Implementation] ◄───────────┘
                      Closed-Loop Metrics &       Sustainable Co-Design in
                      Organizational Learning     Routine Laboratory Flow
```

The authors identify three fatal structural limitations in standard laboratory RCA practices:

### 1. The Fallacy of the "Root" Cause in Complex Adaptive Systems
Traditional RCA operates under the Newtonian reductionist assumption that a failure is the terminus of a linear chain of events traceable back to a single primary broken component or operator mistake. 
However, as explored in [[Theories and Frameworks for Understanding Pathology Practice]] and [[Pathology AI Integration: A Systems View]], a histopathology department is a **Complex Adaptive System (CAS)**. Errors emerge not from discrete broken parts, but from non-linear, dynamic interactions across:
- Specimen handling, accessioning, and cassette labeling
- Gross dissection ergonomics and tissue grossing complexity
- Automated chemical dehydration, clearing, and paraffin infiltration
- Microtomy sectioning thickness, water-bath temperature, and ribbon flotation
- Staining variability, cover-slipping artifacts, and slide drying
- Laboratory Information System (LIS) batch-tracking and barcode scanning
- Diagnostic microscopical examination under cognitive fatigue, time pressures, and clinical interruptions.

Emergent errors are multifactorial; attempting to isolate a single "root cause" artificially truncates the investigation, often landing unfairly on the last human in the chain (e.g., the microtomist or reporting pathologist).

### 2. Lack of Proportionality (Investigation Asymmetry)
Current accreditation and governance standards frequently mandate identical, rigid investigation protocols regardless of the incident's inherent nature:
- A simple, isolated mechanical barcode misread is subjected to exhaustive bureaucratic documentation.
- Meanwhile, an intricate cognitive diagnostic near-miss (e.g., subtle perineural invasion overlooked due to perceptual framing or visual search exhaustion) is squeezed into the same linear template.
This lack of proportionality causes severe **investigative fatigue**, cynicism among laboratory staff, and misallocation of clinical quality resources.

### 3. The Hazard of Untested Corrective Actions (Workload Inflation)
Standard RCA investigations inevitably conclude with well-intentioned but counterproductive administrative mandates:
- "Staff must be reminded to be more vigilant."
- "Mandatory double-witness signatures on all block transfers."
- "Additional diagnostic checklist forms to be completed prior to slide dispatch."

These corrective actions focus entirely on immediate symptoms. They treat human attention as an elastic resource, ballooning turnaround times and creating cognitive overload. In response, frontline staff create informal **workarounds (shadow workflows)** to cope with the delay, paradoxically introducing higher-risk failure modes than the one originally investigated.

---

## The Five-Stage Practical Systems Framework

To replace retrospective blame with durable system design, Rakha and Rakha outline a structured, operationalized five-stage pipeline:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                           THE FIVE-STAGE SYSTEMS FRAMEWORK                             │
├─────────────────────────┬──────────────────────────────────────────────────────────────┤
│ Stage 1: Proportional   │ Categorize incidents using the Histopathology Incident       │
│ Classification          │ Complexity Framework (HICF); match inquiry depth to risks    │
├─────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Stage 2: Structured     │ Apply the Histopathology Systems Investigation Framework     │
│ Systems Investigation   │ (HSIF) grounded in SEIPS and Human Factors Engineering       │
├─────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Stage 3: Prospective    │ Execute Corrective Action Impact Assessment (CAIA) to        │
│ Impact Assessment       │ simulate unintended hazards, workload creep, and bypasses   │
├─────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Stage 4: Workflow       │ Co-design engineered, high-leverage solutions and integrate   │
│ Implementation          │ them directly into daily routine laboratory operations       │
├─────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Stage 5: Continuous     │ Monitor balanced performance metrics (quantitative safety,   │
│ Learning & Auditing     │ turnaround impact) to ensure closed-loop resilience          │
└─────────────────────────┴──────────────────────────────────────────────────────────────┘
```

### Stage 1: Proportional Incident Classification (HICF)
The **Histopathology Incident Complexity Framework (HICF)** establishes an objective triage mechanism based on:
1. **Dominant Failure Mode:** Purely technical/mechanical, logistical/interface, or cognitive/interpretative.
2. **Coupling & Tightness:** Whether the error occurred in a loosely coupled step (where downstream checks naturally catch errors) or a tightly coupled cascade (where an error propagates instantaneously without safety buffers).
3. **Clinical Severity & Potential Harm:** Actual vs. potential risk to patient diagnosis and treatment staging.

By triaging events, low-complexity linear issues receive rapid, standardized corrective actions, preserving multidisciplinary expertise and investigative energy for high-complexity, sociotechnical incidents.

### Stage 2: Structured Systems Investigation (HSIF)
The **Histopathology Systems Investigation Framework (HSIF)** moves investigations from "who made the mistake" to "how did the system configure conditions to make this error predictable?"
Grounding its methodology in the **SEIPS (Systems Engineering Initiative for Patient Safety)** model, HSIF evaluates five interacting elements:
- **Person:** Expertise, fatigue, cognitive capacity, training, familiarity with specimen type.
- **Tasks:** Variety, pacing, interruption frequency, cognitive load, time pressure.
- **Tools & Technology:** Usability of LIS user interfaces, scanner display calibration, automated staining controls, physical microtome ergonomics.
- **Physical Environment:** Lighting, noise, ambient specimen odor, workspace layout, slide transport routes.
- **Organization & Culture:** Staffing ratios, production quotas, psychological safety, institutional response to incident reporting.

### Stage 3: Prospective Evaluation of Corrective Actions (CAIA)
Before any corrective policy or technical adjustment is finalized, it must undergo a **Corrective Action Impact Assessment (CAIA)**. This prospective evaluation poses critical questions:
- *Will this proposed intervention increase the cognitive or clerical burden on technical or medical staff?*
- *Does this intervention introduce a new single point of failure?*
- *Will the added friction tempt staff to bypass the step during peak turnaround crunches?*
- *Where does the intervention sit on the Hierarchy of Controls?* (Favoring architectural/engineered forcing functions and automated barcode lockouts over weak administrative memos or vigilance reminders).

### Stage 4: Implementation of System-Level Improvements
Corrective measures are developed through participatory co-design involving consultant pathologists, biomedical scientists (BMS), grossing room technicians, and LIS administrators. Changes are phased into routine workflows with pilot testing rather than sweeping overnight mandates.

### Stage 5: Continuous Performance Monitoring & Organizational Learning
Incident management concludes not with a signed investigation report, but with ongoing monitoring:
- **Balanced Scorecards:** Tracking error recurrence alongside operational velocity (turnaround time) and staff burnout indicators.
- **Psychological Safety:** Cultivating a *Just Culture* where near-misses are proactively submitted as valuable system telemetry rather than concealed out of fear of punitive scrutiny.

---

## Synthesis with Tolaria Vault Knowledge & Practice

The principles established by Rakha & Rakha deeply intersect with key theoretical and operational themes across this vault:

| Vault Concept / Note | Resonance with Rakha & Rakha (2026) |
| :--- | :--- |
| **[[Theories and Frameworks for Understanding Pathology Practice]]** | Validates the macro/meso sociotechnical view of pathology practice. Confirms that clinical quality cannot be safeguarded by micro-level cognitive vigilance alone, but demands robust systems engineering (SEIPS, high-reliability organization theory). |
| **[[Pathology AI Integration: A Systems View]]** | Aligns with the Model-Context-Relation (M-C-R) framework. If AI algorithms are deployed into a laboratory without systems engineering, algorithmic errors will be investigated with simplistic blame rather than treating the AI as an active sociotechnical node. |
| **[[Cognitive Bias In AI Assisted Diagnosis]]** | Highlights how time pressure, cognitive fatigue, and poorly designed interfaces exacerbate confirmation bias and automation bias during human-in-the-loop decision making. |
| **[[Quality And Standardisation]]** | Provides the modern theoretical answer to regulatory compliance: moving quality management away from defensive "unnecessary paperwork" toward genuine organizational learning and process resilience. |
| **[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]** | Complements the 5-phase heuristic framework for algorithmic equity by establishing an equivalent 5-stage systems framework for general laboratory safety and incident governance. |

---

## Related Notes

- **Quality & Laboratory Governance:** [[Quality And Standardisation]], [[Laboratory Management]], [[Laboratory Information Systems]]
- **Theories & Frameworks:** [[Theories and Frameworks for Understanding Pathology Practice]], [[Pathology AI Integration: A Systems View]]
- **Cognitive & Operational Safety:** [[Cognitive Bias In AI Assisted Diagnosis]], [[Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology]], [[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]]
- **Evidence & Evaluation:** [[The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth]], [[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]
