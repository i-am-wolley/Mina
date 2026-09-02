// Matches investment_app_memo.md §8 (Investment calendar).
// evt_1 amount is illustrative but the instrument and recurring-purchase pattern are real
// (Vinod's HDFC BSE Sensex Direct folio shows a ~monthly purchase every statement cycle).
// evt_2 is a real held stock; dividend timing/amount are illustrative pending a real corporate-
// action feed (Module E, Stage 8). No fabricated action-required event is shown for this window —
// the real FD maturities (2028/2029/2033) and card due date (22nd) both fall outside the next 7 days.

export const calendarEvents = [
  {
    id: 'evt_1', date: '2026-08-06', type: 'SIP_INSTALMENT',
    label: 'HDFC BSE Sensex Index Fund purchase', amount: 90000, instrument_id: 'inst_hdfc_sensex_direct',
    action_required: false,
  },
  {
    id: 'evt_2', date: '2026-08-08', type: 'DIVIDEND',
    label: 'Reliance Industries dividend', amount: 1310, instrument_id: 'inst_reliance',
    action_required: false,
  },
];
