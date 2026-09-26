// REAL RESEARCH DATA — one-time deep-analysis pass, 2026-09-26. Country/geography outlooks
// gathered via WebSearch against real sources (IMF World Economic Outlook, NSE/GuruFocus/MSCI
// index factsheets) — never invented. Every entry carries `source`/`asof`. See
// `Base resources/deep-analysis-methodology.md` for the full method.
//
// Only the 5 countries the household actually has real exposure to once true company domicile
// is used instead of listing currency (India: everything Indian; United States: most US-listed
// names; Taiwan: TSM; Netherlands: ASML; Belgium: AB InBev RSU). y3/y5 GDP figures for the last
// 4 aren't cleanly published by IMF in a single pull — left null rather than guessed, a real
// disclosed gap, not smoothed over.

export const GEOGRAPHY_OUTLOOK = {
  India: {
    gdpGrowthOutlook: { y2: 0.064, y3: 0.063, y5: 0.065 },
    marketValuationNote: 'Nifty 50 trailing P/E ~19.5-19.8x as of Sept 2026, about 15% below its 10-year average (~23.3x) — valuations currently below historical norms, not stretched.',
    risks: ['Currency volatility for INR-based returns viewed from abroad', 'Monsoon/agri-income dependency feeding into rural credit stress', 'Global trade-policy/tariff shifts (US tariff actions)', 'Election/policy-cycle uncertainty'],
    source: 'IMF World Economic Outlook Update, July 2026; NSE/Trendlyne/IndexPE Nifty 50 P/E data', asof: '2026-09-25',
  },
  'United States': {
    gdpGrowthOutlook: { y2: 0.024, y3: null, y5: null },
    marketValuationNote: 'S&P 500 trailing P/E is roughly 25.8-26.4x as of Sept 2026 (methodology-dependent), above both its 5-year (~24.4x) and 10-year (~23.6x) averages — valuations are stretched relative to history.',
    risks: ['AI-capex concentration — a handful of mega-cap names drive most index earnings/valuation', 'Federal Reserve policy path and real-rate sensitivity', 'Elevated valuations increase drawdown risk on any growth disappointment', 'Trade-policy/tariff uncertainty'],
    source: 'IMF World Economic Outlook Update, January 2026; GuruFocus S&P 500 P/E data', asof: '2026-09-18',
  },
  Taiwan: {
    gdpGrowthOutlook: { y2: 0.052, y3: 0.040, y5: null },
    marketValuationNote: "Not independently pulled this round — Taiwan's equity market (heavily TSMC/semiconductor-weighted) tracks the same AI-capex cycle described in the Semiconductors sector note.",
    risks: ['Extreme geopolitical concentration risk (China-Taiwan tensions)', 'Heavy economic dependence on a single sector (semiconductors/AI hardware exports)'],
    source: 'IMF World Economic Outlook, April 2026 (Taiwan forecast upgraded from 2.1% to 5.2% on AI-driven exports)', asof: '2026-04-16',
  },
  Netherlands: {
    gdpGrowthOutlook: { y2: 0.013, y3: null, y5: null },
    marketValuationNote: "Not independently pulled this round — the household's Netherlands exposure (ASML) is covered under the Semiconductors sector outlook.",
    risks: ['Euro-area growth slowdown spillover', "Trade/export dependency given the Netherlands' open, trade-heavy economy"],
    source: 'IMF/Visual Capitalist Europe GDP projections, 2026', asof: '2026-01-01',
  },
  Belgium: {
    gdpGrowthOutlook: { y2: 0.013, y3: null, y5: null },
    marketValuationNote: "Not independently pulled this round — the household's Belgium exposure (AB InBev) is covered under the Consumer Staples sector outlook.",
    risks: ['Weak external demand and geopolitical tensions weighing on the small open economy', 'Fiscal consolidation pressure'],
    source: 'IMF 2026 Article IV Consultation with Belgium; European Commission Economic Forecast for Belgium', asof: '2026-02-19',
  },
};
