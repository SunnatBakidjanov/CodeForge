/** --- Imports --- */
import { pageConfig } from './page-config/page-config';
import { Legal } from '../../UI/legal/Legal';
import termsIcon from '/imgs/webp/terms-of-sevice-icon.webp';

export const TermsServicePage = () => {
	return <Legal pageConfig={pageConfig} iconSrc={termsIcon} />;
};
