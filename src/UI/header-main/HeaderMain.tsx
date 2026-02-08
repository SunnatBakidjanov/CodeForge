import { useMe } from '@/api/useMe';
import { MainTitle } from '../main-title/MainTitle';
import { UserOpenMenu } from '../user/user-open-menu/UserOpenMenu';

export const HeaderMain = () => {
	const { data } = useMe({ staleTime: Infinity });

	return (
		<header className="border-y-1 border-white/30 shadow-white/30 shadow-[0_0_10px] py-3 pl-4 pr-6">
			<div className="flex justify-between items-center">
				<MainTitle
					classNames={{
						textGradient: 'font-bold text-2xl',
						imgContainer: 'ml-2 w-10 h-10',
					}}
				/>

				<div className="">
					<UserOpenMenu
						userData={data?.userData}
						classNames={{
							userBtn: {
								tooltipBtn: 'h-8.5 w-8.5 sm:h-10.5 sm:w-10.5 lg:h-9.5 lg:w-9.5',
							},
						}}
					/>
				</div>
			</div>
		</header>
	);
};
