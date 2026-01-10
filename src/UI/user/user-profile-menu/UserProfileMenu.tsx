/** --- Imports --- */
import { useMe, type UserData, type ResData as UserResData } from '@/api/useMe';
import { motion } from 'framer-motion';
import type { Strategy } from '@floating-ui/react-dom';
import { cn } from '@/utils/cn';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';

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
					'relative flex items-center justify-center backdrop-blur rounded-lg shadow-[0_0_2px_white] overflow-hidden',
					'py-6',
					'px-4'
				)}
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
			>
				<div className={cn('flex items-center flex-col bg-black/50 overflow-hidden rounded-lg', 'pt-4 pb-6', 'px-14', 'min-w-[380px]')}>
					<div
						className={cn(
							'flex items-center justify-center rounded-full bg-white/5 border-1 border-white/5 text-(--white) font-bold',
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

				<BgBlur blurColor={'blueBlack'} />
			</motion.div>
		</div>
	);
};
