import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@utils';
import { ACTION_CLASSES, BUTTON_VARIANTS, normalizeActionSize, normalizeActionVariant } from './variants';
import type { ActionVariant, LegacyButtonSize, LegacyButtonVariant, UiSize } from './variants';

/** Builds the button element while forwarding its DOM ref and native attributes.
 * @param className - Additional classes merged into the action treatment.
 * @param variant - Current or compatibility action style.
 * @param size - Current or compatibility control size.
 * @param asChild - Whether Radix Slot should render the child element.
 * @param attributes - Remaining native button attributes.
 * @param ref - Ref forwarded to the rendered button or slotted child.
 * @returns The configured button element.
 */
export const Button = React.forwardRef(function (
	{
		className,
		variant,
		size,
		asChild,
		...attributes
	}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> & {
		variant?: ActionVariant | LegacyButtonVariant;
		size?: UiSize | LegacyButtonSize;
		asChild?: boolean;
	},
	ref: React.ForwardedRef<HTMLButtonElement>,
): React.ReactElement {
	// terra-quality-ignore single-use -- JSX requires a capitalized binding for the selected component.
	const Component = asChild ? Slot : 'button';
	const normalizedVariant = normalizeActionVariant(variant);
	return (
		<Component
			ref={ref}
			className={cn(
				size === 'link'
					? cn(
							'inline-flex items-center justify-center gap-2 rounded-md border-0 bg-transparent p-0 font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50',
							ACTION_CLASSES[normalizedVariant],
						)
					: cn(
							BUTTON_VARIANTS({
								variant: normalizedVariant,
								size: normalizeActionSize(size),
							}),
							size === 'icon' && 'size-10 p-0',
						),
				className,
			)}
			{...attributes}
		/>
	);
});
Button.displayName = 'Button';
