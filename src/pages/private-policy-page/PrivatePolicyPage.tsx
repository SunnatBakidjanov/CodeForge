/** --- Imports --- */
import { Legal } from '../../UI/legal/Legal';
import { pageConfig } from './page-config/page-config';
import scalesJustice from '/imgs/webp/scales-justice.webp';
import { scrollTop } from '../../utils/scrollTop';

/** --- PrivatePolityPage --- */
export const PrivatePolityPage = () => {
	scrollTop();

	return <Legal pageConfig={pageConfig} iconSrc={scalesJustice} />;
};
