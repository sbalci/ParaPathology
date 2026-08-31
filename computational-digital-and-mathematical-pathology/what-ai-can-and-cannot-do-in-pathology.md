---
type: Note
status: Evergreen
language: en
belongs_to: "[[Digital Pathology]]"
related_to:
  - "[[Image Analysis]]"
  - "[[Articles on computational, digital, and mathematical pathology]]"
url: https://www.youtube.com/watch?v=IvHNQDGiElE
speaker: Dr. Rajendra Singh
source_type: video
aliases:
  - "What AI Can and Cannot Do in Pathology"
publish: false
---

# What AI Can and Cannot Do in Pathology

**Speaker:** Dr. Rajendra Singh, MD — Professor of Pathology and Dermatology and Associate Vice-Chair for Digital Pathology, University of Pennsylvania Perelman School of Medicine; founder of PathPresenter
**Host:** pathCast (interviewer's name not reliably recoverable from the captions)
**Recorded:** 2026-08-18 · **Runtime:** 1h 01m
**Video:** [YouTube: IvHNQDGiElE](https://www.youtube.com/watch?v=IvHNQDGiElE)

{% embed url="https://www.youtube.com/watch?v=IvHNQDGiElE" %}

> **How this note was made.** Summarised from the **auto-generated English captions**, retrieved
> 2026-08-31. This was a slide-and-demo talk: Singh repeatedly says "here is a model", "I'll show
> you", and a ~26-second stretch around 00:20:05 is a silent demo playback. **Nothing displayed on
> screen is captured here** — no slide text, no numbers from figures, no demo output. Machine
> transcription also mangles proper nouns, so names below are verified against outside sources or
> described functionally; where neither was possible this is said explicitly. Timestamps are
> approximate. Claims are attributed to the speaker, not asserted as fact.

---

## The thesis

Not "will AI replace pathologists?" Singh answers that in the first three minutes — **no**, and
he repeats it at the close ("most likely not, not in our lifetimes"). The talk's real argument is
the one he builds toward instead (~00:27:01):

> "AI is not going to replace us. But definitely, if we don't take charge, we are going to be
> **bypassed** — which is already happening right now."

Everything else is scaffolding for that. The risk he is describing is not technological
displacement but **disintermediation**: work that begins with the pathologist's tissue ending in a
report the pathologist never touched.

He closes on the same point in generational terms (~00:38:20): this is “the first generation of
pathologists and maybe the last” that can change how pathology is practised — “because if we do not
do it, somebody else will do it for us.” Diagnosis, in his formulation, should be “not the end of our
work” but the beginning of a larger role.

---

## The economic core of the talk

This is the part that distinguishes it from the standard AI-in-pathology lecture, and it runs from
roughly 00:24:10 to 00:29:32, with a longer restatement in the Q&A (~00:53:06).

Singh's account of the current arrangement: a department sends a slide out to a commercial
vendor — he names **Tempus**, **Caris**, **Artera** and **Castle Biosciences** — the vendor runs
its model and returns a report, and the prediction "is directly sent to the oncologist." The
pathology department's entire contribution is **shipping the slide**. "We should try to stop that."

His proposed alternative is not to compete on model building:

> "Let them build the models — you are good at that, do that. But how do you govern those models?
> How do you interpret them? How do you make sure they're explainable? That can be done by the
> pathology department."

The leverage he identifies is ownership: "you are the owner of the data — the pathology data, the
blood data, the molecular data, all the grossing." Hence the recurring line, **"this is ours for
the taking"** — paired with the warning that it requires the profession to "step up to it."

The second, independent argument for the same conclusion is technical rather than territorial: a
vendor model "has been validated with their own data, it has not been validated with data from my
own institution." So the model should be brought **into** the department and re-validated locally
before use. He applies this even to cleared products — "even if it's an FDA approved system, we
are going to take our own data that we already know the results of and then validate."

He also frames a concrete ask: extend the pathology report itself beyond diagnosis to carry
morphological biomarkers, treatment-response and recurrence predictions, molecular inference and
trial eligibility — and to do that by working with **CAP**, **CMS** and the DPA.

---

## What AI can do

Singh frames the opportunity with a time budget (~00:04:14): about **60%** of the working day is
spent on the microscope or screen reaching a diagnosis, and the remaining **40%** on work "we were
not trained for" — hunting prior history, measuring, counting mitoses, looking for organisms,
ordering ancillary studies, coding and correcting reports. AI's near-term value is removing that
friction, and his verbs for it are **augment, validate, orchestrate, route, and govern**.

In the Q&A he refers back to "all these seven steps that I showed you in the back end." That
enumeration was on a slide and is not recoverable from audio; the grouping below is drawn from
what he described in narration, not from his slide.

**Before the pathologist arrives** (~00:07:28) — the lab and the AI have already run overnight:

- **QC across all slides**, producing a chart of slide quality.
- **Tissue-presence check** — catching the case where tissue was cut but did not reach the glass.
- **Automatic orientation** — in skin, a model his group built puts the epidermis at the top every
  time, removing the manual rotate step.
- **Automatic rescanning** of a bad slide before 7:45 a.m., so a quality problem is not discovered
  at 3 p.m.
- **Triage and ordering** of the worklist — stat versus routine, likely-cancer versus likely-benign.

**During sign-out:**

- **Pulling clinical context** — matching the slide to the EHR record and surfacing gross images,
  clinical images, history and prior slides, so the pathologist is not hunting across systems.
  His example is the dermatopathology scar, which cannot be signed out as "dermal scar" without
  knowing what was previously excised.
- **Measurement and detection** — Breslow thickness, mitotic figures, and flagging organisms.
  The organism example he gives is **acid-fast bacilli / atypical mycobacterial infection**.
- **Prediction from morphology** — models inferring **BRAF** and **NRAS** status from the slide,
  and prognostic models. He demonstrates a commercial melanoma prognostic tool that predicts
  metastasis risk from features beyond the two classical prognostic variables, Breslow thickness
  and ulceration. *The vendor's name is garbled in the captions and could not be verified; it is
  deliberately not guessed here.*

**Reporting and afterwards:**

- **Drafting** from dictated or typed input — with an explicit caveat he states twice: **do not
  enter PHI into public chatbots**.
- **Error catching before sign-out** — laterality (his worked example: "left arm" in the history
  against "right arm" in the diagnosis), site, gender, missing fields, unreported IHC, and
  suggested **ICD and CPT** codes.
- **Structured extraction at the point of storage** — a system in development at Penn that parses
  each report before archiving it, so a melanoma report's Breslow thickness and mitotic rate become
  searchable fields. His stated payoff is a real cohort search: patients with metastatic melanoma
  in lymph nodes, given neoadjuvant therapy, with >50% viable tumour remaining, carrying a *BRAF*
  mutation — a query that normally means crossing the LIS, the clinical record and the molecular
  system. The report stops being a stored PDF and becomes "a continuously improving data asset."
  *(He gives the speed-up as months-to-hours in one breath and "normally takes hours... now in
  hours" in the next; the captions contradict themselves and the figure is not reliable.)*

### The framing worth carrying away: "think of AI as a fellow"

Singh returns to this three times, and it is the most portable idea in the talk. A fellow triages
your cases, and a fellow is sometimes wrong — that is understood, and it does not make the fellow
useless. If a triage model is right **80%** of the time, then for 80% of cases the stains and
molecular tests get ordered in the morning instead of the evening, and those reports are not
delayed. The remaining 20% cost you nothing you were not already paying, **because you were always
going to look at every case yourself.**

The corollary is that a tool does not need to be near-perfect to be worth deploying, provided the
pathologist remains the decider — which is exactly the condition his governance argument protects.

---

## What AI cannot do

Singh separates this into a failure-mode argument and a judgment argument.

### It breaks where the data runs out

- **Narrow training distributions.** Models that "work spectacularly in a controlled environment"
  often come from a handful of academic centres in the US or Europe. He raises **skin tone** as the
  specific diversity failure in his own field — models "don't perform well on the skins they have
  not been trained on."
- **Site and equipment shift.** Different scanner, different magnification from the one used in
  validation, and performance moves.
- **Garbage in.** "The AI will only work if the data is as pristine as that used for the training."
- **The taxonomy keeps moving.** WHO blue books add entities the model has never heard of. He notes
  that even mature prostate cancer models have known blind spots for specific subtypes — "whenever
  there is some kind of a different kind of morphology, the AI is not going to work."

### It cannot be answerable

This is the sharper half, and it is not a capability claim — it is a claim about accountability.

- **No licence, no liability.** "The AI doesn't have a licence to say that what I'm saying is
  accurate." The pathologist is responsible for the AI's result. Sign-off cannot be delegated.
- **It cannot express uncertainty honestly.** A pathologist can write that a case is genuinely
  difficult, say why, note that colleagues have seen it, and still give the best actionable
  answer. Singh's charge is that AI "will always say with confidence, 'this is diagnosis X and
  treat it this way'" — it "always tries to give a black and white report, and it is not
  answerable."
- **It has no common sense.** His example: a lesion that looks like melanoma in a 3-year-old
  demands far more work before you call it, because the prior is so low.
- **It cannot make a judgment that is about the patient rather than the tissue.** His central
  illustration — a 91-year-old with recurrent metastatic melanoma approaching the margin. Reporting
  it as extending to the margin triggers another operation of no benefit at that age, so he writes
  **"narrowly excised"** instead. *Worth flagging: this is a more contested practice than the talk
  presents it as — wording chosen to steer management, rather than the clinical conversation
  happening explicitly. It is offered here as his example of judgment, not as a recommendation.*

> "Your judgment is the scale that the AI doesn't have... that judgment is always going to be the
> scarcest resource in pathology."

---

## "Invisible, but audited" — the governance principle

The most quotable structural idea in the talk (~00:35:39), and the one most directly reusable in
a departmental AI policy:

**AI may be invisible in the workflow. It may not be invisible in the record.**

Singh is explicit that back-end AI *should* be unobtrusive — cases ordered, organisms marked,
orientation fixed, all before the pathologist opens anything. But invisibility in the interface
must not mean absence from the audit trail:

- What **model** ran, and what **version**.
- What data it was trained on.
- Whether the whole flow that led to a conclusion can be **reconstructed after the fact** if
  something goes wrong.

> "The interface can disappear, but — as a pathology department — the evidence cannot."

> "You cannot make invisible un-audited."

The governance layer, in his framing, is owned by pathology — not by the vendor and not by the
hospital's IT function.

---

## From the Q&A

- **Where to start without regulatory exposure.** The back-end steps — triage, QC, context
  retrieval, report assembly and error checking — "do not actually require an FDA validation."
  Begin there, then move to interpretive models. He puts the number of FDA-cleared pathology
  models at "only two or three", with the rest research-use-only.
- **Digital first.** "We need to go digital before we can go AI." Without digitisation, none of
  the downstream benefit exists.
- **A switch for trainees.** His concrete implementation recommendation: require that any
  diagnostic AI can be **turned off**, so residents learn on the unassisted system first and
  graduate to the assisted one. He advises asking vendors for this explicitly. He names automation
  dependence in trainees as a real risk — "they might become too dependent."
- **Skills for trainees.** "You don't have to learn coding at all" — he says he does not write a
  line of code. What he does urge is fluency with current LLM tooling, and building a private,
  source-grounded chatbot over literature you have already read and trust, rather than relying on
  a general chatbot. He describes doing exactly this for his own 20 years of papers and books, with
  citations back to source documents and a knowledge graph clustering related material (his
  example: Melan-A, S100 and MART-1 grouping as melanocytic stains). *He names the assistant and a
  collaborator, but the captions render both inconsistently, so neither is reproduced here.*
- **Cytology lags for a structural reason.** Not subtlety of detail — a lack of consensus on
  whether to scan **z-stacks** or collapse layers into a single plane, with scanner and AI vendors
  each promoting their own approach. He says the same applies to haematopathology.
- **On replacement.** He answers the radiology comparison directly: the prediction that
  radiologists would be obsolete was made around 2012–2015, "today is 2026 and there is a shortage
  of radiologists." His argument is that variation within a single diagnosis is invisible to
  outsiders, and that 80–90% accuracy will never be permitted to run unsupervised, "because if it
  is wrong for one patient, it is wrong 100% for that patient."
- **Will pathologists become supervisors of AI?** He concedes this is the likely long-run
  evolution rather than denying it — which is why he pivots straight back to owning the governance
  layer.

He also declares his own conflict at the outset (~00:01:24): "I am not a neutral observer" — much
of the technology discussed is integrated into PathPresenter, which he founded. Read the
capability claims with that in view.

---

## One claim checked against primary sources

Singh's worked example of AI generating information *beyond* diagnosis — and of that information
flowing around the pathologist — is a prostate test that combines the digital slide with clinical
variables such as PSA and Gleason pattern to predict benefit from androgen deprivation therapy.
The captions render the vendor three different ways ("Arteria", "Arteria AI", "Arterys"). The
correct name is **ArteraAI** (Artera, Inc.); "Arterys" is an unrelated radiology company.

His regulatory claim checks out, and is worth recording precisely because it sits awkwardly beside
his later "only two or three" remark — both are true:

| | |
|---|---|
| **ArteraAI Prostate** | **De Novo** authorisation **DEN240068**, decision date **2025-07-31** |
| Regulation / product code | 21 CFR 864.3755, product code SFH, **Class II** |
| FDA generic device name | "Pathology Software Algorithm Device Analyzing Digital Images For Cancer Prognosis" |
| Advisory committee | **Pathology** |
| Follow-on | **ArteraAI Breast**, 510(k) **K254115**, cleared **2026-05-04** |

*Source: openFDA device endpoints, queried 2026-08-31.* A De Novo creates a new device
classification, which is what allowed the breast product to clear by 510(k) afterwards. Singh's
claim that the test entered the **NCCN prostate guidelines** was not independently verified here.

The detail that makes his argument concrete: this runs off the digital slide with **no additional
tissue and no additional stain** — nothing needs to be recut or re-stained. There is therefore no
technical step at which the pathology department must be re-involved.

---

## Why this matters

- **It reframes the threat.** The question a department should be asking is not "will AI replace
  me" but "is the interpretive layer on top of my tissue being built and billed somewhere else."
  Replacement is a distraction; bypass is measurable and already happening.
- **Local validation is the actionable demand.** Regulatory clearance is a floor, not a
  substitute for testing a model against your own scanners, stains and case mix. This is the
  practical bridge between the governance argument and daily work.
- **The immediate wins are unglamorous.** QC, triage, context retrieval, coding and error catching
  need no clearance and touch the 40% of the day that is not diagnosis.
- **The audit requirement is a design constraint, not a policy afterthought.** "Invisible but
  audited" has to be specified when the system is procured — including the trainee on/off switch.

## How it connects

- [Digital Pathology](./digital-pathology.md) — the parent hub; digitisation as the precondition
  Singh insists on before any AI discussion.
- [Image Analysis](./image-analysis.md) — the measurement tasks (mitoses, Breslow thickness,
  organism detection) he treats as already solved enough to use.
- [Articles on computational, digital, and mathematical pathology](./articles-on-computational-digital-and-mathematical-pathology.md)
  — the literature behind the generalisation failures he describes.
- [Digital Pathology Software](./digital-pathology-software.md) — tools catalogue, including
  entries whose validation claims are worth reading against his local-validation argument.

## Open questions this leaves

1. The "seven steps" slide is not recoverable from audio — worth reconstructing if slides are
   released.
2. NCCN inclusion of the ArteraAI prostate test is asserted in the talk but unverified here.
3. The melanoma prognostic vendor is unidentified; the claim that it outperforms Breslow thickness
   and ulceration is unexamined.
4. He offers no method for *how much* local data validates a vendor model — he explicitly defers
   this to "an entire different talk". That is the gap between the argument and its execution.
