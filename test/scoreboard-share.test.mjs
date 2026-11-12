import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const ts = createRequire(new URL('../config/package.json', import.meta.url))('typescript');
const source = await readFile(new URL('../src/lib/scoreboard-share.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { persistShareAndCopyLink } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

/** Confirms a failed clipboard operation does not turn a saved invitation into a share failure. */
async function reportsClipboardFailureAfterSaving() {
	const actions = [];
	/** Records that share persistence completed before clipboard access. */
	async function recordSavedShare() {
		actions.push('saved');
	}
	/** Models a browser that denies clipboard access after persistence succeeds. */
	async function rejectClipboardWrite() {
		actions.push('copy');
		throw new Error('clipboard denied');
	}
	const copied = await persistShareAndCopyLink(recordSavedShare, rejectClipboardWrite);
	assert.equal(copied, false);
	assert.deepEqual(actions, ['saved', 'copy']);
}

/** Confirms an invitation persistence failure prevents a misleading clipboard success. */
async function rejectsBeforeCopyWhenShareSaveFails() {
	let copied = false;
	/** Simulates the datastore rejecting the invitation before it is recorded. */
	async function rejectShareWrite() {
		throw new Error('share rejected');
	}
	/** Records an unexpected clipboard call so the test can detect it. */
	async function recordClipboardWrite() {
		copied = true;
	}
	await assert.rejects(persistShareAndCopyLink(rejectShareWrite, recordClipboardWrite), /share rejected/);
	assert.equal(copied, false);
}

test('clipboard failure is separated from invitation persistence', reportsClipboardFailureAfterSaving);
test('clipboard copy is skipped when invitation persistence fails', rejectsBeforeCopyWhenShareSaveFails);
