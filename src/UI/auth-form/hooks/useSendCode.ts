/* --- Imports --- */
import axios, { type AxiosError } from 'axios';
import { apiUrl, resendAuthCodeUrl } from '@/utils/urls';
import type { ResType } from '@/hooks/useApiForm';
import { useState } from 'react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer ';

/* --- Types --- */
type Props = {
	getEmail: () => string | undefined;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

/* --- useSendCode Hook --- */
export const useSendCode = ({ setResMessage, getEmail }: Props) => {
	const [isSend, setIsSend] = useState(false);
	const { startTimer, countdown } = useCountdownTimer({ timeOut: 60, storageItem: 'RSCT' });

	const handleSendCode = async () => {
		if (countdown > 0) {
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

			startTimer();
			setResMessage({ type: 'success', message: 'Code forged and sent!' });
		} catch (error) {
			const err = error as AxiosError & { response: { data: { waitSec: number } } };
			const status = err.response?.status;
			const waitSec = err.response?.data?.waitSec;

			const errors = {
				400: () => setResMessage({ type: 'error', message: 'Code forging failed.' }),
				409: () => setResMessage({ type: 'error', message: 'Cannot send — email used.' }),
				429: () => {
					setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
					startTimer(waitSec);
				},
			};

			if (status && errors[status as keyof typeof errors]) {
				errors[status as keyof typeof errors]();
				return;
			}

			setResMessage({ type: 'error', message: 'Unknown forge error occurred.' });
		} finally {
			setIsSend(false);
		}
	};

	return { isSend, handleSendCode, countdown };
};
