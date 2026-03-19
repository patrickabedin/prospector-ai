# hellenicAI — OpenClaw Optimization Guide
## Token-Efficient Configuration for a Multi-User Business Instance

**Written by:** MOTHER (SKYNET / Patrick's personal OpenClaw)
**Date:** 2026-03-19
**For:** hellenicAI — completely isolated server, Hellenic Technologies employees only
**Based on:** Lessons from SKYNET session (see OpenRouter logs — 90K+ token main sessions)

> ⚠️ **Isolation note:** hellenicAI runs on its own server with zero access to SKYNET's files,
> trading data, Bitget credentials, or Patrick's personal memory. These are two completely
> separate OpenClaw instances. This guide covers hellenicAI's own configuration only.

> 📝 **Brand name:** always lowercase "h" — hellenicAI, never HellenicAI.

> 🤖 **Model used for ProspectorAI:** Sonnet 4.6 (sections 1–9, data-heavy) + MiniMax (sections 10–14, synthesis).
> OPUS was NOT used for ProspectorAI — it was used for SKYNET trading QA only.

---

## 1. The Core Problem (What You See in the Logs)

Looking at the OpenRouter logs:
- Main session calls: **90K–104K input tokens** @ $0.05–$0.25 each (Sonnet 4.6)
- Sub-agent calls: **300–330 tokens** @ $0.001 (Haiku 4.5)
- Memory search: **46–180 tokens** @ $0.000005 (Embeddings)

The main session is expensive because it carries the full compacted context every turn.
Sub-agents are cheap because they start fresh with a lean task spec.

**hellenicAI's goal:** Keep MiniMax as the daily driver. Sonnet 4.6 fires only when genuinely needed.

---

## 2. Model Routing Strategy

### Default Model: MiniMax (minimax/minimax-01)
**Use for:**
- Routine employee questions and answers
- File reads, summaries, short analysis
- Heartbeat checks
- Simple task delegation
- ProspectorAI section writes (non-data sections: 10–14, appendices)
- Memory reads and writes
- Any task where output < 500 tokens

### Escalate to Sonnet 4.6: `openrouter/anthropic/claude-sonnet-4-5`
**Use for:**
- DataForSEO API calls + analysis (ProspectorAI sections 1–9)
- Multi-step reasoning (competitive analysis, budget justification)
- Strategy synthesis (anything client-facing)
- Complex code generation
- Any task where output > 500 tokens AND quality matters
- Sub-agent tasks that involve reading + transforming large datasets

### Never Needed (for hellenicAI)
- Opus: overkill for business tasks; avoid unless Patrick explicitly requests
- Haiku: MiniMax is cheaper and just as capable for routine use

### How to Implement in SOUL.md
```
## Model Policy
- Default: minimax/minimax-01 (all routine tasks)
- Complex/analysis: escalate to openrouter/anthropic/claude-sonnet-4-5
- Sub-agents: use minimax/minimax-01 unless task requires deep reasoning
- ProspectorAI data sections: always sonnet-4-5
- ProspectorAI synthesis sections: minimax is fine
```

---

## 3. Session Architecture — Keep Main Session Lean

### The Problem
The main session accumulates context with every turn. At 100K tokens, each call costs $0.05+.
With 5+ employees using hellenicAI, this compounds fast.

### Solution: Route Most Work to Sub-Agents

```
Employee → hellenicAI main session (MiniMax, always lean)
               ↓
         Spawn sub-agent for actual work (MiniMax or Sonnet)
               ↓
         Sub-agent reports result back
               ↓
         Main session relays to employee (1-2 sentence summary)
```

**Rule:** Main session is a router, not a worker.

### Compact Aggressively
- Set `/compact` to trigger at **40K tokens** (not 60K like SKYNET)
- Multiple employees = context grows faster
- Add to HEARTBEAT.md: check `/status` every 10 turns; if >35K → `/compact`

### CURRENT.md — Use It Hard
- Every active ProspectorAI job: write domain, status, section number to CURRENT.md
- Every employee task: write what's in progress, who requested it
- On heartbeat: read CURRENT.md first (5 tokens, not 50K)

---

## 4. Memory Architecture

### Three-Tier Memory (same as SKYNET, adapted for business)

```
CURRENT.md          ← What's happening RIGHT NOW (read every turn)
memory/YYYY-MM-DD.md ← Daily log (append only, read on demand)
MEMORY.md           ← Long-term curated memory (read in main session only)
```

### What Goes in Each

**CURRENT.md (always read, keep under 50 lines):**
```markdown
# CURRENT STATE

## Active ProspectorAI Jobs
- [domain]: In progress, section X of 14
- [domain]: Complete, file at /root/prospector_ai/outputs/[domain]/

## Recent Employee Requests
- [Employee]: Asked for [task] at [time]

## Pending
- [anything waiting on Patrick/employee input]
```

**MEMORY.md (business context only, not trading):**
- Hellenic Technologies company profile (services, clients, pricing)
- Employee names and roles
- ProspectorAI lessons (what works, what doesn't)
- DataForSEO API notes (endpoint gotchas, rate limits)
- Recurring client types and what they need

**memory/YYYY-MM-DD.md (daily raw log):**
- Every ProspectorAI run: domain, sections completed, file size, GitHub commit
- Every employee interaction worth remembering
- Errors and how they were fixed

### Memory Search
Configure `agents.defaults.memorySearch.provider = "openai"` (remote) — local embeddings require node-llama-cpp which may not be installed on new server.
Cost: ~$0.000005 per search (Text Embedding 3 Small) — essentially free, use freely.

---

## 5. SOUL.md Configuration for hellenicAI

Keep it short. Long SOUL.md = expensive every turn.

```markdown
# SOUL.md — hellenicAI

## Identity
- Name: hellenicAI (lowercase h — always)
- Also known as: MOTHER (if anyone asks "what are you?")
- Role: AI Strategist & Digital Operations Assistant
- Company: Hellenic Technologies (hellenictechnologies.com)
- Emoji: 🏛️

## CRITICAL: Isolation
- hellenicAI runs on its own isolated server
- No access to SKYNET, trading systems, or Patrick's personal files
- No crypto credentials, no Bitget, no trading data
- This is a business-only instance

## Core Rules
1. Main model is MiniMax — stay lean, route heavy work to sub-agents
2. Escalate to Sonnet 4.6 only for: strategy, complex analysis, client-facing content
3. ALL ProspectorAI data comes from DataForSEO API — no inference ever
4. Never output strategy files to chat — file only, then send summary
5. Keep main session under 40K tokens — compact aggressively
6. One sub-agent at a time — no parallel spawns (employee-facing instance)

## Sub-Agent Protocol (Terminator Corps)
When a task requires research, analysis, or heavy work — spawn a sub-agent.
Name them like SKYNET does:
- T-100: Recon & analysis (reads files, audits, investigates)
- T-500: Bug hunter / error investigation
- T-800: Heavy builder (new features, long content generation)
- T-1000: QA — probes every weakness, verifies output
- T-X: Complex multi-step missions

Example: "ProspectorAI for client.gr" → spawn T-800 with lean spec → T-800 executes → T-1000 verifies → report back.

## ProspectorAI Trigger
"ProspectorAI [domain]" → read SKILL.md at skills/prospector-ai/SKILL.md → execute

## Model Policy
Default: minimax/minimax-01
Complex/analysis/client-facing: openrouter/anthropic/claude-sonnet-4-5
Sub-agents: minimax unless task requires deep reasoning

## Workspace
/root/hellenic_ai/ (completely separate from any other system)
```

**What NOT to put in SOUL.md:**
- Trading system references (this is a business instance)
- Sensitive credentials
- Long lists of rules (put them in AGENTS.md instead)
- References to SKYNET's trading lore (keep it professional for employees)

---

## 6. AGENTS.md Configuration for hellenicAI

### Key Sections to Include

**Session Startup Protocol (short version):**
```markdown
## Every Session
1. Read CURRENT.md — active jobs and state
2. Read memory/YYYY-MM-DD.md (today) if needed
3. Read SOUL.md — identity and model policy
4. Do NOT read MEMORY.md unless employee asks about company history/context
```

**Sub-Agent Protocol:**
```markdown
## Sub-Agent Rules
- Max 1 sub-agent at a time (this is not a trading orchestrator)
- Task string: max 1000 chars (lean specs only)
- Files: use attachments[], never paste inline
- Default model: minimax/minimax-01
- ProspectorAI data sections: sonnet-4-5
- Always verify output before reporting to employee
- Timeout: 600s for ProspectorAI, 120s for everything else
```

**Token Discipline:**
```markdown
## Token Rules
- Never narrate routine tool calls
- Batch independent tool calls in one block
- Read only what's needed — use offset/limit on large files
- If context > 35K → /compact before continuing
- Heartbeat: HEARTBEAT_OK unless something needs attention (no verbose replies)
```

---

## 7. ProspectorAI-Specific Optimizations

### Learned the Hard Way (from ONE EVENT run)

**Problem:** Single 900s subagent times out around section 9–10 on DataForSEO-heavy runs.

**Solution — Two-Phase Execution:**
```
Phase 1 (Sonnet 4.6, 700s): Sections Pre-flight through 9
  - All DataForSEO API calls happen here
  - Data-heavy sections
  - Appends to file after each section

Phase 2 (MiniMax, 300s): Sections 10–14 + Appendices A/B/C
  - No new API calls — synthesis only
  - MiniMax is perfectly capable for this
  - Appends to file
```

**Why this works:**
- Phase 1 cost: ~$0.25 (Sonnet, lots of tokens from API responses)
- Phase 2 cost: ~$0.02 (MiniMax, pure generation from context)
- Total: ~$0.27 vs $0.50 if you ran both phases in Sonnet

### DataForSEO API Call Discipline
- Fetch data ONCE per endpoint per domain — cache it in the script
- Don't re-call ranked_keywords if you already have it
- Pass data between sections via file variables, not re-API-calls
- Rate limit: if >5 calls in sequence, add 1s delay between each

### Output File Protocol
- Save after EVERY section (crash-safe)
- File in `/root/hellenic_ai/outputs/{domain}/`
- GitHub push after final section only (not per-section)
- Send to employee: file attachment + executive summary (Section 1 excerpt)

---

## 8. Heartbeat Configuration

### HEARTBEAT.md for hellenicAI (minimal)

```markdown
# HEARTBEAT.md — hellenicAI

## On every heartbeat:

### 1. Check token usage
- If session > 35K tokens → /compact immediately
- If session > 25K tokens → warn in reply

### 2. Check active ProspectorAI jobs
- Read CURRENT.md
- If any job "In Progress" for >30min → check if sub-agent is still running
- If sub-agent timed out → resume from last completed section

### 3. Check DataForSEO balance
curl -s https://api.dataforseo.com/v3/appendix/user_data \
  -H "Authorization: Basic [base64]" | jq '.tasks[0].result[0].money.balance'
- If balance < $50 → alert Patrick

### 4. Nothing to do?
Reply HEARTBEAT_OK
```

**Heartbeat model:** Set to MiniMax — heartbeats should cost < $0.001 each.

---

## 9. Employee-Facing Configuration

### What Employees Can Trigger
```
ProspectorAI [domain]                    → Full strategy run
ProspectorAI [domain] with budget €X/month → Strategy with budget context
/status                                  → Session token count
/compact                                 → Compact context
```

### What to Block / Gate
- No access to trading systems (completely separate instance)
- No access to Patrick's personal memory files
- No access to Bitget/crypto credentials
- Employees should NOT be able to run arbitrary shell commands

### Response Style for Employee Use
- Professional, concise (not casual like SKYNET)
- No Terminator roleplay
- Report progress clearly ("Section 4 of 14 complete")
- Always confirm before external sends (emails, GitHub pushes, etc.)

---

## 10. Cost Estimates

### Per ProspectorAI Run
| Phase | Model | Tokens | Cost |
|-------|-------|--------|------|
| Data sections (1–9) | Sonnet 4.6 | ~150K in / 15K out | ~$0.25 |
| Synthesis sections (10–14 + appendices) | MiniMax | ~20K in / 15K out | ~$0.01 |
| GitHub push | — | — | $0.00 |
| **Total per strategy** | | | **~$0.26** |

### Per Employee Session (routine questions)
| Task | Model | Cost |
|------|-------|------|
| Routine Q&A (10 turns) | MiniMax | ~$0.005 |
| Complex analysis request | Sonnet | ~$0.05 |
| Heartbeat | MiniMax | <$0.001 |
| Memory search | Embeddings | ~$0.00001 |

### Monthly Estimate (5 employees, 3 ProspectorAI runs/week)
| Item | Cost |
|------|------|
| ProspectorAI (12 runs/month × $0.26) | $3.12 |
| Employee sessions (5 × 20 turns/day × 30 days) | ~$5.00 |
| Heartbeats | ~$0.50 |
| **Total** | **~$8.60/month** |

Compare to: SKYNET alone (trading) = $50–$100/month (much heavier Sonnet usage)

---

## 11. Config Recommendations

### openclaw.json key settings for hellenicAI
```json
{
  "agents": {
    "defaults": {
      "model": "openrouter/minimax/minimax-01",
      "memorySearch": {
        "provider": "openai"
      }
    },
    "heartbeat": {
      "model": "openrouter/minimax/minimax-01"
    }
  },
  "session": {
    "compactThreshold": 40000
  }
}
```

### OpenRouter Routing Preset (optional)
Create a preset in OpenRouter:
- Name: "hellenicAI Default"
- Primary: minimax/minimax-01
- Fallback: anthropic/claude-sonnet-4.5 (if minimax is down)

---

## 12. Quick Reference Card (for Patrick)

| Situation | Model | Why |
|-----------|-------|-----|
| Employee asks a question | MiniMax | Cheap, fast enough |
| ProspectorAI data sections 1–9 | Sonnet 4.6 | Complex API analysis |
| ProspectorAI synthesis sections 10–14 | MiniMax | No new data, just writing |
| Heartbeat | MiniMax | Should be nearly free |
| Sub-agent for simple task | MiniMax | Lean spec = cheap |
| Sub-agent for strategy/analysis | Sonnet 4.6 | Quality matters |
| Memory reads/writes | (built-in) | Embeddings = nearly free |
| Code generation | Sonnet 4.6 | Quality matters |

---

## 13. Files to Create on hellenicAI at First Boot

```
/root/hellenic_ai/
├── SOUL.md                    ← Identity + model policy (keep short)
├── AGENTS.md                  ← Full behavioral rules
├── MEMORY.md                  ← Company context + learned lessons
├── CURRENT.md                 ← Active state (always lean)
├── HEARTBEAT.md               ← Heartbeat checklist (minimal)
├── TOOLS.md                   ← API keys, endpoints, notes
├── USER.md                    ← Employee roster + Patrick's contact
├── outputs/                   ← ProspectorAI strategy files
└── skills/
    └── prospector-ai/         ← Clone from patrickabedin/prospector-ai
```

### Bootstrap MEMORY.md with:
- Hellenic Technologies company profile (copy from SKYNET's MEMORY.md section)
- All 7 service product lines (Viking, Knight, Samurai, etc.)
- DataForSEO credentials and notes
- ProspectorAI execution lessons (two-phase, MiniMax for synthesis)
- GitHub repo: patrickabedin/prospector-ai
- Patrick's role: Supreme Leader / Owner (not an employee)

---

*This guide was written from 6+ months of SKYNET operational experience.*
*The token patterns in the OpenRouter logs confirm: main session is the expensive part.*
*Keep it lean. Route everything. Let sub-agents do the work.*
*— MOTHER, 2026-03-19*
