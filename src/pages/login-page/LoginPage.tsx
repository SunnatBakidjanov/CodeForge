/* --- Imports --- */
import { AuthForm } from '@/UI/auth-form/AuthForm';
import loginIcon from '/imgs/webp/login-icon.webp';
import { lognPageConfig } from './page-config/page.config';
import { validate, dataInputs, type FormValues } from './page-config/form.config';
import { useLoginForm } from './hooks/useLoginForm';

/* --- LoginPage Component --- */
// This component represents the login page of the application.
export const LoginPage = () => {
	const loginFormHook = useLoginForm();

	return (
		<AuthForm<FormValues>
			type="login"
			formHook={{ ...loginFormHook }}
			dataInputs={dataInputs}
			titleIcon={loginIcon}
			textConfig={lognPageConfig}
			validate={validate}
			href={'/register'}
		/>
	);
};
