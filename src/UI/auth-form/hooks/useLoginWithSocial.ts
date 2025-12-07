import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { apiUrl, githubUrl } from '@/utils/urls';

export const useLoginWithSocial = () => {
	const googleLogin = useGoogleLogin({
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

	const githubLogin = () => {
		const width = 600;
		const height = 700;

		const left = window.screenX + (window.outerWidth - width) / 2;
		const top = window.screenY + (window.outerHeight - height) / 2;

		window.open(`${apiUrl}${githubUrl}`, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
	};

	const handleSocialLogin = (type: 'google' | 'github') => {
		return type === 'google' ? googleLogin() : githubLogin();
	};

	return { handleSocialLogin };
};
