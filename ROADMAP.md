# Walrus Sessions 8: Chatbots That Remember — Roadmap

**Today:** Sun, Oct 4, 2026 (about 03:00 WAT)
**Deadline:** Fri, Oct 9, 2026, 14:00 UTC (= **15:00 Lagos time**). Aim to finish by **Thu Oct 8 night** and use Oct 9 morning only as buffer.
**Results:** Oct 16, 2026

> Time is tight (~5 days). Deploying early matters most, because the bot needs a few days of real use before the article is written.

---

## 0. What we must deliver (the checklist)

- [ ] Registered on DeepSurge (project name, chatbot description, contact, GitHub)
- [ ] Working chatbot using **Walrus Memory on Mainnet**
- [ ] Deployed on a real channel (Telegram / Discord / Slack / website / CLI)
- [ ] **3+ different users**, each with **10+ memories**
- [ ] Agent has **at least 10 blobs on Mainnet** (need agent ID and blob count as proof)
- [ ] Dedicated wallet address created just for Sessions
- [ ] Public GitHub repo with README and setup instructions
- [ ] LLM and runtime stated (a non-Anthropic/OpenAI model also qualifies for the $150 "Beyond the Big Two" prize)
- [ ] Article on Medium or Inkray (500–800 words) with before/after and evidence
- [ ] X post tagging **@WalrusProtocol** with **#WalrusMemory**
- [ ] Walrus Memory feedback: at least 1 bug/friction point and 1 improvement idea
- [ ] GitHub issue(s) on https://github.com/MystenLabs/MemWal/issues (bug bounty)
- [ ] Joined the Walrus Discord
- [ ] Promo post in a community **outside** Walrus/Sui (Reddit, dev forum, etc.)
- [ ] Airtable submission form filled in: https://airtable.com/appoDAKpC74UOqoDa/shro5iVzzjoWfZlPK

---

## 1. Day-by-day plan

### Day 1 — Sun Oct 4 (today): Decide and set up (about 3 hrs)
| Time | Task |
|---|---|
| Now | Join the Walrus Discord. Register on DeepSurge. Fill in the mandatory registration form. |
| +30 min | **Decide the idea.** Pick one simple use case (e.g. customer support bot or personal coach bot). Avoid overbuilding. |
| +30 min | **Pick the channel.** Telegram is recommended because it is the fastest to deploy and easy to get friends to use. |
| +30 min | **Pick the LLM.** Gemini, Groq, DeepSeek or Llama qualify for the extra $150 category. Note any friction you hit. |
| +1 hr | Read the docs: Chatbot example (https://docs.wal.app/walrus-memory/examples/chatbot), MemWal repo, and the Walrus blog. |
| +30 min | Create a **dedicated Sessions wallet**. Get Mainnet SUI/WAL for fees. Create a public GitHub repo. |

### Day 2 — Mon Oct 5: Build the core (full day)
- [ ] Get the bot replying in your channel (no memory yet)
- [ ] **Record "before" conversations** (screenshots or logs). You need these for the before/after section.
- [ ] Integrate Walrus Memory:
  - **Store:** what gets saved (preferences, names, issues, order details, goals)
  - **Recall:** fetch relevant memories at the start of each chat and before each reply
  - **Use:** inject recalled memories into the LLM prompt
- [ ] Keep memory **separate per user**
- [ ] Test the full loop yourself: chat, close, come back, bot remembers
- [ ] Note every bug or friction point as you go (feeds the bug bounty and feedback form)

### Day 3 — Tue Oct 6: Deploy and onboard users (**critical**)
- [ ] Deploy somewhere that stays online (Render, Railway, VPS, etc.)
- [ ] Confirm it runs on **Mainnet**
- [ ] Write the README (setup steps, env variables, how to run). Test it from a clean clone.
- [ ] **Invite at least 5 people** (need 3 minimum, so have spares) and ask them to chat across multiple sessions
- [ ] Each user needs **10+ memories**, so give them prompts like "tell it about your job, goals, preferences, problems"
- [ ] Verify that blobs are appearing (target 10+ blobs total, aim for 30+)

### Day 4 — Wed Oct 7: Run, observe, collect evidence
- [ ] Ask users to come back for **second and third sessions**
- [ ] Screenshot the moments where the bot recalls something from earlier and it **mattered**
- [ ] Save conversation logs (remove private info)
- [ ] Check each of the 3+ users has 10+ memories
- [ ] Record the agent ID and blob count
- [ ] File GitHub issues for bugs found (steps to reproduce, expected vs. actual, environment: model, runtime, OS, SDK version)
- [ ] Optional: record a short demo video

### Day 5 — Thu Oct 8: Write and publish
| Time | Task |
|---|---|
| Morning | Write the article (500–800 words). See outline below. |
| Midday | Publish on Medium and/or Inkray |
| Afternoon | Post on X: link, **@WalrusProtocol**, **#WalrusMemory**, under the session announcement |
| Afternoon | Post in a community **outside Walrus/Sui** (relevant subreddit, dev forum, Discord server) for the Promo Prize |
| Evening | Final repo cleanup: README, remove secrets, add screenshots |

### Day 6 — Fri Oct 9: Submit (before 15:00 Lagos)
- [ ] **Morning (by 10:00):** Fill in the Airtable form:
  - LLM / runtime
  - GitHub repo link
  - Bug/friction point and improvement idea
  - Article link
  - X post link
  - Promo post link
  - Agent ID, blob count and wallet address
- [ ] Submit on DeepSurge
- [ ] Double-check every link is public and works
- [ ] Do not wait until the last hour

---

## 2. Article outline (500–800 words)

1. **Title:** written for someone searching "how to add memory to a chatbot" or "chatbot that remembers users between sessions"
2. **The problem:** what your bot does, who it is for, and why forgetting hurts
3. **How Walrus Memory is wired in:** what is stored, when it is recalled, how it shapes replies (include a short code or diagram)
4. **Before vs. after:** same user, same question, with and without memory
5. **Real use:** screenshots, logs, number of users and memories, a live link
6. **What broke:** honest friction points and what you would improve
7. **Call to action:** invite readers to build their own

---

## 3. Judging criteria

1. **Does it actually remember?** Memory must do real work, not be decorative.
2. **Real-world use:** real users and a convincing before/after.
3. **Build quality:** clean, documented, reproducible repo.
4. **Article:** clear, honest, useful to a beginner.

## 4. Prizes to aim for

- Best Chatbot ($500 / $250 / $150)
- Beyond the Big Two (2 x $150): use a non-Anthropic/OpenAI model
- Best Article (3 x $100)
- Bug Bounty (5 x $100): file good GitHub issues
- Promo Prize (5 x $100): post outside Walrus/Sui communities

## 5. Risks and fallbacks

| Risk | Fallback |
|---|---|
| Not enough users | Ask friends, family and classmates. Use different accounts per person. Start inviting on Day 3. |
| Mainnet or funding problems | Ask in the Walrus Discord early (Day 2). |
| Running out of time | Cut features, not deployment. A simple bot with clear memory beats a complex one. |
| Bug blocks progress | Log it as a GitHub issue (counts toward the bounty) and work around it. |

## 6. Rules to remember

- One submission per person or team
- Everything must be on **Mainnet**
- Prize wallet must be sent within 21 days of the announcement
- Must be 18+ and not in a restricted jurisdiction
- Never commit private keys or API keys to the public repo
