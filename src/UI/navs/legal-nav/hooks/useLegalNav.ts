/* --- Imports --- */
import { useAppSelector } from '../../../../hooks/useRedux';
import { useRef, useEffect, useState } from 'react';
import { termsRoute, privateRoute } from '../../../../utils/urls';
import { useLocation } from 'react-router';

/* --- Types --- */
type Offset = { left: number; width: number; height: number };

/* --- useLegalNav Hook --- */
export const useLegalNav = () => {
	const prevRoute = useAppSelector(state => state.prevRoute.previous);
	const pathName = useLocation().pathname;
	const links = [
		{ link: termsRoute, text: 'Terms of Service' },
		{ link: privateRoute, text: 'Privacy Policy' },
	];
	const [isReady, setIsReady] = useState(false);
	const [currentLink, setCurrentLink] = useState(links.map(({ link }) => link === pathName).indexOf(true));

	const [offset, setOffset] = useState<Offset>({ left: 0, width: 0, height: 0 });
	const refs = useRef<(HTMLDivElement | null)[]>([]);

	const computeLeft = (i: number) => {
		let sum = 0;

		for (let j = 0; j < i; j++) {
			const el = refs.current[j];
			if (el) sum += el.getBoundingClientRect().width + 8;
		}

		return sum;
	};

	const handleClick = (i: number) => {
		if (!refs.current[i]) return;
		const rect = refs.current[i]!.getBoundingClientRect();
		setCurrentLink(i);
		setIsReady(true);
		setOffset({ left: computeLeft(i), width: rect.width, height: rect.height });
	};

	useEffect(() => {
		if (!refs.current[currentLink]) return;
		const rect = refs.current[currentLink]!.getBoundingClientRect();

		setOffset({
			left: computeLeft(currentLink),
			width: rect.width,
			height: rect.height,
		});
	}, [refs, setOffset, currentLink]);

	return { prevRoute, links, handleClick, offset, refs, isReady };
};
