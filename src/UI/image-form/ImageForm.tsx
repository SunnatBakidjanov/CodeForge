/** --- Imports --- */
import { cn } from '../../utils/cn';
import { ImageComp } from '../image-comp/ImageComp';

/** --- Types --- */
type Props = {
	src: string;
	classNames?: { [key in 'image' | 'container']?: string };
};

/** --- ImageForm Component --- */
// This component represents an image form.
export const ImageForm = ({ src, classNames }: Props) => {
	return (
		<ImageComp
			imgAttr={{ src: src, className: cn('relative bottom-[1px]', classNames?.image) }}
			className={cn('w-7 h-7 lg:w-8 lg:h-8 overflow-hidden', classNames?.container)}
		/>
	);
};
