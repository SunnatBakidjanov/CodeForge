/* --- Imports --- */
import { LandingGetting } from './UI/landing-getting/LandingGetting';
import { LandingProgress } from './UI/landing-progress/LandingProgress';

/* --- LandingPage Component --- */
// This component serves as the landing page for the application.
export const LandingPage = () => {
	return (
		<main>
			<LandingGetting />
			<LandingProgress />
		</main>
	);
};
