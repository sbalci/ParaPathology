---
type: Tool
status: Developing
language: en
aliases:
  - "WSInfer"
order: 130
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Digital Pathology Software]]"
  - "[[HistoMetPath]]"
  - "[[Hugging Face Digital Pathology]]"
  - "[[Image Analysis]]"
repo: https://github.com/SBU-BMI/wsinfer
extension_repo: https://github.com/qupath/qupath-extension-wsinfer
documentation: https://wsinfer.readthedocs.io/en/latest/user_guide.html
extension_documentation: https://qupath.readthedocs.io/en/stable/docs/deep/wsinfer.html
paper: https://doi.org/10.1038/s41698-024-00499-9
source_type: repository
external: true
adopted: false
engagement: active
upstream: "split, read 2026-08-30 — Python runtime dormant (last commit 2024-07-10, last release v0.6.1 on 2024-02-22, 0 commits in the trailing year); QuPath extension maintained by the QuPath group (v0.4.0 on 2025-06-27, last commit 2025-12-03)"
license: Apache-2.0
last_reviewed: 2026-08-30
---

# WSInfer

Runs somebody else's trained patch-classification model across a whole slide and hands back a per-tile probability map — as a live overlay inside QuPath, or as CSV and GeoJSON from a one-line command. **Use the QuPath extension: it is the half of the ecosystem still being maintained.**

- **Paper:** Kaczmarzyk JR, O'Callaghan A, Inglis F, Gat S, Kurc T, Gupta R, Bremer E, Bankhead P, Saltz JH. *Open and reusable deep learning for pathology with WSInfer and QuPath.* npj Precision Oncology 8, 9 (2024) — open access, [10.1038/s41698-024-00499-9](https://doi.org/10.1038/s41698-024-00499-9)
- **Python runtime:** [SBU-BMI/wsinfer](https://github.com/SBU-BMI/wsinfer) · [user guide](https://wsinfer.readthedocs.io/en/latest/user_guide.html)
- **QuPath extension:** [qupath/qupath-extension-wsinfer](https://github.com/qupath/qupath-extension-wsinfer) · [documentation](https://qupath.readthedocs.io/en/stable/docs/deep/wsinfer.html)
- **Model Zoo:** [huggingface.co/kaczmarj](https://huggingface.co/kaczmarj), registry at [kaczmarj/wsinfer-model-zoo-json](https://huggingface.co/datasets/kaczmarj/wsinfer-model-zoo-json)

Both repositories are Apache-2.0. The collaboration is Stony Brook University (the runtime and the Zoo) and the QuPath group in Edinburgh (the extension).

## What it is

Not a model, and not a training framework — **plumbing for the last mile**. Its premise is the reusability gap the authors quote from a survey of 161 deep-learning pathology studies: one in four shared code, one in eight shared weights, and almost none in a form a pathologist could run. WSInfer answers the narrow, tractable part of that: given weights someone already trained, apply them to my slide.

Three components, deliberately separable:

1. **The inference runtime** — a Python package and `wsinfer run` CLI. Input: a directory of slides, a model, an output directory. Output: per-patch probabilities as CSV, the same as GeoJSON, patch coordinates as HDF5, and a tissue-mask thumbnail. The output hierarchy is modelled on CLAM's.
2. **The QuPath extension** — the same inference as a dialog inside QuPath, run on an annotation you drew, results appearing as classified tile objects with measurement maps and an exportable results table. Scriptable (`qupath.ext.wsinfer.WSInfer.runInference("kaczmarj/...")`) and therefore batchable across a project.
3. **The Model Zoo** — models hosted on Hugging Face as TorchScript weights plus a `config.json` and a model card. TorchScript is the point: it carries the forward-pass graph, so the runtime needs no access to the original Python model class. The registry is a single JSON file; contributing means opening a pull request against it, while the model repository stays owned and licensed by whoever trained it.

## Which half to use, and why it matters

The two halves are no longer in the same state of health, and that is the finding this evaluation turns on. Both figures read from the repositories on 2026-08-30:

| | Python runtime | QuPath extension |
|---|---|---|
| Last commit | **2024-07-10** | 2025-12-03 |
| Latest release | **v0.6.1, 2024-02-22** | v0.4.0, 2025-06-27 |
| Commits in trailing year | **0** | 1 |
| Open issues · stars | 14 · 87 | 2 · 30 |
| Requires | Python ≥ 3.8, PyTorch | QuPath ≥ 0.6.0 |

The runtime has had no commit in over two years and no release in two and a half. Worse for anyone installing it from PyPI: **the four commits that exist after v0.6.1 are unreleased**, and two of them are the backend and MPP-reading fixes (`fix backend setting`, `only use specified backend (or tifffile) to read mpp`). `pip install wsinfer` therefore gives you code from February 2024 that predates its own last bug fixes; only a git install has them.

The extension, by contrast, has kept pace with QuPath itself — v0.4.0 requires QuPath 0.6.0 and installs through the extension manager and catalogue rather than by dropping a jar. Its `CHANGELOG.md` stops at v0.3.0 and so understates it.

| Need | Route |
|---|---|
| Apply a Zoo model to a few slides, look at the result | **QuPath extension.** Draw an annotation, pick a model, run; results are tile objects you can immediately measure, filter and export. |
| Batch the same model across a project | **QuPath extension, scripted.** The run parameters land in the workflow, so *Run for project* works from a two-line script. |
| Headless inference over hundreds of slides on a cluster | Runtime, **installed from git, not PyPI** — and accept that nobody has touched it since July 2024. Docker/Apptainer images exist under `kaczmarj/wsinfer`. |
| A model that is not in the Zoo | Either half: TorchScript plus a `config.json`. QuPath reads it from a `local` directory beside the downloaded models; the runtime takes `--model-path` and `--config`. |
| Anything diagnostic | Nothing here. The README's own caution is "academic project intended for research use only", and the paper disclaims suitability for any specific application. |

## The models it ships

Eight, read from the live registry on 2026-08-30 — all under the `kaczmarj` Hugging Face account, all patch classifiers:

| Model | Task | Training data |
|---|---|---|
| `breast-tumor-resnet34.tcga-brca` | tumour vs not | TCGA BRCA |
| `lung-tumor-resnet34.tcga-luad` | six growth patterns (lepidic, benign, acinar, micropapillary, mucinous, solid) | TCGA LUAD |
| `pancreas-tumor-preactresnet34.tcga-paad` | tumour vs not | TCGA PAAD |
| `prostate-tumor-resnet34.tcga-prad` | benign, grade 3, grade 4/5 | TCGA PRAD |
| `pancancer-lymphocytes-inceptionv4.tcga` | lymphocyte-positive vs not | 23 TCGA cancer types |
| `lymphnodes-tiatoolbox-resnet50.patchcamelyon` | metastasis vs not | PatchCamelyon |
| `colorectal-tiatoolbox-resnet50.kather100k` | nine tissue classes | NCT-CRC-HE-100K |
| `colorectal-resnet34.penn` | five colorectal classes (epithelium, stroma, tumour, necrosis, dysplasia) | **undocumented** |

Two are re-hosted TIA Toolbox checkpoints — the lymph-node and Kather100K colorectal models — and the paper's Table 1 gives a source publication for each of the other five.

The eighth is the exception in more ways than one. `colorectal-resnet34.penn` is not in Table 1, and its model card says only that it was trained by Yuwei Zhang at Stony Brook University, followed by "More information coming in the future" — unchanged since January 2024. Its `config.json` gives five classes at 350 px and 0.25 µm/px; **its training data is nowhere stated**, and the `.penn` in its name is unexplained by any primary source I could find. That matters beyond one model: the paper's case for the Zoo rests on every entry carrying a model card with "a description of training data", and the newest entry does not have one. Check the card before trusting any Zoo model's provenance — they are not uniform.

**The Zoo has not grown since the paper.** The registry's commit history shows seven models at publication (10 January 2024), matching the paper's Table 1 exactly, then `colorectal-resnet34.penn` added on 13 January 2024 — three days later — and **nothing in the two and a half years since**, against the paper's stated intention to add microsatellite-instability and genomic-aberration models and to move into slide-level inference. Treat "we plan to include such models in future work" as unfulfilled, not pending.

This also bounds what the tool is *for* here. Every model whose training data is documented was trained on public research cohorts, mostly TCGA, and TCGA's slides are not a scanner-and-laboratory match for anyone's routine material. The authors say so themselves, unusually plainly: they *expect* promising methods to often perform poorly on new images, and offer WSInfer as the means of finding that out rather than as a guarantee against it. That framing is the honest one, and it is also the reason a Zoo model's output on your own slides is a hypothesis, not a measurement.

## How it works, read from the source

Both halves solve the same problem — a model was trained at a fixed physical resolution, and your slide is at whatever your scanner produced — but they solve it differently, and the difference is worth knowing before you compare their outputs.

**The runtime** takes the model config's `patch_size_px` and `patch_spacing_um_px`, reads the slide's own µm/px, and computes `patch_size = round(patch_size_px × patch_spacing_um_px / mpp)`. It then reads every patch **at level 0 only** — it raises rather than accept any other level — and lets the config's `Resize` transform bring it down to the network's input size. The full-resolution read costs I/O but sidesteps the failure mode where "level 2" means different magnifications on two scanners.

**The extension** does the arithmetic the other way: `downsample = model spacing ÷ slide pixel size`, passed straight to QuPath's `ImageServer`, which serves the request from whichever pyramid level suits. Faster, and it inherits QuPath's own interpolation. The documentation is explicit that the inference patches need not coincide with the tile objects you see — they are centred on the same pixels but may be larger or smaller — which matters if you reuse existing tiles to stack several models on one region.

Neither half will guess a missing spacing. The runtime tries OpenSlide, then TiffSlide, then bare TIFF tags, and raises `CannotReadSpacing` if all three fail. Failing loudly on unknown magnification is the right behaviour and not the common one.

Three more things the code says and the documentation does not:

- **The runtime's default slide backend is TiffSlide, not OpenSlide** — it prefers TiffSlide whenever it is installed, and OpenSlide is a fallback. Format coverage and metadata therefore differ from the OpenSlide-based tools most of this vault assumes.
- **Tissue detection is a fixed threshold on the HSV saturation channel** (median blur, `threshold = 7`, morphological closing, then small-object and small-hole removal) applied to a thumbnail. It is not Otsu and not adaptive. The object and hole size limits *are* given in µm² and converted to thumbnail pixels, so those are scanner-independent — but a fixed saturation cut is not, and a pale or over-blued section is where it will drift. Anything that changes stain intensity changes what counts as tissue before the model ever runs.
- **The extension verifies a SHA-256, but only at download.** `downloadModel()` fetches the Git-LFS pointer alongside the weights and refuses the download unless the file's hash matches the `oid sha256:` line. The pre-run check the UI actually calls, `isValid()`, does *not* re-hash: it checks that the file exists, that the config parses, and that the weights are older than the pointer file. That last comparison would still catch a naive post-download edit, since editing the `.pt` makes it newer than the pointer — but it is a timestamp heuristic, not a cryptographic check, and the method's own javadoc says it returns true "if the files exist and the SHA matches", which is not what the three lines below it do. Integrity is guaranteed for the transfer, not for the file's whole life on disk.

## What the paper shows, and what it does not

It is a Brief Communication about software, and it should be read as one. **The only measurements in it are timings.** There is no accuracy, no AUROC, no reader comparison, and no external validation of any Zoo model — deliberately, since the models are other people's and the paper's claim is about access rather than performance. Worth stating plainly all the same, because a citation to this paper supports "the model was applied with WSInfer", never "the model works".

The timings, all with `breast-tumor-resnet34.tcga-brca` (350 × 350 px patches at 0.25 µm/px):

- **Runtime, enterprise GPU** (Quadro RTX 8000, RedHat Linux): 1061 TCGA slides in 6 h 46 min — **23 s per slide**, median tissue area 173 mm².
- **Runtime, consumer GPU** (RTX 2080 Ti under WSL2): 30 of those slides in 14 min 17 s — **29 s per slide**, median tissue area 179 mm².
- **Extension, CPU** (i5-12600K, QuPath v0.4.4, extension v0.2.1): **6 min 37 s** for a 100 mm² region.
- **Extension, GPU** (RTX 2080 Ti): **40 s** for the same region.

The number to plan around is the CPU one. A 100 mm² annotation is a modest region — a single core-biopsy level or a fraction of a resection section — and six and a half minutes for it means whole-slide runs on a laptop are an overnight job, not an interactive one. The tenfold GPU gap is real but conditional: CUDA has to be installed *before* Deep Java Library downloads its own PyTorch, which the QuPath documentation flags as the step that most often goes wrong. Apple Silicon gets MPS.

## Why this is worth having here

**It is the shortest path from a published model to a heatmap on your own slide, and it lands inside the software already in use.** No Python environment, no training, no data leaving the machine — an annotation, a dropdown, and a probability map you can then treat like any other QuPath measurement. For a pathologist testing whether a published claim survives contact with local material, that is the whole workflow.

It also fixes a specific claim already recorded in this vault. The Hugging Face catalogue calls WSInfer "the cleanest deployment path for whole-slide inference" for the `kaczmarj` patch-classifier family — still true, but the path is the QuPath extension, not `pip install wsinfer`, and that distinction did not exist when the catalogue entry was written.

Two adjacent uses are worth naming. First, **TIL mapping**: run the pan-cancer lymphocyte model and a tumour model over the same tiles and the spatial overlap gives a tumour-infiltrating-lymphocyte map — the QuPath documentation ships a script for it, and it is the one use case the paper argues has near-term clinical value. Second, **lymph-node screening**: `lymphnodes-tiatoolbox-resnet50.patchcamelyon` is a metastasis classifier that can be pointed at a sentinel-node section in minutes. Set against HistoMetPath — the single-author CAMELYON MIL framework evaluated separately in this section, whose best model reaches AUROC 0.68 on 30 slides — the comparison is instructive: an off-the-shelf patch classifier, run through a maintained GUI, is the baseline that any small in-house metastasis model has to beat before it is worth training.

The reusable idea, independent of the tool, is the **model configuration spec**: a small JSON stating patch size, physical spacing and the transform chain, published beside TorchScript weights. It is what lets a model be applied correctly by software that knows nothing about how it was trained, and the authors explicitly offer it for adoption beyond WSInfer. Any model this group releases should carry the same three facts.

## Current state / open questions

- **Will the runtime ever be released again?** Its most consequential bug fixes — backend selection and MPP reading — sit unreleased on `main` two years on. Until a v0.6.2 exists, any pinned `wsinfer` dependency is pinned to code with known defects.
- **The Zoo is one JSON file on one Hugging Face account.** Both halves resolve models by fetching `kaczmarj/wsinfer-model-zoo-json`; the registry has been untouched since January 2024 and the models are personal, not organisational, repositories. That is a single point of failure for the entire ecosystem, and it is worth mirroring the weights of any model a project actually depends on.
- **Slide-level inference never arrived.** Patch classification is all there is; for a single prediction per slide, the MIL literature in this section is the route, not this tool.
- **Nothing here has been run on our own material.** `[unverified]` — in particular whether the fixed saturation threshold in the runtime's tissue detector, or QuPath's own tissue handling, behaves sensibly on our stains. Cheap to check on one slide and worth doing before trusting any tile count.
- **QuPath 0.6.0 is a hard floor** for extension v0.4.0. On an older QuPath, v0.3.0 (QuPath 0.5) is the last compatible release.

Derived from: paper read in full from the publisher HTML 2026-08-30 (including Table 1); both repositories cloned at full depth and read at source level the same day — `wsinfer/wsi.py`, `wsinfer/patchlib/__init__.py`, `patchlib/segment.py`, `patchlib/patch.py`, `wsinfer/modellib/data.py`, `run_inference.py`, `transforms.py`, `wsinfer/cli/patch.py`, `pyproject.toml`, `README.md`; and `WSInfer.java`, `TileLoader.java`, `models/WSInferModel.java`, `models/WSInferUtils.java`, `ui/WSInferController.java`, `build.gradle.kts`, `settings.gradle.kts`, `CHANGELOG.md`; plus both documentation pages, the GitHub API for currency on both repositories, and the Hugging Face API for the Model Zoo registry and its commit history, and the model card and `config.json` of `kaczmarj/colorectal-resnet34.penn`.
