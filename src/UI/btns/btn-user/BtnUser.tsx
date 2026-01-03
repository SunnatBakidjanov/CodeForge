/* --- Imports --- */
import type { UserData } from '@/api/useMe';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { cn } from '@/utils/cn';
import { homeRoute } from '@/utils/urls';
import { useNavigate } from 'react-router';
import { useFloating, flip, shift } from '@floating-ui/react-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

/* --- BtnUser Component --- */
export const BtnUser = ({ userData }: { userData?: UserData }) => {
	const navigate = useNavigate();
	const firstLatter = userData?.name[0];
	const [open, setOpen] = useState(false);

	const { x, y, refs, strategy } = useFloating({
		placement: 'bottom',
		middleware: [flip(), shift({ padding: 10 })],
	});

	const tooltipConfig = [{ text: 'Your account' }, { text: userData?.name }, { text: userData?.email }];

	return (
		<div className="relative">
			<BgGradient
				ComponentType="div"
				className={cn(
					'rounded-full shadow-[0_0_3px_white] text-white cursor-pointer',
					'hover:shadow-[0_2px_8px_white] focus-within:shadow-[0_2px_8px_white]',
					'transition-all duration-200 ease-out'
				)}
				onClick={() => navigate(homeRoute)}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
			>
				<button
					onFocus={() => setOpen(true)}
					onBlur={() => setOpen(false)}
					ref={refs.setReference}
					className={cn('cursor-pointer', 'text-lg sm:text-xl font-bold', 'h-8.5 w-8.5 sm:h-10.5 sm:w-10.5 lg:h-11 lg:w-11')}
				>
					{firstLatter}
				</button>
			</BgGradient>

			{open && (
				<motion.div
					className="pt-2"
					initial={{ opacity: 0, y: -5 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -5 }}
					ref={refs.setFloating}
					transition={{
						type: 'spring',
						stiffness: 500,
						damping: 30,
						duration: 0.2,
					}}
					style={{
						position: strategy,
						top: y ?? 0,
						left: x ?? 0,
					}}
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
				>
					<div className={cn('flex flex-col', 'bg-black/80 text-(--white) rounded-md shadow-[0_0_3px_white]', 'px-2.5 py-1.5')}>
						{tooltipConfig.map(({ text }, i) => {
							if (!text) return null;
							const textValidate = text.length >= 28 ? text.slice(0, 28) + '...' : text;

							return (
								<span key={i} className={cn('cursor-text block w-fit', i === 0 && 'font-bold text-white')}>
									{textValidate}
								</span>
							);
						})}
					</div>
				</motion.div>
			)}
		</div>
	);
};
