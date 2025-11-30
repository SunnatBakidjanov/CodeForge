import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { apiUrl } from '../../../utils/urls';

export const useLoginWithGoogle = () => {
	const handleLogin = useGoogleLogin({
		onSuccess: async tokenResponse => {
			try {
				const res = await axios.post(`${apiUrl}/google-login`, { googleAccessToken: tokenResponse.access_token }, { withCredentials: true });
				console.log(res.data);
			} catch (error) {
				console.error(error);
			}
		},
		onError: error => {
			console.error(error);
		},
	});

	return { handleLogin };
};
