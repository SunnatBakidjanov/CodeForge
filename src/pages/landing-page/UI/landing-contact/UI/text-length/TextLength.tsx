/* --- Imports --- */
import { cn } from '../../../../../../utils/cn';
import type { UseFormWatch } from 'react-hook-form';
import type { FormValues, FieldData } from '../landing-form/hooks/useLandingForm';

/* --- Types --- */
type Props = {
	watch: UseFormWatch<FormValues>;
	field: FieldData;
};

/* --- TextLength Component --- */
// This component represents the input length in the landing page.
export const TextLength = ({ watch, field }: Props) => {
	const valueLength = watch(field.name)?.length || 0;
	const max = field.input.maxLength || 0;
	const precent = (valueLength / max) * 100;
	const watchPrecent = 80;

	return (
		<p
			className={cn(
				'text-[var(--white)] text-sm font-bold transition-all duration-300 ease-out flex items-center gap-1.5',
				'ml-2.5',
				precent > watchPrecent ? 'h-4 opacity-100 mt-2' : 'h-0 opacity-0 mt-0'
			)}
		>
			{valueLength} out of <span className="text-[var(--hot-orange)]">{max}</span>
		</p>
	);
};
