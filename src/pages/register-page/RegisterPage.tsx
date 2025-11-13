/* --- Imports --- */
import { AuthForm } from '../../UI/auth-form/AuthForm';
import registerIcon from '/imgs/webp/register-icon.webp';
import { registerFormConfig } from './page-config/page.config';
import { useApiForm } from '../../hooks/useApiForm';
import { registerUrl } from '../../utils/urls';
import type { FieldErrors } from 'react-hook-form';
import { dataInputs, validate, type FormValues } from './page-config/form.config';

/* --- RegisterPage Component --- */
// This component represents the register page of the application.
export const RegisterPage = () => {
	const { handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, setResMessage } = useApiForm<FormValues>({
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
		errorsMessage: { success: { message: 'Crafting complete.' }, 400: { message: 'The pattern is flawed. Refine it.' } },
		customErrors: {
			409: { type: 'error', message: 'Email already branded in the Forge.' },
		},
		apiHref: registerUrl,
	});

	const onIsInvalid = (errors: FieldErrors<FormValues>) => {
		const errorHandlers = {
			required: () => setResMessage({ type: 'error', message: 'Every field fuels the Forge.' }),
			notMatchPass: () => setResMessage({ type: 'error', message: 'Passkeys forged differently.' }),
			nameLatnValid: () => setResMessage({ type: 'error', message: 'Only Latin runes allowed.' }),
			passMinLength: () => setResMessage({ type: 'error', message: `Your key needs more strength — 4+ chars.` }),
		};

		for (const err of Object.values(errors)) {
			const key = err?.message || err?.type;
			const handler = err?.type && errorHandlers[key as keyof typeof errorHandlers];

			if (handler) {
				handler();
				return;
			}
		}
	};

	return (
		<AuthForm<FormValues>
			type="register"
			formHook={{ handleSubmit, handleSubmitForm, register, watch, isLoading, resMessage, onIsInvalid }}
			dataInputs={dataInputs}
			titleIcon={registerIcon}
			textConfig={registerFormConfig}
			validate={validate}
			href={'/login'}
		/>
	);
};
