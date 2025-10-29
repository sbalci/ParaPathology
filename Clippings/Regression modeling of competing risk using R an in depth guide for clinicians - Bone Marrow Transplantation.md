---
title: "Regression modeling of competing risk using R: an in depth guide for clinicians - Bone Marrow Transplantation"
source: https://www.nature.com/articles/bmt2009359
author:
  - "[[L Scrucca]]"
  - "[[A Santucci]]"
  - "[[F Aversa]]"
published: 2010-01-11
created: 2024-11-17
description: "We describe how to conduct a regression analysis for competing risks data. The use of an add-on package for the R statistical software is described, which allows for the estimation of the semiparametric proportional hazards model for the subdistribution of a competing risk analysis as proposed by Fine and Gray. J Am Stat Assoc 1999; 94: 496–509."
tags:
  - Clippings
  - rstats
  - jamovi
  - survival
---
## Introduction

Competing risks often occur in cases of transplant data, when the intent is to estimate the occurrence of one cause, for example relapse, but other events, such as transplant-related death, can compete and need to be taken into account appropriately.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 1" title="Pintilie M . Competing Risks: A Practical Perspective. John Wiley &amp; Sons: New York, 2006. pp 24." href="https://www.nature.com/articles/bmt2009359#ref-CR1" id="ref-link-section-d248744617e380">1</a>, <a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 2" title="Klein JP, Rizzo JD, Zhang MJ, Keiding N . Statistical methods for the analysis and presentation of the results of bone marrow transplants. Part I: unadjusted analysis. Bone Marrow Transplant 2001; 28: 909–915." href="https://www.nature.com/articles/bmt2009359#ref-CR2" id="ref-link-section-d248744617e383">2</a>, <a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 3" title="Kim HT . Cumulative incidence in competing risks data and competing risks regression analysis. Clin Cancer Res 2007; 13: 559–565." href="https://www.nature.com/articles/bmt2009359#ref-CR3" id="ref-link-section-d248744617e386">3</a></sup> This paper is the second part of an earlier published article by the same authors.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 4" title="Scrucca L, Santucci A, Aversa F . Competing risk analysis using R: an easy guide for clinicians. Bone Marrow Transplant 2007; 40: 381–387." href="https://www.nature.com/articles/bmt2009359#ref-CR4" id="ref-link-section-d248744617e390">4</a></sup> As the subject matter is complex, the paper is addressed to those clinicians with good statistical knowledge, who routinely analyze their own data.

In our earlier publication,<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 4" title="Scrucca L, Santucci A, Aversa F . Competing risk analysis using R: an easy guide for clinicians. Bone Marrow Transplant 2007; 40: 381–387." href="https://www.nature.com/articles/bmt2009359#ref-CR4" id="ref-link-section-d248744617e397">4</a></sup> we presented a description of the univariate competing risk analysis performed using the R statistical software.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 5" title="R Development Core Team. R: A Language and Environment for Statistical Computing, R Foundation for Statistical Computing 2009, Vienna, Austria. ISBN 3–900051–07–0, URL 
                  http://www.R-project.org
                  
                ." href="https://www.nature.com/articles/bmt2009359#ref-CR5" id="ref-link-section-d248744617e401">5</a></sup> Furthermore, we discussed how to perform significance testing when different groups are involved. Here, we show how to perform a multivariable regression analysis in the presence of competing risks data.

During the last two decades, many authors have proposed different methods to analyze survival data in the presence of competing risk (see below for a brief review), but applications from clinicians, including those who are well trained in medical statistics, are still not currently performed. In fact, although multivariable survival analysis is a well-known tool, as evidenced by the popularity of the Cox model in the medical field, a different situation arises with competing risk analysis. In our opinion, one possible reason for this lack of adoption is related to the fact that most of the common statistical software used by clinicians has not implemented this type of analysis. To promote the use of regression modeling in the presence of competing risk events, we illustrate how to perform a multivariable regression analysis using the semiparametric proportional hazards model proposed by Fine and Gray.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 6" title="Fine JP, Gray RJ . A proportional hazards model for the subdistribution of a competing risk. J Am Stat Assoc 1999; 94: 496–509." href="https://www.nature.com/articles/bmt2009359#ref-CR6" id="ref-link-section-d248744617e408">6</a></sup> The analysis is performed using the *crr* package for the R statistical software. A data set concerning hematopoietic stem cell transplantation is used as an example to evaluate the dependence of the cumulative incidence of relapse, in the presence of transplant-related death, on some predictive factors and covariates.

## Regression models for competing risks data analysis

The most commonly used regression model for analyzing event-time data is the Cox proportional hazards model. In the presence of competing risks, the standard Cox proportional hazards model is not adequate because the cause-specific Cox model treats competing risks of the event of interest as censored observations. In addition, the cause-specific hazard function does not have a direct interpretation in terms of survival probability.

An adaptation of Cox regression requiring data augmentation has been proposed by Lunn and McNeil<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 7" title="Lunn M, McNeil D . Applying Cox regression to competing risks. Biometrics 1995; 51: 524–532." href="https://www.nature.com/articles/bmt2009359#ref-CR7" id="ref-link-section-d248744617e426">7</a></sup>. With *k* competing events, the data for each patient are duplicated *k* times, one row for each type of failure; then, *k*−1 indicator variables are created for identifying whether a certain event has occurred. A stratified Cox regression could also be applied to allow non-proportional hazards.

Direct regression modeling of the effect of covariates on the cumulative incidence function (CIF) for competing risks data has been proposed, among others, by Fine and Gray,<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 6" title="Fine JP, Gray RJ . A proportional hazards model for the subdistribution of a competing risk. J Am Stat Assoc 1999; 94: 496–509." href="https://www.nature.com/articles/bmt2009359#ref-CR6" id="ref-link-section-d248744617e442">6</a></sup> and by Klein and Andersen.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 8" title="Klein JP, Andersen PK . Regression modeling of competing risks data based on pseudo values of the cumulative incidence function. Biometrics 2005; 61: 223–229." href="https://www.nature.com/articles/bmt2009359#ref-CR8" id="ref-link-section-d248744617e446">8</a></sup> For a review of different approaches to regression modeling in the presence of competing risks see Klein and Zhang,<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 9" title="Klein JP, Zhang MJ . Survival analysis. Handbook of Statistics 2007; 27: 281–320." href="https://www.nature.com/articles/bmt2009359#ref-CR9" id="ref-link-section-d248744617e450">9</a></sup> Moeschberger *et al.*,<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 10" title="Moeschberger ML, Tordoff KP, Kochar N . A Review of Statistical Analyses for Competing Risks. Handbook of Statistics 2007; 27: 321–341." href="https://www.nature.com/articles/bmt2009359#ref-CR10" id="ref-link-section-d248744617e457">10</a></sup> and Logan *et al.*<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 11" title="Logan BR, Zhang MJ, Klein JP . Regression models for hazard rates versus cumulative incidence probabilities in hematopoietic cell transplantation data. Biol Blood Marrow Transplant 2006; 12: 107–112." href="https://www.nature.com/articles/bmt2009359#ref-CR11" id="ref-link-section-d248744617e464">11</a></sup>

Fine and Gray<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 6" title="Fine JP, Gray RJ . A proportional hazards model for the subdistribution of a competing risk. J Am Stat Assoc 1999; 94: 496–509." href="https://www.nature.com/articles/bmt2009359#ref-CR6" id="ref-link-section-d248744617e470">6</a></sup> proposed a model for the subdistribution hazard of the CIF. The *subdistribution hazard* is a key concept in this approach, and it is defined as the hazard of failing from a given cause in the presence of competing events, given that a subject has survived or has already failed due to different causes. We can write the subdistribution hazard for cause *r* as

![](https://media.springernature.com/lw417/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ1_HTML.gif)

where *I*<sub><i>r</i></sub>(*t*)=Pr(*T*⩽*t*, *R*\=*r*) is the CIF for cause *r* (*r*\=1, …, *k*).

Fine and Gray<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 6" title="Fine JP, Gray RJ . A proportional hazards model for the subdistribution of a competing risk. J Am Stat Assoc 1999; 94: 496–509." href="https://www.nature.com/articles/bmt2009359#ref-CR6" id="ref-link-section-d248744617e524">6</a></sup> adopted a semiparametric proportional hazards model for the subdistribution hazard of cause *r* for a subject with covariate vector ***X*** as follows

![](https://media.springernature.com/lw175/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ2_HTML.gif)

where *λ*<sub><i>r</i>0</sub>(*t*) is the baseline subdistribution hazard of cause *r*, and *β*<sub><i>r</i></sub> is the vector of coefficients for the covariates. Estimation for this model follows the partial likelihood approach used in a standard Cox model.

## Using R for competing risks regression analysis

R is the statistical software available at [http://www.R-project.org](http://www.r-project.org/) and distributed under the GNU ([http://www.gnu.org](http://www.gnu.org/)) General Public License. It allows for many, if not all, types of statistical analyses, either in the base distribution or via additional packages.

Scrucca *et al.*<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 4" title="Scrucca L, Santucci A, Aversa F . Competing risk analysis using R: an easy guide for clinicians. Bone Marrow Transplant 2007; 40: 381–387." href="https://www.nature.com/articles/bmt2009359#ref-CR4" id="ref-link-section-d248744617e589">4</a></sup> showed how to perform a competing risk analysis in R using an add-on package called cmprsk. They also discussed installation of the R software and the cmprsk package. In the following, a basic knowledge of R is assumed, especially with regard to reading a data file and manipulation of a vector or a matrix of values. Interested readers may consult the above-mentioned paper and the references therein for details.

To facilitate the analysis we wrote some simple functions, which are described in [Appendix A](https://www.nature.com/articles/bmt2009359#App1) and also contained in the file crr- addson.R available at [http://www.stat.unipg.it/luca/R/](http://www.stat.unipg.it/luca/R/). Assuming that this file is in your current working directory, you may load it as follows:

![](https://media.springernature.com/lw215/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ3_HTML.gif)

## Data analysis example

We will analyze data from 177 patients who received a stem cell transplant for acute leukemia. The aim of the analysis was to estimate the cumulative incidence of relapse in the presence of transplant-related death, which deals with competing events. The effect on relapse of predictive factors and covariates such as Sex, Disease (lymphoblastic or myeloblastic leukemia), Phase at transplant (Relapse, CR1, CR2, CR3), Source of stem cells (bone marrow and peripheral blood, coded as BM+PB, or peripheral blood, coded as PB), and Age will be evaluated.

The data set is available at the URL [http://www.stat.unipg.it/luca/R](http://www.stat.unipg.it/luca/R) in the file ‘bmtcrr.csv’ and the contained variables are summarized in [Table 1](https://www.nature.com/articles/bmt2009359#Tab1).

**Table 1 Variables in the data file example**

[Full size table](https://www.nature.com/articles/bmt2009359/tables/1)

Assuming that the data file is located on the current working directory, it can be read as follows:

![](https://media.springernature.com/lw270/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ4_HTML.gif)

Should the full path be needed, the function *file.choose()* provides a graphical user interface from which users can search for a file within any folder (see also Scrucca *et al.*<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 4" title="Scrucca L, Santucci A, Aversa F . Competing risk analysis using R: an easy guide for clinicians. Bone Marrow Transplant 2007; 40: 381–387." href="https://www.nature.com/articles/bmt2009359#ref-CR4" id="ref-link-section-d248744617e865">4</a></sup>). If the data file is correctly read, then the user may look at the values for some of the first patients using:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figa_HTML.gif)

We aim to model the failure time ftime, with censoring and competing events provided by Status, as a function of the predictors Age, Sex, D, Phase, and Source. With the exception of age, the other covariates are categorical, so to include them into our model we need to carefully code them numerically. Several codings of factors are available, but the simplest is based on the so-called ‘baseline’ codification. For a factor or categorical variable made of *J* levels or categories, we must create *J-1* dummy variables or indicator variables, that is, variables coded as 1 in the presence of a given category and 0 otherwise. One category is treated as baseline and the corresponding dummy variable is dropped. For example, Sex has two levels (F and M) so we need only one variable to represent it; using males as baseline, we assign 1 to females and 0 to males. For the variable Phase, which has four levels (CR1, CR2, CR3, and Relapse), we need three dummy variables.

We provide a R function *factor2ind()*, which creates a matrix of indicator variables from a factor (see [Appendix A](https://www.nature.com/articles/bmt2009359#App1)). For example, to obtain the indicator variable for Sex using ‘Male’ as baseline we use:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figb_HTML.gif)

The *factor2ind()* function returns a matrix with a single column and a number of rows equal to the number of observations. The values 1 indicate females, and 0 males. For instance, the second patient is a female, whereas the first and the third patients are males. If we apply this function to the categorical variable Phase with ‘Relapse’ as baseline, we obtain the following:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figc_HTML.gif)

The resulting matrix has three columns, that is, the number of levels of Phase minus one. Looking at the output we see that the first and last patients had a relapse (all zeroes appear in the corresponding rows), whereas the second patient CR2 and the third one CR3.

The matrix of fixed covariates, also called design matrix, can be constructed in R as follows

![](https://media.springernature.com/lw414/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ5_HTML.gif)

Here, we use the function *cbind()* to concatenate by columns the variables Age, and the indicator variables for Sex, D, Phase, and Source. The first rows of the design matrix are:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figd_HTML.gif)

The main function to fit regression models for competing risks data is *crr()*, which is contained in the cmprsk package. In the simplest form it requires a vector of follow-up times, a vector of status with a code for each failure type or censoring, and a matrix of fixed covariates. By default, the censoring code for status is set by the optional argument cencode=0, and the code that denotes the failure type of interest is set by the optional argument failcode=1. (In our example, transplant-related death, which is the competing event, is coded with 2.)

The first regression model for relapse can be produced by typing

![](https://media.springernature.com/lw253/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ6_HTML.gif)

which returns an object assigned to the variable mod1. A summary of the estimation is simply obtained as follows:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Fige_HTML.gif)

The first part of the output shows for each term in the design matrix the estimated coefficient *β̂*<sub><i>j</i></sub>, the relative risk exp(*β̂*<sub><i>j</i></sub>), the standard error, the *z*\-value and the corresponding *P*\-value for assessing significance. In our example, Sex is not significant, followed by Age and D, whereas Source is only marginally significant. Phase is a factor with relapse as baseline, so each *P*\-value provides a test for the difference of each level with respect to the baseline. An overall *P*\-value for Phase (the overall *P*\-value is always required when modeling a factor with more than two levels), can be obtained through the Wald test. This is implemented in the R package aod and, assuming that such a package is already installed, by typing

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figf_HTML.gif)

The first argument to the function *wald.test()* is the estimated covariance matrix for the coefficients, followed by the vector of coefficients estimates, and the position of coefficients for which we want to assess significance (see help(wald.test) for a more detailed description of these and other available arguments). In our case, the *P*\-value indicates that Phase is statistically significant.

The second part of the output for competing risks regression shows the relative risk for each term, exp(*β̂*<sub><i>j</i></sub>), and a 95% confidence interval (the confidence level may be set at a different value using the argument conf.int in the *summary()* call—see *help(summary.crr)*). The relative risk or subdistribution hazard ratio for a categorical covariate is the ratio of subdistribution hazards for the actual group with respect to the baseline, with all other covariates being equal. If the covariate is continuous then the relative risk refers to the effect of a one unit increase in the covariate, with all other covariates being equal. In our data, exp(−0.0352)=0.965 is the relative risk of a female with respect to a male, and exp(−0.0185)=0.982 is the relative risk for a 1 year increase in age.

The last part of the output shows the pseudo log-likelihood at maximum and the pseudo likelihood ratio test, that is, the difference in the objective function at the global null and at the final estimates. As this objective function is not a true likelihood, this test statistic is not asymptotically distributed as a χ<sup>2</sup>. As a consequence, model comparison based on likelihood ratio approach cannot be performed directly, but significance must be evaluated through simulations. However, a model selection criterion can be easily adopted as described in the following section.

## Model selection

The likelihood of the data for a given model is a measure of the goodness of fit. However, the likelihood is increased when the number of parameters in the model is also increased. This may lead to overfitting. To avoid this, information criteria penalize the likelihood on the basis of the number of estimated parameters. Such criteria can then be used for the selection of a model among a set of candidate models.

Two of the most commonly used information criteria are the Akaike information criteria<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 12" title="Akaike H . A new look at the statistical model identification. IEEE Trans Automat Contr 1974; 19: 716–723." href="https://www.nature.com/articles/bmt2009359#ref-CR12" id="ref-link-section-d248744617e1047">12</a></sup> (AIC) and the Bayesian information criteria<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 13" title="Schwartz G . Estimating the dimension of a model. Ann Stat 1978; 6: 31–38." href="https://www.nature.com/articles/bmt2009359#ref-CR13" id="ref-link-section-d248744617e1051">13</a></sup> (BIC). The AIC is defined as

![](https://media.springernature.com/lw127/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ7_HTML.gif)

where *l* is the maximized value of the log-likelihood for a given model and *d* is the number of free parameters to be estimated. For a regression model, *d* is usually equal to the number of estimated coefficients. Thus, AIC includes a penalty, which is an increasing function of the number of estimated parameters. In contrast, BIC is defined as

![](https://media.springernature.com/lw160/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ8_HTML.gif)

where *n* is the number of observations. The BIC penalizes models using a large number of free parameters more strongly than does the AIC.

From a practical point of view, the AIC and BIC differ in how the penalty term is defined. However, they have been derived from very different points of view: AIC provides an estimate of the expected relative Kullback–Leibler distance between the estimated model and the true model,<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 14" title="Burnham KP, Anderson DR . Model Selection and Multimodel Inference: A Practical Information-Theoretic Approach. Springer-Verlag: New York, 2002. pp 488." href="https://www.nature.com/articles/bmt2009359#ref-CR14" id="ref-link-section-d248744617e1087">14</a></sup> whereas BIC is derived from a Bayesian point of view, and it can be seen as an approximation to the logarithm of the Bayes factor for comparing two models with equal prior probability on each model.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 15" title="Kass RE, Raftery AE . Bayes factors. J Am Stat Assoc 1995; 90: 773–795." href="https://www.nature.com/articles/bmt2009359#ref-CR15" id="ref-link-section-d248744617e1091">15</a></sup>

Both AIC and BIC do not provide a test on the model in the sense of hypothesis testing, rather they provide a tool for ranking the competing models according to the selected criterion. As the magnitude of any information criterion is not relevant, differences with respect to the smallest value are usually computed. Interpretation is then based on general rules of thumb. For example, if we define Δ*BIC*<sub><i>i</i></sub>\=*BIC*<sub><i>i</i></sub>−min(*BIC*) the BIC difference for model *i* with respect to the smallest value of BIC for a set of candidate models, Kass and Raftery<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 15" title="Kass RE, Raftery AE . Bayes factors. J Am Stat Assoc 1995; 90: 773–795." href="https://www.nature.com/articles/bmt2009359#ref-CR15" id="ref-link-section-d248744617e1116">15</a></sup> argued that values of Δ*BIC*<sub><i>i</i></sub>\>10 provide very strong evidence against the *i*\-th model, but values of 0<Δ*BIC*<sub><i>i</i></sub><2 suggest that the *i*\-th model has substantial support and should receive consideration in making inferences. Similar considerations apply for AIC.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 14" title="Burnham KP, Anderson DR . Model Selection and Multimodel Inference: A Practical Information-Theoretic Approach. Springer-Verlag: New York, 2002. pp 488." href="https://www.nature.com/articles/bmt2009359#ref-CR14" id="ref-link-section-d248744617e1139">14</a></sup>

We return to our data analysis example. After we fitted our starting model, we realized that some covariates appeared not to be significant or only marginally significant, and so they were candidates for removal from the model. This problem can be recast as a model selection problem using one of the information criterion discussed.

We may start by fitting a set of candidate models for which we pursue model selection. Fitting all possible models is not viable as there are (2<sup>5</sup>−1)=31 of them. We may consider a ‘forward’ approach, adding covariates on the basis of their significance in the full model and then comparing the resulting models. The first covariate is the factor Phase, followed by Source. Then there are three covariates, Age, Sex, and D, which are largely not significant and presumably should not all be included at the same time. For this reason, we may include one of them at a time. The models we are going to compare are the following (note that in R all the commands following the symbol # are commented out, hence below, we add comments to aid the reader):

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figg_HTML.gif)

The function *modsel.crr()* allows model selection on a list of candidate models (see [Appendix A](https://www.nature.com/articles/bmt2009359#App1)). It can be simply invoked as follows:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figh_HTML.gif)

For each model, we have included an argument in the call to the function, the output provides the sample size, the maximized log-likelihood, the number of estimated parameters (Df.fit), the BIC value and the BIC difference with respect to the minimum value observed from the set of candidate models. The null model (labeled as Model 0 in the above output) is also automatically included; this is the model with no covariates, so it may serve as a reference for the inclusion of any of the available predictors. The smallest BIC value is achieved by the null model, closely followed by the model with the covariate Phase included. Adopting the general rule-of-thumb discussed earlier, we use the following as our working model:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figi_HTML.gif)

The coefficients associated with CR1 and CR2 are significantly different from zero, so the relative risk of these levels of Phase with respect to the baseline category given by Relapse is about 1/3. On the contrary, the coefficient for CR3 is not significant; therefore, the relative risk, which is about 1/2, has a confidence interval including the null hypothesis (0.14–1.48).

## Model diagnostic

The output of the *crr()* function also provides a matrix of *Schoenfeld residuals*, which are analogous to the Schoenfeld residuals in ordinary survival models. Plotting the *j*\-th column of this matrix against the vector of unique failure times allows for the evaluation of the lack of fit over time in the corresponding covariate.

In our case, we may display the matrix of residuals, and plot them against failure times as follows:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figj_HTML.gif)

Plots of Schoenfeld-type residuals against time failure for each term in the final model are shown in [Figure 1](https://www.nature.com/articles/bmt2009359#Fig1). If the proportional hazard subdistribution assumption holds the residuals should have locally a constant mean across time. To check this, we added a scatterplot smoother to each plot; the resulting patterns do not show any evidence of a non-constant local average.

![figure 1](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Fig1_HTML.jpg)

**Figure 1**

## Time-varying covariates

Time-varying fixed effects are artificial time-dependent covariates, which represent the effect in different time periods of a covariate whose value is unchanging over time. These are typically adjustments for non-proportional hazards in the Cox model.<sup><a data-track="click" data-track-action="reference anchor" data-track-label="link" data-test="citation-ref" aria-label="Reference 16" title="Klein JP, Rizzo JD, Zhang MJ, Keiding N . Statistical methods for the analysis and presentation of the results of bone marrow transplants. Part 2: Regression modeling. Bone Marrow Transplant 2001; 28: 1001–1011." href="https://www.nature.com/articles/bmt2009359#ref-CR16" id="ref-link-section-d248744617e1249">16</a></sup>

The same arises with the Fine and Gray model, where one basic assumption that the subdistribution for an event of interest at a given covariate value is a constant shift on the complementary log–log scale from a baseline subdistribution function. This can be generalized by including interactions of one or more covariates with functions of time to allow the magnitude of the shift to change with follow-up time.

Time-varying covariates can be modeled in *crr()* using two further arguments in the function call: cov2 a matrix of covariates to be multiplied with functions of time defined by the argument tf. Suppose we would like to fit a quadratic (in time) model for an Age, that is, *β*<sub>1</sub>Age+*β*<sub>2</sub>Age *t*+*β*<sub>3</sub>Age *t*<sup>2</sup>. This can be accomplished by using the following function call:

![](https://media.springernature.com/lw412/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ9_HTML.gif)

The argument cov1 contains the matrix of fixed covariates; in our case, we included the terms associated with the covariates Phase and Age. Then, cov2 provides a matrix with two columns, both having the values of Age, which are multiplied by the quadratic function defined in tf. The resulting output follows:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figk_HTML.gif)

Neither the linear nor the quadratic term expressing the interaction of time with Age are statistically significant. This provides further evidence that the proportional hazard subdistribution assumption is not violated.

## Model-based estimation of the CIF

The predicted CIF can be computed for cause *r* as

![](https://media.springernature.com/lw170/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ10_HTML.gif)

where *Ĥ*<sub><i>r</i></sub>(*t*) is the estimated cumulative subdistribution hazard for the event of interest obtained for a specified covariate value, and calculated using a Breslow-type estimator.

In our example, we may obtain the predicted CIF for each level of the covariate Phase at each unique failure time by first creating a matrix of values for each level

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figl_HTML.gif)

and then using the generic function *predict()* to compute the predicted CIF as follows:

![](https://media.springernature.com/w300/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Figm_HTML.gif)

The output of the function *predict()* is a matrix with unique failure times in the first column, and the other columns giving the estimated subdistribution function corresponding to the covariate combinations in the rows of the input matrix x0 at each failure time. Thus, in the above output, the second column refers to the predicted CIF for Phase = CR1, the third column for Phase = CR2, and so on.

Finally, we may plot the predicted CIF and obtain the graph in [Figure 2](https://www.nature.com/articles/bmt2009359#Fig2) by typing

![](https://media.springernature.com/lw410/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Equ11_HTML.gif)

![figure 2](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fbmt.2009.359/MediaObjects/41409_2010_Article_BFbmt2009359_Fig2_HTML.jpg)

**Figure 2**

## Final remarks

In this paper, we discussed how to conduct a regression analysis for competing risks data using an add-on package for the R statistical software. We presented a typical transplant multivariable analysis, in which the cumulative incidence of relapse in the presence of the competitive event, transplant-related death, is studied.

As we did in our earlier paper, we provide the data set used as an example so that the readers may practice and feel more secure in their ability. We hope to have achieved our goal, which was to illustrate how to fit the models in R while, at the same time, supplying some useful statistical comments.