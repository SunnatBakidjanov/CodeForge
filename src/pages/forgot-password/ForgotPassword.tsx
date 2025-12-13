/* --- Imports --- */
import { AuthForm } from '@/UI/auth-form/AuthForm';
import { dataInputs, validate, type FormValues } from './page-config/form.config';
import recoverPasswordIcon from '/imgs/webp/recover-password-icon.webp';
import { ForgotPasswordConfig } from './page-config/page.config';
import { useForgotPassword } from './hooks/useForgotPassword';
import { loginRoute } from '@/utils/urls';

/* --- ForgotPassword Component --- */
export const ForgotPassword = () => {
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid, isFormSubmitted } = useForgotPassword();

	return (
		<AuthForm<FormValues>
			type="forgot-password"
			dataInputs={dataInputs}
			formHook={{ handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid }}
			titleIcon={recoverPasswordIcon}
			isStartTimer={isFormSubmitted}
			isBtnUseTimer={true}
			href={loginRoute}
			validate={validate}
			textConfig={ForgotPasswordConfig}
		/>
	);
};
