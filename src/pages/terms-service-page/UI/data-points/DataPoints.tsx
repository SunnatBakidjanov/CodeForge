import { pageConfig } from '../../page-config/page-config';
import { Fragment } from 'react/jsx-runtime';
import { BsLink45Deg } from 'react-icons/bs';
import { parseText } from '../../utils/parseText';
import React, { useRef } from 'react';

export const DataPoints = () => {
	const { dataPoints } = pageConfig;
	const refs = useRef(dataPoints.map(() => React.createRef<HTMLDivElement>()));

	console.log(refs.current);

	const handleClick = (i: number) => {
		if (refs.current[i].current) {
			refs.current[i].current.scrollIntoView({ behavior: 'smooth' });
			console.log(refs.current[i]);
		}
	};

	return (
		<div className="mt-20">
			{dataPoints.map(({ title, text }, i) => {
				return (
					<Fragment key={i}>
						<div ref={refs.current[i]} className="text-white mt-8 pb-4 border-b-1 border-white/20">
							<h3 className="text-xl font-bold cursor-text group" onClick={() => handleClick(i)}>
								<BsLink45Deg className="inline mr-1 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out" />
								<span className="inline-block mr-1">{i + 1}.</span>
								{title}
							</h3>
							<p className="ml-6 mt-4 leading-normal">{parseText(text, i)}</p>
						</div>
					</Fragment>
				);
			})}
		</div>
	);
};
