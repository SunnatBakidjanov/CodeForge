/** --- Imports --- */
import { Tooltip } from '@/UI/tooltip/Tooltip';
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
	isCloseTooltip?: boolean;
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
	isCloseTooltip = false,
}: Props<T>) => {
	const Component = as || 'button';
	const { placement, shiftPadding, offsetValue } = tooltipOptions ?? {};
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

			{open && !isTouchDevice && !isCloseTooltip && (
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
					<Tooltip animOptions={tooltipAnimation} className={classNames?.tooltip} children={childrens?.tooltip} />
				</div>
			)}
		</div>
	);
};
