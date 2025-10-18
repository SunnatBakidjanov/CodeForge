/* --- Imports --- */
import { BgBlur } from '../../../../UI/backgrounds/bg-blur/BgBlur';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { TextGradient } from '../../../../UI/gradients/text-gradient/TextGradietn';
import { Title } from '../../../../UI/title/Title';

/* --- LandingProgress Component --- */
// This component represents the "Progress" section of the landing page.
export const LandingProgress = () => {
	return (
		<SectionContainer>
			<div>
				<TextGradient ComponentType={'div'}>
					<Title TitleType={'h2'} children={'The progress of my forge'} />
					<BgBlur />
				</TextGradient>
			</div>
		</SectionContainer>
	);
};
