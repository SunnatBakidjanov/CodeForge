/* --- Imports --- */
import type { Props as InputProps } from '@/UI/inputs/input/Input';
import emailIcon from '/imgs/webp/email-icon.webp';
import type { Path, RegisterOptions } from 'react-hook-form';

/* --- Types --- */
export type FormValues = {
	email: string;
};

type FieldData = { iconSrc: string; input: InputProps; name: keyof FormValues };

/* --- Data --- */
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
];

export const validate: Partial<Record<Path<FormValues>, RegisterOptions<FormValues>>> = {
	email: { required: true },
};
