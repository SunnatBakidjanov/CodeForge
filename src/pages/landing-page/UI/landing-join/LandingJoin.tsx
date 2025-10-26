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

export const LandingJoin = () => {
	const { title, description, joinDescription, btn } = JoinSectionConfig;
	const navigate = useNavigate();

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="flex flex-col items-center pb-6 border-b-1 border-white/20 mt-6">
					<LandingTitle text={title} descriptionText={description} classNames={{ textGradient: 'mb-4' }} isBorderBottom={true} />

					<div className="flex flex-col items-center">
						<ImageComp imgAttr={{ src: hammerAndAnvil, className: 'max-w-30 h-auto object-cover' }} className="h-36" />

						<TextGradient ComponentType={'p'} className="font-bold text-2xl mt-2">
							<span className="text-[var(--white)]">Code</span>Forge
						</TextGradient>
					</div>

					<div className={cn('flex flex-col items-center justify-center', 'mt-4')}>
						<p
							className={cn(
								'text-[var(--white)] italic text-center max-w-[600px] border-t-1 border-b-1 border-white/20 rounded-2xl font-medium',
								'pt-5',
								'pb-4'
							)}
						>
							{joinDescription}
						</p>

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
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
