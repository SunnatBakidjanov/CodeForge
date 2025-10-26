/* --- Imports --- */
import successIcon from '/imgs/webp/success-icon.webp';
import failIcon from '/imgs/webp/fail-icon.webp';
import hourglassIcon from '/imgs/webp/hourglass-icon.webp';
import { cn } from '../../../../../../utils/cn';
import { BgGradient } from '../../../../../../UI/gradients/bg-gradient/BgGradient';
import { Button } from '../../../../../../UI/button/Button';
import { DottedLoader } from '../../../../../../UI/loaders/dotted-loader/DottedLoader';
import type { ErrorType } from '../landing-form/hooks/useLandingForm';
import { ImageComp } from '../../../../../../UI/image-comp/ImageComp';

/* --- Types --- */
type Props = {
	message: ErrorType;
	isLoading: boolean;
};

const Img = ({ src }: { src: string }) => {
	return <ImageComp imgAttr={{ src: src, className: 'relative bottom-[1px]' }} className="w-7 h-7 overflow-hidden" />;
};

/* --- FormError Component --- */
// This component represents the form error for the landing page.
export const FormError = ({ message, isLoading }: Props) => {
	return (
		<div className="mt-4">
			<div
				className={cn(
					'flex items-center justify-center',
					'text-center text-[var(--hot-orange)] transition-all duration-300 ease-out font-medium italic h-auto',
					message.type ? 'mb-2' : 'mb-0'
				)}
			>
				<div className={message.type ? 'flex items-center justify-center flex-wrap gap-1' : 'hidden'}>
					<p>{message.message}</p>

					{message.type === 'error' ? (
						<Img src={failIcon} />
					) : message.type === 'success' ? (
						<Img src={successIcon} />
					) : (
						<Img src={hourglassIcon} />
					)}
				</div>
			</div>

			<BgGradient
				ComponentType="div"
				className="overflow-hidden rounded-2xl shadow-sm shadow-white hover:shadow-md transition-all duration-300 ease-out"
			>
				<Button isBlink={true} classNames={{ button: cn('text-xl', 'w-full text-white', 'h-10') }}>
					{isLoading ? <DottedLoader className="w-3 h-3" offset={'22px'} /> : 'Send message'}
				</Button>
			</BgGradient>
		</div>
	);
};
