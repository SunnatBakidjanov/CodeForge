/* --- Imports --- */
import { toast } from 'react-toastify';
import { CustomToast } from '@/UI/toast/custom-toast/CustomToast';

/* --- NotifyConfig --- */
export const NotifyConfig = () => {
	const notifyState = {
		success: (message: string) => toast(<CustomToast message={message} type="success" />),
		error: (message: string) => toast(<CustomToast message={message} type="error" />),
		info: (message: string) => toast(<CustomToast message={message} type="info" />),
		warn: (message: string) => toast(<CustomToast message={message} type="warn" />),
		default: (message: string) => toast(<CustomToast message={message} type="default" />),
	};

	return { notifyState };
};
