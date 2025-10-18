/* --- Imports --- */
import { useEffect, useState, useRef } from 'react';

/* --- useTextSlider Hook --- */
// This hook manages the text sliding functionality.
export const useTextSlider = (interval: number, length: number) => {
	const [current, setCurrent] = useState(0);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			setCurrent(prev => (prev + 1) % length);
		}, interval);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [current, interval, length]);

	return { current };
};
