/* --- Import --- */
import { TextGradient } from '../../../../UI/gradients/text-gradient/TextGradietn';
import { Title } from '../../../../UI/title/Title';
import { BgBlur } from '../../../../UI/backgrounds/bg-blur/BgBlur';

/* --- LandingTitle Component --- */
// This component represents the title section of the landing page.
export const LandingTitle = ({ text }: { text: string }) => {
	return (
		<TextGradient ComponentType={'div'} className="relative">
			<Title TitleType="h2" defaultStyles={'h2'} className="text-center leading-[110%] pb-1" children={text} />
			<BgBlur className="w-1/3 h-1/3" />
		</TextGradient>
	);
};
