// REAL DATA — units/cost_basis sourced from statements (CAMS CAS, EPFO, screenshots, order books);
// current_value repriced against live market data. Fifth full reprice pass done 2026-09-13 (first
// 2026-08-02, second 2026-09-02, third 2026-09-04, fourth 2026-09-05) using the same two-source method
// documented below — see nav_asof / price_usd per row for the exact date each figure was pulled. No
// new capital/corrections this pass, purely a price refresh across every AMFI/Yahoo-sourced position.
// Matches investment_app_memo.md §3.2 (Account/Position chain).
//
// delta_today/delta_today_pct are 0 by convention, not because nothing moved — the prior reprice was
// 2026-09-05, 8 days before this one, so an "since-last-pull" figure would really be an 8-day move
// mislabeled as a single day's. A true daily delta still needs the nightly snapshot pipeline (§15,
// Stage 8). delta_month_pct is REAL — the actual 2026-09-05→2026-09-13 market move (-1.2718%, no new
// capital this pass) chained onto the existing September-to-date figure. See the comment directly
// above householdTotals for the full method.

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
  { id: 'pos_v_mf_1', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_sensex_direct', current_value: 5382662.02, cost_basis: 4454477.28, unrealized_gain: 928184.74, units: 7517.508, nav: 716.0168, nav_asof: '2026-09-13 (AMFI)' },
  { id: 'pos_v_mf_2', account_id: 'acc_vinod_mf', instrument_id: 'inst_tata_midcap150_direct', current_value: 1957884.22, cost_basis: 1760714.45, unrealized_gain: 197169.77, units: 104924.69, nav: 18.6599, nav_asof: '2026-09-13 (AMFI)' },

  // Vinod — India stocks. NAVs verified 2026-09-02 against Yahoo Finance's real-time NSE quote API
  // (query1.finance.yahoo.com — a structured, single-authority live feed, not a scraped/aggregated
  // search result). Ticker note: Solex Energy only resolves on NSE as SOLEX.NS, K.P. Energy as KPEL.NS.
  { id: 'pos_v_st_1', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_reliance', current_value: 915460, cost_basis: 1073000, unrealized_gain: -157540, units: 728, nav: 1257.5, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_2', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_hdfc_bank_stock', current_value: 139525.25, cost_basis: 192000, unrealized_gain: -52474.75, units: 197, nav: 708.25, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_3', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_kp_energy', current_value: 51148.58, cost_basis: 100000, unrealized_gain: -48851.42, units: 238, nav: 214.91, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_4', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_varun_beverages', current_value: 249067, cost_basis: 324000, unrealized_gain: -74933, units: 598, nav: 416.5, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_5', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_tata_power', current_value: 65637, cost_basis: 70000, unrealized_gain: -4363, units: 180, nav: 364.65, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_6', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_bharti_airtel', current_value: 98879.4, cost_basis: 103000, unrealized_gain: -4120.6, units: 54, nav: 1831.1, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_7', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_uno_minda', current_value: 163417.6, cost_basis: 176000, unrealized_gain: -12582.4, units: 136, nav: 1201.6, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_8', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_eternal', current_value: 350997.5, cost_basis: 281000, unrealized_gain: 69997.5, units: 1085, nav: 323.5, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_9', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_solex_energy', current_value: 22355.2, cost_basis: 49000, unrealized_gain: -26644.8, units: 32, nav: 698.6, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_st_10', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_dixon_tech', current_value: 161100, cost_basis: 202000, unrealized_gain: -40900, units: 12, nav: 13425, nav_asof: '2026-09-13 (Yahoo Finance)' },

  // Vinod — RSU, FDs, EPF (statement/screenshot sourced; RSU re-priced against live Yahoo BUD quote)
  { id: 'pos_v_rsu', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1906093.51, cost_basis: null, unrealized_gain: null, units: 255, nav: 7474.88, price_usd: 78.23, nav_asof: '2026-09-13 (Yahoo Finance)' },
  // Second RSU lot — a new vest the user reported directly, dated 2026-09-04. Same instrument, same
  // Yahoo-quoted price as the first lot; cost_basis null like the first lot, since no vest-date FMV
  // was provided either.
  { id: 'pos_v_rsu_2', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1427701.41, cost_basis: null, unrealized_gain: null, units: 191, nav: 7474.88, price_usd: 78.23, nav_asof: '2026-09-13 (Yahoo Finance)', vest_date: '2026-09-04', source: 'User-reported new vest' },
  { id: 'pos_v_fd_1', account_id: 'acc_vinod_fd', instrument_id: 'inst_shriram_fd', current_value: 509000, cost_basis: 500000, unrealized_gain: 9000 },
  { id: 'pos_v_fd_2', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_1', current_value: 1227000, cost_basis: 1000000, unrealized_gain: 227000 },
  { id: 'pos_v_fd_3', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_2', current_value: 1218000, cost_basis: 1000000, unrealized_gain: 218000 },
  { id: 'pos_v_epf', account_id: 'acc_vinod_epf', instrument_id: 'inst_epf_vinod', current_value: 5313080, cost_basis: 5313080, unrealized_gain: 0 },

  // Vinod — US stocks (Alpaca). nav is stored in INR (real USD price × spot USD/INR) — units already
  // reflect real post-split share counts, re-verified 2026-09-02 against Yahoo Finance.
  { id: 'pos_v_us_1', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_nvda', current_value: 4588840.95, cost_basis: 1274491.93, unrealized_gain: 3314349.02, units: 220.008, nav: 20857.61, price_usd: 218.29, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_us_2', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_msft', current_value: 798778.05, cost_basis: 626678.47, unrealized_gain: 172099.58, units: 16.867, nav: 47357.45, price_usd: 495.63, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_us_3', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_mrvl', current_value: 114556.4, cost_basis: 130446.77, unrealized_gain: -15890.37, units: 5.078, nav: 22559.36, price_usd: 236.1, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_v_us_4', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_now', current_value: 236004.83, cost_basis: 190278.93, unrealized_gain: 45725.9, units: 18.637, nav: 12663.24, price_usd: 132.53, nav_asof: '2026-09-13 (Yahoo Finance)' },
  // New position, 2026-09-05 — a real new purchase (not an existing lot to append to, as first
  // assumed). Cost basis: user-stated $498.50 invested for 5.6471 units, converted to INR at the
  // spot rate (94.49) used in that reprice pass, since no separate purchase-day rate was given.
  // current_value uses the live VXUS quote from whichever reprice pass last ran, not the purchase price.
  { id: 'pos_v_vxus', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_vxus', current_value: 47019.04, cost_basis: 47103.26, unrealized_gain: -84.22, units: 5.6471, nav: 8326.23, price_usd: 87.14, nav_asof: '2026-09-13 (Yahoo Finance)' },

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
  // Recomputed cost_basis as 869.57 × 67.8462 = ₹58,997.02, matching that pass's current_value;
  // unrealized_gain was correctly 0 at that point, not a fabricated gain from mixing two funds' NAVs.
  { id: 'pos_k_mf_1', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_elss', current_value: 2389246.05, cost_basis: 1405000, unrealized_gain: 984246.05, units: 21669.004, nav: 110.261, nav_asof: '2026-09-13 (AMFI)' },
  // Corrected 2026-09-06: the user gave the real total position directly (invested ₹17.38L, value
  // ₹30.18L, already including the 167.07-unit purchase above) — our prior cost_basis (₹18.15L,
  // pre-dating this session) was off by almost exactly ₹1L, a transcription error from the original
  // CAS read that had gone unnoticed through 4 reprice passes. Units backed out from the real
  // current_value ÷ the fund's real AMFI NAV (137.66), the same "derive the unknown side" convention
  // used for the other 4 top-ups — not a separately guessed unit count.
  { id: 'pos_k_mf_2', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_smallcap', current_value: 3015369.19, cost_basis: 1738000, unrealized_gain: 1277369.19, units: 21923.580, nav: 137.54, nav_asof: '2026-09-13 (AMFI)' },
  // Two more real lots added 2026-09-06: ₹40,000 @ NAV 3630.75, ₹10,000 @ NAV 3662.65.
  { id: 'pos_k_mf_3', account_id: 'acc_keerthana_mf', instrument_id: 'inst_edelweiss_liquid', current_value: 367692.99, cost_basis: 350000, unrealized_gain: 17692.99, units: 100.0553, nav: 3674.8977, nav_asof: '2026-09-13 (AMFI)' },
  { id: 'pos_k_mf_4', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_regular_k', current_value: 941757.26, cost_basis: 427500, unrealized_gain: 514257.26, units: 1349.502, nav: 697.8554, nav_asof: '2026-09-13 (AMFI)' },
  { id: 'pos_k_mf_5', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_midcap_k', current_value: 194279.34, cost_basis: 177997.65, unrealized_gain: 16281.69, units: 842.484, nav: 230.603, nav_asof: '2026-09-13 (AMFI)' },
  { id: 'pos_k_mf_6', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50', current_value: 124963.86, cost_basis: 60000, unrealized_gain: 64963.86, units: 1971.132, nav: 63.397, nav_asof: '2026-09-13 (AMFI)' },
  { id: 'pos_k_mf_7', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_a', current_value: 219553.88, cost_basis: 188030.77, unrealized_gain: 31523.11, units: 2451.166, nav: 89.5712, nav_asof: '2026-09-13 (AMFI)' },
  { id: 'pos_k_mf_8', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_b', current_value: 1361459.94, cost_basis: 945000, unrealized_gain: 416459.94, units: 15199.751, nav: 89.5712, nav_asof: '2026-09-13 (AMFI)' },
  { id: 'pos_k_mf_9', account_id: 'acc_keerthana_mf', instrument_id: 'inst_quant_flexicap', current_value: 1395496.28, cost_basis: 1245000, unrealized_gain: 150496.28, units: 11526.359, nav: 121.07, nav_asof: '2026-09-13 (AMFI)' },
  // New holding, 2026-09-05 (corrected onto its own row 2026-09-06) — the Direct Plan of ICICI Next
  // 50, a different ISIN from the Regular Plan the household already held (pos_k_mf_6).
  { id: 'pos_k_mf_10', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50_direct', current_value: 58349.36, cost_basis: 58997.02, unrealized_gain: -647.66, units: 869.57, nav: 67.1014, nav_asof: '2026-09-13 (AMFI)' },

  // Keerthana — gold. Verified 2026-09-02 against Yahoo Finance's real-time NSE quote for the
  // HDFC Gold ETF itself (ticker HDFCGOLD.NS) — the same live-quote method used for every stock
  // above, not a web-search guess.
  { id: 'pos_k_gold', account_id: 'acc_keerthana_gold', instrument_id: 'inst_hdfc_gold_etf', current_value: 3444346.88, cost_basis: 2179000, unrealized_gain: 1265346.88, units: 26624, nav: 129.37, nav_asof: '2026-09-13 (Yahoo Finance)' },

  // Keerthana — US stocks (DriveWealth). No wired brokerage price feed exists (Stage 8); prices
  // re-verified against Yahoo Finance's real-time quote API, matched by ticker.
  { id: 'pos_k_us_1', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_aapl', current_value: 332075.55, cost_basis_usd: 2448.64, unrealized_gain: 98108, units: 10.4596, nav: 332.27, price_usd: 332.27, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_2', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_googl', current_value: 611702.99, cost_basis_usd: 3993.29, unrealized_gain: 230144.13, units: 18.9126, nav: 338.5, price_usd: 338.5, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_3', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_meta', current_value: 253497.48, cost_basis_usd: 2334.99, unrealized_gain: 30389.19, units: 4.0940, nav: 648.03, price_usd: 648.03, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_4', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_mu', current_value: 389927.89, cost_basis_usd: 2891.70, unrealized_gain: 113625.96, units: 4.1844, nav: 975.26, price_usd: 975.26, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_5', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_tsm', current_value: 112108.87, cost_basis_usd: 1100.75, unrealized_gain: 6932.21, units: 2.7082, nav: 433.24, price_usd: 433.24, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_6', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_amd', current_value: 113555.53, cost_basis_usd: 997.06, unrealized_gain: 18286.45, units: 2.3026, nav: 516.13, price_usd: 516.13, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_7', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_avgo', current_value: 74084.35, cost_basis_usd: 797.64, unrealized_gain: -2130.15, units: 2.1419, nav: 361.99, price_usd: 361.99, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_8', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_alab', current_value: 95977.68, cost_basis_usd: 1276.30, unrealized_gain: -25972.79, units: 3.4492, nav: 291.22, price_usd: 291.22, nav_asof: '2026-09-13 (Yahoo Finance)' },
  { id: 'pos_k_us_9', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_asml', current_value: 123586.79, cost_basis_usd: 1392.06, unrealized_gain: -9424.54, units: 0.7616, nav: 1698.3, price_usd: 1698.3, nav_asof: '2026-09-13 (Yahoo Finance)' },
];

// Real estate (Nikoo Homes 1 & 4) is deliberately NOT in this array — see mock-data/real-estate.js
// and its own header comment. Briefly added here 2026-09-02, then explicitly reverted the same day
// at the user's request ("keep this outside the overall wealth equation"). Don't re-add without
// being asked again — it would silently flow into every screen that sums `positions` for a total
// (Portfolio, Insights, the Goal tab), which is exactly what the user asked to avoid.

export const PRICE_ASOF = { date: '2026-09-13', usd_inr: 95.55, source: 'MF NAVs: AMFI official daily NAV file (portal.amfiindia.com), matched by ISIN, dated 11-Sep-2026 for most schemes (14-Sep-2026 for the Edelweiss Liquid Fund — liquid/overnight funds publish a forward-dated NAV by AMFI convention, not an error) — the most recent published NAVs at pull time, since AMFI does not publish over the weekend. Stocks/RSU/FX/Gold ETF: Yahoo Finance real-time quote API (query1.finance.yahoo.com), matched by ticker, pulled 2026-09-13.' };

// Sum of every position's current_value. All 12 MF positions use AMFI's official NAV file by ISIN.
// All 27 stock/RSU/gold-ETF positions use Yahoo Finance's real-time quote API by ticker — every
// priced position in the household traces to one of exactly two authoritative sources.
//
// Real estate (mock-data/real-estate.js, ₹3,42,16,500) is deliberately excluded from current_total
// — briefly included here 2026-09-02, then explicitly reverted the same day at the user's request
// ("keep this outside the overall wealth equation... I want to achieve 20Cr on top of this"). This
// total is investable/liquid net worth, not total net worth including immovable property. See the
// Debt & Immovable Assets tab for real estate's own figures.
//
// delta_today/delta_today_pct are 0 — not because nothing moved, but because the prior reprice was
// 8 days earlier (2026-09-05), so a "since-last-pull" number here would really be an 8-day move
// mislabeled as today's. A true day-over-day figure needs the nightly snapshot pipeline (§15, Stage 8).
//
// delta_month_pct is the real September-to-date market move, now a 3-link chain of disclosed real
// reprice-only percentages (each already excludes new capital/corrections):
//   2026-09-02→2026-09-04: +0.7148% (41,156,535 → 41,450,709.38, ex the new RSU lot)
//   2026-09-04→2026-09-05: +0.1622% (42,898,410.44 → 42,967,974.40, ex that pass's new SIP top-ups)
//   2026-09-05→2026-09-13: -1.2718% (43,111,545.04 → 42,563,240.12, no new capital this pass)
// Compounding real per-period returns (not dividing the raw end total by the raw start total, which
// would wrongly count new capital as market gain) gives the correct MTD figure:
// (1.007148 × 1.001622 × 0.987282) − 1 = -0.405%.
export const householdTotals = {
  current_total: 42563240.12,
  delta_today: 0,             // REAL — see note above; no reprice ran "today," only an 8-day-old one
  delta_today_pct: 0,         // REAL
  delta_month_pct: -0.004049, // REAL — September-to-date, chained per the note above
  xirr: 0.152,                // SYNTHETIC — real per-position XIRR needs cashflow-dated lot history
  twr: 0.161,                 // SYNTHETIC
  pending_pricing_count: 0,
};
