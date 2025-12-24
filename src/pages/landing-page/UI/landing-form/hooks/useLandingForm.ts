/* --- Imports --- */
import { useApiForm } from '@/hooks/useApiForm';
import type { FieldErrors } from 'react-hook-form';
import { sendMailUrl } from '@/utils/urls';
import { useTimer } from '@/hooks/useTimer';
import { LPFCD } from '@/utils/localStorageKeys';
import type { FormValues } from '../form-config/form.config';

/* --- Types --- */
type ResError = { waitSec: number; message: string; type: string };

/* --- UseLandingForm Hook --- */
export const useLandingForm = () => {
	const { timerState, setCooldown, setTimer } = useTimer({ storageItem: LPFCD });

	const { handleSubmit, handleSubmitForm, isLoading, register, watch, resMessage, setResMessage } = useApiForm<FormValues, never, ResError>({
		setSubmitValues: () => {
			const guestId = document.cookie.split('=')[1];

			if (!guestId) {
				setResMessage({ type: 'error', message: 'Guest path lost. Reload the Forge.' });
				return false;
			}
		},
		onSubmited: () => {
			const WAIT_SEC = 59;

			setTimer({ timeOut: WAIT_SEC, localItem: LPFCD, triggerId: Date.now(), isShowTimer: true });
		},
		onError: error => {
			const status = error?.response?.status;
			const data = error?.response?.data;

			if (data?.type === 'IP_BLOCKED') {
				setResMessage({ type: 'error', message: 'Forge protection triggered. Try again later.' });
				setCooldown({ status, waitSec: data?.waitSec, localItem: LPFCD, isShowTimer: false, resType: data?.type });
				return false;
			}

			setCooldown({ status, waitSec: data?.waitSec, localItem: LPFCD, isShowTimer: true });
		},
		defaultValues: { name: '', email: '', message: '' },
		errorsMessage: { success: { message: 'Message successfully engraved.' } },
		customErrors: { 401: { type: 'error', message: 'Guest path lost. Reload the Forge.' } },
		apiHref: sendMailUrl,
	});

	const onInvalid = (errors: FieldErrors<FormValues>) => {
		const isRequired = Object.values(errors).some(error => error?.type === 'required');

		if (isRequired) {
			setResMessage({ type: 'error', message: 'Every field fuels the Forge.' });
			return;
		}
	};

	return {
		setResMessage,
		handleSubmit,
		handleSubmitForm,
		isLoading,
		register,
		watch,
		resMessage,
		onInvalid,
		timerState,
	};
};
