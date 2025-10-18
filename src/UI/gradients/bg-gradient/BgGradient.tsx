/* --- Types --- */
type Props<T extends React.ElementType> = {
	Component: T;
	children?: string | React.ReactNode;
};

/* --- BgGradient Component --- */
// This component represents the main gradient for the application.
export const BgGradient = ({ Component, children }: Props<React.ElementType>) => {
	return <Component className="">{children}</Component>;
};
