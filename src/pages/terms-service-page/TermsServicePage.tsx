import { HeaderLegal } from '../../UI/headers/header-legal/HeaderLegal';
import { MaxWidthContainer } from '../../UI/containers/max-width-container/MaxWidthContainer';
import { Fragment } from 'react/jsx-runtime';

type DataPoints = {
	title: string;
	text: [string];
};

export const TermsServicePage = () => {
	const pageConfig = {
		title: 'Terms of Service',
		dataPoints: [
			{
				title: 'Пользовательское соглашение',
				text: [
					'Добро пожаловать в CodeForge — платформу для хранения и быстрого доступа к фрагментам кода. Сервис создан главным образом для личного использования автора, но открыт для всех желающих.Используя CodeForge, вы подтверждаете своё согласие с настоящими Условиями использования. Если вы не согласны с ними, пожалуйста, прекратите использование сервиса.',
				],
			},
			{
				title: 'Определения',
				text: [
					'**Сервис** — веб-платформа CodeForge.',
					'**Пользователь** — любое лицо, использующее сервис.Аккаунт — регистрационная запись пользователя.',
					'**Аккаунт** — регистрационная запись пользователя.',
				],
			},
			{
				title: 'Доступ к сервису',
				text: [
					'/countСервис работает в том виде, в котором он доступен в данный момент, и может развиваться, обновляться или изменяться со временем.',
					'/countВладелец сервиса стремится обеспечивать стабильную работу, но не может гарантировать полную бесперебойность или постоянную доступность.',
				],
			},
		] as DataPoints[],
	};

	const { title, dataPoints } = pageConfig;

	const parseText = (text: [string], i: number) => {
		const pattern = /(\*\*.*?\*\*)|(_.*?_)|(\d+)/g;

		return text.map((line, j) => {
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
							const count = part.replace('/count', `${i + 1}.${j + 1}.`);
							return <Fragment key={j}>{count}</Fragment>;
						}
						return part;
					})}
					<br />
				</Fragment>
			);
		});
	};

	return (
		<div className="min-h-screen">
			<HeaderLegal textConfig={{ title: title }} />
			<main className="">
				<h1 className="opacity-0 w-0 h-0 pointer-events-none">CodeForge Terms of Service</h1>

				<section>
					<MaxWidthContainer>
						<div>
							<h2 className="text-2xl text-white">Условия использования CogeForge</h2>
						</div>

						<div className="mt-4">
							{dataPoints.map(({ title, text }, i) => {
								return (
									<Fragment key={i}>
										<div className="text-white mt-6 pb-4 border-b-1 border-white/20">
											<h3 className="text-xl font-bold">
												<span className="inline-block mr-1">{i + 1}.</span>
												{title}
											</h3>
											<p className="mt-4 leading-normal">{parseText(text, i)}</p>
										</div>
									</Fragment>
								);
							})}
						</div>
					</MaxWidthContainer>
				</section>
			</main>
		</div>
	);
};
