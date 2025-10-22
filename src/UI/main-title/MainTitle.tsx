/* --- Imports --- */
import { TextGradient, type Props as TextGradientProps } from '../gradients/text-gradient/TextGradietn';
import { ImageComp, type Props as ImageCompProps } from '../image-comp/ImageComp';
import сrossedHammers from '/imgs/webp/сrossed-hammers.webp';
import { useNavigate } from 'react-router';

/* --- Types --- */
type Props = {
	href?: string;
	textGradient?: TextGradientProps<React.ElementType>;
	imgComp?: Omit<ImageCompProps, 'imgAttr'>;
};

/* --- MainTitle Component --- */
// This component represents the main title of the application.
export const MainTitle = ({ href, textGradient, imgComp }: Props) => {
	const navigate = useNavigate();

	return (
		<TextGradient onClick={() => navigate(`${href}`)} {...textGradient}>
			CodeForge
			<ImageComp imgAttr={{ src: сrossedHammers }} {...imgComp} />
		</TextGradient>
	);
};
