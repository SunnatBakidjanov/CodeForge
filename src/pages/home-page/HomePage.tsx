import { landingRoute } from '@/utils/urls';
import { useNavigate } from 'react-router';
import { useLogout } from '@/api/useLogout';
import { NotifyConfig } from '@/UI/toast/notify-config/NotifyConfig';

export const HomePage = () => {
	const navigate = useNavigate();
	const { logout } = useLogout();
	const { notifyState } = NotifyConfig();

	return (
		<div className="text-white text-3xl">
			<h1 onClick={() => navigate(landingRoute)}>HomePage</h1>

			<button
				className="m-10 bg-white/5 rounded-3xl shadow-xs shadow-white px-10 py-0.75 cursor-pointer"
				type="button"
				onClick={() => notifyState.success(`${new Date().getSeconds()}`)}
			>
				Toasty
			</button>

			<button onClick={() => logout()}>Logout</button>
		</div>
	);
};
