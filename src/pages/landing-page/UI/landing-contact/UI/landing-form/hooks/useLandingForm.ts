/* --- Imports --- */
import { useState } from 'react';
import { useForm, type FieldErrors, type SubmitHandler } from 'react-hook-form';
import axios, { type AxiosError } from 'axios';
import type { Props as InputProps } from '../../../../../../../UI/inputs/input/Input';
import type { Props as TextareaProps } from '../../../../../../../UI/inputs/textarea/Textarea';
import emailIcon from '../../../../../../../assets/imgs/webp/email-icon.webp';
import userIcon from '../../../../../../../assets/imgs/webp/user-icon.webp';
import messageIcon from '../../../../../../../assets/imgs/webp/message-icon.webp';

/* --- Types --- */
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
	const [generalMessage, setGeneralMessage] = useState('');

	const {
		register,
		handleSubmit,
		watch,
		reset,
		clearErrors,
		setError,
		formState: { errors, isSubmitSuccessful },
	} = useForm<FormValues>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: { name: '', email: '', message: '' },
	});

	const isHasErrors = Object.keys(errors).length > 0;

	const onInvalid = (errors: FieldErrors<FormValues>) => {
		const isRequired = Object.values(errors).some(error => error.type === 'required');

		if (isRequired) {
			setGeneralMessage('All fields are required');
		}
	};

	const handleSubmitForm: SubmitHandler<FormValues> = async data => {
		setLoading(true);

		try {
			const res = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
			console.log('✅ Response:', res.data);
			setGeneralMessage('Message sent successfully');
			reset({
				name: '',
				email: '',
				message: '',
			});
		} catch (error) {
			console.error('❌ Error:', (error as AxiosError).message);
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
		isHasErrors,
		handleSubmit,
		setError,
		clearErrors,
		dataInputs,
		isSubmitSuccessful,
	};
};
