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
					<div className="w-fit mx-auto">
						<LandingTitle text={title} descriptionText={description} classNames={{ textGradient: 'mb-4' }} isBorderBottom={true} />
					</div>

					<div className="flex flex-col items-center">
						<ImageComp
							imgAttr={{ src: hammerAndAnvil, className: 'max-w-30 md:max-w-36 lg:max-w-46 xl:max-w-50 h-auto object-cover' }}
							className={cn('h-36 md:h-40 lg:h-50 xl:h-60', 'w-36 md:w-40 lg:w-50 xl:w-60')}
						/>

						<TextGradient
							ComponentType={'p'}
							className="font-bold text-2xl md:text-3xl lg:text-[40px] xl:text-5xl xl:pb-1 mt-2 md:mt-6 lg:mt-8 xl:mt-6"
						>
							<span className="text-[var(--white)]">Code</span>Forge
						</TextGradient>
					</div>

					<div className={cn('flex flex-col items-center justify-center', 'mt-4')}>
						<LandingParagraph paragraphs={joinDescription} classNames={{ container: 'xl:max-w-full xl:mx-4 xl:text-xl' }} />

						<BgGradient
							ComponentType={'div'}
							className={cn(
								'w-full rounded-2xl overflow-hidden shadow-sm shadow-white hover:shadow-md',
								'max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[420px]',
								'transition-shadow duration-300 ease-out',
								'mt-6 lg:mt-8'
							)}
						>
							<Button
								onClick={() => navigate('/register')}
								isBlink={true}
								children={btn}
								classNames={{
									button: cn('text-white font-medium w-full', 'text-xl lg:text-2xl', 'py-1.5 lg:py-1'),
									blik: 'h-[350%] w-[12%] xl:w-[10%] duration-800 md:duration-900 lg:duration-1000 xl:duration-1100',
								}}
							/>
						</BgGradient>
					</div>
				</LandingContainer>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
