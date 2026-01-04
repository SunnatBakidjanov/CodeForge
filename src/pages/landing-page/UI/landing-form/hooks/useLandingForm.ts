/* --- Imports --- */
import { useApiForm } from '@/hooks/useApiForm';
import type { FieldErrors } from 'react-hook-form';
import { sendMailUrl } from '@/utils/urls';
import { useTimer } from '@/hooks/useTimer';
import { LPFCD } from '@/utils/localStorageKeys';
import type { FormValues, ResError } from '../form-config/form.config';
import { useMe } from '@/api/useMe';

/* --- useLandingForm Hook --- */
export const useLandingForm = () => {
	const { data: user } = useMe({ staleTime: Infinity });
	const { timerState, setCooldown, setTimer } = useTimer({ storageItem: LPFCD });

	const guestCustomErrors = {
		401: { type: 'error' as const, message: 'Guest path lost. Reload the Forge.' },
	};

	const { handleSubmit, handleSubmitForm, isLoading, register, watch, resMessage, setResMessage } = useApiForm<FormValues, never, ResError>({
		setSubmitValues: () => {
			const guestId = document.cookie.split('=')[1];

			if (!guestId && user?.type === 'guest') {
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
