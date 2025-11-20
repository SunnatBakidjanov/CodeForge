import { Outlet } from 'react-router';
import { LegalNav } from '../../navs/legal-nav/LegalNav';

export const LegalLayout = () => {
	return (
		<div className="min-h-screen">
			<LegalNav />
			<Outlet />
		</div>
	);
};
