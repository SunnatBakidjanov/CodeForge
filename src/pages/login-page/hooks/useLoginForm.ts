/* --- Imports --- */
import type { FormValues } from '../page-config/form.config';
import { useApiForm } from '@/hooks/useApiForm';
import { loginUrl } from '@/utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { useOnSubmit, type LoginRes } from './useOnSubmit';

/* --- UseLoginForm Hook --- */
// This hook is used to manage the form for the login page.
export const useLoginForm = () => {
	const { onSubmited } = useOnSubmit();

	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues, LoginRes>({
		defaultValues: { email: '', password: '' },
		onSubmited,
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

	return { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid };
};
