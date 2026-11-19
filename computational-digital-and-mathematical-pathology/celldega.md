---
type: Tool
status: Evergreen
language: bilingual
title: "Celldega"
aliases:
  - "Celldega"
  - "celldega"
order: 178
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Cytario]]"
  - "[[Cytomine]]"
  - "[[Image Analysis]]"
  - "[[HistoCAM]]"
url: https://broadinstitute.github.io/celldega/
repo: https://github.com/broadinstitute/celldega
paper: https://doi.org/10.64898/2026.08.13.744672v2
source_type: repository
external: true
adopted: false
engagement: active
license: Broad Institute Academic Software License
last_reviewed: 2026-09-27
---

# Celldega

A source-available visualization toolkit and spatial biology exploration engine developed by the Broad Institute of MIT and Harvard (Fernandez, Ishar, Wang, Ben Saad, Lipinski & Farhi, *bioRxiv* 2026). Celldega is engineered to address the scalability bottleneck of client-side spatial omics and multiplexed digital pathology datasets (>1 billion transcripts, millions of segmented cells) by leveraging browser-native streaming, GPU-accelerated rendering, and specialized columnar storage formats.

- **Documentation & Web Viewer:** [broadinstitute.github.io/celldega](https://broadinstitute.github.io/celldega/)
- **GitHub Repository:** [broadinstitute/celldega](https://github.com/broadinstitute/celldega)
- **Preprint:** Fernandez et al. *Celldega: Integrated Toolkit for Visualization and Analysis of Spatial Data.* bioRxiv (2026). [DOI: 10.64898/2026.08.13.744672v2](https://doi.org/10.64898/2026.08.13.744672v2)
- **Interactive Notebook Demo:** [marimo interactive notebook on molab](https://molab.marimo.io/notebooks/nb_A6JG5XUg5EPJyMwNDcsM18)

**License checked 1 October 2026:** The upstream [LICENSE.txt at commit `726b57c`](https://github.com/broadinstitute/celldega/blob/726b57cfeff1a0e70b06b91b079bd592b91daeca/LICENSE.txt) is the Broad Institute Academic Software License. It grants specified educational and academic-research uses to academic/nonprofit researchers and directs commercial entities to Broad for licensing. Read the full terms before use or redistribution. This check concerns the license only; the research and performance summary below was not re-evaluated.

---

## Architectural Highlights & Innovations

### 1. DegaFiles and Row Group Spatial Indexing
Traditional spatial transcriptomics data storage splits multiplexed datasets into tens of thousands of fragmented files or bulky monolithic tables that overload browser memory. Celldega introduces **DegaFiles**, an open storage convention built on Apache Parquet and GeoParquet:
- Consolidates 50,000+ individual coordinate/feature files into ~10 structured Parquet tables.
- Employs spatial indexing where spatial tile coordinates map directly to Parquet row groups (`row_group_index = tile_x * num_tiles_y + tile_y`).
- Utilizes byte-range HTTP streaming via WebAssembly (`parquet-wasm` and Apache Arrow), fetching only the precise byte chunks needed for the user's active viewport without requiring server-side Python kernels.

### 2. GPU-Accelerated Multi-Layer Rendering
Built on [deck.gl](https://deck.gl/) and HTML5 Canvas, Celldega renders hundreds of millions of spatial data points, polygonal cell segmentations, and multi-channel image pyramids concurrently at 60 fps:
- **Spatial Alignment:** Co-registers high-resolution whole-slide brightfield/fluorescent imagery with single-cell transcriptomic annotations.
- **Dynamic Shading & Gating:** Real-time client-side expression thresholds and cluster re-coloring without server re-computation.

### 3. Specialized Analytical Views
Celldega provides distinct visualization modalities:
- **Landscape View:** 2D multi-layer spatial exploration of tissue sections, combining cell segmentation masks and individual transcript dots.
- **Yearbook View:** High-throughput single-cell gallery displaying isolated morphology across phenotypic clusters.
- **CellCloud & NeighborhoodCloud:** 3D orbital embedding visualizers linking dimensionality-reduced manifolds (UMAP/t-SNE) directly back to spatial coordinates.
- **Clustergram & Composition:** Interactive heatmaps displaying cell type compositions across histological tissue zones.
- **Enrich:** Direct integration with Enrichr for immediate pathway and gene-set enrichment queries from selected spatial regions.

---

## Comparison with Existing Spatial Systems

| Dimension | Cytario | Celldega | Vitessce |
|---|---|---|---|
| **Primary Scope** | Image Management System (IMS) & clinical WSI viewer | Spatial omics & multiplexed transcriptomics analytics | General bioimaging & spatial omics dashboard |
| **Backend Storage** | S3 object store (OME-Zarr, OME-TIFF, GeoTIFF) | DegaFiles (GeoParquet / Parquet with row-group indexing) | Zarr / AnnData / OME-TIFF |
| **Streaming Mechanism** | DuckDB-WASM & Viv multi-scale tiles | Parquet-WASM byte-range streaming via deck.gl | Viv multi-resolution loaders |
| **Target Workload** | Petabyte-scale clinical digital pathology workflows | Billion-transcript spatial exploratory analysis | Multimodal exploratory dashboards |

# Celldega

Broad Institute of MIT and Harvard tarafından geliştirilmiş, kaynak kodu erişilebilir (source-available) bir görselleştirme araç takımı ve uzamsal biyoloji keşif motoru (Fernandez, Ishar, Wang, Ben Saad, Lipinski & Farhi, *bioRxiv* 2026). Celldega, istemci tarafındaki uzamsal omik ve multipleks dijital patoloji veri setlerinin (>1 milyar transkript, milyonlarca segmente edilmiş hücre) ölçeklenebilirlik darboğazını, tarayıcıya özgü akış (streaming), GPU hızlandırmalı görüntüleme (rendering) ve özelleşmiş sütunsal (columnar) depolama formatlarından yararlanarak aşmak üzere tasarlanmıştır.

- **Dokümantasyon ve Web Görüntüleyici:** [broadinstitute.github.io/celldega](https://broadinstitute.github.io/celldega/)
- **GitHub Deposu:** [broadinstitute/celldega](https://github.com/broadinstitute/celldega)
- **Ön baskı (preprint):** Fernandez et al. *Celldega: Integrated Toolkit for Visualization and Analysis of Spatial Data.* bioRxiv (2026). [DOI: 10.64898/2026.08.13.744672v2](https://doi.org/10.64898/2026.08.13.744672v2)
- **Etkileşimli Notebook Demosu:** [molab üzerinde marimo etkileşimli notebook](https://molab.marimo.io/notebooks/nb_A6JG5XUg5EPJyMwNDcsM18)

**Lisans 1 Ekim 2026'da kontrol edilmiştir:** Kaynak depodaki [`726b57c` commit'indeki LICENSE.txt](https://github.com/broadinstitute/celldega/blob/726b57cfeff1a0e70b06b91b079bd592b91daeca/LICENSE.txt) dosyası Broad Institute Academic Software License'tır. Bu lisans, akademik/kâr amacı gütmeyen araştırmacılara belirli eğitim ve akademik araştırma kullanımları için izin verir ve ticari kuruluşları lisanslama için Broad'a yönlendirir. Kullanım veya yeniden dağıtımdan önce tüm koşulları okuyun. Bu kontrol yalnızca lisansla ilgilidir; aşağıdaki araştırma ve performans özeti yeniden değerlendirilmemiştir.

---

## Mimari Öne Çıkan Özellikler ve Yenilikler

### 1. DegaFiles ve Row Group Tabanlı Uzamsal İndeksleme
Geleneksel uzamsal transkriptomik veri depolama, multipleks veri setlerini on binlerce parçalı dosyaya ya da tarayıcı belleğini aşırı yükleyen hacimli tek parça (monolitik) tablolara böler. Celldega, Apache Parquet ve GeoParquet üzerine kurulu açık bir depolama kuralı olan **DegaFiles**'ı sunar:
- 50.000'den fazla ayrı koordinat/öznitelik dosyasını ~10 yapılandırılmış Parquet tablosunda birleştirir.
- Uzamsal karo (tile) koordinatlarının doğrudan Parquet row group'larına eşlendiği uzamsal indeksleme kullanır (`row_group_index = tile_x * num_tiles_y + tile_y`).
- WebAssembly (`parquet-wasm` ve Apache Arrow) aracılığıyla bayt aralıklı (byte-range) HTTP akışından yararlanır; sunucu tarafında Python çekirdeği (kernel) gerektirmeden yalnızca kullanıcının etkin görüş alanı (viewport) için gereken bayt parçalarını getirir.

### 2. GPU Hızlandırmalı Çok Katmanlı Görüntüleme
[deck.gl](https://deck.gl/) ve HTML5 Canvas üzerine kurulu olan Celldega, yüz milyonlarca uzamsal veri noktasını, poligonal hücre segmentasyonlarını ve çok kanallı görüntü piramitlerini eşzamanlı olarak 60 fps hızında görüntüler:
- **Uzamsal Hizalama:** Yüksek çözünürlüklü tüm lam (whole-slide) parlak alan/floresan görüntüleri tek hücre transkriptomik anotasyonlarıyla eş-kayıtlar (co-registration).
- **Dinamik Renklendirme ve Geçitleme (Gating):** Sunucuda yeniden hesaplama gerektirmeden, istemci tarafında gerçek zamanlı ekspresyon eşikleri ve küme yeniden renklendirmesi.

### 3. Özelleşmiş Analitik Görünümler
Celldega farklı görselleştirme modaliteleri sunar:
- **Landscape View:** Hücre segmentasyon maskelerini ve tek tek transkript noktalarını birleştiren, doku kesitlerinin 2B çok katmanlı uzamsal incelemesi.
- **Yearbook View:** Fenotipik kümeler boyunca izole morfolojiyi gösteren yüksek verimli tek hücre galerisi.
- **CellCloud & NeighborhoodCloud:** Boyut indirgenmiş manifoldları (UMAP/t-SNE) doğrudan uzamsal koordinatlara geri bağlayan 3B yörüngesel gömme (embedding) görselleştiricileri.
- **Clustergram & Composition:** Histolojik doku bölgeleri boyunca hücre tipi bileşimlerini gösteren etkileşimli ısı haritaları.
- **Enrich:** Seçilen uzamsal bölgelerden anında yolak (pathway) ve gen seti zenginleştirme sorguları için Enrichr ile doğrudan entegrasyon.

---

## Mevcut Uzamsal Sistemlerle Karşılaştırma

| Boyut | Cytario | Celldega | Vitessce |
|---|---|---|---|
| **Birincil Kapsam** | Görüntü Yönetim Sistemi (IMS) ve klinik WSI görüntüleyici | Uzamsal omik ve multipleks transkriptomik analitiği | Genel biyogörüntüleme ve uzamsal omik kontrol paneli |
| **Arka Uç Depolama** | S3 nesne deposu (OME-Zarr, OME-TIFF, GeoTIFF) | DegaFiles (row group indeksli GeoParquet / Parquet) | Zarr / AnnData / OME-TIFF |
| **Akış Mekanizması** | DuckDB-WASM ve Viv çok ölçekli karolar | deck.gl üzerinden Parquet-WASM bayt aralıklı akış | Viv çok çözünürlüklü yükleyiciler |
| **Hedef İş Yükü** | Petabayt ölçekli klinik dijital patoloji iş akışları | Milyar transkriptlik uzamsal keşifsel analiz | Multimodal keşifsel kontrol panelleri |
