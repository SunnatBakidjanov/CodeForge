/* --- Imports --- */
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { apiUrl, errorPageRoute, loginRoute, logoutUrl } from '@/utils/urls';
import { serverErrorPageConfig } from '@/pages/error-page/page-config/errorPage.config';
import { toast } from 'react-toastify';
import { AiFillAccountBook } from 'react-icons/ai';

type LogoutOptions = {
	replaceUrl?: string;
};

/* --- useLogout Hook --- */
export const useLogout = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const logout = async (options?: LogoutOptions) => {
		const { replaceUrl } = options ?? {};

		try {
			await axios.get(`${apiUrl}${logoutUrl}`, { withCredentials: true });

			queryClient.clear();
			toast.success('Logout successful', { theme: 'light', icon: AiFillAccountBook });
			navigate(replaceUrl ?? loginRoute, { replace: true });
		} catch (error) {
			const err = error as AxiosError;
			const status = err?.status;

			if (!err?.response || status === 500) {
				navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			}
		}
	};

	return { logout };
};
