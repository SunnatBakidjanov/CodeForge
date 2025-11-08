/* --- Imports --- */
import { TextGradient, type Props as TextGradientProps } from '../gradients/text-gradient/TextGradietn';
import { ImageComp, type Props as ImageCompProps } from '../image-comp/ImageComp';
import сrossedHammers from '/imgs/webp/crossed-hammers.webp';
import { useNavigate } from 'react-router';

/* --- Types --- */
type Props = {
	href?: string;
	textGradient?: TextGradientProps<React.ElementType>;
	imgComp?: Omit<ImageCompProps, 'imgAttr'>;
	imgAttr?: ImageCompProps['imgAttr'];
	isHasImg?: boolean;
	children?: React.ReactNode;
};

/* --- MainTitle Component --- */
// This component represents the main title of the application.
export const MainTitle = ({ href, textGradient, imgComp, isHasImg = true, imgAttr, children }: Props) => {
	const navigate = useNavigate();

	return (
		<TextGradient
			onClick={() => {
				if (href) navigate(href);
			}}
			{...textGradient}
		>
			<span className="text-[var(--white)]">Code</span>Forge
			{isHasImg && <ImageComp imgAttr={{ src: сrossedHammers, ...imgAttr }} {...imgComp} />}
			{children}
		</TextGradient>
	);
};
