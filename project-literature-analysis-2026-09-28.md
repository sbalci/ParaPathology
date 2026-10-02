---
type: Note
status: Developing
language: en
created: 2026-09-28
last_reviewed: 2026-09-28
publish: false
related_to:
  - "[[Digital Pathology]]"
  - "[[quality-and-standardisation]]"
  - "[[Statistics and Bioinformatics]]"
---

# ParaPathology: project and literature assessment

ParaPathology's strongest opportunity is to connect pathology education with critical appraisal of diagnostic tools, quantitative histology, and human–AI collaboration. Its breadth is valuable, and several recent notes already provide careful methodological synthesis. The next improvement should be more consistent evidence appraisal and source traceability, with focused corrections to consequential claims.

This assessment combines a repository inventory, close reading of selected notes, and targeted literature verification on 28 September 2026 using the **Life Sciences Literature** plugin's PubMed/NCBI Entrez and PMC skills, supplemented by primary publisher sources. It is a narrative project assessment, not a systematic review or a comprehensive medical-accuracy audit. The recommendations below are the assessor's synthesis unless explicitly attributed to a paper.

The findings and counts describe the pre-update snapshot. The implementation record at the end distinguishes the subsequent vault edits from work still requiring verification.

**Project scope and maturity**

The preface describes a multilingual collection for medical students, residents, and pathologists, covering both pathology and research tools. The vault contains teaching materials, reference collections, software reviews, statistical notes, laboratory-quality resources, and conceptual essays. It should be assessed as a developing knowledge resource rather than as one empirical research study.

The inventory below describes the vault before this assessment was added. It uses visible, nonignored Markdown files, excludes AGENTS/CLAUDE/GEMINI instructions and SUMMARY navigation, excludes assets and hidden/vendor/build folders, and separates type-definition notes from content. YAML parsed without errors.

| Measure | Result | Interpretation |
|---|---:|---|
| Content notes | 428 | Includes topic hubs and placeholders |
| Types | 242 Note; 52 Clipping; 48 Topic; 38 Tool; 32 Lecture; 15 Reference; 1 untyped preface | Different purposes need different review criteria |
| Status | 195 Stub; 141 Developing; 90 Evergreen; 2 unspecified | 78.5% are explicitly unfinished/developing |
| Heading-only or empty bodies | 49 | Breadth of navigation exceeds completed coverage |
| Recognizable DOI/PMID/PMCID pattern | 145 notes | Identifier presence does not verify a claim |
| At least one HTTP(S) link | 320 notes | Includes nonacademic sources |
| Recorded `last_reviewed` | 10 notes | All are computational-pathology Tool notes |

Do not interpret the 283 notes without recognizable scholarly identifiers as 283 defective research summaries: many are hubs, tools, lectures, or placeholders. Conversely, `Evergreen` is an editorial status, not a scientific evidence rating. Thirty-four of the 52 Clippings are marked Evergreen, but none has a `last_reviewed` field.

**Strengths worth extending**

- [[croma]] separates published results, software changes, reproducibility limitations, and local validation status. Its structure is a useful model for other computational notes.
- [[what-ai-can-and-cannot-do-in-pathology]] documents caption provenance, missing visual information, and unverified speaker claims. That explicit provenance is valuable, although each downstream clinical or regulatory assertion still needs appropriate support.
- [[wsinfer]] distinguishes a software-access paper from evidence of diagnostic performance. This is precisely the distinction needed across the tool catalogue.
- The connections among [[quality-and-standardisation]], computational pathology, statistics, and the theory notes can support a coherent curriculum on evaluating evidence and implementing tools.

**Priority findings**

| Priority | Existing note | Finding and recommended action |
|---|---|---|
| 1 | [[histopatoloji-calismalarinda-istatistik-icin-nasil-veri-hazirlanir]] | Replace the blanket rule that fewer than 30 observations requires Kruskal–Wallis and the statement that every missing cell necessarily removes a case from multivariable analysis. Preserve uncertain observations and define how they will be analyzed. |
| 1 | [[Theories and Frameworks for Understanding Pathology Practice]] | Replace raw conversation citation markers with verifiable claim-level references. Its suggested searches do not constitute a documented executed systematic search. Label the synthesis accordingly. |
| 1 | [[Considerations for digital pathology displays]] and [[quality-and-standardisation]] | Distinguish the authors' proposed procurement specifications from established diagnostic requirements. The paper's qualifications about refresh rate must accompany the numerical recommendation. |
| 2 | [[tumor-budding-t-cell-graphs-pt1-colorectal-cancer]] | Keep the proposed reduction in unnecessary surgery conditional. State the validation setting and uncertainty, and avoid equating similar sensitivity point estimates with proven equivalence. Narrow the claim about the superiority of multicellular graph features over distance measures. |
| 2 | [[Pathology AI Integration_ A Systems View]] | Present attractor and complex-systems explanations as conceptual hypotheses where empirical support is absent. Reconcile certainty with the more cautious [[Theoretical Frameworks for Understanding Pathology Practice]]. |
| 2 | [[Clinical validation of an AI-based pathology tool for scoring of metabolic dysfunction-associated steatohepatitis]] | Preserve the intended use in trial scoring. Describe archived specimens and prospectively collected reader assessments separately; “retrospective” alone is an incomplete description of the study. |

The statistical correction is supported by primary methodological work. Blanca and colleagues found acceptable ANOVA Type I error under the equal-variance simulation conditions they examined, including five observations per group. This contradicts a universal sample-size-30 rule; it does not establish adequate power or robustness to every variance pattern. Test selection should reflect the question, outcome scale, design, dependence, distribution, and variance assumptions. [Blanca et al., 2017](https://doi.org/10.7334/psicothema2016.383).

Complete-case analysis excludes observations missing variables needed by that model. Alternative approaches, including multiple imputation, have different assumptions and limitations. White and Carlin's theoretical and simulation comparison demonstrates why the missingness mechanism matters and why neither automatic deletion nor automatic imputation is universally appropriate. [White and Carlin, 2010](https://doi.org/10.1002/sim.3944).

The display paper was checked in full through the open-access file located by the PMC skill. Its Table 2 recommends 120 Hz but explicitly considers 60 Hz adequate, with the higher rate offering subjectively smoother viewing. It lists 4 MP as the minimum resolution and describes a trend toward 8 MP. These are proposed recommendations informed by the commercial product distribution, experience, and evidence—not a demonstrated universal diagnostic threshold. The vault's assertions that 120 Hz eliminates motion blur and 8 MP significantly increases throughput require specific supporting evidence beyond this table. The detailed Band C assertion was not resolved in this targeted check. [Brettle et al., 2026](https://pmc.ncbi.nlm.nih.gov/articles/PMC13578409/).

**A focused evidence map**

These papers connect directly to the vault's recent interests. Each supports a bounded conclusion; none independently establishes that a tool is appropriate for a particular local clinical deployment.

| Theme and verified source | Evidence checked | Implication for the vault |
|---|---|---|
| Foundation-model robustness: [Kömen et al., 2026; PMID 42277006](https://www.nature.com/articles/s41467-026-73923-2) | PathoROB examined 20 models and detected robustness deficits linked to nonbiological variation. Mitigation reduced but did not eliminate the evaluated problems. | Compare models on transfer across institutions and technical conditions, as well as task accuracy. Avoid a universal “best model” ranking. |
| Human–AI interaction: [Frei et al., 2025; PMID 40610733](https://link.springer.com/article/10.1007/s00428-025-04163-w) | A reader experiment used 10 colorectal-cancer regions. Assistance reduced variability, but some participants moved toward an incorrect algorithm output on one image. | Agreement, accuracy, and susceptibility to incorrect assistance need separate outcomes. The small ROI experiment does not establish routine-workflow benefit. |
| Quantitative liver histology: [Pulaski et al.; online 2024, issue 2025; PMID 39496972](https://pmc.ncbi.nlm.nih.gov/articles/PMC11750710/) | In 1,481 cases, assisted reads improved agreement with the consensus reference for ballooning and inflammation and met non-inferiority for steatosis and fibrosis. The paper used archived trial material with prospectively collected reads. | Retain the trial-scoring context, reference-standard construction, and comparator. The authors state that routine diagnostic use could require further training or validation. |
| Incremental biomarker value: [Äijälä et al., 2026; PMID 41790186](https://link.springer.com/article/10.1007/s00428-026-04471-9) | Two CRC cohorts, 776 and 1,100 patients, showed an adverse prognostic association for bud distance but no additional prognostic information beyond conventional budding in the reported analyses. | This limits claims for the evaluated distance feature. It neither disproves every spatial biomarker nor proves the benefit of bud–lymphocyte graph models. |
| Digital-system validation: [Evans et al., 2022; PMID 34003251](https://pubmed.ncbi.nlm.nih.gov/34003251/) | The CAP guideline update addresses diagnostic WSI validation, including comparison with glass slides. | Add a clear distinction between validating a WSI system and validating an AI model's diagnostic or prognostic output. A WSI validation sample requirement is not an AI sample-size prescription. |

**Methods literature to add to the evidence-appraisal workflow**

Targeted searches of the current notes did not find explicit use of TRIPOD+AI, PROBAST+AI, STARD-AI, or DECIDE-AI. These would make useful shared references, selected according to the question rather than applied indiscriminately.

| Resource | Appropriate role |
|---|---|
| [TRIPOD+AI, 2024; PMID 38626948](https://doi.org/10.1136/bmj-2023-078378) | Reporting development and evaluation of clinical prediction models using regression or machine learning |
| [PROBAST+AI, 2025; PMID 40127903](https://www.bmj.com/content/388/bmj-2024-082505) | Appraising model-development quality, performance-evaluation bias, and applicability |
| [STARD-AI, 2025; PMID 40954311](https://www.nature.com/articles/s41591-025-03953-8) | Reporting diagnostic-accuracy studies involving AI |
| [DECIDE-AI, 2022; PMID 35584845](https://www.bmj.com/content/377/bmj-2022-070904) | Reporting early, live clinical evaluation of AI decision support, including the human and workflow context |

Reporting completeness and risk of bias are different assessments. A well-reported study can still have biased estimates, limited applicability, or no demonstrated clinical benefit.

**Recommended next work**

1. Correct the statistical teaching statements and recover citations in the theory synthesis first. These affect how readers interpret evidence across the whole vault.
2. Build one digital-pathology evidence hub from a small, fully appraised set of papers. Use the five themes above to connect existing notes before expanding the catalogue further.
3. For each appraised study, record the clinical question; study design; patients, specimens, and slides separately; institution/scanner/stain setting; reference standard and adjudication; data-split unit; external validation; effect estimates and uncertainty; intended use; limitations; source identifiers; and review date. For prediction studies, add calibration and incremental value where relevant. For reader studies, add assisted versus unassisted error patterns and workflow outcomes.
4. Keep editorial maturity and appraisal status separate. Proposed optional fields are `review_status`, `study_design`, `doi`, `pmid`, and `last_reviewed`. Prefer explicit domains over a single unexplained numerical “evidence score.”
5. Add a review queue based on appraisal status or review date. The current `views/clippings-to-process.yml` only finds missing `related_to` links: it matches seven Clippings and cannot identify linked but unappraised notes.

Three feasible research directions follow from this synthesis: a structured evidence map of GI/liver histology AI by intended use and validation setting; a reader study measuring whether AI improves both accuracy and agreement while examining incorrect suggestions; and a cohort study testing whether spatial tumor-budding features add calibrated prognostic value beyond conventional assessment. These are project ideas, not claims of novelty, and each would need a dedicated search and study protocol.

**Search and verification record**

All searches below were run on 2026-09-28 through the plugin's `ncbi_entrez.py`, with `db=pubmed` and `retmax=10`. Counts are returned identifiers, not the total number of matching publications. A result of 10 means the retrieval cap was reached. The first six searches used `sort=relevance`; the three follow-ups used the default ordering.

| Search | Exact query or query specification | Returned |
|---|---|---:|
| Foundation-model validation | `(pathology[Title/Abstract]) AND ("foundation model"[Title/Abstract] OR "foundation models"[Title/Abstract]) AND (validation[Title/Abstract] OR robustness[Title/Abstract]) AND ("2023/01/01"[Date - Publication] : "2026/09/28"[Date - Publication])` | 10 |
| Existing studies | OR-combination of the six DOI queries listed below | 5 |
| Reporting and bias | `TRIPOD+AI[Title] OR STARD-AI[Title] OR PROBAST+AI[Title] OR DECIDE-AI[Title]` | 10 |
| WSI validation, initial | `"Validating Whole Slide Imaging"[Title] AND ("2021/01/01"[Date - Publication] : "2026/09/28"[Date - Publication])` | 0 |
| Human–AI interaction | `(pathology[Title/Abstract]) AND ("automation bias"[Title/Abstract] OR "confirmation bias"[Title/Abstract]) AND ("2023/01/01"[Date - Publication] : "2026/09/28"[Date - Publication])` | 10 |
| Budding consensus, initial | `"Recommendations for reporting tumor budding in colorectal cancer"[Title]` | 0 |
| WSI validation, broadened | `whole slide imaging validation guideline Pantanowitz Evans` | 3 |
| Budding consensus, broadened | `tumor budding ITBCC 2016 Lugli` | 8 |
| Model-selection DOI follow-up | `"10.1038/s41598-026-69731-9"` | 0 |

The exact existing-study query was:

```text
"10.1038/s41591-024-03301-2"[AID] OR "10.1007/s00428-026-04471-9"[AID] OR "10.1038/s41467-026-73923-2"[AID] OR "10.1038/s41598-026-69731-9"[AID] OR "10.1016/j.jpi.2026.100707"[AID] OR "10.1038/s41551-026-01760-1"[AID]
```

Publication summaries were retrieved for the 25 records returned by the existing-study, reporting/bias, and human–AI searches. Nine selected records were fetched for compact abstract information: 42277006, 39496972, 41790186, 42750855, 40610733, 38626948, 40127903, 40954311, and 35584845. The plugin truncates abstract previews; substantive findings above were checked against accessible publisher text or the PMC full-text files, not inferred from truncated previews or metadata alone. Irrelevant search returns and the reporting-guideline protocol/editorial were not treated as empirical evidence.

The PMC skill resolved PMC13578409 and PMC11750710 and returned current open-access text locations. Relevant full-text passages were read for the display and AIM-MASH checks. Metadata reported both records as not retracted at retrieval; this is a dated metadata observation, not a guarantee of study validity.

Checked-but-empty lookups are retained in the table above and are not evidence that a paper does not exist. In particular, the model-selection DOI in the vault was not independently resolved in this check and should remain a verification task. Initial WSI and budding title searches were broadened successfully. Some web pages returned access errors; the two PMC papers were subsequently accessed through their official public file locations. No preprint search was needed for the selected conclusions; preprint-only claims elsewhere in the vault remain outside this assessment.

The review did not verify every citation, classification update, guideline, software version, or numerical claim in the vault. It did not assess patient data, reproduce models, or perform a full external-link crawl. The initial assessment left existing notes unchanged; subsequent edits are recorded below.

## Vault update — 28 September 2026

- Added [[digital-pathology-evidence]] as a focused evidence hub and [[ai-study-appraisal]] as a shared guide to reporting resources, appraisal and review metadata. Added a worked reader-study example to [[cognitive-bias-in-ai-assisted-diagnosis]].
- Corrected the statistical teaching rules, qualified the clinical implications of the budding graph study, and distinguished the display authors' procurement proposals from diagnostic requirements. Clarified AIM-MASH's trial-scoring context, study timing and reference comparisons.
- Repaired identifiable source links in the theory synthesis and distinguished conceptual systems explanations from established causal evidence. Remaining source checks are explicitly marked rather than represented as completed.
- Added scoped review records and identifiers to selected notes. The new **Evidence to Review** view includes unappraised Clippings even when they already have topic links, as well as notes explicitly marked for further review. Editorial `status` remains separate from appraisal progress.

Formal domain-level appraisals, full numerical re-extraction, unresolved theory citations, the display paper's detailed banding/QA assertions, and the model-selection source remain outstanding. No model was reproduced or clinically validated by these edits.
