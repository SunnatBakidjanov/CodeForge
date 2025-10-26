/* --- Imports --- */
import React, { useState } from 'react';
import { InfinitySpinLoader, type Props as LoaderProps } from '../loaders/infinity-loader/InfinitySpinLoader';
import { cn } from '../../utils/cn';

/* --- Types --- */
export type Props = {
	imgAttr?: React.ImgHTMLAttributes<HTMLImageElement>;
	loader?: LoaderProps;
	isHasLoader?: boolean;
	className?: string;
};

/* --- ImageComp Component --- */
// This component represents an image with a loading spinner.
export const ImageComp = ({ className, loader, imgAttr, isHasLoader = true }: Props) => {
	const [isLoaded, setLoaded] = useState(false);

	return (
		<div className={cn('relative w-full h-full flex items-center justify-center', className)}>
			{!isLoaded && isHasLoader && (
				<div className="absolute inset-0 flex items-center justify-center">
					<InfinitySpinLoader {...loader} />
				</div>
			)}

			<img
				{...imgAttr}
				onLoad={() => setLoaded(true)}
				className={cn('transition-all duration-700 ease-out transform', isLoaded ? 'opacity-100' : 'opacity-0', imgAttr?.className)}
			/>
		</div>
	);
};
