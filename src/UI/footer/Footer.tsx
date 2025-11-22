/* --- Imports --- */
import { cn } from '../../utils/cn';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';

/* --- Types --- */
type Props = { classNames?: { [key in 'bgBlur' | 'footer']?: string } };

/* --- Footer Component --- */
// This component represents the footer of the application.
export const Footer = ({ classNames }: Props) => {
	return (
		<footer className={cn('bg-black/30 relative', 'pb-6 sm:pb-7', 'pt-5 sm:pt-6', classNames?.footer)}>
			<MaxWidthContainer>
				<div>
					<MainTitle
						textGradient={{ ComponentType: 'h2', className: cn('flex items-center justify-center font-bold', 'text-xl sm:text-2xl') }}
						classNames={{ imgContainer: 'h-7 w-7 sm:h-8 sm:w-8 ml-2', img: 'max-w-8.5 sm:max-w-10 h-auto object-cover' }}
					/>

					<p
						className={cn(
							'text-[var(--white)] italic text-center border-t-1 border-white/20',
							'text-sm sm:text-base',
							'pt-2 sm:pt-3',
							'mt-2 sm:mt-3'
						)}
					>
						© {new Date().getFullYear()} Forge Systems — where craftsmanship meets code.
					</p>
				</div>
			</MaxWidthContainer>

			<BgBlur className={cn('h-1/4 blur-[120px]', classNames?.bgBlur)} />
		</footer>
	);
};
