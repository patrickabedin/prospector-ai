# ProspectHellenicAI — Report Sections (Strict Serial Order)

Execute ONE section at a time. Never parallelize. Never skip. Never jump ahead.
ANY DEVIATION = ERROR.

Output file: `MarketingStrategy_{domain}_{yyyy-mm-dd}.md`
Save location: `/root/prospector_ai/outputs/{domain}/`
NEVER output full report to chat. File only.

---

## PRE-FLIGHT: Competitor Discovery
**Tools:** `competitorsDomain`, `domainRankOverview`, `bulkTrafficEstimation`
- Auto-identify top 2 competitors from DataForSEO
- These 2 competitors are used for ALL comparative analysis throughout the report
- Profile all 3 domains (prospect + 2 competitors): traffic, rank, visibility
- Do NOT ask Patrick for competitors — discover from data

---

## SECTION 1 — Executive Summary
**No tool calls — written after all data is collected.**
- Prospect snapshot (domain, industry, market position)
- Top 3 strategic opportunities identified
- Recommended investment summary
- Expected ROI narrative (data-backed)
- Next steps / call to action
- One punchy paragraph: why act now

---

## SECTION 2 — Brand Communication Strategy
**Tools:** `contentAnalysisSummary`, `contentAnalysisSearch`, `onPageInstant`, `contentParsing`
- Prospect's current messaging and tone
- Competitor messaging audit
- Brand positioning gaps
- Recommended brand voice and messaging pillars
- Value proposition for each channel

### Format:
- Messaging pillars table (prospect vs competitor 1 vs competitor 2)
- Recommended tagline / brand narrative
- 🧠 Why It Matters

---

## SECTION 3 — Full-Funnel Strategy
**Tools:** `trendsExplore`, `searchVolume`, `serpCompetitors`
- Awareness → Consideration → Decision → Retention framework
- Channel-to-funnel stage mapping
- Audience segments (by funnel stage)
- Content types per stage
- Conversion logic

### Format:
- Funnel diagram in markdown (text-based)
- Per-stage channel recommendations
- 🧠 Why It Matters

---

## SECTION 4 — SEO Strategy
**Tools:** `rankedKeywords` (all 3 domains), `keywordsForSite`, `keywordIdeas`, `relatedKeywords`, `bulkKeywordDifficulty`, `searchVolume`, `domainIntersection` (prospect vs each competitor), `serpCompetitors`, `subdomains`
- Organic traffic comparison (prospect vs competitors)
- Top ranking keywords by domain
- Keyword gap analysis (what competitors rank for that prospect doesn't)
- Keyword opportunity clusters: branded / informational / transactional / local
- Difficulty vs volume matrix (table)
- Quick wins (KD < 30, SV > 100) vs long-term targets
- On-page SEO recommendations (from technical data)
- Structured data / schema opportunities

### Format:
- Traffic comparison table (3 domains)
- Keyword opportunity table (keyword | SV | KD | current rank | competitor rank)
- 🧠 Why It Matters

---

## SECTION 5 — Social Media Strategy
**Tools:** `contentAnalysisSummary`, `contentPhraseTrends`, `trendsDemography`, `trendsSubregion`
*(Note: Social Searcher not available — use DataForSEO content analysis as proxy)*
- Platform audit by competitor presence inferred from content analysis
- Content themes that drive engagement (from phrase trends)
- Audience demographics (age/gender breakdown from demography tool)
- Regional interest map (subregion interests)
- Recommended posting cadence and content mix
- Platform priority ranking (with justification from data)

### Format:
- Platform recommendation table
- Content mix pie (text-based %)
- Demographic table
- 🧠 Why It Matters

---

## SECTION 6 — Paid Media Plan
**Tools:** `searchVolume` (CPC data), `serpCompetitors`, `trendsExplore`, `bulkTrafficEstimation`
- Estimated competitor ad spend (inferred from CPC × estimated paid traffic)
- Google Ads: recommended keywords, match types, bid strategy
- Meta Ads: audience targeting recommendations (from demographics data)
- Budget allocation: Google vs Meta vs other
- Retargeting strategy
- Ad creative direction (themes, CTAs)
- Competitor ad messaging gaps (opportunities)

### Format:
- Competitive paid landscape table
- Recommended budget split table (Google / Meta / Retargeting / Display)
- 🧠 Why It Matters

---

## SECTION 7 — Website Audit
**Tools:** `onPageInstant`, `contentParsing`, `domainTechnologies`
- Tech stack (CMS, analytics tools, marketing stack)
- Page structure and heading hierarchy
- Meta title / description quality
- Content structure assessment
- Load performance signals
- CRO (conversion rate optimization) recommendations
- Trust signals audit (reviews, certifications, chat, forms)

### Format:
- Tech stack table
- Issue priority list (Critical / High / Medium / Low)
- 🧠 Why It Matters

---

## SECTION 8 — Execution Roadmap
**No tool calls — synthesized from all previous sections.**
- Month-by-month plan (default 12 months)
- Organized by Q1 / Q2 / Q3 / Q4
- Per-quarter deliverables and milestones
- Dependencies and sequencing logic
- Owner column (Agency / Client / Shared)

### Format:
- Quarterly roadmap table
- Month-by-month milestones list
- 🧠 Why It Matters

---

## SECTION 9 — Budget Breakdown & Fees
**Input:** User-specified budget OR best-practice estimates if not specified.
**Tools:** `searchVolume` (CPC benchmarks already retrieved in Section 6 — reuse, no new call)
- Total budget allocation by channel (%)
- Monthly spend table (12 months)
- Agency fee structure (Hellenic Technologies standard: strategy + execution + reporting)
- ROI justification per channel

### Format:
- Budget allocation table (Channel | Monthly € | Annual € | % of Total)
- Agency fee line items
- 🧠 Why It Matters

---

## SECTION 10 — Forecasted Outcomes
**Tools:** `trendsExplore` (reuse cached data — no new call if already fetched), `bulkTrafficEstimation` (reuse)
- Organic traffic forecast (Month 1 / 3 / 6 / 12)
- Paid traffic forecast (impressions / clicks / conversions)
- Social reach and engagement forecast
- Lead generation projections
- Revenue impact estimate (where enough data exists)
- Assumptions clearly stated

### Format:
- Forecast table (Metric | Current | M3 | M6 | M12)
- Assumptions list
- 🧠 Why It Matters

---

## SECTION 11 — Creative Demo Concepts
**No tool calls — synthesized from all data.**
- 3 campaign concept ideas (name, hook, channel, format, message)
- Ad creative direction for each concept
- Tone / visual style recommendation
- Video concept outline (if relevant)
- Example hooks / headlines / CTAs

### Format:
- Concept cards (markdown boxes)
- Hook → Value → CTA structure per concept
- 🧠 Why It Matters

---

## SECTION 12 — Risks & Mitigation
**No tool calls — synthesized from all data.**
- Top 5 risks (market, competitive, execution, budget, technical)
- Mitigation strategy per risk
- Contingency triggers

### Format:
- Risk register table (Risk | Likelihood | Impact | Mitigation)
- 🧠 Why It Matters

---

## SECTION 13 — CTA & Next Steps
**No tool calls.**
- Clear call to action for the prospect
- Proposed kickoff timeline
- What Hellenic Technologies delivers in Week 1
- Decision urgency drivers (market timing, competitor momentum)
- Contact / next meeting prompt

---

## SECTION 14 — AI Enablement Strategy
**No tool calls — synthesized from tech audit (Section 7) and trend data.**
- Current AI maturity assessment (based on tech stack)
- AI opportunities: content generation, chatbots, SEO automation, ad optimization
- Recommended AI tools per channel (with justification)
- Implementation priority matrix
- Hellenic Technologies AI services pitch

### Format:
- AI maturity scale (1–5) with current position
- AI tool recommendation table (Tool | Use Case | Channel | Priority)
- 🧠 Why It Matters

---

## FINAL APPENDICES

### A — Implementation Timeline
- Gantt-style markdown table covering the full timeframe
- Per-channel activity bars by month
- Milestone markers

### B — Summary of Actions
- Numbered list of all recommended actions across all sections
- Prioritized: Immediate / Short-term / Long-term

### C — Closing Message
- Persuasive 3-5 paragraph narrative
- Why partner with Hellenic Technologies NOW
- Competitor momentum as urgency driver
- Vision of success at 12 months
- Signature-ready sign-off

---

## COMPLETION SIGNAL
After writing the full file, print exactly:
```
PROSPECTOR_COMPLETE: /root/prospector_ai/outputs/{domain}/MarketingStrategy_{domain}_{yyyy-mm-dd}.md
```
