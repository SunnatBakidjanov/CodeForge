/* --- Imports --- */
import { Outlet } from 'react-router';
import { Embers } from '../../effects/ember/Ember';

/* --- MainLayout Component --- */
// This component represents the main layout of the application.
export const MainLayout = () => {
	return (
		<>
			<Outlet />
			<Embers />
		</>
	);
};
