/* --- Imports --- */
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';

/* --- Type --- */
type Props = {
	time: number;
	classNames?: { [key in 'timer' | 'spiner']?: string };
	isTimeConversion?: boolean;
	isAnimation?: boolean;
	spinerDuration?: number;
};

/* --- CountDownTimer Component --- */
export const CountDownTimer = ({ time, classNames, isTimeConversion, spinerDuration, isAnimation = true }: Props) => {
	const timeConversion = () => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return minutes > 0 ? `${minutes}:${seconds < 10 ? '0' : ''}${seconds}` : `${seconds}`;
	};

	return (
		<span className={cn('font-bold relative inline-flex items-center justify-center', classNames?.timer)}>
			{isTimeConversion ? timeConversion() : time}
			{isAnimation && (
				<motion.span
					animate={{ rotate: [0, 360] }}
					transition={{ duration: spinerDuration ?? 3, repeat: Infinity, ease: 'linear' }}
					className={cn(
						'absolute rounded-full border-3 border-transparent border-t-current border-b-current pointer-none',
						classNames?.spiner
					)}
				/>
			)}
		</span>
	);
};
