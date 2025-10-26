/* --- Imports --- */
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { ImageComp } from '../../../../UI/image-comp/ImageComp';
import crossedHammersImg from '/imgs/webp/сrossed-hammers.webp';
import { cn } from '../../../../utils/cn';
import { LandingTitle } from '../landing-title/LandingTitle';
import { AboutSectionConfig } from '../../page-config/landing.config';

/* --- LandingAbout Component --- */
// This component represents the "About" section of the landing page.
export const LandingAbout = () => {
	const { description, title } = AboutSectionConfig;

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="mt-6 pb-10 border-b-1 border-white/20">
					<LandingTitle text={title}>
						<ImageComp className="w-fit h-22" imgAttr={{ src: crossedHammersImg, className: 'max-w-22 h-auto w-fit object-cover' }} />
					</LandingTitle>

					<div
						className={cn(
							'text-[var(--white)] italic text-center max-w-[1000px] mx-auto relative overflow-hidden rounded-2xl border-t-1 border-b-1 border-white/20',
							'my-2',
							'pt-5',
							'pb-4',
							'space-y-4'
						)}
					>
						<p>{description.p1}</p>

						<p>{description.p2}</p>
					</div>
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
