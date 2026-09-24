---
type: Type
_icon: scissors
_color: "#22c55e"
_order: 3
_list_properties_display:
  - author
  - published
source:
author:
published:
created:
description:
tags:
belongs_to:
publish: false
---

# Clipping

An external article captured in full, filed under `Clippings/`. Uses the Obsidian Web Clipper schema (`source`, `author`, `published`, `created`, `description`, `tags`) plus `belongs_to` (the Clippings hub) and `related_to` to wire it into the topic graph. A verbatim full-text capture keeps `publish: false` (copyright); an own-words digest with a citation and source link is published as a child of the Clippings hub.
