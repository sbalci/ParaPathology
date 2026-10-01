---
type: Note
status: Developing
review_status: Partial
last_reviewed: 2026-09-28
language: bilingual
aliases:
  - "Histopatoloji çalışmalarında istatistik için nasıl veri hazırlanır?"
order: 20
belongs_to: "[[Statistics, Bioinformatics, and Pathology]]"
---

# Histopatoloji çalışmalarında istatistik için nasıl veri hazırlanır?

**Gözden geçirme kapsamı (28 Eylül 2026):** Bu kısmi güncellemede test seçiminde örneklem büyüklüğü, eksik veri ve şüpheli gözlemlerin kaydı ele alındı. Aşağıdaki örneklem büyüklüğü soruları bir hesaplama kuralı değildir; çalışmanın amacı ve tasarımına göre ayrıca değerlendirilmelidir. Diğer klinik öneriler, CAP protokolleri ve sayısal örneklerin tamamı bu incelemede doğrulanmadı.

### Histopatoloji çalışmalarında istatistik analizi için nasıl veri hazırlanır?

İstatistik analizlerinde en çok vakit alan kısım verilerin düzenlenmesi ve analize hazır hale getirilmesidir. Bu durum o kadar belirgindir ki veri analizi ile ilgili eğitimlerin de özel bir kısmını "veri temizleme" dersleri oluşturmaktadır \(Coursera\). Analize hazır haldeki veri "temiz veri" olarak adlandırılır \(Tidy Data, H.Wickham\). İstatistikçilerin kısıtlı vakti olduğunu düşünüldüğünde verinin temiz olarak teslim edilmesi onların veriyi rahat anlamalarına ve veri temizleme için ayıracakları vakit yerine sizin araştırmanızdaki ilginç noktalara odaklanmalarına yardımcı olacaktır. Ayrıca temiz veri ile çalışmanın istatistikçileri daha mutlu ettiğini ve özen gösterilmiş bir veride onların da daha özenli çalıştığını gözlemlediğimi belirtmek isterim.

Bu yazıda hipotetik bir histopatoloji çalışması için basamak basamak veri hazırlanma süreci anlatılacaktır.

Histopatolojik makalelerde bulunması gereken minimum bilgiler

Bu yazıda kendi karşılaştığım problemleri ve literatürdeki önerileri \(Virchows Arch \(2015\) 466:611–615\) derlemeye çalıştım.

Statistical Problems to Document and to Avoid Manuscript Checklist for Authors

Aslında bir "eski tümöre yeni boya" olarak adlandırılan ve sık yapılan bir çalışma türünü inceleyeceğiz. Bunun için yapılacak ilk iş çalışılacak tümörle ilgili CAP protokolünü dikkatlice okumaktır. CAP protokollerinin özellikle not ve açıklama kısımlarındaki detaylar çok faydalı olacaktır. Bundan sonra bir boş kağıt alıp CAP protokolünde raporda belirtilmesi gereken konular maddeler halinde sıralanmalıdır. Bu maddeler çalışmanın tasarlamasından, analizine, yorumuna ve tartışmasına çok yardımcı olacaktır.

* **Temiz veri için dikkat edilmesi gereken kurallar:**
* Her satır tek hasta
* Her sütun tek bilgi
* Her bilgi tek bir şekilde ifade edilecek
* **Verinin girileceği bilgisayar programı**

Aynı değerin farklı şekilde yazılması

Veri hazırlamak için excel ya da filemaker kullanılmasını öneririm.

* **Vaka numarası**

Çalışmaya kaç vaka alınacak?

Her değişken için 10 vaka?

Vakaların seçilme şekli: Gelişigüzel? Randomize? Birbirini takip eden \(consequative\)

* **Yıl**

Hangi yıl aralığı tercih edilmeli?

Yıl aralığınının belirtilmesi nadir vakalarda vaka sayısı ile ilgili bilgi verebilir. Bu nedenle klinikteki toplam vaka sayısı ile karşılaştırma yapılması

Bir klinikten çıkan vaka sayısı da o klinikte bu işin ne kadar ciddi yapıldığının ve tecrübenin göstergesi. Kabul şansını arttıran faktör.

İmmünohistokimya için eski vakalar mı tercih edilecek yeni vakalar mı?

* **Biyopsi No**
* **TC Kimlik, Hasta No, Ad Soyad**
  * hasta bazlı çalışma vs örnek bazlı çalışma
  * HIPAA kuralları
  * 
* **Yaş**

Yıl, ay

Eğer tümör belli bir yaş aralığında görülüyor, ya da bimodal dağılım gösteriyorsa \(osteosarkom gibi\) bu durumu

* **Doğum Tarihi**
* **Cinsiyet**
* * **Tümör çapı**
* **T evresi**
* **N evresi**
  * **Lenf nodu**

    Direk invazyon
* **M evresi**
* **TNM/AJCC evresi**
* **Histopatolojik tip**
* * **Lenfovasküler İnvazyon \(LVI\)**

Lenfovasküler invazyon çoğu tümör raporlarında belirtilmesi gereken bir özelliktir.

Önerilen kodlama şekli var ise 1, yok ise 0 şeklindedir.

Lenfatik ve vasküler invazyon ayrı ayrı da kodlanabilir. Mesela kolon tümörlerinde ekstramural venöz invazyonun belirtilmesi gibi.

"Equivocal" olarak belirtilen şüpheli gözlemleri, analizi kolaylaştırmak için zorla pozitif ya da negatif yapmamak gerekir. İlk gözlemi ve şüphenin nedenini koruyun; "şüpheli", "değerlendirilemedi" ve "veri yok" durumlarını veri sözlüğünde ayrı tanımlayın. Yeniden değerlendirme veya uzlaşı uygulanacaksa yöntemini önceden belirleyin ve hem ilk hem son değerlendirmeyi kaydedin. Şüpheli olguların ana analizde nasıl ele alınacağı ve alternatif sınıflamalarla duyarlılık analizi yapılıp yapılmayacağı analiz planında belirtilmelidir.

"Extensive retraction artefact" gibi özellikli durumlar çalışmıyorsa immünohistokimyasal çalışmalara gerek olmadan rutin H&E değerlendirme yeterlidir.

Raporlardan elde edilen bulgular da analiz için kullanılabilir. Özellikle rutin rapora göre tedavi planlanan durumlarda, doğal seyri seyretmek istediğiniz çalışmalarda bunu yapabilirsiniz.

Patologların ise yaptıkları çalışmalarda mutlaka tüm vakalara yeniden bakmaları önerilir. Bazen araştırmacılar sadece "negatif" olarak raporlanan vakalara bakıp, bunlarda "atlanan" lenfovasküler invazyonu yakalamaya çalışırlar. Bu durumda lenfovasküler invazyon yüzdeniz literatürden yüksek çıkacaktır \(Yanlış negatifler azalacaktır\). Pozitif olan olgulara da bakılmalı, "pozitif" olarak raporlanan ve aslında lenfovasküler invazyonu olmayan vakalar \(yanlış pozitif\) ise negatif olarak analize alınmalıdır.

Lenf nodunda metastaz olan olgularda lenfovasküler invazyonu pozitif olarak kabul etmek uygun değildir. Lenf noduna metastaz yapmanın ayrı peritümöral lenfovasküler invazyon tespit edilmesinin ayrı tümör gelişim basamakları olduğu düşünülmelidir.

* **Perinöral \(perinöryal\) invazyon**
* **Cerrahi sınır**
* **Ek hastalık**
* **İkinci primer**

Birden fazla tümörü olan olgularda klinik gidişi ve sağkalımı diğer tümör etkiliyor olabilir. Sistoprostatektomilerde ürotelyal karsinom sağkalıma, prostat tümörlerinden daha fazla etki edecektir.

Bu vakaların çıkartılması da insidansı etkileyebilir. Bu nedenle çalışmanın tasarımına göre bu vakaları eklemek ya da çıakrtmak gerekecektir.

* **İmmünohistokimya**
  * Pozitif, negatif
  * Kayıp, korunmuş
  * Şiddet
  * Yaygınlık
  * H-skor, Allred score, Quick score
  * Hangi hücre pozitif
  * Hangi komponent pozitif \(nükleer, sitoplazmik, membranöz\)
  * Yüzde
  * Sonuçları gruplama
  * Uygun antikor klonunu seçmek ayrı bir yazı konusu olmalı.
* **Ameliyat şekli**
* **Sağkalım**

Sağkalım verisi de hassas bilgilerdendir.

Ölüm bildirim sistemi

Tarihler

Tanı tarihi

Son tarih

Tarih girerken neye dikkat edelim \(İngilizce ve Türkçe farklı tarih formatları\)

* **Overall survival**
* **Disease Free Survival**
* **Vertikal tarama**
* **Bilinmeyen veriler, Eksik veriler, Missing values**

Her eksik hücre, vakanın bütün analizlerden çıkması anlamına gelmez. Tam olgu analizi \(complete-case analysis\) seçilirse yalnızca o modelin gerektirdiği değişkenlerden biri eksik olan olgular o analizden dışlanır. Bu nedenle her analizde kullanılan olgu sayısını ve dışlanma nedenlerini ayrıca belirtin.

Eksikliği 0 ya da "negatif" olarak kodlamayın; biliniyorsa nedenini kaydedin. Eksik verinin miktarı, örüntüsü ve hangi süreçle oluştuğu değerlendirilerek tam olgu analizi, çoklu atama \(multiple imputation\) veya başka uygun yöntemler planlanabilir. Çoklu atama da varsayımlara dayanır ve her durumda daha doğru değildir. White ve Carlin'in kuramsal ve simülasyon çalışması, eksik kovaryatların oluşma mekanizmasına göre yöntemlerin yanlılığının değişebildiğini gösterir. Seçimi otomatik silme ya da otomatik atama şeklinde yapmamak gerekir. [White ve Carlin, 2010](https://doi.org/10.1002/sim.3944).

Eksik camlar

Eksik verileri excelde kontrol etme

* **Tek merkez, çok merkezli çalışma**
* **İstatistikçiye sorulması gereken sorular**

Çalışmaya başlamadan önce, hangi soruları soracağınızı zaten planlamış olmanız ve buna göre verilerinizi düzenlemiş olmanız gerekir. Yine de çalışma sürerken ve çalışmanın sonunda yeni sorular ve düşünceler ortaya çıkabilir. Sorulacak sorular ve yapılacak analizler için bir ön hazırlık yapmak ve bunları düzgün cümleler halinde kaydetmek önemlidir. Mesela "tümör tipleri ile X protein ekspresyonunu karşılaştırmak istiyorum" bir soru olabilir. Ama daha iyisi "X proteininin ekspresyonunun A tümöründe B tümörüne göre daha fazla olduğunu düşünüyorum, bunun öyle olup olmadığını analiz etmenizi istiyorum" daha da anlaşılır bir soru olacaktır.

* **Bana p değeri ver**
* **Hangi istatistik yöntemlerini bilmem lazım**

Tıp fakültesinin ilk yıllarında öğrenilen istatistikle ilgili kavramlar yıllar içinde unutuluyor. Elbette herkesin detaylı olarak istatistik metodlarını bilmesine gerek yok. Ancak yine de bir istatistik okuryazarlığının \(statistical literacy\) olmasında fayda var.

* ANOVA testi

Tek yönlü ANOVA, bağımsız grupların sürekli bir ölçüm bakımından ortalamalarını karşılaştırmak için kullanılabilir. Mesela yaş veya özefagus lümeninin özefagus duvarına oranı gibi ölçümler düşünülebilir. Uygunluk yalnızca vaka sayısına bakılarak belirlenmez: araştırma sorusu, gözlemlerin bağımsızlığı, grup içi dağılımlar, aykırı değerler ve varyanslar değerlendirilmelidir. Klasik ANOVA'nın eşit varyans varsayımı uygun değilse Welch ANOVA gibi seçenekler değerlendirilir; tekrarlı ya da kümelenmiş gözlemler için tasarıma uygun yöntem gerekir.

Ancak histopatolojik derecelendirme ya da evreleme gibi sıralı kategorileri, eşit aralıklı sürekli bir ölçüm gibi ele almamak gerekir. Grade 1 ila grade 2 arasındaki fark ile grade 2 ila grade 3 arasındaki farkın matematiksel olarak eşit olduğu varsayılmaz. Grade 2, grade 1'den 2 kat kötü, grade 3 ise grade 1'den 3 kat kötüdür gibi bir yorum yapılmaz.

Hastaların kanser evresinin ortalama 2,5 ya da tümör grade'inin ortalama 1,2 olarak verilmesi, kategoriler arasındaki uzaklıklar eşit kabul edilemediği için yanıltıcı olabilir. Kategorilerin sayı ve yüzdelerini verin; soruya göre ortanca ve çeyrekler arası aralık da kullanılabilir. Üç veya daha fazla bağımsız grubun sıralı sonuçlarını karşılaştırırken Kruskal–Wallis bir seçenek olabilir, ancak otomatik olarak seçilmez. Sıralara dayalı bu testin sonucunu yalnızca ortanca farkı olarak yorumlamak, grupların dağılım şekilleri bakımından ek varsayımlar gerektirir; kovaryatların etkisi araştırılıyorsa uygun bir sıralı sonuç modeli gerekebilir.

"30'dan az vaka varsa Kruskal–Wallis kullanılır" şeklinde evrensel bir kural yoktur. Blanca ve arkadaşları, üç grubun varyanslarının eşit olduğu simülasyonlarda, grup başına beş gözlemi de içeren koşullarda ANOVA'nın Tip I hata bakımından dayanıklı olduğunu bulmuştur. Bu sonuç, küçük örneklemde yeterli güç bulunduğunu veya ANOVA'nın bütün dağılım ve varyans koşullarında uygun olduğunu göstermez. Testi örneklem büyüklüğü ya da bir normallik testinin p değerine tek başına bağlamayın; ölçmek istediğiniz farkı ve yöntemin varsayımlarını birlikte değerlendirin. [Blanca ve ark., 2017](https://doi.org/10.7334/psicothema2016.383).

İstatistik dışı bakış açısı ile; Kanser evreleme çalışmalarında \(lenf nodu sayısında\) logaritmik dönüşüm çok kullanılıyor. Ve hemen tüm çalışmalarda işe yarıyor. Örnek [https://www.ncbi.nlm.nih.gov/pubmed/28094085](https://www.ncbi.nlm.nih.gov/pubmed/28094085) Ama klinikte bilgisayar destekli bir karar sistemi kullanılmadığı zaman bu logaritmik değerler çok afaki kalabiliyor. Model anlamlı olsa da pratikte anlaması zor oluyor. Normallik yoksa nonparametrik testleri bir kademe daha rahat anlayabiliyorum.

### Top ten errors of statistical analysis in observational studies for cancer research

[https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9](https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9)

## Articles to be discussed:

### Histologic pattern is better correlated with clinical outcomes than biochemical classification in patients with drug-induced liver injury.

[https://www.ncbi.nlm.nih.gov/pubmed/?term=31300804](https://www.ncbi.nlm.nih.gov/pubmed/?term=31300804)
