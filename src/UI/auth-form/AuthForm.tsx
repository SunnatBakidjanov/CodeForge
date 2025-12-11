/* --- Imports --- */
import { Form } from '../form/Form';
import { Input, type Props as InputProps } from '../inputs/input/Input';
import { BgBlur } from '../backgrounds/bg-blur/BgBlur';
import { ImageComp } from '../image-comp/ImageComp';
import { cn } from '@/utils/cn';
import { BgGradient } from '../gradients/bg-gradient/BgGradient';
import { Button } from '../btns/button/Button';
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
import type { ResType } from '@/hooks/useApiForm';
import verifyIcon from '/imgs/webp/varification-code-icon.webp';
import failIcon from '/imgs/webp/fail-icon.webp';
import successIcon from '/imgs/webp/success-icon.webp';
import hourglassIcon from '/imgs/webp/hourglass-icon.webp';
import { ImageForm } from '../image-form/ImageForm';
import { useLoginWithSocial } from './hooks/useLoginWithSocial';
import showPasswordIcon from '/imgs/webp/show-password-eye.webp';
import { useShowPassword } from './hooks/useShowPassword';
import { formConfig } from './form-config/form.config';
import { BtnTimer } from './UI/btn-timer/BtnTimer';

/* --- Types --- */
type TextConfig = {
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
	onInvalid?: SubmitErrorHandler<T>;
	register: UseFormRegister<T>;
	watch: UseFormWatch<T>;
	isLoading: boolean;
	resMessage: ResType;
	setResMessage: (value: React.SetStateAction<ResType>) => void;
};

type Props<T extends FieldValues> = {
	formHook: FormHook<T>;
	dataInputs: DataInput<T>[];
	titleIcon: string;
	textConfig: TextConfig;
	href: string;
	validate?: Partial<Record<Path<T>, RegisterOptions<T>>>;
	type: 'register' | 'login';
};

/* --- AuthForm Component --- */
// This component represents the auth form for the application.
export const AuthForm = <T extends FieldValues>({ formHook, dataInputs, titleIcon, textConfig, href, type, validate }: Props<T>) => {
	const { title, btnText, inputs, linkDescription, linkText } = textConfig;
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage, onInvalid } = formHook;
	const { isPasswordVisible, setPasswordType } = useShowPassword();
	const { handleSocialLogin } = useLoginWithSocial({ setResMessage });
	const { verifyCode, socialBtns } = formConfig;
	const navigate = useNavigate();

	return (
		<Form
			className={cn('max-w-[320px] sm:max-w-[500px] rounded-3xl sm:rounded-4xl', 'px-3 sm:px-8', 'pt-4', 'pb-8', 'sm:py-10')}
			onSubmit={handleSubmit(handleSubmitForm, errors => {
				if (errors?.verifyCode?.type === 'minLength') {
					setResMessage({ type: 'error', message: 'The Forge rejects incomplete codes.' });
				}

				onInvalid?.(errors);
			})}
		>
			<TextGradient
				ComponentType={'h2'}
				className={cn(
					'flex items-center justify-center font-bold border-b-1 border-white/20',
					'text-2xl sm:text-4xl',
					'mb-6 sm:mb-8',
					'sm:pb-2'
				)}
			>
				{title}
				<ImageComp
					className="w-10 sm:w-14 h-14 sm:h-14 ml-0.5 sm:ml-1.5 relative bottom-[3px] sm:bottom-[5px]"
					imgAttr={{ src: titleIcon, className: 'max-w-10 sm:max-w-16 h-auto object-cover' }}
					loader={{ classNames: { container: 'w-8 sm:w-12 h-8 sm:h-12' } }}
				/>
			</TextGradient>

			<div className="space-y-2 sm:space-y-2.5">
				{dataInputs.map(({ input, name, iconSrc }, i) => {
					return (
						<div key={name}>
							<div className="flex items-center focus-within:bg-black/40 bg-white/5 transition-all duration-300 ease-out rounded-2xl relative w-full">
								<ImageComp imgAttr={{ src: iconSrc, className: 'max-w-8 h-auto object-cover' }} className="w-7 h-7 absolute left-2" />

								<Input
									{...register(name, { ...validate?.[name] })}
									{...input}
									type={input.type === 'password' ? (isPasswordVisible[i] ? 'text' : 'password') : input.type}
									placeholder={inputs?.[name]}
									required={false}
									className={cn('px-11 sm:text-lg sm:placeholder:text-base')}
									id={name}
								/>

								{input.type === 'password' && (
									<Button
										type="button"
										classNames={{
											button: cn(
												'rounded-3xl p-1 absolute right-1 z-2 shadow-sm',
												'hover:bg-white/10 focus-visible:bg-white/10',
												'transition-all duration-300 ease-out'
											),
											children: 'flex items-center justify-center',
										}}
										onClick={() => setPasswordType(i)}
									>
										<ImageComp
											imgAttr={{
												src: showPasswordIcon,
												className: cn('max-w-9 h-auto object-cover'),
											}}
											className={cn('w-8 h-8')}
										>
											<span
												className={cn(
													'absolute rotate-45 block h-1 shadow-2xs shadow-amber-500/60 bg-[var(--blue-black)]',
													isPasswordVisible[i] ? 'w-0' : 'w-9/10'
												)}
											/>
										</ImageComp>
									</Button>
								)}
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

				{type === 'register' && (
					<div className="flex gap-3 items-center justify-center">
						<div className="flex items-center focus-within:bg-black/40 bg-white/5 transition-all duration-300 ease-out rounded-2xl relative w-1/2">
							<ImageComp imgAttr={{ src: verifyIcon, className: 'max-w-8 h-auto object-cover' }} className="w-7 h-7 absolute left-2" />

							<Input
								{...register('code' as Path<T>, {
									required: true,
									minLength: 6,
								})}
								onInput={e => {
									e.currentTarget.value = e.currentTarget.value.replace(/\D/g, '');
								}}
								placeholder={'Code'}
								autoComplete={'off'}
								required={false}
								className={cn('px-11 sm:text-lg sm:placeholder:text-base')}
								maxLength={6}
							/>
						</div>

						{type === 'register' && (
							<BtnTimer
								isLoading={isLoading}
								verifyCode={verifyCode}
								getEmail={() => watch('email' as Path<T>)}
								setResMessage={setResMessage}
							/>
						)}
					</div>
				)}
			</div>

			<div className="mt-6 sm:mt-8">
				<div
					className={cn(
						'flex items-center justify-center',
						'text-center text-[var(--hot-orange)] transition-all duration-200 ease-out font-medium italic h-auto',
						'sm:text-lg lg:text-xl',
						resMessage?.type ? 'mb-2' : 'mb-0'
					)}
				>
					<div className={resMessage?.type ? 'flex items-center justify-center flex-wrap gap-1' : 'hidden'}>
						{resMessage?.message && <p>{resMessage?.message}</p>}

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
							button: cn('text-lg sm:text-xl', 'w-full text-white tracking-[0.5px]', 'h-9 sm:h-10'),
							blik: cn('h-[300%]', 'w-[12%] sm:w-[11%]', 'duration-800 sm:duration-900'),
						}}
						disabled={isLoading}
					>
						{isLoading ? <DottedLoader className="w-3 h-3 lg:w-3.5 lg:h-3.5" offset={'24px'} /> : btnText}
					</Button>
				</BgGradient>
			</div>

			<div className={cn('flex flex-col items-center justify-center text-[var(--white)]', 'mt-3', 'gap-3')}>
				<p className="italic text-xl sm:text-2xl">or</p>

				<div className="flex items-center justify-center gap-2">
					{socialBtns.map(({ Icon, text, type }, i) => {
						return (
							<button
								key={i}
								type="button"
								className={cn(
									'flex items-center cursor-pointer italic bg-black/40 rounded-3xl shadow-[0_0_3px_transparent] hover:shadow-white focus-visible:shadow-white transition-all duration-300 ease-out',
									'px-6 sm:px-10 py-2',
									'sm:text-lg',
									'gap-1'
								)}
								onClick={() => handleSocialLogin(type)}
							>
								<Icon className="relative bottom-[1px] w-4.5 h-4.5 sm:w-5 sm:h-5" /> {text}
							</button>
						);
					})}
				</div>
			</div>

			<div className="flex flex-col items-center mt-6 sm:mt-8">
				<span className="block h-[1px] w-[80%] bg-white/20" />

				<p className={cn('italic text-center text-[var(--white)]', 'text-lg sm:text-xl', 'mt-2 sm:mt-3')}>{linkDescription}</p>

				<Button
					isBlink={true}
					onClick={e => {
						e.preventDefault();
						navigate(href);
					}}
					classNames={{
						button: cn(
							'text-lg sm:text-xl',
							'text-white shadow-xs shadow-white w-full rounded-3xl bg-black/30',
							'focus-visible:shadow-md',
							'hover:shadow-md',
							'transition-all duration-300 ease-out',
							'py-1.5 sm:py-2',
							'mt-4 sm:mt-6',
							'max-w-[300px]'
						),
						blik: cn('h-[300%]', 'w-[15%]', 'duration-800'),
					}}
				>
					{linkText}
				</Button>
			</div>

			<BgBlur className="w-3/4 h-3/4 blur-[250px]" />
		</Form>
	);
};
