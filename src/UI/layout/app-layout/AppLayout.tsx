import { Outlet } from 'react-router';
import { RouterTracker } from '../../../hooks/RouterTracker';
import { termsRoute, privateRoute } from '../../../utils/urls';

export const AppLayout = () => {
	return (
		<>
			<RouterTracker checkRoute={[termsRoute, privateRoute]} />
			<Outlet />
		</>
	);
};
