import { Outlet } from 'react-router';
import { RouterTracker } from '../../../api/RouterTracker';
import { termsRoute, privateRoute } from '../../../utils/urls';

export const AppLayout = () => {
	return (
		<>
			<RouterTracker checkRoute={[termsRoute, privateRoute]} />
			<Outlet />
		</>
	);
};
