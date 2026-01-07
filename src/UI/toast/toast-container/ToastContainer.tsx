/** --- Imports --- */
import { cn } from '@/utils/cn';
import { ToastContainer as ReactToastContainer, cssTransition } from 'react-toastify';
import styles from './styles/notify.module.css';

/** --- ToastContainer Animation Styles --- */
const Disabled = cssTransition({
	enter: styles?.toastEnter,
	exit: styles?.toastExit,
	collapseDuration: 800,
});

/** --- ToastContainer Component --- */
export const ToastContainer = () => {
	return (
		<ReactToastContainer
			autoClose={6000}
			hideProgressBar
			pauseOnHover={false}
			limit={5}
			closeOnClick
			closeButton={false}
			transition={Disabled}
			className={() =>
				cn('group z-[9999] fixed right-4 bottom-16 flex flex-col-reverse', 'transition-all duration-300 ease-out', 'hover:bottom-2')
			}
			toastClassName={() =>
				cn(
					'relative backdrop-blur bg-black/40 rounded-xl transition-all duration-300 ease-out',
					'shadow-[0_0_3px_white]',
					'w-60',
					'px-4 py-3',
					'group-hover:mb-2 -mb-12'
				)
			}
		/>
	);
};
