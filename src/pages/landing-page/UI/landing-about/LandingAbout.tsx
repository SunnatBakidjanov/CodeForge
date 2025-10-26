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
				<div className="mt-6 md:mt-8 lg:mt-10 pb-10 md:pb-12 lg:pb-14 border-b-1 border-white/20">
					<LandingTitle text={title} classNames={{ blur: 'md:w-1/4 md:blur-[90px]' }}>
						<ImageComp
							className="w-fit h-22 md:h-24 lg:h-26 xl:h-30 mt-2 md:mt-4 lg:mt-5 xl:mt-6"
							imgAttr={{ src: crossedHammersImg, className: 'max-w-22 md:max-w-24 lg:max-w-28 xl:max-w-32  h-auto w-fit object-cover' }}
						/>
					</LandingTitle>

					<div
						className={cn(
							'text-[var(--white)] italic text-center mx-auto relative overflow-hidden rounded-2xl border-t-1 border-b-1 border-white/20',
							'mt-2 lg:mt-4 xl:mt-6',
							'px-2 sm:px-4',
							'pt-5',
							'pb-4 lg:pb-5',
							'space-y-4 lg:space-y-5',
							'lg:text-lg',
							'max-w-[800px] lg:max-w-[900px] xl:max-w-[1100px]'
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
