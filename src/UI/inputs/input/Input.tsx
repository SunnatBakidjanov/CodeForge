/* --- Imports --- */
import { cn } from '../../../utils/cn';

/* --- Types --- */
export type Props = {
	className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'>;

/* --- Input Component --- */
// This component represents an input element for the application.
export const Input = ({ className, ...rest }: Props) => {
	return (
		<input
			{...rest}
			className={cn(
				'outline-0 border-1 border-white/5 rounded-2xl bg-transparent text-[var(--white)] w-full appearance-none leading-0.5',
				'transition-all duration-300 ease-out',
				'shadow-sm',
				'placeholder:font-bold placeholder:text-sm',
				'focus:shadow-orange-500 focus:border-orange-500/50',
				'px-4',
				'py-2.5',
				'text-base',
				className
			)}
		/>
	);
};
