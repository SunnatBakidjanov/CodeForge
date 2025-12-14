import type { Props as InputProps } from '@/UI/inputs/input/Input';
import passwordIcon from '/imgs/webp/password-icon.webp';
import confirmPasswordIcon from '/imgs/webp/confirm-password-icon.webp';

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
