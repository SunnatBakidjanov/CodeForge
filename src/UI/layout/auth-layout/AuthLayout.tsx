/* --- Imports --- */
import { Outlet } from 'react-router';
import { MainTitle } from '../../main-title/MainTitle';
import { cn } from '../../../utils/cn';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { TermsNotice } from '../../terms-notice/TermsNotice';
import { SectionContainer } from '../../containers/section-container/SectionContainer';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { landingRoute } from '../../../utils/urls';

/* --- AuthLayout Component --- */
// This component represents the authentication layout of the application.
export const AuthLayout = () => {
	return (
		<div className="flex flex-col min-h-screen min-w-[320px] gap-16 sm:gap-20">
			<header className={cn('w-full flex items-center justify-center', 'pt-6 sm:pt-8')}>
				<h1 className="h-0 w-0 invisible">CodeForge Registration</h1>

				<MainTitle
					href={landingRoute}
					textGradient={{
						ComponentType: 'button',
					}}
					classNames={{
						textGradient: 'font-bold text-2xl sm:text-3xl',
						imgContainer: 'w-8 sm:w-10 h-8 sm:h-10 ml-2',
						img: 'max-w-10 sm:max-w-12 h-auto object-cover',
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

			<footer className="w-full flex justify-center bg-black/30 relative pb-4 sm:pb-6 sm:pt-8 pt-5">
				<TermsNotice />

				<BgBlur className="h-1/3 blur-[120px]" />
			</footer>
		</div>
	);
};
