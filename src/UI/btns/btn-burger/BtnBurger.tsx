/* --- Imports --- */
import { cn } from '../../../utils/cn';
import { BgGradient } from '../../gradients/bg-gradient/BgGradient';

type Props = {
	classNames?: { [key in 'btn' | 'container' | 'lines']?: string };
	btnProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;
};

/* --- BtnBurger Component --- */
export const BtnBurger = ({ classNames, btnProps }: Props) => {
	return (
		<button
			type="button"
			className={cn(
				'rounded-3xl p-2 shadow-sm hover:shadow-white focus-visible:shadow-white transition-shadow duration-300 ease-out',
				classNames?.btn
			)}
			{...btnProps}
		>
			<span className={cn('flex flex-col justify-center', classNames?.container)}>
				<BgGradient ComponentType={'span'} className={cn('w-full', classNames?.lines)} />
				<BgGradient ComponentType={'span'} className={cn('w-full', classNames?.lines)} />
				<BgGradient ComponentType={'span'} className={cn('w-full', classNames?.lines)} />
			</span>
		</button>
	);
};
