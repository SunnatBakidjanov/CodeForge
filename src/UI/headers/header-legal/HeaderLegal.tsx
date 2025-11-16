import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../../main-title/MainTitle';
import { landingRoute } from '../../../utils/urls';

type Props = {
	textConfig?: { [key in 'title']?: string };
};

export const HeaderLegal = ({ textConfig }: Props) => {
	return (
		<header className="relative overflow-hidden w-full border-b-1 border-orange-500/30">
			<MaxWidthContainer>
				<div className="flex items-center justify-between h-18">
					<div className="flex items-center justify-center">
						<MainTitle
							href={landingRoute}
							textGradient={{ ComponentType: 'button' }}
							classNames={{
								textGradient: 'font-bold text-[26px]',
								imgContainer: 'w-8 h-8 ml-2',
								img: 'max-w-10 h-auto object-cover',
							}}
						/>
						<span className="block h-8 w-0.5 bg-white/40 mx-3" />
						<p className="text-white text-xl relative top-0.5">{textConfig?.title}</p>
					</div>
				</div>

				<BgBlur blurColor={'reactBlue'} className="h-1/2 w-5/6 blur-[80px]" />
			</MaxWidthContainer>
		</header>
	);
};
