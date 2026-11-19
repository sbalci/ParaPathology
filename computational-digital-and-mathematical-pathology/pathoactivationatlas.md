---
type: Tool
status: Developing
language: bilingual
title: "PathoActivationAtlas"
aliases:
  - "PathoActivationAtlas"
  - "Pathology Activation Atlas"
order: 145
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[Class visualizations and activation atlases for computational pathology]]"
  - "[[Towards robust foundation models for digital pathology]]"
  - "[[A distributional robustness margin for pathology foundation models]]"
  - "[[CRoMa]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
repo: https://github.com/KatherLab/PathoActivationAtlas
documentation: https://github.com/KatherLab/PathoActivationAtlas#readme
paper: https://doi.org/10.1016/j.xcrm.2026.103054
source_type: repository
external: true
adopted: false
engagement: active
license: MIT (Captum components BSD-3-Clause)
last_reviewed: 2026-10-03
---

# PathoActivationAtlas

An open-source PyTorch and Captum-based interpretability framework developed by the Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden) to inspect and audit what morphological concepts are organized inside pathology foundation models. Released alongside Gustav et al., *Cell Reports Medicine* 2026.

- **GitHub Repository:** [KatherLab/PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas) — MIT License (Captum components under BSD-3-Clause)
- **Foundational Paper:** Gustav M, Wolf F, Glasner C, Reitsam NG, Schulz S, Aschenbroich K, Märkl B, Foersch S, Kather JN. *Class visualizations and activation atlases for computational pathology.* Cell Reports Medicine 7(10):103054 (2026). [DOI: 10.1016/j.xcrm.2026.103054](https://doi.org/10.1016/j.xcrm.2026.103054); [arXiv:2603.07170](https://arxiv.org/abs/2603.07170)
- **Direct Article Link:** [ScienceDirect (PII: S2666379126004714)](https://www.sciencedirect.com/science/article/pii/S2666379126004714) | [Cell Press](https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(26)00471-4)
- **Local PDF:** [`mmc2.pdf`](file:///K:/DownloadsK/mmc2.pdf) (60 pages: 22-page corrected proof + 38-page supplement)
- **Companion Literature Clipping:** [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md)

---

## Why PathoActivationAtlas Matters

Conventional explainable AI (XAI) in digital pathology relies on **local feature attribution** (e.g., attention heatmaps, Grad-CAM, integrated gradients). These heatmaps show *where* a classifier attended on a specific patient slide, but they cannot answer:
1. **What archetype morphology** has the foundation model learned to associate with a disease class?
2. **How do representations evolve** across transformer depth from early edge detectors to high-level diagnostic features?
3. **Does representation separation track real biology**, or is the classifier exploiting non-biological dataset shortcuts and unsupportable taxonomies?

PathoActivationAtlas adapts two global feature-visualization methods originally introduced by Olah et al. to frozen pathology vision transformers (such as **UNI**, ViT-L/16, 24 transformer layers, 1024 embedding dimension) paired with linear classification heads:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               PATHOACTIVATIONATLAS ARCHITECTURE                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

   1. Class Visualizations (CVs)
      [ Random Noise in Fourier Space ] ──> [ Frozen UNI Backbone + Linear Head ]
                     ▲                                      │
                     └────── Optimize Logit Maximization ───┘ (8,192 steps)
                                      ▼
               Synthetic Prototypical Class Image (Texture / Pattern Archetype)

   2. Activation Atlases (AAs)
      [ High-D Activations from All Patches ] ──> [ 2D t-SNE Embedding ]
                                                              │
                                                              ▼
      [ Aggregate Cell Mean Vectors ] <── [ Grid Binning (10×10 or 20×20) ]
                     │
                     ▼
      [ L2 Feature Inversion Optimization ] (8,192 steps)
                     │
                     ▼
      Synthetic Multi-Concept Topological Landscape Across Transformer Layers
```

---

## Codebase Architecture

The repository is modularly structured into generation, evaluation, annotation, and interactive viewing subsystems:

```
PathoActivationAtlas/
├── create.py                  # Main entry point for generating CVs and AAs
├── view.py                    # Interactive PyQt / desktop GUI viewer
├── annotate.py                # Multi-rater pathologist annotation interface
├── conda_env.yml              # Conda environment specification
├── pyproject.toml             # Project build and package configuration
├── config/                    # Configuration files
│   ├── uni_nct.yaml           # NCT-CRC-HE-100K experiment config
│   ├── NCT-CRC-HE-100K.csv    # Colorectal training cohort manifest
│   └── CRC-VAL-HE-7K.csv      # External validation cohort manifest
├── _creator/                  # Generation engine
│   ├── models.py              # Frozen transformer backbones and linear probe wrappers
│   ├── captum_fragments.py    # Spatial transformations, Fourier parameterization (PyTorch Captum)
│   ├── objective_funcs.py     # Logit maximization and L2 feature distance loss functions
│   ├── optimizers.py          # Adam optimizer setups with learning rate schedules
│   ├── transformations.py     # Spatial jitter and padding transforms to suppress artifacts
│   ├── metrics.py             # Attribution, DreamSim, LPIPS, and Mahalanobis metrics
│   ├── custom_lpips.py        # Pathology-adapted LPIPS feature extraction
│   ├── datasets.py            # Patch dataset loaders and normalization pipelines
│   ├── thumbnails.py          # Grid generation and thumbnail tiling routines
│   └── record.py              # Experiment tracking and serialization
├── _viewer/                   # Interactive visualization GUI
│   ├── viewer.py              # Main viewer window with pan/zoom and layer switching
│   └── _resources/            # GUI icons and styles
├── _annotator/                # Pathologist study software
│   ├── annotator.py           # Blinded multi-reader scoring interface
│   └── _resources/            # UI components
└── modeling/                  # Linear probe training and checkpoint utilities
```

---

## Key Modules and Methods

### 1. Fourier Parameterization (`_creator/captum_fragments.py`)
Direct pixel-space backpropagation produces high-frequency checkerboard noise and adversarial artifacts. PathoActivationAtlas optimizes an unconstrained parameter tensor in the frequency (Fourier) domain, scaling frequencies by an inverse power spectrum ($1/f^\alpha$) before applying an inverse discrete 2D Fourier transform (IDFT) to yield spatial RGB patches. This enforces spatial continuity and smooth morphological boundaries.

### 2. Feature-Inversion Objective Functions (`_creator/objective_funcs.py`)
- **Class Visualizations (CV):** Maximizes the unnormalized pre-softmax logit $z_c$ for target class $c$:
  $$\mathcal{L}_{\text{CV}} = -z_c$$
- **Activation Atlases (AA):** For each 2D t-SNE grid cell $k$ with average activation vector $\bar{\mathbf{a}}_k \in \mathbb{R}^D$, optimizes a synthetic image $\hat{\mathbf{x}}$ at intermediate layer $l$ to minimize Euclidean feature distance:
  $$\mathcal{L}_{\text{AA}} = \|\phi_l(\hat{\mathbf{x}}) - \bar{\mathbf{a}}_k\|_2^2$$
Optimization runs for 8,192 iterations using Adam, ensuring convergence across deep transformer layers.

### 3. Quantitative Surrogate Metrics (`_creator/metrics.py`)
To benchmark how closely synthetic visualizations mirror real histology, the framework integrates:
- **Class Attribution:** Gradient of the target class logit with respect to internal activation vectors ($\nabla_{\mathbf{a}} z_c$).
- **Perceptual Similarity:** Nearest-neighbor **DreamSim** and **LPIPS** distances benchmarked across multiple feature backbones (AlexNet, UNI, H-Optimus-0, Prov-GigaPath).
- **Mahalanobis Distance:** Class-conditional distance modeling with Ledoit-Wolf covariance shrinkage ($\mathbf{\Sigma}^{-1}$).

---

## Installation and Quickstart

### 1. Environment Setup

```bash
git clone https://github.com/KatherLab/PathoActivationAtlas.git
cd PathoActivationAtlas

conda env create -f conda_env.yml
conda activate activation-atlas
```

### 2. Extract Activations and Build Activation Atlas

Extract activations from a trained model and generate a 2D activation atlas:

```bash
python create.py --config config/uni_nct.yaml --vis_type atlas
```

### 3. Generate Class Visualizations

Synthesize prototypical class archetype images:

```bash
python create.py --config config/uni_nct.yaml --vis_type class_vis
```

### 4. Interactive Desktop Exploration

Launch the interactive GUI viewer:

```bash
python view.py
```

- Navigate to `<save_root>/<experiment_name>/<atlas_or_class_vis>/<timestamp>/` to load the computed run.
- **Layer Exploration:** Select transformer layers from depth 1 to 24 to observe hierarchical feature abstraction.
- **Pan & Zoom:** Fluid canvas navigation to inspect micro-textures and cell transitions.
- **Overlays:** Toggle ground-truth patch overlays, gradient class attributions, and perceptual distance heatmaps.
- **Cell Tooltips:** Hover over any atlas cell to inspect source patch class distributions, attribution scores, and nearest real patches.

### 5. Running Pathologist Annotation Studies

Launch the blinded annotation interface used in the paper:

```bash
python annotate.py
```

Allows expert pathologists to score randomized, blinded real H&E patches versus synthetic visualizations to measure concordance (Cohen's $\kappa$, Fleiss' $\kappa$, Krippendorff's $\alpha$).

---

## Key Model Auditing Safeguards

PathoActivationAtlas provides concrete safeguards against common digital pathology foundation model failure modes:

| Diagnostic Question | Audit Capability | Paper Observation |
|---|---|---|
| **Shortcut Detection** | Inspects whether the classifier relies on non-tissue artifacts | CVs expose whether a class is dominated by pen ink, stasis bubbles, or scanner illumination gradients |
| **Layer-Wise Concept Formation** | Tracks representation depth across layers 1 to 24 | Layers 1–6 capture low-level edges; **Layer 14 provides the optimal balance of coherent morphology**; layers 20–24 become fragmented |
| **Taxonomy Calibration** | Tests whether fine cancer subclasses possess distinct morphology | Distinct tissues (adipose, stroma, tumor) separate cleanly; overlapping cancer subtypes disperse, mirroring human diagnostic disagreement |
| **The 42-of-42 Audit Rule** | Validates feature visualizations as model audits | In all 42 head-to-head comparisons, pathologists achieved higher diagnostic certainty on real H&E than synthetic images; CVs must never be used as surrogate histology |

---

## Vault Context and Related Frameworks

- [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md) — The foundational publication review in *Cell Reports Medicine* (2026).
- [CRoMa](croma.md) — Department of Pathology, Radboud UMC framework evaluating foundation model multi-center scanner and cohort robustness.
- [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md) — PathoROB benchmark evaluating encoder robustness against site-specific confounders.
- [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](../Clippings/Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md) — Systematic trade-off analysis across modern foundation models (UNI2, Virchow2, Kaiko, Phikon-v2, Lunit).
- [NuClick](nuclick.md) & [CellQuant-Net](cellquant-net.md) — High-throughput nuclear instance segmentation and cellular quantification tools.

# PathoActivationAtlas

Kather Lab (Else Kröner Fresenius Center for Digital Health, TU Dresden) tarafından, patoloji temel modellerinin (foundation models) içinde hangi morfolojik kavramların organize edildiğini incelemek ve denetlemek amacıyla geliştirilmiş, PyTorch ve Captum tabanlı, açık kaynaklı bir yorumlanabilirlik çerçevesi. Gustav ve ark., *Cell Reports Medicine* 2026 ile birlikte yayımlanmıştır.

- **GitHub Deposu:** [KatherLab/PathoActivationAtlas](https://github.com/KatherLab/PathoActivationAtlas) — MIT Lisansı (Captum bileşenleri BSD-3-Clause lisansı altında)
- **Temel Makale:** Gustav M, Wolf F, Glasner C, Reitsam NG, Schulz S, Aschenbroich K, Märkl B, Foersch S, Kather JN. *Class visualizations and activation atlases for computational pathology.* Cell Reports Medicine 7(10):103054 (2026). [DOI: 10.1016/j.xcrm.2026.103054](https://doi.org/10.1016/j.xcrm.2026.103054); [arXiv:2603.07170](https://arxiv.org/abs/2603.07170)
- **Doğrudan Makale Bağlantısı:** [ScienceDirect (PII: S2666379126004714)](https://www.sciencedirect.com/science/article/pii/S2666379126004714) | [Cell Press](https://www.cell.com/cell-reports-medicine/fulltext/S2666-3791(26)00471-4)
- **Yerel PDF:** [`mmc2.pdf`](file:///K:/DownloadsK/mmc2.pdf) (60 sayfa: 22 sayfalık düzeltilmiş prova + 38 sayfalık ek)
- **Eşlik Eden Literatür Kırpıntısı (Clipping):** Class visualizations and activation atlases for computational pathology

---

## PathoActivationAtlas Neden Önemlidir

Dijital patolojide geleneksel açıklanabilir yapay zekâ (explainable AI, XAI), **yerel öznitelik atfına** (local feature attribution; örn. dikkat ısı haritaları, Grad-CAM, integrated gradients) dayanır. Bu ısı haritaları, bir sınıflandırıcının belirli bir hastanın lamında *nereye* odaklandığını gösterir; ancak şu sorulara yanıt veremez:
1. Temel model, bir hastalık sınıfıyla **hangi arketip morfolojiyi** ilişkilendirmeyi öğrenmiştir?
2. Temsiller, erken evredeki kenar dedektörlerinden üst düzey tanısal özelliklere kadar transformer derinliği boyunca **nasıl evrilir**?
3. **Temsillerin ayrışması gerçek biyolojiyi mi yansıtır**, yoksa sınıflandırıcı biyolojik olmayan veri seti kısayollarından ve desteklenemeyen taksonomilerden mi yararlanmaktadır?

PathoActivationAtlas, ilk olarak Olah ve ark. tarafından tanıtılan iki global öznitelik görselleştirme yöntemini, doğrusal sınıflandırma başlıklarıyla (linear classification heads) eşleştirilmiş dondurulmuş (frozen) patoloji vision transformer'larına (örneğin **UNI**, ViT-L/16, 24 transformer katmanı, 1024 gömme boyutu) uyarlar:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               PATHOACTIVATIONATLAS ARCHITECTURE                                 │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

   1. Class Visualizations (CVs)
      [ Random Noise in Fourier Space ] ──> [ Frozen UNI Backbone + Linear Head ]
                     ▲                                      │
                     └────── Optimize Logit Maximization ───┘ (8,192 steps)
                                      ▼
               Synthetic Prototypical Class Image (Texture / Pattern Archetype)

   2. Activation Atlases (AAs)
      [ High-D Activations from All Patches ] ──> [ 2D t-SNE Embedding ]
                                                              │
                                                              ▼
      [ Aggregate Cell Mean Vectors ] <── [ Grid Binning (10×10 or 20×20) ]
                     │
                     ▼
      [ L2 Feature Inversion Optimization ] (8,192 steps)
                     │
                     ▼
      Synthetic Multi-Concept Topological Landscape Across Transformer Layers
```

---

## Kod Tabanı Mimarisi

Depo; üretim, değerlendirme, işaretleme (annotation) ve etkileşimli görüntüleme alt sistemlerine modüler biçimde yapılandırılmıştır:

```
PathoActivationAtlas/
├── create.py                  # Main entry point for generating CVs and AAs
├── view.py                    # Interactive PyQt / desktop GUI viewer
├── annotate.py                # Multi-rater pathologist annotation interface
├── conda_env.yml              # Conda environment specification
├── pyproject.toml             # Project build and package configuration
├── config/                    # Configuration files
│   ├── uni_nct.yaml           # NCT-CRC-HE-100K experiment config
│   ├── NCT-CRC-HE-100K.csv    # Colorectal training cohort manifest
│   └── CRC-VAL-HE-7K.csv      # External validation cohort manifest
├── _creator/                  # Generation engine
│   ├── models.py              # Frozen transformer backbones and linear probe wrappers
│   ├── captum_fragments.py    # Spatial transformations, Fourier parameterization (PyTorch Captum)
│   ├── objective_funcs.py     # Logit maximization and L2 feature distance loss functions
│   ├── optimizers.py          # Adam optimizer setups with learning rate schedules
│   ├── transformations.py     # Spatial jitter and padding transforms to suppress artifacts
│   ├── metrics.py             # Attribution, DreamSim, LPIPS, and Mahalanobis metrics
│   ├── custom_lpips.py        # Pathology-adapted LPIPS feature extraction
│   ├── datasets.py            # Patch dataset loaders and normalization pipelines
│   ├── thumbnails.py          # Grid generation and thumbnail tiling routines
│   └── record.py              # Experiment tracking and serialization
├── _viewer/                   # Interactive visualization GUI
│   ├── viewer.py              # Main viewer window with pan/zoom and layer switching
│   └── _resources/            # GUI icons and styles
├── _annotator/                # Pathologist study software
│   ├── annotator.py           # Blinded multi-reader scoring interface
│   └── _resources/            # UI components
└── modeling/                  # Linear probe training and checkpoint utilities
```

---

## Temel Modüller ve Yöntemler

### 1. Fourier Parametrizasyonu (`_creator/captum_fragments.py`)
Doğrudan piksel uzayında geri yayılım (backpropagation), yüksek frekanslı dama tahtası gürültüsü ve adversaryal artefaktlar üretir. PathoActivationAtlas, kısıtlanmamış bir parametre tensörünü frekans (Fourier) alanında optimize eder; frekansları ters güç spektrumuyla ($1/f^\alpha$) ölçekledikten sonra uzamsal RGB yamaları (patch) elde etmek için ters ayrık 2B Fourier dönüşümü (IDFT) uygular. Bu yaklaşım uzamsal sürekliliği ve düzgün morfolojik sınırları sağlar.

### 2. Öznitelik Tersine Çevirme (Feature Inversion) Amaç Fonksiyonları (`_creator/objective_funcs.py`)
- **Sınıf Görselleştirmeleri (Class Visualizations, CV):** Hedef sınıf $c$ için normalize edilmemiş, softmax öncesi logit $z_c$ değerini maksimize eder:
  $$\mathcal{L}_{\text{CV}} = -z_c$$
- **Aktivasyon Atlasları (Activation Atlases, AA):** Ortalama aktivasyon vektörü $\bar{\mathbf{a}}_k \in \mathbb{R}^D$ olan her 2B t-SNE ızgara hücresi $k$ için, Öklid öznitelik uzaklığını en aza indirecek şekilde ara katman $l$'de sentetik bir görüntü $\hat{\mathbf{x}}$ optimize eder:
  $$\mathcal{L}_{\text{AA}} = \|\phi_l(\hat{\mathbf{x}}) - \bar{\mathbf{a}}_k\|_2^2$$
Optimizasyon, Adam kullanılarak 8,192 iterasyon boyunca çalışır ve derin transformer katmanlarında yakınsamayı güvence altına alır.

### 3. Nicel Vekil Metrikler (`_creator/metrics.py`)
Sentetik görselleştirmelerin gerçek histolojiyi ne kadar yakından yansıttığını kıyaslamak için çerçeve şunları içerir:
- **Sınıf Atfı (Class Attribution):** Hedef sınıf logitinin iç aktivasyon vektörlerine göre gradyanı ($\nabla_{\mathbf{a}} z_c$).
- **Algısal Benzerlik:** Birden çok öznitelik omurgasında (AlexNet, UNI, H-Optimus-0, Prov-GigaPath) kıyaslanan en yakın komşu **DreamSim** ve **LPIPS** uzaklıkları.
- **Mahalanobis Uzaklığı:** Ledoit-Wolf kovaryans büzülmesi (shrinkage) ($\mathbf{\Sigma}^{-1}$) ile sınıf koşullu uzaklık modellemesi.

---

## Kurulum ve Hızlı Başlangıç

### 1. Ortam Kurulumu

```bash
git clone https://github.com/KatherLab/PathoActivationAtlas.git
cd PathoActivationAtlas

conda env create -f conda_env.yml
conda activate activation-atlas
```

### 2. Aktivasyonları Çıkarma ve Aktivasyon Atlası Oluşturma

Eğitilmiş bir modelden aktivasyonları çıkarın ve 2B bir aktivasyon atlası oluşturun:

```bash
python create.py --config config/uni_nct.yaml --vis_type atlas
```

### 3. Sınıf Görselleştirmeleri Üretme

Prototipik sınıf arketipi görüntülerini sentezleyin:

```bash
python create.py --config config/uni_nct.yaml --vis_type class_vis
```

### 4. Etkileşimli Masaüstü Keşfi

Etkileşimli GUI görüntüleyiciyi başlatın:

```bash
python view.py
```

- Hesaplanan çalıştırmayı yüklemek için `<save_root>/<experiment_name>/<atlas_or_class_vis>/<timestamp>/` dizinine gidin.
- **Katman Keşfi:** Hiyerarşik öznitelik soyutlamasını gözlemlemek için 1'den 24'e kadar derinlikteki transformer katmanlarını seçin.
- **Kaydırma ve Yakınlaştırma (Pan & Zoom):** Mikro dokusal desenleri ve hücre geçişlerini incelemek için akıcı tuval gezintisi.
- **Katmanlar (Overlays):** Gerçek etiketli (ground-truth) yama katmanlarını, gradyan tabanlı sınıf atıflarını ve algısal uzaklık ısı haritalarını açıp kapatın.
- **Hücre Araç İpuçları (Cell Tooltips):** Kaynak yamaların sınıf dağılımlarını, atıf skorlarını ve en yakın gerçek yamaları incelemek için herhangi bir atlas hücresinin üzerine gelin.

### 5. Patolog İşaretleme Çalışmalarını Yürütme

Makalede kullanılan körleştirilmiş (blinded) işaretleme arayüzünü başlatın:

```bash
python annotate.py
```

Uzman patologların, uyumu ölçmek amacıyla (Cohen's $\kappa$, Fleiss' $\kappa$, Krippendorff's $\alpha$) randomize ve körleştirilmiş gerçek H&E yamalarını sentetik görselleştirmelere karşı skorlamasını sağlar.

---

## Başlıca Model Denetim Güvenceleri

PathoActivationAtlas, dijital patoloji temel modellerinin yaygın başarısızlık biçimlerine karşı somut güvenceler sağlar:

| Tanısal Soru | Denetim Yeteneği | Makaledeki Gözlem |
|---|---|---|
| **Kısayol Tespiti** | Sınıflandırıcının doku dışı artefaktlara dayanıp dayanmadığını inceler | CV'ler, bir sınıfa kalem mürekkebi, staz kabarcıkları ya da tarayıcı aydınlatma gradyanlarının hâkim olup olmadığını ortaya koyar |
| **Katmanlar Boyunca Kavram Oluşumu** | Temsil derinliğini 1'den 24'e kadar katmanlar boyunca izler | 1–6. katmanlar düşük düzeyli kenarları yakalar; **14. katman tutarlı morfoloji açısından en uygun dengeyi sağlar**; 20–24. katmanlar parçalı hâle gelir |
| **Taksonomi Kalibrasyonu** | İnce kanser alt sınıflarının belirgin bir morfolojiye sahip olup olmadığını test eder | Belirgin dokular (yağ dokusu, stroma, tümör) net biçimde ayrışır; örtüşen kanser alt tipleri ise dağılır ve insanlar arasındaki tanısal uyumsuzluğu yansıtır |
| **42'de 42 Denetim Kuralı** | Öznitelik görselleştirmelerinin model denetimi aracı olarak geçerliliğini sınar | 42 doğrudan karşılaştırmanın tamamında patologlar, gerçek H&E üzerinde sentetik görüntülere kıyasla daha yüksek tanısal kesinlik elde etti; CV'ler asla vekil histoloji olarak kullanılmamalıdır |

---

## Kasa Bağlamı ve İlgili Çerçeveler

- Class visualizations and activation atlases for computational pathology — *Cell Reports Medicine* (2026) dergisindeki temel yayının incelemesi.
- CRoMa — Radboud UMC Patoloji Bölümü'nün, temel modellerin çok merkezli tarayıcı ve kohort dayanıklılığını değerlendiren çerçevesi.
- Towards robust foundation models for digital pathology — Kodlayıcı (encoder) dayanıklılığını merkeze özgü karıştırıcı faktörlere karşı değerlendiren PathoROB kıyaslama testi.
- Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis — Güncel temel modeller (UNI2, Virchow2, Kaiko, Phikon-v2, Lunit) genelinde sistematik ödünleşim (trade-off) analizi.
- NuClick & CellQuant-Net — Yüksek verimli nükleer örnek (instance) segmentasyonu ve hücresel nicelleştirme araçları.

<!-- tolaria:related:start -->

## See also

* [A distributional robustness margin for pathology foundation models](../Clippings/A%20distributional%20robustness%20margin%20for%20pathology%20foundation%20models.md)
* [Class visualizations and activation atlases for computational pathology](../Clippings/Class%20visualizations%20and%20activation%20atlases%20for%20computational%20pathology.md)
* [CRoMa](croma.md)
* [Digital Pathology](digital-pathology.md)
* [Image Analysis](image-analysis.md)
* [Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis](../Clippings/Navigating%20foundation%20model%20selection%20in%20digital%20pathology%20through%20performance%20evaluation%20and%20tradeoff%20analysis.md)
* [Towards robust foundation models for digital pathology](../Clippings/Towards%20robust%20foundation%20models%20for%20digital%20pathology.md)

<!-- tolaria:related:end -->
