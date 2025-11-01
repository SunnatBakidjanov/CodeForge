/* --- Imports --- */
import { BgBlur } from '../../../../../../UI/backgrounds/bg-blur/BgBlur';
import { TextGradient } from '../../../../../../UI/gradients/text-gradient/TextGradietn';
import { ImageComp } from '../../../../../../UI/image-comp/ImageComp';
import { Input } from '../../../../../../UI/inputs/input/Input';
import { Textarea } from '../../../../../../UI/inputs/textarea/Textarea';
import { cn } from '../../../../../../utils/cn';
import { Form } from '../../../../../../UI/form/Form';
import { FormError } from '../form-error/FormError';
import { TextLength } from '../../../../../../UI/text-length/TextLength';
import type { Props as InputProps } from '../../../../../../UI/inputs/input/Input';
import type { Props as TextareaProps } from '../../../../../../UI/inputs/textarea/Textarea';
import emailIcon from '/imgs/webp/email-icon.webp';
import userIcon from '/imgs/webp/user-icon.webp';
import messageIcon from '/imgs/webp/message-icon.webp';
import { useApiForm } from '../../../../../../hooks/useApiForm';
import { sendMailUrl } from '../../../../../../utils/urls';

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

			<FormError message={resMessage} isLoading={isLoading} />

			<BgBlur className="w-1/2 h-1/2 blur-[300px]" />
		</Form>
	);
};
