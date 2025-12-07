/* --- Imports --- */
import { BgBlur, type Props as BlurProps } from '@/UI/backgrounds/bg-blur/BgBlur';
import { Title } from '@/UI/title/Title';
import { cn } from '@/utils/cn';
import { ProgressBar, type Props as PropgressProps } from '../progress-bar/ProgressBar';

/* --- Types --- */
export type Props = {
	titleText: string;
	Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	classNames?: { [key in 'icon' | 'title' | 'progress' | 'underline']?: string };
	progressClasses?: PropgressProps['classNames'];
	precent: number;
	blurColor: BlurProps['blurColor'];
};

/* --- ProgressBlock Component --- */
// This component represents a progress block in the landing page.
export const ProgressBlock = ({ titleText, Icon, classNames, precent, progressClasses, blurColor }: Props) => {
	return (
		<div className={'w-full relative'}>
			<div className="flex items-center justify-center gap-2">
				{Icon && <Icon className={cn('text-2xl', classNames?.icon)} />}
				<Title TitleType={'h3'} defaultStyles={'h3'} children={titleText} className={classNames?.title} />
			</div>

			<ProgressBar currentPercent={precent} classNames={progressClasses} />

			<span className={cn('block w-full h-[1px] mt-5 opacity-30', classNames?.underline)}></span>

			<BgBlur className="w-1/2 h-1/3" blurColor={blurColor} />
		</div>
	);
};
