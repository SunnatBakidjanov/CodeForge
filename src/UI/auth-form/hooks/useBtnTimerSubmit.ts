/* --- Imports --- */
import { useEffect } from 'react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer ';
import type { ResType } from '@/hooks/useApiForm';
import type { TimerState } from '../../../hooks/useTimer';

/* --- Types --- */

type Arguments = {
	timerState?: TimerState;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

/* --- useBtnTimerSubmit Hook --- */
export const useBtnTimerSubmit = ({ setResMessage, timerState }: Arguments) => {
	const { startTimer, countdown, getStorage } = useCountdownTimer({ storageItem: timerState?.localItem ?? '' });

	useEffect(() => {
		if (!timerState?.triggerId) return;

		if (timerState?.timeOut) {
			startTimer({ savedEndTime: timerState?.timeOut, isShowTimer: timerState?.isShowTimer, resType: timerState?.resType });
		}
	}, [timerState?.triggerId, timerState?.timeOut, timerState?.isShowTimer, timerState?.resType, startTimer]);

	const handleClick = () => {
		if (getStorage()?.resType === 'IP_BLOCKED') {
			setResMessage({ type: 'waiting', message: 'Forge protection triggered. Try again later.' });
			return;
		}

		if (countdown > 0) {
			setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
			return;
		}
	};

	return { handleClick, countdown, getStorage };
};
