// MOCK — matches investment_app_memo.md §3.2/§3.3. Swap for Firestore reads at Stage 8.

export const household = {
  id: 'hh_demo',
  base_currency: 'INR',
  tax_residencies: ['IN'],
  members: ['mem_vinod', 'mem_keerthana'],
  shared_goals: ['goal_retirement', 'goal_house_downpayment'],
};

export const members = {
  mem_vinod: {
    id: 'mem_vinod',
    name: 'Vinod',
    risk_tolerance: 'growth',
    privacy_scope: 'HOUSEHOLD_FULL',
    accounts: ['acc_vinod_mf', 'acc_vinod_zerodha', 'acc_vinod_rsu', 'acc_vinod_fd', 'acc_vinod_epf', 'acc_vinod_alpaca'],
  },
  mem_keerthana: {
    id: 'mem_keerthana',
    name: 'Keerthana',
    risk_tolerance: 'balanced',
    privacy_scope: 'HOUSEHOLD_FULL',
    accounts: ['acc_keerthana_mf', 'acc_keerthana_gold', 'acc_keerthana_drivewealth'],
  },
};
