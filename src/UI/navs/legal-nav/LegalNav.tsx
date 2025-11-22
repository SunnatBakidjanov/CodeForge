/* --- Imports --- */
import { Link } from 'react-router';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { useLegalNav } from './hooks/useLegalNav';
import { motion } from 'framer-motion';
import { ImageComp } from '../../image-comp/ImageComp';
import backIcon from '/imgs/webp/back-icon.webp';
import { cn } from '../../../utils/cn';
import { BtnBurger } from '../../btns/btn-burger/BtnBurger';

/* --- LegalNav Component --- */
export const LegalNav = () => {
	const { handleClick, prevRoute, links, offset, isReady, refs, handleOpenMenu, isOpen, isMobile } = useLegalNav();

	return (
		<div className="flex relative text-white bg-black/30 w-full py-1 sm:py-1.5 z-10 min-w-[320px] overflow-hidden">
			<MaxWidthContainer className="w-full sm:px-4 px-2">
				<div className="sm:hidden flex justify-center">
					<BtnBurger
						classNames={{ btn: 'sm:hidden', container: 'gap-1.25 w-8 h-6', lines: 'w-full h-[3px]' }}
						btnProps={{ onClick: () => handleOpenMenu() }}
					/>
				</div>

				<nav className={cn('w-full overflow-hidden sm:overflow-visible', isOpen ? 'h-fit' : 'h-0 sm:h-fit')}>
					<ul
						className={cn(
							'flex flex-col sm:flex-row items-center justify-between gap-y-1 my-2 bg-black/20 rounded-2xl',
							'py-4 px-1 sm:p-0',
							'bg-black/20 sm:bg-transparent'
						)}
					>
						<li className="flex flex-col sm:flex-row w-full gap-x-2 gap-y-1 relative">
							<motion.span
								className="absolute bg-black/90 pointer-events-none rounded-3xl z-1"
								animate={{ left: offset.left, top: offset.top }}
								transition={isReady ? { duration: 0.3, ease: 'backOut' } : { duration: 0 }}
								style={{
									width: offset.width,
									height: offset.height,
								}}
							>
								<BgBlur blurColor={'reactBlue'} className="w-full h-1/8 sm:h-1/2 blur-lg sm:blur-3xl" />
							</motion.span>

							{links.map(({ link, text }, i) => {
								return (
									<div
										key={i}
										ref={el => {
											refs.current[i] = el;
										}}
										className="relative z-2"
									>
										<Link
											to={link}
											children={text}
											onClick={() => handleClick(i)}
											className={cn(
												'rounded-3xl block font-bold shadow-[0_0_2px_transparent] bg-black/40 focus-visible:shadow-[0_0_2px_white] hover:shadow-[0_0_2px_white] transition-shadow duration-300 ease-out',
												'px-8 lg:px-10 py-2',
												'text-base'
											)}
											tabIndex={isOpen || !isMobile ? 0 : -1}
										/>
									</div>
								);
							})}
						</li>

						<li className="w-full sm:w-fit">
							<Link
								to={prevRoute ?? '/'}
								className={cn(
									'flex items-center justify-center group relative bg-black/40 rounded-3xl transition-shadow duration-400 ease-out shadow-[0_0_2px_transparent] hover:shadow-[0_0_2px_white] focus-visible:shadow-[0_0_2px_white]',
									'px-8 lg:px-10'
								)}
								tabIndex={isOpen || !isMobile ? 0 : -1}
							>
								<ImageComp
									imgAttr={{
										src: backIcon,
										className: 'max-w-12 lg:max-w-14 h-auto object-cover',
									}}
									className="h-10 w-10"
								/>

								<BgBlur
									blurColor={'reactBlue'}
									className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-400 ease-out"
								/>
							</Link>
						</li>
					</ul>
				</nav>
			</MaxWidthContainer>

			<BgBlur className="w-5/6 xl:w-3/4 h-3/4 bg-[var(--react-blue)]/40" />
		</div>
	);
};
