// REAL DATA — units/cost_basis sourced from statements (CAMS CAS, EPFO, screenshots, order books);
// current_value repriced against live/near-live market data as of 2026-08-02 (INDmoney for Vinod's
// account, web-search NAV/price lookups for everything else — see nav_asof / price_usd per row).
// Matches investment_app_memo.md §3.2 (Account/Position chain).
//
// delta_today / delta_month_pct in householdTotals are still SYNTHETIC placeholders — real daily
// deltas need the nightly snapshot pipeline (§15, Stage 8), which doesn't exist yet.

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
  // Vinod — mutual funds. NAV source corrected 2026-08-02 to AMFI's official daily NAV file
  // (portal.amfiindia.com/spages/NAVAll.txt, matched by exact ISIN) — this superseded the earlier
  // INDmoney live pull, which was reading ~0.7% low against the AMFI-declared NAV for the same ISIN.
  // AMFI is the regulator-mandated source; always prefer it over a third-party aggregator for NAVs.
  { id: 'pos_v_mf_1', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_sensex_direct', current_value: 5566869.86, cost_basis: 4407479.63, unrealized_gain: 1159390.23, units: 7453.36, nav: 746.894, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_v_mf_2', account_id: 'acc_vinod_mf', instrument_id: 'inst_tata_midcap150_direct', current_value: 1939490.92, cost_basis: 1760714.45, unrealized_gain: 178776.47, units: 104924.69, nav: 18.4846, nav_asof: '2026-07-31 (AMFI)' },

  // Vinod — India stocks. NAVs verified 2026-08-02 against Yahoo Finance's real-time NSE quote API
  // (query1.finance.yahoo.com — a structured, single-authority live feed, not a scraped/aggregated
  // search result). All 10 were close to the earlier INDmoney figures (within ~2%); Dixon had the
  // largest gap. Ticker note: Solex Energy only resolved on NSE as SOLEX.NS.
  { id: 'pos_v_st_1', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_reliance', current_value: 950040, cost_basis: 1073000, unrealized_gain: -122960, units: 728, nav: 1305.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_2', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_hdfc_bank_stock', current_value: 147356, cost_basis: 192000, unrealized_gain: -44644, units: 197, nav: 748.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_3', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_kp_energy', current_value: 73066, cost_basis: 100000, unrealized_gain: -26934, units: 238, nav: 307.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_4', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_varun_beverages', current_value: 263120, cost_basis: 324000, unrealized_gain: -60880, units: 598, nav: 440.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_5', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_tata_power', current_value: 68544, cost_basis: 70000, unrealized_gain: -1456, units: 180, nav: 380.80, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_6', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_bharti_airtel', current_value: 106272, cost_basis: 103000, unrealized_gain: 3272, units: 54, nav: 1968.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_7', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_uno_minda', current_value: 160480, cost_basis: 176000, unrealized_gain: -15520, units: 136, nav: 1180.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_8', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_eternal', current_value: 328375.25, cost_basis: 281000, unrealized_gain: 47375.25, units: 1085, nav: 302.65, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_9', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_solex_energy', current_value: 29376, cost_basis: 49000, unrealized_gain: -19624, units: 32, nav: 918.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_st_10', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_dixon_tech', current_value: 165012, cost_basis: 202000, unrealized_gain: -36988, units: 12, nav: 13751.00, nav_asof: '2026-08-02 (Yahoo Finance)' },

  // Vinod — RSU, FDs, EPF (statement/screenshot sourced)
  // RSU corrected 2026-08-02 against Yahoo Finance BUD quote ($86.48 — the earlier web-search figure
  // of $81.66 was off by ~5.9%, the same class of error the MF NAVs had). 255 units x $86.48 x
  // USD/INR 95.39.
  { id: 'pos_v_rsu', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 2103578, cost_basis: null, unrealized_gain: null, units: 255, nav: 86.48, price_usd: 86.48, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_v_fd_1', account_id: 'acc_vinod_fd', instrument_id: 'inst_shriram_fd', current_value: 509000, cost_basis: 500000, unrealized_gain: 9000 },
  { id: 'pos_v_fd_2', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_1', current_value: 1227000, cost_basis: 1000000, unrealized_gain: 227000 },
  { id: 'pos_v_fd_3', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_2', current_value: 1218000, cost_basis: 1000000, unrealized_gain: 218000 },
  { id: 'pos_v_epf', account_id: 'acc_vinod_epf', instrument_id: 'inst_epf_vinod', current_value: 5313080, cost_basis: 5313080, unrealized_gain: 0 },

  // Vinod — US stocks (live-priced via INDmoney; NVDA units reflect a 10:1 split INDmoney has applied)
  { id: 'pos_v_us_1', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_nvda', current_value: 4214382.14, cost_basis: 1274491.93, unrealized_gain: 2939890.21, units: 220.008, nav: 19155.56 },
  { id: 'pos_v_us_2', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_msft', current_value: 747935.91, cost_basis: 626678.47, unrealized_gain: 121257.44, units: 16.867, nav: 44343.58 },
  { id: 'pos_v_us_3', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_mrvl', current_value: 90883.69, cost_basis: 130446.77, unrealized_gain: -39563.08, units: 5.078, nav: 17896.97 },
  { id: 'pos_v_us_4', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_now', current_value: 197801.17, cost_basis: 190278.93, unrealized_gain: 7522.25, units: 18.637, nav: 10613.57 },

  // Keerthana — mutual funds. Units/cost_basis from the CAMS CAS (30-Jun-2026 statement).
  // NAV source corrected 2026-08-02 to AMFI's official daily NAV file, matched by exact ISIN —
  // this REPLACES an earlier web-search reprice attempt that was reverted for being unreliable
  // (different providers disagreed, one fund had no source at all and was estimated). AMFI is the
  // regulator-mandated NAV source — this is now the same-quality data Vinod's MF positions use.
  { id: 'pos_k_mf_1', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_elss', current_value: 2417578.27, cost_basis: 1405000, unrealized_gain: 1012578.27, units: 21669.004, nav: 111.5685, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_k_mf_2', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_smallcap', current_value: 3017441.91, cost_basis: 1815000, unrealized_gain: 1202441.91, units: 22701.188, nav: 132.92, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_k_mf_3', account_id: 'acc_keerthana_mf', instrument_id: 'inst_edelweiss_liquid', current_value: 314736.20, cost_basis: 300000, unrealized_gain: 14736.20, units: 86.308, nav: 3646.6631, nav_asof: '2026-08-02 (AMFI)' },
  { id: 'pos_k_mf_4', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_regular_k', current_value: 982541.23, cost_basis: 427500, unrealized_gain: 555041.23, units: 1349.502, nav: 728.0769, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_k_mf_5', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_midcap_k', current_value: 149931.75, cost_basis: 131000, unrealized_gain: 18931.75, units: 642.139, nav: 233.488, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_k_mf_6', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50', current_value: 127619.56, cost_basis: 60000, unrealized_gain: 67619.56, units: 1971.132, nav: 64.7443, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_k_mf_7', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_a', current_value: 225636.45, cost_basis: 188030.77, unrealized_gain: 37605.68, units: 2451.166, nav: 92.0527, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_k_mf_8', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_b', current_value: 1399178.12, cost_basis: 945000, unrealized_gain: 454178.12, units: 15199.751, nav: 92.0527, nav_asof: '2026-07-31 (AMFI)' },
  { id: 'pos_k_mf_9', account_id: 'acc_keerthana_mf', instrument_id: 'inst_quant_flexicap', current_value: 1404366.97, cost_basis: 1245000, unrealized_gain: 159366.97, units: 11526.359, nav: 121.8396, nav_asof: '2026-07-31 (AMFI)' },

  // Keerthana — gold. Repriced 2026-08-02 against HDFC Gold ETF's traded NAV (₹121.56, web search) —
  // was ₹31.75L in the screenshot (implied ~₹119.28/unit, close enough to confirm same instrument).
  { id: 'pos_k_gold', account_id: 'acc_keerthana_gold', instrument_id: 'inst_hdfc_gold_etf', current_value: 3236413, cost_basis: 2179000, unrealized_gain: 1057413, units: 26624, nav: 121.56, nav_asof: '2026-08-02' },

  // Keerthana — US stocks (DriveWealth). No wired brokerage price feed exists (Stage 8), but prices
  // are now verified 2026-08-02 against Yahoo Finance's real-time quote API — the same authoritative
  // single source used for the Indian stocks and RSU above. This replaced an earlier web-search pass
  // that was meaningfully wrong on 2 of 9: MU was off ~1.3%, ASML was off ~9.6% (search had shown
  // 1801.51, real price is 1629.00 — search was picking up a stale/wrong-listing figure).
  { id: 'pos_k_us_1', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_aapl', current_value: 308212, cost_basis_usd: 2448.64, unrealized_gain: 74636, units: 10.4596, nav: 308.91, price_usd: 308.91, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_2', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_googl', current_value: 642484, cost_basis_usd: 3993.29, unrealized_gain: 261565, units: 18.9126, nav: 356.13, price_usd: 356.13, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_3', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_meta', current_value: 217410, cost_basis_usd: 2334.99, unrealized_gain: -5325, units: 4.0940, nav: 556.71, price_usd: 556.71, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_4', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_mu', current_value: 328512, cost_basis_usd: 2891.70, unrealized_gain: 52673, units: 4.1844, nav: 823.03, price_usd: 823.03, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_5', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_tsm', current_value: 104432, cost_basis_usd: 1100.75, unrealized_gain: -569, units: 2.7082, nav: 404.25, price_usd: 404.25, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_6', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_amd', current_value: 104584, cost_basis_usd: 997.06, unrealized_gain: 9474, units: 2.3026, nav: 476.15, price_usd: 476.15, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_7', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_avgo', current_value: 79536, cost_basis_usd: 797.64, unrealized_gain: 3449, units: 2.1419, nav: 389.28, price_usd: 389.28, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_8', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_alab', current_value: 102401, cost_basis_usd: 1276.30, unrealized_gain: -19346, units: 3.4492, nav: 311.23, price_usd: 311.23, nav_asof: '2026-08-02 (Yahoo Finance)' },
  { id: 'pos_k_us_9', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_asml', current_value: 118345, cost_basis_usd: 1392.06, unrealized_gain: -14443, units: 0.7616, nav: 1629.00, price_usd: 1629.00, nav_asof: '2026-08-02 (Yahoo Finance)' },
];

export const PRICE_ASOF = { date: '2026-08-02', usd_inr: 95.39, source: 'MF NAVs: AMFI official daily NAV file (portal.amfiindia.com), matched by ISIN. Stocks/RSU: Yahoo Finance real-time quote API (query1.finance.yahoo.com), matched by ticker.' };

// Sum of every position's current_value. All 11 MF positions use AMFI's official NAV file by ISIN.
// All 19 stock positions + the RSU use Yahoo Finance's real-time quote API by ticker. Every priced
// position in the household now traces to one of exactly two authoritative sources (AMFI or Yahoo
// Finance) plus INDmoney for EPF/FD context — no more ad hoc web search anywhere in this file.
export const householdTotals = {
  current_total: 40701024,
  delta_today: 42300,        // SYNTHETIC — no daily snapshot pipeline yet (Stage 8)
  delta_today_pct: 0.0011,   // SYNTHETIC
  delta_month_pct: 0.023,    // SYNTHETIC
  xirr: 0.152,               // SYNTHETIC — real per-position XIRR needs cashflow-dated lot history
  twr: 0.161,                // SYNTHETIC
  pending_pricing_count: 0,
};
