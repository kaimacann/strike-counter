import assert from 'node:assert/strict';
import { test } from 'node:test';
import { clampStrikeCount, coercePitchers } from '../src/lib/pitchers.ts';

/** Confirms API pitcher data is validated and normalized before use. */
function normApiPitchers() {
	assert.deepEqual(
		coercePitchers({
			pitchers: [
				{ id: 'first', name: '  First Pitcher  ', strikes: 2.4 },
				{ id: 'second', name: 'Second Pitcher', strikes: 0 },
				{ id: 'third', name: 'Third Pitcher', strikes: 'bad' },
				{ id: 'empty-name', name: '   ', strikes: 1 },
				{ id: '   ', name: 'Missing identifier', strikes: 1 },
				{ id: 4, name: 'Bad Identifier', strikes: 1 },
				null,
			],
		}),
		[
			{ id: 'first', name: 'First Pitcher', strikes: 2 },
			{ id: 'second', name: 'Second Pitcher', strikes: 1 },
			{ id: 'third', name: 'Third Pitcher', strikes: 1 },
		],
	);
}
test('scoreboard pitcher data is validated and normalized', normApiPitchers);

/** Confirms malformed scoreboard payloads safely produce an empty list. */
function rejectsMalformedPitcherLists() {
	assert.deepEqual(coercePitchers(null), []);
	assert.deepEqual(coercePitchers([]), []);
	assert.deepEqual(coercePitchers({}), []);
	assert.deepEqual(coercePitchers({ pitchers: null }), []);
	assert.deepEqual(coercePitchers({ pitchers: [{ id: 'p', name: 'P' }] }), [{ id: 'p', name: 'P', strikes: 1 }]);
}
test('malformed scoreboard pitcher lists are safely rejected', rejectsMalformedPitcherLists);

/** Checks that strike updates stay within the three-scoreboard values. */
function boundsStrikeCounts() {
	assert.equal(clampStrikeCount(-8), 1);
	assert.equal(clampStrikeCount(2.7), 3);
	assert.equal(clampStrikeCount(8), 3);
	assert.equal(clampStrikeCount(Number.NaN), 1);
	assert.equal(clampStrikeCount(Number.NEGATIVE_INFINITY), 1);
}
test('strike count normalization stays within one and three', boundsStrikeCounts);
