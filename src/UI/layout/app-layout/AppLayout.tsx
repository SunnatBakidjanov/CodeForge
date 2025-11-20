import { Outlet } from 'react-router';
import { RouterTracker } from '../../../api/RouterTracker';
import { termsServiceRoute, privatePolicyRoute } from '../../../utils/urls';

export const AppLayout = () => {
	return (
		<>
			<RouterTracker checkRoute={[termsServiceRoute, privatePolicyRoute]} />
			<Outlet />
		</>
	);
};
