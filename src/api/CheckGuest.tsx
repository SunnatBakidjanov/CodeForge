/* --- Imports --- */
import axios from 'axios';
import { apiUrl, errorPageRoute, guestUrl } from '../utils/urls';
import { useQuery } from '@tanstack/react-query';
import { GlobalLoader } from '@/UI/loaders/global-loader/GlobalLoader';
import { useNavigate } from 'react-router';
import { guestErrorConfig } from '@/pages/error-page/page-config/errorPage.config';

const checkGuest = async () => {
	const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith('CFG='));
	if (hasGuestCookie) return { isGuest: true };

	await axios.get(`${apiUrl}${guestUrl}`, { withCredentials: true });
	return { isGuest: true };
};

/* --- CheckGuest Component --- */
// This component checks if the user is a guest.
export const CheckGuest = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate();
	const { isLoading, isError } = useQuery({
		queryKey: [guestUrl],
		queryFn: checkGuest,
		retry: false,
	});

	if (isLoading) return <GlobalLoader />;

	if (isError) navigate(errorPageRoute, { replace: true, state: guestErrorConfig });

	return children;
};
