/* --- Imports --- */
import { useState } from 'react';
import { useForm, type DefaultValues, type FieldValues, type SubmitHandler } from 'react-hook-form';
import axios, { type AxiosError, type AxiosResponse } from 'axios';
import { apiUrl } from '@/utils/urls';
import axiosPrivate from '@/api/axiosPrivate';

/* --- Types --- */
export type ResType = {
	type?: 'error' | 'success' | 'waiting';
	message?: string;
};

type Arguments<T extends FieldValues, R, E> = {
	defaultValues?: DefaultValues<T>;
	apiHref: string;
	errorsMessage?: {
		[key in 400 | 429 | 500 | 'default' | 'success']?: {
			type?: ResType['type'];
			message?: string;
		};
	};
	customErrors?: {
		[key: number]: {
			type?: ResType['type'];
			message: string;
		};
	};
	setSubmitValues?: () => unknown;
	onSubmited?: (res?: AxiosResponse<R>) => unknown;
	onError?: (error: AxiosError<E>) => unknown;
	onFinaly?: () => unknown;
	isPrivateCheck?: boolean;
	apiQueryParams?: { [key: string]: string };
};

/* --- useApiForm Hook --- */
// This hook is used to manage the form for the API.
export const useApiForm = <T extends FieldValues, R = never, E = never>({
	defaultValues,
	apiHref,
	errorsMessage,
	customErrors,
	setSubmitValues,
	onSubmited,
	onError,
	onFinaly,
	isPrivateCheck = false,
	apiQueryParams,
}: Arguments<T, R, E>) => {
	const [isLoading, setLoading] = useState(false);
	const [resMessage, setResMessage] = useState<ResType>({});

	const { register, handleSubmit, watch, reset } = useForm<T>({
		mode: 'onSubmit',
		reValidateMode: 'onSubmit',
		defaultValues: defaultValues ?? ({} as DefaultValues<T>),
	});

	const handleSubmitForm: SubmitHandler<T> = async data => {
		const canProceed = setSubmitValues?.();
		if (canProceed === false) return;

		setLoading(true);

		try {
			let res;

			if (isPrivateCheck) {
				res = await axiosPrivate.post(`${apiUrl}${apiHref}`, data, { withCredentials: true, params: apiQueryParams });
			}

			res = await axios.post(`${apiUrl}${apiHref}`, data, { withCredentials: true, params: apiQueryParams });

			if (!res.data) setResMessage({ type: 'error', message: 'The forge went dark. Reforging in progress.' });

			onSubmited?.(res);

			setResMessage({ type: errorsMessage?.['success']?.type ?? 'success', message: errorsMessage?.['success']?.message ?? 'Success' });
			reset(defaultValues ?? ({} as DefaultValues<T>));
		} catch (error) {
			const err = error as AxiosError<E>;
			const status = err.response?.status;

			const isCustomError = onError?.(err);
			if (isCustomError === false) return;

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
			onFinaly?.();
		}
	};

	return {
		register,
		watch,
		isLoading,
		resMessage,
		handleSubmitForm,
		handleSubmit,
		setResMessage,
	};
};
