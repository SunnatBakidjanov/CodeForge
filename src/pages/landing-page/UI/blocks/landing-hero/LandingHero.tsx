import { Container } from '@/components/elements/container/Container';
import { Section } from '@/components/elements/section/Section';
import { Coube3d } from '../../elements/coube-3d/Coube3d';
import { CoubComp } from '../../landing-getting/UI/coub-comp/CoubComp';

export const LandingHero = () => {
	return (
		<Section styleVariatns={'inner_base'}>
			<Container styleVariants={'2xl'}>
				<div className="w-full flex items-center justify-center">
					<Coube3d />

					<CoubComp />
				</div>
			</Container>
		</Section>
	);
};
