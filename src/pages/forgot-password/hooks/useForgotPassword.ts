/* --- Imports --- */
import { useApiForm } from '@/hooks/useApiForm';
import type { FormValues } from '../page-config/form.config';
import { forgotPassUrl } from '@/utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { useTimer } from '@/hooks/useTimer';
import { FPCD } from '@/utils/localStorageKeys';

type ResType = { message: string; waitSec: number };

/* --- useForgotPassword Hook --- */
export const useForgotPassword = () => {
	const { timerState, setTimer } = useTimer({ storageItem: FPCD });
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues, never, ResType>({
		defaultValues: { email: '' },
		errorsMessage: { success: { message: 'If email exists, code forged and sent!' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		onSubmited: () => {
			const WAIT_SEC = 60;

			setTimer({ timeOut: WAIT_SEC, localItem: FPCD, triggerId: Date.now() });
		},
		onError: error => {
			const status = error?.response?.status;
			const data = error?.response?.data;

			if (status === 429 && data?.waitSec) {
				setTimer({ timeOut: data?.waitSec, localItem: FPCD, triggerId: Date.now() });
			}
		},
		customErrors: {
			404: { type: 'error', message: 'User not found in the Forge.' },
			429: { type: 'waiting', message: 'Too many strikes. Cooldown active.' },
		},
		apiHref: forgotPassUrl,
	});

	const onInvalid = (error: FieldErrors<FormValues>) => {
		const isRequired = Object.values(error).some(error => error?.type === 'required');

		if (isRequired) {
			setResMessage({ type: 'error', message: 'Every field fuels the Forge.' });
		}
	};

	return { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid, timerState };
};
