/* --- Imports --- */
import { useState } from 'react';

/* --- useShowPassword Hook --- */
export const useShowPassword = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean[]>([]);

	const setPasswordType = (i: number) => {
		setIsPasswordVisible(prev => {
			const newState = [...prev];
			newState[i] = !newState[i];
			return newState;
		});
	};

	return { isPasswordVisible, setPasswordType };
};
