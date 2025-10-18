/* --- Imports --- */
import { cn } from '../../../utils/cn';

/* --- MaxWidthContainer Component --- */
// This component represents a container with a maximum width.
export const MaxWidthContainer = ({ children, className, width = 1440 }: { children: React.ReactNode; width?: number; className?: string }) => {
	return (
		<div style={{ maxWidth: `${width}px` }} className={cn('mx-auto px-4 sm:px-6', className)}>
			{children}
		</div>
	);
};
