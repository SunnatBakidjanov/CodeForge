/* --- Imports --- */
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import axios, { type AxiosError } from 'axios';
import { apiUrl } from '../../../utils/urls';

/* --- Types --- */
type FormValues = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

/* --- useRegister Hook --- */
// This hook is used to manage the form for the register page.
export const useRegister = () => {
	const [isLoading, setLoading] = useState(false);
	const { register, handleSubmit, watch, reset } = useForm<FormValues>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
	});

	const handleSubmitForm: SubmitHandler<FormValues> = async data => {
		setLoading(true);

		try {
			await axios.post(`${apiUrl}/register`, data, {
				withCredentials: true,
			});

			reset({
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
		} catch (error) {
			const err = error as AxiosError;

			console.error(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { register, watch, handleSubmit, handleSubmitForm, isLoading };
};
