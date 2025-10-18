/* --- Imports --- */
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { LandingTitle } from '../landing-title/LandingTitle';
import { ProgressContainer } from './UI/progress-container/ProgressContainer';

/* --- LandingProgress Component --- */
// This component represents the "Progress" section of the landing page.
export const LandingProgress = () => {
	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="flex flex-col items-center mt-6">
					<LandingTitle text="The progress of my Forge" />

					<ProgressContainer />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
