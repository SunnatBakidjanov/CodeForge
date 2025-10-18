/* --- Imports --- */
import { BgBlur } from '../../../../UI/backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { TextGradient } from '../../../../UI/gradients/text-gradient/TextGradietn';
import { Title } from '../../../../UI/title/Title';
import { LandingTexts } from './UI/landing-texts/LandingTexts';
import { CoubComp } from './UI/coub-comp/CoubComp';

/* --- LandingGetting Component --- */
// This component represents the "Getting Started" section of the landing page.
export const LandingGetting = () => {
	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="flex flex-col items-center">
					<TextGradient ComponentType={'div'} className="relative">
						<Title TitleType="h2" defaultStyles={'h2'} className="text-center leading-[105%] pb-1" children="Welcome to the Forge" />
						<BgBlur className="w-1/3 h-1/3 blur-3xl" />
					</TextGradient>

					<LandingTexts />

					<CoubComp />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
