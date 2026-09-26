// REAL RESEARCH DATA — one-time deep-analysis pass, 2026-09-26. Mutual-fund/ETF look-through
// (top-10 disclosed holdings, weights, category, cap tilt, fund-level P/E where disclosed)
// gathered via WebSearch against real AMC factsheets and fund-tracking aggregators (Value
// Research, Tickertape, Groww, Vanguard's own fact sheet) — never invented. Every entry carries
// `source`/`asof`. See `Base resources/deep-analysis-methodology.md` for the full method and
// how to re-run this research later (funds' disclosed portfolios change monthly).
//
// Data-quality caveats worth keeping in mind before treating any number here as precise:
// - HDFC Sensex ranks 6-10 come from a same-index proxy fund (SBI's, tracking the identical
//   BSE Sensex), not HDFC's own factsheet — constituent NAMES are correct (same index), weights
//   are approximate and from a different as-of date. Ranks 1-5 are HDFC's own real disclosure.
// - quant Flexi Cap only yielded a verified top-5 — different aggregators disagreed on the exact
//   top-3 within the same week (this AMC runs a known high-churn "VLRT" strategy). Ranks 6-10
//   are NOT fabricated here; top10CoveragePct reflects only the 5 verified names.
// - HDFC Mid Cap and Axis Small Cap each have one slot that's actually a cash/repo instrument,
//   not equity — flagged inline via `sector` rather than silently treated as a stock holding.
// - Several funds have no disclosed fund-level P/E anywhere findable (left null, not guessed).
// - Edelweiss Liquid Fund's avgMaturityDays is a real number but from a stale Jan-2023 factsheet
//   (the current PDF was blocked on every fetch attempt) — its credit-quality read is current.

export const FUND_LOOKTHROUGH = {
  inst_hdfc_sensex_direct: {
    fundName: 'HDFC BSE Sensex Index Fund', category: 'Index Fund - Large Cap',
    capTilt: 'Large-cap (pure index, 100% Sensex constituents)',
    fundLevelPE: 20.91, // HDFC's own disclosed figure, vs category avg 24.53
    asof: '2026-09-25',
    source: 'HDFC Mutual Fund (via Tickertape/INDmoney), as of 25-Sep-2026 for ranks 1-5; ranks 6-10 weights taken from SBI BSE Sensex Index Fund factsheet (identical underlying index), Apr-2026 — same constituent list, weights approximate/different date, not HDFC-specific',
    top10: [
      { name: 'HDFC Bank Ltd', isin: 'INE040A01034', weight: 0.1184, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'ICICI Bank Ltd', isin: 'INE090A01021', weight: 0.1139, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'Reliance Industries Ltd', isin: 'INE002A01018', weight: 0.0953, sector: 'Oil & Gas - Refining & Marketing', marketCapTier: 'Large', country: 'India' },
      { name: 'Bharti Airtel Ltd', isin: 'INE397D01024', weight: 0.0611, sector: 'Telecom Services', marketCapTier: 'Large', country: 'India' },
      { name: 'Larsen & Toubro Ltd', isin: 'INE018A01030', weight: 0.0517, sector: 'Construction & Engineering', marketCapTier: 'Large', country: 'India' },
      { name: 'State Bank of India', isin: 'INE062A01020', weight: 0.0487, sector: 'PSU Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'Infosys Ltd', isin: 'INE009A01021', weight: 0.0453, sector: 'IT Services', marketCapTier: 'Large', country: 'India' },
      { name: 'Axis Bank Ltd', isin: 'INE238A01034', weight: 0.0398, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'ITC Ltd', isin: 'INE154A01025', weight: 0.0334, sector: 'FMCG', marketCapTier: 'Large', country: 'India' },
      { name: 'Kotak Mahindra Bank Ltd', isin: 'INE237A01028', weight: 0.0309, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
    ],
    top10CoveragePct: 0.6385,
  },
  inst_tata_midcap150_direct: {
    fundName: 'Tata Nifty Midcap 150 Momentum 50 Index Fund', category: 'Index Fund - Mid Cap (Momentum factor)',
    capTilt: 'Mid-cap, momentum-factor tilt', fundLevelPE: null,
    asof: '2026-07-04', source: 'Tickertape (Tata Mutual Fund factsheet data), as of 04-Jul-2026',
    top10: [
      { name: 'BSE Ltd', isin: null, weight: 0.0756, sector: 'Capital Markets', marketCapTier: 'Mid', country: 'India' },
      { name: 'Cummins India Ltd', isin: null, weight: 0.0517, sector: 'Industrial Products', marketCapTier: 'Mid', country: 'India' },
      { name: 'The Federal Bank Ltd', isin: null, weight: 0.0438, sector: 'Private Banks', marketCapTier: 'Mid', country: 'India' },
      { name: 'AU Small Finance Bank Ltd', isin: null, weight: 0.0438, sector: 'Small Finance Banks', marketCapTier: 'Mid', country: 'India' },
      { name: 'Hero MotoCorp Ltd', isin: null, weight: 0.0420, sector: 'Automobiles - 2 Wheeler', marketCapTier: 'Mid', country: 'India' },
      { name: 'Muthoot Finance Ltd', isin: null, weight: 0.0411, sector: 'NBFC', marketCapTier: 'Mid', country: 'India' },
      { name: 'GE Vernova T&D India Ltd', isin: null, weight: 0.0381, sector: 'Power Equipment', marketCapTier: 'Mid', country: 'India' },
      { name: 'L&T Finance Ltd', isin: null, weight: 0.0324, sector: 'NBFC', marketCapTier: 'Mid', country: 'India' },
      { name: 'One97 Communications Ltd', isin: null, weight: 0.0300, sector: 'Fintech / Internet', marketCapTier: 'Mid', country: 'India' },
      { name: 'Fortis Healthcare Ltd', isin: null, weight: 0.0297, sector: 'Healthcare Facilities', marketCapTier: 'Mid', country: 'India' },
    ],
    top10CoveragePct: 0.4282,
  },
  inst_hdfc_nifty_next50_direct: {
    fundName: 'Nifty Next 50 Index', category: 'Index Fund - Large/Mid Cap',
    capTilt: 'Large-cap adjacent / "emerging large-cap"', fundLevelPE: 26.97,
    asof: '2026-09-25', source: "Tickertape (NSE Indices data), as of 25-Sep-2026; constituent list cross-checked against NSE's own ind_next50.pdf. Also applies to inst_icici_next50_direct — same index, identical constituents, different AMC.",
    top10: [
      { name: "Divi's Laboratories Ltd", isin: null, weight: 0.0504, sector: 'Pharmaceuticals', marketCapTier: 'Large', country: 'India' },
      { name: 'Adani Power Ltd', isin: null, weight: 0.0455, sector: 'Power/Utilities', marketCapTier: 'Large', country: 'India' },
      { name: 'TVS Motor Company Ltd', isin: null, weight: 0.0388, sector: 'Automobiles', marketCapTier: 'Large', country: 'India' },
      { name: 'Hindustan Aeronautics Ltd', isin: null, weight: 0.0375, sector: 'Aerospace & Defense', marketCapTier: 'Large', country: 'India' },
      { name: 'Tata Motors Ltd', isin: null, weight: 0.0367, sector: 'Automobiles', marketCapTier: 'Large', country: 'India' },
      { name: 'Samvardhana Motherson International Ltd', isin: null, weight: 0.0291, sector: 'Auto Components', marketCapTier: 'Large', country: 'India' },
      { name: 'Torrent Pharmaceuticals Ltd', isin: null, weight: 0.0288, sector: 'Pharmaceuticals', marketCapTier: 'Large', country: 'India' },
      { name: 'Cholamandalam Investment and Finance Co Ltd', isin: null, weight: 0.0281, sector: 'NBFC', marketCapTier: 'Large', country: 'India' },
      { name: 'Cummins India Ltd', isin: null, weight: 0.0275, sector: 'Industrial Products', marketCapTier: 'Large', country: 'India' },
      { name: 'Britannia Industries Ltd', isin: null, weight: 0.0239, sector: 'FMCG', marketCapTier: 'Large', country: 'India' },
    ],
    top10CoveragePct: 0.3463,
  },
  inst_axis_elss: {
    fundName: 'Axis ELSS Tax Saver Fund', category: 'ELSS (Tax Saver)',
    capTilt: 'Large-cap tilt (ELSS mandate, large+mega-cap heavy)', fundLevelPE: null,
    asof: '2026-09-25', source: 'Groww (Axis Mutual Fund factsheet data), as of 25-Sep-2026 — single-source, not cross-verified',
    top10: [
      { name: 'ICICI Bank Ltd', isin: 'INE090A01021', weight: 0.0702, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'HDFC Bank Ltd', isin: 'INE040A01034', weight: 0.0555, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'Bharti Airtel Ltd', isin: 'INE397D01024', weight: 0.0426, sector: 'Telecom Services', marketCapTier: 'Large', country: 'India' },
      { name: 'Bajaj Finance Ltd', isin: null, weight: 0.0342, sector: 'NBFC', marketCapTier: 'Large', country: 'India' },
      { name: 'Zomato Ltd (Eternal)', isin: null, weight: 0.0324, sector: 'Internet / Consumer Tech', marketCapTier: 'Large', country: 'India' },
      { name: 'Larsen & Toubro Ltd', isin: 'INE018A01030', weight: 0.0290, sector: 'Construction & Engineering', marketCapTier: 'Large', country: 'India' },
      { name: "Divi's Laboratories Ltd", isin: null, weight: 0.0271, sector: 'Pharmaceuticals', marketCapTier: 'Large', country: 'India' },
      { name: 'Axis Bank Ltd', isin: 'INE238A01034', weight: 0.0263, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'Pidilite Industries Ltd', isin: null, weight: 0.0262, sector: 'Specialty Chemicals', marketCapTier: 'Large', country: 'India' },
      { name: 'Mahindra & Mahindra Ltd', isin: null, weight: 0.0257, sector: 'Automobiles', marketCapTier: 'Large', country: 'India' },
    ],
    top10CoveragePct: 0.3692,
  },
  inst_axis_smallcap: {
    fundName: 'Axis Small Cap Fund', category: 'Small Cap', capTilt: 'Small-cap', fundLevelPE: null,
    asof: '2026-09-11', source: 'Groww/aggregator data (Axis Mutual Fund factsheet), as of 11-Sep-2026',
    top10: [
      { name: 'Clearing Corporation of India Ltd', isin: null, weight: 0.0726, sector: 'Cash equivalent / TREPS (not an equity holding)', marketCapTier: null, country: 'India' },
      { name: 'Krishna Institute of Medical Sciences Ltd', isin: null, weight: 0.0271, sector: 'Healthcare Facilities', marketCapTier: 'Small', country: 'India' },
      { name: 'Torrent Pharmaceuticals Ltd', isin: null, weight: 0.0259, sector: 'Pharmaceuticals', marketCapTier: 'Mid', country: 'India' },
      { name: 'CCL Products (India) Ltd', isin: null, weight: 0.0258, sector: 'FMCG', marketCapTier: 'Small', country: 'India' },
      { name: 'City Union Bank Ltd', isin: null, weight: 0.0180, sector: 'Private Banks', marketCapTier: 'Small', country: 'India' },
      { name: 'Sai Life Sciences Ltd', isin: null, weight: 0.0165, sector: 'Pharma CDMO', marketCapTier: 'Small', country: 'India' },
      { name: 'Brigade Enterprises Ltd', isin: null, weight: 0.0158, sector: 'Realty', marketCapTier: 'Small', country: 'India' },
      { name: 'Sansera Engineering Ltd', isin: null, weight: 0.0145, sector: 'Auto Components', marketCapTier: 'Small', country: 'India' },
      { name: 'Cholamandalam Financial Holdings Ltd', isin: null, weight: 0.0141, sector: 'NBFC Holding Co', marketCapTier: 'Small', country: 'India' },
      { name: 'Karur Vysya Bank Ltd', isin: null, weight: 0.0138, sector: 'Private Banks', marketCapTier: 'Small', country: 'India' },
    ],
    top10CoveragePct: 0.2441, // first slot is cash/repo, not equity — real top-9 equity coverage is ~17.15%
  },
  inst_hdfc_midcap_k: {
    fundName: 'HDFC Mid Cap Fund', category: 'Mid Cap', capTilt: 'Mid-cap', fundLevelPE: null,
    asof: '2026-09-25', source: 'Groww (HDFC Mutual Fund factsheet data), as of 25-Sep-2026 — single-source, not cross-verified; only 9 real equity names found (10th disclosed slot was a repo/cash instrument, omitted)',
    top10: [
      { name: 'The Federal Bank Ltd', isin: null, weight: 0.0421, sector: 'Private Banks', marketCapTier: 'Mid', country: 'India' },
      { name: 'AU Small Finance Bank Ltd', isin: null, weight: 0.0398, sector: 'Small Finance Banks', marketCapTier: 'Mid', country: 'India' },
      { name: 'Max Financial Services Ltd', isin: null, weight: 0.0379, sector: 'Insurance', marketCapTier: 'Mid', country: 'India' },
      { name: 'Ipca Laboratories Ltd', isin: null, weight: 0.0330, sector: 'Pharmaceuticals', marketCapTier: 'Mid', country: 'India' },
      { name: 'Glenmark Pharmaceuticals Ltd', isin: null, weight: 0.0307, sector: 'Pharmaceuticals', marketCapTier: 'Mid', country: 'India' },
      { name: 'Indian Bank', isin: null, weight: 0.0306, sector: 'PSU Banks', marketCapTier: 'Mid', country: 'India' },
      { name: 'Balkrishna Industries Ltd', isin: null, weight: 0.0302, sector: 'Tyres', marketCapTier: 'Mid', country: 'India' },
      { name: 'Coforge Ltd', isin: null, weight: 0.0286, sector: 'IT Services', marketCapTier: 'Mid', country: 'India' },
      { name: 'Fortis Healthcare Ltd', isin: null, weight: 0.0269, sector: 'Healthcare Facilities', marketCapTier: 'Mid', country: 'India' },
    ],
    top10CoveragePct: 0.2998, // sum of the 9 real equity names only
  },
  inst_ppfas_flexicap_a: {
    fundName: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap',
    capTilt: 'Flexi-cap with meaningful global diversification (~11% in US megacap tech)', fundLevelPE: 16.41,
    asof: '2026-09-25', source: 'Tickertape + Groww (PPFAS Mutual Fund factsheet data), as of 25-Sep-2026. Confirmed additional US holdings just outside top 10: Microsoft ~2.40%, Amazon.com ~2.33%, Meta Platforms ~2.18% — the "US megacap tech" story is real, spread across 4 names rather than concentrated in the top 5.',
    top10: [
      { name: 'HDFC Bank Ltd', isin: 'INE040A01034', weight: 0.0763, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'ICICI Bank Ltd', isin: 'INE090A01021', weight: 0.0567, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'Power Grid Corporation of India Ltd', isin: null, weight: 0.0558, sector: 'Power Transmission', marketCapTier: 'Large', country: 'India' },
      { name: 'ITC Ltd', isin: 'INE154A01025', weight: 0.0526, sector: 'FMCG', marketCapTier: 'Large', country: 'India' },
      { name: 'Bajaj Holdings & Investment Ltd', isin: null, weight: 0.0514, sector: 'Financial Holding Co', marketCapTier: 'Large', country: 'India' },
      { name: 'Coal India Ltd', isin: null, weight: 0.0502, sector: 'Mining', marketCapTier: 'Large', country: 'India' },
      { name: 'Kotak Mahindra Bank Ltd', isin: 'INE237A01028', weight: 0.0440, sector: 'Private Banks', marketCapTier: 'Large', country: 'India' },
      { name: 'HCL Technologies Ltd', isin: null, weight: 0.0415, sector: 'IT Services', marketCapTier: 'Large', country: 'India' },
      { name: 'Alphabet Inc (Class A/C)', isin: null, weight: 0.0414, sector: 'Internet / Technology', marketCapTier: 'Large', country: 'United States' },
      { name: 'Mahindra & Mahindra Ltd', isin: null, weight: 0.0397, sector: 'Automobiles', marketCapTier: 'Large', country: 'India' },
    ],
    top10CoveragePct: 0.5096,
  },
  inst_quant_flexicap: {
    fundName: 'quant Flexi Cap Fund', category: 'Flexi Cap',
    capTilt: 'Nominally flexi-cap; Aug-2026 factsheet cap-mix: Large 49.2% / Mid 14.7% / Small 6.9% / Others 29.2% — high-churn, momentum/VLRT-style strategy',
    fundLevelPE: 36.42, asof: '2026-09-25',
    source: "Tickertape/INDmoney, as of 25-Sep-2026 — ONLY A PARTIAL TOP-5 COULD BE VERIFIED. Different aggregators and snapshot dates within the same week disagreed on ranks 1-3, consistent with this AMC's known very high portfolio turnover. Ranks 6-10 could not be found in any source and are NOT fabricated here.",
    top10: [
      { name: 'Samvardhana Motherson International Ltd', isin: null, weight: 0.0963, sector: 'Auto Components', marketCapTier: 'Large', country: 'India' },
      { name: 'Adani Enterprises Ltd', isin: null, weight: 0.0787, sector: 'Diversified / Conglomerate', marketCapTier: 'Large', country: 'India' },
      { name: 'Adani Power Ltd', isin: null, weight: 0.0772, sector: 'Power/Utilities', marketCapTier: 'Large', country: 'India' },
      { name: 'Aurobindo Pharma Ltd', isin: null, weight: 0.0701, sector: 'Pharmaceuticals', marketCapTier: 'Large', country: 'India' },
      { name: 'ICICI Prudential Asset Management Co Ltd', isin: null, weight: 0.0561, sector: 'Asset Management', marketCapTier: 'Large', country: 'India' },
    ],
    top10CoveragePct: 0.3784, // sum of the 5 verified names only, NOT a true top-10 sum
  },
  inst_vxus: {
    fundName: 'Vanguard Total International Stock ETF', category: 'International Equity Index (ex-US, all-cap)',
    capTilt: 'Broad ex-US all-cap (large + mid + small), tracks FTSE Global All Cap ex US Index',
    fundLevelPE: 16.5, // not Vanguard's own disclosure; third-party TTM figures ranged 13.9-16.9 — approximate
    asof: '2026-06-30', // Vanguard's own official fact sheet date for the holdings list
    source: 'Vanguard official fact sheet (fund-docs.vanguard.com/F3369.pdf), as of 30-Jun-2026; P/E from third-party aggregators (Yahoo Finance/Robinhood/Investing.com), not Vanguard\'s own disclosure',
    top10: [
      { name: 'Taiwan Semiconductor Manufacturing Co Ltd', isin: null, weight: 0.043, sector: 'Semiconductors', marketCapTier: 'Large', country: 'Taiwan' },
      { name: 'Samsung Electronics Co Ltd', isin: null, weight: 0.026, sector: 'Technology Hardware', marketCapTier: 'Large', country: 'South Korea' },
      { name: 'SK Hynix Inc', isin: null, weight: 0.022, sector: 'Semiconductors', marketCapTier: 'Large', country: 'South Korea' },
      { name: 'ASML Holding NV', isin: null, weight: 0.017, sector: 'Semiconductor Equipment', marketCapTier: 'Large', country: 'Netherlands' },
      { name: 'Tencent Holdings Ltd', isin: null, weight: 0.008, sector: 'Internet / Technology', marketCapTier: 'Large', country: 'China' },
      { name: 'HSBC Holdings plc', isin: null, weight: 0.007, sector: 'Banks', marketCapTier: 'Large', country: 'United Kingdom' },
      { name: 'Roche Holding AG', isin: null, weight: 0.007, sector: 'Pharmaceuticals', marketCapTier: 'Large', country: 'Switzerland' },
      { name: 'Novartis AG', isin: null, weight: 0.007, sector: 'Pharmaceuticals', marketCapTier: 'Large', country: 'Switzerland' },
      { name: 'Royal Bank of Canada', isin: null, weight: 0.007, sector: 'Banks', marketCapTier: 'Large', country: 'Canada' },
      { name: 'AstraZeneca plc', isin: null, weight: 0.006, sector: 'Pharmaceuticals', marketCapTier: 'Large', country: 'United Kingdom' },
    ],
    top10CoveragePct: 0.150, // Vanguard's own disclosed figure
  },
  inst_edelweiss_liquid: {
    fundName: 'Edelweiss Liquid Fund', instrumentType: 'debt',
    holdingType: 'Money-market instruments — Treasury Bills, Commercial Paper (CPs), Certificates of Deposit (CDs), and TREPS/repo (per fund mandate: instruments maturing within 91 days)',
    avgMaturityDays: 46.25, // real figure, but from a STALE Jan-2023 factsheet — current 2026 figure not found (factsheet PDF returned 403)
    creditQuality: 'AAA / A1+ predominant (highest short-term/long-term ratings)', // corroborated across multiple current 2026 sources
    source: 'Groww/Upstox aggregator pages (credit quality, 2026, current); average maturity figure is from an older Edelweiss factsheet dated 31-Jan-2023 — flagged as stale, not re-confirmed for 2026',
    asof: '2023-01-31', // for avgMaturityDays specifically; credit-quality read is current as of ~Sep-2026
  },
};

// Folios/plans that share the identical underlying fund/index — resolve through this map before
// looking up FUND_LOOKTHROUGH so e.g. Keerthana's separate HDFC Sensex Direct folio and the
// Regular-plan holding both read the correct (identical-portfolio) look-through data.
export const FUND_LOOKTHROUGH_ALIAS = {
  inst_hdfc_sensex_regular_k: 'inst_hdfc_sensex_direct',
  inst_hdfc_sensex_direct_k: 'inst_hdfc_sensex_direct',
  inst_icici_next50_direct: 'inst_hdfc_nifty_next50_direct',
  inst_ppfas_flexicap_b: 'inst_ppfas_flexicap_a',
};
