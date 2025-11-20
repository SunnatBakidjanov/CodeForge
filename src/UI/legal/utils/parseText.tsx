/** --- Imports --- */
import { Fragment } from 'react/jsx-runtime';
import { VscCircleFilled } from 'react-icons/vsc';

/** --- parseText Function --- */
export const parseText = (text: string[], i: number) => {
	const pattern = /(\*\*.*?\*\*)|(_.*?_)|(\d+)/g;
	const myEmail = 'sunnatbackidjanov@gmail.com';
	let counter = 1;

	return text?.map((line, j) => {
		const parts = line.split(pattern);

		return (
			<Fragment key={j}>
				{parts.map((part, k) => {
					if (!part) return null;

					if (part.startsWith('**') && part.endsWith('**')) {
						return <strong key={k}>{part.slice(2, -2)}</strong>;
					}

					if (part.startsWith('_') && part.endsWith('_')) {
						return <em key={k}>{part.slice(1, -1)}</em>;
					}

					if (part.includes('/count')) {
						const count = part.replace('/count', `${i + 1}.${counter++}.`);
						return <Fragment key={k}>{count}</Fragment>;
					}

					if (part.includes('[email]')) {
						const email = part.replace('[email]', myEmail);
						return (
							<a
								key={k}
								href={`mailto:${email}`}
								className="hover:text-[var(--react-blue)]/80 underline underline-offset-8 focus-visible:text-[var(--react-blue)]/80 font-bold transition-all duration-200 ease-out"
							>
								{email}
							</a>
						);
					}

					if (part.startsWith('[') && part.endsWith(']')) {
						const list = part.slice(2, -1).split('*');

						return (
							<span key={k} className="flex flex-col mt-1.5">
								{list.map((item, l) => (
									<span key={l}>
										<VscCircleFilled className="inline text-[var(--react-blue)]/90 mr-1 relative bottom-[1px] w-5 h-5" />
										{item}
									</span>
								))}
							</span>
						);
					}
					return part;
				})}
				<br />
			</Fragment>
		);
	});
};
