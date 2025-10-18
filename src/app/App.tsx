/* --- Imports --- */
import { AppRoutes } from '../routes/AppRoutes';
import '../styles/main.css';
import { BrowserRouter } from 'react-router';

/* --- App Component --- */
export const App = () => {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	);
};
