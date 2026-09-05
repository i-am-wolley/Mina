// Matches investment_app_memo.md §8 (Investment calendar).
// Was deliberately empty from 2026-09-02 (a synthetic recurring-SIP-purchase prediction was removed
// that day at the user's explicit request — see the git history / CLAUDE.md for that story). Don't
// reintroduce predicted/future TRANSACTIONS here without a real source (a SIP mandate feed, a broker
// calendar API, etc.) — that rule still stands.
//
// Populated 2026-09-05 with a different, allowed kind of event: real, sourced calendar dates for the
// household's actual stock/RSU holdings — next quarterly earnings and, where already declared, a
// dividend date. These are genuinely dated public-market facts (company IR pages, SEC filings,
// financial-calendar aggregators), not predictions Mina is generating — the same "real source or
// don't show it" discipline as every other number in this app. Every entry below carries a `source`
// field, and `confirmed: false` marks the ones that are analyst/pattern-based estimates rather than a
// company's own announced date (companies typically confirm an exact earnings date only 2-4 weeks
// out, so several of the household's holdings don't have one yet as of this pull).
//
// Deliberately NOT included: quarterly results dates for any of the 10 Indian stock holdings, or for
// Anheuser-Busch InBev (RSU) or Marvell — none had a genuinely sourced date (confirmed or reasonably
// estimated) as of this research pass; Indian companies in particular only announce the exact board
// meeting date about a week prior. A known, disclosed gap, not filled with a guess.
//
// `amount` is left null for pure informational dates (an earnings announcement isn't a cash-flow
// event) — only real, computed monetary events (a dividend the household will actually receive) get
// a number, so `amount` never has to be interpreted as "money moving" when it isn't.
export const calendarEvents = [
  {
    id: 'evt_avgo_div', date: '2026-09-30', instrument_id: 'inst_avgo',
    label: 'Broadcom — dividend payment date', amount: null, action_required: false,
    confirmed: true, source: 'Broadcom Q3 FY2026 results release (investors.broadcom.com) — record date 2026-09-21, payment date 2026-09-30; per-share amount for this declaration not separately confirmed in this pass.',
  },
  {
    id: 'evt_mu_earnings', date: '2026-09-30', instrument_id: 'inst_mu',
    label: 'Micron Technology — fiscal Q4 2026 earnings', amount: null, action_required: false,
    confirmed: true, source: 'Micron Technology press release, "Micron Technology to Report Fiscal Fourth Quarter Results on September 30, 2026" (investors.micron.com).',
  },
  {
    id: 'evt_asml_earnings', date: '2026-10-14', instrument_id: 'inst_asml',
    label: 'ASML — Q3 2026 earnings', amount: null, action_required: false,
    confirmed: true, source: 'ASML investor relations financial calendar (investor.tsmc.com cross-refs / company IR).',
  },
  {
    id: 'evt_tsm_earnings', date: '2026-10-15', instrument_id: 'inst_tsm',
    label: 'Taiwan Semiconductor (TSMC) — Q3 2026 earnings (estimated)', amount: null, action_required: false,
    confirmed: false, source: 'Pattern-based estimate from TSMC\'s historical quarterly reporting calendar (TipRanks) — not yet company-confirmed as of this pull.',
  },
  {
    id: 'evt_msft_earnings', date: '2026-10-27', instrument_id: 'inst_msft',
    label: 'Microsoft — Q1 FY2027 earnings', amount: null, action_required: false,
    confirmed: true, source: 'Microsoft Investor Relations earnings calendar (microsoft.com/en-us/investor).',
  },
  {
    id: 'evt_googl_earnings', date: '2026-10-27', instrument_id: 'inst_googl',
    label: 'Alphabet — Q3 2026 earnings', amount: null, action_required: false,
    confirmed: true, source: 'TipRanks earnings calendar, confirmed date.',
  },
  {
    id: 'evt_meta_earnings', date: '2026-10-28', instrument_id: 'inst_meta',
    label: 'Meta Platforms — Q3 2026 earnings (expected)', amount: null, action_required: false,
    confirmed: false, source: 'TipRanks/Zacks earnings calendar — listed as expected, not yet independently confirmed by Meta as of this pull.',
  },
  {
    id: 'evt_now_earnings', date: '2026-10-28', instrument_id: 'inst_now',
    label: 'ServiceNow — Q3 2026 earnings', amount: null, action_required: false,
    confirmed: true, source: 'TipRanks earnings calendar.',
  },
  {
    id: 'evt_amd_earnings', date: '2026-11-03', instrument_id: 'inst_amd',
    label: 'AMD — Q3 2026 earnings', amount: null, action_required: false,
    confirmed: true, source: 'TipRanks earnings calendar, confirmed date.',
  },
  {
    id: 'evt_alab_earnings', date: '2026-11-03', instrument_id: 'inst_alab',
    label: 'Astera Labs — Q3 2026 earnings (estimated)', amount: null, action_required: false,
    confirmed: false, source: 'Estimated window (Nov 2–5, 2026) from historical reporting pattern (MarketScreener/AlphaQuery) — company has not announced an exact date as of this pull; used the midpoint.',
  },
  {
    id: 'evt_aapl_div', date: '2026-11-10', instrument_id: 'inst_aapl',
    label: 'Apple — dividend ex-date ($0.27/share)', amount: 267, action_required: false,
    confirmed: true, source: 'Apple dividend history/declaration trackers (stockanalysis.com, marketchameleon.com) — ex-date 2026-11-10, pay date 2026-11-13. Amount is the household\'s own real 10.4596 units × $0.27 × spot USD/INR (94.49), not the per-share figure itself.',
  },
  {
    id: 'evt_nvda_earnings', date: '2026-11-25', instrument_id: 'inst_nvda',
    label: 'NVIDIA — Q3 FY2027 earnings (estimated)', amount: null, action_required: false,
    confirmed: false, source: 'Most-cited date across earnings-calendar aggregators (TipRanks, WallStreetHorizon); one source suggested Nov 17 instead — NVIDIA had not published its own official date as of this pull, so treat as an estimate.',
  },
];
