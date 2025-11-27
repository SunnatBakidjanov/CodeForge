/** --- Imports --- */
import { MaxWidthContainer } from '../../../../UI/containers/max-width-container/MaxWidthContainer';
import { SectionContainer } from '../../../../UI/containers/section-container/SectionContainer';
import { ContactSectionConfig } from '../../page-config/landing.config';
import { LandingTitle } from '../landing-title/LandingTitle';
import { LandingForm } from '../landing-form/LandingForm';

/** --- LandingContact Component --- */
// This component represents the contact section of the landing page.
export const LandingContact = () => {
	const { title, description } = ContactSectionConfig;

	return (
		<SectionContainer>
			<MaxWidthContainer>
				<div className="flex flex-col items-center justify-center mt-6">
					<LandingTitle text={title} isHasBlur={false} descriptionText={description} isBorderBottom={true} />

					<LandingForm />
				</div>
			</MaxWidthContainer>
		</SectionContainer>
	);
};
