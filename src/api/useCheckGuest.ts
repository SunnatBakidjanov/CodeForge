/* --- Imports --- */
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { apiUrl, guestUrl } from '../utils/urls';

export const GUEST_COOKIE_NAME = 'CFG=';

const checkGuest = async () => {
	const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));
	if (hasGuestCookie) return { isGuest: true };

	await axios.get(`${apiUrl}${guestUrl}`, { withCredentials: true });
	return { isGuest: true };
};

export const useCheckGuest = () => {
	return useQuery({
		queryKey: [guestUrl],
		queryFn: checkGuest,
		retry: false,
	});
};
