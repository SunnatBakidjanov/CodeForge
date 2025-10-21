/* --- Imports --- */
import { cn } from '../../../utils/cn';
import styles from './index.module.css';

/* --- Types --- */
type Props = {
	offset?: string;
	className?: string;
};

/* --- DottedLoader Component --- */
// This component represents a dotted loader for the application.
export const DottedLoader = ({ className, offset = '20px' }: Props) => {
	return (
		<div className={cn(styles.loader, 'w-3.5 h-3.5', className)} style={{ '--dotted-loader-shadow-offset': offset } as React.CSSProperties}></div>
	);
};
