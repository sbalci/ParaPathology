---
type: Note
status: Developing
language: en
order: 60
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[OpenFlexure Microscope]]"
  - "[[Micro-Manager]]"
  - "[[Cytomine]]"
  - "[[NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology]]"
  - "[[Considerations for digital pathology displays]]"
  - "[[The pathology report as a boundary object: From clinical communication to computational representation]]"
---

# Telepathology

The practice of pathology at a distance using telecommunications technology to transmit image-rich pathology data (gross photography, static microscopic images, dynamic video streams, or digitized whole-slide images) between remote sites for primary diagnosis, rapid intraoperative frozen-section consultation, second-opinion expert consultation, quality assurance, or education.

---

## Modalities of Telepathology

1. **Static Telepathology (Store-and-Forward):**
   - Pre-selected static photomicrographs are captured at the remote site and transmitted via email, web portal, or PACS/LIMS.
   - *Advantage:* Minimal bandwidth requirement; low cost.
   - *Limitation:* Severe sampling bias — the consulting pathologist is entirely dependent on the fields selected by the remote operator, with zero ability to examine margins, scan low-power fields, or adjust focus.

2. **Dynamic / Robotic Telepathology (Live Remote Control):**
   - A motorized robotic microscope at the remote site is controlled in real time by the consulting pathologist across a network.
   - Pathologists adjust the XY stage position, switch objectives, and fine-tune focal depth (Z-axis) while streaming uncompressed or low-latency video.
   - *Implementation:* Open-source robotic platforms such as the [OpenFlexure Microscope](openflexure-microscope.md) provide sub-100 nm motorized positioning, live streaming, and REST API stage control for under $350, democratizing dynamic telepathology in low-resource settings. Controlled software automation can also be achieved via Micro-Manager.

3. **Whole-Slide Imaging (Virtual Microscopy / WSI):**
   - The entire glass slide is digitized into a high-resolution, multi-resolution pyramidal digital file (e.g., SVS, NDPI, OME-TIFF) and hosted on an enterprise image management system (e.g., [Cytomine](cytomine.md), [Cytario](cytario.md)).
   - *Advantage:* Complete diagnostic freedom to pan and zoom across the entire tissue section, resolving the sampling dilemma.
   - *Infrastructure Needs:* High-throughput network bandwidth, secure cloud or on-premise storage, and calibrated medical-grade diagnostic displays (see [Considerations for digital pathology displays](../Clippings/Considerations%20for%20digital%20pathology%20displays.md)).

---

## Clinical Applications

- **Intraoperative Frozen Section Consultation:** Providing immediate intraoperative margin assessment and tissue adequacy evaluation for community hospitals or ambulatory surgical centers lacking on-site pathologists.
- **Subspecialty Expert Consultation:** Rapid routing of challenging cases (e.g., rare bone and soft tissue tumors, melanocytic lesions, renal medical biopsies) to regional or international academic experts without physical glass slide shipping delays or breakage risks.
- **Global Health & Decentralized Diagnostics:** Deploying automated field microscopes ([OpenFlexure Microscope](openflexure-microscope.md)) in resource-constrained regions for remote malaria screening, tuberculosis identification, and cervical cytology triage.
- **Multidisciplinary Tumor Boards (MDTs):** Projecting high-resolution digitized slides during live hybrid clinical conferences, establishing a shared boundary object between pathology, radiology, surgical oncology, and medical oncology (see [The pathology report as a boundary object: From clinical communication to computational representation](../Clippings/The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md)).

---

## Quality Assurance & Regulatory Considerations

- **Optical & Display Metrology:** Telepathology workstations require standardized ambient illumination, minimum luminance (≥350 cd/m²), and color profile management (see [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](../Clippings/NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md) and [Considerations for digital pathology displays](../Clippings/Considerations%20for%20digital%20pathology%20displays.md)).
- **Diagnostic Validation:** Regulatory frameworks (CAP Guidelines, FDA product codes `QPN` and `QKQ`) require rigorous departmental validation protocols comparing telepathology diagnostic concordance against traditional light microscopy before clinical sign-out.

---

## Resources & Software

- **Open Hardware & Robotic Scanners:** [OpenFlexure Microscope](openflexure-microscope.md), Micro-Manager
- **Viewing & Collaborative IMS:** [Cytomine](cytomine.md), [Cytario](cytario.md), [SlidePeek](http://www.slidepeek.com/)

<!-- tolaria:related:start -->

## See also

* [Considerations for digital pathology displays](../Clippings/Considerations%20for%20digital%20pathology%20displays.md)
* [Cytomine](cytomine.md)
* [Digital Pathology Software](digital-pathology-software.md)
* [NPIC Quality Coordination Centre: Digital Pathology Quality Assurance and Metrology](../Clippings/NPIC%20Quality%20Coordination%20Centre%20-%20Digital%20Pathology%20Quality%20Assurance%20and%20Metrology.md)
* [OpenFlexure Microscope](openflexure-microscope.md)
* [The pathology report as a boundary object: From clinical communication to computational representation](../Clippings/The%20pathology%20report%20as%20a%20boundary%20object%20-%20From%20clinical%20communication%20to%20computational%20representation.md)

<!-- tolaria:related:end -->
