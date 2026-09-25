// REAL DATA — units/cost_basis sourced from statements (CAMS CAS, EPFO, screenshots, order books);
// current_value repriced against live market data. Seventh full reprice pass done 2026-09-25 (first
// 2026-08-02, second 2026-09-02, third 2026-09-04, fourth 2026-09-05, fifth 2026-09-13, sixth
// 2026-09-19) using the same two-source method documented below — see nav_asof / price_usd per row
// for the exact date each figure was pulled. Matches investment_app_memo.md §3.2 (Account/Position
// chain).
//
// Same pass, real capital events (not corrections): 3 direct-vs-regular-plan MF switches from the
// user's own INDmoney/CAMS order confirmations ("New Update/" screenshots), done to step up cost
// basis and realise gains inside the ₹1.25L annual LTCG-exempt band before the tax-free room resets:
//   1. Vinod — HDFC BSE Sensex Index Fund (Direct Plan): switched out 688.89 units @ NAV 716.6761
//      (₹4,93,681 redemption, real LTCG ₹1,25,141.98 per the order confirmation, so real cost basis
//      removed = 4,93,681 − 1,25,141.98 = ₹3,68,539.02 — the exact realised-gain figure, not a
//      proportional estimate), same-day switched into a brand-new holding, HDFC NIFTY Next 50 Index
//      Fund - Direct Plan (28,772.832 units @ NAV 17.1579, same ₹4,93,681, folio 18282598/80 — same
//      HDFC-AMC omnibus folio as the Sensex fund, per the order confirmation). New position pos_v_mf_3.
//   2. Keerthana — HDFC BSE Sensex Index Fund (Regular Plan): switched out 144.25 of her 1,349.502
//      units @ NAV 698.47 (₹1,00,759.32) into a brand-new Direct Plan holding of the same fund
//      (140.58 units @ NAV 716.68, ₹1,00,750.87). A partial switch, not the whole Regular-plan
//      position — no per-lot LTCG was shown on this order (a summary orders list, not a detail
//      view like Vinod's), so the cost basis removed is proportional to units sold (144.25/1349.502
//      of the position's ₹4,27,500 cost basis). New position pos_k_mf_11, new instrument
//      inst_hdfc_sensex_direct_k (folio not shown in the order-list screenshot — a real gap, not
//      guessed).
//   3. Keerthana — ICICI Prudential Nifty Next 50 Index Fund (Regular Plan): switched out ALL
//      1,971.132 units @ NAV 63.39 (₹1,24,949.93) — a full liquidation, so pos_k_mf_6 is removed
//      entirely rather than left at zero — into her EXISTING Direct Plan holding of the same fund
//      (pos_k_mf_10, +1,862.01 units @ NAV 67.10, +₹1,24,940.87), the same multi-lot-top-up
//      convention already used elsewhere for a second purchase into an existing position.
// None of these 3 switches added or removed household capital (redeem-and-rebuy, same rupee amount
// both sides) — they only reset cost basis. Any LTCG tax shown on the order confirmation isn't
// withheld at redemption for resident individuals' MF LTCG; it's payable via ITR separately, so it
// doesn't reduce anything recorded here.
//
// delta_today/delta_today_pct are 0 by convention, not because nothing moved — the prior reprice was
// 2026-09-19, 6 days before this one, so a "since-last-pull" figure would really be a 6-day move
// mislabeled as a single day's. A true daily delta still needs the nightly snapshot pipeline (§15,
// Stage 8). delta_month_pct is REAL — the actual 2026-09-19→2026-09-25 market move (-0.2844%, the 3
// switches above are NAV-neutral and excluded from both sides) chained onto the existing
// September-to-date figure. See the comment directly above householdTotals for the full method.

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
  { id: 'pos_v_mf_1', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_sensex_direct', current_value: 4810219.87, cost_basis: 4085938.26, unrealized_gain: 724281.61, units: 6828.618, nav: 704.4207, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  { id: 'pos_v_mf_2', account_id: 'acc_vinod_mf', instrument_id: 'inst_tata_midcap150_direct', current_value: 1930530.36, cost_basis: 1760714.45, unrealized_gain: 169815.91, units: 104924.69, nav: 18.3992, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  // New holding, 2026-09-25 — the switch-in side of pos_v_mf_1's LTCG-harvest switch (see header
  // comment). Bought at the same ₹4,93,681 the Sensex fund redemption raised, same HDFC-AMC folio.
  { id: 'pos_v_mf_3', account_id: 'acc_vinod_mf', instrument_id: 'inst_hdfc_nifty_next50_direct', current_value: 486318.41, cost_basis: 493681, unrealized_gain: -7362.59, units: 28772.832, nav: 16.902, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },

  // Vinod — India stocks. NAVs verified 2026-09-02 against Yahoo Finance's real-time NSE quote API
  // (query1.finance.yahoo.com — a structured, single-authority live feed, not a scraped/aggregated
  // search result). Ticker note: Solex Energy only resolves on NSE as SOLEX.NS, K.P. Energy as KPEL.NS.
  { id: 'pos_v_st_1', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_reliance', current_value: 887577.6, cost_basis: 1073000, unrealized_gain: -185422.4, units: 728, nav: 1219.2, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_2', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_hdfc_bank_stock', current_value: 143593.3, cost_basis: 192000, unrealized_gain: -48406.7, units: 197, nav: 728.9, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_3', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_kp_energy', current_value: 52728.9, cost_basis: 100000, unrealized_gain: -47271.1, units: 238, nav: 221.55, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_4', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_varun_beverages', current_value: 257887.5, cost_basis: 324000, unrealized_gain: -66112.5, units: 598, nav: 431.25, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_5', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_tata_power', current_value: 65421, cost_basis: 70000, unrealized_gain: -4579, units: 180, nav: 363.45, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_6', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_bharti_airtel', current_value: 96973.2, cost_basis: 103000, unrealized_gain: -6026.8, units: 54, nav: 1795.8, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_7', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_uno_minda', current_value: 166518.4, cost_basis: 176000, unrealized_gain: -9481.6, units: 136, nav: 1224.4, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_8', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_eternal', current_value: 364017.5, cost_basis: 281000, unrealized_gain: 83017.5, units: 1085, nav: 335.5, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_9', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_solex_energy', current_value: 23408, cost_basis: 49000, unrealized_gain: -25592, units: 32, nav: 731.5, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_st_10', account_id: 'acc_vinod_zerodha', instrument_id: 'inst_dixon_tech', current_value: 159588, cost_basis: 202000, unrealized_gain: -42412, units: 12, nav: 13299, nav_asof: '2026-09-25 (Yahoo Finance)' },

  // Vinod — RSU, FDs, EPF (statement/screenshot sourced; RSU re-priced against live Yahoo BUD quote)
  { id: 'pos_v_rsu', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1894155.78, cost_basis: null, unrealized_gain: null, units: 255, nav: 7428.06, price_usd: 77.42, nav_asof: '2026-09-25 (Yahoo Finance)' },
  // Second RSU lot — a new vest the user reported directly, dated 2026-09-04. Same instrument, same
  // Yahoo-quoted price as the first lot; cost_basis null like the first lot, since no vest-date FMV
  // was provided either.
  { id: 'pos_v_rsu_2', account_id: 'acc_vinod_rsu', instrument_id: 'inst_abinbev_rsu', current_value: 1418759.82, cost_basis: null, unrealized_gain: null, units: 191, nav: 7428.06, price_usd: 77.42, nav_asof: '2026-09-25 (Yahoo Finance)', vest_date: '2026-09-04', source: 'User-reported new vest' },
  { id: 'pos_v_fd_1', account_id: 'acc_vinod_fd', instrument_id: 'inst_shriram_fd', current_value: 509000, cost_basis: 500000, unrealized_gain: 9000 },
  { id: 'pos_v_fd_2', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_1', current_value: 1227000, cost_basis: 1000000, unrealized_gain: 227000 },
  { id: 'pos_v_fd_3', account_id: 'acc_vinod_fd', instrument_id: 'inst_hdfc_fd_2', current_value: 1218000, cost_basis: 1000000, unrealized_gain: 218000 },
  { id: 'pos_v_epf', account_id: 'acc_vinod_epf', instrument_id: 'inst_epf_vinod', current_value: 5452028, cost_basis: 5452028, unrealized_gain: 0 },

  // Vinod — US stocks (Alpaca). nav is stored in INR (real USD price × spot USD/INR) — units already
  // reflect real post-split share counts, re-verified 2026-09-02 against Yahoo Finance.
  { id: 'pos_v_us_1', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_nvda', current_value: 4740584.56, cost_basis: 1274491.93, unrealized_gain: 3466092.63, units: 220.008, nav: 21547.33, price_usd: 224.58, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_us_2', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_msft', current_value: 805802.27, cost_basis: 626678.47, unrealized_gain: 179123.8, units: 16.867, nav: 47773.89, price_usd: 497.93, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_us_3', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_mrvl', current_value: 126162.7, cost_basis: 130446.77, unrealized_gain: -4284.07, units: 5.078, nav: 24844.96, price_usd: 258.95, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_v_us_4', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_now', current_value: 246368.13, cost_basis: 190278.93, unrealized_gain: 56089.2, units: 18.637, nav: 13219.3, price_usd: 137.78, nav_asof: '2026-09-25 (Yahoo Finance)' },
  // New position, 2026-09-05 — a real new purchase (not an existing lot to append to, as first
  // assumed). Cost basis: user-stated $498.50 invested for 5.6471 units, converted to INR at the
  // spot rate (94.49) used in that reprice pass, since no separate purchase-day rate was given.
  // current_value uses the live VXUS quote from whichever reprice pass last ran, not the purchase price.
  { id: 'pos_v_vxus', account_id: 'acc_vinod_alpaca', instrument_id: 'inst_vxus', current_value: 46373.6, cost_basis: 47103.26, unrealized_gain: -729.66, units: 5.6471, nav: 8211.93, price_usd: 85.59, nav_asof: '2026-09-25 (Yahoo Finance)' },

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
  { id: 'pos_k_mf_1', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_elss', current_value: 2341396.56, cost_basis: 1405000, unrealized_gain: 936396.56, units: 21669.004, nav: 108.0528, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  // Corrected 2026-09-06: the user gave the real total position directly (invested ₹17.38L, value
  // ₹30.18L, already including the 167.07-unit purchase above) — our prior cost_basis (₹18.15L,
  // pre-dating this session) was off by almost exactly ₹1L, a transcription error from the original
  // CAS read that had gone unnoticed through 4 reprice passes. Units backed out from the real
  // current_value ÷ the fund's real AMFI NAV (137.66), the same "derive the unknown side" convention
  // used for the other 4 top-ups — not a separately guessed unit count.
  { id: 'pos_k_mf_2', account_id: 'acc_keerthana_mf', instrument_id: 'inst_axis_smallcap', current_value: 2975687.51, cost_basis: 1738000, unrealized_gain: 1237687.51, units: 21923.580, nav: 135.73, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  // Two more real lots added 2026-09-06: ₹40,000 @ NAV 3630.75, ₹10,000 @ NAV 3662.65.
  { id: 'pos_k_mf_3', account_id: 'acc_keerthana_mf', instrument_id: 'inst_edelweiss_liquid', current_value: 368228.88, cost_basis: 350000, unrealized_gain: 18228.88, units: 100.0553, nav: 3680.2536, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  // 144.25 units switched out 2026-09-25 into a brand-new Direct Plan holding (pos_k_mf_11) — see
  // header comment. Cost basis removed is proportional (no per-lot LTCG shown on this order):
  // 4,27,500 × (144.25/1349.502) = ₹45,696.02.
  { id: 'pos_k_mf_4', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_regular_k', current_value: 827425.14, cost_basis: 381803.98, unrealized_gain: 445621.17, units: 1205.252, nav: 686.5163, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  { id: 'pos_k_mf_5', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_midcap_k', current_value: 191105.7, cost_basis: 177997.65, unrealized_gain: 13108.05, units: 842.484, nav: 226.836, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  // pos_k_mf_6 (ICICI Prudential Nifty Next 50 Index Fund, Regular Plan) fully switched out
  // 2026-09-25 — all 1,971.132 units redeemed @ NAV 63.39 (₹1,24,949.93) and switched into the
  // existing Direct Plan holding below (pos_k_mf_10). A full liquidation, so the row is removed
  // entirely rather than kept at zero units — see header comment for the full switch rationale.
  { id: 'pos_k_mf_7', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_a', current_value: 219632.81, cost_basis: 188030.77, unrealized_gain: 31602.04, units: 2451.166, nav: 89.6034, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  { id: 'pos_k_mf_8', account_id: 'acc_keerthana_mf', instrument_id: 'inst_ppfas_flexicap_b', current_value: 1361949.37, cost_basis: 945000, unrealized_gain: 416949.37, units: 15199.751, nav: 89.6034, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  { id: 'pos_k_mf_9', account_id: 'acc_keerthana_mf', instrument_id: 'inst_quant_flexicap', current_value: 1380816.31, cost_basis: 1245000, unrealized_gain: 135816.31, units: 11526.359, nav: 119.7964, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  // New holding, 2026-09-05 (corrected onto its own row 2026-09-06) — the Direct Plan of ICICI Next
  // 50, a different ISIN from the Regular Plan the household used to hold (pos_k_mf_6, fully
  // switched into this position 2026-09-25 — see header comment).
  { id: 'pos_k_mf_10', account_id: 'acc_keerthana_mf', instrument_id: 'inst_icici_next50_direct', current_value: 181507.21, cost_basis: 183937.89, unrealized_gain: -2430.68, units: 2731.58, nav: 66.4477, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },
  // New holding, 2026-09-25 — the switch-in side of pos_k_mf_4's partial LTCG-harvest switch (see
  // header comment). Bought at the same ₹1,00,750.87 the Regular-plan partial redemption raised.
  { id: 'pos_k_mf_11', account_id: 'acc_keerthana_mf', instrument_id: 'inst_hdfc_sensex_direct_k', current_value: 99027.46, cost_basis: 100750.87, unrealized_gain: -1723.41, units: 140.58, nav: 704.4207, nav_asof: '2026-09-25 (AMFI, 24-Sep-2026 NAV)' },

  // Keerthana — gold. Verified 2026-09-02 against Yahoo Finance's real-time NSE quote for the
  // HDFC Gold ETF itself (ticker HDFCGOLD.NS) — the same live-quote method used for every stock
  // above, not a web-search guess.
  { id: 'pos_k_gold', account_id: 'acc_keerthana_gold', instrument_id: 'inst_hdfc_gold_etf', current_value: 3398287.36, cost_basis: 2179000, unrealized_gain: 1219287.36, units: 26624, nav: 127.64, nav_asof: '2026-09-25 (Yahoo Finance)' },

  // Keerthana — US stocks (DriveWealth). No wired brokerage price feed exists (Stage 8); prices
  // re-verified against Yahoo Finance's real-time quote API, matched by ticker.
  { id: 'pos_k_us_1', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_aapl', current_value: 337111.28, cost_basis_usd: 2448.64, unrealized_gain: 102176.52, units: 10.4596, nav: 32229.84, price_usd: 335.92, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_2', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_googl', current_value: 621235.98, cost_basis_usd: 3993.29, unrealized_gain: 238099.77, units: 18.9126, nav: 32847.73, price_usd: 342.36, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_3', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_meta', current_value: 305436.44, cost_basis_usd: 2334.99, unrealized_gain: 81405.83, units: 4.0940, nav: 74605.87, price_usd: 777.59, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_4', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_mu', current_value: 433802.82, cost_basis_usd: 2891.70, unrealized_gain: 156358.66, units: 4.1844, nav: 103671.45, price_usd: 1080.53, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_5', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_tsm', current_value: 117226.03, cost_basis_usd: 1100.75, unrealized_gain: 11614.57, units: 2.7082, nav: 43285.59, price_usd: 451.15, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_6', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_amd', current_value: 139017.98, cost_basis_usd: 997.06, unrealized_gain: 43355.06, units: 2.3026, nav: 60374.35, price_usd: 629.26, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_7', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_avgo', current_value: 72000.59, cost_basis_usd: 797.64, unrealized_gain: -4528.98, units: 2.1419, nav: 33615.29, price_usd: 350.36, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_8', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_alab', current_value: 119304.83, cost_basis_usd: 1276.30, unrealized_gain: -3149.77, units: 3.4492, nav: 34589.13, price_usd: 360.51, nav_asof: '2026-09-25 (Yahoo Finance)' },
  { id: 'pos_k_us_9', account_id: 'acc_keerthana_drivewealth', instrument_id: 'inst_asml', current_value: 125866.02, cost_basis_usd: 1392.06, unrealized_gain: -7695.17, units: 0.7616, nav: 165265.26, price_usd: 1722.5, nav_asof: '2026-09-25 (Yahoo Finance)' },
];

// Real estate (Nikoo Homes 1 & 4) is deliberately NOT in this array — see mock-data/real-estate.js
// and its own header comment. Briefly added here 2026-09-02, then explicitly reverted the same day
// at the user's request ("keep this outside the overall wealth equation"). Don't re-add without
// being asked again — it would silently flow into every screen that sums `positions` for a total
// (Portfolio, Insights, the Goal tab), which is exactly what the user asked to avoid.

export const PRICE_ASOF = { date: '2026-09-25', usd_inr: 95.945, source: 'MF NAVs: AMFI official daily NAV file (portal.amfiindia.com), matched by ISIN, dated 24-Sep-2026 for every scheme held — the most recent published NAVs at pull time. Stocks/RSU/FX/Gold ETF: Yahoo Finance real-time quote API (query1.finance.yahoo.com), matched by ticker, pulled 2026-09-25.' };

// Sum of every position's current_value. All 13 MF positions use AMFI's official NAV file by ISIN.
// All 27 stock/RSU/gold-ETF positions use Yahoo Finance's real-time quote API by ticker — every
// priced position in the household traces to one of exactly two authoritative sources. (Count moved
// 12→13 MF / 43→44 total this pass: pos_k_mf_6 fully switched out and removed, pos_v_mf_3 and
// pos_k_mf_11 added — see the file header for the 3 real switches behind this.)
//
// Real estate (mock-data/real-estate.js, ₹3,42,16,500) is deliberately excluded from current_total
// — briefly included here 2026-09-02, then explicitly reverted the same day at the user's request
// ("keep this outside the overall wealth equation... I want to achieve 20Cr on top of this"). This
// total is investable/liquid net worth, not total net worth including immovable property. See the
// Debt & Immovable Assets tab for real estate's own figures.
//
// delta_today/delta_today_pct are 0 — not because nothing moved, but because the prior reprice was
// 6 days earlier (2026-09-19), so a "since-last-pull" number here would really be a 6-day move
// mislabeled as today's. A true day-over-day figure needs the nightly snapshot pipeline (§15, Stage 8).
//
// delta_month_pct is the real September-to-date market move, now a 5-link chain of disclosed real
// reprice-only percentages (each already excludes new capital/corrections/switches):
//   2026-09-02→2026-09-04: +0.7148% (41,156,535 → 41,450,709.38, ex the new RSU lot)
//   2026-09-04→2026-09-05: +0.1622% (42,898,410.44 → 42,967,974.40, ex that pass's new SIP top-ups)
//   2026-09-05→2026-09-13: -1.2718% (43,111,545.04 → 42,563,240.12, no new capital this pass)
//   2026-09-13→2026-09-19: +0.3872% (42,563,240.12 → 42,728,038.61, no new capital this pass)
//   2026-09-19→2026-09-25: -0.2844% (42,866,986.61 → 42,745,083.18, ex the EPF top-up on the start
//     side and with the 3 MF switches excluded from both sides — redeem-and-rebuy at the same NAV
//     moment doesn't move the total, so the switches contribute nothing to this link)
// Compounding real per-period returns (not dividing the raw end total by the raw start total, which
// would wrongly count new capital as market gain) gives the correct MTD figure:
// (1.007148 × 1.001622 × 0.987282 × 1.003872 × 0.997156) − 1 = -0.304%.
//
// 2026-09-19, later same day: Vinod's EPF passbook (PYKRP14098760000010121_2026.pdf) was updated with
// 3 more posted contribution months (Jun/Jul/Aug-2026 wage months, credited Jul/Aug/Sep-2026) — real
// payroll contributions, not a market move, so this is layered on top of current_total without
// touching delta_month_pct (same "new money isn't a market move" convention as every RSU vest/SIP
// top-up before it). pos_v_epf: ₹53,13,080 → ₹54,52,028 (+₹1,38,948 = employee 31,869×3 + 34,737×3 for
// each half, matching the employer side and the passbook's own "Total Contributions for the year"
// line exactly). mock-data/epf-history.js's running-balance entry updated to match.
export const householdTotals = {
  current_total: 42745083.18,
  delta_today: 0,             // REAL — see note above; no reprice ran "today," only a 6-day-old one
  delta_today_pct: 0,         // REAL
  delta_month_pct: -0.003035, // REAL — September-to-date, chained per the note above
  xirr: 0.152,                // SYNTHETIC — real per-position XIRR needs cashflow-dated lot history
  twr: 0.161,                 // SYNTHETIC
  pending_pricing_count: 0,
};
