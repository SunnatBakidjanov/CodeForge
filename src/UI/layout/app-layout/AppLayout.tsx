import { Outlet } from 'react-router';
import { RouterTracker } from '../../../hooks/RouterTracker';
import { termsRoute, privateRoute } from '../../../utils/urls';
import { ToastContainer } from '@/UI/toast/toast-container/ToastContainer';

export const AppLayout = () => {
	return (
		<>
			<ToastContainer />
			<RouterTracker checkRoute={[termsRoute, privateRoute]} />
			<Outlet />
		</>
	);
};
