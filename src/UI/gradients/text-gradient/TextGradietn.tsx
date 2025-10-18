/* --- Imports --- */
import { cn } from '../../../utils/cn';

/* --- Types --- */
type Props<T extends React.ElementType> = {
	ComponentType: T;
	children?: string | React.ReactNode;
	className?: string;
};

/* --- TextGradient Component --- */
// This component represents a text gradient for the application.
export const TextGradient = ({ ComponentType, children, className }: Props<React.ElementType>) => {
	return (
		<ComponentType className={cn('bg-gradient-to-br from-yellow-500 via-orange-400 to-orange-600 bg-clip-text text-transparent', className)}>
			{children}
		</ComponentType>
	);
};
