/* --- Imports --- */
import { AppRoutes } from '../routes/AppRoutes';
import '../styles/main.css';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

/* --- App Component --- */
export const App = () => {
	return (
		<BrowserRouter>
			<Provider store={store}>
				<AppRoutes />
			</Provider>
		</BrowserRouter>
	);
};
