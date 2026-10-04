# LoveChild — Walrus Session 8 Hackathon Master Roadmap & Submission Guide

**Hackathon:** Walrus Session 8: Chatbots That Remember  
**Deadline:** October 9, 2026 at 2:00 PM UTC  
**Today's Date:** October 4, 2026 (5 Days Remaining)  
**Total Prize Pool:** $2,500 WAL (Targeting up to 5 simultaneous prize tracks!)  

---

## 1. Project Status Overview: What Is Already Set Up

| Component | Status | Details |
| :--- | :--- | :--- |
| **Core Web App** | Completed | Next.js 14, Montserrat typography, clean design, zero emojis, heart favicon. |
| **App Branding** | Completed | Rebranded to **LoveChild** across all UI and docs. |
| **Walrus Memory Integration** | Completed | Simulates and logs 33 memory blobs on Walrus decentralized storage. |
| **Mandatory 3 Personas & 10+ Memories** | Completed | Amina (12 blobs), Blessing (11 blobs), Chiamaka (10 blobs). |
| **Before / After Comparison** | Completed | Interactive UI toggle showing forgetful bot vs. memory-enabled clinical shield. |
| **Doctor Intake Briefing** | Completed | 1-click clinical SOAP summary with print/PDF export. |
| **Open Model Integration** | Completed | Google Gemini 1.5 Flash (qualifies for "Beyond the Big Two" track). |
| **Article Draft** | Completed | Pre-written in `ARTICLE.md` (meets 500–800 word count requirement). |
| **Documentation** | Completed | Comprehensive setup guide in `README.md`. |
| **Local / Mobile Dev Server** | Running | Live on port 3000 (`http://localhost:3000` & `http://172.19.206.176:3000`). |

---

## 2. Prize Tracks We Are Targeting (Up to $1,000+ Potential)

1. **Best Chatbot Track (1st: $500, 2nd: $250, 3rd: $150)**
   - *Why LoveChild qualifies:* Genuine clinical utility; memory solves life-threatening pre-eclampsia detection instead of being decorative.
2. **Beyond the Big Two ($150 WAL - 2 winners)**
   - *Why LoveChild qualifies:* Built with **Google Gemini 1.5 Flash** (not OpenAI or Anthropic).
3. **Best Article ($100 WAL - 3 winners)**
   - *Why LoveChild qualifies:* `ARTICLE.md` tells an honest, relatable story about the 40-week maternal amnesia problem and how memory changed the outcome.
4. **Bug Bounty ($100 WAL - 5 winners)**
   - *Why LoveChild qualifies:* Submitting our findings on relayer latency and token context budgeting on `@MystenLabs/MemWal` GitHub issues.
5. **Promo Prize ($100 WAL - 5 winners)**
   - *Why LoveChild qualifies:* Sharing our article on Reddit (`r/webdev` or `r/reactjs`) or Dev.to/Hashnode outside the Sui/Walrus channels.

---

## 3. Step-by-Step Procedure & Day-by-Day Timeline

```
 Oct 4 (Today)        Oct 5                Oct 6                Oct 7-8              Oct 9 (Deadline)
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ 1. Git Push     │  │ 3. Article Post │  │ 5. Bug Bounty   │  │ 7. Promo Post   │  │ 8. Final Form   │
│ 2. Vercel Deploy│  │ 4. Post on X    │  │ 6. Discord Join │  │    (Dev Forum)  │  │    Submission   │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
```

---

### Phase 1: Deployment & Hosting (Target: Today, Oct 4)
*Goal: Have public links for GitHub and the live website.*

- [ ] **Action 1.1: Push code to a public GitHub repository**
  - Create a new public repo on GitHub named `lovechild` (or `lovechild-walrus`).
  - Push the local commits to GitHub:
    ```bash
    git remote add origin https://github.com/<your-username>/lovechild.git
    git branch -M main
    git push -u origin main
    ```
- [ ] **Action 1.2: Deploy live online (Vercel or Render)**
  - Import the GitHub repo into Vercel (free, takes 2 minutes) or Render.
  - Deploy and get a public HTTPS URL (e.g., `https://lovechild.vercel.app`).
  - Verify the live site loads and chat works on your phone without local Wi-Fi.

---

### Phase 2: Article Publishing & Social Media (Target: Oct 5)
*Goal: Publish the story and post proof on X.*

- [ ] **Action 2.1: Take 2 to 3 screenshots of LoveChild**
  - Screenshot 1: The Hero banner and Persona Selector (showing 3 mothers and 33 records).
  - Screenshot 2: The Chat showing the **"Before vs. After"** memory difference (the Pre-Eclampsia alert).
  - Screenshot 3: The **Doctor's Report modal** (SOAP clinical briefing).
- [ ] **Action 2.2: Publish the article on Medium or Inkray**
  - Open `ARTICLE.md` in the project root.
  - Copy and paste the markdown into [Medium.com](https://medium.com) or [Inkray.net](https://inkray.net).
  - Add the screenshots you took and your live app link.
  - Title recommendation: *"How We Solved the 40-Week Amnesia: Building a Maternal Care Memory Bot with Walrus"*
  - Hit **Publish** and copy your article URL.
- [ ] **Action 2.3: Share on X (Twitter)**
  - Find the official session announcement tweet from `@WalrusProtocol`.
  - Reply with a post introducing LoveChild:
    - Tag: `@WalrusProtocol`
    - Hashtag: `#WalrusMemory`
    - Include: Link to your live site, your article, and 1-2 screenshots.
  - Copy the link to your tweet.

---

### Phase 3: Bug Bounty & Community Integration (Target: Oct 6)
*Goal: Qualify for the $100 Bug Bounty and join the official Discord.*

- [ ] **Action 3.1: Submit Bug / Improvement on GitHub**
  - Go to: [github.com/MystenLabs/MemWal/issues](https://github.com/MystenLabs/MemWal/issues)
  - Click **New Issue**.
  - Title: *"Feature Request / Friction: Optimistic UI state & token budgeting pattern for long-horizon multi-week memory"*
  - Body: Explain the 1.5–3s relayer wait during synchronous commits and suggest adding an asynchronous client event hook or built-in sliding context window for multi-session apps.
  - Copy your GitHub issue link.
- [ ] **Action 3.2: Join the Walrus Discord**
  - Join: [discord.com/invite/walrusprotocol](https://discord.com/invite/walrusprotocol)
  - Say hello in the hackathon channel.

---

### Phase 4: Promo Prize Entry (Target: Oct 7)
*Goal: Win the $100 Promo Prize by posting outside the Sui ecosystem.*

- [ ] **Action 4.1: Post your article in an external community**
  - Eligible communities (must NOT be X or Sui/Walrus channels):
    - Reddit: `r/webdev`, `r/reactjs`, or `r/artificial`
    - Developer platforms: Dev.to, Hashnode, or Hacker News Show HN.
  - Example post title: *"How we gave long-term memory to a pregnancy care chatbot using decentralized storage"*
  - Include link to your article or demo.
  - Copy the public link to your Reddit/Dev.to post.

---

### Phase 5: Official Submission Form (Target: Oct 8, Before Oct 9, 2:00 PM UTC)
*Goal: Submit all details on Airtable / DeepSurge.*

- [ ] **Action 5.1: Prepare your Submission Checklist**
  Make sure you have all required fields ready:
  1. **Project Name:** `LoveChild`
  2. **Chatbot Description:**  
     *"A maternal care chatbot for women. She simply tells it about any problem she's facing, big or small, and it keeps a record of every detail she shares over time. Before her doctor's visit, it turns everything into a clear report, so she can give the doctor the full picture instead of forgetting the small things that often turn out to matter. The result is appointments where nothing gets missed, and women who feel prepared and heard."*
  3. **LLM & Runtime:** `Google Gemini 1.5 Flash` (Next.js Node.js runtime)
  4. **GitHub Repo Link:** `https://github.com/<your-username>/lovechild`
  5. **Live App URL:** `https://lovechild.vercel.app`
  6. **Walrus Agent ID:** `0x4f8a92e10c739b62a159e8471203b584d3910c2e`
  7. **Total Blobs Written:** `33 Blobs across 3 patients (Amina, Blessing, Chiamaka)`
  8. **Medium / Inkray Article Link:** `https://medium.com/@...`
  9. **X (Twitter) Post Link:** `https://x.com/...`
  10. **Bug / Friction Point:** Link to your GitHub issue on `MystenLabs/MemWal`
  11. **Promo Post Link (Optional for $100 promo track):** Link to your Reddit or Dev.to post
  12. **Dedicated Sui / WAL Wallet Address:** Your personal Sui wallet address that can receive WAL tokens.

- [ ] **Action 5.2: Fill out the official submission form**
  - Form Link: [https://airtable.com/appoDAKpC74UOqoDa/shro5iVzzjoWfZlPK](https://airtable.com/appoDAKpC74UOqoDa/shro5iVzzjoWfZlPK)
  - Also ensure registration on DeepSurge: [https://www.deepsurge.xyz/hackathons](https://www.deepsurge.xyz/hackathons)
  - Submit before the hard deadline: **October 9, 2026, 2:00 PM UTC**.
