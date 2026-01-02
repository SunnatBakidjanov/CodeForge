/* --- Imports --- */
import { useLocation, useNavigate } from 'react-router';
import { TextGradient } from '@/UI/gradients/text-gradient/TextGradietn';
import { cn } from '@/utils/cn';
import { MaxWidthContainer } from '@/UI/containers/max-width-container/MaxWidthContainer';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { Button } from '@/UI/btns/button/Button';
import { notFoundPageConfig } from './page-config/errorPage.config';
import { ImageComp } from '@/UI/image-comp/ImageComp';
import brokenAnvilIcon from '/imgs/webp/broken-anvil-icon.webp';
import { useEffect } from 'react';
import { GUEST_COOKIE_NAME } from '@/api/useCheckGuest';

export type LocationState = {
	locationTitle?: string;
	locationSubtitle?: string;
	locationDescription?: string;
	locationBtnText?: string;
	locationPath?: string;
	checkGuest?: boolean;
};

/* --- NotFoundPage component --- */
// Not found page component for the application.
export const ErrorPage = () => {
	const locationState = useLocation().state as LocationState | null;
	const { locationTitle, locationBtnText, locationDescription, locationPath, locationSubtitle, checkGuest = false } = locationState || {};
	const { title, subtitle, description, btnText } = notFoundPageConfig;
	const navigate = useNavigate();
	const hasGuestCookie = document.cookie.split('; ').some(c => c.startsWith(GUEST_COOKIE_NAME));

	useEffect(() => {
		if (!checkGuest) return;

		if (hasGuestCookie) {
			navigate(locationPath || '/', { replace: true });
		}
	}, [checkGuest, hasGuestCookie, locationPath, navigate]);

	return (
		<MaxWidthContainer width={'fit-content'} className="min-h-screen text-center flex flex-col items-center justify-center py-10">
			<TextGradient
				ComponentType={'h1'}
				className={cn('font-extrabold flex items-center justify-center', 'text-6xl sm:text-7xl lg:text-8xl 2xl:text-9xl')}
			>
				{locationTitle ?? title}
			</TextGradient>

			<ImageComp
				className={cn('overflow-hidden', 'w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 2xl:w-52 2xl:h-52')}
				imgAttr={{ src: brokenAnvilIcon, className: 'max-w-46 sm:max-w-50 lg:max-w-54 2xl:max-w-60 h-auto object-contain' }}
			/>

			<p className={cn('font-bold text-(--white)', 'text-2xl lg:text-3xl xl:text-4xl', 'mb-2 sm:mb-4')}>{locationSubtitle ?? subtitle}</p>
			<p className={cn('text-(--white) italic max-w-md sm:max-w-lg lg:max-w-3xl', 'lg:text-lg xl:text-xl', 'mb-8 lg:mb-12')}>
				{locationDescription ?? description}
			</p>

			<BgGradient
				ComponentType={'div'}
				className={cn(
					'overflow-hidden rounded-2xl shadow-sm shadow-white hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-all duration-300 ease-out',
					'w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]'
				)}
			>
				<Button
					onClick={() => {
						navigate(locationPath ?? '/', { replace: true });
					}}
					classNames={{
						button: cn('w-full text-white font-bold', 'text-lg lg:text-xl', 'py-1.25'),
						blik: cn('h-[400%] w-[15%] sm:w-[14%] lg:w-[11%] xl:w-[10%]', 'duration-800 sm:duration-1000 lg:duration-1100'),
					}}
					isBlink={true}
				>
					{locationBtnText ?? btnText}
				</Button>
			</BgGradient>
		</MaxWidthContainer>
	);
};
