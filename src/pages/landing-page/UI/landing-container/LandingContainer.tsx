/* --- Imports --- */
import { cn } from '@/utils/cn';

/* --- Types --- */
type Props = {
	children: React.ReactNode;
	className?: string;
};

/* --- LandingContainer Component --- */
// This component represents a container for the landing page.
export const LandingContainer = ({ children, className }: Props) => {
	return <div className={cn('mt-6 md:mt-8 lg:mt-10 pb-10 md:pb-12 lg:pb-14 border-b-1 border-white/20', className)}>{children}</div>;
};
