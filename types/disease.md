---
type: Type
_icon: microscope
_color: "#ef4444"
_order: 6
_list_properties_display:
  - related_to
  - status
status:
belongs_to:
related_to:
publish: false
---

# Disease

A specific diagnostic entity — a named disease, tumor, lesion, or reaction pattern carrying morphology, differential diagnosis, biomarkers, and reporting implications — e.g. `colon-colorectal-carcinoma`, `hepatitis-c`, `amyloidosis`, `gliomlar`. Carves the entity-level cases out of the general `Note` bucket. Distinct from `Concept` (a mechanism or idea, not a nameable entity) and `Topic` (a hub *over* many entities). `related_to` links it to its organ/system hub; `status` is derived from word count.
