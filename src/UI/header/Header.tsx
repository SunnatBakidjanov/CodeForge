/* --- Imports --- */
import { cn } from '@/utils/cn';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';
import { useHeaderLanding } from './hooks/useHeaderLanding';
import { landingRoute } from '@/utils/urls';

/* --- Types --- */
export type NavProps = {
	height: number;
	isOpen: boolean;
	handleOpen: () => void;
};

type Props = {
	Nav?: React.ComponentType<NavProps>;
	navigateLink?: string;
};

/* --- HeaderLanding Component --- */
// This component represents the header of the landing page.
export const Header = ({ Nav, navigateLink }: Props) => {
	const { headerRef, height, scrolled, isOpen, handleOpen } = useHeaderLanding();

	return (
		<header ref={headerRef} className={cn('relative overflow-hidden w-full z-10', 'h-16 sm:h-18 lg:h-19')}>
			<div
				className={cn(
					'mx-auto w-full transition-all duration-400 ease-out fixed top-0 border-b-1 border-orange-500/30',
					scrolled ? 'bg-black' : 'bg-black/40'
				)}
			>
				<MaxWidthContainer>
					<div className={cn('w-full will-change-[height] flex items-center justify-between')} style={{ height: `${height}px` }}>
						<MainTitle
							href={navigateLink || landingRoute}
							textGradient={{ ComponentType: 'button' }}
							classNames={{
								textGradient: 'font-bold text-xl sm:text-2xl lg:text-[26px]',
								img: 'max-w-9 sm:max-w-10 lg:max-w-11',
								imgContainer: 'w-7 h-7 ml-1.5 sm:ml-2 lg:ml-2.5 sm:w-8 md:h-8',
							}}
						/>

						{Nav && <Nav height={height} isOpen={isOpen} handleOpen={handleOpen} />}

						<BgBlur className="w-5/6 h-1/2 blur-[120px]" />
					</div>
				</MaxWidthContainer>
			</div>
		</header>
	);
};
