import { cn } from '@/utils/cn';

type StyleVariants = '2xl' | 'full';
type Props = { styleVariants?: StyleVariants } & Omit<React.ComponentPropsWithoutRef<'div'>, 'className'>;

export const Container = ({ styleVariants, ...rest }: Props) => {
	return (
		<div
			className={cn('w-full mx-auto', {
				'max-w-[1920px]': styleVariants === '2xl',
			})}
			{...rest}
		></div>
	);
};
