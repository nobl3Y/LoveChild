# LoveChild — Walrus Session 8: Chatbots That Remember

**Project Name:** LoveChild  
**Description:** A maternal care chatbot for women. She simply tells it about any problem she's facing, big or small, and it keeps a record of every detail she shares over time. Before her doctor's visit, it turns everything into a clear report, so she can give the doctor the full picture instead of forgetting the small things that often turn out to matter. The result is appointments where nothing gets missed, and women who feel prepared and heard.  
**Primary Contact:** arytajames@gmail.com  
**Dedicated Session Wallet:** `0xa5f68e387dd7a0c9b50a5db9000386133c83396a9afcd009727e87c3152c6d75`  
**MEMWAL_ACCOUNT_ID:** `0x763b3b257e9575d546b449b8f2cc9a1ee05f8c3c0d17bfbd0e5d84bfc389e4d8`  
**MEMWAL_AGENT_ID:** `91dbc368768df9776f4afd8f371c991c2a4efabf93aed421f3c3adb0950de418`  
**MEMWAL_SERVER_URL:** `https://relayer.memory.walrus.xyz`  
**MemWalAccount Explorer Link:** https://suiscan.xyz/mainnet/object/0x763b3b257e9575d546b449b8f2cc9a1ee05f8c3c0d17bfbd0e5d84bfc389e4d8  
**GitHub Repository:** https://github.com/nobl3Y/LoveChild  
**LLM / Track:** Google Gemini (qualifies for *"Beyond the Big Two: Open & Alternative Models"* - $150 Prize)  
**Storage & Memory:** Walrus Memory on Mainnet  
**Target Deadline:** Fri, Oct 9, 2026, 14:00 UTC (15:00 WAT) — Finish all builds & deployments by **Thu, Oct 8**!

---

## 📋 Hackathon Deliverables & Requirements Checklist

- [x] Joined Walrus Discord
- [ ] Registered on DeepSurge (`LoveChild`)
- [ ] Builder Registration Airtable Form submitted: https://airtable.com/appoDAKpC74UOqoDa/shro5iVzzjoWfZlPK
- [ ] Dedicated Sessions Wallet created (Save your `0x...` public address)
- [ ] Public GitHub repository initialized with clean setup instructions: `nobl3Y/LoveChild`
- [ ] Bot built using **Google Gemini** + **Walrus Memory on Mainnet**
- [ ] Deployed live (Web app on Vercel or Telegram bot) accessible to real users
- [ ] At least **3 different patient users/personas** interacting with LoveChild
- [ ] At least **10 memories stored per user** (Total 30+ memories/blobs stored on Walrus Mainnet)
- [ ] Documented at least 1 bug/friction point & 1 improvement idea for Walrus Memory
- [ ] GitHub issue filed on https://github.com/MystenLabs/MemWal/issues (Bug bounty eligible - $100 prize)
- [ ] Written 500–800 word build article published on Medium or Inkray
- [ ] Tweet on X tagging `@WalrusProtocol` with `#WalrusMemory` under the session announcement
- [ ] Promo post in a developer / health-tech community outside Walrus/Sui (e.g. Reddit r/web3, Dev.to)

---

## 🗓️ Day-by-Day Execution Plan

### Day 1 — Sun, Oct 4: Setup & Registration
1. Submit registration on DeepSurge and Airtable with LoveChild details.
2. Create dedicated Sui/Walrus wallet for Sessions.
3. Set up the local Git repo and clone/link `nobl3Y/LoveChild`.
4. Inspect Walrus Memory documentation & chatbot example.

### Day 2 — Mon, Oct 5: Core Chatbot + Walrus Memory Integration
1. Build the LoveChild conversation engine:
   - User profile & symptom intake (trimester, daily symptoms, mood, diet, vitals).
   - "Doctor Visit Report" generation prompt trigger (`/report` or "generate doctor summary").
2. Integrate **Walrus Memory**:
   - Store: Save symptoms, timestamps, severity, and patient context to Walrus blobs.
   - Recall: Fetch historical patient context per user ID on every new prompt.
   - LLM: Pass recalled Walrus context into Google Gemini.
3. Record "Before vs After" chat logs (how generic bot forgets previous symptoms vs how LoveChild remembers).

### Day 3 — Tue, Oct 6: Deployment & 3-User Testing (Crucial Day)
1. Deploy LoveChild to a live URL (Vercel) or live Telegram bot.
2. Ensure live instance points to Walrus Mainnet.
3. Run 3 real user personas across distinct sessions:
   - **User 1 (Amina - First Trimester):** Nausea, fatigue, prenatal vitamin sensitivities.
   - **User 2 (Blessing - Second Trimester):** Blood pressure checks, back pain, ultrasound questions.
   - **User 3 (Chioma - Third Trimester):** Swelling, Braxton Hicks contractions, birth plan prep.
4. Verify each user reaches **10+ stored memory blobs** on Walrus Mainnet.
5. Record your Walrus Agent ID and total Blob Count.

### Day 4 — Wed, Oct 7: Evidence Collection & Bug Bounty
1. Take high-resolution screenshots of the 3 user conversation flows and generated doctor reports.
2. Note any friction points encountered with Walrus Memory + Google Gemini.
3. File a formal bug report / friction issue on https://github.com/MystenLabs/MemWal/issues.

### Day 5 — Thu, Oct 8: Article & Social Distribution
1. Write 600-word story on Medium / Inkray:
   - *Title:* "How We Built LoveChild: A Maternal Care Chatbot That Never Forgets Symptoms Using Walrus Memory"
   - Problem, architecture, before vs after, real patient proof, friction points.
2. Post on X tagging `@WalrusProtocol` with `#WalrusMemory`.
3. Post promo link in an external community (Reddit r/healthtech or r/web3builders).

### Day 6 — Fri, Oct 9 (Before 10:00 WAT): Final Submission
1. Complete final submission form on Airtable and DeepSurge before 14:00 UTC.
2. Verify all links (GitHub, Medium, X, Demo) are public and accessible.
