---
status: Evergreen
language: en
type: Reference
aliases:
  - "Supplement: Orphan-Disease, Rare-Tumor & Cutting-Edge IHC"
order: 10
belongs_to: "[[Comprehensive IHC Antibody Menu for a National Reference Pathology Laboratory]]"
---

# Supplement: Orphan-Disease, Rare-Tumor & Cutting-Edge IHC
### Addendum to the National Reference Laboratory IHC Menu — Dako Omnis context
*Slots into the base document's section numbering. Status flags: **T2** = add to the standing reference menu now; **LDT** = emerging/validated-in-literature, run as in-house validated laboratory-developed test (usually RUO reagent); **R** = research-only, never for clinical treatment selection.*

---

## S0. Why this layer exists — and how to run it
This supplement covers three things the base menu deliberately deferred: (1) **fusion/mutation-surrogate IHC** that substitutes for molecular testing (SS18-SSX, H3 G34R/V, p65, AFF2, DDIT3, EZHIP), (2) **orphan-disease panels** that only a national reference center will ever run at volume (neuromuscular, EB antigen mapping, PFIC, amyloid typing, novel MN antigens, prion), and (3) **molecular-subtype surrogates** entering trials and tumor boards (GATA6/CK17 in PDAC, ASCL1/NEUROD1/POU2F3/YAP1 in SCLC, GPNMB in renal tumors).

Operational rules specific to this layer:
- **EQA mostly does not exist** for these markers (NordiQC/UK NEQAS coverage is sparse). Substitute: genotyped index cases and cell-line FFPE blocks as controls, split-sample exchange with 1–2 peer reference labs, and molecular concordance audits (every surrogate-IHC result vs NGS/FISH for the first 20+ cases, then periodic).
- **Regulatory framing:** most reagents here are RUO. Under EU IVDR logic (Art. 5(5) health-institution exemption) and ISO 15189, each becomes an in-house LDT with a validation dossier (analytical sensitivity/specificity vs genotype, precision, lot-to-lot). In Turkey, align the dossier with TÜRKAK ISO 15189 scope and TİTCK device rules.
- **Omnis practicalities:** most of these are rabbit polyclonals or low-abundance rabbit mAbs → plan **TRS High pH HIER + 3-step (linker) detection** by default, then de-escalate if signal allows. Batch ultra-low-volume markers (weekly/monthly runs).
- **Digital pathology hook:** QuPath-assisted scoring is already published for GATA6 H-score in PDAC and is the obvious route for Ki-67-like quantitative surrogates — a natural fit for your image-analysis pipeline.

---

## S3-bis. GI, pancreatobiliary & liver (extends base §3)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **GATA6** | No consensus dx clone; published IHC (COMPASS ancillary work) with pathologist + QuPath-assisted H-score; RNA-ISH alternative | **PDAC transcriptional subtype surrogate:** GATA6-high = classical (ORR 33% and better mFOLFIRINOX outcomes in COMPASS); GATA6-low = basal-like (ORR 10%, mFFX progression 60% vs 15%) | LDT |
| **CK17** (E3) | Dako/std E3 | Dual role: (a) basal-like PDAC marker (with CK5/6+, p63+, GATA6/HNF4α-low); (b) PDAC-vs-reactive panel with IMP3, maspin, S100P | T2 |
| **HNF4α** | rabbit mAb/polyclonal | Classical-subtype partner; 4-marker panel CK5/6+p63 vs GATA6+HNF4α defines classical/transitional/basal IHC patterns with independent prognostic value | LDT |
| **ATRX + DAXX** | ATRX polyclonal/BSB-108 (on menu); DAXX rabbit polyclonal | Loss in ~40% PanNET → ALT phenotype, worse prognosis; distinguishes PanNET from PanNEC (RB/p53 route) | T2 |
| **Menin (MEN1)** | rabbit mAb/polyclonal | Nuclear loss in MEN1-mutant PanNET; syndromic flag | LDT |
| **BSEP (ABCB11)** | rabbit polyclonal | Canalicular loss → PFIC2; orphan pediatric cholestasis service | T2 |
| **MDR3 (ABCB4)** | P3II-26 | Canalicular loss/reduction → PFIC3 | T2 |
| **Alpha-1-antitrypsin** | polyclonal (Dako) | PiZZ globules (PAS-D+ correlate); A1ATD liver | T2 |
| Pitfall note | — | GATA6 also stains many upper-GI/pancreatobiliary lineages — subtype use requires quantitative scoring, not binary read | — |

## S7-bis. Thoracic (extends base §7)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **ASCL1** | 24B72D11 (BD) | SCLC-A (ASCL1-dominant ≈69% of SCLC); NE-high/DLL3-high | LDT |
| **NEUROD1** | EPR20766 | SCLC-N (≈17%); NE-high | LDT |
| **POU2F3** | rabbit polyclonal (e.g., NBP1-83966) | SCLC-P tuft-cell-like (≈7%); mutually exclusive with ASCL1/NEUROD1; NE-low/DLL3-low — explains "NE-marker-negative SCLC" | LDT |
| **YAP1** | 63.7 | SCLC-Y/inflamed (low-level, mostly combined SCLC; contested as pure subtype); also Hippo-pathway work in mesothelioma; also ST-EPN-YAP1 | LDT |
| **NF2/Merlin** | rabbit mAb/polyclonal | Loss in mesothelioma (Hippo axis) — adjunct to BAP1/MTAP | R→LDT |
| Rationale | — | Subtype correlates with DLL3 (tarlatamab), chemo-IO response patterns; expect trial-driven requests. Report as dominant-TF pattern, not single-marker binary | — |

## S5-bis. Genitourinary (extends base §5)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **GPNMB** | rabbit mAb (automated assays published) | Sensitive screen for **TFE3/TFEB tRCC AND TSC1/2/mTOR-altered tumors** (ESC RCC, EVT, LOT, AML/PEComa) — shared MiT-pathway output. Caveats: does not separate those two groups; ~13% equivocal/false-negative vs FISH; confirm with TFE3/TFEB IHC-FISH. TRIM63 RNA-ISH is the emerging alternative | LDT |
| **HOXB13** | rabbit mAb (e.g., D7N8O) | Prostate lineage in NKX3.1-dim/PSA-negative metastases | LDT |
| **Prostein (P501S)** | 10E3 | Prostatic lineage (with NKX3.1) | T2 |
| **PBRM1** | rabbit polyclonal | ccRCC prognostic (with BAP1); research reporting only | R |

## S6-bis. Gynecologic (extends base §6)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **FOXL2** | rabbit polyclonal | Sex cord-stromal lineage (adult granulosa); C402G/C134W confirmation stays molecular | T2 |
| **BCOR** | C-10 (mouse) | High-grade endometrial stromal sarcoma (BCOR-ITD/ZC3H7B::BCOR) — pairs with diffuse cyclin D1; also see sarcoma/CNS entries | LDT |
| **SMARCA4 (BRG1) + SMARCA2 (BRM)** | EPNCIR111A (on menu) + BRM polyclonal | **SCCOHT**: BRG1 loss with BRM co-loss is near-pathognomonic — reflex both in young-female undifferentiated ovarian tumors | T2 |
| Pattern note | — | Mesonephric-like adenocarcinoma: GATA3+/TTF-1+/luminal CD10+ with ER/PR-low, wild-type p53 — panel logic, no new reagent | — |

## S8-bis. Head & neck, endocrine (extends base §8)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **AFF2 (C-terminus)** | rabbit anti-AFF2 C-term | Nuclear AFF2 = sensitive & specific surrogate for **DEK::AFF2 sinonasal/skull-base carcinoma** (papilloma-like, deceptively bland, aggressive); replaces FISH triage | LDT |
| **IDH2 R172 (multi-specific)** | MsMab-1 / 11C8B1 | IDH2-mutant SNUC (and rare gliomas); imperfect sensitivity — NGS confirms negatives | LDT |
| **NRAS Q61R** | SP174 | RAS-like thyroid neoplasms; melanoma adjunct | LDT |
| **p27/CDKN1B** | SX53G8 | MEN4 workup; pituitary/parathyroid context | LDT |
| NUT scope note | C52B1 (on menu) | Extend NUT IHC beyond NUT carcinoma: NUTM1-rearranged porocarcinoma/adnexal and sarcomas | — |

## S9-bis. Hematopathology (extends base §9)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **BOB1 / OCT2** | SP92 (or TG14) / Oct-207 | B-cell program integrity: CHL (dim/lost) vs NLPHL/PMBL/LBCL | T2 |
| **CD200** | e.g., UMAB223 | CLL (+) vs MCL (−); HCL (+) | T2 |
| **MNDA / IRTA1** | 253A / rabbit mAb | Marginal-zone vs follicular lymphoma | T2 |
| **HGAL (GCET1) / LMO2** | MRQ-49 / SP51 | Germinal-center program (Hans-plus algorithms) | T2 |
| **CXCL13 / ICOS** | polyclonal / SP98 | TFH phenotype — AITL/nodal TFH lymphoma (with PD-1, CD10, BCL6) | T2 |
| **TCF4 (E2-2)** | rabbit mAb | BPDCN (with CD123, TCL1) | LDT |
| **TBX21 (T-bet) + GATA3** | 4B10 + L50-823 | PTCL-NOS TBX21 vs GATA3 subtyping (prognostic; entering trials) | LDT |
| **NPM1 (cytoplasmic)** | clone 376 | Cytoplasmic dislocation = NPM1-mutant AML surrogate on trephines | LDT |
| **CD19** | e.g., BT51E | Antigen-escape assessment post-CAR-T/blinatumomab (report presence/loss) | LDT |
| **CD79b / CD22** | mAbs | Polatuzumab / inotuzumab target documentation on request | R→LDT |
| **BCMA** | mAbs | Myeloma CAR-T/bispecific target — no validated clinical IHC selection assay yet | R |

## S10-bis. Soft tissue & bone (extends base §10)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **SS18-SSX (fusion junction)** | **E9X9V** | Synovial sarcoma: ~100% specific, ~95% sensitive; diffuse strong nuclear | T2 |
| **SSX (C-terminus)** | **E5A2C** | ~100% sensitive, ~96% specific; run as a pair — concordant staining can **replace FISH/NGS in most cases**; false negatives in decalcified/poorly fixed small biopsies | T2 |
| **CCNB3** | rabbit polyclonal | BCOR::CCNB3 sarcoma (with BCOR C-10) | LDT |
| **ETV4** | mAb/polyclonal (per Hung et al.) | CIC-rearranged sarcoma (diffuse nuclear; with strong WT1); DUX4 C-terminal Abs remain RUO | LDT |
| **FOSB** | 5G4 | Pseudomyogenic hemangioendothelioma; epithelioid hemangioma | LDT |
| **FOS (c-FOS)** | rabbit mAb | FOS-rearranged osteoblastoma/osteoid osteoma vs osteosarcoma | LDT |
| **DDIT3 (CHOP)** | e.g., 9C8 | Nuclear DDIT3 = FUS/EWSR1::DDIT3 myxoid liposarcoma surrogate | LDT |
| **GLI1** | RUO mAb/polyclonal | GLI1-amplified/rearranged mesenchymal tumors ("gastroblastoma-like", plexiform fibromyxoma spectrum) | LDT |
| **SMARCA2 (BRM)** | polyclonal | Co-loss with SMARCA4 in thoracic/undifferentiated tumors, SCCOHT | LDT |
| Pitfall | — | **NKX3.1 (EP356) is positive in mesenchymal chondrosarcoma** — do not read as prostatic in small-round-cell context | — |

## S11-bis. Neuropathology (extends base §11)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **H3 G34R** | **RM240** (RevMAb) | Diffuse hemispheric glioma, H3 G34-mutant (~90% of G34 cases); context: OLIG2-negative, ATRX loss, p53+ | T2 |
| **H3 G34V** | **RM307** (RevMAb) | The rarer G34V DHG (run both on suspicion; G34M escapes both → sequence) | LDT |
| **p65 (RelA)** | e.g., D14E12; nuclear | ZFTA::RELA ST-ependymoma surrogate: ~100% sensitive / ~92% specific for RELA fusion; combine with L1CAM (more sensitive for non-RELA ZFTA partners) ± cyclin D1; double-negative virtually excludes fusion | T2 |
| **EZHIP (CXorf67)** | rabbit polyclonal (runs on Omnis per RENOCLIP data) | PFA ependymoma: ~93% EZHIP+, remainder H3K27M+ — pairs with H3K27me3 loss; also H3-WT DMG with EZHIP overexpression; germinoma cross-positivity caveat | LDT |
| **BCOR** | C-10 | CNS tumor with BCOR-ITD (also sarcoma/HG-ESS uses) | LDT |
| **YAP1** | 63.7 | ST-EPN-YAP1 (infant); see also thoracic uses | LDT |
| **MB surrogate panel: GAB1, YAP1, filamin A, OTX2** | polyclonal / 63.7 / PM6/317 / rabbit mAb | Provisional medulloblastoma grouping when methylation is unavailable: β-catenin-nuclear=WNT; GAB1/YAP1/filamin A+=SHH; all-neg=group 3/4 | LDT |
| **CRX** | rabbit polyclonal | Retinoblastoma/pineoblastoma photoreceptor lineage | LDT |
| **PrP (prion)** | 3F4, KG9, 12F10 | CJD surveillance IHC (PrP^Sc deposition patterns). Formic-acid pretreatment, dedicated processing/instrument decontamination, national-surveillance linkage — a defining reference-lab obligation | T2 |

## S12-bis. Dermatopathology (extends base §12)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **MCPyV large T** | **CM2B4** | Merkel cell carcinoma: virus-positive vs virus-negative (UV-driven, TTF-1-independent CK20-dot context); etiologic + prognostic | T2 |
| **5hmC** | rabbit polyclonal | Global loss favors melanoma over nevus; nevoid melanoma adjunct | LDT |
| **MxA** | mAb/polyclonal | Type-I interferon signature — dermatomyositis skin (and muscle, see S-NM) | LDT |

## S13-bis. Nephropathology (extends base §13)
| Marker | Clone / format | Use | Status |
|---|---|---|---|
| **NELL1** | rabbit polyclonal | 2nd most common MN antigen after PLA2R (~13–16% of PLA2R-negative MN); segmental GBM pattern, IgG1-dominant; associations: malignancy, bucillamine, lipoic acid | T2 |
| **EXT1 + EXT2** | rabbit polyclonals | ~12% of PLA2R-negative MN; autoimmune/membranous-lupus association; bright granular GBM | T2 |
| **Sema3B / PCDH7 / NCAM1 / HTRA1** | polyclonals | Minor MN antigens (Sema3B pediatric) — batch on request | LDT |
| **IgG subclasses (IgG1–4)** | HP600x-series mAbs or sheep polyclonals | MN primary-vs-secondary logic (IgG4-dominant=PLA2R type), PGNMID (monotypic IgG3κ), fibrillary GN | T2 |
| **Amyloid typing panel: AA, ATTR, AFib (fibrinogen Aα), ALECT2, κ, λ** | mc1 (AA) + polyclonals | IHC pre-typing of amyloid; **explicit caveat: IHC mistyping risk is real — laser-microdissection mass spectrometry remains gold standard**; DNAJB9 (base menu) covers fibrillary GN | T2 |

## S-NM. Neuromuscular orphan-disease panel (NEW section)
The single largest orphan-disease IHC block a national reference lab should own. Classic clones are Leica/Novocastra heritage; many now validated on FFPE, but keep a frozen-section IF track for dystroglycan and service continuity.
| Marker | Clone(s) | Use |
|---|---|---|
| Dystrophin rod / C-term / N-term | **DYS1 (Dy4/6D3) / DYS2 (Dy8/6C5) / DYS3 (Dy10/12B2)** | DMD (absent) vs BMD (reduced/patchy); all three domains mandatory |
| α/β/γ/δ-sarcoglycan | Ad1/20A6, βSarc/5B1, 35DAG/21B5, δSarc3/12C1 | Sarcoglycanopathies (LGMD R3–R6); secondary reductions cross-panel |
| Dysferlin | NCL-Hamlet | LGMD R2 / Miyoshi |
| Merosin (laminin-α2) | Mer3/22B2 | MDC1A congenital dystrophy |
| Emerin | 4G5 | X-linked Emery-Dreifuss (nuclear rim loss) |
| Caveolin-3 | mAb/polyclonal | LGMD 1C / rippling muscle |
| Spectrin | RBC2/3D5 | Sarcolemmal integrity control for every run |
| α-dystroglycan | IIH6C4 / VIA4-1 | Dystroglycanopathies (glyco-epitope; frozen/WB support) |
| Utrophin | DRP3/20C5 | Compensatory sarcolemmal upregulation in DMD |
| Fast / slow / neonatal myosin | WB-MHCf / WB-MHCs / WB-MHCn | Fiber typing, grouping, regeneration |
| MHC class I / II | W6/32 / CR3/43 | Sarcolemmal upregulation — inflammatory myopathy screen |
| C5b-9 (MAC) | aE11 | DM capillary deposits; IMNM sarcolemmal deposits |
| **MxA** | mAb/polyclonal | Sarcoplasmic MxA = sensitive/specific DM interferon signature |
| p62 + TDP-43 | 3/P62-lck + phospho/std | IBM rimmed-vacuole pathology (with COX/SDH histochemistry) |
| CD56/NCAM (reuse) | 123C3 | Regenerating fibers |

## S-EB. Epidermolysis bullosa antigen mapping (NEW section)
IF mapping (frozen preferred) localizes the split and the deficient protein — genotype-guiding orphan service.
| Target | Clone | Disease level |
|---|---|---|
| Keratin 5 / 14 | XM26 / LL002 | EB simplex (basal keratinocyte) |
| Plectin | mAb (e.g., 10F6) | EBS with muscular dystrophy |
| Integrin α6/β4 | mAbs | JEB with pyloric atresia |
| Laminin-332 | **GB3** | Junctional EB (lamina lucida) |
| Collagen XVII (BP180) | NC16A-domain mAbs | Junctional EB |
| Collagen VII | **LH7.2** | Dystrophic EB (sublamina densa) |
| Collagen IV | CIV22 (base menu) | Floor/roof reference of the split |

## S14-bis. Infectious (extends base §14)
Tropheryma whipplei IHC exists but availability is limited — PAS-D morphology + PCR remains the practical reference pathway; list as send-out/LDT-on-demand only.

## S18-bis. Pediatric (extends base §18)
ALK IHC (D5F3/5A4, already on menu) gains a **neuroblastoma** use: ALK-aberrant NB flagging for lorlatinib-era protocols (report intensity/extent; molecular confirms). PHOX2B, INI1, LIN28A already cover the rest.

## S-R. Research-only horizon (never for clinical selection)
| Marker | Note |
|---|---|
| LAG-3 (17B4 / D2G4O) | Relatlimab context; no CDx requirement |
| β2-microglobulin / HLA-I (EMR8-5) | Immune-evasion phenotyping |
| STK11/LKB1 | IHC unreliable — molecular only |
| CLDN6, B7-H3 (CD276), CD70 | ADC/CAR-T targets in trials |
| PLCG2 (SCLC stem-like), TRIM63 RNA-ISH (renal) | Emerging adjuncts |

---

## Updated menu arithmetic
| Block | New antibodies (approx.) |
|---|---|
| GI/pancreatobiliary/liver | +8 |
| Thoracic (SCLC subtyping, NF2) | +5 |
| GU | +4 |
| Gyn (net of cross-listed) | +2 |
| H&N/endocrine | +4 |
| Hematopathology | +13 |
| Soft tissue & bone | +9 |
| Neuropathology | +11 |
| Dermatopathology | +3 |
| Nephropathology (incl. amyloid panel) | +11 |
| Neuromuscular panel | +19 |
| EB mapping (net new) | +6 |
| Research-only shelf | (+5 flagged R) |
| **Supplement total** | **≈ +95** |

**Combined menu: ~430–460 distinct antibodies** — the top of the 300–500 reference-lab envelope, which is exactly where a *national* center serving all subspecialties should sit. Suggested sequencing: (1) fusion-surrogate sarcoma/CNS block (SS18-SSX pair, H3 G34R/V, p65+L1CAM, BCOR, DDIT3) — highest referral value per antibody; (2) neuromuscular + EB orphan panels — service-defining, low reagent risk (legacy clones); (3) nephropathology antigens + amyloid; (4) subtype-surrogate trio (GATA6/CK17-PDAC, SCLC-TF panel, GPNMB) as trial demand materializes; keep the S-R shelf strictly research-labeled.

## Caveats specific to this supplement
- Surrogate-IHC ≠ genotype: maintain a standing molecular-concordance log; sequence discordant and antibody-negative-but-suspicious cases (e.g., G34M, variant SS18::SSX, non-RELA ZFTA).
- Decalcification and small poorly-fixed biopsies are the dominant false-negative mode for fusion-junction antibodies (documented for E9X9V/E5A2C) — repeat on better material before excluding.
- Polyclonal lot drift is the chief analytic risk (EZHIP, NELL1, EXT1/2, CCNB3, GAB1, amyloid panel): re-verify each lot against index-case controls.
- GPNMB and other MiT-target markers cannot distinguish translocation-driven from TSC/mTOR-driven tumors — report as pathway-level screen.
- Amyloid IHC pre-typing must carry a mandatory LMD-MS recommendation line for therapy-determining cases (ATTR vs AL).
- Prion work requires a segregated workflow, formic-acid protocols, and documented decontamination — plan before offering, not after the first referral.
