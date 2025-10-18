/* --- Imports --- */
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/* --- Cva Styles --- */
const cvaStyles = cva('font-bold', {
	variants: {
		styles: {
			h1: '',
			h2: 'text-3xl',
			h3: '',
			h4: '',
			h5: '',
			h6: '',
		},
	},
});

/* --- Types --- */
type Props<T extends React.ElementType> = {
	TitleType: T;
	children?: string | React.ReactNode;
	defaultStyles?: VariantProps<typeof cvaStyles>['styles'];
	className?: string;
};

/* --- Title Component --- */
// This component represents a title element for the application.
export const Title = ({ TitleType, children, defaultStyles, className }: Props<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>) => {
	return <TitleType className={cn(cvaStyles({ styles: defaultStyles }), className)}>{children}</TitleType>;
};
