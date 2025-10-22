/* --- Imports --- */
import { cn } from '../../../utils/cn';

/* --- Types --- */
type Props<T extends React.ElementType> = {
	ComponentType?: T;
	className?: string;
	children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'className' | 'children'>;

/* --- TextGradient Component --- */
// This component represents a text gradient for the application.
export const TextGradient = <T extends React.ElementType>({ ComponentType, children, className, ...rest }: Props<T>) => {
	const Component = ComponentType || 'span';

	return (
		<Component
			className={cn('bg-gradient-to-br from-yellow-500 via-orange-400 to-orange-600 bg-clip-text text-transparent', className)}
			{...rest}
		>
			{children}
		</Component>
	);
};
