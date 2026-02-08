/** --- Imports --- */
import { UserBtn, type Props as UserBtnProps } from '../user-btn/UserBtn';
import { type UserData } from '@/api/useMe';
import { UserProfileMenu } from '../user-profile-menu/UserProfileMenu';
import { AnimatePresence } from 'framer-motion';
import { useUserOpenMenu } from '../hooks/useUserOpenMenu';

type Props = {
	userData?: UserData;
	classNames?: {
		userBtn?: UserBtnProps['classNames'];
	};
};

/** --- UserOpenMenu Component --- */
export const UserOpenMenu = ({ userData, classNames }: Props) => {
	const { x, y, refs, menuRef, strategy, isOpen, handleToogleMenu, closeMenu } = useUserOpenMenu();

	return (
		<div ref={menuRef} className="relative">
			<div ref={refs?.setReference}>
				<UserBtn userData={userData} mainCompProps={{ onClick: handleToogleMenu }} isCloseTooltip={isOpen} classNames={classNames?.userBtn} />
			</div>

			<AnimatePresence>
				{isOpen && (
					<UserProfileMenu userData={userData} floatingOption={{ x, y, strategy, setFloating: refs?.setFloating }} closeMenu={closeMenu} />
				)}
			</AnimatePresence>
		</div>
	);
};
