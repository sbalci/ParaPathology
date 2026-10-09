---
type: Note
status: Developing
language: en
aliases:
  - "Image Analysis"
order: 110
belongs_to: "[[Digital Pathology]]"
---

# Image Analysis

## A reproducible first analysis

Start with a small, representative pilot before processing a cohort. The checklist below is an educational workflow for research measurements, not an assay validation protocol or a clinical scoring recommendation. For diagnostic deployment, use the [WSI usage and validation guide](about-the-usage-of-digital-pathology.md).

### 1. Define the measurement before choosing the model

Write down the tissue, stain, target compartment, unit of analysis, inclusion/exclusion rules, and expected output. A cell count, cell density, positive-cell fraction, and positive-stained area answer different questions. For example, report density with its analysed area and units, and report a positive-cell fraction with an explicit denominator. Decide how multiple regions and slides will contribute to one patient-level result before looking at outcomes.

### 2. Inspect and calibrate the images

Check focus, tissue completeness, folds, debris, staining variation, and region selection. Record exclusions and their reasons. In QuPath, verify the image type and pixel width/height before measuring: a file opening successfully does not establish that physical measurements are calibrated. Use the [official first-steps tutorial](https://qupath.readthedocs.io/en/stable/docs/starting/first_steps.html) to check these properties.

### 3. Pilot detection and classification separately

Begin with small regions spanning relevant variation, including difficult examples. Inspect whether nuclei/cells are split, merged, or missed; then inspect the classification assigned to correctly detected objects. Check the staining compartment and threshold used for the question. QuPath's [cell-detection tutorial](https://qupath.readthedocs.io/en/stable/docs/tutorials/cell_detection.html) demonstrates this process and notes that detection should be repeated after changing stain estimates. Its example thresholds are tutorial settings, not transferable assay cutoffs.

Keep annotated examples of acceptable results and failures. Agree on a reference annotation/scoring process and how disagreements will be handled. The [Gold Standard Paradox paper](https://doi.org/10.5858/arpa.2016-0386-RA) is useful background when judging an automated score against manual assessment.

### 4. Freeze settings and protect the evaluation

Record the software and extension versions, model/checkpoint, preprocessing, physical resolution, region definitions, thresholds, and any post-processing. Keep development and final evaluation separate. If testing generalisation to new patients, assign all slides and derived tiles from a patient to the same split; random tile splitting can leak patient information into both training and evaluation. See the primary study [AI slipping on tiles: data leakage in digital pathology](https://arxiv.org/abs/1909.06539) and the methodological discussion [Guiding questions to avoid data leakage](https://www.nature.com/articles/s41592-024-02362-y).

### 5. Export results with enough context to reproduce them

Save the project, scripts, classifiers, annotations, and a measurement table with stable study identifiers, units, denominators, exclusions, and run/version information. QuPath's [measurement-export guide](https://qupath.readthedocs.io/en/stable/docs/tutorials/exporting_measurements.html) distinguishes image-, annotation-, and detection-level output. Choose the level that matches the planned analysis rather than treating every detected cell as an independent patient.

Keep the source images and check that the saved project reopens them: a [QuPath project](https://qupath.readthedocs.io/en/stable/docs/tutorials/projects.html) generally stores paths to images, not copies of the images themselves. A useful pilot deliverable is one results table, a saved reproducible workflow, and a short QC log documenting where it fails.

**Source check:** 1 October 2026, for the practical workflow and linked documentation above. No images or analysis pipeline were run as part of this note.

## Tutorials and collected resources

[Training deep AI pipelines with Biodock](https://www.youtube.com/watch?v=yUNyonBgBIs\&ab\_channel=MichaelLee)

{% embed url="https://www.youtube.com/watch?v=yUNyonBgBIs&ab_channel=MichaelLee" %}

{% embed url="https://www.youtube.com/watch?v=9fEDSOUbGFA&t=1955s&ab_channel=TIAWarwick" %}

## Bioimage Analysis 2020

#### [01a Introduction to Bio-Image Analysis](https://www.youtube.com/watch?v=e-2DbkUwKk4)

{% embed url="https://www.youtube.com/watch?v=e-2DbkUwKk4" %}

#### [01b Introduction to Bio-Image Analysis with Fiji](https://www.youtube.com/watch?v=Akedfyp5AxY)

{% embed url="https://www.youtube.com/watch?v=Akedfyp5AxY" %}

#### [lecture\_applied\_bioimage\_analysis\_2020](https://git.mpi-cbg.de/rhaase/lecture\_applied\_bioimage\_analysis\_2020)

{% embed url="https://git.mpi-cbg.de/rhaase/lecture_applied_bioimage_analysis_2020" %}

## Challenges and further tools

* Grand Challenges in Biomedical Image Analysis: [grand-challenge.org](https://grand-challenge.org/)
* Fiji: [fiji.sc](https://fiji.sc/)
* 3D Volumetric Pathology Triage: [TRICARE: Deep-learning triage of 3D pathology datasets](tricare-deep-learning-triage-3d-pathology.md) — 2.5D context-aware deep learning framework for triaging open-top light-sheet microscopy (OTLS) datasets in prostate and Barrett's esophagus biopsies (Gao et al., *Nature Biomedical Engineering* 2026).

