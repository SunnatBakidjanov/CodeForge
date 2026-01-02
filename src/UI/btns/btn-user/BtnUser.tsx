import type { UserData } from '@/api/useMe';
import { homeRoute } from '@/utils/urls';
import { useNavigate } from 'react-router';

/* --- BtnUser Component --- */
export const BtnUser = ({ userData }: { userData?: UserData }) => {
	const navigate = useNavigate();
	const firstLatter = userData?.name[0];

	return (
		<button
			onClick={() => navigate(homeRoute)}
			type="button"
			className="w-12 h-12 rounded-full bg-black/20 text-white text-lg font-bold cursor-pointer"
		>
			{firstLatter}
		</button>
	);
};
