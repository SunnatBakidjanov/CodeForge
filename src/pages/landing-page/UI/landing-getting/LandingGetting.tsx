/* --- Imports --- */
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { LandingTexts } from './UI/landing-texts/LandingTexts';
import { CoubComp } from './UI/coub-comp/CoubComp';
import { LandingTitle } from '../landing-title/LandingTitle';

/* --- LandingGetting Component --- */
// This component represents the "Getting Started" section of the landing page.
export const LandingGetting = () => {
	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="flex flex-col items-center pb-6 border-b-1 border-white/20">
					<div className="flex flex-col items-center">
						<LandingTitle text="Welcome to the Forge" />

						<LandingTexts />
					</div>

					<CoubComp />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
