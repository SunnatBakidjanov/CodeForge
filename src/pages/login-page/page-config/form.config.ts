/** --- Imports --- */
import passwordIcon from '/imgs/webp/password-icon.webp';
import emailIcon from '/imgs/webp/email-icon.webp';
import type { Path, RegisterOptions } from 'react-hook-form';
import type { Props as InputProps } from '@/UI/inputs/input/Input';

/* --- Types --- */
export type FormValues = {
	email: string;
	password: string;
};

type FieldData = { iconSrc: string; name: keyof FormValues; input: InputProps };

export const dataInputs: FieldData[] = [
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

export const validate: Partial<Record<Path<FormValues>, RegisterOptions<FormValues>>> = {
	email: { required: true },
	password: { required: true },
};
