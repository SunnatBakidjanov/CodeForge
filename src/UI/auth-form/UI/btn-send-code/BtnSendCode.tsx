/* --- Imports --- */
import { DottedLoader } from '@/UI/loaders/dotted-loader/DottedLoader';
import { cn } from '@/utils/cn';
import type { ResType } from '@/hooks/useApiForm';
import { useSendCode } from '../../hooks/useSendCode';

/* --- Types --- */
type Props = {
	isLoading: boolean;
	verifyCode: string;
	getEmail: () => string | undefined;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

/* --- BtnTimer Component --- */
export const BtnSendCode = ({ isLoading, verifyCode, getEmail, setResMessage }: Props) => {
	const { isSend, handleSendCode, countdown } = useSendCode({ setResMessage, getEmail });

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
			{isSend ? <DottedLoader className="w-3 h-3" offset={'18px'} /> : countdown > 0 ? `Cooldown ${countdown}s` : verifyCode}
		</button>
	);
};
