# Histopatoloji çalışmalarında istatistik için nasıl veri hazırlanır?

## Histopatoloji çalışmalarında istatistik için nasıl veri hazırlanır?

### Histopatoloji çalışmalarında istatistik için nasıl veri hazırlanır?

### Histopatoloji çalışmalarında istatistik analizi için nasıl veri hazırlanır?

İstatistik analizlerinde en çok vakit alan kısım verilerin düzenlenmesi ve analize hazır hale getirilmesidir. Bu durum o kadar belirgindir ki veri analizi ile ilgili eğitimlerin de özel bir kısmını "veri temizleme" dersleri oluşturmaktadır \(Coursera\). Analize hazır haldeki veri "temiz veri" olarak adlandırılır \(Tidy Data, H.Wickham\). İstatistikçilerin kısıtlı vakti olduğunu düşünüldüğünde verinin temiz olarak teslim edilmesi onların veriyi rahat anlamalarına ve veri temizleme için ayıracakları vakit yerine sizin araştırmanızdaki ilginç noktalara odaklanmalarına yardımcı olacaktır. Ayrıca temiz veri ile çalışmanın istatistikçileri daha mutlu ettiğini ve özen gösterilmiş bir veride onların da daha özenli çalıştığını gözlemlediğimi belirtmek isterim.

Bu yazıda hipotetik bir histopatoloji çalışması için basamak basamak veri hazırlanma süreci anlatılacaktır.

Histopatolojik makalelerde bulunması gereken minimum bilgiler

Bu yazıda kendi karşılaştığım problemleri ve literatürdeki önerileri \(Virchows Arch \(2015\) 466:611–615\) derlemeye çalıştım.

Statistical Problems to Document and to Avoid Manuscript Checklist for Authors

[http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist](http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist)

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

CAP protokollerinde "equivocal" olarak belirtilen şüpheli durumlardan mümkün oldukça kaçınmak analizlerin daha rahat yapılabilmesi için gereklidir.

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

Her eksik hücre, çok değişkenli analizden o vakanın düşmesine neden olacaktır.

Eksik camlar

Eksik verileri excelde kontrol etme

* **Tek merkez, çok merkezli çalışma**
* **İstatistikçiye sorulması gereken sorular**

Çalışmaya başlamadan önce, hangi soruları soracağınızı zaten planlamış olmanız ve buna göre verilerinizi düzenlemiş olmanız gerekir. Yine de çalışma sürerken ve çalışmanın sonunda yeni sorular ve düşünceler ortaya çıkabilir. Sorulacak sorular ve yapılacak analizler için bir ön hazırlık yapmak ve bunları düzgün cümleler halinde kaydetmek önemlidir. Mesela "tümör tipleri ile X protein ekspresyonunu karşılaştırmak istiyorum" bir soru olabilir. Ama daha iyisi "X proteininin ekspresyonunun A tümöründe B tümörüne göre daha fazla olduğunu düşünüyorum, bunun öyle olup olmadığını analiz etmenizi istiyorum" daha da anlaşılır bir soru olacaktır.

* **Bana p değeri ver**
* **Hangi istatistik yöntemlerini bilmem lazım**

Tıp fakültesinin ilk yıllarında öğrenilen istatistikle ilgili kavramlar yıllar içinde unutuluyor. Elbette herkesin detaylı olarak istatistik metodlarını bilmesine gerek yok. Ancak yine de bir istatistik okuryazarlığının \(statistical literacy\) olmasında fayda var.

* ANOVA testi

30 vaka sayılı, tercihen verilerin normal dağıldığı durumlarda ve veriler ölçülebilir ve sürekli nitelikte ise kullanılır. Mesela yaş, özefagus lümeninin, özefagus duvarına oranı gibi durumlarda kullanılabilir.

Ancak histopatolojik dercelendirme ya da evreleme gibi kesikli değişkenlerin olduğu durumlarda parametrik test olan ANOVA önerilmez. Grade 1 ila grade 2 arasındaki fark ile grade 2 ila grade 3 arasındaki fark matematiksel olarak eşit değildir. Grade 2, grade 1 den 2 kat kötü, grade 3 ise grade 1'den 3 kat kötüdür gibi bir yorum yapılmaz.

Hastaların kanser evresinin ortalama 2,5 , ya da tümör grade'inin ortalama 1,2 olarak verilmesi önerilmez. Bunun yerine ortanca ve çeyrekler arası fark \(median, interquartile range\) kullanılması daha uygun olur. Bu nedenle yapılacak test de ANOVA'nın nonparametrik karşılığı olan Kruskal Wallis testidir.

Ölçüm şeklinde olan, sürekli değişkenlerde bile vaka sayısının 30'dan az ise ya da veriler normal dağılmıyorsa birden fazla grubun karşılaştırmasında da Kruskal Wallis testi kullanılır.

İstatistik dışı bakış açısı ile; Kanser evreleme çalışmalarında \(lenf nodu sayısında\) logaritmik dönüşüm çok kullanılıyor. Ve hemen tüm çalışmalarda işe yarıyor. Örnek [https://www.ncbi.nlm.nih.gov/pubmed/28094085](https://www.ncbi.nlm.nih.gov/pubmed/28094085) Ama klinikte bilgisayar destekli bir karar sistemi kullanılmadığı zaman bu logaritmik değerler çok afaki kalabiliyor. Model anlamlı olsa da pratikte anlaması zor oluyor. Normallik yoksa nonparametrik testleri bir kademe daha rahat anlayabiliyorum.

### Top ten errors of statistical analysis in observational studies for cancer research

[https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9](https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9)

### Histopatoloji çalışmalarında istatistik analizi için nasıl veri hazırlanır?

İstatistik analizlerinde en çok vakit alan kısım verilerin düzenlenmesi ve analize hazır hale getirilmesidir. Bu durum o kadar belirgindir ki veri analizi ile ilgili eğitimlerin de özel bir kısmını "veri temizleme" dersleri oluşturmaktadır \(Coursera\). Analize hazır haldeki veri "temiz veri" olarak adlandırılır \(Tidy Data, H.Wickham\). İstatistikçilerin kısıtlı vakti olduğunu düşünüldüğünde verinin temiz olarak teslim edilmesi onların veriyi rahat anlamalarına ve veri temizleme için ayıracakları vakit yerine sizin araştırmanızdaki ilginç noktalara odaklanmalarına yardımcı olacaktır. Ayrıca temiz veri ile çalışmanın istatistikçileri daha mutlu ettiğini ve özen gösterilmiş bir veride onların da daha özenli çalıştığını gözlemlediğimi belirtmek isterim.

Bu yazıda hipotetik bir histopatoloji çalışması için basamak basamak veri hazırlanma süreci anlatılacaktır.

Histopatolojik makalelerde bulunması gereken minimum bilgiler

Bu yazıda kendi karşılaştığım problemleri ve literatürdeki önerileri \(Virchows Arch \(2015\) 466:611–615\) derlemeye çalıştım.

Statistical Problems to Document and to Avoid Manuscript Checklist for Authors

[http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist](http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist)

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

CAP protokollerinde "equivocal" olarak belirtilen şüpheli durumlardan mümkün oldukça kaçınmak analizlerin daha rahat yapılabilmesi için gereklidir.

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

Her eksik hücre, çok değişkenli analizden o vakanın düşmesine neden olacaktır.

Eksik camlar

Eksik verileri excelde kontrol etme

* **Tek merkez, çok merkezli çalışma**
* **İstatistikçiye sorulması gereken sorular**

Çalışmaya başlamadan önce, hangi soruları soracağınızı zaten planlamış olmanız ve buna göre verilerinizi düzenlemiş olmanız gerekir. Yine de çalışma sürerken ve çalışmanın sonunda yeni sorular ve düşünceler ortaya çıkabilir. Sorulacak sorular ve yapılacak analizler için bir ön hazırlık yapmak ve bunları düzgün cümleler halinde kaydetmek önemlidir. Mesela "tümör tipleri ile X protein ekspresyonunu karşılaştırmak istiyorum" bir soru olabilir. Ama daha iyisi "X proteininin ekspresyonunun A tümöründe B tümörüne göre daha fazla olduğunu düşünüyorum, bunun öyle olup olmadığını analiz etmenizi istiyorum" daha da anlaşılır bir soru olacaktır.

* **Bana p değeri ver**
* **Hangi istatistik yöntemlerini bilmem lazım**

Tıp fakültesinin ilk yıllarında öğrenilen istatistikle ilgili kavramlar yıllar içinde unutuluyor. Elbette herkesin detaylı olarak istatistik metodlarını bilmesine gerek yok. Ancak yine de bir istatistik okuryazarlığının \(statistical literacy\) olmasında fayda var.

* * ANOVA testi

30 vaka sayılı, tercihen verilerin normal dağıldığı durumlarda ve veriler ölçülebilir ve sürekli nitelikte ise kullanılır. Mesela yaş, özefagus lümeninin, özefagus duvarına oranı gibi durumlarda kullanılabilir.

Ancak histopatolojik dercelendirme ya da evreleme gibi kesikli değişkenlerin olduğu durumlarda parametrik test olan ANOVA önerilmez. Grade 1 ila grade 2 arasındaki fark ile grade 2 ila grade 3 arasındaki fark matematiksel olarak eşit değildir. Grade 2, grade 1 den 2 kat kötü, grade 3 ise grade 1'den 3 kat kötüdür gibi bir yorum yapılmaz.

Hastaların kanser evresinin ortalama 2,5 , ya da tümör grade'inin ortalama 1,2 olarak verilmesi önerilmez. Bunun yerine ortanca ve çeyrekler arası fark \(median, interquartile range\) kullanılması daha uygun olur. Bu nedenle yapılacak test de ANOVA'nın nonparametrik karşılığı olan Kruskal Wallis testidir.

Ölçüm şeklinde olan, sürekli değişkenlerde bile vaka sayısının 30'dan az ise ya da veriler normal dağılmıyorsa birden fazla grubun karşılaştırmasında da Kruskal Wallis testi kullanılır.

İstatistik dışı bakış açısı ile; Kanser evreleme çalışmalarında \(lenf nodu sayısında\) logaritmik dönüşüm çok kullanılıyor. Ve hemen tüm çalışmalarda işe yarıyor. Örnek [https://www.ncbi.nlm.nih.gov/pubmed/28094085](https://www.ncbi.nlm.nih.gov/pubmed/28094085) Ama klinikte bilgisayar destekli bir karar sistemi kullanılmadığı zaman bu logaritmik değerler çok afaki kalabiliyor. Model anlamlı olsa da pratikte anlaması zor oluyor. Normallik yoksa nonparametrik testleri bir kademe daha rahat anlayabiliyorum.

### Top ten errors of statistical analysis in observational studies for cancer research

[https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9](https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9)

### Histopatoloji çalışmalarında istatistik için nasıl veri hazırlanır?

### Histopatoloji çalışmalarında istatistik analizi için nasıl veri hazırlanır?

İstatistik analizlerinde en çok vakit alan kısım verilerin düzenlenmesi ve analize hazır hale getirilmesidir. Bu durum o kadar belirgindir ki veri analizi ile ilgili eğitimlerin de özel bir kısmını "veri temizleme" dersleri oluşturmaktadır \(Coursera\). Analize hazır haldeki veri "temiz veri" olarak adlandırılır \(Tidy Data, H.Wickham\). İstatistikçilerin kısıtlı vakti olduğunu düşünüldüğünde verinin temiz olarak teslim edilmesi onların veriyi rahat anlamalarına ve veri temizleme için ayıracakları vakit yerine sizin araştırmanızdaki ilginç noktalara odaklanmalarına yardımcı olacaktır. Ayrıca temiz veri ile çalışmanın istatistikçileri daha mutlu ettiğini ve özen gösterilmiş bir veride onların da daha özenli çalıştığını gözlemlediğimi belirtmek isterim.

Bu yazıda hipotetik bir histopatoloji çalışması için basamak basamak veri hazırlanma süreci anlatılacaktır.

Histopatolojik makalelerde bulunması gereken minimum bilgiler

Bu yazıda kendi karşılaştığım problemleri ve literatürdeki önerileri \(Virchows Arch \(2015\) 466:611–615\) derlemeye çalıştım.

Statistical Problems to Document and to Avoid Manuscript Checklist for Authors

[http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist](http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist)

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

CAP protokollerinde "equivocal" olarak belirtilen şüpheli durumlardan mümkün oldukça kaçınmak analizlerin daha rahat yapılabilmesi için gereklidir.

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

Her eksik hücre, çok değişkenli analizden o vakanın düşmesine neden olacaktır.

Eksik camlar

Eksik verileri excelde kontrol etme

* **Tek merkez, çok merkezli çalışma**
* **İstatistikçiye sorulması gereken sorular**

Çalışmaya başlamadan önce, hangi soruları soracağınızı zaten planlamış olmanız ve buna göre verilerinizi düzenlemiş olmanız gerekir. Yine de çalışma sürerken ve çalışmanın sonunda yeni sorular ve düşünceler ortaya çıkabilir. Sorulacak sorular ve yapılacak analizler için bir ön hazırlık yapmak ve bunları düzgün cümleler halinde kaydetmek önemlidir. Mesela "tümör tipleri ile X protein ekspresyonunu karşılaştırmak istiyorum" bir soru olabilir. Ama daha iyisi "X proteininin ekspresyonunun A tümöründe B tümörüne göre daha fazla olduğunu düşünüyorum, bunun öyle olup olmadığını analiz etmenizi istiyorum" daha da anlaşılır bir soru olacaktır.

* **Bana p değeri ver**
* **Hangi istatistik yöntemlerini bilmem lazım**

Tıp fakültesinin ilk yıllarında öğrenilen istatistikle ilgili kavramlar yıllar içinde unutuluyor. Elbette herkesin detaylı olarak istatistik metodlarını bilmesine gerek yok. Ancak yine de bir istatistik okuryazarlığının \(statistical literacy\) olmasında fayda var.

* * ANOVA testi

30 vaka sayılı, tercihen verilerin normal dağıldığı durumlarda ve veriler ölçülebilir ve sürekli nitelikte ise kullanılır. Mesela yaş, özefagus lümeninin, özefagus duvarına oranı gibi durumlarda kullanılabilir.

Ancak histopatolojik dercelendirme ya da evreleme gibi kesikli değişkenlerin olduğu durumlarda parametrik test olan ANOVA önerilmez. Grade 1 ila grade 2 arasındaki fark ile grade 2 ila grade 3 arasındaki fark matematiksel olarak eşit değildir. Grade 2, grade 1 den 2 kat kötü, grade 3 ise grade 1'den 3 kat kötüdür gibi bir yorum yapılmaz.

Hastaların kanser evresinin ortalama 2,5 , ya da tümör grade'inin ortalama 1,2 olarak verilmesi önerilmez. Bunun yerine ortanca ve çeyrekler arası fark \(median, interquartile range\) kullanılması daha uygun olur. Bu nedenle yapılacak test de ANOVA'nın nonparametrik karşılığı olan Kruskal Wallis testidir.

Ölçüm şeklinde olan, sürekli değişkenlerde bile vaka sayısının 30'dan az ise ya da veriler normal dağılmıyorsa birden fazla grubun karşılaştırmasında da Kruskal Wallis testi kullanılır.

İstatistik dışı bakış açısı ile; Kanser evreleme çalışmalarında \(lenf nodu sayısında\) logaritmik dönüşüm çok kullanılıyor. Ve hemen tüm çalışmalarda işe yarıyor. Örnek [https://www.ncbi.nlm.nih.gov/pubmed/28094085](https://www.ncbi.nlm.nih.gov/pubmed/28094085) Ama klinikte bilgisayar destekli bir karar sistemi kullanılmadığı zaman bu logaritmik değerler çok afaki kalabiliyor. Model anlamlı olsa da pratikte anlaması zor oluyor. Normallik yoksa nonparametrik testleri bir kademe daha rahat anlayabiliyorum.

### Top ten errors of statistical analysis in observational studies for cancer research

[https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9](https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9)

### Histopatoloji çalışmalarında istatistik analizi için nasıl veri hazırlanır?

İstatistik analizlerinde en çok vakit alan kısım verilerin düzenlenmesi ve analize hazır hale getirilmesidir. Bu durum o kadar belirgindir ki veri analizi ile ilgili eğitimlerin de özel bir kısmını "veri temizleme" dersleri oluşturmaktadır \(Coursera\). Analize hazır haldeki veri "temiz veri" olarak adlandırılır \(Tidy Data, H.Wickham\). İstatistikçilerin kısıtlı vakti olduğunu düşünüldüğünde verinin temiz olarak teslim edilmesi onların veriyi rahat anlamalarına ve veri temizleme için ayıracakları vakit yerine sizin araştırmanızdaki ilginç noktalara odaklanmalarına yardımcı olacaktır. Ayrıca temiz veri ile çalışmanın istatistikçileri daha mutlu ettiğini ve özen gösterilmiş bir veride onların da daha özenli çalıştığını gözlemlediğimi belirtmek isterim.

Bu yazıda hipotetik bir histopatoloji çalışması için basamak basamak veri hazırlanma süreci anlatılacaktır.

Histopatolojik makalelerde bulunması gereken minimum bilgiler

Bu yazıda kendi karşılaştığım problemleri ve literatürdeki önerileri \(Virchows Arch \(2015\) 466:611–615\) derlemeye çalıştım.

Statistical Problems to Document and to Avoid Manuscript Checklist for Authors

[http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist](http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist)

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

CAP protokollerinde "equivocal" olarak belirtilen şüpheli durumlardan mümkün oldukça kaçınmak analizlerin daha rahat yapılabilmesi için gereklidir.

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

Her eksik hücre, çok değişkenli analizden o vakanın düşmesine neden olacaktır.

Eksik camlar

Eksik verileri excelde kontrol etme

* **Tek merkez, çok merkezli çalışma**
* **İstatistikçiye sorulması gereken sorular**

Çalışmaya başlamadan önce, hangi soruları soracağınızı zaten planlamış olmanız ve buna göre verilerinizi düzenlemiş olmanız gerekir. Yine de çalışma sürerken ve çalışmanın sonunda yeni sorular ve düşünceler ortaya çıkabilir. Sorulacak sorular ve yapılacak analizler için bir ön hazırlık yapmak ve bunları düzgün cümleler halinde kaydetmek önemlidir. Mesela "tümör tipleri ile X protein ekspresyonunu karşılaştırmak istiyorum" bir soru olabilir. Ama daha iyisi "X proteininin ekspresyonunun A tümöründe B tümörüne göre daha fazla olduğunu düşünüyorum, bunun öyle olup olmadığını analiz etmenizi istiyorum" daha da anlaşılır bir soru olacaktır.

* **Bana p değeri ver**
* **Hangi istatistik yöntemlerini bilmem lazım**

Tıp fakültesinin ilk yıllarında öğrenilen istatistikle ilgili kavramlar yıllar içinde unutuluyor. Elbette herkesin detaylı olarak istatistik metodlarını bilmesine gerek yok. Ancak yine de bir istatistik okuryazarlığının \(statistical literacy\) olmasında fayda var.

* * ANOVA testi

30 vaka sayılı, tercihen verilerin normal dağıldığı durumlarda ve veriler ölçülebilir ve sürekli nitelikte ise kullanılır. Mesela yaş, özefagus lümeninin, özefagus duvarına oranı gibi durumlarda kullanılabilir.

Ancak histopatolojik dercelendirme ya da evreleme gibi kesikli değişkenlerin olduğu durumlarda parametrik test olan ANOVA önerilmez. Grade 1 ila grade 2 arasındaki fark ile grade 2 ila grade 3 arasındaki fark matematiksel olarak eşit değildir. Grade 2, grade 1 den 2 kat kötü, grade 3 ise grade 1'den 3 kat kötüdür gibi bir yorum yapılmaz.

Hastaların kanser evresinin ortalama 2,5 , ya da tümör grade'inin ortalama 1,2 olarak verilmesi önerilmez. Bunun yerine ortanca ve çeyrekler arası fark \(median, interquartile range\) kullanılması daha uygun olur. Bu nedenle yapılacak test de ANOVA'nın nonparametrik karşılığı olan Kruskal Wallis testidir.

Ölçüm şeklinde olan, sürekli değişkenlerde bile vaka sayısının 30'dan az ise ya da veriler normal dağılmıyorsa birden fazla grubun karşılaştırmasında da Kruskal Wallis testi kullanılır.

İstatistik dışı bakış açısı ile; Kanser evreleme çalışmalarında \(lenf nodu sayısında\) logaritmik dönüşüm çok kullanılıyor. Ve hemen tüm çalışmalarda işe yarıyor. Örnek [https://www.ncbi.nlm.nih.gov/pubmed/28094085](https://www.ncbi.nlm.nih.gov/pubmed/28094085) Ama klinikte bilgisayar destekli bir karar sistemi kullanılmadığı zaman bu logaritmik değerler çok afaki kalabiliyor. Model anlamlı olsa da pratikte anlaması zor oluyor. Normallik yoksa nonparametrik testleri bir kademe daha rahat anlayabiliyorum.

### Top ten errors of statistical analysis in observational studies for cancer research

[https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9](https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9)

### Histopatoloji çalışmalarında istatistik için nasıl veri hazırlanır?

### Histopatoloji çalışmalarında istatistik analizi için nasıl veri hazırlanır?

İstatistik analizlerinde en çok vakit alan kısım verilerin düzenlenmesi ve analize hazır hale getirilmesidir. Bu durum o kadar belirgindir ki veri analizi ile ilgili eğitimlerin de özel bir kısmını "veri temizleme" dersleri oluşturmaktadır \(Coursera\). Analize hazır haldeki veri "temiz veri" olarak adlandırılır \(Tidy Data, H.Wickham\). İstatistikçilerin kısıtlı vakti olduğunu düşünüldüğünde verinin temiz olarak teslim edilmesi onların veriyi rahat anlamalarına ve veri temizleme için ayıracakları vakit yerine sizin araştırmanızdaki ilginç noktalara odaklanmalarına yardımcı olacaktır. Ayrıca temiz veri ile çalışmanın istatistikçileri daha mutlu ettiğini ve özen gösterilmiş bir veride onların da daha özenli çalıştığını gözlemlediğimi belirtmek isterim.

Bu yazıda hipotetik bir histopatoloji çalışması için basamak basamak veri hazırlanma süreci anlatılacaktır.

Histopatolojik makalelerde bulunması gereken minimum bilgiler

Bu yazıda kendi karşılaştığım problemleri ve literatürdeki önerileri \(Virchows Arch \(2015\) 466:611–615\) derlemeye çalıştım.

Statistical Problems to Document and to Avoid Manuscript Checklist for Authors

[http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist](http://biostat.mc.vanderbilt.edu/wiki/Main/ManuscriptChecklist)

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

CAP protokollerinde "equivocal" olarak belirtilen şüpheli durumlardan mümkün oldukça kaçınmak analizlerin daha rahat yapılabilmesi için gereklidir.

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

Her eksik hücre, çok değişkenli analizden o vakanın düşmesine neden olacaktır.

Eksik camlar

Eksik verileri excelde kontrol etme

* **Tek merkez, çok merkezli çalışma**
* **İstatistikçiye sorulması gereken sorular**

Çalışmaya başlamadan önce, hangi soruları soracağınızı zaten planlamış olmanız ve buna göre verilerinizi düzenlemiş olmanız gerekir. Yine de çalışma sürerken ve çalışmanın sonunda yeni sorular ve düşünceler ortaya çıkabilir. Sorulacak sorular ve yapılacak analizler için bir ön hazırlık yapmak ve bunları düzgün cümleler halinde kaydetmek önemlidir. Mesela "tümör tipleri ile X protein ekspresyonunu karşılaştırmak istiyorum" bir soru olabilir. Ama daha iyisi "X proteininin ekspresyonunun A tümöründe B tümörüne göre daha fazla olduğunu düşünüyorum, bunun öyle olup olmadığını analiz etmenizi istiyorum" daha da anlaşılır bir soru olacaktır.

* **Bana p değeri ver**
* **Hangi istatistik yöntemlerini bilmem lazım**

Tıp fakültesinin ilk yıllarında öğrenilen istatistikle ilgili kavramlar yıllar içinde unutuluyor. Elbette herkesin detaylı olarak istatistik metodlarını bilmesine gerek yok. Ancak yine de bir istatistik okuryazarlığının \(statistical literacy\) olmasında fayda var.

* * ANOVA testi

30 vaka sayılı, tercihen verilerin normal dağıldığı durumlarda ve veriler ölçülebilir ve sürekli nitelikte ise kullanılır. Mesela yaş, özefagus lümeninin, özefagus duvarına oranı gibi durumlarda kullanılabilir.

Ancak histopatolojik dercelendirme ya da evreleme gibi kesikli değişkenlerin olduğu durumlarda parametrik test olan ANOVA önerilmez. Grade 1 ila grade 2 arasındaki fark ile grade 2 ila grade 3 arasındaki fark matematiksel olarak eşit değildir. Grade 2, grade 1 den 2 kat kötü, grade 3 ise grade 1'den 3 kat kötüdür gibi bir yorum yapılmaz.

Hastaların kanser evresinin ortalama 2,5 , ya da tümör grade'inin ortalama 1,2 olarak verilmesi önerilmez. Bunun yerine ortanca ve çeyrekler arası fark \(median, interquartile range\) kullanılması daha uygun olur. Bu nedenle yapılacak test de ANOVA'nın nonparametrik karşılığı olan Kruskal Wallis testidir.

Ölçüm şeklinde olan, sürekli değişkenlerde bile vaka sayısının 30'dan az ise ya da veriler normal dağılmıyorsa birden fazla grubun karşılaştırmasında da Kruskal Wallis testi kullanılır.

İstatistik dışı bakış açısı ile; Kanser evreleme çalışmalarında \(lenf nodu sayısında\) logaritmik dönüşüm çok kullanılıyor. Ve hemen tüm çalışmalarda işe yarıyor. Örnek [https://www.ncbi.nlm.nih.gov/pubmed/28094085](https://www.ncbi.nlm.nih.gov/pubmed/28094085) Ama klinikte bilgisayar destekli bir karar sistemi kullanılmadığı zaman bu logaritmik değerler çok afaki kalabiliyor. Model anlamlı olsa da pratikte anlaması zor oluyor. Normallik yoksa nonparametrik testleri bir kademe daha rahat anlayabiliyorum.

### Top ten errors of statistical analysis in observational studies for cancer research

[https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9](https://rd.springer.com/article/10.1007%2Fs12094-017-1817-9)

## Articles to be discussed:

### Histologic pattern is better correlated with clinical outcomes than biochemical classification in patients with drug-induced liver injury.

[https://www.ncbi.nlm.nih.gov/pubmed/?term=31300804](https://www.ncbi.nlm.nih.gov/pubmed/?term=31300804)

