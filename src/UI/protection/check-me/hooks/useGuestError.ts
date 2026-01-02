/* --- Imports --- */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GUEST_COOKIE_NAME } from '../CheckMe';
import { landingRoute } from '@/utils/urls';

/* --- useGuestError Hook --- */
export const useGuestError = () => {
	const navigate = useNavigate();
	const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));

	useEffect(() => {
		if (hasGuestCookie) navigate(landingRoute, { replace: true });
	}, [hasGuestCookie, navigate]);
};
