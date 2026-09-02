// MOCK SCENARIO on a REAL holding — matches investment_app_memo.md §11.1 (Flag structure).
// The manager-exit signal/evidence below is illustrative (no such event is confirmed for the
// real Axis ELSS Tax Saver Fund); the position it's attached to and its value are real. Stage 3
// (Insights tab) will replace this with a genuinely computed flag driven by real news/fund data.

export const flags = [
  {
    code: 'STRUCT-02',
    category: 'Manager change',
    severity: 'High',
    affected_positions: ['pos_k_mf_1'],
    exposure_amount: 2417578.27,
    signal: 'Fund manager exit followed by a change in trailing performance.',
    evidence: 'Axis ELSS Tax Saver Fund’s lead manager departed 3 months ago; the fund has trailed its category median in both months since.',
    reasoning: 'A manager exit on an actively managed fund removes the thing you were actually paying for — the manager’s process. Two months is early, but it is the kind of change worth watching rather than ignoring.',
    confidence: 'Medium',
    confidence_note: 'Would rise to High with one more quarter of post-exit performance data.',
    options: [
      { action: 'Hold and monitor', consequence: 'No action; flag re-evaluated next quarter.' },
      { action: 'Reduce position', consequence: 'Realises a long-term gain on this lot at 12.5% LTCG; resets nothing since the fund is already past the ELSS 3-year lock-in.' },
      { action: 'Switch to an index fund in the same category', consequence: 'Removes manager-selection risk entirely; gives up any chance of the fund recovering under new management.' },
    ],
    counter_case: 'New managers often continue an established process, especially at a large fund house with a deep bench. Two months of underperformance is within normal noise — selling now locks in a decision based on a sample too small to be meaningful, and this fund carries a ~₹10.1L unrealised gain that would become taxable.',
    tax_impact: 'This lot has been held well past the ELSS 3-year lock-in and past 12 months, so any sale is a long-term capital gain taxed at 12.5% above the annual exemption.',
    first_raised: '2026-07-15',
    times_raised: 1,
    user_disposition: null,
  },
];
