/** --- Imports --- */
import userIcon from '/imgs/webp/user-icon.webp';
import emailIcon from '/imgs/webp/email-icon.webp';
import passwordIcon from '/imgs/webp/password-icon.webp';
import confirmPasswordIcon from '/imgs/webp/confirm-password-icon.webp';
import type { Props as InputProps } from '@/UI/inputs/input/Input';
import type { Path, RegisterOptions } from 'react-hook-form';

/** --- Types --- */
export type FormValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

type FieldData = { iconSrc: string; name: keyof FormValues; input: InputProps };

/** --- Data --- */
export const dataInputs: FieldData[] = [
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
export const validate: Partial<Record<Path<FormValues>, RegisterOptions<FormValues>>> = {
	name: { required: true, pattern: { value: /^[a-zA-Z\s]+$/, message: 'nameLatnValid' } },
	email: { required: true },
	password: { required: true, minLength: { value: 4, message: 'passMinLength' } },
	confirmPassword: { required: true, validate: (value, formValues) => value === formValues.password || 'notMatchPass' },
};
