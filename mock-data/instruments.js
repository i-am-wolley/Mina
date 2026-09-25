// REAL DATA — extracted from statements in "Base resources/Statements to look and build/"
// and cross-checked against live INDmoney holdings where available (Vinod's account only).
// Matches investment_app_memo.md §3.1 (taxonomy) / §3.2 (Instrument entity).
// PAN, UAN, folio holder addresses and other PII are deliberately not carried into these fixtures.
//
// `tech` (52-week high/low, day range, volume) and `sector` were added 2026-08-02, sourced from
// Yahoo Finance's chart API (same call already used for prices — these fields were already in the
// response, just unused until now) for stocks/RSU, and public sector classifications for the 10
// Indian stocks + RSU. Values are in the instrument's native currency (USD for US names). Not
// re-fetched live on every load — a snapshot as of the fetch date, same caveat as `nav_asof`.
// Refreshed most recently 2026-09-25 (seventh full reprice pass) alongside every position's price.
// Same pass: 2 new instruments from real LTCG-harvest MF switches (inst_hdfc_nifty_next50_direct,
// inst_hdfc_sensex_direct_k) — see mock-data/positions.js's header comment for the full switch detail.

export const instruments = {
  // ---- Vinod — mutual funds (CAMS, folios real) ----
  inst_hdfc_sensex_direct: {
    id: 'inst_hdfc_sensex_direct', isin: 'INF179K01WN9',
    name: 'HDFC BSE Sensex Index Fund - Direct Plan',
    l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR',
    source: 'CAMS CAS, folio 18282598/80',
  },
  inst_tata_midcap150_direct: {
    id: 'inst_tata_midcap150_direct', isin: 'INF277KA1612',
    name: 'Tata Nifty Midcap 150 Momentum 50 Index Fund - Direct Plan',
    l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR',
    source: 'CAMS CAS, folio 6387676/01',
  },
  // New, 2026-09-25 — the switch-in side of Vinod's HDFC BSE Sensex LTCG-harvest switch (688.89 units
  // redeemed, real LTCG ₹1,25,141.98 realised inside the ₹1.25L annual exemption). Same HDFC-AMC
  // omnibus folio as the Sensex fund, per the order confirmation.
  inst_hdfc_nifty_next50_direct: {
    id: 'inst_hdfc_nifty_next50_direct', isin: 'INF179KC1BQ9',
    name: 'HDFC NIFTY Next 50 Index Fund - Direct Plan',
    l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR',
    source: 'INDmoney order confirmation, folio 18282598/80 (switch, 2026-09-19/23)',
  },

  // ---- Vinod — India direct equity (Zerodha) ----
  inst_reliance: { id: 'inst_reliance', isin: 'INE002A01018', name: 'Reliance Industries Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Energy & Conglomerate', tech: { week52High: 1611.8, week52Low: 1219.2, dayHigh: 1241.6, dayLow: 1219.2, volume: 13900316, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_hdfc_bank_stock: { id: 'inst_hdfc_bank_stock', isin: 'INE040A01034', name: 'HDFC Bank Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Financials (Banking)', tech: { week52High: 1020.5, week52Low: 681.9, dayHigh: 734.85, dayLow: 722.7, volume: 29496854, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_kp_energy: { id: 'inst_kp_energy', isin: 'INE982T01011', name: 'K.P. Energy Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Renewable Energy (Wind)', tech: { week52High: 463.25, week52Low: 206.52, dayHigh: 227.24, dayLow: 218.0, volume: 328961, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_varun_beverages: { id: 'inst_varun_beverages', isin: 'INE200M01039', name: 'Varun Beverages Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Consumer Staples (Beverages)', tech: { week52High: 555.8, week52Low: 381, dayHigh: 436.85, dayLow: 428.3, volume: 5015698, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_tata_power: { id: 'inst_tata_power', isin: 'INE245A01021', name: 'Tata Power Company Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Utilities (Power)', tech: { week52High: 464.9, week52Low: 342.5, dayHigh: 367.5, dayLow: 362.95, volume: 2707957, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_bharti_airtel: { id: 'inst_bharti_airtel', isin: 'INE397D01024', name: 'Bharti Airtel Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Telecom', tech: { week52High: 2174.5, week52Low: 1740.5, dayHigh: 1829.9, dayLow: 1795.8, volume: 4538083, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_uno_minda: { id: 'inst_uno_minda', isin: 'INE405E01023', name: 'Uno Minda Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Auto Components', tech: { week52High: 1382, week52Low: 994, dayHigh: 1252.9, dayLow: 1212.3, volume: 445746, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_eternal: { id: 'inst_eternal', isin: 'INE758T01015', name: 'Eternal Ltd (Zomato)', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Consumer Internet (Food-tech)', tech: { week52High: 368.45, week52Low: 212.6, dayHigh: 343.6, dayLow: 333.55, volume: 14923664, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_solex_energy: { id: 'inst_solex_energy', isin: 'INE0QSJ01018', name: 'Solex Energy Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Renewable Energy (Solar)', tech: { week52High: 1985, week52Low: 651.2, dayHigh: 755.0, dayLow: 713.15, volume: 65723, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_dixon_tech: { id: 'inst_dixon_tech', isin: 'INE935N01020', name: 'Dixon Technologies (India) Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Electronics Manufacturing (EMS)', tech: { week52High: 18229.0, week52Low: 9600, dayHigh: 13315.0, dayLow: 13091.0, volume: 185055, asof: '2026-09-25 (Yahoo Finance)' } },

  // ---- Vinod — other ----
  inst_abinbev_rsu: {
    id: 'inst_abinbev_rsu', isin: null,
    name: 'AB InBev RSU/ESOP', l1: 'Equity', l2: 'Private', l3: 'ESOP/RSU/SAR', currency: 'USD',
    source: 'employer equity plan screenshot', sector: 'Consumer Staples (Brewing)',
    tech: { week52High: 86.6, week52Low: 58.44, dayHigh: 78.29, dayLow: 77.41, volume: 2069026, asof: '2026-09-25 (Yahoo Finance, ticker BUD)' },
  },
  inst_shriram_fd: { id: 'inst_shriram_fd', isin: null, name: 'Shriram Finance FD', l1: 'Fixed Income', l2: 'Bank/Institutional', l3: 'FD', currency: 'INR', rate: 0.076, matures: '2029-04-30' },
  inst_hdfc_fd_1: { id: 'inst_hdfc_fd_1', isin: null, name: 'HDFC Bank FD #1', l1: 'Fixed Income', l2: 'Bank/Institutional', l3: 'FD', currency: 'INR', rate: 0.0775, matures: '2033-05-31' },
  inst_hdfc_fd_2: { id: 'inst_hdfc_fd_2', isin: null, name: 'HDFC Bank FD #2', l1: 'Fixed Income', l2: 'Bank/Institutional', l3: 'FD', currency: 'INR', rate: 0.0725, matures: '2028-02-29' },
  inst_epf_vinod: {
    id: 'inst_epf_vinod', isin: null,
    name: 'Employees Provident Fund — AB InBev GCC Services India Pvt Ltd',
    l1: 'Insurance & Retirement', l2: 'Retirement', l3: 'EPF', currency: 'INR',
    source: 'EPFO member passbook, UAN on file',
  },

  // ---- Vinod — US stocks (Alpaca, live-priced via INDmoney) ----
  inst_nvda: { id: 'inst_nvda', isin: 'US67066G1040', name: 'NVIDIA Corporation', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Semiconductors', tech: { week52High: 236.54, week52Low: 164.27, dayHigh: 224.9, dayLow: 221.091, volume: 76420503, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_msft: { id: 'inst_msft', isin: 'US5949181045', name: 'Microsoft Corporation', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Software & Cloud', tech: { week52High: 553.72, week52Low: 349.2, dayHigh: 498.88, dayLow: 491.22, volume: 16611248, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_mrvl: { id: 'inst_mrvl', isin: 'US5738741041', name: 'Marvell Technology, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Semiconductors', tech: { week52High: 329.88, week52Low: 70.69, dayHigh: 261.98, dayLow: 252.19, volume: 13351419, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_now: { id: 'inst_now', isin: 'US81762P1021', name: 'ServiceNow, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Software (SaaS)', tech: { week52High: 192.966, week52Low: 81.24, dayHigh: 141.042, dayLow: 137.53, volume: 7954430, asof: '2026-09-25 (Yahoo Finance)' } },
  // New holding, 2026-09-05 — a real new purchase (not an existing lot), under the LRS via Vinod's
  // Alpaca account, matching the diversification idea already discussed in the Goal tab's own fund
  // research (GOAL_FUNDS). l3 kept as 'Foreign stock' (not a new l3 value) so it correctly falls into
  // the existing Foreign Equity class bucket per the user's own framing ("it's part of the foreign
  // assets") — it's a diversified ex-US equity ETF, not a single company, so no `sector` is set.
  inst_vxus: { id: 'inst_vxus', isin: 'US9219097683', name: 'Vanguard Total International Stock ETF', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', tech: { week52High: 88.62, week52Low: 72.08, dayHigh: 85.935, dayLow: 85.155, volume: 5498575, asof: '2026-09-25 (Yahoo Finance)' } },

  // ---- Keerthana — mutual funds (CAMS/KFintech, folios real) ----
  inst_axis_elss: { id: 'inst_axis_elss', isin: 'INF846K01EW2', name: 'Axis ELSS Tax Saver Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 91032587935/0' },
  inst_axis_smallcap: { id: 'inst_axis_smallcap', isin: 'INF846K01K35', name: 'Axis Small Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 91032587935/0' },
  inst_edelweiss_liquid: { id: 'inst_edelweiss_liquid', isin: 'INF754K01GM4', name: 'Edelweiss Liquid Fund - Direct Growth', l1: 'Fixed Income', l2: 'Pooled debt', l3: 'Liquid fund', currency: 'INR', source: 'folio 91039408544/0' },
  inst_hdfc_sensex_regular_k: { id: 'inst_hdfc_sensex_regular_k', isin: 'INF179K01LA9', name: 'HDFC BSE Sensex Index Fund - Regular Plan', l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR', source: 'folio 16750703/02' },
  // New, 2026-09-25 — the switch-in side of Keerthana's partial HDFC BSE Sensex LTCG-harvest switch
  // (144.25 of 1,349.502 Regular-plan units redeemed). Same ISIN as Vinod's Direct-plan holding
  // above (a fund-level ISIN, not folio-level) but a separate instrument entry since it's a different
  // folio — same convention already used for the 2 Parag Parikh folios below. Folio number wasn't
  // shown on the order-list screenshot (a summary view, not Vinod's per-order detail screen) — a
  // real gap, not guessed.
  inst_hdfc_sensex_direct_k: { id: 'inst_hdfc_sensex_direct_k', isin: 'INF179K01WN9', name: 'HDFC BSE Sensex Index Fund - Direct Plan', l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR', source: 'INDmoney order confirmation (switch, 2026-09-21), folio not shown' },
  inst_hdfc_midcap_k: { id: 'inst_hdfc_midcap_k', isin: 'INF179K01XQ0', name: 'HDFC Mid Cap Fund - Direct Plan', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 41310923/57' },
  // No position references this instrument anymore — pos_k_mf_6 (all 1,971.132 units) was fully
  // switched into inst_icici_next50_direct below on 2026-09-25 (LTCG-harvest switch, see
  // positions.js's header comment). Left defined here rather than deleted, as a record of what the
  // household used to hold — same audit-trail convention as every other correction comment in this
  // file.
  inst_icici_next50: { id: 'inst_icici_next50', isin: 'INF109K01IF1', name: 'ICICI Prudential Nifty Next 50 Index Fund', l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR', source: 'folio 16437881/90' },
  // A genuinely different fund from inst_icici_next50 above (Regular Plan) — same underlying index,
  // different ISIN/NAV since it's the Direct Plan. Added 2026-09-05 as a real new purchase; received
  // the household's entire Regular-plan position via a full LTCG-harvest switch 2026-09-25.
  inst_icici_next50_direct: { id: 'inst_icici_next50_direct', isin: 'INF109K01Y80', name: 'ICICI Prudential Nifty Next 50 Index Fund - Direct Plan', l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR', source: 'CAMS/KFintech (new purchase, 2026-09-05; switch-in, 2026-09-25)' },
  inst_ppfas_flexicap_a: { id: 'inst_ppfas_flexicap_a', isin: 'INF879O01027', name: 'Parag Parikh Flexi Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 10831093' },
  inst_ppfas_flexicap_b: { id: 'inst_ppfas_flexicap_b', isin: 'INF879O01027', name: 'Parag Parikh Flexi Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 11572522' },
  inst_quant_flexicap: { id: 'inst_quant_flexicap', isin: 'INF966L01911', name: 'quant Flexi Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 51066654544/0' },

  // ---- Keerthana — other ----
  inst_hdfc_gold_etf: { id: 'inst_hdfc_gold_etf', isin: null, name: 'HDFC Gold ETF', l1: 'Real Assets', l2: 'Commodities', l3: 'Gold ETF', currency: 'INR', source: 'screenshot' },

  // ---- Keerthana — US stocks (DriveWealth) ----
  inst_aapl: { id: 'inst_aapl', isin: 'US0378331005', name: 'Apple Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Consumer Electronics', tech: { week52High: 345.34, week52Low: 243.42, dayHigh: 338.91, dayLow: 334.3, volume: 24364559, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_googl: { id: 'inst_googl', isin: 'US02079K3059', name: 'Alphabet Inc. Class A', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Internet & Advertising', tech: { week52High: 408.61, week52Low: 235.84, dayHigh: 343.09, dayLow: 336.02, volume: 23558214, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_meta: { id: 'inst_meta', isin: 'US30303M1027', name: 'Meta Platforms, Inc. Class A', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Internet & Social Media', tech: { week52High: 779.82, week52Low: 520.26, dayHigh: 779.819, dayLow: 743.006, volume: 34646511, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_mu: { id: 'inst_mu', isin: 'US5951121038', name: 'Micron Technology, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors (Memory)', tech: { week52High: 1255, week52Low: 155.18, dayHigh: 1081.04, dayLow: 1044.0, volume: 21938990, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_tsm: { id: 'inst_tsm', isin: 'US8740391003', name: 'Taiwan Semiconductor Manufacturing Co Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors (Foundry)', tech: { week52High: 479, week52Low: 266.82, dayHigh: 452.54, dayLow: 440.69, volume: 7699321, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_amd: { id: 'inst_amd', isin: 'US0079031078', name: 'Advanced Micro Devices, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors', tech: { week52High: 630.8, week52Low: 157.05, dayHigh: 630.79, dayLow: 599.35, volume: 25202032, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_avgo: { id: 'inst_avgo', isin: 'US11135F1012', name: 'Broadcom Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors', tech: { week52High: 495, week52Low: 289.96, dayHigh: 351.43, dayLow: 346.89, volume: 20865350, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_alab: { id: 'inst_alab', isin: 'US04627M1062', name: 'Astera Labs, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors (Connectivity)', tech: { week52High: 499.476, week52Low: 97.89, dayHigh: 367.69, dayLow: 348.35, volume: 3402551, asof: '2026-09-25 (Yahoo Finance)' } },
  inst_asml: { id: 'inst_asml', isin: 'US0398071012', name: 'ASML Holding N.V. (NY Registry Shares)', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductor Equipment', tech: { week52High: 1999.96, week52Low: 935.41, dayHigh: 1736.84, dayLow: 1700.88, volume: 1260863, asof: '2026-09-25 (Yahoo Finance)' } },
};

// Real estate (Nikoo Homes 1 & 4, Bangalore) deliberately lives in mock-data/real-estate.js, not
// here — the user asked to keep immovable/illiquid property fully outside the household's tracked
// investment portfolio (this file) and net worth, not just out of one total. Briefly added here
// and to positions.js on 2026-09-02, then explicitly reverted the same day. Don't re-add real
// estate as instruments/positions without being asked again — see the Debt & Immovable Assets tab.
