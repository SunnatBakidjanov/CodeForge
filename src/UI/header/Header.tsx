/* --- Imports --- */
import { cn } from '@/utils/cn';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../main-title/MainTitle';
import { useHeaderLanding } from './hooks/useHeaderLanding';
import { landingRoute } from '@/utils/urls';
import { BtnBurger, type Props as BurgerProps } from '../btns/btn-burger/BtnBurger';

/* --- Types --- */
export type NavProps = {
	height: number;
	isOpen: boolean;
	handleOpen: () => void;
};

type Props = {
	Nav?: React.ComponentType<NavProps>;
	isHasBurger?: boolean;
	burgerClassNames?: BurgerProps['classNames'];
	navigateLink?: string;
};

/* --- HeaderLanding Component --- */
// This component represents the header of the landing page.
export const Header = ({ Nav, navigateLink, isHasBurger = true, burgerClassNames }: Props) => {
	const { headerRef, height, scrolled, isOpen, handleOpen } = useHeaderLanding();
	const { btn: burgerBtn, container: burgerContiner, lines: burgerLines } = burgerClassNames || {};

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
							classNames={{
								textGradient: 'font-bold text-xl lg:text-[26px]',
								img: 'max-w-9 sm:max-w-10 lg:max-w-11',
								imgContainer: 'w-7 h-7 ml-1.5 sm:ml-2 lg:ml-2.5 sm:w-8 md:h-8',
							}}
						/>

						{isHasBurger && (
							<BtnBurger
								classNames={{
									btn: burgerBtn,
									container: cn('gap-1.25 w-8 h-8', burgerContiner),
									lines: cn('w-full h-[3px]', burgerLines),
								}}
								btnProps={{ onClick: handleOpen }}
							/>
						)}

						{Nav && <Nav height={height} isOpen={isOpen} handleOpen={handleOpen} />}

						<BgBlur className="w-5/6 h-1/2 blur-[120px]" />
					</div>
				</MaxWidthContainer>
			</div>
		</header>
	);
};
