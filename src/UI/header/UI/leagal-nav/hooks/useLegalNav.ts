import { useAppSelector } from '@/hooks/useRedux';
import { privateRoute, termsRoute } from '@/utils/urls';

export const useLegalNav = () => {
	const prevRoute = useAppSelector(state => state.prevRoute.previous);
	const links = [
		{ link: termsRoute, text: 'Terms of Service', type: 'text' },
		{ link: privateRoute, text: 'Privacy Policy', type: 'text' },
		{ link: prevRoute, text: '', type: 'img' },
	];

	return { links };
};
