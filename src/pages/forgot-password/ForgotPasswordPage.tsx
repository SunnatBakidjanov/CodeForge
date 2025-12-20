/* --- Imports --- */
import { AuthForm } from '@/UI/auth-form/AuthForm';
import { dataInputs, validate, type FormValues } from './page-config/form.config';
import recoverPasswordIcon from '/imgs/webp/recover-password-icon.webp';
import { ForgotPasswordConfig } from './page-config/page.config';
import { useForgotPassword } from './hooks/useForgotPassword';
import { loginRoute } from '@/utils/urls';

/* --- ForgotPassword Component --- */
export const ForgotPasswordPage = () => {
	const forgotPassHook = useForgotPassword();

	return (
		<AuthForm<FormValues>
			type="default"
			dataInputs={dataInputs}
			formHook={{ ...forgotPassHook }}
			titleIcon={recoverPasswordIcon}
			href={loginRoute}
			validate={validate}
			textConfig={ForgotPasswordConfig}
		/>
	);
};
