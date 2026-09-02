// MOCK — synthetic 90-day daily net-worth series for the Today sparkline (§14B.3).
// This generator exists only to produce plausible demo data; it is not part of the real
// app's compute path (§15 owns that once Stage 8 lands) and must not be reused there.
import { householdTotals } from './positions.js';

// toISOString() converts to UTC first, which shifts the date in any timezone ahead of UTC
// (e.g. IST) — always use local calendar components for date-only values.
function toLocalISO(d) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function buildHistory() {
  const days = 90;
  const end = householdTotals.current_total;
  const rand = seededRandom(42);
  const drift = 1 - 0.052; // trend backward from today's value
  let value = end * drift;
  const series = [];
  const today = new Date('2026-08-02T00:00:00');
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const noise = (rand() - 0.5) * 0.012;
    const trendStep = (end - value) / (i + 1);
    value = value + trendStep + value * noise;
    series.push({ date: toLocalISO(date), value: Math.round(value) });
  }
  series[series.length - 1].value = end;
  return series;
}

export const netWorthHistory = buildHistory();
