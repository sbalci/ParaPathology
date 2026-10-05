---
type: Clipping
status: Developing
language: tr
title: "Reproducibility of the Methods in Medical Imaging with Deep Learning"
source: "https://proceedings.mlr.press/v227/simko24a.html"
source_type: article
author:
  - "[[Attila Simkó]]"
  - "[[Anders Garpebring]]"
  - "[[Joakim Jonsson]]"
  - "[[Tufve Nyholm]]"
  - "[[Tommy Löfstedt]]"
published: 2024-01-23
created: 2026-10-04
description: "Özgün özet değil: Simkó ve arkadaşları, 2018–2022 MIDL tam bildirilerinin kamuya açık veri ve kod depolarını inceleyerek yöntemlerin yeniden çalıştırılabilirliğine ilişkin bir kontrol listesi önerir."
tags:
  - clippings
  - reproducibility
  - medical-imaging
  - machine-learning
  - open-science
order: 80
belongs_to: "[[Clippings]]"
related_to:
  - "[[Reproducibility]]"
  - "[[Image Analysis]]"
  - "[[Appraising AI studies in pathology]]"
hidden: true
---

# Reproducibility of the Methods in Medical Imaging with Deep Learning

## Özet

Simkó ve arkadaşları, 2018–2022 yılları arasında Medical Imaging with Deep Learning (MIDL) konferansında kabul edilen tam bildirileri ve varsa bunlara bağlı kamuya açık kod depolarını incelemiştir. Açık kod depolarının ve kamuya açık veri kümelerinin kullanımı artarken, depo kalitesi aynı ölçüde gelişmemiştir. Yazarların değerlendirmesine göre uygun bildirilerin yaklaşık %22'si, kendi ölçütleriyle **yeniden çalıştırılabilir** sayılan bir kod deposuna sahiptir.

Buradaki “yeniden çalıştırılabilirlik”, kamuya açık eğitim verisi, gerekli bağımlılıkların listesi ve modeli kurup eğitmeye yönelik kodun bulunmasıyla tanımlanır. Bu oran, araştırmacıların tüm modelleri yeniden eğitip yayımlanan sayısal sonuçları bire bir doğruladığı anlamına gelmez. Makalede böyle bir uygulamalı tekrar, gelecek çalışma olarak önerilir.

## Yöntem ve bulgular

- Kapsam: 2018–2022 MIDL tam bildirileri. Makalenin tablosu toplam 316 bildiriyi listeler; bazı ölçütlerin uygulanamadığı 23 bildiri ayrıntılı değerlendirmeden çıkarılmıştır.
- Depo bulunma oranı 2018'de %29,8 iken 2022'de %74,5'tir.
- Depolar; bağımlılıklar, eğitim kodu, değerlendirme veya demo kodu, eğitilmiş model, dokümantasyon ve lisans açısından puanlanmıştır.
- Yazarlar bu gözlemlere dayanarak, gelecekteki MIDL gönderimleri için kod depolarını daha anlaşılır ve yeniden kullanılabilir kılmaya yönelik öneriler sunar.

## Atıf ve kapsam notu

Bu çalışmanın yazarları **Attila Simkó, Anders Garpebring, Joakim Jonsson, Tufve Nyholm ve Tommy Löfstedt**'tir. **Joey Spronck** aynı MIDL 2023 konferansında sunulan, patolojiye uyarlanmış nnUNet üzerine [ayrı bir makalenin](https://proceedings.mlr.press/v227/spronck24a.html) ilk yazarıdır.

Çalışma **MIDL 2023'te sunulmuş**, *Proceedings of Machine Learning Research* cilt 227, sayfa 95–106 içinde **2024'te yayımlanmıştır**. [Yayın kaydı](https://proceedings.mlr.press/v227/simko24a.html) ve [tam metin PDF](https://proceedings.mlr.press/v227/simko24a/simko24a.pdf).

<!-- tolaria:related:start -->

## See also

* [Appraising AI studies in pathology](../writing-journal-articles/ai-study-appraisal.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Reproducibility](../writing-journal-articles/reproducibility.md)

<!-- tolaria:related:end -->
