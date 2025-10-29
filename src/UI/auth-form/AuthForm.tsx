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
import type { UseFormHandleSubmit, FieldValues, UseFormRegister, Path, SubmitHandler, UseFormWatch } from 'react-hook-form';
import { TextLength } from '../text-length/TextLength';

/* --- Types --- */
type FormConfig = {
	title: string;
	btnText: string;
	inputs?: { [key: string]: string };
	linkDescription?: string;
	linkText?: string;
};

type DataInput = {
	type?: 'input' | 'textarea';
	iconSrc: string;
	name: Path<FieldValues>;
	input: InputProps;
};

type FormHook<T extends FieldValues> = {
	handleSubmit: UseFormHandleSubmit<T, T>;
	handleSubmitForm: SubmitHandler<T>;
	register: UseFormRegister<T>;
	watch: UseFormWatch<T>;
	isLoading: boolean;
};

type Props<T extends FieldValues> = {
	formHook: FormHook<T>;
	dataInputs: DataInput[];
	titleIcon: string;
	formConfig: FormConfig;
	href: string;
	type: 'register' | 'login';
};

/* --- AuthForm Component --- */
// This component represents the auth form for the application.
export const AuthForm = <T extends FieldValues>({ formHook, dataInputs, titleIcon, formConfig, href, type }: Props<T>) => {
	const { title, btnText, inputs, linkDescription, linkText } = formConfig;
	const { handleSubmit, handleSubmitForm, register, watch, isLoading } = formHook;
	const navigate = useNavigate();

	return (
		<Form className={cn('max-w-[550px] rounded-4xl', 'px-12', 'py-10', 'space-y-3')} onSubmit={handleSubmit(handleSubmitForm)}>
			<TextGradient
				ComponentType={'h2'}
				className={cn('flex items-center justify-center font-bold border-b-1 border-white/20', 'text-[40px]', 'pb-1', 'mb-8')}
			>
				{title}
				<ImageComp className="w-16 h-16 ml-0.5" imgAttr={{ src: titleIcon, className: 'max-w-16 relative bottom-[3px]' }} />
			</TextGradient>

			{dataInputs.map(({ input, name, iconSrc }) => (
				<div key={name}>
					<div className="flex items-center focus-within:bg-black/40 bg-white/5 transition-all duration-300 ease-out rounded-2xl relative w-full">
						<ImageComp imgAttr={{ src: iconSrc, className: 'max-w-7' }} className="w-6 h-6 absolute left-2" />
						<Input {...register(name as Path<T>)} placeholder={inputs?.[name]} {...input} className="pl-11" id={name} />
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
			))}

			<BgGradient
				ComponentType="div"
				className="overflow-hidden rounded-3xl shadow-sm shadow-white hover:shadow-md [&:has(:focus-visible)]:shadow-md transition-all duration-300 ease-out mt-6"
			>
				<Button
					isBlink={true}
					classNames={{
						button: cn('text-xl lg:text-2xl', 'w-full text-white tracking-[0.5px]', 'h-11'),
						blik: cn('h-[300%]', 'w-[15%] lg:w-[10%]', 'duration-700 md:duration-900 lg:duration-1100'),
					}}
				>
					{isLoading ? <DottedLoader className="w-3 h-3 lg:w-3.5 lg:h-3.5" offset={'28px'} /> : btnText}
				</Button>
			</BgGradient>

			<div className="flex flex-col items-center mt-10">
				<span className="block h-[1px] w-[80%] bg-white/20" />

				<p className={cn('italic text-center text-[var(--white)]', 'text-2xl', 'mt-3')}>{linkDescription}</p>

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
							'h-11',
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
