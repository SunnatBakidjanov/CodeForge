import { Legal } from '../../UI/legal/Legal';
import { pageConfig } from '../terms-service-page/page-config/page-config';
import scalesJustice from '/imgs/webp/scales-justice.webp';

export const PrivatePolityPage = () => {
	return <Legal pageConfig={pageConfig} iconSrc={scalesJustice} />;
};
