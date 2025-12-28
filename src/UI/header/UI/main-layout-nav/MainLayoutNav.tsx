import { cn } from '@/utils/cn';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { Link } from 'react-router';
import { registerRoute, loginRoute } from '@/utils/urls';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';
import { motion } from 'framer-motion';
import type { NavProps } from '@/UI/header/Header';

export const MainLayoutNav = ({ height, isOpen }: NavProps) => {
	return (
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
	);
};
