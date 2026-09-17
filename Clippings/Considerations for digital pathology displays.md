---
type: Clipping
status: Evergreen
language: en
title: "Considerations for digital pathology displays"
source: "https://doi.org/10.1016/j.jpi.2026.100707"
source_type: article
author:
  - "[[David S. Brettle]]"
  - "[[G. A. Matthews]]"
  - "[[H. Pye]]"
  - "[[Darren Treanor]]"
published: 2026-08-07
created: 2026-09-17
description: "A comprehensive examination of the digital pathology display landscape from the National Pathology Imaging Co-operative (NPIC) and Leeds/Linköping teams. Reviews 56 international professional and regulatory guidance documents, evaluates medical vs consumer vs gaming displays, proposes an empirical minimum specification recommendation based on commercial availability (27-inch, 4MP/8MP, 350-500 cd/m², 1000:1 contrast, 120 Hz, ≥100% sRGB), introduces a timeless 3-step procurement methodology (banding, risk assessment, local evaluation), and defines a multi-tiered quality assurance (QA/QC) framework including point-of-use ambient light testing (POUQA) and screen maintenance."
tags:
  - "clippings"
  - "digital-pathology"
  - "displays"
  - "monitors"
  - "quality-assurance"
  - "telepathology"
  - "regulatory"
  - "npic"
order: 150
belongs_to: "[[Clippings]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Telepathology]]"
  - "[[Image Analysis]]"
  - "[[Digital Pathology Software]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
  - "[[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]"
  - "[[Screening efficiency over experience: Rapid target detection in low-power field as a modifiable cognitive biomarker for diagnostic accuracy in digital cytology]]"
  - "[[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]]"
---

# Considerations for digital pathology displays

**Brettle DS, Matthews GA, Pye H, Treanor D.** *Considerations for digital pathology displays.* Journal of Pathology Informatics 23 (2026) 100707. Published online: 7 August 2026. DOI: [10.1016/j.jpi.2026.100707](https://doi.org/10.1016/j.jpi.2026.100707). Open Access (CC BY-NC-ND 4.0).

- **Journal:** *Journal of Pathology Informatics* (Elsevier / Association for Pathology Informatics)
- **Publisher PII:** S2153-3539(26)00167-7
- **Primary Affiliations:** National Pathology Imaging Co-operative (NPIC), Leeds Teaching Hospitals NHS Trust, Leeds, UK; Department of Histopathology, Leeds Teaching Hospitals NHS Trust; Department of Pathology and Data Analytics, University of Leeds, UK; Centre for Medical Image Science and Visualisation, Linköping University, Linköping, Sweden.
- **Local Source Files:** 
  - Main Paper: `"K:\DownloadsK\1-s2.0-S2153353926001677-main.pdf"`
  - Supplementary Material: `"K:\DownloadsK\1-s2.0-S2153353926001677-mmc1.pdf"`

---

## Executive Summary

The display screen is a pivotal, inescapable analog component at the terminus of the digital pathology imaging pipeline. Positioned directly at the interface between the digitized whole-slide image (WSI) and the human visual system, the monitor governs light emission, chromatic fidelity, and spatial resolution. Any degradation or miscalibration at this final step compromises diagnostic accuracy, visual comfort, and clinician confidence.

While diagnostic radiology transitioned to digital workstations in the 1980s under strict regulatory oversight (e.g., FDA Class II devices, AAPM TG18/TG270 standards, DICOM Part 14 Grayscale Standard Display Function [GSDF]), digital pathology has lacked comprehensive, standardized display specifications. Departments globally face conflicting advice: are commercial off-the-shelf (COTS) consumer or gaming displays adequate for clinical sign-out, or are dedicated, expensive medical-grade displays mandatory?

In this landmark review, David Brettle, Darren Treanor, and colleagues from the **National Pathology Imaging Co-operative (NPIC)**:
1. **Analyze 56 Professional & Regulatory Guidance Documents:** Revealing that 39% provide zero display specifications, and only 37% of quality assurance (QA) guidance provides concrete implementation protocols.
2. **Benchmark the Equipment Landscape:** Comparing medical pathology displays (£5,000–£25,000), radiology displays, and high-end gaming monitors (£500–£2,000) across luminance, warranty, price, and automated sensor suites.
3. **Expose Clinical Market Obsolescence:** Demonstrating that of 7 monitor models documented in published real-world clinical pathology deployments, only 1 remains commercially available.
4. **Establish Minimum Recommended Specifications (Table 2):** Providing an evidence-grounded baseline derived from the lower quartile of active pathology displays (27-inch, 4 MP [emerging standard 8 MP], 350 cd/m² [with 500 cd/m² headroom], 1000:1 contrast, 120 Hz refresh rate, ≥100% sRGB).
5. **Formulate a Timeless Three-Step Selection Methodology (Table 3):** Employing equipment banding (A+, A1–A3, B1–B3, C1–C3), departmental risk assessment strategies, and structured local pathologist evaluation with cost-weighting.
6. **Deliver an Actionable QA/QC Protocol (Table 4):** Standardizing pre-purchase verification, routine user checks (screen cleaning, ambient light contrast checks via POUQA, setting audits), and periodic technical photometric calibration.

---

## The Display Dilemma: Radiology vs. Pathology

Pathology cannot simply copy-paste radiology display standards due to fundamental physical, optical, and environmental differences:

| Parameter | Diagnostic Radiology | Digital Pathology |
|---|---|---|
| **Primary Visual Signal** | Greyscale luminance (monochrome) | High-dimensional color (H&E, IHC, special stains, multiplex) |
| **Standard Calibration** | DICOM Part 14 GSDF (Perceptual linearization) | sRGB / Adobe RGB / Display P3; no formal Color Standard Display Function (CSDF) adopted |
| **Ambient Environment** | Controlled, dimly lit darkrooms (low ambient lux) | Brightly lit clinical offices; natural/fluorescent ambient illumination |
| **Microscope Legacy** | Lightboxes with fixed or limited adjustment | Optical microscopes with a continuous light rheostat dial adjusted per specimen/user |
| **Regulatory Precedent** | FDA Class II regulated medical devices for decades | Shifted from rigid closed systems (PSY) to modular software (QKQ) and displays (PZZ) |
| **Market Pace** | Mature, slow product turnover; specialized niche | Rapid consumer display innovations (Mini-LED, OLED, high refresh rate gaming monitors) |

### Regulatory History and the FDA Product Code Evolution

The US FDA initially regulated whole-slide imaging under a rigid, closed "systems-level" approach (Class II, Product Code **PSY**):
- Systems were cleared only as an indivisible triplet: a specific scanner, proprietary software, and a specific display model (e.g., Philips IntelliSite with the Philips PS27QHDCR monitor in DEN160056; Leica Aperio AT2 DX with the Dell MR2416 in K190332).
- **The Obsolescence Trap:** When consumer display manufacturers discontinued a cleared monitor model, WSI vendors were forced to submit new 510(k) updates. Mean time to approval averaged **~200 to 270 days** (Figure 3A–B), paralyzing procurement.
- **The Modern Decoupled Paradigm:** The FDA introduced separate product codes:
  - **QKQ:** Digital pathology image viewing and management software (cleared independently).
  - **PZZ:** Digital pathology display (independent display-only medical device clearances, including the **Barco MDPC-8127** in K203364 and **Shenzhen Beacon C811W/PA27** in K233119).
- **Legal Warning on "Off-Label" Use:** Using non-medical consumer displays for primary human diagnosis constitutes "off-label" medical device use. Legal, regulatory, and clinical liability resides directly with the healthcare institution and employing pathologist.

---

## The Equipment Landscape: Gaming vs. Pathology vs. Radiology

The authors evaluated commercial displays categorized into three functional groups: high-end gaming, pathology-recommended/cleared, and radiology primary diagnostic displays (Figures 4 and 5, Supplementary Figures 2 and 3).

```
+---------------------------------------------------------------------------------------+
|                                DISPLAY LANDSCAPE COMPARISON                           |
+--------------------------+--------------------+-------------------+-------------------+
| Feature                  | High-End Gaming    | Pathology Medical | Radiology Medical |
+--------------------------+--------------------+-------------------+-------------------+
| Price Range              | £500 – £2,000      | £5,000 – £25,000  | £5,000 – £20,000  |
| Warranty Period          | < 3 Years          | 5 Years           | 5 Years           |
| Maximum Luminance        | 400 – 1,000 cd/m²  | 350 – 600 cd/m²   | 1,000 – 2,000+ cd/m²|
| Backlight Stabilization  | Rare (< 5%)        | Common (50%)      | Universal (100%)  |
| Built-in Photometer/QA   | Virtually None     | Common (68%)      | Universal (90%+)  |
| Ambient Light Sensor     | Occasional (20%)   | Common (50%)      | Common (70%)      |
| Color Management         | DCI-P3 / sRGB      | Strict sRGB / ICC | DICOM GSDF        |
+--------------------------+--------------------+-------------------+-------------------+
```

### Key Technical Distinctions
1. **Luminance & Thermal Stability:** While radiology displays push up to 2,000 cd/m² to render subtle bone and soft-tissue optical density differences, pathologists find sustained luminance above 350 cd/m² causes visual glare and asthenopia (eye strain). However, displays must possess headroom (up to 500 cd/m²) so internal feedback circuits can boost drive current as backlights age, preventing gradual dimming.
2. **Integrated Quality Assurance Hardware (Figure 5):**
   - **Front Calibration Sensors:** 68% of pathology medical displays feature an integrated, motorized front sensor to measure and calibrate emission curves automatically. Gaming monitors have 0%.
   - **Backlight Sensors:** 50% of pathology displays monitor internal backlight degradation in real time.
   - **Presence Sensors:** 29% feature proximity sensors that enter low-power sleep when the pathologist steps away, significantly prolonging panel lifespan.
3. **The Rapid Obsolescence of Clinical Deployments:**
   - Examining 34 clinical deployment papers revealed that of the 7 unique display models cited (including Dell MR2416, Philips PS27QHDCR, Dell UP3017), **only 1 model was still commercially available for purchase in June 2025**.

---

## Minimum Recommended Display Specifications

To replace arbitrary rules of thumb, the authors analyzed active commercial displays recommended or cleared for digital pathology, setting the baseline at the **first quartile (Q1)** of currently available hardware, with adjustments based on clinical psychophysics (Table 2, Figure 6):

| Component | Recommended Minimum | Market 1st Quartile | Clinical Rationale & Considerations |
|---|---|---|---|
| **Screen Size** | **≥ 27 inches** | 27 in | Accommodates the WSI viewport alongside navigation thumbnails, clinical case metadata, and annotation toolbars without compromising tissue viewable area. |
| **Spatial Resolution** | **≥ 4 MP** | 4 MP | Minimum 4 MP (e.g., 2560×1440 or 3840×2160). **Emerging consensus:** **8 MP (4K UHD)** is rapidly becoming the new clinical standard to resolve chromatin texture and nucleoli without excessive zoom operations. |
| **Maximum Luminance** | **350 cd/m²** | 500 cd/m² | 350 cd/m² is sufficient for human visual comfort. A 500 cd/m² rated maximum provides necessary headroom so automated circuits can maintain 350 cd/m² over 5 years as LEDs degrade. |
| **Static Contrast Ratio**| **≥ 1000:1** | 1000:1 | Ensures adequate dynamic range between deep hematoxylin nuclear borders and clear slide background. Emerging OLED / Mini-LED panels exceed this substantially. |
| **Refresh Rate** | **≥ 120 Hz** | 60 Hz | While 60 Hz does not compromise diagnostic sensitivity, **120 Hz provides noticeably smoother panning and zooming**, reducing motion judder, visual blur, and operator fatigue during high-volume screening. |
| **Color Gamut** | **≥ 100% sRGB** | 99% sRGB | sRGB is the universal digital pathology standard. Wider gamuts (Display P3, Adobe RGB, Rec. 2020) must have proper OS color profiles (ICC); unmanaged wide gamuts can over-saturate eosin and distort perceived staining. |

---

## Timeless Three-Step Methodology for Display Selection

Because absolute technical specs become obsolete within 3–5 years, NPIC proposes an adaptive, three-step procurement methodology:

```
[ Step 1: Banding & Categorization ]
       │  Stratify all current market displays into functional tiers (A+, A1-A3, B1-B3, C1-C3)
       ▼
[ Step 2: Departmental Risk Assessment ]
       │  Select deployment model: Glass Backup vs Universal Medical vs Needs-Based with Recourse
       ▼
[ Step 3: Local Ergonomic & Clinical Evaluation ]
          Engage local pathologists: Side-by-side microscope comparison + Cost-weighted preference
```

### Step 1: Banding & Categorization (Table 3)
- **Band A+ (Highest End / Aspirational):** Cutting-edge technology (e.g., 8MP–12MP, Mini-LED/OLED, full integrated QA sensor suite). Assigned to research-focused environments and early adopters.
- **Band A (A1, A2, A3 - High End):** Fully certified medical-grade pathology displays with integrated calibration. Assigned to **primary diagnostic reporting**, high-volume sign-out, and difficult/subtle subspecialty biopsies.
- **Band B (B1, B2, B3 - Mid End):** High-specification commercial or entry-level medical displays. Assigned to routine secondary review, gross room stations, or telepathology home reporting (provided recourse to Band A is available).
- **Band C (C1, C2, C3 - Low End):** Standard office displays. **Reference only, educational browsing, or administrative tasks. Explicitly NOT recommended for primary diagnostic sign-out.**

### Step 2: Departmental Risk Assessment Strategies
1. **Strategy 1: Glass Slides Always Available for Verification:** Pathologists sign out digitally but have the physical glass slide on hand. Safe for initial onboarding, but time-consuming, expensive, and eliminates efficiency gains.
2. **Strategy 2: Deploy Highest-Specification Displays Universally:** Equip every workstation with top-tier Band A1/A+ medical displays. Safest and simplest, but financially prohibitive for large NHS trusts and academic centers.
3. **Strategy 3 (Recommended Pragmatic Model): Needs-Based Allocation with High-End Recourse:**
   - Workstations and home-reporting setups are equipped with validated Band B or A2/A3 displays matching specific workload requirements.
   - **Mandatory Safety Valve:** A shared, top-tier Band A1/A+ diagnostic workstation is permanently maintained in the department. Any pathologist encountering subtle atypia, difficult grading, or ambiguous morphology has guaranteed immediate recourse to the high-end calibrated display.

### Step 3: Local Evaluation Protocol
- **Pathologist Preference as Clinical Litmus Test:** Pathologists' subjective confidence correlates strongly with diagnostic efficiency and error prevention.
- **Side-by-Side Microscope Benchmarking:** Evaluate test displays positioned directly adjacent to a calibrated optical microscope, reviewing identical glass slides and WSIs under real department lighting.
- **Cost-Weighting Matrix:** Balance subjective score against acquisition and 5-year maintenance costs (utilizing the Clarke et al. evaluation model).

---

## Display Quality Assurance (QA) and Quality Control (QC) Framework

Maintaining diagnostic safety requires both **Quality Assurance** (proactive process design to prevent defects) and **Quality Control** (detecting and correcting drift).

### Ambient Light and the POUQA Paradigm
Unlike microscopes, where the optical barrel shields the image from ambient illumination, open display panels are directly subject to room reflections, diffuse glare, and pupil constriction.
- **The Point of Use Quality Assurance (POUQA) Tool:** Developed by the Leeds/NPIC team, POUQA is a free web-based psychophysical tool testing whether a reader can discern minimum contrast thresholds under current environmental lighting.
- **Real-World Evidence:** In an audit of **11,719 real-world POUQA tests**, **5.5% (654 tests) failed**, proving that viewing environments frequently degrade contrast discrimination to clinically unsafe levels.

### The Three-Tier QA/QC Protocol (Table 4)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     TIER 1: PRE-PURCHASE & INSTALLATION                         │
│  - Verify panel size (≥27"), resolution (≥4MP/8MP), and 10-bit color depth     │
│  - Lock On-Screen Display (OSD) menu settings (contrast, brightness, gamut)    │
│  - Baseline complete photometric characterization                              │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     TIER 2: USER PERIODIC CHECKS (Daily / Weekly)              │
│  - Screen Cleanliness Check (direct & oblique view while turned off)            │
│  - Ambient Contrast Verification (SMPTE pattern or web-based POUQA test)        │
│  - System Settings Audit (verify OS scaling, refresh rate, ICC color profile)   │
│  - Whole-System Image Verification (review standard test WSI with mitoses)     │
└────────────────────────────────────────┬────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│              TIER 3: FORMAL TECHNICAL TESTING & CALIBRATION (3–12 Months)       │
│  - Independent spectrophotometer / colorimeter recalibration                   │
│  - Maximum luminance & black level measurement (verify 350 cd/m² output)        │
│  - Multi-point panel luminance uniformity check (corner-to-center delta)        │
│  - Dedicated audit logging for remote telepathology workstations               │
└─────────────────────────────────────────────────────────────────────────────────┘
```

#### Screen Cleaning Protocol & The "Triple Tissue Technique"
Dirty screens obscure fine chromatin details and mimic micro-organisms. Commercial alcohol-free display wipes should be standard. If emergency cleaning is needed and approved supplies are absent, the authors advise the **triple tissue technique**:
1. Take three soft paper towels.
2. Lightly moisten towel #1, squeeze out all excess water, and add a minute droplet of domestic dishwashing liquid.
3. Wrap towel #1 inside dry towel #2 to dilute/buffer chemical contact, and wipe the display in gentle circular motions.
4. Immediately buff dry with towel #3. *(Note: Emergency measure only; vendor guidelines take precedence).*

---

## Practical Recommendations for Digital Pathology Deployments

1. **Do Not Rely on Unmonitored Consumer Monitors:** Standard consumer displays lack backlight stabilization circuits and drift significantly in brightness and chromaticity within 12–18 months.
2. **Prioritize 8 MP and 120 Hz in New Procurements:** While 4 MP and 60 Hz represent the historical lower quartile, 8 MP (4K) significantly enhances diagnostic throughput by reducing digital magnification steps, and 120 Hz eliminates motion blur during panning.
3. **Mandate Ambient Light Controls:** Position workstations away from direct window glare; ensure ambient illuminance does not wash out deep hematoxylin contrast.
4. **Implement Formal Remote Reporting Audits:** Home workstations used for telepathology are at highest risk of neglected maintenance and variable room lighting; enforce routine POUQA verification.
5. **Establish Guaranteed High-End Recourse:** Departments utilizing cost-effective Band B displays must provide immediate physical access to a calibrated Band A1 diagnostic workstation for difficult consensus consultations.

---

## Related Vault Notes

- **Primary Disciplines:** [[Digital Pathology]], [[Telepathology]], [[Image Analysis]], [[Digital Pathology Software]]
- **AI & Workflow Integration:** [[What AI Can and Cannot Do in Pathology]], [[Ethical guidelines for deploying artificial intelligence applications in the pathology field: Lessons learned from a prospective framework in a large tertiary care academic medical center]]
- **Cognitive & Diagnostic Performance:** [[Screening efficiency over experience: Rapid target detection in low-power field as a modifiable cognitive biomarker for diagnostic accuracy in digital cytology]], [[When Two Wrongs Don't Make a Right: Examining Confirmation Bias and the Role of Time Pressure During Human-AI Collaboration in Computational Pathology]]
- **Model Evaluation Benchmarks:** [[Navigating foundation model selection in digital pathology through performance evaluation and tradeoff analysis]], [[Towards robust foundation models for digital pathology]]
