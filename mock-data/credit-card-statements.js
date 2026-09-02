// REAL DATA — HDFC Bank Infinia credit card (primary: Vinod, add-on: Keerthana), statement
// summaries (top-5 category %, dues, utilisation). Real line-item transactions now live
// alongside this in credit-card-transactions.js (Money tab v2, 2026-08-03).
// Card was reissued between the Jan and Mar statements (552385XXXXXX5389 → 552385XXXXXX5980,
// ₹100 reissue fee) — same underlying account and credit limit throughout.
//
// The statement dated 2026-01-02 (billing period 03 Dec 2025 - 02 Jan 2026) is deliberately
// excluded — its billing cycle mixes 2025 and 2026 spend, and the user asked the Money tab to
// scope to "this year" only. The 6 statements below (Feb-Jul 2026) all have billing periods
// entirely inside 2026.

export const creditCardStatements = [
  {
    statement_date: '2026-02-02', billing_period: ['2026-01-03', '2026-02-02'],
    total_amount_due: -853.82, minimum_due: 0, due_date: null,
    previous_statement_dues: 16408.91, payments_received: 235303.06, purchases: 218040.33, finance_charges: 0,
    credit_limit: 838000, available_credit_limit: 837185,
    top_categories: { Home_Decor: 51, Utility: 16, Groceries: 13, Telecom_Cable: 7, Misc: 13 },
  },
  {
    statement_date: '2026-03-02', billing_period: ['2026-02-28', '2026-03-02'],
    total_amount_due: 427.00, minimum_due: 318.00, due_date: '2026-03-22',
    previous_statement_dues: -853.82, payments_received: 149097.72, purchases: 150378.54, finance_charges: 0,
    credit_limit: 838000, available_credit_limit: 837573,
    top_categories: { Groceries: 36, B2B: 30, Electronics: 15, Hotels: 3, Misc: 16 },
    note: 'Short billing cycle — card was reissued (552385XXXXXX5389 → 552385XXXXXX5980) partway through.',
  },
  {
    statement_date: '2026-04-02', billing_period: ['2026-03-03', '2026-04-02'],
    total_amount_due: -45092.60, minimum_due: 0, due_date: null,
    previous_statement_dues: 427.00, payments_received: 516686.73, purchases: 471167.13, finance_charges: 0,
    credit_limit: 838000, available_credit_limit: 837622,
    top_categories: { Travel: 39, Hotels: 23, Entertainment: 11, Groceries: 7, Misc: 20 },
  },
  {
    statement_date: '2026-05-02', billing_period: ['2026-04-03', '2026-05-02'],
    total_amount_due: 373868.00, minimum_due: 24461.00, due_date: '2026-05-22',
    previous_statement_dues: -45092.60, payments_received: 198219.56, purchases: 617021.55, finance_charges: 158.52,
    credit_limit: 838000, available_credit_limit: 445589,
    top_categories: { Travel: 26, Restaurant: 15, Electronics: 14, Air: 9, Misc: 36 },
    note: 'Europe trip month (Slovenia/Croatia/Greece) — large international EMI spend.',
  },
  {
    statement_date: '2026-06-02', billing_period: ['2026-05-03', '2026-06-02'],
    total_amount_due: 11249.00, minimum_due: 713.00, due_date: '2026-06-22',
    previous_statement_dues: 373867.91, payments_received: 489791.49, purchases: 127127.89, finance_charges: 44.23,
    credit_limit: 838000, available_credit_limit: 826643,
    top_categories: { Groceries: 19, Electronics: 18, Restaurant: 15, Telecom_Cable: 13, Misc: 35 },
  },
  {
    statement_date: '2026-07-02', billing_period: ['2026-06-03', '2026-07-02'],
    total_amount_due: 52634.00, minimum_due: 2683.00, due_date: '2026-07-22',
    previous_statement_dues: 11248.54, payments_received: 92901.68, purchases: 134287.03, finance_charges: 0.09,
    credit_limit: 838000, available_credit_limit: 779457,
    top_categories: { Electronics: 42, Groceries: 23, Home_Decor: 12, Travel: 5, Misc: 18 },
  },
];
