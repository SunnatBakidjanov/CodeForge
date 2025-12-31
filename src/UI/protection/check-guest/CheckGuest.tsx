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
	const { isError, error, isLoading, isSuccess } = useCheckGuest();

	useEffect(() => {
		if (!isError) return;

		const err = error as AxiosError;
		const status = err?.status;

		if (status === 500) {
			navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			return;
		}

		if (usePlace === 'landing') {
			const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));
			if (!hasGuestCookie) navigate(errorPageRoute, { replace: true, state: guestErrorConfig });
		}

		if (usePlace === 'auth') {
			navigate(homeRoute, { replace: true });
		}
	}, [isError, navigate, usePlace, error]);

	if (isLoading) return <GlobalLoader />;

	if (isSuccess) return <Outlet />;

	return null;
};
