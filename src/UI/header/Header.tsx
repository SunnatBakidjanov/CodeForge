/* --- Imports --- */
import { Button } from '../button/Button';
import { BgGradient } from '../gradients/bg-gradient/BgGradient';
import { cn } from '../../utils/cn';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { MaxWidthContainer } from '../containers/max-width-container/MaxWidthContainer';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { MainTitle } from '../main-title/MainTitle';

/* --- Header Component --- */
// This component represents the header of the application.
export const Header = () => {
	const navigate = useNavigate();
	const headerRef = useRef<HTMLDivElement>(null);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header ref={headerRef} className={cn('relative overflow-hidden w-full z-10', 'h-16.5 md:h-21')}>
			<div
				ref={headerRef}
				className={cn('mx-auto w-full transition-all duration-400 ease-out fixed top-0', scrolled ? 'bg-black' : 'bg-black/40')}
			>
				<MaxWidthContainer className="px-2 md:px-4 lg:px-6 py-3">
					<div className="flex items-center justify-between">
						<MainTitle
							href="/landing"
							textGradient={{
								ComponentType: 'button',
								className: cn('flex items-center font-bold cursor-pointer group', 'text-lg md:text-xl lg:text-2xl'),
							}}
							imgComp={{
								loader: { classNames: { container: 'h-5 w-5' } },
								className: cn(
									'transition-all duration-300 ease-out drop-shadow-[0_0_0px_var(--hot-orange)] group-focus-visible:drop-shadow-[0_0_3px_var(--hot-orange)] group-hover:drop-shadow-[0_0_3px_var(--hot-orange)]',
									'relative top-[1px] md:top-[1.5px] lg:top-[0.5px]',
									'ml-1 lg:ml-1.5'
								),
							}}
							imgAttr={{
								className: cn('max-w-7 md:max-w-8 md:max-w-10 h-auto object-cover'),
							}}
						/>

						<div className="flex items-center gap-2 md:gap-3 lg:gap-3.5">
							<BgGradient
								ComponentType={'div'}
								className={cn(
									'rounded-2xl shadow-sm shadow-white overflow-hidden',
									'[&:has(:focus-visible)]:shadow-md',
									'hover:shadow-md',
									'transition-all duration-300 ease-out'
								)}
							>
								<Button
									children={'Register'}
									classNames={{
										button: cn('text-white rounded-2xl', 'lg:text-lg', 'px-3 md:px-8 lg:px-10', 'py-0.5 md:py-1.5 lg:py-1'),
										blik: 'w-[20%] md:w-[25%]',
									}}
									onClick={() => navigate('/register')}
									isBlink={true}
								/>
							</BgGradient>

							<Button
								children={'Login'}
								classNames={{
									button: cn(
										'text-white shadow-sm shadow-white rounded-2xl',
										'focus-visible:shadow-md',
										'hover:shadow-md',
										'transition-all duration-300 ease-out',
										'lg:text-lg',
										'px-4 md:px-10 lg:px-12',
										'py-0.5 md:py-1.5 lg:py-1'
									),
									blik: 'w-[20%] md:w-[25%]',
								}}
								onClick={() => navigate('/login')}
								isBlink={true}
							/>
						</div>

						<BgBlur className="w-full h-1/2 blur-[100px]" />
					</div>
				</MaxWidthContainer>
			</div>
		</header>
	);
};
