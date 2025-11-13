/* --- Imports --- */
import { AuthForm } from '../../UI/auth-form/AuthForm';
import loginIcon from '/imgs/webp/login-icon.webp';
import { lognPageConfig } from './page-config/page.config';
import { useApiForm } from '../../hooks/useApiForm';
import { validate, dataInputs, type FormValues } from './page-config/form.config';

/* --- LoginPage Component --- */
// This component represents the login page of the application.
export const LoginPage = () => {
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage } = useApiForm<FormValues>({
		//ЗАГЛУШКА: Сдлелать href в ссылке через .env
		apiHref: '/login',
		defaultValues: { email: '', password: '' },
		errorsMessage: { success: { message: 'Welcome to the Forge.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		customErrors: {
			401: { type: 'error', message: 'The Forge doesn’t open for you.' },
		},
	});

	return (
		<AuthForm<FormValues>
			type="login"
			formHook={{ handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage }}
			dataInputs={dataInputs}
			titleIcon={loginIcon}
			textConfig={lognPageConfig}
			validate={validate}
			href={'/register'}
		/>
	);
};
