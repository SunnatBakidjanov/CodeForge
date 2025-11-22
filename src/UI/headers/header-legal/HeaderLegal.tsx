import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../../main-title/MainTitle';
import { landingRoute, termsRoute } from '../../../utils/urls';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { useLocation } from 'react-router';

export const HeaderLegal = () => {
	const pathname = useLocation().pathname;
	const title = pathname === termsRoute ? 'Terms of Service' : 'Privacy Policy';

	return (
		<header className="relative overflow-hidden w-full border-b-2 border-orange-500/30 min-w-[320px]">
			<MaxWidthContainer>
				<div className="flex items-center justify-center sm:justify-start h-16 lg:h-18">
					<div className="flex items-center justify-center">
						<MainTitle
							href={landingRoute}
							textGradient={{ ComponentType: 'button' }}
							classNames={{
								textGradient: 'font-bold text-lg sm:text-xl lg:text-2xl',
								imgContainer: 'w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 ml-1.5 lg:ml-2',
								img: 'max-w-8 sm:max-w-10 lg:max-w-12 h-auto object-cover',
							}}
						/>
						<span className="block h-8 w-0.5 bg-white/40 mx-2 sm:mx-3" />
						<p className="text-white font-bold text-lg sm:text-xl lg:text-2xl relative top-[1px]">{title}</p>
					</div>
				</div>

				<BgBlur blurColor={'reactBlue'} className="h-1/2 w-5/6 blur-[80px]" />
			</MaxWidthContainer>
		</header>
	);
};
