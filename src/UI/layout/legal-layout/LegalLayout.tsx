import { Outlet } from 'react-router';
import { LegalNav } from '../../navs/legal-nav/LegalNav';
import { HeaderLegal } from '../../headers/header-legal/HeaderLegal';

export const LegalLayout = () => {
	return (
		<div className="min-h-screen">
			<HeaderLegal />
			<LegalNav />
			<Outlet />
		</div>
	);
};
