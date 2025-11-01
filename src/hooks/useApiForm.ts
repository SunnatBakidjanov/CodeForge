/* --- Imports --- */
import { useState } from 'react';
import { useForm, type DefaultValues, type FieldErrors, type FieldValues, type SubmitHandler } from 'react-hook-form';
import axios, { type AxiosError } from 'axios';
import { apiUrl } from '../utils/urls';

/* --- Types --- */
export type ErrorType = {
	type?: 'error' | 'success' | 'waiting';
	message?: string;
};

type Arguments<T extends FieldValues> = {
	defaultValues?: DefaultValues<T>;
	apiHref: string;
	errorsMessage?: {
		[key in 400 | 429 | 500 | 'default' | 'success']?: {
			type?: ErrorType['type'];
			message?: string;
		};
	};
	customErrors?: {
		[key: number]: {
			type?: ErrorType['type'];
			message: string;
		};
	};
	onSubmited?: () => unknown;
};

/* --- useApiForm Hook --- */
// This hook is used to manage the form for the API.
export const useApiForm = <T extends FieldValues>({ defaultValues, apiHref, errorsMessage, customErrors, onSubmited }: Arguments<T>) => {
	const [isLoading, setLoading] = useState(false);
	const [resMessage, setResMessage] = useState<ErrorType>({});

	const { register, handleSubmit, watch, reset } = useForm<T>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: defaultValues ?? ({} as DefaultValues<T>),
	});

	const onIsInvalid = (errors: FieldErrors<T>) => {
		const isRequired = Object.values(errors).some(error => {
			if (error) {
				return error.type === 'required';
			}
		});

		if (isRequired) {
			setResMessage({ type: 'error', message: 'All fields are required.' });
		}
	};

	const handleSubmitForm: SubmitHandler<T> = async data => {
		setLoading(true);

		try {
			await axios.post(`${apiUrl}${apiHref}`, data, {
				withCredentials: true,
			});

			setResMessage({ type: errorsMessage?.['success']?.type ?? 'success', message: errorsMessage?.['success']?.message ?? 'Success' });

			reset(defaultValues ?? ({} as DefaultValues<T>));

			if (onSubmited) {
				onSubmited();
			}
		} catch (error) {
			const err = error as AxiosError;

			const serverErrors = {
				400: () =>
					setResMessage({
						type: errorsMessage?.[400]?.type ?? 'error',
						message: errorsMessage?.[400]?.message ?? 'Invalid pattern detected.',
					}),
				429: () =>
					setResMessage({
						type: errorsMessage?.[429]?.type ?? 'waiting',
						message: errorsMessage?.[429]?.message ?? 'Too many strikes. Cooldown active.',
					}),
				500: () =>
					setResMessage({
						type: errorsMessage?.[500]?.type ?? 'error',
						message: errorsMessage?.[500]?.message ?? 'The forge went dark. Reforging in progress.',
					}),
			};

			const mergedErrors = {
				...serverErrors,
				...Object.fromEntries(
					Object.entries(customErrors ?? {}).map(([key, valye]) => [
						key,
						() => setResMessage({ type: valye.type ?? 'error', message: valye.message ?? 'Unknown forge error occurred.' }),
					])
				),
			};

			const status = err.response?.status;

			if (status && mergedErrors[status as keyof typeof mergedErrors]) {
				mergedErrors[status as keyof typeof mergedErrors]();
				return;
			}

			setResMessage({
				type: errorsMessage?.['default']?.type ?? 'error',
				message: errorsMessage?.['default']?.message ?? 'Unknown forge error occurred.',
			});
		} finally {
			setLoading(false);
		}
	};

	return {
		register,
		watch,
		isLoading,
		onIsInvalid,
		resMessage,
		handleSubmitForm,
		handleSubmit,
	};
};
