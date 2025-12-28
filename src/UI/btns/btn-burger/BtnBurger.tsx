/* --- Imports --- */
import { cn } from '../../../utils/cn';
import { BgGradient } from '../../gradients/bg-gradient/BgGradient';

export type Props = {
	classNames?: { [key in 'btn' | 'container' | 'lines']?: string };
	btnProps?: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;
};

/* --- BtnBurger Component --- */
export const BtnBurger = ({ classNames, btnProps }: Props) => {
	return (
		<button
			type="button"
			className={cn(
				'rounded-3xl p-2 hover:bg-white/10 focus-visible:bg-white/10 transition-all duration-300 ease-out cursor-pointer',
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
