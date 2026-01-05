/* --- Imports --- */
import { cn } from '@/utils/cn';
import { useEmbers } from './hooks/useEmber';
import { motion } from 'framer-motion';

type Props = {
	classNames?: { [key in 'container' | 'ember']?: string };
};

/* --- Embers Component --- */
// This component represents the embers animation.
export const Embers = ({ classNames }: Props) => {
	const { embers, screenHeight } = useEmbers({ count: 30, screenHeight: 20 });

	return (
		<div className={cn('pointer-events-none fixed bottom-0 left-0 w-full h-full overflow-hidden z-1000', classNames?.container)}>
			{embers.map(ember => (
				<motion.div
					key={ember.id}
					className={cn('absolute bottom-0 w-1 h-1 bg-orange-400 rounded-full shadow-[0_0_8px_2px_rgba(255,140,0,0.8)]', classNames?.ember)}
					style={{ left: `${ember.left}%` }}
					initial={{ y: 0, opacity: 0 }}
					animate={{
						y: `-${screenHeight}vh`,
						x: ember.offsetX,
						opacity: [0, 1, 0],
					}}
					transition={{
						delay: ember.delay,
						duration: ember.duration,
						repeat: Infinity,
						ease: 'easeOut',
					}}
				/>
			))}
		</div>
	);
};
