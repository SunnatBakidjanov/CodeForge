/* --- Imports --- */
import { BgBlur } from '../../../../UI/backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { TextGradient } from '../../../../UI/gradients/text-gradient/TextGradietn';
import { ImageComp } from '../../../../UI/image-comp/ImageComp';
import { Title } from '../../../../UI/title/Title';
import crossedHammersImg from '../../../../assets/imgs/webp/сrossed-hammers.webp';
import fairyTaleDividerImg from '../../../../assets/imgs/webp/fairy-tale-divider.webp';
import { cn } from '../../../../utils/cn';

/* --- LandingAbout Component --- */
// This component represents the "About" section of the landing page.
export const LandingAbout = () => {
	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="mt-6 pb-10 border-b-1 border-white/20">
					<TextGradient ComponentType={'div'} className="relative flex items-center justify-center">
						<Title TitleType={'h2'} defaultStyles={'h2'} className={cn('flex items-center justify-center w-fit', 'flex-col', 'gap-2')}>
							About my Forge{' '}
							<ImageComp
								className="w-fit h-22"
								loader={{ size: 60 }}
								imgAttr={{ src: crossedHammersImg, className: 'max-w-22 h-auto w-fit', loading: 'eager' }}
							/>
							<BgBlur className="w-1/4 h-1/4" />
						</Title>
					</TextGradient>

					<ImageComp className="h-16" imgAttr={{ src: fairyTaleDividerImg, className: 'max-w-80 h-auto', loading: 'lazy' }} />

					<div
						className={cn(
							'text-[var(--white)] italic text-center max-w-[1000px] mx-auto relative overflow-hidden rounded-2xl',
							'my-2',
							'text-lg',
							'space-y-4'
						)}
					>
						<p>
							"A personal development platform designed to store, organize, and showcase my reusable components, configurations, and
							development tools. It serves as a unified workspace where I maintain my custom UI components, code snippets, linters,
							ESLint and Prettier setups, and other utilities that I use across projects."
						</p>

						<p>
							"The goal of the platform is to create a consistent development ecosystem — a place where creativity meets clean code,
							helping me quickly prototype, test, and reuse elements in future applications."
						</p>
					</div>

					<ImageComp className="h-16" imgAttr={{ src: fairyTaleDividerImg, className: 'max-w-80 h-auto rotate-180', loading: 'lazy' }} />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
