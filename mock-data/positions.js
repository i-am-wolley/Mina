// REAL DATA — units/cost_basis sourced from statements (CAMS CAS, EPFO, screenshots, order books);
// current_value repriced against live market data. Fourth full reprice pass done 2026-09-05 (first
// 2026-08-02, second 2026-09-02, third 2026-09-04) using the same two-source method documented below
// — see nav_asof / price_usd per row for the exact date each figure was pulled. This pass also folded
// in 4 real new SIP top-up purchases the user reported directly (same folios/instruments already
// held, so units/cost_basis were increased on the existing rows rather than adding new ones) — see
// the "Investment updates" comment above the Keerthana MF block below.
// Matches investment_app_memo.md §3.2 (Account/Position chain).
//
// delta_today in householdTotals is still a SYNTHETIC placeholder — real daily deltas need the
// nightly snapshot pipeline (§15, Stage 8), which doesn't exist yet. delta_month_pct, however, is
// now REAL: it's the actual change between the 2026-09-04 and 2026-09-05 full reprices below.

export const accounts = {
  acc_vinod_mf: { id: 'acc_vinod_mf', member_id: 'mem_vinod', institution: 'CAMS/KFintech (HDFC MF, Tata MF)', type: 'Mutual funds' },
  acc_vinod_zerodha: { id: 'acc_vinod_zerodha', member_id: 'mem_vinod', institution: 'Zerodha', type: 'Demat/Broking' },
  acc_vinod_rsu: { id: 'acc_vinod_rsu', member_id: 'mem_vinod', institution: 'AB InBev equity plan', type: 'Employer equity' },
  acc_vinod_fd: { id: 'acc_vinod_fd', member_id: 'mem_vinod', institution: 'Shriram Finance / HDFC Bank', type: 'Fixed deposits' },
  acc_vinod_epf: { id: 'acc_vinod_epf', member_id: 'mem_vinod', institution: 'EPFO', type: 'Retirement' },
  acc_vinod_alpaca: { id: 'acc_vinod_alpaca', member_id: 'mem_vinod', institution: 'Alpaca', type: 'Foreign brokerage' },
  acc_keerthana_mf: { id: 'acc_keerthana_mf', member_id: 'mem_keerthana', institution: 'CAMS/KFintech (6 AMCs)', type: 'Mutual funds' },
  acc_keerthana_gold: { id: 'acc_keerthana_gold', member_id: 'mem_keerthana', institution: 'HDFC Gold ETF', type: 'Commodities' },
  acc_keerthana_drivewealth: { id: 'acc_keerthana_drivewealth', member_id: 'mem_keerthana', institution: 'DriveWealth', type: 'Foreign brokerage' },
};

export const positions = [
  // Vinod — mutual funds. NAV source: AMFI's official daily NAV file
  // (portal.amfiindia.com/spages/NAVAll.txt, matched by exact ISIN) — the regulator-mandated source,
  // always preferred over a third-party aggregator or live-account pull for NAVs.
  { id: 'pos_v_mf_1', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_sensex_direct', current_value: 5507649.61, cost_basis: 4454477.28, unrealized_gain: 1053172.33, units: 7517.508, nav: 732.643, nav_asof: '2026-09-04 (AMFI)' },
  { id: 'pos_v_mf_2', account_id: 'acc_vinod_mf', instrument_id: 'inst_tata_midcap150_direct', current_value: 1961357.23, cost_basis: 1760714.45, unrealized_gain: 200642.78, units: 104924.69, nav: 18.693, nav_asof: '2026-09-04 (AMFI)' },

  // Vinod — India stocks. NAVs verified 2026-09-02 against Yahoo Finance's real-time NSE quote API
  // (query1.finance.yahoo.com — a structured, single-authority live feed, not a scraped/aggregated
  // search result). Ticker note: Solex Energy only resolves on NSE as SOLEX.NS, K.P. Energy as KPEL.NS.
  { id: 'pos_v_st_1', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_reliance', current_value: 962416, cost_basis: 1073000, unrealized_gain: -110584, units: 728, nav: 1322, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_2', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_hdfc_bank_stock', current_value: 140283.7, cost_basis: 192000, unrealized_gain: -51716.3, units: 197, nav: 712.1, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_3', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_kp_energy', current_value: 58862.16, cost_basis: 100000, unrealized_gain: -41137.84, units: 238, nav: 247.32, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_4', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_varun_beverages', current_value: 243744.8, cost_basis: 324000, unrealized_gain: -80255.2, units: 598, nav: 407.6, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_5', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_tata_power', current_value: 66240, cost_basis: 70000, unrealized_gain: -3760, units: 180, nav: 368, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_6', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_bharti_airtel', current_value: 99360, cost_basis: 103000, unrealized_gain: -3640, units: 54, nav: 1840, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_7', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_uno_minda', current_value: 169959.2, cost_basis: 176000, unrealized_gain: -6040.8, units: 136, nav: 1249.7, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_8', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_eternal', current_value: 350183.75, cost_basis: 281000, unrealized_gain: 69183.75, units: 1085, nav: 322.75, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_9', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_solex_energy', current_value: 23209.6, cost_basis: 49000, unrealized_gain: -25790.4, units: 32, nav: 725.3, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_st_10', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_dixon_tech', current_value: 170880, cost_basis: 202000, unrealized_gain: -31120, units: 12, nav: 14240, nav_asof: '2026-09-05 (Yahoo Finance)' },

  // Vinod — RSU, FDs, EPF (statement/screenshot sourced; RSU re-priced against live Yahoo BUD quote)
  { id: 'pos_v_rsu', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1936029.23, cost_basis: null, unrealized_gain: null, units: 255, nav: 7592.27, price_usd: 80.35, nav_asof: '2026-09-05 (Yahoo Finance)' },
  // Second RSU lot — a new vest the user reported directly, dated today. Same instrument, same last
  // Yahoo-quoted price (no fresh quote pulled for this pass); cost_basis null like the first lot,
  // since no vest-date FMV was provided either.
  { id: 'pos_v_rsu_2', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1450123.86, cost_basis: null, unrealized_gain: null, units: 191, nav: 7592.27, price_usd: 80.35, nav_asof: '2026-09-05 (Yahoo Finance)', vest_date: '2026-09-04', source: 'User-reported new vest' },
  { id: 'pos_v_fd_1', account_id: 'acc_vinod_fd', instrument_id: 'inst_shriram_fd', current_value: 509000, cost_basis: 500000, unrealized_gain: 9000 },
  { id: 'pos_v_fd_2', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_1', current_value: 1227000, cost_basis: 1000000, unrealized_gain: 227000 },
  { id: 'pos_v_fd_3', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_2', current_value: 1218000, cost_basis: 1000000, unrealized_gain: 218000 },
  { id: 'pos_v_epf', account_id: 'acc_vinod_epf', instrument_id: 'inst_epf_vinod', current_value: 5313080, cost_basis: 5313080, unrealized_gain: 0 },

  // Vinod — US stocks (Alpaca). nav is stored in INR (real USD price × spot USD/INR) — units already
  // reflect real post-split share counts, re-verified 2026-09-02 against Yahoo Finance.
  { id: 'pos_v_us_1', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_nvda', current_value: 4788851.74, cost_basis: 1274491.93, unrealized_gain: 3514359.81, units: 220.008, nav: 21766.72, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_us_2', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_msft', current_value: 796403.29, cost_basis: 626678.47, unrealized_gain: 169724.82, units: 16.867, nav: 47216.65, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_us_3', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_mrvl', current_value: 107263.81, cost_basis: 130446.77, unrealized_gain: -23182.96, units: 5.078, nav: 21123.24, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_v_us_4', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_now', current_value: 248760.29, cost_basis: 190278.93, unrealized_gain: 58481.36, units: 18.637, nav: 13347.66, nav_asof: '2026-09-05 (Yahoo Finance)' },
  // New position, 2026-09-05 — a real new purchase (not an existing lot to append to, as first
  // assumed). Cost basis: user-stated $498.50 invested for 5.6471 units, converted to INR at the
  // same spot rate (94.49) used for the rest of this reprice pass, since no separate purchase-day
  // rate was given. current_value uses the real live VXUS quote, not the purchase-day price.
  { id: 'pos_v_vxus', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_vxus', current_value: 47175.09, cost_basis: 47103.26, unrealized_gain: 71.82, units: 5.6471, nav: 8353.86, price_usd: 88.41, nav_asof: '2026-09-05 (Yahoo Finance)' },

  // Keerthana — mutual funds. Units/cost_basis from the CAMS CAS (30-Jun-2026 statement).
  // NAV source: AMFI's official daily NAV file, matched by exact ISIN.
  //
  // Investment updates, 2026-09-05: the user reported 4 real new purchases into existing folios
  // (same instrument already held, so units/cost_basis were added to the existing row rather than
  // creating a new one — same convention as the multi-lot RSU/MF folios elsewhere). Each entry gave
  // either the invested amount or the unit count but not both; the missing side was computed against
  // that fund's most recently AMFI-published NAV (dated 04-Sep-2026 — the actual 05-Sep NAV wasn't
  // published yet at update time, a normal one-day AMFI reporting lag, not an error):
  //   HDFC BSE Sensex Index Fund - Direct (Vinod, pos_v_mf_1): +₹46,997.65 invested → +64.148 units @732.643
  //   Axis Small Cap Fund - Direct (Keerthana, pos_k_mf_2): +167.07 units → +₹22,998.86 invested @137.66
  //   HDFC Mid Cap Fund - Direct (Keerthana, pos_k_mf_5): +₹46,997.65 invested → +200.345 units @234.584
  // A 5th reported item (Vanguard Total International Stock ETF) was misread as "not executed" and
  // initially excluded — corrected 2026-09-05, see pos_v_vxus below.
  //
  // Correction, 2026-09-06: the "ICICI Prudential Nifty Next 50 Index Fund" purchase above was
  // originally appended to pos_k_mf_6 (the Regular Plan, ISIN INF109K01IF1) — the user clarified the
  // actual purchase was the **Direct Plan**, a genuinely different fund (different ISIN, different
  // NAV), not a top-up of the Regular Plan holding. pos_k_mf_6 was reverted to its pre-2026-09-05
  // units/cost_basis, and the +869.57 units now live on a new position, pos_k_mf_10, against a new
  // instrument, inst_icici_next50_direct.
  //
  // Second correction, same day: the invested amount for that new position had been computed as
  // 869.57 × 64.1055 (₹55,744.22) — the Regular Plan's NAV, carried over from the original mistake —
  // instead of the Direct Plan's own real NAV (67.8462). Since the purchase happened the day before
  // this pricing pass (same AMFI-published NAV both times), invested should equal current_value
  // almost exactly — the user caught this directly ("ideally there shouldn't be any growth").
  // Recomputed cost_basis as 869.57 × 67.8462 = ₹58,997.02, matching current_value; unrealized_gain
  // is now correctly 0, not a fabricated ₹3,252.80 gain from mixing two different funds' NAVs.
  { id: 'pos_k_mf_1', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_elss', current_value: 2418406.03, cost_basis: 1405000, unrealized_gain: 1013406.03, units: 21669.004, nav: 111.6067, nav_asof: '2026-09-04 (AMFI)' },
  // Corrected 2026-09-06: the user gave the real total position directly (invested ₹17.38L, value
  // ₹30.18L, already including the 167.07-unit purchase above) — our prior cost_basis (₹18.15L,
  // pre-dating this session) was off by almost exactly ₹1L, a transcription error from the original
  // CAS read that had gone unnoticed through 4 reprice passes. Units backed out from the real
  // current_value ÷ the fund's real AMFI NAV (137.66), the same "derive the unknown side" convention
  // used for the other 4 top-ups — not a separately guessed unit count.
  { id: 'pos_k_mf_2', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_smallcap', current_value: 3018000, cost_basis: 1738000, unrealized_gain: 1280000, units: 21923.580, nav: 137.66, nav_asof: '2026-09-04 (AMFI)' },
  // Two more real lots added 2026-09-06: ₹40,000 @ NAV 3630.75, ₹10,000 @ NAV 3662.65.
  { id: 'pos_k_mf_3', account_id: 'acc_keerthana_mf', instrument_id: 'inst_edelweiss_liquid', current_value: 367175.84, cost_basis: 350000, unrealized_gain: 17175.84, units: 100.0553, nav: 3669.7301, nav_asof: '2026-09-04 (AMFI)' },
  { id: 'pos_k_mf_4', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_regular_k', current_value: 963653.47, cost_basis: 427500, unrealized_gain: 536153.47, units: 1349.502, nav: 714.0808, nav_asof: '2026-09-04 (AMFI)' },
  { id: 'pos_k_mf_5', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_midcap_k', current_value: 197633.27, cost_basis: 177997.65, unrealized_gain: 19635.62, units: 842.484, nav: 234.584, nav_asof: '2026-09-04 (AMFI)' },
  { id: 'pos_k_mf_6', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50', current_value: 126360.40, cost_basis: 60000, unrealized_gain: 66360.40, units: 1971.132, nav: 64.1055, nav_asof: '2026-09-04 (AMFI)' },
  { id: 'pos_k_mf_7', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_a', current_value: 221901.36, cost_basis: 188030.77, unrealized_gain: 33870.59, units: 2451.166, nav: 90.5289, nav_asof: '2026-09-04 (AMFI)' },
  { id: 'pos_k_mf_8', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_b', current_value: 1376016.74, cost_basis: 945000, unrealized_gain: 431016.74, units: 15199.751, nav: 90.5289, nav_asof: '2026-09-04 (AMFI)' },
  { id: 'pos_k_mf_9', account_id: 'acc_keerthana_mf', instrument_id: 'inst_quant_flexicap', current_value: 1395556.22, cost_basis: 1245000, unrealized_gain: 150556.22, units: 11526.359, nav: 121.0752, nav_asof: '2026-09-04 (AMFI)' },
  // New holding, 2026-09-05 (corrected onto its own row 2026-09-06) — the Direct Plan of ICICI Next
  // 50, a different ISIN from the Regular Plan the household already held (pos_k_mf_6).
  { id: 'pos_k_mf_10', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50_direct', current_value: 58997.02, cost_basis: 58997.02, unrealized_gain: 0, units: 869.57, nav: 67.8462, nav_asof: '2026-09-04 (AMFI)' },

  // Keerthana — gold. Verified 2026-09-02 against Yahoo Finance's real-time NSE quote for the
  // HDFC Gold ETF itself (ticker HDFCGOLD.NS) — the same live-quote method used for every stock
  // above, not a web-search guess.
  { id: 'pos_k_gold', account_id: 'acc_keerthana_gold', instrument_id: 'inst_hdfc_gold_etf', current_value: 3499724.8, cost_basis: 2179000, unrealized_gain: 1320724.8, units: 26624, nav: 131.45, nav_asof: '2026-09-05 (Yahoo Finance)' },

  // Keerthana — US stocks (DriveWealth). No wired brokerage price feed exists (Stage 8); prices
  // re-verified 2026-09-02 against Yahoo Finance's real-time quote API, matched by ticker.
  { id: 'pos_k_us_1', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_aapl', current_value: 316235.18, cost_basis_usd: 2448.64, unrealized_gain: 84863.19, units: 10.4596, nav: 319.97, price_usd: 319.97, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_2', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_googl', current_value: 604845.48, cost_basis_usd: 3993.29, unrealized_gain: 227519.51, units: 18.9126, nav: 338.46, price_usd: 338.46, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_3', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_meta', current_value: 238592.58, cost_basis_usd: 2334.99, unrealized_gain: 17959.37, units: 4.0940, nav: 616.77, price_usd: 616.77, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_4', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_mu', current_value: 401943.38, cost_basis_usd: 2891.70, unrealized_gain: 128706.65, units: 4.1844, nav: 1016.59, price_usd: 1016.59, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_5', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_tsm', current_value: 109757.13, cost_basis_usd: 1100.75, unrealized_gain: 5747.26, units: 2.7082, nav: 428.91, price_usd: 428.91, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_6', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_amd', current_value: 103906.18, cost_basis_usd: 997.06, unrealized_gain: 9693.98, units: 2.3026, nav: 477.57, price_usd: 477.57, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_7', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_avgo', current_value: 72433.7, cost_basis_usd: 797.64, unrealized_gain: -2935.3, units: 2.1419, nav: 357.895, price_usd: 357.895, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_8', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_alab', current_value: 101163.99, cost_basis_usd: 1276.30, unrealized_gain: -19433.6, units: 3.4492, nav: 310.4, price_usd: 310.4, nav_asof: '2026-09-05 (Yahoo Finance)' },
  { id: 'pos_k_us_9', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_asml', current_value: 123408.91, cost_basis_usd: 1392.06, unrealized_gain: -8126.84, units: 0.7616, nav: 1714.88, price_usd: 1714.88, nav_asof: '2026-09-05 (Yahoo Finance)' },
];

// Real estate (Nikoo Homes 1 & 4) is deliberately NOT in this array — see mock-data/real-estate.js
// and its own header comment. Briefly added here 2026-09-02, then explicitly reverted the same day
// at the user's request ("keep this outside the overall wealth equation"). Don't re-add without
// being asked again — it would silently flow into every screen that sums `positions` for a total
// (Portfolio, Insights, the Goal tab), which is exactly what the user asked to avoid.

export const PRICE_ASOF = { date: '2026-09-05', usd_inr: 94.49, source: 'MF NAVs: AMFI official daily NAV file (portal.amfiindia.com), matched by ISIN, dated 2026-09-04 (most recent published — 05-Sep NAV not out yet at pull time). Stocks/RSU/FX/Gold ETF: Yahoo Finance real-time quote API (query1.finance.yahoo.com), matched by ticker, pulled 2026-09-05.' };

// Sum of every position's current_value. All 12 MF positions use AMFI's official NAV file by ISIN.
// All 27 stock/RSU/gold-ETF positions use Yahoo Finance's real-time quote API by ticker — every
// priced position in the household traces to one of exactly two authoritative sources.
//
// Real estate (mock-data/real-estate.js, ₹3,42,16,500) is deliberately excluded from current_total
// — briefly included here 2026-09-02, then explicitly reverted the same day at the user's request
// ("keep this outside the overall wealth equation... I want to achieve 20Cr on top of this"). This
// total is investable/liquid net worth, not total net worth including immovable property. See the
// Debt & Immovable Assets tab for real estate's own figures.
export const householdTotals = {
  current_total: 43111545.04,
  delta_today: 42300,        // SYNTHETIC — no daily snapshot pipeline yet (Stage 8)
  delta_today_pct: 0.0011,   // SYNTHETIC
  // delta_month_pct is the real 2026-09-04 → 2026-09-05 reprice move (42898410.44 → 42967974.40,
  // i.e. every position repriced EXCLUDING the ₹1,72,738.38 of brand-new SIP top-up money added this
  // pass — new capital going in isn't a market move, same reasoning as excluding the RSU vest and
  // real estate/gold's first-tracked values from this figure previously). Left untouched by two later
  // same-day changes for the same reason: pos_v_vxus (a brand-new holding) and the 2026-09-06 pass
  // (2 new Edelweiss lots = new capital; the ICICI Next50 Direct/Regular split and the Axis Small Cap
  // correction are a reclassification and a data-error fix, neither a market move) — current_total
  // moves by each change's full effect, but delta_month_pct keeps measuring market movement only.
  delta_month_pct: 0.001622, // REAL — (42967974.40 - 42898410.44) / 42898410.44
  xirr: 0.152,               // SYNTHETIC — real per-position XIRR needs cashflow-dated lot history
  twr: 0.161,                // SYNTHETIC
  pending_pricing_count: 0,
};
