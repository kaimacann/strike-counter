import { cva } from 'class-variance-authority';

/** Semantic color families supported by scoreboard controls. */
export type UiColor = 'primary' | 'secondary' | 'gray' | 'destructive';
/** Treatments available within an action or surface family. */
export type UiType = 'default' | 'outline' | 'ghost' | 'tonal' | 'saturated' | 'underline';
/** Supported control dimensions from compact to prominent. */
export type UiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Valid style keys for buttons and links. */
export type ActionVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'saturated'>}`;
/** Valid style keys for inputs and other interactive controls. */
export type ControlVariant = UiColor | `${UiColor}-${Extract<UiType, 'outline' | 'ghost' | 'tonal'>}`;
/** Valid style keys for non-interactive content surfaces. */
export type SurfaceVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'underline'>}`;

export const ACTION_CLASSES = {
	primary: 'border-transparent bg-cyan-700 text-white hover:bg-cyan-800',
	'primary-outline': 'border-cyan-700 bg-transparent text-cyan-900 hover:bg-cyan-50',
	'primary-ghost': 'border-transparent bg-transparent text-cyan-900 hover:bg-cyan-50',
	'primary-tonal': 'border-transparent bg-cyan-100 text-cyan-950 hover:bg-cyan-200',
	'primary-underline': 'border-transparent bg-transparent text-cyan-800 underline underline-offset-4 hover:text-cyan-950',
	secondary: 'border-transparent bg-yellow-400 text-yellow-950 hover:bg-yellow-500',
	'secondary-outline': 'border-yellow-600 bg-transparent text-yellow-950 hover:bg-yellow-50',
	'secondary-ghost': 'border-transparent bg-transparent text-yellow-950 hover:bg-yellow-50',
	'secondary-tonal': 'border-transparent bg-secondary-1 text-secondary-12 hover:bg-secondary-2',
	'secondary-underline': 'border-transparent bg-transparent text-yellow-800 underline underline-offset-4 hover:text-yellow-950',
	gray: 'border-transparent bg-gray-200 text-gray-950 hover:bg-gray-300',
	'gray-outline': 'border-gray-400 bg-transparent text-gray-900 hover:bg-gray-100',
	'gray-ghost': 'border-transparent bg-transparent text-gray-700 hover:bg-gray-100',
	'gray-tonal': 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200',
	'gray-underline': 'border-transparent bg-transparent text-gray-700 underline underline-offset-4 hover:text-gray-950',
	destructive: 'border-transparent bg-rose-700 text-white hover:bg-rose-800',
	'destructive-outline': 'border-rose-700 bg-transparent text-rose-800 hover:bg-rose-50',
	'destructive-ghost': 'border-transparent bg-transparent text-rose-800 hover:bg-rose-50',
	'destructive-tonal': 'border-transparent bg-rose-100 text-rose-900 hover:bg-rose-200',
	'destructive-underline': 'border-transparent bg-transparent text-rose-800 underline underline-offset-4 hover:text-rose-950',
} satisfies Record<ActionVariant, string>;

export const CONTROL_CLASSES = {
	primary: 'border-gray-300 bg-white text-gray-950 placeholder:text-gray-500 focus-visible:border-cyan-700 focus-visible:ring-cyan-700',
	'primary-outline': 'border-gray-300 bg-transparent text-gray-950 placeholder:text-gray-500 focus-visible:border-cyan-700 focus-visible:ring-cyan-700',
	'primary-ghost': 'border-transparent bg-transparent text-gray-950 placeholder:text-gray-500 focus-visible:border-cyan-700 focus-visible:ring-cyan-700',
	'primary-tonal': 'border-transparent bg-cyan-50 text-cyan-950 placeholder:text-cyan-800/60 focus-visible:border-cyan-700 focus-visible:ring-cyan-700',
	secondary: 'border-gray-300 bg-white text-gray-950 placeholder:text-gray-500 focus-visible:border-yellow-600 focus-visible:ring-yellow-600',
	'secondary-outline': 'border-gray-300 bg-transparent text-gray-950 placeholder:text-gray-500 focus-visible:border-yellow-600 focus-visible:ring-yellow-600',
	'secondary-ghost': 'border-transparent bg-transparent text-gray-950 placeholder:text-gray-500 focus-visible:border-yellow-600 focus-visible:ring-yellow-600',
	'secondary-tonal': 'border-transparent bg-yellow-50 text-yellow-950 placeholder:text-yellow-800/60 focus-visible:border-yellow-600 focus-visible:ring-yellow-600',
	gray: 'border-gray-300 bg-gray-100 text-gray-900 placeholder:text-gray-500 focus-visible:border-gray-500 focus-visible:ring-gray-500',
	'gray-outline': 'border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:border-gray-500 focus-visible:ring-gray-500',
	'gray-ghost': 'border-transparent bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:border-gray-500 focus-visible:ring-gray-500',
	'gray-tonal': 'border-transparent bg-gray-100 text-gray-900 placeholder:text-gray-500 focus-visible:border-gray-500 focus-visible:ring-gray-500',
	destructive: 'border-rose-300 bg-white text-rose-950 placeholder:text-rose-700/60 focus-visible:border-rose-700 focus-visible:ring-rose-700',
	'destructive-outline': 'border-rose-300 bg-transparent text-rose-950 placeholder:text-rose-700/60 focus-visible:border-rose-700 focus-visible:ring-rose-700',
	'destructive-ghost': 'border-transparent bg-transparent text-rose-950 placeholder:text-rose-700/60 focus-visible:border-rose-700 focus-visible:ring-rose-700',
	'destructive-tonal': 'border-transparent bg-rose-50 text-rose-950 placeholder:text-rose-700/60 focus-visible:border-rose-700 focus-visible:ring-rose-700',
} satisfies Record<ControlVariant, string>;

export const SURFACE_CLASSES = {
	primary: 'border-gray-200 bg-white text-gray-950',
	'primary-outline': 'border-cyan-700 bg-transparent text-gray-950',
	'primary-ghost': 'border-transparent bg-transparent text-gray-950',
	'primary-tonal': 'border-transparent bg-cyan-50 text-cyan-950',
	'primary-saturated': 'border-transparent bg-cyan-700 text-white',
	secondary: 'border-gray-200 bg-white text-gray-950',
	'secondary-outline': 'border-yellow-600 bg-transparent text-gray-950',
	'secondary-ghost': 'border-transparent bg-transparent text-gray-950',
	'secondary-tonal': 'border-transparent bg-yellow-50 text-yellow-950',
	'secondary-saturated': 'border-transparent bg-yellow-500 text-yellow-950',
	gray: 'border-gray-300 bg-white text-gray-700',
	'gray-outline': 'border-gray-300 bg-transparent text-gray-700',
	'gray-ghost': 'border-transparent bg-transparent text-gray-700',
	'gray-tonal': 'border-transparent bg-gray-100 text-gray-900',
	'gray-saturated': 'border-transparent bg-gray-600 text-white',
	destructive: 'border-rose-300 bg-white text-rose-950',
	'destructive-outline': 'border-rose-300 bg-transparent text-rose-950',
	'destructive-ghost': 'border-transparent bg-transparent text-rose-950',
	'destructive-tonal': 'border-transparent bg-rose-50 text-rose-950',
	'destructive-saturated': 'border-transparent bg-rose-800 text-white',
} satisfies Record<SurfaceVariant, string>;

const ACTION_SIZES: Record<UiSize, string> = { xs: 'h-7 gap-1 px-2 text-xs', sm: 'h-9 px-3 text-sm', md: 'h-10 px-4 py-2 text-sm', lg: 'h-11 px-5 py-2.5 text-sm', xl: 'h-12 px-6 py-3 text-base' };

const CONTROL_SIZES: Record<UiSize, string> = { xs: 'h-7 px-2 text-xs', sm: 'h-9 px-3 text-sm', md: 'h-10 px-3 text-sm', lg: 'h-11 px-4 text-base', xl: 'h-12 px-4 text-base' };

export const BUTTON_VARIANTS = cva(
	'inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{ variants: { variant: ACTION_CLASSES, size: ACTION_SIZES }, defaultVariants: { variant: 'primary', size: 'md' } },
);

/** Builds width, state, visual, and size classes for an input-like control.
 * @param variant - Semantic control treatment.
 * @param size - Control height and spacing preset.
 * @returns Tailwind classes for the complete control.
 */
export function controlClasses(variant: ControlVariant = 'primary', size: UiSize = 'md'): string {
	return ['w-full rounded-md border outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60', CONTROL_CLASSES[variant], CONTROL_SIZES[size]].join(
		' ',
	);
}

/** Builds the border and palette classes for a content surface.
 * @param variant - Semantic surface treatment.
 * @returns Tailwind classes for the selected surface.
 */
export function surfaceClasses(variant: SurfaceVariant = 'gray'): string {
	return ['rounded-md border', SURFACE_CLASSES[variant]].join(' ');
}

export const inputAccentClasses: Record<UiColor, string> = { primary: 'accent-cyan-700', secondary: 'accent-yellow-600', gray: 'accent-gray-600', destructive: 'accent-rose-700' };

/** Reads the color family from an action, control, or surface key.
 * @param variant - Full semantic variant key.
 * @returns The primary color-family segment.
 */
export function colorForVariant(variant: ActionVariant | ControlVariant | SurfaceVariant = 'primary'): UiColor {
	return variant.split('-')[0] as UiColor;
}

/** Legacy button variant names accepted at compatibility boundaries. */
export type LegacyButtonVariant = 'account' | 'outline' | 'tonal-secondary' | 'underline';
/** Legacy size names accepted at compatibility boundaries. */
export type LegacyButtonSize = 'default' | 'icon' | 'link';

/** Maps old button treatments onto the current semantic action names.
 * @param variant - Current or legacy action treatment.
 * @returns A valid current action variant.
 */
export function normalizeActionVariant(variant: ActionVariant | LegacyButtonVariant = 'primary'): ActionVariant {
	if (variant === 'account') return 'secondary';
	if (variant === 'outline') return 'primary-outline';
	if (variant === 'tonal-secondary') return 'secondary-tonal';
	if (variant === 'underline') return 'primary-underline';
	return variant;
}

/** Maps old button dimensions onto the current compact-to-prominent scale.
 * @param size - Current or legacy button size.
 * @returns A valid current UI size.
 */
export function normalizeActionSize(size: UiSize | LegacyButtonSize = 'md'): UiSize {
	if (size === 'default') return 'md';
	if (size === 'icon') return 'sm';
	if (size === 'link') return 'xs';
	return size;
}
