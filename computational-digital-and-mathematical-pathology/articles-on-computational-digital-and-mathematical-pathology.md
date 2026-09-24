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

#### Class visualizations and activation atlases for computational pathology

Reviewed in [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md) — concept-level interpretability framework that adapts class visualizations and activation atlases to a frozen UNI pathology foundation model. Four pathologists showed that synthetic concepts remain recognizable for distinct colorectal tissue classes but become ambiguous as cancer labels grow morphologically overlapping: NCT Fleiss' κ fell from 0.755 on real patches to 0.313 on class visualizations, while activation atlases ranged from κ = 0.82 for coarse cancer groupings to κ = 0.11 for subclasses. The method is positioned as an audit of representation structure and taxonomy—not a diagnostic or causal explanation tool (Gustav et al., *Cell Reports Medicine* 7:103054, 2026, DOI: 10.1016/j.xcrm.2026.103054). Code at [KatherLab/PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas).

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

Reviewed in Weakly supervised MIL histopathological tumor segmentation — MIL tumor segmentation from slide-level labels only (Lerousseau et al., MICCAI 2020), with code and 6,481 released TCGA tumor maps at [MarvinLer/tcga_segmentation](https://github.com/MarvinLer/tcga_segmentation).

#### Tumor budding T-cell graphs: assessing the need for resection in pT1 colorectal cancer patients

Reviewed in Tumor budding T-cell graphs for pT1 colorectal cancer — GNNs over tumor-bud/T-cell hotspot graphs raise the specificity of lymph-node-metastasis prediction by ~20 points over guideline stratification at equal sensitivity (Studer et al., MIDL 2023), with the pT1-HBTG dataset on [Zenodo](https://zenodo.org/records/7867085) and code at [digitalpathologybern/pT1-HBTG-MIDL2023](https://github.com/digitalpathologybern/pT1-HBTG-MIDL2023).

#### Reporting tumor budding in colorectal cancer: ITBCC 2016 consensus recommendations

Reviewed in [Recommendations for reporting tumor budding in colorectal cancer based on the International Tumor Budding Consensus Conference (ITBCC) 2016](<../Clippings/Recommendations%20for%20reporting%20tumor%20budding%20in%20colorectal%20cancer%20based%20on%20the%20International%20Tumor%20Budding%20Consensus%20Conference%20(ITBCC)%202016.md>) — landmark international consensus defining tumor budding as detached single cells or clusters $\le 4$ cells, standardizing the 0.785 mm² hotspot on H&E and introducing the 3-tier grading system (Bd1–Bd3) to guide surgical escalation in pT1 and adjuvant chemotherapy in stage II CRC (Lugli et al., Modern Pathology 2017).

#### What AI Can and Cannot Do in Pathology

Reviewed in What AI Can and Cannot Do in Pathology — pathCast lecture by Dr. Rajendra Singh (UPenn; founder of PathPresenter), 2026-08-18. Argues the real risk is not replacement but **bypass** — slides shipped to commercial vendors whose predictions reach the oncologist directly — and that the answer is for departments to re-validate vendor models on their own data and own the governance layer — AI may be invisible in the workflow, but never unaudited in the record. Summarised from auto-generated captions; slides and demos not captured.

#### TRICARE: Deep-learning triage of 3D pathology datasets

Reviewed in TRICARE: Deep-learning triage of 3D pathology datasets — 2.5D context-aware deep learning triage for 3D open-top light-sheet microscopy, prioritizing high-risk 2D slices in prostate and Barrett's esophagus biopsies (Gao et al., Nature Biomedical Engineering 2026), with dataset at [TCIA](https://www.cancerimagingarchive.net/collection/pca_bx_3dpathology/), code at [alecgao066/TRICARE](https://github.com/alecgao066/TRICARE), and Zenodo record at [zenodo.20052262](https://doi.org/10.5281/zenodo.20052262).

#### RepLKNet: Revisiting Large Kernel Design in CNNs (Scaling Up Kernels to 31x31)

Reviewed in [Scaling Up Your Kernels to 31x31: Revisiting Large Kernel Design in CNNs](../Clippings/Scaling%20Up%20Your%20Kernels%20to%2031x31%20-%20Revisiting%20Large%20Kernel%20Design%20in%20CNNs.md) and [RepLKNet](replknet.md) — landmark architectural framework demonstrating that scaling depthwise convolutional kernels up to $31 \times 31$ coupled with structural re-parameterization allows pure CNNs to match or surpass Vision Transformers on ImageNet, ADE20K semantic segmentation, and COCO detection. Establishes the 5 design guidelines for large-kernel CNNs, shows that large kernels provide an ultra-wide Effective Receptive Field (ERF) and high shape bias comparable to human perception, and introduces custom CUTLASS Implicit GEMM CUDA kernels. Forms the direct architectural ancestor of modern fast digital pathology backbones including UniRepLKNet and the UniRepLKNet-N visual encoder in [CellQuant-Net](cellquant-net.md) / [CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](../Clippings/CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md) (Ding et al., CVPR 2022, DOI: 10.1109/CVPR52688.2022.01167, arXiv:2203.06717). Code at [DingXiaoH/RepLKNet-pytorch](https://github.com/DingXiaoH/RepLKNet-pytorch).

#### CellPrior-Net / CellQuant-Net: Prior-guided nuclei detection and classification for H&E whole-slide images

Reviewed in [CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images](../Clippings/CellPrior-Net%20-%20Prior-Guided%20Nuclei%20Detection%20and%20Classification%20for%20H%26E%20Whole-Slide%20Images.md) and [CellQuant-Net](cellquant-net.md) — prior-guided nuclei detection and 3-class classification (tumor, immune, other) pipeline coupling a lightweight UniRepLKNet-N large-kernel CNN with a 4-channel input tensor (RGB + hematoxylin Difference of Gaussians prior via Macenko stain deconvolution) and GPU-accelerated watershed post-processing. Benchmarked against 10 state-of-the-art pipelines across 8 multi-center datasets (~10.4M nuclei), CP-Net defines the optimal Pareto efficiency frontier, matching CellViT panoptic quality while cutting whole-slide inference time by 2x to 3x (2.16 min on 20× and 2.77 min on 40×). Integrated into CellQuant-Net with deep-learning WSI Quality Assessment (artifact filter excluding blur, folds, pen ink), spatial TIL neighborhood graph analysis, and native QuPath GeoJSON export, demonstrating significant survival stratification in hepatocellular carcinoma (Jabar et al., Journal of Pathology Informatics 2026, DOI: 10.1016/j.jpi.2026.100716, PII [S2153-3539(26)00178-1](https://www.sciencedirect.com/science/article/pii/S2153353926001781); arXiv:2607.00802). Code at [Falah-Jabar-Rahim/CellQuant-Net](https://github.com/Falah-Jabar-Rahim/CellQuant-Net).

#### HistoPLUS: Comprehensive cellular characterisation of H&E slides

Reviewed in [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](../Clippings/HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md) — cell detection, boundary segmentation, and 13-class classification framework integrating the compact distilled Bioptimus H0-mini pathology foundation model (86M params) within a 3-branch CellViT architecture. Trained via active learning on HistoTRAIN (108,722 nuclei, 6 indications) with [NuClick](nuclick.md) boundary propagation and validated across 6 MOSAIC cohorts (HistoVAL: 69,108 consensus nuclei from multi-pathologist review). Outperforms current state-of-the-art models by +5.2% in detection quality and +23.7% in classification F1 while matching ViT-Huge models with 5× fewer parameters, unlocking 7 understudied cell populations, predicting *FGFR3* mutation status in bladder cancer, and generalizing zero-shot to unseen breast and ovarian cancers (Adjadj et al., Journal of Pathology Informatics 2026, DOI: 10.1016/j.jpi.2026.100696, PII [S2153-3539(26)00156-2](https://www.sciencedirect.com/science/article/pii/S2153353926001562); arXiv:2508.09926). Code at [owkin/histoplus](https://github.com/owkin/histoplus), weights on [Hugging Face](https://huggingface.co/Owkin-Bioptimus/histoplus).

#### CytoFormer: Molecularly supervised cell foundation model for histopathology cell classification

Reviewed in [CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](../Clippings/CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md) — replaces manual pathologist cell annotation with molecular ground truth derived from paired in situ spatial transcriptomics (81 Xenium sections, 15.4M cells, 16 organs, 23 cell types). Leverages a ViT-giant backbone with 16 per-organ linear routing heads (84.6% accuracy, 0.78 macro-F1), outperforming 6 pathology foundation models on public benchmarks (PanNuke, CoNSeP, MoNuSAC, PUMA), transferring zero-shot to unseen organs, and achieving label-efficient active learning (F1 0.82) on TissueLab (Yao, Li, Yu & Huang, Precision Pathology 2026, DOI: 10.1016/j.prpath.2026.100006, PII [S3117-678X(26)00006-5](https://www.sciencedirect.com/science/article/pii/S3117678X26000065)). Code at [zhihuanglab/CytoFormer](https://github.com/zhihuanglab/CytoFormer), weights on [Hugging Face](https://huggingface.co/zhihuanglab/CytoFormer), and interactive WSI viewer at [zhihuanglab.github.io/CytoFormer](https://zhihuanglab.github.io/CytoFormer/).

#### ConvMixerSSM: Hybrid convolution and state-space model for WSI cancer subtyping

Reviewed in [A Hybrid MIL Approach Leveraging Convolution and State-Space Model for Whole-Slide Image Cancer Subtyping](../Clippings/A%20Hybrid%20MIL%20Approach%20Leveraging%20Convolution%20and%20State-Space%20Model%20for%20Whole-Slide%20Image%20Cancer%20Subtyping.md) — hybrid weakly supervised MIL architecture combining depthwise separable convolutions (ConvMixer) for local tissue textures with linear state-space sequence modeling (Mamba/SSM) and ReLU-gated attention for sparse instance selection; sets top performance on TCGA-NSCLC (AUC 97.83%, ACC 91.82%, F1 91.18%) and CAMELYON16 (AUC 98.95%) with 1.65 ms inference latency per gigapixel slide (Bi & Zhang, Mathematics 2025, DOI: 10.3390/math13132178).

#### The pathology report as a boundary object: From clinical communication to computational representation

Reviewed in [The pathology report as a boundary object: From clinical communication to computational representation](../Clippings/The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md) — foundational theoretical framework examining why pathology reports are contextually complete for expert clinical readers yet semantically underdetermined for secondary computational reuse (AI, registries, biobanks, foundation models). Analyzes the pathology report through Star & Griesemer's boundary object theory, articulates the mechanisms of selective semantic compression, differentiates latent from absent information, illustrates why naive NLP co-occurrence fails, and introduces Ontology-Separated Pathology Representation (OSPR) to decouple biological state, procedural context, and observational findings (Wang, Precision Pathology 2026, DOI: 10.1016/j.prpath.2026.100002).

#### NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology

Reviewed in [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](../Clippings/NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md) — full-lifecycle quality assurance framework and physical metrology standards developed by the UK National Pathology Imaging Co-operative (NPIC) and Leeds Teaching Hospitals NHS Trust. Covers objective chemical stain quantification via biopolymer Tango slides (National Staining Survey, Dunn et al., *Diagnostic Pathology* 2024), WSI scanner variation benchmarking (Pye et al., 2022), display and viewing luminance science (arXiv:2312.00475), the web-based Point-of-Use Quality Assurance (POUQA) tool, and the foundational Leeds Guides to Digital Pathology.

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
