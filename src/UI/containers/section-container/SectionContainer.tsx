/* --- Imports --- */
import { cn } from '../../../utils/cn';
import { BgBlur, type Props as BlurProps } from '../../backgrounds/bg-blur/BgBlur';

/* --- Types --- */
type Props = {
	children: React.ReactNode;
	classNames?: { [key in 'section' | 'blur']?: string };
	isBlured?: boolean;
	blurColor?: BlurProps['blurColor'];
};

/* --- SectionContainer Component --- */
// This component represents a section container for the application.
export const SectionContainer = ({ children, classNames, isBlured, blurColor }: Props) => {
	return (
		<section className={cn('w-full relative', classNames?.section)}>
			{children}

			{isBlured && <BgBlur blurColor={blurColor} className={classNames?.blur} />}
		</section>
	);
};
