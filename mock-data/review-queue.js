// review queue counts are honest about the current build state (Module A / Stage 8 isn't built
// yet), not a fabricated backlog. newsDigest items are illustrative narrative on real holdings —
// Module F (real news pipeline) is Stage 3+.

export const reviewQueue = {
  pending_transactions: 0,
  pending_documents_uploaded: 19, // real statements/screenshots added this session, not yet run through an extraction pipeline (none exists until Stage 8)
  coverage_gaps: [
    { institution: 'DriveWealth (Keerthana — US stocks)', missing_since: null, note: 'Priced via a one-time web-search lookup on 2026-08-02, not a wired feed — see PRICE_ASOF in positions.js.' },
    { institution: 'Cash / savings accounts (both members)', missing_since: null, note: 'No bank statement provided yet — household cash position is currently invisible to net worth.' },
  ],
};

export const newsDigest = {
  item_count: 3,
  affected_holding_count: 2,
  items: [
    {
      id: 'news_1', instrument_id: 'inst_reliance', category: 'Earnings',
      summary: 'Reliance Q1 results beat consensus on refining margins.',
      why_it_matters: 'You hold ₹9.5L of Reliance — this is a modestly positive earnings surprise, not a signal to act on.',
      impact: 'Low',
    },
    {
      id: 'news_2', instrument_id: 'inst_axis_elss', category: 'Fund-specific',
      summary: 'Axis ELSS Tax Saver Fund lead manager confirmed departed; interim manager named.',
      why_it_matters: 'Feeds the STRUCT-02 flag already open on this holding.',
      impact: 'High',
    },
    {
      id: 'news_3', instrument_id: 'inst_hdfc_sensex_direct', category: 'Regulatory',
      summary: 'SEBI tightens index-fund tracking-error disclosure norms, effective next quarter.',
      why_it_matters: 'Sector-wide rule change affecting your combined ₹75L index-fund exposure, not fund-specific.',
      impact: 'Medium',
    },
  ],
};
