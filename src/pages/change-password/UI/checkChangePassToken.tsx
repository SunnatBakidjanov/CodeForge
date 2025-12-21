/* --- Imports --- */
import { apiUrl, changePassValidateUrl, errorPageRoute } from '@/utils/urls';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';

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
			} catch {
				navigate(errorPageRoute, { replace: true });
			}
		})();
	}, [paramsObj, navigate]);

	if (!isAllow) return null;

	return <Outlet />;
};
