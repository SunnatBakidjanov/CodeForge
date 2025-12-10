import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

const useLogout = () => {
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await axios.get(`http://localhost:8000/api/logout`, { withCredentials: true });

			navigate('/auth/login');
		} catch (error) {
			const err = error as AxiosError;

			if (err.response?.status === 500) {
				console.log(err.response?.data);
			}
		}
	};

	return { logout };
};

export const HomePage = () => {
	const { logout } = useLogout();

	return (
		<div className="text-white text-3xl">
			<h1>HomePage</h1>

			<button onClick={() => logout()}>Logout</button>
		</div>
	);
};
