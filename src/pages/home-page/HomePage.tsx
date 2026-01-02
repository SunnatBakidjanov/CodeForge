import { landingRoute } from '@/utils/urls';
import { useNavigate } from 'react-router';
import { useLogout } from '@/api/useLogout';

export const HomePage = () => {
	const navigate = useNavigate();
	const { logout } = useLogout();

	return (
		<div className="text-white text-3xl">
			<h1 onClick={() => navigate(landingRoute)}>HomePage</h1>

			<button onClick={() => logout()}>Logout</button>
		</div>
	);
};
