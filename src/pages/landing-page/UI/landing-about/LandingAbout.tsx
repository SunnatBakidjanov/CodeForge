/* --- Imports --- */
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { ImageComp } from '../../../../UI/image-comp/ImageComp';
import crossedHammersImg from '/imgs/webp/сrossed-hammers.webp';
import { LandingTitle } from '../landing-title/LandingTitle';
import { AboutSectionConfig } from '../../page-config/landing.config';
import { LandingContainer } from '../landing-container/LandingContainer';
import { LandingParagraph } from '../landing-paragraph/LandingParagraph';

/* --- LandingAbout Component --- */
// This component represents the "About" section of the landing page.
export const LandingAbout = () => {
	const { description, title } = AboutSectionConfig;

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<LandingContainer>
					<LandingTitle text={title} classNames={{ blur: 'md:w-1/4 md:blur-[90px]' }}>
						<ImageComp
							className="w-fit h-22 md:h-24 lg:h-26 xl:h-30 mt-2 md:mt-4 lg:mt-5 xl:mt-6"
							imgAttr={{ src: crossedHammersImg, className: 'max-w-22 md:max-w-24 lg:max-w-28 xl:max-w-32  h-auto w-fit object-cover' }}
						/>
					</LandingTitle>

					<LandingParagraph paragraphs={[description.p1, description.p2]} />
				</LandingContainer>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
