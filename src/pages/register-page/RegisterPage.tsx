/* --- Imports --- */
import { AuthForm } from '../../UI/auth-form/AuthForm';
import userIcon from '/imgs/webp/user-icon.webp';
import emailIcon from '/imgs/webp/email-icon.webp';
import passwordIcon from '/imgs/webp/password-icon.webp';
import confirmPasswordIcon from '/imgs/webp/confirm-password-icon.webp';
import registerIcon from '/imgs/webp/register-icon.webp';
import { useRegister } from './hooks/useRegister';
import type { Props as InputProps } from '../../UI/inputs/input/Input';
import { registerFormConfig } from './page-config/register.config';
import { useApiForm } from '../../hooks/useApiForm';

/* --- Types --- */
type FormValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
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
		name: 'email',
		iconSrc: emailIcon,
		input: {
			type: 'email',
			autoComplete: 'email',
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
	{
		name: 'confirmPassword',
		iconSrc: confirmPasswordIcon,
		input: {
			type: 'password',
			autoComplete: 'off',
			maxLength: 64,
		},
	},
];

/* --- RegisterPage Component --- */
// This component represents the register page of the application.
export const RegisterPage = () => {
	const registereFormHook = useApiForm<FormValues>({
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
		apiHref: '/register',
	});

	return (
		<AuthForm<FormValues>
			type="register"
			formHook={registereFormHook}
			dataInputs={dataInputs}
			titleIcon={registerIcon}
			formConfig={registerFormConfig}
			href={'/login'}
		/>
	);
};
