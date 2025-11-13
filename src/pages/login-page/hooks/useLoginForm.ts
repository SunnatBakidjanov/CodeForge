/* --- Imports --- */
import type { FormValues } from '../page-config/form.config';
import { useApiForm } from '../../../hooks/useApiForm';

/* --- UseLoginForm Hook --- */
// This hook is used to manage the form for the login page.
export const useLoginForm = () => {
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage } = useApiForm<FormValues>({
		//ЗАГЛУШКА: Сдлелать href в ссылке через .env
		apiHref: '/login',
		defaultValues: { email: '', password: '' },
		errorsMessage: { success: { message: 'Welcome to the Forge.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		customErrors: {
			401: { type: 'error', message: 'The Forge doesn’t open for you.' },
		},
	});

	return { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage };
};
