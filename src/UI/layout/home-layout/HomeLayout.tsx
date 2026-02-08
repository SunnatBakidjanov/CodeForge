/* --- Imports --- */
import { Footer } from '@/UI/footer/Footer';
import { HeaderMain } from '@/UI/header-main/HeaderMain';
import { Outlet } from 'react-router';

/* --- HomeLayout Component --- */
export const HomeLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<HeaderMain />

			<div className="flex flex-1">
				<nav className="min-w-40 bg-white/5 h-screen">Тут будет Nav</nav>

				<main>
					<Outlet />
				</main>
			</div>

			<Footer />
		</div>
	);
};
