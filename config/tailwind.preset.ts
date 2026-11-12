/**
 * tailwind.preset.ts
 *
 * @file Tailwind CSS Preset
 *
 * This file defines a reusable Tailwind CSS config preset.
 * It includes a custom theme with color palettes, font families,
 * animations, and other design tokens. It also configures several
 * Tailwind CSS plugins to extend the framework's functionality.
 *
 * This preset is intended to be used in the main `tailwind.config.js`
 * file to ensure a consistent design system across the project.
 *
 * @see https://tailwindcss.com/docs/presets
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// API
import headlessui from '@headlessui/tailwindcss';
import typography from '@tailwindcss/typography';
import animate from 'tailwindcss-animate';
import scrimGradients from 'tailwindcss-scrim-gradients';
import plugin from 'tailwindcss/plugin.js';

// TYPES
import type { Config, PluginAPI, PluginUtils } from 'tailwindcss/types/config';

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

const legacyColorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const colorLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

/** Creates an opacity-aware color callback for a CSS RGB custom property.
 * @param variable - Custom property holding the RGB channel values.
 * @returns A Tailwind color callback using the requested opacity.
 */
function applyOpacityValue(variable: string): (prop: Partial<{ opacityVariable: string; opacityValue: number }>) => string {
	/** Applies Tailwind's opacity value to the configured RGB channels.
	 * @param prop - Tailwind opacity variables for the current color utility.
	 * @returns An RGB color expression with the requested opacity.
	 */
	function resolveOpacity(prop: Partial<{ opacityVariable: string; opacityValue: number }>): string {
		const opacityValue = prop?.opacityValue;
		return `rgb(var(${variable}) / ${opacityValue || '100'})`;
	}
	return resolveOpacity;
}

/** Builds a color scale from legacy and numbered custom properties.
 * @param name - Prefix used for the palette's custom properties.
 * @param includeLegacy - Whether to include the older hundred-step names.
 * @returns Tailwind color callbacks keyed by their scale steps.
 */
function colorScale(name: string, includeLegacy = false): Record<number, ReturnType<typeof applyOpacityValue>> {
	/** Maps one hundred-step palette token to its Tailwind opacity callback.
	 * @param n - Legacy color level such as 50 or 500.
	 * @returns The numeric level and callback for its legacy custom property.
	 */
	function toLegacyColorEntry(n: (typeof legacyColorLevels)[number]): readonly [number, ReturnType<typeof applyOpacityValue>] {
		return [n, applyOpacityValue(`--${name}${n}`)];
	}
	/** Maps one numbered palette token to its Tailwind opacity callback.
	 * @param n - Numbered color level from 1 through 12.
	 * @returns The level and callback for its numbered custom property.
	 */
	function toNumberedColorEntry(n: (typeof colorLevels)[number]): readonly [number, ReturnType<typeof applyOpacityValue>] {
		return [n, applyOpacityValue(`--${name}-${n}`)];
	}
	return Object.fromEntries([...(includeLegacy ? legacyColorLevels.map(toLegacyColorEntry) : []), ...colorLevels.map(toNumberedColorEntry)]);
}

/** Creates Tailwind grid-span values for each integer in the inclusive range.
 * @param start - First span size to include.
 * @param end - Last span size to include.
 * @returns Grid span utilities keyed by their `span-N` names.
 */
function gridSpans(start: number, end: number): Record<string, string> {
	/** Pairs an inclusive-range offset with its CSS grid-span value.
	 * @param _unused - Placeholder for the array element supplied to `map`.
	 * @param index - Offset from the first span size.
	 * @returns A Tailwind span utility name and CSS value.
	 */
	function toSpanEntry(_unused: undefined, index: number): [string, string] {
		const span = start + index;
		return [`span-${span}`, `span ${span} / span ${span}`];
	}
	return Object.fromEntries(Array.from({ length: end - start + 1 }, toSpanEntry));
}

/** Creates numeric grid-line utilities for each integer in the inclusive range.
 * @param start - First grid line to include.
 * @param end - Last grid line to include.
 * @returns Grid line utilities keyed by their numeric line names.
 */
function gridLines(start: number, end: number): Record<number, string> {
	/** Pairs an inclusive-range offset with its numeric grid-line value.
	 * @param _unused - Placeholder for the array element supplied to `map`.
	 * @param index - Offset from the first grid line.
	 * @returns The grid-line number and its CSS value.
	 */
	function toLineEntry(_unused: undefined, index: number): [number, string] {
		const line = start + index;
		return [line, String(line)];
	}
	return Object.fromEntries(Array.from({ length: end - start + 1 }, toLineEntry));
}

/** Mirrors Tailwind's max-width tokens into the min-width scale.
 * @param theme - Tailwind theme resolver.
 * @returns Min-width tokens matching the configured max-width values.
 */
function minWidthTheme({ theme }: PluginUtils): Record<string, string> {
	return { ...(theme('maxWidth') as Record<string, string>) };
}

/** Applies the project's palette and link treatment to prose utilities.
 * @param theme - Tailwind theme resolver for palette and font tokens.
 * @returns Typography plugin styles for its default prose variant.
 */
function typographyTheme({ theme }: PluginUtils) {
	return {
		DEFAULT: {
			css: {
				'--tw-prose-body': theme('colors.gray[11]'),
				'--tw-prose-headings': theme('colors.gray[12]'),
				'--tw-prose-lead': theme('colors.gray[10]'),
				'--tw-prose-links': theme('colors.gray[12]'),
				'--tw-prose-bold': theme('colors.gray[12]'),
				'--tw-prose-counters': theme('colors.primary[600]'),
				'--tw-prose-bullets': theme('colors.primary[400]'),
				'--tw-prose-hr': theme('colors.gray[7]'),
				'--tw-prose-quotes': theme('colors.gray[12]'),
				'--tw-prose-quote-borders': theme('colors.gray[7]'),
				'--tw-prose-captions': theme('colors.gray[10]'),
				'--tw-prose-code': theme('colors.gray[12]'),
				'--tw-prose-pre-code': theme('colors.gray[3]'),
				'--tw-prose-pre-bg': theme('colors.gray[12]'),
				'--tw-prose-th-borders': theme('colors.gray[7]'),
				'--tw-prose-td-borders': theme('colors.gray[6]'),
				'code::before': false,
				'code::after': false,
				strong: { color: 'inherit' },
				a: { position: 'relative', fontWeight: theme('fontWeight.semibold'), textDecoration: 'underline', textUnderlineOffset: '3px' },
				'h1, h2, h3, h4, h5, h6': { color: 'inherit' },
				'a:hover': { textUnderlineOffset: '3px' },
				blockquote: { color: 'var(--primary-7)', borderLeftColor: 'rgba(var(--primary-7), 0.5)' },
				'li::marker': { color: 'var(--primary-7)' },
			},
		},
	};
}

/** Registers the interaction and direct-child variants used by app classes.
 * @param addVariant - Tailwind API for registering named state variants.
 * @param matchVariant - Tailwind API for registering value-aware variants.
 */
function registerCustomVariants({ addVariant, matchVariant }: PluginAPI): void {
	/** Builds a direct-child selector from Tailwind's variant value.
	 * @param value - Selector segment with underscores used for spaces.
	 * @returns A selector scoped to direct children.
	 */
	function childSelector(value: string): string {
		return `:where(& > ${value.replace(/_/g, ' ')})`;
	}
	addVariant('hocus', ['&:hover', '&:focus']);
	addVariant('hocus-visible', ['&:hover', '&:focus-visible']);
	addVariant('enabled', '&:not(:disabled)');
	matchVariant('*', childSelector, { values: { DEFAULT: '*' } });
}

const transform =
	'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)) ';

const preset: Omit<Config, 'content'> = {
	darkMode: ['variant', ['@media (prefers-color-scheme: dark) { &:not(.light *, .light) }', '&:is(.dark *, .dark)']],
	theme: {
		extend: {
			keyframes: {
				fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
				shimmer: {
					'0%, 20%': { maskPosition: '0 0', backgroundClip: 'text', maskImage: 'linear-gradient(110deg,white,45%,rgba(0,0,0,0.6),55%,white)', maskSize: '250% 100%' },
					'80%, 100%': { maskPosition: '-200% 0', backgroundClip: 'text', maskImage: 'linear-gradient(110deg,white,45%,rgba(0,0,0,0.6),55%,white)', maskSize: '250% 100%' },
				},
				wiggle: { '0%, 100%': { transform: transform + 'rotate(-2deg)' }, '50%': { transform: transform + 'rotate(2deg)' } },
				blink: { '0%,70%,100%': { opacity: '1' }, '20%,50%': { opacity: '0' } },
				scaleIn: { '0%': { transform: transform + 'scale(0.95)', opacity: '0' }, '100%': { transform: transform + 'scale(1)', opacity: '1' } },
				error: {
					'10%, 90%': { transform: transform + 'translateX(-1px)' },
					'20%, 80%': { transform: transform + 'translateX(2px)' },
					'30%, 50%, 70%': { transform: transform + 'translateX(-4px)' },
					'40%, 60%': { transform: transform + 'translateX(4px)' },
				},
			},
			animation: {
				'fade-in': 'fadeIn 150ms ease-in-out',
				shimmer: 'shimmer 6s ease-in-out infinite alternate',
				wiggle: 'wiggle 0.25s ease-in-out infinite',
				blink: 'blink 1.25s ease-out infinite',
				'scale-in': 'scaleIn 300ms ease-out',
				error: 'error 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
			},
			// prettier-ignore
			backgroundImage: {'gradient-from-c': 'radial-gradient(circle at center, var(--tw-gradient-stops))'},
			// prettier-ignore
			transitionTimingFunction: {'quad-in-out': 'cubic-bezier(0.46,0.03,0.52,0.96);'},
			// prettier-ignore
			fontFamily: { sans: [ 'Authentic Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'sans-serif', ], serif: [ 'Avara', 'Authentic Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'sans-serif', ], },
			borderRadius: { 100: '100%' },
			colors: {
				primary: colorScale('primary', true),
				gray: colorScale('gray'),
				secondary: colorScale('secondary', true),
				accent: applyOpacityValue('--accent'),
				'accent-foreground': applyOpacityValue('--accent-foreground'),
				ring: applyOpacityValue('--ring'),
				background: applyOpacityValue('--background'),
			},
			ringColor: { ring: applyOpacityValue('--ring') },
			ringOffsetColor: { background: applyOpacityValue('--background') },
			scale: { 175: '1.75', 200: '2' },
			minWidth: minWidthTheme,
			// Simple 20 column grid
			gridTemplateColumns: { 20: 'repeat(20, minmax(0, 1fr))' },
			// Simple 20 row grid
			gridTemplateRows: { 20: 'repeat(20, minmax(0, 1fr))' },
			gridColumn: gridSpans(13, 20),
			gridRow: gridSpans(7, 20),
			// prettier-ignore
			gridColumnStart: gridLines(13, 21),
			// prettier-ignore
			gridRowStart: gridLines(8, 21),
			// prettier-ignore
			gridColumnEnd: gridLines(13, 21),
			// prettier-ignore
			gridRowEnd: gridLines(8, 21),
			typography: typographyTheme,
		},
	},
	plugins: [typography, headlessui, scrimGradients, animate, plugin(registerCustomVariants)],
};

export default preset;
