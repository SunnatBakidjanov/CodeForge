/* --- Imports --- */
import { AuthForm } from '../../UI/auth-form/AuthForm';
import userIcon from '/imgs/webp/user-icon.webp';
import emailIcon from '/imgs/webp/email-icon.webp';
import passwordIcon from '/imgs/webp/password-icon.webp';
import confirmPasswordIcon from '/imgs/webp/confirm-password-icon.webp';
import registerIcon from '/imgs/webp/register-icon.webp';
import type { Props as InputProps } from '../../UI/inputs/input/Input';
import { registerFormConfig } from './page-config/register.config';
import { useApiForm } from '../../hooks/useApiForm';
import { registerUrl } from '../../utils/urls';
import type { RegisterOptions, Path, FieldErrors } from 'react-hook-form';

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

/* --- ValidateForm --- */
const validate: Partial<Record<Path<FormValues>, RegisterOptions<FormValues>>> = {
	name: { required: true, pattern: { value: /^[a-zA-Z\s]+$/, message: 'nameLatnValid' } },
	email: { required: true },
	password: { required: true, minLength: { value: 4, message: 'passMinLength' } },
	confirmPassword: { required: true, validate: (value, formValues) => value === formValues.password || 'notMatchPass' },
};

/* --- RegisterPage Component --- */
// This component represents the register page of the application.
export const RegisterPage = () => {
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues>({
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
		errorsMessage: { success: { message: 'Crafting complete.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		customErrors: {
			409: { type: 'error', message: 'Email already branded in the Forge.' },
		},
		apiHref: registerUrl,
	});

	const onIsInvalid = (errors: FieldErrors<FormValues>) => {
		const errorHandlers = {
			required: () => setResMessage({ type: 'error', message: 'Every field fuels the Forge.' }),
			notMatchPass: () => setResMessage({ type: 'error', message: 'Passkeys forged differently.' }),
			nameLatnValid: () => setResMessage({ type: 'error', message: 'Only Latin runes allowed.' }),
			passMinLength: () => setResMessage({ type: 'error', message: `Your key needs more strength — 4+ chars.` }),
		};

		for (const err of Object.values(errors)) {
			const key = err?.message || err?.type;
			const handler = err?.type && errorHandlers[key as keyof typeof errorHandlers];

			if (handler) {
				handler();
				return;
			}
		}
	};

	return (
		<AuthForm<FormValues>
			type="register"
			formHook={{ handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, onIsInvalid }}
			dataInputs={dataInputs}
			titleIcon={registerIcon}
			formConfig={registerFormConfig}
			validate={validate}
			href={'/login'}
		/>
	);
};
