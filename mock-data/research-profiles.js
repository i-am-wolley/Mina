// REAL RESEARCH DATA — one-time deep-analysis pass, 2026-09-26. Per-instrument fundamentals
// (market-cap tier, true country of domicile, P/E, analyst-consensus growth outlook, key risks,
// a neutral thesis note) gathered via WebSearch/WebFetch against real sources (Screener.in,
// StockAnalysis.com, GuruFocus, Simply Wall St, Zacks, company IR, etc.) — never invented.
// Every entry carries `source`/`asof` per the same discipline as GOAL_PLAN's researched CAGRs
// and every NAV/price pull elsewhere in this app. See `Base resources/deep-analysis-methodology.md`
// for the full method and how to re-run this research later.
//
// Deliberately NOT present here: FDs, EPF, and mutual fund instruments (funds get their own
// look-through data in fund-holdings.js instead of a single P/E/growth figure). VXUS is present
// but with peRatioTTM/growthOutlook null and a note explaining why (it's a diversified index ETF,
// not a single company) — its region/sector spread lives in fund-holdings.js's look-through entry.
//
// Data-quality notes (from the research passes): market-cap and P/E figures came from aggregator
// sites rather than a single authoritative feed (unlike the AMFI/Yahoo Finance reprice pipeline),
// so different aggregators returned meaningfully different numbers for the same ticker on the same
// day in a few cases — treat these as directionally-correct fundamentals for a one-time enrichment
// pass, not reprice-grade precision. K.P. Energy and Solex Energy (India micro-caps) have no formal
// sell-side analyst coverage — their growthOutlook is inferred from company guidance/results, not
// consensus, and growthBasis says so explicitly. Micron's multi-year growth figures are genuinely
// unfindable (its current earnings recovery off a depressed cyclical trough makes any single CAGR
// misleading) — left null rather than guessed, same for a few forward P/Es.

export const INSTRUMENT_RESEARCH = {
  // ---- Indian direct stocks ----
  inst_reliance: {
    instrument_id: 'inst_reliance', marketCapTier: 'Large', marketCapUsdBn: 175.4, country: 'India',
    peRatioTTM: 22.5, peRatioForward: 20.0,
    growthOutlook: { y2: 0.13, y3: 0.125, y5: 0.10 },
    growthBasis: 'Analyst consensus (Simply Wall St / Yahoo Finance) — FY27 consensus EPS ~₹64.41 (+17% YoY); EPS/earnings forecast ~12.5-13%/yr next 3yr; 5yr extrapolated with deceleration typical of a large diversified conglomerate.',
    keyRisks: ['Refining/petrochemical margins are cyclical, tied to global crack spreads and crude prices', 'Jio faces regulatory/spectrum-cost exposure and must execute on ARPU growth and 5G/FWA monetization', 'Reliance Retail growth depends on discretionary consumer spending', 'Large, capital-intensive new-energy bets (green hydrogen, solar giga-factories) with long, uncertain payback'],
    thesisNote: "India's largest listed company, spanning oil-to-chemicals refining/petrochemicals, telecom (Jio), and organized retail (Reliance Retail) — combining legacy energy cash flows with faster-growing digital/consumer businesses and heavy new-energy manufacturing investment.",
    source: 'Screener.in; GuruFocus; Simply Wall St; Yahoo Finance analyst estimates; stockanalysis.com', asof: '2026-09-26',
  },
  inst_hdfc_bank_stock: {
    instrument_id: 'inst_hdfc_bank_stock', marketCapTier: 'Large', marketCapUsdBn: 118.3, country: 'India',
    peRatioTTM: 15.0, peRatioForward: 17.4,
    growthOutlook: { y2: 0.12, y3: 0.13, y5: 0.14 },
    growthBasis: 'Analyst consensus (Simply Wall St) — earnings ~11.7%/yr, EPS ~12.2%/yr; brokerage commentary flags near-term NIM pressure post-HDFC Ltd merger easing into FY27-28; 5yr extrapolated assuming merger synergies mature.',
    keyRisks: ['NIM compression from the post-merger mortgage-heavy balance sheet in a falling-rate cycle', 'Slower system-wide credit demand and CASA competition from PSU banks/NBFCs', 'Asset-quality risk in unsecured retail and MSME lending', 'Integration risk from the 2023 HDFC Ltd merger still working through the book'],
    thesisNote: "India's largest private-sector bank by assets, now carrying a large mortgage book after its 2023 merger with parent HDFC Ltd — widely treated as a bellwether for Indian credit growth and urban consumption.",
    source: 'Screener.in; GuruFocus; Simply Wall St; Axis Direct research note (Jul 2026); tickertape.in', asof: '2026-09-26',
  },
  inst_kp_energy: {
    instrument_id: 'inst_kp_energy', marketCapTier: 'Micro', marketCapUsdBn: 0.16, country: 'India',
    peRatioTTM: 10.9, peRatioForward: null,
    growthOutlook: { y2: 0.35, y3: 0.25, y5: null },
    growthBasis: 'No formal sell-side analyst coverage. Inferred from company FY27 guidance (revenue growth guidance cut to 30-40% YoY on right-of-way/land-access delays in Gujarat) and Q1 FY27 results (revenue +126-137% YoY, gross margin compressed to ~20% from 28%). Low-confidence, company-guidance-derived, not consensus; y5 not estimable.',
    keyRisks: ['~50% of its ~₹2,250cr order book is with related party KPI Green Energy — related-party concentration/governance risk', 'Execution risk from right-of-way/land-access disputes and farmer protests in Gujarat (already forced a guidance cut)', 'Sharp gross-margin compression (28%→~20% in one quarter) from rising input/logistics/right-of-way costs', 'Very small market cap and thin liquidity with minimal independent analyst coverage'],
    thesisNote: 'A Gujarat-based EPC contractor and independent power producer focused on utility-scale wind power — site acquisition, permitting, EPC, and balance-of-plant work, plus its own wind/solar IPP assets, riding India\'s renewable build-out with a sizeable regional order book.',
    source: 'Screener.in; GuruFocus; Whalesbook; Multibagg.ai; Sahi.com', asof: '2026-09-26',
  },
  inst_varun_beverages: {
    instrument_id: 'inst_varun_beverages', marketCapTier: 'Large', marketCapUsdBn: 14.43, country: 'India',
    peRatioTTM: 47.0, peRatioForward: 42.0,
    growthOutlook: { y2: 0.18, y3: 0.20, y5: 0.17 },
    growthBasis: 'Analyst consensus (Simply Wall St) — revenue ~12%/yr next 3yr (in line with industry); a separate estimate cites ~80% cumulative 3yr EPS growth (~22% CAGR); blended to a mid-range figure since sources diverge. 5yr extrapolated with deceleration as the Africa expansion matures.',
    keyRisks: ['Rich valuation (~45-47x trailing P/E) leaves little room for disappointment', 'Weather/seasonality-dependent volumes and monsoon variability', 'Concentration risk as a bottling franchisee dependent on its PepsiCo master franchise agreement', 'Execution risk in newer international markets (Africa) plus input-cost inflation and rising sugar-tax/health-regulation risk'],
    thesisNote: "India's largest PepsiCo franchise bottler, manufacturing/distributing carbonated soft drinks, juices, and packaged water across India and an expanding international footprint including Africa — a volume-growth consumer-staples play on rising per-capita beverage consumption.",
    source: 'Screener.in; GuruFocus; Simply Wall St; Univest.in', asof: '2026-09-26',
  },
  inst_tata_power: {
    instrument_id: 'inst_tata_power', marketCapTier: 'Large', marketCapUsdBn: 12.2, country: 'India',
    peRatioTTM: 31.3, peRatioForward: 26.67,
    growthOutlook: { y2: 0.12, y3: 0.14, y5: 0.12 },
    growthBasis: 'Analyst consensus (Simply Wall St) — operating income CAGR ~16%/yr over 4yr, revenue CAGR ~7%/yr; company guiding 2.5-2.7 GW/yr renewable additions through FY27-28 with 10-15% margin improvement. EPS CAGR blended/extrapolated from these inputs, not a single quoted EPS consensus.',
    keyRisks: ['Regulatory/discom counterparty risk in power distribution and generation', 'Execution risk scaling 2.5+ GW/yr of new renewable capacity while maintaining project IRRs', 'Coal-cost and fuel-price exposure in legacy thermal generation', 'Capital-intensive growth plan sensitive to the interest-rate cycle'],
    thesisNote: 'A diversified Indian power utility spanning thermal and renewable generation, transmission, and distribution — aggressively pivoting growth capex toward utility-scale solar and wind alongside its legacy regulated utility base.',
    source: 'Screener.in; GuruFocus; Simply Wall St; Investing.com Q1 FY27 earnings call; Business Today', asof: '2026-09-26',
  },
  inst_bharti_airtel: {
    instrument_id: 'inst_bharti_airtel', marketCapTier: 'Large', marketCapUsdBn: 126.87, country: 'India',
    peRatioTTM: 40.7, peRatioForward: 30.8,
    growthOutlook: { y2: 0.20, y3: 0.18, y5: 0.15 },
    growthBasis: 'Brokerage estimates (JM Financial) — FY27E EPS ~₹46.6 rising to FY28E ~₹59.8 (~28% YoY), management guiding ~13% EBITDA CAGR FY23-28 on ARPU premiumisation (medium-term target ~₹300) and 5G monetization; 5yr extrapolated with deceleration as ARPU gains normalize.',
    keyRisks: ['Elevated net debt from spectrum payments and capex, sensitive to interest-rate moves', 'Renewed price-war risk if Vodafone Idea stabilizes or Jio pushes aggressive tariffs', 'Regulatory liabilities (AGR dues, spectrum obligations) remain a balance-sheet overhang', 'Consensus assumes continued ARPU hikes and 5G monetization execute as planned', 'Airtel Africa carries its own FX/macro volatility'],
    thesisNote: "India's second-largest telecom operator and a major pan-African telecom player via Airtel Africa, pursuing a premiumisation strategy to lift ARPU while monetizing 5G in a now largely two-and-a-half-player Indian telecom market.",
    source: 'GuruFocus; JM Financial research note; Univest.in; Sharekhan research (Feb 2026)', asof: '2026-09-26',
  },
  inst_uno_minda: {
    instrument_id: 'inst_uno_minda', marketCapTier: 'Mid', marketCapUsdBn: 7.36, country: 'India',
    peRatioTTM: 67.0, peRatioForward: null,
    growthOutlook: { y2: 0.20, y3: 0.20, y5: 0.17 },
    growthBasis: 'Brokerage estimates (via Univest/Trendlyne) — FY26-28 CAGR guided at revenue ~19%, EBITDA ~20%, PAT ~23%; 5yr extrapolated with deceleration as an auto-components supplier tied to the broader auto cycle. Forward P/E consensus not found — left null rather than derived speculatively.',
    keyRisks: ['Rich valuation (~65-75x trailing P/E across sources) prices in sustained growth execution', 'Customer concentration among a handful of large 2W/PV OEMs and exposure to the cyclical Indian auto sector', 'EV transition risk — product mix must keep shifting toward EV-relevant components', 'Raw-material (aluminium, plastics, electronics) cost volatility and execution risk on the guided FY28 export ramp-up'],
    thesisNote: 'A diversified Indian auto-components manufacturer supplying switches, lighting, acoustics, alloy wheels, and seating systems to 2W/PV OEMs — positioned on rising content-per-vehicle and a growing exports/EV-component mix.',
    source: 'Screener.in; GuruFocus; Univest.in; MoneyWorks4Me', asof: '2026-09-26',
  },
  inst_eternal: {
    instrument_id: 'inst_eternal', marketCapTier: 'Large', marketCapUsdBn: 32.79, country: 'India',
    peRatioTTM: 670.2, peRatioForward: null,
    growthOutlook: { y2: 0.45, y3: 0.35, y5: 0.25 },
    growthBasis: 'Company guidance + estimates — FY26 group revenue guided +163% YoY (Blinkit +650% YoY); Goldman Sachs estimates Blinkit GOV CAGR ~53% FY24-27; management guides Blinkit to ~60% CAGR over 3yr, targeting $20bn B2C NOV by FY28. Blended/decelerated at whole-company level (food delivery grows far slower than quick commerce); lower-confidence beyond the ~3yr guided horizon.',
    keyRisks: ['Profitability still nascent — extremely high trailing P/E (500-800x+ depending on source) reflects a very thin earnings base', 'Intense, well-funded competition in quick commerce (Swiggy Instamart, Zepto, newer entrants) in a still cash-burning market', 'Regulatory risk around gig-worker classification and dark-store zoning/licensing', 'Execution risk scaling thousands of dark stores profitably', 'Valuation prices in years of uninterrupted hypergrowth'],
    thesisNote: "India's largest food-delivery platform (Zomato), rebranded Eternal, increasingly driven by quick-commerce arm Blinkit which management expects to become the majority of group revenue.",
    source: 'Screener.in; GuruFocus; S&P Global Market Intelligence; Business Standard; Goldman Sachs estimates as reported', asof: '2026-09-26',
  },
  inst_solex_energy: {
    instrument_id: 'inst_solex_energy', marketCapTier: 'Micro', marketCapUsdBn: 0.078, country: 'India',
    peRatioTTM: 9.7, peRatioForward: null,
    growthOutlook: { y2: 0.67, y3: 0.50, y5: 0.35 },
    growthBasis: 'No formal sell-side coverage. Inferred from company guidance: FY26 revenue +143.9% YoY to ~₹1,621cr; company targets >₹4,500cr revenue by FY28 ("Vision 2030": 10GW module/cell/BESS capacity, ~$1.5bn capex). y3/y5 heavily decelerated as the capex program matures — all low-confidence, guidance-based, not independent consensus.',
    keyRisks: ['Extremely small market cap (~$78M) and thin liquidity with essentially no independent analyst coverage', 'Vision 2030 capex (~$1.5bn) is very large relative to current size — significant execution/funding/dilution risk', 'Commodity/input price risk (polysilicon, wafers) and margin exposure to global solar module oversupply, particularly from Chinese manufacturers', 'Heavy dependence on Indian policy support (PLI scheme, ALMM list, import duties) for competitiveness'],
    thesisNote: 'A Gujarat-based solar PV module/cell manufacturer, also active in solar EPC, with an aggressive multi-gigawatt capacity expansion plan (cells, modules, battery storage, wafers/ingots) to become a vertically integrated Indian solar manufacturer.',
    source: 'Screener.in; SolarQuarter; PV Magazine; Sahi.com; Tradebrains.in', asof: '2026-09-26',
  },
  inst_dixon_tech: {
    instrument_id: 'inst_dixon_tech', marketCapTier: 'Mid', marketCapUsdBn: 8.99, country: 'India',
    peRatioTTM: 43.0, peRatioForward: 72.4,
    growthOutlook: { y2: 0.22, y3: 0.22, y5: 0.18 },
    growthBasis: 'Analyst consensus (Simply Wall St) — revenue ~22%/yr next 3yr vs ~15%/yr for the Indian consumer-durables industry; 5yr extrapolated with deceleration as the PLI-driven mobile-manufacturing growth phase matures. Forward P/E above trailing P/E is unusual — likely reflects expected near-term margin dilution as Dixon expands into lower-margin categories (laptops/IT hardware).',
    keyRisks: ['Thin contract-manufacturing margins, heavily dependent on OEM/ODM volume/mix — vulnerable to loss of a large brand customer', "Dependence on continuity of India's PLI scheme and related government policy", 'Rich valuation (40-70x+ P/E) prices in continued high growth and margin expansion', 'Execution risk diversifying into newer categories (laptops, IT hardware, displays, EV components)'],
    thesisNote: "India's largest contract electronics manufacturer (EMS/ODM), assembling mobile phones, consumer electronics, home appliances, and lighting for major domestic/global brands — a principal beneficiary of India's PLI-driven electronics manufacturing push.",
    source: 'Screener.in; GuruFocus; Simply Wall St; stockanalysis.com; companiesmarketcap.com', asof: '2026-09-26',
  },

  // ---- US mega-cap / semis ----
  inst_nvda: {
    instrument_id: 'inst_nvda', marketCapTier: 'Mega', marketCapUsdBn: 5430, country: 'United States',
    peRatioTTM: 28.46, peRatioForward: 18.68,
    growthOutlook: { y2: null, y3: 0.229, y5: null },
    growthBasis: 'FY2027 consensus EPS +95.1%/revenue +90.6% (StockAnalysis.com, 53 analysts) reflects near-term AI-buildout base effect, not a steady-state y2 figure; ~3yr forward annualized EPS growth 22.9%/yr (Simply Wall St) used as y3 proxy. FY2028/29 and true 5yr figures are paywalled, not found free.',
    keyRisks: ['Customer concentration — a small number of hyperscalers account for an outsized share of data-center GPU revenue', 'US export controls/China restrictions on advanced AI chips', 'Rising competition from AMD and custom in-house AI ASICs (Google TPU, Amazon Trainium, Broadcom-built silicon)', 'Capex-cycle risk — reliant on hyperscalers sustaining AI infrastructure spending'],
    thesisNote: 'NVIDIA designs GPUs and the CUDA software ecosystem dominating AI training/inference compute, alongside gaming, professional visualization, and automotive chips — data-center AI has grown to the large majority of revenue.',
    source: 'StockAnalysis.com; Simply Wall St; Yahoo Finance', asof: '2026-09-26',
  },
  inst_msft: {
    instrument_id: 'inst_msft', marketCapTier: 'Mega', marketCapUsdBn: 3830, country: 'United States',
    peRatioTTM: 28.76, peRatioForward: 26.12,
    growthOutlook: { y2: null, y3: 0.143, y5: null },
    growthBasis: 'FY2027 consensus revenue +17.8%/EPS +14.4% (StockAnalysis.com, 50 analysts) is essentially a y1 figure; ~3yr forward annualized EPS growth 14.3%/yr, revenue 15.2%/yr (Simply Wall St) used as y3 proxy. No public 5yr figure found.',
    keyRisks: ['Antitrust/regulatory scrutiny in the US and EU (cloud bundling, competition practices)', 'Very large AI capex spend (Azure/OpenAI infrastructure) pressuring free cash flow margins', 'Cloud competition from AWS and Google Cloud on price and AI-workload share', 'Deep financial/strategic dependency on its OpenAI partnership'],
    thesisNote: 'A diversified software and cloud infrastructure company spanning Azure, Microsoft 365, Windows, LinkedIn, and gaming, with Copilot AI features embedded across its product lines via its OpenAI partnership.',
    source: 'StockAnalysis.com; Simply Wall St', asof: '2026-09-26',
  },
  inst_aapl: {
    instrument_id: 'inst_aapl', marketCapTier: 'Mega', marketCapUsdBn: 4980, country: 'United States',
    peRatioTTM: 39.13, peRatioForward: 37.05,
    growthOutlook: { y2: null, y3: 0.10, y5: null },
    growthBasis: 'FY2026 consensus revenue +14.8%/EPS +18.4% (StockAnalysis.com, 40 analysts) is a y1 figure; ~3yr forward annualized EPS growth ~9.7-10.6%/yr (Simply Wall St/ChartMill, averaged) used as y3 proxy. No public 5yr figure found.',
    keyRisks: ['iPhone and Greater China revenue concentration and demand cyclicality', 'Regulatory pressure on App Store fees/practices (EU DMA, US antitrust litigation)', 'Perceived slower AI feature differentiation vs. Google/Microsoft/Samsung', 'Manufacturing supply-chain concentration in China and Taiwan'],
    thesisNote: 'Apple designs and sells a hardware ecosystem centered on the iPhone alongside Mac, iPad, and wearables, with a fast-growing Services segment now contributing a meaningful share of profit.',
    source: 'StockAnalysis.com; Simply Wall St; ChartMill.com', asof: '2026-09-26',
  },
  inst_googl: {
    instrument_id: 'inst_googl', marketCapTier: 'Mega', marketCapUsdBn: 4210, country: 'United States',
    peRatioTTM: 17.26, peRatioForward: 25.72,
    growthOutlook: { y2: 0.2332, y3: null, y5: 0.1564 },
    growthBasis: 'y2 = FY2027 consensus revenue growth 23.3% (StockAnalysis.com, 51 analysts). y5 = Zacks "3-5 year" EPS long-term growth consensus, 15.64%. EPS-based multi-year data was internally inconsistent (a modeled FY2027 EPS decline vs a large FY2026 jump, likely a one-time-item base effect), so revenue was substituted for EPS at y2.',
    keyRisks: ['Active US DOJ antitrust litigation (search distribution, ad-tech) with potential structural remedies', 'AI chatbots as a long-term substitution risk to search-based advertising', 'Very large and rising capex intensity for AI/cloud infrastructure', 'EU regulatory scrutiny (DMA, ongoing competition cases)'],
    thesisNote: "Alphabet is Google's parent, dominant in search and search advertising, with YouTube, Google Cloud, and early-stage bets (Waymo) as its other major segments.",
    source: 'StockAnalysis.com; Zacks', asof: '2026-09-26',
  },
  inst_meta: {
    instrument_id: 'inst_meta', marketCapTier: 'Mega', marketCapUsdBn: 1910, country: 'United States',
    peRatioTTM: 28.32, peRatioForward: 23.27,
    growthOutlook: { y2: 0.2057, y3: null, y5: 0.183 },
    growthBasis: 'y2 = FY2027 consensus revenue growth ~20.6% (StockAnalysis.com). y5 = Zacks "3-5 year" EPS long-term growth consensus, 18.3% (vs. S&P 500 average ~12.3% per the same source). FY2026 EPS growth consensus was unusually low (4.5%) due to heavy current-year Reality Labs/AI investment expensing, so EPS wasn\'t used for y2.',
    keyRisks: ['Very large, expanding capex on AI infrastructure and Reality Labs (AR/VR) with uncertain near-term ROI', 'Advertising-revenue concentration and privacy-regulation exposure (EU DMA/GDPR, platform tracking rules)', 'Active FTC antitrust case alleging historical monopolization via acquisitions', 'Competitive pressure from TikTok and other short-form video platforms'],
    thesisNote: 'Meta operates Facebook, Instagram, and WhatsApp, monetized primarily through digital advertising, alongside Reality Labs, its AR/VR hardware and AI research division.',
    source: 'StockAnalysis.com; Zacks', asof: '2026-09-26',
  },
  inst_mu: {
    instrument_id: 'inst_mu', marketCapTier: 'Mega', marketCapUsdBn: 1220, country: 'United States',
    peRatioTTM: 24.42, peRatioForward: 7.38,
    growthOutlook: { y2: null, y3: null, y5: null },
    growthBasis: "Not populated — Micron's earnings are recovering sharply off a 2023-2024 cyclical memory-trough into an AI/HBM-driven upcycle (FY2026 consensus revenue +247.8%, EPS +787.5%, StockAnalysis.com), making any single steady-state CAGR off that depressed base misleading. No reliable, free multi-year consensus CAGR was found — a genuine gap, not guessed.",
    keyRisks: ['Extreme cyclicality — DRAM/NAND pricing swings between severe oversupply and shortage', 'Very high capital intensity (fab construction/equipment) relative to revenue', 'Customer concentration among a small number of large buyers (hyperscalers, GPU/AI accelerator makers)', 'Intense competition from Samsung and SK Hynix, plus US-China trade/export-restriction exposure'],
    thesisNote: 'Micron manufactures memory and storage semiconductors — DRAM and NAND flash, including high-bandwidth memory (HBM) used in AI accelerators — serving PC, mobile, data-center, and automotive/industrial end markets.',
    source: 'StockAnalysis.com', asof: '2026-09-26',
  },
  inst_avgo: {
    instrument_id: 'inst_avgo', marketCapTier: 'Mega', marketCapUsdBn: 1680, country: 'United States',
    peRatioTTM: 45.03, peRatioForward: 20.38,
    growthOutlook: { y2: 0.6624, y3: null, y5: 0.33 },
    growthBasis: 'y2 = FY2027 consensus EPS growth 66.24% (StockAnalysis.com, 50 analysts) — still elevated on ramping custom AI-ASIC demand, not steady-state. y5 = ~33%/yr forward annualized EPS growth (Simply Wall St; also cites ~33.7% earnings/~30.6% revenue per annum), used as a long-term proxy though not literally a 5yr-specific consensus figure.',
    keyRisks: ['Customer concentration — a large share of AI-related revenue tied to a small number of hyperscaler custom-silicon customers', 'Integration and customer-pricing-model execution risk from the 2023 VMware acquisition', 'Competition in custom AI silicon from Marvell and others', 'Cyclicality in core networking and broad semiconductor end markets'],
    thesisNote: 'Broadcom is a diversified semiconductor and infrastructure-software company, designing custom AI accelerator chips (ASICs) for large cloud customers and networking silicon, alongside enterprise software from its VMware acquisition.',
    source: 'StockAnalysis.com; Simply Wall St', asof: '2026-09-26',
  },

  // ---- Remaining US/foreign + RSU ----
  inst_mrvl: {
    instrument_id: 'inst_mrvl', marketCapTier: 'Mega', marketCapUsdBn: 230, country: 'United States',
    peRatioTTM: 85.7, peRatioForward: 55.9,
    growthOutlook: { y2: 0.30, y3: 0.29, y5: 0.20 },
    growthBasis: 'Revenue CAGR, analyst consensus — driven by AI data-center custom silicon and optical interconnect demand.',
    keyRisks: ['Customer concentration in a small number of hyperscaler/cloud custom-silicon programs', 'Intense competition from Broadcom, in-house hyperscaler ASIC teams, and Nvidia', 'Valuation (>2x sector average P/E) leaves little room for execution missteps', 'Cyclicality of semiconductor/AI capex spending'],
    thesisNote: 'Marvell supplies custom ASICs, networking, and optical-interconnect silicon mainly for AI data centers and cloud hyperscalers — growth closely tied to a handful of large customers\' AI infrastructure capex cycles.',
    source: 'stockanalysis.com; gurufocus.com; simplywall.st; companiesmarketcap.com', asof: '2026-09-26',
  },
  inst_now: {
    instrument_id: 'inst_now', marketCapTier: 'Large', marketCapUsdBn: 145, country: 'United States',
    peRatioTTM: 62.0, peRatioForward: 27.5,
    growthOutlook: { y2: 0.20, y3: 0.185, y5: 0.16 },
    growthBasis: 'Subscription revenue CAGR, company guidance + analyst consensus.',
    keyRisks: ['Intense competition from Microsoft (bundling) and emerging agentic-AI entrants', 'Seat-based pricing faces a structural headwind as AI reduces required headcount per customer', 'Shift toward consumption-based AI pricing adds revenue unpredictability and inference-cost margin pressure', 'Still-elevated valuation multiple relative to broader software peers'],
    thesisNote: 'ServiceNow provides cloud-based enterprise workflow and IT service management software, now expanding into AI-driven "agentic" automation across IT, HR, and customer service.',
    source: 'stockanalysis.com; gurufocus.com; tradingeconomics.com; simplywall.st', asof: '2026-09-26',
  },
  inst_vxus: {
    instrument_id: 'inst_vxus', marketCapTier: null, country: 'Diversified ex-US',
    peRatioTTM: null, peRatioForward: null, growthOutlook: null,
    growthBasis: 'Diversified ex-US developed+emerging equity index fund tracking the FTSE Global All Cap ex US Index — no single-name growth figure applies. See fund-holdings.js for its real top-10 look-through holdings.',
    regionWeights: { europe: 0.34, japan: 0.155, emergingMarkets: 0.21, otherDeveloped: 0.295 },
    expenseRatio: 0.0005,
    keyRisks: ['Currency risk — returns are affected by moves in underlying local currencies (EUR, JPY, GBP, EM currencies, etc.)', 'Geopolitical and regulatory risk spread across ~48 countries, including EM governance/liquidity differences', 'Country/sector composition drifts over time with index rebalancing'],
    thesisNote: 'VXUS is a broad, low-cost index ETF giving exposure to thousands of companies across developed and emerging markets outside the US in a single fund, tracking the FTSE Global All Cap ex US Index.',
    source: 'advisors.vanguard.com; aaii.com; marketxls.com (region weights, third-party approximation)', asof: '2026-09-26',
  },
  inst_tsm: {
    instrument_id: 'inst_tsm', marketCapTier: 'Mega', marketCapUsdBn: 2000, country: 'Taiwan',
    peRatioTTM: 30.0, peRatioForward: 22.0,
    growthOutlook: { y2: 0.30, y3: 0.25, y5: 0.175 },
    growthBasis: 'Revenue/EPS CAGR, analyst consensus — AI accelerator (CoWoS) demand-driven near-term, deceleration flagged by some analysts for 2028-29.',
    keyRisks: ['Geopolitical: Taiwan Strait / cross-strait tension with China', "Heavy dependence on a concentrated set of hyperscaler/AI customers' capex cycles", 'Margin pressure from 2nm ramp and overseas fab buildout (Arizona, Japan)', 'Analyst-flagged uncertainty over AI capex durability into 2028-2029'],
    thesisNote: "TSMC is the world's largest dedicated semiconductor foundry, manufacturing the most advanced chips (down to 2nm) for customers including Nvidia, Apple, and AMD. Headquartered in Hsinchu, Taiwan — the USD NYSE listing is an ADR, not evidence of US domicile.",
    source: 'gurufocus.com; stockanalysis.com; simplywall.st; company HQ per TSMC/company sites', asof: '2026-09-26',
  },
  inst_amd: {
    instrument_id: 'inst_amd', marketCapTier: 'Mega', marketCapUsdBn: 950, country: 'United States',
    peRatioTTM: 158.3, peRatioForward: 45.0,
    growthOutlook: { y2: 0.35, y3: 0.30, y5: 0.22 },
    growthBasis: 'Revenue CAGR, analyst consensus — driven primarily by MI300/MI400 AI GPU ramp; FY2026 revenue guided/forecast ~$48.4bn.',
    keyRisks: ["Nvidia's CUDA software ecosystem moat/lock-in remains the largest competitive risk", 'Potential hyperscaler capex digestion in 2027-2028 could compress AI GPU orders', 'US-China export controls on advanced AI chips', 'Execution risk on MI400 ramp and closing the software/utilization gap versus Nvidia'],
    thesisNote: 'AMD designs CPUs and GPUs for PCs, servers, and AI data centers, positioning itself as the primary alternative to Nvidia in AI accelerators through its MI300/MI400 GPU lines.',
    source: 'stockanalysis.com; gurufocus.com; simplywall.st; SEC 8-K FY2026 filings', asof: '2026-09-26',
  },
  inst_alab: {
    instrument_id: 'inst_alab', marketCapTier: 'Large', marketCapUsdBn: 62.5, country: 'United States',
    peRatioTTM: 200.0, peRatioForward: 93.0,
    growthOutlook: { y2: 0.45, y3: 0.24, y5: 0.20 },
    growthBasis: 'Revenue CAGR, analyst consensus — hyper-growth off a small base (2026 revenue ~$1.35bn), expected to decelerate toward semiconductor-industry-average growth by year 5.',
    keyRisks: ['Extreme customer concentration — roughly 3 customers make up ~86% of revenue (largest single customer ~29%)', 'Competition from Broadcom, Marvell, Rambus, and possible in-house hyperscaler alternatives', 'Very high valuation (~90x+ forward P/E) already prices in continued flawless execution', 'Reliance on international (Asia-based) manufacturing exposes it to trade-restriction risk'],
    thesisNote: 'Astera Labs designs semiconductor connectivity chips (retimers, active cables, fabric switches) linking GPUs, CPUs, and memory inside AI data-center racks — a small but fast-growing layer of AI infrastructure.',
    source: 'stockanalysis.com; gurufocus.com; fool.com; simplywall.st', asof: '2026-09-26',
  },
  inst_asml: {
    instrument_id: 'inst_asml', marketCapTier: 'Mega', marketCapUsdBn: 676, country: 'Netherlands',
    peRatioTTM: 55.7, peRatioForward: 29.0,
    growthOutlook: { y2: 0.15, y3: 0.16, y5: 0.13 },
    growthBasis: 'Revenue CAGR, company guidance (2026 revenue guided €36-40bn) + analyst consensus — EUV/High-NA lithography demand for AI-chip fabs.',
    keyRisks: ['China export restrictions curbing a historically significant revenue source (now ~19% of quarterly revenue and shrinking)', 'Sole-supplier concentration cuts both ways — a slowdown at a few large customers (TSMC, Samsung, Intel) hits ASML disproportionately', 'Extremely high cost/complexity/lead-time of EUV and High-NA systems creates lumpy order timing', 'Broader AI-capex-cycle sensitivity beyond 2027-2028, per some analysts'],
    thesisNote: 'ASML is the sole global supplier of EUV lithography machines, the equipment required to manufacture the most advanced logic chips — an effective monopoly at a critical semiconductor-supply-chain chokepoint. Headquartered in Veldhoven, Netherlands — the USD Nasdaq listing (NY Registry Shares) does not make it a US company.',
    source: 'gurufocus.com; stockanalysis.com; cnbc.com; asml.com company site', asof: '2026-09-26',
  },
  inst_abinbev_rsu: {
    instrument_id: 'inst_abinbev_rsu', marketCapTier: 'Large', marketCapUsdBn: 151.5, country: 'Belgium',
    peRatioTTM: 21.9, peRatioForward: 18.0,
    growthOutlook: { y2: 0.06, y3: 0.06, y5: 0.05 },
    growthBasis: 'Revenue/EBITDA CAGR, company guidance (2026 EBITDA growth guided 4-8%) + analyst consensus — premiumization-led, mature global beer-volume growth.',
    keyRisks: ['Global beer volume softness / shifting consumer preferences (moderation trends, spirits/craft competition)', 'Still-elevated leverage (~3.3x net debt/EBITDA) despite an active deleveraging program', 'FX translation risk given a large Brazil/Latin America/Africa revenue mix', 'Consumer spending sensitivity to inflation/economic softness, particularly in the US'],
    thesisNote: "The world's largest brewer by volume — Budweiser, Corona (outside the Americas), Stella Artois, and dozens of local brands across 100+ countries. Legally domiciled in Belgium (Leuven/Brussels) — the USD NYSE ADR (ticker BUD) does not make it a US company.",
    source: 'stockanalysis.com; tikr.com; ab-inbev company filings', asof: '2026-09-26',
  },

  // ---- Real assets ----
  inst_hdfc_gold_etf: {
    instrument_id: 'inst_hdfc_gold_etf', marketCapTier: null, country: 'India (commodity-tracking ETF)',
    peRatioTTM: null, peRatioForward: null,
    growthOutlook: { y2: 0.08, y3: 0.065, y5: 0.05 },
    growthBasis: 'Gold price consensus, not an earnings-based figure. Spot gold ~$4,284/oz (2026-09-26). Bank targets vary widely: Goldman Sachs ~$5,400/oz by end-2027; JPMorgan flags $6,300/oz as a 2027 upside case; Bernstein\'s long-run 2030 target $5,600/oz; World Bank a bearish outlier at ~$3,375/oz for 2027. Figures above are a rough, decelerating-growth midpoint across these, not a tight consensus.',
    keyRisks: ['Real interest rate / Fed policy sensitivity — higher-for-longer rates are the main bear case', 'USD strength/weakness', 'Central-bank buying pace could slow after a multi-year record run', 'Forecast dispersion itself is a risk signal — bull ($6,300) and bear ($3,375) 2027 cases differ by ~90%'],
    thesisNote: 'An ETF tracking domestic gold prices — held as portfolio ballast that typically moves independently of equity markets.',
    source: 'JPMorgan Global Research; Goldman Sachs; Bernstein; World Bank Commodity Markets Outlook; World Gold Council 2025 Central Bank Gold Reserves Survey', asof: '2026-09-26',
  },
};
