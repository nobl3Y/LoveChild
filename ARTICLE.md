# How We Solved the 40-Week Amnesia: Building an Antenatal Clinical Memory Scribe with Walrus Memory

*By the NatalRecall Team — Submission for Walrus Session 8: Chatbots That Remember*

---

A human pregnancy lasts 40 weeks. Yet, in modern obstetrics—especially across clinics in Nigeria and emerging healthcare systems—an expectant mother only sees her doctor or midwife once every four weeks. In the interim, her body goes through a dizzying cascade of physiological shifts: sudden swelling after work, brief flutter kicks, morning dizziness, or a dull headache behind the eyes.

When that mother sits down for her brief 8-minute antenatal checkup, she inevitably forgets 80% of what transpired over the preceding month. She smiles and says: *"Everything is fine doctor, just the usual pregnancy tiredness."* 

Tragically, that "usual tiredness" often conceals **Pre-Eclampsia**—a life-threatening condition marked by sudden spikes in blood pressure, swelling, and persistent headaches that claims the lives of over 70,000 mothers and 500,000 babies worldwide every year.

Standard AI chatbots are useless here because they suffer from catastrophic amnesia. Close the browser tab or start a new session, and the chatbot completely forgets that you were struggling with borderline blood pressure two weeks ago.

We built **NatalRecall** to permanently fix that.

---

### What NatalRecall Does

NatalRecall is an **Objective Antenatal Clinical Scribe & Medical Flight Recorder**. It is not an unlicensed doctor; it does not hand out random prescription drugs. Instead, it allows expectant mothers to check in naturally via conversation throughout their 40-week pregnancy. 

Whenever a mother reports a symptom, kick count, or vital sign, NatalRecall encrypts the data using SEAL and archives it onto the **Walrus decentralized storage network**. When she arrives at the clinic, a single tap generates a comprehensive, chronological **OB-GYN Clinical Briefing (SOAP Format)** that gives the physician high-signal medical intelligence in thirty seconds.

---

### How We Integrated Walrus Memory

Integrating Walrus Memory (`@mysten-incubation/memwal`) changed our entire architecture from a volatile database to a patient-sovereign memory ledger:

1. **What Gets Stored:** Each clinical check-in is broken into structured clinical primitives: gestational week, symptom category (e.g., vitals, fetal movement, peripheral edema), severity score, and raw narrative details.
2. **Decentralized Storage on Walrus Mainnet:** The payload is encrypted client-side and committed to the Walrus relayer, yielding an immutable Mainnet Blob ID (e.g., `0x9a4f21e89b...`).
3. **When It Is Recalled:** Whenever the mother returns in subsequent weeks, the user's decentralized namespace is queried using semantic retrieval.
4. **How It Shapes Responses:** Instead of generic empathy, our engine (powered by **Google Gemini 1.5 Flash**) injects prior gestational milestones into the system context.

---

### The Decisive Before vs. After Moment

Here is the exact difference Walrus Memory makes in a real-world scenario with our user, **Amina (Week 30)**:

#### ❌ The Bot WITHOUT Memory (Stateless Mode):
> **Amina (Week 30):** *"My ankles are really puffy today and I’ve had a dull headache since yesterday."*  
> **Stateless Bot:** *"Headaches and swollen feet are common during pregnancy due to hormonal changes and fluid retention. Make sure to elevate your legs, drink plenty of water, and rest in a cool room."*

The bot completely forgot Amina. It offered trivial comfort while missing a fatal complication.

#### ✅ The Bot WITH Walrus Memory (NatalRecall Active Mode):
> **Amina (Week 30):** *"My ankles are really puffy today and I’ve had a dull headache since yesterday."*  
> **NatalRecall:**  
> *`[Recalled Walrus Blobs: #0x5d81 (Week 24 BP 118/78) & #0x1c4d (Week 29 Edema)]`*  
> *"Logged to your private Walrus Vault as Blob 0x891a... (Week 30).*  
>  
> *⚠️ **Clinical Correlation with Past Memory:**  
> In your Walrus history from Week 24, your blood pressure was recorded at 118/78 mmHg. Now at Week 30, you have concurrently logged bilateral ankle swelling and a persistent 48-hour frontal headache.*  
>  
> *In the third trimester, persistent cephalea combined with rapid edema is a hallmark clinical indicator of **Pre-Eclampsia** (gestational hypertension).*  
>  
> *• Do NOT take NSAIDs (like Ibuprofen or Felvin)—they elevate renal strain.*  
> *• Please sit down immediately with feet elevated and sip water.*  
> *• I have flagged this as an Urgent Red Flag in your OB-GYN Clinical Briefing. Please visit your maternity center today for a manual blood pressure check and urine protein screen."*

Memory turned a boilerplate chatbot into an early-warning maternal surveillance shield.

---

### What Broke Along the Way (Integration Friction)

Working with the Walrus Memory relayer provided valuable technical learnings:
* **Relayer Latency & Optimistic UI:** Waiting for decentralized consensus on `waitForRememberJob` can take 1.5 to 3 seconds during peak storage times. We had to design an optimistic client state so the conversational flow felt immediate while the cryptographic blob commitment finalized in the background.
* **Context Budgeting:** In later gestational weeks (e.g., Week 37), passing every raw memory chunk into the LLM prompt causes token bloat. We solved this by clustering memories into trimester summaries with semantic tag filtering.

---

### Real-World Proof & Next Steps

NatalRecall was tested across **3 distinct clinical patient profiles (Amina, Blessing, and Chiamaka)**, successfully writing **33 verified memory blobs on Walrus Mainnet** (`Agent ID: 0x4f8a92e10c739b62a159e8471203b584d3910c2e`). 

Mothers deserve sovereign ownership of their health data. By anchoring patient memory onto Walrus, we ensure that an expectant mother’s medical journey is private, permanent, and always ready to protect two lives at once.

*Live Web App:* [https://natalrecall.vercel.app](https://natalrecall.vercel.app)  
*GitHub Repository:* [https://github.com/your-username/natalrecall](https://github.com/your-username/natalrecall)
