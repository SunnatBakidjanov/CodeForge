/* --- Imports --- */
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { cn } from '../../utils/cn';
import { ImageComp } from '../image-comp/ImageComp';
import { parseText } from './utils/parseText';
import { Fragment } from 'react/jsx-runtime';
import { Footer } from '../footer/Footer';
import { landingRoute } from '../../utils/urls';

export type DataPoints = {
	title: string;
	text: string[];
	email?: string;
};

export type PageConfigType = {
	hideTitle: string;
	title: string;
	lastUpdated: string;
	subtitle: string;
	dataPoints: DataPoints[];
};

type Props = {
	pageConfig: PageConfigType;
	iconSrc: string;
};

export const Legal = ({ pageConfig, iconSrc }: Props) => {
	const { title, hideTitle, subtitle, lastUpdated, dataPoints } = pageConfig;

	return (
		<div className="min-h-screen min-w-[320px]">
			<header className="relative overflow-hidden w-full border-b-1 border-orange-500/30">
				<MaxWidthContainer>
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center justify-center">
							<MainTitle
								href={landingRoute}
								textGradient={{ ComponentType: 'button' }}
								classNames={{
									textGradient: 'font-bold text-lg',
									imgContainer: 'w-6 h-6 ml-1.5',
									img: 'max-w-8 h-auto object-cover',
								}}
							/>
							<span className="block h-8 w-0.5 bg-white/40 mx-2" />
							<p className="text-white text-lg relative top-[1px]">{title}</p>
						</div>
					</div>

					<BgBlur blurColor={'reactBlue'} className="h-1/2 w-5/6 blur-[80px]" />
				</MaxWidthContainer>
			</header>

			<main>
				<h1 className="opacity-0 w-0 h-0 pointer-events-none">{hideTitle}</h1>

				<section>
					<MaxWidthContainer>
						<div className={cn('flex flex-col items-center justify-center border-b-4 border-white/20 relative', 'mt-8', 'pb-6')}>
							<h2 className={cn('text-white border-b-2 border-white/20 text-center', 'pb-4 px-4', 'text-2xl')}>
								<span className="inline">{subtitle}</span>
								<MainTitle
									textGradient={{ ComponentType: 'span' }}
									classNames={{ textGradient: 'inline font-bold cursor-text', textSpan: 'text-white' }}
									isHasImg={false}
								/>
							</h2>
							<ImageComp imgAttr={{ src: iconSrc, className: 'max-w-46 h-auto object-cover' }} className="w-44 h-44 mt-6 mb-6" />
							<p className={cn('text-[var(--react-blue)]/80 font-bold border-t-2 border-white/20 text-center', 'text-lg', 'pt-4')}>
								{lastUpdated}
							</p>
							<BgBlur className="bg-[var(--react-blue)]/20 w-3/4 blur-[120px]" />
						</div>

						<div className="mt-8 mb-8">
							{dataPoints.map(({ title, text }, i) => (
								<Fragment key={i}>
									<div
										className={cn(
											'text-white mt-6 pb-4 border-b-1 border-white/20',
											i === 0 && 'mt-0',
											i === dataPoints.length - 1 && 'border-0'
										)}
									>
										<h3 className="text-lg font-bold cursor-text">
											<span className="inline-block mr-1">{i + 1}.</span>
											{title}
										</h3>
										<p className="mt-4">{parseText(text, i)}</p>
									</div>
								</Fragment>
							))}
						</div>
					</MaxWidthContainer>
				</section>
			</main>

			<Footer classNames={{ bgBlur: 'bg-[var(--react-blue)] blur-[80px]', footer: 'bg-black/30' }} />
		</div>
	);
};
