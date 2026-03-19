# ProspectorAI 🎯

> AI-powered pre-sales marketing strategy generator for **Hellenic Technologies**

ProspectorAI is an autonomous AI agent that generates complete, data-driven digital marketing strategies from a single prospect domain URL. Built for Hellenic Technologies' pre-sales workflow.

## What It Does

Given a prospect's domain, ProspectorAI:
1. **Auto-discovers** the 2 most relevant competitors using DataForSEO
2. **Runs 14 analysis sections** in strict serial order — no parallelism, no guessing
3. **Generates a complete marketing strategy** as a client-ready markdown file
4. **Creates a GitHub doc** for each client automatically
5. **All data from DataForSEO API** — zero inference, zero fictional data

## 14 Report Sections

| # | Section | Data Source |
|---|---------|-------------|
| Pre-flight | Competitor Discovery | DataForSEO Labs |
| 1 | Executive Summary | Synthesized |
| 2 | Brand Communication Strategy | Content Analysis + On-Page |
| 3 | Full-Funnel Strategy | Trends + SERP |
| 4 | SEO Strategy | Labs + Keywords + Backlinks |
| 5 | Social Media Strategy | Content Analysis + Demographics |
| 6 | Paid Media Plan | Search Volume (CPC) + Traffic |
| 7 | Website Audit | On-Page + Technologies |
| 8 | Execution Roadmap | Synthesized |
| 9 | Budget Breakdown & Fees | Synthesized + CPC benchmarks |
| 10 | Forecasted Outcomes | Trends + Traffic |
| 11 | Creative Demo Concepts | Synthesized |
| 12 | Risks & Mitigation | Synthesized |
| 13 | CTA & Next Steps | Synthesized |
| 14 | AI Enablement Strategy | Tech audit + Trends |
| A | Implementation Timeline | Synthesized |
| B | Summary of Actions | Synthesized |
| C | Closing Message | Synthesized |

## Usage

Tell MOTHER (the AI agent):
```
ProspectorAI [domain]
ProspectorAI [domain] with budget €5,000/month
```

## Client Reports

All generated strategies are stored in `clients/` directory, organized by domain.

## About Hellenic Technologies

Leading European digital agency based in Athens, Greece. 20 years of digital expertise (since 2005). Trusted by 100+ businesses in 10+ countries.

- Website: https://hellenictechnologies.com
- Services: Web Development, SEO, Paid Media, Social Media, AI Enablement
- Registration: 69262803000

---
*Built by MOTHER — SKYNET Cyberdin Systems for Hellenic Technologies*
