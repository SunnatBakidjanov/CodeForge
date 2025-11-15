/* --- Imports --- */
import { cn } from '../../../utils/cn';

/* --- Types --- */
type Props = {
	isBlink?: boolean;
	isBlur?: boolean;
	classNames?: { [key in 'button' | 'blik']?: string };
	children?: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

/* --- Button Component --- */
// This component represents a button element for the application.
export const Button = ({ isBlink, classNames, children, ...rest }: Props) => {
	return (
		<button className={cn('relative flex items-center justify-center group cursor-pointer overflow-hidden', classNames?.button)} {...rest}>
			{isBlink && (
				<span
					className={cn(
						'absolute z-[1] w-[20%] h-[220%] bg-[var(--white)] opacity-60 rotate-[40deg] pointer-events-none',
						'transition-all duration-600 ease-in-out',
						'-left-[40%] group-hover:left-[120%]',
						classNames?.blik
					)}
				/>
			)}
			<span className="relative z-[2]">{children}</span>
		</button>
	);
};
