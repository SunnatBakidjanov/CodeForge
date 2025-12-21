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
	const { startTimer, countdown } = useCountdownTimer({ storageItem: timerState?.localItem ?? '' });

	useEffect(() => {
		if (!timerState?.triggerId) return;

		startTimer(timerState.timeOut);
	}, [timerState?.triggerId, timerState?.timeOut, startTimer]);

	const handleClick = () => {
		if (countdown > 0) {
			setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
			return;
		}
	};

	return { handleClick, countdown };
};
