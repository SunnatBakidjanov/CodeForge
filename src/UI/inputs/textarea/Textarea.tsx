/* --- Imports --- */
import { useCallback } from 'react';
import { cn } from '../../../utils/cn';

/* --- Types --- */
export type Props = {
	className?: string;
	isAutoresize?: boolean;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>;

/* --- Textarea Component --- */
// This component represents a textarea element for the application.
export const Textarea = ({ className, isAutoresize, onInput, ...rest }: Props) => {
	const handleInput = useCallback(
		(e: React.FormEvent<HTMLTextAreaElement>) => {
			const el = e.currentTarget;

			if (isAutoresize) {
				el.style.height = 'auto';
				el.style.height = `${el.scrollHeight}px`;
			}
			onInput?.(e);
		},
		[isAutoresize, onInput]
	);

	return (
		<textarea
			{...rest}
			onInput={handleInput}
			className={cn(
				'block outline-0 border-1 border-white/5 rounded-2xl bg-transparent text-[var(--white)] w-full overflow-hidden resize-none italic',
				'shadow-sm',
				'transition-all duration-300 ease-out',
				'placeholder:font-bold placeholder:text-sm placeholder:not-italic',
				'focus:shadow-orange-500 focus:border-orange-500/50',
				'px-4',
				'py-2.5',
				'min-h-40',
				'text-base',
				className
			)}
		/>
	);
};
