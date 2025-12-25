/* --- Imports --- */
import { useEffect, useState, useCallback } from 'react';

/* --- Types --- */
export type StorageState = {
	savedEndTime: number;
	isShowTimer?: boolean;
	resType?: string | number | null | undefined;
};

/* --- useCountdownTimer Hook --- */
export const useCountdownTimer = ({ storageItem }: { storageItem: string }) => {
	const getStorage = useCallback((): StorageState | null => {
		const stored = localStorage.getItem(storageItem);
		const parsed = stored ? (JSON.parse(stored) as StorageState) : { savedEndTime: 0, isShowTimer: false, resType: '' };
		return { ...parsed };
	}, [storageItem]);

	const [countdown, setCountdown] = useState(() => {
		const savedEndTime = getStorage()?.savedEndTime;

		if (!savedEndTime) return 0;

		const diff = Math.floor((savedEndTime - Date.now()) / 1000);
		return diff > 0 ? diff : 0;
	});

	const recalcCountdown = useCallback(() => {
		const savedEndTime = getStorage()?.savedEndTime;

		if (!savedEndTime) {
			setCountdown(0);
			return;
		}

		const diff = Math.floor((savedEndTime - Date.now()) / 1000);
		setCountdown(diff > 0 ? diff : 0);
	}, [getStorage]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				recalcCountdown();
			}
		};

		document.addEventListener('visibilitychange', handleVisibilityChange);

		return () => {
			document.removeEventListener('visibilitychange', handleVisibilityChange);
		};
	}, [recalcCountdown]);

	useEffect(() => {
		if (countdown === 0) {
			localStorage.removeItem(storageItem);
			return;
		}

		const id = setTimeout(() => {
			setCountdown(prev => prev - 1);
		}, 1000);

		return () => {
			if (id) clearTimeout(id);
		};
	}, [countdown, storageItem]);

	const startTimer = useCallback(
		({ savedEndTime, isShowTimer, resType }: StorageState) => {
			const endTime = Date.now() + savedEndTime * 1000;
			localStorage.setItem(storageItem, JSON.stringify({ savedEndTime: endTime, isShowTimer: isShowTimer, resType: resType }));
			setCountdown(savedEndTime);
		},
		[storageItem]
	);

	return { countdown, startTimer, getStorage };
};
