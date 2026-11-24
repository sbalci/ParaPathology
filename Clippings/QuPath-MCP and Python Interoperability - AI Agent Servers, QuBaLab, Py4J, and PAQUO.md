---
type: Clipping
status: Evergreen
language: en
title: "QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO"
source: "https://forum.image.sc/t/try-qupath-mcp-a-qupath-extension-that-lets-ai-agents-work-in-qupath/122987"
source_type: documentation
author:
  - "[[Peter Bankhead]]"
  - "[[Curtis Rueden]]"
published: 2026-10-20
created: 2026-10-30
description: "Comparative technical review of QuPath's external interoperability ecosystem across two paradigms: Python–QuPath bridges (QuBaLab, qupath-extension-py4j, and Bayer's PAQUO) and Model Context Protocol (MCP) servers for AI agents (00JackLu/qupath-mcp, earthmover-support/qupath-mcp, and upstream architectural discussion in qupath/qupath#2159)."
tags:
  - clippings
  - qupath
  - model-context-protocol
  - ai-agents
  - python
  - digital-pathology
  - reproducibility
  - bioimage-analysis
order: 71
belongs_to: "[[Clippings]]"
related_to:
  - "[[QuPath Python and MCP Ecosystem]]"
  - "[[Digital Pathology Software]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
  - "[[From Samples to Knowledge 2025: QuPath Training Course]]"
  - "[[Solving Unpopular Problems: The QuPath Story]]"
  - "[[Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images]]"
  - "[[GitHub Repositories]]"
hidden: true
---

# QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO

**Comparative Technical & Architectural Review of QuPath's Python Bridges and Model Context Protocol (MCP) Extensions**

### Reviewed Sources & Repositories
1. **Image.sc Forum Announcement (`00JackLu`):** [Try QuPath-MCP: a QuPath extension that lets AI agents work in QuPath](https://forum.image.sc/t/try-qupath-mcp-a-qupath-extension-that-lets-ai-agents-work-in-qupath/122987)
2. **`00JackLu/qupath-mcp` Repository & Docs:** [github.com/00JackLu/qupath-mcp](https://github.com/00JackLu/qupath-mcp) | [00jacklu.github.io/qupath-mcp](https://00jacklu.github.io/qupath-mcp/) | [Zenodo DOI: 10.5281/zenodo.23788878](https://doi.org/10.5281/zenodo.23788878)
3. **`earthmover-support/qupath-mcp` Repository & Docs:** [github.com/earthmover-support/qupath-mcp](https://github.com/earthmover-support/qupath-mcp) | [earthmover-support.github.io/qupath-mcp](https://earthmover-support.github.io/qupath-mcp/)
4. **Upstream QuPath Issue #2159:** [is it posssible to add a MCP server function · Issue #2159 · qupath/qupath](https://github.com/qupath/qupath/issues/2159#issuecomment-6280318076)
5. **QuBaLab Documentation & Repository:** [Opening images — QuBaLab 0.0.1 documentation](https://qupath.github.io/qubalab-docs/notebooks_files/opening_images.html) | [github.com/qupath/qubalab](https://github.com/qupath/qubalab)
6. **QuPath Py4J Extension:** [github.com/qupath/qupath-extension-py4j](https://github.com/qupath/qupath-extension-py4j)
7. **PAQUO Documentation & Repository:** [Welcome to PAQUO — paquo 0.8.2 documentation](https://paquo.readthedocs.io/en/latest/) | [github.com/Bayer-Group/paquo](https://github.com/Bayer-Group/paquo)

- **Companion Tool Reference Note:** [QuPath Python and MCP Ecosystem](../computational-digital-and-mathematical-pathology/qupath-python-and-mcp.md)

---

## 1. Synthesis: Why QuPath Interoperability Split into Two Paradigms

As computational pathology workflows increasingly combine interactive whole-slide inspection in **QuPath** with external Python machine learning libraries (`PyTorch`, `Scanpy`, `Squidpy`, `Dask`) and large language model (LLM) coding agents, two distinct interoperability paradigms have emerged:

1. **Programmatic Python Bridges (`QuBaLab`, `qupath-extension-py4j`, `PAQUO`):** Designed for bioimage analysts and data scientists who want deterministic access to QuPath's `.qpproj` projects, `PathObject` hierarchies (`Shapely` geometries), and multi-resolution pixel pyramids (`NumPy` / `Dask` arrays) from Jupyter notebooks or headless Python scripts.
2. **Model Context Protocol (MCP) Agent Extensions (`00JackLu/qupath-mcp`, `earthmover-support/qupath-mcp`):** Designed for multimodal LLM agents (Claude Code, Claude Desktop, Codex, Cursor) to inspect live viewer/project state, manipulate annotations or JavaFX dialogs, execute cell detection and Groovy scripts, and record auditable session provenance.

---

## 2. Upstream Maintainer Perspective (`qupath/qupath#2159`)

In [Issue #2159](https://github.com/qupath/qupath/issues/2159), user `wolverinelei` proposed integrating a native MCP server into QuPath so AI agents could orchestrate end-to-end pathology analysis across QuPath and external statistical packages.

- **Roadmap Prioritization (Peter Bankhead, July 18, 2026):** Bankhead clarified that the core team at the University of Edinburgh is focused on stabilizing and completing **QuPath v1.0** before beginning architectural work on **QuPath v2.0** (with current grant funding ending in 1–2 years). While native MCP/agent integration is a candidate for evaluation in the v2.0 cycle, Bankhead noted that current external communication is served by `qupath-extension-py4j` + `QuBaLab` (an early Python prototype by the QuPath team) and Bayer's independent `PAQUO` library, and encouraged third-party extensions in the interim.
- **Skepticism Toward Black-Box LLM Scripting (Alan O'Callaghan, July 20, 2026):** Core developer Alan O'Callaghan noted that he was *"not highly motivated by the idea of people using AI assistants with QuPath,"* reflecting a broader bioimage informatics concern: when an LLM drives scientific software solely by generating ad-hoc scripts, it acts without inspecting current state, misses silent plugin failures, and produces non-reproducible one-off transcripts.
- **Community Resolution (October 2026):** Rather than modifying QuPath core prior to v1.0, two community extensions—`00JackLu/qupath-mcp` and `earthmover-support/qupath-mcp` (shared by Curtis Rueden in [`#issuecomment-6280318076`](https://github.com/qupath/qupath/issues/2159#issuecomment-6280318076))—implemented embedded MCP servers directly as QuPath 0.7+ extensions.

---

## 3. Deep Dive: The Two QuPath-MCP Extensions

### A. `00JackLu/qupath-mcp` — State-Aware Scientific Grounding & Model-Free Replay

The applications note and architecture of **`00JackLu/qupath-mcp`** directly confront the scientific reproducibility critique of LLM-driven bioimage analysis. Instead of exposing a thin "run-a-Groovy-script" wrapper, it shifts the locus of correctness from the stochastic model to a typed, state-aware interface:

1. **Zero-Dependency In-Process HTTP Server (`127.0.0.1:9527/mcp`):** Built strictly on `java.base` (`java.net.ServerSocket`) so it runs inside QuPath's bundled JRE without external JDK modules.
2. **Inspect-Before-Act via 34 Typed Tools:**
   - **Image/Viewer (5):** `qupath_get_image_info`, `qupath_get_image_metadata`, `qupath_read_region`, `qupath_get_viewer_state`, and `qupath_capture_view` (opt-in rendered viewport snapshot bounded to `1024 px` / `350 KB` by default).
   - **Objects/Annotations (11):** `qupath_list_objects`, `qupath_get_object_details`, `qupath_get_selection_info`, `qupath_get_annotation_summary`, `qupath_get_detection_summary`, `qupath_select_annotation`, `qupath_create_annotation`, `qupath_update_annotation_class`, `qupath_delete_objects`, `qupath_import_geojson`, `qupath_export_geojson`.
   - **Detection/Measurement (3):** `qupath_run_cell_detection` (`WatershedCellDetection`), `qupath_measure_annotations`, `qupath_export_measurements`.
   - **Scripts (3):** `qupath_validate_groovy_script` (compile-checks syntax without execution), `qupath_run_script` (captures `errorType`, `causeChain`, `rootCause`, `stackTrace`, and surfaces swallowed `runPlugin` warnings in `logs`), `qupath_list_scripts`.
   - **Project (4):** `qupath_get_project_info`, `qupath_list_images`, `qupath_open_image`, `qupath_save_data`.
   - **Plugins & Provenance (8):** `qupath_list_plugins`, `qupath_run_plugin`, `qupath_get_workflow`, `qupath_save_workflow`, `qupath_export_workflow_json`, `qupath_replay_workflow`, `qupath_start_workflow_recording`, `qupath_stop_workflow_recording`.
3. **Side-Effect Semantics & Per-Capability Kill-Switches:**
   - Every tool carries a machine-readable side-effect hint (`read-only`, `write`, `destructive`).
   - Administrators or users can toggle `enableScripts`, `enablePlugins`, `enableFileAccess`, and `enableCaptureView` independently—allowing an agent to operate in a strictly read-only audit mode.
4. **Deterministic, Model-Free Workflow Replay (`qupath_replay_workflow`):**
   - Brackets an agent session (`start`/`stop_workflow_recording`), exports a structured JSON provenance artifact and dated `.groovy` script in `qupath_workflow/`, and replays the saved workflow directly in QuPath **with no LLM in the loop**, verifying object counts before and after execution.
   - **Benchmark Evidence:** Across a 27-task benchmark on QuPath's 8-channel `LuCa-7color` multiplex immunofluorescence slide, Claude Opus 4.8 completed 26/26 executable tasks (1.6 mean tool calls/task), verifying monotonic DAPI cell counts (5,266 cells at intensity threshold 1.0 vs. 4,769 at 2.0), exporting a $5266 \times 134$ measurement table, and reproducing the exact 1 annotation and 5,266 detections from a cleared state via `qupath_replay_workflow`.

---

### B. `earthmover-support/qupath-mcp` — Non-Blocking JavaFX GUI Automation & Visual Telemetry

Developed by **`earthmover-support`**, this extension (`127.0.0.1:51515/mcp`) is engineered to let an AI agent drive QuPath's **actual graphical user interface** alongside Groovy scripting—solving the classic JavaFX automation hazard where opening a modal dialog blocks the calling thread and deadlocks the driver.

1. **Non-Blocking Action Dispatch (`Action Result`):**
   - GUI tools (`qupath_menu`, `qupath_click`, `qupath_select`, `qupath_set`, `qupath_key`, `qupath_close`, `qupath_open`) fire asynchronously on the FX thread, wait ~1 second, and return the **action result**: the action taken, all open windows (`title — WxH (focused)`), and a structured control outline of any newly opened window.
   - Controls are indexed with `#n` tags (e.g., `#3 NumericField "Number of parallel threads" = "8"`, `#5 TextField "Sigma" = "1.5"`), collapsible `TitledPane` containers are explicitly flagged (`[collapsed]`), and `TableView` / `TreeView` controls support paged inspection (`qupath_describe`) and full-table asynchronous waiting (`qupath_wait`).
2. **Human-Visible Co-Piloting (`Mark`, `Paced`, and `Off` Modes):**
   - **Mark Mode ( default):** Draws an on-screen ring around clicked/edited controls, a crosshair where the viewer moves, a keycap for key presses, a client badge (*"Claude Code is driving"*), and a lower-right HUD listing the last 6 agent actions.
   - **Paced Mode:** Smoothly moves an on-screen pointer to each control and pans/zooms the viewer over a configurable delay (`delay_ms`, default `1000 ms`) before executing each action—ideal for teaching, live supervision, and video tutorials.
   - Marks are omitted from `qupath_screenshot` so the agent's visual perception is never polluted by its own telemetry overlays.
3. **JSONL Action Logging & Browser Rebinding Protection:**
   - Logs every tool invocation, `/groovy` request, and startup script to `mcp-<date>-<time>.jsonl` (with timestamp, client name, window/target description, execution duration `ms`, truncated result, and active project/image URI) up to a configurable 1,024 MB limit.
   - Enforces strict `Origin` and `Host` header validation (`127.0.0.1` / `localhost` only) to block browser cross-origin and DNS-rebinding attacks.

---

## 4. Deep Dive: Python–QuPath Bridges (`QuBaLab`, `Py4J`, and `PAQUO`)

### A. `qupath/qubalab` & `qupath/qupath-extension-py4j`
- **`qupath-extension-py4j`** (bundled in QuPath 0.6.0-rc3+) starts a Py4J server inside QuPath (`port 25333`, optional token) exposing `QuPathEntryPoint` (which inherits all methods of `QPEx` and `QP`).
- **`QuBaLab`** (`pip install qubalab`) provides a Pythonic bioimage laboratory that works both **standalone** (without Java/QuPath) and **connected** to a live QuPath session:
  - **Image Servers (`opening_images.html`):** Unified `ImageServer` API across `OpenSlideServer` (brightfield WSIs), `BioIOServer` (OME-TIFF, OME-Zarr, Bio-Formats), `IccProfileServer` (ICC color-managed wrapper), `LabeledImageServer` (object-to-label-mask rasterizer), and `QuPathServer` (live bridge to the image open in QuPath).
  - **Lazy Dask vs. Eager NumPy Reading:** `server.read_region(downsample, x, y, width, height)` returns an in-memory `(C, H, W)` NumPy tile, whereas `server.level_to_dask(level)` returns a lazy `(t, c, z, y, x)` Dask array that reads only the sliced tiles upon `.compute()` and plugs directly into **napari**.
  - **Warning on Arbitrary Downsamples:** As documented in `opening_images.html`, `server.to_dask(downsample)` at a non-native pyramid downsample is slow on large WSIs because it currently reads all full-resolution pixels on first compute before resizing; `server.level_to_dask(level)` should be preferred.

### B. `PAQUO` (`Bayer-Group/paquo`)
- Built by Santi Villalba and Andreas Poehlmann (Bayer ML Research), **PAQUO** embeds QuPath's Java libraries directly inside Python via **`jpype1`**—requiring no open QuPath GUI.
- Exposes `QuPathProject`, `QuPathPathClass`, and image hierarchies (`image.hierarchy.annotations`, `image.hierarchy.detections`) where ROIs are manipulated natively as Python **`shapely`** geometries (`add_annotation`, `add_tile`, `update_roi`, `to_geojson`, `load_geojson`).
- Ideal for batch dataset construction, converting ML segmentation polygons into `.qpproj` projects for pathologist review, and exporting detection measurement tables to `pandas.DataFrame`.

<!-- tolaria:related:start -->

## See also

* [Digital Pathology](../computational-digital-and-mathematical-pathology/digital-pathology.md)
* [Digital Pathology Software](../computational-digital-and-mathematical-pathology/digital-pathology-software.md)
* [From Samples to Knowledge 2025: QuPath Training Course](From%20Samples%20to%20Knowledge%202025%20-%20QuPath%20Training%20Course.md)
* [GitHub Repositories](../appendix/github-repositories.md)
* [Image Analysis](../computational-digital-and-mathematical-pathology/image-analysis.md)
* [Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images](Multiplex%20Immunofluorescence%20Image%20Analysis%20with%20QuPath%20-%20Part%201.md)
* [QuPath Python and MCP Ecosystem](../computational-digital-and-mathematical-pathology/qupath-python-and-mcp.md)
* [Solving Unpopular Problems: The QuPath Story](Solving%20Unpopular%20Problems%20-%20The%20QuPath%20Story%20-%20The%20Pathologist.md)

<!-- tolaria:related:end -->
