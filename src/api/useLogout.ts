/* --- Imports --- */
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import axios, { type AxiosError } from 'axios';
import { apiUrl, errorPageRoute, loginRoute, logoutUrl } from '@/utils/urls';
import { serverErrorPageConfig } from '@/pages/error-page/page-config/errorPage.config';
import { NotifyConfig } from '@/UI/toast/notify-config/NotifyConfig';

/* --- Types --- */
type LogoutOptions = {
	replaceUrl?: string;
};

/* --- useLogout Hook --- */
export const useLogout = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { notifyState } = NotifyConfig();

	const logout = async (options?: LogoutOptions) => {
		const { replaceUrl } = options ?? {};

		try {
			await axios.get(`${apiUrl}${logoutUrl}`, { withCredentials: true });

			queryClient.clear();
			notifyState.success('Goodbye, traveler');
			navigate(replaceUrl ?? loginRoute, { replace: true });
		} catch (error) {
			const err = error as AxiosError;
			const status = err?.status;

			if (!err?.response || status === 500) {
				notifyState.error('Server reforging');
				navigate(errorPageRoute, { replace: true, state: serverErrorPageConfig });
			}
		}
	};

	return { logout };
};
