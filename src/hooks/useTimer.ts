/* --- Imports --- */
import { useState } from 'react';

/* --- Types --- */
export type TimerState = {
	timeOut?: number;
	localItem?: string;
	triggerId?: number;
	isShowTimer?: boolean;
	resType?: string | number | null | undefined;
};

type SetCooldownArgs = {
	status?: number;
	waitSec?: number;
	localItem?: string;
	isShowTimer?: boolean;
	resType?: string | number | null | undefined;
};

/* --- useTimer Hook --- */
export const useTimer = ({ storageItem }: { storageItem: string }) => {
	const [timerState, setTimer] = useState<TimerState>({ timeOut: 0, localItem: storageItem, resType: '' });

	const setCooldown = ({ status, waitSec, localItem, isShowTimer, resType }: SetCooldownArgs) => {
		if (status && status === 429 && typeof waitSec === 'number') {
			setTimer({ timeOut: waitSec, localItem: localItem, triggerId: Date.now(), isShowTimer: isShowTimer, resType: resType });
		}
	};

	return { timerState, setTimer, setCooldown };
};
