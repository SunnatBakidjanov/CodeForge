/* --- Imports --- */
import { forgotPasswordRoute } from '@/utils/urls';
import type { LocationState } from '@/pages/error-page/ErrorPage';

/* --- pageConfigs --- */
export const notFoundPageConfig = {
	title: '404',
	subtitle: 'Page not found',
	description: 'The page you’re looking for doesn’t exist or was moved to another forge.',
	btnText: 'Return to Forge',
};

export const resetPasswordPageConfig = {
	locationPath: forgotPasswordRoute,
	locationDescription:
		'The token has lost its power. It might have expired or already been used. Head back to the Forge to request a new reset link.',
	locationTitle: '400',
	locationSubtitle: 'Forge reset failed',
	locationBtnText: 'Request new rune',
} as LocationState;

export const serverErrorPageConfig = {
	locationPath: '/',
	locationDescription: 'Something went wrong in the Forge. The cogs stopped turning. Our team is reforging the system.',
	locationTitle: '500',
	locationSubtitle: 'The Forge Went Dark',
	locationBtnText: 'Return to Forge',
} as LocationState;

export const guestErrorConfig = {
	locationPath: '/',
	locationDescription:
		'Your guest token is stored in cookies. If cookies are disabled in your browser, the Forge cannot grant you access. Re-enable cookies to continue.',
	locationTitle: '400',
	locationSubtitle: 'Guest Token Invalid',
	locationBtnText: 'Reforge Token',
} as LocationState;
