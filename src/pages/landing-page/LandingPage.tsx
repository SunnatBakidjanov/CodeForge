/* --- Imports --- */
import { LandingAbout } from './UI/landing-about/LandingAbout';
import { LandingContact } from './UI/landing-contact/LandingContact';
import { LandingGetting } from './UI/landing-getting/LandingGetting';
import { LandingJoin } from './UI/landing-join/LandingJoin';

/* --- LandingPage Component --- */
// This component serves as the landing page for the application.
export const LandingPage = () => {
	return (
		<main className="mt-8 mb-6 md:mt-12 xl:mt-14">
			<LandingGetting />
			<LandingAbout />
			<LandingJoin />
			<LandingContact />
		</main>
	);
};
