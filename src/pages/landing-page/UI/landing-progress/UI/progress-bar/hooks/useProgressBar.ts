/* --- Imports --- */
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/* --- useProgressBar Hook --- */
// This hook manages the progress bar animation.
export const useProgressBar = ({ currentPercent }: { currentPercent: number }) => {
	const [percent, setPercent] = useState(0);
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, amount: 0.2 });

	const animationDuration = 2000;
	const frameStep = 30;
	const stepTime = 1000 / frameStep;
	const stepSize = currentPercent / (animationDuration / stepTime);

	useEffect(() => {
		if (!isInView) return;

		let current = 0;
		const interval = setInterval(() => {
			current += stepSize;
			if (current >= currentPercent) {
				current = currentPercent;
				clearInterval(interval);
			}

			setPercent(Math.round(current));
		}, stepTime);

		return () => clearInterval(interval);
	}, [isInView, stepSize, stepTime, currentPercent]);

	return { percent, ref };
};
