/* --- Imports --- */
import { useRef, useEffect, useState } from 'react';
import { useResize } from '@/hooks/useResize';

/* --- useHeaderLanding Hook --- */
export const useHeaderLanding = () => {
	const headerRef = useRef<HTMLDivElement>(null);
	const [scrolled, setScrolled] = useState(false);
	const { width } = useResize();
	const [height, setHeight] = useState(0);
	const [isOpen, setOpen] = useState(false);

	const handleOpen = () => setOpen(prev => !prev);

	useEffect(() => {
		if (!headerRef.current) return;
		setHeight(headerRef.current.offsetHeight);
	}, [headerRef, width]);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return { scrolled, height, headerRef, isOpen, handleOpen };
};
