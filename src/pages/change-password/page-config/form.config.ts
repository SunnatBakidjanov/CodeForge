import type { Props as InputProps } from '@/UI/inputs/input/Input';
import passwordIcon from '/imgs/webp/password-icon.webp';
import confirmPasswordIcon from '/imgs/webp/confirm-password-icon.webp';
import type { Path, RegisterOptions } from 'react-hook-form';

export type FormValues = {
	password: string;
	confirmPassword: string;
};

type FieldData = { iconSrc: string; input: InputProps; name: keyof FormValues };

export const dataInputs: FieldData[] = [
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

export const validate: Partial<Record<Path<FormValues>, RegisterOptions<FormValues>>> = {
	password: { required: true, minLength: { value: 4, message: 'passMinLength' } },
	confirmPassword: { required: true, validate: (value, formValues) => value === formValues.password || 'notMatchPass' },
};
