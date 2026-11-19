---
type: Tool
status: Evergreen
language: bilingual
title: "TRIDENT"
aliases:
  - "TRIDENT"
  - "Trident"
  - "trident"
order: 170
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[Accelerating Data Processing and Benchmarking of AI Models for Pathology]]"
  - "[[HERO: Histology Encoder for Robust Representation in Oncology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[PathoActivationAtlas]]"
  - "[[Digital Pathology Software]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
repo: https://github.com/mahmoodlab/trident
paper: https://arxiv.org/abs/2502.06750
source_type: repository
external: true
adopted: false
engagement: active
license: Open Source (Mahmood Lab / Harvard Medical School)
last_reviewed: 2026-10-04
---

# TRIDENT

An industrial-grade, open-source Python toolkit developed by the Mahmood Lab (Harvard Medical School, Brigham and Women's Hospital, Broad Institute of MIT and Harvard) for scalable, resilient whole-slide image (WSI) processing and embedding extraction across 33+ patch encoders and 8+ slide foundation models. Released alongside Andrew Zhang et al., *Accelerating Data Processing and Benchmarking of AI Models for Pathology* (arXiv:2502.06750) and paired with the **Patho-Bench** foundation model evaluation framework.

- **GitHub Repository:** [mahmoodlab/TRIDENT](https://github.com/mahmoodlab/trident)
- **Documentation:** [trident-docs.readthedocs.io](https://trident-docs.readthedocs.io/en/latest/)
- **Foundational Paper:** Zhang A, Jaume G, Vaidya A, Ding T, Mahmood F. *Accelerating Data Processing and Benchmarking of AI Models for Pathology.* arXiv:2502.06750 [cs.CV] (2025). [DOI: 10.48550/arXiv.2502.06750](https://doi.org/10.48550/arXiv.2502.06750)
- **Companion Literature Review:** [Accelerating Data Processing and Benchmarking of AI Models for Pathology](../Clippings/Accelerating%20Data%20Processing%20and%20Benchmarking%20of%20AI%20Models%20for%20Pathology.md)
- **Benchmarking Suite:** [mahmoodlab/patho-bench](https://github.com/mahmoodlab/patho-bench)

---

## Why TRIDENT Matters

The field of computational pathology has transitioned from training bespoke Convolutional Neural Networks (CNNs) from scratch to deploying massive self-supervised vision transformer foundation models (such as UNI, Virchow, Prov-GigaPath, H-Optimus, and CONCH). However, transforming hundreds of thousands of multi-gigabyte, multi-resolution whole-slide images into model-ready embeddings has remained the primary engineering bottleneck.

Historically, laboratories relied on ad-hoc scripts or legacy pipelines such as CLAM (`create_patches_fp.py` and `extract_features_fp.py`). While pioneering, legacy tools suffered from significant operational vulnerabilities:
1. **Model Fragmentation:** Each research group releases foundation models with incompatible input patch dimensions, optical magnifications (10×, 20×, 40×), normalization constants, and custom model wrappers.
2. **Crash Fragility & Lack of Resumability:** Processing thousands of gigapixel WSIs takes days to weeks. Unhandled corrupt slides, out-of-memory (OOM) exceptions, or killed cluster jobs frequently required starting entire cohorts over from scratch.
3. **I/O Starvation on Network Storage:** High-end GPUs (e.g., NVIDIA A100/H100) sit idle while slow Network-Attached Storage (NAS) struggles to stream gigapixel image tiles in real time.
4. **Coarse Heuristic Tissue Segmentation:** Classical thresholding (Otsu/HSV) regularly captures glass debris, tissue folds, scanner illumination gradients, and pathologist ink marks while dropping pale fatty or mucinous tissue.

TRIDENT resolves these bottlenecks as an end-to-end, resilient pipeline providing a unified factory interface across the entire pathology foundation model ecosystem.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       TRIDENT 3-STAGE PIPELINE                                         │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  1. TISSUE SEGMENTATION (--task seg)
     [ Whole-Slide Image (.svs, .ndpi, .tiff, .mrxs, .zarr, .czi, .dcm) ]
                     │
                     ▼
     [ Segmenter: HEST / GrandQC / Otsu ] ──> Optional: --remove_artifacts / --remove_penmarks
                     │
                     ├──> Thumbnails (./trident_processed/thumbnails/)
                     ├──> Contours (./trident_processed/contours/)
                     └──> GeoJSON Polygons (./trident_processed/contours_geojson/ -> QuPath QC)

  2. PATCH COORDINATE EXTRACTION (--task coords)
     [ Segmented Tissue Polygons ] ──> --mag (e.g. 20×) + --patch_size (e.g. 256 / 512 px)
                     │
                     ├──> Absolute Pixel Coordinates (h5 / csv)
                     ├──> Filter: --min_tissue_proportion (drop non-tissue tiles)
                     └──> Optional: --dump_patches (save PNG/JPG crops for visual audits)

  3. FEATURE / EMBEDDING EXTRACTION (--task feat)
     [ High-Throughput Batch Dataloader ] <── Async SSD Staging Cache (--wsi_cache /local/ssd)
                     │
                     ├──> PATCH ENCODER (33+ backbones)
                     │    └── Shape: (N_patches, Embedding_Dim) -> ./features_<encoder>/<slide>.h5
                     │
                     └──> SLIDE ENCODER (TITAN, PRISM, GigaPath, CHIEF, Madeleine, Feather)
                          └── Auto-chains required patch encoder -> Shape: (Dim,) -> ./slide_features_<model>/
```

---

## Key Architectural & Engineering Innovations

### 1. Unified 3-Stage Modular Execution
TRIDENT decouples processing into three independent, idempotent stages:
- `--task seg`: Generates tissue masks, overview thumbnails, and GeoJSON contours.
- `--task coords`: Tiles valid tissue into regular patch coordinates.
- `--task feat`: Reads patch coordinates from disk and runs high-throughput GPU forward passes.
- `--task all`: Chains all three stages seamlessly in a single invocation.

Tasks run strictly the requested stage and do not auto-trigger prerequisites without explicit instruction—allowing users to inspect and curate intermediate segmentation polygons before committing expensive compute to patch extraction.

### 2. Multi-Segmenter Engine with Artifact Suppression
Unlike classical tools restricted to Otsu thresholding:
- **HEST Segmenter (`--segmenter hest`):** Default deep learning segmentation model trained on spatial transcriptomics cohorts ([MahmoodLab/hest-tissue-seg](https://huggingface.co/MahmoodLab/hest-tissue-seg)), robust to diverse stains and pale stroma.
- **GrandQC Segmenter (`--segmenter grandqc`):** Fast neural network segmentation with fine boundary precision ([cpath-ukk/grandqc](https://github.com/cpath-ukk/grandqc)).
- **Otsu Baseline (`--segmenter otsu`):** Pure CPU image-processing fallback requiring zero GPU resources or pre-downloaded weights.
- **Pathology Artifact Removal:** `--remove_artifacts` deploys a secondary GrandQC pass to aggressively eliminate tissue folds, out-of-focus blur, air bubbles, and edge tear-offs; `--remove_penmarks` isolates and filters out pathologist marker pen ink.
- **QuPath Visual QC:** Exports native GeoJSON polygon files (`./contours_geojson/`) for drag-and-drop validation and manual boundary editing directly inside QuPath.

### 3. Comprehensive Foundation Model Factory
TRIDENT standardizes model loading via `trident.patch_encoder_models.encoder_factory(name)`. Crucially, **the selected encoder strictly dictates the required `--patch_size` and `--mag`** (resolving common researcher errors of feeding mismatched spatial inputs):

| Encoder Category | Model Flag (`--patch_encoder`) | Embedding Dim | Required Resolution & Magnification | Upstream Institution / Reference |
|---|---|---:|---|---|
| **Mahmood Lab** | `uni_v1` | 1,024 | `--patch_size 256 --mag 20` | Harvard / *Nature Medicine* 2024 |
| | `uni_v2` | 1,536 | `--patch_size 256 --mag 20` | Harvard / Pre-print 2024 |
| | `conch_v1` | 512 | `--patch_size 512 --mag 20` | Harvard / *Nature Medicine* 2024 |
| | `conch_v15` *(Default)* | 768 | `--patch_size 512 --mag 20` | Harvard / Hugging Face 2024 |
| **Paige AI** | `virchow` / `virchow2` | 2,560 | `--patch_size 224 --mag 20` | Paige / *Nature Medicine* 2024 |
| | `virchow2-cls` | 1,280 | `--patch_size 224 --mag 20` | Paige (CLS-token representation) |
| **Providence / MSFT** | `gigapath` | 1,536 | `--patch_size 256 --mag 20` | Providence / *Nature* 2024 |
| | `gigapath-flash` | 384 | `--patch_size 256 --mag 20` | Providence (distilled small ViT) |
| **Bioptimus** | `hoptimus0` / `hoptimus1` | 1,536 | `--patch_size 224 --mag 20` | Bioptimus / arXiv 2024 |
| | `h0-mini` | 768 / 1,536 | `--patch_size 224 --mag 20` | Bioptimus / [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](../Clippings/HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md) |
| **Owkin** | `phikon` | 768 | `--patch_size 224 --mag 20` | Owkin / iBOT pretraining |
| | `phikon_v2` | 1,024 | `--patch_size 224 --mag 20` | Owkin / *Nature Communications* 2024 |
| **Broad / Harvard** | `musk` | 1,024 | `--patch_size 384 --mag 20` | Vision-language multimodal model |
| **Caris Life Sciences** | `midnight12k` / `openmidnight` | 3,072 / 1,536 | `--patch_size 224 --mag 20` | Caris / [HERO: Histology Encoder for Robust Representation in Oncology](../Clippings/HERO%20-%20Histology%20Encoder%20for%20Robust%20Representation%20in%20Oncology.md) |
| **Academic & Legacy** | `ctranspath` | 768 | `--patch_size 256 --mag 10` | Wang et al. / Swin-Transformer (10×) |
| | `resnet50` | 1,024 | `--patch_size 256 --mag 20` | ImageNet baseline / classical CLAM |

### 4. Automated Slide Encoder Chaining
Slide-level foundation models aggregate thousands of patch tokens into a unified slide vector or diagnostic prediction. In TRIDENT, specifying `--slide_encoder <name>` **automatically infers, loads, and executes the required upstream patch encoder**:
- **`titan`:** Multimodal slide encoder (Mahmood Lab); automatically extracts `conch_v15` (512 px at 20×), saves intermediate patch features to `features_conch_v15/`, and outputs whole-slide embeddings to `slide_features_titan/`.
- **`prism` / `prism2`:** Slide generation/classification model (Paige); automatically extracts `virchow` or `virchow2-cls` (224 px at 20×).
- **`gigapath`:** Whole-slide LongNet transformer; consumes 256 px `gigapath` patch tokens.
- **`chief`:** Clinical Histopathology Imaging Evaluation Foundation (HMS-DBMI); consumes `ctranspath` at 10×.
- **`madeleine` & `feather`:** Advanced Mahmood Lab slide encoders for multi-stain and attention-pooling aggregation.

### 5. Production Reliability & Resumability
- **Smart Resumability:** Outputs are tracked per slide. Re-running the batch script over the same `--job_dir` instantly skips completed slides without reprocessing.
- **Lock Architecture (`.lock`):** Multi-process jobs place temporary lockfiles during execution to prevent race conditions across parallel GPU workers. Deadlock expiration (`--clear_dead_locks --dead_lock_max_age_hours 24`) safely recovers jobs killed by cluster schedulers (SLURM/PBS).
- **Asynchronous Producer-Consumer Caching (`--wsi_cache`):** For datasets residing on slow network file systems, `--wsi_cache /local/ssd --cache_batch_size 32` spawns background worker threads that prefetch and stage WSIs to local NVMe SSDs before inference, eliminating GPU I/O starvation.
- **Multi-Format WSI Engine:** Native unified decoding across OpenSlide, CuCIM, plain rasters (`.png`, `.jpeg`), SDPC, OME-Zarr (`.zarr`), and Zeiss CZI (`.czi`). Built-in `trident convert` reformats unpyramidal or corrupted files into standard pyramidal TIFFs.
- **Standardized Execution Reports:** Writes structured `summary.md` logs, JSON run manifests (`runs/<id>.json`), and granular per-slide state records (`wsi_states/<slide>.json`).

---

## CLI Quickstart & Workflows

### 1. Environment Setup

```bash
# Recommended Python 3.10 environment
conda create -n "trident" python=3.10 -y
conda activate trident

git clone https://github.com/mahmoodlab/trident.git
cd trident
pip install -e ".[full]"

# Preflight verification and gated model access check
trident-doctor --profile full --check-gated
```

### 2. End-to-End Processing (The Primary Production Command)

Run tissue segmentation, patch coordinate generation, and UNI feature extraction across a directory of slides using multiple GPUs:

```bash
python run_batch_of_slides.py \
  --task all \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --patch_encoder uni_v1 \
  --mag 20 \
  --patch_size 256 \
  --gpus 0 1 2 3 \
  --skip_errors \
  --wsi_cache /local/nvme/cache \
  --cache_batch_size 32
```

### 3. Step-by-Step Staged Execution

#### Step A: Neural Tissue Segmentation with Artifact Cleanup
```bash
python run_batch_of_slides.py \
  --task seg \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --segmenter hest \
  --remove_artifacts \
  --remove_penmarks \
  --gpus 0
```
*Outputs: Thumbnails (`/thumbnails/`), contour overlays (`/contours/`), and QuPath GeoJSON files (`/contours_geojson/`).*

#### Step B: Patch Coordinate Extraction
```bash
python run_batch_of_slides.py \
  --task coords \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --mag 20 \
  --patch_size 256 \
  --overlap 0 \
  --min_tissue_proportion 0.1
```
*Outputs: HDF5 patch coordinates (`/patches/`).*

#### Step C: Patch Feature Extraction
```bash
python run_batch_of_slides.py \
  --task feat \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --patch_encoder conch_v15 \
  --mag 20 \
  --patch_size 512 \
  --feat_batch_size 64 \
  --gpus 0 1
```
*Outputs: Embedding matrices (`/features_conch_v15/<slide>.h5`).*

### 4. Slide-Level Foundation Model Extraction (e.g. TITAN)

```bash
python run_batch_of_slides.py \
  --task all \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --slide_encoder titan \
  --mag 20 \
  --patch_size 512 \
  --gpus 0
```
*Automatically runs `conch_v15` patch feature extraction before executing TITAN slide-level aggregation, storing slide vectors in `/slide_features_titan/<slide>.pt`.*

---

## AI Agent Integration

TRIDENT is among the first digital pathology toolkits to ship native **AI Coding Agent Skills** ([`.claude/skills/trident/`](https://github.com/mahmoodlab/TRIDENT/tree/main/.claude/skills/trident)):
- Provides autonomous coding agents (Claude Code, Antigravity, etc.) with explicit operational constraints, encoder-to-resolution lookups, and failure recovery protocols.
- Prevents common LLM pitfalls (e.g., attempting to run `--task coords` on an empty directory without prior segmentation, or specifying mismatched resolutions like 224px for UNI).

---

## Connection to Vault Research & Literature

- [Accelerating Data Processing and Benchmarking of AI Models for Pathology](../Clippings/Accelerating%20Data%20Processing%20and%20Benchmarking%20of%20AI%20Models%20for%20Pathology.md) — The foundational publication detailing TRIDENT and Patho-Bench (Zhang et al. 2025).
- [HERO: Histology Encoder for Robust Representation in Oncology](../Clippings/HERO%20-%20Histology%20Encoder%20for%20Robust%20Representation%20in%20Oncology.md) — Evaluated on 39 slide-level tasks using the Mahmood Lab's **Patho-Bench** suite.
- [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](../Clippings/Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md) — Comparative trade-offs across encoders (Lunit, Kaiko, Phikon-v2, UNI2, Virchow2) supported in TRIDENT.
- [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md) — PathoROB benchmark evaluating encoder vulnerability to multi-center acquisition confounders.
- [PathoActivationAtlas](pathoactivationatlas.md) — Visual representation auditing framework for encoders extracted via TRIDENT.
- [CellQuant-Net](cellquant-net.md), [NuClick](nuclick.md), & [HoVer-NeXt](hover-next.md) — Cellular instance segmentation frameworks downstream or complementary to whole-slide patch extraction.

# TRIDENT

Mahmood Lab (Harvard Medical School, Brigham and Women's Hospital, Broad Institute of MIT and Harvard) tarafından geliştirilen; 33'ten fazla yama kodlayıcısı (patch encoder) ve 8'den fazla preparat düzeyi temel model (slide foundation model) üzerinden ölçeklenebilir ve dayanıklı tüm preparat görüntüsü (whole-slide image, WSI) işleme ve gömme (embedding) çıkarımı sağlayan, endüstriyel düzeyde, açık kaynaklı bir Python araç takımı. Andrew Zhang ve ark., *Accelerating Data Processing and Benchmarking of AI Models for Pathology* (arXiv:2502.06750) yayınıyla birlikte duyurulmuş olup **Patho-Bench** temel model değerlendirme çerçevesiyle eşleştirilmiştir.

- **GitHub Deposu:** [mahmoodlab/TRIDENT](https://github.com/mahmoodlab/trident)
- **Dokümantasyon:** [trident-docs.readthedocs.io](https://trident-docs.readthedocs.io/en/latest/)
- **Temel Makale:** Zhang A, Jaume G, Vaidya A, Ding T, Mahmood F. *Accelerating Data Processing and Benchmarking of AI Models for Pathology.* arXiv:2502.06750 [cs.CV] (2025). [DOI: 10.48550/arXiv.2502.06750](https://doi.org/10.48550/arXiv.2502.06750)
- **Eşlik Eden Literatür İncelemesi:** Accelerating Data Processing and Benchmarking of AI Models for Pathology
- **Karşılaştırmalı Değerlendirme (Benchmarking) Takımı:** [mahmoodlab/patho-bench](https://github.com/mahmoodlab/patho-bench)

---

## TRIDENT Neden Önemli

Hesaplamalı patoloji alanı, sıfırdan özel olarak eğitilen evrişimli sinir ağlarından (Convolutional Neural Networks, CNN) devasa, öz-denetimli (self-supervised) vision transformer temel modellerinin (UNI, Virchow, Prov-GigaPath, H-Optimus ve CONCH gibi) kullanımına geçmiştir. Ancak yüz binlerce çok gigabaytlık, çok çözünürlüklü tüm preparat görüntüsünü modele hazır gömmelere dönüştürmek, başlıca mühendislik darboğazı olmayı sürdürmüştür.

Geçmişte laboratuvarlar geçici (ad-hoc) betiklere ya da CLAM gibi eski iş akışlarına (`create_patches_fp.py` ve `extract_features_fp.py`) dayanıyordu. Öncü olmakla birlikte, eski araçlar önemli işletimsel zaaflardan muzdaripti:
1. **Model Parçalanması:** Her araştırma grubu, birbiriyle uyumsuz girdi yama boyutlarına, optik büyütmelere (10×, 20×, 40×), normalizasyon sabitlerine ve özel model sarmalayıcılarına (wrapper) sahip temel modeller yayımlamaktadır.
2. **Çökmeye Karşı Kırılganlık ve Kaldığı Yerden Devam Edememe:** Binlerce gigapiksel WSI'ın işlenmesi günler ile haftalar sürer. Ele alınmamış bozuk preparat dosyaları, bellek yetersizliği (out-of-memory, OOM) hataları ya da sonlandırılan küme (cluster) işleri, sıklıkla tüm kohortların baştan işlenmesini gerektiriyordu.
3. **Ağ Depolamada G/Ç Açlığı (I/O Starvation):** Yavaş ağa bağlı depolama (Network-Attached Storage, NAS) gigapiksel görüntü karolarını gerçek zamanlı aktarmakta zorlanırken üst düzey GPU'lar (ör. NVIDIA A100/H100) boşta bekler.
4. **Kaba Sezgisel Doku Segmentasyonu:** Klasik eşikleme (Otsu/HSV), soluk yağlı ya da müsinöz dokuyu dışarıda bırakırken sıklıkla cam kırıntılarını, doku katlantılarını, tarayıcı aydınlatma gradyanlarını ve patolog mürekkep işaretlerini yakalar.

TRIDENT, tüm patoloji temel modeli ekosistemi genelinde birleşik bir fabrika (factory) arayüzü sunan uçtan uca, dayanıklı bir iş akışı olarak bu darboğazları çözer.

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       TRIDENT 3-STAGE PIPELINE                                         │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  1. TISSUE SEGMENTATION (--task seg)
     [ Whole-Slide Image (.svs, .ndpi, .tiff, .mrxs, .zarr, .czi, .dcm) ]
                     │
                     ▼
     [ Segmenter: HEST / GrandQC / Otsu ] ──> Optional: --remove_artifacts / --remove_penmarks
                     │
                     ├──> Thumbnails (./trident_processed/thumbnails/)
                     ├──> Contours (./trident_processed/contours/)
                     └──> GeoJSON Polygons (./trident_processed/contours_geojson/ -> QuPath QC)

  2. PATCH COORDINATE EXTRACTION (--task coords)
     [ Segmented Tissue Polygons ] ──> --mag (e.g. 20×) + --patch_size (e.g. 256 / 512 px)
                     │
                     ├──> Absolute Pixel Coordinates (h5 / csv)
                     ├──> Filter: --min_tissue_proportion (drop non-tissue tiles)
                     └──> Optional: --dump_patches (save PNG/JPG crops for visual audits)

  3. FEATURE / EMBEDDING EXTRACTION (--task feat)
     [ High-Throughput Batch Dataloader ] <── Async SSD Staging Cache (--wsi_cache /local/ssd)
                     │
                     ├──> PATCH ENCODER (33+ backbones)
                     │    └── Shape: (N_patches, Embedding_Dim) -> ./features_<encoder>/<slide>.h5
                     │
                     └──> SLIDE ENCODER (TITAN, PRISM, GigaPath, CHIEF, Madeleine, Feather)
                          └── Auto-chains required patch encoder -> Shape: (Dim,) -> ./slide_features_<model>/
```

---

## Temel Mimari ve Mühendislik Yenilikleri

### 1. Birleşik 3 Aşamalı Modüler Yürütme
TRIDENT işlemeyi birbirinden bağımsız, idempotent üç aşamaya ayırır:
- `--task seg`: Doku maskeleri, genel bakış küçük resimleri (thumbnail) ve GeoJSON konturları üretir.
- `--task coords`: Geçerli dokuyu düzenli yama koordinatlarına karolar.
- `--task feat`: Yama koordinatlarını diskten okur ve yüksek verimli GPU ileri geçişlerini (forward pass) çalıştırır.
- `--task all`: Üç aşamanın tamamını tek bir çağrıda kesintisiz biçimde zincirler.

Görevler yalnızca istenen aşamayı çalıştırır ve açık talimat olmadan ön koşul aşamaları kendiliğinden tetiklemez; bu sayede kullanıcılar, yama çıkarımına pahalı hesaplama gücü ayırmadan önce ara segmentasyon poligonlarını inceleyip düzenleyebilir.

### 2. Artefakt Baskılamalı Çoklu Segmentasyon Motoru
Otsu eşiklemesiyle sınırlı klasik araçların aksine:
- **HEST Segmenter (`--segmenter hest`):** Uzamsal transkriptomik kohortları üzerinde eğitilmiş ([MahmoodLab/hest-tissue-seg](https://huggingface.co/MahmoodLab/hest-tissue-seg)), farklı boyamalara ve soluk stromaya karşı dayanıklı varsayılan derin öğrenme segmentasyon modeli.
- **GrandQC Segmenter (`--segmenter grandqc`):** İnce sınır hassasiyetine sahip hızlı sinir ağı segmentasyonu ([cpath-ukk/grandqc](https://github.com/cpath-ukk/grandqc)).
- **Otsu Temel Yöntemi (`--segmenter otsu`):** Hiç GPU kaynağı ya da önceden indirilmiş ağırlık gerektirmeyen, yalnızca CPU ile çalışan görüntü işleme yedeği.
- **Patoloji Artefaktlarının Giderilmesi:** `--remove_artifacts`, doku katlantılarını, odak dışı bulanıklığı, hava kabarcıklarını ve kenar yırtıklarını agresif biçimde ayıklamak için ikinci bir GrandQC geçişi uygular; `--remove_penmarks` ise patoloğun işaretleme kalemi mürekkebini ayırt edip filtreler.
- **QuPath ile Görsel Kalite Kontrol:** Doğrudan QuPath içinde sürükle-bırak doğrulama ve elle sınır düzenleme için yerel GeoJSON poligon dosyaları (`./contours_geojson/`) dışa aktarır.

### 3. Kapsamlı Temel Model Fabrikası
TRIDENT, model yüklemeyi `trident.patch_encoder_models.encoder_factory(name)` aracılığıyla standartlaştırır. Kritik olarak, **seçilen kodlayıcı gerekli `--patch_size` ve `--mag` değerlerini kesin olarak belirler** (böylece araştırmacıların uyumsuz uzamsal girdiler vermesi gibi yaygın hatalar giderilir):

| Kodlayıcı Kategorisi | Model Bayrağı (`--patch_encoder`) | Gömme Boyutu | Gerekli Çözünürlük ve Büyütme | Kaynak Kurum / Referans |
|---|---|---:|---|---|
| **Mahmood Lab** | `uni_v1` | 1,024 | `--patch_size 256 --mag 20` | Harvard / *Nature Medicine* 2024 |
| | `uni_v2` | 1,536 | `--patch_size 256 --mag 20` | Harvard / Ön baskı (pre-print) 2024 |
| | `conch_v1` | 512 | `--patch_size 512 --mag 20` | Harvard / *Nature Medicine* 2024 |
| | `conch_v15` *(Varsayılan)* | 768 | `--patch_size 512 --mag 20` | Harvard / Hugging Face 2024 |
| **Paige AI** | `virchow` / `virchow2` | 2,560 | `--patch_size 224 --mag 20` | Paige / *Nature Medicine* 2024 |
| | `virchow2-cls` | 1,280 | `--patch_size 224 --mag 20` | Paige (CLS-token temsili) |
| **Providence / MSFT** | `gigapath` | 1,536 | `--patch_size 256 --mag 20` | Providence / *Nature* 2024 |
| | `gigapath-flash` | 384 | `--patch_size 256 --mag 20` | Providence (damıtılmış küçük ViT) |
| **Bioptimus** | `hoptimus0` / `hoptimus1` | 1,536 | `--patch_size 224 --mag 20` | Bioptimus / arXiv 2024 |
| | `h0-mini` | 768 / 1,536 | `--patch_size 224 --mag 20` | Bioptimus / HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides |
| **Owkin** | `phikon` | 768 | `--patch_size 224 --mag 20` | Owkin / iBOT ön eğitimi |
| | `phikon_v2` | 1,024 | `--patch_size 224 --mag 20` | Owkin / *Nature Communications* 2024 |
| **Broad / Harvard** | `musk` | 1,024 | `--patch_size 384 --mag 20` | Görüntü-dil çok kipli (multimodal) model |
| **Caris Life Sciences** | `midnight12k` / `openmidnight` | 3,072 / 1,536 | `--patch_size 224 --mag 20` | Caris / HERO: Histology Encoder for Robust Representation in Oncology |
| **Akademik ve Eski Modeller** | `ctranspath` | 768 | `--patch_size 256 --mag 10` | Wang ve ark. / Swin-Transformer (10×) |
| | `resnet50` | 1,024 | `--patch_size 256 --mag 20` | ImageNet temel modeli / klasik CLAM |

### 4. Otomatik Preparat Kodlayıcı Zincirleme
Preparat düzeyi temel modeller, binlerce yama tokenini tek bir birleşik preparat vektöründe ya da tanısal bir öngörüde toplar. TRIDENT'te `--slide_encoder <name>` belirtilmesi, **gerekli üst akış yama kodlayıcısını otomatik olarak çıkarsar, yükler ve çalıştırır**:
- **`titan`:** Çok kipli preparat kodlayıcısı (Mahmood Lab); `conch_v15` özniteliklerini (20×'te 512 px) otomatik olarak çıkarır, ara yama özniteliklerini `features_conch_v15/` dizinine kaydeder ve tüm preparat gömmelerini `slide_features_titan/` dizinine yazar.
- **`prism` / `prism2`:** Preparat üretme/sınıflandırma modeli (Paige); `virchow` ya da `virchow2-cls` özniteliklerini (20×'te 224 px) otomatik olarak çıkarır.
- **`gigapath`:** Tüm preparat LongNet transformer'ı; 256 px'lik `gigapath` yama tokenlerini kullanır.
- **`chief`:** Clinical Histopathology Imaging Evaluation Foundation (HMS-DBMI); 10×'te `ctranspath` kullanır.
- **`madeleine` ve `feather`:** Çoklu boya ve dikkat-havuzlama (attention-pooling) temelli toplama için geliştirilmiş ileri düzey Mahmood Lab preparat kodlayıcıları.

### 5. Üretim Güvenilirliği ve Kaldığı Yerden Devam Edebilme
- **Akıllı Devam Ettirme:** Çıktılar preparat bazında izlenir. Toplu iş betiğinin aynı `--job_dir` üzerinde yeniden çalıştırılması, tamamlanmış preparatları yeniden işlemeden anında atlar.
- **Kilit Mimarisi (`.lock`):** Çok süreçli işler, paralel GPU işçileri arasında yarış koşullarını önlemek için yürütme sırasında geçici kilit dosyaları yerleştirir. Ölü kilit sona erdirme (`--clear_dead_locks --dead_lock_max_age_hours 24`), küme zamanlayıcıları (SLURM/PBS) tarafından sonlandırılan işleri güvenle kurtarır.
- **Asenkron Üretici-Tüketici Önbelleği (`--wsi_cache`):** Yavaş ağ dosya sistemlerinde bulunan veri kümeleri için `--wsi_cache /local/ssd --cache_batch_size 32`, çıkarım öncesinde WSI'ları önceden getirip yerel NVMe SSD'lere aktaran arka plan iş parçacıkları başlatarak GPU G/Ç açlığını ortadan kaldırır.
- **Çok Formatlı WSI Motoru:** OpenSlide, CuCIM, düz raster dosyalar (`.png`, `.jpeg`), SDPC, OME-Zarr (`.zarr`) ve Zeiss CZI (`.czi`) genelinde yerel, birleşik kod çözme. Yerleşik `trident convert` komutu, piramidal olmayan ya da bozuk dosyaları standart piramidal TIFF'lere dönüştürür.
- **Standartlaştırılmış Yürütme Raporları:** Yapılandırılmış `summary.md` günlükleri, JSON çalıştırma manifestoları (`runs/<id>.json`) ve ayrıntılı, preparat bazında durum kayıtları (`wsi_states/<slide>.json`) yazar.

---

## Komut Satırı (CLI) Hızlı Başlangıç ve İş Akışları

### 1. Ortam Kurulumu

```bash
# Recommended Python 3.10 environment
conda create -n "trident" python=3.10 -y
conda activate trident

git clone https://github.com/mahmoodlab/trident.git
cd trident
pip install -e ".[full]"

# Preflight verification and gated model access check
trident-doctor --profile full --check-gated
```

### 2. Uçtan Uca İşleme (Birincil Üretim Komutu)

Birden fazla GPU kullanarak bir preparat dizini genelinde doku segmentasyonu, yama koordinatı üretimi ve UNI öznitelik çıkarımını çalıştırın:

```bash
python run_batch_of_slides.py \
  --task all \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --patch_encoder uni_v1 \
  --mag 20 \
  --patch_size 256 \
  --gpus 0 1 2 3 \
  --skip_errors \
  --wsi_cache /local/nvme/cache \
  --cache_batch_size 32
```

### 3. Adım Adım Aşamalı Yürütme

#### Adım A: Artefakt Temizlemeli Sinir Ağı Tabanlı Doku Segmentasyonu
```bash
python run_batch_of_slides.py \
  --task seg \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --segmenter hest \
  --remove_artifacts \
  --remove_penmarks \
  --gpus 0
```
*Çıktılar: Küçük resimler (`/thumbnails/`), kontur kaplamaları (`/contours/`) ve QuPath GeoJSON dosyaları (`/contours_geojson/`).*

#### Adım B: Yama Koordinatı Çıkarımı
```bash
python run_batch_of_slides.py \
  --task coords \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --mag 20 \
  --patch_size 256 \
  --overlap 0 \
  --min_tissue_proportion 0.1
```
*Çıktılar: HDF5 yama koordinatları (`/patches/`).*

#### Adım C: Yama Özniteliği Çıkarımı
```bash
python run_batch_of_slides.py \
  --task feat \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --patch_encoder conch_v15 \
  --mag 20 \
  --patch_size 512 \
  --feat_batch_size 64 \
  --gpus 0 1
```
*Çıktılar: Gömme matrisleri (`/features_conch_v15/<slide>.h5`).*

### 4. Preparat Düzeyi Temel Model Çıkarımı (ör. TITAN)

```bash
python run_batch_of_slides.py \
  --task all \
  --wsi_dir /path/to/wsis \
  --job_dir /path/to/trident_processed \
  --slide_encoder titan \
  --mag 20 \
  --patch_size 512 \
  --gpus 0
```
*TITAN preparat düzeyi toplamasını yürütmeden önce `conch_v15` yama özniteliği çıkarımını otomatik olarak çalıştırır ve preparat vektörlerini `/slide_features_titan/<slide>.pt` konumunda saklar.*

---

## Yapay Zekâ Ajanı Entegrasyonu

TRIDENT, yerel **AI Coding Agent Skills** ([`.claude/skills/trident/`](https://github.com/mahmoodlab/TRIDENT/tree/main/.claude/skills/trident)) ile birlikte sunulan ilk dijital patoloji araç takımları arasındadır:
- Otonom kodlama ajanlarına (Claude Code, Antigravity vb.) açık işletimsel kısıtlamalar, kodlayıcı-çözünürlük eşleştirme tabloları ve hata kurtarma protokolleri sağlar.
- Yaygın LLM hatalarını önler (ör. önceden segmentasyon yapılmadan boş bir dizin üzerinde `--task coords` çalıştırmaya çalışmak ya da UNI için 224 px gibi uyumsuz çözünürlükler belirtmek).

---

## Kasa (Vault) Araştırmaları ve Literatürle Bağlantı

- Accelerating Data Processing and Benchmarking of AI Models for Pathology — TRIDENT ve Patho-Bench'i ayrıntılı olarak tanıtan temel yayın (Zhang ve ark. 2025).
- HERO: Histology Encoder for Robust Representation in Oncology — Mahmood Lab'in **Patho-Bench** takımı kullanılarak 39 preparat düzeyi görev üzerinde değerlendirilmiştir.
- Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis — TRIDENT'in desteklediği kodlayıcılar (Lunit, Kaiko, Phikon-v2, UNI2, Virchow2) arasındaki karşılaştırmalı ödünleşimler.
- Towards robust foundation models for digital pathology — Kodlayıcıların çok merkezli görüntü edinimi karıştırıcılarına karşı kırılganlığını değerlendiren PathoROB karşılaştırmalı değerlendirme ölçütü.
- PathoActivationAtlas — TRIDENT aracılığıyla çıkarılan kodlayıcılar için görsel temsil denetimi çerçevesi.
- CellQuant-Net, NuClick ve HoVer-NeXt — Tüm preparat yama çıkarımının akış aşağısında yer alan ya da onu tamamlayan hücresel örnek segmentasyonu (instance segmentation) çerçeveleri.

<!-- tolaria:related:start -->

## See also

* [Accelerating Data Processing and Benchmarking of AI Models for Pathology](../Clippings/Accelerating%20Data%20Processing%20and%20Benchmarking%20of%20AI%20Models%20for%20Pathology.md)
* [Digital Pathology](digital-pathology.md)
* [HERO: Histology Encoder for Robust Representation in Oncology](../Clippings/HERO%20-%20Histology%20Encoder%20for%20Robust%20Representation%20in%20Oncology.md)
* [Image Analysis](image-analysis.md)
* [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](../Clippings/Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md)
* [PathoActivationAtlas](pathoactivationatlas.md)
* [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md)

<!-- tolaria:related:end -->
