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
		<header ref={headerRef} className={cn('relative overflow-hidden w-full z-10', 'h-16.5')}>
			<div
				ref={headerRef}
				className={cn('mx-auto w-full transition-all duration-400 ease-out fixed top-0', scrolled ? 'bg-black' : 'bg-black/40')}
			>
				<MaxWidthContainer className="px-2 py-3">
					<div className="flex items-center justify-between">
						<MainTitle
							href="/landing"
							textGradient={{
								ComponentType: 'h1',
								className: cn('flex items-center font-bold cursor-pointer group', 'text-lg'),
							}}
							imgComp={{
								loader: { size: 20 },
								className: cn('relative top-[1px]', 'ml-1'),
							}}
							imgAttr={{
								className: cn('max-w-7 h-auto object-cover'),
							}}
						/>

						<div className="flex items-center gap-2">
							<BgGradient
								ComponentType={'div'}
								className={cn(
									'rounded-2xl shadow-sm shadow-white overflow-hidden',
									'hover:shadow-md',
									'transition-all duration-300 ease-out'
								)}
							>
								<Button
									children={'Register'}
									classNames={{ button: cn('text-white', 'px-3', 'py-0.5') }}
									onClick={() => navigate('/register')}
									isBlink={true}
								/>
							</BgGradient>

							<Button
								children={'Login'}
								classNames={{
									button: cn(
										'text-white shadow-sm shadow-white rounded-2xl',
										'hover:shadow-md',
										'transition-all duration-300 ease-out',
										'px-4',
										'py-0.5'
									),
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
