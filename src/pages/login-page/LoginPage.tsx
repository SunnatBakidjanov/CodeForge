/* --- Imports --- */
import { AuthForm } from '../../UI/auth-form/AuthForm';
import userIcon from '/imgs/webp/user-icon.webp';
import passwordIcon from '/imgs/webp/password-icon.webp';
import loginIcon from '/imgs/webp/login-icon.webp';
import { useLogin } from './hooks/useLogin';
import type { Props as InputProps } from '../../UI/inputs/input/Input';
import { lognPageConfig } from './page-config/login.config';

/* --- Types --- */
type FormValues = {
	name: string;
	password: string;
};

type FieldData = { iconSrc: string; name: keyof FormValues; input: InputProps };

const dataInputs: FieldData[] = [
	{
		name: 'name',
		iconSrc: userIcon,
		input: {
			type: 'text',
			autoComplete: 'on',
			maxLength: 20,
		},
	},
	{
		name: 'password',
		iconSrc: passwordIcon,
		input: {
			type: 'password',
			autoComplete: 'off',
			maxLength: 64,
		},
	},
];

/* --- LoginPage Component --- */
// This component represents the login page of the application.
export const LoginPage = () => {
	const loginFormHook = useLogin();

	return (
		<AuthForm<FormValues>
			type="login"
			formHook={loginFormHook}
			dataInputs={dataInputs}
			titleIcon={loginIcon}
			formConfig={lognPageConfig}
			href={'/register'}
		/>
	);
};
