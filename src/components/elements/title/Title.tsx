// Импорты
import { cn } from '@/utils/cn';

// Типы
type ExtendsType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'; // Ограничение типов только по заголовкам
type StyleVariants = 'sm' | 'md'; // Типы вариантов стилей
type Props<T extends React.ElementType> = { as: T; styleVariatns: StyleVariants; className?: string } & React.ComponentPropsWithoutRef<T>; // Общие пропсы

// Компонент Заголовка
export const Title = ({ as, styleVariatns, className, ...props }: Props<ExtendsType>) => {
	const TitleComp = as || 'h1'; // Тип заголовка, возвращает h1 если тип не указан

	return (
		<TitleComp
			className={cn('playfair-font font-bold', {
				'font-normal text-xl sm:text-2xl lg:text-3xl': styleVariatns === 'sm',
				'tracking-wide text-2xl sm:text-3xl lg:text-4xl': styleVariatns === 'md',
				className,
			})}
			{...props}
		/>
	);
};
