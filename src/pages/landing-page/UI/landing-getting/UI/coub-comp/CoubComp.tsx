/** --- Imports --- */
import { ImageComp } from '@/UI/image-comp/ImageComp';
import { cn } from '@/utils/cn';
import hammerAndAnvilImg from '/imgs/webp/hammer-and-anvil.webp';
import styles from './index.module.css';
import { BgBlur } from '@/UI/backgrounds/bg-blur/BgBlur';

/* --- Side Component --- */
// This component represents a side of the coub.
const Side = ({ className, isImg, isBlur }: { className?: string; isImg?: boolean; isBlur?: boolean }) => {
	return (
		<div
			className={cn(
				'[transform-style:preserve-3d] flex items-center justify-center absolute shadow-sm shadow-white backface-hidden bg-black/30',
				'h-40',
				className
			)}
		>
			{isImg && <ImageComp imgAttr={{ src: hammerAndAnvilImg, className: 'max-w-36 h-auto object-cover' }} />}
			{isBlur && <BgBlur className="bg-white h-1/2 blur-[34px]" />}
		</div>
	);
};

/* --- CoubComp Component --- */
// This component represents the coub on the landing page.
export const CoubComp = () => {
	return (
		<div
			className={cn(
				'perspective-midrange flex items-center justify-center relative w-fit',
				'h-58 md:h-62 lg:h-68',
				'pb-10 md:pb-12',
				'mt-8 md:mt-10 lg:mt-14 xl:mt-16'
			)}
		>
			<BgBlur className="w-1/2 h-1/2 blur-[90px]" />

			<div
				className={cn(
					'relative flex items-center justify-center w-40 h-40 [transform-style:preserve-3d]',
					'md:scale-110 lg:scale-115 xl:scale-120',
					styles.animateLogo
				)}
			>
				<Side className="w-40 translate-z-6" isImg={true} />
				<Side className="w-40 -translate-z-6 rotate-y-180" isImg={true} />
				<Side className="w-10 rotate-y-90 translate-x-20" />
				<Side className="w-10 -rotate-y-90 -translate-x-20" />
				<Side className="w-40 h-12 rotate-x-90 translate-y-30 shadow-none" isBlur={true} />
			</div>
		</div>
	);
};
