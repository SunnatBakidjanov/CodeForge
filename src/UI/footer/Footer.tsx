/* --- Imports --- */
import { cn } from '../../utils/cn';
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';

/* --- Footer Component --- */
// This component represents the footer of the application.
export const Footer = () => {
	return (
		<footer className={cn('bg-black/30', 'pb-8', 'pt-4')}>
			<MaxWidthContainer>
				<div>
					<MainTitle
						textGradient={{ ComponentType: 'h2', className: cn('flex items-center justify-center font-bold', 'text-xl', 'gap-1.5') }}
						imgComp={{ loader: { size: 20 }, className: cn('max-w-8 h-auto object-cover relative top-[1px]') }}
					/>

					<p className={cn('text-[var(--white)] italic text-center', 'text-sm', 'mt-2')}>
						© {new Date().getFullYear()} Forge Systems — where craftsmanship meets code.
					</p>
				</div>
			</MaxWidthContainer>
		</footer>
	);
};
