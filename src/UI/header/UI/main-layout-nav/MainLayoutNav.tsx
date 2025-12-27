import { cn } from '@/utils/cn';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { Button } from '@/UI/btns/button/Button';
import { useNavigate } from 'react-router';
import { registerRoute, loginRoute } from '@/utils/urls';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';
import { motion } from 'framer-motion';
import type { NavProps } from '@/UI/header/Header';
import { BtnBurger } from '@/UI/btns/btn-burger/BtnBurger';

export const MainLayoutNav = ({ height, isOpen, handleOpen }: NavProps) => {
	const navigate = useNavigate();

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
					<Button
						children={'Register'}
						classNames={{
							button: cn(
								'text-white rounded-2xl transition-all duration-300 ease-out w-full h-full',
								'text-lg lg:text-xl',
								'py-0.5 md:py-0.75',
								'px-10 md:px-12 lg:px-14'
							),
							blik: 'w-[20%] md:w-[25%]',
						}}
						onClick={() => navigate(registerRoute)}
						isBlink={true}
					/>
				</BgGradient>

				<Button
					children={'Login'}
					classNames={{
						button: cn(
							'text-white shadow-sm shadow-white rounded-3xl bg-black/30',
							'focus-visible:shadow-md',
							'hover:shadow-md',
							'transition-all duration-300 ease-out',
							'text-lg lg:text-xl',
							'px-10 md:px-12 lg:px-14',
							'py-0.5 md:py-0.75'
						),
						blik: 'w-[20%] md:w-[25%]',
					}}
					onClick={() => navigate(loginRoute)}
					isBlink={true}
				/>
			</div>

			<BtnBurger classNames={{ btn: 'sm:hidden', container: 'gap-1.25 w-8 h-6', lines: 'w-full h-[3px]' }} btnProps={{ onClick: handleOpen }} />

			<motion.div
				className={cn(
					'fixed left-0 overflow-hidden sm:hidden',
					'flex flex-col sm:flex-row items-center sm:opacity-100',
					'w-full sm:w-fit',
					'gap-3',
					'mt-[1px] sm:mt-0',
					'py-6 px-4 sm:p-0',
					'bg-black/80 sm:bg-transparent'
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
					<Button
						children={'Register'}
						classNames={{
							button: cn('text-white rounded-2xl transition-all duration-300 ease-out w-full h-full', 'text-xl', 'py-1'),
							blik: 'w-[20%] md:w-[25%]',
						}}
						tabIndex={isOpen ? 0 : -1}
						onClick={() => navigate(registerRoute)}
						isBlink={true}
					/>
				</BgGradient>

				<Button
					children={'Login'}
					classNames={{
						button: cn(
							'text-white shadow-sm shadow-white rounded-3xl bg-black/50',
							'focus-visible:shadow-md',
							'hover:shadow-md',
							'transition-all duration-300 ease-out',
							'text-xl',
							'w-full max-w-[300px]',
							'py-1'
						),
						blik: 'w-[20%] md:w-[25%]',
					}}
					tabIndex={isOpen ? 0 : -1}
					onClick={() => navigate(loginRoute)}
					isBlink={true}
				/>

				<BgBlur className="h-1/2 w-2/3 blur-[130px] sm:hidden" />
			</motion.div>
		</>
	);
};
