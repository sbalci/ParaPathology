---
type: Note
status: Developing
language: en
aliases:
  - "Articles on computational, digital, and mathematical pathology"
order: 90
belongs_to: "[[Digital Pathology]]"
---
# Articles on computational, digital, and mathematical pathology

#### Towards robust foundation models for digital pathology

Reviewed in [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md) — PathoROB, a public benchmark showing all 20 pathology foundation models tested encode the contributing hospital strongly enough to cause diagnostic failures (Kömen et al., Nature Communications 17, 5218, 2026), with code at [bifold-pathomics/PathoROB](https://github.com/bifold-pathomics/PathoROB).

#### Confirmation bias and time pressure during human–AI collaboration in computational pathology

Reviewed in [When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology](../Clippings/When%20Two%20Wrongs%20Don%27t%20Make%20a%20Right%20-%20Examining%20Confirmation%20Bias%20and%20the%20Role%20of%20Time%20Pressure%20During%20Human-AI%20Collaboration%20in%20Computational%20Pathology.md) — 28 pathologists estimated tumour cell percentage twice; when AI agreed with an initially wrong estimate, reliance on prior judgement collapsed (p=0.09) and AI advice dominated, while time pressure attenuated confirmation bias only because automation bias eclipsed it (Rosbach et al., CHI '25 / arXiv:2411.01007).

#### Cognitive biases in AI–assisted medical decision making: a primer for pathology

Reviewed in [Cognitive biases in AI-assisted medical decision making: A structured review as a primer for veterinary and human pathology](../Clippings/Cognitive%20biases%20in%20AI-assisted%20medical%20decision%20making%20-%20A%20structured%20review%20as%20a%20primer%20for%20veterinary%20and%20human%20pathology.md) — structured review across ACM, IEEE, and PubMed identifying 12 cognitive biases in AI-assisted medicine; revealed that across all medical specialties, only one primary study came from pathology, prompting author-developed hypothetical pathology vignettes as a practical primer (Rosbach et al., Veterinary Pathology 2026, PMID 42557856).

#### Screening efficiency over experience: Rapid target detection in digital cytology

Reviewed in [Screening efficiency over experience: Rapid target detection in low-power field as a modifiable cognitive biomarker for diagnostic accuracy in digital cytology](../Clippings/Screening%20efficiency%20over%20experience%20-%20Rapid%20target%20detection%20in%20low-power%20field%20as%20a%20modifiable%20cognitive%20biomarker%20for%20diagnostic%20accuracy%20in%20digital%20cytology.md) — eye-tracking study of 100 cytotechnologists and 28 students demonstrating the "experience paradox": years of experience showed no significant correlation with diagnostic accuracy ($r = 0.189$), while shorter fixation on low-power targets ("pop-out" detection) was the sole independent predictor ($p = .045$), with trainees acquiring expert selective noise neglect within 3 months (Abe et al., Cancer Cytopathology 2026, DOI: 10.1002/cncy.70132).

#### A distributional robustness margin for pathology foundation models

Reviewed in [A distributional robustness margin for pathology foundation models](../Clippings/A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md) — argues PathoROB's Robustness Index is structurally unfit for cross-model comparison and replaces it with CRoMa, a per-sample signed margin (Grisi, van der Laak & Litjens, arXiv:2607.25497), with the library evaluated in [CRoMa](croma.md).

#### Weakly supervised multiple instance learning histopathological tumor segmentation

Reviewed in [Weakly supervised MIL histopathological tumor segmentation](weakly-supervised-mil-histopathological-tumor-segmentation.md) — MIL tumor segmentation from slide-level labels only (Lerousseau et al., MICCAI 2020), with code and 6,481 released TCGA tumor maps at [MarvinLer/tcga_segmentation](https://github.com/MarvinLer/tcga_segmentation).

#### Tumor budding T-cell graphs: assessing the need for resection in pT1 colorectal cancer patients

Reviewed in [Tumor budding T-cell graphs for pT1 colorectal cancer](tumor-budding-t-cell-graphs-pt1-colorectal-cancer.md) — GNNs over tumor-bud/T-cell hotspot graphs raise the specificity of lymph-node-metastasis prediction by ~20 points over guideline stratification at equal sensitivity (Studer et al., MIDL 2023), with the pT1-HBTG dataset on [Zenodo](https://zenodo.org/records/7867085) and code at [digitalpathologybern/pT1-HBTG-MIDL2023](https://github.com/digitalpathologybern/pT1-HBTG-MIDL2023).

#### Reporting tumor budding in colorectal cancer: ITBCC 2016 consensus recommendations

Reviewed in [Recommendations for reporting tumor budding in colorectal cancer based on the International Tumor Budding Consensus Conference (ITBCC) 2016](<../Clippings/Recommendations%20for%20reporting%20tumor%20budding%20in%20colorectal%20cancer%20based%20on%20the%20International%20Tumor%20Budding%20Consensus%20Conference%20(ITBCC)%202016.md>) — landmark international consensus defining tumor budding as detached single cells or clusters $\le 4$ cells, standardizing the 0.785 mm² hotspot on H&E and introducing the 3-tier grading system (Bd1–Bd3) to guide surgical escalation in pT1 and adjuvant chemotherapy in stage II CRC (Lugli et al., Modern Pathology 2017).

#### What AI Can and Cannot Do in Pathology

Reviewed in [What AI Can and Cannot Do in Pathology](what-ai-can-and-cannot-do-in-pathology.md) — pathCast lecture by Dr. Rajendra Singh (UPenn; founder of PathPresenter), 2026-08-18. Argues the real risk is not replacement but **bypass** — slides shipped to commercial vendors whose predictions reach the oncologist directly — and that the answer is for departments to re-validate vendor models on their own data and own the governance layer — AI may be invisible in the workflow, but never unaudited in the record. Summarised from auto-generated captions; slides and demos not captured.

#### TRICARE: Deep-learning triage of 3D pathology datasets

Reviewed in [TRICARE: Deep-learning triage of 3D pathology datasets](tricare-deep-learning-triage-3d-pathology.md) — 2.5D context-aware deep learning triage for 3D open-top light-sheet microscopy, prioritizing high-risk 2D slices in prostate and Barrett's esophagus biopsies (Gao et al., Nature Biomedical Engineering 2026), with dataset at [TCIA](https://www.cancerimagingarchive.net/collection/pca_bx_3dpathology/), code at [alecgao066/TRICARE](https://github.com/alecgao066/TRICARE), and Zenodo record at [zenodo.20052262](https://doi.org/10.5281/zenodo.20052262).

#### From Samples to Knowledge 2025: QuPath Training Course

Reviewed in [From Samples to Knowledge 2025: QuPath Training Course](<../Clippings/From Samples to Knowledge 2025 - QuPath Training Course.md>) — 14-session practical curriculum from the La Jolla Institute for Immunology (Mikulski & McArdle) establishing QuPath v0.6.0+ best practices for 18-plex RareCyte Orion immunofluorescence, deep learning boundary segmentation (InstanSeg / DJL), headless Groovy batch scripting, composite object phenotyping, multimodal H&E registration (Warpy), spatial proximity transforms, and Paquo/QuBylab Python connectivity.

#### The benefits of building and working with interactive simulations Interactive simulations for better model intuition

{% embed url="[http://blog.mathematical-oncology.org/benefits-of-building-interactive-simulations.html](http://blog.mathematical-oncology.org/benefits-of-building-interactive-simulations.html)" %}

[**Paradoxical Dependencies of Tumor Dormancy and Progression on Basic Cell Kinetics**. Heiko Enderling, Alexander R.A. Anderson, Mark A.J. Chaplain, Afshin Beheshti, Lynn Hlatky and Philip Hahnfeldt. Cancer Res November 15 2009 (69) (22) 8814-8821; DOI: 10.1158/0008-5472.CAN-09-2115](https://cancerres.aacrjournals.org/content/69/22/8814.long)

#### Survival Prediction in Pancreatic Ductal Adenocarcinoma by Quantitative Computed Tomography Image Analysis

{% embed url="[https://link.springer.com/article/10.1245/s10434-017-6323-3](https://link.springer.com/article/10.1245/s10434-017-6323-3)" %}

## Computational, Digital & Mathematical Pathology

- [CompPath Lecture Series 2016-2017 Semester](https://www.youtube.com/playlist?list=PLwdWByS9hJ3IpNyN1Ge4dbfSV43296jLn)

CompPath Dr. Shikhar Uttam, Ph.D. Lecture (April 14th 2017)

[https://www.youtube.com/watch?v=6NFyB19D_fU&list=PLwdWByS9hJ3IpNyN1Ge4dbfSV43296jLn&index=2](https://www.youtube.com/watch?v=6NFyB19D_fU&list=PLwdWByS9hJ3IpNyN1Ge4dbfSV43296jLn&index=2)

- [Foundations of Computational and Systems Biology](https://ocw.mit.edu/courses/biology/7-91j-foundations-of-computational-and-systems-biology-spring-2014)

[https://ocw.mit.edu/courses/biology/7-91j-foundations-of-computational-and-systems-biology-spring-2014/video-lectures/](https://ocw.mit.edu/courses/biology/7-91j-foundations-of-computational-and-systems-biology-spring-2014/video-lectures/)

1. Introduction to Computational and Systems Biology

   [https://youtu.be/lJzybEXmIj0](https://youtu.be/lJzybEXmIj0)

2. Local Alignment (BLAST) and Statistics

[https://www.youtube.com/watch?time_continue=6&v=6Udqou3vmng](https://www.youtube.com/watch?time_continue=6&v=6Udqou3vmng)

[https://www.youtube.com/results?search_query=Philips+healthcare+pathology](https://www.youtube.com/results?search_query=Philips+healthcare+pathology)

- Biologists would love to program cells as if they were computer chips

[https://www.technologyreview.com/s/609663/biologists-would-love-to-program-cells-as-if-they-were-computer-chips/](https://www.technologyreview.com/s/609663/biologists-would-love-to-program-cells-as-if-they-were-computer-chips/)

- Using the principles of evolution to treat and prevent cancer

[https://www.statnews.com/2018/06/27/cancer-treatment-prevention-evolution/](https://www.statnews.com/2018/06/27/cancer-treatment-prevention-evolution/)
