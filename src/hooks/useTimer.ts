/* --- Imports --- */
import { useState } from 'react';

/* --- Types --- */
export type TimerState = {
	timeOut: number;
	localItem: string;
	triggerId?: number;
};

type SetCooldownArgs = {
	status?: number;
	waitSec?: number;
	localItem: string;
};

/* --- useTimer Hook --- */
export const useTimer = ({ storageItem }: { storageItem: string }) => {
	const [timerState, setTimer] = useState<TimerState>({ timeOut: 0, localItem: storageItem });

	const setCooldown = ({ status, waitSec, localItem }: SetCooldownArgs) => {
		if (status && status === 429 && typeof waitSec === 'number') {
			setTimer({ timeOut: waitSec, localItem: localItem, triggerId: Date.now() });
		}
	};

	return { timerState, setTimer, setCooldown };
};
