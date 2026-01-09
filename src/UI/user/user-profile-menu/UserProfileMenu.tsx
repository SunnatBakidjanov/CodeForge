/** --- Imports --- */
import { useMe, type UserData, type ResData as UserResData } from '@/api/useMe';
import { motion } from 'framer-motion';
import type { Strategy } from '@floating-ui/react-dom';

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
				className="backdrop-blur-md bg-black/40"
				initial={{ opacity: 0, scale: 1 }}
				animate={{ opacity: 1, scale: 0.9 }}
				exit={{ opacity: 0, scale: 0.8, backdropFilter: 'blur(20px)' }}
			>
				<div className="flex flex-col">
					<div className="bg-white/5 rounded-full w-10 h-10 font-bold text-white flex items-center justify-center">{firstLatter}</div>
					<p>{user?.name}</p>
					<p>{user?.email}</p>
				</div>
			</motion.div>
		</div>
	);
};
