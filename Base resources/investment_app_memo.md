# PRODUCT MEMO — Household Wealth Intelligence Platform

**To:** Vinod
**From:** Product / Architecture brainstorm
**Date:** 02 August 2026
**Re:** Feature specification for a document-first, AI-assisted, household-level money management platform
**Status:** Draft v2 — revised for Firebase / shared-Miso-household architecture

---

## 0. Executive summary

Every wealth app in the market today is one of three things: a **broker with a dashboard bolted on**, a **budgeting app that ignores investments**, or a **portfolio tracker that ignores everything else**. None of them do the thing you actually described, which is:

> *Ingest whatever paper the household already receives, understand it, and then reason about it — continuously, in one place, across every asset class and every person in the house.*

The core insight in your brief is the **document-first** stance. Most apps chase live broker linking, which is fragile, jurisdiction-locked, and permanently incomplete (it never captures the gold in the locker, the plot of land, the EPF, the ESOP, the foreign brokerage). A statement is the universal interface. Every custodian on earth produces one. If the ingestion layer is genuinely excellent, you get global coverage for free — and you never fight an API partnership again.

The second insight is **reasoning over reporting**. Showing someone their XIRR is a solved problem. Telling them *"this fund's mandate drifted, its manager left 14 months ago, and it now duplicates 71% of what you already own — here's the counter-argument for holding anyway"* is not. That layer is where the product lives or dies.

This memo proposes **eleven modules**, a **shared data foundation**, a **once-daily intelligence pipeline**, and a strict rule about where AI is allowed to touch the numbers (short version: never).

Recommended shape: **a personal-scale system built properly, not a startup MVP.** You are the end user. That changes the calculus — you can afford correctness over growth-hacking, and you can build the hard parts first.

---

## 1. Design principles

These are the non-negotiables. Every feature decision below traces back to one of these.

| # | Principle | Consequence |
|---|---|---|
| P1 | **Deterministic math, probabilistic language** | LLMs never compute a number, a tax liability, or a valuation. They read documents and write prose. All arithmetic is code with tests. |
| P2 | **Document is truth, model is derived** | Every position traces to a source document, page, and line. If you can't click a number and see the PDF it came from, it doesn't ship. |
| P3 | **Confidence is a first-class field** | Nothing is silently guessed. Low-confidence extractions enter a review queue, not the portfolio. |
| P4 | **Every insight carries a counter-argument** | An advisory system with no dissent is a sales system. Every flag ships with the strongest case against acting on it. |
| P5 | **Daily is fast enough** | No streaming, no websockets, no tick data. One batch a night. This removes 60% of the engineering cost and loses almost nothing. |
| P6 | **Household is the unit, person is the lens** | Aggregation is default; per-member privacy scopes are enforced at the query layer, not the UI layer. |
| P7 | **Effective-dated rules** | Tax rates, cap definitions, and risk bands change. Everything is stored with a validity window so historical calculations stay correct forever. |
| P8 | **Ugly truth over pretty lie** | If data is incomplete, the UI says so. No filled-in gaps, no imputed returns presented as fact. |

---

## 2. Where the market is and what's missing

| Product | Strength | The gap you'd exploit |
|---|---|---|
| INDmoney / Kuvera / Dezerv | Great India coverage, live linking | India-only; no household reasoning; product-sales incentive contaminates advice |
| Sharesight | Best-in-class corporate action + tax lot handling | Equities/funds only; no spending; no advisory reasoning |
| Empower (Personal Capital) | Good aggregation + planning | US-only; advisory is a lead-gen funnel |
| Monarch / Copilot | Beautiful spending UX | Investments are a rounding error in the product |
| Kubera | Genuinely global, all asset classes | It's a *ledger*, not an *analyst*. No reasoning, no projections worth the name |
| Snowball / Ghostfolio / Portfolio Performance | Deep metrics, self-hostable | Manual-entry hell; no document intelligence; no tax engine |

**The unoccupied square:** global asset coverage + document intelligence + household scope + a reasoning engine that explains *why*. Nobody holds all four.

---

## 3. The data foundation

Everything else is a view on this. Get this wrong and no amount of charting saves it.

### 3.1 Global asset taxonomy

Four levels. L1–L3 are fixed vocabulary; L4 is the actual instrument.

**L1 — Super-class (8)**

1. **Equity** — ownership claims
2. **Fixed Income** — contractual claims
3. **Cash & Equivalents** — liquidity
4. **Real Assets** — physical/tangible
5. **Alternatives** — non-linear / illiquid / structured
6. **Insurance & Retirement Wrappers** — legally distinct vehicles
7. **Digital Assets** — crypto and tokenised
8. **Liabilities** — negative holdings (must be modelled, not ignored)

**L2/L3 expansion (illustrative, not exhaustive)**

| L1 | L2 | L3 examples |
|---|---|---|
| Equity | Direct listed | Domestic stock, foreign stock, ADR/GDR, dual-listed |
| | Pooled | Active MF, index fund, ETF, FoF, closed-end fund, UCITS, hedge fund |
| | Private | Unlisted shares, ESOP/RSU/SAR, angel, VC/PE fund, startup SAFE |
| | Structured equity | Market-linked debenture, participation notes |
| Fixed Income | Government | Sovereign bonds, T-bills, SDL, savings bonds, TIPS/linkers |
| | Corporate | Listed NCD, unlisted debenture, CP, perpetual/AT1 |
| | Bank/Institutional | FD, RD, sweep deposit, CD |
| | Pooled debt | Liquid fund, ultra-short, credit risk, target maturity, gilt |
| | Structured credit | Securitised debt, InvIT debt, P2P, invoice discounting |
| Cash | Deposit | Savings, current, multi-currency, offshore |
| | Near-cash | Money market fund, overnight fund |
| Real Assets | Real estate | Primary residence, rental, land, under-construction, fractional |
| | Pooled RE | REIT, InvIT, real estate fund |
| | Commodities | Physical gold/silver, gold ETF, SGB, commodity fund |
| | Collectibles | Art, watches, wine, vintage instruments |
| Alternatives | Derivatives | Options, futures, warrants (position + margin) |
| | Private markets | PE/VC/credit funds, AIF Cat I/II/III |
| | Other | Royalties, litigation finance, farmland, carbon credits |
| Insurance/Retirement | Retirement | EPF, PPF, NPS, 401k, IRA, pension, superannuation, gratuity |
| | Insurance-linked | ULIP, endowment, annuity, whole life (cash value) |
| Digital | Crypto | Coins, stablecoins, staked positions, LP tokens, NFTs |
| Liabilities | Secured | Home loan, LAS, gold loan, margin debt |
| | Unsecured | Personal loan, credit card revolve, BNPL |

**Why this matters:** the taxonomy is not cosmetic. It drives risk weighting, tax treatment, liquidity scoring, benchmark selection, and projection modelling. Adding a ninth L1 later is a migration; adding an L3 is a config change. Design it once.

### 3.2 Canonical data model

Six core entities. Everything else is derived.

```
Household ──< Member ──< Account ──< Position
                            │
                            └──< Transaction ──> Instrument
                                                    │
                                                    └──< Classification (versioned)
                                                    └──< PriceHistory
                                                    └──< CorporateAction
```

**Instrument** is the hard one. Identity resolution across statements is the single biggest source of silent error.

- **Primary key:** ISIN where it exists
- **Fallbacks, in order:** AMFI scheme code (India MFs) → ticker + MIC exchange code → CUSIP/SEDOL → fuzzy name match against a curated alias table → new instrument with `needs_review` flag
- **Never** key on name alone. "HDFC Mid-Cap Opportunities Fund - Direct - Growth" appears in at least six spellings across statements from the same registrar.

**Transaction** must be lot-aware from day one. Retrofitting tax-lot tracking is a rewrite.

```
Transaction {
  id, account_id, instrument_id, type, trade_date, settle_date,
  quantity, price, gross_amount, fees, taxes_withheld,
  currency, fx_rate_at_trade, base_currency_amount,
  lot_id, source_document_id, source_page, confidence,
  corporate_action_adjusted: bool
}
```

**Transaction types (closed vocabulary):** BUY, SELL, DIVIDEND, INTEREST, COUPON, MATURITY, SIP_INSTALMENT, SWITCH_IN, SWITCH_OUT, BONUS, SPLIT, MERGER_IN, MERGER_OUT, RIGHTS, BUYBACK, TRANSFER_IN, TRANSFER_OUT, FEE, TAX, MARGIN_CALL, VEST, EXERCISE, LAPSE, REVALUATION, CONTRIBUTION, WITHDRAWAL.

Anything that can't be mapped to one of these goes to review. Never invent a type at runtime.

**Corporate actions** deserve their own subsystem. A 1:1 bonus that isn't processed makes your XIRR look catastrophic and your cost basis wrong forever. The system must be able to *replay* a position's history after a late-discovered corporate action and recompute everything downstream.

### 3.3 Household and identity

```
Household {
  members[], base_currency, tax_residencies[], 
  shared_goals[], visibility_matrix
}

Member {
  name, DOB, PAN/TIN, tax_residency, risk_tolerance,
  accounts[], privacy_scope
}
```

**Privacy scopes:** `PRIVATE` (member only), `HOUSEHOLD_AGGREGATE` (contributes to totals, individual holdings hidden), `HOUSEHOLD_FULL`. Enforced in the data access layer so a bug in a chart component can't leak a position.

**Joint holdings** need explicit ownership fractions or you double-count at household level. A joint demat is 50/50 by default, overridable.

**Shared with Miso.** The household and identity layer is not built fresh — it is the *same* household that already exists in Miso, extended. See §17B for the shared-namespace design. The important consequence for this module: **household membership and financial visibility are separate grants.** A child or a parent can be a full Miso household member with `ledger: none`. Being in the house does not mean seeing the money.

---

## 4. Module A — Document ingestion & classification

This is the moat. Budget 40% of build effort here.

### A.1 Supported document families

| Family | Examples | Difficulty |
|---|---|---|
| Consolidated statements | NSDL/CDSL CAS, MF Central, Karvy/CAMS | Medium — semi-structured, password-protected |
| Broker statements | Contract notes, ledger, holdings, P&L | High — every broker differs |
| Bank statements | Savings, FD advice, interest certificates | Medium |
| Credit card statements | Monthly bills | Medium |
| Retirement | EPF passbook, NPS statement, 401k/IRA statements | Medium |
| Insurance | ULIP/endowment annual statements | High — opaque, deliberately |
| Foreign brokerage | Schwab, IBKR, Alpaca, Fidelity, 1099/1042-S | Medium |
| Crypto | Exchange CSVs, wallet exports | Low (CSV) / High (on-chain) |
| Property & alternatives | Sale deeds, rent agreements, valuation reports | High — mostly manual assist |
| Tax documents | Form 16, AIS/TIS, 26AS, 1099-B, W-8BEN | Medium — high value |

### A.2 The extraction pipeline

```
Upload → Classify → Split → Extract → Normalise → Reconcile → Review → Commit
```

1. **Classify** — what kind of document is this, from which institution, covering what period? A small classifier on the first page's text + layout signature. Deterministic where possible (institution letterheads are stable); LLM fallback.

2. **Split** — one PDF often contains multiple logical statements (a CAS has one section per AMC). Split into logical units before extraction.

3. **Extract** — three-tier strategy:
   - **Tier 1 (deterministic):** for known formats, a hand-written parser keyed to the layout template. Fastest, cheapest, 100% reliable. Build these for your top 10 document types.
   - **Tier 2 (structured LLM):** vision-capable model with a strict JSON schema, temperature 0, one page at a time. For unknown or drifting formats.
   - **Tier 3 (human):** review queue with the PDF page rendered side-by-side with the extracted fields.
   
   Tier 2 output *always* passes through Tier 4 below before it's trusted.

4. **Reconcile (the critical step)** — deterministic arithmetic checks that catch LLM errors:
   - `units × NAV ≈ stated value` (tolerance 0.5%)
   - `opening balance + Σ transactions = closing balance`
   - `Σ line items = stated total`
   - Date within statement period
   - Quantity signs consistent with transaction type
   - No duplicate `(instrument, date, quantity, amount)` against existing data
   
   A failed check downgrades confidence and routes to review. **This single mechanism is what makes LLM extraction safe.**

5. **Deduplication** — the same trade appears in a contract note, a ledger, and a CAS. Fuzzy match on `(instrument, trade_date ±2d, quantity, amount ±1%)`. Keep the highest-authority source (CAS > ledger > contract note); mark others as corroborating.

6. **Commit** — with full provenance. Every field stores `source_document_id`, `page`, `bbox`, `extraction_method`, `confidence`.

### A.3 Practical details that decide whether this works

- **Password-protected PDFs:** CAS files are PAN+DOB protected. Store a per-member password hint vault (encrypted at rest), prompt once.
- **Scanned/photographed documents:** OCR pre-pass. Physical share certificates, old FD receipts, property papers.
- **Incremental statements:** the March statement overlaps January's. Idempotent ingestion is mandatory — re-uploading the same document must be a no-op.
- **Amendment handling:** a corrected statement supersedes the original. Version, don't overwrite.
- **Coverage map:** the UI shows a calendar heatmap of which accounts have statement coverage for which months. Gaps are *visible*, so the user knows the XIRR is provisional. This is P8 in action and almost nobody does it.

---

## 5. Module B — Manual entry & assisted capture

Document-preferred, manual-possible. Manual entries are tagged as such and shown with a distinct visual treatment.

- **Asset-class-specific forms.** Adding a property is not the same shape as adding a stock. Fifteen templates, not one generic form.
- **Photo capture** — snap a physical document, it goes through the same pipeline.
- **Bulk paste / CSV** with column mapping memory.
- **Estimated-value assets** (property, gold, art): store a valuation *series*, not a single number, each with `date`, `source` (self-estimate / circle rate / broker quote / formal valuation), and `confidence`. Show unrealised gains on illiquid assets with a permanent caveat band.
- **Assisted backfill** — for a manually-added holding, the system offers to reconstruct price history from public data so charts and metrics work.

---

## 6. Module C — Metrics engine

Two families, and conflating them is the most common error in retail finance apps.

### C.1 Return metrics

| Metric | What it answers | Notes |
|---|---|---|
| **XIRR (money-weighted)** | "What did *I* earn?" | Includes your timing decisions. The honest personal number. |
| **TWR (time-weighted)** | "How good was the *investment*?" | Strips out cashflow timing. Use for comparing against benchmarks. |
| **Absolute return** | Simple gain | For short holdings where XIRR is unstable |
| **CAGR** | Smoothed annualised | Only valid for single-cashflow holdings |
| **Realised vs unrealised split** | Tax-relevant | Feeds Module J |

**Show both XIRR and TWR side by side, with a one-line explanation of the gap.** The gap *is* an insight: a large XIRR < TWR gap means bad timing (buying after run-ups). That single diagnostic is more useful than most of what these apps display.

### C.2 Risk metrics

- Annualised volatility (σ), rolling 1/3/5y
- Max drawdown + current drawdown + recovery time
- Sharpe, Sortino, Calmar
- Beta and alpha vs assigned benchmark
- Up-capture / down-capture ratios
- Value at Risk (95%, historical simulation — not parametric)
- **Concentration:** Herfindahl index at instrument, sector, and issuer level
- **Correlation matrix** across holdings, with a "diversification illusion" flag when nominally-different holdings correlate >0.85
- **Portfolio overlap:** for any two funds, the % of common underlying holdings by weight. This is the highest-signal, least-implemented feature in retail portfolio tools.

### C.3 Cost & drag

- Weighted expense ratio, and its cumulative rupee cost over holding period
- Exit loads paid
- Transaction cost drag
- **Tax drag** — realised tax as % of gross return
- **Direct vs regular delta** — for Indian MFs, the cumulative cost of holding a regular plan. Usually a genuinely shocking number.

### C.4 Time evolution

Every metric above is stored as a **daily time series**, not a current value. This gives you:

- Net worth over time, decomposed into **contributions vs market movement vs FX** (three separate bands — most apps show one line and it's meaningless)
- Asset allocation drift chart
- Rolling 12-month return ribbon
- Metric-vs-metric evolution (e.g. did volatility rise as you added mid-caps?)
- **Point-in-time replay** — "what did my portfolio look like on 12 March 2024?"

### C.5 Multi-currency

Store every transaction in both native and base currency, with the FX rate at trade date. Then decompose returns:

```
Total return = Asset return (local) + FX return + Interaction
```

For anyone holding foreign assets, this decomposition answers "did I make money on the stock or on the dollar?" — which is usually the more important question.

---

## 7. Module D — Classification lenses

Every holding gets tagged across independent dimensions. The user then slices the portfolio by any of them.

| Lens | Values |
|---|---|
| **Risk grade** | 1–7 scale (volatility-banded, PRIIPs-style), computed not declared |
| **Market cap** | Mega / Large / Mid / Small / Micro (jurisdiction-specific definitions, effective-dated) |
| **Style** | Value / Blend / Growth × cap → 9-box style grid |
| **Factor exposure** | Value, Momentum, Quality, Size, Low-vol, Yield (regression-derived, shown as loadings) |
| **Sector** | GICS L1–L4 |
| **Geography** | Domicile of listing *and* revenue geography (these differ enormously — an Indian IT stock is a US-revenue asset) |
| **Currency exposure** | Actual FX exposure, not nominal denomination |
| **Liquidity tier** | T+0 / T+1 / T+3 / <30d / lock-in (with expiry date) / illiquid |
| **Time horizon** | Which goal/bucket this is earmarked for |
| **Tax bucket** | Taxable / tax-deferred / tax-free wrapper |
| **Theme** | AI, energy transition, defence, consumption, financialisation, healthcare, infra, etc. |
| **Conviction** | User-declared core / satellite / speculative |
| **Income character** | Growth / income / hybrid, with yield |

**Crucially: look through funds.** A user holding four equity funds doesn't own four things, they own ~180 companies with heavy overlap. The system should decompose fund holdings to the underlying security level (monthly portfolio disclosures) and classify *those*. Then the honest top-10 holdings list — which is the one that reveals a 14% single-stock concentration the user had no idea about.

---

## 8. Module E — Investment calendar

A unified date engine. Sources: instrument metadata, corporate action feeds, statement-derived schedules, and tax calendars.

**Event types**

- **Income:** dividend ex-date / record / pay date; bond coupon; FD interest credit; rent due
- **Corporate actions:** splits, bonuses, rights, buybacks, mergers, delistings, AGM/EGM voting
- **Maturity & lock-in:** FD/bond/NCD maturity; ELSS 3-year unlock; SGB 5-year exit window and 8-year maturity; PPF partial withdrawal eligibility; NPS milestones; ULIP 5-year lock; AIF lock-ins
- **Recurring commitments:** SIP debit dates, insurance premiums, loan EMIs, capital calls
- **Tax dates:** advance tax instalments, filing deadlines, TDS certificate availability, harvest windows
- **Vesting:** ESOP/RSU vest dates, cliff dates, exercise expiry
- **Personal:** review reminders, rebalance dates, goal target dates

**What makes it more than a calendar:**

- **Cashflow forecast overlay** — a 12-month forward chart of expected inflows (dividends, maturities, coupons) vs outflows (SIPs, premiums, EMIs, capital calls, advance tax). Net liquidity by month. This is the feature that prevents the "thin liquid buffer" problem from being discovered too late.
- **Decision-required flagging** — a maturing FD isn't just an event, it's a decision. Events carry an `action_required` flag and open into a decision card.
- **Historical view** — did last year's expected dividends actually arrive? Reconciles forecast against statements.

---

## 9. Module F — News & market watch (7-day rolling)

**Scope rule: only news that maps to something you own, something you're screening, or a macro factor your portfolio is exposed to.** No general market noise. This is the discipline that makes the page readable.

**Pipeline (daily batch):**

1. **Fetch** — for each held instrument, its issuer, its sector, and each active macro factor. Sources: exchange filings (highest authority), regulator announcements, company IR, wire services, quality financial press.
2. **Cluster** — deduplicate the eleven versions of the same story into one event.
3. **Link** — resolve entities to your instrument IDs. An article about a subsidiary must link to the parent you hold.
4. **Score relevance** — `position_weight × materiality × source_authority × recency`.
5. **Classify** — Earnings / Regulatory / Management change / M&A / Credit event / Product / Litigation / Macro / Fund-specific (manager change, mandate change, AUM, SEBI action).
6. **Summarise** — 2-line neutral summary, plus an explicit **"why this matters to you"** line that names your exposure in rupees.
7. **Expire** — 7-day rolling window, but *material* events (regulatory action, manager exit, credit downgrade) get promoted to a persistent **Instrument Dossier** so the history survives.

**Presentation:** grouped by holding, sorted by relevance score, with an "impact" chip (High/Medium/Low) and a link to the affected position. A weekly digest that says "3 things changed this week that affect ₹X of your portfolio" is worth more than a scrolling feed.

**Explicit anti-feature:** no sentiment score presented as a number. Sentiment scoring on financial news is noise dressed as signal.

---

## 10. Module G — Investor profile & gap analysis

### G.1 Derived profile

The profile is **inferred from behaviour, not from a questionnaire.** Questionnaires measure what people say; the portfolio measures what they do. Show both and let the gap be the insight.

**Risk archetype** — derived from realised portfolio volatility, equity share, small/mid tilt, concentration, leverage, and behaviour during past drawdowns (did they add or redeem?).

Named tiers, roughly:

| Archetype | Signature |
|---|---|
| **The Vault** | Capital preservation, >70% fixed income, low vol |
| **The Anchor** | Conservative balanced, income-oriented |
| **The Keel** | Balanced, disciplined, index-heavy |
| **The Compounder** | Growth-oriented, high equity, long holding periods, low churn |
| **The Prospector** | Aggressive, small/mid tilt, thematic concentration |
| **The Voyager** | High conviction, concentrated, tolerant of deep drawdowns |
| **The Alchemist** | Leverage, derivatives, alternatives, non-linear payoffs |

**Behavioural profile** — separate from risk. Derived from transaction patterns:
- Churn rate and average holding period
- Timing quality (XIRR vs TWR gap)
- Discipline score (SIP consistency, missed instalments)
- Loss-realisation asymmetry (do they sell winners and hold losers? — the disposition effect, directly measurable)
- Drawdown behaviour
- Cash drag (idle balances)

**Thematic profile** — what the portfolio is actually *betting on*, look-through to underlying holdings. Presented as a weighted theme map with named exposures ("You are 23% a bet on Indian financialisation, 11% on global AI infrastructure, 9% on domestic consumption").

Naming matters here. "Moderate-aggressive investor, risk score 6.4" is forgettable. "**The Compounder, with a Prospector's mid-cap tail**" is memorable and, more importantly, arguable — which prompts engagement.

### G.2 Gap analysis

Compare the actual portfolio against:
1. **A model portfolio** for the declared risk profile and horizon
2. **The efficient frontier** given current holdings — what's the minimum-change move to better risk-adjusted return?
3. **Structural absences** — asset classes, geographies, currencies, factors, and duration buckets with zero or near-zero exposure

**Output format** — not a product recommendation, but a *question*:

> "You have no exposure to international equity outside the US, and no exposure to duration beyond 3 years. Both are deliberate choices for some investors. Are they deliberate for you?"

Then, if the user says "not deliberate," show the *category* options with trade-offs — never a specific product pick. That line matters both ethically and legally.

---

## 11. Module H — Risk & action engine

This is the reasoning layer. Every flag follows a fixed structure so it's auditable and never feels like a black box.

### H.1 Flag structure

```
Flag {
  code, severity (Critical/High/Medium/Watch),
  affected_positions[], exposure_amount,
  signal:        what triggered it (the rule, stated plainly)
  evidence:      the specific numbers and dates
  reasoning:     why this matters, in context of THIS portfolio
  confidence:    High / Medium / Low + what would raise it
  options[]:     2-4 courses of action with consequences
  counter_case:  the strongest argument for doing nothing
  tax_impact:    from Module J
  first_raised, times_raised, user_disposition
}
```

The `counter_case` field is the most important one in this memo. It's what separates an analyst from a nag.

### H.2 Reasoning category taxonomy

| Code | Category | Example trigger |
|---|---|---|
| **PERF-01** | Sustained benchmark underperformance | Trailing 3y alpha < 0 for 8 consecutive quarters |
| **PERF-02** | Peer quartile deterioration | Fund fell to Q4 for 3+ consecutive periods |
| **PERF-03** | Risk-adjusted decay | Sharpe declining while volatility rises |
| **PERF-04** | Downside capture breach | Down-capture >110% for a fund sold as defensive |
| **STRUCT-01** | Mandate drift | Portfolio composition diverged from stated category |
| **STRUCT-02** | Manager change | Fund manager exit + performance change post-exit |
| **STRUCT-03** | Capacity strain | AUM growth outpacing strategy capacity, esp. small-cap |
| **STRUCT-04** | Strategy crowding | Fund's holdings now widely held; alpha source eroding |
| **RISK-01** | Single-name concentration | Look-through exposure to one issuer >X% |
| **RISK-02** | Sector concentration | Sector weight >2× benchmark |
| **RISK-03** | Correlation clustering | "Diversified" holdings with pairwise ρ >0.85 |
| **RISK-04** | Drawdown breach | Current drawdown exceeds stated tolerance |
| **RISK-05** | Leverage exposure | Margin/derivative exposure vs net worth |
| **RISK-06** | Currency concentration | Unhedged FX exposure beyond threshold |
| **RISK-07** | Duration mismatch | Bond duration vs stated horizon |
| **CREDIT-01** | Credit quality deterioration | Downgrade in held instrument or fund's underlying |
| **CREDIT-02** | Issuer concentration | Multiple funds holding the same stressed issuer |
| **LIQ-01** | Liquidity mismatch | Illiquid share of portfolio vs 12m cashflow needs |
| **LIQ-02** | Emergency buffer shortfall | Liquid assets < N months of expenses (from Module K) |
| **LIQ-03** | Lock-in cliff | Large simultaneous lock-in expiries or entries |
| **COST-01** | Expense drag | TER above category median, cumulative cost quantified |
| **COST-02** | Plan inefficiency | Regular plan where direct is available |
| **COST-03** | Churn cost | Transaction + exit load + tax cost of trading behaviour |
| **TAX-01** | Harvest opportunity | Unrealised loss usable against realised gains |
| **TAX-02** | Holding-period cliff | Days from a favourable tax threshold |
| **TAX-03** | Tax-inefficient placement | High-tax asset in taxable wrapper while tax-free space is unused |
| **GOV-01** | Regulatory/governance event | Regulator action against AMC, auditor exit, promoter pledge |
| **ALLOC-01** | Allocation drift | Class weight beyond ±X% of target band |
| **ALLOC-02** | Redundancy | Portfolio overlap >70% between two funds |
| **ALLOC-03** | Coverage gap | Zero exposure to a class in the model allocation |
| **BEHAV-01** | Disposition effect | Systematically realising gains, holding losses |
| **BEHAV-02** | Timing drag | XIRR materially below TWR |
| **BEHAV-03** | Cash drag | Idle cash beyond buffer requirement for >90 days |
| **BEHAV-04** | SIP lapse | Missed or stopped instalments |
| **MACRO-01** | Regime sensitivity | Portfolio's dominant factor exposure vs changed macro regime |
| **MACRO-02** | Rate sensitivity | Duration + rate-sensitive equity vs rate cycle |
| **DATA-01** | Coverage gap | Missing statements distorting metrics |
| **DATA-02** | Stale valuation | Illiquid asset not revalued in >12 months |

**Severity is a function of `exposure_amount × signal_strength × reversibility`, not of category.** A COST-02 flag on ₹40 lakh outranks a PERF-01 flag on ₹50,000.

### H.3 Behaviour rules

- **Suppression:** once a user dismisses a flag with a reason, it stays suppressed until the underlying evidence materially changes. Nothing is more corrosive than an app repeating the same nag.
- **Escalation ladder:** Watch → Medium → High only on sustained deterioration, never on a single bad quarter.
- **Minimum evidence periods:** no performance flag before 3 years of data. Prevents the app from encouraging exactly the churn it should discourage.
- **Flag budget:** maximum 5 active flags shown at once, ranked. An app with 40 warnings has zero warnings.

---

## 12. Module I — Visualisation & projections

### I.1 Charts that earn their place

- **Net worth river** — stacked area by asset class over time, with the contributions/market/FX decomposition toggle
- **Allocation sunburst** — L1→L2→L3→instrument, drillable
- **Style grid heatmap** — 9-box with bubble sizing
- **Risk-return scatter** — every holding plotted on σ vs return, with the portfolio point and the efficient frontier curve
- **Drawdown underwater chart** — the single most honest chart in finance
- **Correlation heatmap** with clustering dendrogram
- **Cashflow waterfall** — contributions, gains, income, fees, taxes, withdrawals → ending value. This decomposition is where most people first understand where their money actually went.
- **Sankey** — money flow from income → accounts → asset classes → returns
- **Rolling return ribbon** — 1y/3y/5y rolling returns to kill recency bias
- **Overlap chord diagram** — fund-to-fund common holdings
- **Calendar heatmap** — daily/monthly returns, and separately, statement coverage
- **Goal progress rings** — actual vs required trajectory

Design constraint: **one message per chart.** If a chart needs a paragraph to explain, it's the wrong chart.

### I.2 Projections

Three named bands, but built on real machinery, not three hardcoded growth rates.

**Method:** Monte Carlo, 10,000 paths, using **block bootstrap** from historical returns (preserves autocorrelation and fat tails, unlike a normal distribution) at the asset-class level, with the portfolio's actual correlation matrix. Layer on: known future cashflows from Module E, inflation, taxes from Module J, and fee drag.

**Presentation:**

| Band | Percentile | Framing |
|---|---|---|
| **Pessimistic** | P10 | "In the worst 1-in-10 outcomes, you end near ₹X" |
| **Moderate** | P50 | "The central outcome is ₹Y" |
| **Optimistic** | P90 | "In the best 1-in-10 outcomes, ₹Z" |

Plus a fan chart showing the full distribution over time, not just three lines.

**Non-negotiable additions:**
- Every projection displays its **assumptions panel** — expected returns by class, inflation, contribution rate, time horizon — all user-editable. A projection whose assumptions are hidden is a lie.
- **Deterministic stress scenarios** alongside the stochastic ones: 2008-style equity drawdown, a 300bp rate shock, 20% INR depreciation, a personal income stop for 12 months. These test resilience, which Monte Carlo averages away.
- **Goal probability** — "Given current contributions, P(reaching ₹X by 2040) = 68%" and, critically, the sensitivity: "raising monthly contribution by ₹15,000 moves this to 81%."

---

## 13. Module J — Taxation

Rules engine, not hardcoded logic. Country packs with effective-dated rules.

### J.1 Architecture

```
TaxRule {
  jurisdiction, asset_class, holding_period_threshold,
  rate, exemption_limit, indexation_allowed,
  effective_from, effective_to, source_reference
}
```

Because rules change, and last year's gain must always be computed under last year's law. This is why P7 exists.

### J.2 India pack (seed rules — verify against current Finance Act before relying on any number)

| Asset | Short-term | Long-term | Threshold |
|---|---|---|---|
| Listed equity / equity MF | 20% | 12.5%, with an annual exemption on LTCG | 12 months |
| Debt MF (acquired post-Apr 2023) | Slab rate | Slab rate | N/A |
| Unlisted shares | Slab | 12.5% | 24 months |
| Property | Slab | 12.5% (indexation option for older acquisitions) | 24 months |
| Gold / SGB / gold ETF | Slab or 12.5% depending on instrument & date | 12.5% | 12–24 months |
| Foreign shares | Slab | 12.5% | 24 months |
| Crypto (VDA) | 30% flat, no loss set-off | Same | N/A |

Plus: dividend taxed at slab with TDS above a threshold; Section 54/54F/54EC reinvestment exemptions; grandfathering of pre-Feb-2018 equity gains; ELSS lock-in; Schedule FA foreign asset disclosure; advance tax instalment schedule.

### J.3 Features

- **Live realised gain/loss ledger** — YTD, split ST/LT, per member, with lot-level detail
- **Unrealised gain map** with days-to-LTCG countdown per lot
- **Tax-loss harvesting engine** — identifies harvestable losses, computes the benefit, checks for wash-sale-equivalent restrictions, and ranks by net benefit after transaction cost
- **Threshold optimiser** — "realise ₹X of gains before 31 March to use the remaining exemption; the tax saved is ₹Y"
- **Sell-order simulator** — before any sale, show the exact tax under FIFO and under any permitted alternative lot-selection method
- **Foreign asset compliance** — flags holdings requiring Schedule FA / FBAR / equivalent, with the data pre-assembled
- **Filing pack export** — a per-member, per-FY bundle: capital gains schedule, dividend income, foreign assets, in a format a CA can consume directly. This alone justifies the app for many households.
- **Multi-jurisdiction** — if household members have different tax residencies, compute separately and flag DTAA-relevant items

**Standing disclaimer, prominently:** this is computation and information, not tax advice. Output goes to a professional for filing.

---

## 14. Module K — Spending & cashflow intelligence

Uploaded statements only (bank + credit card). No SMS parsing, no account linking.

- **Merchant normalisation** — "AMZN MKTP IN*2H4KD" → Amazon. A learned mapping table plus LLM fallback for unknowns, with user correction that persists.
- **Category taxonomy** — standard tree, user-extensible, with rules ("anything from this merchant → Groceries") that apply retroactively.
- **The critical join: spending → investing.** Detect and reclassify:
  - SIP debits, brokerage transfers, insurance premiums → **not spending, these are investments**. Most spending apps get this catastrophically wrong and show a person as spending 60% of income when a third of it is savings.
  - Loan EMIs → split principal (net worth neutral) vs interest (true expense)
  - Property tax, maintenance, insurance on an asset → **carrying cost**, attributed to that asset so its true net yield is visible
- **Derived metrics:** savings rate, investment rate, fixed vs discretionary split, expense volatility, category trends, **months of runway** (feeds LIQ-02)
- **Credit card intelligence:** utilisation, revolving-balance detection (a person paying 42% APR while holding equity funds is the highest-return "investment decision" in the whole app), reward optimisation, annual fee vs benefit realised, subscription creep detection
- **Household expense view** with member attribution and shared-expense splitting
- **The closing loop:** `Income − Expenses − Investments = Δ Cash`. If this doesn't reconcile against actual bank balances, there's a data gap — and the app should say so rather than hide it.

---

## 14B. Information architecture — how this stops being cluttered

Thirteen modules is a specification, not a navigation menu. The failure mode for every app in this category is that each feature earns a screen, and the user opens it to fourteen tabs and closes it forever. This section is the counter-pressure.

### 14B.1 The organising principle

**Cluster by cadence and intent, not by data type.** Almost every finance app organises by object — Holdings, Transactions, Reports, Analysis — which mirrors the database, not the human. Organise instead by how often someone needs the thing and what they're trying to do:

| Cadence | Duration | Intent | Where it lives |
|---|---|---|---|
| Daily | 8 seconds | "Anything wrong?" | Tab 1, top of screen |
| Weekly | 2 minutes | "What changed, what's coming" | Tab 1, scrolled |
| Monthly | 10 minutes | "Feed it new statements" | The Add action |
| Quarterly | 30 minutes | "Study it properly" | One level *inside* tabs 2 and 3 |
| Annually | Hours | "File taxes" | Tab 4, seasonally promoted |

Anything quarterly or rarer must not occupy prime real estate. The correlation heatmap is a real feature and it belongs three taps deep.

### 14B.2 Navigation map

Four tabs and a centre action. Mobile-first at 390px, same shell as Miso.

```
┌─────────────────────────────────────────────────────────┐
│  [Household ▾  All · Vinod · Keerthana]        [⚙ / 👤] │  persistent
└─────────────────────────────────────────────────────────┘

  TODAY          PORTFOLIO        (+)         INSIGHTS      MONEY
  what changed   what I own      add        what it means   what it costs
```

**Rule: the tab bar never grows.** New capability attaches inside an existing tab or it doesn't ship.

---

### 14B.3 Screen inventory

#### ▸ TAB 1 — TODAY *(the 8-second screen)*

The only screen that must work at a glance. Hard limit of **three change-cards**.

```
Net worth ₹X,XX,XX,XXX
▲ ₹XX,XXX today   ▲ X.X% this month
[sparkline, 90 days]

WHAT CHANGED  ────────────────── max 3 cards
  ⚠ HIGH   Axis ELSS · manager exit          ₹2.1L affected
  📰       3 news items across 2 holdings
  📅       HDFC Mid Cap SIP debits Thursday

NEXT 7 DAYS  ─────────────────── horizontal strip
  Mon · Thu · Sat markers only

NEEDS YOU  ────────────────────── only if non-empty
  4 extracted transactions awaiting review
  No statement from ICICI since March
```

Opens into: News feed (7-day, §9) · Flag decision screen · Event detail · Review queue.

News is **not a tab.** It's a 7-day feed reached from one Today card. Giving expiring content permanent navigation is how feeds become obligations.

#### ▸ TAB 2 — PORTFOLIO *(what I own)*

One screen, many lenses. This is the single most important anti-clutter decision in the app.

```
₹X,XX,XX,XXX          XIRR 11.4%  ⇄  TWR 13.1%
                      ↑ tap to swap, gap explained in one line

[ Allocation sunburst / treemap — tappable, drillable ]

LENS  ─── horizontal chip row, single-select ───────────
[Class] [Risk] [Cap] [Sector] [Geography] [Liquidity]
[Theme] [Style] [Currency] [Member] [Conviction]

HOLDINGS ─── list, sorted by weight, re-groups by lens ──
```

**The thirteen classification lenses from §7 are filter chips on one screen, not thirteen screens.** Selecting a chip re-groups the same visual and the same list. The user learns one interaction and gets thirteen views.

Level 3 — **Position detail**: price chart, your transaction history on it, all classifications, tax lots with days-to-LTCG, any flags attached, source documents.

Level 3 — **Analysis** *(deliberately one tap down)*: drawdown underwater, correlation heatmap, fund-overlap chords, risk-return scatter, rolling-return ribbon, style grid. This is the quarterly-cadence material. Burying it is intentional; it is also where the real depth lives, so the entry point should be a clear button, not a hidden gesture.

#### ▸ TAB 3 — INSIGHTS *(what it means)*

Where the app speaks. Ordered by how confronting it is.

```
NEEDS A DECISION ─── max 5, ranked by exposure × severity
  cards → full decision screen

YOUR PROFILE
  "The Compounder, with a Prospector's mid-cap tail"
  thematic map: 23% financialisation · 11% AI infra · 9% consumption

WHAT YOU'RE MISSING
  gap analysis, framed as questions not products

WHERE THIS GOES
  fan chart · P10 / P50 / P90 · [Assumptions ▾]
```

Level 3 — **Flag decision screen**, one per flag, the full §11.1 structure: signal, evidence, reasoning, confidence, options with consequences, **counter-argument**, tax impact, and Act / Snooze / Dismiss-with-reason.

Level 3 — **Assumptions editor** and **stress scenarios**.

#### ▸ TAB 4 — MONEY *(what it costs)*

The flows tab, as against Portfolio's stocks tab. That's the clean conceptual line: Portfolio is balance-sheet, Money is cashflow.

```
THIS MONTH
  In ₹X · Out ₹Y · Invested ₹Z
  Savings rate XX%  ·  Runway X.X months

CALENDAR                    full month grid, §8
SPENDING                    categories, trends, cards
TAXES                       seasonally promoted
```

The **Taxes** block sits quiet from August to December and rises to the top of this tab from January through July, with the filing-pack export front and centre in June–July. Seasonal promotion is how you avoid a permanent tax tab that's dead ten months a year.

#### ▸ CENTRE — ADD *(a sheet, not a screen)*

```
📄  Upload statement
📷  Snap a document
✍️  Add manually
📥  Review queue  (4)
```

The review queue lives here with a badge, because reviewing extractions is the same mental mode as adding them.

#### ▸ SETTINGS — top-right, never a tab

Household & members · privacy scopes · targets and bands · goals · tax residency · base currency · credits & BYOK · data feeds · coverage map · export.

---

### 14B.4 The rules that keep it clean

| # | Rule | Why |
|---|---|---|
| **N1** | **Three levels maximum** — Tab → Detail → Drill | Anything needing a fourth level is a sheet or a modal, or it's badly scoped |
| **N2** | **One hero number per screen** | If two numbers compete for dominance, the screen has two jobs |
| **N3** | **Lenses are chips, not screens** | Thirteen classifications, one interaction |
| **N4** | **Max 3 cards on Today, max 5 flags in Insights** | An app with 40 warnings has zero warnings (§11.3) |
| **N5** | **Max 4 charts per screen** | Beyond that nobody reads any of them |
| **N6** | **One message per chart** | If it needs a paragraph, it's the wrong chart (§12.1) |
| **N7** | **The tab bar is frozen at four** | Growth goes inward, never sideways |
| **N8** | **Household switcher is a persistent control** | Not a screen, not a setting. Top of every screen, applies globally, persists between sessions |
| **N9** | **Badges only for review queue and Critical flags** | Badge inflation trains people to ignore badges |
| **N10** | **Seasonal promotion over permanent placement** | Tax, rebalancing, and year-end harvesting surface when relevant and recede when not |
| **N11** | **Every screen states its coverage** | If the data behind it is partial, the screen says so (P8) |

### 14B.5 Glance mode and Study mode

The tension in this product is that it must be readable by a spouse who opens it monthly *and* deep enough for someone who wants a correlation matrix.

**Solve it with a mode, not a compromise.** Portfolio and Insights carry a `Glance ⇄ Study` toggle:

- **Glance** (default): allocation, holdings, XIRR, three flags. No jargon without a tap-to-define.
- **Study**: adds factor loadings, capture ratios, HHI, tracking error, lot-level tax detail, benchmark selection controls.

The setting is **per member**, not per household. Same data, two densities. This is what lets the app be genuinely useful to two people with very different appetites without shipping two products.

### 14B.6 Progressive reveal on cold start

An app that shows all four tabs on day one with three of them empty feels broken.

| State | What's visible |
|---|---|
| No data | Today (an invitation) + Add only |
| First statement processed | Portfolio unlocks |
| ≥3 months coverage | Money unlocks (cashflow needs history to mean anything) |
| ≥12 months coverage | Insights unlocks — flags need §11.3's minimum evidence periods anyway |
| ≥3 years coverage | Projections and performance flags unlock |

The gating isn't a growth trick — it's honest. A flag engine running on six weeks of data would generate confident nonsense. Tie the reveal to the same evidence thresholds the analytics already require.

### 14B.7 Wide layout

On tablet and desktop PWA, do **not** stretch the mobile layout. Two panes:

```
┌──────────┬────────────────────────────────────┐
│ Nav +    │  Detail                            │
│ list     │  (position, flag, tax year,        │
│          │   review item)                     │
└──────────┴────────────────────────────────────┘
```

The review queue in particular needs width — PDF page on the left, extracted fields on the right, side by side. That screen is genuinely bad on a phone and should say so, suggesting the user do bulk review on a larger screen.

### 14B.8 The attention budget

Push notifications are the fastest way to make this app feel like a nag. Four events qualify, total:

1. A **Critical** flag opens (credit event, regulatory action, drawdown breach)
2. A statement processed and **needs review**
3. A calendar event with `action_required` inside 48 hours
4. The **weekly digest**, one fixed time, user-chosen day

Nothing else. Not price moves, not daily net worth, not "your portfolio is up today." Those are exactly the notifications that produce the behaviour this app exists to discourage.

### 14B.9 What is deliberately not a screen

- **News** — a feed inside Today, expires in 7 days
- **Transactions** — no global transaction list. Transactions belong to a position or a document; a flat ledger view is a debugging tool, not a user feature (put it in Settings → Data)
- **Reports** — no report builder. Export lives in Settings and in the tax filing pack
- **Search** — one global search field in the header, not a destination
- **Goals** — attached to allocations and shown in Insights projections, not a separate tracker
- **Watchlist** — this is a portfolio app, not a trading app. Screening ideas belongs to Module G's gap analysis, framed as categories

### 14B.10 Making it genuinely easy to use

Finance apps are hostile by default: they assume vocabulary, punish mistakes, and show empty dashboards to new users. Eleven rules against that.

| # | Rule | What it means concretely |
|---|---|---|
| **U1** | **Plain language is the default; jargon is opt-in** | "What I earned" is the label. "XIRR" appears as a small tag beside it. Study mode flips the emphasis. |
| **U2** | **Every financial term is tappable** | Tap any term → one-sentence plain definition in a sheet, with a "why it matters here" line using *your* numbers. Glossary served as a content pack, so it improves without an app release. |
| **U3** | **Value before data entry** | The first screen after sign-in is not an empty dashboard. Upload one statement → within 90 seconds see real holdings, real allocation, one real observation. Miso's archetype-seed principle, applied here. |
| **U4** | **Never show an error — show the next step** | "Couldn't read pages 3–4" is useless. "Pages 3–4 need your eyes — 2 minutes" with a button is not. |
| **U5** | **Undo, not confirm** | No "Are you sure?" dialogs. Perform the action, show a 5-second undo. Exceptions: deleting an account, exporting data. |
| **U6** | **One-thumb reachable** | Every primary action sits in the bottom third at 390px. Nothing important in a top corner. |
| **U7** | **Instant perceived speed** | Skeletons not spinners; render cached data first and reconcile silently; optimistic UI on every user action. Firestore's offline cache means the app opens with content even on a dead connection. |
| **U8** | **Empty states invite, never shame** | "Nothing here yet" plus the single action that fixes it. Never a progress bar of things the user hasn't done. |
| **U9** | **Numbers are readable at a glance** | Indian numbering (₹3.93 Cr, not ₹39,300,000) by locale. Tabular figures. Colour is never the only signal — always paired with ▲▼ and a label. |
| **U10** | **Nothing blames the user** | Not "you're underperforming." Instead: "this fund has trailed its benchmark for eight quarters." Describe the holding, not the person. This matters most in Insights, where the app is at its most confronting. |
| **U11** | **Accessible by construction** | Dynamic type support, 4.5:1 contrast minimum, `prefers-reduced-motion` honoured, 44px touch targets, full keyboard nav on wide layout. Same treatment already applied to Miso. |

**The two-minute test:** a first-time user who has never heard the word "allocation" should be able to open the app, upload one PDF, and understand something true about their money inside two minutes. If any screen fails that, it's the screen that's wrong, not the user.

---

## 15. The daily pipeline

One orchestrated batch, roughly 02:00 local. Idempotent, restartable, with per-stage failure isolation.

```
1. INGEST      new documents from the upload queue
2. PRICE       fetch EOD prices, NAVs, FX rates for all held instruments
3. CORPORATE   apply corporate actions; replay affected positions if retroactive
4. VALUE       mark portfolio to market; snapshot positions
5. METRICS     recompute the full metric set; append to time series
6. CLASSIFY    refresh classifications where underlying data changed (monthly for fund look-through)
7. MARKET      pull macro data, sector indices, rate curve, commodity prices
8. NEWS        fetch → cluster → link → score → summarise → expire
9. ANALYSE     run the flag engine across all rules
10. PROJECT    re-run Monte Carlo (weekly, not daily — it's expensive and moves slowly)
11. CALENDAR   refresh event dates, detect new events
12. DIGEST     compose the daily/weekly brief
13. VERIFY     data quality checks; raise DATA-* flags
```

Only stages 1–5 and 9 must run daily. Stages 6, 10 run weekly. This keeps compute cost trivial.

**Where it runs:** **Cloud Scheduler → Pub/Sub → Cloud Run Job**, not Cloud Functions. The nightly batch is Python numerics (pandas, numpy, scipy, Monte Carlo) with long runtimes and real memory needs — outside what event-driven Functions are built for. Cloud Run Jobs give you an arbitrary container, a proper timeout, and the same GCP-native posture as the rest of the stack.

Cloud Functions remain the right tool for the *interactive* path: `uploadStatement`, `commitReviewedExtraction`, `askPortfolio`, `simulateSale`. Request/response, short, auth-checked, credit-metered — exactly the Miso `callMisoAI` pattern.

---

## 16. Where AI is allowed

Explicit boundaries, per P1.

**AI does:**
- Document classification and field extraction (with mandatory arithmetic verification)
- Merchant name normalisation
- News summarisation and relevance explanation
- Entity resolution for ambiguous instrument names
- Narrative generation — turning a computed flag into readable prose
- Natural-language query over the portfolio ("how much did I pay in fees last year?" → translated to a structured query, executed by code, results rendered)
- Explaining a concept on demand

**AI never:**
- Computes a return, tax, valuation, or projection
- Decides a classification that affects tax treatment (it *proposes*, a deterministic rule confirms)
- Generates a number that appears in the UI without a code path behind it
- Makes a buy/sell recommendation on a specific instrument

**Anti-hallucination architecture:** every AI-generated sentence in the UI is templated around computed values. The model fills prose around slots; it doesn't produce the slots. A generated insight that references a number not present in the computed payload is rejected before render.

### 16.1 Model routing — Gemini and Claude

Two models, split by job shape, both behind the same Cloud Function + Secret Manager pattern Miso already uses.

| Job | Model | Why |
|---|---|---|
| Document classification | **Gemini Flash** | Cheap, fast, one call per document |
| Statement extraction | **Gemini Flash** (vision) | Native PDF input, long context, low per-page cost. A CAS is 20–40 pages — this is the volume layer and margin lives here. |
| Merchant normalisation | **Gemini Flash** | High volume, low nuance, batched |
| Instrument name resolution | **Gemini Flash** | Constrained candidate list, near-deterministic |
| News summarisation | **Gemini Flash** | Volume, and it's summarisation not judgement |
| Flag narrative + counter-argument | **Claude Sonnet** | P4 requires arguing both sides credibly. This is the job Claude is distinctly better at and it's low-volume. |
| Investor profile write-up | **Claude Sonnet** | Needs to be readable, hedged correctly, and memorable |
| Gap analysis framing | **Claude Sonnet** | Must pose questions, not push products — tone control matters |
| Weekly household digest | **Claude Sonnet** | One call per household per week. Cheap at any quality tier. |
| NL query → structured query | **Either** | Route by cost; Flash first, Claude on parse failure |

**The economic shape:** Gemini carries ~95% of the calls at ~5% of the value-per-call. Claude carries the handful of outputs the user actually reads and quotes. That's the same free-tier-toward-Flash routing logic already proven in Miso, applied to a different workload.

**Credit model (reuses Miso's meter directly):**

| Action | Cost shape |
|---|---|
| Statement upload | ~1 credit/page, vision path. Bursts at onboarding (years of backlog), then ~4–8 documents/month steady state. |
| Nightly pipeline | **Zero credits.** Entirely deterministic. |
| Weekly digest | 1 Claude call per household |
| Ad-hoc question | 1 credit |
| Flag narratives | Generated only when a flag *changes state*, not nightly |

Same principle as Miso's household engine: **LLM at ingestion and narration, deterministic in between.** Predictable credits, repeatable behaviour. BYOK stays available for the same reasons it does in Miso.

---

## 17. Technical shape — Firebase / GCP

Revised to sit alongside Miso rather than beside it as a foreign system. Everything below is either already running for Miso or is one service away.

| Layer | Choice | Notes |
|---|---|---|
| **Auth** | Firebase Auth — Google + Apple | Shared with Miso. See §17B. |
| **App shell** | Capacitor (iOS/Android/PWA) | Same distribution model as Miso |
| **Frontend** | **Single `index.html`** — React/Preact + `htm`, no build step | Same as Miso. Conditions in §17.2. |
| **Charts** | ECharts (UMD, lazy-loaded) | The chart list in §12 outgrows Recharts by about chart four; visx needs bundling |
| **App database** | Firestore | Household, members, positions, flags, calendar, news, precomputed snapshots |
| **Analytics** | In-memory pandas inside the nightly Cloud Run job | No second database. See §17.1 — the whole ledger is under 10k docs |
| **Documents** | Firebase Storage, dedicated bucket, own rules | Source PDFs, encrypted at rest |
| **Interactive backend** | Cloud Functions (2nd gen) + Secret Manager | Same pattern as `callMisoAI` |
| **Batch pipeline** | Cloud Run Job + Cloud Scheduler | Python numerics; see §15 |
| **AI** | Gemini Flash + Claude Sonnet via Functions | §16.1 |
| **Abuse/integrity** | Firebase App Check | Matters more here than in Miso |
| **Region** | `asia-south1` (Mumbai) | **Decide before creating anything — see §19** |

### 17.1 Firestore at household scale — what's actually true

**Correcting an earlier draft of this memo:** it claimed the time series would run to ~200,000 documents and used that to justify a BigQuery mirror. That number was wrong and the conclusion didn't follow. Real per-household volume:

| Data | Realistic count |
|---|---|
| Instruments ever held | 40–60 |
| Transactions over 8 years | 3,000–8,000 (SIPs dominate) |
| Daily NAV/price history | ~250 per instrument per year |
| Daily portfolio snapshots | ~250 per year |

Under 10,000 ledger documents. Firestore handles that comfortably, and the whole ledger fits in memory in a single pandas frame.

**Document shape does the work, not a second database.** Store price history as **one document per instrument per year**, holding an array of ~250 daily values. A few KB against Firestore's 1 MiB limit, and it's *one read instead of 250*. Ten years across 40 instruments = 400 documents. The read-cost problem was a modelling problem.

**BigQuery is therefore dropped.** It earns its place only if this ever becomes multi-tenant across thousands of households, or you want ad-hoc SQL over history. Neither is true now, and carrying it means an extra system, an extra sync, and an extra failure mode for no benefit.

**What Firestore genuinely can't do — and this is independent of row count — is express the queries.** FIFO tax-lot matching, factor regressions, look-through overlap, correlation matrices, retroactive corporate-action replay: these are joins and window functions at any scale. The answer is not another database; it's that **the nightly Cloud Run job pulls the ledger into pandas once and computes everything in memory.** At 8,000 rows this is seconds.

**The revised path:**

```
WRITE PATH:    Client → Cloud Function → Firestore (ledger)   [server-write only]
COMPUTE PATH:  Cloud Run Job → reads ledger once → pandas in memory
READ PATH:     Cloud Run writes SMALL denormalised snapshot docs → Firestore → Client
```

Two things justify the snapshot layer, and neither is storage cost:

1. **Reconciliation must run server-side** (§A.2.4), so the client cannot be a write path. Provenance has to be a guarantee, not a claim.
2. **Latency.** Recomputing a correlation matrix or a fund-overlap chord on every chart open is unacceptable. Bake nightly, read once. Firestore's offline cache then holds the snapshots, so the app works on a plane.

### 17.1a The honest limit on history

A daily portfolio value series is only truthful back to where transaction coverage is complete. If your statements begin in 2019, a 2016 daily curve is fabricated — the app would be interpolating positions it cannot prove you held.

**Rule: the daily series starts at the coverage epoch, and so does the chart's x-axis.** Not a greyed band, not a dotted estimate — absent. Pre-epoch holdings enter as a single opening balance with a stated cost basis, and the coverage map (§A.3) shows exactly where reliable history begins. This is P8 applied to time itself: the app never draws a line it can't defend.

Note that *price* history is different and freely available going back decades (AMFI NAV archives, exchange bhavcopy). It's the *transaction* history that's scarce. So the app can always show what an instrument did; it can only show what **you** did from the epoch forward.

**Second deviation: the finance app's client is read-mostly.** In Miso, clients write pantry items directly — correct there. Here, **no client writes to any ledger collection.** All mutations go through Callable Functions, because reconciliation (§A.2.4) must run server-side or P2 is a lie. Security rules for `/ledger/**` are `allow write: if false`. That single rule closes most of the attack surface.

### 17.2 Single-file build — same shape as Miso

**Decision: one `index.html`, no build step, Capacitor-wrapped.** Same distribution model, same editing model, same deploy model as Miso.

The previous draft argued against this, and the objection was specifically about *code volume* — twelve chart types, a review queue, a tax UI. That objection is largely answered by a pattern Miso has already solved: **content packs.** Almost everything that would otherwise bloat this file is *data*, not code:

| Looks like code, is actually data | Where it lives |
|---|---|
| Asset taxonomy (§3.1) | Firestore, served as a pack |
| Classification lens definitions (§7) | Firestore |
| Flag rule definitions (§11.2) | Firestore |
| Tax rules by country and effective date (§13.1) | Firestore |
| Chart configurations | Firestore |
| Copy, labels, glossary | Firestore |

Served remotely, versioned, cached offline. Add a country tax pack, a new flag rule, or a whole asset class **without an app release** — the same reason Miso's household packs are served rather than bundled. The file grows with *capability*, not with *content*, and capability plateaus fast.

**The conditions that make single-file hold at this scale:**

| # | Rule | Why |
|---|---|---|
| **S1** | **No in-browser Babel/JSX transpile.** React (or Preact) with `htm` tagged templates | Runtime transpilation of a large file is the worst mobile-startup cost there is. Most important rule here. |
| **S2** | **Pinned ESM imports from CDN** (`esm.sh`, exact versions, never `@latest`) | A silently updated dependency in a financial app is a bad day |
| **S3** | **Fixed, banner-commented section order** | This is what keeps the file navigable for you *and* editable by Claude Code. Documented map, never improvised. |
| **S4** | **Lazy-load heavy libraries** — ECharts on first Analysis open, pdf.js on first review-queue open | Boot payload stays small; only two screens need them |
| **S5** | **Charts = ECharts UMD, not visx** | visx requires bundling. Already chosen in §17 for other reasons; single-file makes it non-negotiable. |
| **S6** | **Hard size budget: ~1.5 MB raw / ~400 KB gzipped** | Crossing it is a planned trigger to split, not a surprise |
| **S7** | **Sections are split-ready** | Written so banners can become file boundaries mechanically if S6 trips |
| **S8** | **No client-side business logic on money** | All math runs in the Cloud Run job. The file renders; it does not compute. |

S8 is the quiet reason single-file suits this app *better* than it suits Miso. Miso's client does real work — planning logic, pantry matching, scheduling rules. This client does almost none: the nightly job computes everything and writes snapshot documents; the front end reads and draws them. **A thin client is a small client.**

**Section map for `index.html`:**

```
01  <head> · meta · fonts · design tokens (CSS vars)
02  Global styles · component primitives · motion
03  ESM imports (pinned)
04  Firebase init · Auth · App Check
05  Data layer — Firestore reads, offline cache, household scope
06  Content-pack loader (taxonomy, rules, copy, tax packs)
07  Formatters — currency, %, dates, locale, jargon glossary
08  Shared UI — Sheet, Card, Chip, Sparkline, EmptyState, Skeleton
09  Chart wrappers (ECharts, lazy)
10  Screen: Today
11  Screen: Portfolio  (+ Position detail, Analysis)
12  Screen: Insights   (+ Flag decision, Assumptions)
13  Screen: Money      (+ Calendar, Spending, Tax)
14  Sheet: Add / Upload / Review queue (pdf.js, lazy)
15  Settings
16  Router · tab shell · household switcher
17  Mount
```

**What genuinely gets harder, stated plainly:** no TypeScript, no test runner, no tree-shaking, and merge conflicts are ugly if a second person ever edits it. For a solo build where Claude Code is the editor and you are the user, those are acceptable costs. If a second developer joins, revisit S6/S7.

### 17.3 Data sourcing

The quiet cost centre, and unchanged by the Firebase decision. Prices, NAVs, corporate actions, fund portfolio disclosures, and news all need feeds. For India: AMFI NAV files (free), exchange bhavcopy (free), corporate action feeds (mostly scrapeable). For global: one paid market data subscription will be unavoidable. Abstract behind a provider interface from day one so feeds are swappable.

---

## 17B. Sharing households with Miso

Yes — and it's the strongest argument for the Firebase decision. Miso and Oru were already settled as separate apps joined by a shared Firestore bridge. This becomes the third app on that bridge.

### 17B.1 Namespace design

```
/users/{uid}                          ← SHARED: profile, auth, entitlements per app
/households/{hid}                     ← SHARED: name, members[], locale, base_currency
/households/{hid}/members/{uid}       ← SHARED: display name, role, joined_at
    │
    ├── /miso/…                       ← Miso namespace   (client-writable)
    ├── /oru/…                        ← Oru namespace    (client-writable)
    └── /ledger/…                     ← Finance namespace (SERVER-WRITE ONLY)
```

One Google or Apple sign-in. One household. One invite flow. Three apps reading their own branch. A member added to the household in Miso already exists here — no second onboarding.

### 17B.2 Access is per-app, not per-household

Custom claims carry the grant:

```json
{
  "households": {
    "hh_7f2a": { "miso": "member", "oru": "member", "ledger": "full" }
  }
}
```

`ledger` takes `full` / `aggregate` / `none`, mapping exactly onto the privacy scopes in §3.3. A member with `aggregate` contributes to household net worth totals but their individual holdings are unreadable — enforced in security rules against the claim, not in the UI. A member with `none` uses Miso normally and has no idea the finance app exists.

This is the piece that makes household-level finance actually usable in a real family. Everyone can be in the kitchen; not everyone should be in the ledger.

### 17B.3 What genuinely gets reused

| Component | Reuse |
|---|---|
| Firebase Auth + Google/Apple providers | **Wholesale** |
| Household model, invite flow, member roster | **Wholesale** |
| Cloud Functions + Secret Manager AI proxy | **Wholesale** — same `callAI` shape |
| Credits system + metering + BYOK fallback | **Wholesale** |
| App Check configuration | **Wholesale** |
| Capacitor build and release pipeline | **Wholesale** |
| Receipt/document vision extraction | **Substantial** — Miso's receipt scanner and this app's statement parser are the same pipeline with different output schemas |
| Design tokens, theming, component primitives | **Substantial**, if a shared package is extracted |

Miso's receipt-scanning work is the non-obvious win. The classify → extract → validate → review-queue loop is already built and debugged for one document type. This app adds schemas, not machinery.

### 17B.4 The two-way data loop

Not just shared login — shared *signal*:

- **Finance → Miso:** categorised grocery and food-delivery spend from credit card statements. Miso learns actual cost per meal, and its shopping list can carry a real running total.
- **Miso → Finance:** the forward meal plan is a forecastable expense line. Module K's cashflow projection gets a genuinely grounded food budget instead of a trailing average.
- **Finance → Oru:** the investment calendar (SIP debits, premiums, EMIs, advance tax) is exactly the kind of ambient household signal Oru consumes.
- **Miso ↔ Finance:** duplicate merchant-normalisation tables. Solve "AMZN MKTP IN*2H4KD" once.

Same bridge pattern already agreed for Miso↔Oru. No new architecture.

### 17B.5 One project or two — the real trade-off

| | Same Firebase project | Separate project, shared identity |
|---|---|---|
| Auth | Trivially shared | Shared via the same OAuth clients / Identity Platform |
| Household bridge | Direct, one Firestore | Cross-project sync layer needed |
| Blast radius | A rules bug in Miso's fast-moving collections *could* reach finance data | Hard isolation |
| Region | Locked to Miso's existing Firestore region | Free choice |
| Cost & effort | Low | Meaningfully higher |

**Recommendation: same project, hardened namespace.** The blast-radius concern is real but it's fully mitigated by `/ledger/**` being server-write-only and default-deny read — a Miso rules mistake cannot reach a collection the client has no path into. That's a stronger guarantee than project separation gives you, and it costs nothing.

**Unless** the region check in §19 fails. If Miso's Firestore lives outside `asia-south1` and you want Indian financial documents resident in India, that alone forces a second project — because Firestore location is immutable after creation. Check this before anything else.

---

## 18. Roadmap

**Phase −1 — Bridge (days, not weeks)**
Extend the existing Firestore household schema with the `/ledger` namespace and the `ledger` custom claim. Stand up the new app shell against Miso's existing Auth. Confirm a Miso household member appears here with no re-onboarding. *This is small, and doing it first means every later phase inherits identity for free.*

**Phase 0 — Foundation (the unglamorous part)**
Data model, taxonomy, instrument master, transaction ledger, corporate action engine, manual entry, price pipeline. Cloud Run job skeleton. Coverage-epoch logic. No UI beyond tables. *If this is right, everything after is easy. If it's wrong, nothing after works.*

**Phase 1 — Ingestion**
Document pipeline for your top 5 formats (CAS, one broker, one bank, one credit card, EPF). Reconciliation checks. Review queue. Coverage map.

**Phase 2 — Intelligence**
Full metrics engine, classification lenses, core charts, calendar. This is the first version that's genuinely useful daily.

**Phase 3 — Reasoning**
Flag engine with the top 15 rules. Investor profile. Gap analysis. News module.

**Phase 4 — Money**
Tax engine (India pack). Spending module. Cashflow forecast. Filing export.

**Phase 5 — Forward-looking**
Monte Carlo projections, goals, scenario stress tests, optimisation suggestions.

**Phase 6 — Scale**
Additional country tax packs, more document formats, fund look-through at depth, natural-language query.

Deliberately deferred: any form of account linking or aggregator integration. If it's ever revisited, consent-based frameworks (India's Account Aggregator, or equivalent abroad) are the only version worth considering — and only as a *supplement* to documents, never a replacement.

---

## 19. Open decisions and honest risks

**Decisions you should make before Phase 0:**

0. **Check Miso's Firestore region first.** It is immutable after project creation. If it isn't `asia-south1` and you want Indian financial documents resident in India, the same-project recommendation in §17B.5 inverts. This is a five-minute check that determines the entire project topology — do it before anything else.
1. **Base currency and household tax model** — single or multi-jurisdiction? This changes the data model, not just a setting.
2. **How much history to reconstruct?** Full-history XIRR needs every transaction ever. Realistically you may have 5–7 years of retrievable statements. Decide the epoch and treat pre-epoch holdings as an opening balance with a stated cost basis.
3. **Illiquid asset valuation policy** — how often, from what source, and how prominently caveated?
4. **Advice boundary** — how close to "you should sell X" is the app allowed to get? My recommendation: it names categories and quantifies trade-offs, never products.
5. **Ledger store, now or later.** Firestore alone carries Phases 0–3 comfortably (§17.1). The pressure point is Phase 4's tax engine — FIFO lot matching, grandfathering, retroactive corporate-action replay — where Firestore's 500-document transaction ceiling bites on a large replay, even though the *volume* is small. **Recommendation: start Firestore, but design the ledger schema as if it were relational (explicit foreign keys, no nesting, no arrays-of-records), so a later move to Cloud SQL is mechanical rather than a rewrite.** Decide at Phase 4, not now.

**Risks:**

| Risk | Mitigation |
|---|---|
| Extraction errors silently corrupt the portfolio | The reconciliation layer (§A.2.4). This is the single most important piece of engineering in the build. |
| Scope collapse — thirteen modules is a lot | Phase 0–2 is a complete, useful product. Everything after is optional. Build it so it can stop at Phase 2 and still be worth it. |
| Data feed cost and reliability | Abstract behind a provider interface from day one so feeds are swappable. |
| Tax rules change and old calculations break | Effective-dated rules engine (P7). Not optional. |
| The reasoning engine becomes noise | The flag budget (max 5) and suppression logic. Ruthlessly. |
| Over-confidence in projections | Assumption panels, fan charts not lines, and stress scenarios alongside. Never present P50 as "the" answer. |
| Firestore read costs creep up | Array-per-year document shape plus precomputed snapshots (§17.1). Watch the read counter in month one — it is the early warning. |
| A Miso security-rules change exposes financial data | `/ledger/**` is server-write-only with default-deny reads. Rules for the two namespaces live in separate files and get separate review. |
| Apple Sign-In identity gotchas | Apple returns the user's name **only on first authorisation** — capture it then or lose it permanently. Private Relay means email is not a stable identifier; key everything on `uid`. Also: offering Google login on iOS makes Apple Sign-In mandatory for App Store approval. |
| Single file becomes unmaintainable | Content-pack model keeps *content* out of the file (§17.2); rules S1–S8, with a hard size budget (S6) as a planned split trigger rather than a surprise. The thin-client rule (S8) is what makes the budget realistic. |
| Credit burn spikes on historical backfill | A user uploading ten years of statements is a large one-time vision cost. Cap free-tier backfill pages, or route bulk backfill through BYOK. |

---

## 20. What I'd deliberately not build

Naming the anti-features is as useful as naming the features:

- Real-time prices and tick charts — encourages the exact behaviour the app should discourage
- Social/leaderboard features — turns investing into a game
- A sentiment score presented as a number
- Specific product recommendations — the moment the app says "buy this fund," it stops being an analyst
- Robo-execution — a different product with a different regulatory posture entirely
- Gamified streaks and badges on investment behaviour
- Any push notification that isn't a genuine action-required event

---

## Closing

The differentiated core of this product is three things, in order:

1. **A statement ingestion pipeline good enough that global asset coverage becomes an emergent property rather than a partnership problem.**
2. **A ledger and taxonomy correct enough that every downstream number is trustworthy.**
3. **A reasoning layer that argues both sides.**

Charts, projections, and news are table stakes — pleasant, expected, and ultimately commodity. The above three are the parts nobody has done well together, and they're the parts that are genuinely hard.

Suggest we debate §3 (taxonomy and data model) and §11 (the reasoning taxonomy) first, since everything else is downstream of those two.
