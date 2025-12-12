/* --- Imports --- */
import { useEffect, useRef, useState } from 'react';

/* --- Types --- */
type Arguments = {
	timeOut: number;
	storageItem: string;
};

/* --- useCountdownTimer Hook --- */
export const useCountdownTimer = ({ timeOut, storageItem }: Arguments) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [countdown, setCountdown] = useState(() => {
		const savedEndTime = localStorage.getItem(storageItem);

		if (!savedEndTime) return 0;

		const diff = Math.floor((Number(savedEndTime) - Date.now()) / 1000);
		return Math.max(0, diff);
	});

	useEffect(() => {
		if (countdown <= 0) {
			localStorage.removeItem(storageItem);
			return;
		}

		timerRef.current = setTimeout(() => {
			setCountdown(prev => prev - 1);
		}, 1000);

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [countdown, storageItem]);

	const startTimer = () => {
		const endTime = Date.now() + timeOut * 1000;
		localStorage.setItem(storageItem, endTime.toString());
		setCountdown(timeOut);
	};

	return { countdown, startTimer };
};
