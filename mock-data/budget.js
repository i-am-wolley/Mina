// REAL DATA — one representative month's household income/outflow breakdown, given directly by the
// user in conversation on 2026-09-02 (not extracted from a bank statement — no bank statement has
// ever been provided; this is the first real income figure Mina has had, closing a gap flagged
// repeatedly in Money/Insights since the first build: "income, true savings rate, investment-vs-
// spending reconciliation aren't computable"). It is a single snapshot month, not a series — no
// trend chart is built on it yet, and it isn't tied to a specific calendar month.
//
// The MF outflow (₹2,34,000) matches the household's monthly SIP amount exactly (see GOAL_PLAN in
// index.html / investment-plan-20cr.html) — this is the same real number in both places, not a
// coincidence to reconcile away.
//
// "House Loan EMI" is real — see mock-data/liabilities.js (added 2026-09-02) for the actual 3 loan
// accounts behind it; the two now sit in the Debt tab, cross-checked against each other (computed
// EMI from the loan terms comes to ~₹1,30,314, within rounding of this real ₹1,32,000 figure).
// "AMC Cleaning" amount wasn't given — left as null rather than guessed.
//
// Correction, 2026-09-02: "Insurance (savings-linked)" and "Car insurance (savings-linked)" were
// originally miscategorised as `investment` — the user clarified both are money set aside monthly
// toward a car insurance premium (paid annually as a lump sum), not a wealth-building investment.
// Recategorised to their own `insurance` bucket. This changes the real savings-rate figure quoted
// in CLAUDE.md's Budget-tab changelog entry (was ~48% including these; ~46.25% correctly excluding
// them, i.e. just the MF SIP) — the MF-only figure was always the more defensible one anyway.

export const monthlyBudget = {
  as_of: '2026-09-02',
  source: 'user-provided in conversation — a single representative month, not a bank-statement feed',
  income: 506000,
  outflows: [
    { key: 'mf_sip', label: 'MF / SIP investment', amount: 234000, category: 'investment' },
    { key: 'travel', label: 'Travel', amount: 50000, category: 'discretionary' },
    { key: 'house_loan_emi', label: 'House loan EMI', amount: 132000, category: 'debt' },
    { key: 'living', label: 'Living', amount: 43000, category: 'essential' },
    { key: 'home_maintenance', label: 'Home maintenance', amount: 9600, category: 'essential' },
    { key: 'insurance_saving', label: 'Car insurance premium (saved monthly)', amount: 7000, category: 'insurance' },
    { key: 'car_insurance_saving', label: 'Car insurance premium (saved monthly, separate line)', amount: 1700, category: 'insurance' },
    { key: 'car_service', label: 'Car service', amount: 1700, category: 'essential' },
    { key: 'subscriptions', label: 'Subscriptions', amount: 3000, category: 'discretionary' },
    { key: 'amc_cleaning', label: 'AMC / cleaning', amount: null, category: 'essential' },
    { key: 'gas_electricity', label: 'Gas & electricity', amount: 4000, category: 'essential' },
    { key: 'parents_transfer', label: 'Parents transfer', amount: 20000, category: 'family' },
  ],
};

export const CATEGORY_META = {
  investment: { label: 'Investment / savings', color: 'sage' },
  debt: { label: 'Debt servicing', color: 'terracotta' },
  essential: { label: 'Essential living', color: 'bronze' },
  discretionary: { label: 'Discretionary', color: 'lilac' },
  family: { label: 'Family support', color: 'teal' },
  insurance: { label: 'Insurance premiums (sinking fund)', color: 'amber' },
};
