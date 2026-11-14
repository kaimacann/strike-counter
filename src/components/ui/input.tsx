import React from 'react';
import { cn } from '@utils';
import { colorForVariant, controlClasses, inputAccentClasses } from './variants';
import type { ControlVariant, UiSize } from './variants';

/** Applies control styles and forwards the input element ref.
 * @param className - Additional classes merged into the control styles.
 * @param size - Input height and spacing preset.
 * @param variant - Semantic control color and treatment.
 * @param type - Input behavior used to choose the style treatment.
 * @param attributes - Remaining native input attributes.
 * @param ref - Ref forwarded to the native input element.
 * @returns The configured native input.
 */
export const Input = React.forwardRef(function (
	{
		className,
		size,
		variant,
		type,
		...attributes
	}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
		size?: UiSize;
		variant?: ControlVariant;
	},
	ref: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement {
	return (
		<input
			ref={ref}
			type={type}
			className={type === 'hidden' ? className : type === 'checkbox' || type === 'radio' ? cn(inputAccentClasses[colorForVariant(variant)], className) : cn(controlClasses(variant, size), className)}
			{...attributes}
		/>
	);
});
Input.displayName = 'Input';
