/* --- Imports --- */
import { useState } from 'react';
import { useForm, type FieldErrors, type SubmitHandler } from 'react-hook-form';
import axios, { type AxiosError } from 'axios';
import type { Props as InputProps } from '../../../../../../../UI/inputs/input/Input';
import type { Props as TextareaProps } from '../../../../../../../UI/inputs/textarea/Textarea';
import emailIcon from '/imgs/webp/email-icon.webp';
import userIcon from '/imgs/webp/user-icon.webp';
import messageIcon from '/imgs/webp/message-icon.webp';
import { apiUrl } from '../../../../../../../utils/urls';

/* --- Types --- */
export type ErrorType = {
	type?: 'error' | 'success' | 'waiting';
	message?: string;
};

export type FormValues = {
	name: string;
	email: string;
	message: string;
	general: string;
};

export type FieldData =
	| { type: 'input'; text: string; iconSrc: string; name: keyof FormValues; input: InputProps }
	| { type: 'textarea'; text: string; iconSrc: string; name: keyof FormValues; input: TextareaProps };

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

/* --- useLandingForm Hook --- */
// This hook is used to manage the form for the landing page.
export const useLandingForm = () => {
	const [isLoading, setLoading] = useState(false);
	const [generalMessage, setGeneralMessage] = useState<ErrorType>({});

	const { register, handleSubmit, watch, reset, clearErrors } = useForm<FormValues>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: { name: '', email: '', message: '' },
	});

	const onInvalid = (errors: FieldErrors<FormValues>) => {
		const isRequired = Object.values(errors).some(error => error.type === 'required');

		if (isRequired) {
			setGeneralMessage({ type: 'error', message: 'All fields are required.' });
		}
	};

	const handleSubmitForm: SubmitHandler<FormValues> = async data => {
		setLoading(true);

		try {
			await axios.post(`${apiUrl}/send-email`, data, {
				withCredentials: true,
			});

			setGeneralMessage({ type: 'success', message: 'Message sent successfully!' });

			reset({
				name: '',
				email: '',
				message: '',
			});
		} catch (error) {
			const err = error as AxiosError;

			const serverErrors = {
				400: () => setGeneralMessage({ type: 'error', message: 'Invalid pattern detected.' }),
				429: () => setGeneralMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' }),
				500: () => setGeneralMessage({ type: 'error', message: 'The forge went dark. Reforging in progress.' }),
			};

			const status = err.response?.status;

			if (status && serverErrors[status as keyof typeof serverErrors]) {
				return serverErrors[status as keyof typeof serverErrors]();
			}

			return setGeneralMessage({ type: 'error', message: 'Unknown forge error occurred.' });
		} finally {
			setLoading(false);
		}
	};

	return {
		register,
		watch,
		isLoading,
		onInvalid,
		generalMessage,
		handleSubmitForm,
		handleSubmit,
		clearErrors,
		dataInputs,
	};
};
