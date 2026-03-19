/**
 * dfs.mjs — DataForSEO API helper for ProspectHellenicAI
 * All endpoints used by the ProspectorAI skill.
 * Auth: Basic (login:password base64)
 */

import https from 'https';

const DFS_LOGIN    = process.env.DATAFORSEO_LOGIN    || 'ai@hellenictechnologies.com';
const DFS_PASSWORD = process.env.DATAFORSEO_PASSWORD || 'd36448e4bd3fc5f9';
const DFS_AUTH     = Buffer.from(`${DFS_LOGIN}:${DFS_PASSWORD}`).toString('base64');
const DFS_BASE     = 'api.dataforseo.com';

// ── Core request ────────────────────────────────────────────────────────────
function dfsRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : null;
    const opts = {
      hostname: DFS_BASE,
      path,
      method,
      headers: {
        'Authorization': `Basic ${DFS_AUTH}`,
        'Content-Type': 'application/json',
        ...(bodyStr ? { 'Content-Length': Buffer.byteLength(bodyStr) } : {}),
      },
      timeout: 30000,
    };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.status_code !== 20000) {
            reject(new Error(`DFS error ${parsed.status_code}: ${parsed.status_message}`));
          } else {
            resolve(parsed);
          }
        } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('DFS timeout')); });
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

// ── Retry wrapper ───────────────────────────────────────────────────────────
async function dfs(method, path, body = null) {
  try {
    return await dfsRequest(method, path, body);
  } catch (e) {
    console.warn(`[DFS] Retry after error: ${e.message}`);
    try {
      return await dfsRequest(method, path, body);
    } catch (e2) {
      console.error(`[DFS] TOOL DATA MISSING — ${path}: ${e2.message}`);
      return null;
    }
  }
}

function firstResult(r) {
  return r?.tasks?.[0]?.result?.[0] ?? null;
}

function allResults(r) {
  return r?.tasks?.[0]?.result ?? [];
}

// ── DataForSEO Labs ─────────────────────────────────────────────────────────

export async function domainRankOverview(domain, locationCode = 2300, languageCode = 'el') {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/domain_rank_overview/live', [
    { target: domain, location_code: locationCode, language_code: languageCode }
  ]);
  return firstResult(r);
}

export async function rankedKeywords(domain, locationCode = 2300, languageCode = 'el', limit = 100) {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/ranked_keywords/live', [
    { target: domain, location_code: locationCode, language_code: languageCode, limit, order_by: ['keyword_data.keyword_info.search_volume,desc'] }
  ]);
  return allResults(r);
}

export async function competitorsDomain(domain, locationCode = 2300, languageCode = 'el', limit = 10) {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/competitors_domain/live', [
    { target: domain, location_code: locationCode, language_code: languageCode, limit }
  ]);
  return firstResult(r);
}

export async function keywordsForSite(domain, locationCode = 2300, languageCode = 'el', limit = 100) {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/keywords_for_site/live', [
    { target: domain, location_code: locationCode, language_code: languageCode, limit }
  ]);
  return allResults(r);
}

export async function keywordIdeas(keywords, locationCode = 2300, languageCode = 'el', limit = 50) {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/keyword_ideas/live', [
    { keywords, location_code: locationCode, language_code: languageCode, limit }
  ]);
  return allResults(r);
}

export async function relatedKeywords(keyword, locationCode = 2300, languageCode = 'el', limit = 50) {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/related_keywords/live', [
    { keyword, location_code: locationCode, language_code: languageCode, limit }
  ]);
  return allResults(r);
}

export async function serpCompetitors(keywords, locationCode = 2300, languageCode = 'el') {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/serp_competitors/live', [
    { keywords, location_code: locationCode, language_code: languageCode }
  ]);
  return firstResult(r);
}

export async function domainIntersection(target1, target2, locationCode = 2300, languageCode = 'el', limit = 50) {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/domain_intersection/live', [
    { target1, target2, location_code: locationCode, language_code: languageCode, limit }
  ]);
  return firstResult(r);
}

export async function bulkTrafficEstimation(domains, locationCode = 2300, languageCode = 'el') {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/bulk_traffic_estimation/live', [
    { targets: domains, location_code: locationCode, language_code: languageCode }
  ]);
  return allResults(r);
}

export async function bulkKeywordDifficulty(keywords, locationCode = 2300, languageCode = 'el') {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/bulk_keyword_difficulty/live', [
    { keywords, location_code: locationCode, language_code: languageCode }
  ]);
  return allResults(r);
}

export async function subdomains(domain, locationCode = 2300, languageCode = 'el', limit = 20) {
  const r = await dfs('POST', '/v3/dataforseo_labs/google/subdomains/live', [
    { target: domain, location_code: locationCode, language_code: languageCode, limit }
  ]);
  return firstResult(r);
}

// ── Backlinks ───────────────────────────────────────────────────────────────

export async function backlinksSummary(domain) {
  const r = await dfs('POST', '/v3/backlinks/summary/live', [
    { target: domain, target_type: 'domain', include_subdomains: true }
  ]);
  return firstResult(r);
}

export async function backlinksReferringDomains(domain, limit = 50) {
  const r = await dfs('POST', '/v3/backlinks/referring_domains/live', [
    { target: domain, target_type: 'domain', limit, order_by: ['rank,desc'] }
  ]);
  return allResults(r);
}

export async function backlinksAnchors(domain, limit = 30) {
  const r = await dfs('POST', '/v3/backlinks/anchors/live', [
    { target: domain, target_type: 'domain', limit }
  ]);
  return allResults(r);
}

export async function backlinksDomainIntersection(target1, target2, limit = 30) {
  const r = await dfs('POST', '/v3/backlinks/domain_intersection/live', [
    { target1, target2, target1_type: 'domain', target2_type: 'domain', limit }
  ]);
  return firstResult(r);
}

export async function backlinksTimeseriesSummary(domain) {
  const r = await dfs('POST', '/v3/backlinks/timeseries_summary/live', [
    { target: domain, target_type: 'domain', date_from: '2024-01-01' }
  ]);
  return allResults(r);
}

// ── Keywords Data ───────────────────────────────────────────────────────────

export async function searchVolume(keywords, locationCode = 2300, languageCode = 'el') {
  const r = await dfs('POST', '/v3/keywords_data/google_ads/search_volume/live', [
    { keywords, location_code: locationCode, language_code: languageCode }
  ]);
  return allResults(r);
}

export async function trendsExplore(keywords, locationCode = 2300, dateFrom = null) {
  const body = { keywords, location_code: locationCode };
  if (dateFrom) body.date_from = dateFrom;
  const r = await dfs('POST', '/v3/keywords_data/dataforseo_trends/explore/live', [body]);
  return allResults(r);
}

export async function trendsDemography(keyword, locationCode = 2300) {
  const r = await dfs('POST', '/v3/keywords_data/dataforseo_trends/demography/live', [
    { keyword, location_code: locationCode }
  ]);
  return firstResult(r);
}

export async function trendsSubregion(keyword, locationCode = 2300) {
  const r = await dfs('POST', '/v3/keywords_data/dataforseo_trends/subregion_interests/live', [
    { keyword, location_code: locationCode }
  ]);
  return firstResult(r);
}

// ── On-Page ─────────────────────────────────────────────────────────────────

export async function onPageInstant(url) {
  const r = await dfs('POST', '/v3/on_page/instant_pages', [
    { url, load_resources: false, enable_javascript: false }
  ]);
  return firstResult(r);
}

export async function contentParsing(url) {
  const r = await dfs('POST', '/v3/on_page/content_parsing/live', [
    { url }
  ]);
  return firstResult(r);
}

// ── Domain Analytics / Technologies ─────────────────────────────────────────

export async function domainTechnologies(domain) {
  const r = await dfs('POST', '/v3/domain_analytics/technologies/domain_technologies/live', [
    { target: domain }
  ]);
  return firstResult(r);
}

// ── Content Analysis ─────────────────────────────────────────────────────────

export async function contentAnalysisSearch(keyword, locationCode = 2300, limit = 10) {
  const r = await dfs('POST', '/v3/content_analysis/search/live', [
    { keyword, location_code: locationCode, limit }
  ]);
  return firstResult(r);
}

export async function contentAnalysisSummary(keyword, locationCode = 2300) {
  const r = await dfs('POST', '/v3/content_analysis/summary/live', [
    { keyword, location_code: locationCode }
  ]);
  return firstResult(r);
}

export async function contentPhraseTrends(keyword, locationCode = 2300) {
  const r = await dfs('POST', '/v3/content_analysis/phrase_trends/live', [
    { keyword, location_code: locationCode }
  ]);
  return firstResult(r);
}

// ── Utility ──────────────────────────────────────────────────────────────────

export function fmt(n) {
  if (n == null) return 'N/A';
  if (n >= 1_000_000) return (n/1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n/1_000).toFixed(1) + 'K';
  return String(n);
}
