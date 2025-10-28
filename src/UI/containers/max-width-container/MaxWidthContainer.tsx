/* --- Imports --- */
import { cn } from '../../../utils/cn';

/* --- Types --- */
type Props = {
	children: React.ReactNode;
	width?: number | string;
	className?: string;
};

/* --- MaxWidthContainer Component --- */
// This component represents a container with a maximum width.
export const MaxWidthContainer = ({ children, className, width = 1440 }: Props) => {
	return (
		<div style={{ maxWidth: `${width}px` }} className={cn('mx-auto px-4 sm:px-6', className)}>
			{children}
		</div>
	);
};
