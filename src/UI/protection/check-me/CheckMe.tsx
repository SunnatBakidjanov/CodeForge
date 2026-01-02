/* --- Imports --- */
import { useMe } from '@/api/useMe';
import { serverErrorPageConfig } from '@/pages/error-page/page-config/errorPage.config';
import { GlobalLoader } from '@/UI/loaders/global-loader/GlobalLoader';
import { errorPageRoute, landingRoute } from '@/utils/urls';
import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

/* --- CheckMe Component --- */
export const CheckMe = () => {
	const navigate = useNavigate();
	const { isLoading, isError, isSuccess, error } = useMe();

	useEffect(() => {
		if (!isError) return;

		const err = error as AxiosError;
		const status = err?.status;

		if (status === 500) {
			navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			return;
		} else {
			navigate(landingRoute, { replace: true });
		}
	}, [isError, error, navigate]);

	if (isLoading) return <GlobalLoader />;

	if (isSuccess) return <Outlet />;

	return null;
};
