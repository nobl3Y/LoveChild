# How We Solved the 40-Week Amnesia: Building an Antenatal Clinical Memory Scribe with Walrus Memory

*By the LoveChild Team — Submission for Walrus Session 8: Chatbots That Remember*

---

A human pregnancy lasts 40 weeks. In modern obstetrics—especially across clinics in Nigeria and emerging healthcare systems—an expectant mother only sees her doctor or midwife once every four weeks. In the interim, her body experiences dozens of micro-events: sudden swelling after work, brief flutter kicks, morning dizziness, or a dull headache behind the eyes.

When that mother sits down for her brief 8-minute antenatal checkup, she obviously remembers that she had problems: *"Yes doctor, I had headaches and swollen feet last month."* 

**The tragedy is not that she forgets she felt sick—it is that human memory loses the exact specifics and receipts:**
Did the headache start *before* or *after* the swelling? Did it hit in the morning or at night? How many hours did it last?

Doctors cannot make safe clinical triage decisions based on vague headlines. Tragically, when the exact timeline is missing, early warning signs of **Pre-Eclampsia** (gestational hypertension)—which claims the lives of over 70,000 mothers and 500,000 babies globally each year—get brushed aside as "normal pregnancy discomfort."

Standard AI chatbots fail here because they suffer from catastrophic amnesia: close the tab, and the bot completely forgets every detail you ever told it.

We built **LoveChild** to permanently capture the in-the-moment truth.

---

### What LoveChild Does

> **This service is a maternal care chatbot for women. She simply tells it about any problem she's facing, big or small, and it keeps a record of every detail she shares over time. Before her doctor's visit, it turns everything into a clear report, so she can give the doctor the full picture instead of forgetting the small things that often turn out to matter. The result is appointments where nothing gets missed, and women who feel prepared and heard.**

LoveChild is not an unlicensed doctor; it does not hand out random prescription drugs. Instead, it allows expectant mothers to report their issues once, naturally, the moment they occur.

Whenever a mother logs a symptom, cramp, or bodily change, LoveChild encrypts the granular context using SEAL and archives it onto the **Walrus decentralized storage network**. When clinic day arrives, she doesn't have to reconstruct weeks of fuzzy details from memory. A single tap generates a comprehensive, chronological **OB-GYN Clinical Briefing (SOAP Format)** that gives the physician the exact receipts in thirty seconds.

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

#### ✅ The Bot WITH Walrus Memory (LoveChild Active Mode):
> **Amina (Week 30):** *"My ankles are really puffy today and I’ve had a dull headache since yesterday."*  
> **LoveChild:**  
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

LoveChild was tested across **3 distinct clinical patient profiles (Amina, Blessing, and Chiamaka)**, successfully writing **33 verified memory blobs on Walrus Mainnet** (`Agent ID: 0x4f8a92e10c739b62a159e8471203b584d3910c2e`). 

Mothers deserve sovereign ownership of their health data. By anchoring patient memory onto Walrus, we ensure that an expectant mother’s medical journey is private, permanent, and always ready to protect two lives at once.

*Live Web App:* [https://lovechild.vercel.app](https://lovechild.vercel.app)  
*GitHub Repository:* [https://github.com/your-username/lovechild](https://github.com/your-username/lovechild)
