/* --- Imports --- */
import { useFloating, flip, shift, offset } from '@floating-ui/react-dom';
import { useState, useEffect, useRef } from 'react';

/* --- useUserOpenMenu Hook --- */
export const useUserOpenMenu = () => {
	const [isOpen, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { x, y, refs, strategy } = useFloating({
		placement: 'bottom',
		middleware: [flip(), offset(10), shift({ padding: 15 })],
	});

	const handleToogleMenu = () => setOpen(prev => !prev);
	const closeMenu = () => setOpen(false);

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

	return { x, y, refs, strategy, isOpen, handleToogleMenu, closeMenu, menuRef };
};
