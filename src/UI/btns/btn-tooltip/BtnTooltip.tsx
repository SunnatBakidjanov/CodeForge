/** --- Imports --- */
import { cn } from '@/utils/cn';
import { useFloating, flip, shift, offset, type Placement } from '@floating-ui/react-dom';
import { motion, type Transition, type TargetAndTransition } from 'framer-motion';
import { useState } from 'react';

/** --- Types --- */
type Props = {
	classNames?: { [key in 'btn' | 'tooltip' | 'container']?: string };
	tooltipOptions: {
		placement: Placement;
		shiftPadding: number;
		offsetValue: number;
	};
	childrens?: { [key in 'btn' | 'tooltip']?: React.ReactNode };
	tooltipAnimation: {
		initialAnim?: TargetAndTransition;
		animateAnim?: TargetAndTransition;
		transitionAnim?: Transition;
	};
};

/** --- BtnTooltip Component --- */
export const BtnTooltip = ({ classNames, tooltipOptions, tooltipAnimation, childrens }: Props) => {
	const { placement, shiftPadding, offsetValue } = tooltipOptions ?? {};
	const { initialAnim, animateAnim, transitionAnim } = tooltipAnimation ?? {};
	const [open, setOpen] = useState(false);
	const { x, y, refs, strategy } = useFloating({
		placement: placement ?? 'bottom',
		middleware: [flip(), offset(offsetValue ?? 4), shift({ padding: shiftPadding ?? 10 })],
	});

	return (
		<div className={cn('relative', classNames?.container)}>
			<button
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				onFocus={() => setOpen(true)}
				onBlur={() => setOpen(false)}
				ref={refs.setReference}
				className={cn(classNames?.btn)}
			>
				{childrens?.btn}
			</button>

			{open && (
				<motion.div
					initial={initialAnim ?? { opacity: 0, y: -5 }}
					animate={animateAnim ?? { opacity: 1, y: 0 }}
					ref={refs.setFloating}
					transition={
						transitionAnim ?? {
							type: 'spring',
							stiffness: 500,
							damping: 30,
							duration: 0.2,
						}
					}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					}}
					className={cn(classNames?.tooltip)}
				>
					{childrens?.tooltip}
				</motion.div>
			)}
		</div>
	);
};
