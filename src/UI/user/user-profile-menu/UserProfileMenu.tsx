/** --- Imports --- */
import { useMe, type UserData, type ResData as UserResData } from '@/api/useMe';
import { motion } from 'framer-motion';

/** --- UserProfileMenu Component --- */
export const UserProfileMenu = ({ userData }: { userData?: UserData }) => {
	const { data } = useMe({ staleTime: userData ? Infinity : 0 });
	const { userData: user } = data as UserResData;
	const firstLatter = user?.name.charAt(0);

	return (
		<motion.div
			className="absolute top-full backdrop-blur-md bg-black/40"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className="flex flex-col">
				<div className="bg-white/5 rounded-full w-10 h-10 font-bold text-white flex items-center justify-center">{firstLatter}</div>
				<p>{user?.name}</p>
				<p>{user?.email}</p>
			</div>
		</motion.div>
	);
};
