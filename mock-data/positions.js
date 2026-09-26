// REAL DATA — units/cost_basis sourced from statements (CAMS CAS, EPFO, screenshots, order books);
// current_value repriced against live market data. Eighth full reprice pass done 2026-09-26 (first
// 2026-08-02, second 2026-09-02, third 2026-09-04, fourth 2026-09-05, fifth 2026-09-13, sixth
// 2026-09-19, seventh 2026-09-25) using the same two-source method documented below — see nav_asof /
// price_usd per row for the exact date each figure was pulled. Matches investment_app_memo.md §3.2
// (Account/Position chain).
//
// This pass is a pure price refresh — no new capital, corrections, or switches. Seventh-pass real
// capital events (3 direct-vs-regular-plan MF switches from INDmoney/CAMS order confirmations, done
// to step up cost basis and realise gains inside the ₹1.25L annual LTCG-exempt band) are unchanged
// from that pass — see git history (commit "Record 3 real LTCG-harvest MF switches...") for the full
// detail; not re-described here since nothing about them changed this pass.
//
// delta_today/delta_today_pct are REAL for the first time this pass — the prior reprice
// (2026-09-25) landed exactly one calendar day earlier, the first time two passes have been back to
// back, so a genuine day-over-day figure is finally honest rather than the disclosed-0 placeholder
// every prior pass used for a multi-day gap. delta_month_pct is REAL — the actual 2026-09-25→2026-09-26
// market move (+0.3015%) chained onto the existing September-to-date figure. See the comment directly
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
  // 688.89 units switched out 2026-09-25 (see header comment) — real cost basis removed derived
  // directly from the order confirmation's own LTCG figure (₹4,93,681 − ₹1,25,141.98 = ₹3,68,539.02).
  { id: 'pos_v_mf_1', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_sensex_direct', current_value: 4830805.42, cost_basis: 4085938.26, unrealized_gain: 744867.16, units: 6828.618, nav: 707.4353, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  { id: 'pos_v_mf_2', account_id: 'acc_vinod_mf', instrument_id: 'inst_tata_midcap150_direct', current_value: 1924434.23, cost_basis: 1760714.45, unrealized_gain: 163719.78, units: 104924.69, nav: 18.3411, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  // New holding, 2026-09-25 — the switch-in side of pos_v_mf_1's LTCG-harvest switch (see header
  // comment). Bought at the same ₹4,93,681 the Sensex fund redemption raised, same HDFC-AMC folio.
  { id: 'pos_v_mf_3', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_nifty_next50_direct', current_value: 489020.18, cost_basis: 493681, unrealized_gain: -4660.82, units: 28772.832, nav: 16.9959, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },

  // Vinod — India stocks. NAVs verified 2026-09-02 against Yahoo Finance's real-time NSE quote API
  // (query1.finance.yahoo.com — a structured, single-authority live feed, not a scraped/aggregated
  // search result). Ticker note: Solex Energy only resolves on NSE as SOLEX.NS, K.P. Energy as KPEL.NS.
  { id: 'pos_v_st_1', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_reliance', current_value: 892528, cost_basis: 1073000, unrealized_gain: -180472, units: 728, nav: 1226, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_2', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_hdfc_bank_stock', current_value: 144913.2, cost_basis: 192000, unrealized_gain: -47086.8, units: 197, nav: 735.6, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_3', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_kp_energy', current_value: 52938.34, cost_basis: 100000, unrealized_gain: -47061.66, units: 238, nav: 222.43, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_4', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_varun_beverages', current_value: 260010.4, cost_basis: 324000, unrealized_gain: -63989.6, units: 598, nav: 434.8, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_5', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_tata_power', current_value: 66150, cost_basis: 70000, unrealized_gain: -3850, units: 180, nav: 367.5, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_6', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_bharti_airtel', current_value: 96411.6, cost_basis: 103000, unrealized_gain: -6588.4, units: 54, nav: 1785.4, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_7', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_uno_minda', current_value: 165648, cost_basis: 176000, unrealized_gain: -10352, units: 136, nav: 1218, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_8', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_eternal', current_value: 363475, cost_basis: 281000, unrealized_gain: 82475, units: 1085, nav: 335, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_9', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_solex_energy', current_value: 22566.4, cost_basis: 49000, unrealized_gain: -26433.6, units: 32, nav: 705.2, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_st_10', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_dixon_tech', current_value: 160680, cost_basis: 202000, unrealized_gain: -41320, units: 12, nav: 13390, nav_asof: '2026-09-26 (Yahoo Finance)' },

  // Vinod — RSU, FDs, EPF (statement/screenshot sourced; RSU re-priced against live Yahoo BUD quote)
  { id: 'pos_v_rsu', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1905859.8, cost_basis: null, unrealized_gain: null, units: 255, nav: 7473.96, price_usd: 78, nav_asof: '2026-09-26 (Yahoo Finance)' },
  // Second RSU lot — a new vest the user reported directly, dated 2026-09-04. Same instrument, same
  // Yahoo-quoted price as the first lot; cost_basis null like the first lot, since no vest-date FMV
  // was provided either.
  { id: 'pos_v_rsu_2', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1427526.36, cost_basis: null, unrealized_gain: null, units: 191, nav: 7473.96, price_usd: 78, nav_asof: '2026-09-26 (Yahoo Finance)', vest_date: '2026-09-04', source: 'User-reported new vest' },
  { id: 'pos_v_fd_1', account_id: 'acc_vinod_fd', instrument_id: 'inst_shriram_fd', current_value: 509000, cost_basis: 500000, unrealized_gain: 9000 },
  { id: 'pos_v_fd_2', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_1', current_value: 1227000, cost_basis: 1000000, unrealized_gain: 227000 },
  { id: 'pos_v_fd_3', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_2', current_value: 1218000, cost_basis: 1000000, unrealized_gain: 218000 },
  { id: 'pos_v_epf', account_id: 'acc_vinod_epf', instrument_id: 'inst_epf_vinod', current_value: 5452028, cost_basis: 5452028, unrealized_gain: 0 },

  // Vinod — US stocks (Alpaca). nav is stored in INR (real USD price × spot USD/INR) — units already
  // reflect real post-split share counts, re-verified 2026-09-02 against Yahoo Finance.
  { id: 'pos_v_us_1', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_nvda', current_value: 4744738.73, cost_basis: 1274491.93, unrealized_gain: 3470246.8, units: 220.008, nav: 21566.21, price_usd: 225.07, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_us_2', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_msft', current_value: 834231.87, cost_basis: 626678.47, unrealized_gain: 207553.4, units: 16.867, nav: 49459.41, price_usd: 516.17, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_us_3', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_mrvl', current_value: 127450.74, cost_basis: 130446.77, unrealized_gain: -2996.03, units: 5.078, nav: 25098.61, price_usd: 261.935, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_v_us_4', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_now', current_value: 242189.87, cost_basis: 190278.93, unrealized_gain: 51910.94, units: 18.637, nav: 12995.11, price_usd: 135.62, nav_asof: '2026-09-26 (Yahoo Finance)' },
  // New position, 2026-09-05 — a real new purchase (not an existing lot to append to, as first
  // assumed). Cost basis: user-stated $498.50 invested for 5.6471 units, converted to INR at the
  // spot rate (94.49) used in that reprice pass, since no separate purchase-day rate was given.
  // current_value uses the live VXUS quote from whichever reprice pass last ran, not the purchase price.
  { id: 'pos_v_vxus', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_vxus', current_value: 46724.44, cost_basis: 47103.26, unrealized_gain: -378.82, units: 5.6471, nav: 8274.06, price_usd: 86.35, nav_asof: '2026-09-26 (Yahoo Finance)' },

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
  { id: 'pos_k_mf_1', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_elss', current_value: 2343556.96, cost_basis: 1405000, unrealized_gain: 938556.96, units: 21669.004, nav: 108.1525, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  // Corrected 2026-09-06: the user gave the real total position directly (invested ₹17.38L, value
  // ₹30.18L, already including the 167.07-unit purchase above) — our prior cost_basis (₹18.15L,
  // pre-dating this session) was off by almost exactly ₹1L, a transcription error from the original
  // CAS read that had gone unnoticed through 4 reprice passes. Units backed out from the real
  // current_value ÷ the fund's real AMFI NAV (137.66), the same "derive the unknown side" convention
  // used for the other 4 top-ups — not a separately guessed unit count.
  { id: 'pos_k_mf_2', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_smallcap', current_value: 2983141.53, cost_basis: 1738000, unrealized_gain: 1245141.53, units: 21923.580, nav: 136.07, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  // Two more real lots added 2026-09-06: ₹40,000 @ NAV 3630.75, ₹10,000 @ NAV 3662.65.
  { id: 'pos_k_mf_3', account_id: 'acc_keerthana_mf', instrument_id: 'inst_edelweiss_liquid', current_value: 368321.4, cost_basis: 350000, unrealized_gain: 18321.4, units: 100.0553, nav: 3681.1783, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  // 144.25 units switched out 2026-09-25 into a brand-new Direct Plan holding (pos_k_mf_11) — see
  // header comment. Cost basis removed is proportional (no per-lot LTCG shown on this order):
  // 4,27,500 × (144.25/1349.502) = ₹45,696.02.
  { id: 'pos_k_mf_4', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_regular_k', current_value: 830962.56, cost_basis: 381803.98, unrealized_gain: 449158.58, units: 1205.252, nav: 689.4513, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  { id: 'pos_k_mf_5', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_midcap_k', current_value: 190721.53, cost_basis: 177997.65, unrealized_gain: 12723.88, units: 842.484, nav: 226.38, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  // pos_k_mf_6 (ICICI Prudential Nifty Next 50 Index Fund, Regular Plan) fully switched out
  // 2026-09-25 — all 1,971.132 units redeemed @ NAV 63.39 (₹1,24,949.93) and switched into the
  // existing Direct Plan holding below (pos_k_mf_10). A full liquidation, so the row is removed
  // entirely rather than kept at zero units — see header comment for the full switch rationale.
  { id: 'pos_k_mf_7', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_a', current_value: 220501.99, cost_basis: 188030.77, unrealized_gain: 32471.22, units: 2451.166, nav: 89.958, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  { id: 'pos_k_mf_8', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_b', current_value: 1367339.2, cost_basis: 945000, unrealized_gain: 422339.2, units: 15199.751, nav: 89.958, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  { id: 'pos_k_mf_9', account_id: 'acc_keerthana_mf', instrument_id: 'inst_quant_flexicap', current_value: 1388325.74, cost_basis: 1245000, unrealized_gain: 143325.74, units: 11526.359, nav: 120.4479, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  // New holding, 2026-09-05 (corrected onto its own row 2026-09-06) — the Direct Plan of ICICI Next
  // 50, a different ISIN from the Regular Plan the household used to hold (pos_k_mf_6, fully
  // switched into this position 2026-09-25 — see header comment).
  { id: 'pos_k_mf_10', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50_direct', current_value: 182515.16, cost_basis: 183937.89, unrealized_gain: -1422.73, units: 2731.58, nav: 66.8167, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },
  // New holding, 2026-09-25 — the switch-in side of pos_k_mf_4's partial LTCG-harvest switch (see
  // header comment). Bought at the same ₹1,00,750.87 the Regular-plan partial redemption raised.
  { id: 'pos_k_mf_11', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_direct_k', current_value: 99451.25, cost_basis: 100750.87, unrealized_gain: -1299.62, units: 140.58, nav: 707.4353, nav_asof: '2026-09-26 (AMFI, 25-Sep-2026 NAV)' },

  // Keerthana — gold. Verified 2026-09-02 against Yahoo Finance's real-time NSE quote for the
  // HDFC Gold ETF itself (ticker HDFCGOLD.NS) — the same live-quote method used for every stock
  // above, not a web-search guess.
  { id: 'pos_k_gold', account_id: 'acc_keerthana_gold', instrument_id: 'inst_hdfc_gold_etf', current_value: 3424645.12, cost_basis: 2179000, unrealized_gain: 1245645.12, units: 26624, nav: 128.63, nav_asof: '2026-09-26 (Yahoo Finance)' },

  // Keerthana — US stocks (DriveWealth). No wired brokerage price feed exists (Stage 8); prices
  // re-verified against Yahoo Finance's real-time quote API, matched by ticker.
  { id: 'pos_k_us_1', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_aapl', current_value: 341833.64, cost_basis_usd: 2448.64, unrealized_gain: 107204.96, units: 10.4596, nav: 32681.33, price_usd: 341.07, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_2', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_googl', current_value: 623253.57, cost_basis_usd: 3993.29, unrealized_gain: 240616.52, units: 18.9126, nav: 32954.41, price_usd: 343.92, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_3', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_meta', current_value: 294866.5, cost_basis_usd: 2334.99, unrealized_gain: 71127.76, units: 4.0940, nav: 72024.06, price_usd: 751.66, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_4', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_mu', current_value: 433939.31, cost_basis_usd: 2891.70, unrealized_gain: 156856.62, units: 4.1844, nav: 103704.07, price_usd: 1082.28, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_5', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_tsm', current_value: 116933.17, cost_basis_usd: 1100.75, unrealized_gain: 11459.31, units: 2.7082, nav: 43177.45, price_usd: 450.61, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_6', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_amd', current_value: 139139.14, cost_basis_usd: 997.06, unrealized_gain: 43600.85, units: 2.3026, nav: 60426.97, price_usd: 630.63, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_7', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_avgo', current_value: 72409.61, cost_basis_usd: 797.64, unrealized_gain: -4020.25, units: 2.1419, nav: 33806.25, price_usd: 352.81, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_8', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_alab', current_value: 120507.77, cost_basis_usd: 1276.30, unrealized_gain: -1787.3, units: 3.4492, nav: 34937.89, price_usd: 364.62, nav_asof: '2026-09-26 (Yahoo Finance)' },
  { id: 'pos_k_us_9', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_asml', current_value: 127266.66, cost_basis_usd: 1392.06, unrealized_gain: -6120.53, units: 0.7616, nav: 167104.33, price_usd: 1743.94, nav_asof: '2026-09-26 (Yahoo Finance)' },
];

// Real estate (Nikoo Homes 1 & 4) is deliberately NOT in this array — see mock-data/real-estate.js
// and its own header comment. Briefly added here 2026-09-02, then explicitly reverted the same day
// at the user's request ("keep this outside the overall wealth equation"). Don't re-add without
// being asked again — it would silently flow into every screen that sums `positions` for a total
// (Portfolio, Insights, the Goal tab), which is exactly what the user asked to avoid.

export const PRICE_ASOF = { date: '2026-09-26', usd_inr: 95.82, source: 'MF NAVs: AMFI official daily NAV file (portal.amfiindia.com), matched by ISIN, dated 25-Sep-2026 for every scheme held (Edelweiss Liquid Fund forward-dated 27-Sep-2026 per AMFI\'s usual liquid-fund convention). Stocks/RSU/FX/Gold ETF: Yahoo Finance real-time quote API (query1.finance.yahoo.com), matched by ticker, pulled 2026-09-26.' };

// Sum of every position's current_value. All 13 MF positions use AMFI's official NAV file by ISIN.
// All 27 stock/RSU/gold-ETF positions use Yahoo Finance's real-time quote API by ticker — every
// priced position in the household traces to one of exactly two authoritative sources. No new
// capital, corrections, or switches this pass — a pure price refresh, position count unchanged (44).
//
// Real estate (mock-data/real-estate.js, ₹3,42,16,500) is deliberately excluded from current_total
// — briefly included here 2026-09-02, then explicitly reverted the same day at the user's request
// ("keep this outside the overall wealth equation... I want to achieve 20Cr on top of this"). This
// total is investable/liquid net worth, not total net worth including immovable property. See the
// Debt & Immovable Assets tab for real estate's own figures.
//
// delta_today/delta_today_pct are REAL for the first time this pass — the prior reprice was exactly
// one day earlier (2026-09-25), the first time two consecutive passes have landed on adjacent
// calendar days, so a genuine day-over-day figure is finally honest here (every prior pass had a
// multi-day gap and left this at a disclosed 0 rather than mislabel a multi-day move as "today's").
// This is still a manual reprice-pass delta, not the nightly snapshot pipeline (§15, Stage 8) — it
// happens to be real today only because the gap was exactly 1 day, not because the pipeline exists.
//
// delta_month_pct is the real September-to-date market move, now a 6-link chain of disclosed real
// reprice-only percentages (each already excludes new capital/corrections/switches):
//   2026-09-02→2026-09-04: +0.7148% (41,156,535 → 41,450,709.38, ex the new RSU lot)
//   2026-09-04→2026-09-05: +0.1622% (42,898,410.44 → 42,967,974.40, ex that pass's new SIP top-ups)
//   2026-09-05→2026-09-13: -1.2718% (43,111,545.04 → 42,563,240.12, no new capital this pass)
//   2026-09-13→2026-09-19: +0.3872% (42,563,240.12 → 42,728,038.61, no new capital this pass)
//   2026-09-19→2026-09-25: -0.2844% (42,866,986.61 → 42,745,083.18, ex the EPF top-up on the start
//     side and with the 3 MF switches excluded from both sides — redeem-and-rebuy at the same NAV
//     moment doesn't move the total, so the switches contribute nothing to this link)
//   2026-09-25→2026-09-26: +0.3015% (42,745,083.18 → 42,873,962.39, pure price refresh, no new capital)
// Compounding real per-period returns (not dividing the raw end total by the raw start total, which
// would wrongly count new capital as market gain) gives the correct MTD figure:
// (1.007148 × 1.001622 × 0.987282 × 1.003872 × 0.997156 × 1.003015) − 1 = -0.291%.
//
// 2026-09-19, later same day: Vinod's EPF passbook (PYKRP14098760000010121_2026.pdf) was updated with
// 3 more posted contribution months (Jun/Jul/Aug-2026 wage months, credited Jul/Aug/Sep-2026) — real
// payroll contributions, not a market move, so this is layered on top of current_total without
// touching delta_month_pct (same "new money isn't a market move" convention as every RSU vest/SIP
// top-up before it). pos_v_epf: ₹53,13,080 → ₹54,52,028 (+₹1,38,948 = employee 31,869×3 + 34,737×3 for
// each half, matching the employer side and the passbook's own "Total Contributions for the year"
// line exactly). mock-data/epf-history.js's running-balance entry updated to match.
export const householdTotals = {
  current_total: 42873962.39,
  delta_today: 128879.21,     // REAL — first genuinely real day-over-day figure; see note above
  delta_today_pct: 0.003015,  // REAL
  delta_month_pct: -0.002908, // REAL — September-to-date, chained per the note above
  xirr: 0.152,                // SYNTHETIC — real per-position XIRR needs cashflow-dated lot history
  twr: 0.161,                 // SYNTHETIC
  pending_pricing_count: 0,
};
