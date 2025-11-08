/* --- Imports --- */
import { useApiForm } from '../../../../../../../hooks/useApiForm';
import emailIcon from '/imgs/webp/email-icon.webp';
import userIcon from '/imgs/webp/user-icon.webp';
import messageIcon from '/imgs/webp/message-icon.webp';
import type { Props as InputProps } from '../../../../../../../UI/inputs/input/Input';
import type { Props as TextareaProps } from '../../../../../../../UI/inputs/textarea/Textarea';
import type { FieldErrors } from 'react-hook-form';
import { sendMailUrl } from '../../../../../../../utils/urls';

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
const dataInputs: FieldData[] = [
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

/* --- UseLandingForm Hook --- */
// This hook is used to manage the form for the landing page.
export const useLandingForm = () => {
	const COOLDOWN_TIME = 1000 * 60 * 2; // 2 minutes

	const { handleSubmit, handleSubmitForm, isLoading, register, watch, resMessage, setResMessage } = useApiForm<FormValues>({
		cooldown: { isHasCooldown: true, cooldownMs: COOLDOWN_TIME, cooldownItem: 'LPSM' },
		defaultValues: { name: '', email: '', message: '' },
		errorsMessage: { success: { message: 'Message successfully engraved.' } },
		customErrors: { 401: { type: 'error', message: 'Guest path lost. Reload the Forge.' } },
		apiHref: sendMailUrl,
	});

	const onInvalid = (errors: FieldErrors<FormValues>) => {
		// Check if any field is required
		const isRequired = Object.values(errors).some(error => error?.type === 'required');

		if (isRequired) {
			setResMessage({ type: 'error', message: 'Every field fuels the Forge.' });
			return;
		}
	};

	return {
		handleSubmit,
		handleSubmitForm,
		isLoading,
		register,
		watch,
		resMessage,
		dataInputs,
		onInvalid,
	};
};
