import { Outlet } from 'react-router';
import { Header } from '../../header/Header';
import { Footer } from '../../footer/Footer';

export const MainPageLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};
