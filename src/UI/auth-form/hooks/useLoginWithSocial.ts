/* --- Imports --- */
import { useGoogleLogin } from '@react-oauth/google';
import axios, { AxiosError } from 'axios';
import { apiUrl, githubUrl, homeRoute } from '@/utils/urls';
import type { ResType } from '@/hooks/useApiForm';
import { useAppDispatch } from '@/hooks/useRedux';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { useDecodeToken } from '@/hooks/useDecodeToken';
import { googleUrl } from '@/utils/urls';

/* --- Types --- */
type ResData = {
	message: string;
	token: string;
};

type EventDataType = {
	type: string;
	status: number;
	accessToken: string;
};

/* --- useLoginWithSocial Hook --- */
export const useLoginWithSocial = ({ setResMessage }: { setResMessage: (value: React.SetStateAction<ResType>) => void }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { decodeAccessToken } = useDecodeToken();
	const [githubPopup, setGithubPopup] = useState<Window | null>(null);

	const googleLogin = useGoogleLogin({
		onSuccess: async tokenResponse => {
			try {
				const res = await axios.post<ResData>(
					`${apiUrl}${googleUrl}`,
					{ googleAccessToken: tokenResponse.access_token },
					{ withCredentials: true }
				);

				const data = res?.data;
				if (!data || !data?.token) {
					setResMessage({ message: 'Invalid pattern detected.', type: 'error' });
					return;
				}

				decodeAccessToken(data.token);

				setResMessage({ message: 'Welcome to the Forge.', type: 'success' });
				navigate(homeRoute);
			} catch (error) {
				const err = error as AxiosError;
				const status = err.response?.status;

				const errors = {
					400: () => setResMessage({ type: 'error', message: 'Invalid pattern detected.' }),
					500: () => setResMessage({ type: 'error', message: 'The forge went dark. Reforging in progress.' }),
				};

				if (status && errors[status as keyof typeof errors]) {
					errors[status as keyof typeof errors]();
				}

				setResMessage({ type: 'error', message: 'Unknown forge error occurred.' });
			}
		},
		onError: error => {
			const err = error as AxiosError;
			const status = err.response?.status;

			const errors = {
				400: () => setResMessage({ type: 'error', message: 'Google login invalid. Please try again.' }),
				401: () => setResMessage({ type: 'error', message: 'Access denied. Please allow Google permissions.' }),
				403: () => setResMessage({ type: 'error', message: 'Your Google account cannot be used to sign in.' }),
				404: () => setResMessage({ type: 'error', message: 'Login service unavailable.' }),
				409: () => setResMessage({ type: 'error', message: 'Account already exists. Try another login method.' }),
				429: () => setResMessage({ type: 'error', message: 'Too many attempts. Please wait and try again.' }),
				500: () => setResMessage({ type: 'error', message: 'Server error. Please try again later.' }),
			};

			if (status && errors[status as keyof typeof errors]) {
				errors[status as keyof typeof errors]();
			}

			setResMessage({ type: 'error', message: 'Google service error. Please try again.' });
		},
	});

	const githubLogin = () => {
		const width = 600;
		const height = 700;

		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;

		if (githubPopup && !githubPopup.closed) {
			githubPopup.close();
		}

		const popup = window.open(`${apiUrl}${githubUrl}`, '_blank', `width=${width},height=${height},left=${left},top=${top}`);

		if (popup) setGithubPopup(popup);
	};

	const handleSocialLogin = (type: 'google' | 'github') => {
		return type === 'google' ? googleLogin() : githubLogin();
	};

	useEffect(() => {
		if (!githubPopup) return;

		const handler = (event: MessageEvent) => {
			const GITHUB_OPENER_LINK = 'github-auth';
			if (!event.data || event.data.source !== GITHUB_OPENER_LINK) return;

			const { type, status, accessToken } = event.data as EventDataType;

			if (!type || !status || !accessToken) {
				setResMessage({ type: 'error', message: 'GitHub response was lost in the forge.' });
				return;
			}

			if (type === 'success' && accessToken) {
				decodeAccessToken(accessToken);

				setResMessage({ type: 'success', message: 'Welcome to the Forge.' });

				navigate(homeRoute);
			}

			if (type === 'error') {
				const errors = {
					400: () => setResMessage({ type: 'error', message: 'GitHub handshake failed.' }),
					500: () => setResMessage({ type: 'error', message: 'GitHub forge overheated.' }),
				};

				if (errors[status as keyof typeof errors]) {
					errors[status as keyof typeof errors]();
				}

				setResMessage({ type: 'error', message: 'GitHub link could not be forged.' });
			}
		};

		window.addEventListener('message', handler);

		return () => window.removeEventListener('message', handler);
	}, [dispatch, navigate, setResMessage, decodeAccessToken, githubPopup]);

	return { handleSocialLogin };
};
