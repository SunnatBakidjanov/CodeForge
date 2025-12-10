/* --- Imports --- */
import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from '../UI/layout/main-layout/MainLayout';
import { RegisterPage } from '../pages/register-page/RegisterPage';
import { LoginPage } from '../pages/login-page/LoginPage';
import { CheckGuest } from '../api/CheckGuest';
import { AppLayout } from '../UI/layout/app-layout/AppLayout';
import { PrivatePolityPage } from '../pages/private-policy-page/PrivatePolicyPage';
import { TermsServicePage } from '../pages/terms-service-page/TermsServicePage';
import { LandingPage } from '../pages/landing-page/LandingPage';
import { lazy, Suspense } from 'react';
import { GlobalLoader } from '../UI/loaders/global-loader/GlobalLoader';

/* --- Lazy Imports --- */
const LazyAuthLayout = lazy(() => import('@/UI/layout/auth-layout/AuthLayout').then(module => ({ default: module.AuthLayout })));
const LazyLegalLayout = lazy(() => import('@/UI/layout/legal-layout/LegalLayout').then(module => ({ default: module.LegalLayout })));
const LazyMainPageLayout = lazy(() => import('@/UI/layout/main-page-layout/MainPageLayout').then(module => ({ default: module.MainPageLayout })));
const LazyHomePage = lazy(() => import('@/pages/home-page/HomePage').then(module => ({ default: module.HomePage })));
const LazyNotFoundPage = lazy(() => import('@/pages/not-found-page/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

/* --- AppRoutes Component --- */
// This component manages the routing for the application.
export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Navigate to={'/landing'} replace />} />

					<Route element={<CheckGuest />}>
						<Route
							element={
								<Suspense fallback={<GlobalLoader />}>
									<LazyMainPageLayout />
								</Suspense>
							}
						>
							<Route path="/landing" element={<LandingPage />} />
						</Route>
					</Route>

					<Route
						path="/auth"
						element={
							<Suspense fallback={<GlobalLoader />}>
								<LazyAuthLayout />
							</Suspense>
						}
					>
						<Route path="register" element={<RegisterPage />} />
						<Route path="login" element={<LoginPage />} />
					</Route>

					<Route
						path="*"
						element={
							<Suspense fallback={<GlobalLoader />}>
								<LazyNotFoundPage />
							</Suspense>
						}
					/>
				</Route>

				<Route
					path="/home"
					element={
						<Suspense fallback={<GlobalLoader />}>
							<LazyHomePage />
						</Suspense>
					}
				/>

				<Route
					path="/legal"
					element={
						<Suspense fallback={<GlobalLoader />}>
							<LazyLegalLayout />
						</Suspense>
					}
				>
					<Route path="privacy-policy" element={<PrivatePolityPage />} />
					<Route path="terms-of-service" element={<TermsServicePage />} />
				</Route>
			</Route>
		</Routes>
	);
};
