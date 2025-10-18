/* --- Imports --- */
import styles from './index.module.css';
import { cn } from '../../../utils/cn';

/* --- Types --- */
export type Props = {
	size?: number;
	color1?: string;
	color2?: string;
};

/* --- InfinitySpinLoader Component --- */
// This component represents an infinity loader for the application.
export const InfinitySpinLoader = ({ size = 48, color1 = 'var(--white)', color2 = 'var(--hot-orange)' }: Props) => {
	return (
		<div
			className="relative"
			style={{
				width: size,
				height: size,
				transform: 'rotateZ(45deg)',
				perspective: '1000px',
			}}
		>
			<div
				className={cn(styles.loaderAnimation, 'absolute top-0 left-0 w-full h-full rounded-full')}
				style={{
					transform: 'rotateX(80deg)',
					animationDuration: '2s',
					color: color1,
				}}
			/>
			<div
				className={cn(styles.loaderAnimation, 'absolute top-0 left-0 w-full h-full rounded-full')}
				style={{
					transform: 'rotateY(80deg)',
					animationDuration: '1.8s',
					color: color2,
				}}
			/>
		</div>
	);
};
