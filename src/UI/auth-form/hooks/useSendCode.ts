/* --- Imports --- */
import axios, { type AxiosError } from 'axios';
import { apiUrl, resendAuthCodeUrl } from '@/utils/urls';
import type { ResType } from '@/hooks/useApiForm';
import { useState } from 'react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer ';
import { RSCCD } from '@/utils/localStorageKeys';
import { NotifyConfig } from '@/UI/toast/notify-config/NotifyConfig';

/* --- Types --- */
type Props = {
	getEmail: () => string | undefined;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

/* --- useSendCode Hook --- */
export const useSendCode = ({ setResMessage, getEmail }: Props) => {
	const [isSend, setIsSend] = useState(false);
	const { startTimer, countdown, getStorage } = useCountdownTimer({ storageItem: RSCCD });
	const { notifyState } = NotifyConfig();

	const WAIT_SEC = 59;

	const handleSendCode = async () => {
		if (getStorage()?.resType === 'IP_BLOCKED') {
			notifyState.warn('Too many attempts');
			setResMessage({ type: 'waiting', message: 'Forge protection triggered. Try again later.' });
			return;
		}

		if (countdown > 0) {
			notifyState.warn(`Wait, ${countdown}sec`);
			setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
			return;
		}

		const email = getEmail();
		if (!email) {
			setIsSend(false);
			setResMessage({ type: 'error', message: 'Forge needs an email!' });
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setIsSend(false);
			setResMessage({ type: 'error', message: 'Invalid email pattern!' });
			return;
		}

		setIsSend(true);

		try {
			await axios.post(`${apiUrl}${resendAuthCodeUrl}`, {
				email: email,
			});

			startTimer({ savedEndTime: WAIT_SEC, isShowTimer: true, resType: null });
			notifyState.success('Code sent');
			setResMessage({ type: 'success', message: 'If email exists, code forged and sent!' });
		} catch (error) {
			const err = error as AxiosError & { response: { data: { waitSec: number; type: string } } };
			const status = err.response?.status;
			const waitSec = err.response?.data?.waitSec;
			const resType = err.response?.data?.type;

			if (resType === 'IP_BLOCKED') {
				notifyState.warn('Too many attempts');
				setResMessage({ type: 'error', message: 'Forge protection triggered. Try again later.' });
				startTimer({ savedEndTime: waitSec, isShowTimer: false, resType: resType });
				return;
			}

			const errors = {
				400: () => {
					notifyState.error('Code forging error');
					setResMessage({ type: 'error', message: 'Code forging failed.' });
				},
				409: () => {
					notifyState.warn('Code send failed');
					setResMessage({ type: 'error', message: 'Email already branded in the Forge.' });
				},
				429: () => {
					notifyState.warn(`Wait, ${waitSec}sec`);
					setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
					startTimer({ savedEndTime: waitSec || WAIT_SEC, isShowTimer: true, resType: null });
				},
			};

			if (status && errors[status as keyof typeof errors]) {
				errors[status as keyof typeof errors]();
				return;
			}

			notifyState.error('Code forging error');
			setResMessage({ type: 'error', message: 'Unknown forge error occurred.' });
		} finally {
			setIsSend(false);
		}
	};

	return { isSend, handleSendCode, countdown, getStorage };
};
