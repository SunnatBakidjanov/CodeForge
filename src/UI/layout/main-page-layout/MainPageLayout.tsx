/* --- Imports --- */
import { Outlet } from 'react-router';
import { Footer } from '../../footer/Footer';
import { Header } from '@/UI/header/Header';
import { MainLayoutNav } from '@/UI/header/UI/main-layout-nav/MainLayoutNav';

/* --- MainPageLayout Component --- */
// This component represents the main page layout of the application.
export const MainPageLayout = () => {
	return (
		<>
			<Header Nav={MainLayoutNav} />
			<Outlet />
			<Footer />
		</>
	);
};
