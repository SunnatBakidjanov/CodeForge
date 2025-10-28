/* --- Imports --- */
import { Routes, Route } from 'react-router';
import { LandingPage } from '../../pages/landing-page/LandingPage';

/* --- LandingRoute Component --- */
// This component handles the routing for the landing page.
export const LandingRoute = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
		</Routes>
	);
};
