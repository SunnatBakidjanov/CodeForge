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
					'block font-bold lg:font-normal',
					'transition-all duration-300 ease-out',
					'py-1.25 lg:py-1.25 px-6 lg:px-10',
					'text-white bg-black/40 rounded-3xl',
					'lg:text-lg',
					'shadow-[0_0_2px_white]',
					'hover:shadow-[0_1px_5px_white] focus-visible:shadow-[0_1px_5px_white]',
					classNames?.text,
					activeLink(link) && 'shadow-white shadow-sm'
				)}
			>
				{text}
			</Link>
		) : (
			<BtnTooltip
				as={Link}
				btnProps={{ to: link ?? '/' }}
				tooltipOptions={{
					shiftPadding: 0,
					offsetValue: 10,
				}}
				classNames={{
					btn: cn(
						'flex items-center justify-center w-full h-full bg-black/40 rounded-3xl shadow-[0_0_2px_white]',
						'px-0 md:px-4 lg:px-6',
						'hover:shadow-[0_1px_5px_white] focus-visible:shadow-[0_1px_5px_white]',
						'transition-all duration-300 ease-out'
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
