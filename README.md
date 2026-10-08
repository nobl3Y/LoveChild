# LoveChild
### A Walrus Memory powered pregnancy chatbot that connects symptoms during the week(s), catches warning signs like pre-eclampsia, and gives you a summary during any medical visit.

[![Walrus Memory](https://img.shields.io/badge/Walrus-Decentralized%20Memory-0d9488?style=flat-square)](https://walrus.xyz)
[![Google Gemini](https://img.shields.io/badge/LLM-Google%20Gemini%201.5%20Flash-f43f5e?style=flat-square)](https://deepmind.google/technologies/gemini/)
[![Prize Track](https://img.shields.io/badge/Prize%20Track-Beyond%20the%20Big%20Two-amber-500?style=flat-square)](https://www.deepsurge.xyz/hackathons)
[![Sui Blockchain](https://img.shields.io/badge/Network-Sui%20Mainnet-4da2ff?style=flat-square)](https://sui.io)



---

## For Judges — 60-Second Verify

| Resource | Description & Link |
|---|---|
| **Live Web App** | [Open LoveChild on Vercel](https://love-child.vercel.app) |
| **On-Chain Storage** | [View Verified MemWalAccount on Suiscan Explorer](https://suiscan.xyz/mainnet/object/0x763b3b257e9575d546b449b8f2cc9a1ee05f8c3c0d17bfbd0e5d84bfc389e4d8) |
| **Memory Evidence** | [30 Verified Mainnet Blobs in evidence/blobs.md](evidence/blobs.md) |
| **Build Article** | [Read the Full Story on Medium](https://medium.com/@arytajames/how-lovechild-uses-walrus-to-give-maternal-care-a-memory-ec5a8b82d64a) |
| **Community Post on X** | [View Announcement on X](https://x.com/ogboNoble_001/status/2108083555049889795?s=20) |
| **Prize Track** | Main Prize + **"Beyond the Big Two"** (Google Gemini 1.5 Flash) |

---

## The Real Problem: 40 Weeks of Pregnancy vs. a 7-Minute Clinic Visit

A human pregnancy lasts 40 weeks, but an expectant mother only sees her doctor or midwife once a month.

In high-volume public clinics and hospitals across Nigeria and emerging communities, that monthly consultation rarely lasts more than 7 minutes. The waiting room is full of dozens of women, and the doctor has to make fast decisions under pressure.

Between those visits, her body goes through constant changes:
* A slight headache on a Tuesday after work.
* Ankle swelling that takes longer to go away on Thursday.
* A wedding ring that suddenly feels too tight on Sunday morning.

By the time she sits across from her doctor four weeks later, she has forgotten 80% of what happened. When the doctor asks, *"How have you been feeling since last month?"*, she smiles and says:

> *"Everything is fine doctor, just the usual pregnancy tiredness."*

Tragically, that "usual tiredness" often conceals **Pre-Eclampsia**—a dangerous spike in blood pressure that affects 1 in 10 pregnancies and claims the lives of over 70,000 mothers and 500,000 babies each year worldwide. Pre-Eclampsia rarely announces itself all at once. It creeps in as tiny, scattered symptoms spread across weeks.

When a mother has nobody keeping track of those small daily clues, the warning signs get missed until it becomes an emergency.

---

## Why Walrus Memory is the Bedrock of Every Note

Standard AI chatbots cannot solve this problem because **they suffer from amnesia**. The second you close the browser tab or start a new conversation, the bot completely forgets who you are.

Even traditional health apps fail here for a different reason: **data silos**. If an app saves your medical notes on a private company server, that company owns your data. If you move from Kano to Abuja, switch from a local clinic to a teaching hospital, or the app shuts down, your records vanish.

**Walrus Memory changes how health data works:**

1. **The Mother Owns the Memory, Not the Server:**  
   Every memory in LoveChild is tied directly to the mother's Sui identity on the blockchain. LoveChild only operates using a delegated access key. The mother holds sovereign ownership of her health record.
2. **Permanent and Decentralized:**  
   A 40-week pregnancy cannot afford lost data. Notes are sealed and stored across Walrus decentralized storage nodes as immutable blobs. They cannot be accidentally wiped, altered, or locked behind an expensive subscription.
3. **Private by Default:**  
   Sensitive maternal health notes are encrypted client-side using SEAL before ever reaching the storage layer. No third-party relayer or database admin can read her personal symptom history.

---

## Memory vs. Amnesia: What Happens in Real Life

| Timeline | What She Experiences | Standard Chatbot (Without Walrus) | LoveChild (With Walrus Memory) |
|---|---|---|---|
| **Week 24** | Home blood pressure slightly high (128/82 mmHg). | *"That sounds mild. Just rest and drink water."* | Stores baseline reading to Walrus. Notes it for future tracking. |
| **Week 28** | Wedding ring no longer fits; fingers stiff. | *"Swelling in pregnancy is normal. Elevate your legs."* (Treated as a new, isolated event) | Recalls Week 24 reading from Walrus. Detects that swelling moved from feet to hands and face. |
| **Week 30** | Wakes up with a dull frontal headache that won't go away. | *"Take an Ibuprofen and take a nap."* (**Dangerous medical advice!**) | **Connects all 3 clues.** Warns her that Ibuprofen harms fetal circulation, recognizes the classic triad of Pre-Eclampsia, and immediately flags it for her doctor. |
| **Clinic Day** | Mother sits down for her 7-minute appointment. | Doctor only sees whatever the mother remembers off the top of her head. | **Doctor receives a 1-page chronological briefing** showing the full 6-week trend with dates, home BP numbers, and symptoms. |

---

## How Walrus Works in Plain English

```
   ┌────────────────────────────────────────────────────────┐
   │                  Expectant Mother                      │
   │      "My ring is tight and my head hurts today"        │
   └───────────────────────────┬────────────────────────────┘
                               │
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │                  LoveChild App                         │
   │            (Next.js + Tailwind CSS)                    │
   └─────────────┬────────────────────────────┬─────────────┘
                 │                            │
                 ▼                            ▼
   ┌───────────────────────────┐  ┌─────────────────────────┐
   │  Walrus Memory SDK        │  │  Google Gemini 1.5 Flash│
   │  (@mysten-incubation/     │  │  (Clinical Scribe)      │
   │   memwal)                 │  │                         │
   └─────────────┬─────────────┘  └───────────┬─────────────┘
                 │                            │
                 ▼                            │
   ┌───────────────────────────┐              │
   │  SEAL Encrypted Blobs on  │              │
   │  Walrus Mainnet           │              │
   │  (Sovereign Storage)      │              │
   └─────────────┬─────────────┘              │
                 │                            │
                 ▼                            ▼
   ┌────────────────────────────────────────────────────────┐
   │          1-Page Objective Doctor's Briefing            │
   │      Given to the OB-GYN at the 7-minute visit         │
   └────────────────────────────────────────────────────────┘
```

1. **Logging (`memwal.remember`):**  
   When the mother reports how she feels, LoveChild creates a structured record and sends it to Walrus. Walrus encrypts the text, distributes it across network nodes, and returns a unique `blob_id`.
2. **Retrieving (`memwal.recall`):**  
   Whenever she checks in or asks a question, LoveChild performs semantic search against her private namespace on Walrus. It pulls her past symptoms and feeds them into Google Gemini as trusted medical context.
3. **Namespace Isolation:**  
   Each patient receives a strictly isolated namespace (e.g. `lovechild:user:ada-bello:mainnet`). Ada's symptoms never bleed into Blessing's records.
4. **Generating the Doctor's Report:**  
   Before her appointment, one click reads all her stored Walrus blobs and organizes them into an objective SOAP-format briefing (Subjective history, Objective readings, Assessment trends, and Questions worth asking the doctor).

---

## Meet the 3 Mothers in the Live Demo

LoveChild comes pre-loaded with 3 verified patient cohorts representing common clinical journeys. All 30 records are permanently archived on Walrus Mainnet:

### 1. Ada Bello (Week 30 • Pre-Eclampsia Watch • Kano)
* **What she logged:** Evening exhaustion at Week 20, swelling in ankles at Week 24, wedding ring getting stuck at Week 28, facial puffiness at Week 29, and home BP rising to 138/88 mmHg with a headache at Week 30.
* **Why Walrus matters:** Without memory, each symptom looks harmless. With Walrus, the upward blood pressure curve and shifting swelling pattern trigger an early Pre-Eclampsia alert.
* **Walrus Blobs:** 10 verified blobs on Mainnet ([View in blobs.md](evidence/blobs.md#cohort-1-ada-bello-week-30--pre-eclampsia-watch)).

### 2. Blessing Okon (Week 18 • Hyperemesis & Hydration • Port Harcourt)
* **What she logged:** Severe vomiting at Week 6, bile retching at Week 8, stomach burning from iron tablets at Week 10, dehydration during teaching hours at Week 12, recovering with cold electrolyte water at Week 13, and tolerating split iron doses with ginger tea at bedtime by Week 15.
* **Why Walrus matters:** Walrus tracks how modifying her medication timing resolved her vomiting, proving her adherence to the doctor.
* **Walrus Blobs:** 10 verified blobs on Mainnet ([View in blobs.md](evidence/blobs.md#cohort-2-blessing-okon-week-18--hyperemesis--hydration)).

### 3. Chiamaka Eze (Week 38 • Term Labor Readiness • Abuja)
* **What she logged:** Heartburn when lying flat at Week 28, fetal hiccups at Week 30, regular evening kick counts (10 kicks in 42 minutes) at Week 34, false labor cramps (Braxton-Hicks) at Week 36, delivery bag packing at Week 37, and baby dropping into the pelvis at Week 38.
* **Why Walrus matters:** Provides continuous reassurance of healthy baby movements and teaches her to distinguish false labor from active labor.
* **Walrus Blobs:** 10 verified blobs on Mainnet ([View in blobs.md](evidence/blobs.md#cohort-3-chiamaka-eze-week-38--term-labor-readiness)).

---

## Strict Medical Safety Rules

LoveChild is engineered with firm clinical boundaries:

* **Strict Warning on NSAIDs:** If a mother mentions taking Ibuprofen, Felvin, Aspirin, or Diclofenac for headaches or cramps, LoveChild immediately cautions her that NSAIDs can close the fetal ductus arteriosus and cause kidney complications in the third trimester.
* **Scribe, Not Doctor:** LoveChild never prescribes medications or claims to diagnose. It prepares the mother for her clinical appointment so the doctor can make informed decisions.
* **Direct Clinical Handoff:** The output of every conversation is designed to empower the doctor during the in-person consultation.

---

## Repository Structure

```
LoveChild/
├── evidence/
│   └── blobs.md             # All 30 Walrus blob IDs, timestamps, and symptom logs
├── app/
│   ├── page.tsx             # Main dashboard (Chat, Persona Switcher, Report Modal)
│   ├── layout.tsx           # Global layout & metadata
│   └── globals.css          # Styling & design system
├── components/
│   ├── ChatInterface.tsx    # Interactive chat with Walrus memory toggle
│   ├── ClinicalBriefing.tsx # 1-page printable Doctor's Report
│   ├── Navbar.tsx           # Navigation with blob count & quick actions
│   └── WalrusVault.tsx      # On-chain blob inspector drawer
├── lib/
│   ├── cohortData.ts        # 30 verified memories across Ada, Blessing, Chiamaka
│   ├── types.ts             # TypeScript definitions
│   └── server/
│       ├── walrus.ts        # Walrus SDK (@mysten-incubation/memwal) integration
│       └── gemini.ts        # Google Gemini 1.5 Flash clinical engine
├── ARTICLE.md               # 500-word Medium build article
├── WALRUS_FEEDBACK.md       # Bug bounty feedback & improvement proposals
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## How to Run Locally

### Requirements
* Node.js v18.0 or newer
* npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/nobl3Y/LoveChild.git
cd LoveChild
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root:
```env
# Walrus Memory Configuration
MEMWAL_PRIVATE_KEY=your_ed25519_delegate_private_key_hex
MEMWAL_ACCOUNT_ID=0x763b3b257e9575d546b449b8f2cc9a1ee05f8c3c0d17bfbd0e5d84bfc389e4d8
MEMWAL_SERVER_URL=https://relayer.memory.walrus.xyz

# Google Gemini API Key (Qualifies for Beyond the Big Two track)
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: LoveChild includes built-in fallback data for all 3 patient cohorts, so the app runs smoothly out of the box even without API keys!)*

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## License

MIT License. Built with care for **Walrus Session 8: Chatbots That Remember**.
