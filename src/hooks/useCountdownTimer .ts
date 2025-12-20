/* --- Imports --- */
import { useEffect, useRef, useState, useCallback } from 'react';

/* --- Types --- */
type Arguments = {
	storageItem: string;
};

/* --- useCountdownTimer Hook --- */
export const useCountdownTimer = ({ storageItem }: Arguments) => {
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

	const startTimer = useCallback(
		(seconds: number) => {
			const endTime = Date.now() + seconds * 1000;
			localStorage.setItem(storageItem, endTime.toString());
			setCountdown(seconds);
		},
		[storageItem]
	);

	return { countdown, startTimer };
};
