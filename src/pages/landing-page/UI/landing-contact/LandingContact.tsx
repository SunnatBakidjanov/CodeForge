/** --- Imports --- */
import { BgBlur } from '../../../../UI/backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { TextGradient } from '../../../../UI/gradients/text-gradient/TextGradietn';
import { Title } from '../../../../UI/title/Title';
import { LandingForm } from './UI/landing-form/LandingForm';

/** --- LandingContact Component --- */
// This component represents the contact section of the landing page.
export const LandingContact = () => {
	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="mt-6">
					<TextGradient ComponentType={'div'} className="relative">
						<Title TitleType={'h2'} defaultStyles={'h2'} children="Forge a Connection" className="text-center" />
						<BgBlur className="w-1/2 h-1/2" />
					</TextGradient>

					<LandingForm />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
