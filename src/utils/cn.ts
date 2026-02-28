/* --- Imports --- */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Типы
type Cn = (...classNames: ClassValue[]) => string;

// Утилита для объединения классов с использованием twMerge и clsx
export const cn: Cn = (...classNames) => {
	return twMerge(clsx(classNames));
};
