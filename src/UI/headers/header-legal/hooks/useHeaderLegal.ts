/* --- Imports --- */
import { useState } from 'react';

/* --- useHeaderLegal Hook --- */
export const useHeaderLegal = () => {
	const [isOpen, setOpen] = useState(false);

	const handleOpenMenu = () => {
		setOpen(prev => !prev);
	};

	return { isOpen, handleOpenMenu };
};
