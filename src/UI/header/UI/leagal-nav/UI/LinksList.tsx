/* --- Imports --- */
import { Link } from 'react-router';
import { ImageComp } from '@/UI/image-comp/ImageComp';
import backIcon from '/imgs/webp/back-icon.webp';
import { cn } from '@/utils/cn';
import type { Links } from '../hooks/useLegalNav';

/* --- Types --- */
type Props = {
	links: Links[];
	activeLink: (link?: string | null | undefined) => boolean;
	classNames?: { [key in 'text' | 'img' | 'imgContainer']?: string };
	isHasTabindex?: boolean;
	isOpen?: boolean;
};

/* --- LinksList Component --- */
export const LinksList = ({ links, activeLink, classNames, isOpen, isHasTabindex }: Props) => {
	const tabIndex = !isHasTabindex ? 0 : isOpen ? 0 : -1;

	return links.map(({ link, text, type }, i) => {
		return type === 'text' ? (
			<Link
				to={link ?? '/'}
				key={i}
				tabIndex={tabIndex}
				className={cn(
					'block font-bold lg:font-normal',
					'transition-all duration-300 ease-out',
					'py-1.25 lg:py-1.25 px-6 lg:px-10',
					'text-white bg-black/40 rounded-3xl',
					'lg:text-xl',
					'shadow-xs shadow-white',
					'shadow-white hover:shadow-md focus-visible:shadow-md',
					classNames?.text,
					activeLink(link) && 'shadow-md bg-black'
				)}
			>
				{text}
			</Link>
		) : (
			<Link
				to={link ?? '/'}
				key={i}
				tabIndex={tabIndex}
				className={cn(
					'flex items-center justify-center overflow-hidden rounded-3xl bg-black/40 shadow-xs shadow-white',
					'hover:shadow-md focus-within:shadow-md',
					'px-6 lg:px-12',
					'transition-all duration-300 ease-out',
					classNames?.text
				)}
			>
				<ImageComp
					imgAttr={{
						src: backIcon,
						className: cn('relative top-px max-w-18 lg:max-w-20 h-auto drop-shadow-[0_0_1px_var(--hot-orange)]', classNames?.img),
					}}
					className={cn('h-8.5 w-8.5 lg:w-9.5 lg:h-9.5', classNames?.imgContainer)}
				/>
			</Link>
		);
	});
};
