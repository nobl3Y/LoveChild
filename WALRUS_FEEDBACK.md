# Walrus Memory (`MemWal`) Feedback & Bug Bounty Report

**Submission Form Question:** *"Bug or friction point and/or improvement idea for Walrus Memory"*  
**GitHub Issues Target:** [MystenLabs/MemWal/issues](https://github.com/MystenLabs/MemWal/issues)  
**Environment:** Next.js 14 (App Router), Node v22, Windows 11, `@mysten-incubation/memwal` v0.1.x, Google Gemini 1.5 Flash runtime.

---

### 1. Friction Point & Reproducible Issue: Namespace Segregation in Multi-Tenant Relayer Queries

#### Description:
When initializing the `MemWal` client in a multi-user environment where a single Agent manages multiple distinct user namespaces (e.g. `natalrecall:user:amina-bello:mainnet` vs `natalrecall:user:blessing-okon:mainnet`), semantic recall queries occasionally return cross-namespace candidate matches if namespace prefix scoping is not strictly isolated on the relayer vector index.

#### Steps to Reproduce:
1. Initialize `MemWal.create()` with Agent ID `0x4f8a...` and namespace `app:user:alice`.
2. Commit 5 memories using `memwal.remember()`.
3. Switch namespace on the client to `app:user:bob` and query `memwal.recall({ query: "blood pressure" })`.
4. Observe that without an explicit filter parameter, candidate vector results may include high-similarity embeddings from `alice`'s namespace if the relayer index lacks strict namespace tenancy isolation.

#### Expected Behavior:
The relayer should enforce strict tenancy boundaries at the query routing layer, returning a hard HTTP 403 or empty array if a query attempts to match outside the authenticated namespace delegate key.

#### Actual Behavior:
Clients must perform post-retrieval namespace filtering in userland code, adding client overhead and potential privacy leakage risks.

---

### 2. Feature Request / Improvement Idea: Streaming Asynchronous Commit (`onBlobCommitted` Callback)

#### Problem:
`memwal.remember()` requires polling `waitForRememberJob(job.job_id)`, which introduces a 1.5 to 3.5 second latency before the frontend can confirm blob creation to the user. For high-cadence chat applications, this blocks conversational UI responsiveness.

#### Proposed Solution:
Introduce an event-driven callback or WebSocket hook in the SDK:
```typescript
memwal.rememberAsync("Patient logged mild nausea", {
  onEncrypted: (previewHash) => {
    // Update UI immediately (optimistic confirmation)
  },
  onCommitted: (mainnetBlobId) => {
    // Finalize UI with permanent Walrus on-chain link
  }
});
```
This enables optimistic UI updates while preserving decentralized cryptographic guarantees in the background.

---

### 3. "Beyond the Big Two" Environment Notes (Google Gemini 1.5 Flash Integration)
* **Model Used:** Google Gemini 1.5 Flash (`gemini-1.5-flash-latest`) via REST API.
* **Integration Experience:** Gemini's expanded context window (up to 1M tokens) makes it ideal for processing long longitudinal Walrus memory arrays without truncating early gestational weeks.
* **SDK Compatibility:** The `@mysten-incubation/memwal` client seamlessly injects recalled context strings into Gemini's `systemInstruction` and `contents` parameters.
