/* --- Imports --- */
import { cn } from '../../utils/cn';

type Props = {
	children: React.ReactNode;
	className?: string;
} & React.FormHTMLAttributes<HTMLFormElement>;

/* --- Form Component --- */
// This component represents a form element for the application.
export const Form = ({ children, className, ...rest }: Props) => {
	return (
		<form className={cn('border-2 border-orange-500/50 bg-black/40 relative rounded-3xl max-w-[900px] w-full', className)} {...rest}>
			{children}
		</form>
	);
};
