/** --- Imports --- */
import { useMe, type UserData, type ResData as UserResData } from '@/api/useMe';
import { motion } from 'framer-motion';
import type { Strategy } from '@floating-ui/react-dom';
import { cn } from '@/utils/cn';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';
import { privateRoute, termsRoute } from '@/utils/urls';
import { BtnLink } from '@/UI/btns/btn-link/BtnLink';
import { BtnLogout } from '@/UI/btns/btn-logout/BtnLogout';
import { IoMdSettings } from 'react-icons/io';
import { Link } from 'react-router';
import { RiProfileLine } from 'react-icons/ri';
import { useResize } from '@/hooks/useResize';

/* --- Types --- */
type FloatingOptions = {
	setFloating: (node: HTMLElement | null) => void;
	x: number;
	y: number;
	strategy: Strategy;
};

type Props = {
	floatingOption: FloatingOptions;
	userData?: UserData;
	closeMenu: () => void;
};

/** --- UserProfileMenu Component --- */
export const UserProfileMenu = ({ userData, floatingOption, closeMenu }: Props) => {
	const { data } = useMe({ staleTime: userData ? Infinity : 0 });
	const { width } = useResize();
	const { x, y, strategy, setFloating } = floatingOption;
	const { userData: user } = data as UserResData;
	const firstLatter = user?.name.charAt(0);

	const changeWidth = width < 640;

	const linkConfig = [
		{ text: 'Privacy Policy', link: privateRoute },
		{ text: 'Terms of Service', link: termsRoute },
	];

	return (
		<div
			ref={setFloating}
			style={{
				position: changeWidth ? 'fixed' : strategy,
				top: changeWidth ? 0 : (y ?? 0),
				left: changeWidth ? 0 : (x ?? 0),
			}}
			className="w-full sm:w-fit"
		>
			<motion.div
				className={cn(
					'relative flex flex-col items-center justify-center backdrop-blur sm:rounded-lg shadow-[0_0_2px_white] overflow-hidden',
					'w-full sm:w-fit',
					'pt-5 pb-4 md:pt-6 md:pb-5',
					'px-4'
				)}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
			>
				<div className="h-8 w-full flex justify-end items-center mb-2">
					<button
						type="button"
						onClick={closeMenu}
						className="flex items-center justify-center w-8 h-8 sm:h-9 sm:w-9 rounded-full hover:bg-black/50 cursor-pointer relative transition-colors duration-300 ease-out"
					>
						<span className="block absolute h-0.5 bg-white/80 w-5 sm:w-6 rotate-45"></span>
						<span className="block absolute h-0.5 bg-white/80 w-5 sm:w-6 -rotate-45"></span>
					</button>
				</div>

				<div
					className={cn(
						'flex items-center flex-col bg-black/50 rounded-lg',
						'pt-4 md:pt-5 pb-6 md:pb-7',
						'md:px-14',
						'w-full sm:w-[340px] md:w-[380px]'
					)}
				>
					<div
						className={cn(
							'flex items-center justify-center rounded-full bg-white/15 border-1 border-white/50 text-(--white) font-bold',
							'text-2xl md:text-3xl',
							'w-16 h-16 md:w-18 md:h-18'
						)}
					>
						{firstLatter}
					</div>

					<div className={cn('flex flex-col md:gap-0.5', 'mt-4 mb:mt-5', 'text-white text-center', 'tracking-[0.2px]')}>
						<p>Hello, {user?.name}</p>
						<p className="text-sm">{user?.email?.length >= 30 ? `${user?.email?.slice(0, 30)}...` : user?.email}</p>
					</div>
				</div>

				<div className="w-full md:text-lg text-white mt-7 md:mt-8">
					<div className={cn('flex justify-center items-center w-full', 'gap-2.5 md:gap-3')}>
						<Link
							to={'/'}
							className={cn(
								'flex justify-end items-center w-1/2 border-1 border-white/30 bg-white/5 shadow-sm rounded-l-2xl',
								'gap-1.5',
								'pr-4',
								'py-1.5',
								'transition-all duration-300 ease-out',
								'hover:bg-black/40 hover:shadow-white/80 focus-visible:bg-black/40 focus-visible:shadow-white/80'
							)}
						>
							<IoMdSettings className="relative bottom-px" />
							Settings
						</Link>

						<BtnLogout
							classNames={{
								button: cn(
									'w-1/2 border-1 border-white/30 bg-white/5 rounded-r-2xl shadow-sm',
									'gap-1.5',
									'pl-4',
									'py-1.5',
									'transition-all duration-300 ease-out',
									'hover:bg-black/40  hover:shadow-white/80 focus-visible:bg-black/40 focus-visible:shadow-white/80'
								),
							}}
						/>
					</div>

					<Link
						to={'/'}
						className={cn(
							'flex items-center justify-center gap-2 rounded-xl bg-white/5 border-1 border-white/30 w-full shadow-sm',
							'transition-all duration-300 ease-out',
							'hover:bg-black/40 hover:shadow-white/80 focus-visible:bg-black/40 focus-visible:shadow-white/80',
							'mt-3',
							'py-1.5'
						)}
					>
						<RiProfileLine className="relative bottom-px" />
						Profile
					</Link>
				</div>

				<span className="mt-7 block h-0.5 w-3/4 bg-white/10"></span>

				<div className="flex flex-col items-center gap-1 tracking-[0.2px] text-white text-sm mt-5">
					{linkConfig.map(({ text, link }, i) => (
						<BtnLink
							key={i}
							text={text}
							href={link}
							classNames={{ textGradient: 'text-white', bgGradient: 'bg-white h-px -bottom-1', link: 'pb-1' }}
						/>
					))}
				</div>

				<BgBlur blurColor={'blueBlack'} />
			</motion.div>
		</div>
	);
};
