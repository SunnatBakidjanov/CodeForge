/* --- Imports --- */
import { apiUrl, changePassValidateUrl, errorPageRoute } from '@/utils/urls';
import axios, { AxiosError } from 'axios';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { resetPasswordPageConfig, serverErrorPageConfig } from '@/pages/error-page/page-config/errorPage.config';
import { GlobalLoader } from '@/UI/loaders/global-loader/GlobalLoader';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

/* --- CheckChangePassToken Component --- */
export const CheckChangePassToken = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const paramsObj = Object.fromEntries(searchParams.entries());

	const getChangePassToken = async () => {
		await axios.get(`${apiUrl}${changePassValidateUrl}`, { params: paramsObj });

		return { isCheckToken: true };
	};

	const { isError, error, isLoading } = useQuery({
		queryKey: [changePassValidateUrl],
		queryFn: getChangePassToken,
		retry: false,
	});

	useEffect(() => {
		const err = error as AxiosError;
		const status = err?.status;

		if (status === 400) {
			navigate(errorPageRoute, { replace: true, state: resetPasswordPageConfig });
			return;
		}

		navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
		return;
	}, [isError, navigate, error]);

	if (isLoading) return <GlobalLoader />;

	return <Outlet />;
};
