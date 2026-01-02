/* --- Imports --- */
import { useQuery } from '@tanstack/react-query';
import { apiUrl } from '@/utils/urls';
import axiosPrivate from './axiosPrivate';

/* --- Types --- */
type UserData = {
	id: string;
	name: string;
	email: string;
	role: 'creator' | 'admin' | 'user';
};

/* --- useMe Hook --- */
export const useMe = () => {
	const checkMe = async () => {
		const res = await axiosPrivate.get<UserData>(`${apiUrl}/me`, { withCredentials: true });
		return res?.data;
	};

	return useQuery({
		queryKey: ['me'],
		queryFn: checkMe,
		retry: false,
	});
};
