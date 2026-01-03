/* --- Imports --- */
import { Outlet } from 'react-router';
import { Footer } from '../../footer/Footer';
import { Header } from '@/UI/header/Header';
import { MainLayoutNav } from '@/UI/header/UI/main-layout-nav/MainLayoutNav';
import { useMe } from '@/api/useMe';

/* --- MainPageLayout Component --- */
// This component represents the main page layout of the application.
export const MainPageLayout = () => {
	const { data } = useMe({ staleTime: Infinity });
	const isGuest = data?.type === 'guest';

	return (
		<>
			<Header Nav={MainLayoutNav} burgerClassNames={{ btn: 'sm:hidden' }} isHasBurger={isGuest} />
			<Outlet />
			<Footer />
		</>
	);
};
