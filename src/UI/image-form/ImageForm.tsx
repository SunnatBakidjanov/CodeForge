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
			imgAttr={{ src: src, className: cn('max-w-7 sm:max-w-8 lg:max-w-9 h-auto object-cover', classNames?.image) }}
			className={cn('w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 relative bottom-[1px]', classNames?.container)}
		/>
	);
};
