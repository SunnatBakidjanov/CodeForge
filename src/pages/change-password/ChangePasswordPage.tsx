/* --- Imports --- */
import { AuthForm } from '@/UI/auth-form/AuthForm';
import { dataInputs, validate } from './page-config/form.config';
import { changePasswordConfig } from './page-config/page.config';
import { useRecoverPassword } from './hooks/useRecoverPassword';
import changePassIcon from '/imgs/webp/change-pass-icon.webp';
import { loginRoute } from '@/utils/urls';

/* --- ChangePassword Component --- */
export const ChangePasswordPage = () => {
	const recoverPassHook = useRecoverPassword();

	return (
		<AuthForm
			dataInputs={dataInputs}
			textConfig={changePasswordConfig}
			formHook={{ ...recoverPassHook }}
			validate={validate}
			href={loginRoute}
			titleIcon={changePassIcon}
			type="default"
		/>
	);
};
