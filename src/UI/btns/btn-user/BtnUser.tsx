import type { UserData } from '@/api/useMe';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { Tooltip } from '@/UI/tooltip/Tooltip';
import { cn } from '@/utils/cn';
import { homeRoute } from '@/utils/urls';
import { useNavigate } from 'react-router';

/* --- BtnUser Component --- */
export const BtnUser = ({ userData }: { userData?: UserData }) => {
	const navigate = useNavigate();
	const firstLatter = userData?.name[0];

	const tooltipConfig = [{ text: 'Your account' }, { text: userData?.name }, { text: userData?.email }];

	return (
		<div className="relative group">
			<BgGradient
				ComponentType="button"
				className={cn(
					'rounded-full shadow-[0_0_3px_white] text-white cursor-pointer',
					'h-8.5 w-8.5 sm:h-10.5 sm:w-10.5 lg:h-11 lg:w-11',
					'hover:shadow-[0_2px_8px_white] focus-visible:shadow-[0_2px_8px_white]',
					'transition-all duration-200 ease-out'
				)}
				onClick={() => navigate(homeRoute)}
			>
				<span className={'text-lg sm:text-xl font-bold'}>{firstLatter}</span>
			</BgGradient>

			<Tooltip
				classNames={{
					outer: cn('absolute top-full right-0', 'pt-3'),
					inner: cn('flex flex-col items-start', 'px-2 py-1'),
				}}
			>
				{tooltipConfig.map(({ text }, i) => {
					const textValidate = text && text?.length >= 28 ? text?.slice(0, 28) + '...' : text;

					return (
						<span key={i} className={cn('cursor-text', i === 0 && 'font-bold text-white')}>
							{textValidate}
						</span>
					);
				})}
			</Tooltip>
		</div>
	);
};
