---
type: Tool
status: Evergreen
language: en
title: "HistoCAM"
aliases:
  - "HistoCAM"
  - "histocam"
  - "pathcam"
  - "PathCAM"
order: 180
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[OpenFlexure Microscope]]"
  - "[[Image Analysis]]"
  - "[[Micro-Manager]]"
  - "[[Cytario]]"
  - "[[Cytomine]]"
  - "[[Ambient, real-time digitization and datafication of glass slide microscopy towards AI-at-the-microscope]]"
  - "[[Pathology-CoT: learning visual chain-of-thought agents from expert whole-slide image diagnosis behaviour]]"
  - "[[What AI Can and Cannot Do in Pathology]]"
url: https://github.com/cooopermaira/HistoCAM_Nature_Communications
repo: https://github.com/cooopermaira/HistoCAM_Nature_Communications
paper: https://doi.org/10.1038/s41467-026-77887-1
source_type: repository
external: true
adopted: false
engagement: active
license: Open Source
last_reviewed: 2026-09-27
---

# HistoCAM

An open-source software and hardware platform for **ambient, real-time digitization and datafication of glass-slide microscopy**, designed to bridge conventional optical microscopy and computational pathology without disrupting clinical workflow. Developed by researchers across Tulane University (Departments of Computer Science, Biomedical Engineering, and Pathology) and Kitware, Inc. (Maira et al., *Nature Communications* 2026), HistoCAM captures the pathologist's full optical field-of-view via a high space-bandwidth camera and dynamically streams, composites, and analyzes multi-resolution tissue imagery in real time.

- **GitHub Repository:** [cooopermaira/HistoCAM_Nature_Communications](https://github.com/cooopermaira/HistoCAM_Nature_Communications)
- **Primary Publication:** Maira et al. *Ambient, real-time digitization and datafication of glass slide microscopy towards AI-at-the-microscope.* Nature Communications (2026). [DOI: 10.1038/s41467-026-77887-1](https://doi.org/10.1038/s41467-026-77887-1)
- **Benchmark Data on Zenodo:** [Zenodo Record 21970445](https://zenodo.org/records/21970445)
- **Literature Review Clipping:** [Ambient, real-time digitization and datafication of glass slide microscopy towards AI-at-the-microscope](../Clippings/Ambient,%20real-time%20digitization%20and%20datafication%20of%20glass%20slide%20microscopy%20towards%20AI-at-the-microscope.md)

---

## The Clinical Problem: The Microscope vs Scanner Divide

In modern pathology practice, conventional optical brightfield microscopy remains the dominant diagnostic instrument despite the rise of digital pathology. Commercial whole-slide imaging (WSI) scanners pose formidable barriers:
1. **High Capital Expenditure:** Scanners cost $50,000 to $250,000+, excluding specialized IT infrastructure, high-speed storage arrays, and network bandwidth.
2. **Asynchronous Batch Bottlenecks:** Glass slides must be batched, loaded into racks, calibrated, scanned (taking minutes to hours), quality-checked, and stored before review can even begin.
3. **Loss of Diagnostic Tactile Agility:** Pathologists lose the instantaneous focal depth manipulation (fine focus knob), variable stage speed, and intuitive magnification switching of physical optical microscopy.
4. **The Analysis-Navigation Data Gap:** Standard AI algorithms are trained on static rectangular tiles or pre-scanned gigapixel WSIs. They lack the procedural diagnostic "chain-of-thought"—the search paths, dwell times, and multi-scale contextual reasoning that human experts employ when reading complex slides.

**HistoCAM** eliminates this divide by enabling **AI-at-the-microscope**: digitizing glass slides passively during routine manual review while tracking expert interaction.

---

## Architectural Overview & Software Stack

The internal core engine of HistoCAM is named `pathcam`. It is authored in modern C++ with CMake, integrating high-performance vision, graphics, and networking modules:

```text
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                HISTOCAM / PATHCAM ENGINE                                 │
└──────────────────────────────────────────────────────────────────────────────────────────┘

  [ Optical & Hardware Layer ]
    ├── Clinical Brightfield Microscope (Olympus, Nikon, Leica, Zeiss)
    ├── High Space-Bandwidth Camera: 31 MP Machine Vision Sensor (FLIR Spinnaker SDK)
    └── Calibrated Optical Relay (Preserving Field Number 22–25 without vignetting)
                                    │  Raw Bayer Stream (>30 MP, 10–30 fps)
                                    ▼
  [ Real-Time Ingestion & Odometry ]
    ├── GPU Debayering & Dynamic Flatfield Shading Correction (2X, 4X, 10X, 20X, 40X)
    ├── High-Speed Optical Flow & Translation Tracking
    └── Multi-Resolution Spatial Registration & Pose Estimation
                                    │
         ┌──────────────────────────┴──────────────────────────┐
         ▼                                                     ▼
  [ Dynamic Compositing Engine ]                       [ Behavioral Data Logger ]
    • Hierarchical Tile Pyramid                         • Continuous XY Search Paths
    • Live Eyepiece Viewport Stitching                  • Magnification Turret Shifts
    • Multi-Scale Progressive Sharpening                • Dwell Time Heatmaps
    • Boundary Poly Clipping (Clipper2)                 • Viewport Velocity & Acceleration
         │                                                     │
         └──────────────────────────┬──────────────────────────┘
                                    ▼
  [ Application & AI Inference Layer ]
    ├── GUI Framework: JUCE Audio/Visual & UI Toolkit
    ├── Deep Learning Inference: NVIDIA TensorRT (> 10) / CUDA (or CPU OpenCV Contrib Demo)
    │     ├── Live Interactive Segmentation (Shift + Click Point Prompts)
    │     ├── Real-Time Tumor / Glandular Margin Overlays
    │     └── Automated Feature Calibration & Measurements
    └── Output Formats: Pre-embedded H5, JSON (`prostatectomy.json`), WSI Tiling
```

---

## Key Technical Innovations

### 1. Passive Multi-Resolution Compositing
Rather than enforcing a slow, rigid raster snake-scan over the whole tissue, HistoCAM allows the pathologist to move freely across the slide at any chosen objective (from 2X macro scanning to 40X high-power cytological examination). The `pathcam` engine automatically stitches the live video feed into a unified hierarchical spatial pyramid:
- High-power (20X/40X) passes continuously back-propagate into the lower-magnification pyramid levels, sharpening the overall composite.
- The interface provides instantaneous toggling between objectives (`<c>` key) and coverage highlighting (`<s>` key) to visualize exactly which areas of the glass slide have been sampled.

### 2. Live Interaction Logging ("Process-Aware Datafication")
HistoCAM captures the complete diagnostic trajectory:
- Logs spatial coordinates, translation velocity, and acceleration during tissue exploration.
- Generates dwell-time maps reflecting areas of diagnostic uncertainty or high morphological interest.
- Pairs image regions with corresponding clinical interaction sequences, producing ideal training data for visual chain-of-thought models (such as Pathology-CoT).

### 3. Real-Time TensorRT "AI-at-the-Microscope"
With NVIDIA TensorRT (> 10) on unified memory platforms (such as the NVIDIA Spark DGX), HistoCAM executes real-time semantic segmentation concurrently with manual slide movement:
- Point-prompted segmentation enables pathologists to delineate tumor boundaries or histological structures with a single click.
- Pre-embedded representations allow instantaneous generation of training masks during clinical review without separate post-hoc annotation sessions.

---

## Build Configurations & Deployment

The open-source repository provides two primary operating modes:

### 1. GPU Acceleration (Unified Memory / CUDA)
- **Target Hardware:** Systems with unified memory and high GPU throughput (e.g., NVIDIA DGX Spark, RTX workstations).
- **Dependencies:** OpenCV with CUDA, TensorRT (> 10), FLIR Spinnaker SDK (Linux).
- **Capabilities:** Full-frame 31 MP real-time streaming, live compositing, and real-time TensorRT model inference.

### 2. CPU-Only Demonstration Mode
- **Dependencies:** OpenCV with Contrib modules (built via CMake: `-DOpenCV_DIR=/path/to/opencv/lib/cmake/opencv4`).
- **Operation:** Simulates microscope inputs by reading debayered raw PNG frames from disk via an `input.txt` file.
- **Dataset:** Pre-recorded raw frame batches and calibration files (`2x_cal.Raw`, etc.) available on [Zenodo](https://zenodo.org/records/21970445).

---

## Comparison with Existing Systems

| Dimension | OpenFlexure Microscope | HistoCAM (`pathcam`) | Whole-Slide Scanners |
|---|---|---|---|
| **Form Factor** | Monolithic 3D-printed robotic microscope | Add-on camera + software for clinical scopes | Dedicated standalone benchtop scanner |
| **Stage Control** | Motorized stepper stages (RP2040/Sangaboard) | Manual pathologist stage movement | High-speed motorized XY stage |
| **Workflow Role** | Autonomous low-cost screening / LMIC telepathology | Real-time clinical assistive AI & data capture | High-throughput batch digitization |
| **Digitization Mode** | Automated raster scanning | Ambient, continuous compositing | Automated raster/line scanning |
| **AI Integration** | Post-processing / downstream | Real-time viewport overlay | Server-side batch inference |

---

## Summary Verdict & Vault Relationship

HistoCAM is an essential reference and tool for next-generation digital pathology. It proves that digital pathology does not strictly require replacing the optical microscope with an expensive scanner. Instead, the microscope itself can be converted into an ambient, intelligent, and process-aware digital device.

<!-- tolaria:related:start -->

## See also

* [Ambient, real-time digitization and datafication of glass slide microscopy towards AI-at-the-microscope](../Clippings/Ambient%2C%20real-time%20digitization%20and%20datafication%20of%20glass%20slide%20microscopy%20towards%20AI-at-the-microscope.md)
* [Cytario](cytario.md)
* [Cytomine](cytomine.md)
* [Digital Pathology](digital-pathology.md)
* [Image Analysis](image-analysis.md)
* [OpenFlexure Microscope](openflexure-microscope.md)
* [Pathology-CoT: learning visual chain-of-thought agents from expert whole-slide image diagnosis behaviour](../Clippings/Pathology-CoT%20-%20learning%20visual%20chain-of-thought%20agents%20from%20expert%20whole-slide%20image%20diagnosis%20behaviour%20-%20Nature%20Biomedical%20Engineering.md)

<!-- tolaria:related:end -->
