/* --- Imports --- */
import { useEffect, useState } from 'react';

/* --- useResize Hook --- */
export const useResize = () => {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return { width };
};
