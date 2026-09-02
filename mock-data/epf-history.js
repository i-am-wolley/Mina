// REAL DATA — Vinod's EPF year-end closing balances (Employee + Employer; Pension shows 0
// throughout on this employer's passbook), extracted from EPFO yearwise statements 2017–2026.
// Not yet used by any built screen — captured for the future point-in-time/net-worth-history
// work (memo §12.1) since real multi-year balances are rare to have on hand.

export const epfHistoryVinod = [
  { fy_end: '2018-03-31', employee: 74516, employer: 74516, total: 149032 },
  { fy_end: '2019-03-31', employee: 176243, employer: 176243, total: 352486 },
  { fy_end: '2020-03-31', employee: 313465, employer: 313465, total: 626930 },
  { fy_end: '2021-03-31', employee: 488533, employer: 488533, total: 977066 },
  { fy_end: '2022-03-31', employee: 735709, employer: 735709, total: 1471418 },
  { fy_end: '2023-03-31', employee: 1076848, employer: 1076848, total: 2153696 },
  { fy_end: '2024-03-31', employee: 1484134, employer: 1484134, total: 2968268 },
  { fy_end: '2025-03-31', employee: 1967435, employer: 1968173, total: 3935608 },
  { fy_end: '2026-03-31', employee: 2524956, employer: 2527436, total: 5052392 },
  // Current running balance per the latest passbook (contributions posted through Jun-2026):
  { fy_end: '2026-07-current', employee: 2655300, employer: 2657780, total: 5313080 },
];
