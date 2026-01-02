/* --- Imports --- */
import { AxiosError } from 'axios';
import { errorPageRoute, homeRoute } from '../../../utils/urls';
import { GlobalLoader } from '@/UI/loaders/global-loader/GlobalLoader';
import { Outlet, useNavigate } from 'react-router';
import { serverErrorPageConfig, guestErrorConfig } from '@/pages/error-page/page-config/errorPage.config';
import { useEffect } from 'react';
import { useCheckGuest, GUEST_COOKIE_NAME } from '@/api/useCheckGuest';

/* --- CheckGuest Component --- */
// This component checks if the user is a guest.
export const CheckGuest = ({ usePlace }: { usePlace?: 'landing' | 'auth' }) => {
	const navigate = useNavigate();
	const { isError, error, isLoading, isSuccess, data } = useCheckGuest();
	const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));

	useEffect(() => {
		if (!isError) return;

		const err = error as AxiosError;
		const status = err?.status;

		if (status === 500) {
			navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			return;
		}
	}, [isError, navigate, usePlace, error]);

	useEffect(() => {
		if (!isSuccess) return;

		if (usePlace === 'auth') {
			if (!hasGuestCookie && data?.type === 'user') {
				navigate(homeRoute, { replace: true });
			}
		}

		if (usePlace === 'landing') {
			if (!hasGuestCookie && data?.type === 'guest') {
				navigate(errorPageRoute, { replace: true, state: guestErrorConfig });
			}
		}
	}, [isSuccess, navigate, usePlace, data, hasGuestCookie]);

	if (isLoading) return <GlobalLoader />;

	if (isSuccess) return <Outlet />;

	return null;
};
