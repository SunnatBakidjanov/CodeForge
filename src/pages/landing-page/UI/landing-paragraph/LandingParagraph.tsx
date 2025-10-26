import { cn } from '../../../../utils/cn';

type Props = {
	paragraphs: string[] | string;
	classNames?: { [key in 'paragraph' | 'container']?: string };
};

export const LandingParagraph = ({ paragraphs, classNames }: Props) => {
	const list = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

	return (
		<div
			className={cn(
				'text-[var(--white)] italic text-center mx-auto relative overflow-hidden rounded-2xl border-t-1 border-b-1 border-white/20',
				'mt-2 lg:mt-4 xl:mt-6',
				'px-2 sm:px-4',
				'pt-5',
				'pb-4 lg:pb-5',
				'space-y-4 lg:space-y-5',
				'lg:text-lg',
				'max-w-[800px] lg:max-w-[900px] xl:max-w-[1100px]',
				classNames?.container
			)}
		>
			{list.map((p, i) => (
				<p className={classNames?.paragraph} key={i}>
					{p}
				</p>
			))}
		</div>
	);
};
