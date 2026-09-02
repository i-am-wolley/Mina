// REAL DATA — 2 properties, provided directly by the user on 2026-09-02, with loan details for the
// mortgaged one (see mock-data/liabilities.js). Deliberately NOT part of `positions`/`instruments`
// (mock-data/positions.js, instruments.js) and NOT included in `householdTotals.current_total` —
// the user explicitly asked to keep immovable/illiquid property outside the household's overall
// wealth equation and the ₹20 Cr Goal plan, which is meant to track investable/liquid wealth on top
// of what these properties are worth. Shown only in the Debt & Immovable Assets tab.
//
// `sqft` and `rate_per_sqft` are the user's own stated current market estimate, not an independent
// valuation or a recent comparable sale. `purchase_price`/`purchase_date` aren't on file, so no
// real appreciation/gain figure is computable — not fabricated here.

export const realEstate = [
  {
    id: 're_nikoo_homes_1',
    name: 'Nikoo Homes 1, Bangalore — Unit 100704',
    sqft: 2104,
    rate_per_sqft: 13500,
    current_value: 28404000,
    loan_free: false, // carries the 3 loans in mock-data/liabilities.js
    rate_asof: '2026-09-02 (user-provided market estimate)',
  },
  {
    id: 're_nikoo_homes_4',
    name: 'Nikoo Homes 4, Bangalore — Studio',
    sqft: 465,
    rate_per_sqft: 12500,
    current_value: 5812500,
    loan_free: true,
    rate_asof: '2026-09-02 (user-provided market estimate)',
  },
];
