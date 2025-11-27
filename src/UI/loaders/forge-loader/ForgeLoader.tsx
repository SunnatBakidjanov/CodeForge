import { cn } from '../../../utils/cn';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { ImHammer2 } from 'react-icons/im';
import { GiAnvil } from 'react-icons/gi';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { TextGradient } from '../../gradients/text-gradient/TextGradietn';

export const ForgeLoader = ({ text }: { text?: string }) => {
	const lastTriggerRef = useRef(0);
	const [isHit, setIsHit] = useState(false);
	const sparksLength = 20;

	return (
		<div className={cn('w-full h-screen')}>
			<MaxWidthContainer>
				<div className="w-full h-screen flex flex-col items-center justify-center text-white select-none">
					<div className="flex items-center justify-center relative">
						<motion.div
							className="absolute bottom-full"
							initial={{ bottom: '100%', left: '80%', rotate: 40 }}
							animate={{
								rotate: [40, -40, 40],
								bottom: ['100%', '68%', '100%'],
								left: ['80%', '40%', '80%'],
							}}
							onUpdate={latest => {
								const now = Date.now();
								const animationFrame = 1000;

								if (parseFloat(latest.bottom as string) <= 68 && now - lastTriggerRef.current > animationFrame) {
									lastTriggerRef.current = now;
									setIsHit(true);
								}
							}}
							transition={{ duration: 2, repeat: Infinity, ease: 'backIn' }}
						>
							<ImHammer2 className={cn('text-white w-20 h-20')} />
						</motion.div>

						{isHit && (
							<motion.div
								animate={{ opacity: 0 }}
								transition={{ duration: 0.6, ease: 'easeOut' }}
								onAnimationComplete={() => setIsHit(false)}
								className="absolute top-[20%]"
							>
								{Array.from({ length: sparksLength }).map((_, index) => {
									const angle = (Math.PI * 2 * index) / sparksLength;
									const speed = Math.random() * 12 + 2;
									const size = Math.random() * 3 + 2;
									const vx = Math.cos(angle) * speed;
									const vy = Math.sin(angle) * speed;

									return (
										<motion.div
											key={index}
											className="absolute rounded-full shadow-[0_0_8px_2px_rgba(255,140,0,0.8)] bg-orange-600"
											style={{
												width: `${size}px`,
												height: `${size}px`,
											}}
											animate={{ opacity: 1, x: vx * 8, y: -vy * 8 }}
											transition={{ duration: 0.5, ease: 'anticipate' }}
										/>
									);
								})}
							</motion.div>
						)}
						<GiAnvil className="text-white w-34 h-34" />
					</div>

					<TextGradient className="font-bold mt-2 text-4xl">
						{text || (
							<>
								<span className="text-white">Code</span>Forge
							</>
						)}
					</TextGradient>
				</div>
			</MaxWidthContainer>
		</div>
	);
};
