/* --- Imports --- */
import { Form } from '../form/Form';
import { Input, type Props as InputProps } from '../inputs/input/Input';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { ImageComp } from '../image-comp/ImageComp';
import { cn } from '../../utils/cn';
import { BgGradient } from '../gradients/bg-gradient/BgGradient';
import { Button } from '../button/Button';
import { TextGradient } from '../gradients/text-gradient/TextGradietn';
import { DottedLoader } from '../loaders/dotted-loader/DottedLoader';
import { useNavigate } from 'react-router';
import type {
	UseFormHandleSubmit,
	FieldValues,
	UseFormRegister,
	Path,
	SubmitHandler,
	UseFormWatch,
	SubmitErrorHandler,
	RegisterOptions,
} from 'react-hook-form';
import { TextLength } from '../text-length/TextLength';
import type { ErrorType } from '../../hooks/useApiForm';
import failIcon from '/imgs/webp/fail-icon.webp';
import successIcon from '/imgs/webp/success-icon.webp';
import hourglassIcon from '/imgs/webp/hourglass-icon.webp';
import { ImageForm } from '../image-form/ImageForm';

/* --- Types --- */
type FormConfig = {
	title: string;
	btnText: string;
	inputs?: { [key: string]: string };
	linkDescription?: string;
	linkText?: string;
};

export type DataInput<T extends FieldValues> = {
	type?: 'input' | 'textarea';
	iconSrc: string;
	name: Path<T>;
	input: InputProps;
};

type FormHook<T extends FieldValues> = {
	handleSubmit: UseFormHandleSubmit<T, T>;
	handleSubmitForm: SubmitHandler<T>;
	onIsInvalid?: SubmitErrorHandler<T>;
	register: UseFormRegister<T>;
	watch: UseFormWatch<T>;
	isLoading: boolean;
	resMessage: ErrorType;
};

type Props<T extends FieldValues> = {
	formHook: FormHook<T>;
	dataInputs: DataInput<T>[];
	titleIcon: string;
	formConfig: FormConfig;
	href: string;
	validate?: Partial<Record<Path<T>, RegisterOptions<T>>>;
	type: 'register' | 'login';
};

/* --- AuthForm Component --- */
// This component represents the auth form for the application.
export const AuthForm = <T extends FieldValues>({ formHook, dataInputs, titleIcon, formConfig, href, type, validate }: Props<T>) => {
	const { title, btnText, inputs, linkDescription, linkText } = formConfig;
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, onIsInvalid } = formHook;
	const navigate = useNavigate();

	return (
		<Form className={cn('max-w-[550px] rounded-4xl', 'px-12', 'py-10')} onSubmit={handleSubmit(handleSubmitForm, onIsInvalid)}>
			<TextGradient
				ComponentType={'h2'}
				className={cn('flex items-center justify-center font-bold border-b-1 border-white/20', 'text-[40px]', 'pb-1', 'mb-8')}
			>
				{title}
				<ImageComp className="w-16 h-16 ml-0.5" imgAttr={{ src: titleIcon, className: 'max-w-16 relative bottom-[3px]' }} />
			</TextGradient>

			<div className="space-y-3">
				{dataInputs.map(({ input, name, iconSrc }) => {
					return (
						<div key={name}>
							<div className="flex items-center focus-within:bg-black/40 bg-white/5 transition-all duration-300 ease-out rounded-2xl relative w-full">
								<ImageComp imgAttr={{ src: iconSrc, className: 'max-w-7' }} className="w-6 h-6 absolute left-2" />
								<Input
									{...register(name, { ...validate?.[name] })}
									{...input}
									placeholder={inputs?.[name]}
									required={false}
									className="pl-11"
									id={name}
								/>
							</div>

							{type === 'register' && (
								<TextLength
									className="ml-3.5"
									watch={watch}
									field={{
										name: name as Path<T>,
										input: {
											maxLength: input.maxLength,
										},
									}}
								/>
							)}
						</div>
					);
				})}
			</div>

			<div className="mt-6">
				<div
					className={cn(
						'flex items-center justify-center',
						'text-center text-[var(--hot-orange)] transition-all duration-300 ease-out font-medium italic h-auto',
						'md:text-lg lg:text-xl',
						resMessage?.type ? 'mb-2' : 'mb-0'
					)}
				>
					<div className={resMessage?.type ? 'flex items-center justify-center flex-wrap gap-1' : 'hidden'}>
						<p>{resMessage?.message}</p>

						{resMessage?.type === 'error' ? (
							<ImageForm src={failIcon} />
						) : resMessage?.type === 'success' ? (
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
							button: cn('text-xl lg:text-xl', 'w-full text-white tracking-[0.5px]', 'h-11'),
							blik: cn('h-[300%]', 'w-[15%] lg:w-[10%]', 'duration-700 md:duration-900 lg:duration-1100'),
						}}
					>
						{isLoading ? <DottedLoader className="w-3 h-3 lg:w-3.5 lg:h-3.5" offset={'24px'} /> : btnText}
					</Button>
				</BgGradient>
			</div>

			<div className="flex flex-col items-center mt-10">
				<span className="block h-[1px] w-[80%] bg-white/20" />

				<p className={cn('italic text-center text-[var(--white)]', 'text-xl', 'mt-3')}>{linkDescription}</p>

				<Button
					isBlink={true}
					onClick={e => {
						e.preventDefault();
						navigate(href);
					}}
					classNames={{
						button: cn(
							'text-xl',
							'text-white shadow-sm shadow-white w-full rounded-2xl',
							'focus-visible:shadow-md',
							'hover:shadow-md',
							'transition-all duration-300 ease-out',
							'h-10',
							'mt-5',
							'max-w-[300px]'
						),
						blik: cn('h-[300%]', 'w-[15%] lg:w-[12%]', 'duration-700 md:duration-900 lg:duration-1000'),
					}}
				>
					{linkText}
				</Button>
			</div>

			<BgBlur className="w-3/4 h-3/4 blur-[250px]" />
		</Form>
	);
};
