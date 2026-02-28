// Импорты
import { cn } from '@/utils/cn';

// Типы
type StyleVariants = 'inner';
type Props = { styleVariatns?: StyleVariants; className?: string } & Omit<React.ComponentPropsWithoutRef<'section'>, 'className'>;

// Компонент секции
export const Section = ({ styleVariatns, className, ...rest }: Props) => {
	return (
		<section
			className={cn(
				'w-full relative',
				{
					'px-4 md:px-6': styleVariatns === 'inner',
				},
				className
			)}
			{...rest}
		></section>
	);
};
