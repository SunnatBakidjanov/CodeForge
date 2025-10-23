/* --- Imports --- */
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { ImageComp } from '../../../../UI/image-comp/ImageComp';
import crossedHammersImg from '../../../../assets/imgs/webp/сrossed-hammers.webp';
import fairyTaleDividerImg from '../../../../assets/imgs/webp/fairy-tale-divider.webp';
import { cn } from '../../../../utils/cn';
import { LandingTitle } from '../landing-title/LandingTitle';
import { AboutSectionConfig } from '../../config/landing.config';

/* --- LandingAbout Component --- */
// This component represents the "About" section of the landing page.
export const LandingAbout = () => {
	const { description, title } = AboutSectionConfig;

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="mt-6 pb-10 border-b-1 border-white/20">
					<LandingTitle text={title}>
						<ImageComp
							className="w-fit h-22"
							loader={{ size: 60 }}
							imgAttr={{ src: crossedHammersImg, className: 'max-w-22 h-auto w-fit object-cover' }}
						/>
					</LandingTitle>

					<ImageComp
						className="h-16"
						imgAttr={{ src: fairyTaleDividerImg, className: 'max-w-80 h-auto object-cover pointer-events-none' }}
					/>

					<div
						className={cn(
							'text-[var(--white)] italic text-center max-w-[1000px] mx-auto relative overflow-hidden rounded-2xl',
							'my-2',
							'text-lg',
							'space-y-4'
						)}
					>
						<p>{description.p1}</p>

						<p>{description.p2}</p>
					</div>

					<ImageComp className="h-16" imgAttr={{ src: fairyTaleDividerImg, className: 'max-w-80 h-auto object-cover rotate-180' }} />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
