/* --- Imports --- */
import successIcon from '/imgs/webp/success-icon.webp';
import failIcon from '/imgs/webp/fail-icon.webp';
import hourglassIcon from '/imgs/webp/hourglass-icon.webp';
import { cn } from '../../../../../../utils/cn';
import { BgGradient } from '../../../../../../UI/gradients/bg-gradient/BgGradient';
import { Button } from '../../../../../../UI/button/Button';
import { DottedLoader } from '../../../../../../UI/loaders/dotted-loader/DottedLoader';
import type { ErrorType } from '../../../../../../hooks/useApiForm';
import { ImageForm } from '../../../../../../UI/image-form/ImageForm';

/* --- Types --- */
type Props = {
	message: ErrorType;
	isLoading: boolean;
};

/* --- FormError Component --- */
// This component represents the form error for the landing page.
export const FormError = ({ message, isLoading }: Props) => {
	return (
		<div className="mt-4 lg:mt-6">
			<div
				className={cn(
					'flex items-center justify-center',
					'text-center text-[var(--hot-orange)] transition-all duration-300 ease-out font-medium italic h-auto',
					'md:text-lg lg:text-xl',
					message.type ? 'mb-2 lg:mb-2.5' : 'mb-0'
				)}
			>
				<div className={message.type ? 'flex items-center justify-center flex-wrap gap-1' : 'hidden'}>
					<p>{message.message}</p>

					{message.type === 'error' ? (
						<ImageForm src={failIcon} />
					) : message.type === 'success' ? (
						<ImageForm src={successIcon} />
					) : (
						<ImageForm src={hourglassIcon} />
					)}
				</div>
			</div>

			<BgGradient
				ComponentType="div"
				className="overflow-hidden rounded-2xl shadow-sm shadow-white hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-all duration-300 ease-out"
			>
				<Button
					isBlink={true}
					classNames={{
						button: cn('text-xl lg:text-2xl', 'w-full text-white', 'h-10'),
						blik: cn('h-[300%]', 'w-[10%] lg:w-[7%]', 'duration-700 md:duration-900 lg:duration-1100'),
					}}
				>
					{isLoading ? <DottedLoader className="w-3 h-3 lg:w-3.5 lg:h-3.5" offset={'28px'} /> : 'Send message'}
				</Button>
			</BgGradient>
		</div>
	);
};
