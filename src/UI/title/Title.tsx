/* --- Imports --- */
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import type React from 'react';

/* --- Cva Styles --- */
const cvaStyles = cva('font-bold', {
	variants: {
		styles: {
			h1: '',
			h2: 'text-3xl',
			h3: 'text-2xl',
		},
	},
});

/* --- Types --- */
export type Props<T extends React.ElementType> = {
	TitleType: T;
	children?: string | React.ReactNode;
	defaultStyles?: VariantProps<typeof cvaStyles>['styles'];
	className?: string;
} & React.ComponentPropsWithoutRef<T>;

/* --- Title Component --- */
// This component represents a title element for the application.
export const Title = ({ TitleType, children, defaultStyles, className, ...rest }: Props<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>) => {
	return (
		<TitleType className={cn(cvaStyles({ styles: defaultStyles }), className)} {...rest}>
			{children}
		</TitleType>
	);
};
