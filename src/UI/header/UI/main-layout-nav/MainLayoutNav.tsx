/** --- Imports --- */
import { cn } from '@/utils/cn';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { Link } from 'react-router';
import { registerRoute, loginRoute, homeRoute } from '@/utils/urls';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';
import { motion } from 'framer-motion';
import type { NavProps } from '@/UI/header/Header';
import { useMe } from '@/api/useMe';
import { FiLogIn } from 'react-icons/fi';
import { BtnTooltip } from '@/UI/btns/btn-tooltip/BtnTooltip';

/** --- MainLayoutNav Component --- */
export const MainLayoutNav = ({ height, isOpen }: NavProps) => {
	const { data } = useMe({ staleTime: Infinity });
	const userType = data?.type === 'guest';
	const userData = data?.userData;

	const tooltipConfig = [{ text: 'Your account' }, { text: userData?.name }, { text: userData?.email }];
	const firstLatter = userData?.name[0];

	return userType ? (
		<>
			<div className="hidden sm:flex items-center justify-center gap-2 md:gap-3">
				<BgGradient
					ComponentType={'div'}
					className={cn(
						'flex items-center justify-center',
						'rounded-3xl shadow-sm shadow-white overflow-hidden',
						'[&:has(:focus-visible)]:shadow-md',
						'hover:shadow-md',
						'transition-all duration-300 ease-out'
					)}
				>
					<Link
						to={registerRoute}
						children="Register"
						className={cn(
							'text-white rounded-2xl transition-all duration-300 ease-out w-full h-full',
							'text-lg lg:text-xl',
							'py-0.5 md:py-0.75',
							'px-10 md:px-12 lg:px-14'
						)}
					/>
				</BgGradient>

				<Link
					to={loginRoute}
					children="Login"
					className={cn(
						'text-white shadow-sm shadow-white rounded-3xl bg-black/30',
						'focus-visible:shadow-md',
						'hover:shadow-md',
						'transition-all duration-300 ease-out',
						'text-lg lg:text-xl',
						'px-10 md:px-12 lg:px-14',
						'py-0.5 md:py-0.75'
					)}
				/>
			</div>

			<motion.div
				className={cn(
					'fixed left-0 overflow-hidden sm:hidden',
					'flex flex-col sm:flex-row items-center sm:opacity-100',
					'w-full sm:w-fit',
					'gap-3',
					'mt-[1px] sm:mt-0',
					'py-6 px-4 sm:p-0',
					'bg-black/80 sm:bg-transparent',
					'border-b-1 border-white/20'
				)}
				initial={{ y: '50%', opacity: 0, pointerEvents: 'none' }}
				animate={{ y: isOpen ? 0 : '50%', opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none' }}
				transition={{ duration: 0.4, ease: isOpen ? 'backOut' : 'backIn' }}
				style={{ top: `${height}px` }}
			>
				<BgGradient
					ComponentType={'div'}
					className={cn(
						'flex items-center justify-center',
						'rounded-3xl shadow-sm shadow-white overflow-hidden',
						'[&:has(:focus-visible)]:shadow-md',
						'hover:shadow-md',
						'transition-all duration-300 ease-out',
						'w-full max-w-[300px]'
					)}
				>
					<Link
						to={registerRoute}
						children="Register"
						className={cn(
							'text-white block rounded-2xl transition-all duration-300 ease-out w-full h-full text-center',
							'text-xl',
							'py-1'
						)}
						tabIndex={isOpen ? 0 : -1}
					/>
				</BgGradient>

				<Link
					to={loginRoute}
					children="Login"
					className={cn(
						'text-white shadow-sm shadow-white rounded-3xl bg-black/50 block text-center',
						'focus-visible:shadow-md',
						'hover:shadow-md',
						'transition-all duration-300 ease-out',
						'text-xl',
						'w-full max-w-[300px]',
						'py-1'
					)}
					tabIndex={isOpen ? 0 : -1}
				/>

				<BgBlur className="h-1/2 w-2/3 blur-[130px] sm:hidden" />
			</motion.div>
		</>
	) : (
		<div className="flex items-center justify-center gap-2">
			<BtnTooltip
				as={Link}
				btnProps={{ to: homeRoute }}
				tooltipOptions={{
					offsetValue: 12,
				}}
				classNames={{
					btn: cn(
						'flex items-center justify-center',
						'text-white shadow-[0_0_4px_white] rounded-full bg-black/40 font-bold',
						'hover:shadow-[0_2px_8px_white] focus-visible:shadow-[0_2px_8px_white]',
						'transition-all duration-300 ease-out',
						'w-full max-w-[300px]',
						'h-8.5 w-8.5 sm:h-10.5 sm:w-10.5 lg:h-11 lg:w-11'
					),
				}}
				childrens={{ btn: <FiLogIn className="text-white relative right-0.5 sm:text-xl" />, tooltip: 'Join CodeForge' }}
			/>

			<BtnTooltip
				btnWrapper={({ children }) => (
					<BgGradient
						ComponentType="div"
						className={cn(
							'rounded-full shadow-[0_0_3px_white] text-white cursor-pointer',
							'hover:shadow-[0_2px_8px_white] focus-within:shadow-[0_2px_8px_white]',
							'transition-all duration-200 ease-out'
						)}
					>
						{children}
					</BgGradient>
				)}
				tooltipOptions={{
					offsetValue: 0,
				}}
				childrens={{
					btn: firstLatter,
					tooltip: tooltipConfig.map(({ text }, i) => {
						if (!text) return null;
						const textValidate = text.length >= 28 ? text.slice(0, 28) + '...' : text;

						return (
							<span key={i} className={cn('cursor-text block w-fit leading-tight', i === 0 && 'font-bold mb-1 text-white')}>
								{textValidate}
							</span>
						);
					}),
				}}
				classNames={{
					btn: cn('cursor-pointer', 'text-lg sm:text-xl font-bold', 'h-8.5 w-8.5 sm:h-10.5 sm:w-10.5 lg:h-11 lg:w-11'),
					tooltip: cn('font-normal text-(--white)'),
					tooltipContainer: 'pt-3',
				}}
			/>
		</div>
	);
};
