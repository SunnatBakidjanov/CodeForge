/* --- Imports --- */
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import { apiUrl, refreshUrl } from '../utils/urls';

/* --- Types --- */
type QueueItem = {
	resolve: (value?: unknown) => void;
	reject: (reason?: unknown) => void;
};

/* --- Axios Private --- */
const axiosPrivate = axios.create({ withCredentials: true });

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
	failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
	failedQueue = [];
};

axiosPrivate.interceptors.response.use(
	res => res,
	async (err: AxiosError<{ message: string }>) => {
		const originalReguest = err.config as AxiosRequestConfig & { _retry?: boolean };

		if (err.response?.status === 401 && err.response?.data?.message === 'INVALID_ACCESS_TOKEN') {
			if (!originalReguest._retry) {
				if (isRefreshing) {
					return new Promise((resolve, reject) => {
						failedQueue.push({ resolve, reject });
					}).then(() => axiosPrivate.request(originalReguest));
				}

				originalReguest._retry = true;

				try {
					await axios.get(`${apiUrl}${refreshUrl}`, { withCredentials: true });

					processQueue(null);

					return axiosPrivate.request(originalReguest);
				} catch (err) {
					processQueue(err, null);
					return Promise.reject(err);
				} finally {
					isRefreshing = false;
				}
			}
		}

		return Promise.reject(err);
	}
);

export default axiosPrivate;
