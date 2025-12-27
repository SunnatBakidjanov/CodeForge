/* --- Imports --- */
import type { NavProps } from '../../Header';
import { BtnBurger } from '@/UI/btns/btn-burger/BtnBurger';
import { useLegalNav } from './hooks/useLegalNav';
import { Link } from 'react-router';
import { cn } from '@/utils/cn';
import { ImageComp } from '@/UI/image-comp/ImageComp';
import backIcon from 'public/imgs/webp/back-icon.webp';

/* --- LegalNav Component --- */
export const LegalNav = ({ handleOpen }: NavProps) => {
	const { links } = useLegalNav();

	return (
		<>
			<BtnBurger classNames={{ btn: 'md:hidden', container: 'gap-1.25 w-8 h-6', lines: 'w-full h-[3px]' }} btnProps={{ onClick: handleOpen }} />

			<div className={cn('hidden md:flex items-center justify-center gap-4')}>
				{links.map(({ link, text, type }, i) => {
					return type === 'text' ? (
						<Link to={link ?? '/'} key={i}>
							{text}
						</Link>
					) : (
						<Link to={link ?? '/'} key={i}>
							<ImageComp imgAttr={{ src: backIcon, className: 'w-4 h-4' }} />
						</Link>
					);
				})}
			</div>
		</>
	);
};
