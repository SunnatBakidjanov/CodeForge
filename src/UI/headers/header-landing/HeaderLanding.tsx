/* --- Imports --- */
import { Button } from '../../btns/button/Button';
import { BgGradient } from '../../gradients/bg-gradient/BgGradient';
import { cn } from '../../../utils/cn';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { useNavigate } from 'react-router';
import { MainTitle } from '../../main-title/MainTitle';
import { useHeaderLanding } from './hooks/useHeaderLanding';
import { landingRoute } from '../../../utils/urls';
import { BtnBurger } from '../../btns/btn-burger/BtnBurger';
import { registerRoute, loginRoute } from '../../../utils/urls';
import { motion } from 'framer-motion';

/* --- HeaderLanding Component --- */
// This component represents the header of the landing page.
export const HeaderLanding = () => {
	const navigate = useNavigate();
	const { headerRef, height, scrolled, isOpen, handleOpen } = useHeaderLanding();

	return (
		<header ref={headerRef} className={cn('relative overflow-hidden w-full z-10', 'h-16 sm:h-18 lg:h-22')}>
			<div
				className={cn(
					'mx-auto w-full transition-all duration-400 ease-out fixed top-0 border-b-1 border-orange-500/30',
					scrolled ? 'bg-black' : 'bg-black/40'
				)}
			>
				<MaxWidthContainer>
					<div className={cn('w-full will-change-[height] flex items-center justify-between')} style={{ height: `${height}px` }}>
						<MainTitle
							href={landingRoute}
							textGradient={{ ComponentType: 'button' }}
							classNames={{
								textGradient: 'font-bold text-xl sm:text-2xl lg:text-3xl',
								img: 'max-w-9 sm:max-w-11 lg:max-w-14',
								imgContainer: 'w-7 h-7 ml-1.5 sm:ml-2 sm:w-9 md:h-9 lg:w-12 lg:h-12',
							}}
						/>

						<BtnBurger
							classNames={{ btn: 'sm:hidden', container: 'gap-1.25 w-8 h-6', lines: 'w-full h-[3px]' }}
							btnProps={{ onClick: handleOpen }}
						/>

						<div className="hidden sm:flex items-center justify-center gap-3">
							<BgGradient
								ComponentType={'div'}
								className={cn(
									'flex items-center justify-center',
									'rounded-3xl shadow-sm shadow-white overflow-hidden',
									'[&:has(:focus-visible)]:shadow-md',
									'hover:shadow-md',
									'transition-all duration-300 ease-out'
								)}
							>
								<Button
									children={'Register'}
									classNames={{
										button: cn(
											'text-white rounded-2xl transition-all duration-300 ease-out w-full h-full',
											'text-lg lg:text-xl',
											'py-0.5 lg:py-1.5',
											'px-10 md:px-12 lg:px-14'
										),
										blik: 'w-[20%] md:w-[25%]',
									}}
									onClick={() => navigate(registerRoute)}
									isBlink={true}
								/>
							</BgGradient>

							<Button
								children={'Login'}
								classNames={{
									button: cn(
										'text-white shadow-sm shadow-white rounded-3xl',
										'focus-visible:shadow-md',
										'hover:shadow-md',
										'transition-all duration-300 ease-out',
										'text-lg lg:text-xl',
										'px-10 md:px-12 lg:px-14',
										'py-0.5 lg:py-1.5'
									),
									blik: 'w-[20%] md:w-[25%]',
								}}
								onClick={() => navigate(loginRoute)}
								isBlink={true}
							/>
						</div>

						<motion.div
							className={cn(
								'fixed left-0 overflow-hidden sm:hidden',
								'flex flex-col sm:flex-row items-center sm:opacity-100',
								'w-full sm:w-fit',
								'gap-3',
								'mt-[1px] sm:mt-0',
								'py-6 px-4 sm:p-0',
								'bg-black/80 sm:bg-transparent'
							)}
							initial={{ y: '50%', opacity: 0, pointerEvents: 'none' }}
							animate={{ y: isOpen ? 0 : '50%', opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
							transition={{ duration: 0.4, ease: isOpen ? 'backOut' : 'backIn' }}
							style={{ top: `${height}px` }}
						>
							<BgGradient
								ComponentType={'div'}
								className={cn(
									'flex items-center justify-center',
									'rounded-3xl shadow-sm shadow-white overflow-hidden',
									'[&:has(:focus-visible)]:shadow-md',
									'hover:shadow-md',
									'transition-all duration-300 ease-out',
									'w-full max-w-[300px]'
								)}
							>
								<Button
									children={'Register'}
									classNames={{
										button: cn('text-white rounded-2xl transition-all duration-300 ease-out w-full h-full', 'text-xl', 'py-1'),
										blik: 'w-[20%] md:w-[25%]',
									}}
									tabIndex={isOpen ? 0 : -1}
									onClick={() => navigate(registerRoute)}
									isBlink={true}
								/>
							</BgGradient>

							<Button
								children={'Login'}
								classNames={{
									button: cn(
										'text-white shadow-sm shadow-white rounded-3xl',
										'focus-visible:shadow-md',
										'hover:shadow-md',
										'transition-all duration-300 ease-out',
										'text-xl',
										'w-full max-w-[300px]',
										'py-1'
									),
									blik: 'w-[20%] md:w-[25%]',
								}}
								tabIndex={isOpen ? 0 : -1}
								onClick={() => navigate(loginRoute)}
								isBlink={true}
							/>

							<BgBlur className="h-1/2 w-2/3 blur-[130px] sm:hidden" />
						</motion.div>

						<BgBlur className="w-full h-1/2 blur-[100px]" />
					</div>
				</MaxWidthContainer>
			</div>
		</header>
	);
};
