import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { MainTitle } from '../../main-title/MainTitle';
import { landingRoute } from '../../../utils/urls';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { LegalNav } from '../../navs/legal-nav/LegalNav';
import { BtnBurger } from '../../btns/btn-burger/BtnBurger';
import { cn } from '../../../utils/cn';
import { useHeaderLegal } from './hooks/useHeaderLegal';
import { motion } from 'framer-motion';

export const HeaderLegal = () => {
	const { isOpen, handleOpenMenu } = useHeaderLegal();

	return (
		<header className="relative w-full border-b-2 border-orange-500/30 min-w-[320px] md:overflow-hidden">
			<MaxWidthContainer>
				<div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
					<div className="flex items-center justify-center">
						<MainTitle
							href={landingRoute}
							textGradient={{ ComponentType: 'button' }}
							classNames={{
								textGradient: 'font-bold text-xl lg:text-2xl',
								imgContainer: 'w-8 h-8 lg:w-10 lg:h-10 ml-1.5 lg:ml-2',
								img: 'max-w-10 lg:max-w-12 h-auto object-cover',
							}}
						/>
					</div>

					<BtnBurger
						classNames={{ btn: 'md:hidden', container: 'gap-1.25 w-8 h-6', lines: 'w-full h-[3px]' }}
						btnProps={{ onClick: () => handleOpenMenu() }}
					/>

					<motion.div
						initial={{ opacity: 0, y: 10, pointerEvents: 'none' }}
						animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10, pointerEvents: isOpen ? 'auto' : 'none' }}
						transition={{ duration: 0.4, ease: 'easeOut' }}
						className={cn(
							'md:hidden absolute left-0 top-full w-full bg-black md:bg-transparent overflow-hidden z-10',
							'py-4 px-2',
							'mt-0.5'
						)}
					>
						<LegalNav isOpen={isOpen} />

						<BgBlur className="bg-[var(--react-blue)]/40" />
					</motion.div>

					<div className="hidden md:block">
						<LegalNav tabIndex={0} />
					</div>
				</div>

				<BgBlur blurColor={'reactBlue'} className="h-1/2 w-5/6 blur-[80px]" />
			</MaxWidthContainer>
		</header>
	);
};
