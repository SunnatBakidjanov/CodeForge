/* --- Imports --- */
import { useQuery } from '@tanstack/react-query';
import { apiUrl, getMeUrl } from '@/utils/urls';
import axiosPrivate from './axiosPrivate';

/* --- Types --- */
export type UserData = {
	id: string;
	name: string;
	email: string;
	role: 'creator' | 'admin' | 'user';
};

type ResData = {
	userData: UserData;
	message: string;
	type: 'user' | 'guest';
};

type UseMeOptions = {
	staleTime?: number;
};

/* --- useMe Hook --- */
export const useMe = (options?: UseMeOptions) => {
	const { staleTime } = options ?? {};

	const checkMe = async () => {
		const res = await axiosPrivate.get<ResData>(`${apiUrl}${getMeUrl}`, { withCredentials: true });
		return res?.data;
	};

	return useQuery({
		queryKey: ['me'],
		queryFn: checkMe,
		retry: false,
		staleTime: staleTime ?? 0,
	});
};
