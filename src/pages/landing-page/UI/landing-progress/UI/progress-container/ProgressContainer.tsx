/* --- Imports --- */
import { ProgressBlock, type Props as ProgreeProps } from '../progress-block/ProgressBlock';
import { FaHtml5, FaReact, FaNodeJs, FaJsSquare, FaCss3Alt } from 'react-icons/fa';
import { cn } from '../../../../../../utils/cn';

/* --- Progress Data --- */
const progressData: ProgreeProps[] = [
	{
		titleText: 'React',
		Icon: FaReact,
		classNames: {
			icon: 'text-[var(--react-blue)]',
			title: 'text-[var(--react-blue)]',
			underline: 'bg-[var(--react-blue)]',
		},
		progressClasses: { progress: 'bg-[var(--react-blue)]', text: 'text-[var(--react-blue)]' },
		precent: 65,
		blurColor: 'reactBlue',
	},
	{
		titleText: 'HTML',
		Icon: FaHtml5,
		classNames: {
			icon: 'text-[var(--html-orange)]',
			title: 'text-[var(--html-orange)]',
			underline: 'bg-[var(--html-orange)]',
		},
		progressClasses: { progress: 'bg-[var(--html-orange)]', text: 'text-[var(--html-orange)]' },
		precent: 85,
		blurColor: 'htmlOrange',
	},
	{
		titleText: 'CSS',
		Icon: FaCss3Alt,
		classNames: {
			icon: 'text-[var(--css-blue)]',
			title: 'text-[var(--css-blue)]',
			underline: 'bg-[var(--css-blue)]',
		},
		progressClasses: { progress: 'bg-[var(--css-blue)]', text: 'text-[var(--css-blue)]' },
		precent: 80,
		blurColor: 'cssBlue',
	},
	{
		titleText: 'JavaScript',
		Icon: FaJsSquare,
		classNames: {
			icon: 'text-[var(--js-yellow)]',
			title: 'text-[var(--js-yellow)]',
			underline: 'bg-[var(--js-yellow)]',
		},
		progressClasses: { progress: 'bg-[var(--js-yellow)]', text: 'text-[var(--js-yellow)]' },
		precent: 70,
		blurColor: 'jsYellow',
	},
	{
		titleText: 'NodeJS',
		Icon: FaNodeJs,
		classNames: {
			icon: 'text-[var(--node-green)]',
			title: 'text-[var(--node-green)]',
			underline: 'bg-[var(--node-green)]',
		},
		progressClasses: { progress: 'bg-[var(--node-green)]', text: 'text-[var(--node-green)]' },
		precent: 15,
		blurColor: 'nodeGreen',
	},
];

/* --- ProgressContainer Component --- */
// This component represents a container for progress bars in the landing page.
export const ProgressContainer = () => {
	return (
		<div className={cn('flex flex-col w-full', 'mt-6', 'gap-8')}>
			{progressData.map(({ titleText, Icon, classNames, precent, progressClasses, blurColor }) => {
				return (
					<ProgressBlock
						key={titleText}
						titleText={titleText}
						Icon={Icon}
						classNames={classNames}
						precent={precent}
						progressClasses={progressClasses}
						blurColor={blurColor}
					/>
				);
			})}
		</div>
	);
};
