/* --- Imports --- */
import { useEffect, useRef, useState, useCallback } from 'react';

/* --- Types --- */
type Arguments = {
	storageItem: string;
	isShowTimer?: boolean;
	resType?: string | number | null | undefined;
};

type StorageState = {
	savedEndTime: number;
	isShowTimer?: boolean;
	resType?: string | number | null | undefined;
};

/* --- useCountdownTimer Hook --- */
export const useCountdownTimer = ({ storageItem, isShowTimer, resType }: Arguments) => {
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const getStorage = () => {
		const stored = localStorage.getItem(storageItem);
		const parsed = stored ? (JSON.parse(stored) as StorageState) : { savedEndTime: 0, isShowTimer: false, resType: resType };
		return { ...parsed };
	};

	const [countdown, setCountdown] = useState(() => {
		const savedEndTime = getStorage()?.savedEndTime;

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
			localStorage.setItem(storageItem, JSON.stringify({ savedEndTime: endTime, isShowTimer: isShowTimer, resType: resType }));
			setCountdown(seconds);
		},
		[storageItem, isShowTimer, resType]
	);

	return { countdown, startTimer, getStorage };
};
