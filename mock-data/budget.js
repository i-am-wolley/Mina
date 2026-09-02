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
// Correction, 2026-09-02 (first pass): "Insurance (savings-linked)" and "Car insurance
// (savings-linked)" were originally miscategorised as `investment` — recategorised to their own
// `insurance` bucket after the user clarified neither is a wealth-building investment.
//
// Correction, 2026-09-02 (second pass): the ₹7,000 line specifically is parents' health insurance
// premium (saved monthly toward an annual lump-sum payment), not car insurance as first assumed —
// moved to `family` alongside the parents transfer, since that's what it actually is. Only the
// ₹1,700 line is genuinely car insurance, now standing alone and folded into `essential` (a small,
// personal-protection cost, not distinct enough to justify its own category). Real savings rate:
// 46.25% (MF SIP only) — unaffected by this second correction, since neither line was ever counted
// as investment after the first correction above.

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
    { key: 'insurance_saving', label: "Parents' health insurance premium (saved monthly)", amount: 7000, category: 'family' },
    { key: 'car_insurance_saving', label: 'Car insurance premium (saved monthly)', amount: 1700, category: 'essential' },
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
};
