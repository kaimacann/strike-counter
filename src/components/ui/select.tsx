import React from 'react';
import * as Primitive from '@radix-ui/react-select';
import { cn } from '@utils';
import { controlClasses, surfaceClasses } from './variants';
import type { ControlVariant, SurfaceVariant, UiSize } from './variants';

export const Select = Primitive.Root;

/** Renders the trigger button and forwards remaining Radix trigger attributes.
 * @param className - Additional classes merged into the trigger.
 * @param children - Trigger content such as the selected value and icon.
 * @param variant - Visual control treatment.
 * @param size - Trigger height and spacing preset.
 * @param attributes - Remaining Radix trigger attributes.
 * @returns The styled select trigger.
 */
export function SelectTrigger({
	className,
	children,
	variant,
	size,
	...attributes
}: Omit<React.ComponentProps<typeof Primitive.Trigger>, 'size'> & {
	variant?: ControlVariant;
	size?: UiSize;
}): React.JSX.Element {
	return (
		<Primitive.Trigger className={cn(controlClasses(variant, size), 'inline-flex items-center justify-between gap-3', className)} {...attributes}>
			{children}
		</Primitive.Trigger>
	);
}
export const SelectValue = Primitive.Value;

/** Renders the portalled options surface with the selected palette treatment.
 * @param className - Additional classes merged into the options surface.
 * @param children - Option and separator elements.
 * @param variant - Surface color and treatment.
 * @param attributes - Remaining Radix content attributes.
 * @returns The portalled select options surface.
 */
export function SelectContent({
	className,
	children,
	variant,
	...attributes
}: Omit<React.ComponentProps<typeof Primitive.Content>, 'variant'> & {
	variant?: SurfaceVariant;
}): React.JSX.Element {
	return (
		<Primitive.Portal>
			<Primitive.Content className={cn('z-[110] min-w-32 overflow-hidden p-1 shadow-lg', surfaceClasses(variant), className)} position='popper' {...attributes}>
				<Primitive.Viewport>{children}</Primitive.Viewport>
			</Primitive.Content>
		</Primitive.Portal>
	);
}
/** Renders one keyboard-navigable option in the select list.
 * @param className - Additional classes merged into the option.
 * @param children - Label displayed for the option.
 * @param attributes - Remaining Radix item attributes.
 * @returns The styled select item.
 */
export function SelectItem({ className, children, ...attributes }: React.ComponentProps<typeof Primitive.Item>): React.JSX.Element {
	return (
		<Primitive.Item
			className={cn(
				'relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-slate-100',
				className,
			)}
			{...attributes}
		>
			<Primitive.ItemText>{children}</Primitive.ItemText>
		</Primitive.Item>
	);
}
/** Separates groups of options inside the select content.
 * @returns A horizontal Radix separator.
 */
export function SelectSeparator(): React.JSX.Element {
	return <Primitive.Separator className='my-1 h-px bg-slate-200' />;
}
