import { cn } from '@/utils/cn';
import style from './index.module.css';

export const Coube3d = () => {
	return (
		<div className="w-full">
			<div className="flex items-center justify-center perspective-midrange">
				<div className="perspective-midrange transform-3d -rotate-x-14">
					<div className={cn('relative w-60 h-8 transform-3d', style.animateLogo)}>
						<div className="absolute inset-0 shadow-white shadow-[0_0_6px] rounded-md translate-z-30.5"></div>
						<div className="absolute inset-0 shadow-white shadow-[0_0_6px] rounded-md -translate-z-30.5 rotate-y-180"></div>
						<div className="absolute inset-0 shadow-white shadow-[0_0_6px] rounded-md rotate-y-90 translate-x-30.5"></div>
						<div className="absolute inset-0 shadow-white shadow-[0_0_6px] rounded-md -rotate-y-90 -translate-x-30.5"></div>
						<div className="absolute w-60 h-60 shadow-white bg-white/20 shadow-[0_0_6px]  rotate-x-90 -translate-y-30.5"></div>
						<div className="absolute w-60 h-60 bg-white/20 blur-2xl -rotate-x-90 -translate-y-13"></div>
					</div>
				</div>
			</div>
		</div>
	);
};
