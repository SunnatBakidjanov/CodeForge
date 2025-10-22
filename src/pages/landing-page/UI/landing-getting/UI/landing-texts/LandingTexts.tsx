/* --- Imports --- */
import { TextSlider } from '../../../../../../UI/text-slider/TextSlider';
import { cn } from '../../../../../../utils/cn';

/* --- LandingTexts Component --- */
// This component displays a slider with various landing page texts.
export const LandingTexts = ({ texts }: { texts: string[] }) => {
	return <TextSlider texts={texts} className={cn('text-center font-medium italic text-[var(--white)]', 'text-xl', 'mt-2')} />;
};
