// REAL DATA — loan liabilities, provided directly by the user (a screenshot of 3 loan accounts) on
// 2026-09-02. Account numbers are masked to the last 4 digits — full account numbers are never
// carried into these fixtures (this repo is public), matching the PAN/UAN/address-masking
// discipline already applied throughout mock-data/.
//
// Presumed tied to the Nikoo Homes 1 flat (inst_nikoo_homes_1_flat) — it's the only mortgaged
// property; Nikoo Homes 4 is explicitly loan-free per the user. The exact purpose of each of the 3
// accounts (e.g. primary home loan vs. a top-up) wasn't specified — not guessed here, just carried
// as 3 real loan accounts against the same asset.
//
// Cross-checked, not just transcribed: computing the EMI implied by each loan's own principal/
// rate/remaining-term (standard amortization formula) comes to ~₹1,30,314/month combined — within
// 1.3% of the real ₹1,32,000 "House loan EMI" figure already in mock-data/budget.js. That's close
// enough (rate/term rounding in what was given) to treat both real numbers as consistent, not two
// unreconciled figures.
export const liabilities = [
  { id: 'loan_1', account_last4: '0529', principal_outstanding: 6765564, balance_term_months: 94, rate: 0.071, linked_asset: 'inst_nikoo_homes_1_flat' },
  { id: 'loan_2', account_last4: '2839', principal_outstanding: 3398239, balance_term_months: 165, rate: 0.0765, linked_asset: 'inst_nikoo_homes_1_flat' },
  { id: 'loan_3', account_last4: '0689', principal_outstanding: 216884, balance_term_months: 111, rate: 0.093, linked_asset: 'inst_nikoo_homes_1_flat' },
];
