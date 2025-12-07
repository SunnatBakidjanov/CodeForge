/* --- Imports --- */
import { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { apiUrl, guestUrl } from '../utils/urls';
import { Outlet } from 'react-router';
import { useAppDispatch } from '../hooks/useRedux';
import { setIsGuest } from '../redux/guest-slice/slice';

/* --- CheckGuest Component --- */
// This component checks if the user is a guest.
export const CheckGuest = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const guestId = document.cookie.includes('CFG');

		if (guestId) return;

		(async () => {
			try {
				await axios.get(`${apiUrl}${guestUrl}`, {
					withCredentials: true,
				});

				dispatch(setIsGuest({ isGuest: true }));
			} catch (error) {
				const err = error as AxiosError;

				if (err) dispatch(setIsGuest({ isGuest: false }));
			}
		})();
	}, [dispatch]);

	return <Outlet />;
};
