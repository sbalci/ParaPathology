# Kaplan Meier

## Kaplan Meier

## Kaplan Meier

* Survival Analysis with R

[https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/](https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/)

[http://bioconnector.org/workshops/r-survival.html](kaplan-meier.md)

[https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php](https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php)

* [survMisc package](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html#survmisc-package)

[https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html)

*
  * Understanding survival analysis: Kaplan-Meier estimate

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/)

* A PRACTICAL GUIDE TO UNDERSTANDING KAPLAN-MEIER CURVES

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/)

* Drawing survival curves in R

[https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html](https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html)

* 7 Interactive Plots from the Pharmaceutical Industry

[https://moderndata.plot.ly/pharmaceutical-survival-interactive/](https://moderndata.plot.ly/pharmaceutical-survival-interactive/)

[Jamovi](https://www.jamovi.org/) ile artık sağkalım analizi yapmak mümkün.

Bunun için Death Watch eklentisini yüklemek lazım:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.11 (4) (4) (4) (1) (2) (1).png>)

Daha sonra menüden sağkalım analizini seçip:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.22 (4) (4) (4) (1) (2) (1).png>)

İlgili yerleri doldurmak lazım. Event kısmına sağkalım durumu yazılmalı, event level'da ise ölüm durumu seçilmeli. Time elapsed geçen süreyi gösteriyor. Group seçilirse bu gruplara göre karşılaştırmalı eğriler elde edilebilir.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.30.06 (4) (4) (4) (1) (2) (1).png>)

Verilerin türlerine dikkat etmek lazım. Nominal, ordinal ve sürekli değişkenler uygun şekilde düzenlenmiş olmalıdır.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.35.23 (4) (4) (4) (1) (1) (3).png>)

Sağkalım analizinin tanımlayıcı istatistikleri ve ikili karşılaştırmalar:

Veriler değiştirilmiştir :)

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.08 (4) (4) (4) (1) (2) (1).png>)

Sağkalım eğrisi istenirse güven aralıklı olarak da çizdirilebiliyor:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.16 (4) (4) (4) (1) (1) (2).png>)

Eğer R'da `jmv` paketi yüklüyse bu kodu kullanarak da analizi yapmak mümkün:

`deathwatch::surv(`

`data = data,`

`event = "LastKnownOutcome",`

`eventLevel = "dead",`

`elapsed = "months",`

`groups = "Evre",`

`tests = c(`

`"logrank",`

`"gehan",`

`"tarone-ware",`

`"peto-peto"),`

`chf = TRUE,`

`ci = TRUE,`

`cens = TRUE)`

* Survival Analysis with R

[https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/](https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/)

[http://bioconnector.org/workshops/r-survival.html](kaplan-meier.md)

[https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php](https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php)

* [survMisc package](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html#survmisc-package)

[https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html)

*
* Understanding survival analysis: Kaplan-Meier estimate

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/)

* A PRACTICAL GUIDE TO UNDERSTANDING KAPLAN-MEIER CURVES

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/)

* Drawing survival curves in R

[https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html](https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html)

* 7 Interactive Plots from the Pharmaceutical Industry

[https://moderndata.plot.ly/pharmaceutical-survival-interactive/](https://moderndata.plot.ly/pharmaceutical-survival-interactive/)

[Jamovi](https://www.jamovi.org/) ile artık sağkalım analizi yapmak mümkün.

Bunun için Death Watch eklentisini yüklemek lazım:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.11 (4) (4) (4) (1) (1) (1).png>)

Daha sonra menüden sağkalım analizini seçip:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.22 (4) (4) (4) (1) (1) (2).png>)

İlgili yerleri doldurmak lazım. Event kısmına sağkalım durumu yazılmalı, event level'da ise ölüm durumu seçilmeli. Time elapsed geçen süreyi gösteriyor. Group seçilirse bu gruplara göre karşılaştırmalı eğriler elde edilebilir.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.30.06 (4) (4) (4) (1) (1) (3).png>)

Verilerin türlerine dikkat etmek lazım. Nominal, ordinal ve sürekli değişkenler uygun şekilde düzenlenmiş olmalıdır.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.35.23 (4) (4) (4) (1) (1) (1).png>)

Sağkalım analizinin tanımlayıcı istatistikleri ve ikili karşılaştırmalar:

Veriler değiştirilmiştir :)

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.08 (4) (4) (4) (1) (1) (1).png>)

Sağkalım eğrisi istenirse güven aralıklı olarak da çizdirilebiliyor:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.16 (4) (4) (4) (1) (1) (3).png>)

Eğer R'da `jmv` paketi yüklüyse bu kodu kullanarak da analizi yapmak mümkün:

`deathwatch::surv(`

`data = data,`

`event = "LastKnownOutcome",`

`eventLevel = "dead",`

`elapsed = "months",`

`groups = "Evre",`

`tests = c(`

`"logrank",`

`"gehan",`

`"tarone-ware",`

`"peto-peto"),`

`chf = TRUE,`

`ci = TRUE,`

`cens = TRUE)`

* Survival Analysis with R

[https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/](https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/)

[http://bioconnector.org/workshops/r-survival.html](kaplan-meier.md)

[https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php](https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php)

* [survMisc package](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html#survmisc-package)

[https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html)

*
* Understanding survival analysis: Kaplan-Meier estimate

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/)

* A PRACTICAL GUIDE TO UNDERSTANDING KAPLAN-MEIER CURVES

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/)

* Drawing survival curves in R

[https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html](https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html)

* 7 Interactive Plots from the Pharmaceutical Industry

[https://moderndata.plot.ly/pharmaceutical-survival-interactive/](https://moderndata.plot.ly/pharmaceutical-survival-interactive/)

[Jamovi](https://www.jamovi.org/) ile artık sağkalım analizi yapmak mümkün.

Bunun için Death Watch eklentisini yüklemek lazım:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.11 (4) (4) (4) (1) (1) (3).png>)

Daha sonra menüden sağkalım analizini seçip:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.22 (4) (4) (4) (1) (1).png>)

İlgili yerleri doldurmak lazım. Event kısmına sağkalım durumu yazılmalı, event level'da ise ölüm durumu seçilmeli. Time elapsed geçen süreyi gösteriyor. Group seçilirse bu gruplara göre karşılaştırmalı eğriler elde edilebilir.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.30.06 (4) (4) (4) (1) (1) (2).png>)

Verilerin türlerine dikkat etmek lazım. Nominal, ordinal ve sürekli değişkenler uygun şekilde düzenlenmiş olmalıdır.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.35.23 (4) (4) (4) (1) (1) (2).png>)

Sağkalım analizinin tanımlayıcı istatistikleri ve ikili karşılaştırmalar:

Veriler değiştirilmiştir :)

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.08 (4) (4) (4) (1) (1) (3).png>)

Sağkalım eğrisi istenirse güven aralıklı olarak da çizdirilebiliyor:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.16 (4) (4) (4) (1) (1).png>)

Eğer R'da `jmv` paketi yüklüyse bu kodu kullanarak da analizi yapmak mümkün:

`deathwatch::surv(`

`data = data,`

`event = "LastKnownOutcome",`

`eventLevel = "dead",`

`elapsed = "months",`

`groups = "Evre",`

`tests = c(`

`"logrank",`

`"gehan",`

`"tarone-ware",`

`"peto-peto"),`

`chf = TRUE,`

`ci = TRUE,`

`cens = TRUE)`

* Survival Analysis with R

[https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/](https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/)

[http://bioconnector.org/workshops/r-survival.html](kaplan-meier.md)

[https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php](https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php)

* [survMisc package](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html#survmisc-package)

[https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html)

*
* Understanding survival analysis: Kaplan-Meier estimate

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/)

* A PRACTICAL GUIDE TO UNDERSTANDING KAPLAN-MEIER CURVES

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/)

* Drawing survival curves in R

[https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html](https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html)

* 7 Interactive Plots from the Pharmaceutical Industry

[https://moderndata.plot.ly/pharmaceutical-survival-interactive/](https://moderndata.plot.ly/pharmaceutical-survival-interactive/)

[Jamovi](https://www.jamovi.org/) ile artık sağkalım analizi yapmak mümkün.

Bunun için Death Watch eklentisini yüklemek lazım:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.11 (4) (4) (4) (1) (1).png>)

Daha sonra menüden sağkalım analizini seçip:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.22 (4) (4) (4) (1) (1) (1).png>)

İlgili yerleri doldurmak lazım. Event kısmına sağkalım durumu yazılmalı, event level'da ise ölüm durumu seçilmeli. Time elapsed geçen süreyi gösteriyor. Group seçilirse bu gruplara göre karşılaştırmalı eğriler elde edilebilir.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.30.06 (4) (4) (4) (1) (1).png>)

Verilerin türlerine dikkat etmek lazım. Nominal, ordinal ve sürekli değişkenler uygun şekilde düzenlenmiş olmalıdır.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.35.23 (4) (4) (4) (1) (1).png>)

Sağkalım analizinin tanımlayıcı istatistikleri ve ikili karşılaştırmalar:

Veriler değiştirilmiştir :)

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.08 (4) (4) (4) (1) (1).png>)

Sağkalım eğrisi istenirse güven aralıklı olarak da çizdirilebiliyor:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.16 (4) (4) (4) (1) (1) (1).png>)

Eğer R'da `jmv` paketi yüklüyse bu kodu kullanarak da analizi yapmak mümkün:

`deathwatch::surv(`

`data = data,`

`event = "LastKnownOutcome",`

`eventLevel = "dead",`

`elapsed = "months",`

`groups = "Evre",`

`tests = c(`

`"logrank",`

`"gehan",`

`"tarone-ware",`

`"peto-peto"),`

`chf = TRUE,`

`ci = TRUE,`

`cens = TRUE)`

## Kaplan Meier

* Survival Analysis with R

[https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/](https://rviews.rstudio.com/2017/09/25/survival-analysis-with-r/)

[http://bioconnector.org/workshops/r-survival.html](kaplan-meier.md)

[https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php](https://www.openintro.org/download.php?file=survival\_analysis\_in\_R\&referrer=/stat/surv.php)

* [survMisc package](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html#survmisc-package)

[https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html](https://cran.r-project.org/web/packages/survminer/vignettes/Informative\_Survival\_Plots.html)

*
  * Understanding survival analysis: Kaplan-Meier estimate

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3059453/)

* A PRACTICAL GUIDE TO UNDERSTANDING KAPLAN-MEIER CURVES

[https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3932959/)

* Drawing survival curves in R

[https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html](https://rstudio-pubs-static.s3.amazonaws.com/5588\_72eb65bfbe0a4cb7b655d2eee0751584.html)

* 7 Interactive Plots from the Pharmaceutical Industry

[https://moderndata.plot.ly/pharmaceutical-survival-interactive/](https://moderndata.plot.ly/pharmaceutical-survival-interactive/)

[Jamovi](https://www.jamovi.org/) ile artık sağkalım analizi yapmak mümkün.

Bunun için Death Watch eklentisini yüklemek lazım:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.11 (4) (4) (4) (1) (2) (1).png>)

Daha sonra menüden sağkalım analizini seçip:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-15.41.22 (4) (4) (4) (1) (2) (1).png>)

İlgili yerleri doldurmak lazım. Event kısmına sağkalım durumu yazılmalı, event level'da ise ölüm durumu seçilmeli. Time elapsed geçen süreyi gösteriyor. Group seçilirse bu gruplara göre karşılaştırmalı eğriler elde edilebilir.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.30.06 (4) (4) (4) (1) (2) (1).png>)

Verilerin türlerine dikkat etmek lazım. Nominal, ordinal ve sürekli değişkenler uygun şekilde düzenlenmiş olmalıdır.

![](<../.gitbook/assets/ekran-resmi-2018-02-12-21.35.23 (4) (4) (4) (1) (2) (1).png>)

Sağkalım analizinin tanımlayıcı istatistikleri ve ikili karşılaştırmalar:

Veriler değiştirilmiştir :)

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.08 (4) (4) (4) (1) (2) (1).png>)

Sağkalım eğrisi istenirse güven aralıklı olarak da çizdirilebiliyor:

![](<../.gitbook/assets/ekran-resmi-2018-02-12-20.36.16 (4) (4) (4) (1) (2) (1).png>)

Eğer R'da `jmv` paketi yüklüyse bu kodu kullanarak da analizi yapmak mümkün:

`deathwatch::surv(`

`data = data,`

`event = "LastKnownOutcome",`

`eventLevel = "dead",`

`elapsed = "months",`

`groups = "Evre",`

`tests = c(`

`"logrank",`

`"gehan",`

`"tarone-ware",`

`"peto-peto"),`

`chf = TRUE,`

`ci = TRUE,`

`cens = TRUE)`
