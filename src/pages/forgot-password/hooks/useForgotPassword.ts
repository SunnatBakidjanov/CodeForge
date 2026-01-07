/* --- Imports --- */
import { useApiForm } from '@/hooks/useApiForm';
import type { FormValues } from '../page-config/form.config';
import { forgotPassUrl } from '@/utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { useTimer } from '@/hooks/useTimer';
import { FPCD } from '@/utils/localStorageKeys';
import { NotifyConfig } from '@/UI/toast/notify-config/NotifyConfig';

type ResType = { message: string; waitSec: number; type: string };

/* --- useForgotPassword Hook --- */
export const useForgotPassword = () => {
	const { timerState, setTimer } = useTimer({ storageItem: FPCD });
	const { notifyState } = NotifyConfig();

	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues, never, ResType>({
		defaultValues: { email: '' },
		errorsMessage: { success: { message: 'If email exists, code forged and sent!' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		onSubmited: () => {
			const WAIT_SEC = 59;

			notifyState.success('Secret runes sent');
			setTimer({ timeOut: WAIT_SEC, localItem: FPCD, triggerId: Date.now(), isShowTimer: true });
		},
		onError: error => {
			const status = error?.response?.status;
			const data = error?.response?.data;
			const type = data?.type;

			if (type === 'IP_BLOCKED') {
				notifyState.warn('Too many attempts');
				setResMessage({ type: 'waiting', message: 'Forge protection triggered. Try again later.' });
				setTimer({ timeOut: data?.waitSec, localItem: FPCD, triggerId: Date.now(), isShowTimer: false });
				return false;
			}

			if (status === 429 && data?.waitSec) {
				notifyState.warn('Too many attempts');
				setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
				setTimer({ timeOut: data?.waitSec, localItem: FPCD, triggerId: Date.now(), isShowTimer: true });
			}

			notifyState.error('Forge went dark');
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
