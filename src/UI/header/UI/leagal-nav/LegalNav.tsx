/* --- Imports --- */
import type { NavProps } from '../../Header';
import { useLegalNav } from './hooks/useLegalNav';
import { cn } from '@/utils/cn';
import { LinksList } from './UI/LinksList';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';
import { motion } from 'framer-motion';

/* --- LegalNav Component --- */
export const LegalNav = ({ isOpen, height }: NavProps) => {
	const { links, activeLink } = useLegalNav();

	return (
		<>
			<div className={cn('hidden md:flex items-center justify-center gap-2')}>
				<LinksList links={links} activeLink={activeLink} />
			</div>

			<motion.div
				className={cn('md:hidden absolute overflow-hidden w-full left-0 border-b-1 border-white/20 bg-black', 'mt-px', 'py-6 px-4')}
				initial={{ y: '50%', opacity: 0, pointerEvents: 'none' }}
				animate={{ y: isOpen ? 0 : '50%', opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
				transition={{ duration: 0.4, ease: isOpen ? 'backOut' : 'backIn' }}
				style={{ top: `${height}px` }}
			>
				<div className="flex flex-col items-center gap-2.5 relative z-2">
					<LinksList
						links={links}
						activeLink={activeLink}
						isHasTabindex={true}
						isOpen={isOpen}
						classNames={{ text: 'w-full text-center text-base bg-black/60 text-lg', imgContainer: 'w-full h-10 w-10', img: 'max-w-20' }}
					/>
				</div>

				<BgBlur className="w-3/4 h-1/2 blur-[80px] z-1" />
			</motion.div>
		</>
	);
};
