/* --- Imports --- */
import { useApiForm } from '@/hooks/useApiForm';
import type { FormValues } from '../page-config/form.config';
import { forgotPassUrl } from '@/utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import type { FormState } from '@/UI/auth-form/hooks/useBtnTimerSubmit';
import type { FormResError } from '@/UI/auth-form/hooks/useBtnTimerSubmit';

/* --- useForgotPassword Hook --- */
export const useForgotPassword = () => {
	const [formState, setFormState] = useState<FormState>({});
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues, never, FormResError>({
		defaultValues: { email: '' },
		errorsMessage: { success: { message: 'Message forged and sent.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		onSubmited: () => {
			setFormState({ formSubmitted: true, isError: false });
			setTimeout(() => setFormState({ formSubmitted: false, isError: false }), 10);
		},
		onError: error => {
			const status = error?.response?.status;
			const data = error?.response?.data;

			if (status === 429) {
				setFormState({ formSubmitted: false, isError: true, errData: data });
				setTimeout(() => setFormState({ formSubmitted: false, isError: false }), 10);
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

	return { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid, formState };
};
