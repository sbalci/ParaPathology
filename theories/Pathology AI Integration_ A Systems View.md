---
type: Note
status: Evergreen
language: en
review_status: Partial
last_reviewed: 2026-09-28
aliases:
  - "Theoretical Frameworks in Digital Pathology: AI Integration, Complex Adaptive Systems, and the Cognitive Ecology of the Laboratory"
order: 30
belongs_to: "[[Theories and Frameworks]]"
---

# Pathology AI Integration: A Systems View

**Theoretical Frameworks in Digital Pathology: AI Integration, Complex Adaptive Systems, and the Cognitive Ecology of the Laboratory**

## Review scope and evidence status

This note is a **conceptual narrative synthesis**, not a systematic review or an empirically validated model of AI adoption. Attractor states, immune responses, and laboratory ecology are explanatory metaphors here. Their causal role in a particular implementation requires observable measures and testing; adoption failure does not establish that a laboratory is protecting patient safety.

The targeted review on 28 September 2026 checked the nature of the M–C–R paper, Kusta et al.’s qualitative observations, Mikkelsen et al.’s pre-implementation survey, and the original cervical-cell fractal study. It qualified claims about System 1, clinical accuracy, biological necessity, and PreMiSTS, and removed a duplicated theory list. The original numbered bibliography is retained for provenance, but it is **not fully verified at claim level**. Commercial pages, teaching material, and research in other specialties do not establish pathology diagnostic benefit. The detailed ANT applications, cognitive mechanisms, most biological analogies, and current product or legal assertions remain source-verification tasks.

Compare the evidence distinctions in [[Theoretical Frameworks for Understanding Pathology Practice]] and [[Theories and Frameworks for Understanding Pathology Practice]]. For study appraisal and implementation evidence, see [[digital-pathology-evidence]].

The integration of artificial intelligence (AI) and digital imaging changes the technical and social organization of the diagnostic pathology laboratory. Contemporary critiques of digitization examine how new software interacts with established clinical practices. This ecosystem has stabilized over generations around hematoxylin and eosin (H\&E) workflows, glass slides, and the physical microscope.1 Since the inception of modern histopathology, practitioners have forged collaborative networks through peer-reviewed journals, reference texts, multidisciplinary tumor boards, and rigorous medical training paradigms. Together, these elements can be described metaphorically as a stable pattern of practice, or an "attractor state." The analogy can help generate questions about persistence and change, but does not show that established routines are uniformly safe or optimal.
Introducing algorithmic tools can alter interdependent tasks, roles, and infrastructure. A Complex Adaptive Systems (CAS) lens suggests that established routines and feedback may help explain resistance or adaptation. This is a **conceptual hypothesis**, not evidence that most AI failures are protective responses. Inadequate model performance, workflow mismatch, resources, usability, and governance can each contribute. Their relative importance must be investigated in the actual setting. [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6); [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650).
Developers and clinical leaders can use theoretical frameworks to identify questions for local implementation research. They must look beyond software engineering and comprehend the laboratory in terms of workflow ecology, temporal coordination, trust synchronization, liability redistribution, clinical behavior, and system equilibrium. By synthesizing Complex Adaptive Systems theory, Gestalt psychology, Dual-Process theory, Chaos theory, Distributed Cognition, Actor-Network Theory (ANT), and the Systems Engineering Initiative for Patient Safety (SEIPS), this note offers a selective, multi-dimensional interpretation of pathology practice and potential friction during digital transformation.

## **Pathology as a Complex Adaptive System (CAS)**

Complex Adaptive Systems theory provides one possible lens for analyzing healthcare organizations. In the late 1990s and early 2000s, healthcare management underwent a paradigm shift from mechanistic, top-down approaches toward dynamic models that recognized clinical environments as complex, adaptive, and highly interdependent systems.4 A CAS is characterized by macroscopic behaviors that emerge from non-linear, localized interactions among a multitude of individual components—in this case, pathologists, technicians, histological specimens, laboratory information systems (LIS), and governing regulations.

### **Attractor States and Systemic Perturbations**

In dynamical systems theory, an attractor is a set toward which trajectories from a basin of attraction tend over time; this does not imply convergence from every starting condition. Describing microscope-based pathology as an attractor is an analogy unless system states, dynamics, and measurable stability are specified. Glass slides, focusing, and multi-headed consultation support familiar practices, but familiarity does not establish diagnostic truth or error-free performance.
A digital platform or AI algorithm may disturb established routines. A testable hypothesis is that poorly matched workflows, training, or infrastructure increase workarounds and encourage return to familiar methods. The laboratory has no single intention or perception: adoption decisions emerge from people, resources, policies, and technical performance. Qualitative findings can motivate this hypothesis, but do not demonstrate a universal CAS rejection mechanism. [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650).

### **The Model–Context–Relation (M–C–R) Alignment Framework**

Di Vita et al.’s Model–Context–Relation (M–C–R) framework is a **conceptual and theoretical review**; it generated no new patient-level data. It proposes that AI impact depends on alignment among algorithmic, contextual, and relational dimensions. The pathology applications in the table are this note’s interpretation, not validated requirements or a tested prediction rule. [Di Vita et al., 2025](https://doi.org/10.3390/app152212005).

| Dimension of M-C-R | Theoretical Definition in Diagnostic Pathology                                                                              | Proposed considerations for integration                                                                                                      |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**          | The underlying algorithmic logic, computational output, data structures, and mathematical predictive capacity of the AI.    | Must demonstrate high accuracy across heterogeneous histological data without acting as an opaque "black box." Must adapt to dynamic disease presentations.  |
| **Context**        | The operational, clinical, regulatory, and infrastructural environment in which the technology is deployed.                 | Must integrate seamlessly into the Laboratory Information System (LIS), accommodate temporal coordination constraints, and align with data governance laws.  |
| **Relation**       | The human and institutional interactions, professional roles, ethical oversight, and inter-specialty trust synchronization. | Must operate as a cognitive partner rather than an autonomous decision-maker, preserving the physician's role as the custodian of uncertainty and liability. |

Under this conceptual framework, computational metrics such as AUC and pixel-level accuracy remain relevant but are insufficient to describe system-level value. Evaluation would also examine workflow outcomes, user behavior, and organizational effects. Neglecting context or professional relationships may impede adoption, but the paper does not establish a deterministic rejection response or prove the framework’s effectiveness in pathology.3

## **Workflow Ecology and Temporal Coordination**

The pathology laboratory is not merely a workspace; it is a highly sensitive workflow ecology. An ecology, in this sense, refers to the delicate balance of tasks, spatial arrangements, human resources, and data streams required to transform raw biological tissue into actionable oncological intelligence. Introducing AI may redistribute tasks and resources within this workflow.

### **The Dynamics of Temporal Coordination**

A critical sub-component of workflow ecology is temporal coordination. Clinical diagnostic activities are inseparably bound up with time, and interdependent cooperative activities must be flawlessly synchronized.6 The concept of temporal coordination, deeply rooted in Activity Theory, explores the socio-temporal constraints, interests, and conflicts that arise when work is subjected to strict clinical turnaround times.6  
In a traditional workflow, the temporal rhythm is dictated by the physical movement of glass slides from the grossing room to the staining machines, and finally to the pathologist's desk. The pathologist establishes a rhythmic pacing style to review these slides. If a digital AI tool is introduced, it must respect this temporal coordination. For example, manual image upload, batch scheduling, and cross-referencing output in another viewer could add delay; this is an illustrative scenario, not a measured finding. The original reference 7 concerns urban pickup scheduling and does not support pathology workflow claims. Acceptable latency depends on intended use: precomputed triage and interactive assistance have different timing needs. This note has no evidence for a universal millisecond requirement.
Furthermore, temporal coordination impacts "attentionality"—how practitioners focus their perception and cognition to sense learning opportunities over time.9 Digital tools reshape what professionals attend to visually, refining the clinical gaze.9 However, this perceptual shift must be carefully managed to avoid disrupting the established ecological balance of the laboratory.

## **Gestalt Theory and the Epistemology of Visual Diagnosis**

To fully understand why clinical behavior in pathology is so resistant to algorithmic disruption, one must analyze the epistemology of the diagnostic process itself. The fundamental mechanism by which expert pathologists render diagnoses is frequently described through the lens of Gestalt psychology.

### **The Principle of Pragnanz and Holistic Pattern Recognition**

The term "Gestalt" in pathology refers to the expert physician's ability to recognize complex patterns of disease—such as the subtle morphological changes indicative of malignancy—holistically, rather than by exhaustively and mathematically analyzing every individual cell.10 The human brain is evolutionarily optimized for aspectual shifts, allowing it to abstract general forms and relationships from a single, complex visual sample.11  
Within Gestalt theory, the principle of *Pragnanz* functions as the visual equivalent of Occam's razor. When visual stimuli are ambiguous, overlapping, or incomplete—as is often the case with crowded H\&E stained tissue sections—the brain intuitively and subconsciously draws conclusions to form the simplest, most logical overall pattern.10 Pattern recognition is an important component of pathology reasoning. The earlier assertion of an average highly accurate diagnosis within 20 seconds has not been verified and should not be treated as a general performance benchmark. Visual-search research examines case difficulty, experience, and viewing behavior rather than a universal diagnostic time. [Brunyé et al., 2017](https://doi.org/10.1016/j.jbi.2017.01.004). Once the essential structure is recognized, the pathologist employs a Socratic questioning procedure, mentally breaking down the initial biopsy problem into lower-order problems that can be solved through targeted immunohistochemistry or clinical history review.11

### **Trust Synchronization vs. Algorithmic Fragmentation**

AI can change how pathologists attend to images and calibrate trust. Here, "trust synchronization" refers to the proposed alignment of user confidence with system reliability. AI models differ in the image scales and context they process; they should not all be characterized as pixel-by-pixel systems opposed to holistic interpretation.
When a seasoned pathologist relies on Gestalt, their first impression combines rapid pattern recognition with deliberate analysis.13 A discordant output or unclear rationale may reduce trust, although some users may instead defer to an incorrect AI suggestion. Which response occurs is an empirical question. To achieve operational stability, AI companies must design platforms that augment, rather than replace, human visual expertise. For instance, commercial entities like Gestalt Diagnostics and their partners emphasize that their AI-driven digital workflows are designed to unify cases, images, and data into a single environment that enhances clinical judgment and reduces variability, thereby supporting the physician's natural Gestalt rather than undermining it.8 Such commercial descriptions express a design aim, not proof of reduced bias or clinical benefit. AI assistance can introduce errors as well as correct them; both require evaluation.

## **Dual-Process Theory and Cognitive Load Management**

Closely intertwined with Gestalt theory is Dual-Process Theory, a foundational framework in cognitive psychology that has been extensively adapted to model medical decision-making and diagnostic errors.16 Dual-Process Theory describes contrasting intuitive and analytical modes of reasoning. The table is a teaching simplification, not evidence for two discrete processors or a guarantee that analytical thought is correct.19

| Cognitive System          | Characteristics in the Pathology Workflow                                                                                    | Operational Strengths and Vulnerabilities                                                                                                                                                            |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **System 1 (Intuitive)**  | Fast, automatic, subconscious, reflexive, and heavily dependent on pattern recognition (Gestalt) and stored illness scripts. | Highly efficient, enabling pathologists to process high caseloads holistically. However, it is vulnerable to cognitive biases (e.g., anchoring bias, blind-spot bias).                               |
| **System 2 (Analytical)** | Slow, deliberate, effortful, conscious, logical, calculating, and highly systematic.                                         | Can support explicit comparison and checking, including correction of an initial impression. It is also fallible and requires effort and working-memory resources. |

In this model, familiar patterns can evoke stored knowledge quickly, while ambiguity may prompt more explicit comparison of hypotheses. These are proposed descriptions of reasoning, not a verified sequence for every routine sign-out. The cited general decision-support material requires further checking before it can support pathology-specific cognitive mechanisms.19

### **The Paradox of AI and Extraneous Cognitive Load**

Workload and task complexity motivate interest in AI assistance. The effects of time pressure and assistance on cognitive load should be measured in the relevant pathology task; they cannot be inferred solely from the System 1/System 2 vocabulary. AI is often promoted as a means of improving speed, accuracy, and efficiency.2
Kusta and colleagues compared policy promises with interviews and observations in Danish pathology. Some participants anticipated that automation of easy cases could leave them with a burdensome concentration of difficult cases. This was a reported concern about future AI, not a trial demonstrating that AI caused burnout or a continuous shift into System 2. [Kusta et al., 2024](https://doi.org/10.1016/j.socscimed.2024.116650).
This concern suggests a workload hypothesis: automation may change the difficulty of the residual caseload, while false-positive alerts may add review work. Neither a rise in measured extraneous cognitive load nor severe alert fatigue follows automatically. Reader and workflow studies should examine time, interruptions, error patterns, and fatigue alongside any reduction in manual counting. Commercial deployment reports alone do not establish these outcomes.

## **Chaos Theory, Fractal Mathematics, and Tumor Biology**

Cognitive theories offer accounts of how pathologists interpret visual data; nonlinear dynamics and fractal analysis offer mathematical ways to investigate biological patterns. Their relevance does not make AI biologically necessary or establish the clinical value of a particular algorithm.

### **The Heterogeneity Engine and Non-Linear Dynamics**

Traditional scientific models often deal with predictable, linear phenomena. Some cancer models invoke nonlinear dynamics or complex adaptive systems. Their assumptions and empirical fit need to be assessed for the biological question; chaos theory does not by itself define cancer or establish a correspondence between every signaling change and a mathematical bifurcation.24 In dynamical systems, the "butterfly effect" dictates that minute changes in initial conditions lead to drastically unpredictable, highly variable long-term results.25
Some conceptual accounts describe chaos as a "heterogeneity engine." This is an explanatory proposal, not proof that deterministic chaos causes all malignant variation.26 This spatial and temporal heterogeneity means that tumor cells can exhibit entirely distinct behaviors depending on their microscopic location—such as adjacency to necrotic zones or blood vessels.27
Furthermore, the atavistic model of cancer proposes that malignant transformation represents a cellular reversion to an evolutionarily ancient, highly proliferative phenotype. The proposed links among atavism, entropy, and malignant transformation remain model-dependent. Fractal dimension, thermodynamic entropy, and dynamical chaos should not be used as interchangeable measurements.28

### **The Biological Limits of Human Perception**

Fractal analysis can quantify spatial patterns over the scales measurable in an image or cell-surface map. Biological structures have finite measurement ranges; "infinite fractal complexity" is not an empirical property established here. Selected experiments have evaluated fractal dimension as a marker of cellular phenotype, but diagnostic accuracy is specific to the sampled material and method. The original cervical-cell study is discussed below.
Computational methods can calculate image features that are impractical to estimate by inspection, including fractal dimension. Such calculations do not necessarily require AI. Predicting clinical progression from morphology or molecular associations requires dedicated validation; computational capacity and biological complexity alone do not establish predictive accuracy, treatment benefit, or an obligation to use AI. These biological analogies should therefore generate research questions, not clinical adoption requirements.

## **Distributed Cognition and the Collaborative Ecology**

To fully comprehend the systemic equilibrium of a pathology practice, one must look beyond the individual physician's brain and examine the laboratory as a unified, thinking entity. The theory of Distributed Cognition, heavily influenced by the work of Edwin Hutchins and expanded in sociological research, postulates that cognitive processes are not strictly confined to the individual mind.31 Instead, cognition is distributed across the members of a social group, the physical environment, and the technological artifacts utilized by that group.31

### **The Diagnostic Network**

In the traditional analog laboratory, cognition is physically distributed across a vast network. In this conceptual account, diagnostic work draws on technicians, reagents, slides, microscopes, information systems, and multidisciplinary expertise. This is an application of distributed-cognition vocabulary, not a claim that reagents possess intelligence.31 When a pathologist encounters a difficult case and hands the physical glass slide to a colleague down the hall for a second opinion, they are executing an act of distributed problem-solving. This deeply embedded cultural distribution of representations forms the backbone of clinical confidence.31
Introducing an AI algorithm can change this distributed cognitive network. The algorithm becomes a powerful new non-human cognitive node. If the AI is siloed—requiring separate logins, specialized monitors, or disconnected data streams—it may make coordination harder; this is a design hypothesis requiring workflow observation. Conversely, when digital pathology solutions are implemented successfully, they unify workflows, enabling digital slides to be easily accessed, organized, and shared globally for remote consultations, thereby vastly expanding the geographic and intellectual boundaries of the distributed cognitive network.14
The success of this expansion relies heavily on temporal coordination and trust synchronization across the entire network. If users cannot judge the reliability or purpose of an output, they may avoid it, use workarounds, or over-rely on it. The immune-system analogy is only a metaphor and does not identify which of these behaviors will occur.

## **Actor-Network Theory (ANT) and the Agency of the Non-Human**

To thoroughly analyze the sociotechnical dynamics of AI rejection or acceptance, sociologists of science rely upon Actor-Network Theory (ANT). Developed in the 1980s by Bruno Latour, Michel Callon, and John Law, ANT provides a radical framework for examining social systems by treating both humans (pathologists, administrators) and non-humans (technologies, microscopes, AI algorithms) as equal "actants" that possess agency and shape reality.37

### **The Microscope as an Obligatory Passage Point**

In ANT, technologies do not merely reveal pre-existing natural conditions; they actively constitute what counts as reality.40 For a century, the physical microscope has served as an "obligatory passage point" in the clinical encounter. It is a powerful non-human actant that commands the physical posture of the physician, dictates the workflow of the laboratory, and translates raw biological tissue into accepted medical facts.40  
When digital pathology and AI are introduced, they seek to dismantle this historic actor-network and assemble a new one. The digital screen, the server, the algorithm, and the digitized whole-slide image emerge as new actants demanding attention and attempting to mediate the physician-patient relationship.40

### **The Four Stages of Translation**

According to ANT, power and operational stability do not emanate from a single authority, but from the successful alignment of many actants through a process known as "translation".38 The four stages of translation can be used as interpretive questions about an AI implementation. Their pathology applications below are illustrative, not validated mandatory stages.38

| Stage of Translation | Definition in Actor-Network Theory                                                                  | Application to Digital Pathology Integration                                                                                                                                 |
| :------------------- | :-------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Problematization** | Focal actors define a problem and establish their proposed technology as an indispensable solution. | Examine how stakeholders define a problem and justify AI as a proposed solution, including alternatives and whose priorities are represented.        |
| **Interessement**    | Locking actors into their proposed new roles and severing their ties to the old network components. | Examine how interfaces, training, and incentives invite participation, including circumstances where mixed workflows remain appropriate.           |
| **Enrolment**        | Multilateral negotiations where human and non-human actors accept their designated tasks.           | Examine how tasks and responsibilities are negotiated, and whether local technical performance and escalation arrangements support them. |
| **Mobilization**     | Ensuring the new network holds together tightly, preventing actors from betraying the collective.   | Examine whether use is sustained, whose views are represented, and how failures or changing needs lead to adaptation.                |

An ANT analysis could investigate whether difficulties occur during *interessement* or *enrolment*; this note has no evidence quantifying how often pathology initiatives fail at those stages. If the digital interface is cumbersome, or if the AI fails to account for variations in slide preparation (stain fading, tissue folds), pathologists may resist or adapt the proposed roles. Because the old network (the microscope and glass slide) remains reliable, trusted, and physically present, a pathologist may return to familiar methods, but the availability and consequences of that option vary.38 Describing AI as a "quasi-object" is a theoretical interpretation whose usefulness for pathology should be tested, not a design requirement established here.39

## **SEIPS Framework, Liability Redistribution, and System Equilibrium**

The theoretical abstractions of ANT and CAS must eventually be translated into practical, actionable system designs to ensure patient safety. The Systems Engineering Initiative for Patient Safety (SEIPS) is a globally recognized human factors engineering framework used to analyze and improve complex healthcare work systems.45

### **Redesigning the Work System**

The SEIPS model (including its subsequent iterations, SEIPS 2.0 and 3.0) conceptualizes healthcare as a holistic patient journey occurring across interconnected work systems rather than isolated episodes of care.47 A work system is composed of interacting elements: Person(s), Tasks, Tools/Technologies, Organization, and the Internal/External Environment.46  
When AI (a new Tool/Technology) is introduced into the pathology laboratory (Internal Environment), it fundamentally transforms the diagnostic process (Task) and demands new skills from the pathologist (Person). SEIPS prompts examination of interactions among these elements. A technology change may require changes to training, tasks, or organization, but it does not dictate that every component must change or that collapse is inevitable. The effects on performance, workload, and safety are evaluation questions.45

### **Liability Redistribution and Governance**

A core tenet of maintaining system equilibrium in healthcare is the clear delineation of clinical responsibility. The allocation of legal liability is not established by a cognitive or systems theory and is not assessed in this note. When an AI tool is introduced, institutions need explicit operational responsibilities for review, escalation, monitoring, and incident response; these are distinct from determining legal liability.
If a pathologist relies upon an AI algorithm that generates a false negative, resulting in missed treatment for a patient, who bears the legal and ethical responsibility? Conversely, if a pathologist overrides an algorithmic finding based on their Gestalt intuition, and the AI is later proven correct, does the physician face amplified malpractice liability?  
These questions require applicable legal and professional guidance, alongside local governance. It is plausible that uncertainty about responsibility affects trust and behavior, but the direction and size of that effect cannot be inferred from CAS theory. Pathology interview research identifies responsibilities as an implementation concern; it does not settle liability or prove universal defensive behavior. [Drogt et al., 2022](https://doi.org/10.1038/s41379-022-01123-6).

## **Synthesizing the Theoretical Paradigms**

Digital transformation changes interactions among diagnostic work, infrastructure, and professional roles. CAS and attractor language offers one way to formulate hypotheses about adaptation, but cannot establish why an implementation succeeded or failed. The frameworks in this note point to complementary questions:

First, **Gestalt and Dual-Process Theory** prompt investigation of visual attention, checking behavior, and workload. Whether assistance reduces burden, concentrates difficult cases, or introduces new biases needs measurement rather than assumption.

Second, **Chaos Theory and Fractal Mathematics** suggest possible quantitative research features. A useful feature must demonstrate reproducible measurement and relevant diagnostic or prognostic value; biological complexity alone does not establish clinical utility or a necessity for AI.

Third, **Distributed Cognition and Actor-Network Theory** direct attention to coordination among people, artifacts, and institutions. Researchers can examine handoffs, workarounds, timing, and changes in roles without assuming that a laboratory acts as a single organism.

Finally, **SEIPS** supports analysis of interactions among people, tasks, technology, and organization. Training, infrastructure, monitoring, and escalation arrangements should be evaluated alongside model performance. Legal responsibility requires a separate, jurisdiction-specific analysis.

The M–C–R framework provides a related conceptual organizing scheme. Its value for pathology remains a research question. A practical next step is to connect a specified intended use with measurable outcomes and a study design, using [[digital-pathology-evidence]].

#### **Works cited**

1. An Inflection Point in Cancer Protein Biomarkers: What was and What's Next \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10388583/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10388583/)  
2. Speed, accuracy, and efficiency: The promises and practices of digitization in pathology \- IDEAS/RePEc, accessed on May 28, 2026, [https://ideas.repec.org/a/eee/socmed/v345y2024ics0277953624000947.html](https://ideas.repec.org/a/eee/socmed/v345y2024ics0277953624000947.html)  
3. Artificial Intelligence in Medicine and Healthcare: A Complexity ..., accessed on May 28, 2026, [https://www.mdpi.com/2076-3417/15/22/12005](https://www.mdpi.com/2076-3417/15/22/12005)  
4. A 25-Year Retrospective of Health IT Infrastructure Building: The Example of the Catalonia Region \- Journal of Medical Internet Research, accessed on May 28, 2026, [https://www.jmir.org/2024/1/e58933/](https://www.jmir.org/2024/1/e58933/)  
5. (PDF) Artificial Intelligence in Medicine and Healthcare: A Complexity-Based Framework for Model–Context–Relation Alignment \- ResearchGate, accessed on May 28, 2026, [https://www.researchgate.net/publication/397538557\_Artificial\_Intelligence\_in\_Medicine\_and\_Healthcare\_A\_Complexity-Based\_Framework\_for\_Model-Context-Relation\_Alignment](https://www.researchgate.net/publication/397538557_Artificial_Intelligence_in_Medicine_and_Healthcare_A_Complexity-Based_Framework_for_Model-Context-Relation_Alignment)  
6. Temporal Coordination –On Time and Coordination of CollaborativeActivities at a Surgical Department \- EUSSET Digital Library, accessed on May 28, 2026, [https://dl.eusset.eu/items/46fdae04-1876-4bea-bf3e-bd080e46fa87](https://dl.eusset.eu/items/46fdae04-1876-4bea-bf3e-bd080e46fa87)  
7. **Unrelated to pathology workflow; retained only for provenance.** Pickup scheduling algorithms with spatio-temporal coordination for urban educational facilities \- AIMS Press, accessed on May 28, 2026, [https://www.aimspress.com/article/id/6a0d8dfdba35de0d193b25d8](https://www.aimspress.com/article/id/6a0d8dfdba35de0d193b25d8)
8. Gestalt Diagnostics' AI-based digital pathology platform adopted for clinical use by large U.S. lab \- BioReference, accessed on May 28, 2026, [https://www.bioreference.com/gestalt-diagnostics-ai-based-digital-pathology-platform-adopted-for-clinical-use-by-large-u-s-lab/](https://www.bioreference.com/gestalt-diagnostics-ai-based-digital-pathology-platform-adopted-for-clinical-use-by-large-u-s-lab/)  
9. Full article: Practices in motion: expansive learning and the flow of digital collaboration in transforming healthcare \- Taylor & Francis, accessed on May 28, 2026, [https://www.tandfonline.com/doi/full/10.1080/13639080.2026.2643577](https://www.tandfonline.com/doi/full/10.1080/13639080.2026.2643577)  
10. But What Is Gestalt, Really? \- in-House, accessed on May 28, 2026, [https://in-housestaff.org/but-what-is-gestalt-really-626](https://in-housestaff.org/but-what-is-gestalt-really-626)  
11. Diagnostic Reasoning in Surgical Pathology \- PMC \- NIH, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12313001/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12313001/)  
12. On Gestalt Theory Principles \- ResearchGate, accessed on May 28, 2026, [https://www.researchgate.net/profile/Shelia-Guberman/publication/282828055\_On\_Gestalt\_Theory\_Principles/links/561dce6108aecade1acb414f/On-Gestalt-Theory-Principles.pdf](https://www.researchgate.net/profile/Shelia-Guberman/publication/282828055_On_Gestalt_Theory_Principles/links/561dce6108aecade1acb414f/On-Gestalt-Theory-Principles.pdf)  
13. COGNITIVE ERRORS IN MEDICIAL DIAGNOSIS \- National Academies of Sciences, Engineering, and Medicine, accessed on May 28, 2026, [https://www.nationalacademies.org/cdn/materials/9fba0876-f347-4912-9d08-67a14b29d8fb](https://www.nationalacademies.org/cdn/materials/9fba0876-f347-4912-9d08-67a14b29d8fb)  
14. Gestalt – Digital Pathology & AI with Enterprise IT Services, accessed on May 28, 2026, [https://gestaltdiagnostics.com/](https://gestaltdiagnostics.com/)  
15. PathFlow® | Digital Pathology Software | Vendor-Neutral IMS \- Gestalt Diagnostics, accessed on May 28, 2026, [https://gestaltdiagnostics.com/pathflow/](https://gestaltdiagnostics.com/pathflow/)  
16. The challenge of cognitive science for medical diagnosis \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC9911579/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9911579/)  
17. Rethinking clinical decision-making to improve clinical reasoning \- Frontiers, accessed on May 28, 2026, [https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2022.900543/full](https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2022.900543/full)  
18. A dual process model for paleopathological diagnosis \- PubMed, accessed on May 28, 2026, [https://pubmed.ncbi.nlm.nih.gov/33132164/](https://pubmed.ncbi.nlm.nih.gov/33132164/)  
19. Improving Patient Outcomes through Dual-Process Theory: A Framework for a Clinical Decision Support System empowering Junior Doc, accessed on May 28, 2026, [https://online.medunigraz.at/mug\_online/wbabs.getDocument?pThesisNr=72339\&pAutorNr=96321\&pOrgNR=1](https://online.medunigraz.at/mug_online/wbabs.getDocument?pThesisNr=72339&pAutorNr=96321&pOrgNR=1)  
20. Cognitive load and processes during chest radiograph interpretation in the emergency department across the spectrum of expertise \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC8637309/](https://pmc.ncbi.nlm.nih.gov/articles/PMC8637309/)  
21. Diagnostic Errors in (Anatomic) Pathology \- ARUP Laboratories, accessed on May 28, 2026, [https://arup.utah.edu/media/cohen-diagnosticErrors-2017/lecture-slides.pdf](https://arup.utah.edu/media/cohen-diagnosticErrors-2017/lecture-slides.pdf)  
22. System 1 vs. System 2 Thinking \- MDPI, accessed on May 28, 2026, [https://www.mdpi.com/2624-8611/5/4/71](https://www.mdpi.com/2624-8611/5/4/71)  
23. Great work\! Dr Olsi Kusta graduates from CRADLE \- Deakin University Blogs, accessed on May 28, 2026, [https://blogs.deakin.edu.au/cradle/great-work-dr-olsi-kusta-graduates-from-cradle/](https://blogs.deakin.edu.au/cradle/great-work-dr-olsi-kusta-graduates-from-cradle/)  
24. NON-LINEAR DYNAMICS THEORY AND MALIGNANT MELANOMA \- Experimental Oncology, accessed on May 28, 2026, [https://exp-oncology.com.ua/index.php/Exp/article/download/2019-4-8/2019-4-8/400](https://exp-oncology.com.ua/index.php/Exp/article/download/2019-4-8/2019-4-8/400)  
25. What is Chaos Theory? \- Fractal Foundation, accessed on May 28, 2026, [https://fractalfoundation.org/resources/what-is-chaos-theory/](https://fractalfoundation.org/resources/what-is-chaos-theory/)  
26. Cancer and Chaos and the Complex Network Model of a Multicellular Organism \- MDPI, accessed on May 28, 2026, [https://www.mdpi.com/2079-7737/11/9/1317](https://www.mdpi.com/2079-7737/11/9/1317)  
27. From Chaos to Opportunity: Decoding Cancer Heterogeneity for Enhanced Treatment Strategies \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10525472/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10525472/)  
28. The Application of Chaos Theory and Fractal Mathematics to the Study of Cancer Evolution \- European Society of Medicine, accessed on May 28, 2026, [https://esmed.org/MRA/index.php/mra/article/download/717/431](https://esmed.org/MRA/index.php/mra/article/download/717/431)  
29. Chaotic fractals: Why chaos is the dynamic of carcinogenesis \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10686106/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10686106/)  
30. "Fractal Geometry and Chaos Theory: From Old Problems to New Models and" by Terene H. Perciante, accessed on May 28, 2026, [https://pillars.taylor.edu/acms-1997/13/](https://pillars.taylor.edu/acms-1997/13/)  
31. Cognition, Distributed, accessed on May 28, 2026, [https://pages.ucsd.edu/\~johnson/COGS102B/Hutchins01.pdf](https://pages.ucsd.edu/~johnson/COGS102B/Hutchins01.pdf)  
32. Distributed Cognition Edwin Hutchins University of California, San Diego \- Cornell | ARL, accessed on May 28, 2026, [https://arl.human.cornell.edu/linked%20docs/Hutchins\_Distributed\_Cognition.pdf](https://arl.human.cornell.edu/linked%20docs/Hutchins_Distributed_Cognition.pdf)  
33. Collective consciousness and its pathologies: Understanding the failure of AIDS control and treatment in the United States \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC1820776/](https://pmc.ncbi.nlm.nih.gov/articles/PMC1820776/)  
34. Distributed Cognition and Process Management Enabling Individualized Translational Research: The NIH Undiagnosed Diseases Program Experience \- Frontiers, accessed on May 28, 2026, [https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2016.00039/full](https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2016.00039/full)  
35. Validity and authenticity: How to treat cognition and AI \- Deakin University Blogs, accessed on May 28, 2026, [https://blogs.deakin.edu.au/cradle/validity-and-authenticity-how-to-treat-cognition-and-ai/](https://blogs.deakin.edu.au/cradle/validity-and-authenticity-how-to-treat-cognition-and-ai/)  
36. Advancements in pathology: Digital transformation, precision medicine, and beyond \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC11910332/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11910332/)  
37. Opening the Black-Box of Mental Disorders: An Actor-Network Theory Analysis of Schizophrenia \- ScholarWorks@GVSU, accessed on May 28, 2026, [https://scholarworks.gvsu.edu/cgi/viewcontent.cgi?article=1017\&context=mcnair\_manuscripts](https://scholarworks.gvsu.edu/cgi/viewcontent.cgi?article=1017&context=mcnair_manuscripts)  
38. Latour's Actor Network Theory \- Simply Psychology, accessed on May 28, 2026, [https://www.simplypsychology.org/actor-network-theory.html](https://www.simplypsychology.org/actor-network-theory.html)  
39. Actor–network theory \- Wikipedia, accessed on May 28, 2026, [https://en.wikipedia.org/wiki/Actor%E2%80%93network\_theory](https://en.wikipedia.org/wiki/Actor%E2%80%93network_theory)  
40. Reimagining Healthcare Through Actor-Network Theory: A Latourian Critique of Modern Medical Hierarchies, accessed on May 28, 2026, [https://www.ajrms.com/articles/Reimagining%20Healthcare%20Through%20Actor-Network%20Theory%20%20A%20Latourian%20Critique%20of%20Modern%20Medical%20Hierarchies](https://www.ajrms.com/articles/Reimagining%20Healthcare%20Through%20Actor-Network%20Theory%20%20A%20Latourian%20Critique%20of%20Modern%20Medical%20Hierarchies)  
41. Full article: Deviance normalised? An analysis of British cover-ups informed by actor-network theory \- Taylor & Francis, accessed on May 28, 2026, [https://www.tandfonline.com/doi/full/10.1080/00207233.2025.2563486](https://www.tandfonline.com/doi/full/10.1080/00207233.2025.2563486)  
42. Full article: Translations: Artifacts from an Actor-Network Perspective \- Taylor & Francis, accessed on May 28, 2026, [https://www.tandfonline.com/doi/full/10.1080/17493460600658318](https://www.tandfonline.com/doi/full/10.1080/17493460600658318)  
43. And say the AI responded? Dancing around 'autonomy' in AI/human encounters \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC10832316/](https://pmc.ncbi.nlm.nih.gov/articles/PMC10832316/)  
44. Actor Network Model of the Construction Mechanism of a Technology Standardization Innovation Ecosystem—Haier Case Study \- MDPI, accessed on May 28, 2026, [https://www.mdpi.com/2079-8954/13/4/285](https://www.mdpi.com/2079-8954/13/4/285)  
45. Health Care and Patient Safety – SEIPS \- CQPI \- University of Wisconsin–Madison, accessed on May 28, 2026, [https://cqpi.wisc.edu/research/health-care-and-patient-safety-seips/](https://cqpi.wisc.edu/research/health-care-and-patient-safety-seips/)  
46. Toward Safer Diagnoses: A SEIPS-Based Narrative Review of Diagnostic Errors \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC12840061/](https://pmc.ncbi.nlm.nih.gov/articles/PMC12840061/)  
47. Exploring SEIPS 2.0 as a Model for Analyzing Care Transitions across Work Systems \- PMC, accessed on May 28, 2026, [https://pmc.ncbi.nlm.nih.gov/articles/PMC7400988/](https://pmc.ncbi.nlm.nih.gov/articles/PMC7400988/)  
48. Using Human Factors Engineering and the SEIPS Model to Advance Patient Safety in Care Transitions | PSNet, accessed on May 28, 2026, [https://psnet.ahrq.gov/perspective/using-human-factors-engineering-and-seips-model-advance-patient-safety-care-transitions](https://psnet.ahrq.gov/perspective/using-human-factors-engineering-and-seips-model-advance-patient-safety-care-transitions)  
49. Assessing Health Care Professionals' Perceptions of a New System in Clinical Workflows: Systems Engineering Initiative for Patient Safety–Based Consensual Qualitative Research, accessed on May 28, 2026, [https://www.jmir.org/2026/1/e86166](https://www.jmir.org/2026/1/e86166)


---


Beyond Gestalt and Chaos theories, several other prominent frameworks are used to understand pathology practices, clinical reasoning, and the integration of new technologies like artificial intelligence:

* **Dual-Process Theory:** This cognitive framework categorizes a pathologist's clinical diagnostic reasoning into two interacting modes. System 1 is intuitive, fast, and relies heavily on experience and pattern recognition, while System 2 is analytical, deliberate, and logical. Efficient clinical practice requires a continuum of both, as relying solely on System 2 for every routine case would overload a physician's working memory.
* **Actor-Network Theory (ANT):** This sociological framework treats both humans (pathologists, lab technicians) and non-humans (microscopes, glass slides, LIS systems, AI algorithms) as active, equal "actants" that shape the clinical environment. ANT explains how these actants form alliances through a process called "translation"—which includes stages like problematization, interessement, enrolment, and mobilization—to establish new medical networks and diagnostic authority.
* **Normalization Process Theory (NPT):** Highly relevant for the rollout of digital pathology, NPT explains the individual and collective work required to embed and normalize a new technology into routine clinical practice. It evaluates implementation success based on four core constructs: coherence (understanding the technology), cognitive participation (engagement), collective action (the actual work of using the technology), and reflexive monitoring (assessing its effects and value).
* **Socio-Technical Systems (STS) Theory:** This framework views the healthcare environment as a complex system comprising interconnected social elements (people, culture, goals) and technical elements (technology, infrastructure, processes). If a new technology is introduced, it cascades through the system, requiring adjustments in the social elements. PreMiSTS is a proposed method for anticipating sociotechnical malfunctions; a pathology-specific benefit is not established in the checked sources. [Clegg et al., 2017](https://doi.org/10.1017/dsj.2017.4).
* **Complex Adaptive Systems (CAS) Theory:** This views the pathology laboratory as an interacting system in which routines and feedback may affect adaptation. Attractor and protective-response descriptions are hypotheses or metaphors here, not verified causes of resistance to technology.
* **Distributed Cognition:** This theory posits that the intelligence required to render an accurate diagnosis is not confined to a single pathologist's mind. Instead, cognition is distributed across the physical environment, social groups, and technological artifacts, relying heavily on the collaboration between technicians, tumor boards, microscopes, and chemical reagents.


---


The following applications mix conceptual analogies with empirical examples; their evidentiary limits are stated where checked:

**1. Dual-Process and Gestalt Theories in Diagnostic Accuracy**
In pathology, Dual-Process Theory explains how practitioners balance "System 1" (fast, intuitive pattern recognition, or "Gestalt") with "System 2" (slow, deliberate, analytical reasoning). A general error rate below 5%, a valid cross-specialty comparison, and a causal explanation attributing lower error to System 1 were not verified. Error estimates depend on task, case mix, reference standard, and ascertainment; these unsupported numerical and causal claims should not be used as teaching facts. Intuition and analytic checking are useful conceptual distinctions, not measures of diagnostic accuracy.

Commercially, this concept is so central to the field that AI vendors have adopted the terminology. For example, "Gestalt Diagnostics" integrates AI algorithms (like MindPeak's BreastIHC) directly into the digital workflow. Calling AI the pathologist’s "System 2" is an analogy, not an experimentally established cognitive role. Vendor naming and product descriptions do not demonstrate that assistance makes intuitive judgment safe; the specific tool and intended use require evaluation. Current product integrations have not been verified in this review.

**2. Chaos Theory and Fractal Dimension Analysis**
In oncology research, chaos theory is used to describe cancer as a "heterogeneity engine". Sensitivity to initial conditions is a property of particular dynamical models; its role in a specific tumor process requires evidence rather than an analogy alone.

Researchers apply this practically through "Fractal Dimension" (FD) analysis. The checked study measured **fractal dimension**, not generic "fractal entropy," in AFM adhesion maps of fixed, dried cultured cervical cells: six normal strains, six cancer strains, and six immortalized lines. It reported sensitivity and specificity above 99% for separating normal cells from the premalignant and malignant groups in that experimental model. This does not establish perfect clinical malignancy detection, separation of premalignant from malignant disease, or screening performance in patients. [Original study, 2015; PMID 25959926](https://pmc.ncbi.nlm.nih.gov/articles/PMC5518320/).

**3. Actor-Network Theory (ANT) and the "Enactment" of Disease**
ANT treats both humans and non-humans (like microscopes and algorithms) as active participants in a network. A classic analogy in ANT literature involves atherosclerosis: scholars point out that atherosclerosis viewed through a pathologist's microscope is fundamentally a different "object" than the atherosclerosis diagnosed by a clinician physically touching a patient's leg. This is a philosophical account of how disease is enacted in different practices, not evidence that instruments create the underlying lesion. Whether AI changes diagnostic categories or operational definitions is a question for a specific study. The original source and its applicability to this atherosclerosis example still need verification.

**4. Normalization Process Theory (NPT) in Real-World AI Rollouts**
Mikkelsen et al. studied expectations before digital-pathology implementation in the Region of Southern Denmark, using interviews and a survey informed by NoMAD. They received 131 responses from 181 invited employees. Overall expectations were positive: none of the four NPT core-construct mean scores was below 70% of its maximum. Two lower-scoring subconstructs concerned resources and awareness of reports about DIPA effects. This was a pre-implementation digital-pathology readiness study, not an AI effectiveness study or proof that software is rarely responsible for implementation problems. [Mikkelsen et al., 2022](https://doi.org/10.3390/ijerph19127253).

**5. Predicting Malfunctions in Socio-Technical Systems (PreMiSTS)**
Clegg et al. proposed PreMiSTS as a general organizational-design method for anticipating and mitigating sociotechnical malfunctions. Applying its attention to people, culture, goals, technology, infrastructure, and processes to pathology is a **proposed extension** in this note. The targeted check did not identify evidence that PreMiSTS has been validated for digital-pathology rollout or guarantees prevention of failures. A prospective implementation study would be needed to assess that claim. [Clegg et al., 2017](https://doi.org/10.1017/dsj.2017.4).


