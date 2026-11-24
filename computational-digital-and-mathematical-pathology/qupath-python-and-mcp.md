---
type: Tool
status: Evergreen
language: en
title: "QuPath Python and MCP Ecosystem"
aliases:
  - "QuPath Python and MCP Ecosystem"
  - "QuPath-MCP"
  - "QuBaLab"
  - "PAQUO"
  - "qupath-extension-py4j"
  - "00JackLu/qupath-mcp"
  - "earthmover-support/qupath-mcp"
order: 190
belongs_to: "[[Digital Pathology Software]]"
related_to:
  - "[[QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO]]"
  - "[[From Samples to Knowledge 2025: QuPath Training Course]]"
  - "[[Solving Unpopular Problems: The QuPath Story]]"
  - "[[Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images]]"
  - "[[STAMP]]"
  - "[[TRIDENT]]"
  - "[[Digital Pathology Software]]"
  - "[[Digital Pathology]]"
  - "[[Image Analysis]]"
  - "[[GitHub Repositories]]"
repo: https://github.com/qupath/qubalab
paper: https://doi.org/10.5281/zenodo.23788878
source_type: repository
external: true
adopted: false
engagement: active
license: Apache-2.0 (QuBaLab, Py4J Extension, 00JackLu/qupath-mcp, earthmover-support/qupath-mcp) / GPL-3.0 (PAQUO)
last_reviewed: 2026-10-30
---

# QuPath Python and MCP Ecosystem

A unified engineering reference for the two complementary external interoperability layers surrounding **QuPath** (Quantitative Pathology & Bioimage Analysis):

1. **Python–QuPath Bridges (`QuBaLab`, `qupath-extension-py4j`, and `PAQUO`):** Tools that connect Python data science, deep learning, and spatial biology stacks (`NumPy`, `Dask`, `Shapely`, `GeoPandas`, `Scanpy`/`Squidpy`, `napari`) to QuPath projects, object hierarchies, and live GUI sessions.
2. **Model Context Protocol (MCP) Agent Extensions (`00JackLu/qupath-mcp` and `earthmover-support/qupath-mcp`):** Embedded JVM extensions for QuPath 0.7+ that expose QuPath's data model, scripting engine, and JavaFX GUI to large language model (LLM) agents (Claude Code, Claude Desktop, Codex, Cursor) over local Streamable HTTP / STDIO transports.

- **Companion Literature & Ecosystem Review:** [QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO](../Clippings/QuPath-MCP%20and%20Python%20Interoperability%20-%20AI%20Agent%20Servers%2C%20QuBaLab%2C%20Py4J%2C%20and%20PAQUO.md)
- **Related QuPath Notes:** [Solving Unpopular Problems: The QuPath Story](../Clippings/Solving%20Unpopular%20Problems%20-%20The%20QuPath%20Story%20-%20The%20Pathologist.md) | [From Samples to Knowledge 2025: QuPath Training Course](../Clippings/From%20Samples%20to%20Knowledge%202025%20-%20QuPath%20Training%20Course.md) | [Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images](../Clippings/Multiplex%20Immunofluorescence%20Image%20Analysis%20with%20QuPath%20-%20Part%201.md)

---

## Primary Repositories & Documentation Links

### Model Context Protocol (MCP) Extensions & Upstream Discussion
- **QuPath-MCP (`00JackLu` — State-Aware Domain & Provenance Server):**
  - **GitHub Repository:** [00JackLu/qupath-mcp](https://github.com/00JackLu/qupath-mcp)
  - **Documentation Site:** [00jacklu.github.io/qupath-mcp](https://00jacklu.github.io/qupath-mcp/)
  - **Image.sc Announcement:** [Try QuPath-MCP: a QuPath extension that lets AI agents work in QuPath (topic #122987)](https://forum.image.sc/t/try-qupath-mcp-a-qupath-extension-that-lets-ai-agents-work-in-qupath/122987)
  - **Zenodo Archive:** [DOI: 10.5281/zenodo.23788878](https://doi.org/10.5281/zenodo.23788878)
- **QuPath-MCP (`earthmover-support` — Non-Blocking JavaFX GUI Driver Server):**
  - **GitHub Repository & Extension Catalog:** [earthmover-support/qupath-mcp](https://github.com/earthmover-support/qupath-mcp)
  - **Documentation Site:** [earthmover-support.github.io/qupath-mcp](https://earthmover-support.github.io/qupath-mcp/)
- **Upstream QuPath Roadmap Issue:**
  - **GitHub Issue:** [qupath/qupath#2159 — *is it posssible to add a MCP server function*](https://github.com/qupath/qupath/issues/2159#issuecomment-6280318076)

### Python–QuPath Interoperability Libraries
- **QuBaLab (Quantitative Bioimage Analysis Laboratory in Python):**
  - **GitHub Repository:** [qupath/qubalab](https://github.com/qupath/qubalab)
  - **Documentation & Notebooks:** [qupath.github.io/qubalab-docs](https://qupath.github.io/qubalab-docs/notebooks_files/opening_images.html)
- **QuPath Py4J Extension:**
  - **GitHub Repository:** [qupath/qupath-extension-py4j](https://github.com/qupath/qupath-extension-py4j)
- **PAQUO (PAthological QUpath Obsession — Bayer Group):**
  - **Documentation:** [paquo.readthedocs.io](https://paquo.readthedocs.io/en/latest/)
  - **GitHub Repository:** [Bayer-Group/paquo](https://github.com/Bayer-Group/paquo)

---

## Architectural Overview

QuPath is built on the Java Virtual Machine (JVM) using JavaFX for interactive whole-slide viewing and Groovy for internal scripting. Historically, bridging QuPath with external Python pipelines or autonomous AI agents required exporting intermediate files (GeoJSON contours, TSV measurement tables, OME-TIFF tiles). Modern interoperability tools eliminate manual file handoffs via three distinct architectural mechanisms:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             QUPATH EXTERNAL INTEROPERABILITY ARCHITECTURES                               │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  1. IN-PROCESS JVM EMBEDDING IN PYTHON (PAQUO / JPype1)
     [ Python Process ] ──(jpype1 starts headless JVM with QuPath JARs)──> [ QuPath Java API ]
     • Direct read/write of .qpproj, ImageData, PathClass, and Shapely <-> ROI geometries
     • No running QuPath GUI required; ideal for batch dataset preparation & annotations

  2. LIVE SOCKET BRIDGE BETWEEN PYTHON & QUPATH GUI (qupath-extension-py4j + QuBaLab)
     [ Python / Jupyter ] <──(Py4J Gateway: TCP port 25333 + optional token)──> [ Running QuPath GUI ]
     • QuBaLab also works standalone without Java (OpenSlide / BioIO / Dask / Shapely GeoJSON)
     • QuPathServer streams live viewer images & syncs detections/annotations with gateway.entry_point

  3. IN-PROCESS MCP SERVERS FOR LLM AGENTS (00JackLu/qupath-mcp & earthmover-support/qupath-mcp)
     [ LLM Agent (Claude / Codex / Cursor) ] <──(Streamable HTTP / STDIO)──> [ Embedded JVM MCP Server ]
     ├─ 00JackLu/qupath-mcp (127.0.0.1:9527/mcp)
     │   • 34 typed domain tools + read-only/write/destructive hints + capability kill-switches
     │   • Provenance recording + deterministic LLM-free workflow replay (.groovy / JSON)
     └─ earthmover-support/qupath-mcp (127.0.0.1:51515/mcp)
         • 13 JavaFX GUI-driving & Groovy tools that never deadlock on modal dialogs
         • Visual on-screen overlays (Mark / Paced / Off) + JSONL session action logs
```

---

## Part I: Python–QuPath Interoperability (`QuBaLab`, `Py4J`, and `PAQUO`)

### 1. `qupath-extension-py4j` & `QuBaLab` (`qupath/qubalab`)

Developed by the core QuPath team (University of Edinburgh), **`qupath-extension-py4j`** and **`QuBaLab`** provide the official bridge between QuPath and Python.

#### `qupath-extension-py4j` (Bundled in QuPath v0.6.0-rc3+)
- **Mechanism:** Embeds a [Py4J](https://www.py4j.org/) socket gateway inside QuPath (`Extensions ▸ Py4J ▸ Start Py4J Gateway` or the toolbar Python icon).
- **Default Endpoint:** Port `25333` on localhost, with support for an optional authentication token (`auth_token`).
- **Java Entry Point:** Exposes `QuPathEntryPoint`, which extends `qupath.lib.gui.scripting.QPEx` and `qupath.lib.scripting.QP`. Every static helper available in QuPath's Groovy scripts (`getCurrentImageName()`, `getCurrentHierarchy()`, `getAnnotationObjects()`, `getQuPath()`) is callable directly from Python as a proxied `JavaObject`.

#### `QuBaLab` (`pip install qubalab`, Apache-2.0)
- **Dual-Mode Design:**
  1. **Standalone Python Mode (No QuPath/Java Required):** Reads whole-slide images directly in Python and manipulates QuPath-compatible GeoJSON objects (`ImageFeature` subclasses wrapping `shapely.Geometry` with QuPath `PathClass` and measurement dictionaries).
  2. **Connected Live Gateway Mode:** Connects to a running QuPath GUI via `qubalab.qupath.qupath_gateway.create_gateway(auth_token=token, port=25333)`.
- **Unified `ImageServer` Abstraction (`opening_images` workflow):**
  - `OpenSlideServer(path)`: Fast pyramidal reading for brightfield WSIs (`.svs`, `.ndpi`, `.mrxs`).
  - `BioIOServer(path)`: Multidimensional reading via `bioio` (`bioio-ome-tiff`, `bioio-ome-zarr`, `bioio-tifffile`, `bioio-bioformats`).
  - `IccProfileServer(base_server)`: Applies embedded ICC color profiles on the fly to an existing `ImageServer`.
  - `LabeledImageServer`: Rasterizes vector annotations or detections into integer label masks at a target resolution.
  - `QuPathServer(gateway)`: Wraps the image currently open in the live QuPath viewer so Python code can read its metadata and pixel tiles seamlessly.
- **Memory-Safe Pixel Access (`NumPy` and `Dask`):**
  - `server.read_region(downsample, x=..., y=..., width=..., height=...)`: Returns an eager `NumPy` array of shape `(C, H, W)`.
  - `server.level_to_dask(level)`: Returns a lazy `dask.array` with dimension ordering `(t, c, z, y, x)` (collapsing singleton `t`/`z` axes to `(c, y, x)` for 2D slides) backed by pyramid level `level`. Computing a slice `tile = highest_resolution[:, y:y+h, x:x+w].compute()` reads only the requested tile from disk or QuPath.
  - `server.to_dask(downsample)`: Lazy Dask array at an arbitrary downsample factor (note: `level_to_dask` is strongly preferred for large WSIs because arbitrary non-native downsamples currently trigger full-plane reads before resizing).
  - Direct integration with **napari** via `da.moveaxis(image, [0], [2])` (`(c, y, x) -> (y, x, c)`).

---

### 2. `PAQUO` (`Bayer-Group/paquo` — "PAthological QUpath Obsession")

Created by **Santi Villalba** and **Andreas Poehlmann** at Bayer Machine Learning Research (`pip install paquo`, GPL-3.0, v0.8.2+ supporting QuPath 0.2.3 through 0.5.x+), **PAQUO** takes the inverse architectural approach to Py4J: instead of connecting over a socket to a running QuPath GUI, PAQUO uses **`jpype1`** to launch a headless JVM inside the Python process and bind QuPath's Java classes directly to Pythonic objects.

#### Core Capabilities
- **Project Lifecycle Management (`QuPathProject`):**
  - Create or open `.qpproj` files via context managers (`with QuPathProject('./my-project', mode='x') as qp:`).
  - Add whole-slide images (`qp.add_image(path, image_type=QuPathImageType.BRIGHTFIELD_H_E)`), inspect `entry.uri`, read/write `entry.metadata` key-value dictionaries, and set `entry.description`.
- **Bidirectional `Shapely` Geometry Mapping:**
  - Converts Python `shapely.geometry` objects (`Polygon`, `Point`, `MultiPolygon`, `LineString`) directly into QuPath `PathAnnotationObject`, `PathDetectionObject`, or `PathTileObject` instances (`image.hierarchy.add_annotation(roi=polygon, path_class=QuPathPathClass("Tumor"))`).
  - Modifying an existing annotation's geometry in place (`annotation.update_roi(new_shapely_polygon)`) updates the underlying Java hierarchy and marks the image entry dirty for automatic saving on context exit.
- **GeoJSON & Measurement Export:**
  - `image.hierarchy.to_geojson()` and `image.hierarchy.load_geojson(geojson_list)` for rapid serialization.
  - Detection measurements can be read/written as dict-like `detection.measurements` and exported directly into `pandas.DataFrame` tables for downstream statistical or machine learning pipelines.
- **Explicit Scope:** PAQUO focuses strictly on **project metadata, object hierarchies, classes, and vector annotations/detections**; it intentionally delegates raw pixel tile reading to `OpenSlide` or `tifffile`.

---

### 3. Comparative Matrix: `QuBaLab` + `Py4J` vs. `PAQUO`

| Dimension | `qupath-extension-py4j` + `QuBaLab` | `PAQUO` (`Bayer-Group/paquo`) |
|---|---|---|
| **Maintainer & License** | QuPath core team (`qupath`); **Apache-2.0** | Bayer ML Research (`Bayer-Group`); **GPL-3.0** |
| **JVM Coupling Mechanism** | Out-of-process **Py4J** socket gateway (`port 25333`) to a running QuPath GUI, OR pure-Python standalone mode | In-process **JPype (`jpype1`)** embedding headless QuPath JARs inside Python |
| **Requires Running QuPath GUI?** | Only for `QuPathServer` / `gateway`; standalone image/GeoJSON tools need no Java or QuPath | **No** — reads and writes `.qpproj` and `.qpdata` headlessly from Python |
| **Raw Pixel Streaming (`NumPy`/`Dask`)** | **Yes** (`OpenSlideServer`, `BioIOServer`, `IccProfileServer`, `LabeledImageServer`, `QuPathServer`) | **No** (metadata & object hierarchy only; use `openslide`/`tifffile` for pixels) |
| **Vector Geometry Type** | `shapely.Geometry` wrapped in `ImageFeature` (GeoJSON conventions) | `shapely.geometry.base.BaseGeometry` bound to `PathObject` proxies |
| **Target QuPath Versions** | QuPath **0.6.0+** (bundled by default since v0.6.0-rc3) | QuPath **0.2.3 – 0.5.x+** (requires local QuPath installation / conda package) |
| **Primary Use Case** | Interactive Python prototyping alongside QuPath GUI; lazy Dask tile processing & mask-to-object conversion | Headless programmatic creation/editing of `.qpproj` datasets, tile grids, and ML model polygon imports |

---

## Part II: Model Context Protocol (MCP) Servers for QuPath

### 1. Upstream Maintainer Context (`qupath/qupath#2159`)

In July 2026, community member `wolverinelei` opened [qupath/qupath#2159](https://github.com/qupath/qupath/issues/2159) asking whether QuPath could expose a Model Context Protocol (MCP) server so AI agents could orchestrate QuPath alongside downstream statistical and Python tools. The thread crystallized the distinction between core maintainer priorities and third-party agent extensions:

- **Peter Bankhead (`petebankhead`, July 18, 2026):** Explained that the small QuPath core team is prioritizing stability, maintainability, and feature completion for **QuPath v1.0** before embarking on major architectural changes for **QuPath v2.0** (with current grant funding running 1–2 more years). Bankhead noted that MCP/agent interoperability is a natural candidate to evaluate for **QuPath v2.0**, pointed users to `qupath-extension-py4j`, `QuBaLab`, and `PAQUO` for current external scripting, and invited community extensions.
- **Alan O'Callaghan (`alanocallaghan`, July 20, 2026):** Expressed skepticism regarding LLM-driven workflows (*"I am as of now not highly motivated by the idea of people using AI assistants with QuPath"*), highlighting the cultural tension between deterministic bioimage informatics and stochastic LLM agents.
- **Community Extensions Emerge (October 2026):** Two independent Apache-2.0 extensions were released to bridge QuPath 0.7+ with MCP clients:
  1. **`00JackLu/qupath-mcp`** (announced on the [Image.sc Forum](https://forum.image.sc/t/try-qupath-mcp-a-qupath-extension-that-lets-ai-agents-work-in-qupath/122987) and archived on Zenodo, `DOI: 10.5281/zenodo.23788878`), designed specifically to solve the scientific reproducibility and grounding objections to LLM scripting.
  2. **`earthmover-support/qupath-mcp`** (linked on issue #2159 by **Curtis Rueden**, [`#issuecomment-6280318076`](https://github.com/qupath/qupath/issues/2159#issuecomment-6280318076)), designed as a non-blocking JavaFX GUI driver and visual action logger.

---

### 2. `00JackLu/qupath-mcp`: State-Aware Domain Interface & Deterministic Workflow Replay

**`00JackLu/qupath-mcp`** addresses the three failure modes of naive "run-arbitrary-Groovy" LLM bridges: (1) acting without inspecting image/hierarchy state, (2) silent false-positive successes when QuPath plugins fail and return `false`, and (3) non-reproducible analyses trapped inside an LLM chat transcript.

#### Technical Architecture
- **In-Process Zero-Dependency HTTP Server:** Runs inside QuPath's JVM on `http://127.0.0.1:9527/mcp` (MCP specification `2025-03-26`, Streamable HTTP + optional STDIO bridge) using only `java.base` (`java.net.ServerSocket`), requiring no extra JDK modules beyond QuPath's trimmed runtime.
- **34 Typed Domain Tools Across 6 Categories:**
  1. **Image & Viewer Perception (5 tools):** `qupath_get_image_info`, `qupath_get_image_metadata`, `qupath_read_region`, `qupath_get_viewer_state`, and opt-in `qupath_capture_view` (size-bounded JPEG/PNG screenshot streaming, default max `1024 px` / `350 KB`).
  2. **Objects & Annotations (11 tools):** `qupath_list_objects`, `qupath_get_object_details`, `qupath_get_selection_info`, `qupath_get_annotation_summary`, `qupath_get_detection_summary`, `qupath_select_annotation`, `qupath_create_annotation` (rectangle, ellipse, polygon, points), `qupath_update_annotation_class`, `qupath_delete_objects`, `qupath_import_geojson`, `qupath_export_geojson`.
  3. **Cell Detection & Measurement (3 tools):** `qupath_run_cell_detection` (configured `WatershedCellDetection`), `qupath_measure_annotations`, `qupath_export_measurements` (CSV/TSV).
  4. **Groovy Scripting & Validation (3 tools):** `qupath_validate_groovy_script` (compile-checks syntax without execution), `qupath_run_script` (executes Groovy on the FX thread or background thread, returning structured `errorType`/`causeChain`/`rootCause`/`stackTrace` and capturing swallowed `runPlugin` warnings in `logs`), and `qupath_list_scripts`.
  5. **Project Management (4 tools):** `qupath_get_project_info`, `qupath_list_images`, `qupath_open_image`, `qupath_save_data`.
  6. **Plugins & Reproducible Provenance (8 tools):** `qupath_list_plugins`, `qupath_run_plugin`, `qupath_get_workflow`, `qupath_save_workflow` (writes dated `.groovy` scripts to `qupath_workflow/`), `qupath_export_workflow_json` (structured provenance with QuPath version, input image, step parameters, and generated Groovy), `qupath_replay_workflow` (**deterministic, LLM-free replay** reporting before/after annotation and detection counts), `qupath_start_workflow_recording`, and `qupath_stop_workflow_recording`.
- **Machine-Readable Side-Effect Hints & Capability Kill-Switches:**
  - Every tool declares a side-effect classification: **`read-only`**, **`write`** (non-destructive state change), or **`destructive`** (deletes objects, executes arbitrary code, or writes files).
  - Four per-capability flags (`enableScripts`, `enablePlugins`, `enableFileAccess`, `enableCaptureView`) allow users to lock an agent into inspection-only mode or selectively grant execution rights.
- **27-Task Benchmark Validation:** Evaluated on QuPath's `LuCa-7color` 8-channel multiplex immunofluorescence dataset; an LLM agent (Claude Opus 4.8) completed 26/26 executable tasks (mean 1.6 tool calls/task), detecting 5,266 cells at threshold 1.0 (4,769 at threshold 2.0), exporting a $5266 \times 134$ measurement table, and reproducing the exact 1 annotation and 5,266 detections from a cleared state via **model-free `qupath_replay_workflow`**.

---

### 3. `earthmover-support/qupath-mcp`: Non-Blocking JavaFX GUI Driver & Visual Action Logger

**`earthmover-support/qupath-mcp`** takes a complementary UI-automation approach: it allows an MCP agent to operate QuPath's actual JavaFX menus, dialogs, tables, spinners, and viewers just as a human user would, while preventing modal dialogs from ever blocking the agent.

#### Technical Architecture
- **Endpoint & Installation:** Listens on `http://127.0.0.1:51515/mcp` (plus plain HTTP `/status` and `/groovy` endpoints); installable directly via the QuPath Extension Manager from `https://github.com/earthmover-support/qupath-mcp`.
- **Non-Blocking Modal Dialog Architecture (`Action Result` Pattern):**
  - GUI tools (`qupath_menu`, `qupath_click`, `qupath_select`, `qupath_set`, `qupath_key`, `qupath_close`, `qupath_open`) dispatch events on the JavaFX thread and return *without waiting for the modal handler to block*.
  - After ~1 second, the tool returns the **action result**: what it did, the list of currently open windows (`title — WxH (focused)`), and a structured control outline of any newly opened dialog (up to 25 controls / 1,500 characters, with `#n` control tags like `#3 NumericField "Number of parallel threads" = "8"` and `#5 TextField "Sigma" = "1.5"`).
  - Tracks asynchronous background dialogs per MCP session (`Opened since your last call:` / `Closed since your last call:`) and detects native OS file choosers if the FX thread blocks for >2 seconds.
- **13 Dedicated Tools:**
  - `qupath_describe(window, control, offset, limit)`: Reads any dialog, collapsible `TitledPane`, or paged `TableView` (`rows X–Y of N`) as structured text with `#n` control indices; masks `PasswordField` values as `••••••`.
  - `qupath_menu`, `qupath_click` (supports left/right context menus and double-clicks), `qupath_select` (combo boxes, trees, tables, batch checkbox ticking), `qupath_set`, `qupath_key`, `qupath_close`, `qupath_open`.
  - `qupath_wait(text, window, timeout_s, gone)`: Waits for an image to load or a table/dialog to populate across *all* table rows without polling in Groovy.
  - `qupath_view(x, y, downsample, z, t)` & `qupath_screenshot(window, index, max_size, format, viewer, region)`: Navigates the WSI viewer and captures cropped/downsampled PNG or JPEG window snapshots.
  - `qupath_run_groovy(code, timeout_s)`: Executes Groovy with injected non-blocking UI helpers (`fx {}`, `window()`, `waitFor()`, `lookup()`, `click()`, `fire()`, `typeInto()`, `describe()`, `view()`, `snap()`, `snapMain()`, `quit()`).
  - `qupath_show_actions(mode, delay_ms)`: Controls on-screen visual feedback.
- **Three On-Screen Visual Telemetry Modes (`Indicator`):**
  1. **`Mark` (default):** Draws a visual ring around every clicked/edited control, a crosshair on viewer moves, a keycap for keystrokes, a badge showing which client is driving (*"Claude Code is driving"*), and a fading lower-right panel listing the last 6 actions.
  2. **`Paced`:** Smoothly animates a pointer to each target control and pans/zooms the viewer over `delay_ms` (default `1000 ms`) before acting—designed for live human supervision and screen recordings.
  3. **`Off`:** Silent execution. (On-screen marks are excluded from `qupath_screenshot` so the agent always sees an uncorrupted viewer).
- **Session Action Log & Browser Rebinding Defense:**
  - Appends every tool call, `/groovy` request, and startup script to `mcp-<date>-<time>.jsonl` inside `mcp-logs/` (default 1,024 MB cap with non-destructive warning).
  - Rejects any HTTP request whose `Origin` or `Host` header does not match `127.0.0.1:<port>` or `localhost:<port>`, blocking browser-based cross-origin and DNS-rebinding attacks.

---

### 4. Head-to-Head Comparison: `00JackLu/qupath-mcp` vs. `earthmover-support/qupath-mcp`

| Feature | `00JackLu/qupath-mcp` | `earthmover-support/qupath-mcp` |
|---|---|---|
| **Primary Design Philosophy** | **State-aware domain API & reproducible scientific provenance** | **Non-blocking JavaFX GUI automation & human-visible co-piloting** |
| **Default Localhost Port** | `127.0.0.1:9527/mcp` (Streamable HTTP + STDIO bridge) | `127.0.0.1:51515/mcp` (Streamable HTTP + `/groovy` + `/status`) |
| **Tool Count & Granularity** | **34 typed domain tools** across 6 bioimage categories | **13 GUI-driver, inspection, viewer, and Groovy tools** |
| **Side-Effect Annotations** | Explicit `read-only`, `write`, `destructive` per tool | Not annotated; relies on GUI transparency & `mcp-logs` |
| **Capability Gating** | 4 kill-switches (`enableScripts`, `enablePlugins`, `enableFileAccess`, `enableCaptureView`) | Single server toggle (`Extensions ▸ MCP server ▸ Enabled`) |
| **Modal Dialog Handling** | Bypasses GUI dialogs via direct Java API calls | Non-blocking JavaFX dispatch + `#n` control outlining (`qupath_describe`) |
| **On-Screen Visual Feedback** | Standard QuPath viewer updates | **Mark / Paced / Off** overlays (rings, animated pointer, client badge, action HUD) |
| **Provenance & Replay** | `.groovy` + JSON workflow export + **deterministic LLM-free `qupath_replay_workflow`** | Per-session `mcp-<date>-<time>.jsonl` audit log (no automated replay command) |
| **DNS Rebinding / Origin Check** | Localhost bind (`127.0.0.1`) | Localhost bind + strict `Origin` and `Host` header validation |

---

## Security & Clinical Governance Considerations

Both `qupath-extension-py4j` and the two `qupath-mcp` servers open localhost ports (`25333`, `9527`, `51515`) capable of executing arbitrary JVM/Groovy code as the logged-in user and capturing viewer regions or screenshots:

1. **Research vs. Clinical Workstation Boundary:** In accordance with Peter Bankhead's explicit positioning of QuPath as a research platform (see [Solving Unpopular Problems: The QuPath Story](../Clippings/Solving%20Unpopular%20Problems%20-%20The%20QuPath%20Story%20-%20The%20Pathologist.md)), unauthenticated localhost code-execution servers should **not** be left enabled on shared multi-user machines or clinical workstations connected to Hospital Information Systems (HIS/LIS) or identifiable patient WSIs.
2. **PHI & Cloud LLM Egress:** When connecting cloud-hosted LLM agents (Claude, OpenAI Codex, Cursor) to `qupath-mcp`, enabling `qupath_capture_view` / `qupath_screenshot` or reading slide metadata transmits image crops and file paths to the external model provider. For sensitive cohorts, either connect strictly to local/on-premise open-weight models or disable `enableCaptureView` and de-identify `.qpproj` slide URIs prior to agent inspection.
3. **Deterministic Handoff for Publication:** Use interactive MCP sessions for exploratory parameter tuning, then lock the resulting pipeline into a deterministic `.groovy` script (`qupath_save_workflow` / `qupath_replay_workflow`) or version-controlled Python notebook (`QuBaLab` / `PAQUO`) for cohort-wide batch execution.

<!-- tolaria:related:start -->

## See also

* [Digital Pathology](digital-pathology.md)
* [From Samples to Knowledge 2025: QuPath Training Course](../Clippings/From%20Samples%20to%20Knowledge%202025%20-%20QuPath%20Training%20Course.md)
* [GitHub Repositories](../appendix/github-repositories.md)
* [Image Analysis](image-analysis.md)
* [Multiplex Immunofluorescence Image Analysis with QuPath — Part 1: Understanding Digital Images](../Clippings/Multiplex%20Immunofluorescence%20Image%20Analysis%20with%20QuPath%20-%20Part%201.md)
* [QuPath-MCP and Python Interoperability: AI Agent Servers, QuBaLab, Py4J, and PAQUO](../Clippings/QuPath-MCP%20and%20Python%20Interoperability%20-%20AI%20Agent%20Servers%2C%20QuBaLab%2C%20Py4J%2C%20and%20PAQUO.md)
* [Solving Unpopular Problems: The QuPath Story](../Clippings/Solving%20Unpopular%20Problems%20-%20The%20QuPath%20Story%20-%20The%20Pathologist.md)
* [STAMP](stamp.md)
* [TRIDENT](trident.md)

<!-- tolaria:related:end -->
