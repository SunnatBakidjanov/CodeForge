/** --- Imports --- */
import { useState } from 'react';
import { UserBtn } from '../user-btn/UserBtn';
import { type UserData } from '@/api/useMe';
import { UserProfileMenu } from '../user-profile-menu/UserProfileMenu';
import { AnimatePresence } from 'framer-motion';
import { useFloating, flip, shift, offset } from '@floating-ui/react-dom';

/** --- UserOpenMenu Component --- */
export const UserOpenMenu = ({ userData }: { userData?: UserData }) => {
	const [isOpen, setOpen] = useState(false);
	const { x, y, refs, strategy } = useFloating({
		placement: 'bottom',
		middleware: [flip(), offset(0), shift({ padding: 0 })],
	});

	return (
		<div className="relative">
			<div ref={refs?.setReference}>
				<UserBtn userData={userData} mainCompProps={{ onClick: () => setOpen(prev => !prev) }} isCloseTooltip={isOpen} />
			</div>

			<AnimatePresence>
				{isOpen && <UserProfileMenu userData={userData} floatingOption={{ x, y, strategy, setFloating: refs?.setFloating }} />}
			</AnimatePresence>
		</div>
	);
};
