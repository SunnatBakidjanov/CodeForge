import { HeaderLegal } from '../../UI/headers/header-legal/HeaderLegal';
import { MaxWidthContainer } from '../../UI/containers/max-width-container/MaxWidthContainer';
import { Fragment } from 'react/jsx-runtime';
import { parseText } from './utils/parseText';
import { pageConfig } from './page-config/page-config';

export const TermsServicePage = () => {
	const { title, dataPoints } = pageConfig;

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
