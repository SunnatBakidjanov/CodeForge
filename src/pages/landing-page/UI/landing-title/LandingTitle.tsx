/* --- Import --- */
import { TextGradient } from '@/UI/gradients/text-gradient/TextGradietn';
import { Title } from '@/UI/title/Title';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';
import { cn } from '@/utils/cn';

/* --- Types --- */
type Props = {
	text: string;
	descriptionText?: string;
	children?: React.ReactNode;
	isBorderBottom?: boolean;
	isHasBlur?: boolean;
	classNames?: { [key in 'textGradient' | 'title' | 'blur' | 'textDescription']?: string };
};

/* --- LandingTitle Component --- */
// This component represents the title section of the landing page.
export const LandingTitle = ({ text, children, descriptionText, isBorderBottom, isHasBlur = true, classNames }: Props) => {
	return (
		<TextGradient
			ComponentType={'div'}
			className={cn(
				'relative flex flex-col items-center justify-center text-center',
				isBorderBottom && 'border-b-1 border-white/20 pb-3',
				classNames?.textGradient
			)}
		>
			<Title
				TitleType="h2"
				defaultStyles={'h2'}
				className={cn(
					'flex items-center justify-center w-fit',
					'flex-col',
					'gap-2',
					'text-3xl md:text-4xl lg:text-[42px] xl:text-5xl',
					'xl:pb-1',
					classNames?.title
				)}
				children={text}
			/>
			{descriptionText && (
				<p className={cn('text-[var(--white)] italic', 'mt-2 lg:mt-2.5', 'lg:text-lg xl:text-xl', classNames?.textDescription)}>
					{descriptionText}
				</p>
			)}
			{children}
			{isHasBlur && <BgBlur className={cn('w-1/2 h-1/4 md:h-1/6 md:w-1/2 md:blur-[100px]', classNames?.blur)} />}
		</TextGradient>
	);
};
