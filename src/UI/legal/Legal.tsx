/* --- Imports --- */
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { cn } from '../../utils/cn';
import { ImageComp } from '../image-comp/ImageComp';
import { parseText } from './utils/parseText';
import { Fragment } from 'react/jsx-runtime';
import { Footer } from '../footer/Footer';

export type DataPoints = {
	title: string;
	text: string[];
};

export type PageConfigType = {
	hideTitle: string;
	title: string;
	lastUpdated: string;
	dataPoints: DataPoints[];
};

type Props = {
	pageConfig: PageConfigType;
	iconSrc: string;
};

export const Legal = ({ pageConfig, iconSrc }: Props) => {
	const { hideTitle, title, lastUpdated, dataPoints } = pageConfig;

	return (
		<div className="min-h-screen min-w-[320px]">
			<main>
				<h1 className="opacity-0 w-0 h-0 pointer-events-none">{hideTitle}</h1>

				<section>
					<MaxWidthContainer>
						<div
							className={cn(
								'flex flex-col items-center justify-center border-b-4 border-white/20 relative',
								'mt-8 lg:mt-10',
								'pb-6 lg:pb-10'
							)}
						>
							<h2
								className={cn(
									'text-white border-b-2 border-white/20 text-center',
									'pb-3 px-4 sm:px-6 lg:px-14',
									'text-2xl sm:text-3xl lg:text-4xl'
								)}
							>
								<span className="inline font-bold">{title}</span>
								<MainTitle
									textGradient={{ ComponentType: 'span' }}
									classNames={{ textGradient: 'inline font-bold cursor-text', textSpan: 'text-white' }}
									isHasImg={false}
								/>
							</h2>
							<ImageComp
								imgAttr={{ src: iconSrc, className: 'max-w-46 sm:max-w-54 lg:max-w-64 h-auto object-cover' }}
								className="w-44 h-44 sm:w-48 sm:h-48 lg:w-58 lg:h-58 my-6"
							/>
							<p
								className={cn(
									'text-[var(--react-blue)]/80 font-bold border-t-2 border-white/20 text-center',
									'text-lg lg:text-xl',
									'pt-4 sm:pt-3',
									'sm:px-6 lg:px-10'
								)}
							>
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

			<Footer classNames={{ bgBlur: 'bg-[var(--react-blue)] blur-[80px]', footer: 'bg-black/75' }} />
		</div>
	);
};
