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
// "House Loan EMI" implies a real home loan that isn't tracked as a liability anywhere in net worth
// yet (no loan principal/outstanding balance/property value is on file) — flagged as a gap, not
// fabricated. "AMC Cleaning" amount wasn't given — left as null rather than guessed.

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
    { key: 'insurance_saving', label: 'Insurance (savings-linked)', amount: 7000, category: 'investment' },
    { key: 'car_insurance_saving', label: 'Car insurance (savings-linked)', amount: 1700, category: 'investment' },
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
