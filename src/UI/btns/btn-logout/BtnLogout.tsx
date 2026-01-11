/** --- Imports --- */
import { useLogout } from '@/api/useLogout';
import { cn } from '@/utils/cn';
import { MdLogout } from 'react-icons/md';

/** --- Types --- */
type Props = {
	replaceUrl?: string;
	classNames?: { [key in 'button' | 'img']?: string };
	onClick?: () => unknown;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'>;

/* --- BtnLogout Component --- */
export const BtnLogout = ({ replaceUrl, classNames, onClick, ...rest }: Props) => {
	const { logout } = useLogout();

	return (
		<button
			className={cn('flex items-center cursor-pointer text-white', classNames?.button)}
			onClick={() => {
				const isReturn = onClick?.();
				if (isReturn === false) return;

				console.log('logout');

				logout({ replaceUrl: replaceUrl });
			}}
			{...rest}
		>
			<MdLogout className={cn('relative bottom-px', classNames?.img)} />
			Logout
		</button>
	);
};
