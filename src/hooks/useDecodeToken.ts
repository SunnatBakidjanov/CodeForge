/* --- Imports --- */
import { jwtDecode } from 'jwt-decode';
import { useAppDispatch } from './useRedux';
import { setAccessToken } from '@/redux/access-slice/slice';
import { setUser } from '@/redux/user-slice/slice';

/* --- Types --- */
export type UserDecoded = {
	name: string;
	email: string;
	id: string;
	exp: number;
	iat: number;
};

/* --- useDocodeToken Hook --- */
export const useDecodeToken = () => {
	const dispatch = useAppDispatch();

	const decodeAccessToken = (token: string) => {
		if (!token) return;

		const docode = jwtDecode<UserDecoded>(token);
		dispatch(setAccessToken(token));
		dispatch(setUser({ name: docode.name, email: docode.email, id: docode.id }));
	};

	return { decodeAccessToken };
};
