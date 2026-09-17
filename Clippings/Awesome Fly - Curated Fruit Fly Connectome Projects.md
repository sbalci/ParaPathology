---
type: Clipping
status: Evergreen
language: en
title: "Awesome Fly: Curated Fruit Fly Connectome Projects"
source: "https://github.com/cobanov/awesome-fly"
source_type: repository
author:
  - "[[Mert Cobanov]]"
published: 2026-09-12
created: 2026-09-13
description: "A curated collection of fruit fly (Drosophila melanogaster) connectome projects, covering MaleCNS, FlyWire, brain simulations, embodied models, games, and research tools by Mert Cobanov."
tags:
  - clippings
  - connectomics
  - neuroscience
  - drosophila
  - brain-simulation
  - embodied-ai
  - reinforcement-learning
  - graph-neural-networks
  - malecns
  - flywire
  - open-source
order: 110
belongs_to: "[[Clippings]]"
related_to:
  - "[[GitHub Repositories]]"
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
---

# Awesome Fly: Curated Fruit Fly Connectome Projects

- **Curator & Maintainer:** [Mert Cobanov](https://github.com/cobanov)
- **Repository:** [cobanov/awesome-fly](https://github.com/cobanov/awesome-fly)
- **Starter Template:** [cobanov/fly-connectome-template](https://github.com/cobanov/fly-connectome-template)
- **License:** CC0 1.0 Universal (Linked projects retain their own licenses)
- **Scope:** Connectome-grounded projects across adult *Drosophila melanogaster* datasets (**MaleCNS**, **FlyWire / FAFB**, **BANC**), spanning biological network simulations, embodied biomechanical agents, game controllers, interactive desktop applications, and connectomic analysis libraries.

---

## Conceptual & Scientific Foundations

A **connectome** is an empirical map of anatomical neurons and their synaptic connections derived from serial-section electron microscopy (EM). Transforming a static connectomic graph into an active simulation requires defining physiological rules:
1. **Biological Topology $\neq$ Functional Dynamics:** Wiring diagrams constrain communication pathways, but simulations require explicit assumptions regarding synaptic weights, neurotransmitter sign (excitatory vs. inhibitory), leak conductances, membrane time constants, sensory transduction, and motor readouts.
2. **Key Connectomic Datasets:**
   - **MaleCNS (Janelia / Berg et al. 2026):** Complete adult male central nervous system, spanning both the brain and the ventral nerve cord (VNC), providing seamless brain-to-leg motor pathways.
   - **FlyWire / FAFB (Princeton / Seung & Murthy Labs / Dorkenwald et al. 2024):** Complete adult female brain connectome (~139,000 neurons and tens of millions of synapses).
   - **BANC (Brain and Nerve Cord):** Adult female whole-CNS connectome integrating cephalic and thoracic-abdominal ganglia.
3. **Embodied Simulation (Brain + Body + Physics):** Neural activity alone does not explain behavior. Coupling connectome-constrained controllers to physical engines (e.g., **MuJoCo**) with anatomical biomechanical bodies (**Flybody**, **NeuroMechFly**) enables closed-loop sensorimotor experimentation.

---

## Directory of Highlighted Projects & Toolkits

### 1. Games, Controls & Reinforcement Learning Experiments

| Project | Author / Lab | Mechanics & Biological Substrate | Status / Nature |
| :--- | :--- | :--- | :--- |
| **[Fly Dino](https://github.com/cobanov/flyjump)** | Mert Cobanov | Chromium Dino runner controlled by an 80-neuron MaleCNS circuit with leaky tanh dynamics and a 243-parameter readout trained via Cross-Entropy Method (CEM). [Play](https://flydino.cobanov.dev/) | Circuit subset; open-source benchmark |
| **[Doomfly](https://github.com/nftechie/doomfly)** | nftechie | MaleCNS simulation connected to ViZDoom with modeled visual inputs and fixed button readouts; documents negative validation results for survival. | Research experiment |
| **[FlyDoom](https://github.com/eganeganegan/flydoom)** | eganeganegan | Benchmarks MaleCNS recurrent controllers against rewired random graphs and standard ANNs on ViZDoom tasks. | Control framework |
| **[Fly64](https://github.com/ornata/fly)** | ornata | Connects MaleCNS simulation to Super Mario 64 with a local macOS dashboard. | Playful controller |
| **[Fly Brain Minecraft](https://github.com/blendi-remade/fly-brain-minecraft)** | blendi-remade | Fabric mod driving fly mobs via filtered MaleCNS graphs with live neural HUDs. | Interactive mod |
| **[Flyhard](https://github.com/MarkUnthank/flyhard)** | MarkUnthank | Connects MaleCNS model to CARLA simulator to evaluate steering through simulated limbs. | Bounded steering |
| **[Help the Fly Escape](https://github.com/dzhng/fly-escape)** | dzhng | 3D browser navigation game driven by a Rust/WASM MaleCNS circuit. [Play](https://fly-escape.vercel.app/) | Selected circuit |
| **[Swat](https://github.com/hrook1/Swat)** | hrook1 | Browser game featuring a 6,000-neuron MaleCNS escape circuit influencing movement. | Circuit subset |
| **[FlyPong](https://github.com/jonatasperaza/FlyPong)** | jonatasperaza | Pong paddle controller from MaleCNS subgraph testing dopamine-inspired plasticity. | Negative control |
| **[Connectome Fighter](https://github.com/Unjuno/connectome-fighter)** | Unjuno | MaleCNS controller interfacing FightingICE with explicit sensory-motor mappings. | Research ledger |
| **[Fly Chess Lab](https://github.com/tolatolatop/fly-chess)** | tolatolatop | FlyWire chess experiment with Rust/WASM Leaky Integrate-and-Fire (LIF) simulation. | Untrained readout |
| **[fly-craftax](https://github.com/liuzihe02/fly-craftax)** | liuzihe02 | Connectome simulation connected to Craftax with PPO descending-neuron training. | Research prototype |
| **[FLYFEAR](https://github.com/furkancak1r/flyfear)** | furkancak1r | Godot horror game where MaleCNS simulation drives an adaptive event policy. | Playable prototype |

---

### 2. Desktop Companions, Art & Interactive Worlds

- **[DesktopFly](https://github.com/DenisSergeevitch/desktop-fly)** (DenisSergeevitch): macOS/Electron desktop companion combining FlyWire spiking networks with MaleCNS brain-to-leg motor circuits.
- **[gnat](https://github.com/lubabs770/gnat)** (lubabs770): Linux/Hyprland desktop port of DesktopFly featuring a 668-neuron circuit subset and live stimulation GUI.
- **[DesktopFly for Linux](https://github.com/somsom10/desktop-fly-linux)** (somsom10): Python/GTK3/4 implementation for GNOME on X11/Wayland.
- **[flyverse](https://github.com/tel-0s/flyverse-core)** (tel-0s): Multi-sensory simulation with modeled color vision, olfaction, gustation, and wind mechanosensation.
- **[Infinite Sugar](https://github.com/cnqso/infinite-sugar)** (cnqso): Browser artwork where continuous sweet-sensing input drives neural firing in a terrarium. [Live Demo](https://infinitesugar.cnqso.com/)
- **[FLYBOARD](https://github.com/NullLabTests/flybrain)** (NullLabTests): CPU arcade board for current injection into named MaleCNS populations with live voltage field monitoring.
- **[FLM](https://github.com/nftechie/flm)** (nftechie): Couples a frozen LLM to the MaleCNS graph through an adapter interface.

---

### 3. Brain Models, Neural Simulators & Embodied Physics

- **[Drosophila brain model](https://github.com/philshiu/Drosophila_brain_model)** (Shiu et al. / Seung & Murthy Labs): Landmark whole-brain Leaky Integrate-and-Fire (LIF) model based on FlyWire.
- **[flybody](https://github.com/TuragaLab/flybody)** (TuragaLab / Google DeepMind / HHMI Janelia; *Nature* 2025): Anatomically accurate fruit fly body in MuJoCo with aerodynamic wings, realistic joint limits, and reinforcement learning environments for walking and flight.
- **[FlyGym / NeuroMechFly](https://github.com/NeLy-EPFL/flygym)** (EPFL): Biomechanical simulation framework for embodied sensorimotor control in realistic physical environments.
- **[flyvis](https://github.com/TuragaLab/flyvis)** (TuragaLab; *Nature* 2024): Connectome-constrained deep neural network predicting visual system responses and optic flow processing.
- **[AxonWeave](https://github.com/dhakalnirajan/axonweave)**: Python framework exposing MaleCNS as a sparse, differentiable substrate for NumPy, PyTorch, and TensorFlow.
- **[FastFly](https://github.com/eonfathom/FastFly)**: High-performance CUDA/CuPy GPU simulator running the FlyWire v783 graph at real-time or faster speeds.
- **[webgpu-fly](https://github.com/abgnydn/webgpu-fly)**: Browser-based WebGPU/WASM simulator joining FlyWire cephalic circuits, MANC nerve cord data, and Flybody meshes. [Demo](https://webgpu-fly.pages.dev/)

---

### 4. Connectomic Analysis Toolkits, Registries & Explorers

- **[Codex](https://github.com/murthylab/codex)** (Murthy Lab): Frontend and backend powering the [FlyWire Connectome Data Explorer](https://codex.flywire.ai/).
- **[FlyBrainLab](https://github.com/FlyBrainLab/FlyBrainLab)**: Interactive 3D computing environment for constructing, analyzing, and executing Drosophila neural circuits.
- **[NAVis](https://github.com/navis-org/navis) & [fafbseg](https://github.com/navis-org/fafbseg-py)**: Core Python ecosystem for 3D neuron skeletonization, morphology analysis, coordinate transforms, and mesh manipulation.
- **[connectome-interpreter](https://github.com/YijieYin/connectome_interpreter)**: High-performance path-tracing, effective connectivity, and differentiable graph manipulation library.
- **[natverse](https://github.com/natverse)** (Cambridge Fly Connectomics / Jefferis Lab): Premier R suite for neuroanatomy and connectomics (`malecns`, `coconatfly`, `fafbseg`, `neuprintr`, `bancr`).
- **[CAVEclient](https://github.com/CAVEconnectome/CAVEclient)**: Programmatic interface for the Connectome Annotation Versioning Engine.

---

### 5. Developer Starter Kit: Fly Connectome Template

Mert Cobanov provides a ready-to-build scaffolding template:
- **[fly-connectome-template](https://github.com/cobanov/fly-connectome-template)**:
  - **Soma Atlas:** Prepared 3D spatial coordinates from MaleCNS.
  - **Body Mesh:** Anatomically scaled Flybody 3D asset pipeline.
  - **Interface:** React + Three.js interactive workbench for visualizing neural activation and body articulation.
  - **Decoupled Architecture:** Cleanly separates neural model execution from rendering, providing a standardized I/O format for custom neural networks or spiking models.

---

## Relevance to Computational Pathology & Spatial Biology

While connectomics operates on neuronal synapses rather than human tissue specimens, the computational methodologies directly cross-pollinate with digital pathology:
1. **Spatial Graphs & Cell Topologies:** Connectomic path-finding, motif discovery, and co-clustering (as seen in `cocoa` and `connectome-interpreter`) share identical mathematical foundations with spatial cell-interaction graphs in cancer immunology (e.g., [[Tumor budding T-cell graphs for pT1 colorectal cancer]]).
2. **Multi-Resolution Registration:** Aligning EM volumes, confocal stacks, and light microscopy in neuroanatomy leverages the same non-rigid deformation and transform engines used in cross-stain histology registration ([[Cross-Stain Registration]], [[From Samples to Knowledge 2025: QuPath Training Course]]).
3. **Biological Inductive Biases:** Benchmarking connectome-constrained sparse architectures against unconstrained artificial neural networks (e.g., in `flyvis` and `FlyDoom`) mirrors computational pathology efforts to incorporate tissue architecture priors rather than treating histology as unconstrained generic natural image patches.
