import { ImageComp } from '../../../../../../UI/image-comp/ImageComp';
import { cn } from '../../../../../../utils/cn';
import hammerAndAnvilImg from '../../../../../../assets/imgs/webp/hammer-and-anvil.webp';
import styles from './index.module.css';
import { BgBlur } from '../../../../../../UI/backgrounds/bg-blur/BgBlur';

const Side = ({ className, isImg, isBlur }: { className?: string; isImg?: boolean; isBlur?: boolean }) => {
	return (
		<div
			className={cn(
				'[transform-style:preserve-3d] flex items-center justify-center absolute shadow-sm shadow-white backface-hidden bg-black/30',
				'h-40',
				className
			)}
		>
			{isImg && <ImageComp imgAttr={{ src: hammerAndAnvilImg, className: 'max-w-36 h-auto', loading: 'lazy' }} loader={{ size: 110 }} />}
			{isBlur && <BgBlur className="bg-white h-1/2 blur-[34px]" />}
		</div>
	);
};

export const CoubComp = () => {
	return (
		<div className={cn('perspective-midrange flex items-center justify-center relative w-fit', ' h-58', 'pb-10', 'mt-8')}>
			<BgBlur className="w-1/2 h-1/2 blur-3xl" />

			<div className={cn('relative flex items-center justify-center w-40 h-40 [transform-style:preserve-3d]', styles.animateLogo)}>
				<Side className="w-40 translate-z-6" isImg={true} />
				<Side className="w-40 -translate-z-6 rotate-y-180" isImg={true} />
				<Side className="w-10 rotate-y-90 translate-x-20" />
				<Side className="w-10 -rotate-y-90 -translate-x-20" />
				<Side className="w-40 h-12 rotate-x-90 translate-y-30 shadow-none" isBlur={true} />
			</div>
		</div>
	);
};
