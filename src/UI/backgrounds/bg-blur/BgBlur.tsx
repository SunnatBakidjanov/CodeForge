/* --- Imports --- */
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

/* --- Cva Styles --- */
const cvaStyle = cva('', {
	variants: {
		color: {
			hotOrange: 'bg-[var(--hot-orange)]',
			reactBlue: 'bg-[var(--react-blue)]',
			htmlOrange: 'bg-[var(--html-orange)]',
			jsYellow: 'bg-[var(--js-yellow)]',
			nodeGreen: 'bg-[var(--node-green)]',
			cssBlue: 'bg-[var(--css-blue)]',
			tsBlue: 'bg-[var(--ts-blue)]',
		},
	},

	defaultVariants: {
		color: 'hotOrange',
	},
});

/* --- Types --- */
export type Props = {
	blurColor?: VariantProps<typeof cvaStyle>['color'];
	className?: string;
};

/* --- BgBlur Component --- */
// This component represents a blurred background effect.
export const BgBlur = ({ blurColor, className }: Props) => {
	return (
		<div
			className={cn('absolute inset-0 top-1/2 left-1/2 -translate-1/2 w-full h-full blur-3xl -z-1', cvaStyle({ color: blurColor }), className)}
		/>
	);
};
