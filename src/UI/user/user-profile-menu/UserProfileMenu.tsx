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
};

/** --- UserProfileMenu Component --- */
export const UserProfileMenu = ({ userData, floatingOption }: Props) => {
	const { data } = useMe({ staleTime: userData ? Infinity : 0 });
	const { x, y, strategy, setFloating } = floatingOption;
	const { userData: user } = data as UserResData;
	const firstLatter = user?.name.charAt(0);

	const linkConfig = [
		{ text: 'Privacy Policy', link: privateRoute },
		{ text: 'Terms of Service', link: termsRoute },
	];

	return (
		<div
			ref={setFloating}
			style={{
				position: strategy,
				top: y ?? 0,
				left: x ?? 0,
			}}
		>
			<motion.div
				className={cn(
					'relative flex flex-col items-center justify-center backdrop-blur rounded-lg shadow-[0_0_2px_white] overflow-hidden',
					'pt-6 pb-5',
					'px-4'
				)}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
			>
				<div className={cn('flex items-center flex-col bg-black/50 overflow-hidden rounded-lg', 'pt-4 pb-6', 'px-14', 'min-w-[380px]')}>
					<div
						className={cn(
							'flex items-center justify-center rounded-full bg-white/15 border-1 border-white/50 text-(--white) font-bold',
							'text-2xl',
							'w-18 h-18'
						)}
					>
						{firstLatter}
					</div>

					<div className={cn('flex flex-col gap-0.5', 'mt-4', 'text-white text-center', 'tracking-[0.2px]')}>
						<p>Hello, {user?.name}</p>
						<p className="text-sm">{user?.email?.length >= 35 ? `${user?.email?.slice(0, 35)}...` : user?.email}</p>
					</div>
				</div>

				<div className="w-full text-xl text-white mt-8">
					<div className={cn('flex justify-center items-center w-full', 'gap-3')}>
						<Link
							to={'/'}
							className={cn(
								'flex justify-end items-center w-1/2 border-1 border-white/30 rounded-l-2xl shadow-white',
								'gap-1.5',
								'pr-4',
								'py-1.5',
								'transition-all duration-300 ease-out bg-white/5',
								'hover:bg-black/40 focus-visible:bg-black/40'
							)}
						>
							<IoMdSettings className="relative bottom-px" />
							Settings
						</Link>

						<BtnLogout
							classNames={{
								button: cn(
									'w-1/2 border-1 border-white/30 rounded-r-2xl shadow-white',
									'gap-1.5',
									'pl-4',
									'py-1.5',
									'transition-all duration-300 ease-out bg-white/5',
									'hover:bg-black/40 focus-visible:bg-black/40'
								),
							}}
						/>
					</div>

					<Link
						to={'/'}
						className={cn(
							'flex items-center justify-center gap-2 rounded-2xl border-1 border-white/30 w-full',
							'transition-all duration-300 ease-out bg-white/5',
							'hover:bg-black/40 focus-visible:bg-black/40',
							'mt-3',
							'py-1.5'
						)}
					>
						<RiProfileLine className="relative bottom-px" />
						Profile
					</Link>
				</div>

				<span className="mt-7 block h-0.5 w-3/4 bg-white/10"></span>

				<div className="flex flex-col items-center gap-1 tracking-[0.2px] text-white text-sm mt-3">
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
