/* --- Imports --- */
import type { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';
import { useDecodeToken } from '@/hooks/useDecodeToken';
import { homeRoute } from '@/utils/urls';

/* --- Types --- */
export type LoginRes = {
	token: string;
	message: string;
};

/* --- UseOnSubmit Hook --- */
export const useOnSubmit = () => {
	const navigate = useNavigate();
	const { decodeAccessToken } = useDecodeToken();

	const onSubmited = (res?: AxiosResponse<LoginRes>) => {
		const token = res?.data?.token;

		if (!token) return;
		decodeAccessToken(token);

		navigate(homeRoute);
	};

	return { onSubmited };
};
