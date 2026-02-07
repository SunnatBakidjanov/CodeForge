/* --- Imports --- */
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { cn } from '@/utils/cn';

/* --- Types --- */
type Props = {
	children: React.ReactNode;
	className?: string;
};

/* --- BtnGradient Component --- */
export const BtnGradient = ({ children, className }: Props) => {
	return (
		<BgGradient
			ComponentType="div"
			className={cn(
				'rounded-3xl shadow-white shadow-sm hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-shadow duration-300 ease-out',
				className
			)}
		>
			{children}
		</BgGradient>
	);
};
