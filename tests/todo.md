# Complete repository test plan: strike-counter

This checklist inventories repository-owned functions, documents, and configuration as of the current working tree. It is a plan, not a claim that every item is already tested. Update it when an owned source or document changes.

## Scope and method

- Function entries identify the source path and line. Exercise the stated normal, edge, and failure scenarios; link or add assertions as each entry is completed.
- Document entries require rendering, link checking, and content review. Execute documented commands against the current repository.
- Generated output, dependencies, vendored trees, bundled course viewers, and Portfolio pinned `projects/` snapshots are covered through build, package, and integration checks rather than individual upstream functions. Keep those boundaries under review when their inputs change.
- Put produced reports, screenshots, traces, and coverage under `tests/results/`.

## Function and executable source inventory

### `config/.prettierrc.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/astro.config.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/eslint.config.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/postcss.config.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/prettier.config.cjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/tailwind.config.mjs`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `config/tailwind.preset.ts`

- [ ] `applyOpacityValue` (line 42): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `resolveOpacity` (line 47): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `colorScale` (line 59): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `toLegacyColorEntry` (line 64): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `toNumberedColorEntry` (line 71): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `gridSpans` (line 82): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `toSpanEntry` (line 88): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `gridLines` (line 100): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `toLineEntry` (line 106): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `minWidthTheme` (line 117): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `typographyTheme` (line 125): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `registerCustomVariants` (line 162): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `childSelector` (line 167): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `migrations/0001_accounts_and_scoreboards.sql`

- [ ] `public.is_scoreboard_strikee` (line 39): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `scripts/quality-runner.mjs`

- [ ] `callback@18` (line 18): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `callback@45` (line 45): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `isBuildOrTest` (line 50): Run on clean input; verify deterministic output and a useful failure on invalid input. No direct test file is linked yet.
- [ ] `callback@53` (line 53): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `callback@55` (line 55): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/components/ErrorBoundary.tsx`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/components/Marquee.tsx`

- [ ] `Marquee` (line 15): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `observeMarquee` (line 38): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `measure` (line 40): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `disconnectObserver` (line 55): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `renderGroup` (line 66): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.
- [ ] `renderItem` (line 72): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.

### `src/components/account-gate.tsx`

- [ ] `AccountGate` (line 20): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `checkSession` (line 38): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `applySession` (line 43): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `reportSessionErr` (line 52): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `stopSessionUpdates` (line 60): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. No direct test file is linked yet.
- [ ] `submit` (line 75): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `signOut` (line 91): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `handleSubmit` (line 103): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `handleNameChange` (line 109): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `handleEmailChange` (line 115): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `handlePasswordChange` (line 121): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `toggleSignup` (line 125): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/components/carbon-icons.tsx`

- [ ] `CarbonIcon` (line 32): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `renderIconPath` (line 50): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.

### `src/components/scoreboard.tsx`

- [ ] `ScoreboardContent` (line 72): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `commit` (line 101): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `persist` (line 112): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `changeStrikes` (line 130): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `loadDashboards` (line 139): Test found, missing, unauthorized, and upstream-failure results. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `shareWithStrikee` (line 169): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `saveStrikeeInvitation` (line 178): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `copyStrikeeInvitation` (line 189): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `loadDashboardsOnMount` (line 202): Test found, missing, unauthorized, and upstream-failure results. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `manageStrikeFlash` (line 208): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `toggleFlash` (line 215): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `stopFlash` (line 221): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `handleSignOut` (line 227): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `selectDashboard` (line 233): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `selectPitcher` (line 246): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `changeStrikeeEmail` (line 268): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `submitShare` (line 274): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `decreaseStrikes` (line 278): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `increaseStrikes` (line 282): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).
- [ ] `Scoreboard` (line 433): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).

### `src/components/tile.ts`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/components/ui/button.tsx`

- [ ] `renderButton` (line 16): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.

### `src/components/ui/input.tsx`

- [ ] `renderInput` (line 15): Render each state; check interactions, accessibility, loading, and error behavior. No direct test file is linked yet.

### `src/components/ui/select.tsx`

- [ ] `SelectTrigger` (line 17): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `SelectContent` (line 42): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `SelectItem` (line 64): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `SelectSeparator` (line 80): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/components/ui/variants.ts`

- [ ] `controlClasses` (line 96): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `surfaceClasses` (line 106): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `colorForVariant` (line 116): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `normalizeActionVariant` (line 129): Test valid, malformed, empty, and boundary input; assert exact output or error. No direct test file is linked yet.
- [ ] `normalizeActionSize` (line 141): Test valid, malformed, empty, and boundary input; assert exact output or error. No direct test file is linked yet.

### `src/env.d.ts`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/layouts/SiteLayout.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/lib/error-notifications.ts`

- [ ] `notifyError` (line 8): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/lib/neon.ts`

- [ ] `neonAuth` (line 20): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.
- [ ] `getNeonSession` (line 42): Test found, missing, unauthorized, and upstream-failure results. No direct test file is linked yet.
- [ ] `neonData` (line 53): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/lib/pitchers.ts`

- [ ] `clampStrikeCount` (line 8): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/pitchers.test.mjs`](../tests/pitchers.test.mjs).
- [ ] `coercePitchers` (line 17): Test expected input/output, empty and boundary cases, and a relevant failure path. Candidate coverage: [`tests/pitchers.test.mjs`](../tests/pitchers.test.mjs).

### `src/lib/scoreboard-share.ts`

- [ ] `persistShareAndCopyLink` (line 6): Test successful mutation, duplicate/conflict, validation, and failed-write behavior. Candidate coverage: [`tests/scoreboard-share.test.mjs`](../tests/scoreboard-share.test.mjs).

### `src/lib/types.ts`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `src/lib/utils.ts`

- [ ] `cn` (line 8): Test expected input/output, empty and boundary cases, and a relevant failure path. No direct test file is linked yet.

### `src/pages/index.astro`

- [ ] File behavior: execute or compile this source, including expected output and failure handling. No direct test file is linked yet.

### `tests/api.test.mjs`

- [ ] `scoreboardRowsAreAccountScoped` (line 17): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `sharesAreCreatorManagedAndEditableByStrikees` (line 26): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `anonymousRolesCannotAccessScoreboards` (line 35): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `browserUsesAuthenticatedDataApiToken` (line 44): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `scoreboardsAreStoredInNeon` (line 55): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `failuresUseSharedNotificationsAndBoundary` (line 64): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `sonnerUsesAccessibleErrSurface` (line 79): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.

### `tests/pitchers.test.mjs`

- [ ] `normApiPitchers` (line 6): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `rejectsMalformedPitcherLists` (line 29): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `boundsStrikeCounts` (line 39): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.

### `tests/scoreboard-share.test.mjs`

- [ ] `reportsClipboardFailureAfterSaving` (line 12): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `recordSavedShare` (line 15): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `rejectClipboardWrite` (line 19): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `rejectsBeforeCopyWhenShareSaveFails` (line 29): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `rejectShareWrite` (line 32): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `recordClipboardWrite` (line 36): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.

### `tests/theme.test.mjs`

- [ ] `token` (line 23): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `luminance` (line 35): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `compBrightness` (line 46): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `contrast` (line 55): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `scalesDefineAllLightTokens` (line 61): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `surfacesUseSemanticThemeTokens` (line 69): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `brandedSurfacesRemainReadable` (line 81): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `playballFontIsBundledAndLicensed` (line 88): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `illustrationsUseTheIntendedTheme` (line 97): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `strikeControlsExposeAccessibleTheme` (line 107): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.
- [ ] `marqueeAnimationIsAccessibleAndSeamless` (line 117): Run this test and verify its assertions cover the helper, failure path, and relevant fixture. No direct test file is linked yet.

## Document inventory

- [ ] [`.changeset/repository-structure.md`](../.changeset/repository-structure.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.
- [ ] [`CHANGELOG.md`](../CHANGELOG.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.
- [ ] [`README.md`](../README.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.
- [ ] [`docs/README.md`](../docs/README.md): Render, check links and examples, then review each factual claim and instruction against the current implementation.
- [ ] [`public/fonts/Playball-OFL.txt`](../public/fonts/Playball-OFL.txt): Check encoding, content integrity, links, and the owning reader or renderer.

## Configuration and other owned files

- [ ] `.changeset/config.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `.github/workflows/repository-check.yml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `.gitignore`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `LICENSE`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/.env.example`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/.prettierignore`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/config/pnpm-lock.yaml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/husky/pre-commit`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/knip.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/netlify.toml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/package.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/pnpm-lock.yaml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/quality.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `config/tsconfig.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `package.json`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `pnpm-workspace.yaml`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `public/fonts/AUTHENTICSans-130.woff`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/AUTHENTICSans-130.woff2`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/AUTHENTICSans-150.woff`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/AUTHENTICSans-150.woff2`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/AUTHENTICSans-90.woff`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/AUTHENTICSans-90.woff2`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/Avara-Bold.woff`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/Avara-Bold.woff2`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/Avara-BoldItalic.woff`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/Avara-BoldItalic.woff2`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/IndieFlower-Regular.ttf`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `public/fonts/IndieFlower-Regular.woff2`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/fonts/Playball-Regular.ttf`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `public/images/bridgette/baseball-1.jpg`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/images/bridgette/baseball-1.png`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/images/bridgette/baseball-2.jpg`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/images/bridgette/baseball-2.png`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/images/bridgette/pitcher-2.png`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/images/bridgette/pitcher.jpg`: render or load this asset and inspect the visual or byte-level result.
- [ ] `public/images/bridgette/pitcher.png`: render or load this asset and inspect the visual or byte-level result.
- [ ] `src/effects.css`: validate syntax or schema, exercise its owning tool, and check references to this file.
- [ ] `src/styles.css`: validate syntax or schema, exercise its owning tool, and check references to this file.

Inventory: 105 function-like declarations, 5 documents, 38 other owned files, and 33 executable source files.
