import { cn } from '@/utils/cn';

/* --- Type --- */
type Props<T extends React.ElementType> = {
	componentType?: T;
	children?: React.ReactNode;
	classNames?: { [key in 'inner' | 'outer']?: string };
} & Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'className'>;

/** --- Tooltip Component --- */
export const Tooltip = <T extends React.ElementType = 'span'>({ componentType, children, classNames, ...rest }: Props<T>) => {
	const Tooltip = componentType || 'span';

	return (
		<Tooltip
			className={cn(
				'cursor-default opacity-0 pointer-events-none group-hover:opacity-100 group-hover:delay-200 group-hover:pointer-events-auto group-hover:duration-300',
				'transition-all ease-out duration-100',
				classNames?.outer
			)}
			{...rest}
		>
			<span
				className={cn(
					'max-w-[300px] overflow-hidden',
					'bg-black/90 rounded-sm shadow-[0_0_3px_white]',
					'text-sm text-(--white)',
					classNames?.inner
				)}
			>
				{children}
			</span>
		</Tooltip>
	);
};
