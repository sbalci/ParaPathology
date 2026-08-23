---
type: Tool
status: Evergreen
language: en
belongs_to: "[[Digital Pathology]]"
related_to: "[[Image Analysis]]"
url: https://micro-manager.org/
repository: https://github.com/micro-manager/micro-manager
documentation: "https://micro-manager.org/Micro-Manager_User's_Guide"
publish: false
---

# Micro-Manager

Open-source software for **control and automation of microscope hardware** (µManager). It turns a microscope plus its peripherals — camera, motorized XY-Z stage, filter wheels, shutters, light sources — into one integrated, scriptable "appliance" for interactive or fully unattended image acquisition.

- Website: [https://micro-manager.org/](https://micro-manager.org/)
- User's Guide: [https://micro-manager.org/Micro-Manager_User's_Guide](https://micro-manager.org/Micro-Manager_User's_Guide)
- Source: [https://github.com/micro-manager/micro-manager](https://github.com/micro-manager/micro-manager)

## What it does

- **Multi-dimensional acquisition**: time-lapse, multi-channel, z-stacks, multi-position (XY tiling), and any combination — the core workflow for automated scanning.
- **Broad hardware support**: microscopes from all four major manufacturers (Leica, Nikon, Olympus, Zeiss), most scientific-grade cameras, and a long, community-grown list of stages and peripherals via an open device-adapter interface. A Hardware Configuration Wizard builds a config file for your specific setup; a demo mode lets you explore without hardware.
- **ImageJ integration**: the GUI (MMStudio) runs on top of ImageJ, so acquisition and image processing (including Fiji workflows already covered in [Image Analysis](image-analysis.md)) live in one environment.
- **Scripting and APIs**: Beanshell scripting console in the GUI; programmatic control from Java, C++, MATLAB, and Python (the companion Pycro-Manager project exposes the full API to Python) for acquisitions the GUI can't express.
- **Cross-platform and free**: Windows, Mac, and Linux, distributed under an open-source license at no cost — in deliberate contrast to closed vendor acquisition packages that lock you to supported devices.

## Project and ecosystem

Started in the mid-2000s at UCSF (Nico Stuurman and colleagues in Ron Vale's lab); development continues today with an active community — the main repository (Java, ~320 stars) had commits as recently as this week (August 2026). Version 2.0 is the current line; the C++ device layer (MMCore + device adapters) is maintained in the sibling `mmCoreAndDevices` repository, and the main repo holds MMStudio, plugins, and build tooling. Nightly builds are published on the website alongside extensive docs: hardware configuration guide, device list, plugin-writing and device-adapter guides, and video screencasts.

Standard citations: Edelstein et al., *Curr Protoc Mol Biol* 2010 ("Computer control of microscopes using µManager") and Edelstein et al., *J Biol Methods* 2014 ("Advanced methods of microscope control using μManager software").

## Why this matters for pathology

- **DIY whole-slide imaging**: Micro-Manager is the de facto control layer for building low-cost slide scanners — it automates motorized-stage tile scanning (multi-position + z) and hands tiles to ImageJ/Fiji for stitching. Directly relevant to the DIY WSI effort in the research vault.
- **Live remote microscopy / telepathology**: scriptable stage-and-camera control is the foundation for remotely driven microscopes.
- **Reproducible acquisition**: configuration files and scripts document exactly how images were acquired, which matters when image-analysis results (see [Image Analysis](image-analysis.md), [Digital Pathology](digital-pathology.md)) depend on acquisition settings.
- Complements [Openmicroscopy](openmicroscopy.md) (OME): Micro-Manager handles *acquisition*, OME handles *data management* — together they form an open-source pipeline from microscope to archive.
