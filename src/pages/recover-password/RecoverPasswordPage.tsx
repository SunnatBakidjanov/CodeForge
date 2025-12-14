import { AuthForm } from '@/UI/auth-form/AuthForm';
import { dataInputs } from './page-config/form.config';
import { RecoverPasswordConfig } from './page-config/page.config';
import { useRecoverPassword } from './hooks/useRecoverPassword';

export const RecoverPasswordPage = () => {
	const recoverPassHook = useRecoverPassword();

	return (
		<AuthForm dataInputs={dataInputs} textConfig={RecoverPasswordConfig} formHook={{ ...recoverPassHook }} href="" titleIcon="" type="default" />
	);
};
