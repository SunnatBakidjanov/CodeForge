import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';

export type SocialBtn = {
	type: 'google' | 'github';
	Icon: React.FC<React.SVGProps<SVGSVGElement>>;
	text: string;
};

export const socialBtns = [
	{
		Icon: FcGoogle,
		text: 'Google',
		type: 'google',
	},
	{
		Icon: AiFillGithub,
		text: 'Github',
		type: 'github',
	},
] as SocialBtn[];

export const formConfig = {
	verifyCode: 'Send Code',
	socialBtns,
};
