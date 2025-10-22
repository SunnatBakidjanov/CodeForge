import { Outlet } from 'react-router';
import { Header } from '../header/Header';

export const MainLayout = () => {
	return (
		<>
			<Header />

			<Outlet />
		</>
	);
};
