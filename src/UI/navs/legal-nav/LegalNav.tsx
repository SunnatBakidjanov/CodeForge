import { useNavigate } from 'react-router';
import { Button } from '../../btns/button/Button';
import { termsServiceRoute, privatePolicyRoute } from '../../../utils/urls';
import { MaxWidthContainer } from '../../containers/max-width-container/MaxWidthContainer';
import { useAppSelector } from '../../../hooks/useRedux';

export const LegalNav = () => {
	const navigate = useNavigate();
	const prevRoute = useAppSelector(state => state.prevRoute.previous);

	return (
		<MaxWidthContainer>
			<div className="text-white flex">
				<Button onClick={() => navigate(termsServiceRoute)} children="Terms of Service" />
				<Button onClick={() => navigate(privatePolicyRoute)} children="Privacy Policy" />

				<Button onClick={() => navigate(`${prevRoute}`)} children="Back" />
			</div>
		</MaxWidthContainer>
	);
};
