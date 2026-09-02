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

  // ---- Vinod — India direct equity (Zerodha) ----
  inst_reliance: { id: 'inst_reliance', isin: 'INE002A01018', name: 'Reliance Industries Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Energy & Conglomerate', tech: { week52High: 1611.8, week52Low: 1249.8, dayHigh: 1309.7, dayLow: 1293.6, volume: 8624996, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_hdfc_bank_stock: { id: 'inst_hdfc_bank_stock', isin: 'INE040A01034', name: 'HDFC Bank Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Financials (Banking)', tech: { week52High: 1020.5, week52Low: 726.65, dayHigh: 757.55, dayLow: 747.2, volume: 25522483, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_kp_energy: { id: 'inst_kp_energy', isin: 'INE982T01011', name: 'K.P. Energy Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Renewable Energy (Wind)', tech: { week52High: 520.0, week52Low: 237.9, dayHigh: 310.1, dayLow: 304.55, volume: 95838, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_varun_beverages: { id: 'inst_varun_beverages', isin: 'INE200M01039', name: 'Varun Beverages Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Consumer Staples (Beverages)', tech: { week52High: 555.8, week52Low: 381.0, dayHigh: 451.0, dayLow: 439.85, volume: 7987191, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_tata_power: { id: 'inst_tata_power', isin: 'INE245A01021', name: 'Tata Power Company Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Utilities (Power)', tech: { week52High: 464.9, week52Low: 342.5, dayHigh: 381.35, dayLow: 377.15, volume: 3006383, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_bharti_airtel: { id: 'inst_bharti_airtel', isin: 'INE397D01024', name: 'Bharti Airtel Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Telecom', tech: { week52High: 2174.5, week52Low: 1740.5, dayHigh: 1976.4, dayLow: 1947.4, volume: 6529385, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_uno_minda: { id: 'inst_uno_minda', isin: 'INE405E01023', name: 'Uno Minda Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Auto Components', tech: { week52High: 1382.0, week52Low: 994.0, dayHigh: 1188.0, dayLow: 1167.6, volume: 776436, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_eternal: { id: 'inst_eternal', isin: 'INE758T01015', name: 'Eternal Ltd (Zomato)', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Consumer Internet (Food-tech)', tech: { week52High: 368.45, week52Low: 212.6, dayHigh: 316.0, dayLow: 301.8, volume: 36770653, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_solex_energy: { id: 'inst_solex_energy', isin: 'INE0QSJ01018', name: 'Solex Energy Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Renewable Energy (Solar)', tech: { week52High: 1985.0, week52Low: 795.45, dayHigh: 950.0, dayLow: 902.5, volume: 40549, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_dixon_tech: { id: 'inst_dixon_tech', isin: 'INE935N01020', name: 'Dixon Technologies (India) Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Domestic stock', currency: 'INR', source: 'Zerodha', sector: 'Electronics Manufacturing (EMS)', tech: { week52High: 18471.0, week52Low: 9600.0, dayHigh: 14589.0, dayLow: 13601.0, volume: 634727, asof: '2026-08-02 (Yahoo Finance)' } },

  // ---- Vinod — other ----
  inst_abinbev_rsu: {
    id: 'inst_abinbev_rsu', isin: null,
    name: 'AB InBev RSU/ESOP', l1: 'Equity', l2: 'Private', l3: 'ESOP/RSU/SAR', currency: 'USD',
    source: 'employer equity plan screenshot', sector: 'Consumer Staples (Brewing)',
    tech: { week52High: 86.6, week52Low: 57.77, dayHigh: 86.6, dayLow: 85.53, volume: 1712004, asof: '2026-08-02 (Yahoo Finance, ticker BUD)' },
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
  inst_nvda: { id: 'inst_nvda', isin: 'US67066G1040', name: 'NVIDIA Corporation', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Semiconductors', tech: { week52High: 236.54, week52Low: 164.07, dayHigh: 201.97, dayLow: 194.95, volume: 139961152, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_msft: { id: 'inst_msft', isin: 'US5949181045', name: 'Microsoft Corporation', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Software & Cloud', tech: { week52High: 553.72, week52Low: 349.2, dayHigh: 466.84, dayLow: 449.552, volume: 60845971, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_mrvl: { id: 'inst_mrvl', isin: 'US5738741041', name: 'Marvell Technology, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Semiconductors', tech: { week52High: 329.88, week52Low: 61.44, dayHigh: 201.35, dayLow: 187.25, volume: 26835492, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_now: { id: 'inst_now', isin: 'US81762P1021', name: 'ServiceNow, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'Alpaca', sector: 'Software (SaaS)', tech: { week52High: 194.726, week52Low: 81.24, dayHigh: 112.39, dayLow: 106.67, volume: 18903638, asof: '2026-08-02 (Yahoo Finance)' } },

  // ---- Keerthana — mutual funds (CAMS/KFintech, folios real) ----
  inst_axis_elss: { id: 'inst_axis_elss', isin: 'INF846K01EW2', name: 'Axis ELSS Tax Saver Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 91032587935/0' },
  inst_axis_smallcap: { id: 'inst_axis_smallcap', isin: 'INF846K01K35', name: 'Axis Small Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 91032587935/0' },
  inst_edelweiss_liquid: { id: 'inst_edelweiss_liquid', isin: 'INF754K01GM4', name: 'Edelweiss Liquid Fund - Direct Growth', l1: 'Fixed Income', l2: 'Pooled debt', l3: 'Liquid fund', currency: 'INR', source: 'folio 91039408544/0' },
  inst_hdfc_sensex_regular_k: { id: 'inst_hdfc_sensex_regular_k', isin: 'INF179K01LA9', name: 'HDFC BSE Sensex Index Fund - Regular Plan', l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR', source: 'folio 16750703/02' },
  inst_hdfc_midcap_k: { id: 'inst_hdfc_midcap_k', isin: 'INF179K01XQ0', name: 'HDFC Mid Cap Fund - Direct Plan', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 41310923/57' },
  inst_icici_next50: { id: 'inst_icici_next50', isin: 'INF109K01IF1', name: 'ICICI Prudential Nifty Next 50 Index Fund', l1: 'Equity', l2: 'Pooled', l3: 'Index fund', currency: 'INR', source: 'folio 16437881/90' },
  inst_ppfas_flexicap_a: { id: 'inst_ppfas_flexicap_a', isin: 'INF879O01027', name: 'Parag Parikh Flexi Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 10831093' },
  inst_ppfas_flexicap_b: { id: 'inst_ppfas_flexicap_b', isin: 'INF879O01027', name: 'Parag Parikh Flexi Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 11572522' },
  inst_quant_flexicap: { id: 'inst_quant_flexicap', isin: 'INF966L01911', name: 'quant Flexi Cap Fund - Direct Growth', l1: 'Equity', l2: 'Pooled', l3: 'Active MF', currency: 'INR', source: 'folio 51066654544/0' },

  // ---- Keerthana — other ----
  inst_hdfc_gold_etf: { id: 'inst_hdfc_gold_etf', isin: null, name: 'HDFC Gold ETF', l1: 'Real Assets', l2: 'Commodities', l3: 'Gold ETF', currency: 'INR', source: 'screenshot' },

  // ---- Keerthana — US stocks (DriveWealth) ----
  inst_aapl: { id: 'inst_aapl', isin: 'US0378331005', name: 'Apple Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Consumer Electronics', tech: { week52High: 344.57, week52Low: 201.68, dayHigh: 310.69, dayLow: 300.0, volume: 132489137, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_googl: { id: 'inst_googl', isin: 'US02079K3059', name: 'Alphabet Inc. Class A', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Internet & Advertising', tech: { week52High: 408.61, week52Low: 190.12, dayHigh: 358.55, dayLow: 340.0, volume: 46498023, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_meta: { id: 'inst_meta', isin: 'US30303M1027', name: 'Meta Platforms, Inc. Class A', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Internet & Social Media', tech: { week52High: 796.25, week52Low: 520.26, dayHigh: 558.33, dayLow: 540.24, volume: 24261457, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_mu: { id: 'inst_mu', isin: 'US5951121038', name: 'Micron Technology, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors (Memory)', tech: { week52High: 1255.0, week52Low: 105.46, dayHigh: 930.88, dayLow: 818.0, volume: 54538600, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_tsm: { id: 'inst_tsm', isin: 'US8740391003', name: 'Taiwan Semiconductor Manufacturing Co Ltd', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors (Foundry)', tech: { week52High: 479.0, week52Low: 223.7, dayHigh: 420.35, dayLow: 398.8, volume: 11904676, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_amd: { id: 'inst_amd', isin: 'US0079031078', name: 'Advanced Micro Devices, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors', tech: { week52High: 584.73, week52Low: 149.22, dayHigh: 515.62, dayLow: 475.76, volume: 26615744, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_avgo: { id: 'inst_avgo', isin: 'US11135F1012', name: 'Broadcom Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors', tech: { week52High: 495.0, week52Low: 281.87, dayHigh: 399.92, dayLow: 379.71, volume: 20391003, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_alab: { id: 'inst_alab', isin: 'US04627M1062', name: 'Astera Labs, Inc.', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductors (Connectivity)', tech: { week52High: 499.476, week52Low: 97.89, dayHigh: 341.91, dayLow: 305.02, volume: 5329350, asof: '2026-08-02 (Yahoo Finance)' } },
  inst_asml: { id: 'inst_asml', isin: 'US0398071012', name: 'ASML Holding N.V. (NY Registry Shares)', l1: 'Equity', l2: 'Direct listed', l3: 'Foreign stock', currency: 'USD', source: 'DriveWealth', sector: 'Semiconductor Equipment', tech: { week52High: 1999.96, week52Low: 684.24, dayHigh: 1692.15, dayLow: 1624.71, volume: 1601445, asof: '2026-08-02 (Yahoo Finance)' } },
};

// Real estate (Nikoo Homes 1 & 4, Bangalore) deliberately lives in mock-data/real-estate.js, not
// here — the user asked to keep immovable/illiquid property fully outside the household's tracked
// investment portfolio (this file) and net worth, not just out of one total. Briefly added here
// and to positions.js on 2026-09-02, then explicitly reverted the same day. Don't re-add real
// estate as instruments/positions without being asked again — see the Debt & Immovable Assets tab.
