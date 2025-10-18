/* --- Imports --- */
import { cn } from '../../../utils/cn';

/* --- Types --- */
type Props<T extends React.ElementType> = {
	ComponentType: T;
	children?: string | React.ReactNode;
	className?: string;
};

/* --- BgGradient Component --- */
// This component represents the main gradient for the application.
export const BgGradient = ({ ComponentType, children, className }: Props<React.ElementType>) => {
	return <ComponentType className={cn('bg-gradient-to-br from-yellow-500 via-orange-400 to-orange-600', className)}>{children}</ComponentType>;
};
