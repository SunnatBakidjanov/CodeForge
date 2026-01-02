/* --- Imports --- */
import { useQuery } from '@tanstack/react-query';
import { apiUrl, guestUrl } from '../utils/urls';
import axiosPrivate from './axiosPrivate';

type GuestData = {
	message: string;
	type: 'guest' | 'user';
};

export const GUEST_COOKIE_NAME = 'CFG=';

export const useCheckGuest = () => {
	const checkGuest = async () => {
		const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));
		if (hasGuestCookie) return { type: 'guest' };

		const res = await axiosPrivate.get<GuestData>(`${apiUrl}${guestUrl}`, { withCredentials: true });
		return { ...res.data };
	};

	return useQuery({
		queryKey: [guestUrl],
		queryFn: checkGuest,
		retry: false,
	});
};
