# Bridgette’s Strikes

A baseball strike scoreboard where each board belongs to its creator and can be shared with a strikee by email. After the strikee creates an account with the invited email address, the board appears in both accounts and either person can update pitcher strike counts.

## Get started

Use Node.js 22.19 or later and pnpm 10.30.3. Provision a Neon development branch with Neon Auth and the Data API enabled. Copy `config/.env.example` to `.env` and set the public endpoint URLs:

```sh
cp config/.env.example .env
pnpm install --frozen-lockfile
pnpm run dev
```

Open the URL printed by Astro, normally `http://localhost:4321`. Add the local and deployed site origins to Neon Auth’s trusted domains. Without the endpoint URLs, the local page displays a setup message; authentication and persistent accounts require Neon Auth and the Data API.

## Accounts and sharing

Scoreboard data and share invitations are stored in Neon Postgres and exposed through the Neon Data API. The creator can invite a strikee by email; after the strikee creates an account with that email, the shared board appears in their account. Both creator and strikee can update pitcher strike counts. Row-level security in [`migrations/0001_accounts_and_scoreboards.sql`](migrations/0001_accounts_and_scoreboards.sql) limits requests to the signed-in user’s own or shared boards.

## Configuration and security

Set these public endpoint URLs in the local `.env` and Netlify’s build environment:

| Variable                   | Value                                        |
| -------------------------- | -------------------------------------------- |
| `PUBLIC_NEON_AUTH_URL`     | The branch’s Neon Auth endpoint URL          |
| `PUBLIC_NEON_DATA_API_URL` | The branch’s Neon Data API REST endpoint URL |

These URLs are public. Neon Auth issues short-lived JWTs, and Postgres row-level security enforces access. Never expose a database connection string, Neon API key, or password in client code or these public variables. Apply migrations to a temporary Neon branch first and verify owner, invited strikee, and unrelated-account access before production.

## Checks

```sh
pnpm quality:all
pnpm run test
pnpm run build
```

## Structure

`src/` contains the Astro app, scoreboard, and account gate. `migrations/` defines tables and access policies; `tests/` covers API and theme behavior.

## Deployment

The Netlify project is [bridgette-scoreboard](https://app.netlify.com/projects/bridgette-scoreboard). It uses the minimal root package/workspace adapters to run the canonical package manifest in `config/`, then publishes `dist/site/`, as configured in [`netlify.toml`](netlify.toml). Build caches and Astro-generated types live under `dist/cache/`. Set the two public endpoint variables in Netlify’s build environment after Neon is provisioned. The static site does not need a shared editor secret or serverless function.

## References

- [Environment example](config/.env.example)
- [Initial database migration](migrations/0001_accounts_and_scoreboards.sql)
- [Neon API integration](src/lib/neon.ts)
