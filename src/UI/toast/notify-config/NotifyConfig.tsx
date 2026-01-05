import { toast } from 'react-toastify';
import { CustomToast } from '@/UI/toast/custom-toast/CustomToast';

export const NotifyConfig = () => {
	const notifyState = {
		success: (message: string) => toast(<CustomToast message={message} type="success" />),
	};

	return { notifyState };
};
