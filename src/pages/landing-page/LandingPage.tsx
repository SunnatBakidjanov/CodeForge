/* --- Imports --- */
import { LandingAbout } from './UI/landing-about/LandingAbout';
import { LandingContact } from './UI/landing-contact/LandingContact';
import { LandingGetting } from './UI/landing-getting/LandingGetting';
import { LandingProgress } from './UI/landing-progress/LandingProgress';

/* --- LandingPage Component --- */
// This component serves as the landing page for the application.
export const LandingPage = () => {
	return (
		<main className="mt-8 mb-6">
			<LandingGetting />
			<LandingAbout />
			<LandingProgress />
			<LandingContact />
		</main>
	);
};
