/* --- Imports --- */
import { AuthForm } from '../../UI/auth-form/AuthForm';
import registerIcon from '/imgs/webp/register-icon.webp';
import { registerFormConfig } from './page-config/page.config';
import { dataInputs, validate, type FormValues } from './page-config/form.config';
import { useRegisterForm } from './hooks/useRegiterForm';

/* --- RegisterPage Component --- */
// This component represents the register page of the application.
export const RegisterPage = () => {
	const registerFormHook = useRegisterForm();

	return (
		<AuthForm<FormValues>
			type="register"
			formHook={{ ...registerFormHook }}
			dataInputs={dataInputs}
			titleIcon={registerIcon}
			textConfig={registerFormConfig}
			validate={validate}
			href={'/login'}
		/>
	);
};
