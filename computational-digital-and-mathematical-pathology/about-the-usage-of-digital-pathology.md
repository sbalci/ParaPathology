---
type: Note
status: Developing
language: bilingual
aliases:
  - "About the Usage of Digital Pathology"
order: 30
belongs_to: "[[Digital Pathology]]"
---

# About the Usage of Digital Pathology

## Start with the intended use

Before choosing equipment or a viewer, describe what the service will do: teaching, research, consultation, or primary diagnosis; which specimens and stains it will cover; who will use it; and where interpretation will take place. Record what is outside scope and when to return to the glass slide.

This is an educational planning guide. The checklist is a practical synthesis, not a laboratory SOP or a statement that a particular installation is validated. Local clinical, information-governance, regulatory, and accreditation requirements need separate assessment.

## Plan the complete workflow

| Stage | Practical questions | Useful record |
| --- | --- | --- |
| Slide preparation and identification | Does the slide meet the laboratory's preparation criteria? Can case, specimen, slide, and image be matched without ambiguity? | Identity checks and rejection/rescan reasons |
| Scanning and image QC | Is all relevant tissue captured and in focus? Are there stitching errors, missing regions, or other artifacts? Are the expected images present? | Scan settings, QC outcome, and corrective action |
| Viewing and interpretation | Are the viewer, display, environment, network, and user training suitable for the intended work? | Configuration, training record, and known limitations |
| Storage and retrieval | Can authorised users retrieve the correct image and associated information promptly? Who owns capacity planning, backup/restore testing, retention, and support? | Storage and access plan, restore-test and maintenance records |
| Exceptions and downtime | What happens when an image is incomplete, a case is unsuitable, or a system is unavailable? | Escalation, glass-slide fallback, and incident procedures |

The [NPIC Guide to Digital Pathology](https://npic.ac.uk/wp-content/uploads/sites/71/2023/01/Guide-to-Digital-Pathology-Vol.2.pdf) provides implementation guidance on image quality, case matching, infrastructure, and ongoing costs. Backup tests, retention, and downtime arrangements above are planning prompts; this page does not prescribe a universal interval or retention period.

## Validate diagnostic use locally

The active [CAP/ASCP/API whole-slide imaging guideline](https://www.cap.org/cap-guidelines/validating-whole-slide-imaging-for-diagnostic-purposes-in-pathology/) is the 2021 update, published in print in 2022. Its [recommendations](https://www.cap.org/wp-content/uploads/documents/wsi-summary-recommendations.pdf) and [good-practice statements](https://www.cap.org/wp-content/uploads/documents/wsi-teaching-presentation.pdf) include:

- At least **60 cases**, representative of one intended application and routine diagnostic complexity; an additional **20 cases** for relevant additional applications not represented in the initial set.
- Comparison of the same observer's digital and glass-slide diagnoses, with at least a **two-week washout** between modalities.
- Investigation and remediation when intraobserver concordance is **below 95%**. This is an investigation trigger, not a universal regulatory pass/fail mark or a claim of 95% diagnostic accuracy.
- Assessment of the complete system in its intended setting, trained users, representation of tissue in the digital image, and documentation of the study and approval.

The guideline's recommendations are not themselves mandatory, as CAP's FAQ explains. Check applicable regulatory and accreditation requirements separately. The [CAP teaching presentation](https://www.cap.org/wp-content/uploads/documents/wsi-teaching-presentation.pdf) provides context; this short note does not replace the full guideline.

### Keep validation, routine QC, and change control distinct

Initial validation addresses the intended use of the workflow. Routine QC checks whether today's images and service remain fit for that use. Change control determines what evidence is needed after a change. Maintain procedures for changes that could affect clinical results; do not treat every software update or replacement as identical. CAP's [change-control examples](https://www.cap.org/wp-content/uploads/documents/wsi-if-then-statements.pdf) distinguish, for example, a new scanner make/model from replacement by the same make/model. Record the impact assessment and any verification or revalidation needed.

## Check the specific product and configuration

Regulatory status is tied to a device, its labeling, intended use, and compatible configuration. FDA records illustrate why authorization of one WSI device cannot be extended to every scanner, viewer, or research algorithm: the [Philips PIPS decision](https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN160056.pdf) specifies a system and use, while the [Novo decision](https://www.accessdata.fda.gov/cdrh_docs/reviews/K212361.pdf) covers viewer software with specified compatible equipment. These are examples, not an exhaustive current product list. Check the current record and labeling for the actual product and jurisdiction before clinical use.

A research tool's availability, open code, or publication is a separate question from its suitability and authorization for a diagnostic workflow. See the [software chooser](digital-pathology-software.md) for research-oriented starting points.

## Test interoperability and sharing explicitly

[DICOM whole-slide imaging](https://dicom.nema.org/Dicom/DICOMWSI/) supports tiled, multiresolution images and associated metadata. Compare conformance statements and test the required scanner–archive–viewer exchange: the [DICOM conformance guidance](https://dicom.nema.org/medical/dicom/current/output/chtml/part02/sect_n.3.3.html) makes clear that conformance alone does not guarantee interoperability.

Before sharing research or teaching images, inspect metadata, filenames, associated label/macro images, and identifiers embedded in pixels. Removing selected metadata is not sufficient evidence of de-identification. The [DICOM confidentiality profile](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.2.html) distinguishes metadata handling from pixel-data cleaning. Use the institution's approved sharing process; a technical cleaning step alone does not establish legal compliance.

## Foundational reading

- **Whole Slide Imaging Versus Microscopy for Primary Diagnosis in Surgical Pathology: A Multicenter Blinded Randomized Noninferiority Study of 1992 Cases (Pivotal Study).** *American Journal of Surgical Pathology* (2018). [DOI: 10.1097/PAS.0000000000000948](https://doi.org/10.1097/PAS.0000000000000948). Read its study population, exclusions, system, comparator, and endpoints before applying its findings to another setting.
- **The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth.** *Archives of Pathology & Laboratory Medicine* (2017). [DOI: 10.5858/arpa.2016-0386-RA](https://doi.org/10.5858/arpa.2016-0386-RA). Background for evaluating the reference used to judge an automated measurement.

**Source check:** 1 October 2026, for the guidance and official documents linked on this page. This is a source-based content update, not clinical review or validation of any laboratory, product, or analysis pipeline.

# Dijital Patolojinin Kullanımı Hakkında

## Amaçlanan kullanımla başlayın

Ekipman ya da görüntüleyici seçmeden önce hizmetin ne yapacağını tanımlayın: eğitim, araştırma, konsültasyon ya da primer tanı; hangi örnekleri ve boyaları kapsayacağı; kimlerin kullanacağı ve yorumlamanın nerede yapılacağı. Kapsam dışında kalanları ve cam preparata ne zaman geri dönüleceğini kayıt altına alın.

Bu, eğitim amaçlı bir planlama rehberidir. Kontrol listesi pratik bir sentezdir; bir laboratuvar standart işletim prosedürü (SOP) ya da belirli bir kurulumun valide edildiğine dair bir beyan değildir. Yerel klinik, bilgi yönetişimi, düzenleyici ve akreditasyon gereklilikleri ayrıca değerlendirilmelidir.

## İş akışının tamamını planlayın

| Aşama | Pratik sorular | Yararlı kayıt |
| --- | --- | --- |
| Preparat hazırlama ve tanımlama | Preparat, laboratuvarın hazırlama kriterlerini karşılıyor mu? Olgu, örnek, preparat ve görüntü belirsizliğe yer bırakmadan eşleştirilebiliyor mu? | Kimlik kontrolleri ve ret/yeniden tarama gerekçeleri |
| Tarama ve görüntü kalite kontrolü | İlgili dokunun tamamı yakalanmış ve odakta mı? Birleştirme (stitching) hataları, eksik alanlar ya da başka artefaktlar var mı? Beklenen görüntülerin hepsi mevcut mu? | Tarama ayarları, kalite kontrol sonucu ve düzeltici faaliyet |
| Görüntüleme ve yorumlama | Görüntüleyici, ekran, ortam, ağ ve kullanıcı eğitimi amaçlanan iş için uygun mu? | Yapılandırma, eğitim kaydı ve bilinen sınırlılıklar |
| Depolama ve erişim | Yetkili kullanıcılar doğru görüntüye ve ilişkili bilgilere hızla erişebiliyor mu? Kapasite planlaması, yedekleme/geri yükleme testleri, saklama ve destek kimin sorumluluğunda? | Depolama ve erişim planı, geri yükleme testi ve bakım kayıtları |
| İstisnalar ve kesinti | Bir görüntü eksik olduğunda, bir olgu uygun olmadığında ya da bir sistem kullanılamadığında ne olur? | Üst basamağa bildirim, cam preparata geri dönüş ve olay (incident) prosedürleri |

[NPIC Guide to Digital Pathology](https://npic.ac.uk/wp-content/uploads/sites/71/2023/01/Guide-to-Digital-Pathology-Vol.2.pdf), görüntü kalitesi, olgu eşleştirme, altyapı ve süregelen maliyetler konusunda uygulama rehberliği sunar. Yukarıdaki yedekleme testleri, saklama ve kesinti düzenlemeleri planlama hatırlatıcılarıdır; bu sayfa evrensel bir aralık ya da saklama süresi öngörmez.

## Tanısal kullanımı yerel olarak valide edin

Yürürlükteki [CAP/ASCP/API tüm slayt görüntüleme (whole slide imaging, WSI) kılavuzu](https://www.cap.org/cap-guidelines/validating-whole-slide-imaging-for-diagnostic-purposes-in-pathology/), basılı olarak 2022'de yayımlanan 2021 güncellemesidir. Kılavuzun [önerileri](https://www.cap.org/wp-content/uploads/documents/wsi-summary-recommendations.pdf) ve [iyi uygulama ifadeleri](https://www.cap.org/wp-content/uploads/documents/wsi-teaching-presentation.pdf) şunları içerir:

- Tek bir amaçlanan uygulamayı ve rutin tanısal karmaşıklığı temsil eden en az **60 olgu**; ilk sette temsil edilmeyen ilgili ek uygulamalar için ilave **20 olgu**.
- Aynı gözlemcinin dijital ve cam preparat tanılarının, iki yöntem arasında en az **iki haftalık arınma (washout) süresi** bırakılarak karşılaştırılması.
- Gözlemci içi uyum **%95'in altında** olduğunda araştırma ve iyileştirme yapılması. Bu bir araştırma tetikleyicisidir; evrensel bir düzenleyici geçti/kaldı sınırı ya da %95 tanısal doğruluk iddiası değildir.
- Sistemin tamamının amaçlanan ortamında değerlendirilmesi, eğitimli kullanıcılar, dokunun dijital görüntüde temsili ve çalışmanın ve onayın belgelenmesi.

CAP'in SSS'sinde açıklandığı üzere kılavuzun önerileri kendi başına zorunlu değildir. Geçerli düzenleyici ve akreditasyon gerekliliklerini ayrıca kontrol edin. [CAP eğitim sunumu](https://www.cap.org/wp-content/uploads/documents/wsi-teaching-presentation.pdf) bağlam sağlar; bu kısa not kılavuzun tam metninin yerini tutmaz.

### Validasyonu, rutin kalite kontrolü ve değişiklik kontrolünü birbirinden ayrı tutun

İlk validasyon, iş akışının amaçlanan kullanımını ele alır. Rutin kalite kontrol, bugünkü görüntülerin ve hizmetin bu kullanıma uygun olmayı sürdürüp sürdürmediğini denetler. Değişiklik kontrolü, bir değişiklikten sonra hangi kanıtın gerektiğini belirler. Klinik sonuçları etkileyebilecek değişiklikler için prosedürleri güncel tutun; her yazılım güncellemesini ya da değişimini aynı şekilde ele almayın. CAP'in [değişiklik kontrolü örnekleri](https://www.cap.org/wp-content/uploads/documents/wsi-if-then-statements.pdf), örneğin yeni bir tarayıcı marka/modelini, aynı marka/modelle yapılan değişimden ayırır. Etki değerlendirmesini ve gereken doğrulama ya da yeniden validasyonu kayıt altına alın.

## Belirli ürünü ve yapılandırmayı kontrol edin

Düzenleyici statü bir cihaza, onun etiketlemesine, amaçlanan kullanımına ve uyumlu yapılandırmasına bağlıdır. FDA kayıtları, bir WSI cihazına verilen iznin neden her tarayıcıya, görüntüleyiciye ya da araştırma algoritmasına genişletilemeyeceğini gösterir: [Philips PIPS kararı](https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN160056.pdf) bir sistemi ve kullanımı tanımlarken, [Novo kararı](https://www.accessdata.fda.gov/cdrh_docs/reviews/K212361.pdf) belirtilen uyumlu ekipmanla birlikte görüntüleyici yazılımını kapsar. Bunlar örnektir; kapsamlı ve güncel bir ürün listesi değildir. Klinik kullanımdan önce gerçek ürün ve yargı alanı için güncel kaydı ve etiketlemeyi kontrol edin.

Bir araştırma aracının erişilebilir olması, açık kaynak kodlu olması ya da yayımlanmış olması, tanısal bir iş akışı için uygunluğu ve izni sorusundan ayrı bir konudur. Araştırma odaklı başlangıç noktaları için [yazılım seçici](digital-pathology-software.md) sayfasına bakın.

## Birlikte çalışabilirliği ve paylaşımı açıkça test edin

[DICOM tüm slayt görüntüleme](https://dicom.nema.org/Dicom/DICOMWSI/), döşemeli (tiled), çok çözünürlüklü görüntüleri ve ilişkili üst verileri destekler. Uygunluk beyanlarını (conformance statements) karşılaştırın ve gereken tarayıcı–arşiv–görüntüleyici veri alışverişini test edin: [DICOM uygunluk rehberi](https://dicom.nema.org/medical/dicom/current/output/chtml/part02/sect_n.3.3.html), uygunluğun tek başına birlikte çalışabilirliği garanti etmediğini açıkça ortaya koyar.

Araştırma ya da eğitim görüntülerini paylaşmadan önce üst verileri, dosya adlarını, ilişkili etiket/makro görüntüleri ve piksellere gömülü tanımlayıcıları inceleyin. Seçilmiş üst verilerin kaldırılması, kimliksizleştirmenin (de-identification) yeterli kanıtı değildir. [DICOM gizlilik profili](https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.2.html), üst veri işlemeyi piksel verisinin temizlenmesinden ayırır. Kurumun onaylı paylaşım sürecini kullanın; tek başına teknik bir temizleme adımı yasal uyumu sağlamaz.

## Temel okumalar

- **Whole Slide Imaging Versus Microscopy for Primary Diagnosis in Surgical Pathology: A Multicenter Blinded Randomized Noninferiority Study of 1992 Cases (Pivotal Study).** *American Journal of Surgical Pathology* (2018). [DOI: 10.1097/PAS.0000000000000948](https://doi.org/10.1097/PAS.0000000000000948). Bulgularını başka bir ortama uygulamadan önce çalışma popülasyonunu, dışlama kriterlerini, sistemi, karşılaştırıcıyı ve sonlanım noktalarını okuyun.
- **The Gold Standard Paradox in Digital Image Analysis: Manual Versus Automated Scoring as Ground Truth.** *Archives of Pathology & Laboratory Medicine* (2017). [DOI: 10.5858/arpa.2016-0386-RA](https://doi.org/10.5858/arpa.2016-0386-RA). Otomatik bir ölçümü değerlendirmede kullanılan referansın sorgulanmasına yönelik arka plan bilgisi.

**Kaynak kontrolü:** 1 Ekim 2026; bu sayfada bağlantısı verilen kılavuz ve resmi belgeler için. Bu, kaynağa dayalı bir içerik güncellemesidir; herhangi bir laboratuvarın, ürünün ya da analiz akışının klinik incelemesi veya validasyonu değildir.
