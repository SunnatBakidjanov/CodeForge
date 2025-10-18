/* --- Imports --- */
import { motion, AnimatePresence, type TargetAndTransition, type Transition } from 'framer-motion';
import { useTextSlider } from './hook/useTextSlider';

/* --- Types --- */
type TextSliderProps = {
	sliderInterval?: number;
	texts: string[];
	initial?: TargetAndTransition;
	animate?: TargetAndTransition;
	exit?: TargetAndTransition;
	transition?: Transition;
	className?: string;
};

/* --- TextSlider Component --- */
// This component creates a text slider with animation effects.
export const TextSlider = ({
	sliderInterval = 7000,
	texts,
	initial = { opacity: 0, x: -30 },
	animate = { opacity: 1, x: 0 },
	exit = { opacity: 0, x: 20 },
	transition = { duration: 1, ease: 'easeOut' },
	className,
}: TextSliderProps) => {
	const { current } = useTextSlider(sliderInterval, texts.length);

	return (
		<AnimatePresence mode="wait">
			<motion.div key={current} initial={initial} animate={animate} exit={exit} transition={transition} className={className}>
				{texts[current]}
			</motion.div>
		</AnimatePresence>
	);
};
