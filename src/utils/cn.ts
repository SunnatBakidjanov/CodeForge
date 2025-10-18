/* --- Imports --- */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/* --- cn Utility Function --- */
// This function preserves null, undefined, false, and empty strings. It merges classes, and results in a merge of Tailwind classes.
export function cn(...classes: (string | undefined | null | false)[]) {
	return twMerge(clsx(classes));
}
