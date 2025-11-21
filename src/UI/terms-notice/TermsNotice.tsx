/* --- Imports --- */
import { BtnLink } from '../btns/btn-link/BtnLink';
import { termsRoute, privateRoute } from '../../utils/urls';

/* --- TermsNotice Component --- */
// This component represents the terms notice of the application.
export const TermsNotice = () => {
	return (
		<div className="text-[var(--white)] italic text-center sm:text-lg">
			By continuing, you agree to our
			<br />
			<BtnLink text={'Terms of Service'} href={termsRoute} /> and <BtnLink text={'Privacy Policy'} href={privateRoute} />
		</div>
	);
};
