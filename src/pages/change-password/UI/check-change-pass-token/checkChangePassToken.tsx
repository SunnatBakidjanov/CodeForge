/* --- Imports --- */
import { apiUrl, changePassValidateUrl, errorPageRoute } from '@/utils/urls';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';
import { resetPasswordPageConfig, serverErrorPageConfig } from '@/pages/error-page/page-config/errorPage.config';

/* --- CheckChangePassToken Component --- */
export const CheckChangePassToken = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [isAllow, setIsAllow] = useState(false);
	const paramsObj = Object.fromEntries(searchParams.entries());

	useEffect(() => {
		(async () => {
			try {
				await axios.get(`${apiUrl}${changePassValidateUrl}`, { params: paramsObj });

				setIsAllow(true);
			} catch (error) {
				const err = error as AxiosError;
				const status = err.response?.status;

				if (status == 400) {
					navigate(errorPageRoute, { replace: true, state: resetPasswordPageConfig });
					return;
				}

				navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			}
		})();
	}, [paramsObj, navigate]);

	if (!isAllow) return null;

	return <Outlet />;
};
