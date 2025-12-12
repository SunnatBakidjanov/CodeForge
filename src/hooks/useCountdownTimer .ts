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
		const savedEndTime = Number(localStorage.getItem(storageItem));

		if (!savedEndTime) return 0;

		const diff = Math.floor((savedEndTime - Date.now()) / 1000);
		return diff > 0 ? diff : 0;
	});

	useEffect(() => {
		if (countdown === 0) {
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

	const startTimer = (updateTimer?: number) => {
		const endTime = Date.now() + (updateTimer ?? timeOut) * 1000;
		localStorage.setItem(storageItem, endTime.toString());
		setCountdown(updateTimer ?? timeOut);
	};

	return { countdown, startTimer };
};
