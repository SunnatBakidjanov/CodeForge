/** --- Imports --- */
import { UserBtn } from '../user-btn/UserBtn';
import { type UserData } from '@/api/useMe';
import { UserProfileMenu } from '../user-profile-menu/UserProfileMenu';
import { AnimatePresence } from 'framer-motion';
import { useUserOpenMenu } from '../hooks/useUserOpenMenu';

/** --- UserOpenMenu Component --- */
export const UserOpenMenu = ({ userData }: { userData?: UserData }) => {
	const { x, y, refs, menuRef, strategy, isOpen, handleToogleMenu, closeMenu } = useUserOpenMenu();

	return (
		<div ref={menuRef} className="relative">
			<div ref={refs?.setReference}>
				<UserBtn userData={userData} mainCompProps={{ onClick: handleToogleMenu }} isCloseTooltip={isOpen} />
			</div>

			<AnimatePresence>
				{isOpen && (
					<UserProfileMenu userData={userData} floatingOption={{ x, y, strategy, setFloating: refs?.setFloating }} closeMenu={closeMenu} />
				)}
			</AnimatePresence>
		</div>
	);
};
