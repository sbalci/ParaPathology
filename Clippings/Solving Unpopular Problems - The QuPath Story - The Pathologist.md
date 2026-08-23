---
type: Clipping
status: Evergreen
language: en
title: "Solving Unpopular Problems: The QuPath Story"
source: "https://thepathologist.com/issues/2026/articles/july/solving-unpopular-problems-the-qupath-story/"
author:
  - "[[Helen Bristow]]"
published: 2026-07-29
created: 2026-08-18
description: "Meet the developer of the open-source digital pathology platform that's transforming image analysis across the globe. An interview with QuPath creator Peter Bankhead (University of Edinburgh) on the software's accidental origins, the fight to make it open-source, its worldwide research impact, and why he deliberately keeps it out of clinical use."
tags:
  - "clippings"
belongs_to:
  - "[[Digital Pathology]]"
  - "[[Digital Pathology Software]]"
  - "[[Image Analysis]]"
---
## Summary

An interview (by Helen Bristow, *The Pathologist*, 29 July 2026) with **Peter Bankhead**, Reader
at the Institute of Genetics and Cancer, University of Edinburgh, and creator of **QuPath** — one
of the world's most widely used open-source image-analysis platforms for digital pathology
research. The QuPath team was recently given a Royal College of Pathologists team award for
innovation. The piece frames QuPath's success against a road "beset with false starts,
administrative battles, rejection, and frustration."

> "When I started in digital pathology, I felt the lack of a pathology-friendly open-source
> platform was a big problem." — Peter Bankhead

## Origins — an accidental platform

- Bankhead entered digital pathology as a postdoc in **2012**. His background was retinal image
  analysis (PhD) and three years as an image analyst in a microscopy facility; he hadn't
  appreciated how large and complex whole-slide images could be, and existing tools weren't
  designed for them.
- He spent ~2 years trying to adapt image-analysis tools to **score IHC biomarkers in tissue
  microarrays** — largely unsuccessful because the plugins/scripts he wrote were hard to use.
- He eventually set out to write a whole-slide image viewer "mostly to prove to myself it
  wouldn't work." With the help of **OpenSlide** (an open-source library for reading pathology
  image formats), the viewer quickly became useful; adding analysis features on top of it grew
  into QuPath.

> "It wasn't planned, and it only happened because not writing QuPath hadn't worked very well."

## Setbacks

- Bankhead had to **fight to make QuPath open-source** — permission to release it was granted
  only after he resigned his postdoc, during his notice period. When a later job stopped him
  continuing the work (even in his spare time), he left that too, and spent some months
  unemployed.
- The main QuPath paper was **rejected by at least five journals** without being sent for peer
  review, considered unlikely to have much impact. These years, though exhausting, made him less
  concerned with conventional measures of success.

## Reach and impact

- The main paper was eventually published in **Scientific Reports** and has been cited **>6,000
  times** (>1,500 new citations last year alone) — an undercount, since many studies use QuPath
  without citing it.
- The software has been **downloaded over a million times**, used across academia and industry
  and worldwide across many diseases; one major tech company even featured QuPath in product
  launch videos.

## How it is used

- Many projects involve **detecting and classifying cells** in WSIs by morphology, staining, or
  both. Its application to **Ki67** is well established (identify tumour vs non-tumour cells by
  morphology, then compute the % of tumour cells positive by staining).
- Crucially, QuPath has **no dedicated Ki67 algorithm** — it provides image-processing and
  machine-learning **building blocks** for custom algorithms, which is what makes it flexible.
  It's not limited to cells or to WSIs (projects include fluorescence confocal z-stacks and
  electron microscopy). Bankhead has personally used it to digitise a family photo album; he's
  heard of it being used on fossils and to quantify the fracture behaviour of cheese.

## Community and ecosystem

- A small core team (never more than a few people) with a much larger user community — tens of
  thousands of posts across **>5,500 topics** on the Scientific Community Image Forum.
- The team keeps writing the core software themselves and encourages others to build
  **extensions** rather than fork:
  - Collaboration with **Joel Saltz's group at Stony Brook** (esp. Jakub Kaczmarzyk) to run AI
    models interactively.
  - An extension for **InstanSeg**, a fast, accurate AI model for nuclei/cell detection created
    by Thibaut Goldsborough (a PhD student in Bankhead's group); other developers have integrated
    it into their own software.
  - **OpenMicroanatomy** and its **QuPath Edu** component, an open-source teaching platform built
    by medical student Aaron Yli-Hallila (University of Oulu, Finland), used to teach medical
    students in Finland for years, with pilots in South Africa and Namibia.

## Future

- Two developers currently work on QuPath's code — Bankhead and **Alan O'Callaghan** (research
  software engineer/postdoc). They have a backlog of ideas for the era of **AI, multiplexed, and
  multidimensional imaging**, and a year or two of funding to implement them.

## Why open-source

- Bankhead's career was built on open-source software (ImageJ, about which he wrote an open
  handbook). He saw the lack of a pathology-friendly open platform as "incredibly — even
  unethically — inefficient": in-house/proprietary tools made it impossible to verify claims,
  reproduce results, or reuse methods.
- He understands why companies and academics are reluctant to open their code (business case;
  fear of exposed bugs; the time cost of documentation; the career disincentive to polish rather
  than publish) — which is precisely why no one had built one, and why he was determined his own
  software would be open.

## On clinical use (a deliberate "no")

- Bankhead does **not** want QuPath or a derivative approved for clinical use. Adapting it for the
  clinic would make it less flexible for research and introduce legal/regulatory burdens better
  handled by companies. He argues the work helps patients and pathologists more effectively by
  keeping its research priorities.

> "If a problem already gets a lot of attention, then I'd rather spend my time on something else."

## On impact and AI caution

- He believes QuPath has helped labs make substantial cost/efficiency savings — making some
  studies possible and others unnecessary — and hopes it improved research culture around openness
  and reproducibility. Because everything is open, "it makes little sense for anyone to publish
  something new and worse"; open software raises the baseline rather than competing for users.
- On AI-augmented image analysis, he urges caution: the important questions are about *how* the
  technology is used and *who* benefits (he welcomes studies of automation bias), and there's a
  "huge difference between a proof-of-concept published in a journal and a genuinely useful
  software tool."

> "If you're a pathologist, I hope you won't trust what computationally minded people like me
> claim our tools can do. Rather, I hope you'll try them out where you can, engage critically,
> ask awkward questions, and help shape how the field continues to develop."

## Source

- [Solving Unpopular Problems: The QuPath Story](https://thepathologist.com/issues/2026/articles/july/solving-unpopular-problems-the-qupath-story/) — Helen Bristow, *The Pathologist*, 29 July 2026 (Interview, ~8 min read).
