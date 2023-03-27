# R-project veri yüklemek neden zor?

## R-project veri yüklemek neden zor?

## R-project veri yüklemek neden zor?

R-project veri yüklemek neden zor?

Tüm dünya [R](https://www.r-project.org/) ile istatistik analizine ilerleyedursun, biz hala [SPSS](https://en.0wikipedia.org/wiki/SPSS) adı altında kurslar düzenleme derdindeyiz. [Jamovi](https://www.jamovi.org/) gibi grafik arayüzleri varken hem de. Peki neden? Haklı tarafı yok mu?

R savunucuları, bu durumla dalga geçedursun, aslında hala daha SPSS'in kullanılmasının önemli bir nedeni var: veri yüklemek

R'a veri yüklemek neden bu kadar zor. Çoğu data üstadının burun kıvırdığı excel hala daha en çok kullanılan veri giriş modeli. Bir spreadsheet herkesin anlayabileceği kolaylıkta.

Neden hala R'a excel yüklemek bu kadar sorun? En fonksiyonel bulduğum `xlsx`paketini eklemek için java yüklemek gerekiyor. SPSS için`foreign`paketleri,`haven`paketleri ortada geziyor. Hele bir de`.csv`dosyaları var ki, eğer Türkçe excel kullanıyorsanız`;`ile`,`arasındaki fark herhalde bu kadar anlamlı olmamıştır. Sayılara verdiğiniz`.`ya da`,`ile ondalıklar da epey sıkıntıya neden oluyor.

Jamovi de sadre şifa değil, o da henüz .sav dosyalarını okuyamıyor (Onun için önce JASP ile açıp sonra Jamovi ile bu [JASP](https://jasp-stats.org/) dosyasını açmak lazım). Eğer`.csv`dosyanızda sorun varsa veriniz de düzgün yüklenemiyor.

SPSS'in bu kadar yaygın olmasının nedeni belki de sadece bu konuda kullanıcı dostu olmaya devam etmesi.

Ortada yığınla R kursu var, ama hepsi afaki şeylerden bahsediyor. Neymiş efendim atomik vektör tipiymiş, zorlama ile türler nasıl değişirmiş, S dili çok önemliymiş,`lattice`mi kullaılacakmış,`ggplot`mu? Adama bir ağız tadı ile veri yükletip frekans tablosu aldıramadıktan sonra R çok iyi bir programmış kime ne?

Bu arada R'a veri yüklemenin -ve tabii bunu data.frame olarak yapmanın- en kolay yolu [RStudio](https://www.rstudio.com/) ile. Dökümana sağ tıklayıp import dataset dedikten sonrası oldukça anlaşılır:

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.33.47 (4) (4) (4) (1) (2) (1).png>)

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.35.56 (4) (4) (4) (1) (2) (1).png>)

R-project veri yüklemek neden zor?

Tüm dünya [R](https://www.r-project.org/) ile istatistik analizine ilerleyedursun, biz hala [SPSS](https://en.0wikipedia.org/wiki/SPSS) adı altında kurslar düzenleme derdindeyiz. [Jamovi](https://www.jamovi.org/) gibi grafik arayüzleri varken hem de. Peki neden? Haklı tarafı yok mu?

R savunucuları, bu durumla dalga geçedursun, aslında hala daha SPSS'in kullanılmasının önemli bir nedeni var: veri yüklemek

R'a veri yüklemek neden bu kadar zor. Çoğu data üstadının burun kıvırdığı excel hala daha en çok kullanılan veri giriş modeli. Bir spreadsheet herkesin anlayabileceği kolaylıkta.

Neden hala R'a excel yüklemek bu kadar sorun? En fonksiyonel bulduğum `xlsx`paketini eklemek için java yüklemek gerekiyor. SPSS için`foreign`paketleri,`haven`paketleri ortada geziyor. Hele bir de`.csv`dosyaları var ki, eğer Türkçe excel kullanıyorsanız`;`ile`,`arasındaki fark herhalde bu kadar anlamlı olmamıştır. Sayılara verdiğiniz`.`ya da`,`ile ondalıklar da epey sıkıntıya neden oluyor.

Jamovi de sadre şifa değil, o da henüz .sav dosyalarını okuyamıyor (Onun için önce JASP ile açıp sonra Jamovi ile bu [JASP](https://jasp-stats.org/) dosyasını açmak lazım). Eğer`.csv`dosyanızda sorun varsa veriniz de düzgün yüklenemiyor.

SPSS'in bu kadar yaygın olmasının nedeni belki de sadece bu konuda kullanıcı dostu olmaya devam etmesi.

Ortada yığınla R kursu var, ama hepsi afaki şeylerden bahsediyor. Neymiş efendim atomik vektör tipiymiş, zorlama ile türler nasıl değişirmiş, S dili çok önemliymiş,`lattice`mi kullaılacakmış,`ggplot`mu? Adama bir ağız tadı ile veri yükletip frekans tablosu aldıramadıktan sonra R çok iyi bir programmış kime ne?

Bu arada R'a veri yüklemenin -ve tabii bunu data.frame olarak yapmanın- en kolay yolu [RStudio](https://www.rstudio.com/) ile. Dökümana sağ tıklayıp import dataset dedikten sonrası oldukça anlaşılır:

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.33.47 (4) (4) (4) (1) (1) (3).png>)

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.35.56 (4) (4) (4) (1) (1) (2).png>)

R-project veri yüklemek neden zor?

Tüm dünya [R](https://www.r-project.org/) ile istatistik analizine ilerleyedursun, biz hala [SPSS](https://en.0wikipedia.org/wiki/SPSS) adı altında kurslar düzenleme derdindeyiz. [Jamovi](https://www.jamovi.org/) gibi grafik arayüzleri varken hem de. Peki neden? Haklı tarafı yok mu?

R savunucuları, bu durumla dalga geçedursun, aslında hala daha SPSS'in kullanılmasının önemli bir nedeni var: veri yüklemek

R'a veri yüklemek neden bu kadar zor. Çoğu data üstadının burun kıvırdığı excel hala daha en çok kullanılan veri giriş modeli. Bir spreadsheet herkesin anlayabileceği kolaylıkta.

Neden hala R'a excel yüklemek bu kadar sorun? En fonksiyonel bulduğum `xlsx`paketini eklemek için java yüklemek gerekiyor. SPSS için`foreign`paketleri,`haven`paketleri ortada geziyor. Hele bir de`.csv`dosyaları var ki, eğer Türkçe excel kullanıyorsanız`;`ile`,`arasındaki fark herhalde bu kadar anlamlı olmamıştır. Sayılara verdiğiniz`.`ya da`,`ile ondalıklar da epey sıkıntıya neden oluyor.

Jamovi de sadre şifa değil, o da henüz .sav dosyalarını okuyamıyor (Onun için önce JASP ile açıp sonra Jamovi ile bu [JASP](https://jasp-stats.org/) dosyasını açmak lazım). Eğer`.csv`dosyanızda sorun varsa veriniz de düzgün yüklenemiyor.

SPSS'in bu kadar yaygın olmasının nedeni belki de sadece bu konuda kullanıcı dostu olmaya devam etmesi.

Ortada yığınla R kursu var, ama hepsi afaki şeylerden bahsediyor. Neymiş efendim atomik vektör tipiymiş, zorlama ile türler nasıl değişirmiş, S dili çok önemliymiş,`lattice`mi kullaılacakmış,`ggplot`mu? Adama bir ağız tadı ile veri yükletip frekans tablosu aldıramadıktan sonra R çok iyi bir programmış kime ne?

Bu arada R'a veri yüklemenin -ve tabii bunu data.frame olarak yapmanın- en kolay yolu [RStudio](https://www.rstudio.com/) ile. Dökümana sağ tıklayıp import dataset dedikten sonrası oldukça anlaşılır:

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.33.47 (4) (4) (4) (1) (1) (2).png>)

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.35.56 (4) (4) (4) (1) (1).png>)

R-project veri yüklemek neden zor?

Tüm dünya [R](https://www.r-project.org/) ile istatistik analizine ilerleyedursun, biz hala [SPSS](https://en.0wikipedia.org/wiki/SPSS) adı altında kurslar düzenleme derdindeyiz. [Jamovi](https://www.jamovi.org/) gibi grafik arayüzleri varken hem de. Peki neden? Haklı tarafı yok mu?

R savunucuları, bu durumla dalga geçedursun, aslında hala daha SPSS'in kullanılmasının önemli bir nedeni var: veri yüklemek

R'a veri yüklemek neden bu kadar zor. Çoğu data üstadının burun kıvırdığı excel hala daha en çok kullanılan veri giriş modeli. Bir spreadsheet herkesin anlayabileceği kolaylıkta.

Neden hala R'a excel yüklemek bu kadar sorun? En fonksiyonel bulduğum `xlsx`paketini eklemek için java yüklemek gerekiyor. SPSS için`foreign`paketleri,`haven`paketleri ortada geziyor. Hele bir de`.csv`dosyaları var ki, eğer Türkçe excel kullanıyorsanız`;`ile`,`arasındaki fark herhalde bu kadar anlamlı olmamıştır. Sayılara verdiğiniz`.`ya da`,`ile ondalıklar da epey sıkıntıya neden oluyor.

Jamovi de sadre şifa değil, o da henüz .sav dosyalarını okuyamıyor (Onun için önce JASP ile açıp sonra Jamovi ile bu [JASP](https://jasp-stats.org/) dosyasını açmak lazım). Eğer`.csv`dosyanızda sorun varsa veriniz de düzgün yüklenemiyor.

SPSS'in bu kadar yaygın olmasının nedeni belki de sadece bu konuda kullanıcı dostu olmaya devam etmesi.

Ortada yığınla R kursu var, ama hepsi afaki şeylerden bahsediyor. Neymiş efendim atomik vektör tipiymiş, zorlama ile türler nasıl değişirmiş, S dili çok önemliymiş,`lattice`mi kullaılacakmış,`ggplot`mu? Adama bir ağız tadı ile veri yükletip frekans tablosu aldıramadıktan sonra R çok iyi bir programmış kime ne?

Bu arada R'a veri yüklemenin -ve tabii bunu data.frame olarak yapmanın- en kolay yolu [RStudio](https://www.rstudio.com/) ile. Dökümana sağ tıklayıp import dataset dedikten sonrası oldukça anlaşılır:

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.33.47 (4) (4) (4) (1) (1).png>)

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.35.56 (4) (4) (4) (1) (1) (1).png>)

## R-project veri yüklemek neden zor?

R-project veri yüklemek neden zor?

Tüm dünya [R](https://www.r-project.org/) ile istatistik analizine ilerleyedursun, biz hala [SPSS](https://en.0wikipedia.org/wiki/SPSS) adı altında kurslar düzenleme derdindeyiz. [Jamovi](https://www.jamovi.org/) gibi grafik arayüzleri varken hem de. Peki neden? Haklı tarafı yok mu?

R savunucuları, bu durumla dalga geçedursun, aslında hala daha SPSS'in kullanılmasının önemli bir nedeni var: veri yüklemek

R'a veri yüklemek neden bu kadar zor. Çoğu data üstadının burun kıvırdığı excel hala daha en çok kullanılan veri giriş modeli. Bir spreadsheet herkesin anlayabileceği kolaylıkta.

Neden hala R'a excel yüklemek bu kadar sorun? En fonksiyonel bulduğum `xlsx`paketini eklemek için java yüklemek gerekiyor. SPSS için`foreign`paketleri,`haven`paketleri ortada geziyor. Hele bir de`.csv`dosyaları var ki, eğer Türkçe excel kullanıyorsanız`;`ile`,`arasındaki fark herhalde bu kadar anlamlı olmamıştır. Sayılara verdiğiniz`.`ya da`,`ile ondalıklar da epey sıkıntıya neden oluyor.

Jamovi de sadre şifa değil, o da henüz .sav dosyalarını okuyamıyor (Onun için önce JASP ile açıp sonra Jamovi ile bu [JASP](https://jasp-stats.org/) dosyasını açmak lazım). Eğer`.csv`dosyanızda sorun varsa veriniz de düzgün yüklenemiyor.

SPSS'in bu kadar yaygın olmasının nedeni belki de sadece bu konuda kullanıcı dostu olmaya devam etmesi.

Ortada yığınla R kursu var, ama hepsi afaki şeylerden bahsediyor. Neymiş efendim atomik vektör tipiymiş, zorlama ile türler nasıl değişirmiş, S dili çok önemliymiş,`lattice`mi kullaılacakmış,`ggplot`mu? Adama bir ağız tadı ile veri yükletip frekans tablosu aldıramadıktan sonra R çok iyi bir programmış kime ne?

Bu arada R'a veri yüklemenin -ve tabii bunu data.frame olarak yapmanın- en kolay yolu [RStudio](https://www.rstudio.com/) ile. Dökümana sağ tıklayıp import dataset dedikten sonrası oldukça anlaşılır:

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.33.47 (4) (4) (4) (1) (2) (1).png>)

![](<../../.gitbook/assets/ekran-resmi-2018-02-19-15.35.56 (4) (4) (4) (1) (2) (1).png>)

* R Package Documentation

[https://rdrr.io/](https://rdrr.io/)

* Snippets Run any R code you like

[https://rdrr.io/snippets/](https://rdrr.io/snippets/)

* Getting R and Java 1.8 to work together on OSX

[http://conjugateprior.org/2014/12/r-java8-osx/](http://conjugateprior.org/2014/12/r-java8-osx/)

* [**rJava load error in RStudio/R after “upgrading” to OSX Yosemite**](http://stackoverflow.com/questions/30738974/rjava-load-error-in-rstudio-r-after-upgrading-to-osx-yosemite)

[http://stackoverflow.com/questions/30738974/rjava-load-error-in-rstudio-r-after-upgrading-to-osx-yosemite/31039105](http://stackoverflow.com/questions/30738974/rjava-load-error-in-rstudio-r-after-upgrading-to-osx-yosemite/31039105)

* Jamovi is an open source R based statistics program with "clickable" interface.

[https://www.jamovi.org/](https://t.co/cOmH9PucqI)

* R commander (Rcmdr)

[http://www.rcommander.com/](http://www.rcommander.com/)

[https://socialsciences.mcmaster.ca/jfox/Misc/Rcmdr/](https://socialsciences.mcmaster.ca/jfox/Misc/Rcmdr/)

* JASP is another R based statistical open source software, also has Bayesian features

[https://jasp-stats.org/](https://jasp-stats.org/)

* RKWard

[https://rkward.kde.org/](https://rkward.kde.org/)

* The MacPorts Project Official Homepage

[https://www.macports.org](https://www.macports.org)

* How to install and use MacPorts

[http://blog.kicaj.com/installing-macports/](http://blog.kicaj.com/installing-macports/)

* Rattle: A Graphical User Interface for Data Mining using R

[https://rattle.togaware.com](https://rattle.togaware.com)

[http://marcoghislanzoni.com/blog/2014/08/29/solved-installing-rattle-r-3-1-mac-os-x-10-9/](http://marcoghislanzoni.com/blog/2014/08/29/solved-installing-rattle-r-3-1-mac-os-x-10-9/)
