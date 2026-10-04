# NatalRecall 🤰🏾🩺
### A Maternal Care Chatbot for Women • Powered by Walrus Protocol on Sui

[![Walrus Memory](https://img.shields.io/badge/Walrus-Mainnet%20Verified-0d9488?style=flat-square)](https://walrus.xyz)
[![Google Gemini](https://img.shields.io/badge/LLM-Google%20Gemini%201.5-f43f5e?style=flat-square)](https://deepmind.google/technologies/gemini/)
[![Prize Track](https://img.shields.io/badge/Prize%20Track-Beyond%20the%20Big%20Two-amber-500?style=flat-square)](https://www.deepsurge.xyz/hackathons)
[![Sui Blockchain](https://img.shields.io/badge/Network-Sui-4da2ff?style=flat-square)](https://sui.io)

---

## 🌟 Executive Summary

> **"This service is a maternal care chatbot for women. She simply tells it about any problem she's facing, big or small, and it keeps a record of every detail she shares over time. Before her doctor's visit, it turns everything into a clear report, so she can give the doctor the full picture instead of forgetting the small things that often turn out to matter. The result is appointments where nothing gets missed, and women who feel prepared and heard."**

Pregnancy is inherently **longitudinal (40 weeks)**. An expectant mother visits her clinic once every 4 weeks. When something feels uncomfortable, painful, or unusual, she complains in the moment. Weeks later at her 10-minute prenatal checkup, she shouldn't have to reconstruct weeks of fuzzy memories. **NatalRecall** preserves every detail on decentralized Walrus Memory so her physician receives the full clinical picture.

---

## 🚀 Key Innovations & Hackathon Compliance

| Hackathon Requirement | NatalRecall Implementation |
| :--- | :--- |
| **Walrus Protocol Integration** | Stored on Walrus Mainnet using SEAL-encrypted memory chunks. |
| **Agent ID & Blobs on Mainnet** | **Agent ID:** `0x4f8a92e10c739b62a159e8471203b584d3910c2e`<br>**Total Mainnet Blobs:** 33 Blobs across 3 verified patient personas. |
| **3 Users with ≥10 Memories Each** | • **Amina Bello (Week 30):** 12 blobs (Pre-Eclampsia surveillance)<br>• **Blessing Okon (Week 18):** 11 blobs (Hyperemesis & hydration)<br>• **Chiamaka Eze (Week 37):** 10 blobs (Labor triage & 5-1-1 rule) |
| **"Beyond the Big Two" Prize Track** | Built with **Google Gemini 1.5 Flash** (Qualifies for the $150 WAL special track). |
| **Zero Unlicensed Prescribing** | Strict harm reduction: Flags dangerous contraindicated painkillers (NSAIDs like Ibuprofen/Felvin) while preparing structured intake notes for licensed doctors. |
| **Before / After Comparison Toggle** | Interactive UI toggle demonstrating how stateless LLMs miss life-threatening patterns that Walrus Memory catches instantly. |

---

## 🏗️ Architecture Diagram

```
   ┌─────────────────────────────────────────────────────────────┐
   │                    NatalRecall Web Client                   │
   │            (Next.js 14 + Tailwind CSS + Lucide)             │
   └───────────────┬─────────────────────────────┬───────────────┘
                   │                             │
                   ▼                             ▼
       ┌──────────────────────┐      ┌──────────────────────┐
       │   Google Gemini LLM  │      │ Walrus Memory SDK    │
       │ (Clinical Reasoning) │      │ (SEAL Cryptography)  │
       └──────────────────────┘      └───────────┬──────────┘
                                                 │
                                                 ▼
                                     ┌──────────────────────┐
                                     │ Walrus Mainnet       │
                                     │ Decentralized Blobs  │
                                     │ (Sui Identity Layer) │
                                     └──────────────────────┘
```

---

## 👩‍👧‍👦 The 3 Patient Personas (Live Multi-User Showcase)

1. **Amina Bello (Week 30, Primigravida):**
   - *Problem:* Experienced sudden bilateral ankle swelling (Week 29) followed by a 48-hour persistent frontal headache (Week 30).
   - *Walrus Memory Hero Moment:* Correlates her Week 24 baseline BP (118/78 mmHg) with concurrent swelling and headache to trigger a **Pre-Eclampsia Surveillance Alert**, advising immediate clinic triage.
2. **Blessing Okon (Week 18, Multigravida):**
   - *Problem:* Severe early nausea and dehydration (Hyperemesis Gravidarum).
   - *Walrus Memory Hero Moment:* Tracks IV rehydration milestones, dietary ginger/cracker adaptation, and successful weight recovery (+1.2 kg).
3. **Chiamaka Eze (Week 37, Term Pregnancy):**
   - *Problem:* Distinguishing false labor (Braxton Hicks) from active labor contractions.
   - *Walrus Memory Hero Moment:* Tracks mucus plug passage, engagement in pelvis, and briefs the patient on the 5-1-1 active labor rule.

---

## 🛠️ Quickstart & Local Installation

### Prerequisites
- Node.js v18+ or v20+
- npm or pnpm

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/natalrecall.git
cd natalrecall
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_MEMWAL_SERVER_URL=https://relayer.memory.walrus.xyz
NEXT_PUBLIC_MEMWAL_AGENT_ID=0x4f8a92e10c739b62a159e8471203b584d3910c2e
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing the Walrus Memory Live Demo

1. **Explore Personas:** Click the tabs at the top to toggle between **Amina**, **Blessing**, and **Chiamaka**.
2. **Open the Walrus Memory Vault:** Click **"Vault: 33 Blobs"** in the navigation bar to inspect the raw encrypted and decrypted memory chunks stored on Walrus Mainnet.
3. **Test Before vs. After Memory:**
   - Toggle **"Without Memory (Stateless)"** and type: *"My ankles are swollen and I've had a headache since yesterday."* Observe the generic, forgetful advice.
   - Toggle **"With Walrus Memory"** and submit the same message. Observe how the bot recalls past baseline vitals, detects the pre-eclampsia pattern, and saves a new blob live!
4. **Generate OB-GYN Clinical Briefing:** Click **"OB-GYN Briefing"** to view and print the complete medical report for the doctor.

---

## 📄 License
MIT License. Built for the **Walrus Sessions 8 Hackathon**.
