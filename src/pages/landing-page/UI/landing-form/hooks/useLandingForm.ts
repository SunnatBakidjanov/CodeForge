/* --- Imports --- */
import { useApiForm } from '@/hooks/useApiForm';
import type { FieldErrors } from 'react-hook-form';
import { sendMailUrl } from '@/utils/urls';
import { useTimer } from '@/hooks/useTimer';
import { LPFCD } from '@/utils/localStorageKeys';
import type { FormValues, ResError } from '../form-config/form.config';
import { useMe } from '@/api/useMe';
import { NotifyConfig } from '@/UI/toast/notify-config/NotifyConfig';

/* --- useLandingForm Hook --- */
export const useLandingForm = () => {
	const { data: user } = useMe({ staleTime: Infinity });
	const { timerState, setCooldown, setTimer } = useTimer({ storageItem: LPFCD });
	const { notifyState } = NotifyConfig();

	const guestCustomErrors = {
		401: { type: 'error' as const, message: 'Guest path lost. Reload the Forge.' },
	};

	const { handleSubmit, handleSubmitForm, isLoading, register, watch, resMessage, setResMessage } = useApiForm<FormValues, never, ResError>({
		setSubmitValues: () => {
			const guestId = document.cookie.split('=')[1];

			if (!guestId && user?.type === 'guest') {
				notifyState.warn('Guest path lost');
				setResMessage({ type: 'error', message: 'Guest path lost. Reload the Forge.' });
				return false;
			}
		},
		onSubmited: () => {
			const WAIT_SEC = 59;

			setTimer({ timeOut: WAIT_SEC, localItem: LPFCD, triggerId: Date.now(), isShowTimer: true });
			notifyState.success('Message delivered');
		},
		onError: error => {
			const status = error?.response?.status;
			const data = error?.response?.data;

			if (data?.type === 'IP_BLOCKED') {
				notifyState.warn('Too many attempts');
				setResMessage({ type: 'error', message: 'Forge protection triggered. Try again later.' });
				setCooldown({ status, waitSec: data?.waitSec, localItem: LPFCD, isShowTimer: false, resType: data?.type });
				return false;
			}

			if (status === 429 && data?.waitSec) {
				notifyState.warn('Too many attempts');
				setResMessage({ type: 'error', message: 'Too many strikes. Cooldown active.' });
				setCooldown({ status, waitSec: data?.waitSec, localItem: LPFCD, isShowTimer: true });
				return false;
			}
		},
		defaultValues: { name: user?.userData?.name ?? '', email: user?.userData?.email ?? '', message: '' },
		errorsMessage: { success: { message: 'Message successfully engraved.' } },
		customErrors: user?.type === 'guest' ? guestCustomErrors : {},
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
		user,
	};
};
