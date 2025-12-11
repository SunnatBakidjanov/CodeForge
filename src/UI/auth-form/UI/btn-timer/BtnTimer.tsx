/* --- Imports --- */
import axios, { AxiosError } from 'axios';
import { DottedLoader } from '@/UI/loaders/dotted-loader/DottedLoader';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import type { ResType } from '@/hooks/useApiForm';

/* --- Types --- */
type Props = {
	isLoading: boolean;
	verifyCode: string;
	getEmail: () => string | undefined;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

/* --- BtnTimer Component --- */
export const BtnTimer = ({ isLoading, verifyCode, getEmail, setResMessage }: Props) => {
	const [isSend, setIsSend] = useState(false);

	const handleSendCode = async () => {
		setIsSend(true);
		setResMessage({});

		const email = getEmail();
		if (!email) {
			setIsSend(false);
			setResMessage({ type: 'error', message: 'Forge needs an email!' });
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setIsSend(false);
			setResMessage({ type: 'error', message: 'Invalid email pattern!' });
			return;
		}

		try {
			await axios.post(`http://localhost:8000/api/send-code`, {
				email: email,
			});

			setResMessage({ type: 'success', message: 'Code forged and sent!' });
		} catch (error) {
			const err = error as AxiosError;
			console.log(err);
		} finally {
			setIsSend(false);
		}
	};

	return (
		<button
			type="button"
			className={cn(
				'sm:text-lg',
				'w-1/2 text-white rounded-3xl bg-black/40 shadow-xs tracking-[0.5px] cursor-pointer flex items-center justify-center relative top-px',
				'transition-all duration-300 ease-out',
				'h-10 sm:h-11',
				'hover:shadow-white'
			)}
			disabled={isLoading || isSend}
			onClick={handleSendCode}
		>
			{isSend ? <DottedLoader className="w-3 h-3" offset={'18px'} /> : verifyCode}
		</button>
	);
};
