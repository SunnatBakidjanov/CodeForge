/* --- Imports --- */
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import { LandingRoute } from './landing-route/LandingRoute';
import { MainLayout } from '../UI/layout/main-layout/MainLayout';
import { MainPageLayout } from '../UI/layout/main-page-layout/MainPageLayout';
import { NotFoundPage } from '../pages/not-found-page/NotFoundPage';

/* --- AppRoutes Component --- */
// This component manages the routing for the application.
export const AppRoutes = () => {
	const navigate = useNavigate();

	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Navigate to={'/landing'} replace />} />
				<Route element={<MainPageLayout />}>
					<Route path="/landing/*" element={<LandingRoute />} />
				</Route>
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
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
