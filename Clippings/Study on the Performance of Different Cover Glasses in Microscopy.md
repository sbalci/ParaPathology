---
type: Clipping
status: Evergreen
language: en
title: "Study on the Performance of Different Cover Glasses in Microscopy"
source: "https://www.leicabiosystems.com/clinical-solutions/case-studies/cover-glass-performance-comparison/"
source_type: page
author:
  - "[[Leica Biosystems]]"
commissioned_by: "Leica Biosystems GmbH, Nussloch, Germany"
investigation_site: "Renowned Optical Research Institute, Jena, Germany"
study_date: 2025-09
updated: 2026-10-17
source_accessed: 2026-10-21
created: 2026-10-11
description: "A comprehensive optical metrology and ray-tracing evaluation comparing conventional glass coverslips (Leica HistoCore SPECTRA CV) with polymer film tape (Sakura Tissue-Tek). Documents tactile profilometry, white light interferometry, spectrophotometric refractive index matching, TIR ellipsometry birefringence, and Zemax optical ray-tracing predicting 5–20% local MTF contrast loss in a simplified scanner model; clinical WSI and AI outcomes were not evaluated."
tags:
  - "clippings"
  - "microscopy"
  - "histopreparation"
  - "coverslips"
  - "optics"
  - "metrology"
  - "digital-pathology"
  - "quality-assurance"
  - "zemax"
  - "pre-analytics"
order: 154
belongs_to: "[[Clippings]]"
related_to:
  - "[[Microscopy]]"
  - "[[Quality And Standardisation]]"
  - "[[Considerations for digital pathology displays]]"
  - "[[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]"
  - "[[Robotic microscopy for everyone: the OpenFlexure Microscope]]"
  - "[[Standardization in digital pathology: Supplement 145 of the DICOM standards]]"
  - "[[digital-pathology-evidence]]"
hidden: true
---

# Study on the Performance of Different Cover Glasses in Microscopy

**Optical Metrology & Simulation Report: Conventional Glass Coverslips vs. Polymer Coverslipping Tape**  
*Conducted by an optical research institute in Jena, Germany; commissioned by Leica Biosystems GmbH (Nussloch, Germany, September 2025; source page updated October 17, 2026).*
Source: [Leica Biosystems Case Studies](https://www.leicabiosystems.com/clinical-solutions/case-studies/cover-glass-performance-comparison/)

---

## Scope, Evidence Levels & Limitations

This Leica Biosystems-commissioned report compares the specific glass and Sakura tape preparations supplied for a single-site optical evaluation. Commissioning should be considered when appraising its applicability; it is not an independent clinical validation of either workflow.

- **Measured:** Surface profiles, reflection/transmission, refractive indices and birefringence, and a small surface-defect inspection. The reported overall sample mix was six glass and seven tape samples (raw material, blanks and tissue preparations). The separate defect-inspection section reports three blanks per material, whereas the overall sample list names two blanks per material; the public report does not reconcile these counts. Sample counts should therefore be stated for the relevant work package.
- **Simulated:** MTF and resolution effects from measured deformation profiles in a simplified Zemax scanner model, not a clinical WSI performance trial.
- **Plausible consequences:** Effects on focus, fine-detail visibility, fluorescence or AI performance warrant application-specific testing; they were not demonstrated as clinical or operational outcomes here.
- **Independently validated clinical outcomes:** None are provided by this report. It did not assess diagnostic accuracy, patient outcomes, rescan rates, scanner throughput or AI segmentation/classification performance.

## Executive Overview & The "Front Optics" Paradigm

In routine histopathology and whole-slide imaging (WSI), the cover medium and mounting resin do not function merely as passive physical shields. They form part of the optical path between tissue and objective, described in the report as the microscope's "front optics".

Objective correction depends on cover-medium thickness, refractive index and surface geometry. Deviations can introduce aberrations, but their magnitude and practical effect depend on the optical system and application. This report does not establish a universal #1.5 thickness or procurement requirement.

This comparative study conducted in Jena evaluates the physical and optical performance differences between:

1. **Conventional Glass Coverslips:** Automated glass coverslipping using the **Leica HistoCore SPECTRA CV** system.
2. **Polymer Film Coverslips:** Automated tape coverslipping using the **Sakura Tissue-Tek** coverslipping tape system.

---

## Comparative Physical & Optical Metrology Matrix

| Parameter | Measurement Technology | Glass Coverslip (Leica HistoCore SPECTRA CV) | Polymer Tape (Sakura Tissue-Tek) | Interpretation / Evidence Boundary |
|---|---|---|---|---|
| **Micro-Roughness ($R_{\text{rms}}$)** | Contactless Scanning White Light Interferometry (SWLI; ZYGO NewView 7300) | Below detection noise floor | **$5\text{--}6\ \text{nm}$** (nodular, nubbly microstructure) | Roughness could contribute to scattering; its image-contrast effect was not quantified. |
| **Tactile Roughness ($R_{\text{rms}}$)** | Tactile Profilometry (Taylor Hobson Form Taly Surf PGI Plus, 60° stylus) | No separate glass tactile-roughness value reported | **$10\text{--}15\ \text{nm}$** | Confirms persistent surface texture on raw, blank, and mounted polymer films. |
| **Waviness / Macro-Period** | White Light Interferometry across $16 \times 12\ \text{mm}$ FOV | **Long period (millimeters)**; gentle, smooth spherical/saddle bending | **Short period ($\sim 200\ \mu\text{m}$)**; irregular, high-frequency corrugations | Measured ripple profiles were inputs to simulations predicting local aberrations. |
| **Tissue Conformation** | 3D surface map correlated with transmission histology | Bending largely unrelated to tissue shape | Surface profile roughly follows underlying tissue structure | Different deformation profiles were measured; imaging effects were modeled. |
| **Peak-to-Valley Deviation ($P_v$)** | Profilometric surface scan | $0.1\text{--}10\ \mu\text{m}$ (Tissue $2\text{--}3\times$ higher than blank) | $0.1\text{--}10\ \mu\text{m}$ (Tissue $2\text{--}3\times$ higher than blank) | Similar reported peak-to-valley ranges, with different deformation periods; equal variance was not established. |
| **Refractive Index ($n$)** | R/T spectroscopy and standard ellipsometry (film dispersion) | **$n \approx 1.52$** (well matched with glass slide) | **Lower index (approximately $> 0.03$ difference relative to slide glass)** | Index mismatch can increase spherical aberration at high NA; no universal NA threshold was established. |
| **Optical Losses ($100\% - R - T$)** | Spectrophotometry at 6° incident angle | Minimal across VIS; increases only below 350 nm | Report summary: **about $1\text{--}2\%$ higher losses**; total tape loss **3% at 400 nm, 13% at 325 nm** | Optical losses include scattering and absorption; fluorescence performance was not evaluated. |
| **Optical Isotropy / Birefringence** | Standard & Total Internal Reflection (TIR) Ellipsometry | **Optically isotropic** (zero detectable birefringence) | **Uniaxial (raw)** $\rightarrow$ **Biaxial (mounted)**; $\Delta \approx \pi/2$ phase retardation at high NA | No birefringence-related image effect expected at moderate-NA brightfield; high-NA/polarization effects may occur. |
| **Zemax MTF Contrast Drop** | Ray-tracing simulation (Leica scanner optics: 40×, NA 0.65) | Typically **$< 0.1\%$ MTF contrast drop** in the model | **$5\text{--}20\%$ local MTF contrast loss** at mid-range frequencies | Predicted local MTF effect in a simplified model; clinical tissue-detail visibility was not tested. |
| **Simulated 1.5 µm Test Grid** | Zemax image simulation on $150 \times 150\ \mu\text{m}$ target | **Constant resolution $\le 1.5\ \mu\text{m}$** across the entire field | **Local simulated resolution $> 2.0\ \mu\text{m}$** in the illustrated tape case | Simulated test-chart effect near the resolution limit, not a measured WSI result. |
| **Initial Surface Defects** | LEICA INM300 wafer inspection (ISO 10110-7) + ImageJ | Lower observed initial defect count | **$\sim 5\times$ more pre-existing defects**; prominent longitudinal scratches | Possible imaging artifacts; three blanks per material do not establish defect prevalence or rescan rates. |

---

## Detailed Experimental Findings

### 1. Surface Topography: Nanoscale Roughness vs. Optical Smoothness

The investigation deployed two complementary surface metrology techniques:

- **Tactile Profilometry:** Taylor Hobson Form Taly Surf PGI Plus equipped with a 60-degree conical diamond stylus (tip radius $2\ \mu\text{m}$), providing nanometer-range vertical resolution over $200\ \mu\text{m}$ line profiles.
- **Scanning White Light Interferometry (SWLI):** ZYGO NewView 7300 non-contact optical surface profiler utilizing Michelson ($5\times/0.25$) and Mirau ($20\times/0.40$ and $50\times/0.55$) interferometric objectives.

- **Micro-Roughness Findings:**
  - Glass surface roughness was below the white light interferometer's detection noise; this is not a measurement of zero roughness.
  - Polymer tape presented an intrinsic nodular micro-texture across all evaluated conditions (raw unmounted tape, blank mounted slides, and tissue-covered slides), yielding an RMS roughness of **$5\text{--}6\ \text{nm}$** via SWLI and **$10\text{--}15\ \text{nm}$** via tactile profilometry.
  - *Possible optical consequence:* Roughness could scatter light and reduce contrast. Quantitative straylight modeling and dark-field imaging evaluation were not performed.

- **Macro-Waviness & The Tissue Conformation Effect:**
  - When mounted with resin onto microscope slides, both media exhibited peak-to-valley ($P_v$) height corrugations ranging between $0.1\ \mu\text{m}$ and $10\ \mu\text{m}$ (tissue preparations showed approximately $2\text{--}3\times$ higher values than blanks for both media).
  - However, the **spatial periodicity differed fundamentally**:
    - **Glass:** Bends in gentle, large-period waves spanning **several millimeters**, forming smooth spherical bulges or saddle-shaped surfaces. Glass bending was almost unrelated to tissue shape in the evaluated samples.
    - **Polymer Film:** Deforms in tight, irregular ripples with spatial periods of only **$\approx 200\ \mu\text{m}$**. The measured surface profile roughly replicated the underlying tissue structure; the report did not establish a roller-pressure mechanism or specific cellular features.
  - *Modeled optical consequence:* The measured short-period deformations were represented in Zemax to predict field-dependent aberrations; a separate measurement of scanner wavefront distortion was not reported.

---

### 2. Spectrophotometric Dispersion & Refractive Index Mismatch

Reflection ($R$) and transmission ($T$) spectra were acquired from $300\ \text{nm}$ to $1000\ \text{nm}$ at a $6^\circ$ angle of incidence using a PerkinElmer spectrophotometer equipped with an internal reflection-transmission accessory to sample identical measurement locations.

1. **Refractive Index Mismatch:**
   - The evaluated glass slides and coverslips were well index-matched ($n \approx 1.52$).
   - The Sakura polymer film exhibited a noticeably lower refractive index ($> 0.03$ lower than the slide glass). This refractive index step at the coverslip interface breaks the optical continuity of the specimen layer, which can increase spherical aberration at high numerical apertures.
2. **Optical Losses & UV Cutoff:**
   - Across $400\text{--}1000\ \text{nm}$, polymer tape exhibited lower reflection and higher transmission than glass, alongside higher total optical losses ($\text{Loss} = 100\% - R - T$). The report summarizes the additional losses as about **$1\text{--}2\%$**, with a probable scattering contribution; this is not a wavelength-independent difference. R/T measurements did not separate absorption and scattering losses. The detector change above approximately 850 nm was not accommodated because the study focused on visible wavelengths.
   - In the near-ultraviolet range, polymer film showed increased total optical losses: losses escalated from **$3\%$ at $400\ \text{nm}$** to **$13\%$ at $325\ \text{nm}$**. The report considers these short-wavelength losses probably absorption-dominated. They motivate application-specific fluorescence checks, but fluorescence and autofluorescence were not evaluated.

---

### 3. Ellipsometry: Structural Birefringence & Application Limits

Ellipsometric measurements evaluated the amplitude ratio ($\tan \Psi$) and phase difference ($\Delta$) between transverse electric (TE) and transverse magnetic (TM) polarized waves across variable angles of incidence ($\theta_i$ / $\text{NA}_i$) and wavelengths:

- **Isotropy of Glass:** No birefringence was detected in the evaluated glass samples under the reported measurement conditions.
- **Uniaxial Anisotropy of Raw Tape:** Unmounted Sakura tape displayed distinct uniaxial birefringence, with the optic axis aligned along the layer normal. At numerical apertures near $\text{NA} \approx 1$, the TE-TM phase difference reached $\Delta \approx \pi/2$, representing a substantial alteration of the polarization state.
- **Biaxial Anisotropy of Mounted Tape:** When applied to a glass slide, the tape transformed into an **optically biaxial medium** with three distinct refractive indices ($n_x, n_y, n_z$). While the index difference is modest ($\Delta n < 5 \times 10^{-4}$), the substantial physical thickness of the tape ($\approx 150\ \mu\text{m}$) causes light to accumulate large polarization phase delays.
- **Application boundary:** The report expects no birefringence-related image-quality effect for moderate-NA brightfield microscopy, including the modeled Leica scanner. High-NA ($\text{NA} > 1$) and polarization applications may show effects. Congo Red interpretation and crystal identification were not tested; diagnostic impairment cannot be inferred as an established result.

---

### 4. Zemax Optical Ray-Tracing Simulations

To predict optical effects of the measured surface distortions, a simplified optical model was constructed in **ZEMAX** based on Leica whole-slide scanner specifications:

- **Objective Lens:** Custom Plan-Apochromat, focal length $f = 10\ \text{mm}$, $\text{NA} = 0.65$.
- **Tube Lens:** focal length $f = 400\ \text{mm}$.
- **Magnification:** $40\times$.
- **Object Field:** $\varnothing 1.25\ \text{mm}$ (active imaging field $1.08\ \text{mm}$).
- **Sensor Field:** $\varnothing 43\ \text{mm}$.
- **Correction:** Exit pupil Zernike surface compensating $0.44\lambda$ primary spherical aberration introduced by a nominal coverslip plate.

**Model limitations:** Actual scanner lens-design data were unavailable, so ideal paraxial lenses and a Zernike corrector were used. These lenses do not fully satisfy Abbe’s sine condition, polarization could not be fully modeled, and real-system aberrations were unknown. Quantitative straylight modeling was outside scope. Absolute real-scanner performance cannot be established from this model.

- **Surface Mathematical Models:**
  - Glass deformations modeled via Zemax **biconic surface** (saddle/bulge topologies).
  - Tape deformations modeled via Zemax **periodic surface** (high-frequency ripple corrugations).

- **Modulation Transfer Function (MTF) Impact:**
  - **Glass Coverslip:** The simulations predicted virtually no optical degradation across the entire field. The reported MTF contrast drop was typically **$< 0.1\%$** in the model.
  - **Polymer Tape:** The simulations predicted **field-dependent optical degradation**. Local MTF contrast reductions of **$5\%\text{ to }20\%$** were reported at mid-range spatial frequencies. MTF describes contrast transfer as a function of spatial frequency; this percentage is not an equivalent percentage loss of spatial resolution, whole-slide sharpness or diagnostic performance.
- **Simulated Resolution Test Chart ($1.5\ \mu\text{m}$ Line Grid):**
  - The model evaluated $150 \times 150\ \mu\text{m}$ test-chart areas with a $1.5\ \mu\text{m}$ grid period near the modeled resolution limit. The source describes its approximate cutoff in micrometers rather than spatial-frequency units; it should not be treated as a calibrated scanner-resolution specification. In the illustrated simulations:
    - The glass simulation showed constant resolution of **$\le 1.5\ \mu\text{m}$** uniformly across the full field of view.
    - The tape simulation showed localized zones of reduced contrast where resolution degraded to **$> 2.0\ \mu\text{m}$**, blurring line pairs into indistinct grey zones.
  - *Possible pathological relevance:* Reduced fine-detail visibility is a hypothesis for clinical testing. Nuclear features and microorganism detection were not evaluated in a diagnostic-reader study.

---

### 5. Surface Defects, Scratches & Contamination (ISO 10110-7)

Surface cleanliness and defect density were assessed using a semiconductor-grade **LEICA INM300 wafer-inspection microscope** ($2.5\times/0.07$ objective) paired with automated ImageJ defect classification across 6 samples (3 glass, 3 tape) before and after 1 week of exposure to standard laboratory ambient airborne particulates:

1. **Pre-Exposure Defect Burden:**
   - Blank polymer tape samples exhibited **approximately five times ($\sim 5\times$) more surface defects** than glass coverslips prior to environmental exposure.
   - Tape samples exhibited **longitudinal scratch tracks** along the length of the tape, with no established cause; the report notes inadequately documented sample handling and surface treatment.
2. **Post-Exposure Particulate Kinetics:**
   - The reported increase in detected particles after one week was greater for glass than tape under the study's storage and nitrogen-blowing protocol.
   - Samples were precleaned with optical wipes and nitrogen, then blown with nitrogen again after storage. The comparison does not establish cleaning efficacy or routine laboratory defect rates.
3. **Implications for Digital Slide Scanners:**
   - The report describes scanner optics with an optical depth of field of **$1\text{--}2\ \mu\text{m}$**.
   - Inclusions and bubbles between the cover medium and slide may affect image quality with a shallow depth of field. Autofocus failures, stitching errors, scan aborts and rescan rates were not measured.

**Defect-inspection limitations:** Only three blank slides per material were inspected, too few for reliable statistical evaluation. Handling and cleaning history were incompletely documented, and defect-related optical simulations were not performed.

---

## Implications for Digital Pathology & AI Deployments

The optical findings provide reasons to evaluate coverslipping as a pre-analytic variable. They do not quantify operational or clinical consequences:

- **WSI workflow:** Track focus failures, rejected image regions, cleaning and rescans locally, using defined denominators and reasons. This report supplies no comparative rescan percentages or throughput estimates.
- **Fluorescence and polarization:** Check compatibility with the intended instrument, mounting medium and assay. Short-wavelength losses and birefringence motivate testing; no fluorescence, autofluorescence or diagnostic polarization outcomes were measured.
- **AI:** Blur or contrast changes could affect segmentation or classification. No AI model was evaluated here, so model failures, feature drift and biomarker-score changes remain hypotheses. Validate the intended model on representative preparations before relying on a performance claim.

---

## Practical Laboratory Quality-Control Considerations

These are local validation considerations, not requirements established by this study:

1. **Select materials for the intended system:** Follow microscope/scanner and assay specifications for cover thickness, mounting medium and material compatibility. The report alone does not justify mandatory glass, a low-power-only restriction on film, or a universal prohibition for polarization or fluorescence.
2. **Inspect preparation quality:** Monitor bubbles, inclusions, scratches, cover-medium deformation and cleanliness; record material, batch and preparation conditions. Use approved cleaning methods compatible with the material and instrument.
3. **Compare representative local preparations:** Evaluate focus and fine-detail visibility across relevant tissues and stains. Measure rescan/rejection rates rather than importing unsupported rates, and assess diagnostic or AI outcomes separately when relevant.
4. **Document acceptance criteria:** Define application-specific criteria and investigate failures within the laboratory QA framework ([NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md), [Quality And Standardisation](../laboratory-management/quality-and-standardisation.md)). Procurement restrictions require evidence for the intended workflow beyond this small optical study.

<!-- tolaria:related:start -->

## See also

* [Considerations for digital pathology displays](Considerations%20for%20digital%20pathology%20displays.md)
* [Digital pathology evidence](../computational-digital-and-mathematical-pathology/digital-pathology-evidence.md)
* [Microscopy](../laboratory-management/microscopy.md)
* [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md)
* [Quality And Standardisation](../laboratory-management/quality-and-standardisation.md)
* [Robotic microscopy for everyone: the OpenFlexure Microscope](Robotic%20microscopy%20for%20everyone%20-%20the%20OpenFlexure%20Microscope.md)
* [Standardization in digital pathology: Supplement 145 of the DICOM standards](Standardization%20in%20digital%20pathology%20-%20Supplement%20145%20of%20the%20DICOM%20standards.md)

<!-- tolaria:related:end -->
