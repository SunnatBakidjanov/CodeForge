/* --- Imports --- */
import type { FormValues } from '../page-config/form.config';
import { useApiForm } from '@/hooks/useApiForm';
import { loginUrl } from '@/utils/urls';
import { type FieldErrors } from 'react-hook-form';
import { useOnSubmit, type LoginRes } from './useOnSubmit';
import { useTimer } from '@/hooks/useTimer';
import { LFCD } from '@/utils/localStorageKeys';

/* --- Types --- */
type ResError = {
	message: string;
	waitSec: number;
	type: string;
};

/* --- UseLoginForm Hook --- */
// This hook is used to manage the form for the login page.
export const useLoginForm = () => {
	const { onSubmited } = useOnSubmit();
	const { setCooldown, timerState } = useTimer({ storageItem: LFCD });

	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues, LoginRes, ResError>({
		defaultValues: { email: '', password: '' },
		onSubmited,
		onError: error => {
			const status = error?.status;
			const waitSec = error?.response?.data?.waitSec;
			const type = error?.response?.data?.type;

			if (status === 429) {
				setResMessage({ type: 'waiting', message: 'Forge protection triggered. Try again later.' });
				setCooldown({ status, waitSec: waitSec, localItem: LFCD, isShowTimer: false, resType: type });
				return false;
			}
		},
		errorsMessage: { success: { message: 'Welcome to the Forge.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		customErrors: {
			401: { type: 'error', message: 'The Forge doesn’t open for you.' },
		},
		apiHref: loginUrl,
	});

	const onInvalid = (error: FieldErrors<FormValues>) => {
		const isRequired = Object.values(error).some(error => error?.type === 'required');

		if (isRequired) {
			setResMessage({ type: 'error', message: 'Every field fuels the Forge.' });
		}
	};

	return { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid, timerState };
};
