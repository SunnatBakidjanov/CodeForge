/* --- Imports --- */
import { useMe } from '@/api/useMe';
import { ErrorPage } from '@/pages/error-page/ErrorPage';
import { guestErrorConfig, serverErrorPageConfig } from '@/pages/error-page/page-config/errorPage.config';
import { GlobalLoader } from '@/UI/loaders/global-loader/GlobalLoader';
import { errorPageRoute, homeRoute, landingRoute } from '@/utils/urls';
import type { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useGuestError } from './hooks/useGuestError';
import { useLogout } from '@/api/useLogout';

/* --- Types --- */
type Props = {
	checkMeFn?: () => unknown;
	usePlace: 'landing' | 'auth';
};

type ErrorMap = {
	guestCookieError?: boolean;
};

export const GUEST_COOKIE_NAME = 'CFG=';

/* --- CheckMe Component --- */
export const CheckMe = ({ usePlace }: Props) => {
	const navigate = useNavigate();
	const staleTime = 1000 * 60 * 5;
	const { isLoading, isError, isSuccess, error, data } = useMe({ staleTime });
	const [errorMap, setErrorMap] = useState<ErrorMap>({});
	const { logout } = useLogout();
	const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));
	const { handleGuestClick, useGuest } = useGuestError();

	useEffect(() => {
		if (!isError) return;

		const err = error as AxiosError<{ message: string }>;
		const status = err?.status;

		if (!err?.response || status === 500) {
			navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			return;
		}

		logout({ replaceUrl: landingRoute });
		return;
	}, [isError, error, navigate, data, usePlace, logout]);

	useEffect(() => {
		if (!isSuccess) return;

		if (data?.type === 'user') {
			if (usePlace === 'auth') {
				navigate(homeRoute, { replace: true });
				return;
			}
		}

		if (data?.type === 'guest') {
			if (usePlace === 'landing' && !hasGuestCookie) {
				setErrorMap({ guestCookieError: true });
				return;
			}
		}

		setErrorMap({});
	}, [isSuccess, usePlace, data, hasGuestCookie, setErrorMap, navigate, isLoading]);

	if (isLoading) return <GlobalLoader />;

	if (errorMap.guestCookieError) return <ErrorPage pageState={guestErrorConfig} useCallbackFn={useGuest} handleClick={handleGuestClick} />;

	if (isSuccess) return <Outlet />;

	return null;
};
