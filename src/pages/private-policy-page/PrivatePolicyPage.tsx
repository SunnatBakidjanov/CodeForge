/** --- Imports --- */
import { Legal } from '../../UI/legal/Legal';
import { pageConfig } from './page-config/page-config';
import scalesJustice from '/imgs/webp/scales-justice.webp';

/** --- PrivatePolityPage --- */
export const PrivatePolityPage = () => {
	return <Legal pageConfig={pageConfig} iconSrc={scalesJustice} />;
};
