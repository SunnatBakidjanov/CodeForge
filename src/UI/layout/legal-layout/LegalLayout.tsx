/* --- Imports --- */
import { Outlet } from 'react-router';
import { Header } from '@/UI/header/Header';
import { LegalNav } from '@/UI/header/UI/leagal-nav/LegalNav';
import { Footer } from '@/UI/footer/Footer';
import { Embers } from '@/UI/effects/ember/Ember';

/* --- LegalLayout Component --- */
export const LegalLayout = () => {
	return (
		<div className="min-h-screen relative">
			<Header Nav={LegalNav} burgerClassNames={{ btn: 'md:hidden' }} />
			<Outlet />
			<Footer classNames={{ bgBlur: 'blur-[60px]', footer: 'bg-black/75' }} />
			<Embers classNames={{ container: 'absolute' }} />
		</div>
	);
};
