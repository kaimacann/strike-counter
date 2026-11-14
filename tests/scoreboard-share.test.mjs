import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const ts = createRequire(new URL('../config/package.json', import.meta.url))('typescript');
const { outputText } = ts.transpileModule(await readFile(new URL('../src/lib/scoreboard-share.ts', import.meta.url), 'utf8'), {
	compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
});
const { persistShareAndCopyLink } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

// Confirms a failed clipboard operation does not turn a saved invitation into a share failure.
test('clipboard failure is separated from invitation persistence', async () => {
	const actions = [];
	assert.equal(
		await persistShareAndCopyLink(
			async () => {
				actions.push('saved');
			},
			async () => {
				actions.push('copy');
				throw new Error('clipboard denied');
			},
		),
		false,
	);
	assert.deepEqual(actions, ['saved', 'copy']);
});

// Confirms an invitation persistence failure prevents a misleading clipboard success.
test('clipboard copy is skipped when invitation persistence fails', async () => {
	let copied = false;
	await assert.rejects(
		persistShareAndCopyLink(
			async () => {
				throw new Error('share rejected');
			},
			async () => {
				copied = true;
			},
		),
		/share rejected/,
	);
	assert.equal(copied, false);
});
