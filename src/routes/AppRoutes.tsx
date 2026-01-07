/* --- Imports --- */
import { Navigate, Route, Routes } from 'react-router';
import { MainLayout } from '../UI/layout/main-layout/MainLayout';
import { RegisterPage } from '../pages/register-page/RegisterPage';
import { LoginPage } from '../pages/login-page/LoginPage';
import { AppLayout } from '../UI/layout/app-layout/AppLayout';
import { PrivatePolityPage } from '../pages/private-policy-page/PrivatePolicyPage';
import { TermsServicePage } from '../pages/terms-service-page/TermsServicePage';
import { lazy, Suspense } from 'react';
import { GlobalLoader } from '../UI/loaders/global-loader/GlobalLoader';
import { ForgotPasswordPage } from '@/pages/forgot-password/ForgotPasswordPage';
import { ChangePasswordPage } from '@/pages/change-password/ChangePasswordPage';
import { CheckChangePassToken } from '@/pages/change-password/UI/check-change-pass-token/checkChangePassToken';
import { CheckMe } from '@/UI/protection/check-me/CheckMe';
import { HomeLayout } from '@/UI/layout/home-layout/HomeLayout';

/* --- Lazy Imports --- */
const LazyAuthLayout = lazy(() => import('@/UI/layout/auth-layout/AuthLayout').then(module => ({ default: module.AuthLayout })));
const LazyLegalLayout = lazy(() => import('@/UI/layout/legal-layout/LegalLayout').then(module => ({ default: module.LegalLayout })));
const LazyMainPageLayout = lazy(() => import('@/UI/layout/main-page-layout/MainPageLayout').then(module => ({ default: module.MainPageLayout })));
const LazyHomePage = lazy(() => import('@/pages/home-page/HomePage').then(module => ({ default: module.HomePage })));
const LazyErrorPage = lazy(() => import('@/pages/error-page/ErrorPage').then(module => ({ default: module.ErrorPage })));
const LazyLandingPage = lazy(() => import('@/pages/landing-page/LandingPage').then(module => ({ default: module.LandingPage })));

/* --- AppRoutes Component --- */
// This component manages the routing for the application.
export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<AppLayout />}>
				<Route element={<MainLayout />}>
					<Route path="/" element={<Navigate to={'/landing'} replace />} />

					<Route element={<CheckMe usePlace="landing" />}>
						<Route
							element={
								<Suspense fallback={<GlobalLoader />}>
									<LazyMainPageLayout />
								</Suspense>
							}
						>
							<Route path="/landing" element={<LazyLandingPage />} />
						</Route>
					</Route>

					<Route element={<CheckMe usePlace="auth" />}>
						<Route>
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
								<Route path="recover-password" element={<ForgotPasswordPage />} />
							</Route>
						</Route>
					</Route>

					<Route element={<CheckChangePassToken />}>
						<Route
							path="/auth"
							element={
								<Suspense fallback={<GlobalLoader />}>
									<LazyAuthLayout />
								</Suspense>
							}
						>
							<Route path="change-password" element={<ChangePasswordPage />} />
						</Route>
					</Route>
				</Route>

				<Route element={<HomeLayout />}>
					<Route
						path="/home"
						element={
							<Suspense fallback={<GlobalLoader />}>
								<LazyHomePage />
							</Suspense>
						}
					/>
				</Route>

				<Route
					path="error"
					element={
						<Suspense fallback={<GlobalLoader />}>
							<LazyErrorPage />
						</Suspense>
					}
				/>

				<Route
					path="*"
					element={
						<Suspense fallback={<GlobalLoader />}>
							<LazyErrorPage />
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
