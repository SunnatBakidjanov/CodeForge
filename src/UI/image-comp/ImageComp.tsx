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
	children?: React.ReactNode;
};

/* --- ImageComp Component --- */
// This component represents an image with a loading spinner.
export const ImageComp = ({ className, loader, imgAttr, children, isHasLoader = true }: Props) => {
	const [isLoaded, setLoaded] = useState(false);

	return (
		<span className={cn('relative w-full h-full flex items-center justify-center', className)}>
			{!isLoaded && isHasLoader && (
				<span className="absolute inset-0 flex items-center justify-center">
					<InfinitySpinLoader {...loader} />
				</span>
			)}

			<img
				{...imgAttr}
				onLoad={() => setLoaded(true)}
				className={cn('transition-all duration-700 ease-out transform', isLoaded ? 'opacity-100' : 'opacity-0', imgAttr?.className)}
			/>

			{isLoaded && children}
		</span>
	);
};
