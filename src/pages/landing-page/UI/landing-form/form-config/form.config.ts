/* --- Imports --- */
import emailIcon from '/imgs/webp/email-icon.webp';
import userIcon from '/imgs/webp/user-icon.webp';
import messageIcon from '/imgs/webp/message-icon.webp';
import type { Props as InputProps } from '@/UI/inputs/input/Input';
import type { Props as TextareaProps } from '@/UI/inputs/textarea/Textarea';

/* --- Types --- */
export type FieldData =
	| { type: 'input'; text: string; iconSrc: string; name: keyof FormValues; input: InputProps }
	| { type: 'textarea'; text: string; iconSrc: string; name: keyof FormValues; input: TextareaProps };

export type FormValues = {
	name: string;
	email: string;
	message: string;
};

/* --- Data --- */
export const dataInputs: FieldData[] = [
	{
		type: 'input',
		name: 'name',
		text: 'Name',
		iconSrc: userIcon,
		input: {
			type: 'text',
			autoComplete: 'on',
			placeholder: 'Name',
			maxLength: 20,
		},
	},
	{
		type: 'input',
		name: 'email',
		text: 'Email',
		iconSrc: emailIcon,
		input: {
			type: 'email',
			autoComplete: 'email',
			placeholder: 'Email',
			maxLength: 254,
		},
	},
	{
		type: 'textarea',
		name: 'message',
		text: 'Message',
		iconSrc: messageIcon,
		input: {
			autoComplete: 'off',
			placeholder: 'Message',
			isAutoresize: true,
			maxLength: 500,
		},
	},
];
