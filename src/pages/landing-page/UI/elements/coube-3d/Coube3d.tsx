import { cn } from '@/utils/cn';
import style from './index.module.css';

type LogoSides = { side: 'left' | 'right' | 'face' | 'back' };
type SidesShadow = { shadowSide: 'left' | 'right' };
type TopSideShadows = { shadowSide: 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom' };
type CoubeConfig = { logoSides: LogoSides[]; sidesShadow: SidesShadow[]; topSideShadows: TopSideShadows[] };

const coubeConfig: CoubeConfig = {
	logoSides: [{ side: 'left' }, { side: 'right' }, { side: 'face' }, { side: 'back' }],
	sidesShadow: [{ shadowSide: 'left' }, { shadowSide: 'right' }],
	topSideShadows: [{ shadowSide: 'leftTop' }, { shadowSide: 'leftBottom' }, { shadowSide: 'rightTop' }, { shadowSide: 'rightBottom' }],
};

export const Coube3d = () => {
	return (
		<div className="w-full">
			<div className="flex items-center justify-center perspective-midrange">
				<div className="perspective-midrange transform-3d -rotate-x-14">
					<div className={cn('relative w-60 h-6 transform-3d', style.animateLogo)}>
						{coubeConfig.logoSides.map(({ side }: LogoSides) => (
							<div
								key={side}
								className={cn(
									'flex items-center absolute inset-0 overflow-hidden shadow-white bg-(--blue-black) shadow-[0_0_6px] rounded-sm backface-hidden',
									{
										'translate-z-30.5': side === 'face',
										'-translate-z-30.5 rotate-x-180': side === 'back',
										'rotate-y-90 translate-x-30.5': side === 'left',
										'-rotate-y-90 -translate-x-30.5': side === 'right',
									}
								)}
							>
								{coubeConfig.sidesShadow.map(({ shadowSide }: SidesShadow) => (
									<div
										key={shadowSide}
										className={cn('absolute w-8 h-8 bg-white blur-xl', {
											'left-0': shadowSide === 'left',
											'right-0': shadowSide === 'right',
										})}
									/>
								))}
							</div>
						))}

						<div className="overflow-hidden absolute w-60 h-60 shadow-white bg-(--blue-black) shadow-[0_0_6px] rounded-sm rotate-x-90 -translate-y-30.5 backface-hidden">
							{coubeConfig.topSideShadows.map(({ shadowSide }: TopSideShadows) => (
								<div
									key={shadowSide}
									className={cn('absolute w-8 h-8 bg-white blur-xl', {
										'left-0 top-0': shadowSide === 'leftTop',
										'left-0 bottom-0': shadowSide === 'leftBottom',
										'right-0 top-0': shadowSide === 'rightTop',
										'right-0 bottom-0': shadowSide === 'rightBottom',
									})}
								/>
							))}
						</div>

						<div className="flex items-center justify-center absolute transform-3d w-full h-60 bg-white/20 blur-lg -rotate-x-90 -translate-y-30.5">
							<div className=""></div>
						</div>

						<div className="absolute w-60 h-60 bg-white/20 blur-lg -rotate-x-90 -translate-y-19"> </div>
					</div>
				</div>
			</div>
		</div>
	);
};
