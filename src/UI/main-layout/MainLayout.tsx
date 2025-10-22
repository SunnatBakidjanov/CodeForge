import { Outlet } from 'react-router';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};
