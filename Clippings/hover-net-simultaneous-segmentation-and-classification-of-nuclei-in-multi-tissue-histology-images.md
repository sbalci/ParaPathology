---
type: Clipping
status: Developing
language: tr
title: "HoVer-Net: Simultaneous segmentation and classification of nuclei in multi-tissue histology images"
source: "https://doi.org/10.1016/j.media.2019.101563"
source_type: article
author:
  - "[[Simon Graham]]"
  - "[[Quoc Dang Vu]]"
  - "[[Shan E Ahmed Raza]]"
  - "[[Ayesha Azam]]"
  - "[[Yee-Wah Tsang]]"
  - "[[Jin Tae Kwak]]"
  - "[[Nasir M. Rajpoot]]"
published: 2019-09-18
created: 2026-10-04
description: "Özgün özet değil: HoVer-Net, H&E doku görüntülerinde çekirdek örneklerini ayırmak ve türlerini belirlemek için yatay ve dikey merkez uzaklığı tahminlerini kullanan bir evrişimli sinir ağıdır."
doi: "10.1016/j.media.2019.101563"
pmid: "31561183"
tags:
  - clippings
  - computational-pathology
  - nuclei-segmentation
  - cell-classification
  - consep
order: 80
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
  - "[[HoVer-NeXt]]"
hidden: true
---

# HoVer-Net: Simultaneous segmentation and classification of nuclei in multi-tissue histology images

## Özet

Graham ve arkadaşlarının HoVer-Net çalışması, H&E boyalı histoloji görüntülerindeki çekirdekleri tek tek bölütlemeyi ve her çekirdeğin türünü sınıflandırmayı aynı ağda birleştirir. Yöntem, çekirdek piksellerinin kendi çekirdeklerinin kütle merkezine göre yatay ve dikey uzaklıklarını tahmin eder. Bu iki uzaklık haritası, bitişik çekirdeklerin ayrılmasına yardımcı olur; ayrı bir yukarı örnekleme kolu çekirdek türünü tahmin eder.

Çalışma ayrıca kolorektal adenokarsinomdan elde edilmiş H&E görüntü karolarını içeren CoNSeP veri kümesini tanıtır: 41 adet 1000 × 1000 piksel görüntü karosu ve sınıf etiketleriyle birlikte ayrıntılı işaretlenmiş 24.319 çekirdek. Bu sayı veri kümesinin toplam anotasyonunu ifade eder; yalnızca eğitim bölümünü değil.

## Kaynak bilgileri

- **Atıf:** Graham S, Vu QD, Raza SEA, Azam A, Tsang Y-W, Kwak JT, Rajpoot NM. *Medical Image Analysis*. 2019;58:101563. [DOI: 10.1016/j.media.2019.101563](https://doi.org/10.1016/j.media.2019.101563).
- **Yayın tarihi:** Çevrim içi 18 Eylül 2019; cilt 58'in resmi tarihi Aralık 2019.
- **Makale kaydı ve erişilebilir kabul edilmiş sürüm:** [University of Warwick](https://wrap.warwick.ac.uk/id/eprint/126044/).
- **Yazarların uygulaması ve CoNSeP bağlantısı:** [HoVer-Net GitHub deposu](https://github.com/vqdang/hover_net).

## Yorum

HoVer-Net'in ayırt edici katkısı, yoğun çekirdek kümelerinde örnek sınırlarını çıkarabilmek için iki yönlü konum bilgisini kullanması ve bölütleme ile sınıflandırmayı birlikte ele almasıdır. Çok dokulu değerlendirme, yöntemin tek bir doku tipine özgü olmadığını gösterir; başka tarayıcı, boyama protokolü veya klinik kohortlarda performansın ayrıca doğrulanması gerekir.

<!-- tolaria:related:start -->

## See also

* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [HoVer-NeXt](../computational-digital-and-mathematical-pathology/hover-next.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)

<!-- tolaria:related:end -->
