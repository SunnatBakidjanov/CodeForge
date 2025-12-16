/* --- Imports --- */
import { useEffect } from 'react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer ';
import type { ResType } from '@/hooks/useApiForm';

/* --- Types --- */
export type FormResError = {
	waitSec?: number;
};

export type FormState = {
	formSubmitted?: boolean;
	isError?: boolean;
	errData?: FormResError;
};

type Arguments = {
	formState?: FormState;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

/* --- useBtnTimerSubmit Hook --- */
export const useBtnTimerSubmit = ({ setResMessage, formState }: Arguments) => {
	const { startTimer, countdown } = useCountdownTimer({ timeOut: 60, storageItem: 'FPCT' });
	const { formSubmitted, errData, isError } = formState ?? {};

	useEffect(() => {
		if (formSubmitted && !isError) {
			startTimer();
		}

		if (isError && errData?.waitSec) {
			startTimer(errData?.waitSec);
		}
	}, [formSubmitted, errData, isError, startTimer]);

	const handleClick = () => {
		if (countdown > 0) {
			setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
			return;
		}
	};

	return { handleClick, countdown };
};
