/* --- Imports --- */
import { useRef } from 'react';

/* --- useErrorCache Hooks --- */
export const useErrorCache = () => {
	const cacheRef = useRef<Record<string, () => void>>({});

	const getError = (key: string) => cacheRef.current[key];

	const setError = (key: string, fn: () => void) => {
		cacheRef.current[key] = fn;
	};

	const clearError = (key: string) => {
		delete cacheRef.current[key];
	};

	return { getError, setError, clearError };
};
