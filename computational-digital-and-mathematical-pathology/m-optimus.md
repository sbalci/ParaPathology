---
type: Tool
status: Evergreen
language: bilingual
title: "M-Optimus"
aliases:
  - "M-Optimus-1"
  - "Bioptimus M-Optimus"
  - "Bioptimus M-Optimus-1"
  - "m-optimus"
order: 176
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer]]"
  - "[[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]"
  - "[[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]"
  - "[[Celldega]]"
  - "[[Digital Pathology Software]]"
  - "[[Digital Pathology]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
url: "https://www.bioptimus.com/m-optimus"
source_type: platform
external: true
adopted: false
engagement: active
license: Commercial / Private Cloud (AWS SageMaker)
last_reviewed: 2026-10-03
---

# M-Optimus

**M-Optimus** (and its initial iteration **M-Optimus-1**) is a multimodal, multi-scale biological foundation model developed by **Bioptimus** (Paris, France). Conceived as a "world model for biology," M-Optimus integrates phenotypic morphology with molecular genetics by cross-training on paired Hematoxylin and Eosin (H&E) whole-slide histology, bulk transcriptomics (RNA-seq), and high-plex spatial transcriptomics (10x Genomics Visium and Xenium).

A breakthrough capability of M-Optimus-1 is its ability to perform **in silico spatial transcriptomics**, reconstructing high-dimensional spatial gene expression profiles for **6,000+ genes directly from routine H&E whole-slide images**—either in H&E-only mode or guided by paired bulk RNA-seq.

- **Platform Overview:** [bioptimus.com/m-optimus](https://www.bioptimus.com/m-optimus)
- **Technical Launch:** [bioptimus.com/introducing-m-optimus](https://www.bioptimus.com/introducing-m-optimus)
- **Clinical Biomarker Demonstration:** [[From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer]] ([bioptimus.com Blog](https://www.bioptimus.com/m-optimus-1-for-spatial-biomarker-discovery-in-ovarian-cancer))
- **Consortium Data Engine (STELA):** [bioptimus.com/stela](https://www.bioptimus.com/stela) (scaling multi-modal spatial discoveries to 100,000 patients)
- **Deployment:** Private enterprise inference via Amazon Web Services (AWS SageMaker JumpStart / Bedrock)

---

## Architectural Principles & Modality Fusion

Most conventional digital pathology foundation models (e.g., UNI, Virchow, Phikon, Prov-GigaPath) are strictly unimodal: they operate as vision encoders mapping $256 \times 256$ px RGB image patches into latent representation vectors. While powerful for morphological feature extraction, they cannot directly infer unmeasured molecular transcripts or spatial multi-omics.

M-Optimus bridges the scale and modality divide across three layers of biological abstraction:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   M-OPTIMUS MULTIMODAL PYRAMID                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

  Level 3: Tissue Architecture & Spatial Niches ──►  In Silico Spatial Transcriptomics (6,000+ Genes)
                                                                 ▲
                                                                 │ (Cross-Modal Attention & Decoding)
  Level 2: Cellular Phenotypes & Morphology      ──►  Gigapixel Whole-Slide H&E (Tile Embeddings)
                                                                 ▲
                                                                 │ (Biological Co-Embedding Space)
  Level 1: Molecular Profiling & Transcriptomics ──►  Bulk RNA-seq Expression Vectors
```

### Pre-Training Foundation & Scaling
- **Histological Breadth:** Trained on tens of millions of H&E tiles spanning more than 50 human tissue and tumor types.
- **Multimodal Alignment:** Incorporates thousands of multi-modal clinical donor datasets where physical histology slides are aligned with both bulk transcriptomics and spatial transcriptomics arrays.
- **Inference Modes:**
  1. *Multimodal Inference (H&E + Bulk RNA-seq):* Ingests the whole-slide H&E image alongside patient-level bulk transcriptomics (or pseudo-bulked scRNA-seq), projecting bulk molecular abundance into high-resolution spatial coordinates across the slide.
  2. *Unimodal Image-Only Inference (H&E-only):* Infers 6,000+ spatial gene expression maps directly from morphological features alone, unlocking archival glass slides where tissue blocks or fresh RNA are unavailable.

---

## Key Capabilities & Clinical Applications

### 1. In Silico Spatial Transcriptomics (SpT)
Wet-lab spatial sequencing requires specialized hardware, expensive consumables ($1,500–$5,000/slide), and destroys clinical tissue. M-Optimus-1 generates virtual spatial expression maps at compute cost alone (~$1–$10/slide).
- Validated on unseen stage III-B ovarian papillary serous carcinoma against physical **10x Genomics Xenium Prime** ground truth, achieving **$r = 0.81$** mean Pearson correlation across tumor sub-populations and **$r = 0.78$** for cancer-associated fibroblasts (CAFs) and VEGFA+ tumor cells.

### 2. Unsupervised Spatial Niche Discovery
M-Optimus embeds multi-gene spatial co-expression into an unsupervised clustering framework:
- Decomposes whole slides into biologically coherent microenvironmental functional units (tumor core, hypoxic invasive margin, fibrotic stroma, tertiary lymphoid structures).
- Predicted niche cell compositions matched Xenium ground-truth cellular densities at **Pearson $r = 0.899$**.

### 3. Spatial Biomarker Discovery in Archival Cohorts
Transforms historical clinical trial archives into high-dimensional discovery search spaces:
- In a retrospective cohort of 288 ovarian cancer WSIs (TCIA), M-Optimus-1 identified that spatial colocalization between VEGFA+ tumor cells and CAFs was significantly enriched in patients refractory to bevacizumab anti-angiogenic therapy (**$p = 0.003$**).
- Hierarchical clustering of spatial interactions revealed distinct TME sub-phenotypes among non-responders, providing a rational basis for combination regimens (e.g., anti-VEGF + PARP inhibitors + CAF depletion).

---

## Bioptimus Foundation Model Ecosystem

Bioptimus maintains an integrated suite of open and proprietary AI platforms for life sciences:

1. **H-Optimus-0:** Open-weights histology foundation model (ViT-Giant, 1B parameters) trained on 500,000 whole-slide images; widely recognized as an open benchmark for tissue representation.
2. **H0-mini:** An 86M-parameter compact distillation of H-Optimus-0, engineered for low-latency cell segmentation and classification; powers the CellViT backbone of Owkin's [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]].
3. **M-Optimus-1:** Multimodal world model translating H&E slides into 6,000-gene spatial transcriptomic landscapes.
4. **STELA Initiative:** Global multi-institutional data coalition launched to amass multimodal clinical cohorts across 100,000 patients to train next-generation biology world models.

---

## Related Notes & Vault References

- **Literature Clipping:** [[From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer]]
- **Cellular & Spatial Models:**
  - [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]
  - [[CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification]]
  - [[CellQuant-Net]] / [[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]]
  - [[NuClick]]
- **Spatial Visualization Infrastructure:**
  - [[Celldega]] (Broad Institute high-performance WebGL spatial-omics visualization toolkit)
- **Catalogs & Syntheses:**
  - [[Digital Pathology Software]]
  - [[Articles on computational, digital, and mathematical pathology]]
  - [[Digital Pathology]]

# M-Optimus

**M-Optimus** (ve ilk sürümü **M-Optimus-1**), **Bioptimus** (Paris, Fransa) tarafından geliştirilmiş, multimodal (çok kipli), çok ölçekli bir biyolojik foundation model'dir (temel model). "Biyoloji için bir dünya modeli" olarak tasarlanan M-Optimus, eşleştirilmiş Hematoksilen-Eozin (H&E) tüm lam histolojisi, bulk transkriptomik (RNA-seq) ve yüksek pleksli uzamsal transkriptomik (10x Genomics Visium ve Xenium) verileri üzerinde çapraz eğitim yaparak fenotipik morfolojiyi moleküler genetikle bütünleştirir.

M-Optimus-1'in çığır açan bir yeteneği **in silico uzamsal transkriptomik** gerçekleştirebilmesidir: **rutin H&E tüm lam görüntülerinden doğrudan 6.000'den fazla gen** için yüksek boyutlu uzamsal gen ekspresyonu profillerini, ya yalnızca H&E kipinde ya da eşleştirilmiş bulk RNA-seq rehberliğinde yeniden oluşturur.

- **Platforma Genel Bakış:** [bioptimus.com/m-optimus](https://www.bioptimus.com/m-optimus)
- **Teknik Tanıtım:** [bioptimus.com/introducing-m-optimus](https://www.bioptimus.com/introducing-m-optimus)
- **Klinik Biyobelirteç Gösterimi:** From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer ([bioptimus.com Blog](https://www.bioptimus.com/m-optimus-1-for-spatial-biomarker-discovery-in-ovarian-cancer))
- **Konsorsiyum Veri Motoru (STELA):** [bioptimus.com/stela](https://www.bioptimus.com/stela) (çok kipli uzamsal keşifleri 100.000 hastaya ölçeklendirme)
- **Kullanıma Sunum (Deployment):** Amazon Web Services (AWS SageMaker JumpStart / Bedrock) üzerinden özel kurumsal çıkarım (inference)

---

## Mimari İlkeler ve Kip Füzyonu

Geleneksel dijital patoloji temel modellerinin çoğu (ör. UNI, Virchow, Phikon, Prov-GigaPath) tamamen tek kiplidir: $256 \times 256$ px RGB görüntü yamalarını (patch) latent temsil vektörlerine eşleyen görüntü kodlayıcıları (vision encoder) olarak çalışırlar. Morfolojik özellik çıkarımında güçlü olsalar da ölçülmemiş moleküler transkriptleri veya uzamsal multi-omik verileri doğrudan çıkarsayamazlar.

M-Optimus, biyolojik soyutlamanın üç katmanı boyunca ölçek ve kip ayrımını birleştirir:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   M-OPTIMUS MULTIMODAL PYRAMID                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

  Level 3: Tissue Architecture & Spatial Niches ──►  In Silico Spatial Transcriptomics (6,000+ Genes)
                                                                 ▲
                                                                 │ (Cross-Modal Attention & Decoding)
  Level 2: Cellular Phenotypes & Morphology      ──►  Gigapixel Whole-Slide H&E (Tile Embeddings)
                                                                 ▲
                                                                 │ (Biological Co-Embedding Space)
  Level 1: Molecular Profiling & Transcriptomics ──►  Bulk RNA-seq Expression Vectors
```

### Ön Eğitim Temeli ve Ölçeklendirme
- **Histolojik Kapsam:** 50'den fazla insan dokusu ve tümör tipini kapsayan on milyonlarca H&E karosu (tile) üzerinde eğitilmiştir.
- **Çok Kipli Hizalama:** Fiziksel histoloji lamlarının hem bulk transkriptomik hem de uzamsal transkriptomik dizileriyle hizalandığı binlerce çok kipli klinik donör veri setini içerir.
- **Çıkarım Kipleri:**
  1. *Çok Kipli Çıkarım (H&E + Bulk RNA-seq):* Tüm lam H&E görüntüsünü hasta düzeyindeki bulk transkriptomik verilerle (veya psödo-bulk hâline getirilmiş scRNA-seq ile) birlikte alır ve bulk moleküler bolluğu lam boyunca yüksek çözünürlüklü uzamsal koordinatlara yansıtır.
  2. *Tek Kipli, Yalnızca Görüntüye Dayalı Çıkarım (yalnızca H&E):* 6.000'den fazla genin uzamsal ekspresyon haritalarını yalnızca morfolojik özelliklerden doğrudan çıkarsar; böylece doku bloklarının veya taze RNA'nın bulunmadığı arşiv cam lamlarını kullanılabilir kılar.

---

## Temel Yetenekler ve Klinik Uygulamalar

### 1. In Silico Uzamsal Transkriptomik (SpT)
Islak laboratuvarda uzamsal dizileme özel donanım ve pahalı sarf malzemeleri (lam başına $1,500–$5,000) gerektirir ve klinik dokuyu tüketir. M-Optimus-1, sanal uzamsal ekspresyon haritalarını yalnızca hesaplama maliyetiyle (lam başına ~$1–$10) üretir.
- Görülmemiş evre III-B over papiller seröz karsinomunda fiziksel **10x Genomics Xenium Prime** referans standardına (ground truth) karşı doğrulanmış; tümör alt popülasyonlarında ortalama **$r = 0.81$** Pearson korelasyonuna, kanserle ilişkili fibroblastlar (CAF) ve VEGFA+ tümör hücreleri için ise **$r = 0.78$** değerine ulaşmıştır.

### 2. Denetimsiz Uzamsal Niş Keşfi
M-Optimus, çok genli uzamsal koekspresyonu denetimsiz (unsupervised) bir kümeleme çerçevesine gömer:
- Tüm lamları biyolojik olarak tutarlı mikroçevresel işlevsel birimlere (tümör merkezi, hipoksik invaziv sınır, fibrotik stroma, tersiyer lenfoid yapılar) ayrıştırır.
- Öngörülen niş hücre bileşimleri, Xenium referans standardındaki hücresel yoğunluklarla **Pearson $r = 0.899$** düzeyinde uyum göstermiştir.

### 3. Arşiv Kohortlarında Uzamsal Biyobelirteç Keşfi
Geçmiş klinik çalışma arşivlerini yüksek boyutlu keşif arama uzaylarına dönüştürür:
- 288 over kanseri WSI'ından (TCIA) oluşan retrospektif bir kohortta M-Optimus-1, VEGFA+ tümör hücreleri ile CAF'ler arasındaki uzamsal kolokalizasyonun bevasizumab anti-anjiyogenik tedavisine refrakter hastalarda anlamlı olarak zenginleştiğini saptamıştır (**$p = 0.003$**).
- Uzamsal etkileşimlerin hiyerarşik kümelenmesi, yanıt vermeyenler arasında farklı TME (tümör mikroçevresi) alt fenotiplerini ortaya koymuş ve kombinasyon rejimleri (ör. anti-VEGF + PARP inhibitörleri + CAF deplesyonu) için rasyonel bir temel sağlamıştır.

---

## Bioptimus Temel Model Ekosistemi

Bioptimus, yaşam bilimleri için açık ve tescilli yapay zekâ platformlarından oluşan bütünleşik bir paket sürdürmektedir:

1. **H-Optimus-0:** 500.000 tüm lam görüntüsü üzerinde eğitilmiş, açık ağırlıklı histoloji temel modeli (ViT-Giant, 1 milyar parametre); doku temsili için açık bir kıyaslama ölçütü (benchmark) olarak yaygın biçimde kabul görmektedir.
2. **H0-mini:** H-Optimus-0'ın düşük gecikmeli hücre segmentasyonu ve sınıflandırması için tasarlanmış, 86M parametreli kompakt damıtılmış (distilled) sürümü; Owkin'in HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides çalışmasındaki CellViT omurgasına güç verir.
3. **M-Optimus-1:** H&E lamlarını 6.000 genlik uzamsal transkriptomik haritalara dönüştüren çok kipli dünya modeli.
4. **STELA Girişimi:** Yeni nesil biyoloji dünya modellerini eğitmek amacıyla 100.000 hastayı kapsayan çok kipli klinik kohortlar toplamak üzere başlatılmış küresel, çok kurumlu veri koalisyonu.

---

## İlişkili Notlar ve Kasa (Vault) Referansları

- **Literatür Kırpıntısı:** From Model to Patient: M-Optimus-1 for Spatial Biomarker Discovery in Ovarian Cancer
- **Hücresel ve Uzamsal Modeller:**
  - HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides
  - CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification
  - CellQuant-Net / CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images
  - NuClick
- **Uzamsal Görselleştirme Altyapısı:**
  - Celldega (Broad Institute'un yüksek performanslı WebGL uzamsal-omik görselleştirme araç takımı)
- **Kataloglar ve Sentezler:**
  - Digital Pathology Software
  - Articles on computational, digital, and mathematical pathology
  - Digital Pathology
