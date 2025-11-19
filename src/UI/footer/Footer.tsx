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
		<footer className={cn('bg-black/30 relative', 'pb-6', 'pt-5', classNames?.footer)}>
			<MaxWidthContainer>
				<div>
					<MainTitle
						textGradient={{ ComponentType: 'h2', className: cn('flex items-center justify-center font-bold', 'text-xl') }}
						classNames={{ imgContainer: 'h-7 w-7', img: cn('max-w-8.5 h-auto object-cover', 'ml-3') }}
					/>

					<p className={cn('text-[var(--white)] italic text-center border-t-1 border-white/20', 'text-sm', 'pt-2', 'mt-2')}>
						© {new Date().getFullYear()} Forge Systems — where craftsmanship meets code.
					</p>
				</div>
			</MaxWidthContainer>

			<BgBlur className={cn('h-1/4 blur-[120px]', classNames?.bgBlur)} />
		</footer>
	);
};
