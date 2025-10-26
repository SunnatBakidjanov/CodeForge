import { Outlet } from 'react-router';
import { Header } from '../header/Header';
import { Footer } from '../footer/Footer';
import { Embers } from '../effects/ember/Ember';

export const MainLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			<Embers />
		</>
	);
};
