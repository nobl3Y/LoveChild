# LoveChild
### A Maternal Care Chatbot for Women • Powered by Walrus Protocol on Sui

[![Walrus Memory](https://img.shields.io/badge/Walrus-Decentralized%20Memory-0d9488?style=flat-square)](https://walrus.xyz)
[![Google Gemini](https://img.shields.io/badge/LLM-Google%20Gemini%201.5-f43f5e?style=flat-square)](https://deepmind.google/technologies/gemini/)
[![Prize Track](https://img.shields.io/badge/Prize%20Track-Beyond%20the%20Big%20Two-amber-500?style=flat-square)](https://www.deepsurge.xyz/hackathons)
[![Sui Blockchain](https://img.shields.io/badge/Network-Sui-4da2ff?style=flat-square)](https://sui.io)

---

## What is LoveChild?

LoveChild is a maternal care chatbot for pregnant women.

Whenever an expectant mother notices something unusual—morning sickness, sudden ankle swelling, a bad headache, or changes in how the baby kicks—she simply tells LoveChild in her own words. LoveChild saves every detail across her entire 40-week pregnancy onto decentralized Walrus Memory.

Before her clinic visit, LoveChild turns all those past notes into a clean 1-page **Doctor's Report**. She can show this directly to her doctor or print it out. Instead of sitting in front of her doctor and forgetting the small symptoms from three weeks ago, she gives the doctor the full picture.

The result is appointments where nothing gets missed, and women who feel prepared and heard.

---

## Why Walrus Memory Matters (The Big Problem It Solves)

Most chatbots have amnesia. The moment you close the chat, the bot forgets you completely.

During a 9-month pregnancy, that forgetfulness can be dangerous:
* In Week 24, a mother reports slightly high blood pressure.
* In Week 29, she reports sudden swollen ankles.
* In Week 30, she complains of a persistent headache behind her eyes.

A regular chatbot without memory treats each complaint as a brand-new, isolated event and says: *"Drink water and take a nap."*

**LoveChild with Walrus Memory connects the dots:**  
It recalls her Week 24 blood pressure, connects it with her Week 29 swelling and Week 30 headache, recognizes the classic danger signs of **Pre-Eclampsia** (pregnancy high blood pressure), warns her not to take dangerous painkillers like Ibuprofen, and immediately flags it on her Doctor's Report so her clinic can test her urine and blood pressure right away.

---

## Hackathon Submission Details

* **Hackathon:** Walrus Session 8: Chatbots That Remember
* **Prize Track:** Main Prize + **Beyond the Big Two** (built with **Google Gemini 1.5 Flash**)
* **Decentralized Storage:** Walrus Protocol on Sui
* **Users & Records:** 3 real pregnant mothers with 10+ memories each (33 total records stored on Walrus)
* **GitHub Repository:** [https://github.com/nobl3Y/LoveChild](https://github.com/nobl3Y/LoveChild)

---

## Meet the 3 Mothers in the Demo

You can test LoveChild with 3 different mothers at 3 different stages of pregnancy:

1. **Amina Bello (Week 30 • Month 7 • Kano)**
   * **Her story:** First-time mother.
   * **What she's tracking:** Sudden ankle swelling and a 48-hour headache.
   * **Walrus Memory:** 12 saved records. LoveChild connects her past blood pressure with her current symptoms to catch early Pre-Eclampsia risk.

2. **Blessing Okon (Week 18 • Month 4 • Port Harcourt)**
   * **Her story:** Mother of one, now pregnant with her second child.
   * **What she's tracking:** Severe morning sickness and dehydration on hot days.
   * **Walrus Memory:** 11 saved records. Tracks her hydration routine and baby kick activity.

3. **Chiamaka Eze (Week 37 • Month 9 — Full Term • Abuja)**
   * **Her story:** Mother of two reaching full term.
   * **What she's tracking:** Timing contractions and baby movements.
   * **Walrus Memory:** 10 saved records. Helps her know when contractions are false labor vs. real labor so she gets to the hospital on time.

---

## How to Test LoveChild in 30 Seconds

1. **Pick a Mother:** Click on Amina, Blessing, or Chiamaka at the top of the demo.
2. **Send a Message:** Type any question, or click one of the quick test buttons (like *"My ankles are swollen and I have a headache"*). The AI replies immediately.
3. **Compare Memory ON vs OFF:** Flip the **Walrus Memory** switch at the top of the chat:
   * **Memory ON:** LoveChild recalls her past weeks and catches danger signs.
   * **Memory OFF (Stateless):** LoveChild forgets past visits and gives generic advice.
4. **Open the Doctor's Report:** Click **"Doctor's Report"** (in the top navigation or inside the chat) to see the clean, printable 1-page summary created for her doctor.

---

## How It Works Under the Hood

```
   ┌─────────────────────────────────────────────────────────────┐
   │                    LoveChild Web App                        │
   │               (Next.js + Tailwind CSS)                      │
   └───────────────┬─────────────────────────────┬───────────────┘
                   │                             │
                   ▼                             ▼
       ┌──────────────────────┐      ┌──────────────────────┐
       │ Google Gemini 1.5    │      │ Walrus Memory Client │
       │ (Clinical AI Scribe) │      │ (Sui Identity Layer) │
       └──────────────────────┘      └───────────┬──────────┘
                                                 │
                                                 ▼
                                     ┌──────────────────────┐
                                     │ Walrus Decentralized │
                                     │ Storage (Blobs)      │
                                     └──────────────────────┘
```

1. **When the mother chats:** LoveChild searches Walrus for her past notes.
2. **When the AI responds:** Google Gemini 1.5 Flash uses both her new message and her past pregnancy history to give safe, compassionate answers.
3. **When a new note is saved:** A new decentralized blob is stored on Walrus so it is never lost or deleted.
4. **When she visits the clinic:** One click pulls all blobs into a clean clinical briefing for the doctor.

---

## Safe Health Guidelines Built-In

* **Never prescribes dangerous drugs:** If an expectant mother asks about common painkillers like Ibuprofen, Felvin, or Diclofenac, LoveChild warns her that NSAIDs can harm the baby's circulation and kidneys during pregnancy, especially in the third trimester.
* **Never replaces the doctor:** LoveChild prepares the mother for her doctor visit; it does not replace professional medical care.

---

## How to Run Locally

### Prerequisites
* Node.js v18 or newer
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

### 3. (Optional) Set your Google Gemini API key
LoveChild works right out of the box with its built-in clinical engine. If you want to connect live to Google Gemini 1.5 Flash, create a `.env.local` file:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the app
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## License
MIT License. Built for the Walrus Sessions 8 Hackathon.
