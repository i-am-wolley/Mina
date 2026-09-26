// REAL RESEARCH DATA — one-time deep-analysis pass, 2026-09-26. Sector growth drivers/risks
// gathered via WebSearch against real sources (WSTS/SIA, Gartner, IEA, ICRA, IMF, industry
// research houses, government budget documents, etc.) — never invented. Every entry carries
// `source`/`asof`. See `Base resources/deep-analysis-methodology.md` for the full method.
//
// SECTOR_PARENT_MAP normalizes every sub-sector string that appears anywhere in this app —
// both the direct `sector` field on instruments.js entries (e.g. "Semiconductors (Memory)")
// and the sector strings that show up inside fund-holdings.js's look-through top10 (e.g.
// "Private Banks", "PSU Banks") — onto one of the parent buckets keyed in SECTOR_OUTLOOK below.
// parentSectorOf() (index.html) falls back to keyword matching for anything not explicitly
// listed here (a fund's long-tail holdings introduce sub-sector strings faster than they can
// all be enumerated) — see that function for the fallback rules. A sector with real exposure
// but no SECTOR_OUTLOOK entry still shows its real weight everywhere; it just won't get a
// growth-drivers/risks card, which is more honest than inventing one.

export const SECTOR_PARENT_MAP = {
  // Direct-stock/RSU sector strings (instruments.js)
  'Energy & Conglomerate': 'Energy & Diversified Conglomerates',
  'Financials (Banking)': 'Banking & Financials',
  'Renewable Energy (Wind)': 'Renewable Energy',
  'Renewable Energy (Solar)': 'Renewable Energy',
  'Consumer Staples (Beverages)': 'Consumer Staples',
  'Consumer Staples (Brewing)': 'Consumer Staples',
  'Utilities (Power)': 'Utilities (Power)',
  'Telecom': 'Telecom',
  'Auto Components': 'Auto Components',
  'Consumer Internet (Food-tech)': 'Consumer Internet / Food-tech',
  'Electronics Manufacturing (EMS)': 'Electronics Manufacturing Services (EMS)',
  'Semiconductors': 'Semiconductors',
  'Semiconductors (Memory)': 'Semiconductors',
  'Semiconductors (Foundry)': 'Semiconductors',
  'Semiconductors (Connectivity)': 'Semiconductors',
  'Semiconductor Equipment': 'Semiconductors',
  'Software & Cloud': 'Software & Cloud',
  'Software (SaaS)': 'Software & Cloud',
  'Consumer Electronics': 'Consumer Electronics',
  'Internet & Advertising': 'Internet & Digital Media',
  'Internet & Social Media': 'Internet & Digital Media',
  // Fund look-through sector strings (fund-holdings.js top10 entries)
  'Private Banks': 'Banking & Financials',
  'PSU Banks': 'Banking & Financials',
  'Small Finance Banks': 'Banking & Financials',
  'NBFC': 'Banking & Financials',
  'NBFC Holding Co': 'Banking & Financials',
  'Financial Holding Co': 'Banking & Financials',
  'Capital Markets': 'Banking & Financials',
  'Asset Management': 'Banking & Financials',
  'Insurance': 'Banking & Financials',
  'Banks': 'Banking & Financials',
  'Oil & Gas - Refining & Marketing': 'Energy & Diversified Conglomerates',
  'Telecom Services': 'Telecom',
  'Construction & Engineering': 'Industrials & Infrastructure',
  'Industrial Products': 'Industrials & Infrastructure',
  'Power Equipment': 'Industrials & Infrastructure',
  'Power Transmission': 'Utilities (Power)',
  'Power/Utilities': 'Utilities (Power)',
  'IT Services': 'Software & Cloud',
  'FMCG': 'Consumer Staples',
  'Fintech / Internet': 'Internet & Digital Media',
  'Internet / Technology': 'Internet & Digital Media',
  'Internet / Consumer Tech': 'Consumer Internet / Food-tech',
  'Technology Hardware': 'Consumer Electronics',
  'Healthcare Facilities': 'Healthcare & Pharma',
  'Pharmaceuticals': 'Healthcare & Pharma',
  'Pharma CDMO': 'Healthcare & Pharma',
  'Specialty Chemicals': 'Healthcare & Pharma',
  'Automobiles': 'Automobiles',
  'Automobiles - 2 Wheeler': 'Automobiles',
  'Realty': 'Real Estate',
  'Aerospace & Defense': 'Aerospace & Defense',
  'Mining': 'Metals & Mining',
  'Diversified / Conglomerate': 'Metals & Mining',
  'Tyres': 'Auto Components',
  'Semiconductor Equipment (look-through)': 'Semiconductors',
  'Cash equivalent / TREPS (not an equity holding)': 'Cash / Debt',
  'Cash equivalent': 'Cash / Debt',
};

export const SECTOR_OUTLOOK = {
  'Semiconductors': {
    growthDrivers: ['AI datacenter capex and HBM/accelerated-computing demand', 'Memory segment surge (DRAM/NAND pricing spike)', 'Cloud/hyperscaler capital spending'],
    risks: ['Extreme cyclicality (memory-led boom risks a bust phase)', 'Export-control/geopolitical exposure (US-China, Taiwan)', 'High capital intensity of fab buildout'],
    outlookNote: 'WSTS forecasts global semiconductor sales to reach $1.5T in 2026 (led by ~250% memory growth) and $1.9T in 2027, though the concentration in AI/memory raises real cyclicality risk.',
    source: 'WSTS Spring/Autumn 2026 forecast, endorsed by SIA', asof: '2026-09-01',
  },
  'Software & Cloud': {
    growthDrivers: ['Generative AI driving enterprise software refresh', 'Cloud IaaS/SaaS migration continuing', 'AI infrastructure software spend (~$230B in 2026, up from ~$60B)'],
    risks: ['AI infra spend concentrated in a few hyperscalers', 'Pricing-led growth (price increases, not just volume)', 'Slowing IT budget growth outside AI-linked categories'],
    outlookNote: 'Gartner forecasts enterprise software spend up ~14-15% in 2026 to over $1.4T, with SaaS growing ~19% and IaaS ~24.8%, generative AI as the primary accelerant.',
    source: 'Gartner IT Spending Forecast, July 2026', asof: '2026-07-27',
  },
  'Internet & Digital Media': {
    growthDrivers: ['Retail media and CTV/video ad growth', 'AI-optimized ad campaigns/targeting', 'Digital share of total ad spend still rising (69% in 2026)'],
    risks: ['Overall ad-spend growth slowing (5.0% in 2026 vs 5.8% in 2025)', 'Privacy/regulatory pressure on targeting', 'Platform concentration risk (few dominant players)'],
    outlookNote: 'Dentsu projects global ad spend growth slowing to 5.0% in 2026 (still outpacing GDP growth), with digital reaching ~$740B and continuing to take share.',
    source: 'Dentsu Global Ad Spend Forecast 2026', asof: '2026-01-01',
  },
  'Consumer Electronics': {
    growthDrivers: ['AI-enabled devices and connected ecosystems', 'Premiumization (value growth outpacing unit growth)', 'Supply-chain realignment favoring diversified manufacturing hubs'],
    risks: ['Severe memory (NAND/DRAM) cost shortage — component costs up 300%+ YoY', 'Smartphone unit shipments falling ~16.7% in 2026 to just over 1B units', 'Margin compression risk if higher prices dent demand'],
    outlookNote: 'Global consumer electronics revenue is projected near $1.03T in 2026; smartphone unit volumes are falling sharply but market value is still growing (+6.3%) as memory-driven price hikes offset lower shipments.',
    source: 'Statista Market Forecast; IDC Smartphone Market Insights', asof: '2026-09-01',
  },
  'Consumer Staples': {
    growthDrivers: ['Health/wellness-driven premiumization', 'Asia-Pacific consumption growth (fastest-growing region)', 'Sustainable packaging and AI-driven product innovation'],
    risks: ['Input-cost inflation (agri commodities, packaging)', 'Slower volume growth in mature developed markets', 'Currency/FX exposure for multinationals'],
    outlookNote: 'The global food & beverage market is projected to grow from $7.04T (2025) to $7.4T in 2026 (5.2% CAGR), reaching $9.31T by 2030; the global beer market (~$832B in 2025) is growing near 4.6% CAGR.',
    source: 'The Business Research Company Food and Beverages Global Market Report 2026; Knowledge Sourcing Global Beer Market', asof: '2026-01-01',
  },
  'Energy & Diversified Conglomerates': {
    growthDrivers: ['Natural gas demand from AI/data-center power generation', 'Diversified majors expanding into critical-minerals supply chains', 'Rising Henry Hub gas prices (~$3.90/MMBtu forecast for 2026, up from ~$2 in 2024)'],
    risks: ['Oil oversupply — IEA projects a global surplus approaching 4 million barrels/day in 2026', 'Crude prices projected to fall below breakeven levels for many producers', 'Capital discipline pressure amid margin compression'],
    outlookNote: "EIA and IEA data point to an oversupplied oil market in 2026 even as gas demand strengthens; integrated majors with diversified revenue and strong balance sheets are best positioned, per Deloitte's 2026 outlook.",
    source: 'U.S. EIA Short-Term Energy Outlook; IEA; Deloitte 2026 Oil and Gas Industry Outlook', asof: '2026-09-01',
  },
  'Banking & Financials': {
    growthDrivers: ['Non-food credit growth at a decade-plus high (~18.6% YoY as of June 2026)', 'Gold-loan and wholesale-lending momentum', 'Falling policy rates supporting credit demand'],
    risks: ['Below-normal monsoon risk to rural/agri-linked and unsecured loan books', 'Net interest margin compression from rate cuts and slower deposit growth', 'System-wide NPA could tick up from current multi-decadal lows'],
    outlookNote: 'ICRA maintains a Stable outlook on Indian banks for FY2026-27, citing comfortable capitalisation and GNPA at a multi-decadal low of ~1.8%, with system credit growth projected near 15-17.7% in FY27.',
    source: 'ICRA Indian Banking Sector Outlook; Moody\'s', asof: '2026-08-01',
  },
  'Renewable Energy': {
    growthDrivers: ["Solar PV set to overtake wind as the world's #2 renewable generation source in 2026", 'China-led capacity buildout (94% growth in solar generation 2026-2030)', 'Falling technology costs and continued policy support'],
    risks: ['Grid integration/curtailment bottlenecks as renewable share rises fast', 'Policy/subsidy dependence in some markets', 'Supply-chain concentration in China for panels/components'],
    outlookNote: 'The IEA projects global solar and wind generation to grow 20% in 2026 and average 15%/year through 2030, with renewables overall growing about 8%/year.',
    source: 'IEA Electricity 2026 / Renewables 2025 reports', asof: '2026-01-01',
  },
  'Auto Components': {
    growthDrivers: ['India EV localization and battery manufacturing scale-up (targeting 100 GWh capacity by early 2026)', 'Global supply-chain diversification away from China benefiting Indian exporters', 'Shift toward electronic components (power electronics, BMS, ADAS)'],
    risks: ['Import-duty and tariff policy changes (India limiting duty exemptions, US/EU tariffs on Chinese EVs reshaping trade flows)', 'Capital intensity of EV transition', 'Global auto demand cyclicality'],
    outlookNote: "India's auto component industry posted ₹7.6 trillion turnover in FY26 (+12.7%), with exports projected to reach $70-100B by FY30 as global OEMs diversify supply chains toward India.",
    source: 'IBEF; Business Standard (citing ACMA data)', asof: '2026-07-01',
  },
  'Utilities (Power)': {
    growthDrivers: ['Data-center power demand up 27% in 2026 to 132 GW globally, nearly tripling by 2030', "Electricity demand growth 50% above the prior decade's average pace", 'Record utility capex (~$1.3T for 2026-2030 in the US alone)'],
    risks: ['Grid capacity/transmission bottlenecks lagging demand growth', 'Regulatory lag on cost recovery for large capex programs', 'Concentration risk if AI/data-center demand growth disappoints'],
    outlookNote: 'The IEA and Gartner both point to a structural step-up in power demand through 2030 driven by data centers, EVs, and industrial electrification.',
    source: 'IEA Electricity 2026; Gartner; S&P Global', asof: '2026-06-10',
  },
  'Telecom': {
    growthDrivers: ['5G becoming the dominant mobile standard from 2026 (surpassing 3 billion connections)', 'Fixed-wireless access (FWA) and fiber (FTTH) broadband expansion', 'Enterprise/IoT and network-as-a-service revenue diversification'],
    risks: ['Slow overall revenue CAGR (~2.8%) despite heavy 5G/fiber capex', 'Intense price competition in mature markets', 'High capital intensity with uncertain monetization of 5G use cases'],
    outlookNote: "PwC's Global Telecom Outlook projects service revenue growing from ~$1.15T (2024) to ~$1.32T by 2029 (~2.8% CAGR) — steady but unspectacular.",
    source: 'PwC Global Telecom Outlook 2025-2029; GSMA Intelligence', asof: '2026-01-01',
  },
  'Consumer Internet / Food-tech': {
    growthDrivers: ['Rapid Tier-2/3 India city expansion and rising smartphone/digital-payment penetration', 'Quick-commerce dark-store network expansion', '10-minute delivery format diversification'],
    risks: ['Heavy cash-burn/discounting competition (Zomato/Eternal vs Swiggy vs Zepto/JioMart)', 'Thin or negative unit economics in quick commerce', 'Regulatory scrutiny of gig-worker and discounting practices'],
    outlookNote: "India's online food delivery market is projected to grow from ~$55.6B (2025) to ~$67.9B (2026); quick commerce is forecast to grow at a 17.6% CAGR through 2029.",
    source: 'IMARC Group / Renub Research India Online Food Delivery & Quick Commerce reports', asof: '2026-04-01',
  },
  'Electronics Manufacturing Services (EMS)': {
    growthDrivers: ['PLI schemes for mobile phones and electronic components (₹22,919 crore PLI for components approved March 2025)', 'Global brands diversifying manufacturing to India', 'Backward integration into displays, PCBs, and mechanical enclosures'],
    risks: ['Execution/timeline risk on PLI-linked capex commitments', 'Thin EMS margins versus component/IP-owning peers', 'Dependence on continued government incentive support'],
    outlookNote: "India's EMS market (~$39.2B in 2026) is projected to reach ~$62B by 2031 (9.6% CAGR); Dixon Technologies is the largest listed EMS player by market cap.",
    source: 'Mordor Intelligence; IBEF; Business Standard', asof: '2026-01-01',
  },
  'Healthcare & Pharma': {
    growthDrivers: ['Domestic market growth (~12.7% YoY) led by GLP-1 launches, complex generics, and price hikes', 'CDMO/API segment expansion (~9.9% YoY)', 'Export growth — pharma exports topped $31B in FY26, up 6.8% YoY'],
    risks: ['US pricing/regulatory exposure (FDA actions, pricing pressure on generics) given heavy export dependence on the US market', 'Rising R&D and manufacturing capital intensity as the industry shifts toward complex generics/biologics', 'Input/API supply-chain concentration risk despite PLI/Bulk Drug Park efforts'],
    outlookNote: 'Indian pharma is tracking ~10% YoY revenue growth in FY27 (domestic +12.7%, CDMO/API +9.9%), with exports crossing $31B in FY26 and government schemes reinforcing the growth runway.',
    source: 'Q1 FY27 Indian pharma sector results roundup (IndiaPharmaOutlook.com); IBEF industry data', asof: '2026-08-15',
  },
  'Automobiles': {
    growthDrivers: ['GST rate cut plus income-tax relief lifting affordability and demand across segments', 'Two-wheeler sales growth of 6-9% in FY26 (20.50M units) on rural/urban demand recovery', 'Rapid EV adoption — EV sales up 30% YoY to 2.66M units in FY26 (~8.6% penetration)'],
    risks: ['Input-cost volatility (steel, aluminium, semiconductors) squeezing margins', 'Rural demand sensitive to monsoon performance and agri-income swings', 'Heavy EV-transition capex and competitive intensity pressuring incumbent OEM margins'],
    outlookNote: 'ICRA and Axis Securities project broad-based FY26 growth across auto segments — passenger vehicles up 5-7% to a record ~4.49M units and two-wheelers up 6-9% to 20.5M units.',
    source: 'ICRA / Axis Securities FY26 auto sector outlook, via Autocar Professional and The Tribune', asof: '2026-09-01',
  },
  'Industrials & Infrastructure': {
    growthDrivers: ['Union Budget 2026-27 infrastructure capex raised ~25% YoY to ~₹11.1-12.2 lakh crore', 'Capital goods output (IIP) grew ~16% YoY in April 2026', "L&T's record order book (~₹6 lakh crore) signals a sustained execution pipeline"],
    risks: ['Project execution and labour/land-acquisition bottlenecks causing delays', 'Working-capital and receivables stress given dependence on government payment cycles', 'Cyclicality tied to continuity of government capex spending'],
    outlookNote: "India's FY27 Union Budget lifted infrastructure capex to ~₹12.2 lakh crore and capital-goods IIP grew ~16% YoY in April 2026, viewed by analysts as a direct read-through on the capex supercycle continuing into FY27.",
    source: 'Union Budget 2026-27 capex allocation and IIP data, via m.Stock/Univest brokerage sector notes', asof: '2026-09-01',
  },
  'Real Estate': {
    growthDrivers: ['Sustained urbanisation and infrastructure investment underpinning residential demand', 'Structural shift toward premium/high-value homes driving sales-value growth', 'Q1 2026 housing sales up ~8% YoY, concentrated in top-4 metros (~77% of national sales)'],
    risks: ['Affordability stress in the sub-₹10 million segment', 'Overall volume growth moderating after a price-driven slowdown in 2025', 'Developer sensitivity to interest rates and construction input costs'],
    outlookNote: "CBRE and Colliers project India's residential real estate market at ~$438.5B in 2026, with Q1 2026 sales up 8% YoY led by premiumisation.",
    source: 'CBRE India Residential Market Outlook 2026; Colliers India 2026 Real Estate Outlook', asof: '2026-09-01',
  },
  'Aerospace & Defense': {
    growthDrivers: ['FY27 defense budget raised 13% YoY to ₹6.81 lakh crore, three-quarters ring-fenced for domestic sourcing', "Record order books — BEL at ~₹75,000cr, HAL's Tejas Mk1A contract worth ₹67,000cr", 'Expanding indigenisation (targeting 75% by 2029) and export ambition (₹50,000cr target by FY29)'],
    risks: ['Stretched valuations after a multi-year sector re-rating', 'Execution and delivery-timeline risk on large platforms (historical Tejas delivery delays)', 'Export growth dependent on geopolitical relationships and government export-approval processes'],
    outlookNote: "India's FY27 defense budget rose 13% YoY to ₹6.81 lakh crore with 75% of modernisation spend reserved for domestic suppliers; record order books at BEL and HAL underpin growth, though valuations are stretched.",
    source: 'Union Budget 2026-27 defense allocation; sector notes via Swastika Investmart / Genvest', asof: '2026-09-01',
  },
  'Metals & Mining': {
    growthDrivers: ['Three-year safeguard duty on flat steel imports supporting domestic price hikes', 'Steel demand projected to grow ~9% in FY26 on construction, infrastructure, auto and EV consumption', 'Copper demand growth of 10-12% annually driven by renewables, EVs and power infrastructure'],
    risks: ['Rising input costs (coking coal) compressing margins even as steel prices rise', 'Global oversupply/dumping risk (particularly from China) despite safeguard-duty protection', 'Commodity-price cyclicality tied to global macro conditions and China demand'],
    outlookNote: 'HSBC Global Investment Research expects Indian metals to stay in favour through 2026 on safeguard-duty-driven steel price hikes and ~9% FY26 steel demand growth.',
    source: 'HSBC Global Investment Research India metals sector note, via The Tribune', asof: '2026-09-01',
  },
};

export const INDEX_PE_BENCHMARKS = {
  nifty50: { peRatioTTM: 19.56, source: 'Trendlyne / IndexPE (NSE-derived)', asof: '2026-09-25' },
  sp500: { peRatioTTM: 25.9, source: 'GuruFocus (S&P 500 trailing P/E)', asof: '2026-09-18' },
  msciAcwiExUS: { peRatioTTM: 17.24, source: 'MSCI ACWI ex USA Index factsheet (trailing P/E; forward P/E 13.20 also disclosed)', asof: '2026-08-31' },
};
