/* --- Imports --- */
import { useNavigate } from 'react-router';
import { TextGradient } from '../../gradients/text-gradient/TextGradietn';
import { BgGradient } from '../../gradients/bg-gradient/BgGradient';
import { cn } from '../../../utils/cn';

/* --- Types --- */
type Props = {
	text?: string;
	href?: string;
	classNames?: { [key in 'textGradient' | 'bgGradient']?: string };
};

/* --- BtnLink Component --- */
// This component represents a button link for the application.
export const BtnLink = ({ text, href, classNames }: Props) => {
	const navigate = useNavigate();

	return (
		<TextGradient
			ComponentType={'button'}
			className={cn('font-bold cursor-pointer group relative', classNames?.textGradient)}
			onClick={() => {
				if (href) navigate(href);
			}}
		>
			{text}
			<BgGradient
				ComponentType={'span'}
				className={cn(
					'absolute left-[50%] -translate-x-[50%] block w-0 group-hover:w-full h-[1px] transition-all duration-300 ease-out group-focus-visible:w-full',
					classNames?.bgGradient
				)}
			/>
		</TextGradient>
	);
};
