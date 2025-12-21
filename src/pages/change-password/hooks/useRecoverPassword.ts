/* --- Imports --- */
import type { FieldErrors } from 'react-hook-form';
import type { FormValues } from '../page-config/form.config';
import { useApiForm } from '@/hooks/useApiForm';
import { useTimer } from '@/hooks/useTimer';
import { CPCD } from '@/utils/localStorageKeys';
import { changePassUrl, loginRoute } from '@/utils/urls';
import { useNavigate, useSearchParams } from 'react-router';

/* --- Types --- */
type ResErrData = { message: string; waitSec: number; type: 'TOKEN_INVALID' };

/* --- useRecoverPassword Hook --- */
export const useRecoverPassword = () => {
	const navigate = useNavigate();
	const { timerState, setCooldown } = useTimer({ storageItem: CPCD });
	const [searchParams] = useSearchParams();
	const paramsObj = Object.fromEntries(searchParams.entries());

	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues, never, ResErrData>({
		defaultValues: { confirmPassword: '', password: '' },
		onSubmited: () => {
			navigate(loginRoute, { replace: true });
		},
		onError: error => {
			const status = error?.status;
			const data = error?.response?.data;

			setCooldown({ status, waitSec: data?.waitSec, localItem: CPCD });

			if (data?.type === 'TOKEN_INVALID') {
				setResMessage({ type: 'error', message: 'Token forged incorrectly!' });
				return false;
			}
		},
		errorsMessage: { success: { message: 'Password changed.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		apiHref: changePassUrl,
		apiQueryParams: paramsObj,
	});

	const onInvalid = (errors: FieldErrors<FormValues>) => {
		const errorHandlers = {
			required: () => setResMessage({ type: 'error', message: 'Every field fuels the Forge.' }),
			notMatchPass: () => setResMessage({ type: 'error', message: 'Passkeys forged differently.' }),
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

	return { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid, timerState };
};
