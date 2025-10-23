import { useNavigate } from 'react-router';
import { Button } from '../../../../UI/button/Button';
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { BgGradient } from '../../../../UI/gradients/bg-gradient/BgGradient';
import { TextGradient } from '../../../../UI/gradients/text-gradient/TextGradietn';
import { ImageComp } from '../../../../UI/image-comp/ImageComp';
import { cn } from '../../../../utils/cn';
import { JoinSectionConfig } from '../../config/landing.config';
import { LandingTitle } from '../landing-title/LandingTitle';
import hammerAndAnvil from '/imgs/webp/hammer-and-anvil-2.webp';

export const LandingJoin = () => {
	const { title, description, btn } = JoinSectionConfig;
	const navigate = useNavigate();

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="flex flex-col items-center pb-6 border-b-1 border-white/20 mt-6">
					<LandingTitle text={title} descriptionText={description} classNames={{ textGradient: 'mb-4' }} isBorderBottom={true} />

					<div className="flex flex-col items-center">
						<ImageComp
							imgAttr={{ src: hammerAndAnvil, className: 'max-w-30 h-auto object-cover' }}
							loader={{ size: 80 }}
							className="h-36"
						/>

						<TextGradient ComponentType={'p'} className="font-bold text-2xl mt-2">
							<span className="text-[var(--white)]">Code</span>Forge
						</TextGradient>
					</div>

					<BgGradient
						ComponentType={'div'}
						className={cn(
							'w-full max-w-[300px] rounded-2xl overflow-hidden shadow-sm shadow-white hover:shadow-md transition-all duration-300 ease-out',
							'mt-4'
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
			</MaxWidthContainer>
		</SectionContainer>
	);
};
