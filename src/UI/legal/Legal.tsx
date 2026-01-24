/* --- Imports --- */
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { cn } from '../../utils/cn';
import { ImageComp } from '../image-comp/ImageComp';
import { parseText } from './utils/parseText';
import { Fragment } from 'react/jsx-runtime';
import { Title } from '../title/Title';

export type DataPoints = {
	title: string;
	text: string[];
};

export type PageConfigType = {
	hideTitle: string;
	title: string;
	discription: string;
	lastUpdated: string;
	dataPoints: DataPoints[];
};

type Props = {
	pageConfig: PageConfigType;
	iconSrc: string;
};

export const Legal = ({ pageConfig, iconSrc }: Props) => {
	const { hideTitle, title, lastUpdated, dataPoints, discription } = pageConfig;

	return (
		<div className="min-h-screen min-w-[320px]">
			<main>
				<h1 className="opacity-0 w-0 h-0 pointer-events-none">{hideTitle}</h1>

				<section>
					<MaxWidthContainer>
						<div
							className={cn(
								'flex flex-col items-center justify-center border-b-2 border-white/20 relative',
								'mt-8 lg:mt-10',
								'pb-6 lg:pb-10'
							)}
						>
							<Title
								TitleType="h2"
								className={cn(
									'text-white border-b-1 border-white/20 text-center',
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
							</Title>

							<ImageComp
								imgAttr={{
									src: iconSrc,
									className: 'max-w-46 sm:max-w-54 lg:max-w-64 h-auto object-cover drop-shadow-[0_0_3px_var(--hot-orange)]',
								}}
								className="w-44 h-44 sm:w-48 sm:h-48 lg:w-58 lg:h-58 my-6"
							/>

							<p
								className={cn(
									'text-sm md:text-base text-center text-white italic font-bold tracking-[0.5px]',
									'mb-6 md:mb-8 lg:mb-10'
								)}
							>
								{discription.split('/n').map((line, i) => (
									<Fragment key={i}>
										{line}
										<br />
									</Fragment>
								))}
							</p>

							<p
								className={cn(
									'text-white italic font-bold border-t-1 border-white/20 text-center tracking-[0.5px]',
									'md:text-lg',
									'pt-3',
									'sm:px-6 lg:px-10'
								)}
							>
								{lastUpdated}
							</p>

							<BgBlur className="w-1/2 h-1/4 blur-[120px] md:blur-[140px] lg:blur-[160px] xl:blur-[180px]" />
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
										<h3 className="sm:text-lg font-bold cursor-text tracking-[0.2px]">
											<span className="inline-block mr-1">{i + 1}.</span>
											{title}
										</h3>
										<p className="text-sm sm:text-base mt-4 tracking-[0.2px]">{parseText(text, i)}</p>
									</div>
								</Fragment>
							))}
						</div>
					</MaxWidthContainer>
				</section>
			</main>
		</div>
	);
};
