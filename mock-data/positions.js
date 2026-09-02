// REAL DATA — units/cost_basis sourced from statements (CAMS CAS, EPFO, screenshots, order books);
// current_value repriced against live market data. Second full reprice pass done 2026-09-02 (first
// was 2026-08-02) using the same two-source method documented below — see nav_asof / price_usd per
// row for the exact date each figure was pulled.
// Matches investment_app_memo.md §3.2 (Account/Position chain).
//
// delta_today in householdTotals is still a SYNTHETIC placeholder — real daily deltas need the
// nightly snapshot pipeline (§15, Stage 8), which doesn't exist yet. delta_month_pct, however, is
// now REAL: it's the actual change between the 2026-08-02 and 2026-09-02 full reprices below.

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
  { id: 'pos_v_mf_1', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_sensex_direct', current_value: 5490337.27, cost_basis: 4407479.63, unrealized_gain: 1082857.64, units: 7453.36, nav: 736.6258, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_v_mf_2', account_id: 'acc_vinod_mf', instrument_id: 'inst_tata_midcap150_direct', current_value: 1971797.24, cost_basis: 1760714.45, unrealized_gain: 211082.79, units: 104924.69, nav: 18.7925, nav_asof: '2026-09-01 (AMFI)' },

  // Vinod — India stocks. NAVs verified 2026-09-02 against Yahoo Finance's real-time NSE quote API
  // (query1.finance.yahoo.com — a structured, single-authority live feed, not a scraped/aggregated
  // search result). Ticker note: Solex Energy only resolves on NSE as SOLEX.NS, K.P. Energy as KPEL.NS.
  { id: 'pos_v_st_1', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_reliance', current_value: 952660.80, cost_basis: 1073000, unrealized_gain: -120339.20, units: 728, nav: 1308.6, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_2', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_hdfc_bank_stock', current_value: 138431.90, cost_basis: 192000, unrealized_gain: -53568.10, units: 197, nav: 702.7, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_3', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_kp_energy', current_value: 57229.48, cost_basis: 100000, unrealized_gain: -42770.52, units: 238, nav: 240.46, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_4', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_varun_beverages', current_value: 246764.70, cost_basis: 324000, unrealized_gain: -77235.30, units: 598, nav: 412.65, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_5', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_tata_power', current_value: 64845.00, cost_basis: 70000, unrealized_gain: -5155.00, units: 180, nav: 360.25, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_6', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_bharti_airtel', current_value: 101017.80, cost_basis: 103000, unrealized_gain: -1982.20, units: 54, nav: 1870.7, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_7', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_uno_minda', current_value: 169388.00, cost_basis: 176000, unrealized_gain: -6612.00, units: 136, nav: 1245.5, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_8', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_eternal', current_value: 353493.00, cost_basis: 281000, unrealized_gain: 72493.00, units: 1085, nav: 325.8, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_9', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_solex_energy', current_value: 22758.40, cost_basis: 49000, unrealized_gain: -26241.60, units: 32, nav: 711.2, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_st_10', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_dixon_tech', current_value: 174360.00, cost_basis: 202000, unrealized_gain: -27640.00, units: 12, nav: 14530.0, nav_asof: '2026-09-02 (Yahoo Finance)' },

  // Vinod — RSU, FDs, EPF (statement/screenshot sourced; RSU re-priced against live Yahoo BUD quote)
  { id: 'pos_v_rsu', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1915067.86, cost_basis: null, unrealized_gain: null, units: 255, nav: 79.13, price_usd: 79.13, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_fd_1', account_id: 'acc_vinod_fd', instrument_id: 'inst_shriram_fd', current_value: 509000, cost_basis: 500000, unrealized_gain: 9000 },
  { id: 'pos_v_fd_2', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_1', current_value: 1227000, cost_basis: 1000000, unrealized_gain: 227000 },
  { id: 'pos_v_fd_3', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_2', current_value: 1218000, cost_basis: 1000000, unrealized_gain: 218000 },
  { id: 'pos_v_epf', account_id: 'acc_vinod_epf', instrument_id: 'inst_epf_vinod', current_value: 5313080, cost_basis: 5313080, unrealized_gain: 0 },

  // Vinod — US stocks (Alpaca). nav is stored in INR (real USD price × spot USD/INR) — units already
  // reflect real post-split share counts, re-verified 2026-09-02 against Yahoo Finance.
  { id: 'pos_v_us_1', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_nvda', current_value: 4540260.11, cost_basis: 1274491.93, unrealized_gain: 3265768.18, units: 220.008, nav: 20636.80, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_us_2', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_msft', current_value: 802039.45, cost_basis: 626678.47, unrealized_gain: 175360.98, units: 16.867, nav: 47550.81, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_us_3', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_mrvl', current_value: 101395.95, cost_basis: 130446.77, unrealized_gain: -29050.82, units: 5.078, nav: 19967.69, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_v_us_4', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_now', current_value: 252761.58, cost_basis: 190278.93, unrealized_gain: 62482.65, units: 18.637, nav: 13562.35, nav_asof: '2026-09-02 (Yahoo Finance)' },

  // Keerthana — mutual funds. Units/cost_basis from the CAMS CAS (30-Jun-2026 statement).
  // NAV source: AMFI's official daily NAV file, matched by exact ISIN.
  { id: 'pos_k_mf_1', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_elss', current_value: 2427968.56, cost_basis: 1405000, unrealized_gain: 1022968.56, units: 21669.004, nav: 112.048, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_2', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_smallcap', current_value: 3127088.65, cost_basis: 1815000, unrealized_gain: 1312088.65, units: 22701.188, nav: 137.75, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_3', account_id: 'acc_keerthana_mf', instrument_id: 'inst_edelweiss_liquid', current_value: 316421.65, cost_basis: 300000, unrealized_gain: 16421.65, units: 86.308, nav: 3666.1914, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_4', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_regular_k', current_value: 968904.11, cost_basis: 427500, unrealized_gain: 541404.11, units: 1349.502, nav: 717.9716, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_5', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_midcap_k', current_value: 151795.88, cost_basis: 131000, unrealized_gain: 20795.88, units: 642.139, nav: 236.391, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_6', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50', current_value: 126349.76, cost_basis: 60000, unrealized_gain: 66349.76, units: 1971.132, nav: 64.1001, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_7', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_a', current_value: 222540.38, cost_basis: 188030.77, unrealized_gain: 34509.61, units: 2451.166, nav: 90.7896, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_8', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_b', current_value: 1379979.31, cost_basis: 945000, unrealized_gain: 434979.31, units: 15199.751, nav: 90.7896, nav_asof: '2026-09-01 (AMFI)' },
  { id: 'pos_k_mf_9', account_id: 'acc_keerthana_mf', instrument_id: 'inst_quant_flexicap', current_value: 1397663.24, cost_basis: 1245000, unrealized_gain: 152663.24, units: 11526.359, nav: 121.258, nav_asof: '2026-09-01 (AMFI)' },

  // Keerthana — gold. No live-quotable move since the last pass; kept at its 2026-08-02 mark
  // (HDFC Gold ETF traded NAV) rather than guessed forward.
  { id: 'pos_k_gold', account_id: 'acc_keerthana_gold', instrument_id: 'inst_hdfc_gold_etf', current_value: 3236413, cost_basis: 2179000, unrealized_gain: 1057413, units: 26624, nav: 121.56, nav_asof: '2026-08-02' },

  // Keerthana — US stocks (DriveWealth). No wired brokerage price feed exists (Stage 8); prices
  // re-verified 2026-09-02 against Yahoo Finance's real-time quote API, matched by ticker.
  { id: 'pos_k_us_1', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_aapl', current_value: 322756.46, cost_basis_usd: 2448.64, unrealized_gain: 90360.93, units: 10.4596, nav: 325.13, price_usd: 325.13, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_2', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_googl', current_value: 601346.51, cost_basis_usd: 3993.29, unrealized_gain: 222351.34, units: 18.9126, nav: 335.02, price_usd: 335.02, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_3', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_meta', current_value: 224793.66, cost_basis_usd: 2334.99, unrealized_gain: 3184.43, units: 4.0940, nav: 578.54, price_usd: 578.54, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_4', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_mu', current_value: 370699.86, cost_basis_usd: 2891.70, unrealized_gain: 96254.40, units: 4.1844, nav: 933.44, price_usd: 933.44, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_5', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_tsm', current_value: 106410.36, cost_basis_usd: 1100.75, unrealized_gain: 1940.38, units: 2.7082, nav: 414.00, price_usd: 414.00, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_6', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_amd', current_value: 100440.95, cost_basis_usd: 997.06, unrealized_gain: 5811.97, units: 2.3026, nav: 459.61, price_usd: 459.61, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_7', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_avgo', current_value: 75149.82, cost_basis_usd: 797.64, unrealized_gain: -552.59, units: 2.1419, nav: 369.68, price_usd: 369.68, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_8', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_alab', current_value: 91630.41, cost_basis_usd: 1276.30, unrealized_gain: -29500.67, units: 3.4492, nav: 279.91, price_usd: 279.91, nav_asof: '2026-09-02 (Yahoo Finance)' },
  { id: 'pos_k_us_9', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_asml', current_value: 120359.54, cost_basis_usd: 1392.06, unrealized_gain: -11758.09, units: 0.7616, nav: 1665.14, price_usd: 1665.14, nav_asof: '2026-09-02 (Yahoo Finance)' },
];

export const PRICE_ASOF = { date: '2026-09-02', usd_inr: 94.908, source: 'MF NAVs: AMFI official daily NAV file (portal.amfiindia.com), matched by ISIN, dated 2026-09-01. Stocks/RSU/FX: Yahoo Finance real-time quote API (query1.finance.yahoo.com), matched by ticker, pulled 2026-09-02. Gold kept at its prior 2026-08-02 mark (no fresher single-source quote pulled this pass).' };

// Sum of every position's current_value. All 11 MF positions use AMFI's official NAV file by ISIN.
// 19 of 20 stock/RSU positions use Yahoo Finance's real-time quote API by ticker (Gold ETF excepted,
// see PRICE_ASOF) — same authoritative-source discipline as the first reprice pass, just run again a
// month later, which is what makes delta_month_pct below a real number instead of a placeholder.
export const householdTotals = {
  current_total: 40990401,
  delta_today: 42300,        // SYNTHETIC — no daily snapshot pipeline yet (Stage 8)
  delta_today_pct: 0.0011,   // SYNTHETIC
  delta_month_pct: 0.00711,  // REAL — (40990401 - 40701024) / 40701024, the actual 2026-08-02 → 2026-09-02 move
  xirr: 0.152,               // SYNTHETIC — real per-position XIRR needs cashflow-dated lot history
  twr: 0.161,                // SYNTHETIC
  pending_pricing_count: 0,
};
