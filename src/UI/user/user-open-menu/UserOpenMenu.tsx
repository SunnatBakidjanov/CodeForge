/** --- Imports --- */
import { useState } from 'react';
import { UserBtn } from '../user-btn/UserBtn';
import { type UserData } from '@/api/useMe';
import { UserProfileMenu } from '../user-profile-menu/UserProfileMenu';
import { AnimatePresence } from 'framer-motion';

/** --- UserOpenMenu Component --- */
export const UserOpenMenu = ({ userData }: { userData?: UserData }) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="relative">
			<UserBtn userData={userData} mainCompProps={{ onClick: () => setOpen(prev => !prev) }} isCloseTooltip={isOpen} />

			<AnimatePresence>{isOpen && <UserProfileMenu userData={userData} />}</AnimatePresence>
		</div>
	);
};
