/* --- Imports --- */
import { useTimer } from '@/hooks/useTimer';
import type { FormValues } from '../page-config/form.config';
import { useApiForm } from '@/hooks/useApiForm';
import { loginRoute, registerUrl } from '@/utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RFCD } from '@/utils/localStorageKeys';
import { NotifyConfig } from '@/UI/toast/notify-config/NotifyConfig';

/* --- Types --- */
type ResError = { message: string; type: string; waitSec: number };

/* --- useRegisterForm Hook --- */
// This hook is used to manage the form for the register page.
export const useRegisterForm = () => {
	const navigate = useNavigate();
	const { timerState, setCooldown } = useTimer({ storageItem: RFCD });
	const { notifyState } = NotifyConfig();

	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues, never, ResError>({
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
		errorsMessage: {
			success: { message: 'Crafting complete.' },
			400: { message: 'The pattern is flawed. Refine it.' },
			429: { type: 'waiting', message: 'Forge protection triggered. Try again later.' },
		},
		onSubmited: () => {
			navigate(loginRoute);
		},
		onError: error => {
			const data = error.response?.data;
			const status = error?.status;

			if (data?.type === 'IP_BLOCKED') {
				notifyState.warn('Too many attempts');
				setResMessage({ type: 'waiting', message: 'Forge protection triggered. Try again later.' });
				setCooldown({ status, waitSec: data?.waitSec, localItem: RFCD, isShowTimer: false, resType: data?.type });
				return false;
			}

			if (data?.type === 'codeNotFound') {
				notifyState.warn('Code is invalid');
				setResMessage({ type: 'error', message: 'Code is invalid.' });
				return false;
			}

			const errorMap = {
				409: () => notifyState.info('Email already branded'),
				410: () => notifyState.info('Code has expired'),
			};

			if (errorMap && errorMap[status as keyof typeof errorMap]) {
				errorMap[status as keyof typeof errorMap]();
				return;
			}

			notifyState.error('Forge went dark');
		},
		customErrors: {
			409: { type: 'error', message: 'Email already branded in the Forge.' },
			410: { type: 'error', message: 'Code has expired.' },
		},
		apiHref: registerUrl,
	});

	const onInvalid = (errors: FieldErrors<FormValues>) => {
		const errorHandlers = {
			required: () => setResMessage({ type: 'error', message: 'Every field fuels the Forge.' }),
			notMatchPass: () => setResMessage({ type: 'error', message: 'Passkeys forged differently.' }),
			nameValid: () => setResMessage({ type: 'error', message: 'Runes rejected. Letters only.' }),
			passMinLength: () => setResMessage({ type: 'error', message: `Your key needs more strength, 4+ chars.` }),
		};

		for (const err of Object.values(errors)) {
			const key = err?.message || err?.type;
			const handler = err?.type && errorHandlers[key as keyof typeof errorHandlers];

			if (handler) {
				handler();
				return;
			}
		}
	};

	return { onInvalid, handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, timerState };
};
