/* --- Imports --- */
import { useAppSelector } from '../../../../hooks/useRedux';
import { useRef, useEffect, useState } from 'react';
import { termsRoute, privateRoute } from '../../../../utils/urls';
import { useLocation } from 'react-router';
import { useResize } from '../../../../hooks/useResize';

/* --- Types --- */
type Offset = { left: number; top: number | string; width: number; height: number };

/* --- useLegalNav Hook --- */
export const useLegalNav = () => {
	const { width } = useResize();
	const prevRoute = useAppSelector(state => state.prevRoute.previous);
	const pathName = useLocation().pathname;
	const links = [
		{ link: termsRoute, text: 'Terms of Service', type: 'text' },
		{ link: privateRoute, text: 'Privacy Policy', type: 'text' },
		{ link: prevRoute, text: '', type: 'img' },
	];
	const [isReady, setIsReady] = useState(false);
	const [currentLink, setCurrentLink] = useState(links.map(({ link }) => link === pathName).indexOf(true));
	const isMobile = width < 768;

	const [offset, setOffset] = useState<Offset>({ left: 0, top: 0, width: 0, height: 0 });
	const refs = useRef<(HTMLLIElement | null)[]>([]);

	const compute = (i: number, side: 'left' | 'top') => {
		let sum = 0;
		const gapSize = {
			md: 8,
			sm: 4,
		};

		for (let j = 0; j < i; j++) {
			const el = refs.current[j];
			if (el && side === 'left') sum += el.getBoundingClientRect().width + gapSize.md;
			if (el && side === 'top') sum += el.getBoundingClientRect().height + gapSize.sm;
		}

		return sum;
	};

	const handleClick = (i: number) => {
		if (!refs.current[i]) return;
		const rect = refs.current[i]!.getBoundingClientRect();
		const side = isMobile ? 'top' : 'left';

		setCurrentLink(i);
		setIsReady(true);

		setOffset({
			left: side === 'left' ? compute(i, 'left') : 0,
			top: side === 'top' ? compute(i, 'top') : 'unset',
			width: rect.width,
			height: rect.height,
		});
	};

	useEffect(() => {
		if (!refs.current[currentLink]) return;
		const rect = refs.current[currentLink]!.getBoundingClientRect();
		const side = isMobile ? 'top' : 'left';

		setIsReady(false);

		setOffset({
			left: side === 'left' ? compute(currentLink, 'left') : 0,
			top: side === 'top' ? compute(currentLink, 'top') : 'unset',
			width: rect.width,
			height: rect.height,
		});
	}, [refs, setOffset, currentLink, width, isMobile]);

	return { prevRoute, links, handleClick, offset, refs, isReady, isMobile };
};
