/* --- Imports --- */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GUEST_COOKIE_NAME } from '../CheckMe';
import { landingRoute } from '@/utils/urls';
import { useQueryClient } from '@tanstack/react-query';

/* --- useGuestError Hook --- */
export const useGuestError = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const useGuest = () => {
		const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));

		useEffect(() => {
			if (hasGuestCookie) navigate(landingRoute, { replace: true });
		}, [hasGuestCookie]);
	};

	const handleGuestClick = () => {
		queryClient.removeQueries({ queryKey: ['me'] });
		navigate(landingRoute, { replace: true });
	};

	return { handleGuestClick, useGuest };
};
