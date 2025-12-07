/** --- Imports --- */
import { pageConfig } from './page-config/page-config';
import { Legal } from '@/UI/legal/Legal';
import termsIcon from '/imgs/webp/terms-of-sevice-icon.webp';
import { scrollTop } from '@/utils/scrollTop';

export const TermsServicePage = () => {
	scrollTop();

	return <Legal pageConfig={pageConfig} iconSrc={termsIcon} />;
};
