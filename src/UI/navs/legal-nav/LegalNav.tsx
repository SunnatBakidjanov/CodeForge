/* --- Imports --- */
import { Link } from 'react-router';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { useLegalNav } from './hooks/useLegalNav';
import { motion } from 'framer-motion';
import { ImageComp } from '../../image-comp/ImageComp';
import backIcon from '/imgs/webp/back-icon.webp';
import { cn } from '../../../utils/cn';

/* --- Types --- */
type Props = {
	isOpen?: boolean;
	tabIndex?: number;
};

/* --- LegalNav Component --- */
export const LegalNav = ({ isOpen, tabIndex }: Props) => {
	const { handleClick, prevRoute, links, offset, isReady, refs } = useLegalNav();

	return (
		<div className="flex relative text-white w-full">
			<nav className="w-full">
				<ul className={cn('flex flex-col md:flex-row items-center w-full', 'gap-x-2 gap-y-1')}>
					<motion.span
						className="absolute bg-black pointer-events-none rounded-3xl z-1"
						animate={{ left: offset.left, top: offset.top }}
						transition={isReady ? { duration: 0.3, ease: 'backOut' } : { duration: 0 }}
						style={{
							width: offset.width,
							height: offset.height,
						}}
					>
						<BgBlur blurColor={'reactBlue'} className="w-1/2 h-1/2" />
					</motion.span>

					{links.map(({ link, text, type }, i) => {
						return (
							<li
								key={i}
								ref={el => {
									refs.current[i] = el;
								}}
								className="relative z-2 group w-full"
							>
								{type === 'text' && (
									<Link
										to={link ?? '/'}
										onClick={() => handleClick(i)}
										className={cn(
											'relative group rounded-3xl font-bold block shadow-[0_0_2px_transparent] bg-black/60 focus-visible:shadow-[0_0_2px_white] hover:shadow-[0_0_2px_white] transition-shadow duration-300 ease-out text-center',
											'px-8 lg:px-10 py-2.5',
											'text-sm lg:text-base whitespace-nowrap'
										)}
										tabIndex={typeof tabIndex === 'number' ? 0 : isOpen ? 0 : -1}
									>
										{text}
										<BgBlur
											blurColor={'reactBlue'}
											className="h-1/3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-400 ease-out bg-[var(--react-blue)]/80
										"
										/>
									</Link>
								)}

								{type === 'img' && (
									<Link
										to={prevRoute ?? '/'}
										className={cn(
											'flex items-center justify-center group relative bg-black/60 rounded-3xl transition-shadow duration-400 ease-out shadow-[0_0_2px_transparent] hover:shadow-[0_0_2px_white] focus-visible:shadow-[0_0_2px_white]',
											'px-8 lg:px-10'
										)}
										tabIndex={typeof tabIndex === 'number' ? 0 : isOpen ? 0 : -1}
									>
										<ImageComp
											imgAttr={{
												src: backIcon,
												className: 'max-w-12 lg:max-w-14 h-auto object-cover',
											}}
											className="h-9 w-9 lg:h-10 lg:w-10"
										/>
										<BgBlur
											blurColor={'reactBlue'}
											className="h-1/2 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-400 ease-out bg-[var(--react-blue)]/80
										"
										/>
									</Link>
								)}

								<BgBlur
									blurColor={'reactBlue'}
									className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-400 ease-out"
								/>
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
};
