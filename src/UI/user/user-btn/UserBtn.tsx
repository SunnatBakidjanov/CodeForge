/* --- Imports --- */
import type { UserData } from '@/api/useMe';
import { BtnTooltip } from '@/UI/btns/btn-tooltip/BtnTooltip';
import { BgGradient } from '@/UI/gradients/bg-gradient/BgGradient';
import { cn } from '@/utils/cn';

/* --- Types --- */
type Props<T extends React.ElementType = 'button'> = {
	userData?: UserData;
	componentType?: T;
	mainCompProps?: Omit<React.ComponentPropsWithoutRef<T>, 'children' | 'className'>;
	isCloseTooltip?: boolean;
};

/* --- UserBtn Component --- */
export const UserBtn = <T extends React.ElementType = 'button'>({ userData, componentType, isCloseTooltip, mainCompProps }: Props<T>) => {
	const tooltipConfig = [{ text: 'Your account' }, { text: userData?.name }, { text: userData?.email }];
	const firstLatter = userData?.name[0];

	return (
		<BtnTooltip
			btnProps={mainCompProps && { ...mainCompProps }}
			isCloseTooltip={isCloseTooltip}
			as={componentType}
			btnWrapper={({ children }) => (
				<BgGradient
					ComponentType="div"
					className={cn(
						'rounded-full shadow-[0_0_3px_white] text-white cursor-pointer',
						'hover:shadow-[0_2px_8px_white] [&:has(:focus-visible)]:shadow-[0_2px_8px_white]',
						'transition-all duration-200 ease-out'
					)}
				>
					{children}
				</BgGradient>
			)}
			tooltipOptions={{
				offsetValue: 0,
			}}
			childrens={{
				btn: firstLatter,
				tooltip: tooltipConfig.map(({ text }, i) => {
					if (!text) return null;
					const textValidate = text.length >= 28 ? text.slice(0, 28) + '...' : text;

					return (
						<span key={i} className={cn('cursor-text block w-fit leading-tight', i === 0 && 'font-bold mb-1 text-white')}>
							{textValidate}
						</span>
					);
				}),
			}}
			classNames={{
				btn: cn('cursor-pointer', 'text-lg sm:text-xl font-bold', 'h-8.5 w-8.5 sm:h-10.5 sm:w-10.5 lg:h-11 lg:w-11'),
				tooltip: cn('font-normal text-(--white)'),
				tooltipContainer: 'pt-3',
			}}
		/>
	);
};
