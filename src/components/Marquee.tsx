import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@utils';

/**
 * Renders a repeating, screen-reader-friendly marquee for three strikes.
 *
 * @param terms - Text terms announced once to assistive technology.
 * @param children - Custom marquee content repeated across each track.
 * @param className - Additional classes for the viewport.
 * @param duration - Duration of one animation cycle in milliseconds.
 * @param reverse - Whether the track runs in reverse.
 * @param ariaHidden - Whether to hide the whole marquee from assistive technology.
 * @returns The measured marquee viewport and its duplicated animated content.
 */
export default function Marquee({
	terms = [],
	children,
	className,
	duration = 20_000,
	reverse = false,
	'aria-hidden': ariaHidden = false,
}: {
	terms?: string[];
	children?: React.ReactNode;
	className?: string;
	duration?: number;
	reverse?: boolean;
	'aria-hidden'?: boolean;
}) {
	const content = children ?? terms.join('　　');
	const viewportRef = useRef<HTMLDivElement>(null);
	const sampleRef = useRef<HTMLSpanElement>(null);
	const [copies, setCopies] = useState(2);

	/** Keeps enough repeated content to cover the measured viewport.
	 * @returns Cleanup that disconnects the measurement observer.
	 */
	function observeMarquee(): () => void {
		/** Measures both elements before changing the repeated content count. */
		function measure(): void {
			const viewportWidth = viewportRef.current?.clientWidth ?? 0;
			const itemWidth = sampleRef.current?.getBoundingClientRect().width ?? 0;
			if (viewportWidth === 0 || itemWidth === 0) return;

			// Fill the visible viewport before duplicating the group for a seamless loop.
			const nCopies = Math.max(2, Math.ceil(viewportWidth / itemWidth) + 1);
			setCopies(nCopies);
		}

		measure();
		const observer = new ResizeObserver(measure);
		if (viewportRef.current) observer.observe(viewportRef.current);
		if (sampleRef.current) observer.observe(sampleRef.current);
		/** Releases the observer when the measured content changes or unmounts. */
		function disconnectObserver(): void {
			observer.disconnect();
		}
		return disconnectObserver;
	}
	useEffect(observeMarquee, [content]);

	/** Renders one repeated group with the measured number of content copies.
	 * @param group - Group index used for the React key.
	 * @returns The repeated content group.
	 */
	function renderGroup(group: number): React.JSX.Element {
		/** Renders one item and its spacer in a repeated marquee group.
		 * @param _unused - Array.from's placeholder value.
		 * @param i - Item index used for the fragment key.
		 * @returns The repeated text and gap.
		 */
		function renderItem(_unused: undefined, i: number): React.JSX.Element {
			return (
				<React.Fragment key={i}>
					<span className='marquee-item'>{content}</span>
					<span className='marquee-gap' aria-hidden='true' />
				</React.Fragment>
			);
		}
		return (
			<div className='marquee-group' key={group}>
				{Array.from({ length: copies }, renderItem)}
			</div>
		);
	}

	return (
		<div ref={viewportRef} className={cn('marquee-viewport relative overflow-hidden whitespace-nowrap', className)} aria-hidden={ariaHidden || undefined}>
			{terms.length > 0 && !ariaHidden && (
				<span className='sr-only' role='status'>
					{terms.join(' ')}
				</span>
			)}
			<span ref={sampleRef} className='marquee-measure' aria-hidden='true'>
				{content}
				<span className='marquee-gap' />
			</span>
			<div
				className='marquee-line'
				aria-hidden='true'
				style={{
					animationDuration: `${duration}ms`,
					animationDirection: reverse ? 'reverse' : undefined,
				}}
			>
				{renderGroup(0)}
				{renderGroup(1)}
			</div>
		</div>
	);
}
