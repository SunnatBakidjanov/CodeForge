/** --- Imports --- */
import { cn } from '@/utils/cn';
import { useFloating, flip, shift, offset, type Placement } from '@floating-ui/react-dom';
import { motion, type Transition, type TargetAndTransition } from 'framer-motion';
import { useState, useEffect, type JSX } from 'react';

/** --- Types --- */
type Props<T extends React.ElementType = 'button'> = {
	as?: T;
	classNames?: { [key in 'btn' | 'tooltip' | 'tooltipContainer' | 'container']?: string };
	btnProps?: Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'className'>;
	tooltipProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'>;
	tooltipOptions?: {
		placement?: Placement;
		shiftPadding?: number;
		offsetValue?: number;
	};
	childrens?: { [key in 'btn' | 'tooltip']?: React.ReactNode };
	btnWrapper?: ({ children }: { children: React.ReactNode }) => JSX.Element;
	tooltipAnimation?: {
		initialAnim?: TargetAndTransition;
		animateAnim?: TargetAndTransition;
		transitionAnim?: Transition;
	};
};

/** --- BtnTooltip Component --- */
export const BtnTooltip = <T extends React.ElementType = 'button'>({
	as,
	classNames,
	tooltipOptions,
	tooltipAnimation,
	childrens,
	btnProps,
	btnWrapper,
}: Props<T>) => {
	const Component = as || 'button';
	const { placement, shiftPadding, offsetValue } = tooltipOptions ?? {};
	const { initialAnim, animateAnim, transitionAnim } = tooltipAnimation ?? {};
	const [isTouchDevice, setIsTouchDevice] = useState(false);
	const [open, setOpen] = useState(false);
	const { x, y, refs, strategy } = useFloating({
		placement: placement ?? 'bottom',
		middleware: [flip(), offset(offsetValue ?? 4), shift({ padding: shiftPadding ?? 10 })],
	});

	useEffect(() => {
		const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		setIsTouchDevice(hasTouch);
	}, []);

	const tooltipState = {
		open: () => !isTouchDevice && setOpen(true),
		close: () => !isTouchDevice && setOpen(false),
	};

	const Button = (
		<Component
			onMouseEnter={() => tooltipState.open()}
			onMouseLeave={() => tooltipState.close()}
			onFocus={() => tooltipState.open()}
			onBlur={() => tooltipState.close()}
			ref={refs.setReference}
			className={cn(classNames?.btn)}
			{...btnProps}
		>
			{childrens?.btn}
		</Component>
	);

	return (
		<div className={cn('relative group', classNames?.container)}>
			{btnWrapper ? btnWrapper({ children: Button }) : Button}

			{open && !isTouchDevice && (
				<div
					ref={refs.setFloating}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					}}
					onMouseEnter={() => tooltipState.open()}
					onMouseLeave={() => tooltipState.close()}
					onFocus={() => tooltipState.open()}
					onBlur={() => tooltipState.close()}
					className={cn(classNames?.tooltipContainer)}
				>
					<motion.div
						initial={initialAnim ?? { opacity: 0, y: -5 }}
						animate={animateAnim ?? { opacity: 1, y: 0 }}
						transition={
							transitionAnim ?? {
								type: 'spring',
								stiffness: 500,
								damping: 30,
								duration: 0.2,
								delay: 0.5,
							}
						}
						className={cn(
							'block font-bold text-white text-sm whitespace-nowrap bg-black/60 rounded-md shadow-[0_0_3px_white]',
							'px-2 py-1',
							classNames?.tooltip
						)}
					>
						{childrens?.tooltip}
					</motion.div>
				</div>
			)}
		</div>
	);
};
