/* --- Imports --- */
import { Navigate, Route, Routes } from 'react-router';
import { LandingRoute } from './landing-route/LandingRoute';
import { MainLayout } from '../UI/layout/main-layout/MainLayout';
import { MainPageLayout } from '../UI/layout/main-page-layout/MainPageLayout';
import { NotFoundPage } from '../pages/not-found-page/NotFoundPage';
import { RegisterPage } from '../pages/register-page/RegisterPage';
import { AuthLayout } from '../UI/layout/auth-layout/AuthLayout';
import { LoginPage } from '../pages/login-page/LoginPage';
import { CheckGuest } from '../api/CheckGuest';

/* --- AppRoutes Component --- */
// This component manages the routing for the application.
export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<Navigate to={'/landing'} replace />} />

				<Route element={<CheckGuest />}>
					<Route element={<MainPageLayout />}>
						<Route path="/landing/*" element={<LandingRoute />} />
					</Route>
				</Route>

				<Route element={<AuthLayout />}>
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};
