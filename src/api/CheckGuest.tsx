/* --- Imports --- */
import axios, { AxiosError } from 'axios';
import { apiUrl, errorPageRoute, guestUrl, homeRoute } from '../utils/urls';
import { useQuery } from '@tanstack/react-query';
import { GlobalLoader } from '@/UI/loaders/global-loader/GlobalLoader';
import { Outlet, useNavigate } from 'react-router';
import { serverErrorPageConfig } from '@/pages/error-page/page-config/errorPage.config';
import { useEffect } from 'react';

const checkGuest = async () => {
	const GUEST_COOKIE_NAME = 'CFG=';
	const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));
	if (hasGuestCookie) return { isGuest: true };

	await axios.get(`${apiUrl}${guestUrl}`, { withCredentials: true });
	return { isGuest: true };
};

/* --- CheckGuest Component --- */
// This component checks if the user is a guest.
export const CheckGuest = ({ usePlace }: { usePlace?: 'landing' | 'auth' }) => {
	const navigate = useNavigate();
	const { isLoading, isError, error } = useQuery({
		queryKey: [guestUrl],
		queryFn: checkGuest,
		retry: false,
	});

	useEffect(() => {
		if (!isError) return;

		const err = error as AxiosError;
		const status = err?.status;

		if (status === 500) {
			navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			return;
		}

		if (usePlace === 'auth') {
			navigate(homeRoute, { replace: true });
		}
	}, [isError, navigate, usePlace, error]);

	if (isLoading) return <GlobalLoader />;

	return <Outlet />;
};
