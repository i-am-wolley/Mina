// Matches investment_app_memo.md §8 (Investment calendar).
// Deliberately empty for now. It previously carried a synthetic recurring-SIP-purchase prediction
// (a guessed "next purchase" date/amount for the HDFC BSE Sensex folio, invented rather than sourced
// from a real standing-instruction/mandate feed) — removed 2026-09-02 at the user's explicit request
// ("remove such future purchases to be added automatically"). Don't reintroduce predicted/future
// transactions here without a real source (a SIP mandate ingestion module, a broker calendar feed,
// etc.) — this calendar should only ever hold events Mina actually knows are real, not forecasts.
// Real, dated one-off events (a confirmed dividend, a real FD maturity, a real card due date) are
// fine to add back when the date has genuinely passed or is confirmed, sourced from an actual
// statement/feed rather than an assumed recurrence.

export const calendarEvents = [];
