/* --- Imports --- */
import { Navigate, Route, Routes } from 'react-router';
import { LandingRoute } from './landing-route/LandingRoute';

/* --- AppRoutes Component --- */
// This component manages the routing for the application.
export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={'/landing'} replace />} />
			<Route path="/*" element={<LandingRoute />} />
		</Routes>
	);
};
