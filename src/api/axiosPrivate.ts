/* --- Imports --- */
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { store } from '../redux/store';
import { setAccessToken } from '../redux/access-slice/slice';
import { refreshUrl } from '../utils/urls';

/* --- Types --- */
type ResData = {
	accessToken: string;
};

/* --- Axios Private --- */
const axiosPrivate = axios.create({ withCredentials: true });

axiosPrivate.interceptors.request.use(config => {
	const accessToken = store.getState().accessSlice.accessToken;

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosPrivate.interceptors.response.use(
	res => res,
	async (err: AxiosError) => {
		const originalReguest = err.config as AxiosRequestConfig & { _retry?: boolean };

		if (err.response?.status === 401 && !originalReguest._retry) {
			originalReguest._retry = true;

			try {
				const res = await axios.get<ResData>(refreshUrl, { withCredentials: true });
				store.dispatch(setAccessToken(res.data?.accessToken));

				originalReguest.headers = {
					...originalReguest.headers,
					Authorization: `Bearer ${res.data?.accessToken}`,
				};

				return axiosPrivate.request(originalReguest);
			} catch (err) {
				return Promise.reject(err);
			}
		}

		return Promise.reject(err);
	}
);

export default axiosPrivate;
