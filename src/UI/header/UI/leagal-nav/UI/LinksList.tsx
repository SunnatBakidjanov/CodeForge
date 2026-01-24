/* --- Imports --- */
import { Link } from 'react-router';
import { ImageComp } from '@/UI/image-comp/ImageComp';
import backIcon from '/imgs/webp/back-icon.webp';
import { cn } from '@/utils/cn';
import type { Links } from '../hooks/useLegalNav';
import { BtnTooltip } from '@/UI/btns/btn-tooltip/BtnTooltip';

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
					'font-bold tracking-[0.2px] relative flex items-center justify-center w-full md:w-fit',
					'transition-all duration-200 ease-out',
					'py-1.5 md:py-0',
					'text-white md:hover:text-orange-400 md:focus-visible:text-orange-400 hover:bg-black/80 focus-visible:bg-black/80 md:hover:bg-transparent md:focus-visible:bg-transparent',
					'lg:text-lg',
					activeLink(link) && 'text-orange-400 bg-black/60 md:bg-transparent',
					classNames?.text
				)}
			>
				<span
					className={cn(
						'absolute md:block hidden w-0 -bottom-1 h-[2px] bg-orange-400 transition-all duration-100 ease-out',
						activeLink(link) && 'w-full duration-300'
					)}
				></span>
				{text}
			</Link>
		) : (
			<BtnTooltip
				key={i}
				as={Link}
				btnProps={{ to: link ?? '/' }}
				tooltipOptions={{
					shiftPadding: 0,
					offsetValue: 10,
				}}
				classNames={{
					btn: cn(
						'flex items-center justify-center w-full h-full',
						'transition-all duration-300 ease-out',
						'md:hover:drop-shadow-[0_0_6px_var(--hot-orange)] md:focus-visible:drop-shadow-[0_0_6px_var(--hot-orange)] hover:bg-black/80 focus-visible:bg-black/80 md:hover:bg-transparent md:focus-visible:bg-transparent'
					),
					container: 'w-full md:w-fit',
					tooltip: 'hidden md:block',
				}}
				childrens={{
					btn: (
						<ImageComp
							imgAttr={{
								src: backIcon,
								className: cn(
									'relative pointer-events-none top-px max-w-18 md:max-w-16 lg:max-w-18 h-auto drop-shadow-[0_0_1px_var(--hot-orange)]',
									classNames?.img
								),
							}}
							className={cn('h-8.5 w-8.5 lg:w-9.5 lg:h-9.5', classNames?.imgContainer)}
						/>
					),
					tooltip: 'Back',
				}}
			/>
		);
	});
};
