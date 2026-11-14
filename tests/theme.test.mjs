import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
/*//////////////////////////////////////////////////
REGEX
//////////////////////////////////////////////////*/
const BG_PRIMARY_1_REGEX = /bg-primary-1/;
const BG_PRIMARY_1_PR_6_REGEX = /bg-primary-1 pr-6/;

const [css, layout, scoreboard, imgTheme, accountGate, marquee, variants] = await Promise.all([
	readFile(new URL('../src/styles.css', import.meta.url), 'utf8'),
	readFile(new URL('../src/layouts/SiteLayout.astro', import.meta.url), 'utf8'),
	readFile(new URL('../src/components/scoreboard.tsx', import.meta.url), 'utf8'),
	readFile(new URL('../src/components/tile.ts', import.meta.url), 'utf8'),
	readFile(new URL('../src/components/account-gate.tsx', import.meta.url), 'utf8'),
	readFile(new URL('../src/components/Marquee.tsx', import.meta.url), 'utf8'),
	readFile(new URL('../src/components/ui/variants.ts', import.meta.url), 'utf8'),
]);
/** Reads one CSS RGB theme token as numeric channel values.
 * @param name - CSS token suffix such as `primary-1`.
 * @returns The token's red, green, and blue channel values.
 */
function token(name) {
	const match = css.match(new RegExp(`--${name}:\\s*(\\d{1,3} \\d{1,3} \\d{1,3})`, 'i'));
	assert.ok(match, `Expected CSS theme token --${name}`);
	const channels = [];
	for (const channel of match[1].split(' ')) channels.push(Number(channel));
	return channels;
}

/** Converts an sRGB color's three channels into relative luminance.
 * @param rgb - Three channel color with each value from zero to 255.
 * @returns Relative luminance from zero to one.
 */
function luminance(rgb) {
	const linear = [];
	for (const channel of rgb) linear.push(channel / 255 <= 0.04045 ? channel / 255 / 12.92 : ((channel / 255 + 0.055) / 1.055) ** 2.4);
	return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

/** Orders two luminance values from brightest to darkest.
 * @param l - First luminance value to compare.
 * @param r - Second luminance value to compare.
 * @returns Negative when right is brighter, positive when left is brighter, or zero when equal.
 */
function compBrightness(l, r) {
	return r - l;
}

/** Calculates the WCAG contrast ratio for two RGB colors.
 * @param a - First color's RGB channels.
 * @param b - Second color's RGB channels.
 * @returns Contrast ratio, where one is no contrast and 21 is maximum.
 */
function contrast(a, b) {
	const vals = [luminance(a), luminance(b)].sort(compBrightness);
	return (vals[0] + 0.05) / (vals[1] + 0.05);
}

// Confirms every primary and secondary light-scale token is defined.
test('primary and secondary Radix-style scales define all twelve light tokens', () => {
	for (const scale of ['primary', 'secondary']) {
		for (let step = 1; step <= 12; step += 1) assert.match(css, new RegExp(`--${scale}-${step}:\\s*\\d{1,3} \\d{1,3} \\d{1,3}`));
	}
});

// Checks semantic surface classes and the exact brand colors used by pages.
test('cream page surface and burgundy brand surface use semantic theme tokens', () => {
	assert.match(layout, BG_PRIMARY_1_REGEX);
	assert.match(layout, /text-primary-12/);
	assert.match(scoreboard, /bg-secondary-12[^\n]*text-secondary-1/);
	assert.match(accountGate, BG_PRIMARY_1_REGEX);
	assert.match(scoreboard, BG_PRIMARY_1_PR_6_REGEX);
	assert.deepEqual(token('primary-1'), [255, 250, 240]);
	assert.deepEqual(token('secondary-12'), [100, 23, 43]);
});

// Ensures the intended primary and burgundy text combinations meet contrast.
test('primary and burgundy surfaces retain readable text contrast', () => {
	assert.ok(contrast(token('primary-1'), token('primary-12')) >= 7);
	assert.ok(contrast(token('secondary-12'), token('secondary-1')) >= 7);
});

// Verifies the scoreboard's display font is bundled with its license.
test('Playball is loaded locally and used by the scoreboard title', async () => {
	assert.match(css, /font-family:\s*'Playball'/);
	assert.match(scoreboard, /fontFamily:\s*'"Playball", cursive'/);
	assert.ok((await readFile(new URL('../public/fonts/Playball-Regular.ttf', import.meta.url))).byteLength > 100_000);
	assert.match(await readFile(new URL('../public/fonts/Playball-OFL.txt', import.meta.url), 'utf8'), /SIL OPEN FONT LICENSE/i);
});

// Checks illustration blending and accessible alternative text.
test('Bridgette illustrations use color-burn blending over the cream canvas', () => {
	assert.match(imgTheme, /mix-blend-color-burn/);
	assert.doesNotMatch(imgTheme, /grayscale/);
	assert.match(scoreboard, BG_PRIMARY_1_PR_6_REGEX);
	assert.match(scoreboard, /alt='Illustration of Bridgette batting'/);
	assert.match(scoreboard, /alt='Illustration of the pitcher'/);
});

// Confirms strike controls expose labels and use the approved color variants.
test('score controls expose names and use the cream and burgundy palette', () => {
	assert.match(scoreboard, /aria-label='Decrease strike count'/);
	assert.match(scoreboard, /aria-label='Increase strike count'/);
	assert.match(scoreboard, /variant='secondary-tonal'/);
	assert.match(variants, /'secondary-tonal': 'border-transparent bg-secondary-1 text-secondary-12 hover:bg-secondary-2'/);
	assert.match(scoreboard, /bg-primary-12[^\n]*text-primary-1/);
});

// Verifies marquee animation, duplication, and reduced-motion support.
test('three-strike marquee has a seamless animation and respects reduced motion', () => {
	assert.match(css, /\.marquee-line\s*\{[^}]*animation:\s*slide\s+20s\s+linear\s+infinite/s);
	assert.match(css, /transform:\s*translateX\(-50%\)/);
	assert.match(css, /prefers-reduced-motion:\s*reduce/);
	assert.match(marquee, /animationDuration/);
	assert.match(marquee, /animationDirection:\s*reverse/);
	assert.match(marquee, /ResizeObserver/);
	assert.match(marquee, /Math\.ceil\(viewportWidth\s*\/\s*itemWidth\)/);
	assert.match(marquee, /renderGroup\(0\)[\s\S]*renderGroup\(1\)/);
	assert.match(marquee, /className='sr-only' role='status'/);
	assert.match(marquee, /className='marquee-line'[\s\S]*aria-hidden='true'/);
	assert.match(scoreboard, /strikes === 3[\s\S]*?<Marquee/);
});
