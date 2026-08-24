---
type: Type
_icon: flask-conical
_color: "#0ea5e9"
_order: 8
_list_properties_display:
  - related_to
  - status
status:
belongs_to:
related_to:
publish: false
---

# Technique

A method, assay, stain, or computational procedure — the *how it is done*, e.g. `immunohistochemistry`, `immunohistochemistry-quantification`, weakly-supervised MIL segmentation. Distinct from `Tool` (a single named program that *runs* a technique, like QuPath) and from `Reference` (a catalog of many resources). `status` is derived from word count.
