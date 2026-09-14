---
type: Clipping
status: Developing
language: en
title: "Clinical validation of an AI-based pathology tool for scoring of metabolic dysfunction-associated steatohepatitis"
source: "https://doi.org/10.1038/s41591-024-03301-2"
source_type: article
author:
  - "[[Hanna Pulaski]]"
  - "[[Stephen A. Harrison]]"
  - "[[Shraddha S. Mehta]]"
  - "[[Arun J. Sanyal]]"
  - "[[Marlena C. Vitali]]"
  - "[[Laryssa C. Manigat]]"
  - "[[Hypatia Hou]]"
  - "[[Susan P. Madasu Christudoss]]"
  - "[[Sara M. Hoffman]]"
  - "[[Adam Stanford-Moore]]"
  - "[[Robert Egger]]"
  - "[[Jonathan Glickman]]"
  - "[[Murray Resnick]]"
  - "[[Neel Patel]]"
  - "[[Cristin E. Taylor]]"
  - "[[Robert P. Myers]]"
  - "[[Chuhan Chung]]"
  - "[[Scott D. Patterson]]"
  - "[[Anne-Sophie Sejling]]"
  - "[[Anne Minnich]]"
  - "[[Vipul Baxi]]"
  - "[[G. Mani Subramaniam]]"
  - "[[Quentin M. Anstee]]"
  - "[[Rohit Loomba]]"
  - "[[Vlad Ratziu]]"
  - "[[Michael C. Montalto]]"
  - "[[Nick P. Anderson]]"
  - "[[Andrew H. Beck]]"
  - "[[Katy E. Wack]]"
published: 2024-11-04
created: 2026-09-14
description: "Metabolic dysfunction-associated steatohepatitis (MASH) is a major cause of liver-related morbidity and mortality, yet treatment options are limited. Manual scoring of liver biopsies, currently the gold standard for clinical trial enrollment and endpoint assessment, suffers from high reader variability. This study represents the most comprehensive multisite analytical and clinical validation of an artificial intelligence (AI)-based pathology system, AI-based measurement of metabolic dysfunction-associated steatohepatitis (AIM-MASH), to assist pathologists in MASH trial histology scoring. AIM-MASH demonstrated high repeatability and reproducibility compared to manual scoring. AIM-MASH-assisted reads by expert MASH pathologists were superior to unassisted reads in accurately assessing inflammation, ballooning, MAS ≥ 4 with ≥1 in each score category and MASH resolution, while maintaining non-inferiority in steatosis and fibrosis assessment. These findings suggest that AIM-MASH could mitigate reader variability, providing a more reliable assessment of therapeutics in MASH clinical trials."
tags:
  - "clippings"
order: 130
belongs_to: "[[Clippings]]"
related_to:
  - "[[Liver Pathology]]"
  - "[[Approach to Liver Biopsies]]"
  - "[[The Gold Standard Paradox in Digital Image Analysis Manual Versus Automated Scoring as Ground Truth]]"
  - "[[Image Analysis]]"
  - "[[Digital Pathology]]"
---
## Summary

The analytical and clinical validation of **AIM-MASH**, an AI tool for scoring liver biopsies in metabolic dysfunction-associated steatohepatitis (MASH) drug trials. In these trials, histology decides who is enrolled and is the surrogate endpoint for accelerated approval. It is scored by hand on the NASH CRN system, with enough inter- and intra-reader variability to sink an underpowered phase 2b trial or force expensive consensus re-reads.

The study tested the algorithm on its own and as an assistant to expert hepatopathologists across 1,481 cases from completed global trials, against a consensus ground truth. AI-assisted reads were **superior** to unassisted reads for lobular inflammation, hepatocellular ballooning, the enrolment criterion MAS ≥ 4 (with ≥ 1 in each component) and MASH resolution, and **non-inferior** for steatosis and fibrosis. The algorithm's repeatability across scans and reproducibility across sites exceeded agreement between the study's own pathologists.

> The abstract in the `description:` frontmatter is the paper's own, verbatim. The sections below are my own-words digest of the abstract and the open-access full text in PubMed Central.

## Citation

Pulaski H, Harrison SA, Mehta SS, Sanyal AJ, Vitali MC, Manigat LC, et al. Clinical validation of an AI-based pathology tool for scoring of metabolic dysfunction-associated steatohepatitis. *Nat Med*. 2025;31(1):315–322. Epub 2024 Nov 4. doi: [10.1038/s41591-024-03301-2](https://doi.org/10.1038/s41591-024-03301-2). PMID: [39496972](https://pubmed.ncbi.nlm.nih.gov/39496972/). PMCID: [PMC11750710](https://pmc.ncbi.nlm.nih.gov/articles/PMC11750710/).

- **Model:** AIM-MASH (AI-based measurement of MASH)
- **Access:** open access, full text in PubMed Central

## Study at a glance

| Item | Detail |
|---|---|
| Development (described in an earlier paper) | 103,579 pathologist annotations on 6,235 H&E and 6,223 Masson's trichrome WSIs from six completed phase 2b/3 MASH trials |
| Architecture | Convolutional networks segment features into overlays and area proportions; graph neural networks predict the ordinal NASH CRN grade or stage per feature |
| Validation set | 1,481 cases from completed trials of three drug candidates (semaglutide, pegbelfermin, resmetirom); about 13,000 independent reads |
| Ground truth | Two panels of hepatopathologists, each two primary readers plus a shared blinded tiebreaker, with a consensus call when all three disagreed |
| Comparators | Independent unassisted manual readers; AIM-MASH alone; AIM-MASH-assisted pathologists |
| Statistics | Non-inferiority margin of −0.1 in linearly weighted kappa against ground truth, then superiority testing |
| Scanner | Leica Aperio AT2 at ×40 |

## Key findings

- **Repeatability.** The same slides scanned on three separate days gave mean agreement of 0.93–0.96 across steatosis, lobular inflammation, ballooning and fibrosis.
- **Reproducibility across sites.** With three external laboratories, operators and scanners, ballooning (0.91) met the 0.85 goal. Steatosis (0.86), lobular inflammation (0.85) and fibrosis (0.87) sat at the goal, with lower confidence bounds just below it. Every component still beat mean pairwise agreement between the study's pathologists.
- **Algorithm alone vs manual readers.** Superior for ballooning (+0.15 weighted kappa) and lobular inflammation (+0.12); non-inferior for steatosis and fibrosis.
- **AI-assisted pathologists.** Same pattern: superior for ballooning and inflammation, non-inferior for steatosis and fibrosis. For the trial composites, agreement with ground truth rose from 0.51 to 0.63 for MAS ≥ 4 with ≥ 1 in each category, and from 0.37 to 0.54 for MASH resolution.
- **A second reference.** Because the consensus read is itself variable, AI-assisted reads were also compared with the median of a separate pathologist panel. Non-inferiority held for every component.
- **Overlays.** Three hepatopathologists judged the feature heatmaps on up to 160 frames per feature (from 222 WSIs). All overlays met the false-positive criterion. All except ballooning met the true-positive criterion; ballooning scored 0.87 and narrowly missed. The pathologists fully agreed that ballooning was present in only 55% of the frames any of them flagged.
- **Assist workflow.** The pathologist checks adequacy, staining and additional findings, but may override an AIM-MASH score only for a discrepancy of two points or more. The limit is deliberate, to stop inter-reader variability from creeping back in.

## Limitations noted by the authors

- Reads were retrospective on archived trial material, so pathologists could not request re-stains or re-scans. Non-evaluable cases were under 4%.
- New trial populations or drugs with novel mechanisms may challenge the locked algorithm, so ongoing performance monitoring is planned.
- The validated use is clinical-trial scoring. Routine diagnostic MASLD use may need further training and validation.

## On the lecture slide

First row of a lecture slide titled *"Top quantitative models in GI/liver path"*:

| Disease | Model | Output | Training set | Reference |
|---|---|---|---|---|
| MASH | AIM-MASH (+qFIBS, Heinemann) | Steatosis, inflammation, ballooning, fibrosis scores | ~103,579 annotations / 12,458 WSIs | Pulaski et al. Nat Med. 2025 |

The training figure **matches** the paper's Methods: 103,579 annotations on 6,235 + 6,223 = 12,458 WSIs. The slide's "+qFIBS, Heinemann" refers to other MASH quantification tools that are not part of this paper and are not captured here `[unverified]`.
