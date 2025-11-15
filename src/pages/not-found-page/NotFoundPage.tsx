/* --- Imports --- */
import { useNavigate } from 'react-router';
import { TextGradient } from '../../UI/gradients/text-gradient/TextGradietn';
import { cn } from '../../utils/cn';
import { MaxWidthContainer } from '../../UI/containers/max-width-container/MaxWidthContainer';
import { BgGradient } from '../../UI/gradients/bg-gradient/BgGradient';
import { Button } from '../../UI/btns/button/Button';
import { notFoundPageConfig } from './page-config/notFound.config';
import { ImageComp } from '../../UI/image-comp/ImageComp';
import brokenAnvilIcon from '/imgs/webp/broken-anvil-icon.webp';

/* --- NotFoundPage component --- */
// Not found page component for the application.
export const NotFoundPage = () => {
	const { title, notFound, description, btnText } = notFoundPageConfig;
	const navigate = useNavigate();

	return (
		<MaxWidthContainer width={'fit-content'} className="min-h-screen text-center flex flex-col items-center justify-center py-10">
			<TextGradient
				ComponentType={'h1'}
				className={cn(
					'font-extrabold flex items-center justify-center',
					'text-8xl sm:text-9xl lg:text-[10rem] xl:text-[14rem]',
					'h-26 sm:h-36 lg:h-40 xl:h-50'
				)}
			>
				{title}
			</TextGradient>

			<ImageComp
				className={cn('w-26 h-26 sm:w-40 sm:h-40 lg:w-50 lg:h-50 xl:w-66 xl:h-66', 'mb-6 lg:mb-8')}
				imgAttr={{ src: brokenAnvilIcon, className: 'max-w-36 sm:max-w-50 lg:max-w-60 xl:max-w-80 h-auto object-cover' }}
			/>

			<p className={cn('font-bold text-[var(--white)]', 'text-2xl lg:text-3xl xl:text-4xl', 'mb-1 lg:mb-2 xl:mb-3')}>{notFound}</p>
			<p className={cn('text-[var(--white)] italic max-w-md xl:max-w-lg', 'lg:text-lg xl:text-xl', 'mb-8 lg:mb-10')}>{description}</p>

			<BgGradient
				ComponentType={'div'}
				className={cn(
					'overflow-hidden rounded-2xl shadow-sm shadow-white hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-all duration-300 ease-out',
					'w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px]'
				)}
			>
				<Button
					onClick={() => {
						navigate('/landing', { replace: true });
					}}
					classNames={{
						button: cn('w-full text-white font-bold', 'text-xl lg:text-2xl', 'py-1.5'),
						blik: cn('h-[400%] w-[25%] sm:w-[15%] lg:w-[12%] xl:w-[10%]', 'sm:duration-800 lg:duration-1100 xl:duration-1200'),
					}}
					isBlink={true}
				>
					{btnText}
				</Button>
			</BgGradient>
		</MaxWidthContainer>
	);
};
