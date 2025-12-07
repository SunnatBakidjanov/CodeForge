/* --- Imports --- */
import { cn } from '@/utils/cn';
import { useProgressBar } from './hooks/useProgressBar';

/* --- Types --- */
export type Props = {
	currentPercent: number;
	classNames?: { [key in 'text' | 'progress']: string };
};

/* --- ProgressBar Component --- */
// This component represents a progress bar in the landing page.
export const ProgressBar = ({ currentPercent, classNames }: Props) => {
	const { percent, ref } = useProgressBar({ currentPercent });

	return (
		<div className={cn('flex items-center w-full', 'gap-2', 'mt-2')}>
			<p className={cn('flex justify-end font-bold', 'text-lg', 'min-w-12', classNames?.text)}>{Math.min(100, percent)}%</p>

			<div className={cn('flex items-center w-full relative rounded-3xl overflow-hidden', 'h-4')}>
				<div className="w-full h-full bg-black/70"></div>

				<div
					ref={ref}
					style={{ width: `${percent}%` }}
					className={cn('h-full absolute left-0 z-2 transition-all duration-600 ease-out rounded-2xl', classNames?.progress)}
				/>
			</div>
		</div>
	);
};
