/** --- Imports --- */
import { useEffect, useRef, useState } from 'react';
import { UserBtn } from '../user-btn/UserBtn';
import { type UserData } from '@/api/useMe';
import { UserProfileMenu } from '../user-profile-menu/UserProfileMenu';
import { AnimatePresence } from 'framer-motion';
import { useFloating, flip, shift, offset } from '@floating-ui/react-dom';

/** --- UserOpenMenu Component --- */
export const UserOpenMenu = ({ userData }: { userData?: UserData }) => {
	const [isOpen, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { x, y, refs, strategy } = useFloating({
		placement: 'bottom',
		middleware: [flip(), offset(10), shift({ padding: 20 })],
	});

	const handleToogleMenu = () => setOpen(prev => !prev);

	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => !menuRef.current?.contains(e.target as Node) && setOpen(false);
		window.addEventListener('click', handleClickOutside);
		return () => window.removeEventListener('click', handleClickOutside);
	}, [menuRef, isOpen]);

	return (
		<div ref={menuRef} className="relative">
			<div ref={refs?.setReference}>
				<UserBtn userData={userData} mainCompProps={{ onClick: handleToogleMenu }} isCloseTooltip={isOpen} />
			</div>

			<AnimatePresence>
				{isOpen && <UserProfileMenu userData={userData} floatingOption={{ x, y, strategy, setFloating: refs?.setFloating }} />}
			</AnimatePresence>
		</div>
	);
};
