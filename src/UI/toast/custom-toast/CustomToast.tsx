import { ImageComp } from '@/UI/image-comp/ImageComp';
import successIcon from '/imgs/webp/success-icon.webp';
import failIcon from '/imgs/webp/fail-icon.webp';
import warnIcon from '/imgs/webp/warn-icon.webp';
import infoIcon from '/imgs/webp/info-icon.webp';

type Props = {
	message: string;
	type: 'success' | 'warn' | 'error' | 'info' | 'default';
};

type ImgType = Exclude<Props['type'], 'default'>;

export const CustomToast = ({ message, type }: Props) => {
	const imgs: Record<ImgType, string> = {
		success: successIcon,
		error: failIcon,
		warn: warnIcon,
		info: infoIcon,
	};

	return (
		<div className="flex items-center gap-3 h-8">
			{type !== 'default' && <ImageComp imgAttr={{ src: imgs[type], className: 'max-w-8 h-auto' }} className="w-7 h-7" />}

			<span className="text-sm font-normal text-white">{message}</span>
		</div>
	);
};
