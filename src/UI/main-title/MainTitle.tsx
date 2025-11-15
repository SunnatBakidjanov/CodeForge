/* --- Imports --- */
import { cn } from '../../utils/cn';
import { TextGradient, type Props as TextGradientProps } from '../gradients/text-gradient/TextGradietn';
import { ImageComp, type Props as ImageCompProps } from '../image-comp/ImageComp';
import сrossedHammers from '/imgs/webp/crossed-hammers.webp';
import { useNavigate } from 'react-router';

/* --- Types --- */
type Props = {
	href?: string;
	textGradient?: TextGradientProps<React.ElementType>;
	imgComp?: Omit<ImageCompProps, 'imgAttr' | 'className'>;
	imgAttr?: ImageCompProps['imgAttr'];
	isHasImg?: boolean;
	classNames?: { [key in 'img' | 'imgContainer' | 'textGradient']?: string };
	children?: React.ReactNode;
};

/* --- MainTitle Component --- */
// This component represents the main title of the application.
export const MainTitle = ({ href, textGradient, imgComp, isHasImg = true, imgAttr, classNames, children }: Props) => {
	const navigate = useNavigate();

	return (
		<TextGradient
			onClick={() => {
				if (href) navigate(href);
			}}
			className={cn('flex items-center justify-center group relative cursor-pointer', classNames?.textGradient)}
			{...textGradient}
		>
			<span className="text-[var(--white)]">Code</span>Forge
			{isHasImg && (
				<ImageComp
					imgAttr={{
						src: сrossedHammers,
						className: cn(
							'transition-all duration-300 ease-out drop-shadow-[0_0_0px_var(--hot-orange)] group-focus-visible:drop-shadow-[0_0_3px_var(--hot-orange)] group-hover:drop-shadow-[0_0_3px_var(--hot-orange)]',
							classNames?.img
						),
						...imgAttr,
					}}
					className={classNames?.imgContainer}
					{...imgComp}
				/>
			)}
			{children}
		</TextGradient>
	);
};
