/* --- Imports --- */
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { Button } from '@/UI/btns/button/Button';
import { DottedLoader } from '@/UI/loaders/dotted-loader/DottedLoader';
import { cn } from '@/utils/cn';

/* --- Types --- */
type Props = {
	isLoading: boolean;
	btnText: string;
	countdown: number;
};

/* --- BtnSubmit Component --- */
export const BtnSubmit = ({ isLoading, btnText, countdown }: Props) => {
	return (
		<BgGradient
			ComponentType="div"
			className="overflow-hidden rounded-3xl shadow-sm shadow-white hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-all duration-300 ease-out"
		>
			<Button
				isBlink={true}
				classNames={{
					button: cn('text-lg sm:text-xl', 'w-full text-white tracking-[0.5px]', 'h-9 sm:h-10'),
					blik: cn('h-[300%]', 'w-[12%] sm:w-[11%]', 'duration-800 sm:duration-900'),
				}}
				type={countdown > 0 ? 'button' : 'submit'}
				disabled={isLoading}
			>
				{isLoading ? (
					<DottedLoader className="w-3 h-3 lg:w-3.5 lg:h-3.5" offset={'24px'} />
				) : countdown > 0 ? (
					`Cooldown ${countdown}s`
				) : (
					btnText
				)}
			</Button>
		</BgGradient>
	);
};
