/* --- Imports --- */
import { BgBlur } from '../../../../../../UI/backgrounds/bg-blur/BgBlur';
import { TextGradient } from '../../../../../../UI/gradients/text-gradient/TextGradietn';
import { ImageComp } from '../../../../../../UI/image-comp/ImageComp';
import { Input } from '../../../../../../UI/inputs/input/Input';
import { Textarea } from '../../../../../../UI/inputs/textarea/Textarea';
import { cn } from '../../../../../../utils/cn';
import { Form } from '../../../../../../UI/form/Form';
import { TextLength } from '../../../../../../UI/text-length/TextLength';
import type { Props as InputProps } from '../../../../../../UI/inputs/input/Input';
import type { Props as TextareaProps } from '../../../../../../UI/inputs/textarea/Textarea';
import emailIcon from '/imgs/webp/email-icon.webp';
import userIcon from '/imgs/webp/user-icon.webp';
import messageIcon from '/imgs/webp/message-icon.webp';
import { useApiForm } from '../../../../../../hooks/useApiForm';
import { sendMailUrl } from '../../../../../../utils/urls';
import { ImageForm } from '../../../../../../UI/image-form/ImageForm';
import successIcon from '/imgs/webp/success-icon.webp';
import failIcon from '/imgs/webp/fail-icon.webp';
import hourglassIcon from '/imgs/webp/hourglass-icon.webp';
import { BgGradient } from '../../../../../../UI/gradients/bg-gradient/BgGradient';
import { DottedLoader } from '../../../../../../UI/loaders/dotted-loader/DottedLoader';
import { Button } from '../../../../../../UI/button/Button';

/* --- Types --- */
export type FieldData =
	| { type: 'input'; text: string; iconSrc: string; name: keyof FormValues; input: InputProps }
	| { type: 'textarea'; text: string; iconSrc: string; name: keyof FormValues; input: TextareaProps };

export type FormValues = {
	name: string;
	email: string;
	message: string;
};

/* --- Data --- */
const dataInputs: FieldData[] = [
	{
		type: 'input',
		name: 'name',
		text: 'Name',
		iconSrc: userIcon,
		input: {
			type: 'text',
			autoComplete: 'on',
			placeholder: 'Name',
			maxLength: 20,
		},
	},
	{
		type: 'input',
		name: 'email',
		text: 'Email',
		iconSrc: emailIcon,
		input: {
			type: 'email',
			autoComplete: 'email',
			placeholder: 'Email',
			maxLength: 254,
		},
	},
	{
		type: 'textarea',
		name: 'message',
		text: 'Message',
		iconSrc: messageIcon,
		input: {
			autoComplete: 'off',
			placeholder: 'Message',
			isAutoresize: true,
			maxLength: 500,
		},
	},
];

/* --- LandingForm Component --- */
// This component represents the form for the landing page.
export const LandingForm = () => {
	const { handleSubmit, handleSubmitForm, isLoading, register, watch, resMessage, onIsInvalid } = useApiForm<FormValues>({
		defaultValues: { name: '', email: '', message: '' },
		errorsMessage: { success: { message: 'Message successfully engraved.' } },
		apiHref: sendMailUrl,
	});

	return (
		<Form
			onSubmit={handleSubmit(handleSubmitForm, onIsInvalid)}
			className={cn('py-6', 'px-3', 'mt-6 lg:mt-8', 'max-w-[800px] lg:max-w-[900px] xl:max-w-[1000px]')}
		>
			<div className="space-y-3">
				{dataInputs.map(field => {
					return (
						<div key={field.name} className="flex flex-col">
							<label htmlFor={field.name} className={cn('flex items-center', 'gap-1 lg:gap-1.5', 'mb-0.5 lg:mb-1', 'ml-2')}>
								<TextGradient ComponentType={'p'} children={field.text} className={cn('font-bold', 'text-lg lg:text-xl')} />
								<ImageComp
									imgAttr={{
										src: field.iconSrc,
										className: cn('relative bottom-[1px]', field.name === 'message' && 'rotate-y-180'),
									}}
									className="w-7 h-7 lg:w-8 lg:h-8 overflow-hidden"
								/>
							</label>

							<div className="focus-within:bg-black/40 bg-white/5 transition-all duration-300 ease-out rounded-2xl relative w-full">
								{field.type === 'input' ? (
									<Input id={field.name} {...register(field.name, { required: true })} {...field.input} />
								) : (
									<Textarea id={field.name} {...register(field.name, { required: true })} {...field.input} />
								)}
							</div>

							<TextLength<FormValues>
								watch={watch}
								field={{
									name: field.name,
									input: field.input,
								}}
							/>
						</div>
					);
				})}
			</div>

			<div className="mt-4 lg:mt-6">
				<div
					className={cn(
						'flex items-center justify-center',
						'text-center text-[var(--hot-orange)] transition-all duration-300 ease-out font-medium italic h-auto',
						'md:text-lg lg:text-xl',
						resMessage.type ? 'mb-2 lg:mb-2.5' : 'mb-0'
					)}
				>
					<div className={resMessage.type ? 'flex items-center justify-center flex-wrap gap-1' : 'hidden'}>
						<p>{resMessage.message}</p>

						{resMessage.type === 'error' ? (
							<ImageForm src={failIcon} />
						) : resMessage.type === 'success' ? (
							<ImageForm src={successIcon} />
						) : (
							<ImageForm src={hourglassIcon} />
						)}
					</div>
				</div>

				<BgGradient
					ComponentType="div"
					className="overflow-hidden rounded-3xl shadow-sm shadow-white hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-all duration-300 ease-out"
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

			<BgBlur className="w-1/2 h-1/2 blur-[300px]" />
		</Form>
	);
};
