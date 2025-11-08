/* --- Imports --- */
import { cn } from '../../utils/cn';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';

/* --- Footer Component --- */
// This component represents the footer of the application.
export const Footer = () => {
	return (
		<footer className={cn('bg-black/30 relative', 'pb-8', 'pt-4')}>
			<MaxWidthContainer>
				<div>
					<MainTitle
						textGradient={{ ComponentType: 'h2', className: cn('flex items-center justify-center font-bold', 'text-xl') }}
						imgComp={{
							loader: { classNames: { container: 'h-6 w-6' } },
							className: cn('max-w-8 h-auto object-cover relative top-[1px]', 'ml-1.5'),
						}}
					/>

					<p className={cn('text-[var(--white)] italic text-center border-t-1 border-white/20', 'text-sm', 'pt-2')}>
						© {new Date().getFullYear()} Forge Systems — where craftsmanship meets code.
					</p>
				</div>
			</MaxWidthContainer>

			<BgBlur className="h-1/4 blur-[120px]" />
		</footer>
	);
};
