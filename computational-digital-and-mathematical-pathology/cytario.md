---
type: Tool
status: Developing
language: en
title: "Cytario"
aliases:
  - "Cytario"
  - "Cytario Web"
  - "cytario-web"
order: 160
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Digital Pathology Software]]"
  - "[[Cytomine]]"
  - "[[Celldega]]"
  - "[[Image Analysis]]"
  - "[[WSInfer]]"
  - "[[HoVer-NeXt]]"
  - "[[From Samples to Knowledge 2025 - QuPath Training Course]]"
repo: https://github.com/cytario/cytario-web
url: https://www.cytario.com
source_type: repository
license: AGPL-3.0
---

# Cytario

An open-core, web-based **Image Management System (IMS)** and scientific bioimaging viewer for digital pathology and spatial biology. Cytario is engineered to eliminate vendor lock-in, proprietary format silos, and cloud egress bottlenecks by managing petabytes of whole-slide images (WSI) and multi-channel multiplexed datasets using open standards (OME-TIFF, OME-Zarr, GeoTIFF, Apache Parquet, Apache Arrow) streaming directly from S3-compatible object storage.

- **Source Repository:** [cytario/cytario-web](https://github.com/cytario/cytario-web) — AGPL-3.0
- **Official Platform Portal:** [cytario.com](https://www.cytario.com)
- **Plugin API Specification:** `@cytario/plugin-api` ([packages/plugin-api](https://github.com/cytario/cytario-web/tree/main/packages/plugin-api))
- **Design System:** [@cytario/design](https://github.com/cytario/cytario-design)

---

## Core Capabilities & Pathology Workflows

### 1. Multiplex Immunofluorescence (mIF), IHC, and H&E in One Viewer
Built specifically for datasets that overwhelm conventional web viewers:
- **16-bit High-Plex Imaging:** Handles multi-channel mIF and spatial biology datasets (spanning hundreds of gigabytes per slide) alongside standard brightfield H&E and immunohistochemistry (IHC).
- **Interactive Channel Windowing & True Intensity Readouts:** Real-time channel contrast stretching on true image histograms, dynamic false-color assignment, and cursor-hover readouts of physical pixel intensity values.
- **Million-Cell Overlays:** High-performance hardware-accelerated rendering of cell segmentation masks, centroids, and phenotypic classifications streamed directly from downstream machine-learning pipelines (e.g. [[HoVer-NeXt]], QuPath, Cellpose) or CSV/Parquet files.

### 2. Standards-First Interoperability
- Replaces closed, vendor-proprietary archives with established open imaging standards: **OME-TIFF**, **OME-Zarr**, **GeoTIFF**, and **GeoParquet**.
- Enables multi-vendor hospital and research networks where disparate slide scanners, laboratory information systems (LIS), and computational pathology AI algorithms interoperate without format conversion friction.

### 3. Petabyte-Scale Cloud-Native Storage Architecture
- **Direct-to-S3 Client-Side Streaming:** Eliminates intermediate rasterization tile servers, heavy file downloads, and local hard drive shuttling. Slides stream directly into the browser from S3-compatible object stores (AWS S3, MinIO, RustFS) via range requests.
- **Short-Lived Credential Federation:** Authenticates S3 requests using AWS Security Token Service (STS) temporary credentials, ensuring data governance and zero exposure of static storage keys.

---

## Technical Architecture & Engineering Stack

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Frontend Framework** | React Router v7 (SSR), React 19, Vite 6 | Server-side rendering, fast hydration, and type-safe routing |
| **Language** | TypeScript (strict mode) | Strict end-to-end typing across host and plugin interfaces |
| **Visualization & Rendering** | [Viv](https://github.com/hms-dbmi/viv), [deck.gl](https://deck.gl/) | GPU-accelerated multiscale visualization of high-resolution multiplexed bioimaging (developed by Harvard Medical School HIDIVE Lab) |
| **In-Browser Analytics** | DuckDB-WASM, Apache Arrow | In-memory columnar processing and spatial queries on Parquet cell tables directly in WebAssembly |
| **Styling & UI** | Tailwind CSS, `@cytario/design` | Modern component library and responsive pathology UI |
| **Authentication & IAM** | Keycloak 26.6 (Organizations) | Multi-tenant boundary isolation, scoped role-based access control (`/admins`, user groups) |
| **State Management** | Zustand (with DevTools) | Lightweight, predictable client state |
| **Session Caching** | Valkey / Redis (TLS enforced) | OAuth token caching and session lifecycle management |
| **Application Database** | PostgreSQL + Prisma ORM | Relational schema, tenant settings, and asset metadata |
| **Cloud & Object Storage** | AWS S3 / MinIO / RustFS | S3-compatible storage accessed via client-side SigV4 `signedFetch` |
| **Deployment Runtime** | Google Distroless Node.js 24 | Hardened container runtime (`gcr.io/distroless/nodejs24-debian12`), Helm charts, Podman/Kubernetes |

---

## Extensibility & Plugin Model

Cytario Web features a modular plugin architecture based on `@cytario/plugin-api`. Format loaders for specialized or proprietary microscopy formats can be compiled into the application at build time without modifying core application code:

```typescript
import type { CytarioPlugin } from "@cytario/plugin-api";

const vendorPlugin: CytarioPlugin = {
  name: "@vendor/wsi-loader",
  apiVersion: "^1.0.0",
  register(ctx) {
    ctx.formats.register(["wsi", "svs"], {
      load: async (url, opts) => {
        const res = await opts.signedFetch(url, { signal: opts.signal });
        return { data: res, metadata: { /* image metadata */ } };
      },
      fileTypeMeta: { label: "Vendor WSI", icon: "Microscope" },
    });
  },
};

export default vendorPlugin;
```

### Security & Compatibility Gates
1. **S3 SigV4 Security Boundary:** All object storage requests execute through the host's `signedFetch`. Outgoing headers pass through a strict allowlist (`Range`, `If-None-Match`, `Accept`, `Cache-Control`) while sensitive authentication headers (`Authorization`, `Cookie`, `x-amz-*`) are strictly protected against plugin smuggling.
2. **Strict Semver Gating:** The host validates each plugin's `apiVersion` against the bundled `@cytario/plugin-api` version on bootstrap, skipping incompatible modules without crashing the host.

---

## Licensing & Enterprise Model

- **Open Core (AGPL-3.0):** The web viewer and core IMS (`@cytario/web`, `@cytario/plugin-api`) are freely available under AGPL-3.0 for self-hosting on on-premise, cloud, or hybrid infrastructure.
- **Cytario Enterprise Edition:** Proprietary format loaders, white-label deployment bundles, commercial dual-licensing (exempting consumers from AGPL-3.0 source-disclosure requirements), and fully managed cloud operations are offered through [cytario.com](https://www.cytario.com).

---

## Relationship to the Digital Pathology Ecosystem

- **[[Cytomine]]:** While Cytomine provides an established Java/Grails and PostGIS microservice suite for collaborative annotation and algorithm execution, Cytario focuses on a modern cloud-native TypeScript/React 19 stack, serverless S3 client-side streaming via Viv and deck.gl, and in-browser analytics with DuckDB-WASM.
- **[[Celldega]]:** Celldega emphasizes exploratory spatial transcriptomics and interactive clustering (AnnData/Squidpy/ParquetWASM); Cytario functions as an enterprise-wide Image Management System (IMS) connecting clinical scanners, multi-tenant Keycloak IAM, and diagnostic pathology workflows.
- **[[QuPath]]:** QuPath serves as the gold standard desktop workstation for tissue analysis; Cytario serves as the scalable web platform to host, view, and organize whole-slide libraries and visualize QuPath-generated cellular measurements at institutional scale.
- **[[HoVer-NeXt]] & [[WSInfer]]:** Deep learning segmentation models output cell coordinates and class labels that can be exported directly into Cytario as GeoParquet or CSV layers for web exploration.
