# Bridgette’s Strikes

A baseball strike scoreboard with accounts, creator-owned boards, and email-based board sharing.

## What it does

A baseball strike scoreboard with accounts, creator-owned boards, and email-based board sharing.

## Prerequisites, setup, usage, and operations

Use Node.js 22.19 or later and pnpm 10.30.3. Copy `.env.example` to `.env`, configure the public Neon Auth and Data API URLs, then run `pnpm install --frozen-lockfile` and `pnpm dev`.

### Common commands

```sh
pnpm dev
pnpm check
pnpm test
pnpm build
```

## Security and Limitations

Neon Auth JWTs and Postgres row-level security scope requests to owned or shared boards. Public endpoint URLs are not database credentials.

## Development and structure

Astro serves the scoreboard. `migrations/` defines account and scoreboard data; tests and scripts define supported checks.

## Validation

pnpm check, pnpm test, pnpm build

| Check | Command |
| --- | --- |
| dev | `pnpm dev` |
| check | `pnpm check` |
| test | `pnpm test` |
| build | `pnpm build` |

## References

See the linked source files, configuration, and package scripts in this repository.

## Contributing

No contribution guide was present in the inspected source snapshot.

## Credits and license

No root license file was found in the inspected repository snapshot.
