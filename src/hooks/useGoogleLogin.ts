import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router';

export const useLoginWithGoogle = () => {
	const navigate = useNavigate();

	const handleLogin = useGoogleLogin({
		onSuccess: tokenResponse => {
			navigate('/');
			console.log(tokenResponse);
		},
		onError: error => {
			console.log(error);
		},
	});

	return { handleLogin };
};
