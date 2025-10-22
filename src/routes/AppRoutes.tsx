/* --- Imports --- */
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { LandingRoute } from './landing-route/LandingRoute';
import { MainLayout } from '../UI/main-layout/MainLayout';

/* --- AppRoutes Component --- */
// This component manages the routing for the application.
export const AppRoutes = () => {
	const navigate = useNavigate();

	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Navigate to={'/landing'} replace />} />
				<Route path="/*" element={<LandingRoute />} />
				<Route
					path="/register"
					element={
						<div
							className="text-white"
							onClick={() => {
								navigate('/landing');
							}}
						>
							Hello world
						</div>
					}
				/>
			</Route>
		</Routes>
	);
};
