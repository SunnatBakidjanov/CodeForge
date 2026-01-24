/* --- Imports --- */
import { useAppSelector } from '@/hooks/useRedux';
import { privateRoute, termsRoute } from '@/utils/urls';
import { useLocation } from 'react-router';

/* --- Types --- */
export type Links = {
	link: string | null;
	text: string;
	type: 'text' | 'img';
};

/* --- useLegalNav Hook --- */
export const useLegalNav = () => {
	const prevRoute = useAppSelector(state => state.prevRoute.previous);
	const links = [
		{ link: termsRoute, text: 'Terms of Service', type: 'text' },
		{ link: privateRoute, text: 'Privacy Policy', type: 'text' },
		{ link: prevRoute, text: 'Back', type: 'img' },
	] as Links[];

	const { pathname } = useLocation();
	const activeLink = (link?: string | null) => {
		if (!link) return false;
		return pathname === link || pathname.startsWith(link + '/');
	};

	return { links, activeLink };
};
