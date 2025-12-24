/* --- Imports --- */
import { cn } from '@/utils/cn';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { Button } from '@/UI/btns/button/Button';
import { DottedLoader } from '@/UI/loaders/dotted-loader/DottedLoader';
import type { TimerState } from '@/hooks/useTimer';
import { useCountdownTimer } from '@/hooks/useCountdownTimer ';
import { useEffect } from 'react';
import type { ResType } from '@/hooks/useApiForm';

/* --- Type --- */
type Props = {
	isLoading: boolean;
	timerState: TimerState;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

/* --- LandingSubmitBtn Component --- */
export const LandingSubmitBtn = ({ isLoading, timerState, setResMessage }: Props) => {
	const { countdown, startTimer, getStorage } = useCountdownTimer({
		storageItem: timerState?.localItem ?? '',
		isShowTimer: timerState?.isShowTimer,
		resType: timerState?.resType,
	});

	useEffect(() => {
		if (!timerState?.triggerId) return;

		startTimer(timerState.timeOut);
	}, [timerState?.triggerId, timerState?.timeOut, startTimer]);

	const handleClick = () => {
		if (getStorage()?.resType === 'IP_BLOCKED') {
			setResMessage({ type: 'error', message: 'Forge protection triggered. Try again later.' });
			return;
		}

		if (countdown > 0) {
			setResMessage({ type: 'waiting', message: 'Too many strikes. Cooldown active.' });
		}
	};

	return (
		<BgGradient
			ComponentType="div"
			className="overflow-hidden rounded-3xl shadow-sm shadow-white hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-all duration-300 ease-out"
		>
			<Button
				isBlink={true}
				disabled={isLoading}
				type={countdown > 0 ? 'button' : 'submit'}
				onClick={handleClick}
				classNames={{
					button: cn('text-xl lg:text-2xl tracking-[0.5px]', 'w-full text-white', 'h-9 md:h-10'),
					blik: cn('h-[300%]', 'w-[10%] lg:w-[7%]', 'duration-700 md:duration-900 lg:duration-1100'),
				}}
			>
				{isLoading ? (
					<DottedLoader className="w-3 h-3 lg:w-3.5 lg:h-3.5" offset="24px" />
				) : countdown > 0 && getStorage()?.isShowTimer ? (
					`Cooldown ${countdown}s`
				) : (
					'Send message'
				)}
			</Button>
		</BgGradient>
	);
};
