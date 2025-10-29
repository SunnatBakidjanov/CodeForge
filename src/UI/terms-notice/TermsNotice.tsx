import { useNavigate } from 'react-router';
import { TextGradient } from '../gradients/text-gradient/TextGradietn';
import { BgGradient } from '../gradients/bg-gradient/BgGradient';

const Btn = ({ text, href }: { text: string; href: string }) => {
	const navigate = useNavigate();

	return (
		<TextGradient
			ComponentType={'button'}
			className="font-bold cursor-pointer group relative"
			onClick={() => {
				navigate(href);
			}}
		>
			{text}
			<BgGradient
				ComponentType={'span'}
				className="absolute left-[50%] -translate-x-[50%] block w-0 group-hover:w-full h-[1px] transition-all duration-300 ease-out group-focus-visible:w-full"
			/>
		</TextGradient>
	);
};

export const TermsNotice = () => {
	return (
		<div className="text-[var(--white)] italic text-center text-lg">
			By continuing, you agree to our
			<br />
			<Btn text={'Terms of Service'} href={'/terms-of-service'} /> and <Btn text={'Privacy Policy'} href={'/privacy-policy'} />
		</div>
	);
};
