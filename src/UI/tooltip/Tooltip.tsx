/** --- Imports --- */
import { motion } from 'framer-motion';
import type { TargetAndTransition, Transition } from 'framer-motion';
import { cn } from '@/utils/cn';

/** --- Types --- */
type AnimOptions = {
	initialAnim?: TargetAndTransition;
	animateAnim?: TargetAndTransition;
	transitionAnim?: Transition;
};

type Props = {
	children?: React.ReactNode;
	className?: string;
	animOptions?: AnimOptions;
};

/** --- Tooltip Component --- */
export const Tooltip = ({ animOptions, className, children }: Props) => {
	const { initialAnim, animateAnim, transitionAnim } = animOptions ?? {};

	return (
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
				className
			)}
		>
			{children}
		</motion.div>
	);
};
