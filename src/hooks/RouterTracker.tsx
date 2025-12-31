/* --- Imports --- */
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { setPrevRoute } from '../redux/prev-route-slice/slice';
import { useAppDispatch } from './useRedux';

/* --- RouterTracker Component --- */
export const RouterTracker = ({ checkRoute }: { checkRoute: string[] }) => {
	const { pathname } = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (checkRoute?.includes(pathname)) return;

		dispatch(setPrevRoute(pathname));
	}, [pathname, dispatch, checkRoute]);

	return null;
};
