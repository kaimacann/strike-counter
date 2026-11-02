# Bridgette’s Strikes

An account-gated baseball scoreboard. Creators record pitcher strikes and can share a board with a strikee by email. After the invitee creates an account with that address, the board appears in both accounts and either person can update its counts.

## Getting started

Requires Node.js 22.19+ and pnpm 10.30.3. Provision a Neon development branch with Neon Auth and the Data API enabled. Copy the public endpoint variables from `.env.example`, then run from the repository root:

```sh
cp .env.example .env
# Set PUBLIC_NEON_AUTH_URL and PUBLIC_NEON_DATA_API_URL in .env
pnpm install
pnpm dev
```

Open Astro's local URL. Add the local and deployed site origins to Neon Auth's trusted domains. Apply the migration on a temporary Neon branch first, then verify owner, invited strikee, and unrelated-account access before production.

### Commands

From the repository root, run `pnpm check`, `pnpm test`, and `pnpm build`. Test schema and row-level access changes on a temporary Neon branch before production.

## Security and Limitations

Neon Auth issues short-lived JWTs. Postgres row-level security allows the owner and invited strikee to read and update a shared board; only the owner can manage invitations. The two endpoint URLs are public. Never expose a database connection string, API key, or password in client code.

## Structure

`src/` contains the Astro app, scoreboard, and account gate. `migrations/` defines tables and access policies; `test/` covers API and theme behavior.

## References

- [Environment example](.env.example)
- [Initial database migration](migrations/0001_accounts_and_scoreboards.sql)
- [Neon API integration](src/lib/neon.ts)
- [Netlify build and publish settings](netlify.toml)

## Contributing

Keep schema changes aligned with migration policies.

## Credits and license

No repository license file is present. Ask the maintainer before reusing code, visual assets, or themes.
