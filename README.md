# Magnus

Magnus is a prototype for collective purchasing among independent businesses. A business describes what it buys in plain language. Magnus reads the requirement with a language model, finds other businesses buying the same thing, shows how a supplier's price breaks apply to the combined quantity, and lets each business approve and authorise only its own share through the PayPal sandbox.

Built for the PayPal AI Hackathon 2026.

## What is real and what is not

| Part | Status |
| --- | --- |
| Businesses, suppliers, quotations, prices, history | Fictional demonstration data in `src/data/seed.ts` |
| Requirement analysis | A language model (Anthropic Messages API) called by the Magnus server when `ANTHROPIC_API_KEY` is set. Without a key the app falls back to local pattern rules and says so on screen |
| Matching, savings, price breaks | Calculated locally in `src/lib/` from the demonstration pools. Not model-generated |
| Payments | PayPal sandbox through the Magnus server when credentials are set: create order, buyer approval, authorise, capture, void. Without credentials the checkout only previews the request and sends nothing |
| Other businesses' responses | Fixtures. A labelled demonstration control advances them so later states can be seen |
| Persistence | Browser local storage only. No database |

The banner at the top of every screen states which of these are active in the copy you are running.

## Product rules

- Every business approves its own commitment. The app never approves for you.
- Changing your quantity withdraws an earlier approval.
- Payment lines count approved quantities only.
- The server refuses any PayPal endpoint that is not the sandbox unless `PAYPAL_ALLOW_NON_SANDBOX=1` is set on purpose.
- Capture is offered as a demonstration control because the other businesses are fictional. In the intended flow, capture waits until every approved share is authorised.

## Run it

Requires Node 18 or later (Node 22 recommended).

```bash
npm install
cp .env.example .env     # then fill in the keys below
npm run server           # API on http://localhost:8787
npm run dev              # frontend on http://localhost:5173, proxies /api to the server
```

Or run everything from one process, which is also what a deployment does:

```bash
npm start                # builds the frontend and serves it with the API on :8787
```

Keys, all optional (the app still runs without them and labels what is not connected):

| Variable | Purpose |
| --- | --- |
| `ANTHROPIC_API_KEY` | Enables model-based requirement analysis |
| `ANTHROPIC_MODEL` | Model name, defaults to `claude-sonnet-5-5` |
| `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` | Sandbox REST app credentials from the PayPal Developer Dashboard |
| `INR_PER_USD` | Fixed demonstration rate, default 88 |
| `PAYPAL_CURRENCY` | Currency sent to PayPal, default `USD` |

Shares are shown in rupees but charged in dollars at the fixed demonstration rate, because sandbox accounts commonly cannot transact in INR. The rate is shown wherever a conversion happens.

### Trying the PayPal flow

1. Create a sandbox REST app in the PayPal Developer Dashboard and copy its client ID and secret into `.env`.
2. Create or use a sandbox buyer account (Dashboard, Testing tools, Sandbox accounts).
3. In Magnus: Demand intelligence, Analyse requirement, Join pool, tick the confirmation and Approve, click Simulate the others responding twice, then Go to payment coordination.
4. Choose Authorise my share in PayPal sandbox, sign in as the sandbox buyer, and approve. You return to Magnus with the authorisation shown. Capture or void it from the same panel.

## Tests

```bash
npm run typecheck
npm test
```

`npm test` starts the server against local stand-ins for the Anthropic and PayPal APIs and checks request shapes, input validation, secret handling and the sandbox guard. It does not prove the real services accept the requests; that needs real credentials and a manual run of the steps above.

## Deploy

One Node web service serving both the API and the built frontend. A `render.yaml` blueprint is included; the secrets are left for you to enter in the dashboard. On Render, for example: build command `npm install && npm run build`, start command `npm run server`, and the environment variables above set in the dashboard.

## Stack

React 18, TypeScript, Tailwind CSS, Recharts, Lucide icons, Vite for the frontend. The server is dependency-free Node using built-in `http` and `fetch`.

## Where integrations plug in

The interface depends on the contracts in `src/services/types.ts`.

- `RequirementAnalyzer`: `modelAnalyzer` calls `/api/analyze`; `localAnalyzer` is the fallback.
- `Matcher`: local today; replace with a matching engine.
- `src/data/seed.ts` and `src/store.tsx`: replace with API calls and a database.
- The server takes the payment amount from the client. A production version would price the order from its own database.

## Tools used

- A language model through the Anthropic Messages API for requirement analysis (`claude-sonnet-5-5` by default), using forced tool output and checking every returned value against known categories and cities.
- PayPal sandbox, Orders v2 with `intent: AUTHORIZE`, plus authorisation capture and void.
- React, TypeScript, Vite, Tailwind CSS, Recharts, Lucide.
- Google Fonts (Hanken Grotesk and Newsreader) loaded from the web.

## Licence

MIT. See `LICENSE`.
