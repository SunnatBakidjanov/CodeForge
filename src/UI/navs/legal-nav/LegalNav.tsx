/* --- Imports --- */
import { Link } from 'react-router';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { BgBlur } from '../../backgrounds/bg-blur/BgBlur';
import { useLegalNav } from './hooks/useLegalNav';
import { motion } from 'framer-motion';
import { ImageComp } from '../../image-comp/ImageComp';
import backIcon from '/imgs/webp/back-icon.webp';

/* --- LegalNav Component --- */
export const LegalNav = () => {
	const { handleClick, prevRoute, links, offset, isReady, refs } = useLegalNav();

	return (
		<div className="flex relative text-white bg-black/30 w-full overflow-hidden py-3">
			<MaxWidthContainer className="w-full sm:px-4">
				<nav className="w-full">
					<ul className="flex items-center justify-between">
						<li className="flex relative gap-2">
							<motion.span
								className="absolute bg-black/90 pointer-events-none rounded-3xl z-1"
								animate={{ left: offset.left }}
								transition={isReady ? { duration: 0.3, ease: 'backOut' } : { duration: 0 }}
								style={{
									width: offset.width,
									height: offset.height,
								}}
							>
								<BgBlur blurColor={'reactBlue'} className="w-3/4 h-3/4" />
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
											className="rounded-3xl block font-bold px-8 py-2 shadow-[0_0_2px_transparent] bg-black/20 focus-visible:shadow-[0_0_2px_white] hover:shadow-[0_0_2px_white] transition-shadow duration-300 ease-out"
										/>
									</div>
								);
							})}
						</li>

						<li>
							<Link
								to={prevRoute ?? '/'}
								className="block group relative bg-black/40 rounded-3xl transition-shadow duration-400 ease-out px-6 py-1 shadow-[0_0_2px_transparent] hover:shadow-[0_0_2px_white] focus-visible:shadow-[0_0_2px_white]"
							>
								<ImageComp
									imgAttr={{
										src: backIcon,
										className: 'max-w-14 h-auto object-cover',
									}}
									className="w-8 h-8"
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

			<BgBlur className="w-3/4 bg-[var(--react-blue)]/40" />
		</div>
	);
};
