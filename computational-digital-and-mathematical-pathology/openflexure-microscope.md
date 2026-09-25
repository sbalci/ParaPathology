---
type: Tool
status: Evergreen
language: en
title: "OpenFlexure Microscope"
aliases:
  - "OpenFlexure Microscope"
  - "openflexure"
  - "OpenFlexure"
  - "openflexure-microscope"
  - "3D-Printed Robotic Microscope"
order: 175
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[Micro-Manager]]"
  - "[[Cytomine]]"
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
  - "[[Telepathology]]"
  - "[[Openmicroscopy]]"
  - "[[Robotic microscopy for everyone: the OpenFlexure Microscope]]"
  - "[[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]"
  - "[[Considerations for digital pathology displays]]"
url: https://openflexure.org/projects/microscope/
repo: https://github.com/rwb27/openflexure_microscope
paper: https://doi.org/10.1364/BOE.385729
source_type: project
external: true
adopted: false
engagement: active
license: CERN-OHL-S / GPL-3.0
last_reviewed: 2026-09-25
---

# OpenFlexure Microscope

An open-source, 3D-printable, laboratory-grade robotic digital microscope designed for automated high-resolution imaging, whole-slide scanning, and telepathology. Conceived and developed by Dr. Richard W. Bowman, Julian Stirling, and colleagues across the University of Bath, the University of Cambridge, and an international open-science consortium, the OpenFlexure project replaces costly, precision-machined mechanical translation stages with a monolithic 3D-printed flexure stage capable of sub-100 nm positioning resolution.

- **Project Website:** [openflexure.org/projects/microscope](https://openflexure.org/projects/microscope/)
- **Documentation & Build Guide:** [openflexure.org/projects/microscope/build](https://openflexure.org/projects/microscope/build)
- **Source Repositories:** [rwb27/openflexure_microscope](https://github.com/rwb27/openflexure_microscope) (GitHub mirror) | [openflexure/openflexure-microscope](https://gitlab.com/openflexure/openflexure-microscope) (GitLab upstream)
- **Software Daemon & API:** [openflexure/openflexure-microscope-server](https://gitlab.com/openflexure/openflexure-microscope-server)
- **Client Application:** [OpenFlexure Connect](https://openflexure.org/projects/microscope/install)
- **Foundational Paper:** Collins JT, Knapper J, Stirling J, MD-Ahmad J, Chagas AM, Beale A, Bowman RW. *Robotic microscopy for everyone: the OpenFlexure Microscope.* Biomedical Optics Express 11(5), 2447–2460 (2020). [DOI: 10.1364/BOE.385729](https://doi.org/10.1364/BOE.385729)
- **Mechanics Genesis Paper:** Sharkey JP, Foo DCW, Kabla A, Baumberg JJ, Bowman RW. *A one-piece 3D printed flexure translation stage for open-source microscopy.* Review of Scientific Instruments 87, 025104 (2016). [DOI: 10.1063/1.4941068](https://doi.org/10.1063/1.4941068)
- **Literature Review Clipping:** [Robotic microscopy for everyone: the OpenFlexure Microscope](../Clippings/Robotic%20microscopy%20for%20everyone%20-%20the%20OpenFlexure%20Microscope.md)

---

## The Challenge: Hardware Accessibility in Digital Pathology & Diagnostics

While computational pathology algorithms ([HoVer-NeXt](hover-next.md), [CellQuant-Net](cellquant-net.md), [NuClick](nuclick.md), and foundation models like [CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](../Clippings/CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md)) have advanced rapidly, their real-world clinical deployment faces a prohibitive physical barrier: **the cost and fragility of automated whole-slide scanners**:

1. **Capital Expenditure Barrier:** Commercial whole-slide scanners (Hamamatsu NanoZoomer, Leica Aperio, 3DHISTECH) cost between **$50,000 and $250,000**, restricting automated digital pathology to well-funded academic medical centers in high-income countries.
2. **Maintenance & Supply-Chain Bottlenecks:** In low- and middle-income countries (LMICs) or decentralized rural field clinics, motorized microscopes with precision ground sliding rails, lead screws, and proprietary optical encoders frequently fail due to dust, humidity, or mechanical wear, remaining unusable for months due to a lack of specialized local technicians.
3. **Friction, Backlash, and Stick-Slip in Cheap Hardware:** Attempting to build budget motorized stages using conventional sliding dovetails or cheap linear ball bearings invariably introduces mechanical backlash, stick-slip friction, and tilt when reversing direction, making repeatable sub-micron autofocus and whole-slide tiling impossible.

The **OpenFlexure Microscope** solves this fundamental engineering challenge by exploiting **compliant mechanisms (flexure hinges)** that can be printed as a single monolithic block on a standard desktop 3D printer for under **$250 in total materials**.

---

## Architectural Blueprint & System Overview

```typescript
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 OPENFLEXURE SYSTEM ARCHITECTURE                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘

 [ Physical Layer: 3D-Printed Hardware & Optics ]
   ├── Monolithic PLA Flexure Stage (XYZ Translation, 12×12×4 mm travel range)
   ├── Actuation: 3× 28BYJ-48 Geared Stepper Motors (1:64 reduction) driving M3 brass screw pairs
   ├── Optics: RMS DIN Finite-Conjugate (4×–100× oil) OR Infinity-Corrected + Achromat Tube Lens
   ├── Sensor: Raspberry Pi Camera Module (HQ Camera 12.3 MP Sony IMX477 / Module 2/3)
   └── Illumination: Transmitted Brightfield LED Condenser OR Epifluorescence Modular Cube
                                   │
                                   ▼
 [ Electronics & Motor Driver: Sangaboard ]
   ├── Microcontroller: ATmega32U4 / RP2040 running custom motor firmware
   ├── Drivers: ULN2003 Darlington Transistor Arrays / Trinamic TMC2209 silent steppers
   └── Interconnect: USB serial / GPIO ribbon connected directly to single-board computer
                                   │
                                   ▼
 [ Embedded Compute Layer: Raspberry Pi (Pi 4 / Pi 5) ]
   ├── OS: Raspberry Pi OS (Debian Linux) with Picamera2 / libcamera native drivers
   └── Daemon: `openflexure-microscope-server` (Python 3, FastAPI / Flask, WebSockets)
         ├── Hardware Abstraction Layer (HAL): Stage step coordinate transformation
         ├── Real-Time Autofocus: Gradient / Laplacian variance sharpness metrics
         ├── Tiled Grid Acquisition: 2D whole-specimen scanning engine with overlap margins
         └── Calibration: Automatic camera-to-stage coordinate axis rotation mapping
                                   │
               ┌───────────────────┴───────────────────┐
               ▼                                       ▼
 [ OpenFlexure Connect GUI ]             [ Programmatic & Pipeline API ]
   • Cross-platform Web/Desktop client     • Python Client (`openflexure-microscope-client`)
   • Stage navigation & autofocus          • [[Micro-Manager]] Device Adapter / Pycro-Manager
   • Live H&E stream inspection            • Automated Tile Stitching (Fiji, BigStitcher, Ashlar)
   • Telepathology remote control          • Downstream Analysis: QuPath, Cytomine, CellQuant-Net
```

---

## Core Engineering Innovations

### 1. The Monolithic Flexure Mechanism
- **Frictionless Motion:** Rather than relying on sliding surfaces, the OpenFlexure stage uses deformable plastic hinges (parallelogram linkages) printed monolithically in polylactic acid (PLA).
- **Sub-100 nm Precision:** Driven by inexpensive 28BYJ-48 stepper motors (costing ~$3 each) coupled to standard M3 stainless steel machine screws and brass captive nuts, the flexure delivers a mechanical positioning resolution of **~50 to 100 nm per half-step**.
- **Zero Backlash and Zero Stick-Slip:** Because the mechanical joints bend elastochemically without sliding contact, motion is completely free of mechanical play or friction stalls, ensuring micro-stepping fidelity under high-magnification immersion lenses ($100\times$, NA 1.25).
- **Thermal & Temporal Stability:** Despite being constructed from thermoplastic PLA, the symmetrical mechanical design demonstrates minimal drift ($<5\ \mu\text{m}$ over multi-hour imaging sessions at constant room temperature).

### 2. Optical Subsystems: Finite Conjugate vs. High-Resolution Infinity
OpenFlexure supports modular, interchangeable optical trains:
- **High-Resolution RMS DIN Optics:** Uses industry-standard RMS-threaded microscope objectives (4× scanning, 10× low power, 40× high dry, 100× oil immersion) mounted into a 160 mm tube-length barrel or coupled to a 50 mm achromatic doublet tube lens for infinity-corrected optics.
- **Sensor Optimization:** Paired with the Raspberry Pi High Quality (HQ) Camera (Sony IMX477 1/2.3" 12.3 MP back-illuminated CMOS, $1.55\ \mu\text{m}$ pixel pitch) or Camera Module 3. In a 40× dry setup, this delivers diffraction-limited resolving power ($\approx 0.6\ \mu\text{m}$ lateral optical resolution), cleanly resolving nuclear chromatin texture, nucleoli, and red blood cell borders.
- **Epifluorescence Capability:** Modular drop-in filter cubes with high-power excitation LEDs (e.g., 450 nm Royal Blue for auramine O or GFP, 365 nm UV for DAPI), dichroic beamsplitters, and emission barrier filters enable fluorescence microscopy for tuberculosis screening and immunofluorescence.

### 3. Sangaboard & Low-Power Field Electronics
- **Open Motor Controller:** The Sangaboard (Stirling et al., *HardwareX* 2020) provides an open-source hardware driver designed specifically for the unipolar 28BYJ-48 stepper motors.
- **Power Efficiency:** Operates entirely from a single 5V USB power supply (drawing $<15\text{ W}$ during active scanning), allowing continuous full-day operation in off-grid field clinics powered by a standard consumer USB power bank or small solar panel.

---

## Software Ecosystem & Automated Scanning

### Embedded REST API & WebSockets
The microscope runs an embedded Linux daemon (`openflexure-microscope-server`) exposing a complete REST API:
- `POST /api/v2/actions/stage/move`: Precise XYZ relative or absolute stepping.
- `POST /api/v2/actions/camera/autofocus`: Automated z-stack sweep evaluating gradient variance sharpness.
- `POST /api/v2/actions/scan/fast_grid_scan`: Automated 2D raster scanning over user-defined bounding boxes.
- `GET /api/v2/streams/mjpeg`: Low-latency live video streaming for real-time telepathology.

### Self-Contained Python Automation Example
Developers can automate whole-slide or multi-ROI acquisition using Python:

```python
import time
import requests
from openflexure_microscope_client import MicroscopeClient

# Connect to OpenFlexure microscope via local network mDNS
microscope = MicroscopeClient("openflexure.local")

print(f"Connected to OpenFlexure Microscope. Position: {microscope.position}")

# 1. Run Automated Fast Autofocus
print("Executing contrast-based autofocus...")
autofocus_task = microscope.autofocus()
print(f"Autofocus complete. Focal Z-plane: {microscope.position['z']}")

# 2. Acquire a 3x3 Tiled Grid Scan with 15% Overlap
grid_size_x = 3
grid_size_y = 3
step_x = 800  # Motor steps per field of view
step_y = 600

captured_tiles = []
origin = microscope.position

print("Initiating tiled ROI acquisition...")
for ix in range(grid_size_x):
    for iy in range(grid_size_y):
        target_x = origin['x'] + (ix * step_x)
        target_y = origin['y'] + (iy * step_y)
        
        # Move stage to grid coordinate
        microscope.move_abs({'x': target_x, 'y': target_y, 'z': origin['z']})
        time.sleep(0.1)  # Allow mechanical vibration settling
        
        # Capture uncompressed high-resolution TIFF tile
        image_name = f"tile_x{ix}_y{iy}.tif"
        tile = microscope.capture_image(filename=image_name, bayer=False)
        captured_tiles.append(image_name)
        print(f"Captured {image_name} at X:{target_x}, Y:{target_y}")

# Return stage to initial position
microscope.move_abs(origin)
print(f"Acquisition complete. {len(captured_tiles)} tiles ready for stitching (e.g. via Ashlar/BigStitcher).")
```

---

## Diagnostic & Pathology Applications

### 1. Automated Malaria & Parasitology Screening in LMICs
In field trials conducted in Bagamoyo and Dar es Salaam, Tanzania (in partnership with the Ifakara Health Institute and STICLab), OpenFlexure microscopes were deployed for automated scanning of Giemsa-stained thick and thin blood smears:
- Overcame diagnostic fatigue associated with manual 100× oil immersion examination of hundreds of fields per patient.
- Paired with lightweight edge neural networks to perform automated identification and counting of *Plasmodium falciparum* trophozoites and ring stages.

### 2. Decentralized Whole-Slide Imaging (DIY WSI)
Commercial WSI scanners rely on continuous line-scan sensors or high-speed piezo stages. OpenFlexure implements a stop-and-stare tile acquisition workflow:
- Automated tile grids are acquired with 10–20% spatial overlap.
- Tiles are stitched into standard pyramidal OME-TIFF files using open-source tools such as **Ashlar** or Fiji’s **BigStitcher**.
- Stitched whole-slide images can be imported directly into [Cytomine](cytomine.md) or **QuPath** for pathologist sign-out, algorithmic cell segmentation ([NuClick](nuclick.md)), and spatial quantitative analysis ([CellQuant-Net](cellquant-net.md)).

### 3. Telepathology & Second-Opinion Triage
In remote primary-care clinics lacking resident pathologists:
- Local technicians mount biopsy or cytology specimens.
- A remote pathologist connects via the web interface or VPN to review live video, navigate the stage in real time, or trigger automated z-stacks over suspicious lesions.
- Directly supports the conceptual framework of [The pathology report as a boundary object: From clinical communication to computational representation](../Clippings/The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md), enabling clinical communication across geographically distributed healthcare sites.

---

## Technical Comparison: OpenFlexure vs. Alternatives

| Feature / Dimension | OpenFlexure Microscope | Traditional Upright Lab Microscope | Commercial Slide Scanner (e.g. Aperio/Hamamatsu) | Foldscope |
| --- | --- | --- | --- | --- |
| **BOM Cost** | **~$200 – $350** | $2,000 – $10,000 | $50,000 – $250,000+ | ~$1 – $5 |
| **Stage Mechanics** | **Monolithic 3D flexure (PLA)** | Precision sliding dovetail / brass rack | Precision linear encoded servo/piezo | Paper origami flexure |
| **Positioning Resolution** | **Sub-100 nm (0.05–0.1 µm)** | Manual (calibrated fine knob) | Sub-50 nm closed loop | Manual thumb friction |
| **Motorization** | **Fully motorized XYZ (3-axis)** | Manual (optional motor upgrade: $5k+) | Fully robotic automated | Purely manual |
| **Whole-Slide Tiling** | **Automated via software script** | Manual or expensive add-on | Dedicated high-throughput engine | No |
| **Local Manufacturing** | **Yes (FDM 3D printer anywhere)** | No (specialized factory optics) | No (proprietary cleanroom) | No (mass injection/die-cut) |
| **Optics** | **Standard RMS DIN 4×–100×** | Standard RMS/UIS2 | Custom telecentric imaging | Single ball lens |
| **Digital Connectivity** | **Native REST API, Web, Linux** | Separate camera attachment | Proprietary enterprise server | Mobile phone camera |
| **Field Portability** | **High (5V USB power bank)** | Heavy benchtop AC mains | Huge fixed benchtop AC mains | Ultra-portable pocket |

---

## Related Notes & Ecosystem Links

- **Microscope Hardware & Automation:** Micro-Manager, [Openmicroscopy](openmicroscopy.md), [Digital Pathology Software](digital-pathology-software.md)
- **Digital Pathology Infrastructure:** [Digital Pathology](digital-pathology.md), [Telepathology](telepathology.md), [Cytomine](cytomine.md), [Considerations for digital pathology displays](../Clippings/Considerations%20for%20digital%20pathology%20displays.md), [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](../Clippings/NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md)
- **Quantitative Image Analysis:** [Image Analysis](image-analysis.md), [NuClick](nuclick.md), [CellQuant-Net](cellquant-net.md), [HoVer-NeXt](hover-next.md), [HistoPLUS: Towards Comprehensive Cellular Characterisation of H&E Slides](../Clippings/HistoPLUS%20-%20Towards%20Comprehensive%20Cellular%20Characterisation%20of%20H%26E%20Slides.md), [CytoFormer: A Molecularly Supervised Cell Foundation Model for Histopathology Cell Classification](../Clippings/CytoFormer%20-%20A%20Molecularly%20Supervised%20Cell%20Foundation%20Model%20for%20Histopathology%20Cell%20Classification.md)
- **Theory & Context:** [The pathology report as a boundary object: From clinical communication to computational representation](../Clippings/The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md), What AI Can and Cannot Do in Pathology

<!-- tolaria:related:start -->

## See also

* [Considerations for digital pathology displays](../Clippings/Considerations%20for%20digital%20pathology%20displays.md)
* [Cytomine](cytomine.md)
* [Digital Pathology](digital-pathology.md)
* [Image Analysis](image-analysis.md)
* [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](../Clippings/NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md)
* [Openmicroscopy](openmicroscopy.md)
* [Robotic microscopy for everyone: the OpenFlexure Microscope](../Clippings/Robotic%20microscopy%20for%20everyone%20-%20the%20OpenFlexure%20Microscope.md)
* [Telepathology](telepathology.md)

<!-- tolaria:related:end -->
