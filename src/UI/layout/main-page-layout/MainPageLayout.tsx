/* --- Imports --- */
import { Outlet } from 'react-router';
import { HeaderLanding } from '../../headers/header-landing/HeaderLanding';
import { Footer } from '../../footer/Footer';

/* --- MainPageLayout Component --- */
// This component represents the main page layout of the application.
export const MainPageLayout = () => {
	return (
		<>
			<HeaderLanding />
			<Outlet />
			<Footer />
		</>
	);
};
