/* --- Imports --- */
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { refreshUrl } from '../utils/urls';

/* --- Axios Private --- */
const axiosPrivate = axios.create({ withCredentials: true });

axiosPrivate.interceptors.response.use(
	res => res,
	async (err: AxiosError<{ message: string }>) => {
		const originalReguest = err.config as AxiosRequestConfig & { _retry?: boolean };

		if (err.response?.status === 401 && err.response?.data?.message === 'Access token expired' && !originalReguest._retry) {
			originalReguest._retry = true;

			try {
				await axios.get(refreshUrl, { withCredentials: true });

				return axiosPrivate.request(originalReguest);
			} catch (err) {
				return Promise.reject(err);
			}
		}

		return Promise.reject(err);
	}
);

export default axiosPrivate;
