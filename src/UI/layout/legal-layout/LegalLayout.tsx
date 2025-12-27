/* --- Imports --- */
import { Outlet } from 'react-router';
import { Header } from '@/UI/header/Header';
import { LegalNav } from '@/UI/header/UI/leagal-nav/LegalNav';

/* --- LegalLayout Component --- */
export const LegalLayout = () => {
	return (
		<div className="min-h-screen">
			<Header Nav={LegalNav} />
			<Outlet />
		</div>
	);
};
