---
type: Clipping
status: Evergreen
language: en
title: "Robotic microscopy for everyone: the OpenFlexure Microscope"
source: "https://openflexure.org/projects/microscope/"
source_type: paper
author:
  - "[[Joel T. Collins]]"
  - "[[Joe Knapper]]"
  - "[[Julian Stirling]]"
  - "[[Jeremy MD-Ahmad]]"
  - "[[André Maia Chagas]]"
  - "[[Andrew Beale]]"
  - "[[Richard W. Bowman]]"
published: 2020-04-24
created: 2026-09-25
description: "A comprehensive synthesis of the OpenFlexure Microscope platform and foundational research papers in Biomedical Optics Express (Collins et al., 2020) and Review of Scientific Instruments (Sharkey et al., 2016). Covers the physics and mechanics of the 3D-printed monolithic flexure translation stage with sub-100nm positioning resolution, modular RMS DIN finite-conjugate and infinity optics, Sangaboard motor control, Python REST API, automated tiled scanning, and validated applications in automated parasitology (malaria screening in Tanzania), low-cost digital pathology, and telepathology."
tags:
  - "clippings"
  - "open-hardware"
  - "microscopy"
  - "digital-pathology"
  - "telepathology"
  - "whole-slide-imaging"
  - "3d-printing"
  - "open-source"
order: 155
belongs_to: "[[Clippings]]"
related_to:
  - "[[OpenFlexure Microscope]]"
  - "[[Micro-Manager]]"
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Telepathology]]"
  - "[[Cytomine]]"
  - "[[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]"
  - "[[Considerations for digital pathology displays]]"
  - "[[The pathology report as a boundary object: From clinical communication to computational representation]]"
---

# Robotic microscopy for everyone: the OpenFlexure Microscope

**The OpenFlexure Project** (University of Bath, University of Cambridge, STICLab Tanzania, Bongo Tech & Research Labs)  
Platform: [openflexure.org](https://openflexure.org) | GitLab: [openflexure/openflexure-microscope](https://gitlab.com/openflexure/openflexure-microscope) | GitHub: [rwb27/openflexure_microscope](https://github.com/rwb27/openflexure_microscope)  
Foundational Publications:
- *Robotic microscopy for everyone: the OpenFlexure Microscope.* Collins JT, Knapper J, Stirling J, MD-Ahmad J, Chagas AM, Beale A, Bowman RW. **Biomedical Optics Express** 11(5), 2447–2460 (24 April 2020). [DOI: 10.1364/BOE.385729](https://doi.org/10.1364/BOE.385729); PMCID: [PMC7249964](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7249964/)
- *A one-piece 3D printed flexure translation stage for open-source microscopy.* Sharkey JP, Foo DCW, Kabla A, Baumberg JJ, Bowman RW. **Review of Scientific Instruments** 87, 025104 (2016). [DOI: 10.1063/1.4941068](https://doi.org/10.1063/1.4941068)
- *Sangaboard v0.4: low-cost automated microscope motor controller.* Stirling J, Collins JT, Bowman RW. **HardwareX** 8, e00110 (2020). [DOI: 10.1016/j.hardware.2020.e00110](https://doi.org/10.1016/j.hardware.2020.e00110)

---

## Executive Summary

Microscopy is the cornerstone of clinical diagnostic pathology, parasitology, hematology, and microbiological screening. Over the past decade, high-throughput digital imaging and artificial intelligence have demonstrated immense potential to standardize diagnostic evaluation. However, the physical reality of global healthcare delivery reveals a stark divide:

1. **The Capital Barrier:** High-end robotic microscopes and whole-slide imaging (WSI) scanners cost from **$50,000 to over $250,000**, concentrating digital pathology almost exclusively in elite tertiary hospitals and academic centers.
2. **The Fragility & Maintenance Bottleneck:** Conventional motorized stages rely on ground dovetail ways, recirculating ball bearings, and precision-machined lead screws. In low- and middle-income countries (LMICs) and remote settings, dust accumulation, high humidity, and lack of manufacturer maintenance contracts result in catastrophic device abandonment.
3. **The Manual Screening Crisis:** In malaria-endemic regions, technicians manually inspect dozens to hundreds of Giemsa-stained blood smears per day under 100× oil immersion, resulting in severe cognitive fatigue, high inter-observer discordance, and delayed clinical turnaround.

The **OpenFlexure Microscope** provides a radical, peer-reviewed engineering solution. By redesigning the microscope translation mechanism from first principles around **compliant 3D-printed flexure mechanics**, the platform delivers **automated 3-axis sub-100 nm robotic positioning** on hardware that can be manufactured on standard desktop 3D printers anywhere in the world for **~$200–$350 in total components**.

---

## Mechanical Physics: The Compliant Flexure Breakthrough

```typescript
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               FLEXURE HINGE VS. SLIDING BEARING                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

 A. CONVENTIONAL SLIDING STAGE (Dovetail / Linear Rail):
    [ Stage Body ] ───► Sliding Friction / Surface Imperfections ◄─── [ Base Guide ]
    • Microscopic stick-slip causes jerky, discontinuous motion at sub-micron scales.
    • Requires lubricant (attracts dust and grit in field environments).
    • Mechanical play creates backlash when reversing direction during autofocus sweeps.

 B. MONOLITHIC COMPLIANT FLEXURE STAGE (OpenFlexure):
    ┌────────────────────── Stage Platform (Specimen Holder) ──────────────────────┐
    │                                                                             │
    ├─── [ Deformable Thin Plastic Hinge (0.4–0.8 mm PLA) ] ──────────────────────┤
    │                                                                             │
    └─── Fixed Base Anchor (Bolted to rigid footplate) ───────────────────────────┘
    • Pure elastic deformation (bending of molecular polymer chains).
    • Zero sliding friction, zero stick-slip, zero lubrication required.
    • Zero mechanical backlash: reversing motor motion instantly reverses stage deflection.
    • True sub-100 nm repeatable stepping with commodity M3 screws and cheap steppers.
```

### The Mathematics of Flexure Motion
In classical mechanics, sliding bearings require clearance tolerances that inevitably allow unwanted tilt, yaw, and play. OpenFlexure implements a **four-bar parallelogram flexure mechanism** for each Cartesian axis:
- The effective spring constant $k$ and restoring force are governed by beam theory:
  $$k \approx \frac{E \cdot w \cdot t^3}{L^3}$$
  where $E$ is the Young's modulus of standard PLA filament ($\approx 3.5\ \text{GPa}$), $w$ is the hinge width, $t$ is the hinge thickness ($0.4\text{--}0.8\ \text{mm}$, corresponding to 1–2 nozzle perimeters), and $L$ is the flexible hinge length.
- **Sub-100 nm Positioning:** The stage is driven by 28BYJ-48 unipolar stepper motors featuring an internal 1:64 reduction gearbox. Driving a standard metric M3 screw (thread pitch $p = 0.5\ \text{mm/rev}$) through captive brass nuts yields:
  $$\Delta z = \frac{0.5\ \text{mm}}{2048\ \text{steps/rev}} \approx 0.244\ \mu\text{m/step} \quad (\approx 50\text{--}100\ \text{nm with half-stepping / microstepping})$$
- **Absence of Stick-Slip:** Because no surfaces slide against each other, the stage exhibits zero static friction threshold ($F_s = 0$), allowing tiny single-step micro-movements without the "jump" typical of low-cost mechanical stages.

---

## Optical Design & Modular Subsystems

OpenFlexure decouples the mechanical stage from the optical train, supporting two primary configurations:

### 1. High-Resolution RMS Finite/Infinity Optics
- **Objective Compatibility:** Standard Royal Microscopical Society (RMS) thread allows mounting of any standard DIN or JIS objective (4× scanning, 10× low power, 40× dry, 100× oil immersion).
- **Tube Length Configuration:** 
  - *Finite conjugate:* Uses standard 160 mm mechanical tube length, focusing directly onto the bare sensor of the Raspberry Pi Camera.
  - *Infinity-corrected:* Incorporates a miniature 50 mm focal length achromatic doublet tube lens inside the optics tube, eliminating spherical aberration and chromatic fringing.
- **Sensor Pairing:** Coupled to the 12.3-megapixel **Raspberry Pi High Quality (HQ) Camera** (Sony IMX477, $1.55\ \mu\text{m} \times 1.55\ \mu\text{m}$ pixel pitch, 1/2.3" format). At 40× ($NA = 0.65$), the effective pixel size in sample space is:
  $$p_{\text{sample}} = \frac{1.55\ \mu\text{m}}{40} \approx 0.0388\ \mu\text{m/pixel}$$
  This easily satisfies the Nyquist-Shannon sampling theorem for the diffraction limit ($\lambda / 2NA \approx 0.5\ \mu\text{m} / 1.30 \approx 0.38\ \mu\text{m}$), ensuring pristine digital resolution of fine nuclear chromatin details, bacteria, and intracellular malaria merozoites.

### 2. Epifluorescence Module
- A modular drop-in filter block positions an excitation LED (e.g., 450 nm Royal Blue for GFP/Auramine O, or 365 nm UV for DAPI), a dichroic beam-splitter mirror, and an emission barrier filter directly below the objective.
- Validated for fluorescence diagnosis of **tuberculosis** (*Mycobacterium tuberculosis* sputum smears stained with Auramine O), offering high diagnostic sensitivity compared to conventional brightfield Ziehl-Neelsen staining.

---

## Electronics & Software Architecture

### The Sangaboard Motor Driver
- Custom open-source hardware board (Stirling et al., *HardwareX* 2020) equipped with an ATmega32U4 / RP2040 microcontroller and ULN2003 Darlington array drivers or Trinamic TMC2209 silent stepper drivers.
- Interfaces via USB or direct GPIO header to the Raspberry Pi.
- Entire system draws $<15\text{ W}$, allowing continuous field operation from a standard $10,000\text{ mAh}$ USB battery bank.

### Embedded Server & Python REST API
The Raspberry Pi runs `openflexure-microscope-server`:
- **Hardware Abstraction Layer (HAL):** Translates physical motor step counts into real-world Cartesian coordinates ($\mu\text{m}$), accounting for motor orientation and calibration matrices.
- **Contrast-Based Real-Time Autofocus:** Evaluates the variance of the Laplacian or Sobel gradient operator across rapid z-axis focal sweeps:
  $$S(z) = \frac{1}{N} \sum_{x, y} (\nabla^2 I_z(x, y) - \bar{I}_z)^2$$
  Performs quadratic peak fitting around the maximum variance point to lock focus in $<2$ seconds.
- **Fast 2D Grid Scanning:** Exposes automated tiling routines with programmable overlap (10% to 20%), automating the acquisition of contiguous fields of view across whole glass slides.

---

## Field Validation & Clinical Applications

### 1. In-Field Automated Malaria Diagnostics (Tanzania)
In clinical trials conducted with the **Ifakara Health Institute (IHI)** and **STICLab** in Bagamoyo and Dar es Salaam, Tanzania:
- OpenFlexure microscopes were manufactured locally on Prusa 3D printers using locally sourced PLA.
- Deployed to capture 100× oil immersion tile sets from Giemsa-stained blood smears.
- Automated stage scanning and autofocus eliminated technician fatigue, with edge AI classification models successfully detecting *Plasmodium falciparum* parasites at densities matching expert human reference microscopy.

### 2. Low-Cost Whole-Slide Imaging (DIY WSI) & QuPath Pipeline
Commercial WSI scanners cost hundreds of thousands of dollars. OpenFlexure provides a practical, open-source pipeline for digital pathology scanning:

$$\text{OpenFlexure Automated Grid Scan} \longrightarrow \text{Raw Tiles (.tif)} \longrightarrow \text{Stitching via Ashlar / BigStitcher} \longrightarrow \text{Pyramidal OME-TIFF} \longrightarrow \text{QuPath / Cytomine}$$

- **Tile Stitching:** Raw acquired tiles are registered using phase correlation and stitched into gigapixel pyramidal OME-TIFF images.
- **Downstream Analysis:** Stitched slides can be analyzed directly in **QuPath** for tumor grading, or processed by advanced computational models such as [[CellQuant-Net]], [[NuClick]], or [[HoVer-NeXt]] for cellular segmentation.

### 3. Remote Telepathology & Consultation
- In rural clinics where no pathologist is physically present, local staff prepare specimens and mount the glass slide.
- Remote pathologists log in via **OpenFlexure Connect** over a local network or encrypted WebRTC/VPN tunnel.
- The pathologist controls magnification, stage position, and fine focus in real time, viewing live uncompressed video streams to render immediate intraoperative or diagnostic second opinions.

---

## Comparative Matrix: OpenFlexure vs. Commercial Scanners & Alternatives

| Feature / Metric | OpenFlexure Microscope | Commercial WSI Scanner (e.g., Leica Aperio / Hamamatsu) | Standard Clinical Light Microscope | Low-Cost Smartphone Adapter |
| --- | --- | --- | --- | --- |
| **Approximate Cost** | **$200 – $350** | $50,000 – $250,000+ | $3,000 – $12,000 | $10 – $50 |
| **Mechanical System** | **3D-printed flexure stage** | Precision ground rails / piezo | Mechanical rack-and-pinion | Manual stage of host scope |
| **Positioning Resolution** | **Sub-100 nm (0.05–0.1 µm)** | Sub-50 nm closed loop | Manual fine knob (~1–2 µm) | Manual |
| **Motorized Axes** | **XYZ (3-axis motorized)** | Fully automated XYZ + loader | Manual (optional motor: +$5k) | None |
| **Backlash / Stick-Slip** | **Virtually Zero (elastic)** | Compensated via linear encoders | Significant at sub-micron | Severe |
| **Automated Scanning** | **Yes (software grid scan)** | Yes (continuous line/time delay) | No (manual) | No |
| **Optics** | **Interchangeable RMS DIN** | Custom high-NA telecentric | Standard clinical objectives | Uses scope optics |
| **Local Manufacturability** | **100% locally printable** | 0% (factory cleanroom only) | 0% (mass factory production) | 3D printed clamp only |
| **Power Consumption** | **<15 W (5V USB bank)** | 300–800 W (Dedicated mains) | 20–50 W (Bulb/LED mains) | Battery of phone |

---

## Related Notes & Vault Cross-References

- **Open Hardware & Microscope Automation:** [[OpenFlexure Microscope]], [[Micro-Manager]], [[Openmicroscopy]]
- **Digital Pathology & Clinical Infrastructure:** [[Digital Pathology]], [[Telepathology]], [[Cytomine]], [[Considerations for digital pathology displays]], [[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]
- **Cellular & Nuclear Image Analysis:** [[Image Analysis]], [[NuClick]], [[CellQuant-Net]], [[CellPrior-Net: Prior-Guided Nuclei Detection and Classification for H&E Whole-Slide Images]], [[HoVer-NeXt]], [[HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides]]
- **Theory & Socio-Technical Dimensions:** [[The pathology report as a boundary object: From clinical communication to computational representation]], [[What AI Can and Cannot Do in Pathology]]
