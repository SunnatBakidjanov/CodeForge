/* --- Imports --- */
import { TextSlider } from '@/UI/text-slider/TextSlider';
import { cn } from '@/utils/cn';

/* --- LandingTexts Component --- */
// This component displays a slider with various landing page texts.
export const LandingTexts = ({ texts }: { texts: string[] }) => {
	return (
		<TextSlider
			texts={texts}
			className={cn('text-center font-medium italic text-[var(--white)]', 'text-xl md:text-2xl lg:text-[26px] xl:text-3xl', 'mt-1 md:mt-1.5')}
		/>
	);
};
