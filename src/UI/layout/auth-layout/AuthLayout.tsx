import { Outlet } from 'react-router';
import { MainTitle } from '../../main-title/MainTitle';
import { cn } from '../../../utils/cn';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { TermsNotice } from '../../terms-notice/TermsNotice';
import { SectionContainer } from '../../containers/section-container/SectionContainer';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';

export const AuthLayout = () => {
	return (
		<div className="flex flex-col min-h-screen gap-16">
			<header className={cn('w-full flex items-center justify-center', 'pt-2 md:pt-4 lg:pt-6')}>
				<MainTitle
					href="/landing"
					textGradient={{
						ComponentType: 'button',
						className: cn('flex items-center font-bold cursor-pointer group relative', 'text-xl md:text-2xl lg:text-3xl'),
					}}
					imgComp={{
						loader: { classNames: { container: 'w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10' } },
						className: cn(
							'transition-all duration-300 ease-out drop-shadow-[0_0_0px_var(--hot-orange)] group-focus-visible:drop-shadow-[0_0_3px_var(--hot-orange)] group-hover:drop-shadow-[0_0_3px_var(--hot-orange)]',
							'relative top-[1px] lg:top-[0.5px]',
							'ml-1.5',
							'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12'
						),
					}}
					imgAttr={{
						className: cn('max-w-8 md:max-w-10 lg:max-w-12 h-auto object-cover'),
					}}
				>
					<BgBlur className="h-1/2" />
				</MainTitle>
			</header>

			<main className="flex-1 flex items-center justify-center">
				<SectionContainer>
					<MaxWidthContainer>
						<div className="flex items-center justify-center">
							<Outlet />
						</div>
					</MaxWidthContainer>
				</SectionContainer>
			</main>

			<footer className="w-full flex justify-center bg-black/30 relative pb-4 pt-5">
				<TermsNotice />

				<BgBlur className="h-1/3 blur-[120px]" />
			</footer>
		</div>
	);
};
