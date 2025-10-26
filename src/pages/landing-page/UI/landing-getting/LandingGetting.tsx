/* --- Imports --- */
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { LandingTexts } from './UI/landing-texts/LandingTexts';
import { CoubComp } from './UI/coub-comp/CoubComp';
import { LandingTitle } from '../landing-title/LandingTitle';
import { GettingSectionConfig } from '../../page-config/landing.config';
import { cn } from '../../../../utils/cn';

/* --- LandingGetting Component --- */
// This component represents the "Getting Started" section of the landing page.
export const LandingGetting = () => {
	const { title, texts } = GettingSectionConfig;

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className={cn('flex items-center flex-col border-b-1 border-white/20', 'pb-6 md:pb-10')}>
					<div className="flex flex-col items-center">
						<LandingTitle text={title} />

						<LandingTexts texts={texts} />
					</div>

					<CoubComp />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
