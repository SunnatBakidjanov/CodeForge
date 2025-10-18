/* --- Imports --- */
import { TextSlider } from '../../../../../../UI/text-slider/TextSlider';
import { cn } from '../../../../../../utils/cn';

/* --- Texts Array --- */
const texts = [
	'"Craft your next great idea"',
	'"Shape code like molten metal"',
	'"From sparks to structure"',
	'"Every line forged with purpose"',
	'"Build. Refine. Create. Repeat"',
];

/* --- LandingTexts Component --- */
// This component displays a slider with various landing page texts.
export const LandingTexts = () => {
	return <TextSlider texts={texts} className={cn('text-center font-medium italic text-[var(--white)]', 'text-xl', 'mt-2')} />;
};
