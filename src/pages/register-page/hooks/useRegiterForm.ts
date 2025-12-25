/* --- Imports --- */
import { useTimer } from '@/hooks/useTimer';
import type { FormValues } from '../page-config/form.config';
import { useApiForm } from '@/hooks/useApiForm';
import { loginRoute, registerUrl } from '@/utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { RFCD } from '@/utils/localStorageKeys';

/* --- Types --- */
type ResError = { message: string; type: string; waitSec: number };

/* --- useRegisterForm Hook --- */
// This hook is used to manage the form for the register page.
export const useRegisterForm = () => {
	const navigate = useNavigate();
	const { timerState, setCooldown } = useTimer({ storageItem: RFCD });
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
				setCooldown({ status, waitSec: data?.waitSec, localItem: RFCD, isShowTimer: false, resType: data?.type });
				return false;
			}

			if (data?.type === 'codeNotFound') {
				setResMessage({ type: 'error', message: 'Code is invalid.' });
				return false;
			}
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
			nameLatnValid: () => setResMessage({ type: 'error', message: 'Only Latin runes allowed.' }),
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
