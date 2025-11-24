/* --- Imports --- */
import { Outlet } from 'react-router';
import { HeaderLegal } from '../../headers/header-legal/HeaderLegal';

/* --- LegalLayout Component --- */
export const LegalLayout = () => {
	return (
		<div className="min-h-screen">
			<HeaderLegal />
			<Outlet />
		</div>
	);
};
