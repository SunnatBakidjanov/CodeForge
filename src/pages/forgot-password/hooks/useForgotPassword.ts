import { useApiForm } from '@/hooks/useApiForm';
import type { FormValues } from '../page-config/form.config';
import { forgotPassUrl } from '@/utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { useState } from 'react';

export const useForgotPassword = () => {
	const [isFormSubmitted, setFormSubmitted] = useState(false);
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues>({
		defaultValues: { email: '' },
		errorsMessage: { success: { message: 'Welcome to the Forge.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		onSubmited: () => {
			setFormSubmitted(true);
		},
		customErrors: {
			401: { type: 'error', message: 'The Forge doesn’t open for you.' },
		},
		apiHref: forgotPassUrl,
	});

	const onInvalid = (error: FieldErrors<FormValues>) => {
		const isRequired = Object.values(error).some(error => error?.type === 'required');

		if (isRequired) {
			setResMessage({ type: 'error', message: 'Every field fuels the Forge.' });
		}
	};

	return { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid, isFormSubmitted };
};
