/* --- Imports --- */
import { AuthForm } from '../../UI/auth-form/AuthForm';
import passwordIcon from '/imgs/webp/password-icon.webp';
import loginIcon from '/imgs/webp/login-icon.webp';
import emailIcon from '/imgs/webp/email-icon.webp';
import type { Props as InputProps } from '../../UI/inputs/input/Input';
import { lognPageConfig } from './page-config/login.config';
import { useApiForm } from '../../hooks/useApiForm';

/* --- Types --- */
type FormValues = {
	email: string;
	password: string;
};

type FieldData = { iconSrc: string; name: keyof FormValues; input: InputProps };

const dataInputs: FieldData[] = [
	{
		name: 'email',
		iconSrc: emailIcon,
		input: {
			type: 'email',
			autoComplete: 'on',
			maxLength: 254,
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
	const loginFormHook = useApiForm<FormValues>({
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
			formHook={loginFormHook}
			dataInputs={dataInputs}
			titleIcon={loginIcon}
			formConfig={lognPageConfig}
			href={'/register'}
		/>
	);
};
