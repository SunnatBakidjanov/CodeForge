import { useNavigate } from 'react-router';
import { Button } from '../../../../UI/button/Button';
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { BgGradient } from '../../../../UI/gradients/bg-gradient/BgGradient';
import { TextGradient } from '../../../../UI/gradients/text-gradient/TextGradietn';
import { ImageComp } from '../../../../UI/image-comp/ImageComp';
import { cn } from '../../../../utils/cn';
import { JoinSectionConfig } from '../../page-config/landing.config';
import { LandingTitle } from '../landing-title/LandingTitle';
import hammerAndAnvil from '/imgs/webp/hammer-and-anvil-2.webp';
import { LandingContainer } from '../landing-container/LandingContainer';
import { LandingParagraph } from '../landing-paragraph/LandingParagraph';

export const LandingJoin = () => {
	const { title, description, joinDescription, btn } = JoinSectionConfig;
	const navigate = useNavigate();

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<LandingContainer>
					<LandingTitle text={title} descriptionText={description} classNames={{ textGradient: 'mb-4' }} isBorderBottom={true} />

					<div className="flex flex-col items-center">
						<ImageComp imgAttr={{ src: hammerAndAnvil, className: 'max-w-30 h-auto object-cover' }} className="h-36" />

						<TextGradient ComponentType={'p'} className="font-bold text-2xl mt-2">
							<span className="text-[var(--white)]">Code</span>Forge
						</TextGradient>
					</div>

					<div className={cn('flex flex-col items-center justify-center', 'mt-4')}>
						<LandingParagraph paragraphs={joinDescription} classNames={{ container: 'xl:max-w-full xl:mx-4 xl:text-xl' }} />

						<BgGradient
							ComponentType={'div'}
							className={cn(
								'w-full max-w-[300px] rounded-2xl overflow-hidden shadow-sm shadow-white hover:shadow-md transition-all duration-300 ease-out',
								'mt-6'
							)}
						>
							<Button
								onClick={() => navigate('/register')}
								isBlink={true}
								children={btn}
								classNames={{ button: cn('text-white font-medium w-full', 'text-xl', 'py-1.5') }}
							/>
						</BgGradient>
					</div>
				</LandingContainer>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
