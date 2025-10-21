/* --- Imports --- */
import { BgBlur } from '../../../../../../UI/backgrounds/bg-blur/BgBlur';
import { Button } from '../../../../../../UI/button/Button';
import { BgGradient } from '../../../../../../UI/gradients/bg-gradient/BgGradient';
import { TextGradient } from '../../../../../../UI/gradients/text-gradient/TextGradietn';
import { ImageComp } from '../../../../../../UI/image-comp/ImageComp';
import { Input } from '../../../../../../UI/inputs/input/Input';
import { Textarea } from '../../../../../../UI/inputs/textarea/Textarea';
import { DottedLoader } from '../../../../../../UI/loaders/dotted-loader/DottedLoader';
import { cn } from '../../../../../../utils/cn';
import { TextLength } from '../text-length/TextLength';
import { useLandingForm } from './hooks/useLandingForm';
import successIcon from '../../../../../../assets/imgs/webp/success-icon.webp';
import failIcon from '../../../../../../assets/imgs/webp/fail-icon.webp';

/* --- LandingForm Component --- */
// This component represents the form for the landing page.
export const LandingForm = () => {
	const { handleSubmit, handleSubmitForm, isLoading, register, dataInputs, watch, isSubmitSuccessful, onInvalid, isHasErrors, generalMessage } =
		useLandingForm();

	return (
		<form
			onSubmit={handleSubmit(handleSubmitForm, onInvalid)}
			className={cn('border-2 border-orange-500/50 bg-black/40 relative rounded-3xl', 'py-6', 'px-3', 'mt-6')}
		>
			<div className="space-y-3">
				{dataInputs.map(field => {
					return (
						<div key={field.name} className="flex flex-col">
							<label htmlFor={field.name} className={cn('flex items-center', 'gap-1', 'mb-0.5', 'ml-2')}>
								<TextGradient ComponentType={'p'} children={field.text} className={cn('font-bold', 'text-lg')} />
								<ImageComp
									loader={{ size: 26 }}
									imgAttr={{
										src: field.iconSrc,
										className: cn('relative bottom-[1px]', field.name === 'message' && 'rotate-y-180'),
									}}
									className="w-7 h-7 overflow-hidden"
								/>
							</label>

							<div className="focus-within:bg-black bg-white/5 transition-all duration-300 ease-out rounded-2xl relative w-full">
								{field.type === 'input' ? (
									<Input id={field.name} {...register(field.name, { required: true })} {...field.input} />
								) : (
									<Textarea id={field.name} {...register(field.name, { required: true })} {...field.input} />
								)}
							</div>

							<TextLength watch={watch} field={field} />
						</div>
					);
				})}
			</div>

			<div className="mt-5">
				<div
					className={cn(
						'flex items-center justify-center gap-1',
						'text-center text-[var(--hot-orange)] transition-all duration-300 ease-out font-medium italic',
						isSubmitSuccessful || isHasErrors ? 'opacity-100 mb-2 h-6' : 'opacity-0 mb-0 h-0'
					)}
				>
					{isSubmitSuccessful && (
						<>
							<p>{generalMessage}</p>
							<ImageComp
								loader={{ size: 26 }}
								imgAttr={{ src: successIcon, className: 'relative bottom-[1px]' }}
								className="w-7 h-7 overflow-hidden"
							/>
						</>
					)}

					{isHasErrors && (
						<>
							<p>{generalMessage}</p>
							<ImageComp
								loader={{ size: 26 }}
								imgAttr={{ src: failIcon, className: 'relative bottom-[1px]' }}
								className="w-7 h-7 overflow-hidden"
							/>
						</>
					)}
				</div>

				<BgGradient ComponentType="div" className="overflow-hidden rounded-2xl">
					<Button isBlink={true} classNames={{ button: cn('text-xl', 'w-full text-white', 'h-10') }}>
						{isLoading ? <DottedLoader className="w-3 h-3" offset={'22px'} /> : 'Send message'}
					</Button>
				</BgGradient>
			</div>

			<BgBlur className="w-1/2 h-1/2 blur-[300px]" />
		</form>
	);
};
