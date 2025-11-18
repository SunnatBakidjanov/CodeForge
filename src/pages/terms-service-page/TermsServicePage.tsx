/** --- Imports --- */
import { MaxWidthContainer } from '../../UI/containers/max-width-container/MaxWidthContainer';
import { pageConfig } from './page-config/page-config';
import { MainTitle } from '../../UI/main-title/MainTitle';
import { landingRoute } from '../../utils/urls';
import { BgBlur } from '../../UI/backgrounds/bg-blur/BgBlur';
import termsOfServiceIcon from '/imgs/webp/terms-of-sevice-icon.webp';
import { ImageComp } from '../../UI/image-comp/ImageComp';
import { DataPoints } from './UI/data-points/DataPoints';

export const TermsServicePage = () => {
	const { title, hideTitle, subtitle, lastUpdated } = pageConfig;

	return (
		<div className="min-h-screen">
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
							<p className="text-white text-xl relative top-0.5">{title}</p>
						</div>
					</div>

					<BgBlur blurColor={'reactBlue'} className="h-1/2 w-5/6 blur-[80px]" />
				</MaxWidthContainer>
			</header>

			<main>
				<h1 className="opacity-0 w-0 h-0 pointer-events-none">{hideTitle}</h1>

				<section>
					<MaxWidthContainer>
						<div className="flex flex-col items-center justify-center mt-10 pb-6 border-b-4 border-white/20 relative">
							<h2 className="text-4xl text-white">
								<span className="inline">{subtitle}</span>
								<MainTitle
									textGradient={{ ComponentType: 'span' }}
									classNames={{ textGradient: 'inline font-bold cursor-text', textSpan: 'text-white' }}
									isHasImg={false}
								/>
							</h2>
							<ImageComp
								imgAttr={{ src: termsOfServiceIcon, className: 'max-w-64 h-auto object-cover' }}
								className="w-58 h-58 mt-6 mb-3"
							/>
							<p className="text-xl mt-1 text-[var(--react-blue)]/90 font-bold">{lastUpdated}</p>
							<BgBlur className="bg-[var(--react-blue)]/20 w-3/4 blur-[120px]" />
						</div>

						<DataPoints />
					</MaxWidthContainer>
				</section>
			</main>
		</div>
	);
};
